import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { useInView } from '../../hooks/useInView';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { fadeUp, stagger } from '../../lib/motion';
import styles from './Articles.module.css';

export default function Articles({ onOpenConsultation }) {
  const { content, t } = useContent();
  const { currentLang } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1, once: true });

  const articlesData = content?.articles || {};
  const items = (articlesData.items || []).filter(a => a.visible !== false);

  if (items.length === 0) return null;

  return (
    <section id="articles" className={styles.section} aria-label="Wisdom and Insights">
      <div className={styles.container} ref={ref}>
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className={styles.tag}>{articlesData.tag || 'INSIGHTS & ESSAYS'}</span>
          <h2 className={styles.headline}>{articlesData.headline || 'Wisdom for Inner Harmony'}</h2>
          <p className={styles.subhead}>
            {articlesData.subhead || 'Reflections on meditation science, energetic balance, and daily conscious living.'}
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {items.map((art) => (
            <motion.article
              key={art.id}
              className={styles.card}
              variants={fadeUp}
            >
              <div className={styles.cardContent}>
                <div className={styles.metaRow}>
                  <span className={styles.category}>{art.category}</span>
                </div>
                <h3 className={styles.title}>{art.title}</h3>
                <p className={styles.excerpt}>{art.excerpt}</p>
              </div>

              <Link
                to={`/${currentLang}/articles/${art.id}`}
                className={styles.readMoreBtn}
                style={{ textDecoration: 'none' }}
              >
                <span>{articlesData.readMore || 'Read Article'}</span>
                <span>&rarr;</span>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
