import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import LanguageModal from '../components/LanguageModal';
import SeoHead from '../components/SeoHead';

// Previews for Homepage Overview & Navigation Hub
import Hero from '../components/sections/Hero';
import Pause from '../components/sections/Pause';
import AboutPreview from '../components/sections/AboutPreview';
import ServicesPreview from '../components/sections/ServicesPreview';
import WellnessPreview from '../components/sections/WellnessPreview';
import GalleryPreview from '../components/sections/GalleryPreview';
import ProgramsPreview from '../components/sections/ProgramsPreview';
import ArticlesPreview from '../components/sections/ArticlesPreview';
import TestimonialsPreview from '../components/sections/TestimonialsPreview';
import FaqPreview from '../components/sections/FaqPreview';
import ContactPreview from '../components/sections/ContactPreview';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  const openConsultation = () => setModalOpen(true);
  const closeConsultation = () => setModalOpen(false);

  return (
    <>
      <SeoHead />
      <LanguageModal />

      {/* Navigation */}
      <Nav onOpenConsultation={openConsultation} />

      {/* Main Overview Hub: Previews with clear CTAs to dedicated pages */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero onOpenConsultation={openConsultation} />

        {/* Transition Pause */}
        <Pause />

        {/* About Preview -> /about/ */}
        <AboutPreview onOpenConsultation={openConsultation} />

        {/* Services Preview (4 Featured Cards) -> /services/:slug/ and /services/ */}
        <ServicesPreview onOpenConsultation={openConsultation} />

        {/* Wellness Preview (5 Pillars) -> /wellness/ */}
        <WellnessPreview />

        {/* Gallery Preview (6 Thumbnails) -> /gallery/ */}
        <GalleryPreview />

        {/* Programs Preview (2 Featured) -> /programs/ */}
        <ProgramsPreview onOpenConsultation={openConsultation} />

        {/* Latest Articles Preview (2-3 Cards) -> /articles/:slug/ and /articles/ */}
        <ArticlesPreview />

        {/* Testimonials Preview (2-3 Selected) -> /testimonials/ */}
        <TestimonialsPreview />

        {/* FAQ Preview (3-4 Key Items) -> /faq/ */}
        <FaqPreview />

        {/* Contact CTA -> /contact/ */}
        <ContactPreview onOpenConsultation={openConsultation} />
      </main>

      {/* Footer with Medical Safety Disclaimer */}
      <Footer />

      {/* Reserve Session Modal */}
      <ConsultationModal isOpen={modalOpen} onClose={closeConsultation} />
    </>
  );
}
