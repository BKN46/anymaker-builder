import * as THREE from 'three';
import { CELL_SIZE_WORLD, AXES, assertGridVector, quantizeWorldVector, worldToCell } from './grid.js';

export const GRID_SIZE = 20;
export const GRID_DIVISIONS = GRID_SIZE / CELL_SIZE_WORLD;
export const GRID_CELL_SIZE = CELL_SIZE_WORLD;
export const BEAM_WIDTH = GRID_CELL_SIZE;
export const STRUCTURE_COLOR = 0xcccccc;
const EPSILON = 1e-6;
const vector = point => new THREE.Vector3(point.x, point.y, point.z);
const validPoint = point => point && AXES.every(axis => Number.isFinite(point[axis]) && Math.abs(point[axis]) <= 10000);

export function cameraBuildFrame(camera, anchor) {
  const rotation = camera.getWorldQuaternion(new THREE.Quaternion());
  const origin = vector(anchor);
  const right = new THREE.Vector3(1, 0, 0).applyQuaternion(rotation);
  const up = new THREE.Vector3(0, 1, 0).applyQuaternion(rotation);
  const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(rotation);
  return { origin, right, up, plane: new THREE.Plane().setFromNormalAndCoplanarPoint(normal, origin) };
}

export function projectBuildPoint(ray, frame) {
  if (Math.abs(ray.direction.dot(frame.plane.normal)) < EPSILON) return null;
  const point = ray.intersectPlane(frame.plane, new THREE.Vector3());
  if (!point) return null;
  const gridPoint = quantizeWorldVector(point);
  return gridPoint ? vector(gridPoint) : null;
}

export function resolveBeamPoint(ray, frame, { axisSnap = false, node = null, viewNormal = frame.plane.normal } = {}) {
  const origin = quantizeWorldVector(frame.origin);
  if (!origin) return null;
  const start = vector(origin);
  if (!axisSnap) {
    const point = validPoint(node) ? assertGridVector(node, '节点坐标') : projectBuildPoint(ray, frame);
    return point ? { point: vector(point), axis: null } : null;
  }
  if (validPoint(node)) {
    const aligned = assertGridVector(node, '节点坐标');
    const changed = AXES.filter(axis => worldToCell(aligned[axis]) !== worldToCell(origin[axis]));
    if (changed.length <= 1) return { point: vector(aligned), axis: changed[0] || null };
  }
  let best = null;
  const offset = ray.origin.clone().sub(start);
  for (const axis of AXES) {
    if (Math.abs(viewNormal[axis]) > .995) continue;
    const alignment = ray.direction[axis];
    const denominator = 1 - alignment * alignment;
    if (denominator < 1e-4) continue;
    const distance = (offset[axis] - alignment * offset.dot(ray.direction)) / denominator;
    const alongRay = alignment * distance - offset.dot(ray.direction);
    if (alongRay <= EPSILON || !Number.isFinite(distance)) continue;
    const point = start.clone(); point[axis] += distance;
    const score = ray.at(alongRay, new THREE.Vector3()).distanceToSquared(point) / (alongRay * alongRay);
    if (!Number.isFinite(score) || (best && score >= best.score)) continue;
    const gridPoint = quantizeWorldVector(point);
    if (!gridPoint) continue;
    best = { point: vector(gridPoint), axis, score };
  }
  return best ? { point: best.point, axis: best.axis } : null;
}

export function beamMeasurements(start, end) {
  if (!validPoint(start) || !validPoint(end)) return [];
  let gridStart; let gridEnd;
  try { gridStart = assertGridVector(start, '梁起点'); gridEnd = assertGridVector(end, '梁终点'); } catch { return []; }
  const cursor = vector(gridStart);
  return AXES.map(axis => {
    const from = cursor.clone(); cursor[axis] = gridEnd[axis];
    const cells = Math.abs(worldToCell(gridEnd[axis]) - worldToCell(gridStart[axis]));
    return { axis, length: cells * GRID_CELL_SIZE, cells, from, to: cursor.clone() };
  });
}

export function updateBeamMesh(mesh, start, end) {
  const a = vector(start); const b = vector(end);
  const direction = b.clone().sub(a);
  const length = direction.length();
  if (![...a.toArray(), ...b.toArray()].every(Number.isFinite) || length <= EPSILON) {
    mesh.visible = false;
    return false;
  }
  const localY = direction.normalize();
  const reference = Math.abs(localY.z) < .999 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, 0, 0);
  const localZ = reference.addScaledVector(localY, -reference.dot(localY)).normalize();
  const localX = new THREE.Vector3().crossVectors(localY, localZ).normalize();
  mesh.position.copy(a).add(b).multiplyScalar(.5);
  mesh.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(localX, localY, localZ));
  mesh.scale.set(BEAM_WIDTH, length, BEAM_WIDTH);
  mesh.visible = true;
  mesh.updateMatrixWorld(true);
  return true;
}

export function createBeamMesh(start, end, material) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
  updateBeamMesh(mesh, start, end);
  return mesh;
}
