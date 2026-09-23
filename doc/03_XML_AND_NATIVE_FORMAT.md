# XML、工程 JSON 与原生文件边界

## 当前工程 JSON

浏览器工程 schema 是 `anymaker-web-project` v1：

```json
{
  "format": "anymaker-web-project",
  "version": 1,
  "objects": [
    {
      "id": "instance-uuid",
      "type": "engine",
      "position": {"x": 0, "y": 0, "z": 0},
      "rotation": {"x": 0, "y": 0, "z": 0},
      "scale": {"x": 1, "y": 1, "z": 1}
    }
  ]
}
```

导入时检查格式版本、组件 ID 唯一性、定义存在性、有限数值、变换范围和缩放正值。工程不保存本地绝对路径，不保存用户选择的文件对象。

编辑器空间晶格固定为 `1 格 = 8 cm = 0.08` 世界单位。`objects[].position`、`mirror.offset` 和 `topology.nodes[].position` 的每个世界 X/Y/Z 分量都必须是整数格；真正的非格点值会拒绝导入，只有 8 cm 倍数上的浮点残差会规范化。梁端点由节点引用，面板只引用节点，因此也保持整格。`scale` 是无量纲比例，不表示格数。

`topology.edges[].color`、`topology.plates[].color_front` 和 `topology.plates[].color_back` 是可选的 `#RRGGBB` 编辑器 RGB 颜色，用于涂色工具和渲染；原生导入保留的 `col`、`col_front`、`col_back` 仍是可选的 0–255 编号，作为未验证的原生颜色数据。`topology.plates[].normalOffset` 是有限世界单位值。新建面板以 `0.04`（半格）偏离其节点面。这些字段均是编辑器工程字段；中间 XML 及当前试验性原生回写尚未编码它们，不能据此推断游戏兼容性。

工程 JSON 的 `topology.links` 为编辑器连接模型：每项包含 `id`、六类之一的 `kind`、`from/to` 组件端点（可选 0–255 `port`）及最多 256 个整数格路径点。该模型用于可撤销编辑与诊断渲染，不等同于游戏端口兼容校验；原生 `p0/p1` 的完整语义仍待实际游戏验证。

工程文件只引用稳定的组件定义 ID。Mesh、材质和 lazy-loaded 发布 URL 不写进工程 JSON，而由随站点发布的 component index、binding 和 asset manifest 解析；这保证工程可以在没有游戏本体的 GitHub Pages 环境中重建。

当前实现上限为 2000 个组件，位置/旋转绝对值不超过 10000，缩放在 (0, 100]。这些是编辑器输入边界，不是已经验证的游戏建造限制。旋转为 Three.js XYZ 欧拉弧度；8 cm 编辑器晶格与游戏坐标/格点的映射尚未验证。

## 当前中间 XML

页面导出的 `anymaker-intermediate.xml` 只用于调试和跨工具交换，结构如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- EDITOR INTERCHANGE ONLY. Not a verified Anymaker vehicle save. -->
<anymaker-web-project version="1" game-compatible="false" coordinate-unit="world" grid-cell-size-cm="8">
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
| position | objects[].position | 编辑器世界坐标；每轴为 8 cm 整数格，未映射原生 grid 局部格点 |
| rotation-radians-xyz | objects[].rotation | XYZ 欧拉角、弧度 |
| scale | objects[].scale | 编辑器变换，不等于游戏 ext/stretch |

目前仅实现工程 JSON 导入和 XML 导出；没有中间 XML 导入器。六位小数输出会有舍入，不能当成无损回读格式。

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

## 最终导出目标

最终输出是游戏原本配套的 `.data` 和 `.meta`，不再以 XML 为最终格式。当前 XML 仅保留为开发交换工具。已有 `.data` 回写入口处理的是独立原生领域模型，不会自动同步当前场景编辑；不存在完整的 `.meta` 导出器，不能视为正式的载具导出。须完成单位/父级变换、ID 与连接引用、涂装/状态、未知字段和省略值保留、包围盒重算以及实际游戏加载验证后，才实现正式成对导出。

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

`src/native/anymaker-data.js` 提供只读 `.data` JSON 到领域模型的解析，以及配套 `.meta` JSON 的保留。页面的“导入本地载具”与“选择配套 .data / .meta”入口只接受同名的一份 `.data` 和一份 `.meta`，单独选择、重复扩展名、不同基名、超限文件和非对象 `.meta` 都会拒绝；浏览器只在本地读取，确认后才替换场景。`.meta` 当前仅作为未知元数据保留，未参与未验证的坐标、bounds 或游戏语义推断。无编辑导出会成对保留 `.data/.meta` 的完整 JSON 值，并执行字段级 round-trip 校验；它不是当前场景编辑后的回写，也未经过游戏加载验证，因此不能替代原生存档导出。
中间 XML 当前额外保留 `component.grid` 和可选 `<mirror axis="x|y|z" offset="..."/>`，用于编辑器工程交换；这些字段仍然不是原生游戏 schema。
