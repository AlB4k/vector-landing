import React from 'react';
import { ChevronDown } from 'lucide-react';
import { SectionWrapper } from './Shared';

export const FAQ = ({ data }) => (
  <SectionWrapper id="faq" className="max-w-4xl mx-auto px-4 md:px-6">
    <div className="text-center mb-10 md:mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight leading-tight">{data.title} <span className="text-blue-500">{data.accent}</span></h2>
    </div>
    <div className="space-y-3 md:space-y-4">
      {data.items.map((item, i) => (
        <details key={i} className="group p-5 md:p-6 rounded-2xl md:rounded-lg border-soft transition-all hover:bg-slate-900/30" style={{ background: 'var(--card-bg)' }}>
          <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-sm md:text-base pr-4">
            <span className="leading-snug">{item.q}</span>
            <ChevronDown size={18} className="text-blue-500 group-open:rotate-180 transition-transform shrink-0 ml-4" />
          </summary>
          <div className="mt-4 text-xs md:text-sm opacity-50 leading-relaxed font-medium border-t border-white/5 pt-4">{item.a}</div>
        </details>
      ))}
    </div>
  </SectionWrapper>
);
