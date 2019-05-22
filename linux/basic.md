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

组合使用，查看文件第 M 到 N 行的内容
- `tail -n +M | head -n N`

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
- `-B, --before-context=NUM`, 同时打印匹配结果的前 NUM 行
- `-A, --after-context=NUM`,  同时打印匹配结果的后 NUM 行
- `-C, --context=NUM`,  同时打印匹配结果的前后 NUM 行
- `-P`, 支持perl风格的正则表达式，即现在常用风格的正则
- `-v`, 不包括，过滤掉后续 pattern的内容

## 查看端口
> netstat  

查看所有已打开的端口  
> netsat -anp

- `-a， --all`, 列出所有开放的端口
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
    - `df -h` (`-h, --human-readable`)
- 查看当前位置所有文件占用总大小
    - `du -sh`(`-s, --summarize`)
-  查看所有子文件的大小
    - `du -h -d 1 .`, `-d, --max-depth=N` 表示嵌套层级
    - `du -d 1 . | sort -n`, 从小到大排序
    - `du -d 1 . | sort -nr`, 从大到小排序

df是直接从文件系统返回磁盘的使用情况，du是按照文件层级遍历文件计算大小并求和

## 查看进程
> ps [options] (processes)  
> top -hv | -bcHiOSs -d secs -n max -u|U user -p pid(s) -o field -w [cols]

ps命令返回当前进程信息的快照， top则显示动态更新的信息  

ps 的查询支持多种风格显示，一般以`-`起始的选项是指定Unix风格，直接是字母的选项是BSD风格，不建议混用  
仅以Unix风格举例常用 options  
- `-e, -A`, 包含所有进程
- `-f`, 全格式列表，可以跟其他Unix风格的选项组合使用，添加更多的显示字段
    如与 `-L` 组合可以增加显示`NLWP`(线程数)以及`LWP`(线程ID)。LWP 是`Light Wight Process`的缩写  
- `-p, --pid`, 指定进程ID列表，逗号分隔
- `-u, --user`, 指定用户列表，通用的跟`用户名`，多个用户使用`逗号分隔`
- `--ppid`, 指定父进程ID列表，逗号分隔
- `-o`， 使用用户指定的输出格式
    - `ps -p <pid> -o %cpu %mem etime cmd` 查看指定进程的cpu，内存，启动时间，启动命令
    - 使用 `-O` 除了用户自定义输出格式，会有一些默认字段， 等同于`-o pid,<format>,tname,time,cmd`
- `--sort [+|-]key[,[+|-]key[,...]].`, 输出结果根据特定字段排序
    - eg: `ps -e -O %cpu,%mem,etime --sort -%mem`, 显示当前所有进程信息，指定输出字段，并按照内存使用逆向排序（从大到小）


## 解压/解压
> tar [OPTION...] [FILE]...  

示例：  
- `tar -cf archive.tar foo bar`  # Create archive.tar from files foo and bar.
    - 等同于 `tar -f archive.tar -c foo bar`
- `tar -tvf archive.tar`         # List all files in archive.tar verbosely.
- `tar -xf archive.tar`          # Extract all files from archive.tar.
- `tar -zxf archive.tar.gz -C /path/to/newDir/`   # Extract all files from archive.tar.gz to newDir.

tar 常用option选项  
- `-c, --create`, 创建一个新压缩包（仅将文件打包，并未压缩体积）
- `-f, --file=ARCHIVE`, 指定要使用的压缩包
- `-t, --list`, 列出压缩包里包含的文件名
- ` -x, --extract, --get`, 解压缩包
- `-C, --directory=DIR`, 改变解压缩的路径
- `-z, --gzip`, 以`gzip` 的方式处理压缩包（创建和解压通用）
- `-J, --xz`, 以`xz` 的方式处理压缩包
- `-u, --update`, 增量添加内容进压缩包
- `-v, --verbose`, 显示详细的操作过程
- `--skip-old-files`, 解压时跳过存在的同名文件（默认覆盖）

## 模拟http请求
> curl [options...] <url>

示例：
- `curl http://locahost:3000`  默认发生 `GET` 请求
- `curl -I <url>`, 仅显示响应体
- `curl -H "Content-Type:application/json" -X POST -d '{"start":"2019-04-01","end":"2019-04-26"}' <url>`
    `-H` 指定请求头， `-X` 指定请求方法， `-d` 指定请求体参数

