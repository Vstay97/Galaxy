---
title: Maven快速入门笔记
tags:
  - Maven
categories:
  - 备忘录
date: 2022-04-12 23:47:14
updated: 2022-04-12 23:47:14

---



## 什么是Maven

Maven 是 Apache 软件基金会组织维护的一款专门为 Java 项目提供**构建**和**依赖**管理支持的工具。

### 构建

Java 项目开发过程中，构建指的是使用**『原材料生产产品』**的过程。

构建过程包含的主要的环节：

- 清理：删除上一次构建的结果，为下一次构建做好准备
- 编译：Java 源程序编译成 *.class 字节码文件
- 测试：运行提前准备好的测试程序
- 报告：针对刚才测试的结果生成一个全面的信息
- 打包
    - Java工程：jar包
    - Web工程：war包
- 安装：把一个 Maven 工程经过打包操作生成的 jar 包或 war 包存入 Maven 仓库
- 部署
    - 部署 jar 包：把一个 jar 包部署到 Nexus 私服服务器上
    - 部署 war 包：借助相关 Maven 插件（例如 cargo），将 war 包部署到 Tomcat 服务器上

### 依赖

依赖管理中要解决的具体问题：

- jar 包的下载：使用 Maven 之后，jar 包会从规范的远程仓库下载到本地
- jar 包之间的依赖：通过依赖的传递性自动完成
- jar 包之间的冲突：通过对依赖的配置进行调整，让某些jar包不会被导入

### Maven 的工作机制

![image-20220412235336894](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220412235336894.png)

<!-- more-->

## Maven核心程序配置

### 下载与解压

> 官网: [Maven – Welcome to Apache Maven](https://maven.apache.org/)

下载后,解压到**非中文、没有空格**的目录

在解压目录中，我们需要着重关注 Maven 的核心配置文件：**conf/settings.xml**

### 指定本地仓库

配置方式如下：

```xml
<!-- localRepository
| The path to the local repository maven will use to store artifacts.
|
| Default: ${user.home}/.m2/repository
<localRepository>/path/to/local/repo</localRepository>
-->
<localRepository>E:\Java\mvn-repo</localRepository>
```

本地仓库这个目录，我们手动创建一个空的目录即可。

**记住**：一定要把 localRepository 标签**从注释中拿出来**。

**注意**：本地仓库本身也需要使用一个**非中文、没有空格**的目录。

### 配置阿里云提供的镜像仓库

#### 将原有的例子配置注释掉

```xml
<!-- <mirror>
  <id>maven-default-http-blocker</id>
  <mirrorOf>external:http:*</mirrorOf>
  <name>Pseudo repository to mirror external repositories initially using HTTP.</name>
  <url>http://0.0.0.0/</url>
  <blocked>true</blocked>
</mirror> -->
```

#### 加入我们的配置

将下面 mirror 标签整体复制到 settings.xml 文件的 mirrors 标签的内部。

```xml
<mirror>
  <id>nexus-aliyun</id>
  <mirrorOf>central</mirrorOf>
  <name>Nexus aliyun</name>
  <url>http://maven.aliyun.com/nexus/content/groups/public</url>
</mirror>
```

### 配置 Maven 工程的基础 JDK 版本

如果按照默认配置运行，Java 工程使用的默认 JDK 版本是 1.5，而我们熟悉和常用的是 JDK 1.8 版本。修改配置的方式是：将 profile 标签整个复制到 settings.xml 文件的 profiles 标签内。

```xml
<profiles>
  <id>jdk-1.8</id>
    <activation>
      <activeByDefault>true</activeByDefault>
        <jdk>1.8</jdk>
    </activation>
    <properties>
      <maven.compiler.source>1.8</maven.compiler.source>
      <maven.compiler.target>1.8</maven.compiler.target>
      <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
    </properties>
</profiles>
```

## 配置环境变量

### 检查 JAVA_HOME 配置是否正确

Maven 是一个用 Java 语言开发的程序，它必须基于 JDK 来运行，需要通过 JAVA_HOME 来找到 JDK 的安装位置

可以使用下面的命令验证：

![image-20220413005351275](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220413005351275.png)

可以使用下面的命令验证：

```shell
C:\Users\Administrator>java -version
java version "1.8.0_141"
Java(TM) SE Runtime Environment (build 1.8.0_141-b15)
Java HotSpot(TM) 64-Bit Server VM (build 25.141-b15, mixed mode)
```

### 配置 MAVEN_HOME

![image-20220413005523972](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220413005523972.png)

> 配置环境变量的规律：
>
> - XXX_HOME 通常指向的是 bin 目录的上一级
>
> - PATH 指向的是 bin 目录

### 配置PATH

![image-20220413005623041](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220413005623041.png)

### 验证

```shell
C:\Users\Administrator>mvn -v
Apache Maven 3.8.4 (9b656c72d54e5bacbed989b64718c159fe39b537)
Maven home: D:\software\apache-maven-3.8.4
Java version: 1.8.0_141, vendor: Oracle Corporation, runtime: D:\software\Java\jre
Default locale: zh_CN, platform encoding: GBK
OS name: "windows 10", version: "10.0", arch: "amd64", family: "windows"
```

## 命令行环境

### 根据坐标创建 Maven 工程

#### Maven 核心概念：坐标

**Maven中的坐标**

1. 使用三个**『向量』**在**『Maven的仓库』**中**唯一**的定位到一个**『jar』**包。

    - **groupId**：公司或组织的 id
    - **artifactId**：一个项目或者是项目中的一个模块的 id
    - **version**：版本号
2. 三个向量的取值方式
    - groupId：公司或组织域名的倒序，通常也会加上项目名称
      - 例如：com.atguigu.maven
    - artifactId：模块的名称，将来作为 Maven 工程的工程名
    - version：模块的版本号，根据自己的需要设定
      - 例如：SNAPSHOT 表示快照版本，正在迭代过程中，不稳定的版本
      - 例如：RELEASE 表示正式版本

**坐标和仓库中 jar 包的存储路径之间的对应关系**

坐标：

```xml
  <groupId>javax.servlet</groupId>
  <artifactId>servlet-api</artifactId>
  <version>2.5</version>
```

上面坐标对应的 jar 包在 Maven 本地仓库中的位置：

```text
Maven本地仓库根目录\javax\servlet\servlet-api\2.5\servlet-api-2.5.jar
```

#### 操作

1. 创建目录作为后面操作的工作空间
   例如：D:\maven-workspace\space201026

   > 此时我们已经有了三个目录，分别是：
   >
   > - Maven 核心程序：中军大帐
   > - Maven 本地仓库：兵营
   > - 本地工作空间：战场

2. 在工作空间目录下打开命令行窗口

   ![image-20220413012128180](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220413012128180.png)
   
3. 使用命令生成Maven工程

   ![image-20220413012239077](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220413012239077.png)

   运行 **mvn archetype:generate** 命令

   下面根据提示操作

   ```shell
   Choose a number or apply filter (format: [groupId:]artifactId, case sensitive contains): 7:【直接回车，使用默认值】
   
   Define value for property 'groupId': com.atguigu.maven
   
   Define value for property 'artifactId': pro01-maven-java
   
   Define value for property 'version' 1.0-SNAPSHOT: :【直接回车，使用默认值】
   
   Define value for property 'package' com.atguigu.maven: :【直接回车，使用默认值】
   
   Confirm properties configuration: groupId: com.atguigu.maven artifactId: pro01-maven-java version: 1.0-SNAPSHOT package: com.atguigu.maven Y: :【直接回车，表示确认。如果前面有输入错误，想要重新输入，则输入 N 再回车。】
   ```

4. 调整

   Maven 默认生成的工程，对 junit 依赖的是较低的 3.8.1 版本，我们可以改成较适合的 4.12 版本。

   自动生成的 App.java 和 AppTest.java 可以删除。

   ```xml
   <!-- 依赖信息配置 -->
   <!-- dependencies复数标签：里面包含dependency单数标签 -->
   <dependencies>
   	<!-- dependency单数标签：配置一个具体的依赖 -->
   	<dependency>
   		<!-- 通过坐标来依赖其他jar包 -->
   		<groupId>junit</groupId>
   		<artifactId>junit</artifactId>
   		<version>4.12</version>
   		
   		<!-- 依赖的范围 -->
   		<scope>test</scope>
   	</dependency>
   </dependencies>
   ```

5. 自动生成的 pom.xml 解读

   ```xml
   <!-- 当前Maven工程的坐标 -->
   <groupId>com.atguigu.maven</groupId>
   <artifactId>pro01-maven-java</artifactId>
   <version>1.0-SNAPSHOT</version>
   
   <!-- 当前Maven工程的打包方式，可选值有下面三种： -->
   <!-- jar：表示这个工程是一个Java工程  -->
   <!-- war：表示这个工程是一个Web工程 -->
   <!-- pom：表示这个工程是“管理其他工程”的工程 -->
   <packaging>jar</packaging>
   
   <name>pro01-maven-java</name>
   <url>http://maven.apache.org</url>
   
   <properties>
       <!-- 工程构建过程中读取源码时使用的字符集 -->
       <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   </properties>
   
   <!-- 当前工程所依赖的jar包 -->
   <dependencies>
     <!-- 使用dependency配置一个具体的依赖 -->
     <dependency>
   
       <!-- 在dependency标签内使用具体的坐标依赖我们需要的一个jar包 -->
       <groupId>junit</groupId>
       <artifactId>junit</artifactId>
       <version>4.12</version>
   
       <!-- scope标签配置依赖的范围 -->
       <scope>test</scope>
     </dependency>
   </dependencies>
   ```

#### Maven核心概念：POM

1. 含义

   POM：**P**roject **O**bject **M**odel，项目对象模型。和 POM 类似的是：DOM（Document Object Model），文档对象模型。它们都是模型化思想的具体体现。

2. 模型化思想

   POM 表示将工程抽象为一个模型，再用程序中的对象来描述这个模型。这样我们就可以用程序来管理项目了。我们在开发过程中，最基本的做法就是将现实生活中的事物抽象为模型，然后封装模型相关的数据作为一个对象，这样就可以在程序中计算与现实事物相关的数据.

3. 对应的配置文件

   POM 理念集中体现在 Maven 工程根目录下 **pom.xml** 这个配置文件中。所以这个 pom.xml 配置文件就是 Maven 工程的核心配置文件。其实学习 Maven 就是学这个文件怎么配置，各个配置有什么用

#### Maven核心概念：约定的目录结构

1. 各个目录的作用

   ```
   MAVEN-WORKSPACE\SPACE201026\PRO01-MAVEN-JAVA
   │  pom.xml (核心配置文件)
   │  
   └─src (源码目录)
       ├─main (主体程序目录)
       │  └─java (Java源代码)
       │      ├─com (package目录)
       │      │  └─atguigu
       │      │      └─maven
       │      │              App.java
       │      │              
       │      └─resources (配置文件)
       └─test (测试程序目录)
           └─java (Java源代码)
               └─com (package目录)
                   └─atguigu
                       └─maven
                               AppTest.java
   ```

   另外还有一个 target 目录专门存放构建操作输出的结果。

2. 约定目录结构的意义

   Maven 为了让构建过程能够尽可能自动化完成，所以必须约定目录结构的作用。例如：Maven 执行编译操作，必须先去 Java 源程序目录读取 Java 源代码，然后执行编译，最后把编译结果存放在 target 目录。

3. 约定大于配置

   Maven 对于目录结构这个问题，没有采用配置的方式，而是基于约定。这样会让我们在开发过程中非常方便。如果每次创建 Maven 工程后，还需要针对各个目录的位置进行详细的配置，那肯定非常麻烦。

   目前开发领域的技术发展趋势就是：**约定大于配置，配置大于编码。**

### 在 Maven 工程中编写代码

1. 主体程序

   ![image-20220413020131712](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220413020131712.png)

   主体程序指的是被测试的程序，同时也是将来在项目中真正要使用的程序。

   ```java
   package com.atguigu.maven;
   	
   public class Calculator {
   	
   	public int sum(int i, int j){
   		return i + j;
   	}
   	
   }
   ```

2. 测试程序

   ![image-20220413020613548](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220413020613548.png)

   ```java
   package com.atguigu.maven;
   	
   import org.junit.Test;
   import com.atguigu.maven.Calculator;
   	
   // 静态导入的效果是将Assert类中的静态资源导入当前类
   // 这样一来，在当前类中就可以直接使用Assert类中的静态资源，不需要写类名
   import static org.junit.Assert.*;
   	
   public class CalculatorTest{
   	
   	@Test
   	public void testSum(){
   		
   		// 1.创建Calculator对象
   		Calculator calculator = new Calculator();
   		
   		// 2.调用Calculator对象的方法，获取到程序运行实际的结果
   		int actualResult = calculator.sum(5, 3);
   		
   		// 3.声明一个变量，表示程序运行期待的结果
   		int expectedResult = 8;
   		
   		// 4.使用断言来判断实际结果和期待结果是否一致
   		// 如果一致：测试通过，不会抛出异常
   		// 如果不一致：抛出异常，测试失败
   		assertEquals(expectedResult, actualResult);
   		
   	}
   	
   }
   ```


### 执行 Maven 的构建命令

1. 要求

   运行 Maven 中和构建操作相关的命令时，必须进入到 pom.xml 所在的目录。

   如果没有在 pom.xml 所在的目录运行 Maven 的构建命令，那么会看到下面的错误信息：`The goal you specified requires a project to execute but there is no POM in this directory`

   > mvn -v 命令和构建操作无关，只要正确配置了 PATH，在任何目录下执行都可以。而构建相关的命令要在 pom.xml 所在目录下运行——操作哪个工程，就进入这个工程的 pom.xml 目录。

2. 清理操作

   mvn clean

   效果：删除 target 目录

3. 编译操作

   主程序编译：mvn compile

   测试程序编译：mvn test-compile

   主体程序编译结果存放的目录：target/classes

   测试程序编译结果存放的目录：target/test-classes

4. 测试操作

   mvn test

   测试的报告存放的目录：target/surefire-reports

5. 打包操作

   mvn package

   打包的结果——jar 包，存放的目录：target

6. 安装操作

   mvn install

   ```shell
   [INFO] Installing D:\maven-workspace\space201026\pro01-maven-java\target\pro01-maven-java-1.0-SNAPSHOT.jar to D:\maven-rep1026\com\atguigu\maven\pro01-maven-java\1.0-SNAPSHOT\pro01-maven-java-1.0-SNAPSHOT.jar
   [INFO] Installing D:\maven-workspace\space201026\pro01-maven-java\pom.xml to D:\maven-rep1026\com\atguigu\maven\pro01-maven-java\1.0-SNAPSHOT\pro01-maven-java-1.0-SNAPSHOT.pom
   ```

   安装的效果是将本地构建过程中生成的 jar 包存入 Maven 本地仓库(之前设置的本地仓库:)。这个 jar 包在 Maven 仓库中的路径是根据它的坐标生成的。

   坐标信息如下：

   ```xml
   <groupId>com.atguigu.maven</groupId>
   <artifactId>pro01-maven-java</artifactId>
   <version>1.0-SNAPSHOT</version>
   ```

   在 Maven 仓库中生成的路径如下：

   ```xml
   <!-- 在本地仓库 -->
   D:\maven-rep1026\com\atguigu\maven\pro01-maven-java\1.0-SNAPSHOT\pro01-maven-java-1.0-SNAPSHOT.jar
   ```

   另外，安装操作还会将 pom.xml 文件转换为 XXX.pom 文件一起存入本地仓库。所以我们在 Maven 的本地仓库中想看一个 jar 包原始的 pom.xml 文件时，查看对应 XXX.pom 文件即可，它们是名字发生了改变，本质上是同一个文件。

### 创建 Maven 版的 Web 工程

#### 说明

使用 mvn archetype:generate 命令生成 Web 工程时，需要使用一个专门的 archetype。这个专门生成 Web 工程骨架的 archetype 可以参照官网看到它的用法：

![image-20220413215355556](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220413215355556.png)

参数 archetypeGroupId、archetypeArtifactId、archetypeVersion 用来指定现在使用的 maven-archetype-webapp 的坐标。

#### 操作

注意：如果在上一个工程的目录下执行 mvn archetype:generate 命令，那么 Maven 会报错：不能在一个非 pom 的工程下再创建其他工程。所以不要再刚才创建的工程里再创建新的工程，**请回到工作空间根目录**来操作。

然后运行生成工程的命令：(运行的目录和 pro01-maven-java 在同一级)

`mvn archetype:generate -DarchetypeGroupId=org.apache.maven.archetypes -DarchetypeArtifactId=maven-archetype-webapp -DarchetypeVersion=1.4`

> Define value for property 'groupId': com.atguigu.maven 
>
> Define value for property 'artifactId': pro02-maven-web 
>
> Define value for property 'version' 1.0-SNAPSHOT: :【直接回车，使用默认值】
>
> Define value for property 'package' com.atguigu.maven: :【直接回车，使用默认值】 Confirm properties configuration: groupId: com.atguigu.maven artifactId: pro02-maven-web version: 1.0-SNAPSHOT package: com.atguigu.maven Y: :【直接回车，表示确认】

#### 生成的pom.xml

确认打包的方式是war包形式

```xml
<packaging>war</packaging>
```

#### 生成的Web工程的目录结构

![image-20220414032925696](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414032925696.png)

webapp 目录下有 index.jsp

WEB-INF 目录下有 web.xml

#### 创建 Servlet

1. 在 main 目录下创建 java 目录

   ![image-20220414033042368](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414033042368.png)

2. 在 java 目录下创建 Servlet 类所在的包的目录 (一个文件夹 一个文件夹的创建)

   ![image-20220414033122291](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414033122291.png)

3. 在包下创建 Servlet 类

   ```java
   package com.atguigu.maven;
   	
   import javax.servlet.http.HttpServlet;
   import javax.servlet.http.HttpServletRequest;
   import javax.servlet.http.HttpServletResponse;
   import javax.servlet.ServletException;
   import java.io.IOException;
   	
   public class HelloServlet extends HttpServlet{
   	
   	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
   		
   		response.getWriter().write("hello maven web");
   		
   	}
   	
   }
   ```

4. 在 web.xml 中注册 Servlet

   ```xml
     <servlet>
   	<servlet-name>helloServlet</servlet-name>
   	<servlet-class>com.atguigu.maven.HelloServlet</servlet-class>
     </servlet>
     <servlet-mapping>
   	<servlet-name>helloServlet</servlet-name>
   	<url-pattern>/helloServlet</url-pattern>
     </servlet-mapping>
   ```

#### 在 index.jsp 页面编写超链接

```html
<html>
<body>
<h2>Hello World!</h2>
<a href="helloServlet">Access Servlet</a>
</body>
</html>
```

> JSP全称是 Java Server Page，和 Thymeleaf 一样，是服务器端页面渲染技术。这里我们不必关心 JSP 语法细节，编写一个超链接标签即可。

#### 编译

此时直接执行 mvn compile 命令出错：

> 程序包 javax.servlet.http 不存在
>
> 程序包 javax.servlet 不存在
>
> 找不到符号
>
> 符号: 类 HttpServlet
>
> ……

上面的错误信息说明：我们的 Web 工程用到了 HttpServlet 这个类，而 HttpServlet 这个类属于 servlet-api.jar 这个 jar 包。此时我们说，Web 工程需要依赖 servlet-api.jar 包。

![image-20220414033351786](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414033351786.png)

#### 配置对 servlet-api.jar 包的依赖

对于不知道详细信息的依赖可以到https://mvnrepository.com/网站查询。使用关键词搜索，然后在搜索结果列表中选择适合的使用。

![image-20220414033428868](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414033428868.png)

比如，我们找到的 servlet-api 的依赖信息：

```xml
<!-- https://mvnrepository.com/artifact/javax.servlet/javax.servlet-api -->
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
    <scope>provided</scope>
</dependency>
```

#### 将 Web 工程打包为 war 包

运行 mvn package 命令，生成 war 包的位置如下图所示：

![image-20220414033528338](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414033528338.png)

#### 将 war 包部署到 Tomcat 上运行

将 war 包复制到 Tomcat/webapps 目录下

![image-20220414033603479](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414033603479.png)

启动 Tomcat：

![image-20220414033632063](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414033632063.png)

![image-20220414033657893](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414033657893.png)

通过浏览器尝试访问：http://localhost:8080/pro02-maven-web/index.jsp

### 让 Web 工程依赖 Java 工程

#### 观念

明确一个意识：从来只有 Web 工程依赖 Java 工程，没有反过来 Java 工程依赖 Web 工程。本质上来说，Web 工程依赖的 Java 工程其实就是 Web 工程里导入的 jar 包。最终 Java 工程会变成 jar 包，放在 Web 工程的 WEB-INF/lib 目录下。

#### 操作

在 pro02-maven-web 工程的 pom.xml 中，找到 dependencies 标签，在 dependencies 标签中做如下配置：

```xml
<!-- 配置对Java工程pro01-maven-java的依赖 -->
<!-- 具体的配置方式：在dependency标签内使用坐标实现依赖 -->
<dependency>
	<groupId>com.atguigu.maven</groupId>
	<artifactId>pro01-maven-java</artifactId>
	<version>1.0-SNAPSHOT</version>
</dependency>
```

#### 在 Web 工程中，编写测试代码

1. 补充创建目录

   pro02-maven-web**\src\test\java\com\atguigu\maven**

2. 确认 Web 工程依赖了 junit

   ```xml
       <dependency>
         <groupId>junit</groupId>
         <artifactId>junit</artifactId>
         <version>4.12</version>
         <scope>test</scope>
       </dependency>
   ```

3. 创建测试类

   把 Java 工程的 CalculatorTest.java 类复制到 pro02-maven-wb**\src\test\java\com\atguigu\maven** 目录下

#### 执行Maven命令

1. 测试命令

   mvn test

   说明：测试操作中会提前自动执行编译操作，测试成功就说明编译也是成功的。

2. 打包命令

   mvn package

   ![image-20220414112344803](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414112344803.png)

   通过查看 war 包内的结构，我们看到被 Web 工程依赖的 Java 工程确实是会变成 Web 工程的 WEB-INF/lib 目录下的 jar 包。

   ![image-20220414112446197](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414112446197.png)

3. 查看当前 Web 工程所依赖的 jar 包的列表

   mvn dependency:list
   
   > [INFO] The following files have been resolved:
   > [INFO]    javax.servlet:javax.servlet-api:jar:3.1.0:provided
   > [INFO]    org.hamcrest:hamcrest-core:jar:1.3:test
   > [INFO]    com.atguigu.maven:pro01-maven-java:jar:1.0-SNAPSHOT:compile
   > [INFO]    junit:junit:jar:4.12:test
   
   说明：javax.servlet:javax.servlet-api:jar:3.1.0:provided 格式显示的是一个 jar 包的坐标信息。格式是：
   
   > groupId:artifactId:打包方式:version:依赖的范围
   
   这样的格式虽然和我们 XML 配置文件中坐标的格式不同，但是本质上还是坐标信息，
   
4. 以树形结构查看当前 Web 工程的依赖信息

   mvn dependency:tree

   > [INFO] com.atguigu.maven:pro02-maven-web:war:1.0-SNAPSHOT
   > [INFO] +- javax.servlet:javax.servlet-api:jar:3.1.0:provided
   > [INFO] +- com.atguigu.maven:pro01-maven-java:jar:1.0-SNAPSHOT:compile
   > [INFO] \- junit:junit:jar:4.12:test
   > [INFO]    \- org.hamcrest:hamcrest-core:jar:1.3:test

   我们在 pom.xml 中并没有依赖 hamcrest-core，但是它却被加入了我们依赖的列表。原因是：junit 依赖了hamcrest-core，然后基于依赖的传递性，hamcrest-core 被传递到我们的工程了。

### 测试依赖的范围

#### 依赖范围

标签的位置：dependencies/dependency/**scope**

标签的可选值：**compile**/**test**/**provided**/system/runtime/**import**

空间角度: 物理地址,能不能import进来,然后compile通过

时间角度: 

	- 开发过程: 写代码的时候能不能`.`出来
	- 部署到服务器: 会不会参与打包, 在war包里面 一起放到服务器上

1. compile 和 test 对比

   |         | main目录（空间） | test目录（空间） | 开发过程（时间） | 部署到服务器（时间） |
   | ------- | ---------------- | ---------------- | ---------------- | -------------------- |
   | compile | 有效             | 有效             | 有效             | 有效                 |
   | test    | 无效             | 有效             | 有效             | 无效                 |

2. compile 和 provided 对比

   |          | main目录（空间） | test目录（空间） | 开发过程（时间） | 部署到服务器（时间） |
   | -------- | ---------------- | ---------------- | ---------------- | -------------------- |
   | compile  | 有效             | 有效             | 有效             | 有效                 |
   | provided | 有效             | 有效             | 有效             | 无效                 |

3. 结论:

   compile：通常使用的第三方框架的 jar 包这样在项目实际运行时真正要用到的 jar 包都是以 compile 范围进行依赖的。比如 SSM 框架所需jar包。

   test：测试过程中使用的 jar 包，以 test 范围依赖进来。比如 junit。

   provided：在开发过程中需要用到的“服务器上的 jar 包”通常以 provided 范围依赖进来。比如 servlet-api、jsp-api。而这个范围的 jar 包之所以不参与部署、不放进 war 包，就是避免和服务器上已有的同类 jar 包产生冲突，同时减轻服务器的负担。说白了就是：“**服务器上已经有了，你就别带啦！**”

#### 测试

1. 验证 compile 范围对 main 目录有效

   > main目录下的类：HelloServlet 使用compile范围导入的依赖：pro01-atguigu-maven
   >
   > 验证：使用compile范围导入的依赖对main目录下的类来说是有效的
   >
   > 有效：HelloServlet 能够使用 pro01-atguigu-maven 工程中的 Calculator 类
   >
   > 验证方式：在 HelloServlet 类中导入 Calculator 类，然后编译就说明有效。

2. 验证test范围对main目录无效

   测试方式：在主体程序中导入org.junit.Test这个注解，然后执行编译。

   具体操作：在pro01-maven-java\src\main\java\com\atguigu\maven目录下修改Calculator.java

   ```java
   package com.atguigu.maven;
   
   import org.junit.Test;
   
   public class Calculator {
   	
   	public int sum(int i, int j){
   		return i + j;
   	}
   	
   }
   ```

   执行Maven编译命令：

   `[ERROR] /D:/maven-workspace/space201026/pro01-maven-java/src/main/java/com/atguigu/maven/Calculator.java:[3,17] 程序包org.junit不存在`

3. 验证test和provided范围不参与服务器部署

   其实就是验证：通过compile范围依赖的jar包会放入war包，通过test范围依赖的jar包不会放入war包。

   ![image-20220414121554318](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414121554318.png)

4. 验证provided范围对测试程序有效

   测试方式是在pro02-maven-web的测试程序中加入servlet-api.jar包中的类。

   修改：**pro02-maven-web**\src\\**test**\java\com\atguigu\maven\\**CalculatorTest.java**

   ```java
   package com.atguigu.maven;
   
   import javax.servlet.http.HttpServlet;
   import javax.servlet.http.HttpServletRequest;
   import javax.servlet.http.HttpServletResponse;
   import javax.servlet.ServletException;
   
   import org.junit.Test;
   import com.atguigu.maven.Calculator;
   
   // 静态导入的效果是将Assert类中的静态资源导入当前类
   // 这样一来，在当前类中就可以直接使用Assert类中的静态资源，不需要写类名
   import static org.junit.Assert.*;
   
   public class CalculatorTest{
   	
   	@Test
   	public void testSum(){
   		
   		// 1.创建Calculator对象
   		Calculator calculator = new Calculator();
   		
   		// 2.调用Calculator对象的方法，获取到程序运行实际的结果
   		int actualResult = calculator.sum(5, 3);
   		
   		// 3.声明一个变量，表示程序运行期待的结果
   		int expectedResult = 8;
   		
   		// 4.使用断言来判断实际结果和期待结果是否一致
   		// 如果一致：测试通过，不会抛出异常
   		// 如果不一致：抛出异常，测试失败
   		assertEquals(expectedResult, actualResult);
   		
   	}
   	
   }
   ```

   然后运行Maven的编译命令：mvn compile

   然后看到编译成功。

### 测试依赖的传递性

1. 依赖的传递性

   - **概念**
   
     A 依赖 B，B 依赖 C，那么在 A 没有配置对 C 的依赖的情况下，A 里面能不能直接使用 C？
   
   - **传递的原则**
   
     在 A 依赖 B，B 依赖 C 的前提下，C 是否能够传递到 A，取决于 B 依赖 C 时使用的依赖范围。
   
     - B 依赖 C 时使用 compile 范围：可以传递
     - B 依赖 C 时使用 test 或 provided 范围：不能传递，所以需要这样的 jar 包时，就必须在需要的地方明确配置依赖才可以。
   
2. 使用 compile 范围依赖 spring-core

   测试方式：让 pro01-maven-java 工程依赖 spring-core

   具体操作：编辑 pro01-maven-java 工程根目录下 pom.xml

   ```xml
   <!-- https://mvnrepository.com/artifact/org.springframework/spring-core -->
   <dependency>
   	<groupId>org.springframework</groupId>
   	<artifactId>spring-core</artifactId>
   	<version>4.0.0.RELEASE</version>
   </dependency>
   ```

   使用 mvn dependency:tree 命令查看效果：

   > [INFO] com.atguigu.maven:pro01-maven-java:jar:1.0-SNAPSHOT
   > [INFO] +- junit:junit:jar:4.12:test
   > [INFO] |  \- org.hamcrest:hamcrest-core:jar:1.3:test
   > [INFO] \- org.springframework:spring-core:jar:4.0.0.RELEASE:compile
   > [INFO]    \- commons-logging:commons-logging:jar:1.1.1:compile

   还可以在 Web 工程中，使用 mvn dependency:tree 命令查看效果（需要重新将 pro01-maven-java 安装到仓库）：

   > [INFO] com.atguigu.maven:pro02-maven-web:war:1.0-SNAPSHOT
   > [INFO] +- javax.servlet:javax.servlet-api:jar:3.1.0:provided
   > [INFO] +- com.atguigu.maven:pro01-maven-java:jar:1.0-SNAPSHOT:compile
   > [INFO] |  \- org.springframework:spring-core:jar:4.0.0.RELEASE:compile
   > [INFO] |     \- commons-logging:commons-logging:jar:1.1.1:compile
   > [INFO] \- junit:junit:jar:4.12:test
   > [INFO]    \- org.hamcrest:hamcrest-core:jar:1.3:test

3. 验证 test 和 provided 范围不能传递

   从上面的例子已经能够看到，pro01-maven-java 依赖了 junit，但是在 pro02-maven-web 工程中查看依赖树的时候并没有看到 junit。

   要验证 provided 范围不能传递，可以在 pro01-maven-java 工程中加入 servlet-api 的依赖。

   效果还是和之前一样:

   > [INFO] com.atguigu.maven:pro02-maven-web:war:1.0-SNAPSHOT
   > [INFO] +- javax.servlet:javax.servlet-api:jar:3.1.0:provided
   > [INFO] +- com.atguigu.maven:pro01-maven-java:jar:1.0-SNAPSHOT:compile
   > [INFO] |  \- org.springframework:spring-core:jar:4.0.0.RELEASE:compile
   > [INFO] |     \- commons-logging:commons-logging:jar:1.1.1:compile
   > [INFO] \- junit:junit:jar:4.12:test
   > [INFO]    \- org.hamcrest:hamcrest-core:jar:1.3:test

### 测试依赖的排除

1. 概念

   当 A 依赖 B，B 依赖 C 而且 C 可以传递到 A 的时候，A 不想要 C，需要在 A 里面把 C 排除掉。而往往这种情况都是为了避免 jar 包之间的冲突。

   ![image-20220414152232187](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414152232187.png)

   所以配置依赖的排除其实就是阻止某些 jar 包的传递。因为这样的 jar 包传递过来会和其他 jar 包冲突。

2. 配置方式

   ```xml
   <dependency>
   	<groupId>com.atguigu.maven</groupId>
   	<artifactId>pro01-maven-java</artifactId>
   	<version>1.0-SNAPSHOT</version>
   	<scope>compile</scope>
   	<!-- 使用excludes标签配置依赖的排除	-->
   	<exclusions>
   		<!-- 在exclude标签中配置一个具体的排除 -->
   		<exclusion>
   			<!-- 指定要排除的依赖的坐标（不需要写version） -->
   			<groupId>commons-logging</groupId>
   			<artifactId>commons-logging</artifactId>
   		</exclusion>
   	</exclusions>
   </dependency>
   ```

3. 测试

   测试的方式：在 pro02-maven-web 工程中配置对 commons-logging 的排除

   ```xml
   <dependency>
   	<groupId>com.atguigu.maven</groupId>
   	<artifactId>pro01-maven-java</artifactId>
   	<version>1.0-SNAPSHOT</version>
   	<scope>compile</scope>
   	<!-- 使用excludes标签配置依赖的排除	-->
   	<exclusions>
   		<!-- 在exclude标签中配置一个具体的排除 -->
   		<exclusion>
   			<!-- 指定要排除的依赖的坐标（不需要写version） -->
   			<groupId>commons-logging</groupId>
   			<artifactId>commons-logging</artifactId>
   		</exclusion>
   	</exclusions>
   </dependency>
   ```

   运行 mvn dependency:tree 命令查看效果：

   > [INFO] com.atguigu.maven:pro02-maven-web:war:1.0-SNAPSHOT
   > [INFO] +- javax.servlet:javax.servlet-api:jar:3.1.0:provided
   > [INFO] +- com.atguigu.maven:pro01-maven-java:jar:1.0-SNAPSHOT:compile
   > [INFO] |  \- org.springframework:spring-core:jar:4.0.0.RELEASE:compile
   > [INFO] \- junit:junit:jar:4.12:test
   > [INFO]    \- org.hamcrest:hamcrest-core:jar:1.3:test

   发现在 spring-core 下面就没有 commons-logging 了。

### 继承

#### 概念

Maven工程之间，A 工程继承 B 工程

- B 工程：父工程
- A 工程：子工程

本质上是 A 工程的 pom.xml 中的配置继承了 B 工程中 pom.xml 的配置。

#### 作用

在父工程中统一管理项目中的依赖信息，具体来说是管理依赖信息的版本。

它的背景是：

- 对一个比较大型的项目进行了模块拆分。
- 一个 project 下面，创建了很多个 module。
- 每一个 module 都需要配置自己的依赖信息。

它背后的需求是：

- 在每一个 module 中各自维护各自的依赖信息很容易发生出入，不易统一管理。
- 使用同一个框架内的不同 jar 包，它们应该是同一个版本，所以整个项目中使用的框架版本需要统一。
- 使用框架时所需要的 jar 包组合（或者说依赖信息组合）需要经过长期摸索和反复调试，最终确定一个可用组合。这个耗费很大精力总结出来的方案不应该在新的项目中重新摸索。

通过在父工程中为整个项目维护依赖信息的组合既**保证了整个项目使用规范、准确的 jar 包**；又能够将**以往的经验沉淀**下来，节约时间和精力。

#### 举例

在一个工程中依赖多个 Spring 的 jar 包

> [INFO] +- org.springframework:**spring-core**:jar:**4.0.0**.RELEASE:compile
> [INFO] | \- commons-logging:commons-logging:jar:1.1.1:compile
> [INFO] +- org.springframework:**spring-beans**:jar:**4.0.0**.RELEASE:compile
> [INFO] +- org.springframework:**spring-context**:jar:**4.0.0**.RELEASE:compile
> [INFO] +- org.springframework:**spring-expression**:jar:4.0.0.RELEASE:compile
> [INFO] +- org.springframework:**spring-aop**:jar:**4.0.0**.RELEASE:compile
> [INFO] | \- aopalliance:aopalliance:jar:1.0:compile

使用 Spring 时要求所有 Spring 自己的 jar 包版本必须一致。为了能够对这些 jar 包的版本进行统一管理，我们使用继承这个机制，将所有版本信息统一在父工程中进行管理。

#### 操作

1. 创建父工程

   创建的过程和前面创建 pro01-maven-java 一样。

   工程名称：pro03-maven-parent

   工程创建好之后，要修改它的打包方式：

   ```xml
     <groupId>com.atguigu.maven</groupId>
     <artifactId>pro03-maven-parent</artifactId>
     <version>1.0-SNAPSHOT</version>
   
     <!-- 当前工程作为父工程，它要去管理子工程，所以打包方式必须是 pom -->
     <packaging>pom</packaging>
   ```

   只有打包方式为 pom 的 Maven 工程能够管理其他 Maven 工程。打包方式为 pom 的 Maven 工程中不写业务代码，它是专门管理其他 Maven 工程的工程。

2. 创建模块工程

   模块工程类似于 IDEA 中的 module，所以需要**进入 pro03-maven-parent 工程的根目录**，然后运行 mvn archetype:generate 命令来创建模块工程。

   假设，我们创建三个模块工程：(mvn archetype:generate)

   ![image-20220414171628471](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414171628471.png)

3. 查看被添加新内容的父工程 pom.xml

   下面 modules 和 module 标签是聚合功能的配置

   ```xml
   <modules>  
   	<module>pro04-maven-module</module>
   	<module>pro05-maven-module</module>
   	<module>pro06-maven-module</module>
   </modules>
   ```

4. 解读子工程的pom.xml

   ```xml
   <!-- 使用parent标签指定当前工程的父工程 -->
   <parent>
   	<!-- 父工程的坐标 -->
   	<groupId>com.atguigu.maven</groupId>
   	<artifactId>pro03-maven-parent</artifactId>
   	<version>1.0-SNAPSHOT</version>
   </parent>
   
   <!-- 子工程的坐标 -->
   <!-- 如果子工程坐标中的groupId和version与父工程一致，那么可以省略 -->
   <!-- <groupId>com.atguigu.maven</groupId> -->
   <artifactId>pro04-maven-module</artifactId>
   <!-- <version>1.0-SNAPSHOT</version> -->
   ```

5. 在父工程中配置依赖的统一管理

   如果 xml 文件中原本有 dependency ,可以注释掉. 用下面的替换

   **注: 被管理的依赖并没有真正被引入到工程**

   ```xml
   <!-- 使用dependencyManagement标签配置对依赖的管理 -->
   <!-- 被管理的依赖并没有真正被引入到工程 -->
   <dependencyManagement>
   	<dependencies>
   		<dependency>
   			<groupId>org.springframework</groupId>
   			<artifactId>spring-core</artifactId>
   			<version>4.0.0.RELEASE</version>
   		</dependency>
   		<dependency>
   			<groupId>org.springframework</groupId>
   			<artifactId>spring-beans</artifactId>
   			<version>4.0.0.RELEASE</version>
   		</dependency>
   		<dependency>
   			<groupId>org.springframework</groupId>
   			<artifactId>spring-context</artifactId>
   			<version>4.0.0.RELEASE</version>
   		</dependency>
   		<dependency>
   			<groupId>org.springframework</groupId>
   			<artifactId>spring-expression</artifactId>
   			<version>4.0.0.RELEASE</version>
   		</dependency>
   		<dependency>
   			<groupId>org.springframework</groupId>
   			<artifactId>spring-aop</artifactId>
   			<version>4.0.0.RELEASE</version>
   		</dependency>
   	</dependencies>
   </dependencyManagement>
   ```

6. 子工程中引用那些被父工程管理的依赖

   关键点：省略版本号

   ```xml
   <!-- 子工程引用父工程中的依赖信息时，可以把版本号去掉。	-->
   <!-- 把版本号去掉就表示子工程中这个依赖的版本由父工程决定。 -->
   <!-- 具体来说是由父工程的dependencyManagement来决定。 -->
   <dependencies>
   	<dependency>
   		<groupId>org.springframework</groupId>
   		<artifactId>spring-core</artifactId>
   	</dependency>
   	<dependency>
   		<groupId>org.springframework</groupId>
   		<artifactId>spring-beans</artifactId>
   	</dependency>
   	<dependency>
   		<groupId>org.springframework</groupId>
   		<artifactId>spring-context</artifactId>
   	</dependency>
   	<dependency>
   		<groupId>org.springframework</groupId>
   		<artifactId>spring-expression</artifactId>
   	</dependency>
   	<dependency>
   		<groupId>org.springframework</groupId>
   		<artifactId>spring-aop</artifactId>
   	</dependency>
   </dependencies>
   ```

7. 在父工程中升级依赖信息的版本

   ```xml
   ……
   			<dependency>
   				<groupId>org.springframework</groupId>
   				<artifactId>spring-beans</artifactId>
   				<version>4.1.4.RELEASE</version>
   			</dependency>
   ……
   ```

   然后在子工程中运行mvn dependency:list，效果如下：

   > [INFO] The following files have been resolved:
   > [INFO]    org.springframework:spring-core:jar:4.0.0.RELEASE:compile
   > [INFO]    org.springframework:spring-context:jar:4.0.0.RELEASE:compile
   > [INFO]    org.springframework:spring-expression:jar:4.0.0.RELEASE:compile
   > [INFO]    org.springframework:spring-aop:jar:4.0.0.RELEASE:compile
   > [INFO]    commons-logging:commons-logging:jar:1.1.1:compile
   > [INFO]    org.springframework:spring-beans:jar:4.1.4.RELEASE:compile
   > [INFO]    aopalliance:aopalliance:jar:1.0:compile

8. 在父工程中声明自定义属性

   ```xml
   <!-- 通过自定义属性，统一指定Spring的版本 -->
   <properties>
   	<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
   	
   	<!-- 自定义标签，维护Spring版本数据 -->
   	<atguigu.spring.version>4.3.6.RELEASE</atguigu.spring.version>
   </properties>
   ```

   在需要的地方使用`${}`的形式来引用自定义的属性名：

   ```xml
   			<dependency>
   				<groupId>org.springframework</groupId>
   				<artifactId>spring-core</artifactId>
   				<version>${atguigu.spring.version}</version>
   			</dependency>
   ```

   真正实现“一处修改，处处生效”。

#### 实际意义

![image-20220414172151552](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414172151552.png)

编写一套符合要求、开发各种功能都能正常工作的依赖组合并不容易。如果公司里已经有人总结了成熟的组合方案，那么再开发新项目时，如果不使用原有的积累，而是重新摸索，会浪费大量的时间。为了提高效率，我们可以使用工程继承的机制，让成熟的依赖组合方案能够保留下来。

如上图所示，公司级的父工程中管理的就是成熟的依赖组合方案，各个新项目、子系统各取所需即可。

## IDEA环境

### 创建父工程

1. 创建 Project

   ![image-20220414205717593](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414205717593.png)

   ![image-20220414205833476](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414205833476.png)

   ![image-20220414205910549](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414205910549.png)

2. 开启自动导入

   这个自动导入**一定要开启**，因为 Project、Module 新创建或 pom.xml 每次修改时都应该让 IDEA 重新加载 Maven 信息。这对 Maven 目录结构认定、Java 源程序编译、依赖 jar 包的导入都有非常关键的影响。
   
   另外也可以通过 IDEA 的 Settings 设置来开启：
   
   ![image-20220414210026775](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414210026775.png)
   
   针对任何的修改，就可以让 IntelliJ IDEA 对修改进行自动导入了。
   
   如果你不选择任何修改，只选择外部修改的话。
   
   那么只有在你 IntelliJ IDEA 通过 Git 或者其他代码控制，进行修改的时候，或者切换不同的分支的时候 IntelliJ IDEA 才会对 pom 文件进行刷新导入。
   

### 配置Maven信息

每次创建 Project 后都需要设置 Maven 家目录位置，否则 IDEA 将使用内置的 Maven 核心程序（不稳定）并使用默认的本地仓库位置。这样一来，我们在命令行操作过程中已下载好的 jar 包就白下载了，默认的本地仓库通常在 C 盘，还影响系统运行。

配置之后，IDEA 会根据我们在这里指定的 Maven 家目录自动识别到我们在 settings.xml 配置文件中指定的本地仓库。

![image-20220414210326871](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414210326871.png)

### 创建Java模块工程

![image-20220414210420152](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414210420152.png)

![image-20220414210500711](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414210500711.png)

### 创建Web模块工程

1. 创建模块

   按照前面的同样操作创建模块，**此时**这个模块其实还是一个**Java模块**。

2. 修改打包方式

   Web 模块将来打包当然应该是 **war** 包。

   ```xml
   <packaging>war</packaging>
   ```

3. Web 设定

   首先打开项目结构菜单：

   ![image-20220414210729952](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414210729952.png)

   然后到 Facets 下查看 IDEA 是否已经帮我们自动生成了 Web 设定。正常来说只要我们确实设置了打包方式为 war，那么 IDEA 2019 版就会自动生成 Web 设定。

   ![image-20220414210819097](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414210819097.png)

   如果没有自动创建,那么请参照下面两图，我们自己创建：

   ![image-20220414210909851](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414210909851.png)

   ![image-20220414210939232](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414210939232.png)

4. 借助IDEA生成web.xml

   ![image-20220414211043710](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414211043710.png)

   ![image-20220414211343439](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414211343439.png)

5. 设置 Web 资源的根目录

   结合 Maven 的目录结构，Web 资源的根目录需要设置为 src/main/webapp 目录。
   
   ![image-20220414211545133](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414211545133.png)
   
   ![image-20220414211834379](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414211834379.png)

### 其他操作

#### 在IDEA中执行Maven命令

1. 直接执行

   ![image-20220414214954170](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414214954170.png)

2. 手动输入

   ![image-20220414215228411](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414215228411.png)

   ![image-20220414215044714](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414215044714.png)

   ![image-20220414215255614](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven快速入门/image-20220414215255614.png)

   ![image-20220414215320755](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414215320755.png)

   如果有需要，还可以给命令后面附加参数：

   ![image-20220414215550197](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414215550197.png)

   ```xml
   # -D 表示后面要附加命令的参数，字母 D 和后面的参数是紧挨着的，中间没有任何其它字符
   # maven.test.skip=true 表示在执行命令的过程中跳过测试
   mvn clean install -Dmaven.test.skip=true
   ```

#### 在IDEA中查看某个模块的依赖信息

在界面右侧可找到 Maven 和 Show Dependencies 的图标，点击后即可查看当前 maven 模块的依赖结构图

![image-20220415000046045](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220415000046045.png)

依赖结构图会以当前 maven 模块为根节点，一般位于结构图的最下方，然后向上依次展开。

![image-20220415000136444](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220415000136444.png)

其中需要注意到，图中的红色实线是冲突的，可以像上图那样，右键，排除，他就会自动在 pom 文件里面给 exclud 了。

![image-20220415000231977](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220415000231977.png)

另外我们还可以直接用 ctrl+f 快速搜索某个 jar 包的名称，这样就可以很清晰的查看出该 jar 包如何在 maven 中引入的。

![image-20220415000400692](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220415000400692.png)

#### 工程导入

Maven工程除了自己创建的，还有很多情况是别人创建的。而为了参与开发或者是参考学习，我们都需要导入到 IDEA 中。下面我们分几种不同情况来说明：

1. 来自版本控制系统

   目前我们通常使用的都是 Git（本地库） + Github（远程库）的版本控制系统

2. 来自工程目录

   直接使用 IDEA 打开工程目录即可。下面举个例子：

   1. 工程压缩包
   
      假设别人发给我们一个 Maven 工程的 zip 压缩包：maven-rest-demo.zip。从码云或GitHub上也可以以 ZIP 压缩格式对项目代码打包下载。
   
   2. 解压
   
      如果你的所有 IDEA 工程有一个专门的目录来存放，而不是散落各处，那么首先我们就把 ZIP 包解压到这个指定目录中。
   
      ![image-20220414220004492](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414220004492.png)
   
   3. 打开
   
      只要我们确认在解压目录下可以直接看到 pom.xml，那就能证明这个解压目录就是我们的工程目录。那么接下来让 IDEA 打开这个目录就可以了。
   
      ![image-20220414220107219](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414220107219.png)
   
      ![image-20220414220137521](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414220137521.png)
   
   4. 设置 Maven 核心程序位置
   
      打开一个新的 Maven 工程，和新创建一个 Maven 工程是一样的，此时 IDEA 的 settings 配置中关于 Maven 仍然是默认值：
      
      ![image-20220414220232426](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414220232426.png)
      
      所以我们还是需要像新建 Maven 工程那样，指定一下 Maven 核心程序位置：
      
      ![image-20220414220324486](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414220324486.png)
      

#### 模块导入

1. 情景重现

   在实际开发中，通常会忽略模块（也就是module）所在的项目（也就是project）仅仅导入某一个模块本身。这么做很可能是类似这样的情况：比如基于 Maven 学习 SSM 的时候，做练习需要导入老师发给我们的代码参考。

2. 导入 Java 类型模块

   1. 找到老师发的工程目录
   
      ![image-20220414220512460](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414220512460.png)
   
   2. 复制我们想要导入的模块目录
   
      ![image-20220414220618020](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414220618020.png)
   
   3. 粘贴到我们自己工程目录下
   
      这个工程（project）是我们事先在 IDEA 中创建好的
   
      ![image-20220414220702379](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414220702379.png)
   
      ![image-20220414220729533](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414220729533.png)
   
   4. 在 IDEA 中执行导入
   
      ![image-20220414220804960](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414220804960.png)
   
      ![image-20220414220825757](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414220825757.png)
   
      ![image-20220414220901645](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414220901645.png)
   
      ![image-20220414220936191](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414220936191.png)
   
      ![image-20220414220959655](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414220959655.png)
   
   5. 修改 pom.xml
   
      刚刚导入的 module 的父工程坐标还是以前的，需要改成我们自己的 project。
   
      ![image-20220414221049039](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414221049039.png)
   
      ![image-20220414221115437](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414221115437.png)

#### 导入Web类型模块

其它操作和上面演示的都一样，只是多一步：删除多余的、不正确的 web.xml 设置。如下图所示：

![image-20220414221206283](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Maven%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220414221206283.png)

## 其他核心概念

### 生命周期

1. 作用

   为了让构建过程自动化完成，Maven 设定了三个生命周期，生命周期中的每一个环节对应构建过程中的一个操作。

2. 三个生命周期

   | 生命周期名称 |     作用     |                           各个环节                           |
   | ------------ | :----------: | :----------------------------------------------------------: |
   | Clean        | 清理操作相关 |                  pre-clean clean post-clean                  |
   | Site         | 生成站点相关 |             pre-site site post-site deploy-site              |
   | Default      | 主要构建过程 | validate generate-sources process-sources generate-resources process-resources 复制并处理资源文件，至目标目录，准备打包。 compile 编译项目 main 目录下的源代码。 process-classes generate-test-sources process-test-sources generate-test-resources process-test-resources 复制并处理资源文件，至目标测试目录。 test-compile 编译测试源代码。 process-test-classes test 使用合适的单元测试框架运行测试。这些测试代码不会被打包或部署。 prepare-package package 接受编译好的代码，打包成可发布的格式，如JAR。 pre-integration-test integration-test post-integration-test verify install将包安装至本地仓库，以让其它项目依赖。 deploy将最终的包复制到远程的仓库，以让其它开发人员共享；或者部署到服务器上运行（需借助插件，例如：cargo）。 |

3. 特点

   - 前面三个生命周期彼此是独立的。
   - 在任何一个生命周期内部，执行任何一个具体环节的操作，都是从本周期最初的位置开始执行，直到指定的地方。（本节记住这句话就行了，其他的都不需要记）

   Maven 之所以这么设计其实就是为了提高构建过程的自动化程度：让使用者只关心最终要干的即可，过程中的各个环节是自动执行的。

### 插件和目标

1. 插件

   Maven 的核心程序仅仅负责宏观调度，不做具体工作。具体工作都是由 Maven 插件完成的。例如：编译就是由 maven-compiler-plugin-3.1.jar 插件来执行的。

2. 目标

   一个插件可以对应多个目标，而每一个目标都和生命周期中的某一个环节对应。

   Default 生命周期中有 compile 和 test-compile 两个和编译相关的环节，这两个环节对应 compile 和 test-compile 两个目标，而这两个目标都是由 maven-compiler-plugin-3.1.jar 插件来执行的。

### 仓库

- 本地仓库：在当前电脑上，为电脑上所有 Maven 工程服务
- 远程仓库：需要联网
  - 局域网：我们自己搭建的 Maven 私服，例如使用 Nexus 技术。
  - Internet
    - 中央仓库
    - 镜像仓库：内容和中央仓库保持一致，但是能够分担中央仓库的负载，同时让用户能够就近访问提高下载速度，例如：Nexus aliyun

建议：不要中央仓库和阿里云镜像混用，否则 jar 包来源不纯，彼此冲突。

专门搜索 Maven 依赖信息的网站：https://mvnrepository.com/
