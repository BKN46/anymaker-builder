import { validatePlatePolygon } from './plate-polygon.js';

// Drafts are sets of edges, not polygons. Only a complete single loop has a
// meaningful winding and plane; disconnected and collinear picks stay valid.
function closedLoop(edges) {
  const incident = new Map();
  for (const edge of edges) for (const id of [edge.a, edge.b]) {
    const list = incident.get(id) || [];
    list.push(edge); incident.set(id, list);
  }
  if (edges.length < 3 || [...incident.values()].some(list => list.length !== 2)) return null;
  const first = edges[0]; const ids = [first.a]; const used = new Set([first.id]);
  let current = first.b;
  while (current !== first.a) {
    const next = incident.get(current).find(edge => !used.has(edge.id));
    if (!next) return null;
    ids.push(current); used.add(next.id);
    current = next.a === current ? next.b : next.a;
  }
  return used.size === edges.length ? ids : null;
}

export function extendPlateSelection(draft, edgeId, edges, nodes) {
  const byEdgeId = new Map(edges.map(edge => [edge.id, edge]));
  const edge = byEdgeId.get(edgeId);
  if (!edge || edge.hidden) throw new Error('面板需要选择可见的梁');
  const previous = draft?.edgeIds || [];
  // A second click removes an edge, so an incomplete or invalid set can be
  // corrected without discarding the other selected boundary segments.
  const edgeIds = previous.includes(edgeId) ? previous.filter(id => id !== edgeId) : [...previous, edgeId];
  const selected = edgeIds.map(id => byEdgeId.get(id));
  if (selected.some(value => !value || value.hidden)) throw new Error('面板需要选择可见的梁');
  const byId = new Map(nodes.map(node => [node.id, node]));
  const uniqueIds = [...new Set(selected.flatMap(value => [value.a, value.b]))];
  for (const id of uniqueIds) if (!byId.has(id)) throw new Error('面板引用未知节点：' + id);
  const loop = closedLoop(selected);
  const first = selected[0];
  const gridId = first?.gridId || byId.get(first?.a)?.gridId || 'grid-1';
  if (loop) {
    if (selected.some(value => (value.gridId || byId.get(value.a).gridId || 'grid-1') !== gridId)
      || loop.some(id => byId.get(id).gridId && byId.get(id).gridId !== gridId)) throw new Error('面板不能跨越子网格');
    validatePlatePolygon(loop.map(id => byId.get(id).position));
  }
  return { edgeIds, nodeIds: loop || uniqueIds, gridId, size: Math.max(1, ...selected.map(value => value.size || 1)), closed: Boolean(loop) };
}
