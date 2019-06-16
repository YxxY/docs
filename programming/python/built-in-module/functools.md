`functools` 模块提供了一些高阶函数, 部分可以结合装饰器使用, 功能十分强大

## 偏函数
`functools.partial(func, *args, **keywords)`, 接受一个函数为参数, 可选的传递一些固定参数给它, 返回包装后的函数.  
效果类似如下实现:
```python
def partial(func, *args, **keywords):
    def newfunc(*fargs, **fkeywords):
        newkeywords = keywords.copy()
        newkeywords.update(fkeywords)
        return func(*args, *fargs, **newkeywords)
    return newfunc
```


## reduce
`functools.reduce(function, iterable[, initializer])`, 和累加器有点类似,
eg:
```python
functools.reduce(lambda x, y: x+y, [1,2,3]) --> ((1+2)+3) = 6
```

## 包装器
`@functools.wraps(wrapped)`, 一般用在装饰器中, 消除装饰器带来的的副作用(改变函数名等)

```python
from functools import wraps

def my_decorator(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        print('Calling decorated function')
        return f(*args, **kwds)
    return wrapper

@my_decorator
def example():
    """Docstring"""
    print('Called example function')


```