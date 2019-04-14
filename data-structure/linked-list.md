链表(linked-list) 是一种动态数据结构
特点是
- 由多个节点组成，仅记录头部节点的位置
- 每个节点包括存储的数据以及指向下一个节点的指针
- 理论上可以无限扩展

跟数组很像，但相比数组能更高效利用存储空间，增加节点和删除节点更方便  
但是获取节点元素没有数组直接根据索引来的便捷

链表结构实现
```python
class Node(object):
    def __init__(self, data):
        self.value = data
        self.next = None

class LinkedList(object):
    def __init__(self):
        self.head = None
        self._length = 0
    
    # implement menthod
```

## 添加节点
```python
def append(self, node):
    if not isinstance(node, Node):
        node = Node(node)
    if self.head is None:
        self.head = node
    else:
        head = self.head
        while head.next:
            head = head.next
        head.next = node
```
## 获取链表长度
```python
def __len__(self):
    curr = self.head
    while curr:
        self._length +=1
        curr = curr.next
    return self._length
```

## 格式化输出
```python
def __str__(self):
    curr = self.head
    if curr is None:
        return '<empty linked-list>'
    ret = str(curr.value)
    while curr.next:
        ret = ret + '->' + str(curr.next.value)
        curr = curr.next
    return ret

def __repr__(self):
    return self.__str__()
```
## 插入节点
```python
def insert(self, index, node):
    if abs(index+1) > len(self):
        return False
    index = index if index>=0 else self._length+index
    node = Node(node) if not isinstance(node, Node)
    if index == 0:
        node.next = self.head
        self.head = node
    else:
        curr = self.head
        while index-1:
            curr = curr.next
            index -= 1
        next_node = curr.next
        curr.next = node
        node.next = next_node
    return True
```    
## 删除节点
假设要删除的节点为curr_node, 它的前一个节点为pre_node  
那么满足 `pre_node.next = curr_node.next` 即可，当然要考虑head节点的特殊情况
```python
def delete(self, index):
    if abs(index+1) > len(self)
        return False
    index = index if index>=0 else self._length+index
    if index == 0:
        self.head = self.head.next
    else:
        curr = self.head
        pre = None
        while index:
            pre = curr
            curr = self.head.next
            index -= 1
        pre.next = curr.next
    return True
```
## 反转链表
反转即实现以下逻辑
- curr_node -> next_node 变为 next_node -> curr_node
- 如果是curr_node 是头节点，则 curr_node.next -> None
- 如果是curr_node 是尾节点，则 `head` -> curr_node

因为反转之后位置没有发生变化，因此可以两个一组递归实现反转

```python
def __reversed__(self):
    def reverse(pre_node, node):
        if pre_node is self.head:
            pre_node.next = None
        if node:
            next_node = node.next
            node.next = pre_node
            return reverse(node, next_node)
        else:
            self.head = pre_node
    return reverse(self.head, self.head.next)
```