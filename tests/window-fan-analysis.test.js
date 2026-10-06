import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeNativeWindowFans, commonFanPointCondition } from '../scripts/lib/window-fan-analysis.mjs';

const constants = { gridSize: .08, windowInset: .04, frameWidth: .01, plateThickness: .01 };
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-9, `${actual} differs from ${expected}`);
const norm = point => Math.hypot(...point);
const sub = (a, b) => a.map((v, i) => v - b[i]);

function squareFixture(threeAxes = false) {
  const positions = threeAxes ? [[0,0,0],[10,10,0],[10,20,10],[0,10,10]] : [[0,0,0],[10,10,0],[10,10,10],[0,0,10]];
  return {
    id: 1, nodes: positions.map((pos, i) => ({ id: i + 1, pos })),
    edges: [[1,2],[2,3],[3,4],[4,1],[1,3]].map(([n0,n1]) => ({ n0,n1 })),
    plates: [{ id: 1, nodes: [1,2,3], type: 'window' }, { id: 2, nodes: [1,3,4], type: 'window' }]
  };
}

for (const threeAxes of [false, true]) test(`${threeAxes ? 'three' : 'two'}-axis coplanar triangular windows leave a 1.25-cell glass separation despite complete support`, () => {
  const fixture = squareFixture(threeAxes); const before = structuredClone(fixture);
  const result = analyzeNativeWindowFans(fixture, constants);
  assert.deepEqual(fixture, before);
  assert.equal(result.existingBeamTriangleCycles.count, 2);
  assert.deepEqual(result.uniqueMissingWindowBoundaries, []);
  assert.equal(result.sharedEdges.length, 1);
  near(result.sharedEdges[0].midpointGlassSeparation.front, .1);
  near(result.sharedEdges[0].midpointGlassSeparation.back, .1);
  assert.equal(result.groups[0].targetNodeSurfaceCommonFanPoint.status, 'not-ruled-out');
  for (const model of result.models) {
    assert.equal(model.axes, threeAxes ? 3 : 2);
    model.geometry.glass.forEach((point, i) => near(norm(sub(point, model.geometry.backGlass[i])), .01));
  }
});

test('piecewise curved strip has no common fan point, even at an arbitrary reconstructed inner anchor', () => {
  const profile = [[0,0],[2,3],[5,5],[9,6]];
  const nodes = profile.flatMap(([x,y], i) => [{ id: i * 2 + 1, pos: [x,y,-6] }, { id: i * 2 + 2, pos: [x,y,6] }]);
  const plates = []; const edges = [{ n0: 1, n1: 2 }, { n0: 7, n1: 8 }];
  for (let i = 0; i < 3; i++) {
    const a = i * 2 + 1; const b = a + 1; const c = a + 2; const d = a + 3;
    plates.push({ id: i * 2 + 1, nodes: [a,c,d], type: 'window' }, { id: i * 2 + 2, nodes: [a,d,b], type: 'window' });
    edges.push({ n0: a, n1: c }, { n0: b, n1: d });
  }
  const result = analyzeNativeWindowFans({ id: 1, nodes, edges, plates }, constants);
  assert.equal(result.existingBeamTriangleCycles.count, 0);
  assert.equal(result.uniqueMissingWindowBoundaries.length, 5);
  assert.ok(result.models.every(model => model.missingBoundaries.length > 0));
  assert.equal(result.groups.length, 1);
  assert.equal(result.groups[0].targetNodeSurfaceCommonFanPoint.status, 'impossible');
  assert.equal(result.groups[0].intactFrontGlassCommonFanPoint.status, 'impossible');
});

test('concurrent tilted planes pass only the necessary fan condition and inconsistent parallel planes fail', () => {
  const concurrent = commonFanPointCondition([
    { normal: [1,0,0], constant: 1 }, { normal: [0,1,0], constant: 2 },
    { normal: [0,0,1], constant: 3 }, { normal: [1,1,1], constant: 6 }
  ]);
  assert.equal(concurrent.status, 'not-ruled-out');
  assert.equal(concurrent.normalRank, 3);
  assert.equal(commonFanPointCondition([{ normal: [1,0,0], constant: 1 }, { normal: [1,0,0], constant: 2 }]).status, 'impossible');
});

test('native geometry uses the first supporting beam size instead of the stored plate size', () => {
  const vehicle = squareFixture(); vehicle.plates[0].size = 1;
  const ordinary = analyzeNativeWindowFans(vehicle, constants).models[0];
  near(Math.abs(ordinary.geometry.offset[0]), .04);
  vehicle.edges[0].size = 1; vehicle.plates[0].size = 0;
  const wide = analyzeNativeWindowFans(vehicle, constants).models[0];
  near(Math.abs(wide.geometry.offset[0]), .12);
  assert.equal(wide.geometry.firstBeamSize, 1);
});

test('unsupported contours, axis branch and damaged glass are explicitly omitted from aperture simulation', () => {
  const axis = squareFixture(); axis.nodes.forEach(node => node.pos[0] = 0);
  assert.ok(analyzeNativeWindowFans(axis, constants).models.every(model => model.geometry === null && model.omittedReason.includes('One-axis')));
  const damaged = squareFixture(); damaged.plates[0].glass_state = 'broken';
  assert.equal(analyzeNativeWindowFans(damaged, constants).sharedEdges[0].midpointGlassSeparation, undefined);
  const contour = squareFixture(); contour.plates = [{ id: 1, type: 'window', nodes: [1,2,3,4] }];
  const report = analyzeNativeWindowFans(contour, constants);
  assert.equal(report.groups[0].targetNodeSurfaceCommonFanPoint, null);
  assert.equal(report.models[0].geometry, null);
  const tiny = squareFixture(); tiny.nodes.forEach(node => { node.pos = node.pos.map(value => value / 10); });
  assert.ok(analyzeNativeWindowFans(tiny, constants).models.every(model => model.omittedReason === 'Inset consumes the triangle aperture'));
});

test('native fan analysis rejects malformed references, positions, IDs and degenerate triangles without mutation', () => {
  const mutations = [
    vehicle => { vehicle.nodes[0].pos[0] = Infinity; },
    vehicle => { vehicle.nodes[0].pos[0] = .5; },
    vehicle => { vehicle.nodes[1].id = 1; },
    vehicle => { vehicle.plates[1].id = 1; },
    vehicle => { vehicle.plates[0].nodes[0] = 999; },
    vehicle => { vehicle.plates[0].nodes[0] = 2; },
    vehicle => { vehicle.edges.push({ ...vehicle.edges[0] }); },
    vehicle => { vehicle.nodes[2].pos = [5,5,0]; }
  ];
  for (const mutate of mutations) {
    const vehicle = squareFixture(); mutate(vehicle); const before = structuredClone(vehicle);
    assert.throws(() => analyzeNativeWindowFans(vehicle, constants));
    assert.deepEqual(vehicle, before);
  }
});
