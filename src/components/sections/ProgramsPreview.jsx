import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';
import { fadeUp, stagger } from '../../lib/motion';
import styles from './Programs.module.css';
import pageStyles from '../../styles/page.module.css';

export default function ProgramsPreview({ onOpenConsultation }) {
  const { content, t } = useContent();
  const { currentLang } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1, once: true });

  const programsData = content?.programs || {};
  const items = (programsData.items || []).filter(p => p.visible !== false).slice(0, 3);

  if (items.length === 0) return null;

  return (
    <section id="programs" className={styles.section} aria-label="Guided Programs and Workshops Preview">
      <div className={styles.container} ref={ref}>
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className={styles.tag}>{programsData.tag || 'WORKSHOPS & IMMERSIONS'}</span>
          <h2 className={styles.headline}>{programsData.headline || 'Guided Programs & Workshops'}</h2>
          <p className={styles.subhead}>
            {programsData.subhead || 'Deep-dive cohort journeys in meditation, breathwork, and chakra alignment.'}
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {items.map((item) => (
            <motion.article
              key={item.id}
              className={styles.card}
              variants={fadeUp}
            >
              <div>
                <div className={styles.topRow}>
                  <span className={styles.typeBadge}>{item.type}</span>
                  {item.pillar && <span className={styles.pillarBadge}>{item.pillar}</span>}
                </div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.desc}>{item.desc}</p>
              </div>

              <button
                type="button"
                className={styles.inquireBtn}
                onClick={onOpenConsultation}
              >
                <span>{programsData.inquire || t('nav.cta', 'Inquire About Next Cohort')}</span>
                <span>&rarr;</span>
              </button>
            </motion.article>
          ))}
        </motion.div>

        {/* Clear CTA to Dedicated Programs Page */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to={`/${currentLang}/programs`} className={pageStyles.ctaBtn}>
            <span>{t('programs.viewAll', 'View All Programs & Workshops')}</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
