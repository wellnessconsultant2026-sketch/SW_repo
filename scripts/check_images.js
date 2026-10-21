import fs from 'fs';
import path from 'path';

const files = ['es.json', 'it.json', 'en.json', 'de.json', 'fr.json', 'ro.json', 'ru.json'];

files.forEach(file => {
  const content = fs.readFileSync(path.join('content', file), 'utf8');
  // Match any string that looks like an image path ending in .jpg, .jpeg, .png, .webp, .svg
  const matches = [...content.matchAll(/"([^"]+\.(?:jpg|jpeg|png|webp|svg|gif))"/gi)];
  console.log(`Checking ${file} (${matches.length} image references)...`);
  const missing = [];
  matches.forEach(m => {
    const imgPath = m[1];
    if (imgPath.startsWith('/') && !imgPath.startsWith('http')) {
      const fullPath = path.join('public', imgPath.replace(/^\//, ''));
      if (!fs.existsSync(fullPath)) {
        missing.push(imgPath);
      }
    }
  });
  if (missing.length > 0) {
    console.log(`  --> Missing in ${file}:`, [...new Set(missing)]);
  } else {
    console.log(`  --> OK: All images exist in ${file}!`);
  }
});
