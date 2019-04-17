key 是数据库的物理结构，主要有两个作用
- 约束(`constraint`), 规范数据库的数据结构
- 索引(`index`), 辅助查询

关系型数据库的表(table) 一般为二维表，每一行(row)数据相当于一条记录，由多个字段组成   

关系表的基本约束就是任意两条记录不能重复，即两条记录的所有字段不能都相同，实际操作时会选一个或多个字段来区分不同的记录， 这样的字段即被称为**主键** (`primary key`)

表里的每个字段都可以指定为唯一值， 这样的字段称为**唯一键** (`unique key`)

与其他表建立关系的字段，称为**外键** (`foreign key`)

?> 设置以上三个Key 时均会**自动建立索引**， 无需重复创建

## Primary Key
大多数情况会选择一个字段作为主键，保证记录的唯一性，多个字段的情况称为联合主键，但一般不建议使用，会增加系统复杂度  
主键有以下特征：  
- 一张表只能有一个主键
- 主键不能重复, 建立主键时会自动添加唯一索引(unique index)
- 主键会自动设置为`NOT NULL`
- 主键一般采用的类型
    - 自增整数类型，由数据库维护，无需预先生成，插入数据时自增保持唯一性
    - 全局唯一GUID类型，自动生成唯一主键值

### 创建主键
> 创建表时  

单字段主键使用`PRIMARY KEY`  
多字段需要指定约束名
```sql
CREATE TABLE Persons
(
Id_P int NOT NULL,
LastName varchar(255) NOT NULL,
FirstName varchar(255),
Address varchar(255),
City varchar(255),
PRIMARY KEY (Id_P)
-- CONSTRAINT pk_PersonID PRIMARY KEY (Id_P, LastName)
)
```

> 表已经存在

```sql
ALTER TABLE Persons
ADD PRIMARY KEY (Id_P)
-- ADD CONSTRAINT pk_PersonID PRIMARY KEY (Id_P,LastName)
```

### 删除主键
```sql
ALTER TABLE Persons
DROP PRIMARY KEY
--DROP CONSTRAINT pk_PersonID
```

## Unique Key
唯一键是指定任意两条记录的某字段不允许重复  
- 一张表可以有**多个**唯一键
- 唯一键的键值可以为 null， 为null 时不会加入到索引中，所以可以有重复

### 创建唯一键
> 创建表时添加

使用 `UNIQUE`关键字
```sql
CREATE TABLE Persons
(
Id_P int NOT NULL,
LastName varchar(255) NOT NULL,
FirstName varchar(255),
Address varchar(255),
City varchar(255),
UNIQUE (Id_P)
-- CONSTRAINT uc_PersonID UNIQUE (Id_P,LastName)
)
```
> 创建后追加

```sql
ALTER TABLE Persons
ADD UNIQUE (Id_P)
-- ADD CONSTRAINT uc_PersonID UNIQUE (Id_P,LastName)
```
### 删除唯一键
```sql
ALTER TABLE Persons
DROP INDEX uc_PersonID
-- DROP CONSTRAINT uc_PersonID
```

## Foreign Key
外键是与其他表建立关系的列
### 创建外键
> 建表是创建

```sql
CREATE TABLE Orders
(
Id_O int NOT NULL,
OrderNo int NOT NULL,
Id_P int,
PRIMARY KEY (Id_O),
FOREIGN KEY (Id_P) REFERENCES Persons(Id_P)
)
```
> 命名约束，或者添加多个列为外键

```sql
CREATE TABLE Orders
(
Id_O int NOT NULL,
OrderNo int NOT NULL,
Id_P int,
PRIMARY KEY (Id_O),
CONSTRAINT fk_PerOrders FOREIGN KEY (Id_P)
REFERENCES Persons(Id_P)
)
```

> 追加外键

```sql
ALTER TABLE Orders
ADD FOREIGN KEY (Id_P)
REFERENCES Persons(Id_P)
```
### 删除外键
```sql
ALTER TABLE Orders
DROP FOREIGN KEY fk_PerOrders
```