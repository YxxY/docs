Java 类库中的集合，以 Map结尾的类实现了 Map(映射)接口。
其它的类都实现了 Collection(集合)接口。  

和集合接口很相似，集合使用 `add`方法插入元素，映射用于插入键值对的方法是 `V put(K key, V value)`。  
集合读取元素使用`迭代器`，映射需要使用 `V get(K key)`方法。  

## Map 常用方法
`java.util.Map` 类实现了 Map接口，常用方法如下：
- `V get(Object key)`
- `default V getOrDefault(Object key, V defaultValue)`
- `V put(K key, V value)`
- `void putAll(Map<k, v> entries)`, 添加另外一个映射
- `boolean containsKey(Object key)`
- `boolean containsValue(Object value)`
- `default void forEach(BiConsumer<k, v> action)`
