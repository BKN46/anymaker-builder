// Pure structural topology commands. They operate on model collections and
// return new values, allowing the UI to preview and commit one transaction.
import { AXES, assertGridVector, cellToWorld, cellsBetween, greatestCommonDivisor, worldToCell } from './grid.js';

const EPSILON = 1e-6;
const clone = value => structuredClone(value);
const position = node => ({ x: Number(node.position?.x ?? 0), y: Number(node.position?.y ?? 0), z: Number(node.position?.z ?? 0) });
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
const cross = (a, b) => ({ x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x });
const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
const length = value => Math.hypot(value.x, value.y, value.z);
const same = (a, b) => length(sub(a, b)) <= EPSILON;
const edgeKey = (a, b) => [a, b].sort().join('::');

export function validateTopologyState(state = {}) {
  const nodes = Array.isArray(state.nodes) ? state.nodes : [];
  const edges = Array.isArray(state.edges) ? state.edges : [];
  const plates = Array.isArray(state.plates) ? state.plates : [];
  const nodeIds = new Set();
  const points = new Map();
  const normalizedNodes = [];
  for (const node of nodes) {
    if (!node || typeof node.id !== 'string' || !node.id || nodeIds.has(node.id)) throw new Error('节点 ID 无效或重复');
    const gridPosition = assertGridVector(node.position, '节点坐标');
    nodeIds.add(node.id);
    points.set(node.id, gridPosition);
    normalizedNodes.push({ ...clone(node), position: gridPosition });
  }
  const edgeIds = new Set();
  for (const edge of edges) {
    if (!edge || typeof edge.id !== 'string' || !edge.id || edgeIds.has(edge.id)) throw new Error('梁 ID 无效或重复');
    if (!nodeIds.has(edge.a) || !nodeIds.has(edge.b) || edge.a === edge.b) throw new Error('梁引用未知或相同节点');
    if (same(points.get(edge.a), points.get(edge.b))) throw new Error('梁长度必须大于零');
    edgeIds.add(edge.id);
  }
  const plateIds = new Set();
  for (const plate of plates) {
    if (!plate || typeof plate.id !== 'string' || !plate.id || plateIds.has(plate.id)) throw new Error('面板 ID 无效或重复');
    validatePlate(plate.nodeIds, nodes);
    plateIds.add(plate.id);
  }
  return { nodes: normalizedNodes, edges: clone(edges), plates: clone(plates) };
}

function newId(values, prefix) {
  const used = new Set(values.map(value => String(value.id)));
  let index = 1;
  while (used.has(`${prefix}-${index}`)) index++;
  return `${prefix}-${index}`;
}

export function createNode(nodes, value, prefix = 'node') {
  const next = validateTopologyState({ nodes, edges: [], plates: [] }).nodes;
  const point = assertGridVector(value, '节点坐标');
  const existing = next.find(node => same(position(node), point));
  if (existing) return { nodes: next, node: existing, created: false };
  const node = { id: newId(next, prefix), position: point };
  next.push(node);
  return { nodes: next, node, created: true };
}

export function moveNode(nodes, nodeId, value) {
  const point = assertGridVector(value, '节点坐标');
  let found = false;
  const next = clone(nodes).map(node => {
    if (node.id !== nodeId) return node;
    found = true;
    return { ...node, position: point };
  });
  if (!found) throw new Error('节点不存在：' + nodeId);
  return { nodes: next };
}

export function moveNodeAndMerge(state, nodeId, value) {
  const next = validateTopologyState(state);
  const point = assertGridVector(value, '节点坐标');
  if (!next.nodes.some(node => node.id === nodeId)) throw new Error('节点不存在：' + nodeId);
  const target = next.nodes.find(node => node.id !== nodeId && same(position(node), point));
  if (target) {
    const merged = mergeNodes(next.nodes, next.edges, next.plates, nodeId, target.id);
    return { ...validateTopologyState(merged), merged: true, idMap: merged.idMap };
  }
  const moved = moveNode(next.nodes, nodeId, point);
  return { ...validateTopologyState({ ...next, nodes: moved.nodes }), merged: false, idMap: {} };
}

export function mergeNodes(nodes, edges, plates, sourceId, targetId) {
  if (sourceId === targetId) throw new Error('不能将节点合并到自身');
  if (!nodes.some(node => node.id === sourceId) || !nodes.some(node => node.id === targetId)) throw new Error('合并节点不存在');
  const nextEdges = [];
  const seenEdges = new Set();
  for (const edge of edges) {
    const a = edge.a === sourceId ? targetId : edge.a;
    const b = edge.b === sourceId ? targetId : edge.b;
    if (a === b) continue;
    const key = edgeKey(a, b);
    if (seenEdges.has(key)) continue;
    seenEdges.add(key);
    nextEdges.push({ ...clone(edge), a, b });
  }
  const nextPlates = clone(plates).map(plate => ({ ...plate, nodeIds: plate.nodeIds.map(id => id === sourceId ? targetId : id) }))
    .map(plate => ({ ...plate, nodeIds: plate.nodeIds.filter((id, index, ids) => ids.indexOf(id) === index) }))
    .filter(plate => plate.nodeIds.length >= 3);
  return { nodes: nodes.filter(node => node.id !== sourceId).map(clone), edges: nextEdges, plates: nextPlates, idMap: { [sourceId]: targetId } };
}

export function removeNode(state, nodeId) {
  if (!state.nodes.some(node => node.id === nodeId)) throw new Error('节点不存在：' + nodeId);
  return validateTopologyState({
    nodes: state.nodes.filter(node => node.id !== nodeId),
    edges: state.edges.filter(edge => edge.a !== nodeId && edge.b !== nodeId),
    plates: state.plates.filter(plate => !plate.nodeIds.includes(nodeId)),
  });
}

export function removeEdge(state, edgeId) {
  if (!state.edges.some(edge => edge.id === edgeId)) throw new Error('梁不存在：' + edgeId);
  return validateTopologyState({ ...state, edges: state.edges.filter(edge => edge.id !== edgeId) });
}

export function removePlate(state, plateId) {
  if (!state.plates.some(plate => plate.id === plateId)) throw new Error('面板不存在：' + plateId);
  return validateTopologyState({ ...state, plates: state.plates.filter(plate => plate.id !== plateId) });
}

export function createEdge(edges, a, b, properties = {}) {
  if (!a || !b || a === b) throw new Error('梁必须连接两个不同节点');
  if (edges.some(edge => edgeKey(edge.a, edge.b) === edgeKey(a, b))) throw new Error('梁已存在');
  const extras = clone(properties);
  delete extras.id; delete extras.a; delete extras.b;
  const edge = { id: newId(edges, 'edge'), a, b, ...extras };
  return { edges: [...clone(edges), edge], edge };
}

export function createBeam(state, start, end) {
  const next = validateTopologyState(state);
  const a = createNode(next.nodes, start);
  const b = createNode(a.nodes, end);
  const result = createEdge(next.edges, a.node.id, b.node.id);
  return validateTopologyState({ ...next, nodes: b.nodes, edges: result.edges });
}

export function edgeSplitPoints(nodes, edgeId, edges = []) {
  const edge = (edges.length ? edges : []).find(value => value.id === edgeId);
  if (!edge) throw new Error('梁不存在：' + edgeId);
  const a = nodes.find(node => node.id === edge.a); const b = nodes.find(node => node.id === edge.b);
  if (!a || !b) throw new Error('梁引用未知节点');
  const start = assertGridVector(a.position, '梁起点');
  const deltaCells = cellsBetween(start, b.position);
  const segments = greatestCommonDivisor(AXES.map(axis => deltaCells[axis]));
  if (segments <= 1) return [];
  return Array.from({ length: segments - 1 }, (_, index) => Object.fromEntries(AXES.map(axis => [axis, cellToWorld(worldToCell(start[axis]) + deltaCells[axis] * (index + 1) / segments)])));
}

export function splitEdge(nodes, edges, edgeId, point) {
  const edge = edges.find(value => value.id === edgeId);
  if (!edge) throw new Error('梁不存在：' + edgeId);
  const a = nodes.find(node => node.id === edge.a); const b = nodes.find(node => node.id === edge.b);
  if (!a || !b) throw new Error('梁引用未知节点');
  const start = assertGridVector(a.position, '梁起点');
  const deltaCells = cellsBetween(start, b.position);
  const segments = greatestCommonDivisor(AXES.map(axis => deltaCells[axis]));
  if (segments <= 1) throw new Error('该梁没有可用整格分割点');
  const candidate = assertGridVector(point, '分割点');
  const candidateCells = cellsBetween(start, candidate);
  let step = null;
  for (const axis of AXES) {
    const delta = deltaCells[axis]; const offset = candidateCells[axis];
    if (delta === 0) { if (offset !== 0) throw new Error('分割点必须位于梁中心线内部'); continue; }
    if (offset * delta <= 0 || Math.abs(offset) >= Math.abs(delta) || offset * segments % delta !== 0) throw new Error('分割点必须位于梁中心线内部');
    const value = offset * segments / delta;
    if (step !== null && step !== value) throw new Error('分割点必须位于梁中心线内部');
    step = value;
  }
  if (!Number.isInteger(step) || step <= 0 || step >= segments) throw new Error('分割点必须位于梁中心线内部');
  const created = createNode(nodes, candidate, 'node');
  const without = edges.filter(value => value.id !== edgeId);
  const first = createEdge(without, edge.a, created.node.id, edge).edges;
  const second = createEdge(first, created.node.id, edge.b, edge).edges;
  return { nodes: created.nodes, edges: second, node: created.node, replaced: edge };
}

export function validatePlate(nodeIds, nodes) {
  if (!Array.isArray(nodeIds) || nodeIds.length < 3) throw new Error('面板至少需要三个节点');
  if (new Set(nodeIds).size !== nodeIds.length) throw new Error('面板节点不能重复');
  const byId = new Map(nodes.map(node => [node.id, node]));
  const points = nodeIds.map(id => { const node = byId.get(id); if (!node) throw new Error('面板引用未知节点：' + id); return position(node); });
  const normal = cross(sub(points[1], points[0]), sub(points[2], points[0]));
  if (length(normal) <= EPSILON) throw new Error('面板节点不能共线');
  for (const point of points.slice(3)) if (Math.abs(dot(normal, sub(point, points[0]))) > EPSILON) throw new Error('面板节点必须共面');
  return { points, normal };
}

export function createPlate(plates, nodeIds, nodes, properties = {}) {
  validatePlate(nodeIds, nodes);
  const plate = { id: newId(plates, 'plate'), nodeIds: [...nodeIds], ...clone(properties) };
  return { plates: [...clone(plates), plate], plate };
}

export function triangulatePlate(plate, nodes) {
  validatePlate(plate.nodeIds, nodes);
  return Array.from({ length: plate.nodeIds.length - 2 }, (_, index) => [plate.nodeIds[0], plate.nodeIds[index + 1], plate.nodeIds[index + 2]]);
}
