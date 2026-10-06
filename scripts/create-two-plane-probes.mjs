// 独立原生存档探针：只创建新目录，既不读写用户载具，也不修改游戏。
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { predictSingleWindowFan } from './lib/single-window-fan.mjs';
import { analyzeNativeWindowFans } from './lib/window-fan-analysis.mjs';
import { parseNativePair, toNativePairFromEditor } from '../src/native/anymaker-data.js';
import { prepareNativeImport } from '../src/native/import-document.js';

const [outputParent = 'exports'] = process.argv.slice(2);
const evidence = JSON.parse(await readFile(new URL('../doc/evidence/window-multi-fan.json', import.meta.url), 'utf8'));
const value = name => Buffer.from(evidence.byteFacts.find(fact => fact.name === name).hex, 'hex').readDoubleLE();
const constants = { gridSize: value('grid-size'), windowInset: value('grid-size') * value('window-inset-grid-factor'), frameWidth: value('window-frame-width'), plateThickness: value('plate-thickness') };
const strip = [[0,0,-6],[8,4,-6],[8,4,6],[0,0,6],[-8,4,6],[-8,4,-6]];
const diamond = [[0,0,-6],[8,4,0],[0,0,6],[-8,4,0]];
const trapezoid = strip.map(point => [...point]); trapezoid[4] = [-4,2,6];
const matrix = [[-2,2,1],[1,2,-2],[-2,-1,-2]];
const spatialStrip = strip.map(point => [point[0],point[1] ? 3 : 0,point[2]]).map(point => matrix.map(row => row.reduce((sum,item,i) => sum+item*point[i],0)));
const variants = [
  { name: '01-two-plane-window', positions: strip, anchor: 0, type: 'window', expectedPlanes: 2 },
  { name: '02-wrong-window-anchor', positions: strip, anchor: 1, type: 'window', expectedPlanes: 4 },
  { name: '03-two-plane-solid', positions: strip, anchor: 0, type: 'solid', expectedPlanes: 2 },
  { name: '04-diamond-window', positions: diamond, anchor: 0, type: 'window', expectedPlanes: 2 },
  { name: '05-trapezoid-window', positions: trapezoid, anchor: 0, type: 'window', expectedPlanes: 3 },
  { name: '06-spatial-two-plane-window', positions: spatialStrip, anchor: 0, type: 'window', expectedPlanes: 2 }
];
const outputs = [];
for (const variant of variants) {
  const nodeIds = variant.positions.map((_, i) => i+1);
  const boundary = [...nodeIds.slice(variant.anchor),...nodeIds.slice(0,variant.anchor)];
  const vehicle = {
    id: 1, transform: { m:[1,0,0,0,1,0,0,0,1], t:[0,0,0] },
    nodes: variant.positions.map((pos,i) => ({ id:i+1, pos:[...pos] })),
    edges: nodeIds.map((n0,i) => ({ n0,n1:nodeIds[(i+1)%nodeIds.length],col:7 })),
    plates: [{ id:1, nodes:boundary, col_front:81, col_back:81, ...(variant.type === 'window' ? { type:'window',glass_impacts:[] } : {}) }],
    plate_paint:[], grids:[{ components:[] }], electric_links:[], mechanical_links:[], liquid_links:[], gas_links:[], belt_links:[], data_links:[], loot_locations:[], creature_locations:[], buoyancy_fill:[0]
  };
  const data = { definitions:{ components:[] }, vehicles:{ vehicles:[vehicle] } };
  const min = [0,1,2].map(axis => Math.min(...variant.positions.map(point => point[axis])) * constants.gridSize);
  const max = [0,1,2].map(axis => Math.max(...variant.positions.map(point => point[axis])) * constants.gridSize);
  const meta = { vehicles:{ vehicles:[{ id:1, transform:structuredClone(vehicle.transform), bounds:{ min,max } }] } };
  const boundaryReport = analyzeNativeWindowFans(vehicle, constants);
  assert.deepEqual(boundaryReport.uniqueMissingWindowBoundaries, []);
  const prediction = predictSingleWindowFan(boundary.map(id => variant.positions[id-1]), constants, { type:variant.type });
  assert.equal(prediction.geometry.planes.groups.length, variant.expectedPlanes);
  // 用真实适配器核对反射/绕序往返不会移动原生扇心；不当作游戏加载测试。
  const imported = prepareNativeImport(parseNativePair(data,meta));
  assert.equal(imported.document.topology.plates.length, 1);
  assert.deepEqual(imported.nativeLoadDiagnostics, []);
  const exported = toNativePairFromEditor(imported.document);
  const roundTrip = exported.data.vehicles.vehicles[0];
  const exportedNodes = new Map(roundTrip.nodes.map(node => [node.id,node.pos]));
  const roundTripPoints = roundTrip.plates[0].nodes.map(id => exportedNodes.get(id));
  assert.deepEqual(roundTripPoints, boundary.map(id => variant.positions[id-1]), 'Native boundary order changed');
  assert.equal(roundTrip.edges.length, vehicle.edges.length);
  assert.equal(roundTrip.plates.length, 1);
  const maxDeviation = prediction.geometry.front.reduce((maximum,point,index) => {
    const planes = prediction.target.planes.groups.filter(group => group.triangles.some(i => prediction.target.triangles[i].includes(index)));
    return Math.max(maximum,...planes.map(plane => Math.abs(point.reduce((sum,item,axis) => sum+item*plane.normal[axis],0)-plane.constant)));
  },0);
  outputs.push({ name:variant.name, data,meta,report:{ boundary,counts:{ nodes:vehicle.nodes.length, beams:vehicle.edges.length, plates:1 },prediction,maxVertexDistanceFromAuthoredSupportingPlanes:maxDeviation,
    verified:['Complete perimeter beams','No interior beam','One native face','Builder native round trip preserves node positions and boundary start'],
    unverified:['Actual game load and same-camera render','Outer frame strips','Physics, picking, shadows, saving and glass breakage'] } });
}
await mkdir(outputParent,{ recursive:true });
const directory = await mkdtemp(path.join(outputParent,'two-plane-probes-'));
const report = { purpose:'Limited two-plane single-face probes, with wrong-anchor and skew-aperture controls. Offline reconstruction; not runtime acceptance.',gameSource:evidence.source,constants,variants:[] };
for (const output of outputs) {
  const bytes = Buffer.from(JSON.stringify(output.data,null,2)+'\n');
  await writeFile(path.join(directory,output.name+'.data'),bytes,{ flag:'wx' });
  await writeFile(path.join(directory,output.name+'.meta'),JSON.stringify(output.meta,null,2)+'\n',{ flag:'wx' });
  report.variants.push({ name:output.name,dataSha256:createHash('sha256').update(bytes).digest('hex'),...output.report });
}
await writeFile(path.join(directory,'report.json'),JSON.stringify(report,null,2)+'\n',{ flag:'wx' });
await writeFile(path.join(directory,'README.txt'),`双平面单面探针：均只有外边界梁和一个面，没有内部梁。
01-two-plane-window：六点双平面窗，扇心在折线端点。离线内缩后仍为两个平面，无内部窗框。
02-wrong-window-anchor：与 01 相同节点和梁，仅将原生边界起点移到外角；离线产生四片平面，作为形状对照。
03-two-plane-solid：与 01 相同轮廓的实体面，核对游戏扇形与无内部梁。
04-diamond-window：四点轮廓的两个三角窗片合为一个窗，折线是内部对角线。
05-trapezoid-window：原始节点仍为两个平面，但不等宽边界经窗内缩后产生第三个平面，作为限制对照。
06-spatial-two-plane-window：整体倾斜的六点折面，法向三个分量均非零，离线三轴分支仍保留两个平面。

请用独立名称导入 data/meta 配对副本，不替换原载具。全部游戏加载和视觉结果待验证。
“无痕”指没有内部梁、窗框或孔隙；不指几何曲率连续。正常外框、支撑偏移和玻璃内缩仍存在。
`,{ flag:'wx' });
console.log(JSON.stringify({ directory,variants:report.variants.map(variant => ({ name:variant.name,...variant.counts,targetPlanes:variant.prediction.target.planes.groups.length,glassOrSolidPlanes:variant.prediction.geometry.planes.groups.length,noOverlap:variant.prediction.geometry.noOverlap,maxPlaneDeviation:variant.maxVertexDistanceFromAuthoredSupportingPlanes })) },null,2));
