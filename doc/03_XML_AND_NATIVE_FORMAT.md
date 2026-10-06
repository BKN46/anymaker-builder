# XML、工程 JSON 与原生文件边界

## 当前工程 JSON

浏览器工程 schema 是 `anymaker-web-project` v1：

```json
{
  "format": "anymaker-web-project",
  "version": 1,
  "projectName": "anymaker-vehicle",
  "grids": [{"id": "grid-1"}],
  "objects": [
    {
      "id": "instance-uuid",
      "type": "engine",
      "position": {"x": 0, "y": 0, "z": 0},
      "rotation": {"x": 0, "y": 0, "z": 0},
      "localMirrorAxes": ["x"],
      "scale": {"x": 1, "y": 1, "z": 1}
    }
  ]
}
```

`projectName` 是编辑器项目名称，随历史记录和本地自动恢复保存。导出时会作为 `.data`、`.meta`、工程 JSON 和中间 XML 的文件基名；不适用于文件名的字符会被替换，空名称回退为 `anymaker-vehicle`。它当前不写入游戏原生载具字段。

可选的 `grids` 是编辑器子网格目录。每项包含唯一的字母、数字、`_` 或 `-` 组成的 `id`，还可包含不超过 80 字符的 `name`。名称可在子网格列表中修改，随工程 JSON、工程代码、历史记录和本地恢复保存；旧工程没有名称时继续显示默认标签。空的手动子网格也会保留。组件和结构节点、梁、面板可用同一 `gridId` 归属到该目录；缺失归属的旧工程按 `grid-1` 处理。此目录是编辑器状态，当前不代表已验证的原生载具子网格导出语义。

原生导入按物理 `vehicle` 归并编辑器归属：同一载具中的各安装 `grids[]` 共用第一个安装网格的编辑器 `gridId`，但每个组件仍使用自身安装帧投影，实例 ID 保留原安装网格来源。门板上的内外把手和斜面仪表盘不会仅因安装坐标系不同而单列为子网格。子网格检查可重新按结构连通性分离或归并组件与拓扑归属；不修改世界坐标，也不把编辑器 `gridId` 直接当作原生安装坐标系。

组件可选的 `nativeProperties` 保存 Properties Tool 的可序列化原生字段。它只接受有限数值、布尔值、文本及有大小/层级限制的 JSON 状态；组件/载具连接引用不会作为该字段写入。导入时会保留可安全验证的原生属性，Inspector 可编辑已有属性及已通过游戏说明和 GCL 符号确认的默认项（例如换挡杆档位数、变速箱各档齿比、机械偏移/缩放）。保存 `.data/.meta` 时这些字段回写到对应组件记录。复杂运行状态只读展示；该映射尚未通过真实游戏加载验证。

`microcontroller` 使用已在 `test-vehicle/vehicle.data` 中观察到的 `script`、`global_inputs`、`global_outputs` 与 `global_private` 字段。每个变量为 `{ name, data_value }`，其中 `data_value` 目前按样本支持 `f64` 和 `bool`（布尔值包含原生 `type: "type_bool"` 标记）。Inspector 提供这些字段的专用编辑器；浏览器从不解析或执行用户脚本，也不模拟数据网络或游戏运行时。字段回写只是原生结构研究的一部分，尚未获得游戏加载验收。

导入时检查格式版本、组件 ID 唯一性、定义存在性、有限数值、变换范围和缩放正值。工程不保存本地绝对路径，不保存用户选择的文件对象。

编辑器空间晶格固定为 `1 格 = 8 cm = 0.08` 世界单位。普通 `objects[].position`、`mirror.offset` 和手动 `topology.nodes[].position` 的世界 X/Y/Z 分量必须是整数格；非格点值会拒绝导入，只有 8 cm 倍数上的浮点残差会规范化。原生投影的 `nativeProjected` 对象和合法的 `surfaceMount` 组件可保留小数世界位置。梁端点由节点引用，面板只引用节点。`scale` 是无量纲比例，不表示格数。

2026-09-28 为组件增加可选 `surfaceMount: { dir: [0,1,-2], position: [66,0,131] }`，沿用 v1。两字段各为三个绝对值不超过 1000000 的整数；`dir` 至少有两个非零分量，表示原生斜面法线；`position` 是原生安装坐标系内的整数位置，与对象世界 `position` 区别。旧工程无需迁移。校验、JSON、领域适配和历史保留该字段；旧版编辑器不能保证保留它。

原生导出根据对象世界位置逆算整数安装 `origin`，把方向逆变换为安装坐标系内的整数 `rot`，按 `origin/dir` 写入同一物理载具内的多个 `grids[]`。斜面安装网格不等于新的独立物理子网格。整格平移和复制保留小数位置；非整格原点、非局部 90° 旋转和反射几何明确拒绝原生导出。安装帧和仪表盘证据见 [斜面组件吸附](12_INCLINED_PLACEMENT.md)。中间 XML 不保留 `surfaceMount`，仍非无损或游戏兼容格式。

`topology.nodes[].standalone: true` 表示用户通过节点工具显式创建、即使暂未连接梁或面板也应保留的独立节点。结构操作提交时，编辑器会自动删除不被任何梁或面板引用、也不是独立节点或原生投影节点的编辑残留。隐藏状态不是删除依据；仍被有效结构引用的隐藏节点会完整保留。

`topology.edges[].color`、`topology.plates[].color_front` 和 `topology.plates[].color_back` 是可选的 `#RRGGBB` 编辑器 RGB 颜色，用于涂色工具和渲染；原生导入保留的 `col`、`col_front`、`col_back` 仍是可选的 0–255 编号，作为未验证的原生颜色数据。`topology.plates[].normalOffset` 是有限世界单位值。当前内部面渲染把其绝对值作为每个非零法线轴的节点支撑偏移；普通新建为 0.04，三格宽梁为 0.12，零值保持在节点面。可选 surfaceDirection 仅决定正反方向，新建时保存带方向的单位法线；旧镜头向量仍可读取，但不再横向改变轮廓。该偏移不是游戏面板厚度，见 [Plate 复核](15_PLATES.md)。这些字段均是编辑器工程字段；中间 XML 及当前试验性原生回写尚未编码它们，不能据此推断游戏兼容性。

工程 JSON 的 `topology.links` 为编辑器连接模型：每项包含 `id`、`kind`、`from/to` 组件端点（可选 0–255 `port`）及 `points`。六类网络 `electric / mechanical / liquid / gas / belt / data` 可保存最多 256 个整数格路径点；新增 `hydraulic` 表示外置液压缸，必须保存空路径、整数 `lengthMax`（1–10000 格）及有限 `extensionFactor`（0–1）。缸端口不得重复占用；连接工具与原生导出进一步校验同尺寸底座/杆端及原始缩放。底座端口为原始节点索引 2，杆端为 0。

该扩展沿用 v1，现有不含液压缸的工程无需迁移；旧版编辑器不认识新增 kind，因此不能读取包含液压缸的新工程。工程校验、快照和 JSON 序列化保留长度参数；中间 XML 仍不包含连接。原生液压缸写入两端的 `connected_vehicle / connected_component / connected_node_index` 和底座的 `length_max / extension_factor`，保留 `hydraulic_cylinder` 油液状态，不生成 `hydraulic_links` 数组。供油和车轮液压转向继续使用 `liquid_links`。省略默认值、端口尺寸偏移与游戏证据见 [液压连接](11_HYDRAULIC_CONNECTIONS.md)。该模型用于可撤销编辑与诊断渲染，尚未通过真实游戏加载验收。

工程 JSON 的 `topology.mechanicalConnections` 单独保存物理配合件：每项包含 `id`、`type`（`hinge`、`latch`、`mounting`、`rail`、`rail_ballscrew` 或 `tow`）、`from/to` 组件实例 ID、共同约束锚点 `position`，以及可选的 `axis`、铰链 `limits`、安装销双方的 `orientationIndices: [a, b]`（各为 0–31 的整数）。这些可选字段保持 v1 兼容；没有方向编号的旧记录会按当前几何重算。关系在导入和编辑提交时按定义及配合帧自动重建，不属于六类网络 `links`。原生导出把实际配合的刚性两端分开，写入双向 `connected_vehicle / connected_component`、安装方向编号或导轨滑块列表；游戏的 `post_load` 依赖这些显式引用，并不会仅凭 Mesh 重叠恢复所有关系。实现与验证边界见 [自动机械配合](10_MECHANICAL_MATES.md)。

可选的 `visibilityGroups` 是编辑器内的透明化组。每组有稳定 `id`、用户名称以及 `components`、`edges`、`plates` 三类实例 ID；它只保存可见性批量操作，不写入中间 XML 或原生 `.data/.meta`。组内引用必须存在，删除对象后编辑器会在下一次提交时剔除失效引用。

工程文件只引用稳定的组件定义 ID。Mesh、材质和 lazy-loaded 发布 URL 不写进工程 JSON，而由随站点发布的 component index、binding 和 asset manifest 解析；这保证工程可以在没有游戏本体的 GitHub Pages 环境中重建。

当前实现上限为 2000 个组件，位置/旋转绝对值不超过 10000，缩放在 (0, 100]。这些是编辑器输入边界，不是已经验证的游戏建造限制。旋转为 Three.js XYZ 欧拉弧度；8 cm 编辑器晶格与游戏坐标/格点的映射尚未验证。

### 履带连接补充

普通皮带使用同一 `topology.links(kind: belt)` 和原生 `belt_links`，由 `belt` 端口与 `belt_track*` 区分。滑轮及三种发动机轮的半径来自 `get_belt_data`，`reverse` 保存在组件属性中；闭合带面和原始纹理均为派生显示，不序列化几何。两轮单边或多轮闭环生成静态实体，连接与属性保持原有导出规则。来源、六轮真实样本及边界见 [普通皮带](14_BELTS.md)。

履带沿用工程 v1 的 `topology.links(kind: belt)` 与原生 `vehicles[].belt_links`。三种 `belt_track*` 端口类型决定宽度；端口仍使用原始 `logic_nodes` 索引。原生履带边仅保存 `p0/p1` 的 `comp/pos`，省略默认端口 0，不保存派生履带片、路径采样或诊断颜色。两轮一条边即可闭合，多轮须无分叉闭环。未闭合的合法引用仍可编辑保存。静态几何从真实轮心、游戏半径/节距及 32 方向切线生成，详见 [履带](13_TRACKS.md)。没有真实履带存档或游戏加载验收。


## 当前中间 XML

页面导出的 `anymaker-intermediate.xml` 只用于调试和跨工具交换，结构如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- EDITOR INTERCHANGE ONLY. Not a verified Anymaker vehicle save. -->
<anymaker-web-project version="1" name="anymaker-vehicle" game-compatible="false" coordinate-unit="world" grid-cell-size-cm="8">
  <component instance="instance-uuid" definition="engine">
    <position x="0.000000" y="0.000000" z="0.000000"/>
    <rotation-radians-xyz x="0.000000" y="0.000000" z="0.000000"/>
    <scale x="1.000000" y="1.000000" z="1.000000"/>
  </component>
</anymaker-web-project>
```

XML 属性和文本都必须转义。此格式没有原生载具的节点、梁、面板、涂装、组件格点、连接网络或运行时状态，不能直接声称可被游戏读取。

| XML 内容 | 当前来源 | 语义 |
| --- | --- | --- |
| version | 工程 schema 版本 | 目前固定为 1 |
| game-compatible | 固定 false | 不宣称游戏可读取 |
| coordinate-unit / grid-cell-size-cm | 固定 `world` / `8` | 编辑器使用 8 cm 整数格，不声明游戏单位兼容 |
| component.instance | objects[].id | 编辑器实例 ID，非原生整数 ID |
| component.definition | objects[].type | 组件定义 ID，非原生 def 索引 |
| position | objects[].position | 编辑器世界坐标；普通手动对象每轴为 8 cm 整数格，`nativeProjected` 原生投影和 `surfaceMount` 斜面安装可保留小数 |
| rotation-radians-xyz | objects[].rotation | XYZ 欧拉角、弧度 |
| scale | objects[].scale | 编辑器变换，不等于游戏 ext/stretch |

工程 JSON 仍用于内部校验、历史与本地自动恢复，但不再由可见的“保存/打开”按钮导入导出；没有中间 XML 导入器。六位小数输出会有舍入，不能当成无损回读格式。

## 原生样本字段与目标适配

| 已观察路径 | 已知形状 | 需要验证的映射 |
| --- | --- | --- |
| definitions.components | 定义 ID 字符串数组 | components[].def 的整数索引规则 |
| vehicles.vehicles[].transform | m 为 9 数值，t 为 3 数值 | 行/列主序、坐标手性、单位 |
| grids[].origin / dir | 可省略的数值数组 | 网格基向量、默认值及局部坐标关系 |
| grids[].components[] | def/id/pos/rot/colors，部分有 ext/状态 | 旋转矩阵、颜色槽、伸缩及状态默认值 |
| nodes / edges / plates | 节点 ID 与结构引用 | 共点、连通、面板绕序和网格归属 |
| plate_paint | plate_id、正反面 chunks | filled/pixels、grid_pos、颜色索引 |
| *_links | p0/p1、points、color 等 | comp/pos 的端口编码和跨网格坐标 |
| .meta 中 bounds | min/max 数组 | 摘要是否必需、何时重算 |

原生适配器应保留省略字段与未知字段。没有证据时不向原生文件强行填入编辑器 scale 或欧拉角。

涂色索引来自本地 ROM 的 `textures/color_palette.txtr`：文件为 `TXTR` v2、256×1 的 RGBA8 数据，前 85 槽（0–84）不透明，其余槽 alpha 为 0、仅是占位。`scripts/extract-color-palette.mjs` 校验布局并生成自包含的 `src/editor/game-palette.js`；当前来源 SHA-256 为 `ed7f5ca7a55ab5e71769298b5d523d9f81d98563755845968dc684932160027e`。编辑器 RGB 涂色在原生导出时按 8-bit RGB 平方距离取最近的不透明槽，距离相同时取最小索引，分别写入组件 `colors`、梁 `col`、面板 `col_front/col_back` 和连接 `color`；未涂色的原生索引保留。色板仅证明索引对应的纹理 RGB，不等于已复刻游戏光照或材质。

2026-09-25 已按游戏 GCL 函数体修正组件子网格投影，证据见 [子网格变换记录](evidence/native-grid-transform.json) 与 [反编译说明](06_REVERSE_ENGINEERING.md)。省略的 `origin` 为 `[0,0,0]`，省略的 `dir` 为 `[0,1,0]`；只有这两个值同时匹配时使用基础网格的身份变换。其他网格以 `Y = normalize(dir)` 为法线，参考向上方向为世界 Y（仅当 `dir` 平行 Y 时改用世界 Z），`X = normalize(dir × up)`、`Z = normalize(X × Y)`。此前投影世界 X 的方法会转错车门平面内的坐标轴。

子网格的有效原点还包含安装偏移（以下均为格单位）：`origin + 0.5 * sign(dir) + 0.5 * normalize(dir)`。其中逐轴 `sign` 项来自游戏节点立方体朝该法线的面中心、边中点或角；后一项是组件基座的半格法线位移。不能只套旋转而省略这些位移。组件 `pos` 和原生列主序 `rot` 都组合完整网格帧，再按每格 0.08 转换位置。原生节点、梁、面板及连接路径仍属于 vehicle 坐标；适配器将其暂存于第一个 grid 并不改变其坐标归属。

编辑器与原生载具的 X 轴方向相反。导入时先在原生坐标中完成网格和附件变换，再跨 YZ 平面反射位置；旋转矩阵使用 `S R S`（`S = diag(-1, 1, 1)`），Mesh 局部视觉和连接端口同步反射，面板节点顺序反转以保持正反面朝向。导出执行同一逆变换，覆盖组件、结构节点和连接路径点；`.meta` 范围由变换后的原生坐标重算。此映射有非对称结构的自动化往返测试，仍需在游戏中进行同机位视觉对照与加载验收。

当前车辆关联锚点在网格投影后按多体约束枢轴求差。`hinge_knuckle.constraint_position` 已接入；`tow_hitch` 的 surface/logic 位置未替用为约束枢轴。每个子载具的全部已记录锚点须求得同一偏移，不一致会中止投影。斜面网格以 `nativeProjected` 标记保留非整数世界格坐标。上述子网格规则有静态游戏代码证据；完整动态子载具姿态、原生编辑回写和游戏加载兼容性仍未验收。

## 最终导出目标

最终输出目标是游戏原本配套的 `.data` 和 `.meta`；XML 保留为开发交换工具。当前 `toNativePairFromEditor` 已从编辑场景生成成对原生 JSON，并重算 `.meta` 范围；独立原生领域模型的试验回写仍是另一条入口。成对生成不等于正式兼容导出，未知字段、省略值、完整运行状态和实际游戏加载仍待验收。

导出在物理多体划分前，对临时结构副本执行共线冗余点清理和无梁面板角点的边界梁补全。新增梁按无序节点对去重，保留角点位置与面板轮廓；只补原本无梁角点的邻边，不给所有三角剖分边强行加梁。随后使用与子网格按钮相同的结构岛预检，拒绝退化/重复梁、非法面板、面板跨岛引用与悬空连接；分体后再验证每个载具内的节点、梁和面板引用，以及每个导出节点至少有一根相连梁。失败不写文件，规范化不回改工程或原始存档。算法来源、回归及未验证边界见 [原生结构岛](16_NATIVE_ISLANDS.md)。

## 原生 Anymaker 文件待确认项

目前本地证据指向 `.data/.meta` JSON，而不是 XML。正式兼容导出前必须取得游戏真实导出样本或通过受控实验确认：

1. 根对象和载具 ID 的生成规则；
2. 3×3 旋转矩阵、平移、格点坐标和单位换算；
3. `definitions.components` 与 `grids[].components[].def` 的索引关系；
4. 结构 `nodes/edges`、`plates` 与组件实例的关联；
5. 电气、机械、液体、气体、皮带、数据连接的端点表示；
6. 动态组件状态、颜色数组、面板涂装和浮力数据；
7. 未知字段保留、版本升级和游戏加载失败时的诊断方式。

在这些问题完成前，UI 使用“中间格式 XML”名称，不提供“游戏兼容 XML”按钮。
## 当前只读原生适配状态

`src/native/anymaker-data.js` 提供 `.data` JSON 到领域模型的解析，以及配套 `.meta` JSON 的保留。页面的“导入本地载具”与“选择配套 .data / .meta”入口会进入同一配对流程：只接受同名的一份 `.data` 和一份 `.meta`，单独选择、重复扩展名、不同基名、超限文件和非对象 `.meta` 都会拒绝；浏览器只在本地读取、校验后，立即导入组件数最多的主载具及其关联子载具并替换场景。“保存载具”不依赖已导入的原始文件：它由当前编辑器项目直接生成配套 `.data/.meta`，写入观察到的组件、节点、梁、面板及连接 JSON 字段，并生成含身份变换和当前范围的 `.meta`。当前尚未验证游戏对生成文件的加载语义、所有部件状态和复杂子载具层级，不能标为游戏兼容存档。
中间 XML 当前额外保留 `component.grid` 和可选 `<mirror axis="x|y|z" offset="..."/>`，用于编辑器工程交换；这些字段仍然不是原生游戏 schema。

### 原生曲面导入与自动扇形

原生存档可能包含非平面面板。普通导入和“作为子网格导入”统一经过 `prepareNativeImport`：遇到 `nonplanar-plate` 时改用曲面投影校验，通过后在编辑器副本上设置 `surfaceLimitBypass: true` 并保留该面。不会移动节点、修改 raw 数据或写回磁盘上的原文件；无法表示、自交或引用错误的输入继续拒绝，保留当前场景。

工程版本仍为 v1；可选 `surfaceLimitBypass` 只接受 `true` 或省略，不开启时共面校验不变。原生导出只使用标准 nodes/type 等字段，不写该标记。2026-10-06 已暂时移除编辑器“曲面分片”及手动途经节点入口，保留纯数据研究模块和旧工程。创建旁路面板/窗后自动识别有限双平面扇形；无法满足目标平面、完整外梁或原生内缩检查时直接报错，操作不提交。旧旁路面片下载前同样尝试自动合并，仍缺少外边界梁的面不能导出。普通面的旧孤点补梁规则保留，补梁后同样检查所有面边界，避免游戏加载静默丢面。

2026-10-05 新增可选 `topology.plates[].surfaceFanAnchor`，只允许带 `surfaceLimitBypass: true` 的面使用，值必须为该面边界上的节点 ID。它固定双平面单面的扇心，导出按原有正反向规则处理后循环移动此节点至原生 `nodes[]` 首位；不写额外游戏字段。旧 v1 工程缺省该字段，迁移仍保留原始面片。节点合并、结构变换、镜像和子网格导入需要重映射此引用，工程代码和历史保留它。原生导入根据完整边界及可预测的双平面几何恢复此字段；不支持的曲面仍只保留旁路标记。原生梁宽枚举 `size: 1` 对应编辑器 `size: 3`，单面预览和导出使用同一首梁宽度。

旁路曲面下载前可编译为一个原生面：要求同网格、同类型/涂色、相反方向共享边和单一无孔外环；原目标与候选扇形的平面及逐平面面积必须一致，游戏内缩后仍最多两个有效平面且无交叠。单个非平面外环从已有边界节点查找折线，要求折线两侧边界链分别共面并完整覆盖原投影；不能先按普通耳切三角化跨过折线再计算平面数。自动编译处理尚无扇心的旁路面及相连旧面片，下载不修改工程快照，不增加或删除梁。工具栏已移除“双平面单面”按钮，创建旁路面时自动识别处理；Inspector 保留“合并为双平面单面”，直接校验并应用所选已有面片，可撤销。已移除连线草稿预览，见 [双平面单面接入](18_WINDOW_FAN_RESEARCH.md#编辑器接入2026-10-05)。

历史记录：2026-09-28 对 `981.1` 的测试采用删除非平面面板的旧策略；该结果不能代表当前保留曲面的行为。2026-10-02 用户反馈原始曲面可正常导入游戏。初版分片输出 18 根梁，之后改为 15 根梁的分片；两种方案都未满足无内部梁且游戏保留约束的要求。最新指定文件有 12 节点、15 梁、8 个三角窗，所有窗记录都在文件中，但缺少面边界梁，游戏加载调用 `add_plate` 时将其丢弃。该事实更正了此前“无内部梁分片可导入”的推断。字段、加载链和三角化证据见 [15 Plate](15_PLATES.md)。可移植回归见 `tests/surface-split.test.js` 和编辑器浏览器用例。
