// Geometry-side reflection. This is separate from the editor command so the
// persisted model carries mirror metadata instead of a negative object scale.
const axisIndex = axis => ({ x: 0, y: 1, z: 2 }[axis]);

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
