import { useEffect, useState } from 'react';

export function Toast({ message, type, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed', top: '24px', right: '24px', zIndex: 1000,
      padding: '14px 20px',
      background: type === 'error' ? 'var(--red)' : 'var(--brown)',
      color: 'var(--white)',
      borderRadius: '8px',
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      fontWeight: '500',
      boxShadow: '0 8px 32px var(--shadow-deep)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(-8px)',
      transition: 'all 0.3s ease',
      maxWidth: '320px',
      lineHeight: '1.4',
    }}>
      {type === 'error' ? '✕ ' : '✓ '}{message}
    </div>
  );
}
