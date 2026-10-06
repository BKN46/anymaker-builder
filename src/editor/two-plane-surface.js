import { validateTopologyState } from './topology.js';
import { triangulatePlatePolygon, validatePlatePolygon } from './plate-polygon.js';
import { missingPlateBoundaries } from './plate-boundary-coverage.js';
import { nativeCells, nativePlateNodeOrderForExport } from '../native/plate-order.js';
import { NATIVE_SURFACE_CONSTANTS, predictSingleWindowFan } from '../native/single-window-fan.js';

const EPS = 1e-7;
const pair = (a, b) => JSON.stringify([a, b].sort());
const sub = (a, b) => a.map((value, i) => value - b[i]);
const dot = (a, b) => a.reduce((sum, value, i) => sum + value * b[i], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const close = (a, b) => Math.abs(a - b) <= EPS * Math.max(1, Math.abs(a), Math.abs(b));
const properties = plate => JSON.stringify(['gridId', 'type', 'normalOffset', 'hidden', 'col_front', 'col_back', 'color_front', 'color_back'].map(key => plate[key] ?? null));
const signedArea = points => points.reduce((sum, p, i) => sum + p.x * points[(i + 1) % points.length].y - p.y * points[(i + 1) % points.length].x, 0);

function planes(triangles) {
  const result = [];
  for (const [a, b, c] of triangles) {
    const raw = cross(sub(b, a), sub(c, a)); const magnitude = Math.hypot(...raw);
    if (magnitude <= EPS) throw new Error('单面合并不能包含退化或重叠面片');
    let normal = raw.map(value => value / magnitude);
    if (normal.find(value => Math.abs(value) > EPS) < 0) normal = normal.map(value => -value);
    const constant = dot(normal, a);
    const group = result.find(value => Math.hypot(...sub(value.normal, normal)) <= EPS && close(value.constant, constant));
    if (group) group.area += magnitude / 2;
    else result.push({ normal, constant, area: magnitude / 2 });
  }
  return result;
}

function samePlanes(a, b) {
  return a.length === b.length && a.every(plane => b.some(other => Math.hypot(...sub(plane.normal, other.normal)) <= EPS && close(plane.constant, other.constant) && close(plane.area, other.area)));
}

function boundarySurfaceTargets(loop, nodes, projection, area) {
  const points = loop.map(id => nativeCells(nodes.get(id)));
  const targets = [];
  // A new nonplanar loop has no authored diagonal. Find its crease from two
  // coplanar boundary chains before triangulating, so ears cannot cross it.
  const chainPlane = indices => {
    const origin = points[indices[0]]; const end = sub(points[indices.at(-1)], origin);
    let normal;
    for (const index of indices.slice(1, -1)) {
      const raw = cross(end, sub(points[index], origin)); const magnitude = Math.hypot(...raw);
      if (magnitude > EPS) { normal = raw.map(value => value / magnitude); break; }
    }
    return normal && indices.every(index => Math.abs(dot(normal, sub(points[index], origin))) <= EPS);
  };
  for (let a = 0; a < loop.length - 2; a++) for (let b = a + 2; b < loop.length; b++) {
    if (a === 0 && b === loop.length - 1) continue;
    const chains = [loop.slice(a, b + 1), [...loop.slice(b), ...loop.slice(0, a + 1)]];
    if (!chains.every(chain => chainPlane(chain.map(id => loop.indexOf(id))))) continue;
    try {
      const triangles = chains.flatMap(chain => triangulatePlatePolygon(chain.map(id => nodes.get(id))).map(triangle => triangle.map(index => chain[index])));
      const projectedAreas = triangles.map(triangle => signedArea(triangle.map(id => projection.get(id))));
      if (projectedAreas.some(value => value * area <= EPS * EPS) || !close(area, projectedAreas.reduce((sum, value) => sum + value, 0))) continue;
      const target = planes(triangles.map(triangle => triangle.map(id => nativeCells(nodes.get(id)))));
      if (target.length <= 2 && !targets.some(value => samePlanes(value, target))) targets.push(target);
    } catch { /* This crease must also produce two simple, nondegenerate regions. */ }
  }
  return targets;
}

export function predictNativeSurface(plate, topology) {
  const points = new Map(topology.nodes.map(node => [node.id, nativeCells(node.position)]));
  const edgeNodes = new Set(topology.edges.flatMap(edge => [edge.a, edge.b]));
  const order = nativePlateNodeOrderForExport(plate, points, edgeNodes);
  const first = topology.edges.find(edge => pair(edge.a, edge.b) === pair(order[0], order[1]));
  // Native subgrid previews use a continuous placement translation. Its
  // fractional origin must not turn integer relative nodes into bad inputs.
  const origin = points.get(order[0]);
  const cells = order.map(id => sub(points.get(id), origin).map(value => Math.abs(value - Math.round(value)) < 1e-8 ? Math.round(value) : value));
  const prediction = predictSingleWindowFan(cells, NATIVE_SURFACE_CONSTANTS, { type: plate.type === 'window' ? 'window' : 'solid', firstBeamSize: first?.size === 3 ? 1 : 0 });
  const translation = origin.map(value => value * NATIVE_SURFACE_CONSTANTS.gridSize);
  const translated = point => point.map((value, i) => value + translation[i]);
  const translatePlanes = summary => { for (const plane of summary.groups) plane.constant += dot(plane.normal, translation); };
  prediction.target.points = prediction.target.points.map(translated); translatePlanes(prediction.target.planes);
  if (prediction.geometry) {
    for (const field of ['outer', 'rim', 'front', 'back']) if (prediction.geometry[field]) prediction.geometry[field] = prediction.geometry[field].map(translated);
    if (prediction.geometry.frameTriangles) prediction.geometry.frameTriangles = prediction.geometry.frameTriangles.map(triangle => triangle.map(translated));
    // Solid geometry shares the target plane summary.
    if (prediction.geometry.planes !== prediction.target.planes) translatePlanes(prediction.geometry.planes);
  }
  return { ...prediction, order };
}

export function assertTwoPlanePrediction(prediction) {
  if (!prediction.geometry) throw new Error('当前方向的游戏窗重建尚未支持单面预览');
  if (prediction.target.planes.groups.length > 2 || prediction.geometry.planes.groups.length > 2) throw new Error('游戏生成后超过两个平面，不能合为双平面单面');
  if (!prediction.target.noOverlap || !prediction.geometry.noOverlap || prediction.geometry.insetValid === false || prediction.target.planes.degenerate.length || prediction.geometry.planes.degenerate.length) throw new Error('游戏生成的单面发生交叠或退化');
}

// Merge only a consistently wound disk. A complete outer beam loop is kept;
// internal authoring edges disappear from the face records, never from beams.
export function mergeTwoPlaneSurface(state, plateIds) {
  const next = validateTopologyState(state);
  const selected = new Set(plateIds);
  if (!selected.size || selected.size !== plateIds.length || selected.size > 128) throw new Error('请选择相连的曲面面片');
  const pieces = next.plates.filter(plate => selected.has(plate.id));
  if (pieces.length !== selected.size || pieces.some(plate => !plate.surfaceLimitBypass) || pieces.some(plate => properties(plate) !== properties(pieces[0]))) throw new Error('单面合并需要相同类型、网格和涂色的曲面面片');
  const nodes = new Map(next.nodes.map(node => [node.id, node.position]));
  const incidence = new Map();
  for (const plate of pieces) plate.nodeIds.forEach((a, i) => {
    const b = plate.nodeIds[(i + 1) % plate.nodeIds.length]; const key = pair(a, b);
    const entries = incidence.get(key) || []; entries.push([a, b]); incidence.set(key, entries);
  });
  const boundary = [];
  for (const entries of incidence.values()) {
    if (entries.length === 1) boundary.push(entries[0]);
    else if (entries.length !== 2 || entries[0][0] !== entries[1][1] || entries[0][1] !== entries[1][0]) throw new Error('单面合并不能包含退化或重叠面片');
  }
  const outgoing = new Map(boundary); const incoming = new Set(boundary.map(edge => edge[1]));
  if (boundary.length < 3 || boundary.length > 128 || outgoing.size !== boundary.length || incoming.size !== boundary.length) throw new Error('单面合并需要一个完整外环，不能包含孔洞或分支');
  const loop = [boundary[0][0]];
  while (outgoing.get(loop.at(-1)) !== loop[0]) {
    const id = outgoing.get(loop.at(-1));
    if (!id || loop.includes(id) || loop.length >= boundary.length) throw new Error('单面合并需要一个完整外环，不能包含孔洞或分支');
    loop.push(id);
  }
  if (loop.length !== boundary.length || pieces.some(plate => plate.nodeIds.some(id => !outgoing.has(id)))) throw new Error('单面合并需要一个完整外环，不能包含孔洞或分支');
  const { projected } = validatePlatePolygon(loop.map(id => nodes.get(id)), { allowNonPlanar: true });
  const projection = new Map(loop.map((id, i) => [id, projected[i]]));
  const area = signedArea(projected);
  let inferBoundary = false;
  if (pieces.length === 1 && !pieces[0].surfaceFanAnchor) {
    try { validatePlatePolygon(loop.map(id => nodes.get(id))); }
    catch (error) {
      if (error.code !== 'nonplanar-plate') throw error;
      inferBoundary = true;
    }
  }
  let coveredArea = 0;
  const authored = [];
  for (const plate of inferBoundary ? [] : pieces) {
    // Multiple pieces define the target themselves; compiled faces retain
    // their explicit native fan rather than being triangulated again.
    const triangles = plate.surfaceFanAnchor
      ? (() => { const p = predictNativeSurface(plate, next); return p.target.triangles.map(triangle => triangle.map(i => p.order[i])); })()
      : triangulatePlatePolygon(plate.nodeIds.map(id => nodes.get(id)), { allowNonPlanar: true }).map(triangle => triangle.map(i => plate.nodeIds[i]));
    for (const triangle of triangles) {
      const projectedArea = signedArea(triangle.map(id => projection.get(id)));
      if (projectedArea * area <= EPS * EPS) throw new Error('单面合并不能包含退化或重叠面片');
      coveredArea += projectedArea;
      authored.push(triangle.map(id => nativeCells(nodes.get(id))));
    }
  }
  if (!inferBoundary && !close(area, coveredArea)) throw new Error('单面合并不能包含退化或重叠面片');
  const authoredPlanes = planes(authored);
  const targetOptions = inferBoundary
    ? boundarySurfaceTargets(loop, nodes, projection, area)
    : authoredPlanes.length <= 2 ? [authoredPlanes] : [];
  if (!targetOptions.length) throw new Error('目标曲面超过两个平面，不能合为双平面单面');
  const plate = { ...structuredClone(pieces[0]), nodeIds: loop };
  delete plate.surfaceDirection; delete plate.surfaceFanAnchor;
  if (missingPlateBoundaries({ ...next, plates: [plate] }).length) throw new Error('单面外边界仍缺少梁；不会自动补梁');
  let accepted = null;
  for (const anchor of loop) {
    // Store the anchor last as well as explicitly: reversing editor winding
    // already gives the desired native first node in older readers.
    const index = loop.indexOf(anchor);
    const candidate = { ...plate, nodeIds: [...loop.slice(index + 1), ...loop.slice(0, index + 1)], surfaceFanAnchor: anchor };
    try {
      const prediction = predictNativeSurface(candidate, next);
      assertTwoPlanePrediction(prediction);
      const candidatePlanes = planes(prediction.target.triangles.map(triangle => triangle.map(i => nativeCells(nodes.get(prediction.order[i])))));
      if (!targetOptions.some(target => samePlanes(target, candidatePlanes))) continue;
      accepted = { plate: candidate, prediction }; break;
    } catch { /* Another boundary anchor may preserve the authored planes. */ }
  }
  if (!accepted) throw new Error('没有能保留目标双平面且通过游戏内缩检查的边界扇心');
  const firstIndex = next.plates.findIndex(value => selected.has(value.id));
  next.plates = next.plates.filter(value => !selected.has(value.id)); next.plates.splice(firstIndex, 0, accepted.plate);
  return { topology: validateTopologyState(next), plateIds: [accepted.plate.id], removedPlateIds: pieces.slice(1).map(value => value.id), prediction: accepted.prediction };
}

// Compile bypass boundaries and old split drafts without editing the project.
// Ordinary faces keep their export behavior; disconnected groups are separate.
export function prepareTwoPlaneNativeSurfaces(state, { type, plateIds } = {}) {
  const selected = plateIds ? new Set(plateIds) : null;
  const matches = plate => (!selected || selected.has(plate.id)) && (!type || (type === 'window' ? plate.type === 'window' : plate.type !== 'window'));
  const candidates = (state.plates || []).filter(plate => plate.surfaceLimitBypass && !plate.surfaceFanAnchor && matches(plate));
  const byEdge = new Map();
  for (const plate of candidates) plate.nodeIds.forEach((a, i) => {
    const key = pair(a, plate.nodeIds[(i + 1) % plate.nodeIds.length]);
    const entries = byEdge.get(key) || []; entries.push(plate); byEdge.set(key, entries);
  });
  const remaining = new Set(candidates.map(plate => plate.id)); const merged = []; let topology = state;
  for (const plate of candidates) {
    if (!remaining.delete(plate.id)) continue;
    const group = [plate];
    for (let i = 0; i < group.length; i++) group[i].nodeIds.forEach((a, j) => {
      for (const other of byEdge.get(pair(a, group[i].nodeIds[(j + 1) % group[i].nodeIds.length])) || []) {
        if (properties(other) === properties(plate) && remaining.delete(other.id)) group.push(other);
      }
    });
    try {
      const result = mergeTwoPlaneSurface(topology, group.map(value => value.id));
      topology = result.topology; merged.push({ from: group.map(value => value.id), to: result.plateIds[0], anchor: result.prediction.order[0] });
    } catch (error) {
      throw new Error(`曲面 ${group.map(value => value.id).join(', ')} 无法自动生成双平面扇形：${error.message}`, { cause: error });
    }
  }
  for (const plate of topology.plates || []) {
    if (!plate.surfaceLimitBypass || !matches(plate)) continue;
    try { assertTwoPlanePrediction(predictNativeSurface(plate, topology)); }
    catch (error) { throw new Error(`曲面 ${plate.id} 无法自动生成双平面扇形：${error.message}`, { cause: error }); }
  }
  return { topology, merged };
}

export function nativeSurfacePreviewVertices(prediction, { frame = false } = {}) {
  const geometry = prediction.geometry;
  const triangles = frame ? geometry.frameTriangles || [] : geometry.triangles.map(triangle => triangle.map(i => geometry.front[i]));
  return triangles.flatMap(triangle => triangle.flatMap(([x, y, z]) => [-x, y, z]));
}
