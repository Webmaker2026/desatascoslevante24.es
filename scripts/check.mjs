// Comprueba dist/: cada enlace y recurso interno debe existir y cada página debe tener viewport, título y un único h1.
// Uso: npm run build && npm run check
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const pages = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && pages.push(p); });
walk(dist);

const resolve = (url) => {
  const path = decodeURI(url.split(/[?#]/)[0]);
  if (path.endsWith('/')) return join(dist, path, 'index.html');
  return join(dist, path);
};

const errors = [];
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const page = '/' + relative(dist, file).replace(/index\.html$/, '');
  if (!/<meta name="viewport" content="width=device-width, initial-scale=1/.test(html)) errors.push(`${page}: falta meta viewport`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${page}: falta <title>`);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) errors.push(`${page}: ${h1} elementos h1`);
  if (/style="/.test(html)) errors.push(`${page}: estilos en línea (bloqueados por la CSP)`);
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const [, attr, url] of html.matchAll(/\s(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(url)) continue;
    if (url.startsWith('#')) { if (url.length > 1 && !ids.has(url.slice(1))) errors.push(`${page}: ancla rota ${url}`); continue; }
    if (!url.startsWith('/')) { errors.push(`${page}: ruta relativa ${attr}="${url}"`); continue; }
    const target = resolve(url);
    if (!existsSync(target)) { errors.push(`${page}: ${attr}="${url}" no existe en dist/`); continue; }
    const hash = url.split('#')[1];
    if (hash && !readFileSync(target, 'utf8').includes(`id="${hash}"`)) errors.push(`${page}: ancla rota ${url}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`OK: ${pages.length} páginas HTML, todos los enlaces internos resuelven.`);
