// Read-only version, function-owner and relocation checks for the plate review.
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const [gamePath, evidencePath = 'doc/evidence/plates.json'] = process.argv.slice(2);
if (!gamePath) throw new Error('Usage: node scripts/check-plate-evidence.mjs <game.gcl> [evidence.json]');
const evidence = JSON.parse(await readFile(evidencePath, 'utf8'));
const game = await readFile(gamePath);
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
assert.equal(game.length, evidence.source.bytes, 'Game byte count differs');
assert.equal(hash(game), evidence.source.sha256, 'Game version differs: do not reuse these offsets');
for (const record of evidence.functions) {
  const signatureOffset = Number(record.signatureOffset);
  const signatureSize = game.readUInt32LE(signatureOffset - 4);
  const decode = (start, size) => game.subarray(start, start + size).toString('utf8').replace(/\0+$/, '');
  assert.equal(decode(signatureOffset, signatureSize), record.signature, record.name + ' signature');
  let cursor = signatureOffset + signatureSize;
  assert.ok([1, 3, 7].includes(game.readUInt32LE(cursor)), record.name + ' record type');
  const count = game.readUInt32LE(cursor + 8);
  assert.equal(count, record.references.length, record.name + ' relocation count');
  cursor += 12;
  for (const reference of record.references) {
    assert.ok([1, 3, 4, 5, 6].includes(game.readUInt32LE(cursor)), record.name + ' relocation kind');
    const size = game.readUInt32LE(cursor + 4);
    assert.ok(size <= 4096 && cursor + 8 + size <= game.length, record.name + ' relocation bounds');
    assert.equal(decode(cursor + 8, size), reference, record.name + ' relocation');
    cursor += 8 + size;
  }
  const start = Number(record.codeOffset); const size = Number(record.codeSize); const allocation = Number(record.allocationSize);
  assert.equal(cursor + 8, start, record.name + ' code start');
  assert.equal(game.readUInt32LE(cursor), size, record.name + ' code size');
  assert.equal(game.readUInt32LE(cursor + 4), allocation, record.name + ' allocation size');
  assert.ok(allocation >= size && start + allocation <= game.length, record.name + ' code bounds');
  assert.equal(hash(game.subarray(start, start + size)), record.codeSha256, record.name + ' code hash');
  const owner = game.indexOf(Buffer.from(record.name), start + allocation);
  assert.ok(owner >= start + allocation && owner < start + allocation + 256, record.name + ' owner location');
  assert.equal(game.readUInt32LE(owner - 4), Buffer.byteLength(record.name), record.name + ' owner length');
}
console.log('Verified ' + evidence.functions.length + ' plate function records, owners, code hashes and relocation lists.');
for (const shader of evidence.embeddedShaders ?? []) {
  const offset = Number(shader.hexOffset);
  const length = shader.bytes * 2;
  assert.ok(Number.isSafeInteger(offset) && offset >= 0, shader.name + ' offset');
  assert.ok(Number.isSafeInteger(length) && length > 0 && offset + length < game.length, shader.name + ' bounds');
  const hex = game.subarray(offset, offset + length).toString('ascii');
  assert.match(hex, /^[0-9a-fA-F]+$/, shader.name + ' hex encoding');
  assert.equal(game[offset + length], 0, shader.name + ' string terminator');
  const bytecode = Buffer.from(hex, 'hex');
  assert.equal(bytecode.subarray(0, 4).toString('ascii'), 'DXBC', shader.name + ' magic');
  assert.equal(bytecode.readUInt32LE(24), shader.bytes, shader.name + ' DXBC size');
  assert.equal(hash(bytecode), shader.sha256, shader.name + ' bytecode hash');
}
if (evidence.embeddedShaders?.length) {
  console.log('Verified ' + evidence.embeddedShaders.length + ' embedded DXBC shader byte ranges and hashes.');
}
for (const fact of evidence.byteFacts ?? []) {
  const offset = Number(fact.offset);
  assert.match(fact.hex, /^(?:[0-9a-fA-F]{2})+$/, fact.name + ' byte encoding');
  const expected = Buffer.from(fact.hex, 'hex');
  assert.ok(Number.isSafeInteger(offset) && offset >= 0 && offset + expected.length <= game.length, fact.name + ' bounds');
  assert.deepEqual(game.subarray(offset, offset + expected.length), expected, fact.name + ' bytes');
}
if (evidence.byteFacts?.length) console.log('Verified ' + evidence.byteFacts.length + ' render-state metadata and literal byte records.');
console.log('Runtime construction rules and same-camera visual parity remain unverified.');
