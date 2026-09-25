// Geometry-side reflection. This is separate from the editor command so the
// persisted model carries mirror metadata instead of a negative object scale.
import * as THREE from 'three';

const axisIndex = axis => ({ x: 0, y: 1, z: 2 }[axis]);

// Some native Mesh exports carry normals in the opposite winding convention
// from their index buffer. Three.js then applies valid lighting math to an
// invalid normal/winding pair, which makes the same asset swing from bright to
// nearly black as the camera moves. Detect the dominant convention from the
// indexed triangles and flip only when the evidence is unambiguous.
export function correctGeometryNormals(geometry) {
  const position = geometry.getAttribute('position');
  const normal = geometry.getAttribute('normal');
  const index = geometry.getIndex();
  if (!position || !normal || !index || index.count < 3) return false;
  const a = new THREE.Vector3(); const b = new THREE.Vector3(); const c = new THREE.Vector3();
  const ab = new THREE.Vector3(); const ac = new THREE.Vector3(); const face = new THREE.Vector3();
  let score = 0; let samples = 0;
  for (let offset = 0; offset + 2 < index.count; offset += 3) {
    const ia = index.getX(offset); const ib = index.getX(offset + 1); const ic = index.getX(offset + 2);
    a.fromBufferAttribute(position, ia); b.fromBufferAttribute(position, ib); c.fromBufferAttribute(position, ic);
    face.copy(b).sub(a).cross(ac.copy(c).sub(a));
    if (face.lengthSq() < 1e-12) continue;
    const nx = (normal.getX(ia) + normal.getX(ib) + normal.getX(ic)) / 3;
    const ny = (normal.getY(ia) + normal.getY(ib) + normal.getY(ic)) / 3;
    const nz = (normal.getZ(ia) + normal.getZ(ib) + normal.getZ(ic)) / 3;
    score += face.x * nx + face.y * ny + face.z * nz;
    samples++;
  }
  if (!samples || score >= 0) return false;
  for (let offset = 0; offset < normal.array.length; offset++) normal.array[offset] = -normal.array[offset];
  normal.needsUpdate = true;
  return true;
}

export function reflectGeometry(geometry, axis) {
  const component = axisIndex(axis);
  if (component === undefined) throw new Error('Invalid reflection axis');
  const copy = geometry.clone();
  const position = copy.getAttribute('position');
  for (let index = component; index < position.array.length; index += 3) position.array[index] = position.array[index] === 0 ? 0 : -position.array[index];
  position.needsUpdate = true;
  const normal = copy.getAttribute('normal');
  if (normal) {
    for (let index = component; index < normal.array.length; index += 3) normal.array[index] = normal.array[index] === 0 ? 0 : -normal.array[index];
    normal.needsUpdate = true;
  }
  const index = copy.getIndex();
  if (index) {
    for (let at = 0; at + 2 < index.count; at += 3) {
      const first = index.getX(at + 1);
      index.setX(at + 1, index.getX(at + 2));
      index.setX(at + 2, first);
    }
    index.needsUpdate = true;
  }
  copy.computeBoundingBox();
  copy.computeBoundingSphere();
  return copy;
}

export function reflectObject(object, axis) {
  object.traverse(child => {
    if (!child.isMesh || !child.geometry) return;
    const previous = child.geometry;
    child.geometry = reflectGeometry(previous, axis);
    previous.dispose();
  });
  return object;
}
