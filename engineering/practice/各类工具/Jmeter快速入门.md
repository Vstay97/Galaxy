---
title: Jmeter快速入门
description: Jmeter快速入门
keywords:
- Jmeter
tags:
- Jmeter
sidebar_position: 1
author: Vstay
date: 2023-11-18 13:33
last_update:
  author: Vstay
  date: 2023-11-18
---

## 1.安装Jmeter

Jmeter依赖于JDK，所以必须确保当前计算机上已经安装了JDK，并且配置了环境变量。



### 1.1.下载

可以Apache Jmeter官网下载，地址：http://jmeter.apache.org/download_jmeter.cgi

![image-20210715193149837](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2023/Jmeter%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/202311181335954.png)



也可以在这里下载: [资料](https://github.com/Vstay97/Materials/tree/main/tutorial/%E9%BB%91%E9%A9%AC/SpringCloud/%E5%BE%AE%E6%9C%8D%E5%8A%A1%E4%BF%9D%E6%8A%A4)



### 1.2.解压

因为下载的是zip包，解压缩即可使用，目录结构如下：

![image-20210715193334367](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2023/Jmeter%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/202311181335955.png)

其中的bin目录就是执行的脚本，其中包含启动脚本：

![image-20210715193414601](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2023/Jmeter%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/202311181335956.png)

### 1.3.运行

双击即可运行，但是有两点注意：

- 启动速度比较慢，要耐心等待
- 启动后黑窗口不能关闭，否则Jmeter也跟着关闭了

![image-20210715193730096](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2023/Jmeter%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/202311181335957.png)



## 2.快速入门



### 2.1.设置中文语言

默认Jmeter的语言是英文，需要设置：

![image-20210715193838719](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2023/Jmeter%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/202311181335958.png)

效果：

![image-20210715193914039](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2023/Jmeter%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/202311181335959.png)



> **注意**：上面的配置只能保证本次运行是中文，如果要永久中文，需要修改Jmeter的配置文件



打开jmeter文件夹，在bin目录中找到 **jmeter.properties**，添加下面配置：

```properties
language=zh_CN
```

![image-20210715194137982](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2023/Jmeter%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/202311181335960.png)



> 注意：前面不要出现#，#代表注释，另外这里是下划线，不是中划线





### 2.2.基本用法

在测试计划上点鼠标右键，选择添加 > 线程（用户） > 线程组：

![image-20210715194413178](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2023/Jmeter%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/202311181335961.png)

在新增的线程组中，填写线程信息：

![image-20210715195053807](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2023/Jmeter%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/202311181335962.png)



给线程组点鼠标右键，添加http取样器：

![image-20210715195144130](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2023/Jmeter%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/202311181335964.png)



编写取样器内容：

![image-20210715195410764](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2023/Jmeter%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/202311181335965.png)



添加监听报告：

![image-20210715195844978](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2023/Jmeter%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/202311181335966.png)

添加监听结果树：

![image-20210715200155537](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2023/Jmeter%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/202311181335967.png)



汇总报告结果：

![image-20210715200243194](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2023/Jmeter%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/202311181335968.png)

结果树：

![image-20210715200336526](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2023/Jmeter%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8/202311181335969.png)

