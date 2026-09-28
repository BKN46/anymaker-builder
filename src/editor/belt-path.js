import { componentFrame, transformVector, transposeRotation, subtractVectors, addVectors, dotVectors } from './component-frame.js';
import { logicNodeCellPosition } from './connection-ports.js';
import { beltEndpoint, isOrdinaryBeltLink, BELT_TANGENTS } from './belt-profiles.js';

export const MAX_BELT_SECTIONS = 16384; // Editor allocation limit.
export const beltError = code => Object.assign(new Error('Belt: ' + code), { beltCode: code });
const keyOf = endpoint => JSON.stringify([endpoint.componentId, endpoint.port ?? 0]);
const scale = (v, amount) => v.map(value => value * amount);
const wrap = value => (value + BELT_TANGENTS) % BELT_TANGENTS;
// Native rebuild rotates the first wheel's +Y by a NEGATIVE angle.
const radial = index => [Math.sin(index * Math.PI * 2 / BELT_TANGENTS), Math.cos(index * Math.PI * 2 / BELT_TANGENTS), 0];

function wheel(endpoint, components, definitions) {
  const data = beltEndpoint(endpoint, components, definitions);
  if (!data.isBelt || !data.radius || !data.component) throw beltError('ports');
  const frame = componentFrame(data.component);
  if (frame.scale.some(value => Math.abs(value - 1) > 1e-8)) throw beltError('scale');
  const center = frame.point(logicNodeCellPosition(data.node, data.component.nativeExtension, data.definition?.center_stretch));
  if (!center.every(Number.isFinite)) throw beltError('geometry');
  return { ...data, frame, center, axis: transformVector(frame.basis, [0, 0, 1]), reverse: data.component.nativeProperties?.reverse === true };
}

export function validateBeltPair(link, components, definitions) {
  if (!isOrdinaryBeltLink(link, components, definitions)) return false;
  const a = wheel(link.from, components, definitions); const b = wheel(link.to, components, definitions);
  if (Math.abs(dotVectors(a.axis, b.axis)) < 1 - 1e-6 || Math.abs(dotVectors(subtractVectors(b.center, a.center), a.axis)) > 1e-5) throw beltError('plane');
  const minimum = a.reverse !== b.reverse ? a.radius + b.radius : Math.abs(a.radius - b.radius);
  if (Math.hypot(...subtractVectors(a.center, b.center)) <= minimum + 1e-6) throw beltError('geometry');
  return true;
}

export function prepareBeltLink(link, links, components, definitions) {
  if (!validateBeltPair(link, components, definitions)) return link;
  for (const endpoint of [link.from, link.to]) {
    if (links.filter(value => value.kind === 'belt' && [value.from, value.to].some(other => keyOf(other) === keyOf(endpoint))).length >= 2) throw beltError('branch');
  }
  return { ...link, points: [] };
}

export function buildBeltPath(wheels, { maxSections = MAX_BELT_SECTIONS } = {}) {
  if (wheels.length < 2) throw beltError('open');
  const basis = wheels[0].frame.basis; const inverse = transposeRotation(basis);
  const origin = wheels[0].center; const axis = wheels[0].axis;
  let nodes = wheels.map(value => ({ ...value, local: transformVector(inverse, subtractVectors(value.center, origin)), leave: 0 }));
  // The game's area basis is (axis x [1,1,1], that vector x axis),
  // which has the opposite handedness to the wheel's local X/Y plane.
  const area = nodes.reduce((sum, node, i) => { const next = nodes[(i + 1) % nodes.length]; return sum + node.local[0] * next.local[1] - next.local[0] * node.local[1]; }, 0);
  if (area > 0) nodes.reverse();
  let cursor = 0;
  nodes.forEach((a, index) => {
    const b = nodes[(index + 1) % nodes.length];
    const opposite = a.reverse !== b.reverse;
    let positive = false; let found = false;
    for (let attempt = 0; attempt < BELT_TANGENTS * 2; attempt++) {
      const n = radial(cursor);
      const distance = dotVectors(subtractVectors(a.local, b.local), n) + a.radius - (opposite ? -b.radius : b.radius);
      if (distance > .0001) positive = true;
      else if (positive) {
        a.leave = cursor; if (opposite) cursor = wrap(cursor + BELT_TANGENTS / 2);
        found = true; break;
      }
      cursor = wrap(cursor + (a.reverse ? -1 : 1));
    }
    if (!found) throw beltError('geometry');
  });
  const samples = [];
  nodes.forEach((node, index) => {
    node.enter = cursor;
    for (let step = 0; step < BELT_TANGENTS; step++) {
      if (samples.length >= maxSections) throw beltError('limit');
      const n = transformVector(basis, radial(cursor));
      samples.push({ position: addVectors(node.center, scale(n, node.radius)), normal: scale(n, node.reverse ? -1 : 1), componentId: node.component.id, angleIndex: cursor, arcStep: 2 * node.radius * Math.sin(Math.PI / BELT_TANGENTS) });
      if (cursor === node.leave) break;
      cursor = wrap(cursor + (node.reverse ? -1 : 1));
    }
    if (node.reverse !== nodes[(index + 1) % nodes.length].reverse) cursor = wrap(cursor + BELT_TANGENTS / 2);
  });
  let length = 0; let textureLength = 0;
  samples.forEach((sample, i) => {
    const next = samples[(i + 1) % samples.length];
    const distance = Math.hypot(...subtractVectors(next.position, sample.position));
    sample.distance = length; sample.textureDistance = textureLength;
    length += distance;
    // Native rebuild counts an arc step at BOTH end samples, then adds the
    // straight span. Preserve that UV allocation, including the seam repeat.
    textureLength += sample.arcStep + (next.componentId !== sample.componentId ? distance : 0);
  });
  if (!Number.isFinite(length) || length <= 1e-8 || samples.length < 3) throw beltError('geometry');
  return { nodes, axis, samples, length, textureLength };
}

// One edge is a complete two-wheel belt. Multi-wheel belts follow the saved
// unbranched cycle, including reverse idlers; no hull or route-point guessing.
export function analyzeBelts(links, components, definitions, options = {}) {
  const candidates = links.filter(link => isOrdinaryBeltLink(link, components, definitions));
  const adjacency = new Map();
  for (const link of candidates) for (const endpoint of [link.from, link.to]) {
    const key = keyOf(endpoint); if (!adjacency.has(key)) adjacency.set(key, []); adjacency.get(key).push(link);
  }
  const visited = new Set(); const belts = []; const issues = [];
  let remaining = options.maxSections ?? MAX_BELT_SECTIONS;
  for (const first of candidates) {
    if (visited.has(first)) continue;
    const group = []; const pending = [first]; visited.add(first);
    for (let at = 0; at < pending.length; at++) {
      const link = pending[at]; group.push(link);
      for (const endpoint of [link.from, link.to]) for (const other of adjacency.get(keyOf(endpoint))) if (!visited.has(other)) { visited.add(other); pending.push(other); }
    }
    const linkIds = group.map(link => link.id).sort();
    try {
      for (const link of group) validateBeltPair(link, components, definitions);
      const endpoints = new Map(group.flatMap(link => [link.from, link.to]).map(endpoint => [keyOf(endpoint), endpoint]));
      if ([...endpoints.keys()].some(key => adjacency.get(key).length > 2)) throw beltError('branch');
      if (group.length > 1 && [...endpoints.keys()].some(key => adjacency.get(key).length !== 2)) throw beltError('open');
      const start = keyOf(first.from); const ordered = []; let current = start; let previous = null;
      do {
        ordered.push(endpoints.get(current));
        const edge = adjacency.get(current).find(link => link !== previous);
        if (!edge) break;
        current = keyOf(edge.from) === current ? keyOf(edge.to) : keyOf(edge.from); previous = edge;
      } while (current !== start && ordered.length <= endpoints.size);
      if (ordered.length !== endpoints.size) throw beltError('branch');
      const wheels = ordered.map(endpoint => wheel(endpoint, components, definitions));
      const path = buildBeltPath(wheels, { maxSections: remaining }); remaining -= path.samples.length;
      belts.push({ id: linkIds[0], linkIds, path, hidden: wheels.some(value => value.component.hidden), componentIds: wheels.map(value => value.component.id) });
    } catch (error) {
      if (!error.beltCode) throw error;
      issues.push({ linkIds, code: error.beltCode });
    }
  }
  return { belts, issues };
}
