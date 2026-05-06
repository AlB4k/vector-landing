#!/bin/bash
# 🔍 БЫСТРАЯ ДИАГНОСТИКА ИНТЕГРАЦИИ CMS↔SITE

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  🔍 CMS↔Site Integration Diagnostic Tool                     ║"
echo "║  Дата: $(date)                                        ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}ФАЗА 1: ПРОВЕРКА ФАЙЛОВ${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Проверка App.js
echo -e "${YELLOW}1. Проверка App.js${NC}"
if [ -f "src/App.js" ]; then
  echo -e "${GREEN}✓ Файл src/App.js найден${NC}"
  
  # Проверка наличия localStorage ключей
  echo ""
  echo "  Ищу localStorage ключи в коде:"
  echo ""
  
  if grep -q "landingContent" src/App.js; then
    echo -e "  ${GREEN}✓ Найден 'landingContent'${NC} (ключ в CMS)"
    grep -n "landingContent" src/App.js | head -3
  else
    echo -e "  ${RED}✗ 'landingContent' не найден${NC}"
  fi
  
  echo ""
  
  if grep -q "vector_content" src/App.js; then
    echo -e "  ${RED}⚠ Найден 'vector_content'${NC} (старый ключ?)"
    grep -n "vector_content" src/App.js | head -3
  else
    echo -e "  ${GREEN}✓ 'vector_content' не найден${NC} (хорошо)"
  fi
  
else
  echo -e "${RED}✗ Файл src/App.js не найден${NC}"
  exit 1
fi

echo ""
echo -e "${YELLOW}2. Проверка Landing компонента${NC}"

# Поиск Landing компонента
LANDING_FILE=$(find src -type f \( -name "*Landing*" -o -name "*landing*" \) | grep -i "\.js\|\.jsx" | head -1)

if [ -n "$LANDING_FILE" ]; then
  echo -e "${GREEN}✓ Landing компонент найден: $LANDING_FILE${NC}"
  echo ""
  echo "  Ищу плейсхолдеры:"
  echo ""
  
  # Проверка плейсхолдеров
  if grep -q "0,0 М\|0 %" "$LANDING_FILE"; then
    echo -e "  ${RED}✗ Найдены плейсхолдеры типа '0,0 М+', '0 %'${NC}"
    grep -n "0,0\|0 %" "$LANDING_FILE" | head -5
  else
    echo -e "  ${GREEN}✓ Плейсхолдеры не найдены${NC}"
  fi
  
  echo ""
  echo "  Ищу использование контента:"
  echo ""
  
  if grep -q "props\|content" "$LANDING_FILE"; then
    echo -e "  ${GREEN}✓ Использует props/content${NC}"
    grep -n "props\|content" "$LANDING_FILE" | head -3
  else
    echo -e "  ${YELLOW}⚠ Может быть жестко захардкодирован контент${NC}"
  fi
  
else
  echo -e "${YELLOW}⚠ Landing компонент не найден${NC}"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}ФАЗА 2: ПРОВЕРКА CMS КОМПОНЕНТА${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}3. Проверка CMS.js${NC}"

if [ -f "src/components/CMS.js" ]; then
  echo -e "${GREEN}✓ CMS.js найден${NC}"
  echo ""
  echo "  Ищу где сохраняется контент:"
  echo ""
  
  if grep -q "localStorage.setItem.*landingContent" src/components/CMS.js; then
    echo -e "  ${GREEN}✓ CMS сохраняет в 'landingContent'${NC}"
    grep -n "landingContent" src/components/CMS.js | head -2
  elif grep -q "localStorage.setItem" src/components/CMS.js; then
    echo -e "  ${YELLOW}⚠ CMS использует localStorage но нужно проверить ключ${NC}"
    grep -n "localStorage.setItem" src/components/CMS.js | head -2
  else
    echo -e "  ${RED}✗ localStorage.setItem не найден в CMS${NC}"
  fi
  
else
  echo -e "${YELLOW}⚠ CMS.js не найден${NC}"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}ФАЗА 3: ПРОВЕРКА BUILD${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${YELLOW}4. Проверка build конфигурации${NC}"

if [ -f "package.json" ]; then
  echo -e "${GREEN}✓ package.json найден${NC}"
  echo ""
  echo "  Версии зависимостей:"
  grep -E '"react"|"react-dom"|"react-scripts"' package.json | head -3
else
  echo -e "${RED}✗ package.json не найден${NC}"
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}ФАЗА 4: СВОДКА И РЕКОМЕНДАЦИИ${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Анализ
ISSUES=0
echo -e "${YELLOW}Проверка проблем:${NC}"
echo ""

if grep -q "vector_content" src/App.js 2>/dev/null; then
  echo -e "  ${RED}1. ✗ ПРОБЛЕМА: App.js использует 'vector_content' вместо 'landingContent'${NC}"
  ISSUES=$((ISSUES + 1))
  echo "     FIX: Замени все 'vector_content' на 'landingContent' в App.js"
  echo ""
fi

if [ -n "$LANDING_FILE" ] && grep -q "0,0 М\|0 %" "$LANDING_FILE"; then
  echo -e "  ${RED}2. ✗ ПРОБЛЕМА: Landing использует плейсхолдеры вместо реальных данных${NC}"
  ISSUES=$((ISSUES + 1))
  echo "     FIX: Замени плейсхолдеры на {content?.field || 'placeholder'}"
  echo ""
fi

if ! grep -q "localStorage.setItem.*landing" src/components/CMS.js 2>/dev/null; then
  echo -e "  ${YELLOW}3. ⚠ ВНИМАНИЕ: Проверь что CMS сохраняет в правильный ключ${NC}"
  ISSUES=$((ISSUES + 1))
  echo "     ACTION: Посмотри CMS.js handleSave функцию"
  echo ""
fi

if grep -q "localStorage.setItem.*vector_content" src/components/CMS.js 2>/dev/null; then
  echo -e "  ${RED}4. ✗ ПРОБЛЕМА: CMS сохраняет в 'vector_content' вместо 'landingContent'${NC}"
  ISSUES=$((ISSUES + 1))
  echo "     FIX: Замени 'vector_content' на 'landingContent' в CMS.js"
  echo ""
fi

echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}ИТОГОВЫЙ СТАТУС${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

if [ $ISSUES -eq 0 ]; then
  echo -e "${GREEN}✅ СТАТУС: Проблем не найдено${NC}"
  echo ""
  echo "Значит:"
  echo "- localStorage ключи правильные"
  echo "- CMS сохраняет в правильное место"
  echo "- Landing использует реальные данные"
  echo ""
  echo "РЕКОМЕНДАЦИЯ: Запусти npm start и проверь в браузере"
  echo "Если контент еще не отображается → требуется manual debug в консоли"
  echo ""
else
  echo -e "${RED}❌ СТАТУС: Найдено $ISSUES проблем${NC}"
  echo ""
  echo "РЕКОМЕНДАЦИЯ: Исправь проблемы по порядку:"
  echo "1. Замени localStorage ключи"
  echo "2. Замени плейсхолдеры на реальные данные"
  echo "3. Проверь CMS save функцию"
  echo "4. Запусти npm start и проверь результат"
  echo ""
fi

echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo "📝 Подробный диагностический отчет:"
echo "   Используй prompt: CRITICAL_BUG_FIX_PROMPT.md"
echo "   для пошагового исправления проблем"
echo ""
echo "🚀 Следующие шаги:"
echo "   1. Прочитай CRITICAL_BUG_FIX_PROMPT.md"
echo "   2. Выполни ФАЗА 1: Диагностика"
echo "   3. Выполни ФАЗА 2: Определение причины"
echo "   4. Выполни ФАЗА 3: Исправления"
echo "   5. Выполни ФАЗА 4: Тестирование"
echo ""
