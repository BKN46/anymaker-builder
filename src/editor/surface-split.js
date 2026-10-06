import { validatePlatePolygon, triangulatePlatePolygon } from './plate-polygon.js';
import { validateTopologyState } from './topology.js';
import { splitSurfacePaths } from './surface-paths.js';

const EPS = 1e-9;
const turn = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
const onSegment = (a, b, p) => Math.abs(turn(a, b, p)) <= EPS && p.x >= Math.min(a.x, b.x) - EPS && p.x <= Math.max(a.x, b.x) + EPS && p.y >= Math.min(a.y, b.y) - EPS && p.y <= Math.max(a.y, b.y) + EPS;
const pairMatches = (a, b, c, d) => a === c && b === d || a === d && b === c;

export function isCurvedPlate(plate, nodes) {
  if (!plate) return false;
  const byId = new Map(nodes.map(node => [node.id, node.position]));
  const points = plate.nodeIds.map(id => byId.get(id));
  if (points.some(point => !point)) return false;
  try { validatePlatePolygon(points); return false; }
  catch (error) { return error.code === 'nonplanar-plate'; }
}

// CAD-style connect-vertices cuts partition one boundary into independent
// regions. They are temporary authoring data, never native private fields.
export function surfaceSplitRegions(plate, nodes, cuts) {
  if (!Array.isArray(cuts) || cuts.length > nodes.length * 2) throw new Error('曲面分割线数量无效');
  if (cuts.some(path => Array.isArray(path) && (path.length > 2 || path.some(id => !plate.nodeIds.includes(id))))) {
    return splitSurfacePaths(plate, nodes, cuts);
  }
  const byId = new Map(nodes.map(node => [node.id, node.position]));
  const points = plate.nodeIds.map(id => byId.get(id));
  const { projected } = validatePlatePolygon(points, { allowNonPlanar: true });
  const projectedById = new Map(plate.nodeIds.map((id, i) => [id, projected[i]]));
  let regions = [[...plate.nodeIds]];
  const seen = [];
  for (const cut of cuts) {
    if (!Array.isArray(cut) || cut.length !== 2 || cut[0] === cut[1] || cut.some(id => !byId.has(id) || !projectedById.has(id))) throw new Error('请选择曲面上两个不同的边界节点');
    const [a, b] = cut;
    if (seen.some(([c, d]) => pairMatches(a, b, c, d))) throw new Error('曲面分割线已存在');
    const index = regions.findIndex(region => region.includes(a) && region.includes(b));
    if (index < 0) throw new Error('曲面分割线不能相交');
    const region = regions[index];
    const i = region.indexOf(a); const j = region.indexOf(b);
    if (Math.abs(i - j) === 1 || Math.abs(i - j) === region.length - 1) throw new Error('相邻边界节点无需分割');
    const pa = projectedById.get(a); const pb = projectedById.get(b);
    // A chord cannot pass through another boundary vertex or leave a concave
    // boundary. Validating both resulting polygons catches crossing edges.
    if (region.some(id => id !== a && id !== b && onSegment(pa, pb, projectedById.get(id)))) throw new Error('分割线不能穿过其他边界节点');
    let inside = false;
    const mid = { x: (pa.x + pb.x) / 2, y: (pa.y + pb.y) / 2 };
    for (let k = 0; k < region.length; k++) {
      const p = projectedById.get(region[k]); const q = projectedById.get(region[(k + 1) % region.length]);
      if ((p.y > mid.y) !== (q.y > mid.y) && mid.x < (q.x - p.x) * (mid.y - p.y) / (q.y - p.y) + p.x) inside = !inside;
    }
    if (!inside) throw new Error('分割线必须位于曲面边界内部');
    const low = Math.min(i, j); const high = Math.max(i, j);
    const parts = [region.slice(low, high + 1), [...region.slice(high), ...region.slice(0, low + 1)]];
    for (const part of parts) validatePlatePolygon(part.map(id => ({ ...projectedById.get(id), z: 0 })));
    regions.splice(index, 1, ...parts); seen.push(cut);
  }
  return regions;
}

export function splitCurvedPlate(state, plateId, cuts) {
  const next = validateTopologyState(state);
  const plate = next.plates.find(value => value.id === plateId);
  if (!plate || (!plate.surfaceLimitBypass && !isCurvedPlate(plate, next.nodes))) throw new Error('请选择曲面或已开启规避限制的面板或窗');
  if (!cuts.length) throw new Error('请先添加曲面分割线');
  const regions = surfaceSplitRegions(plate, next.nodes, cuts);
  const byId = new Map(next.nodes.map(node => [node.id, node.position]));
  const pieces = regions.flatMap(nodeIds => {
    const points = nodeIds.map(id => byId.get(id));
    try { validatePlatePolygon(points, { convex: true }); return [nodeIds]; }
    catch { return triangulatePlatePolygon(points, { allowNonPlanar: true }).map(triangle => triangle.map(index => nodeIds[index])); }
  });
  const used = new Set(next.plates.map(value => value.id)); let serial = 1;
  const plates = pieces.map((nodeIds, index) => {
    while (used.has('plate-' + serial)) serial++;
    const id = index === 0 ? plate.id : 'plate-' + serial++;
    const result = { ...structuredClone(plate), id, nodeIds };
    // Retain authoring intent: export must never silently add beams to these
    // faces, including when an extra 3D control node has no beam support.
    result.surfaceLimitBypass = true;
    // Each region now has its own winding and normal; the previous global
    // camera direction must not reverse individual native faces.
    delete result.surfaceDirection;
    delete result.surfaceFanAnchor;
    return result;
  });
  // These are authoring faces. Native export separately requires all of
  // their boundary beams; do not add them implicitly to satisfy the loader.
  next.plates.splice(next.plates.indexOf(plate), 1, ...plates);
  return { topology: validateTopologyState(next), plateIds: plates.map(value => value.id), addedEdges: next.edges.length - state.edges.length };
}
