---
title: Hadoop 入门
description: Hadoop（入门）
keywords:
- Hadoop
tags:
- Hadoop
sidebar_position: 1
author: Vstay
date: 2024-04-03 16:57
last_update:
  author: Vstay
  date: 2024-04-03
---
## Hadoop概述

### Hadoop是什么

1. Hadoop是一个由Apache基金会所开发的**分布式系统基础架构**。
2. 主要解决，海量数据的**存储**和海量数据的**分析计算**问题。
3. 广义上来说，Hadoop通常是指一个更广泛的概念——**Hadoop生态圈**。

### Hadoop优势（4高）

1. 高可靠性：Hadoop底层维护多个数据副本，所以即使Hadoop某个计算元素或存储出现故障，也不会导致数据的丢失。![image.png](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Hadoop_1_%E5%85%A5%E9%97%A8/202404031704381.png)
2. 高扩展性：在集群间分配任务数据，可方便的扩展数以千计的节点。![image.png](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Hadoop_1_%E5%85%A5%E9%97%A8/202404031705640.png)
3. 高效性：在MapReduce的思想下，Hadoop是并行工作的，以加快任务处理速度。![image.png](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Hadoop_1_%E5%85%A5%E9%97%A8/202404031707728.png)
4. 高容错性：能够自动将失败的任务重新分配。![image.png](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Hadoop_1_%E5%85%A5%E9%97%A8/202404031708891.png)

### Hadoop组成（面试重点）

- 在Hadoop1.x时代，Hadoop中的MapReduce同时处理业务逻辑运算和资源的调度，耦合性较大。
- **在Hadoop2.x时代，增加了Yarn。Yarn只负责资源的调度，MapReduce只负责运算。**
- Hadoop3.x在组成上没有变化。

![image.png](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Hadoop_1_%E5%85%A5%E9%97%A8/202404031709047.png)

#### HDFS架构概述

Hadoop Distributed File System，简称**HDFS**，是一个分布式文件系统。
1. NameNode（nn）：存储文件的**元数据，如文件名，文件目录结构，文件属性**（生成时间、副本数、文件权限），以及每个文件的**块列表**和**块所在的DataNode**等。
2. DataNode(dn)：在本地文件系统**存储文件块数据**，以及**块数据的校验和**。
3. Secondary NameNode(2nn)：**每隔一段时间对NameNode元数据备份**。

#### YARN架构概述

Yet Another Resource Negotiator简称YARN ，另一种资源协调者，是Hadoop的资源管理器。

1. ResourceManager（RM）：整个集群资源（内存、CPU等）的老大
2. NodeManager（NM）：单个节点服务器资源老大
3. ApplicationMaster（AM）：单个任务运行的老大
4. Container：容器，相当一台独立的服务器，里面封装了任务运行所需要的资源，**如内存、CPU、磁盘、网络等**。
> 说明：
> 1. 客户端可以有多个
> 2. 集群上可以运行多个ApplicationMaster
> 3. 每个NodeManager上可以有多个Container

![image.png](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Hadoop_1_%E5%85%A5%E9%97%A8/202404031717749.png)


#### MapReduce架构概述

MapReduce将计算过程分为两个阶段：Map和Reduce
1. Map阶段并行处理输入数据
2. Reduce阶段对Map结果进行汇总
![image.png](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Hadoop_1_%E5%85%A5%E9%97%A8/202404031719345.png)

#### HDFS、YARN、MapReduce三者关系

![image.png](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Hadoop_1_%E5%85%A5%E9%97%A8/202404031721742.png)

### 大数据技术生态体系

![image.png](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Hadoop_1_%E5%85%A5%E9%97%A8/202404031723668.png)

图中涉及的技术名词解释如下：

1. Sqoop：Sqoop是一款开源的工具，主要用于在Hadoop、Hive与传统的数据库（MySQL）间进行数据的传递，可以将一个关系型数据库（例如 ：MySQL，Oracle 等）中的数据导进到Hadoop的HDFS中，也可以将HDFS的数据导进到关系型数据库中。
2. Flume：Flume是一个高可用的，高可靠的，分布式的海量日志采集、聚合和传输的系统，Flume支持在日志系统中定制各类数据发送方，用于收集数据；
3. Kafka：Kafka是一种高吞吐量的分布式发布订阅消息系统； 
4. Spark：Spark是当前最流行的开源大数据内存计算框架。可以基于Hadoop上存储的大数据进行计算。
5. Flink：Flink是当前最流行的开源大数据内存计算框架。用于实时计算的场景较多。
6. Oozie：Oozie是一个管理Hadoop作业（job）的工作流程调度管理系统。
7. Hbase：HBase是一个分布式的、面向列的开源数据库。HBase不同于一般的关系数据库，它是一个适合于非结构化数据存储的数据库。
8. Hive：Hive是基于Hadoop的一个数据仓库工具，可以将结构化的数据文件映射为一张数据库表，并提供简单的SQL查询功能，可以将SQL语句转换为MapReduce任务进行运行。其优点是学习成本低，可以通过类SQL语句快速实现简单的MapReduce统计，不必开发专门的MapReduce应用，十分适合数据仓库的统计分析。
9. ZooKeeper：它是一个针对大型分布式系统的可靠协调系统，提供的功能包括：配置维护、名字服务、分布式同步、组服务等。

### 推荐系统框架图

![image.png](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Hadoop_1_%E5%85%A5%E9%97%A8/202404031726416.png)

## Hadoop目录结构

1. 查看Hadoop目录结构
```shell
[atguigu@hadoop102 hadoop-3.1.3]$ ll
总用量 52
drwxr-xr-x. 2 atguigu atguigu  4096 5月  22 2017 **bin**
drwxr-xr-x. 3 atguigu atguigu  4096 5月  22 2017 **etc**
drwxr-xr-x. 2 atguigu atguigu  4096 5月  22 2017 include
drwxr-xr-x. 3 atguigu atguigu  4096 5月  22 2017 **lib**
drwxr-xr-x. 2 atguigu atguigu  4096 5月  22 2017 libexec
-rw-r--r--. 1 atguigu atguigu 15429 5月  22 2017 LICENSE.txt
-rw-r--r--. 1 atguigu atguigu   101 5月  22 2017 NOTICE.txt
-rw-r--r--. 1 atguigu atguigu  1366 5月  22 2017 README.txt
drwxr-xr-x. 2 atguigu atguigu  4096 5月  22 2017 **sbin**
drwxr-xr-x. 4 atguigu atguigu  4096 5月  22 2017 **share**
```
2. 重要目录
- bin目录：存放对Hadoop相关服务（hdfs，yarn，mapred）进行操作的脚本
- etc目录：Hadoop的配置文件目录，存放Hadoop的配置文件
- lib目录：存放Hadoop的本地库（对数据进行压缩解压缩功能）
- sbin目录：存放启动或停止Hadoop相关服务的脚本
- share目录：存放Hadoop的依赖jar包、文档、和官方案例
## Hadoop运行模式

1. Hadoop官方网站：[http://hadoop.apache.org/](http://hadoop.apache.org/)
2. Hadoop运行模式包括：**本地模式**、**伪分布式模式**以及**完全分布式模式**。
    - Ø **本地模式**：单机运行，只是用来演示一下官方案例。**生产环境不用**。
    - Ø **伪分布式模式：**也是单机运行，但是具备Hadoop集群的所有功能，一台服务器模拟一个分布式的环境。**个别缺钱的公司用来测试，生产环境不用**。
    - Ø **完全分布式模式：**多台服务器组成分布式环境。生产环境使用。

## 集群分发脚本xsync

1. 安装 rsync远程同步工具
2. 配置host映射【略】
3. 配置SSH免密登录【略】
4. 编写xsync集群分发脚本

- `vi /usr/bin/xsync` 输入如下：

```shell
#! /bin/bash
#1 获取输入参数个数，如果没有参数，直接退出
pcount=$#
if [ $pcount -lt 1 ]
then
    echo No Enough Arguement!
    exit;
fi

#2. 遍历集群所有机器
for host in 192.168.58.130 192.168.58.131 192.168.58.132
do
    echo ====================    $host    ====================
    #3. 递归遍历所有目录
    for file in $@
    do
        #4 判断文件是否存在
        if [ -e $file ]
        then
            #5. 获取全路径
            pdir=$(cd -P $(dirname $file); pwd)
            echo pdir=$pdir
            
            #6. 获取当前文件的名称
            fname=$(basename $file)
            echo fname=$fname
            
            #7. 通过ssh执行命令：在$host主机上递归创建文件夹（如果存在该文件夹）
            ssh $host "source /etc/profile;mkdir -p $pdir"
            
            #8. 远程同步文件至$host主机的$USER用户的$pdir文件夹下
            rsync -av $pdir/$fname $USER@$host:$pdir
        else
            echo $file Does Not Exists!
        fi
    done
done

```
5. 赋予执行脚本执行权限
```shell
chmod +x /usr/bin/xsync
```
6. 测试
````shell
xsync filename/dirname
````

## 常见错误及解决方案

### DataNode和NameNode进程同时只能工作一个

 ![image.png](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Hadoop_1_%E5%85%A5%E9%97%A8/202404031927406.png)

### jps发现进程已经没有，但是重新启动集群，提示进程已经开启

原因是在Linux的根目录下/tmp目录中存在启动的进程临时文件，将集群相关进程删除
