// Static reconstruction of the observed native two/three-axis surface path.
import { validatePlatePolygon } from '../editor/plate-polygon.js';
const assert = {
  ok(value, message) { if (!value) throw new Error(message); },
  equal(a, b, message) { if (a !== b) throw new Error(message); },
};
export const NATIVE_SURFACE_CONSTANTS = Object.freeze({ gridSize: .08, windowInset: .04, frameWidth: .01, plateThickness: .01 });

const EPS = 1e-9;
const sub = (a, b) => a.map((value, i) => value - b[i]);
const add = (a, b) => a.map((value, i) => value + b[i]);
const mul = (a, scale) => a.map(value => value * scale);
const dot = (a, b) => a.reduce((sum, value, i) => sum + value * b[i], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = value => Math.hypot(...value);
const unit = value => { assert.ok(norm(value) > EPS, 'Degenerate native contour'); return mul(value, 1 / norm(value)); };
const objects = points => points.map(([x,y,z]) => ({ x,y,z }));
const key = (a, b) => [a,b].sort((x,y) => x-y).join(':');

function fanIndices(count) {
  return Array.from({ length: count - 2 }, (_, i) => [0, i + 2, i + 1]);
}

function planesOfFan(points, triangles) {
  const groups = []; const degenerate = [];
  for (let index = 0; index < triangles.length; index++) {
    const [a,b,c] = triangles[index].map(i => points[i]);
    const raw = cross(sub(b,a), sub(c,a));
    if (norm(raw) <= EPS) { degenerate.push(index); continue; }
    let normal = unit(raw);
    if (normal.find(value => Math.abs(value) > EPS) < 0) normal = mul(normal, -1);
    const constant = dot(normal, a);
    const group = groups.find(value => norm(sub(value.normal, normal)) <= EPS && Math.abs(value.constant - constant) <= EPS);
    if (group) group.triangles.push(index);
    else groups.push({ normal, constant, triangles: [index] });
  }
  return { groups, degenerate };
}

function fanHasNoOverlap(points, triangles) {
  try {
    const { projected } = validatePlatePolygon(objects(points), { allowNonPlanar: true });
    const area = projected.reduce((sum, point, i) => sum + point.x * projected[(i+1)%points.length].y - point.y * projected[(i+1)%points.length].x, 0);
    let fanArea = 0;
    for (const triangle of triangles) {
      const [a,b,c] = triangle.map(i => projected[i]);
      const signed = (b.x-a.x)*(c.y-a.y) - (b.y-a.y)*(c.x-a.x);
      // 原生扇形使用 (0,i+1,i)，方向与边界相反。
      if (signed * area > EPS || Math.abs(signed) <= EPS) return false;
      fanArea += Math.abs(signed);
    }
    return Math.abs(fanArea - Math.abs(area)) <= EPS * Math.max(1, Math.abs(area));
  } catch { return false; }
}

function insetHasNoOverlap(outer, frameTriangles) {
  // Test the rim and glass together in a common projection. Checking just
  // the aperture can miss an inset that flips through a very narrow frame.
  for (const [u, v] of [[0, 1], [0, 2], [1, 2]]) {
    const project = point => ({ x: point[u], y: point[v], z: 0 });
    const projected = outer.map(project);
    try { validatePlatePolygon(projected); } catch { continue; }
    const area = projected.reduce((sum, p, i) => sum + p.x * projected[(i + 1) % projected.length].y - p.y * projected[(i + 1) % projected.length].x, 0);
    if (frameTriangles.every(triangle => {
      const [a, b, c] = triangle.map(project);
      return ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) * area < -EPS * EPS;
    })) return true;
  }
  return false;
}

export function predictSingleWindowFan(cells, constants, { firstBeamSize = 0, type = 'window' } = {}) {
  assert.ok(['window','solid'].includes(type), 'Unsupported native surface type');
  assert.ok([0,1].includes(firstBeamSize), 'Unsupported first-boundary-beam size');
  assert.ok(Array.isArray(cells) && cells.length >= 3 && cells.length <= 128, 'Invalid or excessive contour');
  assert.ok(cells.every(point => Array.isArray(point) && point.length === 3 && point.every(value => Number.isInteger(value) && Math.abs(value) <= 10000)), 'Expected bounded native integer positions');
  assert.equal(new Set(cells.map(point => point.join(':'))).size, cells.length, 'Repeated contour position');
  for (const name of ['gridSize','windowInset','frameWidth','plateThickness']) assert.ok(Number.isFinite(constants[name]) && constants[name] > 0, 'Invalid constant ' + name);
  validatePlatePolygon(objects(cells), { allowNonPlanar: true });
  const firstEdge = sub(cells[1], cells[0]);
  let direction;
  for (let index = 1; index < cells.length; index++) {
    const candidate = cross(firstEdge, sub(cells[(index+1)%cells.length], cells[index]));
    if (norm(candidate) > EPS) { direction = candidate; break; }
  }
  assert.ok(direction, 'Collinear native contour');
  const normal = unit(direction); const axes = direction.filter(value => value !== 0).length;
  const offset = direction.map(value => Math.sign(value) * constants.gridSize * .5 * (firstBeamSize === 1 ? 3 : 1));
  const points = cells.map(point => add(mul(point, constants.gridSize), offset));
  const indices = fanIndices(points.length);
  const target = { points, triangles: indices, planes: planesOfFan(points, indices), noOverlap: fanHasNoOverlap(points, indices) };
  const result = { type, direction, normal, axes, offset, target };
  if (type === 'solid') return { ...result, geometry: { front: points, back: points.map(point => sub(point, mul(normal, constants.plateThickness))), triangles: indices, planes: target.planes, noOverlap: target.noOverlap, frameBoundaryEdges: [], internalFrameEdges: [] } };
  if (axes === 1) return { ...result, geometry: null, omittedReason: 'One-axis reconstructed window contour is not simulated' };
  // 与 add_geometry_inner_window 一致：首边保留，同向共线的后续边不添加对应节点。
  const retained = []; let previousEdge;
  for (let index = 0; index < cells.length; index++) {
    const edge = sub(cells[(index+1)%cells.length], cells[index]);
    if (index === 0 || norm(cross(edge, previousEdge)) > EPS || dot(edge, previousEdge) <= 0) {
      retained.push(index); previousEdge = edge;
    }
  }
  const outer = retained.map(index => points[index]);
  assert.ok(outer.length >= 3, 'Insufficient reconstructed contour');
  const inset = distance => outer.map((point, index) => {
    const incoming = unit(sub(point, outer[(index+outer.length-1)%outer.length]));
    const outgoing = unit(sub(outer[(index+1)%outer.length], point));
    const a = cross(incoming, normal); const b = cross(outgoing, normal);
    const bisector = unit(add(a,b));
    const denominator = Math.sqrt((1 + dot(a,b)) / 2);
    assert.ok(denominator > EPS && Number.isFinite(denominator), 'Invalid native window bisector');
    return sub(point, mul(bisector, distance / denominator));
  });
  const front = inset(constants.windowInset + constants.frameWidth);
  const rim = inset(constants.windowInset);
  const triangles = fanIndices(front.length);
  const back = front.map(point => sub(point, mul(normal, constants.plateThickness)));
  const frameBoundaryEdges = retained.map((nodeIndex, i) => [nodeIndex, retained[(i+1)%retained.length]]);
  const perimeter = new Set(frameBoundaryEdges.map(([a,b]) => key(a,b)));
  const triangleEdges = triangles.flatMap(triangle => triangle.map((a,i) => [retained[a],retained[triangle[(i+1)%3]]]));
  const internalEdges = [...new Set(triangleEdges.map(([a,b]) => key(a,b)).filter(value => !perimeter.has(value)))].map(value => value.split(':').map(Number));
  const frameTriangles = frameBoundaryEdges.flatMap((_, i) => {
    const j = (i+1)%front.length;
    // 对应可涂色外框及固定内沿；这里只记录正面，背面作统一平移。
    return [[outer[i],rim[i],rim[j]], [outer[i],rim[j],outer[j]], [rim[i],front[i],front[j]], [rim[i],front[j],rim[j]]];
  });
  return { ...result, geometry: { retained, outer, rim, front, back, triangles, planes: planesOfFan(front, triangles), noOverlap: fanHasNoOverlap(front, triangles), insetValid: insetHasNoOverlap(outer, frameTriangles), frameBoundaryEdges, internalEdges, internalFrameEdges: internalEdges.filter(([a,b]) => perimeter.has(key(a,b))), frameTriangles,
    note: 'Reconstruction of static two/three-axis window functions; rasterization, outer strips, physics and breakage are not simulated' } };
}
