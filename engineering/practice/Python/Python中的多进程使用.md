---
author: Vstay
date: 2022-11-04 18:37:17
description: Python中的多进程使用
last_update:
  author: Vstay
  date: 2022-11-04 18:37:17
sidebar_position: 1
tags:
- Python
- 多进程
title: Python中的多进程使用
---



多进程、多线程、协程都是很常见的概念, 关于他们之间的区别 网上教程很多, 这里就不赘述了. 因为最近需要用到, 所以在这里着重写一下多进程的使用. 

Python中的多进程是通过`multiprocessing`包来实现的，和多线程的`threading.Thread`差不多，它可以利用`multiprocessing.Process`对象来创建一个进程对象。

这个进程对象的方法和线程对象的方法差不多, 也有`start()`, `run()`, `join()`等方法，其中有一个方法不同Thread线程对象中的守护线程方法是`setDeamon`，而Process进程对象的守护进程是通过设置`daemon`属性来完成的。

多的不谈, 来看看多进程是怎么使用的

<!-- more-->

##  实现方法

在写具体的实现方法之前, 还需要对`Process`这个类的一些方法和参数进行说明:

```text
Process([group [, target [, name [, args [, kwargs]]]]])
　　group: 线程组 
　　target: 要执行的方法
　　name: 进程名
　　args/kwargs: 要传入方法的参数

实例方法：
　　is_alive()：返回进程是否在运行,bool类型。
　　join([timeout])：阻塞当前上下文环境的进程程，直到调用此方法的进程终止或到达指定的timeout（可选参数）。
　　start()：进程准备就绪，等待CPU调度
　　run()：strat()调用run方法，如果实例进程时未制定传入target，这star执行t默认run()方法。
　　terminate()：不管任务是否完成，立即停止工作进程

属性：
　　daemon：和线程的setDeamon功能一样
　　name：进程名字
　　pid：进程号
```

### 方法一: Process

```python
from multiprocessing import  Process

def fun1(name):
    print('测试%s多进程' %name)

if __name__ == '__main__':
    process_list = []
    for i in range(5):  #开启5个子进程执行fun1函数
        p = Process(target=fun1,args=('Python',)) #实例化进程对象
        p.start()
        process_list.append(p)

    for i in process_list:
        p.join()

    print('结束测试')
    
--------------------------------------