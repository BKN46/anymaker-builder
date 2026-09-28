// Shared by native import/export and authored inclined mounting grids.
// Matrices are row-major; positions and offsets are in native cells.
import { greatestCommonDivisor } from '../editor/grid.js';
const axes = ['x', 'y', 'z'];
const vector = value => Object.fromEntries(axes.map(axis => [axis, Number(value?.[axis] ?? 0)]));
const add = (a, b) => Object.fromEntries(axes.map(axis => [axis, a[axis] + b[axis]]));
const scale = (v, s) => Object.fromEntries(axes.map(axis => [axis, v[axis] * s]));
const length = v => Math.hypot(v.x, v.y, v.z);
const normalize = v => scale(v, 1 / length(v));
const cross = (a, b) => ({ x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x });

// vehicle_grid_util.get_consistent_grid_origin_and_dir: reduce the integer
// basis and subtract floor-divided in-plane projections, including negatives.
export function consistentNativeGrid(origin, direction) {
  const smallest = value => { const divisor = greatestCommonDivisor(value); if (!divisor) throw new Error('Grid direction must be nonzero'); return value.map(n => n / divisor); };
  const values = value => axes.map(axis => value[axis]);
  const object = value => Object.fromEntries(axes.map((axis, i) => [axis, value[i]]));
  const dir = smallest(direction);
  if (dir.filter(value => value !== 0).length === 1) return { origin: [0, 0, 0], dir: [0, 1, 0] };
  const y = object(dir); const up = dir[0] === 0 && dir[2] === 0 ? { x: 0, y: 0, z: 1 } : { x: 0, y: 1, z: 0 };
  const x = smallest(values(cross(y, up)));
  const z = smallest(values(cross(object(x), y)));
  const result = [...origin];
  for (const axis of [x, z]) {
    const count = Math.floor(origin.reduce((sum, value, i) => sum + value * axis[i], 0) / axis.reduce((sum, value) => sum + value * value, 0));
    axis.forEach((value, i) => { result[i] -= value * count; });
  }
  return { origin: result, dir };
}

export function nativeGridFrame(grid) {
  const origin = vector(grid?.origin);
  const direction = vector(grid?.dir ?? { x: 0, y: 1, z: 0 });
  if ([...Object.values(origin), ...Object.values(direction)].some(value => !Number.isFinite(value))) throw new Error('Native grid origin/dir must contain finite numbers');
  if (length(direction) === 0) throw new Error('Native grid direction must be nonzero');
  if (axes.every(axis => origin[axis] === 0) && direction.x === 0 && direction.y === 1 && direction.z === 0) return { origin, rotation: [1, 0, 0, 0, 1, 0, 0, 0, 1] };
  const y = normalize(direction);
  const up = direction.x === 0 && direction.z === 0 ? { x: 0, y: 0, z: 1 } : { x: 0, y: 1, z: 0 };
  const x = normalize(cross(direction, up));
  const z = normalize(cross(x, y));
  const surfaceOffset = Object.fromEntries(axes.map(axis => [axis, Math.sign(direction[axis]) * .5]));
  return {
    origin: add(origin, add(surfaceOffset, scale(y, .5))),
    rotation: [x.x, y.x, z.x, x.y, y.y, z.y, x.z, y.z, z.z],
  };
}
