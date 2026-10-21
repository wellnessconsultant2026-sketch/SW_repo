import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import LanguageModal from '../components/LanguageModal';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Gallery from '../components/sections/Gallery';
import { useContent } from '../context/ContentContext';
import pageStyles from '../styles/page.module.css';

export default function GalleryPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { content, t } = useContent();

  const openConsultation = () => setModalOpen(true);
  const closeConsultation = () => setModalOpen(false);

  return (
    <>
      <SeoHead 
        customTitle={`${content?.gallery?.headline || 'Sanctuary Moments & Gallery'} | Dr. Mayank Ahooja`}
        customDescription="A visual journey of stillness: explore photos and atmosphere of one-on-one sessions, meditation retreats, and sacred sanctuary spaces of Dr. Mayank Ahooja."
      />
      <LanguageModal />
      <Nav onOpenConsultation={openConsultation} />

      <main id="main-content" className={pageStyles.pageWrapper}>
        <div className={pageStyles.container}>
          <Breadcrumbs items={[{ label: t('nav.gallery', 'Gallery') }]} />
        </div>

        <Gallery />
      </main>

      <Footer />
      <ConsultationModal isOpen={modalOpen} onClose={closeConsultation} />
    </>
  );
}
