import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useInView } from '../../hooks/useInView';
import { fadeUp, stagger } from '../../lib/motion';
import styles from './Stillness.module.css';

// 4-4-4 Breathing Cycle (in ms)
const PHASE_DURATION = 4000;
const ARC_RADIUS = 135;
const ARC_CIRCUMFERENCE = 2 * Math.PI * ARC_RADIUS; // ~848.23

export default function Stillness({ onOpenConsultation }) {
  const { content, t } = useContent();
  const stillnessData = content?.stillness || {};
  const [inViewRef, inView] = useInView({ threshold: 0.15, once: false });
  const prefersReduced = useReducedMotion();

  const PHASES = useMemo(() => [
    { key: 'in', label: stillnessData.phases?.in || 'Breathe in', duration: PHASE_DURATION, minScale: 1.0, maxScale: 1.22 },
    { key: 'hold', label: stillnessData.phases?.holdIn || 'Hold', duration: PHASE_DURATION, minScale: 1.22, maxScale: 1.22 },
    { key: 'out', label: stillnessData.phases?.out || 'Breathe out', duration: PHASE_DURATION, minScale: 1.22, maxScale: 1.0 }
  ], [stillnessData.phases]);
  const TOTAL_CYCLE_DURATION = 12000;

  const [isRunning, setIsRunning] = useState(true);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(4);

  const arcCircleRef = useRef(null);
  const beadGroupRef = useRef(null);
  const coreOrbRef = useRef(null);

  const startTimeRef = useRef(null);
  const pausedTimeRef = useRef(0);
  const animFrameRef = useRef(null);

  // Initialize and handle play/pause based on visibility and inView
  useEffect(() => {
    if (prefersReduced) {
      setIsRunning(false);
      return;
    }
    if (inView && !document.hidden) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  }, [inView, prefersReduced]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsRunning(false);
      } else if (inView && !prefersReduced) {
        setIsRunning(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [inView, prefersReduced]);

  // High-performance 60fps animation loop with direct DOM transforms
  useEffect(() => {
    if (!isRunning || prefersReduced) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      startTimeRef.current = null;
      return;
    }

    const tick = (now) => {
      if (!startTimeRef.current) {
        startTimeRef.current = now - pausedTimeRef.current;
      }

      const elapsed = (now - startTimeRef.current) % TOTAL_CYCLE_DURATION;
      pausedTimeRef.current = elapsed;

      // Arc progress from 0 to 1
      const progress = elapsed / TOTAL_CYCLE_DURATION;
      const strokeOffset = ARC_CIRCUMFERENCE * (1 - progress);

      if (arcCircleRef.current) {
        arcCircleRef.current.style.strokeDashoffset = strokeOffset;
      }

      // Leading Tip Bead coordinates: starts at top (-Math.PI/2) and moves clockwise
      if (beadGroupRef.current) {
        const currentAngle = -Math.PI / 2 + progress * 2 * Math.PI;
        const beadX = 180 + ARC_RADIUS * Math.cos(currentAngle);
        const beadY = 180 + ARC_RADIUS * Math.sin(currentAngle);
        beadGroupRef.current.setAttribute('transform', `translate(${beadX.toFixed(2)}, ${beadY.toFixed(2)})`);
      }

      // Identify active phase
      let accumulated = 0;
      let activeIndex = 0;
      let phaseElapsed = 0;

      for (let i = 0; i < PHASES.length; i++) {
        const p = PHASES[i];
        if (elapsed < accumulated + p.duration) {
          activeIndex = i;
          phaseElapsed = elapsed - accumulated;
          break;
        }
        accumulated += p.duration;
      }

      const phase = PHASES[activeIndex];
      const phaseProgress = phaseElapsed / phase.duration;

      // Smooth organic scaling of central disc
      let currentScale = 1.0;
      if (phase.key === 'in') {
        const ease = 0.5 - 0.5 * Math.cos(phaseProgress * Math.PI);
        currentScale = phase.minScale + (phase.maxScale - phase.minScale) * ease;
      } else if (phase.key === 'hold') {
        currentScale = phase.maxScale + 0.015 * Math.sin(phaseProgress * Math.PI * 2);
      } else if (phase.key === 'out') {
        const ease = 0.5 - 0.5 * Math.cos(phaseProgress * Math.PI);
        currentScale = phase.minScale - (phase.minScale - phase.maxScale) * ease;
      }

      if (coreOrbRef.current) {
        coreOrbRef.current.style.transform = `scale(${currentScale.toFixed(3)})`;
      }

      // Countdown seconds: 4, 3, 2, 1
      const remaining = Math.max(1, Math.ceil((phase.duration - phaseElapsed) / 1000));

      setPhaseIndex((prev) => (prev !== activeIndex ? activeIndex : prev));
      setSecondsRemaining((prev) => (prev !== remaining ? remaining : prev));

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isRunning, prefersReduced]);

  const toggleRunning = () => {
    setIsRunning((prev) => !prev);
  };

  const restartCircle = () => {
    pausedTimeRef.current = 0;
    startTimeRef.current = performance.now();
    setPhaseIndex(0);
    setSecondsRemaining(4);
    setIsRunning(true);
  };

  const currentPhase = PHASES[phaseIndex];

  return (
    <section id="meditation" className={styles.section} aria-label="Interactive Meditation">
      <div id="stillness" style={{ position: 'relative', top: '-80px', visibility: 'hidden', height: 0 }} />
      <div className={styles.container} ref={inViewRef}>
        
        {/* Header: PAUSE • BREATHE • BE PRESENT */}
        <motion.div
          className={styles.header}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <span className={styles.tag}>{stillnessData.tag || 'PAUSE • BREATHE • BE PRESENT'}</span>
          <h2 className={styles.headline}>{stillnessData.headline || 'Follow the gentle 4-4-4 breathing circle'}</h2>
          <p className={styles.subhead}>{stillnessData.subhead || 'to gently calm and reset your mind and body.'}</p>
        </motion.div>

        {/* The 3 Golden Keys (Tinted Cards with 3D Glossy Icons) */}
        <motion.div
          className={styles.keysRow}
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {(stillnessData.threeKeys || []).map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              className={`${styles.keyCard} ${styles[item.theme + 'Card']}`}
            >
              <div className={styles.keyIconBadge}>
                {item.id === 'want' && (
                  <img
                    src="/icon-key-sun.png"
                    alt="I want nothing"
                    className={styles.keyIconImg}
                    loading="lazy"
                    width="68"
                    height="68"
                  />
                )}
                {item.id === 'do' && (
                  <img
                    src="/icon-key-leaf.png"
                    alt="I do nothing"
                    className={styles.keyIconImg}
                    loading="lazy"
                    width="68"
                    height="68"
                  />
                )}
                {item.id === 'am' && (
                  <img
                    src="/icon-key-lotus.png"
                    alt="I am nothing"
                    className={styles.keyIconImg}
                    loading="lazy"
                    width="68"
                    height="68"
                  />
                )}
              </div>
              <div className={styles.keyContent}>
                <h3 className={styles.keyTitle}>{item.sutra}</h3>
                <p className={styles.keyDesc}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 3-Column Main Layout: Benefits Timeline, Breathing Orb, Quote Card */}
        <div className={styles.mainGrid}>
          
          {/* Left Column: Benefits Timeline */}
          <div className={styles.benefitsCol}>
            <div className={styles.timelineList}>
              {(stillnessData.benefits || []).map((benefit, idx) => (
                <div key={benefit.id} className={styles.timelineItem}>
                  <div className={styles.timelineIconWrapper}>
                    <div className={styles.timelineIconBadge}>
                      {benefit.id === 'mind' && (
                        <img
                          src="/icon-timeline-lungs.png"
                          alt="Calms your mind"
                          className={styles.timelineIconImg}
                          loading="lazy"
                          width="26"
                          height="26"
                        />
                      )}
                      {benefit.id === 'stress' && (
                        <img
                          src="/icon-timeline-brain.png"
                          alt="Reduces stress"
                          className={styles.timelineIconImg}
                          loading="lazy"
                          width="24"
                          height="24"
                        />
                      )}
                      {benefit.id === 'reset' && (
                        <img
                          src="/icon-timeline-heart.png"
                          alt="Resets your day"
                          className={styles.timelineIconImg}
                          loading="lazy"
                          width="24"
                          height="24"
                        />
                      )}
                    </div>
                    {idx < content.stillness.benefits.length - 1 && (
                      <div className={styles.timelineConnector} />
                    )}
                  </div>
                  <div className={styles.timelineText}>
                    <h4 className={styles.benefitTitle}>{benefit.title}</h4>
                    <p className={styles.benefitDesc}>{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Column: Interactive Breathing Orb with Glowing Arc */}
          <div className={styles.orbCol}>
            <div className={styles.orbWrapper}>
              
              <svg className={styles.orbSvg} viewBox="0 0 360 360" aria-hidden="true">
                <defs>
                  {/* Glowing warm gold gradient for progress arc */}
                  <linearGradient id="goldArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E2C998" stopOpacity="0.3" />
                    <stop offset="35%" stopColor="#C88E35" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#F0B548" stopOpacity="1" />
                  </linearGradient>
                  
                  {/* Multi-tier radiant glow bloom filter for leading tip bead */}
                  <filter id="beadGlowFilter" x="-150%" y="-150%" width="400%" height="400%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur1" />
                    <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur2" />
                    <feMerge>
                      <feMergeNode in="blur2" />
                      <feMergeNode in="blur1" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Concentric ambient background rings */}
                <circle cx="180" cy="180" r="172" className={styles.outerRing} />
                <circle cx="180" cy="180" r="150" className={styles.middleRing} />
                <circle cx="180" cy="180" r="135" className={styles.trackRing} />

                {/* Animated 60fps Golden Arc */}
                <circle
                  ref={arcCircleRef}
                  cx="180"
                  cy="180"
                  r={ARC_RADIUS}
                  className={styles.progressArc}
                  stroke="url(#goldArcGradient)"
                  strokeWidth="6.5"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={ARC_CIRCUMFERENCE}
                  strokeDashoffset={ARC_CIRCUMFERENCE}
                  transform="rotate(-90 180 180)"
                />

                {/* Radiant Glowing Bead at Arc Leading Tip */}
                <g ref={beadGroupRef} className={styles.beadGroup} transform="translate(180, 45)">
                  <circle r="17" fill="rgba(242, 180, 70, 0.45)" filter="url(#beadGlowFilter)" />
                  <circle r="9" fill="rgba(255, 230, 135, 0.85)" filter="url(#beadGlowFilter)" />
                  <circle r="5" fill="#FFFFFF" stroke="#C88E35" strokeWidth="2.4" />
                </g>
              </svg>

              {/* Elevated 3D Radial Core Disc */}
              <button
                type="button"
                ref={coreOrbRef}
                className={styles.coreOrb}
                onClick={toggleRunning}
                aria-label={isRunning ? 'Pause breathing guide' : 'Start breathing guide'}
              >
                <span className={styles.phaseLabel} aria-live="polite">
                  {isRunning ? currentPhase.label : (stillnessData.pressToBegin || t('stillness.pressToBegin', 'Press to begin'))}
                </span>
                <span className={styles.timerCount} aria-hidden="true">
                  {String(secondsRemaining).padStart(2, '0')}
                </span>
              </button>
            </div>

            {/* Restart Button Pill */}
            <div className={styles.controlsRow}>
              <button
                type="button"
                className={styles.restartBtn}
                onClick={restartCircle}
                aria-label={stillnessData.restartCircle || 'Restart breathing circle'}
              >
                <svg className={styles.restartSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.72 2.24" />
                  <path d="M21 3v6h-6" />
                </svg>
                <span>{stillnessData.restartCircle || t('stillness.restartCircle', 'Restart Circle')}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Quote Card */}
          <div className={styles.quoteCol}>
            <div className={styles.quoteCard}>
              <div className={styles.quoteMarkBadge} aria-hidden="true">
                <span className={styles.quoteSymbol}>“</span>
              </div>
              <blockquote className={styles.quoteBody}>
                <p className={styles.quoteText}>
                  {stillnessData.quoteCard?.quoteLine1 || 'A calmer you'}
                  <br />
                  {stillnessData.quoteCard?.quoteLine2 || 'is a brighter you.'}
                </p>
                <div className={styles.quoteDivider} />
                <footer className={styles.quoteFooter}>
                  {stillnessData.quoteCard?.tagline || 'BREATHE  •  RESET  •  REPEAT'}
                </footer>
              </blockquote>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
