题源：(lru-cache)[https://leetcode.com/problems/lru-cache/]

> LRU(Least Recentlt Used) cache 是Redis 存储核心算法之一， 接口也很简单，尝试自行实现 `get` 和 `put` 操作

- `get(key)`, 获取缓存里 key的值， 不存在返回 -1
- `put(key, value)`, 更新或者插入key-value值，当缓存达到上限，应该先移除**最近用得最少的**键值对，然后再插入新的值

要求实现的两个方法的时间复杂度均为 O(1)

example:  
```js
LRUCache cache = new LRUCache( 2 /* capacity */ );

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.put(4, 4);    // evicts key 1
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4
```


js 版本实现

```js
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.map = {}
    this.capacity = capacity
    this.keys = []
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    let v = this.map[key]
    if(v === undefined)
        return -1
    else{
        this.keys.splice(this.keys.indexOf(key), 1)
        this.keys.push(key)
    }
        
    return v
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.keys.includes(key))
        this.keys.splice(this.keys.indexOf(key), 1)
    else{
        if(this.keys.length === this.capacity){
            let lru = this.keys.shift()
            delete this.map[lru]
        }
    }
    this.keys.push(key)
    this.map[key] =value
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```

> 总结

感觉不限定复杂度还是不难实现，我的实现其实有点取巧，看起来写法上复杂度是O(1), 然而不是真正意义上的O(1)  
看了下效率最高的答案，关键点是使用了`new Map().keys()` 返回一个迭代器，迭代按顺序插入的key值。 每次将使用到的key 删掉再重新插入，就能自维护一个顺序列表，需要释放的时候永远释放第一个key（map.keys().next().value）即可，是真正意义上的O(1) 算法