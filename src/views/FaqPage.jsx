import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import LanguageModal from '../components/LanguageModal';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Faq from '../components/sections/Faq';
import { useContent } from '../context/ContentContext';
import pageStyles from '../styles/page.module.css';

export default function FaqPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { content, t } = useContent();

  const openConsultation = () => setModalOpen(true);
  const closeConsultation = () => setModalOpen(false);

  const faqItems = content?.faq?.items || [];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  return (
    <>
      <SeoHead 
        customTitle={`${content?.faq?.headline || 'Frequently Asked Questions'} | Dr. Mayank Ahooja`}
        customDescription="Find answers to common questions regarding individual consultations, meditation guidance, virtual vs sanctuary sessions, and wellness philosophy with Dr. Mayank Ahooja."
        structuredData={faqSchema}
      />
      <LanguageModal />
      <Nav onOpenConsultation={openConsultation} />

      <main id="main-content" className={pageStyles.pageWrapper}>
        <div className={pageStyles.container}>
          <Breadcrumbs items={[{ label: t('nav.faq', 'FAQ') }]} />
        </div>

        <Faq />

        <div className={pageStyles.container} style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            {t('faq.reachOut', 'Have a personal question not covered here? Reach out directly.')}
          </p>
          <button type="button" className={pageStyles.ctaBtn} onClick={openConsultation}>
            {t('nav.cta', 'Book a Session')} &rarr;
          </button>
        </div>
      </main>

      <Footer />
      <ConsultationModal isOpen={modalOpen} onClose={closeConsultation} />
    </>
  );
}
