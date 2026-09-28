// Read-only verification of the game version and optional Workshop sample.
// Run from the repository root; no game process or resource conversion runs.
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import assert from 'node:assert/strict';
import { parseNativePair, toNativePairFromEditor } from '../src/native/anymaker-data.js';
import { toEditorDocument } from '../src/editor/model.js';

const [gamePath, samplePath] = process.argv.slice(2);
if (!gamePath) throw new Error('Usage: node scripts/check-hydraulic-evidence.mjs <game.gcl> [vehicle.data]');
const evidence = JSON.parse(await readFile('doc/evidence/hydraulic-connections.json', 'utf8'));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const source = await readFile(gamePath);
assert.equal(source.length, evidence.source.bytes, 'Game version differs: byte count');
assert.equal(hash(source), evidence.source.sha256, 'Game version differs: do not reuse these offsets');
for (const record of evidence.functions) {
  const start = Number(record.codeOffset); const length = Number(record.codeSize);
  assert.ok(Number.isSafeInteger(start) && Number.isSafeInteger(length) && start >= 8 && length > 0 && start + length <= source.length, record.name);
  assert.equal(source.readUInt32LE(start - 8), length, record.name + ' code-size header');
  assert.equal(hash(source.subarray(start, start + length)), record.codeSha256, record.name);
  const signature = Buffer.from(record.signature); const offset = Number(record.signatureOffset);
  assert.ok(source.subarray(offset, offset + signature.length).equals(signature), record.name + ' signature');
}
for (const constant of evidence.constants) {
  const address = Number(constant.address);
  const value = constant.type === 's32' ? source.readInt32LE(address) : source.readDoubleLE(address);
  assert.equal(value, constant.value, constant.name);
}
for (const record of evidence.definitions) {
  const bytes = await readFile('public/data/definitions/' + record.id + '.json');
  assert.equal(hash(bytes), record.sha256, record.id + ' definition differs');
}
console.log('Verified ' + evidence.functions.length + ' hydraulic function records, constants and published definitions.');

if (samplePath) {
  const metaPath = join(dirname(samplePath), 'vehicle.meta');
  const dataBytes = await readFile(samplePath); const metaBytes = await readFile(metaPath);
  for (const [index, bytes] of [dataBytes, metaBytes].entries()) {
    assert.equal(bytes.length, evidence.sample.files[index].bytes);
    assert.equal(hash(bytes), evidence.sample.files[index].sha256, 'Workshop sample differs');
  }
  const data = JSON.parse(dataBytes); const meta = JSON.parse(metaBytes);
  const document = toEditorDocument(parseNativePair(data, meta));
  const definitions = new Map(await Promise.all([...new Set(document.objects.map(object => object.type))].map(async type => [type, JSON.parse(await readFile('public/data/definitions/' + type + '.json', 'utf8'))])));
  const pair = toNativePairFromEditor(document, { componentDefinitions: definitions });
  const restored = toEditorDocument(parseNativePair(pair.data, pair.meta));
  assert.equal(document.objects.length, evidence.sample.components);
  assert.deepEqual(restored.objects.map(object => object.type), document.objects.map(object => object.type));
  for (const key of ['nodes', 'edges', 'plates']) {
    assert.equal(document.topology[key].length, evidence.sample[key]);
    assert.equal(restored.topology[key].length, document.topology[key].length);
  }
  for (const [kind, count] of Object.entries(evidence.sample.links)) {
    assert.equal(document.topology.links.filter(link => link.kind === kind).length, count, kind + ' source count');
    assert.equal(restored.topology.links.filter(link => link.kind === kind).length, count, kind + ' round-trip count');
  }
  const original = document.topology.links.filter(link => link.kind === 'liquid');
  const roundTrip = restored.topology.links.filter(link => link.kind === 'liquid');
  const endpoint = (doc, value) => [doc.objects.findIndex(object => object.id === value.componentId), value.port ?? 0];
  original.forEach((link, index) => {
    const other = roundTrip[index];
    for (const side of ['from', 'to']) assert.deepEqual(endpoint(restored, other[side]), endpoint(document, link[side]), 'Liquid endpoint index');
    assert.equal(other.points.length, link.points.length, 'Liquid route point count');
    link.points.forEach((point, i) => {
      for (const axis of ['x', 'y', 'z']) assert.ok(Math.abs(point[axis] - other.points[i][axis]) < 1e-9, 'Liquid route position');
    });
  });
  const wheels = document.objects.filter(object => definitions.get(object.type)?.class === 'wheel_hydraulic');
  assert.equal(wheels.length, evidence.sample.hydraulicWheels);
  const wheelIds = new Set(wheels.map(object => object.id));
  assert.equal(original.filter(link => [link.from, link.to].some(value => wheelIds.has(value.componentId))).length, evidence.sample.steeringLinks.length);
  for (const object of wheels) {
    const other = restored.objects[document.objects.indexOf(object)];
    assert.deepEqual(other.nativeProperties.hydraulic_cylinder, object.nativeProperties.hydraulic_cylinder, 'Wheel oil state');
  }
  assert.equal(hash(await readFile(samplePath)), hash(dataBytes), 'Source data changed');
  assert.equal(hash(await readFile(metaPath)), hash(metaBytes), 'Source meta changed');
  console.log('Verified 105 components, 22 liquid routes including 4 steering links, all network counts and wheel oil state; source files unchanged.');
}
console.log('Actual game loading, hydraulic simulation and visual parity remain unverified.');
