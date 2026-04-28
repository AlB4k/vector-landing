import React from 'react';
import { ShieldCheck, Printer, Package, CheckCircle2, ArrowRight } from 'lucide-react';
import { SectionWrapper } from './Shared';
import { interpolate } from '../utils/content';

export const BPO = ({ data, fullContent, isLight }) => {
  if (!data || !data.steps || !data.advantages) return null;

  return (
    <SectionWrapper id="bpo" className="max-w-7xl mx-auto" pattern="dots">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Левая сторона: Информационный контент */}
        <div className="flex-1 space-y-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight leading-tight text-[var(--text-main)]">
              {interpolate(data.title, fullContent)} <span className={isLight ? "text-blue-600" : "text-blue-500"}>{interpolate(data.accent, fullContent)}</span>
            </h2>
            <p className={`font-bold uppercase text-[10px] tracking-[0.2em] mb-4 ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>
              {interpolate(fullContent.ui?.pressureSealTech, fullContent) || 'Технология Pressure Seal'}
            </p>
            <p className="text-[var(--text-muted)] text-sm md:text-lg max-w-xl leading-relaxed font-medium">
              {interpolate(data.subtitle, fullContent)}
            </p>
          </div>

          <div className="grid gap-6">
            {data.steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-xs transition-all shadow-lg ${
                    isLight
                      ? 'border-blue-600/30 text-blue-600 group-hover:bg-blue-600 group-hover:text-white shadow-blue-600/10'
                      : 'border-blue-500/30 text-blue-500 group-hover:bg-blue-500 group-hover:text-white shadow-blue-500/10'
                  }`}>
                    {step.num}
                  </div>
                  {idx !== data.steps.length - 1 && <div className={`w-0.5 h-full mt-2 ${isLight ? 'bg-blue-600/10' : 'bg-blue-500/10'}`}></div>}
                </div>
                <div className="pb-8">
                  <h4 className={`font-bold text-lg mb-2 text-[var(--text-main)] transition-colors ${
                    isLight ? 'group-hover:text-blue-600' : 'group-hover:text-blue-400'
                  }`}>{interpolate(step.title, fullContent)}</h4>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed font-medium opacity-80">{interpolate(step.desc, fullContent)}</p>
                </div>
              </div>
            ))}
          </div>

          {data.ctaVisible && data.ctaText && (
            <div className="pt-8">
              <a href="#contact" className="inline-flex px-10 py-4 rounded-xl gradient-bg text-white font-bold text-sm shadow-xl hover:scale-105 transition-all items-center gap-3">
                {interpolate(data.ctaText, fullContent)} <ArrowRight size={18} />
              </a>
            </div>
          )}
        </div>

        {/* Правая сторона: Юридическая справка и преимущества */}
        <div className="w-full lg:w-[400px] shrink-0 space-y-6">
          <div
            className="p-8 rounded-[2.5rem] border border-[var(--border)] relative overflow-hidden group transition-colors duration-500 shadow-xl"
            style={{ background: 'var(--card-bg)' }}
          >
            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl ${
                isLight ? 'bg-blue-600 shadow-blue-600/20' : 'bg-blue-500 shadow-blue-500/20'
              }`}>
                <ShieldCheck size={24} />
              </div>
              <p className={`text-xs font-black uppercase tracking-widest mb-3 ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>
                {interpolate(fullContent.ui?.legalNotice, fullContent) || 'Юридическая справка'}
              </p>
              <p className="text-xs leading-relaxed text-[var(--text-main)] opacity-80 font-medium italic">
                {interpolate(data.legalNote, fullContent)}
              </p>
            </div>
            <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000 ${
              isLight ? 'bg-blue-600/5' : 'bg-blue-500/5'
            }`}></div>
          </div>

          <div
            className="p-8 rounded-[2.5rem] border border-[var(--border)] backdrop-blur-xl transition-colors duration-500 shadow-lg"
            style={{ background: 'var(--card-bg)' }}
          >
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-main)] mb-6 opacity-60">
               {interpolate(fullContent.ui?.bpoEfficiency, fullContent) || 'Эффективность БПО'}
             </h4>
             <ul className="space-y-4">
                {data.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${isLight ? 'text-blue-600' : 'text-blue-500'}`} />
                    <span className="text-xs font-medium text-[var(--text-main)] opacity-90 leading-relaxed">{interpolate(adv, fullContent)}</span>
                  </li>
                ))}
             </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
