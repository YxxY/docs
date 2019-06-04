POM(Project Object Model) 是 Maven 里的基本工作单元， 它是一个xml文件（pom.xml），
包含了构建项目的配置细节  

## 约定
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
- `<project>` 项目根节点
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
  <version>1.0.0</version>
</project>
```
POM 以`<groupId>:<artifactId>:<version>`的形式来标识当前项目，因此这三项配置是必须的，且组合值必须是唯一的。

> 其它没有明确指定的配置会使用默认值  

如打包类型如果没有制定会使用默认值`jar`， 也可以手动指定为`<packaging>war</packaging>`

另外，Maven里有一个默认的POM, 称之为`Super POM`，其他的POM都是继承它而来，详细请参考[Super_POM](https://maven.apache.org/guides/introduction/introduction-to-the-pom.html#Super_POM)。    
所以如果一些配置值没有指定，会默认使用继承值，例如远程仓库字段，会默认使用Super POM 里的中央仓库。