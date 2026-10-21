'use client';

import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { ContentProvider } from '@/context/ContentContext';
import { AuthProvider } from '@/context/AuthContext';
import SmoothScroll from './SmoothScroll';
import WhatsAppButton from './WhatsAppButton';

export default function Providers({ children, initialLang = 'en' }) {
  return (
    <LanguageProvider initialLang={initialLang}>
      <ContentProvider>
        <AuthProvider>
          <SmoothScroll>
            {children}
            <WhatsAppButton />
          </SmoothScroll>
        </AuthProvider>
      </ContentProvider>
    </LanguageProvider>
  );
}
