# 接口识别色与局部材质

## 已验证的资产事实

证据来自仓库已发布的 gzip Mesh、组件 definition/binding，以及加载这些文件的回归；本次未读取或重新生成 ROM 资源。

- Mesh part 名称不能作为材质区域边界。例如 wheel_hub_a_base.mesh 只有一个 mechanical_surface_f part，内部同时存在机身和机械接口。
- mechanical_bracket.mesh、gear_box_a.mesh 含有接口颜色，但 part 名称分别为 mechanical_bracket、small_engine_mating_surface。扩大名称匹配不能解决漏色。
- RGBA [153,0,0,255] 在电机外壳和多种接口外框上出现，不能把它统一解释为液体接口红色。电机另有 [153,37,0,255] 大面积机身区域。
- 独立接口的 binding 包含 cable_end_a.mesh / cable_end_b.mesh，且 addComponentTool: false。无条件装配这些端头会盖住接口正面的识别色；实际浏览器截图复现了这种遮挡。
- 气体金色还出现在仪表刻度和建筑上，不能只凭相同 RGB 就把仪表认作接口。

下表为真实发布 Mesh 上的局部识别色三角面数。数量由 tests/unit.test.js 对原文件加载并断言，不是手工绘制的替代模型。

| Mesh（meshes/components/） | 识别色 | 三角面数 |
| --- | --- | ---: |
| interface_electric_a.mesh | #ff3131 | 132 |
| interface_data_b.mesh | #1860ff | 18 |
| interface_gas_a.mesh | #997100、#cc9900 | 48 |
| interface_mechanical_f_a.mesh | #1e9999、#ffcc31 | 38 |
| wheel_hub_a_base.mesh | #1e9999、#ffcc31 | 48 |
| mechanical_bracket.mesh | #1e9999、#ffcc31 | 32 |
| gear_box_a.mesh | #136666、#1e9999、#ffcc31 | 32 |
| engine_block_a_0_0_0.mesh | 扭矩配合面暗青色环 #136666 | 16 |
| manifold_pipe_c_straight.mesh | #ff3131 | 6 |
| air_manifold_a.mesh | #1e9999、#ffcc31 | 16 |

## 当前实现

src/assets/mesh-interface-colors.js 在加载时依据上述已确认的 RGB 对三角面分组。一个三角面的三个顶点都必须属于识别色，才使用受保护的接口材质；含普通机身顶点的混合三角面仍走机身材质。

- 机身保持中性诊断材质，可正常涂装；接口使用白色材质基色乘以局部顶点色。
- 顶点色按 sRGB 转为 Three.js 的线性输入；原始 RGBA 保存在 gameColorBytes，不会修改解析缓存。
- 气体色仅对已确认的 interface_gas_a/b.mesh 生效；普通仪表和机身色不会因相近颜色进入接口分组。
- 本地 Mesh 和发布 Mesh 共用同一实现。涂装与子网格视图按**材质**跳过接口，不能跳过整个混合 Mesh。
- 发布装配仅排除独立 interface_* 类中明确 addComponentTool: false 的两类线端头。轮毂悬挂等其他动态 Mesh 继续装配，不全局过滤这个默认值。
- 分组只在实例化时计算，每个受影响 part 最多两个绘制组，不逐帧扫描、不叠加辅助球、不创建逐面材质。镜像克隆保留分组与颜色，释放沿用 disposeObject。

## 回归与边界

- 单元回归使用真实发布文件，覆盖两条加载链、原始颜色/索引不变、机身与接口隔离、气体与仪表区分、镜像和材质释放。
- 装配回归验证独立接口不被无条件线端头遮盖，轮毂动态装配仍存在。
- tests/browser/editor.spec.js 中的 native interface colours 用例导入真实组件，读取 WebGL framebuffer 中的红、蓝、青、黄像素，并生成正面/背面截图；还检查涂装、撤销/重做、局部镜像、子网格视图及退出连接工具后的显示。
- 液体接口和部分独立扭矩接口的已发布顶点通道没有上述彩色识别区域，因此仍保留诊断材质，不把外壳的深红通道强行当作接口色。这不代表已确认它们在游戏中没有其他材质或着色规则。
- 本次不声称完整游戏材质、所有原生动态连接状态或游戏画面 1:1 还原；缺少证据的 packed color/材质槽仍待研究。

本次实际验证：136 项单元测试、48 项编辑器浏览器用例全部通过；发布资源检查通过（797 个引用 Mesh、865 个 manifest 条目，保留 1 个 opaque 原生变体）。浏览器测试服务先完成 Pages 子路径生产构建，并将临时产物写入 dist，未改动已提交的 docs 发布目录。正面和背面截图已人工查看；未执行真实游戏加载或 1:1 对照。
