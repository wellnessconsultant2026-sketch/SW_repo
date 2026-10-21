import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/admin.module.css';

export default function AdminProfile() {
  const { content, saveLanguageContent, fullBundle, saveFullBundle } = useContent();
  const { token } = useAuth();

  const [activeTab, setActiveTab] = useState('en');
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    title: '',
    lead: '',
    bio1: '',
    bio2: '',
    bio3: '',
    philosophyHeadline: '',
    philosophyText: '',
    goalKeywords: '',
    goalText: '',
    disclaimer: '',
    photo: '/images/profile/1791092487681_20190710_082214.jpg',
    whatsappEnabled: true,
    whatsappNumber: '+373 60 123 456',
    whatsappMessage: 'Hello Dr. Mayank, I would like to inquire about a personal 1:1 sanctuary consultation.',
    whatsappLabel: 'Chat with Dr. Mayank'
  });

  // Load active tab data
  useEffect(() => {
    const active = content || {};
    const about = active.about || {};
    const phil = active.philosophy || {};
    const goal = about.goal || {};
    const wa = active.whatsapp || {};

    const resolvedPhoto = (active.brand?.profileImage && active.brand.profileImage !== '/meditation-hero.png')
      ? active.brand.profileImage
      : '/images/profile/1791092487681_20190710_082214.jpg';

    setProfileData({
      name: active.brand?.name || 'Dr. Mayank Ahooja',
      title: active.brand?.title || 'Doctor of Medicine | Meditation Master | Spiritual Coach | Motivational Speaker',
      lead: about.lead || '',
      bio1: about.bio1 || '',
      bio2: about.bio2 || '',
      bio3: about.bio3 || '',
      philosophyHeadline: phil.headline || 'Transformation Begins Within.',
      philosophyText: phil.text || '',
      goalKeywords: goal.keywords || 'Calmness • Well-being • Balance • Harmony • Happiness',
      goalText: goal.text || '',
      disclaimer: about.disclaimer || '',
      photo: resolvedPhoto,
      whatsappEnabled: wa.enabled !== false,
      whatsappNumber: wa.number || active.brand?.phone || '+373 60 123 456',
      whatsappMessage: wa.message || 'Hello Dr. Mayank, I would like to inquire about a personal 1:1 sanctuary consultation.',
      whatsappLabel: wa.label || 'Chat with Dr. Mayank'
    });
  }, [content, activeTab]);

  // Handle Image Upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus({ type: '', msg: '' });

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result;
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            filename: file.name,
            base64Data,
            category: 'profile'
          })
        });

        const data = await res.json();
        if (res.ok && data.url) {
          setProfileData(prev => ({ ...prev, photo: data.url }));

          // Automatically persist the new profile photo across all languages
          try {
            if (fullBundle && saveFullBundle) {
              const nextBundle = JSON.parse(JSON.stringify(fullBundle));
              Object.keys(nextBundle).forEach(lang => {
                if (!nextBundle[lang].brand) nextBundle[lang].brand = {};
                nextBundle[lang].brand.profileImage = data.url;
              });
              await saveFullBundle(nextBundle, token);
            }
          } catch (autoErr) {
            console.warn('Auto persistence of photo failed', autoErr);
          }

          setStatus({ type: 'success', msg: 'Profile photo uploaded and updated on the About page!' });
        } else {
          setStatus({ type: 'error', msg: data.error || 'Upload failed' });
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to process file' });
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: '', msg: '' });

    try {
      const updated = JSON.parse(JSON.stringify(content));

      if (!updated.brand) updated.brand = {};
      updated.brand.name = profileData.name;
      updated.brand.title = profileData.title;
      updated.brand.profileImage = profileData.photo;
      updated.brand.phone = profileData.whatsappNumber;

      if (!updated.whatsapp) updated.whatsapp = {};
      updated.whatsapp.enabled = profileData.whatsappEnabled;
      updated.whatsapp.number = profileData.whatsappNumber;
      updated.whatsapp.message = profileData.whatsappMessage;
      updated.whatsapp.label = profileData.whatsappLabel;

      if (!updated.about) updated.about = {};
      updated.about.lead = profileData.lead;
      updated.about.bio1 = profileData.bio1;
      updated.about.bio2 = profileData.bio2;
      updated.about.bio3 = profileData.bio3;
      updated.about.disclaimer = profileData.disclaimer;

      if (!updated.about.goal) updated.about.goal = {};
      updated.about.goal.keywords = profileData.goalKeywords;
      updated.about.goal.text = profileData.goalText;

      if (!updated.philosophy) updated.philosophy = {};
      updated.philosophy.headline = profileData.philosophyHeadline;
      updated.philosophy.text = profileData.philosophyText;

      if (fullBundle && saveFullBundle) {
        const nextBundle = JSON.parse(JSON.stringify(fullBundle));
        Object.keys(nextBundle).forEach(lang => {
          if (!nextBundle[lang].brand) nextBundle[lang].brand = {};
          nextBundle[lang].brand.profileImage = profileData.photo;
        });
        nextBundle[activeTab] = updated;
        const res = await saveFullBundle(nextBundle, token);
        if (res.success) {
          setStatus({ type: 'success', msg: 'Profile changes saved and persisted successfully across the site!' });
        }
      } else {
        const res = await saveLanguageContent(activeTab, updated, token);
        if (res.success) {
          setStatus({ type: 'success', msg: 'Profile changes saved and persisted successfully!' });
        }
      }
    } catch (err) {
      setStatus({ type: 'error', msg: err.message || 'Failed to save profile changes' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className={styles.panelHeader} style={{ borderBottom: 'none', paddingBottom: 0 }}>
        <div>
          <h2 className={styles.panelTitle}>Profile &amp; Biography Management</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
            Manage doctor credentials, philosophy, biographical narrative, and profile photo.
          </p>
        </div>
      </div>

      {status.msg && (
        <div className={status.type === 'success' ? styles.noticeSuccess : styles.noticeError}>
          {status.type === 'success' ? '✓' : '⚠️'} {status.msg}
        </div>
      )}

      {/* Language Selector Tab */}
      <div className={styles.langTabs}>
        {['en', 'ru', 'ro', 'fr', 'de', 'it', 'es'].map(l => (
          <button
            key={l}
            type="button"
            className={`${styles.langTab} ${activeTab === l ? styles.langTabActive : ''}`}
            onClick={() => setActiveTab(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave}>
        {/* Photo Upload Panel */}
        <div className={styles.panel}>
          <h3 className={styles.panelTitle} style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>
            Profile Photograph (Persistent Storage)
          </h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {profileData.photo && (
              <img 
                src={profileData.photo} 
                alt="Profile Preview" 
                className={styles.previewThumb} 
              />
            )}
            <div style={{ flexGrow: 1 }}>
              <label className={styles.label}>Upload Replacement Photo (JPEG, PNG, WebP)</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handlePhotoUpload}
                disabled={uploading}
                className={styles.input}
              />
              <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '0.35rem' }}>
                {uploading ? 'Uploading to /public/images/profile/...' : 'Uploaded photos are automatically persisted to the repository.'}
              </p>
            </div>
          </div>
        </div>

        {/* Identity & Credentials Panel */}
        <div className={styles.panel}>
          <h3 className={styles.panelTitle} style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>
            Identity &amp; Credentials
          </h3>
          <div className={styles.row2}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Professional Name</label>
              <input
                type="text"
                required
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Professional Title &amp; Accreditations</label>
              <input
                type="text"
                required
                value={profileData.title}
                onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Lead Summary</label>
            <input
              type="text"
              value={profileData.lead}
              onChange={(e) => setProfileData({ ...profileData, lead: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Biography Paragraph 1 (Mission &amp; Calling)</label>
            <textarea
              rows={3}
              value={profileData.bio1}
              onChange={(e) => setProfileData({ ...profileData, bio1: e.target.value })}
              className={styles.textarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Biography Paragraph 2 (Experience &amp; Energy Practices)</label>
            <textarea
              rows={3}
              value={profileData.bio2}
              onChange={(e) => setProfileData({ ...profileData, bio2: e.target.value })}
              className={styles.textarea}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Biography Paragraph 3 (Holistic Approach)</label>
            <textarea
              rows={3}
              value={profileData.bio3}
              onChange={(e) => setProfileData({ ...profileData, bio3: e.target.value })}
              className={styles.textarea}
            />
          </div>
        </div>

        {/* Philosophy & Goals Panel */}
        <div className={styles.panel}>
          <h3 className={styles.panelTitle} style={{ fontSize: '1.15rem', marginBottom: '1rem' }}>
            Philosophy, Goal &amp; Medical Disclaimer
          </h3>

          <div className={styles.formGroup}>
            <label className={styles.label}>Core Philosophy Headline</label>
            <input
              type="text"
              value={profileData.philosophyHeadline}
              onChange={(e) => setProfileData({ ...profileData, philosophyHeadline: e.target.value })}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Philosophy Supporting Text</label>
            <textarea
              rows={3}
              value={profileData.philosophyText}
              onChange={(e) => setProfileData({ ...profileData, philosophyText: e.target.value })}
              className={styles.textarea}
            />
          </div>

          <div className={styles.row2}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Goal Banner Keywords</label>
              <input
                type="text"
                value={profileData.goalKeywords}
                onChange={(e) => setProfileData({ ...profileData, goalKeywords: e.target.value })}
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Goal Narrative</label>
              <textarea
                rows={2}
                value={profileData.goalText}
                onChange={(e) => setProfileData({ ...profileData, goalText: e.target.value })}
                className={styles.textarea}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Medical Safety Disclaimer</label>
            <textarea
              rows={2}
              value={profileData.disclaimer}
              onChange={(e) => setProfileData({ ...profileData, disclaimer: e.target.value })}
              className={styles.textarea}
            />
          </div>
        </div>

        {/* Direct WhatsApp Concierge Panel */}
        <div className={styles.panel}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h3 className={styles.panelTitle} style={{ fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#25D366' }}>💬</span> Direct WhatsApp Floating Concierge
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', marginTop: '0.2rem' }}>
                Configure the floating WhatsApp button on the bottom right. Any number or message updated here redirects instantly across the live website.
              </p>
            </div>
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem' }}>
              <input
                type="checkbox"
                checked={profileData.whatsappEnabled}
                onChange={(e) => setProfileData({ ...profileData, whatsappEnabled: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: '#25D366', cursor: 'pointer' }}
              />
              <span>Enable Floating Button</span>
            </label>
          </div>

          <div className={styles.row2}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                WhatsApp Phone Number (with Country Code)
              </label>
              <input
                type="text"
                required
                value={profileData.whatsappNumber}
                onChange={(e) => setProfileData({ ...profileData, whatsappNumber: e.target.value })}
                placeholder="+373 60 123 456 or +91 98765 43210"
                className={styles.input}
              />
              <p style={{ fontSize: '0.76rem', color: 'var(--text-light)', marginTop: '0.35rem' }}>
                International format with country code. Digits and symbols are automatically sanitized into direct wa.me link.
              </p>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                Hover Label / Pill Text ({activeTab.toUpperCase()})
              </label>
              <input
                type="text"
                value={profileData.whatsappLabel}
                onChange={(e) => setProfileData({ ...profileData, whatsappLabel: e.target.value })}
                placeholder="Chat with Dr. Mayank"
                className={styles.input}
              />
              <p style={{ fontSize: '0.76rem', color: 'var(--text-light)', marginTop: '0.35rem' }}>
                Displayed next to the WhatsApp icon on desktop screens.
              </p>
            </div>
          </div>

          <div className={styles.formGroup} style={{ marginTop: '0.85rem' }}>
            <label className={styles.label}>
              Pre-Filled Message Template ({activeTab.toUpperCase()})
            </label>
            <textarea
              rows={2}
              value={profileData.whatsappMessage}
              onChange={(e) => setProfileData({ ...profileData, whatsappMessage: e.target.value })}
              placeholder="Hello Dr. Mayank, I would like to inquire about a personal 1:1 sanctuary consultation."
              className={styles.textarea}
            />
            <p style={{ fontSize: '0.76rem', color: 'var(--text-light)', marginTop: '0.35rem' }}>
              When clients tap the WhatsApp button, this text is pre-filled in their chat window ready to send.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button type="submit" disabled={saving} className={styles.saveBtn}>
            {saving ? 'Persisting Changes...' : 'Save Profile Changes ✓'}
          </button>
        </div>
      </form>
    </div>
  );
}
