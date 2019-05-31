数组在 Java里也是一个对象。  

    In the Java programming language, arrays are objects (§4.3.1), are dynamically created, and may be assigned to variables of type Object (§4.3.2). All methods of class Object may be invoked on an array

重点关注的是， 数组对象是由 JVM动态生成的，创造它的父类是 Object，因此它也包含 Object类实例的所有方法。 

标准类里存在 `java.util.Arrays`类， 提供了很多静态方法可以操作数组对象。

## 数组声明
```java
int[] a;
```

## 数组初始化
 ```java
 //初始化固定长度的数组
 int[] a = new int[100];

 //数组长度不要求是常量，也可以是如下的变量形式
 int[] a = new int[n];

 //还可以指定数组成员初始化
 int[] a = new int[] {1,2,3}

 //也可以简写如下
 int[] a = {1,2,3,4}

 //初始化匿名数组
 new int[] {1,2,3,4}
 ```
 - **数组一旦创建就不能再变它的大小**
 - 数组元素类型必须和声明一致，如果不一致会被**强制转换**，无法转换时会抛出异常

## 数组的赋值和取值
- 通过下标来赋值和取值
- 下标越界时会引发异常终止执行

## 数组循环
```java
//传统for循环
String[] a = new int[10]
for(int i = 0; i< a.length; i++){
    arr[i] = ""
}

//for each 循环
for(String element : a){
    //...
}
```

## 常用 Arrays静态方法
- `Arrays.toString(type[] arr)`  
    定制字符串打印，比数组对象的 toString方法好用，返回一个包含数组元素的字符串
- `Arrays.copyOf(type[] arr, int len)`
    深拷贝数组。第二个参数是新数组的长度。
- `Arrays.sort(type[] arr)`  
    数组类型为基本数据类型，实现从小到大排序。该方法使用优化了优化的快排算法
- `Arrays.fill(type[] arr, type v)`   
    填充数组
- `Arrays.equals(type[] a, type[] b)`  
    比较两个数组，如果两个数组长度相等，每个元素值相等，返回true

