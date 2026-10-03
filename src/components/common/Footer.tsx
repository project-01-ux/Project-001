import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, AlertTriangle, MapPin, Crown, HeartHandshake } from 'lucide-react';
import { BANGALORE_AREAS } from '../../data/locationsData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 18+ Mandatory Disclaimer Box */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="p-3 bg-rose-950/60 border border-rose-800/40 rounded-xl text-rose-400 shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div className="space-y-1 text-xs sm:text-sm text-slate-300">
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <span className="bg-rose-600 text-white text-xs px-2 py-0.5 rounded">18+ ONLY</span>
              Adult Call Girls & Escort Service Directory Disclaimer
            </h4>
            <p className="leading-relaxed text-slate-400">
              BangaloreCompanions.demo is an informational online advertising platform and local directory strictly intended for individuals aged 18 years or older (21+ where applicable by law). All listed profile holders are independent consenting adults. We do not provide, organize, or facilitate unlawful acts.
            </p>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Crown size={20} className="text-amber-200 fill-amber-200/30" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Bangalore <span className="text-rose-500">Call Girls & Escorts</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Bangalore’s premier call girls & escort service directory. Connecting adults with verified local profiles for dining, galas, IT events, resort leisure, and private bookings.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>Independent 18+ Directory Infrastructure</span>
            </div>
          </div>

          {/* Bangalore Locations */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <MapPin size={15} className="text-rose-500" /> Locations
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/bangalore/" className="hover:text-rose-400 transition-colors">
                  All Bangalore
                </Link>
              </li>
              {BANGALORE_AREAS.map((area) => (
                <li key={area.slug}>
                  <Link to={`/bangalore/${area.slug}/`} className="hover:text-rose-400 transition-colors">
                    {area.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Directory Categories */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/bangalore/?category=VIP+Call+Girl" className="hover:text-rose-400 transition-colors">
                  VIP Call Girls
                </Link>
              </li>
              <li>
                <Link to="/bangalore/?category=Escort+Service" className="hover:text-rose-400 transition-colors">
                  Escort Services
                </Link>
              </li>
              <li>
                <Link to="/bangalore/?category=Dinner+Date+Escort" className="hover:text-rose-400 transition-colors">
                  Dinner Date Escorts
                </Link>
              </li>
              <li>
                <Link to="/bangalore/?category=Nightlife+Escort" className="hover:text-rose-400 transition-colors">
                  Nightlife Escorts
                </Link>
              </li>
              <li>
                <Link to="/bangalore/?category=Travel+Escort" className="hover:text-rose-400 transition-colors">
                  Travel Escorts
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <HeartHandshake size={15} className="text-rose-500" /> Trust & Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/safety/" className="hover:text-rose-400 transition-colors font-medium text-rose-300">
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link to="/terms/" className="hover:text-rose-400 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy/" className="hover:text-rose-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact/" className="hover:text-rose-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/report-profile/" className="hover:text-rose-400 transition-colors text-amber-400">
                  Report Suspicious Profile
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright and metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Bangalore Call Girls & Escorts Directory. All rights reserved. 18+ Adults Only.</p>
          <p className="text-slate-400">Designed for speed, privacy, and technical SEO excellence.</p>
        </div>

      </div>
    </footer>
  );
};
