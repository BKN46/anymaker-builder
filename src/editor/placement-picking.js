import * as THREE from 'three';

// Placement repeatedly queries the same static geometry while the pointer
// moves. Discard these weak caches whenever an editor operation changes it.
export function createPlacementPicker() {
  let entries = new WeakMap();
  const point = new THREE.Vector3();
  const hits = [];

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
      cached.meshes.push({ mesh, bounds });
    });
    entries.set(target, cached);
    return cached;
  }

  function firstHit(raycaster, targets) {
    const candidates = [];
    for (const target of targets) {
      if (!target.visible) continue;
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

  return { firstHit, bounds: target => entry(target).bounds, invalidate() { entries = new WeakMap(); } };
}

export function createProjectedNodePicker() {
  let previousNodes = null;
  let previousView = '';
  let projected = [];
  const point = new THREE.Vector3();
  return {
    invalidate() { previousNodes = null; },
    pick(nodes, camera, pointer, width, height, maxPixels) {
      const view = [...camera.matrixWorld.elements, ...camera.projectionMatrix.elements, width, height].join(',');
      if (nodes !== previousNodes || view !== previousView) {
        previousNodes = nodes; previousView = view;
        projected = [];
        for (const node of nodes) {
          point.set(node.position.x, node.position.y, node.position.z);
          const depth = point.distanceToSquared(camera.position);
          point.project(camera);
          if (point.z < -1 || point.z > 1) continue;
          projected.push({ id: node.id, x: point.x * width / 2, y: point.y * height / 2, depth });
        }
      }
      const x = pointer.x * width / 2; const y = pointer.y * height / 2;
      let result = null; let best = maxPixels * maxPixels; let nearest = Infinity;
      for (const node of projected) {
        const distance = (node.x - x) ** 2 + (node.y - y) ** 2;
        if (distance < best || (distance === best && node.depth < nearest)) {
          result = node.id; best = distance; nearest = node.depth;
        }
      }
      return result;
    },
  };
}
