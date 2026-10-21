'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/admin/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'var(--bg-canvas, #F7EFE6)',
        color: 'var(--plum-primary, #52204F)',
        fontFamily: 'var(--font-display, serif)',
        fontSize: '1.5rem'
      }}>
        Verifying Sanctuary Admin...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
