export function modelBounds(positions) {
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < positions.length; i++) {
    min[i % 3] = Math.min(min[i % 3], positions[i]);
    max[i % 3] = Math.max(max[i % 3], positions[i]);
  }
  return { min, max, size: max.map((value, i) => value - min[i]) };
}

export function meshNormal(positions, a, b, c) {
  const u = [0, 1, 2].map(i => positions[b * 3 + i] - positions[a * 3 + i]);
  const v = [0, 1, 2].map(i => positions[c * 3 + i] - positions[a * 3 + i]);
  return [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
}

// Compact by shared position, remove collapsed/duplicate triangles and keep
// winding aligned with the source even when clustering changes a triangle.
export function remapMesh(mesh, pointKey, pointValue) {
  const groups = new Map(), positions = [], counts = [], mapping = new Uint32Array(mesh.positions.length / 3);
  for (let i = 0; i < mapping.length; i++) {
    const point = Array.from(mesh.positions.slice(i * 3, i * 3 + 3));
    const key = pointKey(point);
    let id = groups.get(key);
    if (id === undefined) {
      id = counts.length; groups.set(key, id); counts.push(0); positions.push(0, 0, 0);
    }
    counts[id]++;
    const value = pointValue(point);
    for (let axis = 0; axis < 3; axis++) positions[id * 3 + axis] += value[axis];
    mapping[i] = id;
  }
  for (let i = 0; i < positions.length; i++) positions[i] /= counts[Math.floor(i / 3)];
  const indices = [], seen = new Set();
  for (let i = 0; i < mesh.indices.length; i += 3) {
    const source = Array.from(mesh.indices.slice(i, i + 3));
    const face = source.map(index => mapping[index]);
    if (new Set(face).size !== 3) continue;
    const direction = meshNormal(positions, ...face);
    if (Math.hypot(...direction) < 1e-12) continue;
    const key = [...face].sort((a, b) => a - b).join(',');
    if (seen.has(key)) continue;
    seen.add(key);
    const original = meshNormal(mesh.positions, ...source);
    if (direction.reduce((sum, value, axis) => sum + value * original[axis], 0) < 0) [face[1], face[2]] = [face[2], face[1]];
    indices.push(...face);
  }
  const used = new Map(), compact = [];
  const remapped = indices.map(index => {
    if (!used.has(index)) {
      used.set(index, used.size);
      compact.push(...positions.slice(index * 3, index * 3 + 3));
    }
    return used.get(index);
  });
  return { positions: new Float64Array(compact), indices: new Uint32Array(remapped) };
}

