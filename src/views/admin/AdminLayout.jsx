'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import styles from '../../styles/admin.module.css';

const adminNavItems = [
  { path: '/admin/articles', label: 'Articles & Insights', icon: '📝' },
  { path: '/admin/inquiries', label: 'Inquiries & Bookings', icon: '📬' },
  { path: '/admin/profile', label: 'About Section', icon: '👤' },
  { path: '/admin/gallery', label: 'Photo Gallery', icon: '🖼️' },
];

export default function AdminLayout({ children }) {
  const { logout } = useAuth();
  const { currentLang } = useLanguage();
  const router = useRouter();
  const pathname = usePathname() || '';

  const handleLogout = async () => {
    await logout();
    router.push(`/${currentLang || 'en'}/`);
  };

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div>
          <div className={styles.sidebarHeader}>
            <h1 className={styles.sidebarBrand}>Dr. Mayank CMS</h1>
            <span className={styles.sidebarBadge}>Sanctuary Administration</span>
          </div>

          <nav className={styles.navMenu}>
            {adminNavItems.map((item) => {
              const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={styles.sidebarFooter}>
          <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
            <span>🚪</span>
            <span>Secure Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className={styles.workspace}>
        <header className={styles.topBar}>
          <div className={styles.viewTitle}>Sanctuary Content Manager</div>
          <div className={styles.topBarActions}>
            <a
              href={`/${currentLang || 'en'}/`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewSiteLink}
            >
              View Public Website ↗
            </a>
          </div>
        </header>

        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
