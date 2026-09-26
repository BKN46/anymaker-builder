const AXES = ['x', 'y', 'z'];

export function locatableSubgridErrors(diagnostics, topology) {
  const nodes = new Map((topology.nodes || []).map(node => [node.id, node]));
  const plates = new Map((topology.plates || []).map(plate => [plate.id, plate]));
  const unmounted = new Set(diagnostics.filter(item => item.severity === 'error' && item.code === 'unmounted-node').flatMap(item => item.entityIds));
  const locations = new Map();
  const add = (nodeId, diagnostic) => {
    const position = nodes.get(nodeId)?.position;
    if (!position || !AXES.every(axis => Number.isFinite(position[axis]))) return;
    const key = AXES.map(axis => position[axis].toFixed(6)).join(':');
    if (!locations.has(key)) locations.set(key, { position: { ...position }, nodeIds: [], codes: [] });
    const location = locations.get(key);
    if (!location.nodeIds.includes(nodeId)) location.nodeIds.push(nodeId);
    if (!location.codes.includes(diagnostic.code)) location.codes.push(diagnostic.code);
  };
  for (const diagnostic of diagnostics) {
    if (diagnostic.severity !== 'error') continue;
    if (diagnostic.code === 'unmounted-node') {
      for (const id of diagnostic.entityIds) add(id, diagnostic);
    } else if (diagnostic.code === 'dangling-edge' || diagnostic.code === 'dangling-plate') {
      for (const id of diagnostic.entityIds) if (unmounted.has(id)) add(id, diagnostic);
    } else if (diagnostic.code === 'invalid-plate') {
      const plate = plates.get(diagnostic.entityIds[0]);
      const anchor = plate?.nodeIds.find(id => nodes.has(id));
      if (anchor) add(anchor, diagnostic);
    }
  }
  return [...locations.values()];
}
