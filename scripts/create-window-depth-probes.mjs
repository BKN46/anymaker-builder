// 离线研究探针：核对负颜色的深度效果，不接入编辑器或覆盖游戏存档。
import { mkdir, mkdtemp, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const [sourcePath, outputParent = 'exports'] = process.argv.slice(2);
if (!sourcePath || path.extname(sourcePath) !== '.data') {
  throw new Error('Usage: node scripts/create-window-depth-probes.mjs <vehicle.data> [output-directory]');
}
const sourceMetaPath = sourcePath.slice(0, -5) + '.meta';
for (const file of [sourcePath, sourceMetaPath]) {
  assert.ok((await stat(file)).size <= 16 * 1024 * 1024, 'Probe input exceeds 16 MiB');
}
const sourceBytes = await readFile(sourcePath);
const metaBytes = await readFile(sourceMetaPath);
const source = JSON.parse(sourceBytes.toString('utf8'));
JSON.parse(metaBytes.toString('utf8'));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const key = (a, b) => a < b ? `${a}:${b}` : `${b}:${a}`;
const vehicles = source?.vehicles?.vehicles;
assert.ok(Array.isArray(vehicles) && vehicles.length > 0 && vehicles.length <= 100, 'Expected native vehicles');
const missingByVehicle = [];
for (const vehicle of vehicles) {
  assert.ok(Array.isArray(vehicle.nodes) && vehicle.nodes.length <= 10000, 'Invalid nodes');
  assert.ok(Array.isArray(vehicle.edges) && vehicle.edges.length <= 30000, 'Invalid edges');
  assert.ok(Array.isArray(vehicle.plates) && vehicle.plates.length <= 10000, 'Invalid plates');
  const ids = new Set();
  for (const node of vehicle.nodes) {
    assert.ok(Number.isSafeInteger(node.id) && !ids.has(node.id), 'Invalid or duplicate node ID');
    assert.ok(Array.isArray(node.pos) && node.pos.length === 3 && node.pos.every(Number.isFinite), 'Invalid node position');
    ids.add(node.id);
  }
  const edges = new Set();
  for (const edge of vehicle.edges) {
    assert.ok(ids.has(edge.n0) && ids.has(edge.n1) && edge.n0 !== edge.n1, 'Invalid edge endpoints');
    edges.add(key(edge.n0, edge.n1));
  }
  const missing = new Map();
  for (const plate of vehicle.plates) {
    assert.ok(Array.isArray(plate.nodes) && plate.nodes.length >= 3 && plate.nodes.length <= 1000, 'Invalid plate boundary');
    assert.equal(new Set(plate.nodes).size, plate.nodes.length, 'Repeated plate node');
    for (let i = 0; i < plate.nodes.length; i += 1) {
      const n0 = plate.nodes[i];
      const n1 = plate.nodes[(i + 1) % plate.nodes.length];
      assert.ok(ids.has(n0) && ids.has(n1), 'Missing plate node');
      if (edges.has(key(n0, n1))) continue;
      assert.equal(plate.type, 'window', 'This experiment only repairs missing window boundaries');
      missing.set(key(n0, n1), { n0, n1, col: 7, size: 0 });
    }
  }
  missingByVehicle.push([...missing.values()]);
}
assert.ok(missingByVehicle.some(edges => edges.length), 'No missing window boundaries to probe');

const hiddenColor = -1048576;
const variants = [
  { name: '01-supported-control', hideEdges: false, hideFaces: false },
  { name: '02-negative-supports', hideEdges: true, hideFaces: false },
  { name: '03-negative-supports-and-face-colors', hideEdges: true, hideFaces: true },
];
const outputs = [];
for (const variant of variants) {
  const data = structuredClone(source);
  data.vehicles.vehicles.forEach((vehicle, index) => {
    const original = vehicles[index];
    vehicle.edges.push(...missingByVehicle[index].map(edge => ({ ...edge, col: variant.hideEdges ? hiddenColor : edge.col })));
    if (variant.hideFaces) {
      for (const plate of vehicle.plates) {
        if (plate.type === 'window') plate.col_front = plate.col_back = hiddenColor;
      }
    }
    // 形状、原有梁和其它字段不变；只有探针明确要求的颜色和支撑记录变化。
    assert.deepEqual(vehicle.nodes, original.nodes);
    assert.deepEqual(vehicle.edges.slice(0, original.edges.length), original.edges);
    assert.deepEqual(vehicle.plates.map(plate => plate.nodes), original.plates.map(plate => plate.nodes));
    const edgeKeys = new Set(vehicle.edges.map(edge => key(edge.n0, edge.n1)));
    for (const plate of vehicle.plates) {
      assert.ok(plate.nodes.every((id, i) => edgeKeys.has(key(id, plate.nodes[(i + 1) % plate.nodes.length]))), 'Incomplete probe boundary');
    }
  });
  outputs.push({ name: variant.name, bytes: Buffer.from(JSON.stringify(data, null, 2) + '\n') });
}

await mkdir(outputParent, { recursive: true });
const directory = await mkdtemp(path.join(outputParent, 'window-depth-probes-'));
for (const output of outputs) {
  await writeFile(path.join(directory, output.name + '.data'), output.bytes, { flag: 'wx' });
  await writeFile(path.join(directory, output.name + '.meta'), metaBytes, { flag: 'wx' });
}
const report = {
  purpose: 'Isolate support-beam depth bias and the independently colored window rim. NOT a seamless-window implementation.',
  sourceDataSha256: hash(sourceBytes), sourceMetaSha256: hash(metaBytes),
  gameGclSha256: 'eb7a48bda6452368a375789f545c16da11619a8a9d834d16a2ddd46055461955',
  hiddenColor,
  shaderDepthFactorAtLayerZero: 0.998 + 0.004 * hiddenColor / 255,
  vehicles: vehicles.map((vehicle, i) => ({ id: vehicle.id, nodes: vehicle.nodes.length, originalEdges: vehicle.edges.length, plates: vehicle.plates.length, addedEdges: missingByVehicle[i] })),
  variants: outputs.map(output => ({ name: output.name, dataSha256: hash(output.bytes) })),
  verified: ['Original node positions and plate loops preserved', 'Original beams preserved', 'All output plate boundaries have beams'],
  unverified: ['Actual game loading and rendering', 'Native re-save preservation of negative colors', 'Physics, picking, shadows and glass breakage'],
};
await writeFile(path.join(directory, 'report.json'), JSON.stringify(report, null, 2) + '\n', { flag: 'wx' });
await writeFile(path.join(directory, 'README.txt'), `仅用于原版游戏实验，不是无缝曲面成品。

01-supported-control：补齐缺失边界梁，检查目标窗片是否恢复显示。
02-negative-supports：仅将新补梁的颜色改为 ${hiddenColor}，检查梁本体和阴影是否消失。
03-negative-supports-and-face-colors：再将窗正反面颜色改为 ${hiddenColor}，区分可涂色边沿与固定深灰内框。

三个版本均保留原节点位置、窗片连接和原有梁。新增的梁记录具有结构/物理意义，不能当作已消除。
当前代码证据预计 03 仍会留下固定内框；透明玻璃内缩造成的缝隙也未解决。
请以独立名称加载 .data/.meta 配对副本，不替换原载具。不要通过 Builder 再导出探针，负颜色不属于当前编辑器支持的普通调色板范围。
实机观察需包括外侧/内侧、远近视角、阴影、保存重载。所有实机结果目前待验证。
`, { flag: 'wx' });
assert.equal(hash(await readFile(sourcePath)), report.sourceDataSha256, 'Source changed during experiment');
assert.equal(hash(await readFile(sourceMetaPath)), report.sourceMetaSha256, 'Source meta changed during experiment');
console.log(JSON.stringify({ directory, addedEdges: missingByVehicle.reduce((n, edges) => n + edges.length, 0), variants: outputs.length, sourceUnchanged: true }, null, 2));
