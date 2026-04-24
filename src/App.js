import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './Landing';
import CMS from './CMS';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Requisites from './pages/Requisites';
import Oferta from './pages/Oferta';
import NotFound from './pages/NotFound';
import { Lock, LogIn, AlertTriangle, RefreshCcw } from 'lucide-react';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6 text-white font-sans">
          <div className="max-w-md w-full bg-slate-900/50 border border-red-500/20 p-10 rounded-[2.5rem] glass text-center">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 text-red-500 border border-red-500/20">
              <AlertTriangle size={32} />
            </div>
            <h2 className="text-2xl font-black mb-4 tracking-tight">Системный сбой</h2>
            <p className="text-sm opacity-50 mb-10 leading-relaxed font-medium">Произошла непредвиденная ошибка в работе интерфейса. Мы уже уведомлены и работаем над исправлением.</p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 rounded-2xl gradient-bg font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 hover:scale-105 transition-all"
            >
              <RefreshCcw size={18} /> Перезагрузить систему
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const INITIAL_CONTENT = {
  companyName: 'ООО "ВЕКТОР"',
  address: '394000, г. Воронеж, ул. Лебедева, д. 4',
  phone: '+7 (930) 409-27-00',
  email: 'Vektor0949@yandex.ru',
  inn: '3663111111',
  kpp: '366301001',
  ogrn: '1153668000000',
  ceo: 'Генеральный директор',
  okved: '82.99',
  bank: {
    name: '',
    bik: '',
    rs: '',
    ks: ''
  },
  pdnReg: '36-25-043546',
  pdnOrder: '№218 от 13.11.2025',

  theme: {
    dark: {
      primary: '#050508',
      secondary: '#0a0a0f',
      accentFrom: '#1e40af',
      accentTo: '#06b6d4',
      textMain: '#f8fafc',
      textMuted: '#64748b',
      blur: '12px'
    },
    light: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      accentFrom: '#2563eb',
      accentTo: '#0891b2',
      textMain: '#020617',
      textMuted: '#334155',
      blur: '20px'
    }
  },

  sections: [
    { id: 'hero', enabled: true, label: 'Hero Секция' },
    { id: 'features', enabled: true, label: 'Преимущества' },
    { id: 'stats', enabled: true, label: 'Статистика' },
    { id: 'process', enabled: true, label: 'Процесс работы' },
    { id: 'services', enabled: true, label: 'Услуги' },
    { id: 'faq', enabled: true, label: 'FAQ' },
    { id: 'serviceArea', enabled: true, label: 'География' },
    { id: 'contact', enabled: true, label: 'Контакты' }
  ],

  hero: {
    badge: 'Сертифицированный оператор персональных данных',
    title1: 'Индустриальные стандарты',
    titleGradient: 'логистики квитанций ЖКХ',
    subtitle: 'Высокопроизводительная печать по технологии Pressure Seal и гарантированная адресная дистрибуция. Обеспечиваем собираемость платежей для крупнейших УК и расчетных центров Воронежской области с 2011 года.',
    btnPrimary: 'Запросить КП',
    btnSecondary: 'Тарифы и услуги',
    hotlineLabel: 'Телефон горячей линии',
    hotlinePhone: '+7 (930) 409-27-00'
  },

  features: {
    title: 'Стандарты',
    accent: 'надежности',
    subtitle: 'Мы минимизируем риски управляющих компаний, обеспечивая правовую чистоту и физическую сохранность документов.',
    items: [
      { icon: 'ShieldCheck', title: "Технология Pressure Seal", desc: "Промышленная печать и автоматическая склейка под давлением. Создание защищенного бесконвертного отправления, исключающего доступ к ПДн без повреждения целостности." },
      { icon: 'Users', title: "Статус Оператора ПДн", desc: "Официальное включение в реестр Роскомнадзора. Организационные и технические меры защиты информации в соответствии с ФЗ-152 и требованиями ФСТЭК." },
      { icon: 'Check', title: "Верификация баз", desc: "Предварительная очистка и нормализация адресных реестров заказчика. Сверка с актуальной базой ФИАС для минимизации возвратов." },
      { icon: 'MapPin', title: "Гео-мониторинг", desc: "Контроль курьерской сети через GPS-трекинг и обязательную фотофиксацию по регламенту 1/10 (каждый десятый ящик) или 100% по запросу." },
      { icon: 'Zap', title: "Сжатые сроки (SLA)", desc: "Выход на маршруты в течение 12 часов после формирования тиража. Полное закрытие отчетного периода за 3-5 рабочих дней по всему городу." },
      { icon: 'Truck', title: "Профессиональный штат", desc: "Постоянный состав курьеров с допуском к работе в закрытых жилых комплексах и знанием специфики частного сектора." },
    ]
  },

  stats: [
    { val: 1500000, suffix: '+', label: 'Отправлений ежемесячно' },
    { val: 99.9, suffix: '%', label: 'Индекс доставляемости' },
    { val: 36, suffix: '', label: 'Муниципальных районов' },
    { val: 12, suffix: '+', label: 'Лет экспертизы' },
  ],

  process: {
    title: 'Технологический',
    accent: 'процесс',
    subtitle: 'Автоматизированная цепочка от обработки данных до контроля вложений.',
    stepLabel: 'Шаг',
    steps: [
      { step: "01", title: "Подготовка данных", desc: "Прием реестров в защищенном контуре. Формирование макетов бесконвертных отправлений с учетом требований ГИС ЖКХ." },
      { step: "02", title: "Производственный цикл", desc: "Высокоскоростная печать, фальцовка и нанесение клеевого слоя. Создание защищенного self-mailer отправления." },
      { step: "03", title: "Контроль и доставка", desc: "Логистическая маршрутизация и адресная доставка. Предоставление фото-отчетов и актов сверки по результатам." },
    ]
  },

  services: {
    title: 'Сервисные',
    accent: 'решения',
    subtitle: 'Оптимизируйте затраты на печать и логистику платежных документов.',
    btnLabel: 'Запросить расчет',
    list: [
      {
        title: 'Адресная дистрибуция',
        badge: 'Для готовых тиражей',
        features: ["Доставка по Воронежу и области", "Собственная курьерская сеть", "Контроль прохождения по участкам", "Электронная отчетность"],
        button: 'Запросить спецификацию',
        popular: false
      },
      {
        title: 'Печать + Доставка',
        badge: 'Комплексное решение',
        accentBadge: 'Полный логистический цикл',
        features: ["Все услуги базовой дистрибуции", "Печать self-mailer отправлений", "Автоматическая упаковка и склейка", "Полное соответствие 152-ФЗ", "Приоритетное обслуживание"],
        button: 'Получить расчет стоимости',
        popular: true
      }
    ]
  },

  faq: {
    title: 'Популярные',
    accent: 'вопросы',
    items: [
      { q: "Как обеспечивается защита персональных данных?", a: "Мы работаем как лицензированный оператор ПДн. Печать происходит в закрытом контуре, данные передаются по зашифрованным каналам, а формат бесконвертного отправления исключает доступ посторонних к информации внутри квитанции." },
      { q: "В чем преимущество бесконвертной печати (self-mailer)?", a: "Это наиболее защищенный и экономически эффективный способ доставки. Квитанция сама является конвертом, края которой надежно склеены. Это экономит время на упаковку и снижает стоимость материалов." },
      { q: "Как мы можем контролировать факт доставки?", a: "Мы предоставляем детальные реестры по итогам доставки. По согласованию возможна выборочная фотофиксация почтовых ящиков на конкретных адресах для подтверждения качества работы курьера." },
      { q: "Работаете ли вы с областью или только по городу?", a: "Наш основной охват — г. Воронеж, но мы также осуществляем доставку во все ключевые муниципальные районы Воронежской области. Сроки и стоимость зависят от удаленности населенных пунктов." },
    ]
  },

  serviceArea: {
    title: 'Широкая география',
    accent: 'присутствия',
    subtitle: 'Обеспечиваем надежную логистику и дистрибуцию во всех районах Воронежа и ключевых населенных пунктах области.',
    locations: [
      { name: 'Воронеж (Все районы)', type: 'Полное покрытие' },
      { name: 'Новая Усмань', type: 'Ежедневная доставка' },
      { name: 'Семилуки', type: 'Ежедневная доставка' },
      { name: 'Рамонь', type: 'По графику (3р/нед)' },
      { name: 'Лиски', type: 'По графику (2р/нед)' },
      { name: 'Борисоглебск', type: 'Магистральная логистика' }
    ]
  },

  contact: {
    title: 'Связаться',
    accent: 'с нами',
    subtitle: 'Оставьте заявку, и наш эксперт подготовит индивидуальное коммерческое предложение в течение часа.',
    formName: 'Ваше имя',
    formEmail: 'Электронная почта',
    formPhone: 'Телефон',
    formMessage: 'Сообщение или вопрос',
    formButton: 'Отправить запрос',
    infoTitle: 'Контактная информация',
    infoDesc: 'Мы всегда на связи для обсуждения ваших задач по логистике и печати.'
  },

  modals: {
    success: {
      title: 'Заявка отправлена!',
      subtitle: 'Мы свяжемся с вами в течение часа.',
      button: 'Закрыть'
    }
  },

  footer: {
    description: 'Специализированный оператор по производству и адресной дистрибуции документов.',
    offerLabel: 'Оферта',
    offerLink: '#'
  },
  socials: {
    telegram: 'https://t.me/vektor_logistics',
    whatsapp: '',
    vk: ''
  },
  analytics: {
    yandexMetrica: '',
    googleAnalytics: '',
    pixelId: ''
  },
  integrations: {
    formspreeId: ''
  },
  companyTagline: 'LOGISTIC TECH',
  cookieBanner: {
    title: 'Контроль Cookie',
    description: 'Мы используем cookie-файлы для корректной работы сайта. Технические cookie необходимы. Аналитические требуют вашего согласия.',
    btnAll: 'Принять все',
    btnEssential: 'Только необходимые'
  },
  loaderDelay: 2000,
  logoScaleHeader: 1.4,
  logoScaleFooter: 1.2,
  legal: {
    version: '2.4.0-PROD',
    statusLabel: 'Статус',
    statusValue: 'Оператор ПДн (Роскомнадзор)',
    privacy: `Настоящая Политика конфиденциальности персональных данных (далее – Политика конфиденциальности) действует в отношении всей информации, которую ООО "ВЕКТОР", расположенное на домене vektor-vrn.ru, может получить о Пользователе во время использования сайта...`,
    agreement: `Согласие на обработку персональных данных... В соответствии с Федеральным законом № 152-ФЗ «О персональных данных» от 27.07.2006 года настоящим подтверждаю свое согласие на обработку моих персональных данных...`
  }
};

function LoginScreen({ onLogin }) {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass === 'admin') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080f] flex items-center justify-center p-6">
      <div className={`w-full max-w-md bg-slate-900/50 p-10 rounded-[2.5rem] border ${error ? 'border-red-500 animate-shake' : 'border-slate-800'} glass shadow-2xl transition-all`}>
        <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg" style={{ background: 'linear-gradient(135deg, #3b82f6, #60a5fa)' }}>
          <Lock size={28} className="text-white" />
        </div>
        <h2 className="text-3xl font-black text-white text-center mb-2">CMS Доступ</h2>
        <p className="text-slate-400 text-center mb-8 font-medium">Введите пароль администратора</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="password"
              placeholder="••••••••"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl px-6 py-4 text-white text-center text-lg tracking-widest focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <button type="submit" className="w-full text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3" style={{ background: 'linear-gradient(135deg, #3b82f6, #60a5fa)' }}>
            <LogIn size={20} /> Войти в панель
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          OOO "ВЕКТОР" • Security Panel
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'login', 'cms'
  const [isAuth, setIsAuth] = useState(false);
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [theme, setTheme] = useState('dark');
  const [consentVersion, setConsentVersion] = useState(0);

  useEffect(() => {
    const handleConsentUpdate = () => setConsentVersion(v => v + 1);
    window.addEventListener('cookieConsentUpdated', handleConsentUpdate);
    return () => window.removeEventListener('cookieConsentUpdated', handleConsentUpdate);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('vector_content');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge with initial to ensure new schema fields exist
        setContent({ ...INITIAL_CONTENT, ...parsed });
      } catch (e) {
        console.error("Failed to parse saved content", e);
      }
    }
  }, []);

  const handleUpdateContent = (newContent) => {
    setContent(newContent);
    localStorage.setItem('vector_content', JSON.stringify(newContent));
  };

  useEffect(() => {
    // Hide splash screen after configured delay
    const timer = setTimeout(() => {
      document.body.classList.add('loaded');
    }, content.loaderDelay || 2000);

    return () => clearTimeout(timer);
  }, [content.loaderDelay]);

  useEffect(() => {
    // Inject Analytics only if IDs exist AND cookie consent is given
    const consentRaw = localStorage.getItem('cookieConsent');
    const hasConsent = consentRaw ? JSON.parse(consentRaw).accepted : false;

    if (!hasConsent) return;

    if (content.analytics.yandexMetrica) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.id = 'ym-script';
      script.innerHTML = `
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(${content.analytics.yandexMetrica}, "init", {
             clickmap:true,
             trackLinks:true,
             accurateTrackBounce:true,
             webvisor:true
        });
      `;
      document.head.appendChild(script);
    }

    if (content.analytics.googleAnalytics) {
      const gScript = document.createElement('script');
      gScript.async = true;
      gScript.id = 'ga-script';
      gScript.src = `https://www.googletagmanager.com/gtag/js?id=${content.analytics.googleAnalytics}`;
      document.head.appendChild(gScript);

      const gConfigScript = document.createElement('script');
      gConfigScript.id = 'ga-config';
      gConfigScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${content.analytics.googleAnalytics}');
      `;
      document.head.appendChild(gConfigScript);
    }
  }, [content.analytics, view, consentVersion]); // Re-run when analytics config, view, or consent status changes

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.shiftKey && e.key === 'C') {
        setView(isAuth ? 'cms' : 'login');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuth]);

  if (view === 'login') return <LoginScreen onLogin={() => { setIsAuth(true); setView('cms'); }} />;

  return (
    <ErrorBoundary>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={
            view === 'cms' ? (
              <CMS content={content} setContent={handleUpdateContent} onLogout={() => { setIsAuth(false); setView('landing'); }} />
            ) : (
              <Landing content={content} theme={theme} setTheme={setTheme} />
            )
          } />
          <Route path="/privacy" element={<PrivacyPolicy content={content} theme={theme} />} />
          <Route path="/requisites" element={<Requisites content={content} theme={theme} />} />
          <Route path="/oferta" element={<Oferta content={content} theme={theme} />} />
          <Route path="*" element={<NotFound content={content} />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
