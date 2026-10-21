import React, { useState, useMemo } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import LanguageModal from '../components/LanguageModal';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { useContent } from '../context/ContentContext';
import pageStyles from '../styles/page.module.css';
import styles from './ProgramsPage.module.css';

export default function ProgramsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('chakra-mastery-4w');
  const [activeFilter, setActiveFilter] = useState('all');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const { content, t } = useContent();

  const openConsultation = (progId = 'chakra-mastery-4w') => {
    setSelectedProgram(progId);
    setModalOpen(true);
  };
  const closeConsultation = () => setModalOpen(false);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(prev => (prev === idx ? null : idx));
  };

  const programsData = content?.programs || {};
  const allItems = (programsData.items || []).filter(p => p.visible !== false);

  // Filter items based on active pill
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return allItems;
    if (activeFilter === 'cohort') {
      return allItems.filter(p => 
        p.id === 'chakra-mastery-4w' || p.id === 'vagus-nerve-reset' || p.id === 'emotional-equilibrium-breathwork' || p.id === 'circadian-sleep-architecture' || p.id === 'sacred-sound-cellular-harmony'
      );
    }
    if (activeFilter === 'sanctuary') {
      return allItems.filter(p => 
        p.id === 'mindful-living-retreat' || p.id === 'silent-inquiry-retreat'
      );
    }
    if (activeFilter === 'corporate') {
      return allItems.filter(p => 
        p.id === 'workplace-calm-corporate-workshop' || p.id === 'executive-presence-leadership'
      );
    }
    if (activeFilter === 'energy') {
      return allItems.filter(p => 
        p.pillar === 'ENERGY' || p.pillar === 'BODY'
      );
    }
    return allItems;
  }, [allItems, activeFilter]);

  const whyItems = programsData.whyItems || [];
  const faqs = programsData.faqs || [];
  const corpBanner = programsData.corporateBanner || {};

  return (
    <>
      <SeoHead 
        customTitle={`${programsData.headline || 'Guided Programs & Workshops'} | Dr. Mayank Ahooja`}
        customDescription="Deep-dive cohort journeys, meditation intensives, and practical workplace workshops led personally by Dr. Mayank Ahooja."
      />
      <LanguageModal />
      <Nav onOpenConsultation={() => openConsultation('chakra-mastery-4w')} />

      <main id="main-content" className={pageStyles.pageWrapper}>
        <div className={pageStyles.container}>
          <Breadcrumbs items={[{ label: t('nav.programs', 'Programs') }]} />

          {/* Editorial Header */}
          <header className={styles.pageHeader}>
            <span className={styles.tag}>{programsData.tag || 'WORKSHOPS & IMMERSIONS'}</span>
            <h1 className={styles.title}>{programsData.headline || 'Guided Programs & Workshops'}</h1>
            <p className={styles.subtitle}>
              {programsData.subhead || 'Deep-dive cohort journeys and practical workplace workshops for individuals, teams, and executives.'}
            </p>
          </header>

          {/* Interactive Format / Category Filter Bar */}
          <nav className={styles.filterBar} aria-label="Program categories">
            <button
              type="button"
              className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              {programsData.filterAll || 'All Programs'} ({allItems.length})
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${activeFilter === 'cohort' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('cohort')}
            >
              {programsData.filterCohort || 'Cohort Intensives'}
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${activeFilter === 'sanctuary' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('sanctuary')}
            >
              {programsData.filterSanctuary || 'Sanctuary Immersions'}
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${activeFilter === 'corporate' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('corporate')}
            >
              {programsData.filterCorporate || 'Corporate & Teams'}
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${activeFilter === 'energy' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('energy')}
            >
              {programsData.filterEnergy || 'Energy & Body'}
            </button>
          </nav>

          {/* Programs Grid (Architectural Sanctuary Cards) */}
          <div className={styles.grid}>
            {filteredItems.map((item) => {
              const fallbackImages = {
                'chakra-mastery-4w': '/service-chakras.jpg',
                'mindful-living-retreat': '/pause-zen-bg.jpg',
                'workplace-calm-corporate-workshop': '/symptom-corporate-stress.jpg',
                'vagus-nerve-reset': '/healing-vagus.jpg',
                'emotional-equilibrium-breathwork': '/images/services/pure-emotional-wellbeing.jpg',
                'executive-presence-leadership': '/healing-brain.jpg',
                'circadian-sleep-architecture': '/symptom-insomnia.jpg',
                'silent-inquiry-retreat': '/service-sky.jpg',
                'sacred-sound-cellular-harmony': '/healing-cellular.jpg'
              };
              const cardImg = item.image || fallbackImages[item.id] || '/meditation-hero.png';

              return (
                <article
                  key={item.id}
                  className={`${styles.card} ${item.featured ? styles.cardFeatured : ''}`}
                >
                  {/* Top Architectural Media Window */}
                  <div className={styles.cardMediaWindow}>
                    <img 
                      src={cardImg} 
                      alt={item.title} 
                      className={styles.cardImg} 
                      loading="lazy" 
                    />
                    <div className={styles.mediaOverlay} />

                    {/* Floating Top Badges */}
                    <div className={styles.mediaTopBadges}>
                      <span className={styles.typeBadge}>{item.type}</span>
                      {item.pillar && <span className={styles.pillarBadge}>{item.pillar}</span>}
                    </div>

                  </div>

                  {/* Card Content Body */}
                  <div className={styles.cardContent}>
                    {item.featured && (
                      <div className={styles.metaRow}>
                        <span className={styles.signatureBadge}>{programsData.signature || 'Signature'}</span>
                      </div>
                    )}

                    <h2 className={styles.cardTitle}>{item.title}</h2>
                    <p className={styles.desc}>{item.desc}</p>

                    {item.format && (
                      <div className={styles.formatBar}>
                        <span>{item.format}</span>
                      </div>
                    )}

                    {/* Highlights Pills */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className={styles.highlightsList}>
                        {item.highlights.map((hl, idx) => (
                          <span key={idx} className={styles.highlightChip}>{hl}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer Bar */}
                  <div className={styles.cardFooter}>
                    <button
                      type="button"
                      className={styles.inquireBtn}
                      onClick={() => openConsultation(item.id)}
                    >
                      <span>{programsData.inquire || t('nav.cta', 'Inquire About Next Cohort')}</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Why Cohort Learning Section */}
          {whyItems.length > 0 && (
            <section className={styles.whySection} aria-label="Why cohort learning">
              <div className={styles.whyHeader}>
                <span className={styles.tag}>{programsData.whyTag || 'THE COHORT EXPERIENCE'}</span>
                <h2 className={styles.title} style={{ fontSize: 'clamp(1.9rem, 3vw, 2.6rem)' }}>
                  {programsData.whyHeadline || 'Why Journey in a Guided Program?'}
                </h2>
                <p className={styles.subtitle} style={{ margin: '0 auto' }}>
                  {programsData.whySubhead || 'Immersion in a guided small group combines scientific depth with deep accountability and shared contemplative stillness.'}
                </p>
              </div>

              <div className={styles.whyGrid}>
                {whyItems.map((step, idx) => (
                  <div key={idx} className={styles.whyCard}>
                    <div className={styles.whyNum}>0{idx + 1}</div>
                    <h3 className={styles.whyCardTitle}>{step.title}</h3>
                    <p className={styles.whyCardDesc}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Corporate Banner Callout */}
          {corpBanner.title && (
            <section className={styles.corpBanner} aria-label="Corporate programs">
              <div className={styles.corpContent}>
                <span className={styles.corpTag}>{corpBanner.tag || 'ORGANIZATIONAL WELLNESS'}</span>
                <h2 className={styles.corpTitle}>{corpBanner.title}</h2>
                <p className={styles.corpDesc}>{corpBanner.desc}</p>
              </div>
              <button
                type="button"
                className={styles.corpBtn}
                onClick={() => openConsultation('workplace-calm-corporate-workshop')}
              >
                <span>{corpBanner.cta || 'Inquire for Your Team'} &rarr;</span>
              </button>
            </section>
          )}

          {/* FAQs Accordion */}
          {faqs.length > 0 && (
            <section className={styles.faqSection} aria-label="Frequently Asked Questions">
              <div className={styles.faqHeader}>
                <span className={styles.tag}>{programsData.faqTag || 'FREQUENTLY ASKED QUESTIONS'}</span>
                <h2 className={styles.title} style={{ fontSize: 'clamp(1.9rem, 3vw, 2.6rem)' }}>
                  {programsData.faqHeadline || 'Common Inquiries About Our Programs'}
                </h2>
                <p className={styles.subtitle} style={{ margin: '0 auto' }}>
                  {programsData.faqSubhead || 'Everything you need to know about enrollment, live schedules, and cohort participation.'}
                </p>
              </div>

              <div className={styles.faqList}>
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
                      <button
                        type="button"
                        className={styles.faqQuestionBtn}
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                      >
                        <h3 className={styles.faqQuestionText}>{faq.q}</h3>
                        <span className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ''}`}>
                          ▼
                        </span>
                      </button>
                      {isOpen && (
                        <div className={styles.faqAnswer}>
                          <p style={{ margin: 0 }}>{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
      <ConsultationModal 
        isOpen={modalOpen} 
        onClose={closeConsultation} 
        defaultService={selectedProgram} 
      />
    </>
  );
}

