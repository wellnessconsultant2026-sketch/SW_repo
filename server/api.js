import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Server-side environment configuration (Never exposed to frontend)
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || 
  // SHA-256 for default secure credential "mayank@peace2026"
  crypto.createHash('sha256').update(process.env.ADMIN_PASSWORD || 'mayank@peace2026').digest('hex');

const SESSIONS = new Set();

// Ensure storage directories exist
const contentDir = path.resolve(process.cwd(), 'content');
const publicDir = path.resolve(process.cwd(), 'public');
const uploadDirs = {
  profile: path.join(publicDir, 'images', 'profile'),
  gallery: path.join(publicDir, 'images', 'gallery'),
  programs: path.join(publicDir, 'images', 'programs')
};

Object.values(uploadDirs).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.end(JSON.stringify(data));
  return true;
}

function checkAuth(req) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  return token && SESSIONS.has(token);
}

export function handleApiRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;
  const method = req.method;

  if (method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.end();
    return true;
  }

  // 0. Public Sitemap
  if (pathname === '/sitemap.xml' && method === 'GET') {
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/xml');
      fs.createReadStream(sitemapPath).pipe(res);
      return true;
    }
  }

  // 1. Auth: Login
  if (pathname === '/api/auth/login' && method === 'POST') {
    parseBody(req).then(({ password }) => {
      if (!password) {
        return sendJson(res, 400, { success: false, error: 'Password required' });
      }
      const hash = crypto.createHash('sha256').update(password).digest('hex');
      if (hash === ADMIN_PASSWORD_HASH) {
        const token = crypto.randomBytes(32).toString('hex');
        SESSIONS.add(token);
        return sendJson(res, 200, { success: true, token, user: 'Dr. Mayank Admin' });
      }
      return sendJson(res, 401, { success: false, error: 'Invalid admin credentials' });
    }).catch(err => {
      sendJson(res, 500, { success: false, error: 'Internal server error' });
    });
    return true;
  }

  // 2. Auth: Check session
  if (pathname === '/api/auth/check' && method === 'GET') {
    const isAuth = checkAuth(req);
    return sendJson(res, 200, { authenticated: isAuth });
  }

  // 3. Auth: Logout
  if (pathname === '/api/auth/logout' && method === 'POST') {
    const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
    if (token) SESSIONS.delete(token);
    return sendJson(res, 200, { success: true });
  }

  // 4. Content: GET (Publicly accessible)
  if (pathname === '/api/content' && method === 'GET') {
    const lang = url.searchParams.get('lang');
    const isHomepage = url.searchParams.get('homepage') === 'true';

    const optimizeForHomepage = (data) => {
      if (!isHomepage || !data) return data;
      const copy = JSON.parse(JSON.stringify(data));
      if (copy.services && copy.services.items) {
        copy.services.items = copy.services.items.map(s => ({
          id: s.id,
          num: s.num,
          title: s.title,
          shortDesc: s.shortDesc || s.desc,
          duration: s.duration,
          format: s.format,
          image: s.image,
          visible: s.visible,
          pillars: s.pillars,
          focusAreas: s.focusAreas ? s.focusAreas.slice(0, 4) : []
        }));
      }
      if (copy.gallery) {
        if (copy.gallery.categories) {
          // Keep all active categories and their visible images for homepage loops
          copy.gallery.categories = copy.gallery.categories
            .filter(c => c.visible !== false && c.showOnHomepage !== false)
            .map(c => ({
              ...c,
              images: (c.images || []).filter(img => img.visible !== false)
            }));
        } else if (copy.gallery.items) {
          copy.gallery.items = copy.gallery.items.slice(0, 6);
        }
      }
      if (copy.programs && copy.programs.items) {
        copy.programs.items = copy.programs.items.slice(0, 2);
      }
      if (copy.articles && copy.articles.items) {
        copy.articles.items = copy.articles.items.slice(0, 3).map(a => ({
          id: a.id,
          title: a.title,
          date: a.date,
          category: a.category,
          excerpt: a.excerpt,
          readTime: a.readTime,
          visible: a.visible
        }));
      }
      if (copy.testimonials && copy.testimonials.items) {
        copy.testimonials.items = copy.testimonials.items.slice(0, 3);
      }
      if (copy.faq && copy.faq.items) {
        copy.faq.items = copy.faq.items.slice(0, 4);
      }
      return copy;
    };

    try {
      if (lang) {
        const filePath = path.join(contentDir, `${lang}.json`);
        if (fs.existsSync(filePath)) {
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          return sendJson(res, 200, optimizeForHomepage(data));
        } else {
          // Fallback to en.json
          const fallback = JSON.parse(fs.readFileSync(path.join(contentDir, 'en.json'), 'utf8'));
          return sendJson(res, 200, optimizeForHomepage(fallback));
        }
      }

      // Return all 5 languages in one bundle for instantaneous switching
      const languages = ['en', 'ru', 'ro', 'fr', 'de'];
      const bundle = {};
      languages.forEach(l => {
        const fp = path.join(contentDir, `${l}.json`);
        if (fs.existsSync(fp)) {
          const d = JSON.parse(fs.readFileSync(fp, 'utf8'));
          bundle[l] = optimizeForHomepage(d);
        }
      });
      return sendJson(res, 200, bundle);
    } catch (err) {
      return sendJson(res, 500, { error: 'Failed to read content files' });
    }
  }

  // 4b. Consultations & Contact Inquiry: POST (Publicly accessible)
  if (pathname === '/api/consultations' && method === 'POST') {
    parseBody(req).then((data) => {
      try {
        const inqPath = path.join(contentDir, 'inquiries.json');
        let inquiries = [];
        if (fs.existsSync(inqPath)) {
          inquiries = JSON.parse(fs.readFileSync(inqPath, 'utf8'));
        }
        const record = {
          id: `inq_${Date.now()}`,
          date: new Date().toISOString(),
          name: (data.name || '').slice(0, 100),
          email: (data.email || '').slice(0, 100),
          phone: (data.phone || '').slice(0, 50),
          service: (data.service || 'individual-consultation').slice(0, 50),
          message: (data.message || '').slice(0, 1000)
        };
        inquiries.unshift(record);
        fs.writeFileSync(inqPath, JSON.stringify(inquiries, null, 2), 'utf8');
        return sendJson(res, 200, { success: true, inquiryId: record.id });
      } catch (err) {
        return sendJson(res, 500, { error: 'Failed to save inquiry' });
      }
    }).catch(() => sendJson(res, 400, { error: 'Invalid payload' }));
    return true;
  }

  // 5. Content: POST (Admin authenticated)
  if (pathname === '/api/content' && method === 'POST') {
    if (!checkAuth(req)) {
      return sendJson(res, 401, { error: 'Unauthorized. Admin login required.' });
    }

    parseBody(req).then(({ lang, data, fullBundle }) => {
      try {
        if (fullBundle) {
          // Saving all languages
          Object.entries(fullBundle).forEach(([l, content]) => {
            const fp = path.join(contentDir, `${l}.json`);
            fs.writeFileSync(fp, JSON.stringify(content, null, 2), 'utf8');
          });
          return sendJson(res, 200, { success: true, message: 'All content updated and persisted' });
        }

        if (lang && data) {
          const fp = path.join(contentDir, `${lang}.json`);
          fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8');
          return sendJson(res, 200, { success: true, message: `Content for ${lang} updated and persisted` });
        }

        return sendJson(res, 400, { error: 'Invalid payload: lang and data, or fullBundle required' });
      } catch (err) {
        return sendJson(res, 500, { error: 'Failed to write content to disk' });
      }
    }).catch(err => {
      sendJson(res, 500, { error: 'Internal server error while parsing content payload' });
    });
    return true;
  }

  // 6. Upload: POST (Admin authenticated file upload)
  if (pathname === '/api/upload' && method === 'POST') {
    if (!checkAuth(req)) {
      return sendJson(res, 401, { error: 'Unauthorized. Admin login required.' });
    }

    parseBody(req).then(({ filename, base64Data, category = 'gallery', isDocument = false }) => {
      if (!filename || !base64Data) {
        return sendJson(res, 400, { error: 'Filename and base64Data required' });
      }

      // Sanitize filename & extension
      const ext = path.extname(filename).toLowerCase();
      const allowedExts = isDocument ? ['.pdf'] : ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
      if (!allowedExts.includes(ext)) {
        return sendJson(res, 400, { error: `Invalid file extension. Allowed: ${allowedExts.join(', ')}` });
      }

      const categoryDirKey = uploadDirs[category] ? category : 'gallery';
      const targetDir = isDocument ? uploadDirs.documents : uploadDirs[categoryDirKey];
      const safeBasename = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      const uniqueName = `${Date.now()}_${safeBasename}${ext}`;
      const filePath = path.join(targetDir, uniqueName);

      // Strip data uri prefix if present
      const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, '');
      const buffer = Buffer.from(cleanBase64, 'base64');

      fs.writeFileSync(filePath, buffer);

      // Return public URL accessible by browser
      const publicPath = `/images/${categoryDirKey}/${uniqueName}`;

      return sendJson(res, 200, {
        success: true,
        url: publicPath,
        filename: uniqueName,
        sizeBytes: buffer.length
      });
    }).catch(err => {
      sendJson(res, 500, { error: 'Failed to save uploaded file to disk' });
    });
    return true;
  }

  return false;
}
