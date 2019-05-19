## 安装JDK
- 在oracle [官网](https://www.oracle.com/technetwork/java/javase/downloads/index.html)下载**目标版本**的JDK，如果没有历史包袱，可直接下载最新版

## 设置环境变量
设置`JAVA_HOME`环境变量，值为JDK安装位置，
同时把根目录下的bin目录加到可执行文件的搜索路径中

> windows  

设置环境变量  
- JAVA_HOME: D:\java\jdk-12.0.1
- PATH: %JAVA_HOME\bin;...

### unix
编辑`~/.bash_profile`  
- export JAVA_HOME=\`/usr/libexec/java_home -v 12\`
- export PATH=\$JAVA_HOME%\bin:\$PATH


