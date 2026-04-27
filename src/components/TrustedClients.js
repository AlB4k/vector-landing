import React, { useState, useMemo } from 'react';
import { SectionWrapper, Counter, DynamicIcon } from './Shared';
import { interpolate } from '../utils/content';

const ClientCard = ({ client, isLight, fullContent }) => {
  // Fallback logo: first letters of name in a colored circle
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
    const initials = client.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    return (
      <div className={`w-full h-full flex items-center justify-center font-black text-lg ${isLight ? 'bg-blue-100 text-blue-600' : 'bg-blue-900/30 text-blue-400'}`}>
        {initials}
      </div>
    );
  };

  return (
    <div
      className="relative group p-6 rounded-2xl border border-[var(--border)] transition-all duration-500 overflow-hidden card-hover"
      style={{
        background: 'var(--card-bg)',
        minWidth: '280px',
        maxWidth: '320px'
      }}
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden border border-[var(--border)] shrink-0 bg-white/5 shadow-inner">
          {renderLogo()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-base text-[var(--text-main)] truncate leading-tight">
            {interpolate(client.name, fullContent)}
          </h4>
          {client.url && (
            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mt-1">
              {client.url}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const TrustedClients = ({ data, fullContent, isLight }) => {
  const visibleClients = useMemo(() =>
    (data?.items || []).filter(c => c.isVisible !== false),
    [data?.items]
  );

  if (!data || visibleClients.length === 0) return null;

  const isMarquee = visibleClients.length > 6;

  return (
    <SectionWrapper id="trustedClients" className="max-w-7xl mx-auto" pattern="grid">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-[var(--text-main)] leading-[1.1]">
            {interpolate(data.title, fullContent)}
          </h2>
          <p className="text-[var(--text-muted)] text-sm md:text-lg leading-relaxed font-medium">
            {interpolate(data.subtitle, fullContent)}
          </p>
        </div>

        <div className="flex gap-8 md:gap-12 shrink-0">
          <div className="flex flex-col">
            <span className="text-3xl md:text-4xl font-black text-blue-500 leading-none mb-2">
              <Counter end={visibleClients.length} />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Компаний</span>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden">
        {isMarquee ? (
          <div className="flex gap-6 animate-marquee hover:pause whitespace-nowrap py-4">
            {/* Double the items for seamless loop */}
            {[...visibleClients, ...visibleClients].map((client, i) => (
              <div key={`${client.id}-${i}`} className="inline-block">
                <ClientCard client={client} isLight={isLight} fullContent={fullContent} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {visibleClients.map(client => (
              <ClientCard key={client.id} client={client} isLight={isLight} fullContent={fullContent} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </SectionWrapper>
  );
};
