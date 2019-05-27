本文结论主要参考官方文档 [泛型](https://docs.oracle.com/javase/tutorial/java/generics/types.html)  

泛型(generic type)描述的是一个类(class)或者接口(interface)它们的参数不固定为一种类型。这是 Java SE 5.0 后推出的特性。 

## why generic type？
为什么要用泛型，可以对比下使用和不使用的差别。  
写一个非泛型的 Box类来操作任意类型的对象，只提供setter和getter方法，实现如下：
```java
public class Box{
    private Object box;
    public Object get(){
        return box;
    }
    public void set(Object obj){
        box = obj;
    }
}
```
没什么问题，十分简单。但是有几个问题：
- 因为参数类型是 `Object`类型，也就是你可以传任意**非基本类型**的数据都可以，无法做静态检查，这不是很符合强类型语言的特点。
- 因为没有类型限制，所以容易出现运行时类型错误
- 为了保证不出错，需要强制转化的成本

再来看一个泛型的版本
```java
public class Box<T>{
    private T box;
    public T get(){
        return box;
    }
    public void set(T obj){
        box = obj;
    }
}
```
区别就是使用了参数 `T`类型替代了原来的 `Object`类型。  
如同一个通配符，在使用时，T 可以是任意**非基本数据类型**。
```java
Box<String> box = new Box<String>();

Box<Integer> box = new Box<Integer>();

//Java SE 7 之后, 赋值时可以省略右边的参数类型
Box<String> box = new Box<>();
```

## 泛型命名约定
安装惯例，类型参数名需要大写，比较常用的类型参数如下
- E, Element(在Java 集合框架里广泛使用)
- K, Key
- V, Value
- N, Number
- T, Type
- S, U, V, etc. Type（只有一种类型习惯用 T表示，多个类型时使用其它临近字母）

## 通配符泛型
当类型不确定时，还可以使用`<?>`来表示 Object及其下的任何Java类
```java
Class<?> classType = Class.forName("java.lang.String");
```

## 多接口泛型
由于 Java没有多继承，但是可以实现多个接口，因此可以有组合写法
```java
//extends 相当于 extends 和 implement 的组合功能
class Test<T extends FooClass & interface1 & interface2>{
    //...
}

//也可以只实现接口，依然使用 extends
class Test<T extends Comparable & Serializable>{
    //...
}
```

## 泛型方法
泛型类或者接口的定义以及举例，总结来说就是使用通配符类型(wildcard type)替代原始固定类型，
并在运行时指定具体类型。

除此之外，还可以在普通类中定义泛型方法
```java
class Test{
    public static <T> T getMiddle(T... a){
        return a[a.length /2]
    }
}

//调用时
String test = Test.<string>getMiddle("hello", "test", "world");
```
与普通方法或者泛型类中的方法均不同，类似于二者的组合体。
- `<T>`放在修饰符后，放在返回类型前
- 调用时要在方法名前加上类型声明（Java 7后可以省略，因为有足够的信息可以推断出该类型）


