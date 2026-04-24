import React from 'react';
import { Counter, SectionWrapper } from './Shared';

export const Stats = ({ data }) => {
  const activeStats = data.filter(stat => stat.val > 0);

  if (activeStats.length === 0) return null;

  return (
    <SectionWrapper id="stats" className="py-12 md:py-16 border-y border-[var(--border)]" style={{ backgroundColor: 'var(--bg-secondary)' }} pattern="dots">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-12">
        {activeStats.map((stat, i) => (
          <div key={i} className="relative group pl-6 border-l border-blue-500/30 hover:border-blue-500/60 transition-colors">
          {/* Tech decoration */}
          <div className="absolute top-0 left-0 w-1 h-4 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]"></div>

          <div className="flex flex-col gap-1">
            <div className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tighter text-[var(--text-main)] font-mono break-all sm:break-normal">
              <Counter end={stat.val} suffix={stat.suffix} />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-blue-500/40"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400 leading-none">{stat.label}</p>
            </div>
          </div>

          {/* Background decoration (hidden tech label) */}
          <div className="absolute -bottom-4 right-0 text-[40px] font-black text-[var(--text-main)] opacity-[0.03] md:opacity-[0.05] select-none pointer-events-none uppercase tracking-tighter">
            STAT_{i+1}
          </div>
        </div>
      ))}
    </div>
  </SectionWrapper>
  );
};
