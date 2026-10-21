import React, { useState, useMemo } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import LanguageModal from '../components/LanguageModal';
import SeoHead from '../components/SeoHead';
import Breadcrumbs from '../components/common/Breadcrumbs';
import { useContent } from '../context/ContentContext';
import { ALL_COUNTRIES, FEATURED_COUNTRIES, getCitiesForCountry } from '../data/countriesAndCities';
import pageStyles from '../styles/page.module.css';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    symptoms: '',
    service: 'individual-consultation',
    message: ''
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

  const { content, t } = useContent();

  const openConsultation = () => setModalOpen(true);
  const closeConsultation = () => setModalOpen(false);

  const contactData = content?.contact || {};
  const brandData = content?.brand || {};
  const servicesList = content?.services?.items || [];
  const programsList = (content?.programs?.items || []).filter(p => p.visible !== false);
  const modalData = content?.modal || {};

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
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          age: formData.age,
          gender: formData.gender,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          symptoms: formData.symptoms,
          service: formData.service,
          preferredFocus: formData.service,
          message: formData.message,
          intentionsNote: formData.message
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send request');
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SeoHead 
        customTitle={`${contactData.headline || 'Sanctuary Contact & Booking'} | Dr. Mayank Ahooja`}
        customDescription="Schedule a private consultation, inquire about meditation retreats, or contact Dr. Mayank Ahooja in Chișinău, Moldova and worldwide."
      />
      <LanguageModal />
      <Nav onOpenConsultation={openConsultation} />

      <main id="main-content" className={pageStyles.pageWrapper}>
        <div className={pageStyles.container}>
          <Breadcrumbs items={[{ label: t('nav.contact', 'Contact') }]} />

          <header className={pageStyles.pageHeader}>
            <span className={pageStyles.tag}>{contactData.tag || 'SANCTUARY & BOOKING'}</span>
            <h1 className={pageStyles.title}>{contactData.headline || 'Take the First Step Toward Inner Harmony'}</h1>
            <p className={pageStyles.subtitle}>
              {contactData.subhead || 'Book your personalized consultation or reach out with any questions regarding our sessions and workshops.'}
            </p>
          </header>

          <div className={styles.contactLayout}>
            {/* Sanctuary Details */}
            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>{contactData.detailsTitle || 'Sanctuary Details'}</h2>
              <p className={styles.infoDesc}>
                {contactData.detailsDesc || 'Whether visiting our sanctuary in person or joining our global virtual community, we provide a peaceful, grounded space for your inner transformation.'}
              </p>

              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>{contactData.locationLabel || 'Sanctuary Location'}</span>
                  <span className={styles.infoValue}>{contactData.location || 'Chișinău, Republic of Moldova & Virtual Sanctuary'}</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>{contactData.hoursLabel || 'Consultation Hours'}</span>
                  <span className={styles.infoValue}>{contactData.hours || 'By appointment only • Monday – Saturday'}</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>{contactData.emailLabel || 'Direct Email'}</span>
                  <span className={styles.infoValue}>
                    <a href={`mailto:${contactData.directEmail || brandData.email || 'contact@drmayankahooja.com'}`} className={styles.infoLink}>
                      {contactData.directEmail || brandData.email || 'contact@drmayankahooja.com'}
                    </a>
                  </span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>{contactData.phoneLabel || 'Phone / WhatsApp'}</span>
                  <span className={styles.infoValue}>
                    <a href={`tel:${contactData.phone || brandData.phone || '+37360123456'}`} className={styles.infoLink}>
                      {contactData.phone || brandData.phone || '+373 60 123 456'}
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Booking Form */}
            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.successBox}>
                  <div className={styles.successIcon}>✓</div>
                  <h3 className={styles.successHeading}>
                    {modalData.successTitle || 'Your Sanctuary Request Has Been Received'}
                  </h3>
                  <p className={styles.successText}>
                    {modalData.successMsg || 'Dr. Mayank Ahooja will review your inquiry with quiet care. We will reach out within 24 hours.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className={styles.formTitle}>{modalData.title || 'Reserve Your Session'}</h2>
                  <p className={styles.formSubtitle}>
                    {modalData.subtitle || 'Share your intentions and we will coordinate your personalized session.'}
                  </p>

                  {/* Full Name */}
                  <div className={styles.field}>
                    <label htmlFor="contact-name" className={styles.label}>
                      {modalData.fullName || 'Full Name'} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder={modalData.fullNamePlaceholder || 'Your full name'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={styles.input}
                    />
                  </div>

                  {/* Age & Gender Row */}
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label htmlFor="contact-age" className={styles.label}>
                        {modalData.age || 'Age'}
                      </label>
                      <input
                        id="contact-age"
                        type="number"
                        min="1"
                        max="120"
                        placeholder={modalData.agePlaceholder || 'e.g. 34'}
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-gender" className={styles.label}>
                        {modalData.gender || 'Gender'}
                      </label>
                      <select
                        id="contact-gender"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className={styles.select}
                      >
                        <option value="">{modalData.genderSelect || 'Select gender'}</option>
                        <option value="Female">{modalData.genderFemale || 'Female'}</option>
                        <option value="Male">{modalData.genderMale || 'Male'}</option>
                        <option value="Other">{modalData.genderOther || 'Non-binary / Other'}</option>
                        <option value="Prefer not to say">{modalData.genderPreferNot || 'Prefer not to say'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Email & Phone Row */}
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label htmlFor="contact-email" className={styles.label}>
                        {modalData.email || 'Email Address'} *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder={modalData.emailPlaceholder || 'you@example.com'}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-phone" className={styles.label}>
                        {modalData.phone || 'Phone / WhatsApp'} *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder={modalData.phonePlaceholder || '+373 60000000'}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                  </div>

                  {/* Country & City Row */}
                  <div className={styles.fieldRow}>
                    <div className={styles.field}>
                      <label htmlFor="contact-country" className={styles.label}>
                        {modalData.country || 'Country'}
                      </label>
                      <select
                        id="contact-country"
                        value={formData.country}
                        onChange={handleCountryChange}
                        className={styles.select}
                      >
                        <option value="">{modalData.countrySelect || 'Select Country'}</option>
                        <optgroup label={modalData.optgroupPopular || 'Popular / Regional'}>
                          {FEATURED_COUNTRIES.map((c) => (
                            <option key={`contact-featured-${c}`} value={c}>{c}</option>
                          ))}
                        </optgroup>
                        <optgroup label={modalData.optgroupAllCountries || 'All Countries (A-Z)'}>
                          {ALL_COUNTRIES.map((c) => (
                            <option key={`contact-all-${c}`} value={c}>{c}</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contact-city" className={styles.label}>
                        {modalData.city || 'City'}
                      </label>
                      {availableCities.length > 0 ? (
                        <>
                          <select
                            id="contact-city"
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
                          id="contact-city"
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

                  {/* Symptoms & Suggestions */}
                  <div className={styles.field}>
                    <label htmlFor="contact-symptoms" className={styles.label}>
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
                      id="contact-symptoms"
                      rows={3}
                      placeholder={modalData.symptomsPlaceholder || 'Describe your symptoms, daily stress, sleep issues, or what you wish to heal...'}
                      value={formData.symptoms}
                      onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                      className={styles.textarea}
                    />
                  </div>

                  {/* Preferred Focus / Modality */}
                  <div className={styles.field}>
                    <label htmlFor="contact-service" className={styles.label}>
                      {modalData.service || 'Preferred Focus'}
                    </label>
                    <select
                      id="contact-service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className={styles.select}
                    >
                      {servicesList.length > 0 && (
                        <optgroup label={modalData.optgroupServices || t('nav.services', 'Wellness Services')}>
                          {servicesList.map((srv) => (
                            <option key={srv.id} value={srv.id}>
                              {srv.title}
                            </option>
                          ))}
                        </optgroup>
                      )}
                      {programsList.length > 0 && (
                        <optgroup label={modalData.optgroupPrograms || t('nav.programs', 'Workshops & Guided Programs')}>
                          {programsList.map((prog) => (
                            <option key={prog.id} value={prog.id}>
                              {prog.title}
                            </option>
                          ))}
                        </optgroup>
                      )}
                    </select>
                  </div>

                  {/* Personal Intentions & Notes */}
                  <div className={styles.field}>
                    <label htmlFor="contact-message" className={styles.label}>
                      {modalData.message || 'Personal Intentions & Notes'}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      placeholder={modalData.messagePlaceholder || 'Share what brings you to this practice...'}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={styles.textarea}
                    />
                  </div>

                  {submitError && (
                    <p role="alert" style={{ color: '#dc3545', fontSize: '0.88rem', margin: '0 0 1rem' }}>
                      {submitError}
                    </p>
                  )}

                  <button type="submit" className={styles.submitBtn} disabled={submitting}>
                    {submitting ? (modalData.submitting || t('modal.submitting', 'Sending Request...')) : (modalData.submit || 'Confirm Reservation Request')} &rarr;
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ConsultationModal isOpen={modalOpen} onClose={closeConsultation} />
    </>
  );
}
