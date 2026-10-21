'use client';

import React from 'react';
import { useContent } from '../../context/ContentContext';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
  const { content } = useContent();

  const whatsapp = content?.whatsapp || {};
  const isEnabled = whatsapp.enabled !== false;

  const rawNumber = whatsapp.number || content?.brand?.phone || '+37360123456';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');

  const defaultMsg = 'Hello Dr. Mayank, I would like to inquire about a personal 1:1 sanctuary consultation.';
  const message = whatsapp.message || defaultMsg;
  const label = whatsapp.label || 'Connect on WhatsApp';

  if (!isEnabled || !cleanNumber) return null;

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  return (
    <aside className={styles.overlayContainer} aria-label="Connect on WhatsApp">
      <div className={styles.fabWrapper}>
        <div className={styles.pulseRing} aria-hidden="true" />
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.fabButton}
          aria-label={label}
          title={label}
        >
          <img
            src="/whatsapp-icon.png"
            alt="WhatsApp"
            width={60}
            height={60}
            className={styles.whatsappImg}
            loading="lazy"
          />
        </a>
      </div>
    </aside>
  );
}
