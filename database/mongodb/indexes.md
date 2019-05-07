refer to [mongodb-indexes](https://docs.mongodb.com/manual/indexes/)

## 索引作用
- 让**查询**操作更有效率
- 如果没有索引，查询会做全集合扫描，然后过滤符合条件的文档
- 有索引，就可以根据索引，缩小查找的范围

## 索引结构
总的来说，MongoDB的索引和其它数据库的差不多，是是一种特殊的数据结构。定义在 collection 级别，以一种易于遍历的方式存储集合的一小部分数据。  

具体来说就是索引会**有序**地存储某一个或多个具体的字段值。因为是有序存储，所以快速的匹配和基于范围的查询。除此之外，默认返回的结果也会按照索引的顺序排列。  

mongoDB 在 collection 创建时就会创建一个 `unique index` 在 `_id`字段上。
`_id` 是一个自动生成的`objectid`, 保证文档的唯一性

## 创建索引
索引创建有多种接口，可以根据使用的编程语言选择对应的驱动接口，以自带的mongo shell 为例: [db.collection.createIndex(keys, options)](https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/#db.collection.createIndex)

```mongo shell
db.collection.createIndex( { name: -1 } )
```
key-value 对，key 即为索引字段名，value为 1 表示升序， -1 为降序

