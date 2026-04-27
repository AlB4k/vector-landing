import React, { useState, useMemo } from 'react';
import { SectionWrapper, Counter, DynamicIcon } from './Shared';
import { interpolate } from '../utils/content';

const ClientCard = ({ client, isLight, fullContent }) => {
  const [expanded, setExpanded] = useState(false);
  const hasTestimonial = !!client.testimonial;

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
      className={`relative group p-6 rounded-2xl border border-[var(--border)] transition-all duration-500 cursor-pointer overflow-hidden ${expanded ? 'shadow-2xl z-10' : 'card-hover'}`}
      style={{
        background: 'var(--card-bg)',
        minWidth: '280px',
        maxWidth: expanded ? '400px' : '320px'
      }}
      onClick={() => hasTestimonial && setExpanded(!expanded)}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl overflow-hidden border border-[var(--border)] shrink-0 bg-white/5 shadow-inner">
          {renderLogo()}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-base text-[var(--text-main)] truncate leading-tight mb-1">
            {interpolate(client.name, fullContent)}
          </h4>
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400'}`}>
            {interpolate(client.category, fullContent)}
          </span>
        </div>
      </div>

      <div className="space-y-1.5 mb-2">
        {client.contractSince && (
          <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-blue-500"></span>
            С нами с {client.contractSince} г.
          </p>
        )}
        {client.deliveryVolume && (
          <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-blue-500"></span>
            {interpolate(client.deliveryVolume, fullContent)}
          </p>
        )}
      </div>

      {hasTestimonial && (
        <div className={`transition-all duration-500 overflow-hidden ${expanded ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className={`p-4 rounded-xl italic text-xs leading-relaxed ${isLight ? 'bg-blue-50/50 text-slate-700' : 'bg-blue-900/10 text-slate-400 border border-blue-500/10'}`}>
            "{interpolate(client.testimonial, fullContent)}"
            {client.testimonialAuthor && (
              <p className="not-italic font-black mt-3 text-[10px] uppercase tracking-widest text-blue-500">
                — {interpolate(client.testimonialAuthor, fullContent)}
              </p>
            )}
          </div>
        </div>
      )}

      {hasTestimonial && !expanded && (
        <div className="absolute bottom-2 right-4 text-[8px] font-black uppercase tracking-widest text-blue-500/40 group-hover:text-blue-500 transition-colors">
          Подробнее
        </div>
      )}
    </div>
  );
};

export const TrustedClients = ({ data, fullContent, isLight }) => {
  const visibleClients = useMemo(() =>
    (data?.items || []).filter(c => c.isVisible !== false),
    [data?.items]
  );

  const totalVolume = useMemo(() => {
    let sum = 0;
    let max = 0;
    visibleClients.forEach(c => {
      if (c.deliveryVolume) {
        // Extract numbers from strings like "150 000 квитанций/мес"
        const num = parseInt(c.deliveryVolume.replace(/\s/g, ''));
        if (!isNaN(num)) {
          sum += num;
          if (num > max) max = num;
        }
      }
    });
    return sum > 0 ? sum : max;
  }, [visibleClients]);

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
          <div className="flex flex-col">
            <span className="text-3xl md:text-4xl font-black text-blue-500 leading-none mb-2">
              <Counter end={totalVolume} />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Объем в месяц</span>
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
