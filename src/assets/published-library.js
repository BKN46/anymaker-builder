import * as THREE from 'three';
import { AssetLibrary, disposeObject } from './library.js';

const typed = (values, Type) => values == null ? null : new Type(values);

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
      if (typeof DecompressionStream === 'function' && entry.compression === 'gzip') stream = stream.pipeThrough(new DecompressionStream('gzip'));
      else if (entry.compression === 'gzip') throw new Error('该浏览器不支持 gzip Mesh 解压');
      const payload = JSON.parse(await new Response(stream).text());
      if (payload.source !== source || payload.sourceSha256 !== entry.sourceSha256) throw new Error(`Published Mesh hash/source mismatch: ${source}`);
      return parsedFromPublished(payload);
    });
    this.meshCache.set(source, promise);
    try { return await promise; }
    catch (error) { this.meshCache.delete(source); throw error; }
  }

  register(files) { return this.fallback.register(files); }

  async instantiate(definition) {
    try {
      const binding = definition.meshBinding || { staticMesh: definition.mesh_static?.mesh_path || definition.mesh || null, dynamicMeshes: [] };
      const paths = [binding.staticMesh, ...(binding.dynamicMeshes || []).map(item => item.path)].filter(Boolean);
      if (!paths.length) return this.fallback.instantiate(definition);
      const parsed = await Promise.all(paths.map(path => this.parse(path)));
      const group = new THREE.Group();
      if (parsed.every(value => value.opaque || !value.parts.length)) {
        const marker = new THREE.Mesh(new THREE.BoxGeometry(.2, .2, .2), new THREE.MeshBasicMaterial({ color: '#d49b4a', wireframe: true }));
        group.add(marker);
        group.userData.visual = 'opaque';
        group.userData.reason = '已入库但使用未解码的原生 Mesh 变体';
        return group;
      }
      const addParsed = (meshData, transform = null) => {
        for (const part of meshData.parts) {
          const geometry = new THREE.BufferGeometry();
          geometry.setAttribute('position', new THREE.BufferAttribute(part.positions, 3));
          geometry.setIndex(new THREE.BufferAttribute(part.indices, 1));
          if (part.normals) geometry.setAttribute('normal', new THREE.BufferAttribute(part.normals, 3)); else geometry.computeVertexNormals();
          if (part.uv) geometry.setAttribute('uv', new THREE.BufferAttribute(part.uv, 2));
          geometry.setAttribute('gameColorBytes', new THREE.BufferAttribute(part.colors, 4, true));
          const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: '#b4c3ce', roughness: .7, metalness: .1, side: THREE.DoubleSide }));
          mesh.name = part.name; mesh.castShadow = mesh.receiveShadow = true;
          if (transform?.position) mesh.position.set(...transform.position);
          if (transform?.previewRotation) mesh.rotation.set(...transform.previewRotation);
          group.add(mesh);
        }
      };
      addParsed(parsed[0]);
      (binding.dynamicMeshes || []).forEach((item, index) => addParsed(parsed[index + 1], item));
      group.userData.visual = 'mesh';
      group.userData.reason = '独立发布 Mesh（完整解析，gzip 懒加载）';
      group.userData.vertices = parsed.flatMap(value => value.parts).reduce((n, part) => n + part.positions.length / 3, 0);
      group.userData.triangles = parsed.flatMap(value => value.parts).reduce((n, part) => n + part.indices.length / 3, 0);
      return group;
    } catch (error) {
      // Local file selection remains a development/audit fallback. A missing
      // published asset is visible in the UI rather than silently guessed.
      if (this.fallback.files.size) return this.fallback.instantiate(definition);
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
