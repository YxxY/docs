## 数据的导入和导出

mongodb 原生提供命令行工具进行备份和导出工作
- `mongodump`/`mongorestore`
- `mongoexport`/`mongoimport`

主要区别是:  
`mongodump`导出的是bson格式，体积小，但可读性差，且不同版本可能有区别，即移植性不一定好  
`mongoexport`导出是json，csv格式，可读性和移植性好，但文件体积大

### mongoexport / mongoimport
命令的使用可以添加`--help`参数查看，常用场景如下：
- `mongoexport <options>`
- `mongoimport <options> <file>`

> mongoexport -h Host[:Port] -d Database [-c Collection] -o Output_filename 
[-u "User" -p "Password" --authenticationDatabase "admin"]

> mongoimport -h Host[:Port] -d Database [-c Collection] Output_filename 
[-u "User" -p "Password" --authenticationDatabase "admin"]

### mongodump / mongorestore
- `mongodump <options>`
- `mongorestore <options> <directory or file to restore>`

> mongodump -h Host[:Port] -d Database [-c Collection] -o Output_dir --gzip 
[-u "User" -p "Password" --authenticationDatabase "admin"]

> mongorestore -h Host[:Port] -d Database --dir=Output_dir --gzip 
[-u "User" -p "Password" --authenticationDatabase "admin"]