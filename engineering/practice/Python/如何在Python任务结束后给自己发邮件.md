---
author: Vstay
date: 2022-11-03 18:37:47
description: 如何在Python任务结束后给自己发邮件
last_update:
  author: Vstay
  date: 2022-11-03 18:37:47
sidebar_position: 1
tags:
- E-Mail
- Python
title: 如何在Python任务结束后给自己发邮件
---





总有一些任务需要跑很久, 但是自己又不能随时看着, 所以希望实现一个功能: 任务结束后给自己发微信消息.

尝试了一下, 好像只能用企业微信的API 不是很方便. 所以就只能退而求其次, 用发邮件的形式来提醒自己啦~

脚本如下, 直接把`message`作为模块引进去就好了, 需要的地方直接使用`sendMsg(title,content)` 就可以实现了

<!-- more-->

```python
import smtplib
from email.mime.multipart import MIMEMultipart
from email import encoders
from email.header import Header
from email.mime.text import MIMEText
from email.utils import parseaddr, formataddr
from email.mime.application import MIMEApplication


def sendMsg(title="", content=""):
    # 邮件主题
    asubject = title
    # 邮件正文
    body = content
    # 添加附件
    # 注意这里的文件路径是斜杠
    # xlsxpart = MIMEApplication(open("C:/Users/vstay/Desktop/这是附件.xlsx", "rb").read())
    # xlsxpart.add_header("Content-Disposition", "attachment", filename="这是附件.xlsx")
    # msg.attach(xlsxpart)

    # 发件人邮箱
    asender = "vstay@qq.com"
    # 收件人邮箱
    areceiver = "vstay@qq.com"
    # 抄送人邮箱
    acc = "vstay@qq.com"
    # 发件人地址
    from_addr = "vstay@qq.com"
    # 邮箱密码（授权码）
    password = "xxxxxx"
    # 邮件设置
    msg = MIMEMultipart()
    msg["Subject"] = asubject
    msg["to"] = areceiver
    msg["Cc"] = acc
    msg["from"] = "Vstay"
    # 添加邮件正文:
    msg.attach(MIMEText(body, "plain", "utf-8"))
    # 设置邮箱服务器地址以及端口
    smtp_server = "smtp.qq.com"
    server = smtplib.SMTP(smtp_server, 25)
    # server.set_debuglevel(1)

    # 登陆邮箱
    server.login(from_addr, password)
    # 发送邮件
    server.sendmail(from_addr, areceiver.split(",") + acc.split(","), msg.as_string())
    # 断开服务器链接
    server.quit()


if __name__ == "__main__":
    sendMsg("这是一份测试标题", "内容")
```



