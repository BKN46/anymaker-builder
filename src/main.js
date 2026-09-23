import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { AssetLibrary, disposeObject } from './assets/library.js';
import { PublishedAssetLibrary } from './assets/published-library.js';
import { reflectObject } from './assets/geometry-ops.js';
import { History, LIMIT, project, validateDocument, migrateDocument, toIntermediateXml } from './editor/document.js';
import { copyObjects, mirrorObjects, moveObjects, splitGrid, mergeGrids, gridIds } from './editor/operations.js';
import { createNode, moveNode, mergeNodes, createEdge, splitEdge, createPlate, validateTopologyState } from './editor/topology.js';
import { parseNativeData, nativeStats, toNativeData } from './native/anymaker-data.js';
import { toEditorDocument, toEditorTopology } from './editor/model.js';
import { ComponentCatalog } from './catalog/component-catalog.js';
import './style.css';

const $ = s => document.querySelector(s);
const axes = ['x', 'y', 'z'];
const library = new PublishedAssetLibrary(import.meta.env.BASE_URL, new AssetLibrary());
const catalog = new ComponentCatalog(import.meta.env.BASE_URL);
let definitions = new Map();
let selectedType = '';
let selected = null;
let objects = [];
let busy = false;
let tool = 'select';
let snap = .1;
let down = null;
let dragOccurred = false;
let nativeModel = null;
let nativeImportButton = null;
const history = new History([]);
let topology = { nodes: [], edges: [], plates: [] };
const topologyHistory = new History(topology);
let beamStartNode = null;
let plateNodeIds = [];
let selectedTopologyNode = null;

$('#app').innerHTML = '<header class="topbar"><div class="brand"><span>ANY</span>MAKER / BUILDER</div><span class="status" id="save-status" role="status">正在加载定义…</span><nav class="top-actions"><button id="library-btn">导入本地模型</button><button id="new-btn">新建</button><button id="undo-btn">撤销</button><button id="redo-btn">重做</button><button id="save-btn">保存工程</button><button id="load-btn">打开工程</button><button id="export-btn" class="primary">中间格式 XML</button></nav></header>' +
  '<main class="workspace"><aside class="sidebar"><section class="section"><h2>编辑工具</h2><div class="tool-grid" id="tools"></div></section><section class="section"><h2>组件定义 <span id="catalog-count"></span></h2><input class="search" id="component-search" aria-label="搜索组件" placeholder="搜索中文、ID、类别…"><select id="category-filter" aria-label="组件分类"><option value="">全部分类</option></select><div id="component-list"></div></section><section class="section"><h2>工作网格 · 编辑器参数</h2><div class="property"><label for="snap">吸附步长</label><select id="snap"><option value="0.1">0.10</option><option value="0.08">0.08</option><option value="0.25">0.25</option><option value="1">1.00</option><option value="0">关闭</option></select></div><button id="grid-btn">隐藏网格</button><p class="status">左键：当前工具 · 右键拖动：旋转视角<br>中键：平移 · 滚轮：缩放 · F：聚焦<br>Shift + 点击连续放置 · Ctrl / ⌘ + Z：撤销</p></section></aside>' +
  '<section id="viewport" aria-label="三维建造视口"><div class="view-controls"><button data-view="iso">等距</button><button data-view="top">顶视</button><button data-view="front">前视</button><button id="fit-btn">聚焦 F</button></div><div class="notice">研究原型：真实静态 Mesh / 中性材质；未完成视觉 1:1。XML 不是已验证的游戏存档。</div><div class="hud"><span class="badge" id="object-count">0 个组件</span><span class="badge" id="topology-count">0 节点 · 0 梁 · 0 面板</span><span class="badge" id="cursor-pos">工作平面 Y = 0</span></div></section>' +
  '<aside class="inspector"><section class="section"><h2>属性与变换</h2><div id="inspector-content" class="empty">选择组件查看属性。</div></section><section class="section"><h2>资源状态</h2><p class="status" id="asset-status">尚未导入 Mesh。橙色线框仅是缺失资源标记，不代表游戏尺寸。</p><button id="mesh-files-btn" class="full">选择 .mesh 文件</button><p class="status">推荐选择游戏的 rom/meshes 文件夹。只在浏览器读取，不上传、不执行 EXE。仅渲染静态 Mesh，动态部件数量会单独提示。</p></section><section class="section"><h2>游戏文件核对</h2><button id="native-btn" class="full">检查原生 .data / .meta</button><p class="status" id="native-summary">已知 starter_vehicle.data 是 JSON，并非 XML。此入口仅分析结构，不覆盖当前工程。</p></section><section class="section"><h2>校验</h2><div id="validation" class="status"></div></section></aside></main>' +
  '<input id="directory-input" type="file" webkitdirectory multiple hidden><input id="mesh-input" type="file" accept=".mesh" multiple hidden><input id="file-input" type="file" accept=".json" hidden><input id="native-input" type="file" accept=".data,.meta,.json" hidden>';

// Keep the viewport uncluttered: the tool rail is promoted to the top, while
// catalog and inspector stay in one collapsible left drawer.
const nativeExportButton = document.createElement('button');
nativeExportButton.id = 'native-export-btn';
nativeExportButton.className = 'full';
nativeExportButton.textContent = '导出原生 JSON（仅已映射字段）';
nativeExportButton.disabled = true;
nativeImportButton = document.createElement('button');
nativeImportButton.id = 'native-import-btn';
nativeImportButton.className = 'full';
nativeImportButton.textContent = '导入组件到当前场景';
nativeImportButton.disabled = true;
document.querySelector('#native-btn').parentElement.append(nativeImportButton, nativeExportButton);
const topbar = document.querySelector('.topbar');
const sidebar = document.querySelector('.sidebar');
const toolSection = document.querySelector('#tools').closest('.section');
topbar.append(toolSection);
toolSection.classList.add('top-tool-section');
const catalogSection = sidebar.querySelector('.section');
const catalogDetails = document.createElement('details');
catalogDetails.open = true; catalogDetails.className = 'drawer-section';
const catalogSummary = document.createElement('summary'); catalogSummary.textContent = '方块库';
catalogDetails.append(catalogSummary, catalogSection); sidebar.prepend(catalogDetails);
const inspector = document.querySelector('.inspector');
const inspectorEditor = inspector.querySelector('.section');
const editorDetails = document.createElement('details');
editorDetails.className = 'drawer-section inspector-drawer';
const editorSummary = document.createElement('summary'); editorSummary.textContent = '选中方块属性';
editorDetails.append(editorSummary, inspectorEditor);
const resourceDetails = document.createElement('details'); resourceDetails.className = 'drawer-section';
const resourceSummary = document.createElement('summary'); resourceSummary.textContent = '资源与校验'; resourceDetails.append(resourceSummary);
for (const section of [...inspector.querySelectorAll('.section')]) resourceDetails.append(section);
inspector.replaceChildren(editorDetails, resourceDetails);
sidebar.append(inspector);

const tools = [['select', '选择', 'V'], ['place', '放置', 'P'], ['erase', '删除', 'E'], ['translate', '移动', 'G'], ['rotate', '旋转', 'R'], ['scale', '缩放', 'S'], ['node', '节点', 'N'], ['beam', '梁', 'B'], ['plate', '面板', 'L']];
for (const [id, name, key] of tools) {
  const button = document.createElement('button');
  button.className = 'tool'; button.dataset.tool = id;
  const icons = { select: '↖', place: '＋', erase: '⌫', translate: '✥', rotate: '⟳', scale: '⤢', node: '●', beam: '／', plate: '◇' };
  button.innerHTML = '<span class="tool-icon">' + icons[id] + '</span><span class="tool-label">' + name + '</span><kbd>' + key + '</kbd>';
  button.addEventListener('click', () => setTool(id));
  $('#tools').append(button);
}

// Structural operations are commands, so each action creates one history
// snapshot and can be undone as a complete copy/mirror/split/merge operation.
const structuralActions = [
  ['copy-action', '⧉', '复制选中'],
  ['mirror-action', '⇋', '镜像 X'],
  ['split-action', '⌘', '拆分子网格'],
  ['merge-action', '⊕', '合并子网格'],
];
const actionHost = document.querySelector('.top-actions');
for (const [id, icon, label] of structuralActions) {
  const button = document.createElement('button');
  button.id = id; button.className = 'icon-action'; button.title = label; button.setAttribute('aria-label', label);
  button.textContent = icon; actionHost.append(button);
}

const viewport = $('#viewport');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(45, 1, .005, 2000);
camera.position.set(2.5, 2.2, 3);
let renderer;
try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
catch { viewport.textContent = '无法初始化 WebGL2。请启用硬件加速或更换浏览器。'; throw new Error('WebGL2 unavailable'); }
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
viewport.append(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.mouseButtons = { LEFT: null, MIDDLE: THREE.MOUSE.PAN, RIGHT: THREE.MOUSE.ROTATE };
controls.enableDamping = true;
controls.target.set(0, .2, 0);
const transform = new TransformControls(camera, renderer.domElement);
transform.setSize(.75);
scene.add(transform.getHelper());
transform.addEventListener('dragging-changed', e => {
  controls.enabled = !e.value;
  if (e.value) dragOccurred = true;
  else { commit(); inspect(); }
});
scene.add(new THREE.HemisphereLight(0xc5e4ff, 0x26384e, 2.2));
const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(4, 8, 5); light.castShadow = true; scene.add(light);
const grid = new THREE.GridHelper(20, 200, 0x426780, 0x203345);
grid.position.y = -.002; scene.add(grid);
const topologyLayer = new THREE.Group();
topologyLayer.name = 'topology-overlay';
scene.add(topologyLayer);
const topologyMaterials = {
  node: new THREE.MeshBasicMaterial({ color: 0x246bce }),
  edge: new THREE.LineBasicMaterial({ color: 0x246bce }),
  plate: new THREE.MeshBasicMaterial({ color: 0x76a9e8, transparent: true, opacity: .24, side: THREE.DoubleSide }),
};
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

function clearTopologyVisual() {
  for (const child of topologyLayer.children) {
    child.traverse(object => { if (object.geometry) object.geometry.dispose(); });
  }
  topologyLayer.clear();
}
function renderTopology() {
  clearTopologyVisual();
  const byId = new Map(topology.nodes.map(node => [node.id, node]));
  const nodeGeometry = new THREE.SphereGeometry(.055, 10, 8);
  for (const node of topology.nodes) {
    const marker = new THREE.Mesh(nodeGeometry.clone(), topologyMaterials.node);
    marker.position.set(node.position.x, node.position.y, node.position.z);
    marker.userData.topology = 'node'; marker.userData.nodeId = node.id;
    topologyLayer.add(marker);
  }
  nodeGeometry.dispose();
  for (const edge of topology.edges) {
    const a = byId.get(edge.a); const b = byId.get(edge.b);
    if (!a || !b) continue;
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(a.position.x, a.position.y, a.position.z),
      new THREE.Vector3(b.position.x, b.position.y, b.position.z),
    ]);
    const line = new THREE.Line(geometry, topologyMaterials.edge);
    line.userData.topology = 'edge'; line.userData.edgeId = edge.id;
    topologyLayer.add(line);
  }
  for (const plate of topology.plates) {
    const points = plate.nodeIds.map(id => byId.get(id)).filter(Boolean);
    if (points.length < 3) continue;
    const vertices = [];
    for (let index = 1; index < points.length - 1; index++) {
      for (const point of [points[0], points[index], points[index + 1]]) vertices.push(point.position.x, point.position.y, point.position.z);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    const mesh = new THREE.Mesh(geometry, topologyMaterials.plate);
    mesh.userData.topology = 'plate'; mesh.userData.plateId = plate.id;
    topologyLayer.add(mesh);
  }
}
function restoreTopology(value = { nodes: [], edges: [], plates: [] }) {
  topology = validateTopologyState(value);
  renderTopology();
  refresh();
}

function status(message) { $('#save-status').textContent = message; }
function setTool(value) {
  if (busy) return;
  tool = value;
  document.querySelectorAll('.tool').forEach(b => b.classList.toggle('active', b.dataset.tool === tool));
  transform.detach();
  if (value !== 'beam') beamStartNode = null;
  if (value !== 'plate') plateNodeIds = [];
  if (value !== 'node') selectedTopologyNode = null;
  if (selected && ['translate', 'rotate', 'scale'].includes(tool)) {
    transform.setMode(tool); transform.attach(selected);
  }
}
function setSnap() {
  transform.setTranslationSnap(snap || null);
  transform.setRotationSnap(snap ? Math.PI / 2 : null);
  transform.setScaleSnap(snap ? .1 : null);
}
function select(object) {
  selected = object;
  setTool(tool);
  inspect();
}
function snapshot() {
  return objects.map(o => ({ id: o.userData.id, type: o.userData.type,
    ...(o.userData.gridId ? { gridId: o.userData.gridId } : {}),
    ...(o.userData.mirror ? { mirror: { ...o.userData.mirror } } : {}),
    position: Object.fromEntries(axes.map(a => [a, o.position[a]])),
    rotation: Object.fromEntries(axes.map(a => [a, o.rotation[a]])),
    scale: Object.fromEntries(axes.map(a => [a, Math.abs(o.scale[a])])) }));
}
function commit() {
  // TransformControls may cross zero when scaling; keep the project domain valid.
  if (selected) axes.forEach(a => {
    const sign = Math.sign(selected.scale[a]) || 1;
    selected.scale[a] = sign * THREE.MathUtils.clamp(Math.abs(selected.scale[a]), .001, 100);
  });
  history.commit(snapshot());
  topologyHistory.commit(topology);
  refresh();
}
function refresh() {
  $('#object-count').textContent = objects.length + ' 个组件';
  $('#topology-count').textContent = topology.nodes.length + ' 节点 · ' + topology.edges.length + ' 梁 · ' + topology.plates.length + ' 面板';
  $('#undo-btn').disabled = busy || (history.cursor === 0 && topologyHistory.cursor === 0);
  $('#redo-btn').disabled = busy || (history.cursor === history.entries.length - 1 && topologyHistory.cursor === topologyHistory.entries.length - 1);
  const missing = objects.filter(o => o.userData.visual !== 'mesh').length;
  $('#validation').textContent = (missing ? missing + ' 个组件没有真实 Mesh。' : '静态几何已加载。') + ' 连接拓扑、占用规则、动态装配和游戏文件兼容性尚未验证。';
}
async function transact(operation) {
  if (busy) return;
  busy = true; transform.enabled = false; refresh();
  try { await operation(); } catch (error) { status('操作失败：' + error.message); }
  finally { busy = false; transform.enabled = true; setTool(tool); refresh(); }
}
async function createObject(data) {
  const def = await catalog.definition(data.type);
  definitions.set(data.type, def);
  const object = await library.instantiate(def);
  object.userData = { ...object.userData, id: data.id, type: data.type, gridId: data.gridId, mirror: data.mirror };
  for (const field of ['position', 'rotation', 'scale']) object[field].set(...axes.map(a => data[field][a]));
  if (data.mirror?.axis) reflectObject(object, data.mirror.axis);
  return object;
}
async function restore(items, nextTopology = topology) {
  // Prepare everything first; malformed assets/imports cannot partially clear a build.
  const next = [];
  try { for (const data of items) next.push(await createObject(data)); }
  catch (error) { next.forEach(disposeObject); throw error; }
  transform.detach(); selected = null;
  objects.forEach(o => { scene.remove(o); disposeObject(o); });
  objects = next; objects.forEach(o => scene.add(o));
  restoreTopology(nextTopology);
  inspect(); refresh();
}
async function place(point) {
  if (!catalog.has(selectedType)) throw new Error('请先选择组件');
  if (objects.length >= LIMIT) throw new Error('达到组件上限');
  const object = await createObject({ id: crypto.randomUUID(), type: selectedType, gridId: 'grid-1', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } });
  const box = new THREE.Box3().setFromObject(object);
  object.position.copy(point);
  if (snap) { object.position.x = Math.round(point.x / snap) * snap; object.position.z = Math.round(point.z / snap) * snap; }
  object.position.y -= box.min.y;
  scene.add(object); objects.push(object); selected = object;
  commit(); inspect();
  status(object.userData.visual === 'mesh' ? '已放置真实静态 Mesh' : '已放置缺失资源标记');
}
function remove(object) {
  if (!object || busy) return;
  transform.detach(); if (selected === object) selected = null;
  scene.remove(object); disposeObject(object);
  objects = objects.filter(o => o !== object); commit(); inspect();
}
async function applyStructural(result, selectedId, message) {
  await restore(result.objects);
  selected = selectedId ? objects.find(object => object.userData.id === selectedId) || null : null;
  commit(); inspect(); status(message);
}
function selectedIds() { return selected ? [selected.userData.id] : []; }
function structuralCopy() {
  if (!selected || busy) return;
  transact(async () => {
    const result = copyObjects(snapshot(), selectedIds(), { x: snap || 1, y: 0, z: 0 });
    await applyStructural(result, result.created[0], '已复制组件');
  });
}
function structuralMirror() {
  if (!selected || busy) return;
  transact(async () => {
    const result = mirrorObjects(snapshot(), selectedIds(), { axis: 'x', offset: 0 });
    await applyStructural(result, result.created[0], '已镜像组件（X 平面）');
  });
}
function structuralSplit() {
  if (!selected || busy) return;
  const gridId = prompt('新子网格 ID', `grid-${gridIds(snapshot()).length + 1}`);
  if (!gridId) return;
  transact(async () => {
    const result = splitGrid(snapshot(), selectedIds(), gridId);
    await applyStructural(result, selected.userData.id, '已拆分到子网格 ' + gridId);
  });
}
function structuralMerge() {
  if (busy || !objects.length) return;
  transact(async () => {
    const current = snapshot();
    const ids = gridIds(current);
    if (!ids.length) throw new Error('当前工程尚未建立子网格');
    const result = mergeGrids(current, ids, 'grid-1');
    await applyStructural(result, selected?.userData.id, '已合并子网格');
  });
}
$('#copy-action').onclick = structuralCopy;
$('#mirror-action').onclick = structuralMirror;
$('#split-action').onclick = structuralSplit;
$('#merge-action').onclick = structuralMerge;
function undo() {
  const objectValue = history.peekUndo();
  const topologyValue = topologyHistory.peekUndo();
  if (!objectValue && !topologyValue) return;
  if (!objectValue && topologyValue) { topologyHistory.cursor--; restoreTopology(topologyValue); status('已撤销拓扑操作'); return; }
  if (!topologyValue || history.cursor > topologyHistory.cursor) {
    transact(async () => { await restore(objectValue, topology); history.cursor--; status('已撤销'); });
    return;
  }
  transact(async () => { await restore(objectValue, topologyValue); history.cursor--; topologyHistory.cursor--; status('已撤销'); });
}
function redo() {
  const objectValue = history.peekRedo();
  const topologyValue = topologyHistory.peekRedo();
  if (!objectValue && !topologyValue) return;
  if (!objectValue && topologyValue) { topologyHistory.cursor++; restoreTopology(topologyValue); status('已重做拓扑操作'); return; }
  if (!topologyValue || history.cursor > topologyHistory.cursor) {
    transact(async () => { await restore(objectValue, topology); history.cursor++; status('已重做'); });
    return;
  }
  transact(async () => { await restore(objectValue, topologyValue); history.cursor++; topologyHistory.cursor++; status('已重做'); });
}

function inspect() {
  const host = $('#inspector-content'); host.replaceChildren();
  if (!selected) { host.textContent = '选择组件查看属性。'; return; }
  const object = selected;
  const def = definitions.get(object.userData.type);
  const title = document.createElement('strong'); title.textContent = def.name_zh || def.name; host.append(title);
  const metadata = document.createElement('p'); metadata.className = 'status';
  metadata.textContent = def.id + ' · ' + object.userData.reason + (object.userData.vertices ? ' · ' + object.userData.vertices + ' 顶点 / ' + object.userData.triangles + ' 三角形' : '') + ' · 子网格 ' + (object.userData.gridId || '未分配') + ' · 动态部件 ' + (def.meshes_dynamic?.length || 0) + '（按需装配）';
  host.append(metadata);
  for (const [field, label] of [['position', '位置'], ['rotation', '旋转 °'], ['scale', '缩放']]) {
    const row = document.createElement('div'); row.className = 'property';
    const heading = document.createElement('span'); heading.textContent = label; row.append(heading);
    const group = document.createElement('div'); group.className = 'transform-grid';
    for (const axis of axes) {
      const label = document.createElement('label'); label.textContent = axis.toUpperCase();
      const input = document.createElement('input'); input.type = 'number'; input.step = field === 'rotation' ? '90' : '.01';
      input.dataset.field = field; input.dataset.axis = axis; input.setAttribute('aria-label', field + '-' + axis);
      input.value = Number(field === 'rotation' ? THREE.MathUtils.radToDeg(object[field][axis]) : object[field][axis]).toFixed(4);
      input.addEventListener('change', () => {
        const value = Number(input.value);
        if (busy || !input.value.trim() || !Number.isFinite(value) || Math.abs(value) > 10000 || (field === 'scale' && (value <= 0 || value > 100))) { status('输入超出合法范围'); inspect(); return; }
        object[field][axis] = field === 'rotation' ? THREE.MathUtils.degToRad(value) : value;
        commit(); inspect();
      });
      label.append(input); group.append(label);
    }
    row.append(group); host.append(row);
  }
  const details = document.createElement('details');
  const summary = document.createElement('summary'); summary.textContent = '原始定义 / 端口 / 动态部件'; details.append(summary);
  const pre = document.createElement('pre'); pre.textContent = JSON.stringify(def, null, 2); details.append(pre); host.append(details);
  const button = document.createElement('button'); button.className = 'full'; button.textContent = '删除组件'; button.id = 'delete-selected'; button.onclick = () => remove(object); host.append(button);
}

function renderCatalog() {
  const query = $('#component-search').value.trim().toLowerCase();
  const category = $('#category-filter').value;
  const host = $('#component-list'); host.replaceChildren();
  const filtered = [...catalog.entries()].filter(d => (!category || d.category === category) && [d.id, d.name, d.name_zh, d.category].join(' ').toLowerCase().includes(query));
  $('#catalog-count').textContent = filtered.length + ' / ' + catalog.index.size;
  for (const def of filtered) {
    const button = document.createElement('button'); button.className = 'component'; button.dataset.id = def.id;
    button.classList.toggle('active', selectedType === def.id);
    const text = document.createElement('span'); text.textContent = def.name_zh || def.name;
    const id = document.createElement('small'); id.textContent = def.id; text.append(id);
    button.append(text);
    button.onclick = () => { if (busy) return; selectedType = def.id; setTool('place'); renderCatalog(); status('准备放置：' + (def.name_zh || def.name)); };
    host.append(button);
  }
}
async function loadCatalog() {
  const data = await catalog.load();
  selectedType = catalog.has('engine') ? 'engine' : catalog.index.keys().next().value;
  for (const category of [...new Set(data.definitions.map(d => d.category))].sort()) {
    const option = document.createElement('option'); option.value = category; option.textContent = category; $('#category-filter').append(option);
  }
  renderCatalog(); status('已加载 ' + catalog.index.size + ' 条组件索引，详情按需读取');
}

function pointerRay(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
}
function pick() {
  let object = raycaster.intersectObjects(objects, true)[0]?.object;
  while (object && !objects.includes(object)) object = object.parent;
  return object || null;
}
function pickTopologyNode() {
  return raycaster.intersectObjects(topologyLayer.children, true)
    .map(hit => hit.object)
    .find(object => object.userData.topology === 'node')?.userData.nodeId || null;
}
function topologyPoint(point) {
  const value = { x: point.x, y: point.y, z: point.z };
  if (snap) {
    value.x = Math.round(value.x / snap) * snap;
    value.y = Math.round(value.y / snap) * snap;
    value.z = Math.round(value.z / snap) * snap;
  }
  return value;
}
function commitTopology(next, message) {
  topology = validateTopologyState(next);
  renderTopology();
  topologyHistory.commit(topology);
  refresh();
  status(message + '（' + topology.nodes.length + ' 节点）');
}
function handleTopologyClick(point) {
  const nodeId = pickTopologyNode();
  if (tool === 'node') {
    if (nodeId) {
      selectedTopologyNode = nodeId;
      status('已选择节点 ' + nodeId + '，点击空白位置移动');
      return true;
    }
    if (selectedTopologyNode) {
      const result = moveNode(topology.nodes, selectedTopologyNode, topologyPoint(point));
      commitTopology({ ...topology, nodes: result.nodes }, '已移动节点');
      selectedTopologyNode = null;
      return true;
    }
    commitTopology({ ...topology, nodes: createNode(topology.nodes, topologyPoint(point)).nodes }, '已创建节点');
    return true;
  }
  if (tool === 'beam') {
    if (!nodeId) { status('梁工具需要点击已有节点'); return true; }
    if (!beamStartNode) { beamStartNode = nodeId; status('已选择梁起点，请选择终点'); return true; }
    try {
      const result = createEdge(topology.edges, beamStartNode, nodeId);
      commitTopology({ ...topology, edges: result.edges }, '已创建梁');
      beamStartNode = null;
    } catch (error) { status('梁创建失败：' + error.message); }
    return true;
  }
  if (tool === 'plate') {
    if (!nodeId) { status('面板工具需要点击已有节点'); return true; }
    if (plateNodeIds.includes(nodeId)) return true;
    plateNodeIds.push(nodeId);
    if (plateNodeIds.length < 3) { status(`面板已选择 ${plateNodeIds.length} 个节点`); return true; }
    try {
      const result = createPlate(topology.plates, plateNodeIds, topology.nodes);
      commitTopology({ ...topology, plates: result.plates }, '已创建面板');
      plateNodeIds = [];
    } catch (error) { status('面板创建失败：' + error.message); plateNodeIds = []; }
    return true;
  }
  return false;
}
renderer.domElement.addEventListener('contextmenu', e => e.preventDefault());
renderer.domElement.addEventListener('pointerdown', event => {
  if (event.button !== 0 || busy) return;
  dragOccurred = transform.dragging;
  down = { x: event.clientX, y: event.clientY };
});
renderer.domElement.addEventListener('pointermove', event => {
  pointerRay(event);
  const point = raycaster.ray.intersectPlane(plane, new THREE.Vector3());
  if (point) $('#cursor-pos').textContent = 'X ' + point.x.toFixed(2) + ' · Y 0 · Z ' + point.z.toFixed(2);
});
renderer.domElement.addEventListener('pointerup', event => {
  if (!down || event.button !== 0) return;
  const moved = Math.hypot(event.clientX - down.x, event.clientY - down.y); down = null;
  if (busy || dragOccurred || moved > 5 || (transform.axis && ['translate', 'rotate', 'scale'].includes(tool))) return;
  pointerRay(event);
  if (['node', 'beam', 'plate'].includes(tool)) {
    const point = raycaster.ray.intersectPlane(plane, new THREE.Vector3());
    if (point && point.length() <= 1000) handleTopologyClick(point);
    return;
  }
  if (tool === 'place') {
    const point = raycaster.ray.intersectPlane(plane, new THREE.Vector3());
    if (!point || point.length() > 1000) return;
    transact(async () => { await place(point); if (!event.shiftKey) tool = 'select'; });
  } else if (tool === 'erase') remove(pick());
  else select(pick());
});
renderer.domElement.addEventListener('pointercancel', () => { down = null; });

function fit() {
  const box = new THREE.Box3();
  if (selected) box.expandByObject(selected); else objects.forEach(o => box.expandByObject(o));
  if (box.isEmpty()) { controls.target.set(0, .2, 0); camera.position.set(2.5, 2.2, 3); return; }
  const center = box.getCenter(new THREE.Vector3());
  const distance = Math.max(.4, box.getSize(new THREE.Vector3()).length() / Math.sin(camera.fov * Math.PI / 360));
  camera.position.copy(center).add(new THREE.Vector3(1, .8, 1).normalize().multiplyScalar(distance));
  controls.target.copy(center); controls.update();
}
$('#fit-btn').onclick = fit;
for (const button of document.querySelectorAll('[data-view]')) button.onclick = () => {
  const distance = Math.max(.5, camera.position.distanceTo(controls.target));
  const direction = button.dataset.view === 'top' ? new THREE.Vector3(0, 1, .00001) : button.dataset.view === 'front' ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(1, .8, 1).normalize();
  camera.position.copy(controls.target).addScaledVector(direction, distance); controls.update();
};
$('#snap').onchange = e => { snap = Number(e.target.value); setSnap(); };
$('#grid-btn').onclick = () => { grid.visible = !grid.visible; $('#grid-btn').textContent = grid.visible ? '隐藏网格' : '显示网格'; };
$('#component-search').oninput = renderCatalog;
$('#category-filter').onchange = renderCatalog;
$('#undo-btn').onclick = undo; $('#redo-btn').onclick = redo;
$('#new-btn').onclick = () => { if (!busy && (!objects.length || confirm('清空当前工程？此操作可以撤销。'))) transact(async () => { await restore([]); commit(); }); };

function download(content, name, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement('a'); a.href = url; a.download = name; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function currentProject() { return validateDocument(project(snapshot(), topology), catalog.index); }
$('#save-btn').onclick = () => { if (!busy) download(JSON.stringify(currentProject(), null, 2), 'anymaker-project.json', 'application/json'); };
$('#export-btn').onclick = () => { if (!busy) { download(toIntermediateXml(currentProject()), 'anymaker-intermediate.xml', 'application/xml'); status('已导出中间 XML；不能作为已验证游戏存档使用'); } };
$('#load-btn').onclick = () => $('#file-input').click();
$('#file-input').onchange = e => {
  const file = e.target.files[0]; e.target.value = ''; if (!file) return;
  transact(async () => {
    if (file.size > 10 * 1024 * 1024) throw new Error('工程文件超过 10 MiB');
    const document = migrateDocument(JSON.parse(await file.text()), catalog.index);
    await restore(document.objects, document.topology); commit(); fit(); status('工程已加载');
  });
};

$('#library-btn').onclick = () => $('#directory-input').click();
$('#mesh-files-btn').onclick = () => $('#mesh-input').click();
for (const selector of ['#directory-input', '#mesh-input']) $(selector).onchange = e => {
  const files = [...e.target.files]; e.target.value = ''; if (!files.length) return;
  transact(async () => {
    const n = library.register(files);
    $('#asset-status').textContent = '本地已登记 ' + n + ' 个 Mesh。按组件请求解码，不上传。材质、动态装配尚未还原。';
    await restore(snapshot()); fit(); status('模型库已登记；选择组件并在视口点击放置');
  });
};

$('#native-btn').onclick = () => $('#native-input').click();
$('#native-input').onchange = async e => {
  const file = e.target.files[0]; e.target.value = ''; if (!file) return;
  try {
    if (file.size > 20 * 1024 * 1024) throw new Error('文件超过 20 MiB');
    const data = JSON.parse(await file.text());
    nativeModel = parseNativeData(data);
    const nativeModelStats = nativeStats(nativeModel);
    $('#native-summary').dataset.domainStats = JSON.stringify(nativeModelStats);
    nativeExportButton.disabled = false;
    nativeImportButton.disabled = false;
    const vehicles = data.vehicles?.vehicles;
    if (!Array.isArray(vehicles)) throw new Error('没有 vehicles.vehicles 数组');
    $('#native-summary').textContent = vehicles.map(v => '载具 ' + v.id + '：' + (v.nodes?.length || 0) + ' 节点 / ' + (v.edges?.length || 0) + ' 梁 / ' + (v.plates?.length || 0) + ' 面板 / ' + (v.grids?.length || 0) + ' 网格 / ' + (v.grids || []).reduce((n, g) => n + (g.components?.length || 0), 0) + ' 组件').join('；') + '。这是 JSON；当前仅做结构检查，未导入建造场景。';
  } catch (error) { $('#native-summary').textContent = '无法检查：' + error.message; }
};

nativeImportButton.onclick = () => {
  status('正在导入原生组件');
  if (!nativeModel || busy) { status(!nativeModel ? '原生模型尚未加载' : '当前操作仍在进行'); return; }
  transact(async () => {
    const document = validateDocument(toEditorDocument(nativeModel), catalog.index);
    await restore(document.objects, toEditorTopology(nativeModel));
    commit(); fit();
    status('已将原生 JSON 的组件导入当前场景；节点、梁、面板和连接仍保留在领域模型中');
  });
};

nativeExportButton.onclick = () => {
  if (!nativeModel) return;
  try {
    const exported = toNativeData(nativeModel, { strict: false });
    download(JSON.stringify(exported.value, null, 2), 'anymaker-native.data', 'application/json');
    status(exported.diagnostics.length ? '已导出 JSON，存在未映射字段诊断' : '已导出原生 JSON 结构');
  } catch (error) { status('原生导出失败：' + error.message); }
};

window.addEventListener('keydown', e => {
  if (e.target instanceof HTMLElement && (e.target.matches('input,textarea,select') || e.target.isContentEditable)) return;
  if (busy) return;
  const key = e.key.toLowerCase();
  if (e.ctrlKey || e.metaKey) { if (key === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); } else if (key === 'y') { e.preventDefault(); redo(); } return; }
  const binding = tools.find(t => t[2].toLowerCase() === key);
  if (binding) setTool(binding[0]);
  if (key === 'delete' || key === 'backspace') {
    e.preventDefault();
    if (selectedTopologyNode) {
      const id = selectedTopologyNode;
      const nodes = topology.nodes.filter(node => node.id !== id);
      const edges = topology.edges.filter(edge => edge.a !== id && edge.b !== id);
      const plates = topology.plates.filter(plate => !plate.nodeIds.includes(id));
      commitTopology({ nodes, edges, plates }, '已删除节点及其关联拓扑');
      selectedTopologyNode = null;
    } else remove(selected);
  }
  if (key === 'f') fit();
  if (key === 'escape') { select(null); setTool('select'); }
});
const resize = () => { const w = viewport.clientWidth, h = viewport.clientHeight; camera.aspect = w / Math.max(h, 1); camera.updateProjectionMatrix(); renderer.setSize(w, h, false); };
new ResizeObserver(resize).observe(viewport);
setTool('select'); setSnap(); refresh(); resize();
loadCatalog().catch(error => status(error.message));
renderer.setAnimationLoop(() => { controls.update(); renderer.render(scene, camera); });
