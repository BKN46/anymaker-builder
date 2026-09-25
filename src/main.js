import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { AssetLibrary, disposeObject } from './assets/library.js';
import { PublishedAssetLibrary } from './assets/published-library.js';
import { reflectObject } from './assets/geometry-ops.js';
import { History, LIMIT, project, validateDocument, migrateDocument, toIntermediateXml } from './editor/document.js';
import { copyObjects, moveObjects, removeObjects, splitGrid, mergeGrids, gridIds } from './editor/operations.js';
import { createNode, moveNodeAndMerge, mergeNodes, removeNode, removeEdge, removePlate, createEdgeFromPoints, edgeSplitPoints, splitEdge, createPlate, createPlateFromEdges, createGlassPlateFromEdges } from './editor/topology.js';
import { LINK_COLORS, createLink, moveLinkPoint, removeLink } from './editor/connections.js';
import { CELL_SIZE_WORLD, assertGridVector, cellToWorld, quantizeWorldVector, worldToCell } from './editor/grid.js';
import { GRID_SIZE, GRID_DIVISIONS, STRUCTURE_COLOR, cameraBuildFrame, projectBuildPoint, resolveEdgePoint, resolvePlacementPoint, createEdgeMesh, createEdgeJointMesh, createConnectionRoute, updateEdgeMesh, setEdgeOutline, plateSurfaceBoundary, plateSurfaceVertices, cameraFacingPlateOffset, cameraFacingPlateDirection, rayFacingPlateSide } from './editor/construction-view.js';
import { createEdgeRuler, createEdgeLengthLabels } from './editor/edge-ruler.js';
import { parseNativePair, nativeStats, toNativePairFromEditor, verifyNativePairRoundTrip } from './native/anymaker-data.js';
import { toEditorDocument, toEditorTopology } from './editor/model.js';
import { componentPropertyDescriptors, updateNativeProperty } from './editor/component-properties.js';
import { ComponentCatalog } from './catalog/component-catalog.js';
import { categoryInfo, createCategoryIcon } from './catalog/category-icons.js';
import { getLocale, setLocale, t, applyTranslations, setText, addMessages } from './i18n.js';
import { createLocalStore, normalizeSettings } from './editor/local-storage.js';
import { startLocalSession } from './editor/local-session.js';
import { createOrientationIndicator, orientCamera, applyGridStyle } from './editor/view-settings.js';
import { RENDER_DEPTH_LAYERS, assignOpaqueDepthOrder, configureOpaqueDepth, configureOpaqueDepthLayer } from './editor/render-depth.js';
import { nativePaintColor, nearestNativePaintIndex, isGlassPlate } from './editor/native-paint.js';
import { accessoryOptionsForComponent, createNativeAccessoryItem, nativeAccessoryDefinition } from './editor/native-accessories.js';
import { extensionAxes, extensionAxisIndex, extensionHandlePosition, extensionVector, updateExtension } from './editor/component-extension.js';
import { editorMessages } from './editor/ui-messages.js';
import { connectionNetworkLabel, connectionPortRoleLabel } from './editor/connection-port-labels.js';
import { logicNodePort, logicNodePortsForNetwork, logicNodeCellPosition } from './editor/connection-ports.js';
import { mirrorPoint, mirrorSurfaceDirection, sameGridPoint } from './editor/mirror-mode.js';
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
let importedNativeRootVehicleIds = [];
let topology = { nodes: [], edges: [], plates: [], links: [] };
// A history entry is a complete editor document. Never coordinate independent
// object/topology cursors: a user action must undo and redo atomically.
const history = new History({ objects: [], topology }, '初始状态');
let edgeDraft = null;
let showNodes = settings.nodesVisible;
let topologyHelpersVisible = true;
const TOPOLOGY_HELPER_DISTANCE = 12;
let gridPreferenceVisible = settings.gridVisible;
let plateEdgeIds = [];
let connectionDraft = null;
let selectedTopologyNode = null;
let selectedLinkPoint = null;
let selectedTopologyIds = new Set();
const selectableKinds = { component: true, node: true, edge: true, plate: true, link: true };
const connectionVisibility = { ...settings.connectionVisibility };
let transparencyGroups = [];
let nodeMoveFrame = null;
let topologyTransform = null;
let cursorPoint = null;
let placementPreview = null;
let placementPreviewType = '';
let placementPreviewLoadingType = '';
let placementPreviewRequest = 0;
let referencePreview = false;
let hoveredObject = null;
let paintColorPicking = false;
let thumbnailObserver = null;
let thumbnailScene = null;
let thumbnailCamera = null;
let thumbnailTarget = null;
let thumbnailLargeTarget = null;
const thumbnailCache = new Map();
const thumbnailRequests = new Map();
const thumbnailLargeCache = new Map();
const thumbnailLargeRequests = new Map();
let modelPreviewCard = null;
let modelPreviewRequestId = 0;
let hoveredConnectionPort = null;
let mirrorMode = { active: false, axis: 'x', offset: 0 };
let mirrorGuideDrag = false;
let subgridToolbarOpen = false;
let latestPagesBuildTime = null;
let pagesBuildTimeUnavailable = false;
// Pages is deployed by GitHub's generated `pages-build-deployment` workflow,
// not this repository's old `.github/workflows/pages.yml`. Fetch completed
// repository runs and choose the latest successful generated Pages deployment.
const GITHUB_PAGES_WORKFLOW_RUNS = 'https://api.github.com/repos/BKN46/anymaker-builder/actions/runs?status=completed&per_page=100';
const isGitHubPagesDeployment = run => run?.path === 'dynamic/pages/pages-build-deployment';

$('#app').innerHTML = '<header class="topbar"><div class="brand" aria-label="ANYMAKER builder by BKN"><strong>ANYMAKER</strong><small>builder by BKN</small></div><a id="github-link" class="github-link" href="https://github.com/BKN46/anymaker-builder" target="_blank" rel="noopener noreferrer" data-i18n-aria-label="GitHub 仓库" data-i18n-title="GitHub 仓库"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .7a11.3 11.3 0 0 0-3.57 22c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.75 2.02 2.92 1.41.1-.73.39-1.22.71-1.5-2.51-.29-5.15-1.25-5.15-5.58 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.44.11-2.99 0 0 .95-.3 3.11 1.16a10.8 10.8 0 0 1 5.66 0c2.16-1.46 3.1-1.16 3.1-1.16.62 1.55.23 2.7.12 2.99.72.79 1.16 1.8 1.16 3.03 0 4.34-2.65 5.29-5.17 5.57.4.35.76 1.04.76 2.1v3.11c0 .3.2.65.78.54A11.3 11.3 0 0 0 12 .7Z"></path></svg></a><span id="github-build-time" class="github-build-time" hidden aria-live="polite"></span><select id="language-select" data-i18n-aria-label="界面语言"><option value="en">English</option><option value="zh">中文</option></select><span class="status" id="save-status" role="status" data-i18n="正在加载定义…"></span><section class="section top-tool-section"><h2 data-i18n="编辑工具"></h2><div class="tool-grid" id="tools"></div></section><nav class="top-actions"><button id="library-btn" data-i18n="导入本地载具"></button><button id="new-btn" data-i18n="新建"></button><button id="undo-btn" data-i18n="撤销"></button><button id="redo-btn" data-i18n="重做"></button><button id="save-btn" data-i18n="保存载具"></button><button id="export-btn" class="primary" data-i18n="中间格式 XML"></button></nav></header>' +
  '<main class="workspace" id="workspace"><button id="left-sidebar-toggle" class="sidebar-toggle left-toggle" aria-controls="left-sidebar" aria-expanded="true" aria-keyshortcuts="Tab" data-i18n-title="收起方块库（在视口按 Tab 也可切换）" data-i18n="收起方块库"></button><aside id="left-sidebar" class="sidebar left-sidebar" data-i18n-aria-label="方块库"><div class="sidebar-tabs" role="tablist" data-i18n-aria-label="方块库"><button id="left-tab-catalog" type="button" role="tab" aria-controls="catalog-panel" aria-selected="true" data-sidebar-tab="catalog" data-i18n="方块库"></button><button id="left-tab-subgrids" type="button" role="tab" aria-controls="subgrid-panel" aria-selected="false" tabindex="-1" data-sidebar-tab="subgrids" data-i18n="子网格"></button></div><section id="catalog-panel" class="sidebar-tab-panel catalog-panel" role="tabpanel" aria-labelledby="left-tab-catalog"><section class="section"><h2><span data-i18n="组件定义"></span> <span id="catalog-count"></span></h2><input class="search" id="component-search" data-i18n-aria-label="搜索组件" data-i18n-placeholder="搜索中文、原始 ID、类别…"><select id="category-filter" data-i18n-aria-label="组件分类"><option value="" data-i18n="全部分类"></option></select><div class="catalog-visibility-options"><label class="catalog-visibility"><input id="show-building-furniture" type="checkbox"><span data-i18n="显示建材与家具"></span></label><label class="catalog-visibility"><input id="use-model-thumbnails" type="checkbox"><span data-i18n="使用模型缩略图"></span></label><input id="catalog-card-size" class="catalog-card-size" type="range" min="64" max="156" step="4" data-i18n-aria-label="组件卡片大小" data-i18n-title="组件卡片大小"></div><div id="component-list"></div></section></section><section id="subgrid-panel" class="sidebar-tab-panel" role="tabpanel" aria-labelledby="left-tab-subgrids" hidden><section class="section"><h2 data-i18n="当前载具子网格"></h2><p id="subgrid-summary" class="status"></p><div id="subgrid-list" class="subgrid-list"></div></section></section></aside><div id="left-sidebar-resizer" role="separator" aria-orientation="vertical" aria-controls="left-sidebar" data-i18n-aria-label="调整方块库宽度" aria-valuemin="240" aria-valuemax="720" tabindex="0"></div>' +
  '<section id="viewport" tabindex="0" data-i18n-aria-label="三维建造视口"><button id="right-sidebar-toggle" class="sidebar-toggle right-toggle" aria-controls="right-sidebar" aria-expanded="false" data-i18n="打开右侧面板"></button><div class="view-controls"><button data-view="iso" data-i18n="正交"></button><button data-view="top" data-i18n="顶视"></button><button data-view="front" data-i18n="前视"></button><button id="fit-btn" data-i18n="回到中心"></button></div><div class="hud"><span class="badge" id="object-count"></span><span class="badge" id="vehicle-size"></span><span id="topology-count" hidden></span><span class="badge" id="cursor-pos" data-i18n="工作平面 Y = 0"></span></div></section><div id="right-sidebar-resizer" role="separator" aria-orientation="vertical" aria-controls="right-sidebar" data-i18n-aria-label="调整右侧面板宽度" aria-valuemin="240" aria-valuemax="720" aria-valuenow="304" tabindex="0" hidden></div>' +
  '<aside id="right-sidebar" class="sidebar right-sidebar" data-i18n-aria-label="编辑器面板" hidden><div class="sidebar-tabs" role="tablist" data-i18n-aria-label="编辑器面板"><button id="right-tab-editor" type="button" role="tab" aria-controls="editor-tab-panel" aria-selected="true" data-sidebar-tab="editor" data-i18n="编辑器参数"></button><button id="right-tab-inspector" type="button" role="tab" aria-controls="inspector-tab-panel" aria-selected="false" tabindex="-1" data-sidebar-tab="inspector" data-i18n="选中方块属性"></button><button id="right-tab-resources" type="button" role="tab" aria-controls="resources-tab-panel" aria-selected="false" tabindex="-1" data-sidebar-tab="resources" data-i18n="资源与校验"></button><button id="right-tab-history" type="button" role="tab" aria-controls="history-tab-panel" aria-selected="false" tabindex="-1" data-sidebar-tab="history" data-i18n="历史记录"></button></div><section id="editor-tab-panel" class="sidebar-tab-panel" role="tabpanel" aria-labelledby="right-tab-editor"><section id="grid-settings" class="section"><h2 data-i18n="工作网格 · 编辑器参数"></h2><p class="status" data-i18n="固定单位网格：1 格 = 8 cm；手动编辑位置为整数格，原生子网格投影可保留小数。"></p><button id="grid-btn" aria-pressed="true" data-i18n="隐藏网格"></button><p class="status"><span data-i18n="左键：当前工具 · 右键拖动：旋转视角"></span><br><span data-i18n="中键：平移 · 滚轮：缩放 · F：聚焦"></span><br><span data-i18n="Shift + 点击连续放置 · Ctrl / ⌘ + Z：撤销"></span></p></section></section><section id="inspector-tab-panel" class="sidebar-tab-panel" role="tabpanel" aria-labelledby="right-tab-inspector" hidden><section class="section"><div id="inspector-content" class="empty"></div></section></section><section id="resources-tab-panel" class="sidebar-tab-panel" role="tabpanel" aria-labelledby="right-tab-resources" hidden><section class="section"><h2 data-i18n="资源状态"></h2><p class="status" id="asset-status" data-i18n="尚未导入 Mesh。橙色线框仅是缺失资源标记，不代表游戏尺寸。"></p><button id="mesh-files-btn" class="full" data-i18n="选择 .mesh 文件"></button><p class="status" data-i18n="推荐选择游戏的 rom/meshes 文件夹。只在浏览器读取，不上传、不执行 EXE。仅渲染静态 Mesh，动态部件数量会单独提示。"></p></section><section class="section"><h2 data-i18n="本地原生载具"></h2><button id="native-btn" class="full" data-i18n="选择配套 .data / .meta"></button><p class="status" id="native-summary" data-i18n="选择同名的 .data 与 .meta JSON 文件。浏览器只读取，不上传；校验后立即替换当前场景。"></p></section><section class="section"><h2 data-i18n="校验"></h2><div id="validation" class="status"></div></section></section><section id="history-tab-panel" class="sidebar-tab-panel" role="tabpanel" aria-labelledby="right-tab-history" hidden><section class="section"><p class="status" data-i18n="最近 50 次已提交操作。选择任一项即可恢复到该状态。"></p><div id="history-list" class="history-list"></div></section></section></aside></main>' +
  '<input id="mesh-input" type="file" accept=".mesh" multiple hidden><input id="file-input" type="file" accept=".json" hidden><input id="native-input" type="file" accept=".data,.meta" multiple hidden><button id="project-save-btn" type="button" hidden></button>';
applyTranslations(document);
$('#catalog-card-size').value = String(settings.catalogCardSize);
$('#left-sidebar-resizer').setAttribute('aria-valuenow', String(settings.leftWidth));
const componentIdTooltip = document.createElement('span'); componentIdTooltip.id = 'component-id-tooltip'; componentIdTooltip.hidden = true; document.body.append(componentIdTooltip);
const connectionPortTooltip = document.createElement('span'); connectionPortTooltip.id = 'connection-port-tooltip'; connectionPortTooltip.hidden = true; document.body.append(connectionPortTooltip);
const componentModelPreview = document.createElement('span'); componentModelPreview.id = 'component-model-preview'; componentModelPreview.hidden = true; componentModelPreview.setAttribute('aria-hidden', 'true');
const componentModelPreviewImage = document.createElement('img'); componentModelPreviewImage.alt = ''; componentModelPreview.append(componentModelPreviewImage); document.body.append(componentModelPreview);

const nativeExportButton = document.createElement('button');
nativeExportButton.id = 'native-export-btn';
nativeExportButton.className = 'full';
setText(nativeExportButton, '保存载具 (.data / .meta)');
nativeExportButton.disabled = false;
const nativeReferencePreviewButton = document.createElement('button');
nativeReferencePreviewButton.id = 'native-reference-preview-btn';
nativeReferencePreviewButton.className = 'full';
nativeReferencePreviewButton.disabled = true;
nativeReferencePreviewButton.setAttribute('aria-pressed', 'false');
setText(nativeReferencePreviewButton, '参考预览');
nativeReferencePreviewButton.dataset.i18nTitle = '隐藏编辑辅助并使用黑色背景；仅用于与参考截图进行人工对照，不代表游戏渲染已经匹配';
document.querySelector('#native-btn').parentElement.append(nativeReferencePreviewButton, nativeExportButton);

const connectionSettings = document.createElement('section');
connectionSettings.id = 'connection-settings'; connectionSettings.className = 'section';
connectionSettings.innerHTML = '<h2 data-i18n="连接工具"></h2><label for="connection-kind" data-i18n="连接类型"></label><select id="connection-kind" class="full"><option value="electric" data-i18n="电线"></option><option value="mechanical" data-i18n="机械连接"></option><option value="liquid" data-i18n="液体管线"></option><option value="gas" data-i18n="气体管线"></option><option value="belt" data-i18n="皮带"></option><option value="data" data-i18n="数据线"></option></select><div class="transform-grid connection-ports"><label><span data-i18n="起点端口"></span><input id="connection-from-port" type="number" min="0" max="255" step="1" value="0"></label><label><span data-i18n="终点端口"></span><input id="connection-to-port" type="number" min="0" max="255" step="1" value="0"></label></div><p class="status" data-i18n="连接工具说明"></p>';
$('#resources-tab-panel').prepend(connectionSettings);
applyTranslations(connectionSettings);

const paintToolbar = document.createElement('section');
paintToolbar.id = 'paint-toolbar'; paintToolbar.className = 'context-toolbar'; paintToolbar.hidden = true;
paintToolbar.innerHTML = '<strong data-i18n="涂色色板"></strong><div id="paint-quick-colors" class="quick-colors"></div><label><input id="paint-toolbar-color" type="color" value="#dddddd" aria-label="Hex RGB color"><input id="paint-toolbar-hex" type="text" value="#dddddd" maxlength="7" spellcheck="false" aria-label="Hex RGB color"></label><button id="pick-paint-color" type="button" aria-pressed="false" data-i18n="取色" data-i18n-aria-label="取色"></button><button id="save-paint-quick-color" type="button" data-i18n="保存快捷颜色"></button>';
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

const transparencyToolbar = document.createElement('section');
transparencyToolbar.id = 'transparency-toolbar'; transparencyToolbar.className = 'context-toolbar'; transparencyToolbar.hidden = true;
transparencyToolbar.innerHTML = '<strong data-i18n="隐藏组"></strong><label class="transparency-group-save"><input id="transparency-group-name" type="text" maxlength="80" data-i18n-placeholder="组名称" placeholder="Group name"><button id="save-transparency-group" type="button" data-i18n="保存当前隐藏为组"></button></label><div id="transparency-groups" class="transparency-groups"></div>';
applyTranslations(transparencyToolbar);

const mirrorToolbar = document.createElement('section');
mirrorToolbar.id = 'mirror-toolbar'; mirrorToolbar.className = 'context-toolbar mirror-toolbar'; mirrorToolbar.hidden = true;
mirrorToolbar.innerHTML = '<strong data-i18n="镜像模式"></strong><div class="mirror-plane-buttons" role="group" data-i18n-aria-label="镜像平面"><button type="button" data-mirror-axis="x">YZ · X</button><button type="button" data-mirror-axis="y">XZ · Y</button><button type="button" data-mirror-axis="z">XY · Z</button></div><label class="mirror-offset"><span data-i18n="平面位置"></span><input id="mirror-offset-range" type="range" min="-500" max="500" step="1" value="0" data-i18n-aria-label="镜像平面位置"><input id="mirror-offset-input" type="number" min="-125000" max="125000" step="1" value="0" data-i18n-aria-label="镜像平面位置"> <small data-i18n="格"></small></label><span class="context-help" data-i18n="拖动蓝色手柄或滑块，沿镜像平面法向移动。"></span>';
applyTranslations(mirrorToolbar);

const edgeToolbar = document.createElement('section');
edgeToolbar.id = 'edge-toolbar'; edgeToolbar.className = 'context-toolbar edge-toolbar'; edgeToolbar.hidden = true;
edgeToolbar.innerHTML = '<strong data-i18n="梁工具"></strong><div class="edge-size-buttons" role="group" data-i18n-aria-label="梁截面"><button type="button" data-edge-size="1">1×1</button><button type="button" data-edge-size="3">3×3</button></div><button id="edge-split-action" type="button" data-i18n="切分梁"></button><span class="context-help" data-i18n="梁截面尺寸与切分"></span>';
applyTranslations(edgeToolbar);

const subgridToolbar = document.createElement('section');
subgridToolbar.id = 'subgrid-toolbar'; subgridToolbar.className = 'context-toolbar subgrid-toolbar'; subgridToolbar.hidden = true;
subgridToolbar.innerHTML = '<strong data-i18n="子网格操作"></strong><button id="subgrid-split-action" type="button" data-i18n="拆分子网格"></button><button id="subgrid-merge-action" type="button" data-i18n="合并子网格"></button>';
applyTranslations(subgridToolbar);

const selectionFilterToolbar = document.createElement('section');
selectionFilterToolbar.id = 'selection-filter-toolbar'; selectionFilterToolbar.className = 'context-toolbar selection-filter-toolbar';
selectionFilterToolbar.innerHTML = '<button id="selection-filter-toggle" type="button" class="selection-filter-toggle" aria-expanded="false" aria-controls="selection-filter-options" data-i18n="可选择对象" data-i18n-title="展开可选择对象" data-i18n-aria-label="展开可选择对象"></button><div id="selection-filter-options" class="selection-filter-options" hidden><label><input type="checkbox" data-selectable-kind="component" checked><span data-i18n="组件"></span></label><label><input type="checkbox" data-selectable-kind="node" checked><span data-i18n="节点"></span></label><label><input type="checkbox" data-selectable-kind="edge" checked><span data-i18n="梁"></span></label><label><input type="checkbox" data-selectable-kind="plate" checked><span data-i18n="面板"></span></label><label><input type="checkbox" data-selectable-kind="link" checked><span data-i18n="连接"></span></label></div><button id="connection-visibility-toggle" type="button" class="selection-filter-toggle" aria-expanded="false" aria-controls="connection-visibility-options" data-i18n="显示连接" data-i18n-title="展开显示连接" data-i18n-aria-label="展开显示连接"></button><div id="connection-visibility-options" class="selection-filter-options" hidden><label><input type="checkbox" data-connection-kind="electric" checked><span data-i18n="电线"></span></label><label><input type="checkbox" data-connection-kind="mechanical" checked><span data-i18n="机械连接"></span></label><label><input type="checkbox" data-connection-kind="liquid" checked><span data-i18n="液体管线"></span></label><label><input type="checkbox" data-connection-kind="gas" checked><span data-i18n="气体管线"></span></label><label><input type="checkbox" data-connection-kind="belt" checked><span data-i18n="皮带"></span></label><label><input type="checkbox" data-connection-kind="data" checked><span data-i18n="数据线"></span></label></div>';
applyTranslations(selectionFilterToolbar);
const selectionFilterToggle = selectionFilterToolbar.querySelector('#selection-filter-toggle');
const selectionFilterOptions = selectionFilterToolbar.querySelector('#selection-filter-options');
const connectionVisibilityToggle = selectionFilterToolbar.querySelector('#connection-visibility-toggle');
const connectionVisibilityOptions = selectionFilterToolbar.querySelector('#connection-visibility-options');
function setSelectionFilterCollapsed(collapsed) {
  selectionFilterOptions.hidden = collapsed;
  selectionFilterToggle.setAttribute('aria-expanded', String(!collapsed));
  const label = collapsed ? '展开可选择对象' : '收起可选择对象';
  selectionFilterToggle.dataset.i18nTitle = label;
  selectionFilterToggle.dataset.i18nAriaLabel = label;
  applyTranslations(selectionFilterToggle);
}
selectionFilterToggle.addEventListener('click', () => setSelectionFilterCollapsed(!selectionFilterOptions.hidden));
function setConnectionVisibilityCollapsed(collapsed) {
  connectionVisibilityOptions.hidden = collapsed;
  connectionVisibilityToggle.setAttribute('aria-expanded', String(!collapsed));
  const label = collapsed ? '展开显示连接' : '收起显示连接';
  connectionVisibilityToggle.dataset.i18nTitle = label;
  connectionVisibilityToggle.dataset.i18nAriaLabel = label;
  applyTranslations(connectionVisibilityToggle);
}
connectionVisibilityToggle.addEventListener('click', () => setConnectionVisibilityCollapsed(!connectionVisibilityOptions.hidden));

const workspace = $('#workspace');
workspace.append(selectionFilterToolbar, paintToolbar, connectionToolbar, transparencyToolbar, edgeToolbar, subgridToolbar);
$('#tools').after(mirrorToolbar);
for (const input of selectionFilterToolbar.querySelectorAll('[data-selectable-kind]')) {
  input.addEventListener('change', () => {
    selectableKinds[input.dataset.selectableKind] = input.checked;
    if (!input.checked) {
      if (input.dataset.selectableKind === 'node') clearNodeSelection();
      if (input.dataset.selectableKind === 'link') clearLinkPointSelection();
    }
    hoveredObject = null;
    updateInteractionHighlights();
  });
}
for (const input of selectionFilterToolbar.querySelectorAll('[data-connection-kind]')) {
  const kind = input.dataset.connectionKind;
  input.checked = connectionVisibility[kind] !== false;
  input.addEventListener('change', () => {
    connectionVisibility[kind] = input.checked;
    updateConnectionVisibility();
    scheduleSettings();
  });
}
const leftSidebar = $('#left-sidebar');
const leftSidebarToggle = $('#left-sidebar-toggle');
const leftSidebarResizer = $('#left-sidebar-resizer');
const rightSidebar = $('#right-sidebar');
const rightSidebarToggle = $('#right-sidebar-toggle');
const rightSidebarResizer = $('#right-sidebar-resizer');
const sidebarTabPanels = {
  left: { catalog: '#catalog-panel', subgrids: '#subgrid-panel' },
  right: { editor: '#editor-tab-panel', inspector: '#inspector-tab-panel', resources: '#resources-tab-panel', history: '#history-tab-panel' },
};
function activateSidebarTab(side, tab, { focus = false } = {}) {
  const panels = sidebarTabPanels[side];
  if (!Object.hasOwn(panels, tab)) return;
  const sidebar = side === 'left' ? leftSidebar : rightSidebar;
  for (const [name, selector] of Object.entries(panels)) {
    const button = sidebar.querySelector(`[data-sidebar-tab="${name}"]`);
    const panel = sidebar.querySelector(selector);
    const active = name === tab;
    button.setAttribute('aria-selected', String(active));
    button.tabIndex = active ? 0 : -1;
    panel.hidden = !active;
    if (active && focus) button.focus({ preventScroll: true });
  }
  settings.sidebarTabs[side] = tab;
  scheduleSettings();
}
for (const side of Object.keys(sidebarTabPanels)) {
  const sidebar = side === 'left' ? leftSidebar : rightSidebar;
  const names = Object.keys(sidebarTabPanels[side]);
  for (const button of sidebar.querySelectorAll('[data-sidebar-tab]')) {
    button.addEventListener('click', () => activateSidebarTab(side, button.dataset.sidebarTab));
    button.addEventListener('keydown', event => {
      const index = names.indexOf(button.dataset.sidebarTab);
      const targetIndex = event.key === 'Home' ? 0 : event.key === 'End' ? names.length - 1
        : event.key === 'ArrowLeft' ? (index + names.length - 1) % names.length
          : event.key === 'ArrowRight' ? (index + 1) % names.length : null;
      if (targetIndex === null) return;
      event.preventDefault(); activateSidebarTab(side, names[targetIndex], { focus: true });
    });
  }
}
const sidebarLimits = { min: 240, max: 720, viewport: 360 };
let leftSidebarWidth = settings.leftWidth;
let rightSidebarWidth = settings.rightWidth;
let resizingSidebar = '';
workspace.prepend($('.top-tool-section'));
$('#export-btn').className = 'full';
$('#resources-tab-panel').append($('#export-btn'));
$('#save-btn').classList.add('primary');
for (const button of [leftSidebarToggle, rightSidebarToggle]) button.removeAttribute('data-i18n');

function maxLeftSidebarWidth() {
  const rightWidth = rightSidebar.hidden ? 0 : rightSidebarWidth + 8;
  return Math.max(sidebarLimits.min, Math.min(sidebarLimits.max, workspace.clientWidth - rightWidth - sidebarLimits.viewport - 8));
}
function maxRightSidebarWidth() {
  const leftWidth = leftSidebar.hidden ? 0 : leftSidebarWidth + 8;
  return Math.max(sidebarLimits.min, Math.min(sidebarLimits.max, workspace.clientWidth - leftWidth - sidebarLimits.viewport - 8));
}
function setLeftSidebarWidth(value) {
  leftSidebarWidth = Math.round(Math.min(maxLeftSidebarWidth(), Math.max(sidebarLimits.min, value)));
  workspace.style.setProperty('--left-sidebar-width', leftSidebar.hidden ? '0px' : leftSidebarWidth + 'px');
  leftSidebarResizer.setAttribute('aria-valuenow', String(leftSidebarWidth));
  leftSidebarResizer.setAttribute('aria-valuemax', String(maxLeftSidebarWidth()));
  scheduleSettings();
}
function setRightSidebarWidth(value) {
  rightSidebarWidth = Math.round(Math.min(maxRightSidebarWidth(), Math.max(sidebarLimits.min, value)));
  workspace.style.setProperty('--right-sidebar-width', rightSidebar.hidden ? '0px' : rightSidebarWidth + 'px');
  rightSidebarResizer.setAttribute('aria-valuenow', String(rightSidebarWidth));
  rightSidebarResizer.setAttribute('aria-valuemax', String(maxRightSidebarWidth()));
  setLeftSidebarWidth(leftSidebarWidth);
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
  requestAnimationFrame(() => { setRightSidebarWidth(rightSidebarWidth); resize(); });
}
function setRightSidebarOpen(open) {
  rightSidebar.hidden = !open;
  rightSidebarResizer.hidden = !open;
  workspace.classList.toggle('right-sidebar-open', open);
  workspace.style.setProperty('--right-sidebar-width', open ? rightSidebarWidth + 'px' : '0px');
  workspace.style.setProperty('--right-resizer-width', open ? '8px' : '0px');
  rightSidebarToggle.textContent = open ? '›' : '‹';
  rightSidebarToggle.dataset.i18nAriaLabel = open ? '收起右侧面板' : '打开右侧面板';
  rightSidebarToggle.dataset.i18nTitle = rightSidebarToggle.dataset.i18nAriaLabel;
  applyTranslations(rightSidebarToggle);
  rightSidebarToggle.setAttribute('aria-expanded', String(open));
  scheduleSettings();
  requestAnimationFrame(() => { setLeftSidebarWidth(leftSidebarWidth); setRightSidebarWidth(rightSidebarWidth); resize(); });
}
leftSidebarToggle.onclick = () => setLeftSidebarCollapsed(!leftSidebar.hidden);
rightSidebarToggle.onclick = () => setRightSidebarOpen(rightSidebar.hidden);
leftSidebarResizer.addEventListener('pointerdown', event => {
  if (event.button !== 0 || event.pointerType !== 'mouse') return;
  event.preventDefault(); event.stopPropagation(); resizingSidebar = 'left';
  workspace.classList.add('is-resizing'); leftSidebarResizer.setPointerCapture(event.pointerId);
});
leftSidebarResizer.addEventListener('pointermove', event => {
  if (resizingSidebar !== 'left') return;
  const bounds = workspace.getBoundingClientRect();
  setLeftSidebarWidth(event.clientX - bounds.left);
});
rightSidebarResizer.addEventListener('pointerdown', event => {
  if (event.button !== 0 || event.pointerType !== 'mouse') return;
  event.preventDefault(); event.stopPropagation(); resizingSidebar = 'right';
  workspace.classList.add('is-resizing'); rightSidebarResizer.setPointerCapture(event.pointerId);
});
rightSidebarResizer.addEventListener('pointermove', event => {
  if (resizingSidebar !== 'right') return;
  const bounds = workspace.getBoundingClientRect();
  setRightSidebarWidth(bounds.right - event.clientX);
});
function finishSidebarResize(event) {
  if (!resizingSidebar) return;
  const resizer = resizingSidebar === 'left' ? leftSidebarResizer : rightSidebarResizer;
  resizingSidebar = ''; workspace.classList.remove('is-resizing');
  if (resizer.hasPointerCapture(event.pointerId)) resizer.releasePointerCapture(event.pointerId);
}
leftSidebarResizer.addEventListener('pointerup', finishSidebarResize);
leftSidebarResizer.addEventListener('pointercancel', finishSidebarResize);
rightSidebarResizer.addEventListener('pointerup', finishSidebarResize);
rightSidebarResizer.addEventListener('pointercancel', finishSidebarResize);
leftSidebarResizer.addEventListener('keydown', event => {
  const width = event.key === 'ArrowLeft' ? leftSidebarWidth - 16 : event.key === 'ArrowRight' ? leftSidebarWidth + 16 : event.key === 'Home' ? sidebarLimits.min : event.key === 'End' ? maxLeftSidebarWidth() : null;
  if (width === null) return;
  event.preventDefault(); setLeftSidebarWidth(width);
});
rightSidebarResizer.addEventListener('keydown', event => {
  const width = event.key === 'ArrowLeft' ? rightSidebarWidth + 16 : event.key === 'ArrowRight' ? rightSidebarWidth - 16 : event.key === 'Home' ? sidebarLimits.min : event.key === 'End' ? maxRightSidebarWidth() : null;
  if (width === null) return;
  event.preventDefault(); setRightSidebarWidth(width);
});
new ResizeObserver(() => { if (!leftSidebar.hidden) setLeftSidebarWidth(leftSidebarWidth); }).observe(workspace);

const tools = [['select', '选择', 'V'], ['place', '放置', 'P'], ['erase', '删除', 'E'], ['translate', '移动', 'G'], ['rotate', '旋转', 'R'], ['scale', '缩放', 'S'], ['node', '节点', 'N'], ['edge', '梁', 'B'], ['plate', '面板', 'L'], ['glass', '玻璃', 'J'], ['connect', '连接', 'K'], ['paint', '涂色', 'C'], ['hide', '隐藏', 'H']];
for (const [id, name, key] of tools) {
  const button = document.createElement('button');
  button.className = 'tool'; button.dataset.tool = id;
  const icons = { select: '↖', place: '＋', erase: '⌫', translate: '✥', rotate: '⟳', scale: '⤢', node: '●', edge: '／', split: '✂', plate: '◇', glass: '◫', connect: '⌁', paint: '◈', hide: '◌' };
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
  ['mirror-action', '⇋', '打开镜像模式'],
  ['subgrid-action', '⌘', '子网格'],
];
const actionHost = $('#tools');
for (const [id, icon, label] of structuralActions) {
  const button = document.createElement('button');
  button.id = id; button.className = 'tool structural-action'; button.dataset.i18nTitle = label; button.dataset.i18nAriaLabel = label;
  button.innerHTML = '<span class="tool-icon">' + icon + '</span><span class="tool-label" data-i18n="' + label + '"></span>';
  applyTranslations(button); actionHost.append(button);
}
const restoreTransparencyButton = document.createElement('button');
restoreTransparencyButton.id = 'restore-transparency'; restoreTransparencyButton.className = 'transparency-reset'; restoreTransparencyButton.hidden = true;
restoreTransparencyButton.dataset.i18n = '取消隐藏';
restoreTransparencyButton.dataset.i18nTitle = '取消隐藏';
restoreTransparencyButton.dataset.i18nAriaLabel = '取消隐藏';
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
const extensionHandle = new THREE.Object3D();
extensionHandle.name = 'component-extension-handle';
extensionHandle.userData.extensionHandle = true;
let extensionTransform = null;
function resetTransformAxes() {
  transform.showX = true; transform.showY = true; transform.showZ = true;
  transform.setSpace('world');
  transform.setTranslationSnap(CELL_SIZE_WORLD);
}
function extensionDefinition(object) {
  if (!object) return null;
  return object.userData.definitionOverride || definitions.get(object.userData.type) || null;
}
function attachExtensionHandle(object) {
  const definition = extensionDefinition(object);
  const descriptors = extensionAxes(definition);
  if (!descriptors.length || referencePreview) return false;
  const extension = extensionVector(definition, object.userData.nativeExtension);
  extensionHandle.removeFromParent();
  object.add(extensionHandle);
  extensionHandle.position.fromArray(extensionHandlePosition(definition, extension, CELL_SIZE_WORLD));
  transform.setMode('translate'); transform.setSpace('local');
  transform.showX = descriptors.some(item => item.axis === 'x');
  transform.showY = descriptors.some(item => item.axis === 'y');
  transform.showZ = descriptors.some(item => item.axis === 'z');
  transform.setTranslationSnap(CELL_SIZE_WORLD);
  transform.attach(extensionHandle);
  return true;
}
transform.addEventListener('dragging-changed', e => {
  controls.enabled = !e.value;
  if (e.value) {
    dragOccurred = true;
    if (transform.object?.userData?.extensionHandle) {
      const object = extensionHandle.parent;
      const definition = extensionDefinition(object);
      if (object && definition) {
        extensionTransform = {
          object,
          definition,
          initialExtension: extensionVector(definition, object.userData.nativeExtension),
          initialPosition: extensionHandle.position.clone(),
        };
        return;
      }
    }
    const nodeId = transform.object?.userData?.topology === 'node' ? transform.object.userData.nodeId : null;
    const linkPoint = transform.object?.userData?.topology === 'link-point' ? {
      linkId: transform.object.userData.linkId,
      pointIndex: transform.object.userData.linkPointIndex,
    } : null;
    topologyTransform = tool === 'translate' ? (nodeId ? { nodeId } : linkPoint) : null;
    return;
  }
  if (extensionTransform) {
    const { object, definition, initialExtension } = extensionTransform;
    extensionTransform = null;
    const nextExtension = extensionVector(definition, object.userData.nativeExtension);
    if (nextExtension.some((value, index) => value !== initialExtension[index])) {
      const objectId = object.userData.id;
      void transact(async () => {
        await restore(snapshot(), topology, transparencyGroups);
        selected = objects.find(item => item.userData.id === objectId) || null;
        selectedIds = selected ? new Set([objectId]) : new Set();
        commit('更新组件线性尺寸'); inspect();
      });
    } else setTool(tool);
  } else if (topologyTransform) {
    const { nodeId, linkId, pointIndex } = topologyTransform;
    topologyTransform = null;
    try {
      if (nodeId) {
        const point = quantizeWorldVector(transform.object?.position);
        if (!point) throw new Error('节点位置超出整数格范围');
        const result = moveNodeAndMerge(topology, nodeId, point);
        commitTopology(result, result.merged ? '已移动并合并节点' : '已移动节点');
        selectTopologyNode(result.idMap[nodeId] || nodeId);
      } else if (linkId) {
        const link = topology.links.find(value => value.id === linkId);
        const point = link?.nativeProjected ? transform.object?.position : quantizeWorldVector(transform.object?.position);
        if (!point) throw new Error('连接折点位置超出整数格范围');
        const result = moveLinkPoint(topology.links, linkId, pointIndex, point, new Set(snapshot().map(item => item.id)));
        commitTopology({ ...topology, links: result.links }, '已移动连接折点');
        selectLinkPoint(linkId, pointIndex);
      }
    } catch (error) { reportError(nodeId ? '移动节点失败：{error}' : '移动连接折点失败：{error}', error); }
  } else { commit(); inspect(); }
});
transform.addEventListener('objectChange', () => {
  if (extensionTransform) {
    const axis = transform.axis?.toLowerCase();
    const index = extensionAxisIndex(axis);
    if (index < 0) return;
    const descriptor = extensionAxes(extensionTransform.definition).find(item => item.index === index);
    if (!descriptor) return;
    const delta = (extensionHandle.position.getComponent(index) - extensionTransform.initialPosition.getComponent(index)) / CELL_SIZE_WORLD;
    extensionTransform.object.userData.nativeExtension = updateExtension(
      extensionTransform.definition,
      extensionTransform.initialExtension,
      descriptor.axis,
      extensionTransform.initialExtension[index] + delta,
    );
    return;
  }
  if (!topologyTransform) return;
  if (topologyTransform.nodeId && transform.object?.userData?.nodeId === topologyTransform.nodeId) updateTopologyPreview(topologyTransform.nodeId, transform.object.position);
  if (topologyTransform.linkId && transform.object?.userData?.linkId === topologyTransform.linkId) updateLinkPointPreview(topologyTransform.linkId, topologyTransform.pointIndex, transform.object.position);
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
// visual boundaries by half a cell so edges of one-cell width land on cell
// edges instead of straddling a grid-line intersection.
grid.position.set(-CELL_SIZE_WORLD / 2, -.002, -CELL_SIZE_WORLD / 2); scene.add(grid);
const mirrorGuide = new THREE.Group();
mirrorGuide.name = 'mirror-plane-guide'; mirrorGuide.visible = false;
const mirrorGuideSurface = new THREE.Mesh(
  new THREE.PlaneGeometry(8, 8),
  new THREE.MeshBasicMaterial({ color: 0x2787f5, transparent: true, opacity: .09, depthTest: false, depthWrite: false, side: THREE.DoubleSide }),
);
const mirrorGuideOutline = new THREE.LineLoop(
  new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4, -4, 0), new THREE.Vector3(4, -4, 0), new THREE.Vector3(4, 4, 0), new THREE.Vector3(-4, 4, 0)]),
  new THREE.LineBasicMaterial({ color: 0x2787f5, transparent: true, opacity: .85, depthTest: false, depthWrite: false }),
);
const mirrorGuideHandle = new THREE.Mesh(
  new THREE.SphereGeometry(.1, 14, 10),
  new THREE.MeshBasicMaterial({ color: 0x2787f5, transparent: true, opacity: .95, depthTest: false, depthWrite: false }),
);
mirrorGuideHandle.userData.mirrorGuideHandle = true;
mirrorGuideSurface.renderOrder = 6; mirrorGuideOutline.renderOrder = 7; mirrorGuideHandle.renderOrder = 8;
mirrorGuide.add(mirrorGuideSurface, mirrorGuideOutline, mirrorGuideHandle); scene.add(mirrorGuide);
let gridSize = GRID_SIZE;
let gridCenterX = 0;
let gridCenterZ = 0;
let gridDashed = false;
const gridPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const gridWorldOrigin = new THREE.Vector3();
const gridNdcPoint = new THREE.Vector3();
const gridRayDirection = new THREE.Vector3();
const gridPlanePoint = new THREE.Vector3();
function updateReferenceGrid() {
  if (!viewport.clientWidth || !viewport.clientHeight) return;
  camera.getWorldPosition(gridWorldOrigin);
  camera.getWorldDirection(gridRayDirection);
  const target = controls.target;
  const planeFacing = Math.max(0, -gridRayDirection.y);
  const cameraDistance = camera.position.distanceTo(target);
  const halfHeight = camera.isPerspectiveCamera
    ? cameraDistance * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)
    : (camera.top - camera.bottom) / 2;
  const halfWidth = camera.isPerspectiveCamera
    ? halfHeight * camera.aspect
    : (camera.right - camera.left) / 2;
  // Near the horizon, some viewport corner rays no longer hit Y=0 in front
  // of the camera. Keep a conservative footprint so the grid does not
  // suddenly collapse to the small fallback square.
  const coverageRadius = Math.max(8, halfWidth, halfHeight) / Math.max(planeFacing, .12) + cameraDistance * .15;
  const corners = [];
  for (const [x, y] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) {
    gridNdcPoint.set(x, y, 0).unproject(camera);
    if (camera.isPerspectiveCamera) gridRayDirection.copy(gridNdcPoint).sub(gridWorldOrigin).normalize();
    else camera.getWorldDirection(gridRayDirection);
    const denominator = gridRayDirection.dot(gridPlane.normal);
    if (Math.abs(denominator) < 1e-5) continue;
    const distance = -gridNdcPoint.y / denominator;
    if (!Number.isFinite(distance) || distance < 0 || distance > 10000) continue;
    gridPlanePoint.copy(gridNdcPoint).addScaledVector(gridRayDirection, distance);
    if (Number.isFinite(gridPlanePoint.x) && Number.isFinite(gridPlanePoint.z)) corners.push([gridPlanePoint.x, gridPlanePoint.z]);
  }
  let minX = target.x - 8; let maxX = target.x + 8;
  let minZ = target.z - 8; let maxZ = target.z + 8;
  if (corners.length) {
    minX = Math.min(...corners.map(point => point[0])); maxX = Math.max(...corners.map(point => point[0]));
    minZ = Math.min(...corners.map(point => point[1])); maxZ = Math.max(...corners.map(point => point[1]));
  }
  minX = Math.min(minX, target.x - coverageRadius); maxX = Math.max(maxX, target.x + coverageRadius);
  minZ = Math.min(minZ, target.z - coverageRadius); maxZ = Math.max(maxZ, target.z + coverageRadius);
  const padding = CELL_SIZE_WORLD * 4;
  const requiredSide = Math.max(GRID_SIZE, maxX - minX + padding, maxZ - minZ + padding);
  const cells = Math.min(4096, Math.max(GRID_DIVISIONS, Math.ceil(requiredSide / CELL_SIZE_WORLD / 2) * 2));
  const nextSize = cells * CELL_SIZE_WORLD;
  const nextCenterX = Math.round(((minX + maxX) / 2) / CELL_SIZE_WORLD) * CELL_SIZE_WORLD;
  const nextCenterZ = Math.round(((minZ + maxZ) / 2) / CELL_SIZE_WORLD) * CELL_SIZE_WORLD;
  if (nextSize !== gridSize) {
    const replacement = new THREE.GridHelper(nextSize, cells, 0x426780, 0x203345);
    grid.geometry.dispose();
    grid.geometry = replacement.geometry;
    replacement.material.dispose();
    if (gridDashed) grid.computeLineDistances();
    gridSize = nextSize;
  }
  if (nextCenterX !== gridCenterX || nextCenterZ !== gridCenterZ) {
    gridCenterX = nextCenterX; gridCenterZ = nextCenterZ;
    grid.position.set(gridCenterX - CELL_SIZE_WORLD / 2, -.002, gridCenterZ - CELL_SIZE_WORLD / 2);
  }
  const fade = THREE.MathUtils.smoothstep(planeFacing, .04, .5);
  const baseOpacity = Number.isFinite(grid.userData.baseOpacity) ? grid.userData.baseOpacity : 1;
  for (const material of Array.isArray(grid.material) ? grid.material : [grid.material]) material.opacity = baseOpacity * fade;
  grid.userData.viewFade = fade;
  viewport.dataset.gridSize = String(gridSize);
}
const topologyLayer = new THREE.Group();
topologyLayer.name = 'topology-overlay';
scene.add(topologyLayer);
const connectionPortLayer = new THREE.Group();
connectionPortLayer.name = 'connection-ports'; scene.add(connectionPortLayer);
const connectionDraftPreview = new THREE.Group();
connectionDraftPreview.name = 'connection-draft-preview'; scene.add(connectionDraftPreview);
const linkPointMoveMarker = new THREE.Mesh(new THREE.SphereGeometry(.045, 12, 8), new THREE.MeshBasicMaterial({ color: 0x2787f5, transparent: true, opacity: .9, depthTest: false, depthWrite: false }));
linkPointMoveMarker.userData.topology = 'link-point';
linkPointMoveMarker.visible = false; linkPointMoveMarker.renderOrder = 9; scene.add(linkPointMoveMarker);
const topologyMaterials = {
  node: new THREE.MeshBasicMaterial({ color: settings.nodeColor, transparent: settings.nodeOpacity < 1, opacity: settings.nodeOpacity, depthTest: true, depthWrite: false }),
  nodeSelected: new THREE.MeshBasicMaterial({ color: 0xe1781d, transparent: settings.nodeOpacity < 1, opacity: settings.nodeOpacity, depthTest: true, depthWrite: false }),
  edge: new THREE.MeshStandardMaterial({ color: STRUCTURE_COLOR, metalness: .05, roughness: .85 }),
  plate: new THREE.MeshStandardMaterial({ color: STRUCTURE_COLOR, metalness: .05, roughness: .85, side: THREE.DoubleSide, depthTest: true, depthWrite: true }),
};
const raycaster = new THREE.Raycaster();
raycaster.params.Line.threshold = .06;
const pointer = new THREE.Vector2();
const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const edgePreview = createEdgeMesh(new THREE.Vector3(), new THREE.Vector3(), new THREE.MeshStandardMaterial({ color: STRUCTURE_COLOR, transparent: true, opacity: .5, depthWrite: false }), { outlined: settings.edgeOutlinesVisible });
const edgeRuler = createEdgeRuler(viewport, () => camera);
const edgeLengthLabels = createEdgeLengthLabels(viewport, () => camera);
let edgeAxisSnap = settings.edgeAxisSnap;
let edgeSize = settings.edgeSize;
let edgeShiftSnap = false;
let edgePointer = null;
let pointerInCanvas = false;
const edgeAnchor = new THREE.Mesh(new THREE.SphereGeometry(.07, 12, 8), new THREE.MeshBasicMaterial({ color: 0xd78624, transparent: true, opacity: .62, depthTest: false, depthWrite: false }));
edgeAnchor.visible = false; edgeAnchor.renderOrder = 3;
scene.add(edgePreview, edgeAnchor);
const buildStatus = document.createElement('span'); buildStatus.id = 'build-status'; buildStatus.className = 'badge'; buildStatus.hidden = true; $('.hud').append(buildStatus);

function nativeDiagnosticColor(index) {
  return new THREE.Color(nativePaintColor(index));
}
function structureMaterial(color, legacyIndex, fallback, side = THREE.DoubleSide, { depthWrite = true, depthLayer = RENDER_DEPTH_LAYERS.edge, depthKey = '' } = {}) {
  const material = typeof color !== 'string' && !Number.isInteger(legacyIndex) && side === THREE.DoubleSide && depthWrite
    ? fallback.clone()
    : new THREE.MeshStandardMaterial({ color: typeof color === 'string' ? color : Number.isInteger(legacyIndex) ? nativeDiagnosticColor(legacyIndex) : fallback.color, metalness: .05, roughness: .85, side, depthTest: true, depthWrite });
  configureOpaqueDepth(material, depthLayer, { key: depthKey });
  material.userData.topologyPaint = true;
  return material;
}
function clearTopologyVisual(layer = topologyLayer) {
  const disposedMaterials = new Set();
  layer.traverse(object => {
    object.geometry?.dispose();
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
      if ((material?.userData?.topologyPaint || material?.userData?.topologyLink || material?.userData?.topologyOutline) && !disposedMaterials.has(material)) {
        disposedMaterials.add(material); material.dispose();
      }
    }
  });
  layer.clear();
}
function connectionPortOffset(component, endpoint, linkKind = null) {
  const definition = definitions.get(component?.type);
  const port = endpoint?.port ?? 0;
  const kind = linkKind || $('#connection-kind')?.value;
  // `endpoint.port` comes directly from native p0.pos/p1.pos.  The game uses
  // it as the original logic_nodes index, not a filtered network-local index.
  // Filtering first put wheel.mechanical_in #2 (brake) at the wrong location
  // as soon as a definition mixed connection types.
  const candidate = logicNodePort(definition, port) || (kind === 'mechanical'
    ? (definition?.surfaces || []).filter(surface => typeof surface.type === 'string' && surface.type.startsWith('torque'))[port]
    : null);
  if (!candidate) return new THREE.Vector3();
  const pos = logicNodeCellPosition(candidate, component.nativeExtension, definition?.center_stretch);
  const scale = component.scale || { x: 1, y: 1, z: 1 };
  return new THREE.Vector3(pos[0] * CELL_SIZE_WORLD, pos[1] * CELL_SIZE_WORLD, pos[2] * CELL_SIZE_WORLD)
    .multiply(new THREE.Vector3(scale.x ?? 1, scale.y ?? 1, scale.z ?? 1))
    .applyEuler(new THREE.Euler(component.rotation?.x || 0, component.rotation?.y || 0, component.rotation?.z || 0, 'XYZ'));
}
function connectionEndpointWorldPosition(endpoint, components, linkKind = null) {
  const component = components.get(endpoint.componentId);
  if (!component) return null;
  const position = component.position || component;
  if (!position || !axes.every(axis => Number.isFinite(position[axis]))) return null;
  return new THREE.Vector3(position.x, position.y, position.z).add(connectionPortOffset(component, endpoint, linkKind));
}
function componentEntries(items = snapshot()) {
  return new Map(items.map(item => [item.id, item]));
}
function buildTopologyVisual(state, components = new Map()) {
  const layer = new THREE.Group();
  try {
    const byId = new Map(state.nodes.map(node => [node.id, node]));
    for (const node of state.nodes) {
      const marker = new THREE.Mesh(new THREE.SphereGeometry(.055, 10, 8), topologyMaterials.node);
      marker.position.set(node.position.x, node.position.y, node.position.z);
      marker.userData.topology = 'node'; marker.userData.nodeId = node.id;
      marker.visible = showNodes && topologyHelpersVisible && !referencePreview && !node.hidden; marker.renderOrder = 2;
      layer.add(marker);
    }
    for (const edge of state.edges) {
      // Native edges are opaque narrow supports. They need to write depth so
      // their filled faces remain visible in dense imported assemblies; the
      // physically outward panel offset still wins where a plate covers one.
      const depthKey = `edge:${edge.id}`;
      const mesh = createEdgeMesh(byId.get(edge.a).position, byId.get(edge.b).position, structureMaterial(edge.color, edge.col, topologyMaterials.edge, THREE.DoubleSide, { depthLayer: RENDER_DEPTH_LAYERS.edge, depthKey }), { outlined: settings.edgeOutlinesVisible, size: edge.size });
      mesh.userData.topology = 'edge'; mesh.userData.edgeId = edge.id;
      mesh.castShadow = true; mesh.receiveShadow = true;
      configureOpaqueDepthLayer(mesh, RENDER_DEPTH_LAYERS.edge, { key: depthKey });
      mesh.visible = !edge.hidden;
      layer.add(mesh);
    }
    for (const plate of state.plates) {
      const depthKey = `plate:${plate.id}`;
      const positions = new Map(state.nodes.map(node => [node.id, new THREE.Vector3(node.position.x, node.position.y, node.position.z)]));
      const offset = plate.normalOffset ?? CELL_SIZE_WORLD / 2;
      const surface = { normalOffset: offset, surfaceDirection: plate.surfaceDirection };
      const vertices = plateSurfaceVertices(plate.nodeIds, positions, surface);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.computeVertexNormals();
      const painted = typeof plate.color_front === 'string' || typeof plate.color_back === 'string' || Number.isInteger(plate.col_front) || Number.isInteger(plate.col_back);
      const glass = isGlassPlate(plate);
      if (painted) {
        geometry.addGroup(0, vertices.length / 3, 0);
        geometry.addGroup(0, vertices.length / 3, 1);
      }
      let material = painted ? [
        structureMaterial(plate.color_front, plate.col_front, topologyMaterials.plate, THREE.FrontSide, { depthWrite: !glass, depthLayer: RENDER_DEPTH_LAYERS.plate, depthKey }),
        structureMaterial(plate.color_back, plate.col_back, topologyMaterials.plate, THREE.BackSide, { depthWrite: !glass, depthLayer: RENDER_DEPTH_LAYERS.plate, depthKey }),
      ] : topologyMaterials.plate.clone();
      // Native imports can contain deliberately adjacent and occasionally
      // coincident construction faces. Give each opaque panel a stable depth
      // bias so their rasterisation does not alternate between frames.
      for (const item of Array.isArray(material) ? material : [material]) {
        item.userData.topologyPaint = true;
        if (!glass) configureOpaqueDepth(item, RENDER_DEPTH_LAYERS.plate, { key: depthKey });
      }
      if (glass) {
        for (const item of Array.isArray(material) ? material : [material]) {
          item.transparent = true; item.opacity = .42; item.depthTest = true; item.depthWrite = false;
        }
      }
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData.topology = 'plate'; mesh.userData.plateId = plate.id;
      mesh.userData.nodeIds = [...plate.nodeIds]; mesh.userData.normalOffset = offset;
      mesh.userData.surfaceDirection = plate.surfaceDirection;
      mesh.visible = !plate.hidden;
      if (glass) mesh.renderOrder = 4;
      else configureOpaqueDepthLayer(mesh, RENDER_DEPTH_LAYERS.plate, { key: depthKey });
      layer.add(mesh);
    }
    for (const link of state.links || []) {
      const from = connectionEndpointWorldPosition(link.from, components, link.kind);
      const to = connectionEndpointWorldPosition(link.to, components, link.kind);
      if (!from || !to) continue;
      const points = [from, ...(link.points || []), to].map(point => new THREE.Vector3(point.x, point.y, point.z));
      const style = {
        electric: { radius: .012, radialSegments: 8 }, mechanical: { radius: .022, radialSegments: 8 },
        liquid: { radius: .02, radialSegments: 10 }, gas: { radius: .018, radialSegments: 10 },
        belt: { radius: .028, radialSegments: 4 }, data: { radius: .01, radialSegments: 8 },
      }[link.kind];
      const material = new THREE.MeshStandardMaterial({ color: LINK_COLORS[link.kind], metalness: .1, roughness: .6, transparent: true, opacity: .92, depthTest: true, depthWrite: false });
      material.userData.topologyLink = true;
      const route = createConnectionRoute(points, material, {
        ...style,
        jointUserData: pointIndex => ({ topology: 'link-point', linkId: link.id, linkPointIndex: pointIndex }),
      });
      route.renderOrder = 4; route.userData.topology = 'link'; route.userData.linkId = link.id; route.userData.linkKind = link.kind;
      route.visible = connectionVisibility[link.kind] !== false && !referencePreview;
      route.traverse(object => {
        if (object.userData.topology !== 'link-point') object.userData.topology = 'link';
        object.userData.linkId = link.id;
      });
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
      if (edge && !object.userData.topologyJunction) updateEdgeMesh(object, positions.get(edge.a), positions.get(edge.b), { size: edge.size });
      if (object.userData.topologyJunction && object.userData.nodeId === nodeId) object.position.copy(point);
    }
    if (object.userData.topology === 'plate') {
      const nodeIds = object.userData.nodeIds;
      const vertices = plateSurfaceVertices(nodeIds, positions, {
        normalOffset: object.userData.normalOffset,
        surfaceDirection: object.userData.surfaceDirection,
      });
      const attribute = object.geometry.getAttribute('position');
      if (attribute.count === vertices.length / 3) attribute.set(vertices);
      else object.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      object.geometry.getAttribute('position').needsUpdate = true;
      object.geometry.computeVertexNormals();
    }
  }
  topologyLayer.updateMatrixWorld(true);
}
function updateLinkPointPreview(linkId, pointIndex, position) {
  const link = topology.links.find(value => value.id === linkId);
  if (!link || !link.points[pointIndex]) return;
  const previewLinks = topology.links.map(value => value.id === linkId ? {
    ...value,
    points: value.points.map((point, index) => index === pointIndex ? { x: position.x, y: position.y, z: position.z } : point),
  } : value);
  replaceTopologyVisual(buildTopologyVisual({ ...topology, links: previewLinks }, componentEntries()));
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
  reconcileOpaqueDepthOrder();
  updateConnectionVisibility();
  updateNodeVisualState();
  edgeLengthLabels.setEdges(topology.nodes, topology.edges);
  edgeLengthLabels.setVisible(!referencePreview && settings.edgeLengthsVisible);
}
function reconcileOpaqueDepthOrder() {
  const entries = objects.map(object => ({ object, layer: RENDER_DEPTH_LAYERS.component, key: `component:${object.userData.id}` }));
  for (const object of topologyLayer.children) {
    if (object.userData.topology === 'edge') entries.push({ object, layer: RENDER_DEPTH_LAYERS.edge, key: `edge:${object.userData.edgeId}` });
    if (object.userData.topology === 'plate') entries.push({ object, layer: RENDER_DEPTH_LAYERS.plate, key: `plate:${object.userData.plateId}` });
  }
  assignOpaqueDepthOrder(entries);
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
function updateConnectionVisibility() {
  for (const object of topologyLayer.children) {
    if (object.userData.topology !== 'link') continue;
    object.visible = !referencePreview && connectionVisibility[object.userData.linkKind] !== false;
  }
  if (selectedLinkPoint) {
    const link = topology.links.find(value => value.id === selectedLinkPoint.linkId);
    if (link && connectionVisibility[link.kind] === false) clearLinkPointSelection();
  }
  updateInteractionHighlights();
}
function clearLinkPointSelection() {
  if (transform.object?.userData?.topology === 'link-point') transform.detach();
  selectedLinkPoint = null; linkPointMoveMarker.visible = false;
}
function selectTopologyNode(nodeId) {
  const node = topology.nodes.find(value => value.id === nodeId);
  if (!node) return false;
  clearLinkPointSelection(); selected = null; selectedIds.clear(); selectedTopologyIds.clear(); selectedTopologyNode = node.id;
  nodeMoveFrame = cameraBuildFrame(camera, new THREE.Vector3(node.position.x, node.position.y, node.position.z));
  updateNodeVisualState();
  if (tool === 'translate') {
    const marker = topologyNodeMarker(node.id);
    if (marker) { transform.setTranslationSnap(CELL_SIZE_WORLD); transform.setMode('translate'); transform.attach(marker); }
  }
  inspect();
  return true;
}
function cancelEdge() {
  edgeDraft = null; edgePointer = null; edgePreview.visible = false; edgeAnchor.visible = false; edgeRuler.hide();
  setText(buildStatus, '梁 1 格 · 点击起点');
}
function cancelTopologyDraft() {
  cancelEdge(); clearNodeSelection(); clearLinkPointSelection(); plateEdgeIds = []; connectionDraft = null; clearConnectionDraftPreview();
  refreshConnectionPorts();
}

function status(message, params = {}) { setText($('#save-status'), message, params); }
function reportError(message, error) { status(message, () => ({ error: t(error.message) })); }
function componentName(def) {
  if (!def) return '';
  return getLocale() === 'zh' ? def.name_zh || def.name || def.id : def.name || def.id;
}
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
function hideComponentModelPreview() {
  modelPreviewCard = null;
  modelPreviewRequestId++;
  componentModelPreview.hidden = true;
  componentModelPreviewImage.removeAttribute('src');
}
function positionComponentModelPreview(button) {
  const bounds = button.getBoundingClientRect();
  const gap = 10;
  const width = componentModelPreview.offsetWidth || 240;
  const height = componentModelPreview.offsetHeight || 240;
  const left = bounds.right + gap + width <= window.innerWidth ? bounds.right + gap : bounds.left - width - gap;
  const top = Math.max(8, Math.min(window.innerHeight - height - 8, bounds.top + (bounds.height - height) / 2));
  componentModelPreview.style.left = Math.max(8, left) + 'px';
  componentModelPreview.style.top = top + 'px';
}
function showComponentModelPreview(button) {
  modelPreviewCard = button;
  const requestId = ++modelPreviewRequestId;
  const id = button.dataset.id;
  const cached = thumbnailLargeCache.get(id);
  if (cached) {
    componentModelPreviewImage.src = cached;
    componentModelPreview.hidden = false;
    positionComponentModelPreview(button);
    return;
  }
  let request = thumbnailLargeRequests.get(id);
  if (!request) {
    request = (async () => {
      try {
        const detail = await catalog.definition(id);
        definitions.set(id, detail);
        return await renderModelThumbnail(detail, 256);
      } catch { return null; }
    })();
    thumbnailLargeRequests.set(id, request);
    request.then(value => thumbnailLargeCache.set(id, value)).finally(() => thumbnailLargeRequests.delete(id));
  }
  request.then(value => {
    if (!value || requestId !== modelPreviewRequestId || modelPreviewCard !== button || !button.isConnected) return;
    componentModelPreviewImage.src = value;
    componentModelPreview.hidden = false;
    positionComponentModelPreview(button);
  });
}
function selectedObjects() { return objects.filter(object => selectedIds.has(object.userData.id)); }
function selectedObjectIds() { return selectedObjects().map(object => object.userData.id); }
function topologySelectionKey(kind, id) { return `${kind}:${id}`; }
function topologyObject(kind, id) {
  return topologyLayer.children.find(object => object.userData.topology === kind && object.userData[`${kind}Id`] === id) || null;
}
function selectedTopologyObjects() {
  return [...selectedTopologyIds].map(key => {
    const separator = key.indexOf(':');
    return separator < 0 ? null : topologyObject(key.slice(0, separator), key.slice(separator + 1));
  }).filter(Boolean);
}
function clearTopologySelection() { selectedTopologyIds.clear(); }
function pruneTransparencyGroups(groups = transparencyGroups, items = snapshot(), state = topology) {
  const componentIds = new Set(items.map(object => object.id));
  const edgeIds = new Set((state.edges || []).map(edge => edge.id));
  const plateIds = new Set((state.plates || []).map(plate => plate.id));
  return (groups || []).map(group => ({
    ...group,
    components: (group.components || []).filter(id => componentIds.has(id)),
    edges: (group.edges || []).filter(id => edgeIds.has(id)),
    plates: (group.plates || []).filter(id => plateIds.has(id)),
  })).filter(group => group.components.length || group.edges.length || group.plates.length);
}
function clearConnectionPorts() {
  connectionPortLayer.traverse(object => { object.geometry?.dispose(); object.material?.dispose(); });
  connectionPortLayer.clear();
}
function clearConnectionDraftPreview() {
  connectionDraftPreview.traverse(object => { object.geometry?.dispose(); object.material?.dispose(); });
  connectionDraftPreview.clear();
}
function connectionRouteBase() {
  if (!connectionDraft) return null;
  const points = connectionDraft.points || [];
  if (points.length) return new THREE.Vector3(points.at(-1).x, points.at(-1).y, points.at(-1).z);
  const start = connectionEndpointWorldPosition(connectionDraft, componentEntries());
  return start ? start.clone() : null;
}
function connectionPoint() {
  const endpoint = pickConnectionPort();
  if (endpoint?.position) return new THREE.Vector3(endpoint.position.x, endpoint.position.y, endpoint.position.z);
  const base = connectionRouteBase();
  if (!base) return null;
  const frame = cameraBuildFrame(camera, base);
  const result = resolveEdgePoint(raycaster.ray, frame, {
    axisSnap: edgeAxisSnap || edgeShiftSnap,
    viewNormal: camera.getWorldDirection(new THREE.Vector3()),
  });
  return result?.point ? new THREE.Vector3(result.point.x, result.point.y, result.point.z) : null;
}
function updateConnectionDraftPreview(point = cursorPoint) {
  clearConnectionDraftPreview();
  if (tool !== 'connect' || !connectionDraft || !point) return;
  const start = connectionEndpointWorldPosition(connectionDraft, componentEntries());
  if (!start) return;
  const material = new THREE.MeshBasicMaterial({ color: LINK_COLORS[$('#connection-kind').value], transparent: true, opacity: .65, depthTest: false, depthWrite: false });
  const routePoints = [start, ...(connectionDraft.points || []).map(value => new THREE.Vector3(value.x, value.y, value.z)), point];
  const route = createConnectionRoute(routePoints, material, { radius: .012, radialSegments: 8 });
  route.renderOrder = 8; connectionDraftPreview.add(route);
}
function refreshConnectionPorts() {
  clearConnectionPorts();
  if (tool !== 'connect' || referencePreview || !selectableKinds.link) {
    $('#viewport').dataset.connectionPortCount = '0';
    return;
  }
  const kind = $('#connection-kind').value;
  const color = LINK_COLORS[kind];
  const portsForKind = definition => {
    const logicPorts = logicNodePortsForNetwork(definition, kind);
    if (logicPorts.length || kind !== 'mechanical') return logicPorts;
    // Torque surfaces are the only definition-backed mechanical endpoints
    // currently available. Their exact game compatibility is still unknown.
    return (definition?.surfaces || []).filter(surface => typeof surface.type === 'string' && surface.type.startsWith('torque')).map((surface, port) => ({ ...surface, port, source: 'surface' }));
  };
  for (const object of objects) {
    if (!object.visible) continue;
    const definition = definitions.get(object.userData.type);
    const ports = portsForKind(definition);
    if (!ports.length) continue;
    object.updateWorldMatrix(true, false);
    ports.forEach(portDefinition => {
      const nativePosition = logicNodeCellPosition(portDefinition, object.userData.nativeExtension, definition?.center_stretch);
      const port = portDefinition.port;
      const marker = new THREE.Mesh(new THREE.SphereGeometry(.055, 10, 8), new THREE.MeshBasicMaterial({ color, transparent: settings.nodeOpacity < 1, opacity: settings.nodeOpacity, depthTest: false, depthWrite: false }));
      marker.position.set(nativePosition[0] * CELL_SIZE_WORLD, nativePosition[1] * CELL_SIZE_WORLD, nativePosition[2] * CELL_SIZE_WORLD);
      object.localToWorld(marker.position);
      marker.scale.setScalar(settings.nodeSize / .055);
      marker.renderOrder = 7;
      marker.userData.connectionPort = {
        componentId: object.userData.id,
        componentType: object.userData.type,
        componentName: componentName(definition),
        port,
        networkKind: kind,
        type: portDefinition.type || 'surface',
        source: portDefinition.source || 'surface',
        descriptor: definition?.data_descriptors?.[port]?.name || '',
        direction: portDefinition.direction,
        position: marker.getWorldPosition(new THREE.Vector3()),
      };
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
function showConnectionPortTooltip(port, event) {
  if (!port || !event) return hideConnectionPortTooltip();
  const locale = getLocale();
  const lines = [
    t('连接节点 · {component} · 端口 {port}', { component: port.componentName || port.componentType, port: port.port }),
    t('网络：{network}', { network: connectionNetworkLabel(port.networkKind, locale) }),
    t('作用：{purpose}', { purpose: connectionPortRoleLabel(port, locale) }),
  ];
  if (Number.isInteger(port.direction)) lines.push(t('方向编号：{direction}', { direction: port.direction }));
  if (port.position) lines.push(t('局部位置：{position}', { position: [port.position.x, port.position.y, port.position.z].map(value => value.toFixed(3)).join(', ') }));
  connectionPortTooltip.textContent = lines.join('\n');
  connectionPortTooltip.hidden = false;
  connectionPortTooltip.style.left = `${Math.min(window.innerWidth - connectionPortTooltip.offsetWidth - 12, event.clientX + 14)}px`;
  connectionPortTooltip.style.top = `${Math.min(window.innerHeight - connectionPortTooltip.offsetHeight - 12, event.clientY + 14)}px`;
}
function hideConnectionPortTooltip() { connectionPortTooltip.hidden = true; hoveredConnectionPort = null; }
function updateInteractionHighlights(hovered = hoveredObject) {
  clearInteractionHighlights();
  // Reference preview suppresses grid and editing chrome, but must not hide
  // the affordance needed to identify what the active interaction will act on.
  if (!['select', 'erase', 'paint', 'plate', 'glass', 'translate', 'rotate', 'scale', 'hide'].includes(tool)) {
    $('#viewport').dataset.interactionHighlightCount = '0';
    $('#viewport').dataset.edgeCenterHighlightCount = '0';
    $('#viewport').dataset.plateBoundaryHighlightCount = '0';
    return;
  }
  const highlighted = new Set();
  let edgeCenterHighlightCount = 0;
  let plateBoundaryHighlightCount = 0;
  const add = (object, color) => {
    if (!object) return;
    const kind = object.userData.topology;
    const id = kind && object.userData[`${kind}Id`];
    const key = kind && id ? `${kind}:${id}` : object.uuid;
    if (highlighted.has(key)) return;
    highlighted.add(key);
    if (kind === 'edge') {
      const edge = topology.edges.find(value => value.id === id);
      const start = edge && topology.nodes.find(node => node.id === edge.a)?.position;
      const end = edge && topology.nodes.find(node => node.id === edge.b)?.position;
      if (!start || !end) return;
      const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .95, depthTest: false, depthWrite: false });
      const route = createConnectionRoute([start, end], material, { radius: .014, radialSegments: 10 });
      route.userData.interactionHighlightKind = 'edge-centerline';
      route.traverse(item => { item.castShadow = false; item.receiveShadow = false; item.renderOrder = 8; });
      interactionHighlights.add(route);
      edgeCenterHighlightCount++;
      return;
    }
    if (kind === 'plate') {
      const positions = new Map(topology.nodes.map(node => [node.id, new THREE.Vector3(node.position.x, node.position.y, node.position.z)]));
      const boundary = plateSurfaceBoundary(object.userData.nodeIds, positions, {
        normalOffset: object.userData.normalOffset,
        surfaceDirection: object.userData.surfaceDirection,
      });
      if (boundary.length >= 3) {
        const geometry = new THREE.BufferGeometry().setFromPoints([...boundary, boundary[0]]);
        const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: .95, depthTest: false, depthWrite: false });
        const outline = new THREE.Line(geometry, material);
        outline.userData.interactionHighlightKind = 'plate-boundary';
        outline.renderOrder = 8;
        interactionHighlights.add(outline);
        plateBoundaryHighlightCount++;
        return;
      }
    }
    const helper = new THREE.BoxHelper(object, color);
    helper.material.depthTest = false; helper.material.transparent = true; helper.material.opacity = .9;
    helper.renderOrder = 8; interactionHighlights.add(helper);
  };
  if (tool === 'select') {
    for (const object of selectedObjects()) add(object, 0x2787f5);
    for (const object of selectedTopologyObjects()) add(object, 0x2787f5);
  }
  if (tool === 'plate' || tool === 'glass') {
    for (const edgeId of plateEdgeIds) add(topologyObject('edge', edgeId), 0x2787f5);
  }
  if (tool === 'translate' && hovered?.userData.topology === 'edge') {
    const edge = topology.edges.find(value => value.id === hovered.userData.edgeId);
    if (selectableKinds.node) for (const nodeId of edge ? [edge.a, edge.b] : []) add(topologyNodeMarker(nodeId), 0xf0a229);
  } else {
    add(hovered, hovered?.userData.topology === 'edge' && tool !== 'hide' ? 0x2787f5 : ['erase', 'hide'].includes(tool) ? 0xe5484d : 0xf0a229);
  }
  $('#viewport').dataset.interactionHighlightCount = String(interactionHighlights.children.length);
  $('#viewport').dataset.edgeCenterHighlightCount = String(edgeCenterHighlightCount);
  $('#viewport').dataset.plateBoundaryHighlightCount = String(plateBoundaryHighlightCount);
}
function setTool(value) {
  if (busy) return;
  tool = value;
  if (!['edge', 'connect'].includes(value) && edgeShiftSnap) {
    edgeShiftSnap = false;
    updateEdgeAxisSnapButton();
  }
  if (value !== 'paint') setPaintColorPicking(false);
  hoveredObject = null;
  hideConnectionPortTooltip();
  scheduleSettings();
  document.querySelectorAll('.tool').forEach(b => b.classList.toggle('active', b.dataset.tool === tool));
  paintToolbar.hidden = value !== 'paint' || referencePreview;
  connectionToolbar.hidden = value !== 'connect' || referencePreview;
  transparencyToolbar.hidden = value !== 'hide' || referencePreview;
  mirrorToolbar.hidden = !mirrorMode.active || referencePreview;
  edgeToolbar.hidden = value !== 'edge' || referencePreview;
  updateEdgeToolbar();
  updateSubgridToolbar();
  transform.detach(); extensionHandle.removeFromParent(); resetTransformAxes();
  if (value !== 'place') clearPlacementPreview();
  else if (cursorPoint && pointerInCanvas) void updatePlacementPreview(cursorPoint);
  if (value !== 'edge') cancelEdge();
  buildStatus.hidden = value !== 'edge';
  if (value === 'edge' && !edgeDraft) setText(buildStatus, '梁 1 格 · 点击起点');
  if (!['plate', 'glass'].includes(value)) plateEdgeIds = [];
  if (value !== 'connect') { connectionDraft = null; clearConnectionDraftPreview(); }
  if (!['node', 'translate'].includes(value)) clearNodeSelection();
  if (value !== 'translate') clearLinkPointSelection();
  if (selected && selectedIds.size === 1 && tool === 'select' && attachExtensionHandle(selected)) {
    // Native extension handles are always shown while an extendable component
    // is selected. They edit `ext`, not the generic transform scale.
  } else if (selected && selectedIds.size === 1 && ['translate', 'rotate', 'scale'].includes(tool)) {
    transform.setMode(tool); transform.attach(selected);
  } else if (tool === 'translate' && selectedTopologyNode) {
    const marker = topologyNodeMarker(selectedTopologyNode);
    if (marker) { transform.setTranslationSnap(CELL_SIZE_WORLD); transform.setMode('translate'); transform.attach(marker); }
  } else if (tool === 'translate' && selectedLinkPoint) {
    const link = topology.links.find(value => value.id === selectedLinkPoint.linkId);
    if (link) { transform.setTranslationSnap(link.nativeProjected ? null : CELL_SIZE_WORLD); transform.setMode('translate'); transform.attach(linkPointMoveMarker); }
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
  clearTopologySelection();
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
function selectTopology(target, { toggle = false } = {}) {
  clearNodeSelection(); clearLinkPointSelection();
  selected = null; selectedIds.clear();
  if (!target) clearTopologySelection();
  else {
    const key = topologySelectionKey(target.kind, target.id);
    if (toggle) {
      if (selectedTopologyIds.has(key)) selectedTopologyIds.delete(key);
      else selectedTopologyIds.add(key);
    } else selectedTopologyIds = new Set([key]);
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
    ...(paintColorValue(o.userData.paintColor) ? { paintColor: o.userData.paintColor } : {}),
    ...(o.userData.hidden ? { hidden: true } : {}),
    ...(Array.isArray(o.userData.nativeExtension) ? { nativeExtension: [...o.userData.nativeExtension] } : {}),
    ...(o.userData.nativeProperties ? { nativeProperties: structuredClone(o.userData.nativeProperties) } : {}),
    ...(o.userData.nativeAccessory ? { nativeAccessory: structuredClone(o.userData.nativeAccessory) } : {}),
    ...(o.userData.definitionOverride ? { definitionOverride: structuredClone(o.userData.definitionOverride) } : {}),
    ...(o.userData.nativeProjected ? { nativeProjected: true } : {}),
    position: o.userData.nativeProjected
      ? Object.fromEntries(axes.map(a => [a, o.position[a]]))
      : assertGridVector(o.position, '组件位置'),
    rotation: Object.fromEntries(axes.map(a => [a, o.rotation[a]])),
    scale: Object.fromEntries(axes.map(a => [a, Math.abs(o.scale[a])])) }));
}
function commit(label = '编辑', params = {}) {
  // TransformControls may cross zero when scaling; keep the project domain valid.
  if (selected) {
    if (selected.userData.nativeProjected) {
      if (axes.some(axis => !Number.isFinite(selected.position[axis]) || Math.abs(selected.position[axis]) > 10000)) throw new Error('组件位置超出合法范围');
    } else {
      const position = quantizeWorldVector(selected.position);
      if (!position) throw new Error('组件位置超出整数格范围');
      selected.position.set(position.x, position.y, position.z);
    }
    axes.forEach(a => {
      const sign = Math.sign(selected.scale[a]) || 1;
      selected.scale[a] = sign * THREE.MathUtils.clamp(Math.abs(selected.scale[a]), .001, 100);
    });
  }
  history.commit(currentProject(), { key: label, params });
  if (topology.links?.length) replaceTopologyVisual(buildTopologyVisual(topology, componentEntries()));
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
  renderTransparencyGroups();
  renderSubgridList();
}
function updateTransparencyAction() {
  const hasHiddenObjects = objects.some(object => object.userData.hidden)
    || topology.nodes.some(node => node.hidden)
    || topology.edges.some(edge => edge.hidden)
    || topology.plates.some(plate => plate.hidden);
  restoreTransparencyButton.hidden = !hasHiddenObjects;
}
function importedNativeVehicles() {
  if (!nativeModel) return [];
  return nativeModel.vehicles.filter(vehicle => {
    const gridIds = new Set(vehicle.grids.map(grid => grid.id));
    return objects.some(object => object.userData.id.startsWith(`${vehicle.id}:`))
      || topology.nodes.some(node => gridIds.has(node.gridId))
      || topology.edges.some(edge => gridIds.has(edge.gridId))
      || topology.plates.some(plate => gridIds.has(plate.gridId));
  });
}
function setHidden(value, hidden) {
  if (!hidden) {
    const { hidden: _hidden, ...visible } = value;
    return visible;
  }
  return { ...value, hidden: true };
}
async function setNativeVehicleVisibility(vehicleId, hidden) {
  const vehicle = nativeModel?.vehicles.find(value => String(value.id) === String(vehicleId));
  if (!vehicle || busy) return;
  const componentPrefix = `${vehicle.id}:`;
  const gridIds = new Set(vehicle.grids.map(grid => grid.id));
  await transact(async () => {
    const items = snapshot().map(object => object.id.startsWith(componentPrefix) ? setHidden(object, hidden) : object);
    const nextTopology = {
      ...topology,
      nodes: topology.nodes.map(node => gridIds.has(node.gridId) ? setHidden(node, hidden) : node),
      edges: topology.edges.map(edge => gridIds.has(edge.gridId) ? setHidden(edge, hidden) : edge),
      plates: topology.plates.map(plate => gridIds.has(plate.gridId) ? setHidden(plate, hidden) : plate),
    };
    await restore(items, nextTopology, transparencyGroups);
    commit(hidden ? '隐藏子载具 {id}' : '取消隐藏子载具 {id}', { id: vehicle.id });
    status(hidden ? '隐藏子载具 {id}' : '取消隐藏子载具 {id}', { id: vehicle.id });
  });
}
function renderSubgridList() {
  const summary = $('#subgrid-summary');
  const host = $('#subgrid-list');
  if (!summary || !host) return;
  const vehicles = importedNativeVehicles();
  host.replaceChildren();
  if (!vehicles.length) {
    setText(summary, '尚未导入原生载具。');
    return;
  }
  setText(summary, '{count} 个载具', { count: vehicles.length });
  const roots = new Set(importedNativeRootVehicleIds.map(String));
  for (const vehicle of vehicles) {
    const components = objects.filter(object => object.userData.id.startsWith(`${vehicle.id}:`));
    const gridIds = new Set(vehicle.grids.map(grid => grid.id));
    const structuralItems = [...topology.nodes, ...topology.edges, ...topology.plates].filter(item => gridIds.has(item.gridId));
    const visibilityTargets = [...components, ...structuralItems];
    const fullyHidden = visibilityTargets.length > 0 && visibilityTargets.every(item => item.userData?.hidden ?? item.hidden);
    const componentCount = vehicle.grids.reduce((count, grid) => count + grid.components.length, 0);
    const row = document.createElement('div'); row.className = 'subgrid-row';
    const detail = document.createElement('div'); detail.className = 'subgrid-detail';
    const title = document.createElement('strong'); title.textContent = `${roots.has(String(vehicle.id)) ? t('主载具') : t('子载具')} ${vehicle.id}`;
    const meta = document.createElement('span'); meta.textContent = `${vehicle.grids.length} ${t('网格')} · ${componentCount} ${t('组件')} · ${fullyHidden ? t('已隐藏') : t('可见')}`;
    const action = document.createElement('button'); action.type = 'button'; action.textContent = t(fullyHidden ? '取消隐藏' : '隐藏');
    action.disabled = busy || !visibilityTargets.length;
    action.onclick = () => { void setNativeVehicleVisibility(vehicle.id, !fullyHidden); };
    detail.append(title, meta); row.append(detail, action); host.append(row);
  }
}
async function transact(operation) {
  if (busy) return;
  busy = true; transform.enabled = false; refresh();
  let completed = false;
  try { await operation(); completed = true; } catch (error) { reportError('操作失败：{error}', error); }
  finally { busy = false; transform.enabled = true; setTool(tool); refresh(); }
  return completed;
}
async function createObject(data) {
  const catalogDefinition = await catalog.definition(data.type);
  definitions.set(data.type, catalogDefinition);
  const def = data.definitionOverride || catalogDefinition;
  const object = await library.instantiate(def, { nativeExtension: data.nativeExtension });
  object.userData = { ...object.userData, id: data.id, type: data.type, gridId: data.gridId, mirror: data.mirror, colors: data.colors, paintColor: data.paintColor, nativeExtension: data.nativeExtension, nativeProperties: data.nativeProperties ? structuredClone(data.nativeProperties) : undefined, nativeAccessory: data.nativeAccessory ? structuredClone(data.nativeAccessory) : undefined, definitionOverride: data.definitionOverride ? structuredClone(data.definitionOverride) : undefined, nativeProjected: data.nativeProjected === true, hidden: data.hidden === true };
  // Do not use paintColorValue() as an existence test here: without an
  // explicit value it returns the active paint-tool colour. Imported native
  // components commonly omit `colors`, so that fallback used to reach for
  // data.colors[0] and abort the entire import.
  const initialPaint = typeof data.paintColor === 'string'
    ? paintColorValue(data.paintColor)
    : Number.isInteger(data.colors?.[0])
      ? nativePaintColor(data.colors[0])
      : null;
  if (initialPaint) applyComponentPaint(object, initialPaint);
  if (data.nativeAccessory) {
    const accessory = await library.instantiate(nativeAccessoryDefinition(data.nativeAccessory._type));
    accessory.userData.nativeAccessoryVisual = true;
    object.add(accessory);
  }
  for (const field of ['position', 'rotation', 'scale']) object[field].set(...axes.map(a => data[field][a]));
  if (data.mirror?.axis) reflectObject(object, data.mirror.axis);
  configureOpaqueDepthLayer(object, RENDER_DEPTH_LAYERS.component, { key: `component:${data.id}` });
  object.visible = !data.hidden;
  return object;
}
function applyComponentPaint(object, color) {
  const value = paintColorValue(color);
  if (!value) return false;
  object.traverse(child => {
    if (!child.isMesh) return;
    if (child.userData.source?.includes('/car_wheel')) return;
    for (const material of Array.isArray(child.material) ? child.material : [child.material]) material.color.set(value);
  });
  return true;
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
async function restore(items, nextTopology = topology, nextTransparencyGroups = transparencyGroups) {
  if (referencePreview) setReferencePreview(false);
  nextTransparencyGroups = pruneTransparencyGroups(nextTransparencyGroups, items, nextTopology);
  const candidate = validateDocument(project(items, nextTopology, nextTransparencyGroups), catalog.index);
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
    visual = buildTopologyVisual(candidate.topology, componentEntries(candidate.objects));
  } catch (error) { next.forEach(disposeObject); throw error; }
  cancelTopologyDraft();
  transform.detach(); selected = null; selectedIds.clear(); selectedTopologyIds.clear();
  objects.forEach(o => { scene.remove(o); disposeObject(o); });
  objects = next; objects.forEach(o => scene.add(o));
  topology = candidate.topology;
  transparencyGroups = candidate.visibilityGroups || [];
  replaceTopologyVisual(visual);
  refreshConnectionPorts();
  inspect(); refresh(); renderSubgridList();
}
function centerImportedVehicleGeometry() {
  // Native projection coordinates are already in the editor world space. Move
  // every projected record by the same vector so assemblies keep their rigid
  // layout while their rendered bounds are centered at the editor origin.
  scene.updateMatrixWorld(true);
  topologyLayer.updateMatrixWorld(true);
  const bounds = new THREE.Box3();
  objects.forEach(object => bounds.expandByObject(object));
  bounds.expandByObject(topologyLayer);
  if (bounds.isEmpty()) return false;
  const center = bounds.getCenter(new THREE.Vector3());
  if (center.lengthSq() <= 1e-12) return false;
  const shift = center.multiplyScalar(-1);
  objects.forEach(object => object.position.add(shift));
  const shiftedPoint = point => ({
    x: point.x + shift.x,
    y: point.y + shift.y,
    z: point.z + shift.z,
  });
  topology = {
    ...topology,
    nodes: topology.nodes.map(node => ({ ...node, position: shiftedPoint(node.position) })),
    links: (topology.links || []).map(link => ({
      ...link,
      points: (link.points || []).map(shiftedPoint),
    })),
  };
  replaceTopologyVisual(buildTopologyVisual(topology, componentEntries()));
  refreshConnectionPorts();
  inspect(); refresh(); renderSubgridList();
  return true;
}
async function place(point) {
  if (!catalog.has(selectedType)) throw new Error('请先选择组件');
  if (objects.length >= LIMIT) throw new Error('达到组件上限');
  if (mirrorMode.active && objects.length >= LIMIT - 1) throw new Error('镜像放置会超过组件上限');
  const color = paintColorValue();
  const colorIndex = nearestNativePaintIndex(color);
  const object = await createObject({ id: crypto.randomUUID(), type: selectedType, gridId: 'grid-1', ...(color ? { paintColor: color } : {}), ...(colorIndex !== null ? { colors: [colorIndex] } : {}), position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } });
  const gridPoint = quantizeWorldVector(point);
  if (!gridPoint) throw new Error('放置位置超出整数格范围');
  const box = new THREE.Box3().setFromObject(object);
  object.position.set(gridPoint.x, cellToWorld(Math.ceil((gridPoint.y - box.min.y) / CELL_SIZE_WORLD)), gridPoint.z);
  scene.add(object); objects.push(object);
  const source = snapshot().find(item => item.id === object.userData.id);
  const reflectedPosition = mirrorMode.active ? mirrorPoint(source.position, mirrorMode) : null;
  if (reflectedPosition && !sameGridPoint(source.position, reflectedPosition)) {
    if (objects.length >= LIMIT) throw new Error('镜像放置会超过组件上限');
    const mirror = await createObject({ ...source, id: crypto.randomUUID(), position: reflectedPosition, mirror: { axis: mirrorMode.axis, offset: mirrorMode.offset } });
    scene.add(mirror); objects.push(mirror);
  }
  reconcileOpaqueDepthOrder(); select(object);
  commit('放置组件'); inspect();
  status(reflectedPosition && !sameGridPoint(source.position, reflectedPosition)
    ? '已放置组件及其镜像'
    : object.userData.visual === 'mesh' ? '已放置真实静态 Mesh' : '已放置缺失资源标记');
}
async function remove(object) {
  if (!object) return;
  const items = snapshot();
  const ids = new Set(selectedIds.has(object.userData.id) ? selectedObjectIds() : [object.userData.id]);
  if (mirrorMode.active) for (const id of [...ids]) {
    const counterpart = mirroredComponentId(id, items);
    if (counterpart) ids.add(counterpart);
  }
  const removedIds = [...ids];
  const result = removeObjects(items, removedIds);
  await restore(result.objects, { ...topology, links: (topology.links || []).filter(link => !ids.has(link.from.componentId) && !ids.has(link.to.componentId)) });
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
function updateMirrorGuide() {
  mirrorGuide.visible = mirrorMode.active && !referencePreview;
  mirrorGuide.position.set(0, 0, 0);
  mirrorGuide.rotation.set(0, 0, 0);
  mirrorGuide.position[mirrorMode.axis] = mirrorMode.offset;
  if (mirrorMode.axis === 'x') mirrorGuide.rotation.y = Math.PI / 2;
  if (mirrorMode.axis === 'y') mirrorGuide.rotation.x = -Math.PI / 2;
  mirrorGuideHandle.position.set(0, 0, 0);
}
function mirroredTopologyPoint(point) {
  return mirrorPoint({ x: point.x, y: point.y, z: point.z }, mirrorMode);
}
function hasTopologyEdgeAtPoints(state, a, b) {
  const byId = new Map(state.nodes.map(node => [node.id, node.position]));
  return state.edges.some(edge => {
    const first = byId.get(edge.a); const second = byId.get(edge.b);
    return (sameGridPoint(first, a) && sameGridPoint(second, b)) || (sameGridPoint(first, b) && sameGridPoint(second, a));
  });
}
function addMirroredEdge(state, start, end) {
  if (!mirrorMode.active) return state;
  const reflectedStart = mirroredTopologyPoint(start);
  const reflectedEnd = mirroredTopologyPoint(end);
  if (sameGridPoint(reflectedStart, reflectedEnd) || hasTopologyEdgeAtPoints(state, reflectedStart, reflectedEnd)) return state;
  const source = state.edges.at(-1);
  return createEdgeFromPoints(state, reflectedStart, reflectedEnd, {
    ...(source?.color ? { color: source.color } : {}),
    ...(source?.size ? { size: source.size } : {}),
  });
}
function addMirroredPlate(state, plate) {
  if (!mirrorMode.active) return state;
  const sourceNodes = new Map(state.nodes.map(node => [node.id, node]));
  let nodes = state.nodes;
  const nodeIds = [];
  for (const id of plate.nodeIds) {
    const source = sourceNodes.get(id);
    if (!source) return state;
    const created = createNode(nodes, mirroredTopologyPoint(source.position));
    nodes = created.nodes; nodeIds.push(created.node.id);
  }
  if (new Set(nodeIds).size !== nodeIds.length) return state;
  const properties = {
    ...(plate.type ? { type: plate.type } : {}),
    ...(Number.isFinite(plate.normalOffset) ? { normalOffset: plate.normalOffset } : {}),
    ...(plate.surfaceDirection ? { surfaceDirection: mirrorSurfaceDirection(plate.surfaceDirection, mirrorMode) } : {}),
    ...(paintColorValue(plate.color_front) ? { color_front: plate.color_front } : {}),
    ...(paintColorValue(plate.color_back) ? { color_back: plate.color_back } : {}),
  };
  try {
    const result = createPlate(state.plates, [...nodeIds].reverse(), nodes, properties);
    return { ...state, nodes, plates: result.plates };
  } catch (error) {
    if (error.message !== '该闭合梁环已有面板或玻璃') throw error;
    return { ...state, nodes };
  }
}
function mirroredComponentId(componentId, items = snapshot()) {
  if (!mirrorMode.active) return null;
  const source = items.find(item => item.id === componentId);
  if (!source || source.nativeProjected) return null;
  const position = mirroredTopologyPoint(source.position);
  const match = items.find(item => item.type === source.type && item.gridId === source.gridId && sameGridPoint(item.position, position));
  return match?.id || null;
}
function mirroredNodeId(nodeId, state = topology) {
  if (!mirrorMode.active) return null;
  const node = state.nodes.find(value => value.id === nodeId);
  if (!node) return null;
  try {
    const point = mirroredTopologyPoint(node.position);
    return state.nodes.find(value => sameGridPoint(value.position, point))?.id || null;
  } catch { return null; }
}
function mirroredEdgeId(edgeId, state = topology) {
  if (!mirrorMode.active) return null;
  const edge = state.edges.find(value => value.id === edgeId);
  if (!edge) return null;
  const a = state.nodes.find(value => value.id === edge.a)?.position;
  const b = state.nodes.find(value => value.id === edge.b)?.position;
  if (!a || !b) return null;
  try {
    const reflectedA = mirroredTopologyPoint(a); const reflectedB = mirroredTopologyPoint(b);
    return state.edges.find(value => {
      const first = state.nodes.find(node => node.id === value.a)?.position;
      const second = state.nodes.find(node => node.id === value.b)?.position;
      return (sameGridPoint(first, reflectedA) && sameGridPoint(second, reflectedB))
        || (sameGridPoint(first, reflectedB) && sameGridPoint(second, reflectedA));
    })?.id || null;
  } catch { return null; }
}
function topologyPointKey(point) {
  return axes.map(axis => Number(point[axis]).toPrecision(12)).join(',');
}
function mirroredPlateId(plateId, state = topology) {
  if (!mirrorMode.active) return null;
  const plate = state.plates.find(value => value.id === plateId);
  if (!plate) return null;
  const nodes = new Map(state.nodes.map(value => [value.id, value.position]));
  try {
    const key = plate.nodeIds.map(id => nodes.get(id)).map(mirroredTopologyPoint).map(topologyPointKey).sort().join('|');
    return state.plates.find(value => value.nodeIds.length === plate.nodeIds.length
      && value.nodeIds.map(id => nodes.get(id)).map(topologyPointKey).sort().join('|') === key)?.id || null;
  } catch { return null; }
}
function mirroredLinkId(linkId, state = topology, items = snapshot()) {
  if (!mirrorMode.active) return null;
  const link = (state.links || []).find(value => value.id === linkId);
  if (!link) return null;
  const fromId = mirroredComponentId(link.from.componentId, items);
  const toId = mirroredComponentId(link.to.componentId, items);
  if (!fromId || !toId) return null;
  try {
    const points = (link.points || []).map(mirroredTopologyPoint);
    return (state.links || []).find(value => value.kind === link.kind
      && value.from.componentId === fromId && value.from.port === link.from.port
      && value.to.componentId === toId && value.to.port === link.to.port
      && (value.points || []).length === points.length
      && (value.points || []).every((point, index) => sameGridPoint(point, points[index])))?.id || null;
  } catch { return null; }
}
function addMirroredLink(links, link, items = snapshot()) {
  if (!mirrorMode.active) return links;
  const fromId = mirroredComponentId(link.from.componentId, items);
  const toId = mirroredComponentId(link.to.componentId, items);
  if (!fromId || !toId) return links;
  const points = (link.points || []).map(mirroredTopologyPoint);
  if (fromId === link.from.componentId && toId === link.to.componentId && points.every((point, index) => sameGridPoint(point, link.points[index]))) return links;
  return createLink(links, {
    kind: link.kind,
    from: { ...link.from, componentId: fromId },
    to: { ...link.to, componentId: toId },
    points,
  }, new Set(items.map(item => item.id))).links;
}
function updateMirrorToolbar() {
  const cells = worldToCell(mirrorMode.offset) ?? 0;
  mirrorToolbar.hidden = !mirrorMode.active || referencePreview;
  $('#mirror-action').classList.toggle('active', mirrorMode.active);
  $('#mirror-action').setAttribute('aria-pressed', String(mirrorMode.active));
  $('#mirror-action').dataset.i18nTitle = mirrorMode.active ? '关闭镜像模式' : '打开镜像模式';
  $('#mirror-action').dataset.i18nAriaLabel = $('#mirror-action').dataset.i18nTitle;
  for (const button of mirrorToolbar.querySelectorAll('[data-mirror-axis]')) button.classList.toggle('active', button.dataset.mirrorAxis === mirrorMode.axis);
  $('#mirror-offset-input').value = String(cells);
  $('#mirror-offset-range').value = String(Math.max(-500, Math.min(500, cells)));
  applyTranslations($('#mirror-action'));
  updateMirrorGuide();
}
function updateSubgridToolbar() {
  subgridToolbar.hidden = !subgridToolbarOpen || referencePreview;
  subgridToolbar.classList.toggle('has-primary-context', ['paint', 'connect', 'hide', 'edge'].includes(tool));
  const button = $('#subgrid-action');
  button.classList.toggle('active', subgridToolbarOpen);
  button.setAttribute('aria-pressed', String(subgridToolbarOpen));
  const label = subgridToolbarOpen ? '关闭子网格操作' : '打开子网格操作';
  button.dataset.i18nTitle = label;
  button.dataset.i18nAriaLabel = label;
  applyTranslations(button);
}
function setMirrorOffsetCells(value) {
  const cells = Number(value);
  if (!Number.isSafeInteger(cells) || Math.abs(cells) > 125000) return;
  mirrorMode = { ...mirrorMode, offset: cellToWorld(cells) };
  updateMirrorToolbar();
}
function structuralMirror() {
  if (busy) return;
  mirrorMode = { ...mirrorMode, active: !mirrorMode.active };
  updateMirrorToolbar();
  status(mirrorMode.active ? '镜像模式已开启：后续建造将在镜像平面另一侧同步创建' : '镜像模式已关闭');
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
$('#subgrid-action').onclick = () => {
  if (busy) return;
  subgridToolbarOpen = !subgridToolbarOpen;
  updateSubgridToolbar();
};
$('#subgrid-split-action').onclick = structuralSplit;
$('#subgrid-merge-action').onclick = structuralMerge;
updateSubgridToolbar();
for (const button of mirrorToolbar.querySelectorAll('[data-mirror-axis]')) {
  button.addEventListener('click', () => {
    mirrorMode = { ...mirrorMode, axis: button.dataset.mirrorAxis };
    updateMirrorToolbar();
  });
}
$('#mirror-offset-range').addEventListener('input', event => setMirrorOffsetCells(event.target.value));
$('#mirror-offset-input').addEventListener('change', event => setMirrorOffsetCells(event.target.value));
function moveMirrorGuideFromRay() {
  const nearest = raycaster.ray.closestPointToPoint(mirrorGuide.position, new THREE.Vector3());
  const cells = Math.round(nearest[mirrorMode.axis] / CELL_SIZE_WORLD);
  setMirrorOffsetCells(cells);
}
restoreTransparencyButton.onclick = () => {
  if (!busy) void transact(restoreTransparency);
};
function undo() {
  cancelTopologyDraft();
  const value = history.peekUndo();
  if (!value) return;
  transact(async () => {
    await restore(value.objects, value.topology, value.visibilityGroups || []);
    history.cursor--;
    status('已撤销');
  });
}
function redo() {
  const value = history.peekRedo();
  if (!value) return;
  transact(async () => {
    await restore(value.objects, value.topology, value.visibilityGroups || []);
    history.cursor++;
    status('已重做');
  });
}
function restoreHistory(index) {
  if (busy || !Number.isInteger(index) || index < 0 || index >= history.entries.length || index === history.cursor) return;
  const value = structuredClone(history.entries[index]);
  transact(async () => {
    await restore(value.objects, value.topology, value.visibilityGroups || []);
    history.cursor = index;
    status('已恢复历史记录');
  });
}

function inspect() {
  const host = $('#inspector-content'); host.replaceChildren();
  if (selectedTopologyIds.size) {
    const selectedTopology = selectedTopologyObjects();
    const summary = document.createElement('strong'); summary.textContent = t('已选择 {count} 个结构对象', { count: selectedTopology.length }); host.append(summary);
    const kinds = selectedTopology.map(object => object.userData.topology === 'edge' ? t('梁') : object.userData.topology === 'link' ? t('连接') : t('面板'));
    const hint = document.createElement('p'); hint.className = 'status'; hint.textContent = t('Shift 点击可同时选择梁和面板。结构编辑命令尚不支持批量变换。'); host.append(hint);
    const selectedKinds = document.createElement('p'); selectedKinds.className = 'status'; selectedKinds.textContent = kinds.join(' · '); host.append(selectedKinds);
    return;
  }
  if (!selected) { host.textContent = t('选择组件查看属性。按住 Shift 点击可多选。'); return; }
  if (selectedIds.size > 1) {
    const summary = document.createElement('strong'); summary.textContent = t('已选择 {count} 个组件', { count: selectedIds.size }); host.append(summary);
    const hint = document.createElement('p'); hint.className = 'status'; hint.textContent = t('可批量复制、镜像、拆分或删除。批量变换和框选尚未实现。'); host.append(hint);
    const button = document.createElement('button'); button.className = 'full'; button.textContent = t('删除已选组件'); button.id = 'delete-selected';
    button.onclick = () => transact(async () => { await remove(selected); }); host.append(button);
    return;
  }
  const object = selected;
  const def = object.userData.definitionOverride || definitions.get(object.userData.type);
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
      const input = document.createElement('input'); input.type = 'number'; input.step = field === 'position' ? (object.userData.nativeProjected ? '.001' : '1') : field === 'rotation' ? '90' : '.01';
      input.dataset.field = field; input.dataset.axis = axis; input.setAttribute('aria-label', field + '-' + axis);
      const displayed = field === 'position'
        ? object.userData.nativeProjected ? object.position[axis] / CELL_SIZE_WORLD : worldToCell(object.position[axis])
        : field === 'rotation' ? THREE.MathUtils.radToDeg(object[field][axis]) : object[field][axis];
      input.value = field === 'position' ? String(displayed) : Number(displayed).toFixed(4);
      input.addEventListener('change', () => {
        const value = Number(input.value);
        const invalid = busy || !input.value.trim() || !Number.isFinite(value) || Math.abs(value) > 10000 || (field === 'position' && !object.userData.nativeProjected && !Number.isInteger(value)) || (field === 'scale' && (value <= 0 || value > 100));
        if (invalid) { status('输入超出合法范围'); inspect(); return; }
        object[field][axis] = field === 'position' ? cellToWorld(value) : field === 'rotation' ? THREE.MathUtils.degToRad(value) : value;
        commit(); inspect();
      });
      label.append(input); group.append(label);
    }
    row.append(group); host.append(row);
  }
  renderComponentExtension(host, object, def);
  renderComponentProperties(host, object);
  renderNativeAccessoryProperty(host, object);
  renderDefinitionEditor(host, object, def);
  const button = document.createElement('button'); button.className = 'full'; button.textContent = t('删除组件'); button.id = 'delete-selected'; button.onclick = () => transact(async () => { await remove(object); }); host.append(button);
}

function renderComponentExtension(host, object, definition) {
  const descriptors = extensionAxes(definition);
  if (!descriptors.length) return;
  const extension = extensionVector(definition, object.userData.nativeExtension);
  const section = document.createElement('section'); section.className = 'component-properties component-extension';
  const heading = document.createElement('h3'); heading.textContent = getLocale() === 'zh' ? '线性尺寸' : 'Linear size'; section.append(heading);
  const hint = document.createElement('p'); hint.className = 'status';
  hint.textContent = getLocale() === 'zh'
    ? '使用视口中的箭头或下方数值按格拉伸。该尺寸会写入原生 ext，而不是普通缩放。'
    : 'Use the viewport arrows or values below to extend by cells. This writes native ext, not transform scale.';
  section.append(hint);
  for (const descriptor of descriptors) {
    const row = document.createElement('div'); row.className = 'property component-property';
    const label = document.createElement('label');
    const mode = descriptor.mode === 'tile'
      ? (getLocale() === 'zh' ? '平铺' : 'Tiled')
      : (getLocale() === 'zh' ? '拉伸' : 'Stretched');
    label.textContent = `${descriptor.axis.toUpperCase()} · ${mode}`;
    const input = document.createElement('input'); input.type = 'number'; input.min = '0'; input.max = String(descriptor.max); input.step = String(descriptor.interval);
    input.value = String(extension[descriptor.index]); input.setAttribute('aria-label', `${getLocale() === 'zh' ? '线性尺寸' : 'Linear size'} ${descriptor.axis.toUpperCase()}`);
    input.addEventListener('change', () => {
      const value = Number(input.value);
      if (busy || !Number.isFinite(value)) { inspect(); return; }
      const nextExtension = updateExtension(definition, object.userData.nativeExtension, descriptor.axis, value);
      if (nextExtension.every((item, index) => item === extension[index])) { inspect(); return; }
      const id = object.userData.id;
      void transact(async () => {
        const items = snapshot().map(item => item.id === id ? { ...item, nativeExtension: nextExtension } : item);
        await restore(items, topology, transparencyGroups);
        selected = objects.find(item => item.userData.id === id) || null;
        selectedIds = selected ? new Set([id]) : new Set();
        commit('更新组件线性尺寸'); inspect();
      });
    });
    row.append(label, input); section.append(row);
  }
  host.append(section);
}

function renderDefinitionEditor(host, object, definition) {
  const details = document.createElement('details'); details.className = 'definition-editor';
  const summary = document.createElement('summary'); summary.textContent = t('原始定义 JSON'); details.append(summary);
  const hint = document.createElement('p'); hint.className = 'status'; hint.textContent = t('定义 JSON 编辑说明'); details.append(hint);
  const editor = document.createElement('textarea'); editor.className = 'definition-json'; editor.spellcheck = false;
  editor.value = JSON.stringify(definition, null, 2); editor.setAttribute('aria-label', t('原始定义 JSON')); details.append(editor);
  const actions = document.createElement('div'); actions.className = 'definition-editor-actions';
  const apply = document.createElement('button'); apply.type = 'button'; apply.textContent = t('应用定义 JSON');
  apply.onclick = () => { void transact(() => applyDefinitionOverride(object.userData.id, editor.value)); };
  const reset = document.createElement('button'); reset.type = 'button'; reset.textContent = t('重置为目录定义'); reset.disabled = !object.userData.definitionOverride;
  reset.onclick = () => { void transact(() => resetDefinitionOverride(object.userData.id)); };
  actions.append(apply, reset); details.append(actions); host.append(details);
}

async function applyDefinitionOverride(id, source) {
  let definition;
  try { definition = JSON.parse(source); }
  catch (error) { throw new Error(t('原始定义 JSON 无效：{error}', { error: error.message })); }
  const items = snapshot().map(item => item.id === id ? { ...item, definitionOverride: definition } : item);
  const candidate = validateDocument(project(items, topology, transparencyGroups), catalog.index);
  await restore(candidate.objects, candidate.topology, candidate.visibilityGroups || []);
  const restored = objects.find(object => object.userData.id === id);
  select(restored || null);
  commit('已应用原始定义 JSON');
  status('已应用原始定义 JSON');
}

async function resetDefinitionOverride(id) {
  const items = snapshot().map(item => {
    if (item.id !== id) return item;
    const { definitionOverride, ...restored } = item;
    return restored;
  });
  await restore(items, topology, transparencyGroups);
  const restored = objects.find(object => object.userData.id === id);
  select(restored || null);
  commit('已重置为目录定义');
  status('已重置为目录定义');
}

function componentPropertyLabel(key) {
  const labels = {
    audio_radius: ['音频范围', 'Audio radius'], sound_effect: ['音效', 'Sound effect'], fov: ['视野角度', 'FOV'],
    sensitivity_steering: ['转向灵敏度', 'Steering sensitivity'], sensitivity_pedal_l: ['左踏板灵敏度', 'Left pedal sensitivity'], sensitivity_pedal_r: ['右踏板灵敏度', 'Right pedal sensitivity'], light_activation: ['照明', 'Illuminated'],
    sensitivity_yaw: ['偏航灵敏度', 'Yaw sensitivity'], sensitivity_pitch: ['俯仰灵敏度', 'Pitch sensitivity'], sensitivity_roll: ['滚转灵敏度', 'Roll sensitivity'], seat_pose: ['座椅姿态', 'Seat pose'], sticky: ['保持位置', 'Sticky'], stiffness: ['刚度', 'Stiffness'], damping: ['阻尼', 'Damping'],
    traverse_limit_left: ['左水平限位（弧度）', 'Left traverse limit (radians)'], traverse_limit_right: ['右水平限位（弧度）', 'Right traverse limit (radians)'], elevation_limit_down: ['下俯仰限位（弧度）', 'Down elevation limit (radians)'], elevation_limit_up: ['上俯仰限位（弧度）', 'Up elevation limit (radians)'],
    user_defined_alias: ['自定义别名', 'Custom alias'], gear_count: ['档位数', 'Gear count'], count: ['档位数量', 'Position count'],
    offset: ['偏移', 'Offset'], scale: ['缩放', 'Scale'], min: ['最小角度（弧度）', 'Minimum angle (radians)'], max: ['最大角度（弧度）', 'Maximum angle (radians)'],
    tilt_x: ['水平倾角（弧度）', 'Horizontal tilt (radians)'], tilt_y: ['垂直倾角（弧度）', 'Vertical tilt (radians)'],
    input: ['输入', 'Input'], output: ['输出', 'Output'], input_ratio: ['输入齿比', 'Input ratio'], output_ratio: ['输出齿比', 'Output ratio'], gear_ratio: ['齿比', 'Gear ratio'], reverse: ['反转方向', 'Reverse direction'],
    flow_factor: ['流量系数', 'Flow factor'], power: ['功率系数', 'Power factor'], range: ['范围', 'Range'],
  };
  return labels[key] ? labels[key][getLocale() === 'zh' ? 0 : 1] : key.replaceAll('_', ' ').replace(/\b\w/g, letter => letter.toUpperCase());
}

function renderComponentProperties(host, object) {
  const properties = object.userData.nativeProperties || {};
  const descriptors = componentPropertyDescriptors(object.userData.type, properties, object.userData.nativeExtension);
  if (!descriptors.length) return;
  const section = document.createElement('section'); section.className = 'component-properties';
  const heading = document.createElement('h3'); heading.textContent = getLocale() === 'zh' ? '组件属性' : 'Component properties'; section.append(heading);
  const hint = document.createElement('p'); hint.className = 'status'; hint.textContent = getLocale() === 'zh' ? '这些字段来自游戏属性工具的已知规则或已导入载具的原生状态；复杂运行状态仅供查看。' : 'Known Properties Tool fields and imported native state are shown here; complex runtime state is read-only.'; section.append(hint);
  for (const descriptor of descriptors) {
    const row = document.createElement('div'); row.className = 'property component-property';
    const label = document.createElement('label'); label.textContent = componentPropertyLabel(descriptor.label || descriptor.key); row.append(label);
    const current = Object.hasOwn(properties, descriptor.key) ? properties[descriptor.key] : descriptor.defaultValue;
    if (descriptor.type === 'readonly') {
      const value = document.createElement('code'); value.textContent = JSON.stringify(current); row.append(value); section.append(row); continue;
    }
    const apply = value => {
      if (busy) return;
      try {
        object.userData.nativeProperties = updateNativeProperty(object.userData.nativeProperties, descriptor, value);
        commit('编辑组件属性'); inspect();
      } catch (error) { status(getLocale() === 'zh' ? '组件属性无效：{error}' : 'Component property is invalid: {error}', { error: error.message }); inspect(); }
    };
    let input;
    if (descriptor.type === 'boolean') {
      input = document.createElement('input'); input.type = 'checkbox'; input.checked = current === true;
      input.setAttribute('aria-label', componentPropertyLabel(descriptor.label || descriptor.key)); input.addEventListener('change', () => apply(input.checked));
    } else if (descriptor.type === 'string') {
      input = descriptor.key === 'script' ? document.createElement('textarea') : document.createElement('input');
      if (input.tagName === 'INPUT') input.type = 'text';
      input.value = typeof current === 'string' ? current : '';
      if (descriptor.maxLength) input.maxLength = descriptor.maxLength;
      input.setAttribute('aria-label', componentPropertyLabel(descriptor.label || descriptor.key)); input.addEventListener('change', () => apply(input.value));
    } else {
      input = document.createElement('input'); input.type = 'number'; input.step = String(descriptor.step ?? (descriptor.type === 'integer' ? 1 : .01));
      if (Number.isFinite(descriptor.min)) input.min = String(descriptor.min);
      if (Number.isFinite(descriptor.max)) input.max = String(descriptor.max);
      input.value = Number.isFinite(current) ? String(current) : '';
      input.setAttribute('aria-label', componentPropertyLabel(descriptor.label || descriptor.key));
      input.addEventListener('change', () => apply(Number(input.value)));
    }
    row.append(input); section.append(row);
  }
  host.append(section);
}

function nextNativeAccessoryItemId() {
  const largest = objects.reduce((max, item) => {
    const id = item.userData.nativeAccessory?.id;
    return Number.isInteger(id) && id > max ? id : max;
  }, 0);
  return largest + 1;
}

function renderNativeAccessoryProperty(host, object) {
  const itemTypes = accessoryOptionsForComponent(object.userData.type);
  if (!itemTypes.length) return;
  const section = document.createElement('section'); section.className = 'component-properties native-accessory-property';
  const heading = document.createElement('h3'); heading.textContent = getLocale() === 'zh' ? '已安装轮胎' : 'Installed tyre'; section.append(heading);
  const hint = document.createElement('p'); hint.className = 'status';
  hint.textContent = getLocale() === 'zh'
    ? '轮胎保存在游戏 wheel 记录的 element.acc.item 中，并非独立组件。'
    : 'The tyre is stored in the game wheel record at element.acc.item, not as an independent component.';
  section.append(hint);
  const row = document.createElement('div'); row.className = 'property component-property';
  const label = document.createElement('label'); label.textContent = getLocale() === 'zh' ? '轮胎' : 'Tyre';
  const input = document.createElement('select'); input.setAttribute('aria-label', label.textContent);
  const none = document.createElement('option'); none.value = ''; none.textContent = getLocale() === 'zh' ? '未安装' : 'Not installed'; input.append(none);
  for (const itemType of itemTypes) {
    const option = document.createElement('option'); option.value = itemType;
    option.textContent = componentName(nativeAccessoryDefinition(itemType)); input.append(option);
  }
  const currentType = object.userData.nativeAccessory?._type || '';
  if (![...input.options].some(option => option.value === currentType) && currentType) {
    const option = document.createElement('option'); option.value = currentType;
    option.textContent = currentType; input.append(option);
  }
  input.value = currentType;
  input.addEventListener('change', () => {
    if (busy) return;
    const itemType = input.value;
    void transact(async () => {
      const items = snapshot().map(item => {
        if (item.id !== object.userData.id) return item;
        if (!itemType) {
          const { nativeAccessory, ...withoutAccessory } = item;
          return withoutAccessory;
        }
        const existing = item.nativeAccessory;
        return {
          ...item,
          nativeAccessory: existing?._type === itemType
            ? existing
            : createNativeAccessoryItem(itemType, nextNativeAccessoryItemId()),
        };
      });
      await restore(items, topology, transparencyGroups);
      select(objects.find(item => item.userData.id === object.userData.id) || null);
      commit(getLocale() === 'zh' ? '更新轮胎' : 'Updated tyre');
    });
  });
  row.append(label, input); section.append(row); host.append(section);
}

function renderCatalog() {
  hideComponentIdTooltip();
  hideComponentModelPreview();
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
    button.append(createCategoryIcon(def.category), text);
    button.addEventListener('mouseenter', () => { showComponentIdTooltip(button); showComponentModelPreview(button); });
    button.addEventListener('mouseleave', () => { hideComponentIdTooltip(); hideComponentModelPreview(); });
    button.addEventListener('focus', () => { showComponentIdTooltip(button); showComponentModelPreview(button); });
    button.addEventListener('blur', () => { hideComponentIdTooltip(); hideComponentModelPreview(); });
    button.onclick = () => { if (busy) return; selectedType = def.id; setTool('place'); renderCatalog(); status('准备放置：{name}', () => ({ name: componentName(def) })); };
    host.append(button);
  }
  observeModelThumbnails(host);
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
function ensureThumbnailScene() {
  if (thumbnailScene) return;
  thumbnailScene = new THREE.Scene();
  thumbnailScene.add(new THREE.HemisphereLight(0xd7e9ff, 0x344054, 1.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(2, 3, 4); thumbnailScene.add(key);
  thumbnailCamera = new THREE.PerspectiveCamera(32, 1, .001, 100);
  thumbnailTarget = new THREE.WebGLRenderTarget(96, 96, { depthBuffer: true, stencilBuffer: false });
  thumbnailLargeTarget = new THREE.WebGLRenderTarget(256, 256, { depthBuffer: true, stencilBuffer: false });
}
async function renderModelThumbnail(definition, resolution = 96) {
  const object = await library.instantiate(definition);
  if (object.userData.visual !== 'mesh') { disposeObject(object); return null; }
  ensureThumbnailScene();
  thumbnailScene.add(object);
  try {
    object.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(object);
    if (bounds.isEmpty()) return null;
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const radius = Math.max(.001, size.length() / 2);
    const distance = Math.max(.12, radius / Math.tan(THREE.MathUtils.degToRad(thumbnailCamera.fov / 2)) * 1.35);
    thumbnailCamera.position.copy(center).add(new THREE.Vector3(1, .78, 1).normalize().multiplyScalar(distance));
    thumbnailCamera.near = Math.max(.001, distance - radius * 3);
    thumbnailCamera.far = Math.max(10, distance + radius * 3);
    thumbnailCamera.lookAt(center); thumbnailCamera.updateProjectionMatrix();
    const target = resolution === 256 ? thumbnailLargeTarget : thumbnailTarget;
    const previousTarget = renderer.getRenderTarget();
    const previousAutoClear = renderer.autoClear;
    const previousClearColor = renderer.getClearColor(new THREE.Color());
    const previousClearAlpha = renderer.getClearAlpha();
    let pixels;
    try {
      renderer.autoClear = true;
      renderer.setClearColor(0x000000, 0);
      renderer.setRenderTarget(target);
      renderer.clear(true, true, true);
      renderer.render(thumbnailScene, thumbnailCamera);
      pixels = new Uint8Array(resolution * resolution * 4);
      renderer.readRenderTargetPixels(target, 0, 0, resolution, resolution, pixels);
    } finally {
      renderer.setRenderTarget(previousTarget);
      renderer.setClearColor(previousClearColor, previousClearAlpha);
      renderer.autoClear = previousAutoClear;
    }
    const canvas = document.createElement('canvas'); canvas.width = resolution; canvas.height = resolution;
    const context = canvas.getContext('2d');
    const image = context.createImageData(resolution, resolution);
    for (let row = 0; row < resolution; row++) {
      const sourceStart = (resolution - 1 - row) * resolution * 4;
      image.data.set(pixels.subarray(sourceStart, sourceStart + resolution * 4), row * resolution * 4);
    }
    context.putImageData(image, 0, 0);
    return canvas.toDataURL('image/png');
  } finally {
    thumbnailScene.remove(object);
    disposeObject(object);
  }
}
function applyModelThumbnail(card, dataUrl) {
  if (!card.isConnected || !dataUrl) return;
  const icon = card.querySelector('.category-icon');
  if (!icon) return;
  const image = document.createElement('img');
  image.className = 'component-thumbnail'; image.src = dataUrl; image.alt = ''; image.setAttribute('aria-hidden', 'true');
  icon.replaceWith(image);
}
function requestModelThumbnail(definition, card) {
  if (!definition) return;
  const id = definition.id;
  if (thumbnailCache.has(id)) { applyModelThumbnail(card, thumbnailCache.get(id)); return; }
  let request = thumbnailRequests.get(id);
  if (!request) {
    request = (async () => {
      try {
        const detail = await catalog.definition(id);
        definitions.set(id, detail);
        return await renderModelThumbnail(detail);
      } catch { return null; }
    })();
    thumbnailRequests.set(id, request);
    request.then(value => thumbnailCache.set(id, value)).finally(() => thumbnailRequests.delete(id));
  }
  request.then(value => applyModelThumbnail(card, value));
}
function observeModelThumbnails(host) {
  thumbnailObserver?.disconnect(); thumbnailObserver = null;
  if (!settings.modelThumbnails) return;
  const cards = [...host.querySelectorAll('.component')];
  if (!('IntersectionObserver' in window)) { cards.forEach(card => requestModelThumbnail(catalog.index.get(card.dataset.id), card)); return; }
  thumbnailObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const card = entry.target;
      requestModelThumbnail(catalog.index.get(card.dataset.id), card);
      thumbnailObserver.unobserve(card);
    }
  }, { root: host, rootMargin: '180px' });
  cards.forEach(card => thumbnailObserver.observe(card));
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
  return resolvePlacementPoint(raycaster, targets, plane, {
    adjacentTargets: objects.filter(object => object.visible),
    adjacentPadding: CELL_SIZE_WORLD / 2,
  });
}
function pick() {
  if (!selectableKinds.component) return null;
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
function pickTopologyNode(includeHidden = false, maxPixels = 22) {
  if (!selectableKinds.node && !includeHidden) return null;
  if ((!showNodes || !topologyHelpersVisible) && !includeHidden) return null;
  const rect = renderer.domElement.getBoundingClientRect();
  let result = null; let best = maxPixels; let nearest = Infinity;
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
  const surface = pickTopologySurface();
  if (surface) return surface;
  if (!selectableKinds.link) return null;
  const hit = raycaster.intersectObjects(topologyLayer.children.filter(object => object.visible && object.userData.topology === 'link'), true)[0];
  if (!hit) return null;
  let object = hit.object;
  while (object && object.parent !== topologyLayer) object = object.parent;
  return object?.userData.topology === 'link' ? { kind: 'link', id: object.userData.linkId, point: hit.point, object } : null;
}
function pickTopologySurface() {
  const allowed = ['edge', 'plate'].filter(kind => selectableKinds[kind]);
  if (!allowed.length) return null;
  const hits = raycaster.intersectObjects(topologyLayer.children.filter(object => object.visible && allowed.includes(object.userData.topology)), true);
  // At a perimeter, a plate can be a fraction closer than its supporting
  // edge. Prefer the edge there so both structure kinds remain selectable.
  const hit = hits.find(value => value.object.userData.topology === 'edge') || hits[0];
  const expandedEdge = pickEdgeByScreenTolerance();
  if (expandedEdge) return expandedEdge;
  if (!hit) {
    const rect = renderer.domElement.getBoundingClientRect();
    const project = value => value.clone().project(camera);
    const distanceToSegment = (point, a, b) => {
      const ax = (a.x + 1) * rect.width / 2; const ay = (1 - a.y) * rect.height / 2;
      const bx = (b.x + 1) * rect.width / 2; const by = (1 - b.y) * rect.height / 2;
      const px = (point.x + 1) * rect.width / 2; const py = (1 - point.y) * rect.height / 2;
      const dx = bx - ax; const dy = by - ay; const lengthSq = dx * dx + dy * dy;
      const t = lengthSq ? Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / lengthSq)) : 0;
      return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
    };
    let nearest = null;
    const edgeThreshold = 18;
    for (const edge of selectableKinds.edge ? topology.edges : []) {
      if (edge.hidden) continue;
      const a = topology.nodes.find(node => node.id === edge.a)?.position;
      const b = topology.nodes.find(node => node.id === edge.b)?.position;
      if (!a || !b) continue;
      const distance = distanceToSegment(pointer, project(new THREE.Vector3(a.x, a.y, a.z)), project(new THREE.Vector3(b.x, b.y, b.z)));
      if (distance <= edgeThreshold && (!nearest || distance < nearest.distance)) nearest = { kind: 'edge', id: edge.id, object: topologyObject('edge', edge.id), distance };
    }
    if (nearest) return nearest;
    if (selectableKinds.plate) {
      const positions = new Map(topology.nodes.map(node => [node.id, new THREE.Vector3(node.position.x, node.position.y, node.position.z)]));
      for (const plate of topology.plates) {
        if (plate.hidden) continue;
        const boundary = plateSurfaceBoundary(plate.nodeIds, positions, {
          normalOffset: plate.normalOffset ?? CELL_SIZE_WORLD / 2,
          surfaceDirection: plate.surfaceDirection,
        }).map(project);
        if (boundary.length < 3) continue;
        let inside = false;
        for (let i = 0, j = boundary.length - 1; i < boundary.length; j = i++) {
          const xi = (boundary[i].x + 1) * rect.width / 2; const yi = (1 - boundary[i].y) * rect.height / 2;
          const xj = (boundary[j].x + 1) * rect.width / 2; const yj = (1 - boundary[j].y) * rect.height / 2;
          const px = (pointer.x + 1) * rect.width / 2; const py = (1 - pointer.y) * rect.height / 2;
          if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / ((yj - yi) || 1e-9) + xi) inside = !inside;
        }
        if (inside) return { kind: 'plate', id: plate.id, object: topologyObject('plate', plate.id) };
      }
    }
    return null;
  }
  let object = hit.object;
  while (object && object.parent !== topologyLayer) object = object.parent;
  const kind = object?.userData.topology;
  if (!['edge', 'plate'].includes(kind)) return null;
  return { kind, id: object.userData[`${kind}Id`], point: hit.point, object };
}
function pickSelectionTarget() {
  const roots = [
    ...(selectableKinds.component ? objects.filter(object => object.visible) : []),
    ...topologyLayer.children.filter(object => object.visible && selectableKinds[object.userData.topology]),
  ];
  if (!roots.length) return null;
  const hits = raycaster.intersectObjects(roots, true);
  const seen = new Set();
  for (const hit of hits) {
    let component = hit.object;
    while (component && !objects.includes(component)) component = component.parent;
    if (component && selectableKinds.component) {
      const key = `component:${component.userData.id}`;
      if (!seen.has(key)) return { kind: 'component', id: component.userData.id, point: hit.point, object: component, distance: hit.distance };
      seen.add(key);
      continue;
    }
    let topologyObject = hit.object;
    while (topologyObject && topologyObject.parent !== topologyLayer) topologyObject = topologyObject.parent;
    const kind = topologyObject?.userData.topology;
    if (!kind || !selectableKinds[kind]) continue;
    const id = topologyObject.userData[`${kind}Id`];
    if (!id) continue;
    const key = `${kind}:${id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    return { kind, id, point: hit.point, object: topologyObject, distance: hit.distance };
  }
  // Keep the existing placement-anchor affordance only when the ray missed
  // every selectable piece of geometry. A real hit above must always win so
  // a beam or plate cannot steal selection from a closer component, nor can
  // an anchor select a component through any visible topology.
  const component = pick();
  return component ? {
    kind: 'component',
    id: component.userData.id,
    object: component,
    point: null,
    distance: Infinity,
  } : null;
}
function pickSelectable() {
  return pickSelectionTarget()?.object || null;
}
function pickInteractionHover() {
  if (tool === 'hide') return pickPaintTarget()?.object || null;
  if (tool === 'translate') {
    const linkPoint = pickLinkPoint();
    if (linkPoint) return topologyObject('link', linkPoint.linkId) || linkPointMoveMarker;
    const nodeId = pickTopologyNode();
    if (nodeId) return topologyObject('node', nodeId);
    // A beam itself is not movable. When its body is hovered, expose the
    // endpoint nodes instead so the move operation remains discoverable.
    const edge = pickEdgeByScreenTolerance(24);
    if (edge) return edge.object;
  }
  return pickSelectable();
}
function pickTopologyLink() {
  if (!selectableKinds.link) return null;
  const hit = raycaster.intersectObjects(topologyLayer.children.filter(object => object.visible && object.userData.topology === 'link'), true)[0];
  if (!hit) return null;
  let object = hit.object;
  while (object && object.parent !== topologyLayer) object = object.parent;
  return object?.userData.topology === 'link' ? { kind: 'link', id: object.userData.linkId, object, point: hit.point } : null;
}
function pickLinkPoint() {
  if (!selectableKinds.link) return null;
  const rect = renderer.domElement.getBoundingClientRect();
  let nearest = null; let distance = 18;
  for (const link of topology.links || []) {
    for (let pointIndex = 0; pointIndex < (link.points || []).length; pointIndex++) {
      const point = link.points[pointIndex];
      const projected = new THREE.Vector3(point.x, point.y, point.z).project(camera);
      const pixels = Math.hypot((projected.x - pointer.x) * rect.width / 2, (projected.y - pointer.y) * rect.height / 2);
      if (pixels < distance) { distance = pixels; nearest = { linkId: link.id, pointIndex }; }
    }
  }
  return nearest;
}
function pickEdgeByScreenTolerance(maxPixels = 18) {
  if (!selectableKinds.edge) return null;
  const rect = renderer.domElement.getBoundingClientRect();
  const toScreen = value => {
    const projected = value.clone().project(camera);
    return { x: (projected.x + 1) * rect.width / 2, y: (1 - projected.y) * rect.height / 2 };
  };
  const pointerScreen = { x: (pointer.x + 1) * rect.width / 2, y: (1 - pointer.y) * rect.height / 2 };
  let nearest = null;
  for (const edge of topology.edges) {
    if (edge.hidden) continue;
    const a = topology.nodes.find(node => node.id === edge.a)?.position;
    const b = topology.nodes.find(node => node.id === edge.b)?.position;
    if (!a || !b) continue;
    const start = toScreen(new THREE.Vector3(a.x, a.y, a.z)); const end = toScreen(new THREE.Vector3(b.x, b.y, b.z));
    const dx = end.x - start.x; const dy = end.y - start.y; const lengthSq = dx * dx + dy * dy;
    const factor = lengthSq ? Math.max(0, Math.min(1, ((pointerScreen.x - start.x) * dx + (pointerScreen.y - start.y) * dy) / lengthSq)) : 0;
    const distance = Math.hypot(pointerScreen.x - start.x - factor * dx, pointerScreen.y - start.y - factor * dy);
    if (distance <= maxPixels && (!nearest || distance < nearest.distance)) nearest = { kind: 'edge', id: edge.id, object: topologyObject('edge', edge.id), distance };
  }
  return nearest;
}
function nearestEdgeEndpoint(edgeId) {
  if (!selectableKinds.node) return null;
  const edge = topology.edges.find(value => value.id === edgeId);
  if (!edge) return null;
  const rect = renderer.domElement.getBoundingClientRect();
  let result = null;
  for (const nodeId of [edge.a, edge.b]) {
    const node = topology.nodes.find(value => value.id === nodeId);
    if (!node) continue;
    const projected = new THREE.Vector3(node.position.x, node.position.y, node.position.z).project(camera);
    const distance = Math.hypot((projected.x - pointer.x) * rect.width / 2, (projected.y - pointer.y) * rect.height / 2);
    if (!result || distance < result.distance) result = { nodeId, distance };
  }
  return result?.nodeId || null;
}
function pickPaintTopology() {
  const allowed = ['edge', 'plate'].filter(kind => selectableKinds[kind]);
  const hits = raycaster.intersectObjects(topologyLayer.children.filter(object => object.visible && allowed.includes(object.userData.topology)), true);
  const targets = new Map();
  for (const hit of hits) {
    let object = hit.object;
    while (object && object.parent !== topologyLayer) object = object.parent;
    const kind = object?.userData.topology;
    if (!['edge', 'plate'].includes(kind)) continue;
    const id = object.userData[`${kind}Id`];
    const key = `${kind}:${id}`;
    if (targets.has(key)) continue;
    // The first ray hit is the visible surface. Its geometric winding tells
    // which persisted plate colour slot faces the player, independent of the
    // panel's creation camera or the old paint-side setting.
    const plateSide = kind === 'plate' ? rayFacingPlateSide(hit.face?.normal, hit.object.matrixWorld, raycaster.ray.direction) : undefined;
    targets.set(key, { kind, id, object, plateSide });
  }
  // Painting has an intentional semantic order, independent of ray distance:
  // panels cover their supporting beams, and both cover ordinary components.
  for (const kind of ['plate', 'edge']) {
    if (!selectableKinds[kind]) continue;
    const target = [...targets.values()].find(candidate => candidate.kind === kind);
    if (target) return target;
  }
  // The visible edge profile is deliberately narrow. Retain a reliable
  // centre-line picking fallback for construction tools when a ray falls
  // between facets of the octagonal visual mesh at a distance.
  let nearest = null;
  for (const edge of topology.edges) {
    if (edge.hidden) continue;
    const a = topology.nodes.find(node => node.id === edge.a)?.position;
    const b = topology.nodes.find(node => node.id === edge.b)?.position;
    if (!a || !b) continue;
    const distanceSq = raycaster.ray.distanceSqToSegment(new THREE.Vector3(a.x, a.y, a.z), new THREE.Vector3(b.x, b.y, b.z));
    const tolerance = Math.max(CELL_SIZE_WORLD * 1.5, camera.position.distanceTo(new THREE.Vector3(a.x, a.y, a.z)) * .012);
    if (distanceSq > tolerance ** 2 || (nearest && distanceSq >= nearest.distanceSq)) continue;
    nearest = { kind: 'edge', id: edge.id, object: topologyObject('edge', edge.id), distanceSq };
  }
  return nearest && { kind: nearest.kind, id: nearest.id, object: nearest.object };
}
function pickPaintTarget() {
  const topologyTarget = pickPaintTopology();
  if (topologyTarget) return topologyTarget;
  const object = pick();
  return object ? { kind: 'component', id: object.userData.id, object } : null;
}
function pickedPaintColor(target) {
  if (target.kind === 'component') {
    return paintColorValue(target.object.userData.paintColor)
      || (Number.isInteger(target.object.userData.colors?.[0]) ? nativePaintColor(target.object.userData.colors[0]) : null);
  }
  if (target.kind === 'edge') {
    const edge = topology.edges.find(value => value.id === target.id);
    if (!edge) return null;
    return paintColorValue(edge.color) || (Number.isInteger(edge.col) ? nativePaintColor(edge.col) : null);
  }
  const plate = topology.plates.find(value => value.id === target.id);
  if (!plate) return null;
  const suffix = target.plateSide === 'back' ? 'back' : 'front';
  return paintColorValue(plate[`color_${suffix}`]) || (Number.isInteger(plate[`col_${suffix}`]) ? nativePaintColor(plate[`col_${suffix}`]) : null);
}
function pickPaintColor() {
  const target = pickPaintTarget();
  const color = target && pickedPaintColor(target);
  if (!color) {
    status('取色工具需要点击已有颜色的组件、梁或面板');
    return;
  }
  setPaintColor(color);
  setPaintColorPicking(false);
  status('已取色 {color}', { color });
}
function setComponentPaintColor(object, color, colorIndex) {
  const currentSlots = object.userData.colors;
  object.userData.colors = Array.isArray(currentSlots) && currentSlots.length
    ? currentSlots.map(() => colorIndex)
    : [colorIndex];
  object.userData.paintColor = color;
  applyComponentPaint(object, color);
}
function paintTopology() {
  const target = pickPaintTarget();
  if (!target) { status('涂色工具需要点击组件、梁或面板'); return; }
  const color = paintColorValue();
  if (!color) { status('颜色必须是 #RRGGBB 格式'); return; }
  if (target.kind === 'component') {
    const colorIndex = nearestNativePaintIndex(color);
    if (colorIndex === null) { status('颜色必须是 #RRGGBB 格式'); return; }
    const counterpartId = mirroredComponentId(target.id);
    setComponentPaintColor(target.object, color, colorIndex);
    const counterpart = counterpartId && counterpartId !== target.id
      ? objects.find(object => object.userData.id === counterpartId)
      : null;
    if (counterpart) setComponentPaintColor(counterpart, color, colorIndex);
    commit('已为组件设置颜色 {color}', { color });
    hoveredObject = null; updateInteractionHighlights();
    return;
  }
  if (target.kind === 'edge') {
    const ids = new Set([target.id]);
    const counterpartId = mirroredEdgeId(target.id);
    if (counterpartId) ids.add(counterpartId);
    commitTopology({ ...topology, edges: topology.edges.map(edge => ids.has(edge.id) ? { ...edge, color } : edge) }, '已为梁设置颜色 {color}', { color });
    hoveredObject = null; updateInteractionHighlights();
    return;
  }
  const side = target.plateSide === 'back' ? 'back' : 'front';
  const field = side === 'back' ? 'color_back' : 'color_front';
  const ids = new Set([target.id]);
  const counterpartId = mirroredPlateId(target.id);
  if (counterpartId) ids.add(counterpartId);
  commitTopology({ ...topology, plates: topology.plates.map(plate => ids.has(plate.id) ? { ...plate, [field]: color } : plate) }, side === 'back' ? '已为面板背面设置颜色 {color}' : '已为面板前面设置颜色 {color}', { color });
  hoveredObject = null; updateInteractionHighlights();
}
function hidePickedObject() {
  const selectedComponents = selectedObjects().filter(object => object.visible);
  if (selectedComponents.length) {
    for (const object of selectedComponents) {
      object.userData.hidden = true;
      object.visible = false;
    }
    select(null);
    commit('已隐藏 {count} 个对象', { count: selectedComponents.length });
    status('已隐藏 {count} 个对象', { count: selectedComponents.length });
    return true;
  }
  const topologyTarget = pickPaintTopology();
  if (topologyTarget?.kind === 'edge') {
    commitTopology({ ...topology, edges: topology.edges.map(edge => edge.id === topologyTarget.id ? { ...edge, hidden: true } : edge) }, '已隐藏 {count} 个对象', { count: 1 });
    return true;
  }
  if (topologyTarget?.kind === 'plate') {
    commitTopology({ ...topology, plates: topology.plates.map(plate => plate.id === topologyTarget.id ? { ...plate, hidden: true } : plate) }, '已隐藏 {count} 个对象', { count: 1 });
    return true;
  }
  const object = pick();
  if (!object) { status('隐藏工具需要点击组件、梁或面板'); return false; }
  object.userData.hidden = true;
  object.visible = false;
  select(null);
  commit('已隐藏 {count} 个对象', { count: 1 });
  status('已隐藏 {count} 个对象', { count: 1 });
  return true;
}
async function restoreTransparency() {
  const items = snapshot().map(object => {
    const { hidden, ...visibleObject } = object;
    return visibleObject;
  });
  const nextTopology = {
    ...topology,
    nodes: topology.nodes.map(node => {
      const { hidden, ...visibleNode } = node;
      return visibleNode;
    }),
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
  commit('已取消隐藏');
  status('已取消隐藏');
}
function hiddenTransparencyTargets() {
  return {
    components: objects.filter(object => object.userData.hidden).map(object => object.userData.id),
    edges: topology.edges.filter(edge => edge.hidden).map(edge => edge.id),
    plates: topology.plates.filter(plate => plate.hidden).map(plate => plate.id),
  };
}
function transparencyTargetCount(group) {
  return group.components.length + group.edges.length + group.plates.length;
}
function renderTransparencyGroups() {
  const host = $('#transparency-groups');
  if (!host) return;
  host.replaceChildren();
  for (const group of transparencyGroups) {
    const item = document.createElement('div'); item.className = 'transparency-group';
    const hidden = transparencyGroupIsHidden(group);
    const toggle = document.createElement('button'); toggle.type = 'button'; toggle.className = 'transparency-group-toggle'; toggle.textContent = group.name;
    toggle.dataset.hidden = String(hidden); toggle.setAttribute('aria-pressed', String(hidden));
    toggle.title = `${hidden ? t('按组取消隐藏') : t('按组隐藏')} ${group.name}`;
    toggle.onclick = () => { if (!busy) void applyTransparencyGroup(group.id, !transparencyGroupIsHidden(group)); };
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'transparency-group-remove'; remove.textContent = '×';
    remove.setAttribute('aria-label', `${t('删除隐藏组')} ${group.name}`); remove.title = `${t('删除隐藏组')} ${group.name}`;
    remove.onclick = () => { transparencyGroups = transparencyGroups.filter(value => value.id !== group.id); commit('已删除隐藏组'); renderTransparencyGroups(); };
    item.append(toggle, remove); host.append(item);
  }
}
function transparencyGroupIsHidden(group) {
  const componentHidden = id => objects.find(object => object.userData.id === id)?.userData.hidden === true;
  const edgeHidden = id => topology.edges.find(edge => edge.id === id)?.hidden === true;
  const plateHidden = id => topology.plates.find(plate => plate.id === id)?.hidden === true;
  const targets = [...group.components.map(componentHidden), ...group.edges.map(edgeHidden), ...group.plates.map(plateHidden)];
  return targets.length > 0 && targets.every(Boolean);
}
async function applyTransparencyGroup(groupId, hidden) {
  const group = transparencyGroups.find(value => value.id === groupId);
  if (!group) return;
  const componentIds = new Set(group.components);
  const edgeIds = new Set(group.edges);
  const plateIds = new Set(group.plates);
  const items = snapshot().map(object => hidden === componentIds.has(object.id)
    ? { ...object, ...(hidden ? { hidden: true } : {}) }
    : object);
  if (!hidden) for (const object of items) if (componentIds.has(object.id)) delete object.hidden;
  const nextTopology = {
    ...topology,
    edges: topology.edges.map(edge => hidden === edgeIds.has(edge.id) ? { ...edge, ...(hidden ? { hidden: true } : {}) } : edge),
    plates: topology.plates.map(plate => hidden === plateIds.has(plate.id) ? { ...plate, ...(hidden ? { hidden: true } : {}) } : plate),
  };
  if (!hidden) {
    for (const edge of nextTopology.edges) if (edgeIds.has(edge.id)) delete edge.hidden;
    for (const plate of nextTopology.plates) if (plateIds.has(plate.id)) delete plate.hidden;
  }
  await restore(items, nextTopology, transparencyGroups);
  commit(hidden ? '已按组隐藏 {name}' : '已按组取消隐藏 {name}', { name: group.name });
  status(hidden ? '已按组隐藏 {name}' : '已按组取消隐藏 {name}', { name: group.name });
}
function saveTransparencyGroup() {
  const name = $('#transparency-group-name').value.trim();
  const targets = hiddenTransparencyTargets();
  if (!name) { status('请输入隐藏组名称'); return; }
  if (!transparencyTargetCount(targets)) { status('当前没有隐藏的对象可保存'); return; }
  const previous = transparencyGroups.find(group => group.name === name);
  const group = { id: previous?.id || `visibility-group-${crypto.randomUUID()}`, name, ...targets };
  transparencyGroups = [...transparencyGroups.filter(value => value.name !== name), group];
  commit('已保存隐藏组 {name}', { name });
  $('#transparency-group-name').value = '';
  renderTransparencyGroups();
  status('已保存隐藏组 {name}', { name });
}
function edgePoint() {
  const nodeId = pickTopologyNode(true);
  const node = topology.nodes.find(value => value.id === nodeId);
  const result = resolveEdgePoint(raycaster.ray, edgeDraft?.frame || cameraBuildFrame(camera, controls.target), {
    axisSnap: !!edgeDraft && (edgeAxisSnap || edgeShiftSnap), node: node?.position,
    viewNormal: camera.getWorldDirection(new THREE.Vector3()),
  });
  if (edgeDraft) edgeDraft.axis = result?.axis || null;
  return result?.point || null;
}
function updateEdgePreview(point) {
  if (tool !== 'edge') return;
  if (!edgeDraft) {
    // Before the first click, show the quantized point as a translucent node
    // ghost so the player can judge exactly where the beam will start.
    edgePreview.visible = false;
    edgeRuler.hide();
    edgeAnchor.visible = !!point;
    if (point) edgeAnchor.position.copy(point);
    setText(buildStatus, point ? '姊?1 鏍?路 鐐瑰嚮璧风偣' : '姊?1 鏍?路 鏃犳湁鏁存牸璧风偣');
    return;
  }
  edgePreview.visible = !!point && updateEdgeMesh(edgePreview, edgeDraft.start, point, { size: edgeSize });
  edgeAnchor.visible = true;
  if (point) edgeRuler.show(edgeDraft.start, point, edgeDraft.axis); else edgeRuler.hide();
  setText(buildStatus, point ? '梁 1 格 · 整格端点 · 点击完成 / Esc 取消' : '梁 1 格 · 无有效终点 · Esc 取消');
}
function refreshEdgePreview() {
  if (!edgePointer || tool !== 'edge') return;
  pointerRay(edgePointer); updateEdgePreview(edgePoint());
}
function refreshConnectionPreview() {
  if (!connectionDraft || !edgePointer || tool !== 'connect') return;
  pointerRay(edgePointer); updateConnectionDraftPreview(connectionPoint());
}
function nodePoint() {
  const nodeId = pickTopologyNode();
  const node = topology.nodes.find(value => value.id === nodeId);
  if (node) return new THREE.Vector3(node.position.x, node.position.y, node.position.z);
  return projectBuildPoint(raycaster.ray, nodeMoveFrame || cameraBuildFrame(camera, controls.target));
}
function commitTopology(next, message, params = {}) {
  const candidate = validateDocument(project(snapshot(), next), catalog.index);
  const visual = buildTopologyVisual(candidate.topology, componentEntries(candidate.objects));
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
    const ids = new Set([id]);
    const counterpart = mirroredLinkId(id);
    if (counterpart) ids.add(counterpart);
    let links = topology.links || [];
    for (const targetId of ids) if (links.some(link => link.id === targetId)) links = removeLink(links, targetId, new Set(snapshot().map(object => object.id))).links;
    commitTopology({ ...topology, links }, '已删除连接');
    return;
  }
  if (!command) return;
  const counterpart = kind === 'node' ? mirroredNodeId(id) : kind === 'edge' ? mirroredEdgeId(id) : mirroredPlateId(id);
  const ids = new Set([id]); if (counterpart) ids.add(counterpart);
  if (kind === 'node' && ids.has(selectedTopologyNode)) clearNodeSelection();
  let next = topology;
  for (const targetId of ids) {
    const collection = kind === 'node' ? next.nodes : kind === 'edge' ? next.edges : next.plates;
    if (collection.some(value => value.id === targetId)) next = command(next, targetId);
  }
  commitTopology(next, kind === 'node' ? '已删除节点及其关联拓扑' : kind === 'edge' ? '已删除梁' : '已删除面板');
}
function finishPlate(type = 'plate') {
  const glass = type === 'glass';
  if (plateEdgeIds.length < 3) { status(glass ? '玻璃至少需要选择三根梁' : '面板至少需要选择三根梁'); return; }
  try {
    const command = glass ? createGlassPlateFromEdges : createPlateFromEdges;
    const color = paintColorValue();
    const result = command(topology.plates, plateEdgeIds, topology.edges, topology.nodes, { normalOffset: CELL_SIZE_WORLD / 2, ...(color ? { color_front: color, color_back: color } : {}) });
    const positions = new Map(topology.nodes.map(node => [node.id, new THREE.Vector3(node.position.x, node.position.y, node.position.z)]));
    result.plate.normalOffset = cameraFacingPlateOffset(result.plate.nodeIds, positions, camera.position, CELL_SIZE_WORLD / 2);
    const surfaceDirection = cameraFacingPlateDirection(result.plate.nodeIds, positions, camera.position);
    result.plate.surfaceDirection = { x: surfaceDirection.x, y: surfaceDirection.y, z: surfaceDirection.z };
    const next = addMirroredPlate({ ...topology, plates: result.plates }, result.plate);
    commitTopology(next, glass ? '已创建玻璃面板' : '已创建面板');
    plateEdgeIds = [];
    hoveredObject = null;
    updateInteractionHighlights();
  } catch (error) { reportError('面板创建失败：{error}', error); }
}
function selectedPlateEdgesFormLoop() {
  if (plateEdgeIds.length < 3) return false;
  const selectedEdges = plateEdgeIds.map(id => topology.edges.find(edge => edge.id === id));
  if (selectedEdges.some(edge => !edge)) return false;
  const neighbours = new Map();
  for (const edge of selectedEdges) {
    for (const [nodeId, otherId] of [[edge.a, edge.b], [edge.b, edge.a]]) {
      const linked = neighbours.get(nodeId) || [];
      linked.push(otherId); neighbours.set(nodeId, linked);
    }
  }
  if ([...neighbours.values()].some(linked => linked.length !== 2)) return false;
  const visited = new Set();
  const pending = [selectedEdges[0].a];
  while (pending.length) {
    const nodeId = pending.pop();
    if (visited.has(nodeId)) continue;
    visited.add(nodeId);
    pending.push(...neighbours.get(nodeId).filter(id => !visited.has(id)));
  }
  return visited.size === neighbours.size;
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
function handleEdgeClick(event) {
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
    cancelEdge();
    return;
  }
  */
  const point = edgePoint();
  if (!point) { status('当前位置无法投影到建造平面，请调整视角或按 Esc 重新开始'); return; }
  if (!edgeDraft) {
    edgeDraft = { start: point.clone(), frame: cameraBuildFrame(camera, point), axis: null };
    edgePointer = { clientX: event.clientX, clientY: event.clientY };
    edgeAnchor.position.copy(point); edgeAnchor.visible = true;
    edgeRuler.show(point, point);
    setText(buildStatus, '梁 1 格 · 点击终点 · Esc 取消');
    status('起点已定位；移动鼠标预览实体梁，再次点击完成');
    return;
  }
  const color = paintColorValue();
  const created = createEdgeFromPoints(topology, edgeDraft.start, point, { ...(color ? { color } : {}), size: edgeSize });
  commitTopology(addMirroredEdge(created, edgeDraft.start, point), mirrorMode.active ? '已创建实体梁及其镜像' : '已创建 1 格实体梁');
  cancelEdge();
}
function handleConnectionClick() {
  const endpoint = pickConnectionPort();
  if (!endpoint) { status('连接工具需要点击组件端口'); return; }
  if (!connectionDraft) {
    connectionDraft = { ...endpoint, points: [] };
    $('#connection-from-port').value = String(endpoint.port);
    refreshConnectionPorts();
    updateConnectionDraftPreview();
    status('已选择连接起点；点击目标组件完成，Esc 取消');
    return;
  }
  if (connectionDraft.componentId === endpoint.componentId && connectionDraft.port === endpoint.port) { status('请选择另一个组件端口作为连接终点'); return; }
  $('#connection-to-port').value = String(endpoint.port);
  const kind = $('#connection-kind').value;
  const componentIds = new Set(snapshot().map(item => item.id));
  const result = createLink(topology.links || [], { kind, from: connectionDraft, to: endpoint, points: connectionDraft.points || [] }, componentIds);
  const links = addMirroredLink(result.links, result.link);
  connectionDraft = null;
  clearConnectionDraftPreview();
  commitTopology({ ...topology, links }, mirrorMode.active && links.length > result.links.length ? '已创建 {kind} 连接及其镜像' : '已创建 {kind} 连接', { kind });
  refreshConnectionPorts();
}
function addConnectionRoutePoint(point) {
  if (!connectionDraft || !point) return false;
  const next = { x: point.x, y: point.y, z: point.z };
  const previous = connectionDraft.points?.at(-1);
  if (previous && ['x', 'y', 'z'].every(axis => Math.abs(previous[axis] - next[axis]) < 1e-9)) return false;
  connectionDraft.points = [...(connectionDraft.points || []), next];
  updateConnectionDraftPreview(point);
  status('已添加连接中间点；继续点击端口完成连接，或按 Esc 取消');
  return true;
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
    let nodes = created.nodes;
    if (created.created && mirrorMode.active) nodes = createNode(nodes, mirroredTopologyPoint(point)).nodes;
    commitTopology({ ...topology, nodes }, created.created ? mirrorMode.active ? '已创建节点及其镜像 {id}' : '已创建节点 {id}' : '已选择已有节点 {id}', { id: created.node.id });
    if (!created.created) selectTopologyNode(created.node.id);
    return true;
  }
  if (tool === 'plate' || tool === 'glass') {
    const hit = selectableKinds.edge ? raycaster.intersectObjects(topologyLayer.children.filter(object => object.visible && object.userData.topology === 'edge'), false)[0] : null;
    const edgeId = hit?.object.userData.edgeId;
    if (!edgeId) { status(tool === 'glass' ? '玻璃工具需要选择围成闭合环的梁' : '面板工具需要选择围成闭合环的梁'); return true; }
    if (plateEdgeIds.includes(edgeId)) return true;
    plateEdgeIds.push(edgeId);
    updateInteractionHighlights();
    if (selectedPlateEdgesFormLoop()) finishPlate(tool);
    else status(tool === 'glass' ? '玻璃已选择 {count} 根梁；闭环后自动创建，Esc 取消' : '面板已选择 {count} 根梁；闭环后自动创建，Esc 取消', { count: plateEdgeIds.length });
    return true;
  }
  return false;
}
renderer.domElement.addEventListener('contextmenu', e => e.preventDefault());
renderer.domElement.addEventListener('pointerdown', event => {
  if (event.button !== 0 || busy) return;
  pointerRay(event);
  if (mirrorMode.active && mirrorGuide.visible && raycaster.intersectObject(mirrorGuideHandle, false).length) {
    mirrorGuideDrag = true;
    controls.enabled = false;
    down = null;
    renderer.domElement.setPointerCapture(event.pointerId);
    return;
  }
  viewport.focus({ preventScroll: true });
  dragOccurred = transform.dragging;
  down = { x: event.clientX, y: event.clientY };
});
renderer.domElement.addEventListener('pointermove', event => {
  if (busy) return;
  if (mirrorGuideDrag) {
    pointerRay(event);
    moveMirrorGuideFromRay();
    return;
  }
  pointerInCanvas = true;
  edgePointer = { clientX: event.clientX, clientY: event.clientY };
  pointerRay(event);
  if (tool === 'connect') {
    const port = pickConnectionPort();
    hoveredConnectionPort = port;
    showConnectionPortTooltip(port, event);
  } else if (['select', 'erase', 'paint', 'plate', 'glass', 'translate', 'rotate', 'scale', 'hide'].includes(tool)) {
    const nextHover = tool === 'paint'
      ? pickPaintTarget()?.object || null
      : tool === 'plate' || tool === 'glass'
        ? (selectableKinds.edge ? raycaster.intersectObjects(topologyLayer.children.filter(object => object.visible && object.userData.topology === 'edge'), false)[0]?.object || null : null)
        : pickInteractionHover();
    if (nextHover !== hoveredObject) { hoveredObject = nextHover; updateInteractionHighlights(); }
  }
  const rawPoint = tool === 'edge' ? edgePoint() : tool === 'connect' ? connectionPoint() : tool === 'node' ? nodePoint() : tool === 'place' ? placementPoint() : raycaster.ray.intersectPlane(plane, new THREE.Vector3());
  const hoveredPort = tool === 'connect' ? pickConnectionPort() : null;
  const gridPoint = rawPoint && hoveredPort?.position ? rawPoint : rawPoint && quantizeWorldVector(rawPoint);
  const point = gridPoint ? new THREE.Vector3(gridPoint.x, gridPoint.y, gridPoint.z) : null;
  cursorPoint = point;
  if (tool === 'connect') updateConnectionDraftPreview(point);
  setText($('#cursor-pos'), point ? '{coordinates}' : '无法定位：射线与建造平面平行', { coordinates: point ? axes.map(axis => t('{axis} {cells} 格', { axis: axis.toUpperCase(), cells: worldToCell(point[axis]) })).join(' · ') : '' });
  updateEdgePreview(point);
  void updatePlacementPreview(point);
});
renderer.domElement.addEventListener('pointerleave', () => { pointerInCanvas = false; hoveredObject = null; hideConnectionPortTooltip(); updateInteractionHighlights(); edgePreview.visible = false; edgeAnchor.visible = false; edgeRuler.hide(); if (placementPreview) placementPreview.visible = false; });
renderer.domElement.addEventListener('pointerup', event => {
  if (mirrorGuideDrag) {
    mirrorGuideDrag = false;
    controls.enabled = true;
    if (renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId);
    return;
  }
  if (!down || event.button !== 0) return;
  const moved = Math.hypot(event.clientX - down.x, event.clientY - down.y); down = null;
  if (busy || dragOccurred || moved > 5 || (transform.axis && ['translate', 'rotate', 'scale'].includes(tool))) return;
  pointerRay(event);
  if (tool === 'edge') {
    try { handleEdgeClick(event); } catch (error) { reportError('梁操作失败：{error}', error); }
    return;
  }
  if (tool === 'connect') {
    try {
      if (pickConnectionPort()) handleConnectionClick();
      else if (connectionDraft) addConnectionRoutePoint(connectionPoint());
      else handleConnectionClick();
    } catch (error) { reportError('连接操作失败：{error}', error); }
    return;
  }
  if (tool === 'paint') {
    if (paintColorPicking) pickPaintColor();
    else paintTopology();
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
  } else if (tool === 'translate' && pickLinkPoint()) {
    const linkPoint = pickLinkPoint();
    selectLinkPoint(linkPoint.linkId, linkPoint.pointIndex);
  } else if (tool === 'translate') {
    const nodeId = pickTopologyNode();
    const edge = nodeId ? null : pickEdgeByScreenTolerance(24);
    const targetNodeId = nodeId || (edge && nearestEdgeEndpoint(edge.id));
    if (targetNodeId) selectTopologyNode(targetNodeId);
  } else {
    const target = pickSelectionTarget();
    if (!target) select(null);
    else if (target.kind === 'component') select(target.object, { toggle: event.shiftKey });
    else selectTopology(target, { toggle: event.shiftKey });
  }
});
renderer.domElement.addEventListener('pointercancel', () => { mirrorGuideDrag = false; controls.enabled = true; down = null; cancelEdge(); });

function fit({ reference = referencePreview } = {}) {
  const box = new THREE.Box3();
  if (selectedIds.size || selectedTopologyIds.size) [...selectedObjects(), ...selectedTopologyObjects()].forEach(object => box.expandByObject(object));
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
const viewLabels = { orientation: 'XYZ 视角指示器', right: '右视图 +X', left: '左视图 −X', top: '顶视图 +Y', bottom: '底视图 −Y', front: '前视图 +Z', back: '后视图 −Z', iso: '正交' };
const orientation = createOrientationIndicator(viewport, () => camera, view => {
  if (busy || transform.dragging) return;
  const damping = controls.enableDamping;
  controls.enableDamping = false; controls.update();
  orientCamera(camera, controls, view);
  controls.enableDamping = damping;
  scheduleSettings();
}, view => t(viewLabels[view]), () => {
  const input = $('#orthographic-view');
  input.checked = !input.checked;
  updateRenderSettings();
});
orientation.footer.append($('#fit-btn'));
function setReferencePreview(value) {
  referencePreview = Boolean(value);
  // Reference preview only hides editor helpers. Keep the user's configured
  // background so dark wheels, suspension and engine parts remain visible.
  scene.background.set(settings.backgroundColor);
  grid.visible = !referencePreview && gridPreferenceVisible && topologyHelpersVisible;
  transform.getHelper().visible = !referencePreview;
  updateConnectionVisibility();
  edgePreview.visible = false; edgeAnchor.visible = false; edgeRuler.hide();
  updateNodeVisualState();
  edgeLengthLabels.setVisible(!referencePreview && settings.edgeLengthsVisible);
  orientation.root.hidden = referencePreview;
  $('.view-controls').hidden = referencePreview;
  $('.top-tool-section').hidden = referencePreview;
  paintToolbar.hidden = referencePreview || tool !== 'paint';
  connectionToolbar.hidden = referencePreview || tool !== 'connect';
  transparencyToolbar.hidden = referencePreview || tool !== 'hide';
  edgeToolbar.hidden = referencePreview || tool !== 'edge';
  updateMirrorToolbar();
  updateSubgridToolbar();
  $('.hud').hidden = referencePreview;
  leftSidebarToggle.hidden = referencePreview;
  rightSidebarToggle.hidden = referencePreview;
  $('#native-reference-preview-btn').setAttribute('aria-pressed', String(referencePreview));
  setText($('#native-reference-preview-btn'), referencePreview ? '退出参考预览' : '参考预览');
  refreshConnectionPorts();
  updateInteractionHighlights();
  if (referencePreview) fit({ reference: true });
}
nativeReferencePreviewButton.onclick = () => {
  if (busy || !objects.length) return;
  setReferencePreview(!referencePreview);
  status(referencePreview ? '已开启参考预览：编辑辅助已隐藏，可对照 vehicle.png；相机、光照和游戏材质尚未验证' : '已退出参考预览');
};
const gridFields = document.createElement('div');
gridFields.innerHTML = '<div class="property"><label for="grid-color" data-i18n="网格颜色"></label><input id="grid-color" type="color"></div><div class="property"><label for="grid-opacity" data-i18n="网格透明度"></label><input id="grid-opacity" type="range" min="0" max="1" step="0.05"></div><div class="property"><label for="grid-style" data-i18n="网格线型"></label><select id="grid-style"><option value="solid" data-i18n="实线"></option><option value="dashed" data-i18n="虚线"></option></select></div><h2 data-i18n="节点显示"></h2><div class="property"><label for="node-color" data-i18n="节点颜色"></label><input id="node-color" type="color"></div><div class="property"><label for="node-size" data-i18n="节点大小"></label><input id="node-size" type="range" min="0.02" max="0.25" step="0.005"><output id="node-size-value"></output></div><div class="property"><label for="node-opacity" data-i18n="节点透明度"></label><input id="node-opacity" type="range" min="0" max="1" step="0.05"></div><h2 data-i18n="结构显示"></h2><div class="property"><label for="edge-lengths-visible" data-i18n="显示梁 XYZ 长度（格）"></label><input id="edge-lengths-visible" type="checkbox"></div><div class="property"><label for="edge-outlines-visible" data-i18n="显示梁描边"></label><input id="edge-outlines-visible" type="checkbox"></div><h2 data-i18n="涂色"></h2><div class="property"><label for="paint-color" data-i18n="颜色（Hex RGB）"></label><input id="paint-color" type="color" value="#dddddd"><input id="paint-color-hex" type="text" value="#dddddd" maxlength="7" spellcheck="false"><output id="paint-color-preview" class="paint-color-preview"></output></div><div class="property"><label for="paint-side" data-i18n="面板涂色面"></label><select id="paint-side"><option value="front" data-i18n="前面"></option><option value="back" data-i18n="背面"></option></select></div>';
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
// Panel paint always follows the ray-visible side; keeping a manual front/back
// selector would let a click silently colour the face away from the player.
$('#paint-side')?.closest('.property')?.remove();
$('#grid-btn').before(gridFields);
applyTranslations(gridFields);
$('#grid-color').value = settings.gridColor;
$('#grid-opacity').value = settings.gridOpacity;
$('#grid-style').value = settings.gridStyle;
$('#node-color').value = settings.nodeColor;
$('#node-size').value = settings.nodeSize;
$('#node-opacity').value = settings.nodeOpacity;
$('#edge-lengths-visible').checked = settings.edgeLengthsVisible;
$('#edge-outlines-visible').checked = settings.edgeOutlinesVisible;
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
  grid.userData.baseOpacity = style.gridOpacity;
  gridDashed = style.gridStyle === 'dashed';
  applyGridStyle(grid, style);
  if (gridDashed) grid.computeLineDistances();
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
  scene.background.set(settings.backgroundColor);
  updateLighting(); setProjectionMode(settings.orthographic);
  orientation.projectionButton.setAttribute('aria-pressed', String(settings.orthographic));
  orientation.projectionButton.dataset.projection = settings.orthographic ? 'orthographic' : 'perspective';
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
function updateEdgeLengthVisibility() {
  settings.edgeLengthsVisible = normalizeSettings({ version: 1, edgeLengthsVisible: $('#edge-lengths-visible').checked }).edgeLengthsVisible;
  edgeLengthLabels.setVisible(!referencePreview && settings.edgeLengthsVisible);
  scheduleSettings();
}
$('#edge-lengths-visible').addEventListener('change', updateEdgeLengthVisibility);
function updateEdgeOutlineVisibility() {
  settings.edgeOutlinesVisible = normalizeSettings({ version: 1, edgeOutlinesVisible: $('#edge-outlines-visible').checked }).edgeOutlinesVisible;
  setEdgeOutline(edgePreview, settings.edgeOutlinesVisible);
  replaceTopologyVisual(buildTopologyVisual(topology, componentEntries()));
  scheduleSettings();
}
$('#edge-outlines-visible').addEventListener('change', updateEdgeOutlineVisibility);
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
  settings.paintColor = color;
  updatePaintPreview();
  scheduleSettings();
  return true;
}
function selectLinkPoint(linkId, pointIndex) {
  const link = topology.links.find(value => value.id === linkId);
  const point = link?.points?.[pointIndex];
  if (!point) return false;
  clearNodeSelection(); selected = null; selectedIds.clear(); selectedTopologyIds.clear();
  selectedLinkPoint = { linkId, pointIndex };
  linkPointMoveMarker.position.set(point.x, point.y, point.z);
  linkPointMoveMarker.userData.linkId = linkId;
  linkPointMoveMarker.userData.linkPointIndex = pointIndex;
  linkPointMoveMarker.visible = true;
  if (tool === 'translate') { transform.setTranslationSnap(link.nativeProjected ? null : CELL_SIZE_WORLD); transform.setMode('translate'); transform.attach(linkPointMoveMarker); }
  inspect();
  return true;
}
function setPaintColorPicking(active) {
  paintColorPicking = active;
  const button = $('#pick-paint-color');
  button.classList.toggle('active', active);
  button.setAttribute('aria-pressed', String(active));
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
$('#pick-paint-color').onclick = () => setPaintColorPicking(!paintColorPicking);
$('#save-paint-quick-color').onclick = () => {
  const color = paintColorValue();
  if (!color) return;
  settings.paintQuickColors = [...new Set([...settings.paintQuickColors, color])].slice(-12);
  renderPaintQuickColors(); scheduleSettings();
};
$('#connection-kind').addEventListener('change', updateConnectionToolbar);
$('#save-transparency-group').onclick = saveTransparencyGroup;
setPaintColor(settings.paintColor); renderPaintQuickColors(); updateConnectionToolbar();
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
axisSnapButton.innerHTML = '<span data-i18n="轴向吸附"></span><kbd>Shift</kbd>';
axisSnapButton.dataset.i18nTitle = '建梁或连接：自动吸附单一世界轴（A 切换，Shift 临时启用）';
axisSnapButton.setAttribute('aria-keyshortcuts', 'A Shift');
applyTranslations(axisSnapButton);
$('.view-controls').append(axisSnapButton);
function updateEdgeAxisSnapButton() {
  axisSnapButton.setAttribute('aria-pressed', String(edgeAxisSnap || edgeShiftSnap));
}
function updateEdgeToolbar() {
  for (const button of edgeToolbar.querySelectorAll('[data-edge-size]')) {
    const selectedSize = Number(button.dataset.edgeSize) === edgeSize;
    button.classList.toggle('active', selectedSize);
    button.setAttribute('aria-pressed', String(selectedSize));
  }
}
updateEdgeAxisSnapButton();
updateEdgeToolbar();
function toggleEdgeAxisSnap() {
  if (busy) return;
  edgeAxisSnap = !edgeAxisSnap;
  updateEdgeAxisSnapButton();
  refreshEdgePreview(); scheduleSettings();
}
axisSnapButton.onclick = toggleEdgeAxisSnap;
for (const button of edgeToolbar.querySelectorAll('[data-edge-size]')) {
  button.addEventListener('click', () => {
    edgeSize = Number(button.dataset.edgeSize) === 3 ? 3 : 1;
    updateEdgeToolbar();
    refreshEdgePreview();
    scheduleSettings();
  });
}
$('#edge-split-action').onclick = () => {
  if (busy) return;
  if (edgePointer) pointerRay(edgePointer);
  try { splitPickedEdge(); } catch (error) { reportError('梁切分失败：{error}', error); }
};
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
$('#use-model-thumbnails').onchange = () => { settings.modelThumbnails = $('#use-model-thumbnails').checked; renderCatalog(); scheduleSettings(); };
function updateCatalogCardSize(value = $('#catalog-card-size').value) {
  settings.catalogCardSize = normalizeSettings({ version: 1, catalogCardSize: Number(value) }).catalogCardSize;
  const list = $('#component-list');
  list.style.setProperty('--component-card-size', `${settings.catalogCardSize}px`);
  list.style.setProperty('--component-thumbnail-size', `${Math.round(settings.catalogCardSize * .75)}px`);
  list.style.setProperty('--component-icon-size', `${Math.round(settings.catalogCardSize * .32)}px`);
  list.style.setProperty('--component-text-size', `${Math.min(16, Math.max(9, settings.catalogCardSize * .14)).toFixed(1)}px`);
  $('#catalog-card-size').value = String(settings.catalogCardSize);
}
$('#catalog-card-size').addEventListener('input', () => { updateCatalogCardSize(); scheduleSettings(); });
$('#undo-btn').onclick = undo; $('#redo-btn').onclick = redo;
$('#new-btn').onclick = () => { if (!busy && (!objects.length || confirm(t('清空当前工程？此操作可以撤销。')))) transact(async () => { await restore([], { nodes: [], edges: [], plates: [], links: [] }, []); commit(); }); };

function download(content, name, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement('a'); a.href = url; a.download = name; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function currentProject() {
  transparencyGroups = pruneTransparencyGroups();
  return validateDocument(project(snapshot(), topology, transparencyGroups), catalog.index);
}
// Project snapshots remain the local recovery representation. This hidden
// hook is intentionally not a user action: the visible save control operates
// on paired native vehicle files.
$('#project-save-btn').onclick = () => download(JSON.stringify(currentProject(), null, 2), 'anymaker-project.json', 'application/json');
$('#export-btn').onclick = () => { if (!busy) { download(toIntermediateXml(currentProject()), 'anymaker-intermediate.xml', 'application/xml'); status('已导出中间 XML；不能作为已验证游戏存档使用'); } };
$('#file-input').onchange = e => {
  const file = e.target.files[0]; e.target.value = ''; if (!file) return;
  transact(async () => {
    if (file.size > 10 * 1024 * 1024) throw new Error('工程文件超过 10 MiB');
    const document = migrateDocument(JSON.parse(await file.text()), catalog.index);
    await restore(document.objects, document.topology || { nodes: [], edges: [], plates: [], links: [] }, document.visibilityGroups || []); commit(); fit(); status('工程已加载');
  });
};
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
function openNativeVehiclePicker() {
  setRightSidebarOpen(true);
  activateSidebarTab('right', 'resources');
  $('#native-input').click();
}
$('#library-btn').onclick = openNativeVehiclePicker;
$('#native-btn').onclick = openNativeVehiclePicker;
$('#native-input').onchange = async e => {
  const files = [...e.target.files]; e.target.value = ''; if (!files.length) return;
  nativeModel = null; importedNativeRootVehicleIds = []; nativeExportButton.disabled = false; nativeReferencePreviewButton.disabled = true;
  try {
    const pair = readNativePair(files);
    setText($('#native-summary'), '正在读取 {dataName} / {metaName}…', () => ({ dataName: pair.data.file.name, metaName: pair.meta.file.name }));
    const [dataText, metaText] = await Promise.all([pair.data.file.text(), pair.meta.file.text()]);
    const data = JSON.parse(dataText); const meta = JSON.parse(metaText);
    nativeModel = parseNativePair(data, meta);
    nativeModel.extras.native.fileBaseName = pair.data.baseName;
    const roundTrip = verifyNativePairRoundTrip(data, meta);
    if (roundTrip.data.length || roundTrip.meta.length) throw new Error('原生配套文件的无编辑 round-trip 校验失败');
    const nativeModelStats = nativeStats(nativeModel);
    $('#native-summary').dataset.domainStats = JSON.stringify(nativeModelStats);
    nativeReferencePreviewButton.disabled = false;
    const vehicles = data.vehicles?.vehicles;
    if (!Array.isArray(vehicles)) throw new Error('没有 vehicles.vehicles 数组');
    const summaries = vehicles.map(v => ({ id: v.id, nodes: v.nodes?.length || 0, edges: v.edges?.length || 0, plates: v.plates?.length || 0, grids: v.grids?.length || 0, components: (v.grids || []).reduce((n, g) => n + (g.components?.length || 0), 0) }));
    const primary = summaries.reduce((best, summary) => summary.components > best.components ? summary : best, summaries[0]);
    setText($('#native-summary'), '正在导入载具 {id}（{components} 个组件）…', primary);
    if (await importNativeVehicle([String(primary.id)])) setText($('#native-summary'), '已导入 {dataName} / {metaName}：{vehicle}。', () => ({ dataName: pair.data.file.name, metaName: pair.meta.file.name, vehicle: t('载具 {id}：{nodes} 节点 / {edges} 梁 / {plates} 面板 / {grids} 网格 / {components} 组件', primary) }));
  } catch (error) { setText($('#native-summary'), '无法导入原生文件：{error}', () => ({ error: t(error instanceof Error ? error.message : String(error)) })); }
};

async function importNativeVehicle(vehicleIds) {
  status('正在导入配套原生载具');
  if (!nativeModel || busy) { status(!nativeModel ? '原生模型尚未加载' : '当前操作仍在进行'); return false; }
  let importError = null;
  const imported = await transact(async () => {
    try {
      const editorDocument = toEditorDocument(nativeModel, { vehicleIds });
      const document = validateDocument(editorDocument, catalog.index);
      await restore(document.objects, document.topology || toEditorTopology(nativeModel, { vehicleIds }), []);
      centerImportedVehicleGeometry();
      importedNativeRootVehicleIds = [...vehicleIds].map(String);
      renderSubgridList();
      nativeExportButton.disabled = false;
      commit(); setReferencePreview(false); fit({ reference: false });
      status('已将配套 .data / .meta 的组件、节点、梁和面板导入当前场景；连接仍保留在领域模型中');
    } catch (error) {
      importError = error;
      throw error;
    }
  });
  if (!imported) {
    const detail = importError instanceof Error ? importError.message : '当前操作仍在进行';
    setText($('#native-summary'), '无法导入原生文件：{error}', () => ({ error: t(detail) }));
  }
  return imported;
}

function saveNativeVehicle() {
  if (busy) return;
  try {
    const pair = toNativePairFromEditor(currentProject());
    const baseName = nativeModel?.extras.native.fileBaseName || 'anymaker-vehicle';
    download(JSON.stringify(pair.data, null, 2), `${baseName}.data`, 'application/json');
    download(JSON.stringify(pair.meta, null, 2), `${baseName}.meta`, 'application/json');
    status('已保存原生格式 .data / .meta 配套载具');
  } catch (error) { reportError('原生导出失败：{error}', error); }
}
$('#save-btn').onclick = saveNativeVehicle;
nativeExportButton.onclick = saveNativeVehicle;

window.addEventListener('keydown', e => {
  if (e.key === 'Tab' && e.target === viewport) {
    e.preventDefault();
    setLeftSidebarCollapsed(!leftSidebar.hidden, { focusToggle: true });
    return;
  }
  const editingText = e.target instanceof HTMLElement && (e.target.matches('input,textarea,select') || e.target.isContentEditable);
  if (editingText) return;
  if (e.key === 'Escape' && !busy) {
    if (edgeDraft || plateEdgeIds.length || selectedTopologyNode) status('已取消当前拓扑操作');
    cancelTopologyDraft(); select(null); setTool('select');
    return;
  }
  if (e.key === 'Shift' && !busy) {
    if (['edge', 'connect'].includes(tool) && !edgeShiftSnap) {
      edgeShiftSnap = true;
      updateEdgeAxisSnapButton();
      refreshEdgePreview();
      refreshConnectionPreview();
    }
    return;
  }
  if (e.target instanceof HTMLElement && e.target.matches('button,summary,[role="separator"]')) return;
  if (e.target !== document.body && e.target !== viewport && e.target !== renderer.domElement) return;
  if (busy) return;
  const key = e.key.toLowerCase();
  if (e.ctrlKey || e.metaKey) { if (key === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); } else if (key === 'y') { e.preventDefault(); redo(); } return; }
  if (key === 'a' && !e.altKey && !e.repeat) { e.preventDefault(); toggleEdgeAxisSnap(); return; }
  const binding = tools.find(t => t[2].toLowerCase() === key);
  if (binding) setTool(binding[0]);
  if (key === 'delete' || key === 'backspace') {
    e.preventDefault();
    if (selectedTopologyNode) deleteTopology('node', selectedTopologyNode);
    else transact(async () => { await remove(selected); });
  }
  if (key === 'f') fit();
});
window.addEventListener('keyup', e => {
  if (e.key !== 'Shift' || !edgeShiftSnap) return;
  edgeShiftSnap = false;
  updateEdgeAxisSnapButton();
  refreshEdgePreview();
  refreshConnectionPreview();
});
window.addEventListener('blur', () => {
  if (!edgeShiftSnap) return;
  edgeShiftSnap = false;
  updateEdgeAxisSnapButton();
  refreshEdgePreview();
  refreshConnectionPreview();
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
    version: 1, language: getLocale(), leftWidth: leftSidebarWidth, rightWidth: rightSidebarWidth, leftCollapsed: leftSidebar.hidden, rightOpen: !rightSidebar.hidden,
    gridColor: $('#grid-color').value, gridOpacity: Number($('#grid-opacity').value), gridStyle: $('#grid-style').value, gridVisible: gridPreferenceVisible,
    nodesVisible: showNodes, nodeColor: $('#node-color').value, nodeSize: Number($('#node-size').value), nodeOpacity: Number($('#node-opacity').value), edgeAxisSnap, edgeSize, connectionVisibility: { ...connectionVisibility }, edgeLengthsVisible: settings.edgeLengthsVisible, edgeOutlinesVisible: settings.edgeOutlinesVisible, tool, selectedType,
    backgroundColor: settings.backgroundColor, lightAzimuth: settings.lightAzimuth, lightElevation: settings.lightElevation, lightIntensity: settings.lightIntensity, shadowStrength: settings.shadowStrength, lightSoftness: settings.lightSoftness, cameraLightEnabled: settings.cameraLightEnabled, cameraLightIntensity: settings.cameraLightIntensity, paintColor: settings.paintColor, paintQuickColors: settings.paintQuickColors, orthographic: settings.orthographic,
    showBuildingFurniture: $('#show-building-furniture').checked, modelThumbnails: $('#use-model-thumbnails').checked, catalogCardSize: settings.catalogCardSize, query: $('#component-search').value, category: $('#category-filter').value,
    sidebarTabs: { left: settings.sidebarTabs.left, right: settings.sidebarTabs.right },
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
controls.addEventListener('change', () => { scheduleSettings(); if (!busy && pointerInCanvas) refreshEdgePreview(); });
window.addEventListener('pagehide', saveSettings);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') saveSettings(); });

export function changeLanguage(locale) {
  const scrollTop = leftSidebar.scrollTop;
  const definitionOpen = $('#inspector-content details')?.open;
  setLocale(locale);
  document.documentElement.lang = getLocale() === 'zh' ? 'zh-CN' : 'en';
  $('#language-select').value = getLocale();
  applyTranslations(document);
  renderLatestPagesBuildTime();
  renderCategories(); renderCatalog(); inspect(); refresh();
  if (definitionOpen && $('#inspector-content details')) $('#inspector-content details').open = true;
  leftSidebar.scrollTop = scrollTop;
  orientation.relabel();
  localSession?.refresh();
  saveSettings();
}
$('#language-select').addEventListener('change', event => changeLanguage(event.target.value));

const resize = () => { updateCameraProjection(); renderer.setSize(viewport.clientWidth, viewport.clientHeight, false); updateReferenceGrid(); if (!busy && pointerInCanvas) refreshEdgePreview(); };
new ResizeObserver(resize).observe(viewport);
setLeftSidebarCollapsed(settings.leftCollapsed);
setRightSidebarOpen(settings.rightOpen);
activateSidebarTab('left', settings.sidebarTabs.left);
activateSidebarTab('right', settings.sidebarTabs.right);
changeLanguage(getLocale());
setGridConstraints(); refresh(); resize();
function renderLatestPagesBuildTime() {
  const element = $('#github-build-time');
  if (pagesBuildTimeUnavailable) {
    setText(element, '无法读取 Pages 构建状态');
    element.removeAttribute('title');
    element.hidden = false;
    return;
  }
  if (!latestPagesBuildTime || Number.isNaN(latestPagesBuildTime.getTime())) {
    setText(element, '暂无成功的 Pages 构建');
    element.removeAttribute('title');
    element.hidden = false;
    return;
  }
  const language = getLocale() === 'zh' ? 'zh-CN' : 'en-US';
  const formatted = new Intl.DateTimeFormat(language, { dateStyle: 'medium', timeStyle: 'short' }).format(latestPagesBuildTime);
  setText(element, '版本 {time}', { time: formatted });
  element.title = latestPagesBuildTime.toISOString();
  element.hidden = false;
}
async function loadLatestPagesBuildTime() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(GITHUB_PAGES_WORKFLOW_RUNS, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    });
    if (!response.ok) {
      pagesBuildTimeUnavailable = true;
      renderLatestPagesBuildTime();
      return;
    }
    const payload = await response.json();
    if (!Array.isArray(payload?.workflow_runs)) {
      pagesBuildTimeUnavailable = true;
      renderLatestPagesBuildTime();
      return;
    }
    const run = payload.workflow_runs.find(candidate =>
      isGitHubPagesDeployment(candidate) && candidate?.status === 'completed' && candidate?.conclusion === 'success'
    );
    const updatedAt = run?.updated_at;
    const time = typeof updatedAt === 'string' ? new Date(updatedAt) : null;
    if (time && !Number.isNaN(time.getTime())) latestPagesBuildTime = time;
    renderLatestPagesBuildTime();
  } catch {
    // GitHub API availability and rate limits must not delay the editor.
    pagesBuildTimeUnavailable = true;
    renderLatestPagesBuildTime();
  } finally {
    clearTimeout(timer);
  }
}
async function initialize() {
  await loadCatalog();
  $('#component-search').value = settings.query;
  $('#show-building-furniture').checked = settings.showBuildingFurniture;
  $('#use-model-thumbnails').checked = settings.modelThumbnails;
  updateCatalogCardSize(settings.catalogCardSize);
  renderCategories();
  $('#category-filter').value = [...$('#category-filter').options].some(option => option.value === settings.category) ? settings.category : '';
  if (catalog.has(settings.selectedType)) selectedType = settings.selectedType;
  renderCatalog();
  localSession = await startLocalSession({
    store: localStore,
    validate: value => migrateDocument(value, catalog.index),
    restore: async value => { await restore(value.objects, value.topology || { nodes: [], edges: [], plates: [], links: [] }, value.visibilityGroups || []); commit(); },
    snapshot: () => {
      const committed = history.entries[history.cursor];
      return project(committed.objects, committed.topology, committed.visibilityGroups);
    },
    canSave: () => !busy && !transform.dragging,
    notify: showBackupStatus,
  });
  if (settings.camera) {
    camera.position.fromArray(settings.camera.position); controls.target.fromArray(settings.camera.target); controls.update();
  } else if (objects.length || topology.nodes.length) fit();
  busy = false;
  setTool(settings.tool); updateMirrorToolbar(); refresh();
  preferencesReady = true;
  viewport.dataset.ready = 'true';
  void loadLatestPagesBuildTime();
  if (storedSettings.error) status('设置保存失败：{detail}', { detail: storedSettings.error.message });
}
initialize().catch(error => reportError('组件目录加载失败：{error}', error));
renderer.setAnimationLoop(() => { controls.update(); updateReferenceGrid(); updateTopologyHelperVisibility(); orientation.update(); edgeRuler.update(); edgeLengthLabels.update(); renderer.render(scene, camera); });
