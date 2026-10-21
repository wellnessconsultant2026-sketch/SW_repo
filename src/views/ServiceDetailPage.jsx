import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import LanguageModal from '../components/LanguageModal';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import pageStyles from '../styles/page.module.css';
import styles from './ServiceDetailPage.module.css';

export default function ServiceDetailPage() {
  const { serviceSlug } = useParams();
  const { content, t } = useContent();
  const { currentLang } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  const servicesList = content?.services?.items || [];
  const currentService = servicesList.find(s => s.id === serviceSlug);

  if (!currentService) {
    // If slug doesn't match any canonical service, redirect to services index
    return <Navigate to={`/${currentLang}/services`} replace />;
  }

  const openConsultation = () => setModalOpen(true);
  const closeConsultation = () => setModalOpen(false);

  const relatedServices = servicesList
    .filter(s => s.id !== currentService.id && s.visible !== false)
    .slice(0, 3);

  const schemaService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: currentService.title,
    description: currentService.fullDesc || currentService.shortDesc,
    provider: {
      '@type': 'Person',
      name: 'Dr. Mayank Ahooja',
      jobTitle: 'Doctor of Medicine & Meditation Master'
    },
    serviceType: currentService.title,
    areaServed: 'Global'
  };

  return (
    <>
      <SeoHead 
        customTitle={`${currentService.title} | Dr. Mayank Ahooja`}
        customDescription={currentService.shortDesc || currentService.fullDesc}
        structuredData={schemaService}
      />
      <LanguageModal />
      <Nav onOpenConsultation={openConsultation} />

      <main id="main-content" className={pageStyles.pageWrapper}>
        <div className={pageStyles.container}>
          <Breadcrumbs items={[
            { label: t('nav.services', 'Services'), path: `/${currentLang}/services` },
            { label: currentService.title }
          ]} />

          <div className={styles.detailWrapper}>
            {currentService.format && (
              <div className={styles.headerMeta}>
                <span className={styles.metaItem}>{currentService.format}</span>
              </div>
            )}

            <header className={pageStyles.pageHeader} style={{ textAlign: 'left', margin: '0 0 2rem' }}>
              <h1 className={pageStyles.title}>{currentService.title}</h1>
              <p className={pageStyles.subtitle} style={{ margin: '0' }}>
                {currentService.shortDesc || currentService.desc}
              </p>
            </header>

            <article className={styles.heroCard}>
              <p className={styles.overviewText}>
                {currentService.fullDesc || currentService.shortDesc}
              </p>

              {currentService.focusAreas && currentService.focusAreas.length > 0 && (
                <>
                  <h2 className={styles.sectionTitle}>{t('service.keyFocusAreas', 'Key Dimensions & Practices')}</h2>
                  <div className={styles.focusGrid}>
                    {currentService.focusAreas.map((item) => (
                      <span key={item} className={styles.focusTag}>{item}</span>
                    ))}
                  </div>
                </>
              )}

              <h2 className={styles.sectionTitle}>{t('service.journey', 'Structured 3-Stage Experience')}</h2>
              <div className={styles.stepsGrid}>
                <div className={styles.stepCard}>
                  <div className={styles.stepNumber}>01</div>
                  <h3 className={styles.stepTitle}>{t('service.step1Title', 'Arrival & Centering')}</h3>
                  <p className={styles.stepDesc}>
                    {t('service.step1Desc', 'Settle into a peaceful space. We talk through your personal goals, discuss how you are feeling, and bring a natural sense of calm and ease.')}
                  </p>
                </div>

                <div className={styles.stepCard}>
                  <div className={styles.stepNumber}>02</div>
                  <h3 className={styles.stepTitle}>{t('service.step2Title', 'Guided Practice')}</h3>
                  <p className={styles.stepDesc}>
                    {t('service.step2Desc', 'Gentle guidance through peaceful meditation, sound harmonies, mindful breathing, or supportive conversation.')}
                  </p>
                </div>

                <div className={styles.stepCard}>
                  <div className={styles.stepNumber}>03</div>
                  <h3 className={styles.stepTitle}>{t('service.step3Title', 'Integration & Sustained Calm')}</h3>
                  <p className={styles.stepDesc}>
                    {t('service.step3Desc', 'Grounding reflections with practical simple habits for maintaining stillness and balance in daily modern life.')}
                  </p>
                </div>
              </div>

              {/* Reservation CTA Box */}
              <div className={styles.ctaBox}>
                <h3 className={styles.ctaBoxTitle}>{t('service.readyTitle', 'Begin Your Practice With Dr. Mayank')}</h3>
                <p className={styles.ctaBoxDesc}>
                  {t('service.readyDesc', 'Appointments are offered virtually worldwide and in our tranquil sanctuary. Reserve your private dialogue.')}
                </p>
                <button 
                  type="button" 
                  className={pageStyles.ctaBtn} 
                  onClick={openConsultation}
                >
                  {t('nav.cta', 'Book a Session')} &rarr;
                </button>
              </div>

              {/* Related Services */}
              <div className={styles.relatedSection}>
                <h2 className={styles.sectionTitle}>{t('service.relatedTitle', 'Complementary Practices')}</h2>
                <div className={styles.relatedGrid}>
                  {relatedServices.map((rel) => (
                    <Link 
                      key={rel.id} 
                      to={`/${currentLang}/services/${rel.id}`}
                      className={styles.relatedCard}
                    >
                      <div>
                        <h3 className={styles.relatedCardTitle}>{rel.title}</h3>
                        <p className={styles.relatedCardDesc}>{rel.shortDesc}</p>
                      </div>
                      <span className={styles.relatedLinkText}>
                        {t('service.exploreModality', 'Explore')} &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
      <ConsultationModal 
        isOpen={modalOpen} 
        onClose={closeConsultation} 
        defaultService={currentService.id}
      />
    </>
  );
}
