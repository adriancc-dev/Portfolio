import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'val', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always',
});
