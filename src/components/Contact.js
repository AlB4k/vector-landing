import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, MessageCircle, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { SectionWrapper, DynamicIcon as LogoIcon } from './Shared';
import { interpolate } from '../utils/content';
import { sendForm } from '../utils/formSender';

export const Contact = ({ data, fullContent, companyInfo, socials, integrations, handleFormSubmit, emailValue, setEmailValue, isLight }) => {
  const [fields, setFields] = useState({});
  const [honeypot, setHoneypot] = useState('');
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const formOpenTime = useRef(Date.now());

  if (!data || !companyInfo) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Honeypot
    if (honeypot !== '') {
      setSuccess(true);
      setFields({});
      setConsent(false);
      return;
    }

    // 2. Временная метка
    const elapsed = (Date.now() - formOpenTime.current) / 1000;
    const minTime = data.form?.spamProtection?.minSubmitTime || 3;
    if (elapsed < minTime) {
      setSuccess(true);
      setFields({});
      setConsent(false);
      return;
    }

    // 3. Валидация телефона
    const phoneDigits = (fields.phone || '').replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setPhoneError(interpolate(fullContent.ui?.phoneError, fullContent) || 'Введите корректный номер телефона');
      return;
    }
    setPhoneError('');

    // 4. Отправка
    setLoading(true);
    setError('');

    // Читаем delivery config из localStorage
    let deliveryConfig;
    try {
      const stored = localStorage.getItem('vector_delivery_config');
      deliveryConfig = stored
        ? JSON.parse(stored)
        : data.form?.delivery;
    } catch {
      deliveryConfig = data.form?.delivery;
    }

    const result = await sendForm(fields, deliveryConfig);

    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setFields({});
      setConsent(false);
      formOpenTime.current = Date.now();
    } else {
      setError(data.form?.errorMessage || interpolate(fullContent.ui?.formErrorDefault, fullContent) || 'Ошибка отправки. Пожалуйста, попробуйте позже.');
    }
  };

  const formConfig = data.form || { fields: [] };

  return (
    <SectionWrapper id="contact" className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Лево: Информация */}
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-[var(--text-main)]">
              {interpolate(data.title, fullContent)} <span className={isLight ? "text-blue-600" : "text-blue-500"}>{interpolate(data.accent, fullContent)}</span>
            </h2>
            <p className="opacity-70 text-base md:text-lg max-w-md leading-relaxed font-medium text-[var(--text-muted)]">
              {interpolate(data.subtitle, fullContent)}
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-5 group text-left">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 ${
                isLight ? 'bg-blue-600/10 text-blue-600' : 'bg-blue-500/10 text-blue-400'
              }`}>
                <Phone size={24} />
              </div>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isLight ? 'text-blue-600' : 'text-blue-500'}`}>{interpolate(fullContent.ui?.phoneLabel, fullContent) || 'Телефон'}</p>
                <div className="flex flex-col gap-3">
                  {(data.phones || [
                    { val: companyInfo.phone, label: interpolate(fullContent.ui?.phoneLabel, fullContent) || 'Телефон', visible: true }
                  ])
                    .filter(p => p.val && p.visible)
                    .map((phone, idx) => (
                      <div key={idx} className="flex flex-col">
                        <a href={`tel:${phone.val}`} className={`${idx === 0 ? 'text-xl' : 'text-sm opacity-80'} font-bold transition-colors ${isLight ? 'hover:text-blue-600' : 'hover:text-blue-400'}`}>
                          {interpolate(phone.val, fullContent)}
                        </a>
                        {idx > 0 && (
                          <span className="text-[8px] uppercase font-black opacity-40 tracking-widest">{phone.label}</span>
                        )}
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            {data.regionBadgeVisible && data.regionBadgeText && (
              <div className={`mt-4 p-4 rounded-xl border ${isLight ? 'bg-blue-50 border-blue-100 text-blue-800' : 'bg-blue-500/5 border-blue-500/10 text-blue-300'} text-[10px] font-bold leading-relaxed shadow-inner`}>
                {interpolate(data.regionBadgeText, fullContent)}
              </div>
            )}
            <div className="flex items-start gap-5 group text-left">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 ${
                isLight ? 'bg-blue-600/10 text-blue-600' : 'bg-blue-500/10 text-blue-400'
              }`}>
                <Mail size={24} />
              </div>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isLight ? 'text-blue-600' : 'text-blue-500'}`}>{interpolate(fullContent.ui?.emailLabel, fullContent) || 'Email'}</p>
                <a href={`mailto:${companyInfo.email}`} className={`text-xl font-bold transition-colors ${isLight ? 'hover:text-blue-600' : 'hover:text-blue-400'}`}>{interpolate(companyInfo.email, fullContent)}</a>
              </div>
            </div>
            <div className="flex items-start gap-5 group text-left">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 ${
                isLight ? 'bg-blue-600/10 text-blue-600' : 'bg-blue-500/10 text-blue-400'
              }`}>
                <MapPin size={24} />
              </div>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isLight ? 'text-blue-600' : 'text-blue-500'}`}>{interpolate(fullContent.ui?.legalAddress, fullContent) || 'Адрес'}</p>
                <p className="text-sm font-medium opacity-90 max-w-xs text-[var(--text-main)]">{interpolate(companyInfo.address, fullContent)}</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-soft max-w-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-4 text-left ml-1">{interpolate(fullContent.ui?.legalBlock, fullContent) || 'Юридический блок'}</p>
            <div className="flex flex-col gap-3">
               <Link to="/privacy" className="text-[10px] font-bold text-slate-500 hover:text-blue-500 flex items-center gap-2 transition-colors uppercase tracking-widest"><ShieldCheck size={14}/> {interpolate(fullContent.ui?.privacyLabel, fullContent) || 'Политика конфиденциальности'}</Link>
               <Link to="/requisites" className="text-[10px] font-bold text-slate-500 hover:text-blue-500 flex items-center gap-2 transition-colors uppercase tracking-widest"><ShieldCheck size={14}/> {interpolate(fullContent.ui?.requisitesLabel, fullContent) || 'Реквизиты организации'}</Link>
               <Link to="/oferta" className="text-[10px] font-bold text-slate-500 hover:text-blue-500 flex items-center gap-2 transition-colors uppercase tracking-widest"><ShieldCheck size={14}/> {interpolate(fullContent.ui?.ofertaLabel, fullContent) || 'Оферта и условия'}</Link>
            </div>
          </div>

          {fullContent.ui?.showSocials && (
            <div className="pt-8 border-t border-soft max-w-md">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 mb-4 text-left ml-1">{interpolate(fullContent.ui?.socialsTitle, fullContent) || 'Наши соцсети'}</p>
              <div className="flex flex-wrap gap-4">
                {(socials || []).map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`px-6 py-2.5 rounded-xl border border-soft transition-all font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 ${
                      isLight ? 'hover:bg-blue-600 hover:text-white' : 'hover:bg-blue-500 hover:text-white'
                    }`}
                  >
                    <LogoIcon name={social.icon} size={14} /> {interpolate(social.label, fullContent)}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Право: Форма */}
        <div className="relative">
          <div className={`absolute -inset-4 rounded-[2.5rem] blur-2xl ${isLight ? 'bg-blue-600/5' : 'bg-blue-500/5'}`}></div>

          {success ? (
            <div
              className="relative backdrop-blur-xl border border-[var(--border)] p-12 rounded-[2.5rem] shadow-2xl text-center transition-all duration-500 flex flex-col items-center justify-center min-h-[400px]"
              style={{ background: 'var(--card-bg)' }}
            >
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-8 text-green-500 border border-green-500/20">
                <Send size={40} />
              </div>
              <h3 className="text-2xl font-black mb-4 text-[var(--text-main)]">{interpolate(fullContent.ui?.formSuccessTitle, fullContent) || 'Готово!'}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {formConfig.successMessage}
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-10 px-8 py-3 rounded-xl gradient-bg text-white font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all"
              >
                {interpolate(fullContent.ui?.formReturnBtn, fullContent) || 'Вернуться к форме'}
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="relative backdrop-blur-xl border border-[var(--border)] p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl space-y-6 text-left transition-colors duration-500"
              style={{ background: 'var(--card-bg)' }}
            >
              <div className="space-y-6">
                {(formConfig.fields || [])
                  .filter(f => f.visible)
                  .map(field => (
                    <div key={field.id} className="space-y-2 text-left">
                      <label htmlFor={field.id} className="text-[10px] font-bold uppercase tracking-widest opacity-60 ml-1">
                        {field.label} {field.required && <span className="text-blue-500">*</span>}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          id={field.id}
                          placeholder={field.placeholder}
                          required={field.required}
                          value={fields[field.id] || ''}
                          onChange={e => setFields({ ...fields, [field.id]: e.target.value })}
                          className="w-full bg-white/5 border border-slate-300 dark:border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-base font-medium h-32 resize-none text-[var(--text-main)] shadow-sm"
                        />
                      ) : (
                        <input
                          type={field.type}
                          id={field.id}
                          placeholder={field.placeholder}
                          required={field.required}
                          value={fields[field.id] || ''}
                          onChange={e => {
                            setFields({ ...fields, [field.id]: e.target.value });
                            if (field.id === 'phone') setPhoneError('');
                          }}
                          className={`w-full bg-white/5 border ${field.id === 'phone' && phoneError ? 'border-red-500/50' : 'border-slate-300 dark:border-white/10'} rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-base font-medium text-[var(--text-main)] shadow-sm`}
                        />
                      )}
                      {field.id === 'phone' && phoneError && (
                        <p className="text-[10px] text-red-400 font-bold ml-1 uppercase tracking-widest">{phoneError}</p>
                      )}
                    </div>
                  ))
                }
              </div>

              {/* Honeypot защита */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  top: '-9999px',
                  width: '1px',
                  height: '1px',
                  opacity: 0,
                  tabIndex: -1
                }}
                aria-hidden="true"
                autoComplete="off"
              />

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    required
                    className="mt-1 w-5 h-5 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500/50 transition-all cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400 font-medium cursor-pointer">
                    {formConfig.consentText} *
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-2xl gradient-bg text-white font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed ${!consent ? 'brightness-75' : ''}`}
              >
                {loading ? (
                  <><Loader2 className="animate-spin" size={20} /> {interpolate(fullContent.ui?.formSending, fullContent) || 'Отправляем...'}</>
                ) : (
                  <>{formConfig.submitText} <ArrowRight size={20} /></>
                )}
              </button>

              {error && (
                <p className="text-xs text-red-400 font-bold text-center mt-4">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

