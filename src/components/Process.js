import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper } from './Shared';
import { interpolate } from '../utils/content';

export const Process = ({ data, fullContent, isLight }) => {
  if (!data || !data.steps) return null;
  return (
    <SectionWrapper id="process" className="max-w-6xl mx-auto" pattern="grid">
    <div className="mb-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-[var(--text-main)]">
        {interpolate(data.title, fullContent)} <span className={isLight ? 'text-blue-600' : 'text-blue-500'}>{interpolate(data.accent, fullContent)}</span>
      </h2>
      <p className="text-[var(--text-muted)] text-sm max-w-xl">{interpolate(data.subtitle, fullContent)}</p>
    </div>
    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
      {data.steps.map((item, i) => (
        <div key={i} className="relative p-6 md:p-8 rounded-2xl md:rounded-xl border border-[var(--border)] card-hover group shadow-sm" style={{ background: 'var(--card-bg)' }}>
          <span className="absolute -top-4 left-6 px-4 py-1 rounded-md gradient-bg text-white text-[10px] md:text-xs font-bold shadow-lg">
            {data.stepLabel} {item.step}
          </span>
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 mt-2 text-[var(--text-main)]">{interpolate(item.title, fullContent)}</h3>
          <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed font-medium">{interpolate(item.desc, fullContent)}</p>
        </div>
      ))}
    </div>

    {data.ctaVisible && data.ctaText && (
      <div className="mt-16 flex justify-center">
        <a href="#contact" className="px-10 py-4 rounded-xl gradient-bg text-white font-bold text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-3">
          {interpolate(data.ctaText, fullContent)} <ArrowRight size={18} />
        </a>
      </div>
    )}
  </SectionWrapper>
  );
};
