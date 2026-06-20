'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import HeroFallback from '../3d/HeroFallback';

const HeroScene = dynamic(() => import('../3d/HeroScene'), { ssr: false });

const stagger = {
  container: {
    animate: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  },
  item: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  },
};

export default function Hero() {
  const t = useTranslations('hero');

  const mouseRef = useRef<[number, number]>([0, 0]);
  const scrollRef = useRef(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    const onScroll = () => {
      scrollRef.current = Math.min(window.scrollY / (window.innerHeight * 0.8), 1);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-violet-500/6 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 right-1/3 w-[250px] h-[250px] bg-yellow-400/4 rounded-full blur-[90px]" />
      </div>

      {/* Grid lines decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,158,11,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left: text content */}
        <motion.div
          variants={stagger.container}
          initial="initial"
          animate="animate"
          className="text-center lg:text-left"
        >
          <motion.p variants={stagger.item} className="section-label mb-6">
            {t('greeting')}
          </motion.p>

          <motion.h1
            variants={stagger.item}
            className="font-clash font-bold gradient-text leading-none mb-6"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 6.5rem)' }}
          >
            Adrián<br />Cabedo Canós
          </motion.h1>

          <motion.div
            variants={stagger.item}
            className="flex justify-center lg:justify-start mb-4"
          >
            <span className="glass px-5 py-2 rounded-full text-slate-300 font-space text-base tracking-wide border border-white/10">
              {t('role')}
            </span>
          </motion.div>

          <motion.div
            variants={stagger.item}
            className="flex items-center justify-center lg:justify-start gap-2 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-space text-xs text-slate-400 tracking-wide">{t('available')}</span>
          </motion.div>

          <motion.p
            variants={stagger.item}
            className="text-slate-500 font-space mb-10 leading-relaxed text-sm max-w-md mx-auto lg:mx-0"
          >
            {t('description')}
          </motion.p>

          <motion.div
            variants={stagger.item}
            className="flex gap-4 justify-center lg:justify-start flex-wrap"
          >
            <a href="#projects" className="btn-primary">
              {t('cta')}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#contact" className="btn-ghost">
              {t('ctaSecondary')}
            </a>
          </motion.div>
        </motion.div>

        {/* Right: 3D sphere — desktop only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="hidden lg:block relative h-[560px] rounded-2xl overflow-hidden"
        >
          <HeroScene mouseRef={mouseRef} scrollRef={scrollRef} />
        </motion.div>
      </div>

      {/* Mobile fallback — only on small screens */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="lg:hidden flex justify-center pb-4"
      >
        <HeroFallback />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-transparent via-amber-500/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
