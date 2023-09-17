---
title: Spring5快速入门
tags:
  - Spring
categories:
  - 框架
date: 2022-04-21 15:28:40
updated: 2022-05-01 22:39:40
---

- 框架简述
- IOC容器
- AOP
- 事务操作

<!-- more-->

## 框架简述

1. Spring 是轻量级的开源的 JavaEE 框架

2. Spring 可以解决企业应用开发的复杂性

3. Spring 有两个核心部分：IOC 和Aop
   1. IOC：控制反转，把创建对象过程交给 Spring 进行管理
   2. Aop：面向切面，不修改源代码进行功能增强

4. Spring 特点
   1.  方便解耦，简化开发
   2.  Aop 编程支持
   3.  方便程序测试
   4.  方便和其他框架进行整合
   5.  方便进行事务操作
   6.  降低 API 开发难度

5. 本文选取 Spring版本 5.x

### 入门案例

### 下载Spring5

（1） 使用 Spring 最新稳定版本 5.2.6

 ![image-20220501154013608](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501154013608.png)

（2） 下载地址

https://repo.spring.io/release/org/springframework/spring/

![img](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/wps1.jpg) 

 

![img](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/wps2.jpg) 

### 打开idea工具，创建普通Java工程

![img](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/wps3.jpg) 

 

![img](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/wps4.jpg) 

![image-20220501154208829](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501154208829.png)

### 导入 Spring5 相关 jar 包

![image-20220501154240558](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501154240558.png)

![image-20220501154256790](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501154256790.png)

![image-20220501154416397](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501154416397.png)

### 创建普通类，在这个类创建普通方法

```java
public class User {
    public void add() {
        System.out.println("add.   ");
    }
}
```

### 创建 Spring 配置文件，在配置文件配置创建的对象

（1）Spring 配置文件使用 xml 格式

![image-20220501155104265](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501155104265.png)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--配置 User 对象创建-->
    <bean id="user" class="com.atguigu.spring5.User"></bean>
</beans>
```

### 进行测试代码编写

```java
@Test
public void testAdd() {
//1 加载 spring 配置文件
    ApplicationContext context =
            new ClassPathXmlApplicationContext("bean1.xml");
//2 获取配置创建的对象
    User user = context.getBean("user", User.class);
    System.out.println(user);
    user.add();
}
```

![image-20220501155243613](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501155243613.png)

## IOC容器

什么是 IOC:

（1） 控制反转，把对象创建和对象之间的调用过程，交给 Spring 进行管理

（2） 使用 IOC 目的：为了耦合度降低

（3） 做入门案例就是 IOC 实现

### 概念与底层原理

> xml 解析
>
> 工厂模式
>
> 反射

画图表示:

![image-20220501155815910](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501155815910.png)

**BeanFactory 接口**

1、IOC 思想基于 IOC 容器完成，IOC 容器底层就是对象工厂

2、Spring 提供 IOC 容器实现两种方式：（两个接口）

（1）BeanFactory：IOC 容器基本实现，是 Spring 内部的使用接口，不提供开发人员进行使用

**加载配置文件时候不会创建对象，在获取对象（使用）才去创建对象**

（2）ApplicationContext：BeanFactory 接口的子接口，提供更多更强大的功能，一般由开发人员进行使用

**加载配置文件时候就会把在配置文件对象进行创建**

3、ApplicationContext 接口有实现类

![image-20220501160044713](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501160044713.png)

### Bean管理

1、什么是 Bean 管理

（0）Bean 管理指的是两个操作

（1）Spring 创建对象

（2）Spirng 注入属性

2、Bean 管理操作有两种方式

（1）基于 xml 配置文件方式实现

（2）基于注解方式实现

#### FactoryBean

1、Spring 有两种类型 bean，一种普通 bean，另外一种工厂 bean（FactoryBean） 

2、普通 bean：在配置文件中定义 bean 类型就是返回类型

3、工厂 bean：在配置文件定义 bean 类型可以和返回类型不一样

​	第一步 创建类，让这个类作为工厂 bean，实现接口 FactoryBean

​	第二步 实现接口里面的方法，在实现的方法中定义返回的 bean 类型

```java
public class MyBean implements FactoryBean<Course> {
    //定义返回 bean
    @Override
    public Course getObject() throws Exception {
        Course course = new Course();
        course.setCname("abc");
        return course;
    }

    @Override
    public Class<?> getObjectType() {
        return null;
    }

    @Override
    public boolean isSingleton() {
        return false;
    }
}
```

```xml
<bean id="myBean" class="com.atguigu.spring5.factorybean.MyBean">
</bean>
```

```java
@Test
public void test3() {
    ApplicationContext context =
            new ClassPathXmlApplicationContext("bean3.xml");
    Course course = context.getBean("myBean", Course.class);
    System.out.println(course);
}
```

#### bean 作用域

1、在 Spring 里面，设置创建 bean 实例是单实例还是多实例
2、在 Spring 里面，默认情况下，bean 是单实例对象

![image-20220501161033093](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501161033093.png)

![image-20220501161048391](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501161048391.png)

3、如何设置单实例还是多实例

（1）在 spring 配置文件 bean 标签里面有属性（scope）用于设置单实例还是多实例

（2）scope 属性值
	第一个值 默认值，singleton，表示是单实例对象

​	第二个值 prototype，表示是多实例对象

![image-20220501161346836](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501161346836.png)

（3）singleton 和 prototype 区别

 1.  singleton 单实例，prototype 多实例

 2.  设置 scope 值是 singleton 时候，加载 spring 配置文件时候就会创建单实例对象

     设置 scope 值是 prototype 时候，不是在加载 spring 配置文件时候创建 对象，在调用getBean方法时候创建多实例对象

#### bean的生命周期

1、生命周期概念: 从对象创建到对象销毁的过程

2、bean 生命周期

（1）通过构造器创建 bean 实例（无参数构造）

（2）为 bean 的属性设置值和对其他 bean 引用（调用 set 方法）

（3）调用 bean 的初始化的方法（需要进行配置初始化的方法）

（4）bean 可以使用了（对象获取到了）

（5）当容器关闭时候，调用 bean 的销毁的方法（需要进行配置销毁的方法）

3、演示 bean 生命周期

```java
public class Orders {
    //无参数构造
    public Orders() {
        System.out.println("第一步 执行无参数构造创建 bean 实例");
    }

    private String oname;

    public void setOname(String oname) {
        this.oname = oname;
        System.out.println("第二步 调用 set 方法设置属性值");
    }

    //创建执行的初始化的方法
    public void initMethod() {
        System.out.println("第三步 执行初始化的方法");
    }

    //创建执行的销毁的方法
    public void destroyMethod() {
        System.out.println("第五步 执行销毁的方法");
    }
}
```

```xml
<bean id="orders" class="com.atguigu.spring5.bean.Orders" init-method="initMethod" destroy-method="destroyMethod">
    <property name="oname" value="手机"></property>
</bean>
```

```java
@Test
public void testBean3() {
//	ApplicationContext context =
//	new ClassPathXmlApplicationContext("bean4.xml");
    ClassPathXmlApplicationContext context =
            new ClassPathXmlApplicationContext("bean4.xml");
    Orders orders = context.getBean("orders", Orders.class);
    System.out.println("第四步 获取创建 bean 实例对象");
    System.out.println(orders);
	//手动让 bean 实例销毁
    context.close();
}
```

![image-20220501162106490](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501162106490.png)

4、bean 的后置处理器，bean 生命周期有七步:

（1）通过构造器创建 bean 实例（无参数构造）

（2）为 bean 的属性设置值和对其他 bean 引用（调用 set 方法）

（3）把 bean 实例传递 bean 后置处理器的方法 postProcessBeforeInitialization

（4）调用 bean 的初始化的方法（需要进行配置初始化的方法）

（5）把 bean 实例传递 bean 后置处理器的方法 postProcessAfterInitialization

（6）bean 可以使用了（对象获取到了）

（7）当容器关闭时候，调用 bean 的销毁的方法（需要进行配置销毁的方法）

5、演示添加后置处理器效果
（1）创建类，实现接口 BeanPostProcessor，创建后置处理器

```java
public class MyBeanPost implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("在初始化之前执行的方法");
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("在初始化之后执行的方法");
        return bean;
    }
}
```

```xml
<!--配置后置处理器-->
<bean id="myBeanPost" class="com.atguigu.spring5.bean.MyBeanPost"></bean>
```

![image-20220501162413368](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501162413368.png)



### Bean管理:XML方式

#### 基本方式

1、基于 xml 方式创建对象

![image-20220501162730331](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501162730331.png)

- 在 spring 配置文件中，使用 bean 标签，标签里面添加对应属性，就可以实现对象创建
- 在 bean 标签有很多属性，介绍常用的属性
   **id 属性：唯一标识**
   **class 属性：类全路径（包类路径）**
- 创建对象时候，默认也是执行无参数构造方法完成对象创建

2、基于 xml 方式注入属性
   DI：依赖注入，就是注入属性

3、第一种注入方式：使用 set 方法进行注入

（1）创建类，定义属性和对应的 set 方法

```java
/**
 * 演示使用 set 方法进行注入属性
 */
public class Book {
    //创建属性
    private String bname;
    private String bauthor;

    //创建属性对应的 set 方法
    public void setBname(String bname) {
        this.bname = bname;
    }

    public void setBauthor(String bauthor) {
        this.bauthor = bauthor;
    }
}
```

（2）在 spring 配置文件配置对象创建，配置属性注入

```xml
<!--2 set 方法注入属性-->
<bean id="book" class="com.atguigu.spring5.Book">
    <!--使用 property 完成属性注入name：类里面属性名称value：向属性注入的值-->
    <property name="bname" value="易筋经"></property>
    <property name="bauthor" value="达摩老祖"></property>
</bean>
```

4、第二种注入方式：使用有参数构造进行注入

（1）创建类，定义属性，创建属性对应有参数构造方法

```java
/**
 * 使用有参数构造注入
 */
public class Orders {
    //属性
    private String oname;
    private String address;

    //有参数构造
    public Orders(String oname, String address) {
        this.oname = oname;
        this.address = address;
    }
}
```

（2）在 spring 配置文件中进行配置

```xml
<!--3 有参数构造注入属性-->
<bean id="orders" class="com.atguigu.spring5.Orders">
    <constructor-arg name="oname" value="电脑"></constructor-arg>
    <constructor-arg name="address" value="China"></constructor-arg>
</bean>
```

5、p 名称空间注入（了解）

（1）使用 p 名称空间注入，可以简化基于 xml 配置方式

第一步 添加 p 名称空间在配置文件中

![image-20220501163551948](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501163551948.png)

第二步 进行属性注入，在 bean 标签里面进行操作

```xml
<!--2 set 方法注入属性-->
<bean id="book" class="com.atguigu.spring5.Book" p:bname="九阳神功"
      p:bauthor="无名氏">
</bean>
```

#### 注入其他类型属性

##### 字面量
（1）null 值

```xml
<!--null 值-->
<property name="address">
    <null/>
</property>
```

（2）属性值包含特殊符号

```xml
<!--属性值包含特殊符号
    1 把 < > 进行转义 &lt; &gt;
    2 把带特殊符号内容写到CDATA
-->
<property name="address">
    <value><![CDATA[<<南京>>]]></value>
</property>
```

##### 外部 bean

（1）创建两个类 service 类和 dao 类

（2）在 service 调用 dao 里面的方法

（3）在 spring 配置文件中进行配置

```java
public class UserService {
    //创建 UserDao 类型属性，生成 set 方法
    private UserDao userDao;

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    public void add() {
        System.out.println("service add.	");
        userDao.update();
    }
}
```

```xml
<!--1 service 和 dao 对象创建-->
<bean id="userService" class="com.atguigu.spring5.service.UserService">
    <!--注入 userDao 对象
    name 属性：类里面属性名称
    ref 属性：创建userDao 对象 bean 标签 id 值
    -->
    <property name="userDao" ref="userDaoImpl"></property>
</bean>
<bean id="userDaoImpl" class="com.atguigu.spring5.dao.UserDaoImpl"></bean>
```

##### 内部 bean

1. 一对多关系：部门和员工

   一个部门有多个员工，一个员工属于一个部门部门是一，员工是多

2. 在实体类之间表示一对多关系，员工表示所属部门，使用对象类型属性进行表示

```java
//部门类
public class Dept {
    private String dname;

    public void setDname(String dname) {
        this.dname = dname;
    }
}

//员工类
public class Emp {
    private String ename;
    private String gender;
    //员工属于某一个部门，使用对象形式表示
    private Dept dept;

    public void setDept(Dept dept) {
        this.dept = dept;
    }

    public void setEname(String ename) {
        this.ename = ename;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
```

（3）在 spring 配置文件中进行配置

```xml
<!--内部 bean-->
<bean id="emp" class="com.atguigu.spring5.bean.Emp">
    <!--设置两个普通属性-->
    <property name="ename" value="lucy"></property>
    <property name="gender" value="女"></property>
    <!--设置对象类型属性-->
    <property name="dept">
        <bean id="dept" class="com.atguigu.spring5.bean.Dept">
            <property name="dname" value="安保部"></property>
        </bean>
    </property>
</bean>
```

##### 级联赋值
（1）第一种写法

```xml
<!--级联赋值-->
<bean id="emp" class="com.atguigu.spring5.bean.Emp">
    <!--设置两个普通属性-->
    <property name="ename" value="lucy"></property>
    <property name="gender" value="女"></property>
    <!--级联赋值-->
    <property name="dept" ref="dept"></property>
</bean>

<bean id="dept" class="com.atguigu.spring5.bean.Dept">
    <property name="dname" value="财务部"></property>
</bean>
```

（2）第二种写法

![image-20220501171939731](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501171939731.png)

```xml
<!--级联赋值-->
<bean id="emp" class="com.atguigu.spring5.bean.Emp">
    <!--设置两个普通属性-->
    <property name="ename" value="lucy"></property>
    <property name="gender" value="女"></property>
    <!--级联赋值-->
    <property name="dept" ref="dept"></property>
    <property name="dept.dname" value="技术部"></property>
</bean>

<bean id="dept" class="com.atguigu.spring5.bean.Dept">
    <property name="dname" value="财务部"></property>
</bean>
```

##### 集合属性

1、注入数组类型属性

2、注入 List 集合类型属性

3、注入 Map 集合类型属性

（1）创建类，定义数组、list、map、set 类型属性，生成对应 set 方法

```java
public class Stu {
    //1 数组类型属性
    private String[] courses;
    //2 list 集合类型属性
    private List<String> list;
    //3 map 集合类型属性
    private Map<String, String> maps;
    //4 set 集合类型属性
    private Set<String> sets;

    public void setSets(Set<String> sets) {
        this.sets = sets;
    }

    public void setCourses(String[] courses) {
        this.courses = courses;
    }

    public void setList(List<String> list) {
        this.list = list;
    }

    public void setMaps(Map<String, String> maps) {
        this.maps = maps;
    }
}
```

（2）在 spring 配置文件进行配置

```xml
<!--1 集合类型属性注入-->
<bean id="stu" class="com.atguigu.spring5.collectiontype.Stu">
    <!--数组类型属性注入-->
    <property name="courses">
        <array>
            <value>java 课程</value>
            <value>数据库课程</value>
        </array>
    </property>
    <!--list 类型属性注入-->
    <property name="list">
        <list>
            <value>张三</value>
            <value>小三</value>
        </list>
    </property>
    <!--map 类型属性注入-->
    <property name="maps">
        <map>
            <entry key="JAVA" value="java"></entry>
            <entry key="PHP" value="php"></entry>
        </map>
    </property>
    <!--set 类型属性注入-->
    <property name="sets">
        <set>
            <value>MySQL</value>
            <value>Redis</value>
        </set>
    </property>
</bean>
```

4、在集合里面设置对象类型值

```xml
<!--创建多个 course 对象-->
<bean id="course1" class="com.atguigu.spring5.collectiontype.Course">
    <property name="cname" value="Spring5 框架"></property>
</bean>

<bean id="course2" class="com.atguigu.spring5.collectiontype.Course">
<property name="cname" value="MyBatis 框架"></property>

</bean>
    <!--注入 list 集合类型，值是对象-->
    <property name="courseList">
    <list>
        <ref bean="course1"></ref>
        <ref bean="course2"></ref>
    </list>
</property>
```

5、把集合注入部分提取出来

（1）在 spring 配置文件中引入名称空间 util

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
 	                       http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd">
```

（2）使用 util 标签完成 list 集合注入提取

```xml
<!--1 提取 list 集合类型属性注入-->
<util:list id="bookList">
    <value>易筋经</value>
    <value>九阴真经</value>
    <value>九阳神功</value>
</util:list>

<!--2 提取 list 集合类型属性注入使用-->
<bean id="book" class="com.atguigu.spring5.collectiontype.Book">
    <property name="list" ref="bookList"></property>
</bean>
```

#### 自动装配

1、什么是自动装配

 自动装配概念: 根据指定装配规则（属性名称或者属性类型），Spring 自动将匹配的属性值进行注入

2、演示自动装配过程

（1）根据属性名称自动注入

```xml
<!--实现自动装配
    bean 标签属性autowire，配置自动装配autowire 属性常用两个值：
    byName 根据属性名称注入 ，注入值 bean 的 id 值和类属性名称一样
    byType 根据属性类型注入
-->
<bean id="emp" class="com.atguigu.spring5.autowire.Emp" autowire="byName">
    <!--<property name="dept" ref="dept"></property>-->
</bean>

<bean id="dept" class="com.atguigu.spring5.autowire.Dept"></bean>
```

（2）根据属性类型自动注入

```xml
<!--实现自动装配
bean 标签属性autowire，配置自动装配autowire 属性常用两个值：
byName 根据属性名称注入 ，注入值 bean 的 id 值和类属性名称一样
byType 根据属性类型注入
-->
<bean id="emp" class="com.atguigu.spring5.autowire.Emp" autowire="byType">
    <!--<property name="dept" ref="dept"></property>-->
</bean>

<bean id="dept" class="com.atguigu.spring5.autowire.Dept"></bean>
```

#### 外部属性文件

1、直接配置数据库信息

（1）配置德鲁伊连接池

（2）引入德鲁伊连接池依赖 jar 包

![image-20220501181112830](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501181112830.png)

```xml
<!--直接配置连接池-->
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"></property>
    <property name="url" value="jdbc:mysql://localhost:3306/userDb"></property>
    <property name="username" value="root"></property>
    <property name="password" value="root"></property>
</bean>
```

2、引入外部属性文件配置数据库连接池

（1）创建外部属性文件，properties  格式文件，写数据库信息

![image-20220501181430142](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501181430142.png)

（2）把外部 properties 属性文件引入到 spring 配置文件中

**引入 context 名称空间**

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:util="http://www.springframework.org/schema/util"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
                           http://www.springframework.org/schema/beans/spring-beans.xsd
 	                       http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd
 	                       http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
```

**在 spring 配置文件使用标签引入外部属性文件**

```xml
<!--引入外部属性文件-->
<context:property-placeholder location="classpath:jdbc.properties"/>
<!--配置连接池-->
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="${prop.driverClass}"></property>
    <property name="url" value="${prop.url}"></property>
    <property name="username" value="${prop.userName}"></property>
    <property name="password" value="${prop.password}"></property>
</bean>
```

### Bean管理:注解方式

什么是注解

- 注解是代码特殊标记，格式：@注解名称(属性名称=属性值,  属性名称=属性值..)
- 使用注解，注解作用在类上面，方法上面，属性上面
- 使用注解目的：简化 xml 配置

Spring 针对 Bean 管理中创建对象提供注解

- @Component
- @Service
- @Controller
- @Repository

*	上面四个注解功能是一样的，都可以用来创建bean实例

#### 创建对象

第一步 引入依赖

![image-20220501182945292](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501182945292.png)

第二步 开启组件扫描

```xml
<!--开启组件扫描
    如果扫描多个包，多个包使用逗号隔开
    扫描包上层目录
-->
<context:component-scan base-package="com.atguigu"></context:component-scan>
```

第三步 创建类，在类上面添加创建对象注解

```java
// 在注解里面 value 属性值可以省略不写，
// 默认值是类名称，首字母小写
// UserService -- userService
@Component(value = "userService") //<bean id="userService" class=".."/>
public class UserService {
    public void add() {
        System.out.println("service add.	");
    }
}
```

#### 组件扫描配置

```xml
<!--示例 1
    use-default-filters="false" 表示现在不使用默认filter，自己配置 filter
    context:include-filter ，设置扫描哪些内容
-->
<context:component-scan base-package="com.atguigu" use-default- filters="false">
    <context:include-filter type="annotation"
                            expression="org.springframework.stereotype.Controller"/>
</context:component-scan>
```

```xml
<!--示例 2
    下面配置扫描包所有内容
    context:exclude-filter： 设置哪些内容不进行扫描
-->
<context:component-scan base-package="com.atguigu">
    <context:exclude-filter type="annotation"
                            expression="org.springframework.stereotype.Controller"/>
</context:component-scan>
```

#### 注入属性

（1）@Autowired：根据属性类型进行自动装配

​	第一步 把 service 和 dao 对象创建，在 service 和 dao 类添加创建对象注解

​	第二步 在 service 注入 dao 对象，在 service 类添加 dao 类型属性，在属性上面使用注解

（2）@Qualifier：根据名称进行注入

​	这个@Qualifier 注解的使用，和上面@Autowired 一起使用

（3）@Resource：可以根据类型注入，可以根据名称注入

（4）@Value：注入普通类型属性

##### @Autowired

```java
@Service
public class UserService {
    // 定义 dao 类型属性
    // 不需要添加 set 方法
    // 添加注入属性注解
    @Autowired
    private UserDao userDao;

    public void add() {
        System.out.println("service add.	");
        userDao.add();
    }
}
```

##### @Qualifier

```java
// 定义 dao 类型属性
// 不需要添加 set 方法
// 添加注入属性注解
@Autowired //根据类型进行注入
@Qualifier(value = "userDaoImpl1") //根据名称进行注入
private UserDao userDao;
```

##### @Resource

```java
// @Resource //根据类型进行注入
@Resource(name = "userDaoImpl1") //根据名称进行注入
private UserDao userDao;
```

##### @Value

```java
@Value(value = "abc") private String name;
```

#### 完全注解开发

（1）创建配置类，替代xml 配置文件 

```java
@Configuration //作为配置类，替代 xml 配置文件
@ComponentScan(basePackages = {"com.atguigu"})
public class SpringConfig {
}
```

（2）编写测试类

```java
@Test
public void testService2() {
//加载配置类
    ApplicationContext context
            = new AnnotationConfigApplicationContext(SpringConfig.class);
    UserService userService = context.getBean("userService",
            UserService.class);
    System.out.println(userService);
    userService.add();
}
```

## AOP

### 基本概念

- 面向切面编程（方面），利用 AOP 可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。
- 通俗描述：不通过修改源代码方式，在主干功能里面添加新功能
- 使用登录例子说明 AOP

![img](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/clip_image002.gif)

### 底层原理

**AOP 底层使用动态代理**

动态代理的情况有两种：

1. 有接口情况，使用 JDK 动态代理

   **创建接口实现类代理对象，增强类的方法**

   ![image-20220501212756181](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501212756181.png)

2. 没有接口情况，使用 CGLIB 动态代理

   **创建子类的代理对象，增强类的方法**

   ![image-20220501212921616](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501212921616.png)

#### 实现

1、使用 JDK 动态代理，使用 Proxy 类里面的方法创建代理对象

![image-20220501213102778](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501213102778.png)

调用 newProxyInstance 方法

![image-20220501213223792](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501213223792.png)

方法有三个参数： 

- 第一参数，类加载器
- 第二参数，增强方法所在的类，这个类实现的接口，支持多个接口
- 第三参数，实现这个接口 InvocationHandler，创建代理对象，写增强的部分

2、编写 JDK 动态代理代码

（1）创建接口，定义方法

```java
public interface UserDao {
    public int add(int a, int b);

    public String update(String id);
}
```

（2）创建接口实现类，实现方法

```java
public class UserDaoImpl implements UserDao {
    @Override
    public int add(int a, int b) {
        return a + b;
    }

    @Override
    public String update(String id) {
        return id;
    }
}
```

（3）使用 Proxy 类创建接口代理对象

```java
public class JDKProxy {
    public static void main(String[] args) {
// 创建接口实现类代理对象
        Class[] interfaces = {UserDao.class};
//	Proxy.newProxyInstance(JDKProxy.class.getClassLoader(), interfaces, new InvocationHandler() {
//	@Override
//	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
//	return null;
//	}
//	});
        UserDaoImpl userDao = new UserDaoImpl();
        UserDao dao =
                (UserDao) Proxy.newProxyInstance(JDKProxy.class.getClassLoader(), interfaces,
                        new UserDaoProxy(userDao));
        int result = dao.add(1, 2);
        System.out.println("result:" + result);
    }
}

//创建代理对象代码
class UserDaoProxy implements InvocationHandler {
    //1 把创建的是谁的代理对象，把谁传递过来
//有参数构造传递
    private Object obj;

    public UserDaoProxy(Object obj) {
        this.obj = obj;
    }

    //增强的逻辑
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
//方法之前
        System.out.println("方法之前执行...." + method.getName() + " :传递的参数..." + Arrays.toString(args));
//被增强的方法执行
        Object res = method.invoke(obj, args);
//方法之后
        System.out.println("方法之后执行	" + obj);
        return res;
    }
}
```

### AOP操作

#### 术语

1. 连接点

   类里面哪些方法可以被增强，这些方法称为连接点

2. 切入点

   实际被真正增强的方法，称为切入点

3. 通知（增强）

   - 实际增强的逻辑部分称为通知（增强）
   - 通知有多种类型
     - 前置通知
     - 后置通知
     - 环绕通知
     - 异常通知
     - 最终通知

4. 切面

   是动作，把通知应用到切入点的过程

#### 准备工作

1、Spring 框架一般都是基于 AspectJ 实现 AOP 操作

（1）AspectJ 不是 Spring 组成部分，独立 AOP 框架，一般把 AspectJ 和 Spirng 框架一起使用，进行 AOP 操作

2、基于 AspectJ 实现 AOP 操作

（1）基于 xml 配置文件实现

（2）基于注解方式实现（使用）

3、在项目工程里面引入 AOP 相关依赖

![image-20220501214854198](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501214854198.png)

4、切入点表达式

（1）切入点表达式作用：知道对哪个类里面的哪个方法进行增强

（2）语法结构： execution([权限修饰符] [返回类型] [类全路径] \[方法名称\]([参数列表]) )

举例：

- 对 com.atguigu.dao.BookDao 类里面的 add 进行增强

  `execution(* com.atguigu.dao.BookDao.add(..))`

- 对 com.atguigu.dao.BookDao 类里面的所有的方法进行增强

  `execution(* com.atguigu.dao.BookDao.* (..))`

- 对 com.atguigu.dao 包里面所有类，类里面所有方法进行增强

  `execution(* com.atguigu.dao.*.* (..))`

#### AspectJ注解

1、创建类，在类里面定义方法

```java
public class User {
    public void add() {
        System.out.println("add.	");
    }
}
```

2、创建增强类（编写增强逻辑）

（1）在增强类里面，创建方法，让不同方法代表不同通知类型

```java
// 增强的类
public class UserProxy {
    public void before() {//前置通知System.out.println("before.	");
    }
}
```

3、进行通知的配置

（1）在 spring 配置文件中，开启注解扫描

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
 	http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
 	http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">

<!-- 开启注解扫描 -->
<context:component-scan base- package="com.atguigu.spring5.aopanno"></context:component-scan>
```

（2）使用注解创建 User 和 UserProxy 对象

![image-20220501215553012](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501215553012.png)

（3）在增强类上面添加注解 @Aspect

```java
// 增强的类
@Component
@Aspect //生成代理对象
public class UserProxy {
}
```

（4）在 spring 配置文件中开启生成代理对象

```xml
<!-- 开启 Aspect 生成代理对象-->
<aop:aspectj-autoproxy></aop:aspectj-autoproxy>
```

4、配置不同类型的通知

（1）在增强类的里面，在作为通知方法上面添加通知类型注解，使用切入点表达式配置

```java
// 增强的类
@Component
// 生成代理对象
@Aspect 
public class UserProxy {
    // 前置通知
	// @Before 注解表示作为前置通知
    @Before(value = "execution(* com.atguigu.spring5.aopanno.User.add(..))")
    public void before() {
        System.out.println("before.	");
    }

    // 后置通知（返回通知）
    @AfterReturning(value = "execution(* com.atguigu.spring5.aopanno.User.add(..))")
    public void afterReturning() {
        System.out.println("afterReturning	");
    }

    // 最终通知
    @After(value = "execution(* com.atguigu.spring5.aopanno.User.add(..))")
    public void after() {
        System.out.println("after.	");
    }

    // 异常通知
    @AfterThrowing(value = "execution(* com.atguigu.spring5.aopanno.User.add(..))")
    public void afterThrowing() {
        System.out.println("afterThrowing.	");
    }

    // 环绕通知
    @Around(value = "execution(* com.atguigu.spring5.aopanno.User.add(..))")
    public void around(ProceedingJoinPoint proceedingJoinPoint) throws
            Throwable {
        System.out.println("环绕之前	");
		// 被增强的方法执行
        proceedingJoinPoint.proceed(); 
        System.out.println("环绕之后	");
    }
}
```

5、相同的切入点抽取

```java
// 相同切入点抽取
@Pointcut(value = "execution(* com.atguigu.spring5.aopanno.User.add(..))")
public void pointdemo() {
}

// 前置通知
// @Before 注解表示作为前置通知
@Before(value = "pointdemo()")
public void before() {
    System.out.println("before.	");
}
```

6、有多个增强类多同一个方法进行增强，设置增强类优先级

（1）在增强类上面添加注解 @Order(数字类型值)，数字类型值越小优先级越高

```java
@Component
@Aspect
@Order(1)
public class PersonProxy() {
}
```

7、完全使用注解开发

（1）创建配置类，不需要创建 xml 配置文件

```java
@Configuration
@ComponentScan(basePackages = {"com.atguigu"})
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class ConfigAop {
}
```

#### AspectJ配置文件

1、创建两个类，增强类和被增强类，创建方法

2、在 spring 配置文件中创建两个类对象

```xml
<!--创建对象-->
<bean id="book" class="com.atguigu.spring5.aopxml.Book"></bean>
<bean id="bookProxy" class="com.atguigu.spring5.aopxml.BookProxy"></bean>
```

3、在 spring 配置文件中配置切入点

```xml
<!--配置 aop 增强-->
<aop:config>
    <!--切入点-->
    <aop:pointcut id="p" expression="execution(* com.atguigu.spring5.aopxml.Book.buy(..))"/>
    <!--配置切面-->
    <aop:aspect ref="bookProxy">
        <!--增强作用在具体的方法上-->
        <aop:before method="before" pointcut-ref="p"/>
    </aop:aspect>
</aop:config>
```

## 事务

1、什么事务

（1）事务是数据库操作最基本单元，逻辑上一组操作，要么都成功，如果有一个失败所有操 作都失败

（2）典型场景：银行转账

- **lucy 转账 100 元 给 mary**
- **lucy 少 100，mary 多 100**

2、事务四个特性（ACID）

（1）原子性

（2）一致性

（3）隔离性

（4）持久性

### 事务管理介绍

1、事务添加到 JavaEE 三层结构里面 Service 层（业务逻辑层）

2、在 Spring 进行事务管理操作

（1）有两种方式：编程式事务管理和声明式事务管理（使用）

3、声明式事务管理

（1）	基于注解方式（使用）

（2）	基于 xml 配置文件方式

4、在 Spring 进行声明式事务管理，底层使用 AOP 原理

5、Spring 事务管理 API

提供一个接口，代表事务管理器，这个接口针对不同的框架提供不同的实现类

![image-20220501221544212](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501221544212.png)

### 注解声明式事务管理

1、在 spring 配置文件配置事务管理器

```xml
<!--创建事务管理器-->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <!--注入数据源-->
    <property name="dataSource" ref="dataSource"></property>
</bean>
```

2、在 spring 配置文件，开启事务注解

（1）在 spring 配置文件引入名称空间 tx

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd
       http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">
```

（2）开启事务注解

```xml
<!--开启事务注解-->
<tx:annotation-driven transaction- manager="transactionManager"></tx:annotation-driven>
```

3、在 service 类上面（或者 service 类里面方法上面）添加事务注解

（1）@Transactional，这个注解添加到类上面，也可以添加方法上面

（2）如果把这个注解添加类上面，这个类里面所有的方法都添加事务

（3）如果把这个注解添加方法上面，为这个方法添加事务

```java
@Service
@Transactional
public class UserService {
}
```

### 声明式事务管理参数配置

#### 配置参数

在 service 类上面添加注解@Transactional，在这个注解里面可以配置事务相关参数

![image-20220501222234557](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501222234557.png)

#### 事务传播行为

propagation：事务传播行为

多事务方法直接进行调用，这个过程中事务 是如何进行管理的

![image-20220501222622738](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501222622738.png)

![image-20220501222635062](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501222635062.png)

![image-20220501222646050](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501222646050.png)

![image-20220501222753121](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501222753121.png)

#### 事务隔离级别

ioslation：事务隔离级别

（1）事务有特性称为隔离性，多事务操作之间不会产生影响。不考虑隔离性产生很多问题

（2）有三个读问题：脏读、不可重复读、虚（幻）读

（3）脏读：一个未提交事务读取到另一个未提交事务的数据

![image-20220501223111029](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501223111029.png)

（4）不可重复读：一个未提交事务读取到另一提交事务修改数据

![image-20220501223132159](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501223132159.png)

（5）虚读：一个未提交事务读取到另一提交事务添加数据

（6）解决：通过设置事务隔离级别，解决读问题

![image-20220501223229111](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501223229111.png)

![image-20220501223242141](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Spring5%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/image-20220501223242141.png)

#### 其它

timeout：超时时间

- 事务需要在一定时间内进行提交，如果不提交进行回滚 
- 默认值是 -1 ，设置时间以秒单位进行计算 

readOnly：是否只读 

- 读：查询操作，写：添加修改删除操作 

- readOnly 默认值 false，表示可以查询，可以添加修改删除操作 

- 设置 readOnly 值是 true，设置成 true 之后，只能查询 

rollbackFor：回滚 

- 设置出现哪些异常进行事务回滚 

noRollbackFor：不回滚 

- 设置出现哪些异常不进行事务回滚

### XML 声明式事务管理

1、在 spring 配置文件中进行配置 

第一步 配置事务管理器 

第二步 配置通知

第三步 配置切入点和切面

```xml
<!--1 创建事务管理器-->
<bean id="transactionManager"
      class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <!--注入数据源-->
    <property name="dataSource" ref="dataSource"></property>
</bean>

<!--2 配置通知-->
<tx:advice id="txadvice">
    <!--配置事务参数-->
    <tx:attributes>
        <!--指定哪种规则的方法上面添加事务-->
        <tx:method name="accountMoney" propagation="REQUIRED"/>
        <!--<tx:method name="account*"/>-->
    </tx:attributes>
</tx:advice>

<!--3 配置切入点和切面-->
<aop:config>
    <!--配置切入点-->
    <aop:pointcut id="pt" expression="execution(*com.atguigu.spring5.service.UserService.*(..))"/>
    <!--配置切面-->
    <aop:advisor advice-ref="txadvice" pointcut-ref="pt"/>
</aop:config>
```

### 完全注解声明式事务管理

1、创建配置类，使用配置类替代 xml 配置文件

```java
// 配置类
@Configuration 
// 组件扫描
@ComponentScan(basePackages = "com.atguigu") 
// 开启事务
@EnableTransactionManagement 
public class TxConfig {
    // 创建数据库连接池
    @Bean
    public DruidDataSource getDruidDataSource() {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql:///user_db");
        dataSource.setUsername("root");
        dataSource.setPassword("root");
        return dataSource;
    }

    // 创建 JdbcTemplate 对象
    @Bean
    public JdbcTemplate getJdbcTemplate(DataSource dataSource) {
        // 到 ioc 容器中根据类型找到 dataSource
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        // 注入 dataSource
        jdbcTemplate.setDataSource(dataSource);
        return jdbcTemplate;
    }

    // 创建事务管理器
    @Bean
    public DataSourceTransactionManager
    getDataSourceTransactionManager(DataSource dataSource) {
        DataSourceTransactionManager transactionManager = new
                DataSourceTransactionManager();
        transactionManager.setDataSource(dataSource);
        return transactionManager;
    }
}
```

