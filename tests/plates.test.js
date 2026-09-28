import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { extendPlateSelection } from '../src/editor/plate-selection.js';
import { createPlate, validatePlate, triangulatePlate } from '../src/editor/topology.js';
import { plateSurfaceBoundary, plateSurfaceVertices, cameraFacingPlateDirection } from '../src/editor/construction-view.js';
import { englishMessages } from '../src/locales/en.js';
import { editorMessages } from '../src/editor/ui-messages.js';
import { modelImportMessages } from '../src/locales/model-import-en.js';

const nodesAt = points => points.map(([x, y, z = 0], i) => ({ id: 'n' + i, position: { x, y, z } }));
const square = () => {
  const nodes = nodesAt([[0, 0], [.32, 0], [.32, .32], [0, .32]]);
  const edges = nodes.map((node, i) => ({ id: 'e' + i, a: node.id, b: nodes[(i + 1) % nodes.length].id, gridId: 'square' }));
  return { nodes, edges };
};

test('plate drafts allow arbitrary order and mixed beam sizes, and can deselect stray edges', () => {
  const { nodes, edges } = square();
  edges[1].size = 3;
  edges.push({ id: 'branch', a: 'n0', b: 'n2', gridId: 'square' });
  let draft = extendPlateSelection(null, 'e0', edges, nodes);
  const saved = structuredClone(draft);
  const opposite = extendPlateSelection(draft, 'e2', edges, nodes);
  assert.deepEqual(draft, saved);
  draft = extendPlateSelection(opposite, 'branch', edges, nodes);
  draft = extendPlateSelection(draft, 'e3', edges, nodes);
  draft = extendPlateSelection(draft, 'e1', edges, nodes);
  assert.equal(draft.closed, false);
  draft = extendPlateSelection(draft, 'branch', edges, nodes);
  assert.equal(draft.closed, true);
  assert.deepEqual(draft.nodeIds, ['n0', 'n1', 'n2', 'n3']);
  assert.equal(draft.gridId, 'square');
  assert.equal(draft.size, 3);
  assert.deepEqual(extendPlateSelection(saved, 'e0', edges, nodes).edgeIds, []);
});

test('plate drafts keep more than four collinear boundary segments and triangulate the full loop', () => {
  const nodes = nodesAt([[0, 0], [.16, 0], [.32, 0], [.32, .16], [.32, .32], [.16, .32], [0, .32], [0, .16]]);
  const edges = nodes.map((node, i) => ({ id: 'e' + i, a: node.id, b: nodes[(i + 1) % nodes.length].id }));
  for (const order of [[0, 1, 4, 5, 2, 6, 3, 7], [7, 6, 5, 4, 3, 2, 1, 0]]) {
    let draft = null;
    for (const [i, index] of order.entries()) {
      draft = extendPlateSelection(draft, 'e' + index, edges, nodes);
      assert.equal(draft.edgeIds.length, i + 1);
      assert.equal(draft.closed, i === 7);
    }
    const { plate } = createPlate([], draft.nodeIds, nodes);
    assert.equal(plate.nodeIds.length, 8);
    const triangles = triangulatePlate(plate, nodes);
    const positions = new Map(nodes.map(node => [node.id, node.position]));
    const area = triangles.reduce((sum, ids) => {
      const [a, b, c] = ids.map(id => positions.get(id));
      return sum + Math.abs((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) / 2;
    }, 0);
    assert.ok(Math.abs(area - .32 * .32) < 1e-9);
  }
});

test('plate drafts defer planarity and grid checks until closure and preserve drafts on failure', () => {
  for (const invalid of ['plane', 'grid', 'node-grid']) {
    const { nodes, edges } = square();
    if (invalid === 'plane') nodes[3].position.z = .08;
    if (invalid === 'grid') edges[1].gridId = 'other';
    if (invalid === 'node-grid') nodes[2].gridId = 'other';
    let draft = null;
    for (const id of ['e0', 'e3', 'e1']) draft = extendPlateSelection(draft, id, edges, nodes);
    const saved = structuredClone(draft);
    assert.equal(draft.edgeIds.length, 3);
    assert.throws(() => extendPlateSelection(draft, 'e2', edges, nodes), invalid === 'plane' ? /共面/ : /子网格/);
    assert.deepEqual(draft, saved);
  }
});

test('plate drafts accept a concave planar loop and leave multiple loops uncommitted', () => {
  const nodes = nodesAt([[0, 0], [.32, 0], [.32, .08], [.08, .08], [.08, .32], [0, .32]]);
  const edges = nodes.map((node, i) => ({ id: 'e' + i, a: node.id, b: nodes[(i + 1) % nodes.length].id }));
  let draft = null;
  for (const id of ['e0', 'e2', 'e3', 'e4', 'e1', 'e5']) draft = extendPlateSelection(draft, id, edges, nodes);
  assert.equal(draft.closed, true);
  assert.doesNotThrow(() => createPlate([], draft.nodeIds, nodes));
  const squares = square();
  const extraNodes = squares.nodes.map(node => ({ ...node, id: node.id + 'b', position: { ...node.position, x: node.position.x + 1 } }));
  const extraEdges = squares.edges.map(edge => ({ ...edge, id: edge.id + 'b', a: edge.a + 'b', b: edge.b + 'b' }));
  let disconnected = null;
  for (const id of ['e0', 'e0b', 'e1', 'e1b', 'e2', 'e2b', 'e3', 'e3b']) disconnected = extendPlateSelection(disconnected, id, [...squares.edges, ...extraEdges], [...squares.nodes, ...extraNodes]);
  assert.equal(disconnected.closed, false);
  assert.equal(disconnected.edgeIds.length, 8);
});

test('plate validation rejects bowties, repeated positions and small nonplanar loops', () => {
  const { nodes } = square();
  assert.throws(() => validatePlate(['n0', 'n2', 'n1', 'n3'], nodes), /自交/);
  assert.throws(() => validatePlate(['n0', 'n1', 'n2', 'duplicate'], [...nodes, { id: 'duplicate', position: nodes[0].position }]), /自交/);
  const warped = nodesAt([[0, 0], [.08, 0], [.08, .08], [0, .08, .0001]]);
  assert.throws(() => validatePlate(warped.map(node => node.id), warped), /共面/);
});

test('plate duplicate detection is invariant to every cyclic start and winding', () => {
  const { nodes } = square(); const ids = nodes.map(node => node.id);
  const { plates } = createPlate([], ids, nodes);
  for (let i = 0; i < ids.length; i++) {
    const rotated = [...ids.slice(i), ...ids.slice(0, i)];
    assert.throws(() => createPlate(plates, rotated, nodes), /已有面板/);
    assert.throws(() => createPlate(plates, [...rotated].reverse(), nodes), /已有面板/);
  }
});

test('concave saved plates triangulate without filling their notch in either winding', () => {
  const nodes = nodesAt([[0, 0], [.32, 0], [.32, .08], [.08, .08], [.08, .32], [0, .32]]);
  const byId = new Map(nodes.map(node => [node.id, node.position]));
  for (const ids of [nodes.map(node => node.id), nodes.map(node => node.id).reverse()]) {
    const triangles = triangulatePlate({ nodeIds: ids }, nodes);
    let area = 0;
    for (const triangle of triangles) {
      const [a, b, c] = triangle.map(id => byId.get(id));
      area += Math.abs((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) / 2;
      const x = (a.x + b.x + c.x) / 3; const y = (a.y + b.y + c.y) / 3;
      assert.ok(x <= .08 + 1e-9 || y <= .08 + 1e-9);
    }
    assert.ok(Math.abs(area - .0448) < 1e-9);
    const positions = new Map(nodes.map(node => [node.id, new THREE.Vector3(node.position.x, node.position.y, 0)]));
    assert.equal(plateSurfaceVertices(ids, positions).length, triangles.length * 9);
  }
});

test('plate support uses face centres, edge midpoints and corners with no camera tangent displacement', () => {
  for (const [points, offset] of [
    [[[0, 0, 0], [.32, 0, 0], [.32, .32, 0]], [0, 0, .04]],
    [[[0, 0, 0], [.32, 0, 0], [.32, .32, .16]], [0, -.04, .04]],
    [[[0, 0, 0], [.24, .08, .08], [.16, .32, .16]], [-.04, -.04, .04]],
  ]) {
    const positions = new Map(points.map((point, i) => ['n' + i, new THREE.Vector3(...point)]));
    const ids = [...positions.keys()];
    const n = new THREE.Vector3().subVectors(positions.get('n1'), positions.get('n0')).cross(new THREE.Vector3().subVectors(positions.get('n2'), positions.get('n0'))).normalize();
    const center = [...positions.values()].reduce((sum, p) => sum.add(p), new THREE.Vector3()).divideScalar(3);
    const tangent = positions.get('n1').clone().sub(positions.get('n0')).normalize();
    for (const amount of [-100, 0, 100]) {
      const camera = center.clone().addScaledVector(n, 5).addScaledVector(tangent, amount);
      const direction = cameraFacingPlateDirection(ids, positions, camera);
      assert.ok(direction.distanceTo(n) < 1e-9);
      // Legacy snapshots may store an arbitrary camera vector; only its side matters.
      const boundary = plateSurfaceBoundary(ids, positions, { surfaceDirection: camera.clone().sub(center) });
      boundary.forEach((point, i) => assert.ok(point.clone().sub(positions.get(ids[i])).distanceTo(new THREE.Vector3(...offset)) < 1e-9));
    }
    const zero = plateSurfaceBoundary(ids, positions, 0);
    zero.forEach((point, i) => assert.ok(point.distanceTo(positions.get(ids[i])) < 1e-9));
  }
});

test('structural plate translations use plate while mathematical planes and UI panels retain their meanings', () => {
  for (const [key, value] of Object.entries({ ...englishMessages, ...editorMessages, ...modelImportMessages })) {
    if (!key.includes('面板') || /右侧面板|编辑器面板/.test(key)) continue;
    assert.doesNotMatch(value, /\bpanels?\b|\bplanes?\b/i, key);
  }
  assert.equal(editorMessages['面板'], 'Plates');
  assert.equal(englishMessages['工作平面 Y = 0'], 'Ground plane Y = 0');
});
