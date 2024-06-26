---
title: Linux 命令行操作
description: Linux 的命令行操作
keywords:
- Linux 
- 命令行操作
tags:
- Linux
sidebar_position: 2
author: Vstay
date: 2023-03-22
---

一台完整的计算机是由运算器、控制器、存储器、输入/输出等多种硬件设备共同组成的，而能让各种硬件设备各司其职且又能协同运行的东西就是系统内核。Linux 系统的内核负责完成对硬件资源的分配、调度等管理任务，对系统的正常运行起着十分重要的作用。
Shell 就是终端程序的统称，它充当了人与内核（硬件）之间的翻译官，用户把一些命令告诉终端程序，它就会调用相应的程序服务去完成某些工作。现在包括红帽系统在内的**许多主流 Linux 系统默认使用的终端是 Bash（Bourne-Again SHell）解释器**，这个 Bash 解释器主要有以下4项优势：

- 通过上下方向键来调取执行过的 Linux 命令；
- 命令或参数仅需输入前几位就可以用 Tab 键补全；
- 具有强大的批处理脚本；
- 具有实用的环境变量功能。

## 执行命令

```shell
命令名称    [命令参数]    [命令对象]
```

可选择的、可加或可不加的、非必需的参数使用中括号引起来，而命令所要求的、必须有的参数或对象值，则不带中括号。

- **命令名称**：就是语法中的动词，表达的是**想要做的事情**，例如创建用户、查看文件、重启系统等操作。

- **命令参数**：用于**对命令进行调整**，让修改过的命令能更好地贴合工作需求，达到事半功倍的效果。

Linux命令参数的长格式与短格式示例：

| 类别   | 示例       |
| ------ | ---------- |
| 长格式 | man --help |
| 短格式 | man -h     |

- **命令对象**：一般指要处理的文件、目录、用户等资源名称，也就是**命令执行后的承受方**。例如创建一位叫小明的用户、查看一个叫工资表的文件、重启一个 IP 为 192.168.10.10 的系统等。

Linux系统中的**命令、参数、对象都是严格区分大小写**的。

## 目录移动

Linux 终端执行命令的很多情况下需要经常的更换目录，cd 命令、pushd 命令、popd 命令可以快速移动目录。

-   cd：回到当前用户目录。
-   cd ~：回到当前用户目录（方便切换到其他用户目录）。
-   cd -：回到上次工作的目录。
-   pushd path：存入 path 目录到目录栈。
-   popd：移动到目录栈弹出的目录。

```shell
# 使用 `cd` 命令回到当前用户目录
$ cd
$ pwd
/home/username

# 使用 `cd ~` 命令也可以回到当前用户目录
$ cd ~
$ pwd
/home/username

# 使用 `cd -` 命令回到上次工作的目录
$ cd /tmp
$ cd -
$ pwd
/home/username

# 使用 `pushd` 命令将目录存入目录栈
$ pushd /var
/var /home/username

# 使用 `popd` 命令移动到目录栈弹出的目录
$ popd
/home/username
```

## 快捷键

### Tab

实现对命令、参数或文件的内容补全。

| 按键          | 作用               |
| ------------- | ------------------ |
| Tab键         | 自动补全           |
| Tab键 + Tab键 | 匹配所有符合的命令 |

### Ctrl+c

终止当前进程的运行，控制权会立刻回到命令行终端。

### Ctrl+d

键盘输入结束。

### Ctrl+l

清空当前终端中已有的内容（清屏操作）。

### Ctrl+R

搜索之前使用过的命令。

### Ctrl+Z

挂起当前进程。

## 特殊符号

### 快捷符号 `!` 

```shell
# !! 快速执行上条命令
$ apt-get update
E: Could not open lock file /var/lib/apt/lists/lock - open (13: Permission denied)
$ sudo !!
sudo apt-get update

# !foo 快速执行历史命令中以 foo 开头的命令
$ !ls
ls -l

# !$ 引用上一个命令的最后一个参数
$ mkdir testdir
$ cd !$
cd testdir

# !7 引用 history 历史第 7 条命令
$ !7
pwd
/root
```

### 逻辑符号 `&&`、`||`、`；`

```shell
# 只有当 `command1` 执行成功（返回 0）时，才会执行 `command2`。
command1 && command2

# 只有当 `command1` 执行失败（返回非零值）时，才会执行 `command2`。
command1 || command2

# 分号用于在一行上运行多个命令，按顺序依次执行。
command1; command2
```

## 常用命令

### 文件操作

| 命令  | 全拼                    | 说明                 |
| ----- | ----------------------- | -------------------- |
| ls    | list                    | 列出目录中的文件列表 |
| cd    | change directory        | 更改当前工作目录     |
| pwd   | print working directory | 显示当前工作目录     |
| mkdir | make directory          | 创建新目录           |
| rmdir | remove directory        | 删除空目录           |
| touch | touch                   | 创建新文件           |
| cp    | copy                    | 复制文件或目录       |
| mv    | move                    | 移动文件或目录       |
| rm    | remove                  | 删除文件或目录       |

### 文件处理

| 命令 | 全拼                            | 说明                                 |
| ---- | ------------------------------- | ------------------------------------ |
| cat  | concatenate                     | 查看、合并文件内容                   |
| head | head                            | 查看文件头部内容                     |
| tail | tail                            | 查看文件尾部内容                     |
| grep | global regular expression print | 在文件中查找指定文本                 |
| sed  | stream editor                   | 流编辑器，用于对文件进行基本文本处理 |
| awk  | awk                             | 文本和数据处理工具                   |

### 系统管理

| 命令     | 全拼           | 说明                 |
| -------- | -------------- | -------------------- |
| ps       | process status | 查看进程状态         |
| top      | top            | 实时查看系统进程状态 |
| kill     | kill           | 终止进程             |
| shutdown | shutdown       | 关闭系统             |
| reboot   | reboot         | 重启系统             |
| uname    | uname          | 显示系统信息         |
| df       | disk free      | 显示磁盘使用情况     |
| du       | disk usage     | 显示目录空间使用情况 |
| free     | free           | 显示系统内存使用情况 |

### 网络管理

| 命令       | 命令全拼           | 描述                               |
| ---------- | ------------------ | ---------------------------------- |
| ip         | internet protocol  | 显示和配置网络接口信息             |
| ping       | ping               | 测试主机之间的连通性               |
| nslookup   | name server lookup | 查询域名解析信息                   |
| traceroute | trace route        | 显示数据包到达目的地经过的路由信息 |
| route      | route              | 显示和配置系统的路由表             |
| netstat    | network statistics | 显示网络连接状态和统计信息         |
| tcpdump    | TCP dump           | 抓取网络数据包并进行分析           |

### 权限管理

| 命令     | 命令全拼     | 描述                     |
| -------- | ------------ | ------------------------ |
| chmod    | change mode  | 修改文件或目录的访问权限 |
| chown    | change owner | 修改文件或目录的所有者   |
| chgrp    | change group | 修改文件或目录的所属组   |
| useradd  | user add     | 添加用户账号             |
| usermod  | user modify  | 修改用户账号信息         |
| userdel  | user delete  | 删除用户账号             |
| groupadd | group add    | 添加用户组               |
| groupmod | group modify | 修改用户组信息           |
| groupdel | group delete | 删除用户组               |
| passwd   | password     | 修改用户密码             |
| su       | switch user  | 切换用户身份             |
| sudo     | superuser do | 以超级用户身份执行命令   |
| visudo   | visual sudo  | 编辑 sudo 配置文件       |
| id       | identity     | 显示当前用户信息         |
| whoami   | who am i     | 显示当前登录用户名       |

### 软件管理

| 命令    | 全拼                       | 说明                               |
| ------- | -------------------------- | ---------------------------------- |
| apt-get | Advanced Packaging Tool    | Ubuntu系统软件包管理工具           |
| yum     | Yellowdog Updater Modified | CentOS、Fedora等系统软件包管理工具 |
| dpkg    | Debian Package             | Debian、Ubuntu等系统软件包管理工具 |
| rpm     | Red Hat Package Manager    | CentOS、Fedora等系统软件包管理工具 |

### 磁盘管理

| 命令   | 全拼              | 描述                         |
| ------ | ----------------- | ---------------------------- |
| df     | disk filesystem   | 显示磁盘空间使用情况         |
| du     | disk usage        | 显示文件和目录的磁盘使用情况 |
| fdisk  | fixed disk        | 磁盘分区管理工具             |
| fsck   | file system check | 检查和修复文件系统           |
| mkfs   | make filesystem   | 创建文件系统                 |
| mount  | mount             | 挂载文件系统到目录上         |
| umount | unmount           | 卸载文件系统                 |

### 进程管理

| 命令    | 命令全拼                | 描述                     |
| ------- | ----------------------- | ------------------------ |
| ps      | process status          | 显示当前进程状态         |
| top     | task-oriented processor | 动态显示进程信息         |
| kill    | kill                    | 终止一个进程             |
| killall | killall                 | 终止一个指定名称的进程   |
| nice    | nice                    | 改变进程优先级           |
| renice  | renice                  | 改变正在运行进程的优先级 |
| jobs    | jobs                    | 显示当前shell的活动作业  |
| bg      | background              | 将一个进程置于后台       |
| fg      | foreground              | 将一个进程置于前台       |
| nohup   | no hang up              | 在后台运行命令，并不挂起 |
| pstree  | process tree            | 显示进程树               |

## 任务

Linux系统中运行程序时，可以选择在前台或后台运行。在前台运行时，程序会占用终端并且输出信息直接显示在终端中。而在后台运行时，程序在后台默默地执行，不会占用终端并且不会直接显示输出信息。

### 运行

-  `&` 符号：在命令的末尾添加 `&` 符号，例如：`command &`。这将使命令在后台运行。
- `nohup` 命令：`nohup` 命令可以使命令在后台运行，并忽略挂断信号（SIGHUP），**这意味着即使你退出当前终端，程序仍会继续运行。**用法为：`nohup command &`。

```shell
# 在后台运行 sleep 命令（这个命令仅仅会让 shell 睡眠一段时间）
$ sleep 300 &

# 使用 nohup 命令在后台运行 sleep 命令，并且将输出信息存入 nohup.out 文件中
$ nohup sleep 300 &

# 使用 nohup 命令在后台运行 sleep 命令，并且将输出信息重定向到 output.txt 文件中
$ nohup sleep 300 > output.txt &

# 运行一个会产生错误的命令，并将错误信息重定向到 err.txt 文件中
$ ls /nonexistent > /dev/null 2> err.txt

# 使用 nohup 命令在后台运行一个会产生错误的命令，并将输出和错误信息重定向到相应的文件中
$ nohup ls /nonexistent > out.txt 2> err.txt &

# 使用 &> 符号将标准输出和错误输出都重定向到同一个文件中
$ ls /nonexistent &> all.txt

# 使用 |& 符号将错误输出重定向到另一个命令的标准输入
$ ls /nonexistent |& less
```

### 管理

#### jobs

jobs 命令可以列出**当前终端会话中正在运行的后台任务**。每个任务都有一个唯一的编号，**可以使用该编号来操作任务**，例如将任务切换到前台或终止任务。

```shell
# 列出当前终端会话中的后台任务
$ jobs
```

| 选项 | 选项全拼  | 描述                           |
| ---- | --------- | ------------------------------ |
| -l   | --list    | 列出每个作业的进程ID号         |
| -p   | --pid     | 仅列出作业的进程ID号           |
| -n   | --new     | 显示自上次通知以后已更改的作业 |
| -r   | --running | 仅列出运行中的作业             |
| -s   | --stopped | 仅列出停止的作业               |

#### fg、bg

`fg`命令可以将一个后台任务切换到前台运行，`bg`命令可以将一个在后台暂停的任务切换到后台继续运行。

```shell
# 将一个后台任务切换到前台运行，假设任务的编号是 1
$ fg %1

# 将一个后台任务切换到后台继续运行，假设任务的编号是 1
$ bg %1
```

#### ps

`ps` 命令可以**显示系统中所有进程的状态，包括后台运行的进程。**

```shell
# 列出系统中所有进程的状态
$ ps
```

| 选项 | 选项全拼             | 描述                                      |
| ---- | -------------------- | ----------------------------------------- |
| -A   | --all                | 显示所有进程（在某些系统上，此选项为 -e） |
| -f   | --full               | 完整格式列出                              |
| -u   | --user               | 按用户列出                                |
| -x   | --all-user-processes | 列出所有用户的进程                        |
| -l   | --long               | 长格式列出                                |
| -j   | --jobs               | 工作格式列出                              |
| -r   | --running            | 列出运行中的进程                          |
| -a   | --all-with-tty       | 列出拥有终端的所有进程                    |
| -e   | --every              | 列出所有进程（在某些系统上，此选项为 -A） |
| -p   | --pid                | 列出指定进程号的进程                      |

#### kill

`kill` 命令是用于发送特定的信号到操作系统中的进程。默认情况下，如果不指定信号，`kill` 命令会发送 `TERM` (终止)信号，这会请求一个进程自我终止。

```shell
# 终止一个后台任务，假设任务的编号是 1
$ kill %1

# 使用 ps 命令找到进程的 PID，然后使用 kill 命令终止进程
$ ps
$ kill PID
```

| 选项            | 描述                                   |
| --------------- | -------------------------------------- |
| `-l`            | 列出所有可用的信号                     |
| `-s signal`     | 指定发送的信号，可以是信号名或信号号码 |
| `-p`            | 不发送信号，只打印进程ID               |
| `-9` 或 `-KILL` | 发送 `KILL` 信号强制终止进程           |

## 管道

**管道命令符把前一个命令原本要输出到屏幕的信息当作后一个命令的标准输入**，其执行格式为「命令A | 命令B」。按下键盘上的 Shift+反斜杠（\）键即可输入管道符，

```shell
# 输出禁止登录用户行数
grep /sbin/nologin /etc/passwd | wc -l

# 搜索与 bash 有关的进程
ps aux | grep bash
```

**命令符可以无限组合，例如：命令A | 命令B | 命令C |……**

> 曾经有位东北的同学做了一个特别贴切的类比：把管道符当做流水线作业，这跟吃顿烧烤是同一个道理，即第一个人负责切肉，第二个人负责串肉，第三个人负责烧烤，最后的处理结果交付给用户。

## 重定向

输入重定向是指把文件导入到命令中，而输出重定向则是指把原本要输出到屏幕的数据信息写入到指定文件中。

- **标准输入重定向（STDIN，文件描述符为0）**：默认从键盘输入，也可从其他文件或命令中输入。

- **标准输出重定向（STDOUT，文件描述符为1）**：默认输出到屏幕。

- **错误输出重定向（STDERR，文件描述符为2）**：默认输出到屏幕。

*对于重定向中的标准输出模式，可以省略**文件描述符 1 不写，而错误输出模式的文件描述符 2 是必须要写的。***

```shell
# 输入重定向：将 file1.txt 作为 sort 命令的标准输入
$ sort < file1.txt 

# 输入重定向并重定向输出：将 file1.txt 作为 sort 命令的输入，并将结果输出到 file2.txt 中
$ sort < file1.txt > file2.txt 

# Here 文档（<<）：将两行 "This is a line." 作为 cat 的输入
$ cat << EOF
This is a line.
This is a line.
EOF

# 输出重定向：将 "Hello, World!" 输出到 output.txt 文件中（覆盖文件原有内容）
$ echo "Hello, World!" > output.txt 

# 错误输出重定向：将错误信息输出到 error.txt 文件中
$ ls /nonexistentdirectory 2> error.txt 

# 追加输出重定向：将 "Hello again!" 追加到 output.txt 文件中
$ echo "Hello again!" >> output.txt 

# 追加错误输出重定向：将错误信息追加到 error.txt 文件中
$ ls /anothernonexistentdirectory 2>> error.txt 

# 同时重定向标准输出和错误输出，追加到同一文件
$ ls /nonexistentdirectory >> all_output.txt 2>&1 

# 同时重定向标准输出和错误输出，追加到同一文件（简化写法）
$ ls /nonexistentdirectory &>> all_output.txt 

```

### 输入重定向

| 符号                 | 作用                                         |
| -------------------- | -------------------------------------------- |
| 命令 < 文件          | 将文件作为命令的标准输入                     |
| 命令 << 分界符       | 从标准输入中读入，直到遇见分界符才停止       |
| 命令 < 文件1 > 文件2 | 将文件1作为命令的标准输入并将标准输出到文件2 |

### 输出重定向

| 符号                             | 作用                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| 命令 > 文件                      | 将标准输出重定向到一个文件中（清空原有文件的数据）           |
| 命令 2> 文件                     | 将错误输出重定向到一个文件中（清空原有文件的数据）           |
| 命令 >> 文件                     | 将标准输出重定向到一个文件中（追加到原有内容的后面）         |
| 命令 2>> 文件                    | 将错误输出重定向到一个文件中（追加到原有内容的后面）         |
| 命令 >> 文件 2>&1、命令 &>> 文件 | 将标准输出与错误输出共同写入到文件中（追加到原有内容的后面） |

## 通配符

```shell
# 使用 * 通配符：列出所有 .txt 文件
$ ls *.txt

# 使用 ? 通配符：列出所有只有一个字符的 .txt 文件
$ ls ?.txt

# 使用 [] 通配符：列出所有以小写字母开始的 .txt 文件
$ ls [a-z]*.txt
```

| 通配符      | 含义           |
| ----------- | -------------- |
| *           | 任意字符       |
| ?           | 单个任意字符   |
| [a-z]       | 单个小写字母   |
| [A-Z]       | 单个大写字母   |
| [a-Z]       | 单个字母       |
| [0-9]       | 单个数字       |
| [[:alpha:]] | 任意字母       |
| [[:upper:]] | 任意大写字母   |
| [[:lower:]] | 任意小写字母   |
| [[:digit:]] | 所有数字       |
| [[:alnum:]] | 任意字母加数字 |
| [[:punct:]] | 标点符号       |

## 转义字符

```shell
# 使用反斜杠（\）使反斜杠后面的一个变量变为单纯的字符。
$ echo \$HOME
$HOME

# 使用单引号（' '）转义其中所有的变量为单纯的字符串。
$ echo '$HOME'
$HOME

# 使用双引号（" "）保留其中的变量属性，不进行转义处理。
$ echo "$HOME"
/home/username

# 使用反引号（` `）把其中的命令执行后返回结果。
$ echo `date`
Sun Sep 4 22:38:10 PDT 2023
```

## 环境变量

**在Linux系统中，变量名称一般都是大写的，命令则都是小写的，这是一种约定俗成的规范。**

Linux系统中最重要的 10 个环境变量

| 变量名称     | 作用                             |
| ------------ | -------------------------------- |
| HOME         | 用户的主目录（即家目录）         |
| SHELL        | 用户在使用的Shell解释器名称      |
| HISTSIZE     | 输出的历史命令记录条数           |
| HISTFILESIZE | 保存的历史命令记录条数           |
| MAIL         | 邮件保存路径                     |
| LANG         | 系统语言、语系名称               |
| RANDOM       | 生成一个随机数字                 |
| PS1          | Bash解释器的提示符               |
| PATH         | 定义解释器搜索用户执行命令的路径 |
| EDITOR       | 用户默认的文本编辑器             |

## 帮助文档

### man

使用 **man** 命令查看到的帮助内容信息

| 按键      | 作用                               |
| --------- | ---------------------------------- |
| 空格键    | 向下翻一页                         |
| PaGe down | 向下翻一页                         |
| PaGe up   | 向上翻一页                         |
| home      | 直接前往首页                       |
| end       | 直接前往尾页                       |
| /         | 从上至下搜索某个关键词，如“/linux” |
| ?         | 从下至上搜索某个关键词，如“?linux” |
| n         | 定位到下一个搜索到的关键词         |
| N         | 定位到上一个搜索到的关键词         |
| q         | 退出帮助文档                       |

#### 示例

```shell
# 查看 man 的帮助文件
man man

# 查看 ssh 的帮助文件
man sh
```
