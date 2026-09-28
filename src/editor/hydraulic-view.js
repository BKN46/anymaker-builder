import * as THREE from 'three';

// A diagnostic telescoping cylinder, not a reconstruction of game materials.
// Geometry belongs to the returned group; its caller owns the shared material.
export function createHydraulicCylinder(base, rod, material, size = 0) {
  const group = new THREE.Group();
  group.name = 'hydraulic-cylinder';
  const distance = base.distanceTo(rod);
  if (distance < 1e-8) return group;
  const axis = rod.clone().sub(base).normalize();
  const radius = .035 * (size + 1);
  const addSegment = (start, end, width) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(width, width, end - start, 12), material);
    mesh.position.copy(base).addScaledVector(axis, (start + end) / 2);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), axis);
    group.add(mesh);
  };
  addSegment(0, distance * .55, radius);
  addSegment(distance * .5, distance, radius * .48);
  for (const position of [base, rod]) {
    const cap = new THREE.Mesh(new THREE.SphereGeometry(radius * .7, 10, 8), material);
    cap.position.copy(position); group.add(cap);
  }
  return group;
}
