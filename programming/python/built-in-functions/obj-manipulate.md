对象初始化完成后的二次操作方法

## callable()
`callable(obj)`, 判断参数对象是否可调用, 返回 True/False.  
例如类都是可调用的, 返回实例对象. 但可调用不代表调用不会失败.  
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


