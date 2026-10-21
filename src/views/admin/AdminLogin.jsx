import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import styles from '../../styles/admin.module.css';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(password);
    setLoading(false);

    if (res.success) {
      router.push('/admin/articles');
    } else {
      setError(res.error || 'Invalid password');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-canvas, #F7EFE6)',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '420px',
        width: '100%',
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        boxShadow: '0 20px 50px rgba(82, 32, 79, 0.12)',
        border: '1px solid rgba(200, 149, 74, 0.3)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display, serif)',
          fontSize: '1.85rem',
          color: 'var(--plum-primary, #52204F)',
          marginBottom: '0.35rem'
        }}>
          Sanctuary Administration
        </h2>
        <p style={{
          fontSize: '0.88rem',
          color: 'var(--text-muted, #4A4560)',
          marginBottom: '2rem'
        }}>
          Dr. Mayank Ahooja &middot; Content &amp; Media Management
        </p>

        {error && (
          <div className={styles.noticeError} style={{ textAlign: 'left' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Admin Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className={styles.input}
              autoFocus
              suppressHydrationWarning
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.saveBtn}
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            suppressHydrationWarning
          >
            {loading ? 'Authenticating...' : 'Enter Admin Panel →'}
          </button>
        </form>

        <div style={{ marginTop: '1.75rem', fontSize: '0.8rem', color: 'var(--text-light, #7B7590)' }}>
          Default secure access: <code>mayank@peace2026</code>
        </div>
      </div>
    </div>
  );
}
