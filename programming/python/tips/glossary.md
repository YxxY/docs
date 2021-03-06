详情参考 [官方文档](https://docs.python.org/3/glossary.html)  

## immutable
一个有着**固定不变值**的对象, 
如果要改变值需创建新的对象.  
Python 里的不可变对象包括**数字**, **字符串**和**元组**.  

## iterable
可迭代意味着可以一次返回一个组成元素, 通常使用**for循环**来迭代元素.  
Python 里的可迭代对象包括
- 所有的序列类型(str, list, tuple, range等), 
- 一些非序列类型(dict, file objects), 
- 定义了 `__iter__()`和 `__getitem__()`方法的类的实例对象, 相当于手动实现了一个序列

## iterator
迭代器对象代表着一个数据流.  
实现上继承自 `iterable`, 每次调用 `__iter__()`返回迭代器自己.  
通过调用自身的 `__next__()`方法, 或者内置 `next()`函数来返回连续的数据, 当没有数据可以返回时抛出 `StopIteration`异常.  


## hashable
如果一个对象可满足以下条件, 那么它就是可哈希的:
- 可以生成一个固定不变的哈希值(需要实现 `__hash__()`方法)
- 可以与其它对象进行比较(需要实现 `__eq__()`方法), 
- 如果相等则必须有相同的哈希值

可哈希的对象可以用来作为字典对象(dict)的键, 以及集合(set)的成员, 他们内部的数据结构实现用到了对象的哈希值.  
Python 里的大多数不可变(immutable)对象都是可哈希的, 而可变对象(eg: list, dict)则不支持.  
不可变的容器对象是否可哈希取决于所有元素是否都可哈希.  
用户自定义类的实例对象默认都是可哈希的, 且哈希值可通过全局函数 `id()`获得

