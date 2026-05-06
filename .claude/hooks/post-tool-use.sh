#!/bin/bash
# Post-tool validation hook — автоматические проверки после изменений кода
# Срабатывает ПОСЛЕ успешного вызова инструмента

TOOL_NAME="$1"
CHANGED_FILES="$2"

# Если были изменены файлы JS/JSX/CSS — прогнать build
if [[ "$TOOL_NAME" == "Edit" ]] || [[ "$TOOL_NAME" == "Write" ]]; then
  if echo "$CHANGED_FILES" | grep -qE "\.(jsx?|css)$"; then
    echo "🔨 Проверка: npm run build..."

    # Перейти в директорию проекта
    cd /Users/avbrechka/vector-landing 2>/dev/null || return 0

    # Запустить build только если package.json существует
    if [ -f "package.json" ]; then
      timeout 60 npm run build > /tmp/build.log 2>&1
      BUILD_EXIT=$?

      if [ $BUILD_EXIT -eq 0 ]; then
        echo "✅ Build успешен"
      else
        echo "⚠️ Build имеет ошибки (проверить логи)"
        tail -20 /tmp/build.log
      fi
    fi
  fi
fi

return 0
