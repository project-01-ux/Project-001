import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PlusCircle, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { BANGALORE_AREAS } from '../data/locationsData';

export const PostProfilePage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const breadcrumbs = [{ name: 'Post Your Profile', url: '/post-profile/' }];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="Post Your Companion Profile in Bangalore | Bangalore Companions"
        description="Advertise your adult companion profile in Bangalore, KA. Create a verified 18+ listing for areas including Koramangala, Indiranagar, Whitefield, and HSR Layout."
        canonicalUrl="/post-profile/"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <PlusCircle size={14} /> Directory Advertising
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Post Your Profile in Bangalore
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Publish your independent companion profile to thousands of visiting corporate clients and Bangalore locals.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3">
              <CheckCircle2 size={44} className="text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900">Application Submitted</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for applying. Our profile verification team will review your details and send photo verification instructions to your email address within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 pt-2">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Stage / Display Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Age (18+ Mandatory)</label>
                  <input
                    type="number"
                    min="18"
                    max="99"
                    required
                    placeholder="24"
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Primary Area</label>
                  <select
                    required
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-hidden bg-white"
                  >
                    {BANGALORE_AREAS.map(a => (
                      <option key={a.slug} value={a.name}>{a.name} ({a.city})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                  <select
                    required
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-hidden bg-white"
                  >
                    <option value="Dinner Companion">Dinner Companion</option>
                    <option value="VIP Social Companion">VIP Social Companion</option>
                    <option value="Event Escort">Event Escort</option>
                    <option value="Nightlife Companion">Nightlife Companion</option>
                    <option value="Travel Escort">Travel Escort</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tagline / Short Bio</label>
                <input
                  type="text"
                  required
                  placeholder="Sophisticated dinner companion available for lounge dates..."
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Phone / Messaging Link</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210 or WhatsApp link"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-hidden"
                />
              </div>

              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-slate-600 flex items-start gap-2">
                <ShieldCheck size={18} className="text-rose-600 shrink-0 mt-0.5" />
                <span>
                  <strong>18+ Photo Verification Notice:</strong> By submitting, you consent to complete photo ID verification. We do not publish sexually explicit descriptions or explicit photos.
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={16} />
                <span>Submit Profile Listing Request</span>
              </button>

            </form>
          )}

        </div>
      </div>
    </>
  );
};
