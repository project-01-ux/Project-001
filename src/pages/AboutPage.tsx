import React from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShieldCheck, Sparkles, MapPin, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const breadcrumbs = [{ name: 'About Us', url: '/about/' }];

  return (
    <>
      <SEO
        title="About Bangalore Call Girls & Escorts | Verified Directory"
        description="Learn about Bangalore Call Girls & Escorts, Bangalore's premier verified 18+ adult directory for independent escorts and call girls."
        canonicalUrl="/about/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Sparkles size={14} /> About The Directory
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              About Bangalore Call Girls & Escorts
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Bangalore Call Girls & Escorts is a modern, fast, and privacy-focused local directory connecting individuals with independent adult providers (18+) across Bangalore, Karnataka.
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="text-rose-600" size={20} />
              <span>Our Platform Mission</span>
            </h2>
            <p>
              Our goal is to offer a clean, professional, and accessible directory platform for independent call girls and VIP escorts in Bangalore. We provide intuitive search and area filtering (Koramangala, BTM Layout, Madiwala, Indiranagar, JP Nagar, HSR Layout, DSR Orchid) without clutter or misleading claims.
            </p>

            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 pt-2">
              <Users className="text-rose-600" size={20} />
              <span>Independent 18+ Representation</span>
            </h2>
            <p>
              All profile holders featured on our platform operate as independent adult contractors. We mandate strict age verification (18+) and enforce clear advertising guidelines to ensure a high-quality directory experience.
            </p>

            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 pt-2">
              <MapPin className="text-rose-600" size={20} />
              <span>Multi-District Bangalore Architecture</span>
            </h2>
            <p>
              Designed for local convenience, our architecture categorizes listings by key commercial hubs and residential tech corridors including Koramangala, BTM Layout, Madiwala, Indiranagar, JP Nagar, HSR Layout, and DSR Orchid.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
