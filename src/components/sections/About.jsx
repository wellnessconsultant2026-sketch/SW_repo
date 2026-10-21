import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';
import { fadeUp, stagger } from '../../lib/motion';
import MagneticButton from '../common/MagneticButton';
import ThreePillarsJourney from './ThreePillarsJourney';
import styles from './About.module.css';

const defaultProtocolPresets = {
  stress: {
    id: 'stress',
    num: '01',
    duration: 'CALMING RESET',
    image: '/service-moon.jpg',
        label: 'Stress & Overthinking',
    focusName: 'Calming the Mind & Restoring Inner Peace',
    target: 'Everyday Stress & Overwhelm',
    shortDesc: 'When constant pressure keeps your mind racing, it feels difficult to unwind and settle into calm.',
    beforeState: 'Overwhelmed & Restless',
    afterState: 'Deep Calm & Peaceful Rest',
    format: 'Quick Calming & Relaxation',
    medicalInsight: 'When stress builds up over time, it drains your daily focus, makes thoughts spin in circles, and makes it hard to unwind.',
    spiritualApproach: 'Gentle rhythmic breathing and peaceful guided stillness that help you naturally feel grounded, calm, and quiet inside.',
    transformation: 'Soothing relaxation, an end to racing thoughts, a reassuring sense of calm, and refreshing, natural rest.'
  },
  fatigue: {
    id: 'fatigue',
    num: '02',
    duration: 'NATURAL RECHARGE',
    image: '/service-stones.jpg',
        label: 'Tiredness & Burnout',
    focusName: 'Renewing Daily Vitality & Focus',
    target: 'Drained Energy & Overwhelm',
    shortDesc: 'Long days of endless tasks and non-stop rushing drain your energy, leaving you feeling weary and worn out.',
    beforeState: 'Drained & Foggy',
    afterState: 'Refreshed Calm & Clear Mind',
    format: 'Deep Energy Recharge',
    medicalInsight: 'Continuous pressure and everyday strain wear down your natural energy stores, leaving your focus foggy and stamina low.',
    spiritualApproach: 'Gentle energy balancing, deeply restful guided relaxation, and soothing sound harmonies to refresh your outlook.',
    transformation: 'Fresh mental clarity, an uplifting feeling of lightness, and a peaceful enthusiasm for your everyday life.'
  },
  blocks: {
    id: 'blocks',
    num: '03',
    duration: 'GENTLE RELEASE',
    image: '/service-chakras.jpg',
        label: 'Held Emotions & Lingering Stress',
    focusName: 'Gentle Relaxation & Letting Go',
    target: 'Unreleased Everyday Stress',
    shortDesc: 'Unresolved feelings and daily pressure often build up as quiet stress, leaving you feeling weighed down and uneasy.',
    beforeState: 'Weighed Down & Tense',
    afterState: 'Light, Free & Peaceful',
    format: 'Gentle Emotional Release',
    medicalInsight: 'Ongoing stress and heavy feelings can build up over time, creating a sense of heaviness, fatigue, and unease.',
    spiritualApproach: 'Calming visualization, gentle sound tones, and supportive, accepting guidance to help ease and release old stress.',
    transformation: 'A gentle release of heaviness, emotional freedom, clear peace of mind, and an effortless sense of ease.'
  },
  growth: {
    id: 'growth',
    num: '04',
    duration: 'INNER PEACE',
    image: '/service-sky.jpg',
        label: 'Inner Meaning & Deeper Calling',
    focusName: 'Quiet Stillness & Self-Discovery',
    target: 'Inner Peace & Direction',
    shortDesc: 'A desire for lasting inner quiet, a clear mind free from constant worry, and a direct connection to what truly matters.',
    beforeState: 'Feeling Lost & Disconnected',
    afterState: 'Clear Insight & Peaceful Stillness',
    format: 'Personal 1:1 Mentorship',
    medicalInsight: 'Quieting constant mental chatter and everyday noise allows your mind to rest in a rare, clear state of effortless focus and calm.',
    spiritualApproach: 'Direct 1:1 guidance in deep, quiet meditation, helping you return to your authentic inner self beyond everyday stress.',
    transformation: 'Crystal-clear direction, deep tranquility, freedom from inner conflict, and an unshakeable connection to who you truly are.'
  }
};

const defaultDeepBenefits = {
  tag: 'MULTIDIMENSIONAL RELIEF',
  title: 'Real and Deep Benefits',
  subtitle: 'Working simultaneously on physical, emotional, mental, and spiritual levels to restore wholeness.',
  quote: 'This energetic technique works on multiple levels simultaneously (physical, emotional, mental, and spiritual), providing relief and healing in various situations.',
  items: [
    {
      id: 'anxiety',
      dimension: 'mental',
      levelBadge: 'Mind & Inner Calm',
            title: 'Stress, Worry & Feeling Down',
      desc: 'Helps quiet racing thoughts and brings back emotional balance, soothing constant inner worry and mental noise.',
      target: 'Easing Mental Overload & Constant Worry',
      quote: 'Calms racing thoughts and restores nervous equilibrium.',
      clinicalShift: 'Helps quiet mental restlessness and eases ongoing stress, allowing you to settle into a deep, comforting sense of calm.'
    },
    {
      id: 'vitality',
      dimension: 'physical',
      levelBadge: 'Energy & Vitality',
            title: 'Low Energy, Restless Sleep & Exhaustion',
      desc: 'Eases sleeplessness and ongoing tiredness, encouraging deep restful sleep and replenishing your natural daily energy.',
      target: 'Restoring Drained Energy & Sleep Rhythms',
      quote: 'Deep, natural recharge to help you wake up refreshed.',
      clinicalShift: 'Supports your natural sleep rhythm, encourages deeper rest cycles during the night, and refreshes your cellular energy reserves.'
    },
    {
      id: 'pain',
      dimension: 'physical',
      levelBadge: 'Body & Physical Comfort',
            title: 'Everyday Physical Tension',
      desc: 'Helps gently ease everyday bodily tension and tightness caused by long hours, work pressure, and accumulated stress.',
      target: 'Releasing Built-Up Everyday Tension',
      quote: 'Gently releasing tightness and bringing easy relaxation.',
      clinicalShift: 'Helps relax tight, held tension throughout the body by encouraging deep relaxation and soothing daily pressure.'
    },
    {
      id: 'digestive',
      dimension: 'physical',
      levelBadge: 'Digestion & Natural Balance',
            title: 'Inner Comfort & Natural Balance',
      desc: 'Supports overall comfort and inner vitality by easing the nervous restlessness and tension caused by everyday stress.',
      target: 'Easing Stress-Related Restlessness',
      quote: 'Brings comforting relief and restores natural inner ease.',
      clinicalShift: 'Helps your system transition into a restful, relaxed state, soothing daily nervous tension and restoring natural balance.'
    },
    {
      id: 'chakras',
      dimension: 'spiritual',
      levelBadge: 'Inner Energy & Joy',
            title: 'Harmonizing the 7 Energy Centers',
      desc: 'From the first session, an unblocking is felt and chakras flow fluidly again. A wave of well-being, joy, and deep inner connection is experienced.',
      target: 'Restoring Your Natural Energy Flow',
      quote: 'It feels like a warm, refreshing shower of light for your soul.',
      clinicalShift: 'Gently clears away heavy emotional fatigue, refreshing your energy and awakening genuine inner joy.'
    },
    {
      id: 'emotional',
      dimension: 'emotional',
      levelBadge: 'Emotional Peace & Release',
            title: 'Gently Letting Go of Emotional Weight',
      desc: 'Helps you release old feelings and heavy burdens without having to relive past hardships. Brings deep relief, warmth, and peaceful freedom.',
      target: 'Releasing Past Emotional Heaviness',
      quote: 'A gentle approach that touches deep areas other practices miss.',
      clinicalShift: 'Helps you gently let go of accumulated stress through calm breathing and peaceful presence, without feeling overwhelmed.'
    }
  ]
};

const defaultMeditationPaths = {
  tag: 'MY APPROACH',
  title: 'Paths to Your Natural Inner Balance',
  subtitle: 'A simple blend of timeless meditation and easy breathing practices to help you find balance in everyday life and work.',
  items: [
    {
      num: '01',
      category: 'stillness',
            name: 'Beginners Simple Concentration',
      technique: 'Single-Point Focus & Easy Breath',
      outcome: 'Clear Mind & Peaceful Quiet',
      desc: 'A gentle, grounded way to steady busy thoughts, build easy focus, and start a refreshing daily habit.',
      inSession: 'Dr. Mayank gently guides your attention step by step, taking away the struggle of trying to force your mind to be quiet.'
    },
    {
      num: '02',
      category: 'stillness',
            name: 'Mantra Meditation',
      technique: 'Sacred Sound & Peaceful Chanting',
      outcome: 'Quieting Thoughts & Inner Resonance',
      desc: 'Gentle repetition of soothing sounds that helps ease mental resistance, quiet inner chatter, and rest in peaceful silence.',
      inSession: 'You are guided through calming sound rhythms that fit your natural energy, gently quieting non-stop mental chatter.'
    },
    {
      num: '03',
      category: 'stillness',
            name: 'Mindfulness',
      technique: 'Mindful Body & Breath Awareness',
      outcome: 'Gentle Presence & Calm Perspective',
      desc: 'Resting in the present moment by noticing your sensations, thoughts, and feelings without judgment or frustration.',
      inSession: 'Learn to notice daily stress and tension in real time without spiraling into automatic worry or frustration.'
    },
    {
      num: '04',
      category: 'breath',
            name: 'Breathwork Meditation',
      technique: 'Gentle Deep Breathing & Balanced Nostril Breath',
      outcome: 'Immediate Calm & Natural Balance',
      desc: 'Gentle, paced breathing techniques that naturally calm your system and bring your mind and body back into balance.',
      inSession: 'Personalized gentle breathing (like the 4-7-8 and balanced rhythm) designed to quickly bring peace and steady calm.'
    },
    {
      num: '05',
      category: 'breath',
            name: 'Chakra Meditation',
      technique: '7 Energy Centers Sound & Light Focus',
      outcome: 'Smooth Energy Flow & Inner Light',
      desc: 'Bringing harmony and ease to your body’s seven main energy points through calm attention, breath, and visualization.',
      inSession: 'Step-by-step vibrational focus from bottom to top, easing blockages and refreshing stagnant energy in the body.'
    },
    {
      num: '06',
      category: 'breath',
            name: 'Five Elements Alignment',
      technique: 'Five Elements Natural Balancing',
      outcome: 'Feeling Grounded, Whole & Steady',
      desc: 'Balancing earth, water, fire, air, and space within yourself to quiet overthinking and renew your natural life force.',
      inSession: 'Helps cool down burnout and soothe scattered, restless thoughts, restoring a healthy, grounded sense of ease.'
    },
    {
      num: '07',
      category: 'heart',
            name: 'Love & Compassion',
      technique: 'Loving Kindness & Heart Harmony',
      outcome: 'Letting Go of Self-Doubt & Finding Warmth',
      desc: 'Softening self-criticism, nurturing genuine self-kindness, and bringing back natural emotional warmth.',
      inSession: 'Gently eases lingering emotional tension, creating a feeling of safe, compassionate peace.'
    },
    {
      num: '08',
      category: 'heart',
            name: 'Visualization',
      technique: 'Peaceful Mental Imagery & Gentle Body Scan',
      outcome: 'Clear Vision & Deep Inner Peace',
      desc: 'Calming, uplifting mental pictures that help guide your mind away from stress and into deep comfort, safety, and clarity.',
      inSession: 'Helps guide your mind to replace ongoing worry with deep, restorative relaxation and security.'
    },
    {
      num: '09',
      category: 'heart',
            name: 'Gratitude & Forgiveness',
      technique: 'Heartfelt Forgiveness & Emotional Lightness',
      outcome: 'Deep Freedom & Peaceful Clarity',
      desc: 'Letting go of lingering grievances, old grudges, and heavy feelings to feel free, peaceful, and unburdened inside.',
      inSession: 'Allows you to lay down heavy burdens and let go of past hurts without needing to relive painful memories.'
    }
  ]
};

const defaultChapters = [
  { id: 'chapter-1', title: 'Threshold & Story' },
  { id: 'chapter-pillars', title: 'Science × Meditation × Spirit' },
  { id: 'chapter-2', title: 'The Dual Lens' },
  { id: 'chapter-3', title: 'Inner State Navigator' },
  { id: 'chapter-benefits', title: 'Real & Deep Benefits' },
  { id: 'chapter-4', title: 'Core Differentiators' },
  { id: 'chapter-5', title: 'Cinematic Stillness' },
  { id: 'chapter-6', title: 'Paths to Inner Balance' },
  { id: 'chapter-7', title: 'Session Formats' },
  { id: 'chapter-8', title: 'Culmination' }
];

export default function About({ onOpenConsultation }) {
  const { content, t } = useContent();
  const { currentLang } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0, rootMargin: '100px', once: true });

  // Interactive Chapter & Focus State Hooks
  const [activeChapter, setActiveChapter] = useState('chapter-1');
  const [activeLens, setActiveLens] = useState('science'); // 'science' | 'spirit' | 'synthesis'
  const [expandedLensId, setExpandedLensId] = useState(null);
  const [activeState, setActiveState] = useState('stress');
  const [expandedStateId, setExpandedStateId] = useState('stress');
  const [hoveredStatePill, setHoveredStatePill] = useState(null);
  const [activeDimension, setActiveDimension] = useState('all'); // 'all' | 'physical' | 'emotional' | 'mental' | 'spiritual'
  const [activePathCategory, setActivePathCategory] = useState('all'); // 'all' | 'stillness' | 'breath' | 'heart'
  const [showComplementaryAreas, setShowComplementaryAreas] = useState(false);
  const [hoveredArea, setHoveredArea] = useState(null);
  const [expandedDiff, setExpandedDiff] = useState(null);
  const [expandedBenefitId, setExpandedBenefitId] = useState(null);
  const [expandedPathNum, setExpandedPathNum] = useState(null);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const [hoveredPath, setHoveredPath] = useState(null);

  // Content extraction
  const aboutData = content?.about || {};
  const philosophy = aboutData.philosophyDetailed || content?.philosophy || {};
  const medicalBg = aboutData.medicalBackground || {};
  const spiritualJourney = aboutData.spiritualJourney || {};
  const differentiators = aboutData.differentiators || {};
  const deepBenefitsData = aboutData.deepBenefits || defaultDeepBenefits;
  const meditationPathsData = aboutData.meditationPaths || defaultMeditationPaths;

  const chapters = aboutData.chapters || defaultChapters;
  const protocolPresets = aboutData.protocolPresets || defaultProtocolPresets;
  const dualLens = aboutData.dualLens || {};
  const ui = aboutData.ui || {};

  const stats = aboutData.stats || [
    { num: '15+', label: 'Years in Energy & Meditation Practices' },
    { num: '9', label: 'Curated Meditative Paths' },
    { num: '100%', label: 'Tailored 1:1 Sanctuary Guidance' }
  ];

  const areas = aboutData.areas || [];
  const approaches = aboutData.approaches || [];
  const goal = aboutData.goal || {};

  const selectedProtocol = protocolPresets[activeState] || protocolPresets.stress || defaultProtocolPresets.stress;

  // Track scroll position to update active chapter indicator on the journey rail
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveChapter(chapters[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToChapter = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -80, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="about" className={styles.section} aria-label="About Dr. Mayank Ahooja">
      {/* ═══════════════════════════════════════════
          SUBTLE FLOATING JOURNEY RAIL (DESKTOP)
          ═══════════════════════════════════════════ */}
      <nav className={styles.journeyRail} aria-label="About Page Chapters">
        <div className={styles.railTrack}>
          <div 
            className={styles.railThumb} 
            style={{ 
              top: `${(chapters.findIndex(c => c.id === activeChapter) / (chapters.length - 1)) * 116}px` 
            }}
          />
        </div>
        <div className={styles.railMilestones}>
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              type="button"
              className={`${styles.railNode} ${activeChapter === ch.id ? styles.railNodeActive : ''}`}
              onClick={() => scrollToChapter(ch.id)}
              aria-label={`Jump to ${ch.title}`}
            >
              <span className={styles.railTooltip}>{`${idx + 1}. ${ch.title}`}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className={styles.container} ref={ref}>

        {/* ═══════════════════════════════════════════
            CHAPTER 1: HERO & PRACTITIONER THRESHOLD
            ═══════════════════════════════════════════ */}
        <section id="chapter-1" className={styles.heroThreshold}>
          <div className={styles.grid}>
            {/* Left Column: Personal Narrative, Experience & Quote */}
            <motion.div
              className={styles.contentCol}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <span className={styles.tag}>
                <span>{aboutData.tag || 'ABOUT DR. MAYANK AHOOJA'}</span>
              </span>
              <h1 className={styles.headline}>
                {aboutData.headline || 'Doctor of Medicine | Meditation Master | Spiritual Coach | Motivational Speaker'}
              </h1>
              <p className={styles.lead}>
                {aboutData.lead || 'Dedicated to helping individuals explore greater calmness, balance, self-awareness, and inner harmony.'}
              </p>
              <p className={styles.body}>{aboutData.bio1}</p>
              <p className={styles.body}>{aboutData.bio2}</p>
              <p className={styles.body}>{aboutData.bio3}</p>

              {/* Personal Quote Callout */}
              {aboutData.personalQuote && (
                <motion.div 
                  className={styles.personalQuoteBox}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  "{aboutData.personalQuote}"
                </motion.div>
              )}

              {/* Verified Credentials Stats */}
              <div className={styles.statsRow}>
                {stats.map((stat, idx) => (
                  <div key={idx} className={styles.statItem}>
                    <span className={styles.statNum}>{stat.num}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Floating Practitioner Arch Card with Soft Purple/Gold Aura */}
            <motion.div
              className={styles.visualCol}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              <div className={styles.visualAmbientGlow} />

              <div className={`${styles.sanctuaryCard} ${styles.auraCard}`}>
                <div className={styles.innerArch}>
                  <img 
                    src={content?.brand?.profileImage || '/images/profile/1791092487681_20190710_082214.jpg'} 
                    alt={content?.brand?.name || 'Dr. Mayank Ahooja'} 
                    className={styles.practitionerPhoto}
                    loading="eager"
                  />
                </div>
                <div className={styles.cardFooter}>
                  <span className={styles.practitionerName}>
                    {content?.brand?.name || 'Dr. Mayank Ahooja'}
                  </span>
                  <span className={styles.practitionerTitle}>
                    {content?.brand?.title || 'Doctor of Medicine | Meditation Master | Spiritual Coach'}
                  </span>

                  {/* Trust Badges */}
                  <div className={styles.cardBadgeRow}>
                    <span className={styles.badgePill}>{ui.badgeDoctor || 'Doctor of Medicine (M.D.)'}</span>
                    <span className={styles.badgePill}>{ui.badgeMaster || '15+ Yrs Meditation Master'}</span>
                    <span className={styles.badgePill}>{ui.badgePrivate || '1:1 Private Guidance'}</span>
                  </div>

                  {/* Direct Action Button */}
                  <button
                    type="button"
                    className={styles.cardCtaBtn}
                    onClick={() => onOpenConsultation && onOpenConsultation()}
                  >
                    <span>{ui.bookSessionWithDr || t('nav.cta', 'Book a Personal 1:1 Session')}</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Invitation Indicator */}
          <div 
            className={styles.heroScrollHint} 
            onClick={() => scrollToChapter('chapter-pillars')}
            role="button"
            tabIndex={0}
            aria-label="Scroll down to The Three Pillars"
          >
            <div className={styles.scrollMouseIcon}>
              <div className={styles.scrollMouseDot} />
            </div>
            <span>{ui.scrollExplore || 'Scroll to Explore The Journey'}</span>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            CONCEPTUAL FOUNDATION: SCIENCE × MEDITATION × SPIRIT
            ═══════════════════════════════════════════ */}
        <div id="chapter-pillars">
          <ThreePillarsJourney />
        </div>

        {/* ═══════════════════════════════════════════
            CHAPTER 2: THE DUAL LENS (INTERACTIVE TABS)
            ═══════════════════════════════════════════ */}
        {/* ═══════════════════════════════════════════
            CHAPTER 2: THE DUAL LENS (INTERACTIVE LUXURY CARDS)
            ═══════════════════════════════════════════ */}
        <section id="chapter-2" style={{ paddingTop: '2.5rem' }}>
          <motion.div
            className={styles.chapterHeader}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <span className={styles.tag}>
              <span>{dualLens.tag || 'CHAPTER II • SCIENCE & CONTEMPLATIVE MASTERY'}</span>
            </span>
            <h2 className={styles.chapterTitle}>{dualLens.title || 'The Dual Lens: Science Meets Stillness'}</h2>
            <p className={styles.chapterSubtitle}>
              {dualLens.subtitle || 'A rare foundation uniting grounded scientific understanding with 15+ years of authentic ancient contemplative mastery.'}
            </p>
          </motion.div>

          {/* 2-Column Luxury Cards for The Two Pillars */}
          <div className={styles.dualLensGrid}>
            {/* Card 01: Clinical Physician (The Science) */}
            <article className={styles.luxuryPillarCard}>
              <div className={styles.pillarCardMain}>
                <div className={styles.pillarCardContent}>
                  <div className={styles.pillarTopRow}>
                    <span className={styles.pillarBadge}>{dualLens.badgeDoctor || 'PRACTICAL SCIENCE'}</span>
                  </div>

                  <h3 className={styles.pillarCardTitle}>{dualLens.card1Title || 'Doctor of Medicine (M.D.)'}</h3>
                  <p className={styles.pillarCardDesc}>
                    {dualLens.card1Desc || 'Scientific foundation understanding stress patterns, breathing, and how the body responds to everyday pressure.'}
                  </p>

                  <div className={styles.pillarChipRow}>
                    {(dualLens.card1Chips || ['Mind-Body Connection', 'Natural Calming Reflex', 'Deep Rest & Sleep Habits']).map((chip, idx) => (
                      <span key={idx} className={styles.pillarChip}>{chip}</span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={styles.pillarExpandBtn}
                    onClick={() => setExpandedLensId(expandedLensId === 'science' ? null : 'science')}
                    aria-expanded={expandedLensId === 'science'}
                  >
                    <span>{expandedLensId === 'science' ? (dualLens.card1Collapse || 'Hide how the body responds') : (dualLens.card1Expand || 'Explore how the body responds')}</span>
                    <span>{expandedLensId === 'science' ? '↑' : '→'}</span>
                  </button>
                </div>

                <div className={styles.pillarArchWindow}>
                  <img
                    src="/pillars-phase1-science.png"
                    alt={dualLens.card1Title || "Doctor of Medicine Understanding the Body"}
                    className={styles.pillarArchImg}
                    loading="eager"
                  />
                </div>
              </div>

              <AnimatePresence>
                {expandedLensId === 'science' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.pillarDrawer}
                  >
                    <div className={styles.drawerInsightItem}>
                      <div>
                        <strong>{dualLens.card1Insight1Title || 'Personal Understanding:'}</strong> {dualLens.card1Insight1Desc || 'Looking closely at how everyday stress, fatigue, and muscle tension build up in your body.'}
                      </div>
                    </div>
                    <div className={styles.drawerInsightItem}>
                      <div>
                        <strong>{dualLens.card1Insight2Title || 'Natural Reset:'}</strong> {dualLens.card1Insight2Desc || "Calming overactive stress reactions and supporting your body's natural ability to rest, digest, and feel refreshed."}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={styles.pillarCardBottom}>
                <span className={styles.pillarFormatText}>{dualLens.card1FooterFormat || 'Grounded, Evidence-Informed Framework'}</span>
                <button
                  type="button"
                  className={styles.pillarActionBtn}
                  onClick={() => onOpenConsultation && onOpenConsultation()}
                >
                  <span>{dualLens.experienceSession || 'Experience in 1:1 Session'}</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </article>

            {/* Card 02: Meditation Master (The Spirit) */}
            <article className={styles.luxuryPillarCard}>
              <div className={styles.pillarCardMain}>
                <div className={styles.pillarCardContent}>
                  <div className={styles.pillarTopRow}>
                    <span className={styles.pillarBadge}>{dualLens.badgeMaster || '15+ YEARS MASTERY'}</span>
                  </div>

                  <h3 className={styles.pillarCardTitle}>{dualLens.card2Title || 'Meditation Master & Spiritual Journey'}</h3>
                  <p className={styles.pillarCardDesc}>
                    {dualLens.card2Desc || 'Over 15 years immersed in ancient contemplative traditions, mastering authentic breathwork, acoustic resonance, and subtle bio-energetic alignment.'}
                  </p>

                  <div className={styles.pillarChipRow}>
                    {(dualLens.card2Chips || ['Pranayama Breathwork', '7-Chakra Frequency', 'Vibrational Sound Resonance']).map((chip, idx) => (
                      <span key={idx} className={styles.pillarChip}>{chip}</span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className={styles.pillarExpandBtn}
                    onClick={() => setExpandedLensId(expandedLensId === 'spirit' ? null : 'spirit')}
                    aria-expanded={expandedLensId === 'spirit'}
                  >
                    <span>{expandedLensId === 'spirit' ? (dualLens.card2Collapse || 'Hide contemplative traditions') : (dualLens.card2Expand || 'Explore contemplative traditions')}</span>
                    <span>{expandedLensId === 'spirit' ? '↑' : '→'}</span>
                  </button>
                </div>

                <div className={styles.pillarArchWindow}>
                  <img
                    src="/service-sky.jpg"
                    alt={dualLens.card2Title || "Contemplative Master and Spiritual Journey"}
                    className={styles.pillarArchImg}
                    loading="eager"
                  />
                </div>
              </div>

              <AnimatePresence>
                {expandedLensId === 'spirit' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.pillarDrawer}
                  >
                    <div className={styles.drawerInsightItem}>
                      <div>
                        <strong>{dualLens.card2Insight1Title || 'Subtle Energy Awakening:'}</strong> {dualLens.card2Insight1Desc || 'Clearing stagnant energetic patterns from root to crown via sacred acoustic resonance, visualization, and breath.'}
                      </div>
                    </div>
                    <div className={styles.drawerInsightItem}>
                      <div>
                        <strong>{dualLens.card2Insight2Title || 'Pure Witness Presence:'}</strong> {dualLens.card2Insight2Desc || 'Quieting continuous mental chatter to access direct stillness, emotional balance, and unshakeable inner peace.'}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className={styles.pillarCardBottom}>
                <span className={styles.pillarFormatText}>{dualLens.card2FooterFormat || 'Authentic Lineage & Direct Practice'}</span>
                <button
                  type="button"
                  className={styles.pillarActionBtn}
                  onClick={() => onOpenConsultation && onOpenConsultation()}
                >
                  <span>{dualLens.experienceSession || 'Experience in 1:1 Session'}</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </article>
          </div>

          {/* Full Width Card 03: The Unified 1:1 Synthesis */}
          <article className={styles.luxurySynthesisCard}>
            <div className={styles.synthesisMain}>
              <div className={styles.synthesisLeftContent}>
                <div className={styles.pillarTopRow}>
                  <span className={styles.pillarBadge}>{dualLens.card3Badge || 'BESPOKE 1:1 SANCTUARY'}</span>
                </div>

                <h3 className={styles.synthesisTitle}>{dualLens.card3Title || 'How Science and Stillness Meet in Your Session'}</h3>
                <p className={styles.synthesisDesc}>
                  {dualLens.card3Desc || 'In your personal session with Dr. Mayank, you never have to separate the physical body from the spirit. We look at where your body is holding tension and apply gentle, time-tested practices to bring your mind and body into peaceful harmony.'}
                </p>

                <div className={styles.synthesisStepsRow}>
                  {(dualLens.card3Steps || [
                    { heading: 'Attentive Listening', body: 'Listening with warmth and clarity, understanding where tension is held in your mind, emotions, or body.' },
                    { heading: 'Personalized Practices', body: 'Guided through gentle breathing exercises, calming sound, and energy balancing shaped around your needs.' },
                    { heading: 'Daily Life Habits', body: 'Creating simple 5-minute daily habits so the peace you feel stays with you throughout your everyday life.' }
                  ]).map((st, sIdx) => (
                    <div key={sIdx} className={styles.synthesisStepItem}>
                      <h4 className={styles.synthesisStepHeading}>{st.heading}</h4>
                      <p className={styles.synthesisStepBody}>{st.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.synthesisArchWindow}>
                <img
                  src="/pillars-phase4-convergence.jpg"
                  alt={dualLens.card3Title || "The Unified Synthesis Sanctuary"}
                  className={styles.pillarArchImg}
                  loading="eager"
                />
              </div>
            </div>

            <div className={styles.pillarCardBottom}>
              <span className={styles.pillarFormatText}>{dualLens.card3FooterFormat || 'Completely Personalized 1:1 Guidance & Immersion'}</span>
              <button
                type="button"
                className={styles.synthesisCtaBtn}
                onClick={() => onOpenConsultation && onOpenConsultation()}
              >
                <span>{dualLens.card3Cta || 'Book a Personal 1:1 Session'}</span>
                <span>&rarr;</span>
              </button>
            </div>
          </article>
        </section>

        {/* ═══════════════════════════════════════════
            CHAPTER 3: INNER STATE NAVIGATOR (INTERACTIVE 4-CARD LUXURY GRID)
            ═══════════════════════════════════════════ */}
        <section id="chapter-3" style={{ paddingTop: '2.5rem' }}>
          <motion.div
            className={styles.chapterHeader}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <span className={styles.tag}>
              <span>{ui.navigatorTag || 'CHAPTER III • INTERACTIVE STATE NAVIGATOR'}</span>
            </span>
            <h2 className={styles.chapterTitle}>{ui.navigatorTitle || 'What Are You Feeling Right Now?'}</h2>
            <p className={styles.chapterSubtitle}>
              {ui.navigatorSubtitle || "Select any state to explore how Dr. Mayank's unique blend of clear science and peaceful meditation guides you back to steady balance:"}
            </p>
          </motion.div>

          <div className={styles.stateGrid}>
            {Object.values(protocolPresets).map((preset) => {
              const isExpanded = expandedStateId === preset.id;
              return (
                <article
                  key={preset.id}
                  className={`${styles.luxuryStateCard} ${isExpanded ? styles.luxuryStateCardActive : ''}`}
                >
                  <div className={styles.stateCardMain}>
                    <div className={styles.stateCardContent}>
                      <div className={styles.stateTopRow}>
                        <span className={styles.stateCardNum}>{preset.num}</span>
                        <span className={styles.stateBadge}>{preset.duration}</span>
                      </div>

                      <h3 className={styles.stateCardTitle}>
                        <span>{preset.label}</span>
                      </h3>
                      
                      <div className={styles.stateTargetPill}>
                        <span className={styles.stateTargetDot} />
                        <span>{ui.rootFocus || 'Root Focus:'} {preset.target}</span>
                      </div>

                      <p className={styles.stateCardDesc}>{preset.shortDesc}</p>

                      {/* Visual Shift Gauge */}
                      <div className={styles.shiftGauge}>
                        <span className={styles.shiftBefore}>{preset.beforeState}</span>
                        <span className={styles.shiftArrow}>────&rarr;</span>
                        <span className={styles.shiftAfter}>{preset.afterState}</span>
                      </div>

                      <button
                        type="button"
                        className={styles.stateExpandBtn}
                        onClick={() => setExpandedStateId(isExpanded ? null : preset.id)}
                        aria-expanded={isExpanded}
                      >
                        <span>{isExpanded ? (ui.hideProtocol || 'Hide 3-phase protocol') : (ui.exploreProtocol || 'Explore 3-phase protocol')}</span>
                        <span>{isExpanded ? '↑' : '→'}</span>
                      </button>
                    </div>

                    <div className={styles.stateArchWindow}>
                      <img
                        src={preset.image}
                        alt={preset.label}
                        className={styles.stateArchImg}
                        loading="eager"
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className={styles.stateDrawer}
                      >
                        <div className={styles.protocolColumns}>
                          <div className={styles.protocolCol}>
                            <div className={styles.protocolColTitle}>
                              <span className={styles.protocolColTitleText}>{ui.step1Title || '1. What Is Happening'}</span>
                            </div>
                            <p className={styles.protocolColText}>{preset.medicalInsight}</p>
                          </div>

                          <div className={styles.protocolCol}>
                            <div className={styles.protocolColTitle}>
                              <span className={styles.protocolColTitleText}>{ui.step2Title || "2. Dr. Mayank's Reset"}</span>
                            </div>
                            <p className={styles.protocolColText}>{preset.spiritualApproach}</p>
                          </div>

                          <div className={styles.protocolCol}>
                            <div className={styles.protocolColTitle}>
                              <span className={styles.protocolColTitleText}>{ui.step3Title || '3. What You Experience'}</span>
                            </div>
                            <p className={styles.protocolColText}>{preset.transformation}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className={styles.stateCardBottom}>
                    <span className={styles.stateFormatText}>{preset.format}</span>
                    <button
                      type="button"
                      className={styles.stateActionBtn}
                      onClick={() => onOpenConsultation && onOpenConsultation()}
                    >
                      <span>{ui.experienceInSession || 'Experience in 1:1 Session'}</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            MULTIDIMENSIONAL RELIEF: REAL AND DEEP BENEFITS
            ═══════════════════════════════════════════ */}
        <section id="chapter-benefits" style={{ paddingTop: '1.5rem', marginBottom: 'clamp(3.5rem, 5.5vw, 5.5rem)' }}>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className={styles.chapterHeader}>
              <span className={styles.tag}>
                <span>{deepBenefitsData.tag || 'MULTIDIMENSIONAL RELIEF'}</span>
              </span>
              <h2 className={styles.chapterTitle}>
                {deepBenefitsData.title || 'Real and Deep Benefits'}
              </h2>
              <p className={styles.chapterSubtitle}>
                {deepBenefitsData.quote || 'This energetic technique works on multiple levels simultaneously (physical, emotional, mental, and spiritual), providing relief and healing in various situations.'}
              </p>

              {/* Dimension Filter Tabs */}
              <div className={styles.dimensionFilterRow} role="tablist">
                {[
                  { id: 'all', label: ui.dimensionAll || 'All Levels' },
                  { id: 'physical', label: ui.dimensionPhysical || 'Physical Level' },
                  { id: 'emotional', label: ui.dimensionEmotional || 'Emotional Level' },
                  { id: 'mental', label: ui.dimensionMental || 'Mental Level' },
                  { id: 'spiritual', label: ui.dimensionSpiritual || 'Spiritual Level' },
                ].map((dim) => (
                  <button
                    key={dim.id}
                    type="button"
                    role="tab"
                    aria-selected={activeDimension === dim.id}
                    className={`${styles.dimensionFilterBtn} ${activeDimension === dim.id ? styles.dimensionFilterBtnActive : ''}`}
                    onClick={() => setActiveDimension(dim.id)}
                  >
                    <span>{dim.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Benefits Grid */}
            <div className={styles.deepBenefitsGrid}>
              {deepBenefitsData.items
                .filter(item => activeDimension === 'all' || item.dimension === activeDimension)
                .map((benefit, idx) => {
                  const isExpanded = expandedBenefitId === benefit.id;
                  const isDimmed = hoveredBenefit && hoveredBenefit !== benefit.id;

                  return (
                    <motion.div
                      key={benefit.id || `benefit-${idx}`}
                      className={`${styles.benefitCard} ${isExpanded ? styles.benefitCardExpanded : ''} ${isDimmed ? styles.cardDimmed : ''}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.04 }}
                      whileHover={{ y: -6 }}
                      onMouseEnter={() => setHoveredBenefit(benefit.id)}
                      onMouseLeave={() => setHoveredBenefit(null)}
                      onClick={() => setExpandedBenefitId(isExpanded ? null : benefit.id)}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isExpanded}
                    >
                      {/* Top Ambient Hairline Glow */}
                      <div className={styles.cardAuraGlow} />

                      <div className={styles.benefitCardContent}>
                        {/* Header: Dimension Level Badge */}
                        <div className={styles.benefitCardTop}>
                          <span className={styles.benefitLevelBadge}>{benefit.levelBadge}</span>
                        </div>

                        {/* Title & Body */}
                        <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                        <p className={styles.benefitDesc}>{benefit.desc}</p>

                        {/* Target Marker Pill */}
                        {benefit.target && (
                          <div className={styles.benefitTargetPill}>
                            <span className={styles.benefitTargetDot} />
                            <span className={styles.benefitTargetText}>Focus: {benefit.target}</span>
                          </div>
                        )}

                        {/* Quote / Sensation Pill */}
                        {(benefit.quote || benefit.highlightQuote) && (
                          <div className={styles.benefitQuoteBox}>
                            <span className={styles.quoteText}>"{benefit.quote || benefit.highlightQuote}"</span>
                          </div>
                        )}
                      </div>

                      {/* Interactive Bottom Control Bar */}
                      <div className={styles.benefitCardFooter}>
                        <div className={styles.benefitExpandPrompt}>
                          <span>{isExpanded ? 'Hide how this works' : 'Explore how this works'}</span>
                          <span className={styles.expandChevron}>{isExpanded ? '▲' : '▼'}</span>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className={styles.benefitExpandedDrawer}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className={styles.benefitDrawerTag}>{ui.benefitDrawerTag || 'How Dr. Mayank Applies This:'}</div>
                              <p className={styles.benefitDrawerDesc}>{benefit.clinicalShift}</p>
                              <button
                                type="button"
                                className={styles.benefitDrawerCta}
                                onClick={() => onOpenConsultation && onOpenConsultation()}
                              >
                                <span>{ui.benefitDrawerCta || 'Experience This in Your Session'}</span>
                                <span>&rarr;</span>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
            </div>

            {/* Reassurance Banner */}
            <div className={styles.benefitsSummaryBanner}>
              <div className={styles.benefitsSummaryText}>
                <strong>{ui.benefitsBannerShift || 'Noticeable, Natural Shift:'}</strong> {ui.benefitsBannerText || 'From the first session, an unblocking is felt and natural vitality begins to flow fluidly again.'}
              </div>
              <button
                type="button"
                className={styles.protocolBookingBtn}
                onClick={() => onOpenConsultation && onOpenConsultation()}
              >
                <span>{ui.benefitsBannerCta || 'Experience Multidimensional Relief'}</span>
                <span>&rarr;</span>
              </button>
            </div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            CHAPTER 4: WHAT MAKES HIS APPROACH DIFFERENT
            ═══════════════════════════════════════════ */}
        {differentiators.items && differentiators.items.length > 0 && (
          <section id="chapter-4" className={styles.differentiatorsSection}>
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className={styles.chapterHeader}>
                <span className={styles.tag}>
                  <span>{differentiators.tag || 'CHAPTER IV • WHY WORK WITH DR. MAYANK'}</span>
                </span>
                <h2 className={styles.chapterTitle}>
                  {differentiators.title || 'What Makes His Approach Different'}
                </h2>
                <p className={styles.chapterSubtitle}>
                  {differentiators.subtitle || 'A unique bridge connecting everyday science with time-tested meditation and inner balance.'}
                </p>
              </div>

              <div className={styles.differentiatorsGrid}>
                {differentiators.items.map((item, idx) => {
                  const isExpanded = expandedDiff === idx;
                  return (
                    <motion.div 
                      key={idx} 
                      className={styles.diffCard} 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.05 }}
                      whileHover={{ y: -4 }}
                    >
                      {item.tag && (
                        <div className={styles.diffTag}>
                          <span>{item.tag}</span>
                        </div>
                      )}
                      <h3 className={styles.diffTitle}>{item.title}</h3>
                      <p className={styles.diffDesc}>{item.desc}</p>

                      <button
                        type="button"
                        className={styles.diffExpandBtn}
                        onClick={() => setExpandedDiff(isExpanded ? null : idx)}
                        aria-expanded={isExpanded}
                      >
                        <span>{isExpanded ? (ui.diffShowLess || 'Show less') : (ui.diffDiscoverWhy || 'Discover why it matters')}</span>
                        <span>{isExpanded ? '↑' : '→'}</span>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className={styles.diffDeepInsight}
                          >
                            {ui.diffInsights?.[idx] || (
                              idx === 0 ? "Instead of just coping with stress on the surface or sitting in confusion, you discover how your mind, body, and breath work together in harmony." :
                              idx === 1 ? "You never have to follow strict rituals or complicated rules. Every practice works because your body is naturally wired to calm down." :
                              idx === 2 ? "No generic audio tracks or standard routines. Dr. Mayank tunes your session precisely to where you are holding tension today." :
                              "You are guided to become the master of your own peace, retaining simple 5-minute techniques you can use for the rest of your life."
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            CHAPTER 5: CINEMATIC EMOTIONAL PAUSE (STILLNESS)
            ═══════════════════════════════════════════ */}
        <section id="chapter-5">
          <motion.div
            className={styles.cinematicPauseSection}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className={styles.cinematicAura} />
            <div className={styles.cinematicTag}>
              <span>CHAPTER V • THE FIVE PILLARS OF STILLNESS</span>
            </div>
            <div className={styles.cinematicWords}>
              Calmness • Well-being • Balance • Harmony • Happiness
            </div>
            <p className={styles.cinematicText}>
              {goal.text || 'The overall approach is centered around helping individuals slow down, reconnect with themselves, develop awareness and cultivate greater calmness, balance, harmony and well-being.'}
            </p>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            CHAPTER 6: 9 PATHS TO NATURAL INNER BALANCE
            ═══════════════════════════════════════════ */}
        <section id="chapter-6" className={styles.meditationPathsSection}>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className={styles.chapterHeader}>
              <span className={styles.tag}>
                <span>CHAPTER VI • {meditationPathsData.tag || 'MY APPROACH'}</span>
              </span>
              <h2 className={styles.chapterTitle}>
                {meditationPathsData.title || 'Paths to Your Natural Inner Balance'}
              </h2>
              <p className={styles.chapterSubtitle}>
                {meditationPathsData.subtitle || 'A curated combination of ancient wisdom of meditations & breathwork with modern lifestyle for inner balance of body, mind & work.'}
              </p>

              {/* Meditative Paths Category Filter */}
              <div className={styles.pathsFilterRow} role="tablist">
                {[
                  { id: 'all', label: ui.pathsFilterAll || 'All 9 Meditative Paths' },
                  { id: 'stillness', label: ui.pathsFilterStillness || 'Stillness & Concentration' },
                  { id: 'breath', label: ui.pathsFilterBreath || 'Breathwork & Elemental Prana' },
                  { id: 'heart', label: ui.pathsFilterHeart || 'Heart, Compassion & Release' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={activePathCategory === cat.id}
                    className={`${styles.pathsFilterBtn} ${activePathCategory === cat.id ? styles.pathsFilterBtnActive : ''}`}
                    onClick={() => setActivePathCategory(cat.id)}
                  >
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 9 Meditations Grid */}
            <div className={styles.pathsGrid}>
              {meditationPathsData.items
                .filter(item => activePathCategory === 'all' || item.category === activePathCategory)
                .map((path, idx) => {
                  const isExpanded = expandedPathNum === path.num;
                  const isDimmed = hoveredPath && hoveredPath !== path.num;

                  return (
                    <motion.div
                      key={path.num || `path-${idx}`}
                      className={`${styles.pathCard} ${isExpanded ? styles.pathCardExpanded : ''} ${isDimmed ? styles.cardDimmed : ''}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.04 }}
                      whileHover={{ y: -6 }}
                      onMouseEnter={() => setHoveredPath(path.num)}
                      onMouseLeave={() => setHoveredPath(null)}
                      onClick={() => setExpandedPathNum(isExpanded ? null : path.num)}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isExpanded}
                    >
                      {/* Ambient Halo Glow */}
                      <div className={styles.cardAuraGlow} />

                      <div className={styles.pathCardContent}>
                        {/* Header: Numeral */}
                        <div className={styles.pathCardTop}>
                          <div className={styles.pathNumGroup}>
                            <span className={styles.pathNum}>{path.num}</span>
                            <span className={styles.pathCategoryTag}>{path.category}</span>
                          </div>
                        </div>

                        {/* Title & Core Description */}
                        <h3 className={styles.pathName}>{path.name}</h3>
                        <p className={styles.pathDesc}>{path.desc}</p>

                        {/* Mastery Specs Grid */}
                        {(path.technique || path.outcome) && (
                          <div className={styles.pathSpecsGrid}>
                            {path.technique && (
                              <div className={styles.pathSpecItem}>
                                <span className={styles.pathSpecLabel}>{ui.pathsTechniqueLabel || 'Technique'}</span>
                                <span className={styles.pathSpecVal}>{path.technique}</span>
                              </div>
                            )}
                            {path.outcome && (
                              <div className={styles.pathSpecItem}>
                                <span className={styles.pathSpecLabel}>{ui.pathsShiftLabel || 'Primary Shift'}</span>
                                <span className={styles.pathSpecVal}>{path.outcome}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Interactive Bottom Control Bar */}
                      <div className={styles.pathCardFooter}>
                        {/* Subtle Meditative Wave Pulse Indicator */}
                        <div className={styles.breathPulseRow}>
                          <span className={styles.breathPulseDot} />
                          <span className={styles.breathPulseTrack} />
                        </div>

                        <div className={styles.pathExpandPrompt}>
                          <span>{isExpanded ? (ui.pathsHidePrompt || 'Hide session guidance') : (ui.pathsExpandPrompt || 'In-session practice guidance')}</span>
                          <span className={styles.expandChevron}>{isExpanded ? '▲' : '▼'}</span>
                        </div>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className={styles.pathExpandedDrawer}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className={styles.pathDrawerTag}>{ui.pathsInSessionLabel || '1:1 Sanctuary Guidance:'}</div>
                              <p className={styles.pathDrawerDesc}>{path.inSession}</p>
                              <button
                                type="button"
                                className={styles.pathDrawerCta}
                                onClick={() => onOpenConsultation && onOpenConsultation()}
                              >
                                <span>{ui.pathsRequestInSession || 'Request This in Your Session'}</span>
                                <span>&rarr;</span>
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  );
                })}
            </div>

            {/* Complementary Modalities Toggle */}
            {areas.length > 0 && (
              <div className={styles.complementaryToggleRow}>
                <button
                  type="button"
                  className={styles.complementaryToggleBtn}
                  onClick={() => setShowComplementaryAreas(!showComplementaryAreas)}
                  aria-expanded={showComplementaryAreas}
                >
                  <span>{showComplementaryAreas ? (ui.pathsCollapse8 || 'Collapse 8 Mindful Practices') : (ui.pathsExplore8 || 'Explore 8 Mindful Practices')}</span>
                </button>
              </div>
            )}

            {/* Expandable Complementary Areas */}
            <AnimatePresence>
              {showComplementaryAreas && areas.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{ overflow: 'hidden', marginTop: '2rem' }}
                >
                  <div className={styles.areasGrid}>
                    {areas.map((area, aIdx) => {
                      const isDimmed = hoveredArea && hoveredArea !== area.id;
                      return (
                        <motion.div
                          key={area.id}
                          className={`${styles.areaCard} ${isDimmed ? styles.areaCardDimmed : ''}`}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: aIdx * 0.04 }}
                          whileHover={{ y: -4 }}
                          onMouseEnter={() => setHoveredArea(area.id)}
                          onMouseLeave={() => setHoveredArea(null)}
                        >
                          <h3 className={styles.areaTitle}>{area.title}</h3>
                          <p className={styles.areaDesc}>{area.desc}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            CHAPTER 7: STRUCTURED SESSION FORMATS
            ═══════════════════════════════════════════ */}
        {approaches.length > 0 && (
          <section id="chapter-7" className={styles.approachesSection}>
            <motion.div
              variants={stagger}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <div className={styles.chapterHeader}>
                <span className={styles.tag}>
                  <span>CHAPTER VII • COLLABORATION</span>
                </span>
                <h2 className={styles.chapterTitle}>
                  {aboutData.approachesTitle || 'How We Can Work Together'}
                </h2>
                <p className={styles.chapterSubtitle}>
                  {aboutData.approachesSubtitle || 'Structured session formats customized to your personal wellness journey'}
                </p>
              </div>

              <div className={styles.approachesGrid}>
                {approaches.map((app, idx) => (
                  <motion.div
                    key={app.id}
                    className={styles.approachCard}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    whileHover={{ y: -3 }}
                  >
                    <div>
                      <div className={styles.approachTop}>
                        <span className={styles.approachNum}>{app.num}</span>
                      </div>
                      <h3 className={styles.approachTitle}>{app.title}</h3>
                      <p className={styles.approachDesc}>{app.desc}</p>
                    </div>
                    <button
                      type="button"
                      className={styles.approachBtn}
                      onClick={() => onOpenConsultation && onOpenConsultation()}
                    >
                      {t('nav.cta', 'Book a Session')} &rarr;
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* ═══════════════════════════════════════════
            CHAPTER 8: CULMINATION & RETURN TO YOURSELF
            ═══════════════════════════════════════════ */}
        <section id="chapter-8">
          <motion.div
            className={styles.culminationSection}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className={styles.culminationQuoteMark}>❝</div>
            <span className={styles.tag} style={{ color: 'var(--gold-accent)' }}>
              <span>CHAPTER VIII • RETURN TO YOURSELF</span>
            </span>
            <h2 className={styles.culminationHeadline}>
              {philosophy.headline || 'Transformation Begins Within — Return to Yourself'}
            </h2>
            {philosophy.quote && (
              <p className={styles.culminationQuote}>
                "{philosophy.quote}"
              </p>
            )}
            <p className={styles.culminationText}>
              {philosophy.text || 'A meaningful journey toward balance begins with awareness of our thoughts, emotions, body, and inner self. Through meditation, mindfulness, breathing, and complementary wellness practices, individuals can create space for greater calmness, awareness, and harmony in everyday life.'}
            </p>

            {/* 3 Core Philosophy Pillars */}
            {philosophy.pillars && (
              <div className={styles.philosophyPillars}>
                {philosophy.pillars.map((pillar, idx) => (
                  <motion.div 
                    key={idx} 
                    className={styles.philosophyPillarCard}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className={styles.philosophyPillarTitle}>{pillar.title}</h3>
                    <p className={styles.philosophyPillarDesc}>{pillar.desc}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Grand Magnetic Call To Action */}
            <div className={styles.grandCtaBox}>
              <MagneticButton
                className={styles.magneticPrimaryBtn}
                onClick={() => onOpenConsultation && onOpenConsultation()}
              >
                <span>{ui.bookSessionWithDr || 'Book a Personal 1:1 Session with Dr. Mayank'}</span>
                <span>&rarr;</span>
              </MagneticButton>
            </div>
          </motion.div>
        </section>

        {/* Medical Safety Disclaimer */}
        <div className={styles.disclaimerBox}>
          {aboutData.disclaimer || `Disclaimer.

Holistic methods, such as energy, spiritual, and emotional healing, are intended to provide additional support for your well-being.
They do not aim to replace traditional medical, psychological, or other professional healthcare services. It should not be considered a substitute for medical or professional consultation.

We used the methods that can support your well-being, but it’s important to remember that every person is unique, and results may vary.
We always recommend that you trust your own judgment and, if you have any doubts, consult a healthcare professional. Our intention is to offer a comprehensive approach to health improvement, but we cannot guarantee specific results, as they depend on many personal factors.

INFORMED CONSENT
By participating in this wellness programme, you agree that you have read and understood the terms of this disclaimer. We appreciate your participation and encourage you to apply the knowledge you have gained responsibly and with respect for yourself and others.`}
        </div>

      </div>
    </section>
  );
}
