说到排序算法，一股青春的气息就扑面而来……

排序算法大概有七八九十种吧，总结三种我觉得正常人应该理解的

## 冒泡排序

思想是，每次比较相邻位置的大小，如果不相等就调换位置，一次循环就可以确定一个数字的位置  

优点是稳定，因为扎实，每次确定一个数，最坏的情况是，第一个数判断n-1次，第二个n-2次……，加起来为n(n-1)/2总的时间复杂度为O(n^2), 但空间复杂度低，因为返回的是原数组    
缺点当然就是复杂度有点高，相当于暴力循环了

> js实现

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
## 插入排序

这个原理就像小朋友按身高排队一样，刚开始是乱的。挑一个出来做基准，比他高的站后面，矮的站前面，中间的就“插队”排进去  
插队的方法可以选从前或者从后开始，一个个比较直到合适的位置，但这样说到底还是冒泡排序了，因此选择二分法来插入

> js 实现

```js
const binary_sort = function(arr){
    let len = arr.length
    if(len === 0)
        return arr
    let ret = [arr[0]]
    for(let i=1; i<len-1; i++){
        let left = ret[0]
        let right = ret[ret.length -1]
        let mid = Math.floor((left+right)/2)
        let curr = arr[i]
        if(curr <= left)
            ret.unshift(curr)
        else if(curr >= right)
            ret.push(curr)
        else{
            while(mid > left){
                if(curr > arr[mid])
                    left = mid
                else if(curr < arr[mid])
                    right = mid
                else
                    break
                mid = Math.floor((left+right)/2)
            }
            insertOne(ret, mid+1, arr[mid])
        }
    }
    function insertOne(arr, index, value){
        for(let i=arr.length; i>index; i--){
            arr[i] = arr[i-1]
        }
        arr[index] = value
    }
    return ret
}
```

## 快速排序
快排的思想非常值得学习，贴一个阮老师图文并茂的总结[quick-sort](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)

这种分而治之递归处理的思想十分巧妙

> js 实现

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

> python 实现

```python
def quick_sort(arr):
    if len(arr) > 0:
        return quick_sort([x for x in arr[1:] if x <= arr[0]]) + 
            [arr[0]] + quick_sort([x for x in arr[1:] if x > arr[0]])
    else:
        return arr
```

再优化下可以写成一行，python的实现更能体现快排的思想  
选出一个基准值，剩下的安装这个基准排序，当基准值不存在时即说明排序完毕，按顺序合并即可