// CI check for the self-contained GitHub Pages asset set.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = process.cwd();
const manifestFile = path.join(root, 'public', 'assets', 'manifests', 'mesh-manifest.json');
const bindingsRoot = path.join(root, 'public', 'data', 'bindings');
const indexFile = path.join(root, 'public', 'data', 'index.json');
if (!fs.existsSync(manifestFile)) throw new Error('Missing public/assets/manifests/mesh-manifest.json');
if (!fs.existsSync(indexFile)) throw new Error('Missing public/data/index.json');
const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
const index = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
if (index.format !== 'anymaker-component-index' || index.version !== 1 || index.schema !== 'anymaker-component-index/1' || !Array.isArray(index.definitions)) throw new Error('Invalid component index schema');
if (typeof index.translationSource !== 'string' || !/^rom\/languages_components\.tsv$/.test(index.translationSource) || !/^[\da-f]{64}$/i.test(index.translationSourceSha256 || '')) throw new Error('Missing component translation source fingerprint');
if (manifest.format !== 'anymaker-mesh-manifest' || manifest.version !== 1) throw new Error('Unsupported Mesh manifest');
const referenced = new Set();
const errors = [];
for (const file of fs.readdirSync(bindingsRoot)) {
  if (!file.endsWith('.json')) continue;
  const binding = JSON.parse(fs.readFileSync(path.join(bindingsRoot, file), 'utf8'));
  if (binding.staticMesh) referenced.add(binding.staticMesh);
  for (const item of binding.dynamicMeshes || []) if (item.path) referenced.add(item.path);
}
if (index.count !== index.definitions.length) errors.push('component index count does not match definitions');
for (const definition of index.definitions) {
  if (typeof definition.name !== 'string' || !definition.name.trim()) errors.push(`missing English component name: ${definition.id}`);
  if (typeof definition.name_zh !== 'string' || !definition.name_zh.trim()) errors.push(`missing Chinese component name: ${definition.id}`);
  for (const relative of [definition.detail, definition.binding]) {
    if (typeof relative !== 'string' || !relative.startsWith('data/') || !fs.existsSync(path.join(root, 'public', relative))) errors.push(`missing component data file: ${relative}`);
  }
  if (typeof definition.detail === 'string' && fs.existsSync(path.join(root, 'public', definition.detail))) {
    const detail = JSON.parse(fs.readFileSync(path.join(root, 'public', definition.detail), 'utf8'));
    if (detail.id !== definition.id || detail.name !== definition.name || detail.name_zh !== definition.name_zh) errors.push(`component name/detail mismatch: ${definition.id}`);
  }
}
for (const source of Object.keys(manifest.entries || {})) {
  const entry = manifest.entries?.[source];
  if (!entry) { errors.push(`missing manifest entry: ${source}`); continue; }
  const file = path.join(root, 'public', entry.url);
  if (!fs.existsSync(file)) { errors.push(`missing asset file: ${entry.url}`); continue; }
  const bytes = fs.readFileSync(file);
  if (createHash('sha256').update(bytes).digest('hex') !== entry.outputSha256) errors.push(`hash mismatch: ${entry.url}`);
}
if (manifest.count !== Object.keys(manifest.entries || {}).length) errors.push('manifest count does not match entries');
if (errors.length) throw new Error(errors.join('\n'));
console.log(`Published asset check passed: ${referenced.size} referenced Meshes, ${manifest.count} manifest entries, ${manifest.opaque || 0} opaque native-layout assets`);
