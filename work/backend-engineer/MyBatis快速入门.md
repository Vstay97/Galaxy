---
title: MyBatis快速入门
tags:
  - MyBatis
categories:
  - 框架
date: 2022-04-18 21:48:15
updated: 2022-04-25 21:48:15
---

内容如下：

- 搭建MyBatis
- MyBatis的增删改查
- 核心配置文件
- MyBatis获取参数值的方式（重点）
- MyBatis的各种查询功能
- 特殊SQL的执行
- 自定义映射resultMap
- 动态SQL
- MyBatis的缓存

<!-- more-->

## 搭建MyBatis

### 开发环境

IDE:idea 2021.2.2

构建工具: maven 3.8.5

MySQL版本: MySQL 8.0

MyBatis版本: 3.5.7

### 创建Maven工程

1. 打包方式: jar

2. 引入依赖

   > 出错:` java.sql.SQLException: Unknown initial character set index '255' received from server. Initial client character set can be forced via the 'characterEncoding' property.`
   >
   > 原因:
   >
   > ```shell
   > Character Set Support
   > 
   > Important Change: The default character set has changed from latin1 to utf8mb4. These system variables are affected:
   > 
   > The default value of the character_set_server and character_set_database system variables has changed from latin1 to utf8mb4.
   > 
   > The default value of the collation_server and collation_database system variables has changed from latin1_swedish_ci to utf8mb4_0900_ai_ci.
   > ```
   >
   > 解决: 将MySQL驱动的版本由原本的 5.1.3 改为 5.1.44

   ```xml
       <dependencies>
           <!-- Mybatis核心 -->
           <dependency>
               <groupId>org.mybatis</groupId>
               <artifactId>mybatis</artifactId>
               <version>3.5.7</version>
           </dependency>
   
           <!-- junit测试 -->
           <dependency>
               <groupId>junit</groupId>
               <artifactId>junit</artifactId>
               <version>4.12</version>
               <scope>test</scope>
           </dependency>
   
           <!-- MySQL驱动 -->
           <dependency>
               <groupId>mysql</groupId>
               <artifactId>mysql-connector-java</artifactId>
               <version>5.1.44</version>
           </dependency>
       </dependencies>
   ```

3. 创建MyBatis的核心配置文件

   > 习惯上命名为mybatis-config.xml，这个文件名仅仅只是建议，并非强制要求。
   >
   > 整合Spring 之后，这个配置文件可以省略
   >
   > 核心配置文件主要用于配置连接数据库的环境以及MyBatis的全局配置信息
   >
   > 核心配置文件存放的位置是src/main/resources目录下

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE configuration
           PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
           "http://mybatis.org/dtd/mybatis-3-config.dtd">
   <configuration>
       <!--设置连接数据库的环境-->
       <environments default="development">
           <environment id="development">
               <transactionManager type="JDBC"/>
               <dataSource type="POOLED">
                   <property name="driver" value="com.mysql.jdbc.Driver"/>
                   <property name="url"
                             value="jdbc:mysql://localhost:3306/MyBatis"/>
                   <property name="username" value="root"/>
                   <property name="password" value="123456"/>
               </dataSource>
           </environment>
       </environments>
       <!--引入映射文件-->
       <mappers>
           <mapper resource="mappers/UserMapper.xml"/>
       </mappers>
   </configuration>
   ```

4. 创建mapper接口 / 类

   > MyBatis中的mapper接口相当于以前的dao。但是区别在于，mapper仅仅是接口，我们不需要 提供实现类。

   其中 UserMapper.java 文件:

   ```java
   package com.atguigu.mybatis.mapper;
   
   public interface UserMapper {
       int insertUser();
   }
   ```

   其中 User.java 文件:

   ```java
   package com.atguigu.mybatis.pojo;
   
   public class User {
       private Integer id;
   
       private String username;
   
       private String password;
   
       private Integer age;
   
       private String sex;
   
       private String email;
   
       public User(Integer id, String username, String password, Integer age, String sex, String email) {
           this.id = id;
           this.username = username;
           this.password = password;
           this.age = age;
           this.sex = sex;
           this.email = email;
       }
   
       public Integer getId() {
           return id;
       }
   
       public void setId(Integer id) {
           this.id = id;
       }
   
       public String getUsername() {
           return username;
       }
   
       public void setUsername(String username) {
           this.username = username;
       }
   
       public String getPassword() {
           return password;
       }
   
       public void setPassword(String password) {
           this.password = password;
       }
   
       public Integer getAge() {
           return age;
       }
   
       public void setAge(Integer age) {
           this.age = age;
       }
   
       public String getSex() {
           return sex;
       }
   
       public void setSex(String sex) {
           this.sex = sex;
       }
   
       public String getEmail() {
           return email;
       }
   
       public void setEmail(String email) {
           this.email = email;
       }
   
       @Override
       public String toString() {
           return "User{" +
                   "id=" + id +
                   ", username='" + username + '\'' +
                   ", password='" + password + '\'' +
                   ", age=" + age +
                   ", sex='" + sex + '\'' +
                   ", email='" + email + '\'' +
                   '}';
       }
   }
   ```

   其中 UserMapper.xml 文件:

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE mapper
           PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
           "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
   <!--
   MyBatis面向接口编程的两个一致:
       1. 映射文件的namespace要和mapper接口的全类名一致
       2. 映射文件中SQL语句的id要和mapper接口中的方法名一致
   -->
   <mapper namespace="com.atguigu.mybatis.mapper.UserMapper">
       <!--函数名: int insertUser();-->
       <insert id="inserUser">
           insert into t_user
           values (null, 'admin', '123456', 23, '男', '12345@qq.com')
       </insert>
   </mapper>
   ```



目录如下:

   ```xml
   MyBatisCode
   │  MyBatisCode.iml
   │          
   └─MyBatis_demo1
       │  MyBatis_demo1.iml
       │  pom.xml
       │  
       └─src
           ├─main
           │  ├─java
           │  │  └─com
           │  │      └─atguigu
           │  │          └─mybatis
           │  │              ├─mapper
           │  │              │      UserMapper.java
           │  │              │      
           │  │              └─pojo
           │  │                      User.java
           │  │                      
           │  └─resources
           │      │  mybatis-config.xml
           │      │  
           │      └─mappers
           │              UserMapper.xml
           │              
           └─test
               └─java
   ```

5. 创建MyBatis的映射文件

   相关概念：ORM（Object Relationship Mapping）对象关系映射。

    - 对象：Java的实体类对象
    - 关系：关系型数据库
    - 映射：二者之间的对应关系

   | Java概念 | 数据库概念 |
      | :------: | :--------: |
   |    类    |     表     |
   |   属性   |  字段/列   |
   |   对象   |  记录/行   |

   > 1. 映射文件的命名规则：
        >
        >    表所对应的实体类的类名+Mapper.xml
        >
        >    例如：表t_user，映射的实体类为User，所对应的映射文件为UserMapper.xml
        >
        >    因此一个映射文件对应一个实体类，对应一张表的操作
        >
        >    MyBatis映射文件用于编写SQL，访问以及操作表中的数据
        >
        >    MyBatis映射文件存放的位置是src/main/resources/mappers目录下
   >
   > 2. MyBatis中可以面向接口操作数据，要保证两个一致：
        >
        >    - mapper接口的全类名和映射文件的命名空间（namespace）保持一致
   >    - mapper接口中方法的方法名和映射文件中编写SQL的标签的id属性保持一致

6. 通过junit测试功能

   ```java
   //读取MyBatis的核心配置文件
   InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
   
   //创建SqlSessionFactoryBuilder对象
   SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
   
   //通过核心配置文件所对应的字节输入流创建工厂类SqlSessionFactory，生产SqlSession对象
   SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
   
   //创建SqlSession对象，此时通过SqlSession对象所操作的sql都必须手动提交或回滚事务
   //SqlSession sqlSession = sqlSessionFactory.openSession();
   //创建SqlSession对象，此时通过SqlSession对象所操作的sql都会自动提交
   SqlSession sqlSession = sqlSessionFactory.openSession(true);
   
   //通过代理模式创建UserMapper接口的代理实现类对象
   UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
   
   //调用UserMapper接口中的方法，就可以根据UserMapper的全类名匹配元素文件，通过调用的方法名匹配映射文件中的SQL标签，并执行标签中的SQL语句
   int result = userMapper.insertUser();
   
   //sqlSession.commit();
   ```

7. 加入log4j日志功能

    - 加入依赖

      ```xml
      <!-- log4j日志 -->
      <dependency>
          <groupId>log4j</groupId>
          <artifactId>log4j</artifactId>
          <version>1.2.17</version>
      </dependency>
      ```

    - 加入log4j的配置文件

      > log4j的配置文件名为log4j.xml，存放的位置是src/main/resources目录下

      ```xml
      <?xml version="1.0" encoding="UTF-8" ?>
      <!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
      <log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/">
          <appender name="STDOUT" class="org.apache.log4j.ConsoleAppender">
              <param name="Encoding" value="UTF-8"/>
              <layout class="org.apache.log4j.PatternLayout">
                  <param name="ConversionPattern" value="%-5p %d{MM-dd HH:mm:ss,SSS}
      %m (%F:%L) \n"/>
              </layout>
          </appender>
          <!--  logger name: 日志输出的范围, java.sql  -->
          <logger name="java.sql">
              <level value="debug"/>
          </logger>
          <!--  mybatis中的日志  -->
          <logger name="org.apache.ibatis">
              <!--  日志输出的级别  -->
              <level value="info"/>
          </logger>
          <root>
              <level value="debug"/>
              <appender-ref ref="STDOUT"/>
          </root>
      </log4j:configuration>
      ```

      > ## 日志的级别
      >
      > FATAL(致命)>ERROR(错误)>WARN(警告)>INFO(信息)>DEBUG(调试)
      >
      > 从左到右打印的内容越来越详细

## MyBatis的增删改查

1. UserMapper.java 文件

   ```java
   package com.atguigu.mybatis.mapper;
   
   import com.atguigu.mybatis.pojo.User;
   
   import java.util.List;
   
   public interface UserMapper {
       /**
        * MyBatis面向接口编程的两个一致:
        *     1. 映射文件的namespace要和mapper接口的全类名一致
        *     2. 映射文件中SQL语句的id要和mapper接口中的方法名一致
        */
   
       /**
        * 添加用户
        */
       int insertUser();
   
       /**
        * 修改用户
        */
       void updateUser();
   
       /**
        * 删除用户
        */
       void deleteUser();
   
       /**
        * 根据id查询一个用户
        */
       User getUserById();
   
       /**
        * 查询一个集合
        */
       List<User> getUserList();
   }
   ```

2. UserMapper.xml 文件

   ```xml
   <?xml version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE mapper
           PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
           "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
   <!--
   MyBatis面向接口编程的两个一致:
       1. 映射文件的namespace要和mapper接口的全类名一致
       2. 映射文件中SQL语句的id要和mapper接口中的方法名一致
   -->
   <mapper namespace="com.atguigu.mybatis.mapper.UserMapper">
       <!--函数名: int insertUser();-->
       <insert id="insertUser">
           insert into t_user
           values (null, 'admin', '123456', 23, '男', '12345@qq.com')
       </insert>
   
       <!--void updateUser();-->
       <update id="updateUser">
           update t_user
           set username = '张三'
           where id = 18
       </update>
   
       <!--void deleteUser();-->
       <delete id="deleteUser">
           delete
           from t_user
           where id = 19
       </delete>
   
       <!--User getUserById();-->
       <select id="getUserById" resultType="com.atguigu.mybatis.pojo.User">
           select *
           from t_user
           where id = 18
       </select>
   
       <!--List<User> getUserList();-->
       <select id="getUserList" resultType="com.atguigu.mybatis.pojo.User">
           select *
           from t_user
       </select>
   
   </mapper>
   ```

3. 测试文件 myBatisTest.java

   ```java
   package com.atguigu.mybatis.test;
   
   import com.atguigu.mybatis.mapper.UserMapper;
   import com.atguigu.mybatis.pojo.User;
   import com.sun.xml.internal.ws.client.sei.ResponseBuilder;
   import org.apache.ibatis.io.Resources;
   import org.apache.ibatis.session.SqlSession;
   import org.apache.ibatis.session.SqlSessionFactory;
   import org.apache.ibatis.session.SqlSessionFactoryBuilder;
   import org.junit.Test;
   
   import java.io.IOException;
   import java.io.InputStream;
   import java.util.List;
   
   public class MyBatisTest {
       @Test
       public void testMyBatis() throws IOException {
           // 读取MyBatis的核心配置文件
           InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
           // 创建SqlSessionFactoryBuilder对象
           SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
           // 通过核心配置文件所对应的字节输入流创建工厂类SqlSessionFactory，生产SqlSession对象
           SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
           // 创建SqlSession对象，此时通过SqlSession对象所操作的sql都必须手动提交或回滚事务
           // SqlSession sqlSession = sqlSessionFactory.openSession();
           // 创建SqlSession对象，此时通过SqlSession对象所操作的sql都会自动提交
           SqlSession sqlSession = sqlSessionFactory.openSession(true);
           // 通过代理模式创建UserMapper接口的代理实现类对象
           UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
           // 调用UserMapper接口中的方法，就可以根据UserMapper的全类名匹配元素文件，通过调用的方法名匹配映射文件中的SQL标签，并执行标签中的SQL语句
           int result = userMapper.insertUser();
           //sqlSession.commit();
       }
   
       @Test
       public void updateCRUD() throws IOException {
           InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
           SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
           SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
           SqlSession sqlSession = sqlSessionFactory.openSession(true);
           UserMapper mapper = sqlSession.getMapper(UserMapper.class);
           // mapper.updateUser();
           mapper.deleteUser();
       }
       @Test
       public void selectById() throws IOException {
           InputStream is = Resources.getResourceAsStream("mybatis-config.xml" );
           SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
           SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
           SqlSession sqlSession = sqlSessionFactory.openSession(true);
           UserMapper mapper = sqlSession.getMapper(UserMapper.class);
           User user = mapper.getUserById();
           System.out.println(user);
       }
       @Test
       public void getUserList() throws IOException {
           InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
           SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
           SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
           SqlSession sqlSession = sqlSessionFactory.openSession(true);
           UserMapper mapper = sqlSession.getMapper(UserMapper.class);
           List<User> userList = mapper.getUserList();
           userList.forEach(item -> System.out.println(item));
       }
   }
   ```

## 核心配置文件

核心配置文件中的标签必须按照固定的顺序：

1. properties
2. settings
3. typeAliases
4. typeHandlers
5. objectFactory
6. objectWrapperFactory
7. reflectorFactory
8. plugins
9. environments
10. databaseIdProvider
11. mappers

文件 mybatis-config.xml 内容:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--
        MyBatis核心配置文件中，标签的顺序：
        properties?,settings?,typeAliases?,typeHandlers?,
        objectFactory?,objectWrapperFactory?,reflectorFactory?,
        plugins?,environments?,databaseIdProvider?,mappers?
    -->

    <!--引入properties文件-->
    <properties resource="jdbc.properties" />

    <!--设置别名-->
    <typeAliases>
        <!--
            typeAlias：设置某个类型的别名
            属性：
                type：设置需要设置别名的类型
                alias：设置某个类型的别名，若不设置该属性，那么该类型拥有默认的别名，即类名且不区分大小写
        -->
        <!--<typeAlias type="com.atguigu.mybatis.pojo.User" alias="user"></typeAlias>-->

        <!--以包为单位，将包下所有的类型设置默认的类型别名，即类名且不区分大小写-->
        <package name="com.atguigu.mybatis.pojo"/>
    </typeAliases>

    <!--
        environments：配置多个连接数据库的环境
        属性：
            default：设置默认使用的环境的id
    -->
    <environments default="development">

        <environment id="development">

            <!--
                environment：配置某个具体的环境
                属性：
                    id：表示连接数据库的环境的唯一标识，不能重复
            -->
            <transactionManager type="JDBC"/>
            <!--
                transactionManager：设置事务管理方式
                属性：
                    type="JDBC|MANAGED"
                    JDBC：表示当前环境中，执行SQL时，使用的是JDBC中原生的事务管理方式，事务的提交或回滚需要手动处理
                    MANAGED：被管理，例如Spring
            -->

            <dataSource type="POOLED">
                <!--
                    dataSource：配置数据源
                    属性：
                        type：设置数据源的类型
                        type="POOLED|UNPOOLED|JNDI"
                        POOLED：表示使用数据库连接池缓存数据库连接
                        UNPOOLED：表示不使用数据库连接池
                        JNDI：表示使用上下文中的数据源
                -->
                <!--设置连接数据库的驱动-->
                <property name="driver" value="${jdbc.driver}"/>
                <!--设置连接数据库的连接地址-->
                <property name="url" value="${jdbc.url}"/>
                <!--设置连接数据库的用户名-->
                <property name="username" value="${jdbc.username}"/>
                <!--设置连接数据库的密码-->
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>

        <environment id="test">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>

    </environments>
    <!--引入映射文件-->
    <mappers>
        <!--<mapper resource="mappers/UserMapper.xml"/>-->
        <!--
            以包为单位引入映射文件
            要求：
            1、mapper接口所在的包要和映射文件所在的包一致
            2、mapper接口要和映射文件的名字一致
        -->
        <package name="com.atguigu.mybatis.mapper"/>
    </mappers>
</configuration>
```

## Mybatis获取参数值的两种方式(重点)

> 封装SqlSessionUtils工具类
>
> ```java
> package com.atguigu.mybatis.utils;
> 
> import org.apache.ibatis.io.Resources;
> import org.apache.ibatis.session.SqlSession;
> import org.apache.ibatis.session.SqlSessionFactory;
> import org.apache.ibatis.session.SqlSessionFactoryBuilder;
> 
> import java.io.IOException;
> import java.io.InputStream;
> 
> public class SqlSessionUtils {
>     static public SqlSession getSqlSession(){
>         SqlSession sqlSession = null;
>         try {
>             InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
>             SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
>             SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
>             sqlSession = sqlSessionFactory.openSession(true);
> 
>         } catch (IOException e) {
>             e.printStackTrace();
>         }
>         return sqlSession;
>     }
> }
> ```
>
> 

MyBatis获取参数值的两种方式：${} 和 #{}

${} 的本质就是字符串拼接，#{} 的本质就是占位符赋值

${}使用字符串拼接的方式拼接sql，若为字符串类型或日期类型的字段进行赋值时，需要手动加单引号

#{}使用占位符赋值的方式拼接sql，此时为字符串类型或日期类型的字段进行赋值时，可以自动添加单引号

### 单个字面量类型的参数

若mapper接口中的方法参数为单个的字面量类型 此时可以使用 ${} 和 #{} 以任意的名称获取参数的值，注意 ${} 需要手动加单引号

ParameterMapper.java:

```java
package com.atguigu.mybatis.mapper;

import com.atguigu.mybatis.pojo.User;

import java.util.List;

public interface ParameterMapper {

    /**
     * 根据名称查询员工信息
     */
    User getUserByUsername(String username);
}
```

ParaMeterMapper.xml:

```xml
<mapper namespace="com.atguigu.mybatis.mapper.ParameterMapper">
    <!--User getUserByUsername(String username);-->
    <select id="getUserByUsername" resultType="user">
        <!-- select * from t_user where username = #{username} -->
        select * from t_user where username = '${username}'
    </select>
</mapper>
```

ParameterMapperTest.java:

```java
package com.atguigu.mybatis.test;

import com.atguigu.mybatis.mapper.ParameterMapper;
import com.atguigu.mybatis.pojo.User;
import com.atguigu.mybatis.utils.SqlSessionUtils;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import java.util.List;

public class ParameterMapperTest {
    @Test
    public void checkLogin(){
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        ParameterMapper mapper = sqlSession.getMapper(ParameterMapper.class);
        User user = mapper.checkLogin("admin", "123456");
        System.out.println(user);
    }
}
```

### 多个字面量类型的参数

若mapper接口中的方法参数为多个时

此时MyBatis会自动将这些参数放在一个 map 集合中:

- 以 arg0,arg1... 为键，以参数为值；

- 以 param1,param2...为键，以参数为值；

因此只需要通过 ${} 和 #{} 访问map集合的键就可以获取相对应的值，注意 ${} 需要手动加单引号

ParameterMapper.java:

```java
package com.atguigu.mybatis.mapper;

import com.atguigu.mybatis.pojo.User;

import java.util.List;

public interface ParameterMapper {
    
    /**
     * 检查登录参数
     */
    User checkLogin(String username,String password);
}
```

ParaMeterMapper.xml:

```xml
<mapper namespace="com.atguigu.mybatis.mapper.ParameterMapper">
    <!--User checkLogin(String username,String password);-->
    <select id="checkLogin" resultType="User">
        select * from t_user where username = #{arg0} and password = #{arg1}
    </select>    
</mapper>
```

ParameterMapperTest.java:

```java
package com.atguigu.mybatis.test;

import com.atguigu.mybatis.mapper.ParameterMapper;
import com.atguigu.mybatis.pojo.User;
import com.atguigu.mybatis.utils.SqlSessionUtils;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import java.util.List;

public class ParameterMapperTest {
    @Test
    public void checkLogin(){
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        ParameterMapper mapper = sqlSession.getMapper(ParameterMapper.class);
        System.out.println(mapper.checkLogin("admin","123456"));
    }
}


```

### map 集合类型的参数

若mapper接口中的方法需要的参数为多个时，此时可以手动创建map集合，将这些数据放在map中 只需要通过${}和#{}访问map集合的键就可以获取相对应的值，注意 ${} 需要手动加单引号

ParameterMapper.java:

```java
package com.atguigu.mybatis.mapper;

import com.atguigu.mybatis.pojo.User;

import java.util.List;
import java.util.Map;

public interface ParameterMapper {

    /**
     * 检查登录(Map)
     */
    User checkLoginByMap(Map<String,Object> map);
}
```

ParaMeterMapper.xml:

```xml
<mapper namespace="com.atguigu.mybatis.mapper.ParameterMapper">
    <!--User checkLoginByMap(Map<String,Object> map);-->
    <select id="checkLoginByMap" resultType="User">
        select * from t_user where username = #{username} and password = #{password}
    </select>
</mapper>
```

ParameterMapperTest.java:

```java
package com.atguigu.mybatis.test;

import com.atguigu.mybatis.mapper.ParameterMapper;
import com.atguigu.mybatis.pojo.User;
import com.atguigu.mybatis.utils.SqlSessionUtils;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ParameterMapperTest {

    @Test
    public void checkLoginByMap(){
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        ParameterMapper mapper = sqlSession.getMapper(ParameterMapper.class);
        Map<String,Object> map = new HashMap<>();
        map.put("username","admin");
        map.put("password","123456");
        User user = mapper.checkLoginByMap(map);
        System.out.println(user);
    }
}
```

### 实体类类型的参数

若mapper接口中的方法参数为实体类对象时 此时可以使用 ${} 和 #{} ，通过访问实体类对象中的属性名获取属性值，注意 ${} 需要手动加单引号

ParameterMapper.java:

```java
public interface ParameterMapper {

    /**
     * 插入用户
     */
    int insertUser(User user);
}
```

ParaMeterMapper.xml:

```xml
<!--int insertUser(User user);-->
<insert id="insertUser">
    insert into t_user values (null,#{username},#{password},#{age},#{sex},#{email})
</insert>
```

ParameterMapperTest.java:

```java
@Test
public void insertUserTest(){
    SqlSession sqlSession = SqlSessionUtils.getSqlSession();
    ParameterMapper mapper = sqlSession.getMapper(ParameterMapper.class);
    int result = mapper.insertUser(new User(null, "张三", "123", 20, "男", "1232@qq.com"));
    System.out.println(result);
}
```

### 使用 @Param 标识参数

可以通过 @Param 注解标识mapper接口中的方法参数 

此时，会将这些参数放在map集合中，以 @Param 注解的value属性值为键，以参数为值；

以 param1,param2...为键，以参数为值；

只需要通过 ${} 和 #{} 访问map集合的键就可以获取相对应的值， 注意${}需要手动加单引号

ParameterMapper.java:

```java
public interface ParameterMapper {

    /**
     * 检查登录(Param)
     */
    User checkLoginByParam(@Param("username") String username, @Param("password") String password);
}
```

ParaMeterMapper.xml:

```xml
<!--User checkLoginByParam(@Param("username") String username, @Param("password") String password);-->
<select id="checkLoginByParam" resultType="User">
    select *
    from t_user
    where username = #{username}
    and password = #{password}
</select>
```

ParameterMapperTest.java:

```java
@Test
public void CheckLoginByParamTest() {
    SqlSession sqlSession = SqlSessionUtils.getSqlSession();
    ParameterMapper mapper = sqlSession.getMapper(ParameterMapper.class);
    User user = mapper.checkLoginByParam("张三", "123");
    System.out.println(user);
}
```

## MyBatis的各种查询功能

1. 若查询出的数据只有一条:
   - 可以通过实体类对象接收
   - 可以通过list集合来接收
   - 可以通过map集合来接收 (一般来说, 键为 String, 值为 Object)
2. 若查询出的数据有多条
   - 可以通过list集合接收
   - 可以通过map类型的list集合接收 (一般来说, 键为 String, 值为 Object)
   - 可以在mapper接口的方法上添加@MapKey注解,此时就可以将每条数据转换的map集合作为值,以某个字段的值作为键,放在同一个map集合中
   - **注意:**一定不能通过实体类对象去接收, 此时会抛异常 TooManyResultsException

### 查询一个实体类对象

#### 只有一条数据

SelectMapper.java

```java
List<User> getUserById(@Param("id")Integer id);
```

SelectMapper.xml

```xml
<!--User selectUserById(@Param("id")Integer id);-->
<select id="getUserById" resultType="user">
    select * from t_user where id = #{id}
</select>
```

SelectMapperTest.java

```java
@Test
public void testGetUserById(){
    SqlSession sqlSession = SqlSessionUtils.getSqlSession();
    SelectMapper mapper = sqlSession.getMapper(SelectMapper.class);
    List<User> user = mapper.getUserById(18);
    System.out.println(user);
}
```

#### 有多条数据

SelectMapper.java

```java
@Test
public void testGetAllUser(){
    SqlSession sqlSession = SqlSessionUtils.getSqlSession();
    SelectMapper mapper = sqlSession.getMapper(SelectMapper.class);
    List<User> allUser = mapper.getAllUser();
    System.out.println(allUser);
}
```

SelectMapper.xml'

```xml
<!--List<User> getAllUser();-->
<select id="getAllUser" resultType="User">
    select * from t_user
</select>
```

SelectMapperTest.java

```java
@Test
public void testGetAllUser(){
    SqlSession sqlSession = SqlSessionUtils.getSqlSession();
    SelectMapper mapper = sqlSession.getMapper(SelectMapper.class);
    List<User> allUser = mapper.getAllUser();
    System.out.println(allUser);
}
```

### 单行单列的数据(分组函数/聚合函数)

```java
/**
 * 查询用户的总记录数
 * @return
 * 在MyBatis中，对于Java中常用的类型都设置了类型别名
 * 例如：java.lang.Integer-->int|integer
 * 例如：int-->_int|_integer
 * 例如：Map-->map,List-->list
 */
int getCount();
```

```xml
<!--int getCount();-->
<select id="getCount" resultType="_integer">
	select count(id) from t_user
</select>
```

### 查询一条数据为map集合

```java
/**
 * 根据用户id查询用户信息为map集合
 * @param id
 * @return
 */
Map<String, Object> getUserToMap(@Param("id") int id);
```

```xml
<!--Map<String, Object> getUserToMap(@Param("id") int id);-->
<select id="getUserToMap" resultType="map">
	select * from t_user where id = #{id}
</select>
<!--结果：{password=123456, sex=男, id=18, age=23, email=12345@qq.com, username=张三}-->
```

### 查询多条数据为map集合

#### 方式一

```java
/**
 * 查询所有用户信息为map集合
 * @return
 * 将表中的数据以map集合的方式查询，一条数据对应一个map；若有多条数据，就会产生多个map集合，此时可以将这些map放在一个list集合中获取
 */
List<Map<String, Object>> getAllUserToMap();
```

```xml
<!--Map<String, Object> getAllUserToMap();-->
<select id="getAllUserToMap" resultType="map">
	select * from t_user
</select>
```

#### 方式二

```java
/**
 * 查询所有用户信息为map集合
 * @return
 * 将表中的数据以map集合的方式查询，一条数据对应一个map；若有多条数据，就会产生多个map集合，并且最终要以一个map的方式返回数据，此时需要通过@MapKey注解设置map集合的键，值是每条数据所对应的map集合
 */
@MapKey("id")
Map<String, Object> getAllUserToMap();
```

```xml
<!--Map<String, Object> getAllUserToMap();-->
<select id="getAllUserToMap" resultType="map">
	select * from t_user
</select>
结果：
<!--
{
    1={password=123456, sex=男, id=1, age=23, username=admin},
    2={password=123456, sex=男, id=2, age=23, username=张三},
    3={password=123456, sex=男, id=3, age=23, username=张三}
}
-->
```

## 特殊SQL的执行

### 模糊查询

```java
/**
 * 模糊查询
 */
List<User> getUserByLike(@Param("username") String username);
```

```xml
<!--List<User> getUserByLike(@Param("username") String username);-->
<select id="getUserByLike" resultType="user">
    <!--  方式一: 使用${}  -->
    <!--select * from t_user where username like '%${username}%'-->
    <!--  方式二: 使用concat拼接  -->
    <!--select * from t_user where username like concat('%',#{username},'%')-->
    <!--  方式三: 使用 "%"  -->
    select * from t_user where username like "%"#{username}"%"
</select>
```

### 批量删除

```java
/**
 * 批量删除
 */
int deleteMore (@Param("ids") String ids);
```

```xml
<!--int deleteMore (@Param("ids") String ids);-->
<delete id="deleteMore">
    delete from t_user where id in (${ids})
</delete>
```

### 动态设置表名

```java
/**
 * 通过表名获取用户
 */
List<User> getUserByTablename(@Param("tablename") String tableName);
```

```xml
<!--List<User> getUserByTableName(@Param("tableName") String tableName);-->
<select id="getUserByTablename" resultType="User">
    select * from ${tablename}
</select>
```

### 添加功能获取自增的主键

介绍:

- 两张表:
  - t_clazz(clazz_id,clazz_name)
  - t_student(student_id,student_name,clazz_id) 
- 需求:
  1. 添加班级信息
  2. 获取新添加的班级的id 
  3. 为班级分配学生，即将某学的班级id修改为新添加的班级的id

```java
/**
* 添加用户信息
* @param user
* @return
* useGeneratedKeys：设置使用自增的主键
* keyProperty：因为增删改有统一的返回值是受影响的行数，因此只能将获取的自增的主键放在传输的参数user对象的某个属性中
*/
int insertUser(User user);
```

```xml
<!--int insertUser(User user);-->
<insert id="insertUser" useGeneratedKeys="true" keyProperty="id">
	insert into t_user values(null,#{username},#{password},#{age},#{sex})
</insert>
```

> 注意:
>
> 1. 可以通过 #{} 来直接访问属性的值
> 2. 增删改查的返回值一定是int, 即为受影响的行数

## 自定义映射resultMap

### resultMap处理字段和属性的映射关系

若字段名和实体类中的属性名不一致，则可以通过resultMap设置自定义映射

若字段名和实体类中的属性名不一致，但是字段名符合数据库的规则（使用_），实体类中的属性 名符合Java的规则（使用驼峰） 

此时也可通过以下两种方式处理字段名和实体类中的属性的映射关系 

1. 可以通过为字段起别名的方式，保证和实体类中的属性名保持一致

   emp_name 为字段, empName 为属性

   ```xml
   <!--List<Emp> getAllEmp();-->
   <select id="getAllEmp" resultType="Emp">
       select eid,emp_name empName,age,sex,email from t_emp
   </select>
   ```

2. 可以在MyBatis的核心配置文件中设置一个全局配置信息mapUnderscoreToCamelCase，可以在查询表中数据时，自动将_类型的字段名转换为驼峰

   例如：字段名user_name，设置了mapUnderscoreToCamelCase，此时字段名就会转换为 userName

   ```xml
   <!--设置MyBatis的全局配置-->
   <settings>
       <!--将_自动映射为驼峰, emp_name:empName-->
       <setting name="mapUnderscoreToCamelCase" value="true"/>
   </settings>
   ```

3. 通过resultMap设置自定义的映射关系

   ```xml
   <!--
   	resultMap：设置自定义映射
   	属性：
   	id：表示自定义映射的唯一标识
   	type：查询的数据要映射的实体类的类型
   	子标签：
   	id：设置主键的映射关系
   	result：设置普通字段的映射关系
   	association：设置多对一的映射关系
   	collection：设置一对多的映射关系
   	属性：
   	property：设置映射关系中实体类中的属性名
   	column：设置映射关系中表中的字段名
   -->
   <resultMap id="empResultMap" type="Emp">
       <id property="eid" column="eid"></id>
       <result property="emp_name" column="empName"></result>
       <result property="age" column="age"></result>
       <result property="sex" column="sex"></result>
       <result property="email" column="email"></result>
   </resultMap>
   <!--List<Emp> getAllEmp();-->
   <select id="getAllEmp" resultMap="empResultMap">
       select * from t_emp
   </select>
   ```

### 多对一映射处理

> 查询员工信息以及员工所对应的部门信息

多对一:设置 一 的部门对象

```java
public class Emp {
	....
    private Dept dept;
}
```

一对多:这是 多 的员工集合

```java
public class Dept {
    ....
    private List<Emp> emps;
}
```



> 对 一 : 对应对象
>
> 对 多 : 对应集合

#### 级联方式处理映射关系

EmpMapper.java

```java
public interface EmpMapper {
    /**
     * 查询员工以及员工对应的部门信息
     */
    Emp getEmpAndDeptOne(@Param("eid") Integer eid);
}
```

EmpMapper.xml

```xml
<!--处理多对一映射关系方式一：级联属性赋值-->
<resultMap id="empAndDeptResultMapOne" type="Emp">
    <id property="eid" column="eid"></id>
    <result property="emp_name" column="empName"></result>
    <result property="age" column="age"></result>
    <result property="sex" column="sex"></result>
    <result property="email" column="email"></result>
    <!--这里的dept.did是上面 Dept dept 对象的属性-->
    <result property="dept.did" column="did"></result>
    <result property="dept.deptName" column="dept_name"></result>
</resultMap>

<!--Emp getEmpAndDept(@Param("eid") Integer eid);-->
<select id="getEmpAndDeptOne" resultMap="empAndDeptResultMapOne">
    select *
    from t_emp
    left join t_dept on t_emp.did = t_dept.did
    where t_emp.eid = #{eid}
</select>
```

TestEmpMapper.java

```java
public class TestEmpMapper {
    @Test
    public void testGetEmpAndDept(){
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);
        Emp emp = mapper.getEmpAndDeptOne(1);
        System.out.println(emp);
    }
}
```

#### 使用association处理映射关系

EmpMapper.xml

```xml
<!--处理多对一映射关系方式二：association-->
<resultMap id="empAndDeptResultMapTwo" type="Emp">
    <id property="eid" column="eid"></id>
    <result property="empName" column="emp_name"></result>
    <result property="age" column="age"></result>
    <result property="sex" column="sex"></result>
    <result property="email" column="email"></result>
    <!--
            association:处理多对一的映射关系
            property:需要处理多对的映射关系的属性名
            javaType:该属性的类型
        -->
    <association property="dept" javaType="Dept">
        <id property="did" column="did"></id>
        <result property="deptName" column="dept_name"></result>
    </association>
</resultMap>

<!--Emp getEmpAndDeptTwo(@Param("eid") Integer eid);-->
<select id="getEmpAndDeptTwo" resultMap="empAndDeptResultMapTwo">
    select *
    from t_emp
    left join t_dept on t_emp.did = t_dept.did
    where eid = #{eid}
</select>
```

#### 分步查询(常用)

> 分步查询的优点：可以实现延迟加载，但是必须在核心配置文件中设置全局配置信息:
>
> lazyLoadingEnabled：延迟加载的全局开关。当开启时，所有关联对象都会延迟加载
>
> aggressiveLazyLoading：当开启时，任何方法的调用都会加载该对象的所有属性。否则，每个属性会按需加载
>
> 此时就可以实现按需加载，获取的数据是什么，就只会执行相应的sql。
>
> 此时可通过association和 collection中的fetchType属性设置当前的分步查询是否使用延迟加载，fetchType="lazy(延迟加 载)|eager(立即加载)"
>
> ```xml
> <!--
> 	select:设置分步查询的sql的唯一标识（namespace.SQLId或mapper接口的全类名.方法名）
> 	column:设置分布查询的条件
> 	fetchType:当开启了全局的延迟加载之后，可通过此属性手动控制延迟加载的效果
> 	fetchType="lazy|eager":lazy表示延迟加载，eager表示立即加载
> -->
> <association 
> 	property="dept"
> 	select="com.atguigu.mybatis.mapper.DeptMapper.getEmpAndDeptByStepTwo"
> 	column="did"
> 	fetchType="eager">
> </association>
> ```

查询员工以及员工对应的部门:先查员工 -> 再查员工对应的部门信息

1. 查询员工信息

   ```xml
   <resultMap id="empDeptStepMap" type="Emp">
       <id column="eid" property="eid"></id>
       <result column="ename" property="ename"></result>
       <result column="age" property="age"></result>
       <result column="sex" property="sex"></result>
       <!--
           select：设置分步查询，查询某个属性的值的sql的标识（namespace.sqlId）
           column：将sql以及查询结果中的某个字段设置为分步查询的条件
       -->
       <association property="dept"
                    select="com.atguigu.MyBatis.mapper.DeptMapper.getEmpDeptByStep"
                    column="did">
       </association>
   </resultMap>
   
   <!--Emp getEmpByStep(@Param("eid") int eid);-->
   <select id="getEmpByStep" resultMap="empDeptStepMap">
       select *
       from t_emp
       where eid = #{eid}
   </select>
   ```

2. 根据员工所对应的部门id查询部门信息

   DeptMapper.java

   ```java
   /**
    * 分步查询的第二步：根据员工所对应的did查询部门信息
    * @param did
    * @return
    */
   Dept getEmpDeptByStep(@Param("did") int did);
   ```

   EmpMapper.xml

   ```xml
   <!--Dept getEmpDeptByStep(@Param("did") int did);-->
   <select id="getEmpDeptByStep" resultType="Dept">
   	select * from t_dept where did = #{did}
   </select>
   ```

### 一对多映射处理

#### collection

DeptMapper.xml

```xml
<resultMap id="deptAndEmpResultMap" type="Dept">
    <id property="did" column="did"></id>
    <result property="deptName" column="dept_name"></result>
    <!--
        collon：处理一对多的映射关系
        ofType：表示该属性所对应的集合中存储数据的类型
    -->
    <collection property="emps" ofType="Emp">
        <id property="eid" column="eid"></id>
        <result property="empName" column="emp_name"></result>
        <result property="age" column="age"></result>
        <result property="sex" column="sex"></result>
        <result property="email" column="email"></result>
    </collection>
</resultMap>
<!--Dept getDeptAndEmp(@Param("did") Integer did);-->
<select id="getDeptAndEmp" resultMap="deptAndEmpResultMap">
    select * from t_dept left join t_emp on t_dept.did = t_emp.did where t_dept.did = #{did}
</select>
```

#### 分步

> 分步查询的优点：可以实现延迟加载，但是必须在核心配置文件中设置全局配置信息:
>
> lazyLoadingEnabled：延迟加载的全局开关。当开启时，所有关联对象都会延迟加载
>
> aggressiveLazyLoading：当开启时，任何方法的调用都会加载该对象的所有属性。否则，每个属性会按需加载
>
> 此时就可以实现按需加载，获取的数据是什么，就只会执行相应的sql。
>
> 此时可通过association和 collection中的fetchType属性设置当前的分步查询是否使用延迟加载，fetchType="lazy(延迟加 载)|eager(立即加载)"
>
> ```xml
> <!--
> 	select:设置分步查询的sql的唯一标识（namespace.SQLId或mapper接口的全类名.方法名）
> 	column:设置分布查询的条件
> 	fetchType:当开启了全局的延迟加载之后，可通过此属性手动控制延迟加载的效果
> 	fetchType="lazy|eager":lazy表示延迟加载，eager表示立即加载
> -->
> <association 
> 	property="dept"
> 	select="com.atguigu.mybatis.mapper.DeptMapper.getEmpAndDeptByStepTwo"
> 	column="did"
> 	fetchType="eager">
> </association>
> ```

1. 查询部门信息

   ```java
   /**
    * 分步查询部门和部门中的员工
    * @param did
    * @return
    */
   Dept getDeptByStep(@Param("did") int did); 
   ```

   ```xml
   <resultMap id="deptEmpStep" type="Dept">
   	<id property="did" column="did"></id>
   	<result property="dname" column="dname"></result>
   	<collection property="emps" 
                   fetchType="eager"
   				select="com.atguigu.MyBatis.mapper.EmpMapper.getEmpListByDid"
                   column="did">
   	</collection>
   </resultMap>
   
   <!--Dept getDeptByStep(@Param("did") int did);-->
   <select id="getDeptByStep" resultMap="deptEmpStep">
   	select * from t_dept where did = #{did}
   </select>
   ```

2. 根据部门id查询部门中的所有员工

   ```java
   /**
    * 根据部门id查询员工信息
    * @param did
    * @return
    */
   List<Emp> getEmpListByDid(@Param("did") int did); 
   ```

   ```xml
   <!--List<Emp> getEmpListByDid(@Param("did") int did);-->
   <select id="getEmpListByDid" resultType="Emp">
   	select * from t_emp where did = #{did}
   </select>
   ```

## 动态SQL

Mybatis框架的动态SQL技术是一种根据特定条件动态拼装SQL语句的功能，它存在的意义是为了解决 拼接SQL语句字符串时的痛点问题。

### if

if标签可通过test属性的表达式进行判断，若表达式的结果为true，则标签中的内容会执行；反之标签中的内容不会执行

if标签是根据标签中test属性所对应的表达式决定标签中的内容是否需要拼接到SQL中

```xml
<!--List<Emp> getEmpListByMoreTJ(Emp emp);-->
<select id="getEmpListByMoreTJ" resultType="Emp">
	select * from t_emp where 
    <!--只需要直接写ename,不需要#{}-->
    <if test="ename != '' and ename != null">
    	ename = #{ename}
    </if>
    <if test="age != '' and age != null">
    	and age = #{age}
    </if>
    <if test="sex != '' and sex != null">
    	and sex = #{sex}
    </if>
</select>
```

### where

1. 当where标签中有内容时，会自动生成where关键字，并且将内容前多余的and或or去掉

2. 当where标签中没有内容时，此时where标签没有任何效果

注意: where标签不能将其中内容后面多余的and或or去掉

> where和if一般结合使用： 
>
> 1. 若where标签中的if条件都不满足，则where标签没有任何功能，即不会添加where关键字 
> 2. 若where标签中的if条件满足，则where标签会自动添加where关键字，并将条件最前方多余的 and去掉
>
> 注意：where标签不能去掉条件最后多余的and

```xml
<select id="getEmpListByMoreTJ2" resultType="Emp">
    select * from t_emp
    <where>
        <if test="ename != '' and ename != null">
        	ename = #{ename}
        </if>
        <if test="age != '' and age != null">
        	and age = #{age}
        </if>
        <if test="sex != '' and sex != null">
        	and sex = #{sex}
        </if>
    </where>
</select>
```

### trim

> trim用于去掉或添加标签中的内容 
>
> 常用属性： 
>
> - prefix：在开头内容的前面添加某些字符 
> - prefixOverrides：在开头内容的前面去掉某些字符 
> - suffix：在结尾内容的后面添加某些字符 
> - suffixOverrides：在结尾内容的后面去掉某些字符

```xml
<select id="getEmpListByMoreTJ" resultType="Emp">
    select * from t_emp
    <trim prefix="where" suffixOverrides="and">
        <if test="ename != '' and ename != null">
        	ename = #{ename} and
        </if>
        <if test="age != '' and age != null">
        	age = #{age} and
        </if>
        <if test="sex != '' and sex != null">
        	sex = #{sex}
        </if>
    </trim>
</select>
```

### choose,when,otherwise

choose、when、otherwise相当于`if...else`,  `if..else`

when至少要有一个，otherwise最多只能有一个

```xml
<!--List<Emp> getEmpByChoose(Emp emp);-->
<select id="getEmpByChoose" resultType="Emp">
    select * from t_emp
    <where>
        <choose>
            <when test="empName != null and empName != ''">
                emp_name = #{empName}
            </when>
            <when test="age != null and age != ''">
                age = #{age}
            </when>
            <when test="sex != null and sex != ''">
                sex = #{sex}
            </when>
            <when test="email != null and email != ''">
                email = #{email}
            </when>
            <otherwise>
                did = 1
            </otherwise>
        </choose>
    </where>
</select>
```

### foreach

> 属性： 
>
> - collection：设置要循环的数组或集合 
> - item：表示集合或数组中的每一个数据 
> - separator：设置循环体之间的分隔符 
> - open：设置foreach标签中的内容的开始符 
> - close：设置foreach标签中的内容的结束符

#### 批量删除

1. 方式一:

```xml
<!--int deleteMoreByArray(@Param("eids") Integer[] eids);-->
<delete id="deleteMoreByArray">
    delete from t_emp where eid in
    <foreach collection="eids" item="eid" separator="," open="(" close=")">
        #{eid}
    </foreach>
</delete>
```

```
输出:
delete from t_emp where eid in (?,?,?)
```

2. 方式二:

```xml
<!--int deleteMoreByArray(@Param("eids") Integer[] eids);-->
<delete id="deleteMoreByArray">
    delete from t_emp where
    <foreach collection="eids" item="eid" separator="or">
        eid = #{eid}
    </foreach>
</delete>
```

```
输出:
delete from t_emp where eid = ? or eid =? or eid =?
```

#### 批量添加

```xml
<!--int insertMoreByList(@Param("emps") List<Emp> emps);-->
<insert id="insertMoreByList">
    insert into t_emp values
    <foreach collection="emps" item="emp" separator=",">
        (null,#{emp.empName},#{emp.age},#{emp.sex},#{emp.email},null)
    </foreach>
</insert>
```

```
输出:
insert into t_emp values (null,?,?,?,?,null),(null,?,?,?,?,null), ....
```

### SQL标签

设置SQL片段: `<sql id="empColumns">eid,emp_name,age,sex,email</sql>`

引用SQL片段: `<include refid="empColumns"></include>`

```xml
<sql id="empColumns">eid,emp_name,age,sex,email</sql>

<!--List<Emp> getEmpByCondition(Emp emp);-->
<select id="getEmpByCondition" resultType="Emp">
    select <include refid="empColumns"></include> from t_emp
    <trim prefix="where" suffixOverrides="and|or">
        <if test="empName != null and empName != ''">
            emp_name = #{empName} and
        </if>
        <if test="age != null and age != ''">
            age = #{age} or
        </if>
        <if test="sex != null and sex != ''">
            sex = #{sex} and
        </if>
        <if test="email != null and email != ''">
            email = #{email}
        </if>
    </trim>
</select>
```

## MyBatis的缓存

### MyBatis的一级缓存

一级缓存是SqlSession级别的，通过同一个SqlSession查询的数据会被缓存，下次查询相同的数据，就会从缓存中直接获取，不会从数据库重新访问 

使一级缓存失效的四种情况：

1. 不同的SqlSession对应不同的一级缓存 
2. 同一个SqlSession但是查询条件不同 
3. 同一个SqlSession两次查询期间执行了任何一次增删改操作 
4. 同一个SqlSession两次查询期间手动清空了缓存

### MyBatis的二级缓存

二级缓存是SqlSessionFactory级别，通过同一个SqlSessionFactory创建的SqlSession查询的结果会被缓存；此后若再次执行相同的查询语句，结果就会从缓存中获取

二级缓存开启的条件：

1. 在核心配置文件中，设置全局配置属性cacheEnabled="true"，默认为true，不需要设置
2. 在映射文件中设置标签
3. 二级缓存必须在SqlSession关闭或提交之后有效
4. 查询的数据所转换的实体类类型必须实现序列化的接口

使二级缓存失效的情况：

两次查询之间执行了任意的增删改，会使一级和二级缓存同时失效

### 二级缓存的相关配置

在mapper配置文件中添加的cache标签可以设置一些属性：

- eviction属性：缓存回收策略 

  LRU（Least Recently Used） – 最近最少使用的：移除最长时间不被使用的对象。 

  FIFO（First in First out） – 先进先出：按对象进入缓存的顺序来移除它们。 

  SOFT – 软引用：移除基于垃圾回收器状态和软引用规则的对象。

  WEAK – 弱引用：更积极地移除基于垃圾收集器状态和弱引用规则的对象。

  默认的是 LRU。 

- flushInterval属性：刷新间隔，单位毫秒 

  默认情况是不设置，也就是没有刷新间隔，缓存仅仅调用语句时刷新 

- size属性：引用数目，正整数 

  代表缓存最多可以存储多少个对象，太大容易导致内存溢出

- readOnly属性：只读，true/false

  true：只读缓存；会给所有调用者返回缓存对象的相同实例。因此这些对象不能被修改。这提供了很重要的性能优势。 

  false：读写缓存；会返回缓存对象的拷贝（通过序列化）。这会慢一些，但是安全，因此默认是 false。

### MyBatis缓存查询的顺序

- 先查询二级缓存，因为二级缓存中可能会有其他程序已经查出来的数据，可以拿来直接使用。 
- 如果二级缓存没有命中，再查询一级缓存 
- 如果一级缓存也没有命中，则查询数据库
- SqlSession关闭之后，一级缓存中的数据会写入二级缓存

