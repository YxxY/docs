索引是对一列或多列的值进行预排序的数据结构  
通过使用索引，查询时不必扫描整个表，从而提高查询速度


参考 [mysql是如何使用索引的](https://dev.mysql.com/doc/refman/5.7/en/mysql-indexes.html)

## 索引类型
从数据结构来看，大致分为以下三类
- B-trees
    - 主要包括：主键索引(PRIMARY KEY)，唯一索引(UNIQUE)，普通索引(INDEX)，全文索引(FULLTEXT)
- R-trees
    - 空间索引(spatial)
- Hash
    - 哈希索引仅 `MEMORY`存储引擎支持，主要用于使用等号运算符的查询，而非范围查询

从逻辑角度分类：
- 主键索引，是一种特殊的唯一索引，不允许为null
- 普通索引（单列索引）
- 唯一索引(unique)，和`unique key`不一样
- 多列索引， 在多个字段上建立索引，只有查询条件使用了创建时的第一个字段(leftmost prefix)时
    索引才会被使用

## 索引操作
> 创建表是添加索引

```sql
CREATE TABLE mytable(
	ID INT NOT NULL,
	username VARCHAR(15) NOT NULL,
	INDEX index_name (column_name(length))
);
```

> 追加索引

```sql
CREATE [unique|fulltext|spatial] INDEX index_name
ON table_name (column_name)
```

> 删除索引

```sql
DROP INDEX index_name ON mytable;
```

