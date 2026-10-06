// 离线只读报告，不生成或改写游戏存档。
import { readFile, mkdir, mkdtemp, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { analyzeNativeWindowFans } from './lib/window-fan-analysis.mjs';

const [sourcePath, outputParent = 'exports'] = process.argv.slice(2);
if (!sourcePath || path.extname(sourcePath) !== '.data') throw new Error('Usage: node scripts/analyze-window-fans.mjs <vehicle.data> [output-directory]');
assert.ok((await stat(sourcePath)).size <= 16 * 1024 * 1024, 'Input exceeds 16 MiB');
const bytes = await readFile(sourcePath);
const source = JSON.parse(bytes.toString('utf8'));
const evidenceUrl = new URL('../doc/evidence/window-multi-fan.json', import.meta.url);
const evidence = JSON.parse(await readFile(evidenceUrl, 'utf8'));
const literal = name => {
  const fact = evidence.byteFacts.find(item => item.name === name);
  assert.ok(fact && /^[0-9a-f]{16}$/.test(fact.hex), 'Missing f64 evidence constant ' + name);
  return Buffer.from(fact.hex, 'hex').readDoubleLE();
};
const gridSize = literal('grid-size');
const constants = { gridSize, windowInset: gridSize * literal('window-inset-grid-factor'), frameWidth: literal('window-frame-width'), plateThickness: literal('plate-thickness') };
const vehicles = source?.vehicles?.vehicles;
assert.ok(Array.isArray(vehicles) && vehicles.length > 0 && vehicles.length <= 100, 'Expected bounded native vehicles');
const report = {
  purpose: 'Study existing-beam triangular windows, native aperture gaps and necessary conditions for an exact single fan. Not a seamless-window implementation.',
  sourceDataSha256: createHash('sha256').update(bytes).digest('hex'), gameSource: evidence.source, constants,
  geometryEvidence: 'doc/evidence/window-multi-fan.json',
  vehicles: vehicles.map(vehicle => analyzeNativeWindowFans(vehicle, constants)),
  unverified: ['Actual game loading and rendering', 'One-axis reconstructed windows and arbitrary non-triangular contours', 'Outer strips, native mesh buffer ordering, shaders, shadows, collisions and breakage'],
};
await mkdir(outputParent, { recursive: true });
const directory = await mkdtemp(path.join(outputParent, 'window-fan-analysis-'));
await writeFile(path.join(directory, 'report.json'), JSON.stringify(report, null, 2) + '\n', { flag: 'wx' });
assert.deepEqual(await readFile(sourcePath), bytes, 'Source changed during analysis');
console.log(JSON.stringify({ directory, sourceUnchanged: true, vehicles: report.vehicles.map(vehicle => ({
  ...vehicle.counts, existingTriangleCycles: vehicle.existingBeamTriangleCycles.count,
  missingWindowBoundaries: vehicle.uniqueMissingWindowBoundaries.length,
  midpointGlassSeparations: vehicle.sharedEdges.map(edge => ({ nodes: edge.nodes, front: edge.midpointGlassSeparation?.front ?? null })),
  fanConditions: vehicle.groups.map(group => group.targetNodeSurfaceCommonFanPoint)
})) }, null, 2));
