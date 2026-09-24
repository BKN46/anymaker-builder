import * as THREE from 'three';
import { CELL_SIZE_WORLD, AXES, assertGridVector, quantizeWorldVector, worldToCell } from './grid.js';

export const GRID_SIZE = 20;
export const GRID_DIVISIONS = GRID_SIZE / CELL_SIZE_WORLD;
export const GRID_CELL_SIZE = CELL_SIZE_WORLD;
export const BEAM_WIDTH = GRID_CELL_SIZE;
export const BEAM_JOINT_SIZE = BEAM_WIDTH * 1.1;
export const STRUCTURE_COLOR = 0xcccccc;
const EPSILON = 1e-6;
const BEAM_OUTLINE_NAME = 'beam-outline';
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

// Structural coordinates identify cells, rather than their visible boundary
// lines. Placement must follow the pointer: use its vehicle hit when present,
// then its work-plane intersection as a fallback.
export function resolvePlacementPoint(pointerRaycaster, targets, workPlane) {
  const point = pointerRaycaster.intersectObjects(targets, true)[0]?.point;
  const gridPoint = point && quantizeWorldVector(point);
  if (gridPoint) return vector(gridPoint);
  const planePoint = pointerRaycaster.ray.intersectPlane(workPlane, new THREE.Vector3());
  const planeGridPoint = planePoint && quantizeWorldVector(planePoint);
  return planeGridPoint ? vector(planeGridPoint) : null;
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

function refreshBeamOutline(mesh) {
  const outline = mesh.getObjectByName(BEAM_OUTLINE_NAME);
  if (!outline) return;
  outline.geometry.dispose();
  outline.geometry = new THREE.EdgesGeometry(mesh.geometry);
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
  // Endpoints denote cell centres. The support covers both endpoint cells,
  // extending half a cell past either end without expanding into a hull.
  const visualLength = length + BEAM_WIDTH;
  mesh.position.copy(a).add(b).multiplyScalar(.5);
  mesh.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(localX, localY, localZ));
  mesh.scale.set(BEAM_WIDTH, visualLength, BEAM_WIDTH);
  mesh.visible = true;
  mesh.updateMatrixWorld(true);
  if (mesh.userData.beamOutlineRequested && !mesh.getObjectByName(BEAM_OUTLINE_NAME)) addBeamOutline(mesh);
  else refreshBeamOutline(mesh);
  return true;
}

function addBeamOutline(mesh) {
  // The persistent preview starts at zero length. Do not pass an empty
  // BufferGeometry to EdgesGeometry; create the outline on its first valid
  // update instead.
  if (!mesh.geometry?.getAttribute('position')) return false;
  const outline = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry),
    new THREE.LineBasicMaterial({ color: 0x17212b, depthTest: true, depthWrite: false }),
  );
  outline.name = BEAM_OUTLINE_NAME;
  outline.renderOrder = 2;
  outline.userData.topologyOutline = true;
  mesh.add(outline);
  return true;
}

export function setBeamOutline(mesh, visible) {
  mesh.userData.beamOutlineRequested = Boolean(visible);
  let outline = mesh.getObjectByName(BEAM_OUTLINE_NAME);
  if (!outline && visible) {
    addBeamOutline(mesh);
    outline = mesh.getObjectByName(BEAM_OUTLINE_NAME);
  }
  if (outline) outline.visible = Boolean(visible);
}

export function createBeamMesh(start, end, material, { outlined = false } = {}) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
  mesh.userData.beamOutlineRequested = Boolean(outlined);
  updateBeamMesh(mesh, start, end);
  return mesh;
}

export function createBeamJointMesh(point, material, size = BEAM_JOINT_SIZE, { outlined = false } = {}) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
  if (outlined) addBeamOutline(mesh);
  mesh.position.copy(vector(point));
  mesh.scale.setScalar(size);
  mesh.castShadow = true; mesh.receiveShadow = true;
  return mesh;
}

function routeSegment(start, end, material, radius, radialSegments) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(.5, .5, 1, radialSegments), material);
  const direction = end.clone().sub(start);
  const length = direction.length();
  if (length <= EPSILON) { mesh.visible = false; return mesh; }
  const localY = direction.multiplyScalar(1 / length);
  const reference = Math.abs(localY.z) < .999 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, 0, 0);
  const localZ = reference.addScaledVector(localY, -reference.dot(localY)).normalize();
  const localX = new THREE.Vector3().crossVectors(localY, localZ).normalize();
  mesh.position.copy(start).add(end).multiplyScalar(.5);
  mesh.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(localX, localY, localZ));
  mesh.scale.set(radius * 2, length, radius * 2);
  mesh.castShadow = true; mesh.receiveShadow = true;
  return mesh;
}

// Build each link as solid segments and blend every route corner with a small
// sphere. This retains the save's exact routed points while avoiding the
// disjoint dashed-line appearance and open corners of independent segments.
export function createConnectionRoute(points, material, { radius = .015, radialSegments = 8 } = {}) {
  const route = new THREE.Group();
  const path = points.map(point => vector(point));
  for (let index = 1; index < path.length; index++) route.add(routeSegment(path[index - 1], path[index], material, radius, radialSegments));
  for (let index = 1; index < path.length - 1; index++) {
    const joint = new THREE.Mesh(new THREE.SphereGeometry(radius, radialSegments, Math.max(4, Math.ceil(radialSegments / 2))), material);
    joint.position.copy(path[index]); joint.castShadow = true; joint.receiveShadow = true;
    route.add(joint);
  }
  return route;
}
