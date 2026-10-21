import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useContent } from '../../context/ContentContext';
import styles from './Breadcrumbs.module.css';

export default function Breadcrumbs({ items = [] }) {
  const { currentLang } = useLanguage();
  const { t } = useContent();

  const allItems = [
    { label: t('nav.home', 'Home'), path: `/${currentLang}` },
    ...items
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': allItems.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': item.path ? `https://drmayankahooja.com${item.path}` : undefined
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className={styles.breadcrumbNav}>
        <ol className={styles.breadcrumbList}>
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={index} className={styles.breadcrumbItem}>
                {isLast || !item.path ? (
                  <span className={styles.current} aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.path} className={styles.link}>
                    {item.label}
                  </Link>
                )}
                {!isLast && <span className={styles.separator} aria-hidden="true">&rsaquo;</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
