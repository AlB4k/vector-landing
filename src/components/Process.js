import React from 'react';
import { SectionWrapper } from './Shared';

export const Process = ({ data }) => (
  <SectionWrapper id="process" className="max-w-6xl mx-auto" pattern="grid">
    <div className="mb-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{data.title} <span className="text-blue-500">{data.accent}</span></h2>
      <p className="opacity-50 text-sm max-w-xl">{data.subtitle}</p>
    </div>
    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
      {data.steps.map((item, i) => (
        <div key={i} className="relative p-6 md:p-8 rounded-2xl md:rounded-xl border-soft card-hover group" style={{ background: 'var(--card-bg)' }}>
          <span className="absolute -top-4 left-6 px-4 py-1 rounded-md gradient-bg text-white text-[10px] md:text-xs font-bold shadow-lg">{data.stepLabel} {item.step}</span>
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 mt-2">{item.title}</h3>
          <p className="text-xs md:text-sm opacity-50 leading-relaxed font-medium">{item.desc}</p>
        </div>
      ))}
    </div>
  </SectionWrapper>
);
