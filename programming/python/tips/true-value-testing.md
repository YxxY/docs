**Python 中的任何对象都可以用作真假值判断**
  
通常用在 if, while 的条件判断中, 或者条件运算符 or, and, not里

默认情况下**一个对象的真假测试通常会为真**, 除非一些**例外**:
- 对象的类定义了 `__bool__()`方法返回 False, 或者 `__len__()`方法返回 0  
```python
    class test1:
        def __bool__(self):
            return False

    class test2:
        def __len__(self):
            return 0

    if __name__ == '__main__':
        if test1():
            print('test1 obj is true')
        else:
            print('test1 obj is false')

        if test2():
            print('test2 obj is true')
        else:
            print('test2 obj is false')
```
- 常量 `False` 以及 `None`
- 数字 `0` 或者其它值为 0的数字类型, eg: 0.0, 0j, Decimal(0)
- `空序列`, `空集合`, eg: `''`, `()`, `[]`, `{}`, `set()`, `range(0)`