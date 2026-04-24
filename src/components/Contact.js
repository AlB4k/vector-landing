import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, MessageCircle, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { SectionWrapper } from './Shared';

export const Contact = ({ data, companyInfo, socials, integrations, handleFormSubmit, emailValue, setEmailValue }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'ERROR: MISSING_NAME';
    if (!emailValue.trim() && !formData.phone.trim()) {
      newErrors.email = 'ERROR: CONTACT_REQUIRED';
      newErrors.phone = 'ERROR: CONTACT_REQUIRED';
    }

    if (emailValue.trim() && !/\S+@\S+\.\S+/.test(emailValue)) {
      newErrors.email = 'ERROR: INVALID_FORMAT';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (formData.phone.trim() && phoneDigits.length < 10) {
      newErrors.phone = 'ERROR: SEQ_TOO_SHORT';
    }

    if (!consent) newErrors.consent = 'ERROR: CONSENT_REQUIRED';

    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!consent) {
      setErrors({ ...errors, consent: 'ACTION_REJECTED: ACCEPT_TERMS_TO_PROCEED' });
      return;
    }

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSending(true);

    if (integrations?.formspreeId) {
      try {
        const response = await fetch(`https://formspree.io/f/${integrations.formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName: formData.name,
            email: emailValue,
            phone: formData.phone,
            message: formData.message,
            _subject: `Новая заявка от ${formData.name}`,
            consent_granted: "Yes"
          })
        });
        if (!response.ok) throw new Error('Failed to send');
      } catch (err) {
        console.error("Formspree error:", err);
        setErrors({ submit: 'Ошибка отправки. Попробуйте позже.' });
        setIsSending(false);
        return;
      }
    } else {
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    handleFormSubmit(e);
    setIsSending(false);
    setFormData({ name: '', phone: '', message: '' });
    setConsent(false);
  };

  return (
    <SectionWrapper id="contact" className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: Info */}
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
              {data.title} <span className="text-blue-500">{data.accent}</span>
            </h2>
            <p className="opacity-50 text-base md:text-lg max-w-md leading-relaxed font-medium">
              {data.subtitle}
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-5 group text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-1">Телефон</p>
                <a href={`tel:${companyInfo.phone}`} className="text-xl font-bold hover:text-blue-400 transition-colors">{companyInfo.phone}</a>
              </div>
            </div>
            <div className="flex items-start gap-5 group text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-1">Email</p>
                <a href={`mailto:${companyInfo.email}`} className="text-xl font-bold hover:text-blue-400 transition-colors">{companyInfo.email}</a>
              </div>
            </div>
            <div className="flex items-start gap-5 group text-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-1">Адрес</p>
                <p className="text-sm font-medium opacity-70 max-w-xs">{companyInfo.address}</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-soft max-w-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 mb-4 text-left ml-1">Юридический блок</p>
            <div className="flex flex-col gap-3">
               <Link to="/privacy" className="text-[10px] font-bold text-slate-500 hover:text-blue-500 flex items-center gap-2 transition-colors uppercase tracking-widest"><ShieldCheck size={14}/> Политика конфиденциальности</Link>
               <Link to="/requisites" className="text-[10px] font-bold text-slate-500 hover:text-blue-500 flex items-center gap-2 transition-colors uppercase tracking-widest"><ShieldCheck size={14}/> Реквизиты организации</Link>
               <Link to="/oferta" className="text-[10px] font-bold text-slate-500 hover:text-blue-500 flex items-center gap-2 transition-colors uppercase tracking-widest"><ShieldCheck size={14}/> Оферта и условия</Link>
            </div>
          </div>

          <div className="pt-8 border-t border-soft max-w-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30 mb-4 text-left ml-1">Наши соцсети</p>
            <div className="flex flex-wrap gap-4">
              {socials.telegram && (
                <a href={socials.telegram} target="_blank" rel="noreferrer" className="px-6 py-2.5 rounded-xl border border-soft hover:bg-blue-500 hover:text-white transition-all font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <Send size={14} /> Telegram
                </a>
              )}
              {socials.whatsapp && (
                <a href={socials.whatsapp} target="_blank" rel="noreferrer" className="px-6 py-2.5 rounded-xl border border-soft hover:bg-green-500 hover:text-white transition-all font-bold text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <MessageCircle size={14} /> WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-500/5 rounded-[2.5rem] blur-2xl"></div>
          <form onSubmit={onSubmit} className="relative bg-slate-900/40 backdrop-blur-xl border border-white/5 p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl space-y-6 text-left">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">{data.formName}</label>
                <input
                  type="text"
                  name="fullName"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: null });
                  }}
                  className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-base font-medium`}
                  placeholder="Иван Иванов"
                  required
                />
                {errors.name && <p className="text-[10px] text-red-400 font-bold ml-1 uppercase tracking-widest">{errors.name}</p>}
              </div>
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">{data.formPhone}</label>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: null });
                  }}
                  className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-base font-medium`}
                  placeholder="+7 (999) 000-00-00"
                />
                {errors.phone && <p className="text-[10px] text-red-400 font-bold ml-1 uppercase tracking-widest">{errors.phone}</p>}
              </div>
            </div>
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">{data.formEmail}</label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={emailValue}
                onChange={(e) => {
                  setEmailValue(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-base font-medium`}
                placeholder="example@mail.ru"
              />
              {errors.email && <p className="text-[10px] text-red-400 font-bold ml-1 uppercase tracking-widest">{errors.email}</p>}
            </div>
            <div className="space-y-2 text-left">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 ml-1">{data.formMessage}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-base font-medium h-32 resize-none"
                placeholder="Расскажите о вашей задаче..."
              ></textarea>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (errors.consent) setErrors({ ...errors, consent: null });
                  }}
                  className={`mt-1 w-5 h-5 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500/50 transition-all cursor-pointer ${errors.consent ? 'ring-2 ring-red-500/50' : ''}`}
                  required
                />
                <label htmlFor="consent" className="text-[10px] leading-relaxed text-slate-400 font-medium cursor-pointer">
                  Я даю согласие на обработку персональных данных в соответствии с <Link to="/privacy" className="text-blue-400 font-bold hover:underline" target="_blank">Политикой конфиденциальности</Link> ООО «ВЕКТОР» (152-ФЗ)
                </label>
              </div>
              {errors.consent && <p className="text-[9px] text-red-400 font-bold ml-8 uppercase tracking-widest">{errors.consent}</p>}
            </div>

            <button
              type="submit"
              disabled={isSending || !consent}
              aria-label={data.formButton}
              className="w-full py-5 rounded-2xl gradient-bg text-white font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
            >
              {isSending ? <Loader2 className="animate-spin" size={20} aria-hidden="true" /> : <>{data.formButton} <ArrowRight size={20} aria-hidden="true" /></>}
            </button>

            <p className="text-[9px] text-center opacity-30 font-bold uppercase tracking-widest">
              С <Link to="/privacy" className="underline hover:text-blue-400 transition-colors">Политикой конфиденциальности</Link> ознакомлен(а)
            </p>
            {errors.submit && <p className="text-xs text-red-400 font-bold text-center mt-4">{errors.submit}</p>}
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
};
