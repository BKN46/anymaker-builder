import { CELL_SIZE_WORLD } from '../editor/grid.js';
import { reflectNativePoint } from './coordinates.js';
const nativeAxes = ['x', 'y', 'z'];

export function nativeCells(position) {
  if (!position || nativeAxes.some(axis => !Number.isFinite(position[axis]))) throw new Error('Native export requires finite positions');
  position = reflectNativePoint(position);
  return nativeAxes.map(axis => {
    const value = position[axis] / CELL_SIZE_WORLD;
    return Math.abs(value - Math.round(value)) <= 1e-8 ? Math.round(value) : value;
  });
}

export function nativePlateNodeOrderForExport(plate, nativePoints, edgeNodeIds) {
  const order = [...plate.nodeIds].reverse();
  const direction = plate.surfaceDirection;
  if (direction && nativeAxes.every(axis => Number.isFinite(direction[axis]))) {
    const desired = [-direction.x, direction.y, direction.z];
    const normal = nativePlateNormal(order.map(id => nativePoints.get(id)));
    if (normal && normal[0] * desired[0] + normal[1] * desired[1] + normal[2] * desired[2] < 0) order.reverse();
  }
  if (plate.surfaceFanAnchor !== undefined) {
    const anchor = order.indexOf(plate.surfaceFanAnchor);
    if (anchor < 0) throw new Error('单面扇心必须是边界节点');
    order.push(...order.splice(0, anchor));
  }
  // A panel boundary in the game is a loop of structural edges. Older editor
  // snapshots can retain a standalone node in that loop; remove it only when
  // it is exactly collinear and lies between its two neighbouring boundary
  // points. Non-collinear corners retain their geometry; their boundary
  // beams are checked before export and missing support is reported.
  let changed = true;
  while (changed) {
    changed = false;
    for (let index = 0; index < order.length; index++) {
      const id = order[index];
      if (edgeNodeIds.has(id)) continue;
      if (order.length <= 3) continue;
      const previous = nativePoints.get(order[(index - 1 + order.length) % order.length]);
      const current = nativePoints.get(id);
      const next = nativePoints.get(order[(index + 1) % order.length]);
      if (!previous || !current || !next) continue;
      const first = nativeAxes.map((_, axis) => current[axis] - previous[axis]);
      const second = nativeAxes.map((_, axis) => next[axis] - current[axis]);
      const cross = [
        first[1] * second[2] - first[2] * second[1],
        first[2] * second[0] - first[0] * second[2],
        first[0] * second[1] - first[1] * second[0],
      ];
      const collinear = cross.every(value => Math.abs(value) <= 1e-9);
      const between = nativeAxes.every((_, axis) => {
        const min = Math.min(previous[axis], next[axis]);
        const max = Math.max(previous[axis], next[axis]);
        return current[axis] >= min - 1e-9 && current[axis] <= max + 1e-9;
      });
      if (!collinear || !between) continue;
      order.splice(index, 1);
      changed = true;
      break;
    }
  }
  if (order.length < 3) throw new Error(`Native export plate ${plate.id} has fewer than three boundary nodes`);
  return order;
}

function nativePlateNormal(points) {
  if (!Array.isArray(points) || points.length < 3) return null;
  // Match the game's calculate_plate_dir scan: try every pair anchored at
  // the first node until a non-collinear pair produces a usable direction.
  for (let firstIndex = 1; firstIndex < points.length - 1; firstIndex++) {
    const first = points[firstIndex].map((value, axis) => value - points[0][axis]);
    for (let secondIndex = firstIndex + 1; secondIndex < points.length; secondIndex++) {
      const next = points[secondIndex].map((value, axis) => value - points[0][axis]);
      const normal = [
        first[1] * next[2] - first[2] * next[1],
        first[2] * next[0] - first[0] * next[2],
        first[0] * next[1] - first[1] * next[0],
      ];
      const magnitude = Math.hypot(...normal);
      if (magnitude > 1e-9) return normal.map(value => value / magnitude);
    }
  }
  return null;
}
