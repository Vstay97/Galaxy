/**
 * Swizzled from @docusaurus/theme-classic DocItem/Content
 *
 * 增加密码保护逻辑：
 * - frontmatter 中有 password（sha256 hash）→ 使用该独立密码
 * - frontmatter 中有 protect: true → 使用全局默认密码（docusaurus.config.js customFields.globalPasswordHash）
 * - 都没有 → 正常渲染
 */

import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import PasswordProtect from '@site/src/components/PasswordProtect';

/**
 * Title can be declared inside md content or declared through
 * front matter and added manually. To make both cases consistent,
 * the added title is added under the same div.markdown block
 * See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120
 *
 * We render a "synthetic title" if:
 * - user doesn't ask to hide it with front matter
 * - the markdown content does not already contain a top-level h1 heading
 */
function useSyntheticTitle() {
  const {metadata, frontMatter, contentTitle} = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === 'undefined';
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}

/**
 * 从 frontmatter 中提取密码保护信息
 * 返回需要校验的 hash，null 表示无需保护
 */
function usePasswordHash() {
  const {frontMatter} = useDoc();
  const {siteConfig} = useDocusaurusContext();

  // 文章级独立密码（SHA-256 hash）
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
  const syntheticTitle = useSyntheticTitle();
  const passwordHash = usePasswordHash();

  const content = (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{syntheticTitle}</Heading>
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );

  // 需要密码保护时，用 PasswordProtect 包裹正文
  if (passwordHash) {
    return (
      <PasswordProtect passwordHash={passwordHash}>
        {content}
      </PasswordProtect>
    );
  }

  return content;
}
