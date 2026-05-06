#!/bin/bash
# Pre-tool validation hook — защита от опасных команд
# Срабатывает ПЕРЕД каждым вызовом инструмента

TOOL_NAME="$1"
TOOL_ARGS="$2"

# Опасные команды требующие явного подтверждения
case "$TOOL_NAME" in
  "Bash")
    # Запретить git push --force (может перезаписать upstream)
    if [[ "$TOOL_ARGS" =~ "git push --force" ]] || [[ "$TOOL_ARGS" =~ "git push -f" ]]; then
      echo "❌ BLOCKED: 'git push --force' требует явного подтверждения пользователя"
      return 1
    fi

    # Запретить git reset --hard (может потерять работу)
    if [[ "$TOOL_ARGS" =~ "git reset --hard" ]]; then
      echo "❌ BLOCKED: 'git reset --hard' требует явного подтверждения пользователя"
      return 1
    fi

    # Запретить rm -rf (опасное удаление)
    if [[ "$TOOL_ARGS" =~ "rm -rf" ]] && [[ ! "$TOOL_ARGS" =~ "node_modules" ]]; then
      echo "❌ BLOCKED: 'rm -rf' требует явного подтверждения пользователя"
      return 1
    fi
    ;;
esac

return 0
