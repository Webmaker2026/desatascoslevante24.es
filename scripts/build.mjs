// Genera el sitio estático en dist/ (servido por Cloudflare Workers Static Assets).
// Uso: node scripts/build.mjs
import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as C from '../src/content.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist');
const cfg = JSON.parse(readFileSync(join(root, 'site.config.json'), 'utf8'));

const E164 = /^\+[1-9]\d{7,14}$/;
const site = {
  name: 'Desatascos Levante 24',
  url: cfg.url.replace(/\/$/, ''),
  phone: E164.test(cfg.phone || '') ? cfg.phone : '',
  whatsapp: E164.test(cfg.whatsapp || '') ? cfg.whatsapp : '',
  company: cfg.company || '',
  taxId: cfg.taxId || '',
  address: cfg.address || '',
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cfg.email || '') ? cfg.email : '',
  registry: cfg.registry || '',
  legalReviewed: cfg.legalReviewed === true,
  live: cfg.live === true,
};
const launchReady = Boolean(site.live && site.phone && site.company && site.taxId && site.address && site.email && site.registry && site.legalReviewed);
const pending = (value, label) => value || `[${label}: pendiente de completar]`;

// Sin número real, los botones llevan a Contacto (estado «pendiente de activar»), nunca a un tel: ficticio.
const callHref = site.phone ? `tel:${site.phone}` : '/contacto/#telefono';
const waHref = site.whatsapp ? `https://wa.me/${site.whatsapp.slice(1)}` : '/contacto/#whatsapp';
const waAttrs = site.whatsapp ? ' target="_blank" rel="noopener noreferrer"' : '';

// ---------- utilidades ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const n2 = (k) => String(k + 1).padStart(2, '0');
const P = {
  phone: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z',
  chat: 'M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z',
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  check: 'm5 12 4 4L19 6',
  shield: 'm12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Zm-4 9 3 3 5-6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  clock: 'M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  logo: 'M4 4v9a7 7 0 0 0 7 7h9v-6h-8a2 2 0 0 1-2-2V4M2 4h10m8 8v10',
};
const icon = (name, size = 16, cls = '') =>
  `<svg class="ico${cls ? ' ' + cls : ''}" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${P[name]}"/></svg>`;
const img = (name, alt, cls = '', extra = '') =>
  `<img src="/assets/img/${name}.webp" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''} width="1600" height="1067" decoding="async"${extra}>`;

let assetVersion = '';

// ---------- piezas comunes ----------
function head({ title, description, path, jsonLd = [] }) {
  const full = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const canonical = site.url + path;
  const robots = launchReady ? 'index,follow' : 'noindex,nofollow';
  const ld = jsonLd.map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`).join('\n');
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${robots}">
<meta name="theme-color" content="#0D1B2A">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_ES">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}/assets/img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/manrope.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/source-serif-4.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/site.css?v=${assetVersion}">
<script src="/assets/site.js?v=${assetVersion}" defer></script>
${ld}
</head>
<body>
<a class="skip" href="#main">Saltar al contenido</a>`;
}

const brand = `<a class="brand" href="/" aria-label="${site.name} · Inicio">
  <span class="brand-mark">${icon('logo', 22)}</span>
  <span class="brand-text"><span class="brand-name">${site.name}</span><span class="brand-sub">DESATASCOS · INSPECCIÓN · 24 H</span></span>
</a>`;

function header(active) {
  const links = C.nav.map((l) => `<a href="${l.href}"${l.key === active ? ' aria-current="page"' : ''}>${l.label}</a>`).join('');
  return `<div class="topbar"><div class="container topbar-in">
  <span class="topbar-live"><span class="dot" aria-hidden="true"></span>Servicio de desatascos 24 horas · 365 días</span>
  <span class="topbar-zones">Alicante · Benidorm · Torrevieja · Elche · Altea y alrededores</span>
</div></div>
<header class="site-header" data-header>
  <div class="container header-in">
    ${brand}
    <nav class="nav" id="site-nav" aria-label="Navegación principal">
      <div class="nav-links">${links}</div>
      <div class="nav-extra">
        <a class="btn btn-bronze btn-block" href="${callHref}">${icon('phone', 18)}Llamar 24 h</a>
        <a class="btn btn-outline btn-block" href="${waHref}"${waAttrs}>${icon('chat', 18)}WhatsApp</a>
        <p>Provincia de Alicante · Atención 24 horas</p>
      </div>
    </nav>
    <a class="header-wa" href="${waHref}"${waAttrs}>WhatsApp</a>
    <a class="btn btn-bronze header-call" href="${callHref}">${icon('phone', 16)}<span>Llamar<span class="hide-xs"> 24 h</span></span></a>
    <button class="menu-btn" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="Abrir menú" data-menu-btn>
      ${icon('menu', 20, 'i-open')}${icon('close', 20, 'i-close')}
    </button>
  </div>
</header>`;
}

function footer() {
  const zones = C.cityMenuOrder.map((s) => C.cities.find((c) => c.slug === s)).map((c) => `<a href="/desatascos-${c.slug}/">Desatascos en ${c.name}</a>`).join('');
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <div class="footer-logo"><span class="brand-mark brand-mark-dark">${icon('logo', 20)}</span><span>${site.name}</span></div>
      <p>Desatascos e inspección de tuberías con cámara en la provincia de Alicante, a cualquier hora.</p>
      <p class="footer-note">Las imágenes son ilustrativas, generadas con IA; no representan trabajos ni personal de la empresa.</p>
    </div>
    <div class="footer-col"><div class="kicker kicker-light">SERVICIOS</div><a href="${C.DRAIN}">Desatascos 24 horas</a><a href="${C.CAM}">Inspección con cámara</a><a href="/zonas/">Zonas de servicio</a><a href="/contacto/">Contacto</a></div>
    <div class="footer-col"><div class="kicker kicker-light">ZONAS</div>${zones}</div>
    <div class="footer-col footer-contact"><div class="kicker kicker-light">CONTACTO DIRECTO</div><span>24 horas · 365 días</span><a class="btn btn-brass" href="${callHref}">${icon('phone', 16)}Llamar ahora</a><a href="/contacto/">Ver canales de contacto</a></div>
  </div>
  <div class="footer-bottom"><div class="container footer-bottom-in">
    <span>© 2026 ${site.name}</span>
    <div class="footer-legal"><a href="/aviso-legal/">Aviso legal</a><a href="/politica-de-privacidad/">Privacidad</a><a href="/politica-de-cookies/">Cookies</a></div>
  </div></div>
</footer>
<div class="callbar" aria-label="Contacto rápido">
  <a class="btn btn-bronze" href="${callHref}">${icon('phone', 17)}Llamar 24 h</a>
  <a class="btn btn-line" href="${waHref}"${waAttrs}>${icon('chat', 17)}WhatsApp</a>
</div>
</body>
</html>
`;
}

function breadcrumb(items, light = false) {
  const all = [{ name: 'Inicio', href: '/' }, ...items];
  const html = `<nav class="crumbs${light ? ' crumbs-light' : ''}" aria-label="Ruta de navegación"><ol>${all
    .map((it, i) => (i === all.length - 1 ? `<li><span aria-current="page">${esc(it.name)}</span></li>` : `<li><a href="${it.href}">${esc(it.name)}</a></li>`))
    .join('')}</ol></nav>`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: site.url + it.href })),
  };
  return { html, ld };
}

const kicker = (text, light = false, line = false) =>
  `<div class="kicker${light ? ' kicker-light' : ''}">${line ? '<span class="kline" aria-hidden="true"></span>' : ''}${text}</div>`;

function faqList(rows, openFirst = true) {
  return `<div class="faq">${rows
    .map(([q, a], k) => `<details${openFirst && k === 0 ? ' open' : ''}><summary><span>${esc(q)}</span><span class="faq-sign" aria-hidden="true"></span></summary><p>${esc(a)}</p></details>`)
    .join('')}</div>`;
}

function faqSchema(rows) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: rows.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}

function ctaPair(dark = true) {
  return `<div class="cta-pair">
  <a class="btn btn-brass btn-lg" href="${callHref}">${icon('phone', 18)}Llamar ahora</a>
  <a class="btn ${dark ? 'btn-ghost' : 'btn-outline'} btn-lg" href="${waHref}"${waAttrs}>${icon('chat', 18)}WhatsApp</a>
</div>`;
}

function closing(title = 'Que el agua vuelva a su sitio.') {
  return `<section class="section closing-wrap" aria-labelledby="cierre-t">
  <div class="container closing">
    <div class="closing-main">
      ${kicker('¿UN ATASCO AHORA MISMO?', true)}
      <h2 id="cierre-t" class="h2">${esc(title)}</h2>
      <p>Cuéntanos qué ocurre y dónde estás. Te confirmamos disponibilidad, desplazamiento y presupuesto antes de empezar.</p>
      <div class="cta-pair">
        <a class="btn btn-brass btn-lg" href="${callHref}">${icon('phone', 18)}Llamar 24 h</a>
        <a class="btn btn-ghost btn-lg" href="${waHref}"${waAttrs}>${icon('chat', 18)}WhatsApp</a>
      </div>
    </div>
    <div class="closing-side">
      <div class="h4">Si escribes por WhatsApp</div>
      <p>Un mensaje breve con estos datos nos permite responderte mejor:</p>
      <ol class="num-list">${C.waMsg.map((t, k) => `<li><span class="num">${n2(k)}</span>${t}</li>`).join('')}</ol>
      <p class="fine">WhatsApp es un servicio de Meta. Evita enviar datos sensibles; un mensaje no implica una reserva confirmada.</p>
    </div>
  </div>
</section>`;
}

function cityRows(list) {
  return `<div class="zone-card">
  <div class="zone-ends"><span>NORTE · MARINA BAIXA</span><span class="hide-sm">PROVINCIA DE ALICANTE</span></div>
  <div class="zone-list">${list
    .map((c) => `<a class="zone-row" href="/desatascos-${c.slug}/">
      <span class="zone-node" aria-hidden="true"><span></span></span>
      <span class="zone-name"><span class="zone-city">${c.name}</span><span class="zone-region">${c.zone}</span></span>
      <span class="zone-areas">${c.areas.slice(1).join(' · ')}</span>
      ${icon('arrow', 16, 'zone-arrow')}
    </a>`)
    .join('')}</div>
  <div class="zone-ends zone-end">SUR · VEGA BAJA</div>
</div>`;
}

const business = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': site.url + '/#business',
  name: site.name,
  url: site.url,
  image: site.url + '/assets/img/hero.webp',
  ...(site.phone ? { telephone: site.phone } : {}),
  ...(site.email ? { email: site.email } : {}),
  areaServed: C.cities.map((c) => ({ '@type': 'City', name: c.name })),
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' }],
});

// ---------- páginas ----------
function home() {
  const svc = C.homeServices;
  return `${head({
    title: 'Desatascos 24 horas en Alicante y la Costa Blanca | Desatascos Levante 24',
    description: 'Desatascos urgentes 24 horas e inspección de tuberías con cámara en Alicante, Benidorm, Torrevieja, Elche y Altea. Presupuesto confirmado antes de intervenir.',
    path: '/',
    jsonLd: [business(), faqSchema(C.homeFaqs)],
  })}
${header('home')}
<main id="main">
<section class="hero" aria-labelledby="hero-t">
  <div class="hero-copy">
    ${kicker('URGENCIAS 24 H · PROVINCIA DE ALICANTE', true, true)}
    <h1 id="hero-t" class="display">Desatascos 24 horas en Alicante y <em>toda la Costa Blanca.</em></h1>
    <p class="hero-lead">WC, fregaderos, tuberías y arquetas, e inspección con cámara cuando el atasco se repite. Una llamada y te decimos cómo seguir.</p>
    ${ctaPair(true)}
    <p class="hero-micro">Disponibilidad y presupuesto confirmados antes de intervenir.</p>
  </div>
  <figure class="hero-media">
    ${img('desatascos', 'Imagen ilustrativa de un técnico guiando una manguera de desatasco en una arqueta', '', ' fetchpriority="high"')}
    <figcaption class="tag-ill">Imagen ilustrativa</figcaption>
  </figure>
  <div class="hero-info">
    <div class="hero-info-head"><div class="kicker">AL LLAMAR, TEN A MANO</div><div class="h4">Tres datos que agilizan la ayuda</div></div>
    ${C.callInfo.map(([t, x], k) => `<div class="hero-info-item"><span class="num num-lg">${n2(k)}</span><div><div class="strong">${t}</div><div class="muted">${x}</div></div></div>`).join('')}
  </div>
</section>

<section class="section symptoms-sec" aria-labelledby="sint-t">
  <div class="container split split-400">
    <div>
      ${kicker('ANTES DE QUE VAYA A MÁS')}
      <h2 id="sint-t" class="h2">¿Reconoces alguno de estos síntomas?</h2>
      <p class="lead">La mayoría de atascos avisan. Identificar la señal ayuda a valorar si basta un desatasco o conviene revisar la tubería con cámara.</p>
      <a class="link-arrow" href="${callHref}">Lo tengo ahora: llamar${icon('arrow', 16)}</a>
    </div>
    <div class="symptoms">${C.symptoms
      .map(([t, x, tag]) => `<div class="symptom"><h3 class="h5">${t}</h3><p>${x}</p><span class="pill ${tag === 'Urgente' ? 'pill-bronze' : tag === 'Cámara recomendada' ? 'pill-navy' : ''}">${tag}</span></div>`)
      .join('')}</div>
  </div>
</section>

<section class="section bg-white" aria-labelledby="serv-t">
  <div class="container">
    <div class="sec-head">
      <div>${kicker('NUESTROS SERVICIOS')}<h2 id="serv-t" class="h2">Seis situaciones, dos especialidades.</h2></div>
      <p class="lead">Nos centramos en desatascar e inspeccionar. Elige tu caso para ver qué suele ocurrir y qué puedes esperar.</p>
    </div>
    <div class="svc" data-tabs>
      <div class="svc-tabs" role="tablist" aria-label="Servicios">
        ${svc.map((s, k) => `<button type="button" role="tab" id="svc-tab-${k}" aria-controls="svc-panel-${k}" aria-selected="${k === 0}"${k ? ' tabindex="-1"' : ''} class="svc-tab">
          <span class="svc-n">${n2(k)}</span>
          <span class="svc-t"><span class="svc-title">${s.title}</span><span class="svc-short">${s.short}</span><span class="svc-group">${s.group}</span></span>
          ${icon('arrow', 15, 'svc-arrow')}
        </button>`).join('')}
        <div class="svc-note">No realizamos reformas ni fontanería general.</div>
      </div>
      ${svc.map((s, k) => `<div class="svc-panel" role="tabpanel" id="svc-panel-${k}" aria-labelledby="svc-tab-${k}"${k ? ' hidden' : ''}>
        <div class="svc-media ${s.cam ? 'svc-media-cam' : 'svc-media-drain'}">${s.cam
          ? img('inspeccion', 'Detalle ilustrativo del monitor de una cámara de inspección', '', ' loading="lazy"')
          : img('desatascos', 'Detalle ilustrativo de una manguera de desatasco entrando en una arqueta', '', ' loading="lazy"')}<span class="tag-ill tag-ill-bl">${s.cam ? 'Detalle ilustrativo del monitor' : 'Detalle ilustrativo'}</span></div>
        <div class="svc-body">
          ${kicker(s.kicker)}
          <h3 class="h3">${s.title}</h3>
          <p>${s.text}</p>
          <div class="label">SEÑALES HABITUALES</div>
          <ul class="checks">${s.signs.map((g) => `<li>${icon('check', 16)}${g}</li>`).join('')}</ul>
          <div class="note"><strong>Qué puedes esperar · </strong>${s.expect}</div>
          <div class="svc-actions"><a class="btn btn-bronze" href="${callHref}">Consultar este caso</a><a class="link-plain" href="${s.href}">Ver el servicio →</a></div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="section bg-navy cam-sec" aria-labelledby="cam-t">
  <div class="container">
    <div class="cam-head">
      <div>${kicker('INSPECCIÓN DE TUBERÍAS CON CÁMARA', true, true)}<h2 id="cam-t" class="h2">Ver dentro de la tubería antes de decidir.</h2></div>
      <p class="lead">Cuando un atasco vuelve, repetir la misma intervención no siempre lo resuelve. La cámara recorre el tramo accesible y muestra dónde está la obstrucción y en qué estado se encuentra la conducción.</p>
    </div>
    <div class="cam-grid">
      <figure class="cam-media">${img('hero', 'Imagen ilustrativa de un técnico realizando una inspección con cámara junto a una arqueta', '', ' loading="lazy"')}<figcaption class="tag-ill tag-ill-tl">Imagen ilustrativa</figcaption></figure>
      <div class="cam-report">
        ${kicker('TRAS LA INSPECCIÓN TE EXPLICAMOS', true)}
        ${C.camReport.map(([t, x], k) => `<div class="cam-report-row"><span class="num">${n2(k)}</span><div><div class="h5">${t}</div><p>${x}</p></div></div>`).join('')}
      </div>
    </div>
    <div class="cam-cols">${C.camCols.map((c) => `<div><h3 class="h5">${c.title}</h3><ul class="dash">${c.items.map((it) => `<li>${it}</li>`).join('')}</ul></div>`).join('')}</div>
    <div class="cam-foot">
      <p>La inspección no incluye por sí misma una reparación. En ocasiones es necesario un desatasco previo para que la cámara avance.</p>
      <a class="btn btn-brass" href="${C.CAM}">Conocer la inspección${icon('arrow', 16)}</a>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="como-t">
  <div class="container">
    <div class="how-head">
      <div>${kicker('ATENCIÓN 24 HORAS · CÓMO FUNCIONA')}<h2 id="como-t" class="h2">De la llamada a la solución, sin sorpresas.</h2><p class="lead">Atendemos de día, de noche y en fin de semana. Antes de desplazarnos confirmamos disponibilidad para tu dirección y te damos una estimación; no prometemos tiempos que no podamos cumplir.</p></div>
      <aside class="aside-sand"><div class="h4">Mientras esperas</div><ul class="checks checks-rule">${C.waiting.map((w) => `<li>${icon('check', 16)}${w}</li>`).join('')}</ul></aside>
    </div>
    ${stepsHtml(C.steps)}
  </div>
</section>

<section class="section bg-sand" aria-labelledby="zon-t">
  <div class="container zones-split">
    <div>
      ${kicker('ZONAS DE SERVICIO')}
      <h2 id="zon-t" class="h2">A lo largo de la Costa Blanca, de la Marina Baixa a la Vega Baja.</h2>
      <p class="lead">Cinco ciudades de referencia y sus municipios cercanos. Cada zona tiene su propia página con información local: accesos, tipo de viviendas y preguntas habituales.</p>
      <div class="note note-light"><strong>¿Tu localidad no aparece?</strong> Llámanos: confirmamos la cobertura para tu dirección. No indicamos oficinas físicas en estas localidades.</div>
      <a class="link-arrow" href="/zonas/">Ver todas las zonas${icon('arrow', 16)}</a>
    </div>
    ${cityRows(C.cities)}
  </div>
</section>

<section class="section bg-white" aria-labelledby="faq-t">
  <div class="container split split-400">
    <div>
      ${kicker('PREGUNTAS FRECUENTES')}
      <h2 id="faq-t" class="h2">Respuestas claras antes de llamar.</h2>
      <p class="lead">Preferimos explicar lo que depende de cada caso antes que prometer lo que no podemos confirmar.</p>
      <ul class="principles">${C.principles.map((p) => `<li>${icon('shield', 17)}${p}</li>`).join('')}</ul>
    </div>
    ${faqList(C.homeFaqs)}
  </div>
</section>
${closing()}
</main>
${footer()}`;
}

function stepsHtml(rows) {
  return `<ol class="steps steps-${rows.length}">${rows
    .map(([t, x], k) => `<li class="step"><span class="step-node${k === 0 ? ' is-first' : ''}">${n2(k)}</span><div><h3 class="h5">${t}</h3><p>${x}</p></div></li>`)
    .join('')}</ol>`;
}

function servicePage(s) {
  const path = `/servicios/${s.slug}/`;
  const bc = breadcrumb([{ name: s.title, href: path }], true);
  const faqs = [[s.question, s.answer], C.faqNight, C.faqWaiting];
  const other = C.services.find((o) => o !== s);
  return `${head({
    title: s.metaTitle,
    description: s.metaDescription,
    path,
    jsonLd: [bc.ld, faqSchema(faqs), { '@context': 'https://schema.org', '@type': 'Service', name: s.title, serviceType: s.title, provider: { '@id': site.url + '/#business' }, areaServed: C.cities.map((c) => ({ '@type': 'City', name: c.name })) }],
  })}
${header(s.key)}
<main id="main">
<section class="hero hero-sub" aria-labelledby="hero-t">
  <div class="hero-copy">
    ${bc.html}
    ${kicker(s.eyebrow.toUpperCase(), true, true)}
    <h1 id="hero-t" class="display">${s.title}</h1>
    <p class="hero-lead">${s.intro}</p>
    ${ctaPair(true)}
    <p class="hero-micro">Disponibilidad y presupuesto confirmados antes de intervenir.</p>
  </div>
  <figure class="hero-media">${img(s.image, s.alt, '', ' fetchpriority="high"')}<figcaption class="tag-ill">Imagen ilustrativa</figcaption></figure>
</section>

<section class="section bg-white points-sec" aria-label="Lo esencial">
  <div class="container points">${s.points.map((p) => `<div class="point">${icon('check', 18)}<span>${p}</span></div>`).join('')}</div>
</section>

<section class="section" aria-labelledby="scope-t">
  <div class="container">
    <div class="sec-head">
      <div>${kicker(s.scopeKicker)}<h2 id="scope-t" class="h2">${s.scopeTitle}</h2></div>
      <p class="lead">${s.scopeIntro}</p>
    </div>
    <div class="cards4">${s.scope.map((c, k) => `<div class="card"><span class="num num-lg">${n2(k)}</span><h3 class="h5">${c.title}</h3><p>${c.text}</p></div>`).join('')}</div>
  </div>
</section>

<section class="section bg-navy" aria-labelledby="body-t">
  <div class="container split split-even">
    <div>${kicker('CÓMO LO ABORDAMOS', true, true)}<h2 id="body-t" class="h2">${s.bodyTitle}</h2></div>
    <div><p class="lead">${s.body}</p>${stepsHtml(C.serviceSteps)}</div>
  </div>
</section>

<section class="section bg-white" aria-labelledby="faq-t">
  <div class="container split split-400">
    <div>
      ${kicker('PREGUNTAS FRECUENTES')}
      <h2 id="faq-t" class="h2">Lo que conviene saber.</h2>
      <p class="lead">¿Buscas otra cosa? Consulta también <a class="link-inline" href="/servicios/${other.slug}/">${other.title.toLowerCase()}</a>.</p>
      <div class="chips"><span class="chips-label">Zonas:</span>${C.cityMenuOrder.map((slug) => C.cities.find((c) => c.slug === slug)).map((c) => `<a class="chip" href="/desatascos-${c.slug}/">${c.name}</a>`).join('')}</div>
    </div>
    ${faqList(faqs)}
  </div>
</section>
${closing(s.cta)}
</main>
${footer()}`;
}

function cityPage(c) {
  const path = `/desatascos-${c.slug}/`;
  const bc = breadcrumb([{ name: 'Zonas', href: '/zonas/' }, { name: c.name, href: path }], true);
  const faqs = [[c.question, c.answer], C.faqArrival, C.faqPrice];
  const others = C.cityMenuOrder.filter((s) => s !== c.slug).map((s) => C.cities.find((x) => x.slug === s));
  return `${head({
    title: `Desatascos en ${c.name} 24 horas`,
    description: `${c.intro.split('. ')[0]}. Presupuesto confirmado antes de intervenir.`,
    path,
    jsonLd: [bc.ld, faqSchema(faqs)],
  })}
${header('zones')}
<main id="main">
<section class="hero hero-sub" aria-labelledby="hero-t">
  <div class="hero-copy">
    ${bc.html}
    ${kicker(`DESATASCOS 24 H · ${c.region.toUpperCase()}`, true, true)}
    <h1 id="hero-t" class="display">${c.headline}</h1>
    <p class="hero-lead">${c.intro}</p>
    ${ctaPair(true)}
    <p class="hero-micro">Confirmamos cobertura y presupuesto para tu dirección antes del desplazamiento.</p>
  </div>
  <figure class="hero-media">${img(c.image, `Imagen ilustrativa de un servicio de desatascos en ${c.name}`, '', ' fetchpriority="high"')}<figcaption class="tag-ill">Imagen ilustrativa</figcaption></figure>
</section>

<section class="section" aria-labelledby="ctx-t">
  <div class="container split split-400">
    <div>
      ${kicker(`EN ${c.name.toUpperCase()}`)}
      <h2 id="ctx-t" class="h2">${c.scenario}.</h2>
    </div>
    <div>
      <p class="lead">${c.context}</p>
      <div class="note"><strong>Consejo · </strong>${c.tip}</div>
      <div class="label">LOCALIDADES DE REFERENCIA</div>
      <ul class="areas">${c.areas.map((a) => `<li>${icon('pin', 16)}${a}</li>`).join('')}</ul>
      <p class="muted small">¿Tu localidad no aparece? Llámanos y confirmamos la cobertura para tu dirección. No indicamos oficinas físicas en estas localidades.</p>
    </div>
  </div>
</section>

<section class="section bg-white" aria-labelledby="svcs-t">
  <div class="container">
    <div class="sec-head"><div>${kicker('SERVICIOS')}<h2 id="svcs-t" class="h2">Dos especialidades en ${c.name}.</h2></div><p class="lead">Nos centramos en desatascar e inspeccionar. No realizamos reformas ni fontanería general.</p></div>
    <div class="svc-cards">${C.services
      .map((s) => `<a class="svc-card" href="/servicios/${s.slug}/">
        <div class="svc-card-media">${img(s.image, s.alt, '', ' loading="lazy"')}</div>
        <div class="svc-card-body">${kicker(s.eyebrow.toUpperCase())}<h3 class="h3">${s.title}</h3><p>${s.intro}</p><span class="link-arrow">Ver el servicio${icon('arrow', 16)}</span></div>
      </a>`)
      .join('')}</div>
  </div>
</section>

<section class="section" aria-labelledby="faq-t">
  <div class="container split split-400">
    <div>
      ${kicker('PREGUNTAS FRECUENTES')}
      <h2 id="faq-t" class="h2">Preguntas habituales en ${c.name}.</h2>
      <div class="chips"><span class="chips-label">Otras zonas:</span>${others.map((o) => `<a class="chip" href="/desatascos-${o.slug}/">${o.name}</a>`).join('')}<a class="chip" href="/zonas/">Todas</a></div>
    </div>
    ${faqList(faqs)}
  </div>
</section>
${closing()}
</main>
${footer()}`;
}

function zonesPage() {
  const bc = breadcrumb([{ name: 'Zonas de servicio', href: '/zonas/' }], true);
  return `${head({
    title: 'Zonas de servicio en Alicante',
    description: 'Desatascos y cámara de tuberías en Alicante, Benidorm, Torrevieja, Elche, Altea y alrededores. Consulta la cobertura para tu dirección.',
    path: '/zonas/',
    jsonLd: [bc.ld],
  })}
${header('zones')}
<main id="main">
<section class="page-head" aria-labelledby="hero-t">
  <div class="container">
    ${bc.html}
    ${kicker('PROVINCIA DE ALICANTE', true, true)}
    <h1 id="hero-t" class="display">La ayuda empieza <em>cerca de ti.</em></h1>
    <p class="hero-lead">Selecciona tu localidad para conocer el servicio de desatascos 24 horas e inspección con cámara en tu zona.</p>
  </div>
</section>
<section class="section bg-sand" aria-label="Localidades">
  <div class="container zones-split">
    <div>
      ${kicker('DE NORTE A SUR')}
      <h2 class="h2">Cinco ciudades de referencia y sus municipios cercanos.</h2>
      <p class="lead">Cada zona tiene su propia página con información local: accesos, tipo de viviendas y preguntas habituales.</p>
      <div class="note note-light"><strong>¿Tu localidad no aparece?</strong> Consulta la cobertura en el entorno de estas zonas. La disponibilidad se confirma para cada dirección; no se garantiza un tiempo de llegada fijo.</div>
    </div>
    ${cityRows(C.cities)}
  </div>
</section>
${closing()}
</main>
${footer()}`;
}

function contactPage() {
  const bc = breadcrumb([{ name: 'Contacto', href: '/contacto/' }], true);
  const phoneBox = site.phone
    ? `<p class="contact-number">${esc(site.phone)}</p><a class="btn btn-bronze btn-lg btn-block" href="${callHref}">${icon('phone', 18)}Llamar 24 h</a>`
    : `<div class="pending"><strong>Teléfono pendiente de activar</strong><p>El número de contacto todavía no está publicado. Este canal estará disponible cuando se complete la información de la empresa.</p></div>`;
  const waBox = site.whatsapp
    ? `<a class="btn btn-outline btn-lg btn-block" href="${waHref}"${waAttrs}>${icon('chat', 18)}Escribir por WhatsApp</a>`
    : `<div class="pending"><strong>WhatsApp pendiente de activar</strong><p>Este canal todavía no está disponible. No se enviará ningún mensaje desde esta página.</p></div>`;
  return `${head({
    title: 'Contacto | Desatascos 24 horas en Alicante',
    description: 'Contacta por teléfono o WhatsApp para desatascos e inspección de tuberías con cámara en la provincia de Alicante.',
    path: '/contacto/',
    jsonLd: [bc.ld],
  })}
${header('contact')}
<main id="main">
<section class="page-head" aria-labelledby="hero-t">
  <div class="container">
    ${bc.html}
    ${kicker('CONTACTO DIRECTO', true, true)}
    <h1 id="hero-t" class="display">Cuéntanos <em>qué ocurre.</em></h1>
    <p class="hero-lead">Para desatascos e inspección de tuberías con cámara en Alicante y alrededores. Sin formularios: habla con nosotros por el canal que prefieras.</p>
  </div>
</section>
<section class="section" aria-label="Canales de contacto">
  <div class="container">
    <div class="contact-grid">
      <article class="contact-card" id="telefono">
        <span class="contact-ico">${icon('phone', 22)}</span>
        <h2 class="h3">Por teléfono</h2>
        <p>La vía principal para consultar una incidencia urgente, a cualquier hora.</p>
        ${phoneBox}
      </article>
      <article class="contact-card" id="whatsapp">
        <span class="contact-ico">${icon('chat', 22)}</span>
        <h2 class="h3">Por WhatsApp</h2>
        <p>Indica la localidad y describe brevemente el problema.</p>
        ${waBox}
        <p class="fine">Al abrir WhatsApp accederás a un servicio de Meta con su propia política de privacidad. Evita enviar datos sensibles.</p>
      </article>
    </div>
    <div class="contact-prep">
      <div>
        <h2 class="h3">Antes de contactar</h2>
        <ul class="checks">${['Ten a mano tu localidad y dirección.', 'Explica qué desagües están afectados.', 'Indica si has usado algún producto químico.', 'Consulta disponibilidad, desplazamiento y presupuesto.'].map((t) => `<li>${icon('check', 16)}${t}</li>`).join('')}</ul>
      </div>
      <aside class="aside-sand">
        <div class="h4">${icon('clock', 18)} Atención de desatascos 24 horas</div>
        <p>La disponibilidad y la previsión de llegada se confirman al contactar. Las solicitudes por WhatsApp no implican una reserva ni una intervención confirmada.</p>
      </aside>
    </div>
    ${site.email ? `<p>Para consultas sobre privacidad: <a class="link-inline" href="mailto:${esc(site.email)}">${esc(site.email)}</a>.</p>` : ''}
    <p class="muted small">Consulta cómo se tratarán tus datos en la <a class="link-inline" href="/politica-de-privacidad/">política de privacidad</a>.</p>
  </div>
</section>
</main>
${footer()}`;
}

function companyDetails() {
  const rows = [
    ['Titular / responsable', pending(site.company, 'Razón social o nombre completo')],
    ['Nombre comercial', site.name],
    ['NIF / CIF', pending(site.taxId, 'Identificación fiscal')],
    ['Domicilio', pending(site.address, 'Dirección completa')],
    ['Correo electrónico', pending(site.email, 'Email de contacto y privacidad')],
    ['Teléfono', pending(site.phone, 'Teléfono')],
    ['Registro', pending(site.registry, 'Datos registrales o no aplicabilidad verificada')],
  ];
  return `<dl class="dl">${rows.map(([l, v]) => `<div><dt>${l}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>`;
}

const legalDocs = [
  { path: '/aviso-legal/', title: 'Aviso legal', description: 'Identificación del titular, condiciones de uso y alcance del sitio desatascoslevante24.es.' },
  { path: '/politica-de-privacidad/', title: 'Política de privacidad', description: 'Información sobre el tratamiento de datos, finalidades, bases jurídicas y derechos conforme al RGPD y a la LOPDGDD.' },
  { path: '/politica-de-cookies/', title: 'Política de cookies', description: 'Qué almacenamiento utiliza el sitio, proveedores, duración y cómo gestionarlo.' },
];

function legalPage(doc, body) {
  const bc = breadcrumb([{ name: doc.title, href: doc.path }], true);
  const incomplete = !site.legalReviewed || !site.company || !site.taxId || !site.address || !site.email || !site.registry;
  const sections = [...body.matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)];
  return `${head({ title: doc.title, description: doc.description, path: doc.path, jsonLd: [bc.ld] })}
${header('')}
<main id="main">
<section class="page-head page-head-sm" aria-labelledby="hero-t">
  <div class="container">
    ${bc.html}
    ${kicker('INFORMACIÓN Y TRANSPARENCIA', true, true)}
    <h1 id="hero-t" class="display">${doc.title}</h1>
    <p class="hero-lead">Versión del documento: 12 de octubre de 2026.</p>
  </div>
</section>
<section class="section" aria-label="${doc.title}">
  <div class="container legal">
    <aside class="legal-index">
      <div class="label">EN ESTA PÁGINA</div>
      <ol>${sections.map(([, id, t]) => `<li><a href="#${id}">${t}</a></li>`).join('')}</ol>
      <div class="label">OTROS DOCUMENTOS</div>
      <ul>${legalDocs.filter((d) => d !== doc).map((d) => `<li><a href="${d.path}">${d.title}</a></li>`).join('')}</ul>
    </aside>
    <article class="prose">
      ${incomplete ? '<div class="legal-pending">Documento pendiente de completar y validar por el titular antes de activar el sitio. Los campos entre corchetes identifican información que todavía no se ha facilitado.</div>' : ''}
      ${body}
    </article>
  </div>
</section>
</main>
${footer()}`;
}

const ext = (href, text) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

function avisoLegal() {
  return legalPage(legalDocs[0], `
<h2 id="titular">1. Identificación del titular</h2>
<p>En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico, se facilita la información del titular de desatascoslevante24.es.</p>
${companyDetails()}
<h2 id="objeto">2. Objeto y alcance</h2>
<p>Este sitio informa exclusivamente sobre desatascos 24 horas e inspección de tuberías con cámara en la provincia de Alicante. La cobertura, la disponibilidad, el desplazamiento, el precio y el alcance concreto del servicio se confirman antes de su contratación.</p>
<p>El contacto por teléfono o WhatsApp no constituye por sí solo una reserva ni un contrato. No se realiza contratación ni pago en esta web. El titular deberá facilitar, antes de contratar, la información precontractual y las condiciones aplicables, incluidos los derechos que correspondan a las personas consumidoras.</p>
<h2 id="uso">3. Uso del sitio</h2>
<p>El usuario se compromete a utilizar el sitio de forma lícita y a no realizar acciones que dañen su funcionamiento o los derechos de terceros. No debe enviar información innecesaria o especialmente sensible por los canales de contacto.</p>
<h2 id="contenidos">4. Contenidos e imágenes</h2>
<p>Los textos, el diseño y los demás elementos del sitio están sujetos a los derechos que correspondan a sus titulares. Las imágenes se han generado mediante IA con finalidad ilustrativa; no son pruebas de trabajos realizados ni fotografías del personal, vehículos o equipamiento de la empresa. No se publican opiniones de clientes, certificaciones o precios que no hayan sido verificados.</p>
<h2 id="enlaces">5. Disponibilidad y enlaces externos</h2>
<p>Se procura mantener la información actualizada, sin perjuicio de las responsabilidades legalmente exigibles. Los enlaces externos, incluido WhatsApp, conducen a servicios de terceros que disponen de sus propias condiciones. Ninguna cláusula de este aviso limita derechos irrenunciables del consumidor.</p>
<h2 id="datos">6. Protección de datos y cookies</h2>
<p>El tratamiento de datos y las preferencias de almacenamiento se explican en la <a href="/politica-de-privacidad/">política de privacidad</a> y en la <a href="/politica-de-cookies/">política de cookies</a>.</p>
<h2 id="legislacion">7. Legislación aplicable</h2>
<p>Resulta aplicable la legislación española y europea que corresponda. Cualquier controversia se someterá a los juzgados y tribunales competentes conforme a la normativa aplicable, respetando el fuero que legalmente corresponda a los consumidores.</p>`);
}

function privacidad() {
  return legalPage(legalDocs[1], `
<p>Esta política describe el tratamiento previsto de datos personales conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).</p>
<h2 id="responsable">1. Responsable del tratamiento</h2>
${companyDetails()}
<h2 id="datos">2. Datos y procedencia</h2>
<p>El sitio no dispone de formularios, cuentas ni pagos en línea. Al contactar voluntariamente por teléfono, email o WhatsApp, puedes facilitar nombre, datos de contacto, dirección de la incidencia y una descripción o imágenes del problema. No envíes información sensible ni datos de terceros que no sean necesarios.</p>
<p>El alojamiento puede tratar direcciones IP, fecha, recurso solicitado y datos técnicos para entregar y proteger el sitio. Esta versión del sitio no utiliza herramientas de analítica ni de publicidad, y las fuentes tipográficas se sirven desde el propio dominio.</p>
<h2 id="finalidades">3. Finalidades y bases jurídicas</h2>
<ul>
<li>Atender una solicitud de presupuesto o servicio y gestionar la relación contractual: medidas precontractuales solicitadas y ejecución del contrato (artículo 6.1.b RGPD).</li>
<li>Atender obligaciones fiscales, contables o requerimientos legalmente exigibles: cumplimiento de obligaciones legales (artículo 6.1.c).</li>
<li>Garantizar la disponibilidad y seguridad técnica del sitio: interés legítimo en proteger el servicio, sujeto a evaluación y ponderación (artículo 6.1.f).</li>
</ul>
<p>No se envían comunicaciones comerciales por el mero hecho de contactar. No hay decisiones automatizadas con efectos jurídicos en esta web.</p>
<h2 id="conservacion">4. Conservación</h2>
<p>Las consultas se conservan mientras sean necesarias para responderlas y gestionar la solicitud. Si se contrata un servicio, la documentación se mantiene durante la relación y los plazos legales exigibles, con bloqueo cuando proceda. El titular debe concretar y documentar los plazos operativos de consultas y registros técnicos antes de activar el sitio; no se autoriza una conservación indefinida.</p>
<h2 id="destinatarios">5. Destinatarios y proveedores</h2>
<p>Podrán acceder a los datos los proveedores necesarios para prestar y alojar el servicio, sujetos a los acuerdos de tratamiento aplicables, y las administraciones cuando exista obligación legal. El sitio se aloja en Cloudflare; el titular debe confirmar el proveedor y su configuración efectiva antes de publicar.</p>
<p>WhatsApp es un canal externo de Meta que solo se abre al seguir su enlace. Consulta las políticas de ${ext('https://www.cloudflare.com/privacypolicy/', 'Cloudflare')} y ${ext('https://www.whatsapp.com/legal/privacy-policy-eea', 'WhatsApp')}.</p>
<h2 id="transferencias">6. Transferencias internacionales</h2>
<p>Algunos proveedores pueden tratar datos fuera del Espacio Económico Europeo. El titular debe verificar las ubicaciones y garantías aplicables a cada proveedor: decisiones de adecuación vigentes o, cuando corresponda, cláusulas contractuales tipo y medidas complementarias.</p>
<h2 id="derechos">7. Tus derechos</h2>
<p>Puedes solicitar acceso, rectificación, supresión, oposición, limitación y portabilidad cuando proceda, así como retirar tu consentimiento sin afectar a la licitud del tratamiento anterior. Dirige tu solicitud a ${esc(pending(site.email, 'Email para ejercer derechos'))} o al domicilio del responsable. Solo se solicitará información adicional de identificación cuando sea necesaria y proporcionada.</p>
<p>Las solicitudes se atenderán en los plazos establecidos por el RGPD, con carácter general en un mes, ampliable en los supuestos legalmente previstos. También puedes reclamar ante la ${ext('https://www.aepd.es/', 'Agencia Española de Protección de Datos')}.</p>
<h2 id="cambios">8. Cambios</h2>
<p>Esta política debe revisarse si cambian los tratamientos o proveedores, en particular antes de incorporar herramientas de analítica o publicidad.</p>`);
}

function cookies() {
  return legalPage(legalDocs[2], `
<p>Una cookie es un pequeño archivo que un sitio guarda en tu navegador. Esta política explica qué almacenamiento utiliza esta versión del sitio.</p>
<h2 id="activo">1. Qué está activo en esta versión</h2>
<p>El sitio no instala cookies propias ni de terceros y no utiliza almacenamiento local. No se cargan herramientas de analítica (Google Analytics) ni de publicidad (Google Ads), y no hay fuentes, vídeos ni mapas de terceros incrustados: las fuentes tipográficas se sirven desde este dominio. Por ello no se muestra un aviso de consentimiento.</p>
<h2 id="inventario">2. Inventario de almacenamiento</h2>
<div class="table-wrap" tabindex="0" role="region" aria-label="Inventario de almacenamiento, tabla desplazable">
<table>
<thead><tr><th>Nombre / proveedor</th><th>Finalidad y tipo</th><th>Duración</th><th>Activación</th></tr></thead>
<tbody>
<tr><td>Ninguno</td><td>El sitio no guarda cookies ni datos en el navegador.</td><td>—</td><td>—</td></tr>
</tbody>
</table>
</div>
<p>El proveedor de alojamiento (Cloudflare) puede utilizar cookies técnicas estrictamente necesarias para la seguridad de la red en situaciones concretas, según su ${ext('https://www.cloudflare.com/cookie-policy/', 'política de cookies')}.</p>
<h2 id="cambios">3. Si se incorporan herramientas opcionales</h2>
<p>Antes de activar analítica o publicidad, el titular debe incorporar un sistema de consentimiento que permita aceptar o rechazar con la misma visibilidad, mantener las categorías opcionales desactivadas hasta su autorización y actualizar esta política con el inventario efectivo.</p>
<h2 id="externos">4. Servicios externos</h2>
<p>Los enlaces a WhatsApp no instalan sus cookies en esta página. Al abrir el servicio, se aplican las condiciones de Meta. Consulta la <a href="/politica-de-privacidad/">política de privacidad del sitio</a> para más información sobre proveedores y transferencias.</p>
<h2 id="navegador">5. Controles del navegador</h2>
<p>Puedes borrar cookies y almacenamiento local desde la configuración de privacidad de tu navegador.</p>`);
}

function notFound() {
  return `${head({ title: 'Página no encontrada', description: 'La página solicitada no existe.', path: '/404/' }).replace('content="index,follow"', 'content="noindex"')}
${header('')}
<main id="main">
<section class="page-head" aria-labelledby="hero-t">
  <div class="container">
    ${kicker('ERROR 404', true, true)}
    <h1 id="hero-t" class="display">Esta página <em>no existe.</em></h1>
    <p class="hero-lead">Puede que el enlace esté mal escrito o que la página se haya movido. Estas son las secciones principales:</p>
    <div class="chips chips-dark"><a class="chip" href="/">Inicio</a>${C.nav.map((l) => `<a class="chip" href="${l.href}">${l.label}</a>`).join('')}</div>
  </div>
</section>
${closing()}
</main>
${footer()}`;
}

// ---------- salida ----------
function write(path, html) {
  const file = path.endsWith('.html') ? join(out, path) : join(out, path, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  return path;
}

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'assets'), { recursive: true });
cpSync(join(root, 'src/static/fonts'), join(out, 'assets/fonts'), { recursive: true });
cpSync(join(root, 'src/static/img'), join(out, 'assets/img'), { recursive: true });
const css = readFileSync(join(root, 'src/static/site.css'), 'utf8');
const js = readFileSync(join(root, 'src/static/site.js'), 'utf8');
assetVersion = createHash('sha256').update(css).update(js).digest('hex').slice(0, 10);
writeFileSync(join(out, 'assets/site.css'), css);
writeFileSync(join(out, 'assets/site.js'), js);
cpSync(join(root, 'src/static/icon.svg'), join(out, 'icon.svg'));
cpSync(join(root, 'src/static/_headers'), join(out, '_headers'));

const pages = [
  write('/', home()),
  ...C.services.map((s) => write(`/servicios/${s.slug}/`, servicePage(s))),
  write('/zonas/', zonesPage()),
  ...C.cities.map((c) => write(`/desatascos-${c.slug}/`, cityPage(c))),
  write('/contacto/', contactPage()),
  write('/aviso-legal/', avisoLegal()),
  write('/politica-de-privacidad/', privacidad()),
  write('/politica-de-cookies/', cookies()),
];
write('404.html', notFound());

writeFileSync(
  join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${site.url}${p}</loc></url>`).join('\n')}\n</urlset>\n`,
);
// La indexación se controla con <meta name="robots"> (noindex hasta launchReady); robots.txt no bloquea
// para que los buscadores puedan leer esa etiqueta.
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

console.log(`dist/: ${pages.length} páginas + 404 (launchReady=${launchReady}, assets v${assetVersion})`);
