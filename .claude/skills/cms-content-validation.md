# Skill: CMS Content Validation

## Назначение
Валидировать структуру контента перед сохранением в CMS. Предотвращает попадание невалидного контента в продакшн.

## Когда использовать
- При добавлении нового поля в CMS контент
- При импорте контента из внешних источников
- При миграции структуры данных
- Перед `git push` если были изменения в src/data/cms.json

## Валидация

### Обязательные поля
Каждый раздел контента должен содержать:
- `id` — уникальный идентификатор (string)
- `label` — отображаемое название (string, не пусто)
- `enabled` — статус раздела (boolean)
- `content` — основное содержимое (object или string)

### Поля по типам

#### Hero Section
```json
{
  "id": "hero",
  "label": "Hero Banner",
  "enabled": true,
  "content": {
    "title": "string (required)",
    "subtitle": "string (optional)",
    "cta_text": "string (required)",
    "cta_url": "string (required, валидный URL)"
  }
}
```

#### Geography/ServiceArea
```json
{
  "id": "geography",
  "label": "Service Area",
  "enabled": true,
  "content": {
    "title": "string",
    "style": "Radar|Mesh|Blueprint|Neon|Holo" (enum),
    "regions": "array of region objects"
  }
}
```

#### Forms/Contacts
```json
{
  "id": "contacts",
  "label": "Contact Form",
  "enabled": true,
  "content": {
    "recipients": "string (email)",
    "telegram_token": "string (optional, если TG интеграция)",
    "fields": "array of field definitions"
  }
}
```

### Checks

1. **Дублирование ID** — каждый раздел должен иметь уникальный `id`
   ```bash
   jq '[.sections[].id]' src/data/cms.json | sort | uniq -d
   ```

2. **Пустые обязательные поля**
   ```bash
   # Проверить что label не пусто
   jq '.sections[] | select(.label == "") | .id' src/data/cms.json
   ```

3. **Неправильные типы**
   ```bash
   # enabled должен быть boolean
   jq '.sections[] | select(.enabled | type != "boolean") | .id' src/data/cms.json
   ```

4. **Неправильные enum значения**
   ```bash
   # Для geography.style проверить допустимые значения
   jq '.sections[] | select(.id == "geography") | .content.style' src/data/cms.json
   ```

5. **URL валидация**
   ```bash
   # Проверить что CTA URL начинается с http или /
   jq '.sections[] | select(.content.cta_url | startswith("http") | not and startswith("/") | not) | .id' src/data/cms.json
   ```

## Автоматическая валидация

Перед `git commit` используй:
```bash
npm run validate:cms
```

Если скрипта нет, используй ручную проверку:
```bash
jq '.' src/data/cms.json > /dev/null && echo "✅ JSON валиден" || echo "❌ JSON ошибка"
```

## Common Issues

| Ошибка | Причина | Решение |
|--------|---------|---------|
| `jq: parse error` | Невалидный JSON | Проверить запятые, кавычки в cms.json |
| `"undefined" is not a string` | Пропущено обязательное поле | Добавить поле в контент |
| `enabled is not a boolean` | Значение строка вместо boolean | Изменить `"true"` на `true` |

## После валидации
1. ✅ Убедиться что все проверки прошли
2. 📝 Обновить `.claude/ERRORS.md` если нашелся новый паттерн ошибок
3. 🚀 Можно безопасно push'ить контент
