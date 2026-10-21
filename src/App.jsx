import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ContentProvider } from './context/ContentContext';
import { AuthProvider } from './context/AuthContext';

// Public Sanctuary Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import WellnessPage from './pages/WellnessPage';
import GalleryPage from './pages/GalleryPage';
import ProgramsPage from './pages/ProgramsPage';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import TestimonialsPage from './pages/TestimonialsPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminArticles from './pages/admin/AdminArticles';
import AdminProfile from './pages/admin/AdminProfile';
import AdminGallery from './pages/admin/AdminGallery';

import ProtectedRoute from './components/common/ProtectedRoute';

function RootRedirect() {
  const saved = typeof window !== 'undefined' ? localStorage.getItem('dr_mayank_lang_pref') : null;
  const initial = (saved && ['en', 'ru', 'ro', 'fr', 'de', 'it', 'es'].includes(saved)) ? saved : 'en';
  return <Navigate to={`/${initial}/`} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ContentProvider>
          <AuthProvider>
            <Routes>
              {/* Root redirect to preferred language */}
              <Route path="/" element={<RootRedirect />} />
              <Route path="/about" element={<Navigate to="/en/about" replace />} />
              <Route path="/services" element={<Navigate to="/en/services" replace />} />
              <Route path="/contact" element={<Navigate to="/en/contact" replace />} />

              {/* Public Multilingual Routes: /:lang/... */}
              <Route path="/:lang" element={<HomePage />} />
              <Route path="/:lang/" element={<HomePage />} />
              <Route path="/:lang/about" element={<AboutPage />} />
              <Route path="/:lang/services" element={<ServicesPage />} />
              <Route path="/:lang/services/:serviceSlug" element={<ServiceDetailPage />} />
              <Route path="/:lang/wellness" element={<WellnessPage />} />
              <Route path="/:lang/gallery" element={<GalleryPage />} />
              <Route path="/:lang/programs" element={<ProgramsPage />} />
              <Route path="/:lang/articles" element={<ArticlesPage />} />
              <Route path="/:lang/articles/:articleSlug" element={<ArticleDetailPage />} />
              <Route path="/:lang/testimonials" element={<TestimonialsPage />} />
              <Route path="/:lang/faq" element={<FaqPage />} />
              <Route path="/:lang/contact" element={<ContactPage />} />

              {/* 404 for unknown language sub-paths */}
              <Route path="/:lang/*" element={<NotFoundPage />} />

              {/* Admin Routes (Authentication Protected, Hidden from public nav) */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="articles" element={<AdminArticles />} />
                  <Route path="profile" element={<AdminProfile />} />
                  <Route path="gallery" element={<AdminGallery />} />
                </Route>
              </Route>

              {/* Catch-all Fallback */}
              <Route path="*" element={<RootRedirect />} />
            </Routes>
          </AuthProvider>
        </ContentProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
