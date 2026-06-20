import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Adrián Cabedo Cañós | Full Stack Developer & AI Engineer',
  description:
    'Portfolio of Adrián Cabedo Cañós — Full Stack Developer & AI Engineer from Spain. Mobile apps, full stack web, and applied AI.',
  openGraph: {
    title: 'Adrián Cabedo Cañós | Full Stack Developer & AI Engineer',
    description: 'Portfolio of Adrián Cabedo Cañós — Full Stack Developer & AI Engineer from Spain.',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adrián Cabedo Cañós | Full Stack Developer & AI Engineer',
    description: 'Portfolio of Adrián Cabedo Cañós — Full Stack Developer & AI Engineer from Spain.',
  },
};

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!routing.locales.includes(locale as 'es' | 'val' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
