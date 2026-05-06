import { useState, useRef } from 'react';

export default function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);
  const [above, setAbove] = useState(true);
  const ref = useRef(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setAbove(rect.top > 120);
    }
    setShow(true);
  };

  return (
    <div
      ref={ref}
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          ...(above ? { bottom: 'calc(100% + 8px)' } : { top: 'calc(100% + 8px)' }),
          zIndex: 99999,
          background: 'var(--cms-accent)',
          color: '#ffffff',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: 600,
          width: '200px',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          pointerEvents: 'none',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
          lineHeight: 1.4,
          textAlign: 'center'
        }}>
          {text}
          <div style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            ...(above ? {
              top: '100%',
              borderTop: '5px solid var(--cms-accent)',
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
            } : {
              bottom: '100%',
              borderBottom: '5px solid var(--cms-accent)',
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
            }),
            width: 0,
            height: 0,
          }} />
        </div>
      )}
    </div>
  );
}
