
|操作|命令|说明|  
|:----|:----|:------|  
|list|`docker image ls` |列出镜像|  
|tag|docker tag image username/repo:tag |eg: docker tag friendlyhello yxxy/lib:test1  |
|login| docker login [registry]| 默认登陆docker hub， 也可以指定登陆其他registry|
|push| docker push username/repo:tag| repo不存在会创建，上传的镜像会被压缩，eg: docker push yxxy/my_app:test1|
|delete|docker image rm [option] image1 [image...] | 删除本地镜像|

## 列出镜像
除了基本的ls， 还支持过滤和格式化输出

- `--all` | `-a`, 列出所有镜像
- `repo[:tag]`, 根据仓库名和标签查找
    - eg: `docker image ls ubuntu:18.04`
- `--filter` | `-f` 过滤
    - eg: `docker image ls -f since=mongo:3.2`, 仅列出 v3.2之后的版本
    - eg： `docker image ls -f before=mongo:3.2`
    - eg: `docker image ls -f label=com.example.version=0.1`
- `-q`， 仅显示ID
- `--format "formatter"`, 格式化
    - eg: `docker image ls --format "{{.ID}}: {{.Repository}}"`
    - eg: `docker image ls --format "table {{.ID}}\t{{.Repository}}\t{{.Tag}}"`

## Dangling image
列出本地image时，有些名称显示为`<none>`, 这些镜像称之为`dangling image`  
一般原因是新的镜像和旧镜像同名，旧的便签就会显示为none  

强迫症们可以通过以下命令删除

    docker image prune

## 中间层镜像
并非所有无标签的镜像均为dangling， 为了加速镜像构建，重复利用资源，会产生一些类似缓存的**中间层镜像**  
使用`docker image ls -a`参数可以看到这些镜像  
中间层镜像不应该删除，尝试删除时会报错，提示有子依赖，当删除那些它们的镜像后，这些会被自动删除


## 删除镜像
> docker image rm Image [Image...]

image1 可以是 短ID(3位及以上)、长ID、仓库名 或者 镜像摘要

组合命令
eg：删除所有仓库名为redis的镜像
    
    docker image rm $(docker image ls -q redis)


## 定制镜像
### Dockerfile
通常使用`Dockerfile`来定制镜像，dockerfile里包含了构建镜像的一条条指令(Instruction), 会按照指令的顺序分成构建  

可参考[Dockerfile 编写官方最佳实践](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

示例如下：
```dockerfile
FROM ubuntu:15.04
COPY . /app
RUN make /app
CMD python /app/app.py
```
之前说过镜像是分层存储的  
这里每一条指令构建一个只读层，按顺序堆叠，后一层是前一层的增量

- `FROM` 定义基础镜像，空镜像的抽象关键字为`scratch`
- `COPY` 把当前目录的文件拷贝到容器内的目录
- `RUN` 构建应用
- `CMD` 在容器内执行命令

dockerfile的语法和shell很相似  
- `#` 注释
- `\` 换行
- `&&` 串联命令

### .dockerignore
类似`.gitignore`的作用，可以避免把本地文件拷贝到 Docker 镜像中

## 构建镜像
有了Dockerfile，在当前目录执行`docker build`就可以构建镜像了

    docker build -t my_image:v1 .
- `-t` 参数是打个标签，给该镜像命名， 当然也可以指定其他参数
- `.` 表示当前目录， 是构建的上下文路径

### Build Context
构建上下文(Build Context) 是一个很重要的概念  
但是如果Dockerfile， 源文件，以及构建上下文都在同一目录，那么背后的原理也无关紧要  

当它们在不同目录时，可以使用`-f`参数指定  
> docker build -f `docker_file_path` `context_path`

上下文路径会影响指令的参数， 以`COPY`举例：  
> COPY `<src>`... `dest`

- src 可以是具体的文件或文件夹，它们的**路径都是相对于构建上下文**的
- dest 是一个绝对路径或者是`WORKDIR`的相对路径，是对应容器内的路径
    - 末尾如果不带`\`， 会被认为是一个文件
    - 如果dest 不存在，所有的缺省目录会在拷贝时创建

### Docker Build
docker 运行时分为 docker engine (daemon)和 docker client  
docker engine 提供了一套REST API，也被称为 `Docker Remote API`, client 就是通过这套API 和 engine 交互的， 本质上是C/S架构的  

`docker build`命令构建镜像时，并非在本地构建， 而是调用API

会将上下文路径下的所有内容打包，上传给Docker engine构建生成镜像  
实际构建时，也会看到一条如下打印，佐证该行为  
> Sending build context to Docker daemon  xxx


再回头看下`COPY`命令  
    
    COPY . /app

这里的`.` 并非指docker build 执行时的当前目录，而是指上下文目录  
所以不能写成`COPY ../ /app`， 这就超出了上下文的范围，无法操作  

在例子里，这俩刚好是同一目录，实际使用时也推荐这种方式，可以减少路径错误的产生


## 推送/拉取
通过镜像仓库的中转，完成镜像的 push/pull 操作
- 推送
    - 先打便签，给本地镜像加上命名空间，官方仓库的就为DockerHub 账号，私有仓库的命令规则也类似
        以默认仓库为例，执行打标签命令
        `docker tag <IMAGE_NAME> <YOUR_DOCKERHUB_NAME>/<IMAGE_NAME>`
    - 推送到远程仓库
        `docker push <YOUR_DOCKERHUB_NAME>/<IMAGE_NAME>`
- 拉取
    - 同推送类似，指定命令空间和镜像名
        `docker pull <repo>/<image>`

## 导入/导出
无法联网就无法使用镜像仓库，这时可以手动传输

- 导出镜像
    `docker save -o <file_name.tar> <Image> [Image ...]`
- 导入镜像
    `docker load -i <file_name>`









