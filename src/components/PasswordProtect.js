import React, {useState, useCallback} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  hint: {
    fontSize: '0.9rem',
    opacity: 0.7,
    marginBottom: '1.5rem',
  },
  inputRow: {
    display: 'flex',
    gap: '0.5rem',
    width: '100%',
    maxWidth: '360px',
  },
  input: {
    flex: 1,
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    border: '1px solid var(--ifm-color-emphasis-300)',
    borderRadius: '4px',
    background: 'var(--ifm-background-color)',
    color: 'var(--ifm-font-color-base)',
    outline: 'none',
  },
  button: {
    padding: '0.5rem 1.25rem',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    background: 'var(--ifm-color-primary)',
    color: '#fff',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  error: {
    color: 'var(--ifm-color-danger)',
    fontSize: '0.85rem',
    marginTop: '0.75rem',
  },
};

/**
 * SHA-256 hash 计算
 */
async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * sessionStorage 解锁状态管理
 * 以 hash 为 key，同一 hash 的文章解锁一次即可
 */
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
  } catch {
    // sessionStorage 不可用时静默失败
  }
}

/**
 * 密码保护组件
 *
 * frontmatter 约定：
 * - password: <sha256-hash>  → 该文章使用独立密码
 * - protect: true            → 该文章使用全局默认密码
 *
 * 解锁状态以 hash 为 key 存入 sessionStorage，会话内有效。
 */
export default function PasswordProtect({passwordHash, children}) {
  const [unlocked, setUnlocked] = useState(() => getUnlockedHash(passwordHash));
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = useCallback(
    async (e) => {
      e.preventDefault();
      const inputHash = await sha256(inputValue);
      if (inputHash === passwordHash) {
        setUnlockedHash(passwordHash);
        setUnlocked(true);
        setError('');
      } else {
        setError('密码错误，请重试');
      }
    },
    [inputValue, passwordHash],
  );

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div style={styles.container}>
      <p style={styles.title}>🔒 此文章需要密码访问</p>
      <p style={styles.hint}>请输入密码以查看正文内容</p>
      <form onSubmit={handleUnlock} style={styles.inputRow}>
        <input
          type="password"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="请输入密码"
          style={styles.input}
          autoFocus
        />
        <button type="submit" style={styles.button}>
          解锁
        </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}
