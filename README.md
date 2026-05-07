# 🚀 VECTOR - Logistics Landing Page

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-production%20ready-success)

Профессиональный одностраничный сайт (landing page) для логистической компании с встроенной CMS.

**🌐 Production:** https://vector-landing-roan.vercel.app

---

## 📋 Быстрый доступ

- [Описание](#-описание)
- [Возможности](#-возможности)
- [Быстрый старт](#-быстрый-старт)
- [CMS управление](#-cms-управление)
- [Развертывание](#-развертывание)
- [Первичная настройка](#-первичная-настройка)
- [Структура проекта](#-структура-проекта)

---

## 📖 Описание

**VECTOR** — это современный, быстрый и адаптивный сайт логистической компании, разработанный на React и развернутый на Vercel.

### Ключевые характеристики

- ✅ **100% динамический контент** — управляется через встроенную CMS
- ✅ **Black-state архитектура** — изменения сначала сохраняются локально, затем применяются
- ✅ **Полностью адаптивен** — мобильные, планшеты, десктопы
- ✅ **Быстрый** — Lighthouse SEO 100/100, Best Practices 100/100
- ✅ **Защищен** — XSS protection, input validation, spam protection
- ✅ **Modern Stack** — React 19, Tailwind CSS, React Router v7

---

## ✨ Возможности

### 1. Управление контентом

11 настраиваемых секций:
- Hero (главный баннер)
- Features (преимущества)
- Services (услуги)
- Stats (статистика)
- ServiceArea (геграфия покрытия с 14 SVG-темами)
- Process (процесс работы)
- BPO Tech (технология)
- FAQ (вопросы-ответы)
- Reviews (отзывы)
- TrustedClients (клиенты)
- Contact (форма обратной связи)

### 2. Форма обратной связи

Три канала доставки:
- 📱 **Telegram Bot** — получайте сообщения в боте
- 📧 **SMTP Email** — отправка на почту
- ✉️ **EmailJS** — облачный сервис

Защита от спама:
- Валидация входных данных
- Rate limiting
- Honeypot field

### 3. Аналитика

- **Google Analytics 4** — полная статистика
- **Яндекс.Метрика** — цели и вебвизор

---

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 16+ ([скачать](https://nodejs.org))
- Git ([скачать](https://git-scm.com))

### Локальная установка

```bash
# Клонируйте репозиторий
git clone https://github.com/AlB4k/vector-landing.git
cd vector-landing

# Установите зависимости
npm install

# Запустите dev сервер
npm start

# Сайт откроется на http://localhost:3000
```

---

## 🛠️ CMS управление

### Открытие CMS

Нажмите на клавиатуре: **Alt + Shift + C**

### Основные функции

- ✏️ **Редактирование** — измените любой контент на сайте
- 💾 **Черновик** — изменения применяются только при сохранении
- 📥 **Импорт** — загрузите JSON конфигурацию
- 📤 **Экспорт** — скачайте текущую конфигурацию
- ↩️ **Undo/Restore** — отмена/восстановление

---

## 📦 Развертывание

### На Vercel (рекомендуется)

1. Зарегистрируйтесь на [Vercel.com](https://vercel.com)
2. Импортируйте GitHub репозиторий
3. Vercel автоматически:
   - Установит зависимости
   - Построит приложение
   - Развернет на production

**Автоматическое обновление:** Каждый `git push` на main автоматически развертывает сайт (~3-5 минут).

### На других хостингах

```bash
# Построить production версию
npm run build

# Результат в папке build/
# Загрузьте содержимое на ваш хостинг
```

---

## 🎯 Первичная настройка

### Setup Wizard

Используйте встроенный мастер для быстрой конфигурации:

```
Откройте: tools/setup-wizard.html
Двойной клик → откроется в браузере
```

Мастер поможет вам:
1. Добавить информацию о компании
2. Обновить статистику
3. Настроить услуги
4. Сконфигурировать каналы доставки форм

---

## 📁 Структура проекта

```
src/
├── App.js                  # Главное приложение
├── Landing.js              # Главная страница
├── components/
│   ├── Hero.js            # Баннер
│   ├── Services.js        # Услуги
│   ├── Contact.js         # Форма
│   ├── CMS.js             # Административная панель
│   ├── BotChallenge.js    # Защита от ботов
│   └── ... (другие)
├── pages/
│   ├── PrivacyPolicy.js   # Политика
│   ├── Requisites.js      # Реквизиты
│   └── Oferta.js          # Условия
└── utils/
    ├── content.js         # interpolate() функция
    ├── security.js        # Валидация
    └── formSender.js      # Отправка форм

docs/
└── ANALYTICS_SETUP.md     # Инструкция аналитики

tools/
└── setup-wizard.html      # Мастер настройки
```

---

## 🛠️ Технический стек

- React 19.2.5
- React Router 7.15.0
- Tailwind CSS 3.4.19
- Lucide React (иконки)
- Create React App 5.0.1
- Vercel (hosting)

---

## 📊 Доступные команды

```bash
npm start          # Dev сервер (http://localhost:3000)
npm run build      # Production build
npm run lint       # ESLint проверка
npm run lint:fix   # Автоисправление
```

---

## 🔒 Безопасность

- ✅ XSS Protection — санитизация HTML
- ✅ Input Validation — валидация форм
- ✅ CMS Protection — math challenge капча
- ✅ Spam Protection — honeypot, rate limiting
- ✅ HTTPS ready — Vercel автоматически

---

## 🐛 Troubleshooting

### "npm start" не работает?

```bash
# Удалите node_modules и переустановите
rm -rf node_modules package-lock.json
npm install
npm start
```

### Как изменить пароль CMS?

Проверьте переменную окружения `CMS_PASSWORD` в `.env` или свяжитесь с администратором.

### Как интегрировать свой домен?

На Vercel: Settings → Domains → Add Custom Domain

---

## 📞 Поддержка

- 📧 **Email:** tigdars@gmail.com
- 🔗 **GitHub:** https://github.com/AlB4k/vector-landing
- 💬 **Telegram:** https://t.me/vektor_logistics

---

## 📋 История версий

**v1.0.0** (2026-05-07) — Production Release
- 100% динамический контент
- CMS draft-state
- Bot protection
- GA4 + Яндекс.Метрика
- Setup wizard
- Полная документация

---

**Status:** ✅ Production Ready  
**Lighthouse:** 9.7/10 ⭐⭐⭐⭐⭐  
**Last Updated:** 2026-05-07

Made with ❤️ by Claude Code
