[官方文档](http://nginx.org/en/docs/)

nginx 一般安装在服务器上, 所以使用对应的包管理器安装即可.  
eg:
- CentOS, `sudo yum install nginx -y`
- Ubuntu, `sudo apt install nginx -y`

nginx 是基于配置的, 配置文件默认名为 `nginx.conf`, 可能存在的位置为
- /usr/local/nginx/conf
- /usr/local/etc/nginx
- /etc/nginx

一般是第三个, 即`/etc/nginx/nginx.conf`

**后续的所有功能都是基于修改此配置文件完成**. 因此需要掌握常用的配置参数

## 配置文件结构
配置文件由**指令**(directives)组成.  
指令分为
- 基本指令(simple directives)
    - 由空格或封号组成
- 块指令(block directives)
    - 由块名和大括号组成
    - 块指令通常为基本指令组成, 也可以继续嵌套块指令

整个配置文件可视为在 `main`块的上下文中  
由 `#`起始的部分为注释

示例如下:
```nginx.conf
user www www;
worker_processes 2;

error_log /var/log/nginx-error.log info;

# events context
events {
    use kqueue;
    worker_connections 2048;
}

...
```
核心配置模块详情见 [ngx_core_module](https://nginx.org/en/docs/ngx_core_module.html)

常见指令配置规则
### server
[server](https://nginx.org/en/docs/http/ngx_http_core_module.html#server) 是存在于 http块指令中
的嵌套块指令.  
通常会根据 `listen`和 `server_name`指令区分不同的虚拟服务器.  
- [listen](https://nginx.org/en/docs/http/ngx_http_core_module.html#listen) 设置 server监听的地址和端口号, 或者是一个UNIX下的套接字
- [server_name](https://nginx.org/en/docs/http/ngx_http_core_module.html#server_name) 对应请求头中的**Host**字段值

### location
[location](https://nginx.org/en/docs/http/ngx_http_core_module.html#location) 是位于 `server`指令块中的指令块, 也可以嵌套使用, 是设置对应原始请求 URI 的匹配规则.  

location 可以是**字符串前缀**, 也可以是**正则表达式**.  
如果是字符串前缀
- 优先匹配前缀最长的规则
- 使用 `=`号修饰符用于完全匹配, 匹配即终止查询, 速度快, 当内部无法继续嵌套块
如果是正则表达式:
- 优先级比不加任何修饰的字符串前缀高
- 按声明位置顺序匹配, **匹配成功即停止**
- `~*` 前缀修饰符表示**大小写不敏感**匹配
- `~` 前缀修饰符表示**大小写敏感**匹配
- `^~` 以某个具体字符起始的匹配
- 匹配时使用 `\`转义特殊符号, 例如点号

#### 匹配顺序
- 首先匹配 `=`
- 其次匹配 `^~`
- 再按顺序正则匹配
- 匹配最长的字符串前缀
- 最后使用 `/`规则

#### 后缀反斜杠
当 location定义了一个前缀字符串并带有后缀反斜杠, 
且请求最后被 `prxoy_pass`, `uwsgi_pass` 等处理时, 会有一个特殊处理, 即请求 URI不带末尾的反斜杠时, 会被 **301重定向**到带有反斜杠的请求.  
如果这个默认处理不是预期的结果, 则需要单独定义, eg:
```nginx.conf
location /user/ {
    proxy_pass http://user.example.com;
}

location = /user {
    proxy_pass http://login.example.com;
}
```

### proxy_pass
通常出现在 `location`指令块中, 作用是反向代理, 将符合规则的请求转发到代理服务器上
```nginx.conf
location /some/path/ {
    proxy_pass http://www.example.com/link/;
}
```