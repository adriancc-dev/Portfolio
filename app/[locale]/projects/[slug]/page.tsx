import { projects, Locale } from '@/content/projects';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/Footer';
import AnimateIn from '@/components/ui/AnimateIn';

type Props = {
  params: { locale: string; slug: string };
};

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const sectionIcons: Record<string, React.ReactNode> = {
  problem: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L2 17h16L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 8v4M10 14.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  decisions: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2a5 5 0 0 1 3 9v2H7v-2A5 5 0 0 1 10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M7 16h6M8 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  challenges: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M14 2l4 4-9.5 9.5L4 12 14 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M2 18l2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M11 5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  outcome: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  const locale = params.locale as Locale;
  const content = project[locale];

  return {
    title: `${content.title} | Adrián Cabedo`,
    description: content.description,
    openGraph: {
      title: `${content.title} | Adrián Cabedo`,
      description: content.description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${content.title} | Adrián Cabedo`,
      description: content.description,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const locale = params.locale as Locale;
  const content = project[locale];
  const t = await getTranslations({ locale, namespace: 'projectDetail' });

  const color = project.color;
  const colorGlow = hexToRgba(color, 0.12);
  const colorGlowFaint = hexToRgba(color, 0.06);
  const colorBorder = hexToRgba(color, 0.3);
  const colorBg = hexToRgba(color, 0.08);
  const colorText = hexToRgba(color, 0.9);

  const sections = [
    { key: 'problem',    text: content.problem },
    { key: 'decisions',  text: content.decisions },
    { key: 'challenges', text: content.challenges },
    { key: 'outcome',    text: content.outcome },
  ] as const;

  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  return (
    <>
      <Navbar />

      <main className="min-h-screen">

        {/* ── Hero header ─────────────────────────────── */}
        <div className="relative pt-36 pb-20 px-6 overflow-hidden">

          {/* Background glows */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
            style={{ background: colorGlow }}
          />
          <div
            className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none"
            style={{ background: colorGlowFaint }}
          />

          {/* Grid decoration */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(${colorText} 1px, transparent 1px), linear-gradient(90deg, ${colorText} 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto">

            {/* Back link */}
            <AnimateIn direction="left" delay={0}>
              <Link
                href={`/${locale}#projects`}
                className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-400 transition-colors duration-200 font-space text-sm mb-10 group"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:-translate-x-1 transition-transform">
                  <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {t('backToProjects')}
              </Link>
            </AnimateIn>

            {/* Tags */}
            <AnimateIn delay={0.05}>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-amber">{tag}</span>
                ))}
              </div>
            </AnimateIn>

            {/* Title */}
            <AnimateIn delay={0.1}>
              <h1
                className="font-clash font-bold gradient-text leading-none mb-4"
                style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)' }}
              >
                {content.title}
              </h1>
            </AnimateIn>

            {/* Tagline */}
            <AnimateIn delay={0.15}>
              <p className="text-slate-400 font-space text-lg md:text-xl mb-6 max-w-2xl leading-relaxed">
                {content.tagline}
              </p>
            </AnimateIn>

            {/* Description */}
            <AnimateIn delay={0.2}>
              <p className="text-slate-500 font-space text-sm md:text-base mb-10 max-w-2xl leading-relaxed">
                {content.description}
              </p>
            </AnimateIn>

            {/* CTA buttons */}
            <AnimateIn delay={0.25}>
              <div className="flex flex-wrap gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost inline-flex items-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                    {t('viewCode')}
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 2h10v10H2z" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M5 2v10M9 2v10M2 5h10M2 9h10" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
                      <path d="M10 4l-6 6M10 4H7M10 4v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {t('viewDemo')}
                  </a>
                )}
              </div>
            </AnimateIn>
          </div>
        </div>

        {/* ── Divider ─────────────────────────────────── */}
        <div
          className="w-full h-px mx-auto max-w-4xl"
          style={{ background: `linear-gradient(90deg, transparent, ${colorBorder}, transparent)` }}
        />

        {/* ── Content sections ─────────────────────────── */}
        <div className="max-w-4xl mx-auto px-6 py-20 space-y-6">

          {sections.map(({ key, text }, i) => (
            <AnimateIn key={key} delay={i * 0.07}>
              <article
                className="glass-card p-8 md:p-10 relative overflow-hidden"
                style={{ borderColor: i === sections.length - 1 ? colorBorder : undefined }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${hexToRgba(color, i === sections.length - 1 ? 0.6 : 0.25)}, transparent)`,
                  }}
                />

                {/* Corner glow for outcome */}
                {i === sections.length - 1 && (
                  <div
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                    style={{ background: colorGlowFaint }}
                  />
                )}

                {/* Section number + label + icon */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-clash text-4xl font-bold leading-none" style={{ color: hexToRgba(color, 0.15) }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="section-label" style={{ color }}>{t(key as any)}</p>
                  </div>
                  <div className="ml-auto" style={{ color }}>
                    {sectionIcons[key]}
                  </div>
                </div>

                {/* Text */}
                <p className="text-slate-300 font-space leading-relaxed text-sm md:text-base">
                  {text}
                </p>
              </article>
            </AnimateIn>
          ))}

          {/* ── Stack card ─────────────────────────────── */}
          <AnimateIn delay={0.28}>
            <article className="glass-card p-8 md:p-10 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${hexToRgba(color, 0.2)}, transparent)` }}
              />

              <div className="flex items-center gap-3 mb-6">
                <span className="font-clash text-4xl font-bold leading-none" style={{ color: hexToRgba(color, 0.15) }}>
                  05
                </span>
                <p className="section-label" style={{ color }}>{t('stack')}</p>
                <div className="ml-auto" style={{ color }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="12" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="2" y="12" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="12" y="12" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-space text-sm px-4 py-1.5 rounded-full transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      background: colorBg,
                      color: colorText,
                      border: `1px solid ${hexToRgba(color, 0.2)}`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </AnimateIn>
        </div>

        {/* ── Project navigation ───────────────────────── */}
        <div className="max-w-4xl mx-auto px-6 pb-24">
          <div
            className="w-full h-px mb-12"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)' }}
          />

          <div className="grid grid-cols-2 gap-4">
            {prevProject ? (
              <AnimateIn direction="left">
                <Link
                  href={`/${locale}/projects/${prevProject.slug}`}
                  className="glass-card p-5 flex flex-col gap-1 group"
                >
                  <span className="section-label text-slate-600 group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                    {t('prevProject')}
                  </span>
                  <span className="font-clash text-white text-lg group-hover:text-amber-400 transition-colors">
                    {prevProject[locale].title}
                  </span>
                </Link>
              </AnimateIn>
            ) : (
              <div />
            )}

            {nextProject ? (
              <AnimateIn direction="none" delay={0.05}>
                <Link
                  href={`/${locale}/projects/${nextProject.slug}`}
                  className="glass-card p-5 flex flex-col gap-1 items-end text-right group"
                >
                  <span className="section-label text-slate-600 group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                    {t('nextProject')}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <span className="font-clash text-white text-lg group-hover:text-amber-400 transition-colors">
                    {nextProject[locale].title}
                  </span>
                </Link>
              </AnimateIn>
            ) : (
              <div />
            )}
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
