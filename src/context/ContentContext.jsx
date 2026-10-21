'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { defaultContentBundle } from '../data/defaultContent';
import { useLanguage } from './LanguageContext';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const { currentLang } = useLanguage();
  // Synchronous initialization with defaultContentBundle guarantees server HTML and client initial render match 100%
  const [bundle, setBundle] = useState(defaultContentBundle);
  const [loading, setLoading] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(0);

  // Fetch persistent content from /api/content on mount to sync runtime updates
  useEffect(() => {
    // Clear any stale localStorage cache from prior versions that caused hydration mismatches
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('dr_mayank_content_bundle_v2');
      }
    } catch (e) {
      // Ignore
    }

    let isMounted = true;
    async function loadContent() {
      try {
        const res = await fetch('/api/content');
        if (res.ok) {
          const remoteBundle = await res.json();
          if (remoteBundle && typeof remoteBundle === 'object' && isMounted) {
            setBundle(prev => ({
              ...prev,
              ...remoteBundle
            }));
            setLastUpdated(Date.now());
          }
        }
      } catch (err) {
        // Silently use the built-in defaultContentBundle
      } finally {
        if (isMounted) setInitialLoaded(true);
      }
    }
    loadContent();
    return () => { isMounted = false; };
  }, []);

  // Safe fallback resolution: active language -> English fallback
  const activeLangData = bundle[currentLang] || bundle['en'] || defaultContentBundle['en'];
  const englishFallback = bundle['en'] || defaultContentBundle['en'];

  /**
   * Helper function t(path, fallback)
   * e.g. t('nav.about', 'About')
   */
  const t = useCallback((path, fallback = '') => {
    if (!path) return fallback;
    const keys = path.split('.');

    const getValue = (obj) => {
      let current = obj;
      for (const k of keys) {
        if (!current || typeof current !== 'object') return undefined;
        current = current[k];
      }
      return current;
    };

    const val = getValue(activeLangData);
    if (val !== undefined && val !== null && val !== '') return val;

    const fallbackVal = getValue(englishFallback);
    if (fallbackVal !== undefined && fallbackVal !== null && fallbackVal !== '') return fallbackVal;

    return fallback || path;
  }, [activeLangData, englishFallback]);

  /**
   * Update content for a single language
   */
  const saveLanguageContent = useCallback(async (lang, updatedData, token) => {
    setLoading(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ lang, data: updatedData })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save content');
      }

      setBundle(prev => {
        const next = { ...prev, [lang]: updatedData };
        return next;
      });
      setLastUpdated(Date.now());
      return { success: true };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update content for all languages at once
   */
  const saveFullBundle = useCallback(async (newBundle, token) => {
    setLoading(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ fullBundle: newBundle })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to save bundle');
      }

      setBundle(newBundle);
      setLastUpdated(Date.now());
      return { success: true };
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ContentContext.Provider value={{
      content: activeLangData,
      fullBundle: bundle,
      t,
      loading,
      initialLoaded,
      lastUpdated,
      saveLanguageContent,
      saveFullBundle
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
