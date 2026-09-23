# AGENTS.md

## 适用范围与工作方式

本指南适用于整个仓库。若子目录以后新增 `AGENTS.md`，其补充约定适用于该子目录。

- 开始前阅读 `README.md`、`TODO.md` 与 `doc/README.md`，再按任务阅读对应设计和实现。
- 区分“已验证事实”“当前实现”“设计目标”和“待验证”。文档中的目标目录、能力描述和 TODO 勾选不等于代码已实现或产品已验收；发现不一致时明确说明。
- 只修改任务需要的文件，保留已有用户改动；不要顺手重构大型模块、升级依赖、重生成整个资产集或修复无关问题。
- 开发说明使用简体中文；用户界面默认英文，支持中文切换并持久化语言偏好。新增界面文案须覆盖中英文；代码标识符沿用现有英文命名。完成时列出改动、实际验证结果及未验证项，不把未执行的检查称为通过。

## 项目定位

Anymaker Builder 是桌面优先的载具建造研究原型，使用 **Vite 7、Three.js、原生 JavaScript ES modules、DOM 和 CSS**。当前没有 React/Vue、TypeScript、后端、数据库或账号系统。

- 目标运行环境是 GitHub Pages 等静态托管服务，正式运行时必须自包含，不依赖游戏进程、游戏安装目录或资源转换服务。
- 本地 Mesh 文件选择仅用于开发与资源审计，不能成为线上用户的前置条件。
- 本阶段面向桌面鼠标键盘；不要主动扩展触屏、手机或平板支持。
- 当前使用中性诊断材质；完整游戏材质、动态约束、结构编辑和原生存档兼容仍未完成。几何解析成功、文件入库或构建成功均不代表视觉 1:1 对照或游戏加载验收。

## 实际目录与职责

以下为当前实现路径，不要把设计中的 `src/assets/published/`、`src/components/` 等目标目录当作已存在模块。

| 路径 | 职责 |
| --- | --- |
| `index.html`、`src/main.js` | 页面入口、DOM 组合、事件协调、Three.js 场景、工具和编辑流程 |
| `src/style.css` | 全局主题、桌面布局、工具栏、目录和 Inspector 样式 |
| `src/catalog/component-catalog.js` | 组件索引、详情与 binding 的按需加载、校验和缓存 |
| `src/assets/mesh.js` | 浏览器与 Node 脚本共用的 Mesh v5 二进制解析器 |
| `src/assets/library.js` | 开发用本地文件资源库、几何实例化、诊断与对象释放 |
| `src/assets/published-library.js` | 发布 manifest、gzip Mesh 加载、缓存与基础装配；导出 `PublishedAssetLoader` 别名 |
| `src/assets/geometry-ops.js` | 几何反射、法线与三角绕序处理 |
| `src/editor/document.js` | 工程 schema、校验、迁移、快照历史与中间 XML |
| `src/editor/model.js` | 与渲染无关的 `Project`、`Vehicle`、`Grid`、`Component`、`Node`、`Edge`、`Plate`、`Link` 及适配 |
| `src/editor/operations.js`、`src/editor/topology.js` | 组件/网格操作，以及节点、梁、面板的纯数据操作 |
| `src/native/anymaker-data.js` | 原生 JSON 解析、领域映射与保留原始字段的试验回写 |
| `public/data/` | 索引 `index.json`、`component-index.json`，以及每组件 `definitions/`、`bindings/` |
| `public/assets/` | 发布用 `manifests/mesh-manifest.json` 与独立 `meshes/*.json.gz` |
| `scripts/` | 离线提取、转换、审计和发布资产完整性检查 |
| `tests/unit.test.js`、`tests/fixtures.js` | Node 单元测试与合成 Mesh fixture |
| `tests/browser/editor.spec.js` | Playwright 编辑器工作流测试 |
| `test-vehicle/` | 原生载具样本；按格式研究输入对待，不随意覆盖 |
| `doc/`、`doc/evidence/` | 设计、格式研究及选定的可审计摘要 |
| `.github/workflows/pages.yml` | 静态构建与 Pages 发布工作流 |

## 环境、命令与验证

所有命令从仓库根目录执行。使用 npm 和已提交的 `package-lock.json`；不要引入其他包管理器锁文件。

锁定的 Vite 要求 Node `^20.19.0 || >=22.12.0`；Pages 工作流使用 Node 20，因此本地使用 20.x 时至少为 20.19。浏览器需支持 WebGL 和 `DecompressionStream`，自动化浏览器测试使用 Chromium。

| 命令 | 用途 |
| --- | --- |
| `npm ci` | 按锁文件安装依赖 |
| `npm run dev` | 启动 Vite 开发服务器 |
| `npm test` | 使用 `node:test` 执行 `tests/unit.test.js` |
| `npm run check` | 日常默认：单元测试加生产构建 |
| `npm run test:browser:editor` | 仅运行编辑器交互浏览器流程 |
| `npm run test:browser:preferences` | 仅运行设置、自动恢复浏览器流程 |
| `npm run check:assets` | 检查组件文件引用、Mesh manifest、文件存在性及压缩产物 SHA-256 |
| `npx playwright install chromium` | 首次配置时安装浏览器；需要下载，非每次验证必跑 |
| `npm run test:browser` | 执行完整 Playwright 工作流 |
| `npm run check:full` | 发布前：单元、资产、完整浏览器流程和构建 |
| `npm run build` | 生成 `dist/` |
| `npm run preview` | 预览已有构建产物 |
| `npm run test:serve` | 浏览器测试内部使用：按 `/anymaker-builder/` 构建并在端口 4173 提供预览 |

- Playwright 会自动启动测试服务，使用 `http://127.0.0.1:4173/anymaker-builder/`、单 worker、1500×960 视口及 SwiftShader。不要另启同端口服务器；配置不复用已有服务。
- 日常改动默认执行 `npm run check`；UI、加载链路或文件工作流只补跑对应的浏览器文件（编辑器用 `test:browser:editor`，设置/恢复用 `test:browser:preferences`）；目录、binding、Mesh、manifest 或转换脚本才补跑资产检查。跨模块重构或发布前执行 `npm run check:full`。不要为每次小改动无差别运行完整资产和浏览器套件。
- 纯文档改动核对路径、命令和事实即可；不必因此安装依赖或重新转换资源。
- `npm test` 当前只指定一个测试文件；新增其他单元测试文件时需同步调整测试入口，不能假定会自动发现。
- 仓库未配置 lint、格式化或类型检查脚本，不要声称执行了不存在的检查。当前 CI 包含资产检查和构建，未执行单元测试及 Playwright。
- 检查失败时保留错误证据，区分已有问题和本次回归；禁止通过删除断言、跳过用例或伪造资源掩盖失败。

## 编码与架构约定

- 沿用 `.js` / `.mjs`、ES module、显式 `.js` 相对导入，以及所在文件的两空格缩进、单引号和分号风格。不要批量重排无关代码。
- `src/main.js` 是协调入口，不应继续承载可独立测试的解析、领域或格式逻辑；新增逻辑优先放入相应模块。新增组件专用装配时按组件拆分，避免巨型全局工厂。
- 依赖方向保持 UI → 命令/领域模型 → 校验与历史；资源库提供渲染资产，格式适配器读写领域数据。解析器不依赖 DOM，领域层不持有 Three.js 对象。
- 工程与历史只保存可序列化的数据快照；选择状态、工具、`File`、Three.js 对象、缓存和本地绝对路径不得写入工程。
- 操作返回独立数据，不共享可变副本；复制重新分配 ID 并重映射相关引用。提交前验证，失败不破坏原项目，用户级操作应形成完整可撤销的变更。
- 删除或替换场景对象时沿用 `disposeObject` 等释放路径；反射几何前克隆，避免污染共享资源。新增几何、材质、纹理和缓存需明确生命周期。
- 修改 UI 时保留可访问名称、表单标签、焦点状态和桌面工作流；如变更测试依赖的 DOM ID、`data-*` 或文案，同步更新相关用例。

## 领域、几何与格式边界

### 工程和结构

- 工程格式是 `anymaker-web-project` v1；`migrateDocument` 支持已知 v0 迁移，未知版本应报错。修改 schema 时同步更新校验、迁移、序列化、测试和 `doc/03_XML_AND_NATIVE_FORMAT.md`。
- 当前工程校验上限是 2000 个组件；位置和旋转绝对值不超过 10000，缩放在 `(0, 100]`。这些是编辑器限制，不是已验证的游戏限制。
- 持久化旋转为 XYZ 欧拉弧度，Inspector 可显示角度；不能混用。游戏坐标单位、格点与父级变换的完整映射仍需证据。
- Mesh part/render submesh、dynamic mesh 与载具 `Grid` 是不同概念。原生节点、梁、面板位于 vehicle 层级，不能因编辑器投影方式而假定其天然属于某一个 grid。
- 当前拆分/合并主要改变组件 `gridId`，不能视为完整拓扑事务、结构焊接或坐标系转换。扩展时参考 `doc/05_BUILD_OPERATIONS.md` 所述设计，而非只改 Three.js 分组。
- 镜像保留显式 `mirror` 元数据，保持正缩放，并正确反射顶点、法线和绕序；不能仅靠负缩放或普通旋转代替。端口、关节、左右手性映射尚未完成。

### 原生数据与 XML

- `.data` / `.meta` 样本是 JSON；工程 JSON、领域模型和原生 schema 是三个不同层次。
- 原生适配应保留未知字段、省略字段和原始数据，不凭猜测填入编辑器 scale 或欧拉角。当前回写仅为实验，不保证任意编辑无损 round-trip。
- 中间 XML 必须保留 `game-compatible="false"` 和非游戏存档说明，属性与文本都要转义。当前没有中间 XML 导入器；六位小数输出也不是无损格式。
- 没有真实游戏加载、字段映射和对照证据时，不得把任何导出标记为“游戏兼容”或把诊断材质称为游戏视觉还原。

## 发布资源与离线生成

运行链路是：组件索引 → 按需详情/binding → manifest → 对应 gzip Mesh → Three.js 实例。保持轻量索引和独立 Mesh 资源，不把整个资产集内联进 JS 或在首屏全量加载。

- 运行时资源基于 `import.meta.env.BASE_URL`。`vite.config.js` 的生产默认 base 为 `./`，可通过 `VITE_BASE` 覆盖；禁止硬编码站点根路径，必须兼容 Pages 子路径。
- `public/data/` 与 `public/assets/` 是发布输入，不是可随意清理的缓存。资源更新优先修改提取/转换逻辑再重生成相关产物，不手工修改压缩文件、伪造哈希或只改 manifest。
- `mesh.js` 当前支持 v5 的 16/28/36 字节顶点布局；保留 part 边界、metadata、bounds、packed color、法线、UV 和索引。未知布局、截断、非法数值与越界索引应明确报错。
- 已发布资产包含尚未解析的 opaque 原生变体；保存 raw bytes 不代表可以真实渲染。资源数量与支持情况以 manifest 和 `doc/evidence/asset-audit.json` 为准，不为凑数量删除失败记录。
- manifest 的来源路径、原始/产物哈希、格式、压缩参数和解析状态必须可追溯。当前产物哈希验证由 `check:assets` 执行；浏览器对比 source/hash 字段，不等于重新计算下载文件的完整哈希。
- 加载器要兼容静态服务器已解码 gzip 和仍返回压缩字节的两种行为；失败应提供明确诊断，不能静默改用臆造模型宣称成功。

仅在任务需要、已获得本地资源读取授权且具备 ROM 时执行以下生成流程；日常前端开发不需要游戏安装：

| 命令 | 输入与输出 |
| --- | --- |
| `node scripts/extract-catalog.mjs <Anymaker/rom>` | 读取定义与翻译，生成两个组件索引及每组件详情/binding |
| `node scripts/build-published-assets.mjs <Anymaker/rom>` | 依据 binding 转换静态/动态 Mesh，输出压缩资产及 manifest |
| `node scripts/audit-assets.mjs <Anymaker/rom>` | 扫描 ROM、读取 starter vehicle 和 ROM 上级的 `game.exe` 计算哈希，写入 `doc/evidence/asset-audit.json`；不执行游戏 |

生成后执行 `npm run check:assets`，检查差异是否符合预期，并按影响范围补充解析器与浏览器验证。脚本输出依赖当前工作目录，不要从其他目录运行。不能把开发者本机盘符或路径写入生产资源。

## 安全与仓库维护

- JSON、原生文件、Mesh、资源路径与用户输入均视为不可信；先校验类型、版本、数量、有限数值、ID 唯一性和引用完整性，再修改状态或分配大块资源。
- 不使用 `eval`、动态执行或不安全反序列化处理导入内容；防范原型污染及异常巨大文件/解压数据。错误信息和名称优先使用 `textContent`，插入 HTML/XML 时正确转义。
- 资源路径限制在预期的静态目录，拒绝路径穿越与任意远程 URL。若新增网络代理或下载功能，应验证协议、目标及重定向；访问内网必须先确认授权，未授权时阻止常见内网及 `9.*`、`10.*`、`11.*`、`21.*`、`30.*` 等地址。
- 凭据仅通过环境变量提供，不写入源码、样本、日志或版本库。浏览器构建中的 `VITE_*` 是公开配置，不能承载秘密。
- 文档集中放在 `doc/`，根目录保留入口、TODO 和本指南。研究结论附来源文件、脚本或测试证据，不复制大段二进制到文档或源码。
- 本地游戏副本、实验产物和导出文件放 `.gitignore` 中的 `local-assets/`、`local-data/`、`game-dumps/`、`asset-cache/`、`exports/` 等目录；不要把整个 ROM 或游戏可执行文件提交入库。
- 保留已批准的发布资产、锁文件、测试 fixture 和证据摘要；不要全局忽略 `.mesh`、`.data`、`.xml` 等可能用作 fixture 的扩展名。
- 不提交 `node_modules/`、`dist/`、测试报告、缓存或凭据；不要删除 `.codebuddy/` 项目数据。未经明确要求，不提交、推送或触发部署。
