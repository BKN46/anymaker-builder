import * as THREE from 'three';
import { AssetLibrary, disposeObject } from './library.js';
import { CELL_SIZE_WORLD } from '../editor/grid.js';

const typed = (values, Type) => values == null ? null : new Type(values);
export const WHEEL_TYRE_OUTBOARD_OFFSET = CELL_SIZE_WORLD;

export function withWheelTyreOffset(transform, source) {
  if (!/\/car_wheel(?:_b_1|_trims_a)?\.mesh$/.test(source || '')) return transform;
  const position = Array.isArray(transform?.position) ? [...transform.position] : [0, 0, 0];
  position[2] += WHEEL_TYRE_OUTBOARD_OFFSET;
  return { ...transform, position };
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

function staticMeshParts(definition, binding, extension, manifest) {
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
    for (let tile = 1; tile < tiles; tile++) {
      const position = [0, 0, 0]; position[index] = tile * interval * CELL_SIZE_WORLD;
      parts.push({ path: middle, transform: { position } });
    }
    const position = [0, 0, 0]; position[index] = length * CELL_SIZE_WORLD;
    parts.push({ path: end, transform: { position } });
    break;
  }
  return parts;
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
      const parts = [...staticParts, ...(binding.dynamicMeshes || []).filter(item => item.path).map(item => ({ path: item.path, transform: withWheelTyreOffset(item, item.path) }))];
      if (!parts.length) return this.fallback.instantiate(definition, { nativeExtension: extension });
      const parsed = await Promise.all(parts.map(part => this.parse(part.path)));
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
          geometry.setAttribute('position', new THREE.BufferAttribute(part.positions, 3));
          geometry.setIndex(new THREE.BufferAttribute(part.indices, 1));
          if (part.normals) geometry.setAttribute('normal', new THREE.BufferAttribute(part.normals, 3)); else geometry.computeVertexNormals();
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
      parsed.forEach((meshData, index) => addParsed(meshData, parts[index].transform, parts[index].path));
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
