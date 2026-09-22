# Anymaker Builder

使用 Three.js + Vite 的纯前端桌面建造器原型，目标是在 GitHub Pages 上建造载具、显示真实游戏组件并导出经过验证的载具文件。

现阶段支持 598 条组件定义搜索、开发阶段本地 .mesh 导入与静态几何显示、基础放置/变换/删除、工程 JSON 保存加载、撤销重做和中间 XML 导出。静态模型使用中性诊断材质，尚未达到游戏视觉 1:1；原生游戏文件兼容性也尚未完成。

最终交付要求是独立前端：GitHub Pages 必须自带完整解析入库后的组件 Mesh、材质、动态 Mesh 依赖和 manifest，首次使用不需要 Anymaker 游戏本体、`game.exe` 或本地 ROM。允许通过 Draco/Meshopt/KTX2 等方式压缩，运行时按组件 lazy loading；压缩、转换和完整性均需有可审计记录。

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
npm test
npx playwright install chromium
npm run test:browser
npm run build
```

生产输出在 dist/；默认相对 base 支持静态子路径。Pages workflow 已配置，但尚无实际线上发布验收记录。当前 workflow 仅构建部署，测试接入列在 TODO。

## 本地资源

开发阶段页面可以选择“导入本地模型”，指定 Anymaker/rom/meshes 文件夹，也可选择单个 .mesh 文件。浏览器只读取用户选中的文件；该入口用于解析器验证，不是最终线上运行条件。正式发布后模型应来自 Pages 的 `public/assets`，缺失资源显示为构建错误而不是交给用户补文件。

当前解析器支持 Mesh v5 的三种静态布局；发布资产已覆盖组件引用的 794 个 Mesh，其中 793 个完成几何解析，1 个特殊 blurred 原生变体以完整 raw bytes 入库并标记 opaque。packed color、材质和动态装配仍需研究。数据来自 [审计报告](doc/evidence/asset-audit.json)，不是视觉一致性验收结果。

```powershell
node scripts/extract-catalog.mjs "I:/SteamLibrary/steamapps/common/Anymaker/rom"
node scripts/audit-assets.mjs "I:/SteamLibrary/steamapps/common/Anymaker/rom"
```

提取器生成 `public/data/component-index.json`、每组件独立详情和 Mesh binding；`node scripts/build-published-assets.mjs <Anymaker/rom>` 生成 `public/assets/manifests` 和 `meshes`，`npm run check:assets` 校验发布集。材质转换仍在 TODO 中。审计器输出 `doc/evidence/asset-audit.json`。实验性资源放 local-assets/，导出试验放 exports/，这些目录已忽略。

## 文件格式

原生 starter_vehicle.data/.meta 样本是 JSON，包含载具结构与网格等信息。当前工程 JSON 是独立 schema；下载的 anymaker-intermediate.xml 显式声明 game-compatible="false"。没有证据证明游戏能够加载该 XML，不能将它替代为原生存档。
