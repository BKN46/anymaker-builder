import * as THREE from 'three';
import { parseMesh } from './mesh.js';

// File objects stay local. No fetch/upload, executable access, or filesystem writes.
export class AssetLibrary {
  files = new Map();
  cache = new Map();

  register(files) {
    for (const file of files) {
      const source = file.webkitRelativePath || file.name;
      const marker = source.indexOf('meshes/');
      if (!source.endsWith('.mesh')) continue;
      this.files.set(marker >= 0 ? source.slice(marker) : file.name, file);
    }
    this.cache.clear();
    return this.files.size;
  }

  async parse(path) {
    const exact = this.files.get(path);
    // Flat selections are permitted only if there is a unique filename match.
    const base = path.split('/').pop();
    const matches = [...this.files.entries()].filter(([key]) => key === base);
    const file = exact || (matches.length === 1 ? matches[0][1] : null);
    if (!file) return null;
    if (this.cache.has(file)) return this.cache.get(file);
    if (file.size > 64 * 1024 * 1024) throw new Error('模型超过 64 MiB 限制');
    const parsed = parseMesh(await file.arrayBuffer());
    if (this.cache.size >= 32) this.cache.delete(this.cache.keys().next().value);
    this.cache.set(file, parsed);
    return parsed;
  }

  async instantiate(definition, _options = {}) {
    const path = definition.mesh_static?.mesh_path || definition.mesh;
    const parsed = path ? await this.parse(path) : null;
    const group = new THREE.Group();
    if (!parsed) {
      // Explicit diagnostic marker, NOT a guessed component size or game mesh.
      const marker = new THREE.Mesh(new THREE.BoxGeometry(.2, .2, .2), new THREE.MeshBasicMaterial({ color: '#f3ba66', wireframe: true }));
      group.add(marker);
      group.userData.visual = 'missing';
      group.userData.reason = path ? '缺少本地 Mesh：' + path : '定义没有静态 Mesh';
      return group;
    }
    for (const part of parsed.parts) {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(part.positions, 3));
      geometry.setIndex(new THREE.BufferAttribute(part.indices, 1));
      if (part.normals) geometry.setAttribute('normal', new THREE.BufferAttribute(part.normals, 3));
      else geometry.computeVertexNormals();
      if (part.uv) geometry.setAttribute('uv', new THREE.BufferAttribute(part.uv, 2));
      // Do not mistake packed paint/material channels for verified sRGB colors.
      geometry.setAttribute('gameColorBytes', new THREE.BufferAttribute(part.colors, 4, true));
      const material = new THREE.MeshStandardMaterial({ color: '#b4c3ce', roughness: .7, metalness: .1, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = part.name;
      mesh.castShadow = mesh.receiveShadow = true;
      group.add(mesh);
    }
    group.userData.visual = 'mesh';
    group.userData.reason = '真实静态几何 · 中性诊断材质（非游戏着色）';
    group.userData.vertices = parsed.parts.reduce((n, p) => n + p.positions.length / 3, 0);
    group.userData.triangles = parsed.parts.reduce((n, p) => n + p.indices.length / 3, 0);
    return group;
  }
}

export function disposeObject(object) {
  object.traverse(o => {
    o.geometry?.dispose();
    if (Array.isArray(o.material)) o.material.forEach(m => m.dispose());
    else o.material?.dispose();
  });
}
