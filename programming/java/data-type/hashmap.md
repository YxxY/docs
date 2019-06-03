HashMap(散列映射)类是 Java 类库中对 Map接口的一种通用实现。  
散列映射是对**键**进行散列，且是无序的。

## 基本操作
- 使用 put方法添加新键值对
- 键必须是唯一的，重复键后面的会覆盖前面的值
- 使用 get方法取出对应的键值对，不存在键对应的值时将返回null。  
    也可以使用时指定默认值，不存在时返回默认值
- 使用 remove方法删除对应的键值对
- 使用 size方法返回映射中元素个数

```java
import java.util.*;
public class MyHashMap{

    public static void main(String[] args){
        Map<String, String> map = new HashMap<>();

        map.put("name", "lx");
        map.put("gender", "male");
        map.put("age", "26");

        System.out.println(map.get("age"));
        System.out.println(map.getOrDefault("hight", "170"));
        System.out.println(map.size());  //3
        
    
    }

}
```

## 更新映射值
常用更新映射值的方法即再次调用 put方法，覆盖前面的值。  
考虑这样一种场景，对出现的 key进行计数。
可以想到的写法有 
- `counts.put(key, counts.getOrDefault(key, 0) + 1);`
- `counts.putIfAbsent(key, 0); counts.put(key, counts.get(key) + 1);`
- `counts.merge(key, 1, Integet::sum);`