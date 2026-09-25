// Read-only extraction. It creates browser-safe, per-component metadata files;
// proprietary .mesh/.txtr binaries remain in the user's local game install.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = process.argv[2];
if (!root) throw new Error('Usage: node scripts/extract-catalog.mjs <Anymaker/rom>');
const source = 'data/vehicle_component_definitions.json';
const translationSource = 'languages_components.tsv';
const definitionBytes = fs.readFileSync(path.join(root, source));
const raw = JSON.parse(definitionBytes.toString('utf8'));
const translationBytes = fs.readFileSync(path.join(root, translationSource));
const rows = translationBytes.toString('utf8').split(/\r?\n/).filter(Boolean).map(line => line.split('\t'));
rows[0][0] = rows[0][0].replace(/^\uFEFF/, '');
const enColumn = rows[0].indexOf('en');
const zhColumn = rows[0].indexOf('zh');
if (enColumn < 0 || zhColumn < 0) throw new Error(`Missing en or zh column in ${translationSource}`);
const translations = new Map();
for (const [rowIndex, row] of rows.slice(1).entries()) {
  const id = row[0];
  const nameEn = row[enColumn];
  const nameZh = row[zhColumn];
  if (typeof id !== 'string' || !id) throw new Error(`Missing component id in ${translationSource} row ${rowIndex + 2}`);
  if (translations.has(id)) throw new Error(`Duplicate component id in ${translationSource}: ${id}`);
  if (typeof nameEn !== 'string' || !nameEn.trim()) throw new Error(`Missing en component name in ${translationSource}: ${id}`);
  if (typeof nameZh !== 'string' || !nameZh.trim()) throw new Error(`Missing zh component name in ${translationSource}: ${id}`);
  translations.set(id, { nameEn, nameZh });
}
const output = path.resolve('public/data');
const definitionsDir = path.join(output, 'definitions');
const bindingsDir = path.join(output, 'bindings');
fs.mkdirSync(definitionsDir, { recursive: true });
fs.mkdirSync(bindingsDir, { recursive: true });
const writeJson = (file, value) => fs.writeFileSync(file, JSON.stringify(value));
const safeId = id => { if (!/^[a-z0-9_]+$/i.test(id)) throw new Error('Unsafe definition id: ' + id); return id; };
const definitions = raw.definitions.map(definition => {
  const id = safeId(definition.id);
  const names = translations.get(id);
  if (!names) throw new Error(`Missing component names for ${id} in ${translationSource}`);
  const staticMesh = definition.mesh_static?.mesh_path ?? null;
  const dynamicMeshes = (definition.meshes_dynamic || []).map((mesh, index) => ({ index, path: mesh.path, position: mesh.pos ?? null, previewRotation: mesh.preview_rot ?? null, addComponentTool: mesh.is_render_add_component_tool ?? false }));
  const detail = { ...definition, name: names.nameEn, name_zh: names.nameZh, mesh: staticMesh };
  writeJson(path.join(definitionsDir, id + '.json'), detail);
  writeJson(path.join(bindingsDir, id + '.json'), { id, staticMesh, dynamicMeshes });
  return { id, name: names.nameEn, name_zh: names.nameZh, category: definition.category || 'miscellaneous', class: definition.class || '', detail: 'data/definitions/' + id + '.json', binding: 'data/bindings/' + id + '.json' };
});
definitions.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
const index = {
  format: 'anymaker-component-index',
  version: 1,
  schema: 'anymaker-component-index/1',
  resourceVersion: 1,
  assetManifest: 'assets/manifests/mesh-manifest.json',
  source: 'rom/' + source,
  sourceSha256: createHash('sha256').update(definitionBytes).digest('hex'),
  translationSource: 'rom/' + translationSource,
  translationSourceSha256: createHash('sha256').update(translationBytes).digest('hex'),
  count: definitions.length,
  definitions,
};
writeJson(path.join(output, 'component-index.json'), index);
writeJson(path.join(output, 'index.json'), index);
console.log('Wrote ' + definitions.length + ' indexed definitions, details, and Mesh bindings');
