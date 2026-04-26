import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy({ content, theme }) {
  const lastUpdated = "24.04.2026";
  const isLight = theme === 'light';
  const privacyData = content.pages?.privacy || {};

  return (
    <div className={`min-h-screen ${isLight ? 'bg-white text-slate-700' : 'bg-[#050508] text-slate-300'} font-sans p-6 md:p-12 transition-colors duration-500`}>
      <meta name="robots" content="noindex, follow" />
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-bold uppercase text-[10px] tracking-widest mb-12 transition-all group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Вернуться на главную
        </Link>

        <header className={`mb-12 md:mb-16 border-b ${isLight ? 'border-slate-100' : 'border-slate-900'} pb-8 md:pb-12 text-center md:text-left`}>
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 border border-blue-500/20 mx-auto md:mx-0">
            <Shield size={32} />
          </div>
          <h1 className={`text-3xl md:text-5xl font-black ${isLight ? 'text-slate-900' : 'text-white'} mb-4 tracking-tight leading-tight uppercase`}>{privacyData.title || 'Политика конфиденциальности'}</h1>
          <p className="text-sm opacity-50 font-medium">Дата обновления: {privacyData.lastUpdated || '24.04.2026'} • {privacyData.version || 'v1.1'}</p>
        </header>

        <nav className={`mb-12 md:mb-16 p-6 md:p-8 ${isLight ? 'bg-slate-50' : 'bg-slate-900/30'} rounded-3xl md:rounded-[2rem] border ${isLight ? 'border-slate-200' : 'border-slate-800/50'} md:sticky md:top-8 z-10 backdrop-blur-xl`}>
          <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] ${isLight ? 'text-slate-400' : 'text-slate-500'} mb-6`}>Содержание документа</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-[10px] md:text-xs font-bold uppercase tracking-widest">
            {privacyData.sections ? (
              privacyData.sections.map((s, idx) => (
                <a key={s.id} href={`#${s.id}`} className="hover:text-blue-500 transition-colors flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  0{idx+1}. <span className={`${isLight ? 'text-slate-600' : 'opacity-60'}`}>{s.title}</span>
                </a>
              ))
            ) : (
              <>
                <a href="#general" className="hover:text-blue-500 transition-colors flex items-center gap-2 text-blue-600 dark:text-blue-400">01. <span className={`${isLight ? 'text-slate-600' : 'opacity-60'}`}>Общие положения</span></a>
                <a href="#data-list" className="hover:text-blue-500 transition-colors flex items-center gap-2 text-blue-600 dark:text-blue-400">02. <span className={`${isLight ? 'text-slate-600' : 'opacity-60'}`}>Персональные данные</span></a>
                <a href="#goals" className="hover:text-blue-500 transition-colors flex items-center gap-2 text-blue-600 dark:text-blue-400">03. <span className={`${isLight ? 'text-slate-600' : 'opacity-60'}`}>Цели обработки</span></a>
                <a href="#rights" className="hover:text-blue-500 transition-colors flex items-center gap-2 text-blue-600 dark:text-blue-400">04. <span className={`${isLight ? 'text-slate-600' : 'opacity-60'}`}>Права субъекта</span></a>
                <a href="#protection" className="hover:text-blue-500 transition-colors flex items-center gap-2 text-blue-600 dark:text-blue-400">05. <span className={`${isLight ? 'text-slate-600' : 'opacity-60'}`}>Меры защиты</span></a>
                <a href="#contacts" className="hover:text-blue-500 transition-colors flex items-center gap-2 text-blue-600 dark:text-blue-400">06. <span className={`${isLight ? 'text-slate-600' : 'opacity-60'}`}>Контакты</span></a>
              </>
            )}
          </div>
        </nav>

        <article className={`space-y-10 md:space-y-16 text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'} break-words md:break-normal px-2 md:px-0`}>
          {privacyData.sections ? (
            privacyData.sections.map((s, idx) => (
              <section key={s.id} id={s.id} className={s.id === 'contacts' ? `${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-blue-500/20'} p-10 rounded-[2.5rem] border shadow-2xl` : ''}>
                <h2 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'} mb-6 uppercase tracking-wider flex items-center gap-3`}>
                  <span className="text-blue-500">0{idx+1}.</span> {s.title}
                </h2>
                <div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: (s.content || "").replace(/ООО «ВЕКТОР»/g, content.companyName).replace(/\{content.address\}/g, content.address).replace(/\{content.email\}/g, content.email).replace(/\{content.inn\}/g, content.inn).replace(/\{content.ogrn\}/g, content.ogrn).replace(/\{content.pdnReg\}/g, content.pdnReg).replace(/\{content.pdnOrder\}/g, content.pdnOrder) }} />
                {s.id === 'contacts' && (
                  <div className="flex flex-col md:flex-row gap-6 mt-8">
                    <div className="flex-1">
                      <p className={`text-[10px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-500'} tracking-widest mb-2`}>Ответственное лицо</p>
                      <p className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold`}>Генеральный директор {content.companyName}</p>
                    </div>
                    <div className="flex-1 text-right">
                      <Link to="/" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Принимаю условия</Link>
                    </div>
                  </div>
                )}
              </section>
            ))
          ) : (
            <>
              <section id="general">
                <h2 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'} mb-6 uppercase tracking-wider flex items-center gap-3`}>
                  <span className="text-blue-500">01.</span> Общие положения
                </h2>
                <p className="mb-4">
                  Настоящая Политика в отношении обработки персональных данных (далее — Политика) разработана {content.companyName} (ОГРН {content.ogrn}, ИНН {content.inn}) в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных».
                </p>
                <p>
                  Оператор персональных данных: {content.companyName}, адрес: {content.address}. Регистрация в реестре Роскомнадзора: №{content.pdnReg}, Приказ {content.pdnOrder}.
                </p>
              </section>

              <section id="data-list">
                <h2 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'} mb-6 uppercase tracking-wider flex items-center gap-3`}>
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
                <h2 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'} mb-6 uppercase tracking-wider flex items-center gap-3`}>
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
                <h2 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'} mb-6 uppercase tracking-wider flex items-center gap-3`}>
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
                <h2 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'} mb-6 uppercase tracking-wider flex items-center gap-3`}>
                  <span className="text-blue-500">05.</span> Меры защиты
                </h2>
                <p>
                  {content.companyName} применяет организационные и технические меры для защиты персональных данных от несанкционированного доступа. Это включает использование защищенного контура печати, шифрование каналов передачи данных и строгое ограничение круга лиц, имеющих доступ к информации в соответствии с ФЗ-152.
                </p>
              </section>

              <section id="contacts" className={`${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/40 border-blue-500/20'} p-10 rounded-[2.5rem] border shadow-2xl`}>
                <h2 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'} mb-6 uppercase tracking-wider flex items-center gap-3`}>
                  <span className="text-blue-500">06.</span> Контакты и обращения
                </h2>
                <p className="mb-8">
                  Для реализации ваших прав или получения информации об обработке ваших ПДн направьте письменный запрос на адрес: {content.address} или на электронную почту: <a href={`mailto:${content.email}`} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">{content.email}</a>.
                </p>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <p className={`text-[10px] font-black uppercase ${isLight ? 'text-slate-400' : 'text-slate-500'} tracking-widest mb-2`}>Ответственное лицо</p>
                    <p className={`${isLight ? 'text-slate-900' : 'text-white'} font-bold`}>Генеральный директор {content.companyName}</p>
                  </div>
                  <div className="flex-1 text-right">
                    <Link to="/" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">Принимаю условия</Link>
                  </div>
                </div>
              </section>
            </>
          )}
        </article>

        <footer className={`mt-24 pt-12 border-t ${isLight ? 'border-slate-100' : 'border-slate-900'} text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 flex justify-between`}>
          <span>© {new Date().getFullYear()} {content.companyName}</span>
          <span className="text-right">Версия документа: {content.pages?.privacy?.version || content.legal.version}</span>
        </footer>
      </div>
    </div>
  );
}
