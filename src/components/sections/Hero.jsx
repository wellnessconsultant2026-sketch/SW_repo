import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import styles from './Hero.module.css';

// Rich golden floating sparkles inside the arch
const ARCH_SPARKLES = [
  // Upper arch crown & dome
  { type: 'star', x: 50, y: 7, size: 16, delay: 0.1, duration: 4.5 },
  { type: 'dot', x: 42, y: 10, size: 3.5, delay: 1.2, duration: 3.8 },
  { type: 'dot', x: 58, y: 9, size: 3.0, delay: 0.6, duration: 4.2 },
  { type: 'star', x: 32, y: 14, size: 13, delay: 1.8, duration: 4.0 },
  { type: 'star', x: 68, y: 13, size: 14, delay: 0.9, duration: 4.6 },
  { type: 'spark', x: 49, y: 16, size: 2.5, delay: 2.1, duration: 3.2 },
  { type: 'dot', x: 23, y: 19, size: 4.0, delay: 0.4, duration: 4.4 },
  { type: 'star', x: 77, y: 18, size: 12, delay: 1.5, duration: 3.9 },
  { type: 'spark', x: 38, y: 22, size: 2.5, delay: 2.7, duration: 3.0 },
  { type: 'dot', x: 62, y: 21, size: 3.5, delay: 1.0, duration: 4.1 },

  // Left side deep cosmic space
  { type: 'star', x: 14, y: 28, size: 14, delay: 0.7, duration: 4.8 },
  { type: 'dot', x: 26, y: 31, size: 3.5, delay: 2.3, duration: 3.7 },
  { type: 'spark', x: 10, y: 38, size: 2.5, delay: 1.4, duration: 2.9 },
  { type: 'star', x: 20, y: 44, size: 12, delay: 0.3, duration: 4.3 },
  { type: 'dot', x: 12, y: 52, size: 4.0, delay: 1.9, duration: 4.5 },
  { type: 'spark', x: 25, y: 58, size: 2.5, delay: 0.8, duration: 3.3 },
  { type: 'star', x: 15, y: 66, size: 13, delay: 2.2, duration: 4.7 },
  { type: 'dot', x: 24, y: 74, size: 3.5, delay: 1.1, duration: 4.0 },
  { type: 'spark', x: 12, y: 82, size: 2.5, delay: 0.5, duration: 3.1 },
  { type: 'star', x: 22, y: 88, size: 11, delay: 1.7, duration: 4.2 },

  // Right side deep cosmic space
  { type: 'star', x: 86, y: 27, size: 13, delay: 1.1, duration: 4.4 },
  { type: 'dot', x: 74, y: 30, size: 3.5, delay: 0.2, duration: 3.9 },
  { type: 'spark', x: 90, y: 37, size: 2.5, delay: 2.5, duration: 3.0 },
  { type: 'star', x: 80, y: 43, size: 14, delay: 1.6, duration: 4.6 },
  { type: 'dot', x: 88, y: 51, size: 4.0, delay: 0.9, duration: 4.2 },
  { type: 'spark', x: 75, y: 57, size: 2.5, delay: 2.0, duration: 3.4 },
  { type: 'star', x: 85, y: 65, size: 12, delay: 0.4, duration: 4.9 },
  { type: 'dot', x: 76, y: 73, size: 3.5, delay: 1.8, duration: 3.8 },
  { type: 'spark', x: 88, y: 81, size: 2.5, delay: 2.6, duration: 2.8 },
  { type: 'star', x: 78, y: 87, size: 11, delay: 1.3, duration: 4.1 },

  // Surrounding Aura & Inner Balance
  { type: 'dot', x: 34, y: 38, size: 3.0, delay: 0.8, duration: 4.3 },
  { type: 'dot', x: 66, y: 36, size: 3.0, delay: 2.2, duration: 4.0 },
  { type: 'spark', x: 30, y: 68, size: 2.5, delay: 1.5, duration: 3.2 },
  { type: 'spark', x: 70, y: 67, size: 2.5, delay: 0.6, duration: 3.1 },
  { type: 'star', x: 28, y: 80, size: 10, delay: 2.4, duration: 4.5 },
  { type: 'star', x: 72, y: 79, size: 10, delay: 1.0, duration: 4.3 }
];

// Ambient floating sparkles around arch, badges, and figure
const AMBIENT_SPARKLES = [
  // Drifting around Top Left Credential Badge
  { type: 'star', x: -10, y: 16, size: 15, delay: 0.2, duration: 5.2, driftX: 6, driftY: -16 },
  { type: 'dot', x: -4, y: 8, size: 4.0, delay: 1.4, duration: 4.4, driftX: -4, driftY: -18 },
  { type: 'spark', x: 2, y: 22, size: 2.5, delay: 2.3, duration: 3.5, driftX: 5, driftY: -12 },
  { type: 'dot', x: -12, y: 28, size: 3.5, delay: 0.9, duration: 4.8, driftX: -5, driftY: -20 },

  // Drifting above the Arch Dome
  { type: 'star', x: 50, y: -5, size: 16, delay: 0.6, duration: 5.4, driftX: 4, driftY: -16 },
  { type: 'dot', x: 36, y: -2, size: 3.5, delay: 1.9, duration: 4.6, driftX: -6, driftY: -14 },
  { type: 'spark', x: 64, y: -3, size: 3.0, delay: 1.1, duration: 3.8, driftX: 5, driftY: -15 },

  // Drifting near Botanical Branch (Right)
  { type: 'star', x: 98, y: 20, size: 14, delay: 1.3, duration: 4.9, driftX: -5, driftY: -18 },
  { type: 'dot', x: 106, y: 32, size: 4.0, delay: 0.4, duration: 4.5, driftX: 4, driftY: -22 },
  { type: 'spark', x: 94, y: 42, size: 2.5, delay: 2.1, duration: 3.6, driftX: -4, driftY: -16 },
  { type: 'dot', x: 102, y: 52, size: 3.5, delay: 1.6, duration: 4.7, driftX: 5, driftY: -18 },

  // Drifting around Bottom Right Credential Badge
  { type: 'star', x: 96, y: 72, size: 15, delay: 0.7, duration: 5.1, driftX: -6, driftY: -16 },
  { type: 'dot', x: 88, y: 84, size: 4.0, delay: 1.8, duration: 4.3, driftX: 4, driftY: -20 },
  { type: 'spark', x: 104, y: 82, size: 2.5, delay: 2.5, duration: 3.2, driftX: -3, driftY: -14 },
  { type: 'dot', x: 82, y: 92, size: 3.5, delay: 1.0, duration: 4.6, driftX: 5, driftY: -18 },

  // Drifting around Lower Left
  { type: 'star', x: -8, y: 70, size: 13, delay: 1.5, duration: 5.0, driftX: 5, driftY: -15 },
  { type: 'dot', x: -2, y: 84, size: 4.0, delay: 0.5, duration: 4.7, driftX: -4, driftY: -18 },
  { type: 'spark', x: 6, y: 92, size: 2.5, delay: 2.0, duration: 3.4, driftX: 4, driftY: -14 }
];

const SparkleParticle = ({ sparkle, index }) => {
  const { type, x, y, size, delay, duration, driftX = 4, driftY = -18 } = sparkle;
  const isAlt = index % 2 === 0;

  return (
    <motion.div
      className={styles.sparkleItem}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        marginLeft: -(size / 2),
        marginTop: -(size / 2)
      }}
      animate={{
        y: [0, driftY, 0],
        x: [0, isAlt ? driftX : -driftX, 0],
        scale: type === 'star' ? [0.75, 1.25, 0.75] : [0.8, 1.3, 0.8],
        opacity: [0.25, 0.95, 0.25],
        rotate: type === 'star' ? [0, isAlt ? 15 : -15, 0] : 0
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {type === 'star' ? (
        <svg viewBox="0 0 24 24" width={size} height={size} className={styles.sparkleStar}>
          <path
            d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z"
            fill="url(#goldSparkleGrad)"
          />
        </svg>
      ) : type === 'dot' ? (
        <div className={styles.sparkleDot} style={{ width: size, height: size }} />
      ) : (
        <div className={styles.sparkleSpark} style={{ width: size, height: size }} />
      )}
    </motion.div>
  );
};

const Hero = ({ onOpenConsultation }) => {
  const { content, t } = useContent();
  const transitionCinematic = { ease: [0.23, 1, 0.32, 1], duration: 0.5 };

  const heroData = content?.hero || {};
  const keywords = heroData.keywords || ['MEDITATION', 'CHAKRA & ENERGY', 'STRESS MANAGEMENT', 'SPIRITUAL COACHING'];

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          
          <motion.div 
            className={styles.authorityBadge}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionCinematic, delay: 0.05 }}
          >
            <span className={styles.pulsingDot} />
            <span className={styles.authorityTitle}>
              {heroData.eyebrow || 'Doctor of Medicine & Meditation Master'}
            </span>
            <span className={styles.authorityDivider}>•</span>
            <span className={styles.authorityTag}>{heroData.authorityTag || 'Mind-Body Sanctuary'}</span>
          </motion.div>

          <h1 className={styles.headline}>
            <motion.span 
              className={styles.headlineLine1}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionCinematic, delay: 0.1 }}
            >
              {heroData.headlineLine1 || 'Come Back'}
            </motion.span>
            <motion.span 
              className={styles.headlineLine2}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitionCinematic, delay: 0.15 }}
            >
              {heroData.headlineLine2 || 'To Yourself'}
            </motion.span>
          </h1>

          <motion.div 
            className={styles.decLineContainer}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ ...transitionCinematic, delay: 0.2 }}
          >
            <div className={styles.decLine} />
          </motion.div>

          <motion.p 
            className={styles.description}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionCinematic, delay: 0.22 }}
          >
            {heroData.description || 'A grounded sanctuary for healing, inner balance, clarity, and a deeper connection with who you are.'}
          </motion.p>

          <motion.div 
            className={styles.buttonGroup}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionCinematic, delay: 0.25 }}
          >
            <button className={styles.primaryCTA} onClick={onOpenConsultation}>
              <span>{heroData.primaryCTA || 'Begin Your Journey'}</span> <span className={styles.arrow}>→</span>
            </button>
            <button 
              className={styles.secondaryCTA}
              onClick={() => {
                const target = document.getElementById('services');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span>{heroData.secondaryCTA || 'Explore My Approach'}</span>
            </button>
          </motion.div>

          <motion.div 
            className={styles.keywordGrid}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transitionCinematic, delay: 0.3 }}
          >
            {keywords.map((kw) => (
              <div key={kw} className={styles.keywordCapsule}>
                <span>{kw}</span>
              </div>
            ))}
          </motion.div>

        </div>

        <div className={styles.rightColumn}>
          
          <motion.div 
            className={styles.archWrapper}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transitionCinematic}
          >
            {/* Ambient Aura Halo */}
            <motion.div 
              className={styles.archHalo}
              animate={{ opacity: [0.2, 0.38, 0.2], scale: [0.98, 1.04, 0.98] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Floating Credential Badge Top Left */}
            <motion.div 
              className={styles.floatingBadgeTop}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className={styles.floatingBadgeIcon}>
                <img 
                  src={heroData.floatingMedicalIcon || '/badge-sparkle.png'} 
                  alt="" 
                  className={styles.floatingBadgeImg}
                  width={38}
                  height={38}
                />
              </div>
              <div className={styles.floatingBadgeText}>
                <span className={styles.floatingBadgeTitle}>
                  {heroData.floatingMedicalTitle || 'Doctor of Medicine'}
                </span>
                <span className={styles.floatingBadgeSubtitle}>
                  {heroData.floatingMedicalSubtitle || 'Science & Mindfulness'}
                </span>
              </div>
            </motion.div>

            {/* Botanical element behind arch */}
            <svg className={styles.botanical} viewBox="0 0 100 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 300 C50 150 10 100 10 0 C30 50 80 150 50 300 Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M50 250 C70 180 90 120 80 50 C70 100 60 150 50 250 Z" stroke="currentColor" strokeWidth="2"/>
            </svg>

            {/* Sparkle Gold Gradient Definition */}
            <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
              <defs>
                <linearGradient id="goldSparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFDF0" />
                  <stop offset="30%" stopColor="#FFE082" />
                  <stop offset="70%" stopColor="#F5B838" />
                  <stop offset="100%" stopColor="#C8954A" />
                </linearGradient>
              </defs>
            </svg>

            <div className={styles.arch}>
              <div className={styles.archInnerGlow} />
              
              <div className={styles.stars}>
                {ARCH_SPARKLES.map((sparkle, i) => (
                  <SparkleParticle key={`arch-${i}`} sparkle={sparkle} index={i} />
                ))}
              </div>
            </div>

            <motion.img 
              src="/meditation-hero.png" 
              alt="Dr. Mayank Ahooja - Meditation Sanctuary" 
              className={styles.womanImage}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
              transition={{
                opacity: transitionCinematic,
                scale: transitionCinematic,
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
              }}
            />

            {/* Ambient Golden Floating Sparkles Layer */}
            <div className={styles.ambientSparkles}>
              {AMBIENT_SPARKLES.map((sparkle, i) => (
                <SparkleParticle key={`ambient-${i}`} sparkle={sparkle} index={i} />
              ))}
            </div>

            {/* Floating Credential Badge Bottom Right */}
            <motion.div 
              className={styles.floatingBadgeBottom}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <div className={styles.floatingBadgeIcon}>
                <img 
                  src={heroData.floatingMasteryIcon || '/badge-meditation.png'} 
                  alt="" 
                  className={styles.floatingBadgeImg}
                  width={38}
                  height={38}
                />
              </div>
              <div className={styles.floatingBadgeText}>
                <span className={styles.floatingBadgeTitle}>
                  {heroData.floatingMasteryTitle || '15+ Years Mastery'}
                </span>
                <span className={styles.floatingBadgeSubtitle}>
                  {heroData.floatingMasterySubtitle || '10,000+ Meditative Hours'}
                </span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...transitionCinematic, delay: 1.2 }}
      >
        <span className={styles.scrollText}>{heroData.scroll || 'Scroll to explore'}</span>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot} />
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;
