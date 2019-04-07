题源：[candy](https://leetcode.com/problems/candy/)

> 给一排小朋友分糖，每个人分配一个数字，要求每个小朋友至少分到一块糖，**相邻**小朋友数字大的至少多分一块糖

求至少需要多少块糖才能满足上面的两个条件

example:  

    Input: [1,0,2]
    Output: 5
    对应的糖数量为 2,1,2

    Input: [1,2,2]
    Output: 4
    对应的糖数量为 1,2,1
---



> 难点分析  

- 每个位置分配的数量是不定的，需要两边的值做参考
- 边界值是特殊情况
- 中间位置情况较多

---

js 实现
```js
/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {
    let len = ratings.length
    let ret = new Array(len)
    if(len === 1)
        return 1
    else if(len >=2)
        return ratings.reduce((acc, curr, index)=>{
            return acc + getRetIndexValue(index)
        },0)
    
    function getRetIndexValue(index){
        if(ret[index] !== undefined)
            return ret[index]
        if(index===0){
            if(ratings[0] <= ratings[1]){
                ret[0] = 1
                return 1
            }else{
                ret[index]= getRetIndexValue(index+1) + 1
                return ret[index]
            }
        }else if(index === len -1){
            if(ratings[len-1]<= ratings[len-2]){
                ret[len-1] = 1
                return 1
            }else{
                ret[index]= getRetIndexValue(index-1) + 1
                return ret[index]
            }
        }else{
            let curr = ratings[index]
            let pre = ratings[index-1]
            let next = ratings[index+1]
            if(curr > pre || curr > next){
                if(curr>pre && curr > next){
                    if(getRetIndexValue(index-1) > getRetIndexValue(index+1)){
                        ret[index] = getRetIndexValue(index-1) + 1
                        return ret[index]
                    }
                    else{
                        ret[index] = getRetIndexValue(index+1) + 1
                        return ret[index]
                    }
                }else if(curr > pre){
                    ret[index] = getRetIndexValue(index-1) + 1
                    return ret[index]
                }else{
                    ret[index] = getRetIndexValue(index+1) + 1
                    return ret[index]
                }
            }else{
                ret[index] = 1
                return 1
            }
        }
    }
        
};
```

> 总结

- 首先需要分析出每个位置取值(分糖)特征，都是不定的，需根据左右位置的值确定
- 边界值和中间值是两种不同的情况，且都有规律可循
    - 边界值由旁边的位置值直接决定, 且只有两种情况（1 或者旁边值+1），
    - 同理中间值也可以分析出所有的情况，特殊情况是当前位置值不大于左右两边位置的值时可以直接取 1
- 根据以上两点可以联想到递归调用，递归出口即为特殊边界值或者中间位置的特殊值