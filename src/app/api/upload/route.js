import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { checkAuthFromRequest } from '@/lib/serverAuth';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabaseAdmin';

const publicDir = path.resolve(process.cwd(), 'public');
const uploadDirs = {
  profile: path.join(publicDir, 'images', 'profile'),
  gallery: path.join(publicDir, 'images', 'gallery'),
  articles: path.join(publicDir, 'images', 'articles'),
  programs: path.join(publicDir, 'images', 'programs')
};

function contentTypeForExtension(ext) {
  return {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf'
  }[ext] || 'application/octet-stream';
}

Object.values(uploadDirs).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

export async function POST(request) {
  if (!checkAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized. Admin login required.' }, { status: 401 });
  }

  try {
    const contentType = request.headers.get('content-type') || '';

    // Handle Multipart Form Data
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file');
      const category = formData.get('category') || 'gallery';
      const isDocument = formData.get('isDocument') === 'true';

      if (!file || typeof file === 'string') {
        return NextResponse.json({ error: 'File is required' }, { status: 400 });
      }

      const originalName = file.name || 'upload';
      const ext = path.extname(originalName).toLowerCase();
      const allowedExts = isDocument ? ['.pdf'] : ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
      if (!allowedExts.includes(ext)) {
        return NextResponse.json({ error: `Invalid file extension. Allowed: ${allowedExts.join(', ')}` }, { status: 400 });
      }

      const categoryDirKey = uploadDirs[category] ? category : 'gallery';
      const safeBasename = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      const uniqueName = `${Date.now()}_${safeBasename}${ext}`;

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const publicPath = await storeUpload({
        buffer,
        uniqueName,
        categoryDirKey,
        isDocument,
        contentType: file.type || contentTypeForExtension(ext)
      });

      return NextResponse.json({
        success: true,
        url: publicPath,
        filename: uniqueName,
        sizeBytes: buffer.length
      });
    }

    // Handle Base64 JSON Payload
    const { filename, base64Data, category = 'gallery', isDocument = false } = await request.json();
    if (!filename || !base64Data) {
      return NextResponse.json({ error: 'Filename and base64Data required' }, { status: 400 });
    }

    const ext = path.extname(filename).toLowerCase();
    const allowedExts = isDocument ? ['.pdf'] : ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
    if (!allowedExts.includes(ext)) {
      return NextResponse.json({ error: `Invalid file extension. Allowed: ${allowedExts.join(', ')}` }, { status: 400 });
    }

    const categoryDirKey = uploadDirs[category] ? category : 'gallery';
    const safeBasename = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueName = `${Date.now()}_${safeBasename}${ext}`;

    const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');
    const publicPath = await storeUpload({
      buffer,
      uniqueName,
      categoryDirKey,
      isDocument,
      contentType: contentTypeForExtension(ext)
    });

    return NextResponse.json({
      success: true,
      url: publicPath,
      filename: uniqueName,
      sizeBytes: buffer.length
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to save uploaded file to disk' }, { status: 500 });
  }
}

async function storeUpload({ buffer, uniqueName, categoryDirKey, isDocument, contentType }) {
  if (isSupabaseConfigured) {
    const folder = `images/${categoryDirKey}`;
    const storagePath = `${folder}/${uniqueName}`;
    const { error } = await supabaseAdmin.storage
      .from('site-assets')
      .upload(storagePath, buffer, { contentType, upsert: false });
    if (error) throw error;

    const { data } = supabaseAdmin.storage.from('site-assets').getPublicUrl(storagePath);
    return data.publicUrl;
  }

  const targetDir = uploadDirs[categoryDirKey] || uploadDirs.gallery;
  fs.writeFileSync(path.join(/*turbopackIgnore: true*/ targetDir, uniqueName), buffer);
  return `/images/${categoryDirKey}/${uniqueName}`;
}
