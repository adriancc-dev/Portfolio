'use client';

import { useTranslations } from 'next-intl';
import AnimateIn from '../ui/AnimateIn';

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="section-padding relative">
      {/* Ambient glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        <AnimateIn>
          <p className="section-label mb-4">{t('title')}</p>
          <h2 className="font-clash gradient-text mb-16" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            {t('subtitle')}
          </h2>
        </AnimateIn>

        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-start">
          <div className="space-y-5">
            {(['p1', 'p2', 'p3'] as const).map((key, i) => (
              <AnimateIn key={key} delay={i * 0.1}>
                <p className="text-slate-400 font-space leading-relaxed text-base">
                  {t(key)}
                </p>
              </AnimateIn>
            ))}
          </div>

          {/* Stats sidebar */}
          <AnimateIn delay={0.3} direction="left">
            <div className="flex md:flex-col gap-4 flex-wrap md:min-w-[160px]">
              {[
                { value: '5', label: t('stat1Label') },
                { value: '1K+', label: t('stat2Label') },
                { value: '100+', label: t('stat3Label') },
                { value: '3', label: t('stat4Label') },
              ].map(({ value, label }) => (
                <div key={label} className="glass-card p-5 text-center flex-1 md:flex-none">
                  <p className="font-clash text-3xl gradient-text font-bold mb-1">{value}</p>
                  <p className="text-slate-500 font-space text-xs leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
