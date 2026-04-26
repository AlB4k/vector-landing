import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { DynamicIcon } from './Shared';

export const Hero = ({ data, config }) => {
  const isOnline = React.useMemo(() => {
    if (!config || !config.scheduleEnabled) return true;
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();
    const isWorkDay = config.workDays.includes(day);
    return isWorkDay && hour >= config.startHour && hour < config.endHour;
  }, [config]);

  return (
    <section className="relative pt-24 pb-16 md:pt-48 md:pb-32 px-6 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-grid-pattern"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10" style={{ animation: 'fadeInUp 0.8s ease-out forwards' }}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left Side: Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-blue-500/20 bg-blue-500/5 mb-6 md:mb-8">
              <DynamicIcon name="ShieldCheck" size={14} className="text-blue-600 dark:text-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">{data.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] md:leading-[1.05] mb-6 md:mb-8 tracking-tighter">
              {data.title1} <br />
              <span className="gradient-text">{data.titleGradient}</span>
            </h1>
            <p className="text-base md:text-xl opacity-80 mb-10 md:mb-12 max-w-2xl lg:mx-0 mx-auto leading-relaxed font-medium px-2 sm:px-0">
              {data.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-5 px-4 sm:px-0">
              <a href="#contact" className="w-full sm:w-auto px-10 py-4 rounded-xl gradient-bg text-white font-bold text-sm shadow-2xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                {data.btnPrimary} <ArrowRight size={20} aria-hidden="true" />
              </a>
              <a href="#services" className="w-full sm:w-auto px-10 py-4 rounded-xl border border-slate-700 font-bold text-sm hover:bg-slate-800/50 transition-all flex justify-center items-center">
                {data.btnSecondary}
              </a>
            </div>
          </div>

          {/* Right Side: Hotline Plate */}
          <div className="w-full lg:w-auto px-4 sm:px-0">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl md:rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div
                className="relative backdrop-blur-xl border border-[var(--border)] p-6 sm:p-10 rounded-3xl md:rounded-[2.5rem] shadow-2xl flex flex-col items-center lg:items-start text-center lg:text-left transition-colors duration-500"
                style={{ background: 'var(--card-bg)' }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <DynamicIcon name={data.hotlineIcon || 'Phone'} size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400/80 mb-2">{data.hotlineLabel}</span>
                <a href={`tel:${data.hotlinePhone}`} className="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--text-main)] hover:text-blue-600 dark:hover:text-blue-400 transition-colors tracking-tight">
                  {data.hotlinePhone}
                </a>
                {config && config.showBadge && (
                  <div className={`mt-6 flex items-center gap-2 px-3 py-1.5 rounded-lg border ${isOnline ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-blue-400'}`}></div>
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {isOnline ? (config.statusOnline || 'Линия активна') : (config.statusOffline || 'Офлайн')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20 hidden md:flex">
        <span className="text-[9px] font-bold uppercase tracking-[0.4em] rotate-180 [writing-mode:vertical-lr]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent"></div>
      </div>
    </section>
  );
};
