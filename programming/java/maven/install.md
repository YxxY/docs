官网下载 [二进制包](http://maven.apache.org/download.cgi), 安装十分简单，解压安装包后，将 bin目录加到环境变量中即可。  
具体可参考 [安装步骤](http://maven.apache.org/install.html).

## 目录结构
- bin，包含了mvn运行的脚本。这些脚本用来配置Java 命令，classpath，及其它系统属性，**最后执行Java命令**(就是说 maven是依赖 java的)
- boot，类加载框架，用来加载maven自己的类库
- conf，该目录包含一个非常重要的配置文件`setting.xml`。是maven的全局配置。一般不直接修改该文件，而是将它拷贝到**本地仓库**中修改，局部配置会覆盖全局配置。
- lib，包含了运行时需要的Java类库。