// Staging a native vehicle as a subgrid is a document-level operation.  It
// deliberately knows nothing about Three.js so preview and final placement
// apply the exact same translation to portable editor data.

const copy = value => structuredClone(value);
const axes = ['x', 'y', 'z'];

function nextId(prefix, used) {
  let index = 1;
  let id = `${prefix}-${index}`;
  while (used.has(id)) id = `${prefix}-${++index}`;
  used.add(id);
  return id;
}

function vectorOffset(offset) {
  if (!offset || axes.some(axis => !Number.isFinite(offset[axis]))) throw new Error('Invalid imported subgrid placement');
  return Object.fromEntries(axes.map(axis => [axis, offset[axis]]));
}

function translatePosition(position, offset) {
  if (!position || axes.some(axis => !Number.isFinite(position[axis]))) throw new Error('Invalid imported subgrid position');
  return Object.fromEntries(axes.map(axis => [axis, position[axis] + offset[axis]]));
}

// IDs in native files are scoped to their source vehicle/grid.  Once a
// vehicle is added beside another editor project they must become globally
// unique, including the topology and connection endpoints.
export function stageImportedSubgrid(document, existing = {}) {
  if (!document || !Array.isArray(document.objects)) throw new Error('Imported vehicle has no component document');
  const topology = document.topology || { nodes: [], edges: [], plates: [], links: [] };
  const usedGrids = new Set(existing.grids || []);
  const gridId = nextId('imported-vehicle', usedGrids);
  const usedComponents = new Set(existing.components || []);
  const usedNodes = new Set(existing.nodes || []);
  const usedEdges = new Set(existing.edges || []);
  const usedPlates = new Set(existing.plates || []);
  const usedLinks = new Set(existing.links || []);
  const componentIds = new Map();
  const nodeIds = new Map();
  const objects = document.objects.map(object => {
    const id = nextId(`${gridId}-component`, usedComponents);
    componentIds.set(object.id, id);
    return { ...copy(object), id, gridId };
  });
  const nodes = (topology.nodes || []).map(node => {
    const id = nextId(`${gridId}-node`, usedNodes);
    nodeIds.set(node.id, id);
    return { ...copy(node), id, gridId };
  });
  const edges = (topology.edges || []).map(edge => ({
    ...copy(edge), id: nextId(`${gridId}-edge`, usedEdges),
    a: nodeIds.get(edge.a), b: nodeIds.get(edge.b), gridId,
  }));
  const plates = (topology.plates || []).map(plate => ({
    ...copy(plate), id: nextId(`${gridId}-plate`, usedPlates),
    nodeIds: plate.nodeIds.map(id => nodeIds.get(id)), gridId,
  }));
  const links = (topology.links || []).map(link => ({
    ...copy(link), id: nextId(`${gridId}-link`, usedLinks),
    from: { ...link.from, componentId: componentIds.get(link.from?.componentId) },
    to: { ...link.to, componentId: componentIds.get(link.to?.componentId) },
  }));
  if (edges.some(edge => !edge.a || !edge.b) || plates.some(plate => plate.nodeIds.some(id => !id)) || links.some(link => !link.from.componentId || !link.to.componentId)) throw new Error('Imported subgrid has an unresolved reference');
  return { gridId, objects, topology: { nodes, edges, plates, links } };
}

export function translateImportedSubgrid(staged, offset) {
  const shift = vectorOffset(offset);
  return {
    ...staged,
    objects: staged.objects.map(object => ({ ...copy(object), position: translatePosition(object.position, shift) })),
    topology: {
      nodes: staged.topology.nodes.map(node => ({ ...copy(node), position: translatePosition(node.position, shift) })),
      edges: staged.topology.edges.map(copy),
      plates: staged.topology.plates.map(copy),
      links: staged.topology.links.map(link => ({ ...copy(link), points: link.points.map(point => translatePosition(point, shift)) })),
    },
  };
}

// Link records have no persisted gridId.  A route belongs to this imported
// subgrid only when both endpoints are among the moved component records.
export function translateSubgridTopology(topology, componentIds, gridId, offset) {
  const shift = vectorOffset(offset);
  const members = new Set(componentIds);
  const movedLink = link => members.has(link.from?.componentId) && members.has(link.to?.componentId);
  return {
    ...topology,
    nodes: topology.nodes.map(node => node.gridId === gridId ? { ...copy(node), position: translatePosition(node.position, shift) } : copy(node)),
    edges: topology.edges.map(copy),
    plates: topology.plates.map(copy),
    links: (topology.links || []).map(link => movedLink(link) ? { ...copy(link), points: link.points.map(point => translatePosition(point, shift)) } : copy(link)),
  };
}
