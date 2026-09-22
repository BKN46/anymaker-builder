import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { parseMesh } from '../src/assets/mesh.js';
const root = path.resolve(process.argv[2] || '');
if (!process.argv[2]) throw new Error('Usage: node scripts/audit-assets.mjs <Anymaker/rom>');
const hash = b => createHash('sha256').update(b).digest('hex');
const defsBuffer = await fs.readFile(path.join(root, 'data/vehicle_component_definitions.json'));
const defs = JSON.parse(defsBuffer).definitions;
const references = new Set(defs.flatMap(d => [d.mesh_static?.mesh_path, ...(d.meshes_dynamic || []).map(m => m.path)]).filter(Boolean));
const files = [];
async function walk(dir) { for (const e of await fs.readdir(dir, { withFileTypes: true })) { const p = path.join(dir, e.name); if (e.isDirectory()) await walk(p); else files.push(p); } }
await walk(root);
const extensions = {};
const categories = {};
for (const p of files) { const e = path.extname(p); extensions[e] = (extensions[e] || 0) + 1; }
for (const d of defs) categories[d.category] = (categories[d.category] || 0) + 1;
const meshes = [];
for (const p of files.filter(p => p.endsWith('.mesh'))) {
  const b = await fs.readFile(p); const relative = path.relative(root, p).split(path.sep).join('/');
  const item = { path: relative, bytes: b.length, sha256: hash(b), componentReference: references.has(relative) };
  try {
    const parsed = parseMesh(b);
    Object.assign(item, { supported: true, parts: parsed.parts.length, vertices: parsed.parts.reduce((s, p) => s + p.positions.length / 3, 0), triangles: parsed.parts.reduce((s, p) => s + p.indices.length / 3, 0) });
  } catch (error) { Object.assign(item, { supported: false, reason: error.message }); }
  meshes.push(item);
}
const samplePath = 'data/buildings/starter_vehicle.data';
const sampleBytes = await fs.readFile(path.join(root, samplePath));
const sample = JSON.parse(sampleBytes);
const vehicles = sample.vehicles.vehicles;
const exe = await fs.readFile(path.join(root, '../game.exe'));
const report = { date: new Date().toISOString(), tool: 'scripts/audit-assets.mjs', node: process.version, gameExeSha256: hash(exe), definitionsSha256: hash(defsBuffer), fileCount: files.length, extensions, definitions: defs.length, categories,
  referencedMeshes: references.size, missingReferences: [...references].filter(r => !meshes.some(m => m.path === r)),
  supported: meshes.filter(m => m.supported).length, unsupported: meshes.filter(m => !m.supported).length,
  componentMeshes: meshes.filter(m => m.componentReference).length, supportedComponentMeshes: meshes.filter(m => m.componentReference && m.supported).length,
  nativeSample: { path: samplePath, sha256: hash(sampleBytes), format: 'JSON (not XML)', rootKeys: Object.keys(sample), vehicles: vehicles.map(v => ({ id: v.id, keys: Object.keys(v), nodes: v.nodes.length, edges: v.edges.length, plates: v.plates.length, grids: v.grids.length, components: v.grids.reduce((s, g) => s + g.components.length, 0) })) }, meshes };
await fs.mkdir('doc/evidence', { recursive: true });
await fs.writeFile('doc/evidence/asset-audit.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ...report, meshes: undefined }, null, 2));
