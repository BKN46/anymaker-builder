import test from 'node:test';
import assert from 'node:assert/strict';
import { predictSingleWindowFan } from '../scripts/lib/single-window-fan.mjs';
import { parseNativePair, toNativePairFromEditor } from '../src/native/anymaker-data.js';
import { prepareNativeImport } from '../src/native/import-document.js';

const constants = { gridSize:.08, windowInset:.04, frameWidth:.01, plateThickness:.01 };
const strip = () => [[0,0,-6],[8,4,-6],[8,4,6],[0,0,6],[-8,4,6],[-8,4,-6]];
const rotateStart = (points,index) => [...points.slice(index),...points.slice(0,index)];
const near = (a,b) => assert.ok(Math.abs(a-b)<1e-9, `${a} differs from ${b}`);
const length = value => Math.hypot(...value);
const sub = (a,b) => a.map((value,i)=>value-b[i]);

test('a single six-node window at a crease endpoint preserves a connected two-plane glass aperture', () => {
  const points = strip(); const before = structuredClone(points);
  const predicted = predictSingleWindowFan(points,constants);
  assert.deepEqual(points,before);
  assert.equal(predicted.target.planes.groups.length,2);
  assert.equal(predicted.geometry.planes.groups.length,2);
  assert.deepEqual(predicted.geometry.planes.groups.map(group=>group.triangles),[[0,1],[2,3]]);
  assert.equal(predicted.geometry.noOverlap,true);
  // 两侧共用同一个 0–3 内侧折线，四个三角的连接不靠坐标近似。
  assert.deepEqual(predicted.geometry.triangles,[[0,2,1],[0,3,2],[0,4,3],[0,5,4]]);
  assert.ok(predicted.geometry.internalEdges.some(([a,b])=>a===0&&b===3));
  assert.deepEqual(predicted.geometry.internalFrameEdges,[]);
  assert.ok(predicted.geometry.frameBoundaryEdges.every(([a,b])=>Math.abs(a-b)===1||Math.abs(a-b)===5));
  // 折线保留方向；端点按游戏内缩移动，但没有在左右两面分配不同折线位置。
  near(predicted.geometry.front[0][0],predicted.geometry.front[3][0]);
  near(predicted.geometry.front[0][1],predicted.geometry.front[3][1]);
  predicted.geometry.front.forEach((point,i)=>near(length(sub(point,predicted.geometry.back[i])),.01));
});

test('both crease endpoints and reversed winding keep two planes while corner anchors change the surface', () => {
  for (const points of [strip(),rotateStart(strip(),3),[strip()[0],...strip().slice(1).reverse()]]) {
    const result = predictSingleWindowFan(points,constants);
    assert.equal(result.target.planes.groups.length,2);
    assert.equal(result.geometry.planes.groups.length,2);
    assert.equal(result.geometry.noOverlap,true);
  }
  const corner = predictSingleWindowFan(rotateStart(strip(),1),constants);
  assert.equal(corner.target.planes.groups.length,4);
  assert.equal(corner.geometry.planes.groups.length,4);
  assert.equal(corner.geometry.noOverlap,false);
  const axis = predictSingleWindowFan(rotateStart(strip(),2),constants);
  assert.equal(axis.axes,1); assert.equal(axis.geometry,null);
});

test('a rotated straight extrusion also keeps two planes through the native three-axis branch', () => {
  const matrix = [[-2,2,1],[1,2,-2],[-2,-1,-2]];
  const points = strip().map(point=>[point[0],point[1] ? 3 : 0,point[2]]).map(point=>matrix.map(row=>row.reduce((sum,value,i)=>sum+value*point[i],0)));
  const result = predictSingleWindowFan(points,constants);
  assert.equal(result.axes,3);
  assert.equal(result.target.planes.groups.length,2);
  assert.equal(result.geometry.planes.groups.length,2);
  assert.equal(result.geometry.noOverlap,true);
});

test('two authored planar trapezoids can become three glass planes after native inset', () => {
  const points = strip(); points[4]=[-4,2,6];
  const result = predictSingleWindowFan(points,constants);
  assert.equal(result.target.planes.groups.length,2);
  assert.equal(result.geometry.planes.groups.length,3);
  assert.equal(result.geometry.noOverlap,true);
});

test('a four-node folded diamond becomes exactly two connected glass triangles', () => {
  const result = predictSingleWindowFan([[0,0,-6],[8,4,0],[0,0,6],[-8,4,0]],constants);
  assert.equal(result.geometry.planes.groups.length,2);
  assert.equal(result.geometry.noOverlap,true);
  assert.deepEqual(result.geometry.triangles,[[0,2,1],[0,3,2]]);
  assert.deepEqual(result.geometry.internalEdges,[[0,2]]);
});

test('solid native fan keeps authored plane positions while window inset changes them', () => {
  const solid = predictSingleWindowFan(strip(),constants,{ type:'solid' });
  assert.deepEqual(solid.geometry.front,solid.target.points);
  assert.equal(solid.geometry.planes.groups.length,2);
  const window = predictSingleWindowFan(strip(),constants);
  const firstPlane = window.target.planes.groups[0];
  const secondPlane = window.target.planes.groups[1];
  const distance = (point,plane)=>Math.abs(point.reduce((sum,value,i)=>sum+value*plane.normal[i],0)-plane.constant);
  near(distance(window.geometry.front[1],firstPlane),0);
  assert.ok(distance(window.geometry.front[4],secondPlane)>.04);
  const normalSize = predictSingleWindowFan(strip(),constants);
  const wideSize = predictSingleWindowFan(strip(),constants,{ firstBeamSize:1 });
  normalSize.offset.forEach((value,i)=>near(wideSize.offset[i],value*3));
});

test('native Builder round trip preserves the crease endpoint as fan anchor without inserting a beam', () => {
  const points = strip(); const ids = points.map((_,i)=>i+1);
  const vehicle = {
    id:1, nodes:points.map((pos,i)=>({ id:i+1,pos })), edges:ids.map((n0,i)=>({ n0,n1:ids[(i+1)%ids.length] })),
    plates:[{ id:1,nodes:ids,type:'window',glass_impacts:[] }], grids:[{ components:[] }]
  };
  const data = { definitions:{ components:[] },vehicles:{ vehicles:[vehicle] } };
  const meta = { vehicles:{ vehicles:[{ id:1 }] } };
  let imported = prepareNativeImport(parseNativePair(data,meta));
  assert.deepEqual(imported.nativeLoadDiagnostics,[]);
  for (let i=0;i<2;i++) {
    const pair = toNativePairFromEditor(imported.document);
    const output = pair.data.vehicles.vehicles[0];
    const nodes = new Map(output.nodes.map(node=>[node.id,node.pos]));
    const loop = output.plates[0].nodes.map(id=>nodes.get(id));
    assert.deepEqual(loop,points); assert.equal(output.plates.length,1); assert.equal(output.edges.length,6);
    assert.equal(predictSingleWindowFan(loop,constants).geometry.planes.groups.length,2);
    imported = prepareNativeImport(parseNativePair(pair.data,pair.meta));
  }
});

test('single-fan research rejects bad positions, duplicate corners and self crossing contours atomically', () => {
  const bad = [strip().map(point=>[...point])]; bad[0][0][0]=Infinity;
  const duplicate = strip(); duplicate[2]=[...duplicate[1]]; bad.push(duplicate);
  const crossing = strip(); [crossing[1],crossing[4]]=[crossing[4],crossing[1]]; bad.push(crossing);
  for (const points of bad) {
    const before=structuredClone(points);
    assert.throws(()=>predictSingleWindowFan(points,constants)); assert.deepEqual(points,before);
  }
});
