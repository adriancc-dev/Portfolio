'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { projects, Locale } from '@/content/projects';
import Link from 'next/link';
import AnimateIn from '../ui/AnimateIn';

const colorMap: Record<string, string> = {
  '#F59E0B': 'rgba(245,158,11,0.08)',
  '#3B82F6': 'rgba(59,130,246,0.08)',
  '#8B5CF6': 'rgba(139,92,246,0.08)',
  '#10B981': 'rgba(16,185,129,0.08)',
};

const borderMap: Record<string, string> = {
  '#F59E0B': 'rgba(245,158,11,0.2)',
  '#3B82F6': 'rgba(59,130,246,0.2)',
  '#8B5CF6': 'rgba(139,92,246,0.2)',
  '#10B981': 'rgba(16,185,129,0.2)',
};

export default function Projects() {
  const t = useTranslations('projects');
  const locale = useLocale() as Locale;

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute left-0 top-1/3 w-72 h-72 bg-amber-500/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <AnimateIn>
          <p className="section-label mb-4">{t('title')}</p>
          <h2
            className="font-clash gradient-text mb-16"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
          >
            {t('subtitle')}
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => {
            const content = project[locale];
            const accentBg = colorMap[project.color] ?? 'rgba(245,158,11,0.06)';
            const accentBorder = borderMap[project.color] ?? 'rgba(245,158,11,0.15)';

            return (
              <AnimateIn key={project.slug} delay={i * 0.08}>
                <Link href={`/${locale}/projects/${project.slug}`} className="group block h-full">
                  <article
                    className="glass-card p-6 h-full flex flex-col relative overflow-hidden cursor-pointer"
                  >
                    {/* Subtle color accent top */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)` }}
                    />

                    {/* Corner glow on hover */}
                    <div
                      className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
                      style={{ background: accentBg }}
                    />

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag-amber">{tag}</span>
                      ))}
                    </div>

                    <h3
                      className="font-clash text-2xl text-white mb-2 transition-colors duration-300 group-hover:text-amber-400"
                      style={{ color: 'white' }}
                    >
                      {content.title}
                    </h3>
                    <p className="text-slate-500 font-space text-sm mb-6 flex-1 leading-relaxed">
                      {content.tagline}
                    </p>

                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-auto">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-xs text-slate-700 font-space">{tech}</span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="text-xs text-slate-700 font-space">+{project.stack.length - 3}</span>
                      )}
                    </div>

                    {/* View arrow */}
                    <div className="flex items-center gap-1.5 mt-5 text-amber-500/0 group-hover:text-amber-400/80 transition-all duration-300 text-xs font-space font-medium">
                      <span>{t('viewDetails')}</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </article>
                </Link>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
