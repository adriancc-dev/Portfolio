'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'none';
};

export default function AnimateIn({
  children,
  delay = 0,
  className,
  direction = 'up',
}: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const initial =
    direction === 'up'
      ? { opacity: 0, y: 40 }
      : direction === 'left'
      ? { opacity: 0, x: -30 }
      : { opacity: 0 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
