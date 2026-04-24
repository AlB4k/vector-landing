import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy({ content }) {
  const lastUpdated = "24.04.2026";

  return (
    <div className="min-h-screen bg-[#050508] text-slate-300 font-sans p-6 md:p-12">
      <meta name="robots" content="noindex, follow" />
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-bold uppercase text-[10px] tracking-widest mb-12 transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Вернуться на главную
        </Link>

        <header className="mb-12 md:mb-16 border-b border-slate-900 pb-8 md:pb-12 text-center md:text-left">
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 border border-blue-500/20 mx-auto md:mx-0">
            <Shield size={32} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">Политика конфиденциальности</h1>
          <p className="text-sm opacity-50 font-medium">Дата обновления: {lastUpdated} • v1.1</p>
        </header>

        <nav className="mb-12 md:mb-16 p-6 md:p-8 bg-slate-900/30 rounded-3xl md:rounded-[2rem] border border-slate-800/50 md:sticky md:top-8 z-10 backdrop-blur-xl">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Содержание документа</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-[10px] md:text-xs font-bold uppercase tracking-widest">
            <a href="#general" className="hover:text-blue-500 transition-colors flex items-center gap-2">01. <span className="opacity-60">Общие положения</span></a>
            <a href="#data-list" className="hover:text-blue-500 transition-colors flex items-center gap-2">02. <span className="opacity-60">Персональные данные</span></a>
            <a href="#goals" className="hover:text-blue-500 transition-colors flex items-center gap-2">03. <span className="opacity-60">Цели обработки</span></a>
            <a href="#rights" className="hover:text-blue-500 transition-colors flex items-center gap-2">04. <span className="opacity-60">Права субъекта</span></a>
            <a href="#protection" className="hover:text-blue-500 transition-colors flex items-center gap-2">05. <span className="opacity-60">Меры защиты</span></a>
            <a href="#contacts" className="hover:text-blue-500 transition-colors flex items-center gap-2">06. <span className="opacity-60">Контакты</span></a>
          </div>
        </nav>

        <article className="space-y-10 md:space-y-16 text-sm leading-relaxed text-slate-400 break-words md:break-normal px-2 md:px-0">
          <section id="general">
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wider flex items-center gap-3">
              <span className="text-blue-500">01.</span> Общие положения
            </h2>
            <p className="mb-4">
              Настоящая Политика в отношении обработки персональных данных (далее — Политика) разработана ООО «ВЕКТОР» (ОГРН {content.ogrn}, ИНН {content.inn}) в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных».
            </p>
            <p>
              Оператор персональных данных: ООО «ВЕКТОР», адрес: {content.address}. Регистрация в реестре Роскомнадзора: №{content.pdnReg}, Приказ {content.pdnOrder}.
            </p>
          </section>

          <section id="data-list">
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wider flex items-center gap-3">
              <span className="text-blue-500">02.</span> Состав персональных данных
            </h2>
            <p className="mb-4">Мы обрабатываем следующие категории персональных данных, предоставленных вами через формы обратной связи на сайте:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Фамилия, имя, отчество;</li>
              <li>Номер контактного телефона;</li>
              <li>Адрес электронной почты (email);</li>
              <li>Адрес объекта (для целей логистики);</li>
              <li>Технические данные: IP-адрес, тип устройства, файлы cookie (аналитические и технические).</li>
            </ul>
          </section>

          <section id="goals">
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wider flex items-center gap-3">
              <span className="text-blue-500">03.</span> Цели обработки
            </h2>
            <p>Обработка ПДн осуществляется для достижения следующих целей:</p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Ответ на обращения пользователей и предоставление консультаций;</li>
              <li>Подготовка коммерческих предложений;</li>
              <li>Заключение и исполнение договоров на оказание услуг печати и дистрибуции;</li>
              <li>Соблюдение требований законодательства РФ.</li>
            </ul>
          </section>

          <section id="rights">
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wider flex items-center gap-3">
              <span className="text-blue-500">04.</span> Права субъекта ПДн
            </h2>
            <p>Вы имеете право на:</p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Доступ к своим персональным данным;</li>
              <li>Уточнение (исправление) неточных данных;</li>
              <li>Требование блокирования или уничтожения данных;</li>
              <li>Отзыв согласия на обработку в любое время;</li>
              <li>Обжалование действий Оператора в Роскомнадзоре или суде.</li>
            </ul>
          </section>

          <section id="protection">
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wider flex items-center gap-3">
              <span className="text-blue-500">05.</span> Меры защиты
            </h2>
            <p>
              ООО «ВЕКТОР» применяет организационные и технические меры для защиты персональных данных от несанкционированного доступа. Это включает использование защищенного контура печати, шифрование каналов передачи данных и строгое ограничение круга лиц, имеющих доступ к информации в соответствии с ФЗ-152.
            </p>
          </section>

          <section id="contacts" className="bg-slate-900/40 p-10 rounded-[2.5rem] border border-blue-500/20 shadow-2xl">
            <h2 className="text-xl font-black text-white mb-6 uppercase tracking-wider flex items-center gap-3">
              <span className="text-blue-500">06.</span> Контакты и обращения
            </h2>
            <p className="mb-8">
              Для реализации ваших прав или получения информации об обработке ваших ПДн направьте письменный запрос на адрес: {content.address} или на электронную почту: <a href={`mailto:${content.email}`} className="text-blue-400 font-bold hover:underline">{content.email}</a>.
            </p>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">Ответственное лицо</p>
                <p className="text-white font-bold">Генеральный директор ООО «ВЕКТОР»</p>
              </div>
              <div className="flex-1 text-right">
                <Link to="/" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Принимаю условия</Link>
              </div>
            </div>
          </section>
        </article>

        <footer className="mt-24 pt-12 border-t border-slate-900 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600 flex justify-between">
          <span>© 2026 ООО «ВЕКТОР»</span>
          <span className="text-right">Все права защищены</span>
        </footer>
      </div>
    </div>
  );
}
