// 只读研究模型：复现三角窗的二/三轴内轮廓，不用于工程渲染或原生导出。
import assert from 'node:assert/strict';

const EPSILON = 1e-9;
const add = (a, b) => a.map((v, i) => v + b[i]);
const sub = (a, b) => a.map((v, i) => v - b[i]);
const mul = (a, s) => a.map(v => v * s);
const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const length = a => Math.hypot(...a);
const unit = a => { assert.ok(length(a) > EPSILON, 'Degenerate triangle or bisector'); return mul(a, 1 / length(a)); };
const edgeKey = (a, b) => a < b ? `${a}:${b}` : `${b}:${a}`;
const gcd = (a, b) => b ? gcd(b, a % b) : a;
const idIsValid = id => Number.isInteger(id) && id > 0 && id <= 0x7fffffff;

function rank(rows) {
  const matrix = rows.map(row => [...row]);
  let pivot = 0;
  for (let column = 0; column < (matrix[0]?.length ?? 0); column++) {
    let best = pivot;
    for (let row = pivot; row < matrix.length; row++) if (Math.abs(matrix[row][column]) > Math.abs(matrix[best]?.[column] ?? 0)) best = row;
    if (Math.abs(matrix[best]?.[column] ?? 0) <= EPSILON) continue;
    [matrix[pivot], matrix[best]] = [matrix[best], matrix[pivot]];
    const scale = matrix[pivot][column];
    matrix[pivot] = matrix[pivot].map(value => value / scale);
    for (let row = pivot + 1; row < matrix.length; row++) {
      const factor = matrix[row][column];
      matrix[row] = matrix[row].map((value, i) => value - factor * matrix[pivot][i]);
    }
    pivot++;
    if (pivot === matrix.length) break;
  }
  return pivot;
}

// 一个扇形的每个非退化三角都经过扇心。若目标各平面无公共点，任何扇形都不可能精确覆盖目标。
// 公共点存在只通过必要条件；不能由此承诺边界、三角化、内缩或窗框也等价。
export function commonFanPointCondition(planes) {
  const rows = planes.map(plane => [...plane.normal, plane.constant]);
  const normalRank = rank(rows.map(row => row.slice(0, 3)));
  const augmentedRank = rank(rows);
  return { normalRank, augmentedRank, tolerance: EPSILON, status: augmentedRank > normalRank ? 'impossible' : 'not-ruled-out' };
}

function triangleModel(plate, positions, firstBeamSize, constants) {
  const cells = plate.nodes.map(id => positions.get(id));
  const rawNormal = cross(sub(cells[1], cells[0]), sub(cells[2], cells[1]));
  const normal = unit(rawNormal);
  const axes = rawNormal.filter(value => value !== 0).length;
  const points = cells.map(point => mul(point, constants.gridSize));
  const divisor = rawNormal.reduce((value, item) => gcd(value, Math.abs(item)), 0);
  let integerNormal = rawNormal.map(value => value / divisor);
  if (integerNormal.find(value => value !== 0) < 0) integerNormal = mul(integerNormal, -1);
  const plane = { normal, constant: dot(normal, points[0]), integerNormal, integerConstant: dot(integerNormal, cells[0]) };
  const result = { plateId: plate.id, nodeIds: [...plate.nodes], axes, normal, points, plane };
  if (axes === 1) return { ...result, geometry: null, omittedReason: 'One-axis window uses a different reconstructed contour; not simulated' };
  if (![0, 1].includes(firstBeamSize)) return { ...result, geometry: null, omittedReason: 'Unsupported first-boundary-beam size' };
  if (Object.hasOwn(plate, 'glass_state') || (plate.glass_impacts?.length ?? 0)) return { ...result, geometry: null, omittedReason: 'Only default intact glass without impacts is simulated' };
  const scale = firstBeamSize === 1 ? 3 : 1;
  const offset = rawNormal.map(value => Math.sign(value) * constants.gridSize * .5 * scale);
  const outer = points.map(point => add(point, offset));
  const insetRing = distance => outer.map((point, index) => {
    const incoming = unit(sub(point, outer[(index + 2) % 3]));
    const outgoing = unit(sub(outer[(index + 1) % 3], point));
    const a = cross(incoming, normal); const b = cross(outgoing, normal);
    const bisector = unit(add(a, b));
    const denominator = Math.sqrt((1 + dot(a, b)) / 2);
    assert.ok(denominator > EPSILON, 'Degenerate triangle inset');
    return sub(point, mul(bisector, distance / denominator));
  });
  const rim = insetRing(constants.windowInset);
  const glass = insetRing(constants.windowInset + constants.frameWidth);
  // 小于内切圆半径才可将生成的三角视作正确的内缩孔；否则不报告它为有效玻璃。
  const perimeter = outer.reduce((sum, point, index) => sum + length(sub(point, outer[(index + 1) % 3])), 0);
  const inradius = length(cross(sub(outer[1], outer[0]), sub(outer[2], outer[0]))) / perimeter;
  if (inradius <= constants.windowInset + constants.frameWidth) return { ...result, geometry: null, omittedReason: 'Inset consumes the triangle aperture' };
  const backOffset = mul(normal, -constants.plateThickness);
  result.geometry = { firstBeamSize, offset, outer, rim, glass, backGlass: glass.map(point => add(point, backOffset)), inradius };
  return result;
}

function boundaryStation(model, a, b) {
  const indexA = model.nodeIds.indexOf(a); const indexB = model.nodeIds.indexOf(b);
  const geometry = model.geometry;
  const midpoint = mul(add(geometry.outer[indexA], geometry.outer[indexB]), .5);
  const start = geometry.glass[indexA]; const end = geometry.glass[indexB];
  const edge = sub(end, start);
  const t = dot(sub(midpoint, start), edge) / dot(edge, edge);
  if (t < 0 || t > 1) return null;
  const front = add(start, mul(edge, t));
  return { front, back: add(front, mul(model.normal, -model.plateThickness)), fractionOnGlassEdge: t };
}

export function analyzeNativeWindowFans(vehicle, constants) {
  for (const name of ['gridSize', 'windowInset', 'frameWidth', 'plateThickness']) assert.ok(Number.isFinite(constants[name]) && constants[name] > 0, 'Invalid geometry constant ' + name);
  assert.ok(Array.isArray(vehicle?.nodes) && vehicle.nodes.length <= 2000, 'Invalid or excessive nodes');
  assert.ok(Array.isArray(vehicle.edges) && vehicle.edges.length <= 10000, 'Invalid or excessive edges');
  assert.ok(Array.isArray(vehicle.plates) && vehicle.plates.length <= 2000, 'Invalid or excessive plates');
  const positions = new Map();
  for (const node of vehicle.nodes) {
    assert.ok(idIsValid(node.id) && !positions.has(node.id), 'Invalid or duplicate node ID');
    assert.ok(Array.isArray(node.pos) && node.pos.length === 3 && node.pos.every(value => Number.isInteger(value) && Math.abs(value) <= 10000), 'Expected bounded integer native node positions');
    positions.set(node.id, [...node.pos]);
  }
  const beams = new Map(); const neighbors = new Map([...positions.keys()].map(id => [id, new Set()]));
  for (const edge of vehicle.edges) {
    assert.ok(positions.has(edge.n0) && positions.has(edge.n1) && edge.n0 !== edge.n1, 'Invalid beam endpoints');
    const key = edgeKey(edge.n0, edge.n1);
    assert.ok(!beams.has(key), 'Ambiguous duplicate beam');
    beams.set(key, edge);
    neighbors.get(edge.n0).add(edge.n1); neighbors.get(edge.n1).add(edge.n0);
  }
  let triangleCycles = 0; const cycleExamples = [];
  for (const [a, adjacent] of neighbors) for (const b of adjacent) if (b > a) {
    const other = neighbors.get(b);
    const smallest = adjacent.size < other.size ? adjacent : other;
    for (const c of smallest) if (c > b && adjacent.has(c) && other.has(c)) {
      triangleCycles++;
      if (cycleExamples.length < 32) cycleExamples.push([a, b, c]);
    }
  }
  const plateIds = new Set(); const incidence = new Map(); const missing = new Map(); const models = [];
  for (const plate of vehicle.plates) {
    assert.ok(idIsValid(plate.id) && !plateIds.has(plate.id), 'Invalid or duplicate plate ID'); plateIds.add(plate.id);
    assert.ok(Array.isArray(plate.nodes) && plate.nodes.length >= 3 && plate.nodes.length <= 1000, 'Invalid boundary');
    assert.equal(new Set(plate.nodes).size, plate.nodes.length, 'Repeated boundary node');
    assert.ok(plate.nodes.every(id => positions.has(id)), 'Missing boundary node');
    if (plate.type !== 'window') continue;
    const missingEdges = [];
    plate.nodes.forEach((a, index) => {
      const b = plate.nodes[(index + 1) % plate.nodes.length]; const key = edgeKey(a, b);
      const uses = incidence.get(key) ?? []; uses.push({ plateId: plate.id, a, b }); incidence.set(key, uses);
      if (!beams.has(key)) { missingEdges.push([a, b]); missing.set(key, [a, b]); }
    });
    const firstBeam = beams.get(edgeKey(plate.nodes[0], plate.nodes[1]));
    const model = plate.nodes.length === 3 ? triangleModel(plate, positions, firstBeam?.size ?? 0, constants) : {
      plateId: plate.id, nodeIds: [...plate.nodes], geometry: null, omittedReason: 'Only triangular target faces are analyzed geometrically'
    };
    model.plateThickness = constants.plateThickness;
    model.missingBoundaries = missingEdges;
    model.sizeSource = firstBeam ? 'existing-first-beam' : 'assumed-ordinary-missing-first-beam';
    models.push(model);
  }
  const byId = new Map(models.map(model => [model.plateId, model]));
  const connections = new Map(models.map(model => [model.plateId, new Set()]));
  const sharedEdges = []; const nonmanifoldEdges = [];
  for (const uses of incidence.values()) {
    if (uses.length > 2) { nonmanifoldEdges.push(uses); continue; }
    if (uses.length !== 2) continue;
    const [a, b] = uses;
    connections.get(a.plateId).add(b.plateId); connections.get(b.plateId).add(a.plateId);
    const item = { nodes: [a.a, a.b], plates: [a.plateId, b.plateId], hasBeam: beams.has(edgeKey(a.a, a.b)), oppositeWinding: a.a === b.b && a.b === b.a };
    const modelA = byId.get(a.plateId); const modelB = byId.get(b.plateId);
    const stationA = modelA.geometry && boundaryStation(modelA, a.a, a.b);
    const stationB = modelB.geometry && boundaryStation(modelB, a.a, a.b);
    if (item.oppositeWinding && stationA && stationB) item.midpointGlassSeparation = {
      front: length(sub(stationA.front, stationB.front)), back: length(sub(stationA.back, stationB.back)),
      frontPoints: [stationA.front, stationB.front], backPoints: [stationA.back, stationB.back],
      note: 'Distance between glass boundaries at the raw shared-edge midpoint station; not a minimum-distance or raster visibility measurement'
    };
    sharedEdges.push(item);
  }
  const groups = []; const seen = new Set();
  for (const seed of models) if (!seen.has(seed.plateId)) {
    const ids = [seed.plateId]; seen.add(seed.plateId);
    for (let i = 0; i < ids.length; i++) for (const id of connections.get(ids[i])) if (!seen.has(id)) { ids.push(id); seen.add(id); }
    const faces = ids.map(id => byId.get(id));
    const allPlanes = faces.every(face => face.plane);
    const allGlass = faces.every(face => face.geometry);
    groups.push({
      plateIds: ids,
      targetNodeSurfaceCommonFanPoint: allPlanes ? commonFanPointCondition(faces.map(face => face.plane)) : null,
      intactFrontGlassCommonFanPoint: allGlass ? commonFanPointCondition(faces.map(face => ({ normal: face.normal, constant: dot(face.normal, face.geometry.glass[0]) }))) : null,
      note: 'An impossible result excludes any single fan with this exact piecewise-planar shape, including reconstructed inner anchors. Passing this necessary condition does not establish equivalence.'
    });
  }
  return {
    vehicleId: vehicle.id, counts: { nodes: vehicle.nodes.length, beams: vehicle.edges.length, windows: models.length },
    existingBeamTriangleCycles: { count: triangleCycles, examples: cycleExamples },
    uniqueMissingWindowBoundaries: [...missing.values()], models, sharedEdges, nonmanifoldEdges, groups,
    assumptions: ['Missing first boundary beams are assumed ordinary size 0 for hypothetical geometry only', 'Plate size follows the first boundary beam in the native loader', 'World units are local native coordinates; no vehicle transform, physics or lighting is simulated']
  };
}
