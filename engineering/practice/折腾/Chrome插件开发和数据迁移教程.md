---
title: Chrome 插件开发和数据迁移教程
description: Chrome 插件开发和数据迁移教程
keywords:
- Chrome插件
tags:
- Chrome插件
sidebar_position: 6
author: Vstay
date: 2025-01-05 20:09
last_update:
  author: Vstay
  date: 2025-01-05
---


```

PMCA/

├── manifest.json          # 插件配置文件

├── manifest.base.json     # 基础配置文件

├── webpack.config.js      # webpack构建配置

├── package.json          # npm包配置

├── src/                  # 源代码目录

│   ├── popup/           # 弹出窗口相关代码

│   │   ├── service/     # 服务层代码

│   │   ├── view/        # 视图层代码

│   │   ├── util/        # 工具函数

│   │   └── options.js   # 选项页面脚本

│   └── autoReset.js     # 内容脚本

├── dist/                # 构建输出目录

├── assets/             # 静态资源

└── lib/                # 第三方库

```

  

## 2. 添加新功能的步骤

  

### 2.1 修改 manifest.json

  

manifest.json 是插件的配置文件，定义了插件的各种属性和权限。

  

1. **基本结构**

```json

{

    "manifest_version": 3,          // 固定值，表示使用 Manifest V3

    "name": "PMCA",                // 插件名称

    "version": "0.9.9",           // 插件版本

    "description": "...",         // 插件描述

    "permissions": [...],         // 权限列表

    "content_scripts": [...],     // 内容脚本配置

    "action": {...},              // 插件图标点击行为

    "options_ui": {...}           // 选项页面配置

}

```

  

2. **添加权限**

```json

{

    "permissions": [

        "https://leetcode.com/*",    // 允许访问 LeetCode 网站

        "https://leetcode.cn/*",     // 允许访问 LeetCode 中国网站

        "storage",                   // 允许使用存储功能

        "unlimitedStorage"          // 允许使用无限存储

    ]

}

```

  

3. **添加内容脚本**

```json

{

    "content_scripts": [

        {

            "matches": [                    // 匹配的网页 URL 模式

                "https://leetcode.com/*",   // 在所有 LeetCode 页面运行

                "https://leetcode.cn/*"     // 在所有 LeetCode 中国页面运行

            ],

            "js": [                        // 要注入的 JavaScript 文件

                "dist/leetcode.js",        // 原有的脚本

                "dist/autoReset.js"        // 新添加的脚本

            ],

            "run_at": "document_idle"      // 在页面加载完成后运行

        }

    ]

}

```

  

### 2.2 修改 webpack.config.js

  

webpack.config.js 是构建配置文件，定义了如何将源代码编译成最终的文件。

  

1. **基本结构**

```javascript

module.exports = {

    entry: { ... },     // 入口文件配置

    output: { ... },    // 输出配置

    module: { ... },    // 模块处理规则

    mode: 'production'  // 构建模式

}

```

  

2. **添加新的入口文件**

```javascript

module.exports = {

    entry: {

        // 原有的入口

        popup: './src/popup/popup.js',           // 弹出窗口脚本

        options: './src/popup/options.js',       // 选项页面脚本

        leetcode: './src/popup/script/leetcode.js',    // LeetCode 脚本

        leetcodecn: './src/popup/script/leetcodecn.js',// LeetCode 中国脚本

        // 添加新功能的入口

        autoReset: './src/autoReset.js'          // 新添加的自动重置脚本

    },

    output: {

        filename: '[name].js'    // 输出文件名，[name]会被替换为entry中的键名

    }

}

```

  

3. **注意事项**

- 路径要使用正确的相对路径（以项目根目录为基准）

- 文件名要完全匹配

- 添加新入口后要重新运行 `npm run build`

- 确保 `dist` 目录中生成了新的文件

  

### 2.3 添加新的源代码文件

  

1. **创建文件**

- 在适当的目录下创建新文件

- 例如：在 `src/` 下创建 `autoReset.js`

  

2. **编写代码**

- 按照功能需求编写相应的代码

- 确保导入所需的依赖

  

### 2.4 重新构建项目

  

在项目根目录下运行：

```bash

npm run build

```

  

## 3. 在 Chrome 中加载修改后的插件

  

### 3.1 准备工作

  

1. **确保 manifest.json 存在**

- 如果只有 manifest.base.json，需要复制一份：

```bash

copy manifest.base.json manifest.json

```

  

### 3.2 加载插件

  

1. **打开扩展管理页面**

- 打开 Chrome 浏览器

- 访问 `chrome://extensions/`

- 打开右上角的"开发者模式"

  

2. **加载插件**

- 点击"加载已解压的扩展程序"

- 选择插件项目的根目录

  

### 3.3 更新插件

  

1. **重新构建**

- 修改代码后运行 `npm run build`

  

2. **刷新插件**

- 回到扩展程序页面

- 点击插件卡片上的刷新按钮（⟳）

  

## 4. 数据迁移教程

  

### 4.1 从原插件导出数据

  

1. **准备工作**

- 打开 LeetCode 网站（https://leetcode.cn 或 https://leetcode.com）

- 确保原始插件已启用

  

2. **打开插件控制台**

- 右键点击 PMCA 插件图标

- 选择"检查弹出内容"或"审查弹出内容"

- 这会打开开发者工具窗口

- 确保切换到"Console"（控制台）标签

  

3. **导出数据**

```javascript

chrome.storage.local.get(null, function(data) {

    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = url;

    a.download = 'pmca_data_backup.json';

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

});

```

- 这将自动下载一个 `pmca_data_backup.json` 文件，包含所有插件数据

  

### 4.2 导入数据到新插件

  

1. **打开新插件的选项页面**

- 点击新插件图标

- 点击齿轮图标打开选项页面

  

2. **导入数据**

- 点击"Import Data"按钮

- 选择之前导出的 `pmca_data_backup.json` 文件

- 等待导入完成提示

  

### 4.3 注意事项

  

1. **插件版本**

- 建议在开发新功能时禁用或删除从 Chrome 商店安装的原始版本

- 避免两个版本同时运行造成冲突

  

2. **数据安全**

- 导出数据前确保原插件正常工作

- 保留导出的数据文件作为备份

- 导入后检查数据是否完整

  

3. **开发注意事项**

- 修改代码后一定要重新构建（`npm run build`）

- 构建后要刷新插件（点击扩展管理页面的刷新按钮）

- 检查控制台是否有错误信息

  

4. **调试技巧**

- 使用 Chrome 开发者工具的 Console 面板查看错误

- 在代码中添加 `console.log()` 进行调试

- 遇到问题时检查 manifest.json 的配置是否正确