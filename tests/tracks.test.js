import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import * as THREE from 'three';
import { trackFixture } from './track-fixtures.js';
import { TRACK_TYPES, trackProfile } from '../src/editor/track-profiles.js';
import { analyzeTracks, prepareTrackLink } from '../src/editor/track-path.js';
import { createTrackVisual } from '../src/editor/track-view.js';
import { logicNodePortsForNetwork } from '../src/editor/connection-ports.js';
import { connectionPortRoleLabel } from '../src/editor/connection-port-labels.js';
import { toNativePairFromEditor, parseNativePair } from '../src/native/anymaker-data.js';
import { toEditorDocument } from '../src/editor/model.js';
import { History, validateDocument } from '../src/editor/document.js';

const definitions = new Map();
for (const family of ['sprocket', 'roller_wheel_fixed', 'roller_wheel_suspension']) for (const suffix of 'abcdef') {
  const type = family + '_' + suffix; definitions.set(type, JSON.parse(readFileSync('public/data/definitions/' + type + '.json')));
}
const components = doc => new Map(doc.objects.map(object => [object.id, object]));
const analyze = (doc, options) => analyzeTracks(doc.topology.links, components(doc), definitions, options);
const close = (a, b, tolerance = 1e-7) => assert.ok(Math.abs(a - b) < tolerance, `${a} differs from ${b}`);

test('all 18 wheel profiles use native belt ports, dimensions and wheel centers', () => {
  for (const [type, definition] of definitions) {
    const profile = trackProfile(definition);
    const [port] = logicNodePortsForNetwork(definition, 'belt');
    assert.equal(port.port, 0); assert.equal(port.type, profile.nodeType);
    assert.equal(connectionPortRoleLabel(port, 'en').includes('track') || connectionPortRoleLabel(port, 'en') === 'Track', true);
    assert.match(connectionPortRoleLabel(port, 'zh'), /履带/);
    const doc = trackFixture(type.at(-1)); doc.objects.forEach(object => { object.type = type; });
    const result = analyze(doc); assert.deepEqual(result.issues, []);
    const node = result.tracks[0].path.nodes.find(value => value.component.id === doc.objects[0].id);
    close(node.center[0], doc.objects[0].position.x - profile.center[0]);
    close(node.center[1], profile.center[1]); close(node.center[2], profile.center[2]);
  }
  assert.deepEqual(trackProfile(definitions.get('roller_wheel_suspension_b')).center, [-.08, -.032, 0]);
  assert.equal(trackProfile(definitions.get('sprocket_e')).radius, .23);
});

for (const suffix of ['a', 'c', 'e']) test('two wheels create a continuous closed native track: ' + suffix, () => {
  const doc = trackFixture(suffix); const { tracks, issues } = analyze(doc);
  assert.deepEqual(issues, []); assert.equal(tracks.length, 1);
  const { path, profile } = tracks[0];
  const radius = path.nodes[0].radius;
  close(path.length, path.count * profile.pitch);
  assert.equal(path.count, Math.round(2 * Math.PI * radius / profile.pitch) + Math.round(3.2 / profile.pitch));
  assert.ok(path.samples.every(value => value.position.every(Number.isFinite)));
  const xs = path.samples.map(value => value.position[0]);
  // Discrete pieces can land half a pitch either side of the extreme.
  const sampledExtent = radius * Math.cos(profile.pitch / (2 * radius));
  assert.ok(Math.min(...xs) <= -.8 - sampledExtent + 1e-8); assert.ok(Math.max(...xs) >= .8 + sampledExtent - 1e-8);
  path.segments.forEach(segment => {
    const before = path.sample(segment.offset - 1e-8).position; const after = path.sample(segment.offset + 1e-8).position;
    assert.ok(Math.hypot(...before.map((value, i) => value - after[i])) < 1e-6);
  });
  close(Math.hypot(...path.sample(0).position.map((value, i) => value - path.sample(path.length).position[i])), 0);
  const reversed = structuredClone(doc); const link = reversed.topology.links[0]; [link.from, link.to] = [link.to, link.from];
  assert.deepEqual(analyze(reversed).tracks[0].path.samples, path.samples);
});

test('mixed wheel sizes use quantized radii and retain concave idlers', () => {
  const doc = trackFixture('e', [[-.8, 0], [0, -.48], [.8, 0], [0, -.08]]);
  doc.objects[0].type = 'sprocket_f';
  const result = analyze(doc); assert.deepEqual(result.issues, []);
  const { path } = result.tracks[0]; assert.equal(path.nodes.length, 4);
  assert.ok(path.nodes.some(node => node.concave));
  close(path.nodes.find(node => node.component.type === 'sprocket_f').radius, .42);
  close(path.nodes.find(node => node.component.type === 'roller_wheel_fixed_e').radius, .24);
  for (const node of path.nodes.filter(node => node.concave)) assert.equal(node.enter, node.leave);
  const reordered = structuredClone(doc); reordered.topology.links.reverse();
  for (const link of reordered.topology.links) [link.from, link.to] = [link.to, link.from];
  const other = analyze(reordered).tracks[0].path;
  close(other.length, path.length); assert.equal(other.count, path.count);
});

test('mixed radii emit the last partial-pitch piece before the native path end', () => {
  const doc = trackFixture('a', [[-.8, 0], [.64, .16], [.48, .8]]); doc.objects[0].type = 'sprocket_b';
  const { path, profile } = analyze(doc).tracks[0];
  close(path.length / profile.pitch, 69.5);
  assert.equal(path.count, 70); assert.equal(path.samples.length, 70);
  assert.deepEqual(path.samples.at(-1), path.sample(69 * profile.pitch));
  assert.equal(analyze(doc, { maxPieces: 69 }).issues[0].code, 'limit');
});

test('invalid networks retain links and explain open, branching, width and plane failures', () => {
  const doc = trackFixture('c', [[-.8, 0], [0, .64], [.8, 0]]);
  const original = structuredClone(doc); doc.topology.links.pop();
  const before = JSON.stringify(doc); assert.equal(analyze(doc).issues[0].code, 'open'); assert.equal(JSON.stringify(doc), before);
  doc.topology.links = original.topology.links;
  doc.objects.push({ ...structuredClone(doc.objects[0]), id: 'extra', position: { x: -1.6, y: 0, z: 0 } });
  const extra = { id: 'branch', kind: 'belt', from: doc.topology.links[0].from, to: { componentId: 'extra' } };
  assert.throws(() => prepareTrackLink(extra, doc.topology.links, components(doc), definitions), error => error.trackCode === 'branch');
  doc.topology.links.push(extra); assert.equal(analyze(doc).issues[0].code, 'branch');
  for (const [modify, code] of [
    [doc => { doc.objects[1].type = 'roller_wheel_fixed_a'; }, 'width'],
    [doc => { doc.objects[1].position.z = .08; }, 'plane'],
    [doc => { doc.objects[1].rotation.y = Math.PI; }, 'plane'],
    [doc => { doc.objects[1].scale.x = 2; }, 'scale'],
    [doc => { doc.objects[1].position.x = doc.objects[0].position.x; }, 'geometry'],
    [doc => { doc.topology.links[0].to.port = 5; }, 'ports'],
  ]) { const value = trackFixture(); modify(value); assert.equal(analyze(value).issues[0].code, code); assert.equal(value.topology.links.length, 1); }
  assert.equal(analyze(trackFixture(), { maxPieces: 3 }).issues[0].code, 'limit');
});

test('arbitrary common rotations transform wheel paths and keep positive instance matrices', () => {
  const doc = trackFixture(); const baseline = analyze(doc).tracks[0];
  const rotation = new THREE.Euler(.3, .5, .7); const quaternion = new THREE.Quaternion().setFromEuler(rotation);
  doc.objects.forEach(object => {
    const point = new THREE.Vector3(...Object.values(object.position)).applyQuaternion(quaternion);
    object.position = { x: point.x, y: point.y, z: point.z }; object.rotation = { x: rotation.x, y: rotation.y, z: rotation.z };
  });
  const changed = analyze(doc); assert.deepEqual(changed.issues, []);
  const path = changed.tracks[0].path;
  baseline.path.samples.forEach((sample, i) => {
    const expected = new THREE.Vector3(...sample.position).applyQuaternion(quaternion);
    ['x', 'y', 'z'].forEach((axis, k) => close(path.samples[i].position[k], expected[axis]));
  });
});

for (const suffix of ['a', 'c', 'e']) test('published track Mesh instancing preserves native geometry and bounds: ' + suffix, () => {
  const doc = trackFixture(suffix); const track = analyze(doc).tracks[0];
  const manifest = JSON.parse(readFileSync('public/assets/manifests/mesh-manifest.json'));
  const entry = manifest.entries[track.profile.mesh];
  const parsed = JSON.parse(gunzipSync(readFileSync('public/' + entry.url)));
  for (const part of parsed.parts) { part.positions = new Float32Array(part.positions); part.indices = new Uint32Array(part.indices); part.normals = part.normals ? new Float32Array(part.normals) : null; }
  const original = parsed.parts[0].positions.slice();
  const group = createTrackVisual(track, parsed); const mesh = group.children[0];
  assert.equal(mesh.isInstancedMesh, true); assert.equal(mesh.count, track.path.count); assert.ok(mesh.geometry.attributes.position.count > 300);
  const matrix = new THREE.Matrix4();
  for (let i = 0; i < mesh.count; i++) { mesh.getMatrixAt(i, matrix); close(matrix.determinant(), 1, 1e-6); }
  assert.ok(mesh.boundingBox.max.x > .8); assert.ok(mesh.boundingBox.min.x < -.8);
  assert.deepEqual(parsed.parts[0].positions, original);
  mesh.dispose(); mesh.geometry.dispose(); mesh.material.dispose();
});

test('track endpoints survive native import/export, history and nonzero raw port indices', () => {
  const doc = trackFixture('c', [[-.8, 0], [0, .64], [.8, 0]]);
  const normalized = validateDocument(doc, definitions); const history = new History(normalized);
  const pair = toNativePairFromEditor(normalized, { componentDefinitions: definitions });
  const native = pair.data.vehicles.vehicles[0];
  assert.equal(native.belt_links.length, 3);
  assert.deepEqual(Object.keys(native.belt_links[0]).sort(), ['p0', 'p1']);
  assert.deepEqual(Object.keys(native.belt_links[0].p0), ['comp']);
  const imported = toEditorDocument(parseNativePair(pair.data, pair.meta));
  assert.equal(analyze(imported).tracks[0].path.count, analyze(doc).tracks[0].path.count);
  assert.deepEqual(toNativePairFromEditor(imported, { componentDefinitions: definitions }).data.vehicles.vehicles[0].belt_links, native.belt_links);
  const moved = structuredClone(normalized); moved.objects[2].position.x += .8; history.commit(moved);
  assert.notEqual(analyze(moved).tracks[0].path.count, analyze(doc).tracks[0].path.count);
  assert.deepEqual(history.peekUndo().topology.links, normalized.topology.links);
  // Original logic-node indices are used even with mixed network definitions.
  const custom = trackFixture(); const override = structuredClone(definitions.get('sprocket_c'));
  override.logic_nodes.unshift({ type: 'electric' }); custom.objects[0].definitionOverride = override; custom.topology.links[0].from.port = 1;
  assert.deepEqual(analyze(custom).issues, []);
  const saved = toNativePairFromEditor(custom, { componentDefinitions: definitions });
  assert.equal(saved.data.vehicles.vehicles[0].belt_links[0].p0.pos, 1);
  const back = toEditorDocument(parseNativePair(saved.data, saved.meta));
  assert.equal(back.topology.links[0].from.port, 1);
});
