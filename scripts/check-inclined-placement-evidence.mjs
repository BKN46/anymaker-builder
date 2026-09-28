// Read-only checks for the researched game version and repository dashboard.
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { consistentNativeGrid } from '../src/native/grid-frame.js';
import { parseNativePair, toNativePairFromEditor } from '../src/native/anymaker-data.js';
import { toEditorDocument } from '../src/editor/model.js';

const [gamePath] = process.argv.slice(2);
if (!gamePath) throw new Error('Usage: node scripts/check-inclined-placement-evidence.mjs <game.gcl>');
const evidence = JSON.parse(await readFile('doc/evidence/inclined-placement.json', 'utf8'));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const game = await readFile(gamePath);
assert.equal(game.length, evidence.source.bytes, 'Game byte count differs');
assert.equal(hash(game), evidence.source.sha256, 'Game version differs: do not reuse these offsets');
for (const record of evidence.functions) {
  const start = Number(record.codeOffset); const size = Number(record.codeSize);
  assert.ok(Number.isSafeInteger(start) && start >= 8 && Number.isSafeInteger(size) && size > 0 && start + size <= game.length, record.name);
  assert.equal(game.readUInt32LE(start - 8), size, record.name + ' code-size header');
  assert.equal(hash(game.subarray(start, start + size)), record.codeSha256, record.name + ' code hash');
  const signature = Buffer.from(record.signature); const offset = Number(record.signatureOffset);
  assert.ok(game.subarray(offset, offset + signature.length).equals(signature), record.name + ' signature');
}
for (const constant of evidence.constants) assert.equal(game.readInt32LE(Number(constant.address)), constant.value, constant.name);

const bytes = await readFile(evidence.sample.file);
assert.equal(bytes.length, evidence.sample.bytes);
assert.equal(hash(bytes), evidence.sample.sha256, 'Dashboard sample differs');
const data = JSON.parse(bytes);
const vehicle = data.vehicles.vehicles.find(value => value.id === evidence.sample.vehicleId);
const grid = vehicle.grids[evidence.sample.gridIndex];
assert.deepEqual(grid.origin, evidence.sample.origin);
assert.deepEqual(grid.dir, evidence.sample.dir);
assert.deepEqual(grid.components.map(component => ({
  id: component.id, type: data.definitions.components[component.def], pos: component.pos, rot: component.rot,
})), evidence.sample.components);
for (const panel of evidence.sample.plates) {
  const plate = vehicle.plates.find(value => value.id === panel.id);
  assert.deepEqual(plate.nodes, panel.nodes);
  assert.deepEqual(plate.nodes.map(id => vehicle.nodes.find(node => node.id === id).pos), panel.positions);
  for (const point of panel.positions) assert.deepEqual(consistentNativeGrid(point, grid.dir), { origin: grid.origin, dir: grid.dir });
}
// Isolate the five gauges: unrelated unsupported vehicle features must not
// mask whether the inclined mounting frame itself survives native export.
const document = toEditorDocument(parseNativePair({ definitions: data.definitions, vehicles: { vehicles: [{ id: vehicle.id, grids: [grid] }] } }, {}));
const pair = toNativePairFromEditor(document);
const exported = pair.data.vehicles.vehicles[0].grids[1];
assert.deepEqual(exported.origin, grid.origin);
assert.deepEqual(exported.dir, grid.dir);
assert.equal(exported.components.length, grid.components.length);
exported.components.forEach((component, index) => {
  assert.deepEqual(component.pos, grid.components[index].pos);
  assert.deepEqual(component.rot.map(value => value || 0), grid.components[index].rot);
});
const restored = toEditorDocument(parseNativePair(pair.data, pair.meta));
restored.objects.forEach((object, index) => {
  for (const axis of ['x', 'y', 'z']) assert.ok(Math.abs(object.position[axis] - document.objects[index].position[axis]) < 1e-8);
});
assert.equal(hash(await readFile(evidence.sample.file)), evidence.sample.sha256, 'Source sample changed');
console.log('Verified 9 function records, 2 rotation constants, 3 dashboard panels and all 5 gauge mounting grids, local positions and rotations.');
console.log('Game loading, collision acceptance and visual parity remain unverified.');
