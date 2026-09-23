// Convert every component-referenced Anymaker .mesh into a self-contained,
// compressed browser asset. The game installation is only an input to this
// build step; the generated public/assets directory is the runtime source.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { parseMesh } from '../src/assets/mesh.js';

const root = process.argv[2];
if (!root) throw new Error('Usage: node scripts/build-published-assets.mjs <Anymaker/rom>');

const projectRoot = process.cwd();
const dataRoot = path.join(projectRoot, 'public', 'data');
const bindingsRoot = path.join(dataRoot, 'bindings');
const assetsRoot = path.join(projectRoot, 'public', 'assets');
const meshRoot = path.join(assetsRoot, 'meshes');
const manifestRoot = path.join(assetsRoot, 'manifests');
fs.mkdirSync(meshRoot, { recursive: true });
fs.mkdirSync(manifestRoot, { recursive: true });

const normalize = value => value.replaceAll('\\', '/').replace(/^\/+/, '');
const safeSource = value => {
  const source = normalize(value);
  if (!source.startsWith('meshes/') || source.includes('..') || !source.endsWith('.mesh')) {
    throw new Error(`Unsafe Mesh path: ${value}`);
  }
  return source;
};
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));

const sources = new Set();
const staticSources = new Set();
for (const file of fs.readdirSync(bindingsRoot)) {
  if (!file.endsWith('.json')) continue;
  const binding = readJson(path.join(bindingsRoot, file));
  if (binding.staticMesh) {
    const source = safeSource(binding.staticMesh);
    sources.add(source); staticSources.add(source);
  }
  for (const dynamic of binding.dynamicMeshes || []) if (dynamic.path) sources.add(safeSource(dynamic.path));
}

// Tileable native components select start/repeat/end siblings from their
// static Mesh family using the saved `ext`. Include existing siblings in the
// published bundle; runtime never reads the local ROM.
for (const source of staticSources) {
  const match = /^(.*)_0_0_0\.mesh$/.exec(source);
  if (!match) continue;
  const directory = path.dirname(source);
  const base = path.basename(match[1]);
  const inputDirectory = path.join(root, directory);
  if (!fs.existsSync(inputDirectory)) continue;
  const escaped = base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`^${escaped}_([012])_([012])_([012])\\.mesh$`);
  for (const file of fs.readdirSync(inputDirectory)) if (pattern.test(file)) sources.add(safeSource(path.posix.join(directory, file)));
}

const entries = {};
let opaque = 0;
for (const source of [...sources].sort()) {
  const inputPath = path.join(root, source);
  if (!fs.existsSync(inputPath)) throw new Error(`Referenced Mesh is missing from ROM: ${source}`);
  const input = fs.readFileSync(inputPath);
  let parsed;
  let parseError = null;
  try { parsed = parseMesh(input); }
  catch (error) {
    // A small number of blurred/particle assets use a second native layout
    // that is intentionally outside the verified static parser. Preserve the
    // complete bytes in the published database so the asset is never lost;
    // the manifest marks it for a future renderer extension.
    parseError = error.message;
    opaque++;
  }
  // JSON keeps the published format inspectable and portable. Typed arrays are
  // restored by the runtime loader, while gzip removes the repetitive numeric
  // syntax and retains complete geometry, UVs, colors and indices.
  const payload = {
    format: parsed ? 'anymaker-published-mesh' : 'anymaker-published-mesh-opaque',
    version: 1,
    source,
    sourceSha256: sha256(input),
    parts: parsed ? parsed.parts.map(part => ({
      name: part.name,
      signature: part.signature,
      metadata: part.metadata,
      bounds: part.bounds,
      positions: Array.from(part.positions),
      normals: part.normals ? Array.from(part.normals) : null,
      colors: Array.from(part.colors),
      uv: part.uv ? Array.from(part.uv) : null,
      indices: Array.from(part.indices),
    })) : [],
    ...(parsed ? {} : { rawBase64: input.toString('base64'), parseError }),
  };
  const compressed = gzipSync(Buffer.from(JSON.stringify(payload)), { level: 9 });
  const outputName = `${sha256(source).slice(0, 16)}.json.gz`;
  const outputRelative = `assets/meshes/${outputName}`;
  fs.writeFileSync(path.join(meshRoot, outputName), compressed);
  const vertices = parsed ? parsed.parts.reduce((n, part) => n + part.positions.length / 3, 0) : 0;
  const triangles = parsed ? parsed.parts.reduce((n, part) => n + part.indices.length / 3, 0) : 0;
  entries[source] = {
    url: outputRelative,
    sourceSha256: sha256(input),
    outputSha256: sha256(compressed),
    bytes: compressed.byteLength,
    uncompressedBytes: Buffer.byteLength(JSON.stringify(payload)),
    parts: parsed ? parsed.parts.length : 0,
    vertices,
    triangles,
    compression: 'gzip',
    format: 'anymaker-published-mesh/1',
    parsed: Boolean(parsed),
    ...(parseError ? { parseError } : {}),
  };
  process.stdout.write(`converted ${source} (${vertices} vertices)\n`);
}

const manifest = {
  format: 'anymaker-mesh-manifest',
  version: 1,
  generatedAt: new Date().toISOString(),
  sourceRoot: 'Anymaker/rom',
  parser: 'src/assets/mesh.js',
  compression: 'gzip',
  count: Object.keys(entries).length,
  opaque,
  entries,
};
const manifestBytes = Buffer.from(JSON.stringify(manifest, null, 2) + '\n');
fs.writeFileSync(path.join(manifestRoot, 'mesh-manifest.json'), manifestBytes);
  console.log(`Wrote ${manifest.count} complete Mesh assets (${manifest.opaque} opaque native-layout assets; ${manifestBytes.byteLength} byte manifest)`);
