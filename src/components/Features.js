import React from 'react';
import { SectionWrapper, DynamicIcon } from './Shared';
import { interpolate } from '../utils/content';

export const Features = ({ data, fullContent }) => {
  if (!data || !data.items) return null;
  return (
    <SectionWrapper id="features" className="max-w-6xl mx-auto" pattern="dots">
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-[var(--text-main)]">{interpolate(data.title, fullContent)} <span className="text-blue-600 dark:text-blue-500">{interpolate(data.accent, fullContent)}</span></h2>
        <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">{interpolate(data.subtitle, fullContent)}</p>
      </div>
      <div className="hidden md:block h-px flex-1 bg-slate-200 dark:bg-slate-800 mx-12 mb-5"></div>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      {data.items.map((feat, i) => (
        <div key={i} className="p-6 md:p-8 rounded-xl border border-[var(--border)] card-hover flex flex-col items-start shadow-sm" style={{ background: 'var(--card-bg)' }}>
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
            <DynamicIcon name={feat.icon} size={24} />
          </div>
          <h3 className="text-lg font-bold mb-3 text-[var(--text-main)]">{interpolate(feat.title, fullContent)}</h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed font-medium">{interpolate(feat.desc, fullContent)}</p>
        </div>
      ))}
    </div>
  </SectionWrapper>
  );
};
