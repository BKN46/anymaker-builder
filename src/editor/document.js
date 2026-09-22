export const FORMAT = 'anymaker-web-project';
export const VERSION = 1;
export const LIMIT = 2000;
const axes = ['x', 'y', 'z'];
const own = (object, key) => Object.hasOwn(object, key);

export function validateDocument(input, definitions) {
  if (!input || input.format !== FORMAT || input.version !== VERSION || !Array.isArray(input.objects)) throw new Error('不是受支持的编辑器工程格式（不接受伪装成工程的游戏文件）');
  if (input.objects.length > LIMIT) throw new Error('组件数超过 ' + LIMIT);
  const ids = new Set();
  const objects = input.objects.map((o, index) => {
    if (!o || typeof o.id !== 'string' || !o.id || o.id.length > 100 || ids.has(o.id)) throw new Error('组件 ID 无效或重复：' + index);
    ids.add(o.id);
    if (!definitions.has(o.type)) throw new Error('未知组件定义：' + String(o.type));
    const result = { id: o.id, type: o.type };
    for (const field of ['position', 'rotation', 'scale']) {
      const vector = o[field];
      if (!vector || !axes.every(a => own(vector, a) && typeof vector[a] === 'number' && Number.isFinite(vector[a]) && Math.abs(vector[a]) <= 10000)) throw new Error('无效变换：' + index + '.' + field);
      if (field === 'scale' && axes.some(a => vector[a] <= 0 || vector[a] > 100)) throw new Error('缩放必须在 (0, 100]');
      result[field] = Object.fromEntries(axes.map(a => [a, vector[a]]));
    }
    return result;
  });
  return { format: FORMAT, version: VERSION, objects };
}

export function project(objects) { return { format: FORMAT, version: VERSION, objects: structuredClone(objects) }; }

export function escapeXml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

export function toIntermediateXml(document) {
  const vector = (name, v) => '<' + name + ' ' + axes.map(a => a + '="' + v[a].toFixed(6) + '"').join(' ') + '/>';
  const components = document.objects.map(o => '  <component instance="' + escapeXml(o.id) + '" definition="' + escapeXml(o.type) + '">' + vector('position', o.position) + vector('rotation-radians-xyz', o.rotation) + vector('scale', o.scale) + '</component>');
  return ['<?xml version="1.0" encoding="UTF-8"?>', '<!-- EDITOR INTERCHANGE ONLY. Not a verified Anymaker vehicle save. -->', '<anymaker-web-project version="1" game-compatible="false">', ...components, '</anymaker-web-project>'].join(String.fromCharCode(10));
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
