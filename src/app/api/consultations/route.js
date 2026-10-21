import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { checkAuthFromRequest } from '@/lib/serverAuth';
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabaseAdmin';
import { notifyNewInquiry } from '@/lib/telegramNotifier';

const contentDir = path.resolve(process.cwd(), 'content');
const inqPath = path.join(contentDir, 'inquiries.json');

function getLocalInquiries() {
  if (fs.existsSync(inqPath)) {
    try {
      return JSON.parse(fs.readFileSync(inqPath, 'utf8'));
    } catch {
      return [];
    }
  }
  return [];
}

async function getInquiries() {
  if (!isSupabaseConfigured) return getLocalInquiries();

  const { data, error } = await supabaseAdmin
    .from('consultation_inquiries')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;

  return data.map(item => ({
    id: item.id,
    date: item.created_at,
    name: item.name,
    email: item.email,
    phone: item.phone,
    age: item.age,
    gender: item.gender,
    country: item.country,
    city: item.city,
    symptoms: item.symptoms,
    service: item.service,
    preferredFocus: item.preferred_focus || item.service,
    intentionsNote: item.intentions_note || item.message,
    preferredDate: item.preferred_date,
    preferredTime: item.preferred_time,
    message: item.message,
    status: item.status
  }));
}

// GET: Admin can view all inquiries
export async function GET(request) {
  if (!checkAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    return NextResponse.json(await getInquiries());
  } catch (err) {
    return NextResponse.json({ error: 'Failed to load inquiries' }, { status: 500 });
  }
}

// POST: Public submission of consultation or contact inquiry
export async function POST(request) {
  try {
    const data = await request.json();

    const phone = (data.phone || data.mobile || '').trim();
    if (!data.name || !data.email || !phone) {
      return NextResponse.json({ error: 'Name, email, and mobile number are required.' }, { status: 400 });
    }
    if (!/^(\+)?[0-9\s().-]{7,}$/.test(phone)) {
      return NextResponse.json({ error: 'Please enter a valid mobile number.' }, { status: 400 });
    }

    const age = (data.age || '').toString().trim().slice(0, 10);
    const gender = (data.gender || '').trim().slice(0, 50);
    const country = (data.country || '').trim().slice(0, 100);
    const city = (data.city || '').trim().slice(0, 100);
    const symptoms = (data.symptoms || '').trim().slice(0, 2000);
    const clientNotes = (data.intentionsNote || data.message || '').trim().slice(0, 1500);

    const fullMessage = [
      (age || gender) ? `Client: ${[age ? `Age: ${age}` : '', gender ? `Gender: ${gender}` : ''].filter(Boolean).join(' | ')}` : '',
      (city || country) ? `Location: ${[city, country].filter(Boolean).join(', ')}` : '',
      symptoms ? `Symptoms & Concerns:\n${symptoms}` : '',
      clientNotes ? `Personal Notes:\n${clientNotes}` : ''
    ].filter(Boolean).join('\n\n') || clientNotes || symptoms || 'No additional notes provided.';

    const record = {
      id: `inq_${Date.now()}`,
      date: new Date().toISOString(),
      name: (data.name || '').trim().slice(0, 100),
      email: (data.email || '').trim().slice(0, 100),
      phone: phone.slice(0, 50),
      age,
      gender,
      country,
      city,
      symptoms,
      service: (data.service || 'consultation').slice(0, 50),
      preferredFocus: (data.preferredFocus || data.service || 'consultation').slice(0, 100),
      intentionsNote: clientNotes,
      preferredDate: (data.preferredDate || '').slice(0, 30),
      preferredTime: (data.preferredTime || '').slice(0, 30),
      message: fullMessage,
      status: 'unread'
    };

    if (isSupabaseConfigured) {
      const { error } = await supabaseAdmin.from('consultation_inquiries').insert({
        id: record.id,
        created_at: record.date,
        name: record.name,
        email: record.email,
        phone: record.phone,
        service: record.service,
        preferred_focus: record.preferredFocus,
        intentions_note: record.intentionsNote,
        preferred_date: record.preferredDate,
        preferred_time: record.preferredTime,
        message: record.message,
        status: record.status
      });
      if (error) throw error;
    } else {
      const inquiries = getLocalInquiries();
      inquiries.unshift(record);
      if (!fs.existsSync(contentDir)) {
        fs.mkdirSync(contentDir, { recursive: true });
      }
      fs.writeFileSync(inqPath, JSON.stringify(inquiries, null, 2), 'utf8');
    }

    // Trigger instant Telegram alert to admin's phone
    notifyNewInquiry(record).catch(err => {
      console.warn('Telegram notification dispatch failed:', err?.message || err);
    });

    return NextResponse.json({ success: true, inquiryId: record.id });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 });
  }
}

// DELETE: Admin can delete an inquiry by id
export async function DELETE(request) {
  if (!checkAuthFromRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  }

  if (isSupabaseConfigured) {
    const { error } = await supabaseAdmin.from('consultation_inquiries').delete().eq('id', id);
    if (error) return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  } else {
    const inquiries = getLocalInquiries().filter(item => item.id !== id);
    fs.writeFileSync(inqPath, JSON.stringify(inquiries, null, 2), 'utf8');
  }

  return NextResponse.json({ success: true });
}
