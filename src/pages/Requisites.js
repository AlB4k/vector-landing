import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, MapPin, Phone, Mail, Building2, Copy, Check } from 'lucide-react';
import { interpolate } from '../utils/content';

export default function Requisites({ content, theme }) {
  const [copied, setCopied] = useState(null);
  const isLight = theme === 'light';

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const CopyButton = ({ text, label }) => (
    <button
      onClick={() => copyToClipboard(text, label)}
      className={`ml-3 p-2 rounded-lg ${isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-400' : 'bg-white/5 md:bg-transparent md:hover:bg-white/10 text-slate-500'} hover:text-blue-500 transition-all flex items-center justify-center min-w-[32px] min-h-[32px]`}
      title="Копировать"
    >
      {copied === label ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
    </button>
  );

  return (
    <div className={`min-h-screen ${isLight ? 'bg-white text-slate-700' : 'bg-[#050508] text-slate-300'} font-sans p-6 md:p-12 text-left transition-colors duration-500`}>
      <meta name="robots" content="noindex, follow" />
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-bold uppercase text-[10px] tracking-widest mb-12 transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> {interpolate(content.ui?.backToHome, content) || 'Вернуться на главную'}
        </Link>

        <header className={`mb-16 border-b ${isLight ? 'border-slate-100' : 'border-slate-900'} pb-12 text-center md:text-left`}>
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 border border-blue-500/20 mx-auto md:mx-0">
            <Building2 size={32} />
          </div>
          <h1 className={`text-4xl md:text-5xl font-black ${isLight ? 'text-slate-900' : 'text-white'} mb-4 tracking-tight uppercase`}>{interpolate(content.pages?.requisites?.title, content) || 'Карточка организации'}</h1>
          <p className="text-sm opacity-50 font-medium tracking-wide">{interpolate(content.pages?.requisites?.subtitle, content) || `${content.companyName} • Актуальные реквизиты юридического лица`}</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <section className={`${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/30 border-slate-800/50'} p-8 rounded-[2rem] border shadow-xl`}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6 flex items-center gap-2">
                <FileText size={14} /> {interpolate(content.ui?.mainData, content) || 'Основные данные'}
              </h4>
              <div className="space-y-6">
                <div>
                  <p className={`text-[9px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-600'} tracking-widest mb-1`}>{interpolate(content.ui?.fullName, content) || 'Полное наименование'}</p>
                  <p className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold leading-relaxed`}>{interpolate(content.pages?.requisites?.fullCompanyName, content) || `Общество с ограниченной ответственностью «${content.logoText || 'ВЕКТОР'}»`}</p>
                </div>
                <div>
                  <p className={`text-[9px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-600'} tracking-widest mb-1`}>{interpolate(content.ui?.shortName, content) || 'Сокращенное наименование'}</p>
                  <p className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold tracking-tight`}>{interpolate(content.companyName, content)}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-4 pt-2">
                  <div>
                    <p className={`text-[9px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-600'} tracking-widest mb-1`}>{interpolate(content.ui?.innLabel, content) || 'ИНН'}</p>
                    <div className="flex items-center justify-between md:justify-start">
                      <p className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold font-mono text-base md:text-lg`}>{interpolate(content.inn, content)}</p>
                      <CopyButton text={content.inn} label="inn" />
                    </div>
                  </div>
                  <div>
                    <p className={`text-[9px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-600'} tracking-widest mb-1`}>{interpolate(content.ui?.kppLabel, content) || 'КПП'}</p>
                    <div className="flex items-center justify-between md:justify-start">
                      <p className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold font-mono text-base md:text-lg`}>{interpolate(content.kpp, content)}</p>
                      <CopyButton text={content.kpp} label="kpp" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-4">
                  <div>
                    <p className={`text-[9px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-600'} tracking-widest mb-1`}>{interpolate(content.ui?.ogrnLabel, content) || 'ОГРН'}</p>
                    <div className="flex items-center justify-between md:justify-start">
                      <p className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold font-mono text-base md:text-lg`}>{interpolate(content.ogrn, content)}</p>
                      <CopyButton text={content.ogrn} label="ogrn" />
                    </div>
                  </div>
                  <div>
                    <p className={`text-[9px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-600'} tracking-widest mb-1`}>{interpolate(content.ui?.okvedLabel, content) || 'ОКВЭД (основной)'}</p>
                    <p className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold font-mono text-base md:text-lg`}>{interpolate(content.okved, content)}</p>
                  </div>
                </div>
                <div>
                  <p className={`text-[9px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-600'} tracking-widest mb-1`}>{interpolate(content.ceoLabel, content) || 'Генеральный директор'}</p>
                  <p className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold leading-relaxed`}>{interpolate(content.ceo, content)}</p>
                </div>
              </div>
            </section>

            <section className={`${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/30 border-slate-800/50'} p-8 rounded-[2rem] border shadow-xl`}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6 flex items-center gap-2">
                <FileText size={14} /> {interpolate(content.ui?.bankRequisites, content) || 'Банковские реквизиты'}
              </h4>
              <div className="space-y-4 text-sm font-medium">
                <div>
                  <p className={`text-[9px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-600'} tracking-widest mb-1`}>{interpolate(content.ui?.bankName, content) || 'Наименование банка'}</p>
                  <p className={`${isLight ? 'text-slate-900' : 'text-white'} leading-tight font-bold`}>{interpolate(content.bank.name, content) || 'По запросу'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`text-[9px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-600'} tracking-widest mb-1`}>{interpolate(content.ui?.bikLabel, content) || 'БИК'}</p>
                    <p className={`${isLight ? 'text-slate-900' : 'text-white'} font-mono font-bold`}>{interpolate(content.bank.bik, content) || '—'}</p>
                  </div>
                  <div>
                    <p className={`text-[9px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-600'} tracking-widest mb-1`}>{interpolate(content.ui?.ksLabel, content) || 'Корр. счет'}</p>
                    <p className={`${isLight ? 'text-slate-900' : 'text-white'} font-mono font-bold`}>{interpolate(content.bank.ks, content) || '—'}</p>
                  </div>
                </div>
                <div>
                  <p className={`text-[9px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-600'} tracking-widest mb-1`}>{interpolate(content.ui?.rsLabel, content) || 'Расчетный счет'}</p>
                  <div className="flex items-center">
                    <p className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold font-mono text-lg`}>{interpolate(content.bank.rs, content) || '—'}</p>
                    {content.bank.rs && <CopyButton text={content.bank.rs} label="rs" />}
                  </div>
                </div>
              </div>
            </section>

            <section className={`${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/30 border-slate-800/50'} p-8 rounded-[2rem] border shadow-xl`}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6 flex items-center gap-2">
                <Shield size={14} /> {interpolate(content.ui?.licenses, content) || 'Лицензии и статусы'}
              </h4>
              <div className="space-y-4">
                <div>
                  <p className={`text-[9px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-600'} tracking-widest mb-1`}>{interpolate(content.legal.statusLabel, content) || 'Реестр операторов ПДн'}</p>
                  <p className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold leading-tight`}>{interpolate(content.legal.statusValue, content) || `${content.pdnReg} (Роскомнадзор)`}</p>
                </div>
                <div>
                  <p className={`text-[9px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-600'} tracking-widest mb-1`}>{interpolate(content.ui?.basis, content) || 'Основание'}</p>
                  <p className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold leading-tight`}>{interpolate(content.ui?.basisLabel, content) || 'Приказ'} {interpolate(content.pdnOrder, content)}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className={`${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/30 border-slate-800/50'} p-8 rounded-[2rem] border shadow-xl h-full`}>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6 flex items-center gap-2">
                <MapPin size={14} /> {interpolate(content.ui?.contacts, content) || 'Контактная информация'}
              </h4>
              <div className="space-y-6 text-sm">
                <div>
                  <p className={`text-[9px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-600'} tracking-widest mb-2`}>{interpolate(content.ui?.legalAddress, content) || 'Юридический адрес'}</p>
                  <p className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold leading-relaxed`}>{interpolate(content.address, content)}</p>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className={`w-10 h-10 rounded-xl ${isLight ? 'bg-blue-500/10 text-blue-600' : 'bg-slate-800 text-slate-400'} flex items-center justify-center`}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className={`text-[8px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-600'} tracking-widest mb-0.5`}>{interpolate(content.ui?.phoneLabel, content) || 'Телефон'}</p>
                    <a href={`tel:${content.phone}`} className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold hover:text-blue-500 transition-colors`}>{interpolate(content.phone, content)}</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-2">
                  <div className={`w-10 h-10 rounded-xl ${isLight ? 'bg-blue-500/10 text-blue-600' : 'bg-slate-800 text-slate-400'} flex items-center justify-center`}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className={`text-[8px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-600'} tracking-widest mb-0.5`}>{interpolate(content.ui?.emailLabel, content) || 'Email'}</p>
                    <a href={`mailto:${content.email}`} className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold hover:text-blue-500 transition-colors`}>{interpolate(content.email, content)}</a>
                  </div>
                </div>
                <div className={`mt-12 p-6 ${isLight ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-500/5 border-blue-500/10'} border rounded-2xl`}>
                  <p className={`text-[9px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-600'} tracking-widest mb-2 italic`}>{interpolate(content.pages?.requisites?.note, content) || 'Для запроса банковских реквизитов (р/с) и договоров, пожалуйста, свяжитесь с нашим отделом бухгалтерии.'}</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className={`mt-24 pt-12 border-t ${isLight ? 'border-slate-100' : 'border-slate-900'} text-center`}>
          <button
            onClick={() => window.print()}
            className={`${isLight ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-800 hover:bg-slate-700 text-white'} px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-3 mx-auto`}
          >
            {interpolate(content.ui?.printRequisites, content) || 'Распечатать карту партнера'}
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
