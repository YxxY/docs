## 安装
[官网下载地址](https://www.mongodb.com/download-center#community)，个人使用的话安装社区版就可以了  
[官网安装文档](https://docs.mongodb.com/manual/installation/)

## 数据库配置
### server启动
运行`mongod -h`查看命令行使用选项  
- 指定数据和log存储目录可快速启动。默认端口27017  
    - `mongod --dbpath arg1 --logpath arg2`
- 推荐的使用一个配置文件来管理启动项, 配置文件的写法参考[configuration file](https://docs.mongodb.com/manual/reference/configuration-options/)
    - 启动方式 `mongod -f /path/to/mongod.conf`
    - 配置文件示例
        ```yaml
        systemLog:
            destination: file
            path: /path/to/logs/mongod.log
        storage:
            dbPath: /path/to/data 
        net:
            bindIp: 127.0.0.1
            port: 35726
            bindIpAll: false
        ```
#### 脚本启动管理
将启动命令写在脚本里，方便后续一键启动和停止
- start.sh
    ```sh
        mongod -f /path/to/mongod.conf --auth
    ```
- stop.sh
    ```sh
        mongod -f /path/to/mongod.conf --shutdwon
    ```

- 直接运行`start.sh`可以启动mongod进程  
    `ctrl+z`可以挂起当前任务  
    `jobs -l`, 查询后台任务  
    `bg %n`将任务后台执行  
    `fg %n`将后台任务转为前台执行
- 也可以`start.sh &`直接后台执行该任务
- 运行`(./start.sh &)`可以任务后台执行，且不受当前shell推出的影响
- 也可以借助`nohup`等工具启动守护进程， `nohup mongod -f /path/to/conf --auth &`


### client连接
使用自带的mongo shell连接， 使用文档[mongo shell](https://docs.mongodb.com/manual/mongo/#start-the-mongo-shell)
- 运行命令`mongo -h`, 查看命令行帮助
- 直接运行`mongo`会尝试连接本地默认数据库端口27017，如果ip和端口有改动需要手动指定`--host`, `--port`参数

### mongo shell操作
mongo shell连接成功后
- 输入`show dbs`展示所有可用的的database
- `db`展示当前使用的database, 默认为`test`
- `use <database>` 切换使用的database，如果database不存在会新建一个，但存在[命名限制](https://docs.mongodb.com/manual/reference/limits/#restrictions-on-db-names)
- 选定database后，`db`即代表当前数据库
- `show collections`, 查看当前数据库中所有的集合
- `show users`, 查看当前数据库中所有的用户
- collection的创建无需声明，第一次存储数据时，如果集合不存在会自动创建
    形如`db.myCollection.insertOne({x:1})`  
    当然也就可以预先创建需要的collection, 参考[db.createCollection](https://docs.mongodb.com/manual/reference/method/db.createCollection/#db.createCollection)
- mongo shell 的其他操作方法参考[mongo shell methods](https://docs.mongodb.com/manual/reference/method/)


### 数据库安全
mongo shell连接到数据库后，会看到一段打印  

    ** WARNING: Access control is not enabled for the database.
当前启动数据库没有任何安全措施，等同于在裸奔。登陆认证和权限划分是必要的, 具体可参考[Mongodb Security](https://docs.mongodb.com/manual/security/)  

#### 单机登陆认证

mongodb有一套基于角色的访问控制机制，即：
- 创建用户(在任何一个database下调用`db.createUser`)
- 创建时给用户分配角色（自定义角色或默认角色）
- 角色有不同的权限和资源，一个用户可以有多个角色

要启动这套机制，必须先在database `admin`中创建一个`userAdmin`或者`userAdminAnyDatabase`的角色  
具体做法如下：
- mongo shell连接上后, `use admin`
- 输入以下内容，将用户名和密码替换成自己的
    ```shell
    db.createUser({
        user: "Your_user_name",
        pwd: "Your_password",
        roles: [
            {
                role: "userAdminAnyDatabase",
                db: "admin"
            }
        ]
    })
    ```
- 成功后会显示`Successfully added user`
- 断开连接，添加`--auth`参数重启数据库， 形如： `mongod -f /path/to/conf --auth`
- 再次使用mongo shell连接数据库， 这时你有两个选择，`登陆时认证`或者`登陆后认证`
- 登陆时认证，eg: `mongo --port 27017 -u "myUserAdmin" -p "abc123" --authenticationDatabase "admin"`
- 登陆后认证
    - `use <database>` （去user所在的database做鉴权）
    - `db.auth("myUserAdmin", "myPwd")`

#### 改进配置
从lo日志看，还会看到几个warning
- 不建议root用户启动
- /sys/kernel/mm/transparent_hugepage/enabled is 'always', suggest setting to 'never'
- /sys/kernel/mm/transparent_hugepage/defrag is 'always', suggest setting to 'never'

运行
```shell
echo never >>  /sys/kernel/mm/transparent_hugepage/enabled
echo never >>  /sys/kernel/mm/transparent_hugepage/defrag
```
but……重启后失效

#### 创建新用户
开启访问控制后，需要通过认证后才能使用，创建的`userAdminAnyDatabase`角色用户，仅有管理用户和角色的权限，该用户不具备操作数据库（增删改查）的权限。
其他的操作还需分配权限  
eg: 
```shell
use test
db.createUser(
  {
    user: "myTester",
    pwd: "xyz123",
    roles: [ { role: "readWrite", db: "test" },
             { role: "read", db: "reporting" } ]
  }
)
```
- 在test数据库下创建了用户`myTester`
- 访问控制时的认证数据库为`test`
- 他拥有`test`数据库的读写权限和`reporting`数据库的只读权限

除了`read`， `readWrite`等用户`自定义角色`，其他`内置角色`参考[roles](https://docs.mongodb.com/manual/core/security-built-in-roles/)  
常用角色举例如下:
- `readAnyDatabase`
- `readWriteAnyDatabase`
- `root`

##### 创建默认角色用户
如果是默认角色，roles字段就不需要是文档型了
```shell
db.createUser({
        user: "lx",
        pwd: "paic1234",
        roles: [
            "readWriteAnyDatabase",
        ]
    })
```
##### collection级别访问控制
之前的访问控制最多到database级别，如果想进一步限制，可以在创建用户时增加[privileges](https://docs.mongodb.com/manual/core/authorization/#privileges)字段说明，包括[resource](https://docs.mongodb.com/manual/reference/resource-document/)和[actions](https://docs.mongodb.com/manual/reference/privilege-actions/)字段  
eg, 
```shell
privileges: [
    { 
        resource: { db: "products", collection: "inventory" }, 
        actions: [ "find", "update", "insert" ] 
    },
    {   
        resource: { db: "products", collection: "orders" },  
        actions: [ "find"， "remove" ] 
    }
]
```

## 数据库操作
mongodb的接口层逻辑是`database->collection->document`  
因此具体的操作，需要指定database，然后按需指定collection和document，一般均为`collection`级别的操作。  

### 重复文档
查询重复记录, 以mongo shell语法为例
```shell
db.jobs.aggregate([
    {
        $group: { _id: {id: '$unique_id'},count: {$sum: 1},dups: {$addToSet: '$_id'}}
    },
    {
        $match: {count: {$gt: 1}}
    }
])
```
原理为使用聚合函数分组，分组的key值为document记录的唯一索引，即能分辨出文档有重复的字段，
这里以`unique_id`为例，视具体情况替换。  
然后把该文档记录的默认索引`_id`存在一个数组中并计数，最后列出统计大于1的记录，即为重复的记录，如果输出为空，则表明没有重复。  

去重  
```shell
db.jobs.aggregate([
    {
        $group: { _id: {id: '$unique_id'},count: {$sum: 1},dups: {$addToSet: '$_id'}}
    },
    {
        $match: {count: {$gt: 1}}
    }
]).forEach(function(doc){
    doc.dups.shift();
    db.jobs.remove({_id: {$in: doc.dups}});
})
```
去重的处理就是根据之前存储的重复文档默认索引，然后保留一个，删除其他的重复的即可。  
上面的操作是保留第一个文档，当然也可以保留最后一个，改成`doc.dups.pop()`即可




### 数据的备份和导出
mongodb 原生提供命令行工具进行备份和导出工作
- `mongodump`/`mongorestore`
- `mongoexport`/`mongoimport`

主要区别是:  
`mongodump`导出的是bson格式，体积小，但可读性差，且不同版本可能有区别，即移植性不一定好  
`mongoexport`导出是json，csv格式，可读性和移植性好，但文件体积大

命令的使用可以添加`--help`参数查看，常用场景如下：
- `mongoexport`/`mongoimport`
    - `mongoexport <options>`
    - `mongoimport <options> <file>`
    ```shell
    mongoexport -h Host[:Port] -d Database [-c Collection] -o Output_filename [-u "User" -p "Password" --authenticationDatabase "admin"]
    ```
    ```shell
    mongoimport -h Host[:Port] -d Database [-c Collection] Output_filename [-u "User" -p "Password" --authenticationDatabase "admin"]
    ```
- `mongodump`/`mongorestore`
    - `mongodump <options>`
    - `mongorestore <options> <directory or file to restore>`
    ```shell
    mongodump -h Host[:Port] -d Database [-c Collection] -o Output_dir --gzip [-u "User" -p "Password" --authenticationDatabase "admin"]
    ```
    ```shell
    mongorestore -h Host[:Port] --dir=Output_dir --gzip [-u "User" -p "Password" --authenticationDatabase "admin"]
    ```