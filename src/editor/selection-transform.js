// Whole-selection operations. No render objects or mutable input are retained.
import { AXES, assertGridVector, assertGridScalar, quantizeWorldVector } from './grid.js';
import { validateTopologyState } from './topology.js';
import { allocateIds } from './operations.js';
import { componentFrame, multiplyRotations, transformVector, IDENTITY_ROTATION } from './component-frame.js';
import { mirrorPositionPreview, mirrorRotation, mirrorSurfaceDirection } from './mirror-mode.js';

const clone = value => structuredClone(value);
const array = p => AXES.map(axis => p[axis]);
const vector = p => Object.fromEntries(AXES.map((axis, i) => [axis, p[i]]));
const near = (a, b) => AXES.every(axis => Math.abs(a[axis] - b[axis]) < 1e-7);
const grid = item => item.gridId || 'grid-1';
const kinds = { node: 'nodes', edge: 'edges', plate: 'plates', link: 'links' };
const key = (kind, id) => kind + ':' + id;

export function selectionMembers(document, selection) {
  const topology = document.topology || { nodes: [], edges: [], plates: [], links: [] };
  const result = { components: new Set(selection.componentIds || []), nodes: new Set(), edges: new Set(), plates: new Set(), links: new Set() };
  for (const value of selection.topologyKeys || []) {
    const separator = value.indexOf(':'); const kind = value.slice(0, separator); const id = value.slice(separator + 1);
    if (kinds[kind] && topology[kinds[kind]]?.some(item => item.id === id)) result[kinds[kind]].add(id);
  }
  for (const edge of topology.edges) if (result.edges.has(edge.id)) { result.nodes.add(edge.a); result.nodes.add(edge.b); }
  for (const plate of topology.plates) if (result.plates.has(plate.id)) for (const id of plate.nodeIds) result.nodes.add(id);
  for (const link of topology.links || []) if (result.components.has(link.from.componentId) && result.components.has(link.to.componentId)) result.links.add(link.id);
  return result;
}

function finitePoint(point) {
  if (!point || AXES.some(axis => !Number.isFinite(point[axis]) || Math.abs(point[axis]) > 10000)) throw new Error('整体变换坐标超出范围');
  return { ...point };
}
function storedPoint(item, point) {
  if (item.nativeProjected || item.surfaceMount) return finitePoint(point);
  try { return assertGridVector(point, '整体变换坐标'); }
  catch { throw new Error('整体变换后节点和组件必须保持在整数格点'); }
}
function transformPoint(point, pivot, rotation, translation) {
  const turned = transformVector(rotation, AXES.map(axis => point[axis] - pivot[axis]));
  return vector(turned.map((value, i) => value + pivot[AXES[i]] + translation[AXES[i]]));
}
function rotationMatrix(object) {
  const frame = componentFrame({ ...object, mirror: undefined, localMirrorAxes: [] });
  return frame.basis.map((value, i) => value * (i % 3 === 0 ? -1 : 1));
}
function euler(matrix) {
  const y = Math.asin(Math.max(-1, Math.min(1, matrix[2])));
  return Math.abs(matrix[2]) < .9999999
    ? { x: Math.atan2(-matrix[5], matrix[8]), y, z: Math.atan2(-matrix[1], matrix[0]) }
    : { x: Math.atan2(matrix[7], matrix[4]), y, z: 0 };
}
function validateRotation(rotation) {
  if (!Array.isArray(rotation) || rotation.length !== 9 || rotation.some(value => !Number.isFinite(value))) throw new Error('整体旋转无效');
  const columns = [0, 1, 2].map(i => [rotation[i], rotation[i + 3], rotation[i + 6]]);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (Math.abs(columns[i].reduce((sum, value, k) => sum + value * columns[j][k], 0) - Number(i === j)) > 1e-6) throw new Error('整体旋转无效');
  const [a, b, c, d, e, f, g, h, i] = rotation;
  if (Math.abs(a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g) - 1) > 1e-6) throw new Error('整体旋转无效');
}

// Match complete structural counterparts within the same grid. Node proximity
// alone must not enlist unrelated structure on the other side of the plane.
function structuralPairs(topology, members, plane) {
  const pairs = new Map(); const secondaryPlates = new Set();
  if (!plane?.active) return { pairs, secondaryPlates };
  const nodes = new Map(topology.nodes.map(node => [node.id, node]));
  const counterparts = new Map(topology.nodes.map(node => [node.id, topology.nodes.find(other => grid(other) === grid(node) && near(other.position, mirrorPositionPreview(node.position, plane)))?.id]));
  const addPair = (a, b) => {
    if (!b || pairs.has(a) || [...pairs.values()].includes(a)) return;
    // If both halves are selected, consistently drive the positive half.
    if (members.nodes.has(b) && nodes.get(a).position[plane.axis] < plane.offset - 1e-7) pairs.set(b, a);
    else pairs.set(a, b);
  };
  const selectedEdges = [...members.edges]; const selectedPlates = [...members.plates];
  for (const id of selectedEdges) {
    const source = topology.edges.find(edge => edge.id === id);
    const a = counterparts.get(source.a); const b = counterparts.get(source.b);
    const other = topology.edges.find(edge => grid(edge) === grid(source) && ((edge.a === a && edge.b === b) || (edge.a === b && edge.b === a)));
    if (!other) continue;
    members.edges.add(other.id); addPair(source.a, a); addPair(source.b, b);
  }
  for (const id of selectedPlates) {
    const source = topology.plates.find(plate => plate.id === id); const ids = source.nodeIds.map(id => counterparts.get(id));
    const other = topology.plates.find(plate => grid(plate) === grid(source) && plate.nodeIds.length === ids.length && ids.every(id => plate.nodeIds.includes(id)));
    if (!other) continue;
    members.plates.add(other.id); source.nodeIds.forEach((id, i) => addPair(id, ids[i]));
    if (other.id !== id) secondaryPlates.add(other.id);
  }
  // Explicitly selected standalone nodes also retain the existing node mirror behavior.
  for (const id of [...members.nodes]) if (![...members.edges].some(edgeId => { const edge = topology.edges.find(value => value.id === edgeId); return edge.a === id || edge.b === id; }) && ![...members.plates].some(plateId => topology.plates.find(value => value.id === plateId).nodeIds.includes(id))) addPair(id, counterparts.get(id));
  for (const [a, b] of pairs) { members.nodes.add(a); members.nodes.add(b); }
  // Determine secondary plates from the final driver assignment, not traversal order.
  secondaryPlates.clear(); const secondaryNodes = new Set([...pairs].filter(([a, b]) => a !== b).map(([, b]) => b));
  for (const plate of topology.plates) if (members.plates.has(plate.id) && plate.nodeIds.some(id => secondaryNodes.has(id))) secondaryPlates.add(plate.id);
  return { pairs, secondaryPlates };
}

export function prepareSelectionTransform(document, selection, { mirrorPlane = null, componentPairs = [], exactCenter = false } = {}) {
  const source = clone(document); const topology = validateTopologyState(source.topology); source.topology = topology;
  const members = selectionMembers(source, selection);
  const points = [...source.objects.filter(item => members.components.has(item.id)), ...topology.nodes.filter(item => members.nodes.has(item.id))].map(item => item.position);
  if (!points.length) throw new Error('请选择组件、节点、梁或面板');
  const center = Object.fromEntries(AXES.map(axis => [axis, (Math.min(...points.map(p => p[axis])) + Math.max(...points.map(p => p[axis]))) / 2]));
  const pivot = exactCenter ? finitePoint(center) : quantizeWorldVector(center);
  if (!pivot) throw new Error('整体变换坐标超出范围');
  const plane = mirrorPlane ? { ...mirrorPlane, offset: assertGridScalar(mirrorPlane.offset, '镜像偏移') } : null;
  const { pairs, secondaryPlates } = structuralPairs(topology, members, plane);
  for (const [a, b] of componentPairs) { members.components.add(a); members.components.add(b); }
  const external = new Set();
  for (const edge of topology.edges) if (!members.edges.has(edge.id)) { external.add(edge.a); external.add(edge.b); }
  for (const plate of topology.plates) if (!members.plates.has(plate.id)) for (const id of plate.nodeIds) external.add(id);
  const allocate = allocateIds(topology.nodes, 'move');
  const nodeMap = new Map([...members.nodes].map(id => [id, external.has(id) ? allocate(id) : id]));
  return { source, selection: clone(selection), members, pivot, plane, pairs, secondaryPlates, componentPairs, nodeMap };
}

export function applyManualRotation(plan, plane, angle) {
  if (!['xy', 'xz', 'yz'].includes(plane)) throw new Error('旋转平面无效');
  if (![90, 180, 270].includes(angle)) throw new Error('手动旋转角度须为 90°、180° 或 270°');
  const c = angle === 180 ? -1 : 0; const s = angle === 90 ? 1 : angle === 270 ? -1 : 0;
  const rotation = plane === 'xy' ? [c, -s, 0, s, c, 0, 0, 0, 1]
    : plane === 'xz' ? [c, 0, s, 0, 1, 0, -s, 0, c]
    : [1, 0, 0, 0, c, -s, 0, s, c];
  return applySelectionTransform(plan, { rotation });
}

export function applySelectionTransform(plan, { translation = { x: 0, y: 0, z: 0 }, rotation = IDENTITY_ROTATION } = {}) {
  let shift;
  try { shift = assertGridVector(translation, '整体移动位移'); }
  catch { throw new Error('整体移动位移必须是整数格'); }
  validateRotation(rotation);
  const rotates = rotation.some((value, i) => Math.abs(value - IDENTITY_ROTATION[i]) > 1e-8);
  const { source, members, pivot, nodeMap, pairs, plane } = plan;
  let secondaryPlates = plan.secondaryPlates;
  if (!rotates && AXES.every(axis => Math.abs(shift[axis]) < 1e-9)) return { document: clone(source), selection: clone(plan.selection), changed: false };
  const candidate = clone(source); const positions = new Map();
  for (const node of source.topology.nodes) if (members.nodes.has(node.id)) positions.set(node.id, storedPoint(node, transformPoint(node.position, pivot, rotation, shift)));
  for (const [a, b] of pairs) {
    const reflected = mirrorPositionPreview(positions.get(a), plane);
    if (a === b && !near(reflected, positions.get(a))) throw new Error('镜像平面上的节点只能沿平面移动');
    positions.set(b, storedPoint(source.topology.nodes.find(node => node.id === b), reflected));
  }
  // A beam or plate spanning the mirror plane must still move rigidly.
  // Reflecting only some of its vertices would stretch or fold the selection.
  if (plane?.active) {
    const nodes = new Map(source.topology.nodes.map(node => [node.id, node]));
    secondaryPlates = new Set(secondaryPlates);
    const checkRigid = (ids, plateId) => {
      const matches = reflected => ids.every(id => {
        const point = nodes.get(id).position;
        const moved = transformPoint(reflected ? mirrorPositionPreview(point, plane) : point, pivot, rotation, shift);
        return near(positions.get(id), reflected ? mirrorPositionPreview(moved, plane) : moved);
      });
      const primary = matches(false); const secondary = matches(true);
      if (!primary && !secondary) throw new Error('此变换会破坏跨镜面结构的形状，请关闭镜像模式后重试');
      if (plateId) { if (primary) secondaryPlates.delete(plateId); else secondaryPlates.add(plateId); }
    };
    for (const edge of source.topology.edges) if (members.edges.has(edge.id)) checkRigid([edge.a, edge.b]);
    for (const plate of source.topology.plates) if (members.plates.has(plate.id)) checkRigid(plate.nodeIds, plate.id);
  }
  candidate.topology.nodes = source.topology.nodes.flatMap(node => {
    if (!positions.has(node.id)) return [clone(node)];
    const next = { ...clone(node), id: nodeMap.get(node.id), position: positions.get(node.id) };
    return next.id === node.id ? [next] : [clone(node), next];
  });
  candidate.topology.edges = candidate.topology.edges.map(edge => members.edges.has(edge.id) ? { ...edge, a: nodeMap.get(edge.a), b: nodeMap.get(edge.b) } : edge);
  candidate.topology.plates = candidate.topology.plates.map(plate => {
    if (!members.plates.has(plate.id)) return plate;
    let direction = plate.surfaceDirection;
    if (direction) {
      if (secondaryPlates.has(plate.id)) direction = mirrorSurfaceDirection(direction, plane);
      direction = vector(transformVector(rotation, array(direction)));
      if (secondaryPlates.has(plate.id)) direction = mirrorSurfaceDirection(direction, plane);
    }
    return { ...plate, nodeIds: plate.nodeIds.map(id => nodeMap.get(id)), ...(plate.surfaceFanAnchor ? { surfaceFanAnchor: nodeMap.get(plate.surfaceFanAnchor) } : {}), ...(direction ? { surfaceDirection: direction } : {}) };
  });
  candidate.objects = candidate.objects.map(object => {
    if (!members.components.has(object.id)) return object;
    if (rotates && object.surfaceMount) throw new Error('斜面安装组件暂不支持整体旋转或镜像');
    return { ...object, position: storedPoint(object, transformPoint(object.position, pivot, rotation, shift)), rotation: rotates ? euler(multiplyRotations(rotation, rotationMatrix(object))) : object.rotation };
  });
  for (const [a, b] of plan.componentPairs) {
    const driver = candidate.objects.find(object => object.id === a); const other = candidate.objects.find(object => object.id === b);
    other.position = storedPoint(other, mirrorPositionPreview(driver.position, plane)); other.rotation = mirrorRotation(driver.rotation, plane);
  }
  for (const link of candidate.topology.links || []) if (members.components.has(link.from.componentId) && members.components.has(link.to.componentId)) {
    const secondary = plan.componentPairs.some(([, b]) => b === link.from.componentId) && plan.componentPairs.some(([, b]) => b === link.to.componentId);
    link.points = (link.points || []).map(point => {
      const next = transformPoint(secondary ? mirrorPositionPreview(point, plane) : point, pivot, rotation, shift);
      return storedPoint(link, secondary ? mirrorPositionPreview(next, plane) : next);
    });
  }
  candidate.topology = validateTopologyState(candidate.topology, new Set(candidate.objects.map(object => object.id)));
  return { document: candidate, selection: { ...clone(plan.selection), topologyKeys: (plan.selection.topologyKeys || []).map(value => value.startsWith('node:') ? key('node', nodeMap.get(value.slice(5))) : value) }, changed: true };
}

function reflectedComponent(source, plane) {
  if (source.surfaceMount) throw new Error('斜面安装组件暂不支持整体旋转或镜像');
  const copy = clone(source); copy.position = storedPoint(copy, mirrorPositionPreview(copy.position, plane)); copy.rotation = mirrorRotation(copy.rotation, plane);
  if (copy.mirror?.axis === plane.axis) delete copy.mirror;
  else {
    if (copy.mirror) {
      const local = new Set(copy.localMirrorAxes || []);
      if (local.has(copy.mirror.axis)) local.delete(copy.mirror.axis); else local.add(copy.mirror.axis);
      copy.localMirrorAxes = AXES.filter(axis => local.has(axis));
    }
    copy.mirror = { axis: plane.axis, offset: plane.offset };
  }
  return copy;
}

export function mirrorSelection(document, selection, plane) {
  if (!AXES.includes(plane.axis)) throw new Error('镜像平面无效');
  const offset = assertGridScalar(plane.offset, '镜像偏移'); plane = { ...plane, offset };
  const source = clone(document); const members = selectionMembers(source, selection);
  source.topology = validateTopologyState(source.topology, new Set(source.objects.map(object => object.id)));
  if (!members.components.size && !members.nodes.size) throw new Error('请选择组件、节点、梁或面板');
  const next = clone(source); const componentMap = new Map(); const nodeMap = new Map();
  const idMaps = { components: componentMap, nodes: nodeMap, edges: new Map(), plates: new Map(), links: new Map() };
  let created = 0;
  const allocateComponent = allocateIds(next.objects, 'mirror');
  for (const object of source.objects) if (members.components.has(object.id)) {
    const reflected = reflectedComponent(object, plane);
    // An origin on the plane does not make asymmetric component geometry
    // self-symmetric. Reuse only an equivalent reflected instance.
    const reflectedFrame = componentFrame(reflected);
    const match = next.objects.find(other => other.type === object.type && grid(other) === grid(object) && near(other.position, reflected.position)
      && AXES.every(axis => (other.scale?.[axis] ?? 1) === (reflected.scale?.[axis] ?? 1))
      && JSON.stringify(other.nativeExtension || []) === JSON.stringify(reflected.nativeExtension || [])
      && JSON.stringify(other.nativeProperties || {}) === JSON.stringify(reflected.nativeProperties || {})
      && componentFrame(other).basis.every((value, i) => Math.abs(value - reflectedFrame.basis[i]) < 1e-7));
    if (match) componentMap.set(object.id, match.id);
    else { reflected.id = allocateComponent(object.id); componentMap.set(object.id, reflected.id); next.objects.push(reflected); created++; }
  }
  const allocateNode = allocateIds(next.topology.nodes, 'mirror');
  for (const node of source.topology.nodes) if (members.nodes.has(node.id)) {
    const point = storedPoint(node, mirrorPositionPreview(node.position, plane));
    const match = next.topology.nodes.find(other => grid(other) === grid(node) && near(other.position, point));
    if (match) nodeMap.set(node.id, match.id);
    else { const id = allocateNode(node.id); nodeMap.set(node.id, id); next.topology.nodes.push({ ...clone(node), id, position: point }); created++; }
  }
  const allocateEdge = allocateIds(next.topology.edges, 'mirror');
  for (const edge of source.topology.edges) if (members.edges.has(edge.id)) {
    const a = nodeMap.get(edge.a); const b = nodeMap.get(edge.b);
    const match = next.topology.edges.find(other => grid(other) === grid(edge) && ((other.a === a && other.b === b) || (other.a === b && other.b === a)));
    if (match) idMaps.edges.set(edge.id, match.id);
    else { const id = allocateEdge(edge.id); idMaps.edges.set(edge.id, id); next.topology.edges.push({ ...clone(edge), id, a, b }); created++; }
  }
  const allocatePlate = allocateIds(next.topology.plates, 'mirror');
  for (const plate of source.topology.plates) if (members.plates.has(plate.id)) {
    const nodeIds = plate.nodeIds.map(id => nodeMap.get(id)).reverse();
    const match = next.topology.plates.find(other => grid(other) === grid(plate) && other.nodeIds.length === nodeIds.length && nodeIds.every(id => other.nodeIds.includes(id)));
    if (match) idMaps.plates.set(plate.id, match.id);
    else {
      const id = allocatePlate(plate.id); idMaps.plates.set(plate.id, id);
      next.topology.plates.push({ ...clone(plate), id, nodeIds, ...(plate.surfaceFanAnchor ? { surfaceFanAnchor: nodeMap.get(plate.surfaceFanAnchor) } : {}), ...(plate.surfaceDirection ? { surfaceDirection: mirrorSurfaceDirection(plate.surfaceDirection, plane) } : {}) }); created++;
    }
  }
  const allocateLink = allocateIds(next.topology.links || [], 'mirror');
  for (const link of source.topology.links || []) if (members.links.has(link.id)) {
    const from = componentMap.get(link.from.componentId); const to = componentMap.get(link.to.componentId);
    if (!from || !to) throw new Error('镜像连接需要同时选择两端组件');
    const match = next.topology.links.find(other => other.kind === link.kind && other.from.componentId === from && other.to.componentId === to && (other.from.port ?? 0) === (link.from.port ?? 0) && (other.to.port ?? 0) === (link.to.port ?? 0));
    if (match) idMaps.links.set(link.id, match.id);
    else {
      const id = allocateLink(link.id); idMaps.links.set(link.id, id);
      next.topology.links.push({ ...clone(link), id, from: { ...link.from, componentId: from }, to: { ...link.to, componentId: to }, points: (link.points || []).map(point => storedPoint(link, mirrorPositionPreview(point, plane))) }); created++;
    }
  }
  next.topology = validateTopologyState(next.topology, new Set(next.objects.map(object => object.id)));
  const topologyKeys = (selection.topologyKeys || []).map(value => { const colon = value.indexOf(':'); const kind = value.slice(0, colon); return key(kind, idMaps[kinds[kind]]?.get(value.slice(colon + 1))); }).filter(value => !value.endsWith(':undefined'));
  return { document: next, selection: { componentIds: [...componentMap.values()], topologyKeys }, changed: created > 0, created };
}
