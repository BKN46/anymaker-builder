// Read-only verification of the GCL records used by structural island rules.
// Usage: node scripts/check-native-island-evidence.mjs <Anymaker/bin/game.gcl>
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const input = process.argv[2];
if (!input) throw new Error('Usage: node scripts/check-native-island-evidence.mjs <game.gcl>');
const evidence = JSON.parse(await readFile(new URL('../doc/evidence/native-islands.json', import.meta.url), 'utf8'));
const bytes = await readFile(input);
const sha256 = value => createHash('sha256').update(value).digest('hex');
assert.equal(bytes.length, evidence.source.bytes, 'GCL file size changed');
assert.equal(sha256(bytes), evidence.source.sha256, 'GCL version changed; re-analyze before using these offsets');

let cursor = 0;
const uint = () => {
  assert.ok(cursor >= 0 && cursor + 4 <= bytes.length, 'Truncated GCL record');
  const value = bytes.readUInt32LE(cursor); cursor += 4; return value;
};
const string = (minimum = 1) => {
  const size = uint();
  assert.ok(size >= minimum && size <= 4096 && cursor + size <= bytes.length, 'Invalid GCL string length');
  const value = bytes.toString('utf8', cursor, cursor + size).replace(/\0$/, '');
  cursor += size; return value;
};
for (const entry of evidence.functions) {
  cursor = Number(entry.signatureOffset) - 4;
  assert.equal(string(), entry.signature);
  assert.ok([1, 3].includes(uint()), 'Expected a function record');
  uint(); // Source line / record metadata.
  assert.equal(uint(), entry.references.length);
  for (const reference of entry.references) {
    assert.ok([1, 3, 4, 5, 6].includes(uint()), 'Unsupported GCL reference kind');
    assert.equal(string(0), reference.name); // Constant relocations can have empty names.
  }
  const size = uint(); const allocation = uint();
  assert.equal(size, Number(entry.codeSize));
  assert.equal(allocation, Number(entry.allocationSize));
  assert.equal(cursor, Number(entry.codeOffset));
  assert.equal(sha256(bytes.subarray(cursor, cursor + size)), entry.codeSha256);
  entry.references.forEach((reference, index) => assert.equal(Number(reference.address), cursor + size + index * 8));
  // Check the owner after code/relocations too: the last reference name
  // alone does not establish which function owns the machine code.
  const ownerOffset = bytes.indexOf(Buffer.from(entry.name), cursor + allocation);
  assert.ok(ownerOffset >= cursor + allocation && ownerOffset < cursor + allocation + 256, 'Missing function owner: ' + entry.name);
  assert.equal(bytes.readUInt32LE(ownerOffset - 4), Buffer.byteLength(entry.name));
  console.log(entry.codeOffset + ': ' + entry.name);
}
for (const instruction of evidence.instructions) {
  const offset = Number(instruction.address);
  const expected = Buffer.from(instruction.hex, 'hex');
  assert.deepEqual(bytes.subarray(offset, offset + expected.length), expected, instruction.meaning);
}
const split = evidence.functions.find(entry => entry.name === evidence.incident.function);
assert.equal(Number(split.codeOffset) + Number(evidence.incident.functionOffset), Number(evidence.incident.instructionAddress));
assert.equal(evidence.instructions.find(item => item.address === evidence.incident.instructionAddress).hex, '488b00');
console.log('Verified ' + evidence.functions.length + ' GCL records and ' + evidence.instructions.length + ' island-split instructions. Static evidence only; no game process was run.');
