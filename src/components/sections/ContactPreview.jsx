import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';
import { fadeUp } from '../../lib/motion';
import styles from './Contact.module.css';

export default function ContactPreview({ onOpenConsultation }) {
  const { content, t } = useContent();
  const { currentLang } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.15, once: true });

  const contactData = content?.contact || {};

  return (
    <section id="contact" className={styles.section} aria-label="Contact and Sanctuary Overview">
      <div className={styles.container} ref={ref}>
        <div className={styles.card}>
          <motion.div
            className={styles.content}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <span className={styles.tag}>{contactData.tag || 'SANCTUARY & BOOKING'}</span>
            <h2 className={styles.headline}>{t('contact.beginJourney', 'Begin Your Journey Toward Inner Harmony')}</h2>
            <p className={styles.subhead}>
              {contactData.subhead || 'Book your personalized consultation or reach out with any questions.'}
            </p>

            <div className={styles.ctaRow}>
              <Link to={`/${currentLang}/contact`} className={styles.primaryCta} style={{ textDecoration: 'none' }}>
                <span>{t('contact.contactDrMayank', 'Contact Dr. Mayank Ahooja')}</span>
                <span>&rarr;</span>
              </Link>
              <button
                type="button"
                className={styles.secondaryLink}
                onClick={onOpenConsultation}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <span>{t('nav.cta', 'Book a Session')}</span>
                <span>&rarr;</span>
              </button>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>{contactData.locationLabel || t('contact.locationLabel', 'Sanctuary Location')}</span>
                <span className={styles.detailValue}>{contactData.location || 'Chișinău, Republic of Moldova & Virtual'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>{contactData.hoursLabel || t('contact.hoursLabel', 'Consultations')}</span>
                <span className={styles.detailValue}>{contactData.hours || 'By appointment only • Monday – Saturday'}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
