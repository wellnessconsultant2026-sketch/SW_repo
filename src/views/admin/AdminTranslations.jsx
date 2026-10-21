import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/admin.module.css';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский (Russian)', flag: '🇷🇺' },
  { code: 'ro', name: 'Română (Romanian)', flag: '🇷🇴' },
  { code: 'fr', name: 'Français (French)', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch (German)', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano (Italian)', flag: '🇮🇹' },
  { code: 'es', name: 'Español (Spanish)', flag: '🇪🇸' }
];

export default function AdminTranslations() {
  const { fullBundle, saveLanguageContent } = useContent();
  const { token } = useAuth();

  const [activeLang, setActiveLang] = useState('en');
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [saving, setSaving] = useState(false);

  // Active dictionary data
  const currentDict = fullBundle[activeLang] || fullBundle['en'] || {};

  const [editFields, setEditFields] = useState({
    heroEyebrow: currentDict.hero?.eyebrow || '',
    heroHeadline1: currentDict.hero?.headlineLine1 || '',
    heroHeadline2: currentDict.hero?.headlineLine2 || '',
    heroDesc: currentDict.hero?.description || '',
    primaryCTA: currentDict.hero?.primaryCTA || '',
    philosophyHeadline: currentDict.philosophy?.headline || '',
    philosophyText: currentDict.philosophy?.text || '',
    aboutLead: currentDict.about?.lead || '',
    disclaimer: currentDict.about?.disclaimer || ''
  });

  const handleTabChange = (lang) => {
    setActiveLang(lang);
    const dict = fullBundle[lang] || fullBundle['en'] || {};
    setEditFields({
      heroEyebrow: dict.hero?.eyebrow || '',
      heroHeadline1: dict.hero?.headlineLine1 || '',
      heroHeadline2: dict.hero?.headlineLine2 || '',
      heroDesc: dict.hero?.description || '',
      primaryCTA: dict.hero?.primaryCTA || '',
      philosophyHeadline: dict.philosophy?.headline || '',
      philosophyText: dict.philosophy?.text || '',
      aboutLead: dict.about?.lead || '',
      disclaimer: dict.about?.disclaimer || ''
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: '', msg: '' });

    try {
      const updated = JSON.parse(JSON.stringify(fullBundle[activeLang] || fullBundle['en']));

      if (!updated.hero) updated.hero = {};
      updated.hero.eyebrow = editFields.heroEyebrow;
      updated.hero.headlineLine1 = editFields.heroHeadline1;
      updated.hero.headlineLine2 = editFields.heroHeadline2;
      updated.hero.description = editFields.heroDesc;
      updated.hero.primaryCTA = editFields.primaryCTA;

      if (!updated.philosophy) updated.philosophy = {};
      updated.philosophy.headline = editFields.philosophyHeadline;
      updated.philosophy.text = editFields.philosophyText;

      if (!updated.about) updated.about = {};
      updated.about.lead = editFields.aboutLead;
      updated.about.disclaimer = editFields.disclaimer;

      await saveLanguageContent(activeLang, updated, token);
      setStatus({ type: 'success', msg: `Translations for ${activeLang.toUpperCase()} saved and persisted!` });
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to persist translations' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className={styles.panelHeader} style={{ borderBottom: 'none', paddingBottom: 0 }}>
        <div>
          <h2 className={styles.panelTitle}>Internationalization (i18n) &amp; Translations</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
            Manage and refine multi-language content across English, Russian, Romanian, French, and German.
          </p>
        </div>
      </div>

      {status.msg && (
        <div className={status.type === 'success' ? styles.noticeSuccess : styles.noticeError}>
          {status.type === 'success' ? '✓' : '⚠️'} {status.msg}
        </div>
      )}

      {/* Completion Status Indicators */}
      <div className={styles.panel} style={{ padding: '1.25rem' }}>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--plum-primary)' }}>
          Translation Status Across Supported Languages:
        </h4>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {LANGUAGES.map(l => {
            const hasData = !!fullBundle[l.code]?.about?.lead;
            return (
              <div
                key={l.code}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.82rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '20px',
                  background: hasData ? 'rgba(40, 167, 69, 0.1)' : 'rgba(255, 193, 7, 0.1)',
                  color: hasData ? '#1E7E34' : '#856404'
                }}
              >
                <span>{l.flag}</span>
                <strong>{l.name}:</strong>
                <span>{hasData ? '✓ Complete' : '⚠️ Missing'}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Language Tabs */}
      <div className={styles.langTabs}>
        {LANGUAGES.map(l => (
          <button
            key={l.code}
            type="button"
            className={`${styles.langTab} ${activeLang === l.code ? styles.langTabActive : ''}`}
            onClick={() => handleTabChange(l.code)}
          >
            <span>{l.flag}</span>
            <span>{l.name}</span>
          </button>
        ))}
      </div>

      {/* Translations Form */}
      <form onSubmit={handleSave}>
        <div className={styles.panel}>
          <h3 className={styles.panelTitle} style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>
            Hero &amp; Positioning ({activeLang.toUpperCase()})
          </h3>

          <div className={styles.formGroup}>
            <label className={styles.label}>Hero Eyebrow</label>
            <input
              type="text"
              value={editFields.heroEyebrow}
              onChange={(e) => setEditFields({ ...editFields, heroEyebrow: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.row2}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Headline Line 1</label>
              <input
                type="text"
                value={editFields.heroHeadline1}
                onChange={(e) => setEditFields({ ...editFields, heroHeadline1: e.target.value })}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Headline Line 2</label>
              <input
                type="text"
                value={editFields.heroHeadline2}
                onChange={(e) => setEditFields({ ...editFields, heroHeadline2: e.target.value })}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Hero Description</label>
            <textarea
              rows={2}
              value={editFields.heroDesc}
              onChange={(e) => setEditFields(prev => ({ ...prev, heroDesc: e.target.value }))}
              className={styles.textarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Primary CTA Button Label</label>
            <input
              type="text"
              value={editFields.primaryCTA}
              onChange={(e) => setEditFields({ ...editFields, primaryCTA: e.target.value })}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.panel}>
          <h3 className={styles.panelTitle} style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>
            Philosophy &amp; Medical Disclaimer ({activeLang.toUpperCase()})
          </h3>

          <div className={styles.formGroup}>
            <label className={styles.label}>Philosophy Headline</label>
            <input
              type="text"
              value={editFields.philosophyHeadline}
              onChange={(e) => setEditFields({ ...editFields, philosophyHeadline: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Philosophy Narrative</label>
            <textarea
              rows={3}
              value={editFields.philosophyText}
              onChange={(e) => setEditFields(prev => ({ ...prev, philosophyText: e.target.value }))}
              className={styles.textarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>About Section Lead Quote</label>
            <input
              type="text"
              value={editFields.aboutLead}
              onChange={(e) => setEditFields({ ...editFields, aboutLead: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Medical Safety Disclaimer</label>
            <textarea
              rows={2}
              value={editFields.disclaimer}
              onChange={(e) => setEditFields({ ...editFields, disclaimer: e.target.value })}
              className={styles.textarea}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="submit" disabled={saving} className={styles.saveBtn}>
            {saving ? 'Persisting...' : `Save ${activeLang.toUpperCase()} Translations ✓`}
          </button>
        </div>
      </form>
    </div>
  );
}
