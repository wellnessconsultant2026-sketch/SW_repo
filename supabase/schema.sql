create table if not exists public.site_content (
  lang text primary key check (lang in ('en', 'ru', 'ro', 'fr', 'de', 'it', 'es')),
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.consultation_inquiries (
  id text primary key,
  created_at timestamptz not null default now(),
  name text not null default '',
  email text not null default '',
  phone text not null default '',
  service text not null default 'consultation',
  preferred_focus text not null default '',
  intentions_note text not null default '',
  preferred_date text not null default '',
  preferred_time text not null default '',
  message text not null default '',
  status text not null default 'unread'
);

alter table public.consultation_inquiries
  add column if not exists preferred_focus text not null default '',
  add column if not exists intentions_note text not null default '';

create index if not exists consultation_inquiries_created_at_idx
  on public.consultation_inquiries (created_at desc);

alter table public.site_content enable row level security;
alter table public.consultation_inquiries enable row level security;

-- API routes use the server-only service role key, so no public policies are needed.

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;