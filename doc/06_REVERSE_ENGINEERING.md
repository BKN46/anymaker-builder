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
