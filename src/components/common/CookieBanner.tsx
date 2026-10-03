import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const COOKIE_CONSENT_KEY = 'vegas_companions_cookie_consent';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Delay slightly for smooth initial page display
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-40 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl animate-in slide-in-from-bottom-5">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-rose-50 text-rose-600 rounded-xl shrink-0">
          <Cookie size={20} />
        </div>
        <div className="space-y-2 text-xs text-slate-600 flex-1">
          <p className="font-semibold text-slate-900 text-sm">Cookie & Privacy Notice</p>
          <p className="leading-relaxed">
            We use cookies to optimize performance, remember your preferences, and ensure a secure browsing experience on our directory.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={handleAccept}
              className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-1.5 rounded-lg transition-colors text-xs cursor-pointer"
            >
              Accept All
            </button>
            <Link to="/privacy/" className="text-slate-500 hover:text-slate-900 underline text-xs">
              Cookie Policy
            </Link>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-slate-600 p-1"
          aria-label="Close Notice"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
