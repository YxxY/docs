## 命令行帮助
> `COMMAND` --help
> man `COMMAND`

## 命令行快捷键
- `ctrl + U`, 清空光标至行尾的内容
- `ctrl + K`, 清除光标至行尾的内容
- `ctrl + W`, 移除光标前的一个单词 
- `ctrl + Y`, 粘贴或者恢复上次的删除
- `ctrl + L`, 清屏，相当于clear命令
- `ctrl + R`, 历史命令反向搜索，相当于history
- `ctrl + Z`, 把当前进程转到后台运行

## 引号功能
- 单引号 `''`, 纯字符串，所见即所得
- 双引号 `""`, 会替换字符串中的变量 
- 反引号 \`\`, 会执行字符串中的命令 


## 设置环境变量
> export `key=value`

在命令行里执行仅对此次会话有效，在`~/.bashrc`里设置对当前用户永久有效
```sh
export http_proxy=http://user:password@proxyserver.com:port
export https_proxy=https://user:password@proxyserver.com:port
```
这里设置了http代理， 其他程序会先尝试获取该值，如果存在就使用  

使立即生效 `source ~/.bashrc`

## 查看日志
> tail [OPTION]... [FILE]...  
> head [OPTION]... [FILE]...

默认参数是 `-n 10`，即前|后 10行  
`tail`命令的 `-f` 参数可以监听文件增长，动态显示  

结合管道(`|`)还可以对结果进行截取
- `OUTPUT | head`, 取输出的前10行

## 关键字搜索
> `grep [OPTION]... PATTERN [FILE]...`  

- 独立使用
    - 搜索单个文件
        - `grep keyword filename`
    - 搜索文件夹
        - `grep -r keyword dirname`
- 结合管道对字符串结果进行搜索
    - 'hello world' | grep world

常用OPTION
- `-i，--ignore-case`， 忽略大小写
- `-n，--line-number`, 显示行号
- `-w, --word-regexp`, 全词匹配
- `-m, --max-count=NUM`, 只匹配前 NUM 个结果
- `B, --before-context=NUM`, 同时打印匹配结果的前 NUM 行
- `A, --after-context=NUM`,  同时打印匹配结果的后 NUM 行
- `C, --context=NUM`,  同时打印匹配结果的前后 NUM 行
- `-P`, 支持perl风格的正则表达式，即现在常用风格的正则

## 查看端口
> netstat  

查看所有已打开的端口  
> netsat -anp

- `-a， --all`, 列出所有connected端口
- `-l, --listening`, 列出所有监听状态的端口
- `-n, --numeric`, 不解析主机，端口，用户名，仅显示数字
- `-p, --programs`, 显示 进程/程序 名
- `-t, --tcp`, 过滤出tcp相关的端口
- `-u, --udp`, 过滤出tcp相关的端口
- `-4|-6`, 过滤IPV4|6相关的端口
- `-c, --continuous`, 持续查询，每秒更新

## 查看硬盘空间
> df [OPTION]... [FILE]... (disk free)
> du [OPTION]... [FILE]... (disk usage)

- 查看磁盘总的使用情况
    - `df -h`
- 查看当前位置所有文件占用总大小
    - `du -sh`
-  查看所有子文件的大小
    - `du -h -d 1 .`, `-d` 表示嵌套层级
    - `du -d 1 . | sort -n`, 从小到大排序
    - `du -d 1 . | sort -nr`, 从大到小排序

df是直接从文件系统返回磁盘的使用情况，du是按照文件层级遍历文件计算大小并求和

## 查看进程
> ps [options] (processes)
> top -hv | -bcHiOSs -d secs -n max -u|U user -p pid(s) -o field -w [cols]

ps命令返回当前进程信息的快照， top则显示动态更新的信息


## 文本替换
- 在 vi/vim 中替换
    - `:s/old/new/`, 将第一个 old 替换为 new 
    - `:s/old/new/g`, 将所有的 old 替换为 new 
- `sed` (stream editor)， 对一个输入流（文件或输入管道）进行过滤和转换操作

