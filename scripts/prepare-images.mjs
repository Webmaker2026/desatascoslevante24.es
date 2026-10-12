import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
const [hero, drain] = process.argv.slice(2);
if (!hero || !drain)
  throw new Error('Usage: node scripts/prepare-images.mjs <camera-image.png> <drain-image.png>');
await mkdir('public/images', { recursive: true });
await Promise.all([
  sharp(hero)
    .resize({ width: 1100, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile('public/images/hero.webp'),
  sharp(hero)
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile('public/images/inspeccion.webp'),
  sharp(drain)
    .resize({ width: 1100, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile('public/images/desatascos.webp'),
  sharp(hero)
    .resize(1200, 630, { fit: 'cover' })
    .jpeg({ quality: 82 })
    .toFile('public/images/og.jpg'),
]);
console.log('Prepared four local, optimized images. No external image requests are needed.');
