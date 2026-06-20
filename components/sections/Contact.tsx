'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import AnimateIn from '../ui/AnimateIn';
import { sendContactEmail } from '@/app/actions/contact';

const inputClass =
  'w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-slate-300 placeholder-slate-600 font-space text-sm focus:outline-none focus:border-amber-500/40 transition-colors disabled:opacity-50';

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.currentTarget);
    const result = await sendContactEmail(formData);
    if (result.ok) {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative">
        <AnimateIn>
          <p className="section-label mb-6">{t('title')}</p>
          <h2
            className="font-clash gradient-text mb-4"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
          >
            {t('subtitle')}
          </h2>
          <p className="text-slate-500 font-space mb-14 leading-relaxed text-sm max-w-sm mx-auto">
            {t('description')}
          </p>
        </AnimateIn>

        {/* Quick-contact buttons */}
        <AnimateIn delay={0.15}>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <a href="mailto:adriannulero@gmail.com" className="btn-primary">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              {t('email')}
            </a>
            <a
              href="https://www.linkedin.com/in/adrian-cabedo-canos/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M4 6v4M4 4v.01M7 10V8a1 1 0 012 0v2M7 6v1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              LinkedIn
            </a>
            <a
              href="https://github.com/adriancc-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <path d="M7 0C3.13 0 0 3.13 0 7c0 3.1 2.01 5.72 4.79 6.65.35.06.48-.15.48-.33 0-.16-.01-.72-.01-1.3-1.76.32-2.22-.43-2.36-.82-.08-.2-.42-.82-.72-.99-.25-.13-.6-.46-.01-.47.55-.01.95.51 1.08.72.63 1.06 1.64.76 2.04.58.06-.45.24-.76.44-.93-1.56-.18-3.19-.78-3.19-3.46 0-.76.27-1.39.72-1.88-.07-.18-.31-.89.07-1.86 0 0 .59-.19 1.93.72A6.7 6.7 0 0 1 7 3.8c.6 0 1.19.08 1.75.23 1.34-.91 1.93-.72 1.93-.72.38.97.14 1.68.07 1.86.45.49.72 1.11.72 1.88 0 2.69-1.64 3.28-3.2 3.46.25.22.47.64.47 1.3 0 .94-.01 1.69-.01 1.92 0 .19.13.41.48.33C11.99 12.72 14 10.1 14 7c0-3.87-3.13-7-7-7z"/>
              </svg>
              GitHub
            </a>
            <a
              href={locale === 'en' ? '/cv-en.pdf' : '/cv-es.pdf'}
              download
              className="btn-ghost"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v8M4 6l3 3 3-3M2 10v1.5A1.5 1.5 0 003.5 13h7a1.5 1.5 0 001.5-1.5V10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t('downloadCV')}
            </a>
          </div>
        </AnimateIn>

        {/* Contact form */}
        <AnimateIn delay={0.3}>
          <form onSubmit={handleSubmit} className="glass-card p-8 text-left">
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder={t('formName')}
                  required
                  disabled={status === 'loading'}
                  className={inputClass}
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t('formEmail')}
                  required
                  disabled={status === 'loading'}
                  className={inputClass}
                />
              </div>
              <textarea
                name="message"
                placeholder={t('formMessage')}
                required
                rows={4}
                disabled={status === 'loading'}
                className={`${inputClass} resize-none`}
              />

              {status !== 'success' ? (
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? t('formSending') : t('formSend')}
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 py-3 text-emerald-400 font-space text-sm">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.3"/>
                    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t('formSuccess')}
                </div>
              )}

              {status === 'error' && (
                <p className="text-red-400 font-space text-xs text-center">{t('formError')}</p>
              )}
            </div>
          </form>
        </AnimateIn>
      </div>
    </section>
  );
}
