import React from 'react';
import { MapPin } from 'lucide-react';
import { interpolate } from '../utils/content';

export const RegionBadge = ({ data, fullContent, isLight, position = 'navbar' }) => {
  if (!data || !data.text) return null;

  // Проверка видимости в зависимости от позиции
  const isVisible =
    (position === 'navbar' && data.visibleNavbar) ||
    (position === 'hero' && data.visibleHero) ||
    (position === 'footer' && data.visibleFooter);

  if (!isVisible) return null;

  const isSolid = data.style === 'solid';

  const baseClasses = "inline-flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300";
  const positionClasses = position === 'hero'
    ? "text-[11px] font-bold py-2 px-4 mb-6"
    : "text-[9px] font-black uppercase tracking-widest";

  const themeClasses = isSolid
    ? (isLight
        ? "bg-blue-600/10 border border-blue-600/20 text-blue-600 shadow-sm"
        : "bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/5")
    : (isLight
        ? "border border-blue-600/30 text-blue-600/80 bg-transparent"
        : "border border-blue-500/30 text-blue-400 bg-transparent");

  return (
    <div className={`${baseClasses} ${positionClasses} ${themeClasses}`}>
      <MapPin size={position === 'hero' ? 14 : 12} className={isLight ? "text-blue-600" : "text-blue-400"} />
      <span>{interpolate(data.text, fullContent)}</span>
    </div>
  );
};
