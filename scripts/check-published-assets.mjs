// CI check for the self-contained GitHub Pages asset set.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = process.cwd();
const manifestFile = path.join(root, 'public', 'assets', 'manifests', 'mesh-manifest.json');
const bindingsRoot = path.join(root, 'public', 'data', 'bindings');
if (!fs.existsSync(manifestFile)) throw new Error('Missing public/assets/manifests/mesh-manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
if (manifest.format !== 'anymaker-mesh-manifest' || manifest.version !== 1) throw new Error('Unsupported Mesh manifest');
const referenced = new Set();
for (const file of fs.readdirSync(bindingsRoot)) {
  if (!file.endsWith('.json')) continue;
  const binding = JSON.parse(fs.readFileSync(path.join(bindingsRoot, file), 'utf8'));
  if (binding.staticMesh) referenced.add(binding.staticMesh);
  for (const item of binding.dynamicMeshes || []) if (item.path) referenced.add(item.path);
}
const errors = [];
for (const source of referenced) {
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
