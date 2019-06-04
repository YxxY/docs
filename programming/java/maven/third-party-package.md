第三包可以到 [mvnrepository](https://mvnrepository.com/)上搜索寻找，
找到后，根据它的 ID引入。
## 依赖管理
引入第三方库，仍旧使用`<groupId>:<artifactId>:<version>`标明依赖ID  
eg：引入 spring
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