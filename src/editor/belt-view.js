import * as THREE from 'three';
import { BELT_HALF_WIDTH, BELT_HALF_THICKNESS, BELT_UV_DENSITY } from './belt-profiles.js';

// Four continuous faces, with separate normals at the rectangular corners.
// The topology object owns geometry/material; the application owns the shared texture.
export function createBeltVisual(belt, texture = null) {
  const { samples, axis, textureLength } = belt.path;
  const positions = []; const normals = []; const uvs = []; const indices = [];
  const pairs = [[0, 1], [2, 3], [1, 2], [3, 0]];
  const repeat = Math.floor(textureLength * BELT_UV_DENSITY);
  for (let i = 0; i <= samples.length; i++) {
    const sample = samples[i % samples.length];
    const p = new THREE.Vector3(...sample.position); const n = new THREE.Vector3(...sample.normal); const a = new THREE.Vector3(...axis);
    const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([side, depth]) => p.clone().addScaledVector(a, side * BELT_HALF_WIDTH).addScaledVector(n, depth * BELT_HALF_THICKNESS));
    const faceNormals = [n.clone().negate(), n, a, a.clone().negate()];
    pairs.forEach((pair, face) => pair.forEach(corner => {
      positions.push(...corners[corner].toArray()); normals.push(...faceNormals[face].toArray());
      uvs.push(i === samples.length ? repeat : sample.textureDistance / textureLength * repeat, 0);
    }));
  }
  for (let i = 0; i < samples.length; i++) for (let face = 0; face < 4; face++) {
    const a = i * 8 + face * 2; const b = a + 1; const c = b + 8; const d = a + 8;
    const p = index => new THREE.Vector3().fromArray(positions, index * 3);
    const normal = new THREE.Vector3().fromArray(normals, a * 3);
    // Native coordinates reflect editor X. Derive winding from the outward
    // normal, including local mirrors and backwards-running idlers.
    if (p(b).sub(p(a)).cross(p(c).sub(p(a))).dot(normal) >= 0) indices.push(a, b, c, a, c, d);
    else indices.push(a, c, b, a, d, c);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices); geometry.computeBoundingBox(); geometry.computeBoundingSphere();
  const material = new THREE.MeshStandardMaterial({ color: texture ? '#ffffff' : '#292b2d', map: texture, roughness: .85, metalness: 0 });
  material.userData.topologyLink = true;
  const mesh = new THREE.Mesh(geometry, material); mesh.castShadow = mesh.receiveShadow = true;
  mesh.userData = { topology: 'link', linkId: belt.id, linkKind: 'belt', beltSurface: true };
  const group = new THREE.Group(); group.name = 'belt-loop';
  group.userData = { topology: 'belt', beltId: belt.id, linkKind: 'belt', linkIds: belt.linkIds, beltHidden: belt.hidden, beltSectionCount: samples.length };
  group.add(mesh); return group;
}

export async function loadBeltTexture(baseUrl) {
  const texture = await new THREE.TextureLoader().loadAsync(baseUrl + 'assets/textures/belt.png');
  texture.colorSpace = THREE.SRGBColorSpace; texture.wrapS = THREE.RepeatWrapping;
  texture.name = 'native-belt';
  return texture;
}
