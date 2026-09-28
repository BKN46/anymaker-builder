// Pure polygon checks shared by plate commands and diagnostic rendering.
const EPSILON = 1e-9;
const axes = ['x', 'y', 'z'];
const subtract = (a, b) => axes.map(axis => a[axis] - b[axis]);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const turn = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);

export function platePolygonFrame(points) {
  let normal = null;
  for (let i = 1; i < points.length - 1 && !normal; i++) for (let j = i + 1; j < points.length; j++) {
    const value = cross(subtract(points[i], points[0]), subtract(points[j], points[0]));
    const magnitude = Math.hypot(...value);
    if (magnitude > EPSILON) { normal = value.map(v => v / magnitude); break; }
  }
  if (!normal) throw new Error('面板节点不能共线');
  if (points.some(point => Math.abs(subtract(point, points[0]).reduce((sum, v, i) => sum + v * normal[i], 0)) > 1e-6)) {
    throw Object.assign(new Error('面板节点必须共面'), { code: 'nonplanar-plate' });
  }
  const dominant = normal.reduce((best, value, index) => Math.abs(value) > Math.abs(normal[best]) ? index : best, 0);
  const horizontal = axes[(dominant + 1) % 3]; const vertical = axes[(dominant + 2) % 3];
  const projected = points.map(point => ({ x: point[horizontal] - points[0][horizontal], y: point[vertical] - points[0][vertical] }));
  return { normal: Object.fromEntries(axes.map((axis, i) => [axis, normal[i]])), projected };
}

function onSegment(a, b, p) {
  return Math.abs(turn(a, b, p)) <= EPSILON && p.x >= Math.min(a.x, b.x) - EPSILON && p.x <= Math.max(a.x, b.x) + EPSILON
    && p.y >= Math.min(a.y, b.y) - EPSILON && p.y <= Math.max(a.y, b.y) + EPSILON;
}

function intersects(a, b, c, d) {
  const abC = turn(a, b, c); const abD = turn(a, b, d); const cdA = turn(c, d, a); const cdB = turn(c, d, b);
  return (abC * abD < -EPSILON * EPSILON && cdA * cdB < -EPSILON * EPSILON)
    || onSegment(a, b, c) || onSegment(a, b, d) || onSegment(c, d, a) || onSegment(c, d, b);
}

export function validatePlatePolygon(points, { convex = false } = {}) {
  const frame = platePolygonFrame(points); const p = frame.projected; const count = p.length;
  let winding = 0;
  for (let i = 0; i < count; i++) {
    const a = p[i]; const b = p[(i + 1) % count]; const c = p[(i + 2) % count];
    if (Math.hypot(a.x - b.x, a.y - b.y) <= EPSILON) throw new Error('面板边界不能自交或重叠');
    const value = turn(a, b, c);
    if (Math.abs(value) <= EPSILON && (b.x - a.x) * (c.x - b.x) + (b.y - a.y) * (c.y - b.y) < 0) throw new Error('面板边界不能自交或重叠');
    if (convex && Math.abs(value) > EPSILON) {
      if (winding && Math.sign(value) !== winding) throw new Error('面板边界必须为凸多边形');
      winding = Math.sign(value);
    }
    for (let j = i + 2; j < count; j++) {
      if (i === 0 && j === count - 1) continue;
      if (intersects(a, b, p[j], p[(j + 1) % count])) throw new Error('面板边界不能自交或重叠');
    }
  }
  return frame;
}

// Ear clipping handles both newly constructed and imported concave plates,
// including boundaries whose straight sides contain intermediate nodes.
export function triangulatePlatePolygon(points) {
  if (points.length < 3) return [];
  const { projected: p } = validatePlatePolygon(points);
  const area = p.reduce((sum, a, i) => sum + a.x * p[(i + 1) % p.length].y - a.y * p[(i + 1) % p.length].x, 0);
  const sign = Math.sign(area); const remaining = p.map((_, i) => i); const triangles = [];
  while (remaining.length > 3) {
    let clipped = false;
    for (let i = 0; i < remaining.length; i++) {
      const a = remaining[(i + remaining.length - 1) % remaining.length]; const b = remaining[i]; const c = remaining[(i + 1) % remaining.length];
      const value = sign * turn(p[a], p[b], p[c]);
      if (Math.abs(value) <= EPSILON) { remaining.splice(i, 1); clipped = true; break; }
      if (value < 0 || remaining.some(id => id !== a && id !== b && id !== c
        && sign * turn(p[a], p[b], p[id]) >= -EPSILON && sign * turn(p[b], p[c], p[id]) >= -EPSILON && sign * turn(p[c], p[a], p[id]) >= -EPSILON)) continue;
      triangles.push([a, b, c]); remaining.splice(i, 1); clipped = true; break;
    }
    if (!clipped) throw new Error('面板无法三角化');
  }
  if (remaining.length === 3 && Math.abs(turn(...remaining.map(id => p[id]))) > EPSILON) triangles.push([...remaining]);
  return triangles;
}
