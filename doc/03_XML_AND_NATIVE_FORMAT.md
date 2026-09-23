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

工程文件只引用稳定的组件定义 ID。Mesh、材质和 lazy-loaded 发布 URL 不写进工程 JSON，而由随站点发布的 component index、binding 和 asset manifest 解析；这保证工程可以在没有游戏本体的 GitHub Pages 环境中重建。

当前实现上限为 2000 个组件，位置/旋转绝对值不超过 10000，缩放在 (0, 100]。这些是编辑器输入边界，不是已经验证的游戏建造限制。旋转为 Three.js XYZ 欧拉弧度；位置单位和游戏格点换算尚未验证。

## 当前中间 XML

页面导出的 `anymaker-intermediate.xml` 只用于调试和跨工具交换，结构如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- EDITOR INTERCHANGE ONLY. Not a verified Anymaker vehicle save. -->
<anymaker-web-project version="1" game-compatible="false">
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
| component.instance | objects[].id | 编辑器实例 ID，非原生整数 ID |
| component.definition | objects[].type | 组件定义 ID，非原生 def 索引 |
| position | objects[].position | 编辑器坐标，未映射 grid 局部格点 |
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

`src/native/anymaker-data.js` 提供只读 `.data` JSON 到领域模型的解析，以及保留原始字段的 JSON 回写试验。页面的“检查原生文件”按钮会执行领域模型校验；读取成功后可导出 `anymaker-native.data`。导出仍会报告未映射实体，未经过游戏加载验证，因此不能替代原生存档导出。
中间 XML 当前额外保留 `component.grid` 和可选 `<mirror axis="x|y|z" offset="..."/>`，用于编辑器工程交换；这些字段仍然不是原生游戏 schema。
