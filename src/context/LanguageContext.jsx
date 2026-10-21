'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../data/defaultContent';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'dr_mayank_lang_pref';

export function LanguageProvider({ children, initialLang = DEFAULT_LANGUAGE }) {
  const pathname = usePathname() || '/';
  const router = useRouter();

  // Extract language from URL path: /[lang]/...
  const pathParts = pathname.split('/').filter(Boolean);
  const pathLangCandidate = pathParts[0]?.toLowerCase();
  const isPathLangValid = SUPPORTED_LANGUAGES.some(l => l.code === pathLangCandidate);

  const [currentLang, setCurrentLang] = useState(() => {
    if (isPathLangValid) return pathLangCandidate;
    return initialLang || DEFAULT_LANGUAGE;
  });

  const [showFirstVisitModal, setShowFirstVisitModal] = useState(false);

  // Check first-visit on mount
  useEffect(() => {
    const hasVisited = localStorage.getItem(STORAGE_KEY);
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setShowFirstVisitModal(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  // Sync state with URL changes
  useEffect(() => {
    if (isPathLangValid && pathLangCandidate !== currentLang) {
      setCurrentLang(pathLangCandidate);
    }
  }, [pathname, isPathLangValid, pathLangCandidate, currentLang]);

  // Update HTML lang attribute
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLang;
    }
  }, [currentLang]);

  /**
   * Switch active language while preserving the active page/route.
   * e.g. /en/services -> /ru/services
   */
  const switchLanguage = useCallback((newLang) => {
    if (!SUPPORTED_LANGUAGES.some(l => l.code === newLang)) return;

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLang);
    }
    setCurrentLang(newLang);

    const parts = pathname.split('/').filter(Boolean);
    let newPath;

    if (parts.length > 0 && SUPPORTED_LANGUAGES.some(l => l.code === parts[0].toLowerCase())) {
      parts[0] = newLang;
      newPath = '/' + parts.join('/');
    } else {
      newPath = '/' + newLang + (pathname.startsWith('/') ? pathname : '/' + pathname);
    }

    router.replace(newPath);
  }, [pathname, router]);

  /**
   * Handle first-visit language selection confirmation
   */
  const confirmLanguageSelection = useCallback((selectedLang) => {
    setShowFirstVisitModal(false);
    switchLanguage(selectedLang);
  }, [switchLanguage]);

  return (
    <LanguageContext.Provider value={{
      currentLang,
      supportedLanguages: SUPPORTED_LANGUAGES,
      switchLanguage,
      showFirstVisitModal,
      setShowFirstVisitModal,
      confirmLanguageSelection
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
