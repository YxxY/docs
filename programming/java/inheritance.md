定义一个类后，如果它的一些实例和方法可以被重用，但又希望做一些自定义的改变。
这个时候可以用到类的继承(inheritance)

## 定义子类
使用 `extends`关键字定义子类
```java
class SubClass extends SuperClass{
    //...
}
```
- 不是所有的类都可以定义子类，如果一个类被 `final`修饰，则无法继承它。  
- 只能从一个父类继承，Java 不支持多继承
- 继承的类会默认拥有父类中可访问的域和方法

### 覆盖方法
子类可以使用父类中可访问的方法，但如果子类中定义了相同的方法则会覆盖父类方法。  
此时如果还想调用父类中的同名方法，则需要使用 `super`关键字。表示调用的是父类方法。
```java
class Base{
    void test{
        System.out.println("method from base class");
    }
}

class Subclass extends Base{
    void test{
        super.test();
        System.out.println("method from base sub class");
    }
}
```
- 同理无法覆盖所有的方法，`final` 修饰的方法无法覆盖
- 被 `final`修改的类，内部方法自动成为final, **但不包括域**

### super vs this
`this`是实例化对象的引用，而`super` **并非**引用父类实例化对象，它只是指示编译器调用父类方法的特殊关键字。

### 子类构造器
子类构造器调用前需要调用父类的构造器，以初始化父类的私有域。  
如果子类构造器中没有显式地调用父类构造器，会自动调用父类默认(无参数)构造器。

也可以显式地在子类构造器中调用父类构造器， 这是也是 `super`关键字的第二个作用
```java
class Base{
    private String name;
    private int age;

    public Base(String name, int age){
        this.name = name;
        this.age = age;
    }
}

class Subclass extends Base{
    private String gender;

    public Base(String name, int age, String gender){
        super(name, age);
        this.gender = gender;
    }
}
```

## 多态
正因为继承的实现，对象变量表现出了多态性。  
举例来说就是，假设存在一个 Employee的父类，Manager类是继承而来的子类，
那么 Manager的实例化对象 boss 既是 Manager对象，也是Employee对象。
```java
Employee[] staff = new Employee[3];
Manager boss = new Manager();

staff[0] = boss; //ok

Manager a = staff[1]; //error
Manager a = (Manger) staff[1]; //ok if can be casted
```

## 抽象类
有时会需要一个类仅用作继承的父类来用，即抽象出一个公共的父类。
这样的类就叫做抽象类(abstract class)

```java
public abstract class Base{
    public abstract String sayHello();
    //...
}
```
- 在抽象类中定义抽象方法，充当占位的作用。  
- 子类如果不是抽象类，就**必须**实现这些方法。
- 抽象类中也可以定义具体的方法和域
```java
public abstract class Base{
    private name;
    public Base(String name){
        this.name = name;
    }
    public abstract String sayHello();

    public String getName(){
        return this.name;
    }
}
```
- 抽象类不能被实例化

## Object
`Object`类是 Java中所有类的父类。所有的类都是由它扩展而来。  
虽然创建类时不需要显式地写` class Test extends Object`，
但如果没有指明父类，那么它的直接父类就是 Object。

因此可以使用 Object类型变量引用任意类型的对象
```java
Object obj = new Employee();
```

但是Object类型的变量只能做各种类型对象的通用持有者，
具体使用时还是需要转换为具体的类型
```java
Employee staff = (Employee) obj;
```

### Object 方法
正因为所有的类都继承自 Object类，因此定义在 Object 内部的方法具备通用性。
### equals
Object 上的`equals` 方法用于检测两个对象是否相等，实现上是比较两个对象的引用是否相同。  
这没有问题，但很多情况下，相等也可以是对象的状态相等，因此，可以在子类中重写该方法。
如`java.util.Arrays` 的 equals 方法，只有数组长度和数组元素都相等即判定为相等

### hashCode
散列码是由对象导出的一个无规律整型值。  
如果x和y是两个不同的对象不同，那么 `x.hashCode()` 和 `y.hashCode()`基本不会相同。

在 Object类中，hashCode方法返回的值是对象的存储地址。  
如果重新定义 `equals`方法，就必须定义 hashCode方法。

### toString
返回对象值的字符串，经常用来打印格式化输出。  
当对象和字符串通过 `+`连接起来时，会默认调用对象的 toString方法。

建议每个类都重写该方法，从而得到一个清晰明了的输出。  
例如，调用`Arrays.toString(arr)`可以打印一个数组对象，对于多重数组，则需
调用`Arrays.deeepToString`方法。

### getClass
返回对象的类对象，通常在运行时使用


## 反射
能够分析类能力的程序成为反射(reflection), 通常在运行时操作类和对象。

### Class 类
在程序运行期间，Java 运行时系统始终未所有对象维护着一个运行时的类型标识，对应着每个对象所属的类信息。  
可以通过专门的类访问这些信息。保持这些信息的类被称为`java.lang.Class`, 也是 Object类`getClass`方法的返回类型。
```java
Employee e;
Class c = e.getClass();
```
Class 类的常用方法：
- `getName()`: 返回类名
- `forName(String name)`: 静态方法，获取类名对应的 Class 对象
- `getSuperClass()`: 返回父类的 Class 对象
- `newInstance()`: 调用类的默认构造器返回实例对象
- `getFields()`: 返回 public 域数组
- `getMethods()`: 返回 public 方法数组
- `getConstructors()`: 返回 public 构造器 Constructor对象的数组

这些方法功能十分强大，可以动态的加载类及调用方法
```java
String className = "java.util.Random";
Class cls = Class.forName(className);
```

另外还有第三种获取类对象的方法：  
如果 T是任意的 Java类型，`T.class`返回该类型的类对象
```java
Class cls1 = java.util.Random.class;
Class cls2 = int.class;
Class cls3 = Double[].class;
```
!> 一个 Class对象代表一种类型，这个类型未必是一种类(int 不是类，但int.class 是一个 Class类型对象)


