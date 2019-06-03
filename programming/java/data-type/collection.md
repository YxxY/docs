Java的集合类库是非常重要的数据结构，
实现了十分常见的 Queue，List，Set等通用数据结构。  
实现上将接口(interface)和实现(implement)分离。

Java 集合大的来分有两类接口： `Collection`和 `Map`。

## Collection
说Collection 需要先引入一些概念

### Iterable 接口
`Iterable` 接口只包括一个抽象 `iterator`方法，如下：
```java
public interface Iterable<E>{
    Iterator<E> iterator();
}
```
实现了该方法的对象就可以和`for each`循环配套使用，用来迭代元素。  

注意到 iterator方法返回的是一个`Iterator`对象，该对象是实现了同名接口的对象，也被
称为`迭代器`。

### Iterator 接口
`java.util.Iterator<E>`类实现了该接口，
`Iterator`接口包含 3个抽象方法和一个默认方法。
```java
public interface Iterator<E>{
    E next();
    boolean hasNext();
    void remove();
    default void forEachRemaining(Consumer<? super E> action);
}
```
- 提供反复调用 `next`方法，可以逐个访问集合中的元素。  
    但是如果已经遍历到最后一个元素后，继续调用 next会抛出 `NoSuchElementException`异常
- `hasNext`方法是判断是否存在下一个元素，存在返回 true。可以配合 next方法使用。  
- `remove`方法调用之前，必须调用 next方法，否则会抛出 `IllegalStateException`异常。  
    因为迭代器没有提供索引的功能，因此要删除一个元素必须先“越过”它，该方法删除的是上一个 next返回的元素。  

### Collection 接口
这个接口即为 Java集合类的基本接口，**它时对 Iterable接口的扩展**
```java
public interface Collection<E>{
    Iterator<E> iterator();
    boolean add(E element);
    int size();
    boolean isEmpty();
    boolean contains();
    boolean equals(Object other);
    boolean remove(Object other);
    void clear();
    Object[] toArray();
    //...other methods
}
```
除了实现了 Iterable的 iterator方法，还扩展了一些实用方法。  
这里以 add方法举例，该方法用于向集合中添加元素，如果添加后改变了集合就返回 true，
如果集合无变化返回 false。  
很显然返回 false是 `Set`类的是实现，用于存储不重复对象的集合。

所有实现Collection 接口的类，都需要实现这些方法

> `java.util.Collection<E>`类实现了该接口

### Collection 子接口

#### List
List 是**有序集合**(ordered collection), 元素增加到特定位置。  
`java.util.List`等类实现了该接口。    
访问元素方法：
- 顺序访问，使用迭代器
- 随机访问(random access), 根据索引快速访问

实现随机访问 List接口定义了用于随机访问的额外方法：
- `E get(int index)`
- `E set(int index, E element)`

Java SE 1.4 引入一个标记接口 `RandomAccess`，该接口不包含任何方法，但可以测试集合是否支持高效的随机访问。
```java
if( c instanceof RandomAccess){
    //use randowm access algorithm
}else{
    //use sequential access algorithm
}
```
比如链表也是有序集合，但随机访问很慢，最好使用迭代器便利

#### Set
Set 是**无序不重复集合**。其 add方法不允许添加重复元素。  
因此它的 `equals`和 `hashCode`方法需要按照元素相等的规则适当定义。  
`java.util.Set`等类实现了该接口。

#### Queue
队列也是一种集合。它规定从尾部添加元素，从头部删除元素。内部元素需符合“先进先出”的规则。  
`java.util.ArrayDeque`等类实现了该接口

