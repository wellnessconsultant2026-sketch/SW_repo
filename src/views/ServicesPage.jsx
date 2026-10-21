import React, { useState } from 'react';
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
import styles from './ServicesPage.module.css';

export default function ServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('individual-consultation');
  const { content, t } = useContent();
  const { currentLang } = useLanguage();

  const openConsultation = (serviceId = 'individual-consultation') => {
    setSelectedService(serviceId);
    setModalOpen(true);
  };
  const closeConsultation = () => setModalOpen(false);

  const servicesData = content?.services || {};
  const allServices = (servicesData.items || []).filter(s => s.visible !== false);

  return (
    <>
      <SeoHead 
        customTitle={`${servicesData.headline || 'Wellness Services & Practices'} | Dr. Mayank Ahooja`}
        customDescription="Explore the wellness services of Dr. Mayank Ahooja: Personal Consultation, Meditation Session, Stress Relief Session, Chakras and Energy Balancing, Life Guidance, Emotional Wellbeing, Breathwork & Relaxation, and Retreats & Group Programs."
      />
      <LanguageModal />
      <Nav onOpenConsultation={() => openConsultation()} />

      <main id="main-content" className={pageStyles.pageWrapper}>
        <div className={pageStyles.container}>
          <Breadcrumbs items={[{ label: t('nav.services', 'Services') }]} />

          <header className={pageStyles.pageHeader}>
            <span className={pageStyles.tag}>{servicesData.tag || 'SERVICES & OFFERINGS'}</span>
            <h1 className={pageStyles.title}>{servicesData.headline || 'Paths to Your Natural Balance'}</h1>
            <p className={pageStyles.subtitle}>
              {servicesData.subhead || 'Thoughtfully structured wellness sessions combining meditation wisdom, energy balance, and mindful self-awareness.'}
            </p>
          </header>

          {/* Clean Editorial Wellness Services Grid */}
          <div className={styles.servicesGrid}>
            {allServices.map((service) => (
              <article key={service.id} className={styles.serviceCard}>
                {/* Card Main: Content & Visual Window */}
                <div className={styles.cardMain}>
                    <div className={styles.cardContent}>
                      <h2 className={styles.cardTitle}>{service.title}</h2>
                      {service.subtitle && (
                        <div className={styles.cardSubtitle}>{service.subtitle}</div>
                      )}
                      <p className={styles.cardDesc}>{service.shortDesc || service.desc}</p>

                      {/* Focus Areas */}
                      {service.focusAreas && service.focusAreas.length > 0 && (
                        <div className={styles.focusPillsRow}>
                          {service.focusAreas.slice(0, 3).map((area, idx) => (
                            <span key={idx} className={styles.focusPill}>{area}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    {service.image && (
                      <div className={styles.cardArchWindow}>
                        <img 
                          src={service.image} 
                          alt={service.title} 
                          className={styles.cardArchImg} 
                          loading="lazy"
                        />
                        <div className={styles.cardImgOverlay} />
                      </div>
                    )}
                  </div>

                  {/* Card Bottom Bar */}
                  <div className={styles.cardBottomBar}>
                    <div className={styles.formatWrapper}>
                      <span className={styles.formatText}>
                        {service.format || '1:1 Guidance & Immersive Practice'}
                      </span>
                    </div>
                    <div className={styles.cardActions}>
                      <Link 
                        to={`/${currentLang}/services/${service.id}`}
                        className={styles.learnMoreLink}
                      >
                        <span>{servicesData.learnMore || t('common.learnMore', 'Learn More')}</span>
                        <span>&rarr;</span>
                      </Link>
                      <button
                        type="button"
                        className={styles.bookBtn}
                        onClick={() => openConsultation(service.id)}
                      >
                        <span>{servicesData.bookSession || t('nav.cta', 'Book a Session')}</span>
                        <span>&rarr;</span>
                      </button>
                    </div>
                  </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <ConsultationModal 
        isOpen={modalOpen} 
        onClose={closeConsultation} 
        defaultService={selectedService}
      />
    </>
  );
}
