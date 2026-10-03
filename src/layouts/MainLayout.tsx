import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { AgeGateModal } from '../components/common/AgeGateModal';
import { CookieBanner } from '../components/common/CookieBanner';
import { ContactModal } from '../components/common/ContactModal';
import { ScrollToTop } from '../components/common/ScrollToTop';
import { AdminBar } from '../components/admin/AdminBar';
import { AdminLoginModal } from '../components/admin/AdminLoginModal';
import { AdminProfileFormModal } from '../components/admin/AdminProfileFormModal';
import type { Profile } from '../types';

export const MainLayout: React.FC = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactProfileName, setContactProfileName] = useState<string | undefined>();
  
  // Admin modals state
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminProfileFormOpen, setAdminProfileFormOpen] = useState(false);
  const [profileToEdit, setProfileToEdit] = useState<Profile | null>(null);

  const handleOpenContact = (profileName?: string) => {
    setContactProfileName(profileName);
    setContactModalOpen(true);
  };

  const handleOpenAddProfile = () => {
    setProfileToEdit(null);
    setAdminProfileFormOpen(true);
  };

  const handleOpenEditProfile = (profile: Profile) => {
    setProfileToEdit(profile);
    setAdminProfileFormOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-rose-100 selection:text-rose-700">
      {/* Scroll to top on route navigation */}
      <ScrollToTop />

      {/* Admin Toolbar (visible when project-001 is logged in) */}
      <AdminBar onOpenAddModal={handleOpenAddProfile} />

      {/* 18+ Mandatory Age Verification Gate */}
      <AgeGateModal />

      {/* Main Responsive Header */}
      <Header
        onOpenAdminLoginModal={() => setAdminLoginOpen(true)}
      />

      {/* Dynamic Route Outlet */}
      <main className="flex-1 w-full">
        <Outlet context={{ handleOpenContact, handleOpenEditProfile }} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Contact / Listing Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        profileName={contactProfileName}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
      />

      {/* Admin Add / Edit Profile Modal */}
      <AdminProfileFormModal
        isOpen={adminProfileFormOpen}
        onClose={() => setAdminProfileFormOpen(false)}
        profileToEdit={profileToEdit}
        onSuccess={() => {
          window.location.reload();
        }}
      />

      {/* Privacy / Cookie Banner */}
      <CookieBanner />
    </div>
  );
};
