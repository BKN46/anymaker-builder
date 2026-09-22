import test from 'node:test';
import assert from 'node:assert/strict';
import { meshFixture } from './fixtures.js';
import { parseMesh } from '../src/assets/mesh.js';
import { History, project, validateDocument, toIntermediateXml } from '../src/editor/document.js';

for (const layout of [16, 28, 36]) test('mesh layout ' + layout + ' / submeshes / unaligned Buffer', () => {
  const fixture = meshFixture({ layout, parts: 2 });
  const wrapped = Buffer.concat([Buffer.alloc(3), fixture]).subarray(3);
  const parsed = parseMesh(wrapped);
  assert.equal(parsed.parts.length, 2);
  assert.deepEqual([...parsed.parts[0].positions], [0, 0, 0, 1, 0, 0, 0, 1, 0]);
  assert.deepEqual([...parsed.parts[0].indices], [0, 1, 2]);
  assert.equal(Boolean(parsed.parts[0].normals), layout > 16);
  assert.equal(Boolean(parsed.parts[0].uv), layout === 36);
});
test('mesh rejects bad magic, version, layout, NaN, index and trailer', () => {
  for (const mutate of [
    b => b.write('nope', 0), b => b.writeUInt32LE(99, 4),
    b => b.writeUInt32LE(99, 25),
    b => b.writeFloatLE(NaN, 25 + 140),
    b => b.writeUInt32LE(999, b.length - 12),
    b => b.writeUInt32LE(1, b.length - 4),
  ]) { const b = meshFixture(); mutate(b); assert.throws(() => parseMesh(b)); }
});
test('every truncated fixture is rejected', () => {
  const b = meshFixture();
  for (let length = 0; length < b.length; length++) assert.throws(() => parseMesh(b.subarray(0, length)));
});
const object = { id: '1', type: 'engine', position: { x: 1, y: 2, z: 3 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } };
const definitions = new Map([['engine', {}]]);
test('project validation, finite domain and unique IDs', () => {
  assert.deepEqual(validateDocument(project([object]), definitions).objects, [object]);
  assert.throws(() => validateDocument(project([object, object]), definitions));
  for (const value of [NaN, Infinity, '1', null]) {
    const invalid = structuredClone(object); invalid.position.x = value;
    assert.throws(() => validateDocument(project([invalid]), definitions));
  }
  const invalid = structuredClone(object); invalid.scale.z = -1;
  assert.throws(() => validateDocument(project([invalid]), definitions));
  assert.throws(() => validateDocument(project([{ ...object, type: 'unknown' }]), definitions));
});
test('history undo / redo and branching are snapshots, not aliases', () => {
  const h = new History([]); const values = [structuredClone(object)]; h.commit(values); values[0].position.x = 7;
  assert.equal(h.entries[1][0].position.x, 1);
  assert.deepEqual(h.peekUndo(), []); h.cursor--;
  assert.deepEqual(h.peekRedo(), [object]);
  h.commit([{ ...object, id: '2' }]); assert.equal(h.peekRedo(), null);
});
test('XML declares its intermediate status and escapes identifiers', () => {
  const xml = toIntermediateXml(project([{ ...object, id: '<bad&' }]));
  assert.ok(xml.includes('game-compatible="false"'));
  assert.ok(xml.includes('&lt;bad&amp;'));
  assert.ok(!xml.includes('<bad'));
});
