import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import styles from './LanguageSelector.module.css';

export default function LanguageSelector({ isMobile = false, onCloseMobileMenu }) {
  const { currentLang, supportedLanguages, switchLanguage } = useLanguage();
  const { t } = useContent();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    if (isMobile) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  // Focus active or first item when desktop dropdown opens
  useEffect(() => {
    if (dropdownOpen && dropdownRef.current) {
      const activeEl = dropdownRef.current.querySelector(`.${styles.dropdownItemActive}`) || dropdownRef.current.querySelector('button');
      activeEl?.focus();
    }
  }, [dropdownOpen]);

  const activeMeta = supportedLanguages.find(l => l.code === currentLang) || supportedLanguages[0];

  const handleSelect = (code) => {
    switchLanguage(code);
    setDropdownOpen(false);
    if (onCloseMobileMenu) onCloseMobileMenu();
  };

  const handleDropdownKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setDropdownOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!dropdownRef.current) return;
      const items = Array.from(dropdownRef.current.querySelectorAll('button'));
      const currIdx = items.indexOf(document.activeElement);
      const nextIdx = e.key === 'ArrowDown'
        ? (currIdx + 1) % items.length
        : (currIdx - 1 + items.length) % items.length;
      items[nextIdx]?.focus();
    }
  };

  const handleMobileGridKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const buttons = Array.from(e.currentTarget.querySelectorAll('button'));
      const currIdx = buttons.indexOf(document.activeElement);
      if (currIdx !== -1) {
        e.preventDefault();
        const nextIdx = e.key === 'ArrowRight'
          ? (currIdx + 1) % buttons.length
          : (currIdx - 1 + buttons.length) % buttons.length;
        buttons[nextIdx]?.focus();
      }
    }
  };

  // Mobile Version
  if (isMobile) {
    return (
      <div className={styles.mobileContainer}>
        <span className={styles.mobileLabel}>{t('nav.chooseLanguage', 'Language')}</span>
        <div 
          className={styles.mobileGrid} 
          role="radiogroup" 
          aria-label={t('nav.chooseLanguage', 'Language')}
          onKeyDown={handleMobileGridKeyDown}
        >
          {supportedLanguages.map((lang) => {
            const isActive = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                role="radio"
                aria-checked={isActive}
                className={`${styles.mobileLangBtn} ${isActive ? styles.mobileLangBtnActive : ''}`}
                onClick={() => handleSelect(lang.code)}
                aria-label={`Switch language to ${lang.name}`}
              >
                <span>{lang.flag}</span>
                <span>{lang.code.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop Dropdown
  return (
    <div className={styles.selectorContainer} ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.triggerBtn} ${dropdownOpen ? styles.triggerBtnOpen : ''}`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setDropdownOpen(true);
          }
        }}
        aria-label={`Select language. Currently ${activeMeta.name}`}
        aria-expanded={dropdownOpen}
        aria-haspopup="menu"
      >
        <svg 
          className={styles.globeIcon} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.75"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className={styles.activeCode}>{activeMeta.code.toUpperCase()}</span>
        <svg
          className={`${styles.chevron} ${dropdownOpen ? styles.chevronUp : ''}`}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="4 6 8 10 12 6" />
        </svg>
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            ref={dropdownRef}
            className={styles.dropdown}
            onKeyDown={handleDropdownKeyDown}
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            role="menu"
            aria-label="Languages"
          >
            {supportedLanguages.map((lang) => {
              const isActive = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  role="menuitem"
                  className={`${styles.dropdownItem} ${isActive ? styles.dropdownItemActive : ''}`}
                  onClick={() => handleSelect(lang.code)}
                >
                  <div className={styles.itemLeft}>
                    <span className={styles.flag}>{lang.flag}</span>
                    <span>{lang.native}</span>
                  </div>
                  {isActive && <span className={styles.itemDot} aria-hidden="true" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
