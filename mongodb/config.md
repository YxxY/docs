使用`mongod`命令启动数据库server  
运行

        mongod -h
查看所以命令行选项

## 快速启动
> 指定数据库存储数据的目录`dbpath`和日志目录`logpath`即可快速启动  

这俩参数设定有默认值，如同默认端口`27017`，但目录不一定存在，不如手动新建指定。
> mongod --dbpath arg1 --logpath arg2

!> 不建议以root用户启动，所以确保指定的目录对普通用户有读写权限

示例
1. 创建目录`/data/logs`, `/data/mongodb`
    
        sudo mkdir -p /data/logs /data/mongodb
2. 更改目录权限
        sudo chown `userName`:`groupName` /data/logs /data/mongodb
3. 以后台任务启动mongodb server

        mongod --logpath /data/logs/mongod.log --dbpath /data/mongodb/ &

## 配置文件
命令行参数太长不容易记忆和维护，比较推荐的是以配置文件的方式记录参数和启动  
配置文件的写法参考[配置文件官方说明](https://docs.mongodb.com/manual/reference/configuration-options/)  
示例文件如下，以YAML语法编写，文件名`mongod.conf`
```yaml
systemLog:
    destination: file
    path: /data/logs/mongod.log
storage:
    dbPath: /data/mongodb
net:
    port: 35726
    bindIpAll: false
```
启动命令就可以简化为  

        mongod -f /path/to/mongod.conf 
停止命令为

        mongod -f /path/to/mongod.conf  --shutdown

## 优化改进
查看`/data/logs/mongod.log`日志文件，可以看到一些warning信息
> 2018-11-23T17:05:22.467+0800 I CONTROL  [initandlisten] ** WARNING: `Access control is not enabled for the database`.  
2018-11-23T17:05:22.467+0800 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.  
2018-11-23T17:05:22.467+0800 I CONTROL  [initandlisten] ** WARNING: `You are running this process as the root user, which is not recommended`.  
2018-11-23T17:05:22.467+0800 I CONTROL  [initandlisten]   
2018-11-23T17:05:22.467+0800 I CONTROL  [initandlisten] ** WARNING: This server is bound to localhost.  
2018-11-23T17:05:22.467+0800 I CONTROL  [initandlisten] **          Remote systems will be unable to connect to this server.   
2018-11-23T17:05:22.467+0800 I CONTROL  [initandlisten] **          Start the server with --bind_ip &lt;address&gt; to specify which IP   
2018-11-23T17:05:22.467+0800 I CONTROL  [initandlisten] **          addresses it should serve responses from, or with --bind_ip_all to  
2018-11-23T17:05:22.467+0800 I CONTROL  [initandlisten] **          bind to all interfaces. If this behavior is desired, start the  
2018-11-23T17:05:22.467+0800 I CONTROL  [initandlisten] **          server with --bind_ip 127.0.0.1 to disable this warning.  
2018-11-23T17:05:22.467+0800 I CONTROL  [initandlisten]   
2018-11-23T17:05:22.468+0800 I CONTROL  [initandlisten]   
2018-11-23T17:05:22.468+0800 I CONTROL  [initandlisten] ** WARNING: `/sys/kernel/mm/transparent_hugepage/enabled is 'always'`.  
2018-11-23T17:05:22.468+0800 I CONTROL  [initandlisten] **        `We suggest setting it to 'never' `   
2018-11-23T17:05:22.468+0800 I CONTROL  [initandlisten]   
2018-11-23T17:05:22.468+0800 I CONTROL  [initandlisten] ** WARNING: `/sys/kernel/mm/transparent_hugepage/defrag is 'always'`.  
2018-11-23T17:05:22.468+0800 I CONTROL  [initandlisten] **        `We suggest setting it to 'never'`  

一共5条WARNING信息：
1. 访问控制没有启用， 存在安全隐患
2. 程序以root用户启动的，这不是推荐的做法
3. server的监听被绑定到本地，外部无法连接，这个我是故意的，不用管
    - 如果希望对外开放可`配置bindIpAll字段为true`或者`配置bindIp为::,0.0.0.0`
5. 系统参数 /sys/kernel/mm/transparent_hugepage/enabled 建议修改为 never
5. 系统参数 /sys/kernel/mm/transparent_hugepage/defrag  建议修改为 never

改进如下：
- 安全问题参考[下一章](linux/auth)
- 停止当前程序，切换到普通用户重新启动
    - mongod -f /path/to/mongod.conf  --shutdown
    - 修改目录权限
    - 以普通用户启动 mongod -f /path/to/mongod.conf 
- 运行
```shell
echo never >>  /sys/kernel/mm/transparent_hugepage/enabled
echo never >>  /sys/kernel/mm/transparent_hugepage/defrag
```
but……该配置重启后失效

我还遇到过以下提示信息
> WARNING: soft rlimits too low. rlimits set to 4096 processes, 655360 files. Number of processes should be at least 327680 : 0.5 times number of files.

就是说，mongod的最大进程数被限制到4096个，但推荐的数值是最大打开文件数的一半， 655360*0.5，也就是327680  
> 详细的参数值，可以查看文件`/proc/${pid}/limits`的内容

修改该limit值方法如下：
- 编辑`/etc/security/limits.conf`, 追加如下内容`${当前用户名} soft nproc 327680`
    - 该配置文件覆盖`/etc/security/limits.d/`目录下的配置
    - limits.conf 的更多配置可通过`man limits.conf`查看，也可参考该文件内的注释内容
- 重启mongod

