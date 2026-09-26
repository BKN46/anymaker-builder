import * as THREE from 'three';
import { AssetLibrary, disposeObject } from './library.js';
import { CELL_SIZE_WORLD } from '../editor/grid.js';
import { stretchMeshPositions } from '../editor/component-extension.js';
import { correctGeometryNormals } from './geometry-ops.js';

const typed = (values, Type) => values == null ? null : new Type(values);
export const WHEEL_TYRE_OUTBOARD_OFFSET = CELL_SIZE_WORLD;

export function withWheelTyreOffset(transform, source) {
  if (!/\/car_wheel(?:_b_1|_trims_a)?\.mesh$/.test(source || '')) return transform;
  const position = Array.isArray(transform?.position) ? [...transform.position] : [0, 0, 0];
  position[2] += WHEEL_TYRE_OUTBOARD_OFFSET;
  return { ...transform, position };
}

function isWheelTyreMesh(source) {
  return /\/car_wheel(?:_b_1|_trims_a)?\.mesh$/.test(source || '');
}

function isFilterMediaComponent(id) {
  return ['oil_filter', 'air_filter', 'air_filter_b'].includes(id);
}

export function applyMeshTransform(mesh, transform) {
  if (transform?.position) mesh.position.set(...transform.position);
  // `preview_rot` in the native binding is a row-major 3×3 rotation
  // matrix, not an Euler triplet. Passing it to Euler#set consumed only the
  // first three values and collapsed dynamic child meshes into one another.
  const rotation = transform?.previewRotation;
  if (Array.isArray(rotation) && rotation.length === 9 && rotation.every(Number.isFinite)) {
    mesh.quaternion.setFromRotationMatrix(new THREE.Matrix4().set(
      rotation[0], rotation[1], rotation[2], 0,
      rotation[3], rotation[4], rotation[5], 0,
      rotation[6], rotation[7], rotation[8], 0,
      0, 0, 0, 1,
    ));
  }
}

const nativeExtension = value => Array.isArray(value) && value.length === 3 && value.every(Number.isInteger) ? value : null;
const axisIndex = { x: 0, y: 1, z: 2 };

function variantPath(staticMesh, axis, variant) {
  const match = /^(.*)_0_0_0\.mesh$/.exec(staticMesh || '');
  if (!match) return null;
  const values = [0, 0, 0];
  values[axisIndex[axis]] = variant;
  return `${match[1]}_${values.join('_')}.mesh`;
}

export function staticMeshParts(definition, binding, extension, manifest) {
  const staticMesh = binding.staticMesh || definition.mesh_static?.mesh_path || definition.mesh || null;
  if (!staticMesh) return [];
  const parts = [{ path: staticMesh, transform: null }];
  const ext = nativeExtension(extension);
  if (!ext) return parts;
  for (const axis of Object.keys(axisIndex)) {
    if (definition[`mode_${axis}`] !== 'tile') continue;
    const index = axisIndex[axis];
    const interval = Number(definition.interval?.[index]);
    const length = ext[index];
    if (!Number.isInteger(interval) || interval <= 0 || length <= 0 || length % interval) continue;
    const middle = variantPath(staticMesh, axis, 1);
    const end = variantPath(staticMesh, axis, 2);
    if (!middle || !end || !manifest.entries[middle] || !manifest.entries[end]) continue;
    const tiles = length / interval;
    // Engine variant 1 represents each added interval. Other tiled parts
    // use the far cap for the last interval instead.
    const middleCount = definition.class === 'engine' ? tiles : tiles - 1;
    for (let tile = 1; tile <= middleCount; tile++) {
      const position = [0, 0, 0]; position[index] = tile * interval * CELL_SIZE_WORLD;
      parts.push({ path: middle, transform: { position } });
    }
    const position = [0, 0, 0]; position[index] = length * CELL_SIZE_WORLD;
    parts.push({ path: end, transform: { position } });
    break;
  }
  return parts;
}

function meshAxisBounds(meshData, axis) {
  const index = axisIndex[axis];
  let min = Infinity;
  let max = -Infinity;
  for (const part of meshData?.parts || []) {
    for (let offset = index; offset < part.positions.length; offset += 3) {
      const value = part.positions[offset];
      min = Math.min(min, value);
      max = Math.max(max, value);
    }
  }
  return Number.isFinite(min) && Number.isFinite(max) ? { min, max } : null;
}

// Tile variants do not share a universal local origin. For example, the
// regular engine's first cap ends one cell earlier than its nominal repeat
// interval, while the V engine does not. Join each parsed variant at its real
// edge instead of assuming every family has the same origin convention.
export function stitchTiledMeshParts(parts, parsed, definition) {
  const axis = Object.keys(axisIndex).find(key => definition[`mode_${key}`] === 'tile');
  if (!axis || parts.length < 2 || parsed.length !== parts.length) return parts;
  const result = [parts[0]];
  for (let index = 1; index < parts.length; index++) {
    const previousBounds = meshAxisBounds(parsed[index - 1], axis);
    const currentBounds = meshAxisBounds(parsed[index], axis);
    if (!previousBounds || !currentBounds) { result.push(parts[index]); continue; }
    const position = Array.isArray(parts[index].transform?.position) ? [...parts[index].transform.position] : [0, 0, 0];
    const previousPosition = Array.isArray(result[index - 1].transform?.position) ? result[index - 1].transform.position[axisIndex[axis]] : 0;
    position[axisIndex[axis]] = previousPosition + previousBounds.max - currentBounds.min;
    result.push({ ...parts[index], transform: { ...parts[index].transform, position } });
  }
  return result;
}

function parsedFromPublished(payload) {
  if (!payload || !['anymaker-published-mesh', 'anymaker-published-mesh-opaque'].includes(payload.format) || payload.version !== 1 || !Array.isArray(payload.parts)) {
    throw new Error('Invalid published Mesh payload');
  }
  return {
    version: 5,
    opaque: payload.format === 'anymaker-published-mesh-opaque',
    parts: payload.parts.map(part => ({
      name: part.name,
      signature: part.signature,
      metadata: part.metadata,
      bounds: part.bounds,
      positions: typed(part.positions, Float32Array),
      normals: typed(part.normals, Float32Array),
      colors: typed(part.colors, Uint8Array),
      uv: typed(part.uv, Float32Array),
      indices: typed(part.indices, Uint32Array),
    })),
  };
}

export class PublishedAssetLibrary {
  constructor(baseUrl, fallback = new AssetLibrary()) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
    this.fallback = fallback;
    this.manifestPromise = null;
    this.meshCache = new Map();
  }

  async manifest() {
    if (!this.manifestPromise) {
      this.manifestPromise = fetch(this.baseUrl + 'assets/manifests/mesh-manifest.json')
        .then(response => { if (!response.ok) throw new Error(`Published Mesh manifest HTTP ${response.status}`); return response.json(); })
        .then(value => {
          if (value.format !== 'anymaker-mesh-manifest' || value.version !== 1 || !value.entries) throw new Error('Invalid published Mesh manifest');
          return value;
        });
    }
    return this.manifestPromise;
  }

  async parse(source) {
    const manifest = await this.manifest();
    const entry = manifest.entries[source];
    if (!entry) throw new Error(`Published Mesh is not indexed: ${source}`);
    if (this.meshCache.has(source)) return this.meshCache.get(source);
    const promise = fetch(this.baseUrl + entry.url).then(async response => {
      if (!response.ok) throw new Error(`Published Mesh HTTP ${response.status}: ${source}`);
      let stream = response.body;
      // Some static hosts transparently decode Content-Encoding: gzip before
      // JavaScript receives the body; manually decompress only when the .gz
      // bytes are still encoded. This keeps GitHub Pages and Vite preview
      // behavior identical.
      const alreadyDecoded = /gzip/i.test(response.headers.get('content-encoding') || '');
      if (typeof DecompressionStream === 'function' && entry.compression === 'gzip' && !alreadyDecoded) stream = stream.pipeThrough(new DecompressionStream('gzip'));
      else if (entry.compression === 'gzip' && !alreadyDecoded) throw new Error('该浏览器不支持 gzip Mesh 解压');
      const payload = JSON.parse(await new Response(stream).text());
      if (payload.source !== source || payload.sourceSha256 !== entry.sourceSha256) throw new Error(`Published Mesh hash/source mismatch: ${source}`);
      return parsedFromPublished(payload);
    });
    this.meshCache.set(source, promise);
    try { return await promise; }
    catch (error) { this.meshCache.delete(source); throw error; }
  }

  register(files) { return this.fallback.register(files); }

  async instantiate(definition, { nativeExtension: extension } = {}) {
    try {
      const binding = definition.meshBinding || { staticMesh: definition.mesh_static?.mesh_path || definition.mesh || null, dynamicMeshes: [] };
      const manifest = await this.manifest();
      const staticParts = staticMeshParts(definition, binding, extension, manifest);
      // The native `wheel` component is the hub/suspension. Its fitted tyre
      // belongs to `element.acc.item` and is instantiated by the editor as a
      // separate native accessory. Older generated bindings appended these
      // three tyre meshes to the wheel, so deliberately ignore that legacy
      // binding tail while retaining the published files for the accessory.
      const dynamicMeshes = (binding.dynamicMeshes || []).filter(item => item.path
        && !(definition.id === 'wheel' && isWheelTyreMesh(item.path))
        && !isFilterMediaComponent(definition.id));
      const parts = [...staticParts, ...dynamicMeshes.map(item => ({ path: item.path, transform: item }))];
      if (!parts.length) return this.fallback.instantiate(definition, { nativeExtension: extension });
      const parsed = await Promise.all(parts.map(part => this.parse(part.path)));
      const stitchedStaticParts = stitchTiledMeshParts(staticParts, parsed.slice(0, staticParts.length), definition);
      const renderedParts = [...stitchedStaticParts, ...parts.slice(staticParts.length)];
      const group = new THREE.Group();
      if (parsed.every(value => value.opaque || !value.parts.length)) {
        const marker = new THREE.Mesh(new THREE.BoxGeometry(.2, .2, .2), new THREE.MeshBasicMaterial({ color: '#d49b4a', wireframe: true }));
        group.add(marker);
        group.userData.visual = 'opaque';
        group.userData.reason = '已入库但使用未解码的原生 Mesh 变体';
        return group;
      }
      const addParsed = (meshData, transform = null, source = '') => {
        for (const part of meshData.parts) {
          const geometry = new THREE.BufferGeometry();
          // Stretch modes move only vertices beyond center_stretch. This is
          // the native `stretch_vertex` rule, unlike a generic object scale
          // which would also move the fixed/anchored half of the component.
          const positions = stretchMeshPositions(definition, extension, part.positions, CELL_SIZE_WORLD);
          geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          geometry.setIndex(new THREE.BufferAttribute(part.indices, 1));
          if (part.normals) geometry.setAttribute('normal', new THREE.BufferAttribute(part.normals, 3)); else geometry.computeVertexNormals();
          correctGeometryNormals(geometry);
          if (part.uv) geometry.setAttribute('uv', new THREE.BufferAttribute(part.uv, 2));
          geometry.setAttribute('gameColorBytes', new THREE.BufferAttribute(part.colors, 4, true));
          // The wheel hub definition only references the suspension meshes.
          // Its tyre/rim children are added explicitly by the published wheel
          // binding, and retain their diagnostic tyre/rim contrast instead of
          // being painted as one opaque component-color slot.
          const wheelVisual = source.includes('/car_wheel');
          const color = source.endsWith('car_wheel.mesh') ? '#1b2027'
            : source.endsWith('car_wheel_b_1.mesh') ? '#667380'
              : source.endsWith('car_wheel_trims_a.mesh') ? '#aebbc5' : '#b4c3ce';
          const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, roughness: wheelVisual ? .52 : .7, metalness: wheelVisual ? .35 : .1, side: THREE.DoubleSide }));
          mesh.name = part.name; mesh.userData.source = source; mesh.castShadow = mesh.receiveShadow = true;
          applyMeshTransform(mesh, transform);
          group.add(mesh);
        }
      };
      parsed.forEach((meshData, index) => addParsed(meshData, renderedParts[index].transform, renderedParts[index].path));
      group.userData.visual = 'mesh';
      group.userData.reason = '独立发布 Mesh（完整解析，gzip 懒加载）';
      group.userData.vertices = parsed.flatMap(value => value.parts).reduce((n, part) => n + part.positions.length / 3, 0);
      group.userData.triangles = parsed.flatMap(value => value.parts).reduce((n, part) => n + part.indices.length / 3, 0);
      return group;
    } catch (error) {
      // Local file selection remains a development/audit fallback. A missing
      // published asset is visible in the UI rather than silently guessed.
      if (this.fallback.files.size) return this.fallback.instantiate(definition, { nativeExtension: extension });
      throw error;
    }
  }

  dispose() {
    for (const value of this.meshCache.values()) value.then(parsed => parsed.parts).catch(() => {});
    this.meshCache.clear();
  }
}

export { disposeObject };
export const PublishedAssetLoader = PublishedAssetLibrary;
