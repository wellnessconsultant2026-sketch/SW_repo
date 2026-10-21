import React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
  const { content, t } = useContent();
  const { currentLang } = useLanguage();

  const brand = content?.brand || {};
  const footerData = content?.footer || {};

  const navLinks = [
    { label: t('nav.about', 'About'), to: `/${currentLang}/about` },
    { label: t('nav.services', 'Services'), to: `/${currentLang}/services` },
    { label: t('nav.wellness', 'Wellness'), to: `/${currentLang}/wellness` },
    { label: t('nav.programs', 'Programs'), to: `/${currentLang}/programs` },
    { label: t('nav.articles', 'Articles'), to: `/${currentLang}/articles` },
    { label: t('nav.contact', 'Contact'), to: `/${currentLang}/contact` },
    { label: t('nav.terms', 'Terms & Conditions'), to: `/${currentLang}/terms` },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandRow}>
          <div className={styles.brandInfo}>
            <span className={styles.brandName}>{brand.name || 'Dr. Mayank Ahooja'}</span>
            <span className={styles.brandTitle}>{brand.title || 'Doctor of Medicine | Meditation Master | Spiritual Coach | Motivational Speaker'}</span>
            <span className={styles.brandLocation}>{brand.location || 'Chișinău, Moldova & Global Virtual Sanctuary'}</span>
          </div>

          <div className={styles.linksRow}>
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to} className={styles.link}>
                {link.label}
              </Link>
            ))}
            {brand.email && (
              <a href={`mailto:${brand.email}`} className={styles.link}>
                {brand.email}
              </a>
            )}
          </div>
        </div>

        {/* Prominent, readable Medical Disclaimer */}
        <div className={styles.disclaimerRow}>
          <p className={styles.disclaimerText}>
            {footerData.disclaimer || `Disclaimer.

Holistic methods, such as energy, spiritual, and emotional healing, are intended to provide additional support for your well-being.
They do not aim to replace traditional medical, psychological, or other professional healthcare services. It should not be considered a substitute for medical or professional consultation.

We used the methods that can support your well-being, but it’s important to remember that every person is unique, and results may vary.
We always recommend that you trust your own judgment and, if you have any doubts, consult a healthcare professional. Our intention is to offer a comprehensive approach to health improvement, but we cannot guarantee specific results, as they depend on many personal factors.

INFORMED CONSENT
By participating in this wellness programme, you agree that you have read and understood the terms of this disclaimer. We appreciate your participation and encourage you to apply the knowledge you have gained responsibly and with respect for yourself and others.`}
          </p>
        </div>

        <div className={styles.bottomRow}>
          <span className={styles.copy}>
            &copy; {new Date().getFullYear()} {brand.name || 'Dr. Mayank Ahooja'}. {t('footer.copyright', 'All rights reserved.')}
          </span>
          <span className={styles.badge}>
            {brand.title || 'Doctor of Medicine · Meditation Master · Spiritual Coach · Motivational Speaker'}
          </span>
        </div>
      </div>
    </footer>
  );
}
