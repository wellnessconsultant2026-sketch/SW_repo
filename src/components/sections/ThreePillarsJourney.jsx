'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '@/context/ContentContext';
import { useInView } from '@/hooks/useInView';
import { fadeUp } from '@/lib/motion';
import styles from './ThreePillarsJourney.module.css';

const defaultPillarsData = [
  {
    id: 'meditation',
    num: '01',
    label: 'MEDITATION',
    tag: 'THE MINDFUL PRACTICE',
    action: 'Experience yourself.',
    principle: 'Meditation provides practice.',
    quote: 'Awareness turns understanding into a lived practice.',
    details: 'Simple breathing exercises, guided quiet time, and learning to pause. Intellectual understanding transforms into real peace, physical relaxation, and renewed energy.',
    pills: ['Mindful Breathing', 'Natural Relaxation', 'Present Awareness', 'Quiet Space'],
    image: '/pillars-phase2-meditation.jpg',
    imageAlt: 'Meditation Practice — Peaceful Embodied Presence'
  },
  {
    id: 'science',
    num: '02',
    label: 'SCIENCE',
    tag: 'THE GROUNDED UNDERSTANDING',
    action: 'Understand yourself.',
    principle: 'Science provides understanding.',
    quote: 'Understanding the human system gives us a foundation for meaningful change.',
    details: 'A clear look at how stress, breathing, and daily habits impact the body and mind. We focus on real, practical understanding so you know exactly why you feel the way you do.',
    pills: ['Mind-Body Connection', 'Stress Relief', 'Calm Breathing', 'Gentle Guidance'],
    image: '/pillars-phase1-science.png',
    imageAlt: 'Brain and Mind Mapping — Science of Mind and Body'
  },
  {
    id: 'spirituality',
    num: '03',
    label: 'HOLISTIC WELLNESS',
    tag: 'THE INNER HARMONY & MEANING',
    action: 'Connect with yourself.',
    principle: 'Holistic wellness provides deeper connection and meaning.',
    quote: 'Inner connection brings meaning, balance and a deeper sense of well-being.',
    details: 'Gentle energy alignment, calming sound resonance, and clear inner peace. Reconnecting with who you are beyond busy schedules, daily roles, and expectations.',
    pills: ['Energy Alignment', 'Calming Sound', 'Inner Clarity', 'Wholeness of Being'],
    image: '/pillars-phase3-spirit.png',
    imageAlt: 'Holistic Wellness — Deep Inner Stillness and Radiant Wholeness'
  }
];

export default function ThreePillarsJourney() {
  const { content } = useContent();
  const [ref, inView] = useInView({ threshold: 0, rootMargin: '100px', once: true });
  const [activeStage, setActiveStage] = useState('all'); // 'all' | 'science' | 'meditation' | 'spirituality'
  const [hoveredStage, setHoveredStage] = useState(null);

  const journeyContent = content?.threePillars || {};
  const pillarsData = defaultPillarsData.map(def => {
    const loc = (journeyContent.pillars || []).find(p => p.id === def.id);
    return loc ? { ...def, ...loc } : def;
  });

  return (
    <section 
      id="three-pillars" 
      className={styles.section} 
      aria-label="Three Pillars: Science, Meditation, and Spiritual Wellness"
    >
      {/* Controlled Atmospheric Ambient Backdrop */}
      <div className={styles.ambientBackdrop}>
        <div 
          className={styles.ambientBlobScience} 
          style={{ opacity: activeStage === 'science' || activeStage === 'all' ? 1 : 0.2 }}
        />
        <div 
          className={styles.ambientBlobMeditation} 
          style={{ opacity: activeStage === 'meditation' || activeStage === 'all' ? 1 : 0.2 }}
        />
        <div 
          className={styles.ambientBlobSpirit} 
          style={{ opacity: activeStage === 'spirituality' || activeStage === 'all' ? 1 : 0.2 }}
        />
      </div>

      <div className={styles.container} ref={ref}>
        {/* Section Editorial Header */}
        <motion.div 
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className={styles.tagline}>
            <span>{journeyContent.tag || 'THE CONCEPTUAL FOUNDATION'}</span>
          </span>
          <h2 className={styles.mainHeading}>
            {journeyContent.mainHeading || 'Three perspectives. One whole person.'}
          </h2>
          <div className={styles.formulaHeadline}>
            {journeyContent.formulaHeadline || 'Meditation × Science × Holistic Wellness'}
          </div>
          <p className={styles.subHeading}>
            {journeyContent.subHeading || 'Meditation provides practice. Science provides understanding. Holistic wellness provides deeper connection and meaning. Together, they create a complete approach to human well-being.'}
          </p>
        </motion.div>

        {/* Phase Navigator Controls */}
        <div className={styles.phaseControls} role="tablist" aria-label="Pillar Perspectives">
          <button
            type="button"
            role="tab"
            aria-selected={activeStage === 'all'}
            className={`${styles.phaseButton} ${activeStage === 'all' ? styles.phaseButtonActive : ''}`}
            onClick={() => setActiveStage('all')}
          >
            <span>{journeyContent.completeJourney || 'The Complete Journey'}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeStage === 'meditation'}
            className={`${styles.phaseButton} ${activeStage === 'meditation' ? styles.phaseButtonActive : ''}`}
            onClick={() => setActiveStage('meditation')}
          >
            <span>{pillarsData.find(p => p.id === 'meditation')?.label || 'Meditation'}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeStage === 'science'}
            className={`${styles.phaseButton} ${activeStage === 'science' ? styles.phaseButtonActive : ''}`}
            onClick={() => setActiveStage('science')}
          >
            <span>{pillarsData.find(p => p.id === 'science')?.label || 'Science'}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeStage === 'spirituality'}
            className={`${styles.phaseButton} ${activeStage === 'spirituality' ? styles.phaseButtonActive : ''}`}
            onClick={() => setActiveStage('spirituality')}
          >
            <span>{pillarsData.find(p => p.id === 'spirituality')?.label || 'Holistic Wellness'}</span>
          </button>
        </div>

        {/* Progressive Journey Timeline */}
        <div className={styles.progressionRail}>
          <div className={styles.connectingThread} />

          {pillarsData.map((pillar, index) => {
            const isVisible = activeStage === 'all' || activeStage === pillar.id;
            const isHovered = hoveredStage === pillar.id;
            const isLeft = index % 2 === 0;

            if (!isVisible) return null;

            return (
              <motion.div
                key={pillar.id}
                className={styles.stageRow}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                onMouseEnter={() => setHoveredStage(pillar.id)}
                onMouseLeave={() => setHoveredStage(null)}
              >
                {/* Column 1: Card on Left (for odd rows) or Visual on Left (for even rows) */}
                {isLeft ? (
                  <div className={`${styles.stageCard} ${styles.stageCardLeft} ${isHovered ? styles.stageCardActive : ''}`}>
                    <div className={styles.stageEyebrow}>
                      <span>STAGE {pillar.num} • {pillar.tag}</span>
                    </div>
                    <h3 className={styles.stageTitle}>{pillar.label}</h3>
                    <div className={styles.stageActionVerb}>{pillar.action}</div>
                    <p className={styles.stageDesc}>
                      "{pillar.quote}"
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.86rem',
                      color: 'var(--text-muted)',
                      lineHeight: '1.6',
                      marginBottom: '1rem'
                    }}>
                      {pillar.details}
                    </p>
                    <div className={styles.stagePillsRow} style={{ justifyContent: 'flex-end' }}>
                      {pillar.pills.map((pill, pIdx) => (
                        <span key={pIdx} className={styles.stagePill}>{pill}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={`${styles.stageCanvas} ${styles.stageVisualLeft} ${pillar.id === 'science' ? styles.stageCanvasScience : ''}`}>
                    <img 
                      src={pillar.image} 
                      alt={pillar.imageAlt} 
                      className={`${styles.stageImage} ${pillar.id === 'science' ? styles.stageImageScience : ''} ${pillar.id === 'meditation' ? styles.stageImageMeditation : ''}`}
                      loading="eager"
                    />
                  </div>
                )}

                {/* Central Milestone Node */}
                <div className={styles.stageCenterNode}>
                  <div className={`${styles.nodeCircle} ${isHovered ? styles.nodeCircleActive : ''}`}>
                    {pillar.num}
                  </div>
                </div>

                {/* Column 3: Visual on Right (for odd rows) or Card on Right (for even rows) */}
                {isLeft ? (
                  <div className={`${styles.stageCanvas} ${styles.stageVisualRight} ${pillar.id === 'science' ? styles.stageCanvasScience : ''}`}>
                    <img 
                      src={pillar.image} 
                      alt={pillar.imageAlt} 
                      className={`${styles.stageImage} ${pillar.id === 'science' ? styles.stageImageScience : ''} ${pillar.id === 'meditation' ? styles.stageImageMeditation : ''}`}
                      loading="eager"
                    />
                  </div>
                ) : (
                  <div className={`${styles.stageCard} ${styles.stageCardRight} ${isHovered ? styles.stageCardActive : ''}`}>
                    <div className={styles.stageEyebrow}>
                      <span>STAGE {pillar.num} • {pillar.tag}</span>
                    </div>
                    <h3 className={styles.stageTitle}>{pillar.label}</h3>
                    <div className={styles.stageActionVerb}>{pillar.action}</div>
                    <p className={styles.stageDesc}>
                      "{pillar.quote}"
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.86rem',
                      color: 'var(--text-muted)',
                      lineHeight: '1.6',
                      marginBottom: '1rem'
                    }}>
                      {pillar.details}
                    </p>
                    <div className={styles.stagePillsRow}>
                      {pillar.pills.map((pill, pIdx) => (
                        <span key={pIdx} className={styles.stagePill}>{pill}</span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════
            PHASE 4: THE CONVERGENCE (EMOTIONAL PAYOFF)
            A Complete Approach to Well-Being
            ═══════════════════════════════════════════ */}
        <motion.div 
          className={styles.convergenceSection}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div className={styles.convergenceAuraCenter} />

          {/* Phase 4 Convergence Centerpiece Visual (2nd Pic) */}
          <div className={styles.raysCanvas}>
            <div className={styles.silhouetteFrame}>
              <img 
                src="/pillars-phase4-convergence.jpg" 
                alt="A Complete Approach to Well-Being — Whole-Person Harmony" 
                className={styles.convergenceImg}
                loading="lazy"
              />
            </div>
          </div>

          <span className={styles.convergenceBadge}>
            <span>PHASE IV • CONVERGENCE</span>
          </span>

          <h3 className={styles.convergenceTitle}>
            A Complete Approach to Well-Being
          </h3>

          <div className={styles.convergenceTriad}>
            <span>Practice.</span>
            <span>•</span>
            <span>Understand.</span>
            <span>•</span>
            <span>Connect.</span>
          </div>

          <p className={styles.convergenceSummary}>
            When meditation helps our body relax, science gives us understanding, and spiritual wellness restores our sense of wholeness, personal balance becomes a natural, living reality.
          </p>

          {/* Triad Breakdown: Why These Three Belong Together */}
          <div className={styles.triadGrid}>
            <div className={styles.triadItem}>
              <div className={styles.triadRole}>Meditation</div>
              <div className={styles.triadPrinciple}>Provides Practice</div>
              <p className={styles.triadText}>
                Turns ideas into real physical relief, steady relaxed breathing, and lasting daily calm.
              </p>
            </div>

            <div className={styles.triadItem}>
              <div className={styles.triadRole}>Science</div>
              <div className={styles.triadPrinciple}>Provides Understanding</div>
              <p className={styles.triadText}>
                Gives clear insight into why your body holds stress, how you react to pressure, and removes confusion with simple, practical facts.
              </p>
            </div>

            <div className={styles.triadItem}>
              <div className={styles.triadRole}>Holistic Wellness</div>
              <div className={styles.triadPrinciple}>Provides Connection & Meaning</div>
              <p className={styles.triadText}>
                Unlocks inner purpose, gentle personal harmony, and a peaceful connection to who you truly are beyond daily stress.
              </p>
            </div>
          </div>

          {/* Smooth Bridge Transition into Detailed Credentials */}
          <div className={styles.transitionBridge}>
            <span>Continue below to discover Dr. Mayank's background & personal journey</span>
            <span className={styles.bridgeDownArrow}>↓</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
