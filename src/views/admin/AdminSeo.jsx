import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/admin.module.css';

export default function AdminSeo() {
  const { fullBundle, saveLanguageContent } = useContent();
  const { token } = useAuth();

  const [activeLang, setActiveLang] = useState('en');
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [saving, setSaving] = useState(false);

  const dict = fullBundle[activeLang] || fullBundle['en'] || {};
  const meta = dict.meta || {};

  const [form, setForm] = useState({
    title: meta.title || '',
    description: meta.description || '',
    ogTitle: meta.ogTitle || '',
    ogDescription: meta.ogDescription || ''
  });

  const handleTabChange = (l) => {
    setActiveLang(l);
    const d = fullBundle[l] || fullBundle['en'] || {};
    const m = d.meta || {};
    setForm({
      title: m.title || '',
      description: m.description || '',
      ogTitle: m.ogTitle || '',
      ogDescription: m.ogDescription || ''
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: '', msg: '' });

    try {
      const updated = JSON.parse(JSON.stringify(fullBundle[activeLang] || fullBundle['en']));
      updated.meta = {
        ...updated.meta,
        title: form.title,
        description: form.description,
        ogTitle: form.ogTitle,
        ogDescription: form.ogDescription
      };

      await saveLanguageContent(activeLang, updated, token);
      setStatus({ type: 'success', msg: `SEO metadata for ${activeLang.toUpperCase()} saved!` });
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to save SEO metadata' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className={styles.panelHeader} style={{ borderBottom: 'none', paddingBottom: 0 }}>
        <div>
          <h2 className={styles.panelTitle}>SEO &amp; Open Graph Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
            Configure page search titles, search engine descriptions, and social media preview tags for each language.
          </p>
        </div>
      </div>

      {status.msg && (
        <div className={status.type === 'success' ? styles.noticeSuccess : styles.noticeError}>
          {status.type === 'success' ? '✓' : '⚠️'} {status.msg}
        </div>
      )}

      {/* Language Tabs */}
      <div className={styles.langTabs}>
        {['en', 'ru', 'ro', 'fr', 'de', 'it', 'es'].map(l => (
          <button
            key={l}
            type="button"
            className={`${styles.langTab} ${activeLang === l ? styles.langTabActive : ''}`}
            onClick={() => handleTabChange(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave}>
        <div className={styles.panel}>
          <h3 className={styles.panelTitle} style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>
            Search Engine Metadata ({activeLang.toUpperCase()})
          </h3>

          <div className={styles.formGroup}>
            <label className={styles.label}>Browser Title Tag (&lt;title&gt;)</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Meta Description (&lt;meta name=&quot;description&quot;&gt;)</label>
            <textarea
              rows={3}
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className={styles.textarea}
            />
          </div>
        </div>

        <div className={styles.panel}>
          <h3 className={styles.panelTitle} style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>
            Open Graph / Social Sharing Tags ({activeLang.toUpperCase()})
          </h3>

          <div className={styles.formGroup}>
            <label className={styles.label}>og:title</label>
            <input
              type="text"
              value={form.ogTitle}
              onChange={(e) => setForm({ ...form, ogTitle: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>og:description</label>
            <textarea
              rows={3}
              value={form.ogDescription}
              onChange={(e) => setForm({ ...form, ogDescription: e.target.value })}
              className={styles.textarea}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="submit" disabled={saving} className={styles.saveBtn}>
            {saving ? 'Saving...' : 'Save SEO Metadata ✓'}
          </button>
        </div>
      </form>
    </div>
  );
}
