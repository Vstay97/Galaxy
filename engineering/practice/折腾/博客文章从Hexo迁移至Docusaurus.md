---
author: Vstay
date: 2023-09-29 9:37:47
description: 博客文章从Hexo迁移至Docusaurus
last_update:
  author: Vstay
  date: 2023-09-29 9:37:47
sidebar_position: 1
tags:
- Hexo
- Docusaurus
title: 博客文章从Hexo迁移至Docusaurus
---

## 介绍

将博客文章从Hexo迁移至Docusaurus,发现hexo和docusaurus的`metadata`元素有些不同,所以需要做一些修改.

需要注意的是:
- 本文只是针对我自己的博客文章做的修改,并不是通用的
- 转换后的文章`description`为原文章的`title`
- 文章在侧边栏的位置(`sidebar_position`)固定为1,需要手动修改
- 文章的作者统一添加为`Vstay`,需要手动修改

## 转换前后预览

转换文件如下:

```md title="转换前的博文.md"
---
title: C++中几种由int类型转换string的方法比较
date: 2020-06-10 22:15:02
updated: 2020-07-10 22:15:02
tags: 类型转换 
categories: 语言学习
---
这里是正文...
```

```md title="转换后的博文.md"
---
title: C++中几种由int类型转换string的方法比较
description: C++中几种由int类型转换string的方法比较
tags:
- 类型转换
sidebar_position: 1
author: Vstay
date: 2020-06-10
last_update:
  date: 2020-07-10
  author: Vstay
---
这里是正文...
```
## 脚本

```python title="hexo2docusaurus.py"
import yaml
import os


class NoAliasDumper(yaml.SafeDumper):
    def ignore_aliases(self, data):
        return True


def process_file(input_file, output_file, convert, author_name):
    saveDirName = input_file.split('\\')[-2]
    saveFileName = input_file.split('\\')[-1]
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    metadata, content = ''.join(lines).split('---\n')[1:3]
    metadata = metadata.replace('\t', '  ')
    metadata = yaml.safe_load(metadata)
    if convert:
        new_metadata = create_new_metadata(metadata, author_name)
        metadata = new_metadata

    # 检查 output_file 是否存在
    if not os.path.exists(output_file):
        os.makedirs(output_file)

    # 检查 saveDirName 是否存在
    if not os.path.exists(output_file+'\\'+saveDirName):
        os.makedirs(output_file+'\\'+saveDirName)

    # 检查 saveFileName 是否存在
    if not os.path.exists(output_file+'\\'+saveDirName+'\\'+saveFileName):
        with open(output_file+'\\'+saveDirName+'\\'+saveFileName, 'w', encoding='utf-8') as f:
            f.write('---\n')
            yaml.dump(metadata, f, allow_unicode=True, default_flow_style=False)
            f.write('---\n')
            f.write(content)



def create_new_metadata(metadata, author_name):
    new_metadata = {
        'title': metadata['title'],
        'description': metadata['title'],
        'tags': [metadata['tags']] if 'tags' in metadata else [],
        'sidebar_position': 1,
        'author': author_name,
        'date': metadata['date'],
        'last_update': {
            'date': metadata['updated'],
            'author': author_name
        }
    }
    return new_metadata


def process_dir(path, output_path, convert, author_name):
    for root, dirs, files in os.walk(path):
        if root.split('\\')[-1] == 'new':
            return
        for file in files:
            if os.path.splitext(file)[1] == '.md':
                fileName = os.path.join(root, file)
                process_file(fileName, output_path, convert, author_name)

if __name__ == '__main__':
    input_path = r'C:\Users\Vstay\Desktop\Code\_posts1'
    output_path = r'C:\Users\Vstay\Desktop\Code\_posts1\new'
    author_name = 'Vstay'
    process_dir(input_path, output_path, True, author_name)
    process_dir(output_path, output_path, False, author_name)

```