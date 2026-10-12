import type { MetadataRoute } from 'next';
import { site, launchReady } from '@/lib/config';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', ...(launchReady ? { allow: '/' } : { disallow: '/' }) },
    sitemap: site.url + '/sitemap.xml',
    host: site.url,
  };
}
