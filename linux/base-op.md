## 设置全局代理
在`~/.bashrc`里设置
```sh
export http_proxy=http://user:password@proxyserver.com:port
export https_proxy=https://user:password@proxyserver.com:port
```
这里相当于设置了两个**环境变量**， 其他程序会先尝试获取该值，如果存在就使用  
设置其他环境变量类似操作，`export key=value`  

使立即生效 `source ~/.bashrc`

## 
