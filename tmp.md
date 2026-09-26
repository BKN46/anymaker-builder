在子网格列表中增加删除功能，可以一键删除子网格



将导出的载具导入到游戏的时候报：
EXCEPTION_ACCESS_VIOLATION reading null deference in server_scene.vehicle._split_islands
A crash report was written to C:\Users\jog16\AppData\Roaming\Anymaker\crashes
使用的载具是C:\Users\jog16\AppData\Roaming\Anymaker\creations\test-engine (1)

现在放置组件的碰撞判定和吸附没有什么问题，但是放置梁的时候节点的判定没有保持一致，放置的时候会吸附到mesh的内侧

现在的子网格检查功能并没有和实际游戏保持一致，需要能够基于游戏的判定标准真实check结构完整性

游戏里的各种节点应该是在mesh上带有固定颜色渲染的，还原这部分逻辑，节点本身的颜色不应该被mesh着色覆盖

在组件属性里显示tank的最大容量，每一个格是0.5L，比如2x3x4大小的邮箱容量是12L，方便填写属性

对应增加rotor blade和propeller blade这两个组件ext的安装和显示