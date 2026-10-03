import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const PrivacyPolicyPage: React.FC = () => {
  const breadcrumbs = [{ name: 'Privacy Policy', url: '/privacy/' }];

  return (
    <>
      <SEO
        title="Privacy Policy | Bangalore Companions Directory"
        description="Privacy policy and data handling guidelines for Bangalore Companions directory."
        canonicalUrl="/privacy/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-xs">Last Updated: September 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Overview & Scope</h2>
            <p>
              Bangalore Companions ("we", "us", or "our") operates an adult companion directory service focused on Bangalore (Bengaluru), Karnataka. This policy outlines how we handle user data and maintain browsing privacy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Information Collection</h2>
            <p>
              We prioritize privacy. We do not require account creation or personal registration for general directory browsing. Non-personal technical log data (IP address, browser type, referral URLs) may be collected for security monitoring and system performance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Cookies & Local Storage</h2>
            <p>
              We use lightweight local storage items (e.g. 18+ age verification consent) to ensure proper modal display and consent tracking without tracking sensitive personal identity across third-party websites.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Third-Party Links</h2>
            <p>
              Profiles contain direct contact links (WhatsApp, Telegram, Phone, Email) maintained independently by providers. We are not responsible for the privacy practices of external third-party messaging services.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
