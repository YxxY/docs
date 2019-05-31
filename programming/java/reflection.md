能够分析类能力的程序成为反射(reflection), 通常在运行时操作类和对象。

## Class 类
在程序运行期间，Java 运行时系统始终未所有对象维护着一个运行时的类型标识，对应着每个对象所属的类信息。  
可以通过专门的类访问这些信息。保持这些信息的类被称为`java.lang.Class`, 也是 Object实例对象`getClass`方法的返回类型。
```java
Employee e;
Class c = e.getClass();
```

Class 类型对象的常用方法：
- `String getName()`: 返回类名
- `Class Class.forName(String name)`: 静态方法，获取类名对应的 Class 对象
- `Class getSuperClass()`: 返回父类的 Class 对象
- `Object newInstance()`: 调用类的默认构造器返回实例对象
- `Field[] getFields()`: 返回 public 域数组
- `Mthod[] getMethods()`: 返回 public 方法数组
- `Constructor[] getConstructors()`: 返回 public 构造器 Constructor对象的数组

这些方法功能十分强大，可以动态的加载类及调用方法
```java
String className = "java.util.Random";
Class cls = Class.forName(className);
```

另外还有第三种获取类对象的方法：  
如果 T是任意的 Java类型，`T.class`属性返回该类型的类对象
```java
Class cls1 = java.util.Random.class;
Class cls2 = int.class;
Class cls3 = Double[].class;
```

!> 一个 Class对象代表一种类型，这个类型未必是一种类(int 不是类，但int.class 是一个 Class类型对象)


