import React, { useState, useEffect, useRef } from 'react';
import { interpolate } from './utils/content';
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
  Shield,
  Sparkles,
  Monitor,
  Sun,
  Moon
} from 'lucide-react';

const CMS_THEMES = {
  dark: {
    '--cms-bg':           '#020204',
    '--cms-bg-secondary': '#0a0a0f',
    '--cms-sidebar-bg':   'rgba(2,2,4,0.95)',
    '--cms-header-bg':    '#020204',
    '--cms-card-bg':      '#0f0f18',
    '--cms-card-border':  '#1e1e2e',
    '--cms-text-main':    '#f8fafc',
    '--cms-text-muted':   '#64748b',
    '--cms-text-label':   '#94a3b8',
    '--cms-input-bg':     '#1e1e2e',
    '--cms-input-border': '#2d2d3d',
    '--cms-accent':       '#2563eb',
    '--cms-accent-hover': '#1d4ed8',
    '--cms-divider':      '#1e1e2e',
    '--cms-active-tab':   'rgba(37,99,235,0.15)',
  },
  light: {
    '--cms-bg':           '#f1f5f9',
    '--cms-bg-secondary': '#e2e8f0',
    '--cms-sidebar-bg':   'rgba(248,250,252,0.98)',
    '--cms-header-bg':    '#ffffff',
    '--cms-card-bg':      '#ffffff',
    '--cms-card-border':  '#e2e8f0',
    '--cms-text-main':    '#0f172a',
    '--cms-text-muted':   '#475569',
    '--cms-text-label':   '#64748b',
    '--cms-input-bg':     '#f8fafc',
    '--cms-input-border': '#cbd5e1',
    '--cms-accent':       '#2563eb',
    '--cms-accent-hover': '#1d4ed8',
    '--cms-divider':      '#e2e8f0',
    '--cms-active-tab':   'rgba(37,99,235,0.08)',
  }
};

const Tooltip = ({ text, children }) => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState('top');
  const [isRightEdge, setIsRightEdge] = useState(false);
  const ref = useRef(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      // Если сверху меньше 120px (запас для нескольких строк) — показываем снизу
      setPosition(rect.top < 120 ? 'bottom' : 'top');
      // Если до правого края экрана меньше 260px (запас для maxWidth 240px) — смещаем
      setIsRightEdge(window.innerWidth - rect.left < 260);
    }
    setShow(true);
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div style={{
          position: 'absolute',
          left: isRightEdge ? 'auto' : '50%',
          right: isRightEdge ? '-10px' : 'auto',
          transform: isRightEdge ? 'none' : 'translateX(-50%)',
          ...(position === 'top' ? {
            bottom: 'calc(100% + 10px)',
          } : {
            top: 'calc(100% + 10px)',
          }),
          zIndex: 9999,
          background: 'var(--cms-text-main)',
          color: 'var(--cms-bg)',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: 600,
          maxWidth: '240px',
          textWrap: 'wrap',
          pointerEvents: 'none',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2), 0 4px 10px rgba(0,0,0,0.1)',
          lineHeight: 1.4,
          animation: 'slow-fade 0.2s ease-out'
        }}>
          {text}
          {/* Стрелка */}
          <div style={{
            position: 'absolute',
            left: isRightEdge ? 'auto' : '50%',
            right: isRightEdge ? '14px' : 'auto',
            transform: isRightEdge ? 'none' : 'translateX(-50%)',
            ...(position === 'top' ? {
              top: '100%',
              borderTop: '6px solid var(--cms-text-main)',
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
            } : {
              bottom: '100%',
              borderBottom: '6px solid var(--cms-text-main)',
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
            }),
            width: 0,
            height: 0,
          }} />
        </div>
      )}
    </div>
  );
};

const InputField = ({ label, value, onChange, type = "text" }) => (
  <div className="mb-6">
    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-[var(--cms-text-muted)] mb-2.5 ml-1">{label}</label>
    <input
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[var(--cms-input-bg)] border border-[var(--cms-input-border)] rounded-xl px-5 py-3.5 text-[var(--cms-text-main)] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-medium placeholder-slate-700 shadow-inner"
    />
  </div>
);

const SectionCard = ({ title, children, icon, tooltip }) => (
  <div className="bg-[var(--cms-card-bg)] backdrop-blur-sm p-8 rounded-3xl border border-[var(--cms-card-border)] mb-8 shadow-2xl relative overflow-hidden group">
    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600/20 group-hover:bg-blue-600 transition-colors"></div>
    <h3 className="text-[10px] font-black mb-8 text-[var(--cms-text-label)] flex items-center gap-3 uppercase tracking-[0.3em]">
      <span className="p-2 rounded-lg bg-[var(--cms-bg-secondary)] text-blue-400 shadow-lg">{icon}</span>
      {title}
      {tooltip && (
        <Tooltip text={tooltip}>
          <HelpCircle size={14} className="text-slate-600 hover:text-blue-400 cursor-help transition-colors" />
        </Tooltip>
      )}
    </h3>
    {children}
  </div>
);

export default function CMS({ content, setContent, onLogout }) {
  const [activeTab, setActiveTab] = useState('structure');
  const [contentSubTab, setContentSubTab] = useState('hero');
  const [legalSubTab, setLegalSubTab] = useState('privacy');
  const [menuScrollEnd, setMenuScrollEnd] = useState(false);
  const [localContent, setLocalContent] = useState(content);

  const [cmsTheme, setCmsTheme] = useState(() => {
    return localStorage.getItem('cms_theme') || 'auto'
  });

  const getActiveCmsTheme = () => {
    if (cmsTheme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark' : 'light'
    }
    return cmsTheme
  };

  const [activeCmsTheme, setActiveCmsTheme] = useState(getActiveCmsTheme());

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (cmsTheme === 'auto') {
        setActiveCmsTheme(mediaQuery.matches ? 'dark' : 'light')
      }
    }
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [cmsTheme]);

  useEffect(() => {
    const active = getActiveCmsTheme()
    setActiveCmsTheme(active)
    localStorage.setItem('cms_theme', cmsTheme)
  }, [cmsTheme]);

  const [deliveryConfig, setDeliveryConfig] = useState(() => {
    try {
      const stored = localStorage.getItem('vector_delivery_config');
      return stored ? JSON.parse(stored) : (content.contact?.form?.delivery || {});
    } catch {
      return content.contact?.form?.delivery || {};
    }
  });

  const saveDeliveryConfig = (newConfig) => {
    setDeliveryConfig(newConfig);
    localStorage.setItem('vector_delivery_config', JSON.stringify(newConfig));
  };

  // Глубокое сравнение для активации кнопки сохранения
  const hasChanges = React.useMemo(() => {
    return JSON.stringify(localContent) !== JSON.stringify(content);
  }, [localContent, content]);

  const handleSave = () => {
    setContent(localContent);
  };

  const handleDiscard = () => {
    if (window.confirm(interpolate(localContent.ui?.cmsConfirmDiscard, localContent) || 'Вы уверены, что хотите сбросить все несохраненные изменения?')) {
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
    if (window.confirm(interpolate(localContent.ui?.cmsConfirmReset, localContent) || 'ВНИМАНИЕ: Все ваши изменения будут удалены и сайт вернется к исходному состоянию. Продолжить?')) {
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
          alert(interpolate(localContent.ui?.cmsImportSuccess, localContent) || 'Контент успешно проверен и загружен! Не забудьте нажать "Сохранить", чтобы применить изменения.');
        } else {
          alert(interpolate(localContent.ui?.cmsValidationError, localContent) || 'Ошибка валидации: файл имеет неверную структуру или содержит небезопасные данные.');
        }
      } catch (err) {
        alert(interpolate(localContent.ui?.cmsParseError, localContent) || 'Ошибка при чтении файла. Убедитесь, что это корректный JSON.');
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

  const tabGroups = React.useMemo(() => [
    {
      title: interpolate(localContent.ui?.cmsGroupAppearance, localContent) || 'ВНЕШНИЙ ВИД',
      tabs: [
        { id: 'theme', label: interpolate(localContent.ui?.cmsTabTheme, localContent) || 'Оформление', icon: <Palette size={18}/> },
        { id: 'brand', label: interpolate(localContent.ui?.cmsTabBrand, localContent) || 'Бренд', icon: <Settings size={18}/> },
      ]
    },
    {
      title: interpolate(localContent.ui?.cmsGroupContent, localContent) || 'СОДЕРЖИМОЕ',
      tabs: [
        { id: 'structure', label: interpolate(localContent.ui?.cmsTabStructure, localContent) || 'Структура', icon: <Layers size={18}/> },
        { id: 'content', label: interpolate(localContent.ui?.cmsTabContent, localContent) || 'Контент', icon: <FileText size={18}/> },
      ]
    },
    {
      title: interpolate(localContent.ui?.cmsGroupCommunications, localContent) || 'КОММУНИКАЦИИ',
      tabs: [
        { id: 'contacts', label: interpolate(localContent.ui?.cmsTabContacts, localContent) || 'Контакты', icon: <Mail size={18}/> },
      ]
    },
    {
      title: interpolate(localContent.ui?.cmsGroupCompany, localContent) || 'КОМПАНИЯ',
      tabs: [
        { id: 'requisites', label: interpolate(localContent.ui?.cmsTabRequisites, localContent) || 'Реквизиты', icon: <FileText size={18}/> },
        { id: 'legal', label: interpolate(localContent.ui?.cmsTabLegal, localContent) || 'Юридика', icon: <Shield size={18}/> },
      ]
    },
    {
      title: interpolate(localContent.ui?.cmsGroupSystem, localContent) || 'СИСТЕМА',
      tabs: [
        { id: 'settings', label: interpolate(localContent.ui?.cmsTabSettings, localContent) || 'Настройки', icon: <Settings size={18}/> },
        { id: 'analytics', label: interpolate(localContent.ui?.cmsTabAnalytics, localContent) || 'Интеграции', icon: <BarChart3 size={18}/> },
      ]
    }
  ], [localContent]);

  const allTabs = tabGroups.flatMap(g => g.tabs);
  const activeTabLabel = allTabs.find(t => t.id === activeTab)?.label || 'CMS';
  const activeTabIcon = allTabs.find(t => t.id === activeTab)?.icon || <LayoutDashboard size={18}/>;

  const handleMenuScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setMenuScrollEnd(scrollTop + clientHeight >= scrollHeight - 5);
  };

  return (
    <div
      style={{
        ...CMS_THEMES[activeCmsTheme],
        backgroundColor: 'var(--cms-bg)',
        color: 'var(--cms-text-main)'
      }}
      className="h-screen overflow-hidden flex flex-col font-sans transition-colors duration-300"
    >
      <header className="h-24 flex-shrink-0 border-b border-[var(--cms-divider)] px-10 flex items-center justify-between bg-[var(--cms-header-bg)] z-[30] transition-colors">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-[var(--cms-bg-secondary)] text-blue-500 border border-[var(--cms-divider)] shadow-xl">
            {activeTabIcon}
          </div>
          <h2 className="text-xs font-black text-[var(--cms-text-main)] uppercase tracking-[0.4em]">
            {interpolate(localContent.ui?.cmsTitle, localContent) || 'CMS'} — {activeTabLabel}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          {/* Theme Switcher */}
          <div className="flex bg-[var(--cms-bg-secondary)] p-1 rounded-xl border border-[var(--cms-divider)] mr-2">
            {[
              { id: 'light', icon: <Sun size={14} />, label: 'Light' },
              { id: 'auto', icon: <Monitor size={14} />, label: 'Auto' },
              { id: 'dark', icon: <Moon size={14} />, label: 'Dark' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setCmsTheme(t.id)}
                className={`p-2 rounded-lg transition-all ${cmsTheme === t.id ? 'bg-blue-600 text-white shadow-lg' : 'text-[var(--cms-text-muted)] hover:text-[var(--cms-text-main)]'}`}
                title={t.label}
              >
                {t.icon}
              </button>
            ))}
          </div>

          <input
            type="file"
            id="import-file"
            className="hidden"
            accept=".json"
            onChange={handleImport}
          />
          <button onClick={() => document.getElementById('import-file').click()} className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[var(--cms-divider)] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--cms-bg-secondary)] transition-all text-[var(--cms-text-muted)] hover:text-[var(--cms-text-main)] shadow-lg">
            <Upload size={16} /> {interpolate(localContent.ui?.cmsImport, localContent) || 'Импорт'}
          </button>
          <button onClick={handleExport} className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[var(--cms-divider)] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--cms-bg-secondary)] transition-all text-[var(--cms-text-muted)] hover:text-[var(--cms-text-main)] shadow-lg">
            <Download size={16} /> {interpolate(localContent.ui?.cmsExport, localContent) || 'Экспорт'}
          </button>
          <button onClick={() => window.open('/', '_blank')} className="flex items-center gap-3 px-7 py-3 rounded-xl border border-[var(--cms-divider)] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--cms-bg-secondary)] transition-all text-[var(--cms-text-muted)] hover:text-[var(--cms-text-main)] shadow-lg">
            <Eye size={16} /> {interpolate(localContent.ui?.cmsPreview, localContent) || 'Просмотр'}
          </button>
          <button onClick={handleReset} className="flex items-center gap-3 px-5 py-3 rounded-xl border border-red-900/20 text-red-500/40 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-500/5 hover:text-red-500 transition-all">
            <RefreshCcw size={16} /> {interpolate(localContent.ui?.cmsReset, localContent) || 'Сброс'}
          </button>
          {hasChanges && (
            <button onClick={handleDiscard} className="flex items-center gap-3 px-5 py-3 rounded-xl border border-red-900/30 text-red-500/70 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-500/5 transition-all">
              <Trash2 size={16} /> {interpolate(localContent.ui?.cmsDiscard, localContent) || 'Сбросить'}
            </button>
          )}
          <button
            onClick={handleSave}
            className={`flex items-center gap-3 px-8 py-3 rounded-xl text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl transition-all ${hasChanges ? 'gradient-bg shadow-blue-900/40 hover:scale-[1.03] active:scale-95' : 'bg-slate-800 opacity-50 cursor-default'}`}
            disabled={!hasChanges}
          >
            <Save size={16} /> {hasChanges ? (interpolate(localContent.ui?.cmsSave, localContent) || 'Сохранить изменения') : (interpolate(localContent.ui?.cmsSaved, localContent) || 'Сохранено')}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 border-r border-[var(--cms-divider)] flex flex-col bg-[var(--cms-sidebar-bg)] backdrop-blur-2xl z-20 relative transition-colors">
          <div className="p-8 border-b border-[var(--cms-divider)] flex items-center gap-4">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center shadow-2xl shadow-blue-900/40">
              <Settings size={22} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black tracking-tighter text-[var(--cms-text-main)] text-xl leading-none">{interpolate(localContent.ui?.cmsTitle, localContent) || 'CMS'}</span>
              <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest mt-1">v{localContent.legal?.version || '2.0.0'}</span>
            </div>
          </div>
          <nav
            className="flex-1 overflow-y-auto custom-scrollbar relative"
            onScroll={handleMenuScroll}
          >
            {tabGroups.map((group, gIdx) => (
              <div key={gIdx} className="mb-4">
                <div style={{
                  padding: '24px 20px 8px',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--cms-text-muted)',
                  userSelect: 'none'
                }}>
                  {group.title}
                </div>
                <div className="px-4 space-y-1">
                  {group.tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 border ${activeTab === tab.id ? 'bg-[var(--cms-active-tab)] border-blue-500/20 text-blue-400 shadow-lg shadow-blue-900/5' : 'border-transparent text-[var(--cms-text-muted)] hover:text-[var(--cms-text-main)] hover:bg-[var(--cms-input-bg)]'}`}
                    >
                      <span className={`${activeTab === tab.id ? 'text-blue-400' : 'text-[var(--cms-text-muted)]'}`}>{tab.icon}</span>
                      <span className="font-bold text-[10px] uppercase tracking-[0.2em]">{tab.label}</span>
                      {activeTab === tab.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {!menuScrollEnd && (
            <div style={{
              position: 'absolute',
              bottom: '80px', // Above the logout button
              left: 0,
              right: 0,
              height: '60px',
              background: 'linear-gradient(transparent, var(--cms-bg))',
              pointerEvents: 'none',
              zIndex: 10
            }} />
          )}

          <div className="p-6 border-t border-[var(--cms-divider)]">
            <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 px-5 py-4 text-red-500/60 hover:text-red-400 hover:bg-red-500/5 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest border border-transparent hover:border-red-500/10">
              <LogOut size={16} /> {interpolate(localContent.ui?.cmsLogout, localContent) || 'Выход из системы'}
            </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden relative">
          <div className="flex-1 overflow-y-auto p-12 custom-scrollbar relative z-10 min-h-0 bg-[var(--cms-bg)] transition-colors">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.05),transparent)] pointer-events-none"></div>
            <div className="max-w-4xl mx-auto pb-24 relative z-10">
            {activeTab === 'structure' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-6 mb-12">
                  <div className="bg-blue-600/5 border border-blue-500/20 p-6 rounded-3xl">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2">{interpolate(localContent.ui?.cmsBuildStatus, localContent) || 'Build Status'}</p>
                    <p className="text-xl font-black text-[var(--cms-text-main)] leading-none">STABLE</p>
                  </div>
                  <div className="bg-[var(--cms-card-bg)] border border-[var(--cms-card-border)] p-6 rounded-3xl">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--cms-text-muted)] mb-2">{interpolate(localContent.ui?.cmsActiveSections, localContent) || 'Active Sections'}</p>
                    <p className="text-xl font-black text-[var(--cms-text-main)] leading-none">{localContent.sections.filter(s => s.enabled).length} / {localContent.sections.length}</p>
                  </div>
                  <div className="bg-[var(--cms-card-bg)] border border-[var(--cms-card-border)] p-6 rounded-3xl">
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--cms-text-muted)] mb-2">{interpolate(localContent.ui?.cmsLegalCompliance, localContent) || 'Legal Compliance'}</p>
                    <p className="text-xl font-black text-green-500 leading-none">100% READY</p>
                  </div>
                </div>

                <div className="mb-8 ml-2">
                  <h4 className="text-xl font-black text-[var(--cms-text-main)] mb-2 tracking-tight">{interpolate(localContent.ui?.cmsSectionManagement, localContent) || 'Управление секциями'}</h4>
                  <p className="text-xs text-[var(--cms-text-muted)] font-medium tracking-wide">{interpolate(localContent.ui?.cmsSectionHint, localContent) || 'Перетаскивайте и скрывайте блоки лендинга'}</p>
                </div>
                {localContent.sections.map((section, idx) => (
                  <div key={section.id} className="bg-[var(--cms-card-bg)] p-5 rounded-2xl border border-[var(--cms-card-border)] flex items-center justify-between group transition-all hover:border-blue-500/40 hover:bg-[var(--cms-input-bg)] shadow-xl">
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col gap-1.5">
                        <button onClick={() => moveItem('sections', idx, -1)} className="p-1 text-[var(--cms-text-muted)] hover:text-blue-400 disabled:opacity-10 transition-colors" title="Перетащите разделы чтобы изменить порядок на сайте и в навигации" disabled={idx === 0}><ArrowUp size={16}/></button>
                        <button onClick={() => moveItem('sections', idx, 1)} className="p-1 text-[var(--cms-text-muted)] hover:text-blue-400 disabled:opacity-10 transition-colors" title="Перетащите разделы чтобы изменить порядок на сайте и в навигации" disabled={idx === localContent.sections.length - 1}><ArrowDown size={16}/></button>
                      </div>
                      <div>
                        <span className="font-black text-[11px] uppercase tracking-[0.2em] text-[var(--cms-text-label)] group-hover:text-[var(--cms-text-main)] transition-colors">{section.label}</span>
                        <p className="text-[9px] text-[var(--cms-text-muted)] font-bold uppercase tracking-widest mt-1 opacity-60">ID: {section.id}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newSections = [...localContent.sections];
                        newSections[idx].enabled = !newSections[idx].enabled;
                        updateNested('sections', newSections);
                      }}
                      className={`p-3 rounded-xl transition-all border ${section.enabled ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-[var(--cms-input-bg)] border-[var(--cms-input-border)] text-[var(--cms-text-muted)] opacity-50'}`}
                    >
                      {section.enabled ? <Eye size={20}/> : <EyeOff size={20}/>}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="space-y-8 animate-slow-fade">
                <div className="mb-8 ml-2">
                  <h4 className="text-xl font-black text-white mb-2 tracking-tight">{interpolate(localContent.ui?.cmsThemeTitle, localContent) || 'Цветовые схемы'}</h4>
                  <p className="text-xs text-slate-500 font-medium tracking-wide">{interpolate(localContent.ui?.cmsThemeSubtitle, localContent) || 'Настройка внешнего вида темной и светлой темы сайта'}</p>
                </div>

                <SectionCard title={interpolate(localContent.ui?.cmsThemeDark, localContent) || 'Темная тема (Dark Mode)'} icon={<Palette size={18}/>} tooltip="Цвета используемые когда на сайте включена темная тема">
                  <div className="grid grid-cols-2 gap-x-8">
                    <InputField label="Основной фон" value={localContent.theme?.dark?.primary} onChange={(val) => updateNested('theme.dark.primary', val)} />
                    <InputField label="Вторичный фон" value={localContent.theme?.dark?.secondary} onChange={(val) => updateNested('theme.dark.secondary', val)} />
                    <InputField label="Акцент (От)" value={localContent.theme?.dark?.accentFrom} onChange={(val) => updateNested('theme.dark.accentFrom', val)} />
                    <InputField label="Акцент (До)" value={localContent.theme?.dark?.accentTo} onChange={(val) => updateNested('theme.dark.accentTo', val)} />
                    <InputField label="Цвет текста" value={localContent.theme?.dark?.textMain} onChange={(val) => updateNested('theme.dark.textMain', val)} />
                    <InputField label="Приглушенный текст" value={localContent.theme?.dark?.textMuted} onChange={(val) => updateNested('theme.dark.textMuted', val)} />
                  </div>
                </SectionCard>

                <SectionCard title={interpolate(localContent.ui?.cmsThemeLight, localContent) || 'Светлая тема (Light Mode)'} icon={<Palette size={18}/>} tooltip="Цвета используемые когда на сайте включена светлая тема">
                  <div className="grid grid-cols-2 gap-x-8">
                    <InputField label="Основной фон" value={localContent.theme?.light?.primary} onChange={(val) => updateNested('theme.light.primary', val)} />
                    <InputField label="Вторичный фон" value={localContent.theme?.light?.secondary} onChange={(val) => updateNested('theme.light.secondary', val)} />
                    <InputField label="Акцент (От)" value={localContent.theme?.light?.accentFrom} onChange={(val) => updateNested('theme.light.accentFrom', val)} />
                    <InputField label="Акцент (До)" value={localContent.theme?.light?.accentTo} onChange={(val) => updateNested('theme.light.accentTo', val)} />
                    <InputField label="Цвет текста" value={localContent.theme?.light?.textMain} onChange={(val) => updateNested('theme.light.textMain', val)} />
                    <InputField label="Приглушенный текст" value={localContent.theme?.light?.textMuted} onChange={(val) => updateNested('theme.light.textMuted', val)} />
                  </div>
                </SectionCard>

                <SectionCard title={interpolate(localContent.ui?.cmsThemeDefault, localContent) || 'Тема по умолчанию'} icon={<Settings size={18}/>}>
                  <div className="mb-4">
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2.5 ml-1">Стартовая тема</label>
                    <select
                      value={localContent.defaultTheme || 'dark'}
                      onChange={(e) => updateNested('defaultTheme', e.target.value)}
                      className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-medium"
                    >
                      <option value="dark">{interpolate(localContent.ui?.cmsThemeDark, localContent) || 'Темная тема'}</option>
                      <option value="light">{interpolate(localContent.ui?.cmsThemeLight, localContent) || 'Светлая тема'}</option>
                    </select>
                    <p className="text-[9px] text-slate-500 mt-2 ml-1 italic">Тема которую увидит посетитель при первом открытии сайта</p>
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === 'brand' && (
              <div className="space-y-8 animate-slow-fade">
                <SectionCard title={interpolate(localContent.ui?.cmsBrandTitle, localContent) || 'Логотип и название'} icon={<LayoutDashboard size={18}/>} tooltip={interpolate(localContent.ui?.cmsBrandSubtitle, localContent) || 'Настройка основного брендинга компании'}>
                  <div className="grid grid-cols-2 gap-x-8">
                    <div>
                      <InputField label="Название (logoText)" value={localContent.logoText} onChange={(val) => updateNested('logoText', val)} />
                      <p className="text-[9px] text-slate-500 -mt-4 ml-1 mb-6 italic">Отображается в шапке сайта</p>
                    </div>
                    <div>
                      <InputField label="Слоган (companyTagline)" value={localContent.companyTagline} onChange={(val) => updateNested('companyTagline', val)} />
                      <p className="text-[9px] text-slate-500 -mt-4 ml-1 mb-6 italic">Строка под названием в логотипе</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-12 pt-4 border-t border-slate-900/50">
                    <div className="space-y-6">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-4">{interpolate(localContent.ui?.cmsLogoHeader, localContent) || 'Масштаб логотипа (Шапка)'}</label>
                      <div className="flex items-center gap-6">
                        <input
                          type="range"
                          min="0.5"
                          max="2.5"
                          step="0.1"
                          value={localContent.logoScaleHeader || 1.4}
                          onChange={(e) => updateNested('logoScaleHeader', parseFloat(e.target.value))}
                          className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <span className="text-xs font-mono font-bold text-white bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">{localContent.logoScaleHeader}x</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-4">{interpolate(localContent.ui?.cmsLogoFooter, localContent) || 'Масштаб логотипа (Подвал)'}</label>
                      <div className="flex items-center gap-6">
                        <input
                          type="range"
                          min="0.5"
                          max="2.5"
                          step="0.1"
                          value={localContent.logoScaleFooter || 1.2}
                          onChange={(e) => updateNested('logoScaleFooter', parseFloat(e.target.value))}
                          className="flex-1 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <span className="text-xs font-mono font-bold text-white bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">{localContent.logoScaleFooter}x</span>
                      </div>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title={interpolate(localContent.ui?.cmsRegionBadge, localContent) || 'Метка региона'} icon={<MapPin size={18}/>} tooltip="Статичная метка над логотипом в шапке и подвале">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-slate-900/30 p-4 rounded-xl border border-slate-800/50 mb-4">
                      <input
                        type="checkbox"
                        checked={localContent.regionBadge?.enabled}
                        onChange={(e) => updateNested('regionBadge.enabled', e.target.checked)}
                        className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-blue-600"
                      />
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{interpolate(localContent.ui?.cmsShowBadge, localContent) || 'Показывать метку'}</label>
                    </div>

                    <InputField label="Текст метки" value={localContent.regionBadge?.text} onChange={(val) => updateNested('regionBadge.text', val)} />

                    {localContent.regionBadge?.enabled && (
                      <div className="space-y-3 animate-slow-fade">
                        <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Стиль отображения</label>
                        <div className="flex gap-4">
                          {[
                            { id: 'text', label: 'Текстовая метка' },
                            { id: 'badge', label: 'Pill-badge' }
                          ].map(s => (
                            <button
                              key={s.id}
                              onClick={() => updateNested('regionBadge.style', s.id === 'text' ? 'text' : 'badge')}
                              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all ${
                                (localContent.regionBadge?.style || 'badge') === (s.id === 'text' ? 'text' : 'badge')
                                  ? 'bg-blue-600/10 border-blue-500/20 text-blue-400 shadow-lg'
                                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </SectionCard>

                <SectionCard title={interpolate(localContent.ui?.cmsSocialsTitle, localContent) || 'Соцсети'} icon={<Send size={18}/>} tooltip="Настройка ссылок на социальные сети компании">
                  <div className="flex items-center gap-3 bg-slate-900/30 p-4 rounded-xl border border-slate-800/50 mb-8">
                    <input
                      type="checkbox"
                      checked={localContent.ui?.showSocials}
                      onChange={(e) => updateNested('ui.showSocials', e.target.checked)}
                      className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-blue-600"
                    />
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{interpolate(localContent.ui?.cmsShowSocials, localContent) || 'Показывать соцсети'}</label>
                  </div>

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
                    <button onClick={() => updateNested('socialsList', [...(localContent.socialsList || []), { label: 'New', icon: 'Send', url: 'https://' }])} className="w-full py-6 rounded-3xl border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 transition-all flex items-center justify-center gap-3"><Plus size={20}/> {interpolate(localContent.ui?.cmsAddSocial, localContent) || 'Добавить соцсеть'}</button>
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-8 animate-slow-fade">
                <div className="flex gap-2 p-1 bg-slate-900/50 rounded-2xl border border-slate-800/50 mb-8 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'hero', label: interpolate(localContent.ui?.cmsContentHero, localContent) || 'Hero' },
                    { id: 'stats', label: interpolate(localContent.ui?.cmsContentStats, localContent) || 'Статистика' },
                    { id: 'features', label: interpolate(localContent.ui?.cmsContentFeatures, localContent) || 'Преимущества' },
                    { id: 'services', label: interpolate(localContent.ui?.cmsContentServices, localContent) || 'Услуги' },
                    { id: 'process', label: interpolate(localContent.ui?.cmsContentProcess, localContent) || 'Процесс' },
                    { id: 'bpo', label: interpolate(localContent.ui?.cmsContentBPO, localContent) || 'БПО' },
                    { id: 'geography', label: interpolate(localContent.ui?.cmsContentGeography, localContent) || 'Охват' },
                    { id: 'clients', label: interpolate(localContent.ui?.cmsContentClients, localContent) || 'Клиенты' },
                    { id: 'news', label: interpolate(localContent.ui?.cmsContentNews, localContent) || 'Новости' },
                    { id: 'faq', label: interpolate(localContent.ui?.cmsContentFAQ, localContent) || 'FAQ' },
                  ].map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => setContentSubTab(sub.id)}
                      className={`px-4 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all whitespace-nowrap ${
                        contentSubTab === sub.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>

                {contentSubTab === 'hero' && (
                  <div className="space-y-8 animate-slow-fade">
                    <SectionCard title={interpolate(localContent.ui?.cmsContentHero, localContent) || 'Главный экран (Hero)'} icon={<LayoutDashboard size={18}/>} tooltip="Настройка текстов и кнопок первого экрана сайта">
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
                            className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm font-medium h-40 resize-none shadow-inner"
                          />
                        </div>
                      </div>
                    </SectionCard>

                    <SectionCard title="Настройки прямой линии" icon={<Zap size={18}/>} tooltip="Управление статусом и графиком работы телефона на главном экране">
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
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Автоматический график</label>
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <InputField label="Начало работы (час, 0-23)" type="number" value={localContent.hotlineConfig?.startHour} onChange={(val) => updateNested('hotlineConfig.startHour', parseInt(val))} />
                        <InputField label="Конец работы (час, 0-23)" type="number" value={localContent.hotlineConfig?.endHour} onChange={(val) => updateNested('hotlineConfig.endHour', parseInt(val))} />
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <InputField label="Текст статуса (Онлайн)" value={localContent.hotlineConfig?.statusOnline} onChange={(val) => updateNested('hotlineConfig.statusOnline', val)} />
                        <InputField label="Текст статуса (Офлайн)" value={localContent.hotlineConfig?.statusOffline} onChange={(val) => updateNested('hotlineConfig.statusOffline', val)} />
                      </div>
                    </SectionCard>
                  </div>
                )}

                {contentSubTab === 'stats' && (
                  <div className="grid grid-cols-2 gap-6 animate-slow-fade">
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
                    <button onClick={() => updateNested('stats', [...(localContent.stats || []), { val: 0, prefix: '', suffix: '', label: 'Новый показатель' }])} className="col-span-2 py-6 rounded-3xl border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 hover:border-blue-500/40 hover:bg-blue-500/5 font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3"><Plus size={20}/> {interpolate(localContent.ui?.cmsAddStat, localContent) || 'Добавить показатель'}</button>
                  </div>
                )}

                {contentSubTab === 'features' && (
                  <div className="space-y-6 animate-slow-fade">
                    <SectionCard title={interpolate(localContent.ui?.cmsContentFeatures, localContent) || 'Заголовки секции'} icon={<FileText size={18}/>} tooltip="Настройка текстов и кнопок в блоке преимуществ">
                      <div className="grid grid-cols-2 gap-8">
                        <InputField label="Заголовок" value={localContent.features?.title} onChange={(val) => updateNested('features.title', val)} />
                        <InputField label="Акцентное слово" value={localContent.features?.accent} onChange={(val) => updateNested('features.accent', val)} />
                      </div>
                      <InputField label="Подзаголовок секции" value={localContent.features?.subtitle} onChange={(val) => updateNested('features.subtitle', val)} />
                      <div className="mt-8 pt-8 border-t border-slate-900/50">
                        <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <Zap size={14} /> Кнопка призыва (CTA)
                        </h4>
                        <div className="grid grid-cols-2 gap-x-8">
                          <InputField label="Текст кнопки" value={localContent.features?.ctaText} onChange={(val) => updateNested('features.ctaText', val)} />
                          <div className="flex items-center gap-3 bg-slate-900/30 px-4 py-3 rounded-xl border border-slate-800/50 mb-6">
                            <input
                              type="checkbox"
                              checked={localContent.features?.ctaVisible}
                              onChange={(e) => updateNested('features.ctaVisible', e.target.checked)}
                              className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600"
                            />
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Показать кнопку</label>
                          </div>
                        </div>
                      </div>
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
                    <button onClick={() => updateNested('features.items', [...(localContent.features?.items || []), { icon: 'Check', title: 'Новое преимущество', desc: 'Описание...' }])} className="w-full py-6 rounded-3xl border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 hover:border-blue-500/40 hover:bg-blue-500/5 font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3"><Plus size={20}/> {interpolate(localContent.ui?.cmsAddFeature, localContent) || 'Добавить преимущество'}</button>
                  </div>
                )}

                {contentSubTab === 'services' && (
                  <div className="space-y-6 animate-slow-fade">
                    <SectionCard title={interpolate(localContent.ui?.cmsContentServices, localContent) || 'Заголовки секции'} icon={<Phone size={18}/>} tooltip="Настройка блока перечня услуг">
                      <div className="grid grid-cols-2 gap-8">
                        <InputField label="Заголовок" value={localContent.services?.title} onChange={(val) => updateNested('services.title', val)} />
                        <InputField label="Акцентное слово" value={localContent.services?.accent} onChange={(val) => updateNested('services.accent', val)} />
                      </div>
                      <InputField label="Подзаголовок" value={localContent.services?.subtitle} onChange={(val) => updateNested('services.subtitle', val)} />
                      <InputField label="Текст кнопки (по умолчанию)" value={localContent.services?.btnLabel} onChange={(val) => updateNested('services.btnLabel', val)} />
                      <div className="mt-8 pt-8 border-t border-slate-900/50">
                        <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <Zap size={14} /> Кнопка призыва (CTA)
                        </h4>
                        <div className="grid grid-cols-2 gap-x-8">
                          <InputField label="Текст кнопки" value={localContent.services?.ctaText} onChange={(val) => updateNested('services.ctaText', val)} />
                          <div className="flex items-center gap-3 bg-slate-900/30 px-4 py-3 rounded-xl border border-slate-800/50 mb-6">
                            <input
                              type="checkbox"
                              checked={localContent.services?.ctaVisible}
                              onChange={(e) => updateNested('services.ctaVisible', e.target.checked)}
                              className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600"
                            />
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Показать кнопку</label>
                          </div>
                        </div>
                      </div>
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
                    <button onClick={() => updateNested('services.list', [...(localContent.services?.list || []), { title: 'Новая услуга', badge: 'Тариф', features: [], button: 'Заказать', popular: false }])} className="w-full py-6 border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 hover:border-blue-500/40 font-black text-[10px] uppercase tracking-[0.3em] transition-all rounded-3xl flex items-center justify-center gap-3"><Plus size={20}/> {interpolate(localContent.ui?.cmsAddService, localContent) || 'Добавить услугу'}</button>
                  </div>
                )}

                {contentSubTab === 'process' && (
                  <div className="space-y-6 animate-slow-fade">
                    <SectionCard title={interpolate(localContent.ui?.cmsContentProcess, localContent) || 'Заголовки секции'} icon={<Zap size={18}/>} tooltip="Настройка этапов работы компании">
                      <div className="grid grid-cols-2 gap-8">
                        <InputField label="Заголовок" value={localContent.process?.title} onChange={(val) => updateNested('process.title', val)} />
                        <InputField label="Акцентное слово" value={localContent.process?.accent} onChange={(val) => updateNested('process.accent', val)} />
                      </div>
                      <div className="grid grid-cols-2 gap-8">
                        <InputField label="Подзаголовок" value={localContent.process?.subtitle} onChange={(val) => updateNested('process.subtitle', val)} />
                        <InputField label="Префикс шага (Шаг, Step)" value={localContent.process?.stepLabel} onChange={(val) => updateNested('process.stepLabel', val)} />
                      </div>
                      <div className="mt-8 pt-8 border-t border-slate-900/50">
                        <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <Zap size={14} /> Кнопка призыва (CTA)
                        </h4>
                        <div className="grid grid-cols-2 gap-x-8">
                          <InputField label="Текст кнопки" value={localContent.process?.ctaText} onChange={(val) => updateNested('process.ctaText', val)} />
                          <div className="flex items-center gap-3 bg-slate-900/30 px-4 py-3 rounded-xl border border-slate-800/50 mb-6">
                            <input
                              type="checkbox"
                              checked={localContent.process?.ctaVisible}
                              onChange={(e) => updateNested('process.ctaVisible', e.target.checked)}
                              className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600"
                            />
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Показать кнопку</label>
                          </div>
                        </div>
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
                        <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-[var(--cms-text-label)] mb-2.5 ml-1">Описание действия</label>
                        <textarea value={step.desc} onChange={(e) => {
                          const newS = localContent.process.steps.map((s, i) => i === idx ? { ...s, desc: e.target.value } : s);
                          updateNested('process.steps', newS);
                        }} className="w-full bg-[var(--cms-input-bg)] border border-[var(--cms-input-border)] rounded-xl px-5 py-4 text-[var(--cms-text-main)] text-sm font-medium h-24 resize-none shadow-inner transition-all focus:ring-2 focus:ring-blue-500/50 outline-none" />
                      </div>
                    ))}
                    <button onClick={() => updateNested('process.steps', [...localContent.process.steps, { step: '04', title: 'Новый этап', desc: 'Описание...' }])} className="w-full py-6 border-2 border-dashed border-[var(--cms-divider)] text-[var(--cms-text-muted)] hover:text-blue-500 hover:border-blue-500/40 font-black text-[10px] uppercase tracking-[0.3em] transition-all rounded-3xl flex items-center justify-center gap-3"><Plus size={20}/> {interpolate(localContent.ui?.cmsAddStep, localContent) || 'Добавить этап'}</button>
                  </div>
                )}

                {contentSubTab === 'bpo' && (
                  <div className="space-y-6 animate-slow-fade">
                    <SectionCard title={interpolate(localContent.ui?.cmsContentBPO, localContent) || 'Бесконвертное Почтовое Отправление (БПО)'} icon={<FileText size={18}/>} tooltip="Настройка раздела посвященного технологии БПО">
                      <div className="grid grid-cols-2 gap-8">
                        <InputField label="Заголовок" value={localContent.bpo?.title} onChange={(val) => updateNested('bpo.title', val)} />
                        <InputField label="Акцентное слово" value={localContent.bpo?.accent} onChange={(val) => updateNested('bpo.accent', val)} />
                      </div>
                      <InputField label="Подзаголовок" value={localContent.bpo?.subtitle} onChange={(val) => updateNested('bpo.subtitle', val)} />
                      <InputField label="Юридическая сноска" value={localContent.bpo?.legalNote} onChange={(val) => updateNested('bpo.legalNote', val)} />
                      <div className="mt-8 pt-8 border-t border-[var(--cms-divider)]">
                        <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <Zap size={14} /> Кнопка призыва (CTA)
                        </h4>
                        <div className="grid grid-cols-2 gap-x-8">
                          <InputField label="Текст кнопки" value={localContent.bpo?.ctaText} onChange={(val) => updateNested('bpo.ctaText', val)} />
                          <div className="flex items-center gap-3 bg-[var(--cms-bg-secondary)] px-4 py-3 rounded-xl border border-[var(--cms-divider)] mb-6">
                            <input
                              type="checkbox"
                              checked={localContent.bpo?.ctaVisible}
                              onChange={(e) => updateNested('bpo.ctaVisible', e.target.checked)}
                              className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600"
                            />
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cms-text-label)]">Показать кнопку</label>
                          </div>
                        </div>
                      </div>
                    </SectionCard>

                    <div className="mb-6 ml-2">
                      <h4 className="text-[10px] font-black text-[var(--cms-text-main)] uppercase tracking-widest opacity-60">Технологические этапы</h4>
                    </div>
                    {(localContent.bpo?.steps || []).map((step, idx) => (
                      <div key={idx} className="bg-[var(--cms-card-bg)] p-8 rounded-3xl border border-[var(--cms-card-border)] relative group mb-4 shadow-xl">
                        <button onClick={() => {
                          const newS = [...(localContent.bpo?.steps || [])];
                          newS.splice(idx, 1);
                          updateNested('bpo.steps', newS);
                        }} className="absolute top-6 right-6 p-2 text-[var(--cms-text-muted)] hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
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
                    <button onClick={() => updateNested('bpo.steps', [...(localContent.bpo?.steps || []), { num: '0' + ((localContent.bpo?.steps?.length || 0) + 1), title: 'Новый этап', desc: 'Описание этапа БПО...' }])} className="w-full py-6 rounded-3xl border-2 border-dashed border-[var(--cms-divider)] text-[var(--cms-text-muted)] hover:text-blue-500 transition-all flex items-center justify-center gap-3 mb-8 shadow-xl"><Plus size={20}/> {interpolate(localContent.ui?.cmsAddStep, localContent) || 'Добавить этап БПО'}</button>

                    <SectionCard title="Преимущества БПО" icon={<Check size={18}/>} tooltip="Короткий список ключевых преимуществ технологии">
                      {(localContent.bpo?.advantages || []).map((adv, idx) => (
                        <div key={idx} className="flex gap-3 mb-3">
                          <input
                            value={adv}
                            onChange={(e) => {
                              const newA = localContent.bpo.advantages.map((a, i) => i === idx ? e.target.value : a);
                              updateNested('bpo.advantages', newA);
                            }}
                            className="flex-1 bg-[var(--cms-input-bg)] border border-[var(--cms-input-border)] rounded-xl px-4 py-2.5 text-[var(--cms-text-main)] text-xs font-medium focus:ring-1 focus:ring-blue-500/30 outline-none transition-all focus:border-blue-500/50"
                          />
                          <button onClick={() => {
                            const newA = localContent.bpo.advantages.filter((_, i) => i !== idx);
                            updateNested('bpo.advantages', newA);
                          }} className="p-2 text-[var(--cms-text-muted)] hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                        </div>
                      ))}
                      <button onClick={() => updateNested('bpo.advantages', [...(localContent.bpo?.advantages || []), 'Новое преимущество БПО']) } className="text-[9px] font-black text-blue-500 uppercase tracking-[0.2em] hover:text-blue-400 transition-colors pt-4 flex items-center gap-2"><Plus size={14} /> Добавить преимущество</button>
                    </SectionCard>
                  </div>
                )}

                {contentSubTab === 'geography' && (
                  <div className="space-y-6 animate-slow-fade">
                    <SectionCard title="Зона покрытия и Охват" icon={<MapPin size={18}/>} tooltip="Настройка визуализации карты и списка городов">
                      <div className="grid grid-cols-2 gap-8">
                        <InputField label="Основной заголовок" value={localContent.serviceArea?.title} onChange={(val) => updateNested('serviceArea.title', val)} />
                        <InputField label="Акцент заголовка" value={localContent.serviceArea?.accent} onChange={(val) => updateNested('serviceArea.accent', val)} />
                      </div>
                      <div className="mb-6">
                        <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-[var(--cms-text-label)] mb-2.5 ml-1">Подзаголовок раздела</label>
                        <textarea
                          value={localContent.serviceArea?.subtitle}
                          onChange={(e) => updateNested('serviceArea.subtitle', e.target.value)}
                          className="w-full bg-[var(--cms-input-bg)] border border-[var(--cms-input-border)] rounded-xl px-5 py-4 text-[var(--cms-text-main)] focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm font-medium h-24 resize-none shadow-inner"
                        />
                      </div>
                      <InputField label="Заметка о собственной сети" value={localContent.serviceArea?.ownNetworkNote} onChange={(val) => updateNested('serviceArea.ownNetworkNote', val)} />

                      <div className="flex items-center gap-3 bg-[var(--cms-bg-secondary)] p-4 rounded-2xl border border-[var(--cms-divider)] mb-6">
                        <input
                          type="checkbox"
                          checked={localContent.serviceArea?.randomMapVariant}
                          onChange={(e) => updateNested('serviceArea.randomMapVariant', e.target.checked)}
                          className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500/20"
                        />
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cms-text-label)]">Случайный стиль при загрузке страницы</label>
                      </div>

                      {!localContent.serviceArea?.randomMapVariant && (
                        <div className="mb-4 animate-slow-fade">
                          <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-[var(--cms-text-label)] mb-2.5 ml-1">Вариант карты (Визуализация)</label>
                          <select
                            value={localContent.serviceArea?.mapVariant || 'default'}
                            onChange={(e) => updateNested('serviceArea.mapVariant', e.target.value)}
                            className="w-full bg-[var(--cms-input-bg)] border border-[var(--cms-input-border)] rounded-xl px-5 py-3.5 text-[var(--cms-text-main)] focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-medium"
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
                      <h4 className="text-[10px] font-black text-[var(--cms-text-main)] uppercase tracking-widest opacity-60">Список населенных пунктов</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {(localContent.serviceArea?.locations || []).map((loc, idx) => (
                        <div key={idx} className="bg-[var(--cms-card-bg)] p-6 rounded-2xl border border-[var(--cms-card-border)] relative group shadow-xl">
                          <button onClick={() => {
                            const newL = localContent.serviceArea.locations.filter((_, i) => i !== idx);
                            updateNested('serviceArea.locations', newL);
                          }} className="absolute top-4 right-4 p-2 text-[var(--cms-text-muted)] hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                          <InputField label="Название города/района" value={loc.name} onChange={(val) => {
                            const newL = localContent.serviceArea.locations.map((l, i) => i === idx ? { ...l, name: val } : l);
                            updateNested('serviceArea.locations', newL);
                          }} />
                          <div className="grid grid-cols-2 gap-4">
                            <InputField label="Тип покрытия / Текст" value={loc.type} onChange={(val) => {
                              const newL = localContent.serviceArea.locations.map((l, i) => i === idx ? { ...l, type: val } : l);
                              updateNested('serviceArea.locations', newL);
                            }} />
                            <div className="mb-6">
                              <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-[var(--cms-text-label)] mb-2.5 ml-1">Статус</label>
                              <select
                                value={loc.status || 'works'}
                                onChange={(e) => {
                                  const newL = localContent.serviceArea.locations.map((l, i) => i === idx ? { ...l, status: e.target.value } : l);
                                  updateNested('serviceArea.locations', newL);
                                }}
                                className="w-full bg-[var(--cms-input-bg)] border border-[var(--cms-input-border)] rounded-xl px-5 py-3.5 text-[var(--cms-text-main)] focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm font-medium shadow-inner"
                              >
                                <option value="works">Работаем</option>
                                <option value="inProgress">В проработке</option>
                                <option value="setup">Настраиваем</option>
                                <option value="partner">Ищем партнёров</option>
                                <option value="soon">Скоро запуск</option>
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <InputField label="Частота (напр. Ежедневно)" value={loc.freq} onChange={(val) => {
                              const newL = localContent.serviceArea.locations.map((l, i) => i === idx ? { ...l, freq: val } : l);
                              updateNested('serviceArea.locations', newL);
                            }} />
                            <div className="flex items-center gap-3 bg-[var(--cms-bg-secondary)] px-4 py-3 rounded-xl border border-[var(--cms-divider)] mb-6">
                              <input
                                type="checkbox"
                                checked={loc.isVisible !== false}
                                onChange={(e) => {
                                  const newL = localContent.serviceArea.locations.map((l, i) => i === idx ? { ...l, isVisible: e.target.checked } : l);
                                  updateNested('serviceArea.locations', newL);
                                }}
                                className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500/20"
                              />
                              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cms-text-label)]">Виден на сайте</label>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button onClick={() => updateNested('serviceArea.locations', [...(localContent.serviceArea?.locations || []), { name: 'Новый город', type: 'Локальная сеть', status: 'works', freq: 'Ежедневно', isVisible: true }])} className="p-6 border-2 border-dashed border-[var(--cms-divider)] text-[var(--cms-text-muted)] hover:text-blue-500 hover:border-blue-500/40 font-black text-[10px] uppercase tracking-[0.3em] transition-all rounded-2xl flex items-center justify-center gap-3 shadow-xl"><Plus size={20}/> Добавить город</button>
                    </div>
                  </div>
                )}

                {contentSubTab === 'clients' && (
                  <div className="space-y-6 animate-slow-fade">
                    <SectionCard title="Настройки раздела" icon={<Check size={18}/>} tooltip="Управление списком логотипов и данными клиентов">
                      <div className="grid grid-cols-2 gap-8">
                        <InputField label="Заголовок" value={localContent.trustedClients?.title} onChange={(val) => updateNested('trustedClients.title', val)} />
                        <InputField label="Подзаголовок" value={localContent.trustedClients?.subtitle} onChange={(val) => updateNested('trustedClients.subtitle', val)} />
                      </div>
                      <div className="flex items-center gap-3 bg-[var(--cms-bg-secondary)] px-4 py-3 rounded-xl border border-[var(--cms-divider)] mb-6">
                        <input
                          type="checkbox"
                          checked={localContent.trustedClients?.subtitleVisible}
                          onChange={(e) => updateNested('trustedClients.subtitleVisible', e.target.checked)}
                          className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600"
                        />
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cms-text-label)]">Показать подзаголовок</label>
                      </div>
                      <div className="mt-8 pt-8 border-t border-[var(--cms-divider)]">
                        <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <Zap size={14} /> Кнопка призыва (CTA)
                        </h4>
                        <div className="grid grid-cols-2 gap-x-8">
                          <InputField label="Текст кнопки" value={localContent.trustedClients?.ctaText} onChange={(val) => updateNested('trustedClients.ctaText', val)} />
                          <div className="flex items-center gap-3 bg-[var(--cms-bg-secondary)] px-4 py-3 rounded-xl border border-[var(--cms-divider)] mb-6">
                            <input
                              type="checkbox"
                              checked={localContent.trustedClients?.ctaVisible}
                              onChange={(e) => updateNested('trustedClients.ctaVisible', e.target.checked)}
                              className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600"
                            />
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cms-text-label)]">Показать кнопку</label>
                          </div>
                        </div>
                      </div>
                    </SectionCard>

                    <div className="mb-6 ml-2 flex items-center justify-between">
                      <h4 className="text-[10px] font-black text-[var(--cms-text-main)] uppercase tracking-widest opacity-60">Список клиентов</h4>
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
                      <div key={client.id || idx} className="bg-[var(--cms-card-bg)] p-8 rounded-3xl border border-[var(--cms-card-border)] relative group mb-4 shadow-xl">
                        <div className="absolute top-6 right-6 flex gap-2">
                          <button onClick={() => moveItem('trustedClients.items', idx, -1)} className="p-2 text-[var(--cms-text-muted)] hover:text-blue-500 disabled:opacity-10" disabled={idx === 0}><ArrowUp size={16}/></button>
                          <button onClick={() => moveItem('trustedClients.items', idx, 1)} className="p-2 text-[var(--cms-text-muted)] hover:text-blue-500 disabled:opacity-10" disabled={idx === (localContent.trustedClients?.items?.length || 0) - 1}><ArrowDown size={16}/></button>
                          <button
                            onClick={() => {
                              const newItems = localContent.trustedClients.items.filter((_, i) => i !== idx);
                              updateNested('trustedClients.items', newItems);
                            }}
                            className="p-2 text-[var(--cms-text-muted)] hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18}/>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
                          <div className="col-span-1">
                            <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-[var(--cms-text-label)] mb-2.5 ml-1">Логотип</label>
                            <div className="relative group/logo w-full aspect-square bg-[var(--cms-input-bg)] rounded-2xl border border-[var(--cms-input-border)] flex items-center justify-center overflow-hidden">
                              {client.logoUrl ? (
                                <img src={client.logoUrl} className="w-full h-full object-contain p-4" alt="" />
                              ) : (
                                <Upload size={24} className="text-[var(--cms-text-muted)]" />
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
                              <InputField label="Сайт (https://...)" value={client.url || client.website || ''} onChange={(val) => {
                                const newItems = localContent.trustedClients.items.map((item, i) => i === idx ? { ...item, url: val } : item);
                                updateNested('trustedClients.items', newItems);
                              }} />
                            </div>

                            <div className="flex items-center gap-3 bg-[var(--cms-bg-secondary)] px-4 py-3 rounded-xl border border-[var(--cms-divider)]">
                              <input
                                type="checkbox"
                                checked={client.isVisible !== false}
                                onChange={(e) => {
                                  const newItems = localContent.trustedClients.items.map((item, i) => i === idx ? { ...item, isVisible: e.target.checked } : item);
                                  updateNested('trustedClients.items', newItems);
                                }}
                                className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600"
                              />
                              <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cms-text-label)]">Показывать на сайте</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {contentSubTab === 'news' && (
                  <div className="space-y-6 animate-slow-fade">
                    <SectionCard title="Новости и события" icon={<Send size={18}/>} tooltip="Настройка ленты новостей компании">
                      <div className="grid grid-cols-2 gap-8">
                        <InputField label="Заголовок" value={localContent.news?.title} onChange={(val) => updateNested('news.title', val)} />
                        <InputField label="Акцентное слово" value={localContent.news?.accent} onChange={(val) => updateNested('news.accent', val)} />
                      </div>
                    </SectionCard>

                    {(localContent.news?.items || []).map((item, idx) => (
                      <div key={idx} className="bg-[var(--cms-card-bg)] p-8 rounded-3xl border border-[var(--cms-card-border)] relative group mb-4 shadow-xl">
                        <button onClick={() => {
                          const newI = [...(localContent.news?.items || [])];
                          newI.splice(idx, 1);
                          updateNested('news.items', newI);
                        }} className="absolute top-6 right-6 p-2 text-[var(--cms-text-muted)] hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
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
                        <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-[var(--cms-text-label)] mb-2.5 ml-1">Содержание</label>
                        <textarea value={item.desc} onChange={(e) => {
                          const newI = localContent.news.items.map((it, i) => i === idx ? { ...it, desc: e.target.value } : it);
                          updateNested('news.items', newI);
                        }} className="w-full bg-[var(--cms-input-bg)] border border-[var(--cms-input-border)] rounded-xl px-5 py-4 text-[var(--cms-text-main)] text-sm font-medium h-24 resize-none shadow-inner transition-all focus:ring-2 focus:ring-blue-500/50 outline-none" />
                      </div>
                    ))}
                    <button onClick={() => updateNested('news.items', [{ date: new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' }), tag: 'СОБЫТИЕ', title: 'Новое событие', desc: 'Описание события...' }, ...(localContent.news?.items || [])])} className="w-full py-6 rounded-3xl border-2 border-dashed border-[var(--cms-divider)] text-[var(--cms-text-muted)] hover:text-blue-500 transition-all flex items-center justify-center gap-3 shadow-xl"><Plus size={20}/> Добавить новость</button>
                  </div>
                )}

                {contentSubTab === 'faq' && (
                  <div className="space-y-6 animate-slow-fade">
                    <SectionCard title="Заголовки секции FAQ" icon={<HelpCircle size={18}/>} tooltip="Настройка часто задаваемых вопросов">
                      <div className="grid grid-cols-2 gap-8">
                        <InputField label="Заголовок" value={localContent.faq?.title} onChange={(val) => updateNested('faq.title', val)} />
                        <InputField label="Акцентное слово" value={localContent.faq?.accent} onChange={(val) => updateNested('faq.accent', val)} />
                      </div>
                      <div className="mt-8 pt-8 border-t border-slate-900/50">
                        <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                          <Zap size={14} /> Ссылка призыва (CTA)
                        </h4>
                        <div className="grid grid-cols-2 gap-x-8">
                          <InputField label="Текст ссылки" value={localContent.faq?.ctaText} onChange={(val) => updateNested('faq.ctaText', val)} />
                          <div className="flex items-center gap-3 bg-slate-900/30 px-4 py-3 rounded-xl border border-slate-800/50 mb-6">
                            <input
                              type="checkbox"
                              checked={localContent.faq?.ctaVisible}
                              onChange={(e) => updateNested('faq.ctaVisible', e.target.checked)}
                              className="w-5 h-5 rounded-md border-slate-700 bg-slate-800 text-blue-600"
                            />
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Показать ссылку</label>
                          </div>
                        </div>
                      </div>
                    </SectionCard>
                    {(localContent.faq?.items || []).map((item, idx) => (
                      <div key={idx} className="bg-slate-950/40 p-8 rounded-3xl border border-slate-800 relative group mb-4 shadow-lg">
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
                        }} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-white text-sm font-medium h-32 resize-none shadow-inner transition-all focus:ring-2 focus:ring-blue-500/50 outline-none" />
                      </div>
                    ))}
                    <button onClick={() => updateNested('faq.items', [...(localContent.faq?.items || []), { q: 'Новый вопрос?', a: 'Ответ на вопрос...' }])} className="w-full py-6 border-2 border-dashed border-slate-800 text-slate-600 hover:text-blue-500 hover:border-blue-500/40 font-black text-[10px] uppercase tracking-[0.3em] transition-all rounded-3xl flex items-center justify-center gap-3 shadow-xl"><Plus size={20}/> Добавить вопрос</button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="space-y-8 animate-slow-fade">
                <SectionCard title="Прямая линия" icon={<Phone size={18}/>} tooltip="Настройка основного телефона на главном экране">
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Номер телефона" value={localContent.hero?.hotlinePhone || localContent.phone} onChange={(val) => updateNested('hero.hotlinePhone', val)} />
                    <InputField label="Текст (Метка)" value={localContent.hero?.hotlineLabel} onChange={(val) => updateNested('hero.hotlineLabel', val)} />
                  </div>
                  <div className="grid grid-cols-2 gap-8 pt-4">
                    <div className="flex items-center gap-3 bg-[var(--cms-bg-secondary)] p-4 rounded-xl border border-[var(--cms-divider)]">
                      <input
                        type="checkbox"
                        checked={localContent.hotlineConfig?.showBadge}
                        onChange={(e) => updateNested('hotlineConfig.showBadge', e.target.checked)}
                        className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-blue-600"
                      />
                      <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cms-text-label)]">Показывать статус</label>
                    </div>
                    <div className="flex items-center gap-3 bg-[var(--cms-bg-secondary)] p-4 rounded-xl border border-[var(--cms-divider)]">
                      <input
                        type="checkbox"
                        checked={localContent.hotlineConfig?.scheduleEnabled}
                        onChange={(e) => updateNested('hotlineConfig.scheduleEnabled', e.target.checked)}
                        className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-blue-600"
                      />
                      <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cms-text-label)]">Авто-график</label>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Дополнительные телефоны" icon={<Phone size={18}/>} tooltip="Список телефонов отображаемых в футере и мобильном меню">
                  <div className="space-y-4">
                    {(localContent.contact?.phones || []).map((phone, idx) => (
                      <div key={idx} className="p-5 bg-[var(--cms-card-bg)] rounded-2xl border border-[var(--cms-card-border)] relative group flex items-end gap-6 shadow-xl">
                        <div className="flex-1 grid grid-cols-2 gap-6">
                          <InputField label={`Телефон #${idx + 1}`} value={phone.val} onChange={(val) => {
                            const newPhones = localContent.contact.phones.map((p, i) => i === idx ? { ...p, val } : p);
                            updateNested('contact.phones', newPhones);
                          }} />
                          <InputField label="Подпись" value={phone.label} onChange={(val) => {
                            const newPhones = localContent.contact.phones.map((p, i) => i === idx ? { ...p, label: val } : p);
                            updateNested('contact.phones', newPhones);
                          }} />
                        </div>
                        <div className="flex gap-2 pb-2">
                          <input type="checkbox" checked={phone.visible} onChange={(e) => {
                            const newPhones = localContent.contact.phones.map((p, i) => i === idx ? { ...p, visible: e.target.checked } : p);
                            updateNested('contact.phones', newPhones);
                          }} className="w-5 h-5 rounded bg-slate-800 text-blue-600" />
                          <button onClick={() => {
                            const newPhones = localContent.contact.phones.filter((_, i) => i !== idx);
                            updateNested('contact.phones', newPhones);
                          }} className="text-[var(--cms-text-muted)] hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => updateNested('contact.phones', [...(localContent.contact?.phones || []), { val: '', label: 'Офис', visible: true }])} className="w-full py-4 border-2 border-dashed border-[var(--cms-divider)] text-[var(--cms-text-muted)] hover:text-blue-500 transition-all rounded-xl flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest"><Plus size={16}/> Добавить телефон</button>
                  </div>
                </SectionCard>

                <SectionCard title="Email и Адрес" icon={<Mail size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Основной Email" value={localContent.email} onChange={(val) => updateNested('email', val)} />
                    <InputField label="Основной Телефон (Global)" value={localContent.phone} onChange={(val) => updateNested('phone', val)} />
                  </div>
                  <InputField label="Физический адрес" value={localContent.address} onChange={(val) => updateNested('address', val)} />
                </SectionCard>

                <SectionCard title="Настройка контактной формы" icon={<Send size={18}/>} tooltip="Управление полями, защитой от спама и доставкой заявок">
                  <div className="p-6 bg-[var(--cms-active-tab)] rounded-2xl border border-blue-500/10 mb-8 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Метод доставки</p>
                      <p className="text-xs text-[var(--cms-text-main)] font-bold">{deliveryConfig.method?.toUpperCase() || 'НЕ ВЫБРАН'}</p>
                    </div>
                    <div className="flex gap-2">
                      {['emailjs', 'smtp', 'telegram'].map(m => (
                        <button key={m} onClick={() => {
                          const newC = { ...deliveryConfig, method: m };
                          saveDeliveryConfig(newC);
                          updateNested('contact.form.delivery.method', m);
                        }} className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all ${deliveryConfig.method === m ? 'bg-blue-600 border-blue-500 text-white shadow-lg' : 'bg-[var(--cms-input-bg)] border-[var(--cms-input-border)] text-[var(--cms-text-muted)]'}`}>{m}</button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-[var(--cms-text-label)] ml-1">Поля формы</label>
                    {(localContent.contact?.form?.fields || []).map((field, idx) => (
                      <div key={field.id} className="p-4 bg-[var(--cms-card-bg)] rounded-xl border border-[var(--cms-card-border)] grid grid-cols-3 gap-4 items-center shadow-md">
                        <div className="col-span-2">
                          <InputField label={`${field.id} Label`} value={field.label} onChange={(val) => {
                            const newF = localContent.contact.form.fields.map((f, i) => i === idx ? { ...f, label: val } : f);
                            updateNested('contact.form.fields', newF);
                          }} />
                        </div>
                        <div className="flex gap-4 justify-end pr-2">
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-[7px] font-black text-[var(--cms-text-muted)] uppercase">Vis</span>
                            <input type="checkbox" checked={field.visible} onChange={(e) => {
                              const newF = localContent.contact.form.fields.map((f, i) => i === idx ? { ...f, visible: e.target.checked } : f);
                              updateNested('contact.form.fields', newF);
                            }} className="w-4 h-4 rounded bg-slate-800 text-blue-600" />
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-[7px] font-black text-[var(--cms-text-muted)] uppercase">Req</span>
                            <input type="checkbox" checked={field.required} onChange={(e) => {
                              const newF = localContent.contact.form.fields.map((f, i) => i === idx ? { ...f, required: e.target.checked } : f);
                              updateNested('contact.form.fields', newF);
                            }} className="w-4 h-4 rounded bg-slate-800 text-blue-600" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === 'requisites' && (
              <div className="space-y-8 animate-slow-fade">
                <SectionCard title="Основные реквизиты организации" icon={<FileText size={18}/>} tooltip="Данные компании для автоматической подстановки в юридические документы">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <div className="col-span-2">
                      <InputField label="Полное наименование" value={localContent.companyName} onChange={(val) => updateNested('companyName', val)} />
                    </div>
                    <InputField label="ИНН" value={localContent.inn} onChange={(val) => updateNested('inn', val)} />
                    <InputField label="КПП" value={localContent.kpp} onChange={(val) => updateNested('kpp', val)} />
                    <InputField label="ОГРН" value={localContent.ogrn} onChange={(val) => updateNested('ogrn', val)} />
                    <InputField label="ОКВЭД" value={localContent.okved} onChange={(val) => updateNested('okved', val)} />
                    <div className="col-span-2">
                      <InputField label="Генеральный директор" value={localContent.ceo} onChange={(val) => updateNested('ceo', val)} />
                    </div>
                    <div className="col-span-2">
                      <InputField label="Юридический адрес" value={localContent.address} onChange={(val) => updateNested('address', val)} />
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Банковские реквизиты" icon={<FileText size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="col-span-2">
                      <InputField label="Наименование банка" value={localContent.bank?.name} onChange={(val) => updateNested('bank.name', val)} />
                    </div>
                    <InputField label="БИК" value={localContent.bank?.bik} onChange={(val) => updateNested('bank.bik', val)} />
                    <InputField label="Корр. счет" value={localContent.bank?.ks} onChange={(val) => updateNested('bank.ks', val)} />
                    <div className="col-span-2">
                      <InputField label="Расчетный счет" value={localContent.bank?.rs} onChange={(val) => updateNested('bank.rs', val)} />
                    </div>
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === 'legal' && (
              <div className="space-y-8 animate-slow-fade">
                <SectionCard title="Регистрационные данные (ПДн)" icon={<Shield size={18}/>} tooltip="Сведения о регистрации в реестре операторов персональных данных">
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Регистрационный номер" value={localContent.pdnReg} onChange={(val) => updateNested('pdnReg', val)} />
                    <InputField label="Основание (Приказ)" value={localContent.pdnOrder} onChange={(val) => updateNested('pdnOrder', val)} />
                  </div>
                  <InputField label="Версия системы (vX.X.X)" value={localContent.legal?.version} onChange={(val) => updateNested('legal.version', val)} />
                </SectionCard>

                <div className="flex gap-2 p-1 bg-[var(--cms-bg-secondary)] rounded-2xl border border-[var(--cms-divider)] mb-8">
                  {['privacy', 'requisites', 'oferta'].map(sub => (
                    <button
                      key={sub}
                      onClick={() => setLegalSubTab(sub)}
                      className={`flex-1 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${legalSubTab === sub ? 'bg-blue-600 text-white shadow-lg' : 'text-[var(--cms-text-muted)] hover:text-[var(--cms-text-main)]'}`}
                    >
                      {sub === 'privacy' ? 'Политика' : sub === 'requisites' ? 'Реквизиты' : 'Оферта'}
                    </button>
                  ))}
                </div>

                {legalSubTab === 'privacy' && (
                  <div className="space-y-6 animate-slow-fade">
                    <SectionCard title="Политика конфиденциальности" icon={<FileText size={18}/>}>
                      <InputField label="Заголовок страницы" value={localContent.pages?.privacy?.title} onChange={(val) => updateNested('pages.privacy.title', val)} />
                    </SectionCard>
                    {(localContent.pages?.privacy?.sections || []).map((sec, idx) => (
                      <div key={idx} className="bg-[var(--cms-card-bg)] p-8 rounded-3xl border border-[var(--cms-card-border)] relative group mb-4 shadow-xl">
                        <div className="grid grid-cols-2 gap-8 mb-4">
                          <InputField label="ID / Anchor" value={sec.id} onChange={(val) => {
                            const newS = localContent.pages.privacy.sections.map((s, i) => i === idx ? { ...s, id: val } : s);
                            updateNested('pages.privacy.sections', newS);
                          }} />
                          <InputField label="Заголовок раздела" value={sec.title} onChange={(val) => {
                            const newS = localContent.pages.privacy.sections.map((s, i) => i === idx ? { ...s, title: val } : s);
                            updateNested('pages.privacy.sections', newS);
                          }} />
                        </div>
                        <textarea value={sec.content} onChange={(e) => {
                          const newS = localContent.pages.privacy.sections.map((s, i) => i === idx ? { ...s, content: e.target.value } : s);
                          updateNested('pages.privacy.sections', newS);
                        }} className="w-full bg-[var(--cms-input-bg)] border border-[var(--cms-input-border)] rounded-xl px-5 py-4 text-[var(--cms-text-main)] text-sm font-medium h-48 resize-none shadow-inner" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-8 animate-slow-fade">
                <SectionCard title="Фоновые анимации" icon={<Sparkles size={18}/>}>
                  <div className="flex items-center gap-3 bg-[var(--cms-bg-secondary)] p-4 rounded-xl border border-[var(--cms-divider)] mb-6">
                    <input type="checkbox" checked={localContent.backgroundAnimation?.enabled} onChange={(e) => updateNested('backgroundAnimation.enabled', e.target.checked)} className="w-5 h-5 rounded bg-slate-800 text-blue-600" />
                    <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cms-text-label)]">Включить анимацию фона</label>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-[var(--cms-text-label)] mb-2.5 ml-1">Вариант</label>
                      <select value={localContent.backgroundAnimation?.variant || 'envelopes'} onChange={(e) => updateNested('backgroundAnimation.variant', e.target.value)} className="w-full bg-[var(--cms-input-bg)] border border-[var(--cms-input-border)] rounded-xl px-4 py-2 text-[var(--cms-text-main)] text-sm outline-none focus:ring-2 focus:ring-blue-500/50">
                        <option value="envelopes">Конверты</option>
                        <option value="routes">Маршруты</option>
                        <option value="documents">Документы</option>
                        <option value="network">Сеть</option>
                        <option value="random">Случайно</option>
                      </select>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Интерфейс и загрузка" icon={<Settings size={18}/>}>
                  <div className="grid grid-cols-2 gap-8">
                    <InputField label="Задержка лоадера (мс)" type="number" value={localContent.loaderDelay} onChange={(val) => updateNested('loaderDelay', parseInt(val))} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-3 bg-[var(--cms-bg-secondary)] p-4 rounded-xl border border-[var(--cms-divider)]">
                      <input type="checkbox" checked={localContent.ui?.showScrollProgress} onChange={(e) => updateNested('ui.showScrollProgress', e.target.checked)} className="w-5 h-5 rounded bg-slate-800 text-blue-600" />
                      <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cms-text-label)]">Прогресс скролла</label>
                    </div>
                    <div className="flex items-center gap-3 bg-[var(--cms-bg-secondary)] p-4 rounded-xl border border-[var(--cms-divider)]">
                      <input type="checkbox" checked={localContent.ui?.showBackToTop} onChange={(e) => updateNested('ui.showBackToTop', e.target.checked)} className="w-5 h-5 rounded bg-slate-800 text-blue-600" />
                      <label className="text-[10px] font-black uppercase tracking-widest text-[var(--cms-text-label)]">{interpolate(localContent.ui?.cmsBackToTopLabel, localContent) || 'Кнопка "Наверх"'}</label>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title={interpolate(localContent.ui?.cmsFooterTitle, localContent) || 'Подвал (Footer)'} icon={<LayoutDashboard size={18}/>}>
                  <textarea value={localContent.footer?.description} onChange={(e) => updateNested('footer.description', e.target.value)} className="w-full bg-[var(--cms-input-bg)] border border-[var(--cms-input-border)] rounded-xl px-5 py-4 text-[var(--cms-text-main)] text-sm font-medium h-24 resize-none shadow-inner" />
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <InputField label={interpolate(localContent.ui?.cmsFooterNavHeader, localContent) || 'Заг. Нав'} value={localContent.footer?.headers?.nav} onChange={(val) => updateNested('footer.headers.nav', val)} />
                    <InputField label={interpolate(localContent.ui?.cmsFooterLegalHeader, localContent) || 'Заг. Юр'} value={localContent.footer?.headers?.legal} onChange={(val) => updateNested('footer.headers.legal', val)} />
                    <InputField label={interpolate(localContent.ui?.cmsFooterContactsHeader, localContent) || 'Заг. Конт'} value={localContent.footer?.headers?.contacts} onChange={(val) => updateNested('footer.headers.contacts', val)} />
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-8 animate-slow-fade">
                <SectionCard title={interpolate(localContent.ui?.cmsAnalyticsTitle, localContent) || 'Интеграции и Аналитика'} icon={<BarChart3 size={18}/>}>
                  <div className="space-y-4">
                    <InputField label="Yandex Metrika ID" value={localContent.integrations?.yandexMetrika} onChange={(val) => updateNested('integrations.yandexMetrika', val)} />
                    <InputField label="Google Analytics ID" value={localContent.integrations?.googleAnalytics} onChange={(val) => updateNested('integrations.googleAnalytics', val)} />
                  </div>
                </SectionCard>

                <SectionCard title={interpolate(localContent.ui?.cmsCookieBannerTitle, localContent) || 'Cookie Баннер'} icon={<Shield size={18}/>}>
                   <div className="space-y-4">
                     <InputField label={interpolate(localContent.ui?.cmsCookieBannerHeader, localContent) || 'Заголовок'} value={localContent.cookieBanner?.title} onChange={(val) => updateNested('cookieBanner.title', val)} />
                     <textarea value={localContent.cookieBanner?.description} onChange={(e) => updateNested('cookieBanner.description', e.target.value)} className="w-full bg-[var(--cms-input-bg)] border border-[var(--cms-input-border)] rounded-xl px-5 py-4 text-[var(--cms-text-main)] text-sm font-medium h-24 resize-none shadow-inner" />
                     <div className="grid grid-cols-2 gap-8">
                       <InputField label={interpolate(localContent.ui?.cmsCookieBannerBtnAll, localContent) || 'Текст кнопки (Все)'} value={localContent.cookieBanner?.btnAll} onChange={(val) => updateNested('cookieBanner.btnAll', val)} />
                       <InputField label={interpolate(localContent.ui?.cmsCookieBannerBtnEssential, localContent) || 'Текст кнопки (Осн)'} value={localContent.cookieBanner?.btnEssential} onChange={(val) => updateNested('cookieBanner.btnEssential', val)} />
                     </div>
                   </div>
                </SectionCard>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
    <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--cms-divider); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--cms-accent); }
      `}</style>
    </div>
  );
}
