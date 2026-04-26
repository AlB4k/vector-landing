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
    { id: 'stats', label: 'Цифры', icon: <BarChart3 size={18}/> },
    { id: 'process', label: 'Процесс', icon: <Zap size={18}/> },
    { id: 'services', label: 'Услуги', icon: <Phone size={18}/> },
    { id: 'bpo', label: 'О БПО', icon: <FileText size={18}/> },
    { id: 'serviceArea', label: 'География', icon: <MapPin size={18}/> },
    { id: 'news', label: 'Новости', icon: <Send size={18}/> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle size={18}/> },
    { id: 'contact', label: 'Контакты', icon: <Mail size={18}/> },
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
            <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest mt-1">v{localContent.legal.version}</span>
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,64,175,0.08),transparent)] pointer-events-none"></div>
        <header className="h-24 border-b border-slate-900 px-10 flex items-center justify-between bg-[#020204]/80 backdrop-blur-xl sticky top-0 z-10">
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

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative z-0">
          <div className="max-w-4xl mx-auto pb-24">
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
                    </div>
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-8">
                <SectionCard title="Главный экран (Hero)" icon={<LayoutDashboard size={18}/>}>
                  <div className="space-y-2">
                    <InputField label="Верхний бейдж" value={localContent.hero.badge} onChange={(val) => updateNested('hero.badge', val)} />
                    <InputField label="Основной заголовок (строка 1)" value={localContent.hero.title1} onChange={(val) => updateNested('hero.title1', val)} />
                    <InputField label="Градиентный акцент заголовка" value={localContent.hero.titleGradient} onChange={(val) => updateNested('hero.titleGradient', val)} />
                    <div className="grid grid-cols-2 gap-8">
                      <InputField label="Метка горячей линии" value={localContent.hero.hotlineLabel} onChange={(val) => updateNested('hero.hotlineLabel', val)} />
                      <InputField label="Lucide Icon (Hotline)" value={localContent.hero.hotlineIcon} onChange={(val) => updateNested('hero.hotlineIcon', val)} />
                    </div>
                    <InputField label="Номер горячей линии" value={localContent.hero.hotlinePhone} onChange={(val) => updateNested('hero.hotlinePhone', val)} />
                    <div className="grid grid-cols-2 gap-8">
                      <InputField label="Текст кнопки 1 (Основная)" value={localContent.hero.btnPrimary} onChange={(val) => updateNested('hero.btnPrimary', val)} />
                      <InputField label="Текст кнопки 2 (Вторичная)" value={localContent.hero.btnSecondary} onChange={(val) => updateNested('hero.btnSecondary', val)} />
                    </div>
                    <div className="mb-6">
                      <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Описание (Subtitle)</label>
                      <textarea
                        value={localContent.hero.subtitle}
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
                      checked={localContent.hotlineConfig.showBadge}
                      onChange={(e) => updateNested('hotlineConfig.showBadge', e.target.checked)}
                      className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600"
                    />
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Показывать статус линии (Онлайн/Офлайн)</label>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-900/30 p-4 rounded-2xl border border-slate-800/50 mb-6">
                    <input
                      type="checkbox"
                      checked={localContent.hotlineConfig.scheduleEnabled}
                      onChange={(e) => updateNested('hotlineConfig.scheduleEnabled', e.target.checked)}
                      className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600"
                    />
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Автоматический график (Прямая линия)</label>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Начало работы (час, 0-23)" type="number" value={localContent.hotlineConfig.startHour} onChange={(val) => updateNested('hotlineConfig.startHour', parseInt(val))} />
                    <InputField label="Конец работы (час, 0-23)" type="number" value={localContent.hotlineConfig.endHour} onChange={(val) => updateNested('hotlineConfig.endHour', parseInt(val))} />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Текст статуса (Онлайн)" value={localContent.hotlineConfig.statusOnline} onChange={(val) => updateNested('hotlineConfig.statusOnline', val)} />
                    <InputField label="Текст статуса (Офлайн)" value={localContent.hotlineConfig.statusOffline} onChange={(val) => updateNested('hotlineConfig.statusOffline', val)} />
                  </div>
                  <div className="mt-4">
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Рабочие дни (1=Пн, 0=Вс)</label>
                    <div className="flex gap-2">
                      {[1,2,3,4,5,6,0].map(day => (
                        <button
                          key={day}
                          onClick={() => {
                            const current = localContent.hotlineConfig.workDays;
                            const next = current.includes(day) ? current.filter(d => d !== day) : [...current, day].sort();
                            updateNested('hotlineConfig.workDays', next);
                          }}
                          className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${localContent.hotlineConfig.workDays.includes(day) ? 'gradient-bg text-white shadow-lg' : 'bg-slate-900 text-slate-500 border border-slate-800 hover:text-slate-300'}`}
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
                    <InputField label="Заголовок" value={localContent.features.title} onChange={(val) => updateNested('features.title', val)} />
                    <InputField label="Акцентное слово" value={localContent.features.accent} onChange={(val) => updateNested('features.accent', val)} />
                  </div>
                  <InputField label="Подзаголовок секции" value={localContent.features.subtitle} onChange={(val) => updateNested('features.subtitle', val)} />
                </SectionCard>
                <div className="mb-6 ml-2">
                  <h4 className="text-lg font-black text-white mb-1 tracking-tight uppercase tracking-widest text-xs">Список преимуществ</h4>
                </div>
                {localContent.features.items.map((feat, idx) => (
                  <div key={idx} className="bg-slate-950/40 p-8 rounded-3xl border border-slate-800 relative group mb-4">
                    <button onClick={() => {
                      const newItems = [...localContent.features.items];
                      newItems.splice(idx, 1);
                      updateNested('features.items', newItems);
                    }} className="absolute top-6 right-6 p-2.5 text-slate-700 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all border border-transparent hover:border-red-500/10"><Trash2 size={18}/></button>
                    <div className="grid grid-cols-2 gap-8 mr-12">
                      <InputField label="Lucide Icon Name" value={feat.icon} onChange={(val) => {
                        const newItems = [...localContent.features.items];
                        newItems[idx].icon = val;
                        updateNested('features.items', newItems);
                      }} />
                      <InputField label="Заголовок карточки" value={feat.title} onChange={(val) => {
                        const newItems = [...localContent.features.items];
                        newItems[idx].title = val;
                        updateNested('features.items', newItems);
                      }} />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Описание карточки</label>
                      <textarea value={feat.desc} onChange={(e) => {
                        const newItems = [...localContent.features.items];
                        newItems[idx].desc = e.target.value;
                        updateNested('features.items', newItems);
                      }} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm font-medium h-24 resize-none" />
                    </div>
                  </div>
                ))}
                <button onClick={() => updateNested('features.items', [...localContent.features.items, { icon: 'Check', title: 'Новое преимущество', desc: 'Описание...' }])} className="w-full py-6 rounded-3xl border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 hover:border-blue-500/40 hover:bg-blue-500/5 font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3"><Plus size={20}/> Добавить преимущество</button>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="grid grid-cols-2 gap-6">
                {localContent.stats.map((stat, idx) => (
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
                        const newS = [...localContent.stats];
                        newS[idx].val = val;
                        updateNested('stats', newS);
                      }} />
                      <InputField label="Суффикс" value={stat.suffix} onChange={(val) => {
                        const newS = [...localContent.stats];
                        newS[idx].suffix = val;
                        updateNested('stats', newS);
                      }} />
                    </div>
                    <InputField label="Подпись показателя" value={stat.label} onChange={(val) => {
                      const newS = [...localContent.stats];
                      newS[idx].label = val;
                      updateNested('stats', newS);
                    }} />
                  </div>
                ))}
                <button onClick={() => updateNested('stats', [...localContent.stats, { val: 0, prefix: '', suffix: '', label: 'Новый показатель' }])} className="col-span-2 py-6 rounded-3xl border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 hover:border-blue-500/40 hover:bg-blue-500/5 font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3"><Plus size={20}/></button>
              </div>
            )}

            {activeTab === 'process' && (
              <div className="space-y-6">
                <SectionCard title="Заголовки секции" icon={<Zap size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Заголовок" value={localContent.process.title} onChange={(val) => updateNested('process.title', val)} />
                    <InputField label="Акцентное слово" value={localContent.process.accent} onChange={(val) => updateNested('process.accent', val)} />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Подзаголовок" value={localContent.process.subtitle} onChange={(val) => updateNested('process.subtitle', val)} />
                    <InputField label="Префикс шага (Шаг, Step)" value={localContent.process.stepLabel} onChange={(val) => updateNested('process.stepLabel', val)} />
                  </div>
                </SectionCard>
                {localContent.process.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950/40 p-8 rounded-3xl border border-slate-800 relative group mb-4">
                    <button onClick={() => {
                      const newS = [...localContent.process.steps];
                      newS.splice(idx, 1);
                      updateNested('process.steps', newS);
                    }} className="absolute top-6 right-6 p-2 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                    <div className="grid grid-cols-2 gap-8">
                      <InputField label="Номер / Код шага" value={step.step} onChange={(val) => {
                        const newS = [...localContent.process.steps];
                        newS[idx].step = val;
                        updateNested('process.steps', newS);
                      }} />
                      <InputField label="Заголовок шага" value={step.title} onChange={(val) => {
                        const newS = [...localContent.process.steps];
                        newS[idx].title = val;
                        updateNested('process.steps', newS);
                      }} />
                    </div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Описание действия</label>
                    <textarea value={step.desc} onChange={(e) => {
                      const newS = [...localContent.process.steps];
                      newS[idx].desc = e.target.value;
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
                    <InputField label="Заголовок" value={localContent.services.title} onChange={(val) => updateNested('services.title', val)} />
                    <InputField label="Акцентное слово" value={localContent.services.accent} onChange={(val) => updateNested('services.accent', val)} />
                  </div>
                  <InputField label="Подзаголовок" value={localContent.services.subtitle} onChange={(val) => updateNested('services.subtitle', val)} />
                  <InputField label="Текст кнопки (по умолчанию)" value={localContent.services.btnLabel} onChange={(val) => updateNested('services.btnLabel', val)} />
                </SectionCard>
                {localContent.services.list.map((srv, idx) => (
                  <div key={idx} className="bg-slate-950/40 p-8 rounded-3xl border border-slate-800 space-y-6 relative mb-6">
                    <button onClick={() => {
                      const newL = [...localContent.services.list];
                      newL.splice(idx, 1);
                      updateNested('services.list', newL);
                    }} className="absolute top-6 right-6 p-2 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                    <div className="grid grid-cols-2 gap-8">
                      <InputField label="Название услуги / Тарифа" value={srv.title} onChange={(val) => {
                        const newL = [...localContent.services.list];
                        newL[idx].title = val;
                        updateNested('services.list', newL);
                      }} />
                      <InputField label="Бейдж карточки" value={srv.badge} onChange={(val) => {
                        const newL = [...localContent.services.list];
                        newL[idx].badge = val;
                        updateNested('services.list', newL);
                      }} />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Статус / Тип шилдика</label>
                        <select
                          value={srv.status || (srv.popular ? 'recommended' : 'none')}
                          onChange={(e) => {
                            const newL = [...localContent.services.list];
                            newL[idx].status = e.target.value;
                            if (e.target.value === 'recommended') newL[idx].popular = true;
                            else newL[idx].popular = false;
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
                          const newL = [...localContent.services.list];
                          newL[idx].accentBadge = val;
                          updateNested('services.list', newL);
                        }} />
                      )}
                    </div>

                    <InputField label="Текст на кнопке" value={srv.button} onChange={(val) => {
                        const newL = [...localContent.services.list];
                        newL[idx].button = val;
                        updateNested('services.list', newL);
                    }} />
                    <div className="space-y-3">
                      <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Список особенностей / функций</label>
                      {srv.features.map((f, fIdx) => (
                        <div key={fIdx} className="flex gap-3">
                          <input
                            value={f}
                            onChange={(e) => {
                              const newL = [...localContent.services.list];
                              newL[idx].features[fIdx] = e.target.value;
                              updateNested('services.list', newL);
                            }}
                            className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs font-medium focus:ring-1 focus:ring-blue-500/30 outline-none"
                          />
                          <button onClick={() => {
                            const newL = [...localContent.services.list];
                            newL[idx].features.splice(fIdx, 1);
                            updateNested('services.list', newL);
                          }} className="text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                        </div>
                      ))}
                      <button onClick={() => {
                        const newL = [...localContent.services.list];
                        newL[idx].features.push('');
                        updateNested('services.list', newL);
                      }} className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] hover:text-blue-400 transition-colors pt-2 flex items-center gap-2">
                        <Plus size={14} /> Добавить пункт списка
                      </button>
                    </div>
                  </div>
                ))}
                <button onClick={() => updateNested('services.list', [...localContent.services.list, { title: 'Новая услуга', badge: 'Тариф', features: [], button: 'Заказать', popular: false }])} className="w-full py-6 border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 hover:border-blue-500/40 font-black text-[10px] uppercase tracking-[0.3em] transition-all rounded-3xl flex items-center justify-center gap-3"><Plus size={20}/> Добавить услугу</button>
              </div>
            )}

            {activeTab === 'serviceArea' && (
              <div className="space-y-6">
                <SectionCard title="Зона покрытия и география" icon={<MapPin size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Основной заголовок" value={localContent.serviceArea.title} onChange={(val) => updateNested('serviceArea.title', val)} />
                    <InputField label="Акцент заголовка" value={localContent.serviceArea.accent} onChange={(val) => updateNested('serviceArea.accent', val)} />
                  </div>
                  <InputField label="Подзаголовок" value={localContent.serviceArea.subtitle} onChange={(val) => updateNested('serviceArea.subtitle', val)} />
                  <InputField label="Заметка о собственной сети" value={localContent.serviceArea.ownNetworkNote} onChange={(val) => updateNested('serviceArea.ownNetworkNote', val)} />

                  <div className="flex items-center gap-3 bg-slate-900/30 p-4 rounded-2xl border border-slate-800/50 mb-6">
                    <input
                      type="checkbox"
                      checked={localContent.serviceArea.randomMapVariant}
                      onChange={(e) => updateNested('serviceArea.randomMapVariant', e.target.checked)}
                      className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500/20"
                    />
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Случайный стиль при загрузке страницы</label>
                  </div>

                  {!localContent.serviceArea.randomMapVariant && (
                    <div className="mb-4 animate-slow-fade">
                      <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Вариант карты (Визуализация)</label>
                      <select
                        value={localContent.serviceArea.mapVariant || 'default'}
                        onChange={(e) => updateNested('serviceArea.mapVariant', e.target.value)}
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-medium"
                      >
                        <option value="default">Default (Abstract)</option>
                        <option value="radar">Radar Scan</option>
                        <option value="mesh">Mesh Grid</option>
                        <option value="blueprint">Blueprint Design</option>
                        <option value="isometric">Isometric Nodes</option>
                        <option value="topology">Topology Curves</option>
                        <option value="pulse">Network Pulse</option>
                        <option value="heatmap">Heatmap</option>
                      </select>
                    </div>
                  )}
                </SectionCard>

                <div className="mb-6 ml-2">
                  <h4 className="text-lg font-black text-white mb-1 tracking-tight uppercase tracking-widest text-xs">Список населенных пунктов</h4>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {localContent.serviceArea.locations.map((loc, idx) => (
                    <div key={idx} className="bg-slate-950/40 p-6 rounded-2xl border border-slate-800 relative group">
                      <button onClick={() => {
                        const newL = [...localContent.serviceArea.locations];
                        newL.splice(idx, 1);
                        updateNested('serviceArea.locations', newL);
                      }} className="absolute top-4 right-4 p-2 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                      <InputField label="Название города/района" value={loc.name} onChange={(val) => {
                        const newL = [...localContent.serviceArea.locations];
                        newL[idx].name = val;
                        updateNested('serviceArea.locations', newL);
                      }} />
                      <div className="grid grid-cols-2 gap-4">
                        <InputField label="Статус (напр. 24ч)" value={loc.status} onChange={(val) => {
                          const newL = [...localContent.serviceArea.locations];
                          newL[idx].status = val;
                          updateNested('serviceArea.locations', newL);
                        }} />
                        <InputField label="Частота (напр. Ежедневно)" value={loc.freq} onChange={(val) => {
                          const newL = [...localContent.serviceArea.locations];
                          newL[idx].freq = val;
                          updateNested('serviceArea.locations', newL);
                        }} />
                      </div>
                      <InputField label="Тип покрытия (напр. Областной центр)" value={loc.type} onChange={(val) => {
                        const newL = [...localContent.serviceArea.locations];
                        newL[idx].type = val;
                        updateNested('serviceArea.locations', newL);
                      }} />
                    </div>
                  ))}
                  <button onClick={() => updateNested('serviceArea.locations', [...localContent.serviceArea.locations, { name: 'Новый город', type: 'По графику', status: '24ч', freq: 'Ежедневно' }])} className="col-span-2 py-6 rounded-3xl border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 hover:border-blue-500/40 hover:bg-blue-500/5 font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3"><Plus size={20}/> Добавить локацию</button>
                </div>
              </div>
            )}

            {activeTab === 'bpo' && (
              <div className="space-y-6">
                <SectionCard title="Бесконвертное Почтовое Отправление (БПО)" icon={<FileText size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Заголовок" value={localContent.bpo.title} onChange={(val) => updateNested('bpo.title', val)} />
                    <InputField label="Акцентное слово" value={localContent.bpo.accent} onChange={(val) => updateNested('bpo.accent', val)} />
                  </div>
                  <InputField label="Подзаголовок" value={localContent.bpo.subtitle} onChange={(val) => updateNested('bpo.subtitle', val)} />
                  <InputField label="Юридическая сноска" value={localContent.bpo.legalNote} onChange={(val) => updateNested('bpo.legalNote', val)} />
                </SectionCard>

                <div className="mb-6 ml-2">
                  <h4 className="text-lg font-black text-white mb-1 tracking-tight uppercase tracking-widest text-xs">Технологические этапы</h4>
                </div>
                {localContent.bpo.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950/40 p-8 rounded-3xl border border-slate-800 relative group mb-4">
                    <button onClick={() => {
                      const newS = [...localContent.bpo.steps];
                      newS.splice(idx, 1);
                      updateNested('bpo.steps', newS);
                    }} className="absolute top-6 right-6 p-2 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                    <div className="grid grid-cols-4 gap-8">
                      <div className="col-span-1">
                        <InputField label="№" value={step.num} onChange={(val) => {
                          const newS = [...localContent.bpo.steps];
                          newS[idx].num = val;
                          updateNested('bpo.steps', newS);
                        }} />
                      </div>
                      <div className="col-span-3">
                        <InputField label="Название этапа" value={step.title} onChange={(val) => {
                          const newS = [...localContent.bpo.steps];
                          newS[idx].title = val;
                          updateNested('bpo.steps', newS);
                        }} />
                      </div>
                    </div>
                    <InputField label="Описание этапа" value={step.desc} onChange={(val) => {
                      const newS = [...localContent.bpo.steps];
                      newS[idx].desc = val;
                      updateNested('bpo.steps', newS);
                    }} />
                  </div>
                ))}
                <button onClick={() => updateNested('bpo.steps', [...localContent.bpo.steps, { num: '0' + (localContent.bpo.steps.length + 1), title: 'Новый этап', desc: 'Описание этапа БПО...' }])} className="w-full py-6 rounded-3xl border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 transition-all flex items-center justify-center gap-3 mb-8"><Plus size={20}/> Добавить этап БПО</button>

                <SectionCard title="Преимущества БПО" icon={<Check size={18}/>}>
                  {localContent.bpo.advantages.map((adv, idx) => (
                    <div key={idx} className="flex gap-3 mb-3">
                      <input
                        value={adv}
                        onChange={(e) => {
                          const newA = [...localContent.bpo.advantages];
                          newA[idx] = e.target.value;
                          updateNested('bpo.advantages', newA);
                        }}
                        className="flex-1 bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs font-medium focus:ring-1 focus:ring-blue-500/30 outline-none"
                      />
                      <button onClick={() => {
                        const newA = [...localContent.bpo.advantages];
                        newA.splice(idx, 1);
                        updateNested('bpo.advantages', newA);
                      }} className="text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                    </div>
                  ))}
                  <button onClick={() => updateNested('bpo.advantages', [...localContent.bpo.advantages, 'Новое преимущество БПО']) } className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] hover:text-blue-400 transition-colors pt-2 flex items-center gap-2"><Plus size={14} /> Добавить преимущество</button>
                </SectionCard>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="space-y-6">
                <SectionCard title="Новости и события" icon={<Send size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Заголовок" value={localContent.news.title} onChange={(val) => updateNested('news.title', val)} />
                    <InputField label="Акцентное слово" value={localContent.news.accent} onChange={(val) => updateNested('news.accent', val)} />
                  </div>
                </SectionCard>

                {localContent.news.items.map((item, idx) => (
                  <div key={idx} className="bg-slate-950/40 p-8 rounded-3xl border border-slate-800 relative group mb-4">
                    <button onClick={() => {
                      const newI = [...localContent.news.items];
                      newI.splice(idx, 1);
                      updateNested('news.items', newI);
                    }} className="absolute top-6 right-6 p-2 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                    <div className="grid grid-cols-2 gap-8">
                      <InputField label="Дата" value={item.date} onChange={(val) => {
                        const newI = [...localContent.news.items];
                        newI[idx].date = val;
                        updateNested('news.items', newI);
                      }} />
                      <InputField label="Тег / Категория" value={item.tag} onChange={(val) => {
                        const newI = [...localContent.news.items];
                        newI[idx].tag = val;
                        updateNested('news.items', newI);
                      }} />
                    </div>
                    <InputField label="Заголовок новости" value={item.title} onChange={(val) => {
                      const newI = [...localContent.news.items];
                      newI[idx].title = val;
                      updateNested('news.items', newI);
                    }} />
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Содержание</label>
                    <textarea value={item.desc} onChange={(e) => {
                      const newI = [...localContent.news.items];
                      newI[idx].desc = e.target.value;
                      updateNested('news.items', newI);
                    }} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-white text-sm font-medium h-24 resize-none" />
                  </div>
                ))}
                <button onClick={() => updateNested('news.items', [{ date: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' }), tag: 'СОБЫТИЕ', title: 'Новое событие', desc: 'Описание события...' }, ...localContent.news.items])} className="w-full py-6 rounded-3xl border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 transition-all flex items-center justify-center gap-3"><Plus size={20}/> Добавить новость</button>
              </div>
            )}

            {activeTab === 'contact' && (
              <SectionCard title="Секция контактов и форма" icon={<Mail size={18}/>}>
                <div className="grid grid-cols-2 gap-8">
                  <InputField label="Основной заголовок" value={localContent.contact.title} onChange={(val) => updateNested('contact.title', val)} />
                  <InputField label="Акцент заголовка" value={localContent.contact.accent} onChange={(val) => updateNested('contact.accent', val)} />
                </div>
                <InputField label="Подзаголовок описания" value={localContent.contact.subtitle} onChange={(val) => updateNested('contact.subtitle', val)} />
                <div className="mb-8 p-6 bg-slate-900/30 rounded-2xl border border-slate-800/50">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Названия полей формы (Placeholders)</h4>
                  <div className="grid grid-cols-2 gap-x-8">
                    <InputField label="Поле: Ваше имя" value={localContent.contact.formName} onChange={(val) => updateNested('contact.formName', val)} />
                    <InputField label="Поле: Телефон" value={localContent.contact.formPhone} onChange={(val) => updateNested('contact.formPhone', val)} />
                    <InputField label="Поле: Email" value={localContent.contact.formEmail} onChange={(val) => updateNested('contact.formEmail', val)} />
                    <InputField label="Поле: Сообщение" value={localContent.contact.formMessage} onChange={(val) => updateNested('contact.formMessage', val)} />
                  </div>
                  <InputField label="Текст на кнопке отправки" value={localContent.contact.formButton} onChange={(val) => updateNested('contact.formButton', val)} />
                </div>
              </SectionCard>
            )}

            {activeTab === 'modals' && (
              <div className="space-y-8">
                <SectionCard title="Модальное окно: Успех" icon={<Check size={18}/>}>
                  <InputField label="Главный заголовок" value={localContent.modals.success.title} onChange={(val) => updateNested('modals.success.title', val)} />
                  <InputField label="Подзаголовок / Текст" value={localContent.modals.success.subtitle} onChange={(val) => updateNested('modals.success.subtitle', val)} />
                  <InputField label="Текст кнопки закрытия" value={localContent.modals.success.button} onChange={(val) => updateNested('modals.success.button', val)} />
                </SectionCard>
                <SectionCard title="Юридическая информация" icon={<FileText size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Метка статуса (напр. Свидетельство)" value={localContent.legal.statusLabel} onChange={(val) => updateNested('legal.statusLabel', val)} />
                    <InputField label="Значение статуса" value={localContent.legal.statusValue} onChange={(val) => updateNested('legal.statusValue', val)} />
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === 'footer' && (
              <div className="space-y-8">
                <SectionCard title="Настройки подвала (Footer)" icon={<MapPin size={18}/>}>
                  <InputField label="Краткое описание под логотипом" value={localContent.footer.description} onChange={(val) => updateNested('footer.description', val)} />
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Текст ссылки оферты" value={localContent.footer.offerLabel} onChange={(val) => updateNested('footer.offerLabel', val)} />
                    <InputField label="URL документа оферты" value={localContent.footer.offerLink} onChange={(val) => updateNested('footer.offerLink', val)} />
                  </div>
                </SectionCard>
                <SectionCard title="Ссылки на социальные сети" icon={<Send size={18}/>}>
                  <div className="space-y-2">
                    <InputField label="Telegram Channel URL" value={localContent.socials.telegram} onChange={(val) => updateNested('socials.telegram', val)} />
                    <InputField label="WhatsApp Business URL" value={localContent.socials.whatsapp} onChange={(val) => updateNested('socials.whatsapp', val)} />
                    <InputField label="VK Community URL" value={localContent.socials.vk} onChange={(val) => updateNested('socials.vk', val)} />
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
                          value={localContent.legal.version}
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
                              <span className="text-3xl font-black text-white whitespace-nowrap leading-none">ВЕКТОР</span>
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
                              <span className="text-lg font-black text-white whitespace-nowrap leading-none">ВЕКТОР</span>
                              <span className="text-[7px] font-bold tracking-[0.35em] text-blue-400 uppercase mt-0.5">{localContent.companyTagline}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Формы и уведомления" icon={<Send size={18}/>}>
                  <InputField label="Formspree ID (для реальных заявок)" value={localContent.integrations.formspreeId} onChange={(val) => updateNested('integrations.formspreeId', val)} />
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed -mt-2 ml-1 max-w-md">
                    Если поле пустое, форма работает в демо-режиме (имитация отправки).
                  </p>
                </SectionCard>

                <SectionCard title="Аналитика и пиксели" icon={<BarChart3 size={18}/>}>
                  <div className="space-y-4">
                    <InputField label="Yandex Metrica ID" value={localContent.analytics.yandexMetrica} onChange={(val) => updateNested('analytics.yandexMetrica', val)} />
                    <InputField label="Google Analytics ID (G-XXXXX)" value={localContent.analytics.googleAnalytics} onChange={(val) => updateNested('analytics.googleAnalytics', val)} />
                    <InputField label="Facebook Pixel ID" value={localContent.analytics.pixelId} onChange={(val) => updateNested('analytics.pixelId', val)} />
                  </div>
                  <div className="mt-8 p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-2">Инструкция</p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Введите только идентификаторы (ID). Система автоматически подключит соответствующие скрипты при загрузке страницы.
                    </p>
                  </div>
                </SectionCard>

                <SectionCard title="Настройки Cookie Banner" icon={<FileText size={18}/>}>
                  <InputField label="Заголовок баннера" value={localContent.cookieBanner.title} onChange={(val) => updateNested('cookieBanner.title', val)} />
                  <div className="mb-6">
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Описание (Текст согласия)</label>
                    <textarea
                      value={localContent.cookieBanner.description}
                      onChange={(e) => updateNested('cookieBanner.description', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-white text-sm font-medium h-24 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Кнопка: Принять все" value={localContent.cookieBanner.btnAll} onChange={(val) => updateNested('cookieBanner.btnAll', val)} />
                    <InputField label="Кнопка: Только нужные" value={localContent.cookieBanner.btnEssential} onChange={(val) => updateNested('cookieBanner.btnEssential', val)} />
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-6">
                <SectionCard title="Заголовки секции FAQ" icon={<HelpCircle size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Заголовок" value={localContent.faq.title} onChange={(val) => updateNested('faq.title', val)} />
                    <InputField label="Акцентное слово" value={localContent.faq.accent} onChange={(val) => updateNested('faq.accent', val)} />
                  </div>
                </SectionCard>
                {localContent.faq.items.map((item, idx) => (
                  <div key={idx} className="bg-slate-950/40 p-8 rounded-3xl border border-slate-800 relative group mb-4">
                    <button onClick={() => {
                      const newI = [...localContent.faq.items];
                      newI.splice(idx, 1);
                      updateNested('faq.items', newI);
                    }} className="absolute top-6 right-6 p-2 text-slate-700 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                    <InputField label="Вопрос (текст)" value={item.q} onChange={(val) => {
                      const newI = [...localContent.faq.items];
                      newI[idx].q = val;
                      updateNested('faq.items', newI);
                    }} />
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Ответ (текст)</label>
                    <textarea value={item.a} onChange={(e) => {
                      const newI = [...localContent.faq.items];
                      newI[idx].a = e.target.value;
                      updateNested('faq.items', newI);
                    }} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-white text-sm font-medium h-32 resize-none" />
                  </div>
                ))}
                <button onClick={() => updateNested('faq.items', [...localContent.faq.items, { q: 'Новый вопрос?', a: 'Ответ на вопрос...' }])} className="w-full py-6 border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 hover:border-blue-500/40 font-black text-[10px] uppercase tracking-[0.3em] transition-all rounded-3xl flex items-center justify-center gap-3"><Plus size={20}/> Добавить вопрос</button>
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
