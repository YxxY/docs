Maven 的构建是基于生命周期的，构建和发布一个项目的过程是非常清晰的。     
Maven 有三种内置的构建生命周期
- `Clean`   负责清理工作
- `Default`	构建部分，编译，测试，打包，部署
- `Site`	生成项目报告，站点

## 生命周期组成
> 每个构建生命周期由一系列的不同的阶段(phase)组成， 完整的生命周期阶段参考[Maven 生命周期](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html#Lifecycle_Reference)

以Default生命周期举例，大致包括以下各个阶段：  
- `validate`	验证工程是否正确，且所有必要信息是否可用
- `compile`	编译源代码
- `test` 	测试编译后的源代码，此时的测试不应该要求代码被打包或部署
- `package`   打包编译好的代码，成可发布的格式(.jar, .war)
- `install`  	安装包到本地的仓库，本地的其他工程也可以依赖他们
- `deploy` 	部署最终的包文件到远程的仓库，分享给其他的开发者或者项目

生命周期的各个阶段（还包含其他省掉掉的）会**按顺序执行**直到结束

实际应用时，当在测试环境运行命令

    mvn install
这个命令会按顺序执行Default生命周期各个阶段的任务， validate, compile, package等等，直到执行install任务，然后结束  
> 也就是只需要调用最后一个阶段的命令，当前生命周期前面的阶段会默认按顺序执行

同理，还可以运行 `mvn clean deploy`, 会先清理项目，然后执行Default 生命周期全流程任务

## 阶段和目标
前面说 maven的构建生命周期由各个阶段(phase)组成，每个阶段表示一个步骤，但是它的具体的执行是多种多样的。  
- 一个阶段由零个或多个目标(`goal`)组成, goal可以绑定到一个或多个具体的 phase上，也可以单独执行
- 有些 phases有默认绑定的goals
- goal一般由插件(plugin)提供，默认绑定的 goal可以理解为默认插件    

eg, 通过在 POM里定义`<packaging>`字段指定打包类型，启用一系列的默认目标绑定到构建生命周期的各个阶段。  
有效的打包类型值包括: `jar`, `war`, `ear` 和 `pom`, 如果没有指定， 默认为 **jar**。

以下为 jar打包类型绑定到default生命周期各个阶段的默认目标：

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

每个阶段会调用**默认插件**的目标，具体如下
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