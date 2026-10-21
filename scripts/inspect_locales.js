import fs from 'fs';

const en = JSON.parse(fs.readFileSync('content/en.json', 'utf8'));
const es = JSON.parse(fs.readFileSync('content/es.json', 'utf8'));
const it = JSON.parse(fs.readFileSync('content/it.json', 'utf8'));

// Compare gallery structure
console.log('en.gallery keys:', Object.keys(en.gallery || {}));
console.log('es.gallery keys:', Object.keys(es.gallery || {}));
console.log('it.gallery keys:', Object.keys(it.gallery || {}));

// Let's check all image paths in en.json that exist
function getAllImages(obj, res = []) {
  if (!obj || typeof obj !== 'object') return res;
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string' && (v.endsWith('.jpg') || v.endsWith('.png') || v.endsWith('.webp') || v.endsWith('.svg'))) {
      res.push({ path: k, val: v });
    } else if (typeof v === 'object') {
      getAllImages(v, res);
    }
  }
  return res;
}

console.log('Total images in en:', getAllImages(en).length);
console.log('Total images in es:', getAllImages(es).length);
console.log('Total images in it:', getAllImages(it).length);
