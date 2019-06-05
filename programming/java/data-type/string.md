Java 字符串就是 Unicode字符序列。 
Java没有内置字符串类型（非基本类型），而是在标准类库中提供了一个 `java.lang.String`类可以使用。  
```java
String s = "";
Strng name = "hello world";
```
因此，与基本类型不同的是，每一个双引号括起来的字符串都是 String类的一个实例对象。

由于 String类没有提供修改字符串的方法，所以生成的实例均为**不可变对象**。  
且 `String类为 final类`，故也不可继承和重写。

这种设计的优缺点：
- 因为不可变，所以拼接和截取字符串都会生成一个新的字符串对象，效率低
- 可以实现字符串共享，复制字符串时可以**共享**同一个对象

## 常用字符串方法
- 字符串长度， `length()`方法
    - 准确点说，返回的是 UTF-16编码表示的给定字符串所需的**代码单元(code unit)数量**, 非组成字符数。  
- 子串，`substring(start, end)`方法
    ```java
    String a = "helloworld";
    String b = a.substring(0, 5); //"hello"
    ```
- 拼接， `+` 运算符重载
    ```java
    String a = "hello";
    String b = "world";
    String ret = a + b;
    ```
    另外，当一个字符串与一个**非字符串的值**（包括基本类型和对象）拼接时，后者会被转化为字符串。  
    因为**任何一个对象都可以被转换为字符串**。
- 比较值相等，`equals`和`compareTo`方法  
    返回值为布尔值
    ```java
    a.equals(b);
    "hello".equals(a);

    if(a.compareTo(b) == 0)...
    ```
    **使用`==` 比较两个字符串是检测两个是否为同一对象**，如果相同，那么字符串值必然相同
    ```java
        String a = "hello";
        String b = "hello";

        String c = new String("hello");
        String d = new String("hello");

        System.out.println(a == b);      //true, 字符串对象重用
        System.out.println(a.equals(b)); //true
        System.out.println(c == d);      //false，使用 new会产生新的对象
        System.out.println(c.equals(d)); //true
        System.out.println(c.equals(a)); //true
    ```
- 空串 vs null  
    字符空串和null不是一个概念， **String 变量可以存一个特殊的值，名为`null`**, 表示没有指向任何对象。
    ```java
    if(str != null && str.length != 0)... //判断非空且非null
    ```
    
## 构造字符串

由于字符串对象的不可变特性，字符串拼接时都会**产生新的字符串对象**，这样做即浪费空间，效率也不高。    
针对这类问题，解决方案是使用 `StringBuilder`类来构造字符串。
```java
StringBuilder builder = new StringBuilder();
builder.append(ch); //可以拼接单个字符
builder.append(str); //可以拼接字符串

String ret = builder.toString(); //构建完成生成最终的字符串对象
```
StringBuilder 是JDK5.0 引入的的， 这个类前身是 `StringBuffer`类， 区别是：
- StringBuffer 线程安全，允许多线程操作，但效率低
- StringBuilder 没有加锁，单线程编辑效率高

一般在单线程下建议使用 StringBuilder