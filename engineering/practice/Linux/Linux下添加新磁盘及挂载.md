---
author: Vstay
date: 2022-04-25 02:05:44
description: Linux下添加新磁盘及挂载
last_update:
  author: Vstay
  date: 2022-04-25 02:05:44
sidebar_position: 2
tags:
- Linux
- Ubuntu
title: Linux下添加新磁盘及挂载
---

磁盘容量:

- 2T以下:`fdisk`命令
- 2T以上:`parted`命令

<!-- more-->

## 磁盘容量2T及其以下

Fdisk最大只能创建2T分区的盘，超过2T使用parted

### 查看磁盘

以 root用户登录，执行`fdisk -lu`查看所有磁盘信息

```shell
$ fdisk -lu
```

![image-20220425002840015](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Linux%E4%B8%8B%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%A3%81%E7%9B%98%E5%8F%8A%E6%8C%82%E8%BD%BD/image-20220425002840015-16508237114471.png)

### 创建分区

进入磁盘`/dev/sdb`命令：`fdisk /dev/sdb` 

输入`m`查看命令帮助如下：

```shell
$ fdisk /dev/sdb
```

```shell
admin123@admin123-P8000:~$ sudo fdisk /dev/sdb

欢迎使用 fdisk (util-linux 2.34)。
更改将停留在内存中，直到您决定将更改写入磁盘。
使用写入命令前请三思。


命令(输入 m 获取帮助)： m

帮助：
###
  GPT
   M   进入 保护/混合 MBR

  常规
   d   删除分区
   F   列出未分区的空闲区
   l   列出已知分区类型
   n   添加新分区
   p   打印分区表
   t   更改分区类型
   v   检查分区表
   i   打印某个分区的相关信息

  杂项
   m   打印此菜单
   x   更多功能(仅限专业人员)

  脚本
   I   从 sfdisk 脚本文件加载磁盘布局
   O   将磁盘布局转储为 sfdisk 脚本文件

  保存并退出
   w   将分区表写入磁盘并退出
   q   退出而不保存更改

  新建空磁盘标签
   g   新建一份 GPT 分区表
   G   新建一份空 GPT (IRIX) 分区表
   o   新建一份的空 DOS 分区表
   s   新建一份空 Sun 分区表
```

输入`n`进行分区:

![image-20220425003232813](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Linux%E4%B8%8B%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%A3%81%E7%9B%98%E5%8F%8A%E6%8C%82%E8%BD%BD/image-20220425003232813-16508237114482.png)

**一定记得输入w才能保存分区更改**

### 查看新增分区 /dev/sdb1

```shell
$ fdisk -l
```

![image-20220425003411694](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Linux%E4%B8%8B%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%A3%81%E7%9B%98%E5%8F%8A%E6%8C%82%E8%BD%BD/image-20220425003411694-16508237114483.png)

### 格式化

```shell
$ mkfs.ext4 /dev/sdb1
```

![image-20220425003505344](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Linux%E4%B8%8B%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%A3%81%E7%9B%98%E5%8F%8A%E6%8C%82%E8%BD%BD/image-20220425003505344-16508237114484.png)

### 挂载

建立`/opt/app`目录

```shell
$ mkdir /opt/app
```

挂载

```shell
$ mount /dev/sdb1 /opt/app
```

查看

```shell
$ df -h
```

![image-20220425005313867](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Linux%E4%B8%8B%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%A3%81%E7%9B%98%E5%8F%8A%E6%8C%82%E8%BD%BD/image-20220425005313867-16508237114485.png)

### 配置开机自动挂载

```shell
$ vim /etc/fstab
```

后面追加一行：

```shell
/dev/sdb1(磁盘分区)  /opt/app（挂载目录） ext4（文件格式）defaults  0  0
```

### fdisk命令小结

```shell
1. 查看可用的磁盘
[root@VM_16_9_centos ~]# fdisk -l /dev/vd[a-z]
 
Disk /dev/vda: 53.7 GB, 53687091200 bytes, 104857600 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x0005fc9a
 
   Device Boot      Start         End      Blocks   Id  System
/dev/vda1   *        2048   104857599    52427776   83  Linux
 
Disk /dev/vdb: 75.2 GB, 75161927680 bytes, 146800640 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x0005fc9a
 
   Device Boot      Start         End      Blocks   Id  System
/dev/vdb1   *        2048   104857599    52427776   83  Linux
 
解释说明：
sectors（或者显示是cylinders）# 柱面总数
Device Boot      Start         End      Blocks   Id  System
Device  ## 设备文件路径
Boot    ## 是否为引导加载器、kernle所在的分区，用*表示
Start   ## 起始柱面 分区划分：按柱面，由外向内，编号依次增大
End     ## 结束柱面
Blocks  ## 磁盘块数
Id      ## id标示
System  ## 系统标示
 
注意：结束柱面不等于总柱面数即可分区，除了System: Extended的分区
 
2. 修改分区表
[root@localhost ~]# fdisk /dev/vdb
    n 创建一个新分区
    d 删除
    l 列出分区的id标示
    t 调整id
    q 退出
    w 保存退出
    m manual
    p 显示分区表信息
 
4. 创建分区，修改id。比如修改分区id为82
[root@localhost ~]# fdisk /dev/vdb
........
........
Command (m for help): n
First cylinder (14119-15665, default 14119):
Using default value 14119
Last cylinder, +cylinders or +size{K,M,G} (14119-15665, default 15665): +10G
Command (m for help): t
Partition number (1-5): 5
Hex code (type L to list codes): 82      ##则创建的改分区id为82
Changed system type of partition 5 to 82 (Linux *** / Solaris)
 
5. 让内核识别添加的新分区
内核是否识别添加的新分区
[root@localhost ~]# ls /dev/vdb*
[root@localhost ~]# cat /proc/partitions
 
重读分区表
[root@localhost ~]# partx -a /dev/vdb
[root@localhost ~]# partx -a /dev/vdb
 
更新分区表
[root@localhost ~]# partprobe /dev/vdb2   # vdb2是新创建出来的分区
 
6. 查看文件系统属性信息
查看TYPE,LABEL,UUID
[root@localhost ~]# blkid /dev/vdb2
 
查看默认挂载属性、超级块信息
[root@localhost ~]# tune2fs  -l /dev/vdb2
[root@localhost ~]# dumpe2fs -h /dev/vdb2
 
查看块组信息
[root@localhost ~]# dumpe2fs /dev/vdb2
```

## 磁盘容量2T以上

下面开始使用parted工具

### 进行分区创建

![image-20220425014633025](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Linux%E4%B8%8B%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%A3%81%E7%9B%98%E5%8F%8A%E6%8C%82%E8%BD%BD/image-20220425014633025-16508237114486.png)

### 查看当前分区情况

![image-20220425014750389](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Linux%E4%B8%8B%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%A3%81%E7%9B%98%E5%8F%8A%E6%8C%82%E8%BD%BD/image-20220425014750389-16508237114487.png)

> 如果出现错误: 无法分表磁盘卷标,可以重新定义一下分区表格式
>
> ![image-20220425015122164](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Linux%E4%B8%8B%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%A3%81%E7%9B%98%E5%8F%8A%E6%8C%82%E8%BD%BD/image-20220425015122164-16508237114488.png)

### 定义分区表格式

![image-20220425015415492](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Linux%E4%B8%8B%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%A3%81%E7%9B%98%E5%8F%8A%E6%8C%82%E8%BD%BD/image-20220425015415492-16508237114489.png)

查看信息

```shell
fdisk -l
```

### 再次格式化

![image-20220425015539956](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Linux%E4%B8%8B%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%A3%81%E7%9B%98%E5%8F%8A%E6%8C%82%E8%BD%BD/image-20220425015539956-165082371144810.png)

### 挂载

建立`/data`目录

```shell
$ mkdir /data
```

挂载

```shell
$ mount /dev/sdc1 /data
```

查看

```shell
$ df -h
```

![image-20220425015816256](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Linux%E4%B8%8B%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%A3%81%E7%9B%98%E5%8F%8A%E6%8C%82%E8%BD%BD/image-20220425015816256-165082371144811.png)

### 配置开机自动挂载

```shell
$ vim /etc/fstab
```

后面追加一行：

```shell
/dev/sdc1  /data ext4 defaults 0 0
```

### parted命令小结

![image-20220425020126893](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Linux%E4%B8%8B%E6%B7%BB%E5%8A%A0%E6%96%B0%E7%A3%81%E7%9B%98%E5%8F%8A%E6%8C%82%E8%BD%BD/image-20220425020126893-165082371144812.png)

