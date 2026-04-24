import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, AlertCircle, FileText } from 'lucide-react';

export default function Oferta({ content }) {
  return (
    <div className="min-h-screen bg-[#050508] text-slate-300 font-sans p-6 md:p-12">
      <meta name="robots" content="noindex, follow" />
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-bold uppercase text-[10px] tracking-widest mb-12 transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Вернуться на главную
        </Link>

        <header className="mb-12 md:mb-16 border-b border-slate-900 pb-8 md:pb-12 text-center md:text-left">
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 border border-blue-500/20 mx-auto md:mx-0">
            <Scale size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase leading-tight">Оферта и условия</h1>
          <p className="text-sm opacity-50 font-medium">Юридические условия взаимодействия с ООО «ВЕКТОР»</p>
        </header>

        <section className="bg-slate-900/30 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-blue-500/20 shadow-2xl mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 mb-8 text-center sm:text-left">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 border border-blue-500/20 shrink-0">
              <AlertCircle size={24} />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black text-white mb-3 md:mb-4 tracking-tight uppercase">Уведомление об отказе от публичной оферты</h2>
              <p className="text-xs md:text-sm leading-relaxed text-slate-400 italic opacity-70">В соответствии со ст. 437 Гражданского кодекса Российской Федерации</p>
            </div>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-slate-400 break-words md:break-normal">
            <p>
              Настоящий интернет-сайт <span className="text-white font-bold underline underline-offset-4 decoration-blue-500/50">vektor-vrn.ru</span> носит исключительно информационный характер. Информация, представленная на сайте, включая описание услуг, технологические параметры и тарифные решения, не является публичной офертой.
            </p>
            <p>
              ООО «ВЕКТОР» оставляет за собой право в любое время без уведомления пользователей вносить изменения в информацию на сайте.
            </p>
            <div className="p-6 md:p-8 bg-blue-500/5 border border-blue-500/10 rounded-2xl border-l-4 border-l-blue-500">
              <p className="text-white font-bold leading-relaxed uppercase tracking-tight text-[11px] md:text-xs">
                Все цены, условия и параметры оказываемых услуг (печать, логистика, дистрибуция) определяются индивидуально в рамках официального договора, заключаемого с каждым контрагентом в письменной форме.
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="p-8 bg-slate-900/20 rounded-3xl border border-slate-800/50">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6 flex items-center gap-2">
              <FileText size={14} /> Порядок работы
            </h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest leading-relaxed opacity-70">
              <li className="flex gap-4"><span className="text-blue-500">01.</span> Оставление заявки на сайте</li>
              <li className="flex gap-4"><span className="text-blue-500">02.</span> Проведение консультации</li>
              <li className="flex gap-4"><span className="text-blue-500">03.</span> Подготовка коммерческого предложения</li>
              <li className="flex gap-4"><span className="text-blue-500">04.</span> Заключение прямого договора</li>
              <li className="flex gap-4"><span className="text-blue-500">05.</span> Оказание услуг по SLA</li>
            </ul>
          </div>

          <div className="p-8 bg-slate-900/20 rounded-3xl border border-slate-800/50 flex flex-col justify-center text-center">
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-6">Нужен индивидуальный расчет?</p>
            <Link to="/#contact" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all block">
              Запросить условия
            </Link>
          </div>
        </div>

        <footer className="mt-24 pt-12 border-t border-slate-900 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 flex justify-between">
          <span>© 2026 ООО «ВЕКТОР»</span>
          <span className="text-right">Версия документа: 2.0_NODISCLAIMER</span>
        </footer>
      </div>
    </div>
  );
}
