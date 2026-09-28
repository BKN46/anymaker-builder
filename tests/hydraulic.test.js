import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { hydraulicFixture } from './hydraulic-fixtures.js';
import { HYDRAULIC_PROFILES } from '../src/editor/hydraulic-profiles.js';
import { prepareHydraulicLink, orientHydraulicLink } from '../src/editor/hydraulic-connections.js';
import { logicNodeCellPosition, logicNodePortsForNetwork } from '../src/editor/connection-ports.js';
import { createLink, validateLinks } from '../src/editor/connections.js';
import { toNativePairFromEditor, parseNativePair } from '../src/native/anymaker-data.js';
import { toEditorDocument } from '../src/editor/model.js';
import { validateDocument, History } from '../src/editor/document.js';
import { partitionSubgrids } from '../src/editor/subgrid-connectivity.js';
import { normalizeSettings } from '../src/editor/local-storage.js';

test('hydraulic profiles match all published endpoints and retain native port indices', () => {
  assert.equal(Object.keys(HYDRAULIC_PROFILES).length, 6);
  for (const [type, profile] of Object.entries(HYDRAULIC_PROFILES)) {
    const definition = JSON.parse(readFileSync('public/data/definitions/' + type + '.json'));
    assert.deepEqual(profile.logic_nodes, definition.logic_nodes);
    assert.deepEqual(profile.surfaces, definition.surfaces);
    const [port] = logicNodePortsForNetwork(definition, 'hydraulic');
    assert.equal(port.port, type.includes('_base') ? 2 : 0);
    assert.equal(logicNodePortsForNetwork(definition, 'liquid').length, type.includes('_base') ? 2 : 0);
  }
  const wheel = JSON.parse(readFileSync('public/data/definitions/wheel_c.json'));
  assert.deepEqual(logicNodePortsForNetwork(wheel, 'liquid').map(port => port.port), [0, 1]);
  assert.equal(logicNodePortsForNetwork(wheel, 'hydraulic').length, 0);
});

test('cylinder anchors include half-cell size offsets after native stretching', () => {
  assert.deepEqual(logicNodeCellPosition({ pos: [0, 1, 0], direction: 3, size: 1 }), [.5, 1, .5]);
  assert.deepEqual(logicNodeCellPosition({ direction: 2, size: 1 }), [.5, 0, .5]);
  assert.deepEqual(logicNodeCellPosition({ direction: 0, size: 1 }), [0, .5, .5]);
  assert.deepEqual(logicNodeCellPosition({ direction: 4, size: 1 }), [.5, .5, 0]);
  assert.deepEqual(logicNodeCellPosition({ pos: [0, 2, 0], direction: 3, size: 2 }), [0, 2, 0]);
  assert.deepEqual(logicNodeCellPosition({ pos: [0, 1, 0], direction: 3, size: 1 }, [4, 2, 4], [0, 0, 0]), [.5, 3, .5]);
});

for (const suffix of ['', '_2_2', '_3_3']) test('hydraulic cylinder creates and round-trips reciprocal bodies: ' + (suffix || '1x1'), () => {
  const document = hydraulicFixture(suffix);
  const definitions = new Map(Object.entries(HYDRAULIC_PROFILES));
  const components = new Map(document.objects.map(object => [object.id, object]));
  const source = document.topology.links[0];
  const reversed = { ...source, from: source.to, to: source.from };
  const prepared = prepareHydraulicLink(reversed, components, definitions);
  assert.deepEqual(prepared, source);
  assert.equal(reversed.from.componentId, 'rod');
  document.topology.links = [prepared];
  document.objects[0].nativeProperties = { hydraulic_cylinder: { content_a: { oil: .25, temp: 20 } } };
  const normalized = validateDocument(document, definitions);
  assert.deepEqual(normalized.topology.links[0], source);
  const history = new History(document); history.commit({ ...document, topology: { ...document.topology, links: [] } });
  assert.deepEqual(history.peekUndo().topology.links, [source]);
  const pair = toNativePairFromEditor(document);
  const bodies = pair.data.vehicles.vehicles;
  assert.equal(bodies.length, 2);
  assert.equal(bodies.some(body => Object.hasOwn(body, 'hydraulic_links')), false);
  const a = bodies[0].grids[0].components[0]; const b = bodies[1].grids[0].components[0];
  assert.equal(a.connected_vehicle, bodies[1].id); assert.equal(a.connected_component, b.id); assert.equal(a.connected_node_index, 0);
  assert.equal(b.connected_vehicle, bodies[0].id); assert.equal(b.connected_component, a.id); assert.equal(b.connected_node_index, 2);
  assert.equal(a.length_max, source.lengthMax); assert.equal(a.extension_factor, 1);
  assert.deepEqual(a.hydraulic_cylinder, { content_a: { oil: .25, temp: 20 } });
  const restored = toEditorDocument(parseNativePair(pair.data, pair.meta), { vehicleIds: [String(bodies[0].id)] });
  assert.equal(restored.objects.length, 2); assert.equal(restored.topology.links.length, 1);
  assert.equal(restored.topology.links[0].from.port, 2); assert.equal(restored.topology.links[0].lengthMax, source.lengthMax);
  assert.deepEqual(restored.objects.map(object => object.position), document.objects.map(object => object.position));
  // Compare the serialized save; JSON represents both signed zeroes as 0.
  assert.equal(JSON.stringify(toNativePairFromEditor(restored).data), JSON.stringify(pair.data));
  restored.topology.links = [];
  const removed = toNativePairFromEditor(restored).data.vehicles.vehicles[0].grids[0].components;
  for (const component of removed) for (const key of ['connected_vehicle', 'connected_component', 'connected_node_index', 'length_max', 'extension_factor']) assert.equal(component[key], undefined);
});

test('hydraulic validation rejects incompatible, occupied and malformed endpoints', () => {
  const document = hydraulicFixture();
  const objects = new Map(document.objects.map(object => [object.id, object]));
  const link = document.topology.links[0];
  const ids = new Set(objects.keys());
  objects.set('other-base', { ...document.objects[0], id: 'other-base' });
  assert.throws(() => orientHydraulicLink({ ...link, to: { componentId: 'other-base', port: 2 } }, objects), error => error.hydraulicCode === 'roles');
  objects.set('other-rod', { ...document.objects[1], id: 'other-rod', type: 'hydraulic_cylinder_connector_2_2' });
  assert.throws(() => orientHydraulicLink({ ...link, to: { componentId: 'other-rod' } }, objects), error => error.hydraulicCode === 'size');
  assert.throws(() => orientHydraulicLink({ ...link, from: { componentId: 'base', port: 0 } }, objects), error => error.hydraulicCode === 'ports');
  assert.throws(() => createLink([link], { ...link, from: link.to, to: link.from }, ids), /already connected/);
  assert.throws(() => validateLinks([{ ...link, points: [{ x: 0, y: 0, z: 0 }] }], ids), /hydraulic/);
  for (const lengthMax of [0, -1, 1.5, Infinity, 10001]) assert.throws(() => validateLinks([{ ...link, lengthMax }], ids), /hydraulic/);
  for (const extensionFactor of [-.1, 1.1, NaN]) assert.throws(() => validateLinks([{ ...link, extensionFactor }], ids), /hydraulic/);
  objects.get('rod').scale.x = 2;
  assert.throws(() => prepareHydraulicLink(link, objects), error => error.hydraulicCode === 'scale');
  objects.get('rod').scale.x = 1; objects.get('rod').position.y = 0;
  assert.throws(() => prepareHydraulicLink(link, objects), error => error.hydraulicCode === 'length');
});

test('hydraulic import preserves stroke and refuses dangling or contradictory references', () => {
  const pair = toNativePairFromEditor(hydraulicFixture());
  const a = pair.data.vehicles.vehicles[0].grids[0].components[0];
  a.extension_factor = .35; a.length_max = 25;
  let document = toEditorDocument(parseNativePair(pair.data, pair.meta));
  assert.equal(document.topology.links[0].extensionFactor, .35); assert.equal(document.topology.links[0].lengthMax, 25);
  for (const [key, value] of [['length_max', 0], ['length_max', 2.5], ['extension_factor', 1.1]]) {
    const previous = a[key]; a[key] = value;
    assert.throws(() => toEditorDocument(parseNativePair(pair.data, pair.meta)), /hydraulic cylinder/);
    a[key] = previous;
  }
  delete a.length_max; delete a.extension_factor;
  document = toEditorDocument(parseNativePair(pair.data, pair.meta));
  assert.equal(document.topology.links[0].lengthMax, 8); assert.equal(document.topology.links[0].extensionFactor, 0);
  const vehicle = a.connected_vehicle; delete a.connected_vehicle;
  assert.throws(() => toEditorDocument(parseNativePair(pair.data, pair.meta)), error => error.hydraulicCode === 'reference');
  a.connected_vehicle = vehicle;
  const rod = pair.data.vehicles.vehicles[1].grids[0].components[0];
  rod.connected_node_index = 0;
  assert.throws(() => toEditorDocument(parseNativePair(pair.data, pair.meta)), error => error.hydraulicCode === 'reference');
  rod.connected_node_index = 2; a.connected_component = 999;
  assert.throws(() => toEditorDocument(parseNativePair(pair.data, pair.meta)), error => error.hydraulicCode === 'reference');
});

test('hydraulic links leave subgrids independent and persist visibility separately from oil pipes', () => {
  const document = hydraulicFixture();
  assert.equal(partitionSubgrids({ components: document.objects.map(object => ({ ...object, bounds: null })), topology: document.topology }).length, 2);
  const settings = normalizeSettings({ version: 1, connectionVisibility: { hydraulic: false, liquid: true } });
  assert.equal(settings.connectionVisibility.hydraulic, false); assert.equal(settings.connectionVisibility.liquid, true);
});
