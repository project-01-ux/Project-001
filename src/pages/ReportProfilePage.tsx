import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export const ReportProfilePage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const breadcrumbs = [{ name: 'Report Profile', url: '/report-profile/' }];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="Report Suspicious Profile | Bangalore Companions Directory"
        description="Report suspicious profiles, inaccurate photos, or safety violations on Bangalore Companions directory."
        canonicalUrl="/report-profile/"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <AlertTriangle size={14} /> Moderation Flag
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Report a Suspicious Profile
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              Help us maintain directory authenticity. Submit details below for urgent review by our verification team.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3">
              <CheckCircle2 size={44} className="text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900">Report Submitted</h3>
              <p className="text-sm text-slate-600">
                Thank you for notifying us. Our trust and safety team will inspect the listing immediately.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Profile Name or URL</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya (/bangalore/profile/ananya-1/)"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Reason for Report</label>
                <select
                  required
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-hidden bg-white"
                >
                  <option value="inaccurate_photos">Inaccurate or Fake Photos</option>
                  <option value="underage_suspicion">Suspected Underage Representation</option>
                  <option value="upfront_payment_scam">Upfront Payment / Money Transfer Scam</option>
                  <option value="copyright">Copyright Infringement</option>
                  <option value="other">Other Violation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Additional Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the issue in detail..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldAlert size={16} />
                <span>Submit Flagged Report</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
