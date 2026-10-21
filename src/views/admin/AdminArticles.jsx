import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/admin.module.css';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Russian' },
  { code: 'ro', label: 'Romanian' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'it', label: 'Italian' },
  { code: 'es', label: 'Spanish' }
];

const CATEGORY_OPTIONS = [
  'Breathing & Mind',
  'Somatic Science',
  'Energy & Chakras',
  'Emotional Health',
  'Inner Growth & Silence',
  'Meditation & Stillness',
  'Holistic Health'
];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function AdminArticles() {
  const { content, fullBundle, saveLanguageContent, saveFullBundle } = useContent();
  const { token } = useAuth();

  const [activeTab, setActiveTab] = useState('en');
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [isWriting, setIsWriting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const initialForm = {
    id: '',
    title: '',
    category: 'Breathing & Mind',
    customCategory: '',
    date: 'September 2026',
    readTime: '5 min read',
    excerpt: '',
    content: '',
    image: '',
    author: 'Dr. Mayank Ahooja',
    featured: false,
    visible: true,
    syncAll: false
  };

  const [form, setForm] = useState(initialForm);

  // Active language dictionary
  const currentLangData = fullBundle?.[activeTab] || (activeTab === 'en' ? content : (fullBundle?.['en'] || {}));
  const articles = currentLangData?.articles?.items || [];

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setForm(prev => {
      const next = { ...prev, title: val };
      if (!editingId && !slugManuallyEdited) {
        next.id = slugify(val);
      }
      return next;
    });
  };

  const compressImage = (file, maxWidth = 1600, quality = 0.85) => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/') || file.type.includes('svg')) {
        const reader = new FileReader();
        reader.onload = () => resolve({ base64: reader.result, name: file.name });
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          const safeName = file.name.replace(/\.[^.]+$/, '') + '.jpg';
          resolve({ base64: compressedDataUrl, name: safeName });
        };
        img.onerror = () => resolve({ base64: e.target.result, name: file.name });
        img.src = e.target.result;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const compressed = await compressImage(file);
      if (!compressed || !compressed.base64) {
        throw new Error('Could not process image');
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          filename: compressed.name,
          base64Data: compressed.base64,
          category: 'articles'
        })
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setForm(prev => ({ ...prev, image: data.url }));
        setStatus({ type: 'success', msg: 'Article photo uploaded and optimized for high-speed loading!' });
      } else {
        setStatus({ type: 'error', msg: data.error || 'Failed to upload image' });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: err.message || 'Error processing photo' });
    } finally {
      setUploading(false);
    }
  };

  const handleStartNew = () => {
    setEditingId(null);
    setSlugManuallyEdited(false);
    setForm({
      ...initialForm,
      date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    });
    setIsWriting(true);
    setStatus({ type: '', msg: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEdit = (art) => {
    setEditingId(art.id);
    setSlugManuallyEdited(true);

    let bodyContent = art.content || '';
    if (!bodyContent && Array.isArray(art.sections)) {
      bodyContent = art.sections.map(s => {
        let block = '';
        if (s.heading) block += `## ${s.heading}\n\n`;
        if (s.p1) block += `${s.p1}\n\n`;
        if (s.quote) block += `> ${s.quote}\n\n`;
        if (s.p2) block += `${s.p2}\n\n`;
        return block.trim();
      }).filter(Boolean).join('\n\n');
    }

    const isCustomCat = art.category && !CATEGORY_OPTIONS.includes(art.category);

    setForm({
      id: art.id || '',
      title: art.title || '',
      category: isCustomCat ? 'custom' : (art.category || 'Breathing & Mind'),
      customCategory: isCustomCat ? art.category : '',
      date: art.date || 'September 2026',
      readTime: art.readTime || '5 min read',
      excerpt: art.excerpt || '',
      content: bodyContent,
      image: art.image || '',
      author: art.author || 'Dr. Mayank Ahooja',
      featured: !!art.featured,
      visible: art.visible !== false,
      syncAll: false
    });

    setIsWriting(true);
    setStatus({ type: '', msg: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setIsWriting(false);
    setEditingId(null);
    setForm(initialForm);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: '', msg: '' });

    try {
      const articleId = (form.id.trim() || slugify(form.title) || `art-${Date.now()}`);
      const categoryFinal = form.category === 'custom' ? form.customCategory.trim() : form.category;

      const articlePayload = {
        id: articleId,
        title: form.title.trim(),
        category: categoryFinal || 'Breathing & Mind',
        date: form.date.trim() || 'September 2026',
        readTime: form.readTime.trim() || '5 min read',
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        image: form.image.trim(),
        author: form.author.trim() || 'Dr. Mayank Ahooja',
        featured: !!form.featured,
        visible: form.visible !== false
      };

      if (form.syncAll) {
        // Update all 7 languages
        const updatedBundle = JSON.parse(JSON.stringify(fullBundle || {}));
        const allCodes = ['en', 'ru', 'ro', 'fr', 'de', 'it', 'es'];

        for (const code of allCodes) {
          if (!updatedBundle[code]) updatedBundle[code] = {};
          if (!updatedBundle[code].articles) updatedBundle[code].articles = { items: [] };
          if (!Array.isArray(updatedBundle[code].articles.items)) updatedBundle[code].articles.items = [];

          const items = updatedBundle[code].articles.items;
          const idx = items.findIndex(a => a.id === articleId || (editingId && a.id === editingId));
          if (idx !== -1) {
            items[idx] = { ...items[idx], ...articlePayload };
          } else {
            items.unshift(articlePayload);
          }
        }

        await saveFullBundle(updatedBundle, token);
        setStatus({
          type: 'success',
          msg: `Article "${articlePayload.title}" saved and synchronized across all languages! Visible immediately to clients.`
        });
      } else {
        // Update active language
        const updatedLangData = JSON.parse(JSON.stringify(currentLangData || {}));
        if (!updatedLangData.articles) updatedLangData.articles = { items: [] };
        if (!Array.isArray(updatedLangData.articles.items)) updatedLangData.articles.items = [];

        const items = updatedLangData.articles.items;
        const idx = items.findIndex(a => a.id === articleId || (editingId && a.id === editingId));
        if (idx !== -1) {
          items[idx] = articlePayload;
        } else {
          items.unshift(articlePayload);
        }

        await saveLanguageContent(activeTab, updatedLangData, token);
        setStatus({
          type: 'success',
          msg: `Article "${articlePayload.title}" saved in ${activeTab.toUpperCase()}! Clients can now read it on the website.`
        });
      }

      setIsWriting(false);
      setEditingId(null);
      setForm(initialForm);
    } catch (err) {
      setStatus({ type: 'error', msg: err.message || 'Failed to save article' });
    } finally {
      setSaving(false);
    }
  };

  const handleToggleVisibility = async (artId) => {
    try {
      const updatedLangData = JSON.parse(JSON.stringify(currentLangData || {}));
      const items = updatedLangData.articles?.items || [];
      const target = items.find(a => a.id === artId);
      if (target) {
        target.visible = target.visible === false ? true : false;
        await saveLanguageContent(activeTab, updatedLangData, token);
        setStatus({
          type: 'success',
          msg: `Article "${target.title}" is now ${target.visible ? 'VISIBLE' : 'HIDDEN'} on the client website.`
        });
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to update visibility' });
    }
  };

  const handleDelete = async (art) => {
    if (!window.confirm(`Are you sure you want to delete the article "${art.title}"? This cannot be undone.`)) {
      return;
    }

    try {
      const updatedLangData = JSON.parse(JSON.stringify(currentLangData || {}));
      updatedLangData.articles.items = (updatedLangData.articles?.items || []).filter(a => a.id !== art.id);
      await saveLanguageContent(activeTab, updatedLangData, token);
      setStatus({ type: 'success', msg: `Article "${art.title}" deleted.` });
      if (editingId === art.id) {
        setIsWriting(false);
        setEditingId(null);
      }
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to delete article' });
    }
  };

  return (
    <div>
      <div className={styles.panelHeader} style={{ borderBottom: 'none', paddingBottom: 0 }}>
        <div>
          <h2 className={styles.panelTitle}>Wellness Articles &amp; Client Insights</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
            Write, edit, and publish clinical reflections and contemplative essays visible to clients on the website.
          </p>
        </div>
        {!isWriting && (
          <button
            type="button"
            className={styles.saveBtn}
            onClick={handleStartNew}
          >
            + Write New Article
          </button>
        )}
      </div>

      {/* Language Switcher Tabs */}
      <div className={styles.langTabs}>
        {LANGUAGES.map(l => {
          const count = (fullBundle?.[l.code]?.articles?.items || []).length;
          return (
            <button
              key={l.code}
              type="button"
              className={`${styles.langTab} ${activeTab === l.code ? styles.activeLangTab : ''}`}
              onClick={() => {
                setActiveTab(l.code);
                if (isWriting) {
                  setIsWriting(false);
                  setEditingId(null);
                }
              }}
            >
              {l.label} ({count})
            </button>
          );
        })}
      </div>

      {status.msg && (
        <div className={status.type === 'success' ? styles.noticeSuccess : styles.noticeError}>
          {status.type === 'success' ? '✓' : '⚠️'} {status.msg}
        </div>
      )}

      {/* Write / Edit Form */}
      {isWriting && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h3 className={styles.panelTitle}>
                {editingId ? 'Edit Article' : 'Write & Publish New Article'}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Editing for locale: <strong>{activeTab.toUpperCase()}</strong> ({LANGUAGES.find(l => l.code === activeTab)?.label})
              </p>
            </div>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Article Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={handleTitleChange}
                placeholder="e.g. Awakening Cellular Vitality Through Conscious Respiration"
                className={styles.input}
              />
            </div>

            <div className={styles.row2}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  URL Slug / Identifier *
                  <span style={{ fontWeight: 'normal', color: 'var(--text-muted)', fontSize: '0.78rem', marginLeft: '0.5rem' }}>
                    (e.g. {`/${activeTab}/articles/${form.id || 'slug'}`})
                  </span>
                </label>
                <input
                  type="text"
                  required
                  value={form.id}
                  onChange={(e) => {
                    setSlugManuallyEdited(true);
                    setForm({ ...form, id: slugify(e.target.value) });
                  }}
                  placeholder="e.g. conscious-respiration"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className={styles.select}
                >
                  {CATEGORY_OPTIONS.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                  <option value="custom">+ Custom Category...</option>
                </select>
                {form.category === 'custom' && (
                  <input
                    type="text"
                    required
                    style={{ marginTop: '0.5rem' }}
                    value={form.customCategory}
                    onChange={(e) => setForm({ ...form, customCategory: e.target.value })}
                    placeholder="Enter custom category name"
                    className={styles.input}
                  />
                )}
              </div>
            </div>

            <div className={styles.row3}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Publication Date</label>
                <input
                  type="text"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  placeholder="e.g. September 2026"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Read Time Estimate</label>
                <input
                  type="text"
                  value={form.readTime}
                  onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                  placeholder="e.g. 5 min read"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Author Name</label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="Dr. Mayank Ahooja"
                  className={styles.input}
                />
              </div>
            </div>

            {/* Featured Image */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Featured Header Image (Optional)</label>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="Image URL or upload file (e.g. /hero-meditation.png)"
                  className={styles.input}
                  style={{ flexGrow: 1 }}
                />
                <label
                  className={styles.secondaryBtn}
                  style={{ cursor: 'pointer', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  {uploading ? 'Uploading...' : '📁 Upload Photo'}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                </label>
              </div>
              {form.image && (
                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img
                    src={form.image}
                    alt="Preview"
                    style={{ width: '120px', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(82, 32, 79, 0.15)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, image: '' })}
                    style={{ background: 'none', border: 'none', color: '#DC3545', cursor: 'pointer', fontSize: '0.8rem' }}
                  >
                    Remove image
                  </button>
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Article Abstract / Excerpt *</label>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                A compelling summary (2-3 sentences) displayed on cards, archive pages, and in search engine previews.
              </p>
              <textarea
                rows={3}
                required
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                placeholder="A compelling excerpt summarizing the main wisdom or scientific insight..."
                className={styles.textarea}
              />
            </div>

            {/* Full Body Content */}
            <div className={styles.formGroup}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <label className={styles.label}>Full Article Body &amp; Reflections *</label>
                <span style={{ fontSize: '0.78rem', color: 'var(--gold-accent)' }}>
                  Formatting guide available below
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', lineHeight: 1.5 }}>
                Write your full essay here. Use <strong>blank lines</strong> between paragraphs. Use <code>## Subheading</code> for section headers, and <code>&gt; Quote text</code> for highlighted quote blocks.
              </p>
              <textarea
                rows={12}
                required
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                placeholder={`Paragraph 1: Introduce the contemplative theme or physiological insight...\n\n## Scientific Foundations of Stillness\n\nParagraph 2: Explore the depth of the practice...\n\n> "A calmer breath is the foundation for an untroubled mind."\n\nParagraph 3: Practical steps for incorporating this awareness into everyday life.`}
                className={styles.textarea}
                style={{ fontFamily: 'inherit', fontSize: '0.95rem', lineHeight: 1.6 }}
              />
            </div>

            {/* Publication Settings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'rgba(82, 32, 79, 0.03)', padding: '1.25rem', borderRadius: '10px', marginBottom: '1.5rem', border: '1px solid rgba(82, 32, 79, 0.08)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input
                  type="checkbox"
                  checked={form.visible}
                  onChange={(e) => setForm({ ...form, visible: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--plum-primary)' }}
                />
                <span><strong>Publish immediately</strong> — Visible to visitors on the client website</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--gold-accent)' }}
                />
                <span><strong>Featured Article</strong> — Highlight with gold badge on client cards</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input
                  type="checkbox"
                  checked={form.syncAll}
                  onChange={(e) => setForm({ ...form, syncAll: e.target.checked })}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--gold-accent)' }}
                />
                <span><strong>Sync across all 7 languages</strong> (Copies this article into EN, RU, RO, FR, DE, IT, ES so all clients see it immediately)</span>
              </label>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.saveBtn}
                disabled={saving}
              >
                {saving ? 'Saving...' : (editingId ? 'Save Changes ✓' : 'Publish Article ✓')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Articles Listing */}
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h3 className={styles.panelTitle}>
            Published Articles ({articles.length})
          </h3>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Language: <strong>{activeTab.toUpperCase()}</strong>
          </span>
        </div>

        {articles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.05rem', marginBottom: '1rem' }}>No articles published in {activeTab.toUpperCase()} yet.</p>
            <button
              type="button"
              className={styles.saveBtn}
              onClick={handleStartNew}
            >
              + Write the First Article
            </button>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Image</th>
                <th>Title &amp; Slug</th>
                <th>Category</th>
                <th>Date &amp; Read Time</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(a => (
                <tr key={a.id}>
                  <td>
                    {a.image ? (
                      <img
                        src={a.image}
                        alt=""
                        style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(82, 32, 79, 0.1)' }}
                      />
                    ) : (
                      <div style={{ width: '48px', height: '36px', background: 'rgba(82, 32, 79, 0.05)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        No img
                      </div>
                    )}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {a.title}
                      {a.featured && (
                        <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', padding: '0.15rem 0.4rem', borderRadius: '4px', background: 'rgba(200, 149, 74, 0.2)', color: 'var(--gold-accent)' }}>
                          Featured
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      Slug: <code>{a.id}</code>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.55rem', borderRadius: '10px', background: 'rgba(200, 149, 74, 0.12)', color: 'var(--gold-accent)', fontWeight: 600 }}>
                      {a.category}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem' }}>{a.date || '—'}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{a.readTime || '—'}</div>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleToggleVisibility(a.id)}
                      title="Click to toggle visibility"
                      style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer',
                        background: a.visible !== false ? 'rgba(40, 167, 69, 0.15)' : 'rgba(108, 117, 125, 0.15)',
                        color: a.visible !== false ? '#1E7E34' : '#6C757D'
                      }}
                    >
                      {a.visible !== false ? '● Published' : '○ Hidden'}
                    </button>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <a
                        href={`/${activeTab}/articles/${a.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.secondaryBtn}
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem', textDecoration: 'none' }}
                        title="View live article on client website"
                      >
                        View ↗
                      </a>
                      <button
                        type="button"
                        className={styles.secondaryBtn}
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                        onClick={() => handleEdit(a)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                        onClick={() => handleDelete(a)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
