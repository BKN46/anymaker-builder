import { BufferGeometry, Float32BufferAttribute } from 'three';
import { SimplifyModifier } from 'three/addons/modifiers/SimplifyModifier.js';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { modelBounds, meshNormal, remapMesh } from '../editor/model-mesh.js';
import { loftShellSections, sampleShellSections } from '../editor/model-shell-sections.js';

const RESOLUTION = 56;
// Rasterize first/last intersections along each world axis. Intersecting
// these depth intervals builds an envelope: hidden interior triangles do not
// become output surfaces, and ray crossings do not rely on source winding.
function envelope(mesh, bounds) {
  const step = Math.max(...bounds.size) / RESOLUTION;
  const size = bounds.size.map(value => Math.ceil(value / step) + 6);
  const origin = bounds.min.map(value => value - 3 * step);
  const points = mesh.positions.map((value, i) => (value - origin[i % 3]) / step - .5);
  const depths = [];
  for (let axis = 0; axis < 3; axis++) {
    const u = (axis + 1) % 3, v = (axis + 2) % 3;
    const minimum = new Float32Array(size[u] * size[v]).fill(Infinity);
    const maximum = new Float32Array(minimum.length).fill(-Infinity);
    for (let i = 0; i < mesh.indices.length; i += 3) {
      const ids = mesh.indices.subarray(i, i + 3);
      const a = ids[0] * 3, b = ids[1] * 3, c = ids[2] * 3;
      const au = points[a + u], av = points[a + v], bu = points[b + u], bv = points[b + v], cu = points[c + u], cv = points[c + v];
      const denominator = (bv - cv) * (au - cu) + (cu - bu) * (av - cv);
      if (Math.abs(denominator) < 1e-12) continue;
      const lowU = Math.max(0, Math.ceil(Math.min(au, bu, cu))), highU = Math.min(size[u] - 1, Math.floor(Math.max(au, bu, cu)));
      const lowV = Math.max(0, Math.ceil(Math.min(av, bv, cv))), highV = Math.min(size[v] - 1, Math.floor(Math.max(av, bv, cv)));
      for (let y = lowV; y <= highV; y++) for (let x = lowU; x <= highU; x++) {
        const wa = ((bv - cv) * (x - cu) + (cu - bu) * (y - cv)) / denominator;
        const wb = ((cv - av) * (x - cu) + (au - cu) * (y - cv)) / denominator;
        const wc = 1 - wa - wb;
        if (Math.min(wa, wb, wc) < -1e-7) continue;
        const depth = wa * points[a + axis] + wb * points[b + axis] + wc * points[c + axis];
        const index = x + y * size[u];
        minimum[index] = Math.min(minimum[index], depth); maximum[index] = Math.max(maximum[index], depth);
      }
    }
    depths.push({ minimum, maximum, u, v });
  }
  const address = (x, y, z) => x + size[0] * (y + size[1] * z);
  const field = new Float32Array(size[0] * size[1] * size[2]);
  for (let z = 1; z < size[2] - 1; z++) for (let y = 1; y < size[1] - 1; y++) for (let x = 1; x < size[0] - 1; x++) {
    const point = [x, y, z];
    if (depths.every(({ minimum, maximum, u, v }, axis) => {
      const i = point[u] + point[v] * size[u];
      return point[axis] >= minimum[i] - .01 && point[axis] <= maximum[i] + .01;
    })) field[address(x, y, z)] = 1;
  }
  return { field, size, origin, step, address };
}

function filterEnvelope(volume) {
  const { size, address } = volume;
  let { field } = volume;
  // Two separable binomial low-pass passes suppress small features before
  // polygon reduction, with a bounded grid independent of source mesh size.
  for (let pass = 0; pass < 2; pass++) for (let axis = 0; axis < 3; axis++) {
    const next = new Float32Array(field.length), stride = [1, size[0], size[0] * size[1]][axis];
    for (let z = 1; z < size[2] - 1; z++) for (let y = 1; y < size[1] - 1; y++) for (let x = 1; x < size[0] - 1; x++) {
      const i = address(x, y, z); next[i] = (field[i - stride] + 2 * field[i] + field[i + stride]) / 4;
    }
    field = next;
  }
  // Retain substantial disconnected exterior pieces (e.g. wheels), discard
  // tiny filtered islands. Flooding outside also fills enclosed cavities.
  const visited = new Uint8Array(field.length), queue = new Int32Array(field.length), components = [];
  const strides = [1, size[0], size[0] * size[1]];
  const neighbors = (i, callback) => {
    const point = [i % size[0], Math.floor(i / size[0]) % size[1], Math.floor(i / (size[0] * size[1]))];
    for (let axis = 0; axis < 3; axis++) {
      if (point[axis]) callback(i - strides[axis]);
      if (point[axis] + 1 < size[axis]) callback(i + strides[axis]);
    }
  };
  for (let start = 0; start < field.length; start++) {
    if (visited[start] || field[start] < .5) continue;
    let head = 0, tail = 1; queue[0] = start; visited[start] = 1;
    while (head < tail) neighbors(queue[head++], i => { if (!visited[i] && field[i] >= .5) { visited[i] = 1; queue[tail++] = i; } });
    components.push(queue.slice(0, tail));
  }
  const largest = components.reduce((max, component) => Math.max(max, component.length), 0);
  if (!largest) throw new Error('无法提取模型外壳，请使用封闭或具有厚度的模型');
  for (const component of components) if (component.length < Math.max(8, largest * .005)) for (const index of component) field[index] = 0;
  visited.fill(0); queue[0] = 0; visited[0] = 1;
  let head = 0, tail = 1;
  while (head < tail) neighbors(queue[head++], i => { if (!visited[i] && field[i] < .5) { visited[i] = 1; queue[tail++] = i; } });
  for (let i = 0; i < field.length; i++) if (!visited[i] && field[i] < .5) field[i] = 1;
  return { ...volume, field, removedIslands: components.filter(component => component.length < Math.max(8, largest * .005)).length };
}

export function prepareModelShell(mesh) {
  const bounds = modelBounds(mesh.positions), longest = Math.max(...bounds.size);
  if (!Number.isFinite(longest) || longest <= 0) throw new Error('模型中没有可用的三角面');
  const welded = remapMesh(mesh, point => point.map((value, axis) => Math.round((value - bounds.min[axis]) / longest * 1e8)).join(','), point => point);
  if (!welded.indices.length) throw new Error('模型中没有可用的三角面');
  // A planar drawing has no volume to enclose; preserve its open surface.
  const face = Array.from(welded.indices.slice(0, 3));
  const direction = meshNormal(welded.positions, ...face), magnitude = Math.hypot(...direction);
  const anchor = welded.positions.slice(face[0] * 3, face[0] * 3 + 3);
  const planar = magnitude > 0 && Array.from({ length: welded.positions.length / 3 }, (_, i) => i).every(index => Math.abs(direction.reduce((sum, value, axis) => sum + value * (welded.positions[index * 3 + axis] - anchor[axis]), 0)) / magnitude <= longest * 1e-5);
  const volume = planar ? null : filterEnvelope(envelope(welded, bounds));
  return { ...welded, volume, sourceBounds: bounds, shellStats: { sourceVertices: welded.positions.length / 3, filteredVoxels: volume ? volume.field.reduce((count, value) => count + (value >= .5 ? 1 : 0), 0) : 0, removedIslands: volume?.removedIslands || 0, planar } };
}

export function reduceShell(shell, target) {
  if (shell.volume) {
    const profile = sampleShellSections(shell.volume, shell.sourceBounds, target);
    return { ...loftShellSections(profile), profile, sourceBounds: shell.sourceBounds, shellStats: shell.shellStats };
  }
  const bounds = shell.sourceBounds, longest = Math.max(...bounds.size);
  // Keep the edge-collapse cost bounded for very dense planar source files.
  let basis = shell;
  if (basis.positions.length / 3 > 2048) for (const divisions of [32, 24, 16, 8]) {
    const step = longest / divisions;
    basis = remapMesh(shell, point => point.map((value, axis) => Math.floor((value - bounds.min[axis]) / step)).join(','), point => point);
    if (basis.positions.length / 3 <= 2048) break;
  }
  const count = basis.positions.length / 3;
  if (count <= target) return { ...shell, positions: basis.positions.slice(), indices: basis.indices.slice() };
  // Normalize before using Three's fixed merge tolerance (models can arrive
  // in centimeters or at very small GLB scene scales).
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(basis.positions.map((value, i) => (value - bounds.min[i % 3]) / longest), 3));
  geometry.setIndex(Array.from(basis.indices));
  let merged, reduced;
  try {
    merged = mergeVertices(geometry);
    reduced = new SimplifyModifier().modify(merged, Math.max(0, merged.attributes.position.count - target));
    return { ...shell, positions: Float64Array.from(reduced.attributes.position.array, (value, i) => value * longest + bounds.min[i % 3]), indices: new Uint32Array(reduced.index.array) };
  } finally { geometry.dispose(); merged?.dispose(); reduced?.dispose(); }
}
