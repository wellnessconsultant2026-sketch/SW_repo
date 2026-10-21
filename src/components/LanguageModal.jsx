import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import styles from './LanguageModal.module.css';

export default function LanguageModal() {
  const { showFirstVisitModal, supportedLanguages, currentLang, confirmLanguageSelection } = useLanguage();
  const { t } = useContent();
  const [selected, setSelected] = useState(currentLang);
  const modalRef = useRef(null);

  // Sync selected with currentLang initially
  useEffect(() => {
    setSelected(currentLang);
  }, [currentLang]);

  // Trap focus and support Escape key
  useEffect(() => {
    if (!showFirstVisitModal) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        confirmLanguageSelection(selected);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showFirstVisitModal, selected, confirmLanguageSelection]);

  if (!showFirstVisitModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={styles.modal}
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lang-modal-title"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.topGlow} />

          <div className={styles.iconWrap}>
            <svg className={styles.globeSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>

          <h2 id="lang-modal-title" className={styles.title}>
            {t('languageModal.title', 'Choose Your Language')}
          </h2>
          <p className={styles.subtitle}>
            {t('languageModal.subtitle', 'Select your preferred language to experience our sanctuary')}
          </p>

          <div className={styles.langList} role="radiogroup" aria-label="Available languages">
            {supportedLanguages.map((lang) => {
              const isSelected = selected === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  className={`${styles.langOption} ${isSelected ? styles.langOptionActive : ''}`}
                  onClick={() => setSelected(lang.code)}
                >
                  <div className={styles.langLeft}>
                    <span className={styles.flag}>{lang.flag}</span>
                    <div className={styles.names}>
                      <span className={styles.nativeName}>{lang.native}</span>
                      <span className={styles.englishName}>{lang.name}</span>
                    </div>
                  </div>
                  {isSelected && <span className={styles.checkMark} aria-hidden="true">✓</span>}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className={styles.confirmBtn}
            onClick={() => confirmLanguageSelection(selected)}
          >
            {t('languageModal.confirm', 'Continue')} &rarr;
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
