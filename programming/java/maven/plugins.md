
除了使用默认绑定的goals， 也可以手动配置插件绑定 goals到 phases上  

> 一个插件可以有一到多个goals，每一个代表一个特定的功能  

如果当前阶段有多个目标，那么目标的执行顺序是：**先执行该阶段默认绑定（或继承来的）的目标，再按顺序执行绑定到该阶段的目标**

## 引入插件
引入插件，需要在 POM的`<build>`区域里声明插件它的 ID。  
具体执行的目标，以及绑定的阶段（有些默认绑定到固定阶段，声明可省略），形如：  
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
必要时需指定绑定的`<phase>`，也可绑定到多个阶段。  

eg: 默认的3.1版本编译器插件不支持 Java 9及更新的版本。  
替换编译器插件为最新版本, 从而支持输出更高版本的字节码
```java
    <properties>
        <maven.compiler.release>11</maven.compiler.release>
    </properties>
 
    <build>
        <pluginManagement>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <version>3.8.1</version>
                </plugin>
            </plugins>
        </pluginManagement>
    </build>
```
