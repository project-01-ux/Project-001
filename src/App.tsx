import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { CityListingPage } from './pages/CityListingPage';
import { AreaListingPage } from './pages/AreaListingPage';
import { ProfileDetailPage } from './pages/ProfileDetailPage';
import { AboutPage } from './pages/AboutPage';
import { SafetyPage } from './pages/SafetyPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ReportProfilePage } from './pages/ReportProfilePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {/* Homepage */}
              <Route index element={<HomePage />} />

              {/* Bangalore City Listings & Paginated Routes */}
              <Route path="bangalore" element={<CityListingPage />} />
              <Route path="bangalore/page/:page" element={<CityListingPage />} />

              {/* Profile Detail Page */}
              <Route path="bangalore/profile/:slug" element={<ProfileDetailPage />} />

              {/* Sub-location Area Listing Routes */}
              <Route path="bangalore/:areaSlug" element={<AreaListingPage />} />
              <Route path="bangalore/:areaSlug/page/:page" element={<AreaListingPage />} />

              {/* Legacy alias support for /las-vegas */}
              <Route path="las-vegas" element={<CityListingPage />} />
              <Route path="las-vegas/page/:page" element={<CityListingPage />} />
              <Route path="las-vegas/profile/:slug" element={<ProfileDetailPage />} />
              <Route path="las-vegas/:areaSlug" element={<AreaListingPage />} />
              <Route path="las-vegas/:areaSlug/page/:page" element={<AreaListingPage />} />

              {/* Supporting Pages */}
              <Route path="about" element={<AboutPage />} />
              <Route path="safety" element={<SafetyPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="post-profile" element={<Navigate to="/contact/" replace />} />
              <Route path="privacy" element={<PrivacyPolicyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="report-profile" element={<ReportProfilePage />} />

              {/* Fallback 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </HelmetProvider>
  );
};

export default App;
