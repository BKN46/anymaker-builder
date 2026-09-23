import { fromEditorDocument } from './model.js';
import { validateTopologyState } from './topology.js';
import { assertGridScalar, assertGridVector, CELL_SIZE_CM } from './grid.js';

export const FORMAT = 'anymaker-web-project';
export const VERSION = 1;
export const LIMIT = 2000;
const axes = ['x', 'y', 'z'];
const own = (object, key) => Object.hasOwn(object, key);

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
    for (const field of ['position', 'rotation', 'scale']) {
      const vector = o[field];
      if (!vector || !axes.every(a => own(vector, a) && typeof vector[a] === 'number' && Number.isFinite(vector[a]) && Math.abs(vector[a]) <= 10000)) throw new Error('Invalid transform at ' + index + '.' + field);
      if (field === 'scale' && axes.some(a => vector[a] <= 0 || vector[a] > 100)) throw new Error('Scale must be in (0, 100]');
      result[field] = field === 'position' ? assertGridVector(vector, '组件位置') : Object.fromEntries(axes.map(a => [a, vector[a]]));
    }
    return result;
  });
  const result = { format: FORMAT, version: VERSION, objects };
  if (input.topology !== undefined) result.topology = validateTopologyState(input.topology);
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
  return validateDocument({ format: FORMAT, version: VERSION, objects, topology: input.topology }, definitions);
}

export function project(objects, topology) {
  const result = { format: FORMAT, version: VERSION, objects: structuredClone(objects) };
  if (topology !== undefined) result.topology = validateTopologyState(topology);
  return result;
}

export function escapeXml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

export function toIntermediateXml(document) {
  for (const object of document.objects || []) { assertGridVector(object.position, '组件位置'); if (object.mirror) assertGridScalar(object.mirror.offset, '镜像偏移'); }
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
  constructor(initial) { this.entries = [structuredClone(initial)]; this.cursor = 0; }
  commit(value) {
    if (JSON.stringify(value) === JSON.stringify(this.entries[this.cursor])) return;
    this.entries.splice(this.cursor + 1);
    this.entries.push(structuredClone(value));
    if (this.entries.length > 60) this.entries.shift();
    this.cursor = this.entries.length - 1;
  }
  peekUndo() { return this.cursor > 0 ? structuredClone(this.entries[this.cursor - 1]) : null; }
  peekRedo() { return this.cursor < this.entries.length - 1 ? structuredClone(this.entries[this.cursor + 1]) : null; }
}
