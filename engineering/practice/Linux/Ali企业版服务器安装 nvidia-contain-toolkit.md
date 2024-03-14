---
title: Ali企业版服务器安装 nvidia-contain-toolkit
description: Ali企业版服务器安装 nvidia-contain-toolkit
keywords:
- Linux
- CentOS
- Redhat
- AliOS
- nvidia-contain-toolkit
tags:
- Linux
sidebar_position: 7
author: Vstay
date: 2024-03-14 22:25
last_update:
  author: Vstay
  date: 2024-03-14
---
## 查看依赖包

可以使用`yum deplist`命令来查找 rpm 包的依赖列表。例如，要查找`nvidia-contain-toolkit` rpm的依赖包：

```shell
$ yum deplist nvidia-contain-toolkit
```

## 下载依赖包

```shell
# 安装yum-utils 
$ yum -y install yum-utils

# 下载 ansible 全量依赖包
$ repotrack nvidia-contain-toolkit
```

## 安装过程

一定要按照顺序装！

```shell
yum localinstall -y libnvidia-container1-1.15.0~rc.3-1.x86_64.rpm
yum localinstall -y libnvidia-container-tools-1.15.0~rc.3-1.x86_64.rpm
yum localinstall -y nvidia-container-toolkit-base-1.15.0~rc.3-1.x86_64.rpm
yum localinstall -y nvidia-container-toolkit-1.15.0~rc.3-1.x86_64.rpm
```