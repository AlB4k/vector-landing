import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, MapPin, Phone, Mail, Building2, Copy, Check } from 'lucide-react';

export default function Requisites({ content }) {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const CopyButton = ({ text, label }) => (
    <button
      onClick={() => copyToClipboard(text, label)}
      className="ml-3 p-2 rounded-lg bg-white/5 md:bg-transparent md:hover:bg-white/10 text-slate-500 hover:text-blue-400 transition-all flex items-center justify-center min-w-[32px] min-h-[32px]"
      title="Копировать"
    >
      {copied === label ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050508] text-slate-300 font-sans p-6 md:p-12 text-left">
      <meta name="robots" content="noindex, follow" />
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-bold uppercase text-[10px] tracking-widest mb-12 transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Вернуться на главную
        </Link>

        <header className="mb-16 border-b border-slate-900 pb-12 text-center md:text-left">
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 border border-blue-500/20 mx-auto md:mx-0">
            <Building2 size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">Карточка организации</h1>
          <p className="text-sm opacity-50 font-medium tracking-wide">ООО «ВЕКТОР» • Актуальные реквизиты юридического лица</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <section className="bg-slate-900/30 p-8 rounded-[2rem] border border-slate-800/50 shadow-xl">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6 flex items-center gap-2">
                <FileText size={14} /> Основные данные
              </h4>
              <div className="space-y-6">
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1">Полное наименование</p>
                  <p className="text-white font-bold leading-relaxed">Общество с ограниченной ответственностью «ВЕКТОР»</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1">Сокращенное наименование</p>
                  <p className="text-white font-bold tracking-tight">ООО «ВЕКТОР»</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-4 pt-2">
                  <div>
                    <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1">ИНН</p>
                    <div className="flex items-center justify-between md:justify-start">
                      <p className="text-white font-bold font-mono text-base md:text-lg">{content.inn}</p>
                      <CopyButton text={content.inn} label="inn" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1">КПП</p>
                    <div className="flex items-center justify-between md:justify-start">
                      <p className="text-white font-bold font-mono text-base md:text-lg">{content.kpp}</p>
                      <CopyButton text={content.kpp} label="kpp" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-4">
                  <div>
                    <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1">ОГРН</p>
                    <div className="flex items-center justify-between md:justify-start">
                      <p className="text-white font-bold font-mono text-base md:text-lg">{content.ogrn}</p>
                      <CopyButton text={content.ogrn} label="ogrn" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1">ОКВЭД (основной)</p>
                    <p className="text-white font-bold font-mono text-base md:text-lg">{content.okved}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1">Генеральный директор</p>
                  <p className="text-white font-bold leading-relaxed">{content.ceo}</p>
                </div>
              </div>
            </section>

            <section className="bg-slate-900/30 p-8 rounded-[2rem] border border-slate-800/50 shadow-xl">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6 flex items-center gap-2">
                <FileText size={14} /> Банковские реквизиты
              </h4>
              <div className="space-y-4 text-sm font-medium">
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1">Наименование банка</p>
                  <p className="text-white leading-tight">{content.bank.name || 'По запросу'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1">БИК</p>
                    <p className="text-white font-mono">{content.bank.bik || '—'}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1">Корр. счет</p>
                    <p className="text-white font-mono">{content.bank.ks || '—'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1">Расчетный счет</p>
                  <div className="flex items-center">
                    <p className="text-white font-bold font-mono text-lg">{content.bank.rs || '—'}</p>
                    {content.bank.rs && <CopyButton text={content.bank.rs} label="rs" />}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-slate-900/30 p-8 rounded-[2rem] border border-slate-800/50 shadow-xl">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6 flex items-center gap-2">
                <Shield size={14} /> Лицензии и статусы
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1">Реестр операторов ПДн</p>
                  <p className="text-white font-bold leading-tight">{content.pdnReg} (Роскомнадзор)</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-1">Основание</p>
                  <p className="text-white font-bold leading-tight">Приказ {content.pdnOrder}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-slate-900/30 p-8 rounded-[2rem] border border-slate-800/50 shadow-xl h-full">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6 flex items-center gap-2">
                <MapPin size={14} /> Контактная информация
              </h4>
              <div className="space-y-6 text-sm">
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-2">Юридический адрес</p>
                  <p className="text-white font-bold leading-relaxed">{content.address}</p>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase text-slate-600 tracking-widest mb-0.5">Телефон</p>
                    <a href={`tel:${content.phone}`} className="text-white font-bold hover:text-blue-400 transition-colors">{content.phone}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase text-slate-600 tracking-widest mb-0.5">Email</p>
                    <a href={`mailto:${content.email}`} className="text-white font-bold hover:text-blue-400 transition-colors">{content.email}</a>
                  </div>
                </div>
                <div className="mt-12 p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                  <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest mb-2 italic">Для запроса банковских реквизитов (р/с) и договоров, пожалуйста, свяжитесь с нашим отделом бухгалтерии.</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className="mt-24 pt-12 border-t border-slate-900 text-center">
          <button
            onClick={() => window.print()}
            className="px-10 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 mx-auto"
          >
            Распечатать карту партнера
          </button>
        </footer>
      </div>
    </div>
  );
}

// Support Icons
const Shield = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
