除了内置的 `list`, `tuple`, `dict`, `set`等容器类型, `collections`模块提供了一些功能强大的扩展类型

## 用户自定义类
通过 list, dict, str等类型创建的实例对象无法增加对象属性和方法, 
增加的时候会抛出 `AttributeError`.  
```python
>>> c = list([1,2,3])
>>> c.a =1
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'list' object has no attribute 'a'
```
`collections` 提供的自定义类满足了这一需求, eg:
```python
>>> import collections
>>> a = collections.UserList([1,2,3])
>>> a.c = 1
>>> a
[1, 2, 3]
>>> a.c
1
>>>
```
类似的类有如下几种:
- `UserList`
- `UserDict`
- `UserString`

和内置类的区别就在于实例可以添加对象属性, 且默认 `data`属性, 返回存储的元素值
## 自定义字典类型
### 默认值字典
内置的字典类型 `dict`, 访问不存在的 key, 会抛出 `KeyError`, `collections.defaultdict([default_factory[, ...]])`类则支持给所有初始化的 Key创建一个默认值.

`defaultdict` 是 dict的子类  
- 第一个参数为默认值的类型, 如果为 None或省略则表现的和 dict完全一样. 后续参数和创建 dict实例完全相同
- 实例对象存在一个 `default_factory`属性记录创建时的默认类型

eg:
```python
>>> a = dict(a=1)
>>> a['b']
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
KeyError: 'b'
>>> b = collections.defaultdict(int, a=1)
>>> b['b']
0
>>> b['a']
1
>>>
```
效果类似于 `dict_obj.setdefault(key, default)`, 但不需要为每一个具体的 key设置默认值, 而是批量设置默认值

### 有序字典
dict实例对象里的 key-value对是不保证顺序的, 即迭代时不保证能按照插入的顺序返回元素.  
`collections.OrderedDict([items])`类则提供按照插入顺序返回元素的保证, 同时提供一些自定义配置方法:
- `popitem(last=True)`实例方法, 移除末位元素. 
  - 如果 `last`为默认值 True, 那么会按照先入先出的顺序弹出元素, 即移除末位元素
  - 如果为 False, 那么则按照先入后出的属性弹出元素, 即移除首位元素
- `move_to_end(key, last=True)`实例方法, 移动 key到末尾, 同上 `last`参数决定末尾的方向  
  eg:
  ```python
  >>> d = OrderedDict.fromkeys('abcde')
  >>> d.move_to_end('b')
  >>> ''.join(d.keys())
  'acdeb'
  >>> d.move_to_end('b', last=False)
  >>> ''.join(d.keys())
  'bacde'
  ```
- 也支持使用 `reversed()`实现反向迭代
- OrderedDict类也是 dict的子类, 实例化参数和dict相同

