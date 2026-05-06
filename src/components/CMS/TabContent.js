import React, { useRef } from 'react';
import {
  Eye, EyeOff, Trash2, Plus, ArrowUp, ArrowDown,
  FileText, Mail, Settings, Shield, Phone, MapPin
} from 'lucide-react';
import InputField from './InputField';
import SectionCard from './SectionCard';

export default function TabContent({
  activeTab,
  localContent,
  updateNested,
  moveItem,
  processImageUpload
}) {
  const mainRef = useRef(null);

  return (
    <div ref={mainRef} className="flex-1 overflow-y-auto p-12 custom-scrollbar relative z-10 min-h-0 bg-[var(--cms-bg)] scroll-smooth">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,64,175,0.08),transparent)] pointer-events-none" />
      <div className="max-w-4xl mx-auto pb-24 relative z-10">

        {/* STRUCTURE TAB */}
        {activeTab === 'structure' && (
          <div className="space-y-4 animate-slow-fade">
            <div className="mb-8 ml-2">
              <h4 className="text-xl font-black text-[var(--cms-text)] mb-2 tracking-tight">Управление секциями</h4>
              <p className="text-xs text-[var(--cms-text-muted)] font-medium tracking-wide">Перетаскивайте и скрывайте блоки лендинга</p>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-12">
              <div className="bg-blue-600/5 border border-blue-500/20 p-6 rounded-3xl">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2">Build Status</p>
                <p className="text-xl font-black text-[var(--cms-text)] leading-none">STABLE</p>
              </div>
              <div className="bg-[var(--cms-card)] border border-[var(--cms-border)] p-6 rounded-3xl">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--cms-text-muted)] mb-2">Active Sections</p>
                <p className="text-xl font-black text-[var(--cms-text)] leading-none">{localContent?.sections?.filter(s => s.enabled).length || 0} / {localContent?.sections?.length || 0}</p>
              </div>
              <div className="bg-[var(--cms-card)] border border-[var(--cms-border)] p-6 rounded-3xl">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--cms-text-muted)] mb-2">Legal Compliance</p>
                <p className="text-xl font-black text-green-500 leading-none">100% READY</p>
              </div>
            </div>

            {(localContent?.sections || []).map((section, idx) => (
              <div key={section.id} className="bg-[var(--cms-sidebar)] p-5 rounded-2xl border border-[var(--cms-border)] flex items-center justify-between group transition-all hover:border-blue-500/40 hover:bg-[var(--cms-card)] shadow-xl">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col gap-1.5">
                    <button onClick={() => moveItem('sections', idx, -1)} className="p-1 text-[var(--cms-text-muted)] hover:text-blue-400 disabled:opacity-10 transition-colors" disabled={idx === 0}><ArrowUp size={16} /></button>
                    <button onClick={() => moveItem('sections', idx, 1)} className="p-1 text-[var(--cms-text-muted)] hover:text-blue-400 disabled:opacity-10 transition-colors" disabled={idx === (localContent?.sections?.length || 0) - 1}><ArrowDown size={16} /></button>
                  </div>
                  <div>
                    <span className="font-black text-[11px] uppercase tracking-[0.2em] text-[var(--cms-text-muted)] group-hover:text-[var(--cms-text)] transition-colors">{section.label}</span>
                    <p className="text-[9px] text-[var(--cms-text-muted)] font-bold uppercase tracking-widest mt-1 opacity-60">ID: {section.id}</p>
                  </div>
                </div>
                <button onClick={() => { const newSections = (localContent?.sections || []).map((sec, i) => i === idx ? { ...sec, enabled: !sec.enabled } : sec); updateNested('sections', newSections); }} className={`p-3 rounded-xl transition-all border ${section.enabled ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-[var(--cms-card)] border-[var(--cms-border)] text-[var(--cms-text-muted)] opacity-50'}`}>{section.enabled ? <Eye size={20} /> : <EyeOff size={20} />}</button>
              </div>
            ))}
          </div>
        )}

        {/* GENERAL TAB */}
        {activeTab === 'general' && (
          <div className="space-y-8 animate-slow-fade">
            <div className="mb-8 ml-2">
              <h4 className="text-xl font-black text-[var(--cms-text)] mb-2 tracking-tight">Основные настройки</h4>
              <p className="text-xs text-[var(--cms-text-muted)] font-medium tracking-wide">Юридические реквизиты, банковские данные и контакты организации</p>
            </div>

            <SectionCard title="Юридические реквизиты" icon={<Settings size={18} />} tooltip="ИНН, КПП, ОГРН используются в карточке организации и документах.">
              <div className="grid grid-cols-2 gap-x-8">
                <InputField label="Название организации" value={localContent?.companyName} onChange={(val) => updateNested('companyName', val)} />
                <InputField label="Слоган логотипа (Tagline)" value={localContent?.companyTagline} onChange={(val) => updateNested('companyTagline', val)} />
                <InputField label="ФИО Руководителя (Ген. директор)" value={localContent?.ceo} onChange={(val) => updateNested('ceo', val)} />
                <InputField label="ИНН" value={localContent?.inn} onChange={(val) => updateNested('inn', val)} />
                <InputField label="КПП" value={localContent?.kpp} onChange={(val) => updateNested('kpp', val)} />
                <InputField label="ОГРН" value={localContent?.ogrn} onChange={(val) => updateNested('ogrn', val)} />
                <InputField label="ОКВЭД" value={localContent?.okved} onChange={(val) => updateNested('okved', val)} />
              </div>
              <InputField label="Юридический адрес" value={localContent?.address} onChange={(val) => updateNested('address', val)} />
            </SectionCard>

            <SectionCard title="Банковские реквизиты" icon={<FileText size={18} />} tooltip="Отображаются на странице реквизитов по запросу клиентов.">
              <div className="grid grid-cols-2 gap-x-8">
                <InputField label="Название банка" value={localContent?.bank?.name} onChange={(val) => updateNested('bank.name', val)} />
                <InputField label="БИК" value={localContent?.bank?.bik} onChange={(val) => updateNested('bank.bik', val)} />
                <InputField label="Расчетный счет (р/с)" value={localContent?.bank?.rs} onChange={(val) => updateNested('bank.rs', val)} />
                <InputField label="Корр. счет (к/с)" value={localContent?.bank?.ks} onChange={(val) => updateNested('bank.ks', val)} />
              </div>
            </SectionCard>

            <SectionCard title="Контакты для связи" icon={<Mail size={18} />} tooltip="До 3 телефонов с направлениями в разделе Контакты.">
              <div className="grid grid-cols-2 gap-x-8">
                <InputField label="Контактный телефон" value={localContent?.phone} onChange={(val) => updateNested('phone', val)} />
                <InputField label="Рабочий Email" value={localContent?.email} onChange={(val) => updateNested('email', val)} />
              </div>
            </SectionCard>

            <SectionCard title="Регистрация в Роскомнадзоре" icon={<Shield size={18} />} tooltip="Номер в реестре Роскомнадзора. Отображается на сайте и в политике конфиденциальности.">
              <div className="grid grid-cols-2 gap-x-8">
                <InputField label="ПДн Регистрация №" value={localContent?.pdnReg} onChange={(val) => updateNested('pdnReg', val)} />
                <InputField label="Приказ №" value={localContent?.pdnOrder} onChange={(val) => updateNested('pdnOrder', val)} />
              </div>
            </SectionCard>
          </div>
        )}

        {/* PLACEHOLDER FOR OTHER TABS */}
        {!['structure', 'general'].includes(activeTab) && (
          <div className="py-12 text-center">
            <p className="text-[var(--cms-text-muted)]">Вкладка загружается...</p>
          </div>
        )}

      </div>
    </div>
  );
}
