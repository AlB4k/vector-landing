import React, { useMemo } from 'react';
import { SectionWrapper } from './Shared';
import { interpolate } from '../utils/content';

const getInitials = (name) => {
  // Очищаем название от кавычек и распространенных сокращений типа АО, ООО, Филиал
  const cleanName = name
    .replace(/^(АО|ООО|ЗАО|ПАО|ИП|Филиал|Фонд)\s+/i, '')
    .replace(/[«»""]/g, '')
    .trim();

  const words = cleanName.split(/[\s-]+/).filter(w => w.length > 0);

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return words[0] ? words[0].substring(0, 2).toUpperCase() : 'VC';
};

const ClientCard = ({ client, isLight, fullContent }) => {
  const initials = useMemo(() => getInitials(client.name), [client.name]);

  const renderLogo = () => {
    if (client.logoUrl) {
      return (
        <img
          src={client.logoUrl}
          alt={client.name}
          className="w-full h-full object-contain"
        />
      );
    }

    return (
      <div className="w-full h-full flex items-center justify-center font-black text-lg bg-blue-600 text-white">
        {initials}
      </div>
    );
  };

  return (
    <a
      href={client.website || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col p-6 rounded-2xl border border-[var(--border)] transition-all duration-300 hover:border-blue-500 group shrink-0"
      style={{
        background: 'var(--card-bg)',
        width: '260px',
        height: '180px'
      }}
    >
      <div className="w-12 h-12 rounded-xl overflow-hidden border border-[var(--border)] shrink-0 bg-white/5 shadow-inner mb-4">
        {renderLogo()}
      </div>
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <h4 className="font-bold text-sm text-[var(--text-main)] leading-snug line-clamp-3 overflow-hidden" style={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
          {interpolate(client.name, fullContent)}
        </h4>
        {client.website && (
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest truncate max-w-[80%]">
              {client.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </span>
            <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity ml-2">↗</span>
          </div>
        )}
      </div>
    </a>
  );
};

export const TrustedClients = ({ data, fullContent, isLight }) => {
  const visibleClients = useMemo(() =>
    (data?.items || []).filter(c => c.isVisible !== false),
    [data?.items]
  );

  if (!data || visibleClients.length === 0) return null;

  // Дублируем массив для бесшовности
  const marqueeItems = [...visibleClients, ...visibleClients];

  return (
    <SectionWrapper id="trustedClients" className="max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-[var(--text-main)] leading-[1.1]">
          {interpolate(data.title, fullContent)}
        </h2>
        {data.subtitleVisible && (
          <p className="text-[var(--text-muted)] text-sm md:text-lg leading-relaxed font-medium max-w-2xl">
            {interpolate(data.subtitle, fullContent)}
          </p>
        )}
      </div>

      <div className="marquee-container relative py-4 group">
        <div className="marquee-track flex gap-6 animate-marquee group-hover:pause">
          {marqueeItems.map((client, i) => (
            <ClientCard key={`${client.id}-${i}`} client={client} isLight={isLight} fullContent={fullContent} />
          ))}
        </div>

        <style>{`
          .marquee-container {
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          }

          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 30s linear infinite;
          }

          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }

          .group-hover\\:pause:hover {
            animation-play-state: paused;
          }

          @media (max-width: 768px) {
            .marquee-track {
              animation-duration: 40s;
            }
          }
        `}</style>
      </div>
    </SectionWrapper>
  );
};
