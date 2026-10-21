import React, { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import LanguageModal from '../components/LanguageModal';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { useContent } from '../context/ContentContext';
import pageStyles from '../styles/page.module.css';
import styles from './TermsPage.module.css';

export default function TermsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { content, t } = useContent();

  const openConsultation = () => setModalOpen(true);
  const closeConsultation = () => setModalOpen(false);

  // Pull from active language JSON, with English hardcoded fallbacks
  const termsData = content?.terms || {};

  const tag          = termsData.tag          || t('terms.tag',          'LEGAL NOTICE');
  const title        = termsData.title         || t('terms.title',        'Terms & Conditions');
  const subtitle     = termsData.subtitle      || t('terms.subtitle',     'Please read these terms carefully before booking a session or participating in any wellness programme offered by Dr. Mayank Ahooja.');
  const lastUpdated  = termsData.lastUpdated   || t('terms.lastUpdated',  'Last updated: October 2026');
  const acceptanceNote = termsData.acceptanceNote || t('terms.acceptanceNote', 'By booking a session with Dr. Mayank Ahooja, you confirm that you have read, understood, and agreed to all of the above terms and conditions.');

  // Sections come directly from the active language JSON
  const defaultSections = [
    {
      title: 'Nature of Holistic Services',
      points: [
        'Holistic sessions (meditation, breathwork, energy balance) are complementary wellness practices.',
        'Sessions are not clinical consultations and do not create a doctor-patient relationship.',
        'These services do not diagnose, treat, or replace licensed medical healthcare.',
      ],
    },
    {
      title: 'Individual Results & No Guarantees',
      points: [
        'Results vary naturally from person to person based on individual factors.',
        'We do not make medical or therapeutic outcome guarantees.',
        'Progress is a collaborative effort between the practitioner and participant.',
      ],
    },
    {
      title: 'Not a Substitute for Medical Advice',
      points: [
        'Always consult a licensed healthcare professional for any medical or mental health condition.',
        'Never stop, alter, or delay prescribed medical treatment in favor of holistic practices.',
        'Information shared is for educational and wellness cultivation purposes only.',
      ],
    },
    {
      title: 'Participant Responsibility',
      points: [
        'Participation in all sessions and practices is completely voluntary.',
        'You assume full personal responsibility for your choices, actions, and lifestyle habits.',
        'You agree to engage with mindful presence, honesty, and mutual respect.',
      ],
    },
    {
      title: 'Confidentiality & Privacy',
      points: [
        'All personal information and discussions in sessions are kept strictly confidential.',
        'Booking details (name, email, phone, notes) are used solely to coordinate your sessions.',
        'We never sell, rent, or share your personal data with third parties.',
      ],
    },
    {
      title: 'Session Language',
      points: [
        'All 1:1 consultations and group programs are conducted in English and Russian only.',
        'You confirm comfortable conversational proficiency in either English or Russian.',
        'Live sessions in other languages are not currently available.',
      ],
    },
    {
      title: 'Informed Consent',
      points: [
        'Booking a session confirms you have read and agreed to these terms in full.',
        'You voluntarily consent to receive complementary wellness and meditation guidance.',
        'We appreciate your commitment to responsible, respectful participation.',
      ],
    },
    {
      title: 'Changes to These Terms',
      points: [
        'These terms may be updated periodically to reflect service or regulatory changes.',
        'Continued participation indicates your acceptance of the revised terms.',
        'Significant changes will be communicated during the reservation process.',
      ],
    },
  ];

  const sections = (termsData.sections && termsData.sections.length > 0)
    ? termsData.sections
    : defaultSections;

  return (
    <>
      <SeoHead
        customTitle={`${title} | Dr. Mayank Ahooja`}
        customDescription={subtitle}
      />
      <LanguageModal />
      <Nav onOpenConsultation={openConsultation} />

      <main id="main-content" className={pageStyles.pageWrapper}>
        <div className={pageStyles.container}>
          <Breadcrumbs items={[{ label: title }]} />

          <div className={styles.hero}>
            <span className={styles.tag}>{tag}</span>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
            <p className={styles.lastUpdated}>{lastUpdated}</p>
          </div>

          <div className={styles.content}>
            {sections.map((section, idx) => (
              <section key={idx} className={styles.section} id={`section-${idx}`}>
                <div className={styles.sectionNumber}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className={styles.sectionBody}>
                  <h2 className={styles.sectionTitle}>{section.title}</h2>
                  <ul className={styles.pointsList}>
                    {(section.points || []).map((point, pIdx) => (
                      <li key={pIdx} className={styles.point}>
                        <span className={styles.pointBullet} aria-hidden="true">✦</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}

            {/* Final acceptance note */}
            <div className={styles.acceptanceBox}>
              <p>{acceptanceNote}</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '1rem' }}>
            <button type="button" className={pageStyles.ctaBtn} onClick={openConsultation}>
              {t('nav.cta', 'Book a Session')} &rarr;
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <ConsultationModal isOpen={modalOpen} onClose={closeConsultation} />
    </>
  );
}
