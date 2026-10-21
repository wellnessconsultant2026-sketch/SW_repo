import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { useInView } from '../../hooks/useInView';
import { fadeUp, stagger } from '../../lib/motion';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const { content } = useContent();
  const [ref, inView] = useInView({ threshold: 0.15, once: true });

  const testimonialData = content?.testimonials || {};
  const items = testimonialData.items || [];

  return (
    <section id="stories" className={styles.section} aria-label="Client Testimonials">
      <div id="testimonials" style={{ position: 'relative', top: '-80px', visibility: 'hidden', height: 0 }} />
      <div className={styles.container} ref={ref}>
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className={styles.tag}>{testimonialData.tag || 'CLIENT REFLECTIONS'}</span>
          <h2 className={styles.headline}>{testimonialData.headline || 'Words from Those Who Found Harmony'}</h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {items.map((item, idx) => (
            <motion.div key={item.author || idx} variants={fadeUp} className={styles.card}>
              <div className={styles.starsRow}>
                {'★★★★★'.split('').map((star, i) => (
                  <span key={i} className={styles.star}>★</span>
                ))}
              </div>

              <blockquote className={styles.quote}>
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className={styles.authorMeta}>
                <span className={styles.authorName}>{item.author}</span>
                <span className={styles.authorContext}>{item.context}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
