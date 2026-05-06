import React, { useState } from 'react';
import { validateContent } from '../../../utils/security';

export function useCMSContent(initialContent) {
  const [localContent, setLocalContent] = useState(initialContent);

  // Deep comparison for detecting changes
  const hasChanges = React.useMemo(() => {
    return JSON.stringify(localContent) !== JSON.stringify(initialContent);
  }, [localContent, initialContent]);

  // Immutable nested path update
  const updateNested = (path, value) => {
    const keys = path.split('.');
    const updated = JSON.parse(JSON.stringify(localContent));
    let pointer = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!pointer[keys[i]]) pointer[keys[i]] = {};
      pointer = pointer[keys[i]];
    }
    pointer[keys[keys.length - 1]] = value;
    setLocalContent(updated);
  };

  // Array item reordering
  const moveItem = (arrayPath, index, direction) => {
    const keys = arrayPath.split('.');
    const updated = JSON.parse(JSON.stringify(localContent));
    let pointer = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      pointer = pointer[keys[i]];
    }
    const arr = pointer[keys[keys.length - 1]];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= arr.length) return;
    [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
    setLocalContent(updated);
  };

  // Discard all changes
  const discardChanges = () => {
    if (window.confirm('Вы уверены, что хотите сбросить все несохраненные изменения?')) {
      setLocalContent(initialContent);
      return true;
    }
    return false;
  };

  // Export as JSON file
  const exportContent = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(localContent, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `vector_content_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Import from JSON file
  const importContent = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          const validated = validateContent(json);
          if (validated) {
            setLocalContent(validated);
            alert('Контент успешно проверен и загружен! Не забудьте нажать "Сохранить", чтобы применить изменения.');
            resolve(true);
          } else {
            alert('Ошибка валидации: файл имеет неверную структуру или содержит небезопасные данные.');
            resolve(false);
          }
        } catch (err) {
          alert('Ошибка при чтении файла. Убедитесь, что это корректный JSON.');
          resolve(false);
        }
      };
      reader.readAsText(file);
    });
  };

  // Reset to initial state (from localStorage)
  const resetToDefault = () => {
    if (window.confirm('ВНИМАНИЕ: Все ваши изменения будут удалены и сайт вернется к исходному состоянию. Продолжить?')) {
      localStorage.removeItem('vector_content');
      window.location.reload();
    }
  };

  return {
    localContent,
    setLocalContent,
    hasChanges,
    updateNested,
    moveItem,
    discardChanges,
    exportContent,
    importContent,
    resetToDefault
  };
}
