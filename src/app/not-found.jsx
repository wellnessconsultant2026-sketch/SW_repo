'use client';

import React from 'react';
import Link from 'next/link';
import pageStyles from '@/styles/page.module.css';

export default function NotFound() {
  return (
    <main className={pageStyles.pageWrapper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '85vh' }}>
      <div className={pageStyles.container} style={{ textAlign: 'center', maxWidth: '650px' }}>
        <span className={pageStyles.tag}>404 • TRANQUIL DETOUR</span>
        <h1 className={pageStyles.title}>Return to Center</h1>
        <p className={pageStyles.subtitle} style={{ marginBottom: '2.5rem' }}>
          The path you sought has gently dissolved, but the sanctuary remains open. Pause, take a conscious breath, and return to the beginning.
        </p>

        <Link href="/" className={pageStyles.ctaBtn}>
          Return to Sanctuary Home &rarr;
        </Link>
      </div>
    </main>
  );
}
