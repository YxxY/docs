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
- `Object newInstance()`: 调用类的**默认构造器**返回实例对象
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

## reflect 框架
回顾一下，运行时获取对象类型的方式有：
- 通过运行时对象`getClass`方法或者具体类型的`class`属性，可以返回它的类型对象(java.lang.Class)
- 通过类名,使用`Class.forName(String name)`方法动态加载对应的类

得到类对象后，就可以获取它的构造器，属性，方法, 对应的修饰符以及父类信息了, 分别对应 reflect框架里的
`java.lang.reflect.Constructor`,
`java.lang.reflect.Field`,
`java.lang.reflect.Method`,
`java.lang.reflect.Modifier`类。

运用这些类，可以在运行时分析类，动态的创建类和对象，功能十分强大。

### reflect.Array 类
reflect框架中还存在一个数组类 `java.lang.reflect.Array`。可以动态操作数组对象
- `static Object get(Object array, int index)`
- `static int getLength()`
- `static void set(Object array, int index, Object newValue)`
- `static Object newInstance(Class T, int length)`
- `static Object newInstance(Class T, int[] length)` 多维数组