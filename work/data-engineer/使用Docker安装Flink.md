---
title: 使用Docker安装Flink
description: 使用Docker安装Flink
keywords:
- Flink
- Docker
tags:
- Flink
sidebar_position: 2
author: Vstay
date: 2024-03-29 11:04
last_update:
  author: Vstay
  date: 2024-03-29
---
## 拉取Flink镜像，创建网络

```shell
docker pull flink
docker network create flink-network
```

## 创建 jobmanager

```shell
# 创建 JobManager 
 docker run \
  -itd \
  --name=jobmanager \
  --publish 8081:8081 \
  --network flink-network \
  --env FLINK_PROPERTIES="jobmanager.rpc.address: jobmanager" \
  flink:latest jobmanager 
```

## 创建 taskmanager

```shell
# 创建 TaskManager 
 docker run \
  -itd \
  --name=taskmanager \
  --network flink-network \
  --env FLINK_PROPERTIES="jobmanager.rpc.address: jobmanager" \
  flink:latest taskmanager 
```
## 访问

访问 `http://localhost:8081/`

![](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/%E4%BD%BF%E7%94%A8Docker%E5%AE%89%E8%A3%85Flink/202403291124215.png)

## 修改配置文件

注意：默认的docker容器中没有vi/vim命令，可以使用docker cp命令，复制出来修改，然后在复制回去，如下：
```shell
# jobmanager 容器
docker cp jobmanager:/opt/flink/conf ./JobManager/
# taskmanager 容器
docker cp taskmanager:/opt/flink/conf ./TaskManager/
```
修改的目录是jobmanager和taskmanager的`/opt/flink/conf`的`flink-conf.yaml`文件：
![](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/%E4%BD%BF%E7%94%A8Docker%E5%AE%89%E8%A3%85Flink/202403291124218.png)

### 修改web端口号

修改 `JobManager/conf/flink-conf.yaml` web 端口号为 18081
![image.png](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/%E4%BD%BF%E7%94%A8Docker%E5%AE%89%E8%A3%85Flink/202403291134415.png)

### 修改任务槽数

默认的Slots num是1
![](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/%E4%BD%BF%E7%94%A8Docker%E5%AE%89%E8%A3%85Flink/202403291124217.png)
我们可以修改为5，修改`taskmanager.numberOfTaskSlots:`即可。  ：  
![](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/%E4%BD%BF%E7%94%A8Docker%E5%AE%89%E8%A3%85Flink/202403291124219.png)

## 重新启动并挂载配置文件

```shell
# 启动 JobManager   
docker run -itd  -v /home/xps/桌面/dev/flink/JobManager/:/opt/flink/conf/ --name=jobmanager --publish 18081:18081 --env FLINK_PROPERTIES="jobmanager.rpc.address: jobmanager" --network flink-network flink:latest jobmanager
# 启动 TaskManager   
docker run -itd  -v /home/xps/桌面/dev/flink/TaskManager/:/opt/flink/conf/ --name=taskmanager --network flink-network --env FLINK_PROPERTIES="jobmanager.rpc.address: jobmanager"  flink:latest taskmanager
```

**参数解释：**

- `FLINK_PROPERTIES="jobmanager.rpc.address: jobmanager"`： rpc 地址，必须设置，否则 jobmanager 和 taskmanager 的 rpc 地址都是随机生成，会连接不上，当然你也可以在直接修改配置文件 flink-conf.yaml

如下两个容器启动成功，可以看到 web 端口为 18081，taskmanager 启动一个，包含 5 个任务槽

![image.png](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/%E4%BD%BF%E7%94%A8Docker%E5%AE%89%E8%A3%85Flink/202403291440209.png)

