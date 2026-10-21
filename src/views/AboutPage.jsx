import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import LanguageModal from '../components/LanguageModal';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import About from '../components/sections/About';
import { useContent } from '../context/ContentContext';
import styles from '../styles/page.module.css';

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { content, t } = useContent();

  const openConsultation = () => setModalOpen(true);
  const closeConsultation = () => setModalOpen(false);

  return (
    <>
      <SeoHead 
        customTitle={`${t('nav.about', 'About Dr. Mayank Ahooja')} | Doctor of Medicine & Meditation Master`}
        customDescription="Learn about Dr. Mayank Ahooja — Doctor of Medicine, Meditation Master, Spiritual Coach, and Motivational Speaker. Transformation Begins Within."
      />
      <LanguageModal />
      <Nav onOpenConsultation={openConsultation} />

      <main id="main-content" className={styles.pageWrapper}>
        <div className={styles.container}>
          <Breadcrumbs items={[{ label: t('nav.about', 'About') }]} />
        </div>

        <About onOpenConsultation={openConsultation} />
      </main>

      <Footer />
      <ConsultationModal isOpen={modalOpen} onClose={closeConsultation} />
    </>
  );
}
