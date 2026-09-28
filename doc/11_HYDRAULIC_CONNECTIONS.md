# 液压油路与液压缸连接

## 来源与已验证事实

本次参考 Workshop 作品 `3809467608` 的配套 `vehicle.data / vehicle.meta`，以及匹配版本的 `bin/game.gcl`。源文件只读，不覆盖存档，也不启动游戏。选定的 11 个函数记录、定义哈希、常量地址与样本指纹见 [液压连接证据](evidence/hydraulic-connections.json)；记录的 GCL 为 81,870,449 字节，SHA-256 为 `d9725681f1b0bff321c58fcadc0d2e12104919a541eef074cf12945b283edb75`。其他版本不得直接沿用这些偏移。

样本的 vehicle 2168 包含 105 个组件、58 节点、77 梁、11 面板。连接数量为 electric 3、mechanical 16、liquid 22、gas 10、belt 5、data 0。它没有外置液压缸底座/杆端，也没有 `hydraulic_links` 数组。

样本中的组件 26、27 为 `wheel_c`，定义类为 `wheel_hydraulic`。原始逻辑节点 0、1 是两路液体转向接口，节点 2 是气体刹车接口；液体阀 36–39 与车轮形成四条转向油路。这些线路使用已有 `liquid_links`，车轮的 `hydraulic_cylinder` 保存两腔油液状态。界面中仍用“液体管线”连接泵、阀、油箱和液压元件的供油口。

## 外置液压缸的游戏规则

外置缸是跨物理子网格的约束连接，游戏通过两端组件引用恢复。它不能作为普通管线写入一个臆造的 `hydraulic_links` 数组，也不能按铰链逻辑把两个锚点压到同一点。

| 尺寸 | 底座定义 | 杆端定义 | logic node size |
| --- | --- | --- | --- |
| 1×1 | hydraulic_cylinder_connector_base | hydraulic_cylinder_connector | 0 |
| 2×2 | hydraulic_cylinder_connector_base_2_2 | hydraulic_cylinder_connector_2_2 | 1 |
| 3×3 | hydraulic_cylinder_connector_base_3_3 | hydraulic_cylinder_connector_3_3 | 2 |

- 底座原始节点 0、1 是 `liquid`，节点 2 为 `hydraulic_base`；杆端节点 0 为 `hydraulic`。过滤界面显示后仍保留原始索引。
- 连接必须是同尺寸底座与杆端；不允许同一缸接口重复占用。无论用户先点哪端，工程都按底座 → 杆端保存。
- `logic_node.get_size_offset` 对奇数 size，在法线以外两个轴增加半格偏移；偏移在 `center_stretch` 延伸之后添加。2×2 底座的 `[0,1,0]` 锚点因此为 `[.5,1,.5]`，杆端为 `[.5,0,.5]`。
- 游戏拖拽工具按两端世界锚点距离计算 `length_max = round(distance / 0.08)`，新连接 `extension_factor = 1`。原生省略值分别为 8 与 0。当前编辑器只接受长度 1–10000 格、伸缩比例 0–1；这是编辑器输入限制，不是已验证的游戏上限。
- 双方保存 `connected_vehicle`、`connected_component`、`connected_node_index`。底座另外保存 `length_max`、`extension_factor` 和 `hydraulic_cylinder` 状态。

上述结论来自 `vehicle_editor_hydraulic.state_edit_hydraulic_nodes_drag.tick`、`can_add_hydraulic_link`、两端的 `parse_save_data / post_load` 和底座 `connect_multibody`。证据摘要不包含反编译全文或游戏二进制。

## 当前编辑器实现

在“连接”工具中选择“液压缸”，依次点击同尺寸底座和杆端。界面显示端口角色、连接预览和可选取的伸缩缸诊断外形；尺寸不匹配、端口占用、非原始缩放和无效距离给出中英文错误提示。供油仍使用独立的“液体管线”选项。

`src/editor/hydraulic-connections.js` 负责端点校验、方向归一、初始长度与原生引用恢复。六种端点的最小定义通过 `scripts/extract-hydraulic-profiles.mjs` 从已发布定义生成，运行时自包含，不依赖游戏目录。端口刷新后拾取会立即同步世界矩阵，避免等待下一渲染帧期间漏掉连续点击。

工程在 `topology.links` 中保存 `kind: "hydraulic"`、底座/杆端引用、`lengthMax`、`extensionFactor` 和空 `points`。它复用选择、删除、撤销/重做与独立显隐流程，但不焊接两个子网格。视口随端点位置绘制缸体，不模拟压力或约束运动。

原生导出复用已有刚性结构划分，为两端生成独立 vehicle 及双向组件/节点引用；油液状态保留，关系字段按当前连接重新生成。删除连接后不输出旧引用与旧缸长。原生导入读取双向引用及省略值，保留两端距离，拒绝缺失、矛盾引用及异常长度。当前会阻止反射几何液压缸、两端同属刚性结构，以及其他普通网络跨物理 body 的导出；这些限制沿用当前原生适配边界。

## 复核与未验收项

从仓库根目录运行：

```powershell
node scripts/extract-hydraulic-profiles.mjs
node scripts/check-hydraulic-evidence.mjs <game.gcl> [vehicle.data]
npm run check
npm run test:browser:editor
```

证据检查脚本只读验证 GCL 指纹、函数体/签名/常量和已发布定义。可选样本路径需要同目录配套的 `vehicle.meta`；检查 105 组件、结构数量、全部网络数量、22 条液体管线路径与端口索引、4 条车轮转向油路和油液状态的编辑器导出/重导入，并复核输入哈希没有改变。该样本没有外置缸，外置缸回归使用 `tests/hydraulic-fixtures.js` 的三种最小装配样本。

`tests/hydraulic.test.js` 已显式纳入现有单元入口，覆盖三尺寸、半格偏移、底座/杆端原始索引、双向关系、长度省略值、坏引用、占用、状态保留和子网格独立性。浏览器流程覆盖实际点击、中英文、重复占用、显隐、撤销/重做、双文件下载、原生重导入保持距离，以及删除缸体。

真实游戏加载、动力学、油压/流量模拟、任意仿真姿态和游戏缸体 Mesh/材质对照尚未验收。中间 XML 仍不保存连接，不能用作液压工程的无损交换格式。
