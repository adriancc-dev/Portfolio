import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="py-8 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-700 font-space text-xs">{t('rights')}</p>
        <div className="flex gap-6">
          <a
            href="https://github.com/adriancc-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 hover:text-amber-400 transition-colors font-space text-xs tracking-wide"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/adrian-cabedo-canos/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 hover:text-amber-400 transition-colors font-space text-xs tracking-wide"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
