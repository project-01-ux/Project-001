import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, AlertTriangle, Lock, Eye, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SafetyPage: React.FC = () => {
  const breadcrumbs = [{ name: 'Safety Guidelines', url: '/safety/' }];

  return (
    <>
      <SEO
        title="Safety Guidelines & Best Practices | Vegas Companions"
        description="Safety advice, profile verification guidelines, privacy protection, and meeting recommendations for adult companion services in Las Vegas."
        canonicalUrl="/safety/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="space-y-2">
            <span className="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <ShieldCheck size={14} /> Trust & Safety Standard
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Safety Guidelines & Trust Policy
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              At Vegas Companions, safety, privacy, and mutual respect are our highest priorities. Please review our safety guidelines when contacting independent companions in Las Vegas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="p-2.5 bg-rose-100 text-rose-700 rounded-xl w-fit">
                <Lock size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Initial Public Introductions</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Always meet initial contacts in public, well-lit venues such as hotel lobby lounges, upscale resort restaurants, or casino lounge bars across Las Vegas.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="p-2.5 bg-rose-100 text-rose-700 rounded-xl w-fit">
                <AlertTriangle size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Avoid Upfront Money Transfers</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Never send untraceable electronic deposits, gift cards, or wire transfers to unverified parties prior to meeting in person.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="p-2.5 bg-rose-100 text-rose-700 rounded-xl w-fit">
                <Eye size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Verify Adult Identity (18+)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Confirm that all participating individuals are consenting adults aged 18 years or older before initiating social arrangements.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
              <div className="p-2.5 bg-rose-100 text-rose-700 rounded-xl w-fit">
                <Flag size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Report Inaccuracies Immediately</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                If a profile displays inaccurate photos, misleading age details, or suspicious contact behavior, submit a report to our moderation team.
              </p>
            </div>

          </div>

          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 text-base">Spotted a suspicious profile?</h4>
              <p className="text-xs text-slate-600">Help maintain directory integrity by reporting violations immediately.</p>
            </div>
            <Link
              to="/report-profile/"
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-colors shrink-0"
            >
              Report Suspicious Profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
