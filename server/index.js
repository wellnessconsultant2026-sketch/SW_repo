import http from 'http';
import fs from 'fs';
import path from 'path';
import { handleApiRequest } from './api.js';

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.resolve(process.cwd(), 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
  // 1. Check if it is an API call
  if (req.url && req.url.startsWith('/api/')) {
    const handled = handleApiRequest(req, res);
    if (handled) return;
  }

  // 2. Serve static files from dist/
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/') pathname = '/index.html';

  let filePath = path.join(DIST_DIR, pathname);
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    const publicPath = path.join(process.cwd(), 'public', pathname);
    if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
      filePath = publicPath;
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  // 3. SPA Fallback: serve index.html for client-side routing
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream(indexPath).pipe(res);
    return;
  }

  res.statusCode = 404;
  res.end('Not Found. Please run npm run build first.');
});

server.listen(PORT, () => {
  console.log(`[Dr. Mayank Server] Running on http://localhost:${PORT}`);
});
