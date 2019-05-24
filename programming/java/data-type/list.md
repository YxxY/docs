除了数组， Java 还实现了数组列表数据类型，通过`java.util.ArrayList`类， 
创建实例对象，该对象可以动态增长的存储一类数据。  

使用数组操作数据时需要手动维护下标，且数据长度不可更改，显然不够方便。
`ArrayList` 长度可以动态增长，且为插入和访问元素提供了更便捷的方法，很好地弥补这一不足。

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
- 注意参数是泛型类，因此参数必须是引用类型，而不是基本数据类型。
- 5.0 之后的版本不带尖括号也可以使用，会被认为存储的是基本类型数据，且会产生warning。
- 指定容量实例化时并不是限定长度，而是表示存储潜力，也可以不指定。

## 添加新元素
使用 `add`方法
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
- `get`方法获取元素
- `set`方法修改**已存在**的元素
- `remove`方法删除元素，返回被删除的元素

无法通过下标的方式 `[i]`访问
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

## 转换成数组
将已有的一个数组列表转换成数组对象, 使用 `arraylist.toArray(array)` 方法
```java
X[] array = new X[arraylist.size()];
arraylist.toArray(array);
```