// Split an oriented surface disk by explicit 3D polylines. No camera or
// global XY/XZ/YZ projection determines which vertices are connected.
const axes = ['x', 'y', 'z'];
const sub = (a, b) => axes.map(axis => a[axis] - b[axis]);
const dot = (a, b) => a.reduce((sum, v, i) => sum + v * b[i], 0);
const clamp = n => Math.max(0, Math.min(1, n));
const EPS = 1e-12;

function distanceSquared(a, b, c, d) {
  const u = sub(b, a); const v = sub(d, c); const w = sub(a, c);
  const uu = dot(u, u); const vv = dot(v, v); const uv = dot(u, v);
  const uw = dot(u, w); const vw = dot(v, w);
  if (uu <= EPS || vv <= EPS) throw new Error('曲面连线路径包含重合节点');
  const denominator = uu * vv - uv * uv;
  let s = denominator > EPS ? clamp((uv * vw - uw * vv) / denominator) : 0;
  let t = (uv * s + vw) / vv;
  if (t < 0) { t = 0; s = clamp(-uw / uu); }
  else if (t > 1) { t = 1; s = clamp((uv - uw) / uu); }
  return w.reduce((sum, value, i) => sum + (value + s * u[i] - t * v[i]) ** 2, 0);
}

export function splitSurfacePaths(plate, nodes, paths) {
  const byId = new Map(nodes.map(node => [node.id, node]));
  let regions = [[...plate.nodeIds]];
  const segments = plate.nodeIds.map((id, i) => [id, plate.nodeIds[(i + 1) % plate.nodeIds.length]]);
  const used = new Set(plate.nodeIds);
  const owner = plate.gridId || byId.get(plate.nodeIds[0])?.gridId;
  for (const path of paths) {
    if (!Array.isArray(path) || path.length < 2 || path.length > nodes.length || new Set(path).size !== path.length
      || path.some(id => !byId.has(id))) throw new Error('曲面连线路径需要不同且存在的节点');
    if (path.some(id => byId.get(id).gridId && owner && byId.get(id).gridId !== owner)) throw new Error('面板不能跨越子网格');
    const a = path[0]; const b = path.at(-1);
    const index = regions.findIndex(region => region.includes(a) && region.includes(b));
    if (index < 0) throw new Error('路径两端必须在同一面片边界上');
    if (path.slice(1, -1).some(id => used.has(id))) throw new Error('途经点已在面片边界上，请分段连接');
    const region = regions[index]; const i = region.indexOf(a); const j = region.indexOf(b);
    if (path.length === 2 && (Math.abs(i - j) === 1 || Math.abs(i - j) === region.length - 1)) throw new Error('相邻边界节点无需分割');
    for (let k = 0; k < path.length - 1; k++) {
      const next = [path[k], path[k + 1]];
      const p = next.map(id => byId.get(id).position);
      if (dot(sub(p[1], p[0]), sub(p[1], p[0])) <= EPS) throw new Error('曲面连线路径包含重合节点');
      for (const segment of segments) {
        const common = next.find(id => segment.includes(id));
        if (common) {
          const origin = byId.get(common).position;
          const u = sub(byId.get(next.find(id => id !== common)).position, origin);
          const v = sub(byId.get(segment.find(id => id !== common)).position, origin);
          if (dot(u, v) > 0 && dot(u, u) * dot(v, v) - dot(u, v) ** 2 <= EPS) throw new Error('曲面连线不能在空间中相交或重叠');
        } else if (distanceSquared(...p, ...segment.map(id => byId.get(id).position)) <= EPS) {
          throw new Error('曲面连线不能在空间中相交或重叠');
        }
      }
      segments.push(next);
    }
    const low = Math.min(i, j); const high = Math.max(i, j);
    const forward = i < j ? path : [...path].reverse();
    const middle = forward.slice(1, -1);
    regions.splice(index, 1,
      [...region.slice(low, high + 1), ...middle.toReversed()],
      [...region.slice(high), ...region.slice(0, low + 1), ...middle]);
    path.forEach(id => used.add(id));
  }
  return regions;
}
