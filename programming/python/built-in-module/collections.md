除了内置的 `list`, `tuple`, `dict`, `set`等容器类型, `collections`模块提供了一些功能强大的扩展类型

## 命名元组
`class collections.namedtuple(typename, field_names, *, rename=False, defaults=None, module=None)` 类型为 `tuple`的子类, 特点是给元组的每个位置命名, 方便后续的读取操作.  
eg:
```python
>>> Point = namedtuple('Point', ['x', 'y'])
>>> p = Point(11, y=22)     # positional or keyword arguments
>>> p[0] + p[1]             # indexable like the plain tuple (11, 22)
33
>>> x, y = p                # unpack like a regular tuple
>>> x, y
(11, 22)
>>> p.x + p.y               # fields also accessible by name
33
>>> p                       # readable __repr__ with a name=value style
Point(x=11, y=22)
```
### 初始化
`field_names` 有多种传参方式, 可以是list, tuple等序列, 也可以是字符串(逗号或者空格分隔)

### 常用方法
除了从 tuple继承的方法, 还包含额外的三个方法和两个属性
#### _make(iterable)
`_make` 是一个类方法, 可以接受一个 iterable对象参数实例化一个命名元组对象, 
也可以重新初始化一个已存在的命名元组对象
```python
>>> Point = collections.namedtuple('Point', 'x,y')
>>> Point._make([2,3])
Point(x=2, y=3)
>>> p = Point(11,12)
>>> p
Point(x=11, y=12)
>>> p._make([1,2])
Point(x=1, y=2)
```

#### _asdict()
将一个命名元组对象转化为对应的 OrderedDict对象
```python
>>> p._asdict()
OrderedDict([('x', 11), ('y', 12)])
```

#### _replace(**kwargs)
替换当前对象key的value 值, **返回一个新的对象**
```python
>>> p = Point(x=11, y=22)
>>> p._replace(x=33)
Point(x=33, y=22)
```

#### _fields
以元组类型返回当前对象所有的 key, eg:
```python
>>> p._fields            # view the field names
('x', 'y')

>>> Color = namedtuple('Color', 'red green blue')
>>> Pixel = namedtuple('Pixel', Point._fields + Color._fields)
>>> Pixel(11, 22, 128, 255, 0)
Pixel(x=11, y=22, red=128, green=255, blue=0)
```
#### \_fields\_defaults
返回属性默认值, 可以在初始化时设置对应的默认值, eg:
```python
>>> Account = namedtuple('Account', ['type', 'balance'], defaults=[0])
>>> Account._fields_defaults
{'balance': 0}
>>> Account('premium')
Account(type='premium', balance=0)
```
`defaults` 参数指定的必须为可迭代类型




## 双向队列
`class collections.deque([iterable[, maxlen]])` 类实例返回一个双向队列对象.  
特点是: 线程安全, 且支持高效地两端存取操作, 复杂度为接近为 O(1).  

虽然内置地 list类型也能近似地实现该功能, 但 list是为固定长度地列表操作设计, 调用 `pop(0)`
和 `insert(0, v)`时都会存在整个列表元素向前或向后移动的性能损耗.  

### 初始化
- 可以从一个 `iterable`对象初始化队列, 省略时回创建一个空队列
- `maxlen`不指定或为 None时, 队列会无限增长. 如果指定长度, 且达到最大长度时继续从一边插入元素, 另一边会有相同数量的元素被移除

### 常用方法
deque 也是 `collections.abc.MutableSequence`的子类, 因此存在很多和 list类的同名方法可以用, 同时也有一些自定义方法实现. 
#### appendleft(x)
从左边插入元素
#### append(x)
从右边插入元素
#### popleft(x)
从左边移除元素
#### pop(x)
从右边移除元素

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
`collections` 提供的**用户自定义类**满足了这一需求, eg:
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

## 扩展字典类型
### 默认值字典
内置的字典类型 `dict`, 访问不存在的 key, 会抛出 `KeyError`, `collections.defaultdict([default_factory[, ...]])`类则支持给所有初始化的 Key创建一个默认值  

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

### 计数字典
`collections.Counter([iterable-or-mapping])` 是一种记录可迭代元素出现次数的 dict子类.  
对应不存在的元素, 计数返回 0.
eg:
```python
>>> c = collections.Counter('aabbbcd')
>>> c
Counter({'b': 3, 'a': 2, 'c': 1, 'd': 1})
>>> c['e']
0
>>> c.most_common(2)
[('b', 3), ('a', 2)]
>>>
```
Counter类也是 dict的子类, 实例化参数也可以传入一个 mapping.  
除了继承自 dict类的方法, 也包含一些特有方法

#### elements()
返回实际元素的迭代器, 如果元素**计数小于1则忽略**
```python
>>> c = Counter(a=4, b=2, c=0, d=-2)
>>> sorted(c.elements())
['a', 'a', 'a', 'a', 'b', 'b']
```

#### most_common([n])
返回计数前 n的元素及其计数列表, 如果参数 n省略或者为 None, 则返回所有元素和它的计数

#### subtract([iterable-or-mapping])
当前 Counter实例与另一个做减法操作, eg:
```python
>>> c = Counter(a=4, b=2, c=0, d=-2)
>>> d = Counter(a=1, b=2, c=3, d=4)
>>> c.subtract(d)
>>> c
Counter({'a': 3, 'b': 0, 'c': -3, 'd': -6})
```

#### upadte([iterable-or-mapping])
执行加法操作, eg:
```python
>>> c = Counter(a=4, b=2, c=0, d=-2)
>>> d = Counter(a=1, b=2, c=3, d=4)
>>> c.update(d)
>>> c
Counter({'a': 5, 'b': 4, 'c': 3, 'd': 2})
```

#### 运算符计数
除了 `update`和 `subtract`方法, 也支持部分原生的运算符进行计算
```python
>>> c = Counter(a=3, b=1)
>>> d = Counter(a=1, b=2)
>>> c + d                       # add two counters together:  c[x] + d[x]
Counter({'a': 4, 'b': 3})
>>> c - d                       # subtract (keeping only positive counts)
Counter({'a': 2})
>>> c & d                       # intersection:  min(c[x], d[x])
Counter({'a': 1, 'b': 1})
>>> c | d                       # union:  max(c[x], d[x])
Counter({'a': 3, 'b': 2})
```

#### fromkeys(iterable)
Counter类未实现该方法, 不可用

#### 正负计数过滤
- 前置加号可以过滤掉内部的非正数计数元素
- 前置减号则是过滤非负数计数, 且返回的负数计数的相反数
```python
>>> e = collections.Counter({'a': 3, 'b': 0, 'c': -3, 'd': -6})
>>> e
Counter({'a': 3, 'b': 0, 'c': -3, 'd': -6})
>>> +e
Counter({'a': 3})
>>> -e
Counter({'d': 6, 'c': 3})
```

### 扩展字典
`class collections.ChainMap(*maps)`, 可以将多个字典或者mapping组合成一个, 相当于多次调用字典对象`update()`方法, 但效率更高. eg:  
```python
>>> baseline = {'music': 'bach', 'art': 'rembrandt'}
>>> adjustments = {'art': 'van gogh', 'opera': 'carmen'}
>>> chainmap = collections.ChainMap(adjustments, baseline)
>>> chainmap
ChainMap({'art': 'van gogh', 'opera': 'carmen'}, {'music': 'bach', 'art': 'rembrandt'})
>>> list(chainmap)
['music', 'art', 'opera']
```
#### 常用方法
- `maps`属性, 返回所有组成成员的列表
- `parents`属性, 返回除了第一个成员以外的其它成员
- `new_child(m=None)`, 继续添加新的组成成员, **返回新的ChainMap 对象**, 如果 m指定则成为第一个组成元素(即从左边添加)

