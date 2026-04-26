import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, AlertCircle, FileText } from 'lucide-react';
import { interpolate } from '../utils/content';

export default function Oferta({ content, theme }) {
  const isLight = theme === 'light';

  return (
    <div className={`min-h-screen ${isLight ? 'bg-white text-slate-700' : 'bg-[#050508] text-slate-300'} font-sans p-6 md:p-12 transition-colors duration-500`}>
      <meta name="robots" content="noindex, follow" />
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-bold uppercase text-[10px] tracking-widest mb-12 transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> {interpolate(content.ui?.backToHome, content) || 'Вернуться на главную'}
        </Link>

        <header className={`mb-12 md:mb-16 border-b ${isLight ? 'border-slate-100' : 'border-slate-900'} pb-8 md:pb-12 text-center md:text-left`}>
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 border border-blue-500/20 mx-auto md:mx-0">
            <Scale size={32} />
          </div>
          <h1 className={`text-3xl md:text-5xl font-black ${isLight ? 'text-slate-900' : 'text-white'} mb-4 tracking-tight uppercase leading-tight`}>{interpolate(content.pages?.oferta?.title, content) || 'Оферта и условия'}</h1>
          <p className="text-sm opacity-50 font-medium">{interpolate(content.ui?.ofertaSubtitle, content) || 'Юридические условия взаимодействия с'} {interpolate(content.companyName, content)}</p>
        </header>

        <section className={`${isLight ? 'bg-slate-50 border-slate-200 shadow-lg' : 'bg-slate-900/30 border-blue-500/20 shadow-2xl'} p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border mb-8 md:mb-12`}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 mb-8 text-center sm:text-left">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 border border-blue-500/20 shrink-0">
              <AlertCircle size={24} />
            </div>
            <div>
              <h2 className={`text-lg md:text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'} mb-3 md:mb-4 tracking-tight uppercase`}>{interpolate(content.ui?.ofertaNoticeTitle, content) || 'Уведомление об отказе от публичной оферты'}</h2>
              <p className={`text-xs md:text-sm leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'} italic opacity-70`}>{interpolate(content.ui?.ofertaLegalRef, content) || 'В соответствии со ст. 437 Гражданского кодекса Российской Федерации'}</p>
            </div>
          </div>

          <div className={`space-y-6 text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'} break-words md:break-normal`}>
            {content.pages?.oferta?.content ? (
              <div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: interpolate(content.pages.oferta.content, content) }} />
            ) : (
              <>
                <p>
                  {interpolate(content.pages?.oferta?.fallbackContent, content) || `Настоящий интернет-сайт ${content.domain || 'vektor-vrn.ru'} носит исключительно информационный характер. Информация, представленная на сайте, включая описание услуг, технологические параметры и тарифные решения, не является публичной офертой.`}
                </p>
                <p>
                  {interpolate(content.companyName, content)} оставляет за собой право в любое время без уведомления пользователей вносить изменения в информацию на сайте.
                </p>
                <div className={`${isLight ? 'bg-blue-50 border-blue-200' : 'bg-blue-500/5 border-blue-500/10'} p-6 md:p-8 border rounded-2xl border-l-4 border-l-blue-500`}>
                  <p className={`${isLight ? 'text-slate-800' : 'text-white'} font-bold leading-relaxed uppercase tracking-tight text-[11px] md:text-xs`}>
                    Все цены, условия и параметры оказываемых услуг (печать, логистика, дистрибуция) определяются индивидуально в рамках официального договора, заключаемого с каждым контрагентом в письменной форме.
                  </p>
                </div>
              </>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className={`p-8 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/20 border-slate-800/50'} rounded-3xl border`}>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6 flex items-center gap-2">
              <FileText size={14} /> {interpolate(content.ui?.workProcess, content) || 'Порядок работы'}
            </h4>
            <ul className={`space-y-4 text-xs font-bold uppercase tracking-widest leading-relaxed ${isLight ? 'text-slate-500' : 'opacity-70'}`}>
              <li className="flex gap-4"><span className="text-blue-500">01.</span> {interpolate(content.pages?.oferta?.steps?.[0] || 'Оставление заявки на сайте', content)}</li>
              <li className="flex gap-4"><span className="text-blue-500">02.</span> {interpolate(content.pages?.oferta?.steps?.[1] || 'Проведение консультации', content)}</li>
              <li className="flex gap-4"><span className="text-blue-500">03.</span> {interpolate(content.pages?.oferta?.steps?.[2] || 'Подготовка коммерческого предложения', content)}</li>
              <li className="flex gap-4"><span className="text-blue-500">04.</span> {interpolate(content.pages?.oferta?.steps?.[3] || 'Заключение прямого договора', content)}</li>
              <li className="flex gap-4"><span className="text-blue-500">05.</span> {interpolate(content.pages?.oferta?.steps?.[4] || 'Оказание услуг по SLA', content)}</li>
            </ul>
          </div>

          <div className={`p-8 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/20 border-slate-800/50'} rounded-3xl border flex flex-col justify-center text-center`}>
            <p className={`text-[10px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-500'} tracking-widest mb-6`}>{interpolate(content.ui?.needCalculation, content) || 'Нужен индивидуальный расчет?'}</p>
            <Link to="/#contact" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all block">
              {interpolate(content.ui?.requestTerms, content) || 'Запросить условия'}
            </Link>
          </div>
        </div>

        <footer className={`mt-24 pt-12 border-t ${isLight ? 'border-slate-100' : 'border-slate-900'} text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex justify-between`}>
          <span>© {new Date().getFullYear()} {interpolate(content.companyName, content)}</span>
          <span className="text-right">{interpolate(content.ui?.versionLabel, content) || 'Версия документа'}: {interpolate(content.legal?.version || '2.0', content)}</span>
        </footer>
      </div>
    </div>
  );
}
