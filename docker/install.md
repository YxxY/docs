Docker 安装  

## 关于版本
早期的docker有多种说法，如`docker`, `docker-engine`, `docker.io`  
官方发布的安装包名为`docker-io`， 版本号为 `1.*` , 最新版为 `1.13`

最新的docker重新规划分两个版本， 版本号从 `17.*` 开始， 截止到目前最新版为 `18.09`
- docker-ce (Community Edition), 适用于个人和小团队
- docker-ee (Enterprise Edition)， 为企业级开发而设计

练手的话推荐安装`docker-ce`， 安装前需要先卸载旧的版本和依赖

> 以我自己的 Centos 7 为例说明

## 卸载旧版本和相关依赖

    sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine
旧版本在`/var/lib/docker`里保存的内容，如镜像，容器等都会被保留
安装新的安装包，包名叫`docker-ce`， 有三种安装方式

## 从docker仓库安装
方便后期的安装和升级，推荐这种方式安装，但是需要联网
- 安装依赖

        sudo yum install -y yum-utils \
                device-mapper-persistent-data \
                lvm2
- 设置源仓库

        sudo yum-config-manager \
                --add-repo \
                https://download.docker.com/linux/centos/docker-ce.repo

    以上为官方yum源，由于网络原因，最后替换为国内的一些镜像源
    eg：  
    - 阿里镜像源：http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
- 安装docker-ce

        sudo yum install docker-ce
    也可以先查询docker-ce的版本，再安装指定版本
    - 查询版本
        
            yum list docker-ce --showduplicates | sort -r
    - 安装指定版本

            sudo yum install docker-ce-<VERSION STRING>
- 启动docker

        sudo systemctl start docker
- 验证安装成功

        sudo docker --version

安装完成时，默认还创建了一个空的docker用户组  
docker 命令会使用 Unix socket 与 Docker 引擎通讯。而只有 root 用户和 docker 组的用户才可以访问 Docker 引擎的 Unix socket  
一般不推荐直接使用root用户，推荐的做法是将用户加到docker用户组

        sudo usermod -aG docker your-user

## 通过安装包安装
如果不能联网，只能手动通过下载安装包安装了, 
- 下载rpm安装包 [下载地址](https://download.docker.com/linux/centos/7/x86_64/stable/Packages/)
- 执行安装命令

        sudo yum install /path/to/package.rpm
- 同上，docker安装成功但未启动，创建了一个空的 docker任务组。
- 后续更新版本，下载新版本的安装包，使用 `yum upgrade /path/to/package.rpm`即可
## 自动化脚本安装
一键式脚本安装,也需要联网，一般是在测试和开发环境这么做
- 下载安装脚本
        
        curl -fsSL https://get.docker.com -o get-docker.sh
- 执行安装
        
        sudo sh get-docker.sh

## 配置代理
docker 启动后是一个守护进程，如果是通过代理联网，docker pull可能会失败  
需要添加代理，参考 [proxy](https://docs.docker.com/config/daemon/systemd/#httphttps-proxy)

原理是给该守护进程定义环境变量`HTTP_PROXY`或者`HTTPS_PROXY`
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
    - 使配置生效
                
            sudo systemctl daemon-reload
    - 重启docker
                
            sudo systemctl restart docker
- 查询代理配置
    - 查看环境变量

            systemctl show --property=Environment docker
    - 查看进程信息

            docker info

- 验证安装成功, 拉取镜像并运行

        docker run hello-world

