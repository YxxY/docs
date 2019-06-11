**`list`** 是python 内置数据类型之一，表示[可变序列](https://docs.python.org/zh-cn/3.7/library/stdtypes.html?highlight=list)(mutable sequences)


## 初始化
构造函数形如：  
> class list([iterable])

可以用多种方式构建列表对象:
- 使用一对方括号来表示空列表: []
- 使用方括号，其中的项以逗号分隔: [a], [a, b, c]
- 使用**列表推导式**: [x for x in iterable]
- 使用类型的**构造器**: 
    - `list()`, 返回空列表
    - list(iterable) , **iterable** 可以是序列、支持迭代的容器或其它可迭代对象.  
    如果 iterable 已经是一个列表，将创建并返回其副本

## 常用操作
### 元素取值
通过下标 `a[i]`
- 同样适用于 str, tuple, range等序列
- 下标可以为负数, 相当于 `len(a) + i`
- 下标越界会报 `IndexError`

### 元素包含关系
使用 `in` 或 `not in` 操作符, eg:
- `item in x`
- `item not in x`
- 返回 True/False  
- 同样使用于 tuple, range
- 在其它特殊序列如 `str`, `bytes`, `bytearray`
中, 通常用作子序列验证, eg: `"gg" in "eggs"`

### 拼接
拼接(concatenation)使用 `+` 运算符  
Python 重载了加号运算符用于拼接序列(str, list, tuple等), 
但需要注意的是, 
- 仅支持相同数据类型的拼接
- 不可变类型序列(eg: str, bytes, tuple)的拼接永远是生成新的序列  
    因此效率不高且浪费空间, 不建议再大量操作时使用
- 不是所有序列类型都支持拼接, 例如 **range类型则不支持拼接**

### 重复填充
重复(repetition)使用 `*`号, eg: `s * n` , 将 s 与自己累加 n 次

- 同理适用于大部分序列类型, 如: str, tuple等, 但**不适用于 range**
- 如果 n 小于 0, 均取 0, **返回当前类型的空序列**
- 重复填充的对象均为**引用类型**, 非值传递
    ```shell
    >>> lists = [[]] * 3
    >>> lists
    [[], [], []]
    >>> lists[0].append(3)
    >>> lists
    [[3], [3], [3]]
    ```
    要想填充独立的对象可以使用 `[[] for i in range(3)]`

### 获取元素下标
使用对象 `index`方法, 返回元素**第一次出现**的下标. eg: `s.index(x [, i[, j]])`, 类似于 javascript 里的 `indexOf`方法  
但不同的是, 如果元素不再序列内时会抛出 `ValueError`, 而不是像 indexof 返回 -1
- 同样使用于 str, tuple, range 等序列
- 也可以指定查询范围 [i, j]
- 元素值必须在序列内, 否则报错

### 计数
统计序列类某个元素的重复次数,使得对象 `count` 方法, eg: `s.count(x)`
- 同样适用于 str, tuple, range 等序列