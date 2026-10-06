import test from 'node:test';
import assert from 'node:assert/strict';
import { decodeProjectCode, encodeProjectCode } from '../src/editor/project-code.js';
import { migrateDocument, validateDocument, History } from '../src/editor/document.js';
import { toNativePairFromEditor, parseNativePair } from '../src/native/anymaker-data.js';
import { prepareNativeImport } from '../src/native/import-document.js';
import { mergeTwoPlaneSurface, prepareTwoPlaneNativeSurfaces, predictNativeSurface, assertTwoPlanePrediction } from '../src/editor/two-plane-surface.js';
import { stageImportedSubgrid } from '../src/editor/imported-subgrid.js';
import { prepareSelectionTransform, applySelectionTransform, mirrorSelection } from '../src/editor/selection-transform.js';
import { twoPlaneFixture, twoPlaneBoundaryFixture, userTwoPlaneCode } from './two-plane-fixtures.js';

for (const type of ['window', 'solid']) test(`a single ${type} boundary discovers its two-plane crease regardless of start and winding`, () => {
  const reference = twoPlaneFixture({ type });
  const expected = mergeTwoPlaneSurface(reference.topology, ['p0', 'p1']).prediction;
  for (const reverse of [false, true]) for (let start = 0; start < 6; start++) {
    const doc = twoPlaneBoundaryFixture({ type });
    const plate = doc.topology.plates[0];
    if (reverse) plate.nodeIds.reverse();
    plate.nodeIds.push(...plate.nodeIds.splice(0, start));
    const before = structuredClone(doc);
    const result = prepareTwoPlaneNativeSurfaces(doc.topology);
    assert.deepEqual(doc, before);
    assert.deepEqual(result.topology.nodes, before.topology.nodes);
    assert.deepEqual(result.topology.edges, before.topology.edges);
    assert.equal(result.topology.plates.length, 1);
    assert.ok(['n0', 'n3'].includes(result.topology.plates[0].surfaceFanAnchor));
    const prediction = predictNativeSurface(result.topology.plates[0], result.topology);
    assertTwoPlanePrediction(prediction);
    assert.equal(prediction.target.planes.groups.length, expected.target.planes.groups.length);
    assert.equal(prediction.geometry.planes.groups.length, 2);
    assert.deepEqual(prediction.geometry.internalFrameEdges, []);
    const native = toNativePairFromEditor({ ...doc, topology: result.topology }).data.vehicles.vehicles[0];
    assert.equal(native.plates.length, 1); assert.equal(native.edges.length, 6);
  }
});

test('automatic boundary detection rejects a third plane and native inset failures without altering the draft', () => {
  const warped = twoPlaneBoundaryFixture(); warped.topology.nodes[4].position.y += .16;
  const inset = twoPlaneBoundaryFixture(); inset.topology.nodes[4].position.x = -.32; inset.topology.nodes[4].position.y = .16;
  inset.topology.nodes[2].position.x = .32; inset.topology.nodes[2].position.y = .16;
  const missing = twoPlaneBoundaryFixture(); missing.topology.edges.pop();
  for (const doc of [warped, inset, missing]) {
    const before = structuredClone(doc);
    assert.throws(() => prepareTwoPlaneNativeSurfaces(doc.topology));
    assert.deepEqual(doc, before);
  }
});

test('creating a new boundary processes only that face, preserving unrelated unsupported drafts', () => {
  const doc = twoPlaneBoundaryFixture();
  const other = twoPlaneBoundaryFixture(); other.topology.nodes[4].position.y += .16;
  doc.topology.nodes.push(...other.topology.nodes.map(node => ({ ...node, id: 'old-' + node.id, position: { ...node.position, z: node.position.z + 2.4 } })));
  doc.topology.edges.push(...other.topology.edges.map(edge => ({ ...edge, id: 'old-' + edge.id, a: 'old-' + edge.a, b: 'old-' + edge.b })));
  const oldPlate = { ...other.topology.plates[0], id: 'old-p0', nodeIds: other.topology.plates[0].nodeIds.map(id => 'old-' + id) };
  doc.topology.plates.push(oldPlate);
  const result = prepareTwoPlaneNativeSurfaces(doc.topology, { plateIds: ['p0'] });
  assert.ok(result.topology.plates[0].surfaceFanAnchor);
  assert.deepEqual(result.topology.plates[1], oldPlate);
  assert.throws(() => prepareTwoPlaneNativeSurfaces(doc.topology));
});

test('boundary crease detection also supports rotated three-axis geometry', () => {
  const matrix = [[-2, 2, 1], [1, 2, -2], [-2, -1, -2]];
  const points = [[0, 0, -6], [8, 3, -6], [8, 3, 6], [0, 0, 6], [-8, 3, 6], [-8, 3, -6]].map(point => matrix.map(row => row.reduce((sum, value, i) => sum + value * point[i], 0)));
  const doc = twoPlaneBoundaryFixture({ points });
  const result = prepareTwoPlaneNativeSurfaces(doc.topology);
  const prediction = predictNativeSurface(result.topology.plates[0], result.topology);
  assertTwoPlanePrediction(prediction);
  assert.equal(prediction.axes, 3); assert.equal(prediction.target.planes.groups.length, 2); assert.equal(prediction.geometry.planes.groups.length, 2);
});

test('native single-face previews retain fractional subgrid translations without changing relative node constraints', () => {
  const doc = twoPlaneFixture(); doc.topology = mergeTwoPlaneSurface(doc.topology, ['p0', 'p1']).topology;
  const prediction = predictNativeSurface(doc.topology.plates[0], doc.topology);
  const shift = { x: .03, y: .015, z: -.07 };
  const moved = structuredClone(doc.topology);
  for (const node of moved.nodes) for (const axis of ['x', 'y', 'z']) node.position[axis] += shift[axis];
  const translated = predictNativeSurface(moved.plates[0], moved); assertTwoPlanePrediction(translated);
  prediction.geometry.front.forEach((point, i) => point.forEach((value, axis) => assert.ok(Math.abs(translated.geometry.front[i][axis] - value - [-shift.x, shift.y, shift.z][axis]) < 1e-9)));
});

test('reported AMB1 draft downloads as one window with its original 16 beams and leaves the project intact', async () => {
  const doc = migrateDocument(await decodeProjectCode(userTwoPlaneCode), new Map()); const before = structuredClone(doc);
  assert.equal(doc.topology.plates.length, 4);
  assert.deepEqual(await decodeProjectCode(await encodeProjectCode(doc)), doc);
  const pair = toNativePairFromEditor(doc); const vehicle = pair.data.vehicles.vehicles[0];
  assert.equal(vehicle.plates.length, 1); assert.equal(vehicle.plates[0].type, 'window'); assert.equal(vehicle.plates[0].nodes.length, 6);
  assert.equal(vehicle.edges.length, 16); assert.equal(vehicle.nodes.length, 12);
  assert.deepEqual(doc, before);
  const prepared = prepareTwoPlaneNativeSurfaces(doc.topology); assert.equal(prepared.merged.length, 1);
  assert.ok(['node-4', 'node-4-mirror'].includes(prepared.topology.plates[0].surfaceFanAnchor));
  assert.equal(predictNativeSurface(prepared.topology.plates[0], prepared.topology).geometry.planes.groups.length, 2);
  let imported = prepareNativeImport(parseNativePair(pair.data, pair.meta));
  for (let i = 0; i < 2; i++) {
    assert.ok(imported.document.topology.plates[0].surfaceFanAnchor);
    const output = toNativePairFromEditor(imported.document);
    assert.deepEqual(output.data.vehicles.vehicles[0].edges, vehicle.edges);
    assert.deepEqual(output.data.vehicles.vehicles[0].plates, vehicle.plates);
    imported = prepareNativeImport(parseNativePair(output.data, output.meta));
  }
});

for (const type of ['window', 'solid']) test(`two-plane ${type} compilation preserves target planes and supports snapshot undo and project codes`, async () => {
  const doc = twoPlaneFixture({ type }); const before = structuredClone(doc);
  const result = mergeTwoPlaneSurface(doc.topology, ['p0', 'p1']);
  assert.deepEqual(result.topology.edges, before.topology.edges); assert.deepEqual(doc, before);
  assert.equal(result.prediction.target.planes.groups.length, 2); assert.equal(result.prediction.geometry.planes.groups.length, 2);
  assert.equal(result.prediction.geometry.noOverlap, true);
  assert.deepEqual(result.prediction.geometry.internalFrameEdges, []);
  const compiled = validateDocument({ ...doc, topology: result.topology }, new Map());
  const history = new History(doc); history.commit(compiled);
  assert.deepEqual(history.peekUndo(), doc);
  assert.deepEqual(migrateDocument(await decodeProjectCode(await encodeProjectCode(compiled)), new Map()), compiled);
  const native = toNativePairFromEditor(compiled).data.vehicles.vehicles[0];
  assert.equal(native.edges.length, 6); assert.equal(native.plates.length, 1);
});

test('single-face compilation rejects changed target planes, bad boundaries and topology rather than replacing the shape', () => {
  const fixtures = [];
  const missing = twoPlaneFixture(); missing.topology.edges.pop(); fixtures.push(missing);
  const warped = twoPlaneFixture(); warped.topology.nodes[4].position.y += .16; fixtures.push(warped);
  const trapezoid = twoPlaneFixture(); trapezoid.topology.nodes[4].position.x = -.32; trapezoid.topology.nodes[4].position.y = .16; fixtures.push(trapezoid);
  trapezoid.topology.nodes[2].position.x = .32; trapezoid.topology.nodes[2].position.y = .16;
  const paint = twoPlaneFixture(); paint.topology.plates[1].color_front = '#dddddd'; fixtures.push(paint);
  const overlap = twoPlaneFixture(); overlap.topology.plates.push({ ...overlap.topology.plates[0], id: 'p2' }); fixtures.push(overlap);
  const narrow = twoPlaneFixture({ points: [[0, 0, -1], [1, 1, -1], [1, 1, 1], [0, 0, 1], [-1, 1, 1], [-1, 1, -1]] }); fixtures.push(narrow);
  for (const doc of fixtures) {
    const before = structuredClone(doc);
    assert.throws(() => mergeTwoPlaneSurface(doc.topology, doc.topology.plates.map(p => p.id)));
    assert.deepEqual(doc, before);
  }
  assert.throws(() => toNativePairFromEditor(warped), /无法自动生成双平面扇形/);
});

test('anchor references survive detachment, mirroring and subgrid ID remapping, and invalid anchors fail validation', () => {
  const doc = twoPlaneFixture(); doc.topology = mergeTwoPlaneSurface(doc.topology, ['p0', 'p1']).topology;
  const plate = doc.topology.plates[0];
  const detached = applySelectionTransform(prepareSelectionTransform(doc, { topologyKeys: ['plate:' + plate.id] }), { translation: { x: .08, y: 0, z: 0 } }).document;
  assert.notEqual(detached.topology.plates[0].surfaceFanAnchor, plate.surfaceFanAnchor);
  assert.ok(detached.topology.plates[0].nodeIds.includes(detached.topology.plates[0].surfaceFanAnchor));
  const selection = { topologyKeys: ['plate:' + plate.id, ...doc.topology.edges.map(e => 'edge:' + e.id)] };
  const mirrored = mirrorSelection(doc, selection, { axis: 'x', offset: 1.6 }).document;
  const copy = mirrored.topology.plates.find(p => p.id !== plate.id);
  assert.ok(copy.nodeIds.includes(copy.surfaceFanAnchor)); assert.notEqual(copy.surfaceFanAnchor, plate.surfaceFanAnchor);
  assertTwoPlanePrediction(predictNativeSurface(copy, mirrored.topology));
  const staged = stageImportedSubgrid(doc, { grids: ['grid-1'], nodes: doc.topology.nodes.map(n => n.id), plates: [plate.id] });
  assert.ok(staged.topology.plates[0].nodeIds.includes(staged.topology.plates[0].surfaceFanAnchor));
  for (const patch of [{ surfaceFanAnchor: 'unknown' }, { surfaceFanAnchor: 0 }, { surfaceLimitBypass: undefined }]) {
    const invalid = structuredClone(doc); Object.assign(invalid.topology.plates[0], patch);
    assert.throws(() => validateDocument(invalid, new Map()), /扇心/);
  }
});

test('ordinary faces remain separate and native beam width matches the compiled surface prediction', () => {
  assert.doesNotThrow(() => toNativePairFromEditor({ objects: [], topology: {} }));
  const doc = twoPlaneFixture();
  doc.topology.edges.push({ id: 'crease', a: 'n0', b: 'n3', gridId: 'grid-1', size: 1 });
  for (const plate of doc.topology.plates) delete plate.surfaceLimitBypass;
  assert.equal(prepareTwoPlaneNativeSurfaces(doc.topology).merged.length, 0);
  assert.equal(toNativePairFromEditor(doc).data.vehicles.vehicles[0].plates.length, 2);
  for (const plate of doc.topology.plates) plate.surfaceLimitBypass = true;
  doc.topology.edges.forEach(edge => { edge.size = 3; });
  doc.topology = mergeTwoPlaneSurface(doc.topology, ['p0', 'p1']).topology;
  const pair = toNativePairFromEditor(doc);
  assert.ok(pair.data.vehicles.vehicles[0].edges.every(edge => edge.size === 1));
  const imported = prepareNativeImport(parseNativePair(pair.data, pair.meta)).document;
  assert.ok(imported.topology.edges.every(edge => edge.size === 3));
  assert.deepEqual(predictNativeSurface(doc.topology.plates[0], doc.topology).offset, predictNativeSurface(imported.topology.plates[0], imported.topology).offset);
});
