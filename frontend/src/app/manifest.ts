import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Saravanan — Full-Stack Engineer',
    short_name: 'Saravanan',
    description:
      'Full-Stack Developer portfolio showcasing multi-tenant SaaS architectures, backend engineering, and AI-integrated applications.',
    start_url: '/',
    display: 'standalone',
    background_color: '#111110',
    theme_color: '#d8f34a',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
