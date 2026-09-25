// Read-only verification of the selected GCL records used for native grids.
// Usage: node scripts/check-native-grid-evidence.mjs <Anymaker/bin/game.gcl>
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const input = process.argv[2];
if (!input) throw new Error('Usage: node scripts/check-native-grid-evidence.mjs <game.gcl>');
const evidence = JSON.parse(await readFile(new URL('../doc/evidence/native-grid-transform.json', import.meta.url), 'utf8'));
const bytes = await readFile(input);
const sha256 = value => createHash('sha256').update(value).digest('hex');
assert.equal(bytes.length, evidence.source.bytes, 'GCL file size changed');
assert.equal(sha256(bytes), evidence.source.sha256, 'GCL version changed; re-analyze before using these offsets');

let cursor = 0;
const uint = () => { const value = bytes.readUInt32LE(cursor); cursor += 4; return value; };
const string = () => {
  const size = uint();
  assert.ok(size > 0 && size <= 4096 && cursor + size <= bytes.length, 'Invalid GCL string length');
  const value = bytes.toString('utf8', cursor, cursor + size).replace(/\0$/, '');
  cursor += size;
  return value;
};
for (const entry of evidence.functions) {
  cursor = Number(entry.signatureOffset) - 4;
  assert.equal(string(), entry.signature);
  assert.ok([1, 3].includes(uint()), 'Expected a function record, not a relocation signature');
  uint(); // Source line / record metadata.
  assert.equal(uint(), entry.references.length);
  for (const reference of entry.references) {
    assert.ok([3, 4].includes(uint()), 'Unsupported GCL reference kind');
    assert.equal(string(), reference.name);
  }
  const size = uint();
  const allocation = uint();
  assert.equal(size, Number(entry.codeSize));
  assert.equal(allocation, Number(entry.allocationSize));
  assert.equal(cursor, Number(entry.codeOffset));
  assert.equal(sha256(bytes.subarray(cursor, cursor + size)), entry.codeSha256);
  entry.references.forEach((reference, index) => assert.equal(Number(reference.address), cursor + size + index * 8));
  // The owner is repeated in the debug metadata after code, relocations and
  // unwind data. The final relocation's name alone does not identify a body.
  const owner = /^\([^)]*\) (.+) \(/.exec(entry.signature)[1];
  const ownerOffset = bytes.indexOf(Buffer.from(owner), cursor + allocation);
  assert.ok(ownerOffset >= cursor + allocation && ownerOffset < cursor + allocation + 256, `Missing function owner: ${owner}`);
  assert.equal(bytes.readUInt32LE(ownerOffset - 4), Buffer.byteLength(owner));
  console.log(`${entry.codeOffset}: ${owner}`);
}
for (const constant of evidence.constants) {
  const address = Number(constant.address);
  const value = constant.type === 's32' ? bytes.readInt32LE(address) : bytes.readDoubleLE(address);
  assert.equal(value, constant.value, constant.meaning);
}
const reference = await readFile(new URL('../' + evidence.referenceInput.path, import.meta.url));
assert.equal(sha256(reference), evidence.referenceInput.sha256);
console.log(`Verified ${evidence.functions.length} GCL records, ${evidence.constants.length} constants and the reference vehicle hash. Static evidence only; no game process was run.`);
