## 守护进程
普通的进程在当前会话(session)退出后就会立即结束  
很多时候启动程序时希望当前会话退出时，它也能继续保持运行，这样的进程称之为守护进程

> 如何判断一个进程是否为守护进程？  

会话退出后该进程仍然存在，且它的`ppid`变为`1`

## Usage

让一个普通进程变成守护进程(daemon), 一般有以下几种方式：   
- 使用`nohup`命令
    > nohup ${ your startup command } &
- 让前台任务后台执行
    1. `${ your startup command } &`
    2. 执行` disown`命令
    3. 如果进程已经启动，可以按`Ctrl + Z`，让一个前台任务变成一个“暂停”的后台任务, 再执行`bg`命令，让该任务继续执行，然后再继续步骤2的操作即可
- 使用第三方进程管理工具

## 原理
### 前后台任务
例如使用nodejs启动一个web应用，创建一个`server.js`如下：
```js
var http = require('http');

http.createServer(function(req, res) {
  res.end('Hello World');
}).listen(3000);
console.log('server listening on port 3000...')
```
使用`node server.js`直接运行该程序  
> 这时新建的就是一个前台任务

前台任务会占用当前的标准输入和输出，无法进行其它操作，这时可以把它变成一个`后台任务`
> 按组合快捷键`Ctrl + Z`, 当前任务就会被挂起，进入停止状态

执行`jobs -l` 命令可查看`当前会话`下的任务列表  
执行`bg`命令可让`任务号为1`任务进入后台执行， 等同于执行`bg 1`  
同理`fg [n]`是让后台任务号为n的任务前台执行， n 默认为1

### 后台任务 vs 守护进程
!> 任务进入到后台执行`不能保证`该进程成为一个守护进程

linux下的设计是
- 当前session退出时，系统给当前session发送`SINHUP`信号
- session将该信号发送给所有子进程
- 子进程收到`SIGHUP`信号后退出

这解释了前台任务在session退出后自动结束的原理  

但后台任务也会自动退出么？  
这里有一个默认的开关, `huponexit`

?> `huponexit`为`off`时，不发送`SIGHUP`信号给后台任务  
> 下面的命令可查看huponexit参数的值

    shopt | grep huponexit

!> 但这个并不保险：  
一方面是有的机器该参数值为on  
另一方面我实践了下，我的机器该值为off，session退出后，后台任务也退出了……

使用`disown`命令可以解决这个问题，用法如下

### Disown
- 移除最近一个正在执行的后台任务  
    
        disown
- 移除所有的后台任务

        disown -r
- 不移除后台任务，但是让它们不会收到SIGHUP信号
    
        disown -h
- 根据进程id移除后台任务
    > disown  ${pid}  
    > disown -h     ${pid}

?> 移除的意思是执行 `jobs -l` 后追踪不到任务信息，不是退出该任务

### 标准I/O管理
有的地方说后台任务变成守护进程后，如果程序再与标准I/O有交互，进程会自动退出   

在我的机器实践了下，**并没有！**

不过管理下标准输出总归是好的，至少知道在哪儿可以找到它们  
例如: 
> `COMMAND &> stdout.log < /dev/null &`

具体参考 [标准I/O重定向](linux/stdio-redirect)

### 关于nohup
nohup主要做了三件事：
- 阻止SIGHUP信号发到这个进程
- 关闭标准输入。该进程不再能够接收任何输入，即使运行在前台。
- 重定向标准输出和标准错误到文件nohup.out








