import * as THREE from 'three';
import { CELL_SIZE_WORLD, greatestCommonDivisor } from './grid.js';
import { inclinedMountFrame } from './surface-mount.js';
import { consistentNativeGrid } from '../native/grid-frame.js';
import { transformVector, transposeRotation, vectorArray } from './component-frame.js';

const axes = ['x', 'y', 'z'];
const asNativeCells = value => [-value.x, value.y, value.z].map(n => n / CELL_SIZE_WORLD);

// Only actual structural panel hits opt in. Beams, curved Mesh triangles,
// component envelopes and axis-aligned faces retain the existing placement.
export function resolveInclinedPlacement(raycaster, targets, { picker, topology, rotation = { x: 0, y: 0, z: 0 }, definition = null } = {}) {
  const hit = picker.firstHit(raycaster, targets);
  if (hit?.object?.userData.topology !== 'plate') return null;
  const plate = topology.plates.find(value => value.id === hit.object.userData.plateId);
  if (!plate) return null;
  const nodes = new Map(topology.nodes.map(node => [node.id, node.position]));
  const points = plate.nodeIds.map(id => nodes.get(id));
  if (points.some(point => !point)) return null;
  const cells = points.map(asNativeCells);
  if (cells.some(point => point.some(value => Math.abs(value - Math.round(value)) > 1e-6))) return null;
  const a = new THREE.Vector3(...cells[0].map(Math.round));
  let direction = new THREE.Vector3();
  for (let i = 1; i < cells.length - 1 && direction.lengthSq() < 1e-9; i++) {
    direction = new THREE.Vector3(...cells[i]).sub(a).cross(new THREE.Vector3(...cells[i + 1]).sub(a));
  }
  const raw = direction.toArray().map(Math.round);
  const divisor = greatestCommonDivisor(raw);
  if (!divisor) return null;
  let dir = raw.map(value => value / divisor);
  if (dir.filter(value => value !== 0).length < 2) return null;
  if (dir.some(value => Math.abs(value) > 1000000)) return null;
  if (cells.some(point => Math.abs(point.reduce((sum, value, i) => sum + (value - cells[0][i]) * dir[i], 0)) > 1e-5)) return null;
  const normal = new THREE.Vector3(-dir[0], dir[1], dir[2]).normalize();
  if (normal.dot(raycaster.ray.direction) > 0) dir = dir.map(value => -value);
  const grid = consistentNativeGrid(cells[0].map(Math.round), dir);
  const frame = inclinedMountFrame(grid.dir, grid.origin);
  const local = transformVector(transposeRotation(frame.rotation), asNativeCells(hit.point).map((value, i) => value - vectorArray(frame.origin)[i]));
  const localRotation = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rotation.x, rotation.y, rotation.z, 'XYZ'));
  // Bounds are occupied cell centers, as in the game's placement path. The
  // mounting frame already includes the half-cell clearance along its normal.
  let minimumY = Infinity;
  for (const zone of definition?.zones || [{}]) {
    const min = zone.bounds_min || [0, 0, 0]; const max = zone.bounds_max || [0, 0, 0];
    for (const x of [min[0], max[0]]) for (const y of [min[1], max[1]]) for (const z of [min[2], max[2]]) {
      minimumY = Math.min(minimumY, new THREE.Vector3(-x, y, z).applyMatrix4(localRotation).y);
    }
  }
  const position = [Math.round(local[0]), -Math.round(Number.isFinite(minimumY) ? minimumY : 0), Math.round(local[2])];
  const nativePosition = transformVector(frame.rotation, position).map((value, i) => value + vectorArray(frame.origin)[i]);
  const point = new THREE.Vector3(-nativePosition[0], nativePosition[1], nativePosition[2]).multiplyScalar(CELL_SIZE_WORLD);
  if (point.toArray().some(value => !Number.isFinite(value) || Math.abs(value) > 10000)) return null;
  const signs = [-1, 1, 1];
  const r = frame.rotation.map((value, i) => value * signs[Math.floor(i / 3)] * signs[i % 3]);
  const matrix = new THREE.Matrix4().set(r[0], r[1], r[2], 0, r[3], r[4], r[5], 0, r[6], r[7], r[8], 0, 0, 0, 0, 1).multiply(localRotation);
  const euler = new THREE.Euler().setFromRotationMatrix(matrix, 'XYZ');
  return { point, rotation: Object.fromEntries(axes.map(axis => [axis, euler[axis]])), surfaceMount: { dir, position }, gridId: plate.gridId };
}
