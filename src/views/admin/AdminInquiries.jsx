'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import ConfirmModal from '@/components/common/ConfirmModal';
import styles from '@/styles/admin.module.css';

export default function AdminInquiries() {
  const { token } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState([]);

  // Telegram Alert States
  const [telegramModalOpen, setTelegramModalOpen] = useState(false);
  const [telegramConfig, setTelegramConfig] = useState({ enabled: true, hasToken: false, maskedToken: '', chatId: '' });
  const [telegramForm, setTelegramForm] = useState({ botToken: '', chatId: '', enabled: true });
  const [telegramStatus, setTelegramStatus] = useState(null);
  const [isTestingTelegram, setIsTestingTelegram] = useState(false);
  const [isSavingTelegram, setIsSavingTelegram] = useState(false);

  const fetchTelegramConfig = async () => {
    try {
      const res = await fetch('/api/telegram', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setTelegramConfig(data);
        setTelegramForm(prev => ({
          botToken: prev.botToken || '',
          chatId: data.chatId || '',
          enabled: data.enabled !== false
        }));
      }
    } catch (err) {
      console.error('Failed to load telegram config:', err);
    }
  };

  const handleTestTelegram = async () => {
    setTelegramStatus(null);
    setIsTestingTelegram(true);
    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          action: 'test',
          botToken: telegramForm.botToken,
          chatId: telegramForm.chatId
        })
      });
      const data = await res.json();
      if (res.ok) {
        setTelegramStatus({ type: 'success', text: data.message || 'Test message sent! Check your Telegram app.' });
      } else {
        setTelegramStatus({ type: 'error', text: data.error || 'Failed to send test message.' });
      }
    } catch (err) {
      setTelegramStatus({ type: 'error', text: 'Error connecting to Telegram server.' });
    } finally {
      setIsTestingTelegram(false);
    }
  };

  const handleSaveTelegram = async (e) => {
    if (e) e.preventDefault();
    setTelegramStatus(null);
    setIsSavingTelegram(true);
    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          action: 'save',
          botToken: telegramForm.botToken,
          chatId: telegramForm.chatId,
          enabled: telegramForm.enabled
        })
      });
      const data = await res.json();
      if (res.ok) {
        setTelegramStatus({ type: 'success', text: 'Telegram alert settings saved & activated!' });
        fetchTelegramConfig();
        setTimeout(() => setTelegramModalOpen(false), 1500);
      } else {
        setTelegramStatus({ type: 'error', text: data.error || 'Failed to save settings.' });
      }
    } catch (err) {
      setTelegramStatus({ type: 'error', text: 'Error saving Telegram settings.' });
    } finally {
      setIsSavingTelegram(false);
    }
  };

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/consultations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to load inquiries.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchInquiries();
      fetchTelegramConfig();
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/consultations?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setInquiries(prev => prev.filter(item => item.id !== id));
        setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
        setMessage({ type: 'success', text: 'Inquiry deleted successfully.' });
      } else {
        setMessage({ type: 'error', text: 'Failed to delete inquiry.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error connecting to server.' });
    }
  };

  const toggleSelection = (id) => {
    setSelectedIds(prev => prev.includes(id)
      ? prev.filter(selectedId => selectedId !== id)
      : [...prev, id]);
  };

  const confirmDeleteSelected = async () => {
    const ids = deleteTarget;
    setDeleteTarget([]);
    for (const id of ids) {
      await handleDelete(id);
    }
  };

  const filtered = inquiries.filter(item => {
    const q = search.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.email && item.email.toLowerCase().includes(q)) ||
      (item.phone && item.phone.toLowerCase().includes(q)) ||
      (item.country && item.country.toLowerCase().includes(q)) ||
      (item.city && item.city.toLowerCase().includes(q)) ||
      (item.symptoms && item.symptoms.toLowerCase().includes(q)) ||
      (item.gender && item.gender.toLowerCase().includes(q)) ||
      (item.age && item.age.toString().toLowerCase().includes(q)) ||
      (item.service && item.service.toLowerCase().includes(q)) ||
      (item.message && item.message.toLowerCase().includes(q))
    );
  });

  const visibleIds = filtered.map(item => item.id);
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every(id => selectedIds.includes(id));

  const handleExportExcel = async () => {
    // Determine which inquiries to export: selected items or filtered items
    const targetItems = selectedIds.length > 0
      ? inquiries.filter(item => selectedIds.includes(item.id))
      : filtered;

    if (targetItems.length === 0) {
      setMessage({ type: 'error', text: 'No inquiries available to export.' });
      return;
    }

    const rows = targetItems.map((inq, index) => ({
      'S.No': index + 1,
      'Date & Time': inq.date ? new Date(inq.date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A',
      'Client Name': inq.name || 'Anonymous Guest',
      'Email': inq.email || 'N/A',
      'Phone / Mobile': inq.phone || 'N/A',
      'Age': inq.age || 'N/A',
      'Gender': inq.gender || 'N/A',
      'Country': inq.country || 'N/A',
      'City': inq.city || 'N/A',
      'Preferred Focus / Service': inq.preferredFocus || inq.service || 'General Consultation',
      'Symptoms & Concerns': inq.symptoms || '',
      'Message': inq.message || '',
      'Personal Intentions & Notes': inq.intentionsNote || ''
    }));

    try {
      const XLSX = await import('xlsx');
      const worksheet = XLSX.utils.json_to_sheet(rows);

      // Auto-fit column widths for readable Excel viewing
      worksheet['!cols'] = [
        { wch: 6 },  // S.No
        { wch: 22 }, // Date & Time
        { wch: 22 }, // Client Name
        { wch: 28 }, // Email
        { wch: 18 }, // Phone
        { wch: 8 },  // Age
        { wch: 10 }, // Gender
        { wch: 16 }, // Country
        { wch: 16 }, // City
        { wch: 28 }, // Service
        { wch: 45 }, // Symptoms
        { wch: 45 }, // Message
        { wch: 35 }  // Intentions
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Inquiries');

      const fileName = `Dr_Mayank_Inquiries_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(workbook, fileName);

      setMessage({
        type: 'success',
        text: `Exported ${targetItems.length} inquiries to Excel (${fileName}) successfully!`
      });
    } catch (err) {
      console.error('XLSX export fallback to CSV:', err);
      downloadCsvFallback(rows);
    }
  };

  const downloadCsvFallback = (rows) => {
    if (!rows.length) return;
    const headers = Object.keys(rows[0]);
    const csvContent = [
      headers.join(','),
      ...rows.map(row => headers.map(h => `"${String(row[h] || '').replace(/"/g, '""')}"`).join(','))
    ].join('\r\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Dr_Mayank_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMessage({ type: 'success', text: `Exported ${rows.length} inquiries to CSV successfully!` });
  };

  return (
    <div>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.sectionTitle}>Consultation Inquiries & Bookings</h2>
          <p className={styles.sectionDesc}>
            Manage booking requests, questions, and contact messages submitted through the website.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => {
              fetchTelegramConfig();
              setTelegramStatus(null);
              setTelegramModalOpen(true);
            }}
            className={styles.secondaryBtn}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.55rem 1rem',
              background: '#FFFFFF',
              border: '1px solid #0088cc',
              color: '#0088cc',
              fontWeight: 600,
              fontSize: '0.84rem',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0, 136, 204, 0.1)'
            }}
            title="Configure instant phone alerts via Telegram"
          >
            <span style={{ fontSize: '1rem' }}>📲</span>
            <span>Telegram Alert Bot</span>
            {telegramConfig.hasToken && telegramConfig.enabled ? (
              <span style={{
                background: '#28A745',
                color: '#fff',
                fontSize: '0.68rem',
                padding: '0.1rem 0.45rem',
                borderRadius: '999px',
                fontWeight: 700
              }}>
                ● ON
              </span>
            ) : (
              <span style={{
                background: 'rgba(0,136,204,0.1)',
                color: '#0088cc',
                fontSize: '0.68rem',
                padding: '0.1rem 0.45rem',
                borderRadius: '4px',
                fontWeight: 600
              }}>
                Setup
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={handleExportExcel}
            className={styles.primaryBtn}
            style={{
              background: 'linear-gradient(135deg, #1E7E34 0%, #155724 100%)',
              borderColor: '#155724',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.55rem 1.15rem',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.84rem',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(30, 126, 52, 0.25)',
              whiteSpace: 'nowrap'
            }}
            title="Download inquiries as Excel (.xlsx) spreadsheet"
          >
            📊 Download Excel (.xlsx)
          </button>
          <button type="button" onClick={fetchInquiries} className={styles.secondaryBtn}>
            🔄 Refresh
          </button>
        </div>
      </div>

      {message && (
        <div className={message.type === 'success' ? styles.noticeSuccess : styles.noticeError}>
          {message.text}
        </div>
      )}

      {/* Stats and Search Filter */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: '1.5rem',
        background: '#FFFFFF',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(82, 32, 79, 0.04)'
      }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-light, #7B7590)', textTransform: 'uppercase' }}>Total Inquiries</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--plum-primary, #52204F)' }}>{inquiries.length}</div>
          </div>
        </div>

        <div style={{ maxWidth: '320px', width: '100%' }}>
          <input
            type="text"
            placeholder="Search by name, email, symptoms, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.input}
            style={{ margin: 0 }}
          />
        </div>
        {filtered.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', width: '100%', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={allVisibleSelected}
                onChange={() => setSelectedIds(allVisibleSelected ? [] : visibleIds)}
              />
              Select all visible ({filtered.length})
            </label>
            {selectedIds.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleExportExcel}
                  style={{
                    background: '#1E7E34',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Export only selected inquiries to Excel"
                >
                  📊 Export {selectedIds.length} to Excel
                </button>
                <button type="button" className={styles.deleteBtn} onClick={() => setDeleteTarget(selectedIds)}>
                  Delete {selectedIds.length} selected
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Inquiries Table / Cards */}
      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          Loading inquiries...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          background: '#FFFFFF',
          padding: '3.5rem 2rem',
          borderRadius: '12px',
          textAlign: 'center',
          color: 'var(--text-muted)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📭</div>
          <div style={{ fontWeight: 500, fontSize: '1.1rem' }}>No inquiries found</div>
          <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {search ? 'Try adjusting your search query.' : 'New consultation requests from the website will appear here.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map(inq => (
            <div
              key={inq.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '1px solid rgba(200, 149, 74, 0.2)',
                boxShadow: '0 4px 15px rgba(82, 32, 79, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.45rem', fontSize: '0.8rem' }}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(inq.id)}
                      onChange={() => toggleSelection(inq.id)}
                      aria-label={`Select inquiry from ${inq.name || 'anonymous guest'}`}
                    />
                    Select inquiry
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                    <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--plum-primary, #52204F)' }}>
                      {inq.name || 'Anonymous Guest'}
                    </h3>
                    {(inq.age || inq.gender) && (
                      <span style={{
                        background: 'rgba(82, 32, 79, 0.08)',
                        color: 'var(--plum-primary, #52204F)',
                        padding: '0.15rem 0.55rem',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: 600
                      }}>
                        {[inq.age ? `${inq.age} yrs` : null, inq.gender].filter(Boolean).join(' • ')}
                      </span>
                    )}
                    {(inq.city || inq.country) && (
                      <span style={{
                        background: 'rgba(200, 149, 74, 0.12)',
                        color: 'var(--gold-dark, #9E702D)',
                        padding: '0.15rem 0.55rem',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: 600
                      }}>
                        📍 {[inq.city, inq.country].filter(Boolean).join(', ')}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {inq.date ? new Date(inq.date).toLocaleString() : 'Recent'} &middot; Focus: <strong>{inq.preferredFocus || inq.service}</strong>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDeleteTarget([inq.id])}
                  style={{
                    background: 'none',
                    border: '1px solid #dc3545',
                    color: '#dc3545',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.9rem' }}>
                {inq.email && (
                  <div>
                    <strong>Email:</strong> <a href={`mailto:${inq.email}`} style={{ color: 'var(--gold-accent, #C8954A)' }}>{inq.email}</a>
                  </div>
                )}
                {inq.phone && (
                  <div>
                    <strong>Mobile:</strong> <a href={`tel:${inq.phone}`} style={{ color: 'var(--gold-accent, #C8954A)' }}>{inq.phone}</a>
                  </div>
                )}
                {inq.preferredFocus && (
                  <div><strong>Preferred Focus:</strong> {inq.preferredFocus}</div>
                )}
              </div>

              {inq.symptoms && (
                <div style={{
                  background: 'rgba(200, 149, 74, 0.08)',
                  border: '1px solid rgba(200, 149, 74, 0.25)',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  color: 'var(--text-dark, #24222E)'
                }}>
                  <strong style={{ color: 'var(--gold-dark, #9E702D)', display: 'block', marginBottom: '0.25rem' }}>Symptoms &amp; Concerns:</strong>
                  {inq.symptoms}
                </div>
              )}

              {inq.message && inq.message !== inq.symptoms && (
                <div style={{
                  background: 'var(--bg-canvas, #F7EFE6)',
                  padding: '0.85rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.92rem',
                  lineHeight: '1.5',
                  color: 'var(--text-dark, #24222E)'
                }}>
                  {inq.message}
                </div>
              )}
              {inq.intentionsNote && inq.intentionsNote !== inq.message && (
                <div style={{ fontSize: '0.92rem', lineHeight: '1.5' }}>
                  <strong>Personal Intentions &amp; Note:</strong> {inq.intentionsNote}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={deleteTarget.length > 0}
        title={deleteTarget.length > 1 ? 'Delete selected inquiries?' : 'Delete this inquiry?'}
        message={deleteTarget.length > 1
          ? `This will permanently delete ${deleteTarget.length} consultation inquiries.`
          : 'This consultation inquiry will be permanently deleted.'}
        confirmLabel="Delete permanently"
        onCancel={() => setDeleteTarget([])}
        onConfirm={confirmDeleteSelected}
      />

      {/* Telegram Setup & Test Modal */}
      {telegramModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(18, 10, 22, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setTelegramModalOpen(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '18px',
              maxWidth: '560px',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              border: '1px solid rgba(0, 136, 204, 0.3)',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', borderBottom: '1px solid #ECECEC', paddingBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <span style={{ fontSize: '1.8rem' }}>📲</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1B2B3A', fontFamily: 'var(--font-display, serif)' }}>
                    Telegram Phone Alerts
                  </h3>
                  <span style={{ fontSize: '0.78rem', color: '#706375' }}>
                    Instant notification on your mobile phone for every new inquiry (100% Free)
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTelegramModalOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#888', padding: '0 0.25rem' }}
              >
                &times;
              </button>
            </div>

            {/* Quick 2-Step Guide */}
            <div style={{
              background: '#F0F8FF',
              border: '1px solid #BCE0FD',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '1.25rem',
              fontSize: '0.82rem',
              lineHeight: 1.55,
              color: '#1F3A52'
            }}>
              <strong style={{ display: 'block', color: '#0072B2', marginBottom: '0.45rem', fontSize: '0.88rem' }}>
                Setup Instructions:
              </strong>
              <div style={{ marginBottom: '0.45rem' }}>
                <strong>Step 1 (Bot Token):</strong> Telegram app me search karein <strong>@BotFather</strong>. Usse message karein <code>/newbot</code>, koi bhi naam choose karein (e.g. <em>Dr. Mayank Inquiries</em>), aur milne wala <strong>HTTP API Token</strong> copy karke niche paste karein.
              </div>
              <div>
                <strong>Step 2 (Chat ID):</strong> Telegram me search karein <strong>@userinfobot</strong> aur <em>Start</em> dabayein. Wo aapki numeric <strong>Id</strong> (jaise <code>987654321</code>) dikha dega. Fir apne naye banaye bot ko bhi Telegram me <strong>Start</strong> zaroor karein!
              </div>
            </div>

            {telegramStatus && (
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                marginBottom: '1rem',
                background: telegramStatus.type === 'success' ? '#D4EDDA' : '#F8D7DA',
                color: telegramStatus.type === 'success' ? '#155724' : '#721C24',
                border: `1px solid ${telegramStatus.type === 'success' ? '#C3E6CB' : '#F5C6CB'}`
              }}>
                {telegramStatus.text}
              </div>
            )}

            <form onSubmit={handleSaveTelegram} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem', color: '#333' }}>
                  Telegram Bot Token *
                </label>
                <input
                  type="text"
                  required={!telegramConfig.hasToken}
                  placeholder={telegramConfig.hasToken ? `Current: ${telegramConfig.maskedToken}` : 'e.g. 7123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ'}
                  value={telegramForm.botToken}
                  onChange={e => setTelegramForm(prev => ({ ...prev, botToken: e.target.value }))}
                  className={styles.input}
                  style={{ margin: 0, fontSize: '0.85rem', fontFamily: 'monospace' }}
                />
                {telegramConfig.hasToken && !telegramForm.botToken && (
                  <span style={{ fontSize: '0.72rem', color: '#28A745', display: 'block', marginTop: '0.25rem' }}>
                    ✓ Bot Token is already configured and active. Leave blank to keep existing.
                  </span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.35rem', color: '#333' }}>
                  Your Telegram Chat ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 123456789"
                  value={telegramForm.chatId}
                  onChange={e => setTelegramForm(prev => ({ ...prev, chatId: e.target.value }))}
                  className={styles.input}
                  style={{ margin: 0, fontSize: '0.85rem', fontFamily: 'monospace' }}
                />
                <span style={{ fontSize: '0.72rem', color: '#777', display: 'block', marginTop: '0.25rem' }}>
                  Aapka personal chat ID ya private group chat ID.
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                <input
                  type="checkbox"
                  id="telegramAlertsEnabled"
                  checked={telegramForm.enabled}
                  onChange={e => setTelegramForm(prev => ({ ...prev, enabled: e.target.checked }))}
                />
                <label htmlFor="telegramAlertsEnabled" style={{ fontSize: '0.85rem', cursor: 'pointer', fontWeight: 500 }}>
                  Enable Instant Phone Notifications on New Inquiries
                </label>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleTestTelegram}
                  disabled={isTestingTelegram || (!telegramForm.botToken && !telegramConfig.hasToken) || !telegramForm.chatId}
                  style={{
                    background: '#0088cc',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '0.55rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: (isTestingTelegram || (!telegramForm.botToken && !telegramConfig.hasToken) || !telegramForm.chatId) ? 'not-allowed' : 'pointer',
                    opacity: (isTestingTelegram || (!telegramForm.botToken && !telegramConfig.hasToken) || !telegramForm.chatId) ? 0.6 : 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                  title="Send a sample test message to your phone right now"
                >
                  {isTestingTelegram ? 'Sending Test...' : '📲 Send Test Alert to Phone'}
                </button>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setTelegramModalOpen(false)}
                    className={styles.secondaryBtn}
                    style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingTelegram}
                    className={styles.primaryBtn}
                    style={{ padding: '0.55rem 1.2rem', fontSize: '0.82rem' }}
                  >
                    {isSavingTelegram ? 'Saving...' : 'Save Settings ✓'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
