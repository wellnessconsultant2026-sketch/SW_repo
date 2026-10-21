import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ImageModal.module.css';

export default function ImageModal({
  isOpen,
  onClose,
  src,
  alt,
  title,
  category,
  reflection,
  pdfUrl,
  items = [],
  currentIndex = 0,
  onNext,
  onPrev
}) {
  const touchStartX = useRef(0);

  const hasItems = Array.isArray(items) && items.length > 0;
  const numIndex = Number.isInteger(currentIndex) ? currentIndex : 0;
  const safeIndex = hasItems ? Math.max(0, Math.min(numIndex, items.length - 1)) : 0;
  const currentItem = hasItems ? items[safeIndex] : null;
  const hasMultiple = hasItems && items.length > 1;

  const displaySrc = currentItem?.image || currentItem?.url || currentItem?.src || src || '';
  const displayTitle = currentItem?.title || title || alt || currentItem?.alt || 'Sanctuary View';
  const displayCategory = currentItem?.category || category;
  const displayReflection = currentItem?.reflection || reflection;
  const displayVideoUrl = currentItem?.videoUrl;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (hasMultiple && onPrev && (e.key === 'ArrowLeft' || e.key === 'Left')) onPrev();
      if (hasMultiple && onNext && (e.key === 'ArrowRight' || e.key === 'Right')) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, hasMultiple, onNext, onPrev]);

  if (!isOpen) return null;

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && onNext) onNext();
      else if (diff < 0 && onPrev) onPrev();
    }
  };

  return (
    <AnimatePresence>
      <div 
        className={styles.backdrop}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={displayTitle}
      >
        <motion.div
          className={styles.modalContainer}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Header */}
          <div className={styles.modalHeader}>
            <div className={styles.titleGroup}>
              <h4 className={styles.modalTitle}>{displayTitle}</h4>
              {displayCategory && (
                <span className={styles.categoryTag}>{displayCategory}</span>
              )}
              {hasMultiple && (
                <span className={styles.counterBadge}>
                  {safeIndex + 1} / {items.length}
                </span>
              )}
            </div>

            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          {/* Body */}
          <div className={styles.imageArea}>
            {pdfUrl ? (
              <iframe 
                src={pdfUrl} 
                title={displayTitle} 
                style={{ width: '85vw', height: '70vh', border: 'none' }}
              />
            ) : displaySrc ? (
              <AnimatePresence mode="wait">
                <motion.img 
                  key={displaySrc}
                  src={displaySrc} 
                  alt={displayTitle} 
                  className={styles.mainImage}
                  initial={{ opacity: 0.4, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.4, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  loading="eager"
                  onError={(e) => {
                    console.warn('Image failed to load in modal:', displaySrc);
                  }}
                />
              </AnimatePresence>
            ) : (
              <div style={{ color: 'var(--gold-light, #DFC298)', padding: '3rem', textAlign: 'center' }}>
                <p style={{ margin: 0, fontStyle: 'italic', fontSize: '0.95rem' }}>Image preview unavailable</p>
              </div>
            )}

            {/* Navigation Arrows */}
            {hasMultiple && onPrev && (
              <button
                type="button"
                className={`${styles.navBtn} ${styles.prevBtn}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                aria-label="Previous image"
              >
                ‹
              </button>
            )}

            {hasMultiple && onNext && (
              <button
                type="button"
                className={`${styles.navBtn} ${styles.nextBtn}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                aria-label="Next image"
              >
                ›
              </button>
            )}
          </div>

          {/* Footer / Reflection & Video Link */}
          {(displayReflection || displayVideoUrl) && (
            <div className={styles.modalFooter} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ flex: 1, minWidth: '240px' }}>
                {displayReflection && (
                  <p className={styles.reflection} style={{ margin: 0 }}>
                    "{displayReflection}"
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                {displayVideoUrl && (
                  <a
                    href={displayVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '9999px',
                      background: '#C4302B',
                      color: '#FFFFFF',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      boxShadow: '0 2px 8px rgba(196, 48, 43, 0.35)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    ▶ Watch on YouTube ↗
                  </a>
                )}
                <span style={{ fontSize: '0.75rem', color: 'var(--gold-dark)', whiteSpace: 'nowrap' }}>
                  Dr. Mayank Ahooja Sanctuary
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
