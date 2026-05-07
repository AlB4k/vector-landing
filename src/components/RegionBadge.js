import React from 'react';

export const RegionBadge = ({ text, style = 'badge', isLight, variant = 'header' }) => {
  if (!text) return null;

  // Определить max-width в зависимости от варианта (header или footer)
  const maxWidthByVariant = {
    header: '280px',    // Оставляет место для навигации
    footer: '400px'     // В футере больше места
  };

  if (style === 'text') {
    return (
      <span style={{
        display: '-webkit-box',
        maxWidth: maxWidthByVariant[variant] || '280px',
        overflow: 'hidden',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        wordBreak: 'break-word',
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#3b82f6',
        opacity: 0.85,
        userSelect: 'none',
        pointerEvents: 'none'
      }}>
        {text}
      </span>
    );
  }

  // СТИЛЬ "badge" — по умолчанию
  return (
    <div style={{
      maxWidth: maxWidthByVariant[variant] || '280px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '5px',
      padding: '3px 10px',
      borderRadius: '999px',
      fontSize: '10px',
      fontWeight: 500,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: '#3b82f6',
      background: isLight
        ? 'rgba(148,163,184,0.12)'
        : 'rgba(148,163,184,0.08)',
      border: '1px solid',
      borderColor: isLight
        ? 'rgba(148,163,184,0.25)'
        : 'rgba(148,163,184,0.15)',
      userSelect: 'none',
      pointerEvents: 'none',
      overflow: 'hidden',
      lineHeight: '1.3'
    }}>
      <svg width="6" height="6" viewBox="0 0 6 6"
           fill="currentColor" opacity="0.6" style={{flexShrink: 0, marginTop: '2px'}}>
        <circle cx="3" cy="3" r="2.5"/>
      </svg>
      <span style={{
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        wordBreak: 'break-word'
      }}>{text}</span>
    </div>
  );
};
