import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';
import { fadeUp } from '../../lib/motion';
import styles from './Faq.module.css';
import pageStyles from '../../styles/page.module.css';

export default function FaqPreview() {
  const { content, t } = useContent();
  const { currentLang } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.15, once: true });
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = content?.faq || {};
  const items = (faqData.items || []).slice(0, 4);

  const toggleIndex = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className={styles.section} aria-label="Frequently Asked Questions Preview">
      <div className={styles.container} ref={ref}>
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className={styles.tag}>{faqData.tag || 'FREQUENTLY ASKED QUESTIONS'}</span>
          <h2 className={styles.headline}>{faqData.headline || 'Key Inquiries & Clarifications'}</h2>
        </motion.div>

        <div className={styles.accordion}>
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={item.q || idx} className={styles.item}>
                <button
                  type="button"
                  className={styles.questionBtn}
                  onClick={() => toggleIndex(idx)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{item.q}</span>
                  <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`}>
                    +
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className={styles.answerWrapper}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className={styles.answerText}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Clear CTA to Dedicated FAQ Page */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to={`/${currentLang}/faq`} className={pageStyles.ctaBtn}>
            <span>{t('faq.viewComplete', 'View Complete FAQ')}</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
