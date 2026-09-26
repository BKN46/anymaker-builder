import { CELL_SIZE_WORLD, cellToWorld } from './grid.js';
import { modelBounds, meshNormal as normal, remapMesh } from './model-mesh.js';
import { prepareModelShell, reduceShell } from '../assets/model-shell.js';
import { mergeModelQuads } from './model-quads.js';
import { loftShellSections } from './model-shell-sections.js';
import { mirrorModelHalf, symmetrizeShellProfile } from './model-symmetry.js';
import { MODEL_VERTEX_TARGETS, DEFAULT_MODEL_LEVEL } from './model-import-settings.js';
export { modelBounds } from './model-mesh.js';
export { MODEL_VERTEX_TARGETS, DEFAULT_MODEL_LEVEL } from './model-import-settings.js';
export const MODEL_STRUCTURE_LIMITS = { nodes: 5000, edges: 10000, faces: 4000 };
const axes = ['x', 'y', 'z'];

export function simplifyModel(mesh, level = DEFAULT_MODEL_LEVEL) {
  if (!Number.isInteger(level) || level < 0 || level >= MODEL_VERTEX_TARGETS.length) throw new Error('模型简化档位无效');
  const shell = mesh.shellStats ? mesh : prepareModelShell(mesh);
  return { ...reduceShell(shell, MODEL_VERTEX_TARGETS[level]), targetVertices: MODEL_VERTEX_TARGETS[level] };
}

export function convertModel(mesh, { scale = 1, panels = true, reverseNormals = false, symmetryAxis = null } = {}) {
  if (!Number.isFinite(scale) || scale < .01 || scale > 100) throw new Error('模型缩放必须在 0.01 到 100 之间');
  if (symmetryAxis !== null && !axes.includes(symmetryAxis)) throw new Error('模型对称方向无效');
  if (!mesh.indices.length) throw new Error('简化后没有可用的面，请降低简化程度');
  const bounds = mesh.sourceBounds || modelBounds(mesh.positions);
  const factor = 4 * scale / Math.max(...bounds.size);
  const origin = [(bounds.min[0] + bounds.max[0]) / 2, bounds.min[1], (bounds.min[2] + bounds.max[2]) / 2];
  const axis = axes.indexOf(symmetryAxis);
  const center = axis < 0 ? 0 : (bounds.min[axis] + bounds.max[axis]) / 2;
  const centerCell = axis < 0 ? 0 : Math.round((center - origin[axis]) * factor / CELL_SIZE_WORLD);
  const cells = point => point.map((value, axis) => Math.round((value - origin[axis]) * factor / CELL_SIZE_WORLD));
  const profile = mesh.profile && (axis < 0 ? mesh.profile : symmetrizeShellProfile(mesh.profile, axis, center));
  let gridMesh = profile ? loftShellSections(profile, { factor: factor / CELL_SIZE_WORLD, origin, snap: true, symmetryAxis: axis, symmetryCenter: center }) : remapMesh(mesh, point => cells(point).join(','), cells);
  if (axis >= 0 && !profile) gridMesh = mirrorModelHalf(gridMesh, axis, centerCell);
  let snapped = remapMesh(gridMesh, point => point.join(','), point => point.map(cellToWorld));
  // Cluster averages of identical grid positions can incur tiny roundoff.
  snapped.positions = snapped.positions.map(value => cellToWorld(Math.round(value / CELL_SIZE_WORLD)));
  snapped = mergeModelQuads(snapped, { adjustVertices: axis < 0 });
  if (reverseNormals) snapped.polygons.forEach(face => face.reverse());
  const edges = new Map();
  for (const face of snapped.polygons) {
    for (let j = 0; j < face.length; j++) {
      const a = face[j], b = face[(j + 1) % face.length];
      edges.set([Math.min(a, b), Math.max(a, b)].join(','), [a, b]);
    }
  }
  const quads = snapped.polygons.filter(face => face.length === 4).length;
  const counts = { nodes: snapped.positions.length / 3, edges: edges.size, faces: snapped.polygons.length, plates: panels ? snapped.polygons.length : 0, quads, triangles: snapped.polygons.length - quads };
  const finalBounds = counts.nodes ? modelBounds(snapped.positions) : null;
  const dimensions = finalBounds ? finalBounds.size.map(value => {
    const cells = Math.round(value / CELL_SIZE_WORLD) + 1;
    return { cells, meters: cells * CELL_SIZE_WORLD };
  }) : null;
  const tooLarge = counts.nodes > MODEL_STRUCTURE_LIMITS.nodes || counts.edges > MODEL_STRUCTURE_LIMITS.edges || counts.faces > MODEL_STRUCTURE_LIMITS.faces;
  const outOfRange = snapped.positions.some(value => Math.abs(value) > 10000);
  const error = !counts.faces ? '格点吸附后没有可用的面，请增大缩放或降低简化程度' : outOfRange ? '生成坐标超出编辑器范围，请减小缩放' : tooLarge ? '结构过多，请提高简化程度（最多 5000 节点、10000 梁、4000 面）' : null;
  let topology = null;
  if (!error) {
    const nodeId = index => `model-node-${index + 1}`;
    topology = {
      nodes: Array.from({ length: counts.nodes }, (_, i) => ({ id: nodeId(i), gridId: 'grid-1', position: Object.fromEntries(axes.map((axis, j) => [axis, snapped.positions[i * 3 + j]])) })),
      edges: [...edges.values()].map(([a, b], i) => ({ id: `model-edge-${i + 1}`, a: nodeId(a), b: nodeId(b), gridId: 'grid-1' })),
      plates: [], links: [],
    };
    if (panels) for (const [i, face] of snapped.polygons.entries()) {
      const direction = normal(snapped.positions, ...face.slice(0, 3)), magnitude = Math.hypot(...direction);
      topology.plates.push({ id: `model-plate-${i + 1}`, gridId: 'grid-1', nodeIds: face.map(nodeId), normalOffset: CELL_SIZE_WORLD / 2, surfaceDirection: Object.fromEntries(axes.map((axis, j) => [axis, direction[j] / magnitude])) });
    }
  }
  const inputFaces = axis >= 0 && !profile ? gridMesh.indices.length / 3 : mesh.indices.length / 3;
  return { counts, dimensions, topology, error, preview: snapped, symmetry: axis < 0 ? null : { axis: symmetryAxis, coordinate: cellToWorld(centerCell) }, simplifiedVertices: mesh.positions.length / 3, simplifiedFaces: mesh.indices.length / 3, droppedFaces: Math.max(0, inputFaces - snapped.indices.length / 3), targetVertices: mesh.targetVertices, shellStats: mesh.shellStats };
}
