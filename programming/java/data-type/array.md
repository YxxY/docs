Java 数组, 标准类里存在 `java.util.Arrays`类， 提供了很多静态方法可以使用

## 普通数组
- 数组声明
    ```java
    int[] a;
    ```
- 数组初始化
    ```java
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
- 数组的赋值和取值
    - 通过下标来赋值和取值
    - 下标越界时会引发异常终止执行
- 数组循环
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
- 数组拷贝
    - 如果是将一个数组变量拷贝给另一个，因为数组是引用类型，那么改变指向就可以
    - 如果是将一个数组的所有值拷贝到新的数组中，即产生新的数组，可以使用`Arrays.copyOf`方法
        ```java
        int[] copiedArr = Arrays.copyOf(arr, arr.length);
        //第二个参数是新数组的长度，如果该长度大于被拷贝的数组长度，多余项会被置默认值，通常用来扩充数组
        //如果该长度小于被拷贝数组长度，那么只会拷贝前面的值
        ```
- 常用方法
    - `Arrays.toString(type[] arr)`， 打印数组，返回一个包含数组元素的字符串
    - `Arrays.sort(type[] arr)`， 数组类型为基本数据类型，实现从小到大排序。该方法使用优化了优化的快排算法。
    - `Arrays.fill(type[] arr, type v)`, 填充数组
    - `Arrays.equals(type[] a, type[] b)`, 如果两个数组长度相等，每个元素值相等，返回true

## 可变数组
