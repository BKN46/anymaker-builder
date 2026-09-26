// Pure structural topology commands. They operate on model collections and
// return new values, allowing the UI to preview and commit one transaction.
import { AXES, assertGridVector, cellToWorld, cellsBetween, greatestCommonDivisor, worldToCell } from './grid.js';
import { validateLinks } from './connections.js';

const EPSILON = 1e-6;
const clone = value => structuredClone(value);
const position = node => ({ x: Number(node.position?.x ?? 0), y: Number(node.position?.y ?? 0), z: Number(node.position?.z ?? 0) });
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y, z: a.z - b.z });
const cross = (a, b) => ({ x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x });
const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
const length = value => Math.hypot(value.x, value.y, value.z);
const same = (a, b) => length(sub(a, b)) <= EPSILON;
const edgeKey = (a, b) => [a, b].sort().join('::');
const validColorIndex = value => value === undefined || (Number.isInteger(value) && value >= 0 && value <= 255);
const validColor = value => value === undefined || (typeof value === 'string' && /^#[\da-f]{6}$/i.test(value));
const validEdgeSize = value => value === undefined || value === 1 || value === 3;

function normalizedSurfaceDirection(value) {
  if (value === undefined) return undefined;
  if (!value || AXES.some(axis => !Number.isFinite(value[axis]) || Math.abs(value[axis]) > 1)) throw new Error('面板镜头方向无效');
  const magnitude = Math.hypot(value.x, value.y, value.z);
  if (magnitude <= EPSILON) throw new Error('面板镜头方向无效');
  return Object.fromEntries(AXES.map(axis => [axis, value[axis] / magnitude]));
}

function sameBoundary(a, b) {
  if (a.length !== b.length) return false;
  return a.some((start, index) => {
    if (start !== b[0]) return false;
    const forward = a.every((id, offset) => id === b[(index + offset) % b.length]);
    const reverse = a.every((id, offset) => id === b[(index - offset + b.length) % b.length]);
    return forward || reverse;
  });
}

export function validateTopologyState(state = {}, componentIds = null) {
  const nodes = Array.isArray(state.nodes) ? state.nodes : [];
  const edges = Array.isArray(state.edges) ? state.edges : [];
  const plates = Array.isArray(state.plates) ? state.plates : [];
  const links = validateLinks(state.links || [], componentIds);
  const nodeIds = new Set();
  const points = new Map();
  const normalizedNodes = [];
  for (const node of nodes) {
    if (!node || typeof node.id !== 'string' || !node.id || nodeIds.has(node.id)) throw new Error('节点 ID 无效或重复');
    if (node.nativeProjected !== undefined && node.nativeProjected !== true) throw new Error('节点原生投影标记无效');
    if (node.standalone !== undefined && node.standalone !== true) throw new Error('独立节点标记无效');
    if (node.hidden !== undefined && typeof node.hidden !== 'boolean') throw new Error('节点可见性无效');
    const nativeProjected = node.nativeProjected === true;
    const gridPosition = nativeProjected ? node.position : assertGridVector(node.position, '节点坐标');
    if (!gridPosition || AXES.some(axis => typeof gridPosition[axis] !== 'number')) throw new Error('节点坐标无效');
    if (AXES.some(axis => !Number.isFinite(gridPosition[axis]) || Math.abs(gridPosition[axis]) > 10000)) throw new Error('节点坐标无效');
    nodeIds.add(node.id);
    points.set(node.id, gridPosition);
    normalizedNodes.push({ ...clone(node), ...(nativeProjected ? { nativeProjected: true } : {}), position: gridPosition });
  }
  const edgeIds = new Set();
  for (const edge of edges) {
    if (!edge || typeof edge.id !== 'string' || !edge.id || edgeIds.has(edge.id)) throw new Error('梁 ID 无效或重复');
    if (!nodeIds.has(edge.a) || !nodeIds.has(edge.b) || edge.a === edge.b) throw new Error('梁引用未知或相同节点');
    if (same(points.get(edge.a), points.get(edge.b))) throw new Error('梁长度必须大于零');
    if (!validColorIndex(edge.col)) throw new Error('梁颜色编号无效');
    if (!validColor(edge.color)) throw new Error('梁 RGB 颜色无效');
    if (!validEdgeSize(edge.size)) throw new Error('梁截面尺寸无效');
    if (edge.hidden !== undefined && typeof edge.hidden !== 'boolean') throw new Error('梁可见性无效');
    edgeIds.add(edge.id);
  }
  const plateIds = new Set();
  const normalizedPlates = [];
  for (const plate of plates) {
    if (!plate || typeof plate.id !== 'string' || !plate.id || plateIds.has(plate.id)) throw new Error('面板 ID 无效或重复');
    validatePlate(plate.nodeIds, nodes, plate.normalOffset);
    if (!validColorIndex(plate.col_front) || !validColorIndex(plate.col_back)) throw new Error('面板颜色编号无效');
    if (!validColor(plate.color_front) || !validColor(plate.color_back)) throw new Error('面板 RGB 颜色无效');
    if (plate.type !== undefined && plate.type !== 'window') throw new Error('面板类型无效');
    if (plate.hidden !== undefined && typeof plate.hidden !== 'boolean') throw new Error('面板可见性无效');
    plateIds.add(plate.id);
    const surfaceDirection = normalizedSurfaceDirection(plate.surfaceDirection);
    normalizedPlates.push({ ...clone(plate), ...(surfaceDirection ? { surfaceDirection } : {}) });
  }
  return { nodes: normalizedNodes, edges: clone(edges), plates: normalizedPlates, ...(state.links !== undefined ? { links } : {}) };
}

// Edge and panel construction creates endpoint nodes as an implementation
// detail. Once no structural record references such a node, retaining it only
// bloats project snapshots, history, rendering and native export. Explicitly
// authored standalone nodes and native projected records remain meaningful
// even without an edge or panel, so they are never collected here.
export function pruneUnusedTopology(state = {}, { preserveNodeIds = [] } = {}) {
  const next = validateTopologyState(state);
  const referenced = new Set(preserveNodeIds);
  for (const edge of next.edges) { referenced.add(edge.a); referenced.add(edge.b); }
  for (const plate of next.plates) for (const nodeId of plate.nodeIds) referenced.add(nodeId);
  return {
    ...next,
    nodes: next.nodes.filter(node => referenced.has(node.id) || node.standalone === true || node.nativeProjected === true),
  };
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
    const merged = mergeNodes(next.nodes, next.edges, next.plates, nodeId, target.id, next.links);
    return { ...validateTopologyState(merged), merged: true, idMap: merged.idMap };
  }
  const moved = moveNode(next.nodes, nodeId, point);
  return { ...validateTopologyState({ ...next, nodes: moved.nodes }), merged: false, idMap: {} };
}

export function mergeNodes(nodes, edges, plates, sourceId, targetId, links) {
  if (sourceId === targetId) throw new Error('不能将节点合并到自身');
  const sourceNode = nodes.find(node => node.id === sourceId);
  const targetNode = nodes.find(node => node.id === targetId);
  if (!sourceNode || !targetNode) throw new Error('合并节点不存在');
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
  const nextNodes = nodes.filter(node => node.id !== sourceId).map(node => node.id === targetId && sourceNode.standalone === true
    ? { ...clone(node), standalone: true }
    : clone(node));
  return { nodes: nextNodes, edges: nextEdges, plates: nextPlates, ...(links !== undefined ? { links: clone(links) } : {}), idMap: { [sourceId]: targetId } };
}

export function removeNode(state, nodeId) {
  if (!state.nodes.some(node => node.id === nodeId)) throw new Error('节点不存在：' + nodeId);
  return validateTopologyState({
    ...state,
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

export function createEdgeFromPoints(state, start, end, properties = {}) {
  const next = validateTopologyState(state);
  const a = createNode(next.nodes, start);
  const b = createNode(a.nodes, end);
  const result = createEdge(next.edges, a.node.id, b.node.id, properties);
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

export function splitEdge(nodes, edges, edgeId, point, plates = []) {
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
  // A panel boundary is expressed as an ordered node loop. If the split edge
  // is one of its boundary segments, retain that boundary and insert the new
  // node between the matching endpoints. This keeps subsequent panel edits
  // topologically explicit instead of merely relying on coplanar rendering.
  const nextPlates = clone(plates).map(plate => {
    const nodeIds = plate.nodeIds || [];
    const index = nodeIds.findIndex((nodeId, current) => {
      const next = nodeIds[(current + 1) % nodeIds.length];
      return (nodeId === edge.a && next === edge.b) || (nodeId === edge.b && next === edge.a);
    });
    if (index < 0) return plate;
    return { ...plate, nodeIds: [...nodeIds.slice(0, index + 1), created.node.id, ...nodeIds.slice(index + 1)] };
  });
  const nextNodes = created.nodes.map(node => node.id === created.node.id && edge.gridId !== undefined ? { ...node, gridId: edge.gridId } : node);
  const node = nextNodes.find(value => value.id === created.node.id);
  return { nodes: nextNodes, edges: second, plates: nextPlates, node, replaced: edge };
}

export function validatePlate(nodeIds, nodes, normalOffset = 0) {
  if (!Array.isArray(nodeIds) || nodeIds.length < 3) throw new Error('面板至少需要三个节点');
  if (new Set(nodeIds).size !== nodeIds.length) throw new Error('面板节点不能重复');
  if (!Number.isFinite(normalOffset) || Math.abs(normalOffset) > 10000) throw new Error('面板法向偏移无效');
  const byId = new Map(nodes.map(node => [node.id, node]));
  const points = nodeIds.map(id => { const node = byId.get(id); if (!node) throw new Error('面板引用未知节点：' + id); return position(node); });
  let normal = null;
  for (let first = 1; first < points.length - 1 && !normal; first++) for (let second = first + 1; second < points.length; second++) {
    const candidate = cross(sub(points[first], points[0]), sub(points[second], points[0]));
    if (length(candidate) > EPSILON) normal = candidate;
  }
  if (!normal) throw new Error('面板节点不能共线');
  for (const point of points.slice(3)) if (Math.abs(dot(normal, sub(point, points[0]))) > EPSILON) throw new Error('面板节点必须共面');
  return { points, normal };
}

export function createPlate(plates, nodeIds, nodes, properties = {}) {
  validatePlate(nodeIds, nodes, properties.normalOffset);
  const surfaceDirection = normalizedSurfaceDirection(properties.surfaceDirection);
  if (plates.some(plate => Array.isArray(plate.nodeIds) && sameBoundary(plate.nodeIds, nodeIds))) throw new Error('该闭合梁环已有面板或玻璃');
  const plate = { id: newId(plates, 'plate'), nodeIds: [...nodeIds], ...clone(properties), ...(surfaceDirection ? { surfaceDirection } : {}) };
  return { plates: [...clone(plates), plate], plate };
}

// A panel follows a closed, non-branching loop of existing edges. The first
// chosen edge establishes the winding, which in turn establishes its normal.
export function createPlateFromEdges(plates, edgeIds, edges, nodes, properties = {}) {
  if (!Array.isArray(edgeIds) || edgeIds.length < 3) throw new Error('面板至少需要选择三根梁');
  if (new Set(edgeIds).size !== edgeIds.length) throw new Error('面板梁不能重复选择');
  const byId = new Map(edges.map(edge => [edge.id, edge]));
  const loopEdges = edgeIds.map(id => {
    const edge = byId.get(id);
    if (!edge) throw new Error('面板引用了未知梁：' + id);
    return edge;
  });
  const incident = new Map();
  for (const edge of loopEdges) {
    for (const nodeId of [edge.a, edge.b]) {
      const list = incident.get(nodeId) || [];
      list.push(edge); incident.set(nodeId, list);
    }
  }
  if ([...incident.values()].some(list => list.length !== 2)) throw new Error('选择的梁必须组成单一闭合环，且不能分支');
  const first = loopEdges[0];
  const nodeIds = [first.a];
  const used = new Set([first.id]);
  let previous = first;
  let current = first.b;
  while (current !== nodeIds[0]) {
    if (used.size >= loopEdges.length) throw new Error('选择的梁未形成闭合环');
    nodeIds.push(current);
    const next = incident.get(current).find(edge => edge.id !== previous.id && !used.has(edge.id));
    if (!next) throw new Error('选择的梁未形成单一闭合环');
    used.add(next.id);
    current = next.a === current ? next.b : next.a;
    previous = next;
  }
  if (used.size !== loopEdges.length) throw new Error('选择的梁必须组成单一闭合环');
  return createPlate(plates, nodeIds, nodes, properties);
}

// Native samples identify glass surfaces as a window plate. They use the same
// closed structural edge loop as ordinary panels; impact simulation remains a
// game-runtime concern and is not fabricated in the editor.
export function createGlassPlateFromEdges(plates, edgeIds, edges, nodes, properties = {}) {
  return createPlateFromEdges(plates, edgeIds, edges, nodes, { ...properties, type: 'window' });
}

export function triangulatePlate(plate, nodes) {
  validatePlate(plate.nodeIds, nodes);
  return Array.from({ length: plate.nodeIds.length - 2 }, (_, index) => [plate.nodeIds[0], plate.nodeIds[index + 1], plate.nodeIds[index + 2]]);
}
