在Java 中使用包结构，可以将类有序的组织起来。  
标准的Java 类库分布在各个包中，例如`java.lang`, `java.util`等。 

所有的标准Java 包都处于 `java`和`javax`的包层次中  

包名相当于命名空间，自定义包时为了保证唯一性，一般使用公司域名的倒序

## 将类放入包中
在源文件的开头声明包名即可
```java
//Test.java

package com.github.yxxy;

public class Test{
    ...
}
```

没有声明任何的包名的类，将被放在一个默认包(default package)中。  
默认是一个没有名字的包。

原则上声明包名后，源文件应该放到与完整包名相匹配的文件目录下。  
例子中的文件应该被放在`com/github/yxxy` 文件目录下。

编译后的类文件也会被放在相同的目录结构中


## 从包中导入类
- 使用完整的包名和类名
- 使用`import`

例如，要使用 `java.util`包下的 `ArrayList`类
```java
java.util.ArrayList<String> arr = new java.util.ArrayList<>()
```
这样写没有问题，但显得非常繁琐，有更简洁的方式
```java
import java.util.ArrayList

ArrayList<String> arr = new ArrayList<>()
```

当需要导入包中多个类时，可以使用通配符 `*`, eg: `import java.util.*`

当两个包中有重名类时，需要显示声明  
```java
import java.util.*;
import java.sql.*;
import java.util.Date;
```
java.util 和 java.sql 中都存在Date 类， 编译器无法确定具体要使用哪一个，如果不指定就会报错

## 静态导入
import 不仅能导入类，还可以导入类的静态方法和静态域。  
使用时即可省略类名  

eg: `import static java.lang.System.*`

后续就可以直接使用
```java
out.println("hello wolrd"); //System.out
exit(0); //System.exit
```

## 包作用域
之前说明过访问修饰符(access modifier) `public` 和 `private`  
被 public修饰的部分可以被任意的类使用。
被 private修饰的部分，只能被当前类使用。  
如果没有声明 public或private，则可以被**同一个包中**的所有方法访问

## 类路径
类路径是告诉 javac编译器以及 java虚拟机，所需要的类文件的位置。  
javac 默认会在当前目录寻找文件，但 java 虚拟机只会在指定的类路径中寻找文件。

所以新手可能会遇到编译没有问题，执行时出现找不到类的错误。

设置类路径可以指定环境变量`CLASSPATH`, 也可以使用命令行选项 `-classpath`(或 `-cp`) 动态指定





