import { CELL_SIZE_WORLD, cellToWorld } from './grid.js';

const subtract = (a, b) => a.map((value, axis) => value - b[axis]);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a.reduce((sum, value, axis) => sum + value * b[axis], 0);
const normal = points => cross(subtract(points[1], points[0]), subtract(points[2], points[0]));
const alignment = (a, b) => dot(a, b) / (Math.hypot(...a) * Math.hypot(...b));

function convexPlanar(points) {
  const n = normal(points);
  if (!Math.hypot(...n) || dot(n, subtract(points[3], points[0])) !== 0) return false;
  return points.every((point, i) => dot(cross(subtract(points[(i + 1) % 4], point), subtract(points[(i + 2) % 4], points[(i + 1) % 4])), n) > 0);
}

// Pair adjacent triangles on the integer construction lattice. Permit at most
// a one-cell correction per axis to flatten a nearly coplanar pair; already
// accepted quads stay locked and no neighboring triangle may invert/collapse.
export function mergeModelQuads(mesh, { adjustVertices = true } = {}) {
  const points = Array.from({ length: mesh.positions.length / 3 }, (_, i) => Array.from(mesh.positions.slice(i * 3, i * 3 + 3), value => Math.round(value / CELL_SIZE_WORLD)));
  const faces = Array.from({ length: mesh.indices.length / 3 }, (_, i) => Array.from(mesh.indices.slice(i * 3, i * 3 + 3)));
  const adjacency = points.map(() => []), shared = new Map();
  faces.forEach((face, id) => {
    face.forEach(vertex => adjacency[vertex].push(id));
    for (let i = 0; i < 3; i++) {
      const u = face[i], v = face[(i + 1) % 3], key = [Math.min(u, v), Math.max(u, v)].join(',');
      if (!shared.has(key)) shared.set(key, []);
      shared.get(key).push({ id, u, v, w: face[(i + 2) % 3] });
    }
  });
  const candidates = [];
  for (const pair of shared.values()) {
    if (pair.length !== 2 || pair[0].u !== pair[1].v || pair[0].v !== pair[1].u) continue;
    const [a, b] = pair;
    const similarity = alignment(normal(faces[a.id].map(id => points[id])), normal(faces[b.id].map(id => points[id])));
    if (similarity < .85) continue;
    candidates.push({ a: a.id, b: b.id, ring: [a.u, b.w, a.v, a.w], similarity });
  }
  candidates.sort((a, b) => b.similarity - a.similarity || a.a - b.a || a.b - b.b);
  const used = new Set(), locked = new Set(), polygons = [];
  const occupied = new Map(points.map((point, id) => [point.join(','), id]));
  let adjustedVertices = 0;
  for (const candidate of candidates) {
    const { a, b, ring } = candidate;
    if (used.has(a) || used.has(b)) continue;
    let accepted = convexPlanar(ring.map(id => points[id]));
    if (!accepted && adjustVertices) {
      let best = null;
      for (const vertex of ring) {
        if (locked.has(vertex)) continue;
        const original = points[vertex];
        const neighbors = adjacency[vertex].map(id => ({ face: faces[id], direction: normal(faces[id].map(index => points[index])) }));
        for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
          const cost = x * x + y * y + z * z;
          if (!cost || (best && cost >= best.cost)) continue;
          const position = [original[0] + x, original[1] + y, original[2] + z];
          if (occupied.has(position.join(','))) continue;
          points[vertex] = position;
          if (convexPlanar(ring.map(id => points[id])) && neighbors.every(({ face, direction }) => alignment(direction, normal(face.map(index => points[index]))) > .5)) best = { vertex, position, cost };
        }
        points[vertex] = original;
      }
      if (best) {
        occupied.delete(points[best.vertex].join(','));
        points[best.vertex] = best.position; occupied.set(best.position.join(','), best.vertex);
        adjustedVertices++; accepted = true;
      }
    }
    if (!accepted) continue;
    used.add(a); used.add(b); ring.forEach(id => locked.add(id)); polygons.push(ring);
  }
  faces.forEach((face, id) => { if (!used.has(id)) polygons.push(face); });
  return { positions: new Float64Array(points.flatMap(point => point.map(cellToWorld))), indices: mesh.indices.slice(), polygons, adjustedVertices };
}
