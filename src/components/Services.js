import React from 'react';
import { Check } from 'lucide-react';
import { SectionWrapper } from './Shared';

export const Services = ({ data }) => (
  <SectionWrapper id="services" className="max-w-6xl mx-auto" pattern="dots">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-[var(--text-main)]">{data.title} <span className="text-blue-600 dark:text-blue-500">{data.accent}</span></h2>
      <p className="text-[var(--text-muted)] text-sm max-w-xl mx-auto">{data.subtitle}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
      {data.list.map((srv, i) => (
        <div key={i} className={`p-6 sm:p-10 rounded-2xl border border-[var(--border)] flex flex-col hover:border-blue-500/30 transition-all relative shadow-sm ${srv.popular ? 'border-2 border-blue-500/30 bg-blue-500/5 shadow-2xl shadow-blue-900/10' : ''}`} style={{ background: 'var(--card-bg)' }}>
          <div className="absolute top-4 left-4 text-[8px] font-mono opacity-20 dark:opacity-40 select-none text-[var(--text-main)]">SRV_TYPE_{i+1}</div>
          {srv.popular && <div className="absolute top-6 right-6 px-3 py-1 rounded-md gradient-bg text-white text-[9px] font-bold uppercase tracking-[0.15em] shadow-lg shadow-blue-500/20">ЦЕНТРАЛЬНЫЙ ТАРИФ</div>}
          <h3 className="text-xl sm:text-2xl font-black mb-2 mt-4 text-[var(--text-main)]">{srv.title}</h3>
          <p className="text-[10px] text-blue-600 dark:text-blue-400 opacity-80 mb-6 sm:mb-8 font-bold uppercase tracking-widest">{srv.badge}</p>
          <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 flex-1">
            {srv.features.map(f => (
              <li key={f} className="flex items-center gap-3 text-sm text-[var(--text-main)] opacity-90 leading-snug">
                <Check size={16} className="text-blue-600 dark:text-blue-500 shrink-0" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <a href="#contact" className={`w-full py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all flex justify-center items-center ${srv.popular ? 'gradient-bg text-white shadow-lg' : 'border border-slate-700 hover:bg-slate-800'}`}>
            {srv.button}
          </a>
        </div>
      ))}
    </div>
  </SectionWrapper>
);
