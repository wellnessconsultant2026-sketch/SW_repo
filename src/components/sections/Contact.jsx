import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { useInView } from '../../hooks/useInView';
import { fadeUp } from '../../lib/motion';
import styles from './Contact.module.css';

export default function Contact({ onOpenConsultation }) {
  const { content, t } = useContent();
  const [ref, inView] = useInView({ threshold: 0.15, once: true });

  const contactData = content?.contact || {};

  return (
    <section id="contact" className={styles.section} aria-label="Contact and Sanctuary">
      <div className={styles.container} ref={ref}>
        <div className={styles.card}>
          <motion.div
            className={styles.content}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <span className={styles.tag}>{contactData.tag || 'SANCTUARY & BOOKING'}</span>
            <h2 className={styles.headline}>{contactData.headline || 'Take the First Step Toward Inner Harmony'}</h2>
            <p className={styles.subhead}>{contactData.subhead || 'Book your personalized consultation or reach out with any questions.'}</p>

            <div className={styles.ctaRow}>
              <button
                type="button"
                className={styles.primaryCta}
                onClick={onOpenConsultation}
              >
                {contactData.cta || t('nav.cta', 'Book a Session')}
              </button>
              {contactData.directEmail && (
                <a
                  href={`mailto:${contactData.directEmail}`}
                  className={styles.secondaryLink}
                >
                  {(contactData.orEmail || t('contact.orEmail', 'Or email'))} {contactData.directEmail}
                </a>
              )}
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
