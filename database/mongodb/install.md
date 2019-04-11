## MongoDB安装
[官网下载地址](https://www.mongodb.com/download-center#community)，个人使用的话安装社区版就可以了  

[官网安装指导文档](https://docs.mongodb.com/manual/installation/)

安装官网操作步骤基本没问题，举例简单说明下

### 在CentOS 7上安装
官方推荐rpm包的安装方式，然而经常安装环境都只有内网，还是tar包的形式安装吧

1. 下载`.tar.gz`安装包到目标机器上
    - eg: `mongodb-linux-x86_64-enterprise-rhel70-4.0.2.tgz`
    - 放在`/opt`目录下
        - 如没有权限， 追加权限即可`chmod -R 775 /opt/`
2. 安装tar包所需要的依赖（需root权限）

        yum install -y cyrus-sasl cyrus-sasl-gssapi cyrus-sasl-plain krb5-libs libcurl libpcap lm_sensors-libs net-snmp net-snmp-agent-libs openldap openssl rpm-libs tcp_wrappers-libs
3. 解压安装包

        tar -zxvf mongodb-linux-x86_64-enterprise-rhel70-4.0.2.tgz
4. 将bin目录下的文件添加到环境变量中， 这里采用软连接的方式(需root权限)

        ln -s  /opt/mongodb-linux-x86_64-enterprise-rhel70-4.0.2/bin/* /usr/local/bin/
5. 查看版本，确认安装成功
        
        mongod --version

    >db version v4.0.2  
    git version: fc1573ba18aee42f97a3bb13b67af7d837826b47  
    OpenSSL version: OpenSSL 1.0.1e-fips 11 Feb 2013  
    allocator: tcmalloc  
    modules: enterprise  
    build environment:  
      distmod: rhel70  
      distarch: x86_64  
      target_arch: x86_64
