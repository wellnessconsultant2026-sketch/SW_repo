import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SeoHead from '../components/SeoHead';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import pageStyles from '../styles/page.module.css';

export default function NotFoundPage() {
  const { currentLang } = useLanguage();
  const { t } = useContent();

  return (
    <>
      <SeoHead 
        customTitle={`404 | ${t('brand.name', 'Dr. Mayank Ahooja')}`}
        customDescription="The requested sanctuary path could not be found. Return to Dr. Mayank Ahooja's homepage."
      />
      <Nav onOpenConsultation={() => {}} />

      <main id="main-content" className={pageStyles.pageWrapper} style={{ display: 'flex', alignItems: 'center', minHeight: '85vh' }}>
        <div className={pageStyles.container} style={{ textAlign: 'center', maxWidth: '650px' }}>
          <span className={pageStyles.tag}>{t('notFound.tag', '404 • TRANQUIL DETOUR')}</span>
          <h1 className={pageStyles.title}>{t('notFound.title', 'Return to Center')}</h1>
          <p className={pageStyles.subtitle} style={{ marginBottom: '2.5rem' }}>
            {t('notFound.subtitle', 'The path you sought has gently dissolved, but the sanctuary remains open. Pause, take a conscious breath, and return to the beginning.')}
          </p>

          <Link to={`/${currentLang}`} className={pageStyles.ctaBtn}>
            {t('notFound.cta', 'Return to Sanctuary Home')} &rarr;
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
