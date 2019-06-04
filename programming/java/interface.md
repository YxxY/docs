接口(interface)技术主要是用来描述类具有什么功能，并不给出每个功能具体的实现。  

## 接口概念
接口的概念和抽象类有点像，但不同的是，
在 Java中，接口不是类，而是对类的一组需求描述。  
举例来说，Arrays 类的 sort方法承诺可以对对象数组进行排序，但前提是，
对象所属的类必须实现`Comparable`接口。

comparable 接口代码如下：
```java
public interface Comparable{
    int compareTo(Object other);
}
```
也就是说，任何实现 Comparable 接口的类，都要实现 `CompareTo`方法。
且满足和接口描述的需求一致，即参数为一个对象，返回值为整型。

- 接口中的方法默认均为 public，因此不需要添加访问修饰符
- 以上接口还有一些附加要求，类似于约定。二者比较时，相等返回0，小于返回负值，大于返回正数
- 接口包含的方法可能不止一个
- 接口中没有实例域，Java SE 8 之前，接口中也没有实现方法。  
    实例域和方法应该由实现接口的类提供

## 实现接口
由上文可知，一个自定义类的实例数组对象要想使用 Arrays类的sort方法进行排序，
就要实现 Comparable 接口，接口的描述也清楚了，就是实现一个 compareTo方法，
具体实现需要使用 `implements`关键字
```java
class Employee implements Comparable{
    private salary;
    public int compareTo(Object other){
        Employee e = (Employee) other;
        return Double.compare(salary, e.salary);
    }
}
```
这里以员工的收入举例作为比较值。  
JAVA SE 5 之后，接口已经改进为泛型。上面的例子还可以进行改进。  
```java
class Employee implements Comparable<Employee>{
    private salary;
    public int compareTo(Employee other){
        return Double.compare(salary, other.salary);
    }
}
```
也可以不使用泛型，使用原始的类型，那就要如上例中使用时进行类型**强制转换**

当需要实现多个接口时，使用逗号分隔：  
eg: `class Test implements Comparable, Cloneable`

## 接口特性
- 接口不是类，这点已反复强调。因此不能使用 `new` 修饰接口
- 接口也可以继承
- **可以声明接口类型变量，但变量只能引用实现了该接口的类对象**

## 接口默认方法
通常情况下，实现接口，就要实现它定义的一个或多个方法。
但如果提供默认实现，就可以直接复用。  
使用 `default`方法修饰的接口方法即为默认方法。
```java
public interface MouseListener{
    default void mouseClicked(MouseEvent event){}
}
``` 
默认方法由诸多好处， 比如：
- 实现接口时只需实现重点关注的方法，其余的沿用即可。  
- 给已存在的接口添加默认方法不会产生副作用，兼容性好。

同时也会带来一些歧义：
- 如果接口中的默认方法和实现类的父类中方法相同，那么会怎么处理呢？  
    答案是 “类优先”。
- 如果两个接口提供了相同的默认方法，实现类调用该方法时是取哪一个呢？  
    答案是，报编译器错误。或者在类实现接口时，重写该方法给出明确语义


## 总结
- Java 的接口类似实现了多继承的效果，但更轻量
- 接口和实现分离，更加符合接口的语义
- 接口类型的变量可以引用实现它的类的对象，这是个非常通用的技巧。


