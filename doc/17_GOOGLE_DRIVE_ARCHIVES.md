# Google 云盘存档

更新：2026-09-28。此功能同步编辑器工程存档，不改变游戏原生导出的兼容性结论。

## 使用流程

1. 左侧选择“存档”，输入名称并“保存当前载具”。
2. **覆盖**：用当前编辑器工程更新该条本地存档；保留名称、ID 和云端标识，更新保存时间，操作前确认。
3. **同步到谷歌云盘**：上传这一条已保存的存档。首次使用会弹出 Google 账号选择和授权窗口。修改工程后需先覆盖或另存，再同步。
4. 在“我的云端硬盘”根目录查找或创建 `anymaker-builder-vehicles`，存为 `名称.anymaker.json`。重复同步按稳定存档标识更新同一文件；覆盖云端文件前会确认。
5. **从谷歌云盘同步**：分页读取存档名称、更新时间、大小等信息。只有点击某条“下载到本地存档”时才请求完整文件内容。
6. 下载通过校验后进入本地手动存档列表，随后可读取或作为子网格导入。下载不会直接替换当前编辑工程。重复下载同一云端文件会先确认是否覆盖其本地副本。
7. “断开 Google 连接”清除本页授权并尝试撤销令牌，清空云端列表，不删除本地或云端存档。刷新网页后需再次登录；可借此或断开后切换账号。

这里的同步由按钮触发；不会在后台定时上传，也不会自动合并多个设备的编辑。覆盖云端采用用户确认后的整份替换，不提供多设备原子冲突解决。网络中断后重新点击同步，按同一稳定标识重新查找文件；若存在重复标识则明确报错，不擅自选择覆盖对象。

## 一次性 Google 配置

仓库不包含实际 OAuth Client ID，也不包含客户端密钥。站点维护者需要完成：

1. 在 Google Cloud 项目启用 **Google Drive API**。
2. 配置 Google Auth Platform 的应用品牌、受众和数据访问权限。按项目状态配置测试用户或发布应用。
3. 创建 **Web application** 类型的 OAuth 客户端。
4. 在 **Authorized JavaScript origins** 登记网页的真实 origin（协议、域名及必要的端口，不包含路径）。例如 Pages 的 origin 为 `https://用户名.github.io`，不能填成 `https://用户名.github.io/anymaker-builder/`。
5. 本地调试使用官方支持的 localhost：登记 `http://localhost` 和实际端口，例如 `http://localhost:5173`。自动化测试使用 127.0.0.1 和模拟 Google 响应，不代表该测试地址已配置真实 OAuth。
6. 登记/请求权限 `https://www.googleapis.com/auth/drive.file`。浏览器 token 模式不需要后端或客户端密钥；不要把 client secret、access token 或 refresh token 放进源码、环境模板或页面设置。
7. 配置 Client ID，二选一：
   - 将 `.env.example` 复制为本地 `.env.local`，填写 `VITE_GOOGLE_CLIENT_ID`，重新构建。该值是公开配置，会进入浏览器产物。
   - 在存档面板“Google 登录配置”填写 Web OAuth Client ID 并保存。此设置按浏览器站点路径持久化，优先于构建配置。

自托管环境若启用 CSP，需要允许 Google Identity Services 脚本、登录弹窗/框架及 Google API 连接；若额外设置 Cross-Origin-Opener-Policy，按官方 GIS 文档配置兼容的弹窗策略。首次授权必须由点击按钮触发。SDK 仅在使用已配置的存档面板时加载，不阻塞普通编辑器初始化。

`drive.file` 是按文件授权：应用只能访问其创建或获准访问的文件。它不是整个 Google Drive 的读取权限。同一 Google 账号和同一 OAuth 应用可在其他设备同步；改用另一个 OAuth 应用不会自动获得旧应用的私有文件权限。若账号已有同名但未授权的目录，应用可能创建自己的同名目录。列表只显示本应用格式标记的 JSON 存档，不下载其他文件。

## 数据与校验

云端外层格式为 `anymaker-builder-archive` v1，保存 `id/name/savedAt/document`。内部仍为现有 `anymaker-web-project` 工程格式，未修改其 schema。

- `src/editor/google-drive-auth.js`：按用户点击获取 token、过期/拒绝授权/弹窗关闭处理，令牌仅存于内存。
- `src/editor/google-drive.js`：Drive v3 查询、文件夹创建、分页、分离元数据列表与按需下载、resumable 上传及 HTTP 错误分类。
- `src/editor/drive-archive-format.js`：外层格式和有限字节流校验，拒绝危险 JSON 键，再调用工程迁移/校验入口。
- `src/editor/google-drive-ui.js`：配置、登录、云端列表、上传和下载按钮协调，英文/中文文案在 `src/locales/google-drive-en.js`。
- `src/editor/archive-store.js`：IndexedDB 原子保存云端标识，防止上传期间自动保存导致下一次同步重复建档。

限制：每份工程 JSON 最多 **16 MiB**（实际 UTF-8 字节，流式读取也执行限制）；每次元数据响应最多 1 MiB，列表最多 2000 条，拒绝重复分页令牌和不完整搜索结果。下载必须同时通过云端标记、外层存档 ID 与工程校验，失败不写入本地 IndexedDB。显示文件名使用 textContent。

上传 session URI 只接受固定 Google HTTPS origin 和 Drive 路径；禁用 HTTP 重定向，避免把 Authorization 发送到任意地址。API 请求有 60 秒超时；401 后清除登录状态，用户再次点击后重登。不会在后台自动弹窗或无限重试。

自动存档的本地 ID 固定，但首次同步分配设备独立的云端 ID。下载副本保留来源云端 ID，继续同步会更新来源云端文件；本地删除仅删除本地记录。上传并不执行游戏加载验收。

## 验证与边界

2026-09-28 本轮实际验证：242 项单元测试通过，98 项编辑器浏览器回归及 4 项 Google 云盘浏览器测试通过；界面调整后再次运行 4 项云盘测试全部通过，并检查了界面截图。生产构建通过，仍有大于 500 kB 的 bundle 提示。

- 单元入口 `npm test` 包含 `tests/google-drive.test.js`：授权范围、过期、迟到回调、配置白名单、工程校验、字节限制、分页、目录创建、重复更新、上传地址和错误处理。
- 专项浏览器命令 `npm run test:browser:drive`：真实页面与 IndexedDB，模拟 GIS/Drive HTTP 响应，覆盖按钮、用户手势、上传更新、按需下载、损坏档案隔离、断开/重登、中英文、偏好重载和并发保存标识。
- 编辑器回归使用 `npm run test:browser:editor`；普通检查使用 `npm run check`。
- **未验证**：真实 OAuth 项目授权、真实 Google 账号上传/下载、部署域名的 origin/CSP/弹窗策略。需实际 Web OAuth Client ID 和用户主动登录后验收，模拟测试不替代真实服务验收。

## 官方依据

以下官方页面于 2026-09-28 读取核对：

- [GIS token model](https://developers.google.com/identity/oauth2/web/guides/use-token-model)：用户点击获取短期 token，直接调用 REST/CORS API，过期后再次授权。
- [GIS JavaScript reference](https://developers.google.com/identity/oauth2/web/reference/js-reference)：initTokenClient、requestAccessToken、scope 检查、error_callback、revoke。
- [创建客户端 ID](https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid)：Web 客户端与 Authorized JavaScript origins。
- [Drive API scopes](https://developers.google.com/workspace/drive/api/guides/api-specific-auth)：drive.file 的文件访问范围。
- [Drive uploads](https://developers.google.com/workspace/drive/api/guides/manage-uploads)：resumable 初始化、Location、PUT 内容和 PATCH 更新。
- [Drive folders](https://developers.google.com/workspace/drive/api/guides/folder)：文件夹 MIME、root 与 parents。
- [Drive search](https://developers.google.com/workspace/drive/api/guides/search-files)：q、appProperties 和 nextPageToken。
- [Drive custom properties](https://developers.google.com/workspace/drive/api/guides/properties)：单个属性 key 与 value 合计不超过 124 字节；archiveId 限为 115 个 ASCII 字符。
