import React, { useState } from 'react';
import { useContent } from '../../context/ContentContext';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/admin.module.css';

export default function AdminPrograms() {
  const { content, saveLanguageContent } = useContent();
  const { token } = useAuth();

  const [activeTab, setActiveTab] = useState('en');
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({
    title: '',
    type: 'Cohort Intensive',
    schedule: '',
    desc: '',
    pillar: 'ENERGY',
    visible: true
  });

  const programs = content?.programs?.items || [];

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updated = JSON.parse(JSON.stringify(content));
      if (!updated.programs) updated.programs = { items: [] };
      if (!updated.programs.items) updated.programs.items = [];

      updated.programs.items.push({
        id: `prog-${Date.now()}`,
        ...form
      });

      await saveLanguageContent(activeTab, updated, token);
      setStatus({ type: 'success', msg: 'Program added and persisted!' });
      setIsAdding(false);
      setForm({
        title: '',
        type: 'Cohort Intensive',
        schedule: '',
        desc: '',
        pillar: 'ENERGY',
        visible: true
      });
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to add program' });
    }
  };

  const handleToggleVisibility = async (id) => {
    const updated = JSON.parse(JSON.stringify(content));
    const items = updated.programs?.items || [];
    const target = items.find(p => p.id === id);
    if (target) {
      target.visible = !target.visible;
      await saveLanguageContent(activeTab, updated, token);
      setStatus({ type: 'success', msg: 'Program visibility updated' });
    }
  };

  const handleDelete = async (id) => {
    const updated = JSON.parse(JSON.stringify(content));
    updated.programs.items = (updated.programs?.items || []).filter(p => p.id !== id);
    await saveLanguageContent(activeTab, updated, token);
    setStatus({ type: 'success', msg: 'Program deleted' });
  };

  return (
    <div>
      <div className={styles.panelHeader} style={{ borderBottom: 'none', paddingBottom: 0 }}>
        <div>
          <h2 className={styles.panelTitle}>Guided Programs &amp; Workshops</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
            Manage upcoming meditation intensives, stillness retreats, and cohort journeys.
          </p>
        </div>
        {!isAdding && (
          <button
            type="button"
            className={styles.saveBtn}
            onClick={() => setIsAdding(true)}
          >
            + Add New Program
          </button>
        )}
      </div>

      {status.msg && (
        <div className={status.type === 'success' ? styles.noticeSuccess : styles.noticeError}>
          {status.type === 'success' ? '✓' : '⚠️'} {status.msg}
        </div>
      )}

      {isAdding && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Add Guided Program</h3>
            <button
              type="button"
              className={styles.secondaryBtn}
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div className={styles.row2}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Program Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. 4-Week Chakra Awakening"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Program Type / Format</label>
                <input
                  type="text"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  placeholder="e.g. Cohort Intensive / Sanctuary Retreat"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.row2}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Schedule / Timing</label>
                <input
                  type="text"
                  value={form.schedule}
                  onChange={(e) => setForm({ ...form, schedule: e.target.value })}
                  placeholder="e.g. Next Cohort: October 2026"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Primary Wellness Pillar</label>
                <select
                  value={form.pillar}
                  onChange={(e) => setForm({ ...form, pillar: e.target.value })}
                  className={styles.select}
                >
                  {['MIND', 'EMOTIONS', 'ENERGY', 'BODY', 'INNER GROWTH'].map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Description</label>
              <textarea
                rows={3}
                required
                value={form.desc}
                onChange={(e) => setForm(prev => ({ ...prev, desc: e.target.value }))}
                placeholder="Comprehensive overview of topics covered and cohort structure..."
                className={styles.textarea}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.saveBtn}
              >
                Save Program ✓
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.panel}>
        {programs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            No programs created yet.
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Pillar</th>
                <th>Visibility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map(p => (
                <tr key={p.id}>
                  <td>
                    <strong>{p.title}</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>{p.schedule}</div>
                  </td>
                  <td>{p.type}</td>
                  <td><span style={{ fontSize: '0.78rem', color: 'var(--gold-accent)' }}>{p.pillar}</span></td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleToggleVisibility(p.id)}
                      style={{
                        padding: '0.25rem 0.6rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        border: 'none',
                        cursor: 'pointer',
                        background: p.visible !== false ? 'rgba(40, 167, 69, 0.15)' : 'rgba(108, 117, 125, 0.15)',
                        color: p.visible !== false ? '#1E7E34' : '#6C757D'
                      }}
                    >
                      {p.visible !== false ? '● Visible' : '○ Hidden'}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
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
