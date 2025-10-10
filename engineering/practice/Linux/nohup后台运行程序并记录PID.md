---
title: nohup后台运行程序并记录PID
description: nohup后台运行程序并记录PID
keywords:
- nohup
tags:
- nohup
sidebar_position: 11
author: Vstay
date: 2025-10-10 15:18
last_update:
  author: Vstay
  date: 2025-10-10
---

## 最简单的nohup方式

使用`nohup`命令，最后加上`&`即可：

```sh
# nohup xxxx xxxx & 
nohup python train.py &
```

- `Ctrl + C`不会中断程序的执行；
- nohup会将所有的输出默认写入在当前路径的`nohup.out`文件中。

如下所示：  

![](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2025/nohup%E5%90%8E%E5%8F%B0%E8%BF%90%E8%A1%8C%E7%A8%8B%E5%BA%8F%E5%B9%B6%E8%AE%B0%E5%BD%95PID/20251010152114592.png)

如果你的程序有后缀参数，可以这样优雅的写：

```sh
nohup python train.py --log_iter 1 \ # 所有的参数最后加 \
                      --vis_log_iter 1 \
                      --nepochs 10 \
                      --bsz 10 \
                      & 			# 将 & 放在最后即可` 
```


## 指定log输出路径和文件的nohup方式

```sh
# nohup xxxx xxxx > xxx(ur_log_file) 2>&1 &
nohup python train.py > train.log 2>&1 &
```

- nohup会将所有的输出默认写入在你指定的的`log_file`文件中，我这里的就是`train.log`。
带参数优雅版：

```sh
nohup python train.py --log_iter 1 \ # 所有的参数最后加 \
                      --vis_log_iter 1 \
                      --nepochs 10 \
                      --bsz 10 \
                      > runs_seg/train.log 2>&1 &` 
```


## 指定log输出路径和文件并记录程序的PID

```sh
# nohup xxxx xxxx > xxx(ur_log_file) 2>&1 & echo $! > xxx(pid file)
nohup python train.py > train.log 2>&1 & echo $! > run.pid
```

- nohup会将所有的输出默认写入在你指定的的`log_file`文件中，我这里的就是`train.log`；
- 同时会将当前python的PID记录在`run.pid`中，方便你中止程序（一般训练中都用会使用多进程，所以实际上会有多个程序，但是nohup只会记录当前启动的那个程序的PID，不过不影响，因为你只要杀掉1个子进程，所有进程都会中止）。
![](https://cdn.jsdelivr.net/gh/Vstay97/Img_storage@main/blog/2025/nohup%E5%90%8E%E5%8F%B0%E8%BF%90%E8%A1%8C%E7%A8%8B%E5%BA%8F%E5%B9%B6%E8%AE%B0%E5%BD%95PID/20251010152435361.png)

## 运行bash脚本

```sh
# nohup sh xxxx.sh 可跟参数 > train.log 2>&1 &
nohup sh tools/dist_train_semi.sh configs/semi_bevdet/semi_bevdet_baseline.py 8 > train.log 2>&1 &
```
