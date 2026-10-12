import Image from 'next/image';
import { notFound } from 'next/navigation';
import { services } from '@/lib/content';
import { site } from '@/lib/config';
import { metadata as createMetadata } from '@/lib/seo';
import { Breadcrumb, JsonLd, Process, Coverage, Faq, Cta } from '@/components/Site';
import { ContactActions } from '@/components/ContactButton';
import { Icon } from '@/components/Icon';
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((s) => s.slug === slug);
  return s ? createMetadata(`${s.title} en Alicante`, s.intro, `/servicios/${slug}/`) : {};
}
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  return (
    <>
      <section className="subhero container">
        <Breadcrumb items={[{ name: service.title, href: `/servicios/${slug}/` }]} />
        <div className="detail-grid">
          <div>
            <div className="eyebrow">{service.eyebrow}</div>
            <h1>
              {service.title}
              <em> en Alicante.</em>
            </h1>
            <p className="lead">{service.intro}</p>
            <ContactActions placement={`service-${slug}`} />
            <ul className="check-list">
              {service.points.map((p) => (
                <li key={p}>
                  <Icon name="check" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <figure>
            <Image src={service.image} alt={service.alt} width={900} height={760} priority />
            <figcaption>Imagen ilustrativa</figcaption>
          </figure>
        </div>
      </section>
      <section className="container section narrow-copy">
        <div className="eyebrow">EL SERVICIO, PASO A PASO</div>
        <h2>
          {slug === 'desatascos-24-horas'
            ? 'Cada atasco necesita una valoración.'
            : 'Un diagnóstico que empieza mirando dentro.'}
        </h2>
        <p className="lead">{service.body}</p>
        <aside className="help-note">
          <Icon name="shield" />
          <p>
            Confirma el presupuesto, el desplazamiento y el alcance antes de autorizar la
            intervención. Los tiempos y medios necesarios dependen de cada caso.
          </p>
        </aside>
      </section>
      <Process />
      <Faq extra={[[service.question, service.answer]]} />
      <Coverage />
      <Cta />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.intro,
          url: `${site.url}/servicios/${slug}/`,
          provider: { '@id': site.url + '/#business' },
          areaServed: { '@type': 'AdministrativeArea', name: 'Provincia de Alicante' },
        }}
      />
    </>
  );
}
