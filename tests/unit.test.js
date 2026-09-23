import test from 'node:test';
import assert from 'node:assert/strict';
import { meshFixture } from './fixtures.js';
import { parseMesh } from '../src/assets/mesh.js';
import { History, project, validateDocument, migrateDocument, toIntermediateXml } from '../src/editor/document.js';
import { copyObjects, mirrorObjects, moveObjects, splitGrid, mergeGrids, gridIds } from '../src/editor/operations.js';
import { Project, Vehicle, Grid, Component, Node, Edge, Plate, Link, fromEditorDocument, toEditorDocument, validateProject } from '../src/editor/model.js';
import { parseNativeData, nativeStats, toNativeData } from '../src/native/anymaker-data.js';
import { createNode, moveNode, mergeNodes, createEdge, splitEdge, createPlate, triangulatePlate } from '../src/editor/topology.js';
import * as THREE from 'three';
import { reflectGeometry } from '../src/assets/geometry-ops.js';

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
const object = { id: '1', type: 'engine', position: { x: 1, y: 2, z: 3 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } };
const definitions = new Map([['engine', {}]]);
test('project validation, finite domain and unique IDs', () => {
  assert.deepEqual(validateDocument(project([object]), definitions).objects, [object]);
  assert.throws(() => validateDocument(project([object, object]), definitions));
  for (const value of [NaN, Infinity, '1', null]) {
    const invalid = structuredClone(object); invalid.position.x = value;
    assert.throws(() => validateDocument(project([invalid]), definitions));
  }
  const invalid = structuredClone(object); invalid.scale.z = -1;
  assert.throws(() => validateDocument(project([invalid]), definitions));
  assert.throws(() => validateDocument(project([{ ...object, type: 'unknown' }]), definitions));
});
test('known legacy document schema migrates and unsupported versions are rejected', () => {
  const legacy = { format: 'anymaker-web-project', version: 0, components: [{ id: 'legacy-1', definition: 'engine', position: { x: 1, y: 2, z: 3 } }] };
  const migrated = migrateDocument(legacy, definitions);
  assert.equal(migrated.version, 1);
  assert.equal(migrated.objects[0].type, 'engine');
  assert.deepEqual(migrated.objects[0].scale, { x: 1, y: 1, z: 1 });
  assert.throws(() => migrateDocument({ format: 'anymaker-web-project', version: 99, objects: [] }, definitions), /Unsupported/);
});
test('history undo / redo and branching are snapshots, not aliases', () => {
  const h = new History([]); const values = [structuredClone(object)]; h.commit(values); values[0].position.x = 7;
  assert.equal(h.entries[1][0].position.x, 1);
  assert.deepEqual(h.peekUndo(), []); h.cursor--;
  assert.deepEqual(h.peekRedo(), [object]);
  h.commit([{ ...object, id: '2' }]); assert.equal(h.peekRedo(), null);
});
test('XML declares its intermediate status and escapes identifiers', () => {
  const xml = toIntermediateXml(project([{ ...object, id: '<bad&' }]));
  assert.ok(xml.includes('game-compatible="false"'));
  assert.ok(xml.includes('&lt;bad&amp;'));
  assert.ok(!xml.includes('<bad'));
  const structuralXml = toIntermediateXml(project([{ ...object, gridId: 'grid-2', mirror: { axis: 'x', offset: 1 } }]));
  assert.ok(structuralXml.includes('grid="grid-2"'));
  assert.ok(structuralXml.includes('<mirror axis="x" offset="1.000000"/>'));
  const topologyXml = toIntermediateXml(project([object], {
    nodes: [{ id: 'node-1', position: { x: 0, y: 0, z: 0 } }, { id: 'node-2', position: { x: 1, y: 0, z: 0 } }, { id: 'node-3', position: { x: 0, y: 1, z: 0 } }],
    edges: [{ id: 'edge-1', a: 'node-1', b: 'node-2' }],
    plates: [{ id: 'plate-1', nodeIds: ['node-1', 'node-2', 'node-3'] }],
  }));
  assert.ok(topologyXml.includes('<edge id="edge-1" a="node-1" b="node-2"/>'));
  assert.ok(topologyXml.includes('<plate id="plate-1" nodes="node-1 node-2 node-3"/>'));
});
test('structural operations preserve independent IDs and transforms', () => {
  const items = [structuredClone(object), { ...structuredClone(object), id: '2', position: { x: 4, y: 0, z: 0 }, gridId: 'grid-2' }];
  const copied = copyObjects(items, ['1'], { x: 2, y: 0, z: 0 });
  assert.equal(copied.objects.length, 3);
  assert.equal(copied.objects[2].id, '1-copy');
  assert.equal(copied.objects[2].position.x, 3);
  const mirrored = mirrorObjects(copied.objects, ['1-copy'], { axis: 'x', offset: 1 });
  const mirror = mirrored.objects.find(value => value.id === '1-copy-mirror');
  assert.equal(mirror.position.x, -1);
  assert.deepEqual(mirror.mirror, { axis: 'x', offset: 1 });
  const moved = moveObjects(mirrored.objects, ['1-copy-mirror'], { x: 1, y: 2, z: 3 });
  assert.deepEqual(moved.objects.find(value => value.id === '1-copy-mirror').position, { x: 0, y: 4, z: 6 });
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
  const topology = { nodes: [{ id: 'n1', position: { x: 0, y: 0, z: 0 } }, { id: 'n2', position: { x: 1, y: 0, z: 0 } }, { id: 'n3', position: { x: 0, y: 1, z: 0 } }], edges: [{ id: 'e1', a: 'n1', b: 'n2' }], plates: [{ id: 'p1', nodeIds: ['n1', 'n2', 'n3'] }] };
  const document = project([{ ...object, gridId: 'grid-a' }, { ...object, id: '2', gridId: 'grid-b', mirror: { axis: 'x', offset: 0 } }], topology);
  const model = fromEditorDocument(document);
  assert.ok(model instanceof Project);
  assert.ok(model.vehicles[0] instanceof Vehicle);
  assert.equal(model.vehicles.length, 1);
  assert.deepEqual(toEditorDocument(model), document);
  const topology = new Project({ vehicles: [{ id: 'v', grids: [{ id: 'g', nodes: [new Node({ id: 'n1' }), new Node({ id: 'n2' })], edges: [new Edge({ id: 'e', a: 'n1', b: 'n2' })], plates: [new Plate({ id: 'p', nodeIds: ['n1', 'n2'] })], links: [new Link({ id: 'l', kind: 'electric', from: { node: 'n1' }, to: { node: 'n2' } })] }] }] });
  assert.equal(validateProject(topology), topology);
  topology.vehicles[0].grids[0].edges[0].b = 'missing';
  assert.throws(() => validateProject(topology), /unknown node/);
  const duplicate = new Project({ vehicles: [{ id: 'v', grids: [{ id: 'a', components: [new Component({ id: 'same' })] }, { id: 'b', components: [new Component({ id: 'same' })] }] }] });
  assert.throws(() => validateProject(duplicate), /Duplicate component ID/);
});
test('native vehicle data maps global topology once and preserves raw fields', () => {
  const native = { definitions: { components: ['engine'] }, vehicles: { vehicles: [{ id: 7, transform: { m: [1, 0, 0, 0, 1, 0, 0, 0, 1], t: [1, 2, 3] }, nodes: [{ id: 1, pos: [0, 0, 0] }, { id: 2, pos: [1, 0, 0] }], edges: [{ n0: 1, n1: 2, col: 49 }], plates: [{ id: 4, nodes: [1, 2], col_front: 49 }], grids: [{ components: [{ def: 0, id: 9, pos: [0, 0, 0], rot: [0, 0, 1, 0, 1, 0, -1, 0, 0] }] }, { origin: [0, 0, 0], dir: [0, 1, 0], components: [] }], electric_links: [{ p0: { comp: 9 }, p1: { comp: 9 }, points: [] }] }] } };
  const model = parseNativeData(native);
  assert.deepEqual(nativeStats(model), [{ id: '7', grids: 2, nodes: 2, edges: 1, plates: 1, components: 1, links: 1 }]);
  assert.deepEqual(model.vehicles[0].grids[0].components[0].extras.native.definitionIndex, 0);
  assert.ok(Math.abs(model.vehicles[0].grids[0].components[0].transform.rotation.y - Math.PI / 2) < 1e-6);
  assert.deepEqual(model.extras.native.raw, native);
  const exported = toNativeData(model);
  assert.deepEqual(exported.value, native);
  model.vehicles[0].grids[0].components[0].transform.position.x = 9;
  assert.equal(toNativeData(model).value.vehicles.vehicles[0].grids[0].components[0].pos[0], 9);
});
test('topology commands create, split, merge and validate structure', () => {
  let nodes = [];
  nodes = createNode(nodes, { x: 0, y: 0, z: 0 }).nodes;
  nodes = createNode(nodes, { x: 1, y: 0, z: 0 }).nodes;
  nodes = createNode(nodes, { x: 0, y: 1, z: 0 }).nodes;
  nodes = createNode(nodes, { x: 1, y: 1, z: 0 }).nodes;
  const a = nodes[0].id; const b = nodes[1].id; const c = nodes[2].id; const d = nodes[3].id;
  let edges = createEdge([], a, b).edges;
  edges = createEdge(edges, b, d).edges;
  const split = splitEdge(nodes, edges, edges[0].id, { x: .5, y: 0, z: 0 });
  assert.equal(split.edges.length, 3);
  const moved = moveNode(split.nodes, d, { x: 1, y: 1, z: 0 });
  const plate = createPlate([], [a, b, d, c], moved.nodes).plate;
  assert.deepEqual(triangulatePlate(plate, moved.nodes).length, 2);
  const merged = mergeNodes(moved.nodes, split.edges, [plate], d, c);
  assert.equal(merged.nodes.some(node => node.id === d), false);
  assert.equal(merged.plates.length, 1);
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
