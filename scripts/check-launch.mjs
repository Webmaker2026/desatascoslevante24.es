import nextEnv from '@next/env';
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
const errors = [];
for (const key of ['PHONE', 'COMPANY_NAME', 'TAX_ID', 'ADDRESS', 'EMAIL', 'REGISTRY'])
  if (!process.env['NEXT_PUBLIC_' + key]?.trim()) errors.push('Missing NEXT_PUBLIC_' + key);
if (!/^\+[1-9]\d{7,14}$/.test(process.env.NEXT_PUBLIC_PHONE || ''))
  errors.push('PHONE must be a valid E.164 number.');
if (process.env.NEXT_PUBLIC_WHATSAPP && !/^\+[1-9]\d{7,14}$/.test(process.env.NEXT_PUBLIC_WHATSAPP))
  errors.push('WHATSAPP must be a valid E.164 number.');
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(process.env.NEXT_PUBLIC_EMAIL || ''))
  errors.push('EMAIL must be valid.');
if (process.env.NEXT_PUBLIC_LEGAL_REVIEWED !== 'true')
  errors.push('Legal details, processors, retention and contracts must be reviewed.');
if (process.env.NEXT_PUBLIC_SITE_LIVE !== 'true')
  errors.push('NEXT_PUBLIC_SITE_LIVE must be true to enable indexing.');
for (const [name, regex] of [
  ['GA_ID', /^G-[A-Z0-9]+$/],
  ['ADS_ID', /^AW-\d+$/],
])
  if (process.env['NEXT_PUBLIC_' + name] && !regex.test(process.env['NEXT_PUBLIC_' + name]))
    errors.push('Invalid ' + name);
if (process.env.NEXT_PUBLIC_ADS_ID && !process.env.NEXT_PUBLIC_ADS_CALL_LABEL)
  errors.push('Google Ads is configured but its call-click conversion label is missing.');
if (
  process.env.NEXT_PUBLIC_ADS_ID &&
  process.env.NEXT_PUBLIC_WHATSAPP &&
  !process.env.NEXT_PUBLIC_ADS_WHATSAPP_LABEL
)
  errors.push('WhatsApp conversion label is missing.');
if (errors.length) {
  console.error('NOT READY FOR PUBLIC LAUNCH:\n' + errors.map((e) => '- ' + e).join('\n'));
  process.exitCode = 1;
} else
  console.log(
    'Required launch fields are configured. Confirm real phone/WhatsApp operation, legal content, Google Tag Assistant and domain settings before sending traffic.',
  );
