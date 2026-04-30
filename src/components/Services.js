import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { SectionWrapper } from './Shared';
import { interpolate } from '../utils/content';

export const Services = ({ data, fullContent, isLight }) => {
  if (!data || !data.list) return null;
  return (
  <SectionWrapper id="services" className="max-w-6xl mx-auto" pattern="dots">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-[var(--text-main)]">
        {interpolate(data.title, fullContent)} <span className={isLight ? "text-blue-600" : "text-blue-500"}>{interpolate(data.accent, fullContent)}</span>
      </h2>
      <p className="text-[var(--text-muted)] text-sm max-w-xl mx-auto">{interpolate(data.subtitle, fullContent)}</p>
    </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
    {data.list.map((srv, i) => {
      const isRecommended = srv.status === 'recommended' || srv.popular;
      const isDevelopment = srv.status === 'development';
      const showBadge = srv.status !== 'none' && (srv.status || srv.popular);

      return (
        <div
          key={i}
          className={`p-6 sm:p-10 rounded-2xl border border-[var(--border)] flex flex-col transition-all relative shadow-sm ${
            isLight ? 'hover:border-blue-600/30' : 'hover:border-blue-500/30'
          } ${
            isRecommended ? `border-2 ${isLight ? 'border-blue-600/20 bg-blue-600/5 shadow-blue-600/5' : 'border-blue-500/30 bg-blue-500/5 shadow-2xl shadow-blue-900/10'}` : ''
          } ${
            isDevelopment ? 'opacity-70 grayscale-[0.5]' : ''
          }`}
          style={{ background: 'var(--card-bg)' }}
        >
          {/* Индустриальные декоративные элементы */}
          <div className="absolute top-4 left-4 flex flex-col opacity-20 dark:opacity-40 select-none font-mono">
            <span className="text-[8px] font-bold tracking-widest">SRV_TYPE_0{i+1}</span>
            <span className="text-[6px] opacity-50 tracking-[0.2em]">VECTOR_MOD_{i+1}</span>
          </div>

          {/* Бейджи статуса */}
          {showBadge && (
            <div className={`absolute top-6 right-6 px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-[0.15em] shadow-lg ${
              isRecommended
                ? 'gradient-bg text-white shadow-blue-500/20'
                : isLight ? 'bg-slate-100 text-slate-500 border border-slate-200' : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}>
              {isRecommended ? (interpolate(srv.accentBadge, fullContent) || interpolate(fullContent.ui?.recommendedLabel, fullContent) || 'РЕКОМЕНДУЕМ') : (isDevelopment ? (interpolate(fullContent.ui?.inDevelopment, fullContent) || 'В РАЗРАБОТКЕ') : interpolate(srv.badge, fullContent))}
            </div>
          )}

          <h3 className="text-xl sm:text-2xl font-black mb-2 mt-4 text-[var(--text-main)]">{interpolate(srv.title, fullContent)}</h3>
          <p className={`text-[10px] opacity-80 mb-6 sm:mb-8 font-bold uppercase tracking-widest ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>
            {interpolate(srv.badge, fullContent)}
          </p>

          <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 flex-1">
            {srv.features.map((f, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm text-[var(--text-main)] opacity-90 leading-snug">
                <Check size={16} className={isLight ? "text-blue-600 shrink-0" : "text-blue-400 shrink-0"} aria-hidden="true" />
                {interpolate(f, fullContent)}
              </li>
            ))}
          </ul>

          {/* Кнопка действия */}
          <a
            href={isDevelopment ? "#" : "#contact"}
            onClick={isDevelopment ? (e) => e.preventDefault() : undefined}
            className={`w-full py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all flex justify-center items-center ${
              isDevelopment
                ? isLight ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : isRecommended
                  ? 'gradient-bg text-white shadow-lg'
                  : isLight ? 'border border-slate-200 hover:bg-slate-50 text-slate-600' : 'border border-slate-700 hover:bg-slate-800 text-slate-300'
            }`}
          >
            {isDevelopment ? (interpolate(fullContent.ui?.comingSoon, fullContent) || 'Скоро будет') : interpolate(srv.button, fullContent)}
          </a>
        </div>
      );
    })}
  </div>

  {data.ctaVisible && data.ctaText && (
    <div className="mt-20 flex justify-center">
      <a href="#contact" className="px-10 py-4 rounded-xl gradient-bg text-white font-bold text-sm shadow-xl hover:scale-105 transition-all flex items-center gap-3">
        {interpolate(data.ctaText, fullContent)} <ArrowRight size={18} />
      </a>
    </div>
  )}
    </SectionWrapper>
  );
};
