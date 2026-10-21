import json
import os
import sys

# Ensure this directory is in path
sys.path.insert(0, os.path.dirname(__file__))

from common_it import COMMON_IT
from about_it import ABOUT_IT
from services_programs_it import SERVICES_PROGRAMS_IT
from articles_it import ARTICLES_IT, ARTICLE_SECTIONS_IT

from common_es import COMMON_ES
from about_es import ABOUT_ES
from services_programs_es import SERVICES_PROGRAMS_ES
from articles_es import ARTICLES_ES, ARTICLE_SECTIONS_ES

root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
content_dir = os.path.join(root_dir, 'content')
data_dir = os.path.join(root_dir, 'src', 'data')

with open(os.path.join(content_dir, 'en.json'), 'r', encoding='utf-8') as f:
    en_bundle = json.load(f)

# Assemble Italian bundle
it_bundle = {}
it_bundle.update(COMMON_IT)
it_bundle.update(ABOUT_IT)
it_bundle.update(SERVICES_PROGRAMS_IT)
it_bundle.update(ARTICLES_IT)

# Assemble Spanish bundle
es_bundle = {}
es_bundle.update(COMMON_ES)
es_bundle.update(ABOUT_ES)
es_bundle.update(SERVICES_PROGRAMS_ES)
es_bundle.update(ARTICLES_ES)

# Verify all top-level keys exist
en_keys = set(en_bundle.keys())
it_keys = set(it_bundle.keys())
es_keys = set(es_bundle.keys())

missing_it = en_keys - it_keys
missing_es = en_keys - es_keys

if missing_it:
    print(f"Warning: Missing keys in IT: {missing_it}")
if missing_es:
    print(f"Warning: Missing keys in ES: {missing_es}")

# Write content/it.json
with open(os.path.join(content_dir, 'it.json'), 'w', encoding='utf-8') as f:
    json.dump(it_bundle, f, ensure_ascii=False, indent=2)
print("[OK] Successfully generated content/it.json")

# Write content/es.json
with open(os.path.join(content_dir, 'es.json'), 'w', encoding='utf-8') as f:
    json.dump(es_bundle, f, ensure_ascii=False, indent=2)
print("[OK] Successfully generated content/es.json")

# Update languageModal.languages across en, de, fr, ro, ru
lang_entries = {
    "it": { "name": "Italian", "native": "Italiano", "flag": "🇮🇹" },
    "es": { "name": "Spanish", "native": "Español", "flag": "🇪🇸" }
}

for l in ['en', 'de', 'fr', 'ro', 'ru']:
    fp = os.path.join(content_dir, f"{l}.json")
    if os.path.exists(fp):
        with open(fp, 'r', encoding='utf-8') as f:
            data = json.load(f)
        if 'languageModal' in data and 'languages' in data['languageModal']:
            data['languageModal']['languages'].update(lang_entries)
            with open(fp, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"[OK] Updated languageModal in content/{l}.json")

# Update src/data/articleContents.js
article_contents_path = os.path.join(data_dir, 'articleContents.js')
with open(article_contents_path, 'r', encoding='utf-8') as f:
    raw_js = f.read()

prefix = "export const articleContents = "
suffix = ";\n"

if raw_js.startswith(prefix):
    js_body = raw_js[len(prefix):].rstrip().rstrip(';')
    try:
        data = json.loads(js_body)
        data['it'] = ARTICLE_SECTIONS_IT
        data['es'] = ARTICLE_SECTIONS_ES
        new_content = prefix + json.dumps(data, ensure_ascii=False, indent=2) + suffix
        with open(article_contents_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("[OK] Successfully updated src/data/articleContents.js with IT and ES articles")
    except Exception as e:
        print("Error parsing articleContents.js JSON:", e)

print("Translation compilation complete!")
