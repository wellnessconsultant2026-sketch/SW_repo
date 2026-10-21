import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';
import { fadeUp } from '../../lib/motion';
import pageStyles from '../../styles/page.module.css';
import styles from './WellnessPreview.module.css';

export default function WellnessPreview() {
  const { content, t } = useContent();
  const { currentLang } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1, once: true });

  const pillars = (content?.pillars || []).filter(p => p.id !== 'all');

  return (
    <section id="wellness" className={styles.section} aria-label="Our Wellness Approach Overview">
      <div className={styles.container} ref={ref}>
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className={pageStyles.tag}>{t('wellness.tag', 'OUR WELLNESS APPROACH')}</span>
          <h2 className={styles.headline}>{t('wellness.previewTitle', 'A Holistic Approach to Inner Harmony')}</h2>
          <p className={styles.subhead}>
            {t('wellness.previewSubhead', 'Integrating thoughtful understanding with meditative stillness across five foundational dimensions of human well-being.')}
          </p>
          <div className={styles.pillarsKeywords}>
            MIND &bull; EMOTIONS &bull; ENERGY &bull; BODY &bull; INNER GROWTH
          </div>
        </motion.div>

        {/* 5 Pillars Summary Cards */}
        <div className={styles.pillarsGrid}>
          {pillars.map((pillar, idx) => (
            <div key={pillar.id} className={styles.pillarMiniCard}>
              <span className={styles.pillarNumber}>{String(idx + 1).padStart(2, '0')}</span>
              <h3 className={styles.pillarTitle}>{pillar.name}</h3>
              <p className={styles.pillarSummary}>
                {(pillar.subcategories || []).slice(0, 3).join(' • ')}
              </p>
            </div>
          ))}
        </div>

        {/* Clear CTA to Dedicated Wellness Page */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to={`/${currentLang}/wellness`} className={pageStyles.ctaBtn}>
            <span>{t('wellness.exploreCta', 'Explore Wellness Approach')}</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
