import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/admin.module.css';

const PILLAR_OPTIONS = ['MIND', 'EMOTIONS', 'ENERGY', 'BODY', 'INNER GROWTH'];

export default function AdminServices() {
  const { content, saveLanguageContent } = useContent();
  const { token } = useAuth();

  const [activeTab, setActiveTab] = useState('en');
  const [editingService, setEditingService] = useState(null);
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const services = content?.services?.items || [];

  const handleEdit = (service) => {
    setEditingService(JSON.parse(JSON.stringify(service)));
  };

  const handleToggleVisibility = async (serviceId) => {
    const updated = JSON.parse(JSON.stringify(content));
    const items = updated.services?.items || [];
    const target = items.find(s => s.id === serviceId);
    if (target) {
      target.visible = !target.visible;
      await saveLanguageContent(activeTab, updated, token);
      setStatus({ type: 'success', msg: `Service "${target.title}" visibility toggled!` });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editingService) return;

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            filename: file.name,
            base64Data: reader.result,
            category: 'gallery'
          })
        });
        const data = await res.json();
        if (res.ok && data.url) {
          setEditingService(prev => ({ ...prev, image: data.url }));
          setStatus({ type: 'success', msg: 'Service artwork updated!' });
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setUploading(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updated = JSON.parse(JSON.stringify(content));
      const items = updated.services?.items || [];
      const index = items.findIndex(s => s.id === editingService.id);
      if (index !== -1) {
        items[index] = editingService;
      } else {
        items.push(editingService);
      }

      await saveLanguageContent(activeTab, updated, token);
      setStatus({ type: 'success', msg: `Service "${editingService.title}" updated and persisted!` });
      setEditingService(null);
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to update service' });
    } finally {
      setSaving(false);
    }
  };

  const togglePillar = (pillar) => {
    if (!editingService) return;
    const current = editingService.pillars || [];
    const updated = current.includes(pillar)
      ? current.filter(p => p !== pillar)
      : [...current, pillar];
    setEditingService({ ...editingService, pillars: updated });
  };

  return (
    <div>
      <div className={styles.panelHeader} style={{ borderBottom: 'none', paddingBottom: 0 }}>
        <div>
          <h2 className={styles.panelTitle}>Services &amp; Wellness Modalities</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
            Manage the 8 public service categories, assign wellness pillars, and update descriptions.
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
            className={`${styles.langTab} ${activeTab === l ? styles.langTabActive : ''}`}
            onClick={() => {
              setActiveTab(l);
              setEditingService(null);
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Edit Form Modal */}
      {editingService ? (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Editing: {editingService.title}</h3>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => setEditingService(null)}
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSaveEdit}>
            <div className={styles.row2}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Service Title</label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Duration Label</label>
                <input
                  type="text"
                  value={editingService.duration || ''}
                  onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Format &amp; Setting</label>
              <input
                type="text"
                value={editingService.format || ''}
                onChange={(e) => setEditingService({ ...editingService, format: e.target.value })}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Short Description (Public Card)</label>
              <textarea
                rows={3}
                required
                value={editingService.shortDesc ?? editingService.desc ?? ''}
                onChange={(e) => {
                  const value = e.target.value;
                  setEditingService(prev => ({ ...prev, shortDesc: value, desc: value }));
                }}
                className={styles.textarea}
              />
            </div>

            {/* Pillar Assignment */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Associated Core Wellness Pillars</label>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                {PILLAR_OPTIONS.map((pil) => {
                  const isChecked = (editingService.pillars || []).includes(pil);
                  return (
                    <button
                      key={pil}
                      type="button"
                      onClick={() => togglePillar(pil)}
                      className={isChecked ? styles.saveBtn : styles.secondaryBtn}
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                    >
                      {isChecked ? '✓ ' : '+ '} {pil}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Artwork Image */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Service Artwork</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {editingService.image && (
                  <img src={editingService.image} alt="Service" className={styles.previewThumb} />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className={styles.input}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => setEditingService(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className={styles.saveBtn}
              >
                {saving ? 'Saving...' : 'Save Service Changes ✓'}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {/* Services Table */}
      <div className={styles.panel}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Service</th>
              <th>Pillars</th>
              <th>Duration</th>
              <th>Visibility</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.num}</td>
                <td>
                  <strong>{service.title}</strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '0.2rem' }}>
                    {service.format}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                    {(service.pillars || []).map(p => (
                      <span key={p} style={{
                        fontSize: '0.68rem',
                        padding: '0.15rem 0.4rem',
                        borderRadius: '4px',
                        background: 'rgba(200, 149, 74, 0.12)',
                        color: '#704B18'
                      }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </td>
                <td>{service.duration}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleToggleVisibility(service.id)}
                    style={{
                      padding: '0.25rem 0.6rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      border: 'none',
                      cursor: 'pointer',
                      background: service.visible !== false ? 'rgba(40, 167, 69, 0.15)' : 'rgba(108, 117, 125, 0.15)',
                      color: service.visible !== false ? '#1E7E34' : '#6C757D'
                    }}
                  >
                    {service.visible !== false ? '● Visible' : '○ Hidden'}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                    onClick={() => handleEdit(service)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
