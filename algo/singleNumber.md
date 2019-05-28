题源：[leetcode-136](https://leetcode.com/problems/single-number/)

> 给定一个非空整数数组，其中有且仅有一个元素是唯一的，其它数均出现两次，找到那个唯一数

要求时间复杂度为 O(n)，空间复杂度为 O(1)

example：  
- input: [2,2,1]
- output: 1

---

> 分析

- 时间复杂度为 O(n), 即只能使用一次循环
- 空间复杂度为 O(1), 即不使用额外的空间

常规做法有：
- 先排序，与左右不相等的即为特殊元素，但空间复杂度不满足需求
- 引入一个map或者数组计数，但不满足空间复杂度

---

限制了大部分出路，只能采取**位操作异或**的方法了。  

!> 核心点是相等的两个数转为二进制，异或操作后结果为0，累加的结果即为最后要找的元素了

实现如下
```js
const singleNumber = function(nums) {
    let res = 0;
    for(let i = 0; i < nums.length; i++) {
        res ^= nums[i];
    }
    return res;
};
```

再给一个常规实现，引入 map计数的实现
```js
const arr = [2,2,1]

const singleNumber = function(nums){
    let map = new Map()
    for(let item of nums){
        if(map.has(item))
            map.delete(item)
        else
            map.set(item, 1)
    }
    return map.keys().next().value
}
```



