import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';

export default function SeoHead({ customTitle, customDescription, customCanonical, schema, ogImage }) {
  const { currentLang, supportedLanguages } = useLanguage();
  const { content } = useContent();
  const location = useLocation();

  useEffect(() => {
    // 1. Page Title
    const pageTitle = customTitle || content?.meta?.title || 'Dr. Mayank Ahooja | Doctor of Medicine & Meditation Master';
    document.title = pageTitle;

    // 2. Meta Description
    const metaDesc = customDescription || content?.meta?.description || 'Doctor of Medicine, Meditation Master, Spiritual Coach, and Motivational Speaker.';
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', metaDesc);

    // 3. Open Graph & Twitter Metadata
    const setMeta = (property, contentVal) => {
      let tag = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(property.startsWith('twitter:') ? 'name' : 'property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', contentVal);
    };

    setMeta('og:title', customTitle || content?.meta?.ogTitle || pageTitle);
    setMeta('og:description', customDescription || content?.meta?.ogDescription || metaDesc);
    setMeta('og:type', 'article');
    setMeta('og:locale', currentLang);

    if (ogImage) {
      setMeta('og:image', ogImage);
      setMeta('twitter:image', ogImage);
      setMeta('twitter:card', 'summary_large_image');
    }

    // 4. Canonical URL
    const canonicalHref = customCanonical || `https://drmayankahooja.com${location.pathname}`;
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalHref);

    // 5. Update Hreflang Alternates dynamically for current sub-route
    const pathParts = location.pathname.split('/').filter(Boolean);
    const subRoute = (pathParts.length > 0 && supportedLanguages.some(l => l.code === pathParts[0].toLowerCase()))
      ? '/' + pathParts.slice(1).join('/')
      : location.pathname;

    const cleanSub = subRoute === '/' ? '' : subRoute;

    // Remove existing dynamic alternates
    document.querySelectorAll('link[data-dynamic-hreflang="true"]').forEach(el => el.remove());

    supportedLanguages.forEach(l => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', l.code);
      link.setAttribute('href', `https://drmayankahooja.com/${l.code}${cleanSub}`);
      link.setAttribute('data-dynamic-hreflang', 'true');
      document.head.appendChild(link);
    });

    const xDefault = document.createElement('link');
    xDefault.setAttribute('rel', 'alternate');
    xDefault.setAttribute('hreflang', 'x-default');
    xDefault.setAttribute('href', `https://drmayankahooja.com/en${cleanSub}`);
    xDefault.setAttribute('data-dynamic-hreflang', 'true');
    document.head.appendChild(xDefault);

    // 6. JSON-LD Schema
    const baseSchema = schema || {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Dr. Mayank Ahooja',
      'jobTitle': 'Doctor of Medicine, Meditation Master & Spiritual Coach',
      'url': 'https://drmayankahooja.com',
      'description': metaDesc
    };

    let scriptTag = document.querySelector('script[data-dynamic-schema="true"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('data-dynamic-schema', 'true');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(baseSchema);

  }, [currentLang, content, customTitle, customDescription, customCanonical, schema, location.pathname, supportedLanguages]);

  return null;
}
