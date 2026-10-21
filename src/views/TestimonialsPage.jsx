import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import LanguageModal from '../components/LanguageModal';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Testimonials from '../components/sections/Testimonials';
import { useContent } from '../context/ContentContext';
import pageStyles from '../styles/page.module.css';

export default function TestimonialsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { content, t } = useContent();

  const openConsultation = () => setModalOpen(true);
  const closeConsultation = () => setModalOpen(false);

  return (
    <>
      <SeoHead 
        customTitle={`${content?.testimonials?.headline || 'Client Testimonials'} | Dr. Mayank Ahooja`}
        customDescription="Words from those who found harmony, peace, and stress relief through guidance with Dr. Mayank Ahooja."
      />
      <LanguageModal />
      <Nav onOpenConsultation={openConsultation} />

      <main id="main-content" className={pageStyles.pageWrapper}>
        <div className={pageStyles.container}>
          <Breadcrumbs items={[{ label: t('nav.testimonials', 'Testimonials') }]} />
        </div>

        <Testimonials />

        <div className={pageStyles.container} style={{ textAlign: 'center', marginTop: '3rem' }}>
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
