import test from 'node:test';
import assert from 'node:assert/strict';
import { curvedWindowFixture } from './surface-split-fixtures.js';
import { splitCurvedPlate, surfaceSplitRegions, isCurvedPlate } from '../src/editor/surface-split.js';
import { triangulatePlate, validatePlate } from '../src/editor/topology.js';
import { validateDocument, History } from '../src/editor/document.js';
import { toNativePairFromEditor, parseNativePair } from '../src/native/anymaker-data.js';
import { prepareNativeImport } from '../src/native/import-document.js';
import { analyzeStructuralTopology } from '../src/editor/structural-topology.js';
import { analyzeSubgridIntegrity } from '../src/editor/subgrid-connectivity.js';
import { missingPlateBoundaries } from '../src/editor/plate-boundary-coverage.js';
import { splitSurfacePaths } from '../src/editor/surface-paths.js';

const cuts = [['0-1', '1-1'], ['0-2', '1-2'], ['0-3', '1-3']];
for (const type of ['plate', 'window']) test(type + ' sections preserve authoring history but refuse native output without complete boundary beams', () => {
  const document = curvedWindowFixture(type); const before = structuredClone(document);
  const state = document.topology;
  const triangles = triangulatePlate(state.plates[0], state.nodes);
  assert.deepEqual(new Set(triangles.flat()), new Set(state.plates[0].nodeIds));
  const result = splitCurvedPlate(state, 'curve', cuts);
  assert.equal(result.plateIds.length, 4); assert.equal(result.addedEdges, 0);
  assert.deepEqual(document, before);
  assert.deepEqual(result.topology.nodes, state.nodes);
  assert.deepEqual(result.topology.edges, state.edges);
  for (const plate of result.topology.plates) {
    assert.equal(plate.nodeIds.length, 4); validatePlate(plate.nodeIds, state.nodes);
    assert.equal(plate.col_front, 81); assert.equal(plate.col_back, 7); assert.equal(plate.type, type === 'window' ? 'window' : undefined);
    assert.equal(plate.surfaceLimitBypass, true);
  }
  const split = validateDocument({ ...document, topology: result.topology }, new Map());
  const history = new History(document); history.commit(split);
  assert.deepEqual(history.peekUndo(), document);
  assert.deepEqual(validateDocument(JSON.parse(JSON.stringify(split)), new Map()), split);
  assert.throws(() => toNativePairFromEditor(split), /无法自动生成双平面扇形/);
  assert.deepEqual(split.topology.edges, before.topology.edges);
  // Four independently supported sections still exceed the two-plane limit;
  // the exporter reports this instead of silently producing divider geometry.
  const supported = structuredClone(split);
  cuts.forEach(([a, b], i) => supported.topology.edges.push({ id: 'support-' + i, a, b, gridId: 'grid-1' }));
  assert.throws(() => toNativePairFromEditor(supported), /无法自动生成双平面扇形/);
});

test('surface cuts reject crossings, duplicates, adjacent and missing endpoints atomically', () => {
  const { topology } = curvedWindowFixture(); const plate = topology.plates[0]; const original = structuredClone(topology);
  for (const invalid of [[], [['0-1', 'missing']], [['0-0', '0-1']], [cuts[0], cuts[0]], [['0-1', '1-3'], ['0-3', '1-1']]]) {
    assert.throws(() => splitCurvedPlate(topology, plate.id, invalid));
    assert.deepEqual(topology, original);
  }
  const expected = surfaceSplitRegions(plate, topology.nodes, cuts).map(ids => [...ids].sort().join(',')).sort();
  const reversed = { ...plate, nodeIds: [...plate.nodeIds].reverse() };
  assert.deepEqual(surfaceSplitRegions(reversed, topology.nodes, [...cuts].reverse()).map(ids => [...ids].sort().join(',')).sort(), expected);
  const plain = { ...topology, plates: [{ ...plate, nodeIds: ['0-0', '0-1', '1-1', '1-0'] }] };
  delete plain.plates[0].surfaceLimitBypass;
  assert.throws(() => splitCurvedPlate(plain, plate.id, [['0-0', '1-1']]), /请选择曲面/);
});

test('partial surface cuts triangulate remaining warped regions without discarding rail bends', () => {
  const { topology } = curvedWindowFixture();
  const result = splitCurvedPlate(topology, 'curve', [cuts[0]]);
  assert.deepEqual(new Set(result.topology.plates.flatMap(plate => plate.nodeIds)), new Set(topology.plates[0].nodeIds));
  assert.ok(result.topology.plates.every(plate => !isCurvedPlate(plate, topology.nodes)));
  assert.deepEqual(result.topology.edges, topology.edges);
  assert.deepEqual(analyzeSubgridIntegrity({ topology: result.topology }).diagnostics.filter(value => value.severity === 'error'), []);
});

test('unsupported surface corners stay editable but export cannot silently create beams', () => {
  const doc = curvedWindowFixture(); const { topology } = doc;
  topology.edges = topology.edges.filter(edge => edge.a !== '0-2' && edge.b !== '0-2');
  const before = structuredClone(topology);
  const result = splitCurvedPlate(topology, 'curve', cuts);
  assert.deepEqual(result.topology.edges, before.edges);
  assert.throws(() => toNativePairFromEditor({ ...doc, topology: result.topology }), /无法自动生成双平面扇形/);
  assert.deepEqual(topology, before);
});

test('sections preserve reversed winding and existing beam properties with repeat native exports when fully bounded', () => {
  const doc = curvedWindowFixture();
  doc.topology.plates[0].nodeIds.reverse();
  doc.topology.edges.forEach((edge, i) => { edge.size = i % 2 ? 3 : 1; edge.col = 7; });
  cuts.forEach(([a, b], i) => doc.topology.edges.push({ id: 'support-' + i, a, b, gridId: 'grid-1' }));
  assert.throws(() => toNativePairFromEditor(doc), /无法自动生成双平面扇形/);
  const result = splitCurvedPlate(doc.topology, 'curve', [...cuts].reverse());
  doc.topology = result.topology;
  assert.throws(() => toNativePairFromEditor(doc), /无法自动生成双平面扇形/);
});

test('3D paths include extra spatial vertices, keep the outer boundary and share constraints with opposite winding', () => {
  const doc = curvedWindowFixture();
  doc.topology.nodes.push({ id: 'via', position: { x: .8, y: .8, z: 0 }, gridId: 'grid-1', standalone: true });
  const before = structuredClone(doc);
  const result = splitCurvedPlate(doc.topology, 'curve', [['0-2', 'via', '1-2'], ['0-1', 'via']]);
  assert.deepEqual(doc, before);
  assert.deepEqual(result.topology.nodes, doc.topology.nodes);
  assert.deepEqual(result.topology.edges, doc.topology.edges);
  const edges = result.topology.plates.flatMap(p => p.nodeIds.map((a, i) => [a, p.nodeIds[(i + 1) % p.nodeIds.length]]));
  for (const [a, b] of [['0-2', 'via'], ['via', '1-2'], ['0-1', 'via']]) {
    assert.equal(edges.filter(([c, d]) => a === c && b === d).length, 1);
    assert.equal(edges.filter(([c, d]) => a === d && b === c).length, 1);
  }
  const perimeter = edges.filter(([a, b]) => !edges.some(([c, d]) => a === d && b === c));
  assert.equal(perimeter.length, doc.topology.plates[0].nodeIds.length);
  for (const p of result.topology.plates) validatePlate(p.nodeIds, result.topology.nodes);
  assert.throws(() => toNativePairFromEditor({ ...doc, topology: result.topology }), /无法自动生成双平面扇形/);
});

test('3D path validation rejects actual crossings, repeated vertices and cross-grid controls atomically', () => {
  const doc = curvedWindowFixture(); const { topology } = doc; const plate = topology.plates[0];
  topology.nodes.push({ id: 'via', position: { x: .8, y: .8, z: 0 }, gridId: 'grid-1', standalone: true });
  const before = structuredClone(topology);
  for (const paths of [[['0-2','via','0-2']], [['via','0-2']], [['0-2','missing','1-2']], [['0-2','0-1','1-2']]]) {
    assert.throws(() => splitSurfacePaths(plate, topology.nodes, paths));
    assert.deepEqual(topology, before);
  }
  topology.nodes.at(-1).gridId = 'grid-2';
  assert.throws(() => splitSurfacePaths(plate, topology.nodes, [['0-2','via','1-2']]), /子网格/);
  const nodes = [[0,0,0],[4,0,0],[4,4,0],[0,4,0],[2,2,0],[2,2,1]].map(([x,y,z],i)=>({id:String(i),position:{x,y,z}}));
  const face = { nodeIds:['0','1','2','3'] };
  assert.throws(() => splitSurfacePaths(face,nodes,[['0','4','2'],['1','5','3']]), /同一面片/);
  // Projection crosses the left boundary, but the raised path does not.
  nodes[5].position = { x: -1, y: 2, z: 1 };
  assert.equal(splitSurfacePaths(face, nodes, [['0','5','2']]).length, 2);
  nodes[5].position.z = 0;
  assert.throws(() => splitSurfacePaths(face, nodes, [['0','5','2']]), /相交或重叠/);
});

test('import keeps all eight unsupported triangular windows and reports why the game will drop them', () => {
  const doc = curvedWindowFixture();
  const exportable = structuredClone(doc);
  exportable.topology.plates = [];
  const base = toNativePairFromEditor(exportable);
  const triangles = [];
  for (let i = 0; i < 4; i++) triangles.push(['0-'+i,'0-'+(i+1),'1-'+i], ['0-'+(i+1),'1-'+(i+1),'1-'+i]);
  const ids = new Map(doc.topology.nodes.map((n,i)=>[n.id,i+1]));
  base.data.vehicles.vehicles[0].plates = triangles.map((nodes,i)=>({id:i+1,nodes:nodes.map(id=>ids.get(id)),type:'window',glass_impacts:[]}));
  const imported = prepareNativeImport(parseNativePair(base.data,base.meta));
  assert.equal(imported.document.topology.plates.length,8);
  assert.equal(imported.nativeLoadDiagnostics.length,8);
  assert.equal(missingPlateBoundaries(imported.document.topology).length,8);
  const before = structuredClone(imported.document);
  assert.throws(()=>toNativePairFromEditor(imported.document), /缺少边界梁/);
  assert.deepEqual(imported.document,before);
});
