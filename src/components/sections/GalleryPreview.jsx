import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';
import { fadeUp } from '../../lib/motion';
import CategoryLoop from './CategoryLoop';
import styles from './Gallery.module.css';
import pageStyles from '../../styles/page.module.css';

export default function GalleryPreview() {
  const { content, t } = useContent();
  const { currentLang } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.05, once: true });

  const galleryData = content?.gallery || {};
  const rawCategories = galleryData.categories || [];
  const allCategories = rawCategories.map((c, idx) => {
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
  });

  // Filter to categories that have at least one visible image and are configured for home
  const activeCategories = allCategories.filter(cat => {
    if (cat.visible === false || cat.showOnHomepage === false) return false;
    const images = cat.images || [];
    return images.some(img => img.visible !== false);
  });

  return (
    <section id="gallery" className={styles.section} aria-label="Sanctuary Moments Gallery Preview">
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

        {/* Independent Continuous Loops per Category */}
        {activeCategories.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>
              {galleryData.empty || t('gallery.empty', 'Sanctuary imagery is currently being curated.')}
            </p>
          </div>
        ) : (
          <div className={styles.categoriesLoopContainer}>
            {activeCategories.map((cat) => (
              <CategoryLoop key={cat.id} category={cat} />
            ))}
          </div>
        )}

        {/* Clear CTA to Dedicated Gallery Page */}
        <div className={styles.ctaWrapper}>
          <Link to={`/${currentLang}/gallery`} className={pageStyles.ctaBtn}>
            <span>{t('gallery.viewComplete', 'Explore Complete Sanctuary Gallery')}</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
