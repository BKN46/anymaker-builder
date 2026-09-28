import { validatePlatePolygon } from './plate-polygon.js';

const axes = ['x', 'y', 'z'];
const finitePoint = point => point && axes.every(axis => Number.isFinite(point[axis]));
const pairKey = (a, b) => JSON.stringify([a, b].sort());

// Native flood fill visits beams, plates and components. A plate follows
// its actual boundary beams, not every beam incident to one of its corners.
// Node ownership is derived later from the first incident beam.
export function analyzeStructuralTopology({ nodes = [], edges = [], plates = [] } = {}) {
  const diagnostics = [];
  const report = (code, severity, ids, message, nodeIds = []) => diagnostics.push({ code, severity, entityIds: [...new Set(ids.filter(Boolean))], message, nodeIds: [...new Set(nodeIds)] });
  const index = values => {
    const result = new Map();
    for (const value of values) {
      if (!value?.id || result.has(value.id)) report('duplicate-structural-id', 'error', [value?.id], 'Structural IDs must be present and unique within each kind.');
      else result.set(value.id, value);
    }
    return result;
  };
  const nodeById = index(nodes);
  const edgeById = index(edges);
  const plateById = index(plates);
  const incidentEdges = new Map([...nodeById.keys()].map(id => [id, []]));
  const boundaryEdges = new Map();
  const edgeByPair = new Map();
  const validEdges = new Set();
  const validPlates = new Set();
  for (const node of nodeById.values()) if (!finitePoint(node.position)) report('invalid-node-position', 'error', [node.id], 'Node position must contain finite numbers.', [node.id]);
  for (const edge of edgeById.values()) {
    const a = nodeById.get(edge.a); const b = nodeById.get(edge.b);
    if (!a || !b) { report('missing-edge-node', 'error', [edge.id, edge.a, edge.b], 'Edge references a missing node.', [edge.a, edge.b]); continue; }
    if (!finitePoint(a.position) || !finitePoint(b.position)) continue;
    if (edge.a === edge.b || axes.every(axis => Math.abs(a.position[axis] - b.position[axis]) < 1e-9)) {
      report('degenerate-edge', 'error', [edge.id, edge.a, edge.b], 'Beam endpoints must occupy different positions.', [edge.a, edge.b]); continue;
    }
    const key = pairKey(edge.a, edge.b);
    if (edgeByPair.has(key)) { report('duplicate-edge', 'error', [edge.id, edgeByPair.get(key).id], 'Two beams reference the same node pair.', [edge.a, edge.b]); continue; }
    edgeByPair.set(key, edge); validEdges.add(edge.id);
    incidentEdges.get(edge.a).push(edge.id); incidentEdges.get(edge.b).push(edge.id);
  }
  const unsupported = new Map();
  for (const plate of plateById.values()) {
    boundaryEdges.set(plate.id, []);
    const ids = plate.nodeIds;
    if (!Array.isArray(ids) || ids.length < 3 || new Set(ids).size !== ids.length) {
      report('invalid-plate', 'error', [plate.id], 'Plate needs at least three distinct boundary nodes.', Array.isArray(ids) ? ids : []); continue;
    }
    const missing = ids.filter(id => !nodeById.has(id));
    if (missing.length) { report('missing-plate-node', 'error', [plate.id, ...missing], 'Plate references a missing node.', ids); continue; }
    const points = ids.map(id => nodeById.get(id).position);
    if (!points.every(finitePoint)) continue;
    try { validatePlatePolygon(points); }
    catch { report('invalid-plate-geometry', 'error', [plate.id, ...ids], 'Plate boundary is degenerate, nonplanar or self-intersecting.', ids); continue; }
    validPlates.add(plate.id);
    let missingSides = 0;
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      if (!incidentEdges.get(id).length) {
        if (!unsupported.has(id)) unsupported.set(id, []);
        unsupported.get(id).push(plate.id);
      }
      const edge = edgeByPair.get(pairKey(id, ids[(i + 1) % ids.length]));
      if (edge) boundaryEdges.get(plate.id).push(edge.id);
      else missingSides++;
    }
    if (missingSides) report('missing-plate-boundary', 'warning', [plate.id], 'Plate boundary is missing one or more beams.');
  }
  for (const [id, plateIds] of unsupported) report('plate-node-without-beam', 'error', [id, ...plateIds], 'Plate node has no incident beam; native island splitting dereferences its first beam.', [id]);
  return { diagnostics, incidentEdges, boundaryEdges, validEdges, validPlates };
}
