# Anymaker 资源与载具架构

本文区分资源中已观察到的字段与尚未验证的运行语义。Stormworks 分析目录提供扫描和反编译方法，不能替代 Anymaker 的格式证据。

## 已验证资源布局

```text
Anymaker/
  game.exe
  rom/
    data/vehicle_component_definitions.json
    data/buildings/starter_vehicle.data
    data/buildings/starter_vehicle.meta
    meshes/components/*.mesh
    meshes/buildings/*.mesh
    textures/**/*.txtr
    languages_components.tsv
```

在当前安装版本中，`rom` 有 10,713 个文件，其中包括 598 条组件定义、3,333 个 `.mesh`、115 个 `.txtr`、204 个 `.data` 和 204 个 `.meta`。完整哈希和扫描结果在 [审计报告](evidence/asset-audit.json)。

## 组件定义

`vehicle_component_definitions.json` 顶层是 `definitions` 数组。编辑器需要保留以下字段：

| 字段 | 用途 |
| --- | --- |
| `id`, `name`, `class`, `category` | 稳定识别、搜索、分类和显示 |
| `mesh_static.mesh_path` | 静态 Mesh 资源引用 |
| `meshes_dynamic[]` | 动态子 Mesh、位置和预览旋转；当前只记录，尚未自动装配 |
| `zones`、`interval`、`mode_x/y/z` | 占用区候选、间隔及 tile/stretch 模式；单位、默认值和确切建造规则待验证 |
| `surfaces` | 结构、机械、扭矩、流体等连接面；包含 `pos/dir/gender/type` |
| `logic_nodes`、`data_descriptors` | 逻辑端口和数据输入输出 |
| `density`、`tech_tier`、`spawn_probability` | 质量估算、科技等级和游戏逻辑参数 |

组件定义是数据驱动的。页面不能根据组件名称猜尺寸，也不能把 Mesh 的视觉包围盒当成建造占用区。

## 原生载具结构

`data/buildings/starter_vehicle.data` 的扩展名虽然是 `.data`，文件内容是 JSON。当前样本包含：

- `definitions.components`：该载具使用的定义列表；
- `vehicles.vehicles[]`：载具实例；
- `transform`：3×3 矩阵 `m` 和平移 `t`；
- `nodes`、`edges`：载具结构节点和梁；
- `plates`、`plate_paint`：面板多边形及逐格涂装；
- `grids[].components[]`：组件实例、定义索引、格点位置、旋转矩阵和组件状态；
- `electric_links`、`mechanical_links`、`liquid_links`、`gas_links`、`belt_links`、`data_links`：不同网络的连接；

`src/native/anymaker-data.js` 已将上述只读结构转换为独立领域模型：车辆级节点/梁/面板/连接只挂到第一个网格，避免因组件网格分组而重复拓扑；组件定义索引、旋转矩阵、颜色槽、状态和未知字段均保存在 `extras.native`，原始 JSON 保存在项目级 `extras.native.raw`。这一步只证明字段可被安全读取，不证明编辑后的模型可以直接写回游戏。
旋转矩阵会同时保留原始 3×3 数组，并在浏览器编辑投影中转换为 XYZ 弧度；矩阵约定仍需与游戏截图/回读样本做最终验证。
- `buoyancy_fill`、`loot_locations`、`creature_locations`：运行时或场景附加数据。

当前样本包含 1 个载具、112 个节点、181 条梁、27 个面板、2 个网格、39 个组件。`.meta` 保存同一载具的变换和 bounds 摘要。

因此，载具模型不是“组件列表 + XYZ”这么简单。原生导入/导出必须同时处理矩阵、格点、结构梁、面板涂装和多种网络；在证据完成前，项目只输出中间工程 XML。

## Mesh v5 观察

已对 ROM 中的组件 Mesh 做二进制验证：文件以 `mesh` 魔数开头，版本为 5，包含一个或多个命名子网格。已确认三种顶点布局（16、28、36 字节步长），其后是三角形索引缓冲区和 8 字节零结束标记。解析器会检查截断、顶点缓冲区、索引边界和未知尾部；不符合已验证布局的文件会明确失败。

这不等于完整的游戏渲染还原：顶点中的 packed color、材质槽、`.txtr` 压缩格式、动态 Mesh 装配、骨骼/动画和游戏 Shader 尚未全部逆向。当前浏览器使用真实静态几何加中性诊断材质。
