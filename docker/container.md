
## 启动容器
基于一个镜像新建并启动一个容器，使用的是`docker run`  
> docker run [option] IMAGE [COMMAND] [args]

常用的**option**参数有
- `--name`， 定义容器名
- `--tty` | `-t`, 分配一个伪终端并绑定在容器的标准输入
- `--interactive` | `-i`, 始终打开容器的标准输入，就算没有分配也能用
- `--detach` | `-d`, 后台运行并打印容器ID
- `--publish` | `-p`, `<host_port>:<docker_port>` 将容器的端口映射到宿主机上
- `--rm`, 退出后自动删除
- `--workdir` | `-w`， 在容器内指定工作目录
- `--restart`， 退出自动重启

完整的命令行参数可参考 [docker run](https://docs.docker.com/edge/engine/reference/commandline/run/)  

## 查看容器信息

>docker container ls

也可以使用
> docker ps

查看容器输出信息

> docker container logs [container ID or NAMES]


## 终止容器
当容器中指定的应用终结时，容器会自动终止  

也可以使用`docker container stop [name or ID]`来终止容器

终止状态的容器可以通过 `docker container ls -a` 查看

也可以通过 `docker container start` 重新启动

## 进入容器
`docker exec -it <container> bash` 可以进入一个正在运行的容器并打开bash  

## 删除容器
容器状态必须为终止状态才能删除  
`docker container rm <container>` 来删除一个终止状态的容器  

批量删除所有处于终止状态的容器  

    docker container prune



