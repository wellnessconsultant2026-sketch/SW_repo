import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';
import styles from './Nav.module.css';

const LotusIcon = () => (
  <svg 
    className={styles.lotusIcon} 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Base petals */}
    <path 
      d="M16 26C16 26 8 23 8 15C8 9 12 7 16 6C20 7 24 9 24 15C24 23 16 26 16 26Z" 
      stroke="var(--gold-accent)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Inner left petal */}
    <path 
      d="M16 26C16 26 11 23 11 16C11 11 13 9 16 8" 
      stroke="var(--gold-accent)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Inner right petal */}
    <path 
      d="M16 26C16 26 21 23 21 16C21 11 19 9 16 8" 
      stroke="var(--gold-accent)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Outer left petal */}
    <path 
      d="M14 25C14 25 4 21 4 14C4 9 7 9 7 9C9 9 11 13 11 13" 
      stroke="var(--gold-accent)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    {/* Outer right petal */}
    <path 
      d="M18 25C18 25 28 21 28 14C28 9 25 9 25 9C23 9 21 13 21 13" 
      stroke="var(--gold-accent)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const navVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.06
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function Nav({ onOpenConsultation }) {
  const { content, t } = useContent();
  const { currentLang } = useLanguage();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);
  const previousFocusRef = useRef(null);

  const servicesList = (content?.services?.items || []).filter(s => s.visible !== false);

  const navItems = [
    { name: t('nav.home', 'Home'), path: `/${currentLang}`, id: 'home' },
    { name: t('nav.about', 'About'), path: `/${currentLang}/about`, id: 'about' },
    { name: t('nav.services', 'Services'), path: `/${currentLang}/services`, id: 'services', hasDropdown: true },
    { name: t('nav.wellness', 'Wellness'), path: `/${currentLang}/wellness`, id: 'wellness' },
    { name: t('nav.programs', 'Programs'), path: `/${currentLang}/programs`, id: 'programs' },
    { name: t('nav.articles', 'Articles'), path: `/${currentLang}/articles`, id: 'articles' },
    { name: t('nav.contact', 'Contact'), path: `/${currentLang}/contact`, id: 'contact' },
    { name: t('nav.terms', 'Terms'), path: `/${currentLang}/terms`, id: 'terms' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll and manage accessible focus trap
  useEffect(() => {
    if (mobileMenuOpen) {
      previousFocusRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        if (drawerRef.current) {
          const firstFocusable = drawerRef.current.querySelector(
            'a, button, [tabindex]:not([tabindex="-1"])'
          );
          firstFocusable?.focus();
        }
      }, 60);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    }
  }, [mobileMenuOpen]);

  // Keyboard navigation inside mobile drawer
  const handleDrawerKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setMobileMenuOpen(false);
      hamburgerRef.current?.focus();
      return;
    }

    if (e.key === 'Tab') {
      if (!drawerRef.current) return;
      const focusables = Array.from(
        drawerRef.current.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);

      if (focusables.length === 0) return;
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl || !drawerRef.current.contains(document.activeElement)) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl || !drawerRef.current.contains(document.activeElement)) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!drawerRef.current) return;
      const focusables = Array.from(
        drawerRef.current.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => !el.hasAttribute('disabled') && el.offsetParent !== null);

      const currentIndex = focusables.indexOf(document.activeElement);
      if (currentIndex !== -1) {
        e.preventDefault();
        const nextIndex = e.key === 'ArrowDown'
          ? (currentIndex + 1) % focusables.length
          : (currentIndex - 1 + focusables.length) % focusables.length;
        focusables[nextIndex]?.focus();
      }
    }
  };

  const isItemActive = (item) => {
    const currentPath = location.pathname;
    if (item.id === 'home') {
      return currentPath === `/${currentLang}` || currentPath === `/${currentLang}/`;
    }
    return currentPath.startsWith(item.path);
  };

  return (
    <motion.header 
      className={`${styles.navContainer} ${scrolled ? styles.scrolled : ''}`}
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className={styles.navInner}>
        <div className={styles.leftGroup}>
          <Link 
            to={`/${currentLang}`} 
            className={styles.brand} 
            style={{ textDecoration: 'none' }}
          >
            <div className={styles.lotusBadge}>
              <LotusIcon />
            </div>
            <div className={styles.brandTextGroup}>
              <span className={styles.brandName}>
                DR. MAYANK AHOOJA
              </span>
              <span className={styles.brandSubtitle}>
                Doctor of Medicine • Meditation Master
              </span>
            </div>
          </Link>
        </div>

        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul>
            {navItems.map((item) => {
              const isActive = isItemActive(item);

              if (item.hasDropdown) {
                return (
                  <li key={item.id} className={`${styles.navItem} ${styles.dropdownWrapper}`}>
                    <Link 
                      to={item.path} 
                      className={`${styles.navLink} ${styles.dropdownTrigger} ${isActive ? styles.activeLink : ''}`}
                    >
                      <span>{item.name}</span>
                      <svg className={styles.chevronIcon} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {isActive && <span className={styles.activeIndicator} />}
                    </Link>

                    {/* Luxury Floating Dropdown */}
                    <div className={styles.dropdownMenu} role="menu" aria-label="Services Submenu">
                      <div className={styles.dropdownHeader}>
                        <span className={styles.dropdownHeaderTag}>{t('nav.modalitiesTag', 'Sanctuary Modalities')}</span>
                        <Link to={`/${currentLang}/services`} className={styles.dropdownHeaderLink}>
                          {t('nav.viewAll', 'View All')} &rarr;
                        </Link>
                      </div>

                      <div className={styles.dropdownGrid}>
                        {servicesList.map((srv) => (
                          <Link 
                            key={srv.id} 
                            to={`/${currentLang}/services/${srv.id}`}
                            className={styles.dropdownItem}
                            role="menuitem"
                          >
                            <span className={styles.dropdownItemTitle}>{srv.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.id} className={styles.navItem}>
                  <Link 
                    to={item.path} 
                    className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                  >
                    {item.name}
                    {isActive && <span className={styles.activeIndicator} />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          {/* Permanent Desktop Language Dropdown */}
          <LanguageSelector />

          <button className={styles.ctaButton} onClick={onOpenConsultation}>
            <span>{t('nav.ctaNav', t('nav.cta', 'Book a Session'))}</span> <span className={styles.arrow}>&rarr;</span>
          </button>
          
          <button 
            ref={hamburgerRef}
            className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerOpen : ''}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t('nav.closeMenu', 'Close navigation menu') : t('nav.openMenu', 'Open navigation menu')}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              className={styles.mobileBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div 
              ref={drawerRef}
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label={t('nav.mainNav', 'Main navigation')}
              className={styles.mobileDrawer}
              onKeyDown={handleDrawerKeyDown}
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className={styles.mobileNavList} role="menu">
                {navItems.map((item) => {
                  const isActive = isItemActive(item);

                  if (item.hasDropdown) {
                    return (
                      <li key={item.id} role="none">
                        <button
                          type="button"
                          className={styles.mobileAccordionTrigger}
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setMobileServicesOpen(!mobileServicesOpen);
                            }
                          }}
                          aria-expanded={mobileServicesOpen}
                          aria-controls="mobile-services-sublist"
                          role="menuitem"
                        >
                          <span className={isActive ? styles.mobileActiveLink : ''}>{item.name}</span>
                          <span 
                            className={styles.accordionChevron} 
                            style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            aria-hidden="true"
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M2 4L6 8L10 4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </button>

                        {mobileServicesOpen && (
                          <ul id="mobile-services-sublist" className={styles.mobileSubList} role="menu">
                            <li role="none">
                              <Link 
                                to={item.path} 
                                className={styles.mobileSubLink} 
                                style={{ fontWeight: 600, color: 'var(--gold-accent)' }}
                                onClick={() => setMobileMenuOpen(false)}
                                role="menuitem"
                              >
                                {t('services.viewAll', 'All Services Overview')} &rarr;
                              </Link>
                            </li>
                            {servicesList.map(srv => (
                              <li key={srv.id} role="none">
                                <Link 
                                  to={`/${currentLang}/services/${srv.id}`} 
                                  className={styles.mobileSubLink}
                                  onClick={() => setMobileMenuOpen(false)}
                                  role="menuitem"
                                >
                                  {srv.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  }

                  return (
                    <li key={item.id} role="none">
                      <Link 
                        to={item.path} 
                        className={`${styles.mobileNavLink} ${isActive ? styles.mobileActiveLink : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                        role="menuitem"
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <button 
                className={styles.mobileCtaButton} 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
              >
                <span>{t('nav.cta', 'Book a Session')}</span> <span>&rarr;</span>
              </button>

              {/* Integrated Mobile Language Selector */}
              <LanguageSelector isMobile onCloseMobileMenu={() => setMobileMenuOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
