import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://adriancabedo.dev';
const locales = ['es', 'val', 'en'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const home = locales.map((locale) => ({
    url: `${BASE}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }));

  const detail = projects.flatMap((project) =>
    locales.map((locale) => ({
      url: `${BASE}/${locale}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  );

  return [...home, ...detail];
}
