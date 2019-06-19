## 访问修饰符
类（class）是 Java中的一等公民，OOP 中在描述类与类，类与对象之间的关系时，通常需要加一些限制：
- 当前类对哪些类可见
- 类的构造器，方法，变量的访问限制

这就是访问修饰符(access modifier)的作用，修饰类，类中的嵌套类，类构造器，类中的方法及变量，并起到访问限制的作用。

Java 中一共有四类修饰符 `public`, `private`, `protected` 以及默认修饰（没有任何修饰符）

!> 访问修饰符一般声明在**最外层**，不添加任何修饰符时，默认限制在当前包(package)内

修饰符的作用类似“做标记”， 可以标记的对象如下：  

target\modifier | public | default | protected | private
----------------|--------|---------|-----------|--------
class   | YES | YES | **`NO`** | **`NO`**
Nested class | YES | YES | YES | YES
constructor | YES | YES | YES | YES
method | YES | YES | YES | YES
field | YES | YES | YES | YES

**访问控制范围**:  

target\modifer| public | protected | default | private
--------------|--------|---------|-----------|--------
same class    | YES| YES| YES| YES
same package  | YES| YES| YES|
sub class(not the same package)| YES | YES
Other class| YES


总结来说，如下：
- 访问修饰符可以修饰的对象包括：类，嵌套类，构造器，方法，域
- 访问修饰符不是必要的，因为都可以缺省
- **不能使用 protected 或 private修饰一个类**，因为这意味着没有其它的类可以访问它，也就是说无法使用这个类，这是没有任何意义的。

### private
如果一个变量或者方法被 `private`修饰，那么只能在当前类中访问它，当前类的子类或外部类均无法访问。  

一般private 修饰的方法和变量，是不希望被外部直接调用，只提供包装后的接口。  
例如，定义一个 private的实例域，然后提供 public的getter和setter方法。这是十分常见的操作，保证封装性

### public
- Java保存的文件名必须与类名一致；
- 如果文件中只有一个类，文件名必须与类名一致；
- 一个Java文件中只能有一个public类；
- 如果文件中不止一个类，文件名必须与public类名一致；
- 如果文件中不止一个类，而且没有public类，文件名可与任一类名一致。

public 表示公开访问权限，表示无限制

### package
不加任何访问修饰符时，表示默认修饰，那么同一个package的类和方法均可访问

### protected
对继承的限制，表示只有继承的子类和同一包中的类才有权限访问



## static
static 关键字可以修饰 method，field（仅成员变量），code block  
### 静态变量
当 static 修饰一个变量，它被称为静态变量，也称为类变量。

一般用来声明一个**静态常量**, 也可以是静态变量。起到类似全局的作用
```java
public class Test{
    private static int VALUE = 10;
    public static void main(String[] args){

        System.out.println(Test.VALUE);       //10
        System.out.println(new Test().VALUE); //10
    }
}
```
- 静态变量只会保存一份拷贝，不会像实例变量那样，每个实例都有一份自己的拷贝。
- 实例对象也可以操作静态变量，因此，不希望被改变时需要加上 `final`关键字修饰
- static是不允许用来修饰局部变量

### 静态方法
跟静态变量类似，隶属于类，只有一份拷贝。**但是实例对象也可以访问**。  
和实例方法重大区别是，方法内部不能包含 `this`, 意味着**静态方法内部不能调用非静态方法**。  
也进一步说明， 该访问隶属于类，而不属于实例对象。

```java
public class Test{
    private static String sayHello(){
        return "hello";
    }

    public static void main(String[] args){
        System.out.println(Test.sayHello());  //hello
        System.out.println(new Test().sayHello()); //hello
    }
}
```

### 静态代码块
static关键字还有一个比较关键的作用就是 用来形成静态代码块以优化程序性能。
static块可以置于类中的任何地方，类中可以有多个static块。
在类初次被加载的时候，会按照static块的顺序来执行每个static块，并且只会执行一次。
```java
public class Test extends Base{
 
    static{
        System.out.println("test static");
    }
     
    public Test(){
        System.out.println("test constructor");
    }
     
    public static void main(String[] args) {
        new Test();
    }
}
 
class Base{
     
    static{
        System.out.println("base static");
    }
     
    public Base(){
        System.out.println("base constructor");
    }
}
```
这一段代码有助于理解程序运行的过程：
- 首先查找入口 main方法，执行 main方法前需要先加载类
- 加载 Test类时发现继承自 Base类，所以先加载父类。加载时按顺序执行一次，因此打印 "base static"
- 然后加载 Test类自身， 打印 "test static"
- 执行 main方法，执行`new Test()`前，先调用父类的构造器，再调用自身的构造器

### 静态导入
```java
import static java.lang.System.*

//后续可直接使用静态方法和静态变量
out.println("hello wolrd"); //System.out
exit(0); //System.exit
```
## final
Java 保留了 `const`关键字，但是没有使用。相应的使用了`final`关键字。  
final 可以修饰 method, field, class

- 修饰变量。
    - 无论修饰的是成员变量还是局部变量，如果是基本类型变量，则变量值不再变化。  
        如果是引用类型，则该变量不能改变指向。
- 修饰方法
    - 用 final修饰方法，是将其锁定，防止继承类修改。  
        使用 final后，继承类无法重写该方法。
    - private 方法会被隐式的指定为 final方法
- 修饰类
    - 被修饰类无法被继承。
    - final 类中的所有成员方法都会被隐式指定为 final方法

