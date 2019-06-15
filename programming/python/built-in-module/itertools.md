`itertools` 模块提供了很多与迭代器相关, 十分有用的的工具类和函数.  
返回值基本也都为迭代器对象

## 无限迭代
### 无限递增迭代
`itertools.count(start=0, step=1)`, 可以自定义初始值 `start`及步长 `step` 等到一个无限增长地迭代器.  
3.1 版本后 step 支持浮点类型.  

效果类似于以下实现:
```python
def count(start=0, step=1):
    # count(10) --> 10 11 12 13 14 ...
    # count(2.5, 0.5) -> 2.5 3.0 3.5 ...
    n = start
    while True:
        yield n
        n += step
```

### 闭环循环迭代
`itertools.cycle(iterable)`, 给定一个可迭代对象, 循环返回它地组成元素  
效果类似于以下实现
```python
def cycle(iterable):
    # cycle('ABCD') --> A B C D A B C D A B C D ...
    saved = []
    for i in interable:
        yield i
        saved.append(i)
    while(saved):
        for i in saved:
            yield i
```

### 无限迭代同一元素
`itertools.repeat(obj [,n])`, 给定一个对象, 无限次(或指定次数)返回该元素  
效果类似以下实现
```python
def repeat(obj, n=None):
    # repeat(10, 3) --> 10 10 10
    if n:
        for i in range(n):
            yield obj
    else:
        while(True):
            yield obj
```

## 迭代操作
### 迭代累加器
`itertools.accumulate(iterable[, func])`, 对给定可迭代对象进行累加操作. 
效果类似于
```python
def accumulate(iterable,  func=operator.add):
    # 'Return running totals'
    # accumulate([1,2,3,4,5]) --> 1 3 6 10 15
    # accumulate([1,2,3,4,5], operator.mul) --> 1 2 6 24 120
    it = iter(iterable)
    try:
        total = next(it)
    except StopIteration:
        return 
    yield total
    for i in it:
        total = func(total, i)
        yield total
```
```python
>>> data = [3, 4, 6, 2, 1, 9, 0, 7, 5, 8]
>>> list(accumulate(data, operator.mul))     # running product
[3, 12, 72, 144, 144, 1296, 0, 0, 0, 0]
>>> list(accumulate(data, max))              # running maximum
[3, 4, 6, 6, 6, 9, 9, 9, 9, 9]
```
### 合并迭代器
`itertools.chain(*iterables)`, 将一个或多个可迭代对象合并  
效果类似于:
```python
def chain(*iterables):
    # chain('ABC', 'DEF') --> A B C D E F
    for it in interables:
        for i in it:
            yield i
```
类方法 `itertools.chain.from_iterable(iterable)`, 将一个可迭代对象内部的元素合并  
效果类似于
```python
def from_iterable(iterable):
    # chain.from_iterable(['ABC', 'DEF']) --> A B C D E F
    for it in iterable:
        for i in it:
            yield i
```

### 循环截取迭代器
`itertools.combinations(iterable, n)`, 返回指定长度 `n`个迭代器元素内容


### 排列组合迭代内容
`itertools.permutations(iterable, r=None)`, 如果 r未指定, 相当于全排  
效果类似于
```python
def permutations(iterable, r=None):
    # permutations('ABCD', 2) --> AB AC AD BA BC BD CA CB CD DA DB DC
    # permutations(range(3)) --> 012 021 102 120 201 210
    pool = tuple(iterable)
    n = len(pool)
    r = n if r is None else r
    if r > n:
        return
    indices = list(range(n))
    cycles = list(range(n, n-r, -1))
    yield tuple(pool[i] for i in indices[:r])
    while n:
        for i in reversed(range(r)):
            cycles[i] -= 1
            if cycles[i] == 0:
                indices[i:] = indices[i+1:] + indices[i:i+1]
                cycles[i] = n - i
            else:
                j = cycles[i]
                indices[i], indices[-j] = indices[-j], indices[i]
                yield tuple(pool[i] for i in indices[:r])
                break
        else:
            return
```