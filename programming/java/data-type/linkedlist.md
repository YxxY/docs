在已经总结过的数组以及数组列表类里，它们都有一个重大缺陷，就是从中间删除或者一个元素的代价很大。
因为被删除元素之后的元素都有向前移动。因此对于需要大量删除或插入元素操作的使用场景，链表会更加合适。

## 基本使用
链表(linked list)是一种非常常见的数据结构。一般分单向链表和双向链表。  
特点是每一个元素除了储存当前位置的元素值之外，还存储指向下一个元素的指针(单向链表)，
如果还存储了它上一个元素的指针，那么就是双向链表。  
在 Java中，所有链表都是双向的。

正因为这种结构特点，所以删除元素非常方便，删除特点元素后，只需改变前会元素的指针指向即可，开销很小。

Java 集合提供 `java.util.LinkedList`类实现了该数据结构，并且封装了非常方便的对象操作方法。  
同时该类也是 List接口的一种实现，也是一种有序集合。  
```java
import java.util.*;

public class MyLinkedList{

    public static void main(String[] args){
        List<String> list = new LinkedList<>();
        list.add("tom");
        list.add("jerry");
        list.add("alex");
        list.add("emily");

        list.get(1); //jerry
        if(list instanceof RandomAccess){
            System.out.println("Support high quality random access");
        }else{
            System.out.println("Unsupport high quality random access");
        }

        Iterator iter = list.iterator();
        iter.next();
        iter.next();
        iter.remove();  

        System.out.println(list);
    }
}
```
基本使用如同 List接口的方法实现：
- add方法默认从尾部添加元素，也可以从中间插入元素`add(int index, E element)`。
- 元素访问仅支持迭代器访问和随机访问(仅实现方法，效率不高，不建议使用)，不支持`[i]`下标访问。  
- 元素删除方法内部实现了指针指向的修正，对使用者友好。

## ListIterator
由于 LinkedList是双向链表，那自然可以获取当前元素的前一个元素。  
但 `Iterator`接口没有定义该方法，因此集合类库中提供了另一个子接口 `ListIterator`。
LinkedList类的 `listIterator`方法返回一个实现了 ListIterator接口的迭代器对象。  
该接口相比 Iterator多了几个方法：
- `E previous()`
- `boolean hasPrevious()`
- `void add(E element)`
- `void set(E element)`
- `int nextIndex()`
- `int previousIndex()`

previous 方法和 next方法一样，返回“越过”的对象，不过是向前移动。  
同时增加 add方法，此方法和 `Collection.add`方法不同，返回值不为 `boolean`，而是默认会改变链表。  
同理 set方法也是一样，用新元素取代 next或者previous方法返回的元素。  

因为 ListIterator类的add和set方法会改变集合，因为该类以被实现为泛型类。

```java
import java.util.*;

public class MyLinkedList{

    public static void main(String[] args){
        List<String> list = new LinkedList<>();
        list.add("tom");
        list.add("jerry");
        list.add("alex");
        list.add("emily");

        ListIterator<String> iter = list.listIterator(); //泛型
        iter.next(); //tom
        iter.next(); //jerry
        System.out.println(iter.previous()); //jerry
        iter.add("carl"); //add "carl" after tom

        System.out.println(list);
    }
}
```

## 链表常用方法
- LinkedList(), 构造一个空链表
- LinkedList(Collection<? extends E> elements), 
    构造一个链表，并将集合中的元素放进去
- void addFirst(E element)
- void addLast(E element)
- E getFirst()
- E getLast()
- E removeFirst()
- E removeLast()

