---
author: Vstay
date: 2022-04-20 12:30:39
description: Ubuntu开启SSH服务远程登录
last_update:
  author: Vstay
  date: 2022-04-20 12:30:39
sidebar_position: 1
tags:
- Ubunth
- SSH
title: Ubuntu开启SSH服务远程登录
---

ssh方便一个开发小组中人员登录一台服务器，从事代码的编写、编译、运行。方便代码的共享及管理。ssh是一种安全协议，主要用于给远程登录会话数据进行加密，保证数据传输的安全。

<!-- more-->

## SSH分客户端openssh-client和openssh-server

如果你只是想登陆别的机器的SSH只需要安装openssh-client（ubuntu有默认安装，如果没有则sudo apt-get install openssh-client），如果要使本机开放SSH服务就需要安装openssh-server。

## 查看当前的ubuntu是否安装了ssh-server服务。

默认只安装ssh-client服务。

`dpkg -l | grep ssh`

![image-20220420123729888](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Ubuntu%E5%BC%80%E5%90%AFSSH%E6%9C%8D%E5%8A%A1%E8%BF%9C%E7%A8%8B%E7%99%BB%E5%BD%95/image-20220420123729888.png)

## 安装ssh-server服务

`sudo apt-get install openssh-server`

![image-20220420123955885](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Ubuntu%E5%BC%80%E5%90%AFSSH%E6%9C%8D%E5%8A%A1%E8%BF%9C%E7%A8%8B%E7%99%BB%E5%BD%95/image-20220420123955885.png)

再次查看安装的服务：

`dpkg -l | grep ssh`

![image-20220420124025710](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Ubuntu%E5%BC%80%E5%90%AFSSH%E6%9C%8D%E5%8A%A1%E8%BF%9C%E7%A8%8B%E7%99%BB%E5%BD%95/image-20220420124025710.png)

然后确认ssh-server是否启动了：

`ps -e | grep ssh`

![image-20220420124052506](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@master/blog/2022/Ubuntu%E5%BC%80%E5%90%AFSSH%E6%9C%8D%E5%8A%A1%E8%BF%9C%E7%A8%8B%E7%99%BB%E5%BD%95/image-20220420124052506.png)

如果看到sshd那说明ssh-server已经启动了。

如果没有则可以这样启动：

`sudo /etc/init.d/ssh start或sudo service ssh start`

配置相关：

`ssh-server`配置文件位于`/etc/ssh/sshd_config`，在这里可以定义SSH的服务端口，默认端口是22，你可以自己定义成其他端口号，如222。（或把配置文件中的`PermitRootLogin without-password`加一个`#`号,把它注释掉，再增加一句`PermitRootLogin yes`）

然后重启SSH服务：

`sudo /etc/init.d/ssh stop`

`sudo /etc/init.d/ssh start`

## 登陆SSH（Linux）

`ssh username@192.168.1.103`

其中，`username`为`192.168.1.103`机器上的用户，需要输入密码。

断开连接：`exit`

## 问题解决

### 问题

安装openssh-server

`apt install openssh-server`

没有安装成功，并且收到如下提示：

下列软件包有未满足的依赖关系：

```
 openssh-server : 依赖: openssh-client (= 1:8.2p1-4)
                  依赖: openssh-sftp-server
                  推荐: ssh-import-id 但是它将不会被安装
E: 无法修正错误，因为您要求某些软件包保持现状，就是它们破坏了软件包间的依赖关系。
```

### 解决方法

这是因为,`openssh-server`是依赖于`openssh-client`的，ubuntu自带的`openssh-client`的`openssh-client`与所要安装的`openssh-server`所依赖的版本不同，这里所依赖的版本是 `1:8.2p1-4`

所以要安装对应版本的`openssh-client`，来降级覆盖掉ubuntu自带的`openssh-client`：

`apt-get install openssh-client=1:8.2p1-4`

返回信息：

```
正在读取软件包列表... 完成
正在分析软件包的依赖关系树       
正在读取状态信息... 完成       
建议安装：
  keychain libpam-ssh monkeysphere ssh-askpass
下列软件包将被【降级】：
  openssh-client
升级了 0 个软件包，新安装了 0 个软件包，降级了 1 个软件包，要卸载 0 个软件包，有 14 个软件包未被升级。
需要下载 674 kB 的归档。
解压缩后会消耗 0 B 的额外空间。
您希望继续执行吗？ [Y/n] y
获取:1 http://archive.ubuntu.com/ubuntu focal/main amd64 openssh-client amd64 1:8.2p1-4 [674 kB]
已下载 674 kB，耗时 4秒 (185 kB/s)      
dpkg: 警告: 即将把 openssh-client 从 1:8.2p1-4ubuntu0.1 降级到 1:8.2p1-4
(正在读取数据库 ... 系统当前共安装有 188187 个文件和目录。)
准备解压 .../openssh-client_1%3a8.2p1-4_amd64.deb  ...
正在解压 openssh-client (1:8.2p1-4) 并覆盖 (1:8.2p1-4ubuntu0.1) ...
正在设置 openssh-client (1:8.2p1-4) ...
正在处理用于 man-db (2.9.1-1) 的触发器 ...
```

然后再安装openssh

`apt-get install openssh-server`

验证是否安装：

`dpkg -l |grep ssh`

```
i  libssh-4:amd64                             0.9.3-2ubuntu2.1                                       amd64        tiny C SSH library (OpenSSL flavor)
ii  openssh-client                             1:8.2p1-4                                              amd64        secure shell (SSH) client, for secure access to remote machines
ii  openssh-server                             1:8.2p1-4                                              amd64        secure shell (SSH) server, for secure access from remote machines
ii  openssh-sftp-server                        1:8.2p1-4                                              amd64        secure shell (SSH) sftp server module, for SFTP access from remote machines
ii  python3-paramiko                           2.6.0-2                                                all          Make ssh v2 connections (Python 3)
ii  ssh-import-id                              5.10-0ubuntu1                                          all          securely retrieve an SSH public key and install it locally
```

验证是否运行：

`ps -e |grep ssh`

```
  16583 ?        00:00:00 ssh-agent
  69385 ?        00:00:00 sshd
```

提示：有的时候，不仅报一个依赖错误，覆盖安装一个之后还会报另外一个依赖错误，这时候依旧采用覆盖安装的方法即可。
