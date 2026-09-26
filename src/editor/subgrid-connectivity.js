// Renderer-independent structural island analysis.
//
// The checker does not use a padded render AABB as a structural connection.
// The observed game node representation is a one-cell cube (the eight
// +/-0.5 corners), so a node is mounted only when that cube reaches a
// component boundary. This module is a conservative editor diagnostic; it
// does not claim to reproduce opaque game code that has not been recovered.

const entityKey = (kind, id) => `${kind}:${id}`;
const EPSILON = 1e-6;
const DEFAULT_CELL_SIZE = 0.08;
const AXES = ['x', 'y', 'z'];

function point(value) { return value?.position || value; }
function finitePoint(value) { return value && AXES.every(axis => Number.isFinite(value[axis])); }
function validBounds(bounds) {
  return bounds?.min && bounds?.max && finitePoint(bounds.min) && finitePoint(bounds.max)
    && AXES.every(axis => bounds.min[axis] <= bounds.max[axis]);
}
function intervalGap(aMin, aMax, bMin, bMax) { return Math.max(0, Math.max(aMin, bMin) - Math.min(aMax, bMax)); }

// Two component volumes are connected only when their boxes touch at a face,
// edge, or corner. Fully overlapping AABBs are deliberately not treated as a
// structural connection: overlap is a placement/collision diagnostic, not a
// editor island edge.
function boxesTouch(a, b, epsilon = EPSILON) {
  if (!validBounds(a) || !validBounds(b)) return false;
  const gaps = AXES.map(axis => intervalGap(a.min[axis], a.max[axis], b.min[axis], b.max[axis]));
  if (gaps.some(gap => gap > epsilon)) return false;
  const overlaps = AXES.map(axis => Math.min(a.max[axis], b.max[axis]) - Math.max(a.min[axis], b.min[axis]));
  return overlaps.some(overlap => overlap >= -epsilon && overlap <= epsilon);
}

// A node point may be on a face, edge, or corner, and the node cube extends
// half a construction cell on each axis. Requiring the nearest boundary to be
// within that half-cell prevents an arbitrary point deep inside a Mesh AABB
// from being mistaken for a mounted structural node.
function nodeTouchesComponent(node, component, cellSize, epsilon = EPSILON) {
  if (!finitePoint(point(node))) return false;
  if (node.componentId && node.componentId === component.id) return true;
  const value = point(node);
  const half = Math.abs(cellSize) / 2;
  return structuralRegions(component).some(bounds => {
    const insideExpanded = AXES.every(axis => value[axis] >= bounds.min[axis] - half - epsilon
      && value[axis] <= bounds.max[axis] + half + epsilon);
    if (!insideExpanded) return false;
    const distance = Math.min(...AXES.flatMap(axis => [
      Math.abs(value[axis] - bounds.min[axis]),
      Math.abs(value[axis] - bounds.max[axis]),
    ]));
    return distance <= half + epsilon;
  });
}

function connect(graph, a, b) {
  if (!graph.has(a)) graph.set(a, new Set());
  if (!graph.has(b)) graph.set(b, new Set());
  graph.get(a).add(b); graph.get(b).add(a);
}
function addDiagnostic(diagnostics, code, severity, entityIds, message) {
  diagnostics.push({ code, severity, entityIds: [...new Set(entityIds.filter(Boolean))], message });
}
function entityFromKey(key) {
  const split = key.indexOf(':');
  return { kind: key.slice(0, split), id: key.slice(split + 1) };
}
function structuralBounds(component) { return validBounds(component?.occupancyBounds) ? component.occupancyBounds : component?.bounds; }
function structuralRegions(component) {
  const regions = (component?.occupancyRegions || []).filter(validBounds);
  return regions.length ? regions : [structuralBounds(component)].filter(validBounds);
}

function buildAnalysis({ components = [], topology = {}, cellSize = DEFAULT_CELL_SIZE, epsilon = EPSILON } = {}) {
  const graph = new Map();
  const componentById = new Map();
  const nodeById = new Map();
  const edgeById = new Map();
  const plateById = new Map();
  const referencedNodeIds = new Set();
  const diagnostics = [];
  for (const component of components) {
    if (!component?.id) continue;
    componentById.set(component.id, component);
    graph.set(entityKey('component', component.id), new Set());
    if (!structuralRegions(component).length) addDiagnostic(diagnostics, 'missing-component-bounds', 'warning', [component.id], 'Component has no usable structural bounds.');
    else if (!(component?.occupancyRegions || []).some(validBounds) && !validBounds(component.occupancyBounds)) addDiagnostic(diagnostics, 'missing-occupancy-bounds', 'info', [component.id], 'Component uses a visual fallback because no definition occupancy zone is available.');
  }
  for (const node of topology.nodes || []) {
    if (!node?.id) continue;
    nodeById.set(node.id, node); graph.set(entityKey('node', node.id), new Set());
  }
  for (const edge of topology.edges || []) {
    if (!edge?.id) continue;
    edgeById.set(edge.id, edge); graph.set(entityKey('edge', edge.id), new Set());
    if (!nodeById.has(edge.a) || !nodeById.has(edge.b)) {
      addDiagnostic(diagnostics, 'missing-edge-node', 'error', [edge.id, edge.a, edge.b], 'Edge references a missing node.');
      continue;
    }
    connect(graph, entityKey('edge', edge.id), entityKey('node', edge.a));
    connect(graph, entityKey('edge', edge.id), entityKey('node', edge.b));
    referencedNodeIds.add(edge.a); referencedNodeIds.add(edge.b);
  }
  for (const plate of topology.plates || []) {
    if (!plate?.id) continue;
    plateById.set(plate.id, plate); graph.set(entityKey('plate', plate.id), new Set());
    const nodeIds = [...new Set(plate.nodeIds || [])];
    if (nodeIds.length < 3) addDiagnostic(diagnostics, 'invalid-plate', 'error', [plate.id], 'Plate has fewer than three distinct nodes.');
    for (const nodeId of nodeIds) {
      if (!nodeById.has(nodeId)) addDiagnostic(diagnostics, 'missing-plate-node', 'error', [plate.id, nodeId], 'Plate references a missing node.');
      else { connect(graph, entityKey('plate', plate.id), entityKey('node', nodeId)); referencedNodeIds.add(nodeId); }
    }
  }
  const bounded = [...componentById.values()].filter(component => structuralRegions(component).length);
  for (let index = 0; index < bounded.length; index++) {
    for (let other = index + 1; other < bounded.length; other++) {
      if (structuralRegions(bounded[index]).some(a => structuralRegions(bounded[other]).some(b => boxesTouch(a, b, epsilon)))) {
        connect(graph, entityKey('component', bounded[index].id), entityKey('component', bounded[other].id));
      }
    }
  }
  const mountedNodes = new Map([...nodeById.keys()].map(id => [id, new Set()]));
  for (const node of nodeById.values()) {
    for (const component of bounded) {
      if (nodeTouchesComponent(node, component, cellSize, epsilon)) {
        mountedNodes.get(node.id).add(component.id);
        connect(graph, entityKey('node', node.id), entityKey('component', component.id));
      }
    }
    if (!mountedNodes.get(node.id).size) addDiagnostic(diagnostics, 'unmounted-node', 'error', [node.id], 'Node does not reach a component installation boundary.');
    if (!referencedNodeIds.has(node.id) && node.standalone !== true && node.nativeProjected !== true) {
      addDiagnostic(diagnostics, 'unreferenced-node', 'warning', [node.id], 'Node is not referenced by an edge or plate.');
    }
  }
  for (const link of topology.links || []) {
    const from = link?.from?.componentId;
    const to = link?.to?.componentId;
    if (!componentById.has(from) || !componentById.has(to)) {
      addDiagnostic(diagnostics, 'missing-link-component', 'error', [link?.id, from, to], 'Connection references a missing component.');
      continue;
    }
    connect(graph, entityKey('component', from), entityKey('component', to));
    const fromGrid = link.gridId || componentById.get(from)?.gridId;
    const toGrid = componentById.get(to)?.gridId;
    if (fromGrid && toGrid && fromGrid !== toGrid) addDiagnostic(diagnostics, 'cross-grid-link', 'warning', [link.id, from, to], 'Connection crosses existing subgrid ownership.');
  }
  for (const edge of edgeById.values()) {
    const aMounted = mountedNodes.get(edge.a)?.size || 0;
    const bMounted = mountedNodes.get(edge.b)?.size || 0;
    if (!aMounted || !bMounted) addDiagnostic(diagnostics, 'dangling-edge', 'error', [edge.id, edge.a, edge.b], 'Edge has an endpoint that is not mounted to a component.');
    const aGrid = nodeById.get(edge.a)?.gridId;
    const bGrid = nodeById.get(edge.b)?.gridId;
    if (aGrid && bGrid && aGrid !== bGrid) addDiagnostic(diagnostics, 'cross-grid-edge', 'warning', [edge.id, edge.a, edge.b], 'Edge crosses existing subgrid ownership.');
  }
  for (const plate of plateById.values()) {
    const mounted = (plate.nodeIds || []).filter(id => mountedNodes.get(id)?.size).length;
    if (mounted < 3) addDiagnostic(diagnostics, 'dangling-plate', 'error', [plate.id, ...(plate.nodeIds || [])], 'Plate has fewer than three mounted nodes.');
    const grids = new Set((plate.nodeIds || []).map(id => nodeById.get(id)?.gridId).filter(Boolean));
    if (grids.size > 1) addDiagnostic(diagnostics, 'cross-grid-plate', 'warning', [plate.id, ...(plate.nodeIds || [])], 'Plate crosses existing subgrid ownership.');
  }
  const visited = new Set(); const groups = [];
  for (const start of graph.keys()) {
    if (visited.has(start)) continue;
    const queue = [start]; const members = []; visited.add(start);
    while (queue.length) {
      const current = queue.shift(); members.push(current);
      for (const next of graph.get(current) || []) if (!visited.has(next)) { visited.add(next); queue.push(next); }
    }
    groups.push({
      components: members.filter(key => key.startsWith('component:')).map(key => key.slice('component:'.length)),
      topology: members.filter(key => !key.startsWith('component:')).map(entityFromKey),
    });
  }
  const structuralGroups = groups.filter(group => group.components.length || group.topology.length);
  if (structuralGroups.length > 1) addDiagnostic(diagnostics, 'multiple-islands', 'info', structuralGroups.flatMap(group => [...group.components, ...group.topology.map(item => item.id)]), 'Vehicle contains multiple disconnected structural islands.');
  for (const group of structuralGroups) {
    const gridIds = new Set(group.components.map(id => componentById.get(id)?.gridId).filter(Boolean));
    if (gridIds.size > 1) addDiagnostic(diagnostics, 'mixed-grid-island', 'warning', group.components, 'One structural island contains multiple existing grid IDs.');
  }
  return { groups, diagnostics, isValid: diagnostics.every(item => item.severity !== 'error') };
}

export function analyzeSubgridIntegrity(options = {}) { return buildAnalysis(options); }

/**
 * Partition records using the same strict game-evidence connection rules as
 * the integrity checker. `padding` is accepted for source compatibility but
 * intentionally ignored; padded AABBs caused false island merges.
 */
export function partitionSubgrids(options = {}) { return buildAnalysis(options).groups; }
