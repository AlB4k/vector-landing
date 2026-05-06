# 📋 Структурные улучшения Claude Code (2026-05-06)

## ✅ Что было улучшено

### 1️⃣ Hooks для безопасности и валидации

**Директория:** `.claude/hooks/`

#### `pre-tool-use.sh`
Блокирует опасные команды ДО их выполнения:
- ❌ `git push --force` — требует явного подтверждения
- ❌ `git reset --hard` — требует явного подтверждения  
- ❌ `rm -rf` (кроме node_modules) — требует явного подтверждения

**Когда срабатывает:** перед каждой Bash командой

#### `post-tool-use.sh`
Автоматически валидирует код после изменений:
- 🔨 Запускает `npm run build` если были изменены `.js/.jsx/.css` файлы
- ✅ Показывает статус build (успех/ошибка)
- ⏱️ Таймаут: 60 секунд

**Когда срабатывает:** после Edit/Write операций

---

### 2️⃣ Templates для частых операций

**Директория:** `.claude/templates/`

| Файл | Назначение |
|------|-----------|
| `TASK.md` | Как создавать задачи через TaskCreate с примерами |
| `PR.md` | Структура pull request перед merge |
| `ERROR_ENTRY.md` | Формат записи ошибок в ERRORS.md |
| `FEATURE_CHECKLIST.md` | Чек-лист перед git push новой фичи |

Используй эти шаблоны как справку при работе.

---

### 3️⃣ Расширенный ERRORS.md

**Улучшения:**
- ✍️ Добавлены инструкции по использованию
- 📚 Разделены ошибки по категориям (Tool-Related, Process-Related, Code-Related)
- 🎯 Добавлены примеры для каждой категории
- 💡 Указано когда добавлять, а когда НЕ добавлять ошибки

**Структура остается прежней:**
```
**Дата:** YYYY-MM-DD
**Ошибка:** краткое название
**Причина:** root cause analysis
**Исправление:** как было решено
**Не повторять:** конкретный паттерн для избежания
```

---

### 4️⃣ Модульные Skills для специфических задач

**Директория:** `.claude/skills/`

#### `cms-content-validation.md`
Валидация структуры контента перед commit:
- ✅ Обязательные поля (id, label, enabled)
- 🔍 Проверка дублирования ID
- 🌳 Валидация по типам (Hero, Geography, Forms)
- 🔗 jq-команды для автоматизации

**Используй когда:** добавляешь новые поля в CMS контент

#### `vector-build-check.md`
Комплексная проверка перед деплоем:
- 💼 Code Quality (build, lint, type-check)
- 📦 Dependencies (outdated, vulnerabilities)
- 🎨 UI Testing (вручную в браузере)
- 🧪 VECTOR-specific checks (CMS, Geography, Forms)
- 🚀 Vercel deployment check

**Используй когда:** перед `git push` на main или `vercel --prod`

---

## 🔗 Как это связано

```
CLAUDE.md (основные инструкции)
    ↓
    ├→ ERRORS.md (известные ошибки + инструкции)
    ├→ hooks/ (автоматизированные проверки)
    ├→ templates/ (шаблоны для частых операций)
    └→ skills/ (специализированные гайды)

settings.local.json
    ↓
    └→ hooks регистрируют pre-tool-use.sh и post-tool-use.sh
```

---

## 🚀 Как использовать

### Перед любой фичей
1. Читай `.claude/templates/FEATURE_CHECKLIST.md`
2. Проверь что нет зафиксированных ошибок в ERRORS.md

### Перед git push
1. Используй `.claude/skills/vector-build-check.md` для проверки
2. Убедись что `npm run build` проходит (hook проверит автоматически)

### При работе с CMS контентом
1. Используй `.claude/skills/cms-content-validation.md` для валидации
2. Проверь что все обязательные поля присутствуют

### При обнаружении ошибки
1. Добавь запись в ERRORS.md используя формат из `.claude/templates/ERROR_ENTRY.md`
2. Включи паттерн в "Не повторять" чтобы избежать этого в будущем

---

## 📊 Статистика

- **Hooks created:** 2 (pre-tool-use, post-tool-use)
- **Templates created:** 4 (TASK, PR, ERROR_ENTRY, FEATURE_CHECKLIST)
- **Skills created:** 2 (cms-content-validation, vector-build-check)
- **ERRORS.md expanded:** +30 строк инструкций и примеров
- **CLAUDE.md updated:** +15 строк с ссылками на новые ресурсы

---

## 🔄 Следующие шаги (опционально)

Эти улучшения уже полностью функциональны. Если в будущем понадобится:
1. **Добавить еще hooks** — создай в `.claude/hooks/` и зарегистрируй в `settings.local.json`
2. **Расширить skills** — добавь новый файл в `.claude/skills/` и используй через `/skills` команду
3. **Пересмотреть ERRORS.md** — добавляй новые записи по мере обнаружения ошибок
