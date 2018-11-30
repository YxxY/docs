当前启动数据库没有任何安全措施，等同于裸奔  
登陆认证和权限划分是必要的, 官方文档见[Mongodb Security](https://docs.mongodb.com/manual/security/) 

## 登陆认证
mongodb有一套基于角色的访问控制机制，即：
- 创建用户(在任何一个database下调用`db.createUser`)
- 创建时给用户分配角色（自定义角色或默认角色）
- 角色有不同的权限和资源，一个用户可以有多个角色

要启动这套机制，必须先在database `admin`中创建一个`userAdmin`或者`userAdminAnyDatabase`的角色  

总的来说分三步
- 创建一个数据库账号
- 打开数据库连接认证
- 连接时使用之前创建的账号做鉴权

### 创建admin账号
- 使用内置的mongo shell客户端连接上服务器后, 使用命令`use admin`切换到admin
- 运行以下命令创建管理员账户，`将用户名和密码替换成自己的`
    ```shell
    db.createUser({
        user: "sora",
        pwd: "paic1234",
        roles: [
            {
                role: "userAdminAnyDatabase",
                db: "admin"
            }
        ]
    })
    ```
- 成功后会显示`Successfully added user`

### 数据库安全认证
这里相关于有一个开关，打开这个开关后，必须先通过认证，才能进行后续数据库操作，否则会提示没有权限  

> 这个开关即启动server时，添加`--auth`命令行参数即可

关闭数据库server（shutdown），添加`--auth`参数重启数据库， 形如： `mongod -f /path/to/conf --auth`

### 连接鉴权
依旧使用mongo shell来举例，其他客户端操作类似  
连接数据库， 这时你两个选择，`登陆时认证`或者`登陆后认证`
- 登陆时认证    
    
        mongo --port 35726 -u "sora" -p "paic1234" --authenticationDatabase "admin"
- 登陆后认证
    - `use <database>` （去user所在的database做鉴权）
    - `db.auth("myUserAdmin", "myPwd")`

## 创建新用户
开启访问控制后，需要通过认证后才能使用  
但刚刚创建的`userAdminAnyDatabase`角色用户，仅有管理用户和角色的权限，该用户不具备操作数据库（增删改查）的权限。  
当然可以在创建管理员账号时赋予他更多的权限，但本着让职责清晰的原则，其他的操作还是创建新用户并分配权限比较好, eg: 
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

### 创建默认角色用户
如果是内置角色，roles字段就不需要是文档型了
```shell
db.createUser({
        user: "lx",
        pwd: "paic1234",
        roles: [
            "readWriteAnyDatabase",
        ]
    })
```
!> 该角色用户只能在database `admin`下创建

### collection级别访问控制
之前的访问控制最多到database级别，如果想进一步限制  
可以在创建用户时增加[privileges](https://docs.mongodb.com/manual/core/authorization/#privileges)字段说明，包括[resource](https://docs.mongodb.com/manual/reference/resource-document/)和[actions](https://docs.mongodb.com/manual/reference/privilege-actions/)字段  
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