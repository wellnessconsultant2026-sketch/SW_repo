import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from '../../hooks/useInView';
import { fadeUp } from '../../lib/motion';
import styles from './AboutPreview.module.css';

const programTabsData = {
  clinical: {
    tag: 'PRACTICAL SCIENCE & UNDERSTANDING',
    title: 'Doctor of Medicine (M.D.)',
    subtitle: 'Clear Understanding of Mind, Brain & Body',
    body: 'Dr. Mayank brings a grounded scientific foundation, helping you understand how thoughts, stress, and daily habits directly affect the body. Every session is rooted in safety, clarity, and practical knowledge.',
    features: [
      {
        title: 'Evidence-based guidance',
        subtitle: 'Grounded in real science and practical mind-body wellness'
      },
      {
        title: 'Mind–body connection',
        subtitle: 'Connecting mental clarity with natural physical relaxation'
      },
      {
        title: 'Learn at your own pace',
        subtitle: 'Personalized guidance tailored around your daily schedule'
      }
    ],
    buttonText: 'Explore My Approach →',
    buttonLink: '/about',
    image: '/medical-curriculum-books.jpg',
    imageAlt: 'Medical curriculum textbooks and stethoscope',
    floatingBadge: 'Clear understanding. Meaningful growth. >'
  },
  meditation: {
    tag: 'MEDITATION & MINDFULNESS',
    title: 'Meditation Master & Mentor',
    subtitle: '15+ Years of Dedicated Mind Training',
    body: 'Going beyond quick fixes to share timeless meditation techniques, calming breath awareness, and deep inner stillness learned through 15+ years of dedicated practice.',
    features: [
      {
        title: 'Authentic Meditation',
        subtitle: 'Proven breathwork, mindfulness, and quiet contemplation'
      },
      {
        title: 'Natural Calm Reflex',
        subtitle: 'Encouraging your body’s natural relaxation response'
      },
      {
        title: 'Deep Mental Stillness',
        subtitle: 'Gently quieting repetitive stress and racing thoughts'
      }
    ],
    buttonText: 'Explore Meditation Sessions →',
    buttonLink: '/services',
    image: '/service-sky.jpg',
    imageAlt: 'Meditation and contemplative practice sanctuary',
    floatingBadge: 'Awaken awareness. Quiet your mind. >'
  },
  symbiosis: {
    tag: 'INTEGRATIVE WELLNESS',
    title: 'The Harmony Plan',
    subtitle: 'Harmonizing Mind, Body & Personal Energy',
    body: 'Bringing together clear scientific understanding and gentle energy practices. A personalized 1:1 journey that helps ease physical tiredness, emotional stress, and personal burnout.',
    features: [
      {
        title: 'Personal Wellness Map',
        subtitle: 'Understanding your unique stress patterns and energy flow'
      },
      {
        title: 'Releasing Everyday Tension',
        subtitle: 'Letting go of built-up pressure and physical stiffness'
      },
      {
        title: 'Lasting Independence',
        subtitle: 'Lifelong emotional autonomy is connected to lifestyle and regular practice.'
      }
    ],
    buttonText: 'Explore The Harmony Plan →',
    buttonLink: '/services',
    image: '/pillars-phase4-convergence.jpg',
    imageAlt: 'The Harmony convergence of science and spirituality',
    floatingBadge: 'Restore energy. Experience harmony. >'
  }
};

const symptomsData = {
  insomnia: {
    id: 'insomnia',
    label: 'Restful Sleep',
    image: '/symptom-insomnia.jpg',
    title: 'Restful Sleep & Calm Evenings',
    italicPremise: 'Better sleep habits. Natural relaxation. Refreshed daily energy.',
    paragraph: 'Busy days, late screens, and non-stop thoughts can leave you feeling restless at night. We guide mind and body into gentle, soothing rest with relaxing evening routines, calming breath, and peaceful bedroom habits.',
    checkmarks: [
      'Promotes deep, uninterrupted restorative sleep',
      'Calms evening racing thoughts and physical restlessness',
      'Builds soothing, sustainable pre-sleep rituals',
      'Restores natural sleep rhythms and helps you wake refreshed'
    ],
    experiences: [
      'Restless nights',
      'Difficulty falling asleep',
      'Racing bedtime thoughts',
      'Morning exhaustion',
      'Fragmented sleep',
      'Late-night wakefulness',
      'Daytime energy dips'
    ],
    approaches: [
      {
        title: 'Evening Rhythm',
        desc: 'Calming wind-down protocols that prepare mind and body for sleep.'
      },
      {
        title: 'Gentle Pranayama',
        desc: 'Soothing breathing to quiet the body and mind naturally.'
      },
      {
        title: 'Restorative Stillness',
        desc: 'Guided relaxation to unwind physical tension before sleep.'
      }
    ]
  },
  female: {
    id: 'female',
    label: "Women's Wellness",
    image: '/symptom-female-health.jpg',
    title: 'Self-Care, Balance & Vibrant Confidence',
    italicPremise: 'Nurture your rhythm. Reclaim confidence. Radiate inner balance.',
    paragraph: 'A compassionate, holistic approach supporting female vitality, emotional harmony, and grounded routines for lasting health, self-care, and radiant everyday wellbeing.',
    checkmarks: [
      'Cultivates emotional equilibrium and grounded inner strength',
      'Nourishes daily self-care habits and sustainable vitality',
      'Supports healthy natural routines and emotional ease',
      'Reclaims joyful confidence and everyday wellbeing'
    ],
    experiences: [
      'Emotional fatigue',
      'Juggling multiple roles',
      'Subtle hormonal stress',
      'Low personal time',
      'Sensory overwhelm',
      'Self-doubt',
      'Loss of vibrancy'
    ],
    approaches: [
      {
        title: 'Mindful Self-Care',
        desc: 'Bespoke daily routines honoring natural rhythms and boundaries.'
      },
      {
        title: 'Emotional Balance',
        desc: 'Gentle mindfulness practices for lasting inner calm.'
      },
      {
        title: 'Vibrant Harmony',
        desc: 'Nourishing holistic practices to sustain everyday energy.'
      }
    ]
  },
  teen: {
    id: 'teen',
    label: 'Teen Wellbeing',
    image: '/symptom-teen-burnout.jpg',
    title: 'Managing School Pressure & Screen Overload',
    italicPremise: 'Ease academic stress. Unplug overload. Build true confidence.',
    paragraph: 'Guiding adolescents to navigate school expectations, digital overload, and emotional stress through mindful downtime, healthy sleep boundaries, and balanced routines.',
    checkmarks: [
      'Relieves academic stress and performance pressure',
      'Restores healthy boundaries with screens and social media',
      'Builds authentic self-confidence and emotional resilience',
      'Protects restful sleep, restorative breaks, and social balance'
    ],
    experiences: [
      'Exam stress & pressure',
      'Screen fatigue & late browsing',
      'Emotional overwhelm',
      'Loss of motivation',
      'Social comparison',
      'Chronic exhaustion',
      'Worry about the future'
    ],
    approaches: [
      {
        title: 'Pressure Relief',
        desc: 'Practical tools to navigate study demands without burning out.'
      },
      {
        title: 'Digital Reset',
        desc: 'Healthy breaks from screen overload to restore mental clarity.'
      },
      {
        title: 'Inner Grounding',
        desc: 'Building self-worth, emotional balance, and genuine confidence.'
      }
    ]
  },
  corporate: {
    id: 'corporate',
    label: 'Workplace Wellness',
    image: '/symptom-corporate-stress.jpg',
    title: 'Workplace Calm & Corporate Stress',
    italicPremise: 'A calmer you. A brighter workday. Emotional balance & workplace ease.',
    paragraph: 'Guiding executives, leaders, and working professionals to navigate demanding workdays, decision fatigue, and high expectations through practical 5-minute stress resets, clear boundaries, and grounded focus.',
    checkmarks: [
      'Eases deadline pressure, screen fatigue, and workday overwhelm',
      'Builds practical 5-minute micro-habits to stay calm during busy days',
      'Creates healthy, guilt-free boundaries between work and personal life',
      'Protects daily mental focus, clear thinking, and peaceful evenings'
    ],
    hotspots: [
      { label: 'Workday Focus' },
      { label: 'Screen Fatigue Reset' },
      { label: 'Evening Boundary' }
    ],
    experiences: [
      'Back-to-back meetings',
      'Decision fatigue',
      'Constant screen time',
      'Deadline pressure',
      'Difficulty switching off',
      'Feeling drained after work',
      'Sunday evening dread'
    ],
    approaches: [
      {
        title: 'Workday Resets',
        desc: 'Simple 5-minute breathing and pause practices between demanding tasks.'
      },
      {
        title: 'Calm Focus',
        desc: 'Grounding habits to clear mental clutter and make steady decisions.'
      },
      {
        title: 'Evening Boundary',
        desc: 'Gentle wind-down habits to truly unplug from work and enjoy restful evenings.'
      }
    ]
  },
  subtle: {
    id: 'subtle',
    label: 'Inner Balance',
    image: '/subtle-system-diagram.jpg',
    title: 'Energy Flow & Inner Peace',
    italicPremise: 'Balance the nadis. Align the chakras. Awaken inner stillness.',
    paragraph: 'Connecting with your natural energy flow—balancing active and restful energies and harmonizing the 7 chakras for grounded peace and self-awareness.',
    checkmarks: [
      'Balances active and restful inner energy flow',
      'Restores energetic alignment through the 7 chakras',
      'Clears subtle energetic blocks for effortless meditation',
      'Brings lasting integration of physical vitality and inner peace'
    ],
    experiences: [
      'Desire for deep stillness',
      'Meditation plateaus',
      'Energetic imbalance',
      'Overactive mental chatter',
      'Seeking inner alignment',
      'Longing for clarity',
      'Spiritual curiosity'
    ],
    approaches: [
      {
        title: 'Chakra Alignment',
        desc: 'Guided contemplation to balance the 7 subtle energy centers.'
      },
      {
        title: 'Nadi Harmonization',
        desc: 'Equilibrating solar activity with lunar restorative calm.'
      },
      {
        title: 'Inner Realization',
        desc: 'Anchoring unshakeable presence in daily modern life.'
      }
    ]
  }
};

const differentiatorsList = [
  {
    iconType: 'purple',
    tag: 'Science + Meditation',
    title: 'The Dual Lens',
    body: 'Bringing science and meditation together for a deeper understanding of your wellbeing.',
    detail: 'Rarely do individuals find a trained doctor who deeply honors inner peace, or a meditation guide who understands how the human body works.'
  },
  {
    iconType: 'gold',
    tag: 'Grounded & Simple',
    title: 'Simple & Grounded',
    body: 'No complicated theories. Just practical, easy-to-follow guidance for everyday life.',
    detail: 'We honor your beliefs without imposing doctrine. Everything is gentle, practical, and grounded in real benefits you can feel.'
  },
  {
    iconType: 'green',
    tag: 'Personalised Care',
    title: 'Care Designed for You',
    body: 'Your journey is unique. Get guidance shaped around your needs, feelings, and goals.',
    detail: 'Whether you need calming breathwork, emotional ease, or quiet focus, the practices are individually tailored.'
  },
  {
    iconType: 'rose',
    tag: 'Lifelong Independence',
    title: 'Empowering Independence',
    body: 'Learn simple tools and habits you can continue using confidently on your own.',
    detail: 'You will graduate with a personalized sanctuary blueprint and daily practices that keep you centered regardless of external turmoil.'
  }
];

export default function AboutPreview({ onOpenConsultation }) {
  const { content } = useContent();
  const { currentLang } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0, rootMargin: '100px', once: true });

  // State management
  const [activeProgramTab, setActiveProgramTab] = useState('clinical'); // 'clinical' | 'meditation' | 'symbiosis'
  const [activeSymptom, setActiveSymptom] = useState('insomnia'); // 'insomnia' | 'female' | 'teen' | 'corporate' | 'subtle'
  const [expandedDiff, setExpandedDiff] = useState(null);

  const multiGridRef = useRef(null);

  const previewContent = content?.aboutPreview || {};
  const localizedProgramTabs = previewContent.programTabs || {};
  const currentProgram = {
    ...(programTabsData[activeProgramTab] || programTabsData.clinical),
    ...(localizedProgramTabs[activeProgramTab] || {})
  };

  const localizedSymptoms = previewContent.symptoms || {};
  const baseSymptom = symptomsData[activeSymptom] || symptomsData.insomnia;
  const locSymptom = localizedSymptoms[activeSymptom] || {};
  const currentSymptomData = {
    ...baseSymptom,
    ...locSymptom,
    approaches: (locSymptom.approaches || baseSymptom.approaches).map((app, idx) => ({
      ...(baseSymptom.approaches[idx] || {}),
      ...app
    }))
  };

  const localizedDiffItems = previewContent.differentiators?.items;
  const currentDiffList = localizedDiffItems && localizedDiffItems.length === differentiatorsList.length
    ? differentiatorsList.map((item, idx) => ({ ...item, ...localizedDiffItems[idx] }))
    : differentiatorsList;

  const handleScrollCards = (direction) => {
    if (multiGridRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      multiGridRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className={styles.section} aria-label="About Dr. Mayank Ahooja Overview">
      <div className={styles.container} ref={ref}>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 1: CLINICAL PROGRAMS / ACADEMICS & FOUNDATION
            ═══════════════════════════════════════════════════════════ */}
        <div className={styles.topNavContainer}>
          <div className={styles.topNavSwitcher} role="tablist" aria-label="Program Sections">
            <button
              role="tab"
              aria-selected={activeProgramTab === 'clinical'}
              className={`${styles.topNavBtn} ${activeProgramTab === 'clinical' ? styles.topNavBtnActive : ''}`}
              onClick={() => setActiveProgramTab('clinical')}
            >
              {previewContent.tabs?.clinical || 'Learning Foundations'}
            </button>
            <button
              role="tab"
              aria-selected={activeProgramTab === 'meditation'}
              className={`${styles.topNavBtn} ${activeProgramTab === 'meditation' ? styles.topNavBtnActive : ''}`}
              onClick={() => setActiveProgramTab('meditation')}
            >
              {previewContent.tabs?.meditation || 'Mindful Practice'}
            </button>
            <button
              role="tab"
              aria-selected={activeProgramTab === 'symbiosis'}
              className={`${styles.topNavBtn} ${activeProgramTab === 'symbiosis' ? styles.topNavBtnActive : ''}`}
              onClick={() => setActiveProgramTab('symbiosis')}
            >
              {previewContent.tabs?.symbiosis || 'The Harmony Plan'}
            </button>
          </div>
        </div>

        <motion.div
          className={styles.clinicalCard}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          key={activeProgramTab}
        >
          {/* Left Column: Academics & Info */}
          <div className={styles.clinicalLeft}>
            <div className={styles.clinicalHeaderRow}>
              <div>
                <div className={styles.clinicalTag}>{currentProgram.tag}</div>
                <h3 className={styles.clinicalTitle}>{currentProgram.title}</h3>
                <div className={styles.clinicalSubtitle}>{currentProgram.subtitle}</div>
              </div>
            </div>

            <p className={styles.clinicalBody}>{currentProgram.body}</p>

            <div className={styles.clinicalFeaturesRow}>
              {currentProgram.features.map((feat, idx) => (
                <div key={idx} className={styles.featureItem}>
                  <div className={styles.featureTitle}>{feat.title}</div>
                  <div className={styles.featureSubtitle}>{feat.subtitle}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: CTA & Image Showcase */}
          <div className={styles.clinicalRight}>
            <Link
              to={`/${currentLang}${currentProgram.buttonLink}`}
              className={styles.clinicalTopBtn}
            >
              {currentProgram.buttonText}
            </Link>

            <div className={styles.clinicalImageCard}>
              <img
                src={currentProgram.image}
                alt={currentProgram.imageAlt}
                className={styles.clinicalImg}
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 2: INTERACTIVE EXPERIENCE EXPLORER
            ═══════════════════════════════════════════════════════════ */}
        <div className={styles.explorerHeaderRow}>
          <div className={styles.explorerHeaderLeft}>
            <div className={styles.sectionTag}>{previewContent.explorer?.tag || 'INTERACTIVE EXPERIENCE EXPLORER'}</div>
            <h2 className={styles.sectionTitle}>{previewContent.explorer?.title || 'What Are You Feeling Right Now?'}</h2>
            <p className={styles.sectionSubtitle}>
              {previewContent.explorer?.subtitle || 'Select what you are experiencing below to see how practical understanding and mindful practices come together to bring balance.'}
            </p>
          </div>

          <div className={styles.lightbulbCallout}>
            <div className={styles.lightbulbText}>
              <div className={styles.lightbulbTitle}>{previewContent.explorer?.calloutTitle || 'Not sure where to start?'}</div>
              <div className={styles.lightbulbDesc}>{previewContent.explorer?.calloutDesc || 'Choose what you are feeling to see how clear understanding and mindful practices help you feel better.'}</div>
            </div>
          </div>
        </div>

        {/* 4 Interactive Symptom Pills */}
        <div className={styles.symptomsPillsRow} role="tablist" aria-label="Experience Categories">
          {Object.entries(symptomsData).map(([key, data]) => {
            const isActive = activeSymptom === key;
            const locLabel = localizedSymptoms[key]?.label || data.label;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                className={`${styles.symptomPillBtn} ${isActive ? styles.symptomPillBtnActive : ''}`}
                onClick={() => setActiveSymptom(key)}
              >
                <span>{locLabel}</span>
              </button>
            );
          })}
        </div>

        {/* 3-Column Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSymptom}
            className={styles.explorerShowcaseCard}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Column 1: Common Experiences & Our Approach */}
            <div className={styles.explorerColLeft}>
              <div className={styles.columnMiniTag}>{previewContent.explorer?.commonExperiences || 'COMMON EXPERIENCES'}</div>
              <div className={styles.pillsCloud}>
                {currentSymptomData.experiences.map((exp, idx) => (
                  <span key={idx} className={styles.experiencePill}>
                    {exp}
                  </span>
                ))}
              </div>

              <div className={styles.innerDivider} />

              <div className={styles.columnMiniTag}>{previewContent.explorer?.ourApproach || 'OUR APPROACH'}</div>
              <div className={styles.approachesList}>
                {currentSymptomData.approaches.map((app, idx) => (
                  <div key={idx} className={styles.approachItem}>
                    <div>
                      <div className={styles.approachTitle}>{app.title}</div>
                      <div className={styles.approachDesc}>{app.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Central Wellness Illustration */}
            <div className={styles.explorerColCenter}>
              <img
                src={currentSymptomData.image || '/symptom-insomnia.jpg'}
                alt={currentSymptomData.title}
                className={styles.neuralImg}
              />
            </div>

            {/* Column 3: System Title, Paragraph, Checkmarks, CTA */}
            <div className={styles.explorerColRight}>
              <h3 className={styles.explorerCardTitle}>{currentSymptomData.title}</h3>
              <div className={styles.explorerItalicPremise}>{currentSymptomData.italicPremise}</div>
              <p className={styles.explorerCardParagraph}>{currentSymptomData.paragraph}</p>

              <div className={styles.checkmarksList}>
                {currentSymptomData.checkmarks.map((chk, idx) => (
                  <div key={idx} className={styles.checkItem}>
                    <span className={styles.checkBadge}>✓</span>
                    <span>{chk}</span>
                  </div>
                ))}
              </div>

              <button
                className={styles.exploreSystemBtn}
                onClick={onOpenConsultation}
              >
                {previewContent.explorer?.explorePath || 'Explore This Path →'}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 3: THE MULTI-DISCIPLINARY APPROACH
            ═══════════════════════════════════════════════════════════ */}
        <div className={styles.approachHeaderRow}>
          <div>
            <div className={styles.sectionTag}>{previewContent.differentiators?.tag || 'WHY WORK WITH DR. MAYANK'}</div>
            <h2 className={styles.sectionTitle}>{previewContent.differentiators?.title || 'The Multi-Disciplinary Approach'}</h2>
            <p className={styles.sectionSubtitle}>
              {previewContent.differentiators?.subtitle || 'Combining practical science, thoughtful understanding, and authentic meditation practices.'}
            </p>
          </div>

          <div className={styles.approachNavArrows}>
            <button
              className={styles.navArrowBtn}
              onClick={() => handleScrollCards('left')}
              aria-label="Previous card"
            >
              ←
            </button>
            <button
              className={styles.navArrowBtn}
              onClick={() => handleScrollCards('right')}
              aria-label="Next card"
            >
              →
            </button>
          </div>
        </div>

        <div className={styles.multiGrid} ref={multiGridRef}>
          {currentDiffList.map((item, idx) => {
            const isExpanded = expandedDiff === idx;

            return (
              <div key={idx} className={styles.multiCard}>
                <div>
                  <div className={styles.diffTagBadge}>{item.tag}</div>
                  <h3 className={styles.multiCardTitle}>{item.title}</h3>
                  <p className={styles.multiCardBody}>{item.body}</p>
                </div>

                <div>
                  <button
                    className={styles.multiCardLink}
                    onClick={() => setExpandedDiff(isExpanded ? null : idx)}
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? (previewContent.differentiators?.showLess || 'Show less ↑') : (previewContent.differentiators?.learnMore || 'Discover why it matters →')}</span>
                  </button>

                  {isExpanded && (
                    <div className={styles.cardDrawer}>
                      {item.detail}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
