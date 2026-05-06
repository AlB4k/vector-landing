import { HelpCircle } from 'lucide-react';
import Tooltip from './Tooltip';

export default function SectionCard({ title, children, icon, tooltip }) {
  return (
    <div className="bg-[var(--cms-sidebar)] backdrop-blur-sm p-8 rounded-3xl border border-[var(--cms-border)] mb-8 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-600/20 group-hover:bg-blue-600 transition-colors"></div>
      <h3 className="text-[10px] font-black mb-8 text-[var(--cms-text-muted)] flex items-center gap-3 uppercase tracking-[0.3em]">
        <span className="p-2 rounded-lg bg-[var(--cms-card)] text-blue-400 shadow-lg">{icon}</span>
        {title}
        {tooltip && (
          <Tooltip text={tooltip}>
            <HelpCircle size={14} className="text-[var(--cms-text-muted)] hover:text-blue-400 cursor-help transition-colors ml-1" />
          </Tooltip>
        )}
      </h3>
      {children}
    </div>
  );
}
