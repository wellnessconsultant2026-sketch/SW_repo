'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('dr_mayank_lang_pref') : null;
    const initial = (saved && ['en', 'ru', 'ro', 'fr', 'de', 'it', 'es'].includes(saved)) ? saved : 'en';
    router.replace(`/${initial}`);
  }, [router]);

  return null;
}
