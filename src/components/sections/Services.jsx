import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';
import { fadeUp, stagger } from '../../lib/motion';
import styles from './Services.module.css';

export default function Services({ onOpenConsultation }) {
  const { content, t } = useContent();
  const { currentLang } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1, once: true });

  const servicesData = content?.services || {};
  const allServices = (servicesData.items || []).filter(s => s.visible !== false);

  return (
    <section id="services" className={styles.section} aria-label="Services and Practices">
      <div className={styles.container} ref={ref}>
        
        {/* Header */}
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className={styles.tag}>{servicesData.tag || 'SERVICES & OFFERINGS'}</span>
          <h2 className={styles.headline}>{servicesData.headline || 'Paths to Your Natural Balance'}</h2>
          <p className={styles.subhead}>
            {servicesData.subhead || 'Thoughtfully structured wellness sessions combining meditation wisdom, energy balance, and mindful self-awareness.'}
          </p>
        </motion.div>

        {/* Clean Editorial Wellness Services Grid */}
        <motion.div
          className={styles.grid}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {allServices.map((service) => (
            <motion.article
              key={service.id}
              variants={fadeUp}
              className={styles.card}
            >
              <div className={styles.cardMain}>
                <div className={styles.contentCol}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  {service.subtitle && (
                    <div className={styles.cardSubtitle}>{service.subtitle}</div>
                  )}
                  <p className={styles.cardDesc}>{service.shortDesc || service.desc}</p>

                  {/* Focus Areas Chips */}
                  {service.focusAreas && (
                    <div className={styles.focusPillsRow}>
                      {service.focusAreas.slice(0, 3).map((f, idx) => (
                        <span key={idx} className={styles.focusPill}>{f}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Visual Arch Thumbnail */}
                <div className={styles.visualCol}>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className={styles.cardImg}
                    loading="lazy"
                  />
                </div>
              </div>

              <div className={styles.cardDivider} />

              <div className={styles.cardBottom}>
                <span className={styles.formatTag}>{service.format}</span>
                <div className={styles.cardActions}>
                  <Link 
                    to={`/${currentLang}/services/${service.id}`} 
                    className={styles.serviceDetailLink}
                  >
                    <span>{t('services.exploreModality', 'Learn More')}</span>
                    <span>&rarr;</span>
                  </Link>
                  <button
                    type="button"
                    className={styles.inquireBtn}
                    onClick={onOpenConsultation}
                  >
                    <span>{t('nav.cta', 'Book a Session')}</span>
                    <span className={styles.btnArrow}>&rarr;</span>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Section Footer Link to All Services */}
        <div style={{ textAlign: 'center', marginTop: '2.8rem' }}>
          <Link to={`/${currentLang}/services`} className={styles.exploreAllBtn}>
            <span>{t('services.exploreAll', 'Explore All Services')}</span>
            <span>&rarr;</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
