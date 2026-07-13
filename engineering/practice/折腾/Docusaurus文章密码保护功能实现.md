---
author: Vstay
date: 2026-07-13 10:00:00
description: Docusaurus 文章密码保护功能实现
last_update:
  author: Vstay
  date: 2026-07-13 10:00:00
sidebar_position: 7
tags:
- Docusaurus
- 密码保护
title: Docusaurus 文章密码保护功能实现
---

## 背景

Galaxy 是一个基于 Docusaurus 3.10.1 的个人 Wiki/博客站点，部署在 Cloudflare Pages 上，纯静态站点，无后端服务。部分 Docs 文章需要密码保护——输入密码才能查看正文内容。

需求：
- 全局默认密码（配置在 `docusaurus.config.js`）+ 文章 frontmatter 可选覆盖
- 作用范围仅 Docs，不含 Blog
- 密码持久化用 sessionStorage（会话内有效，关闭浏览器失效）

## 安全模型说明

这是纯静态站点，所有 HTML/JS 都会发送到浏览器。本文实现的是**软保护**（客户端条件渲染）——构建产物中仍包含完整内容，懂技术的人查看源码可以绕过。

这是个人站点"防君子不防小人"的定位，够用。如果需要真正的保护，需要在构建时加密内容（remark 插件 + AES），实现复杂度高得多。

## 实现思路

### 密码校验流程

1. 文章 frontmatter 中标记 `protect: true` 或 `password: <sha256-hash>`
2. Docusaurus 构建时将 frontmatter 传递给 DocItem 组件
3. 运行时 swizzled DocItem/Content 组件读取 frontmatter，判断是否需要密码
4. 用户输入密码 → 前端 SHA-256 → 比对 hash → 通过则渲染正文

### 为什么存 hash 不存明文

密码会打进客户端 JS bundle 和 git 仓库。存 SHA-256 hash 避免密码直接暴露。

### sessionStorage 解锁粒度

以 hash 为 key 存解锁状态。同一会话内，相同 hash 的文章解锁一次即可，不重复输入。

## 实现步骤

### 1. 配置全局默认密码

在 `docusaurus.config.js` 中新增 `customFields.globalPasswordHash`：

```js title="docusaurus.config.js"
customFields: {
  // 全局默认密码的 SHA-256 hash
  // 修改密码：echo -n "你的密码" | shasum -a 256
  globalPasswordHash: "057ba03d6c44104863dc7361fe4578965d1887360f90a0895882e58a6248fc86",
},
```

生成 hash：

```bash
echo -n "changeme" | shasum -a 256
# 输出: 057ba03d6c44104863dc7361fe4578965d1887360f90a0895882e58a6248fc86
```

### 2. Swizzle DocItem/Content 组件

Docusaurus 的 [swizzle](https://docusaurus.io/docs/swizzling) 机制允许覆盖主题组件。这里 eject `DocItem/Content`——正文渲染的入口组件。

```bash
npx docusaurus swizzle @docusaurus/theme-classic DocItem/Content --eject
```

:::note
交互式命令在非 tty 环境下无法选择语言和确认。可以手动创建文件到 `src/theme/DocItem/Content/index.js`，Docusaurus 会自动识别 swizzled 组件。
:::

### 3. 密码保护组件

新建 `src/components/PasswordProtect.js`：

```jsx title="src/components/PasswordProtect.js"
import React, {useState, useCallback} from 'react';

// SHA-256 hash 计算
async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// sessionStorage 解锁状态管理
function getUnlockedHash(hash) {
  try {
    return sessionStorage.getItem(`galaxy-unlocked-${hash}`) === '1';
  } catch {
    return false;
  }
}

function setUnlockedHash(hash) {
  try {
    sessionStorage.setItem(`galaxy-unlocked-${hash}`, '1');
  } catch {}
}

export default function PasswordProtect({passwordHash, children}) {
  const [unlocked, setUnlocked] = useState(() => getUnlockedHash(passwordHash));
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = useCallback(async (e) => {
    e.preventDefault();
    const inputHash = await sha256(inputValue);
    if (inputHash === passwordHash) {
      setUnlockedHash(passwordHash);
      setUnlocked(true);
      setError('');
    } else {
      setError('密码错误，请重试');
    }
  }, [inputValue, passwordHash]);

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div style={{/* 居中布局样式 */}}>
      <p>🔒 此文章需要密码访问</p>
      <p>请输入密码以查看正文内容</p>
      <form onSubmit={handleUnlock}>
        <input type="password" value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="请输入密码" autoFocus />
        <button type="submit">解锁</button>
      </form>
      {error && <p style={{color: 'var(--ifm-color-danger)'}}>{error}</p>}
    </div>
  );
}
```

### 4. 修改 DocItem/Content 集成密码保护

在 swizzled `src/theme/DocItem/Content/index.js` 中，读取 frontmatter 判断是否需要保护：

```jsx title="src/theme/DocItem/Content/index.js"
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import PasswordProtect from '@site/src/components/PasswordProtect';

function usePasswordHash() {
  const {frontMatter} = useDoc();
  const {siteConfig} = useDocusaurusContext();

  // 文章级独立密码
  if (frontMatter.password) {
    return frontMatter.password;
  }
  // 使用全局默认密码
  if (frontMatter.protect === true) {
    return siteConfig.customFields?.globalPasswordHash ?? null;
  }
  return null;
}

export default function DocItemContent({children}) {
  const passwordHash = usePasswordHash();
  const content = (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {/* ...原有标题和 MDXContent 渲染逻辑... */}
    </div>
  );

  if (passwordHash) {
    return <PasswordProtect passwordHash={passwordHash}>{content}</PasswordProtect>;
  }
  return content;
}
```

## 使用方法

### 全局默认密码

修改 `docusaurus.config.js` 中 `customFields.globalPasswordHash`：

```bash
echo -n "你的密码" | shasum -a 256
```

### 文章级保护

两种模式：

```md title="使用全局默认密码"
---
title: 私密文章
protect: true
---
```

```md title="使用独立密码"
---
title: 私密文章
password: ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae
---
```

生成文章独立密码的 hash：

```bash
echo -n "test123" | shasum -a 256
# 输出: ecd71870d1963316a97e3ac3408c9835ad8cf0f3c1bc703527c30265534f75ae
```

## 踩坑记录

### 文件名以 _ 开头会被 Docusaurus 忽略

测试时把测试文件命名为 `_password-test.md`，构建后发现页面 404。Docusaurus 约定以 `_` 开头的 markdown 文件是 partial/draft，不会被路由系统收录。改为正常文件名即可。

### swizzle 交互式命令在非 tty 环境失败

`npx docusaurus swizzle` 需要交互式选择语言（JavaScript/TypeScript）和确认危险操作。在非 tty 环境（如 CI 或管道输入）下会卡住。解决方式是直接手动创建文件到 `src/theme/DocItem/Content/index.js`，效果与 swizzle eject 相同。

### SSG HTML 包含完整内容

纯静态站点在构建时生成完整 HTML（包含正文），客户端 React hydration 后才隐藏内容。这意味着搜索引擎爬虫和查看源码的用户能看到正文。这是软保护方案的固有限制，个人站点可接受。如需真保护，需构建时加密。

## 验证结果

| 测试项 | 结果 |
|--------|------|
| `protect: true` 文章，输入全局密码解锁 | ✅ |
| `password` 文章，输入独立密码解锁 | ✅ |
| 错误密码显示"密码错误，请重试" | ✅ |
| 同会话同 hash 自动解锁，不重复输入 | ✅ |
| 公开文章无密码 UI，正常渲染 | ✅ |
| Blog 不受影响 | ✅ |
| 侧边栏显示受保护文章标题 | ✅ |
| `npm run build` 通过 | ✅ |
