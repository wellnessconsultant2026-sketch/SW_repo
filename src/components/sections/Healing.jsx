import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { useInView } from '../../hooks/useInView';
import { fadeUp, stagger } from '../../lib/motion';
import styles from './Healing.module.css';

export default function Healing({ onOpenConsultation }) {
  const { content } = useContent();
  const [ref, inView] = useInView({ threshold: 0.15, once: true });

  const healingData = content?.healing || {};
  const points = healingData.points || [];

  const getCardClass = (point, idx) => {
    if (point.id === 'brain' || idx === 0) return styles.brainCard;
    if (point.id === 'vagus' || point.id === 'nervous' || idx === 1) return styles.vagusCard;
    if (point.id === 'cellular' || point.id === 'energy' || idx === 2) return styles.cellularCard;
    return styles[point.id + 'Card'] || '';
  };

  const getArtClass = (point, idx) => {
    if (point.id === 'brain' || idx === 0) return styles.brainArt;
    if (point.id === 'vagus' || point.id === 'nervous' || idx === 1) return styles.vagusArt;
    if (point.id === 'cellular' || point.id === 'energy' || idx === 2) return styles.cellularArt;
    return styles[point.id + 'Art'] || '';
  };

  return (
    <section id="healing" className={styles.section} aria-label="The Science of Healing">
      <div className={styles.container} ref={ref}>
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className={styles.tag}>{healingData.tag || 'THE SCIENCE OF WELLNESS'}</span>
          <blockquote className={styles.quote}>
            &ldquo;{healingData.quote || 'Transformation Begins Within.'}&rdquo;
          </blockquote>
          <p className={styles.supporting}>{healingData.supporting}</p>
        </motion.div>

        {/* 3 Pillars of Science */}
        <motion.div
          className={styles.pointsGrid}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {points.map((point, idx) => {
            const cardClass = getCardClass(point, idx);
            const artClass = getArtClass(point, idx);
            return (
              <motion.div 
                key={point.id || idx} 
                variants={fadeUp} 
                className={`${styles.pointCard} ${cardClass} ${idx === 1 ? styles.featuredCard : ''}`}
              >
                {/* Background ambient visual artwork */}
                <div className={`${styles.artContainer} ${artClass}`}>
                  <img 
                    src={point.image} 
                    alt={point.title} 
                    className={styles.artImage}
                    loading="lazy"
                  />
                </div>

              {/* Card Number & Horizontal Accent Bar */}
              <div className={styles.cardHeader}>
                <span className={styles.pointNum}>{point.num}</span>
                <span className={styles.headerBar} />
              </div>

              {/* Card Title & Description */}
              <div className={styles.contentArea}>
                <h3 className={styles.pointTitle}>
                  <span className={styles.titleLine}>{point.titleLine1 || point.title}</span>
                  {point.titleLine2 && <span className={styles.titleLine}>{point.titleLine2}</span>}
                </h3>
                <p className={styles.pointDesc}>{point.desc}</p>
              </div>
            </motion.div>
          );
        })}
        </motion.div>
      </div>
    </section>
  );
}
