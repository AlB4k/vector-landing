# Skill: VECTOR Build Check

## Назначение
Комплексная проверка проекта перед деплоем на production. Гарантирует что на Vercel поднимется стабильный код.

## Когда использовать
- Перед `git push` на main
- Перед `vercel --prod`
- После больших рефакторингов
- Перед merge PR в main

## Чек-лист

### 1️⃣ Code Quality
```bash
# Синтаксис JavaScript/JSX
npm run build

# Если есть ESLint
npm run lint

# Если есть TypeScript
npm run type-check
```

### 2️⃣ Dependencies
```bash
# Обновления доступны?
npm outdated

# Уязвимости?
npm audit --production
```

### 3️⃣ Production Build
```bash
# Размер бандла
npm run build

# Проверить что .next или build/ не огромный
du -sh .next/
# Должен быть < 500MB (иначе будут проблемы на Vercel)

# Статические файлы
ls -lah public/ | head -20
```

### 4️⃣ Environment Variables
```bash
# Все переменные из .env.example присутствуют?
cat .env.local | grep -E "^[A-Z_]+" | wc -l
cat .env.example | grep -E "^[A-Z_]+" | wc -l
# Должны быть одинаковыми
```

### 5️⃣ Git Status
```bash
# Нет ли незакоммиченных изменений?
git status --porcelain

# Актуальна ли ветка с main?
git diff main..HEAD --stat
```

### 6️⃣ Browser Testing (вручную)
```bash
npm start
```
Проверить:
- [ ] Hero section отображается корректно
- [ ] CMS контент загружается
- [ ] Форма отправляется (без актуальной отправки)
- [ ] Geography компонент рендерится
- [ ] No console errors (F12 → Console)
- [ ] Mobile view адаптивен (DevTools)

### 7️⃣ Specific VECTOR Checks

#### CMS
- [ ] `/cms` роут защищен (редирект если не авторизован)
- [ ] Draft-state работает (изменения не применяются до Save)
- [ ] Контент сохраняется в localStorage
- [ ] Все секции `enabled: true` отображаются

#### Geography
- [ ] SVG-тема активна (Radar/Mesh/Blueprint/etc)
- [ ] Регионы отображаются корректно
- [ ] Нет CSS конфликтов с другими компонентами

#### Forms
- [ ] Контактная форма доступна
- [ ] Валидация работает (пустое поле → ошибка)
- [ ] Submit кнопка не disabled
- [ ] Нет CORS ошибок в консоли

#### TrustedClients
- [ ] CSS marquee анимация работает
- [ ] Логотипы загружаются (image 404?)
- [ ] Responsive для мобилей

### 8️⃣ Vercel Deployment Check
```bash
# Предпросмотр как на Vercel (без интернета)
vercel build

# Запустить локальный Vercel-like окружение
vercel dev
```

## Автоматический чек

Создай скрипт `.claude/hooks/pre-deploy.sh`:
```bash
#!/bin/bash

set -e  # Выйти при первой ошибке

echo "🔍 Pre-deploy checks..."

# Build
npm run build || exit 1

# Lint (если есть)
npm run lint 2>/dev/null || echo "⚠️ Lint warning"

# Size check
BUILD_SIZE=$(du -s .next/ 2>/dev/null | awk '{print $1}')
if [ "$BUILD_SIZE" -gt 500000 ]; then
  echo "⚠️ Build size: ${BUILD_SIZE}KB (может быть проблема на Vercel)"
fi

echo "✅ All checks passed!"
```

## Troubleshooting

| Ошибка | Решение |
|--------|---------|
| `npm run build: command not found` | Проверить package.json → scripts |
| `Out of memory` | Увеличить Node heap: `NODE_OPTIONS="--max-old-space-size=4096" npm run build` |
| `ENOSPC: no space left` | Очистить: `rm -rf .next node_modules && npm install` |
| `Cannot find module` | `npm install` или `npm ci` |

## После успешного чека
1. ✅ Все проверки прошли
2. 📝 Commit сообщение в conventional format
3. 🚀 `git push origin [branch]`
4. 📋 Открыть PR или merge если main
5. 🔗 Vercel сам задеплоит (ссылка в PR)

## Стабильный релиз (reference)
- **Date**: 2026-04-29
- **Commit**: 0f4faee
- **Status**: Stable, verified in production
