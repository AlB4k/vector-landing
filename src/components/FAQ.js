import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { SectionWrapper } from './Shared';
import { interpolate } from '../utils/content';

export const FAQ = ({ data, fullContent, isLight }) => {
  if (!data || !data.items) return null;
  return (
    <SectionWrapper id="faq" className="max-w-4xl mx-auto px-4 md:px-6">
    <div className="text-center mb-10 md:mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight leading-tight text-[var(--text-main)]">
        {interpolate(data.title, fullContent)} <span className={isLight ? 'text-blue-600' : 'text-blue-500'}>{interpolate(data.accent, fullContent)}</span>
      </h2>
    </div>
    <div className="space-y-3 md:space-y-4">
      {data.items.map((item, i) => (
        <details
          key={i}
          className={`group p-5 md:p-6 rounded-2xl md:rounded-lg border border-[var(--border)] transition-all shadow-sm ${
            isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-900/30'
          }`}
          style={{ background: 'var(--card-bg)' }}
        >
          <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm md:text-base pr-4 text-[var(--text-main)]">
            <span className="leading-snug">{interpolate(item.q, fullContent)}</span>
            <ChevronDown size={18} className={`transition-transform shrink-0 ml-4 group-open:rotate-180 ${
              isLight ? 'text-blue-600' : 'text-blue-500'
            }`} />
          </summary>
          <div className="mt-4 text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-medium border-t border-[var(--border)] pt-4">
            {interpolate(item.a, fullContent)}
          </div>
        </details>
      ))}
    </div>

    {data.ctaVisible && data.ctaText && (
      <div className="mt-12 flex justify-center">
        <a href="#contact" className="group flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest">
          {interpolate(data.ctaText, fullContent)} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    )}
  </SectionWrapper>
  );
};
