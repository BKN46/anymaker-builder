import { CELL_SIZE_WORLD, AXES } from './grid.js';

// The two rows form three axis pairs: U/J for X, I/K for Y, and O/L for Z.
export const EDGE_MICRO_KEYS = Object.freeze({
  u: Object.freeze({ axis: 'x', direction: 1 }),
  j: Object.freeze({ axis: 'x', direction: -1 }),
  i: Object.freeze({ axis: 'y', direction: 1 }),
  k: Object.freeze({ axis: 'y', direction: -1 }),
  o: Object.freeze({ axis: 'z', direction: 1 }),
  l: Object.freeze({ axis: 'z', direction: -1 }),
});

const validPoint = point => point && AXES.every(axis => Number.isFinite(point[axis]) && Math.abs(point[axis]) <= 10000);
const bindingForKey = key => {
  const normalized = String(key || '').toLowerCase();
  return Object.hasOwn(EDGE_MICRO_KEYS, normalized) ? EDGE_MICRO_KEYS[normalized] : null;
};

export function moveEdgeMicroEndpoint(endpoint, key, step = CELL_SIZE_WORLD) {
  const binding = bindingForKey(key);
  if (!binding || !validPoint(endpoint) || !Number.isFinite(step) || step <= 0) return null;
  const next = { x: endpoint.x, y: endpoint.y, z: endpoint.z };
  next[binding.axis] += binding.direction * step;
  return validPoint(next) ? next : null;
}

export function edgeMicroKeyBinding(key) {
  const binding = bindingForKey(key);
  return binding ? { ...binding } : null;
}
