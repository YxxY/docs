## 思想

归并排序(merge-sort)和快排的思想很像，相同点在于都使用了分治的思想  
区别是，归并排序不需要基准值，直接一分为二，最后合并两个有序序列  


## 实现

```js
const merge_sort = function(arr){
    if(arr.length <= 1)
        return arr
    let mid = parseInt(arr.length/2)
    let left = merge_sort(arr.slice(0, mid))
    let right = merge_sort(arr.slice(mid))
    return merge(left, right)
}

function merge(arr1, arr2){
    let ret = []
    let i = 0
    let j = 0
    while(i !== arr1.length && j !== arr2.length){
        if(arr1[i] <= arr2[j]){
            ret.push(arr1[i])
            i++
        }else{
            ret.push(arr2[j])
            j++
        }
    }
    ret = ret.concat(arr1.slice(i))
    ret = ret.concat(arr2.slice(j))
    return ret
}
```

## 总结

- 归并思想在于分治和合并，其实快排也是如此，但归并更加**稳定**
- 快排的不稳定在于取不同的基准值会影响复杂度，同时值相同的元素的位置不能保证固定
- 归并的算法时间复杂度最大和最小都是 O(nlogn)，因为不存在定基准值得影响