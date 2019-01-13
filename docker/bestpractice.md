构建一个简单的node.js应用作为最佳实践

## 准备源代码
server.js
```js
const express = require('express');

const PORT = 2333;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world\n');
  });

app.listen(PORT);
console.log(`Running on ${PORT}...`);
```
package.json
```json
{
  "name": "node-docker-test",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "MIT",
  "dependencies": {
    "express": "^4.16.4"
  }
```
如果是新版npm，还会有一个package-lock.json，影响不大

确认本机运行`node server.js`无误

## 编写Dockerfile

```Dockerfile
FROM node:10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm config set registry https://registry.npm.taobao.org && \
    npm config set proxy http://127.0.0.1:1085 && \
    npm config set https-proxy http://127.0.0.1:1085

RUN npm install --only=production

COPY . .

EXPOSE 2333

CMD ["node", "server.js"]
```

- 第一个`COPY`仅复制了依赖配置文件，而没有包含源代码文件  
  这样做是充分利用docker分层构建的特点，二次构建时没有变动的层会直接使用缓存，从而加快构建速度
- 这里也给出了一个**配置代理**的正确方式， 无代理可注释掉  
    - 很多其他的教程说使用**环境变量**，但环境变量只会在容器运行时起作用，构建时并不生效
    - 也有说给`docker build`传递代理参数，形如
            
            dockers build --build-arg HTTP_PROXY=$http_proxy \
            --build-arg HTTPS_PROXY=$http_proxy --build-arg NO_PROXY=$no_proxy
        我懒得试， 也许可行吧

### 编写`.dockerignore`
```
node_modules
```
防止将本地安装包拷贝过去覆盖了容器内的安装包

## 构建镜像

在Dockerfile同级目录下。运行构建命令

    docker build -t node-app:v1 .

## 启动容器
启动命令如下

    docker run --name mycontainer -d -p 8080:2333 node-app:v1

## 测试
查看容器状态
> docker ps

查看log打印
> docker container logs `<Container>`

进入容器
> docker exec -it `<Container>` /bin/bash

测试运行宿主机端口状态
> curl localhost:8080

停止容器
> docker container stop `<container>`