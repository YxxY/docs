在Node.js 内部模块`Events`源码 [spliceOne](https://github.com/nodejs/node/blob/master/lib/internal/util.js) 看到他们实现了一个函数，从数组中移出指定位置(**非第一个**)的元素  
声称速度要比原生方法`Array.prototype.splice`快 1.5-10x 倍，吓得我赶紧copy下来学习下

这个我很久之前就看到了，不知道他们什么时候还重构了一次，因此我现在有两个版本了

> version 1

```js
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}
```

> version 2

```js
function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}
```

> 总结

原理倒是不复杂，第一个写的逻辑直白，第二个写的思维清晰，重构大法好！
