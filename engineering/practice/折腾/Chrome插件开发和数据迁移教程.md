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

## 1. 项目结构

```
PMCA/
├── manifest.json          # 插件配置文件
├── manifest.base.json     # 基础配置文件
├── webpack.config.js      # webpack构建配置
├── package.json          # npm包配置
├── popup.html            # 弹出窗口HTML
├── options.html          # 选项页面HTML
├── src/                  # 源代码目录
│   ├── popup/           # 弹出窗口相关代码
│   │   ├── service/     # 服务层代码
│   │   ├── view/        # 视图层代码
│   │   ├── util/        # 工具函数
│   │   ├── script/      # 脚本文件
│   │   │   ├── leetcode.js    # LeetCode国际版脚本
│   │   │   └── leetcodecn.js  # LeetCode中国版脚本
│   │   └── options.js   # 选项页面脚本
│   └── autoReset.js     # 内容脚本
├── dist/                # 构建输出目录
├── assets/             # 静态资源（图标等）
├── lib/                # 第三方库
└── deploy/             # 部署相关脚本
    ├── generate-manifest.js  # 生成manifest.json的脚本
    ├── zip.js               # 打包扩展的脚本
    ├── unzip.js             # 解压扩展的脚本
    └── clear.js             # 清理脚本
```

## 2. 开发环境设置

### 2.1 安装依赖

首先确保你已安装Node.js和npm，然后运行：

```bash
# 安装项目依赖
npm install
```

### 2.2 构建项目

```bash
# 开发环境构建
npm run build

# 生成manifest.json文件
npm run manifest:dev  # 开发环境
npm run manifest:prod  # 生产环境
```

### 2.3 生成发布版本

```bash
# 生成用于Chrome商店的zip包
npm run release:prod  # 会在根目录生成pmca.zip

# 清理构建文件
npm run clear
```

## 3. 添加新功能的步骤

### 3.1 修改 manifest.json 或 manifest.base.json

manifest.json 是插件的配置文件，定义了插件的各种属性和权限。在PMCA项目中，我们使用manifest.base.json作为基础文件，然后通过脚本生成最终的manifest.json。

1. **基本结构**

```json
{
    "manifest_version": 3,          // 固定值，表示使用 Manifest V3
    "name": "PMCA",                // 插件名称
    "version": "0.9.9",           // 插件版本
    "description": "...",         // 插件描述
    "author": "...",              // 作者信息
    "homepage_url": "...",        // 主页URL
    "permissions": [...],         // 权限列表
    "host_permissions": [...],    // 主机权限
    "content_scripts": [...],     // 内容脚本配置
    "action": {...},              // 插件图标点击行为
    "options_ui": {...},          // 选项页面配置
    "icons": {...},               // 图标配置
    "background": {}              // 背景脚本配置
}
```

2. **添加权限**

```json
{
    "permissions": [
        "storage",                   // 允许使用存储功能
        "unlimitedStorage"          // 允许使用无限存储
    ],
    "host_permissions": [
        "https://leetcode.com/*",    // 允许访问 LeetCode 网站
        "https://leetcode.cn/*"      // 允许访问 LeetCode 中国网站
    ]
}
```

3. **添加内容脚本**

```json
{
    "content_scripts": [
        {
            "matches": [                    // 匹配的网页 URL 模式
                "https://leetcode.com/*"    // 在所有 LeetCode 页面运行
            ],
            "js": [                        // 要注入的 JavaScript 文件
                "dist/leetcode.js",        // LeetCode专用脚本
                "dist/autoReset.js"        // 通用脚本
            ],
            "run_at": "document_idle"      // 在页面加载完成后运行
        },
        {
            "matches": [
                "https://leetcode.cn/*"     // 在所有 LeetCode 中国页面运行
            ],
            "js": [
                "dist/leetcodecn.js",      // LeetCode中国专用脚本
                "dist/autoReset.js"        // 通用脚本
            ],
            "run_at": "document_idle"      
        }
    ]
}
```

4. **配置弹出窗口和选项页**

```json
{
    "action": {
        "default_icon": "assets/logo.png",  // 工具栏图标
        "default_popup": "popup.html"       // 点击图标显示的弹出页面
    },
    "options_ui": {
        "page": "options.html",            // 选项页面
        "open_in_tab": false               // 是否在新标签页中打开
    }
}
```

### 3.2 修改 webpack.config.js

webpack.config.js 是构建配置文件，定义了如何将源代码编译成最终的文件。

1. **基本结构**

```javascript
module.exports = {
    entry: { ... },     // 入口文件配置
    output: { ... },    // 输出配置
    module: { ... },    // 模块处理规则
    mode: 'production'  // 构建模式
}
```

2. **添加新的入口文件**

```javascript
module.exports = {
    entry: {
        // 现有的入口
        popup: './src/popup/popup.js',           // 弹出窗口脚本
        options: './src/popup/options.js',       // 选项页面脚本
        leetcode: './src/popup/script/leetcode.js',    // LeetCode 脚本
        leetcodecn: './src/popup/script/leetcodecn.js',// LeetCode 中国脚本
        
        // 添加新功能的入口
        autoReset: './src/autoReset.js'          // 新添加的自动重置脚本
    },
    output: {
        filename: '[name].js',   // 输出文件名，[name]会被替换为entry中的键名
        path: path.resolve(__dirname, 'dist')  // 输出目录
    }
}
```

3. **添加样式处理规则**

如果你的项目使用CSS：

```javascript
module.exports = {
    // ...前面的配置
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}
```

4. **注意事项**

- 路径要使用正确的相对路径（以项目根目录为基准）
- 文件名要完全匹配，区分大小写
- 添加新入口后要重新运行 `npm run build`
- 确保 `dist` 目录中生成了新的文件
- 如果报错，检查路径是否正确、依赖是否安装

### 3.3 添加新的源代码文件

1. **创建文件**

- 确定功能应该放在哪个目录（如服务层、视图层等）
- 在适当的目录下创建新文件
- 例如：在 `src/` 下创建 `autoReset.js`

2. **编写代码**

基本模板：

```javascript
// 引入所需依赖
import { ... } from './path/to/module';

// 定义常量
const CONSTANTS = {
    // ...
};

// 主要功能函数
function mainFunction() {
    // 实现功能
}

// 初始化函数
function initialize() {
    // 绑定事件监听器
    document.addEventListener('DOMContentLoaded', () => {
        // 处理DOM加载完成后的逻辑
    });
    
    // 可能的消息监听
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        // 处理消息
    });
}

// 立即执行函数
(function() {
    initialize();
})();
```

3. **访问Chrome API**

```javascript
// 存储数据
chrome.storage.local.set({key: value}, function() {
    console.log('数据已保存');
});

// 获取数据
chrome.storage.local.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
});
```

4. **与网页内容交互**

```javascript
// 选择元素
const element = document.querySelector('.selector');

// 监听事件
element.addEventListener('click', function() {
    // 处理点击事件
});

// 修改页面内容
element.textContent = '新内容';
```

### 3.4 重新构建项目

在项目根目录下运行：

```bash
# 重新构建项目
npm run build

# 如果需要生成新的manifest.json
npm run manifest:dev  # 开发环境
```

## 4. 在 Chrome 中加载修改后的插件

### 4.1 准备工作

1. **确保 manifest.json 存在**

- 如果只有 manifest.base.json，需要生成manifest.json：

```bash
npm run manifest:dev
```

2. **确保已构建项目**

```bash
npm run build
```

### 4.2 加载插件

1. **打开扩展管理页面**

- 打开 Chrome 浏览器
- 访问 `chrome://extensions/`
- 打开右上角的"开发者模式"切换开关

2. **加载插件**

- 点击"加载已解压的扩展程序"按钮
- 选择插件项目的根目录（包含manifest.json的目录）
- 确保插件卡片出现在页面上，并且没有错误提示

3. **检查插件是否正常工作**

- 检查Chrome工具栏中是否显示插件图标
- 点击图标，确认弹出窗口能正常显示
- 访问目标网站（如LeetCode），测试功能是否正常

### 4.3 更新插件

1. **重新构建**

- 修改代码后运行 `npm run build`

2. **更新manifest.json（如有修改）**

- 如果修改了manifest.base.json，运行 `npm run manifest:dev`

3. **刷新插件**

- 回到扩展程序页面 `chrome://extensions/`
- 点击插件卡片上的刷新按钮（⟳）
- 或者点击"重新加载"链接

4. **查看错误**

- 如果插件图标上显示错误标志，点击"错误"按钮查看详细错误信息
- 在Chrome的控制台中查看错误信息（按F12打开开发者工具）

## 5. 发布到Chrome商店

### 5.1 准备发布材料

1. **生成发布包**

```bash
# 生成用于Chrome商店的zip包
npm run release:prod  # 会在根目录生成pmca.zip
```

2. **准备商店资料**

- 至少5张高质量的截图（1280x800或640x400）
- 小尺寸图标（128x128像素）
- 大尺寸宣传图片（1400x560像素，可选）
- 详细的描述文本
- 隐私政策文档

### 5.2 上传到Chrome商店

1. **登录Chrome开发者控制台**

- 访问 https://chrome.google.com/webstore/devconsole
- 使用Google账号登录（需要支付$5开发者注册费）

2. **创建新项目**

- 点击"添加新项目"
- 选择"浏览器扩展程序"类型

3. **上传ZIP文件**

- 在项目页面，找到"软件包"部分
- 上传前面生成的pmca.zip文件

4. **填写商店信息**

- 商店详情：填写描述、截图等
- 隐私：上传隐私政策
- 分发：选择分发范围

5. **提交审核**

- 预览所有内容无误后，点击"提交审查"
- 等待Google审核（通常需要几天时间）

6. **发布后管理**

- 审核通过后，扩展会出现在Chrome商店中
- 可以通过开发者控制台查看安装数据和用户反馈

## 6. 数据迁移教程

### 6.1 从原插件导出数据

1. **准备工作**

- 打开 LeetCode 网站（https://leetcode.cn 或 https://leetcode.com）
- 确保原始插件已启用

2. **打开插件控制台**

- 右键点击 PMCA 插件图标
- 选择"检查弹出内容"或"审查弹出内容"
- 这会打开开发者工具窗口
- 确保切换到"Console"（控制台）标签

3. **导出数据**

在控制台中执行以下代码：

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
- 检查文件大小确保数据已正确导出

### 6.2 导入数据到新插件

1. **准备导入函数**

如果插件中没有内置导入功能，你可以在选项页面的控制台中执行以下步骤：

- 打开新插件的选项页面（点击插件图标→点击齿轮图标）
- 右键点击页面，选择"审查元素"打开开发者工具
- 切换到"Console"标签

2. **创建文件输入元素**

在控制台执行：

```javascript
// 创建文件输入元素
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = '.json';
document.body.appendChild(fileInput);

// 添加变更事件监听器
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            // 导入数据
            chrome.storage.local.set(data, function() {
                alert('数据导入成功！请刷新页面查看。');
                location.reload();
            });
        } catch (error) {
            alert('导入失败：' + error.message);
        }
    };
    reader.readAsText(file);
});

// 触发文件选择对话框
fileInput.click();
```

3. **选择备份文件**

- 在弹出的文件选择对话框中，选择之前导出的 `pmca_data_backup.json` 文件
- 等待导入完成的提示
- 刷新页面查看导入的数据

### 6.3 内置导入/导出功能

如果你想在插件中添加数据导入/导出功能，可以在选项页面添加以下代码：

1. **HTML部分（options.html）**

```html
<div class="data-management">
    <h3>数据管理</h3>
    <button id="export-data">导出数据</button>
    <div class="import-container">
        <label for="import-data" class="import-label">导入数据</label>
        <input type="file" id="import-data" accept=".json" />
    </div>
</div>
```

2. **JavaScript部分（options.js）**

```javascript
// 导出数据
document.getElementById('export-data').addEventListener('click', function() {
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
});

// 导入数据
document.getElementById('import-data').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            // 导入数据
            chrome.storage.local.set(data, function() {
                alert('数据导入成功！请刷新页面查看。');
                location.reload();
            });
        } catch (error) {
            alert('导入失败：' + error.message);
        }
    };
    reader.readAsText(file);
});
```

### 6.4 注意事项

1. **插件版本**

- 建议在开发新功能时禁用或删除从 Chrome 商店安装的原始版本
- 避免两个版本同时运行造成冲突
- 确保新旧版本的数据结构兼容

2. **数据安全**

- 导出数据前确保原插件正常工作
- 保留导出的数据文件作为备份
- 导入后检查数据是否完整
- 如处理敏感数据，考虑添加加密功能

3. **开发注意事项**

- 修改代码后一定要重新构建（`npm run build`）
- 构建后要刷新插件（点击扩展管理页面的刷新按钮）
- 检查控制台是否有错误信息
- 在浏览器中禁用缓存（开发者工具 → Network标签 → Disable cache）

4. **调试技巧**

- 使用 `console.log()` 进行调试
- 添加 `debugger;` 语句设置断点
- 使用 Chrome 开发者工具的 Sources 面板调试 JavaScript
- 使用 Elements 面板检查和操作DOM
- 使用 Network 面板监控网络请求
- 使用 Storage 面板查看插件存储的数据

5. **常见问题解决**

- 插件不工作：检查manifest.json中的权限和内容脚本配置
- 找不到API：检查manifest.json中的权限是否正确配置
- 内容脚本不执行：检查matches配置和run_at时机
- 存储问题：检查storage权限，使用chrome.storage.local.get检查数据

## 7. 项目维护和更新

### 7.1 版本管理

1. **更新版本号**

- 在manifest.base.json中更新version字段
- 遵循语义化版本规范（主版本.次版本.修订版本）
- 主版本：不兼容的API修改
- 次版本：向后兼容的功能性新增
- 修订版本：向后兼容的问题修正

2. **维护更新日志**

- 在README.md或单独的CHANGELOG.md文件中记录变更
- 包含版本号、发布日期和更新内容

### 7.2 代码质量维护

1. **代码组织**

- 保持目录结构清晰
- 按功能模块组织代码
- 遵循单一职责原则

2. **代码风格**

- 使用一致的代码风格
- 考虑添加ESLint和Prettier配置
- 适当添加注释，特别是对复杂逻辑

3. **性能优化**

- 避免频繁的DOM操作
- 使用事件委托
- 减少storage操作，考虑批量读写
- 最小化content scripts的大小和复杂度

### 7.3 用户反馈与支持

1. **添加反馈渠道**

- 在选项页面添加反馈链接
- 提供GitHub Issues或邮箱联系方式

2. **处理用户反馈**

- 及时响应用户反馈
- 对报告的问题进行分类（bug、功能请求等）
- 优先修复常见问题

3. **收集使用数据（可选，需尊重隐私）**

- 考虑添加匿名使用统计
- 必须在隐私政策中明确说明
- 让用户有选择退出的权利

## 8. 附录

### 8.1 有用的参考资料

- [Chrome扩展开发文档](https://developer.chrome.com/docs/extensions/)
- [Manifest V3迁移指南](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Chrome扩展开发最佳实践](https://developer.chrome.com/docs/extensions/mv3/best_practices/)
- [Chrome Web Store发布指南](https://developer.chrome.com/docs/webstore/publish/)

### 8.2 常用命令速查表

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 生成manifest.json
npm run manifest:dev  # 开发环境
npm run manifest:prod  # 生产环境

# 生成发布包
npm run release:prod  # 生成pmca.zip

# 清理构建文件
npm run clear

# 部署开发版本
npm run deploy:dev

# 部署生产版本
npm run deploy:prod
```

---

这份文档提供了开发和维护Chrome扩展的完整指南，从项目设置到发布和数据迁移。持续更新这份文档将有助于团队成员快速上手并一致地开发扩展功能。