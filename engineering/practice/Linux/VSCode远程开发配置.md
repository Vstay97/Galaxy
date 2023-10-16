---
author: Vstay
date: 2022-10-14 17:13:40
description: VSCode远程开发配置
last_update:
  author: Vstay
  date: 2022-10-14 17:13:40
sidebar_position: 3
tags:
- VSCode
- IDE
title: VSCode远程开发配置
---

偷懒版本:

> 直接cat 本地的`id_rsa.pub`，然后复制内容。在到服务器的`~/.ssh/authorized_keys`中，新增一行
>
> ```shell
> # 客户端
> cat ~/.ssh/id_rsa.pub
> # 服务端
> vim ~/.ssh/authorized_keys
> ```

1. 本机安装ssh，check ssh是否安装成功： ssh 或者 ssh-V

2. vscode安装remote development 插件

3. 配置密钥
   1. 在本地机器生成密钥对(公钥+私钥)：`ssh-keygen`
   2. 私钥放本机，公钥放远程(~/.ssh路径下)
   3. 在远程机器用公钥生成`authorized_keys`：
      - 进入home目录下的.ssh文件夹：`cd ~/.ssh`
      - `cat id_rsa.pub >> authorized_keys`
   4. vscode的config文件加入本机私钥路径

<!-- more-->

## 细节如下

1. 本地机器安装ssh（windows系统）

- SSH全称Secure Sheel，是一个远程连接的协议，需要在本机上安装ssh才能够远程连接到server。
- check ssh是否安装成功：

（1）在terminal中输入ssh ，出现如下信息表明安装成功

![img](https://pic4.zhimg.com/v2-ba7c856e6cbd9bbad18f955858874737_b.jpg)

（2）或者输入ssh -V，出现已安装的ssh版本，代表安装成功

![img](https://pic4.zhimg.com/v2-806046c13951659faa315e9e7031e5d3_b.jpg)





2. vscode安装remote development 插件

（1）点击： Extensions （vscode界面左侧）

![img](https://pic2.zhimg.com/v2-6bff36a799659bd9173553914f5b7f0d_b.jpg)

（2）在搜索框中搜索，点击安装

![img](https://pic3.zhimg.com/v2-ee01b8dbc44664ca90e7279135aacb8e_b.jpg)

（3）Enable 该插件

![img](https://pic3.zhimg.com/v2-6150802ccdcce5c759d2725c3429ebbe_b.jpg)





3. 配置密钥

（1）用【ssh-keygen】命令来生成密钥对：

- id_rsa.pub是公钥，id_rsa是私钥。

![img](https://pic2.zhimg.com/v2-3eaa79dff5e3e568b4944457d5f72bb1_b.jpg)

- 如果多平台都要使用ssh，则需要修改密钥文件名，避免冲突：

![img](https://pic4.zhimg.com/v2-3d1d0aa68bdc29117a46c55db4daa673_b.jpg)



（2）公钥放server(远程主机)上，私钥放本机上。

- 进入刚才密钥对保存的folder（C:\Users\10747/.ssh），把.pub后缀的公钥传输到server上（可以用scp命令）
- 公钥放在server的**~/.ssh**文件夹中



（3）进入server 的~/**.ssh 文件夹**，使用【cat】命令，用公钥文件来生成 authorized_keys。

- 生成完之后输入【ls】可看到当前路径多了一个authorized_keys文件。

![img](https://pic1.zhimg.com/v2-a45d59506c3d9956ec3db1be46128388_b.jpg)



（4）修改vscode的config file，加入 IdentityFile 和对应的**本机私钥**路径

① 打开.ssh/config文件

![img](https://pic3.zhimg.com/v2-c59f3fd2682ffc4a22ba6c422f5f4bd2_b.jpg)

![img](https://pic3.zhimg.com/v2-9af4fa46dc08b2e247abfc796925d50a_b.jpg)



② 修改.ssh/config文件：加入IdentityFile的路径（也就是私钥在本机的所在位置）

![img](https://pic2.zhimg.com/v2-5abda2cf882caa20ee0e2d7a332c763d_b.jpg)

这时候再用vscode登录server就不用输入密码了！



> 原文链接：[配置vscode 远程开发+ 免密登录](https://zhuanlan.zhihu.com/p/222452460)
