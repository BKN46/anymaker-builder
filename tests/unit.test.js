import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { meshFixture } from './fixtures.js';
import { parseMesh } from '../src/assets/mesh.js';
import { History, project, validateDocument, migrateDocument, toIntermediateXml } from '../src/editor/document.js';
import { copyObjects, mirrorObjects, moveObjects, removeObjects, splitGrid, mergeGrids, gridIds } from '../src/editor/operations.js';
import { Project, Vehicle, Grid, Component, Node, Edge, Plate, Link, fromEditorDocument, toEditorDocument, toEditorTopology, validateProject, nativeGridFrame, nativeGridLocalDelta } from '../src/editor/model.js';
import { parseNativePair, nativeStats, toNativeData, toNativePair, toNativePairFromEditor, verifyNativePairRoundTrip } from '../src/native/anymaker-data.js';
import { createNode, moveNode, moveNodeAndMerge, mergeNodes, removeNode, removeEdge, removePlate, createEdge, createEdgeFromPoints, splitEdge, createPlate, createPlateFromEdges, createGlassPlateFromEdges, triangulatePlate, validateTopologyState } from '../src/editor/topology.js';
import { LINK_COLORS, LINK_KINDS, LINK_RENDER_STYLES, createLink, moveLinkPoint, removeLink, validateLinks } from '../src/editor/connections.js';
import * as THREE from 'three';
import { correctGeometryNormals, reflectGeometry } from '../src/assets/geometry-ops.js';
import { cameraBuildFrame, projectBuildPoint, resolveEdgePoint, resolvePlacementPoint, edgeMeasurements, createEdgeMesh, createEdgeJointMesh, createConnectionRoute, updateEdgeMesh, setEdgeOutline, edgeConnectionCorners, plateSurfaceBoundary, plateSurfaceVertices, cameraFacingPlateOffset, cameraFacingPlateDirection, rayFacingPlateSide } from '../src/editor/construction-view.js';
import { CELL_SIZE_WORLD, CELL_SIZE_CM, assertGridVector, cellToWorld, quantizeWorldVector, worldToCell } from '../src/editor/grid.js';
import { categoryInfo } from '../src/catalog/category-icons.js';
import { normalizeSettings, createLocalStore, AUTOSAVE_INTERVAL } from '../src/editor/local-storage.js';
import { applyGridStyle, orientCamera, VIEW_DIRECTIONS } from '../src/editor/view-settings.js';
import { applyMeshTransform, staticMeshParts, stitchTiledMeshParts, WHEEL_TYRE_OUTBOARD_OFFSET, withWheelTyreOffset } from '../src/assets/published-library.js';
import { DEPTH_SUBLAYERS, LOG_DEPTH_LAYER_STEP, LOG_DEPTH_SUBLAYER_STEP, RENDER_DEPTH_LAYERS, assignOpaqueDepthOrder, configureOpaqueDepthLayer, depthBias, logDepthBias, stableDepthRank } from '../src/editor/render-depth.js';
import { t, setLocale, addMessages } from '../src/i18n.js';
import { connectionDescriptorLabel, connectionNetworkLabel, connectionPortRoleLabel } from '../src/editor/connection-port-labels.js';
import { logicNodePort, logicNodePortsForNetwork, logicNodeCellPosition } from '../src/editor/connection-ports.js';
import { componentPropertyDescriptors, updateNativeProperty, validateNativeProperties } from '../src/editor/component-properties.js';
import { nativePaintColor, nearestNativePaintIndex } from '../src/editor/native-paint.js';
import { mirrorPoint, mirrorSurfaceDirection, sameGridPoint } from '../src/editor/mirror-mode.js';
import { accessoryOptionsForComponent, createNativeAccessoryItem, nativeAccessoryDefinition } from '../src/editor/native-accessories.js';
import { extensionAxes, extensionHandlePosition, extensionVector, stretchMeshPositions, updateExtension } from '../src/editor/component-extension.js';
import { placementOrientation, updatePlacementOrientation } from '../src/editor/placement-orientation.js';
import { gridSelectionClosure } from '../src/editor/selection-closure.js';
import { createMicrocontrollerVariable, microcontrollerState, updateMicrocontrollerState } from '../src/editor/microcontroller.js';
import { stageImportedSubgrid, translateImportedSubgrid, translateSubgridTopology } from '../src/editor/imported-subgrid.js';

test('mirror mode reflects integer-grid points on every plane without moving points on the plane', () => {
  assert.deepEqual(mirrorPoint({ x: cell(3), y: cell(-2), z: cell(4) }, { axis: 'x', offset: cell(1) }), { x: cell(-1), y: cell(-2), z: cell(4) });
  assert.deepEqual(mirrorPoint({ x: cell(3), y: cell(-2), z: cell(4) }, { axis: 'y', offset: cell(1) }), { x: cell(3), y: cell(4), z: cell(4) });
  assert.deepEqual(mirrorPoint({ x: cell(3), y: cell(-2), z: cell(4) }, { axis: 'z', offset: cell(1) }), { x: cell(3), y: cell(-2), z: cell(-2) });
  const onPlane = { x: cell(1), y: 0, z: 0 };
  assert.equal(sameGridPoint(mirrorPoint(onPlane, { axis: 'x', offset: cell(1) }), onPlane), true);
  assert.deepEqual(mirrorSurfaceDirection({ x: .5, y: -.25, z: .75 }, { axis: 'y' }), { x: .5, y: .25, z: .75 });
});

test('placement orientation maps JKL rotations and UIO local mirrors to their axes', () => {
  let orientation = placementOrientation();
  orientation = updatePlacementOrientation(orientation, 'j');
  orientation = updatePlacementOrientation(orientation, 'K');
  orientation = updatePlacementOrientation(orientation, 'l');
  assert.deepEqual(orientation.localMirrorAxes, []);
  assert.deepEqual(orientation.rotation, { x: Math.PI / 2, y: Math.PI / 2, z: Math.PI / 2 });
  orientation = updatePlacementOrientation(orientation, 'u');
  orientation = updatePlacementOrientation(orientation, 'i');
  orientation = updatePlacementOrientation(orientation, 'o');
  assert.deepEqual(orientation.localMirrorAxes, ['x', 'y', 'z']);
  assert.equal(updatePlacementOrientation(orientation, 'u').localMirrorAxes.includes('x'), false);
  assert.equal(updatePlacementOrientation(orientation, 'q'), null);
  const document = validateDocument({
    format: 'anymaker-web-project', version: 1,
    objects: [{ id: 'placed', type: 'engine', localMirrorAxes: ['z', 'x'], position: { x: 0, y: 0, z: 0 }, rotation: orientation.rotation, scale: { x: 1, y: 1, z: 1 } }],
  }, new Map([['engine', {}]]));
  assert.deepEqual(document.objects[0].localMirrorAxes, ['x', 'z']);
  assert.match(toIntermediateXml(document), /<local-mirror axes="x z"\/>/);
});

test('native linear component extensions use definition modes, intervals and stretch centres', () => {
  const driveShaft = { mode_z: 'stretch', interval: [0, 0, 1], ext_max: [10, 10, 40], center_stretch: [0, 0, .5] };
  assert.deepEqual(extensionAxes(driveShaft), [{ axis: 'z', index: 2, mode: 'stretch', interval: 1, max: 40 }]);
  assert.deepEqual(updateExtension(driveShaft, [0, 0, 1], 'z', 42), [0, 0, 40]);
  assert.deepEqual(extensionVector(driveShaft, [3, -1, 3]), [3, 0, 3]);
  const stretched = stretchMeshPositions(driveShaft, [0, 0, 3], new Float32Array([0, 0, .04, 0, 0, .041]), CELL_SIZE_WORLD);
  assert.ok(Math.abs(stretched[2] - .04) < 1e-6); assert.ok(Math.abs(stretched[5] - .281) < 1e-6);
  assert.ok(Math.abs(extensionHandlePosition(driveShaft, [0, 0, 3], CELL_SIZE_WORLD)[2] - .28) < 1e-12);
  const engine = { mode_z: 'tile', interval: [0, 0, 2] };
  assert.deepEqual(updateExtension(engine, undefined, 'z', 5), [0, 0, 6]);
  assert.ok(Math.abs(stretchMeshPositions(engine, [0, 0, 6], new Float32Array([0, 0, .2]), CELL_SIZE_WORLD)[2] - .2) < 1e-6);
});

test('tiled component meshes use interior intervals between their two caps', () => {
  const staticMesh = 'meshes/components/engine_block_a_0_0_0.mesh';
  const middle = 'meshes/components/engine_block_a_0_0_1.mesh';
  const end = 'meshes/components/engine_block_a_0_0_2.mesh';
  const definition = { mode_z: 'tile', interval: [0, 0, 2], mesh_static: { mesh_path: staticMesh } };
  const manifest = { entries: { [staticMesh]: {}, [middle]: {}, [end]: {} } };
  const parts = staticMeshParts(definition, { staticMesh }, [0, 0, 4], manifest);
  assert.deepEqual(parts, [
    { path: staticMesh, transform: null },
    { path: middle, transform: { position: [0, 0, 2 * CELL_SIZE_WORLD] } },
    { path: end, transform: { position: [0, 0, 4 * CELL_SIZE_WORLD] } },
  ]);
});

test('tiled Mesh variants join their real local bounds without empty grid cells', () => {
  const parts = [
    { path: 'start.mesh', transform: null },
    { path: 'middle.mesh', transform: { position: [0, 0, .16] } },
    { path: 'end.mesh', transform: { position: [0, 0, .48] } },
  ];
  const mesh = (min, max) => ({ parts: [{ positions: new Float32Array([0, 0, min, 0, 0, max]) }] });
  const stitched = stitchTiledMeshParts(parts, [mesh(-.06, .04), mesh(-.04, .12), mesh(-.04, .06)], { mode_z: 'tile' });
  const positions = stitched.map(part => part.transform?.position?.[2] ?? 0);
  assert.ok(Math.abs(positions[0]) < 1e-12);
  assert.ok(Math.abs(positions[1] - .08) < 1e-6);
  assert.ok(Math.abs(positions[2] - .24) < 1e-6);
});

test('microcontroller state preserves the observed script and typed global variable schema', () => {
  const state = microcontrollerState({
    script: 'on_tick\n{\n  in Light.is_illuminated = out Switch.value > 0.0\n}',
    global_inputs: [{ name: 'enabled', data_value: { _type: 'bool', type: 'type_bool', data_value: true } }],
    global_outputs: [{ name: 'rps', data_value: { _type: 'f64', data_value: 12.5 } }],
    global_private: [],
  });
  assert.equal(state.global_inputs[0].data_value.type, 'type_bool');
  assert.deepEqual(createMicrocontrollerVariable('f64'), { name: 'value', data_value: { _type: 'f64', data_value: 0 } });
  const properties = updateMicrocontrollerState({ user_defined_alias: 'MC' }, state);
  assert.deepEqual(properties.global_outputs, state.global_outputs);
  assert.deepEqual(validateNativeProperties(properties), properties);
  const exported = toNativePairFromEditor({
    objects: [{ id: 'mc', type: 'microcontroller', nativeProperties: properties, position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } }],
    topology: { nodes: [], edges: [], plates: [], links: [] },
  });
  assert.deepEqual(exported.data.vehicles.vehicles[0].grids[0].components[0].global_inputs, state.global_inputs);
  assert.throws(() => microcontrollerState({ script: '', global_inputs: [{ name: 'bad name', data_value: { _type: 'f64' } }], global_outputs: [], global_private: [] }), /variable name/);
  assert.throws(() => microcontrollerState({ script: 42 }), /script/);
});

test('project grids retain empty authored grids and infer structural grid membership', () => {
  const definitions = new Map([['engine', {}]]);
  const object = { id: 'one', type: 'engine', gridId: 'grid-a', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } };
  const document = validateDocument(project([object], { nodes: [], edges: [], plates: [] }, undefined, [{ id: 'grid-empty' }]), definitions);
  assert.deepEqual(document.grids, [{ id: 'grid-empty' }, { id: 'grid-a' }]);
  assert.throws(() => validateDocument(project([], undefined, undefined, [{ id: 'grid-a' }, { id: 'grid-a' }]), definitions), /Duplicate grid ID/);
});

test('grid closure includes touching and linked same-grid structure only', () => {
  const bounds = (x, gridId = 'grid-a') => ({ id: `component-${x}-${gridId}`, gridId, bounds: { min: { x, y: 0, z: 0 }, max: { x: x + 1, y: 1, z: 1 } } });
  const first = bounds(0); const second = bounds(1); const linked = bounds(20); const otherGrid = bounds(1, 'grid-b');
  const result = gridSelectionClosure({
    components: [first, second, linked, otherGrid], startComponentId: first.id, padding: 0,
    topology: { nodes: [{ id: 'node-a', gridId: 'grid-a', position: { x: 0, y: 0, z: 0 } }], edges: [{ id: 'edge-a', gridId: 'grid-a', a: 'node-a', b: 'node-a' }], plates: [], links: [{ from: { componentId: second.id }, to: { componentId: linked.id } }] },
  });
  assert.deepEqual(new Set(result.components), new Set([first.id, second.id, linked.id]));
  assert.equal(result.components.includes(otherGrid.id), false);
  assert.deepEqual(result.topology, [{ kind: 'node', id: 'node-a' }, { kind: 'edge', id: 'edge-a' }]);
});

test('an imported vehicle stages as one collision-free subgrid and keeps its internal offsets', () => {
  const source = {
    objects: [{ id: 'component', type: 'engine', gridId: 'source', position: { x: 1, y: 2, z: 3 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } }],
    topology: {
      nodes: [{ id: 'node-a', gridId: 'source', position: { x: 0, y: 0, z: 0 } }, { id: 'node-b', gridId: 'source', position: { x: 1, y: 0, z: 0 } }],
      edges: [{ id: 'edge', a: 'node-a', b: 'node-b', gridId: 'source' }], plates: [],
      links: [{ id: 'data', kind: 'data', from: { componentId: 'component' }, to: { componentId: 'component-2' }, points: [] }],
    },
  };
  source.objects.push({ ...source.objects[0], id: 'component-2' });
  const staged = stageImportedSubgrid(source, { grids: ['imported-vehicle-1'], components: ['imported-vehicle-2-component-1'] });
  assert.equal(staged.gridId, 'imported-vehicle-2');
  assert.equal(new Set(staged.objects.map(object => object.gridId)).size, 1);
  assert.equal(staged.topology.links[0].from.componentId, staged.objects[0].id);
  const placed = translateImportedSubgrid(staged, { x: 5, y: -2, z: 4 });
  assert.deepEqual(placed.objects[0].position, { x: 6, y: 0, z: 7 });
  const moved = translateSubgridTopology({ ...placed.topology, nodes: [...placed.topology.nodes, { id: 'outside', gridId: 'grid-1', position: { x: 0, y: 0, z: 0 } }] }, placed.objects.map(object => object.id), staged.gridId, { x: 1, y: 0, z: 0 });
  assert.equal(moved.nodes.find(node => node.id === 'outside').position.x, 0);
  assert.equal(moved.nodes[0].position.x, 6);
});

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
  assert.deepEqual(document.objects.find(object => object.id === '553:grid-553-1:124')?.nativeProperties, { throttle: 1, gear_count: 3, user_defined_alias: 'Gear_stick_auto' });
  // Wheel hub meshes have an outboard local tyre offset. Native component
  // rotations must therefore put the left and right hubs on opposite sides.
  assert.ok(Math.abs(document.objects.find(object => object.id === '553:grid-553-1:71')?.rotation.y + Math.PI / 2) < 1e-6);
  assert.ok(Math.abs(document.objects.find(object => object.id === '553:grid-553-1:73')?.rotation.y - Math.PI / 2) < 1e-6);
  const tyres = document.objects.filter(object => object.nativeAccessory?._type === 'wheel_5_prong_tread');
  assert.equal(tyres.length, 4);
  assert.deepEqual(tyres.map(object => object.id).sort(), [
    '553:grid-553-1:71', '553:grid-553-1:72', '553:grid-553-1:73', '553:grid-553-1:75',
  ]);
  assert.equal(document.topology.edges.find(edge => edge.id === 'grid-553-1:grid-553-1-edge-1')?.col, 49);
  assert.equal(document.topology.plates.find(plate => plate.id === 'grid-553-1:1')?.col_front, 26);
  assert.equal(document.topology.plates.some(plate => plate.type === 'window'), true);
  assert.ok(document.objects.some(object => object.id.startsWith('551:')));
  assert.ok(document.objects.some(object => object.id.startsWith('552:')));
  assert.ok(document.objects.some(object => object.id.startsWith('554:')));
  // `hinge_knuckle.constraint_position` is one native cell behind its
  // component origin. Resolving that pivot (rather than averaging component
  // origins) produces one exact rigid offset for every recorded attachment.
  assert.deepEqual(document.topology.nodes.find(node => node.id === 'grid-551-1:1')?.position, { x: 6.72, y: 1.6, z: 19.52 });
  const objectPosition = id => document.objects.find(object => object.id === id)?.position;
  const assertSamePosition = (actual, expected) => assert.ok(['x', 'y', 'z'].every(axis => Math.abs(actual[axis] - expected[axis]) < 1e-12));
  for (const [parentId, childId] of [
    ['553:grid-553-1:113', '551:grid-551-1:1'],
    ['553:grid-553-1:178', '552:grid-552-1:1'],
    ['553:grid-553-1:200', '554:grid-554-1:1'],
    ['553:grid-553-1:201', '554:grid-554-1:2'],
  ]) {
    const child = objectPosition(childId);
    assertSamePosition(objectPosition(parentId), { ...child, z: child.z + .08 });
  }
  for (const [parentId, childId] of [
    ['553:grid-553-1:177', '551:grid-551-1:24'],
    ['553:grid-553-1:179', '552:grid-552-1:5'],
    ['553:grid-553-1:204', '554:grid-554-1:4'],
  ]) assertSamePosition(objectPosition(parentId), objectPosition(childId));
  // Grid 2 is a local dashboard construction plane. Its origin/dir frame
  // rotates the z=129–131 local positions into the primary vehicle frame;
  // this is intentionally independent of the data-link routing records.
  const dashboard = document.objects.filter(object => object.id.startsWith('553:grid-553-2:'));
  assert.equal(dashboard.length, 5);
  const dashboardDisplay = document.objects.find(object => object.id === '553:grid-553-2:180');
  assert.equal(dashboardDisplay?.nativeProjected, true);
  assert.ok(Math.abs(dashboardDisplay.position.x - 5.28) < 1e-12);
  assert.ok(Math.abs(dashboardDisplay.position.y - 2.2314855054991165) < 1e-12);
  assert.ok(Math.abs(dashboardDisplay.position.z - 19.25102139319956) < 1e-12);
  const primaryBounds = JSON.parse(meta).vehicles.vehicles.find(vehicle => vehicle.id === 553).bounds;
  assert.ok(dashboard.every(object => ['x', 'y', 'z'].every((axis, index) => object.position[axis] >= primaryBounds.min[index] && object.position[axis] <= primaryBounds.max[index])));
  const validated = validateDocument(document, catalogDefinitions);
  assert.equal(validated.objects.length, 159);
  assert.equal(validated.topology.edges.length, 493);
});

test('translations interpolate values once and do not translate untrusted parameter text', () => {
  setLocale('en');
  assert.equal(t('保存载具'), 'Save vehicle');
  assert.equal(t('准备放置：{name}', { name: '<img src=x> {count}' }), 'Ready to place: <img src=x> {count}');
  assert.equal(t('__proto__'), '__proto__');
  setLocale('zh'); assert.equal(t('已复制 {count} 个组件', { count: 2 }), '已复制 2 个组件');
  setLocale('unsupported'); assert.equal(t('保存载具'), 'Save vehicle');
  addMessages({ '测试词条 {value}': 'Test {value}' });
  assert.equal(t('测试词条 {value}', () => ({ value: 7 })), 'Test 7');
  addMessages({ '组件 {id} 没有原生映射': 'Component {id} has no native mapping' });
  assert.equal(t('组件 wheel-1 没有原生映射'), 'Component wheel-1 has no native mapping');
});

test('UI preferences default to English and reject unsafe or unsupported values', () => {
  const defaults = normalizeSettings();
  assert.equal(defaults.language, 'en'); assert.equal(AUTOSAVE_INTERVAL, 60000);
  const value = normalizeSettings({ version: 1, language: 'zh', leftWidth: 1e9, rightWidth: 1e9, gridColor: 'url(evil)', gridOpacity: -1, snap: '1', camera: { position: [0, 0, 0], target: [0, 0, 0] }, sidebarTabs: { left: 'subgrids', right: 'history' } });
  assert.equal(value.language, 'zh'); assert.equal(value.leftWidth, 304); assert.equal(value.gridColor, defaults.gridColor);
  assert.equal(value.rightWidth, 304);
  assert.equal(value.gridOpacity, defaults.gridOpacity); assert.equal(Object.hasOwn(value, 'snap'), false); assert.equal(value.camera, null);
  assert.equal(value.sidebarTabs.left, 'subgrids'); assert.equal(value.sidebarTabs.right, 'history');
  assert.equal(defaults.sidebarTabs.left, 'catalog'); assert.equal(defaults.sidebarTabs.right, 'editor');
  assert.equal(defaults.rightWidth, 304);
  assert.equal(defaults.nodeColor, '#246bce'); assert.equal(defaults.nodeSize, .055); assert.equal(defaults.nodeOpacity, 1);
  const nodeStyle = normalizeSettings({ version: 1, nodeColor: '#12Ab34', nodeSize: .12, nodeOpacity: .4 });
  assert.equal(nodeStyle.nodeColor, '#12Ab34'); assert.equal(nodeStyle.nodeSize, .12); assert.equal(nodeStyle.nodeOpacity, .4);
  for (const invalid of [{ nodeColor: 'url(evil)' }, { nodeSize: .01 }, { nodeSize: Infinity }, { nodeOpacity: 2 }, { nodeOpacity: '1' }]) {
    const normalized = normalizeSettings({ version: 1, ...invalid });
    assert.equal(normalized.nodeColor, defaults.nodeColor); assert.equal(normalized.nodeSize, defaults.nodeSize); assert.equal(normalized.nodeOpacity, defaults.nodeOpacity);
  }
  assert.equal(defaults.edgeAxisSnap, false);
  assert.equal(defaults.edgeSize, 1);
  assert.equal(normalizeSettings({ version: 1, edgeSize: 3 }).edgeSize, 3);
  assert.equal(normalizeSettings({ version: 1, edgeSize: 2 }).edgeSize, 1);
  assert.deepEqual(defaults.connectionVisibility, { electric: true, mechanical: true, liquid: true, gas: true, belt: true, data: true });
  assert.equal(defaults.paintColor, '#dddddd');
  assert.deepEqual(defaults.paintQuickColors, ['#dddddd', '#bd2636', '#631a24', '#2b3440', '#20252c']);
  assert.equal(normalizeSettings({ version: 1, paintColor: '#7C3AED' }).paintColor, '#7c3aed');
  assert.deepEqual(normalizeSettings({ version: 1, paintQuickColors: ['#7C3AED', 26] }).paintQuickColors, ['#7c3aed', '#bd2636']);
  assert.deepEqual(normalizeSettings({ version: 1, paintQuickColors: ['#7C3AED', '#bad'] }).paintQuickColors, defaults.paintQuickColors);
  assert.equal(normalizeSettings({ version: 1, edgeAxisSnap: true }).edgeAxisSnap, true);
  assert.equal(normalizeSettings({ version: 1, connectionVisibility: { liquid: false } }).connectionVisibility.liquid, false);
  for (const invalid of ['true', 1, null, {}]) assert.equal(normalizeSettings({ version: 1, edgeAxisSnap: invalid }).edgeAxisSnap, false);
  assert.equal(defaults.edgeLengthsVisible, false);
  assert.equal(normalizeSettings({ version: 1, edgeLengthsVisible: true, leftWidth: 720 }).edgeLengthsVisible, true);
  assert.equal(defaults.edgeOutlinesVisible, false);
  assert.equal(normalizeSettings({ version: 1, edgeOutlinesVisible: true }).edgeOutlinesVisible, true);
  assert.equal(defaults.modelThumbnails, false);
  assert.equal(normalizeSettings({ version: 1, modelThumbnails: true }).modelThumbnails, true);
  for (const invalid of ['true', 1, null, {}]) assert.equal(normalizeSettings({ version: 1, modelThumbnails: invalid }).modelThumbnails, false);
  assert.equal(defaults.placementOrientationIndicator, true);
  assert.equal(normalizeSettings({ version: 1, placementOrientationIndicator: false }).placementOrientationIndicator, false);
  for (const invalid of ['true', 1, null, {}]) assert.equal(normalizeSettings({ version: 1, placementOrientationIndicator: invalid }).placementOrientationIndicator, true);
  assert.equal(defaults.catalogCardSize, 72);
  assert.equal(normalizeSettings({ version: 1, catalogCardSize: 120 }).catalogCardSize, 120);
  assert.equal(normalizeSettings({ version: 1, catalogCardSize: 1000 }).catalogCardSize, defaults.catalogCardSize);
  assert.deepEqual(normalizeSettings({ version: 1, favoriteComponents: ['engine', 'wheel', 'engine', '../unsafe'] }).favoriteComponents, ['engine', 'wheel']);
  assert.deepEqual(normalizeSettings({ version: 1, favoriteComponents: Array.from({ length: 101 }, (_, index) => `part-${index}`) }).favoriteComponents, []);
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
  const edge = project([], createEdgeFromPoints({}, { x: 0, y: 0, z: 0 }, { x: cell(1), y: 0, z: 0 }));
  assert.equal(store.saveProject(empty, validate, 10).ok, true);
  assert.equal(store.saveProject(edge, validate, 20).ok, true);
  assert.deepEqual(store.loadProject(validate).record.document, edge);
  blocked = true;
  assert.equal(store.saveProject(empty, validate, 30).ok, false);
  assert.deepEqual(store.loadProject(validate).record.document, edge);
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
  const overridden = validateDocument(project([{ ...object, definitionOverride: { id: 'engine', display_name: 'Custom engine', settings: { power: 2 } } }]), definitions);
  assert.deepEqual(overridden.objects[0].definitionOverride, { id: 'engine', display_name: 'Custom engine', settings: { power: 2 } });
  assert.throws(() => validateDocument(project([{ ...object, definitionOverride: { id: 'wheel' } }]), definitions), /override ID/);
  assert.throws(() => validateDocument(project([{ ...object, definitionOverride: JSON.parse('{"id":"engine","__proto__":{"polluted":true}}') }]), definitions), /override key/);
  const grouped = validateDocument(project([object], { nodes: [], edges: [], plates: [] }, [{ id: 'visibility-group-1', name: 'Cabin', components: ['1'], edges: [], plates: [] }]), definitions);
  assert.deepEqual(grouped.visibilityGroups, [{ id: 'visibility-group-1', name: 'Cabin', components: ['1'], edges: [], plates: [] }]);
  assert.throws(() => validateDocument(project([object], { nodes: [], edges: [], plates: [] }, [{ id: 'visibility-group-1', name: 'Bad', components: ['missing'], edges: [], plates: [] }]), definitions), /visibility group members/);
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

test('connection port labels remain localized when definitions provide raw data', () => {
  assert.equal(connectionNetworkLabel('electric', 'en'), 'Electric');
  assert.equal(connectionDescriptorLabel('display_value', 'en'), 'Display value');
  assert.equal(connectionPortRoleLabel({ type: 'surface' }, 'en'), 'Physical port');
  assert.equal(connectionDescriptorLabel('自定义描述', 'en'), 'Data port');
  assert.doesNotMatch(connectionPortRoleLabel({ descriptor: '中文节点', type: 'data' }, 'en'), /\p{Script=Han}/u);
  assert.equal(connectionDescriptorLabel('display_value', 'zh'), '显示数值');
  assert.equal(connectionPortRoleLabel({ type: 'surface' }, 'zh'), '物理端口');
});

test('native logic-link ports retain their definition index and wheel node position', () => {
  const wheel = JSON.parse(readFileSync(new URL('../public/data/definitions/wheel.json', import.meta.url), 'utf8'));
  assert.deepEqual(logicNodeCellPosition(logicNodePort(wheel, 2)), [0, 2, 0]);
  assert.equal(logicNodePort(wheel, 2).id, 'brake');
  assert.deepEqual(logicNodePortsForNetwork(wheel, 'mechanical').map(node => node.port), [0, 1, 2]);

  const mixed = { logic_nodes: [
    { id: 'data', type: 'data', pos: [9, 0, 0] },
    { id: 'output', pos: [1, 0, 0] },
    { id: 'input', type: 'mechanical_in', pos: [2, 0, 0] },
  ] };
  assert.deepEqual(logicNodePortsForNetwork(mixed, 'mechanical').map(node => node.port), [1, 2]);
  assert.deepEqual(logicNodeCellPosition(logicNodePort(mixed, 2)), [2, 0, 0]);
  assert.deepEqual(logicNodeCellPosition({ pos: [-1, 2, 1] }, [7, 9, 11], [0, 1, 1]), [-1, 11, 1]);
});

test('published component metadata cannot introduce Chinese into English names or port labels', () => {
  const definitionDirectory = new URL('../public/data/definitions/', import.meta.url);
  for (const file of readdirSync(definitionDirectory)) {
    const definition = JSON.parse(readFileSync(new URL(file, definitionDirectory), 'utf8'));
    assert.doesNotMatch(definition.name, /\p{Script=Han}/u, `${file} must provide an English name`);
    for (const descriptor of definition.data_descriptors || []) {
      assert.doesNotMatch(connectionDescriptorLabel(descriptor.name, 'en'), /\p{Script=Han}/u, `${file}:${descriptor.name}`);
    }
  }
});
test('editor projects export a self-contained observed native data and meta pair', () => {
  const document = project([{ ...object, id: 'component-a', colors: [26], nativeExtension: [2, 0, 0] }], {
    nodes: [
      { id: 'node-a', position: { x: 0, y: 0, z: 0 } },
      { id: 'node-b', position: { x: cell(2), y: 0, z: 0 } },
      { id: 'node-c', position: { x: 0, y: cell(2), z: 0 } },
    ],
    edges: [{ id: 'edge-a', a: 'node-a', b: 'node-b', col: 26 }],
    plates: [{ id: 'plate-a', nodeIds: ['node-a', 'node-b', 'node-c'], col_front: 49, type: 'window' }],
    links: [{ id: 'electric-a', kind: 'electric', from: { componentId: 'component-a', port: 1 }, to: { componentId: 'component-a' }, points: [{ x: cell(1), y: 0, z: 0 }] }],
  });
  const pair = toNativePairFromEditor(document);
  assert.deepEqual(pair.data.definitions.components, ['engine']);
  assert.equal(pair.data.vehicles.vehicles[0].grids[0].components[0].def, 0);
  assert.deepEqual(pair.data.vehicles.vehicles[0].grids[0].components[0].pos, [1, 2, 3]);
  assert.deepEqual(pair.data.vehicles.vehicles[0].grids[0].components[0].colors, [26]);
  assert.deepEqual(pair.data.vehicles.vehicles[0].edges[0], { n0: 1, n1: 2, col: 26 });
  assert.deepEqual(pair.data.vehicles.vehicles[0].plates[0].nodes, [1, 2, 3]);
  assert.equal(pair.data.vehicles.vehicles[0].plates[0].type, 'window');
  assert.deepEqual(pair.data.vehicles.vehicles[0].electric_links[0].points, [[1, 0, 0]]);
  assert.deepEqual(pair.meta.vehicles.vehicles[0].transform, { m: [1, 0, 0, 0, 1, 0, 0, 0, 1], t: [0, 0, 0] });
  const restored = toEditorDocument(parseNativePair(pair.data, pair.meta));
  assert.deepEqual(restored.objects[0].position, object.position);
  assert.equal(restored.topology.edges.length, 1);
  assert.equal(restored.topology.plates.length, 1);
});
test('installed native items remain on their host component and export back into its element', () => {
  const native = {
    definitions: { components: ['wheel'] },
    vehicles: { vehicles: [{ id: 1, grids: [{ components: [{
      def: 0, id: 7, pos: [2, 3, 4],
      element: { acc: { item: { _type: 'wheel_5_prong_tread', id: 42, pattern: 1 } } },
    }] }] }] },
  };
  const document = toEditorDocument(parseNativePair(native, {}));
  const wheel = document.objects.find(object => object.type === 'wheel');
  assert.ok(wheel);
  assert.equal(document.objects.length, 1);
  assert.deepEqual(wheel.nativeAccessory, { _type: 'wheel_5_prong_tread', id: 42, pattern: 1 });
  const validated = validateDocument(document, new Map([['wheel', {}]]));
  const pair = toNativePairFromEditor(validated);
  assert.deepEqual(pair.data.definitions.components, ['wheel']);
  assert.equal(pair.data.vehicles.vehicles[0].grids[0].components.length, 1);
  assert.deepEqual(pair.data.vehicles.vehicles[0].grids[0].components[0].element, native.vehicles.vehicles[0].grids[0].components[0].element);
});
test('regular wheel exposes every verified compatible wheel and tread accessory', () => {
  const types = accessoryOptionsForComponent('wheel');
  assert.deepEqual(types, [
    'wheel_car', 'wheel_quadbike', 'wheel_van', 'wheel_5_prong', 'wheel_5_prong_tread',
    'wheel_rim_20', 'wheel_rim_20_tread', 'wheel_rim_22', 'wheel_rim_22_tread',
    'wheel_rim_24', 'wheel_rim_24_tread', 'wheel4x4',
  ]);
  assert.equal(accessoryOptionsForComponent('wheel_c').length, 0);
  assert.deepEqual(createNativeAccessoryItem('wheel_rim_24_tread', 99), { _type: 'wheel_rim_24_tread', id: 99, pattern: 1 });
  assert.equal(nativeAccessoryDefinition('wheel_rim_24_tread').meshBinding.dynamicMeshes[0].path, 'meshes/components/rim_24_wheel_tread.mesh');
  assert.deepEqual(accessoryOptionsForComponent('battery_a'), ['battery_a']);
  assert.deepEqual(accessoryOptionsForComponent('battery_b'), ['battery_b']);
  assert.deepEqual(createNativeAccessoryItem('battery_a', 100), { _type: 'battery_a', id: 100 });
  assert.deepEqual(nativeAccessoryDefinition('battery_a').meshBinding.dynamicMeshes, [{ index: 0, path: 'meshes/components/battery_a.mesh', addComponentTool: false }]);
});
test('battery cells remain attached to their battery host at the native acc.item path', () => {
  const native = {
    definitions: { components: ['battery_a'] },
    vehicles: { vehicles: [{ id: 1, grids: [{ components: [{
      def: 0, id: 32, pos: [2, 3, 4],
      acc: { item: { _type: 'battery_a', id: 40530, energy: 11337349.474430276 } },
    }] }] }] },
  };
  const document = toEditorDocument(parseNativePair(native, {}));
  const battery = document.objects.find(object => object.type === 'battery_a');
  assert.deepEqual(battery.nativeAccessory, native.vehicles.vehicles[0].grids[0].components[0].acc.item);
  assert.equal(battery.nativeAccessoryContainer, 'acc');
  assert.equal(battery.nativeProperties?.acc, undefined);
  const pair = toNativePairFromEditor(validateDocument(document, new Map([['battery_a', {}]])));
  const exported = pair.data.vehicles.vehicles[0].grids[0].components[0];
  assert.deepEqual(exported.acc, native.vehicles.vehicles[0].grids[0].components[0].acc);
  assert.equal(exported.element, undefined);
});
test('component paint RGB values resolve to deterministic native palette slots', () => {
  assert.equal(nearestNativePaintIndex('#bd2636'), 26);
  assert.equal(nativePaintColor(nearestNativePaintIndex('#bd2636')), '#bd2636');
  assert.equal(nearestNativePaintIndex('bd2636'), null);
});
test('native component properties survive editor validation and native export', () => {
  const document = validateDocument(project([{ ...object, type: 'engine', nativeProperties: { user_defined_alias: 'Port engine', gear_count: 4, enabled: true } }]), definitions);
  assert.deepEqual(document.objects[0].nativeProperties, { user_defined_alias: 'Port engine', gear_count: 4, enabled: true });
  const pair = toNativePairFromEditor(document);
  assert.deepEqual(pair.data.vehicles.vehicles[0].grids[0].components[0].user_defined_alias, 'Port engine');
  assert.equal(pair.data.vehicles.vehicles[0].grids[0].components[0].gear_count, 4);
  assert.equal(pair.data.vehicles.vehicles[0].grids[0].components[0].enabled, true);
  assert.throws(() => validateDocument(project([{ ...object, nativeProperties: { connected_vehicle: 1 } }]), definitions), /property name/);
});
test('tank contents are editable native component properties', () => {
  const document = validateDocument(project([{ ...object, type: 'liquid_tank', nativeProperties: { content: { oil: 4.25, temp: 6 } } }]), new Map([['liquid_tank', {}]]));
  assert.deepEqual(document.objects[0].nativeProperties.content, { oil: 4.25, temp: 6 });
  const pair = toNativePairFromEditor(document);
  assert.deepEqual(pair.data.vehicles.vehicles[0].grids[0].components[0].content, { oil: 4.25, temp: 6 });
});
test('known Properties Tool constraints are available for new component instances', () => {
  const descriptor = componentPropertyDescriptors('gear_stick').find(value => value.key === 'gear_count');
  assert.deepEqual(descriptor, { key: 'gear_count', type: 'integer', step: 1, min: 2, max: 10, defaultValue: 2 });
  assert.deepEqual(updateNativeProperty({}, descriptor, 8), { gear_count: 8 });
  assert.throws(() => updateNativeProperty({}, descriptor, 11), /supported range/);
  const gearbox = componentPropertyDescriptors('gearbox', {}, [0, 0, 2]);
  assert.deepEqual(gearbox.map(value => value.key), ['user_defined_alias', 'gear_ratio_1', 'gear_ratio_2', 'gear_ratio_3', 'gear_ratio_4', 'reverse']);
  assert.deepEqual(updateNativeProperty({}, gearbox[1], 8), { gear_ratio_1: 8 });
  assert.throws(() => updateNativeProperty({}, gearbox[1], 17), /supported range/);
  assert.deepEqual(componentPropertyDescriptors('round_headlight_a').map(value => value.key), ['user_defined_alias', 'tilt_x', 'tilt_y', 'fov']);
  assert.deepEqual(componentPropertyDescriptors('throttle').map(value => value.key), ['user_defined_alias', 'sticky']);
  assert.deepEqual(componentPropertyDescriptors('circular_dial_h').map(value => value.key), ['user_defined_alias', 'light_activation']);
  assert.deepEqual(componentPropertyDescriptors('roller_wheel_suspension_a').map(value => value.key), ['user_defined_alias', 'stiffness', 'damping']);
  const pump = componentPropertyDescriptors('liquid_pump');
  assert.deepEqual(updateNativeProperty({}, pump.find(value => value.key === 'is_reverse'), true), { is_reverse: true });
  assert.deepEqual(componentPropertyDescriptors('differential_gearbox_a').map(value => value.key), ['user_defined_alias', 'input', 'output']);
  const liquidContent = componentPropertyDescriptors('liquid_tank').find(value => value.key === 'content');
  assert.equal(liquidContent.type, 'content');
  assert.deepEqual(liquidContent.options, ['water', 'oil', 'petrol']);
  assert.deepEqual(updateNativeProperty({}, liquidContent, { water: 12.5 }), { content: { water: 12.5 } });
  assert.deepEqual(updateNativeProperty({ content: { water: 12.5, temp: 6 } }, liquidContent, { oil: 4, temp: 6 }), { content: { oil: 4, temp: 6 } });
  assert.deepEqual(componentPropertyDescriptors('gas_tank_c').find(value => value.key === 'content').options, ['air']);
});
test('native export preserves combined XYZ component rotations', () => {
  const rotation = { x: 0.3, y: 0.5, z: -0.7 };
  const pair = toNativePairFromEditor(project([{ ...object, rotation }]));
  const restored = toEditorDocument(parseNativePair(pair.data, pair.meta));
  const actual = restored.objects[0].rotation;
  for (const axis of ['x', 'y', 'z']) assert.ok(Math.abs(actual[axis] - rotation[axis]) < 1e-12, `${axis}: ${actual[axis]} !== ${rotation[axis]}`);
});
test('native surface grids use the game basis and mounting offset without moving vehicle topology', () => {
  const native = { definitions: { components: ['engine'] }, vehicles: { vehicles: [
    { id: 1, nodes: [{ id: 1, pos: [2, 5, 7] }], grids: [{ origin: [10, 20, 30], dir: [0, 3, 4], components: [{ def: 0, id: 1, pos: [2, 5, 7], rot: [1, 0, 0, 0, 1, 0, 0, 0, 1], connected_vehicle: 2, connected_component: 2 }] }], mechanical_links: [{ p0: { comp: 1, pos: 0 }, p1: { comp: 1, pos: 1 }, points: [[2, 5, 7]] }] },
    { id: 2, grids: [{ components: [{ def: 0, id: 2, pos: [3, 4, 5], rot: [1, 0, 0, 0, 1, 0, 0, 0, 1] }] }] },
  ] } };
  const model = parseNativePair(native, {});
  const document = toEditorDocument(model, { vehicleIds: ['1'] });
  const parent = document.objects.find(object => object.id === '1:grid-1-1:1');
  const childAnchor = document.objects.find(object => object.id === '2:grid-2-1:2');

  // GCL get_grid_axis_normals: X = normalize(dir × up) = (-1, 0, 0),
  // Y = (0, .6, .8), Z = X × Y = (0, .8, -.6).
  // get_transform adds node edge midpoint (0, .5, .5) + normal * .5.
  assert.equal(parent.nativeProjected, true);
  assert.ok(Math.abs(parent.position.x - .64) < 1e-12);
  assert.ok(Math.abs(parent.position.y - 2.352) < 1e-12);
  assert.ok(Math.abs(parent.position.z - 2.456) < 1e-12);
  const rotation = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(parent.rotation.x, parent.rotation.y, parent.rotation.z));
  assert.ok(new THREE.Vector3(1, 0, 0).applyMatrix4(rotation).distanceTo(new THREE.Vector3(-1, 0, 0)) < 1e-12);
  assert.ok(new THREE.Vector3(0, 0, 1).applyMatrix4(rotation).distanceTo(new THREE.Vector3(0, .8, -.6)) < 1e-12);
  // Attachment offsets use the already transformed anchors, so a child
  // vehicle's connector occupies exactly the parent's grid-frame position.
  assert.deepEqual(childAnchor.position, parent.position);
  assert.deepEqual(document.topology.nodes[0].position, { x: .16, y: .4, z: .56 });
  assert.deepEqual(document.topology.links[0].points[0], document.topology.nodes[0].position);
  const validated = validateDocument(document, new Map([['engine', {}]]));
  assert.equal(validated.objects.length, 2);
});
test('native base grid defaults, opposite surface normals and mounting offsets follow GCL', () => {
  const identity = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  assert.deepEqual(nativeGridFrame({}), { origin: { x: 0, y: 0, z: 0 }, rotation: identity });
  const cases = [
    [{ x: 1, y: 0, z: 0 }, { x: 11, y: 20, z: 30 }, [0, 1, 0, 0, 0, 1, 1, 0, 0]],
    [{ x: -1, y: 0, z: 0 }, { x: 9, y: 20, z: 30 }, [0, -1, 0, 0, 0, 1, -1, 0, 0]],
    [{ x: 0, y: 1, z: 0 }, { x: 10, y: 21, z: 30 }, identity],
    [{ x: 0, y: -1, z: 0 }, { x: 10, y: 19, z: 30 }, [-1, 0, 0, 0, -1, 0, 0, 0, 1]],
    [{ x: 0, y: 0, z: 1 }, { x: 10, y: 20, z: 31 }, [-1, 0, 0, 0, 0, 1, 0, 1, 0]],
    [{ x: 0, y: 0, z: -1 }, { x: 10, y: 20, z: 29 }, [1, 0, 0, 0, 0, 1, 0, -1, 0]],
  ];
  for (const [dir, origin, rotation] of cases) {
    const frame = nativeGridFrame({ origin: { x: 10, y: 20, z: 30 }, dir });
    assert.deepEqual(frame.origin, origin);
    assert.deepEqual(frame.rotation.map(value => value || 0), rotation);
  }
  const spatial = nativeGridFrame({ dir: { x: -2, y: 3, z: -6 } });
  const expected = { x: -.5 - 1 / 7, y: .5 + 1.5 / 7, z: -.5 - 3 / 7 };
  for (const axis of ['x', 'y', 'z']) assert.ok(Math.abs(spatial.origin[axis] - expected[axis]) < 1e-12);
  const source = { definitions: { components: [] }, vehicles: { vehicles: [{ id: 1, grids: [{}] }] } };
  const model = parseNativePair(source, {});
  assert.deepEqual(model.vehicles[0].grids[0].dir, { x: 0, y: 1, z: 0 });
  assert.deepEqual(toNativePair(model).data, source);
  for (const dir of [[0, 0, 0], [1, 2], [1, .5, 0], ['1', 0, 0]]) {
    source.vehicles.vehicles[0].grids[0].dir = dir;
    assert.throws(() => parseNativePair(source, {}), /Invalid native grid direction/);
  }
});
test('reference door handles align with the game surface grid on both door faces', () => {
  const source = JSON.parse(readFileSync(new URL('../test-vehicle/vehicle.data', import.meta.url)));
  const evidence = JSON.parse(readFileSync(new URL('../doc/evidence/native-grid-transform.json', import.meta.url)));
  const document = toEditorDocument(parseNativePair(source, {}), { vehicleIds: ['553'] });
  for (const expected of evidence.referenceComponents) {
    const object = document.objects.find(value => value.id === expected.id);
    assert.equal(object.type, 'mechanical_handle');
    const rotation = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(object.rotation.x, object.rotation.y, object.rotation.z));
    for (const [index, axis] of ['x', 'y', 'z'].entries()) assert.ok(Math.abs(object.position[axis] - expected.worldPosition[index]) < 1e-12, `${expected.id} ${axis}`);
    const normal = new THREE.Vector3(0, 1, 0).applyMatrix4(rotation);
    assert.ok(normal.distanceTo(new THREE.Vector3(...expected.mountingNormal)) < 1e-12, `${expected.id} mounting normal`);
    // Editing deltas must invert the same frame, without reapplying its origin.
    const grid = { origin: { x: 500, y: -70, z: 900 }, dir: Object.fromEntries(['x', 'y', 'z'].map((axis, index) => [axis, expected.gridDirection[index]])) };
    const delta = nativeGridLocalDelta(grid, { x: normal.x * .08, y: normal.y * .08, z: normal.z * .08 });
    assert.ok(Math.abs(delta.x) < 1e-12 && Math.abs(delta.y - 1) < 1e-12 && Math.abs(delta.z) < 1e-12);
  }
});
test('native child import rejects incompatible rigid attachment anchors', () => {
  const native = { definitions: { components: ['engine'] }, vehicles: { vehicles: [
    { id: 1, grids: [{ components: [
      { def: 0, id: 1, pos: [0, 0, 0], connected_vehicle: 2, connected_component: 1 },
      { def: 0, id: 2, pos: [2, 0, 0], connected_vehicle: 2, connected_component: 2 },
    ] }] },
    { id: 2, grids: [{ components: [
      { def: 0, id: 1, pos: [0, 0, 0] }, { def: 0, id: 2, pos: [0, 0, 0] },
    ] }] },
  ] } };
  assert.throws(() => toEditorDocument(parseNativePair(native, {}), { vehicleIds: ['1'] }), /incompatible construction attachment anchors/);
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
test('opaque render layers use stable depth bias and a unique deterministic draw order', () => {
  assert.equal(depthBias(RENDER_DEPTH_LAYERS.component), -(DEPTH_SUBLAYERS * 2));
  assert.equal(depthBias(RENDER_DEPTH_LAYERS.edge), -(DEPTH_SUBLAYERS * 4));
  assert.equal(depthBias(RENDER_DEPTH_LAYERS.plate), -(DEPTH_SUBLAYERS * 6));
  assert.throws(() => depthBias(RENDER_DEPTH_LAYERS.plate + 1));
  assert.equal(stableDepthRank('component:a'), stableDepthRank('component:a'));
  assert.ok(stableDepthRank('component:a') >= 0 && stableDepthRank('component:a') < DEPTH_SUBLAYERS);
  const opaque = new THREE.MeshBasicMaterial();
  const transparent = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false });
  const root = new THREE.Group();
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(), [opaque, transparent]); root.add(mesh);
  const key = 'edge:stable'; const rank = stableDepthRank(key);
  configureOpaqueDepthLayer(root, RENDER_DEPTH_LAYERS.edge, { key });
  assert.equal(mesh.renderOrder, RENDER_DEPTH_LAYERS.edge * DEPTH_SUBLAYERS + rank);
  assert.equal(opaque.polygonOffset, true); assert.equal(opaque.polygonOffsetFactor, 0); assert.equal(opaque.polygonOffsetUnits, depthBias(RENDER_DEPTH_LAYERS.edge, rank));
  assert.equal(transparent.polygonOffset, false);
  const shader = { fragmentShader: '#include <logdepthbuf_fragment>' };
  opaque.onBeforeCompile(shader);
  assert.match(shader.fragmentShader, /gl_FragDepth = clamp/);
  assert.equal(logDepthBias(RENDER_DEPTH_LAYERS.edge, rank), -((RENDER_DEPTH_LAYERS.edge + 1) * LOG_DEPTH_LAYER_STEP + rank * LOG_DEPTH_SUBLAYER_STEP));
  assert.match(shader.fragmentShader, new RegExp(logDepthBias(RENDER_DEPTH_LAYERS.edge, rank).toExponential()));
  const collidingKey = Array.from({ length: 256 }, (_, index) => `edge:collision-${index}`).find(value => value !== key && stableDepthRank(value) === rank);
  assert.ok(collidingKey);
  const other = new THREE.Group();
  other.add(new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial()));
  assert.equal(assignOpaqueDepthOrder([
    { object: root, layer: RENDER_DEPTH_LAYERS.edge, key },
    { object: other, layer: RENDER_DEPTH_LAYERS.edge, key: collidingKey },
  ]), 2);
  assert.notEqual(mesh.renderOrder, other.children[0].renderOrder);
  assert.deepEqual([mesh.renderOrder, other.children[0].renderOrder].sort((a, b) => a - b), [0, 1]);
  other.children[0].geometry.dispose(); other.children[0].material.dispose();
  mesh.geometry.dispose(); opaque.dispose(); transparent.dispose();
});
test('wheel tyre visual parts move one cell outward along the suspension local axis', () => {
  const transform = { position: [0, .1, .29], previewRotation: [1, 0, 0, 0, 0, -1, 0, 1, 0] };
  const adjusted = withWheelTyreOffset(transform, 'meshes/components/car_wheel.mesh');
  assert.deepEqual(adjusted.position, [0, .1, .29 + WHEEL_TYRE_OUTBOARD_OFFSET]);
  assert.equal(adjusted.previewRotation, transform.previewRotation);
  assert.equal(withWheelTyreOffset(transform, 'meshes/components/wheel_hub_a_hub.mesh'), transform);
});
test('edge splitting inserts the new node into every affected panel boundary', () => {
  const a = { x: 0, y: 0, z: 0 }; const b = { x: cell(2), y: 0, z: 0 };
  const c = { x: cell(2), y: cell(2), z: 0 }; const d = { x: 0, y: cell(2), z: 0 };
  let state = createEdgeFromPoints({}, a, b);
  state = createEdgeFromPoints(state, b, c); state = createEdgeFromPoints(state, c, d); state = createEdgeFromPoints(state, d, a);
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
  assert.deepEqual(LINK_RENDER_STYLES, {
    electric: { radius: .009, radialSegments: 8 }, mechanical: { radius: .022, radialSegments: 8 },
    liquid: { radius: .021, radialSegments: 8 }, gas: { radius: .019, radialSegments: 8 },
    belt: { radius: .014, radialSegments: 8 }, data: { radius: .0075, radialSegments: 8 },
  });
  const componentIds = new Set(['source', 'target']);
  let links = [];
  for (const kind of LINK_KINDS) {
    const result = createLink(links, { kind, from: { componentId: 'source', port: 0 }, to: { componentId: 'target', port: 1 }, points: [{ x: cell(1), y: 0, z: 0 }] }, componentIds);
    links = result.links;
  }
  assert.equal(validateLinks(links, componentIds).length, LINK_KINDS.length);
  assert.equal(links[0].paintColor, undefined);
  const painted = validateLinks([{ ...links[0], paintColor: '#AbC123' }], componentIds)[0];
  assert.equal(painted.paintColor, '#abc123');
  assert.throws(() => validateLinks([{ ...links[0], paintColor: 'red' }], componentIds), /Hex RGB/);
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
test('edge creation is atomic and reuses logical endpoints', () => {
  const empty = { nodes: [], edges: [], plates: [] };
  const a = { x: 0, y: cell(2), z: cell(1) }; const b = { x: cell(3), y: cell(2), z: cell(1) }; const c = { x: cell(3), y: cell(5), z: cell(1) };
  const first = createEdgeFromPoints(empty, a, b);
  assert.deepEqual(empty, { nodes: [], edges: [], plates: [] });
  assert.equal(first.nodes.length, 2); assert.equal(first.edges.length, 1);
  const second = createEdgeFromPoints(first, b, c);
  assert.equal(second.nodes.length, 3); assert.equal(second.edges.length, 2);
  assert.equal(second.edges[0].b, second.edges[1].a);
  const painted = createEdgeFromPoints(empty, a, b, { color: '#dddddd' });
  assert.equal(painted.edges[0].color, '#dddddd');
  const wide = createEdgeFromPoints(empty, a, b, { size: 3 });
  assert.equal(wide.edges[0].size, 3);
  assert.throws(() => validateTopologyState({ ...wide, edges: [{ ...wide.edges[0], size: 2 }] }), /截面尺寸/);
  const before = structuredClone(first);
  assert.throws(() => createEdgeFromPoints(first, b, a), /已存在/);
  assert.throws(() => createEdgeFromPoints(first, c, c), /不同节点/);
  assert.throws(() => createEdgeFromPoints(first, c, { x: Infinity, y: 0, z: 0 }), /坐标/);
  assert.deepEqual(first, before);
  assert.deepEqual(validateDocument(project([], second), definitions).topology, second);
});
test('panels are created from one closed edge loop with a finite normal offset', () => {
  const a = { x: 0, y: 0, z: 0 }; const b = { x: cell(2), y: 0, z: 0 };
  const c = { x: cell(2), y: cell(2), z: 0 }; const d = { x: 0, y: cell(2), z: 0 };
  let state = createEdgeFromPoints({}, a, b);
  state = createEdgeFromPoints(state, b, c); state = createEdgeFromPoints(state, c, d); state = createEdgeFromPoints(state, d, a);
  const edgeIds = state.edges.map(edge => edge.id);
  const result = createPlateFromEdges([], [edgeIds[0], edgeIds[3], edgeIds[2], edgeIds[1]], state.edges, state.nodes, {
    normalOffset: CELL_SIZE_WORLD / 2,
    surfaceDirection: { x: .2, y: .3, z: .4 },
  });
  assert.equal(result.plate.nodeIds.length, 4);
  assert.equal(result.plate.normalOffset, CELL_SIZE_WORLD / 2);
  const validated = validateTopologyState({ ...state, plates: result.plates }).plates;
  assert.ok(Math.abs(Math.hypot(validated[0].surfaceDirection.x, validated[0].surfaceDirection.y, validated[0].surfaceDirection.z) - 1) < 1e-9);
  assert.throws(() => createPlateFromEdges([], edgeIds.slice(0, 3), state.edges, state.nodes), /闭合环/);
  assert.throws(() => createPlate([], result.plate.nodeIds, state.nodes, { normalOffset: Infinity }), /法向偏移/);
  assert.throws(() => createPlate([], result.plate.nodeIds, state.nodes, { surfaceDirection: { x: 2, y: 0, z: 0 } }), /镜头方向/);
  assert.throws(() => validateTopologyState({ ...state, edges: [{ ...state.edges[0], col: 256 }] }), /颜色编号/);
});
test('glass panels use the observed window type on the same closed edge loop', () => {
  const a = { x: 0, y: 0, z: 0 }; const b = { x: cell(2), y: 0, z: 0 };
  const c = { x: cell(2), y: cell(2), z: 0 }; const d = { x: 0, y: cell(2), z: 0 };
  let state = createEdgeFromPoints({}, a, b);
  state = createEdgeFromPoints(state, b, c); state = createEdgeFromPoints(state, c, d); state = createEdgeFromPoints(state, d, a);
  const result = createGlassPlateFromEdges([], state.edges.map(edge => edge.id), state.edges, state.nodes, { normalOffset: CELL_SIZE_WORLD / 2 });
  assert.equal(result.plate.type, 'window');
  assert.equal(result.plate.nodeIds.length, 4);
  assert.equal(validateTopologyState({ ...state, plates: result.plates }).plates[0].type, 'window');
  assert.throws(() => createPlateFromEdges(result.plates, state.edges.map(edge => edge.id), state.edges, state.nodes), /已有面板或玻璃/);
  assert.throws(() => validateTopologyState({ ...state, plates: [{ ...result.plate, type: 'opaque' }] }), /类型/);
});
test('solid edges reject zero length and off-axis or endpoint splits', () => {
  const state = createEdgeFromPoints({}, { x: 0, y: cell(2), z: 0 }, { x: cell(4), y: cell(2), z: 0 });
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
test('edge meshes fill axis-aligned endpoint cubes and bridge facing square corners', () => {
  const material = new THREE.MeshBasicMaterial();
  const axisEnds = [new THREE.Vector3(4, 0, 0), new THREE.Vector3(-4, 0, 0), new THREE.Vector3(0, 4, 0), new THREE.Vector3(0, -4, 0), new THREE.Vector3(0, 0, 4), new THREE.Vector3(0, 0, -4)];
  const planar = new THREE.Vector3(4, 4, 0);
  for (const offset of [...axisEnds, planar, new THREE.Vector3(3, 4, 5)]) {
    const start = new THREE.Vector3(1, 2, 3); const end = offset.clone().add(start);
    const edge = createEdgeMesh(start, end, material);
    assert.equal(edge.isMesh, true); assert.equal(edge.geometry.type, 'BufferGeometry');
    assert.deepEqual(edge.quaternion.toArray(), [0, 0, 0, 1]);
    assert.deepEqual(edge.scale.toArray(), [1, 1, 1]);
    const worldVertices = [];
    const attribute = edge.geometry.getAttribute('position');
    for (let index = 0; index < attribute.count; index++) worldVertices.push(edge.localToWorld(new THREE.Vector3().fromBufferAttribute(attribute, index)));
    for (const endpoint of [start, end]) {
      for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) {
        const corner = endpoint.clone().add(new THREE.Vector3(x, y, z).multiplyScalar(CELL_SIZE_WORLD / 2));
        assert.ok(worldVertices.some(vertex => vertex.distanceTo(corner) < 1e-6));
      }
    }
    edge.geometry.computeBoundingBox();
    const expectedMin = start.clone().min(end).addScalar(-CELL_SIZE_WORLD / 2);
    const expectedMax = start.clone().max(end).addScalar(CELL_SIZE_WORLD / 2);
    assert.ok(edge.geometry.boundingBox.min.clone().add(edge.position).distanceTo(expectedMin) < 1e-6);
    assert.ok(edge.geometry.boundingBox.max.clone().add(edge.position).distanceTo(expectedMax) < 1e-6);
    edge.geometry.dispose();
  }
  material.dispose();
});

test('wide edge meshes use three-cell endpoint cubes and retain their size when split', () => {
  const material = new THREE.MeshBasicMaterial();
  const start = new THREE.Vector3(); const end = new THREE.Vector3(CELL_SIZE_WORLD * 4, 0, 0);
  const edge = createEdgeMesh(start, end, material, { size: 3 });
  edge.geometry.computeBoundingBox();
  assert.equal(edge.userData.edgeSize, 3);
  assert.ok(edge.geometry.boundingBox.min.clone().add(edge.position).distanceTo(new THREE.Vector3(-CELL_SIZE_WORLD * 1.5, -CELL_SIZE_WORLD * 1.5, -CELL_SIZE_WORLD * 1.5)) < 1e-6);
  assert.ok(edge.geometry.boundingBox.max.clone().add(edge.position).distanceTo(new THREE.Vector3(CELL_SIZE_WORLD * 5.5, CELL_SIZE_WORLD * 1.5, CELL_SIZE_WORLD * 1.5)) < 1e-6);
  edge.geometry.dispose(); material.dispose();

  const state = createEdgeFromPoints({}, { x: 0, y: 0, z: 0 }, { x: cell(4), y: 0, z: 0 }, { size: 3 });
  const split = splitEdge(state.nodes, state.edges, state.edges[0].id, { x: cell(2), y: 0, z: 0 });
  assert.deepEqual(split.edges.map(value => value.size), [3, 3]);
});

test('connection route points move independently and preserve native projections', () => {
  const componentIds = new Set(['source', 'target']);
  const created = createLink([], { kind: 'electric', from: { componentId: 'source', port: 0 }, to: { componentId: 'target', port: 1 }, points: [{ x: cell(1), y: 0, z: 0 }, { x: cell(2), y: 0, z: 0 }] }, componentIds);
  const moved = moveLinkPoint(created.links, created.link.id, 1, { x: cell(2), y: cell(1), z: 0 }, componentIds);
  assert.deepEqual(moved.links[0].points, [{ x: cell(1), y: 0, z: 0 }, { x: cell(2), y: cell(1), z: 0 }]);
  assert.throws(() => moveLinkPoint(created.links, created.link.id, 0, { x: cell(1) + .001, y: 0, z: 0 }, componentIds), /对齐/);
  const native = moveLinkPoint([{ ...created.link, nativeProjected: true, points: [{ x: .25, y: 0, z: 0 }] }], created.link.id, 0, { x: .5, y: .25, z: 0 }, componentIds);
  assert.deepEqual(native.links[0].points[0], { x: .5, y: .25, z: 0 });
});
test('edge connections use the complete projected node-cube silhouette', () => {
  const halfSize = CELL_SIZE_WORLD / 2;
  for (const direction of [
    new THREE.Vector3(4, 0, 0), new THREE.Vector3(-4, 0, 0),
    new THREE.Vector3(4, 3, 0), new THREE.Vector3(-4, 3, 0),
    new THREE.Vector3(4, 3, 2), new THREE.Vector3(-4, 3, -2),
  ]) {
    const start = edgeConnectionCorners(new THREE.Vector3(), direction, 1, halfSize);
    const endCenter = direction.clone();
    const end = edgeConnectionCorners(endCenter, direction, -1, halfSize);
    const activeAxisCount = ['x', 'y', 'z'].filter(axis => Math.abs(direction[axis]) > 1e-9).length;
    const expectedCount = activeAxisCount === 3 ? 6 : 4;
    assert.equal(start.length, expectedCount); assert.equal(end.length, expectedCount);
    for (const [points, center] of [[start, new THREE.Vector3()], [end, endCenter]]) {
      for (const point of points) for (const axis of ['x', 'y', 'z']) {
        assert.ok(Math.abs(Math.abs(point[axis] - center[axis]) - halfSize) < 1e-9);
      }
    }
    const projectedWidth = Math.max(...start.flatMap((point, index) => start.slice(index + 1).map(other => point.distanceTo(other))));
    if (activeAxisCount > 1) assert.ok(projectedWidth > CELL_SIZE_WORLD);
    const unit = direction.clone().normalize();
    for (let index = 0; index < expectedCount; index++) {
      const connection = end[index].clone().sub(start[index]);
      assert.ok(connection.clone().cross(unit).length() < 1e-9);
      assert.ok(connection.dot(unit) >= -1e-9);
    }
  }
});
test('spatial diagonal edge bridge has finite projected geometry', () => {
  const edge = createEdgeMesh(new THREE.Vector3(), new THREE.Vector3(CELL_SIZE_WORLD * 3, CELL_SIZE_WORLD * 2, CELL_SIZE_WORLD), new THREE.MeshBasicMaterial());
  assert.equal(edge.geometry.getAttribute('position').count, 108);
  for (const attributeName of ['position', 'normal']) {
    const attribute = edge.geometry.getAttribute(attributeName);
    for (let index = 0; index < attribute.count; index++) assert.ok(Number.isFinite(attribute.getX(index) + attribute.getY(index) + attribute.getZ(index)));
  }
  edge.geometry.dispose(); edge.material.dispose();
});
test('plate surfaces use the camera-facing vertices of their node cubes', () => {
  const size = CELL_SIZE_WORLD * 4;
  const positions = new Map([
    ['a', new THREE.Vector3(0, 0, 0)], ['b', new THREE.Vector3(size, 0, 0)],
    ['c', new THREE.Vector3(size, size, 0)], ['d', new THREE.Vector3(0, size, 0)],
  ]);
  const ids = ['a', 'b', 'c', 'd'];
  assert.equal(cameraFacingPlateOffset(ids, positions, new THREE.Vector3(0, 0, 10)), CELL_SIZE_WORLD / 2);
  assert.equal(cameraFacingPlateOffset(ids, positions, new THREE.Vector3(0, 0, -10)), -CELL_SIZE_WORLD / 2);
  const boundary = plateSurfaceBoundary(ids, positions, { surfaceDirection: new THREE.Vector3(0, 0, 1) });
  assert.equal(boundary.length, ids.length);
  const expectedBoundary = [
    [-CELL_SIZE_WORLD / 2, -CELL_SIZE_WORLD / 2, CELL_SIZE_WORLD / 2],
    [size + CELL_SIZE_WORLD / 2, -CELL_SIZE_WORLD / 2, CELL_SIZE_WORLD / 2],
    [size + CELL_SIZE_WORLD / 2, size + CELL_SIZE_WORLD / 2, CELL_SIZE_WORLD / 2],
    [-CELL_SIZE_WORLD / 2, size + CELL_SIZE_WORLD / 2, CELL_SIZE_WORLD / 2],
  ];
  boundary.forEach((point, index) => point.toArray().forEach((value, axis) => {
    assert.ok(Math.abs(value - expectedBoundary[index][axis]) < 1e-9);
  }));
  const front = plateSurfaceVertices(ids, positions, { surfaceDirection: new THREE.Vector3(0, 0, 1) });
  const frontCorners = Array.from({ length: front.length / 3 }, (_, index) => front.slice(index * 3, index * 3 + 3));
  const uniqueFront = [...new Map(frontCorners.map(point => [point.join(','), point])).values()];
  assert.equal(uniqueFront.length, 4);
  uniqueFront.forEach(point => assert.ok(
    point[0] <= -CELL_SIZE_WORLD / 2 + 1e-9 || point[0] >= size + CELL_SIZE_WORLD / 2 - 1e-9,
  ));
  const back = plateSurfaceVertices(ids, positions, { surfaceDirection: new THREE.Vector3(0, 0, -1) });
  assert.ok(back.every((value, index) => index % 3 !== 2 || Math.abs(value + CELL_SIZE_WORLD / 2) < 1e-9));
});
test('plate surfaces choose the true nearest corner on spatial diagonal closures', () => {
  const positions = new Map([
    ['a', new THREE.Vector3(0, 0, 0)],
    ['b', new THREE.Vector3(CELL_SIZE_WORLD * 3, CELL_SIZE_WORLD, CELL_SIZE_WORLD)],
    ['c', new THREE.Vector3(CELL_SIZE_WORLD * 2, CELL_SIZE_WORLD * 4, CELL_SIZE_WORLD * 2)],
    ['d', new THREE.Vector3(-CELL_SIZE_WORLD, CELL_SIZE_WORLD * 2, CELL_SIZE_WORLD)],
  ]);
  const direction = new THREE.Vector3(3, 2, 1).normalize();
  for (const ids of [['a', 'b', 'c'], ['a', 'b', 'c', 'd']]) {
    const boundary = plateSurfaceBoundary(ids, positions, { surfaceDirection: direction });
    assert.equal(boundary.length, ids.length);
    assert.ok(boundary.every(point => point.toArray().every(Number.isFinite)));
    boundary.forEach((point, index) => {
      const source = positions.get(ids[index]);
      for (const axis of ['x', 'y', 'z']) assert.ok(Math.abs(point[axis] - source[axis] - CELL_SIZE_WORLD / 2) < 1e-9);
    });
    const vertices = plateSurfaceVertices(ids, positions, { surfaceDirection: direction });
    assert.ok(vertices.length >= 9 && vertices.every(Number.isFinite));
  }
});
test('plate boundaries never add non-node-cube miter points at acute closures', () => {
  const positions = new Map([
    ['a', new THREE.Vector3(0, 0, 0)],
    ['b', new THREE.Vector3(.8, 0, 0)],
    ['c', new THREE.Vector3(.01, .08, 0)],
  ]);
  const ids = ['a', 'b', 'c'];
  const boundary = plateSurfaceBoundary(ids, positions, { surfaceDirection: new THREE.Vector3(0, 0, 1) });
  assert.equal(boundary.length, ids.length);
  boundary.forEach((point, index) => {
    const source = positions.get(ids[index]);
    for (const axis of ['x', 'y', 'z']) assert.ok(
      Math.abs(Math.abs(point[axis] - source[axis]) - CELL_SIZE_WORLD / 2) < 1e-9,
      `${axis} is not a node-cube vertex`,
    );
  });
});
test('plate creation direction preserves the camera-facing side across later redraws', () => {
  const positions = new Map([
    ['a', new THREE.Vector3(0, 0, 0)], ['b', new THREE.Vector3(.32, .08, .08)],
    ['c', new THREE.Vector3(.32, .32, .16)], ['d', new THREE.Vector3(0, .24, .08)],
  ]);
  const ids = ['a', 'b', 'c', 'd'];
  const direction = cameraFacingPlateDirection(ids, positions, new THREE.Vector3(4, 3, 2));
  const boundary = plateSurfaceBoundary(ids, positions, { surfaceDirection: direction });
  for (let index = 0; index < boundary.length; index++) {
    assert.ok(boundary[index].clone().sub(positions.get(ids[index])).dot(direction) > 0);
  }
});
test('plate paint follows the ray-visible front or back side', () => {
  const normal = new THREE.Vector3(0, 0, 1);
  const matrix = new THREE.Matrix4();
  assert.equal(rayFacingPlateSide(normal, matrix, new THREE.Vector3(0, 0, -1)), 'front');
  assert.equal(rayFacingPlateSide(normal, matrix, new THREE.Vector3(0, 0, 1)), 'back');
});
test('edge outlines are optional and preserve the edge geometry transform', () => {
  const material = new THREE.MeshBasicMaterial();
  const edge = createEdgeMesh(new THREE.Vector3(), new THREE.Vector3(CELL_SIZE_WORLD, 0, 0), material, { outlined: true });
  const outline = edge.getObjectByName('edge-outline');
  assert.ok(outline?.isLineSegments);
  assert.equal(outline.visible, true);
  setEdgeOutline(edge, false); assert.equal(outline.visible, false);
  setEdgeOutline(edge, true); assert.equal(outline.visible, true);
  outline.geometry.dispose(); outline.material.dispose(); edge.geometry.dispose(); material.dispose();
  const preview = createEdgeMesh(new THREE.Vector3(), new THREE.Vector3(CELL_SIZE_WORLD, 0, 0), new THREE.MeshBasicMaterial());
  setEdgeOutline(preview, true);
  assert.ok(preview.getObjectByName('edge-outline')?.visible);
  preview.traverse(object => { object.geometry?.dispose(); object.material?.dispose(); });
  const emptyPreview = createEdgeMesh(new THREE.Vector3(), new THREE.Vector3(), new THREE.MeshBasicMaterial(), { outlined: true });
  assert.equal(emptyPreview.getObjectByName('edge-outline'), undefined);
  assert.equal(updateEdgeMesh(emptyPreview, new THREE.Vector3(), new THREE.Vector3(CELL_SIZE_WORLD, 0, 0)), true);
  assert.ok(emptyPreview.getObjectByName('edge-outline')?.visible);
  emptyPreview.traverse(object => { object.geometry?.dispose(); object.material?.dispose(); });
});
test('edge joints and connection routes cover shared nodes and route corners', () => {
  const material = new THREE.MeshBasicMaterial();
  const joint = createEdgeJointMesh({ x: cell(2), y: 0, z: cell(-1) }, material);
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
test('component placement moves one block toward the camera from its nearest vehicle hit', () => {
  const vehicle = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
  vehicle.rotation.x = -Math.PI / 2; vehicle.position.y = .5;
  vehicle.updateMatrixWorld(true);
  const pointer = new THREE.Raycaster(new THREE.Vector3(.17, 1, .17), new THREE.Vector3(0, -1, 0));
  const workPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  assert.deepEqual(resolvePlacementPoint(pointer, [vehicle], workPlane).toArray(), [cell(2), cell(7), cell(2)]);
  assert.deepEqual(resolvePlacementPoint(pointer, [], workPlane).toArray(), [cell(2), 0, cell(2)]);
  vehicle.geometry.dispose(); vehicle.material.dispose();
});
test('placement snaps to the outward side of nearby component envelopes', () => {
  const component = new THREE.Mesh(new THREE.BoxGeometry(CELL_SIZE_WORLD, CELL_SIZE_WORLD, CELL_SIZE_WORLD), new THREE.MeshBasicMaterial());
  component.position.set(cell(2), cell(1), cell(2)); component.updateMatrixWorld(true);
  const pointer = new THREE.Raycaster(new THREE.Vector3(cell(2), 1, cell(2) + .065), new THREE.Vector3(0, -1, 0));
  const workPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const point = resolvePlacementPoint(pointer, [], workPlane, { adjacentTargets: [component] });
  assert.deepEqual(point.toArray(), [cell(2), cell(2), cell(3)]);
  component.geometry.dispose(); component.material.dispose();
});
test('edge axis snapping selects every signed world axis on integer cells', () => {
  const camera = new THREE.PerspectiveCamera(45, 1, .01, 2000);
  const start = new THREE.Vector3(cell(2), cell(3), cell(-2));
  camera.position.copy(start).add(new THREE.Vector3(6, 8, 10)); camera.lookAt(start); camera.updateMatrixWorld(true);
  const frame = cameraBuildFrame(camera, start);
  for (const axis of ['x', 'y', 'z']) for (const sign of [-1, 1]) {
    const end = start.clone(); end[axis] += sign * cell(14);
    const ray = new THREE.Ray(camera.position.clone(), end.clone().sub(camera.position).normalize());
    const result = resolveEdgePoint(ray, frame, { axisSnap: true });
    assert.equal(result.axis, axis); assertGridVector(result.point);
    for (const other of ['x', 'y', 'z']) assert.equal(worldToCell(result.point[other]) - worldToCell(start[other]), other === axis ? sign * 14 : 0);
  }
  assert.deepEqual(start.toArray(), [cell(2), cell(3), cell(-2)]);
});
test('edge axis snapping preserves aligned nodes and rejects invalid grid coordinates', () => {
  const camera = new THREE.PerspectiveCamera(); camera.position.set(0, 0, 10); camera.lookAt(0, 0, 0); camera.updateMatrixWorld(true);
  const start = new THREE.Vector3(); const frame = cameraBuildFrame(camera, start);
  const ray = new THREE.Ray(camera.position.clone(), new THREE.Vector3(cell(20), cell(1), -10).normalize());
  const node = { x: cell(15), y: 0, z: 0 };
  assert.deepEqual(resolveEdgePoint(ray, frame, { node, axisSnap: true }).point.toArray(), [cell(15), 0, 0]);
  const offAxis = { x: cell(20), y: cell(1), z: 0 };
  const constrained = resolveEdgePoint(ray, frame, { node: offAxis, axisSnap: true });
  assert.equal(constrained.axis, 'x'); assert.equal(worldToCell(constrained.point.y), 0); assert.equal(worldToCell(constrained.point.z), 0);
  assert.deepEqual(resolveEdgePoint(ray, frame).point.toArray(), projectBuildPoint(ray, frame).toArray());
  assert.deepEqual(resolveEdgePoint(ray, frame, { node: { x: .1, y: 0, z: 0 }, axisSnap: true }).point.toArray(), resolveEdgePoint(ray, frame, { axisSnap: true }).point.toArray());
  const far = resolveEdgePoint(new THREE.Ray(new THREE.Vector3(20000, 0, 10), new THREE.Vector3(0, 0, -1)), frame, { axisSnap: true });
  assert.ok(far); assertGridVector(far.point);
});
test('edge placement follows the shared nearest-hit and XZ work-plane rules', () => {
  const frame = {
    origin: new THREE.Vector3(),
    plane: new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
  };
  const ray = new THREE.Ray(new THREE.Vector3(.17, 1, .17), new THREE.Vector3(0, -1, 0));
  const hitCandidate = new THREE.Vector3(cell(2), cell(6), cell(2));
  assert.deepEqual(resolveEdgePoint(ray, frame, { candidate: hitCandidate }).point.toArray(), hitCandidate.toArray());
  // The item-placement fallback is the y=0 XZ plane, so an edge receives the
  // same candidate instead of an arbitrary camera-facing construction plane.
  const workPlaneCandidate = new THREE.Vector3(cell(2), 0, cell(2));
  assert.deepEqual(resolveEdgePoint(ray, frame, { candidate: workPlaneCandidate }).point.toArray(), workPlaneCandidate.toArray());
  const locked = resolveEdgePoint(ray, frame, { candidate: new THREE.Vector3(cell(5), cell(2), cell(1)), axisSnap: true });
  assert.equal(locked.axis, 'x'); assert.deepEqual(locked.point.toArray(), [cell(5), 0, 0]);
});
test('XYZ edge rulers measure integer grid components without mutating endpoints', () => {
  const start = new THREE.Vector3(cell(10), cell(20), cell(30)); const end = new THREE.Vector3(cell(-10), cell(20), cell(60));
  const measurements = edgeMeasurements(start, end);
  assert.deepEqual(measurements.map(m => m.cells), [20, 0, 30]);
  assert.deepEqual(measurements.map(m => m.length), [cell(20), 0, cell(30)]);
  assert.ok(measurements[0].from.equals(start)); assert.ok(measurements[2].to.equals(end));
  assert.ok(measurements[0].to.equals(measurements[1].from));
  assert.deepEqual(edgeMeasurements(start, start).map(m => m.cells), [0, 0, 0]);
  assert.deepEqual(edgeMeasurements(start, { x: Infinity, y: 0, z: 0 }), []);
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

test('mesh normals are corrected when native winding is reversed', () => {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 1, 0, 0, 0, 1, 0], 3));
  geometry.setIndex([0, 1, 2]);
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute([0, 0, -1, 0, 0, -1, 0, 0, -1], 3));
  assert.equal(correctGeometryNormals(geometry), true);
  assert.deepEqual([...geometry.getAttribute('normal').array].map(value => value === 0 ? 0 : value), [0, 0, 1, 0, 0, 1, 0, 0, 1]);
  geometry.dispose();
});
