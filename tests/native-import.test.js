import test from 'node:test';
import assert from 'node:assert/strict';
import { parseNativePair, toNativePair, toNativePairFromEditor } from '../src/native/anymaker-data.js';
import { prepareNativeImport } from '../src/native/import-document.js';
import { toEditorDocument } from '../src/editor/model.js';
import { History, validateDocument } from '../src/editor/document.js';
import { nonplanarNativeFixture } from './native-import-fixtures.js';

test('native import removes only noncoplanar plates and retains shared nodes, beams and the raw save', () => {
  const data = nonplanarNativeFixture(); const model = parseNativePair(data, {});
  const original = JSON.stringify(model); const unfiltered = toEditorDocument(model);
  const result = prepareNativeImport(model, { vehicleIds: ['1'] }); const next = result.document;
  assert.deepEqual(result.removedPlateIds, ['grid-1-1:13']);
  assert.equal(next.topology.plates.length, 1); assert.equal(next.topology.plates[0].id, 'grid-1-1:14');
  assert.deepEqual(next.topology.plates[0], unfiltered.topology.plates[1]);
  assert.deepEqual(next.topology.nodes, unfiltered.topology.nodes);
  assert.deepEqual(next.topology.edges, unfiltered.topology.edges);
  assert.deepEqual(next.objects, unfiltered.objects);
  assert.equal(JSON.stringify(model), original); assert.deepEqual(toNativePair(model).data, data);
  const definitions = new Map(next.objects.map(object => [object.type, { id: object.type }]));
  const valid = validateDocument(next, definitions);
  const history = new History({ format: 'anymaker-web-project', version: 1, objects: [] }); history.commit(valid);
  assert.equal(history.peekUndo().objects.length, 0);
  const saved = JSON.parse(JSON.stringify(valid));
  assert.deepEqual(validateDocument(saved, definitions), saved);
  const exported = toNativePairFromEditor(valid);
  assert.equal(exported.data.vehicles.vehicles.reduce((sum, vehicle) => sum + vehicle.plates.length, 0), 1);
  assert.equal(prepareNativeImport(parseNativePair(exported.data, exported.meta)).removedPlateIds.length, 0);
});

test('native import still rejects malformed plates and does not weaken editor project validation', () => {
  const data = nonplanarNativeFixture();
  const model = parseNativePair(data, {}); const document = toEditorDocument(model);
  assert.throws(() => validateDocument(document, new Map(document.objects.map(object => [object.type, {}]))), { code: 'nonplanar-plate' });
  data.vehicles.vehicles[0].plates[1].nodes = [52, 44, 52];
  assert.throws(() => prepareNativeImport(parseNativePair(data, {})), /重复/);
  data.vehicles.vehicles[0].plates[1].nodes = [52, 44, 9999];
  assert.throws(() => prepareNativeImport(parseNativePair(data, {})), /unknown|未知/i);
});
