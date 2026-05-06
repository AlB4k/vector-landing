import { useState } from 'react';

export function useTheme() {
  const [cmsTheme, setCmsTheme] = useState(() => localStorage.getItem('vector_cms_theme') || 'dark');
  const isLight = cmsTheme === 'light';

  const toggleTheme = () => {
    const next = isLight ? 'dark' : 'light';
    setCmsTheme(next);
    localStorage.setItem('vector_cms_theme', next);
  };

  const themeVars = {
    '--cms-bg': isLight ? '#f8fafc' : '#020204',
    '--cms-sidebar': isLight ? '#ffffff' : 'rgba(15, 23, 42, 0.8)',
    '--cms-border': isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)',
    '--cms-text': isLight ? '#0f172a' : '#f8fafc',
    '--cms-text-muted': isLight ? '#64748b' : '#94a3b8',
    '--cms-accent': '#3b82f6',
    '--cms-card': isLight ? '#ffffff' : '#0f172a',
    '--cms-header': isLight ? '#ffffff' : '#020204'
  };

  return { cmsTheme, isLight, toggleTheme, themeVars };
}
