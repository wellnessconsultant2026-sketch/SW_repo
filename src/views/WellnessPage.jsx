import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import LanguageModal from '../components/LanguageModal';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Healing from '../components/sections/Healing';
import Stillness from '../components/sections/Stillness';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import pageStyles from '../styles/page.module.css';
import styles from './WellnessPage.module.css';

export default function WellnessPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { content, t } = useContent();
  const { currentLang } = useLanguage();

  const openConsultation = () => setModalOpen(true);
  const closeConsultation = () => setModalOpen(false);

  const pillars = (content?.pillars || []).filter(p => p.id !== 'all');
  const services = content?.services?.items || [];

  return (
    <>
      <SeoHead 
        customTitle={`${t('nav.wellness', '5 Core Wellness Pillars')} | Dr. Mayank Ahooja`}
        customDescription="Explore the 5 Core Wellness Pillars of Dr. Mayank Ahooja: Mind, Emotions, Energy, Body, and Inner Growth. Integrating clear scientific awareness and contemplative stillness."
      />
      <LanguageModal />
      <Nav onOpenConsultation={openConsultation} />

      <main id="main-content" className={pageStyles.pageWrapper}>
        <div className={pageStyles.container}>
          <Breadcrumbs items={[{ label: t('nav.wellness', 'Wellness') }]} />

          <header className={pageStyles.pageHeader}>
            <span className={pageStyles.tag}>{t('wellness.tag', 'FOUNDATIONAL PHILOSOPHY')}</span>
            <h1 className={pageStyles.title}>{t('wellness.headline', 'The 5 Pillars of Wholeness')}</h1>
            <p className={pageStyles.subtitle}>
              {t('wellness.subtitle', 'A complete sanctuary approach harmonizing the mind, clear thinking, emotional ease, and inner growth.')}
            </p>
          </header>

          <div className={styles.pillarsList}>
            {pillars.map((pillar, idx) => {
              const matchedServices = services.filter(s => 
                s.pillars && s.pillars.some(p => 
                  p.toUpperCase() === pillar.id.toUpperCase() || 
                  p.toUpperCase() === pillar.name.toUpperCase()
                )
              );

              return (
                <article key={pillar.id} className={styles.pillarCard}>
                  <div className={styles.pillarMeta}>
                    <span className={styles.pillarNum}>{String(idx + 1).padStart(2, '0')}</span>
                    <h2 className={styles.pillarName}>{pillar.name}</h2>
                  </div>

                  <div>
                    <div className={styles.subcategoriesList}>
                      {(pillar.subcategories || []).map(sub => (
                        <span key={sub} className={styles.subChip}>{sub}</span>
                      ))}
                    </div>

                    {matchedServices.length > 0 && (
                      <div className={styles.associatedServices}>
                        <h3 className={styles.associatedTitle}>
                          {t('wellness.alignedServices', 'Aligned Practices')}
                        </h3>
                        <div className={styles.serviceLinks}>
                          {matchedServices.map(srv => (
                            <Link 
                              key={srv.id} 
                              to={`/${currentLang}/services/${srv.id}`}
                              className={styles.serviceLinkPill}
                            >
                              <span>{srv.title}</span>
                              <span>&rarr;</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* The Science of Healing & Stillness Integration */}
        <div style={{ marginTop: '4rem' }}>
          <Healing onOpenConsultation={openConsultation} />
          <Stillness />
        </div>
      </main>

      <Footer />
      <ConsultationModal isOpen={modalOpen} onClose={closeConsultation} />
    </>
  );
}
