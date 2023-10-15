---
title: 如何基于Nginx + Certbot + pm2 部署各种 Web 服务
description: 服务部署的流程详细
keywords:
  - Nginx
  - Certbot
  - pm2
tags:
  - Nginx
  - Certbot
  - pm2
sidebar_position: 2
author: Vstay
date: 2023-10-15 12:49:47
last_update:
  author: Vstay
  date: 2023-10-15 12:49:47
---

以下教程基于 `Ubuntu 20.04`。

## 环境准备

### 安装 Nginx

Nginx 用来做反向代理，这主要是为了 HTTPS。

```shell
sudo apt update
sudo apt install nginx
```

### 安装 Certbot

Certbot 用来自动申请和更新 SSL 证书，这也是为了 HTTPS。

```shell
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

### 安装 pm2（可选）

pm2 用来监控服务，如果服务挂掉了其将自动重启。如果服务器重启了，pm2 也能帮我们自动启动服务。

```shell
# 首先安装 nvm，nvm 用来安装 Node.js & npm：
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
# 如果服务器访问不了 GitHub，使用下面这个镜像链接：
curl -o- https://iamazing.cn/upload/699fb580-6a6c-11ed-a623-133396cf317f.sh | bash
# 之后使用 nvm 安装 Node.js & npm：
nvm install node
# 然后使用安装好的 npm 安装 pm2：
npm install pm2 -g
# 使用 pm2 自动检测环境，输出合适的命令，执行输出的命令后可以配置 pm2 自动启动
pm2 startup
# 然后执行上述命令输出的命令
```

如果在上面操作过程中，出现安装后命令找不到的情况，重开终端，或者执行 `source ~/.bashrc` 即可。

## 手动部署
----

这里拿 [Message Pusher](https://github.com/songquanpeng/message-pusher) 作为例子。

```shell
# 从 GitHub Release 下载可执行文件： 
wget https://github.com/songquanpeng/message-pusher/releases/download/v0.3.0-alpha/message-pusher 
# 给执行权限： 
chmod u+x ./message-pusher 
# 使用 pm2 启动服务（-- 之后的参数会传递给被启动的程序）： 
pm2 start ./message-pusher --name pusher -- --port 3000 
# （可选）保存服务，这样服务器重启后可以自动重启我们的服务 
pm2 save 
# 创建 Nginx 配置文件： 
cd /etc/nginx/sites-enabled 
sudo touch pusher 
# 使用 vim 编辑配置文件： 
sudo vim ./push
```

内容如下：

```shell
server{
    server_name <domain>;

    location / {
        client_max_body_size  64m;
        proxy_http_version 1.1;
        proxy_pass http://localhost:<port>;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header Accept-Encoding gzip;
    }
}
```

注意要将上面的 `<domain>` 和 `<port>` 替换为实际的域名和端口号。

对于使用了 WebSocket 的应用，我们可能还需要设置更长的超时时间：

```shell
proxy_read_timeout 300s;
proxy_send_timeout 300s; 
```

编辑好之后保存（`:wq!`），继续下面的流程：

```shell
# 使用 certbot 获取 SSL 证书：
sudo certbot --nginx 
# 按照提示选择即可。
# 之后使用 vim 再次编辑配置文件。 
sudo vim ./push 
# 我们会发现配置文件此时已经加入了 SSL 相关内容。 
# （可选）启用 HTTP2： 
# 在配置文件内，把 
listen 443 ssl; # managed by Certbot 
# 改为： 
listen 443 ssl http2; # managed by Certbot 
# 之后重启 Nginx： 
sudo service nginx restart
```

至此，大功告成，你的网站应该已经上线了。

## 基于 Docker 进行部署
--------------

如果要部署的服务提供了 Docker 镜像，那部署与维护起来就非常简单了。

### 搭建服务

一般而言，使用 Docker 启动服务时，需要指定：

1.  要映射的端口：`-p <HOST_PORT>:<CONTAINER_PORT>`
2.  要映射的目录：`-v <HOST_PATH>:<CONTAINER_PATH>`
3.  环境变量：`-e KEY:VALUE`

例如：

```shell
docker run -d --restart always --name message-pusher \
-p 3000:3000 -v /home/ubuntu/data/message-pusher:/data \
-v /etc/ssl/certs:/etc/ssl/certs:ro \
-e SESSION_SECRET=random_string \
justsong/message-pusher
```

除此之外，我们仍然需要 Nginx 来进行反代，以提供 HTTPS，此处不再赘述，详见上一节。

### 更新服务

下述命令会自动更新你所搭建的服务到最新版本：

```shell
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower -cR
```

**Links: [how-to-deploy-a-website](https://iamazing.cn/page/how-to-deploy-a-website)**