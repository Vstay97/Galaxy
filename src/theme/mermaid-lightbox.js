/**
 * Mermaid Lightbox Client Module
 *
 * 职责：
 * - 扫描页面中所有 mermaid 容器，添加「点击放大」提示
 * - 点击时提取 SVG HTML，用 React 渲染 MermaidLightbox 组件
 * - 使用 react-zoom-pan-pinch 提供缩放/平移/控制按钮
 */
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import React from 'react';
import {createRoot} from 'react-dom/client';
import MermaidLightbox from '@site/src/components/MermaidLightbox';

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) return {};

  const HINT_CLASS = 'mermaid-zoom-hint';
  let currentRoot = null;
  let currentEl = null;

  /**
   * 为 mermaid 容器添加悬停提示和点击事件
   */
  function enhanceMermaidContainer(container) {
    var hint = document.createElement('span');
    hint.className = HINT_CLASS;
    hint.textContent = '点击放大';
    container.style.position = 'relative';
    container.appendChild(hint);

    container.addEventListener('click', function (e) {
      if (e.target.classList.contains(HINT_CLASS)) return;
      openLightbox(container);
    });
  }

  /**
   * 打开 Lightbox
   */
  function openLightbox(container) {
    // 先关闭已有的
    closeLightbox();

    // 提取 SVG HTML，移除内联限制
    var svg = container.querySelector('svg');
    var svgHTML = '';
    if (svg) {
      var cloned = svg.cloneNode(true);
      cloned.removeAttribute('style');
      cloned.setAttribute('width', '100%');
      cloned.removeAttribute('height');
      svgHTML = cloned.outerHTML;
    }

    // 创建 React root 并渲染
    currentEl = document.createElement('div');
    currentEl.id = 'mermaid-lightbox-root';
    document.body.appendChild(currentEl);

    currentRoot = createRoot(currentEl);
    currentRoot.render(
      React.createElement(MermaidLightbox, {
        svgHTML: svgHTML,
        onClose: closeLightbox,
      })
    );
  }

  /**
   * 关闭 Lightbox
   */
  function closeLightbox() {
    if (currentRoot) {
      currentRoot.unmount();
      currentRoot = null;
    }
    if (currentEl && currentEl.parentNode) {
      currentEl.parentNode.removeChild(currentEl);
      currentEl = null;
    }
  }

  /**
   * ESC 键关闭（额外保险，组件内部也监听了）
   */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  /**
   * 初始化：扫描并增强所有 mermaid 容器
   */
  function init() {
    document
      .querySelectorAll('.docusaurus-mermaid-container')
      .forEach(function (el) {
        if (!el.querySelector('.' + HINT_CLASS) && el.querySelector('svg')) {
          enhanceMermaidContainer(el);
        }
      });
  }

  return {
    onRouteDidUpdate: function () {
      setTimeout(init, 800);
    },
    onRouteUpdate: function () {
      setTimeout(init, 800);
    },
  };
})();
