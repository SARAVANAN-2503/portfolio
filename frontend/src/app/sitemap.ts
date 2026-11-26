import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://saravanan.krelyvo.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/projects',
    '/experience',
    '/architecture',
    '/api-explorer',
    '/performance',
    '/contact',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
