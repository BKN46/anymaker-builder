import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as THREE from 'three';
import { inclinedPanelFixture } from './inclined-fixtures.js';
import { resolveInclinedPlacement } from '../src/editor/inclined-placement.js';
import { createPlacementPicker } from '../src/editor/placement-picking.js';
import { plateSurfaceVertices } from '../src/editor/construction-view.js';
import { consistentNativeGrid } from '../src/native/grid-frame.js';
import { validateDocument, History } from '../src/editor/document.js';
import { parseNativePair, toNativePairFromEditor } from '../src/native/anymaker-data.js';
import { toEditorDocument, fromEditorDocument } from '../src/editor/model.js';
import { copyObjects, moveObjects } from '../src/editor/operations.js';

const close = (a, b, tolerance = 1e-8) => assert.ok(Math.abs(a - b) < tolerance, a + ' != ' + b);
const definition = JSON.parse(readFileSync('public/data/definitions/circular_dial_a.json'));
const definitions = new Map([[definition.id, definition]]);

function surfaceScene(document = inclinedPanelFixture(), normal = new THREE.Vector3(0, 1, -2).normalize()) {
  const plate = document.topology.plates[0];
  const positions = new Map(document.topology.nodes.map(node => [node.id, new THREE.Vector3(...Object.values(node.position))]));
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(plateSurfaceVertices(plate.nodeIds, positions, plate), 3)); geometry.computeVertexNormals();
  const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
  mesh.userData = { topology: 'plate', plateId: plate.id }; mesh.updateMatrixWorld(true);
  const center = [...positions.values()].reduce((sum, point) => sum.add(point), new THREE.Vector3()).multiplyScalar(1 / positions.size);
  const ray = new THREE.Raycaster(center.addScaledVector(normal, 2), normal.clone().negate());
  return { mesh, normal, ray, picker: createPlacementPicker(), document, dispose() { geometry.dispose(); mesh.material.dispose(); } };
}

test('inclined mounting grid reproduces the native dashboard origin with floor division', () => {
  for (const origin of [[64, 24, 240], [65, 28, 242], [70, 26, 241]]) {
    assert.deepEqual(consistentNativeGrid(origin, [0, 2, -4]), { origin: [0, -90, 183], dir: [0, 1, -2] });
  }
  assert.deepEqual(consistentNativeGrid([-64, -24, -240], [0, 1, -2]), { origin: [0, 92, -182], dir: [0, 1, -2] });
});

test('inclined placement aligns local axes, snaps plane cells and round-trips its grid', () => {
  const scene = surfaceScene();
  try {
    for (const angle of [0, Math.PI / 2, Math.PI]) {
      const result = resolveInclinedPlacement(scene.ray, [scene.mesh], { picker: scene.picker, topology: scene.document.topology, definition, rotation: { x: 0, y: angle, z: 0 } });
      assert.ok(result); assert.deepEqual(result.surfaceMount.dir, [0, 1, -2]);
      assert.ok(result.surfaceMount.position.every(Number.isInteger));
      const up = new THREE.Vector3(0, 1, 0).applyEuler(new THREE.Euler(...Object.values(result.rotation)));
      close(up.dot(scene.normal), 1);
      close(result.point.dot(scene.normal), .04 * (Math.abs(scene.normal.y) + Math.abs(scene.normal.z)) + .04);
      const object = { id: 'gauge', type: definition.id, position: { x: result.point.x, y: result.point.y, z: result.point.z }, rotation: result.rotation, surfaceMount: result.surfaceMount, scale: { x: 1, y: 1, z: 1 } };
      const document = { ...scene.document, objects: [object] };
      const validated = validateDocument(document, definitions);
      assert.deepEqual(validated.objects[0].surfaceMount, result.surfaceMount);
      assert.deepEqual(toEditorDocument(fromEditorDocument(document)).objects[0].surfaceMount, result.surfaceMount);
      const pair = toNativePairFromEditor(validated);
      assert.equal(pair.data.vehicles.vehicles[0].grids.length, 2);
      const grid = pair.data.vehicles.vehicles[0].grids[1];
      assert.deepEqual(grid.dir, [0, 1, -2]); assert.ok(grid.origin.every(Number.isInteger));
      assert.ok(grid.components[0].rot.every(Number.isInteger));
      const restored = toEditorDocument(parseNativePair(pair.data, pair.meta)).objects[0];
      for (const axis of ['x', 'y', 'z']) close(restored.position[axis], object.position[axis]);
      const history = new History(validated); history.commit({ ...validated, objects: [] });
      assert.deepEqual(history.peekUndo().objects[0].surfaceMount, object.surfaceMount);
      const shifted = moveObjects([object], ['gauge'], { x: .16, y: 0, z: 0 }).objects[0];
      const shiftedGrid = toNativePairFromEditor({ ...document, objects: [shifted] }).data.vehicles.vehicles[0].grids[1];
      close(shiftedGrid.origin[0], grid.origin[0] - 2);
      const copied = copyObjects([object], ['gauge'], { x: .16, y: 0, z: 0 }).objects[1];
      assert.deepEqual(copied.surfaceMount, object.surfaceMount); assert.notEqual(copied.surfaceMount, object.surfaceMount);
    }
  } finally { scene.dispose(); }
});

test('inclined placement excludes flat faces, component meshes and blocked panels', () => {
  const scene = surfaceScene();
  try {
    scene.mesh.userData.topology = 'edge';
    assert.equal(resolveInclinedPlacement(scene.ray, [scene.mesh], { picker: scene.picker, topology: scene.document.topology }), null);
    scene.mesh.userData.topology = 'plate';
    const flat = structuredClone(scene.document); flat.topology.nodes.forEach(node => { node.position.y = 0; });
    assert.equal(resolveInclinedPlacement(scene.ray, [scene.mesh], { picker: scene.picker, topology: flat.topology }), null);
    scene.mesh.visible = false;
    assert.equal(resolveInclinedPlacement(scene.ray, [scene.mesh], { picker: scene.picker, topology: scene.document.topology }), null);
  } finally { scene.dispose(); }
});

test('inclined placement handles panel backs and three-axis plane normals', () => {
  const diagonal = inclinedPanelFixture();
  const coordinates = [[0, 0, 0], [8, -4, 0], [11, 2, -5], [3, 6, -5]];
  diagonal.topology.nodes.forEach((node, i) => {
    const [x, y, z] = coordinates[i]; node.position = { x: -x * .08, y: y * .08, z: z * .08 };
  });
  const normal = new THREE.Vector3(-1, 2, 3).normalize();
  diagonal.topology.plates[0].surfaceDirection = { x: normal.x, y: normal.y, z: normal.z };
  for (const [document, direction, nativeDirection] of [[inclinedPanelFixture(), new THREE.Vector3(0, -1, 2).normalize(), [0, -1, 2]], [diagonal, normal, [1, 2, 3]]]) {
    const scene = surfaceScene(document, direction);
    try {
      const result = resolveInclinedPlacement(scene.ray, [scene.mesh], { picker: scene.picker, topology: document.topology, definition });
      assert.ok(result); assert.deepEqual(result.surfaceMount.dir.map(value => value || 0), nativeDirection);
      const up = new THREE.Vector3(0, 1, 0).applyEuler(new THREE.Euler(...Object.values(result.rotation)));
      close(up.dot(direction), 1);
      const object = { id: 'diagonal-gauge', type: definition.id, position: { x: result.point.x, y: result.point.y, z: result.point.z }, rotation: result.rotation, surfaceMount: result.surfaceMount, scale: { x: 1, y: 1, z: 1 } };
      const pair = toNativePairFromEditor({ ...document, objects: [object] });
      const restored = toEditorDocument(parseNativePair(pair.data, pair.meta)).objects[0];
      for (const axis of ['x', 'y', 'z']) close(restored.position[axis], object.position[axis]);
    } finally { scene.dispose(); }
  }
});

test('dashboard sample preserves all five native local rotations and inclined grid on export', () => {
  const data = JSON.parse(readFileSync('test-vehicle/vehicle.data'));
  const source = data.vehicles.vehicles.find(vehicle => vehicle.id === 553).grids[1];
  assert.deepEqual(source.origin, [0, -90, 183]); assert.deepEqual(source.dir, [0, 1, -2]); assert.equal(source.components.length, 5);
  const isolated = { definitions: data.definitions, vehicles: { vehicles: [{ id: 553, grids: [source] }] } };
  const document = toEditorDocument(parseNativePair(isolated, {}));
  const pair = toNativePairFromEditor(document);
  const grid = pair.data.vehicles.vehicles[0].grids[1];
  assert.deepEqual(grid.origin, source.origin); assert.deepEqual(grid.dir, source.dir);
  for (let i = 0; i < 5; i++) {
    assert.deepEqual(grid.components[i].pos, source.components[i].pos);
    assert.deepEqual(grid.components[i].rot.map(value => value || 0), source.components[i].rot);
  }
  const restored = toEditorDocument(parseNativePair(pair.data, pair.meta));
  for (let i = 0; i < 5; i++) for (const axis of ['x', 'y', 'z']) close(restored.objects[i].position[axis], document.objects[i].position[axis]);
});

test('inclined mounting metadata rejects malformed directions and off-grid native export', () => {
  const scene = surfaceScene();
  try {
    const result = resolveInclinedPlacement(scene.ray, [scene.mesh], { picker: scene.picker, topology: scene.document.topology, definition });
    const object = { id: 'gauge', type: definition.id, position: { x: result.point.x, y: result.point.y, z: result.point.z }, rotation: result.rotation, surfaceMount: result.surfaceMount, scale: { x: 1, y: 1, z: 1 } };
    for (const dir of [[0, 0, 0], [0, 1, 0], [0, .5, 1], [NaN, 1, 2]]) assert.throws(() => validateDocument({ ...scene.document, objects: [{ ...object, surfaceMount: { ...object.surfaceMount, dir } }] }, definitions), /斜面安装/);
    assert.throws(() => toNativePairFromEditor({ ...scene.document, objects: [{ ...object, position: { ...object.position, x: object.position.x + .01 } }] }), /整格位移/);
    assert.throws(() => toNativePairFromEditor({ ...scene.document, objects: [{ ...object, rotation: { ...object.rotation, y: .3 } }] }), /90°/);
  } finally { scene.dispose(); }
});
