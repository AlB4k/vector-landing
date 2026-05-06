import React, { useState } from 'react';
import {
  LayoutDashboard, Settings, Eye, Save, Trash2, Plus, LogOut,
  ChevronRight, Phone, Mail, MapPin, FileText, Layers, Palette,
  BarChart3, Zap, HelpCircle, ArrowUp, ArrowDown, EyeOff,
  Send, Download, Upload, RefreshCcw, Copy, Check, Shield,
  Sparkles, Moon, Sun
} from 'lucide-react';
import { useCMSContent } from './hooks/useCMSContent';
import { useTheme } from './hooks/useTheme';
import InputField from './InputField';
import Tooltip from './Tooltip';
import SectionCard from './SectionCard';
import TabContent from './TabContent';
import Controls from './Controls';
import { processImageUpload } from './imageUtils';

export default function CMS({ content, setContent, onLogout }) {
  const [activeTab, setActiveTab] = useState('structure');
  const { cmsTheme, isLight, toggleTheme, themeVars } = useTheme();
  const {
    localContent,
    hasChanges,
    updateNested,
    moveItem,
    discardChanges,
    exportContent,
    importContent,
    resetToDefault
  } = useCMSContent(content);

  const tabs = [
    { id: 'structure', label: 'Структура', icon: <Layers size={18} /> },
    { id: 'general', label: 'Основные', icon: <Settings size={18} /> },
    { id: 'theme', label: 'Оформление', icon: <Palette size={18} /> },
    { id: 'animation', label: 'Анимация', icon: <Sparkles size={18} /> },
    { id: 'ui', label: 'Интерфейс', icon: <Layers size={18} /> },
    { id: 'hero', label: 'Hero', icon: <LayoutDashboard size={18} /> },
    { id: 'features', label: 'Преимущества', icon: <FileText size={18} /> },
    { id: 'trustedClients', label: 'Клиенты', icon: <Check size={18} /> },
    { id: 'stats', label: 'Цифры', icon: <BarChart3 size={18} /> },
    { id: 'process', label: 'Процесс', icon: <Zap size={18} /> },
    { id: 'services', label: 'Услуги', icon: <Phone size={18} /> },
    { id: 'bpo', label: 'О БПО', icon: <FileText size={18} /> },
    { id: 'geography', label: 'Охват', icon: <MapPin size={18} /> },
    { id: 'news', label: 'Новости', icon: <Send size={18} /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle size={18} /> },
    { id: 'contact', label: 'Контакты', icon: <Mail size={18} /> },
    { id: 'legal', label: 'Страницы', icon: <Shield size={18} /> },
    { id: 'socials', label: 'Соцсети', icon: <Send size={18} /> },
    { id: 'modals', label: 'Модалки', icon: <Layers size={18} /> },
    { id: 'footer', label: 'Подвал', icon: <MapPin size={18} /> },
    { id: 'analytics', label: 'Интеграции', icon: <BarChart3 size={18} /> },
  ];

  const handleSave = () => {
    setContent(localContent);
  };

  const handleImportFile = async (file) => {
    await importContent(file);
  };

  return (
    <div className="h-screen bg-[var(--cms-bg)] text-[var(--cms-text)] flex font-sans overflow-hidden" style={themeVars}>
      {/* Sidebar */}
      <aside className="w-72 border-r border-[var(--cms-border)] flex flex-col bg-[var(--cms-sidebar)] backdrop-blur-2xl z-20">
        <div className="p-8 border-b border-[var(--cms-border)] flex items-center gap-4">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-2xl shadow-blue-900/40">
            <Settings size={22} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black tracking-tighter text-[var(--cms-text)] text-xl leading-none">CMS</span>
            <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest mt-1">
              v{localContent?.legal?.version || '2.0.0'}
            </span>
          </div>
        </div>

        <nav className="flex-1 p-5 space-y-1.5 overflow-y-auto custom-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 border ${
                activeTab === tab.id
                  ? 'bg-blue-600/10 border-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/5'
                  : 'border-transparent text-[var(--cms-text-muted)] hover:text-[var(--cms-text)] hover:bg-[var(--cms-card)]'
              }`}
            >
              <span className={activeTab === tab.id ? 'text-blue-400' : 'text-[var(--cms-text-muted)]'}>
                {tab.icon}
              </span>
              <span className="font-bold text-[10px] uppercase tracking-[0.2em]">{tab.label}</span>
              {activeTab === tab.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-[var(--cms-border)]">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 px-5 py-4 text-red-500/60 hover:text-red-400 hover:bg-red-500/5 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-transparent hover:border-red-500/10"
          >
            <LogOut size={16} /> Выход
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <Controls
          activeTab={activeTab}
          tabs={tabs}
          hasChanges={hasChanges}
          isLight={isLight}
          onSave={handleSave}
          onExport={exportContent}
          onImportFile={handleImportFile}
          onToggleTheme={toggleTheme}
          onReset={resetToDefault}
          onDiscard={discardChanges}
        />

        {/* Tab Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar relative">
          <TabContent
            activeTab={activeTab}
            localContent={localContent}
            updateNested={updateNested}
            moveItem={moveItem}
            processImageUpload={processImageUpload}
          />
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--cms-border); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--cms-accent); }
      `}</style>
    </div>
  );
}
