import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { AssetLibrary, disposeObject } from './assets/library.js';
import { PublishedAssetLibrary } from './assets/published-library.js';
import { reflectObject } from './assets/geometry-ops.js';
import { History, LIMIT, project, validateDocument, migrateDocument, toIntermediateXml } from './editor/document.js';
import { copyObjects, mirrorObjects, moveObjects, removeObjects, splitGrid, mergeGrids, gridIds } from './editor/operations.js';
import { createNode, moveNodeAndMerge, mergeNodes, removeNode, removeEdge, removePlate, createBeam, edgeSplitPoints, splitEdge, createPlate } from './editor/topology.js';
import { CELL_SIZE_WORLD, assertGridVector, cellToWorld, quantizeWorldVector, worldToCell } from './editor/grid.js';
import { GRID_SIZE, GRID_DIVISIONS, STRUCTURE_COLOR, cameraBuildFrame, projectBuildPoint, resolveBeamPoint, createBeamMesh, updateBeamMesh } from './editor/construction-view.js';
import { createBeamRuler } from './editor/beam-ruler.js';
import { parseNativePair, nativeStats, toNativeData } from './native/anymaker-data.js';
import { toEditorDocument, toEditorTopology } from './editor/model.js';
import { ComponentCatalog } from './catalog/component-catalog.js';
import { categoryInfo, createCategoryIcon } from './catalog/category-icons.js';
import { getLocale, setLocale, t, applyTranslations, setText, addMessages } from './i18n.js';
import { createLocalStore, normalizeSettings } from './editor/local-storage.js';
import { startLocalSession } from './editor/local-session.js';
import { createOrientationIndicator, orientCamera, applyGridStyle } from './editor/view-settings.js';
import { editorMessages } from './editor/ui-messages.js';
import './style.css';

addMessages(editorMessages);
const localStore = createLocalStore(() => window.localStorage, location.pathname);
const storedSettings = localStore.loadSettings();
const settings = storedSettings.settings;
setLocale(settings.language);
let preferencesReady = false;
let settingsTimer = null;
let localSession = null;
const $ = s => document.querySelector(s);
const axes = ['x', 'y', 'z'];
const library = new PublishedAssetLibrary(import.meta.env.BASE_URL, new AssetLibrary());
const catalog = new ComponentCatalog(import.meta.env.BASE_URL);
let definitions = new Map();
let selectedType = '';
let selected = null;
let selectedIds = new Set();
let objects = [];
let busy = true;
let tool = 'select';
let down = null;
let dragOccurred = false;
let nativeModel = null;
let nativeImportButton = null;
let topology = { nodes: [], edges: [], plates: [] };
// A history entry is a complete editor document. Never coordinate independent
// object/topology cursors: a user action must undo and redo atomically.
const history = new History({ objects: [], topology });
let beamDraft = null;
let showNodes = settings.nodesVisible;
let plateNodeIds = [];
let selectedTopologyNode = null;
let nodeMoveFrame = null;

$('#app').innerHTML = '<header class="topbar"><div class="brand" aria-label="ANYMAKER builder by BKN"><strong>ANYMAKER</strong><small>builder by BKN</small></div><select id="language-select" data-i18n-aria-label="界面语言"><option value="en">English</option><option value="zh">中文</option></select><span class="status" id="save-status" role="status" data-i18n="正在加载定义…"></span><section class="section top-tool-section"><h2 data-i18n="编辑工具"></h2><div class="tool-grid" id="tools"></div></section><nav class="top-actions"><button id="library-btn" data-i18n="导入本地载具"></button><button id="new-btn" data-i18n="新建"></button><button id="undo-btn" data-i18n="撤销"></button><button id="redo-btn" data-i18n="重做"></button><button id="save-btn" data-i18n="保存工程"></button><button id="load-btn" data-i18n="打开工程"></button><button id="export-btn" class="primary" data-i18n="中间格式 XML"></button></nav></header>' +
  '<main class="workspace" id="workspace"><button id="left-sidebar-toggle" class="sidebar-toggle left-toggle" aria-controls="left-sidebar" aria-expanded="true" aria-keyshortcuts="Tab" data-i18n-title="收起方块库（在视口按 Tab 也可切换）" data-i18n="收起方块库"></button><aside id="left-sidebar" class="sidebar left-sidebar" data-i18n-aria-label="方块库"><details id="catalog-drawer" class="drawer-section" open><summary data-i18n="方块库"></summary><section class="section"><h2><span data-i18n="组件定义"></span> <span id="catalog-count"></span></h2><input class="search" id="component-search" data-i18n-aria-label="搜索组件" data-i18n-placeholder="搜索中文、原始 ID、类别…"><select id="category-filter" data-i18n-aria-label="组件分类"><option value="" data-i18n="全部分类"></option></select><div id="component-list"></div></section></details></aside><div id="left-sidebar-resizer" role="separator" aria-orientation="vertical" aria-controls="left-sidebar" data-i18n-aria-label="调整方块库宽度" aria-valuemin="240" aria-valuemax="480" aria-valuenow="304" tabindex="0"></div>' +
  '<section id="viewport" tabindex="0" data-i18n-aria-label="三维建造视口"><button id="right-sidebar-toggle" class="sidebar-toggle right-toggle" aria-controls="right-sidebar" aria-expanded="false" data-i18n="打开右侧面板"></button><div class="view-controls"><button data-view="iso" data-i18n="等距"></button><button data-view="top" data-i18n="顶视"></button><button data-view="front" data-i18n="前视"></button><button id="fit-btn" data-i18n="聚焦 F"></button></div><div class="hud"><span class="badge" id="object-count"></span><span class="badge" id="topology-count"></span><span class="badge" id="cursor-pos" data-i18n="工作平面 Y = 0"></span></div></section>' +
  '<aside id="right-sidebar" class="sidebar right-sidebar" data-i18n-aria-label="编辑器面板" hidden><section id="grid-settings" class="section"><h2 data-i18n="工作网格 · 编辑器参数"></h2><p class="status" data-i18n="固定单位网格：1 格 = 8 cm；所有位置均为整数格。"></p><button id="grid-btn" aria-pressed="true" data-i18n="隐藏网格"></button><p class="status"><span data-i18n="左键：当前工具 · 右键拖动：旋转视角"></span><br><span data-i18n="中键：平移 · 滚轮：缩放 · F：聚焦"></span><br><span data-i18n="Shift + 点击连续放置 · Ctrl / ⌘ + Z：撤销"></span></p></section><details class="drawer-section inspector-drawer"><summary data-i18n="选中方块属性"></summary><section class="section"><div id="inspector-content" class="empty"></div></section></details><details class="drawer-section" id="resource-drawer"><summary data-i18n="资源与校验"></summary><section class="section"><h2 data-i18n="资源状态"></h2><p class="status" id="asset-status" data-i18n="尚未导入 Mesh。橙色线框仅是缺失资源标记，不代表游戏尺寸。"></p><button id="mesh-files-btn" class="full" data-i18n="选择 .mesh 文件"></button><p class="status" data-i18n="推荐选择游戏的 rom/meshes 文件夹。只在浏览器读取，不上传、不执行 EXE。仅渲染静态 Mesh，动态部件数量会单独提示。"></p></section><section class="section"><h2 data-i18n="本地原生载具"></h2><button id="native-btn" class="full" data-i18n="选择配套 .data / .meta"></button><p class="status" id="native-summary" data-i18n="选择同名的 .data 与 .meta JSON 文件。浏览器只读取，不上传；确认后才替换当前场景。"></p></section><section class="section"><h2 data-i18n="校验"></h2><div id="validation" class="status"></div></section></details></aside></main>' +
  '<input id="mesh-input" type="file" accept=".mesh" multiple hidden><input id="file-input" type="file" accept=".json" hidden><input id="native-input" type="file" accept=".data,.meta" multiple hidden>';
applyTranslations(document);

const nativeExportButton = document.createElement('button');
nativeExportButton.id = 'native-export-btn';
nativeExportButton.className = 'full';
setText(nativeExportButton, '导出原生 JSON（仅已映射字段）');
nativeExportButton.disabled = true;
nativeImportButton = document.createElement('button');
nativeImportButton.id = 'native-import-btn';
nativeImportButton.className = 'full';
setText(nativeImportButton, '导入 .data / .meta 到当前场景');
nativeImportButton.disabled = true;
document.querySelector('#native-btn').parentElement.append(nativeImportButton, nativeExportButton);

const workspace = $('#workspace');
const leftSidebar = $('#left-sidebar');
const leftSidebarToggle = $('#left-sidebar-toggle');
const leftSidebarResizer = $('#left-sidebar-resizer');
const rightSidebar = $('#right-sidebar');
const rightSidebarToggle = $('#right-sidebar-toggle');
const sidebarLimits = { min: 240, max: 480, viewport: 360 };
let leftSidebarWidth = settings.leftWidth;
let resizingSidebar = false;
workspace.prepend($('.top-tool-section'));
$('#export-btn').className = 'full';
$('#resource-drawer').append($('#export-btn'));
$('#save-btn').classList.add('primary');
for (const button of [leftSidebarToggle, rightSidebarToggle]) button.removeAttribute('data-i18n');

function maxLeftSidebarWidth() {
  const rightWidth = rightSidebar.hidden ? 0 : 304;
  return Math.max(sidebarLimits.min, Math.min(sidebarLimits.max, workspace.clientWidth - rightWidth - sidebarLimits.viewport - 8));
}
function setLeftSidebarWidth(value) {
  leftSidebarWidth = Math.round(Math.min(maxLeftSidebarWidth(), Math.max(sidebarLimits.min, value)));
  workspace.style.setProperty('--left-sidebar-width', leftSidebar.hidden ? '0px' : leftSidebarWidth + 'px');
  leftSidebarResizer.setAttribute('aria-valuenow', String(leftSidebarWidth));
  leftSidebarResizer.setAttribute('aria-valuemax', String(maxLeftSidebarWidth()));
  scheduleSettings();
}
function setLeftSidebarCollapsed(collapsed, { focusToggle = false } = {}) {
  leftSidebar.hidden = collapsed;
  leftSidebarResizer.hidden = collapsed;
  workspace.style.setProperty('--left-sidebar-width', collapsed ? '0px' : leftSidebarWidth + 'px');
  workspace.style.setProperty('--left-resizer-width', collapsed ? '0px' : '8px');
  leftSidebarToggle.textContent = collapsed ? '›' : '‹';
  leftSidebarToggle.dataset.i18nTitle = collapsed ? '展开方块库（在视口按 Tab 也可切换）' : '收起方块库（在视口按 Tab 也可切换）';
  leftSidebarToggle.dataset.i18nAriaLabel = collapsed ? '展开方块库' : '收起方块库';
  applyTranslations(leftSidebarToggle);
  leftSidebarToggle.setAttribute('aria-expanded', String(!collapsed));
  if (focusToggle) leftSidebarToggle.focus({ preventScroll: true });
  scheduleSettings();
}
function setRightSidebarOpen(open) {
  rightSidebar.hidden = !open;
  workspace.classList.toggle('right-sidebar-open', open);
  rightSidebarToggle.textContent = open ? '›' : '‹';
  rightSidebarToggle.dataset.i18nAriaLabel = open ? '收起右侧面板' : '打开右侧面板';
  rightSidebarToggle.dataset.i18nTitle = rightSidebarToggle.dataset.i18nAriaLabel;
  applyTranslations(rightSidebarToggle);
  rightSidebarToggle.setAttribute('aria-expanded', String(open));
  scheduleSettings();
  requestAnimationFrame(() => { setLeftSidebarWidth(leftSidebarWidth); resize(); });
}
leftSidebarToggle.onclick = () => setLeftSidebarCollapsed(!leftSidebar.hidden);
rightSidebarToggle.onclick = () => setRightSidebarOpen(rightSidebar.hidden);
leftSidebarResizer.addEventListener('pointerdown', event => {
  if (event.button !== 0 || event.pointerType !== 'mouse') return;
  event.preventDefault(); event.stopPropagation(); resizingSidebar = true;
  workspace.classList.add('is-resizing'); leftSidebarResizer.setPointerCapture(event.pointerId);
});
leftSidebarResizer.addEventListener('pointermove', event => {
  if (!resizingSidebar) return;
  const bounds = workspace.getBoundingClientRect();
  setLeftSidebarWidth(event.clientX - bounds.left);
});
function finishSidebarResize(event) {
  if (!resizingSidebar) return;
  resizingSidebar = false; workspace.classList.remove('is-resizing');
  if (leftSidebarResizer.hasPointerCapture(event.pointerId)) leftSidebarResizer.releasePointerCapture(event.pointerId);
}
leftSidebarResizer.addEventListener('pointerup', finishSidebarResize);
leftSidebarResizer.addEventListener('pointercancel', finishSidebarResize);
leftSidebarResizer.addEventListener('keydown', event => {
  const width = event.key === 'ArrowLeft' ? leftSidebarWidth - 16 : event.key === 'ArrowRight' ? leftSidebarWidth + 16 : event.key === 'Home' ? sidebarLimits.min : event.key === 'End' ? maxLeftSidebarWidth() : null;
  if (width === null) return;
  event.preventDefault(); setLeftSidebarWidth(width);
});
new ResizeObserver(() => { if (!leftSidebar.hidden) setLeftSidebarWidth(leftSidebarWidth); }).observe(workspace);

const tools = [['select', '选择', 'V'], ['place', '放置', 'P'], ['erase', '删除', 'E'], ['translate', '移动', 'G'], ['rotate', '旋转', 'R'], ['scale', '缩放', 'S'], ['node', '节点', 'N'], ['beam', '梁', 'B'], ['plate', '面板', 'L']];
for (const [id, name, key] of tools) {
  const button = document.createElement('button');
  button.className = 'tool'; button.dataset.tool = id;
  const icons = { select: '↖', place: '＋', erase: '⌫', translate: '✥', rotate: '⟳', scale: '⤢', node: '●', beam: '／', plate: '◇' };
  button.innerHTML = '<span class="tool-icon">' + icons[id] + '</span><span class="tool-label" data-i18n="' + name + '"></span><kbd>' + key + '</kbd>';
  button.dataset.i18nTitle = name;
  applyTranslations(button);
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
const actionHost = $('#tools');
for (const [id, icon, label] of structuralActions) {
  const button = document.createElement('button');
  button.id = id; button.className = 'icon-action'; button.dataset.i18nTitle = label; button.dataset.i18nAriaLabel = label;
  button.textContent = icon; applyTranslations(button); actionHost.append(button);
}

const viewport = $('#viewport');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(45, 1, .005, 2000);
camera.position.set(2.5, 2.2, 3);
let renderer;
try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
catch { setText(viewport, '无法初始化 WebGL2。请启用硬件加速或更换浏览器。'); throw new Error('WebGL2 unavailable'); }
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
const grid = new THREE.GridHelper(GRID_SIZE, GRID_DIVISIONS, 0x426780, 0x203345);
grid.position.y = -.002; scene.add(grid);
const topologyLayer = new THREE.Group();
topologyLayer.name = 'topology-overlay';
scene.add(topologyLayer);
const topologyMaterials = {
  node: new THREE.MeshBasicMaterial({ color: settings.nodeColor, transparent: settings.nodeOpacity < 1, opacity: settings.nodeOpacity, depthTest: false, depthWrite: false }),
  nodeSelected: new THREE.MeshBasicMaterial({ color: 0xe1781d, transparent: settings.nodeOpacity < 1, opacity: settings.nodeOpacity, depthTest: false, depthWrite: false }),
  edge: new THREE.MeshStandardMaterial({ color: STRUCTURE_COLOR, metalness: .05, roughness: .85 }),
  plate: new THREE.MeshStandardMaterial({ color: STRUCTURE_COLOR, metalness: .05, roughness: .85, side: THREE.DoubleSide }),
};
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const beamPreview = createBeamMesh(new THREE.Vector3(), new THREE.Vector3(), new THREE.MeshStandardMaterial({ color: STRUCTURE_COLOR, transparent: true, opacity: .5, depthWrite: false }));
const beamRuler = createBeamRuler(viewport, camera);
let beamAxisSnap = settings.beamAxisSnap;
let beamPointer = null;
let pointerInCanvas = false;
const beamAnchor = new THREE.Mesh(new THREE.SphereGeometry(.07, 12, 8), new THREE.MeshBasicMaterial({ color: 0xd78624, depthTest: false }));
beamAnchor.visible = false; beamAnchor.renderOrder = 3;
scene.add(beamPreview, beamAnchor);
const buildStatus = document.createElement('span'); buildStatus.id = 'build-status'; buildStatus.className = 'badge'; buildStatus.hidden = true; $('.hud').append(buildStatus);

function clearTopologyVisual(layer = topologyLayer) {
  layer.traverse(object => object.geometry?.dispose());
  layer.clear();
}
function buildTopologyVisual(state) {
  const layer = new THREE.Group();
  try {
    const byId = new Map(state.nodes.map(node => [node.id, node]));
    for (const node of state.nodes) {
      const marker = new THREE.Mesh(new THREE.SphereGeometry(.055, 10, 8), topologyMaterials.node);
      marker.position.set(node.position.x, node.position.y, node.position.z);
      marker.userData.topology = 'node'; marker.userData.nodeId = node.id;
      marker.visible = showNodes; marker.renderOrder = 2;
      layer.add(marker);
    }
    for (const edge of state.edges) {
      const mesh = createBeamMesh(byId.get(edge.a).position, byId.get(edge.b).position, topologyMaterials.edge);
      mesh.userData.topology = 'edge'; mesh.userData.edgeId = edge.id;
      mesh.castShadow = true; mesh.receiveShadow = true;
      layer.add(mesh);
    }
    for (const plate of state.plates) {
      const points = plate.nodeIds.map(id => byId.get(id));
      const vertices = [];
      for (let index = 1; index < points.length - 1; index++) {
        for (const point of [points[0], points[index], points[index + 1]]) vertices.push(point.position.x, point.position.y, point.position.z);
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.computeVertexNormals();
      const mesh = new THREE.Mesh(geometry, topologyMaterials.plate);
      mesh.userData.topology = 'plate'; mesh.userData.plateId = plate.id;
      layer.add(mesh);
    }
    return layer;
  } catch (error) { clearTopologyVisual(layer); throw error; }
}
function updateNodeVisualState() {
  for (const marker of topologyLayer.children) {
    if (marker.userData.topology !== 'node') continue;
    const selectedNode = marker.userData.nodeId === selectedTopologyNode;
    marker.material = selectedNode ? topologyMaterials.nodeSelected : topologyMaterials.node;
    marker.scale.setScalar((selectedNode ? 1.75 : 1) * (settings.nodeSize / .055));
    marker.visible = showNodes;
  }
}
function replaceTopologyVisual(layer) {
  clearTopologyVisual();
  topologyLayer.add(...[...layer.children]);
  topologyLayer.updateMatrixWorld(true);
  updateNodeVisualState();
}
function clearNodeSelection() {
  selectedTopologyNode = null; nodeMoveFrame = null; updateNodeVisualState();
}
function cancelBeam() {
  beamDraft = null; beamPointer = null; beamPreview.visible = false; beamAnchor.visible = false; beamRuler.hide();
  setText(buildStatus, '梁 1 格 · 点击起点');
}
function cancelTopologyDraft() {
  cancelBeam(); clearNodeSelection(); plateNodeIds = [];
}

function status(message, params = {}) { setText($('#save-status'), message, params); }
function reportError(message, error) { status(message, () => ({ error: t(error.message) })); }
function componentName(def) { return (getLocale() === 'zh' ? def.name_zh || def.name : def.name || def.name_zh) || def.id; }
function categoryName(category) { return getLocale() === 'zh' ? categoryInfo(category).label : category; }
function selectedObjects() { return objects.filter(object => selectedIds.has(object.userData.id)); }
function selectedObjectIds() { return selectedObjects().map(object => object.userData.id); }
function setTool(value) {
  if (busy) return;
  tool = value;
  scheduleSettings();
  document.querySelectorAll('.tool').forEach(b => b.classList.toggle('active', b.dataset.tool === tool));
  transform.detach();
  if (value !== 'beam') cancelBeam();
  buildStatus.hidden = value !== 'beam';
  if (value === 'beam' && !beamDraft) setText(buildStatus, '梁 1 格 · 点击起点');
  if (value !== 'plate') plateNodeIds = [];
  if (value !== 'node') clearNodeSelection();
  if (selected && selectedIds.size === 1 && ['translate', 'rotate', 'scale'].includes(tool)) {
    transform.setMode(tool); transform.attach(selected);
  }
}
function setGridConstraints() {
  transform.setTranslationSnap(CELL_SIZE_WORLD);
  transform.setRotationSnap(Math.PI / 2);
  transform.setScaleSnap(null);
}
function select(object, { toggle = false } = {}) {
  if (!object) {
    selected = null;
    selectedIds.clear();
  } else if (toggle) {
    const id = object.userData.id;
    if (selectedIds.has(id)) selectedIds.delete(id); else selectedIds.add(id);
    selected = selectedIds.has(id) ? object : selectedObjects()[0] || null;
  } else {
    selected = object;
    selectedIds = new Set([object.userData.id]);
  }
  setTool(tool);
  inspect();
}
function snapshot() {
  return objects.map(o => ({ id: o.userData.id, type: o.userData.type,
    ...(o.userData.gridId ? { gridId: o.userData.gridId } : {}),
    ...(o.userData.mirror ? { mirror: { ...o.userData.mirror } } : {}),
    position: assertGridVector(o.position, '组件位置'),
    rotation: Object.fromEntries(axes.map(a => [a, o.rotation[a]])),
    scale: Object.fromEntries(axes.map(a => [a, Math.abs(o.scale[a])])) }));
}
function commit() {
  // TransformControls may cross zero when scaling; keep the project domain valid.
  if (selected) {
    const position = quantizeWorldVector(selected.position);
    if (!position) throw new Error('组件位置超出整数格范围');
    selected.position.set(position.x, position.y, position.z);
    axes.forEach(a => {
      const sign = Math.sign(selected.scale[a]) || 1;
      selected.scale[a] = sign * THREE.MathUtils.clamp(Math.abs(selected.scale[a]), .001, 100);
    });
  }
  history.commit(currentProject());
  refresh();
}
function refresh() {
  setText($('#object-count'), '{count} 个组件', { count: objects.length });
  setText($('#topology-count'), '{nodes} 节点 · {edges} 梁 · {plates} 面板', { nodes: topology.nodes.length, edges: topology.edges.length, plates: topology.plates.length });
  $('#undo-btn').disabled = busy || history.cursor === 0;
  $('#redo-btn').disabled = busy || history.cursor === history.entries.length - 1;
  const missing = objects.filter(o => o.userData.visual !== 'mesh').length;
  setText($('#validation'), '{geometry} 连接拓扑、占用规则、动态装配和游戏文件兼容性尚未验证。', () => ({ geometry: missing ? t('{count} 个组件没有真实 Mesh。', { count: missing }) : t('静态几何已加载。') }));
}
async function transact(operation) {
  if (busy) return;
  busy = true; transform.enabled = false; refresh();
  try { await operation(); } catch (error) { reportError('操作失败：{error}', error); }
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
  const candidate = validateDocument(project(items, nextTopology), catalog.index);
  const next = [];
  let visual;
  try {
    for (const data of candidate.objects) next.push(await createObject(data));
    visual = buildTopologyVisual(candidate.topology);
  } catch (error) { next.forEach(disposeObject); throw error; }
  cancelTopologyDraft();
  transform.detach(); selected = null; selectedIds.clear();
  objects.forEach(o => { scene.remove(o); disposeObject(o); });
  objects = next; objects.forEach(o => scene.add(o));
  topology = candidate.topology;
  replaceTopologyVisual(visual);
  inspect(); refresh();
}
async function place(point) {
  if (!catalog.has(selectedType)) throw new Error('请先选择组件');
  if (objects.length >= LIMIT) throw new Error('达到组件上限');
  const object = await createObject({ id: crypto.randomUUID(), type: selectedType, gridId: 'grid-1', position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } });
  const gridPoint = quantizeWorldVector(point);
  if (!gridPoint) throw new Error('放置位置超出整数格范围');
  const box = new THREE.Box3().setFromObject(object);
  object.position.set(gridPoint.x, cellToWorld(Math.ceil((gridPoint.y - box.min.y) / CELL_SIZE_WORLD)), gridPoint.z);
  scene.add(object); objects.push(object); select(object);
  commit(); inspect();
  status(object.userData.visual === 'mesh' ? '已放置真实静态 Mesh' : '已放置缺失资源标记');
}
async function remove(object) {
  if (!object) return;
  const ids = selectedIds.has(object.userData.id) ? selectedObjectIds() : [object.userData.id];
  const result = removeObjects(snapshot(), ids);
  await restore(result.objects, topology);
  select(null);
  commit();
  status('已删除 {count} 个组件', { count: result.removed.length });
}
async function applyStructural(result, nextSelectedIds, message, params = {}) {
  await restore(result.objects, topology);
  const ids = new Set(nextSelectedIds || []);
  const next = objects.filter(object => ids.has(object.userData.id));
  selectedIds = new Set(next.map(object => object.userData.id));
  selected = next[0] || null;
  setTool(tool); inspect(); commit(); status(message, params);
}
function structuralCopy() {
  if (!selectedIds.size || busy) return;
  transact(async () => {
    const result = copyObjects(snapshot(), selectedObjectIds(), { x: CELL_SIZE_WORLD, y: 0, z: 0 });
    await applyStructural(result, result.created, '已复制 {count} 个组件', { count: result.created.length });
  });
}
function structuralMirror() {
  if (!selectedIds.size || busy) return;
  transact(async () => {
    const result = mirrorObjects(snapshot(), selectedObjectIds(), { axis: 'x', offset: 0 });
    await applyStructural(result, result.created, '已镜像 {count} 个组件（X 平面）', { count: result.created.length });
  });
}
function structuralSplit() {
  if (!selectedIds.size || busy) return;
  const gridId = prompt(t('新子网格 ID'), `grid-${gridIds(snapshot()).length + 1}`);
  if (!gridId) return;
  transact(async () => {
    const ids = selectedObjectIds();
    const result = splitGrid(snapshot(), ids, gridId);
    await applyStructural(result, ids, '已将 {count} 个组件拆分到子网格 {gridId}', { count: result.changed, gridId });
  });
}
function structuralMerge() {
  if (busy || !objects.length) return;
  transact(async () => {
    const current = snapshot();
    const ids = gridIds(current);
    if (!ids.length) throw new Error('当前工程尚未建立子网格');
    const result = mergeGrids(current, ids, 'grid-1');
    await applyStructural(result, selectedObjectIds(), '已合并子网格');
  });
}
$('#copy-action').onclick = structuralCopy;
$('#mirror-action').onclick = structuralMirror;
$('#split-action').onclick = structuralSplit;
$('#merge-action').onclick = structuralMerge;
function undo() {
  cancelTopologyDraft();
  const value = history.peekUndo();
  if (!value) return;
  transact(async () => {
    await restore(value.objects, value.topology);
    history.cursor--;
    status('已撤销');
  });
}
function redo() {
  const value = history.peekRedo();
  if (!value) return;
  transact(async () => {
    await restore(value.objects, value.topology);
    history.cursor++;
    status('已重做');
  });
}

function inspect() {
  const host = $('#inspector-content'); host.replaceChildren();
  if (!selected) { host.textContent = t('选择组件查看属性。按住 Shift 点击可多选。'); return; }
  if (selectedIds.size > 1) {
    const summary = document.createElement('strong'); summary.textContent = t('已选择 {count} 个组件', { count: selectedIds.size }); host.append(summary);
    const hint = document.createElement('p'); hint.className = 'status'; hint.textContent = t('可批量复制、镜像、拆分或删除。批量变换和框选尚未实现。'); host.append(hint);
    const button = document.createElement('button'); button.className = 'full'; button.textContent = t('删除已选组件'); button.id = 'delete-selected';
    button.onclick = () => transact(async () => { await remove(selected); }); host.append(button);
    return;
  }
  const object = selected;
  const def = definitions.get(object.userData.type);
  const title = document.createElement('strong'); title.textContent = componentName(def); host.append(title);
  const metadata = document.createElement('p'); metadata.className = 'status';
  metadata.textContent = def.id + ' · ' + t('资源诊断：{reason}', { reason: t(object.userData.reason || '') }) + (object.userData.vertices ? ' · ' + t('{vertices} 顶点 / {triangles} 三角形', { vertices: object.userData.vertices, triangles: object.userData.triangles }) : '') + ' · ' + t('子网格 {gridId} · 动态部件 {count}（按需装配）', { gridId: object.userData.gridId || t('未分配'), count: def.meshes_dynamic?.length || 0 });
  host.append(metadata);
  for (const [field, label] of [['position', '位置（格；1 格 = 8 cm）'], ['rotation', '旋转 °'], ['scale', '缩放比例']]) {
    const row = document.createElement('div'); row.className = 'property';
    const heading = document.createElement('span'); heading.textContent = t(label); row.append(heading);
    const group = document.createElement('div'); group.className = 'transform-grid';
    for (const axis of axes) {
      const label = document.createElement('label'); label.textContent = axis.toUpperCase();
      const input = document.createElement('input'); input.type = 'number'; input.step = field === 'position' ? '1' : field === 'rotation' ? '90' : '.01';
      input.dataset.field = field; input.dataset.axis = axis; input.setAttribute('aria-label', field + '-' + axis);
      const displayed = field === 'position' ? worldToCell(object.position[axis]) : field === 'rotation' ? THREE.MathUtils.radToDeg(object[field][axis]) : object[field][axis];
      input.value = field === 'position' ? String(displayed) : Number(displayed).toFixed(4);
      input.addEventListener('change', () => {
        const value = Number(input.value);
        const invalid = busy || !input.value.trim() || !Number.isFinite(value) || Math.abs(value) > 10000 || (field === 'position' && !Number.isInteger(value)) || (field === 'scale' && (value <= 0 || value > 100));
        if (invalid) { status('输入超出合法范围'); inspect(); return; }
        object[field][axis] = field === 'position' ? cellToWorld(value) : field === 'rotation' ? THREE.MathUtils.degToRad(value) : value;
        commit(); inspect();
      });
      label.append(input); group.append(label);
    }
    row.append(group); host.append(row);
  }
  const details = document.createElement('details');
  const summary = document.createElement('summary'); summary.textContent = t('原始定义 / 端口 / 动态部件'); details.append(summary);
  const pre = document.createElement('pre'); pre.textContent = JSON.stringify(def, null, 2); details.append(pre); host.append(details);
  const button = document.createElement('button'); button.className = 'full'; button.textContent = t('删除组件'); button.id = 'delete-selected'; button.onclick = () => transact(async () => { await remove(object); }); host.append(button);
}

function renderCatalog() {
  const query = $('#component-search').value.trim().toLowerCase();
  const category = $('#category-filter').value;
  const host = $('#component-list'); host.replaceChildren();
  const filtered = [...catalog.entries()].filter(d => (!category || d.category === category) && [d.id, d.name, d.name_zh, d.category, categoryInfo(d.category).label].join(' ').toLowerCase().includes(query));
  $('#catalog-count').textContent = filtered.length + ' / ' + catalog.index.size;
  for (const def of filtered) {
    const button = document.createElement('button'); button.className = 'component'; button.dataset.id = def.id; button.dataset.category = def.category;
    button.classList.toggle('active', selectedType === def.id);
    button.setAttribute('aria-pressed', String(selectedType === def.id));
    const name = componentName(def);
    button.title = name + '\n' + def.id + ' · ' + categoryName(def.category);
    button.setAttribute('aria-label', name + ' · ' + def.id + ' · ' + categoryName(def.category));
    const text = document.createElement('span'); text.className = 'component-name'; text.textContent = name;
    const id = document.createElement('code'); id.className = 'component-id'; id.textContent = def.id;
    button.append(createCategoryIcon(def.category), text, id);
    button.onclick = () => { if (busy) return; selectedType = def.id; setTool('place'); renderCatalog(); status('准备放置：{name}', () => ({ name: componentName(def) })); };
    host.append(button);
  }
  if (!filtered.length) {
    const empty = document.createElement('p'); empty.className = 'catalog-empty'; empty.textContent = t('没有匹配组件，试试其他名称或分类。'); host.append(empty);
  }
}
function renderCategories() {
  for (const option of $('#category-filter').options) {
    if (option.value) option.textContent = categoryName(option.value) + (getLocale() === 'zh' ? ' · ' + option.value : '');
  }
}
async function loadCatalog() {
  const data = await catalog.load();
  selectedType = catalog.has('engine') ? 'engine' : catalog.index.keys().next().value;
  for (const category of [...new Set(data.definitions.map(d => d.category))].sort()) {
    const option = document.createElement('option'); option.value = category; $('#category-filter').append(option);
  }
  renderCategories(); renderCatalog(); status('已加载 {count} 条组件索引，详情按需读取', { count: catalog.index.size });
}

function pointerRay(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
}
function pick() {
  const rect = renderer.domElement.getBoundingClientRect();
  let closest = null; let distance = 56;
  for (const candidate of objects) {
    const anchor = candidate.getWorldPosition(new THREE.Vector3()).project(camera);
    if (anchor.z < -1 || anchor.z > 1) continue;
    const pixels = Math.hypot((anchor.x - pointer.x) * rect.width / 2, (anchor.y - pointer.y) * rect.height / 2);
    if (pixels < distance) { closest = candidate; distance = pixels; }
  }
  // Prefer an unambiguous placement anchor so overlapping published meshes do
  // not make a nearby component impossible to multi-select.
  if (closest) return closest;
  let object = raycaster.intersectObjects(objects, true)[0]?.object;
  while (object && !objects.includes(object)) object = object.parent;
  return object || null;
}
function pickTopologyNode(includeHidden = false) {
  if (!showNodes && !includeHidden) return null;
  const rect = renderer.domElement.getBoundingClientRect();
  let result = null; let best = 14; let nearest = Infinity;
  for (const node of topology.nodes) {
    const world = new THREE.Vector3(node.position.x, node.position.y, node.position.z);
    const projected = world.clone().project(camera);
    if (projected.z < -1 || projected.z > 1) continue;
    const distance = Math.hypot((projected.x - pointer.x) * rect.width / 2, (projected.y - pointer.y) * rect.height / 2);
    const depth = world.distanceTo(camera.position);
    if (distance < best || (distance === best && depth < nearest)) { result = node.id; best = distance; nearest = depth; }
  }
  return result;
}
function pickTopology() {
  const nodeId = pickTopologyNode();
  if (nodeId) return { kind: 'node', id: nodeId };
  const hit = raycaster.intersectObjects(topologyLayer.children.filter(object => object.visible && object.userData.topology !== 'node'), true)[0];
  if (!hit) return null;
  const kind = hit.object.userData.topology;
  return { kind, id: hit.object.userData[kind + 'Id'], point: hit.point };
}
function beamPoint() {
  const nodeId = pickTopologyNode(true);
  const node = topology.nodes.find(value => value.id === nodeId);
  const result = resolveBeamPoint(raycaster.ray, beamDraft?.frame || cameraBuildFrame(camera, controls.target), {
    axisSnap: !!beamDraft && beamAxisSnap, node: node?.position,
    viewNormal: camera.getWorldDirection(new THREE.Vector3()),
  });
  if (beamDraft) beamDraft.axis = result?.axis || null;
  return result?.point || null;
}
function updateBeamPreview(point) {
  if (tool !== 'beam' || !beamDraft) return;
  beamPreview.visible = !!point && updateBeamMesh(beamPreview, beamDraft.start, point);
  if (point) beamRuler.show(beamDraft.start, point, beamDraft.axis); else beamRuler.hide();
  setText(buildStatus, point ? '梁 1 格 · 整格端点 · 点击完成 / Esc 取消' : '梁 1 格 · 无有效终点 · Esc 取消');
}
function refreshBeamPreview() {
  if (!beamDraft || !beamPointer || tool !== 'beam') return;
  pointerRay(beamPointer); updateBeamPreview(beamPoint());
}
function nodePoint() {
  const nodeId = pickTopologyNode();
  const node = topology.nodes.find(value => value.id === nodeId);
  if (node) return new THREE.Vector3(node.position.x, node.position.y, node.position.z);
  return projectBuildPoint(raycaster.ray, nodeMoveFrame || cameraBuildFrame(camera, controls.target));
}
function commitTopology(next, message, params = {}) {
  const candidate = validateDocument(project(snapshot(), next), catalog.index);
  const visual = buildTopologyVisual(candidate.topology);
  topology = candidate.topology;
  replaceTopologyVisual(visual);
  history.commit(candidate);
  refresh();
  const count = topology.nodes.length;
  status('{message}（{count} 逻辑节点）', () => ({ message: t(message, params), count }));
}
function deleteTopology(kind, id) {
  const command = { node: removeNode, edge: removeEdge, plate: removePlate }[kind];
  if (!command) return;
  if (kind === 'node' && selectedTopologyNode === id) clearNodeSelection();
  commitTopology(command(topology, id), kind === 'node' ? '已删除节点及其关联拓扑' : kind === 'edge' ? '已删除梁' : '已删除面板');
}
function finishPlate() {
  if (plateNodeIds.length < 3) { status('面板至少需要三个节点'); return; }
  try {
    const result = createPlate(topology.plates, plateNodeIds, topology.nodes);
    commitTopology({ ...topology, plates: result.plates }, '已创建面板');
    plateNodeIds = [];
  } catch (error) { reportError('面板创建失败：{error}', error); }
}
function handleBeamClick(event) {
  if (event.altKey) {
    const hit = raycaster.intersectObjects(topologyLayer.children.filter(object => object.userData.topology === 'edge'), false)[0];
    if (!hit) { status('按 Alt 点击实体梁内部可分割'); return; }
    const edge = topology.edges.find(value => value.id === hit.object.userData.edgeId);
    const ends = [edge.a, edge.b].map(id => topology.nodes.find(node => node.id === id).position);
    const a = new THREE.Vector3(ends[0].x, ends[0].y, ends[0].z);
    const b = new THREE.Vector3(ends[1].x, ends[1].y, ends[1].z);
    const center = new THREE.Vector3();
    raycaster.ray.distanceSqToSegment(a, b, new THREE.Vector3(), center);
    const candidates = edgeSplitPoints(topology.nodes, edge.id, topology.edges);
    if (!candidates.length) { status('该梁没有可用整格分割点'); return; }
    const point = candidates.map(value => new THREE.Vector3(value.x, value.y, value.z)).reduce((closest, candidate) => candidate.distanceToSquared(center) < closest.distanceToSquared(center) ? candidate : closest);
    const result = splitEdge(topology.nodes, topology.edges, edge.id, point);
    commitTopology({ ...topology, nodes: result.nodes, edges: result.edges }, '已分割实体梁');
    cancelBeam();
    return;
  }
  const point = beamPoint();
  if (!point) { status('当前位置无法投影到建造平面，请调整视角或按 Esc 重新开始'); return; }
  if (!beamDraft) {
    beamDraft = { start: point.clone(), frame: cameraBuildFrame(camera, point), axis: null };
    beamPointer = { clientX: event.clientX, clientY: event.clientY };
    beamAnchor.position.copy(point); beamAnchor.visible = true;
    beamRuler.show(point, point);
    setText(buildStatus, '梁 1 格 · 点击终点 · Esc 取消');
    status('起点已定位；移动鼠标预览实体梁，再次点击完成');
    return;
  }
  commitTopology(createBeam(topology, beamDraft.start, point), '已创建 1 格实体梁');
  cancelBeam();
}
function handleTopologyClick(point) {
  const nodeId = pickTopologyNode();
  if (tool === 'node') {
    if (nodeId) {
      if (selectedTopologyNode && selectedTopologyNode !== nodeId) {
        try {
          const result = mergeNodes(topology.nodes, topology.edges, topology.plates, selectedTopologyNode, nodeId);
          commitTopology(result, '已合并节点');
          clearNodeSelection();
        } catch (error) { reportError('节点合并失败：{error}', error); }
      } else {
        const node = topology.nodes.find(value => value.id === nodeId);
        selectedTopologyNode = nodeId;
        nodeMoveFrame = cameraBuildFrame(camera, new THREE.Vector3(node.position.x, node.position.y, node.position.z));
        updateNodeVisualState();
        status('已选择节点 {id}；点击节点合并，点击空白位置移动；Esc 取消选择', { id: nodeId });
      }
      return true;
    }
    if (selectedTopologyNode) {
      const result = moveNodeAndMerge(topology, selectedTopologyNode, point);
      commitTopology(result, result.merged ? '已移动并合并节点' : '已移动节点');
      clearNodeSelection();
      return true;
    }
    const created = createNode(topology.nodes, point);
    commitTopology({ ...topology, nodes: created.nodes }, created.created ? '已创建节点 {id}' : '已选择已有节点 {id}', { id: created.node.id });
    if (!created.created) {
      selectedTopologyNode = created.node.id;
      nodeMoveFrame = cameraBuildFrame(camera, new THREE.Vector3(created.node.position.x, created.node.position.y, created.node.position.z));
      updateNodeVisualState();
    }
    return true;
  }
  if (tool === 'plate') {
    if (!nodeId) { status('面板工具需要点击已有节点'); return true; }
    if (plateNodeIds.includes(nodeId)) return true;
    plateNodeIds.push(nodeId);
    status('面板已选择 {count} 个节点；按 Enter 完成，Esc 取消', { count: plateNodeIds.length });
    return true;
  }
  return false;
}
renderer.domElement.addEventListener('contextmenu', e => e.preventDefault());
renderer.domElement.addEventListener('pointerdown', event => {
  if (event.button !== 0 || busy) return;
  viewport.focus({ preventScroll: true });
  dragOccurred = transform.dragging;
  down = { x: event.clientX, y: event.clientY };
});
renderer.domElement.addEventListener('pointermove', event => {
  if (busy) return;
  pointerInCanvas = true;
  beamPointer = { clientX: event.clientX, clientY: event.clientY };
  pointerRay(event);
  const rawPoint = tool === 'beam' ? beamPoint() : tool === 'node' ? nodePoint() : raycaster.ray.intersectPlane(plane, new THREE.Vector3());
  const gridPoint = rawPoint && quantizeWorldVector(rawPoint);
  const point = gridPoint ? new THREE.Vector3(gridPoint.x, gridPoint.y, gridPoint.z) : null;
  setText($('#cursor-pos'), point ? '{coordinates}' : '无法定位：射线与建造平面平行', { coordinates: point ? axes.map(axis => axis.toUpperCase() + ' ' + worldToCell(point[axis]) + ' 格').join(' · ') : '' });
  updateBeamPreview(point);
});
renderer.domElement.addEventListener('pointerleave', () => { pointerInCanvas = false; beamPreview.visible = false; beamRuler.hide(); });
renderer.domElement.addEventListener('pointerup', event => {
  if (!down || event.button !== 0) return;
  const moved = Math.hypot(event.clientX - down.x, event.clientY - down.y); down = null;
  if (busy || dragOccurred || moved > 5 || (transform.axis && ['translate', 'rotate', 'scale'].includes(tool))) return;
  pointerRay(event);
  if (tool === 'beam') {
    try { handleBeamClick(event); } catch (error) { reportError('梁操作失败：{error}', error); }
    return;
  }
  if (['node', 'plate'].includes(tool)) {
    if (!showNodes) { status('节点辅助已隐藏，请先显示节点后编辑节点或面板；直接建梁不受影响'); return; }
    const point = tool === 'node' ? nodePoint() : (() => {
      const node = topology.nodes.find(value => value.id === pickTopologyNode());
      return node ? new THREE.Vector3(node.position.x, node.position.y, node.position.z) : raycaster.ray.intersectPlane(plane, new THREE.Vector3());
    })();
    try { if (point && point.length() <= 10000) handleTopologyClick(point); }
    catch (error) { reportError('拓扑操作失败：{error}', error); }
    return;
  }
  if (tool === 'place') {
    const intersection = raycaster.ray.intersectPlane(plane, new THREE.Vector3());
    const gridPoint = intersection && quantizeWorldVector(intersection);
    if (!gridPoint || new THREE.Vector3(gridPoint.x, gridPoint.y, gridPoint.z).length() > 1000) return;
    transact(async () => { await place(new THREE.Vector3(gridPoint.x, gridPoint.y, gridPoint.z)); if (!event.shiftKey) tool = 'select'; });
  } else if (tool === 'erase') {
    const hit = pickTopology();
    if (hit) deleteTopology(hit.kind, hit.id); else transact(async () => { await remove(pick()); });
  } else select(pick(), { toggle: event.shiftKey });
});
renderer.domElement.addEventListener('pointercancel', () => { down = null; cancelBeam(); });

function fit() {
  const box = new THREE.Box3();
  if (selectedIds.size) selectedObjects().forEach(object => box.expandByObject(object));
  else {
    objects.forEach(o => box.expandByObject(o));
    box.expandByObject(topologyLayer);
  }
  if (box.isEmpty()) { controls.target.set(0, .2, 0); camera.position.set(2.5, 2.2, 3); return; }
  const center = box.getCenter(new THREE.Vector3());
  const distance = Math.max(.4, box.getSize(new THREE.Vector3()).length() / Math.sin(camera.fov * Math.PI / 360));
  camera.position.copy(center).add(new THREE.Vector3(1, .8, 1).normalize().multiplyScalar(distance));
  controls.target.copy(center); controls.update();
}
$('#fit-btn').onclick = fit;
for (const button of document.querySelectorAll('.view-controls [data-view]')) button.remove();
const viewLabels = { orientation: 'XYZ 视角指示器', right: '右视图 +X', left: '左视图 −X', top: '顶视图 +Y', bottom: '底视图 −Y', front: '前视图 +Z', back: '后视图 −Z', iso: '等距' };
const orientation = createOrientationIndicator(viewport, camera, view => {
  if (busy || transform.dragging) return;
  const damping = controls.enableDamping;
  controls.enableDamping = false; controls.update();
  orientCamera(camera, controls, view);
  controls.enableDamping = damping;
  scheduleSettings();
}, view => t(viewLabels[view]));
orientation.footer.append($('#fit-btn'));
const gridFields = document.createElement('div');
gridFields.innerHTML = '<div class="property"><label for="grid-color" data-i18n="网格颜色"></label><input id="grid-color" type="color"></div><div class="property"><label for="grid-opacity" data-i18n="网格透明度"></label><input id="grid-opacity" type="range" min="0" max="1" step="0.05"></div><div class="property"><label for="grid-style" data-i18n="网格线型"></label><select id="grid-style"><option value="solid" data-i18n="实线"></option><option value="dashed" data-i18n="虚线"></option></select></div><h2 data-i18n="节点显示"></h2><div class="property"><label for="node-color" data-i18n="节点颜色"></label><input id="node-color" type="color"></div><div class="property"><label for="node-size" data-i18n="节点大小"></label><input id="node-size" type="range" min="0.02" max="0.25" step="0.005"><output id="node-size-value"></output></div><div class="property"><label for="node-opacity" data-i18n="节点透明度"></label><input id="node-opacity" type="range" min="0" max="1" step="0.05"></div>';
$('#grid-btn').before(gridFields);
$('#grid-color').value = settings.gridColor;
$('#grid-opacity').value = settings.gridOpacity;
$('#grid-style').value = settings.gridStyle;
$('#node-color').value = settings.nodeColor;
$('#node-size').value = settings.nodeSize;
$('#node-opacity').value = settings.nodeOpacity;
grid.visible = settings.gridVisible;
function updateGridStyle() {
  const style = normalizeSettings({ version: 1, gridColor: $('#grid-color').value, gridOpacity: Number($('#grid-opacity').value), gridStyle: $('#grid-style').value });
  applyGridStyle(grid, style);
  scheduleSettings();
}
updateGridStyle();
for (const id of ['grid-color', 'grid-opacity', 'grid-style']) $('#' + id).addEventListener('input', updateGridStyle);
function updateNodeAppearance() {
  const style = normalizeSettings({ version: 1, nodeColor: $('#node-color').value, nodeSize: Number($('#node-size').value), nodeOpacity: Number($('#node-opacity').value) });
  settings.nodeColor = style.nodeColor; settings.nodeSize = style.nodeSize; settings.nodeOpacity = style.nodeOpacity;
  topologyMaterials.node.color.set(style.nodeColor);
  for (const material of [topologyMaterials.node, topologyMaterials.nodeSelected]) {
    material.opacity = style.nodeOpacity; material.transparent = style.nodeOpacity < 1; material.needsUpdate = true;
  }
  $('#node-size-value').textContent = style.nodeSize.toFixed(3);
  updateNodeVisualState(); scheduleSettings();
}
updateNodeAppearance();
for (const id of ['node-color', 'node-size', 'node-opacity']) $('#' + id).addEventListener('input', updateNodeAppearance);
function updateGridButton() {
  setText($('#grid-btn'), grid.visible ? '隐藏网格' : '显示网格');
  $('#grid-btn').setAttribute('aria-pressed', String(grid.visible));
}
updateGridButton();
$('#grid-btn').onclick = () => { grid.visible = !grid.visible; updateGridButton(); scheduleSettings(); };
const nodesButton = document.createElement('button'); nodesButton.id = 'nodes-btn'; setText(nodesButton, showNodes ? '隐藏节点' : '显示节点'); nodesButton.setAttribute('aria-pressed', String(showNodes));
nodesButton.dataset.i18nTitle = '仅切换逻辑节点辅助标记，不隐藏梁、不改变工程';
$('.view-controls').append(nodesButton);
nodesButton.onclick = () => {
  showNodes = !showNodes;
  if (!showNodes) { clearNodeSelection(); plateNodeIds = []; }
  updateNodeVisualState();
  setText(nodesButton, showNodes ? '隐藏节点' : '显示节点');
  nodesButton.setAttribute('aria-pressed', String(showNodes));
  status(showNodes ? '已显示逻辑节点辅助标记' : '节点已隐藏；仍可直接建梁并吸附逻辑端点');
  scheduleSettings();
};
const axisSnapButton = document.createElement('button'); axisSnapButton.id = 'axis-snap-btn';
setText(axisSnapButton, '轴向吸附');
axisSnapButton.dataset.i18nTitle = '仅建梁：自动吸附单一世界轴（A 切换）';
axisSnapButton.setAttribute('aria-keyshortcuts', 'A');
axisSnapButton.setAttribute('aria-pressed', String(beamAxisSnap));
$('.view-controls').append(axisSnapButton);
function toggleBeamAxisSnap() {
  if (busy) return;
  beamAxisSnap = !beamAxisSnap;
  axisSnapButton.setAttribute('aria-pressed', String(beamAxisSnap));
  refreshBeamPreview(); scheduleSettings();
}
axisSnapButton.onclick = toggleBeamAxisSnap;
const constructionHelp = document.createElement('p'); constructionHelp.className = 'status construction-help';
setText(constructionHelp, '梁：两击完成，Esc 取消，Alt 点击分割。所有节点、组件和端点均对齐世界 XYZ 整数格；1 格 = 8 cm。截面边长为 1 格；世界轴向梁的面与 XYZ 平面平行。XYZ 标尺仅显示整数格与厘米。A 切换轴向吸附；节点可隐藏。');
$('#grid-btn').after(constructionHelp);
$('#topology-count').dataset.i18nTitle = '节点是结构逻辑，不计入组件数量';
$('#component-search').oninput = () => { renderCatalog(); scheduleSettings(); };
$('#category-filter').onchange = () => { renderCatalog(); scheduleSettings(); };
$('#undo-btn').onclick = undo; $('#redo-btn').onclick = redo;
$('#new-btn').onclick = () => { if (!busy && (!objects.length || confirm(t('清空当前工程？此操作可以撤销。')))) transact(async () => { await restore([], { nodes: [], edges: [], plates: [] }); commit(); }); };

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
    await restore(document.objects, document.topology || { nodes: [], edges: [], plates: [] }); commit(); fit(); status('工程已加载');
  });
};

$('#library-btn').onclick = () => $('#native-input').click();
$('#mesh-files-btn').onclick = () => $('#mesh-input').click();
$('#mesh-input').onchange = e => {
  const files = [...e.target.files]; e.target.value = ''; if (!files.length) return;
  transact(async () => {
    const n = library.register(files);
    setText($('#asset-status'), '本地已登记 {count} 个 Mesh。按组件请求解码，不上传。材质、动态装配尚未还原。', { count: n });
    await restore(snapshot()); fit(); status('模型库已登记；选择组件并在视口点击放置');
  });
};

function readNativePair(files) {
  if (files.length !== 2) throw new Error('请同时选择一份 .data 和一份 .meta 文件');
  const byExtension = Object.create(null);
  for (const file of files) {
    if (!file || file.size > 20 * 1024 * 1024) throw new Error('文件超过 20 MiB');
    const match = /^(.+)\.(data|meta)$/i.exec(file.name);
    if (!match || byExtension[match[2].toLowerCase()]) throw new Error('请选择唯一的一份 .data 和一份 .meta 文件');
    byExtension[match[2].toLowerCase()] = { file, baseName: match[1] };
  }
  if (!byExtension.data || !byExtension.meta || byExtension.data.baseName.toLowerCase() !== byExtension.meta.baseName.toLowerCase()) throw new Error('.data 与 .meta 必须使用相同文件名');
  return byExtension;
}
$('#native-btn').onclick = () => $('#native-input').click();
$('#native-input').onchange = async e => {
  const files = [...e.target.files]; e.target.value = ''; if (!files.length) return;
  nativeModel = null; nativeExportButton.disabled = true; nativeImportButton.disabled = true;
  try {
    const pair = readNativePair(files);
    const [dataText, metaText] = await Promise.all([pair.data.file.text(), pair.meta.file.text()]);
    const data = JSON.parse(dataText); const meta = JSON.parse(metaText);
    nativeModel = parseNativePair(data, meta);
    const nativeModelStats = nativeStats(nativeModel);
    $('#native-summary').dataset.domainStats = JSON.stringify(nativeModelStats);
    nativeExportButton.disabled = false;
    nativeImportButton.disabled = false;
    const vehicles = data.vehicles?.vehicles;
    if (!Array.isArray(vehicles)) throw new Error('没有 vehicles.vehicles 数组');
    const summaries = vehicles.map(v => ({ id: v.id, nodes: v.nodes?.length || 0, edges: v.edges?.length || 0, plates: v.plates?.length || 0, grids: v.grids?.length || 0, components: (v.grids || []).reduce((n, g) => n + (g.components?.length || 0), 0) }));
    setText($('#native-summary'), '已配对 {dataName} / {metaName}。{vehicles}。确认后才导入当前场景。', () => ({ dataName: pair.data.file.name, metaName: pair.meta.file.name, vehicles: summaries.map(summary => t('载具 {id}：{nodes} 节点 / {edges} 梁 / {plates} 面板 / {grids} 网格 / {components} 组件', summary)).join(getLocale() === 'zh' ? '；' : '; ') }));
  } catch (error) { setText($('#native-summary'), '无法导入原生文件：{error}', () => ({ error: t(error instanceof Error ? error.message : String(error)) })); }
};

nativeImportButton.onclick = () => {
  status('正在导入配套原生载具');
  if (!nativeModel || busy) { status(!nativeModel ? '原生模型尚未加载' : '当前操作仍在进行'); return; }
  transact(async () => {
    const document = validateDocument(toEditorDocument(nativeModel), catalog.index);
    await restore(document.objects, toEditorTopology(nativeModel));
    commit(); fit();
    status('已将配套 .data / .meta 的组件导入当前场景；节点、梁、面板和连接仍保留在领域模型中');
  });
};

nativeExportButton.onclick = () => {
  if (!nativeModel) return;
  try {
    const exported = toNativeData(nativeModel, { strict: false });
    download(JSON.stringify(exported.value, null, 2), 'anymaker-native.data', 'application/json');
    status(exported.diagnostics.length ? '已导出 JSON，存在未映射字段诊断' : '已导出原生 JSON 结构');
  } catch (error) { reportError('原生导出失败：{error}', error); }
};

window.addEventListener('keydown', e => {
  if (e.key === 'Tab' && e.target === viewport) {
    e.preventDefault();
    setLeftSidebarCollapsed(!leftSidebar.hidden, { focusToggle: true });
    return;
  }
  const editingText = e.target instanceof HTMLElement && (e.target.matches('input,textarea,select') || e.target.isContentEditable);
  if (editingText) return;
  if (e.key === 'Escape' && !busy) {
    if (beamDraft || plateNodeIds.length || selectedTopologyNode) status('已取消当前拓扑操作');
    cancelTopologyDraft(); select(null); setTool('select');
    return;
  }
  if (e.target instanceof HTMLElement && e.target.matches('button,summary,[role="separator"]')) return;
  if (e.target !== document.body && e.target !== viewport && e.target !== renderer.domElement) return;
  if (busy) return;
  const key = e.key.toLowerCase();
  if (e.ctrlKey || e.metaKey) { if (key === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); } else if (key === 'y') { e.preventDefault(); redo(); } return; }
  if (key === 'a' && tool === 'beam' && !e.altKey && !e.repeat) { e.preventDefault(); toggleBeamAxisSnap(); return; }
  const binding = tools.find(t => t[2].toLowerCase() === key);
  if (binding) setTool(binding[0]);
  if (key === 'delete' || key === 'backspace') {
    e.preventDefault();
    if (selectedTopologyNode) deleteTopology('node', selectedTopologyNode);
    else transact(async () => { await remove(selected); });
  }
  if (key === 'enter' && tool === 'plate') { e.preventDefault(); finishPlate(); }
  if (key === 'f') fit();
});
const backupBadge = document.createElement('div'); backupBadge.className = 'badge local-backup';
const backupStatus = document.createElement('span'); backupStatus.id = 'autosave-status'; backupStatus.setAttribute('role', 'status');
const resumeBackup = document.createElement('button'); resumeBackup.id = 'resume-autosave'; resumeBackup.hidden = true;
setText(resumeBackup, '以当前工程继续自动保存');
backupBadge.append(backupStatus, resumeBackup); $('.hud').append(backupBadge);
const storageHint = document.createElement('p'); storageHint.className = 'status';
setText(storageHint, '本地存储只属于当前浏览器和站点；清理站点数据会删除备份，请定期下载工程。');
$('#grid-settings').append(storageHint);
function showBackupStatus({ state, savedAt, detail }) {
  backupStatus.dataset.state = state;
  const labels = { ready: '自动保存：每分钟', restored: '已恢复本地工程', recovered: '已从上一份有效备份恢复', saved: '已自动保存 {time}', error: '本地恢复失败：{detail}', 'write-error': '本地保存失败，请下载工程：{detail}', conflict: '另一标签页已保存，自动保存已暂停' };
  setText(backupStatus, labels[state], () => ({ detail, time: savedAt ? new Date(savedAt).toLocaleTimeString(getLocale() === 'zh' ? 'zh-CN' : 'en-US') : '' }));
  resumeBackup.hidden = !['error', 'conflict'].includes(state);
}
resumeBackup.onclick = () => {
  if (!busy && confirm(t('用当前工程覆盖本地恢复记录并继续自动保存？'))) localSession?.resume();
};
function collectSettings() {
  return {
    version: 1, language: getLocale(), leftWidth: leftSidebarWidth, leftCollapsed: leftSidebar.hidden, rightOpen: !rightSidebar.hidden,
    gridColor: $('#grid-color').value, gridOpacity: Number($('#grid-opacity').value), gridStyle: $('#grid-style').value, gridVisible: grid.visible,
    nodesVisible: showNodes, nodeColor: $('#node-color').value, nodeSize: Number($('#node-size').value), nodeOpacity: Number($('#node-opacity').value), beamAxisSnap, tool, selectedType,
    query: $('#component-search').value, category: $('#category-filter').value,
    drawers: { catalog: $('#catalog-drawer').open, inspector: $('.inspector-drawer').open, resources: $('#resource-drawer').open },
    camera: { position: camera.position.toArray(), target: controls.target.toArray() },
  };
}
function saveSettings() {
  if (!preferencesReady) return;
  clearTimeout(settingsTimer);
  const result = localStore.saveSettings(collectSettings());
  if (!result.ok) status('设置保存失败：{detail}', { detail: result.error.message });
}
function scheduleSettings() {
  if (!preferencesReady) return;
  clearTimeout(settingsTimer); settingsTimer = setTimeout(saveSettings, 180);
}
controls.addEventListener('change', () => { scheduleSettings(); if (!busy && pointerInCanvas) refreshBeamPreview(); });
for (const drawer of [$('#catalog-drawer'), $('.inspector-drawer'), $('#resource-drawer')]) drawer.addEventListener('toggle', scheduleSettings);
window.addEventListener('pagehide', saveSettings);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') saveSettings(); });

export function changeLanguage(locale) {
  const scrollTop = leftSidebar.scrollTop;
  const definitionOpen = $('#inspector-content details')?.open;
  setLocale(locale);
  document.documentElement.lang = getLocale() === 'zh' ? 'zh-CN' : 'en';
  $('#language-select').value = getLocale();
  applyTranslations(document);
  renderCategories(); renderCatalog(); inspect(); refresh();
  if (definitionOpen && $('#inspector-content details')) $('#inspector-content details').open = true;
  leftSidebar.scrollTop = scrollTop;
  orientation.relabel();
  localSession?.refresh();
  saveSettings();
}
$('#language-select').addEventListener('change', event => changeLanguage(event.target.value));

const resize = () => { const w = viewport.clientWidth, h = viewport.clientHeight; camera.aspect = w / Math.max(h, 1); camera.updateProjectionMatrix(); renderer.setSize(w, h, false); if (!busy && pointerInCanvas) refreshBeamPreview(); };
new ResizeObserver(resize).observe(viewport);
setLeftSidebarCollapsed(settings.leftCollapsed);
setRightSidebarOpen(settings.rightOpen);
$('#catalog-drawer').open = settings.drawers.catalog;
$('.inspector-drawer').open = settings.drawers.inspector;
$('#resource-drawer').open = settings.drawers.resources;
changeLanguage(getLocale());
setGridConstraints(); refresh(); resize();
async function initialize() {
  await loadCatalog();
  $('#component-search').value = settings.query;
  $('#category-filter').value = [...$('#category-filter').options].some(option => option.value === settings.category) ? settings.category : '';
  if (catalog.has(settings.selectedType)) selectedType = settings.selectedType;
  renderCatalog();
  localSession = await startLocalSession({
    store: localStore,
    validate: value => migrateDocument(value, catalog.index),
    restore: async value => { await restore(value.objects, value.topology || { nodes: [], edges: [], plates: [] }); commit(); },
    snapshot: () => {
      const committed = history.entries[history.cursor];
      return project(committed.objects, committed.topology);
    },
    canSave: () => !busy && !transform.dragging,
    notify: showBackupStatus,
  });
  if (settings.camera) {
    camera.position.fromArray(settings.camera.position); controls.target.fromArray(settings.camera.target); controls.update();
  } else if (objects.length || topology.nodes.length) fit();
  busy = false;
  setTool(settings.tool); refresh();
  preferencesReady = true;
  viewport.dataset.ready = 'true';
  if (storedSettings.error) status('设置保存失败：{detail}', { detail: storedSettings.error.message });
}
initialize().catch(error => reportError('组件目录加载失败：{error}', error));
renderer.setAnimationLoop(() => { controls.update(); orientation.update(); beamRuler.update(); renderer.render(scene, camera); });
