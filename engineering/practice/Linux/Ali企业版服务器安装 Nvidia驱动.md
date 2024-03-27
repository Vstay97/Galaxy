---
title: 阿里云专有云Enterprise版安装 Nvidia驱动
description: Alibaba Group Enterprise Linux Server release 7.2 (Paladin) 安装 Nvidia驱动
keywords:
- Linux
- CentOS
- Redhat
- AliOS
- nvidia-contain-toolkit
- Alibaba Group Enterprise Linux Server release 7.2 (Paladin)
tags:
- Linux
sidebar_position: 1
author: Vstay
date: 2024-03-27 19:39
last_update:
  author: Vstay
  date: 2024-03-27
---
## 查看GPU显卡

`lspci |grep -i nvidia`

![](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Ali%E4%BC%81%E4%B8%9A%E7%89%88%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AE%89%E8%A3%85Nvidia%E9%A9%B1%E5%8A%A8/202403271954268.png)

`nvidia-smi`

![](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Ali%E4%BC%81%E4%B8%9A%E7%89%88%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AE%89%E8%A3%85Nvidia%E9%A9%B1%E5%8A%A8/202403271954269.png)
## GPU显卡驱动

**nvidia驱动为例，官网下载驱动**

https://www.nvidia.cn/Download/index.aspx?lang=cn

![](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Ali%E4%BC%81%E4%B8%9A%E7%89%88%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AE%89%E8%A3%85Nvidia%E9%A9%B1%E5%8A%A8/202403271954270.png)

安装报错解决：

https://support.huawei.com/enterprise/zh/doc/EDOC1100128448/3f25d09f

需上传编译过GCC镜像文件

`pseudo-gcc-6.5.1.img`

--------------------------------------------------------------------------

使用pseudo-gcc-6.5.1.img编译的镜像GCC：

`mkdir -p /home/makegcc/dist`

`mount /fdocr/pseudo-gcc-6.5.1.img /home/makegcc/dist`

`export PATH=/home/makegcc/dist/bin:$PATH`

`export LD_LIBRARY_PATH=/home/makegcc/dist/gmp/lib:/home/makegcc/dist/mpfr/lib:/home/makegcc/dist/mpc/lib:$LD_LIBRARY_PATH`

`mv /usr/bin/cc /usr/bin/cc.bak`

`ln -s /home/makegcc/dist/bin/gcc /usr/bin/cc`


`/fdocr/NVIDIA-Linux-x86_64-515.105.01.run`

`mv /usr/bin/cc.bak /usr/bin/cc`

`umount /home/makegcc/dist/`

---------------------------------------------------------------------------

## Linux系统nouveau驱动禁用方式：

RHEL/CentOS

创建文件`/etc/modprobe.d/blacklist-nouveau.conf`，添加如下文本。

```
blacklist nouveau
options nouveau modeset=0
```

重新生成initramfs。

`$sudo dracut --force`

---------------------------------------------------------------------------
![](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Ali%E4%BC%81%E4%B8%9A%E7%89%88%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AE%89%E8%A3%85Nvidia%E9%A9%B1%E5%8A%A8/202403271954271.png)
![](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Ali%E4%BC%81%E4%B8%9A%E7%89%88%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AE%89%E8%A3%85Nvidia%E9%A9%B1%E5%8A%A8/202403271954272.png)

![](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Ali%E4%BC%81%E4%B8%9A%E7%89%88%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AE%89%E8%A3%85Nvidia%E9%A9%B1%E5%8A%A8/202403271954273.png)

![](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Ali%E4%BC%81%E4%B8%9A%E7%89%88%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AE%89%E8%A3%85Nvidia%E9%A9%B1%E5%8A%A8/202403271954274.png)

![](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Ali%E4%BC%81%E4%B8%9A%E7%89%88%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AE%89%E8%A3%85Nvidia%E9%A9%B1%E5%8A%A8/202403271954275.png)

![](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Ali%E4%BC%81%E4%B8%9A%E7%89%88%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AE%89%E8%A3%85Nvidia%E9%A9%B1%E5%8A%A8/202403271954276.png)

![](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Ali%E4%BC%81%E4%B8%9A%E7%89%88%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AE%89%E8%A3%85Nvidia%E9%A9%B1%E5%8A%A8/202403271954277.png)