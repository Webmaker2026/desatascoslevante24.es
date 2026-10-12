import Link from 'next/link';
import Image from 'next/image';
import { cities, services, faqs } from '@/lib/content';
import { site } from '@/lib/config';
import { Icon } from './Icon';
import { Brand } from './Header';
import { ContactActions, ContactButton } from './ContactButton';
import { CookieSettings } from './Consent';
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
export function Breadcrumb({ items }: { items: { name: string; href: string }[] }) {
  return (
    <>
      <nav className="breadcrumb" aria-label="Ruta de navegación">
        <Link href="/">Inicio</Link>
        {items.map((item, i) => (
          <span key={item.href}>
            <span aria-hidden="true"> / </span>
            {i === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link href={item.href}>{item.name}</Link>
            )}
          </span>
        ))}
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [{ name: 'Inicio', href: '/' }, ...items].map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: site.url + item.href,
          })),
        }}
      />
    </>
  );
}
export function Hero({ city }: { city?: (typeof cities)[number] }) {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          {city ? (
            <Breadcrumb
              items={[
                { name: 'Zonas', href: '/zonas/' },
                { name: city.name, href: `/desatascos-${city.slug}/` },
              ]}
            />
          ) : (
            <div className="eyebrow">
              <span className="short-line" /> TU TRANQUILIDAD, A CUALQUIER HORA
            </div>
          )}
          <div className="hero-status">
            <i className="status-dot" /> ATENCIÓN 24 HORAS{' '}
            {city ? `EN ${city.name.toUpperCase()}` : 'EN ALICANTE'}
          </div>
          <h1>
            {city ? (
              city.headline
            ) : (
              <>
                Un atasco no avisa.
                <br />
                Nosotros <em>respondemos.</em>
              </>
            )}
          </h1>
          <p className="hero-description">
            {city?.intro ||
              'Desatascos e inspección de tuberías con cámara en Alicante y alrededores. Cuéntanos qué ocurre. Te ayudamos a dar el siguiente paso.'}
          </p>
          <ContactActions placement={city ? `city-${city.slug}` : 'hero'} />
          <p className="microcopy">
            {site.phone
              ? 'Consulta disponibilidad y presupuesto antes de la intervención.'
              : 'Canales de contacto pendientes de activación.'}
          </p>
          <div className="hero-benefits">
            <span>
              <Icon name="clock" /> Día y noche
            </span>
            <span>
              <Icon name="camera" /> Diagnóstico con cámara
            </span>
            <span>
              <Icon name="pin" /> Atención local
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <Image
            src="/images/hero.webp"
            alt="Imagen ilustrativa de una inspección de desagüe con cámara en un patio mediterráneo"
            width={900}
            height={1050}
            priority
            sizes="(max-width: 760px) 100vw, 48vw"
            className="hero-image"
          />
          <div className="image-label">
            <span className="status-dot" /> DESATASCOS & INSPECCIÓN
          </div>
          <div className="floating-note">
            <span className="note-icon">
              <Icon name="shield" />
            </span>
            <div>
              <strong>Claridad desde el primer contacto.</strong>
              <span>Explicamos el trabajo antes de empezar.</span>
            </div>
          </div>
          <span className="image-caption">Imagen ilustrativa</span>
        </div>
      </div>
    </section>
  );
}
export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Nuestro enfoque">
      <div className="container trust-grid">
        {[
          ['clock', 'Atención 24 horas', 'También fines de semana'],
          ['pipe', 'Dos especialidades', 'Desatascos e inspección'],
          ['shield', 'Sin sorpresas', 'Consulta las condiciones'],
          ['pin', 'Cerca de ti', 'Provincia de Alicante'],
        ].map(([icon, title, text]) => (
          <div key={title}>
            <Icon name={icon} />
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export function ServiceCards() {
  return (
    <section className="section container" id="servicios">
      <div className="section-heading">
        <div>
          <div className="eyebrow">ESPECIALISTAS EN LO QUE NECESITAS</div>
          <h2>
            Dos servicios.
            <br />
            Una solución bien enfocada.
          </h2>
        </div>
        <p>
          Desatascar cuando hay una urgencia.
          <br />
          Inspeccionar para entender qué ocurre.
        </p>
      </div>
      <div className="service-grid">
        {services.map((service, i) => (
          <article className="service-card" key={service.slug}>
            <div className="service-image">
              <Image
                src={service.image}
                alt={service.alt}
                width={760}
                height={450}
                loading="lazy"
                sizes="(max-width: 760px) 100vw, 45vw"
              />
              <span>
                0{i + 1} / {i === 0 ? 'INTERVENCIÓN' : 'DIAGNÓSTICO'}
              </span>
            </div>
            <div className="service-body">
              <Icon name={i === 0 ? 'pipe' : 'camera'} />
              <h3>{service.title}</h3>
              <p>
                {i === 0
                  ? 'Para esos momentos en los que el agua deja de fluir. Viviendas, comunidades y negocios, de día o de noche.'
                  : 'Mirar dentro cambia las cosas. Una revisión del interior de la tubería para orientar el diagnóstico.'}
              </p>
              <Link href={`/servicios/${service.slug}/`} className="arrow-link">
                Conocer el servicio <Icon name="arrow" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section className="process section">
      <div className="container">
        <div className="eyebrow">UN PROCESO SENCILLO</div>
        <h2>
          Del problema al siguiente paso.
          <br />
          <span className="muted-heading">Con claridad, desde el principio.</span>
        </h2>
        <div className="steps">
          {[
            [
              '01',
              'Cuéntanos qué pasa',
              'Llama o escribe por WhatsApp. Indica tu localidad y qué desagüe está afectado.',
            ],
            [
              '02',
              'Acordamos la intervención',
              'Consulta disponibilidad, desplazamiento y presupuesto antes de autorizar el trabajo.',
            ],
            [
              '03',
              'Actuamos sobre el problema',
              'Se valora el atasco o la inspección y se explican los resultados y los siguientes pasos.',
            ],
          ].map(([number, title, text]) => (
            <article key={number}>
              <span className="step-number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Coverage() {
  return (
    <section className="section container coverage">
      <div>
        <div className="eyebrow">ALICANTE Y ALREDEDORES</div>
        <h2>Estamos en tu zona.</h2>
        <p>
          De la Marina Baixa a la Vega Baja.
          <br />
          Consulta la atención disponible en tu localidad.
        </p>
        <Link href="/zonas/" className="arrow-link">
          Ver todas las zonas <Icon name="arrow" />
        </Link>
        <div className="province-stamp">
          <Icon name="pin" />
          <span>
            PROVINCIA DE
            <br />
            <strong>ALICANTE</strong>
          </span>
        </div>
      </div>
      <div className="city-list">
        {cities.map((city, i) => (
          <Link href={`/desatascos-${city.slug}/`} key={city.slug}>
            <span className="city-index">0{i + 1}</span>
            <div>
              <strong>{city.name}</strong>
              <span>{city.region}</span>
            </div>
            <Icon name="arrow" />
          </Link>
        ))}
      </div>
    </section>
  );
}
export function Faq({ extra = [] }: { extra?: readonly (readonly [string, string])[] }) {
  const questions = [...extra, ...faqs];
  return (
    <section className="section container faq-section">
      <div>
        <div className="eyebrow">ANTES DE LLAMAR</div>
        <h2>
          Resolvemos <br />
          tus dudas.
        </h2>
        <p>
          Información clara para decidir
          <br />
          con tranquilidad.
        </p>
      </div>
      <div className="faq-list">
        {questions.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function Cta({ title = 'Que el agua vuelva a su sitio.' }: { title?: string }) {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <div className="eyebrow">DESATASCOS LEVANTE 24</div>
          <h2>{title}</h2>
          <p>Estamos para ayudarte. Cuéntanos qué ocurre.</p>
        </div>
        <div>
          <ContactActions placement="bottom-cta" />
          <p className="microcopy">Desatascos 24h · Inspección con cámara</p>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Brand />
              <p>
                Desatascos e inspección de tuberías con cámara.
                <br />
                Alicante y alrededores. A cualquier hora.
              </p>
              <span className="footer-caption">
                Las imágenes son ilustrativas, generadas con IA;
                <br />
                no representan trabajos ni personal de la empresa.
              </span>
            </div>
            <div>
              <h3>Servicios</h3>
              {services.map((s) => (
                <Link key={s.slug} href={`/servicios/${s.slug}/`}>
                  {s.title}
                </Link>
              ))}
              <Link href="/contacto/">Contacto</Link>
            </div>
            <div>
              <h3>Zonas</h3>
              {cities.map((c) => (
                <Link key={c.slug} href={`/desatascos-${c.slug}/`}>
                  Desatascos en {c.name}
                </Link>
              ))}
            </div>
            <div>
              <h3>Contacto directo</h3>
              <p>24 horas · 365 días</p>
              {site.phone ? (
                <ContactButton placement="footer">{site.phone}</ContactButton>
              ) : (
                <span>Teléfono pendiente de activar</span>
              )}
              {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
              <Link href="/contacto/">Consultar canales de contacto</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getUTCFullYear()} {site.name}
            </span>
            <div>
              <Link href="/aviso-legal/">Aviso legal</Link>
              <Link href="/politica-de-privacidad/">Privacidad</Link>
              <Link href="/politica-de-cookies/">Cookies</Link>
              <CookieSettings />
            </div>
          </div>
        </div>
      </footer>
      <div className="mobile-contact">
        <ContactButton placement="mobile-sticky">Llamar 24 horas</ContactButton>
        <ContactButton channel="whatsapp" placement="mobile-sticky">
          WhatsApp
        </ContactButton>
      </div>
    </>
  );
}
