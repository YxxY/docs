## 思想

向一个有序队列插入新元素，插入位置以后的元素均需要后移一位

## 实现1

```js
const insert_sort = function(arr){
    let len = arr.length
    if(len === 0)
        return arr

    let ret = [arr[0]] //维护一个新的有序队列

    for(let i=1; i<len-1; i++){
        let left = ret[0]
        let right = ret[ret.length -1]
        let mid = Math.floor((left+right)/2)
        let curr = arr[i]
        if(curr <= left) //插入头部
            ret.unshift(curr)
        else if(curr >= right) //插入尾部
            ret.push(curr)
        else{ // 插入中间位置，二分法确定位置，然后插入
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

## 实现2

```js
const insert_sort =  function(arr){
    for(let i = 1; i< arr.length; i++){
        let curr = arr[i]
        let j = i -1
        while(j>=0 && arr[j]>curr){
            arr[j+1] = arr[j]
            j--;
        }
        arr[j+1] = curr
    }
    return arr
}
```

## 总结

这里写了两种实现：
- 实现1：
    - 维护一个新的有序队列，依次插入原数据
    - 用空间换取了时间，时间复杂度最差是 O(nlogn)
- 实现2：  
    - 以第一个元素为有序队列的首元素，后续 `n -1` 个元素需完成 `n - 1` 次插入
    - 故外层控制 `n - 1`次循环，内层依次向前遍历当前元素的插入位置，如果当前位置不是插入位置，后移一位；如果是则记录该位置值退出遍历，再完成合适位置的插入
    - 空间复杂度低，但时间复杂度最差是 O(n^2)