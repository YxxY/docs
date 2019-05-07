复制集(replica set) 是MongoDB 的集群方案  
一个复制集是一组 Mongod 实例的集合。提供数据备份(redundancy)和高可用(High-Availability)的解决方案。  

## MongoDB 集群
一个复制集包含一组 mongod 实例，并且维护着同一份数据  

这些mongod 实例可以称为节点分为数据节点(data bearing node)和**可选的**选举节点(arbiter node)  
数据节点中，有且仅有一个主节点(primary node), 其余的均为从节点(secondary nodes).

**主节点接受所有的写操作**  
从节点复制主节点的`oplog`然后执行，从而实现数据同步。  

如果主节点不可用（默认10秒失连），会从所有的从节点中选举出一个成为新的子节点。选举节点不保存数据，仅选举时参与投票，因此是可选的。  
选举期间不可写，因为主节点已经失效，直到选举完成。如果配置了从节点读，那么读操作可以正常进行

### 读取优先级
默认所有的读操作也都是从主节点读取的。但也是可配置的。

Read Perference Mode | Description
---------------------| -----------
primary | 默认模式，所有的读操作都是从当前复制集主节点
primaryPreferred | 多数情况下从主节点读，如果不可用就读从节点
secondary | 都读从节点
secondaryPreferred | 优先读从节点，不可用就读主节点
nearest | 谁网络延迟低读谁

因为从节点的数据是从主节点同步的，可能存在延迟，因此选择从节点时需要考虑容忍度  

该优先级模式设置在与数据库连接建立时指定，eg
```sh
mongodb://db0.example.com,db1.example.com,db2.example.com/?replicaSet=myRepl&readPreference=secondary&maxStalenessSeconds=120
```

## 集群搭建
建议节点个数为奇数，且节点最好在独立的机器上。以 3 节点的复制集为例。

- 在每一台机器上安装 MongoDB
- 使用`bind_ip`选项，ip逗号分隔，保证连接可以建立。
    从v3.6 开始，默认绑定在 localhost，即只能本机的客户端可以连接。  
    如果启用ipv6，也会另外绑定在 localhost ipv6 的地址上
- 保证各个节点之间的网络连通性，可以使用mongo shell 手动验证
- 设置配置，复制集的名称`replication.replSetName`等，多个复制集需要独立的名字。  
    配置可以使用命令行选项，也可以使用配置文件，建议使用后者, eg：  
    ```yaml
    replication:
        replSetName: "rs0"
    net:
        bindIp: localhost,<hostname(s)|ip address(es)>
    ```
- 启动所有的实例
- 连接至其中一个实例，完成一次初始化
    ```mongo shell
        rs.initiate( {
            _id : "rs0",
            members: [
                { _id: 0, host: "mongodb0.example.net:27017" },
                { _id: 1, host: "mongodb1.example.net:27017" },
                { _id: 2, host: "mongodb2.example.net:27017" }
            ]
        })
    ```
- 查看复制集配置，使用 `rs.conf()`
- 确保设置了主节点，使用 `rs.status()` 查看

还可参考自动化创建复制集的脚本[simple setup script](https://github.com/mongodb/mongo-snippets/blob/master/replication/simple-setup.py)