题源：[3sum](https://leetcode.com/problems/3sum/)

> 给定一个有n 个整数的数组nums ，是否存在子元素a, b, c 满足a + b + c = 0
找出所有的不重复的组合

example:  
input:  
    
    [-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]

output: 
    
    [[-4,-2,6],[-4,0,4],[-4,1,3],[-4,2,2],[-2,-2,4],[-2,0,2]]

---

> 难点分析  

- 暴力循环时间复杂度达到O(n^3), 不可取
- 如何去重 

---

> javascript 方案

```js
const threeSum = function(nums){
    const ret = []
    const len = nums.length
    nums = nums.sort((a, b)=>a-b)  //正向排序
    for(let i=0; i<len-2; i++){
        if(nums[i] > 0)  //最小值都大于0，组合不存在
            return ret
        if(i !== 0 && nums[i] === nums[i-1]) //去重, key step
            continue
        let j = i + 1
        let z = len - 1
        while(j<z){
            let sum = nums[i] + nums[j] + nums[z]
            if(sum === 0){
                ret.push([nums[i], nums[j], nums[z]])
                j++;
                z--;
                while(nums[j] === nums[j-1] && nums[z] === nums[z+1] && j<z){ //去重
                    j++;
                    z--;
                }
            }else if(sum < 0){
                j++;
            }else{
                z--;
            }
        }
    }
    return ret
}
```

> 总结

- 先排序是必要的，否则很难绕过时间复杂度
- 在源头处去重，而不是最后去重