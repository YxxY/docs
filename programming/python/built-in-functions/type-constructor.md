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

## set()
类构造器为 `class set([iterable])`, 返回一个新的 set对象

