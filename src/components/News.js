import React from 'react';
import { Newspaper, Calendar } from 'lucide-react';
import { SectionWrapper } from './Shared';

export const News = ({ data }) => {
  if (!data || !data.items || data.items.length === 0) return null;

  return (
    <SectionWrapper id="news" className="max-w-4xl mx-auto px-4 md:px-6">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight text-[var(--text-main)] uppercase">
          {data.title} <span className="text-blue-600 dark:text-blue-500">{data.accent}</span>
        </h2>
      </div>

      <div className="space-y-6 md:space-y-8">
        {data.items.map((item, i) => (
          <div key={i} className="group relative p-6 md:p-8 rounded-3xl border border-[var(--border)] transition-all hover:border-blue-500/30 shadow-sm overflow-hidden" style={{ background: 'var(--card-bg)' }}>
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
              {/* Date & Icon Block */}
              <div className="flex items-center md:flex-col gap-3 md:gap-2 md:w-24 shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
                  <Newspaper size={20} />
                </div>
                <div className="flex items-center gap-2 md:justify-center">
                  <Calendar size={12} className="text-blue-500/50" />
                  <span className="text-[10px] md:text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest font-mono">
                    {item.date}
                  </span>
                </div>
              </div>

              {/* Content Block */}
              <div className="flex-1">
                {item.tag && (
                  <span className="inline-block px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-[8px] font-black text-blue-500 uppercase tracking-widest mb-3">
                    {item.tag}
                  </span>
                )}
                <h3 className="text-lg md:text-xl font-black mb-3 text-[var(--text-main)] tracking-tight leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>

            {/* Industrial tech decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] select-none pointer-events-none font-mono text-[40px] font-black italic">
              NEWS_0{i + 1}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};
