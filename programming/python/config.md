## 修改 pip源
以阿里云的镜像源举例
- 命令行参数临时修改
    - eg: `pip install xxx -i http://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com`
- 配置文件永久修改
    - linux下, 修改 `~/.pip/pip.conf`   
    - windows下, 修改 `%USERPROFILE%/pip/pip.ini`  
    - 如果配置文件不存在, 则手动创建, 内容如下:
        ```       
        [global]
        index-url = http://mirrors.aliyun.com/pypi/simple/
        trusted-host = mirrors.aliyun.com
        ```

同理, 如果使用 `pipenv`, 修改对应项目目录下 `Pipfile`配置文件的 url参数即可