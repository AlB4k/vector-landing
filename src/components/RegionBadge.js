import React from 'react';

export const RegionBadge = ({ text, style = 'badge', isLight }) => {
  if (!text) return null;

  if (style === 'text') {
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: isLight ? '#64748b' : '#94a3b8',
        opacity: 0.85,
        userSelect: 'none',
        pointerEvents: 'none'
      }}>
        <svg width="8" height="8" viewBox="0 0 8 8"
             fill="currentColor" opacity="0.7">
          <circle cx="4" cy="4" r="3"/>
        </svg>
        {text}
      </span>
    );
  }

  // СТИЛЬ "badge" — по умолчанию
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      padding: '3px 10px',
      borderRadius: '999px',
      fontSize: '10px',
      fontWeight: 500,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: isLight ? '#475569' : '#94a3b8',
      background: isLight
        ? 'rgba(148,163,184,0.12)'
        : 'rgba(148,163,184,0.08)',
      border: '1px solid',
      borderColor: isLight
        ? 'rgba(148,163,184,0.25)'
        : 'rgba(148,163,184,0.15)',
      userSelect: 'none',
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
      lineHeight: 1
    }}>
      <svg width="6" height="6" viewBox="0 0 6 6"
           fill="currentColor" opacity="0.6">
        <circle cx="3" cy="3" r="2.5"/>
      </svg>
      {text}
    </span>
  );
};
