Java 是强类型语言，因此每一个变量的声明，函数返回值，都需要对应一种类型。 

## 基本数据类型
为了编程方便，Java 提供了 8种基本数据类型(primitive type), 分别是
- 4 种整型： byte, short, int, long
- 2 种浮点型：float, double
- 1 种布尔类型：boolean
- 1 种字符类型： char

![java-primitive-type](img/java_var_bits.jpg)

### char
重点说下 Java 字符类型。 Java 中字符类型使用单引号包裹。
```java
char a = 'a';
```
char 类型描述了 UTF-16编码中的一个代码单元(code unit). 

Unicode中每一个字符对应着一个码点(code point)， 一个码点包含一到多个代码单元。  

编程中我们通常需要处理的都是单个字符或者多个字符串，除非确实需要处理代码单元级别，
否则不建议使用 char类型。最好直接使用字符串类型。

