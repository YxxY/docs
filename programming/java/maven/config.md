## 设置环境变量
一般会把maven 安装目录设置为环境变量 `M2_HOME`, 除此之外还应设置 `MAVEN_OPTS`环境变量
为`-Xms128m -Xmx512m`。  
因为运行 mvn命令，本质还是运行 Java命令。Java 默认的最大内存往往不够Maven的运行需要。当内存超出时会报“java.lang.OutOfMemoryError” 错误。

## IDE中的Maven
一般IDE会内置一个特定版本的Maven，使用时最好手动配置为本地的 Maven版本，防止出现构建行为不一致的问题。

## Maven 配置
- Maven 的**全局配置**在安装目录 `conf/setting.xml`中
- **用户级别的配置**在用户工作目录下 `%USER_HOME%/.m2/setting.xml`（该文件不会默认存在，需要手动从全局配置拷贝过来）
- 最后是**项目级别的配置** `pom.xml`, 在项目的根目录下

这三个配置，scope 逐级降低，但优先级逐级升高。如果相同的配置有不同的值，那后面的会覆盖前面的值。  
一般不建议直接修改全局配置，而是操作用户级别的配置或者项目配置。