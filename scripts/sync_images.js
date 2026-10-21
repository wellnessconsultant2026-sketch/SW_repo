import fs from 'fs';
import path from 'path';

const en = JSON.parse(fs.readFileSync('content/en.json', 'utf8'));

// Helper to recursively walk en and compare with target
function syncImages(master, target, targetName, changed = []) {
  if (!master || !target) return changed;
  
  for (const [k, v] of Object.entries(master)) {
    if (typeof v === 'string') {
      // If master has an image path
      if (v.startsWith('/') && /\.(jpg|jpeg|png|webp|svg|gif)$/i.test(v)) {
        const targetVal = target[k];
        if (targetVal !== v) {
          changed.push({
            key: k,
            oldVal: targetVal,
            newVal: v
          });
          target[k] = v;
        }
      }
    } else if (Array.isArray(v)) {
      if (Array.isArray(target[k])) {
        v.forEach((item, idx) => {
          if (target[k][idx]) {
            syncImages(item, target[k][idx], targetName, changed);
          }
        });
      }
    } else if (typeof v === 'object' && v !== null) {
      if (typeof target[k] === 'object' && target[k] !== null) {
        syncImages(v, target[k], targetName, changed);
      }
    }
  }
  return changed;
}

['es.json', 'it.json', 'de.json', 'fr.json', 'ro.json', 'ru.json'].forEach(file => {
  const filePath = path.join('content', file);
  const target = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const changed = syncImages(en, target, file);
  console.log(`\nResults for ${file}: ${changed.length} image changes needed`);
  changed.forEach(c => {
    console.log(`  Key: ${c.key}\n    Old: ${c.oldVal}\n    New: ${c.newVal}`);
  });
  
  if (changed.length > 0) {
    fs.writeFileSync(filePath, JSON.stringify(target, null, 2), 'utf8');
    console.log(`--> Saved updated ${file}!`);
  }
});
