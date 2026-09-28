// Read-only check of the exact GCL version used for mechanical mate research.
// Run from the repository root; this neither starts the game nor exports data.
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const path = process.argv[2];
if (!path) throw new Error('Usage: node scripts/check-mechanical-mate-evidence.mjs <game.gcl>');
const evidence = JSON.parse(await readFile('doc/evidence/mechanical-mates.json', 'utf8'));
const source = await readFile(path);
const hash = value => createHash('sha256').update(value).digest('hex');
assert.equal(source.length, evidence.source.bytes, 'Game version differs: byte count');
assert.equal(hash(source), evidence.source.sha256, 'Game version differs: do not reuse these offsets');
for (const record of evidence.functions) {
  const start = Number(record.codeOffset); const length = Number(record.codeSize);
  assert.ok(Number.isSafeInteger(start) && Number.isSafeInteger(length) && start >= 8 && length > 0 && start + length <= source.length, record.name);
  assert.equal(source.readUInt32LE(start - 8), length, record.name + ' code-size header');
  assert.equal(hash(source.subarray(start, start + length)), record.codeSha256, record.name);
  const signature = Buffer.from(record.signature);
  const offset = Number(record.signatureOffset);
  assert.ok(source.subarray(offset, offset + signature.length).equals(signature), record.name + ' signature');
}
assert.equal(source.readInt32LE(Number(evidence.verifiedDefaults.tow_hitch_dir.address)), 3);
assert.equal(source.readDoubleLE(Number(evidence.verifiedDefaults.tow_hitch_dot_min.address)), 0);
console.log('Verified ' + evidence.functions.length + ' mechanical-mate function records and towing defaults; game loading remains unverified.');
