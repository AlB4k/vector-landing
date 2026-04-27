import React, { useState } from 'react';
import { validateContent } from './utils/security';
import {
  LayoutDashboard,
  Settings,
  Eye,
  Save,
  Trash2,
  Plus,
  LogOut,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  FileText,
  Layers,
  Palette,
  BarChart3,
  Zap,
  HelpCircle,
  ArrowUp,
  ArrowDown,
  EyeOff,
  Send,
  Download,
  Upload,
  RefreshCcw,
  Copy,
  Check,
  Shield
} from 'lucide-react';

const InputField = ({ label, value, onChange, type = "text" }) => (
  <div className="mb-6">
    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">{label}</label>
    <input
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-medium placeholder-slate-700 shadow-inner"
    />
  </div>
);

const SectionCard = ({ title, children, icon }) => (
  <div className="bg-slate-950/40 backdrop-blur-sm p-8 rounded-3xl border border-slate-800/50 mb-8 shadow-2xl relative overflow-hidden group">
    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600/20 group-hover:bg-blue-600 transition-colors"></div>
    <h3 className="text-[10px] font-black mb-8 text-slate-400 flex items-center gap-3 uppercase tracking-[0.3em]">
      <span className="p-2 rounded-lg bg-slate-900 text-blue-400 shadow-lg">{icon}</span>
      {title}
    </h3>
    {children}
  </div>
);

export default function CMS({ content, setContent, onLogout }) {
  const [activeTab, setActiveTab] = useState('structure');
  const [legalSubTab, setLegalSubTab] = useState('privacy');
  const [localContent, setLocalContent] = useState(content);

  // Глубокое сравнение для активации кнопки сохранения
  const hasChanges = React.useMemo(() => {
    return JSON.stringify(localContent) !== JSON.stringify(content);
  }, [localContent, content]);

  const handleSave = () => {
    setContent(localContent);
  };

  const handleDiscard = () => {
    if (window.confirm('Вы уверены, что хотите сбросить все несохраненные изменения?')) {
      setLocalContent(content);
    }
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localContent, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `vector_content_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleReset = () => {
    if (window.confirm('ВНИМАНИЕ: Все ваши изменения будут удалены и сайт вернется к исходному состоянию. Продолжить?')) {
      localStorage.removeItem('vector_content');
      window.location.reload();
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        const validated = validateContent(json);
        if (validated) {
          setLocalContent(validated);
          alert('Контент успешно проверен и загружен! Не забудьте нажать "Сохранить", чтобы применить изменения.');
        } else {
          alert('Ошибка валидации: файл имеет неверную структуру или содержит небезопасные данные.');
        }
      } catch (err) {
        alert('Ошибка при чтении файла. Убедитесь, что это корректный JSON.');
      }
    };
    reader.readAsText(file);
  };

  // Улучшенная функция обновления без мутаций
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

  const tabs = [
    { id: 'structure', label: 'Структура', icon: <Layers size={18}/> },
    { id: 'general', label: 'Основные', icon: <Settings size={18}/> },
    { id: 'theme', label: 'Оформление', icon: <Palette size={18}/> },
    { id: 'ui', label: 'Интерфейс', icon: <Layers size={18}/> },
    { id: 'hero', label: 'Hero', icon: <LayoutDashboard size={18}/> },
    { id: 'features', label: 'Преимущества', icon: <FileText size={18}/> },
    { id: 'trustedClients', label: 'Клиенты', icon: <Check size={18}/> },
    { id: 'stats', label: 'Цифры', icon: <BarChart3 size={18}/> },
    { id: 'process', label: 'Процесс', icon: <Zap size={18}/> },
    { id: 'services', label: 'Услуги', icon: <Phone size={18}/> },
    { id: 'bpo', label: 'О БПО', icon: <FileText size={18}/> },
    { id: 'geography', label: 'География', icon: <MapPin size={18}/> },
    { id: 'news', label: 'Новости', icon: <Send size={18}/> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle size={18}/> },
    { id: 'contact', label: 'Контакты', icon: <Mail size={18}/> },
    { id: 'legal', label: 'Страницы', icon: <Shield size={18}/> },
    { id: 'socials', label: 'Соцсети', icon: <Send size={18}/> },
    { id: 'modals', label: 'Модалки', icon: <Layers size={18}/> },
    { id: 'footer', label: 'Подвал', icon: <MapPin size={18}/> },
    { id: 'analytics', label: 'Интеграции', icon: <BarChart3 size={18}/> },
  ];

  return (
    <div className="min-h-screen bg-[#020204] text-slate-300 flex font-sans">
      <aside className="w-72 border-r border-slate-900 flex flex-col bg-slate-950/80 backdrop-blur-2xl z-20">
        <div className="p-8 border-b border-slate-900 flex items-center gap-4">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-2xl shadow-blue-900/40">
            <Settings size={22} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black tracking-tighter text-white text-xl leading-none">CMS</span>
            <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest mt-1">v{localContent.legal?.version || '2.0.0'}</span>
          </div>
        </div>
        <nav className="flex-1 p-5 space-y-1.5 overflow-y-auto custom-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 border ${activeTab === tab.id ? 'bg-blue-600/10 border-blue-500/20 text-blue-400 shadow-lg shadow-blue-900/5' : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'}`}
            >
              <span className={`${activeTab === tab.id ? 'text-blue-400' : 'text-slate-600'}`}>{tab.icon}</span>
              <span className="font-bold text-[10px] uppercase tracking-[0.2em]">{tab.label}</span>
              {activeTab === tab.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-slate-900">
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 px-5 py-4 text-red-500/60 hover:text-red-400 hover:bg-red-500/5 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-transparent hover:border-red-500/10">
            <LogOut size={16} /> Выход из системы
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-24 border-b border-slate-900 px-10 flex items-center justify-between bg-[#020204] z-20 shrink-0">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-slate-900 text-blue-500 border border-slate-800 shadow-xl">
              {tabs.find(t => t.id === activeTab)?.icon}
            </div>
            <h2 className="text-xs font-black text-white uppercase tracking-[0.4em]">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>
          </div>
          <div className="flex gap-4">
            <input
              type="file"
              id="import-file"
              className="hidden"
              accept=".json"
              onChange={handleImport}
            />
            <button onClick={() => document.getElementById('import-file').click()} className="flex items-center gap-3 px-5 py-3 rounded-xl border border-slate-800 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-900 hover:border-slate-700 transition-all text-slate-400 hover:text-white shadow-lg">
              <Upload size={16} /> Импорт
            </button>
            <button onClick={handleExport} className="flex items-center gap-3 px-5 py-3 rounded-xl border border-slate-800 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-900 hover:border-slate-700 transition-all text-slate-400 hover:text-white shadow-lg">
              <Download size={16} /> Экспорт
            </button>
            <button onClick={() => window.open('/', '_blank')} className="flex items-center gap-3 px-7 py-3 rounded-xl border border-slate-800 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-900 hover:border-slate-700 transition-all text-slate-400 hover:text-white shadow-lg">
              <Eye size={16} /> Просмотр
            </button>
            <button onClick={handleReset} className="flex items-center gap-3 px-5 py-3 rounded-xl border border-red-900/20 text-red-500/40 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-500/5 hover:text-red-500 transition-all">
              <RefreshCcw size={16} /> Сброс
            </button>
            {hasChanges && (
              <button onClick={handleDiscard} className="flex items-center gap-3 px-5 py-3 rounded-xl border border-red-900/30 text-red-500/70 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-500/5 transition-all">
                <Trash2 size={16} /> Сбросить
              </button>
            )}
            <button
              onClick={handleSave}
              className={`flex items-center gap-3 px-8 py-3 rounded-xl text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl transition-all ${hasChanges ? 'gradient-bg shadow-blue-900/40 hover:scale-[1.03] active:scale-95' : 'bg-slate-800 opacity-50 cursor-default'}`}
              disabled={!hasChanges}
            >
              <Save size={16} /> {hasChanges ? 'Сохранить изменения' : 'Сохранено'}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative z-10 min-h-0 bg-[#020204]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,64,175,0.08),transparent)] pointer-events-none"></div>
          <div className="max-w-4xl mx-auto pb-24 relative z-10">
            {activeTab === 'structure' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-6 mb-12">
                  <div className="bg-blue-600/5 border border-blue-500/20 p-6 rounded-3xl">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2">Build Status</p>
                    <p className="text-xl font-black text-white leading-none">STABLE</p>
                  </div>
                  <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Active Sections</p>
                    <p className="text-xl font-black text-white leading-none">{localContent.sections.filter(s => s.enabled).length} / {localContent.sections.length}</p>
                  </div>
                  <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Legal Compliance</p>
                    <p className="text-xl font-black text-green-500 leading-none">100% READY</p>
                  </div>
                </div>

                <div className="mb-8 ml-2">
                  <h4 className="text-xl font-black text-white mb-2 tracking-tight">Управление секциями</h4>
                  <p className="text-xs text-slate-500 font-medium tracking-wide">Перетаскивайте и скрывайте блоки лендинга</p>
                </div>
                {localContent.sections.map((section, idx) => (
                  <div key={section.id} className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800/60 flex items-center justify-between group transition-all hover:border-blue-500/40 hover:bg-slate-900/40 shadow-xl">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col gap-1.5">
                        <button onClick={() => moveItem('sections', idx, -1)} className="p-1 text-slate-600 hover:text-blue-400 disabled:opacity-10 transition-colors" disabled={idx === 0}><ArrowUp size={16}/></button>
                        <button onClick={() => moveItem('sections', idx, 1)} className="p-1 text-slate-600 hover:text-blue-400 disabled:opacity-10 transition-colors" disabled={idx === localContent.sections.length - 1}><ArrowDown size={16}/></button>
                      </div>
                      <div>
                        <span className="font-black text-[11px] uppercase tracking-[0.2em] text-slate-400 group-hover:text-white transition-colors">{section.label}</span>
                        <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest mt-1 opacity-60">ID: {section.id}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newSections = [...localContent.sections];
                        newSections[idx].enabled = !newSections[idx].enabled;
                        updateNested('sections', newSections);
                      }}
                      className={`p-3 rounded-xl transition-all border ${section.enabled ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-slate-900/50 border-slate-800 text-slate-700 opacity-50'}`}
                    >
                      {section.enabled ? <Eye size={20}/> : <EyeOff size={20}/>}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'general' && (
              <div className="space-y-8">
                <SectionCard title="Юридические реквизиты" icon={<Settings size={18}/>}>
                  <div className="grid grid-cols-2 gap-x-8">
                    <InputField label="Название организации" value={localContent.companyName} onChange={(val) => updateNested('companyName', val)} />
                    <InputField label="Слоган логотипа (Tagline)" value={localContent.companyTagline} onChange={(val) => updateNested('companyTagline', val)} />
                    <InputField label="ФИО Руководителя (Ген. директор)" value={localContent.ceo} onChange={(val) => updateNested('ceo', val)} />
                    <InputField label="ИНН" value={localContent.inn} onChange={(val) => updateNested('inn', val)} />
                    <InputField label="КПП" value={localContent.kpp} onChange={(val) => updateNested('kpp', val)} />
                    <InputField label="ОГРН" value={localContent.ogrn} onChange={(val) => updateNested('ogrn', val)} />
                    <InputField label="ОКВЭД" value={localContent.okved} onChange={(val) => updateNested('okved', val)} />
                  </div>
                  <InputField label="Юридический адрес" value={localContent.address} onChange={(val) => updateNested('address', val)} />
                </SectionCard>

                <SectionCard title="Банковские реквизиты" icon={<FileText size={18}/>}>
                  <div className="grid grid-cols-2 gap-x-8">
                    <InputField label="Название банка" value={localContent.bank.name} onChange={(val) => updateNested('bank.name', val)} />
                    <InputField label="БИК" value={localContent.bank.bik} onChange={(val) => updateNested('bank.bik', val)} />
                    <InputField label="Расчетный счет (р/с)" value={localContent.bank.rs} onChange={(val) => updateNested('bank.rs', val)} />
                    <InputField label="Корр. счет (к/с)" value={localContent.bank.ks} onChange={(val) => updateNested('bank.ks', val)} />
                  </div>
                </SectionCard>

                <SectionCard title="Контакты для связи" icon={<Mail size={18}/>}>
                  <div className="grid grid-cols-2 gap-x-8">
                    <InputField label="Контактный телефон" value={localContent.phone} onChange={(val) => updateNested('phone', val)} />
                    <InputField label="Рабочий Email" value={localContent.email} onChange={(val) => updateNested('email', val)} />
                  </div>
                </SectionCard>

                <SectionCard title="Регистрация в Роскомнадзоре" icon={<Shield size={18}/>}>
                  <div className="grid grid-cols-2 gap-x-8">
                    <InputField label="ПДн Регистрация №" value={localContent.pdnReg} onChange={(val) => updateNested('pdnReg', val)} />
                    <InputField label="Приказ №" value={localContent.pdnOrder} onChange={(val) => updateNested('pdnOrder', val)} />
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="space-y-8 animate-slow-fade">
                <div className="mb-8 ml-2">
                  <h4 className="text-xl font-black text-white mb-2 tracking-tight">Цветовые схемы</h4>
                  <p className="text-xs text-slate-500 font-medium tracking-wide">Настройка внешнего вида темной и светлой темы сайта</p>
                </div>

                <SectionCard title="Темная тема (Dark Mode)" icon={<Palette size={18}/>}>
                  <div className="grid grid-cols-2 gap-x-8">
                    <InputField label="Основной фон" value={localContent.theme?.dark?.primary} onChange={(val) => updateNested('theme.dark.primary', val)} />
                    <InputField label="Вторичный фон" value={localContent.theme?.dark?.secondary} onChange={(val) => updateNested('theme.dark.secondary', val)} />
                    <InputField label="Акцент (От)" value={localContent.theme?.dark?.accentFrom} onChange={(val) => updateNested('theme.dark.accentFrom', val)} />
                    <InputField label="Акцент (До)" value={localContent.theme?.dark?.accentTo} onChange={(val) => updateNested('theme.dark.accentTo', val)} />
                    <InputField label="Цвет текста" value={localContent.theme?.dark?.textMain} onChange={(val) => updateNested('theme.dark.textMain', val)} />
                    <InputField label="Приглушенный текст" value={localContent.theme?.dark?.textMuted} onChange={(val) => updateNested('theme.dark.textMuted', val)} />
                  </div>
                </SectionCard>

                <SectionCard title="Светлая тема (Light Mode)" icon={<Palette size={18}/>}>
                  <div className="grid grid-cols-2 gap-x-8">
                    <InputField label="Основной фон" value={localContent.theme?.light?.primary} onChange={(val) => updateNested('theme.light.primary', val)} />
                    <InputField label="Вторичный фон" value={localContent.theme?.light?.secondary} onChange={(val) => updateNested('theme.light.secondary', val)} />
                    <InputField label="Акцент (От)" value={localContent.theme?.light?.accentFrom} onChange={(val) => updateNested('theme.light.accentFrom', val)} />
                    <InputField label="Акцент (До)" value={localContent.theme?.light?.accentTo} onChange={(val) => updateNested('theme.light.accentTo', val)} />
                    <InputField label="Цвет текста" value={localContent.theme?.light?.textMain} onChange={(val) => updateNested('theme.light.textMain', val)} />
                    <InputField label="Приглушенный текст" value={localContent.theme?.light?.textMuted} onChange={(val) => updateNested('theme.light.textMuted', val)} />
                  </div>
                </SectionCard>

                <SectionCard title="Настройки по умолчанию" icon={<Settings size={18}/>}>
                  <div className="mb-4">
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Тема при первом посещении</label>
                    <select
                      value={localContent.defaultTheme || 'dark'}
                      onChange={(e) => updateNested('defaultTheme', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-medium"
                    >
                      <option value="dark">Темная тема</option>
                      <option value="light">Светлая тема</option>
                      <option value="system">Системная (как в ОС)</option>
                    </select>
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === 'ui' && (
              <div className="space-y-8">
                <SectionCard title="Настройки интерфейса" icon={<Layers size={18}/>}>
                  <div className="space-y-6">
                    <InputField label="Текст логотипа (основной)" value={localContent.logoText} onChange={(val) => updateNested('logoText', val)} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-900/50">
                      <div className="flex items-center gap-3 bg-slate-900/30 p-4 rounded-2xl border border-slate-800/50">
                        <input
                          type="checkbox"
                          checked={localContent.ui?.showScrollProgress}
                          onChange={(e) => updateNested('ui.showScrollProgress', e.target.checked)}
                          className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600"
                        />
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Полоса прогресса прокрутки (сверху)</label>
                      </div>
                      <div className="flex items-center gap-3 bg-slate-900/30 p-4 rounded-2xl border border-slate-800/50">
                        <input
                          type="checkbox"
                          checked={localContent.ui?.showBackToTop}
                          onChange={(e) => updateNested('ui.showBackToTop', e.target.checked)}
                          className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600"
                        />
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Кнопка «Наверх»</label>
                      </div>
                      <div className="flex items-center gap-3 bg-slate-900/30 p-4 rounded-2xl border border-slate-800/50">
                        <input
                          type="checkbox"
                          checked={localContent.ui?.showSocials}
                          onChange={(e) => updateNested('ui.showSocials', e.target.checked)}
                          className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600"
                        />
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Отображать блок «Наши соцсети»</label>
                      </div>
                    </div>
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-8">
                <SectionCard title="Главный экран (Hero)" icon={<LayoutDashboard size={18}/>}>
                  <div className="space-y-2">
                    <InputField label="Верхний бейдж" value={localContent.hero?.badge} onChange={(val) => updateNested('hero.badge', val)} />
                    <InputField label="Lucide Icon (Badge)" value={localContent.hero?.badgeIcon} onChange={(val) => updateNested('hero.badgeIcon', val)} />
                    <InputField label="Основной заголовок (строка 1)" value={localContent.hero?.title1} onChange={(val) => updateNested('hero.title1', val)} />
                    <InputField label="Градиентный акцент заголовка" value={localContent.hero?.titleGradient} onChange={(val) => updateNested('hero.titleGradient', val)} />
                    <div className="grid grid-cols-2 gap-8">
                      <InputField label="Метка горячей линии" value={localContent.hero?.hotlineLabel} onChange={(val) => updateNested('hero.hotlineLabel', val)} />
                      <InputField label="Lucide Icon (Hotline)" value={localContent.hero?.hotlineIcon} onChange={(val) => updateNested('hero.hotlineIcon', val)} />
                    </div>
                    <InputField label="Номер горячей линии" value={localContent.hero?.hotlinePhone} onChange={(val) => updateNested('hero.hotlinePhone', val)} />
                    <div className="grid grid-cols-2 gap-8">
                      <InputField label="Текст кнопки 1 (Основная)" value={localContent.hero?.btnPrimary} onChange={(val) => updateNested('hero.btnPrimary', val)} />
                      <InputField label="Текст кнопки 2 (Вторичная)" value={localContent.hero?.btnSecondary} onChange={(val) => updateNested('hero.btnSecondary', val)} />
                    </div>
                    <div className="mb-6">
                      <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Описание (Subtitle)</label>
                      <textarea
                        value={localContent.hero?.subtitle}
                        onChange={(e) => updateNested('hero.subtitle', e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-medium h-40 resize-none shadow-inner"
                      />
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Настройки горячей линии" icon={<Zap size={18}/>}>
                  <div className="flex items-center gap-3 bg-slate-900/30 p-4 rounded-2xl border border-slate-800/50 mb-6">
                    <input
                      type="checkbox"
                      checked={localContent.hotlineConfig?.showBadge}
                      onChange={(e) => updateNested('hotlineConfig.showBadge', e.target.checked)}
                      className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600"
                    />
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Показывать статус линии (Онлайн/Офлайн)</label>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-900/30 p-4 rounded-2xl border border-slate-800/50 mb-6">
                    <input
                      type="checkbox"
                      checked={localContent.hotlineConfig?.scheduleEnabled}
                      onChange={(e) => updateNested('hotlineConfig.scheduleEnabled', e.target.checked)}
                      className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600"
                    />
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Автоматический график (Прямая линия)</label>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Начало работы (час, 0-23)" type="number" value={localContent.hotlineConfig?.startHour} onChange={(val) => updateNested('hotlineConfig.startHour', parseInt(val))} />
                    <InputField label="Конец работы (час, 0-23)" type="number" value={localContent.hotlineConfig?.endHour} onChange={(val) => updateNested('hotlineConfig.endHour', parseInt(val))} />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Текст статуса (Онлайн)" value={localContent.hotlineConfig?.statusOnline} onChange={(val) => updateNested('hotlineConfig.statusOnline', val)} />
                    <InputField label="Текст статуса (Офлайн)" value={localContent.hotlineConfig?.statusOffline} onChange={(val) => updateNested('hotlineConfig.statusOffline', val)} />
                  </div>
                  <div className="mt-4">
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Рабочие дни (1=Пн, 0=Вс)</label>
                    <div className="flex gap-2">
                      {[1,2,3,4,5,6,0].map(day => (
                        <button
                          key={day}
                          onClick={() => {
                            const current = localContent.hotlineConfig?.workDays || [];
                            const next = current.includes(day) ? current.filter(d => d !== day) : [...current, day].sort();
                            updateNested('hotlineConfig.workDays', next);
                          }}
                          className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${localContent.hotlineConfig?.workDays?.includes(day) ? 'gradient-bg text-white shadow-lg' : 'bg-slate-900 text-slate-500 border border-slate-800 hover:text-slate-300'}`}
                        >
                          {['Вс','Пн','Вт','Ср','Чт','Пт','Сб'][day]}
                        </button>
                      ))}
                    </div>
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-6">
                <SectionCard title="Заголовки секции" icon={<FileText size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Заголовок" value={localContent.features?.title} onChange={(val) => updateNested('features.title', val)} />
                    <InputField label="Акцентное слово" value={localContent.features?.accent} onChange={(val) => updateNested('features.accent', val)} />
                  </div>
                  <InputField label="Подзаголовок секции" value={localContent.features?.subtitle} onChange={(val) => updateNested('features.subtitle', val)} />
                </SectionCard>
                <div className="mb-6 ml-2">
                  <h4 className="text-lg font-black text-white mb-1 tracking-tight uppercase tracking-widest text-xs">Список преимуществ</h4>
                </div>
                {(localContent.features?.items || []).map((feat, idx) => (
                  <div key={idx} className="bg-slate-950/40 p-8 rounded-3xl border border-slate-800 relative group mb-4">
                    <button onClick={() => {
                      const newItems = [...localContent.features.items];
                      newItems.splice(idx, 1);
                      updateNested('features.items', newItems);
                    }} className="absolute top-6 right-6 p-2.5 text-slate-700 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all border border-transparent hover:border-red-500/10"><Trash2 size={18}/></button>
                    <div className="grid grid-cols-2 gap-8 mr-12">
                      <InputField label="Lucide Icon Name" value={feat.icon} onChange={(val) => {
                        const newItems = localContent.features.items.map((item, i) => i === idx ? { ...item, icon: val } : item);
                        updateNested('features.items', newItems);
                      }} />
                      <InputField label="Заголовок карточки" value={feat?.title} onChange={(val) => {
                        const newItems = localContent.features.items.map((item, i) => i === idx ? { ...item, title: val } : item);
                        updateNested('features.items', newItems);
                      }} />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Описание карточки</label>
                      <textarea value={feat.desc} onChange={(e) => {
                        const newItems = localContent.features.items.map((item, i) => i === idx ? { ...item, desc: e.target.value } : item);
                        updateNested('features.items', newItems);
                      }} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm font-medium h-24 resize-none" />
                    </div>
                  </div>
                ))}
                <button onClick={() => updateNested('features.items', [...(localContent.features?.items || []), { icon: 'Check', title: 'Новое преимущество', desc: 'Описание...' }])} className="w-full py-6 rounded-3xl border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 hover:border-blue-500/40 hover:bg-blue-500/5 font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3"><Plus size={20}/> Добавить преимущество</button>
              </div>
            )}

            {activeTab === 'trustedClients' && (
              <div className="space-y-6">
                <SectionCard title="Настройки раздела" icon={<Check size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Заголовок" value={localContent.trustedClients?.title} onChange={(val) => updateNested('trustedClients.title', val)} />
                    <InputField label="Подзаголовок" value={localContent.trustedClients?.subtitle} onChange={(val) => updateNested('trustedClients.subtitle', val)} />
                  </div>
                </SectionCard>

                <div className="mb-6 ml-2 flex items-center justify-between">
                  <h4 className="text-lg font-black text-white mb-1 tracking-tight uppercase tracking-widest text-xs">Список клиентов</h4>
                  <button
                    onClick={() => {
                      const newItems = [...(localContent.trustedClients?.items || []), {
                        id: 'client-' + Date.now(),
                        name: 'Новый клиент',
                        logoUrl: '',
                        category: 'УК',
                        contractSince: new Date().getFullYear().toString(),
                        deliveryVolume: '',
                        testimonial: '',
                        testimonialAuthor: '',
                        isVisible: true
                      }];
                      updateNested('trustedClients.items', newItems);
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 font-bold text-[10px] uppercase tracking-widest hover:bg-blue-600/20 transition-all"
                  >
                    <Plus size={14}/> Добавить
                  </button>
                </div>

                {(localContent.trustedClients?.items || []).map((client, idx) => (
                  <div key={client.id || idx} className="bg-slate-950/40 p-8 rounded-3xl border border-slate-800 relative group mb-4">
                    <div className="absolute top-6 right-6 flex gap-2">
                      <button onClick={() => moveItem('trustedClients.items', idx, -1)} className="p-2 text-slate-700 hover:text-blue-500 disabled:opacity-10" disabled={idx === 0}><ArrowUp size={16}/></button>
                      <button onClick={() => moveItem('trustedClients.items', idx, 1)} className="p-2 text-slate-700 hover:text-blue-500 disabled:opacity-10" disabled={idx === (localContent.trustedClients?.items?.length || 0) - 1}><ArrowDown size={16}/></button>
                      <button
                        onClick={() => {
                          const newItems = localContent.trustedClients.items.filter((_, i) => i !== idx);
                          updateNested('trustedClients.items', newItems);
                        }}
                        className="p-2 text-slate-700 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
                      <div className="col-span-1">
                        <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Логотип</label>
                        <div className="relative group/logo w-full aspect-square bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden">
                          {client.logoUrl ? (
                            <img src={client.logoUrl} className="w-full h-full object-contain" alt="" />
                          ) : (
                            <Upload size={24} className="text-slate-700" />
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              if (file.size > 200 * 1024) alert('Внимание: файл логотипа больше 200 КБ. Рекомендуется использовать оптимизированные изображения.');
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const newItems = localContent.trustedClients.items.map((item, i) => i === idx ? { ...item, logoUrl: event.target.result } : item);
                                updateNested('trustedClients.items', newItems);
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        </div>
                      </div>

                      <div className="col-span-3 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <InputField label="Название компании" value={client.name} onChange={(val) => {
                            const newItems = localContent.trustedClients.items.map((item, i) => i === idx ? { ...item, name: val } : item);
                            updateNested('trustedClients.items', newItems);
                          }} />
                          <div className="mb-6">
                            <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Категория</label>
                            <select
                              value={client.category}
                              onChange={(e) => {
                                const newItems = localContent.trustedClients.items.map((item, i) => i === idx ? { ...item, category: e.target.value } : item);
                                updateNested('trustedClients.items', newItems);
                              }}
                              className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-medium"
                            >
                              <option value="УК">УК</option>
                              <option value="РСО">РСО</option>
                              <option value="ТКО">ТКО</option>
                              <option value="ФКР">ФКР</option>
                              <option value="Расчетный центр">Расчетный центр</option>
                              <option value="Орган власти">Орган власти</option>
                              <option value="Другое">Другое</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <InputField
                            label="Клиент с (год)"
                            type="number"
                            value={client.contractSince}
                            onChange={(val) => {
                              const year = parseInt(val);
                              if (val && (year < 2015 || year > new Date().getFullYear())) {
                                // Validation hint or handled later, but per spec 2015 - current
                              }
                              const newItems = localContent.trustedClients.items.map((item, i) => i === idx ? { ...item, contractSince: val } : item);
                              updateNested('trustedClients.items', newItems);
                            }}
                          />
                          <InputField label="Объем доставки" value={client.deliveryVolume} onChange={(val) => {
                            const newItems = localContent.trustedClients.items.map((item, i) => i === idx ? { ...item, deliveryVolume: val } : item);
                            updateNested('trustedClients.items', newItems);
                          }} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 border-t border-slate-900/50 pt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 bg-slate-900/30 p-4 rounded-2xl border border-slate-800/50">
                          <input
                            type="checkbox"
                            checked={client.isVisible !== false}
                            onChange={(e) => {
                              const newItems = localContent.trustedClients.items.map((item, i) => i === idx ? { ...item, isVisible: e.target.checked } : item);
                              updateNested('trustedClients.items', newItems);
                            }}
                            className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600"
                          />
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Показывать на сайте</label>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Цитата клиента</label>
                        <textarea
                          value={client.testimonial}
                          onChange={(e) => {
                            const newItems = localContent.trustedClients.items.map((item, i) => i === idx ? { ...item, testimonial: e.target.value } : item);
                            updateNested('trustedClients.items', newItems);
                          }}
                          className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-white text-sm font-medium h-24 resize-none"
                        />
                      </div>
                      {client.testimonial && (
                        <InputField label="Автор цитаты" value={client.testimonialAuthor} onChange={(val) => {
                          const newItems = localContent.trustedClients.items.map((item, i) => i === idx ? { ...item, testimonialAuthor: val } : item);
                          updateNested('trustedClients.items', newItems);
                        }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="grid grid-cols-2 gap-6">
                {(localContent.stats || []).map((stat, idx) => (
                  <div key={idx} className="bg-slate-950/40 p-8 rounded-3xl border border-slate-800 relative group">
                    <button onClick={() => {
                      const newS = [...localContent.stats];
                      newS.splice(idx, 1);
                      updateNested('stats', newS);
                    }} className="absolute top-4 right-4 p-2 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                    <div className="grid grid-cols-3 gap-4">
                      <InputField label="Префикс" value={stat.prefix} onChange={(val) => {
                        const newS = [...localContent.stats];
                        newS[idx].prefix = val;
                        updateNested('stats', newS);
                      }} />
                      <InputField label="Число" value={stat.val} onChange={(val) => {
                      const newS = localContent.stats.map((s, i) => i === idx ? { ...s, val } : s);
                      updateNested('stats', newS);
                    }} />
                    <InputField label="Суффикс" value={stat.suffix} onChange={(val) => {
                      const newS = localContent.stats.map((s, i) => i === idx ? { ...s, suffix: val } : s);
                      updateNested('stats', newS);
                    }} />
                  </div>
                  <InputField label="Подпись показателя" value={stat.label} onChange={(val) => {
                    const newS = localContent.stats.map((s, i) => i === idx ? { ...s, label: val } : s);
                    updateNested('stats', newS);
                  }} />
                  </div>
                ))}
                <button onClick={() => updateNested('stats', [...(localContent.stats || []), { val: 0, prefix: '', suffix: '', label: 'Новый показатель' }])} className="col-span-2 py-6 rounded-3xl border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 hover:border-blue-500/40 hover:bg-blue-500/5 font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3"><Plus size={20}/></button>
              </div>
            )}

            {activeTab === 'process' && (
              <div className="space-y-6">
                <SectionCard title="Заголовки секции" icon={<Zap size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Заголовок" value={localContent.process?.title} onChange={(val) => updateNested('process.title', val)} />
                    <InputField label="Акцентное слово" value={localContent.process?.accent} onChange={(val) => updateNested('process.accent', val)} />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Подзаголовок" value={localContent.process?.subtitle} onChange={(val) => updateNested('process.subtitle', val)} />
                    <InputField label="Префикс шага (Шаг, Step)" value={localContent.process?.stepLabel} onChange={(val) => updateNested('process.stepLabel', val)} />
                  </div>
                </SectionCard>
                {(localContent.process?.steps || []).map((step, idx) => (
                  <div key={idx} className="bg-slate-950/40 p-8 rounded-3xl border border-slate-800 relative group mb-4">
                    <button onClick={() => {
                      const newS = [...localContent.process.steps];
                      newS.splice(idx, 1);
                      updateNested('process.steps', newS);
                    }} className="absolute top-6 right-6 p-2 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                    <div className="grid grid-cols-2 gap-8">
                      <InputField label="Номер / Код шага" value={step.step} onChange={(val) => {
                        const newS = localContent.process.steps.map((s, i) => i === idx ? { ...s, step: val } : s);
                        updateNested('process.steps', newS);
                      }} />
                      <InputField label="Заголовок шага" value={step?.title} onChange={(val) => {
                        const newS = localContent.process.steps.map((s, i) => i === idx ? { ...s, title: val } : s);
                        updateNested('process.steps', newS);
                      }} />
                    </div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Описание действия</label>
                    <textarea value={step.desc} onChange={(e) => {
                      const newS = localContent.process.steps.map((s, i) => i === idx ? { ...s, desc: e.target.value } : s);
                      updateNested('process.steps', newS);
                    }} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-white text-sm font-medium h-24 resize-none" />
                  </div>
                ))}
                <button onClick={() => updateNested('process.steps', [...localContent.process.steps, { step: '04', title: 'Новый этап', desc: 'Описание...' }])} className="w-full py-6 border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 hover:border-blue-500/40 font-black text-[10px] uppercase tracking-[0.3em] transition-all rounded-3xl flex items-center justify-center gap-3"><Plus size={20}/> Добавить этап</button>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                <SectionCard title="Заголовки секции" icon={<Phone size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Заголовок" value={localContent.services?.title} onChange={(val) => updateNested('services.title', val)} />
                    <InputField label="Акцентное слово" value={localContent.services?.accent} onChange={(val) => updateNested('services.accent', val)} />
                  </div>
                  <InputField label="Подзаголовок" value={localContent.services?.subtitle} onChange={(val) => updateNested('services.subtitle', val)} />
                  <InputField label="Текст кнопки (по умолчанию)" value={localContent.services?.btnLabel} onChange={(val) => updateNested('services.btnLabel', val)} />
                </SectionCard>
                {(localContent.services?.list || []).map((srv, idx) => (
                  <div key={idx} className="bg-slate-950/40 p-8 rounded-3xl border border-slate-800 space-y-6 relative mb-6">
                    <button onClick={() => {
                      const newL = [...localContent.services.list];
                      newL.splice(idx, 1);
                      updateNested('services.list', newL);
                    }} className="absolute top-6 right-6 p-2 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                    <div className="grid grid-cols-2 gap-8">
                      <InputField label="Название услуги / Тарифа" value={srv?.title} onChange={(val) => {
                        const newL = localContent.services.list.map((s, i) => i === idx ? { ...s, title: val } : s);
                        updateNested('services.list', newL);
                      }} />
                      <InputField label="Бейдж карточки" value={srv.badge} onChange={(val) => {
                        const newL = localContent.services.list.map((s, i) => i === idx ? { ...s, badge: val } : s);
                        updateNested('services.list', newL);
                      }} />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Статус / Тип шилдика</label>
                        <select
                          value={srv.status || (srv.popular ? 'recommended' : 'none')}
                          onChange={(e) => {
                            const newL = localContent.services.list.map((s, i) => {
                              if (i === idx) {
                                return {
                                  ...s,
                                  status: e.target.value,
                                  popular: e.target.value === 'recommended'
                                };
                              }
                              return s;
                            });
                            updateNested('services.list', newL);
                          }}
                          className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-medium"
                        >
                          <option value="none">Без шилдика</option>
                          <option value="recommended">Рекомендуем / Акцент</option>
                          <option value="development">В разработке</option>
                          <option value="default">Обычный шилдик</option>
                        </select>
                      </div>
                      {(srv.status === 'recommended' || srv.popular) && (
                        <InputField label="Текст акцентного шилдика" value={srv.accentBadge} onChange={(val) => {
                          const newL = localContent.services.list.map((s, i) => i === idx ? { ...s, accentBadge: val } : s);
                          updateNested('services.list', newL);
                        }} />
                      )}
                    </div>

                    <InputField label="Текст на кнопке" value={srv.button} onChange={(val) => {
                        const newL = localContent.services.list.map((s, i) => i === idx ? { ...s, button: val } : s);
                        updateNested('services.list', newL);
                    }} />
                    <div className="space-y-3">
                      <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Список особенностей / функций</label>
                      {(srv.features || []).map((f, fIdx) => (
                        <div key={fIdx} className="flex gap-3">
                          <input
                            value={f}
                            onChange={(e) => {
                              const newL = localContent.services.list.map((s, i) => {
                                if (i === idx) {
                                  const newFeats = [...s.features];
                                  newFeats[fIdx] = e.target.value;
                                  return { ...s, features: newFeats };
                                }
                                return s;
                              });
                              updateNested('services.list', newL);
                            }}
                            className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs font-medium focus:ring-1 focus:ring-blue-500/30 outline-none"
                          />
                          <button onClick={() => {
                            const newL = localContent.services.list.map((s, i) => {
                              if (i === idx) {
                                const newFeats = s.features.filter((_, fi) => fi !== fIdx);
                                return { ...s, features: newFeats };
                              }
                              return s;
                            });
                            updateNested('services.list', newL);
                          }} className="text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                        </div>
                      ))}
                      <button onClick={() => {
                        const newL = localContent.services.list.map((s, i) => {
                          if (i === idx) {
                            return { ...s, features: [...(s.features || []), ''] };
                          }
                          return s;
                        });
                        updateNested('services.list', newL);
                      }} className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] hover:text-blue-400 transition-colors pt-2 flex items-center gap-2">
                        <Plus size={14} /> Добавить пункт списка
                      </button>
                    </div>
                  </div>
                ))}
                <button onClick={() => updateNested('services.list', [...(localContent.services?.list || []), { title: 'Новая услуга', badge: 'Тариф', features: [], button: 'Заказать', popular: false }])} className="w-full py-6 border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 hover:border-blue-500/40 font-black text-[10px] uppercase tracking-[0.3em] transition-all rounded-3xl flex items-center justify-center gap-3"><Plus size={20}/> Добавить услугу</button>
              </div>
            )}

            {activeTab === 'geography' && (
              <div className="space-y-6">
                <SectionCard title="Зона покрытия и география" icon={<MapPin size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Основной заголовок" value={localContent.serviceArea?.title} onChange={(val) => updateNested('serviceArea.title', val)} />
                    <InputField label="Акцент заголовка" value={localContent.serviceArea?.accent} onChange={(val) => updateNested('serviceArea.accent', val)} />
                  </div>
                  <InputField label="Подзаголовок" value={localContent.serviceArea?.subtitle} onChange={(val) => updateNested('serviceArea.subtitle', val)} />
                  <InputField label="Заметка о собственной сети" value={localContent.serviceArea?.ownNetworkNote} onChange={(val) => updateNested('serviceArea.ownNetworkNote', val)} />

                  <div className="flex items-center gap-3 bg-slate-900/30 p-4 rounded-2xl border border-slate-800/50 mb-6">
                    <input
                      type="checkbox"
                      checked={localContent.serviceArea?.randomMapVariant}
                      onChange={(e) => updateNested('serviceArea.randomMapVariant', e.target.checked)}
                      className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500/20"
                    />
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Случайный стиль при загрузке страницы</label>
                  </div>

                  {!localContent.serviceArea?.randomMapVariant && (
                    <div className="mb-4 animate-slow-fade">
                      <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Вариант карты (Визуализация)</label>
                      <select
                        value={localContent.serviceArea?.mapVariant || 'default'}
                        onChange={(e) => updateNested('serviceArea.mapVariant', e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-medium"
                      >
                        <option value="default">Default (Abstract)</option>
                        <option value="radar">Radar Scan (Dark)</option>
                        <option value="radar-light">Radar Scan (Light)</option>
                        <option value="mesh">Mesh Grid (Dark)</option>
                        <option value="mesh-light">Mesh Grid (Light)</option>
                        <option value="blueprint">Blueprint Design (Dark)</option>
                        <option value="blueprint-light">Blueprint Design (Light)</option>
                        <option value="isometric">Isometric Nodes (Dark)</option>
                        <option value="isometric-light">Isometric Nodes (Light)</option>
                        <option value="topology">Topology Curves (Dark)</option>
                        <option value="topology-light">Topology Curves (Light)</option>
                        <option value="pulse">Network Pulse (Dark)</option>
                        <option value="pulse-light">Network Pulse (Light)</option>
                        <option value="digital">Digital Data (Dark)</option>
                        <option value="digital-light">Digital Data (Light)</option>
                      </select>
                    </div>
                  )}
                </SectionCard>

                <div className="mb-6 ml-2">
                  <h4 className="text-lg font-black text-white mb-1 tracking-tight uppercase tracking-widest text-xs">Список населенных пунктов</h4>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {(localContent.serviceArea?.locations || []).map((loc, idx) => (
                    <div key={idx} className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800 relative group">
                      <button onClick={() => {
                        const newL = localContent.serviceArea.locations.filter((_, i) => i !== idx);
                        updateNested('serviceArea.locations', newL);
                      }} className="absolute top-4 right-4 p-2 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                      <InputField label="Название города/района" value={loc.name} onChange={(val) => {
                        const newL = localContent.serviceArea.locations.map((l, i) => i === idx ? { ...l, name: val } : l);
                        updateNested('serviceArea.locations', newL);
                      }} />
                      <div className="grid grid-cols-2 gap-4">
                        <InputField label="Статус (напр. 24ч)" value={loc.status} onChange={(val) => {
                          const newL = localContent.serviceArea.locations.map((l, i) => i === idx ? { ...l, status: val } : l);
                          updateNested('serviceArea.locations', newL);
                        }} />
                        <InputField label="Частота (напр. Ежедневно)" value={loc.freq} onChange={(val) => {
                          const newL = localContent.serviceArea.locations.map((l, i) => i === idx ? { ...l, freq: val } : l);
                          updateNested('serviceArea.locations', newL);
                        }} />
                      </div>
                      <InputField label="Тип покрытия (напр. Областной центр)" value={loc.type} onChange={(val) => {
                        const newL = localContent.serviceArea.locations.map((l, i) => i === idx ? { ...l, type: val } : l);
                        updateNested('serviceArea.locations', newL);
                      }} />
                    </div>
                  ))}
                  <button onClick={() => updateNested('serviceArea.locations', [...(localContent.serviceArea?.locations || []), { name: 'Новый город', type: 'По графику', status: '24ч', freq: 'Ежедневно' }])} className="col-span-2 py-6 rounded-3xl border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 hover:border-blue-500/40 hover:bg-blue-500/5 font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3"><Plus size={20}/> Добавить локацию</button>
                </div>
              </div>
            )}

            {activeTab === 'bpo' && (
              <div className="space-y-6">
                <SectionCard title="Бесконвертное Почтовое Отправление (БПО)" icon={<FileText size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Заголовок" value={localContent.bpo?.title} onChange={(val) => updateNested('bpo.title', val)} />
                    <InputField label="Акцентное слово" value={localContent.bpo?.accent} onChange={(val) => updateNested('bpo.accent', val)} />
                  </div>
                  <InputField label="Подзаголовок" value={localContent.bpo?.subtitle} onChange={(val) => updateNested('bpo.subtitle', val)} />
                  <InputField label="Юридическая сноска" value={localContent.bpo?.legalNote} onChange={(val) => updateNested('bpo.legalNote', val)} />
                </SectionCard>

                <div className="mb-6 ml-2">
                  <h4 className="text-lg font-black text-white mb-1 tracking-tight uppercase tracking-widest text-xs">Технологические этапы</h4>
                </div>
                {(localContent.bpo?.steps || []).map((step, idx) => (
                  <div key={idx} className="bg-slate-950/40 p-8 rounded-3xl border border-slate-800 relative group mb-4">
                    <button onClick={() => {
                      const newS = [...(localContent.bpo?.steps || [])];
                      newS.splice(idx, 1);
                      updateNested('bpo.steps', newS);
                    }} className="absolute top-6 right-6 p-2 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                    <div className="grid grid-cols-4 gap-8">
                      <div className="col-span-1">
                        <InputField label="№" value={step.num} onChange={(val) => {
                          const newS = localContent.bpo.steps.map((s, i) => i === idx ? { ...s, num: val } : s);
                          updateNested('bpo.steps', newS);
                        }} />
                      </div>
                      <div className="col-span-3">
                        <InputField label="Название этапа" value={step?.title} onChange={(val) => {
                          const newS = localContent.bpo.steps.map((s, i) => i === idx ? { ...s, title: val } : s);
                          updateNested('bpo.steps', newS);
                        }} />
                      </div>
                    </div>
                    <InputField label="Описание этапа" value={step.desc} onChange={(val) => {
                      const newS = localContent.bpo.steps.map((s, i) => i === idx ? { ...s, desc: val } : s);
                      updateNested('bpo.steps', newS);
                    }} />
                  </div>
                ))}
                <button onClick={() => updateNested('bpo.steps', [...(localContent.bpo?.steps || []), { num: '0' + ((localContent.bpo?.steps?.length || 0) + 1), title: 'Новый этап', desc: 'Описание этапа БПО...' }])} className="w-full py-6 rounded-3xl border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 transition-all flex items-center justify-center gap-3 mb-8"><Plus size={20}/> Добавить этап БПО</button>

                <SectionCard title="Преимущества БПО" icon={<Check size={18}/>}>
                  {(localContent.bpo?.advantages || []).map((adv, idx) => (
                    <div key={idx} className="flex gap-3 mb-3">
                      <input
                        value={adv}
                        onChange={(e) => {
                          const newA = localContent.bpo.advantages.map((a, i) => i === idx ? e.target.value : a);
                          updateNested('bpo.advantages', newA);
                        }}
                        className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs font-medium focus:ring-1 focus:ring-blue-500/30 outline-none"
                      />
                      <button onClick={() => {
                        const newA = localContent.bpo.advantages.filter((_, i) => i !== idx);
                        updateNested('bpo.advantages', newA);
                      }} className="text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                    </div>
                  ))}
                  <button onClick={() => updateNested('bpo.advantages', [...(localContent.bpo?.advantages || []), 'Новое преимущество БПО']) } className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] hover:text-blue-400 transition-colors pt-2 flex items-center gap-2"><Plus size={14} /> Добавить преимущество</button>
                </SectionCard>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="space-y-6">
                <SectionCard title="Новости и события" icon={<Send size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Заголовок" value={localContent.news?.title} onChange={(val) => updateNested('news.title', val)} />
                    <InputField label="Акцентное слово" value={localContent.news?.accent} onChange={(val) => updateNested('news.accent', val)} />
                  </div>
                </SectionCard>

                {(localContent.news?.items || []).map((item, idx) => (
                  <div key={idx} className="bg-slate-950/40 p-8 rounded-3xl border border-slate-800 relative group mb-4">
                    <button onClick={() => {
                      const newI = [...(localContent.news?.items || [])];
                      newI.splice(idx, 1);
                      updateNested('news.items', newI);
                    }} className="absolute top-6 right-6 p-2 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                    <div className="grid grid-cols-2 gap-8">
                      <InputField label="Дата" value={item.date} onChange={(val) => {
                        const newI = localContent.news.items.map((it, i) => i === idx ? { ...it, date: val } : it);
                        updateNested('news.items', newI);
                      }} />
                      <InputField label="Тег / Категория" value={item.tag} onChange={(val) => {
                        const newI = localContent.news.items.map((it, i) => i === idx ? { ...it, tag: val } : it);
                        updateNested('news.items', newI);
                      }} />
                    </div>
                    <InputField label="Заголовок новости" value={item?.title} onChange={(val) => {
                      const newI = localContent.news.items.map((it, i) => i === idx ? { ...it, title: val } : it);
                      updateNested('news.items', newI);
                    }} />
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Содержание</label>
                    <textarea value={item.desc} onChange={(e) => {
                      const newI = localContent.news.items.map((it, i) => i === idx ? { ...it, desc: e.target.value } : it);
                      updateNested('news.items', newI);
                    }} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-white text-sm font-medium h-24 resize-none" />
                  </div>
                ))}
                <button onClick={() => updateNested('news.items', [{ date: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' }), tag: 'СОБЫТИЕ', title: 'Новое событие', desc: 'Описание события...' }, ...(localContent.news?.items || [])])} className="w-full py-6 rounded-3xl border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 transition-all flex items-center justify-center gap-3"><Plus size={20}/> Добавить новость</button>
              </div>
            )}

            {activeTab === 'contact' && (
              <SectionCard title="Секция контактов и форма" icon={<Mail size={18}/>}>
                <div className="grid grid-cols-2 gap-8">
                  <InputField label="Основной заголовок" value={localContent.contact?.title} onChange={(val) => updateNested('contact.title', val)} />
                  <InputField label="Акцент заголовка" value={localContent.contact?.accent} onChange={(val) => updateNested('contact.accent', val)} />
                </div>
                <InputField label="Подзаголовок описания" value={localContent.contact?.subtitle} onChange={(val) => updateNested('contact.subtitle', val)} />
                <div className="mb-8 p-6 bg-slate-900/30 rounded-2xl border border-slate-800/50">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Названия полей формы (Placeholders)</h4>
                  <div className="grid grid-cols-2 gap-x-8">
                    <InputField label="Поле: Ваше имя" value={localContent.contact?.formName} onChange={(val) => updateNested('contact.formName', val)} />
                    <InputField label="Поле: Телефон" value={localContent.contact?.formPhone} onChange={(val) => updateNested('contact.formPhone', val)} />
                    <InputField label="Поле: Email" value={localContent.contact?.formEmail} onChange={(val) => updateNested('contact.formEmail', val)} />
                    <InputField label="Поле: Сообщение" value={localContent.contact?.formMessage} onChange={(val) => updateNested('contact.formMessage', val)} />
                  </div>
                  <InputField label="Текст на кнопке отправки" value={localContent.contact?.formButton} onChange={(val) => updateNested('contact.formButton', val)} />
                </div>
              </SectionCard>
            )}

            {activeTab === 'socials' && (
              <div className="space-y-6">
                <SectionCard title="Список социальных сетей" icon={<Send size={18}/>}>
                  <p className="text-[10px] text-slate-500 font-medium mb-6 leading-relaxed">
                    Этот список используется в подвале сайта и в блоке контактов. Вы можете добавлять новые сети, менять их иконки (Lucide) и порядок.
                  </p>
                  <div className="space-y-4">
                    {(localContent.socialsList || []).map((social, idx) => (
                      <div key={idx} className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800 relative group">
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button onClick={() => moveItem('socialsList', idx, -1)} className="p-2 text-slate-700 hover:text-blue-500 disabled:opacity-10" disabled={idx === 0}><ArrowUp size={16}/></button>
                          <button onClick={() => moveItem('socialsList', idx, 1)} className="p-2 text-slate-700 hover:text-blue-500 disabled:opacity-10" disabled={idx === (localContent.socialsList?.length || 0) - 1}><ArrowDown size={16}/></button>
                          <button onClick={() => {
                            const newS = [...(localContent.socialsList || [])];
                            newS.splice(idx, 1);
                            updateNested('socialsList', newS);
                          }} className="p-2 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                        </div>
                        <div className="grid grid-cols-2 gap-6 mr-24">
                          <InputField label="Название (Label)" value={social.label} onChange={(val) => {
                            const newS = localContent.socialsList.map((s, i) => i === idx ? { ...s, label: val } : s);
                            updateNested('socialsList', newS);
                          }} />
                          <InputField label="Иконка Lucide" value={social.icon} onChange={(val) => {
                            const newS = localContent.socialsList.map((s, i) => i === idx ? { ...s, icon: val } : s);
                            updateNested('socialsList', newS);
                          }} />
                        </div>
                        <InputField label="Ссылка (URL)" value={social.url} onChange={(val) => {
                          const newS = localContent.socialsList.map((s, i) => i === idx ? { ...s, url: val } : s);
                          updateNested('socialsList', newS);
                        }} />
                      </div>
                    ))}
                    <button onClick={() => updateNested('socialsList', [...(localContent.socialsList || []), { label: 'New', icon: 'Send', url: 'https://' }])} className="w-full py-6 rounded-3xl border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 transition-all flex items-center justify-center gap-3"><Plus size={20}/> Добавить соцсеть</button>
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === 'legal' && (
              <div className="space-y-8">
                <div className="flex gap-4 mb-8">
                  {['privacy', 'requisites', 'oferta'].map(sub => (
                    <button
                      key={sub}
                      onClick={() => setLegalSubTab(sub)}
                      className={`px-6 py-3 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all border ${ legalSubTab === sub ? 'gradient-bg text-white shadow-lg' : 'bg-slate-900 text-slate-500 border-slate-800' }`}
                    >
                      {sub === 'privacy' ? 'Политика' : sub === 'requisites' ? 'Реквизиты' : 'Оферта'}
                    </button>
                  ))}
                </div>

                {legalSubTab === 'privacy' && (
                  <div className="space-y-6 animate-slow-fade">
                    <SectionCard title="Настройки политики конфиденциальности" icon={<Shield size={18}/>}>
                      <InputField label="Заголовок страницы" value={localContent.pages?.privacy?.title} onChange={(val) => updateNested('pages.privacy.title', val)} />
                    </SectionCard>

                    <div className="mb-6 ml-2">
                      <h4 className="text-lg font-black text-white mb-1 tracking-tight uppercase tracking-widest text-xs">Разделы политики</h4>
                    </div>

                    {(localContent.pages?.privacy?.sections || []).map((sec, idx) => (
                      <div key={idx} className="bg-slate-950/40 p-8 rounded-3xl border border-slate-800 relative group mb-6">
                        <div className="absolute top-6 right-6 flex gap-2">
                          <button onClick={() => moveItem('pages.privacy.sections', idx, -1)} className="p-2 text-slate-700 hover:text-blue-500 disabled:opacity-10" disabled={idx === 0}><ArrowUp size={16}/></button>
                          <button onClick={() => moveItem('pages.privacy.sections', idx, 1)} className="p-2 text-slate-700 hover:text-blue-500 disabled:opacity-10" disabled={idx === (localContent.pages?.privacy?.sections?.length || 0) - 1}><ArrowDown size={16}/></button>
                          <button onClick={() => {
                            const newS = localContent.pages.privacy.sections.filter((_, i) => i !== idx);
                            updateNested('pages.privacy.sections', newS);
                          }} className="p-2 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                        </div>
                        <div className="grid grid-cols-2 gap-8 mr-24">
                          <InputField label="ID раздела (anchor)" value={sec.id} onChange={(val) => {
                            const newS = localContent.pages.privacy.sections.map((s, i) => i === idx ? { ...s, id: val } : s);
                            updateNested('pages.privacy.sections', newS);
                          }} />
                          <InputField label="Заголовок раздела" value={sec?.title} onChange={(val) => {
                            const newS = localContent.pages.privacy.sections.map((s, i) => i === idx ? { ...s, title: val } : s);
                            updateNested('pages.privacy.sections', newS);
                          }} />
                        </div>
                        <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Содержимое (HTML поддерживается)</label>
                        <textarea value={sec.content} onChange={(e) => {
                          const newS = localContent.pages.privacy.sections.map((s, i) => i === idx ? { ...s, content: e.target.value } : s);
                          updateNested('pages.privacy.sections', newS);
                        }} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-white text-sm font-medium h-48 resize-none" />
                        <p className="text-[9px] text-slate-600 mt-2 italic">Переменные: {'{content.companyName}'}, {'{content.address}'}, {'{content.email}'}, {'{content.inn}'}, {'{content.ogrn}'}</p>
                      </div>
                    ))}
                    <button onClick={() => updateNested('pages.privacy.sections', [...(localContent.pages?.privacy?.sections || []), { id: 'new', title: 'Новый раздел', content: 'Текст раздела...' }])} className="w-full py-6 rounded-3xl border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 transition-all flex items-center justify-center gap-3"><Plus size={20}/> Добавить раздел политики</button>
                  </div>
                )}

                {legalSubTab === 'requisites' && (
                  <div className="space-y-6 animate-slow-fade">
                    <SectionCard title="Настройки карточки организации" icon={<FileText size={18}/>}>
                      <InputField label="Заголовок страницы" value={localContent.pages?.requisites?.title} onChange={(val) => updateNested('pages.requisites.title', val)} />
                      <InputField label="Подзаголовок (Subtitle)" value={localContent.pages?.requisites?.subtitle} onChange={(val) => updateNested('pages.requisites.subtitle', val)} />
                      <InputField label="Полное наименование" value={localContent.pages?.requisites?.fullCompanyName} onChange={(val) => updateNested('pages.requisites.fullCompanyName', val)} />
                      <InputField label="Примечание (внизу)" value={localContent.pages?.requisites?.note} onChange={(val) => updateNested('pages.requisites.note', val)} />
                    </SectionCard>
                  </div>
                )}

                {legalSubTab === 'oferta' && (
                  <div className="space-y-6 animate-slow-fade">
                    <SectionCard title="Настройки оферты" icon={<FileText size={18}/>}>
                      <InputField label="Заголовок страницы" value={localContent.pages?.oferta?.title} onChange={(val) => updateNested('pages.oferta.title', val)} />
                      <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Текст оферты (HTML/Переносы строк)</label>
                      <textarea value={localContent.pages?.oferta?.content} onChange={(e) => updateNested('pages.oferta.content', e.target.value)} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-white text-sm font-medium h-96 resize-none" />
                    </SectionCard>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'modals' && (
              <div className="space-y-8">
                <SectionCard title="Модальное окно: Успех" icon={<Check size={18}/>}>
                  <InputField label="Главный заголовок" value={localContent.modals?.success?.title} onChange={(val) => updateNested('modals.success.title', val)} />
                  <InputField label="Подзаголовок / Текст" value={localContent.modals?.success?.subtitle} onChange={(val) => updateNested('modals.success.subtitle', val)} />
                  <InputField label="Текст кнопки закрытия" value={localContent.modals?.success?.button} onChange={(val) => updateNested('modals.success.button', val)} />
                </SectionCard>
                <SectionCard title="Юридическая информация" icon={<FileText size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Метка статуса (напр. Свидетельство)" value={localContent.legal?.statusLabel} onChange={(val) => updateNested('legal.statusLabel', val)} />
                    <InputField label="Значение статуса" value={localContent.legal?.statusValue} onChange={(val) => updateNested('legal.statusValue', val)} />
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === 'footer' && (
              <div className="space-y-8">
                <SectionCard title="Настройки подвала (Footer)" icon={<MapPin size={18}/>}>
                  <InputField label="Краткое описание под логотипом" value={localContent.footer?.description} onChange={(val) => updateNested('footer.description', val)} />
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Текст ссылки оферты" value={localContent.footer?.offerLabel} onChange={(val) => updateNested('footer.offerLabel', val)} />
                    <InputField label="URL документа оферты" value={localContent.footer?.offerLink} onChange={(val) => updateNested('footer.offerLink', val)} />
                  </div>
                </SectionCard>

                <SectionCard title="Заголовки колонок" icon={<Layers size={18}/>}>
                  <div className="grid grid-cols-3 gap-8">
                    <InputField label="Колонка 1 (Навигация)" value={localContent.footer?.headers?.nav} onChange={(val) => updateNested('footer.headers.nav', val)} />
                    <InputField label="Колонка 2 (Правовая)" value={localContent.footer?.headers?.legal} onChange={(val) => updateNested('footer.headers.legal', val)} />
                    <InputField label="Колонка 3 (Контакты)" value={localContent.footer?.headers?.contacts} onChange={(val) => updateNested('footer.headers.contacts', val)} />
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <SectionCard title="Системные настройки" icon={<Settings size={18}/>}>
                  <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <InputField
                          label="Версия системы"
                          value={localContent.legal?.version}
                          onChange={(val) => updateNested('legal.version', val)}
                        />
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed -mt-2 ml-1">
                          Отображается в подвале сайта и панели управления.
                        </p>
                      </div>
                      <div>
                        <InputField
                          label="Задержка экрана загрузки (мс)"
                          type="number"
                          value={localContent.loaderDelay}
                          onChange={(val) => updateNested('loaderDelay', parseInt(val) || 0)}
                        />
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed -mt-2 ml-1">
                          Время отображения заставки (1000 мс = 1 сек).
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4 border-t border-slate-900/50">
                      <div className="space-y-6">
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-4">Масштаб логотипа (Шапка)</label>
                        <div className="flex items-center gap-6">
                          <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.1"
                            value={localContent.logoScaleHeader || 1.4}
                            onChange={(e) => updateNested('logoScaleHeader', parseFloat(e.target.value))}
                            className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                          <span className="text-xs font-mono font-bold text-white bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">{localContent.logoScaleHeader}x</span>
                        </div>
                        <div className="p-8 bg-slate-950/50 rounded-2xl border border-slate-900 flex items-center justify-center min-h-[160px] overflow-hidden">
                          <div className="flex items-center gap-6 scale-[0.6] origin-center translate-x-4">
                            <div className="relative w-20 h-20 flex items-center justify-center overflow-hidden rounded-xl bg-slate-950 border border-white/5">
                              <img src="/logo_site.png" style={{ transform: `scale(${localContent.logoScaleHeader})` }} className="w-full h-full object-contain" alt="" />
                            </div>
                            <div className="flex flex-col text-left">
                              <span className="text-3xl font-black text-white whitespace-nowrap leading-none">{localContent.logoText || 'ВЕКТОР'}</span>
                              <span className="text-[10px] font-bold tracking-[0.35em] text-blue-400 uppercase mt-1">{localContent.companyTagline}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-4">Масштаб логотипа (Подвал)</label>
                        <div className="flex items-center gap-6">
                          <input
                            type="range"
                            min="0.5"
                            max="3"
                            step="0.1"
                            value={localContent.logoScaleFooter || 1.2}
                            onChange={(e) => updateNested('logoScaleFooter', parseFloat(e.target.value))}
                            className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                          />
                          <span className="text-xs font-mono font-bold text-white bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">{localContent.logoScaleFooter}x</span>
                        </div>
                        <div className="p-8 bg-slate-950/50 rounded-2xl border border-slate-900 flex items-center justify-center min-h-[160px] overflow-hidden">
                          <div className="flex items-center gap-3.5 scale-[0.8] origin-center translate-x-2">
                            <div className="relative w-14 h-14 flex items-center justify-center overflow-hidden rounded-xl bg-slate-950 border border-white/5">
                              <img src="/logo_site.png" style={{ transform: `scale(${localContent.logoScaleFooter})` }} className="w-full h-full object-contain" alt="" />
                            </div>
                            <div className="flex flex-col text-left">
                              <span className="text-lg font-black text-white whitespace-nowrap leading-none">{localContent.logoText || 'ВЕКТОР'}</span>
                              <span className="text-[7px] font-bold tracking-[0.35em] text-blue-400 uppercase mt-0.5">{localContent.companyTagline}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Формы и уведомления" icon={<Send size={18}/>}>
                  <InputField label="Тема письма (Subject)" value={localContent.integrations?.formSubject} onChange={(val) => updateNested('integrations.formSubject', val)} />
                  <InputField label="Formspree ID (для реальных заявок)" value={localContent.integrations?.formspreeId} onChange={(val) => updateNested('integrations.formspreeId', val)} />
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed -mt-2 ml-1 max-w-md">
                    Если поле ID пустое, форма работает в демо-режиме (имитация отправки).
                  </p>
                </SectionCard>

                <SectionCard title="Аналитика и пиксели" icon={<BarChart3 size={18}/>}>
                  <div className="space-y-4">
                    <InputField label="Yandex Metrica ID" value={localContent.analytics?.yandexMetrica} onChange={(val) => updateNested('analytics.yandexMetrica', val)} />
                    <InputField label="Google Analytics ID (G-XXXXX)" value={localContent.analytics?.googleAnalytics} onChange={(val) => updateNested('analytics.googleAnalytics', val)} />
                    <InputField label="Facebook Pixel ID" value={localContent.analytics?.pixelId} onChange={(val) => updateNested('analytics.pixelId', val)} />
                  </div>
                  <div className="mt-8 p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-2">Инструкция</p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Введите только идентификаторы (ID). Система автоматически подключит соответствующие скрипты при загрузке страницы.
                    </p>
                  </div>
                </SectionCard>

                <SectionCard title="Настройки Cookie Banner" icon={<FileText size={18}/>}>
                  <InputField label="Заголовок баннера" value={localContent.cookieBanner?.title} onChange={(val) => updateNested('cookieBanner.title', val)} />
                  <div className="mb-6">
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Описание (Текст согласия)</label>
                    <textarea
                      value={localContent.cookieBanner?.description}
                      onChange={(e) => updateNested('cookieBanner.description', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-white text-sm font-medium h-24 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Кнопка: Принять все" value={localContent.cookieBanner?.btnAll} onChange={(val) => updateNested('cookieBanner.btnAll', val)} />
                    <InputField label="Кнопка: Только нужные" value={localContent.cookieBanner?.btnEssential} onChange={(val) => updateNested('cookieBanner.btnEssential', val)} />
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-6">
                <SectionCard title="Заголовки секции FAQ" icon={<HelpCircle size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Заголовок" value={localContent.faq?.title} onChange={(val) => updateNested('faq.title', val)} />
                    <InputField label="Акцентное слово" value={localContent.faq?.accent} onChange={(val) => updateNested('faq.accent', val)} />
                  </div>
                </SectionCard>
                {(localContent.faq?.items || []).map((item, idx) => (
                  <div key={idx} className="bg-slate-950/40 p-8 rounded-3xl border border-slate-800 relative group mb-4">
                    <button onClick={() => {
                      const newI = [...(localContent.faq?.items || [])];
                      newI.splice(idx, 1);
                      updateNested('faq.items', newI);
                    }} className="absolute top-6 right-6 p-2 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                    <InputField label="Вопрос (текст)" value={item.q} onChange={(val) => {
                      const newI = localContent.faq.items.map((it, i) => i === idx ? { ...it, q: val } : it);
                      updateNested('faq.items', newI);
                    }} />
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Ответ (текст)</label>
                    <textarea value={item.a} onChange={(e) => {
                      const newI = localContent.faq.items.map((it, i) => i === idx ? { ...it, a: e.target.value } : it);
                      updateNested('faq.items', newI);
                    }} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-white text-sm font-medium h-32 resize-none" />
                  </div>
                ))}
                <button onClick={() => updateNested('faq.items', [...(localContent.faq?.items || []), { q: 'Новый вопрос?', a: 'Ответ на вопрос...' }])} className="w-full py-6 border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 hover:border-blue-500/40 font-black text-[10px] uppercase tracking-[0.3em] transition-all rounded-3xl flex items-center justify-center gap-3"><Plus size={20}/> Добавить вопрос</button>
              </div>
            )}
          </div>
        </div>
      </main>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3b82f6; }
      `}</style>
    </div>
  );
}
