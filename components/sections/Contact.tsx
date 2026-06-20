'use client';

import { useTranslations, useLocale } from 'next-intl';
import AnimateIn from '../ui/AnimateIn';

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();

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

        <AnimateIn delay={0.15}>
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <a href="mailto:adriannulero@gmail.com" className="btn-primary">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M1 4l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              {t('email')}
            </a>
            <a
              href="https://linkedin.com/in/adrián-cabedo-canós"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M4 6v4M4 4v.01M7 10V8a1 1 0 012 0v2M7 6v1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              {t('linkedin')}
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

        <AnimateIn delay={0.25}>
          <p className="text-slate-700 font-space text-xs tracking-[0.2em]">
            +34 655 57 01 78
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
