import React from 'react';
import Link from 'next/link';
import { useContent } from '../../context/ContentContext';
import styles from '../../styles/admin.module.css';

export default function AdminDashboard() {
  const { content, fullBundle } = useContent();

  const articlesCount = (content?.articles?.items || []).length;
  const galleryCount = (content?.gallery?.items || []).length;
  const languagesCount = Object.keys(fullBundle || {}).length || 7;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-display, serif)',
          fontSize: '2rem',
          color: 'var(--plum-primary, #52204F)',
          marginBottom: '0.5rem'
        }}>
          Welcome, Dr. Mayank Ahooja
        </h2>
        <p style={{ color: 'var(--text-muted, #4A4560)', fontSize: '0.95rem' }}>
          Overview of your sanctuary management panel and content assets.
        </p>
      </div>

      {/* Persistence Architecture Badge */}
      <div style={{
        background: 'rgba(200, 149, 74, 0.12)',
        border: '1px solid rgba(200, 149, 74, 0.35)',
        borderRadius: '10px',
        padding: '1rem 1.25rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.9rem',
        color: '#704B18'
      }}>
        <span style={{ fontSize: '1.25rem' }}>🔒</span>
        <div>
          <strong>Persistent Content Storage Active:</strong> Article publications, profile bio edits, inquiries, and gallery updates are saved immediately to disk and live on the website.
        </div>
      </div>

      {/* Metrics Row */}
      <div className={styles.row3} style={{ marginBottom: '2rem' }}>
        <div className={styles.panel} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', color: 'var(--plum-primary)' }}>
            {articlesCount}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Published Articles
          </div>
        </div>

        <div className={styles.panel} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', color: 'var(--gold-accent)' }}>
            {galleryCount}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Gallery Images
          </div>
        </div>

        <div className={styles.panel} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)', color: 'var(--plum-primary)' }}>
            {languagesCount}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Active Languages
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className={styles.row2}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Articles &amp; Inquiries</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link href="/admin/articles" className={styles.secondaryBtn} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between' }}>
              <span>📝 Wellness Articles &amp; Client Insights</span>
              <span>&rarr;</span>
            </Link>
            <Link href="/admin/inquiries" className={styles.secondaryBtn} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between' }}>
              <span>📬 Client Inquiries &amp; Consultation Bookings</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Profile &amp; Media</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link href="/admin/profile" className={styles.secondaryBtn} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between' }}>
              <span>👤 Doctor Profile, Bio &amp; Credentials</span>
              <span>&rarr;</span>
            </Link>
            <Link href="/admin/gallery" className={styles.secondaryBtn} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between' }}>
              <span>🖼️ Photo Gallery &amp; Categories</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
