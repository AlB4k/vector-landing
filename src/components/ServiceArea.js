import React from 'react';
import { MapPin, Shield, CheckCircle2 } from 'lucide-react';
import { SectionWrapper } from './Shared';
import { interpolate } from '../utils/content';

// --- Модульные SVG-варианты ---

const RadarVariant = () => (
  <g className="animate-pulse">
    <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5" opacity="0.3" />
    <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5" opacity="0.2" />
    <line x1="200" y1="50" x2="200" y2="350" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
  </g>
);

const MeshVariant = () => (
  <path d="M50,200 Q100,50 200,200 T350,200" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" className="animate-slow-fade" />
);

const TopologyVariant = () => (
  <g opacity="0.15" className="animate-slow-fade">
    {[...Array(6)].map((_, i) => (
      <path
        key={i}
        d={`M${50 + i * 10},${100 + i * 20} Q150,${50 + i * 10} 350,${100 + i * 20}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray={i % 2 === 0 ? "5 5" : "none"}
      />
    ))}
    {[...Array(6)].map((_, i) => (
      <path
        key={i + 6}
        d={`M${50 + i * 20},${350 - i * 10} Q200,${300 - i * 20} 350,${350 - i * 10}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
      />
    ))}
  </g>
);

const PulseVariant = () => (
  <g className="animate-slow-fade">
    <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.05" />
    <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
    <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.15" className="animate-ping" />
    <circle cx="200" cy="200" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 4" className="animate-spin" style={{ animationDuration: '20s' }} />
    <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
    <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
  </g>
);

const HeatmapVariant = () => (
  <g className="animate-slow-fade">
    <circle cx="200" cy="200" r="80" fill="url(#heatGradient)" opacity="0.6" />
    <circle cx="250" cy="120" r="50" fill="url(#heatGradient)" opacity="0.4" />
    <circle cx="300" cy="180" r="40" fill="url(#heatGradient)" opacity="0.3" />
    <circle cx="120" cy="280" r="60" fill="url(#heatGradient)" opacity="0.4" />
  </g>
);

const IsometricVariant = ({ isLight }) => (
  <g>
    <circle cx="160" cy="140" r="3" className={isLight ? "fill-blue-500/40" : "fill-blue-400/40"} />
    <circle cx="240" cy="250" r="3" className={isLight ? "fill-blue-500/40" : "fill-blue-400/40"} />
    <path d="M160,140 L200,200 L240,250" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
  </g>
);

const DigitalVariant = () => (
  <g className="opacity-20 animate-pulse">
    {[...Array(12)].map((_, i) => (
      <rect
        key={i}
        x={50 + (i % 4) * 80}
        y={50 + Math.floor(i / 4) * 80}
        width="2"
        height="2"
        fill="currentColor"
      />
    ))}
  </g>
);

const BlueprintVariant = () => null; // Обрабатывается как переопределение базового слоя

const MAP_VARIANTS = {
  radar: RadarVariant,
  mesh: MeshVariant,
  topology: TopologyVariant,
  pulse: PulseVariant,
  heatmap: HeatmapVariant,
  isometric: IsometricVariant,
  digital: DigitalVariant,
  blueprint: BlueprintVariant,
  default: () => null
};

const MAP_OPTIONS = ['radar', 'mesh', 'blueprint', 'isometric', 'topology', 'pulse', 'heatmap', 'digital', 'default'];

const BaseLayer = ({ variant, isLight }) => (
  <>
    {/* Абстрактная форма Воронежской области */}
    <path
      d="M100,150 L150,100 L250,120 L300,180 L280,280 L180,320 L120,280 Z"
      fill={variant === 'blueprint' ? 'url(#mapGradient)' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeDasharray={variant === 'blueprint' ? 'none' : '8 4'}
      className={`${isLight ? 'text-blue-600' : 'text-blue-500'} will-change-transform`}
    />

    {/* Анимированные линии связи */}
    <path
      d="M200,200 L250,120 M200,200 L300,180 M200,200 L120,280"
      stroke="currentColor"
      strokeWidth="1"
      className={`${isLight ? 'text-blue-500/30' : 'text-blue-400/30'} animate-pulse will-change-opacity`}
    />

    {/* Главная точка города */}
    <circle cx="200" cy="200" r="6" className={`${isLight ? 'fill-blue-600' : 'fill-blue-500'} shadow-xl`} />
    <circle cx="200" cy="200" r="12" className={`fill-none animate-ping will-change-transform ${isLight ? 'stroke-blue-600/50' : 'stroke-blue-500/50'}`} />

    {/* Региональные точки */}
    <circle cx="250" cy="120" r="4" className={`fill-slate-500 transition-colors ${isLight ? 'group-hover:fill-blue-600' : 'group-hover:fill-blue-400'}`} />
    <circle cx="300" cy="180" r="4" className={`fill-slate-500 transition-colors ${isLight ? 'group-hover:fill-blue-600' : 'group-hover:fill-blue-400'}`} />
    <circle cx="120" cy="280" r="4" className={`fill-slate-500 transition-colors ${isLight ? 'group-hover:fill-blue-600' : 'group-hover:fill-blue-400'}`} />
  </>
);

export const ServiceArea = ({ data, fullContent, isLight }) => {
  const mapVariant = React.useMemo(() => {
    if (!data) return 'default';
    if (data.randomMapVariant) {
      return MAP_OPTIONS[Math.floor(Math.random() * MAP_OPTIONS.length)];
    }
    return data.mapVariant || 'default';
  }, [data]);

  if (!data || !data.locations) return null;

  const VariantComponent = MAP_VARIANTS[mapVariant] || MAP_VARIANTS.default;

  return (
    <SectionWrapper id="geography" className="max-w-7xl mx-auto" pattern="mesh">
      <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Лево: Интерактивная карта */}
        <div className="relative aspect-[4/3] sm:aspect-square max-w-lg mx-auto lg:mx-0 group w-full">
          <div className={`absolute inset-0 rounded-3xl md:rounded-[3rem] blur-2xl transition-all duration-1000 ${
            isLight ? 'bg-blue-600/10 group-hover:bg-blue-600/20' : 'bg-blue-500/10 group-hover:bg-blue-500/20'
          }`}></div>

          <div className={`relative h-full w-full backdrop-blur-xl border rounded-3xl md:rounded-[3rem] p-4 md:p-8 flex items-center justify-center overflow-hidden transition-colors duration-500 ${
            isLight
              ? 'bg-white/40 border-slate-200 text-blue-600'
              : 'bg-slate-900/40 border-white/10 text-blue-500'
          }`}>
            {/* Стилизованное SVG-наложение карты */}
            <svg viewBox="0 0 400 400" className="w-full h-full opacity-40 group-hover:opacity-60 transition-opacity duration-1000">
              <defs>
                <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="currentColor" fillOpacity="0.2" />
                </pattern>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-from)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="var(--accent-to)" stopOpacity="0.1" />
                </linearGradient>
                <radialGradient id="heatGradient">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotPattern)" />

              {/* Элементы карты, специфичные для варианта */}
              <VariantComponent isLight={isLight} />

              {/* Общий базовый слой */}
              <BaseLayer variant={mapVariant} isLight={isLight} />
            </svg>

            {/* Промышленные информационные метки */}
            <div className={`absolute top-6 left-6 md:top-10 md:left-10 p-2.5 md:p-3 border rounded-lg text-[7px] md:text-[8px] font-mono uppercase tracking-widest leading-none ${
              isLight ? 'bg-white/80 border-slate-200 text-blue-600' : 'bg-black/40 border-white/10 text-blue-500'
            }`}>
              <p>{interpolate(fullContent.ui?.regionLabel, fullContent) || 'Region'}: Voronezh_36</p>
              <p className="mt-1 opacity-50">{interpolate(fullContent.ui?.coverageLabel, fullContent) || 'S_Coverage'}: 98.4%</p>
              {mapVariant !== 'default' && (
                <p className={`mt-1 font-bold ${isLight ? 'text-blue-600' : 'text-blue-500'}`}>
                  Mode: {mapVariant.toUpperCase()}
                </p>
              )}
            </div>

            <div className={`absolute bottom-6 right-6 md:bottom-10 md:right-10 p-2.5 md:p-3 border rounded-lg text-[7px] md:text-[8px] font-mono uppercase tracking-widest leading-none text-right ${
              isLight ? 'bg-white/80 border-slate-200 text-blue-600' : 'bg-black/40 border-white/10 text-blue-500'
            }`}>
              <p>Active_Routes: 142</p>
              <p className="mt-1 opacity-50">SLA_Target: 24h</p>
            </div>
          </div>
        </div>

        {/* Право: Текстовый контент */}
        <div className="space-y-8 md:space-y-10 px-2 md:px-0">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md border mb-6 ${
              isLight ? 'border-blue-600/20 bg-blue-600/5' : 'border-blue-500/20 bg-blue-500/5'
            }`}>
              <MapPin size={14} className="text-blue-600 dark:text-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">{interpolate(fullContent.ui?.geographyLabel, fullContent) || 'География работ'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight leading-tight text-[var(--text-main)]">
              {interpolate(data.title, fullContent)} <span className="text-blue-600 dark:text-blue-500">{interpolate(data.accent, fullContent)}</span>
            </h2>
            <p className="text-[var(--text-muted)] text-sm md:text-lg max-w-xl leading-relaxed font-medium">
              {interpolate(data.subtitle, fullContent)}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {data.locations.map((loc, i) => (
              <div key={i} className={`flex items-start gap-4 p-5 rounded-2xl border border-[var(--border)] transition-all group shadow-sm relative overflow-hidden ${
                isLight ? 'hover:border-blue-600/30' : 'hover:border-blue-500/30'
              }`} style={{ background: 'var(--card-bg)' }}>
                <div className={`mt-1 p-2 rounded-lg group-hover:scale-110 transition-transform relative z-10 ${
                  isLight ? 'bg-blue-600/10 text-blue-600' : 'bg-blue-500/10 text-blue-400'
                }`}>
                  <CheckCircle2 size={18} />
                </div>
                <div className="relative z-10 flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold text-sm mb-1 text-[var(--text-main)]">{interpolate(loc.name, fullContent)}</h4>
                    {loc.status && (
                      <span className={`text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border whitespace-nowrap ${
                        isLight
                          ? 'bg-blue-600/10 text-blue-600 border-blue-600/20'
                          : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      }`}>
                        {interpolate(loc.status, fullContent)}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[var(--text-muted)] opacity-70 font-medium uppercase tracking-widest">{interpolate(loc.type, fullContent)}</p>
                  {loc.freq && (
                    <p className={`text-[9px] font-bold uppercase tracking-widest mt-2 flex items-center gap-1.5 ${
                      isLight ? 'text-blue-600/70' : 'text-blue-500/60'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${isLight ? 'bg-blue-600/50' : 'bg-blue-500/40'}`}></span>
                      {interpolate(loc.freq, fullContent)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={`p-6 md:p-8 rounded-3xl md:rounded-[2rem] bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border relative overflow-hidden ${
            isLight ? 'border-blue-600/20' : 'border-blue-500/20'
          }`}>
             <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left">
                <div className={`w-12 h-12 rounded-2xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white shadow-lg shrink-0 ${
                  isLight ? 'shadow-blue-600/20' : 'shadow-blue-500/20'
                }`}>
                  <Shield size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold mb-1 text-[var(--text-main)]">{interpolate(fullContent.ui?.ownNetworkTitle, fullContent) || 'Собственная курьерская сеть'}</p>
                  <p className="text-xs text-[var(--text-muted)] max-w-xs font-medium leading-relaxed">
                    {interpolate(data.ownNetworkNote, fullContent) || 'Прямой контроль сотрудников без посредников. 100% покрытие во всех районах присутствия.'}
                  </p>
                </div>
             </div>
             <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl ${isLight ? 'bg-blue-600/10' : 'bg-blue-500/10'}`}></div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
