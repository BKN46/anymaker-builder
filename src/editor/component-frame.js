// Pure transforms from a definition's native cell basis into editor space.
import { CELL_SIZE_WORLD } from './grid.js';

export const IDENTITY_ROTATION = [1, 0, 0, 0, 1, 0, 0, 0, 1];
export const frameVector = value => ({ x: value[0], y: value[1], z: value[2] });
export const vectorArray = value => [value.x, value.y, value.z];
export const addVectors = (a, b) => a.map((value, index) => value + b[index]);
export const subtractVectors = (a, b) => a.map((value, index) => value - b[index]);
export const dotVectors = (a, b) => a.reduce((sum, value, index) => sum + value * b[index], 0);
export const transformVector = (matrix, vector) => [0, 1, 2].map(row => dotVectors(matrix.slice(row * 3, row * 3 + 3), vector));
export const transposeRotation = matrix => [0, 3, 6, 1, 4, 7, 2, 5, 8].map(index => matrix[index]);
export const multiplyRotations = (a, b) => a.map((_, index) => [0, 1, 2].reduce((sum, k) => sum + a[Math.floor(index / 3) * 3 + k] * b[k * 3 + index % 3], 0));

export function componentFrame(component) {
  const { x = 0, y = 0, z = 0 } = component.rotation || {};
  const cx = Math.cos(x); const sx = Math.sin(x);
  const cy = Math.cos(y); const sy = Math.sin(y);
  const cz = Math.cos(z); const sz = Math.sin(z);
  const rotation = [cy * cz, -cy * sz, sy, sx * sy * cz + cx * sz, cx * cz - sx * sy * sz, -sx * cy, sx * sz - cx * sy * cz, sx * cz + cx * sy * sz, cx * cy];
  const signs = [-1, 1, 1]; // Native visual basis is reflected across editor X.
  for (const axis of [...(component.localMirrorAxes || []), ...(component.mirror ? [component.mirror.axis] : [])]) signs[['x', 'y', 'z'].indexOf(axis)] *= -1;
  const basis = rotation.map((value, index) => value * signs[index % 3]);
  const scale = ['x', 'y', 'z'].map(axis => component.scale?.[axis] ?? 1);
  const origin = vectorArray(component.position);
  return {
    basis, origin, scale,
    point: local => addVectors(origin, transformVector(basis, local.map((value, index) => value * scale[index] * CELL_SIZE_WORLD))),
    local: world => transformVector(transposeRotation(basis), subtractVectors(world, origin)).map((value, index) => value / (scale[index] * CELL_SIZE_WORLD)),
  };
}
