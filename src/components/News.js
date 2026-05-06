import React from 'react';
import { Newspaper, Calendar } from 'lucide-react';
import { SectionWrapper } from './Shared';
import { interpolate } from '../utils/content';

export const News = ({ data, fullContent, isLight }) => {
  if (!data || !data.items || data.items.length === 0) return null;

  return (
    <SectionWrapper id="news" className="max-w-4xl mx-auto px-4 md:px-6">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight text-[var(--text-main)] uppercase">
          {interpolate(data.title, fullContent)} <span className={isLight ? 'text-blue-600' : 'text-blue-500'}>{interpolate(data.accent, fullContent)}</span>
        </h2>
      </div>

      <div className="space-y-6 md:space-y-8">
        {data.items.map((item, i) => (
          <div key={i} className={`group relative p-6 md:p-8 rounded-3xl border transition-all shadow-sm overflow-hidden ${
            isLight ? 'hover:border-blue-600/30' : 'hover:border-blue-500/30'
          } border-[var(--border)]`} style={{ background: 'var(--card-bg)' }}>
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
              {/* Блок даты и иконки */}
              <div className="flex items-center md:flex-col gap-3 md:gap-2 md:w-24 shrink-0">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center border group-hover:scale-110 transition-transform ${
                  isLight ? 'bg-blue-600/10 text-blue-600 border-blue-600/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}>
                  <Newspaper size={20} />
                </div>
                <div className="flex items-center gap-2 md:justify-center">
                  <Calendar size={12} className={isLight ? 'text-blue-600/50' : 'text-blue-500/50'} />
                  <span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-widest font-mono ${
                    isLight ? 'text-blue-600' : 'text-blue-400'
                  }`}>
                    {interpolate(item.date, fullContent)}
                  </span>
                </div>
              </div>

              {/* Блок контента */}
              <div className="flex-1">
                {item.tag && (
                  <span className={`inline-block px-2 py-0.5 rounded-md border text-[8px] font-black uppercase tracking-widest mb-3 ${
                    isLight ? 'bg-blue-600/10 border-blue-600/20 text-blue-600' : 'bg-blue-500/10 border-blue-500/20 text-blue-500'
                  }`}>
                    {interpolate(item.tag, fullContent)}
                  </span>
                )}
                <h3 className={`text-lg md:text-xl font-black mb-3 text-[var(--text-main)] tracking-tight leading-tight transition-colors ${
                  isLight ? 'group-hover:text-blue-600' : 'group-hover:text-blue-400'
                }`}>
                  {interpolate(item.title, fullContent)}
                </h3>
                <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-medium">
                  {interpolate(item.desc, fullContent)}
                </p>
              </div>
            </div>

            {/* Индустриальный технический декор */}
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] select-none pointer-events-none font-mono text-right text-[var(--text-main)]">
              <div className="text-[40px] font-black italic leading-none">NEWS_0{i + 1}</div>
              <div className="text-[8px] font-bold tracking-[0.3em] uppercase">LOG_ENTRY_v{i+1}.0.4</div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};
