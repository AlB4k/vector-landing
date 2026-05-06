export default function InputField({ label, value, onChange, type = 'text' }) {
  return (
    <div className="mb-6">
      <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-[var(--cms-text-muted)] mb-2.5 ml-1">
        {label}
      </label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[var(--cms-card)] border border-[var(--cms-border)] rounded-xl px-5 py-3.5 text-[var(--cms-text)] focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-medium placeholder-[var(--cms-text-muted)] opacity-80 shadow-inner"
      />
    </div>
  );
}
