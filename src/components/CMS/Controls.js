import React, { useRef } from 'react';
import { Save, Download, Upload, RefreshCcw, Moon, Sun, Eye } from 'lucide-react';

export default function Controls({
  activeTab,
  tabs,
  hasChanges,
  isLight,
  onSave,
  onExport,
  onImportFile,
  onToggleTheme,
  onReset,
  onDiscard
}) {
  const importInputRef = useRef(null);

  const handleImport = () => {
    importInputRef.current?.click();
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await onImportFile(file);
    }
  };

  const currentTabLabel = tabs.find(t => t.id === activeTab)?.label;
  const currentTabIcon = tabs.find(t => t.id === activeTab)?.icon;

  return (
    <header className="h-24 border-b border-[var(--cms-border)] px-10 flex items-center justify-between bg-[var(--cms-bg)] z-20 shrink-0">
      <div className="flex items-center gap-4">
        <div className="p-2.5 rounded-xl bg-[var(--cms-card)] text-blue-500 border border-[var(--cms-border)] shadow-xl">
          {currentTabIcon}
        </div>
        <h2 className="text-xs font-black text-[var(--cms-text)] uppercase tracking-[0.4em]">
          {currentTabLabel}
        </h2>
      </div>

      <div className="flex gap-4">
        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-3 rounded-xl bg-[var(--cms-card)] border border-[var(--cms-border)] text-[var(--cms-text-muted)] hover:text-[var(--cms-text)] transition-all"
          title={isLight ? 'Переключить на тёмный режим' : 'Переключить на светлый режим'}
        >
          {isLight ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Export */}
        <button
          onClick={onExport}
          className="p-3 rounded-xl bg-[var(--cms-card)] border border-[var(--cms-border)] text-[var(--cms-text-muted)] hover:text-[var(--cms-text)] transition-all"
          title="Экспортировать контент как JSON"
        >
          <Download size={18} />
        </button>

        {/* Import */}
        <>
          <button
            onClick={handleImport}
            className="p-3 rounded-xl bg-[var(--cms-card)] border border-[var(--cms-border)] text-[var(--cms-text-muted)] hover:text-[var(--cms-text)] transition-all"
            title="Импортировать контент из JSON"
          >
            <Upload size={18} />
          </button>
          <input
            ref={importInputRef}
            type="file"
            accept=".json"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </>

        {/* Reset */}
        <button
          onClick={onReset}
          className="p-3 rounded-xl bg-[var(--cms-card)] border border-[var(--cms-border)] text-[var(--cms-text-muted)] hover:text-[var(--cms-text)] transition-all"
          title="Сбросить на исходные настройки"
        >
          <RefreshCcw size={18} />
        </button>

        {/* Discard Changes */}
        {hasChanges && (
          <button
            onClick={onDiscard}
            className="px-6 py-3 rounded-xl bg-[var(--cms-card)] border border-orange-500/20 text-orange-500/60 hover:text-orange-400 transition-all font-black text-[10px] uppercase tracking-widest"
          >
            Отменить
          </button>
        )}

        {/* Save */}
        <button
          onClick={onSave}
          className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${
            hasChanges
              ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30'
              : 'bg-[var(--cms-card)] border border-[var(--cms-border)] text-[var(--cms-text-muted)]'
          }`}
        >
          <Save size={16} />
          {hasChanges ? 'Сохранить' : 'Сохранено'}
        </button>
      </div>
    </header>
  );
}
