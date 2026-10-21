import React, { useState, useRef } from 'react';
import ImageModal from '../common/ImageModal';
import ViewIcon from '../common/ViewIcon';
import { useContent } from '../../context/ContentContext';
import styles from './CategoryLoop.module.css';

export default function CategoryLoop({ category }) {
  const { t } = useContent();
  const [modalIndex, setModalIndex] = useState(null);
  const trackWrapperRef = useRef(null);

  if (!category) return null;

  const rawImages = category.images || [];
  const visibleImages = rawImages.filter(img => img.visible !== false);

  if (visibleImages.length === 0) return null;

  // Format images for ImageModal lightbox
  const modalItems = visibleImages.map(img => ({
    id: img.id,
    title: img.title || category.name,
    category: category.name,
    image: img.url,
    videoUrl: img.videoUrl || '',
    reflection: img.reflection || ''
  }));

  const handleCardClick = (item, index) => {
    if (item.videoUrl && item.videoUrl.trim()) {
      window.open(item.videoUrl.trim(), '_blank', 'noopener,noreferrer');
    } else {
      setModalIndex(index);
    }
  };

  const handleManualScroll = (direction) => {
    if (!trackWrapperRef.current) return;
    const scrollAmount = 340 * direction;
    trackWrapperRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleNext = () => {
    setModalIndex((prev) => (prev + 1) % modalItems.length);
  };

  const handlePrev = () => {
    setModalIndex((prev) => (prev - 1 + modalItems.length) % modalItems.length);
  };

  return (
    <div className={styles.loopContainer} aria-label={`${category.name} Sanctuary Loop`}>
      {/* Category Header */}
      <div className={styles.categoryHeader}>
        <div className={styles.categoryMeta}>
          <span className={styles.categoryTag}>{category.name}</span>
          <h3 className={styles.categoryTitle}>{category.name}</h3>
          {category.description && (
            <p className={styles.categoryDesc}>{category.description}</p>
          )}
        </div>

        {/* Manual Left/Right Controls */}
        <div className={styles.manualNav}>
          <button
            type="button"
            className={styles.navArrowBtn}
            onClick={() => handleManualScroll(-1)}
            aria-label={`Scroll ${category.name} previous`}
          >
            ‹
          </button>
          <button
            type="button"
            className={styles.navArrowBtn}
            onClick={() => handleManualScroll(1)}
            aria-label={`Scroll ${category.name} next`}
          >
            ›
          </button>
        </div>
      </div>

      {/* Horizontal track containing each real image exactly once */}
      <div className={styles.trackWrapper} ref={trackWrapperRef}>
        <div className={styles.track}>
          {visibleImages.map((item, originalIndex) => (
            <div
              key={item.id || `${category.id}-${originalIndex}`}
              className={styles.loopCard}
              onClick={() => handleCardClick(item, originalIndex)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(item, originalIndex); }}
              aria-label={item.videoUrl ? `Watch ${item.title || category.name} on YouTube` : `View ${item.title || category.name}`}
            >
              <div className={styles.imageWrap}>
                <img
                  src={item.url}
                  alt={item.title || category.name}
                  className={styles.photo}
                  loading="lazy"
                />
                <div className={styles.overlay}>
                  <div className={styles.overlayPrompt}>
                    <span 
                      className={styles.viewIconBadge}
                      style={item.videoUrl ? { background: 'rgba(204, 0, 0, 0.15)', color: '#C4302B', borderColor: 'rgba(204, 0, 0, 0.4)' } : undefined}
                    >
                      {item.videoUrl ? '▶' : <ViewIcon size={13} />}
                    </span>
                    <span className={styles.viewText}>
                      {item.videoUrl ? 'Watch on YouTube ↗' : t('gallery.viewMoment', 'View Moment')}
                    </span>
                  </div>
                </div>
                {item.videoUrl && (
                  <span className={styles.badgeVideo}>
                    ▶ YouTube
                  </span>
                )}
              </div>

              <div className={styles.captionRow}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <h4 className={styles.cardTitle}>{item.title || category.name}</h4>
                  {item.videoUrl && (
                    <span style={{ fontSize: '0.7rem', color: '#C4302B', fontWeight: 600, flexShrink: 0 }}>
                      ▶ Video ↗
                    </span>
                  )}
                </div>
                {item.reflection && (
                  <p className={styles.cardReflection}>
                    &ldquo;{item.reflection}&rdquo;
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Scoped to this Category */}
      <ImageModal
        isOpen={modalIndex !== null}
        onClose={() => setModalIndex(null)}
        items={modalItems}
        currentIndex={modalIndex !== null ? modalIndex : 0}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
