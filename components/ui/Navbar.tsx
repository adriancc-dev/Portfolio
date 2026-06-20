'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['about', 'projects', 'stack', 'contact'] as const;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
    >
      <nav
        className={`max-w-5xl mx-auto rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'glass border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border-transparent'
        } border`}
      >
        {/* Logo */}
        <a href={`/${locale}#hero`} className="font-clash text-xl font-bold gradient-text tracking-[0.2em]">
          ACC
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-sm font-space text-slate-400">
          {links.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="hover:text-amber-400 transition-colors duration-200 relative group"
            >
              {t(section)}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a
            href={locale === 'en' ? '/cv-en.pdf' : '/cv-es.pdf'}
            download
            className="hidden md:block btn-primary !py-2 !px-4 !text-xs"
          >
            {t('downloadCV')}
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-amber-400 transition-colors"
            aria-label="Menu"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`h-px bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-px bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-px bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden max-w-5xl mx-auto mt-2 glass rounded-2xl px-6 py-4 flex flex-col gap-4"
        >
          {links.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => setMenuOpen(false)}
              className="text-slate-300 hover:text-amber-400 transition-colors font-space text-sm"
            >
              {t(section)}
            </a>
          ))}
          <a
            href={locale === 'en' ? '/cv-en.pdf' : '/cv-es.pdf'}
            download
            className="btn-primary !text-sm text-center"
          >
            {t('downloadCV')}
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}
