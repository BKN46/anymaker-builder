import { fromEditorDocument } from './model.js';
import { validateTopologyState } from './topology.js';
import { assertGridScalar, assertGridVector, CELL_SIZE_CM } from './grid.js';
import { validateNativeProperties } from './component-properties.js';
import { validateNativeAccessory } from './native-accessories.js';

export const FORMAT = 'anymaker-web-project';
export const VERSION = 1;
export const LIMIT = 2000;
const axes = ['x', 'y', 'z'];
const own = (object, key) => Object.hasOwn(object, key);
const MAX_DEFINITION_OVERRIDE_BYTES = 512 * 1024;
const MAX_DEFINITION_OVERRIDE_DEPTH = 32;
const MAX_DEFINITION_OVERRIDE_VALUES = 20000;

function validateDefinitionOverride(value, type) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid component definition override');
  let values = 0;
  const validateValue = (current, depth = 0) => {
    if (depth > MAX_DEFINITION_OVERRIDE_DEPTH || ++values > MAX_DEFINITION_OVERRIDE_VALUES) throw new Error('Component definition override is too large');
    if (current === null || typeof current === 'string' || typeof current === 'boolean') return current;
    if (typeof current === 'number') {
      if (!Number.isFinite(current)) throw new Error('Invalid component definition override value');
      return current;
    }
    if (Array.isArray(current)) return current.map(item => validateValue(item, depth + 1));
    if (!current || typeof current !== 'object' || (Object.getPrototypeOf(current) !== Object.prototype && Object.getPrototypeOf(current) !== null)) throw new Error('Invalid component definition override value');
    const result = {};
    for (const [key, item] of Object.entries(current)) {
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') throw new Error('Invalid component definition override key');
      result[key] = validateValue(item, depth + 1);
    }
    return result;
  };
  const result = validateValue(value);
  if (result.id !== type) throw new Error('Component definition override ID does not match the component type');
  if (JSON.stringify(result).length > MAX_DEFINITION_OVERRIDE_BYTES) throw new Error('Component definition override is too large');
  return result;
}

function validateVisibilityGroups(input, componentIds, topology) {
  if (input === undefined) return undefined;
  if (!Array.isArray(input) || input.length > 50) throw new Error('Invalid visibility groups');
  const edgeIds = new Set((topology?.edges || []).map(edge => edge.id));
  const plateIds = new Set((topology?.plates || []).map(plate => plate.id));
  const ids = new Set();
  return input.map((group, index) => {
    if (!group || typeof group.id !== 'string' || !/^[A-Za-z0-9_-]{1,100}$/.test(group.id) || ids.has(group.id)) throw new Error('Invalid visibility group at ' + index);
    if (typeof group.name !== 'string' || !group.name.trim() || group.name.length > 80) throw new Error('Invalid visibility group name at ' + index);
    ids.add(group.id);
    const members = (field, known) => {
      if (!Array.isArray(group[field]) || group[field].length > LIMIT || group[field].some(id => typeof id !== 'string' || !known.has(id)) || new Set(group[field]).size !== group[field].length) throw new Error('Invalid visibility group members at ' + index);
      return [...group[field]];
    };
    const result = { id: group.id, name: group.name.trim(), components: members('components', componentIds), edges: members('edges', edgeIds), plates: members('plates', plateIds) };
    if (!result.components.length && !result.edges.length && !result.plates.length) throw new Error('Empty visibility group at ' + index);
    return result;
  });
}

export function validateDocument(input, definitions) {
  if (!input || input.format !== FORMAT || input.version !== VERSION || !Array.isArray(input.objects)) throw new Error('Unsupported editor project format');
  if (input.objects.length > LIMIT) throw new Error('Component limit exceeded: ' + LIMIT);
  const ids = new Set();
  const objects = input.objects.map((o, index) => {
    if (!o || typeof o.id !== 'string' || !o.id || o.id.length > 100 || ids.has(o.id)) throw new Error('组件 ID 无效或重复：' + index);
    ids.add(o.id);
    if (!definitions.has(o.type)) throw new Error('Unknown component definition: ' + String(o.type));
    const result = { id: o.id, type: o.type };
    if (o.gridId !== undefined && (typeof o.gridId !== 'string' || !/^[A-Za-z0-9_-]{1,80}$/.test(o.gridId))) throw new Error('Invalid grid ID at ' + index);
    if (o.gridId !== undefined) result.gridId = o.gridId;
    if (o.mirror !== undefined) {
      if (!o.mirror || !['x', 'y', 'z'].includes(o.mirror.axis)) throw new Error('Invalid mirror data at ' + index);
      result.mirror = { axis: o.mirror.axis, offset: assertGridScalar(o.mirror.offset, '镜像偏移') };
    }
    if (o.colors !== undefined) {
      if (!Array.isArray(o.colors) || o.colors.length > 10 || o.colors.some(color => !Number.isInteger(color) || color < 0 || color > 255)) throw new Error('Invalid component color slots at ' + index);
      result.colors = [...o.colors];
    }
    if (o.paintColor !== undefined) {
      if (typeof o.paintColor !== 'string' || !/^#[\da-f]{6}$/i.test(o.paintColor)) throw new Error('Invalid component paint color at ' + index);
      result.paintColor = o.paintColor.toLowerCase();
    }
    if (o.definitionOverride !== undefined) result.definitionOverride = validateDefinitionOverride(o.definitionOverride, o.type);
    if (o.hidden !== undefined) {
      if (typeof o.hidden !== 'boolean') throw new Error('Invalid component visibility at ' + index);
      if (o.hidden) result.hidden = true;
    }
    if (o.nativeProjected !== undefined) {
      if (o.nativeProjected !== true) throw new Error('Invalid native projection at ' + index);
      result.nativeProjected = true;
    }
    if (o.nativeAccessory !== undefined) result.nativeAccessory = validateNativeAccessory(o.nativeAccessory);
    if (o.nativeExtension !== undefined) {
      if (!Array.isArray(o.nativeExtension) || o.nativeExtension.length !== 3 || o.nativeExtension.some(value => !Number.isInteger(value) || Math.abs(value) > 10000)) throw new Error('Invalid native component extension at ' + index);
      result.nativeExtension = [...o.nativeExtension];
    }
    const nativeProperties = validateNativeProperties(o.nativeProperties);
    if (nativeProperties && Object.keys(nativeProperties).length) result.nativeProperties = nativeProperties;
    for (const field of ['position', 'rotation', 'scale']) {
      const vector = o[field];
      if (!vector || !axes.every(a => own(vector, a) && typeof vector[a] === 'number' && Number.isFinite(vector[a]) && Math.abs(vector[a]) <= 10000)) throw new Error('Invalid transform at ' + index + '.' + field);
      if (field === 'scale' && axes.some(a => vector[a] <= 0 || vector[a] > 100)) throw new Error('Scale must be in (0, 100]');
      result[field] = field === 'position' && !result.nativeProjected
        ? assertGridVector(vector, '组件位置')
        : Object.fromEntries(axes.map(a => [a, vector[a]]));
    }
    return result;
  });
  const result = { format: FORMAT, version: VERSION, objects };
  if (input.topology !== undefined) result.topology = validateTopologyState(input.topology, new Set(objects.map(object => object.id)));
  const visibilityGroups = validateVisibilityGroups(input.visibilityGroups, new Set(objects.map(object => object.id)), result.topology);
  if (visibilityGroups?.length) result.visibilityGroups = visibilityGroups;
  // Run the renderer-independent model adapter as a second boundary check.
  // This keeps future nodes/edges/plates/links additions out of Three.js.
  fromEditorDocument(result);
  return result;
}

export function migrateDocument(input, definitions) {
  if (!input || input.format !== FORMAT) throw new Error('Unsupported editor project format');
  if (input.version === VERSION) return validateDocument(input, definitions);
  if (input.version !== 0) throw new Error('Unsupported editor project schema version: ' + input.version);
  const source = Array.isArray(input.objects) ? input.objects : Array.isArray(input.components) ? input.components : [];
  const objects = source.map((value, index) => ({
    id: value.id || `legacy-${index + 1}`,
    type: value.type || value.definition,
    gridId: value.gridId,
    position: value.position || { x: 0, y: 0, z: 0 },
    rotation: value.rotation || { x: 0, y: 0, z: 0 },
    scale: value.scale || { x: 1, y: 1, z: 1 },
  }));
  return validateDocument({ format: FORMAT, version: VERSION, objects, topology: input.topology, visibilityGroups: input.visibilityGroups }, definitions);
}

export function project(objects, topology, visibilityGroups) {
  const result = { format: FORMAT, version: VERSION, objects: structuredClone(objects) };
  if (topology !== undefined) result.topology = validateTopologyState(topology, new Set(objects.map(object => object.id)));
  if (visibilityGroups?.length) result.visibilityGroups = structuredClone(visibilityGroups);
  return result;
}

export function escapeXml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

export function toIntermediateXml(document) {
  for (const object of document.objects || []) { if (!object.nativeProjected) assertGridVector(object.position, '组件位置'); if (object.mirror) assertGridScalar(object.mirror.offset, '镜像偏移'); }
  validateTopologyState(document.topology);
  const vector = (name, v) => '<' + name + ' ' + axes.map(a => a + '="' + v[a].toFixed(6) + '"').join(' ') + '/>';
  const components = document.objects.map(o => {
    const grid = o.gridId ? ' grid="' + escapeXml(o.gridId) + '"' : '';
    const mirror = o.mirror ? '<mirror axis="' + escapeXml(o.mirror.axis) + '" offset="' + Number(o.mirror.offset).toFixed(6) + '"/>' : '';
    return '  <component instance="' + escapeXml(o.id) + '" definition="' + escapeXml(o.type) + '"' + grid + '>' + vector('position', o.position) + vector('rotation-radians-xyz', o.rotation) + vector('scale', o.scale) + mirror + '</component>';
  });
  const topology = document.topology || { nodes: [], edges: [], plates: [] };
  const nodes = topology.nodes.map(node => '  <node id="' + escapeXml(node.id) + '" x="' + node.position.x.toFixed(6) + '" y="' + node.position.y.toFixed(6) + '" z="' + node.position.z.toFixed(6) + '"/>');
  const edges = topology.edges.map(edge => '  <edge id="' + escapeXml(edge.id) + '" a="' + escapeXml(edge.a) + '" b="' + escapeXml(edge.b) + '"/>');
  const plates = topology.plates.map(plate => '  <plate id="' + escapeXml(plate.id) + '" nodes="' + plate.nodeIds.map(escapeXml).join(' ') + '"/>');
  return ['<?xml version="1.0" encoding="UTF-8"?>', '<!-- EDITOR INTERCHANGE ONLY. Not a verified Anymaker vehicle save. -->', `<anymaker-web-project version="1" game-compatible="false" coordinate-unit="world" grid-cell-size-cm="${CELL_SIZE_CM}">`, '<topology>', ...nodes, ...edges, ...plates, '</topology>', ...components, '</anymaker-web-project>'].join(String.fromCharCode(10));
}

export class History {
  constructor(initial, initialLabel = 'Initial state') { this.entries = [structuredClone(initial)]; this.labels = [initialLabel]; this.cursor = 0; }
  commit(value, label = 'Edit') {
    if (JSON.stringify(value) === JSON.stringify(this.entries[this.cursor])) return;
    this.entries.splice(this.cursor + 1);
    this.labels.splice(this.cursor + 1);
    this.entries.push(structuredClone(value));
    this.labels.push(label);
    if (this.entries.length > 60) { this.entries.shift(); this.labels.shift(); }
    this.cursor = this.entries.length - 1;
  }
  peekUndo() { return this.cursor > 0 ? structuredClone(this.entries[this.cursor - 1]) : null; }
  peekRedo() { return this.cursor < this.entries.length - 1 ? structuredClone(this.entries[this.cursor + 1]) : null; }
}
