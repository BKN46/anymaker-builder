import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseNativePair } from '../src/native/anymaker-data.js';
import { toEditorDocument } from '../src/editor/model.js';
import { History, validateDocument } from '../src/editor/document.js';
import { analyzeSubgridIntegrity } from '../src/editor/subgrid-connectivity.js';
import { applySubgridPartition } from '../src/editor/subgrid-partition.js';
import { hingeAssemblyFixture, mateObject } from './mechanical-fixtures.js';
import { disconnectedSubgridsFixture } from './subgrid-fixtures.js';

const definitionsFor = document => new Map([...new Set(document.objects.map(object => object.type))].map(type => [type, JSON.parse(readFileSync('public/data/definitions/' + type + '.json'))]));
const analyze = document => analyzeSubgridIntegrity({ components: document.objects, topology: document.topology, definitions: definitionsFor(document) });
const reference = () => toEditorDocument(parseNativePair(JSON.parse(readFileSync('test-vehicle/vehicle.data')), JSON.parse(readFileSync('test-vehicle/vehicle.meta'))));
const withoutOwnership = document => {
  const next = structuredClone(document); delete next.grids;
  for (const item of [...next.objects, ...next.topology.nodes, ...next.topology.edges, ...next.topology.plates]) delete item.gridId;
  return next;
};

test('reference vehicle groups native mounting frames into four physical subgrids, including every handle', () => {
  const document = reference();
  assert.equal(document.objects.length, 159);
  assert.equal(new Set(document.objects.map(object => object.gridId)).size, 4);
  assert.ok(document.objects.some(object => object.id.includes(':grid-551-2:')), 'instance IDs retain the original mounting frame');
  const result = analyze(document);
  assert.equal(result.isValid, true);
  assert.deepEqual(result.groups.map(group => group.components.length), [5, 5, 143, 6]);
  for (const group of result.groups) {
    const gridId = document.objects.find(object => object.id === group.components[0]).gridId;
    assert.ok(group.components.every(id => document.objects.find(object => object.id === id).gridId === gridId));
    assert.ok(group.topology.some(item => item.kind === 'plate'));
  }
  const hatch = result.groups.find(group => group.components.includes('554:grid-554-1:8'));
  assert.ok(hatch.components.includes('554:grid-554-1:7'), 'the hatch handle mounts on the hitch socket');
  const body = result.groups.find(group => group.components.includes('553:grid-553-1:31'));
  assert.ok(body.components.includes('553:grid-553-1:12'), 'the pulley mounts on the engine');
  assert.equal(applySubgridPartition(document, result).changed, false);
  const shifted = structuredClone(document); shifted.objects.find(object => object.id === '554:grid-554-1:8').position.x += .8;
  assert.equal(analyze(shifted).groups.length, 5, 'moving a handle away genuinely detaches it');
});

test('implicit default-grid ownership still protects a closed hatch from being welded to the body', () => {
  const document = reference();
  for (const item of [...document.objects, ...document.topology.nodes, ...document.topology.edges, ...document.topology.plates]) if (item.gridId === 'grid-553-1') delete item.gridId;
  assert.deepEqual(analyze(document).groups.map(group => group.components.length), [5, 5, 143, 6]);
});

test('legacy per-mounting-frame ownership merges handles without changing geometry or references', () => {
  const document = reference();
  document.objects.forEach(object => { object.gridId = object.id.split(':')[1]; });
  document.grids = [...new Set(document.objects.map(object => object.gridId))].map(id => ({ id }));
  assert.equal(document.grids.length, 9);
  const before = structuredClone(document);
  const result = applySubgridPartition(document, analyze(document));
  assert.equal(result.changed, true);
  assert.equal(result.document.grids.length, 4);
  assert.deepEqual(withoutOwnership(result.document), withoutOwnership(document));
  assert.deepEqual(document, before);
  assert.equal(applySubgridPartition(result.document, analyze(result.document)).changed, false);
});

test('handles attach at panel interiors and rotated or reflected beam midpoints', () => {
  const panel = disconnectedSubgridsFixture();
  assert.equal(analyze(panel).groups.length, 2, 'distant corner nodes do not detach panel-mounted handles');
  const definition = { id: 'mount', zones: [{}], surfaces: [{ dir: 2 }] };
  const component = mateObject('mount', 'mount', { x: .08, y: 0, z: 0 }, { x: 0, y: 0, z: -Math.PI / 2 });
  const topology = { nodes: [{ id: 'a', position: { x: 0, y: -.8, z: 0 } }, { id: 'b', position: { x: 0, y: .8, z: 0 } }], edges: [{ id: 'beam', a: 'a', b: 'b' }], plates: [] };
  const check = () => analyzeSubgridIntegrity({ components: [component], topology, definitions: new Map([['mount', definition]]) });
  assert.equal(check().groups.length, 1);
  component.rotation.z = 0; component.localMirrorAxes = ['x']; definition.surfaces[0].dir = 0;
  assert.equal(check().groups.length, 1, 'native X reflection and local mirror are composed');
  component.position.x += .08;
  assert.equal(check().groups.length, 2, 'one-cell gap is not an attachment');
});

test('signal cables, hoses and belts never merge separate physical structures', () => {
  const document = disconnectedSubgridsFixture();
  for (const kind of ['mechanical', 'electric', 'data', 'liquid', 'gas', 'belt', 'hydraulic']) {
    document.topology.links = [{ id: 'network', kind, from: { componentId: 'left' }, to: { componentId: 'right' }, points: [] }];
    assert.equal(analyze(document).groups.length, 2, kind);
  }
});

test('hinge endpoints remain on separate structures when they originally share one grid ID', () => {
  const document = toEditorDocument(parseNativePair(hingeAssemblyFixture(), {}));
  const analysis = analyze(document);
  assert.equal(analysis.groups.length, 2);
  const result = applySubgridPartition(document, analysis);
  assert.equal(new Set(result.document.objects.map(object => object.gridId)).size, 2);
  assert.deepEqual(result.document.topology.mechanicalConnections, document.topology.mechanicalConnections);
  assert.equal(analyze(result.document).groups.length, 2);
});

test('partition updates components and all topology atomically with stable IDs and undoable snapshots', () => {
  const initial = disconnectedSubgridsFixture();
  initial.objects[1].hidden = true;
  initial.grids[0].name = 'Main frame';
  initial.grids.push({ id: 'empty-user-grid', name: 'Spare frame' });
  const document = validateDocument(initial, definitionsFor(initial));
  const before = structuredClone(document);
  const history = new History(document);
  const analysis = analyze(document);
  const result = applySubgridPartition(document, analysis);
  assert.equal(result.changed, true);
  assert.deepEqual(document, before);
  assert.deepEqual(withoutOwnership(result.document), withoutOwnership(document));
  assert.deepEqual(result.document.grids.map(grid => grid.id), ['grid-1', 'empty-user-grid', 'grid-2']);
  assert.deepEqual(result.document.grids.map(grid => grid.name), ['Main frame', 'Spare frame', undefined]);
  for (const [index, name] of ['left', 'right'].entries()) {
    const grid = 'grid-' + (index + 1);
    assert.equal(result.document.objects.find(object => object.id === name).gridId, grid);
    for (const item of [...result.document.topology.nodes, ...result.document.topology.edges, ...result.document.topology.plates].filter(item => item.id.startsWith(name))) assert.equal(item.gridId, grid);
  }
  assert.deepEqual(applySubgridPartition(document, { ...analysis, groups: [...analysis.groups].reverse() }).document, result.document);
  const saved = validateDocument(JSON.parse(JSON.stringify(result.document)), definitionsFor(document));
  assert.deepEqual(saved, result.document);
  history.commit(saved); assert.deepEqual(history.peekUndo(), document); history.cursor--;
  assert.deepEqual(history.peekRedo(), saved); history.cursor++;
  const again = applySubgridPartition(saved, analyze(saved));
  assert.equal(again.changed, false); history.commit(again.document); assert.equal(history.entries.length, 2);
  result.document.objects[0].colors[0] = 4; assert.equal(document.objects[0].colors[0], 12);
});

test('invalid, incomplete or structurally cut partitions reject without mutating the project', () => {
  const document = disconnectedSubgridsFixture(); const before = structuredClone(document);
  const analysis = analyze(document);
  assert.throws(() => applySubgridPartition(document, { ...analysis, isValid: false }), /invalid/);
  assert.throws(() => applySubgridPartition(document, { ...analysis, groups: analysis.groups.slice(0, 1) }), /Incomplete/);
  assert.throws(() => applySubgridPartition(document, { ...analysis, groups: [analysis.groups[0], analysis.groups[0]] }), /repeated/);
  const cut = structuredClone(analysis);
  const edge = cut.groups[0].topology.find(item => item.kind === 'edge');
  cut.groups[0].topology = cut.groups[0].topology.filter(item => item !== edge); cut.groups[1].topology.push(edge);
  assert.throws(() => applySubgridPartition(document, cut), /cuts a structural/);
  assert.deepEqual(document, before);
});
