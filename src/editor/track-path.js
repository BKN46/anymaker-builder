import { componentFrame, transformVector, transposeRotation, subtractVectors, addVectors, dotVectors } from './component-frame.js';
import { isTrackLink, trackEndpoint } from './track-profiles.js';

export const TRACK_TANGENTS = 32;
export const MAX_TRACK_PIECES = 8192; // Editor allocation limit, not a game limit.
const tau = Math.PI * 2;
const step = tau / TRACK_TANGENTS;
const wrap = value => ((value % tau) + tau) % tau;
const keyOf = endpoint => JSON.stringify([endpoint.componentId, endpoint.port ?? 0]);
const scale = (v, s) => v.map(value => value * s);
const normal = angle => [-Math.sin(angle), Math.cos(angle), 0];
const cross2 = (a, b) => a[0] * b[1] - a[1] * b[0];
export const trackError = code => Object.assign(new Error('Track: ' + code), { trackCode: code });

function wheel(endpoint, components, definitions) {
  const data = trackEndpoint(endpoint, components, definitions);
  if (!data.isTrack || !data.profile) throw trackError('ports');
  const frame = componentFrame(data.component);
  if (frame.scale.some(value => Math.abs(value - 1) > 1e-8)) throw trackError('scale');
  const center = frame.point(data.profile.center.map(value => value / .08));
  if (!center.every(Number.isFinite)) throw trackError('geometry');
  const quantum = data.profile.pitch / tau;
  return { ...data, center, frame, axis: transformVector(frame.basis, [0, 0, 1]), radius: Math.round(data.profile.radius / quantum) * quantum };
}

export function validateTrackPair(link, components, definitions) {
  if (!isTrackLink(link, components, definitions)) return false;
  const a = wheel(link.from, components, definitions);
  const b = wheel(link.to, components, definitions);
  if (a.nodeType !== b.nodeType) throw trackError('width');
  if (dotVectors(a.axis, b.axis) < 1 - 1e-6 || Math.abs(dotVectors(subtractVectors(b.center, a.center), a.axis)) > 1e-5) throw trackError('plane');
  if (Math.hypot(...subtractVectors(a.center, b.center)) <= Math.abs(a.radius - b.radius) + 1e-6) throw trackError('geometry');
  return true;
}

export function prepareTrackLink(link, links, components, definitions) {
  if (!validateTrackPair(link, components, definitions)) return link;
  for (const endpoint of [link.from, link.to]) {
    if (links.filter(value => value.kind === 'belt' && [value.from, value.to].some(other => keyOf(other) === keyOf(endpoint))).length >= 2) throw trackError('branch');
  }
  return { ...link, points: [] };
}

// Ordered wheel centers, including concave idlers. Never replace by a convex hull.
export function buildTrackPath(wheels, profile, { maxPieces = MAX_TRACK_PIECES } = {}) {
  if (wheels.length < 2) throw trackError('open');
  const basis = wheels[0].frame.basis;
  const origin = wheels[0].center;
  const inverse = transposeRotation(basis);
  let nodes = wheels.map(value => ({ ...value, local: transformVector(inverse, subtractVectors(value.center, origin)), enter: 0, leave: 0 }));
  const area = nodes.reduce((sum, node, i) => sum + cross2(node.local, nodes[(i + 1) % nodes.length].local), 0);
  if (area < 0) nodes.reverse();
  // The game collapses a concave wheel's arc to the angle bisector.
  if (nodes.length > 2) nodes.forEach((node, i) => {
    const incoming = subtractVectors(node.local, nodes[(i + nodes.length - 1) % nodes.length].local);
    const outgoing = subtractVectors(nodes[(i + 1) % nodes.length].local, node.local);
    node.concave = cross2(incoming, outgoing) <= 1e-10;
    if (!node.concave) return;
    const a = wrap(Math.atan2(-incoming[1], -incoming[0]) - Math.PI / 2);
    let b = wrap(Math.atan2(outgoing[1], outgoing[0]) - Math.PI / 2);
    if (b < a) b += tau;
    node.enter = node.leave = Math.round((a + b) / 2 / step) % TRACK_TANGENTS;
  });
  let cursor = 0;
  nodes.forEach((a, i) => {
    const b = nodes[(i + 1) % nodes.length];
    let positive = false; let found = false;
    for (let attempt = 0; attempt < TRACK_TANGENTS * 2; attempt++) {
      const n = normal(cursor * step);
      const distance = dotVectors(subtractVectors(a.local, b.local), n) + a.radius - b.radius;
      if (distance > .0001) positive = true;
      else if (positive) {
        if (!a.concave) a.leave = cursor;
        if (!b.concave) b.enter = cursor;
        found = true; break;
      }
      cursor = (cursor + 1) % TRACK_TANGENTS;
    }
    if (!found) throw trackError('geometry');
  });
  const segments = [];
  const contact = (node, angle) => addVectors(node.local, scale(normal(angle), node.radius));
  nodes.forEach((node, i) => {
    const next = nodes[(i + 1) % nodes.length];
    const start = node.enter * step; const sweep = wrap((node.leave - node.enter) * step);
    segments.push({ kind: 'arc', length: sweep * node.radius, node, start, sweep });
    const from = contact(node, node.leave * step); const to = contact(next, next.enter * step);
    segments.push({ kind: 'line', length: Math.hypot(...subtractVectors(to, from)), from, to, angle: (node.leave + next.enter) / 2 * step });
  });
  const arcLength = segments.filter(segment => segment.kind === 'arc').reduce((sum, segment) => sum + segment.length, 0);
  const lineLength = segments.filter(segment => segment.kind === 'line').reduce((sum, segment) => sum + segment.length, 0);
  const nominalCount = Math.round(arcLength / profile.pitch) + Math.round(lineLength / profile.pitch);
  if (!Number.isFinite(nominalCount) || nominalCount > maxPieces) throw trackError('limit');
  if (nominalCount < 3 || lineLength < 1e-8) throw trackError('geometry');
  const lineScale = Math.round(lineLength / profile.pitch) * profile.pitch / lineLength;
  let length = 0;
  for (const segment of segments) {
    segment.offset = length; segment.allocated = segment.length * (segment.kind === 'line' ? lineScale : 1); length += segment.allocated;
  }
  // get_track_transforms emits at each pitch strictly before the allocated
  // path end. With mixed radii this can exceed rebuild's rounded count by one.
  const count = Math.ceil(length / profile.pitch - 1e-9);
  if (count > maxPieces) throw trackError('limit');
  const world = local => addVectors(origin, transformVector(basis, local));
  const sample = distance => {
    const at = ((distance % length) + length) % length;
    const segment = segments.find(value => value.allocated > 1e-10 && at < value.offset + value.allocated) || segments.findLast(value => value.allocated > 1e-10);
    const t = Math.max(0, Math.min(1, (at - segment.offset) / segment.allocated));
    const angle = segment.kind === 'arc' ? segment.start + segment.sweep * t : segment.angle;
    const point = segment.kind === 'arc' ? contact(segment.node, angle) : segment.from.map((value, i) => value + (segment.to[i] - value) * t);
    return { position: world(point), angle };
  };
  return { basis, nodes, segments, length, count, nominalCount, samples: Array.from({ length: count }, (_, i) => sample(i * profile.pitch)), sample };
}

// A two-wheel single edge is a complete native track. Larger networks must
// close without branches; unfinished imported/editor data remains untouched.
export function analyzeTracks(links, components, definitions, options) {
  const candidates = links.filter(link => isTrackLink(link, components, definitions));
  const adjacency = new Map();
  for (const link of candidates) for (const endpoint of [link.from, link.to]) {
    const key = keyOf(endpoint);
    if (!adjacency.has(key)) adjacency.set(key, []);
    adjacency.get(key).push(link);
  }
  const visited = new Set(); const tracks = []; const issues = [];
  let remaining = options?.maxPieces ?? MAX_TRACK_PIECES;
  for (const first of candidates) {
    if (visited.has(first)) continue;
    const group = []; const pending = [first]; const queued = new Set(pending);
    for (let at = 0; at < pending.length; at++) {
      const link = pending[at]; visited.add(link); group.push(link);
      for (const endpoint of [link.from, link.to]) for (const other of adjacency.get(keyOf(endpoint))) if (!queued.has(other)) { queued.add(other); pending.push(other); }
    }
    const linkIds = group.map(link => link.id).sort();
    try {
      for (const link of group) validateTrackPair(link, components, definitions);
      const endpoints = new Map(group.flatMap(link => [link.from, link.to]).map(endpoint => [keyOf(endpoint), endpoint]));
      if ([...endpoints.keys()].some(key => adjacency.get(key).length > 2)) throw trackError('branch');
      if (group.length > 1 && [...endpoints.keys()].some(key => adjacency.get(key).length !== 2)) throw trackError('open');
      const start = [...endpoints.keys()].sort()[0];
      const ordered = []; let current = start; let previous = null;
      do {
        ordered.push(endpoints.get(current));
        const edge = adjacency.get(current).find(link => link !== previous);
        if (!edge) break;
        current = keyOf(edge.from) === current ? keyOf(edge.to) : keyOf(edge.from); previous = edge;
      } while (current !== start && ordered.length <= endpoints.size);
      if (ordered.length !== endpoints.size) throw trackError('branch');
      const wheels = ordered.map(endpoint => wheel(endpoint, components, definitions));
      const profile = wheels[0].profile;
      const path = buildTrackPath(wheels, profile, { maxPieces: remaining });
      remaining -= path.count;
      tracks.push({ id: linkIds[0], linkIds, profile, path, hidden: wheels.some(value => value.component.hidden), componentIds: wheels.map(value => value.component.id) });
    } catch (error) {
      if (!error.trackCode) throw error;
      issues.push({ linkIds, code: error.trackCode });
    }
  }
  return { tracks, issues };
}
