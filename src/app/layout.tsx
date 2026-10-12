import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer, JsonLd } from '@/components/Site';
import { Consent } from '@/components/Consent';
import { site, launchReady } from '@/lib/config';
import { businessSchema } from '@/lib/seo';
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Desatascos Levante 24 | Alicante y alrededores', template: '%s | Levante 24' },
  applicationName: site.name,
  icons: { icon: '/icon.svg' },
  robots: { index: launchReady, follow: launchReady },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#092f3d' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script src="/consent.js" />
      </head>
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <Consent />
        <JsonLd data={businessSchema()} />
      </body>
    </html>
  );
}
