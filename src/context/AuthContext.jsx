'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const COOKIE_AUTH_MARKER = 'cookie';

// Session-level memory cache to eliminate redundant auth check latency
let cachedAuthState = null; // { token: string | null, isAuthenticated: boolean }

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => cachedAuthState?.token ?? null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => cachedAuthState?.isAuthenticated ?? false);
  const [loading, setLoading] = useState(() => cachedAuthState === null);

  useEffect(() => {
    // If already verified in this session, skip network request entirely
    if (cachedAuthState !== null) {
      setLoading(false);
      return;
    }

    async function verify() {
      try {
        const res = await fetch('/api/auth/check', { credentials: 'same-origin' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.authenticated) {
            cachedAuthState = { token: COOKIE_AUTH_MARKER, isAuthenticated: true };
            setToken(COOKIE_AUTH_MARKER);
            setIsAuthenticated(true);
          } else {
            cachedAuthState = { token: null, isAuthenticated: false };
            setToken(null);
            setIsAuthenticated(false);
          }
        } else {
          cachedAuthState = { token: null, isAuthenticated: false };
          setToken(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        cachedAuthState = { token: null, isAuthenticated: false };
        setToken(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }
    verify();
  }, []);

  const login = async (password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (res.ok && data.authenticated) {
        cachedAuthState = { token: COOKIE_AUTH_MARKER, isAuthenticated: true };
        setToken(COOKIE_AUTH_MARKER);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, error: data.error || 'Invalid password' };
    } catch (err) {
      return { success: false, error: 'Connection error during login' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    } catch (err) {
      // Clear the local auth state even if the server is unreachable.
    }
    cachedAuthState = { token: null, isAuthenticated: false };
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      token,
      isAuthenticated,
      loading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
