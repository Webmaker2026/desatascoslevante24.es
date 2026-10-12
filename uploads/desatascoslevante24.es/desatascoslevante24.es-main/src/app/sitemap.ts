import type { MetadataRoute } from 'next';
import { cities, services } from '@/lib/content';
import { site } from '@/lib/config';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '/',
    ...services.map((s) => `/servicios/${s.slug}/`),
    ...cities.map((c) => `/desatascos-${c.slug}/`),
    '/zonas/',
    '/contacto/',
    '/aviso-legal/',
    '/politica-de-privacidad/',
    '/politica-de-cookies/',
  ].map((path) => ({
    url: site.url + path,
    changeFrequency: 'monthly',
    priority:
      path === '/' ? 1 : path.startsWith('/politica') || path === '/aviso-legal/' ? 0.3 : 0.8,
  }));
}
