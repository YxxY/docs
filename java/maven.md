
maven 是一个项目管理及自动化构建工具， 主要用于java中  
[官方文档](https://maven.apache.org/guides/getting-started/maven-in-five-minutes.html)

## why maven ?
- 生命周期管理，便捷的构建过程
- 依赖管理， 方便引入所依赖的jar包
- 仓库管理，提供统一的jar包管理
- 目录结构管理，约定大于配置
- 插件式架构， 丰富的插件
- java开源项目都用它……

## maven 项目结构
|配置项| 约定值 |
|-------------|-------------- | 
|source code|  $base/src/main/java |
|resources | $base/src/main/resources  |
| tests  |   $base/src/test|
|compliled code| $base/target|
|distributable jar |  $base/target/classes|

maven通过`pom.xml`中的配置来确定唯一项目

- `groupId`, 定义项目所属的实际项目，并会据此建立包结构
- `artifactId`, 当前项目id
- `version`, 版本号， 默认 0.0.1-SNAPSHOT

## maven生命周期
maven的生命周期分为三种标准的生命周期
- Clean      在进行真正的构建之前，进行清理工作
- Default	构建部分，编译，测试，打包，部署，都在这个生命周期
- Site	生成项目报告，站点

### Clean
- pre-clean  执行在clean之前完成的工作
- clean  清除上一次构建生成的java
- post-clean  执行在clean之后立刻完成的工作

### Default
- validate	验证工程是否正确，并且必要信息是否可用
- initialize	初始化build状态等工作，设置属性或创建javaprepare-resources   拷贝资源
compile	编译源代码
- test-compile  编译单元测试源代码
- test  	单元测试，代码不被打包和部署
- package   	获取编译好的代码，并根据其可发布的格式进行打包，比如Jar,War
- install  	安装包到本地的仓库，使其被本地的其他工程所依赖
- deploy 	复制最终的包到远程的仓库，分享给其他的开发者或者项目

### Site
- pre-site     执行在生成站点文档之前完成的工作
- site    生成项目的站点文java
- post-site     执行生成站点文档之后的工作
- site-deploy     将生成的站点文档部署到特定的服务器上

## maven仓库
maven仓库存储所有工程的jar文件，library jar文件，插件等资源文件。

maven仓库有三种类型
- 本地仓库
- 远程参考
- 中央仓库

### local
本地仓库在第一次运行mvn命令时创建， 默认在%USER_HOME%/.m2目录下  
运行构建时，maven会自动下载所有的依赖的jar文件到本地仓库中，避免了每次构建都引用远程库依赖

### central
是由社区提供的仓库，包含了最全面的常用资源

### remote
手动指定依赖库所在位置的仓库

## maven依赖
Maven工程中是使用groupId, artifactId, version唯一定义的，所以我们可以根据此唯一标识，在POM中定义对其他工程的依赖


## 常用命令
- mvn archetype:generate， 新建，生成项目模板
- mvn compile，  编译项目，本阶段完成源代码编译
- mvn test， 测试，测试编译的源代码
- mvn clean， 清理，会默认清理target文件夹中的数据
- mvn package， 打包，本阶段根据 pom.xml 中描述的打包配置创建 JAR / WAR 包
- mvn install， 安装，安装包到本地的仓库，使其被本地的其他工程所依赖
