其实编码问题无关编程语言，之前写过一个这方面的总结[字符编码](/common-sense/char-encoding)  
只是Python里，特别是Python2里经常会遇到相关问题，所以再总结一次

## Python 2 VS Python 3

Python 2 中关于字符串相关的类型有两种：`str`, `unicode`  
Python 3 也是有两种： `str` 和 `bytes`  

python 2和3 默认的字符串类型都是`str`  

但Python 2 里`str` 其实对应着Python 3里的 `bytes`  
Python 3 里`str` 对应着Python 2里的 `unicode`

看着有点绕，举例说明如下
```python
# python 2
>>> str1 = 'abc'
>>> isinstance(str1, str)     # True
>>> isinstance(str2, bytes)   # True, just a alias, not a new type
>>> str2 = u'abc' 
>>> isinstance(str2, unicode) # True

# python 3
>>> str1 = 'abc'
>>> isinstance(str1, str)    # True
>>> isinstance(str1, bytes)  # False
>>> str2 = b'abc' 
>>> isinstance(str2, bytes)  # True
```

## Python 2
### str
python 2 字符串类型是str， 在中文Windows平台默认编码是GBK，如果以GBK的编码方式存储， 
此时的字符串更像是`字节串`  
使用`len()`函数得到的是`字节的长度`

```python2
>>> a = '你好'
>>> a
'\xc4\xe3\xba\xc3'
>>> type(a)
<type 'str'>
>>> len(a)
4
```
Python 2的字符串编码随文件编码方式和系统而定， 默认是ASCII编码，即单字节编码
这里我使用的是中文win10 平台， GBK编码，所以中文会按双字节编码

### unicode
字符串前加上`u`表明是Unicode字符串， 存储是会根据具体的Unicode实现去存
```python2
>>> a = u'你好'
>>> a
u'\u4f60\u597d'
>>> type(a)
<type 'unicode'>
>>> len(a)
2
```

u'你好' 等同于 u'\u4f60\u597d'
```python2
>>> a = u'\u4f60\u597d'
>>> print a
你好
>>> type(a)
<type 'unicode'>
>>> u'你好' == u'\u4f60\u597d'
True
>>> u'你好' is u'\u4f60\u597d'
True
```

这里的is相等是由于`字符串驻留`（another topic :)），但也间接说明他们确实是同一字符串，
这个有助于理解Unicode String在内存里的对象形态

### str to unicode
str 到 unicode 类型的转换，如同Unicode三明治模型里说表示的  
input 根据编码类型decode 成Unicode Strings

```python2
>>> a = '你好'
>>> b = a.decode('gbk')
>>> type(b)
<type 'unicode'>
>>> b
u'\u4f60\u597d'
>>> print b
你好
```
### unicode to str
依旧按照三明治模型，如果有转换编码输出，在Unicode对象上调用encode方法即可  
```python2
>>> a = '你好'
>>> a
'\xc4\xe3\xba\xc3'
>>> b = a.decode('gbk')
>>> c = b.encode('ascii')
UnicodeEncodeError: 'ascii' codec can't encode characters  
in position 0-1: ordinal not in range(128)
>>> d = b.encode('utf-8')
>>> d
'\xe4\xbd\xa0\xe5\xa5\xbd'
>>> print d
浣犲ソ
```
b 即为转换的Unicode对象，转换成ASCII失败，是因为中文无法使用ASCII编码， 而UTF-8则没有问题  
d 之所以是乱码是因为控制台的编码方式是GBK，它会尝试以GBK的方式去解码UTF-8编码生成的6个字节，
因此产生了3个不相符的字符  
这仅仅是巧合，刚好字符码处于两个字符集的交叉位置，如果字符码在字符集里不存在，那么解码时会报`decode error`

## Python 3
### str
python 3的str默认就是Unicode 字符串, 如同python 2里的Unicode类型字符串，前置的标识`u`字母可省略
```python3
>>> a = '你好'
>>> a
'你好'
>>> type(a)
<class 'str'>
>>> len(a)
2
```

### bytes
Python3.X新增了bytes类型，前置字母`b`表示python 2中的字节串  
这个类型在一些Python2.x 里也有，但并不是一个新的实现，只是`str`类型的别名  

```python3
>>> b =b'abc'
>>> b
b'abc'
>>> type(b)
<class 'bytes'>
```
> 注意 `'abc'` 和 `b'abc'`的区别， 虽然他们均表示字符串abc， 但是后者存储时每个字符仅占一个字节， 
前者如果是UTF-16方案实现，每个字符会占用两个字节， UTF-8则仍然是一个字节

```python3
>>> 'abc' == b'abc'
False
>>> 'abc' is b'abc'
False

# Python 2中上述值均为 True
```

str类型和bytes类型的相互转化, 依然采用三明治模型的方法
```python3
>>> a = '你好'
>>> b = a.encode('gbk')
>>> type(b)
<class 'bytes'>
>>>
>>> c = b.decode('gbk')
>>> c
'你好'
>>> type(c)
<class 'str'>
```


## 编码声明
说了这么多，补充一点python文件开头的编码声明的作用

一般在文件开头处，形如  
```python
# coding=utf-8
```

如果不写这一行声明，文件会以ASCII编码方式解码，当存在非ASCII字符时，会报错  
> SyntaxError: Non-ASCII character

如果声明和实际编码方式不符，则可能导致乱码或者报错