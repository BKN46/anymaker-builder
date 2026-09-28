// Read-only verification of the researched game binary, catalog and track Meshes.
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import path from 'node:path';
import { trackProfile } from '../src/editor/track-profiles.js';

const [gamePath, romPath] = process.argv.slice(2);
if (!gamePath || !romPath) throw new Error('Usage: node scripts/check-track-evidence.mjs <game.gcl> <Anymaker/rom>');
const evidence = JSON.parse(await readFile('doc/evidence/tracks.json', 'utf8'));
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
for (const constant of evidence.constants) {
  const offset = Number(constant.address);
  assert.equal(constant.format === 's32' ? game.readInt32LE(offset) : game.readDoubleLE(offset), constant.value, constant.name);
}
const manifest = JSON.parse(await readFile('public/assets/manifests/mesh-manifest.json', 'utf8'));
for (const mesh of evidence.meshes) {
  assert.equal(hash(await readFile(path.join(romPath, mesh.source))), mesh.sourceSha256, mesh.source);
  assert.equal(hash(await readFile(path.join('public', mesh.url))), mesh.outputSha256, mesh.url);
  for (const key of ['url', 'sourceSha256', 'outputSha256', 'vertices', 'triangles']) assert.equal(manifest.entries[mesh.source][key], mesh[key], mesh.source + ' ' + key);
}
for (const entry of evidence.catalog) {
  const bytes = await readFile(entry.file); assert.equal(hash(bytes), entry.sha256, entry.file);
  const definition = JSON.parse(bytes); const profile = trackProfile(definition);
  assert.equal(definition.class, entry.class); assert.equal(profile.nodeType, entry.nodeType);
  assert.equal(definition.logic_nodes[entry.port].type, entry.nodeType); assert.deepEqual(profile.center, entry.wheelCenter);
  const radius = evidence.constants.find(constant => constant.name === 'radius-' + entry.class.replace(/^(sprocket|roller_wheel_fixed|roller_wheel_suspension)_/, '').replaceAll('_', '-'));
  assert.equal(profile.radius, radius.value, entry.file + ' radius');
}
console.log('Verified ' + evidence.functions.length + ' function records, ' + evidence.constants.length + ' constants, 3 original/published track Mesh hashes and 18 wheel definitions.');
console.log('No game-saved track vehicle or in-game loading acceptance is claimed.');
