import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

const AGE_VERIFIED_KEY = 'vegas_companions_age_verified';

export const AgeGateModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem(AGE_VERIFIED_KEY);
    if (!verified) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(AGE_VERIFIED_KEY, 'true');
    setIsOpen(false);
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
        {/* Top Decorative Banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-700" />

        {/* 18+ Icon Badge */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-inner">
          <ShieldAlert size={36} />
        </div>

        {/* Title & Warning */}
        <div className="space-y-2">
          <span className="inline-block bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            18+ Age Restricted Access
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Please Read Before Continuing
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            This directory contains adult entertainment, local companionship listings, and mature social service advertising intended strictly for adults aged <strong className="text-slate-900">18 years or older</strong>.
          </p>
        </div>

        {/* Consent Statement */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 text-left space-y-1.5">
          <p className="font-semibold text-slate-800">By entering this website, you confirm that:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>You are at least 18 years old (or legal age of majority in your jurisdiction).</li>
            <li>You agree to our adult directory terms and privacy guidelines.</li>
            <li>Mature content does not offend community standards in your area.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleAccept}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all text-sm cursor-pointer active:scale-98"
          >
            <CheckCircle2 size={18} />
            <span>I am 18 or Older</span>
          </button>
          <button
            onClick={handleDecline}
            className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 px-5 rounded-xl transition-all text-sm cursor-pointer"
          >
            <XCircle size={18} />
            <span>Exit</span>
          </button>
        </div>

        {/* Legal Links Footer */}
        <div className="pt-2 text-xs text-slate-500 flex justify-center items-center gap-3">
          <Link to="/terms/" onClick={() => setIsOpen(false)} className="hover:text-rose-600 underline">
            Terms
          </Link>
          <span>•</span>
          <Link to="/privacy/" onClick={() => setIsOpen(false)} className="hover:text-rose-600 underline">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link to="/safety/" onClick={() => setIsOpen(false)} className="hover:text-rose-600 underline">
            Safety Info
          </Link>
        </div>
      </div>
    </div>
  );
};
