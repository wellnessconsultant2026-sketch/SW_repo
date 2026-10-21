import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { checkAuthFromRequest } from '@/lib/serverAuth';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabaseAdmin';

const contentDir = path.resolve(process.cwd(), 'content');

function optimizeForHomepage(data, isHomepage) {
  if (!isHomepage || !data) return data;
  const copy = JSON.parse(JSON.stringify(data));
  if (copy.services && copy.services.items) {
    copy.services.items = copy.services.items.map(s => ({
      id: s.id,
      num: s.num,
      title: s.title,
      subtitle: s.subtitle,
      tag: s.tag,
      badge: s.badge,
      shortDesc: s.shortDesc || s.desc,
      target: s.target,
      shiftBefore: s.shiftBefore,
      shiftAfter: s.shiftAfter,
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
    copy.programs.items = copy.programs.items.slice(0, 3);
  }
  if (copy.articles && copy.articles.items) {
    copy.articles.items = copy.articles.items.slice(0, 3).map(a => ({
      id: a.id,
      title: a.title,
      date: a.date,
      category: a.category,
      excerpt: a.excerpt,
      readTime: a.readTime,
      image: a.image,
      featured: a.featured,
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
}

// Server-side in-memory RAM cache to eliminate repeated database hits
let serverCache = {
  bundle: null,
  langData: {},
  timestamp: 0,
  etag: `"${Date.now()}"`
};
const SERVER_CACHE_TTL = process.env.NODE_ENV === 'development' ? 0 : 10 * 60 * 1000;

function invalidateServerCache() {
  serverCache = {
    bundle: null,
    langData: {},
    timestamp: 0,
    etag: `"${Date.now()}"`
  };
}

function readLocalContent(lang) {
  const filePath = path.join(contentDir, `${lang}.json`);
  const fallbackPath = path.join(contentDir, 'en.json');
  const sourcePath = fs.existsSync(filePath) ? filePath : fallbackPath;
  return JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
}

async function readContent(lang) {
  if (!isSupabaseConfigured) return readLocalContent(lang);

  const { data, error } = await supabaseAdmin
    .from('site_content')
    .select('data')
    .eq('lang', lang)
    .maybeSingle();
  if (error) throw error;
  return data?.data || readLocalContent(lang);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get('lang');
  const isHomepage = searchParams.get('homepage') === 'true';
  const clientEtag = request.headers.get('if-none-match');

  // ETag conditional check: return 304 Not Modified with 0 bytes if client already has fresh data
  if (clientEtag && clientEtag === serverCache.etag && !lang && !isHomepage) {
    return new NextResponse(null, { status: 304 });
  }

  try {
    const cacheHeaders = {
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=1200',
      'ETag': serverCache.etag
    };

    if (lang) {
      if (serverCache.langData[lang] && (Date.now() - serverCache.timestamp < SERVER_CACHE_TTL)) {
        return NextResponse.json(optimizeForHomepage(serverCache.langData[lang], isHomepage), { headers: cacheHeaders });
      }
      const data = await readContent(lang);
      serverCache.langData[lang] = data;
      return NextResponse.json(optimizeForHomepage(data, isHomepage), { headers: cacheHeaders });
    }

    // Serve from server RAM cache if still within TTL
    if (serverCache.bundle && (Date.now() - serverCache.timestamp < SERVER_CACHE_TTL)) {
      const output = {};
      Object.keys(serverCache.bundle).forEach(l => {
        output[l] = optimizeForHomepage(serverCache.bundle[l], isHomepage);
      });
      return NextResponse.json(output, { headers: cacheHeaders });
    }

    // Cold cache: query DB once, store in RAM
    const languages = ['en', 'ru', 'ro', 'fr', 'de', 'it', 'es'];
    const rawBundle = {};
    await Promise.all(languages.map(async (language) => {
      rawBundle[language] = await readContent(language);
    }));

    serverCache.bundle = rawBundle;
    serverCache.timestamp = Date.now();
    serverCache.etag = `"${Date.now()}"`;
    cacheHeaders['ETag'] = serverCache.etag;

    const bundle = {};
    languages.forEach(language => {
      bundle[language] = optimizeForHomepage(rawBundle[language], isHomepage);
    });
    return NextResponse.json(bundle, { headers: cacheHeaders });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to read content files' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!checkAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized. Admin login required.' }, { status: 401 });
  }

  try {
    const { lang, data, fullBundle } = await request.json();

    if (fullBundle) {
      if (isSupabaseConfigured) {
        const rows = Object.entries(fullBundle).map(([language, content]) => ({ lang: language, data: content }));
        const { error } = await supabaseAdmin.from('site_content').upsert(rows, { onConflict: 'lang' });
        if (error) throw error;
      } else {
        Object.entries(fullBundle).forEach(([language, content]) => {
          const fp = path.join(contentDir, `${language}.json`);
          fs.writeFileSync(fp, JSON.stringify(content, null, 2), 'utf8');
        });
      }
      invalidateServerCache();
      return NextResponse.json({ success: true, message: 'All content updated and persisted' });
    }

    if (lang && data) {
      if (isSupabaseConfigured) {
        const { error } = await supabaseAdmin
          .from('site_content')
          .upsert({ lang, data }, { onConflict: 'lang' });
        if (error) throw error;
      } else {
        const fp = path.join(contentDir, `${lang}.json`);
        fs.writeFileSync(fp, JSON.stringify(data, null, 2), 'utf8');
      }
      invalidateServerCache();
      return NextResponse.json({ success: true, message: `Content for ${lang} updated and persisted` });
    }

    return NextResponse.json({ error: 'Invalid payload: lang and data, or fullBundle required' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to write content to disk' }, { status: 500 });
  }
}
