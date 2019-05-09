类（class）是 Java中的一等公民，OOP 中在描述类与类，类与对象之间的关系时，通常需要加一些限制：
- 当前类对哪些类可见
- 类的构造器，方法，变量的访问限制

这就是访问修饰符(access modifier)的作用，修饰类，类中的嵌套类，类构造器，类中的方法及变量，并起到访问限制的作用。

Java 中一共有四类修饰符 `public`, `private`, `protected` 以及默认修饰

!> 访问修饰符一般声明在最外层，不添加任何修饰符时，默认限制在当前包(package)内

修饰符的最用类似“做标记”， 可以标记的对象如下：  
target\modifier | public | default | protected | private
----------------|--------|---------|-----------|--------
class   | YES | YES | NO | NO
Nested class | YES | YES | YES | YES
constructor | YES | YES | YES | YES
method | YES | YES | YES | YES
field | YES | YES | YES | YES

## private
如果一个变量或者方法被 `private`修饰，那么只能在当前类中访问它，当前类的子类或外部类均无法访问。

不能使用 private修饰一个类，因为这意味着没有其它的类可以访问它，也就是说无法使用这个类，这是没有任何意义的。

一般private 修饰的方法和变量，是不希望被外部直接调用，只提供包装后的接口。  
例如，定义一个private 变量，然后





