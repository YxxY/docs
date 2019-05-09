
## what is Java
Java 是一门编程语言。经从这个方面说，Java没啥特殊，提供编程接口，实现业务逻辑。

举例说明，写一个万能的 “hello world”
- 创建一个文件，名为`Test.java`
- 输入以下内容  
    ```java
    public class Test {
        public static void main(String[] args){
            System.out.println("hello world");
        }
    }
    ```
- 在该文件的根目录下依次执行命令
    - `javac Test.java`
    - `java Test`
- 可以看到熟悉的输出

对比其它编程语言，特别是动态语言，可以总结 Java 的不同
- 静态语言，需先编译，再执行。会生成中间`.class`文件
- 类(`class`) 是一等公民，相对的，而在动态语言中，函数(`function`)是一等公民
    - 一个文件里可以有多个类，但只能存在一个 `public`的类
    - public 类名**必须** 和 文件名保持一致
    - 执行时，参数是入口**类名**（对应例子中 java Test 的执行)
- javac：java 编译器，将源码文件(.java)编译为字节码文件(.class)
- java：启动 JVM 执行字节码


## 基础语法

- 大小写敏感
- 类名应该首字母大写，多个单词时，一般采用驼峰式(camel-style)命名
- 源文件名需要和类名保持一一致，否则会出现编译错误
- 类主方法入口为 `public static void main(String args[])`
