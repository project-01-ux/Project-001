import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const TermsPage: React.FC = () => {
  const breadcrumbs = [{ name: 'Terms & Conditions', url: '/terms/' }];

  return (
    <>
      <SEO
        title="Terms & Conditions | Bangalore Companions Directory"
        description="Terms of service and 18+ adult directory compliance terms for Bangalore Companions."
        canonicalUrl="/terms/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-slate-500 text-xs">Last Updated: September 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. 18+ Age Restriction</h2>
            <p>
              Access to Bangalore Companions is strictly limited to consenting adults aged 18 years or older (or legal age of majority in your jurisdiction). By entering this platform, you affirm under penalty of perjury that you meet age requirements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Advertising & Directory Disclaimer</h2>
            <p>
              Bangalore Companions functions as an advertising venue for independent adult providers. We do not employ, arrange, or dictate services provided by independent companion advertisers. We make no unverifiable guarantees regarding specific outcome claims.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Prohibited Content & Activity</h2>
            <p>
              Sexually explicit imagery, human trafficking, non-consensual activity, and illegal services are strictly forbidden. Listings found in violation are terminated immediately.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
