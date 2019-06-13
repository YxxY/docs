除了内置 `math`库, 一些内置函数也可以使用

## abs()
`abs(x)`, 参数为数字类型, 否则报 TypeError. 返回它的绝对值

## divmod()
`divmod(a, b)`, 接受两个非虚数的数字类型参数, 返回一个数字元组, 
相当于 `(a // b, a % b)`

## max()
- `max(iterable, *[, key, default])`
- `max(arg1, arg2, *args[, key])`

返回两个或更多元素里最大那个, 同理  min()`方法则返回最小的元素

## pow()
`pow(x, y[, z])`, 接受数字类型参数进行指数计数, 返回 x 的 y 次方.  
如果存在第三个参数, 则相当于 `pow(x, y) % z`, 但效率更高

## round()
`round(number[, ndigits])`, 保留 n位小数, 返回值趋近于 `pow(10, ndigits)`. 
如果省略第二个参数, 则返回离它最近的整数.  

如果向上和向下取值的差值相同, 就取**偶数值**(非四舍五入), eg:
- round(0.5) 和 round(-0.5) 为 0
- round(1.5) 为 2, round(2.5) 为 3 (取偶)

## sum()
`sum(iterable[, start])`, 求和
- 可迭代对象的元素应该为数字类型
- start 默认为0, 且必须为数字类型

# sorted()
`sorted(iterable, *, key=None, reverse=False)`, 给可迭代对象的元素进行排序.   
两个可选参数必须为关键字参数, eg:
- key, 指定一个函数, 用来作为比较大小的规则(eg: str.lower). 默认为 None, 即直接比较元素
- reverse, 布尔类型, 反向排序

