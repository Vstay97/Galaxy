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
    
-----------------------------------------
结果:
    
测试Python多进程
测试Python多进程
测试Python多进程
测试Python多进程
测试Python多进程
结束测试

Process finished with exit code 0
```

上面这个例子可以看到, 多线程代码的建立是通过`Process()`来实现的. 属于非常简洁的实现方式

结合开始`Process`类的说明, 可以看到: 

- 在实例化进程对象时`fun1`就是每个子进程需要执行的方法了
- `args`中传递的是, 每个子进程所执行的那个方法需要的参数

### 方法二: 类继承

```python
from multiprocessing import  Process

class MyProcess(Process): #继承Process类
    def __init__(self,name):
        super(MyProcess,self).__init__()
        self.name = name

    def run(self):
        print('测试%s多进程' % self.name)


if __name__ == '__main__':
    process_list = []
    for i in range(5):  #开启5个子进程执行fun1函数
        p = MyProcess('Python') #实例化进程对象
        p.start()
        process_list.append(p)

    for i in process_list:
        p.join()

    print('结束测试')
    
-------------------------------------
结果:
    
测试Python多进程
测试Python多进程
测试Python多进程
测试Python多进程
测试Python多进程
结束测试

Process finished with exit code 0
```

可以看到, 效果和方法一几乎一样.

### 方法三: 线程池(推荐)

进程池内部维护一个进程序列，当使用时，则去进程池中获取一个进程，如果进程池序列中没有可供使用的进进程，那么程序就会等待，直到进程池中有可用进程为止。就是固定有几个进程可以使用。

进程池中有两个方法：

`apply`：同步，一般不使用

`apply_async`：异步

```python
from  multiprocessing import Process,Pool
import os, time, random

def fun1(name):
    print('Run task %s (%s)...' % (name, os.getpid()))
    start = time.time()
    time.sleep(random.random() * 3)
    end = time.time()
    print('Task %s runs %0.2f seconds.' % (name, (end - start)))

if __name__=='__main__':
    pool = Pool(5) #创建一个5个进程的进程池

    for i in range(10):
        pool.apply_async(func=fun1, args=(i,))

    pool.close()
    pool.join()
    print('结束测试')
    
---------------------------------------------------
结果:

Run task 0 (37476)...
Run task 1 (4044)...
Task 0 runs 0.03 seconds.
Run task 2 (37476)...
Run task 3 (17252)...
Run task 4 (16448)...
Run task 5 (24804)...
Task 2 runs 0.27 seconds.
Run task 6 (37476)...
Task 1 runs 0.58 seconds.
Run task 7 (4044)...
Task 3 runs 0.98 seconds.
Run task 8 (17252)...
Task 5 runs 1.13 seconds.
Run task 9 (24804)...
Task 6 runs 1.46 seconds.
Task 4 runs 2.73 seconds.
Task 8 runs 2.18 seconds.
Task 7 runs 2.93 seconds.
Task 9 runs 2.93 seconds.
结束测试
```

## 如何执行多个方法

在上面的案例中可以看到, 每个进程执行的方法虽然可以接受多个参数, 但并不能执行多个方法. 当程序的逻辑变复杂时, 一个方法往往是不够的, 所以就需要每个子进程来各自执行不同的方法.

执行多个方法的途径有很多, 我想到的有利用管道来对进程间通信, 然后传递参数来执行方法. 这种方法执行起来, 逻辑其实并不清晰, 所以我选择了另一种方式来实现, 即 `类的实例化`.

因为不用考虑进程间的通信, 所以主要思路是这样的:

- 每个进程实例化一个类对象
- 每个子进程的实现逻辑通过`__init__()`来进行设计
- 每个子进程需要用到的参数, 在实例化时就传递进去

实例:

```python
class MutilProcess:
    def __init__(self, arg1, arg2, arg3):
        self.fun1(arg1)
        self.fun2(arg2)
        self.fun3(arg3)

    def fun1(self,arg1):
		pass

    def fun2(self,arg2):
		pass
    
    def fun3(self,arg3):
        pass
    
if __name__ == "__main__":
    pool = Pool(PROCESS_NUMBERS)  # n个进程的进程池
    for i in range(0,PROCESS_NUMBERS):
        pool.apply_async(func=MutilProcess, args=(arg1,arg2,arg3))
        
    pool.close()
    pool.join()
```

