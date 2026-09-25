# 本地反编译分析

`game.exe` 和完整游戏目录都是本地只读输入，绝不提交、复制到 `public/`，也不成为网页运行时依赖。

本仓库通过 `scripts/Invoke-AnymakerGhidraAnalysis.ps1` 调用已安装的 Ghidra 分析工作台。该工作台负责保存大型反编译产物；本仓库只保留经过筛选、可复查的结论和小型证据摘要。

```powershell
./scripts/Invoke-AnymakerGhidraAnalysis.ps1 `
  -GameExe 'I:\SteamLibrary\steamapps\common\Anymaker\game.exe' `
  -AnalysisWorkspace 'D:\00Data00\Stormworks\analysis' `
  -FullAnalysis -LightAnalysis
```

分析会导出 PE 信息、导入表、函数清单、定义字符串、字符串交叉引用、调用图和按相关性筛选的反编译 C 文件。`-LightAnalysis` 会关闭已知易耗尽内存的常量传播分析器；没有真实证据时，不能把 Ghidra 伪代码当作已验证的游戏行为。

连接、端口、子网格挂接等结论必须记录所用 Ghidra run ID、产物路径和可复现实验。游戏逻辑结论与编辑器当前实现需分别标为“已验证事实”“当前实现”或“待验证”。

## 当前证据

已验证事实（本机只读分析）：2026-09-23 的 run `20260923_213555` 位于 `D:\00Data00\Stormworks\analysis\artifacts\ghidra\20260923_213555\game`，导出了 9,787 个函数、2,123 个字符串交叉引用和 358 个反编译 C 文件。该可执行文件为 x86-64 PE，存在 Jolt 物理、hinge 与 constraint 相关符号/字符串。

待验证：这批产物尚未给出 `.data` 中 `electric_links`、`connected_vehicle` 等字段到运行时端口或父级变换的直接引用。因此编辑器按 `connected_vehicle` / `connected_component` 补齐关联子载具、并按组件定义的 `logic_nodes` 显示网络端口，属于可审计的当前实现，不代表已证明与游戏连接、旋转和约束逻辑完全一致。

### 子载具约束（2026-09-24）

已验证样本事实：参考载具的 551、552、554 子载具均同时含有 hinge 与 tow 连接记录。若直接比较组件原点，锚点会相差一格；将定义文件 `public/data/definitions/hinge_knuckle.json` 的 `constraint_position: [0, 0, -1]` 按组件列主序旋转变换后，七条记录恰好各自求得同一子载具刚体偏移。`tow_hitch` 的 `surface.pos` 与 `logic_nodes.pos` 不参与这一计算：把它们当作枢轴会与同一份样本的 hinge 偏移冲突。

已验证的只读 GCL 代码区：run `20260924_202337` 导出的 `server_scene.vehicle_component.hinge_knuckle.connect_multibody.c` 位于 `D:\00Data00\Stormworks\analysis\artifacts\anymaker-gcl\20260924_202337`，该类型将多体连接委托给基类；run `20260924_202458` 导出的 `server_scene.vehicle_component.tow_bar.connect_multibody.c` 位于对应目录，调用记录包含双方 `get_transform`、格点转换和 `physics.scene.create_constraint_point`，但不包含 surface/logic 端口读取。这支持当前将端口与多体约束枢轴分开的导入实现；Ghidra 伪代码本身仍不足以证明所有连接器和运行时姿态的完整语义。

### 车门把手与组件子网格（2026-09-25）

已验证的静态代码事实：本次只读检查 `bin/game.gcl`（SHA-256 `32c1389e6bbc49aeae5a7eff93f2f580fed78ec453a69e6a491c014253e4ae09`），按函数记录、重定位符号、机器码和常量交叉核对。Ghidra 本地 run 为本仓库忽略目录 `tmp/door-grid/DoorGridVerified`，伪 C 输出在 `tmp/door-grid/`；可提交摘要为 [native-grid-transform.json](evidence/native-grid-transform.json)。没有启动或修改游戏。

此前脚本的 `0x126C738 / 0x78` 实际属于 `client_scene.vehicle_grid.get_transform`。其最后一个调用重定位恰好是 `vehicle_util.grid_origin_dir.get_transform`，不能把最后一个引用的签名当成随后的机器码所有者。本次核对了代码后的函数所有者名称，修正该脚本目标，并登记以下真实函数体：

| 函数 | 代码偏移 / 长度 | 静态证据 |
| --- | --- | --- |
| `vehicle_util.grid_origin_dir.get_transform` | `0x3C4E8EC / 0x500` | 非基础网格组合 orientation、origin、节点表面偏移与半格法线偏移 |
| `vehicle_grid_util.get_grid_axis_normals` | `0x3BD9834 / 0x348` | up 默认 Y，平行 Y 时改为 Z；X = dir × up，Y = dir，Z = X × Y，分别归一化 |
| `vehicle_util.grid_origin_dir.get_orientation` | `0x3C4E16F / 0x130` | 三个轴传入 mat33 构造器 |
| `vehicle_plate_util.get_plate_node_surface_offset` | `0x3C198C9 / 0x900` | 一轴取面中心，两轴取最靠外两个角的中点，三轴取最靠外角；get_transform 传入 edge_size=0 |
| `vehicle_plate_util._g_plate_node_corners.$ctor` | `0x3BE0721 / 0x280` | 八个角各分量为 ±0.5 格 |
| `vehicle_util.grid_origin_dir.get_is_base_grid` | `0x3C4DBB3 / 0x160` | origin=0 且 dir=(0,1,0) 才是基础网格 |
| `vehicle_util.grid_origin_dir.parse_json` | `0x3C4F332 / 0x230` | origin 默认 (0,0,0)，dir 默认 (0,1,0) |

因此对非基础网格，格单位有效原点为 `origin + sign(dir) * 0.5 + normalize(dir) * 0.5`，其中 sign 逐轴计算。旧实现虽然正确把 dir 用作局部 Y，却使用世界 X 投影决定平面内朝向，并漏掉安装偏移；车门法线 `(±6, ±1, 0)` 恰好触发明显错位。仪表台 `(0,1,-2)` 的原朝向碰巧正确，但也缺少安装偏移。

当前实现：`nativeGridFrame` 接入上述规则，原生适配器正确补齐省略的 dir，拒绝零向量及非法方向；组件位置、旋转、连接锚点及编辑位移逆变换共用该帧。vehicle 层级的结构和连接路径不叠加组件网格变换。参考文件中四个门把手（551 的 5/6、552 的 3/8）的独立计算位置和安装法线已记录在证据 JSON，用于单元回归与浏览器实际场景快照检查；浏览器整车居中后改比对相对主车铰链的位置。

只读复核命令（需要用户授权的本地游戏输入）：

```powershell
node scripts/check-native-grid-evidence.mjs 'I:\SteamLibrary\steamapps\common\Anymaker\bin\game.gcl'
./scripts/Invoke-AnymakerGclAnalysis.ps1 `
  -GameGcl 'I:\SteamLibrary\steamapps\common\Anymaker\bin\game.gcl' `
  -AnalysisWorkspace 'D:\00Data00\Stormworks\analysis' `
  -KnownFunction vehicle_util.grid_origin_dir.get_transform
```

第一条命令核对整个 GCL 指纹、七个函数记录的签名/大小/所有者/重定位/代码哈希、八项常量及测试载具指纹。它验证静态证据，不能替代运行时游戏验收。待验证：真实游戏同机位像素对照、动态开门状态、完整材质和任意原生导出加载。

本次实际验证：`npm run check` 的 71 项单元测试和生产构建通过；证据复核命令通过。编辑器浏览器套件首次为 14 通过、6 失败：把手新增断言未考虑整车居中，改为相对位置后专项通过；历史面板页面加载超时单独重跑通过。其余四项（单组件原生导入、选择筛选工具栏遮挡、旧目录 DOM 断言、玻璃流程涂色）在保留原有用户改动、仅撤去本次变换修复的副本中也复现，未作为本次回归修复。日志保留在忽略目录 `tmp/door-grid/{check,browser,browser-reference,browser-history,browser-baseline}.log`，实际渲染截图为 `tmp/door-grid/reference-vehicle-door-handles.png`；不能把完整浏览器套件称为通过。

### 梁几何（2026-09-23）

已验证事实：游戏目录的 `bin/game.gcl` 包含带函数签名及 x86-64 机器码的 GCL 产物，而不是仅有资源。仓库新增 `scripts/Invoke-AnymakerGclAnalysis.ps1` 与 `scripts/ExportAnymakerGclFunction.java`，可将它作为 Raw Binary 载入 Ghidra 后，仅对已登记的代码区间反汇编和导出伪 C；游戏文件和大型输出仍只放在本机分析工作区。

本机 run `20260923_234711` 的 `client_scene.vehicle_edge.debug_render_geometry.c` 位于 `D:\00Data00\Stormworks\analysis\artifacts\anymaker-gcl\20260923_234711`。结合同一 GCL 的符号记录，确认：

- 静态入口是 `vehicle_edge_util.add_static_geometry(vec3_s32, vec3_s32, s32, s32, vehicle_plates_edges_builder)`；
- 它先将端点转换为世界格点、计算端点差的非零轴数和 min/max，再调用 builder 的 `add_edge_quad` 与 `add_edge_triangle`；
- 客户端调试几何同样按非零轴数分支；三轴分支建立八个格点角并绘制六个四边面，其他分支使用三角面/四边面组合。

因此“八边形梁”与“任意朝向的通用圆柱梁”均已被证据否定。编辑器现有 `BoxGeometry` 和节点覆盖件只是临时投影，尚不能称为原版梁网格。要替换它，下一步必须继续解出 `vehicle_edge_util.add_static_geometry` 的调用重定位和每个分支的 `add_edge_quad` / `add_edge_triangle` 顶点顺序，并用游戏截图或运行时观察复核。

```powershell
./scripts/Invoke-AnymakerGclAnalysis.ps1 `
  -GameGcl 'I:\SteamLibrary\steamapps\common\Anymaker\bin\game.gcl' `
  -AnalysisWorkspace 'D:\00Data00\Stormworks\analysis' `
  -KnownFunction client_scene.vehicle_edge.debug_render_geometry
```
