
maven 是一个 Java项目管理及自动化构建工具  
[官方文档](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)

## why maven
- 生命周期管理，便捷的构建过程
- 依赖管理， 方便引入所依赖的jar包
- 仓库管理，提供统一的jar包管理
- 目录结构管理，约定大于配置
- 插件式架构， 丰富的插件
- 开源项目都用它……

### 关于构建
`Make` 差不多是最早的构建工具，make 由一个名为`Makefile`的脚本文件驱动。  
该文件使用 Make 自己定义的语法格式。其组成部分是一系列规则(rules),每一条规则
又包括目标(target),依赖(prerequisite)和命令(command)。这一系列规则串联起来完成构建。  
优点是能够使用系统本地命令，类似于shell。缺点是和系统绑定在一起，这对于跨平台的 Java来说不是很友好。

`Ant`(Another Neat Tool), 也是一个构建工具。最早用来构建 Tomcat。  
使用XML 定义构建脚本 `build.xml`，语法上想比make更加友好。  
和 make一样，ant也是过程式的。开发者需要显示的指定每一个目标，以及完成该目标所需执行的任务。  
这样做最大的缺点是对每一个项目都需要重写一遍，即便很多步骤可以复用，也会包含极大的重复。  
ant起初没有依赖管理机制。后期通过另一个工具实现了该功能。

`Maven`的设计师声明式的，项目构建的过程，以及过程中各个阶段的工作都是插件实现。  
插件即前人经验的积累，将一些通用性的功能封装起来，消除重复，也简化的流程。  
maven 内置了依赖管理，对第三方包的存储在仓库中，共享时十分方便。  

和之前的构建工具一样，maven项目的核心是`pom.xml`,定义了项目的基本信息，描述了项目如何构建，
声明项目依赖等等。  
总之Maven 提供了一组简洁，一致的操作接口，现成地功能丰富地插件，便捷的依赖管理。
开发者可以快速搭建新项目，便捷的使用构建流程。


## 安装
[官网下载](http://maven.apache.org/download.cgi) 二进制包  
安装十分简单，解压安装包后，将 bin目录加到环境变量中即可。具体可参考
[安装步骤](http://maven.apache.org/install.html)

### 目录结构
- bin，包含了mvn运行的脚本。这些脚本用来配置Java 命令，classpath，及其它系统属性，**最后执行Java命令**
- boot，类加载框架，用来加载maven自己的类库
- conf，该目录包含一个非常重要的配置文件`setting.xml`。是maven的全局配置。一般不直接修改该文件，而是将它拷贝到**本地仓库**中修改，局部配置会覆盖全局配置。
- lib，包含了运行时需要的Java类库。

### 设置环境变量
一般会把maven 安装目录设置为环境变量 `M2_HOME`, 除此之外还应设置 `MAVEN_OPTS`环境变量
为`-Xms128m -Xmx512m`。  
因为运行 mvn命令，本质还是运行 Java命令。Java 默认的最大内存往往不够Maven的运行需要。当内存超出时会报“java.lang.OutOfMemoryError” 错误。

### IDE中的Maven
一般IDE会内置一个特定版本的Maven，使用时最好手动配置本地的Maven，防止出现构建行为不一致的问题

## Maven 配置
- Maven 的全局配置在安装目录 `conf/setting.xml`中
- 用户级别的配置在用户工作目录下 `%USER_HOME%/.m2/setting.xml`（该文件不会默认存在，需要手动从全局配置拷贝过来）
- 最后是项目级别的配置 `pom.xml`, 在项目的根目录下

这三个配置，scope 逐级降低，但优先级逐级升高。如果相同的配置有不同的值，那后面的会覆盖前面的值。  
一般不建议直接修改全局配置，而是操作用户级别的配置或者项目配置。

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

执行Maven 项目命令时，也会先读取当前目录下的POM，获取需要的配置信息再执行。  

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

另外，Maven里有一个默认的POM, 称之为`Super POM`, 其他的POM都是继承它而来， 详细请参考[Super_POM](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html#Super_POM)  
所以如果一些配置值没有指定，会默认使用继承值，例如远程仓库字段，会默认使用Super POM 里的`http://repo.maven.apache.org/maven2`


## maven 仓库
maven仓库存储所有工程的jar文件，library jar文件，插件等资源文件

严格来说maven仓库只有两种类型
- **本地仓库**（local repository）  
    - 本地仓库在第一次运行mvn命令时创建， 默认在 `%USER_HOME%/.m2/` 目录下, 它相当于远程仓库的一个缓存，运行构建时，maven会自动下载所有的依赖的jar文件到本地仓库中，避免了每次构建都引用远程库依赖  
    - 可在配置文件`localRepository` 中修改默认值
    - 一般来说，我们无须维护本地仓库，除非是占用太多存储空间需要清理的时候
- **远程仓库**（remote repository）  
    - 远程仓库可以指向任何其他类型的仓库，可以通过多种协议访问， 例如 `file://` 和 `http://`  
    - 这些远程仓库可以是由第三方组织提供下载的真正意义上的远程仓库， 如 Maven的中央仓库 [repo.maven.apache.org/maven2](http://repo.maven.apache.org/maven2/) 和 [uk.maven.org/maven2/](http://uk.maven.org/maven2/)  
    - 也可以是一些内部仓库，由公司或个人自行搭建的文件服务器或者HTTP服务器等, 用来共享一些私有的资源包
    - 通过在配置文件里定义`repositories`, 定义一个到多个远程仓库
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

这个配置可以被`${user.home}/.m2/settings.xml`里的**镜像配置**(mirrors)覆盖，
也可以在具体项目`pom.xml`里配置自定义仓库， **而且该配置具备更高优先级**

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

### 发布到远程仓库
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

有些phases有默认绑定的goals， goal一般由插件(plugin)提供， 默认绑定的goal可以理解为默认插件。    


> 通过在POM里定义`<packaging>`字段指定打包类型，启用一系列的默认目标绑定到构建生命周期的各个阶段。
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

引入插件，需要在POM的`<build>`区域里声明插件它的ID。  
具体执行的goal，以及绑定的阶段（有些默认绑定到固定阶段，声明可省略），形如：  
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


## maven依赖
引入第三方库，仍旧使用`<groupId>:<artifactId>:<version>`标明依赖ID  
```xml
<dependencies>  
  <dependency>  
    <groupId>org.spring.framework</groupId>  
    <artifactId>spring-core</artifactId>  
    <version>${spring.version}</version>  
  </dependency>  
  <dependency>  
    <groupId>org.spring.framework</groupId>  
    <artifactId>spring-beans</artifactId>  
    <version>${spring.version}</version>  
  </dependency>  
  <dependency>  
    <groupId>org.spring.framework</groupId>  
    <artifactId>spring-web</artifactId>  
    <version>${spring.version}</version>  
  </dependency>  
  <dependency>  
    <groupId>org.spring.framework</groupId>  
    <artifactId>spring-mock</artifactId>  
    <version>${spring.version}</version>  
  </dependency>  
</dependencies>  
  
<properties>  
  <spring.version>2.5</spring.version>  
</properties>  
```
## 常用命令
- mvn archetype:generate， 新建，生成项目模板
- mvn compile，  编译项目，本阶段完成源代码编译
- mvn test， 测试，测试编译的源代码
- mvn clean， 清理，会默认清理target文件夹中的数据
- mvn package， 打包，本阶段根据 pom.xml 中描述的打包配置创建 JAR / WAR 包
- mvn install， 安装，安装包到本地的仓库，使其被本地的其他工程所依赖
- mvn deploy， 发布，将构建结果发布到远程仓库
