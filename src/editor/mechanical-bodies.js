// Rigid ownership for physical-mate export. Structural surfaces and topology
// join bodies; mating anchors and signal cables never weld the two sides.
import { CELL_SIZE_WORLD } from './grid.js';
import { mechanicalComponentDefinition, mechanicalMateError } from './mechanical-connections.js';
import { componentFrame, vectorArray, transformVector, addVectors, subtractVectors, dotVectors } from './component-frame.js';

const EPSILON = 1e-5;
const axes = ['x', 'y', 'z'];
const directions = [[-1, 0, 0], [1, 0, 0], [0, -1, 0], [0, 1, 0], [0, 0, -1], [0, 0, 1]];
const scale = (v, amount) => v.map(value => value * amount);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

function structuralFaces(object, definitions) {
  const definition = mechanicalComponentDefinition(object, definitions);
  if (!definition) return [];
  const frame = componentFrame(object);
  return (definition.surfaces || []).flatMap(surface => {
    if (surface.type !== undefined && surface.type !== 'port') return [];
    const dir = directions[surface.dir ?? 0];
    if (!dir) return [];
    const axis = dir.findIndex(value => value !== 0);
    const tangent = axis === 0 ? [2, 1] : axis === 1 ? [0, 2] : [0, 1];
    const min = [...(surface.pos || [0, 0, 0])]; const max = [...min];
    tangent.forEach((value, index) => { max[value] += Math.max(1, surface.size?.[index] ?? 1) - 1; });
    for (let index = 0; index < 3; index++) {
      const extension = object.nativeExtension?.[index] ?? 0;
      const center = definition.center_stretch?.[index] ?? 0;
      if (min[index] > center) { min[index] += extension; max[index] += extension; }
      else if (tangent.includes(index) && max[index] >= center && ['stretch', 'tile'].includes(definition['mode_' + axes[index]])) max[index] += extension;
    }
    min[axis] += dir[axis] * .5; max[axis] = min[axis];
    tangent.forEach(index => { min[index] -= .5; max[index] += .5; });
    if (min.some((value, index) => !Number.isFinite(value) || !Number.isFinite(max[index]) || value > max[index])) return [];
    const normal = transformVector(frame.basis, dir);
    const corners = [[0, 0], [1, 0], [1, 1], [0, 1]].map(bits => {
      const local = [...min]; tangent.forEach((index, bit) => { local[index] = bits[bit] ? max[index] : min[index]; });
      return frame.point(local);
    });
    const center = frame.point(min.map((value, index) => (value + max[index]) / 2));
    return [{ object, frame, min, max, normal, corners, center, tangent }];
  });
}

function segmentTouchesFace(face, a, b) {
  // The structure's axis-aligned node cube contributes a half-cell support
  // offset. This also handles the game's non-axis-aligned mounting grids.
  const support = face.normal.map(value => Math.abs(value) < EPSILON ? 0 : Math.sign(value) * CELL_SIZE_WORLD / 2);
  const start = face.frame.local(subtractVectors(a, support));
  const end = face.frame.local(subtractVectors(b, support));
  let lower = 0; let upper = 1;
  for (let index = 0; index < 3; index++) {
    const delta = end[index] - start[index];
    if (Math.abs(delta) < EPSILON) {
      if (start[index] < face.min[index] - EPSILON || start[index] > face.max[index] + EPSILON) return false;
    } else {
      const limits = [(face.min[index] - start[index]) / delta, (face.max[index] - start[index]) / delta].sort((x, y) => x - y);
      lower = Math.max(lower, limits[0]); upper = Math.min(upper, limits[1]);
      if (lower > upper + EPSILON) return false;
    }
  }
  return true;
}

function facesTouch(a, b) {
  if (dotVectors(a.normal, b.normal) > -1 + EPSILON || Math.abs(dotVectors(subtractVectors(a.center, b.center), a.normal)) > CELL_SIZE_WORLD * EPSILON) return false;
  // Coplanar rectangle SAT, including rotated faces; no render AABB welding.
  for (const face of [a, b]) for (const axis of face.tangent) {
    const unit = transformVector(face.frame.basis, [0, 1, 2].map(index => index === axis ? 1 : 0));
    const left = a.corners.map(point => dotVectors(point, unit)); const right = b.corners.map(point => dotVectors(point, unit));
    if (Math.min(...left) > Math.max(...right) + EPSILON || Math.min(...right) > Math.max(...left) + EPSILON) return false;
  }
  return true;
}

function faceTouchesPlate(face, points) {
  if (points.length < 3) return false;
  const point = addVectors(face.center, face.normal.map(value => Math.abs(value) < EPSILON ? 0 : Math.sign(value) * CELL_SIZE_WORLD / 2));
  const origin = points[0]; let normal;
  for (let index = 1; index + 1 < points.length; index++) {
    const candidate = cross(subtractVectors(points[index], origin), subtractVectors(points[index + 1], origin));
    const length = Math.hypot(...candidate);
    if (length > 1e-10) { normal = scale(candidate, 1 / length); break; }
  }
  if (!normal || Math.abs(dotVectors(normal, face.normal)) < 1 - EPSILON || Math.abs(dotVectors(normal, subtractVectors(point, origin))) > CELL_SIZE_WORLD * EPSILON) return false;
  const axis = normal.map(Math.abs).indexOf(Math.max(...normal.map(Math.abs)));
  const [u, v] = [0, 1, 2].filter(index => index !== axis);
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[j]; const b = points[i];
    const delta = subtractVectors(b, a); const length = dotVectors(delta, delta);
    const t = length ? Math.max(0, Math.min(1, dotVectors(subtractVectors(point, a), delta) / length)) : 0;
    if (Math.hypot(...subtractVectors(point, addVectors(a, scale(delta, t)))) < CELL_SIZE_WORLD * EPSILON) return true;
    if ((a[v] > point[v]) !== (b[v] > point[v]) && point[u] < (b[u] - a[u]) * (point[v] - a[v]) / (b[v] - a[v]) + a[u]) inside = !inside;
  }
  return inside;
}

export function partitionMechanicalBodies(document, connections, definitions = new Map()) {
  const topology = document.topology || {};
  const parent = new Map();
  const key = (kind, id) => kind + ':' + id;
  const root = id => {
    if (!parent.has(id)) parent.set(id, id);
    let current = id;
    while (parent.get(current) !== current) current = parent.get(current);
    while (parent.get(id) !== id) { const next = parent.get(id); parent.set(id, current); id = next; }
    return current;
  };
  const join = (a, b) => parent.set(root(b), root(a));
  const nodes = new Map((topology.nodes || []).map(node => [node.id, vectorArray(node.position)]));
  const referenced = new Set();
  for (const edge of topology.edges || []) {
    join(key('node', edge.a), key('node', edge.b)); referenced.add(edge.a); referenced.add(edge.b);
  }
  for (const plate of topology.plates || []) for (const id of plate.nodeIds) { join(key('node', plate.nodeIds[0]), key('node', id)); referenced.add(id); }
  for (const object of document.objects) root(key('component', object.id));
  const faces = document.objects.flatMap(object => structuralFaces(object, definitions));
  for (const face of faces) {
    const id = key('component', face.object.id);
    for (const nodeId of referenced) if (nodes.has(nodeId) && segmentTouchesFace(face, nodes.get(nodeId), nodes.get(nodeId))) join(id, key('node', nodeId));
    for (const edge of topology.edges || []) if (nodes.has(edge.a) && nodes.has(edge.b) && segmentTouchesFace(face, nodes.get(edge.a), nodes.get(edge.b))) join(id, key('node', edge.a));
    for (const plate of topology.plates || []) if (faceTouchesPlate(face, plate.nodeIds.map(id => nodes.get(id)).filter(Boolean))) join(id, key('node', plate.nodeIds[0]));
  }
  const mates = new Set(connections.map(connection => [connection.from, connection.to].sort().join('|')));
  for (let i = 0; i < faces.length; i++) for (let j = i + 1; j < faces.length; j++) {
    const a = faces[i]; const b = faces[j];
    if (a.object.id === b.object.id || mates.has([a.object.id, b.object.id].sort().join('|'))) continue;
    if (root(key('component', a.object.id)) !== root(key('component', b.object.id)) && facesTouch(a, b)) join(key('component', a.object.id), key('component', b.object.id));
  }
  const groups = new Map();
  const group = id => { const value = root(id); if (!groups.has(value)) groups.set(value, { components: [], nodes: [] }); return groups.get(value); };
  for (const nodeId of referenced) group(key('node', nodeId)).nodes.push(nodeId);
  for (const object of document.objects) group(key('component', object.id)).components.push(object.id);
  const main = [...groups].sort((a, b) => b[1].nodes.length + b[1].components.length - a[1].nodes.length - a[1].components.length)[0]?.[0];
  const activeRoots = new Set([main]);
  for (const connection of connections) {
    const a = root(key('component', connection.from)); const b = root(key('component', connection.to));
    if (a === b) throw mechanicalMateError('same-body', 'Physical mate endpoints belong to the same rigid structure', connection.from + ' / ' + connection.to);
    activeRoots.add(a); activeRoots.add(b);
  }
  // Unrelated subgrids retain the existing single-vehicle export convention.
  // Only subgrids participating in an actual mate introduce another body.
  const bodies = [...activeRoots].map(() => ({ components: [], nodes: [] }));
  const indices = new Map([...activeRoots].map((id, index) => [id, index]));
  for (const [id, value] of groups) {
    const body = bodies[indices.get(id) ?? 0]; body.components.push(...value.components); body.nodes.push(...value.nodes);
  }
  const componentBody = new Map(bodies.flatMap((body, index) => body.components.map(id => [id, index])));
  const nodeBody = new Map(bodies.flatMap((body, index) => body.nodes.map(id => [id, index])));
  for (const link of topology.links || []) if (componentBody.has(link.from?.componentId) && componentBody.has(link.to?.componentId) && componentBody.get(link.from.componentId) !== componentBody.get(link.to.componentId)) throw mechanicalMateError('cross-body-link', 'A network link crosses physical bodies; use a supported native interface', link.id);
  return { bodies, componentBody, nodeBody };
}
