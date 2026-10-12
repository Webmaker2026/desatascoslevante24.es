const phone = (value: string | undefined) => (/^\+[1-9]\d{7,14}$/.test(value || '') ? value! : '');
const email = process.env.NEXT_PUBLIC_EMAIL || '';
export const site = {
  name: 'Desatascos Levante 24',
  url: 'https://desatascoslevante24.es',
  phone: phone(process.env.NEXT_PUBLIC_PHONE),
  whatsapp: phone(process.env.NEXT_PUBLIC_WHATSAPP),
  company: process.env.NEXT_PUBLIC_COMPANY_NAME || '',
  taxId: process.env.NEXT_PUBLIC_TAX_ID || '',
  address: process.env.NEXT_PUBLIC_ADDRESS || '',
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : '',
  registry: process.env.NEXT_PUBLIC_REGISTRY || '',
  legalReviewed: process.env.NEXT_PUBLIC_LEGAL_REVIEWED === 'true',
  live: process.env.NEXT_PUBLIC_SITE_LIVE === 'true',
  gaId: /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_ID || '')
    ? process.env.NEXT_PUBLIC_GA_ID!
    : '',
  adsId: /^AW-\d+$/.test(process.env.NEXT_PUBLIC_ADS_ID || '')
    ? process.env.NEXT_PUBLIC_ADS_ID!
    : '',
  callLabel: process.env.NEXT_PUBLIC_ADS_CALL_LABEL || '',
  whatsappLabel: process.env.NEXT_PUBLIC_ADS_WHATSAPP_LABEL || '',
};
export const launchReady = Boolean(
  site.live &&
  site.phone &&
  site.company &&
  site.taxId &&
  site.address &&
  site.email &&
  site.registry &&
  site.legalReviewed,
);
export const pending = (value: string, label: string) =>
  value || `[${label}: pendiente de completar]`;
