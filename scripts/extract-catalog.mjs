// Read-only extraction. It creates browser-safe, per-component metadata files;
// proprietary .mesh/.txtr binaries remain in the user's local game install.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = process.argv[2];
if (!root) throw new Error('Usage: node scripts/extract-catalog.mjs <Anymaker/rom>');
const source = 'data/vehicle_component_definitions.json';
const definitionBytes = fs.readFileSync(path.join(root, source));
const raw = JSON.parse(definitionBytes.toString('utf8'));
const rows = fs.readFileSync(path.join(root, 'languages_components.tsv'), 'utf8').split(/\r?\n/).filter(Boolean).map(line => line.split('\t'));
const zhColumn = rows[0].indexOf('zh');
const translations = new Map(rows.slice(1).map(row => [row[0], row[zhColumn]]));
const output = path.resolve('public/data');
const definitionsDir = path.join(output, 'definitions');
const bindingsDir = path.join(output, 'bindings');
fs.mkdirSync(definitionsDir, { recursive: true });
fs.mkdirSync(bindingsDir, { recursive: true });
const writeJson = (file, value) => fs.writeFileSync(file, JSON.stringify(value));
const safeId = id => { if (!/^[a-z0-9_]+$/i.test(id)) throw new Error('Unsafe definition id: ' + id); return id; };
const definitions = raw.definitions.map(definition => {
  const id = safeId(definition.id);
  const nameZh = translations.get(id) || definition.name;
  const staticMesh = definition.mesh_static?.mesh_path ?? null;
  const dynamicMeshes = (definition.meshes_dynamic || []).map((mesh, index) => ({ index, path: mesh.path, position: mesh.pos ?? null, previewRotation: mesh.preview_rot ?? null, addComponentTool: mesh.is_render_add_component_tool ?? false }));
  const detail = { ...definition, name_zh: nameZh, mesh: staticMesh };
  writeJson(path.join(definitionsDir, id + '.json'), detail);
  writeJson(path.join(bindingsDir, id + '.json'), { id, staticMesh, dynamicMeshes });
  return { id, name: definition.name, name_zh: nameZh, category: definition.category || 'miscellaneous', class: definition.class || '', detail: 'data/definitions/' + id + '.json', binding: 'data/bindings/' + id + '.json' };
});
definitions.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
writeJson(path.join(output, 'component-index.json'), { format: 'anymaker-component-index', version: 1, source: 'rom/' + source, sourceSha256: createHash('sha256').update(definitionBytes).digest('hex'), count: definitions.length, definitions });
console.log('Wrote ' + definitions.length + ' indexed definitions, details, and Mesh bindings');
