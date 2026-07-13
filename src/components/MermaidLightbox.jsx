/**
 * MermaidLightbox - 基于 react-zoom-pan-pinch 的 Mermaid 图表全屏查看器
 *
 * 功能：
 * - 滚轮缩放、拖拽平移、双击放大
 * - 内置 + / − / 复位 控制按钮
 * - 移动端 pinch 手势支持
 * - ESC / 点击遮罩 / × 按钮关闭
 */
import React, {useEffect, useCallback, useState} from 'react';
import {TransformWrapper, TransformComponent} from 'react-zoom-pan-pinch';

export default function MermaidLightbox({svgHTML, onClose}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => setVisible(true));
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target.classList.contains('mermaid-lightbox-overlay')) onClose();
    },
    [onClose]
  );

  return (
    <div
      className={`mermaid-lightbox-overlay${visible ? ' mermaid-lightbox-overlay--visible' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      {/* 关闭按钮 */}
      <button
        className="mermaid-lightbox-close"
        onClick={onClose}
        aria-label="关闭"
      >
        &times;
      </button>

      {/* 操作提示 */}
      <div className="mermaid-lightbox-tips">
        滚轮缩放 · 拖拽平移 · 双击放大
      </div>

      {/* 缩放查看区 */}
      <div className="mermaid-lightbox-viewport">
        <TransformWrapper
          initialScale={1}
          minScale={0.3}
          maxScale={8}
          doubleClick={{mode: 'zoomIn', step: 0.7}}
          centerOnInit
        >
          {({zoomIn, zoomOut, resetTransform}) => (
            <>
              {/* 控制按钮 */}
              <div className="mermaid-lightbox-controls">
                <button onClick={() => zoomIn(0.2)} aria-label="放大">
                  +
                </button>
                <button onClick={() => zoomOut(0.2)} aria-label="缩小">
                  &minus;
                </button>
                <button onClick={() => resetTransform()} aria-label="复位">
                  &#8634;
                </button>
              </div>

              {/* 可缩放的图表内容 */}
              <TransformComponent
                wrapperProps={{style: {width: '100%', height: '100%'}}}
                contentProps={{style: {width: 'auto'}}}
              >
                <div
                  className="mermaid-lightbox-svg-wrapper"
                  dangerouslySetInnerHTML={{__html: svgHTML}}
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
}
