**`list`** 是python 内置数据类型之一，表示[可变序列](https://docs.python.org/zh-cn/3.7/library/stdtypes.html?highlight=list)

构造函数形如：  
> class list([iterable])

可以用多种方式构建列表:
- 使用一对方括号来表示空列表: []
- 使用方括号，其中的项以逗号分隔: [a], [a, b, c]
- 使用列表推导式: [x for x in iterable]
- 使用类型的构造器: list() 或 list(iterable)
- **iterable** 可以是序列、支持迭代的容器或其它可迭代对象。 如果 iterable 已经是一个列表，将创建并返回其副本

