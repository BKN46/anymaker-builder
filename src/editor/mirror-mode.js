// Shared integer-grid reflection rules for the interactive mirror mode.
// Keeping this independent of Three.js makes the construction operations
// deterministic and keeps the mirror plane valid for saved editor data.
import { AXES, assertGridScalar, assertGridVector } from './grid.js';

export function mirrorPoint(value, { axis = 'x', offset = 0 } = {}) {
  if (!AXES.includes(axis)) throw new Error('镜像平面无效');
  const point = assertGridVector(value, '镜像点');
  const planeOffset = assertGridScalar(offset, '镜像偏移');
  return { ...point, [axis]: assertGridScalar(2 * planeOffset - point[axis], '镜像点') };
}

export function sameGridPoint(a, b) {
  return AXES.every(axis => a?.[axis] === b?.[axis]);
}

export function mirrorSurfaceDirection(direction, { axis = 'x' } = {}) {
  if (!AXES.includes(axis)) throw new Error('镜像平面无效');
  if (!direction || AXES.some(key => !Number.isFinite(direction[key]))) return null;
  return { ...direction, [axis]: -direction[axis] };
}
