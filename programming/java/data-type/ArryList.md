使用数组操作数据时需要手动维护下标，且数据长度不可更改，显然不够方便。  
Java 还实现了 ArrayList(数组列表)数据类型，通过`java.util.ArrayList`类， 
创建数组列表对象，存储长度可以动态增长，且为插入和访问元素提供了更便捷的方法。  

总的来说，数组列表封装了一个动态再分配的对象数组，同时也实现了 List接口， 是一种有序集合。

## 声明和初始化数组列表
```java
import java.util.ArrayList;

ArrayList arraylist = new ArrayList();
```

上述声明是Java SE 5.0之前的写法，这样的声明没有问题，但是没办法知道要存储的列表元素类型，
这有点不符合强类型语言的特点。
于是 5.0 版本后引入`泛型类`(generic class), 来弥补这一不足，声明和初始化方式如下：
```java
ArrayList<Integer> arraylist = new ArrayList<Integer>();

//Java SE 7 之后, 赋值时可以省略右边的参数类型
ArrayList<Integer> arraylist = new ArrayList<>();

//指定初始容量(capacity)
ArrayList<Integer> arraylist = new ArrayList<>(100);

//也可以初始化后再指定初始定容量大小
arraylist.ensureCapacity(100);
```
- 所谓泛型，即不固定为一种类型，可以为任意**引用类型**，并声明在一对尖括号中。
- 注意参数是泛型类，因此**参数必须是引用类型，而不是基本数据类型**。
- 5.0 之后的版本不带尖括号也可以使用，会被认为存储的是基本类型数据，且会产生warning。
- 指定容量实例化时并不是限定长度，而是表示存储潜力，也可以不指定。

除此之外，还有一种更加推荐的写法
```java
import java.util.List;
import java.util.ArrayList;

List<String> list=new ArrayList<String>();
```
因为 ArrayList类实现的 List接口，使用接口类型代替具体实现类型会更灵活一点。  
因为可以随时使用另外一种实现替换，而不用大范围修改代码，这是一种实际应用中的技巧。
后续示例代码会广泛使用。

## 添加新元素
使用集合接口里的 `add`方法
```java
//末尾追加
arraylist.add(10);

//指定位置插入
arraylist.add(index, element)

```
数组列表管理的对象，最终引用的是一个内部数组。
当调用 add方法，且内部数组容量不足时（因此设置初始容量是很有必要的），数组列表会自动创建一个更大的数组，
并将之前的所有对象拷贝到新数组中。

## 数组列表元素数量
使用 `arraylist.size()`方法返回当前数组列表的元素数量（这个值小于或等于当前列表的实际容量）。  
当确认不再添加元素时，应该调用`arraylist.trimToSize()`方法，释放多余的内存空间。

## 访问数组列表元素
无法通过下标的方式 `[i]`访问，但支持迭代器访问和高效随机访问
- `get`方法获取元素
- `set`方法修改**已存在**的元素
- `remove`方法删除元素，返回被删除的元素

```java
ArrayList<Employee> staff = new ArrayList<>(100);

//... add element here

Employee e = staff.get(i);
Employee e = staff.set(i, x);
Employee e = staff.remove(i);

```

## 遍历数组列表
使用 for each或者for循环
```java
for(Employee e: staff){
    //do something with e
}

for(int i=0; i< staff.size(); i++){
    Employee e = staff.get(i);
    //do something with e
}
```
或者使用迭代器
```java
import java.util.ArrayList;
import java.util.List;
import java.util.Iterator;

public class MyArrayList{
	public static void main(String[] args) {
		List<Integer> list = new ArrayList<>(10);
		list.add(1);
		list.add(2);
		list.add(3);
		list.add(4);
		list.add(5);

		Iterator iter = list.iterator();
		while(iter.hasNext()){
			System.out.println(iter.next());
		}
	}
}
```

## 转换成数组
将已有的一个数组列表转换成数组对象, 使用 `arraylist.toArray(array)` 方法
```java
X[] array = new X[arraylist.size()];
arraylist.toArray(array);
```

## 线程安全
当需要动态数组时，还有一个选择，那就是 `Vector`类，但为什么使用 ArrayList替换 Vector呢？  
原因和 StringBuilder vs StringBuffer 是一致的。  
Vector 类中所有方法都是同步的，可以保证多个线程安全的访问一个 Vector对象，但如果只有一个线程就效率就会显得非常低效，因此建议在不需要使用同步时使用 ArrayList。


