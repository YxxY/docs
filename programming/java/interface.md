接口(interface)技术主要是用来**描述类具有什么功能**，并不给出每个功能具体的实现。  

## 接口概念
接口的概念和抽象类有点像：
- 命名方式都是首字母大写的名词
- 以相同的包命名形式被管理起来，eg: `java.lang.Comparable`接口
- **都可以当作类型来声明变量**，eg: `Comparable x;` 但接口类型变量**只能引用实现该接口的类对象**
- 接口可以继承另一个接口
- 接口也支持泛型

不同的是，
- 在 Java中，**接口不是类**，而是对类的一组需求描述。因此它不能使用 `new`关键字来实例化
- 接口支持多继承

## 定义接口
以 java.lang.Comparable 接口为例，源代码如下：
```java
package java.lang;

public interface Comparable<T> {
    int compareTo(T var1);
}
```
使用 `interface`就可以定义一个接口。
Comparable 接口只包含一个 `CompareTo`方法。  
它描述的需求是，任何实现 Comparable接口的类，都要**实现** CompareTo方法，
且满足和接口描述的需求一致，即参数为一个泛型对象，返回值为整型。

以上接口还有一些附加要求，类似于约定:
> 二者比较时，相等返回0，小于返回负值，大于返回正数

实现了该接口的自定义对象数组，就可以使用`Arrays.sort()`方法进行排序

## 实现接口
实现接口使用 `implements`关键字

```java
class Employee implements Comparable<Employee>{
    private salary;
    public int compareTo(Employee other){
        return Double.compare(salary, other.salary);
    }
}
```
这里以员工的收入举例作为比较值（相等返回0，前面小于后面返回负数，否则返回正数）。  

> 类不支持多继承，但是可以实现多个接口，当需要实现多个接口时，使用逗号分隔。  
eg: `class Test implements Comparable, Cloneable`

也可以和继承一起的联合写，eg：`class Test extends Person implements xxx`

## 接口特性
- 接口不是类
    - 这点已反复强调因此不能使用 `new` 修饰接口
    - 同理，接口**不能包括实例域**
- 接口也可以继承, 且**支持多继承**
    ```java
        public interface extends Comparable{
            //...
        }
        //多继承
        public interface RunnableFuture<V> extends Runnable, Future<V> {
            void run();
        }
    ```
- 接口中的**方法默认均为 public**，因此不需要添加访问修饰符，也可以加
- 接口中可以有常量，但常量默认修饰符是 `public static final`
    ```java
        public interface Test{
            double TEST_NUM = 95;
        }
    ```
    - 实现该接口的类也会继承这些静态变量，但容易引起歧义，不是推荐的做法
- 也可以使用 `instanceof`检查一个对象是否实现了某个接口
- Java SE 8 之后，接口中可以定义静态方法。但建议再具体的类中实现会好一些。  

### 接口默认方法
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
- 接口和实现分离，要想实现某个功能，必须先实现一个接口
- Java 的接口类似实现了多继承的效果，且接口本身支持多继承
- 接口类型的变量可以引用实现它的类的对象，这是个非常通用且推荐的写法


