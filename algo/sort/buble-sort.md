## 思想

每次比较相邻位置两个元素的大小，如果不相等就调换位置，一次循环就可以确定一个元素的位置  


## 实现

```js
var bubble_sort = function(arr){
    let len = arr.length
    for(let i=0; i<len-1; i++){
        for(let j=0; j<len-i-1; j++){
            if(arr[j] > arr[j+1]){
                let tmp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = tmp
            }
        }
    }
    return arr
}
```

## 总结

外层控制 `n-1` 次循环， 内层循环实现一次排序  

时间复杂度最好的情况是 O(n), 最差是 O(n^2)