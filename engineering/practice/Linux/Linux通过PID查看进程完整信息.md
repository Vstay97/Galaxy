---
title: # Linux通过PID查看进程完整信息
description: # Linux通过PID查看进程完整信息
keywords:
- Linux
tags:
- Linux
sidebar_position: 10
author: Vstay
date: 2024-05-09 10:17
last_update:
  author: Vstay
  date: 2024-05-09
---
通过ps及top命令查看进程信息时，只能查到相对路径，查不到的进程的详细信息，如绝对路径等。

先通过top查看进程PID

![image.png](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Linux%E9%80%9A%E8%BF%87PID%E6%9F%A5%E7%9C%8B%E8%BF%9B%E7%A8%8B%E5%AE%8C%E6%95%B4%E4%BF%A1%E6%81%AF/202405091021317.png)

这时，我们需要通过以下的方法来查看进程的详细信息：

Linux在启动一个进程时，系统会在/proc下创建一个以PID命名的文件夹，在该文件夹下会有我们的进程的信息，其中包括一个名为exe的文件即记录了绝对路径，通过`ll`或`ls –l`命令即可查看。

![image.png](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Linux%E9%80%9A%E8%BF%87PID%E6%9F%A5%E7%9C%8B%E8%BF%9B%E7%A8%8B%E5%AE%8C%E6%95%B4%E4%BF%A1%E6%81%AF/202405091023823.png)

![image.png](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2024/Linux%E9%80%9A%E8%BF%87PID%E6%9F%A5%E7%9C%8B%E8%BF%9B%E7%A8%8B%E5%AE%8C%E6%95%B4%E4%BF%A1%E6%81%AF/202405091025343.png)

其中：
- cwd符号链接的是进程运行目录；
- exe符号连接就是执行程序的绝对路径；
- cmdline就是程序运行时输入的命令行命令；
- environ记录了进程运行时的环境变量；
- fd目录下是进程打开或使用的文件的符号连接。