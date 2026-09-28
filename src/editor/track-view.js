import * as THREE from 'three';
import { correctGeometryNormals, reflectGeometry } from '../assets/geometry-ops.js';

// One draw call per Mesh part and closed loop. Every returned geometry/material
// belongs to the topology layer; parsed assets remain in the library cache.
export function createTrackVisual(track, parsed) {
  const group = new THREE.Group();
  group.name = 'track-loop';
  group.userData = { topology: 'track', trackId: track.id, linkKind: 'belt', linkIds: track.linkIds, trackPieceCount: track.path.count, trackHidden: track.hidden };
  const b = track.path.basis;
  const basis = new THREE.Matrix4().set(b[0], b[1], b[2], 0, b[3], b[4], b[5], 0, b[6], b[7], b[8], 0, 0, 0, 0, 1);
  const reflected = basis.determinant() < 0;
  const reflection = new THREE.Matrix4().makeScale(-1, 1, 1);
  const matrices = track.path.samples.map(sample => {
    const matrix = basis.clone().multiply(new THREE.Matrix4().makeRotationZ(sample.angle));
    // InstancedMesh does not support negative determinants. Reflect vertices
    // and winding, then cancel that reflection in each instance matrix.
    if (reflected) matrix.multiply(reflection);
    matrix.setPosition(...sample.position); return matrix;
  });
  for (const part of parsed.parts) {
    let geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(part.positions.slice(), 3));
    geometry.setIndex(new THREE.BufferAttribute(part.indices.slice(), 1));
    if (part.normals) geometry.setAttribute('normal', new THREE.BufferAttribute(part.normals.slice(), 3)); else geometry.computeVertexNormals();
    correctGeometryNormals(geometry);
    if (reflected) { const original = geometry; geometry = reflectGeometry(original, 'x'); original.dispose(); }
    const material = new THREE.MeshStandardMaterial({ color: '#686d70', metalness: .25, roughness: .8 });
    material.userData.topologyLink = true;
    const mesh = new THREE.InstancedMesh(geometry, material, matrices.length);
    matrices.forEach((matrix, index) => mesh.setMatrixAt(index, matrix));
    mesh.instanceMatrix.needsUpdate = true; mesh.computeBoundingBox(); mesh.computeBoundingSphere();
    mesh.castShadow = mesh.receiveShadow = true;
    mesh.userData = { topology: 'link', linkId: track.id, linkKind: 'belt', trackPiece: true };
    group.add(mesh);
  }
  return group;
}
