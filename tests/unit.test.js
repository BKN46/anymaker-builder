import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeHiddenKinds, isKindVisible } from '../src/editor/type-visibility.js';
import { readFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
import { meshFixture, modelGlbFixture } from './fixtures.js';
import './hydraulic.test.js';
import './inclined.test.js';
import './tracks.test.js';
import './belts.test.js';
import './selection-transform.test.js';
import './subgrids.test.js';
import './plates.test.js';
import './native-import.test.js';
import './native-export.test.js';
import './google-drive.test.js';
import { parseModel } from '../src/assets/model-import.js';
import { simplifyModel, convertModel, modelBounds, MODEL_VERTEX_TARGETS } from '../src/editor/model-conversion.js';
import { prepareModelShell } from '../src/assets/model-shell.js';
import { loftShellSections } from '../src/editor/model-shell-sections.js';

import { parseMesh } from '../src/assets/mesh.js';
import { History, project, validateDocument, migrateDocument, toIntermediateXml } from '../src/editor/document.js';
import { copyObjects, mirrorObjects, moveObjects, removeObjects, splitGrid, mergeGrids, gridIds } from '../src/editor/operations.js';
import { Project, Vehicle, Grid, Component, Node, Edge, Plate, Link, fromEditorDocument, toEditorDocument, toEditorTopology, validateProject, nativeGridFrame, nativeGridLocalDelta } from '../src/editor/model.js';
import { parseNativePair, nativeStats, toNativeData, toNativePair, toNativePairFromEditor, verifyNativePairRoundTrip } from '../src/native/anymaker-data.js';
import { createNode, moveNode, moveNodeAndMerge, mergeNodes, removeNode, removeEdge, removePlate, createEdge, createEdgeFromPoints, splitEdge, createPlate, createPlateFromEdges, createGlassPlateFromEdges, triangulatePlate, validateTopologyState, pruneUnusedTopology } from '../src/editor/topology.js';
import { LINK_COLORS, LINK_KINDS, LINK_RENDER_STYLES, MAX_CONNECTION_ROUTE_SEGMENT, connectionRouteIsSafe, createLink, moveLinkPoint, pruneInvalidConnections, removeLink, validateLinks } from '../src/editor/connections.js';
import * as THREE from 'three';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { correctGeometryNormals, reflectGeometry, reflectVisualBasis } from '../src/assets/geometry-ops.js';
import { applyConnectionInterfaceColors } from '../src/assets/mesh-interface-colors.js';
import { AssetLibrary, disposeObject } from '../src/assets/library.js';
import { NODE_PLACEMENT_BOUNDS, cameraBuildFrame, projectBuildPoint, resolveEdgePoint, resolvePlacementPoint, edgeMeasurements, createEdgeMesh, createEdgeJointMesh, createConnectionRoute, createDashedConnection, updateEdgeMesh, setEdgeOutline, edgeConnectionCorners, plateSurfaceBoundary, plateSurfaceVertices, cameraFacingPlateOffset, cameraFacingPlateDirection, rayFacingPlateSide } from '../src/editor/construction-view.js';
import { CELL_SIZE_WORLD, CELL_SIZE_CM, assertGridVector, cellToWorld, quantizeWorldVector, worldToCell } from '../src/editor/grid.js';
import { categoryInfo } from '../src/catalog/category-icons.js';
import { normalizeSettings, createLocalStore, AUTOSAVE_INTERVAL } from '../src/editor/local-storage.js';
import { applyGridStyle, orientCamera, VIEW_DIRECTIONS } from '../src/editor/view-settings.js';
import { PublishedAssetLibrary, applyMeshTransform, staticMeshParts, stitchTiledMeshParts, WHEEL_TYRE_OUTBOARD_OFFSET, withWheelTyreOffset } from '../src/assets/published-library.js';
import { DEPTH_SUBLAYERS, LOG_DEPTH_LAYER_STEP, LOG_DEPTH_SUBLAYER_STEP, RENDER_DEPTH_LAYERS, assignOpaqueDepthOrder, configureOpaqueDepthLayer, depthBias, logDepthBias, stableDepthRank } from '../src/editor/render-depth.js';
import { t, setLocale, addMessages } from '../src/i18n.js';
import { connectionDescriptorLabel, connectionNetworkLabel, connectionPortRoleLabel } from '../src/editor/connection-port-labels.js';
import { connectionDirectionVector, connectionRouteCellPosition, logicNodePort, logicNodePortsForNetwork, logicNodeCellPosition, orientMechanicalLink } from '../src/editor/connection-ports.js';
import { NATIVE_PORT_COLORS, nativeConnectionPortColor, nativeMechanicalPortRole } from '../src/editor/connection-port-colors.js';
import { componentPropertyDescriptors, updateNativeProperty, validateNativeProperties } from '../src/editor/component-properties.js';
import { nativePaintColor, nearestNativePaintIndex, officialPaintColors } from '../src/editor/native-paint.js';
import { paintColorValue } from '../src/editor/paint-color.js';
import { DEFAULT_PROJECT_NAME, normalizeProjectName, projectFileBaseName } from '../src/editor/project-name.js';
import { isSaveCancelled, saveFilePair, saveSingleFile } from '../src/editor/file-save.js';
import { mirrorPoint, mirrorPositionPreview, mirrorRotation, mirrorSurfaceDirection, moveMirroredNode, sameGridPoint } from '../src/editor/mirror-mode.js';
import { accessoryOptionsForComponent, createNativeAccessoryItem, defaultAccessoryForPlacement, nativeAccessoryDefinition } from '../src/editor/native-accessories.js';
import { extensionAxes, extensionControlValue, extensionHandlePosition, extensionVector, stretchMeshPositions, updateExtension, updateExtensionFromControl, updateExtensionFromDrag } from '../src/editor/component-extension.js';
import { placementOrientation, updatePlacementOrientation } from '../src/editor/placement-orientation.js';
import { EDGE_MICRO_KEYS, edgeMicroKeyBinding, moveEdgeMicroEndpoint } from '../src/editor/edge-micro.js';
import { gridSelectionClosure } from '../src/editor/selection-closure.js';
import { createMicrocontrollerVariable, microcontrollerState, updateMicrocontrollerState } from '../src/editor/microcontroller.js';
import { stageImportedSubgrid, translateImportedSubgrid, translateSubgridTopology } from '../src/editor/imported-subgrid.js';
import { analyzeSubgridIntegrity, partitionSubgrids } from '../src/editor/subgrid-connectivity.js';
import { locatableSubgridErrors } from '../src/editor/subgrid-error-markers.js';
import { LITERS_PER_CELL, tankCapacityCells, tankCapacityLiters } from '../src/editor/tank-capacity.js';
import { encodeProjectCode, decodeProjectCode } from '../src/editor/project-code.js';
import { createFrameTask, planVisualUpdate, topologyVisualRecords, visualSignature } from '../src/editor/visual-cache.js';
import { normalizeRenderQuality, renderPixelRatio, renderQualityPreset, RENDER_QUALITY_DEFAULTS, RENDER_QUALITY_PRESETS, createRenderQualityController } from '../src/editor/render-quality.js';
import { createPlacementPicker, createProjectedNodePicker } from '../src/editor/placement-picking.js';
import { detectMechanicalConnections, reconcileMechanicalConnections, validateMechanicalConnections, NATIVE_MECHANICAL_MATE_RULES } from '../src/editor/mechanical-connections.js';
import { MECHANICAL_MATE_PROFILES } from '../src/editor/mechanical-mate-profiles.js';
import { hingeAssemblyFixture, mateObject } from './mechanical-fixtures.js';

test('published mechanical profiles preserve every supported pair and its source fields', () => {
  const types = [...new Set(NATIVE_MECHANICAL_MATE_RULES.flatMap(rule => [rule.a, rule.b]))].sort();
  assert.deepEqual(Object.keys(MECHANICAL_MATE_PROFILES).sort(), types);
  for (const type of types) {
    const definition = JSON.parse(readFileSync(new URL(`../public/data/definitions/${type}.json`, import.meta.url)));
    for (const [key, value] of Object.entries(MECHANICAL_MATE_PROFILES[type])) assert.deepEqual(value, definition[key], `${type}.${key}`);
    assert.deepEqual(MECHANICAL_MATE_PROFILES[type].constraint_orientations, definition.constraint_orientations);
  }
});

test('aligned mates rebuild after move, copy, deletion and history restoration', () => {
  const objects = [mateObject('pin', 'hinge_pin'), mateObject('knuckle', 'hinge_knuckle', { x: 0, y: 0, z: .08 })];
  const initial = reconcileMechanicalConnections({ nodes: [], edges: [], plates: [], links: [] }, objects);
  assert.equal(initial.mechanicalConnections.length, 1);
  const history = new History({ objects, topology: initial });
  const moved = moveObjects(objects, ['knuckle'], { x: .08, y: 0, z: 0 }).objects;
  const detached = reconcileMechanicalConnections(initial, moved);
  history.commit({ objects: moved, topology: detached });
  assert.equal(detached.mechanicalConnections.length, 0);
  const undone = history.peekUndo();
  assert.deepEqual(reconcileMechanicalConnections(undone.topology, undone.objects), initial);
  const copied = copyObjects(objects, ['pin', 'knuckle'], { x: .8, y: 0, z: 0 });
  const connections = reconcileMechanicalConnections(initial, copied.objects).mechanicalConnections;
  assert.equal(connections.length, 2);
  assert.ok(connections.some(connection => connection.from === copied.idMap.pin && connection.to === copied.idMap.knuckle));
  assert.equal(reconcileMechanicalConnections(initial, removeObjects(objects, ['pin']).objects).mechanicalConnections.length, 0);
  assert.equal(detectMechanicalConnections(objects.map(object => ({ ...object, hidden: true }))).connections.length, 1);
  assert.equal(initial.mechanicalConnections.length, 1, 'original snapshot remains independent');
});

test('mate detection rejects wrong axes, excessive distance, scale and ambiguous sockets', () => {
  const pin = mateObject('pin', 'hinge_pin');
  const knuckle = mateObject('knuckle', 'hinge_knuckle', { x: 0, y: 0, z: .08 });
  assert.equal(detectMechanicalConnections([pin, { ...knuckle, position: { x: .00001, y: 0, z: .08 } }]).connections.length, 0);
  // Rotate about the anchor, keeping its position coincident but its axis wrong.
  const wrongAxis = mateObject('knuckle', 'hinge_knuckle', { x: -.08, y: 0, z: 0 }, { x: 0, y: -Math.PI / 2, z: 0 });
  assert.equal(detectMechanicalConnections([pin, wrongAxis]).connections.length, 0);
  const scaled = detectMechanicalConnections([{ ...pin, scale: { x: 2, y: 2, z: 2 } }, knuckle]);
  assert.equal(scaled.connections.length, 0);
  assert.equal(scaled.diagnostics[0].code, 'scaled-mate');
  const overlaps = [pin, knuckle, { ...knuckle, id: 'duplicate' }];
  const ambiguous = detectMechanicalConnections(overlaps);
  assert.equal(ambiguous.connections.length, 0);
  assert.ok(ambiguous.diagnostics.every(value => value.code === 'ambiguous-mate'));
  assert.throws(() => toNativePairFromEditor({ objects: overlaps }), /ambiguous/);
  const malformed = { ...pin, definitionOverride: { id: 'hinge_pin', constraint_orientations: [[1, 2]] } };
  assert.equal(detectMechanicalConnections([malformed, knuckle]).diagnostics[0].code, 'invalid-mate-definition');
  assert.throws(() => toNativePairFromEditor({ objects: [malformed, knuckle] }), /invalid-mate-definition/);
});

test('mounting mates persist both orientation indices and reciprocal body references', () => {
  // Native Ca = +90 degrees about Y; Cb = 180 degrees about X.
  const native = { definitions: { components: ['mounting_pin', 'mounting_knuckle'] }, vehicles: { vehicles: [{ id: 1, grids: [{ components: [
    { id: 1, def: 0, pos: [0, 0, 0], rot: [1, 0, 0, 0, 1, 0, 0, 0, 1] },
    { id: 2, def: 1, pos: [0, 0, 0], rot: [0, 0, -1, 0, -1, 0, -1, 0, 0] },
  ] }] }] } };
  const document = toEditorDocument(parseNativePair(native, {}));
  const connection = detectMechanicalConnections(document.objects).connections[0];
  assert.deepEqual(connection.orientationIndices, [1, 1]);
  assert.deepEqual(validateMechanicalConnections([connection])[0].orientationIndices, [1, 1]);
  assert.throws(() => validateMechanicalConnections([{ ...connection, orientationIndices: [32, 0] }]), /orientation/);
  const output = toNativePairFromEditor(document, { vehicleId: 7 });
  const bodies = output.data.vehicles.vehicles;
  assert.equal(bodies.length, 2);
  const a = bodies[0].grids[0].components[0]; const b = bodies[1].grids[0].components[0];
  assert.equal(a.con_orient_index, 1); assert.equal(b.con_orient_index, 1);
  assert.deepEqual([a.connected_vehicle, a.connected_component], [8, b.id]);
  assert.deepEqual([b.connected_vehicle, b.connected_component], [7, a.id]);
  assert.equal(toEditorDocument(parseNativePair(output.data, output.meta), { vehicleIds: ['7'] }).objects.length, 2);
});

test('hinge export separates subgrids and preserves geometry, paint and reciprocal references', () => {
  const source = hingeAssemblyFixture(); const original = structuredClone(source);
  const document = toEditorDocument(parseNativePair(source, {}));
  const before = structuredClone(document);
  const pair = toNativePairFromEditor(document);
  const bodies = pair.data.vehicles.vehicles;
  assert.equal(bodies.length, 2);
  assert.deepEqual(bodies.map(body => body.nodes.length), [2, 2]);
  assert.deepEqual(bodies.map(body => body.edges.length), [1, 1]);
  for (const body of bodies) {
    assert.equal(body.grids[0].components.length, 1);
    assert.equal(body.mechanical_links.length, 0);
    const component = body.grids[0].components[0];
    assert.notEqual(component.connected_vehicle, body.id);
    const mate = bodies.find(candidate => candidate.id === component.connected_vehicle).grids[0].components.find(candidate => candidate.id === component.connected_component);
    assert.equal(mate.connected_vehicle, body.id); assert.equal(mate.connected_component, component.id);
    assert.ok(body.edges.every(edge => body.nodes.some(node => node.id === edge.n0) && body.nodes.some(node => node.id === edge.n1)));
  }
  const restored = toEditorDocument(parseNativePair(pair.data, pair.meta), { vehicleIds: ['1'] });
  assert.equal(restored.topology.mechanicalConnections.length, 1);
  for (const object of document.objects) {
    const match = restored.objects.find(value => value.type === object.type);
    assert.deepEqual(match.colors, object.colors);
    for (const axis of ['x', 'y', 'z']) assert.ok(Math.abs(match.position[axis] - object.position[axis]) < 1e-10);
  }
  assert.deepEqual(document, before); assert.deepEqual(source, original);
  pair.data.vehicles.vehicles[0].transform.t[0] = 5;
  assert.equal(pair.data.vehicles.vehicles[1].transform.t[0], 0);
});

test('rail and ballscrew export multiple sliders and preserve travel when importing one root', () => {
  for (const [railType, sliderType] of [['rail', 'rail_slider'], ['rail_ballscrew', 'rail_ballscrew_slider']]) {
    const objects = [
      { ...mateObject('rail', railType), nativeExtension: [0, 0, 8], nativeProperties: { connected_components: [{ connected_vehicle: 999, connected_component: 999 }] } },
      mateObject('first', sliderType, { x: 0, y: 0, z: .16 }),
      mateObject('last', sliderType, { x: 0, y: 0, z: .56 }),
    ];
    const found = detectMechanicalConnections(objects);
    assert.equal(found.connections.length, 2); assert.equal(found.diagnostics.length, 0);
    assert.equal(detectMechanicalConnections([objects[0], { ...objects[1], position: { x: .08, y: 0, z: .16 } }]).connections.length, 0);
    assert.equal(detectMechanicalConnections([objects[0], { ...objects[1], position: { x: 0, y: 0, z: 1.6 } }]).connections.length, 0);
    const pair = toNativePairFromEditor({ objects });
    assert.equal(pair.data.vehicles.vehicles.length, 3);
    const main = pair.data.vehicles.vehicles.find(body => body.grids[0].components.some(component => component.def === 0));
    const rail = main.grids[0].components[0];
    assert.equal(rail.connected_components.length, 2);
    assert.equal(rail.connected_vehicle, undefined);
    for (const ref of rail.connected_components) {
      const body = pair.data.vehicles.vehicles.find(value => value.id === ref.connected_vehicle);
      const slider = body.grids[0].components.find(value => value.id === ref.connected_component);
      assert.equal(slider.connected_component, rail.id); assert.equal(slider.connected_vehicle, main.id);
    }
    const restored = toEditorDocument(parseNativePair(pair.data, pair.meta), { vehicleIds: [String(main.id)] });
    assert.equal(restored.objects.length, 3); assert.equal(restored.topology.mechanicalConnections.length, 2);
    assert.deepEqual(restored.objects.filter(value => value.type === sliderType).map(value => value.position.z), [.16, .56]);
    const single = toNativePairFromEditor({ objects: [objects[0]] });
    assert.equal(single.data.vehicles.vehicles[0].grids[0].components[0].connected_components, undefined);
  }
});

test('latch handles and towing mates export distinct physical bodies without signal links', () => {
  for (const [a, b, position, rotation] of [
    ['latch_pin', 'latch_knuckle', { x: 0, y: 0, z: .08 }],
    ['latch_handle', 'latch_knuckle', { x: 0, y: 0, z: .08 }],
    ['tow_bar', 'tow_hitch', { x: 0, y: 0, z: 0 }],
    ['truck_hitch_kingpin', 'truck_hitch', { x: 0, y: .16, z: 0 }, { x: 0, y: 0, z: Math.PI }],
  ]) {
    const objects = [mateObject('a', a), mateObject('b', b, position, rotation)];
    assert.equal(detectMechanicalConnections(objects).connections.length, 1, a);
    const pair = toNativePairFromEditor({ objects });
    assert.equal(pair.data.vehicles.vehicles.length, 2, a);
    assert.ok(pair.data.vehicles.vehicles.every(body => body.mechanical_links.length === 0));
  }
});

test('physical export reports welded endpoints, cross-body cables and unrepresentable reflections', () => {
  const document = toEditorDocument(parseNativePair(hingeAssemblyFixture(), {}));
  const welded = structuredClone(document);
  welded.topology.edges.push({ id: 'weld', a: welded.topology.nodes[0].id, b: welded.topology.nodes[2].id });
  assert.throws(() => toNativePairFromEditor(welded), /same rigid structure/);
  const cable = structuredClone(document);
  cable.topology.links.push({ id: 'cable', kind: 'electric', from: { componentId: cable.objects[0].id }, to: { componentId: cable.objects[1].id } });
  assert.throws(() => toNativePairFromEditor(cable), /network link crosses/);
  const mirrored = { objects: [mateObject('a', 'hinge_pin'), mateObject('b', 'hinge_knuckle', { x: 0, y: 0, z: .08 })].map(object => ({ ...object, localMirrorAxes: ['x'] })) };
  assert.throws(() => toNativePairFromEditor(mirrored), /reflected/);
});

test('towing uses the game default positive Y axis, free yaw and both directional limits', () => {
  const bar = mateObject('bar', 'tow_bar');
  const hitch = mateObject('hitch', 'tow_hitch', undefined, { x: 0, y: Math.PI * .7, z: 0 });
  assert.equal(detectMechanicalConnections([bar, hitch]).connections.length, 1);
  const tilted = { ...hitch, rotation: { x: Math.PI / 6, y: 0, z: 0 } };
  assert.equal(detectMechanicalConnections([bar, tilted]).connections.length, 1);
  assert.equal(detectMechanicalConnections([bar, { ...hitch, rotation: { x: Math.PI / 3, y: 0, z: 0 } }]).connections.length, 0);
  assert.equal(detectMechanicalConnections([bar, { ...tilted, definitionOverride: { id: 'tow_hitch', tow_hitch_dot_min: .9 } }]).connections.length, 0);
});

test('placement picking caches world bounds and only raycasts the nearest solid candidates', () => {
  const picker = createPlacementPicker();
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  const roots = Array.from({ length: 100 }, (_, index) => {
    const root = new THREE.Group();
    root.position.set(index < 2 ? 0 : index * 2, 0, index === 1 ? -4 : 0);
    root.add(new THREE.Mesh(geometry, material));
    return root;
  });
  let raycasts = 0; let boundsUpdates = 0;
  for (const root of roots) {
    const update = root.updateWorldMatrix;
    root.updateWorldMatrix = function (...args) { boundsUpdates++; return update.apply(this, args); };
    const mesh = root.children[0]; const raycast = mesh.raycast;
    mesh.raycast = function (...args) { raycasts++; return raycast.apply(this, args); };
  }
  const outline = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial());
  outline.raycast = () => assert.fail('placement must not pick editor outlines');
  roots[0].add(outline);
  const raycaster = new THREE.Raycaster(new THREE.Vector3(0, 0, 5), new THREE.Vector3(0, 0, -1));
  for (let index = 0; index < 50; index++) {
    raycaster.ray.origin.x = (index % 10) * .01;
    const hit = picker.firstHit(raycaster, roots);
    assert.equal(hit.object, roots[0].children[0]);
    assert.equal(hit.distance, 4.5);
  }
  assert.equal(raycasts, 50, 'one narrow-phase mesh query per pointer sample, not 100');
  assert.equal(boundsUpdates, 100, 'each root computes bounds once across 50 samples');
  roots[0].position.x = 3;
  picker.invalidate();
  assert.equal(picker.firstHit(raycaster, roots).object, roots[1].children[0]);
  roots[1].visible = false;
  assert.equal(picker.firstHit(raycaster, roots), null);
  roots[1].visible = true;
  raycaster.far = 6;
  assert.equal(picker.firstHit(raycaster, roots), null);
  outline.geometry.dispose(); outline.material.dispose(); geometry.dispose(); material.dispose();
});

test('cached placement preserves real surface hits, interior rays and adjacent snapping after geometry changes', () => {
  const picker = createPlacementPicker();
  const geometry = new THREE.BoxGeometry(CELL_SIZE_WORLD, CELL_SIZE_WORLD, CELL_SIZE_WORLD);
  const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  const component = new THREE.Mesh(geometry, material);
  component.position.set(cell(2), cell(1), cell(2));
  component.updateMatrixWorld(true);
  const workPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const raycaster = new THREE.Raycaster(new THREE.Vector3(cell(2), 1, cell(2) + .065), new THREE.Vector3(0, -1, 0));
  const options = { adjacentTargets: [component], placementBounds: NODE_PLACEMENT_BOUNDS };
  const expected = resolvePlacementPoint(raycaster, [component], workPlane, options);
  for (let i = 0; i < 30; i++) assert.deepEqual(resolvePlacementPoint(raycaster, [component], workPlane, { ...options, picker }).toArray(), expected.toArray());
  component.rotation.z = Math.PI / 4;
  component.geometry = new THREE.BoxGeometry(.24, .08, .08);
  picker.invalidate(); component.updateMatrixWorld(true);
  raycaster.ray.origin.set(cell(2), 1, cell(2));
  const fullHit = raycaster.intersectObject(component)[0];
  assert.ok(picker.firstHit(raycaster, [component]).point.distanceTo(fullHit.point) < 1e-9);
  raycaster.ray.origin.copy(component.position);
  assert.ok(picker.firstHit(raycaster, [component]).point.distanceTo(raycaster.intersectObject(component)[0].point) < 1e-9);
  component.geometry.dispose(); geometry.dispose(); material.dispose();
});

test('placement adjacency leaves gaps between component meshes empty', () => {
  const picker = createPlacementPicker();
  const group = new THREE.Group();
  const geometry = new THREE.BoxGeometry(.08, .08, .08);
  const material = new THREE.MeshBasicMaterial();
  for (const x of [-.24, .24]) {
    const mesh = new THREE.Mesh(geometry, material); mesh.position.set(x, .24, 0); group.add(mesh);
  }
  const raycaster = new THREE.Raycaster(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, -1, 0));
  const workPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  assert.equal(picker.firstHit(raycaster, [group]), null);
  assert.equal(picker.adjacentHit(raycaster, [group], .04), null, 'the union of two parts is not a solid surface');
  assert.deepEqual(resolvePlacementPoint(raycaster, [group], workPlane, { picker, adjacentTargets: [group], placementBounds: NODE_PLACEMENT_BOUNDS }).toArray(), [0, 0, 0]);
  raycaster.ray.origin.x = .24;
  assert.deepEqual(resolvePlacementPoint(raycaster, [group], workPlane, { picker, adjacentTargets: [group], placementBounds: NODE_PLACEMENT_BOUNDS }).toArray(), [.24, .32, 0]);
  geometry.dispose(); material.dispose();
});

test('placement adjacency follows rotated scaled Mesh bounds instead of their empty AABB corners', () => {
  const picker = createPlacementPicker();
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(.48, .08, .08), new THREE.MeshBasicMaterial());
  mesh.position.y = .16; mesh.rotation.z = Math.PI / 4; mesh.scale.set(-1.5, .5, 1.2);
  mesh.updateMatrixWorld(true);
  const raycaster = new THREE.Raycaster(new THREE.Vector3(-.16, 1, .065), new THREE.Vector3(0, -1, 0));
  assert.equal(picker.firstHit(raycaster, [mesh]), null);
  const hit = picker.adjacentHit(raycaster, [mesh], .04);
  assert.ok(hit);
  const local = mesh.worldToLocal(hit.point.clone());
  assert.ok(mesh.geometry.boundingBox.clone().expandByScalar(1e-9).containsPoint(local), 'snap contact lies on the oriented part');
  assert.ok(Math.abs(local.z - .04) < 1e-8, 'near-edge contact retains the real local side');
  assert.ok(hit.normal.dot(raycaster.ray.direction) <= 1e-6);
  assert.ok(hit.point.y < .16, 'no phantom snap to the top of the world AABB');
  mesh.geometry.dispose(); mesh.material.dispose();
});

test('placement adjacency respects ray range and never flips the far exit into a front surface', () => {
  const picker = createPlacementPicker();
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(.08, .08, .08), new THREE.MeshBasicMaterial());
  const raycaster = new THREE.Raycaster(new THREE.Vector3(.065, .06, 0), new THREE.Vector3(0, -1, 0));
  assert.equal(picker.adjacentHit(raycaster, [mesh], .04), null, 'origin inside expanded padding must not snap to its far exit');
  raycaster.ray.origin.y = 1; raycaster.far = .5;
  assert.equal(picker.adjacentHit(raycaster, [mesh], .04), null);
  raycaster.far = 2; raycaster.near = .99;
  assert.equal(picker.adjacentHit(raycaster, [mesh], .04), null);
  raycaster.near = 0;
  assert.ok(picker.adjacentHit(raycaster, [mesh], .04));
  raycaster.layers.disableAll();
  assert.equal(picker.adjacentHit(raycaster, [mesh], .04), null, 'adjacent fallback follows the same layer mask as precise ray hits');
  mesh.geometry.dispose(); mesh.material.dispose();
});

test('construction node snapping rejects occluded candidates in perspective and orthographic views', () => {
  const wall = new THREE.Mesh(new THREE.BoxGeometry(.16, .4, .08), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
  const nodes = [{ id: 'blocked', position: { x: 0, y: 0, z: -.16 } }, { id: 'free', position: { x: .16, y: 0, z: 0 } }];
  for (const camera of [new THREE.PerspectiveCamera(45, 1, .01, 100), new THREE.OrthographicCamera(-1, 1, 1, -1, .01, 100)]) {
    camera.position.set(0, 0, 3); camera.lookAt(0, 0, 0); camera.updateMatrixWorld(true);
    const picker = createPlacementPicker(); const nodesPicker = createProjectedNodePicker(); const pointer = new THREE.Vector2();
    assert.equal(nodesPicker.pick(nodes, camera, pointer, 200, 200, 22), 'blocked');
    const accept = node => picker.pointVisible(node.position, camera, [wall], .04);
    assert.equal(nodesPicker.pick(nodes, camera, pointer, 200, 200, 22, accept), 'free');
    assert.equal(picker.pointVisible({ x: 0, y: 0, z: 0 }, camera, [wall], .04), true, 'allow a node cube touching the visible surface');
    wall.visible = false;
    assert.equal(nodesPicker.pick(nodes, camera, pointer, 200, 200, 22, accept), 'blocked');
    wall.visible = true;
  }
  wall.geometry.dispose(); wall.material.dispose();
});

test('construction node occlusion preserves visible beam caps at oblique angles for both beam sizes', () => {
  for (const size of [1, 3]) {
    const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
    const edge = createEdgeMesh(new THREE.Vector3(), new THREE.Vector3(-.64, 0, 0), material, { size });
    const wall = new THREE.Mesh(new THREE.BoxGeometry(2, 2, .08), material);
    wall.position.z = .4;
    for (const camera of [new THREE.PerspectiveCamera(45, 1, .01, 100), new THREE.OrthographicCamera(-1, 1, 1, -1, .01, 100)]) {
      for (const position of [[0, 0, 3], [2, 1, 3], [3, 3, 3]]) {
        camera.position.set(...position); camera.lookAt(0, 0, 0); camera.updateMatrixWorld(true);
        const picker = createPlacementPicker();
        assert.equal(picker.pointVisible({ x: 0, y: 0, z: 0 }, camera, [edge], size * .04), true, 'a visible endpoint cube does not hide its own logical node');
        assert.equal(picker.pointVisible({ x: 0, y: 0, z: 0 }, camera, [edge, wall], size * .04), false, 'a separate foreground solid still blocks that endpoint');
      }
    }
    edge.geometry.dispose(); wall.geometry.dispose(); material.dispose();
  }
});

test('construction node visibility excludes its incident structure but retains unrelated occluders', () => {
  const camera = new THREE.PerspectiveCamera(45, 1, .01, 100);
  camera.position.set(2.5, 2.2, 3); camera.lookAt(0, 0, 0); camera.updateMatrixWorld(true);
  const start = new THREE.Vector3(-1.12, 0, -.24); const end = new THREE.Vector3(-.56, 0, -2);
  const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  const edge = createEdgeMesh(start, end, material);
  edge.userData.nodeIds = ['a', 'b'];
  const wall = new THREE.Mesh(new THREE.BoxGeometry(.24, .24, .24), material);
  wall.position.copy(end).lerp(camera.position, .1);
  const picker = createPlacementPicker();
  const ignoreIncident = target => target.userData.nodeIds?.includes('b');
  assert.equal(picker.pointVisible(end, camera, [edge], .04, ignoreIncident), true, 'slanted bridge faces cannot hide their own endpoint');
  assert.equal(picker.pointVisible(end, camera, [edge, wall], .04, ignoreIncident), false, 'ignoring incident geometry does not bypass a separate foreground solid');
  wall.userData.nodeIds = ['other-a', 'other-b'];
  assert.equal(picker.pointVisible(end, camera, [edge, wall], .04, ignoreIncident), false, 'unrelated structure also blocks the node');
  edge.geometry.dispose(); wall.geometry.dispose(); material.dispose();
});

test('oblique surface snapping remains outside the hit plane and stable at a rounding tie', () => {
  const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  mesh.rotation.y = Math.PI / 4; mesh.updateMatrixWorld(true);
  const normal = new THREE.Vector3(0, 0, 1).transformDirection(mesh.matrixWorld);
  const raycaster = new THREE.Raycaster(normal.clone(), normal.clone().negate());
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const positions = [];
  for (const jitter of [0, -1e-11, 1e-11]) {
    raycaster.ray.origin.copy(normal); raycaster.ray.origin.y += jitter;
    const point = resolvePlacementPoint(raycaster, [mesh], plane, { placementBounds: NODE_PLACEMENT_BOUNDS });
    assertGridVector(point);
    assert.ok(point.dot(normal) - .04 * (Math.abs(normal.x) + Math.abs(normal.y) + Math.abs(normal.z)) >= -.0008);
    positions.push(point.toArray());
  }
  assert.deepEqual(positions[1], positions[0]); assert.deepEqual(positions[2], positions[0]);
  mesh.geometry.dispose(); material.dispose();
});

test('node snapping reuses projections and refreshes for camera, viewport and topology changes', () => {
  const picker = createProjectedNodePicker();
  const camera = new THREE.PerspectiveCamera(45, 1, .01, 100);
  camera.position.set(0, 0, 5); camera.lookAt(0, 0, 0); camera.updateMatrixWorld(true);
  let reads = 0;
  const position = { x: 0, y: 0, z: 1 };
  const nodes = [{ id: 'near', get position() { reads++; return position; } }, { id: 'far', position: { x: 0, y: 0, z: 0 } }];
  const pointer = new THREE.Vector2();
  for (let i = 0; i < 50; i++) {
    pointer.x = i % 2 * .001;
    assert.equal(picker.pick(nodes, camera, pointer, 1000, 1000, 22), 'near');
  }
  assert.equal(reads, 3, 'XYZ coordinates are read only while refreshing the projected cache');
  position.x = 2; picker.invalidate();
  assert.equal(picker.pick(nodes, camera, pointer, 1000, 1000, 22), 'far');
  camera.position.x = 2; camera.lookAt(2, 0, 1); camera.updateMatrixWorld(true);
  assert.equal(picker.pick(nodes, camera, pointer, 1000, 1000, 22), 'near');
  assert.equal(picker.pick(nodes, camera, pointer, 500, 500, 22), 'near');
  assert.equal(picker.pick([nodes[1]], camera, pointer, 500, 500, 22), null);
});

test('render quality validates legacy settings, numeric limits and independent presets', () => {
  assert.deepEqual(normalizeSettings().renderQuality, RENDER_QUALITY_DEFAULTS);
  assert.deepEqual(normalizeRenderQuality({ maxPixelRatio: Infinity, resolutionScale: 0, shadowMapSize: 99999, maxFps: -1, antialias: 'false', toneMapping: '__proto__' }), RENDER_QUALITY_DEFAULTS);
  const quality = normalizeRenderQuality({ ...RENDER_QUALITY_PRESETS.quality, showStats: true });
  assert.equal(renderQualityPreset(quality), 'quality');
  assert.equal(renderQualityPreset({ ...quality, exposure: 1.5 }), 'custom');
  assert.equal(renderPixelRatio(quality, 3), 2);
  assert.equal(renderPixelRatio(RENDER_QUALITY_DEFAULTS, 2, true), 1.125);
  assert.equal(renderPixelRatio(RENDER_QUALITY_DEFAULTS, NaN), 1);
  quality.maxPixelRatio = 3;
  assert.equal(RENDER_QUALITY_PRESETS.quality.maxPixelRatio, 2);
});

test('shadow caching freezes during interaction and refreshes after drop without switching light variants', () => {
  let ratio = 1; let disposed = 0;
  const renderer = { shadowMap: {}, capabilities: { maxTextureSize: 2048 }, getContext: () => ({ getContextAttributes: () => ({ antialias: true }) }), getPixelRatio: () => ratio, setPixelRatio: value => { ratio = value; } };
  const light = new THREE.DirectionalLight(); light.castShadow = true;
  const controller = createRenderQualityController(renderer, light, RENDER_QUALITY_DEFAULTS);
  controller.beforeRender(); assert.equal(renderer.shadowMap.needsUpdate, true);
  controller.beforeRender(); assert.equal(renderer.shadowMap.needsUpdate, false);
  controller.setInteraction(true); controller.invalidateShadows(); controller.beforeRender();
  assert.equal(renderer.shadowMap.needsUpdate, false); assert.equal(light.castShadow, true);
  assert.equal(ratio, .75);
  controller.setInteraction(false); controller.beforeRender();
  assert.equal(renderer.shadowMap.needsUpdate, true); assert.equal(ratio, 1);
  light.shadow.map = { dispose() { disposed++; } };
  controller.setQuality({ ...RENDER_QUALITY_DEFAULTS, shadowMapSize: 4096, antialias: false });
  assert.equal(disposed, 1); assert.equal(light.shadow.map, null); assert.equal(light.shadow.mapSize.x, 2048);
  assert.equal(controller.reloadRequired, true);
  controller.setQuality({ ...RENDER_QUALITY_DEFAULTS, interactionShadows: true, shadowUpdate: 'continuous' });
  controller.setInteraction(true); assert.equal(renderer.shadowMap.autoUpdate, true);
});

test('camera refreshes cannot overwrite newer pointer input in the same frame', () => {
  const values = []; const task = createFrameTask(value => values.push(value));
  task.schedule('new-pointer');
  for (let i = 0; i < 10; i++) task.scheduleIfIdle('old-camera-pointer');
  task.flush();
  assert.deepEqual(values, ['new-pointer']);
  task.scheduleIfIdle('stationary-pointer-after-camera-change'); task.flush();
  assert.equal(values.at(-1), 'stationary-pointer-after-camera-change');
  task.scheduleIfIdle('camera-refresh'); task.schedule('newer-pointer'); task.flush();
  assert.equal(values.at(-1), 'newer-pointer');
  task.schedule('cancelled-pointer'); task.cancel();
  task.scheduleIfIdle('release-position'); task.flush();
  assert.equal(values.at(-1), 'release-position');
});

test('frame tasks coalesce pointer bursts, flush final values and discard cancelled work', () => {
  const values = []; const task = createFrameTask(value => values.push(value));
  for (let i = 0; i < 100; i++) task.schedule(i);
  assert.deepEqual(values, []); assert.equal(task.flush(), true);
  assert.deepEqual(values, [99]); assert.equal(task.flush(), false);
  task.schedule(100); task.cancel(); assert.equal(task.flush(), false);
  task.schedule(101); task.flush(); assert.deepEqual(values, [99, 101]);
});

test('visual update plans preserve unchanged components without depending on property order', () => {
  const before = { id: 'a', nativeExtension: [0, 0, 0], position: { x: 0, y: 0, z: 0 } };
  const object = {};
  const existing = new Map([['a', { object, signature: visualSignature(before) }]]);
  const reordered = { position: { y: 0, z: 0, x: 0 }, nativeExtension: [0, 0, 0], id: 'a' };
  const plan = planVisualUpdate([reordered], existing, value => value.id, visualSignature);
  assert.equal(plan.retained.get('a'), object); assert.equal(plan.changed.length, 0);
  const changed = planVisualUpdate([{ ...before, nativeExtension: [0, 0, 4] }], existing, value => value.id, visualSignature);
  assert.equal(changed.changed.length, 1); assert.equal(changed.retained.size, 0);
  assert.deepEqual(before.nativeExtension, [0, 0, 0]);
  assert.equal(existing.get('a').object, object);
});

test('topology visuals invalidate only changed entities and their endpoint dependencies', () => {
  const state = { nodes: ['a', 'b', 'c', 'd'].map((id, i) => ({ id, position: { x: i, y: 0, z: 0 } })), edges: [{ id: 'ab', a: 'a', b: 'b' }, { id: 'cd', a: 'c', b: 'd' }], plates: [{ id: 'p', nodeIds: ['b', 'c', 'd'] }], links: [{ id: 'l', from: { componentId: 'motor' }, to: { componentId: 'shaft' } }] };
  const components = new Map([['motor', { position: { x: 0, y: 0, z: 0 } }], ['shaft', { nativeExtension: [0, 0, 0] }]]);
  const records = topologyVisualRecords(state, components);
  const existing = new Map(records.map(record => [record.key, { signature: record.signature, object: {} }]));
  const moved = structuredClone(state); moved.nodes[0].position.x = .08;
  const plan = planVisualUpdate(topologyVisualRecords(moved, components), existing, r => r.key, r => r.signature);
  assert.deepEqual(plan.changed.map(record => record.key), ['node:a', 'edge:ab']);
  components.get('shaft').nativeExtension[2] = 4;
  const linked = planVisualUpdate(topologyVisualRecords(state, components), existing, r => r.key, r => r.signature);
  assert.deepEqual(linked.changed.map(record => record.key), ['link:l']);
});

test('unchanged beam previews retain GPU geometry and depth ordering retains material programs', () => {
  const start = new THREE.Vector3(); const end = new THREE.Vector3(.8, 0, 0);
  const mesh = createEdgeMesh(start, end, new THREE.MeshStandardMaterial(), { outlined: true });
  const geometry = mesh.geometry; let disposed = 0; geometry.addEventListener('dispose', () => disposed++);
  for (let i = 0; i < 50; i++) assert.equal(updateEdgeMesh(mesh, start, end), true);
  assert.equal(mesh.geometry, geometry); assert.equal(disposed, 0);
  configureOpaqueDepthLayer(mesh, RENDER_DEPTH_LAYERS.edge, { key: 'edge:a' });
  const version = mesh.material.version;
  configureOpaqueDepthLayer(mesh, RENDER_DEPTH_LAYERS.edge, { key: 'edge:a' });
  assert.equal(mesh.material.version, version);
  updateEdgeMesh(mesh, start, new THREE.Vector3(1.6, 0, 0));
  assert.equal(disposed, 1); assert.notEqual(mesh.geometry, geometry);
  mesh.geometry.dispose(); mesh.material.dispose();
});

test('native file pairs download directly while XML can use a save picker', async () => {
  const files = [{ name: 'vehicle.data', content: '{"data":1}', type: 'application/json' }, { name: 'vehicle.meta', content: '{"meta":1}', type: 'application/json' }];
  const downloads = [];
  assert.equal(await saveFilePair(files, { download: file => downloads.push(file.name) }), 'downloaded');
  assert.deepEqual(downloads, files.map(file => file.name));
  const xml = { name: 'vehicle.xml', content: '<vehicle/>', type: 'application/xml', description: 'Debug XML' };
  let selectedName;
  const pickFile = async options => {
    selectedName = options.suggestedName;
    return { async createWritable() { return { async write(content) { assert.equal(content, xml.content); }, async close() {} }; } };
  };
  assert.equal(await saveSingleFile(xml, { pickFile, download: () => { throw new Error('Unexpected download'); } }), 'saved');
  assert.equal(selectedName, 'vehicle.xml');
  assert.equal(isSaveCancelled({ name: 'AbortError' }), true);
});

test('mirror mode reflects integer-grid points on every plane without moving points on the plane', () => {
  assert.deepEqual(mirrorPoint({ x: cell(3), y: cell(-2), z: cell(4) }, { axis: 'x', offset: cell(1) }), { x: cell(-1), y: cell(-2), z: cell(4) });
  assert.deepEqual(mirrorPoint({ x: cell(3), y: cell(-2), z: cell(4) }, { axis: 'y', offset: cell(1) }), { x: cell(3), y: cell(4), z: cell(4) });
  assert.deepEqual(mirrorPoint({ x: cell(3), y: cell(-2), z: cell(4) }, { axis: 'z', offset: cell(1) }), { x: cell(3), y: cell(-2), z: cell(-2) });
  const onPlane = { x: cell(1), y: 0, z: 0 };
  assert.equal(sameGridPoint(mirrorPoint(onPlane, { axis: 'x', offset: cell(1) }), onPlane), true);
  assert.deepEqual(mirrorSurfaceDirection({ x: .5, y: -.25, z: .75 }, { axis: 'y' }), { x: .5, y: .25, z: .75 });
});

test('project code round-trips a serializable document without editor-only view state', async () => {
  const document = { format: 'anymaker-web-project', version: 1, projectName: 'share-test', grids: [{ id: 'grid-1', name: 'Cab & chassis' }], objects: [], topology: { nodes: [], edges: [], plates: [], links: [] } };
  const code = await encodeProjectCode(document);
  assert.match(code, /^AMB1\.[A-Za-z0-9_-]+$/);
  assert.deepEqual(await decodeProjectCode(code), document);
  await assert.rejects(() => decodeProjectCode('AMB1.invalid'), /Base64URL|解压|工程/);
});

test('mirror mode conjugates XYZ rotation and moves paired nodes as one topology change', () => {
  const rotation = { x: .3, y: -.7, z: 1.1 };
  for (const axis of ['x', 'y', 'z']) {
    const reflected = mirrorRotation(rotation, { axis });
    assert.deepEqual(mirrorRotation(reflected, { axis }), rotation);
    const basis = new THREE.Matrix4().makeScale(...['x', 'y', 'z'].map(key => key === axis ? -1 : 1));
    const original = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rotation.x, rotation.y, rotation.z, 'XYZ'));
    const expected = basis.clone().multiply(original).multiply(basis);
    const actual = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(reflected.x, reflected.y, reflected.z, 'XYZ'));
    assert.ok(expected.elements.every((value, i) => Math.abs(value - actual.elements[i]) < 1e-12));
    assert.deepEqual(mirrorPositionPreview({ x: .13, y: -.26, z: .39 }, { axis, offset: .08 })[axis], .16 - { x: .13, y: -.26, z: .39 }[axis]);
  }
  const state = {
    nodes: [
      { id: 'left', position: { x: cell(2), y: 0, z: 0 }, standalone: true },
      { id: 'right', position: { x: cell(-2), y: 0, z: 0 }, standalone: true },
      { id: 'far', position: { x: cell(4), y: 0, z: 0 }, standalone: true },
      { id: 'far-mirror', position: { x: cell(-4), y: 0, z: 0 }, standalone: true },
    ], edges: [], plates: [], links: [],
  };
  const moved = moveMirroredNode(state, 'left', { x: cell(3), y: cell(1), z: 0 }, 'right', { axis: 'x', offset: 0 });
  assert.deepEqual(moved.nodes.slice(0, 2).map(node => node.position), [{ x: cell(3), y: cell(1), z: 0 }, { x: cell(-3), y: cell(1), z: 0 }]);
  assert.deepEqual(state.nodes[0].position, { x: cell(2), y: 0, z: 0 });
  const swapped = moveMirroredNode(state, 'left', { x: cell(-2), y: 0, z: 0 }, 'right', { axis: 'x', offset: 0 });
  assert.deepEqual(swapped.nodes.slice(0, 2).map(node => node.position.x), [cell(-2), cell(2)]);
  const merged = moveMirroredNode(state, 'left', { x: 0, y: 0, z: 0 }, 'right', { axis: 'x', offset: 0 });
  assert.equal(merged.nodes.length, 3);
  assert.deepEqual(merged.idMap, { left: 'right' });
  assert.throws(() => moveMirroredNode(state, 'left', { x: cell(1), y: 0, z: 0 }, 'left', { axis: 'x', offset: 0 }), /只能沿平面移动/);
});

test('subgrid connectivity partitions touching, linked and structural records', () => {
  const box = (x, z) => ({ min: { x, y: 0, z }, max: { x: x + .08, y: .08, z: z + .08 } });
  const groups = partitionSubgrids({
    components: [{ id: 'a', bounds: box(0, 0) }, { id: 'b', bounds: box(.08, 0) }, { id: 'c', bounds: box(1, 0) }],
    topology: {
      nodes: [{ id: 'n1', position: { x: .04, y: 0, z: .04 } }, { id: 'n2', position: { x: 1, y: 0, z: 0 } }],
      edges: [{ id: 'e1', a: 'n1', b: 'n2' }], plates: [],
      links: [{ id: 'link', kind: 'mechanical', from: { componentId: 'b' }, to: { componentId: 'c' }, points: [] }],
    }, padding: 0,
  });
  assert.equal(groups.length, 1);
  assert.deepEqual(new Set(groups[0].components), new Set(['a', 'b', 'c']));
  assert.deepEqual(new Set(groups[0].topology.map(item => item.id)), new Set(['n1', 'n2', 'e1']));
  const isolated = partitionSubgrids({ components: [{ id: 'a', bounds: box(0, 0) }, { id: 'b', bounds: box(1, 0) }] });
  assert.equal(isolated.length, 2);
});

test('subgrid connectivity keeps deep interior nodes separate without calling them invalid', () => {
  const box = (x, z) => ({ min: { x, y: 0, z }, max: { x: x + .08, y: .08, z: z + .08 } });
  const result = analyzeSubgridIntegrity({
    components: [{ id: 'a', bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: .24, y: .24, z: .24 } }, gridId: 'grid-1' }, { id: 'b', bounds: box(.4, 0), gridId: 'grid-1' }],
    topology: { nodes: [{ id: 'inside', position: { x: .12, y: .12, z: .12 } }], edges: [], plates: [], links: [] },
  });
  assert.equal(result.groups.filter(group => group.components.length).length, 2);
  assert.equal(result.groups.length, 3);
  assert.equal(result.isValid, true);
  assert.equal(result.diagnostics.some(item => item.code === 'multiple-islands'), true);
});

test('subgrid integrity reports a mounted but unreferenced node', () => {
  const result = analyzeSubgridIntegrity({
    components: [{ id: 'a', bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: .08, y: .08, z: .08 } } }],
    topology: { nodes: [{ id: 'orphan', position: { x: .04, y: 0, z: 0 } }], edges: [], plates: [], links: [] },
  });
  assert.equal(result.diagnostics.some(item => item.code === 'unreferenced-node'), true);
});

test('subgrid integrity prefers definition occupancy over visual bounds', () => {
  const result = analyzeSubgridIntegrity({
    components: [{
      id: 'visual-large',
      bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: .8, y: .8, z: .8 } },
      occupancyBounds: { min: { x: 0, y: 0, z: 0 }, max: { x: .08, y: .08, z: .08 } },
    }],
    topology: { nodes: [{ id: 'visual-only', position: { x: .8, y: .4, z: .4 } }], edges: [], plates: [], links: [] },
  });
  assert.equal(result.groups.length, 2, 'visual bounds must not mount the node to the component');
  assert.equal(result.isValid, true);
  assert.equal(result.diagnostics.some(item => item.code === 'missing-occupancy-bounds'), false);
});

test('subgrid integrity reports missing references and keeps existing grid IDs unchanged', () => {
  const result = analyzeSubgridIntegrity({
    components: [{ id: 'a', gridId: 'grid-2', bounds: { min: { x: 0, y: 0, z: 0 }, max: { x: .08, y: .08, z: .08 } } }],
    topology: {
      nodes: [{ id: 'n', position: { x: .04, y: 0, z: 0 } }],
      edges: [{ id: 'e', a: 'n', b: 'missing' }], plates: [], links: [],
    },
  });
  assert.equal(result.isValid, false);
  assert.equal(result.diagnostics.some(item => item.code === 'missing-edge-node'), true);
  assert.equal(result.diagnostics.some(item => item.code === 'dangling-edge'), false);
  assert.equal(result.groups.find(group => group.components.includes('a')).components[0], 'a');
});

test('component-free beam and panel shells do not produce mounting errors', () => {
  const topology = {
    nodes: [
      { id: 'a', position: { x: 0, y: 0, z: 0 } },
      { id: 'b', position: { x: .08, y: 0, z: 0 } },
      { id: 'c', position: { x: .08, y: .08, z: 0 } },
      { id: 'd', position: { x: 0, y: .08, z: 0 } },
    ],
    edges: [
      { id: 'ab', a: 'a', b: 'b' }, { id: 'bc', a: 'b', b: 'c' },
      { id: 'cd', a: 'c', b: 'd' }, { id: 'da', a: 'd', b: 'a' },
    ],
    plates: [{ id: 'shell', nodeIds: ['a', 'b', 'c', 'd'] }], links: [],
  };
  const result = analyzeSubgridIntegrity({ topology });
  assert.equal(result.groups.length, 1);
  assert.equal(result.isValid, true);
  assert.deepEqual(result.diagnostics, []);
});

test('subgrid error markers locate only known faulty grid points and merge coincident errors', () => {
  const topology = {
    nodes: [
      { id: 'a', position: { x: 0, y: 0, z: 0 } },
      { id: 'b', position: { x: 0, y: 0, z: 0 } },
      { id: 'c', position: { x: .08, y: 0, z: 0 } },
    ],
    plates: [{ id: 'plate', nodeIds: ['c', 'a'] }],
  };
  const diagnostics = [
    { code: 'missing-edge-node', severity: 'error', entityIds: ['edge', 'a', 'missing'] },
    { code: 'missing-plate-node', severity: 'error', entityIds: ['plate', 'b', 'missing'] },
    { code: 'invalid-plate', severity: 'error', entityIds: ['plate'] },
    { code: 'unreferenced-node', severity: 'warning', entityIds: ['c'] },
  ];
  assert.deepEqual(locatableSubgridErrors(diagnostics, topology), [
    { position: { x: 0, y: 0, z: 0 }, nodeIds: ['a', 'b'], codes: ['missing-edge-node', 'missing-plate-node'] },
    { position: { x: .08, y: 0, z: 0 }, nodeIds: ['c'], codes: ['invalid-plate'] },
  ]);
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

test('tank capacity uses definition cells and native extensions', () => {
  assert.equal(LITERS_PER_CELL, 0.5);
  const definition = {
    zones: [{ bounds_min: [0, 0, 0], bounds_max: [1, 1, 1] }],
    mode_x: 'stretch', mode_y: 'stretch', mode_z: 'stretch',
  };
  assert.equal(tankCapacityLiters(definition), 4);
  assert.equal(tankCapacityLiters(definition, [1, 2, 3]), 30);
  assert.equal(tankCapacityCells(12), 24);
  assert.equal(tankCapacityLiters({ zones: [{ bounds_min: [0, 0, 0], bounds_max: [2, 3, 4] }] }), 30);
  assert.equal(tankCapacityLiters({ zones: [
    { bounds_min: [0, 0, 0], bounds_max: [2, 1, 1] },
    { bounds_min: [0, 0, 0], bounds_max: [1, 2, 1] },
  ] }), 12);
  assert.equal(tankCapacityLiters({ zones: [{ bounds_min: [0, 0], bounds_max: [1, 1, 1] }] }), null);
  assert.equal(tankCapacityLiters({ zones: [{ bounds_max: [1, 1, 1] }] }), 4);
  assert.equal(tankCapacityLiters({ zones: [{}] }), null);
  const liquidTank = JSON.parse(readFileSync('public/data/definitions/liquid_tank.json', 'utf8'));
  const gasTank = JSON.parse(readFileSync('public/data/definitions/gas_tank_a.json', 'utf8'));
  assert.equal(tankCapacityLiters(liquidTank, [0, 1, 2]), 12);
  assert.equal(tankCapacityLiters(liquidTank, [5, 0, 3]), 35);
  assert.equal(tankCapacityLiters(gasTank), 18);
  assert.equal(tankCapacityLiters(gasTank, [0, 2, 0]), 27);
});

test('native linear component extensions use definition modes, intervals and stretch centres', () => {
  const driveShaft = { mode_z: 'stretch', interval: [0, 0, 1], ext_max: [10, 10, 40], center_stretch: [0, 0, .5] };
  assert.deepEqual(extensionAxes(driveShaft), [{ axis: 'z', index: 2, mode: 'stretch', interval: 1, max: 40 }]);
  assert.deepEqual(updateExtension(driveShaft, [0, 0, 1], 'z', 42), [0, 0, 40]);
  assert.deepEqual(updateExtensionFromDrag(driveShaft, [0, 0, 1], 'z', -3), { extension: [0, 0, 3], signedValue: -3 });
  assert.deepEqual(updateExtensionFromDrag(driveShaft, [0, 0, 1], 'z', -42), { extension: [0, 0, 40], signedValue: -40 });
  assert.deepEqual(extensionVector(driveShaft, [3, -1, 3]), [3, 0, 3]);
  const stretched = stretchMeshPositions(driveShaft, [0, 0, 3], new Float32Array([0, 0, .04, 0, 0, .041]), CELL_SIZE_WORLD);
  assert.ok(Math.abs(stretched[2] - .04) < 1e-6); assert.ok(Math.abs(stretched[5] - .281) < 1e-6);
  assert.ok(Math.abs(extensionHandlePosition(driveShaft, [0, 0, 3], CELL_SIZE_WORLD)[2] - .28) < 1e-12);
  const engine = { mode_z: 'tile', interval: [0, 0, 2] };
  assert.deepEqual(updateExtension(engine, undefined, 'z', 5), [0, 0, 6]);
  assert.equal(extensionControlValue(engine, [0, 0, 4], 'z'), 6);
  assert.deepEqual(updateExtensionFromControl(engine, [0, 0, 4], 'z', 8), [0, 0, 6]);
  const radiator = { mode_x: 'stretch', mode_y: 'tile', interval: [1, 1, 0] };
  assert.equal(extensionControlValue(radiator, [2, 3, 0], 'x'), 3);
  assert.equal(extensionControlValue(radiator, [2, 3, 0], 'y'), 4);
  assert.deepEqual(updateExtensionFromControl(radiator, [2, 3, 0], 'x', 4), [3, 3, 0]);
  assert.ok(Math.abs(stretchMeshPositions(engine, [0, 0, 6], new Float32Array([0, 0, .2]), CELL_SIZE_WORLD)[2] - .2) < 1e-6);
});

test('tiled component meshes use interior intervals between their two caps', () => {
  const staticMesh = 'meshes/components/engine_block_a_0_0_0.mesh';
  const middle = 'meshes/components/engine_block_a_0_0_1.mesh';
  const end = 'meshes/components/engine_block_a_0_0_2.mesh';
  const definition = { class: 'engine', mode_z: 'tile', interval: [0, 0, 2], mesh_static: { mesh_path: staticMesh } };
  const manifest = { entries: { [staticMesh]: {}, [middle]: {}, [end]: {} } };
  const parts = staticMeshParts(definition, { staticMesh }, [0, 0, 4], manifest);
  assert.deepEqual(parts, [
    { path: staticMesh, transform: null },
    { path: middle, transform: { position: [0, 0, 2 * CELL_SIZE_WORLD] } },
    { path: middle, transform: { position: [0, 0, 4 * CELL_SIZE_WORLD] } },
    { path: end, transform: { position: [0, 0, 4 * CELL_SIZE_WORLD] } },
  ]);
  const radiator = { class: 'radiator', mode_y: 'tile', interval: [1, 1, 0] };
  const radiatorMesh = 'meshes/components/radiator_a_0_0_0.mesh';
  const radiatorMiddle = 'meshes/components/radiator_a_0_1_0.mesh';
  const radiatorEnd = 'meshes/components/radiator_a_0_2_0.mesh';
  assert.equal(staticMeshParts(radiator, { staticMesh: radiatorMesh }, [2, 3, 0], {
    entries: { [radiatorMiddle]: {}, [radiatorEnd]: {} },
  }).length, 4);
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
  const document = validateDocument(project([object], { nodes: [], edges: [], plates: [] }, undefined, [{ id: 'grid-empty', name: '  Spare frame  ' }]), definitions);
  assert.deepEqual(document.grids, [{ id: 'grid-empty', name: 'Spare frame' }, { id: 'grid-a' }]);
  assert.throws(() => validateDocument(project([], undefined, undefined, [{ id: 'grid-a' }, { id: 'grid-a' }]), definitions), /Duplicate grid ID/);
  for (const name of ['', ' '.repeat(3), 'x'.repeat(81), 'bad\nname', 3]) {
    assert.throws(() => validateDocument(project([], undefined, undefined, [{ id: 'grid-a', name }]), definitions), /Invalid grid name/);
  }
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
      mechanicalConnections: [{ id: 'hinge', type: 'hinge', from: 'component', to: 'component-2', position: { x: 0, y: 1, z: 0 }, limits: { min: 0, max: Math.PI } }],
    },
  };
  source.objects.push({ ...source.objects[0], id: 'component-2' });
  const staged = stageImportedSubgrid(source, { grids: ['imported-vehicle-1'], components: ['imported-vehicle-2-component-1'] });
  assert.equal(staged.gridId, 'imported-vehicle-2');
  assert.equal(new Set(staged.objects.map(object => object.gridId)).size, 1);
  assert.equal(staged.topology.links[0].from.componentId, staged.objects[0].id);
  const placed = translateImportedSubgrid(staged, { x: 5, y: -2, z: 4 });
  assert.deepEqual(placed.objects[0].position, { x: 6, y: 0, z: 7 });
  assert.deepEqual(placed.topology.mechanicalConnections[0].position, { x: 5, y: -1, z: 4 });
  const moved = translateSubgridTopology({ ...placed.topology, nodes: [...placed.topology.nodes, { id: 'outside', gridId: 'grid-1', position: { x: 0, y: 0, z: 0 } }] }, placed.objects.map(object => object.id), staged.gridId, { x: 1, y: 0, z: 0 });
  assert.equal(moved.nodes.find(node => node.id === 'outside').position.x, 0);
  assert.equal(moved.nodes[0].position.x, 6);
  assert.equal(moved.mechanicalConnections[0].position.x, 6);
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
  assert.deepEqual(Object.fromEntries(LINK_KINDS.map(kind => [kind, document.topology.links.filter(link => link.kind === kind).length])), { electric: 17, mechanical: 20, liquid: 6, gas: 6, belt: 6, data: 18, hydraulic: 0 });
  assert.ok(document.topology.links.every(link => document.objects.some(object => object.id === link.from.componentId) && document.objects.some(object => object.id === link.to.componentId)));
  const node69 = document.topology.nodes.find(node => node.id === 'grid-553-1:69')?.position;
  assert.deepEqual(Object.fromEntries(['x', 'y', 'z'].map(axis => [axis, worldToCell(node69[axis])])), { x: -69, y: 17, z: 247 });
  assert.deepEqual(document.objects.find(object => object.id === '553:grid-553-1:12')?.colors, [79, 79, 79, 79, 79, 79, 79, 79, 79, 79]);
  assert.deepEqual(document.objects.find(object => object.id === '553:grid-553-1:12')?.nativeExtension, [0, 0, 6]);
  assert.deepEqual(document.objects.find(object => object.id === '553:grid-553-1:124')?.nativeProperties, { throttle: 1, gear_count: 3, user_defined_alias: 'Gear_stick_auto' });
  // Wheel hub meshes have an outboard local tyre offset. Native component
  // rotations must therefore put the left and right hubs on opposite sides.
  assert.ok(Math.abs(document.objects.find(object => object.id === '553:grid-553-1:71')?.rotation.y - Math.PI / 2) < 1e-6);
  assert.ok(Math.abs(document.objects.find(object => object.id === '553:grid-553-1:73')?.rotation.y + Math.PI / 2) < 1e-6);
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
  assert.deepEqual(document.topology.nodes.find(node => node.id === 'grid-551-1:1')?.position, { x: -6.72, y: 1.6, z: 19.52 });
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
  assert.ok(Math.abs(dashboardDisplay.position.x + 5.28) < 1e-12);
  assert.ok(Math.abs(dashboardDisplay.position.y - 2.2314855054991165) < 1e-12);
  assert.ok(Math.abs(dashboardDisplay.position.z - 19.25102139319956) < 1e-12);
  const primaryBounds = JSON.parse(meta).vehicles.vehicles.find(vehicle => vehicle.id === 553).bounds;
  assert.ok(dashboard.every(object => ['x', 'y', 'z'].every((axis, index) => object.position[axis] >= (axis === 'x' ? -primaryBounds.max[index] : primaryBounds.min[index]) && object.position[axis] <= (axis === 'x' ? -primaryBounds.min[index] : primaryBounds.max[index]))));
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
  assert.equal(defaults.edgeMicroMode, false);
  assert.equal(normalizeSettings({ version: 1, edgeMicroMode: true }).edgeMicroMode, true);
  for (const invalid of ['true', 1, null, {}]) assert.equal(normalizeSettings({ version: 1, edgeMicroMode: invalid }).edgeMicroMode, false);
  assert.equal(defaults.edgeSize, 1);
  assert.equal(defaults.hideMirrorPlane, false);
  assert.equal(normalizeSettings({ version: 1, hideMirrorPlane: true }).hideMirrorPlane, true);
  for (const invalid of ['true', 1, null, {}]) assert.equal(normalizeSettings({ version: 1, hideMirrorPlane: invalid }).hideMirrorPlane, false);
  assert.equal(normalizeSettings({ version: 1, edgeSize: 3 }).edgeSize, 3);
  assert.equal(normalizeSettings({ version: 1, edgeSize: 2 }).edgeSize, 1);
  assert.deepEqual(defaults.connectionVisibility, { electric: true, mechanical: true, liquid: true, gas: true, belt: true, data: true, hydraulic: true });
  assert.equal(defaults.paintColor, '#dddddd');
  assert.deepEqual(defaults.paintQuickColors, ['#ecece7', '#861a22', '#3e2022', '#191e28', '#374345']);
  assert.equal(normalizeSettings({ version: 1, paintColor: '#7C3AED' }).paintColor, '#7c3aed');
  assert.deepEqual(normalizeSettings({ version: 1, paintQuickColors: ['#7C3AED', 26] }).paintQuickColors, ['#7c3aed', '#861a22']);
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
  const empty = project([], { nodes: [], edges: [], plates: [] }, undefined, undefined, DEFAULT_PROJECT_NAME);
  const edge = project([], createEdgeFromPoints({}, { x: 0, y: 0, z: 0 }, { x: cell(1), y: 0, z: 0 }), undefined, undefined, DEFAULT_PROJECT_NAME);
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

test('type visibility validates preferences and composes structural and connection filters', () => {
  assert.deepEqual(normalizeHiddenKinds({ node: true, edge: 'true', plate: 1, component: null }), { component: false, structure: false, node: true, edge: false, plate: false, link: false });
  const hidden = normalizeHiddenKinds({ structure: true, link: true });
  for (const kind of ['node', 'edge', 'plate', 'link', 'belt', 'track']) assert.equal(isKindVisible(kind, hidden), false);
  assert.equal(isKindVisible('component', hidden), true);
  assert.deepEqual(normalizeSettings({ version: 1, hiddenKinds: { plate: true } }).hiddenKinds, normalizeHiddenKinds({ plate: true }));
  assert.deepEqual(normalizeSettings().hiddenKinds, normalizeHiddenKinds());
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
test('current v1 migration preserves pre-provenance orphan nodes as authored data', () => {
  const migrated = migrateDocument({
    format: 'anymaker-web-project', version: 1, objects: [],
    topology: { nodes: [{ id: 'legacy-orphan', position: { x: 0, y: 0, z: 0 } }], edges: [], plates: [] },
  }, new Map());
  assert.equal(migrated.topology.nodes[0].standalone, true);
  assert.equal(pruneUnusedTopology(migrated.topology).nodes.length, 1);
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

test('connection route endpoints extend one cell along the definition face direction', () => {
  assert.deepEqual(connectionDirectionVector(1), [1, 0, 0]);
  assert.deepEqual(connectionDirectionVector(2), [0, -1, 0]);
  assert.deepEqual(connectionDirectionVector(3), [0, 1, 0]);
  assert.deepEqual(connectionDirectionVector(4), [0, 0, -1]);
  assert.deepEqual(connectionDirectionVector(5), [0, 0, 1]);
  assert.equal(connectionDirectionVector(undefined), null);
  assert.deepEqual(connectionRouteCellPosition({ pos: [2, 3, 4], direction: 4 }), [2, 3, 3]);
  assert.deepEqual(connectionRouteCellPosition({ pos: [1, 1, 0], dir: 1 }, [2, 0, 0], [0, 0, 0]), [4, 1, 0]);
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
  assert.deepEqual(pair.data.vehicles.vehicles[0].grids[0].components[0].pos, [-1, 2, 3]);
  assert.deepEqual(pair.data.vehicles.vehicles[0].grids[0].components[0].colors, [26]);
  assert.deepEqual(pair.data.vehicles.vehicles[0].edges[0], { n0: 1, n1: 2, col: 26 });
  assert.deepEqual(pair.data.vehicles.vehicles[0].plates[0].nodes, [3, 2, 1]);
  assert.equal(pair.data.vehicles.vehicles[0].plates[0].type, 'window');
  assert.deepEqual(pair.data.vehicles.vehicles[0].electric_links[0].points, [[-1, 0, 0]]);
  assert.deepEqual(pair.meta.vehicles.vehicles[0].transform, { m: [1, 0, 0, 0, 1, 0, 0, 0, 1], t: [0, 0, 0] });
  const restored = toEditorDocument(parseNativePair(pair.data, pair.meta));
  assert.deepEqual(restored.objects[0].position, object.position);
  assert.equal(restored.topology.edges.length, 3, 'export completes the two beams at the unsupported plate corner');
  assert.equal(restored.topology.plates.length, 1);
});
test('native mechanical export reverses input-first links and omits default port zero', () => {
  const definitions = new Map([
    ['electric_relay', { logic_nodes: [{ type: 'mechanical_in' }] }],
    ['button_push_round_off', { logic_nodes: [{}] }],
  ]);
  const relay = { ...object, id: 'relay', type: 'electric_relay' };
  const button = { ...object, id: 'button', type: 'button_push_round_off', position: { x: cell(1), y: 0, z: 0 } };
  const link = {
    id: 'control', kind: 'mechanical', from: { componentId: 'relay', port: 0 }, to: { componentId: 'button', port: 0 },
    points: [{ x: 0, y: 0, z: 0 }, { x: cell(1), y: 0, z: 0 }],
  };
  const byId = new Map([['relay', relay], ['button', button]]);
  const oriented = orientMechanicalLink(link, byId, definitions);
  assert.equal(oriented.from.componentId, 'button');
  assert.deepEqual(oriented.points, [...link.points].reverse());
  assert.equal(link.from.componentId, 'relay');
  assert.equal(orientMechanicalLink({ ...link, kind: 'electric' }, byId, definitions).from.componentId, 'relay');
  const vehicle = toNativePairFromEditor(project([relay, button], { nodes: [], edges: [], plates: [], links: [link] }), { componentDefinitions: definitions }).data.vehicles.vehicles[0];
  assert.deepEqual(vehicle.mechanical_links, [{ p0: { comp: 2 }, p1: { comp: 1 }, points: [[-1, 0, 0], [0, 0, 0]] }]);
});

test('edge micro controls move the endpoint one block along paired axis keys', () => {
  assert.deepEqual(Object.keys(EDGE_MICRO_KEYS), ['u', 'j', 'i', 'k', 'o', 'l']);
  assert.deepEqual(edgeMicroKeyBinding('U'), { axis: 'x', direction: 1 });
  const start = { x: 0, y: 0, z: 0 };
  assert.deepEqual(moveEdgeMicroEndpoint(start, 'u'), { x: CELL_SIZE_WORLD, y: 0, z: 0 });
  assert.deepEqual(moveEdgeMicroEndpoint(start, 'K'), { x: 0, y: -CELL_SIZE_WORLD, z: 0 });
  assert.deepEqual(moveEdgeMicroEndpoint({ x: 0, y: 0, z: CELL_SIZE_WORLD }, 'o'), { x: 0, y: 0, z: CELL_SIZE_WORLD * 2 });
  assert.equal(moveEdgeMicroEndpoint(start, 'q'), null);
  assert.equal(moveEdgeMicroEndpoint(start, '__proto__'), null);
});
test('native mechanical export repairs a unique output port and drops input-only links', () => {
  const definitions = new Map([
    ['mechanical_junction_scale', { logic_nodes: [{ type: 'mechanical_in', direction: 4 }, { direction: 5 }], surfaces: [{}, {}, {}, {}, { dir: 5, gender: 1, type: 'mechanical' }] }],
    ['mechanical_bracket', { logic_nodes: [{ type: 'mechanical_in', direction: 4 }, { direction: 5 }], surfaces: [{}, { dir: 5, gender: 2, type: 'mechanical' }, { dir: 4, gender: 1, type: 'mechanical' }] }],
    ['electric_relay', { logic_nodes: [{ type: 'mechanical_in', direction: 3 }] }],
  ]);
  const component = (id, type) => ({ id, type, position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } });
  const document = project([
    component('junction', 'mechanical_junction_scale'),
    component('bracket', 'mechanical_bracket'),
    component('relay', 'electric_relay'),
  ], { links: [
    { id: 'repair', kind: 'mechanical', from: { componentId: 'junction' }, to: { componentId: 'bracket' }, points: [] },
    { id: 'drop', kind: 'mechanical', from: { componentId: 'relay' }, to: { componentId: 'bracket' }, points: [] },
  ] });
  const vehicle = toNativePairFromEditor(document, { componentDefinitions: definitions }).data.vehicles.vehicles[0];
  assert.deepEqual(vehicle.mechanical_links, [{ p0: { comp: 1, pos: 1 }, p1: { comp: 2 }, points: [] }]);
});
test('native export omits unreferenced editor nodes and keeps structural references intact', () => {
  const document = project([], {
    nodes: [
      { id: 'orphan', position: { x: cell(2), y: 0, z: 0 }, standalone: true },
      { id: 'a', position: { x: 0, y: 0, z: 0 } },
      { id: 'b', position: { x: cell(1), y: 0, z: 0 } },
    ],
    edges: [{ id: 'edge', a: 'a', b: 'b' }], plates: [],
  });
  const vehicle = toNativePairFromEditor(document).data.vehicles.vehicles[0];
  assert.deepEqual(vehicle.nodes.map(node => node.pos), [[0, 0, 0], [-1, 0, 0]]);
  assert.deepEqual(vehicle.edges, [{ n0: 1, n1: 2 }]);
  assert.throws(() => toNativePairFromEditor({ objects: [], topology: { nodes: [], edges: [{ a: 'missing', b: 'also-missing' }], plates: [] } }), /missing node/);
});
test('native export removes a collinear isolated plate node before native subgrid partitioning', () => {
  const point = (x, y, z) => ({ id: `${x}-${y}-${z}`, nativeProjected: true, position: { x: cell(x), y: cell(y), z: cell(z) } });
  const left = point(-1, 0, 0); const isolated = point(0, 0, 0); const right = point(1, 0, 0);
  const top = point(1, 1, 0);
  const document = project([], {
    nodes: [isolated, right, top, left],
    edges: [
      { id: 'right-top', a: right.id, b: top.id },
      { id: 'top-left', a: top.id, b: left.id },
      { id: 'left-right', a: left.id, b: right.id },
    ],
    plates: [{ id: 'plate', nodeIds: [isolated.id, right.id, top.id, left.id] }],
  });
  const vehicle = toNativePairFromEditor(document).data.vehicles.vehicles[0];
  assert.deepEqual(vehicle.nodes.map(node => node.id), [1, 2, 3]);
  assert.deepEqual(vehicle.plates[0].nodes, [3, 2, 1]);
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
test('wheel tyres normalize legacy direct acc items to the game element path', () => {
  const native = {
    definitions: { components: ['wheel'] },
    vehicles: { vehicles: [{ id: 1, grids: [{ components: [{
      def: 0, id: 7, pos: [2, 3, 4],
      acc: { item: { _type: 'wheel_5_prong_tread', id: 42, pattern: 1 } },
    }] }] }] },
  };
  const document = toEditorDocument(parseNativePair(native, {}));
  assert.equal(document.objects[0].nativeAccessoryContainer, 'element.acc');
  const exported = toNativePairFromEditor(validateDocument(document, new Map([['wheel', {}]]))).data.vehicles.vehicles[0].grids[0].components[0];
  assert.equal(exported.acc, undefined);
  assert.deepEqual(exported.element, native.vehicles.vehicles[0].grids[0].components[0].acc && { acc: native.vehicles.vehicles[0].grids[0].components[0].acc });
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
  assert.deepEqual(accessoryOptionsForComponent('oil_filter'), ['oil_filter']);
  assert.deepEqual(accessoryOptionsForComponent('air_filter'), ['air_filter']);
  assert.deepEqual(accessoryOptionsForComponent('air_filter_b'), ['air_filter_b']);
  assert.equal(defaultAccessoryForPlacement('oil_filter'), 'oil_filter');
  assert.equal(defaultAccessoryForPlacement('air_filter'), 'air_filter');
  assert.equal(defaultAccessoryForPlacement('air_filter_b'), 'air_filter_b');
  assert.equal(defaultAccessoryForPlacement('battery_a'), null);
  assert.deepEqual(createNativeAccessoryItem('oil_filter', 101), { _type: 'oil_filter', id: 101 });
  assert.deepEqual(nativeAccessoryDefinition('oil_filter').meshBinding.dynamicMeshes, [{ index: 0, path: 'meshes/components/oil_filter_a.mesh', position: [0, .08, 0], addComponentTool: false }]);
  assert.deepEqual(nativeAccessoryDefinition('air_filter').meshBinding.dynamicMeshes, [{ index: 0, path: 'meshes/components/air_filter_a.mesh', position: [.04, .16, .04], addComponentTool: false }]);
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
test('filter media remain attached to their filter host at the native acc.item path', () => {
  const native = {
    definitions: { components: ['oil_filter'] },
    vehicles: { vehicles: [{ id: 1, grids: [{ components: [{
      def: 0, id: 33, pos: [2, 3, 4],
      acc: { item: { _type: 'oil_filter', id: 40531 } },
    }] }] }] },
  };
  const document = toEditorDocument(parseNativePair(native, {}));
  const filter = document.objects.find(object => object.type === 'oil_filter');
  assert.deepEqual(filter.nativeAccessory, native.vehicles.vehicles[0].grids[0].components[0].acc.item);
  assert.equal(filter.nativeAccessoryContainer, 'acc');
  const pair = toNativePairFromEditor(validateDocument(document, new Map([['oil_filter', {}]])));
  const exported = pair.data.vehicles.vehicles[0].grids[0].components[0];
  assert.deepEqual(exported.acc, native.vehicles.vehicles[0].grids[0].components[0].acc);
  assert.equal(exported.element, undefined);
});
test('component paint RGB values resolve to deterministic native palette slots', () => {
  assert.equal(paintColorValue(undefined), null);
  assert.equal(paintColorValue(null), null);
  assert.equal(paintColorValue('#AbC123'), '#abc123');
  assert.equal(paintColorValue('not-a-color'), null);
  assert.equal(officialPaintColors().length, 85);
  assert.equal(nativePaintColor(0), '#cdba88');
  assert.equal(nativePaintColor(26), '#861a22');
  assert.equal(nativePaintColor(49), '#191e28');
  assert.equal(nativePaintColor(84), '#0e0e10');
  assert.equal(nativePaintColor(85), null);
  assert.equal(nearestNativePaintIndex('#861a22'), 26);
  assert.equal(nearestNativePaintIndex('#bd2636'), 35);
  assert.ok(nearestNativePaintIndex('#ffffff') < 85);
  assert.equal(nearestNativePaintIndex('bd2636'), null);
});
test('native export maps RGB paint across components, edges, plate faces and links', () => {
  const document = project([{ ...object, id: 'painted', colors: [79, 49], paintColor: '#861a22' }, { ...object, id: 'untouched', colors: [49] }], {
    nodes: [{ id: 'a', position: { x: 0, y: 0, z: 0 } }, { id: 'b', position: { x: cell(1), y: 0, z: 0 } }, { id: 'c', position: { x: 0, y: cell(1), z: 0 } }],
    edges: [{ id: 'painted-edge', a: 'a', b: 'b', col: 49, color: '#861a22' }, { id: 'untouched-edge', a: 'b', b: 'c', col: 49 }],
    plates: [{ id: 'plate', nodeIds: ['a', 'b', 'c'], col_front: 49, col_back: 79, color_front: '#861a22' }],
    links: [{ id: 'link', kind: 'electric', from: { componentId: 'painted' }, to: { componentId: 'untouched' }, points: [], color: 49, paintColor: '#861a22' }],
  });
  const vehicle = toNativePairFromEditor(document).data.vehicles.vehicles[0];
  assert.deepEqual(vehicle.grids[0].components.map(component => component.colors), [[26, 26], [49]]);
  assert.deepEqual(vehicle.edges.map(edge => edge.col), [26, 49]);
  assert.deepEqual([vehicle.plates[0].col_front, vehicle.plates[0].col_back], [26, 79]);
  assert.equal(vehicle.electric_links[0].color, 26);
  assert.throws(() => toNativePairFromEditor(project([{ ...object, paintColor: 'red' }])), /Hex RGB/);
});
test('native plate export keeps the saved front direction after X reflection', () => {
  const document = project([], {
    nodes: [
      { id: 'a', position: { x: 0, y: 0, z: 0 } },
      { id: 'b', position: { x: cell(1), y: 0, z: 0 } },
      { id: 'c', position: { x: 0, y: cell(1), z: 0 } },
    ],
    plates: [{ id: 'plate', nodeIds: ['a', 'c', 'b'], surfaceDirection: { x: 0, y: 0, z: 1 } }],
  });
  const vehicle = toNativePairFromEditor(document).data.vehicles.vehicles[0];
  assert.deepEqual(vehicle.plates[0].nodes, [1, 3, 2]);
  const points = new Map(vehicle.nodes.map(node => [node.id, node.pos]));
  const [a, b, c] = vehicle.plates[0].nodes.map(id => points.get(id));
  const normal = [
    (b[1] - a[1]) * (c[2] - a[2]) - (b[2] - a[2]) * (c[1] - a[1]),
    (b[2] - a[2]) * (c[0] - a[0]) - (b[0] - a[0]) * (c[2] - a[2]),
    (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]),
  ];
  assert.ok(normal[2] > 0);
});
test('project names persist in documents and produce safe export file names', () => {
  assert.equal(normalizeProjectName('  Research Vehicle  '), 'Research Vehicle');
  assert.equal(normalizeProjectName('   '), DEFAULT_PROJECT_NAME);
  assert.equal(projectFileBaseName('Test: Vehicle / Mk*2'), 'Test_ Vehicle _ Mk_2');
  assert.equal(projectFileBaseName('CON'), DEFAULT_PROJECT_NAME);
  const document = validateDocument(project([], undefined, undefined, undefined, 'Research Vehicle'), definitions);
  assert.equal(document.projectName, 'Research Vehicle');
  assert.match(toIntermediateXml(document), /name="Research Vehicle"/);
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
test('native YZ-plane conversion round-trips asymmetric structure, routes and orientation', () => {
  const native = { definitions: { components: ['engine'] }, vehicles: { vehicles: [{ id: 1,
    grids: [{ components: [
      { def: 0, id: 1, pos: [-3, 2, 1], rot: [0, 0, -1, 0, 1, 0, 1, 0, 0] },
      { def: 0, id: 2, pos: [1, -2, 0], rot: [1, 0, 0, 0, 1, 0, 0, 0, 1] },
    ] }],
    nodes: [{ id: 1, pos: [-4, 0, 0] }, { id: 2, pos: [2, 0, 0] }, { id: 3, pos: [2, 2, 0] }],
    edges: [{ n0: 1, n1: 2 }],
    plates: [{ id: 1, nodes: [1, 2, 3], col_front: 26, col_back: 49 }],
    electric_links: [{ p0: { comp: 1, pos: 0 }, p1: { comp: 2, pos: 1 }, points: [[-2, 1, 0]] }],
  }] } };
  const document = toEditorDocument(parseNativePair(native, {}));
  assert.deepEqual(document.objects.map(value => value.position.x), [.24, -.08]);
  assert.ok(Math.abs(document.objects[0].rotation.y + Math.PI / 2) < 1e-12);
  assert.deepEqual(document.topology.nodes.map(value => value.position.x), [.32, -.16, -.16]);
  assert.deepEqual(document.topology.plates[0].nodeIds, ['grid-1-1:3', 'grid-1-1:2', 'grid-1-1:1']);
  assert.deepEqual(document.topology.links[0].points, [{ x: .16, y: .08, z: 0 }]);
  const pair = toNativePairFromEditor(document);
  const output = pair.data.vehicles.vehicles[0];
  assert.deepEqual(output.grids[0].components.map(value => value.pos), [[-3, 2, 1], [1, -2, 0]]);
  for (const [index, value] of output.grids[0].components[0].rot.entries()) assert.ok(Math.abs(value - native.vehicles.vehicles[0].grids[0].components[0].rot[index]) < 1e-12);
  assert.deepEqual(output.nodes.map(value => value.pos), [[-4, 0, 0], [2, 0, 0], [2, 2, 0]]);
  assert.deepEqual(output.plates[0].nodes, [1, 2, 3]);
  assert.deepEqual(output.electric_links[0].points, [[-2, 1, 0]]);
  assert.deepEqual(pair.meta.vehicles.vehicles[0].bounds, { min: [-.32, -.16, 0], max: [.16, .16, .08] });
});
test('native Mesh visual basis mirrors local X without changing serialized component scale', () => {
  const object = new THREE.Group();
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(.08, .08, .08));
  mesh.position.x = .24;
  object.add(mesh);
  reflectVisualBasis(object, 'x');
  object.position.x = .4;
  object.updateMatrixWorld(true);
  assert.equal(object.scale.x, 1);
  assert.ok(Math.abs(mesh.getWorldPosition(new THREE.Vector3()).x - .16) < 1e-12);
  mesh.geometry.dispose();
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
  assert.ok(Math.abs(parent.position.x + .64) < 1e-12);
  assert.ok(Math.abs(parent.position.y - 2.352) < 1e-12);
  assert.ok(Math.abs(parent.position.z - 2.456) < 1e-12);
  const rotation = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(parent.rotation.x, parent.rotation.y, parent.rotation.z));
  assert.ok(new THREE.Vector3(1, 0, 0).applyMatrix4(rotation).distanceTo(new THREE.Vector3(-1, 0, 0)) < 1e-12);
  assert.ok(new THREE.Vector3(0, 0, 1).applyMatrix4(rotation).distanceTo(new THREE.Vector3(0, .8, -.6)) < 1e-12);
  // Attachment offsets use the already transformed anchors, so a child
  // vehicle's connector occupies exactly the parent's grid-frame position.
  assert.deepEqual(childAnchor.position, parent.position);
  assert.deepEqual(document.topology.nodes[0].position, { x: -.16, y: .4, z: .56 });
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
    for (const [index, axis] of ['x', 'y', 'z'].entries()) assert.ok(Math.abs(object.position[axis] - (axis === 'x' ? -expected.worldPosition[index] : expected.worldPosition[index])) < 1e-12, `${expected.id} ${axis}`);
    const normal = new THREE.Vector3(0, 1, 0).applyMatrix4(rotation);
    assert.ok(normal.distanceTo(new THREE.Vector3(-expected.mountingNormal[0], expected.mountingNormal[1], expected.mountingNormal[2])) < 1e-12, `${expected.id} mounting normal`);
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
test('native child import ignores logic ports when a rigid hinge anchor is present', () => {
  const native = {
    definitions: { components: ['hinge_knuckle', 'hinge_pin', 'electrical_interface_angle'] },
    vehicles: { vehicles: [
      { id: 1, grids: [{ components: [
      { def: 0, id: 1, pos: [0, 0, 0], rot: [1, 0, 0, 0, 1, 0, 0, 0, 1], connected_vehicle: 2, connected_component: 1 },
      { def: 2, id: 2, pos: [0, 0, 0], rot: [1, 0, 0, 0, 1, 0, 0, 0, 1], connected_vehicle: 2, connected_component: 2 },
      ] }] },
      { id: 2, grids: [{ components: [
      { def: 1, id: 1, pos: [0, 0, 0], rot: [1, 0, 0, 0, 1, 0, 0, 0, 1] },
      { def: 2, id: 2, pos: [1, 0, 0], rot: [1, 0, 0, 0, 1, 0, 0, 0, 1] },
      ] }] },
    ] },
  };
  const document = toEditorDocument(parseNativePair(native, {}), { vehicleIds: ['1'] });
  assert.equal(document.objects.length, 4);
});
test('native component mates become physical connections for hinge and related connectors', () => {
  const definitions = ['hinge_pin', 'hinge_knuckle', 'latch_pin', 'latch_knuckle', 'mounting_pin', 'mounting_knuckle', 'rail', 'rail_slider', 'rail_ballscrew', 'rail_ballscrew_slider', 'tow_bar', 'tow_hitch', 'truck_hitch_kingpin', 'truck_hitch'];
  const components = [
    ['hinge_pin', [0, 0, 0]], ['hinge_knuckle', [0, 0, 1]],
    ['latch_pin', [0, 0, -1]], ['latch_knuckle', [0, 0, 0]],
    ['mounting_pin', [2, 0, 0]], ['mounting_knuckle', [2, 0, 0]],
    ['rail', [4, 0, 0]], ['rail_slider', [4, 0, 0]],
    ['rail_ballscrew', [6, 0, 0]], ['rail_ballscrew_slider', [6, 0, 0]],
    ['tow_bar', [8, 0, 0]], ['tow_hitch', [8, 0, 0]],
    ['truck_hitch_kingpin', [10, 1, 0]], ['truck_hitch', [10, 3, 0]],
  ].map(([type, pos], index) => ({ def: definitions.indexOf(type), id: index + 1, pos, rot: type === 'truck_hitch' ? [-1, 0, 0, 0, -1, 0, 0, 0, 1] : [1, 0, 0, 0, 1, 0, 0, 0, 1] }));
  const model = parseNativePair({ definitions: { components: definitions }, vehicles: { vehicles: [{ id: 1, grids: [{ components }] }] } }, {});
  const topology = toEditorTopology(model, { vehicleIds: ['1'] });
  assert.deepEqual(topology.mechanicalConnections.map(connection => connection.type), ['hinge', 'latch', 'mounting', 'rail', 'rail_ballscrew', 'tow', 'tow']);
  const hinge = topology.mechanicalConnections.find(connection => connection.type === 'hinge');
  assert.deepEqual(hinge.from, '1:grid-1-1:1');
  assert.deepEqual(hinge.to, '1:grid-1-1:2');
  assert.deepEqual(hinge.position, { x: 0, y: 0, z: 0 });
  assert.deepEqual(hinge.limits, { min: 0, max: Math.PI });
  assert.equal(validateDocument(toEditorDocument(model, { vehicleIds: ['1'] }), new Map(definitions.map(type => [type, {}]))).topology.mechanicalConnections.length, 7);
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
test('connection commands preserve networks and hydraulic cylinders and validate endpoints', () => {
  assert.deepEqual(LINK_COLORS, {
    electric: '#f1c232', mechanical: '#f2994a', liquid: '#2f80ed',
    gas: '#27ae60', belt: '#98a2b3', data: '#9b51e0', hydraulic: '#64748b',
  });
  assert.deepEqual(LINK_RENDER_STYLES, {
    electric: { radius: .009, radialSegments: 8 }, mechanical: { radius: .022, radialSegments: 8 },
    liquid: { radius: .021, radialSegments: 8 }, gas: { radius: .019, radialSegments: 8 },
    belt: { linewidth: 3, dashSize: .04, gapSize: .025 }, data: { radius: .0075, radialSegments: 8 },
    hydraulic: { radius: .035, radialSegments: 12 },
  });
  const componentIds = new Set(['source', 'target']);
  let links = [];
  for (const kind of LINK_KINDS) {
    const result = createLink(links, { kind, from: { componentId: 'source', port: 0 }, to: { componentId: 'target', port: 1 }, ...(kind === 'hydraulic' ? { points: [], lengthMax: 8, extensionFactor: 1 } : { points: [{ x: cell(1), y: 0, z: 0 }] }) }, componentIds);
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
test('malformed connection routes can be pruned without losing empty native routes', () => {
  const valid = { id: 'valid', kind: 'electric', from: { componentId: 'source' }, to: { componentId: 'target' }, points: [] };
  const malformed = [
    valid,
    { ...valid, id: 'missing', from: { componentId: 'unknown' } },
    { ...valid, id: 'long', points: [{ x: 0, y: 0, z: 0 }, { x: MAX_CONNECTION_ROUTE_SEGMENT + 1, y: 0, z: 0 }] },
    { ...valid, id: 'valid' },
  ];
  assert.equal(connectionRouteIsSafe(valid), true);
  assert.equal(connectionRouteIsSafe(malformed[2]), false);
  assert.deepEqual(pruneInvalidConnections(malformed, new Set(['source', 'target'])).map(link => link.id), ['valid']);
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
  const authored = mergeNodes(
    [{ ...state.nodes[0], standalone: true }, state.nodes[1], state.nodes[2]],
    state.edges, state.plates, 'node-1', 'node-2',
  );
  assert.equal(authored.nodes.find(node => node.id === 'node-2').standalone, true);
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
test('unused generated topology nodes are collected while meaningful standalone and native nodes remain', () => {
  const state = {
    nodes: [
      { id: 'used-a', position: { x: 0, y: 0, z: 0 } },
      { id: 'used-b', position: { x: cell(1), y: 0, z: 0 } },
      { id: 'plate-only', position: { x: 0, y: cell(1), z: 0 } },
      { id: 'generated-orphan', position: { x: cell(2), y: 0, z: 0 } },
      { id: 'standalone', position: { x: cell(3), y: 0, z: 0 }, standalone: true },
      { id: 'native', position: { x: .13, y: .27, z: .41 }, nativeProjected: true },
    ],
    edges: [{ id: 'edge-1', a: 'used-a', b: 'used-b' }],
    plates: [{ id: 'plate-1', nodeIds: ['used-a', 'used-b', 'plate-only'] }],
  };
  const cleaned = pruneUnusedTopology(state);
  assert.deepEqual(cleaned.nodes.map(node => node.id), ['used-a', 'used-b', 'plate-only', 'standalone', 'native']);
  assert.deepEqual(validateTopologyState(cleaned), cleaned);
  assert.throws(() => validateTopologyState({ ...state, nodes: [{ id: 'bad', position: { x: 0, y: 0, z: 0 }, standalone: false }] }), /独立节点标记/);
});
test('deleting the last edge allows its generated endpoints to be collected', () => {
  const state = createEdgeFromPoints({}, { x: 0, y: 0, z: 0 }, { x: cell(1), y: 0, z: 0 });
  const cleaned = pruneUnusedTopology(removeEdge(state, state.edges[0].id));
  assert.deepEqual(cleaned, { nodes: [], edges: [], plates: [] });
  const standalone = { ...state, nodes: state.nodes.map((node, index) => index === 0 ? { ...node, standalone: true } : node) };
  assert.deepEqual(pruneUnusedTopology(removeEdge(standalone, standalone.edges[0].id)).nodes.map(node => node.id), [state.nodes[0].id]);
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
test('plate inner surfaces use normal-facing node support points without tangential expansion', () => {
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
    [0, 0, CELL_SIZE_WORLD / 2],
    [size, 0, CELL_SIZE_WORLD / 2],
    [size, size, CELL_SIZE_WORLD / 2],
    [0, size, CELL_SIZE_WORLD / 2],
  ];
  boundary.forEach((point, index) => point.toArray().forEach((value, axis) => {
    assert.ok(Math.abs(value - expectedBoundary[index][axis]) < 1e-9);
  }));
  const front = plateSurfaceVertices(ids, positions, { surfaceDirection: new THREE.Vector3(0, 0, 1) });
  const frontCorners = Array.from({ length: front.length / 3 }, (_, index) => front.slice(index * 3, index * 3 + 3));
  const uniqueFront = [...new Map(frontCorners.map(point => [point.join(','), point])).values()];
  assert.equal(uniqueFront.length, 4);
  uniqueFront.forEach(point => assert.ok(
    Math.abs(point[0]) < 1e-9 || Math.abs(point[0] - size) < 1e-9,
  ));
  const back = plateSurfaceVertices(ids, positions, { surfaceDirection: new THREE.Vector3(0, 0, -1) });
  assert.ok(back.every((value, index) => index % 3 !== 2 || Math.abs(value + CELL_SIZE_WORLD / 2) < 1e-9));
});
test('spatial plates use the normal-facing support corner, independent of camera tangents', () => {
  const positions = new Map([
    ['a', new THREE.Vector3(0, 0, 0)],
    ['b', new THREE.Vector3(CELL_SIZE_WORLD * 3, CELL_SIZE_WORLD, CELL_SIZE_WORLD)],
    ['c', new THREE.Vector3(CELL_SIZE_WORLD * 2, CELL_SIZE_WORLD * 4, CELL_SIZE_WORLD * 2)],
    ['d', new THREE.Vector3(-CELL_SIZE_WORLD, CELL_SIZE_WORLD * 3, CELL_SIZE_WORLD)],
  ]);
  const direction = new THREE.Vector3(-2, -4, 10).normalize();
  for (const ids of [['a', 'b', 'c'], ['a', 'b', 'c', 'd']]) {
    const boundary = plateSurfaceBoundary(ids, positions, { surfaceDirection: direction });
    assert.equal(boundary.length, ids.length);
    assert.ok(boundary.every(point => point.toArray().every(Number.isFinite)));
    boundary.forEach((point, index) => {
      const source = positions.get(ids[index]);
      for (const axis of ['x', 'y', 'z']) assert.ok(Math.abs(point[axis] - source[axis] - Math.sign(direction[axis]) * CELL_SIZE_WORLD / 2) < 1e-9);
    });
    const vertices = plateSurfaceVertices(ids, positions, { surfaceDirection: direction });
    assert.ok(vertices.length >= 9 && vertices.every(Number.isFinite));
  }
});
test('acute plate corners retain the node loop without miter expansion', () => {
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
      Math.abs(point[axis] - source[axis] - (axis === 'z' ? CELL_SIZE_WORLD / 2 : 0)) < 1e-9,
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
  assert.equal(route.children.filter(child => child.geometry.type === 'ConnectionElbowGeometry').length, 1);
  assert.equal(material.flatShading, true);
  const segment = route.children.find(child => child.geometry.type === 'CylinderGeometry');
  assert.equal(segment.geometry.parameters.radialSegments, 8);
  const ring = segment.geometry.attributes.position;
  const top = Math.max(...Array.from({ length: 8 }, (_, index) => ring.getX(index)));
  assert.equal(Array.from({ length: 8 }, (_, index) => Math.abs(ring.getX(index) - top) < 1e-6).filter(Boolean).length, 2);
  assert.equal(route.children.find(child => child.geometry.type === 'ConnectionElbowGeometry').geometry.attributes.position.count, 8 * 8 * 6);
  const stubbed = createConnectionRoute([
    { x: 0, y: 0, z: 0 }, { x: cell(1), y: 0, z: 0 },
    { x: cell(1), y: cell(1), z: 0 }, { x: cell(2), y: cell(1), z: 0 },
  ], material, { radius: .02, radialSegments: 8, jointUserData: index => ({ pathIndex: index }) });
  assert.equal(stubbed.children.filter(child => child.geometry.type === 'ConnectionElbowGeometry').length, 2);
  assert.deepEqual(stubbed.children.filter(child => child.geometry.type === 'ConnectionElbowGeometry').map(child => child.userData.pathIndex), [0, 1]);
  const noOffset = createConnectionRoute([
    { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: cell(1), y: 0, z: 0 },
  ], material);
  assert.equal(noOffset.children.some(child => child.geometry.type === 'SphereGeometry'), false);
  assert.equal(noOffset.children.filter(child => child.geometry.type === 'CylinderGeometry').length, 1);
  const noOffsetBounds = new THREE.Box3().setFromObject(noOffset);
  assert.ok(noOffsetBounds.getSize(new THREE.Vector3()).x < .2);
  const emptyRoute = createConnectionRoute([
    { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 },
  ], material);
  assert.equal(emptyRoute.children.length, 0);
  noOffset.traverse(object => object.geometry?.dispose());
  emptyRoute.traverse(object => object.geometry?.dispose());
  stubbed.traverse(object => object.geometry?.dispose());
  joint.geometry.dispose(); route.traverse(object => object.geometry?.dispose()); material.dispose();
});
test('belt connection is one dashed node-to-node line with measured distances', () => {
  const material = new LineMaterial({ color: 0x98a2b3, ...LINK_RENDER_STYLES.belt, dashed: true });
  const line = createDashedConnection({ x: 0, y: 0, z: 0 }, { x: cell(3), y: cell(4), z: 0 }, material);
  assert.equal(line.isLine2, true);
  assert.equal(material.linewidth, 3);
  assert.equal(material.dashed, true);
  assert.equal(line.geometry.getAttribute('instanceStart').count, 1);
  assert.equal(line.geometry.getAttribute('instanceDistanceStart').getX(0), 0);
  assert.ok(Math.abs(line.geometry.getAttribute('instanceDistanceEnd').getX(0) - cell(5)) < 1e-6);
  assert.equal(line.children.length, 0);
  line.geometry.dispose(); material.dispose();
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
test('component placement follows the real Mesh surface normal without double offsetting', () => {
  const vehicle = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
  vehicle.rotation.x = -Math.PI / 2; vehicle.position.y = .5;
  vehicle.updateMatrixWorld(true);
  const pointer = new THREE.Raycaster(new THREE.Vector3(.17, 1, .17), new THREE.Vector3(0, -1, 0));
  const workPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  assert.deepEqual(resolvePlacementPoint(pointer, [vehicle], workPlane).toArray(), [cell(2), cell(7), cell(2)]);
  const halfCell = CELL_SIZE_WORLD / 2;
  const centredBlock = new THREE.Box3(new THREE.Vector3(-halfCell, -halfCell, -halfCell), new THREE.Vector3(halfCell, halfCell, halfCell));
  assert.deepEqual(resolvePlacementPoint(pointer, [vehicle], workPlane, { placementBounds: centredBlock }).toArray(), [cell(2), cell(7), cell(2)]);
  assert.deepEqual(resolvePlacementPoint(pointer, [], workPlane).toArray(), [cell(2), 0, cell(2)]);
  vehicle.geometry.dispose(); vehicle.material.dispose();
});
test('component placement uses side-face normals and the placed Mesh bounds', () => {
  const vehicle = new THREE.Mesh(new THREE.BoxGeometry(CELL_SIZE_WORLD, CELL_SIZE_WORLD, CELL_SIZE_WORLD), new THREE.MeshBasicMaterial());
  vehicle.position.set(0, cell(2), 0); vehicle.updateMatrixWorld(true);
  const pointer = new THREE.Raycaster(new THREE.Vector3(1, cell(2), 0), new THREE.Vector3(-1, 0, 0));
  const workPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const halfCell = CELL_SIZE_WORLD / 2;
  const placedBounds = new THREE.Box3(new THREE.Vector3(-CELL_SIZE_WORLD * 1.5, -halfCell, -halfCell), new THREE.Vector3(CELL_SIZE_WORLD * 1.5, halfCell, halfCell));
  assert.deepEqual(resolvePlacementPoint(pointer, [vehicle], workPlane, { placementBounds: placedBounds }).toArray(), [cell(2), cell(2), 0]);
  vehicle.geometry.dispose(); vehicle.material.dispose();
});
test('edge endpoint cube snaps outside component side faces', () => {
  const vehicle = new THREE.Mesh(new THREE.BoxGeometry(CELL_SIZE_WORLD, CELL_SIZE_WORLD, CELL_SIZE_WORLD), new THREE.MeshBasicMaterial());
  vehicle.position.set(0, cell(2), 0); vehicle.updateMatrixWorld(true);
  const pointer = new THREE.Raycaster(new THREE.Vector3(1, cell(2), 0), new THREE.Vector3(-1, 0, 0));
  const workPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const point = resolvePlacementPoint(pointer, [vehicle], workPlane, { placementBounds: NODE_PLACEMENT_BOUNDS });
  assert.deepEqual(point.toArray(), [cell(1), cell(2), 0]);
  assert.ok(point.x + NODE_PLACEMENT_BOUNDS.min.x >= CELL_SIZE_WORLD / 2 - 1e-9);
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

const modelArrayBuffer = buffer => buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

test('model GLB parser applies hierarchy and reflection without fetching material URLs', () => {
  const fixture = modelGlbFixture(json => {
    json.nodes = [{ translation: [3, 2, 1], children: [1] }, { mesh: 0, scale: [-2, 2, 2] }];
    json.images = [{ uri: 'http://127.0.0.1/private.png' }];
  });
  const parsed = parseModel(modelArrayBuffer(fixture), 'quad.GLB');
  assert.deepEqual(modelBounds(parsed.positions), { min: [1, 2, 1], max: [3, 4, 1], size: [2, 2, 0] });
  assert.deepEqual([...parsed.indices], [0, 2, 1, 0, 3, 2]);
  assert.equal(parsed.rawVertices, 4);
  const result = convertModel(simplifyModel(parsed, 0));
  assert.deepEqual(result.counts, { nodes: 4, edges: 4, faces: 1, plates: 1, quads: 1, triangles: 0 });
  assert.ok(result.topology.plates.every(plate => plate.surfaceDirection.z > .99));
  assert.doesNotThrow(() => validateDocument(project([], result.topology), new Map()));
});

test('model GLB parser rejects external buffers, cycles, invalid counts, indices and nonfinite positions', () => {
  const mutations = [
    json => { json.buffers[0].uri = 'http://127.0.0.1/private.bin'; },
    json => { json.nodes[0].children = [0]; },
    json => { json.accessors[0].count = 2000000000; },
    json => { json.accessors[0].sparse = {}; },
    json => { json.bufferViews[0].byteOffset = 99999; },
    json => { json.extensionsRequired = ['KHR_draco_mesh_compression']; },
    (_json, binary) => { binary.writeUInt16LE(90, 48); },
    (_json, binary) => { binary.writeFloatLE(NaN, 0); },
  ];
  for (const mutate of mutations) assert.throws(() => parseModel(modelArrayBuffer(modelGlbFixture(mutate)), 'bad.glb'));
  assert.throws(() => parseModel(new ArrayBuffer(33 * 1024 * 1024), 'bad.glb'), /模型过大/);
  assert.throws(() => parseModel(modelArrayBuffer(modelGlbFixture().subarray(0, 32)), 'bad.glb'));
});

test('OBJ negative indices and ASCII/binary STL produce welded editable triangles', () => {
  const obj = Buffer.from('v 0 0 0\nv 1 0 0\nv 1 1 0\nv 0 1 0\nf -4 -3 -2 -1\n');
  const parsed = parseModel(modelArrayBuffer(obj), 'quad.obj');
  assert.equal(parsed.rawFaces, 2);
  assert.equal(convertModel(simplifyModel(parsed, 0)).counts.edges, 4);
  const ascii = Buffer.from('solid triangle\nfacet normal 0 0 1\nouter loop\nvertex 0 0 0\nvertex 1 0 0\nvertex 0 1 0\nendloop\nendfacet\nendsolid triangle');
  const binary = Buffer.alloc(134); binary.writeUInt32LE(1, 80); binary.writeFloatLE(1, 92); binary.writeFloatLE(1, 108); binary.writeFloatLE(1, 124);
  for (const [name, file] of [['ascii.stl', ascii], ['binary.stl', binary]]) {
    const mesh = simplifyModel(parseModel(modelArrayBuffer(file), name), 0);
    assert.equal(mesh.indices.length, 3);
    assert.equal(convertModel(mesh, { panels: false }).topology.plates.length, 0);
  }
  assert.throws(() => parseModel(modelArrayBuffer(Buffer.from('v 0 0 0\nf 1 2 3')), 'bad.obj'));
});

test('model simplification reduces faces; scale, normals, cleanup and bounds match generated topology', () => {
  const positions = [], indices = [];
  for (let y = 0; y <= 16; y++) for (let x = 0; x <= 16; x++) positions.push(x / 16, y / 16, 0);
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) {
    const a = y * 17 + x; indices.push(a, a + 1, a + 18, a, a + 18, a + 17);
  }
  const mesh = { positions: new Float64Array(positions), indices: new Uint32Array(indices) };
  const detailed = simplifyModel(mesh, 0), coarse = simplifyModel(mesh, 9);
  assert.ok(detailed.positions.length / 3 <= 250);
  assert.ok(coarse.positions.length / 3 <= 70);
  assert.ok(coarse.indices.length < detailed.indices.length);
  const small = convertModel(coarse), large = convertModel(coarse, { scale: 2, reverseNormals: true });
  assert.ok(large.dimensions[0].meters > small.dimensions[0].meters);
  assert.ok(large.topology.plates.every(plate => plate.surfaceDirection.z < -.99));
  assert.ok(small.topology.plates.every(plate => plate.surfaceDirection.z > .99));
  assert.ok(large.topology.nodes.every(node => ['x', 'y', 'z'].every(axis => worldToCell(node.position[axis]) !== null)));
  const occupied = modelBounds(large.preview.positions);
  assert.equal(large.dimensions[0].cells, Math.round(occupied.size[0] / CELL_SIZE_WORLD) + 1);
  assert.doesNotThrow(() => validateDocument(project([], large.topology), new Map()));
  const duplicated = { ...detailed, indices: new Uint32Array([...detailed.indices, ...detailed.indices, 0, 0, 1]) };
  assert.equal(convertModel(duplicated).counts.edges, convertModel(detailed).counts.edges);
  const tiny = convertModel(simplifyModel(parseModel(modelArrayBuffer(modelGlbFixture()), 'quad.glb'), 0), { scale: .01 });
  assert.equal(tiny.topology, null);
  assert.match(tiny.error, /格点吸附/);
});

test('connection port markers retain native interface colors by network and role', () => {
  assert.equal(nativeConnectionPortColor('electric', { type: 'electric' }), NATIVE_PORT_COLORS.electric);
  assert.equal(nativeConnectionPortColor('data', { type: 'data' }), NATIVE_PORT_COLORS.data);
  assert.equal(nativeConnectionPortColor('gas', { type: 'gas' }), NATIVE_PORT_COLORS.gas);
  assert.equal(nativeMechanicalPortRole({ type: 'mechanical_in' }), 'input');
  assert.equal(nativeMechanicalPortRole({ gender: 1 }), 'output');
  assert.equal(nativeMechanicalPortRole({ direction: 4 }, { surfaces: [{ type: 'mechanical', dir: 4, gender: 2 }] }), 'input');
  assert.equal(nativeConnectionPortColor('mechanical', { type: 'mechanical_in' }), NATIVE_PORT_COLORS.mechanicalInput);
  assert.equal(nativeConnectionPortColor('mechanical', { gender: 1 }), NATIVE_PORT_COLORS.mechanicalOutput);
  assert.equal(nativeConnectionPortColor('unknown', {}), NATIVE_PORT_COLORS.fallback);
});
test('real published and local Meshes isolate interface triangles without colouring their casing', async () => {
  const manifest = JSON.parse(readFileSync(new URL('../public/assets/manifests/mesh-manifest.json', import.meta.url)));
  const samples = [
    ['interface_electric_a', 132], ['interface_data_b', 18], ['interface_gas_a', 48],
    ['interface_mechanical_f_a', 38], ['wheel_hub_a_base', 48], ['manifold_pipe_c_straight', 6],
    ['mechanical_bracket', 32], ['pipe_junction_b', 16], ['engine_block_a_0_0_0', 16], ['gear_box_a', 32],
    ['air_manifold_a', 16], ['electric_motor_a', 0], ['electric_motor_b', 0],
    ['interface_liquid_a', 0], ['interface_torque_a', 0], ['circular_dial_c_a', 0],
  ];
  for (const [name, interfaceTriangles] of samples) {
    const source = 'meshes/components/' + name + '.mesh';
    const payload = JSON.parse(gunzipSync(readFileSync(new URL('../public/' + manifest.entries[source].url, import.meta.url))));
    const parsed = { ...payload, parts: payload.parts.map(part => ({ ...part,
      positions: new Float32Array(part.positions), normals: new Float32Array(part.normals),
      uv: new Float32Array(part.uv), colors: new Uint8Array(part.colors), indices: new Uint32Array(part.indices),
    })) };
    const definition = { id: name, mesh: source };
    const published = new PublishedAssetLibrary('./');
    published.manifestPromise = Promise.resolve(manifest);
    published.meshCache.set(source, Promise.resolve(parsed));
    const local = new AssetLibrary(); local.parse = async () => parsed;
    for (const library of [published, local]) {
      const object = await library.instantiate(definition);
      const mesh = object.children[0]; const geometry = mesh.geometry;
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      assert.equal(geometry.index.count, parsed.parts[0].indices.length, name);
      assert.deepEqual([...parsed.parts[0].indices], payload.parts[0].indices, 'shared source indices stay intact');
      assert.deepEqual([...geometry.attributes.gameColorBytes.array], payload.parts[0].colors, 'raw colours stay intact');
      assert.equal(materials[0].vertexColors, false, 'body remains paintable diagnostic material');
      assert.equal(materials[0].color.getHexString(), 'b4c3ce');
      const group = geometry.groups.find(group => materials[group.materialIndex].userData.connectionInterface);
      assert.equal((group?.count || 0) / 3, interfaceTriangles, name);
      if (group) {
        assert.equal(geometry.groups.length, 2, 'only two draw calls, regardless of port count');
        assert.equal(materials[1].color.getHexString(), 'ffffff');
        assert.equal(materials[1].vertexColors, true);
        const identified = new Set(['ff3131', '1860ff', '1e9999', 'ffcc31', '136666', '997100', 'cc9900']);
        for (let i = group.start; i < group.start + group.count; i++) {
          const vertex = geometry.index.getX(i);
          const raw = payload.parts[0].colors.slice(vertex * 4, vertex * 4 + 3).map(n => n.toString(16).padStart(2, '0')).join('');
          assert.ok(identified.has(raw), 'no casing/slot bytes enter the protected interface group');
          assert.equal(new THREE.Color().fromBufferAttribute(geometry.attributes.color, vertex).getHexString(), raw, 'sRGB survives the linear vertex channel');
        }
        const reflected = reflectGeometry(geometry, 'x');
        assert.deepEqual(reflected.groups, geometry.groups);
        assert.deepEqual(reflected.attributes.color.array, geometry.attributes.color.array);
        reflected.dispose();
      } else assert.equal(geometry.attributes.color, undefined, 'unverified body palette is not rendered as literal colour');
      let disposed = 0; materials.forEach(material => material.addEventListener('dispose', () => disposed++));
      disposeObject(object); assert.equal(disposed, materials.length);
    }
  }
});

test('interface classification never bleeds across a mixed body triangle or mutates shared indices', () => {
  const geometry = new THREE.BufferGeometry();
  const original = new Uint16Array([0, 1, 2, 0, 2, 3]);
  geometry.setIndex(new THREE.BufferAttribute(original, 1));
  const colors = new Uint8Array([255, 49, 49, 255, 255, 49, 49, 255, 255, 49, 49, 255, 153, 0, 0, 255]);
  const material = new THREE.MeshStandardMaterial({ color: '#b4c3ce' });
  const materials = applyConnectionInterfaceColors(geometry, colors, 'meshes/components/interface_electric_a.mesh', material);
  assert.deepEqual([...geometry.index.array], [0, 2, 3, 0, 1, 2]);
  assert.deepEqual([...original], [0, 1, 2, 0, 2, 3]);
  assert.deepEqual(geometry.groups, [{ start: 0, count: 3, materialIndex: 0 }, { start: 3, count: 3, materialIndex: 1 }]);
  materials.forEach(material => material.dispose()); geometry.dispose();
});

test('interface isolation disables stale body vertex colours before splitting groups', () => {
  const geometry = new THREE.BufferGeometry();
  geometry.setIndex(new THREE.BufferAttribute(new Uint16Array([0, 1, 2]), 1));
  const material = new THREE.MeshStandardMaterial({ color: '#b4c3ce', vertexColors: true });
  const result = applyConnectionInterfaceColors(geometry, new Uint8Array([
    51, 51, 51, 255, 51, 51, 51, 255, 51, 51, 51, 255,
  ]), 'meshes/components/pipe_junction_b.mesh', material);
  assert.equal(result.vertexColors, false);
  assert.equal(result.color.getHexString(), 'b4c3ce');
  result.dispose(); geometry.dispose();
});

test('published interface assembly leaves sockets uncovered and keeps ordinary dynamic parts', async () => {
  const manifest = JSON.parse(readFileSync(new URL('../public/assets/manifests/mesh-manifest.json', import.meta.url)));
  for (const id of ['electrical_interface_straight', 'data_interface_angle', 'gas_interface_straight',
    'liquid_interface_angle', 'mechanical_interface_in_straight', 'torque_interface_straight', 'wheel']) {
    const definition = JSON.parse(readFileSync(new URL('../public/data/definitions/' + id + '.json', import.meta.url)));
    definition.meshBinding = JSON.parse(readFileSync(new URL('../public/data/bindings/' + id + '.json', import.meta.url)));
    const library = new PublishedAssetLibrary('./'); library.manifestPromise = Promise.resolve(manifest);
    const requested = [];
    library.parse = async source => {
      requested.push(source);
      const payload = JSON.parse(gunzipSync(readFileSync(new URL('../public/' + manifest.entries[source].url, import.meta.url))));
      return { ...payload, parts: payload.parts.map(part => ({ ...part,
        positions: new Float32Array(part.positions), normals: new Float32Array(part.normals),
        uv: new Float32Array(part.uv), colors: new Uint8Array(part.colors), indices: new Uint32Array(part.indices),
      })) };
    };
    const object = await library.instantiate(definition);
    assert.ok(requested.includes(definition.meshBinding.staticMesh));
    assert.ok(requested.every(path => !path.includes('/cable_end_')), 'unconnected sockets are not covered by a cable plug');
    if (id === 'wheel') {
      assert.ok(object.children.length > 10, 'ordinary dynamics with default-false flags are not globally filtered');
      assert.ok(requested.includes('meshes/components/wheel_hub_a_pivot.mesh'));
    } else assert.equal(object.children.length, 1);
    disposeObject(object);
  }
});

test('model shell discards enclosed geometry and small protrusions before budgeted quad lofting', () => {
  const box = (size, offset = [0, 0, 0]) => {
    const geometry = new THREE.BoxGeometry(...size);
    const positions = Float64Array.from(geometry.attributes.position.array, (value, i) => value + offset[i % 3]);
    const indices = new Uint32Array(geometry.index.array); geometry.dispose(); return { positions, indices };
  };
  const combine = (a, b) => ({ positions: new Float64Array([...a.positions, ...b.positions]), indices: new Uint32Array([...a.indices, ...b.indices.map(index => index + a.positions.length / 3)]) });
  const outer = box([2, 1, 4]);
  const reference = simplifyModel(outer);
  const interior = simplifyModel(combine(outer, box([1, .5, 2])));
  assert.deepEqual(interior.positions, reference.positions);
  assert.deepEqual(interior.indices, reference.indices);
  const withDetail = simplifyModel(combine(outer, box([.02, .3, .02], [0, .65, 0])));
  assert.ok(modelBounds(withDetail.positions).max[1] < .6, 'the narrow .8-high protrusion is filtered out');
  const shell = prepareModelShell(outer), counts = [];
  assert.deepEqual(MODEL_VERTEX_TARGETS, [250, 230, 210, 190, 170, 150, 130, 110, 90, 70, 50, 40, 30]);
  for (let level = 0; level < MODEL_VERTEX_TARGETS.length; level++) {
    const result = convertModel(simplifyModel(shell, level));
    assert.equal(result.error, null);
    assert.ok(result.counts.nodes <= 250);
    if (level < 10) assert.ok(result.counts.nodes >= 70);
    else assert.ok(result.counts.nodes < 70, 'higher simplification levels must actually reduce the shell');
    assert.ok(result.counts.quads > result.counts.faces * .75);
    assert.doesNotThrow(() => validateDocument(project([], result.topology), new Map()));
    const incidence = new Map();
    for (const plate of result.topology.plates) plate.nodeIds.forEach((id, i) => {
      const key = [id, plate.nodeIds[(i + 1) % plate.nodeIds.length]].sort().join(',');
      incidence.set(key, (incidence.get(key) || 0) + 1);
    });
    assert.equal(incidence.size, result.counts.edges, 'no internal triangulation beams');
    assert.ok([...incidence.values()].every(count => count === 2), 'the exterior shell is closed');
    counts.push(result.counts.nodes);
  }
  assert.ok(counts.every((count, i) => !i || count <= counts[i - 1]));
  assert.ok(counts[10] > counts[11] && counts[11] > counts[12], 'each extra level produces fewer nodes');
});

test('narrow shell tips keep distinct panel corners and outward native winding', () => {
  const section = (at, minU, maxU, minV, maxV) => ({
    at, minU, maxU, minV, maxV,
    minSum: minU + minV, maxSum: maxU + maxV,
    minDiff: minU - maxV, maxDiff: maxU - minV,
  });
  const profile = { axis: 2, u: 0, v: 1, sections: [
    section(-2, -1, 1, 0, 1),
    section(0, -.8, .8, .1, .9),
    section(2, -.04, .04, .49, .51),
  ] };
  const mesh = { ...loftShellSections(profile), profile, sourceBounds: { min: [-1, 0, -2], max: [1, 1, 2], size: [2, 1, 4] } };
  const result = convertModel(mesh, { symmetryAxis: 'x' });
  assert.equal(result.error, null);
  assert.equal(result.counts.triangles, 0);
  const points = new Map(result.topology.nodes.map(node => [node.id, node.position]));
  for (const edge of result.topology.edges) {
    const a = points.get(edge.a), b = points.get(edge.b);
    assert.ok(Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) >= 2 * CELL_SIZE_WORLD - 1e-9);
  }
  const native = toNativePairFromEditor(project([], result.topology)).data.vehicles.vehicles[0];
  const nativePoints = new Map(native.nodes.map(node => [node.id, node.pos]));
  let signedVolume = 0;
  for (const plate of native.plates) {
    const corners = plate.nodes.map(id => nativePoints.get(id));
    for (let i = 1; i < corners.length - 1; i++) {
      const [a, b, c] = [corners[0], corners[i], corners[i + 1]];
      signedVolume += (a[0] * (b[1] * c[2] - b[2] * c[1])
        + a[1] * (b[2] * c[0] - b[0] * c[2])
        + a[2] * (b[0] * c[1] - b[1] * c[0])) / 6;
    }
  }
  assert.ok(signedVolume > 0, 'native face loops still point outward after X reflection');
});

test('tilted open surfaces retain geometry and quad merging respects winding and grid planarity', () => {
  const mesh = parseModel(modelArrayBuffer(modelGlbFixture(json => { json.nodes[0].rotation = [Math.sin(Math.PI / 8), 0, 0, Math.cos(Math.PI / 8)]; })), 'tilted.glb');
  const shell = prepareModelShell(mesh);
  assert.equal(shell.shellStats.planar, true);
  const result = convertModel(simplifyModel(shell));
  assert.equal(result.counts.quads, 1);
  assert.equal(result.counts.edges, 4);
  assert.equal(result.topology.plates[0].nodeIds.length, 4);
  assert.doesNotThrow(() => validateDocument(project([], result.topology), new Map()));
  assert.ok(result.topology.plates[0].surfaceDirection.z > 0);
  const dense = new THREE.PlaneGeometry(4, 4, 64, 64);
  const reduced = simplifyModel({ positions: new Float64Array(dense.attributes.position.array), indices: new Uint32Array(dense.index.array) });
  dense.dispose();
  assert.ok(reduced.positions.length / 3 <= 150);
  const converted = convertModel(reduced);
  assert.equal(converted.error, null);
  assert.doesNotThrow(() => validateDocument(project([], converted.topology), new Map()));
});

function assertModelSymmetry(result, axis) {
  assert.equal(result.error, null);
  const axisIndex = ['x', 'y', 'z'].indexOf(axis), center = worldToCell(result.symmetry.coordinate);
  const points = result.topology.nodes.map(node => ['x', 'y', 'z'].map(key => worldToCell(node.position[key])));
  assert.ok(points.every(point => point.every(value => value !== null)));
  const keys = new Set(points.map(point => point.join(',')));
  assert.equal(keys.size, points.length, 'no duplicate seam nodes');
  for (const point of points) {
    const reflected = point.map((value, i) => i === axisIndex ? 2 * center - value : value);
    assert.ok(keys.has(reflected.join(',')), `missing ${axis} counterpart of ${point}`);
  }
  const referenced = new Set(result.topology.edges.flatMap(edge => [edge.a, edge.b]));
  assert.equal(referenced.size, points.length, 'all symmetric nodes participate in the structure');
  assert.doesNotThrow(() => validateDocument(project([], result.topology), new Map()));
}

test('model symmetry fits asymmetric shells in all axes without breaking budgets, quads or cached geometry', () => {
  const geometry = new THREE.BoxGeometry(2, 1, 4, 4, 2, 8);
  const original = Array.from(geometry.attributes.position.array);
  const asymmetric = [];
  for (let i = 0; i < original.length; i += 3) {
    const [x, y, z] = original.slice(i, i + 3);
    asymmetric.push(x * (1 + .08 * z) + .12 * z * z + .1 * y, y + .1 * z, z);
  }
  for (let rotate = 0; rotate < 3; rotate++) {
    const positions = asymmetric.map((_, i) => asymmetric[Math.floor(i / 3) * 3 + (i + rotate) % 3]);
    const shell = prepareModelShell({ positions: new Float64Array(positions), indices: new Uint32Array(geometry.index.array) });
    for (const level of [0, 5, 9, 10, 11, 12]) {
      const mesh = simplifyModel(shell, level), saved = structuredClone(mesh), off = convertModel(mesh);
      for (const axis of ['x', 'y', 'z']) for (const scale of [1, 1.02, 1.37]) {
        const result = convertModel(mesh, { symmetryAxis: axis, scale });
        assertModelSymmetry(result, axis);
        assert.ok(result.counts.nodes >= (level < 10 ? 70 : 20) && result.counts.nodes <= (level < 10 ? 250 : 70));
        assert.ok(result.counts.quads > result.counts.faces * .75);
        assert.equal(result.preview.adjustedVertices, 0);
        const incidence = new Map();
        for (const plate of result.topology.plates) plate.nodeIds.forEach((id, i) => {
          const key = [id, plate.nodeIds[(i + 1) % plate.nodeIds.length]].sort().join(',');
          incidence.set(key, (incidence.get(key) || 0) + 1);
        });
        assert.ok([...incidence.values()].every(count => count === 2), 'symmetric shell stays closed');
        if (axis === 'y') assert.ok(result.symmetry.coordinate > 0, 'Y symmetry uses the model center, not ground level');
      }
      assert.deepEqual(mesh, saved, 'conversion does not mutate the reduced mesh or profile');
      assert.deepEqual(convertModel(mesh, { symmetryAxis: null }), off, 'turning symmetry off restores the prior result');
    }
  }
  geometry.dispose();
});

test('model symmetry clips open surfaces, welds the seam and reflects normals', () => {
  const mesh = simplifyModel(parseModel(modelArrayBuffer(modelGlbFixture((_json, binary) => {
    binary.writeFloatLE(.7, 24); binary.writeFloatLE(.6, 28); binary.writeFloatLE(.2, 36);
  })), 'asymmetric.glb'));
  const off = convertModel(mesh), saved = structuredClone(mesh);
  assert.equal(off.counts.nodes, 4);
  for (const axis of ['x', 'y', 'z']) for (const scale of [.5, 1, 1.01, 1.37]) {
    const result = convertModel(mesh, { symmetryAxis: axis, scale });
    assertModelSymmetry(result, axis);
    assert.ok(result.topology.plates.every(plate => plate.surfaceDirection.z > .99));
    const reversed = convertModel(mesh, { symmetryAxis: axis, scale, reverseNormals: true });
    assert.deepEqual(reversed.topology.nodes, result.topology.nodes);
    assert.ok(reversed.topology.plates.every(plate => plate.surfaceDirection.z < -.99));
  }
  const beamOnly = convertModel(mesh, { symmetryAxis: 'x', panels: false });
  assertModelSymmetry(beamOnly, 'x');
  assert.equal(beamOnly.counts.plates, 0);
  assert.deepEqual(mesh, saved);
  assert.deepEqual(convertModel(mesh), off);
  for (const invalid of ['', 'xy', 'X', 0, false, {}]) assert.throws(() => convertModel(mesh, { symmetryAxis: invalid }), /对称方向/);

  const tilted = simplifyModel(parseModel(modelArrayBuffer(modelGlbFixture(json => {
    json.nodes[0].rotation = [Math.sin(Math.PI / 8), 0, 0, Math.cos(Math.PI / 8)];
  })), 'tilted.glb'));
  for (const axis of ['x', 'y', 'z']) assertModelSymmetry(convertModel(tilted, { symmetryAxis: axis }), axis);
});
