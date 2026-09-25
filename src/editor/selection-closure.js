// Renderer-independent connected-selection helper. The UI supplies world-space
// component bounds; this module only reasons about IDs, topology and AABBs.
const gridOf = value => value?.gridId || 'grid-1';

function overlaps(a, b, padding) {
  return a.min.x - padding <= b.max.x && a.max.x + padding >= b.min.x
    && a.min.y - padding <= b.max.y && a.max.y + padding >= b.min.y
    && a.min.z - padding <= b.max.z && a.max.z + padding >= b.min.z;
}

function contains(bounds, point, padding) {
  return point.x >= bounds.min.x - padding && point.x <= bounds.max.x + padding
    && point.y >= bounds.min.y - padding && point.y <= bounds.max.y + padding
    && point.z >= bounds.min.z - padding && point.z <= bounds.max.z + padding;
}

/**
 * Return the transitive closure of directly touching/linked items in one grid.
 * Links connect components, component bounds connect to nodes/components, and
 * topology connects nodes to edges and complete plate boundaries.
 */
export function gridSelectionClosure({ components, topology, startComponentId, padding = 0 }) {
  const start = components.find(component => component.id === startComponentId);
  if (!start) return { components: [], topology: [] };
  const gridId = gridOf(start);
  const localComponents = components.filter(component => gridOf(component) === gridId && component.bounds);
  const nodes = (topology.nodes || []).filter(node => gridOf(node) === gridId);
  const edges = (topology.edges || []).filter(edge => gridOf(edge) === gridId);
  const plates = (topology.plates || []).filter(plate => gridOf(plate) === gridId);
  const componentById = new Map(localComponents.map(component => [component.id, component]));
  const nodeById = new Map(nodes.map(node => [node.id, node]));
  const edgesByNode = new Map();
  for (const edge of edges) for (const id of [edge.a, edge.b]) {
    const values = edgesByNode.get(id) || []; values.push(edge); edgesByNode.set(id, values);
  }
  const platesByNode = new Map();
  for (const plate of plates) for (const id of plate.nodeIds) {
    const values = platesByNode.get(id) || []; values.push(plate); platesByNode.set(id, values);
  }
  const linksByComponent = new Map();
  for (const link of topology.links || []) {
    const from = componentById.get(link.from?.componentId);
    const to = componentById.get(link.to?.componentId);
    if (!from || !to) continue;
    for (const id of [from.id, to.id]) {
      const values = linksByComponent.get(id) || []; values.push(link); linksByComponent.set(id, values);
    }
  }
  const selectedComponents = new Set();
  const selectedNodes = new Set();
  const selectedEdges = new Set();
  const selectedPlates = new Set();
  const queue = [{ kind: 'component', id: startComponentId }];
  while (queue.length) {
    const current = queue.shift();
    const selectedSet = current.kind === 'component' ? selectedComponents
      : current.kind === 'node' ? selectedNodes
        : current.kind === 'edge' ? selectedEdges : selectedPlates;
    if (selectedSet.has(current.id)) continue;
    selectedSet.add(current.id);
    if (current.kind === 'component') {
      const component = componentById.get(current.id); if (!component) continue;
      for (const other of localComponents) if (other.id !== component.id && overlaps(component.bounds, other.bounds, padding)) queue.push({ kind: 'component', id: other.id });
      for (const node of nodes) if (contains(component.bounds, node.position, padding)) queue.push({ kind: 'node', id: node.id });
      for (const link of linksByComponent.get(component.id) || []) {
        queue.push({ kind: 'component', id: link.from.componentId });
        queue.push({ kind: 'component', id: link.to.componentId });
      }
    } else if (current.kind === 'node') {
      for (const edge of edgesByNode.get(current.id) || []) queue.push({ kind: 'edge', id: edge.id });
      for (const plate of platesByNode.get(current.id) || []) queue.push({ kind: 'plate', id: plate.id });
    } else if (current.kind === 'edge') {
      const edge = edges.find(value => value.id === current.id); if (!edge) continue;
      queue.push({ kind: 'node', id: edge.a }, { kind: 'node', id: edge.b });
    } else {
      const plate = plates.find(value => value.id === current.id); if (!plate) continue;
      for (const id of plate.nodeIds) queue.push({ kind: 'node', id });
    }
  }
  return {
    components: [...selectedComponents],
    topology: [...selectedNodes].map(id => ({ kind: 'node', id }))
      .concat([...selectedEdges].map(id => ({ kind: 'edge', id })), [...selectedPlates].map(id => ({ kind: 'plate', id }))),
  };
}
