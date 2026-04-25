/**
 * Валидация и санитизация данных для CMS и Landing
 */

const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:'];

/**
 * Санитизация URL для предотвращения javascript: инъекций
 */
export const sanitizeUrl = (url) => {
  if (!url) return '';
  try {
    const parsed = new URL(url, window.location.origin);
    return ALLOWED_PROTOCOLS.includes(parsed.protocol) ? url : '';
  } catch (e) {
    // Если это относительный путь (например, #contact или /privacy)
    if (url.startsWith('#') || url.startsWith('/')) return url;
    return '';
  }
};

/**
 * Валидация структуры контента (Schema Validation)
 */
export const validateContent = (data) => {
  if (!data || typeof data !== 'object') return null;

  const errors = [];

  // Проверка обязательных разделов верхнего уровня
  const requiredFields = [
    'hero', 'sections', 'services', 'features', 'companyName',
    'stats', 'process', 'faq', 'news', 'serviceArea', 'contact',
    'footer', 'socials', 'analytics', 'legal', 'bpo'
  ];
  requiredFields.forEach(field => {
    if (!data[field]) errors.push(`Missing required field: ${field}`);
  });

  if (errors.length > 0) {
    console.error("Content validation failed:", errors);
    return null;
  }

  // Санитизация всех ссылок в объекте рекурсивно (базовая реализация)
  const sanitized = JSON.parse(JSON.stringify(data));

  if (sanitized.socials) {
    Object.keys(sanitized.socials).forEach(key => {
      sanitized.socials[key] = sanitizeUrl(sanitized.socials[key]);
    });
  }

  if (sanitized.footer && sanitized.footer.offerLink) {
    sanitized.footer.offerLink = sanitizeUrl(sanitized.footer.offerLink);
  }

  // Санитизация ID аналитики (защита от JS инъекций в шаблоны скриптов)
  if (sanitized.analytics) {
    if (sanitized.analytics.yandexMetrica) {
      sanitized.analytics.yandexMetrica = String(sanitized.analytics.yandexMetrica).replace(/[^\d]/g, '');
    }
    if (sanitized.analytics.googleAnalytics) {
      sanitized.analytics.googleAnalytics = String(sanitized.analytics.googleAnalytics).replace(/[^\w-]/g, '');
    }
    if (sanitized.analytics.pixelId) {
      sanitized.analytics.pixelId = String(sanitized.analytics.pixelId).replace(/[^\d]/g, '');
    }
  }

  return sanitized;
};
