import React from 'react';
import { MapPin, Shield, CheckCircle2 } from 'lucide-react';
import { SectionWrapper } from './Shared';
import { interpolate } from '../utils/content';

// --- Модульные SVG-варианты ---

const RadarVariant = ({ isLight }) => (
  <g>
    {/* Концентрические круги радара */}
    <circle cx="200" cy="200" r="160" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
    <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.15" />
    <circle cx="200" cy="200" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
    <circle cx="200" cy="200" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />

    {/* Скан-линии */}
    <line x1="40" y1="200" x2="360" y2="200" stroke="currentColor" strokeWidth="0.5" opacity={isLight ? 0.2 : 0.1} />
    <line x1="200" y1="40" x2="200" y2="360" stroke="currentColor" strokeWidth="0.5" opacity={isLight ? 0.2 : 0.1} />

    {/* Вращающийся луч */}
    <g className="origin-center animate-spin" style={{ animationDuration: '4s' }}>
      <path
        d="M200,200 L200,40 A160,160 0 0,1 360,200 Z"
        fill="url(#radarGradient)"
        opacity={isLight ? 0.4 : 0.6}
      />
      <line x1="200" y1="200" x2="200" y2="40" stroke="currentColor" strokeWidth={isLight ? 1.2 : 1.5} className={isLight ? "text-blue-600" : "text-blue-400"} />
    </g>

    {/* Мерцающие точки интереса */}
    {[
      { x: 150, y: 150, d: '0s' },
      { x: 280, y: 140, d: '1.2s' },
      { x: 230, y: 300, d: '2.5s' },
      { x: 110, y: 240, d: '3.7s' }
    ].map((pt, i) => (
      <circle
        key={i}
        cx={pt.x}
        cy={pt.y}
        r="2"
        fill="currentColor"
        className="animate-pulse"
        style={{ animationDelay: pt.d }}
      />
    ))}
  </g>
);

const MeshVariant = ({ isLight }) => {
  const lines = 12;
  const color = isLight ? 'stroke-blue-700' : 'stroke-blue-400';

  return (
    <g className={isLight ? "opacity-50" : "opacity-30"}>
      {/* Горизонтальные линии с перспективой */}
      {[...Array(lines)].map((_, i) => {
        const y = 100 + (i * 20);
        const perspectiveScale = 0.5 + (i / lines) * 1.5;
        const width = 300 * perspectiveScale;
        const xStart = 200 - width / 2;
        const xEnd = 200 + width / 2;

        return (
          <line
            key={`h-${i}`}
            x1={xStart}
            y1={y}
            x2={xEnd}
            y2={y}
            className={`${color} animate-pulse`}
            strokeWidth={isLight ? "0.8" : "0.5"}
            opacity={0.1 + (i / lines) * 0.4}
            style={{ animationDelay: `${i * 0.1}s`, animationDuration: '3s' }}
          />
        );
      })}

      {/* Вертикальные линии (сходящиеся в точку) */}
      {[...Array(lines)].map((_, i) => {
        const xTop = 150 + (i * (100 / (lines - 1)));
        const xBottom = 50 + (i * (300 / (lines - 1)));

        return (
          <line
            key={`v-${i}`}
            x1={xTop}
            y1={100}
            x2={xBottom}
            y2={340}
            className={`${color} animate-pulse`}
            strokeWidth={isLight ? "0.8" : "0.5"}
            opacity={isLight ? 0.3 : 0.2}
            style={{ animationDelay: `${i * 0.1}s`, animationDuration: '3s' }}
          />
        );
      })}

      {/* Анимированный узел */}
      <circle cx="200" cy="220" r="100" fill="url(#meshRadial)" opacity={isLight ? 0.6 : 0.4} className="animate-pulse" />
    </g>
  );
};

const TopologyVariant = ({ isLight }) => (
  <g className="transition-all duration-1000">
    {[...Array(6)].map((_, i) => (
      <path
        key={i}
        d={`M${80 + i * 5},${160 + i * 5} C${120 - i * 2},${80 - i * 5} ${280 + i * 5},${100 - i * 2} ${320 - i * 5},${180 + i * 5} S${260 + i * 5},${300 + i * 5} ${180 + i * 2},${340 - i * 5} S${80 + i * 5},${260 + i * 5} ${80 + i * 5},${160 + i * 5}`}
        fill="none"
        stroke="currentColor"
        strokeWidth={isLight ? "1.2" : "0.8"}
        opacity={isLight ? 0.15 + i * 0.03 : 0.15 + i * 0.03}
        className="animate-morph-slow"
        style={{
          animationDelay: `${i * 0.5}s`,
          filter: !isLight ? 'drop-shadow(0 0 3px currentColor)' : 'drop-shadow(0 0 1px rgba(0,0,0,0.1))'
        }}
      />
    ))}
  </g>
);

const PulseVariant = ({ isLight }) => {
  const nodes = [
    { x: 250, y: 120 },
    { x: 300, y: 180 },
    { x: 120, y: 280 }
  ];

  return (
    <g>
      {/* Расширяющиеся волны из центра (Воронеж) */}
      {[...Array(3)].map((_, i) => (
        <circle
          key={`ripple-${i}`}
          cx="200"
          cy="200"
          r="0"
          fill="none"
          stroke="currentColor"
          strokeWidth={isLight ? "1.5" : "2"}
          className="animate-ripple"
          style={{ animationDelay: `${i * 1.3}s` }}
        />
      ))}

      {/* Пульсирующие линии связи */}
      {nodes.map((node, i) => (
        <path
          key={`link-${i}`}
          d={`M200,200 Q${(200 + node.x) / 2 + 15},${(200 + node.y) / 2 - 15} ${node.x},${node.y}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={isLight ? "0.8" : "0.5"}
          strokeDasharray="4 4"
          className="animate-pulse-flow"
          opacity={isLight ? "0.4" : "0.5"}
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </g>
  );
};

const IsometricVariant = ({ isLight }) => {
  const nodes = [
    { x: 200, y: 200, h: 60, delay: '0s' },
    { x: 250, y: 120, h: 40, delay: '0.2s' },
    { x: 300, y: 180, h: 30, delay: '0.4s' },
    { x: 120, y: 280, h: 50, delay: '0.6s' }
  ];

  return (
    <g transform="translate(20, -20) rotate(15) skewX(-20) scale(0.95)">
      {/* Изометрическая сетка */}
      <g opacity={isLight ? "0.08" : "0.1"}>
        {[...Array(11)].map((_, i) => (
          <React.Fragment key={i}>
            <line x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="currentColor" strokeWidth={isLight ? "0.8" : "0.5"} />
            <line x1={i * 40} y1="0" x2={i * 40} y2="400" stroke="currentColor" strokeWidth={isLight ? "0.8" : "0.5"} />
          </React.Fragment>
        ))}
      </g>

      {/* Столбики данных */}
      {nodes.map((node, i) => (
        <g key={i} transform={`translate(${node.x}, ${node.y})`}>
          {/* Эффект свечения в основании */}
          <ellipse cx="0" cy="0" rx="10" ry="4" fill="currentColor" opacity="0.1" className="animate-pulse" />

          {/* Вертикальный индикатор */}
          <rect
            x="-2"
            y={-node.h}
            width="4"
            height={node.h}
            fill="url(#isoBarGradient)"
            className="animate-grow-y"
            style={{ animationDelay: node.delay, transformOrigin: 'bottom' }}
          />

          {/* Верхушка столбика */}
          <circle
            cx="0"
            cy={-node.h}
            r="3"
            fill="currentColor"
            className="animate-bounce"
            style={{ animationDelay: node.delay, animationDuration: '3s' }}
          />

          {/* Соединительная линия (проекция) */}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2={-node.h}
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2 2"
            opacity="0.3"
          />
        </g>
      ))}
    </g>
  );
};

const DigitalVariant = ({ isLight }) => {
  const hexRadius = 12;
  const hexWidth = hexRadius * 2;
  const hexHeight = Math.sqrt(3) * hexRadius;
  const rows = 12;
  const cols = 12;

  const colorClass = isLight ? 'text-slate-500' : 'text-emerald-500';
  const accentClass = isLight ? 'text-blue-600' : 'text-cyan-400';

  const getHexPath = (cx, cy, r) => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      points.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
    }
    return `M ${points.join(' L ')} Z`;
  };

  return (
    <g className={colorClass}>
      {[...Array(rows)].map((_, row) => (
        [...Array(cols)].map((_, col) => {
          const cx = col * hexWidth * 0.75 + 50;
          const cy = row * hexHeight + (col % 2 ? hexHeight / 2 : 0) + 50;

          // Проверка вхождения в примерную область (упрощенно)
          if (cx < 50 || cx > 350 || cy < 50 || cy > 350) return null;

          const isAccent = Math.random() > 0.8;
          const delay = Math.random() * 5;
          const duration = 1 + Math.random() * 3;

          return (
            <path
              key={`${row}-${col}`}
              d={getHexPath(cx, cy, hexRadius - 2)}
              fill="none"
              stroke="currentColor"
              strokeWidth={isLight ? "0.8" : "0.5"}
              className={`${isAccent ? accentClass : ''} animate-flicker`}
              style={{
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                opacity: isAccent ? (isLight ? 0.8 : 0.6) : (isLight ? 0.3 : 0.2)
              }}
            />
          );
        })
      ))}
    </g>
  );
};

const BlueprintVariant = ({ isLight }) => (
  <g>
    {/* Техническая координатная сетка */}
    <g opacity={isLight ? "0.1" : "0.15"}>
      {[...Array(21)].map((_, i) => (
        <React.Fragment key={i}>
          <line x1={i * 20} y1="0" x2={i * 20} y2="400" stroke="currentColor" strokeWidth="0.2" />
          <line x1="0" y1={i * 20} x2="400" y2={i * 20} stroke="currentColor" strokeWidth="0.2" />
        </React.Fragment>
      ))}
    </g>

    {/* Оси координат с маркерами */}
    <g opacity="0.4" className={isLight ? "text-blue-700" : "text-blue-400"}>
      <line x1="20" y1="380" x2="380" y2="380" stroke="currentColor" strokeWidth="1" markerEnd="url(#arrowhead)" />
      <line x1="20" y1="380" x2="20" y2="20" stroke="currentColor" strokeWidth="1" markerEnd="url(#arrowhead)" />
      <text x="385" y="384" fontSize="8" fontFamily="monospace" fontWeight="bold">X</text>
      <text x="16" y="14" fontSize="8" fontFamily="monospace" fontWeight="bold">Y</text>

      {/* Шкалы */}
      {[50, 100, 150, 200, 250, 300, 350].map(val => (
        <React.Fragment key={val}>
          <line x1={val} y1="378" x2={val} y2="382" stroke="currentColor" strokeWidth="1" />
          <line x1="18" y1={val} x2="22" y2={val} stroke="currentColor" strokeWidth="1" />
        </React.Fragment>
      ))}
    </g>

    {/* Технические аннотации (размеры) */}
    <g className={`text-[7px] font-mono ${isLight ? "text-blue-800" : "text-blue-300"}`} opacity="0.5">
      {/* Горизонтальный размер */}
      <path d="M100,140 L100,80 M300,180 L300,80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
      <path d="M100,90 L300,90" stroke="currentColor" strokeWidth="0.5" markerStart="url(#arrowhead-rev)" markerEnd="url(#arrowhead)" />
      <text x="180" y="86" fill="currentColor">dist_x: 200.00mm</text>

      {/* Вертикальный размер */}
      <path d="M300,180 L360,180 M280,280 L360,280" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
      <path d="M350,180 L350,280" stroke="currentColor" strokeWidth="0.5" markerStart="url(#arrowhead-rev)" markerEnd="url(#arrowhead)" />
      <text x="354" y="235" fill="currentColor" transform="rotate(90, 354, 235)">dist_y: 100.00mm</text>

      {/* Угловая пометка */}
      <path d="M200,200 L240,160" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 2" />
      <text x="215" y="175" fill="currentColor" transform="rotate(-45, 215, 175)">∠45°_REF</text>
    </g>

    {/* Технический штамп (декоративный) */}
    <rect x="300" y="340" width="80" height="30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <line x1="300" y1="355" x2="380" y2="355" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    <text x="305" y="351" fontSize="5" fontFamily="monospace" opacity="0.3">DWG_NO: VTR-36</text>
    <text x="305" y="366" fontSize="5" fontFamily="monospace" opacity="0.3">SCALE: 1:500</text>
  </g>
);

const MAP_VARIANTS = {
  radar: RadarVariant,
  'radar-light': (props) => <RadarVariant {...props} isLight={true} />,
  mesh: MeshVariant,
  'mesh-light': (props) => <MeshVariant {...props} isLight={true} />,
  topology: TopologyVariant,
  'topology-light': (props) => <TopologyVariant {...props} isLight={true} />,
  pulse: PulseVariant,
  'pulse-light': (props) => <PulseVariant {...props} isLight={true} />,
  isometric: IsometricVariant,
  'isometric-light': (props) => <IsometricVariant {...props} isLight={true} />,
  digital: DigitalVariant,
  'digital-light': (props) => <DigitalVariant {...props} isLight={true} />,
  blueprint: BlueprintVariant,
  'blueprint-light': (props) => <BlueprintVariant {...props} isLight={true} />,
  default: () => null
};

const MAP_OPTIONS = [
  'radar', 'radar-light',
  'mesh', 'mesh-light',
  'blueprint', 'blueprint-light',
  'isometric', 'isometric-light',
  'topology', 'topology-light',
  'pulse', 'pulse-light',
  'digital', 'digital-light',
  'default'
];

const BaseLayer = ({ variant, isLight }) => {
  const isIsometric = variant === 'isometric';
  const transform = isIsometric ? "translate(20, -20) rotate(15) skewX(-20) scale(0.95)" : "";

  return (
    <g transform={transform}>
      {/* Абстрактная форма Воронежской области */}
      <path
        d="M100,150 L150,100 L250,120 L300,180 L280,280 L180,320 L120,280 Z"
        fill={variant === 'blueprint' ? 'url(#mapGradient)' : 'none'}
        stroke="currentColor"
        strokeWidth={variant === 'blueprint' ? "1" : "2"}
        strokeDasharray={variant === 'blueprint' ? '4 2' : '8 4'}
        className={`${isLight ? 'text-blue-600' : 'text-blue-500'} transition-all duration-1000`}
      />

      {/* Анимированные линии связи */}
      <path
        d="M200,200 L250,120 M200,200 L300,180 M200,200 L120,280"
        stroke="currentColor"
        strokeWidth="1"
        className={`${isLight ? 'text-blue-500/30' : 'text-blue-400/30'} animate-pulse`}
      />

      {/* Главная точка города */}
      <circle cx="200" cy="200" r={isIsometric ? "4" : "6"} className={`${isLight ? 'fill-blue-600' : 'fill-blue-500'} shadow-xl`} />
      {!isIsometric && (
        <circle cx="200" cy="200" r="12" className={`fill-none animate-ping ${isLight ? 'stroke-blue-600/50' : 'stroke-blue-500/50'}`} />
      )}

      {/* Региональные точки */}
      <circle cx="250" cy="120" r={isIsometric ? "2" : "4"} className={`fill-slate-500 transition-colors ${isLight ? 'group-hover:fill-blue-600' : 'group-hover:fill-blue-400'}`} />
      <circle cx="300" cy="180" r={isIsometric ? "2" : "4"} className={`fill-slate-500 transition-colors ${isLight ? 'group-hover:fill-blue-600' : 'group-hover:fill-blue-400'}`} />
      <circle cx="120" cy="280" r={isIsometric ? "2" : "4"} className={`fill-slate-500 transition-colors ${isLight ? 'group-hover:fill-blue-600' : 'group-hover:fill-blue-400'}`} />
    </g>
  );
};

export const ServiceArea = ({ data, fullContent, isLight }) => {
  const mapVariant = React.useMemo(() => {
    if (!data) return 'default';
    if (data.randomMapVariant) {
      return MAP_OPTIONS[Math.floor(Math.random() * MAP_OPTIONS.length)];
    }
    return data.mapVariant || 'default';
  }, [data]);

  if (!data || !data.locations) return null;

  const isForcedLight = mapVariant.endsWith('-light');
  const VariantComponent = MAP_VARIANTS[mapVariant] || MAP_VARIANTS.default;

  return (
    <SectionWrapper id="geography" /* id="geography" — не менять, используется в навигации */ className="max-w-7xl mx-auto" pattern="mesh">
      <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Лево: Интерактивная карта */}
        <div className="relative aspect-[4/3] sm:aspect-square max-w-lg mx-auto lg:mx-0 group w-full">
          <div className={`absolute inset-0 rounded-3xl md:rounded-[3rem] blur-2xl transition-all duration-1000 ${
            isLight || isForcedLight ? 'bg-blue-600/10 group-hover:bg-blue-600/20' : 'bg-blue-500/10 group-hover:bg-blue-500/20'
          }`}></div>

          <div className={`relative h-full w-full backdrop-blur-xl border rounded-3xl md:rounded-[3rem] p-4 md:p-8 flex items-center justify-center overflow-hidden transition-colors duration-500 ${
            isLight || isForcedLight
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
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="isoBarGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
                </linearGradient>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                </marker>
                <marker id="arrowhead-rev" markerWidth="10" markerHeight="7" refX="1" refY="3.5" orient="auto">
                  <polygon points="10 0, 0 3.5, 10 7" fill="currentColor" />
                </marker>
                <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="meshRadial" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotPattern)" />

              <style>{`
                @keyframes grow-y {
                  from { transform: scaleY(0); }
                  to { transform: scaleY(1); }
                }
                .animate-grow-y {
                  animation: grow-y 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                @keyframes slow-fade {
                  0% { opacity: 0.1; }
                  50% { opacity: 0.3; }
                  100% { opacity: 0.1; }
                }
                .animate-slow-fade {
                  animation: slow-fade 4s ease-in-out infinite;
                }
                @keyframes morph {
                  0%, 100% { transform: scale(1) rotate(0deg); }
                  50% { transform: scale(1.05) rotate(1deg); }
                }
                .animate-morph-slow {
                  animation: morph 10s ease-in-out infinite;
                  transform-origin: center;
                }
                @keyframes ripple {
                  0% { r: 0; opacity: 0; }
                  20% { opacity: 0.4; }
                  100% { r: 250; opacity: 0; }
                }
                .animate-ripple {
                  animation: ripple 4s cubic-bezier(0.2, 0.4, 0.6, 1) infinite;
                }
                @keyframes pulse-flow {
                  0% { stroke-dashoffset: 24; }
                  100% { stroke-dashoffset: 0; }
                }
                .animate-pulse-flow {
                  animation: pulse-flow 3s linear infinite;
                }
                @keyframes flicker {
                  0%, 100% { opacity: 0.2; }
                  50% { opacity: 1; }
                }
                .animate-flicker {
                  animation: flicker 3s ease-in-out infinite;
                }
              `}</style>

              {/* Элементы карты, специфичные для варианта */}
              <VariantComponent isLight={isLight || isForcedLight} />

              {/* Общий базовый слой */}
              <BaseLayer variant={mapVariant} isLight={isLight || isForcedLight} />
            </svg>

            {/* Промышленные информационные метки */}
            <div className={`absolute top-6 left-6 md:top-10 md:left-10 p-2.5 md:p-3 border rounded-lg text-[7px] md:text-[8px] font-mono uppercase tracking-widest leading-none shadow-sm ${
              isLight ? 'bg-white/90 border-slate-200 text-blue-700' : 'bg-black/60 border-white/10 text-blue-500'
            }`}>
              <p>{interpolate(fullContent.ui?.regionLabel, fullContent) || 'Region'}: Voronezh_36</p>
              <p className="mt-1 opacity-50">{interpolate(fullContent.ui?.coverageLabel, fullContent) || 'S_Coverage'}: 98.4%</p>
              {mapVariant !== 'default' && (
                <p className={`mt-1 font-bold ${isLight ? 'text-blue-600' : 'text-blue-500'}`}>
                  Mode: <span className={isLight ? 'bg-blue-600/10 px-1 rounded' : ''}>{mapVariant.toUpperCase()}</span>
                </p>
              )}
            </div>

            <div className={`absolute bottom-6 right-6 md:bottom-10 md:right-10 p-2.5 md:p-3 border rounded-lg text-[7px] md:text-[8px] font-mono uppercase tracking-widest leading-none text-right shadow-sm ${
              isLight ? 'bg-white/90 border-slate-200 text-blue-700' : 'bg-black/60 border-white/10 text-blue-500'
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
