// Apply a complete connectivity analysis as one serializable ownership edit.
// Geometry and references stay in editor world space; no entity is duplicated.
export function applySubgridPartition(document, analysis) {
  if (!analysis?.isValid || !Array.isArray(analysis.groups)) throw new Error('Cannot partition an invalid subgrid analysis');
  const records = new Map();
  const topology = document.topology || {};
  const collections = [['component', document.objects], ['node', topology.nodes], ['edge', topology.edges], ['plate', topology.plates]];
  for (const [kind, items] of collections) for (const item of items || []) {
    const key = kind + ':' + item.id;
    if (records.has(key)) throw new Error('Duplicate partition entity: ' + key);
    records.set(key, item);
  }
  const membership = new Map();
  const groups = analysis.groups.map((group, index) => {
    const keys = [...group.components.map(id => 'component:' + id), ...group.topology.map(item => item.kind + ':' + item.id)];
    if (!keys.length) throw new Error('Empty partition group');
    const counts = new Map();
    for (const key of keys) {
      if (!records.has(key) || membership.has(key)) throw new Error('Unknown or repeated partition entity: ' + key);
      membership.set(key, index);
      const id = records.get(key).gridId || 'grid-1';
      counts.set(id, (counts.get(id) || 0) + 1);
    }
    return { index, keys, counts, first: [...keys].sort()[0] };
  });
  if (membership.size !== records.size) throw new Error('Incomplete subgrid partition');
  const sameGroup = (a, b) => {
    if (!membership.has(a) || !membership.has(b) || membership.get(a) !== membership.get(b)) throw new Error('Partition cuts a structural reference');
  };
  for (const edge of topology.edges || []) for (const id of [edge.a, edge.b]) sameGroup('edge:' + edge.id, 'node:' + id);
  for (const plate of topology.plates || []) for (const id of plate.nodeIds) sameGroup('plate:' + plate.id, 'node:' + id);
  for (const link of topology.links || []) for (const endpoint of [link.from, link.to]) {
    if (!records.has('component:' + endpoint?.componentId)) throw new Error('Missing partition link endpoint');
  }
  for (const connection of topology.mechanicalConnections || []) for (const id of [connection.from, connection.to]) {
    if (!records.has('component:' + id)) throw new Error('Missing partition mate endpoint');
  }
  // The largest fragment of each old grid has first claim on its ID. Stable
  // entity IDs break ties, so reordering the analysis never renames bodies.
  const owners = new Map();
  for (const group of groups) for (const [id, count] of group.counts) {
    const previous = owners.get(id);
    if (!previous || count > previous.count || (count === previous.count && group.first < previous.group.first)) owners.set(id, { group, count });
  }
  const used = new Set([...(document.grids || []).map(grid => grid.id), ...owners.keys()]);
  let sequence = 1;
  const allocated = new Map();
  for (const group of [...groups].sort((a, b) => a.first.localeCompare(b.first))) {
    const candidates = [...group.counts].filter(([id]) => owners.get(id).group === group).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    let id = candidates[0]?.[0];
    if (!id) { while (used.has('grid-' + sequence)) sequence++; id = 'grid-' + sequence++; used.add(id); }
    allocated.set(group.index, id);
  }
  const next = structuredClone(document);
  let changed = false;
  const assign = (kind, item) => {
    const id = allocated.get(membership.get(kind + ':' + item.id));
    if ((item.gridId || 'grid-1') !== id) { item.gridId = id; changed = true; }
  };
  for (const object of next.objects) assign('component', object);
  for (const [kind, field] of [['node', 'nodes'], ['edge', 'edges'], ['plate', 'plates']]) for (const item of next.topology?.[field] || []) assign(kind, item);
  for (const link of next.topology?.links || []) if (link.gridId !== undefined) {
    const id = allocated.get(membership.get('component:' + link.from.componentId));
    if (link.gridId !== id) { link.gridId = id; changed = true; }
  }
  if (changed) {
    const occupied = new Set(allocated.values());
    // Keep explicitly created empty grids, but remove old mounting-frame
    // IDs absorbed into a connected body.
    const ids = (document.grids || []).map(grid => grid.id).filter(id => occupied.has(id) || !owners.has(id));
    for (const id of occupied) if (!ids.includes(id)) ids.push(id);
    const previous = new Map((document.grids || []).map(grid => [grid.id, grid]));
    next.grids = ids.map(id => structuredClone(previous.get(id) || { id }));
  }
  return { document: next, changed };
}
