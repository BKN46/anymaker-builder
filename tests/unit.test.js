import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { meshFixture } from './fixtures.js';
import { parseMesh } from '../src/assets/mesh.js';
import { History, project, validateDocument, migrateDocument, toIntermediateXml } from '../src/editor/document.js';
import { copyObjects, mirrorObjects, moveObjects, removeObjects, splitGrid, mergeGrids, gridIds } from '../src/editor/operations.js';
import { Project, Vehicle, Grid, Component, Node, Edge, Plate, Link, fromEditorDocument, toEditorDocument, toEditorTopology, validateProject } from '../src/editor/model.js';
import { parseNativePair, nativeStats, toNativeData, toNativePair, verifyNativePairRoundTrip } from '../src/native/anymaker-data.js';
import { createNode, moveNode, moveNodeAndMerge, mergeNodes, removeNode, removeEdge, removePlate, createEdge, createBeam, splitEdge, createPlate, createPlateFromEdges, createGlassPlateFromEdges, triangulatePlate, validateTopologyState } from '../src/editor/topology.js';
import { LINK_COLORS, LINK_KINDS, createLink, removeLink, validateLinks } from '../src/editor/connections.js';
import * as THREE from 'three';
import { reflectGeometry } from '../src/assets/geometry-ops.js';
import { GRID_SIZE, GRID_DIVISIONS, cameraBuildFrame, projectBuildPoint, resolveBeamPoint, resolvePlacementPoint, beamMeasurements, createBeamMesh, createBeamJointMesh, createConnectionRoute, updateBeamMesh, setBeamOutline } from '../src/editor/construction-view.js';
import { CELL_SIZE_WORLD, CELL_SIZE_CM, assertGridVector, cellToWorld, quantizeWorldVector, worldToCell } from '../src/editor/grid.js';
import { categoryInfo } from '../src/catalog/category-icons.js';
import { normalizeSettings, createLocalStore, AUTOSAVE_INTERVAL } from '../src/editor/local-storage.js';
import { applyGridStyle, orientCamera, VIEW_DIRECTIONS } from '../src/editor/view-settings.js';
import { applyMeshTransform } from '../src/assets/published-library.js';
import { t, setLocale, addMessages } from '../src/i18n.js';

test('reference vehicle input files match the registered rendering baseline', () => {
  const baseline = JSON.parse(readFileSync(new URL('../doc/evidence/vehicle-reference.json', import.meta.url)));
  for (const file of baseline.files) {
    assert.match(file.path, /^test-vehicle\/vehicle\.(data|meta|png)$/);
    const bytes = readFileSync(new URL('../' + file.path, import.meta.url));
    assert.equal(bytes.length, file.bytes);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), file.sha256);
  }
  const data = JSON.parse(readFileSync(new URL('../test-vehicle/vehicle.data', import.meta.url)));
  assert.equal(data.definitions.components.length, baseline.definitions);
  assert.deepEqual(data.vehicles.vehicles.map(v => ({ id: v.id, grids: v.grids.length, components: v.grids.reduce((n, g) => n + g.components.length, 0), nodes: v.nodes.length, edges: v.edges.length, plates: v.plates.length })), baseline.vehicles);
  assert.equal(baseline.status, 'reference-registered-not-visually-matched');
});

test('paired native source remains value-for-value intact before editor changes', () => {
  const data = JSON.parse(readFileSync(new URL('../test-vehicle/vehicle.data', import.meta.url), 'utf8'));
  const meta = JSON.parse(readFileSync(new URL('../test-vehicle/vehicle.meta', import.meta.url), 'utf8'));
  const model = parseNativePair(data, meta);
  assert.deepEqual(toNativePair(model), { data, meta });
  assert.deepEqual(verifyNativePairRoundTrip(data, meta), { data: [], meta: [] });
});

test('reference primary vehicle converts every renderable record into an editor document', () => {
  const data = readFileSync(new URL('../test-vehicle/vehicle.data', import.meta.url), 'utf8');
  const meta = readFileSync(new URL('../test-vehicle/vehicle.meta', import.meta.url), 'utf8');
  const model = parseNativePair(data, meta);
  const document = toEditorDocument(model, { vehicleIds: ['553'] });
  const catalog = JSON.parse(readFileSync(new URL('../public/data/component-index.json', import.meta.url), 'utf8'));
  const catalogDefinitions = new Map(catalog.definitions.map(definition => [definition.id, definition]));

  assert.equal(document.objects.length, 159);
  assert.equal(new Set(document.objects.map(object => object.id)).size, 159);
  assert.equal(document.topology.nodes.length, 271);
  assert.equal(document.topology.edges.length, 493);
  assert.equal(document.topology.plates.length, 138);
  assert.equal(document.topology.links.length, 73);
  assert.deepEqual(Object.fromEntries(LINK_KINDS.map(kind => [kind, document.topology.links.filter(link => link.kind === kind).length])), { electric: 17, mechanical: 20, liquid: 6, gas: 6, belt: 6, data: 18 });
  assert.ok(document.topology.links.every(link => document.objects.some(object => object.id === link.from.componentId) && document.objects.some(object => object.id === link.to.componentId)));
  const node69 = document.topology.nodes.find(node => node.id === 'grid-553-1:69')?.position;
  assert.deepEqual(Object.fromEntries(['x', 'y', 'z'].map(axis => [axis, worldToCell(node69[axis])])), { x: 69, y: 17, z: 247 });
  assert.deepEqual(document.objects.find(object => object.id === '553:grid-553-1:12')?.colors, [79, 79, 79, 79, 79, 79, 79, 79, 79, 79]);
  assert.deepEqual(document.objects.find(object => object.id === '553:grid-553-1:12')?.nativeExtension, [0, 0, 6]);
  // Wheel hub meshes have an outboard local tyre offset. Native component
  // rotations must therefore put the left and right hubs on opposite sides.
  assert.ok(Math.abs(document.objects.find(object => object.id === '553:grid-553-1:71')?.rotation.y + Math.PI / 2) < 1e-6);
  assert.ok(Math.abs(document.objects.find(object => object.id === '553:grid-553-1:73')?.rotation.y - Math.PI / 2) < 1e-6);
  assert.equal(document.topology.edges.find(edge => edge.id === 'grid-553-1:grid-553-1-edge-1')?.col, 49);
  assert.equal(document.topology.plates.find(plate => plate.id === 'grid-553-1:1')?.col_front, 26);
  assert.equal(document.topology.plates.some(plate => plate.type === 'window'), true);
  assert.ok(document.objects.some(object => object.id.startsWith('551:')));
  assert.ok(document.objects.some(object => object.id.startsWith('552:')));
  assert.ok(document.objects.some(object => object.id.startsWith('554:')));
  assert.deepEqual(document.topology.nodes.find(node => node.id === 'grid-551-1:1')?.position, { x: 6.72, y: 1.6, z: 19.6 });
  // Grid 2 is a local dashboard construction plane. Its raw positions use a
  // different coordinate frame (z = 129–131), but its data links anchor it to
  // the primary vehicle grid. It must be projected into the reference vehicle
  // bounds rather than rendered as a detached group.
  const dashboard = document.objects.filter(object => object.id.startsWith('553:grid-553-2:'));
  assert.equal(dashboard.length, 5);
  assert.deepEqual(document.objects.find(object => object.id === '553:grid-553-2:180')?.position, { x: 5.04, y: 2, z: 19.44 });
  const primaryBounds = JSON.parse(meta).vehicles.vehicles.find(vehicle => vehicle.id === 553).bounds;
  assert.ok(dashboard.every(object => ['x', 'y', 'z'].every((axis, index) => object.position[axis] >= primaryBounds.min[index] && object.position[axis] <= primaryBounds.max[index])));
  assert.deepEqual(document.objects.find(object => object.id === '552:grid-552-1:1')?.position, document.objects.find(object => object.id === '553:grid-553-1:178')?.position);
  const validated = validateDocument(document, catalogDefinitions);
  assert.equal(validated.objects.length, 159);
  assert.equal(validated.topology.edges.length, 493);
});

test('translations interpolate values once and do not translate untrusted parameter text', () => {
  setLocale('en');
  assert.equal(t('保存工程'), 'Save project');
  assert.equal(t('准备放置：{name}', { name: '<img src=x> {count}' }), 'Ready to place: <img src=x> {count}');
  assert.equal(t('__proto__'), '__proto__');
  setLocale('zh'); assert.equal(t('已复制 {count} 个组件', { count: 2 }), '已复制 2 个组件');
  setLocale('unsupported'); assert.equal(t('保存工程'), 'Save project');
  addMessages({ '测试词条 {value}': 'Test {value}' });
  assert.equal(t('测试词条 {value}', () => ({ value: 7 })), 'Test 7');
});

test('UI preferences default to English and reject unsafe or unsupported values', () => {
  const defaults = normalizeSettings();
  assert.equal(defaults.language, 'en'); assert.equal(AUTOSAVE_INTERVAL, 60000);
  const value = normalizeSettings({ version: 1, language: 'zh', leftWidth: 1e9, gridColor: 'url(evil)', gridOpacity: -1, snap: '1', camera: { position: [0, 0, 0], target: [0, 0, 0] }, drawers: { inspector: true } });
  assert.equal(value.language, 'zh'); assert.equal(value.leftWidth, 304); assert.equal(value.gridColor, defaults.gridColor);
  assert.equal(value.gridOpacity, defaults.gridOpacity); assert.equal(Object.hasOwn(value, 'snap'), false); assert.equal(value.camera, null);
  assert.equal(value.drawers.inspector, true);
  assert.equal(defaults.nodeColor, '#246bce'); assert.equal(defaults.nodeSize, .055); assert.equal(defaults.nodeOpacity, 1);
  const nodeStyle = normalizeSettings({ version: 1, nodeColor: '#12Ab34', nodeSize: .12, nodeOpacity: .4 });
  assert.equal(nodeStyle.nodeColor, '#12Ab34'); assert.equal(nodeStyle.nodeSize, .12); assert.equal(nodeStyle.nodeOpacity, .4);
  for (const invalid of [{ nodeColor: 'url(evil)' }, { nodeSize: .01 }, { nodeSize: Infinity }, { nodeOpacity: 2 }, { nodeOpacity: '1' }]) {
    const normalized = normalizeSettings({ version: 1, ...invalid });
    assert.equal(normalized.nodeColor, defaults.nodeColor); assert.equal(normalized.nodeSize, defaults.nodeSize); assert.equal(normalized.nodeOpacity, defaults.nodeOpacity);
  }
  assert.equal(defaults.beamAxisSnap, false);
  assert.deepEqual(defaults.paintQuickColors, ['#bd2636', '#631a24', '#2b3440', '#20252c', '#a16a30']);
  assert.deepEqual(normalizeSettings({ version: 1, paintQuickColors: ['#7C3AED', 26] }).paintQuickColors, ['#7c3aed', '#bd2636']);
  assert.deepEqual(normalizeSettings({ version: 1, paintQuickColors: ['#7C3AED', '#bad'] }).paintQuickColors, defaults.paintQuickColors);
  assert.equal(normalizeSettings({ version: 1, beamAxisSnap: true }).beamAxisSnap, true);
  for (const invalid of ['true', 1, null, {}]) assert.equal(normalizeSettings({ version: 1, beamAxisSnap: invalid }).beamAxisSnap, false);
  assert.equal(defaults.beamLengthsVisible, false);
  assert.equal(normalizeSettings({ version: 1, beamLengthsVisible: true, leftWidth: 720 }).beamLengthsVisible, true);
  assert.equal(defaults.beamOutlinesVisible, false);
  assert.equal(normalizeSettings({ version: 1, beamOutlinesVisible: true }).beamOutlinesVisible, true);
  assert.equal(normalizeSettings({ version: 1, leftWidth: 721 }).leftWidth, 304);
  const render = normalizeSettings({ version: 1, backgroundColor: '#102030', lightAzimuth: 80, lightElevation: 35, lightIntensity: 4.2, shadowStrength: .8, cameraLightEnabled: false, cameraLightIntensity: 5.5, orthographic: true });
  assert.deepEqual(Object.fromEntries(['backgroundColor', 'lightAzimuth', 'lightElevation', 'lightIntensity', 'shadowStrength', 'cameraLightEnabled', 'cameraLightIntensity', 'orthographic'].map(key => [key, render[key]])), { backgroundColor: '#102030', lightAzimuth: 80, lightElevation: 35, lightIntensity: 4.2, shadowStrength: .8, cameraLightEnabled: false, cameraLightIntensity: 5.5, orthographic: true });
  assert.equal(normalizeSettings({ version: 1, backgroundColor: 'red', lightAzimuth: 181, lightElevation: 1, lightIntensity: 9, shadowStrength: -1 }).backgroundColor, defaults.backgroundColor);
  assert.deepEqual(normalizeSettings({ version: 99, language: 'zh' }), defaults);
});

test('local backup validates data, restores previous valid record and survives quota failure', () => {
  const records = new Map(); let blocked = false;
  const storage = { getItem: key => records.get(key) ?? null, setItem: (key, value) => { if (blocked) throw new Error('QuotaExceededError'); records.set(key, value); } };
  const store = createLocalStore(() => storage, '/test/');
  const validate = value => migrateDocument(value, new Map());
  const empty = project([], { nodes: [], edges: [], plates: [] });
  const beam = project([], createBeam({}, { x: 0, y: 0, z: 0 }, { x: cell(1), y: 0, z: 0 }));
  assert.equal(store.saveProject(empty, validate, 10).ok, true);
  assert.equal(store.saveProject(beam, validate, 20).ok, true);
  assert.deepEqual(store.loadProject(validate).record.document, beam);
  blocked = true;
  assert.equal(store.saveProject(empty, validate, 30).ok, false);
  assert.deepEqual(store.loadProject(validate).record.document, beam);
  blocked = false; records.set(store.keys.project, '{broken');
  const recovered = store.loadProject(validate);
  assert.equal(recovered.recoveredBackup, true); assert.deepEqual(recovered.record.document, empty);
  records.set(store.keys.backup, '{broken');
  assert.ok(store.loadProject(validate).error);
  assert.equal(store.loadProject(validate).record, null);
  assert.equal(store.saveProject({ format: 'untrusted' }, validate).ok, false);
});

test('settings storage fails safely and scopes records to the app path', () => {
  const blocked = createLocalStore(() => { throw new Error('SecurityError'); });
  assert.equal(blocked.loadSettings().settings.language, 'en');
  assert.ok(blocked.loadSettings().error); assert.equal(blocked.saveSettings({}).ok, false);
  const records = new Map(); const storage = { getItem: key => records.get(key), setItem: (key, value) => records.set(key, value) };
  const a = createLocalStore(() => storage, '/a/'); const b = createLocalStore(() => storage, '/b/');
  assert.equal(a.saveSettings({ version: 1, language: 'zh', gridStyle: 'dashed' }).ok, true);
  assert.equal(a.loadSettings().settings.language, 'zh'); assert.equal(b.loadSettings().settings.language, 'en');
});

test('grid style updates color opacity and dashed material without leaking old materials', () => {
  const grid = new THREE.GridHelper(20, 200);
  let disposed = 0; grid.material.addEventListener('dispose', () => disposed++);
  applyGridStyle(grid, { gridColor: '#ff3300', gridOpacity: .3, gridStyle: 'dashed' });
  assert.equal(disposed, 1); assert.equal(grid.material.type, 'LineDashedMaterial');
  assert.equal(grid.material.color.getHexString(), 'ff3300'); assert.equal(grid.material.opacity, .3);
  assert.ok(grid.geometry.getAttribute('lineDistance'));
  applyGridStyle(grid, { gridColor: '#113355', gridOpacity: 0, gridStyle: 'solid' });
  assert.equal(grid.material.type, 'LineBasicMaterial'); assert.equal(grid.material.opacity, 0);
  grid.geometry.dispose(); grid.material.dispose();
});

test('all six axis views and isometric keep target and camera distance stable', () => {
  const camera = new THREE.PerspectiveCamera(); camera.position.set(3, 4, 5);
  const controls = { target: new THREE.Vector3(1, 1, 1), update() {} };
  const distance = camera.position.distanceTo(controls.target);
  for (const [view, direction] of Object.entries(VIEW_DIRECTIONS)) {
    assert.equal(orientCamera(camera, controls, view), true);
    assert.ok(Math.abs(camera.position.distanceTo(controls.target) - distance) < 1e-9);
    const actual = camera.position.clone().sub(controls.target).normalize();
    assert.ok(actual.distanceTo(new THREE.Vector3(...direction).normalize()) < 1e-9);
  }
  assert.equal(orientCamera(camera, controls, '__proto__'), false);
});

for (const layout of [16, 28, 36]) test('mesh layout ' + layout + ' / submeshes / unaligned Buffer', () => {
  const fixture = meshFixture({ layout, parts: 2 });
  const wrapped = Buffer.concat([Buffer.alloc(3), fixture]).subarray(3);
  const parsed = parseMesh(wrapped);
  assert.equal(parsed.parts.length, 2);
  assert.deepEqual([...parsed.parts[0].positions], [0, 0, 0, 1, 0, 0, 0, 1, 0]);
  assert.deepEqual([...parsed.parts[0].indices], [0, 1, 2]);
  assert.equal(Boolean(parsed.parts[0].normals), layout > 16);
  assert.equal(Boolean(parsed.parts[0].uv), layout === 36);
});
test('mesh rejects bad magic, version, layout, NaN, index and trailer', () => {
  for (const mutate of [
    b => b.write('nope', 0), b => b.writeUInt32LE(99, 4),
    b => b.writeUInt32LE(99, 25),
    b => b.writeFloatLE(NaN, 25 + 140),
    b => b.writeUInt32LE(999, b.length - 12),
    b => b.writeUInt32LE(1, b.length - 4),
  ]) { const b = meshFixture(); mutate(b); assert.throws(() => parseMesh(b)); }
});
test('every truncated fixture is rejected', () => {
  const b = meshFixture();
  for (let length = 0; length < b.length; length++) assert.throws(() => parseMesh(b.subarray(0, length)));
});
const cell = value => cellToWorld(value);
const object = { id: '1', type: 'engine', position: { x: cell(1), y: cell(2), z: cell(3) }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } };
const definitions = new Map([['engine', {}]]);
test('project validation, finite domain and unique IDs', () => {
  assert.deepEqual(validateDocument(project([object]), definitions).objects, [object]);
  assert.equal(validateDocument(project([{ ...object, hidden: true }]), definitions).objects[0].hidden, true);
  assert.equal('hidden' in validateDocument(project([{ ...object, hidden: false }]), definitions).objects[0], false);
  assert.throws(() => validateDocument(project([{ ...object, hidden: 'yes' }]), definitions), /visibility/);
  assert.throws(() => validateDocument(project([object, object]), definitions));
  for (const value of [NaN, Infinity, '1', null, .1, .25]) {
    const invalid = structuredClone(object); invalid.position.x = value;
    assert.throws(() => validateDocument(project([invalid]), definitions));
  }
  const residual = structuredClone(object); residual.position.x = cell(3) + 1e-10;
  assert.equal(validateDocument(project([residual]), definitions).objects[0].position.x, cell(3));
  const invalid = structuredClone(object); invalid.scale.z = -1;
  assert.throws(() => validateDocument(project([invalid]), definitions));
  assert.throws(() => validateDocument(project([{ ...object, type: 'unknown' }]), definitions));
});
test('known legacy document schema migrates only integer grid coordinates', () => {
  const legacy = { format: 'anymaker-web-project', version: 0, components: [{ id: 'legacy-1', definition: 'engine', position: { x: cell(1), y: cell(2), z: cell(3) } }] };
  const migrated = migrateDocument(legacy, definitions);
  assert.equal(migrated.version, 1);
  assert.equal(migrated.objects[0].type, 'engine');
  assert.deepEqual(migrated.objects[0].scale, { x: 1, y: 1, z: 1 });
  assert.throws(() => migrateDocument({ ...legacy, components: [{ ...legacy.components[0], position: { x: .1, y: 0, z: 0 } }] }, definitions), /整数格/);
  assert.throws(() => migrateDocument({ format: 'anymaker-web-project', version: 99, objects: [] }, definitions), /Unsupported/);
});
test('history undo / redo and branching are snapshots, not aliases', () => {
  const h = new History([]); const values = [structuredClone(object)]; h.commit(values); values[0].position.x = 7;
  assert.equal(h.entries[1][0].position.x, cell(1));
  assert.deepEqual(h.peekUndo(), []); h.cursor--;
  assert.deepEqual(h.peekRedo(), [object]);
  h.commit([{ ...object, id: '2' }]); assert.equal(h.peekRedo(), null);
});
test('history keeps labels aligned with snapshots while retaining its bounded record set', () => {
  const history = new History(0, 'Initial state');
  for (let value = 1; value <= 61; value++) history.commit(value, `Entry ${value}`);
  assert.equal(history.entries.length, 60); assert.equal(history.labels.length, 60);
  assert.equal(history.entries[0], 2); assert.equal(history.labels[0], 'Entry 2');
  assert.equal(history.labels.at(-1), 'Entry 61');
});
test('complete editor history keeps component and topology changes atomic', () => {
  const emptyTopology = { nodes: [], edges: [], plates: [] };
  const nodeTopology = { nodes: [{ id: 'node-1', position: { x: 0, y: 0, z: 0 } }], edges: [], plates: [] };
  const history = new History({ objects: [], topology: emptyTopology });
  history.commit({ objects: [object], topology: emptyTopology });
  history.commit({ objects: [object], topology: nodeTopology });
  assert.deepEqual(history.peekUndo(), { objects: [object], topology: emptyTopology });
  history.cursor--;
  assert.deepEqual(history.peekRedo(), { objects: [object], topology: nodeTopology });
});
test('XML declares its intermediate status and escapes identifiers', () => {
  const xml = toIntermediateXml(project([{ ...object, id: '<bad&' }]));
  assert.ok(xml.includes('game-compatible="false"'));
  assert.ok(xml.includes('&lt;bad&amp;'));
  assert.ok(!xml.includes('<bad'));
  const structuralXml = toIntermediateXml(project([{ ...object, gridId: 'grid-2', mirror: { axis: 'x', offset: cell(1) } }]));
  assert.ok(structuralXml.includes('grid="grid-2"'));
  assert.ok(structuralXml.includes('<mirror axis="x" offset="0.080000"/>'));
  assert.ok(structuralXml.includes('grid-cell-size-cm="8"'));
  const topologyXml = toIntermediateXml(project([object], {
    nodes: [{ id: 'node-1', position: { x: 0, y: 0, z: 0 } }, { id: 'node-2', position: { x: cell(1), y: 0, z: 0 } }, { id: 'node-3', position: { x: 0, y: cell(1), z: 0 } }],
    edges: [{ id: 'edge-1', a: 'node-1', b: 'node-2' }],
    plates: [{ id: 'plate-1', nodeIds: ['node-1', 'node-2', 'node-3'] }],
  }));
  assert.ok(topologyXml.includes('<edge id="edge-1" a="node-1" b="node-2"/>'));
  assert.ok(topologyXml.includes('<plate id="plate-1" nodes="node-1 node-2 node-3"/>'));
});
test('structural operations preserve integer grid transforms', () => {
  const items = [structuredClone(object), { ...structuredClone(object), id: '2', position: { x: cell(4), y: 0, z: 0 }, gridId: 'grid-2' }];
  const copied = copyObjects(items, ['1'], { x: cell(2), y: 0, z: 0 });
  assert.equal(copied.objects.length, 3);
  assert.equal(copied.objects[2].id, '1-copy');
  assert.equal(worldToCell(copied.objects[2].position.x), 3);
  const mirrored = mirrorObjects(copied.objects, ['1-copy'], { axis: 'x', offset: cell(1) });
  const mirror = mirrored.objects.find(value => value.id === '1-copy-mirror');
  assert.equal(worldToCell(mirror.position.x), -1);
  assert.deepEqual(mirror.mirror, { axis: 'x', offset: cell(1) });
  const moved = moveObjects(mirrored.objects, ['1-copy-mirror'], { x: cell(1), y: cell(2), z: cell(3) });
  assert.deepEqual(Object.fromEntries(Object.entries(moved.objects.find(value => value.id === '1-copy-mirror').position).map(([axis, value]) => [axis, worldToCell(value)])), { x: 0, y: 4, z: 6 });
  assert.throws(() => copyObjects(items, ['1'], { x: .1, y: 0, z: 0 }), /整数格/);
});
test('structural operations support multiple selected components atomically', () => {
  const items = [
    { ...structuredClone(object), id: 'a', position: { x: cell(1), y: 0, z: 0 } },
    { ...structuredClone(object), id: 'b', position: { x: cell(3), y: 0, z: 0 } },
    { ...structuredClone(object), id: 'c', position: { x: cell(5), y: 0, z: 0 } },
  ];
  const copied = copyObjects(items, ['a', 'b'], { x: cell(2), y: 0, z: 0 });
  assert.deepEqual(copied.created, ['a-copy', 'b-copy']);
  assert.deepEqual(copied.objects.slice(-2).map(value => worldToCell(value.position.x)), [3, 5]);
  const mirrored = mirrorObjects(items, ['a', 'b'], { axis: 'x', offset: 0 });
  assert.deepEqual(mirrored.created, ['a-mirror', 'b-mirror']);
  assert.deepEqual(mirrored.objects.slice(-2).map(value => worldToCell(value.position.x)), [-1, -3]);
  const removed = removeObjects(items, ['a', 'c']);
  assert.deepEqual(removed.removed, ['a', 'c']);
  assert.deepEqual(removed.objects.map(value => value.id), ['b']);
});
test('grid split and merge are explicit and validate IDs', () => {
  const items = [{ ...structuredClone(object), id: 'a', gridId: 'grid-1' }, { ...structuredClone(object), id: 'b', gridId: 'grid-1' }];
  const split = splitGrid(items, ['b'], 'grid-2');
  assert.deepEqual(gridIds(split.objects), ['grid-1', 'grid-2']);
  const merged = mergeGrids(split.objects, ['grid-1', 'grid-2'], 'grid-main');
  assert.deepEqual(merged.objects.map(value => value.gridId), ['grid-main', 'grid-main']);
  assert.throws(() => splitGrid(items, ['a'], 'bad id'));
});
test('domain model round-trips editor components and validates topology references', () => {
  const topology = { nodes: [{ id: 'n1', position: { x: 0, y: 0, z: 0 } }, { id: 'n2', position: { x: cell(1), y: 0, z: 0 } }, { id: 'n3', position: { x: 0, y: cell(1), z: 0 } }], edges: [{ id: 'e1', a: 'n1', b: 'n2' }], plates: [{ id: 'p1', nodeIds: ['n1', 'n2', 'n3'] }] };
  const document = project([{ ...object, gridId: 'grid-a' }, { ...object, id: '2', gridId: 'grid-b', mirror: { axis: 'x', offset: 0 } }], topology);
  const model = fromEditorDocument(document);
  assert.ok(model instanceof Project);
  assert.ok(model.vehicles[0] instanceof Vehicle);
  assert.equal(model.vehicles.length, 1);
  assert.deepEqual(toEditorDocument(model), document);
  const domainTopology = new Project({ vehicles: [{ id: 'v', grids: [{ id: 'g', nodes: [new Node({ id: 'n1' }), new Node({ id: 'n2' })], edges: [new Edge({ id: 'e', a: 'n1', b: 'n2' })], plates: [new Plate({ id: 'p', nodeIds: ['n1', 'n2'] })], links: [new Link({ id: 'l', kind: 'electric', from: { node: 'n1' }, to: { node: 'n2' } })] }] }] });
  assert.equal(validateProject(domainTopology), domainTopology);
  domainTopology.vehicles[0].grids[0].edges[0].b = 'missing';
  assert.throws(() => validateProject(domainTopology), /unknown node/);
  const duplicate = new Project({ vehicles: [{ id: 'v', grids: [{ id: 'a', components: [new Component({ id: 'same' })] }, { id: 'b', components: [new Component({ id: 'same' })] }] }] });
  assert.throws(() => validateProject(duplicate), /Duplicate component ID/);
});
test('native vehicle data maps global topology once and preserves raw fields', () => {
  const native = { definitions: { components: ['engine'] }, vehicles: { vehicles: [{ id: 7, transform: { m: [1, 0, 0, 0, 1, 0, 0, 0, 1], t: [1, 2, 3] }, nodes: [{ id: 1, pos: [0, 0, 0] }, { id: 2, pos: [1, 0, 0] }], edges: [{ n0: 1, n1: 2, col: 49 }], plates: [{ id: 4, nodes: [1, 2], col_front: 49 }], grids: [{ components: [{ def: 0, id: 9, pos: [0, 0, 0], rot: [0, 0, 1, 0, 1, 0, -1, 0, 0] }] }, { origin: [0, 0, 0], dir: [0, 1, 0], components: [] }], electric_links: [{ p0: { comp: 9 }, p1: { comp: 9 }, points: [] }] }] } };
  const meta = { bounds: { min: [-1, -2, -3], max: [1, 2, 3] }, unrecognized: ['preserve'] };
  const model = parseNativePair(native, meta);
  assert.deepEqual(nativeStats(model), [{ id: '7', grids: 2, nodes: 2, edges: 1, plates: 1, components: 1, links: 1 }]);
  assert.deepEqual(model.extras.native.meta, meta);
  meta.bounds.min[0] = 99; assert.equal(model.extras.native.meta.bounds.min[0], -1);
  assert.throws(() => parseNativePair(native, []), /meta/);
  assert.deepEqual(model.vehicles[0].grids[0].components[0].extras.native.definitionIndex, 0);
  assert.ok(Math.abs(model.vehicles[0].grids[0].components[0].transform.rotation.y + Math.PI / 2) < 1e-6);
  assert.deepEqual(model.extras.native.raw, native);
  const importedTopology = toEditorTopology(model);
  assert.equal(importedTopology.edges[0].col, 49);
  assert.equal(importedTopology.plates[0].col_front, 49);
  const exported = toNativeData(model);
  assert.deepEqual(exported.value, native);
  model.vehicles[0].grids[0].components[0].transform.position.x = 9;
  assert.equal(toNativeData(model).value.vehicles.vehicles[0].grids[0].components[0].pos[0], 9);
});
test('topology commands create, split, merge and validate structure on the integer grid', () => {
  let nodes = [];
  nodes = createNode(nodes, { x: 0, y: 0, z: 0 }).nodes;
  nodes = createNode(nodes, { x: cell(2), y: 0, z: 0 }).nodes;
  nodes = createNode(nodes, { x: 0, y: cell(2), z: 0 }).nodes;
  nodes = createNode(nodes, { x: cell(2), y: cell(2), z: 0 }).nodes;
  const a = nodes[0].id; const b = nodes[1].id; const c = nodes[2].id; const d = nodes[3].id;
  let edges = createEdge([], a, b).edges;
  edges = createEdge(edges, b, d).edges;
  const split = splitEdge(nodes, edges, edges[0].id, { x: cell(1), y: 0, z: 0 });
  assert.equal(split.edges.length, 3);
  const moved = moveNode(split.nodes, d, { x: cell(2), y: cell(2), z: 0 });
  const plate = createPlate([], [a, b, d, c], moved.nodes).plate;
  assert.deepEqual(triangulatePlate(plate, moved.nodes).length, 2);
  const merged = mergeNodes(moved.nodes, split.edges, [plate], d, c);
  assert.equal(merged.nodes.some(node => node.id === d), false);
  assert.equal(merged.plates.length, 1);
  assert.equal(validateTopologyState({ nodes, edges: [{ ...edges[0], hidden: true }], plates: [] }).edges[0].hidden, true);
  assert.equal(validateTopologyState({ nodes, edges: [{ ...edges[0], color: '#7c3aed' }], plates: [{ ...plate, color_front: '#7c3aed' }] }).plates[0].color_front, '#7c3aed');
  assert.throws(() => validateTopologyState({ nodes, edges: [{ ...edges[0], color: 'purple' }], plates: [] }), /RGB/);
  assert.throws(() => validateTopologyState({ nodes, edges: [{ ...edges[0], hidden: 'yes' }], plates: [] }), /可见性/);
  assert.throws(() => validateTopologyState({ nodes, edges: [], plates: [{ ...plate, hidden: 'yes' }] }), /可见性/);
  assert.throws(() => createNode(nodes, { x: .1, y: 0, z: 0 }), /整数格/);
});
test('published dynamic Mesh preview rotations preserve the native row-major matrix', () => {
  const mesh = new THREE.Object3D();
  const rotation = [1, 0, 0, 0, 0.9410143691718643, -0.3383666015020959, 0, 0.3383666015020959, 0.9410143691718643];
  applyMeshTransform(mesh, { previewRotation: rotation });
  const transformed = new THREE.Vector3(0, 0, 1).applyQuaternion(mesh.quaternion);
  assert.ok(Math.abs(transformed.x) < 1e-8);
  assert.ok(Math.abs(transformed.y + 0.3383666015020959) < 1e-8);
  assert.ok(Math.abs(transformed.z - 0.9410143691718643) < 1e-8);
});
test('beam splitting inserts the new node into every affected panel boundary', () => {
  const a = { x: 0, y: 0, z: 0 }; const b = { x: cell(2), y: 0, z: 0 };
  const c = { x: cell(2), y: cell(2), z: 0 }; const d = { x: 0, y: cell(2), z: 0 };
  let state = createBeam({}, a, b);
  state = createBeam(state, b, c); state = createBeam(state, c, d); state = createBeam(state, d, a);
  const plate = createPlateFromEdges([], state.edges.map(edge => edge.id), state.edges, state.nodes).plate;
  const split = splitEdge(state.nodes, state.edges, state.edges[0].id, { x: cell(1), y: 0, z: 0 }, [plate]);
  assert.equal(split.nodes.length, 5);
  assert.equal(split.edges.length, 5);
  assert.equal(split.plates[0].nodeIds.length, 5);
  const index = split.plates[0].nodeIds.indexOf(split.node.id);
  assert.notEqual(index, -1);
  assert.deepEqual(validateTopologyState({ nodes: split.nodes, edges: split.edges, plates: split.plates }).plates, split.plates);
});
test('connection commands preserve six link families and validate endpoints', () => {
  assert.deepEqual(LINK_COLORS, {
    electric: '#f1c232', mechanical: '#f2994a', liquid: '#2f80ed',
    gas: '#27ae60', belt: '#98a2b3', data: '#9b51e0',
  });
  const componentIds = new Set(['source', 'target']);
  let links = [];
  for (const kind of LINK_KINDS) {
    const result = createLink(links, { kind, from: { componentId: 'source', port: 0 }, to: { componentId: 'target', port: 1 }, points: [{ x: cell(1), y: 0, z: 0 }] }, componentIds);
    links = result.links;
  }
  assert.equal(validateLinks(links, componentIds).length, LINK_KINDS.length);
  assert.throws(() => createLink(links, { kind: 'electric', from: { componentId: 'missing' }, to: { componentId: 'target' }, points: [] }, componentIds), /unknown component/);
  assert.throws(() => validateLinks([{ id: 'bad', kind: 'belt', from: { componentId: 'source' }, to: { componentId: 'source' }, points: [] }], componentIds), /same component port/);
  assert.equal(removeLink(links, links[0].id, componentIds).links.length, LINK_KINDS.length - 1);
});
test('node movement atomically merges coincident logical nodes and preserves valid references', () => {
  const state = {
    nodes: [
      { id: 'node-1', position: { x: 0, y: cell(2), z: 0 } },
      { id: 'node-2', position: { x: cell(2), y: cell(2), z: 0 } },
      { id: 'node-3', position: { x: 0, y: cell(4), z: 0 } },
    ],
    edges: [{ id: 'edge-1', a: 'node-1', b: 'node-3' }, { id: 'edge-2', a: 'node-2', b: 'node-3' }],
    plates: [],
  };
  const before = structuredClone(state);
  const moved = moveNodeAndMerge(state, 'node-1', { x: cell(1), y: cell(2), z: cell(3) });
  assert.equal(moved.merged, false);
  assert.deepEqual(moved.nodes.find(node => node.id === 'node-1').position, { x: cell(1), y: cell(2), z: cell(3) });
  assert.deepEqual(state, before);
  const merged = moveNodeAndMerge(state, 'node-1', state.nodes[1].position);
  assert.equal(merged.merged, true);
  assert.deepEqual(merged.idMap, { 'node-1': 'node-2' });
  assert.equal(merged.nodes.length, 2);
  assert.deepEqual(merged.edges, [{ id: 'edge-1', a: 'node-2', b: 'node-3' }]);
  assert.deepEqual(validateTopologyState(merged), { nodes: merged.nodes, edges: merged.edges, plates: [] });
  assert.throws(() => moveNodeAndMerge(state, 'node-1', { x: .1, y: 0, z: 0 }), /整数格/);
  assert.deepEqual(state, before);
});
test('topology deletion commands remove dependent references and keep the state valid', () => {
  const state = {
    nodes: [
      { id: 'node-1', position: { x: 0, y: 0, z: 0 } },
      { id: 'node-2', position: { x: cell(1), y: 0, z: 0 } },
      { id: 'node-3', position: { x: 0, y: cell(1), z: 0 } },
    ],
    edges: [{ id: 'edge-1', a: 'node-1', b: 'node-2' }, { id: 'edge-2', a: 'node-2', b: 'node-3' }],
    plates: [{ id: 'plate-1', nodeIds: ['node-1', 'node-2', 'node-3'] }],
  };
  assert.deepEqual(removeEdge(state, 'edge-1').edges.map(edge => edge.id), ['edge-2']);
  assert.deepEqual(removePlate(state, 'plate-1').plates, []);
  const withoutNode = removeNode(state, 'node-2');
  assert.deepEqual(withoutNode, { nodes: [state.nodes[0], state.nodes[2]], edges: [], plates: [] });
  assert.deepEqual(validateTopologyState(withoutNode), withoutNode);
});
test('beam creation is atomic and reuses logical endpoints', () => {
  const empty = { nodes: [], edges: [], plates: [] };
  const a = { x: 0, y: cell(2), z: cell(1) }; const b = { x: cell(3), y: cell(2), z: cell(1) }; const c = { x: cell(3), y: cell(5), z: cell(1) };
  const first = createBeam(empty, a, b);
  assert.deepEqual(empty, { nodes: [], edges: [], plates: [] });
  assert.equal(first.nodes.length, 2); assert.equal(first.edges.length, 1);
  const second = createBeam(first, b, c);
  assert.equal(second.nodes.length, 3); assert.equal(second.edges.length, 2);
  assert.equal(second.edges[0].b, second.edges[1].a);
  const before = structuredClone(first);
  assert.throws(() => createBeam(first, b, a), /已存在/);
  assert.throws(() => createBeam(first, c, c), /不同节点/);
  assert.throws(() => createBeam(first, c, { x: Infinity, y: 0, z: 0 }), /坐标/);
  assert.deepEqual(first, before);
  assert.deepEqual(validateDocument(project([], second), definitions).topology, second);
});
test('panels are created from one closed beam loop with a finite normal offset', () => {
  const a = { x: 0, y: 0, z: 0 }; const b = { x: cell(2), y: 0, z: 0 };
  const c = { x: cell(2), y: cell(2), z: 0 }; const d = { x: 0, y: cell(2), z: 0 };
  let state = createBeam({}, a, b);
  state = createBeam(state, b, c); state = createBeam(state, c, d); state = createBeam(state, d, a);
  const edgeIds = state.edges.map(edge => edge.id);
  const result = createPlateFromEdges([], [edgeIds[0], edgeIds[3], edgeIds[2], edgeIds[1]], state.edges, state.nodes, { normalOffset: CELL_SIZE_WORLD / 2 });
  assert.equal(result.plate.nodeIds.length, 4);
  assert.equal(result.plate.normalOffset, CELL_SIZE_WORLD / 2);
  assert.deepEqual(validateTopologyState({ ...state, plates: result.plates }).plates, result.plates);
  assert.throws(() => createPlateFromEdges([], edgeIds.slice(0, 3), state.edges, state.nodes), /闭合环/);
  assert.throws(() => createPlate([], result.plate.nodeIds, state.nodes, { normalOffset: Infinity }), /法向偏移/);
  assert.throws(() => validateTopologyState({ ...state, edges: [{ ...state.edges[0], col: 256 }] }), /颜色编号/);
});
test('glass panels use the observed window type on the same closed beam loop', () => {
  const a = { x: 0, y: 0, z: 0 }; const b = { x: cell(2), y: 0, z: 0 };
  const c = { x: cell(2), y: cell(2), z: 0 }; const d = { x: 0, y: cell(2), z: 0 };
  let state = createBeam({}, a, b);
  state = createBeam(state, b, c); state = createBeam(state, c, d); state = createBeam(state, d, a);
  const result = createGlassPlateFromEdges([], state.edges.map(edge => edge.id), state.edges, state.nodes, { normalOffset: CELL_SIZE_WORLD / 2 });
  assert.equal(result.plate.type, 'window');
  assert.equal(result.plate.nodeIds.length, 4);
  assert.equal(validateTopologyState({ ...state, plates: result.plates }).plates[0].type, 'window');
  assert.throws(() => createPlateFromEdges(result.plates, state.edges.map(edge => edge.id), state.edges, state.nodes), /已有面板或玻璃/);
  assert.throws(() => validateTopologyState({ ...state, plates: [{ ...result.plate, type: 'opaque' }] }), /类型/);
});
test('solid beams reject zero length and off-axis or endpoint splits', () => {
  const state = createBeam({}, { x: 0, y: cell(2), z: 0 }, { x: cell(4), y: cell(2), z: 0 });
  const id = state.edges[0].id;
  for (const point of [{ x: 0, y: cell(2), z: 0 }, { x: cell(5), y: cell(2), z: 0 }, { x: cell(2), y: cell(3), z: 0 }, { x: .1, y: 0, z: 0 }]) {
    assert.throws(() => splitEdge(state.nodes, state.edges, id, point), /中心线内部|整数格/);
  }
  const split = splitEdge(state.nodes, state.edges, id, { x: cell(2), y: cell(2), z: 0 });
  assert.equal(split.edges.length, 2); assert.equal(split.nodes.length, 3);
  const invalid = structuredClone(state);
  invalid.nodes[1].position = { ...invalid.nodes[0].position };
  assert.throws(() => validateTopologyState(invalid), /长度/);
  invalid.nodes[1].position.x = '4';
  assert.throws(() => validateTopologyState(invalid), /坐标/);
  assert.equal(state.nodes.length, 2);
});
test('beam meshes use a rectangular profile and cover endpoint cells', () => {
  const material = new THREE.MeshBasicMaterial();
  const axisEnds = [new THREE.Vector3(4, 0, 0), new THREE.Vector3(-4, 0, 0), new THREE.Vector3(0, 4, 0), new THREE.Vector3(0, -4, 0), new THREE.Vector3(0, 0, 4), new THREE.Vector3(0, 0, -4)];
  const planar = new THREE.Vector3(4, 4, 0);
  for (const offset of [...axisEnds, planar, new THREE.Vector3(3, 4, 5)]) {
    const start = new THREE.Vector3(1, 2, 3); const end = offset.clone().add(start);
    const beam = createBeamMesh(start, end, material);
    assert.equal(beam.isMesh, true); assert.equal(beam.geometry.type, 'BoxGeometry');
    assert.equal(beam.scale.x, GRID_SIZE / GRID_DIVISIONS); assert.equal(beam.scale.z, CELL_SIZE_WORLD);
    assert.ok(Math.abs(beam.scale.y - start.distanceTo(end) - CELL_SIZE_WORLD) < 1e-9);
    const direction = end.clone().sub(start).normalize();
    assert.ok(beam.localToWorld(new THREE.Vector3(0, -.5, 0)).distanceTo(start.clone().addScaledVector(direction, -CELL_SIZE_WORLD / 2)) < 1e-9);
    assert.ok(beam.localToWorld(new THREE.Vector3(0, .5, 0)).distanceTo(end.clone().addScaledVector(direction, CELL_SIZE_WORLD / 2)) < 1e-9);
    if (axisEnds.includes(offset)) {
      for (const basis of [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)]) {
        const worldBasis = basis.applyQuaternion(beam.quaternion).toArray().map(Math.abs);
        assert.equal(worldBasis.filter(value => Math.abs(value - 1) < 1e-9).length, 1);
        assert.equal(worldBasis.filter(value => value < 1e-9).length, 2);
      }
    }
    beam.geometry.dispose();
  }
  material.dispose();
});
test('beam outlines are optional and preserve the beam geometry transform', () => {
  const material = new THREE.MeshBasicMaterial();
  const beam = createBeamMesh(new THREE.Vector3(), new THREE.Vector3(CELL_SIZE_WORLD, 0, 0), material, { outlined: true });
  const outline = beam.getObjectByName('beam-outline');
  assert.ok(outline?.isLineSegments);
  assert.equal(outline.visible, true);
  setBeamOutline(beam, false); assert.equal(outline.visible, false);
  setBeamOutline(beam, true); assert.equal(outline.visible, true);
  outline.geometry.dispose(); outline.material.dispose(); beam.geometry.dispose(); material.dispose();
  const preview = createBeamMesh(new THREE.Vector3(), new THREE.Vector3(CELL_SIZE_WORLD, 0, 0), new THREE.MeshBasicMaterial());
  setBeamOutline(preview, true);
  assert.ok(preview.getObjectByName('beam-outline')?.visible);
  preview.traverse(object => { object.geometry?.dispose(); object.material?.dispose(); });
  const emptyPreview = createBeamMesh(new THREE.Vector3(), new THREE.Vector3(), new THREE.MeshBasicMaterial(), { outlined: true });
  assert.equal(emptyPreview.getObjectByName('beam-outline'), undefined);
  assert.equal(updateBeamMesh(emptyPreview, new THREE.Vector3(), new THREE.Vector3(CELL_SIZE_WORLD, 0, 0)), true);
  assert.ok(emptyPreview.getObjectByName('beam-outline')?.visible);
  emptyPreview.traverse(object => { object.geometry?.dispose(); object.material?.dispose(); });
});
test('beam joints and connection routes cover shared nodes and route corners', () => {
  const material = new THREE.MeshBasicMaterial();
  const joint = createBeamJointMesh({ x: cell(2), y: 0, z: cell(-1) }, material);
  assert.equal(joint.geometry.type, 'BoxGeometry');
  assert.deepEqual(joint.position.toArray(), [cell(2), 0, cell(-1)]);
  const route = createConnectionRoute([
    { x: 0, y: 0, z: 0 }, { x: cell(2), y: 0, z: 0 }, { x: cell(2), y: cell(2), z: 0 },
  ], material, { radius: .02, radialSegments: 8 });
  assert.equal(route.children.length, 3);
  assert.equal(route.children.filter(child => child.geometry.type === 'CylinderGeometry').length, 2);
  assert.equal(route.children.filter(child => child.geometry.type === 'SphereGeometry').length, 1);
  joint.geometry.dispose(); route.traverse(object => object.geometry?.dispose()); material.dispose();
});
test('camera projection quantizes every world axis to the fixed integer grid', () => {
  const anchor = new THREE.Vector3(0, cell(2), 0);
  for (const eye of [new THREE.Vector3(0, cell(2), 10), new THREE.Vector3(0, 12, .001), new THREE.Vector3(6, 8, 10)]) {
    const camera = new THREE.PerspectiveCamera(45, 1, .01, 2000);
    camera.position.copy(eye); camera.lookAt(anchor); camera.updateMatrixWorld(true);
    const frame = cameraBuildFrame(camera, anchor);
    const ray = new THREE.Raycaster(); ray.setFromCamera(new THREE.Vector2(.4, -.3), camera);
    const point = projectBuildPoint(ray.ray, frame);
    assert.ok(point); assertGridVector(point);
    assert.equal(projectBuildPoint(new THREE.Ray(anchor.clone().add(frame.plane.normal), frame.right), frame), null);
    assert.equal(projectBuildPoint(new THREE.Ray(anchor.clone().add(frame.plane.normal), frame.plane.normal), frame), null);
    const original = point.clone(); camera.position.addScalar(5); camera.lookAt(anchor);
    assert.ok(projectBuildPoint(ray.ray, frame).distanceTo(original) < 1e-9);
  }
});
test('placement follows the pointer vehicle hit before its work-plane fallback', () => {
  const vehicle = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
  vehicle.rotation.x = -Math.PI / 2; vehicle.position.y = .5;
  vehicle.updateMatrixWorld(true);
  const pointer = new THREE.Raycaster(new THREE.Vector3(.17, 1, .17), new THREE.Vector3(0, -1, 0));
  const workPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  assert.deepEqual(resolvePlacementPoint(pointer, [vehicle], workPlane).toArray(), [cell(2), cell(6), cell(2)]);
  assert.deepEqual(resolvePlacementPoint(pointer, [], workPlane).toArray(), [cell(2), 0, cell(2)]);
  vehicle.geometry.dispose(); vehicle.material.dispose();
});
test('beam axis snapping selects every signed world axis on integer cells', () => {
  const camera = new THREE.PerspectiveCamera(45, 1, .01, 2000);
  const start = new THREE.Vector3(cell(2), cell(3), cell(-2));
  camera.position.copy(start).add(new THREE.Vector3(6, 8, 10)); camera.lookAt(start); camera.updateMatrixWorld(true);
  const frame = cameraBuildFrame(camera, start);
  for (const axis of ['x', 'y', 'z']) for (const sign of [-1, 1]) {
    const end = start.clone(); end[axis] += sign * cell(14);
    const ray = new THREE.Ray(camera.position.clone(), end.clone().sub(camera.position).normalize());
    const result = resolveBeamPoint(ray, frame, { axisSnap: true });
    assert.equal(result.axis, axis); assertGridVector(result.point);
    for (const other of ['x', 'y', 'z']) assert.equal(worldToCell(result.point[other]) - worldToCell(start[other]), other === axis ? sign * 14 : 0);
  }
  assert.deepEqual(start.toArray(), [cell(2), cell(3), cell(-2)]);
});
test('beam axis snapping preserves aligned nodes and rejects invalid grid coordinates', () => {
  const camera = new THREE.PerspectiveCamera(); camera.position.set(0, 0, 10); camera.lookAt(0, 0, 0); camera.updateMatrixWorld(true);
  const start = new THREE.Vector3(); const frame = cameraBuildFrame(camera, start);
  const ray = new THREE.Ray(camera.position.clone(), new THREE.Vector3(cell(20), cell(1), -10).normalize());
  const node = { x: cell(15), y: 0, z: 0 };
  assert.deepEqual(resolveBeamPoint(ray, frame, { node, axisSnap: true }).point.toArray(), [cell(15), 0, 0]);
  const offAxis = { x: cell(20), y: cell(1), z: 0 };
  const constrained = resolveBeamPoint(ray, frame, { node: offAxis, axisSnap: true });
  assert.equal(constrained.axis, 'x'); assert.equal(worldToCell(constrained.point.y), 0); assert.equal(worldToCell(constrained.point.z), 0);
  assert.deepEqual(resolveBeamPoint(ray, frame).point.toArray(), projectBuildPoint(ray, frame).toArray());
  assert.throws(() => resolveBeamPoint(ray, frame, { node: { x: .1, y: 0, z: 0 }, axisSnap: true }), /整数格/);
  const far = resolveBeamPoint(new THREE.Ray(new THREE.Vector3(20000, 0, 10), new THREE.Vector3(0, 0, -1)), frame, { axisSnap: true });
  assert.ok(far); assertGridVector(far.point);
});
test('XYZ beam rulers measure integer grid components without mutating endpoints', () => {
  const start = new THREE.Vector3(cell(10), cell(20), cell(30)); const end = new THREE.Vector3(cell(-10), cell(20), cell(60));
  const measurements = beamMeasurements(start, end);
  assert.deepEqual(measurements.map(m => m.cells), [20, 0, 30]);
  assert.deepEqual(measurements.map(m => m.length), [cell(20), 0, cell(30)]);
  assert.ok(measurements[0].from.equals(start)); assert.ok(measurements[2].to.equals(end));
  assert.ok(measurements[0].to.equals(measurements[1].from));
  assert.deepEqual(beamMeasurements(start, start).map(m => m.cells), [0, 0, 0]);
  assert.deepEqual(beamMeasurements(start, { x: Infinity, y: 0, z: 0 }), []);
  assert.deepEqual(start.toArray(), [cell(10), cell(20), cell(30)]); assert.deepEqual(end.toArray(), [cell(-10), cell(20), cell(60)]);
});
test('category icons cover known categories and safely fall back for unknown values', () => {
  for (const category of ['engine', 'wheel', 'electric', 'data', 'building', 'furniture']) {
    assert.ok(categoryInfo(category).path); assert.match(categoryInfo(category).color, /^#[a-f0-9]{6}$/);
  }
  assert.notEqual(categoryInfo('wheel').path, categoryInfo('engine').path);
  assert.deepEqual(categoryInfo('__proto__'), categoryInfo('miscellaneous'));
});
test('geometry reflection changes positions, winding and normals without negative scale', () => {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 1, 0, 0, 0, 1, 0], 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute([0, 0, 1, 0, 0, 1, 0, 0, 1], 3));
  geometry.setIndex([0, 1, 2]);
  const mirrored = reflectGeometry(geometry, 'x');
  assert.deepEqual([...mirrored.getAttribute('position').array], [0, 0, 0, -1, 0, 0, 0, 1, 0]);
  assert.deepEqual([...mirrored.getIndex().array], [0, 2, 1]);
  assert.deepEqual([...mirrored.getAttribute('normal').array], [0, 0, 1, 0, 0, 1, 0, 0, 1]);
  geometry.dispose(); mirrored.dispose();
});
