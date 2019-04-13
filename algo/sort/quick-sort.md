## 思想
快排的思想是**分而治之**并**递归**， 十分巧妙。贴一个阮老师图文并茂的总结[quick-sort](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)


## 实现

### js实现
```js
const quick_sort = function(arr){
    if(arr.length <= 1)
        return arr

    let baseIndex = arr.length - 1
    let base = arr.pop()
    let left = []
    let right = []
    for(let i=0; i<arr.length; i++){
        if(arr[i]>base)
            right.push(arr[i])
        else
            left.push(arr[i])
    }
    return quick_sort(left).concat(base, quick_sort(right))
}
```

### python 实现

```python
def quick_sort(arr):
    if len(arr) > 0:
        return quick_sort([x for x in arr[1:] if x <= arr[0]]) + 
            [arr[0]] + quick_sort([x for x in arr[1:] if x > arr[0]])
    else:
        return arr
```

再优化下可以写成一行，python的实现更能体现快排的思想  

## 总结

- 选出一个基准值，剩下的按照这个基准，比它小的放左边，左右继续分治，如此递归下去  
-  递归出口即队列只剩一个元素，不需要继续分了
- 最好的情况是一共递归 log(n) + 1 次， 每一层时间复杂度是 O(n), 最大时间复杂度为 O(nlogn)
- 最差的情况是初始序列为待排序列的逆序，且每次划分只比上次序列少一个元素，那么最大时间复杂度即为 O(n^2)