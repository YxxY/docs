## bool()
类构造器为 `class bool([x])`, 按照 [Python真假值规则](programming/python/tips/true-value-testing),   
如果 x 省略不填或者为假值, 返回 `False`, 其它情况均返回为 `True`

## bytesarray()
类构造器为 `class bytearray([source[, encoding[, errors]]])` 返回一个新的字节数组(可变序列)

## bytes()
类构造器为 `class bytes([source[, encoding[, errors]]])` 返回一个新的字节对象(不可变序列)

## complex()
类构造器为 `class complex([real[, imag]])`, 返回一个虚数对象, 默认返回 `0j`

## dict()
类构造器为:
- `class dict(**kwarg)`
- `class dict(mapping, **kwarg)`
- `class dict(iterable, **kwarg)`

返回一个 dict对象

## enumerate()
`enumerate(iterable, start=0)`返回一个可枚举对象,
- iterable 必须为一个序列或者迭代器, 或者其它实现支持迭代的对象
- 类似实现为
```python
    def enumerate(sequence, start=0):
        n = start
        for elem in sequence:
            yield n, elem
            n += 1
```

## float()
类构造器为 `class float([x]`, 返回一个浮点型数字, 参数可以为数字或者字符串, 无参数默认返回 `0.0`  
对于一个普通 Python对象 x, 调用 float(x) 等同于调用 `x.__float__()`

## frozenset()
类构造器为 `class frozenset([iterable])`, 返回一个 frozenset 对象

## list()
类构造器为 `class list([iterable])`, 返回一个 list 对象

## object()
返回一个新的普通 Python对象, 不接受任何参数.   
`object` 是所有类的基类, 因此该对象也有其它类实例拥有的方法.  
但是无法给该对象赋值新的属性

## range()
`range` 也是一种序列类型, 构造方法如下:  
- range(stop)
- range(start, stop[, step])

## set()
类构造器为 `class set([iterable])`, 返回一个新的 set对象


## str()
`str` 是内置的字符串类型, 调用 `str()`函数返回一个对象的字符串形式
- class str(object='')
- class str(object=b'', encoding='utf-8', errors='strict')


## tuple()
构造器为`class tuple([iterable])`, `tuple` 是一种不可变序列类型

## type()
- `class type(obj)`
- `class type(name, bases, dict)`

但只有一个参数时, 返回参数对象所属的类型, 相当于调用 `obj.__class__`  

但有三个参数时, 返回一个类, 相当于 `class`语句的动态形式
eg: 
```python
    class X:
        a = 1
    
    # equals to
    type('X', (object,), dict(a=1))
```