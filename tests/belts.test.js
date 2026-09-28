import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { inflateSync } from 'node:zlib';
import * as THREE from 'three';
import { beltFixture, sampleBeltData } from './belt-fixtures.js';
import { BELT_RADII, beltEndpoint } from '../src/editor/belt-profiles.js';
import { analyzeBelts, prepareBeltLink } from '../src/editor/belt-path.js';
import { createBeltVisual } from '../src/editor/belt-view.js';
import { componentPropertyDescriptors, updateNativeProperty } from '../src/editor/component-properties.js';
import { parseNativePair, toNativePairFromEditor } from '../src/native/anymaker-data.js';
import { toEditorDocument } from '../src/editor/model.js';
import { History, validateDocument } from '../src/editor/document.js';

const definitions = new Map(Object.keys(BELT_RADII).map(type => [type, JSON.parse(readFileSync('public/data/definitions/' + type + '.json'))]));
definitions.set('sprocket_a', JSON.parse(readFileSync('public/data/definitions/sprocket_a.json')));
const components = doc => new Map(doc.objects.map(object => [object.id, object]));
const analyze = (doc, options) => analyzeBelts(doc.topology.links, components(doc), definitions, options);
const close = (a, b, tolerance = 1e-7) => assert.ok(Math.abs(a - b) < tolerance, `${a} differs from ${b}`);
const source = JSON.parse(readFileSync('test-vehicle/vehicle.data'));
const meta = JSON.parse(readFileSync('test-vehicle/vehicle.meta'));
const nativeSample = () => toEditorDocument(parseNativePair(sampleBeltData(source), meta));

test('all four ordinary belt wheels use native radii, raw port indices and reverse properties', () => {
  const expected = { pulley_wheel: .04, engine_wheel: .1, engine_wheel_b: .155, engine_wheel_c: .267 };
  for (const [type, radius] of Object.entries(expected)) {
    const doc = beltFixture([type]); const result = analyze(doc);
    assert.deepEqual(result.issues, []); assert.equal(result.belts.length, 1);
    assert.equal(result.belts[0].path.nodes[0].radius, radius);
    assert.deepEqual(result.belts[0].path.nodes[0].center, [-.48, 0, 0]);
    const descriptor = componentPropertyDescriptors(type).find(value => value.key === 'reverse');
    assert.equal(descriptor.type, 'boolean'); assert.equal(descriptor.defaultValue, false);
    assert.deepEqual(updateNativeProperty({}, descriptor, true), { reverse: true });
  }
  const custom = beltFixture(); const override = structuredClone(definitions.get('pulley_wheel'));
  override.logic_nodes.unshift({ type: 'electric' }); custom.objects[0].definitionOverride = override;
  custom.topology.links[0].from.port = 1;
  assert.deepEqual(analyze(custom).issues, []);
  assert.equal(beltEndpoint({ componentId: custom.objects[0].id, port: 0 }, components(custom), definitions).isBelt, false);
  assert.equal(beltEndpoint(custom.topology.links[0].from, components(custom), definitions).radius, .04);
  const pair = toNativePairFromEditor(custom, { componentDefinitions: definitions });
  assert.equal(pair.data.vehicles.vehicles[0].belt_links[0].p0.pos, 1);
  assert.equal(toEditorDocument(parseNativePair(pair.data, pair.meta)).topology.links[0].from.port, 1);
});

test('two-wheel ordinary belts close a single link and support unequal radii and reverse', () => {
  const doc = beltFixture(['pulley_wheel']); const before = structuredClone(doc);
  const { path } = analyze(doc).belts[0];
  assert.equal(path.samples.length, 34);
  close(path.length, 1.92 + 32 * 2 * .04 * Math.sin(Math.PI / 32));
  close(path.textureLength - path.length, 4 * .04 * Math.sin(Math.PI / 32));
  assert.deepEqual(doc, before);
  doc.objects[1].type = 'engine_wheel_c';
  const unequal = analyze(doc); assert.deepEqual(unequal.issues, []);
  assert.deepEqual(unequal.belts[0].path.nodes.map(value => value.radius), [.04, .267]);
  doc.objects[1].nativeProperties = { reverse: true };
  const crossed = analyze(doc); assert.deepEqual(crossed.issues, []);
  assert.notEqual(crossed.belts[0].path.length, unequal.belts[0].path.length);
  assert.ok(crossed.belts[0].path.nodes.some(value => value.reverse));
});

test('real native six-wheel belt preserves concave reverse idler and discrete tangent angles', () => {
  const doc = nativeSample(); const before = structuredClone(doc);
  const result = analyze(doc); assert.deepEqual(result.issues, []); assert.equal(result.belts.length, 1);
  const { path } = result.belts[0];
  assert.equal(path.samples.length, 60); close(path.length, 1.8470701731304804);
  const expected = new Map([[27, [0, 8, false]], [30, [8, 15, false]], [14, [15, 18, false]], [29, [18, 30, false]], [31, [14, 3, true]], [28, [19, 0, false]]]);
  for (const node of path.nodes) assert.deepEqual([node.enter, node.leave, node.reverse], expected.get(Number(node.component.id.split(':').at(-1))));
  assert.deepEqual(doc, before);
  const reordered = structuredClone(doc); reordered.topology.links.reverse();
  for (const link of reordered.topology.links) [link.from, link.to] = [link.to, link.from];
  close(analyze(reordered).belts[0].path.length, path.length);
  const pair = toNativePairFromEditor(doc, { componentDefinitions: definitions });
  // Export allocates fresh component IDs. Compare every edge after that mapping.
  const ids = new Map(doc.objects.map((object, i) => [Number(object.id.split(':').at(-1)), i + 1]));
  const expectedLinks = sampleBeltData(source).vehicles.vehicles[0].belt_links.map(link => ({ p0: { comp: ids.get(link.p0.comp) }, p1: { comp: ids.get(link.p1.comp) }, points: [] }));
  assert.deepEqual(pair.data.vehicles.vehicles[0].belt_links, expectedLinks);
  const restored = toEditorDocument(parseNativePair(pair.data, pair.meta));
  assert.equal(analyze(restored).belts[0].path.samples.length, 60);
});

test('ordinary belts follow rigid rotations, native X reflection and local mirrors', () => {
  for (const mirror of [false, true]) {
    const doc = beltFixture();
    if (mirror) doc.objects.forEach(object => { object.localMirrorAxes = ['x']; });
    const before = analyze(doc).belts[0].path;
    const rotation = new THREE.Euler(.31, -.6, .45); const quaternion = new THREE.Quaternion().setFromEuler(rotation);
    doc.objects.forEach(object => {
      const point = new THREE.Vector3(...Object.values(object.position)).applyQuaternion(quaternion);
      object.position = { x: point.x, y: point.y, z: point.z }; object.rotation = { x: rotation.x, y: rotation.y, z: rotation.z };
    });
    const after = analyze(doc); assert.deepEqual(after.issues, []); close(after.belts[0].path.length, before.length);
    before.samples.forEach((sample, i) => {
      const expected = new THREE.Vector3(...sample.position).applyQuaternion(quaternion).toArray();
      after.belts[0].path.samples[i].position.forEach((value, j) => close(value, expected[j]));
    });
  }
});

test('ordinary belt validation diagnoses incompatible ports, planes, scaling and invalid networks', () => {
  const cases = [
    ['ports', doc => { doc.objects[1].type = 'sprocket_a'; }],
    ['plane', doc => { doc.objects[1].position.z = .08; }],
    ['plane', doc => { doc.objects[1].rotation.y = .2; }],
    ['scale', doc => { doc.objects[1].scale.x = 2; }],
    ['geometry', doc => { doc.objects[1].position = { ...doc.objects[0].position }; }],
  ];
  for (const [code, edit] of cases) {
    const doc = beltFixture(); edit(doc); const before = structuredClone(doc);
    assert.equal(analyze(doc).issues[0].code, code); assert.deepEqual(doc, before);
    assert.throws(() => prepareBeltLink(doc.topology.links[0], [], components(doc), definitions), error => error.beltCode === code);
  }
  const open = beltFixture(['pulley_wheel'], [[-.48, 0], [0, .64], [.48, 0]]); open.topology.links.pop();
  assert.equal(analyze(open).issues[0].code, 'open');
  const branch = beltFixture(['pulley_wheel'], [[-.48, 0], [0, .64], [.48, 0]]);
  assert.throws(() => prepareBeltLink(branch.topology.links[0], branch.topology.links, components(branch), definitions), error => error.beltCode === 'branch');
  branch.topology.links.push({ ...branch.topology.links[0], id: 'extra' });
  assert.equal(analyze(branch).issues[0].code, 'branch');
  assert.equal(analyze(beltFixture(), { maxSections: 10 }).issues[0].code, 'limit');
  assert.deepEqual(analyze(beltFixture(['sprocket_a'])), { belts: [], issues: [] });
});

test('ordinary belt meshes use closed 56mm by 12mm sections, outward winding and native UVs', () => {
  for (const doc of [beltFixture(), nativeSample()]) {
    const belt = analyze(doc).belts[0]; const texture = new THREE.Texture();
    const group = createBeltVisual(belt, texture); const mesh = group.children[0];
    const { position, normal, uv } = mesh.geometry.attributes; const indices = mesh.geometry.index.array; const count = belt.path.samples.length;
    assert.equal(position.count, (count + 1) * 8); assert.equal(indices.length, count * 24); assert.equal(mesh.material.map, texture);
    for (const attribute of [position, normal, uv]) assert.ok([...attribute.array].every(Number.isFinite));
    const at = (attribute, i) => new THREE.Vector3().fromBufferAttribute(attribute, i);
    for (let i = 0; i < count; i++) {
      // World-space positions use Float32; the sample is 20 metres from zero.
      close(at(position, i * 8).distanceTo(at(position, i * 8 + 1)), .056, 3e-6);
      close(at(position, i * 8 + 4).distanceTo(at(position, i * 8 + 5)), .012, 3e-6);
    }
    for (let i = 0; i < 8; i++) close(at(position, i).distanceTo(at(position, count * 8 + i)), 0);
    for (let i = 0; i < indices.length; i += 3) {
      const [a, b, c] = indices.slice(i, i + 3);
      assert.ok(at(position, b).sub(at(position, a)).cross(at(position, c).sub(at(position, a))).dot(at(normal, a)) > -1e-9);
    }
    const repeats = Math.floor(belt.path.textureLength * 16);
    assert.equal(uv.getX(0), 0); assert.equal(uv.getX(uv.count - 1), repeats);
    for (let i = 0; i < uv.count; i++) assert.equal(uv.getY(i), 0);
    assert.ok(mesh.geometry.boundingSphere.radius > 0); mesh.geometry.dispose(); mesh.material.dispose(); texture.dispose();
  }
});

test('ordinary belt edits are derived from saved links and survive history and native round trips', () => {
  const doc = validateDocument(beltFixture(), definitions); const history = new History(doc);
  const before = analyze(doc).belts[0].path.length; const moved = structuredClone(doc); moved.objects[1].position.x += .32;
  history.commit(moved); assert.ok(analyze(moved).belts[0].path.length > before);
  close(analyze(history.peekUndo()).belts[0].path.length, before);
  moved.objects[1].hidden = true; assert.equal(analyze(moved).belts[0].hidden, true);
  const pair = toNativePairFromEditor(doc, { componentDefinitions: definitions });
  const imported = toEditorDocument(parseNativePair(pair.data, pair.meta)); close(analyze(imported).belts[0].path.length, before);
  assert.deepEqual(toNativePairFromEditor(imported, { componentDefinitions: definitions }).data.vehicles.vehicles[0].belt_links, pair.data.vehicles.vehicles[0].belt_links);
});

test('published belt PNG preserves the original RGBA pixels and recorded asset fingerprint', () => {
  const png = readFileSync('public/assets/textures/belt.png'); const metadata = JSON.parse(readFileSync('public/assets/textures/belt.json'));
  const evidence = JSON.parse(readFileSync('doc/evidence/belts.json')); const hash = bytes => createHash('sha256').update(bytes).digest('hex');
  assert.equal(hash(png), metadata.outputSha256); assert.equal(png.length, metadata.outputBytes);
  assert.equal(png.readUInt32BE(16), 32); assert.equal(png.readUInt32BE(20), 32);
  const payload = []; let offset = 8;
  while (offset < png.length) { const length = png.readUInt32BE(offset); if (png.toString('ascii', offset + 4, offset + 8) === 'IDAT') payload.push(png.subarray(offset + 8, offset + 8 + length)); offset += length + 12; }
  const raw = inflateSync(Buffer.concat(payload)); const pixels = Buffer.alloc(4096);
  for (let row = 0; row < 32; row++) { assert.equal(raw[row * 129], 0); raw.copy(pixels, row * 128, row * 129 + 1, (row + 1) * 129); }
  assert.equal(hash(pixels), evidence.texture.rgbaSha256);
});
