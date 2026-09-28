# 自动机械配合与原生多体连接

## 问题与已验证事实

样本 `981.1.data` 中，hinge pin（原生组件 4）和 hinge knuckle（原生组件 5）的约束锚点、安装方向吻合，但双方没有 `connected_vehicle / connected_component`。它们及主车架、车门的结构还在同一个 vehicle 中。旧导出也把所有对象压入一个 vehicle，并未输出这些引用。

与旧格式说明不同，游戏并不会在载入时仅凭两个 Mesh 的位置自动补出所有铰链。对匹配版本的游戏 GCL 进行静态分析后，确认 `hinge_pin.post_load` 读取保存的 vehicle/component ID 并查找另一端，再调用多体连接代码。连接函数使用双方 vehicle 的物理对象建立约束，写入互相指向的引用。把这些关系存成编辑器诊断记录或 `mechanical_links` 都不够。

来源指纹、37 个函数的签名/偏移/长度/哈希及样本摘要见 [机械配合证据](evidence/mechanical-mates.json)。所有结论以该 GCL 的 SHA-256 为准；不同版本不能沿用偏移。原始游戏文件、存档和反编译全文没有加入仓库。

## 当前实现

| 配合 | 定位规则 | 原生保存字段 |
| --- | --- | --- |
| Hinge pin / knuckle | 约束锚点重合，匹配双方 constraint_orientations | 双向 connected_vehicle / connected_component |
| Latch pin 或 handle / knuckle | 定义的约束锚点与方向 | 同上 |
| Mounting pin / knuckle | 约束锚点与双方离散配合方向 | 双向引用，双方各自的 con_orient_index |
| Rail / slider | 同轴，滑块在当前伸缩长度内 | rail 的 connected_components 列表；每个 slider 的反向引用 |
| Ballscrew rail / slider | 同轴，包含中心伸缩段的有效长度 | 同上 |
| Tow bar / hitch、truck kingpin / hitch | 约束锚点重合，双方配合轴夹角满足各自 dot_min | 双向引用 |

游戏客户端的离散安装计算是 `Rb = Ra × Ca[i] × Cb[j]`，再让双方变换后的 constraint_position 重合。矩阵在原生侧是列主序；编辑器侧同时处理 X 反射、XYZ 欧拉弧度和每格 0.08 的单位转换。

拖钩不能复用普通接口的默认方向：`vehicle_component_definition.parse_json` 中 `tow_hitch_dir` 默认是 3（+Y），`tow_hitch_dot_min` 默认是 0。`tow_bar.tick_multibody` 比较双方各自的世界配合轴，要求点积同时达到双方阈值；不限制绕配合轴的偏航。编辑器只自动处理锚点重合的建造状态，不复刻游戏模拟中距离小于一格的吸附。

- `src/editor/mechanical-connections.js` 在导入、移动、旋转、复制、删除、撤销/重做和保存时重算关系。分离后清除旧引用，重新对齐后恢复。隐藏对象仍参与建造连接。
- `src/editor/mechanical-mate-profiles.js` 只包含 15 类配合件的小型描述，由已发布定义生成；运行时无需 ROM、安装目录或额外转换服务。完整组件定义仍按需加载。
- Inspector 显示选中配合件的自动连接数量，覆盖英文和中文。多个候选同时占用同一销/滑块时不任意选择，原生导出明确报错；导轨可以带多个不同位置的滑块。
- `src/editor/mechanical-bodies.js` 用结构节点/梁/面板及组件安装面推导刚性归属，把实际配合的两端导出到不同 vehicle。节点、梁、面板与组件一起分组，不把 gridId 当成物理刚体，不通过渲染包围盒重叠焊接配合两端。
- 原生导出重新分配并重建关系 ID，清理旧的导轨滑块列表和安装方向编号。节点/边/面板与网络线保留在所属 body；meta 为每个 body 写入独立 transform/bounds。
- 导入根 vehicle 会遍历单一引用和导轨的滑块列表；导轨的纵向位置不会被一般的锚点对齐流程归零。

## 验证与边界

原始样本只读回归：主车架导出为 84 节点、153 梁、54 面板、4 个组件；车门为 7 节点、8 梁、2 面板、2 个组件。pin 指向 vehicle 2/component 5，knuckle 指回 vehicle 1/component 4。重新仅从根 vehicle 导入，保留 6 个组件、91 节点、161 梁、56 面板及 1 个铰链；组件位置不变。原文件哈希前后一致。

单元回归覆盖全部配合类型、安装方向编号、轴向不匹配、距离误差、拖钩容差、多滑块、复制重建、原生分组、错误引用/歧义、刚性焊死、跨刚体线路及快照独立性。浏览器回归覆盖实际 Inspector 编辑、中英文数量、撤销/重做、双文件下载与双向引用。

目前尚未执行真实游戏载入与动力学验证，因此不能把该导出称为已验收的任意游戏存档兼容格式。刚性归属是编辑器针对已知安装面和结构的推导，尚未等同于游戏的全部附着判定：复杂斜面、梁/面板相交、特殊动态部件、任意仿真姿态仍需样本与运行时对照。以下情况会阻止该次导出，而非静默丢弃关系：同一刚性结构的两端、歧义配合、缩放配合、无法表达的反射配合、跨刚体网络线。跨刚体网络接口仍需单独实现，编辑器也不进行铰链运动仿真。

重建描述（不读取游戏，不重新生成 Mesh）：

```sh
node scripts/extract-mechanical-mate-profiles.mjs
npm run check
npm run test:browser:editor
```

只读核对游戏证据：

```sh
node scripts/check-mechanical-mate-evidence.mjs <game.gcl>
```

该命令在版本指纹不匹配时停止。需要复查反编译时，使用证据中的签名、codeOffset 和 codeSize，以及仓库现有 `ExportAnymakerGclFunction.java`；先把同一哈希的 GCL 重新导入 Ghidra，避免在旧项目中套用新偏移。
