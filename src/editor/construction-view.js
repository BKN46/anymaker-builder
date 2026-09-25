import * as THREE from 'three';
import { CELL_SIZE_WORLD, AXES, assertGridVector, quantizeWorldVector, worldToCell } from './grid.js';

export const GRID_SIZE = 20;
export const GRID_DIVISIONS = GRID_SIZE / CELL_SIZE_WORLD;
export const GRID_CELL_SIZE = CELL_SIZE_WORLD;
export const EDGE_WIDTH = GRID_CELL_SIZE;
export const EDGE_JOINT_SIZE = EDGE_WIDTH * 1.1;
export const STRUCTURE_COLOR = 0xcccccc;
const EPSILON = 1e-6;
const EDGE_OUTLINE_NAME = 'edge-outline';
const PLACEMENT_EPSILON = CELL_SIZE_WORLD * .01;
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

function placementHitNormal(hit, ray) {
  if (!hit?.face || !hit.object) return null;
  const normal = hit.face.normal.clone().transformDirection(hit.object.matrixWorld);
  if (normal.lengthSq() <= EPSILON) return null;
  normal.normalize();
  // A malformed/reversed mesh can expose its back face. Always move away
  // from the incoming ray so a neighbouring placement cannot enter the mesh.
  if (normal.dot(ray.direction) > 0) normal.negate();
  return normal;
}

function quantizePlacementPoint(point, normal = null) {
  const adjusted = point.clone();
  if (normal) adjusted.addScaledVector(normal, PLACEMENT_EPSILON);
  const gridPoint = quantizeWorldVector(adjusted);
  return gridPoint ? vector(gridPoint) : null;
}

function adjacentPlacementHit(ray, targets, padding = CELL_SIZE_WORLD / 2) {
  let nearest = null;
  for (const target of targets || []) {
    if (!target?.visible) continue;
    const bounds = new THREE.Box3().setFromObject(target);
    if (bounds.isEmpty()) continue;
    const expanded = bounds.clone().expandByScalar(padding);
    const point = ray.intersectBox(expanded, new THREE.Vector3());
    if (!point) continue;
    const distance = point.clone().sub(ray.origin).dot(ray.direction);
    if (distance < -EPSILON || (nearest && distance >= nearest.distance)) continue;
    const closest = bounds.clampPoint(point, new THREE.Vector3());
    const normal = point.clone().sub(closest);
    if (normal.lengthSq() <= EPSILON) continue;
    normal.normalize();
    if (normal.dot(ray.direction) > 0) normal.negate();
    nearest = { point, normal, distance };
  }
  return nearest;
}

// Structural coordinates identify cells, rather than their visible boundary
// lines. Placement follows a real vehicle hit first, then a one-cell expanded
// component envelope, and finally the fixed y=0 XZ work plane.
export function resolvePlacementPoint(pointerRaycaster, targets, workPlane, { adjacentTargets = [], adjacentPadding = CELL_SIZE_WORLD / 2 } = {}) {
  const ray = pointerRaycaster.ray;
  const hit = pointerRaycaster.intersectObjects(targets, true)[0];
  const point = hit && quantizePlacementPoint(hit.point, placementHitNormal(hit, ray));
  if (point) return point;
  const adjacent = adjacentPlacementHit(ray, adjacentTargets, adjacentPadding);
  const adjacentPoint = adjacent && quantizePlacementPoint(adjacent.point, adjacent.normal);
  if (adjacentPoint) return adjacentPoint;
  const planePoint = ray.intersectPlane(workPlane, new THREE.Vector3());
  const planeGridPoint = planePoint && quantizeWorldVector(planePoint);
  return planeGridPoint ? vector(planeGridPoint) : null;
}

export function resolveEdgePoint(ray, frame, { axisSnap = false, node = null, viewNormal = frame.plane.normal } = {}) {
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

export function edgeMeasurements(start, end) {
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

function refreshEdgeOutline(mesh) {
  const outline = mesh.getObjectByName(EDGE_OUTLINE_NAME);
  if (!outline) return;
  outline.geometry.dispose();
  outline.geometry = new THREE.EdgesGeometry(mesh.geometry);
}

function addTriangle(positions, a, b, c) {
  positions.push(...a.toArray(), ...b.toArray(), ...c.toArray());
}

function addQuad(positions, a, b, c, d) {
  addTriangle(positions, a, b, c);
  addTriangle(positions, a, c, d);
}

function addCube(positions, center, halfSize) {
  const corners = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
  ].map(([x, y, z]) => center.clone().add(new THREE.Vector3(x * halfSize, y * halfSize, z * halfSize)));
  for (const [a, b, c, d] of [
    [0, 3, 2, 1], [4, 5, 6, 7],
    [0, 4, 7, 3], [1, 2, 6, 5],
    [0, 1, 5, 4], [3, 7, 6, 2],
  ]) addQuad(positions, corners[a], corners[b], corners[c], corners[d]);
}

function edgeProjectionFrame(direction) {
  const normal = direction.clone().normalize();
  const referenceAxis = AXES.reduce((best, axis) => Math.abs(normal[axis]) < Math.abs(normal[best]) ? axis : best, AXES[0]);
  const reference = new THREE.Vector3(); reference[referenceAxis] = 1;
  const horizontal = reference.addScaledVector(normal, -reference.dot(normal)).normalize();
  const vertical = new THREE.Vector3().crossVectors(normal, horizontal).normalize();
  return { horizontal, vertical };
}

function projectedPoint(point, frame) {
  return { x: point.dot(frame.horizontal), y: point.dot(frame.vertical) };
}

function orderedProjection(points, frame) {
  const center = points.reduce((sum, point) => sum.add(point), new THREE.Vector3()).multiplyScalar(1 / points.length);
  return [...points].sort((a, b) => {
    const first = a.clone().sub(center); const second = b.clone().sub(center);
    return Math.atan2(first.dot(frame.vertical), first.dot(frame.horizontal))
      - Math.atan2(second.dot(frame.vertical), second.dot(frame.horizontal));
  });
}

function cubeCornerOffsets(halfSize) {
  const corners = [];
  for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) {
    corners.push(new THREE.Vector3(x, y, z).multiplyScalar(halfSize));
  }
  return corners;
}

export function edgeConnectionCorners(center, direction, endpointSign = 1, halfSize = EDGE_WIDTH / 2) {
  const delta = vector(direction);
  const activeAxes = AXES.filter(axis => Math.abs(delta[axis]) > EPSILON);
  const frame = edgeProjectionFrame(delta);
  const corners = cubeCornerOffsets(halfSize);
  let selected;
  if (activeAxes.length === 1) {
    const axis = activeAxes[0];
    const facingSign = Math.sign(delta[axis]) * (endpointSign < 0 ? -1 : 1);
    selected = corners.filter(corner => Math.sign(corner[axis]) === facingSign);
  } else {
    selected = corners.filter(corner => {
      const facing = activeAxes.filter(axis => Math.sign(corner[axis]) === Math.sign(delta[axis])).length;
      return facing > 0 && facing < activeAxes.length;
    });
  }
  return orderedProjection(selected, frame).map(corner => vector(center).add(corner));
}

function addOutwardQuad(positions, a, b, c, d, center) {
  const normal = new THREE.Vector3().crossVectors(b.clone().sub(a), c.clone().sub(a));
  const outward = a.clone().add(b).add(c).add(d).multiplyScalar(.25).sub(center);
  if (normal.dot(outward) >= 0) addQuad(positions, a, b, c, d);
  else addQuad(positions, a, d, c, b);
}

function createEdgeGeometry(start, end) {
  const halfSize = EDGE_WIDTH / 2;
  const midpoint = start.clone().add(end).multiplyScalar(.5);
  const localStart = start.clone().sub(midpoint);
  const localEnd = end.clone().sub(midpoint);
  const positions = [];
  addCube(positions, localStart, halfSize);
  addCube(positions, localEnd, halfSize);

  const direction = end.clone().sub(start);
  const startFace = edgeConnectionCorners(localStart, direction, 1, halfSize);
  const endFace = edgeConnectionCorners(localEnd, direction, -1, halfSize);
  if (startFace.length === endFace.length && startFace.some((point, index) => point.distanceToSquared(endFace[index]) > EPSILON * EPSILON)) {
    const bridgeCenter = localStart.clone().add(localEnd).multiplyScalar(.5);
    for (let index = 0; index < startFace.length; index++) {
      const next = (index + 1) % startFace.length;
      addOutwardQuad(positions, startFace[index], endFace[index], endFace[next], startFace[next], bridgeCenter);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return { geometry, midpoint };
}

export function updateEdgeMesh(mesh, start, end) {
  const a = vector(start); const b = vector(end);
  const direction = b.clone().sub(a);
  const length = direction.length();
  if (![...a.toArray(), ...b.toArray()].every(Number.isFinite) || length <= EPSILON) {
    mesh.visible = false;
    return false;
  }
  const { geometry, midpoint } = createEdgeGeometry(a, b);
  mesh.geometry.dispose();
  mesh.geometry = geometry;
  mesh.position.copy(midpoint);
  mesh.quaternion.identity();
  mesh.scale.setScalar(1);
  mesh.visible = true;
  mesh.updateMatrixWorld(true);
  if (mesh.userData.edgeOutlineRequested && !mesh.getObjectByName(EDGE_OUTLINE_NAME)) addEdgeOutline(mesh);
  else refreshEdgeOutline(mesh);
  return true;
}

function addEdgeOutline(mesh) {
  // The persistent preview starts at zero length. Do not pass an empty
  // BufferGeometry to EdgesGeometry; create the outline on its first valid
  // update instead.
  if (!mesh.geometry?.getAttribute('position')) return false;
  const outline = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry),
    new THREE.LineBasicMaterial({ color: 0x17212b, depthTest: true, depthWrite: false }),
  );
  outline.name = EDGE_OUTLINE_NAME;
  outline.renderOrder = 2;
  outline.userData.topologyOutline = true;
  mesh.add(outline);
  return true;
}

export function setEdgeOutline(mesh, visible) {
  mesh.userData.edgeOutlineRequested = Boolean(visible);
  let outline = mesh.getObjectByName(EDGE_OUTLINE_NAME);
  if (!outline && visible) {
    addEdgeOutline(mesh);
    outline = mesh.getObjectByName(EDGE_OUTLINE_NAME);
  }
  if (outline) outline.visible = Boolean(visible);
}

export function createEdgeMesh(start, end, material, { outlined = false } = {}) {
  const mesh = new THREE.Mesh(new THREE.BufferGeometry(), material);
  mesh.userData.edgeOutlineRequested = Boolean(outlined);
  updateEdgeMesh(mesh, start, end);
  return mesh;
}

export function createEdgeJointMesh(point, material, size = EDGE_JOINT_SIZE, { outlined = false } = {}) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
  if (outlined) addEdgeOutline(mesh);
  mesh.position.copy(vector(point));
  mesh.scale.setScalar(size);
  mesh.castShadow = true; mesh.receiveShadow = true;
  return mesh;
}

function plateNormal(points) {
  const normal = new THREE.Vector3();
  for (let first = 1; first < points.length - 1 && normal.lengthSq() <= EPSILON; first++) {
    for (let second = first + 1; second < points.length; second++) {
      normal.copy(points[first]).sub(points[0]).cross(points[second].clone().sub(points[0]));
      if (normal.lengthSq() > EPSILON) return normal.normalize();
    }
  }
  return normal;
}

function planeBasis(points, normal) {
  // Use the first non-zero edge as a stable in-plane axis.  The second axis
  // is chosen so that (u, v) has the same winding as the supplied normal.
  let u = null;
  for (let index = 1; index < points.length; index++) {
    const edge = points[index].clone().sub(points[0]);
    if (edge.lengthSq() > EPSILON) { u = edge.normalize(); break; }
  }
  if (!u) return null;
  const v = normal.clone().cross(u);
  if (v.lengthSq() <= EPSILON) return null;
  return { u, v: v.normalize() };
}

function lineIntersection2d(firstPoint, firstDirection, secondPoint, secondDirection) {
  const denominator = firstDirection.x * secondDirection.y - firstDirection.y * secondDirection.x;
  if (Math.abs(denominator) <= EPSILON) return null;
  const delta = secondPoint.clone().sub(firstPoint);
  const scale = (delta.x * secondDirection.y - delta.y * secondDirection.x) / denominator;
  return firstPoint.clone().addScaledVector(firstDirection, scale);
}

function expandedPlateBoundary(points, windingNormal, halfWidth) {
  const basis = planeBasis(points, windingNormal);
  if (!basis) return [];
  const coordinates = points.map(point => new THREE.Vector2(
    point.dot(basis.u), point.dot(basis.v),
  ));
  let signedArea = 0;
  for (let index = 0; index < coordinates.length; index++) {
    const current = coordinates[index];
    const next = coordinates[(index + 1) % coordinates.length];
    signedArea += current.x * next.y - next.x * current.y;
  }
  if (Math.abs(signedArea) <= EPSILON) return [];
  const winding = signedArea < 0 ? -1 : 1;
  const shiftedLines = coordinates.map((start, index) => {
    const end = coordinates[(index + 1) % coordinates.length];
    const direction = end.clone().sub(start);
    if (direction.lengthSq() <= EPSILON) return null;
    direction.normalize();
    // For a counter-clockwise polygon the outside is the right-hand side;
    // reverse it for the opposite winding.
    const outward = new THREE.Vector2(direction.y, -direction.x).multiplyScalar(winding);
    // The beam profile is an axis-aligned cube. Its support distance along
    // the plane's outward direction is h * (|nx| + |ny| + |nz|), which grows
    // naturally for diagonal beams and matches their projected silhouette.
    const outwardWorld = basis.u.clone().multiplyScalar(outward.x)
      .addScaledVector(basis.v, outward.y);
    const offsetDistance = halfWidth * (Math.abs(outwardWorld.x)
      + Math.abs(outwardWorld.y) + Math.abs(outwardWorld.z));
    const shifted = start.clone().addScaledVector(outward, offsetDistance);
    return { point: shifted, direction, normal: outward, offsetDistance };
  });
  if (shiftedLines.some(line => !line)) return [];

  const result = [];
  for (let index = 0; index < shiftedLines.length; index++) {
    const previous = shiftedLines[(index + shiftedLines.length - 1) % shiftedLines.length];
    const current = shiftedLines[index];
    const intersection = lineIntersection2d(previous.point, previous.direction, current.point, current.direction);
    const finiteIntersection = intersection && Number.isFinite(intersection.x) && Number.isFinite(intersection.y);
    // A full offset-line miter tends towards infinity at an acute corner.
    // That creates a panel spike outside the supporting beam cubes. Keep a
    // normal square-corner miter, but turn excessively long joins into a
    // bevel made from the two actual beam-strip ends.
    const maximumMiter = Math.max(previous.offsetDistance, current.offsetDistance) * Math.SQRT2 + EPSILON;
    const useMiter = finiteIntersection && intersection.distanceTo(coordinates[index]) <= maximumMiter;
    const worldPoint = coordinate => points[index].clone()
      .addScaledVector(basis.u, coordinate.x - coordinates[index].x)
      .addScaledVector(basis.v, coordinate.y - coordinates[index].y);
    if (useMiter) { result.push(worldPoint(intersection)); continue; }
    const previousLength = coordinates[index].distanceTo(coordinates[(index + coordinates.length - 1) % coordinates.length]);
    result.push(worldPoint(previous.point.clone().addScaledVector(previous.direction, previousLength)));
    result.push(worldPoint(current.point));
  }
  return result;
}

export function plateSurfaceBoundary(nodeIds, positions, normalOffset = EDGE_WIDTH / 2) {
  const points = nodeIds.map(id => positions.get(id));
  if (points.some(point => !point)) return [];
  const windingNormal = plateNormal(points);
  if (windingNormal.lengthSq() <= EPSILON) return [];
  // A plate occupies the beam envelope, not just the inner corners of the
  // node cubes. Expand the centre-line closure by half the beam width in its
  // own plane, then apply the signed normal offset as a separate depth layer.
  const boundary = expandedPlateBoundary(points, windingNormal, EDGE_WIDTH / 2);
  return boundary.map(point => point.addScaledVector(windingNormal, normalOffset));
}

export function plateSurfaceVertices(nodeIds, positions, normalOffset = EDGE_WIDTH / 2) {
  const corners = plateSurfaceBoundary(nodeIds, positions, normalOffset);
  const vertices = [];
  for (let index = 1; index < corners.length - 1; index++) {
    for (const point of [corners[0], corners[index], corners[index + 1]]) vertices.push(...point.toArray());
  }
  return vertices;
}

export function cameraFacingPlateOffset(nodeIds, positions, cameraPosition, magnitude = EDGE_WIDTH / 2) {
  const points = nodeIds.map(id => positions.get(id));
  if (points.some(point => !point)) return magnitude;
  const normal = plateNormal(points);
  if (normal.lengthSq() <= EPSILON) return magnitude;
  const center = points.reduce((sum, point) => sum.add(point), new THREE.Vector3()).multiplyScalar(1 / points.length);
  return normal.dot(vector(cameraPosition).sub(center)) < 0 ? -Math.abs(magnitude) : Math.abs(magnitude);
}

// Three.js stores the face normal with the geometry's front winding. A ray
// travelling against that normal sees the front colour; travelling with it
// sees the back colour.
export function rayFacingPlateSide(faceNormal, matrixWorld, rayDirection) {
  if (!faceNormal || !matrixWorld || !rayDirection) return 'front';
  const normal = faceNormal.clone().transformDirection(matrixWorld);
  return normal.lengthSq() > EPSILON && normal.dot(rayDirection) > 0 ? 'back' : 'front';
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
export function createConnectionRoute(points, material, { radius = .015, radialSegments = 8, jointUserData = null } = {}) {
  const route = new THREE.Group();
  const path = points.map(point => vector(point));
  for (let index = 1; index < path.length; index++) route.add(routeSegment(path[index - 1], path[index], material, radius, radialSegments));
  for (let index = 1; index < path.length - 1; index++) {
    const joint = new THREE.Mesh(new THREE.SphereGeometry(radius, radialSegments, Math.max(4, Math.ceil(radialSegments / 2))), material);
    joint.position.copy(path[index]); joint.castShadow = true; joint.receiveShadow = true;
    if (jointUserData) Object.assign(joint.userData, jointUserData(index - 1) || {});
    route.add(joint);
  }
  return route;
}
