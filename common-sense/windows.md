> `shift + 鼠标右击`, 显示此处打开命令行
    
win10 最新版本将右键菜单默认的 cmd改成了 powershell，可以手动修改回去
- `regedit` 打开注册表，到 `计算机\HKEY_CLASSES_ROOT\Directory\Background\shell\Powershell`下
- 将 `ShowBasedOnVelocityId` **重命名**为 `HideBasedOnVelocityId`  
![ps-hide](img/ps-hide.png)
- 同理选中左侧目录上方的 `cmd`，将 `HideBasedOnVelocityId` 右键**重命名**为 `ShowBasedOnVelocityId`
- 如果将上图中显示的后三条都删掉，可以直接在右键菜单显示

?> 如果遇到权限问题，右击左侧目录选择`权限` -> `高级` -> 所有者，点击`更改`, 输入当前使用者邮箱。
改完后可以给对应 管理员或用户增加`完全控制`权限

> 添加开机启动项

命令行输入`shell:startup`, 进入到启动项目录，把需要添加的程序的快捷方式放进去即可。

> 系统快捷键

- `win + E`, 打开“我的电脑”
- `win + I`, 打开电脑设置
- `win + W`, 打开ink 工作区
- `win + Q`, 打开搜索
- `win + Shift + S`, 截图
- `win + Ctrl + O`，打开虚拟键盘
- `win + Ctrl + 左右箭头`，win10 切换虚拟桌面
