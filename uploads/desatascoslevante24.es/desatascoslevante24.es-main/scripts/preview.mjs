import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('out'),
  port = Number(process.env.PORT || 3000);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      let file = path.resolve(root, '.' + pathname);
      if (file !== root && !file.startsWith(root + path.sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      try {
        if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
      } catch {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(await readFile(path.join(root, '404.html')));
        return;
      }
      res.writeHead(200, {
        'Content-Type': types[path.extname(file)] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(await readFile(file));
    } catch {
      res.writeHead(500);
      res.end('Preview error');
    }
  })
  .listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
