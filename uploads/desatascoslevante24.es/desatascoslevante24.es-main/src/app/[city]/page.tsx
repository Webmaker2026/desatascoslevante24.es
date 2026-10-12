import { notFound } from 'next/navigation';
import { cities } from '@/lib/content';
import { metadata as createMetadata } from '@/lib/seo';
import { site } from '@/lib/config';
import { Hero, TrustStrip, ServiceCards, Process, Faq, Cta, JsonLd } from '@/components/Site';
import { Icon } from '@/components/Icon';
export const dynamicParams = false;
export function generateStaticParams() {
  return cities.map((c) => ({ city: `desatascos-${c.slug}` }));
}
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = cities.find((c) => `desatascos-${c.slug}` === city);
  return c
    ? createMetadata(`Desatascos ${c.name} 24 horas | Cámara de tuberías`, c.intro, `/${city}/`)
    : {};
}
export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = cities.find((c) => `desatascos-${c.slug}` === city);
  if (!c) notFound();
  return (
    <>
      <Hero city={c} />
      <TrustStrip />
      <section className="section container local-section">
        <div>
          <div className="eyebrow">DESATASCOS EN {c.name.toUpperCase()}</div>
          <h2>
            {c.scenario}.<br />
            <span className="muted-heading">Atención a tu medida.</span>
          </h2>
          <p className="lead">{c.context}</p>
        </div>
        <aside className="local-card">
          <Icon name="pin" />
          <h3>{c.region}</h3>
          <p>Consulta cobertura para tu dirección:</p>
          <ul>
            {c.areas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
          <p className="small">
            La disponibilidad y el desplazamiento se confirman al contactar. No se indica una
            oficina física en estas localidades.
          </p>
        </aside>
      </section>
      <section className="container">
        <div className="help-note">
          <Icon name="shield" />
          <div>
            <strong>Un detalle que ayuda</strong>
            <p>{c.tip}</p>
          </div>
        </div>
      </section>
      <ServiceCards />
      <Process />
      <Faq extra={[[c.question, c.answer]]} />
      <Cta title={`¿Un atasco en ${c.name}? Hablemos.`} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `Desatascos 24 horas en ${c.name}`,
          serviceType: 'Desatascos e inspección de tuberías con cámara',
          provider: { '@id': site.url + '/#business' },
          areaServed: { '@type': 'City', name: c.name },
          url: `${site.url}/${city}/`,
        }}
      />
    </>
  );
}
