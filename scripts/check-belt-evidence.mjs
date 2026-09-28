// Read-only verification against the researched local game build.
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import path from 'node:path';
import { BELT_RADII, BELT_HALF_WIDTH, BELT_HALF_THICKNESS, BELT_TANGENTS, BELT_UV_DENSITY } from '../src/editor/belt-profiles.js';

const [gamePath, romPath] = process.argv.slice(2);
if (!gamePath || !romPath) throw new Error('Usage: node scripts/check-belt-evidence.mjs <game.gcl> <Anymaker/rom>');
const evidence = JSON.parse(await readFile('doc/evidence/belts.json', 'utf8'));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const game = await readFile(gamePath);
assert.equal(game.length, evidence.source.bytes);
assert.equal(hash(game), evidence.source.sha256, 'Game version differs; do not reuse offsets');
for (const record of evidence.functions) {
  const start = Number(record.codeOffset); const size = Number(record.codeSize);
  assert.ok(Number.isSafeInteger(start) && start >= 8 && Number.isSafeInteger(size) && size > 0 && start + size <= game.length);
  assert.equal(game.readUInt32LE(start - 8), size, record.name + ' size header');
  assert.equal(hash(game.subarray(start, start + size)), record.codeSha256, record.name + ' code hash');
  const signature = Buffer.from(record.signature); const offset = Number(record.signatureOffset);
  assert.ok(game.subarray(offset, offset + signature.length).equals(signature), record.name + ' signature');
}
const values = { ...BELT_RADII, halfWidth: BELT_HALF_WIDTH, halfThickness: BELT_HALF_THICKNESS, tangents: BELT_TANGENTS, uvDensity: BELT_UV_DENSITY };
for (const constant of evidence.constants) {
  const offset = Number(constant.address);
  assert.equal(constant.format === 's32' ? game.readInt32LE(offset) : game.readDoubleLE(offset), constant.value, constant.name);
  if (Object.hasOwn(values, constant.name)) assert.equal(values[constant.name], constant.value, constant.name + ' implementation');
}
for (const entry of evidence.catalog) {
  const bytes = await readFile(entry.file); assert.equal(hash(bytes), entry.sha256, entry.file);
  const definition = JSON.parse(bytes); assert.equal(definition.logic_nodes[0].type, 'belt');
  assert.ok(Object.hasOwn(BELT_RADII, definition.class));
}
const texture = evidence.texture;
const original = await readFile(path.join(romPath, texture.source)); const png = await readFile(path.join('public', texture.url));
assert.equal(original.length, texture.sourceBytes); assert.equal(hash(original), texture.sourceSha256);
assert.equal(original.toString('ascii', 0, 4), 'TXTR'); assert.equal(original.readUInt32LE(4), 2); assert.equal(original.readUInt32LE(8), 2);
assert.equal(original.readUInt16LE(12), texture.width); assert.equal(original.readUInt16LE(14), texture.height);
assert.equal(original.readUInt32LE(16), texture.sourceMipLevels);
assert.equal(hash(original.subarray(24, 24 + texture.width * texture.height * 4)), texture.rgbaSha256);
assert.equal(png.length, texture.outputBytes); assert.equal(hash(png), texture.outputSha256);
const metadata = JSON.parse(await readFile('public/assets/textures/belt.json', 'utf8'));
for (const key of Object.keys(metadata)) assert.deepEqual(metadata[key], texture[key], key);
assert.equal(hash(await readFile(evidence.sample.file)), evidence.sample.sha256);
console.log('Verified ' + evidence.functions.length + ' function records, ' + evidence.constants.length + ' constants, 4 wheel definitions, original/published belt texture and six-wheel sample fingerprints.');
console.log('Game loading and identical-camera visual comparison are not claimed.');
