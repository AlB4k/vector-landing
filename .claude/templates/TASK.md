# Шаблон задачи для TaskCreate

## Простая задача
```
TaskCreate({
  subject: "[Модуль] Краткое описание что нужно сделать",
  description: "Подробное описание требований и контекста"
})
```

## Задача с зависимостями
```
TaskCreate({
  subject: "[Модуль] Название",
  description: "Что нужно сделать",
  metadata: {
    priority: "high",
    module: "cms" или "geography" или "forms"
  }
})

// Затем связать зависимости:
TaskUpdate({
  taskId: "1",
  addBlockedBy: ["0"] // Эта задача ждет завершения задачи 0
})
```

## Примеры из проекта
- **[CMS] Добавить новое поле в конфиг** — категория: content, priority: medium
- **[Geo] Добавить новую SVG-тему** — категория: ui, priority: low
- **[Forms] Протестировать доставку в Telegram** — категория: integration, priority: high

## После создания
1. Используй `TaskList` чтобы увидеть ID
2. При старте работы: `TaskUpdate({ taskId: "X", status: "in_progress" })`
3. При завершении: `TaskUpdate({ taskId: "X", status: "completed" })`
