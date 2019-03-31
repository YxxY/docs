
maven 是一个项目管理及自动化构建工具， 主要用于java中  
[官方文档](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)

## why maven
- 生命周期管理，便捷的构建过程
- 依赖管理， 方便引入所依赖的jar包
- 仓库管理，提供统一的jar包管理
- 目录结构管理，约定大于配置
- 插件式架构， 丰富的插件
- java开源项目都用它……

## POM
POM(Project Object Model) 是 Maven 里的基本工作单元， 它是一个xml文件（pom.xml），
包含了构建项目的配置细节  

除了一些需要明确指定的配置，它还包括一些默认配置，也称之为约定，例如  

|配置项| 约定值 |  
|-------------|-------------- |   
|source code|  ${base}/src/main/java |  
|resources | ${base}/src/main/resources  |  
| tests  |   ${base}/src/test|  
|compliled code| ${base}/target|  
|distributable jar |  ${base}/target/classes|  

执行Maven 项目命令时，也会先读取当前目录下的POM，获取需要的配置信息再执行

POM的最少配置项，或者说是必须配置项为以下几项
- 项目根节点
- `modelVersion`, 应该被设置为 4.0.0
- `groupId`, 定义项目所属的实际项目，并会据此建立包结构
- `artifactId`, 当前项目id
- `version`, 当前版本号， 默认 0.0.1-SNAPSHOT

示例如下  
```xml
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.mycompany.app</groupId>
  <artifactId>my-app</artifactId>
  <version>1</version>
</project>
```
POM 以`<groupId>:<artifactId>:<version>`的形式来标识当前项目， 因此这三项配置是必须的，而且组合值必须是唯一的

> 其它没有明确指定的配置会使用默认值  

如打包类型如果没有制定会使用默认值`jar`， 也可以手动指定为`<packaging>war</packaging>`

另外，Maven里有一个默认的POM, 称之为`Super POM`, 其他的POM都是继承它而来， 详细请参考[POM](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html#Super_POM)  
所以如果一些配置值没有指定，会默认使用继承值，例如远程仓库字段，会默认使用Super POM 里的`http://repo.maven.apache.org/maven2`


## maven生命周期
Maven 的构建是基于生命周期的， 构建和发布一个项目的过程是非常清晰的    
Maven 有三种内置的构建生命周期
- Clean     负责清理工作
- Default	构建部分，编译，测试，打包，部署
- Site	生成项目报告，站点

> 每个构建生命周期由一系列的不同的阶段(phase)组成， 完整的生命周期阶段参考[Maven 生命周期](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html#Lifecycle_Reference)

以Default生命周期举例，大致包括以下各个阶段：  
- validate	验证工程是否正确，且所有必要信息是否可用
- compile	编译源代码
- test  	测试编译后的源代码，此时的测试不应该要求代码被打包或部署
- package   打包编译好的代码，成可发布的格式(.jar, .war)
- install  	安装包到本地的仓库，本地的其他工程也可以依赖他们
- deploy 	部署最终的包文件到远程的仓库，分享给其他的开发者或者项目

生命周期的各个阶段（还包含其他省掉掉的）会`按顺序执行`直到结束

实际应用时，当在测试环境运行命令

    mvn install
这个命令会按顺序执行Default生命周期各个阶段的任务， validate, compile, package等等，直到执行install任务，然后结束  
> 也就是只需要调用最后一个阶段的命令，当前生命周期前面的阶段会默认按顺序执行

同理，还可以运行 `mvn clean deploy`, 会先清理项目，然后执行Default 生命周期全流程任务

### phases and goals
前面说maven的构建生命周期由各个阶段(phase)组成，每个phase表示一个步骤，但是它的具体的执行是多种多样的  

> 一个phase由零个或多个目标(goal)组成, goal可以绑定到一个或多个具体的phase上，也可以单独执行

有些phases有默认绑定的goals， goal一般由插件(plugin)提供， 默认绑定的goal可以理解为默认插件  

> 通过在POM里定义`<packaging>`字段指定打包类型，可以启用一系列的默认目标绑定到构建生命周期的各个阶段  
有效的打包类型值包括: `jar`, `war`, `ear` 和 `pom`, 如果没有指定， 默认为jar

以下为jar打包类型绑定到default生命周期各个phase的默认goals

|Phase |	plugin:goal|
|-------------|-------------- |   
|process-resources |	resources:resources|
|compile |	compiler:compile|
|process-test-resources |	resources:testResources |
|test-compile |	compiler:testCompile|
|test |	surefire:test|
|package |	jar:jar|
|install |	install:install|
|deploy |	deploy:deploy |

每个阶段会调用默认插件的目标，具体如下
```xml
<phases>
  <process-resources>
    org.apache.maven.plugins:maven-resources-plugin:2.6:resources
  </process-resources>
  <compile>
    org.apache.maven.plugins:maven-compiler-plugin:3.1:compile
  </compile>
  <process-test-resources>
    org.apache.maven.plugins:maven-resources-plugin:2.6:testResources
  </process-test-resources>
  <test-compile>
    org.apache.maven.plugins:maven-compiler-plugin:3.1:testCompile
  </test-compile>
  <test>
    org.apache.maven.plugins:maven-surefire-plugin:2.12.4:test
  </test>
  <package>
    org.apache.maven.plugins:maven-jar-plugin:2.4:jar
  </package>
  <install>
    org.apache.maven.plugins:maven-install-plugin:2.4:install
  </install>
  <deploy>
    org.apache.maven.plugins:maven-deploy-plugin:2.7:deploy
  </deploy>
</phases>
```
### plugins
除了使用默认绑定的goals， 也可以手动配置插件绑定goals到phases上  

一个插件可以有一到多个goals，每一个代表一个特定的功能  

goals的执行顺序是先执行该阶段默认绑定（或继承来的）的goals，再按顺序执行绑定到该阶段的goals

引入插件，需要在POM的`<build>`区域里声明插件它的ID，具体执行的goal，以及绑定的阶段（有些默认绑定到固定阶段，声明可省略），形如：  
```xml
...
<build>
<plugins>
 <plugin>
   <groupId>com.mycompany.example</groupId>
   <artifactId>display-maven-plugin</artifactId>
   <version>1.0</version>
   <executions>
     <execution>
       <phase>process-test-resources</phase>
       <goals>
         <goal>time</goal>
       </goals>
     </execution>
   </executions>
 </plugin>
</plugins>
</build>
...
```
插件的ID，仍旧由`<groupId>:<artifactId>:<version>`组成  
`<executions>`标签里为具体的执行操作，可绑定多个goals  
必要时需指定绑定的`<phase>`，也可绑定到多个阶段

## maven仓库
maven仓库存储所有工程的jar文件，library jar文件，插件等资源文件

严格来说maven仓库只有两种类型
- **本地仓库**（local repository）  
    - 本地仓库在第一次运行mvn命令时创建， 默认在 `%USER_HOME%/.m2` 目录下, 它相当于远程仓库的一个缓存，运行构建时，maven会自动下载所有的依赖的jar文件到本地仓库中，避免了每次构建都引用远程库依赖  
    - 一般来说，我们无须维护本地仓库，除非是占用太多存储空间需要清理的时候
- **远程仓库**（remote repository）  
    - 远程仓库可以指向任何其他类型的仓库，可以通过多种协议访问， 例如 `file://` 和 `http://`  
    - 这些远程仓库可以是由第三方组织提供下载的真正意义上的远程仓库， 如 Maven的中央仓库 [repo.maven.apache.org/maven2](http://repo.maven.apache.org/maven2/) 和 [uk.maven.org/maven2/](http://uk.maven.org/maven2/)  
    - 也可以是一些内部仓库，由公司或个人自行搭建的文件服务器或者HTTP服务器等, 用来共享一些私有的资源包
    - 远程仓库通常是用来提供下载的，当然也可以上传，如果有相关操作权限的话

> **镜像仓库** 也是远程仓库的一种，通常在地理位置上更近，速度也更快

官方文档见 [镜像仓库使用](https://maven.apache.org/guides/mini/guide-mirror-settings.html) 

配置镜像仓库 需在配置文件`${user.home}/.m2/settings.xml`里，提供镜像仓库的`id`, `name`字段，以及被镜像仓库的ID`mirrorof`字段  

例如，默认的 Maven 美国中央仓库的ID 是`central`, 如果要使用欧洲的中央仓库实例，就可以如下配置

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

### 从远程仓库下载
当一个声明的依赖在本地仓库不存在时，或者远程仓库有更新的版本时，Maven是会从默认远程仓库[repo.maven.apache.org/maven2](http://repo.maven.apache.org/maven2/)下载  

这个配置可以被`${user.home}/.m2/settings.xml`里的全局镜像配置覆盖，
也可以在具体项目`pom.xml`里配置自定义仓库， 而且该配置具备更高优先级

### 使用内部仓库
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

## maven依赖
引入第三方库，仍旧使用`<groupId>:<artifactId>:<version>`标明依赖ID

## 常用命令
- mvn archetype:generate， 新建，生成项目模板
- mvn compile，  编译项目，本阶段完成源代码编译
- mvn test， 测试，测试编译的源代码
- mvn clean， 清理，会默认清理target文件夹中的数据
- mvn package， 打包，本阶段根据 pom.xml 中描述的打包配置创建 JAR / WAR 包
- mvn install， 安装，安装包到本地的仓库，使其被本地的其他工程所依赖
