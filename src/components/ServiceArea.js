import React from 'react';
import { MapPin, Shield, CheckCircle2 } from 'lucide-react';
import { SectionWrapper } from './Shared';

export const ServiceArea = ({ data }) => {
  return (
    <SectionWrapper id="serviceArea" className="max-w-7xl mx-auto" pattern="grid">
      <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Left: Interactive Map Visual */}
        <div className="relative aspect-[4/3] sm:aspect-square max-w-lg mx-auto lg:mx-0 group w-full">
          <div className="absolute inset-0 bg-blue-500/10 rounded-3xl md:rounded-[3rem] blur-2xl group-hover:bg-blue-500/20 transition-all duration-1000"></div>

          <div className="relative h-full w-full bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl md:rounded-[3rem] p-4 md:p-8 flex items-center justify-center overflow-hidden">
            {/* Stylized SVG Map Overlay (Abstract representation of region) */}
            <svg viewBox="0 0 400 400" className="w-full h-full opacity-40 group-hover:opacity-60 transition-opacity duration-1000">
              <defs>
                <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="currentColor" fillOpacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotPattern)" />

              {/* Abstract Voronezh Region Shape */}
              <path
                d="M100,150 L150,100 L250,120 L300,180 L280,280 L180,320 L120,280 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 4"
                className="text-blue-500"
              />

              {/* Animated Connection Lines */}
              <path
                d="M200,200 L250,120 M200,200 L300,180 M200,200 L120,280"
                stroke="currentColor"
                strokeWidth="1"
                className="text-blue-400/30 animate-pulse"
              />

              {/* Main City Point */}
              <circle cx="200" cy="200" r="6" className="fill-blue-500 shadow-xl" />
              <circle cx="200" cy="200" r="12" className="stroke-blue-500/50 fill-none animate-ping" />

              {/* Regional Points */}
              <circle cx="250" cy="120" r="4" className="fill-slate-500 group-hover:fill-blue-400 transition-colors" />
              <circle cx="300" cy="180" r="4" className="fill-slate-500 group-hover:fill-blue-400 transition-colors" />
              <circle cx="120" cy="280" r="4" className="fill-slate-500 group-hover:fill-blue-400 transition-colors" />
            </svg>

            {/* Industrial Overlay Labels */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 p-2.5 md:p-3 bg-black/40 border border-white/10 rounded-lg text-[7px] md:text-[8px] font-mono text-blue-400 uppercase tracking-widest leading-none">
              <p>Region: Voronezh_36</p>
              <p className="mt-1 opacity-50">S_Coverage: 98.4%</p>
            </div>

            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 p-2.5 md:p-3 bg-black/40 border border-white/10 rounded-lg text-[7px] md:text-[8px] font-mono text-blue-400 uppercase tracking-widest leading-none text-right">
              <p>Active_Routes: 142</p>
              <p className="mt-1 opacity-50">SLA_Target: 24h</p>
            </div>
          </div>
        </div>

        {/* Right: Textual Content */}
        <div className="space-y-8 md:space-y-10 px-2 md:px-0">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-blue-500/20 bg-blue-500/5 mb-6">
              <MapPin size={14} className="text-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">География работ</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight leading-tight">
              {data.title} <span className="text-blue-500">{data.accent}</span>
            </h2>
            <p className="opacity-50 text-sm md:text-lg max-w-xl leading-relaxed font-medium">
              {data.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {data.locations.map((loc, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group">
                <div className="mt-1 p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">{loc.name}</h4>
                  <p className="text-[10px] opacity-40 font-medium uppercase tracking-widest">{loc.type}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 md:p-8 rounded-3xl md:rounded-[2rem] bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 relative overflow-hidden">
             <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
                <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
                  <Shield size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold mb-1">Собственная курьерская сеть</p>
                  <p className="text-xs opacity-50 max-w-xs font-medium leading-relaxed">Прямой контроль сотрудников без посредников. 100% покрытие во всех районах присутствия.</p>
                </div>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl"></div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
