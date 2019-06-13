对象初始化完成后的二次操作方法

## callable()
`callable(obj)`, 判断参数对象是否可调用, 返回 True/False.  
例如类都是可调用的, 调用后返回实例对象. 但可调用不代表调用不会失败.  
如果一个类定义了`__call__()`方法, 那么它的实例也都是可直接调用的

## delattr()
`delattr(object, name)`, 删除对象属性
- name 必须为对象的一个属性名
- 只能删除可删除的属性, 等同于 `del object.attr`

## getattr()
`getattr(object, name[, default])`, 获取对象属性.  
等同于调用`obj.attr`, 当属性不存在且未提供默认值时, 抛出 `AttributeError`

## hasattr()
`hasattr(object, name)`, 判断对象是否存在某一个属性, 一般在 `getattr(obj, name)`前调用, 防止抛出错误

## setattr()
`setattr(object, name, value)`, 如果允许的话, 可以给对象添加属性或覆盖原有属性.  
相当于调用 `obj.attr = value`

## dir()
`dir([obj])`, 返回对象属性列表
- 省略参数时, 返回当前本地空间的属性列表
- 如果对象拥有 `__dir__()`方法, 则优先调用, 返回值必须为属性列表.  
    即允许重写该方法, 如果未定义, 则会从对象的`__dict__`属性收集信息

## format()
`format(value[, format_spec])`, 格式化值
- 默认情况下, format_spec为空字符串, 效果等同于 `str(value)`
- 该方法相当于调用 `type(value).__format__(value, format_spec)`.  
    即寻找value的 `__format__()`方法, 当达到object且format_spec不为空字符串则报 TypeError
- format_spec的定义参考[格式化格式](https://docs.python.org/3/library/string.html#formatspec)

## hash()
`hash(obj)`, 返回对象的哈希值(如果有), 为整型数字.  
如果参数未不可哈希的对象, 将抛出 `TypeError`.  

## id()
`id(obj)`, 返回对象Id, 为一个整型数值, 会在对象的生命周期内保持唯一性.  
CPython 的该方法实现是返回对象的内存地址.

## isinstance()
`isinstance(obj, classinfo)`, 返回布尔类型, 判断对象是否是该类型或子类型的实例.  
classinfo 必须为一种类型(type), 或者一组(tuple)类型, 否则抛出 TypeError

## issubclass()
`issubclass(class, classinfo)`, 同上, 判断一个类是否为另一类型的子类.  
需要注意的时, 一个类也是它自身的子类.  

## len()
`len(obj)`, 返回对象长度(元素个数).  
参数必须为一个序列对象(str, bytes, list, tuple, range), 或者集合(dict, set)

## next()
`next(iterator[, default])`, 返回迭代器对象的下一个值, 相当于调用它的 `__next__()`方法.  
当不存在下一个值且没有提供默认值, 继续调用则会抛出 `StopIteration`

## vars()
`vars([obj])`, 返回一个模块, 类, 实例等对象的 `__dict__`属性.  
模块对象和实例对象通常都有一个可更新的 `__dict__`属性, 当也有一些对象在这方面存在限制, 例如不允许写操作.  
不带参数时, `vars()` 效果等同于 `locals()`


