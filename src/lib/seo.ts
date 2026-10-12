import type { Metadata } from 'next';
import { site, launchReady } from './config';
export function metadata(title: string, description: string, path = '/'): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: { index: launchReady, follow: launchReady },
    openGraph: {
      title,
      description,
      url: site.url + path,
      siteName: site.name,
      locale: 'es_ES',
      type: 'website',
      images: [{ url: '/images/og.jpg', width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/images/og.jpg'] },
  };
}
export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': site.url + '/#business',
    name: site.name,
    url: site.url,
    image: site.url + '/images/hero.webp',
    ...(site.phone ? { telephone: site.phone } : {}),
    ...(site.email ? { email: site.email } : {}),
    areaServed: ['Alicante', 'Benidorm', 'Torrevieja', 'Elche', 'Altea'].map((name) => ({
      '@type': 'City',
      name,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios',
      itemListElement: ['Desatascos 24 horas', 'Inspección de tuberías con cámara'].map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name },
      })),
    },
  };
}
