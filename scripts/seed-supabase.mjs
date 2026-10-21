import fs from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before seeding.');
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const languages = ['en', 'ru', 'ro', 'fr', 'de', 'it', 'es'];
const contentRows = languages.map(lang => ({
  lang,
  data: JSON.parse(fs.readFileSync(`content/${lang}.json`, 'utf8'))
}));

const { error: contentError } = await supabase
  .from('site_content')
  .upsert(contentRows, { onConflict: 'lang' });
if (contentError) throw contentError;

const inquiries = JSON.parse(fs.readFileSync('content/inquiries.json', 'utf8'));
const inquiryRows = inquiries.map(item => ({
  id: item.id,
  created_at: item.date,
  name: item.name || '',
  email: item.email || '',
  phone: item.phone || '',
  service: item.service || 'consultation',
  preferred_date: item.preferredDate || '',
  preferred_time: item.preferredTime || '',
  message: item.message || '',
  status: item.status || 'unread'
}));

if (inquiryRows.length > 0) {
  const { error: inquiryError } = await supabase
    .from('consultation_inquiries')
    .upsert(inquiryRows, { onConflict: 'id' });
  if (inquiryError) throw inquiryError;
}

console.log(`Seeded ${contentRows.length} languages and ${inquiryRows.length} inquiries.`);