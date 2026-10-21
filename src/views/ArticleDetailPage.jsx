import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import LanguageModal from '../components/LanguageModal';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import pageStyles from '../styles/page.module.css';
import styles from './ArticleDetailPage.module.css';

import { articleContents } from '../data/articleContents';

export default function ArticleDetailPage() {
  const { articleSlug } = useParams();
  const { content, t, initialLoaded } = useContent();
  const { currentLang } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  const articlesList = content?.articles?.items || [];
  const currentArticle = articlesList.find(a => a.id === articleSlug);

  if (!currentArticle) {
    if (!initialLoaded) {
      return (
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Loading article...</p>
        </div>
      );
    }
    return <Navigate to={`/${currentLang}/articles`} replace />;
  }

  const openConsultation = () => setModalOpen(true);
  const closeConsultation = () => setModalOpen(false);

  const langContents = articleContents[currentLang] || articleContents['en'] || {};
  const legacyData = langContents[currentArticle.id];

  const renderContent = () => {
    // 1. Structured sections from article object
    if (Array.isArray(currentArticle.sections) && currentArticle.sections.length > 0) {
      return currentArticle.sections.map((sec, idx) => (
        <section key={idx}>
          {sec.heading && <h2>{sec.heading}</h2>}
          {sec.p1 && <p>{sec.p1}</p>}
          {sec.quote && (
            <blockquote className={styles.quoteBlock}>
              "{sec.quote.replace(/^["']|["']$/g, '')}"
            </blockquote>
          )}
          {sec.p2 && <p>{sec.p2}</p>}
        </section>
      ));
    }

    // 2. Full text/markdown body from Admin Panel editor
    if (typeof currentArticle.content === 'string' && currentArticle.content.trim()) {
      const blocks = currentArticle.content.split(/\n\s*\n/).map(b => b.trim()).filter(Boolean);
      return blocks.map((block, idx) => {
        if (block.startsWith('### ')) {
          return <h3 key={idx} className={styles.subHeading3}>{block.replace(/^###\s+/, '')}</h3>;
        }
        if (block.startsWith('## ')) {
          return <h2 key={idx}>{block.replace(/^##\s+/, '')}</h2>;
        }
        if (block.startsWith('# ')) {
          return <h2 key={idx}>{block.replace(/^#\s+/, '')}</h2>;
        }
        if (block.startsWith('>')) {
          const quoteText = block.replace(/^>\s*/, '').replace(/^["']|["']$/g, '');
          return (
            <blockquote key={idx} className={styles.quoteBlock}>
              "{quoteText}"
            </blockquote>
          );
        }
        return <p key={idx}>{block}</p>;
      });
    }

    // 3. Pre-seeded static articles from articleContents.js
    if (legacyData?.sections && Array.isArray(legacyData.sections)) {
      return legacyData.sections.map((sec, idx) => (
        <section key={idx}>
          {sec.heading && <h2>{sec.heading}</h2>}
          {sec.p1 && <p>{sec.p1}</p>}
          {sec.quote && (
            <blockquote className={styles.quoteBlock}>
              "{sec.quote.replace(/^["']|["']$/g, '')}"
            </blockquote>
          )}
          {sec.p2 && <p>{sec.p2}</p>}
        </section>
      ));
    }

    // 4. Fallback: Render excerpt and detail CTA
    return (
      <section>
        <p>{currentArticle.excerpt}</p>
        <p>{content?.articles?.detailCta || 'Cultivating mindfulness and balanced awareness provides the foundational clarity needed to navigate modern life with serenity and purpose.'}</p>
      </section>
    );
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: currentArticle.title,
    description: currentArticle.excerpt,
    image: currentArticle.image || undefined,
    datePublished: currentArticle.date || undefined,
    author: {
      '@type': 'Person',
      name: currentArticle.author || 'Dr. Mayank Ahooja',
      jobTitle: 'Doctor of Medicine & Meditation Master'
    },
    publisher: {
      '@type': 'Person',
      name: 'Dr. Mayank Ahooja'
    }
  };

  return (
    <>
      <SeoHead 
        customTitle={`${currentArticle.title} | Dr. Mayank Ahooja`}
        customDescription={currentArticle.excerpt}
        structuredData={articleSchema}
        ogImage={currentArticle.image}
      />
      <LanguageModal />
      <Nav onOpenConsultation={openConsultation} />

      <main id="main-content" className={pageStyles.pageWrapper}>
        <div className={pageStyles.container}>
          <Breadcrumbs items={[
            { label: t('nav.articles', 'Articles'), path: `/${currentLang}/articles` },
            { label: currentArticle.title }
          ]} />

          <div className={styles.articleContainer}>
            <article className={styles.articleCard}>
              <div className={styles.metaRow}>
                <span className={styles.categoryBadge}>{currentArticle.category}</span>
                {currentArticle.date && <span className={styles.readTime}>{currentArticle.date}</span>}
                {currentArticle.readTime && <span className={styles.readTime}>• {currentArticle.readTime}</span>}
              </div>

              <h1 className={pageStyles.title} style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                {currentArticle.title}
              </h1>

              {/* Featured Image if available */}
              {currentArticle.image && (
                <div className={styles.featuredImageWrapper}>
                  <img 
                    src={currentArticle.image} 
                    alt={currentArticle.title} 
                    className={styles.featuredImage}
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className={styles.articleBody}>
                {renderContent()}
              </div>

              {/* Author Attribution */}
              <div className={styles.authorBox}>
                <img 
                  src={content?.brand?.profileImage || '/images/profile/1791092487681_20190710_082214.jpg'} 
                  alt={currentArticle.author || "Dr. Mayank Ahooja"} 
                  className={styles.authorAvatar}
                />
                <div>
                  <div className={styles.authorName}>{currentArticle.author || 'Dr. Mayank Ahooja'}</div>
                  <div className={styles.authorTitle}>
                    {content?.articles?.authorTitle || content?.brand?.title || 'Doctor of Medicine | Meditation Master | Spiritual Coach | Motivational Speaker'}
                  </div>
                </div>
              </div>

              {/* Booking CTA Box */}
              <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  {content?.articles?.detailCta || 'Explore personalized guidance in meditation, breathwork, and energetic alignment.'}
                </p>
                <button 
                  type="button" 
                  className={pageStyles.ctaBtn}
                  onClick={openConsultation}
                >
                  {t('nav.cta', 'Book a Session with Dr. Mayank')} &rarr;
                </button>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
      <ConsultationModal isOpen={modalOpen} onClose={closeConsultation} />
    </>
  );
}
