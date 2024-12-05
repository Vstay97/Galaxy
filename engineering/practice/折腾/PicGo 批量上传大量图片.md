---
title: PicGo 批量上传大量图片
description: PicGo 批量上传大量图片
keywords:
- Python
- Picgo
tags:
-  Picgo
-  博客
sidebar_position: 4
author: Vstay
date: 2024-12-05 15:41
last_update:
  author: Vstay
  date: 2024-12-05
---

## 问题描述

使用 Typora + PicGo + Github 的时候，经常会出现一些问题，导致上传失败。推测应该是批量上传时，并发的请求导致 Github 出现 409 问题。

## 解决

因此写了一个脚本，用来调用 PicGo 的服务上传。主要作用如下：
- 每次上传间隔一秒，避免高并发上传
- 上传错误后的重试机制
- 将原本的地址替换为上传后的新图片地址（模拟 Typora 功能）
- 生成新的文件进行保存，避免污染原笔记文件

```python
import re
import requests
import json
import os
import time

def upload_image_with_retry(image_path, max_retries=3, delay=1):
    """
    上传单个图片，失败时进行重试
    """
    for attempt in range(max_retries):
        try:
            payload = {"list": [image_path]}
            response = requests.post(
                'http://127.0.0.1:36677/upload',
                json=payload
            )
            
            if response.status_code == 200:
                result = response.json()
                if result.get('success') and result.get('result'):
                    return result['result'][0]
                
            print(f"第 {attempt + 1} 次上传失败: {image_path}")
            print(f"响应状态: {response.status_code}")
            print(f"响应内容: {response.text}")
            
        except Exception as e:
            print(f"第 {attempt + 1} 次上传出错: {str(e)}")
        
        if attempt < max_retries - 1:  # 如果不是最后一次尝试
            print(f"等待 {delay} 秒后重试...")
            time.sleep(delay)
    
    raise Exception(f"上传失败，已重试 {max_retries} 次: {image_path}")

def upload_images(markdown_file_path, max_retries=3, delay=1):
    """
    处理markdown文件中的图片上传
    :param markdown_file_path: markdown文件路径
    :param max_retries: 上传失败时的最大重试次数，默认3次
    :param delay: 重试间隔时间（秒），默认1秒
    """
    # 读取markdown文件
    with open(markdown_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 使用正则表达式匹配markdown中的图片链接
    # 匹配 ![任意文本](图片地址) 格式
    image_pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
    matches = re.finditer(image_pattern, content)
    
    # 存储所有需要替换的图片及其新地址
    replacements = {}
    
    for match in matches:
        old_image_path = match.group(2)
        
        # 如果是本地图片路径，获取完整路径
        if not old_image_path.startswith(('http://', 'https://')):
            base_dir = os.path.dirname(os.path.abspath(markdown_file_path))
            full_image_path = os.path.join(base_dir, old_image_path)
            
            # 检查文件是否存在
            if not os.path.exists(full_image_path):
                print(f"警告: 找不到图片 {full_image_path}")
                continue
                
            try:
                # 传递重试参数到upload_image_with_retry函数
                new_url = upload_image_with_retry(full_image_path, max_retries=max_retries, delay=delay)
                replacements[old_image_path] = new_url
                print(f"成功上传图片: {old_image_path} -> {new_url}")
                
                # 使用传入的delay参数作为上传间隔
                time.sleep(delay)
                
            except Exception as e:
                print(f"上传失败，终止处理: {str(e)}")
                return
    
    # 替换所有图片链接
    new_content = content
    for old_path, new_url in replacements.items():
        new_content = new_content.replace(f']({old_path})', f']({new_url})')
    
    # 写入新文件
    output_file = os.path.splitext(markdown_file_path)[0] + '_new.md'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"\n处理完成！新文件已保存为: {output_file}")

# 使用示例
if __name__ == "__main__":
    # 替换为你的markdown文件路径
    markdown_file = "/Users/xxx/JUC.md"
    # 或者指定参数：最多重试5次，每次间隔2秒
    upload_images("/Users/xxx/JUC.md", max_retries=5, delay=2)  
    upload_images(markdown_file)
```