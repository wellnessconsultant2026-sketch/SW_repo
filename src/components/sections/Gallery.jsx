import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { useInView } from '../../hooks/useInView';
import { fadeUp, stagger } from '../../lib/motion';
import ImageModal from '../common/ImageModal';
import ViewIcon from '../common/ViewIcon';
import styles from './Gallery.module.css';

export default function Gallery() {
  const { content, t } = useContent();
  const [ref, inView] = useInView({ threshold: 0.05, once: true });
  const [activeCategoryId, setActiveCategoryId] = useState('ALL');
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  const galleryData = content?.gallery || {};
  const rawCategories = galleryData.categories || [];
  const categories = rawCategories.map((c, idx) => {
    if (typeof c === 'string') {
      const slug = c.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return {
        id: `cat_${slug}`,
        name: c,
        slug,
        description: '',
        order: idx + 1,
        visible: true,
        showOnHomepage: true,
        images: []
      };
    }
    return c;
  }).filter(c => c.visible !== false);

  // Collect all visible images across active categories
  const allImages = [];
  categories.forEach(cat => {
    (cat.images || []).forEach(img => {
      if (img.visible !== false) {
        allImages.push({
          id: img.id,
          url: img.url,
          image: img.url,
          title: img.title || cat.name,
          category: cat.name,
          categoryId: cat.id,
          videoUrl: img.videoUrl || '',
          reflection: img.reflection || ''
        });
      }
    });
  });

  // Calculate filtered images for active tab
  const filteredImages = activeCategoryId === 'ALL'
    ? allImages
    : allImages.filter(img => img.categoryId === activeCategoryId);

  const handleCategoryChange = (catId) => {
    setActiveCategoryId(catId);
    setActivePhotoIndex(null);
  };

  const handleCardClick = (item, idx) => {
    if (item.videoUrl && item.videoUrl.trim()) {
      window.open(item.videoUrl.trim(), '_blank', 'noopener,noreferrer');
    } else {
      setActivePhotoIndex(idx);
    }
  };

  const handleNext = () => {
    setActivePhotoIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    setActivePhotoIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section id="gallery" className={styles.section} aria-label="Sanctuary Moments Gallery">
      <div className={styles.container} ref={ref}>
        
        {/* Header */}
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className={styles.tag}>{galleryData.tag || 'SANCTUARY MOMENTS'}</span>
          <h2 className={styles.headline}>{galleryData.headline || 'Visual Journey of Stillness'}</h2>
          <p className={styles.subhead}>
            {galleryData.subhead || 'A glimpse into one-on-one sessions, meditation retreats, and sacred sanctuary spaces.'}
          </p>
        </motion.div>

        {/* Dynamic Category Filters with Count Badges */}
        {categories.length > 0 && (
          <div className={styles.filterBar} role="tablist" aria-label="Filter gallery by category">
            <button
              type="button"
              role="tab"
              aria-selected={activeCategoryId === 'ALL'}
              className={`${styles.filterBtn} ${activeCategoryId === 'ALL' ? styles.filterBtnActive : ''}`}
              onClick={() => handleCategoryChange('ALL')}
            >
              <span>{galleryData.all || 'All Moments'}</span>
              <span className={styles.filterCountBadge}>{allImages.length}</span>
            </button>

            {categories.map((cat) => {
              const catImagesCount = (cat.images || []).filter(i => i.visible !== false).length;
              const isSelected = activeCategoryId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`${styles.filterBtn} ${isSelected ? styles.filterBtnActive : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <span>{cat.name}</span>
                  <span className={styles.filterCountBadge}>{catImagesCount}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Photo Grid */}
        {filteredImages.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>
              {galleryData.empty || t('gallery.empty', 'No photos currently uploaded in this sanctuary collection.')}
            </p>
          </div>
        ) : (
          <motion.div
            className={styles.grid}
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            key={activeCategoryId}
          >
            <AnimatePresence>
              {filteredImages.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  className={styles.photoCard}
                  variants={fadeUp}
                  layout
                  onClick={() => handleCardClick(item, idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(item, idx); }}
                  aria-label={item.videoUrl ? `Watch ${item.title} on YouTube` : `View ${item.title}`}
                >
                  <div className={styles.imageWrapper}>
                    <img 
                      src={item.image || item.url} 
                      alt={item.title || 'Sanctuary Moment'} 
                      className={styles.photoImg}
                      loading="lazy"
                    />
                    <div className={styles.overlay}>
                      <div className={styles.overlayPrompt}>
                        <span 
                          className={styles.viewIconBadge}
                          style={item.videoUrl ? { background: 'rgba(204, 0, 0, 0.15)', color: '#C4302B', borderColor: 'rgba(204, 0, 0, 0.4)' } : undefined}
                        >
                          {item.videoUrl ? '▶' : <ViewIcon size={14} />}
                        </span>
                        <span className={styles.viewText}>
                          {item.videoUrl ? 'Watch on YouTube ↗' : (galleryData.viewMoment || t('gallery.viewMoment', 'View Moment'))}
                        </span>
                      </div>
                    </div>
                    {item.category && (
                      <span className={styles.badgeCategory}>
                        {item.category}
                      </span>
                    )}
                    {item.videoUrl && (
                      <span className={styles.badgeVideo}>
                        ▶ YouTube
                      </span>
                    )}
                  </div>
                  <div className={styles.captionRow}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <h3 className={styles.captionTitle}>{item.title}</h3>
                      {item.videoUrl && (
                        <span style={{ fontSize: '0.72rem', color: '#C4302B', fontWeight: 600, flexShrink: 0 }}>
                          ▶ Video ↗
                        </span>
                      )}
                    </div>
                    {item.reflection && (
                      <p className={styles.captionReflection}>
                        &ldquo;{item.reflection}&rdquo;
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      {/* Lightbox Modal */}
      <ImageModal
        isOpen={activePhotoIndex !== null}
        onClose={() => setActivePhotoIndex(null)}
        items={filteredImages}
        currentIndex={activePhotoIndex !== null ? activePhotoIndex : 0}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
