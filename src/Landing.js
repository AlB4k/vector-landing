import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Sun,
  Moon,
  Lock,
  Check,
  ChevronUp
} from 'lucide-react';
import { Logo, DynamicIcon as LogoIcon } from './components/Shared';
import { RegionBadge } from './components/RegionBadge';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Stats } from './components/Stats';
import { Process } from './components/Process';
import { Services } from './components/Services';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';
import { News } from './components/News';
import { ServiceArea } from './components/ServiceArea';
import { TrustedClients } from './components/TrustedClients';
import { Contact } from './components/Contact';
import { BPO } from './components/BPO';
import { CookieBanner } from './components/CookieBanner';
import BackgroundAnimation from './components/BackgroundAnimation';
import { interpolate } from './utils/content';

// --- STYLES ---
const animations = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slow-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  .reveal {
    opacity: 0;
    transform: translateY(15px);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }
  .gradient-text {
    background: linear-gradient(90deg, var(--accent-from), var(--accent-to));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .gradient-bg {
    background: linear-gradient(135deg, var(--accent-from), var(--accent-to));
  }
  .border-soft {
    border: 1px solid var(--border);
  }
  .card-hover {
    transition: all 0.3s ease;
  }
  .card-hover:hover {
    border-color: var(--accent-from);
    transform: translateY(-2px);
    background: var(--bg-secondary);
    opacity: 0.9;
  }
`;

// --- MAIN COMPONENT ---

export default function Landing({ content, theme, setTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLight = theme === 'light';
  const [activeModal, setActiveModal] = useState(null);
  const [emailValue, setEmailValue] = useState('');


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themeConfig = content?.theme?.[theme] || (theme === 'light' ? content?.theme?.light : content?.theme?.dark) || {
    primary: '#050508',
    secondary: '#0a0a0f',
    accentFrom: '#1e40af',
    accentTo: '#06b6d4',
    textMain: '#f8fafc',
    textMuted: '#64748b',
    blur: '12px'
  };

  const themeStyles = {
    '--bg-primary': themeConfig.primary,
    '--bg-secondary': themeConfig.secondary,
    '--accent-from': themeConfig.accentFrom,
    '--accent-to': themeConfig.accentTo,
    '--text-main': themeConfig.textMain,
    '--text-muted': themeConfig.textMuted,
    '--card-bg': isLight ? '#ffffff' : 'rgba(30, 41, 59, 0.4)',
    '--border': isLight ? 'rgba(15, 23, 42, 0.18)' : 'rgba(255, 255, 255, 0.08)',
    '--nav-bg': isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(10, 10, 15, 0.85)',
    '--blur': themeConfig.blur,
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (emailValue) { setActiveModal('success'); setEmailValue(''); }
  };

  const renderSection = (section) => {
    if (!section.enabled) return null;
    switch (section.id) {
      case 'hero': return <Hero key={section.id} data={content.hero} config={content.hotlineConfig} isLight={isLight} fullContent={content} />;
      case 'features': return <Features key={section.id} data={content.features} isLight={isLight} fullContent={content} />;
      case 'trustedClients': return <TrustedClients key={section.id} data={content.trustedClients} isLight={isLight} fullContent={content} />;
      case 'stats': return <Stats key={section.id} data={content.stats} isLight={isLight} fullContent={content} />;
      case 'process': return <Process key={section.id} data={content.process} isLight={isLight} fullContent={content} />;
      case 'services': return <Services key={section.id} data={content.services} isLight={isLight} fullContent={content} />;
      case 'reviews': return <Reviews key={section.id} data={content.reviews} isLight={isLight} fullContent={content} />;
      case 'bpo': return <BPO key={section.id} data={content.bpo} isLight={isLight} fullContent={content} />;
      case 'geography': return <ServiceArea key={section.id} data={content.serviceArea} isLight={isLight} fullContent={content} />;
      case 'faq': return <FAQ key={section.id} data={content.faq} isLight={isLight} fullContent={content} />;
      case 'news': return <News key={section.id} data={content.news} isLight={isLight} fullContent={content} />;
      case 'contact': return <Contact key={section.id} data={content.contact} companyInfo={{ phone: content.phone, email: content.email, address: content.address, companyName: content.companyName }} socials={content.socialsList || content.socials} integrations={content.integrations} handleFormSubmit={handleFormSubmit} emailValue={emailValue} setEmailValue={setEmailValue} isLight={isLight} fullContent={content} />;
      default: return null;
    }
  };

  return (
    <div style={{ ...themeStyles, backgroundColor: 'var(--bg-primary)', color: 'var(--text-main)', minHeight: '100vh' }} className="font-sans transition-colors duration-500 overflow-x-hidden text-left relative">
      <BackgroundAnimation config={content.backgroundAnimation} isLight={isLight} />
      <style>{animations}</style>

      <CookieBanner data={content.cookieBanner} fullContent={content} />

      {/* Scroll Progress Bar */}
      {content.ui?.showScrollProgress && (
        <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none">
          <div
            className="h-full gradient-bg shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
      )}

      {/* Back to Top */}
      {content.ui?.showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Вернуться в начало страницы"
          className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[70] p-3 md:p-4 rounded-xl md:rounded-2xl ${isLight ? 'bg-white border-slate-200 text-blue-600 shadow-blue-500/10' : 'bg-slate-900 border-white/10 text-blue-500 shadow-black/40'} backdrop-blur-xl border shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
          <ChevronUp size={24} aria-hidden="true" />
        </button>
      )}

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-slow-fade">
          <div className={`w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 p-8 md:p-12 shadow-2xl relative ${isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}`}>
            <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors" aria-label="Закрыть окно"><X size={24} aria-hidden="true" /></button>
            {activeModal === 'success' && content.modals?.success && (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-white shadow-lg"><Check size={40} /></div>
                <h3 className="text-3xl font-bold mb-4">{content.modals.success.title}</h3>
                <p className="opacity-60 mb-8">{content.modals.success.subtitle}</p>
                <button onClick={() => setActiveModal(null)} className="px-10 py-3 rounded-xl gradient-bg text-white font-bold">{content.modals.success.button}</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${isScrolled ? 'backdrop-blur-md border-b border-[var(--border)]' : 'bg-transparent'}`} style={{ backgroundColor: isScrolled ? 'var(--nav-bg)' : 'transparent' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div style={{cursor:'pointer'}} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo
              light={isLight}
              customScale={content.logoScaleHeader}
              tagline={content.companyTagline}
              text={content.logoText}
              regionBadge={content.regionBadge}
            />
          </div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.15em] opacity-80">
            {content.sections.filter(s => s.enabled && s.id !== 'hero').map((s) => (
              <a key={s.id} href={`#${s.id}`} className="hover:text-blue-500 transition-colors">{interpolate(s.label, content)}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setTheme(isLight ? 'dark' : 'light')} className="ml-6 p-2 rounded-lg border border-[var(--border)] hover:bg-slate-500/10 transition-all" aria-label={isLight ? (interpolate(content.ui?.themeToggleDark, content) || 'Переключить на темную тему') : (interpolate(content.ui?.themeToggleLight, content) || 'Переключить на светлую тему')}>
              {isLight ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
            </button>
            <a href={`tel:${content.phone}`} className="hidden lg:flex items-center gap-2 gradient-bg text-white px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest shadow-xl shadow-blue-900/10 hover:brightness-110 transition-all">
              <Phone size={14} aria-hidden="true" /> {interpolate(content.hero.btnPrimary, content)}
            </a>
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(true)} aria-label={interpolate(content.ui?.openMenu, content) || 'Открыть мобильное меню'}><Menu size={24} aria-hidden="true" /></button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-[#08080f]/98 backdrop-blur-2xl transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-16">
            <div onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="cursor-pointer">
              <Logo
                light={false}
                variant="small"
                customScale={content.logoScaleFooter}
                tagline={interpolate(content.companyTagline, content)}
                text={interpolate(content.logoText, content)}
                regionBadge={content.regionBadge}
              />
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10 active:scale-90 transition-all" aria-label={interpolate(content.ui?.closeMenu, content) || 'Закрыть мобильное меню'}>
              <X size={24} aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col gap-5 md:gap-6 text-2xl sm:text-3xl font-black uppercase tracking-tighter">
            {content.sections.filter(s => s.enabled).map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`transition-all duration-500 transform ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'} active:text-blue-500`}
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="text-blue-500 mr-3 md:mr-4 text-xs md:text-sm font-mono opacity-40">0{i+1}</span>
                {interpolate(s.label, content)}
              </a>
            ))}
          </div>

          <div className="mt-auto pt-12 border-t border-white/5">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-6 text-center">{interpolate(content.hero.hotlineLabel, content)}</p>
            <a href={`tel:${content.phone}`} className="w-full flex justify-center items-center gap-4 gradient-bg py-5 rounded-2xl text-2xl font-black shadow-2xl shadow-blue-500/20 active:scale-95 transition-all text-white">
              <Phone size={24} /> {interpolate(content.phone, content)}
            </a>
          </div>
        </div>
      </div>

      {/* Dynamic Sections */}
      {content.sections.map(section => renderSection(section))}

      {/* Footer */}
      <footer className="px-4 md:px-6 py-8 md:py-10 border-t border-[var(--border)]" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
          <div className="col-span-1 text-center md:text-left flex flex-col items-center md:items-start">
            <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer flex flex-col items-center md:items-start">
              <Logo light={isLight} variant="small" customScale={content.logoScaleFooter} tagline={interpolate(content.companyTagline, content)} text={interpolate(content.logoText, content)} />
              {content.regionBadge?.enabled && (
                <div style={{marginTop: '4px'}}>
                  <RegionBadge
                    text={content.regionBadge.text}
                    style={content.regionBadge.style}
                    isLight={isLight}
                  />
                </div>
              )}
            </div>
            <p className="mt-6 md:mt-8 text-[11px] md:text-xs leading-relaxed font-medium opacity-60 max-w-sm">{interpolate(content.footer.description, content)}</p>
            <div className="flex items-center gap-3 mt-8 md:mt-10">
              {content.ui?.showSocials && (
                <>
                  <a href={`mailto:${content.email}`} className="w-10 h-10 rounded-lg border border-soft flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all opacity-90"><Mail size={18}/></a>
                  {(content.socialsList || []).map((social, i) => (
                    <a key={i} href={social.url} target="_blank" rel="noreferrer" title={interpolate(social.label, content)} className="w-10 h-10 rounded-lg border border-soft flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all opacity-90">
                      <LogoIcon name={social.icon} size={18} />
                    </a>
                  ))}
                </>
              )}
              <button onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { altKey: true, shiftKey: true, key: 'C' }))} className="w-10 h-10 rounded-lg border border-soft flex items-center justify-center hover:bg-slate-500/10 transition-all opacity-20 hover:opacity-100"><Lock size={14}/></button>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 md:mb-8 text-blue-500">{interpolate(content.footer?.headers?.nav, content) || 'Навигация'}</h4>
            <ul className="space-y-3 md:space-y-4 text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">
              {content.sections.filter(s => s.enabled && s.id !== 'hero').map(s => (
                <li key={s.id}><a href={`#${s.id}`} className="hover:text-blue-500 transition-colors">{interpolate(s.label, content)}</a></li>
              ))}
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 md:mb-8 text-blue-500">{interpolate(content.footer?.headers?.legal, content) || 'Правовая информация'}</h4>
            <ul className="space-y-3 md:space-y-4 text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-80">
              <li><Link to="/privacy" className="hover:text-blue-500 transition-colors">{interpolate(content.pages?.privacy?.title, content) || 'Политика конфиденциальности'}</Link></li>
              <li><Link to="/requisites" className="hover:text-blue-500 transition-colors">{interpolate(content.pages?.requisites?.title, content) || 'Реквизиты организации'}</Link></li>
              <li><Link to="/oferta" className="hover:text-blue-500 transition-colors">{interpolate(content.pages?.oferta?.title, content) || 'Оферта и условия'}</Link></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 md:mb-8 text-blue-500">{interpolate(content.footer?.headers?.contacts, content) || 'Контакты'}</h4>
            <ul className="space-y-4 md:space-y-5 text-xs md:text-sm font-medium opacity-90">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3"><MapPin size={16} className="text-blue-500 shrink-0" /><span className="max-w-[200px] md:max-w-none">{interpolate(content.address, content)}</span></li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3"><Phone size={16} className="text-blue-500 shrink-0" /><span>{interpolate(content.phone, content)}</span></li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3"><Mail size={16} className="text-blue-500 shrink-0" /><span>{interpolate(content.email, content)}</span></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-8 md:pt-12 border-t border-soft flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] opacity-60 text-center md:text-left">
          <p>© {new Date().getFullYear()} {interpolate(content.companyName, content)} • v{interpolate(content.legal.version, content)}</p>
          <div className="flex flex-col md:flex-row gap-4 md:gap-12">
            <p>{interpolate(content.ui?.regLabel, content) || 'Рег.'}: {interpolate(content.pdnReg, content)}</p>
            <p>{interpolate(content.ui?.orderLabel, content) || `Приказ ${interpolate(content.pdnOrder, content)}`}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
