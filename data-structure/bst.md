二叉树也叫二分搜索树(Binary Search Tree)，简称AST。是 N(N>0) 个节点的数据集合，一种方便查找的数据存储方式

具备的特征是
- 每个节点至多有两个子节点, 也可以没有子节点
- 子节点分左子节点（Left subtree）和右子节点（right subtree）
- 左子节点的值必须**小于**根节点，右子节点的值必须**大于**根节点

```
    root
    /  \
  left  right
```

## 二叉树实现

```python
#!/usr/bin/env python
# coding=utf8

class Node(object):
    def __init__(self, value):
        self.left = None
        self.right = None
        self.value = value
    
class BinaryTree(object):
    def __init__(self):
        self.root = None
        self.nodes = []
    
    def insert(self, node):
        if not instanceof(node, Node):
            node = Node(node)
        
        if self.root is None:
            self.root = node
            self.nodes.append(node)
            return True
        else:
            root = self.nodes[0]
            while(True):
                if node.value < root.value:
                    if root.left == None:
                        root.left = node
                        self.nodes.append(node)
                        return True
                    else:
                        root = root.left
                elif node.value > root.value
                    if root.right == None:
                        root.right = node
                        self.nodes.append(node)
                        return True
                    else:
                        root = root.right
                else:
                    return False

def main():
    btree = BinaryTree()
    for x in [Node(x) for x in range(10)]:
        btree.insert(x)

if __name__ == '__main__':
    main()
```     

## 二叉树搜索
二叉树结构具备很强的规律性，因此当在其中搜索目标节点时，常使用递归实现

```python
def search(root, key):
    if root is None or root.value == key:
        return root
    if key < root.value:
        return search(root.left, key)
    return search(root.right, key)
```

## 二叉树遍历
遍历二叉树可以按深度（纵向），广度（横向）以及分层的方式进行

深广度的方法可以继续分类，由于组成部分分三个：根节点，左子节点，右子节点  
因为根据排列组合可以有6种方式，不重复的有 3种  
- 先根节点，再左子节点，再右子节点
- 先左子节点，再根节点，再右子节点
- 先左子节点，再右子节点，再根节点

非要“死记”的话，那就是记住
- 前序遍历，根节点在遍历的第一个位置
- 中序遍历，根节点在遍历的中间位置位置
- 后序遍历，根节点在遍历的最后位置

实现如下
```python
def root_left_right(root):
    if root == None:
        return
    print(root.value)
    root_left_right(root.left)
    root_left_right(root.right)

def left_root_right(root):
    if root == None:
        return
    left_root_right(root.left)
    print(root.value)
    left_root_right(root.right)

def left_right_root(root):
    if root == None:
        return
    left_right_root(root.left)
    left_right_root(root.right)
    print(root.value)
```

分层的方式如下
```python
import deque from collections

def top_to_buttom(root):
    q = deque()
    if root == None:
        return
    # print(root.value)
    q.append(root)
    while(q):
        root = q.popleft()
        print(root.value)
        if root.left != None:
            q.append(root.left)
        if root.right != None:
            q.append(root.right)
```

### 二叉树高度
二叉树的高度或者说深度，即根节点到最远叶子节点的距离  
计算二叉树高度很显然是二叉树遍历的一个子命题

两种实现方式：
1. 从上往下递归，按照遍历的思想，从所有根节点到叶子节点中取最大距离
2. 从下往上递归，每个节点返回左右子节点长度的最大值

实现1
```python
MAX = 0
CURR = 0
def root_to_leaf(root):
    if root is None:
        return
    CURR += 1
    root_to_leaf(root.left)
    MAX = CURR if CURR > MAX
    root_to_leaf(root.right)
    MAX = CURR if CURR > MAX
    CURR -= 1
```

实现2
```python
def leaf_to_root(root):
    if root is None:
        return 0
    left = leaf_to_root(root.left) + 1
    right = leaf_to_root(root.right) + 1
    return left if left > right else right
```
两种方法复杂度是相同的，都是一次遍历得出结果，但是实现思想有差异

