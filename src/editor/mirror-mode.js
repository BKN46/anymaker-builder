// Shared integer-grid reflection rules for the interactive mirror mode.
// Keeping this independent of Three.js makes the construction operations
// deterministic and keeps the mirror plane valid for saved editor data.
import { AXES, assertGridScalar, assertGridVector } from './grid.js';
import { mergeNodes, moveNodeAndMerge, validateTopologyState } from './topology.js';

export function mirrorPoint(value, { axis = 'x', offset = 0 } = {}) {
  if (!AXES.includes(axis)) throw new Error('镜像平面无效');
  const point = assertGridVector(value, '镜像点');
  const planeOffset = assertGridScalar(offset, '镜像偏移');
  return { ...point, [axis]: assertGridScalar(2 * planeOffset - point[axis], '镜像点') };
}

export function sameGridPoint(a, b) {
  return AXES.every(axis => a?.[axis] === b?.[axis]);
}

export function mirrorSurfaceDirection(direction, { axis = 'x' } = {}) {
  if (!AXES.includes(axis)) throw new Error('镜像平面无效');
  if (!direction || AXES.some(key => !Number.isFinite(direction[key]))) return null;
  return { ...direction, [axis]: -direction[axis] };
}

export function mirrorRotation(rotation, { axis = 'x' } = {}) {
  if (!AXES.includes(axis)) throw new Error('镜像平面无效');
  if (!rotation || AXES.some(key => !Number.isFinite(rotation[key]))) throw new Error('组件旋转无效');
  return Object.fromEntries(AXES.map(key => [key, key === axis ? rotation[key] : -rotation[key]]));
}

export function mirrorPositionPreview(position, { axis = 'x', offset = 0 } = {}) {
  if (!AXES.includes(axis)) throw new Error('镜像平面无效');
  return Object.fromEntries(AXES.map(key => [key, key === axis ? 2 * offset - position[key] : position[key]]));
}

export function moveMirroredNode(state, nodeId, value, counterpartId, plane) {
  if (counterpartId === nodeId && value[plane.axis] !== plane.offset) throw new Error('镜像平面上的节点只能沿平面移动');
  if (!counterpartId || counterpartId === nodeId) return moveNodeAndMerge(state, nodeId, value);
  const target = assertGridVector(value, '节点坐标');
  const reflected = mirrorPoint(target, plane);
  const next = validateTopologyState(state);
  if (!next.nodes.some(node => node.id === nodeId) || !next.nodes.some(node => node.id === counterpartId)) throw new Error('镜像节点不存在');
  let candidate = { ...next, nodes: next.nodes.map(node => node.id === nodeId
    ? { ...node, position: target }
    : node.id === counterpartId ? { ...node, position: reflected } : node) };
  const idMap = {};
  for (const id of [nodeId, counterpartId]) {
    const node = candidate.nodes.find(item => item.id === id);
    if (!node) continue;
    const occupied = candidate.nodes.find(item => item.id !== id && sameGridPoint(item.position, node.position));
    if (!occupied) continue;
    const merged = mergeNodes(candidate.nodes, candidate.edges, candidate.plates, id, occupied.id, candidate.links);
    candidate = merged;
    idMap[id] = occupied.id;
  }
  return { ...validateTopologyState(candidate), merged: Object.keys(idMap).length > 0, idMap };
}
