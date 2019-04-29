> 给定一个JSON字符串，返回扁平化的对象，即如果有嵌套的数据结构，只取最底层的数据

example:
- input: `'{"a":"a", "b":[{"c":"c"}, {"d": "d"}], "e":{"f": "f"}}'`
- output: `{ a: 'a', c: 'c', d: 'd', f: 'f' }`

> 分析

- 嵌套数据结构都是`可枚举类型`, 且都是`key-value`类型的
- 很容易想到递归算法，但递归出口如何定



> js实现

```js
const log = console.log.bind(console)

const input = '[{"a":"a", "b":[{"c":"c"}, {"d": "d"}], "e":{"f": "f"}}]'

const flatJson = function (json_str){
    let raw = JSON.parse(json_str)
    let ret = {}
    for(let key in raw){
        let value = raw[key]
        if(typeof value === 'string')
            ret[key] = value
        else
            ret = Object.assign(ret, flatJson(JSON.stringify(value)))
    }
    return ret
}

log(flatJson(input))

```

> 总结

这是一个典型递归算法，常规套路，主要难点在递归出口上  
出口是一次循环可枚举结果的 key-value 集合，然后和递归返回的结果合并  