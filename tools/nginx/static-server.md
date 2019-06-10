Nginx 可以用作一个简单的 HTTP服务器, 通常同理托管静态文件, 例如图片和静态 HTML文件等.  

完成这个功能需要指定如下配置:
- 配置静态文件所在目录
- 配置服务器端口和路由

## root
具体做法就是, 先创建目录, 将文件放到指定位置.  eg:
- 创建 `/data/www`目录, 放入 index.html文件
- 创建 `/data/images`目录, 放入图片资源
- 在配置文件里的 `http`块里继续创建 `server`块.  
    不同的 server一般通过配置的**监听端口**和**服务器名**来区分.  
    一旦 nginx确定由哪个 server来处理请求, 会继续测试 server内部的 `location`指令块指定的 URI的配置规则.  
    eg: 
    ```nginx.conf
    http {
        server {
            location / {
                root /data/www;
                index index.html
            }
            location /images/ {
                root /data;
            }
        }
    }
    ```
    location 后面定义的是**匹配规则**, 可以定义多个规则  
    当匹配到多个规则时会默认使用**前缀最长**的那个  
    内部的 `root`指令指定静态文件目录
    eg, `/data/images/top.gif` 将对应请求 `/images/top.gif`的响应
    使用 `index index.html`可以将 `/`按照 `/index.html`的路由来处理 

`root`和 `index`还可以直接放在 `http`, `server`块级别来共享使用,  内部可再重新定义覆盖外部值, 
但建议将 `index`放在具体的 `location`下, 使得语义清晰

## index
index的值可以指定不止一个
```
location / {
    index index.$geo.html index.htm index.html;
}
```
除了指定 index值, 也可以使用 `autoindex`指令
```
location /images/ {
    autoindex on;
}
```
会将所有 /images/some/path/ 都指向 /images/some/path/index.html

## try_files
该指令用于检查具体的文件或者目录是否存在
eg:
```
server {
    root /www/data;

    location /images/ {
        try_files $uri /images/default.gif;
    }
}
```
如果请求 /images/test.png 访问的文件 /www/data/images/test.png 不存在,
则返回 /www/data/images/default.gif  

更通用的作用是访问时省略文件后缀
```
location / {
    try_files $uri $uri/ $uri.html =404;
}
```
即如果 $uri 对应的文件不存在就依次尝试 $uri/, $uri.html, 都不存在则返回 404

还可以将请求转发到另外的服务器
```
location / {
    try_files $uri $uri/ @backend;
}

location @backend {
    proxy_pass http://backend.example.com;
}
```