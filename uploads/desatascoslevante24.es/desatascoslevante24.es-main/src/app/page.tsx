import { Hero, TrustStrip, ServiceCards, Process, Coverage, Faq, Cta } from '@/components/Site';
import { metadata as createMetadata } from '@/lib/seo';
export const metadata = createMetadata(
  'Desatascos 24 horas en Alicante e inspección con cámara',
  'Desatascos 24h e inspección de tuberías con cámara en Alicante, Benidorm, Torrevieja, Elche y Altea. Consulta disponibilidad por teléfono o WhatsApp.',
);
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServiceCards />
      <Process />
      <Coverage />
      <Faq />
      <Cta />
    </>
  );
}
