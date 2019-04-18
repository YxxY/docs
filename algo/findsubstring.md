> 给定一个字符串，返回它的最长不重复子串

example:
- input: 'abcdeedghijk'
- output: 'dghijk`

即输入含有两个不重复子串 'abcd' 和 'dghijk', 故返回后者

> 分析

- 如何取出不重复子串
- 如何判断最长


```js
const findSubString = function(str){
    const arr = str.split('');
    if(arr.length <2)
    	return str
    let start = 0
    let max = 0
    let ret = ''
    for(let i = 1; i < arr.length-1; i++){
    	if(arr[i] === arr[i-1]){
	        let len = i - start - 1
	        if(len > max){
	        	max = end
		        ret = arr.slice(start, i-1).join('')
	        }
	        while(arr[i+1] === arr[i] && i<arr.length-2){
	        	i++	
	        }
	        start = i+1
	    }
    }
    if(start === 0)
        ret = str
    if(start>0 && arr.length-start >max)
	    ret = arr.slice(start).join('')

    return ret
}


console.log(findSubString('abcdeedghijk'))

```

> 总结

这是我一次面试时一道笔试题，然而一顿操作后没有写出来……  
后来回家后才捋清思路完成以上答案……  
肯定还是代码量不够，不过下次还是让人把电脑借给我写吧……有编辑器加持，感觉战斗力能提升50%
