// Native vehicle links store `p0.pos` / `p1.pos` as an index into the
// definition's complete logic-node array.  It is deliberately not the index
// after filtering nodes for a network: a wheel's brake is node 2, for example.
//
// Evidence: game.gcl's vehicle_component_definition.logic_node has an
// explicit vec3_s32 position and the editor calls logic_node
// .get_position_extended before rendering/raycasting these nodes.

export function logicNodeNetwork(node) {
  const type = node?.type;
  if (!type || type === 'mechanical' || (typeof type === 'string' && type.startsWith('mechanical_'))) return 'mechanical';
  return type;
}

export function logicNodeSupportsNetwork(node, kind) {
  return logicNodeNetwork(node) === kind;
}

export function logicNodePort(definition, port = 0) {
  if (!Number.isInteger(port) || port < 0) return null;
  const nodes = definition?.logic_nodes;
  return Array.isArray(nodes) ? nodes[port] || null : null;
}

export function logicNodePortsForNetwork(definition, kind) {
  const nodes = Array.isArray(definition?.logic_nodes) ? definition.logic_nodes : [];
  return nodes
    .map((node, port) => ({ ...node, port, source: 'logic' }))
    .filter(node => logicNodeSupportsNetwork(node, kind));
}

// Observed native mechanical links put a control output in p0 and a
// mechanical_in node in p1. Keep route points in the same direction when the
// editor user selects the input first.
export function orientMechanicalLink(link, componentsById, definitionsByType) {
  if (link.kind !== 'mechanical') return link;
  const role = endpoint => {
    const type = componentsById.get(endpoint?.componentId)?.type;
    const node = logicNodePort(definitionsByType.get(type), endpoint?.port ?? 0);
    if (!node || !logicNodeSupportsNetwork(node, 'mechanical')) return null;
    if (node.type === 'mechanical_in') return 'input';
    return !node.type || node.type === 'mechanical_out' ? 'output' : null;
  };
  if (role(link.from) !== 'input' || role(link.to) !== 'output') return link;
  return { ...link, from: link.to, to: link.from, points: [...(link.points || [])].reverse() };
}

// Decompiled game.gcl (logic_node.get_position_extended) starts with the
// stored node `pos`, then, independently for X/Y/Z, adds `extend_size[axis]`
// only when that coordinate is strictly beyond `center_stretch[axis]`.
// This keeps a port on the anchored side of a stretched component fixed and
// moves one on its far side along with the generated geometry.
export function logicNodeCellPosition(node, extension = undefined, centerStretch = undefined) {
  const pos = node?.pos;
  const result = Array.isArray(pos) && pos.length === 3 && pos.every(Number.isFinite) ? [...pos] : [0, 0, 0];
  if (!Array.isArray(extension) || extension.length !== 3 || !extension.every(Number.isFinite)) return result;
  if (!Array.isArray(centerStretch) || centerStretch.length !== 3 || !centerStretch.every(Number.isFinite)) return result;
  for (let axis = 0; axis < 3; axis++) if (result[axis] > centerStretch[axis]) result[axis] += extension[axis];
  return result;
}

// Definition directions identify the face that a game connection leaves from.
// The route starts one cell beyond the logical node on that face; keep this
// mapping independent of Three.js so native and authored connections share it.
export function connectionDirectionVector(direction) {
  switch (direction) {
    case 1: return [1, 0, 0];
    case 2: return [0, -1, 0];
    case 3: return [0, 1, 0];
    case 4: return [0, 0, -1];
    case 5: return [0, 0, 1];
    default: return null;
  }
}

export function connectionRouteCellPosition(node, extension = undefined, centerStretch = undefined) {
  const result = logicNodeCellPosition(node, extension, centerStretch);
  const direction = connectionDirectionVector(node?.direction ?? node?.dir);
  if (direction) direction.forEach((value, axis) => { result[axis] += value; });
  return result;
}
