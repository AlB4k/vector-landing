import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X, Check, Shield } from 'lucide-react';
import { interpolate } from '../utils/content';

export const CookieBanner = ({ data, fullContent }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = (type) => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      accepted: type === 'all',
      date: new Date().toISOString()
    }));
    setIsVisible(false);
    // Notify system to activate analytics
    window.dispatchEvent(new Event('cookieConsentUpdated'));
  };

  if (!isVisible || !data) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 md:bottom-6 md:left-auto md:right-8 md:max-w-md z-[60] animate-fadeInUp p-4 md:p-0">
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-blue-500/20 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-blue-900/20 relative overflow-hidden text-left safe-p-bottom">
        {/* Decorative background mark */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-6 right-6 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-5 mb-8">
          <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-500 border border-blue-500/20 shrink-0">
            <Cookie size={24} />
          </div>
          <div>
            <h4 className="text-sm font-black text-[var(--text-main)] uppercase tracking-widest mb-2">{interpolate(data.title, fullContent)}</h4>
            <p className="text-[11px] leading-relaxed text-[var(--text-muted)] font-medium">
              {interpolate(data.description, fullContent)}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handleAccept('all')}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40"
          >
            <Check size={14} /> {interpolate(data.btnAll, fullContent)}
          </button>
          <button
            onClick={() => handleAccept('essential')}
            className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
          >
            <Shield size={14} /> {interpolate(data.btnEssential, fullContent)}
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-800 text-center">
          <Link to="/privacy" className="text-[9px] font-bold text-slate-500 hover:text-blue-400 uppercase tracking-widest transition-colors underline underline-offset-4 decoration-slate-800">
            Подробнее в Политике конфиденциальности
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};
