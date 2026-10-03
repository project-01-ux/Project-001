import React from 'react';
import { ShieldCheck, AlertCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SafetyNoticeCard: React.FC = () => {
  return (
    <div className="bg-rose-50/60 border border-rose-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-rose-600 text-white rounded-xl shadow-xs">
          <ShieldCheck size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Safety & Meeting Recommendations</h3>
          <p className="text-xs text-rose-800">Guidelines for respectful and secure meetings in Bangalore</p>
        </div>
      </div>

      <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
        <li className="flex items-start gap-2">
          <Lock size={15} className="text-rose-600 shrink-0 mt-0.5" />
          <span><strong>Public Meeting Venues:</strong> Arrange initial introductions at well-known hotel lounges, fine dining venues, or resort lobby bars across Bangalore.</span>
        </li>
        <li className="flex items-start gap-2">
          <AlertCircle size={15} className="text-rose-600 shrink-0 mt-0.5" />
          <span><strong>Zero Pre-payments:</strong> Never wire funds or make untraceable electronic deposits to unverified initial contacts.</span>
        </li>
        <li className="flex items-start gap-2">
          <ShieldCheck size={15} className="text-rose-600 shrink-0 mt-0.5" />
          <span><strong>Strict 18+ Verification:</strong> Confirm all parties are consenting adults aged 18 or older.</span>
        </li>
      </ul>

      <div className="pt-2 flex items-center justify-between text-xs">
        <Link to="/safety/" className="text-rose-700 font-bold hover:underline flex items-center gap-1">
          Read Full Safety Guide →
        </Link>
        <Link to="/report-profile/" className="text-slate-500 hover:text-slate-900 underline">
          Report Suspicious Profile
        </Link>
      </div>
    </div>
  );
};
