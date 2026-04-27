import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './Landing';
import Requisites from './pages/Requisites';
import Oferta from './pages/Oferta';
import NotFound from './pages/NotFound';
import { Lock, LogIn, AlertTriangle, RefreshCcw, Loader2 } from 'lucide-react';
import { validateContent } from './utils/security';
import { Logo } from './components/Shared';

const CMS = React.lazy(() => import('./CMS'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));

// Loading component for lazy loading
const PageLoader = () => (
  <div className="min-h-screen bg-[#050508] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      <p className="text-blue-500 font-bold uppercase tracking-widest text-[10px]">Загрузка модуля...</p>
    </div>
  </div>
);

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
  "companyName": "ООО \"ВЕКТОР\"",
  "companyTagline": "Доставка + технологии",
  "logoText": "ВЕКТОР",
  "ui": {
    "showScrollProgress": true,
    "showBackToTop": true,
    "showFooterCopyright": true,
    "backToHome": "Вернуться на главную",
    "lastUpdatedLabel": "Дата обновления",
    "documentContents": "Содержание документа",
    "acceptTerms": "Принимаю условия",
    "printRequisites": "Распечатать карту партнера",
    "versionLabel": "Версия документа",
    "mainData": "Основные данные",
    "fullName": "Полное наименование",
    "shortName": "Сокращенное наименование",
    "innLabel": "ИНН",
    "kppLabel": "КПП",
    "ogrnLabel": "ОГРН",
    "okvedLabel": "ОКВЭД (основной)",
    "bankRequisites": "Банковские реквизиты",
    "bankName": "Наименование банка",
    "bikLabel": "БИК",
    "ksLabel": "Корр. счет",
    "rsLabel": "Расчетный счет",
    "licenses": "Лицензии и статусы",
    "basis": "Основание",
    "contacts": "Контактная информация",
    "legalAddress": "Юридический адрес",
    "phoneLabel": "Телефон",
    "emailLabel": "Email",
    "ofertaSubtitle": "Юридические условия взаимодействия с",
    "ofertaNoticeTitle": "Уведомление об отказе от публичной оферты",
    "ofertaLegalRef": "В соответствии со ст. 437 Гражданского кодекса Российской Федерации",
    "workProcess": "Порядок работы",
    "needCalculation": "Нужен индивидуальный расчет?",
    "requestTerms": "Запросить условия",
    "routingError": "Сбой маршрутизации",
    "pageNotFound": "Запрошенная страница не существует или была перемещена в архив. Пожалуйста, вернитесь на главную панель управления.",
    "backToStart": "Вернуться в начало",
    "moreInPrivacy": "Подробнее в Политике конфиденциальности",
    "inDevelopment": "В РАЗРАБОТКЕ",
    "comingSoon": "Скоро будет",
    "pressureSealTech": "Технология Pressure Seal",
    "legalNotice": "Юридическая справка",
    "bpoEfficiency": "Эффективность БПО",
    "regionLabel": "Регион",
    "coverageLabel": "Покрытие",
    "geographyLabel": "География работ",
    "ownNetworkTitle": "Собственная курьерская сеть",
    "themeToggleDark": "Переключить на темную тему",
    "themeToggleLight": "Переключить на светлую тему",
    "openMenu": "Открыть мобильное меню",
    "closeMenu": "Закрыть мобильное меню",
    "legalBlock": "Юридический блок",
    "socialsTitle": "Наши соцсети",
    "privacyLabel": "Политика конфиденциальности",
    "requisitesLabel": "Реквизиты организации",
    "ofertaLabel": "Оферта и условия",
    "placeholderName": "Иван Иванов",
    "placeholderPhone": "+7 (999) 000-00-00",
    "placeholderEmail": "example@mail.ru",
    "placeholderMessage": "Расскажите о вашей задаче...",
    "consentAgreement": "С Политикой конфиденциальности ознакомлен(а)",
    "regLabel": "Рег.",
    "orderLabel": "Приказ",
    "showSocials": false,
    "socialsTitle": "Наши соцсети"
  },
  "cookieBanner": {
    "title": "Управление Cookie",
    "description": "Мы используем cookie для корректной работы сайта. Технические cookie необходимы. Аналитические требуют вашего согласия в соответствии с ФЗ-152.",
    "btnAll": "Принять все",
    "btnEssential": "Только необходимые"
  },
  "loaderDelay": 2000,
  "logoScaleHeader": 2.2,
  "logoScaleFooter": 2,
  "ceoLabel": "Генеральный директор",
  "address": "394014, г. Воронеж, ул. Лебедева, д. 4, пом. IV",
  "phone": "+7 (930) 409-27-00",
  "email": "Vektor0949@yandex.ru",
  "inn": "3666272154",
  "kpp": "366301001",
  "ogrn": "1243600014162",
  "ceo": "Полякова Л.В.",
  "okved": "53.20.3",
  "bank": {
    "name": "по запросу",
    "bik": "",
    "rs": "",
    "ks": ""
  },
  "pdnReg": "36-25-043546",
  "pdnOrder": "№218 от 13.11.2025",
  "theme": {
    "dark": {
      "primary": "#050508",
      "secondary": "#0a0a0f",
      "accentFrom": "#1e40af",
      "accentTo": "#06b6d4",
      "textMain": "#f8fafc",
      "textMuted": "#64748b",
      "blur": "12px"
    },
    "light": {
      "primary": "#f8fafc",
      "secondary": "#f1f5f9",
      "accentFrom": "#2563eb",
      "accentTo": "#0891b2",
      "textMain": "#0f172a",
      "textMuted": "#475569",
      "blur": "20px"
    }
  },
  "sections": [
    {
      "id": "hero",
      "enabled": true,
      "label": "Hero Секция"
    },
    {
      "id": "stats",
      "enabled": true,
      "label": "Статистика"
    },
    {
      "id": "features",
      "enabled": true,
      "label": "Преимущества"
    },
    {
      "id": "process",
      "enabled": true,
      "label": "Процесс работы"
    },
    {
      "id": "bpo",
      "enabled": true,
      "label": "Что такое БПО"
    },
    {
      "id": "services",
      "enabled": true,
      "label": "Услуги"
    },
    {
      "id": "serviceArea",
      "enabled": true,
      "label": "География"
    },
    {
      "id": "faq",
      "enabled": true,
      "label": "FAQ"
    },
    {
      "id": "news",
      "enabled": true,
      "label": "Новости"
    },
    {
      "id": "contact",
      "enabled": true,
      "label": "Контакты"
    }
  ],
  "hero": {
    "badge": "Являемся оператором ПДн, Обеспечиваем исполнение 152-ФЗ.",
    "badgeIcon": "ShieldCheck",
    "title1": "Надёжные решения.",
    "titleGradient": "В срок. Без проблем.",
    "subtitle": "Печатаем, формируем бесконвертные отправления и доставляем платёжные документы для управляющих и ресурсоснабжающих организаций,  расчётных центров, региональных операторов и фондов Воронежской области и других территорий. Работаем с 2024 года. Полное соответствие 152-ФЗ на всех этапах процесса.",
    "btnPrimary": "Связаться с нами",
    "btnSecondary": "Что мы предлагаем",
    "hotlineLabel": "Прямая линия",
    "hotlinePhone": "+7 (930) 409-27-00",
    "hotlineIcon": "Phone"
  },
  "stats": [
    {
      "val": "1,5",
      "suffix": "М+",
      "label": "Доставок ежемесячно",
      "prefix": ""
    },
    {
      "val": "99.5",
      "suffix": "%",
      "label": "Индекс доставляемости"
    },
    {
      "val": "24",
      "suffix": "",
      "label": "Довольных клиента",
      "prefix": "более"
    },
    {
      "val": "0",
      "suffix": "",
      "label": "Штрафов"
    }
  ],
  "bpo": {
    "title": "Как работает бесконвертное отправление — и ",
    "accent": "почему это выгоднее конверта",
    "subtitle": "Открытая квитанция в почтовом ящике — административный штраф до 500 000 ₽ по ст. 13.11 КоАП. Бесконвертное отправление по технологии Self Mail  решает эту проблему: квитанция сама является конвертом и вскрывается только адресатом.",
    "legalNote": "ФЗ-152 обязывает обеспечить защиту персональных данных от любого случайного доступа третьих лиц, что фактически запрещает доставку квитанций в открытом виде.",
    "steps": [
      {
        "num": "01",
        "title": "Печать переменных данных",
        "desc": "Высокоскоростная цифровая печать реестра начислений. Каждый лист персонализирован."
      },
      {
        "num": "02",
        "title": "Фальцовка и склейка ",
        "desc": "Автоматический Self Mail: лист складывается, перфорируемая и запечатывается по периметру под давлением."
      },
      {
        "num": "03",
        "title": "Готовый конверт-квитанция",
        "desc": "Документ сам является конвертом. Данные недоступны без физического вскрытия — 100% соответствие ФЗ-152."
      }
    ],
    "advantages": [
      "Экономия 22–35% на материалах vs конверт + вложение",
      "Скорость производства: до 800 000 отправлений в сутки",
      "Тариф Почты России на БПО ниже, чем на конверт",
      "Один документ — лист + конверт — без лишних операций"
    ]
  },
  "features": {
    "title": "Почему выбирают",
    "accent": "ВЕКТОР",
    "subtitle": "Шесть причин, по которым УК/РСО/РЦ/регоператоры доверяют нам логистику платёжных документов.",
    "items": [
      {
        "icon": "ShieldCheck",
        "title": "Защита персональных данных",
        "desc": "Технология Self Mail: промышленная печать и автоматическая склейка под давлением. Доступ к ПДн внутри квитанции невозможен без повреждения целостности отправления. "
      },
      {
        "icon": "FileText",
        "title": "Статус оператора ПДн",
        "desc": "Включены в реестр Роскомнадзора (Регистрационный номер оператора ПДн: 36-25-043546 приказ №218 от 13.11.2025). Организационные и технические меры защиты — по требованиям ФСТЭК. Данные передаются только по зашифрованным каналам и удаляются после подписания акта."
      },
      {
        "icon": "Check",
        "title": "Верификация баз — минимум лишних возвратов",
        "desc": "Нормализуем адресный реестр по базе ФИАС, выявляем дубли и недостоверные адреса. В среднем на 15% сокращение возвратов по результатам верификации по базе ФИАС среди клиентов 2024–2025 гг."
      },
      {
        "icon": "MapPin",
        "title": "Контроль ",
        "desc": "Мониторинг  курьерской сети в реальном времени. Фотофиксация — по запросу, ведение реестра \"сложных абонентов\". Возникла проблема — немедленное уведомление диспетчера и реагирование."
      },
      {
        "icon": "Zap",
        "title": "Город за 3 рабочих дня",
        "desc": "Выход на маршруты в течение 12 часов после получения тиража. Полное закрытие отчётного периода за 3–5 рабочих дней по всему объёму. "
      },
      {
        "icon": "Truck",
        "title": "Собственная курьерская сеть",
        "desc": "Постоянный штат курьеров с допуском в закрытые ЖК и знанием специфики частного сектора. Прямой контроль без посредников и субподрядчиков на ключевых маршрутах."
      }
    ]
  },
  "process": {
    "title": "От реестра до ",
    "accent": "подписанного акта",
    "subtitle": "Один договор — от загрузки реестра до почтового ящика. Без промежуточных звеньев.",
    "stepLabel": "Шаг",
    "steps": [
      {
        "step": "01",
        "title": "Приём и верификация реестра",
        "desc": "Приём реестров в защищённом контуре по зашифрованному каналу. Верификация адресов по ФИАС. Формирование макетов бесконвертных отправлений с учётом требований ГИС ЖКХ и ПП РФ № 354."
      },
      {
        "step": "02",
        "title": "Печать и конвертование",
        "desc": "Высокоскоростная цифровая печать переменных данных, фальцовка и нанесение клеевого слоя по технологии Pressure Seal. Выходной контроль: проверка целостности каждого отправления."
      },
      {
        "step": "03",
        "title": "Доставка и контроль",
        "desc": "Маршрутизация по участкам, магистральная и адресная доставка. Фотофиксация по запросу. Контроль доставки  и направление акт заказчику по завершении."
      }
    ]
  },
  "services": {
    "title": "Наше",
    "accent": "предложение",
    "subtitle": "Выберите то, что подходит вашей организации.",
    "btnLabel": "Запросить расчёт",
    "list": [
      {
        "title": "Адресная  доставка",
        "badge": "Для готовых тиражей",
        "tagline": "Готовый тираж — не ваша забота",
        "desc": "Принимаем запечатанные БПО-отправления и развозим по всем участкам Воронежа и области. Вы получаете электронный реестр с подтверждением доставки по каждому адресу.",
        "features": [
          "Доставка по Воронежу и всем районам области",
          "Собственная курьерская сеть",
          "Фотофиксация по запросу, контроль \"сложных\" абонентов",
          "Выход на маршруты в течение 12 часов"
        ],
        "button": "Запросить спецификацию",
        "popular": false,
        "status": "default"
      },
      {
        "title": "Печать + Доставка",
        "badge": "Полный цикл под ключ",
        "accentBadge": "Рекомендуем",
        "tagline": "От файла с данными — до квитанции в ящике",
        "desc": "Принимаем реестр начислений, печатаем, запечатываем по Pressure Seal, сортируем и доставляем. Один договор. Один акт. Один счёт.",
        "features": [
          "Все услуги адресной доставки",
          "Высокоскоростная цифровая печать ",
          "Фальцовка, перфорация и склейка  (БПО)",
          "Верификация адресного реестра по ФИАС",
          "Полное соответствие ФЗ-152, ПП РФ № 354, ГИС ЖКХ",
          "Приоритетный запуск в производство"
        ],
        "button": "Получить расчёт стоимости",
        "popular": true
      },
      {
        "title": "Оцифровка документации",
        "badge": "Клиенты интересуются",
        "features": [
          "Получение, сортировка и подготовка к обработке  документации",
          "Сканирование и индексация документации ",
          "Формирование электронной базы документов",
          "Соблюдение 152-ФЗ и коммерческой тайны"
        ],
        "button": "Получить консультацию",
        "popular": false,
        "status": "development"
      },
      {
        "title": "Электронное информирование",
        "badge": "Клиенты интересуются",
        "features": [
          "Получение, обработка и нормализация базы клиентов",
          "Формирование плана информирования ",
          "Создание шаблона сообщения и персонализация информации",
          "SMS/Email  рассылка персонализированной информации",
          "Соблюдение 152-ФЗ",
          "Использование специализированных сервисов (гарантия антиспам)"
        ],
        "button": "Получить консультацию",
        "popular": false,
        "status": "development"
      }
    ]
  },
  "faq": {
    "title": "Популярные",
    "accent": "вопросы",
    "items": [
      {
        "q": "Несёт ли УК ответственность, если квитанция доставлена в открытом виде?",
        "a": "Да. Ответственность несёт оператор персональных данных — то есть сама управляющая компания или расчётный центр. Санкция — административный штраф по ч. 1 ст. 13.11 КоАП РФ: до 75 000 ₽ для должностного лица и до 500 000 ₽ для юридического. Именно поэтому важно работать с подрядчиком, у которого прописана ответственность за соблюдение ФЗ-152 в договоре — как у нас."
      },
      {
        "q": "Как обеспечивается защита персональных данных при передаче реестра?",
        "a": "Реестр начислений передаётся только по зашифрованному каналу. Печать происходит в закрытом производственном контуре. Формат бесконвертного отправления (Pressure Seal) физически исключает доступ посторонних к данным внутри квитанции. По завершении тиража реестр удаляется — с составлением акта об уничтожении данных. Мы включены в реестр операторов ПДн Роскомнадзора (рег. № 36-25-043546)."
      },
      {
        "q": "В чём преимущество бесконвертного отправления (БПО / self-mailer) перед обычным конвертом?",
        "a": "Три главных преимущества: 1) Соответствие ФЗ-152 — данные защищены без дополнительных операций; 2) Экономия 22–35% на материалах при тираже от 10 000 экз. (нет расхода на конверт); 3) Скорость — отсутствует операция вкладывания, что сокращает производственный цикл. Тариф Почты России и большинства курьерских служб на БПО также ниже, чем на конверт с вложением."
      },
      {
        "q": "Как контролировать факт доставки?",
        "a": "По завершении каждого маршрута вы получаете электронный реестр с отметками по адресам. В базовом тарифе — фотофиксация по запросу. Все материалы прилагаются к акту сдачи-приёмки."
      },
      {
        "q": "Что происходит с нашими данными после выполнения тиража?",
        "a": "Реестры начислений удаляются в течение 5 рабочих дней после подписания акта. По запросу составляем акт об уничтожении персональных данных — документ для вашего внутреннего регламента по ФЗ-152. Промежуточное хранение — только в защищённом контуре, доступ имеют только сотрудники, допущенные к работе с ПДн."
      },
      {
        "q": "Работаете ли вы с домами закрытого типа и ЖК с СКУД?",
        "a": "Да. У нас собственный реестр допуска для закрытых жилых комплексов и предварительное согласование с управляющими организациями. Такие адреса выделяются в отдельные маршруты с контрольным временем доставки и обязательной фотофиксацией факта прохода."
      },
      {
        "q": "Работаете ли вы с областью или только по городу?",
        "a": "Основной охват — г. Воронеж (все районы). Ежедневная доставка: Новая Усмань, Семилуки. По графику: Рамонь (3 раза в неделю), Лиски (2 раза в неделю). Магистральная логистика: Борисоглебск и другие отдалённые районы. Сроки и стоимость по области рассчитываются индивидуально."
      }
    ]
  },
  "serviceArea": {
    "title": "Широкая география",
    "accent": "присутствия",
    "subtitle": "Собственная курьерская сеть без посредников. Прямой контроль маршрутов во всех районах присутствия.",
    "ownNetworkNote": "Прямой контроль сотрудников без субподряда — 100% покрытие в зонах присутствия",
    "locations": [
      {
        "name": "Воронеж (все районы)",
        "type": "Полное покрытие",
        "freq": "Ежедневно"
      },
      {
        "name": "Новая Усмань",
        "type": "Ежедневная доставка",
        "freq": "Ежедневно"
      },
      {
        "name": "Семилуки",
        "type": "Ежедневная доставка",
        "freq": "Ежедневно"
      },
      {
        "name": "Рамонь",
        "type": "По графику",
        "freq": "3 раза/нед"
      },
      {
        "name": "Лиски",
        "type": "По графику",
        "freq": "2 раза/нед"
      },
      {
        "name": "Борисоглебск",
        "type": "Магистральная логистика",
        "freq": "По заявке"
      }
    ],
    "randomMapVariant": false,
    "mapVariant": "radar"
  },
  "contact": {
    "title": "Связаться",
    "accent": "с нами",
    "subtitle": "Оставьте заявку — эксперт подготовит индивидуальное коммерческое предложение",
    "formName": "Ваше имя",
    "formEmail": "Электронная почта",
    "formPhone": "Телефон ",
    "formMessage": "Тираж (кол-во квитанций), район доставки, дата начала",
    "formButton": "Отправить запрос",
    "formConsent": "Я даю согласие на обработку персональных данных в соответствии с Политикой конфиденциальности {content.companyName} (ФЗ-152)",
    "infoTitle": "Контактная информация",
    "infoDesc": "Принимаем заявки в рабочие дни с 8:00 до 18:00. Ответ — в течение 1 часа."
  },
  "modals": {
    "success": {
      "title": "Заявка отправлена!",
      "subtitle": "Мы свяжемся с вами в ближайшее время.",
      "button": "Закрыть"
    }
  },
  "footer": {
    "description": "Специализированный оператор по производству и адресной доставке  платёжных документов. Оператор ПДн, рег. № 36-25-043546.",
    "offerLabel": "Оферта и условия",
    "offerLink": "/offer",
    "headers": {
      "nav": "Навигация",
      "legal": "Правовая информация",
      "contacts": "Контакты"
    }
  },
  "socialsList": [
    { "icon": "Send", "url": "https://t.me/vektor_logistics", "label": "Telegram" },
    { "icon": "MessageCircle", "url": "", "label": "WhatsApp" }
  ],
  "analytics": {
    "yandexMetrica": "",
    "googleAnalytics": "",
    "pixelId": ""
  },
  "integrations": {
    "formspreeId": "",
    "formSubject": "Новая заявка от"
  },
  "socials": [
    { "icon": "Send", "url": "https://t.me/vektor_logistics", "label": "Telegram" },
    { "icon": "MessageCircle", "url": "", "label": "WhatsApp" }
  ],
  "pages": {
    "privacy": {
      "title": "Политика конфиденциальности",
      "version": "v1.1",
      "lastUpdated": "24.04.2026",
      "sections": [
        { "id": "general", "title": "Общие положения", "content": "Настоящая Политика в отношении обработки персональных данных разработана {content.companyName} (ОГРН {content.ogrn}, ИНН {content.inn}) в соответствии с требованиями Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных».\n\nОператор персональных данных: {content.companyName}, адрес: {content.address}. Регистрация в реестре Роскомнадзора: №{content.pdnReg}, Приказ {content.pdnOrder}." },
        { "id": "data-list", "title": "Состав персональных данных", "content": "Мы обрабатываем следующие категории персональных данных, предоставленных вами через формы обратной связи на сайте:\n\n• Фамилия, имя, отчество;\n• Номер контактного телефона;\n• Адрес электронной почты (email);\n• Адрес объекта (для целей логистики);\n• Технические данные: IP-адрес, тип устройства, файлы cookie (аналитические и технические)." },
        { "id": "goals", "title": "Цели обработки", "content": "Обработка ПДн осуществляется для достижения следующих целей:\n\n• Ответ на обращения пользователей и предоставление консультаций;\n• Подготовка коммерческих предложений;\n• Заключение и исполнение договоров на оказание услуг печати и дистрибуции;\n• Соблюдение требований законодательства РФ." },
        { "id": "rights", "title": "Права субъекта ПДн", "content": "Вы имеете право на:\n\n• Доступ к своим персональным данным;\n• Уточнение (исправление) неточных данных;\n• Требование блокирования или уничтожения данных;\n• Отзыв согласия на обработку в любое время;\n• Обжалование действий Оператора в Роскомнадзоре или суде." },
        { "id": "protection", "title": "Меры защиты", "content": "{content.companyName} применяет организационные и технические меры для защиты персональных данных от несанкционированного доступа. Это включает использование защищенного контура печати, шифрование каналов передачи данных и строгое ограничение круга лиц, имеющих доступ к информации в соответствии с ФЗ-152." },
        { "id": "contacts", "title": "Контакты и обращения", "content": "Для реализации ваших прав или получения информации об обработке ваших ПДн направьте письменный запрос на адрес: {content.address} или на электронную почту: {content.email}." }
      ]
    },
    "requisites": {
      "title": "Карточка организации",
      "subtitle": "{content.companyName} • Актуальные реквизиты юридического лица",
      "fullCompanyName": "Общество с ограниченной ответственностью «{content.logoText}»",
      "note": "Для запроса банковских реквизитов (р/с) и договоров, пожалуйста, свяжитесь с нашим отделом бухгалтерии."
    },
    "oferta": {
      "title": "Оферта и условия",
      "domain": "vektor-vrn.ru",
      "content": "Настоящий интернет-сайт {content.domain} носит исключительно информационный характер. Информация, представленная на сайте, включая описание услуг, технологические параметры и тарифные решения, не является публичной офертой.\n\n{content.companyName} оставляет за собой право в любое время без уведомления пользователей вносить изменения в информацию на сайте.\n\nВсе цены, условия и параметры оказываемых услуг (печать, логистика, дистрибуция) определяются индивидуально в рамках официального договора, заключаемого с каждым контрагентом в письменной форме."
    }
  },
  "logoScaleFooter": 1.2,
  "legal": {
    "statusLabel": "Статус",
    "statusValue": "Оператор ПДн (Роскомнадзор), рег. № 36-25-043546",
    "privacy": "Настоящая Политика конфиденциальности персональных данных (далее – Политика конфиденциальности) действует в отношении всей информации, которую {content.companyName}, расположенное на домене {content.domain}, может получить о Пользователе во время использования сайта...",
    "agreement": "Согласие на обработку персональных данных... В соответствии с Федеральным законом № 152-ФЗ «О персональных данных» от 27.07.2006 года настоящим подтверждаю своё согласие на обработку моих персональных данных...",
    "version": "2.0"
  },
  "_changelog": {
    "version": "2.0",
    "date": "2026-04-24",
    "author": "content-review",
    "changes": [
      "hero.badge: исправлена обрезка ('Собл' → полная фраза)",
      "hero.hotlinePhone: заглушка заменена на реальный номер +7 (930) 409-27-00",
      "hero.title1 + titleGradient: новый слоган, ориентированный на выгоду и закон",
      "hero.subtitle: переписан с акцентом на комплексность и 152-ФЗ",
      "stats: все значения были в JSON корректно, STAT_ — проблема рендера",
      "sections: добавлена новая секция 'bpo' (образовательный блок о технологии)",
      "bpo: новый раздел — объяснение технологии БПО с правовым контекстом",
      "features.title/subtitle: переориентированы с 'стандартов' на конкретные причины выбора",
      "features.items[0].title: 'Технология Pressure Seal' → 'Защита персональных данных'",
      "features.items[0].desc: добавлен регномер оператора ПДн",
      "features.items[1]: расширен — добавлены сроки удаления данных и зашифрованные каналы",
      "features.items[2]: добавлена конкретная экономия (-12-18% возвратов)",
      "features.items[3].title: 'Гео-мониторинг' → 'GPS-контроль каждого маршрута'",
      "features.items[4].title: добавлен конкретный SLA в заголовок",
      "features.items[5]: добавлено 'без субподряда'",
      "process.subtitle: переписан — акцент на 'один подрядчик'",
      "process.steps[0].desc: добавлены НПА (ПП РФ № 354, ГИС ЖКХ)",
      "process.steps[2].title: 'Контроль и доставка' → 'Логистика и контроль'",
      "services.subtitle: переформулирован",
      "services.list[*].tagline: добавлены слоганы к каждому тарифу",
      "services.list[*].desc: добавлены описания с выгодой",
      "services.list[0].features: расширены до 5 пунктов с конкретикой",
      "services.list[1].features: расширены до 6 пунктов, добавлены НПА",
      "services.list[1].accentBadge: 'Полный логистический цикл' → 'Рекомендуем'",
      "faq: добавлена 3 новых вопроса (КоАП, уничтожение данных, ЖК с СКУД)",
      "faq.items[*].a: расширены ответы — добавлена конкретика и правовые ссылки",
      "faq.items[1].q: переформулирован — теперь о передаче реестра",
      "faq.items[2].a: добавлены три конкретных преимущества БПО",
      "serviceArea.locations: добавлена колонка 'freq' с частотой доставки",
      "serviceArea.ownNetworkNote: добавлена подпись блока",
      "contact.formMessage: placeholder изменён на 'Тираж, география, вопрос'",
      "contact.infoDesc: добавлено рабочее время",
      "footer.description: добавлен регномер оператора ПДн",
      "footer.offerLink: '#' → '/offer'",
      "legal.statusValue: добавлен регномер",
      "cookieBanner.description: добавлена ссылка на ФЗ-152",
      "_changelog: добавлен раздел истории изменений"
    ],
    "requiresAction": [
      "ОБЯЗАТЕЛЬНО: bank.name/bik/rs/ks — заполнить банковские реквизиты",
      "ОБЯЗАТЕЛЬНО: integrations.formspreeId — подключить обработчик формы",
      "ОБЯЗАТЕЛЬНО: analytics.yandexMetrica — подключить Яндекс.Метрику",
      "ОБЯЗАТЕЛЬНО: footer.offerLink — разместить текст оферты по адресу /offer",
      "РЕКОМЕНДУЕТСЯ: socials.whatsapp — добавить WhatsApp для быстрой связи",
      "РЕКОМЕНДУЕТСЯ: inn/ogrn — проверить корректность (сейчас выглядят как заглушки)",
      "РЕКОМЕНДУЕТСЯ: добавить секцию 'cases' с 2-3 анонимными кейсами",
      "РЕКОМЕНДУЕТСЯ: analytics.googleAnalytics или yandexMetrica — без метрик нет данных"
    ]
  },
  "hotlineConfig": {
    "showBadge": true,
    "scheduleEnabled": true,
    "startHour": 9,
    "endHour": 18,
    "statusOnline": "Линия активна",
    "statusOffline": "Офлайн",
    "workDays": [
      1,
      2,
      3,
      4,
      5
    ]
  },
  "news": {
    "title": "Новости и",
    "accent": "события",
    "items": [
      {
        "date": "24.04.2026",
        "tag": "ПРОИЗВОДСТВО",
        "title": "Запуск новой линии Pressure Seal",
        "desc": "Мы ввели в эксплуатацию дополнительный комплекс оборудования для промышленной печати, что позволило увеличить общую мощность производства на 30%."
      },
      {
        "date": "15.03.2026",
        "tag": "ЛОГИСТИКА",
        "title": "Обновление автопарка логистики",
        "desc": "Для обеспечения стабильных сроков доставки в муниципальные районы области были закуплены три новых специализированных автомобиля."
      },
      {
        "date": "01.02.2026",
        "tag": "БЕЗОПАСНОСТЬ",
        "title": "Успешная аттестация Роскомнадзора",
        "desc": "Компания подтвердила статус оператора персональных данных, успешно пройдя плановую проверку соответствия техническим регламентам ФЗ-152."
      }
    ]
  }
};

function LoginScreen({ onLogin, companyName }) {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);

  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setInterval(() => {
        setLockoutTime(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockoutTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lockoutTime > 0) return;

    // SHA-256 hash of the password. Default is hash of 'admin'
    const targetHash = process.env.REACT_APP_CMS_PASS_HASH || '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';

    try {
      const msgUint8 = new TextEncoder().encode(pass);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const inputHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      if (inputHash === targetHash) {
        onLogin();
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setError(true);
        setTimeout(() => setError(false), 1000);

        if (newAttempts >= 5) {
          setLockoutTime(30);
          setAttempts(0);
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#08080f] flex items-center justify-center p-6">
      <div className={`w-full max-w-md bg-slate-900/50 p-10 rounded-[2.5rem] border ${error ? 'border-red-500 animate-shake' : 'border-slate-800'} glass shadow-2xl transition-all`}>
        <div className="flex justify-center mb-8">
          <Logo light={false} text={companyName || INITIAL_CONTENT.logoText} tagline="ADMIN ACCESS" />
        </div>
        <h2 className="text-3xl font-black text-white text-center mb-2">CMS Доступ</h2>
        <p className="text-slate-400 text-center mb-8 font-medium">
          {lockoutTime > 0
            ? `Система заблокирована на ${lockoutTime} сек.`
            : attempts > 0 ? `Попытка ${attempts} из 5` : 'Введите пароль администратора'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="password"
              placeholder="••••••••"
              value={pass}
              disabled={lockoutTime > 0}
              onChange={(e) => setPass(e.target.value)}
              className={`w-full bg-slate-800/50 border ${lockoutTime > 0 ? 'border-red-900/50 opacity-50' : 'border-slate-700'} rounded-2xl px-6 py-4 text-white text-center text-lg tracking-widest focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all`}
            />
          </div>
          <button
            type="submit"
            disabled={lockoutTime > 0}
            className={`w-full text-white py-4 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${lockoutTime > 0 ? 'bg-slate-800 cursor-not-allowed opacity-50' : 'hover:scale-[1.02] active:scale-95'}`}
            style={{ background: lockoutTime > 0 ? '' : 'linear-gradient(135deg, #3b82f6, #60a5fa)' }}
          >
            {lockoutTime > 0 ? `Доступ ограничен` : <><LogIn size={20} /> Войти в панель</>}
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          {companyName || INITIAL_CONTENT.companyName} • Security Panel
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

  // Initialize theme based on content settings
  useEffect(() => {
    const setting = content.defaultTheme || 'dark';
    if (setting === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark ? 'dark' : 'light');
    } else {
      setTheme(setting);
    }
  }, [content.defaultTheme]);

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
        const validated = validateContent(parsed);
        if (validated) {
          // Deep merge helper to ensure new schema fields exist
          const deepMerge = (target, source) => {
            if (!source || typeof source !== 'object' || Array.isArray(source)) return target;
            const output = { ...target };

            Object.keys(source).forEach(key => {
              if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                if (!(key in target) || target[key] === null || typeof target[key] !== 'object') {
                  output[key] = source[key];
                } else {
                  output[key] = deepMerge(target[key], source[key]);
                }
              } else if (Array.isArray(source[key]) && key === 'sections') {
                const targetSections = target[key] || [];
                const sourceSections = source[key] || [];
                const sourceMap = new Map(sourceSections.map(s => [s.id, s]));

                output[key] = targetSections.map(tSec => {
                  if (sourceMap.has(tSec.id)) {
                    return { ...tSec, ...sourceMap.get(tSec.id) };
                  }
                  return tSec;
                });

                const targetIds = new Set(targetSections.map(s => s.id));
                sourceSections.forEach(s => {
                  if (!targetIds.has(s.id)) output[key].push(s);
                });
              } else if (source[key] !== undefined && source[key] !== null) {
                output[key] = source[key];
              }
            });
            return output;
          };

          setContent(deepMerge(INITIAL_CONTENT, validated));
        } else {
          console.warn("Local storage content is invalid, using defaults");
        }
      } catch (e) {
        console.error("Failed to parse saved content", e);
      }
    }
  }, []);

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'vector_content' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          const validated = validateContent(parsed);
          if (validated) {
            setContent(validated);
          }
        } catch (err) {
          console.error("Storage sync failed:", err);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleUpdateContent = (newContent) => {
    setContent(newContent);
    localStorage.setItem('vector_content', JSON.stringify(newContent));
  };

  useEffect(() => {
    // Hide splash screen after configured delay
    const timer = setTimeout(() => {
      document.body.classList.add('loaded');
      // Completely remove from layout after fade out
      setTimeout(() => {
        const loader = document.getElementById('loader-wrapper');
        if (loader) loader.style.display = 'none';
      }, 600); // 0.5s transition + 0.1s buffer
    }, (content && content.loaderDelay) || 2000);

    return () => clearTimeout(timer);
  }, [content?.loaderDelay]);

  useEffect(() => {
    // Inject Analytics only if IDs exist AND cookie consent is given
    const consentRaw = localStorage.getItem('cookieConsent');
    const hasConsent = consentRaw ? JSON.parse(consentRaw).accepted : false;

    if (!hasConsent || !content || !content.analytics) return;

    if (content.analytics.yandexMetrica) {
      try {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.id = 'ym-script';
        script.textContent = `
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
      } catch (err) {
        console.error("Yandex Metrica init failed:", err);
      }
    }

    if (content.analytics.googleAnalytics) {
      try {
        const gScript = document.createElement('script');
        gScript.async = true;
        gScript.id = 'ga-script';
        gScript.src = `https://www.googletagmanager.com/gtag/js?id=${content.analytics.googleAnalytics}`;
        document.head.appendChild(gScript);

        const gConfigScript = document.createElement('script');
        gConfigScript.id = 'ga-config';
        gConfigScript.textContent = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${content.analytics.googleAnalytics}');
        `;
        document.head.appendChild(gConfigScript);
      } catch (err) {
        console.error("Google Analytics init failed:", err);
      }
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

  if (view === 'login') return <LoginScreen onLogin={() => { setIsAuth(true); setView('cms'); }} companyName={content.companyName} />;

  return (
    <ErrorBoundary>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}
