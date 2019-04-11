## client连接
使用自带的mongo shell连接数据库， 官方使用文档[mongo shell](https://docs.mongodb.com/manual/mongo/#start-the-mongo-shell)  

- 运行命令`mongo -h`, 查看命令行帮助
- 直接运行
    
        mongo
    会尝试连接本地默认数据库端口27017，如果ip和端口有改动需要手动指定`--host`, `--port`参数

## mongo shell操作
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