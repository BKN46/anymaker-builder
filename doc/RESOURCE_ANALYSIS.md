# Anymaker 资源研究记录

## 可复现证据

来源：本地 Anymaker/rom。工具为 scripts/extract-catalog.mjs 与 scripts/audit-assets.mjs；扫描结果见 [asset-audit.json](evidence/asset-audit.json)。游戏安装和外部 Stormworks 工作台只读使用。

- ROM：10713 文件；3333 Mesh、115 txtr、204 data、204 meta。
- 组件：598 定义、22 类别，静态与动态 Mesh 共引用 794 个唯一资源，引用均存在。
- 当前解析器支持 3230 个 Mesh；组件引用中支持 793 个。失败原因逐文件记录。
- EXE 与定义文件 SHA-256 位于报告；尚未以游戏 UI 验证版本号。
- starter_vehicle.data：JSON，1 载具、112 节点、181 梁、27 面板、2 网格、39 组件。
- starter_vehicle.meta：JSON，保存载具变换及 bounds；加载语义待验证。

源路径、哈希与解析结果能够复核格式判断，不能证明游戏渲染和物理行为一致。

## Mesh v5 已支持结构

文件头是 mesh 魔数、uint32 版本及 part 数量。每个 part 包括名称长度/名称、布局头、元数据、6 个 float64 bounds、顶点缓冲区长度/数据、索引缓冲区长度/数据。当前支持尾部两个 uint32 零标记。

| 布局签名（前 8 个 uint32） | 步长 | 当前读取 |
| --- | --- | --- |
| 3,1,5,2,0,0,0,0 | 16 | position + packed 4 字节 |
| 3,1,5,2,3,4,0,0 | 28 | position + packed 4 字节 + normal |
| 3,1,5,2,2,3,3,4 | 36 | position + packed 4 字节 + UV + normal |

缓冲长度、索引边界、非有限浮点、未知尾部、截断均检查。未识别元数据保留；不把 packed 字节直接当成已经确认的 sRGB 颜色。多 part 结构与动态子组件不同，见 [操作设计](05_BUILD_OPERATIONS.md)。

## Stormworks 分析方法参考

已阅读外部工作台 README、AGENTS、docs/02_PIPELINE.md 与 config/analysis_config.json。参考目录为 D:/00Data00/Stormworks/analysis。

工作台的静态扫描涵盖 PE、字符串、资源引用和结构索引；Ghidra headless 输出函数、字符串交叉引用、调用图与选定函数伪代码。配置指向 G:/ghidra_12.0.3_PUBLIC，默认 no-analysis 只导入程序和运行导出脚本，不能当成完成反编译。

后续 Anymaker 研究计划：

1. 在本仓库忽略目录 artifacts/ 下建独立 Ghidra 工程，目标明确指定 Anymaker game.exe；不修改外部 Stormworks 工程。
2. 使用 mesh、txtr、vehicle、grid、save、load 等字符串定位候选读取/序列化函数。
3. 对候选函数定向分析，记录 EXE 哈希、工具版本、函数地址、调用关系和伪代码出处。
4. 用 ROM 最小样本、合成 fixture 和游戏受控保存/加载实验交叉验证。
5. 精简结论与选定哈希报告写入 doc/evidence/；完整工具输出与本地游戏数据不提交。

目前没有执行 Anymaker Ghidra 反编译，也没有原生 XML 读取函数证据。解析器研究来自静态二进制样本；不能称为游戏源代码复现。
