import * as THREE from 'three';

// Placement repeatedly queries the same static geometry while the pointer
// moves. Discard these weak caches whenever an editor operation changes it.
export function createPlacementPicker() {
  let entries = new WeakMap();
  const point = new THREE.Vector3();
  const hits = [];
  const expanded = new THREE.Box3();
  const localRay = new THREE.Ray();
  const localPoint = new THREE.Vector3();
  const closest = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const visibilityRaycaster = new THREE.Raycaster();
  const projectedPoint = new THREE.Vector3();
  const worldPoint = new THREE.Vector3();

  function entry(target) {
    let cached = entries.get(target);
    if (cached) return cached;
    target.updateWorldMatrix(true, true);
    cached = { bounds: new THREE.Box3(), meshes: [] };
    target.traverseVisible(mesh => {
      // Outlines, rulers and other line helpers are not solid hit surfaces.
      if (!mesh.isMesh) return;
      if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
      const bounds = mesh.geometry.boundingBox.clone().applyMatrix4(mesh.matrixWorld);
      if (bounds.isEmpty()) return;
      cached.bounds.union(bounds);
      const inverse = mesh.matrixWorld.clone().invert();
      const elements = inverse.elements;
      // World padding projected onto each local axis also handles nonuniform
      // scale. Keep the oriented box instead of filling its world-AABB corners.
      const paddingScale = new THREE.Vector3(
        Math.hypot(elements[0], elements[4], elements[8]),
        Math.hypot(elements[1], elements[5], elements[9]),
        Math.hypot(elements[2], elements[6], elements[10]),
      );
      cached.meshes.push({ mesh, bounds, inverse, paddingScale, normalMatrix: new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld) });
    });
    entries.set(target, cached);
    return cached;
  }

  function firstHit(raycaster, targets, ignoreTarget = null) {
    const candidates = [];
    for (const target of targets) {
      if (!target.visible || ignoreTarget?.(target)) continue;
      const cached = entry(target);
      if (!raycaster.ray.intersectsBox(cached.bounds)) continue;
      for (const { mesh, bounds } of cached.meshes) {
        if (!mesh.visible || !raycaster.ray.intersectBox(bounds, point)) continue;
        // An origin inside a bound has a zero lower distance, not the exit
        // distance returned by intersectBox. It can contain the nearest hit.
        const distance = bounds.containsPoint(raycaster.ray.origin) ? 0 : point.distanceTo(raycaster.ray.origin);
        if (distance <= raycaster.far) candidates.push({ mesh, distance });
      }
    }
    candidates.sort((a, b) => a.distance - b.distance);
    let nearest = null;
    for (const candidate of candidates) {
      if (nearest && candidate.distance > nearest.distance) break;
      hits.length = 0;
      raycaster.intersectObject(candidate.mesh, false, hits);
      if (hits[0] && (!nearest || hits[0].distance < nearest.distance)) nearest = hits[0];
    }
    hits.length = 0;
    return nearest;
  }

  function adjacentHit(raycaster, targets, padding) {
    if (!Number.isFinite(padding) || padding <= 0) return null;
    let nearest = null;
    for (const target of targets) {
      if (!target.visible) continue;
      const cached = entry(target);
      if (!raycaster.ray.intersectsBox(expanded.copy(cached.bounds).expandByScalar(padding))) continue;
      for (const record of cached.meshes) {
        const { mesh, bounds, inverse, paddingScale, normalMatrix } = record;
        if (!mesh.visible || !mesh.layers.test(raycaster.layers) || !raycaster.ray.intersectsBox(expanded.copy(bounds).expandByScalar(padding))) continue;
        localRay.copy(raycaster.ray).applyMatrix4(inverse);
        expanded.copy(mesh.geometry.boundingBox);
        // A missed triangle inside its own envelope is a hole, not a nearby
        // outside face. Do not snap to the far exit of that envelope.
        if (expanded.containsPoint(localRay.origin)) continue;
        expanded.expandByVector(closest.copy(paddingScale).multiplyScalar(padding));
        if (!localRay.intersectBox(expanded, localPoint)) continue;
        point.copy(localPoint).applyMatrix4(mesh.matrixWorld);
        const distance = point.distanceTo(raycaster.ray.origin);
        if (distance < raycaster.near || distance > raycaster.far || (nearest && distance >= nearest.distance)) continue;
        mesh.geometry.boundingBox.clampPoint(localPoint, closest);
        normal.copy(localPoint).sub(closest).applyMatrix3(normalMatrix).normalize();
        if (normal.lengthSq() < 1e-12 || normal.dot(raycaster.ray.direction) > 1e-6) continue;
        nearest = { point: closest.clone().applyMatrix4(mesh.matrixWorld), normal: normal.clone(), distance, object: mesh };
      }
    }
    return nearest;
  }

  function pointVisible(position, camera, targets, tolerance = 0, ignoreTarget = null) {
    worldPoint.set(position.x, position.y, position.z);
    projectedPoint.copy(worldPoint).project(camera);
    if (projectedPoint.z < -1 || projectedPoint.z > 1) return false;
    visibilityRaycaster.setFromCamera(projectedPoint, camera);
    const distance = worldPoint.sub(visibilityRaycaster.ray.origin).dot(visibilityRaycaster.ray.direction);
    if (distance < 0) return false;
    // The candidate occupies an axis-aligned node cube, not a sphere. Its
    // near face is farther from the centre along an oblique viewing ray.
    // Stop at that face so the node's own beam cap cannot occlude it.
    const direction = visibilityRaycaster.ray.direction;
    const cubeEntry = tolerance / Math.max(Math.abs(direction.x), Math.abs(direction.y), Math.abs(direction.z));
    visibilityRaycaster.far = Math.max(0, distance - cubeEntry - 1e-6);
    return !firstHit(visibilityRaycaster, targets, ignoreTarget);
  }

  return { firstHit, adjacentHit, pointVisible, bounds: target => entry(target).bounds, invalidate() { entries = new WeakMap(); } };
}

export function createProjectedNodePicker() {
  let previousNodes = null;
  let previousView = '';
  let projected = [];
  const point = new THREE.Vector3();
  return {
    invalidate() { previousNodes = null; },
    pick(nodes, camera, pointer, width, height, maxPixels, accept = null) {
      const view = [...camera.matrixWorld.elements, ...camera.projectionMatrix.elements, width, height].join(',');
      if (nodes !== previousNodes || view !== previousView) {
        previousNodes = nodes; previousView = view;
        projected = [];
        for (const node of nodes) {
          point.set(node.position.x, node.position.y, node.position.z);
          const position = { x: point.x, y: point.y, z: point.z };
          const depth = point.distanceToSquared(camera.position);
          point.project(camera);
          if (point.z < -1 || point.z > 1) continue;
          projected.push({ id: node.id, position, x: point.x * width / 2, y: point.y * height / 2, depth });
        }
      }
      const x = pointer.x * width / 2; const y = pointer.y * height / 2;
      let result = null; let best = maxPixels * maxPixels; let nearest = Infinity;
      for (const node of projected) {
        const distance = (node.x - x) ** 2 + (node.y - y) ** 2;
        if (distance < best || (distance === best && node.depth < nearest)) {
          if (accept && !accept(node)) continue;
          result = node.id; best = distance; nearest = node.depth;
        }
      }
      return result;
    },
  };
}
