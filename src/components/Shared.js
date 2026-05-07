import React, { useState, useEffect, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { RegionBadge } from './RegionBadge';

// Dynamic Icon Component
export const DynamicIcon = ({ name, size = 24, className = '' }) => {
  const IconComponent = LucideIcons[name];
  if (!IconComponent) return <LucideIcons.HelpCircle size={size} className={className} />;
  return <IconComponent size={size} className={className} aria-hidden="true" />;
};

export const Logo = ({ light, variant = 'large', customScale, tagline = 'LOGISTIC TECH', text, regionBadge }) => {
  const isSmall = variant === 'small';
  const scale = customScale || (isSmall ? 1.2 : 1.4);

  return (
    <div className={`flex items-center ${isSmall ? 'gap-2 md:gap-3.5' : 'gap-4 md:gap-6'} group relative text-left`}>
      <div className={`relative ${isSmall ? 'w-10 h-10 md:w-14 md:h-14' : 'w-14 h-14 md:w-20 md:h-20'} flex items-center justify-center overflow-hidden rounded-lg md:rounded-xl bg-slate-950/50 border border-white/5`}>
        {/* Industrial corners - subtle but techy */}
        <div className={`absolute ${isSmall ? 'top-0.5 left-0.5 w-1.5 h-1.5' : 'top-1 left-1 w-2 h-2 md:top-2 md:left-2 md:w-3 md:h-3'} border-t border-l border-blue-500/50`}></div>
        <div className={`absolute ${isSmall ? 'bottom-0.5 right-0.5 w-1.5 h-1.5' : 'bottom-1 right-1 w-2 h-2 md:bottom-2 md:right-2 md:w-3 md:h-3'} border-b border-r border-blue-500/50`}></div>

        <img
          src="/logo_site.png"
          alt={text || 'Vector Logo'}
          style={{ transform: `scale(${scale})` }}
          className="w-full h-full object-contain relative z-10 transition-transform duration-700"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      <div className="flex flex-col leading-tight justify-center">
        {/* RegionBadge внутри текстового блока — резервируем 16px высоты в шапке */}
        {!isSmall ? (
          <div style={{ height: '16px', marginBottom: '2px', display: 'flex', alignItems: 'center' }}>
            {regionBadge?.enabled && (
              <RegionBadge
                text={regionBadge.text}
                style={regionBadge.style}
                isLight={light}
                variant="header"
              />
            )}
          </div>
        ) : (
          regionBadge?.enabled && (
            <div className="mb-1">
              <RegionBadge
                text={regionBadge.text}
                style={regionBadge.style}
                isLight={light}
                variant="header"
              />
            </div>
          )
        )}

        <div className={`flex items-center ${isSmall ? 'gap-1 md:gap-1.5' : 'gap-1.5 md:gap-2.5'}`}>
          <span className={`${isSmall ? 'text-sm md:text-base' : 'text-lg md:text-2xl'} font-black tracking-tighter ${light ? 'text-slate-900' : 'text-white'}`}>{text || 'VECTOR'}</span>
          <div className={`${isSmall ? 'w-0.5 h-0.5' : 'w-1 h-1 md:w-1.5 md:h-1.5'} rounded-full bg-blue-500 shadow-lg shadow-blue-500/20`}></div>
        </div>
        <span className={`${isSmall ? 'text-[8px] md:text-[10px]' : 'text-[9px] md:text-[11px]'} font-bold tracking-[0.35em] opacity-60 uppercase ${light ? 'text-slate-600' : 'text-blue-400'}`}>{tagline}</span>
      </div>
    </div>
  );
};

export const Counter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // Парсим значение, заменяя запятую на точку для корректных вычислений
  const endValue = typeof end === 'string' ? parseFloat(end.replace(',', '.')) : end;
  const isFloat = typeof end === 'string' && end.includes(',');


  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isNaN(endValue)) return;
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentCount = progress * endValue;
      setCount(currentCount);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, endValue, duration]);

  const displayValue = isFloat
    ? count.toLocaleString('ru-RU', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
    : Math.floor(count).toLocaleString('ru-RU');

  return <span ref={nodeRef}>{displayValue}{suffix}</span>;
};

export const SectionWrapper = ({ children, className = '', id, pattern = '' }) => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const patternClass = pattern === 'grid' ? 'bg-grid-pattern' : pattern === 'dots' ? 'bg-dot-pattern' : '';

  return (
    <section id={id} ref={ref} className={`reveal py-10 md:py-14 px-6 relative overflow-hidden scroll-mt-24 md:scroll-mt-32 ${className}`}>
      {patternClass && <div className={`absolute inset-0 opacity-[0.05] md:opacity-[0.08] pointer-events-none ${patternClass}`}></div>}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};
