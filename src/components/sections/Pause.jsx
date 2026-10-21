import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import styles from './Pause.module.css';

const BreathIcon = () => (
  <svg 
    className={styles.breathIcon} 
    viewBox="0 0 32 46" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="16" cy="16" r="14" stroke="#C8954A" strokeWidth="1.2" strokeOpacity="0.85" />
    <circle cx="16" cy="16" r="6.5" stroke="#C8954A" strokeWidth="1" strokeOpacity="0.4" />
    <circle cx="16" cy="16" r="2.5" fill="#C8954A" />
    <line x1="16" y1="30" x2="16" y2="42" stroke="#C8954A" strokeWidth="1.2" strokeDasharray="2 2" />
    <circle cx="16" cy="42" r="1.5" fill="#C8954A" />
  </svg>
);

const Pause = () => {
  const { content } = useContent();
  const pauseData = content?.pause || {};

  return (
    <section className={styles.pauseSection} aria-label={pauseData.eyebrow || "A Pause. A Breath. A Return."}>
      {/* Pristine 2K Ultra-sharp Zen Lake Background Image */}
      <div className={styles.bgWrapper}>
        <picture>
          <source srcSet="/pause-zen-bg.webp" type="image/webp" />
          <img 
            src="/pause-zen-bg.jpg" 
            alt="Calm reflective mountain lake with morning sun and zen pebble" 
            className={styles.bgImage}
          />
        </picture>
      </div>

      {/* Razor-sharp Typography & Interactive Elements */}
      <div className={styles.content}>
        <motion.div
          className={styles.eyebrowGroup}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={styles.eyebrow}>{pauseData.eyebrow || 'A PAUSE. A BREATH. A RETURN.'}</p>
          <div className={styles.decorativeLine}>
            <span className={styles.line} />
          </div>
        </motion.div>

        <motion.h2 
          className={styles.quote}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.quoteLine1}>{pauseData.quoteLine1 || 'Sometimes the first step'}</span>
          <span className={styles.quoteLine2}>{pauseData.quoteLine2 || 'forward'}</span>
          <span className={styles.quoteLine3}>
            {pauseData.quoteLine3 || 'is simply learning to be'}{' '}
            <span className={styles.goldText}>{pauseData.quoteGold || 'still.'}</span>
          </span>
        </motion.h2>

        <motion.div 
          className={styles.scrollIndicator}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <BreathIcon />
          <span className={styles.scrollText}>{pauseData.scrollText || 'SCROLL TO BREATHE'}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Pause;

