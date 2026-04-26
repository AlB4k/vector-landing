const INITIAL_CONTENT = {
  "companyName": "ООО \"ВЕКТОР\"",
  "companyTagline": "Доставка + технологии",
  "logoText": "ВЕКТОР",
  "ui": {},
  "ceoLabel": "Генеральный директор",
  "address": "394014, г. Воронеж, ул. Лебедева, д. 4, пом. IV",
  "phone": "+7 (930) 409-27-00",
  "email": "Vektor0949@yandex.ru",
  "inn": "3666272154",
  "kpp": "366301001",
  "ogrn": "1243600014162",
  "ceo": "Полякова Л.В.",
  "okved": "53.20.3",
  "bank": {},
  "pdnReg": "36-25-043546",
  "pdnOrder": "№218 от 13.11.2025",
  "theme": {},
  "sections": [],
  "hero": {},
  "stats": [],
  "bpo": {},
  "features": {},
  "process": {},
  "services": {},
  "faq": {},
  "serviceArea": {},
  "contact": {},
  "modals": {},
  "footer": {},
  "socialsList": [],
  "analytics": {},
  "integrations": {},
  "socials": [],
  "pages": {},
  "cookieBanner": {},
  "loaderDelay": 1000,
  "defaultTheme": "dark",
  "logoScaleHeader": 1.4,
  "logoScaleFooter": 1.2,
  "legal": {},
  "_changelog": {},
  "hotlineConfig": {},
  "news": {}
};

const requiredFields = [
    'hero', 'sections', 'services', 'features', 'companyName',
    'stats', 'process', 'faq', 'news', 'serviceArea', 'contact',
    'footer', 'analytics', 'legal', 'bpo', 'theme', 'ui', 'hotlineConfig'
];

const missing = requiredFields.filter(field => INITIAL_CONTENT[field] === undefined || INITIAL_CONTENT[field] === null);
console.log("Missing fields:", missing);
