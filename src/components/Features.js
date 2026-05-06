import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper, DynamicIcon } from './Shared';
import { interpolate } from '../utils/content';

export const Features = ({ data, fullContent, isLight }) => {
  if (!data || !data.items) return null;
  return (
    <SectionWrapper id="features" className="max-w-6xl mx-auto" pattern="dots">
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-[var(--text-main)]">
          {interpolate(data.title, fullContent)} <span className={isLight ? 'text-blue-600' : 'text-blue-500'}>{interpolate(data.accent, fullContent)}</span>
        </h2>
        <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">{interpolate(data.subtitle, fullContent)}</p>
      </div>
      <div className={`hidden md:block h-px flex-1 mx-12 mb-5 ${isLight ? 'bg-slate-200' : 'bg-slate-800'}`}></div>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      {data.items.map((feat, i) => (
        <div key={i} className="p-6 md:p-8 rounded-xl border border-[var(--border)] card-hover flex flex-col items-start shadow-sm" style={{ background: 'var(--card-bg)' }}>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${isLight ? 'bg-blue-600/10 text-blue-600' : 'bg-blue-500/10 text-blue-400'}`}>
            <DynamicIcon name={feat.icon} size={24} />
          </div>
          <h3 className="text-lg font-bold mb-3 text-[var(--text-main)]">{interpolate(feat.title, fullContent)}</h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed font-medium">{interpolate(feat.desc, fullContent)}</p>
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
