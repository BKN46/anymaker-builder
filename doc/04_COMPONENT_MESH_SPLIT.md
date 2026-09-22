# Component Mesh 拆分方案

## 目标

状态：拆分设计，索引/详情/绑定提取器已实现；发布 Mesh/材质转换和独立部署资产尚未完成。原始游戏目录只作为离线输入，不能成为线上依赖。

组件不能继续挤在一个超长模块或一份手写数组中。定义、Mesh 解析、组件装配和具体类别的元数据分别维护，便于逐类校验、按需加载和未来替换为 GLB。

## 目标目录

```text
src/components/
  registry.js              只注册装配器，不持有全部定义或顶点
  types.ts                 ComponentDefinition / ComponentInstance 类型
  common/
    static.js              普通静态组件的通用装配器
    ports.js               surfaces / logic_nodes 端口处理
    transforms.js          轴向、旋转矩阵、动态 Mesh pivot
  engine/
    engine.js              engine 专用装配（确有特殊行为时才建）
  wheel/
    wheel.js               wheel 组件
    landing_gear.js        landing_gear 组件
  building/
    building_b_door.js     门组件
public/data/
  component-index.json     轻量搜索索引，版本/数量/来源哈希
  definitions/
    engine.json            一个定义一个文件，保留完整原始字段
    wheel.json
    building_b_door.json
  bindings/
    engine.json            一个组件一个 Mesh 引用清单
    wheel.json             静态模型与各动态引用的角色/变换
```

`src/assets/mesh.js` 只负责二进制解析，`src/assets/library.js` 只负责本地文件和 Three.js 对象生命周期，不把组件业务规则放进资产解析器。

后续可将 assets/mesh.js 按读取器、v5 布局和尾部处理拆成 mesh/reader.js、mesh/v5.js、mesh/layouts.js；库中的几何创建、材质映射和缓存各自拆文件。不要为每个组件复制一份解析器；不同组件共享同一种二进制格式。

类别文件只能是索引或小型共享规则。组件有独立行为才创建对应模块，普通组件由独立 JSON + 通用装配器驱动，不人为生成数百个相同的空模块。

详情文件使用稳定定义 ID，索引中显式列出相对 URL；提取器验证安全文件名、唯一 ID 和引用完整性。对象键排序与字段输出确定化，支持逐组件 diff 和增量更新。消费端完成切换前保留旧目录作为迁移输入，迁移后避免同时维护两份完整权威数据。

## Mesh 文件组织

转换后的可发布资产按原始路径分文件保存，禁止生成一个把所有组件合并的巨型 GLB：

```text
public/assets/meshes/
  components/engine_block_a_0_0_0.glb
  components/car_wheel.glb
  components/manifold_pipe_a_straight.glb
  buildings/wall_b.glb
public/assets/materials/<texture-id>.ktx2
public/assets/manifests/mesh-manifest.json
```

每个资产清单条目包含原始 `.mesh` 路径、SHA-256、顶点数、三角形数、子网格名、材质槽、包围盒、坐标系和转换器版本。组件引用通过清单查找，找不到时显示缺失资源标记。

默认一份原始 Mesh 对应一个独立文件，多组件引用同一 Mesh 时不重复复制。每组件绑定引用这些独立资源；动态装配也只引用独立文件。原 Mesh 的多个 part 保留为命名子节点，只有存在按 part 加载/替换需求才拆成独立文件，并在 manifest 中记录原始 part 索引，避免拆分丢失材质关系。

## 子网格拆分规则

- 静态 Mesh 的每个命名 part 单独保留为 Three.js child 和导出 manifest 条目。
- 同一组件的 `meshes_dynamic[]` 不是静态子网格：每个动态 part 要保留 `path/pos/preview_rot` 和 pivot，不能在转换时焊接。
- 不根据材质颜色猜子网格边界；边界只能来自文件结构、定义字段或可复现实验。
- 低模、碰撞几何、预览几何和最终渲染几何分别记录，不覆盖原始路径。
- 组件类别文件只描述连接、占用和交互规则，不复制顶点数据。

## 按需加载策略

首屏只加载定义目录和缩略图 manifest；用户选择或放置组件时按 ID 动态加载对应 GLB。运行时缓存以文件对象/资产 URL 为键，移除工程或替换本地资源时释放 Geometry、Material、Texture。

GLB/压缩 glTF 是正式转换部署路径；浏览器运行时不读取原始本地 `.mesh`。原始本地读取只属于开发/审计工具，代码可以共享组件绑定接口，但生产 loader 必须从 `public/assets` 和 manifest 读取。不能要求纯前端用户启动转换后端。

## 完整独立发布要求

“完整解析入库”指每条已承诺组件定义的静态 Mesh、`meshes_dynamic[]` 中的动态依赖、所有材质槽、纹理、颜色/透明/发光参数和坐标信息都有发布 manifest 条目。不能只发布首屏常用的 15 个模型，再把其余组件留给用户本地导入。

发布资产可以压缩：

- 几何使用 Draco、Meshopt 或等效压缩；记录原始顶点/索引 hash、压缩 hash、版本和量化参数。
- 纹理使用 KTX2/Basis 或浏览器兼容格式；记录通道、色彩空间、透明和 mipmap 信息。
- 压缩不改变组件拓扑、坐标系、法线、UV、part 名称、材质槽或建造 bounds；有损量化必须有几何误差阈值和截图/材质验收。
- 不使用一个全量巨型包。每个原始 Mesh 一个独立资产，按组件绑定和共享依赖去重。

lazy loading 只延迟下载/解压/上传 GPU 的时机：组件 index 首屏加载，详情和 binding 在选择/放置时加载，Mesh/材质在可见或即将可见时加载，缓存按 LRU 回收。断网时，已部署和已缓存的组件仍可用；首次打开不能访问 Anymaker 安装目录。

## 拆分验收

- 提取结果仍是 598 个稳定定义，源字段无损；794 个引用资源仍可定位，共享引用去重。
- 首页网络只请求 index.json；查看组件时仅请求其详情/绑定及必要模型。
- 单组件修改仅影响该组件详情、绑定和依赖资源，不重写包含全部组件的大文件。
- 源文件命名可从 component ID 或原 mesh_path 追溯；跨类别同名资源无碰撞。
- 本地目录导入、缺失资源提示、缓存释放和现有文件测试不退化。
- 生产构建不包含本地绝对路径；静态检查能验证每个 binding、dynamic part、material 和 manifest URL 都存在。
- GitHub Pages 从空浏览器环境打开即可搜索全部组件、放置所有已承诺组件和显示真实 Mesh；不选择本地文件也不能出现资源缺失。
- lazy loading 网络测试证明首次只加载 index，选中组件才加载其详情/绑定/Mesh/材质，并且同一资产不会重复请求。
## 当前发布实现（2026-09-22）

`scripts/build-published-assets.mjs` 已从 ROM 读取组件绑定引用的 794 个 Mesh，使用共享 v5 解析器完整保存 positions、normals、UV、颜色字节、索引、part 名称、metadata 和 bounds，输出到 `public/assets/meshes/*.json.gz`，并生成 `public/assets/manifests/mesh-manifest.json`。发布包约 6.6 MiB；每项记录源 hash、压缩 hash、字节数、part、顶点和三角形统计。

`src/assets/published-library.js` 首次只请求 manifest，组件详情和绑定仍由 `ComponentCatalog` 按需请求，Mesh 在组件实例化时请求并解压。相同 URL 使用 Promise 缓存，发布运行时不读取游戏目录；`AssetLibrary` 只保留给开发/审计时的本地文件 fallback。`npm run check:assets` 会检查所有 binding 引用、文件存在性和输出 hash。

当前有 1 个 `blade_blurred/blade.mesh` 使用未解码的原生变体。其完整原始字节已压缩入库并在 manifest 标记 `opaque`，页面显示诊断标记；这项布局解析仍是 P5 的未完成项，不能宣称该资源已达到 1:1 渲染。
