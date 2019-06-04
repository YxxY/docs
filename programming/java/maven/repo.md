maven仓库存储所有工程的jar文件，library jar文件，插件等资源文件。

严格来说maven仓库只有两种类型，本地仓库和远程仓库
## 本地仓库
本地仓库(local repository)在第一次运行mvn命令时创建。默认在 `%USER_HOME%/.m2/` 目录下，该位置也可以通过修改 `setting.xml`配置文件中的 `localRepository`值修改默认值。  
该位置相当于远程仓库的一个缓存，构建时，maven会自动下载所有的依赖的jar文件到本地仓库中，避免了每次构建都引用远程库依赖。  
一般来说，我们无须维护本地仓库，除非是占用太多存储空间需要清理的时候

## 远程仓库
远程仓库(remote repository)可以指向任何其他类型的仓库，可以通过多种协议访问，eg: `file://` , `http://` 等。  
这些远程仓库可以是由第三方组织提供下载的真正意义上的远程仓库， 如 Maven的中央仓库 [repo.maven.apache.org/maven2](http://repo.maven.apache.org/maven2/) 和 [uk.maven.org/maven2/](http://uk.maven.org/maven2/)。也可以是一些内部仓库，由公司或个人自行搭建的文件服务器或者HTTP服务器等, 用来共享一些私有的资源包。

通过在配置文件里定义`repositories`, 定义一个到多个远程仓库。远程仓库通常是用来提供下载的，当然也可以上传，如果有相关操作权限的话

###  镜像仓库
镜像仓库(mirror repository) 也是远程仓库的一种，相当于一个**代理**指向另一个远程仓库，通常在地理位置上更近，速度也更快。 官方文档见 [镜像仓库使用](https://maven.apache.org/guides/mini/guide-mirror-settings.html)   

配置镜像仓库 需在配置文件`${user.home}/.m2/settings.xml`里，提供镜像仓库的`id`, `name`字段，以及被镜像仓库的ID`mirrorof`字段  

例如，默认的 Maven 美国中央仓库的ID 是`central`, 如果要使用欧洲的中央仓库镜像，就可以如下配置

```xml
<settings>
  ...
  <mirrors>
    <mirror>
      <id>UK</id>
      <name>UK Central</name>
      <url>http://uk.maven.org/maven2</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
  </mirrors>
  ...
</settings>
```
设置国内阿里云镜像仓库,修改 setting.xml
```xml
  <mirrors>
    <mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
      <mirrorOf>central</mirrorOf>        
    </mirror>
  </mirrors>
```
也可以直接在项目配置 pom.xml里添加仓库信息
```xml
<repositories>  
        <repository>  
            <id>alimaven</id>  
            <name>aliyun maven</name>  
            <url>http://maven.aliyun.com/nexus/content/groups/public/</url>  
            <releases>  
                <enabled>true</enabled>  
            </releases>  
            <snapshots>  
                <enabled>false</enabled>  
            </snapshots>  
        </repository>  
</repositories>  
```

### 从远程仓库下载
当一个声明的依赖在本地仓库不存在时，或者远程仓库有更新的版本时，Maven是会从默认远程仓库[repo.maven.apache.org/maven2](http://repo.maven.apache.org/maven2/)下载  

这个配置可以被`${user.home}/.m2/settings.xml`里的**镜像配置**(mirrors)覆盖，
也可以在具体项目`pom.xml`里配置自定义仓库， **而且该配置具备更高优先级**

## 使用内部仓库
如果是团队协作项目，由于安全，速度等原因，连接到公网下载依赖是不可接受的，因此设置一个内部仓库用来管理和发布资源是必要的  

使用内部仓库的设置如下， 增加一个`repositories`元素到pom.xml中即可， 形如
```xml
<project>
  ...
  <repositories>
    <repository>
      <id>my-internal-site</id>
      <url>http://myserver/repo</url>
    </repository>
  </repositories>
  ...
</project>
```
如果内部仓库需要鉴权登陆，那么`id`字段就对应`setting.xml`里`<server>`模块的鉴权策略， 如下：
```xml
<settings>
  ...
  <servers>
    <server>
      <id>my-internal-site</id>
      <username>my_login</username>
      <password>my_password</password>
      <privateKey>${user.home}/.ssh/id_dsa</privateKey>
      <passphrase>some_passphrase</passphrase>
      <filePermissions>664</filePermissions>
      <directoryPermissions>775</directoryPermissions>
      <configuration></configuration>
    </server>
  </servers>
  ...
</settings>
```
!> 如果使用了`private key`登陆内部仓库服务器，确保`要省略掉 <password> 元素`， 否则会被无视

## 发布到远程仓库
当对项目进行编译，测试，打包后，如果需要将生成的构建发布到仓库中，可以配置`distributionManagement`元素实现。  
```xml
<project>
...
<distributionManagement>
  <respository>
    <id>proj-releases</id>
    <name>Proj Release repository</name>
    <url>http://192.168.1.100/content/repositories/proj-releases</url>
  </repository>
  <snapshotRepository>
    <id>proj-snapshot</id>
    <name>Proj Snapshots repository</name>
    <url>http://192.168.1.100/content/repositories/proj-releases</url>
  </snapshotRepository>
</distributionManagement>
...
</project>
```
配置正确后，运行`mvn clean deploy`就会将项目输出到配置对应的远程仓库。
如果当期是快照版本就会部署到快照版本仓库地址，否则就部署到发布版本仓库地址。
