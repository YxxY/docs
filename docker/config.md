- 配置文件路径
    `~/.docker/config.json`
- docker daemon 配置文件路径
    `/etc/docker/daemon.json`

## 配置daemon

- 配置镜像加速
    在`daemon.json`里添加  
    ```json
      "registry-mirrors": [
        "https://registry.docker-cn.com"
      ]
    ```
- 配置私有源
    在`daemon.json`里添加  
    ```json
      "insecure-registries" : [ "registry-exapmle.com.cn"],
    ```

配置完成重启服务生效
  - 使配置生效
              
          sudo systemctl daemon-reload
  - 重启docker
              
          sudo systemctl restart docker
## 配置代理
docker daemon的代理配置在启动时已经完成，不能动态修改  
所以无法通过配置daemon.json 实现配置代理，所以要修改代理只能覆盖`docker.service`的默认配置

原理是给该守护进程重新定义环境变量`HTTP_PROXY`或者`HTTPS_PROXY`，并重启服务生效

参考 [proxy](https://docs.docker.com/config/daemon/systemd/#httphttps-proxy)， 实现如下： 
- 创建文件夹

    sudo mkdir -p /etc/systemd/system/docker.service.d
- 在该目录下创建文件`http-proxy.conf`  
    - 内容示例
                
            [Service]
            Environment="HTTP_PROXY=http://proxy.example.com:80/"
    - 如果某些地址不需要代理，可以设置为

            [Service]    
            Environment="HTTP_PROXY=https://proxy.example.com:443/" "NO_PROXY=localhost,127.0.0.1,docker-registry.somecorporation.com"

- 如果用的是https代理，需再创建一个文件`https-proxy.conf`, 对应环境变量名称为`HTTPS_PROXY`
<!-- 参考[network-proxy](https://docs.docker.com/network/proxy/#configure-the-docker-client) -->

- 配置完成重启服务生效
    同上
- 查询代理配置
    - 查看环境变量

            systemctl show --property=Environment docker
    - 查看进程信息

            docker info

- 验证安装成功, 拉取镜像并运行

        docker run hello-world