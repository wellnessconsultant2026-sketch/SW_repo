import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { ALL_COUNTRIES, FEATURED_COUNTRIES, getCitiesForCountry } from '../data/countriesAndCities';
import styles from './ConsultationModal.module.css';

export default function ConsultationModal({ isOpen, onClose, defaultService }) {
  const { content, t } = useContent();
  const { currentLang } = useLanguage();
  const [languageAccepted, setLanguageAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    mobile: '',
    country: '',
    city: '',
    symptoms: '',
    preferredFocus: defaultService || 'individual-consultation',
    intentionsNote: ''
  });

  const [isCustomCity, setIsCustomCity] = useState(false);
  const availableCities = useMemo(() => {
    return getCitiesForCountry(formData.country);
  }, [formData.country]);

  const handleCountryChange = (e) => {
    const selected = e.target.value;
    setFormData(prev => ({ ...prev, country: selected, city: '' }));
    setIsCustomCity(false);
  };

  const handleCitySelectChange = (e) => {
    const val = e.target.value;
    if (val === 'OTHER') {
      setIsCustomCity(true);
      setFormData(prev => ({ ...prev, city: '' }));
    } else {
      setIsCustomCity(false);
      setFormData(prev => ({ ...prev, city: val }));
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      setLanguageAccepted(false);
      setSubmitted(false);
      setSubmitError('');
      setTermsAccepted(false);
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
    }
    if (defaultService) {
      setFormData(prev => ({ ...prev, preferredFocus: defaultService }));
    }

    return () => {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }
    };
  }, [defaultService, isOpen]);

  const modalData = content?.modal || {};
  const servicesList = content?.services?.items || [];
  const programsList = (content?.programs?.items || []).filter(p => p.visible !== false);

  const symptomSuggestions = modalData.symptomSuggestions || [
    'Mental Stress & Overload',
    'Low Energy & Chronic Fatigue',
    'Insomnia & Restless Sleep',
    'Neck & Back Physical Tension',
    'Anxiety & Inner Restlessness',
    'Emotional Heaviness & Burnout',
    'Brain Fog & Lack of Clarity',
    'Chakra & Energy Imbalance'
  ];

  const handleToggleSymptom = (suggestion) => {
    setFormData(prev => {
      const currentList = prev.symptoms
        ? prev.symptoms.split(',').map(s => s.trim()).filter(Boolean)
        : [];
      
      const exists = currentList.some(s => s.toLowerCase() === suggestion.toLowerCase());
      let nextList;
      if (exists) {
        nextList = currentList.filter(s => s.toLowerCase() !== suggestion.toLowerCase());
      } else {
        nextList = [...currentList, suggestion];
      }
      return { ...prev, symptoms: nextList.join(', ') };
    });
  };

  const isSymptomActive = (suggestion) => {
    if (!formData.symptoms) return false;
    return formData.symptoms
      .toLowerCase()
      .split(',')
      .map(s => s.trim())
      .includes(suggestion.toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          age: formData.age,
          gender: formData.gender,
          email: formData.email,
          phone: formData.mobile,
          country: formData.country,
          city: formData.city,
          symptoms: formData.symptoms,
          preferredFocus: formData.preferredFocus,
          service: formData.preferredFocus,
          intentionsNote: formData.intentionsNote,
          message: formData.intentionsNote
        })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to submit request');
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setLanguageAccepted(false);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className={styles.backdrop} 
        onClick={handleClose} 
        role="presentation"
        data-lenis-prevent="true"
      >
        <motion.div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.96, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 14 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Circular Close Button with SVG */}
          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Close modal"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {!languageAccepted ? (
            <div className={styles.languagePopup}>
              <div className={styles.languageIconBadge} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>

              <span className={styles.languageTag}>
                {modalData.languageNoticeBadge || 'SESSION NOTICE'}
              </span>

              <h3 id="modal-title" className={styles.languageTitle}>
                {modalData.languageNoticeTitle || 'Session Language Notice'}
              </h3>

              <div className={styles.languageHighlightCard}>
                <p className={styles.languageMainNotice}>
                  “All the sessions will be held in English and Russian language.”
                </p>
                <div className={styles.languageDivider} />
                <p className={styles.languageSubNoticeRu}>
                  «Все сессии проводятся на английском и русском языках.»
                </p>
              </div>

              <p className={styles.languageExplanation}>
                {modalData.languageNoticeSubtext ||
                  'Please confirm that you are comfortable conducting your consultation in English or Russian before proceeding to reservation.'}
              </p>

              <div className={styles.languageActions}>
                <button
                  type="button"
                  className={styles.languageAcceptBtn}
                  onClick={() => setLanguageAccepted(true)}
                >
                  <span>{modalData.languageAcceptBtn || 'I Understand & Accept'}</span> <span className={styles.arrow}>&rarr;</span>
                </button>
              </div>

              <div className={styles.trustRow} style={{ marginTop: '1.25rem' }}>
                <svg className={styles.lockSvg} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span className={styles.trustText}>
                  {modalData.trustText || t('modal.trustText', 'Mandatory session requirement • Acceptance required to proceed')}
                </span>
              </div>
            </div>
          ) : submitted ? (() => {
            const thankYouWord = {
              en: 'Thank You',
              ru: 'Спасибо',
              ro: 'Mulțumim',
              fr: 'Merci',
              de: 'Danke',
              it: 'Grazie',
              es: 'Gracias',
            }[currentLang] || 'Thank You';

            return (
              <div className={styles.successState}>
                <p className={styles.successThankWord} aria-hidden="true">{thankYouWord}</p>

                <h3 className={styles.successTitle}>
                  {modalData.successTitle || t('modal.successTitle', 'Your Sanctuary Request Has Been Received')}
                </h3>

                <p className={styles.successText}>
                  {modalData.successMsg || t('modal.successMsg', 'Dr. Mayank Ahooja will review your inquiry with quiet care. We will reach out within 24 hours.')}
                </p>

                <div className={styles.successMeta}>
                  <div className={styles.successMetaItem}>
                    <span>{formData.name}</span>
                  </div>
                  {formData.email && (
                    <div className={styles.successMetaItem}>
                      <span>{formData.email}</span>
                    </div>
                  )}
                  <div className={styles.successMetaItem}>
                    <span>{t('modal.successResponse', 'Response within 24 hours')}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={handleClose}
                >
                  {modalData.close || t('modal.close', 'Close')}
                </button>
              </div>
            );
          })() : (
            <form onSubmit={handleSubmit} className={styles.form}>
              
              {/* Header */}
              <div className={styles.header}>
                <span className={styles.tag}>{modalData.tag || t('modal.tag', 'SANCTUARY APPOINTMENT')}</span>
                <h3 id="modal-title" className={styles.title}>
                  {modalData.title || 'Reserve Your Sanctuary Session'}
                </h3>
                <p className={styles.subtitle}>
                  {modalData.subtitle || 'A tranquil dialogue tailored to your personal wellness journey.'}
                </p>
              </div>

              {/* Section 1: Guest Profile */}
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTitle}>{modalData.sectionProfile || 'Guest Profile'}</span>
              </div>

              {/* Full Name */}
              <div className={styles.field}>
                <label htmlFor="modal-name" className={styles.label}>
                  {modalData.fullName || 'Full Name'} <span className={styles.reqStar}>*</span>
                </label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  placeholder={modalData.fullNamePlaceholder || 'Your full name'}
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={styles.input}
                />
              </div>

              {/* Age & Gender Row */}
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="modal-age" className={styles.label}>
                    {modalData.age || 'Age'}
                  </label>
                  <input
                    id="modal-age"
                    type="number"
                    min="1"
                    max="120"
                    placeholder={modalData.agePlaceholder || 'e.g. 34'}
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="modal-gender" className={styles.label}>
                    {modalData.gender || 'Gender'}
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="modal-gender"
                      value={formData.gender}
                      onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                      className={styles.select}
                    >
                      <option value="">{modalData.genderSelect || 'Select gender'}</option>
                      <option value="Female">{modalData.genderFemale || 'Female'}</option>
                      <option value="Male">{modalData.genderMale || 'Male'}</option>
                      <option value="Other">{modalData.genderOther || 'Non-binary / Other'}</option>
                      <option value="Prefer not to say">{modalData.genderPreferNot || 'Prefer not to say'}</option>
                    </select>
                    <span className={styles.selectChevron} aria-hidden="true">▾</span>
                  </div>
                </div>
              </div>

              {/* Section 2: Contact Information */}
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTitle}>{modalData.sectionContact || 'Contact & Location'}</span>
              </div>

              {/* Email & Mobile Row */}
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="modal-email" className={styles.label}>
                    {modalData.email || 'Email Address'} <span className={styles.reqStar}>*</span>
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    placeholder={modalData.emailPlaceholder || 'you@example.com'}
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={styles.input}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="modal-phone" className={styles.label}>
                    {modalData.phone || 'Mobile / WhatsApp'} <span className={styles.reqStar}>*</span>
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    inputMode="tel"
                    placeholder={modalData.phonePlaceholder || '+373 60000000'}
                    value={formData.mobile}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Country & City Row */}
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="modal-country" className={styles.label}>
                    {modalData.country || 'Country'}
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="modal-country"
                      value={formData.country}
                      onChange={handleCountryChange}
                      className={styles.select}
                    >
                      <option value="">{modalData.countrySelect || 'Select Country'}</option>
                      <optgroup label={modalData.optgroupPopular || 'Popular / Regional'}>
                        {FEATURED_COUNTRIES.map((c) => (
                          <option key={`featured-${c}`} value={c}>{c}</option>
                        ))}
                      </optgroup>
                      <optgroup label={modalData.optgroupAllCountries || 'All Countries (A-Z)'}>
                        {ALL_COUNTRIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </optgroup>
                    </select>
                    <span className={styles.selectChevron} aria-hidden="true">▾</span>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="modal-city" className={styles.label}>
                    {modalData.city || 'City'}
                  </label>
                  {availableCities.length > 0 ? (
                    <>
                      <div className={styles.selectWrapper}>
                        <select
                          id="modal-city"
                          disabled={!formData.country}
                          value={isCustomCity ? 'OTHER' : formData.city}
                          onChange={handleCitySelectChange}
                          className={styles.select}
                        >
                          <option value="">
                            {formData.country
                              ? (modalData.citySelect || 'Select City')
                              : (modalData.selectCountryFirst || 'Select country first')}
                          </option>
                          {availableCities.map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                          <option value="OTHER">{modalData.cityOther || 'Other / Type city manually...'}</option>
                        </select>
                        <span className={styles.selectChevron} aria-hidden="true">▾</span>
                      </div>
                      {isCustomCity && (
                        <input
                          type="text"
                          placeholder={modalData.cityOtherPlaceholder || 'Enter your city or town name'}
                          value={formData.city}
                          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                          className={styles.input}
                          style={{ marginTop: '0.45rem' }}
                          autoFocus
                        />
                      )}
                    </>
                  ) : (
                    <input
                      id="modal-city"
                      type="text"
                      disabled={!formData.country}
                      placeholder={
                        !formData.country
                          ? (modalData.selectCountryFirst || 'Select country first')
                          : (modalData.cityPlaceholder || 'Enter your city name')
                      }
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      className={styles.input}
                    />
                  )}
                </div>
              </div>

              {/* Section 3: Assessment & Symptoms */}
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTitle}>{modalData.sectionHealth || 'Health & Vitality Focus'}</span>
              </div>

              {/* Symptoms & Suggestions */}
              <div className={styles.field}>
                <label htmlFor="modal-symptoms" className={styles.label}>
                  {modalData.symptoms || 'Symptoms & Areas of Concern'}
                </label>
                <p className={styles.symptomsSubhead}>
                  {modalData.symptomsSubtitle || 'Select suggestions below or write your own:'}
                </p>

                {symptomSuggestions.length > 0 && (
                  <div className={styles.symptomsChips} role="group" aria-label="Symptom suggestions">
                    {symptomSuggestions.map((sym, idx) => {
                      const active = isSymptomActive(sym);
                      return (
                        <button
                          type="button"
                          key={idx}
                          className={`${styles.symptomChip} ${active ? styles.symptomChipActive : ''}`}
                          onClick={() => handleToggleSymptom(sym)}
                        >
                          <span className={styles.chipAction}>{active ? '✓' : '+'}</span>
                          <span className={styles.chipText}>{sym}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                <textarea
                  id="modal-symptoms"
                  rows={3}
                  placeholder={modalData.symptomsPlaceholder || 'Describe your symptoms, daily stress, sleep quality, bodily tension, or what you wish to heal...'}
                  value={formData.symptoms}
                  onChange={(e) => setFormData(prev => ({ ...prev, symptoms: e.target.value }))}
                  className={styles.textarea}
                />
              </div>

              {/* Section 4: Focus & Intentions */}
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTitle}>{modalData.sectionFocus || 'Sanctuary Session Focus'}</span>
              </div>

              {/* Preferred Modality / Service */}
              <div className={styles.field}>
                <label htmlFor="modal-service" className={styles.label}>
                  {modalData.service || 'Preferred Focus'}
                </label>
                <div className={styles.selectWrapper}>
                  <select
                    id="modal-service"
                    value={formData.preferredFocus}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferredFocus: e.target.value }))}
                    className={styles.select}
                  >
                    {servicesList.length > 0 && (
                      <optgroup label={modalData.optgroupServices || t('nav.services', 'Wellness Services')}>
                        {servicesList.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title}
                          </option>
                        ))}
                      </optgroup>
                    )}
                    {programsList.length > 0 && (
                      <optgroup label={modalData.optgroupPrograms || t('nav.programs', 'Workshops & Guided Programs')}>
                        {programsList.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title}
                          </option>
                        ))}
                      </optgroup>
                    )}
                  </select>
                  <span className={styles.selectChevron} aria-hidden="true">▾</span>
                </div>
              </div>

              {/* Additional Notes */}
              <div className={styles.field}>
                <label htmlFor="modal-message" className={styles.label}>
                  {modalData.message || 'Personal Intentions & Notes'}
                </label>
                <textarea
                  id="modal-message"
                  rows={2}
                  placeholder={modalData.messagePlaceholder || 'Share what brings you to this practice...'}
                  value={formData.intentionsNote}
                  onChange={(e) => setFormData(prev => ({ ...prev, intentionsNote: e.target.value }))}
                  className={styles.textarea}
                />
              </div>

              {submitError && <p role="alert" className={styles.error}>{submitError}</p>}

              {/* Terms & Conditions Checkbox */}
              <div className={styles.termsCheckboxRow}>
                <label className={styles.termsLabel}>
                  <input
                    type="checkbox"
                    className={styles.termsCheckbox}
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    required
                  />
                  <span className={styles.termsText}>
                    {t('modal.termsCheckboxLabel', 'I have read and agree to the')}{' '}
                    <a
                      href={`/${currentLang}/terms`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.termsLink}
                    >
                      {t('modal.termsCheckboxLink', 'Terms & Conditions')}
                    </a>
                  </span>
                </label>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitting || !termsAccepted}
              >
                <span>{submitting ? (modalData.submitting || t('modal.submitting', 'Sending Request...')) : (modalData.submit || t('modal.submit', 'Confirm Reservation Request'))}</span>
                <span className={styles.arrow}>&rarr;</span>
              </button>

              <div className={styles.trustRow}>
                <svg className={styles.lockSvg} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span className={styles.trustText}>
                  {t('modal.securityNote', 'Direct confidential dialogue with Dr. Mayank • Response within 24 hours')}
                </span>
              </div>

            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
