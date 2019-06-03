同 interface 一样，注解也属于一种类型。它是在 Java SE 5.0 版本中开始引入的概念。  
一些封装都存在于`java.lang.annotation`类当中。  

注解以 `@`修饰开头的， 常见的注解有 `@Overwrite`, `@Test`等。

## 注解的作用
- 格式检查  
    例如被 @Override标记的方法，如果不是父类的某个方法，IDE会报错。
- 减少配置  
    运行时动态处理，得到注解信息，实现代替配置文件的功能；
- 减少重复工作  
    例如 JUnit里被 @Test标记的方法会被自动当作测试用例执行

## 创建注解
- 使用 `@interface`声明注解
- 使用 `@Target`约束注解可以应用的地方（如方法、类或字段）
- 使用 `@Retention`表示注解的生命期

```java
//声明Test注解
@Target(ElementType.METHOD)  //应用在方法上
@Retention(RetentionPolicy.RUNTIME)  //生命期为运行时
public @interface Test {

} 
```

### 元注解

声明注解时用到的 @Target和 @Retention是 Java的元注解。即可以标记其它注解的注解。

#### @Target
用来约束注解可以应用的位置，其中ElementType是枚举类型。  

```java
public enum ElementType {
    /**标明该注解可以用于类、接口（包括注解类型）或enum声明*/
    TYPE,

    /** 标明该注解可以用于字段(域)声明，包括enum实例 */
    FIELD,

    /** 标明该注解可以用于方法声明 */
    METHOD,

    /** 标明该注解可以用于参数声明 */
    PARAMETER,

    /** 标明注解可以用于构造函数声明 */
    CONSTRUCTOR,

    /** 标明注解可以用于局部变量声明 */
    LOCAL_VARIABLE,

    /** 标明注解可以用于注解声明(应用于另一个注解上)*/
    ANNOTATION_TYPE,

    /** 标明注解可以用于包声明 */
    PACKAGE,

    /**
     * 标明注解可以用于类型参数声明（1.8新加入）
     * @since 1.8
     */
    TYPE_PARAMETER,

    /**
     * 类型使用声明（1.8新加入)
     * @since 1.8
     */
    TYPE_USE
}
```

- 如果未指定Target值时，默认可以标记在所有元素上
- 存在多个值时，使用大括号并用冒号隔开  
    `@Target(value={CONSTRUCTOR, FIELD, LOCAL_VARIABLE})`

#### @Retention
约束注解存在的生命期，有三个值可取：
- SOURCE, 只存在源码中，会被编译器丢弃，不会保存在class文件中。
- CLASS, 此项为默认值。表示会保存在class文件中，但不会被加载到虚拟机中。  
- RUNTIME, 注解信息将在运行期也保留，因此可以通过反射机制读取注解的信息（源码、class文件和执行的时候都有注解的信息）。  
    如SpringMvc中的 @Controller、@Autowired、@RequestMapping等

#### @Documented
将注解添加到 Javadoc中

#### @Inherited
注解本身无法继承。这个注解的意思是，如果 @Inherited标记了一个超类，它的子类没有其它注解的话，
将继承超类的注解

#### @Repeatable
Java 1.8 的新特性，表示注解可以重复添加


## 使用注解
声明注解并使用的示例如下：
```java
import java.lang.annotation.*;
import java.lang.reflect.*;

//定义注解
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@interface MyInteger{
    int value() default 0;
    String name() default "";
}

//使用注解
public class AnnotationTest {

    //使用注解赋值
    @MyInteger(20)
    public int age;

    @MyInteger(value = 170,name = "HEIGHT")
    public int height;

    public static void main(String[] args){
    	Field[] fields = AnnotationTest.class.getDeclaredFields();
    	for(Field field: fields){
    		if(field.isAnnotationPresent(MyInteger.class)){
    			MyInteger num = field.getAnnotation(MyInteger.class);
    			System.out.println(num.value() + ": " + num.name());
                //20: 
                //170: HEIGHT
    		}
    	}
    }
}
```