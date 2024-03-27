---
title: Python环境打包
description: Python环境打包
keywords:
- pyhton
- conda
tags:
- python
- conda
sidebar_position: 1
author: Vstay
date: 2024-03-27 19:55
last_update:
  author: Vstay
  date: 2024-03-27
---

## Conda环境整体打包
### 第一步先下载conda pack

```bash
pip install conda-pack
```

### 第二步“打包原环境”

先用`conda info -e` 查看一下环境名称

![](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Python%E7%8E%AF%E5%A2%83%E6%89%93%E5%8C%85/202403272012339.png)

然后开始打包 `conda pack -n codeshell_env`

### 第三步“还原环境”

先用 `which python`找到conda的安装目录，再将`codeshell_env.tar.gz`解压到`/xxx/xxx/anaconda3/envs`下

1. 先创建个文件夹
    - `mkdir codeshell`
2. 解压
    - `tar -xzvf codeshell_env.tar.gz -C /xxxx/xxxx/anaconda3/envs/codeshell

### 第四步查看结果

`conda info -e`

## pip下载离线包和离线包安装

假设安装的包是 `spark`

1、**先在本地创建一个文件夹**用来存放离线包，路径是`C:/tools/python_donw`

2、下载离线包的命令格式

`pip3 download -d [path] [package]`

转成命令

`pip3 download -d C:\tools\python_down pyspark`

3、使用ssh2协议将下载好的离线文件传到linux服务器上，传的服务器的路径是`/home/hadoop/tools/python_down`

4、安装离线包的命令格式

`pip3 install --no-index --find-link [path] [package]`

转成命令

`pip3 install --no-index --find-link /home/hadoop/tools/python_down pyspark`

