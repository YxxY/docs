开篇的时候说过，Java 中的类(class)时一等公民，各种操作都是围绕类展开。  
类是对象的模板，构造对象的过程叫做实例化，  
标准库中提供了几千个类，可以用于网络编程，界面设计等。
尽管如此，还是需要定义自己的类，完成一些自定义数据的封装。


## 用户自定义类
定义一个类形式如下：
```java
class classname{
    field1
    field2
    ...
    constructor1
    constructor2
    ...
    method1
    method2
}
```

### 类与类之间的关系
- 依赖（uses-a）
- 聚合（has-a）
- 继承（is-a）

### 构造器
构造器是一个和类名同名的方法，但与普通方法不同的地方在于
- 无需定义返回值类型，因为没有返回值。
- 调用时总是伴随着 `new`关键字

一个类可以有多个构造器，根据参数不同实现重载。

!> 不能在类中使用和与实例域重名的变量，建议带上 `this`关键字区分

如果没有编写构造器，那么系统会默认提供一个无参数的构造器。
这个构造器将所有的实例域设置为默认值。

构造对象后，没有初始化的域也会使用默认值，但不推荐这么做，建议使用更加清晰的值初始化。

**构造器内部还可以继续调用另一个构造器**，这是 `this`的另一个用法。

eg：
```java
public class Person{
    String name;
    int age;
    String gender;

    public Person(String name, int age){
        this(name, age, "female");
    }

    public Persion(String name, int age, String gender){
        this.name  = name;
        this.age = age;
        this.gender = gender;
    }
}
```


### 数据域
数据域(field)包括实例域和静态变量。  
- 实例域每个对象都会有一份拷贝，仅实例对象自己使用，类无法访问。  
- 静态变量是类变量，只存储一份，类和实例对象均可访问（如果有权限的话）

数据域的初始化有三种方式：
- 声明时赋值
- 构造器中设置值
- 使用初始化块, 即大括号包裹的代码块，一般很少使用，没有必要

### main方法
一个类只能有一个 main方法，常用来对类进行单元测试。也是主类的执行入口。  

### 方法参数
类中定义的方法参数均为**值调用**(`call by value`), 非引用调用(call by referance)。  

**方法内部操作的参数均为参的拷贝**。
如果是基本数据类型会复制一份新的值。如果是对象，则会产生一个新的对象引用。

可以写个测试类验证下
```java
public class TestMethodArgs{
    public static void plus(int a){
        a = a + 10;
    }
    public static void swap(String a, String b){
        String tmp = a;
        a = b;
        b = tmp;
    }
    public static void main(String[] args){
        int num = 10;
        TestMethodArgs.plus(num);

        System.out.println(num);   // 10

        String a = "hello";
        String b = "world";
        TestMethodArgs.swap(a, b);

        System.out.println(a + b); //"helloworld" 
    }
}
```

## 类设计原则
- 保证数据私有，使用公开的访问器和修改器方法加以控制。    
    也不是所有的域都需要独立的访问器和修改器。
- 一定要对数据初始化，最好是显式的设置
- 不要在类中过多的使用基本类型，可以使用一个单独的类来拆分封装
- 将职责过多的类进行拆分
- 良好的命名，类名一般为名词，形容词修饰的名词，或者动名词(-ing结尾)