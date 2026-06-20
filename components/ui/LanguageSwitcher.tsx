'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const locales = [
  { code: 'es', label: 'ES' },
  { code: 'val', label: 'VAL' },
  { code: 'en', label: 'EN' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="flex gap-1 glass rounded-full px-2 py-1">
      {locales.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => switchLocale(code)}
          className={`text-xs px-2 py-1 rounded-full transition-all font-space ${
            locale === code
              ? 'bg-amber-500 text-black font-semibold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
