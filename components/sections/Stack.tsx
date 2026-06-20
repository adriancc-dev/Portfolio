'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import AnimateIn from '../ui/AnimateIn';

const stackCategories = [
  { key: 'languages' as const, items: ['Java', 'TypeScript', 'JavaScript', 'Dart', 'Python'] },
  { key: 'backend' as const, items: ['Spring Boot', 'Node.js', 'Next.js', 'REST APIs'] },
  { key: 'frontend' as const, items: ['Flutter', 'React', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS'] },
  { key: 'databases' as const, items: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Supabase', 'Neon'] },
  { key: 'tools' as const, items: ['Git', 'GitHub', 'Docker', 'Vercel', 'Discord API'] },
  { key: 'ai' as const, items: ['PySpark', 'TensorFlow', 'scikit-learn', 'MLflow', 'Streamlit', 'Pandas'] },
];

function StackCard({ categoryKey, items, t, delay }: { categoryKey: typeof stackCategories[number]['key'], items: string[], t: (k: string) => string, delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-6 group"
    >
      <h3 className="font-clash text-amber-400 text-base mb-5 tracking-wide">{t(categoryKey)}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: delay + 0.1 + i * 0.04 }}
            className="tag-neutral"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Stack() {
  const t = useTranslations('stack');

  return (
    <section id="stack" className="section-padding relative">
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-amber-500/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <AnimateIn>
          <p className="section-label mb-4">{t('title')}</p>
          <h2
            className="font-clash gradient-text mb-16"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
          >
            {t('subtitle')}
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stackCategories.map(({ key, items }, i) => (
            <StackCard key={key} categoryKey={key} items={items} t={t} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
