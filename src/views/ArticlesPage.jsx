import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import LanguageModal from '../components/LanguageModal';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import pageStyles from '../styles/page.module.css';
import styles from './ArticlesPage.module.css';

export default function ArticlesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const { content, t } = useContent();
  const { currentLang } = useLanguage();

  const openConsultation = () => setModalOpen(true);
  const closeConsultation = () => setModalOpen(false);

  const articlesData = content?.articles || {};
  const items = (articlesData.items || []).filter(a => a.visible !== false);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return items;
    return items.filter(a => {
      const cat = (a.category || '').toLowerCase();
      const id = (a.id || '').toLowerCase();
      if (activeFilter === 'breathing') {
        return id === 'art-of-conscious-breathing' || id === 'workplace-burnout-executive-vitality' ||
               cat.includes('breath') || cat.includes('respir') || cat.includes('mind') || cat.includes('vitality') || cat.includes('atmen') || cat.includes('respiratoire');
      }
      if (activeFilter === 'somatic') {
        return id === 'vagus-nerve-science' || id === 'circadian-sleep-architecture-article' ||
               cat.includes('somatic') || cat.includes('vagus') || cat.includes('sleep') || cat.includes('physio') || cat.includes('somat');
      }
      if (activeFilter === 'energy') {
        return id === 'chakras-and-physiology' ||
               cat.includes('energy') || cat.includes('chakra') || cat.includes('vibrat') || cat.includes('énerg') || cat.includes('energi');
      }
      if (activeFilter === 'emotions') {
        return id === 'emotional-deconditioning' ||
               cat.includes('emotion') || cat.includes('émotion') || cat.includes('emozione') || cat.includes('gefühl');
      }
      if (activeFilter === 'inner-growth') {
        return id === 'transformation-within' || id === 'silence-as-medicine' ||
               cat.includes('growth') || cat.includes('silence') || cat.includes('stillness') || cat.includes('transform') || cat.includes('meditat');
      }
      return true;
    });
  }, [items, activeFilter]);

  return (
    <>
      <SeoHead 
        customTitle={`${articlesData.headline || 'Wisdom for Inner Harmony & Articles'} | Dr. Mayank Ahooja`}
        customDescription="Reflections on meditation, daily calm, energetic balance, and conscious living by Dr. Mayank Ahooja."
      />
      <LanguageModal />
      <Nav onOpenConsultation={openConsultation} />

      <main id="main-content" className={pageStyles.pageWrapper}>
        <div className={pageStyles.container}>
          <Breadcrumbs items={[{ label: t('nav.articles', 'Articles') }]} />

          <header className={styles.pageHeader}>
            <span className={styles.tag}>{articlesData.tag || 'INSIGHTS & ESSAYS'}</span>
            <h1 className={styles.title}>{articlesData.headline || 'Wisdom for Inner Harmony'}</h1>
            <p className={styles.subtitle}>
              {articlesData.subhead || 'Reflections on meditation science, energetic balance, and daily conscious living.'}
            </p>
          </header>

          {/* Interactive Category Filter Bar */}
          <nav className={styles.filterBar} aria-label="Article categories">
            <button
              type="button"
              className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              {articlesData.filterAll || 'All Essays'} ({items.length})
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${activeFilter === 'breathing' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('breathing')}
            >
              {articlesData.filterBreathing || 'Breathing & Mind'}
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${activeFilter === 'somatic' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('somatic')}
            >
              {articlesData.filterSomatic || 'Somatic Science'}
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${activeFilter === 'energy' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('energy')}
            >
              {articlesData.filterEnergy || 'Energy & Chakras'}
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${activeFilter === 'emotions' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('emotions')}
            >
              {articlesData.filterEmotions || 'Emotional Health'}
            </button>
            <button
              type="button"
              className={`${styles.filterBtn} ${activeFilter === 'inner-growth' ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter('inner-growth')}
            >
              {articlesData.filterStillness || 'Inner Growth & Silence'}
            </button>
          </nav>

          {/* Articles Grid */}
          <div className={styles.grid}>
            {filteredItems.map((art) => (
              <article 
                key={art.id} 
                className={`${styles.card} ${art.featured ? styles.cardFeatured : ''}`}
              >
                {art.image && (
                  <div className={styles.cardImageWrapper}>
                    <img 
                      src={art.image} 
                      alt={art.title} 
                      className={styles.cardImage}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.parentElement.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className={styles.cardContent}>
                  <div className={styles.metaRow}>
                    <span className={styles.categoryBadge}>{art.category}</span>
                    {art.readTime && <span className={styles.cardReadTime}>{art.readTime}</span>}
                  </div>
                  <h2 className={styles.cardTitle}>{art.title}</h2>
                  <p className={styles.excerpt}>{art.excerpt}</p>
                </div>

                <div className={styles.cardBottom}>
                  <Link
                    to={`/${currentLang}/articles/${art.id}`}
                    className={styles.readMoreBtn}
                  >
                    <span>{articlesData.readMore || 'Read Article'}</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter / Sanctuary Reflections Banner */}
          <section className={styles.newsletterSection} aria-label="Sanctuary Reflections">
            <div className={styles.newsletterContent}>
              <span className={styles.newsletterTag}>{articlesData.newsletterTag || 'SANCTUARY REFLECTIONS'}</span>
              <h2 className={styles.newsletterTitle}>{articlesData.newsletterTitle || 'Receive Monthly Contemplative Essays'}</h2>
              <p className={styles.newsletterDesc}>
                {articlesData.newsletterSubhead || 'Gentle guidance on meditation physiology, nervous system balance, and mindful living delivered directly to your inbox.'}
              </p>
            </div>
            <div className={styles.newsletterAction}>
              <button
                type="button"
                className={styles.consultationBtn}
                onClick={openConsultation}
              >
                <span>{articlesData.newsletterCta || t('nav.cta', 'Reserve Sanctuary Session')} &rarr;</span>
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <ConsultationModal isOpen={modalOpen} onClose={closeConsultation} />
    </>
  );
}

