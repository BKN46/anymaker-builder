import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { AssetLibrary, disposeObject } from './assets/library.js';
import { PublishedAssetLibrary } from './assets/published-library.js';
import { reflectObject } from './assets/geometry-ops.js';
import { History, LIMIT, project, validateDocument, migrateDocument, toIntermediateXml } from './editor/document.js';
import { copyObjects, mirrorObjects, moveObjects, removeObjects, splitGrid, mergeGrids, gridIds } from './editor/operations.js';
import { createNode, moveNodeAndMerge, mergeNodes, removeNode, removeEdge, removePlate, createBeam, edgeSplitPoints, splitEdge, createPlateFromEdges, createGlassPlateFromEdges } from './editor/topology.js';
import { LINK_COLORS, createLink, removeLink } from './editor/connections.js';
import { CELL_SIZE_WORLD, assertGridVector, cellToWorld, quantizeWorldVector, worldToCell } from './editor/grid.js';
import { GRID_SIZE, GRID_DIVISIONS, STRUCTURE_COLOR, cameraBuildFrame, projectBuildPoint, resolveBeamPoint, resolvePlacementPoint, createBeamMesh, createBeamJointMesh, createConnectionRoute, updateBeamMesh } from './editor/construction-view.js';
import { createBeamRuler, createBeamLengthLabels } from './editor/beam-ruler.js';
import { parseNativePair, nativeStats, toNativePair, verifyNativePairRoundTrip } from './native/anymaker-data.js';
import { toEditorDocument, toEditorTopology } from './editor/model.js';
import { ComponentCatalog } from './catalog/component-catalog.js';
import { categoryInfo, createCategoryIcon } from './catalog/category-icons.js';
import { getLocale, setLocale, t, applyTranslations, setText, addMessages } from './i18n.js';
import { createLocalStore, normalizeSettings } from './editor/local-storage.js';
import { startLocalSession } from './editor/local-session.js';
import { createOrientationIndicator, orientCamera, applyGridStyle } from './editor/view-settings.js';
import { nativePaintColor, isGlassPlate } from './editor/native-paint.js';
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
let topology = { nodes: [], edges: [], plates: [], links: [] };
// A history entry is a complete editor document. Never coordinate independent
// object/topology cursors: a user action must undo and redo atomically.
const history = new History({ objects: [], topology }, '初始状态');
let beamDraft = null;
let showNodes = settings.nodesVisible;
let topologyHelpersVisible = true;
const TOPOLOGY_HELPER_DISTANCE = 12;
let gridPreferenceVisible = settings.gridVisible;
let plateEdgeIds = [];
let connectionDraft = null;
let selectedTopologyNode = null;
let nodeMoveFrame = null;
let topologyTransform = null;
let cursorPoint = null;
let placementPreview = null;
let placementPreviewType = '';
let placementPreviewLoadingType = '';
let placementPreviewRequest = 0;
let referencePreview = false;
let hoveredObject = null;

$('#app').innerHTML = '<header class="topbar"><div class="brand" aria-label="ANYMAKER builder by BKN"><strong>ANYMAKER</strong><small>builder by BKN</small></div><select id="language-select" data-i18n-aria-label="界面语言"><option value="en">English</option><option value="zh">中文</option></select><span class="status" id="save-status" role="status" data-i18n="正在加载定义…"></span><section class="section top-tool-section"><h2 data-i18n="编辑工具"></h2><div class="tool-grid" id="tools"></div></section><nav class="top-actions"><button id="library-btn" data-i18n="导入本地载具"></button><button id="new-btn" data-i18n="新建"></button><button id="undo-btn" data-i18n="撤销"></button><button id="redo-btn" data-i18n="重做"></button><button id="save-btn" data-i18n="保存工程"></button><button id="load-btn" data-i18n="打开工程"></button><button id="export-btn" class="primary" data-i18n="中间格式 XML"></button></nav></header>' +
  '<main class="workspace" id="workspace"><button id="left-sidebar-toggle" class="sidebar-toggle left-toggle" aria-controls="left-sidebar" aria-expanded="true" aria-keyshortcuts="Tab" data-i18n-title="收起方块库（在视口按 Tab 也可切换）" data-i18n="收起方块库"></button><aside id="left-sidebar" class="sidebar left-sidebar" data-i18n-aria-label="方块库"><details id="catalog-drawer" class="drawer-section" open><summary data-i18n="方块库"></summary><section class="section"><h2><span data-i18n="组件定义"></span> <span id="catalog-count"></span></h2><input class="search" id="component-search" data-i18n-aria-label="搜索组件" data-i18n-placeholder="搜索中文、原始 ID、类别…"><select id="category-filter" data-i18n-aria-label="组件分类"><option value="" data-i18n="全部分类"></option></select><label class="catalog-visibility"><input id="show-building-furniture" type="checkbox"><span data-i18n="显示建材与家具"></span></label><div id="component-list"></div></section></details></aside><div id="left-sidebar-resizer" role="separator" aria-orientation="vertical" aria-controls="left-sidebar" data-i18n-aria-label="调整方块库宽度" aria-valuemin="240" aria-valuemax="720" aria-valuenow="304" tabindex="0"></div>' +
  '<section id="viewport" tabindex="0" data-i18n-aria-label="三维建造视口"><button id="right-sidebar-toggle" class="sidebar-toggle right-toggle" aria-controls="right-sidebar" aria-expanded="false" data-i18n="打开右侧面板"></button><div class="view-controls"><button data-view="iso" data-i18n="等距"></button><button data-view="top" data-i18n="顶视"></button><button data-view="front" data-i18n="前视"></button><button id="fit-btn" data-i18n="聚焦 F"></button></div><div class="hud"><span class="badge" id="object-count"></span><span class="badge" id="vehicle-size"></span><span id="topology-count" hidden></span><span class="badge" id="cursor-pos" data-i18n="工作平面 Y = 0"></span></div></section>' +
  '<aside id="right-sidebar" class="sidebar right-sidebar" data-i18n-aria-label="编辑器面板" hidden><section id="grid-settings" class="section"><h2 data-i18n="工作网格 · 编辑器参数"></h2><p class="status" data-i18n="固定单位网格：1 格 = 8 cm；所有位置均为整数格。"></p><button id="grid-btn" aria-pressed="true" data-i18n="隐藏网格"></button><p class="status"><span data-i18n="左键：当前工具 · 右键拖动：旋转视角"></span><br><span data-i18n="中键：平移 · 滚轮：缩放 · F：聚焦"></span><br><span data-i18n="Shift + 点击连续放置 · Ctrl / ⌘ + Z：撤销"></span></p></section><details class="drawer-section inspector-drawer"><summary data-i18n="选中方块属性"></summary><section class="section"><div id="inspector-content" class="empty"></div></section></details><details class="drawer-section" id="resource-drawer"><summary data-i18n="资源与校验"></summary><section class="section"><h2 data-i18n="资源状态"></h2><p class="status" id="asset-status" data-i18n="尚未导入 Mesh。橙色线框仅是缺失资源标记，不代表游戏尺寸。"></p><button id="mesh-files-btn" class="full" data-i18n="选择 .mesh 文件"></button><p class="status" data-i18n="推荐选择游戏的 rom/meshes 文件夹。只在浏览器读取，不上传、不执行 EXE。仅渲染静态 Mesh，动态部件数量会单独提示。"></p></section><section class="section"><h2 data-i18n="本地原生载具"></h2><button id="native-btn" class="full" data-i18n="选择配套 .data / .meta"></button><p class="status" id="native-summary" data-i18n="选择同名的 .data 与 .meta JSON 文件。浏览器只读取，不上传；确认后才替换当前场景。"></p></section><section class="section"><h2 data-i18n="校验"></h2><div id="validation" class="status"></div></section></details></aside></main>' +
  '<input id="mesh-input" type="file" accept=".mesh" multiple hidden><input id="file-input" type="file" accept=".json" hidden><input id="native-input" type="file" accept=".data,.meta" multiple hidden>';
applyTranslations(document);
const componentIdTooltip = document.createElement('span'); componentIdTooltip.id = 'component-id-tooltip'; componentIdTooltip.hidden = true; document.body.append(componentIdTooltip);

const nativeExportButton = document.createElement('button');
nativeExportButton.id = 'native-export-btn';
nativeExportButton.className = 'full';
setText(nativeExportButton, '导出原生配套文件（未验证）');
nativeExportButton.disabled = true;
nativeImportButton = document.createElement('button');
nativeImportButton.id = 'native-import-btn';
nativeImportButton.className = 'full';
setText(nativeImportButton, '导入 .data / .meta 到当前场景');
nativeImportButton.disabled = true;
const nativeVehicleSelect = document.createElement('select');
nativeVehicleSelect.id = 'native-vehicle-select'; nativeVehicleSelect.className = 'full'; nativeVehicleSelect.disabled = true;
nativeVehicleSelect.setAttribute('aria-label', t('导入载具范围'));
const nativeReferencePreviewButton = document.createElement('button');
nativeReferencePreviewButton.id = 'native-reference-preview-btn';
nativeReferencePreviewButton.className = 'full';
nativeReferencePreviewButton.disabled = true;
nativeReferencePreviewButton.setAttribute('aria-pressed', 'false');
setText(nativeReferencePreviewButton, '参考预览');
nativeReferencePreviewButton.dataset.i18nTitle = '隐藏编辑辅助并使用黑色背景；仅用于与参考截图进行人工对照，不代表游戏渲染已经匹配';
document.querySelector('#native-btn').parentElement.append(nativeVehicleSelect, nativeImportButton, nativeReferencePreviewButton, nativeExportButton);

const connectionSettings = document.createElement('section');
connectionSettings.id = 'connection-settings'; connectionSettings.className = 'section';
connectionSettings.innerHTML = '<h2 data-i18n="连接工具"></h2><label for="connection-kind" data-i18n="连接类型"></label><select id="connection-kind" class="full"><option value="electric" data-i18n="电线"></option><option value="mechanical" data-i18n="机械连接"></option><option value="liquid" data-i18n="液体管线"></option><option value="gas" data-i18n="气体管线"></option><option value="belt" data-i18n="皮带"></option><option value="data" data-i18n="数据线"></option></select><div class="transform-grid connection-ports"><label><span data-i18n="起点端口"></span><input id="connection-from-port" type="number" min="0" max="255" step="1" value="0"></label><label><span data-i18n="终点端口"></span><input id="connection-to-port" type="number" min="0" max="255" step="1" value="0"></label></div><p class="status" data-i18n="连接工具说明"></p>';
$('#right-sidebar').insertBefore(connectionSettings, $('#resource-drawer'));
applyTranslations(connectionSettings);

const paintToolbar = document.createElement('section');
paintToolbar.id = 'paint-toolbar'; paintToolbar.className = 'context-toolbar'; paintToolbar.hidden = true;
paintToolbar.innerHTML = '<strong data-i18n="涂色色板"></strong><div id="paint-quick-colors" class="quick-colors"></div><label><input id="paint-toolbar-color" type="color" value="#bd2636" aria-label="Hex RGB color"><input id="paint-toolbar-hex" type="text" value="#bd2636" maxlength="7" spellcheck="false" aria-label="Hex RGB color"></label><button id="save-paint-quick-color" type="button" data-i18n="保存快捷颜色"></button>';
applyTranslations(paintToolbar);

const connectionToolbar = document.createElement('section');
connectionToolbar.id = 'connection-toolbar'; connectionToolbar.className = 'context-toolbar'; connectionToolbar.hidden = true;
connectionToolbar.innerHTML = '<strong data-i18n="连接类型"></strong><div id="connection-kind-buttons" class="connection-kind-buttons"></div><span class="context-help" data-i18n="点击组件端口作为起点，再点击兼容端口完成连接。"></span>';
for (const [kind, label] of [['electric', '电线'], ['mechanical', '机械连接'], ['liquid', '液体管线'], ['gas', '气体管线'], ['belt', '皮带'], ['data', '数据线']]) {
  const button = document.createElement('button'); button.type = 'button'; button.dataset.kind = kind; button.dataset.i18n = label;
  button.addEventListener('click', () => { $('#connection-kind').value = kind; updateConnectionToolbar(); });
  connectionToolbar.querySelector('#connection-kind-buttons').append(button);
}
applyTranslations(connectionToolbar);

const workspace = $('#workspace');
workspace.append(paintToolbar, connectionToolbar);
const leftSidebar = $('#left-sidebar');
const leftSidebarToggle = $('#left-sidebar-toggle');
const leftSidebarResizer = $('#left-sidebar-resizer');
const rightSidebar = $('#right-sidebar');
const rightSidebarToggle = $('#right-sidebar-toggle');
// The object inspector and import diagnostics are used more frequently than
// global grid settings, so keep them at the top of the editor sidebar.
rightSidebar.prepend($('#resource-drawer'));
rightSidebar.prepend($('.inspector-drawer'));
const historyDrawer = document.createElement('details');
historyDrawer.id = 'history-drawer'; historyDrawer.className = 'drawer-section';
historyDrawer.innerHTML = '<summary data-i18n="历史记录"></summary><section class="section"><p class="status" data-i18n="最近 50 次已提交操作。选择任一项即可恢复到该状态。"></p><div id="history-list" class="history-list"></div></section>';
applyTranslations(historyDrawer);
rightSidebar.insertBefore(historyDrawer, $('#grid-settings'));
const sidebarLimits = { min: 240, max: 720, viewport: 360 };
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

const tools = [['select', '选择', 'V'], ['place', '放置', 'P'], ['erase', '删除', 'E'], ['translate', '移动', 'G'], ['rotate', '旋转', 'R'], ['scale', '缩放', 'S'], ['node', '节点', 'N'], ['beam', '梁', 'B'], ['split', '切分梁', 'I'], ['plate', '面板', 'L'], ['glass', '玻璃', 'J'], ['connect', '连接', 'K'], ['paint', '涂色', 'C'], ['hide', '透明化', 'H']];
for (const [id, name, key] of tools) {
  const button = document.createElement('button');
  button.className = 'tool'; button.dataset.tool = id;
  const icons = { select: '↖', place: '＋', erase: '⌫', translate: '✥', rotate: '⟳', scale: '⤢', node: '●', beam: '／', split: '✂', plate: '◇', glass: '◫', connect: '⌁', paint: '◈', hide: '◌' };
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
const restoreTransparencyButton = document.createElement('button');
restoreTransparencyButton.id = 'restore-transparency'; restoreTransparencyButton.className = 'transparency-reset'; restoreTransparencyButton.hidden = true;
restoreTransparencyButton.dataset.i18n = '取消透明化';
restoreTransparencyButton.dataset.i18nTitle = '取消透明化';
restoreTransparencyButton.dataset.i18nAriaLabel = '取消透明化';
applyTranslations(restoreTransparencyButton);
actionHost.append(restoreTransparencyButton);

const viewport = $('#viewport');
const scene = new THREE.Scene();
scene.background = new THREE.Color(settings.backgroundColor);
const interactionHighlights = new THREE.Group();
interactionHighlights.name = 'interaction-highlights'; scene.add(interactionHighlights);
const perspectiveCamera = new THREE.PerspectiveCamera(45, 1, .005, 2000);
const orthographicCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, .005, 2000);
let camera = perspectiveCamera;
camera.position.set(2.5, 2.2, 3);
orthographicCamera.position.copy(camera.position);
// Keep both cameras in the scene graph so camera-attached lights are collected
// by Three.js' renderer while the active camera is used for projection.
scene.add(perspectiveCamera, orthographicCamera);
// Editor-only fill light: it follows the active camera and points along its
// -Z view axis, making interior components readable without changing exports.
const cameraLight = new THREE.SpotLight(0xffffff, settings.cameraLightIntensity, 40, THREE.MathUtils.degToRad(52), .78, .35);
const cameraLightTarget = new THREE.Object3D();
cameraLight.name = 'editor-camera-light'; cameraLight.castShadow = false;
cameraLight.position.set(0, 0, 0); cameraLightTarget.position.set(0, 0, -1);
cameraLight.target = cameraLightTarget;
camera.add(cameraLight, cameraLightTarget);
let renderer;
try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, logarithmicDepthBuffer: true }); }
catch { setText(viewport, '无法初始化 WebGL2。请启用硬件加速或更换浏览器。'); throw new Error('WebGL2 unavailable'); }
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
  if (e.value) {
    dragOccurred = true;
    const nodeId = transform.object?.userData?.topology === 'node' ? transform.object.userData.nodeId : null;
    topologyTransform = nodeId && tool === 'translate' ? { nodeId } : null;
    return;
  }
  if (topologyTransform) {
    const { nodeId } = topologyTransform;
    topologyTransform = null;
    try {
      const point = quantizeWorldVector(transform.object?.position);
      if (!point) throw new Error('节点位置超出整数格范围');
      const result = moveNodeAndMerge(topology, nodeId, point);
      commitTopology(result, result.merged ? '已移动并合并节点' : '已移动节点');
      selectTopologyNode(result.idMap[nodeId] || nodeId);
    } catch (error) { reportError('移动节点失败：{error}', error); }
  } else { commit(); inspect(); }
});
transform.addEventListener('objectChange', () => {
  if (!topologyTransform || transform.object?.userData?.nodeId !== topologyTransform.nodeId) return;
  updateTopologyPreview(topologyTransform.nodeId, transform.object.position);
});
const hemisphereLight = new THREE.HemisphereLight(0xc5e4ff, 0x26384e, 1.1);
scene.add(hemisphereLight);
const light = new THREE.DirectionalLight(0xffffff, settings.lightIntensity);
light.castShadow = true; light.shadow.mapSize.set(2048, 2048); scene.add(light);
function attachCameraLight(nextCamera) {
  cameraLight.removeFromParent(); cameraLightTarget.removeFromParent();
  nextCamera.add(cameraLight, cameraLightTarget);
}
function updateLighting() {
  const azimuth = THREE.MathUtils.degToRad(settings.lightAzimuth);
  const elevation = THREE.MathUtils.degToRad(settings.lightElevation);
  const radius = 8;
  light.position.set(Math.cos(elevation) * Math.cos(azimuth) * radius, Math.sin(elevation) * radius, Math.cos(elevation) * Math.sin(azimuth) * radius);
  light.intensity = settings.lightIntensity;
  light.shadow.radius = settings.lightSoftness;
  // Fill light controls perceived shadow contrast while the directional light
  // remains the actual shadow caster.
  hemisphereLight.intensity = Math.max(.05, 1.35 - settings.shadowStrength * 1.05);
  cameraLight.intensity = settings.cameraLightEnabled ? settings.cameraLightIntensity : 0;
}
updateLighting();
const grid = new THREE.GridHelper(GRID_SIZE, GRID_DIVISIONS, 0x426780, 0x203345);
// World integer coordinates are the centres of construction cells. Offset the
// visual boundaries by half a cell so beams of one-cell width land on cell
// edges instead of straddling a grid-line intersection.
grid.position.set(-CELL_SIZE_WORLD / 2, -.002, -CELL_SIZE_WORLD / 2); scene.add(grid);
const topologyLayer = new THREE.Group();
topologyLayer.name = 'topology-overlay';
scene.add(topologyLayer);
const connectionPortLayer = new THREE.Group();
connectionPortLayer.name = 'connection-ports'; scene.add(connectionPortLayer);
const topologyMaterials = {
  node: new THREE.MeshBasicMaterial({ color: settings.nodeColor, transparent: settings.nodeOpacity < 1, opacity: settings.nodeOpacity, depthTest: true, depthWrite: false }),
  nodeSelected: new THREE.MeshBasicMaterial({ color: 0xe1781d, transparent: settings.nodeOpacity < 1, opacity: settings.nodeOpacity, depthTest: true, depthWrite: false }),
  edge: new THREE.MeshStandardMaterial({ color: STRUCTURE_COLOR, metalness: .05, roughness: .85 }),
  plate: new THREE.MeshStandardMaterial({ color: STRUCTURE_COLOR, metalness: .05, roughness: .85, side: THREE.DoubleSide, depthTest: true, depthWrite: true, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }),
};
const raycaster = new THREE.Raycaster();
raycaster.params.Line.threshold = .06;
const pointer = new THREE.Vector2();
const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const beamPreview = createBeamMesh(new THREE.Vector3(), new THREE.Vector3(), new THREE.MeshStandardMaterial({ color: STRUCTURE_COLOR, transparent: true, opacity: .5, depthWrite: false }));
const beamRuler = createBeamRuler(viewport, () => camera);
const beamLengthLabels = createBeamLengthLabels(viewport, () => camera);
let beamAxisSnap = settings.beamAxisSnap;
let beamPointer = null;
let pointerInCanvas = false;
const beamAnchor = new THREE.Mesh(new THREE.SphereGeometry(.07, 12, 8), new THREE.MeshBasicMaterial({ color: 0xd78624, depthTest: false }));
beamAnchor.visible = false; beamAnchor.renderOrder = 3;
scene.add(beamPreview, beamAnchor);
const buildStatus = document.createElement('span'); buildStatus.id = 'build-status'; buildStatus.className = 'badge'; buildStatus.hidden = true; $('.hud').append(buildStatus);

function nativeDiagnosticColor(index) {
  return new THREE.Color(nativePaintColor(index));
}
function structureMaterial(color, legacyIndex, fallback, side = THREE.DoubleSide) {
  if (typeof color !== 'string' && !Number.isInteger(legacyIndex) && side === THREE.DoubleSide) return fallback;
  const material = new THREE.MeshStandardMaterial({ color: typeof color === 'string' ? color : Number.isInteger(legacyIndex) ? nativeDiagnosticColor(legacyIndex) : fallback.color, metalness: .05, roughness: .85, side, depthTest: true, depthWrite: true, polygonOffset: side !== THREE.DoubleSide, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
  material.userData.topologyPaint = true;
  return material;
}
// A panel sits on the outside of its one-cell-wide perimeter beams. The
// half-cell logical offset puts it at the beam face; this extra 1 mm render
// clearance avoids depth fighting with that face across GPUs and depth modes.
const PLATE_RENDER_CLEARANCE = .001;
function surfaceOffset(value) {
  return value + (value < 0 ? -PLATE_RENDER_CLEARANCE : PLATE_RENDER_CLEARANCE);
}
function plateVertices(nodeIds, positions, normalOffset = CELL_SIZE_WORLD / 2) {
  const points = nodeIds.map(id => positions.get(id));
  const normal = new THREE.Vector3();
  for (let first = 1; first < points.length - 1 && normal.lengthSq() === 0; first++) for (let second = first + 1; second < points.length; second++) {
    normal.copy(points[first]).sub(points[0]).cross(points[second].clone().sub(points[0]));
    if (normal.lengthSq() > 0) break;
  }
  normal.normalize().multiplyScalar(surfaceOffset(normalOffset));
  const vertices = [];
  for (let index = 1; index < points.length - 1; index++) {
    for (const point of [points[0], points[index], points[index + 1]]) vertices.push(...point.clone().add(normal).toArray());
  }
  return vertices;
}
function clearTopologyVisual(layer = topologyLayer) {
  const disposedMaterials = new Set();
  layer.traverse(object => {
    object.geometry?.dispose();
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
      if ((material?.userData?.topologyPaint || material?.userData?.topologyLink) && !disposedMaterials.has(material)) {
        disposedMaterials.add(material); material.dispose();
      }
    }
  });
  layer.clear();
}
function buildTopologyVisual(state, componentPositions = new Map()) {
  const layer = new THREE.Group();
  try {
    const byId = new Map(state.nodes.map(node => [node.id, node]));
    const nodeEdges = new Map();
    for (const node of state.nodes) {
      const marker = new THREE.Mesh(new THREE.SphereGeometry(.055, 10, 8), topologyMaterials.node);
      marker.position.set(node.position.x, node.position.y, node.position.z);
      marker.userData.topology = 'node'; marker.userData.nodeId = node.id;
      marker.visible = showNodes && topologyHelpersVisible && !referencePreview; marker.renderOrder = 2;
      layer.add(marker);
    }
    for (const edge of state.edges) {
      const mesh = createBeamMesh(byId.get(edge.a).position, byId.get(edge.b).position, structureMaterial(edge.color, edge.col, topologyMaterials.edge));
      mesh.userData.topology = 'edge'; mesh.userData.edgeId = edge.id;
      mesh.castShadow = true; mesh.receiveShadow = true;
      mesh.visible = !edge.hidden;
      layer.add(mesh);
      for (const nodeId of [edge.a, edge.b]) {
        if (!nodeEdges.has(nodeId)) nodeEdges.set(nodeId, []);
        nodeEdges.get(nodeId).push(edge);
      }
    }
    // One sleeve per shared node hides the non-manifold seam created when
    // separate beam primitives meet at arbitrary angles.
    for (const [nodeId, edges] of nodeEdges) {
      if (edges.length < 2) continue;
      const edge = edges.find(value => !value.hidden) || edges[0];
      const joint = createBeamJointMesh(byId.get(nodeId).position, structureMaterial(edge.color, edge.col, topologyMaterials.edge));
      joint.userData.topology = 'edge'; joint.userData.edgeId = edge.id; joint.userData.topologyJunction = true; joint.userData.nodeId = nodeId;
      joint.visible = edges.some(value => !value.hidden);
      layer.add(joint);
    }
    for (const plate of state.plates) {
      const positions = new Map(state.nodes.map(node => [node.id, new THREE.Vector3(node.position.x, node.position.y, node.position.z)]));
      const offset = plate.normalOffset ?? CELL_SIZE_WORLD / 2;
      const vertices = plateVertices(plate.nodeIds, positions, offset);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.computeVertexNormals();
      const painted = typeof plate.color_front === 'string' || typeof plate.color_back === 'string' || Number.isInteger(plate.col_front) || Number.isInteger(plate.col_back);
      if (painted) {
        geometry.addGroup(0, vertices.length / 3, 0);
        geometry.addGroup(0, vertices.length / 3, 1);
      }
      let material = painted ? [
        structureMaterial(plate.color_front, plate.col_front, topologyMaterials.plate, THREE.FrontSide),
        structureMaterial(plate.color_back, plate.col_back, topologyMaterials.plate, THREE.BackSide),
      ] : topologyMaterials.plate;
      if (isGlassPlate(plate)) {
        if (!Array.isArray(material)) {
          material = material.clone();
          material.userData.topologyPaint = true;
        }
        for (const item of Array.isArray(material) ? material : [material]) {
          item.transparent = true; item.opacity = .42; item.depthTest = true; item.depthWrite = true; item.polygonOffset = true; item.polygonOffsetFactor = -1; item.polygonOffsetUnits = -1;
        }
      }
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.topology = 'plate'; mesh.userData.plateId = plate.id;
      mesh.userData.nodeIds = [...plate.nodeIds]; mesh.userData.normalOffset = offset;
      mesh.visible = !plate.hidden;
      layer.add(mesh);
    }
    for (const link of state.links || []) {
      const from = componentPositions.get(link.from.componentId);
      const to = componentPositions.get(link.to.componentId);
      if (!from || !to) continue;
      const points = [from, ...(link.points || []), to].map(point => new THREE.Vector3(point.x, point.y, point.z));
      const style = {
        electric: { radius: .012, radialSegments: 8 }, mechanical: { radius: .022, radialSegments: 8 },
        liquid: { radius: .02, radialSegments: 10 }, gas: { radius: .018, radialSegments: 10 },
        belt: { radius: .028, radialSegments: 4 }, data: { radius: .01, radialSegments: 8 },
      }[link.kind];
      const material = new THREE.MeshStandardMaterial({ color: LINK_COLORS[link.kind], metalness: .1, roughness: .6, transparent: true, opacity: .92, depthTest: true, depthWrite: true });
      material.userData.topologyLink = true;
      const route = createConnectionRoute(points, material, style);
      route.renderOrder = 4; route.userData.topology = 'link'; route.userData.linkId = link.id;
      route.traverse(object => { object.userData.topology = 'link'; object.userData.linkId = link.id; });
      layer.add(route);
    }
    return layer;
  } catch (error) { clearTopologyVisual(layer); throw error; }
}
function topologyNodeMarker(nodeId) {
  return topologyLayer.children.find(object => object.userData.topology === 'node' && object.userData.nodeId === nodeId) || null;
}
function updateTopologyPreview(nodeId, value) {
  const point = new THREE.Vector3(value.x, value.y, value.z);
  const positions = new Map(topology.nodes.map(node => [node.id, new THREE.Vector3(node.position.x, node.position.y, node.position.z)]));
  positions.set(nodeId, point);
  for (const object of topologyLayer.children) {
    if (object.userData.topology === 'node' && object.userData.nodeId === nodeId) object.position.copy(point);
    if (object.userData.topology === 'edge') {
      const edge = topology.edges.find(value => value.id === object.userData.edgeId);
      if (edge && !object.userData.topologyJunction) updateBeamMesh(object, positions.get(edge.a), positions.get(edge.b));
      if (object.userData.topologyJunction && object.userData.nodeId === nodeId) object.position.copy(point);
    }
    if (object.userData.topology === 'plate') {
      const nodeIds = object.userData.nodeIds;
      const vertices = plateVertices(nodeIds, positions, object.userData.normalOffset);
      const attribute = object.geometry.getAttribute('position');
      if (attribute.count === vertices.length / 3) attribute.set(vertices);
      else object.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      object.geometry.getAttribute('position').needsUpdate = true;
      object.geometry.computeVertexNormals();
    }
  }
  topologyLayer.updateMatrixWorld(true);
}
function updateNodeVisualState() {
  for (const marker of topologyLayer.children) {
    if (marker.userData.topology !== 'node') continue;
    const selectedNode = marker.userData.nodeId === selectedTopologyNode;
    marker.material = selectedNode ? topologyMaterials.nodeSelected : topologyMaterials.node;
    marker.scale.setScalar((selectedNode ? 1.75 : 1) * (settings.nodeSize / .055));
    marker.visible = showNodes && topologyHelpersVisible && !referencePreview;
  }
}
function replaceTopologyVisual(layer) {
  clearTopologyVisual();
  topologyLayer.add(...[...layer.children]);
  topologyLayer.updateMatrixWorld(true);
  updateNodeVisualState();
  beamLengthLabels.setBeams(topology.nodes, topology.edges);
  beamLengthLabels.setVisible(!referencePreview && settings.beamLengthsVisible);
}
function updateTopologyHelperVisibility() {
  const distance = camera.position.distanceTo(controls.target) / (camera.isOrthographicCamera ? Math.max(camera.zoom, .001) : 1);
  const visible = distance <= TOPOLOGY_HELPER_DISTANCE;
  if (visible === topologyHelpersVisible) return;
  topologyHelpersVisible = visible;
  grid.visible = gridPreferenceVisible && !referencePreview && visible;
  updateNodeVisualState();
}
function clearNodeSelection() {
  if (transform.object?.userData?.topology === 'node') transform.detach();
  selectedTopologyNode = null; nodeMoveFrame = null; topologyTransform = null; updateNodeVisualState();
}
function selectTopologyNode(nodeId) {
  const node = topology.nodes.find(value => value.id === nodeId);
  if (!node) return false;
  selected = null; selectedIds.clear(); selectedTopologyNode = node.id;
  nodeMoveFrame = cameraBuildFrame(camera, new THREE.Vector3(node.position.x, node.position.y, node.position.z));
  updateNodeVisualState();
  if (tool === 'translate') {
    const marker = topologyNodeMarker(node.id);
    if (marker) { transform.setMode('translate'); transform.attach(marker); }
  }
  inspect();
  return true;
}
function cancelBeam() {
  beamDraft = null; beamPointer = null; beamPreview.visible = false; beamAnchor.visible = false; beamRuler.hide();
  setText(buildStatus, '梁 1 格 · 点击起点');
}
function cancelTopologyDraft() {
  cancelBeam(); clearNodeSelection(); plateEdgeIds = []; connectionDraft = null;
  refreshConnectionPorts();
}

function status(message, params = {}) { setText($('#save-status'), message, params); }
function reportError(message, error) { status(message, () => ({ error: t(error.message) })); }
function componentName(def) { return (getLocale() === 'zh' ? def.name_zh || def.name : def.name || def.name_zh) || def.id; }
function categoryName(category) { return getLocale() === 'zh' ? categoryInfo(category).label : category; }
function hideComponentIdTooltip() { componentIdTooltip.hidden = true; }
function showComponentIdTooltip(button) {
  componentIdTooltip.textContent = button.dataset.id || '';
  componentIdTooltip.hidden = false;
  const bounds = button.getBoundingClientRect();
  const width = componentIdTooltip.offsetWidth;
  componentIdTooltip.style.left = Math.max(12, Math.min(window.innerWidth - width - 12, bounds.left + bounds.width / 2 - width / 2)) + 'px';
  componentIdTooltip.style.top = Math.max(8, bounds.top - componentIdTooltip.offsetHeight - 7) + 'px';
}
function selectedObjects() { return objects.filter(object => selectedIds.has(object.userData.id)); }
function selectedObjectIds() { return selectedObjects().map(object => object.userData.id); }
function clearConnectionPorts() {
  connectionPortLayer.traverse(object => { object.geometry?.dispose(); object.material?.dispose(); });
  connectionPortLayer.clear();
}
function refreshConnectionPorts() {
  clearConnectionPorts();
  if (tool !== 'connect' || referencePreview) {
    $('#viewport').dataset.connectionPortCount = '0';
    return;
  }
  const kind = $('#connection-kind').value;
  const color = LINK_COLORS[kind];
  const portsForKind = definition => {
    const logicNodes = Array.isArray(definition?.logic_nodes) ? definition.logic_nodes : [];
    const logicPorts = logicNodes.map((node, port) => ({ ...node, port })).filter(node =>
      node.type === kind || (kind === 'mechanical' && typeof node.type === 'string' && node.type.startsWith('mechanical_')),
    );
    if (logicPorts.length || kind !== 'mechanical') return logicPorts;
    // Torque surfaces are the only definition-backed mechanical endpoints
    // currently available. Their exact game compatibility is still unknown.
    return (definition?.surfaces || []).map((surface, port) => ({ ...surface, port })).filter(surface => typeof surface.type === 'string' && surface.type.startsWith('torque'));
  };
  for (const object of objects) {
    if (!object.visible) continue;
    const ports = portsForKind(definitions.get(object.userData.type));
    if (!ports.length) continue;
    object.updateWorldMatrix(true, false);
    ports.forEach(portDefinition => {
      const nativePosition = Array.isArray(portDefinition.pos) && portDefinition.pos.length === 3 ? portDefinition.pos : [0, 0, 0];
      if (!nativePosition.every(Number.isFinite)) return;
      const port = portDefinition.port;
      const marker = new THREE.Mesh(new THREE.SphereGeometry(.055, 10, 8), new THREE.MeshBasicMaterial({ color, transparent: settings.nodeOpacity < 1, opacity: settings.nodeOpacity, depthTest: false, depthWrite: false }));
      marker.position.set(nativePosition[0] * CELL_SIZE_WORLD, nativePosition[1] * CELL_SIZE_WORLD, nativePosition[2] * CELL_SIZE_WORLD);
      object.localToWorld(marker.position);
      marker.scale.setScalar(settings.nodeSize / .055);
      marker.renderOrder = 7; marker.userData.connectionPort = { componentId: object.userData.id, port, type: portDefinition.type || 'surface' };
      connectionPortLayer.add(marker);
    });
  }
  $('#viewport').dataset.connectionPortCount = String(connectionPortLayer.children.length);
}
function pickConnectionPort() {
  const hit = raycaster.intersectObjects(connectionPortLayer.children, true)[0];
  return hit?.object.userData.connectionPort || null;
}
function clearInteractionHighlights() {
  interactionHighlights.traverse(object => { object.geometry?.dispose(); object.material?.dispose(); });
  interactionHighlights.clear();
}
function updateInteractionHighlights(hovered = hoveredObject) {
  clearInteractionHighlights();
  if (!['select', 'erase'].includes(tool) || referencePreview) {
    $('#viewport').dataset.interactionHighlightCount = '0';
    return;
  }
  const add = (object, color) => {
    if (!object) return;
    const helper = new THREE.BoxHelper(object, color);
    helper.material.depthTest = false; helper.material.transparent = true; helper.material.opacity = .9;
    helper.renderOrder = 8; interactionHighlights.add(helper);
  };
  if (tool === 'select') for (const object of selectedObjects()) add(object, 0x2787f5);
  add(hovered, tool === 'erase' ? 0xe5484d : 0xf0a229);
  $('#viewport').dataset.interactionHighlightCount = String(interactionHighlights.children.length);
}
function setTool(value) {
  if (busy) return;
  tool = value;
  scheduleSettings();
  document.querySelectorAll('.tool').forEach(b => b.classList.toggle('active', b.dataset.tool === tool));
  paintToolbar.hidden = value !== 'paint' || referencePreview;
  connectionToolbar.hidden = value !== 'connect' || referencePreview;
  transform.detach();
  if (value !== 'place') clearPlacementPreview();
  else if (cursorPoint && pointerInCanvas) void updatePlacementPreview(cursorPoint);
  if (value !== 'beam') cancelBeam();
  buildStatus.hidden = value !== 'beam';
  if (value === 'beam' && !beamDraft) setText(buildStatus, '梁 1 格 · 点击起点');
  if (!['plate', 'glass'].includes(value)) plateEdgeIds = [];
  if (value !== 'connect') connectionDraft = null;
  if (!['node', 'translate'].includes(value)) clearNodeSelection();
  if (selected && selectedIds.size === 1 && ['translate', 'rotate', 'scale'].includes(tool)) {
    transform.setMode(tool); transform.attach(selected);
  } else if (tool === 'translate' && selectedTopologyNode) {
    const marker = topologyNodeMarker(selectedTopologyNode);
    if (marker) { transform.setMode('translate'); transform.attach(marker); }
  }
  refreshConnectionPorts();
  updateInteractionHighlights();
}
function setGridConstraints() {
  transform.setTranslationSnap(CELL_SIZE_WORLD);
  transform.setRotationSnap(Math.PI / 2);
  transform.setScaleSnap(null);
}
function select(object, { toggle = false } = {}) {
  clearNodeSelection();
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
  updateInteractionHighlights();
  inspect();
}
function snapshot() {
  return objects.map(o => ({ id: o.userData.id, type: o.userData.type,
    ...(o.userData.gridId ? { gridId: o.userData.gridId } : {}),
    ...(o.userData.mirror ? { mirror: { ...o.userData.mirror } } : {}),
    ...(Array.isArray(o.userData.colors) ? { colors: [...o.userData.colors] } : {}),
    ...(o.userData.hidden ? { hidden: true } : {}),
    ...(Array.isArray(o.userData.nativeExtension) ? { nativeExtension: [...o.userData.nativeExtension] } : {}),
    position: assertGridVector(o.position, '组件位置'),
    rotation: Object.fromEntries(axes.map(a => [a, o.rotation[a]])),
    scale: Object.fromEntries(axes.map(a => [a, Math.abs(o.scale[a])])) }));
}
function commit(label = '编辑', params = {}) {
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
  history.commit(currentProject(), { key: label, params });
  if (topology.links?.length) replaceTopologyVisual(buildTopologyVisual(topology, new Map(snapshot().map(object => [object.id, object.position]))));
  refresh();
}
function vehicleDimensions() {
  const bounds = new THREE.Box3();
  let hasBounds = false;
  for (const object of objects) {
    const box = new THREE.Box3().setFromObject(object);
    if (!box.isEmpty()) { bounds.union(box); hasBounds = true; }
  }
  for (const node of topology.nodes) {
    bounds.expandByPoint(new THREE.Vector3(node.position.x, node.position.y, node.position.z));
    hasBounds = true;
  }
  if (!hasBounds) return null;
  return Object.fromEntries(axes.map(axis => {
    const cells = Math.max(0, Math.ceil(bounds.max[axis] / CELL_SIZE_WORLD) - Math.floor(bounds.min[axis] / CELL_SIZE_WORLD));
    return [axis, { cells, cm: cells * 8 }];
  }));
}
function vehicleSizeElement() {
  let element = $('#vehicle-size');
  if (element) return element;
  const hud = $('.hud');
  if (!hud) return null;
  element = document.createElement('span'); element.id = 'vehicle-size'; element.className = 'badge';
  const cursor = $('#cursor-pos');
  hud.insertBefore(element, cursor || null);
  return element;
}
function renderHistory() {
  const host = $('#history-list'); host.replaceChildren();
  const first = Math.max(0, history.entries.length - 50);
  for (let index = history.entries.length - 1; index >= first; index--) {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'history-entry';
    const label = history.labels[index];
    const text = label && typeof label === 'object' ? t(label.key, label.params) : t(label || '编辑');
    button.textContent = `${index + 1}. ${text}`;
    button.title = t('恢复此状态'); button.setAttribute('aria-label', `${t('恢复此状态')} · ${button.textContent}`);
    button.setAttribute('aria-current', String(index === history.cursor)); button.disabled = busy || index === history.cursor;
    button.onclick = () => restoreHistory(index); host.append(button);
  }
}
function refresh() {
  setText($('#object-count'), '{count} 个组件', { count: objects.length });
  const links = (topology.links || []).length;
  setText($('#topology-count'), links ? '{nodes} 节点 · {edges} 梁 · {plates} 面板 · {links} 连接' : '{nodes} 节点 · {edges} 梁 · {plates} 面板', { nodes: topology.nodes.length, edges: topology.edges.length, plates: topology.plates.length, links });
  const dimensions = vehicleDimensions();
  const size = vehicleSizeElement();
  if (size) {
    if (!dimensions) size.textContent = `${t('载具尺寸')}: ${t('空载具')}`;
    else size.textContent = `${t('载具尺寸')}: ${axes.map(axis => t('{axis} {cells} 格 / {cm} cm', { axis: axis.toUpperCase(), ...dimensions[axis] })).join(' · ')}`;
    size.dataset.topologyCount = `${topology.nodes.length}/${topology.edges.length}/${topology.plates.length}/${(topology.links || []).length}`;
  }
  $('#undo-btn').disabled = busy || history.cursor === 0;
  $('#redo-btn').disabled = busy || history.cursor === history.entries.length - 1;
  const missing = objects.filter(o => o.userData.visual !== 'mesh').length;
  setText($('#validation'), '{geometry} 连接拓扑、占用规则、动态装配和游戏文件兼容性尚未验证。', () => ({ geometry: missing ? t('{count} 个组件没有真实 Mesh。', { count: missing }) : t('静态几何已加载。') }));
  renderHistory();
  updateTransparencyAction();
}
function updateTransparencyAction() {
  const hasHiddenObjects = objects.some(object => object.userData.hidden)
    || topology.edges.some(edge => edge.hidden)
    || topology.plates.some(plate => plate.hidden);
  restoreTransparencyButton.hidden = !hasHiddenObjects;
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
  const object = await library.instantiate(def, { nativeExtension: data.nativeExtension });
  object.userData = { ...object.userData, id: data.id, type: data.type, gridId: data.gridId, mirror: data.mirror, colors: data.colors, nativeExtension: data.nativeExtension, hidden: data.hidden === true };
  if (Number.isInteger(data.colors?.[0])) object.traverse(child => {
    if (!child.isMesh) return;
    for (const material of Array.isArray(child.material) ? child.material : [child.material]) material.color.set(nativePaintColor(data.colors[0]));
  });
  for (const field of ['position', 'rotation', 'scale']) object[field].set(...axes.map(a => data[field][a]));
  if (data.mirror?.axis) reflectObject(object, data.mirror.axis);
  object.visible = !data.hidden;
  return object;
}
function disposePlacementPreview() {
  if (!placementPreview) return;
  scene.remove(placementPreview); disposeObject(placementPreview);
  placementPreview = null; placementPreviewType = '';
}
function clearPlacementPreview() {
  placementPreviewRequest++;
  placementPreviewLoadingType = '';
  disposePlacementPreview();
}
function setPlacementPreviewPoint(point) {
  if (!placementPreview || !point) return;
  placementPreview.position.set(point.x, 0, point.z);
  placementPreview.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(placementPreview);
  placementPreview.position.y = cellToWorld(Math.ceil((point.y - box.min.y) / CELL_SIZE_WORLD));
  placementPreview.visible = true;
  placementPreview.updateMatrixWorld(true);
}
function makePlacementPreview(object) {
  object.traverse(child => {
    if (!child.isMesh) return;
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    const ghostMaterials = materials.map(material => {
      const ghost = material.clone();
      ghost.transparent = true; ghost.opacity = Math.min(ghost.opacity, .35); ghost.depthWrite = false; ghost.needsUpdate = true;
      return ghost;
    });
    child.material = Array.isArray(child.material) ? ghostMaterials : ghostMaterials[0];
    child.castShadow = false; child.receiveShadow = false; child.renderOrder = 1;
  });
  return object;
}
async function updatePlacementPreview(point) {
  if (tool !== 'place' || !point || !catalog.has(selectedType)) {
    if (placementPreview) placementPreview.visible = false;
    return;
  }
  if (placementPreview && placementPreviewType === selectedType) { setPlacementPreviewPoint(point); return; }
  if (placementPreviewLoadingType === selectedType) return;
  const type = selectedType; const request = ++placementPreviewRequest;
  placementPreviewLoadingType = type;
  disposePlacementPreview();
  try {
    const definition = await catalog.definition(type);
    const preview = makePlacementPreview(await library.instantiate(definition));
    if (request !== placementPreviewRequest || tool !== 'place' || type !== selectedType) { disposeObject(preview); return; }
    placementPreviewLoadingType = '';
    placementPreview = preview; placementPreviewType = type; scene.add(preview);
    setPlacementPreviewPoint(cursorPoint || point);
  } catch (error) {
    if (request === placementPreviewRequest) { placementPreviewLoadingType = ''; reportError('放置虚影加载失败：{error}', error); }
  }
}
async function restore(items, nextTopology = topology) {
  if (referencePreview) setReferencePreview(false);
  const candidate = validateDocument(project(items, nextTopology), catalog.index);
  const next = [];
  let visual;
  try {
    // Native vehicles commonly reuse a small set of definitions many times.
    // Prime each definition once, then let the published Mesh cache share its
    // in-flight downloads across all component instances.
    await Promise.all([...new Set(candidate.objects.map(data => data.type))].map(async type => {
      const definition = await catalog.definition(type); definitions.set(type, definition);
    }));
    next.push(...await Promise.all(candidate.objects.map(data => createObject(data))));
    visual = buildTopologyVisual(candidate.topology, new Map(candidate.objects.map(object => [object.id, object.position])));
  } catch (error) { next.forEach(disposeObject); throw error; }
  cancelTopologyDraft();
  transform.detach(); selected = null; selectedIds.clear();
  objects.forEach(o => { scene.remove(o); disposeObject(o); });
  objects = next; objects.forEach(o => scene.add(o));
  topology = candidate.topology;
  replaceTopologyVisual(visual);
  refreshConnectionPorts();
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
  commit('放置组件'); inspect();
  status(object.userData.visual === 'mesh' ? '已放置真实静态 Mesh' : '已放置缺失资源标记');
}
async function remove(object) {
  if (!object) return;
  const ids = selectedIds.has(object.userData.id) ? selectedObjectIds() : [object.userData.id];
  const result = removeObjects(snapshot(), ids);
  await restore(result.objects, { ...topology, links: (topology.links || []).filter(link => !ids.includes(link.from.componentId) && !ids.includes(link.to.componentId)) });
  select(null);
  commit('删除组件');
  status('已删除 {count} 个组件', { count: result.removed.length });
}
async function applyStructural(result, nextSelectedIds, message, params = {}) {
  await restore(result.objects, topology);
  const ids = new Set(nextSelectedIds || []);
  const next = objects.filter(object => ids.has(object.userData.id));
  selectedIds = new Set(next.map(object => object.userData.id));
  selected = next[0] || null;
  setTool(tool); inspect(); commit(message, params); status(message, params);
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
restoreTransparencyButton.onclick = () => {
  if (!busy) void transact(restoreTransparency);
};
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
function restoreHistory(index) {
  if (busy || !Number.isInteger(index) || index < 0 || index >= history.entries.length || index === history.cursor) return;
  const value = structuredClone(history.entries[index]);
  transact(async () => {
    await restore(value.objects, value.topology);
    history.cursor = index;
    status('已恢复历史记录');
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
  hideComponentIdTooltip();
  const query = $('#component-search').value.trim().toLowerCase();
  const category = $('#category-filter').value;
  const restrictedCategories = new Set(['building', 'furniture']);
  const showRestricted = $('#show-building-furniture').checked;
  const host = $('#component-list'); host.replaceChildren();
  const filtered = [...catalog.entries()].filter(d => (showRestricted || !restrictedCategories.has(d.category)) && (!category || d.category === category) && [d.id, d.name, d.name_zh, d.category, categoryInfo(d.category).label].join(' ').toLowerCase().includes(query));
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
    button.addEventListener('mouseenter', () => showComponentIdTooltip(button));
    button.addEventListener('mouseleave', hideComponentIdTooltip);
    button.addEventListener('focus', () => showComponentIdTooltip(button));
    button.addEventListener('blur', hideComponentIdTooltip);
    button.onclick = () => { if (busy) return; selectedType = def.id; setTool('place'); renderCatalog(); status('准备放置：{name}', () => ({ name: componentName(def) })); };
    host.append(button);
  }
  if (!filtered.length) {
    const empty = document.createElement('p'); empty.className = 'catalog-empty'; empty.textContent = t('没有匹配组件，试试其他名称或分类。'); host.append(empty);
  }
}
function renderCategories() {
  for (const option of $('#category-filter').options) {
    if (!option.value) continue;
    option.hidden = !$('#show-building-furniture').checked && ['building', 'furniture'].includes(option.value);
    option.textContent = categoryName(option.value) + (getLocale() === 'zh' ? ' · ' + option.value : '');
  }
  if ($('#category-filter').selectedOptions[0]?.hidden) $('#category-filter').value = '';
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
function placementPoint() {
  const targets = [...objects.filter(object => object.visible), ...topologyLayer.children.filter(object => object.visible && object.userData.topology !== 'node')];
  return resolvePlacementPoint(raycaster, targets, plane);
}
function pick() {
  const rect = renderer.domElement.getBoundingClientRect();
  let closest = null; let distance = 56;
  for (const candidate of objects) {
    if (!candidate.visible) continue;
    const anchor = candidate.getWorldPosition(new THREE.Vector3()).project(camera);
    if (anchor.z < -1 || anchor.z > 1) continue;
    const pixels = Math.hypot((anchor.x - pointer.x) * rect.width / 2, (anchor.y - pointer.y) * rect.height / 2);
    if (pixels < distance) { closest = candidate; distance = pixels; }
  }
  // Prefer an unambiguous placement anchor so overlapping published meshes do
  // not make a nearby component impossible to multi-select.
  if (closest) return closest;
  let object = raycaster.intersectObjects(objects.filter(candidate => candidate.visible), true)[0]?.object;
  while (object && !objects.includes(object)) object = object.parent;
  return object || null;
}
function pickTopologyNode(includeHidden = false) {
  if ((!showNodes || !topologyHelpersVisible) && !includeHidden) return null;
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
function pickPaintTopology() {
  const hits = raycaster.intersectObjects(topologyLayer.children.filter(object => object.visible && ['edge', 'plate'].includes(object.userData.topology)), true);
  // A panel intentionally sits just outside its supporting beams. At their
  // shared silhouette it can be marginally closer to the camera, so prefer a
  // beam hit whenever the pointer actually intersects one.
  const hit = hits.find(value => value.object.userData.topology === 'edge') || hits[0];
  if (hit) {
    const kind = hit.object.userData.topology;
    return { kind, id: hit.object.userData[kind + 'Id'] };
  }
  // The visible beam profile is deliberately narrow. Retain a reliable
  // centre-line picking fallback for construction tools when a ray falls
  // between facets of the octagonal visual mesh at a distance.
  let nearest = null;
  for (const edge of topology.edges) {
    if (edge.hidden) continue;
    const a = topology.nodes.find(node => node.id === edge.a)?.position;
    const b = topology.nodes.find(node => node.id === edge.b)?.position;
    if (!a || !b) continue;
    const distanceSq = raycaster.ray.distanceSqToSegment(new THREE.Vector3(a.x, a.y, a.z), new THREE.Vector3(b.x, b.y, b.z));
    if (distanceSq > CELL_SIZE_WORLD ** 2 || (nearest && distanceSq >= nearest.distanceSq)) continue;
    nearest = { kind: 'edge', id: edge.id, distanceSq };
  }
  return nearest && { kind: nearest.kind, id: nearest.id };
}
function paintTopology() {
  const target = pickPaintTopology();
  if (!target) { status('涂色工具需要点击梁或面板'); return; }
  const color = paintColorValue();
  if (!color) { status('颜色必须是 #RRGGBB 格式'); return; }
  if (target.kind === 'edge') {
    commitTopology({ ...topology, edges: topology.edges.map(edge => edge.id === target.id ? { ...edge, color } : edge) }, '已为梁设置颜色 {color}', { color });
    return;
  }
  const side = $('#paint-side').value;
  const field = side === 'back' ? 'color_back' : 'color_front';
  commitTopology({ ...topology, plates: topology.plates.map(plate => plate.id === target.id ? { ...plate, [field]: color } : plate) }, '已为面板{side}设置颜色 {color}', { color, side: side === 'back' ? '背面' : '前面' });
}
function hidePickedObject() {
  const selectedComponents = selectedObjects().filter(object => object.visible);
  if (selectedComponents.length) {
    for (const object of selectedComponents) {
      object.userData.hidden = true;
      object.visible = false;
    }
    select(null);
    commit('已透明化 {count} 个对象', { count: selectedComponents.length });
    status('已透明化 {count} 个对象', { count: selectedComponents.length });
    return true;
  }
  const topologyTarget = pickPaintTopology();
  if (topologyTarget?.kind === 'edge') {
    commitTopology({ ...topology, edges: topology.edges.map(edge => edge.id === topologyTarget.id ? { ...edge, hidden: true } : edge) }, '已透明化 {count} 个对象', { count: 1 });
    return true;
  }
  if (topologyTarget?.kind === 'plate') {
    commitTopology({ ...topology, plates: topology.plates.map(plate => plate.id === topologyTarget.id ? { ...plate, hidden: true } : plate) }, '已透明化 {count} 个对象', { count: 1 });
    return true;
  }
  const object = pick();
  if (!object) { status('透明化工具需要点击组件、梁或面板'); return false; }
  object.userData.hidden = true;
  object.visible = false;
  select(null);
  commit('已透明化 {count} 个对象', { count: 1 });
  status('已透明化 {count} 个对象', { count: 1 });
  return true;
}
async function restoreTransparency() {
  const items = snapshot().map(object => {
    const { hidden, ...visibleObject } = object;
    return visibleObject;
  });
  const nextTopology = {
    ...topology,
    edges: topology.edges.map(edge => {
      const { hidden, ...visibleEdge } = edge;
      return visibleEdge;
    }),
    plates: topology.plates.map(plate => {
      const { hidden, ...visiblePlate } = plate;
      return visiblePlate;
    }),
  };
  await restore(items, nextTopology);
  commit('已取消透明化');
  status('已取消透明化');
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
  const visual = buildTopologyVisual(candidate.topology, new Map(candidate.objects.map(object => [object.id, object.position])));
  topology = candidate.topology;
  replaceTopologyVisual(visual);
  history.commit(candidate, { key: message, params });
  refresh();
  const count = topology.nodes.length;
  status('{message}（{count} 逻辑节点）', () => ({ message: t(message, params), count }));
}
function deleteTopology(kind, id) {
  const command = { node: removeNode, edge: removeEdge, plate: removePlate }[kind];
  if (kind === 'link') {
    commitTopology({ ...topology, links: removeLink(topology.links || [], id, new Set(snapshot().map(object => object.id))).links }, '已删除连接');
    return;
  }
  if (!command) return;
  if (kind === 'node' && selectedTopologyNode === id) clearNodeSelection();
  commitTopology(command(topology, id), kind === 'node' ? '已删除节点及其关联拓扑' : kind === 'edge' ? '已删除梁' : '已删除面板');
}
function finishPlate(type = 'plate') {
  const glass = type === 'glass';
  if (plateEdgeIds.length < 3) { status(glass ? '玻璃至少需要选择三根梁' : '面板至少需要选择三根梁'); return; }
  try {
    const command = glass ? createGlassPlateFromEdges : createPlateFromEdges;
    const result = command(topology.plates, plateEdgeIds, topology.edges, topology.nodes, { normalOffset: CELL_SIZE_WORLD / 2 });
    commitTopology({ ...topology, plates: result.plates }, glass ? '已创建玻璃面板' : '已创建面板');
    plateEdgeIds = [];
  } catch (error) { reportError('面板创建失败：{error}', error); }
}
function splitPickedEdge() {
  const hit = raycaster.intersectObjects(topologyLayer.children.filter(object => object.visible && object.userData.topology === 'edge'), false)[0];
  if (!hit) { status('切分工具需要点击梁的内部'); return false; }
  const edge = topology.edges.find(value => value.id === hit.object.userData.edgeId);
  if (!edge) return false;
  const ends = [edge.a, edge.b].map(id => topology.nodes.find(node => node.id === id).position);
  const a = new THREE.Vector3(ends[0].x, ends[0].y, ends[0].z);
  const b = new THREE.Vector3(ends[1].x, ends[1].y, ends[1].z);
  const center = new THREE.Vector3();
  raycaster.ray.distanceSqToSegment(a, b, new THREE.Vector3(), center);
  const candidates = edgeSplitPoints(topology.nodes, edge.id, topology.edges);
  if (!candidates.length) { status('该梁没有可用整格切分点'); return false; }
  const point = candidates.map(value => new THREE.Vector3(value.x, value.y, value.z)).reduce((closest, candidate) => candidate.distanceToSquared(center) < closest.distanceToSquared(center) ? candidate : closest);
  const result = splitEdge(topology.nodes, topology.edges, edge.id, point, topology.plates);
  commitTopology({ ...topology, nodes: result.nodes, edges: result.edges, plates: result.plates }, '已切分实体梁并新增节点');
  return true;
}
function handleBeamClick(event) {
  if (event.altKey) return splitPickedEdge();
  /* Legacy inline split implementation retained as a reference; splitPickedEdge handles both the tool and Alt shortcut.
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
  */
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
function handleConnectionClick() {
  const endpoint = pickConnectionPort();
  if (!endpoint) { status('连接工具需要点击组件端口'); return; }
  if (!connectionDraft) {
    connectionDraft = endpoint;
    $('#connection-from-port').value = String(endpoint.port);
    refreshConnectionPorts();
    status('已选择连接起点；点击目标组件完成，Esc 取消');
    return;
  }
  if (connectionDraft.componentId === endpoint.componentId && connectionDraft.port === endpoint.port) { status('请选择另一个组件端口作为连接终点'); return; }
  $('#connection-to-port').value = String(endpoint.port);
  const kind = $('#connection-kind').value;
  const result = createLink(topology.links || [], { kind, from: connectionDraft, to: endpoint, points: [] }, new Set(snapshot().map(item => item.id)));
  connectionDraft = null;
  commitTopology({ ...topology, links: result.links }, '已创建 {kind} 连接', { kind });
  refreshConnectionPorts();
}
function handleTopologyClick(point) {
  if (tool === 'node') {
    const nodeId = pickTopologyNode();
    if (nodeId) {
      if (selectedTopologyNode && selectedTopologyNode !== nodeId) {
        try {
          const result = mergeNodes(topology.nodes, topology.edges, topology.plates, selectedTopologyNode, nodeId, topology.links);
          commitTopology(result, '已合并节点');
          clearNodeSelection();
        } catch (error) { reportError('节点合并失败：{error}', error); }
      } else {
        selectTopologyNode(nodeId);
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
    if (!created.created) selectTopologyNode(created.node.id);
    return true;
  }
  if (tool === 'plate' || tool === 'glass') {
    const hit = raycaster.intersectObjects(topologyLayer.children.filter(object => object.visible && object.userData.topology === 'edge'), false)[0];
    const edgeId = hit?.object.userData.edgeId;
    if (!edgeId) { status(tool === 'glass' ? '玻璃工具需要选择围成闭合环的梁' : '面板工具需要选择围成闭合环的梁'); return true; }
    if (plateEdgeIds.includes(edgeId)) return true;
    plateEdgeIds.push(edgeId);
    status(tool === 'glass' ? '玻璃已选择 {count} 根梁；按 Enter 创建，Esc 取消' : '面板已选择 {count} 根梁；按 Enter 创建，Esc 取消', { count: plateEdgeIds.length });
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
  if (tool === 'select' || tool === 'erase') {
    const nextHover = pick();
    if (nextHover !== hoveredObject) { hoveredObject = nextHover; updateInteractionHighlights(); }
  }
  const rawPoint = tool === 'beam' ? beamPoint() : tool === 'node' ? nodePoint() : tool === 'place' ? placementPoint() : raycaster.ray.intersectPlane(plane, new THREE.Vector3());
  const gridPoint = rawPoint && quantizeWorldVector(rawPoint);
  const point = gridPoint ? new THREE.Vector3(gridPoint.x, gridPoint.y, gridPoint.z) : null;
  cursorPoint = point;
  setText($('#cursor-pos'), point ? '{coordinates}' : '无法定位：射线与建造平面平行', { coordinates: point ? axes.map(axis => axis.toUpperCase() + ' ' + worldToCell(point[axis]) + ' 格').join(' · ') : '' });
  updateBeamPreview(point);
  void updatePlacementPreview(point);
});
renderer.domElement.addEventListener('pointerleave', () => { pointerInCanvas = false; hoveredObject = null; updateInteractionHighlights(); beamPreview.visible = false; beamRuler.hide(); if (placementPreview) placementPreview.visible = false; });
renderer.domElement.addEventListener('pointerup', event => {
  if (!down || event.button !== 0) return;
  const moved = Math.hypot(event.clientX - down.x, event.clientY - down.y); down = null;
  if (busy || dragOccurred || moved > 5 || (transform.axis && ['translate', 'rotate', 'scale'].includes(tool))) return;
  pointerRay(event);
  if (tool === 'beam') {
    try { handleBeamClick(event); } catch (error) { reportError('梁操作失败：{error}', error); }
    return;
  }
  if (tool === 'split') {
    try { splitPickedEdge(); } catch (error) { reportError('梁切分失败：{error}', error); }
    return;
  }
  if (tool === 'connect') {
    try { handleConnectionClick(); } catch (error) { reportError('连接操作失败：{error}', error); }
    return;
  }
  if (tool === 'paint') {
    paintTopology();
    return;
  }
  if (tool === 'hide') {
    hidePickedObject();
    return;
  }
  if (tool === 'node') {
    if (!showNodes) { status('节点辅助已隐藏，请先显示节点后编辑节点或面板；直接建梁不受影响'); return; }
    const point = nodePoint();
    try { if (point && point.length() <= 10000) handleTopologyClick(point); }
    catch (error) { reportError('拓扑操作失败：{error}', error); }
    return;
  }
  if (tool === 'plate' || tool === 'glass') {
    try { handleTopologyClick(); }
    catch (error) { reportError('拓扑操作失败：{error}', error); }
    return;
  }
  if (tool === 'place') {
    const point = placementPoint();
    if (!point || point.length() > 1000) return;
    transact(async () => { await place(point); if (!event.shiftKey) tool = 'select'; });
  } else if (tool === 'erase') {
    const hit = pickTopology();
    if (hit) deleteTopology(hit.kind, hit.id); else transact(async () => { await remove(pick()); });
  } else if (tool === 'translate' && pickTopologyNode()) {
    selectTopologyNode(pickTopologyNode());
  } else select(pick(), { toggle: event.shiftKey });
});
renderer.domElement.addEventListener('pointercancel', () => { down = null; cancelBeam(); });

function fit({ reference = referencePreview } = {}) {
  const box = new THREE.Box3();
  if (selectedIds.size) selectedObjects().forEach(object => box.expandByObject(object));
  else if (reference && topology.nodes.length) topology.nodes.forEach(node => box.expandByPoint(new THREE.Vector3(node.position.x, node.position.y, node.position.z)));
  else {
    objects.forEach(o => box.expandByObject(o));
    box.expandByObject(topologyLayer);
  }
  if (box.isEmpty()) { controls.target.set(0, .2, 0); camera.position.set(2.5, 2.2, 3); return; }
  const center = box.getCenter(new THREE.Vector3());
  // The game reference uses a much tighter, square presentation than the
  // editable desktop viewport. This is deliberately only a framing aid.
  const fov = camera.isPerspectiveCamera ? camera.fov : 45;
  const distance = Math.max(.4, box.getSize(new THREE.Vector3()).length() / Math.sin(fov * Math.PI / 360) * (reference ? .72 : 1));
  camera.position.copy(center).add(new THREE.Vector3(1, .8, 1).normalize().multiplyScalar(distance));
  controls.target.copy(center); controls.update();
}
$('#fit-btn').onclick = fit;
for (const button of document.querySelectorAll('.view-controls [data-view]')) button.remove();
const viewLabels = { orientation: 'XYZ 视角指示器', right: '右视图 +X', left: '左视图 −X', top: '顶视图 +Y', bottom: '底视图 −Y', front: '前视图 +Z', back: '后视图 −Z', iso: '等距' };
const orientation = createOrientationIndicator(viewport, () => camera, view => {
  if (busy || transform.dragging) return;
  const damping = controls.enableDamping;
  controls.enableDamping = false; controls.update();
  orientCamera(camera, controls, view);
  controls.enableDamping = damping;
  scheduleSettings();
}, view => t(viewLabels[view]));
orientation.footer.append($('#fit-btn'));
function setReferencePreview(value) {
  referencePreview = Boolean(value);
  scene.background.set(referencePreview ? 0x000000 : settings.backgroundColor);
  grid.visible = !referencePreview && gridPreferenceVisible && topologyHelpersVisible;
  transform.getHelper().visible = !referencePreview;
  for (const object of topologyLayer.children) if (object.userData.topology === 'link') object.visible = !referencePreview;
  beamPreview.visible = false; beamAnchor.visible = false; beamRuler.hide();
  updateNodeVisualState();
  beamLengthLabels.setVisible(!referencePreview && settings.beamLengthsVisible);
  orientation.root.hidden = referencePreview;
  $('.view-controls').hidden = referencePreview;
  $('.top-tool-section').hidden = referencePreview;
  paintToolbar.hidden = referencePreview || tool !== 'paint';
  connectionToolbar.hidden = referencePreview || tool !== 'connect';
  $('.hud').hidden = referencePreview;
  leftSidebarToggle.hidden = referencePreview;
  rightSidebarToggle.hidden = referencePreview;
  $('#native-reference-preview-btn').setAttribute('aria-pressed', String(referencePreview));
  setText($('#native-reference-preview-btn'), referencePreview ? '退出参考预览' : '参考预览');
  refreshConnectionPorts();
  if (referencePreview) fit({ reference: true });
}
nativeReferencePreviewButton.onclick = () => {
  if (busy || !objects.length) return;
  setReferencePreview(!referencePreview);
  status(referencePreview ? '已开启参考预览：编辑辅助已隐藏，可对照 vehicle.png；相机、光照和游戏材质尚未验证' : '已退出参考预览');
};
const gridFields = document.createElement('div');
gridFields.innerHTML = '<div class="property"><label for="grid-color" data-i18n="网格颜色"></label><input id="grid-color" type="color"></div><div class="property"><label for="grid-opacity" data-i18n="网格透明度"></label><input id="grid-opacity" type="range" min="0" max="1" step="0.05"></div><div class="property"><label for="grid-style" data-i18n="网格线型"></label><select id="grid-style"><option value="solid" data-i18n="实线"></option><option value="dashed" data-i18n="虚线"></option></select></div><h2 data-i18n="节点显示"></h2><div class="property"><label for="node-color" data-i18n="节点颜色"></label><input id="node-color" type="color"></div><div class="property"><label for="node-size" data-i18n="节点大小"></label><input id="node-size" type="range" min="0.02" max="0.25" step="0.005"><output id="node-size-value"></output></div><div class="property"><label for="node-opacity" data-i18n="节点透明度"></label><input id="node-opacity" type="range" min="0" max="1" step="0.05"></div><h2 data-i18n="结构显示"></h2><div class="property"><label for="beam-lengths-visible" data-i18n="显示梁 XYZ 长度（格）"></label><input id="beam-lengths-visible" type="checkbox"></div><h2 data-i18n="涂色"></h2><div class="property"><label for="paint-color" data-i18n="颜色（Hex RGB）"></label><input id="paint-color" type="color" value="#bd2636"><input id="paint-color-hex" type="text" value="#bd2636" maxlength="7" spellcheck="false"><output id="paint-color-preview" class="paint-color-preview"></output></div><div class="property"><label for="paint-side" data-i18n="面板涂色面"></label><select id="paint-side"><option value="front" data-i18n="前面"></option><option value="back" data-i18n="背面"></option></select></div>';
const renderSettingsFields = document.createElement('div');
renderSettingsFields.innerHTML = '<h2 data-i18n="视图与光照"></h2><div class="property"><label for="background-color" data-i18n="背景颜色"></label><input id="background-color" type="color"></div><div class="property"><label for="orthographic-view" data-i18n="正交镜头"></label><input id="orthographic-view" type="checkbox"></div><div class="property"><label for="light-azimuth" data-i18n="光照方位角"></label><input id="light-azimuth" type="range" min="-180" max="180" step="1"><output id="light-azimuth-value"></output></div><div class="property"><label for="light-elevation" data-i18n="光照高度角"></label><input id="light-elevation" type="range" min="5" max="90" step="1"><output id="light-elevation-value"></output></div><div class="property"><label for="light-intensity" data-i18n="光照强度"></label><input id="light-intensity" type="range" min="0" max="8" step="0.1"><output id="light-intensity-value"></output></div><div class="property"><label for="shadow-strength" data-i18n="阴影强度"></label><input id="shadow-strength" type="range" min="0" max="1" step="0.05"><output id="shadow-strength-value"></output></div><div class="property"><label for="light-softness" data-i18n="光照柔和度"></label><input id="light-softness" type="range" min="0" max="8" step="0.25"><output id="light-softness-value"></output></div>';
const cameraLightSettings = document.createElement('div');
const cameraLightToggle = document.createElement('div'); cameraLightToggle.className = 'property';
const cameraLightToggleLabel = document.createElement('label'); cameraLightToggleLabel.htmlFor = 'camera-light-enabled'; cameraLightToggleLabel.dataset.i18n = '\u955c\u5934\u8f85\u52a9\u706f'; setText(cameraLightToggleLabel, '\u955c\u5934\u8f85\u52a9\u706f');
const cameraLightEnabledInput = document.createElement('input'); cameraLightEnabledInput.id = 'camera-light-enabled'; cameraLightEnabledInput.type = 'checkbox';
cameraLightToggle.append(cameraLightToggleLabel, cameraLightEnabledInput);
const cameraLightIntensityRow = document.createElement('div'); cameraLightIntensityRow.className = 'property';
const cameraLightIntensityLabel = document.createElement('label'); cameraLightIntensityLabel.htmlFor = 'camera-light-intensity'; cameraLightIntensityLabel.dataset.i18n = '\u955c\u5934\u8f85\u52a9\u706f\u5f3a\u5ea6'; setText(cameraLightIntensityLabel, '\u955c\u5934\u8f85\u52a9\u706f\u5f3a\u5ea6');
const cameraLightIntensityInput = document.createElement('input'); cameraLightIntensityInput.id = 'camera-light-intensity'; cameraLightIntensityInput.type = 'range'; cameraLightIntensityInput.min = '0'; cameraLightIntensityInput.max = '8'; cameraLightIntensityInput.step = '.1';
const cameraLightIntensityOutput = document.createElement('output'); cameraLightIntensityOutput.id = 'camera-light-intensity-value';
cameraLightIntensityRow.append(cameraLightIntensityLabel, cameraLightIntensityInput, cameraLightIntensityOutput);
cameraLightSettings.append(cameraLightToggle, cameraLightIntensityRow); renderSettingsFields.prepend(cameraLightSettings);
gridFields.append(renderSettingsFields);
$('#grid-btn').before(gridFields);
applyTranslations(gridFields);
$('#grid-color').value = settings.gridColor;
$('#grid-opacity').value = settings.gridOpacity;
$('#grid-style').value = settings.gridStyle;
$('#node-color').value = settings.nodeColor;
$('#node-size').value = settings.nodeSize;
$('#node-opacity').value = settings.nodeOpacity;
$('#beam-lengths-visible').checked = settings.beamLengthsVisible;
$('#background-color').value = settings.backgroundColor;
$('#orthographic-view').checked = settings.orthographic;
$('#camera-light-enabled').checked = settings.cameraLightEnabled;
$('#camera-light-intensity').value = settings.cameraLightIntensity;
$('#light-azimuth').value = settings.lightAzimuth;
$('#light-elevation').value = settings.lightElevation;
$('#light-intensity').value = settings.lightIntensity;
$('#shadow-strength').value = settings.shadowStrength;
$('#light-softness').value = settings.lightSoftness;
grid.visible = gridPreferenceVisible;
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
  updateNodeVisualState(); refreshConnectionPorts(); scheduleSettings();
}
updateNodeAppearance();
for (const id of ['node-color', 'node-size', 'node-opacity']) $('#' + id).addEventListener('input', updateNodeAppearance);
function updateRenderSettings() {
  const style = normalizeSettings({ version: 1,
    backgroundColor: $('#background-color').value,
    lightAzimuth: Number($('#light-azimuth').value), lightElevation: Number($('#light-elevation').value),
    lightIntensity: Number($('#light-intensity').value), shadowStrength: Number($('#shadow-strength').value), lightSoftness: Number($('#light-softness').value),
    cameraLightEnabled: $('#camera-light-enabled').checked, cameraLightIntensity: Number($('#camera-light-intensity').value),
    orthographic: $('#orthographic-view').checked,
  });
  Object.assign(settings, { backgroundColor: style.backgroundColor, lightAzimuth: style.lightAzimuth, lightElevation: style.lightElevation, lightIntensity: style.lightIntensity, shadowStrength: style.shadowStrength, lightSoftness: style.lightSoftness, cameraLightEnabled: style.cameraLightEnabled, cameraLightIntensity: style.cameraLightIntensity, orthographic: style.orthographic });
  if (!referencePreview) scene.background.set(settings.backgroundColor);
  updateLighting(); setProjectionMode(settings.orthographic);
  $('#light-azimuth-value').textContent = style.lightAzimuth.toFixed(0) + '°';
  $('#light-elevation-value').textContent = style.lightElevation.toFixed(0) + '°';
  $('#light-intensity-value').textContent = style.lightIntensity.toFixed(1);
  $('#shadow-strength-value').textContent = style.shadowStrength.toFixed(2);
  $('#light-softness-value').textContent = style.lightSoftness.toFixed(2);
  $('#camera-light-intensity-value').textContent = style.cameraLightIntensity.toFixed(1);
  scheduleSettings();
}
for (const id of ['background-color', 'light-azimuth', 'light-elevation', 'light-intensity', 'shadow-strength', 'light-softness', 'camera-light-enabled', 'camera-light-intensity']) $('#' + id).addEventListener('input', updateRenderSettings);
$('#orthographic-view').addEventListener('change', updateRenderSettings);
updateRenderSettings();
function updateBeamLengthVisibility() {
  settings.beamLengthsVisible = normalizeSettings({ version: 1, beamLengthsVisible: $('#beam-lengths-visible').checked }).beamLengthsVisible;
  beamLengthLabels.setVisible(!referencePreview && settings.beamLengthsVisible);
  scheduleSettings();
}
$('#beam-lengths-visible').addEventListener('change', updateBeamLengthVisibility);
function paintColorValue(value = $('#paint-color-hex').value) {
  return typeof value === 'string' && /^#[\da-f]{6}$/i.test(value) ? value.toLowerCase() : null;
}
function updatePaintPreview() {
  const color = paintColorValue();
  const preview = $('#paint-color-preview');
  preview.textContent = color || '—';
  preview.style.backgroundColor = color || 'transparent';
}
function setPaintColor(value) {
  const color = paintColorValue(value);
  if (!color) return false;
  $('#paint-color').value = color;
  $('#paint-color-hex').value = color;
  $('#paint-toolbar-color').value = color;
  $('#paint-toolbar-hex').value = color;
  updatePaintPreview();
  return true;
}
function renderPaintQuickColors() {
  const host = $('#paint-quick-colors'); host.replaceChildren();
  for (const color of settings.paintQuickColors) {
    const item = document.createElement('span'); item.className = 'quick-color-item';
    const button = document.createElement('button'); button.type = 'button'; button.className = 'quick-color';
    button.textContent = color; button.style.backgroundColor = color;
    button.setAttribute('aria-label', `${t('颜色（Hex RGB）')} ${color}`); button.title = color;
    button.onclick = () => setPaintColor(color);
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'quick-color-remove'; remove.textContent = '×';
    remove.setAttribute('aria-label', `${t('删除快捷颜色')} ${color}`); remove.title = `${t('删除快捷颜色')} ${color}`;
    remove.onclick = () => { settings.paintQuickColors = settings.paintQuickColors.filter(value => value !== color); renderPaintQuickColors(); scheduleSettings(); };
    item.append(button, remove); host.append(item);
  }
}
function updateConnectionToolbar() {
  const kind = $('#connection-kind').value;
  for (const button of connectionToolbar.querySelectorAll('[data-kind]')) button.classList.toggle('active', button.dataset.kind === kind);
  refreshConnectionPorts();
}
$('#paint-color').addEventListener('input', event => setPaintColor(event.target.value));
$('#paint-toolbar-color').addEventListener('input', event => setPaintColor(event.target.value));
$('#paint-color-hex').addEventListener('change', event => setPaintColor(event.target.value));
$('#paint-toolbar-hex').addEventListener('change', event => setPaintColor(event.target.value));
$('#save-paint-quick-color').onclick = () => {
  const color = paintColorValue();
  if (!color) return;
  settings.paintQuickColors = [...new Set([...settings.paintQuickColors, color])].slice(-12);
  renderPaintQuickColors(); scheduleSettings();
};
$('#connection-kind').addEventListener('change', updateConnectionToolbar);
renderPaintQuickColors(); updateConnectionToolbar();
updatePaintPreview();
function updateGridButton() {
  setText($('#grid-btn'), gridPreferenceVisible ? '隐藏网格' : '显示网格');
  $('#grid-btn').setAttribute('aria-pressed', String(gridPreferenceVisible));
}
updateGridButton();
$('#grid-btn').onclick = () => { gridPreferenceVisible = !gridPreferenceVisible; grid.visible = !referencePreview && gridPreferenceVisible && topologyHelpersVisible; updateGridButton(); scheduleSettings(); };
const nodesButton = document.createElement('button'); nodesButton.id = 'nodes-btn'; setText(nodesButton, showNodes ? '隐藏节点' : '显示节点'); nodesButton.setAttribute('aria-pressed', String(showNodes));
nodesButton.dataset.i18nTitle = '仅切换逻辑节点辅助标记，不隐藏梁、不改变工程';
$('.view-controls').append(nodesButton);
nodesButton.onclick = () => {
  showNodes = !showNodes;
  if (!showNodes) { clearNodeSelection(); plateEdgeIds = []; }
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
const vehicleSize = vehicleSizeElement();
if (vehicleSize) {
  vehicleSize.dataset.i18nTitle = '载具总尺寸按组件和结构节点的包围范围计算；1 格 = 8 cm';
  applyTranslations(vehicleSize);
}
$('#component-search').oninput = () => { renderCatalog(); scheduleSettings(); };
$('#category-filter').onchange = () => { renderCatalog(); scheduleSettings(); };
$('#show-building-furniture').onchange = () => { settings.showBuildingFurniture = $('#show-building-furniture').checked; renderCategories(); renderCatalog(); scheduleSettings(); };
$('#undo-btn').onclick = undo; $('#redo-btn').onclick = redo;
$('#new-btn').onclick = () => { if (!busy && (!objects.length || confirm(t('清空当前工程？此操作可以撤销。')))) transact(async () => { await restore([], { nodes: [], edges: [], plates: [], links: [] }); commit(); }); };

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
    await restore(document.objects, document.topology || { nodes: [], edges: [], plates: [], links: [] }); commit(); fit(); status('工程已加载');
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
  nativeModel = null; nativeExportButton.disabled = true; nativeImportButton.disabled = true; nativeReferencePreviewButton.disabled = true; nativeVehicleSelect.disabled = true; nativeVehicleSelect.replaceChildren();
  try {
    const pair = readNativePair(files);
    const [dataText, metaText] = await Promise.all([pair.data.file.text(), pair.meta.file.text()]);
    const data = JSON.parse(dataText); const meta = JSON.parse(metaText);
    nativeModel = parseNativePair(data, meta);
    nativeModel.extras.native.fileBaseName = pair.data.baseName;
    const roundTrip = verifyNativePairRoundTrip(data, meta);
    if (roundTrip.data.length || roundTrip.meta.length) throw new Error('原生配套文件的无编辑 round-trip 校验失败');
    const nativeModelStats = nativeStats(nativeModel);
    $('#native-summary').dataset.domainStats = JSON.stringify(nativeModelStats);
    nativeExportButton.disabled = false;
    nativeImportButton.disabled = false;
    nativeReferencePreviewButton.disabled = false;
    const vehicles = data.vehicles?.vehicles;
    if (!Array.isArray(vehicles)) throw new Error('没有 vehicles.vehicles 数组');
    const summaries = vehicles.map(v => ({ id: v.id, nodes: v.nodes?.length || 0, edges: v.edges?.length || 0, plates: v.plates?.length || 0, grids: v.grids?.length || 0, components: (v.grids || []).reduce((n, g) => n + (g.components?.length || 0), 0) }));
    const primary = summaries.reduce((best, summary) => summary.components > best.components ? summary : best, summaries[0]);
    nativeVehicleSelect.append(new Option(t('导入载具 {id} 及其关联子载具（默认主载具）', { id: primary.id }), String(primary.id)));
    for (const summary of summaries) if (summary.id !== primary.id) nativeVehicleSelect.append(new Option(t('导入载具 {id} 及其关联子载具', { id: summary.id }), String(summary.id)));
    nativeVehicleSelect.append(new Option(t('导入全部 {count} 个载具', { count: summaries.length }), 'all'));
    nativeVehicleSelect.disabled = false;
    setText($('#native-summary'), '已配对 {dataName} / {metaName}。{vehicles}。确认后才导入当前场景。', () => ({ dataName: pair.data.file.name, metaName: pair.meta.file.name, vehicles: summaries.map(summary => t('载具 {id}：{nodes} 节点 / {edges} 梁 / {plates} 面板 / {grids} 网格 / {components} 组件', summary)).join(getLocale() === 'zh' ? '；' : '; ') }));
  } catch (error) { setText($('#native-summary'), '无法导入原生文件：{error}', () => ({ error: t(error instanceof Error ? error.message : String(error)) })); }
};

nativeImportButton.onclick = () => {
  status('正在导入配套原生载具');
  if (!nativeModel || busy) { status(!nativeModel ? '原生模型尚未加载' : '当前操作仍在进行'); return; }
  transact(async () => {
    const vehicleIds = nativeVehicleSelect.value === 'all' ? null : [nativeVehicleSelect.value];
    const document = validateDocument(toEditorDocument(nativeModel, { vehicleIds }), catalog.index);
    await restore(document.objects, document.topology || toEditorTopology(nativeModel, { vehicleIds }));
    commit(); setReferencePreview(true);
    status('已将配套 .data / .meta 的组件、节点、梁和面板导入当前场景；连接仍保留在领域模型中');
  });
};

nativeExportButton.onclick = () => {
  if (!nativeModel) return;
  try {
    const pair = toNativePair(nativeModel);
    const baseName = nativeModel.extras.native.fileBaseName || 'anymaker-native';
    download(JSON.stringify(pair.data, null, 2), `${baseName}.data`, 'application/json');
    download(JSON.stringify(pair.meta, null, 2), `${baseName}.meta`, 'application/json');
    status('已导出原始 .data / .meta 配套文件；当前编辑器修改尚未完整回写，不能作为游戏兼容存档');
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
    if (beamDraft || plateEdgeIds.length || selectedTopologyNode) status('已取消当前拓扑操作');
    cancelTopologyDraft(); select(null); setTool('select');
    return;
  }
  if (e.target instanceof HTMLElement && e.target.matches('button,summary,[role="separator"]')) return;
  if (e.target !== document.body && e.target !== viewport && e.target !== renderer.domElement) return;
  if (busy) return;
  const key = e.key.toLowerCase();
  if (e.ctrlKey || e.metaKey) { if (key === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); } else if (key === 'y') { e.preventDefault(); redo(); } return; }
  if (key === 'a' && !e.altKey && !e.repeat) { e.preventDefault(); toggleBeamAxisSnap(); return; }
  const binding = tools.find(t => t[2].toLowerCase() === key);
  if (binding) setTool(binding[0]);
  if (key === 'delete' || key === 'backspace') {
    e.preventDefault();
    if (selectedTopologyNode) deleteTopology('node', selectedTopologyNode);
    else transact(async () => { await remove(selected); });
  }
  if (key === 'enter' && ['plate', 'glass'].includes(tool)) { e.preventDefault(); finishPlate(tool); }
  if (key === 'f') fit();
});
function updateCameraProjection() {
  const width = Math.max(1, viewport.clientWidth); const height = Math.max(1, viewport.clientHeight);
  if (camera.isOrthographicCamera) {
    const distance = Math.max(.5, camera.position.distanceTo(controls.target));
    const span = Math.max(.2, distance * .65);
    camera.left = -span * width / height; camera.right = span * width / height; camera.top = span; camera.bottom = -span;
  } else camera.aspect = width / height;
  camera.updateProjectionMatrix();
}
function setProjectionMode(orthographic) {
  const next = orthographic ? orthographicCamera : perspectiveCamera;
  if (camera === next) return;
  next.position.copy(camera.position); next.quaternion.copy(camera.quaternion); next.up.copy(camera.up);
  camera = next;
  attachCameraLight(camera);
  controls.object = camera;
  transform.camera = camera;
  updateCameraProjection(); controls.update();
  scheduleSettings();
}
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
    gridColor: $('#grid-color').value, gridOpacity: Number($('#grid-opacity').value), gridStyle: $('#grid-style').value, gridVisible: gridPreferenceVisible,
    nodesVisible: showNodes, nodeColor: $('#node-color').value, nodeSize: Number($('#node-size').value), nodeOpacity: Number($('#node-opacity').value), beamAxisSnap, beamLengthsVisible: settings.beamLengthsVisible, tool, selectedType,
    backgroundColor: settings.backgroundColor, lightAzimuth: settings.lightAzimuth, lightElevation: settings.lightElevation, lightIntensity: settings.lightIntensity, shadowStrength: settings.shadowStrength, lightSoftness: settings.lightSoftness, cameraLightEnabled: settings.cameraLightEnabled, cameraLightIntensity: settings.cameraLightIntensity, paintQuickColors: settings.paintQuickColors, orthographic: settings.orthographic,
    showBuildingFurniture: $('#show-building-furniture').checked, query: $('#component-search').value, category: $('#category-filter').value,
    drawers: { catalog: $('#catalog-drawer').open, inspector: $('.inspector-drawer').open, resources: $('#resource-drawer').open, history: historyDrawer.open },
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
for (const drawer of [$('#catalog-drawer'), $('.inspector-drawer'), $('#resource-drawer'), historyDrawer]) drawer.addEventListener('toggle', scheduleSettings);
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

const resize = () => { updateCameraProjection(); renderer.setSize(viewport.clientWidth, viewport.clientHeight, false); if (!busy && pointerInCanvas) refreshBeamPreview(); };
new ResizeObserver(resize).observe(viewport);
setLeftSidebarCollapsed(settings.leftCollapsed);
setRightSidebarOpen(settings.rightOpen);
$('#catalog-drawer').open = settings.drawers.catalog;
$('.inspector-drawer').open = settings.drawers.inspector;
$('#resource-drawer').open = settings.drawers.resources;
historyDrawer.open = settings.drawers.history;
changeLanguage(getLocale());
setGridConstraints(); refresh(); resize();
async function initialize() {
  await loadCatalog();
  $('#component-search').value = settings.query;
  $('#show-building-furniture').checked = settings.showBuildingFurniture;
  renderCategories();
  $('#category-filter').value = [...$('#category-filter').options].some(option => option.value === settings.category) ? settings.category : '';
  if (catalog.has(settings.selectedType)) selectedType = settings.selectedType;
  renderCatalog();
  localSession = await startLocalSession({
    store: localStore,
    validate: value => migrateDocument(value, catalog.index),
    restore: async value => { await restore(value.objects, value.topology || { nodes: [], edges: [], plates: [], links: [] }); commit(); },
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
renderer.setAnimationLoop(() => { controls.update(); updateTopologyHelperVisibility(); orientation.update(); beamRuler.update(); beamLengthLabels.update(); renderer.render(scene, camera); });
