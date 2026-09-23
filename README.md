# Anymaker Builder

使用 Three.js + Vite 的纯前端桌面建造器原型，目标是在 GitHub Pages 上建造载具、显示真实游戏组件并导出经过验证的载具文件。

现阶段支持 598 条组件定义搜索、开发阶段本地 .mesh 导入与静态几何显示、基础放置/变换/删除、工程 JSON 保存加载、撤销重做和中间 XML 导出。静态模型使用中性诊断材质，尚未达到游戏视觉 1:1；原生游戏文件兼容性也尚未完成。

最终交付要求是独立前端：GitHub Pages 必须自带完整解析入库后的组件 Mesh、材质、动态 Mesh 依赖和 manifest，首次使用不需要 Anymaker 游戏本体、`game.exe` 或本地 ROM。允许通过 Draco/Meshopt/KTX2 等方式压缩，运行时按组件 lazy loading；压缩、转换和完整性均需有可审计记录。

## 本地工作区

界面默认英文，左上角可切换中文。XYZ 方向指示器提供六向、等距和聚焦视角；右侧可设置网格颜色、透明度及实线/虚线。工具栏独立悬浮，左右侧栏中部把手用于折叠展开。

全局空间单位固定为整数格：`1 格 = 8 cm = 0.08` 世界单位。组件原点、节点、梁端点、面板顶点、镜像偏移及复制/移动位移均必须对齐世界 XYZ 整数格；缩放仍为无量纲比例。编辑器当前将梁临时投影为边长一格、两端各延伸半格的矩形实体，并以共享节点覆盖件缓解独立梁段的接缝；这不是游戏网格。已从 `game.gcl` 确认游戏梁按端点的非零轴分支，以 `quad` 和 `triangle` 构建格点几何，绝非八边形或通用圆柱；精确静态面片拓扑仍在从定向反编译中还原，当前实现不得视为游戏原始算法。连接按保存的路径点绘制实体分段，并在折点使用融合件，替代旧的独立虚线。面板通过选择组成单一闭合环的梁后按 Enter 创建，并沿其法线偏移半格。梁和面默认浅灰色；涂色工具可保存原生样本已观察到的梁 `col`、面板 `col_front`/`col_back` 编号，并显示诊断色预览，尚非游戏调色板或材质还原。两击建梁时 XYZ 标尺仅显示整数格与厘米，视口“Axis snap / 轴向吸附”按钮或建梁时按 `A` 可切换单轴吸附；默认关闭，启用后自动选择世界轴，只保留该方向的整格位移，同轴已有节点优先。节点不显示内部 ID；右侧工作网格设置可保存节点颜色、大小和透明度。

设置保存在当前站点的 `localStorage`；载具工程每分钟自动备份，重新打开同一地址时校验恢复。存储禁用、损坏、容量不足或多标签页覆盖冲突会显示提示。仅保存已提交编辑器数据，不保存本地 Mesh 文件；清理浏览器数据会清除备份，请定期下载工程 JSON。

最终游戏导出目标为配套 `.data` / `.meta`，现有 XML 仅用于开发交换。`test-vehicle/vehicle.data`、`vehicle.meta`、`vehicle.png` 是渲染对照基准：导入默认选择主载具 553，转换 8 cm 格坐标、组件/拓扑 ID、颜色索引与玻璃面板，并进入黑底“参考预览”以便人工对照。游戏相机、光照、调色板和材质尚无证据，不能称为参考图像匹配通过；验收范围见 `TODO.md`。

## 当前安排

按 [TODO.md](TODO.md) 先完成设计，再继续实现。镜像、子网格拆分/复制/移动/合并及组件 Mesh 分文件是核心工作。触屏、手机和平板适配暂缓。

- [doc 文档入口](doc/README.md)
- [系统架构](doc/01_SYSTEM_ARCHITECTURE.md)
- [Anymaker 架构](doc/02_ANYMAKER_ARCHITECTURE.md)
- [XML 与原生格式](doc/03_XML_AND_NATIVE_FORMAT.md)
- [Component / Mesh 拆分](doc/04_COMPONENT_MESH_SPLIT.md)
- [镜像与子网格操作](doc/05_BUILD_OPERATIONS.md)

## 开发与检查

```powershell
npm ci
npm run dev
npm run check
```

日常默认只运行 `npm run check`（单元测试 + 构建）。仅改动编辑器交互时运行 `npm run test:browser:editor`，仅改动设置/恢复时运行 `npm run test:browser:preferences`；资源、manifest 或转换脚本改动才运行 `npm run check:assets`。发布前或跨模块重构再运行完整的 `npm run check:full`。首次浏览器检查前执行 `npx playwright install chromium`。

生产输出在 `docs/`；默认相对 base 支持静态子路径。Pages 使用 GitHub 的“Deploy from a branch”模式，直接托管已提交的 `main /docs`，不在 Actions 中安装依赖或编译。发布前在本地执行 `npm run check` 和 `npm run build`，将更新后的 `docs/` 一并提交；仓库 Settings → Pages 需选择 `main` 分支和 `/docs` 目录。`docs/.nojekyll` 会使 Pages 直接提供静态文件。尚无实际线上发布验收记录。

## 本地资源

顶部“导入本地载具”必须同时选择同名配套的 `.data` 与 `.meta` JSON 文件（例如 `vehicle.data` / `vehicle.meta`）；浏览器仅在本地读取、校验并保留元数据，确认“导入 .data / .meta 到当前场景”后才替换当前场景。该流程是格式研究入口，不代表原生 round-trip 或游戏加载兼容。开发用 `.mesh` 文件仅在右侧资源面板选择，用于解析器与几何审计；正式发布模型仍来自 Pages 的 `public/assets`，不能要求用户提供游戏资源。

当前解析器支持 Mesh v5 的三种静态布局；发布资产已覆盖组件引用的 794 个 Mesh，其中 793 个完成几何解析，1 个特殊 blurred 原生变体以完整 raw bytes 入库并标记 opaque。packed color、材质和动态装配仍需研究。数据来自 [审计报告](doc/evidence/asset-audit.json)，不是视觉一致性验收结果。

```powershell
node scripts/extract-catalog.mjs "I:/SteamLibrary/steamapps/common/Anymaker/rom"
node scripts/audit-assets.mjs "I:/SteamLibrary/steamapps/common/Anymaker/rom"
```

提取器生成 `public/data/component-index.json`、每组件独立详情和 Mesh binding；`node scripts/build-published-assets.mjs <Anymaker/rom>` 生成 `public/assets/manifests` 和 `meshes`，`npm run check:assets` 校验发布集。材质转换仍在 TODO 中。审计器输出 `doc/evidence/asset-audit.json`。实验性资源放 local-assets/，导出试验放 exports/，这些目录已忽略。

## 文件格式

原生 starter_vehicle.data/.meta 样本是 JSON，包含载具结构与网格等信息。当前工程 JSON 是独立 schema；下载的 anymaker-intermediate.xml 显式声明 game-compatible="false"。没有证据证明游戏能够加载该 XML，不能将它替代为原生存档。
