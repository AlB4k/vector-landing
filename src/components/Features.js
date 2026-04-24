import React from 'react';
import { SectionWrapper, DynamicIcon } from './Shared';

export const Features = ({ data }) => (
  <SectionWrapper id="features" className="max-w-6xl mx-auto" pattern="dots">
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{data.title} <span className="text-blue-500">{data.accent}</span></h2>
        <p className="opacity-50 text-sm md:text-base leading-relaxed">{data.subtitle}</p>
      </div>
      <div className="hidden md:block h-px flex-1 bg-slate-800 mx-12 mb-5 opacity-20"></div>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      {data.items.map((feat, i) => (
        <div key={i} className="p-6 md:p-8 rounded-xl border-soft card-hover flex flex-col items-start" style={{ background: 'var(--card-bg)' }}>
          <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
            <DynamicIcon name={feat.icon} size={24} />
          </div>
          <h3 className="text-lg font-bold mb-3">{feat.title}</h3>
          <p className="text-xs opacity-50 leading-relaxed font-medium">{feat.desc}</p>
        </div>
      ))}
    </div>
  </SectionWrapper>
);
