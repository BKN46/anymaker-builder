const AXES = ['x', 'y', 'z'];

export function locatableSubgridErrors(diagnostics, topology) {
  const nodes = new Map((topology.nodes || []).map(node => [node.id, node]));
  const plates = new Map((topology.plates || []).map(plate => [plate.id, plate]));
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
    // Node and plate IDs may overlap in native imports. Use typed locations
    // so a plate ID never highlights an unrelated node with the same ID.
    if (Array.isArray(diagnostic.nodeIds)) {
      for (const id of diagnostic.nodeIds) add(id, diagnostic);
    } else if (['missing-edge-node', 'missing-plate-node'].includes(diagnostic.code)) {
      for (const id of diagnostic.entityIds) if (nodes.has(id)) add(id, diagnostic);
    } else if (diagnostic.code === 'invalid-plate') {
      const plate = plates.get(diagnostic.entityIds[0]);
      const anchor = plate?.nodeIds.find(id => nodes.has(id));
      if (anchor) add(anchor, diagnostic);
    }
  }
  return [...locations.values()];
}
