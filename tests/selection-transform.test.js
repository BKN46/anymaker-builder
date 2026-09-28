import test from 'node:test';
import assert from 'node:assert/strict';
import { prepareSelectionTransform, applySelectionTransform, applyManualRotation, mirrorSelection } from '../src/editor/selection-transform.js';
import { structureTransformFixture } from './selection-transform-fixtures.js';
import { History, validateDocument } from '../src/editor/document.js';
import { componentFrame } from '../src/editor/component-frame.js';
import { parseNativePair, toNativePairFromEditor } from '../src/native/anymaker-data.js';
import { toEditorDocument } from '../src/editor/model.js';

const select = (...topologyKeys) => ({ componentIds: [], topologyKeys });
const aroundX = [1, 0, 0, 0, 0, -1, 0, 1, 0];
const aroundZ = [0, -1, 0, 1, 0, 0, 0, 0, 1];

test('manual rotation uses every requested plane and angle around the exact selection center', () => {
  const doc = structureTransformFixture(); const before = structuredClone(doc);
  for (const plane of ['xy', 'xz', 'yz']) for (const angle of [90, 180, 270]) {
    const plan = prepareSelectionTransform(doc, { componentIds: [], topologyKeys: ['plate:p0'] }, { exactCenter: true });
    const next = applyManualRotation(plan, plane, angle).document;
    const vertices = next.topology.plates[0].nodeIds.map(id => next.topology.nodes.find(node => node.id === id).position);
    for (const axis of ['x', 'y', 'z']) assert.ok(Math.abs(vertices.reduce((sum, point) => sum + point[axis], 0) / 4 - plan.pivot[axis]) < 1e-9);
    const source = doc.topology.nodes[0].position; const p = plan.pivot; const radians = angle * Math.PI / 180;
    const axes = plane === 'xy' ? ['x', 'y'] : plane === 'xz' ? ['z', 'x'] : ['y', 'z'];
    const [a, b] = axes;
    assert.ok(Math.abs(vertices[0][a] - (p[a] + (source[a] - p[a]) * Math.cos(radians) - (source[b] - p[b]) * Math.sin(radians))) < 1e-9);
    assert.ok(Math.abs(vertices[0][b] - (p[b] + (source[a] - p[a]) * Math.sin(radians) + (source[b] - p[b]) * Math.cos(radians))) < 1e-9);
    assert.deepEqual(next.topology.edges, doc.topology.edges);
  }
  assert.deepEqual(doc, before);
});

test('manual rotation preserves half-cell centers and rejects off-grid quarter-turns atomically', () => {
  const doc = { ...structureTransformFixture(), topology: { nodes: [{ id: 'a', position: { x: 0, y: 0, z: 0 } }, { id: 'b', position: { x: .08, y: 0, z: 0 } }], edges: [{ id: 'e', a: 'a', b: 'b' }], plates: [], links: [] } };
  const before = structuredClone(doc);
  const plan = prepareSelectionTransform(doc, { componentIds: [], topologyKeys: ['edge:e'] }, { exactCenter: true });
  assert.equal(plan.pivot.x, .04);
  const next = applyManualRotation(plan, 'xy', 180).document;
  assert.equal(next.topology.nodes[0].position.x, .08); assert.equal(next.topology.nodes[1].position.x, 0);
  assert.throws(() => applyManualRotation(plan, 'xy', 90), /整数格/);
  assert.throws(() => applyManualRotation(plan, 'invalid', 90), /平面/);
  assert.throws(() => applyManualRotation(plan, 'xy', 45), /90/);
  assert.deepEqual(doc, before);
});
const plane = { active: true, axis: 'x', offset: 0 };
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-8, `${a} != ${b}`);
const points = doc => new Map(doc.topology.nodes.map(node => [node.id, node.position]));
const length = (edge, nodes) => Math.hypot(...['x', 'y', 'z'].map(axis => nodes.get(edge.a)[axis] - nodes.get(edge.b)[axis]));

test('moving a selected plate detaches shared nodes and leaves all unselected beams unchanged', () => {
  const doc = structureTransformFixture(); const original = structuredClone(doc);
  const plan = prepareSelectionTransform(doc, select('plate:p0'));
  const result = applySelectionTransform(plan, { translation: { x: .16, y: .08, z: .16 } });
  assert.equal(result.changed, true); assert.deepEqual(doc, original);
  const next = result.document; const before = points(doc); const after = points(next);
  assert.deepEqual(next.topology.edges, doc.topology.edges);
  for (const edge of doc.topology.edges) { assert.deepEqual(after.get(edge.a), before.get(edge.a)); assert.deepEqual(after.get(edge.b), before.get(edge.b)); }
  const moved = next.topology.plates[0]; assert.notDeepEqual(moved.nodeIds, doc.topology.plates[0].nodeIds);
  moved.nodeIds.forEach((id, i) => { const old = before.get(doc.topology.plates[0].nodeIds[i]); near(after.get(id).x, old.x + .16); near(after.get(id).y, old.y + .08); near(after.get(id).z, .16); });
  assert.equal(moved.col_front, 3); assert.equal(moved.col_back, 5); assert.deepEqual(moved.surfaceDirection, { x: 0, y: 0, z: 1 });
  assert.equal(next.topology.nodes.length, doc.topology.nodes.length + 4);
  assert.equal(new Set(next.topology.nodes.map(node => node.id)).size, next.topology.nodes.length);
});

test('selected adjacent beams move shared endpoints once and quarter-turn without stretching', () => {
  const doc = structureTransformFixture(); const selection = select('edge:e0', 'edge:e1');
  const plan = prepareSelectionTransform(doc, selection);
  const next = applySelectionTransform(plan, { rotation: aroundZ }).document;
  const original = points(doc); const moved = points(next);
  const [a, b] = next.topology.edges; assert.equal(a.b, b.a);
  for (const id of ['e0', 'e1']) near(length(next.topology.edges.find(edge => edge.id === id), moved), length(doc.topology.edges.find(edge => edge.id === id), original));
  assert.deepEqual(next.topology.plates, doc.topology.plates); assert.deepEqual(next.topology.edges.slice(2), doc.topology.edges.slice(2));
  for (const id of doc.topology.plates[0].nodeIds) assert.deepEqual(moved.get(id), original.get(id));
});

test('whole plate and beam rotation preserves IDs, front/back colours and rotates surface normals', () => {
  const doc = structureTransformFixture(); doc.topology.edges.pop(); doc.topology.nodes.pop();
  const selection = select('plate:p0', ...doc.topology.edges.map(edge => 'edge:' + edge.id));
  const result = applySelectionTransform(prepareSelectionTransform(doc, selection), { rotation: aroundX }); const next = result.document;
  assert.deepEqual(next.topology.nodes.map(node => node.id), doc.topology.nodes.map(node => node.id));
  assert.deepEqual(next.topology.plates[0].nodeIds, doc.topology.plates[0].nodeIds);
  assert.deepEqual(next.topology.plates[0].surfaceDirection, { x: 0, y: -1, z: 0 });
  assert.equal(next.topology.plates[0].color_front, '#aa2244'); assert.equal(next.topology.plates[0].normalOffset, .04);
  next.topology.edges.forEach((edge, i) => near(length(edge, points(next)), length(doc.topology.edges[i], points(doc))));
  const history = new History(doc); history.commit(next); assert.deepEqual(history.peekUndo().topology, doc.topology);
  const pair = toNativePairFromEditor(next); const imported = toEditorDocument(parseNativePair(pair.data, pair.meta));
  assert.equal(imported.topology.plates.length, 1); assert.equal(imported.topology.edges.length, 4);
});

test('invalid and no-op transforms do not mutate or detach the original selection', () => {
  const doc = structureTransformFixture(); const before = structuredClone(doc); const plan = prepareSelectionTransform(doc, select('edge:e0'));
  assert.deepEqual(applySelectionTransform(plan).document, doc); assert.equal(applySelectionTransform(plan).changed, false);
  assert.throws(() => applySelectionTransform(plan, { translation: { x: .01, y: 0, z: 0 } }), /整数格/);
  const c = Math.SQRT1_2; assert.throws(() => applySelectionTransform(plan, { rotation: [c, -c, 0, c, c, 0, 0, 0, 1] }), /整数格/);
  assert.throws(() => applySelectionTransform(plan, { rotation: [-1, 0, 0, 0, 1, 0, 0, 0, 1] }), /旋转无效/);
  assert.deepEqual(doc, before);
  const native = structuredClone(doc); native.topology.nodes.forEach(node => { node.nativeProjected = true; node.position.x += .012; });
  const nativeNext = applySelectionTransform(prepareSelectionTransform(native, select('edge:e0')), { rotation: aroundZ }).document;
  near(length(nativeNext.topology.edges[0], points(nativeNext)), length(native.topology.edges[0], points(native)));
});

for (const axis of ['x', 'y', 'z']) test('manual structural mirror respects the offset plane, winding and repeated-operation deduplication: ' + axis, () => {
  const doc = structureTransformFixture(); const original = structuredClone(doc);
  const selection = select('plate:p0', 'edge:e0', 'edge:e1', 'edge:e2', 'edge:e3');
  const mirrorPlane = { axis, offset: -.16 };
  const result = mirrorSelection(doc, selection, mirrorPlane); const next = result.document;
  assert.equal(result.changed, true); assert.deepEqual(doc, original);
  assert.equal(next.topology.plates.length, 2); assert.equal(next.topology.edges.length, 9);
  const originalNodes = points(doc); const newNodes = points(next); const copy = next.topology.plates[1];
  copy.nodeIds.forEach((id, i) => { const old = originalNodes.get(doc.topology.plates[0].nodeIds.at(-1 - i)); for (const coordinate of ['x', 'y', 'z']) near(newNodes.get(id)[coordinate], coordinate === axis ? -.32 - old[coordinate] : old[coordinate]); });
  assert.equal(copy.col_front, 3); assert.equal(copy.col_back, 5); assert.equal(copy.color_front, '#aa2244');
  near(copy.surfaceDirection[axis], -doc.topology.plates[0].surfaceDirection[axis]);
  assert.equal(mirrorSelection(next, selection, mirrorPlane).changed, false);
  assert.equal(mirrorSelection(next, result.selection, mirrorPlane).changed, false);
  copy.nodeIds.push('mutated'); assert.equal(doc.topology.plates[0].nodeIds.length, 4);
});

test('manual mirror keeps nodes on the plane shared and uses unique IDs for copied nodes', () => {
  const doc = structureTransformFixture(); const result = mirrorSelection(doc, select('edge:e0'), { axis: 'x', offset: .16 });
  const copy = result.document.topology.edges.at(-1);
  assert.equal(copy.a, 'n0'); assert.notEqual(copy.b, 'n1');
  assert.equal(result.document.topology.nodes.length, 6); assert.equal(result.document.topology.edges.length, 6);
  const again = mirrorSelection(result.document, select('edge:e0'), { axis: 'x', offset: .16 }); assert.equal(again.changed, false);
});

test('mirror mode updates the paired whole structure and blocks displacement of seam nodes', () => {
  const doc = structureTransformFixture(); doc.topology.edges = doc.topology.edges.slice(0, 1); doc.topology.plates = [];
  const mirrored = mirrorSelection(doc, select('edge:e0'), plane).document; const original = points(mirrored);
  const plan = prepareSelectionTransform(mirrored, select('edge:e0'), { mirrorPlane: plane });
  const next = applySelectionTransform(plan, { translation: { x: .16, y: .08, z: 0 } }).document;
  const newPoints = points(next);
  for (const edge of next.topology.edges) near(length(edge, newPoints), length(edge, original));
  const [a, b] = next.topology.edges;
  near(newPoints.get(a.a).x, -newPoints.get(b.a).x); near(newPoints.get(a.b).y, newPoints.get(b.b).y);
  const seamPlane = { active: true, axis: 'x', offset: .16 };
  const seam = mirrorSelection(doc, select('edge:e0'), seamPlane).document;
  assert.throws(() => applySelectionTransform(prepareSelectionTransform(seam, select('edge:e0'), { mirrorPlane: seamPlane }), { translation: { x: .08, y: 0, z: 0 } }), /只能沿平面/);
});

test('self-symmetric structural selections stay rigid or reject conflicting mirror transforms', () => {
  const doc = structureTransformFixture(); doc.topology.edges.pop(); doc.topology.nodes.pop();
  const selection = select('plate:p0', ...doc.topology.edges.map(edge => 'edge:' + edge.id));
  const plan = prepareSelectionTransform(doc, selection, { mirrorPlane: { active: true, axis: 'x', offset: .32 } });
  const before = structuredClone(doc);
  assert.throws(() => applySelectionTransform(plan, { translation: { x: .08, y: 0, z: 0 } }), /跨镜面结构/);
  assert.throws(() => applySelectionTransform(plan, { rotation: aroundZ }), /跨镜面结构/);
  const rotated = applySelectionTransform(plan, { rotation: aroundX }).document;
  rotated.topology.edges.forEach((edge, i) => near(length(edge, points(rotated)), length(doc.topology.edges[i], points(doc))));
  assert.deepEqual(rotated.topology.plates[0].surfaceDirection, { x: 0, y: -1, z: 0 });
  const moved = applySelectionTransform(plan, { translation: { x: 0, y: .16, z: 0 } }).document;
  moved.topology.nodes.forEach((node, i) => near(node.position.y, doc.topology.nodes[i].position.y + .16));
  assert.deepEqual(doc, before);
});

test('component mirror deduplication respects geometry at the plane and native dimensions', () => {
  const doc = structureTransformFixture();
  doc.objects = [{ id: 'shaft', type: 'drive_shaft', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 }, nativeExtension: [0, 0, 3] }];
  const selection = { componentIds: ['shaft'], topologyKeys: [] };
  const mirrored = mirrorSelection(doc, selection, plane);
  assert.equal(mirrored.document.objects.length, 2);
  assert.equal(mirrorSelection(mirrored.document, selection, plane).changed, false);
  mirrored.document.objects[1].nativeExtension = [0, 0, 6];
  assert.equal(mirrorSelection(mirrored.document, selection, plane).document.objects.length, 3);
  mirrored.document.objects[1].nativeExtension = [0, 0, 3]; mirrored.document.objects[1].scale.x = 2;
  assert.equal(mirrorSelection(mirrored.document, selection, plane).document.objects.length, 3);
});

test('mixed manual mirror reflects component geometry and preserves only internal connection references', () => {
  const doc = structureTransformFixture();
  doc.objects = [.16, .48, .8].map((x, i) => ({ id: 'c' + i, type: 'pulley_wheel', gridId: 'grid-1', position: { x, y: .64, z: 0 }, rotation: { x: .2, y: .3, z: .4 }, scale: { x: 1, y: 1, z: 1 }, localMirrorAxes: ['z'] }));
  doc.topology.links = [0, 1].map(i => ({ id: 'l' + i, kind: 'mechanical', from: { componentId: 'c' + i, port: 1 }, to: { componentId: 'c' + (i + 1), port: 2 }, points: [{ x: .32, y: .8, z: 0 }] }));
  const selection = { componentIds: ['c0', 'c1'], topologyKeys: ['edge:e0', 'plate:p0'] };
  const result = mirrorSelection(doc, selection, { axis: 'y', offset: .16 }); const next = result.document;
  assert.equal(next.objects.length, 5); assert.equal(next.topology.links.length, 3);
  const copy = next.objects[3]; const originalBasis = componentFrame(doc.objects[0]).basis; const reflectedBasis = componentFrame(copy).basis;
  originalBasis.forEach((value, i) => near(reflectedBasis[i], i >= 3 && i <= 5 ? -value : value));
  assert.deepEqual(copy.scale, { x: 1, y: 1, z: 1 });
  const link = next.topology.links.at(-1); assert.equal(link.from.componentId, result.selection.componentIds[0]); assert.equal(link.from.port, 1); assert.equal(link.to.port, 2);
  assert.deepEqual(link.points, [{ x: .32, y: -.48, z: 0 }]);
  const history = new History(doc); history.commit(next); assert.deepEqual(history.peekUndo(), doc);
  const rotated = applySelectionTransform(prepareSelectionTransform(doc, selection), { rotation: aroundZ }).document;
  assert.equal(rotated.topology.links[0].points[0].z, 0); assert.deepEqual(rotated.topology.links[1], doc.topology.links[1]);
  assert.ok(validateDocument(next, new Map([['pulley_wheel', { id: 'pulley_wheel' }]])));
});
