## 查询重复文档
查询重复记录, 以mongo shell语法为例
```shell
db.jobs.aggregate([
    {
        $group: { _id: {id: '$unique_id'},
        count: {$sum: 1},
        dups: {$addToSet: '$_id'}}
    },
    {
        $match: {count: {$gt: 1}}
    }
])
```
原理为使用聚合函数分组，分组的key值为document记录的唯一索引，即能分辨出文档有重复的字段，这里以`unique_id`为例，视具体情况替换。  
然后把该文档记录的默认索引`_id`存在一个数组中并计数，最后列出统计大于1的记录，即为重复的记录，如果输出为空，则表明没有重复。  

## 去重  
```shell
db.jobs.aggregate([
    {
        $group: { _id: {id: '$unique_id'},
        count: {$sum: 1},
        dups: {$addToSet: '$_id'}}
    },
    {
        $match: {count: {$gt: 1}}
    }
]).forEach(function(doc){
    doc.dups.shift();
    db.jobs.remove({_id: {$in: doc.dups}});
})
```
去重的处理就是根据之前存储的重复文档默认索引，然后保留一个，删除其他的重复的即可。  
上面的操作是保留第一个文档，当然也可以保留最后一个，改成`doc.dups.pop()`即可