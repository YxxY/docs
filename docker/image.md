
|操作|命令|说明|  
|:----|:----|:------|  
|list|`docker image ls` |列出镜像|  
|tag|docker tag image username/repo:tag |eg: docker tag friendlyhello yxxy/lib:test1  |
|login| docker login [registry]| 默认登陆docker hub， 也可以指定登陆其他registry|
|push| docker push username/repo:tag| repo不存在会创建，上传的镜像会被压缩，eg: docker push yxxy/lib:test1|
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
> docker image rm image1

image1 可以是 短ID(3位及以上)、长ID、仓库名 或者 镜像摘要

组合命令
eg：删除所有仓库名为redis的镜像
    
    docker image rm $(docker image ls -q redis)


## 定制镜像
