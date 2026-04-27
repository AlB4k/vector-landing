import React from 'react';
import { Counter, SectionWrapper } from './Shared';
import { interpolate } from '../utils/content';

export const Stats = ({ data, fullContent, isLight }) => {
  if (!data || !Array.isArray(data)) return null;
  // Позволяем отображать любые статы, где есть заголовок и значение (даже строковое)
  const activeStats = data.filter(stat => stat && stat.label && (stat.val || stat.val === 0));

  if (activeStats.length === 0) return null;

  return (
    <SectionWrapper id="stats" className="py-12 md:py-16 border-y border-[var(--border)]" style={{ backgroundColor: 'var(--bg-secondary)' }} pattern="dots">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-12">
        {activeStats.map((stat, i) => (
          <div key={i} className={`relative group pl-6 border-l transition-colors ${
            isLight ? 'border-blue-600/30 hover:border-blue-600/60' : 'border-blue-500/30 hover:border-blue-500/60'
          }`}>
          {/* Технический декоративный элемент */}
          <div className={`absolute top-0 left-0 w-1 h-4 shadow-[0_0_15px_rgba(59,130,246,0.4)] ${
            isLight ? 'bg-blue-600' : 'bg-blue-500'
          }`}></div>

          <div className="flex flex-col gap-1">
            <div className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter text-[var(--text-main)] font-mono break-all sm:break-normal flex items-baseline gap-1">
              {stat.prefix && <span className="text-2xl md:text-3xl opacity-40 font-bold">{stat.prefix}</span>}
              <Counter end={stat.val} suffix={stat.suffix} />
            </div>
            <div className="flex items-center gap-3">
              <div className={`h-px w-6 ${isLight ? 'bg-blue-600/40' : 'bg-blue-500/40'}`}></div>
              <p className={`text-[10px] font-black uppercase tracking-[0.25em] leading-none ${
                isLight ? 'text-blue-600' : 'text-blue-400'
              }`}>{interpolate(stat.label, fullContent)}</p>
            </div>
          </div>

          {/* Фоновый декор (скрытая техническая метка) */}
          <div className="absolute -bottom-4 right-0 flex flex-col items-end opacity-[0.03] md:opacity-[0.05] select-none pointer-events-none font-mono text-[var(--text-main)]">
            <span className="text-[40px] font-black uppercase tracking-tighter italic">STAT_0{i+1}</span>
            <span className="text-[8px] font-bold tracking-[0.4em] -mt-2">SYS_METRIC_REV.36</span>
          </div>
        </div>
      ))}
    </div>
  </SectionWrapper>
  );
};
