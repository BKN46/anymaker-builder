import test from 'node:test';
import assert from 'node:assert/strict';
import { parseNativePair, toNativePairFromEditor } from '../src/native/anymaker-data.js';
import { toEditorDocument } from '../src/editor/model.js';
import { analyzeSubgridIntegrity } from '../src/editor/subgrid-connectivity.js';
import { locatableSubgridErrors } from '../src/editor/subgrid-error-markers.js';
import { applySubgridPartition } from '../src/editor/subgrid-partition.js';
import { hingeAssemblyFixture } from './mechanical-fixtures.js';
import { unsupportedPlateCorners, crossIslandPlate } from './native-export-fixtures.js';

// Two plate corners have no incident beams, as in the 981.1 crash. The
// game's _split_islands reads node.edges.front() without an empty check.
test('native export supplies boundary beams for every unsupported plate corner', () => {
  const source = unsupportedPlateCorners();
  const document = toEditorDocument(parseNativePair(source, {}));
  const before = structuredClone(document);
  const pair = toNativePairFromEditor(document);
  const body = pair.data.vehicles.vehicles[0];
  const edgeNodes = new Set(body.edges.flatMap(edge => [edge.n0, edge.n1]));
  assert.ok(body.nodes.every(node => edgeNodes.has(node.id)), 'every exported node needs an incident beam');
  assert.deepEqual(body.nodes.map(node => node.pos), source.vehicles.vehicles[0].nodes.map(node => node.pos));
  assert.equal(body.plates.length, 3);
  assert.equal(body.edges.length, 7, 'shared missing boundary beams are added only once');
  assert.deepEqual(body.edges.slice(0, 2).map(edge => edge.col), [26, 49]);
  assert.ok(body.edges.slice(2).every(edge => edge.col === 81));
  assert.equal(new Set(body.edges.map(edge => [edge.n0, edge.n1].sort((a, b) => a - b).join(':'))).size, body.edges.length);
  assert.deepEqual(document, before);
  const restored = toEditorDocument(parseNativePair(pair.data, pair.meta));
  assert.deepEqual(toNativePairFromEditor(restored).data, pair.data);
});

test('island checking locates unsupported corners and rechecks repaired exports without errors', () => {
  const document = toEditorDocument(parseNativePair(unsupportedPlateCorners(), {}));
  const before = structuredClone(document);
  const check = document => analyzeSubgridIntegrity({ components: document.objects, topology: document.topology });
  const analysis = check(document);
  assert.equal(analysis.isValid, false);
  assert.deepEqual(analysis.diagnostics.filter(item => item.code === 'plate-node-without-beam').map(item => item.entityIds[0]), ['grid-1-1:99', 'grid-1-1:100']);
  const locations = locatableSubgridErrors(analysis.diagnostics, document.topology);
  assert.deepEqual(locations.map(item => item.nodeIds), [['grid-1-1:99'], ['grid-1-1:100']]);
  assert.throws(() => applySubgridPartition(document, analysis), /invalid/);
  assert.deepEqual(document, before);
  const pair = toNativePairFromEditor(document);
  const repaired = check(toEditorDocument(parseNativePair(pair.data, pair.meta)));
  assert.equal(repaired.isValid, true);
  assert.equal(repaired.groups.length, 1);
  assert.equal(repaired.diagnostics.length, 0);
});

test('plates follow boundary beams rather than welding every referenced node into one island', () => {
  const document = crossIslandPlate(); const before = structuredClone(document);
  const result = analyzeSubgridIntegrity({ topology: document.topology });
  assert.equal(result.groups.length, 2);
  const plateGroup = result.groups.find(group => group.topology.some(item => item.kind === 'plate'));
  assert.ok(!plateGroup.topology.some(item => item.id === 'cd' || item.id === 'n2'));
  assert.ok(result.diagnostics.some(item => item.code === 'plate-crosses-islands' && item.severity === 'error'));
  assert.throws(() => toNativePairFromEditor(document), error => error.structuralDiagnostics?.some(item => item.code === 'plate-crosses-islands'));
  assert.deepEqual(document, before);
  document.topology.edges.push({ id: 'bc', a: 'n1', b: 'n2' });
  assert.equal(analyzeSubgridIntegrity({ topology: document.topology }).isValid, true);
  assert.throws(() => toNativePairFromEditor(document), error => error.structuralDiagnostics?.some(item => item.code === 'native-plate-missing-boundary'));
  document.topology.edges.push({ id: 'ca', a: 'n2', b: 'n0' });
  assert.doesNotThrow(() => toNativePairFromEditor(document));
});

test('island error markers distinguish plate IDs from node IDs', () => {
  const data = unsupportedPlateCorners();
  data.vehicles.vehicles[0].plates[0].id = 27;
  data.vehicles.vehicles[0].plates[1].id = 98;
  data.vehicles.vehicles[0].plates[2].id = 10;
  const document = toEditorDocument(parseNativePair(data, {}));
  const analysis = analyzeSubgridIntegrity({ topology: document.topology });
  assert.deepEqual(locatableSubgridErrors(analysis.diagnostics, document.topology).flatMap(item => item.nodeIds).sort(), ['grid-1-1:100', 'grid-1-1:99']);
  const cross = crossIslandPlate(); cross.topology.plates[0].id = 'n0';
  const errors = analyzeSubgridIntegrity({ topology: cross.topology }).diagnostics;
  assert.deepEqual(locatableSubgridErrors(errors, cross.topology).flatMap(item => item.nodeIds), ['n2']);
});

test('boundary completion is independent of node IDs, ordering and the number of unsupported corners', () => {
  for (const reverse of [false, true]) for (const noBeams of [false, true]) {
    const data = unsupportedPlateCorners(); const body = data.vehicles.vehicles[0];
    const map = new Map(body.nodes.map((node, i) => [node.id, 300 + i * 7]));
    body.nodes.forEach(node => { node.id = map.get(node.id); });
    body.edges.forEach(edge => { edge.n0 = map.get(edge.n0); edge.n1 = map.get(edge.n1); });
    body.plates.forEach(plate => { plate.nodes = plate.nodes.map(id => map.get(id)); if (reverse) plate.nodes.reverse(); });
    if (reverse) body.nodes.reverse();
    if (noBeams) body.edges = [];
    const pair = toNativePairFromEditor(toEditorDocument(parseNativePair(data, {})));
    const exported = pair.data.vehicles.vehicles[0];
    const incident = new Set(exported.edges.flatMap(edge => [edge.n0, edge.n1]));
    assert.ok(exported.nodes.every(node => incident.has(node.id)));
    assert.equal(exported.plates.length, 3);
    assert.equal(exported.edges.length, 7);
  }
});

test('repaired corner beams remain with their nodes and plates across physical mate exports', () => {
  const document = toEditorDocument(parseNativePair(hingeAssemblyFixture(), {}));
  const extra = toEditorDocument(parseNativePair(unsupportedPlateCorners(), {})).topology;
  for (const key of ['nodes', 'edges', 'plates']) document.topology[key].push(...extra[key].map(item => ({ ...item, id: 'repair-' + item.id,
    ...(item.a ? { a: 'repair-' + item.a, b: 'repair-' + item.b } : {}),
    ...(item.nodeIds ? { nodeIds: item.nodeIds.map(id => 'repair-' + id) } : {}),
  })));
  const pair = toNativePairFromEditor(document);
  assert.ok(pair.data.vehicles.vehicles.length >= 2);
  for (const body of pair.data.vehicles.vehicles) {
    const nodes = new Set(body.nodes.map(node => node.id));
    const incident = new Set(body.edges.flatMap(edge => [edge.n0, edge.n1]));
    assert.ok(body.nodes.every(node => incident.has(node.id)));
    assert.ok(body.edges.every(edge => nodes.has(edge.n0) && nodes.has(edge.n1)));
    assert.ok(body.plates.every(plate => plate.nodes.every(id => nodes.has(id))));
  }
});

test('structural checks reject duplicate IDs, coincident beams and malformed polygons', () => {
  const base = crossIslandPlate();
  const check = topology => analyzeSubgridIntegrity({ topology });
  const duplicate = structuredClone(base.topology); duplicate.nodes.push(structuredClone(duplicate.nodes[0]));
  assert.ok(check(duplicate).diagnostics.some(item => item.code === 'duplicate-structural-id'));
  const degenerate = structuredClone(base.topology); degenerate.nodes[1].position = { ...degenerate.nodes[0].position };
  assert.ok(check(degenerate).diagnostics.some(item => item.code === 'degenerate-edge'));
  const invalid = structuredClone(base.topology); invalid.plates[0].nodeIds = ['n0', 'n1', 'missing'];
  assert.ok(check(invalid).diagnostics.some(item => item.code === 'missing-plate-node'));
  const polygon = structuredClone(base.topology); polygon.plates[0].nodeIds = ['n0', 'n3', 'n2', 'n1'];
  assert.ok(check(polygon).diagnostics.some(item => item.code === 'invalid-plate-geometry'));
  const malformed = structuredClone(base.topology); malformed.plates[0].nodeIds = 'n0';
  assert.ok(check(malformed).diagnostics.some(item => item.code === 'invalid-plate'));
  for (const topology of [duplicate, degenerate, invalid, polygon, malformed]) {
    assert.throws(() => toNativePairFromEditor({ ...base, topology }));
  }
});
