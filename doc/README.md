# 文档索引

先整理需求、架构和格式；后续实现顺序见 [TODO](../TODO.md)。
范围是桌面 Web + Three.js + GitHub Pages，触屏和移动端暂缓。

| 文档 | 内容 |
| --- | --- |
| [01 系统架构](01_SYSTEM_ARCHITECTURE.md) | 当前职责、目标领域模型、模块依赖与纯前端约束 |
| [02 Anymaker 架构](02_ANYMAKER_ARCHITECTURE.md) | ROM、组件定义、载具节点/梁/面板/网格和研究边界 |
| [03 XML 与原生格式](03_XML_AND_NATIVE_FORMAT.md) | 工程 JSON、中间 XML、原生 JSON 与字段映射 |
| [04 Component / Mesh 拆分](04_COMPONENT_MESH_SPLIT.md) | 每组件详情与绑定、单 Mesh 文件、共享资源和按需加载 |
| [05 镜像与子网格操作](05_BUILD_OPERATIONS.md) | 拆分、复制、移动、合并语义、边界策略和验收 |
| [06 本地反编译分析](06_REVERSE_ENGINEERING.md) | 只读游戏输入、Ghidra 导出流程和证据边界 |
| [07 3D 模型解析](07_MODEL_IMPORT.md) | GLB/OBJ/STL、外壳简化、方向对称、格点结构生成、占地和验证边界 |
| [资源研究记录](RESOURCE_ANALYSIS.md) | 扫描方法、Mesh 支持范围、Stormworks 方法参考 |
| [审计报告](evidence/asset-audit.json) | ROM 计数、EXE/定义/Mesh SHA-256、解析成功和失败记录 |
| [原生子网格变换证据](evidence/native-grid-transform.json) | 游戏 GCL 函数与常量、安装偏移、四个车门把手回归坐标 |

文档区分“已验证”“现有实现”“设计目标”“待验证”。勾选不代表整项产品验收；实际游戏加载和 1:1 画面对照目前未完成。

## 维护规则

- 文档统一放 doc/；工程入口和 TODO 保留在仓库根目录。
- 关键结论引用来源文件、扫描脚本或测试。二进制不复制到说明或源码。
- 提交选定的可审计摘要；本地游戏资源、导出试验、Ghidra 工程放忽略目录。
- 变更序列化 schema 时同步更新格式文档、迁移策略和测试。
- 新增组件专用装配时按组件拆文件，不扩展一个全局巨型工厂。
