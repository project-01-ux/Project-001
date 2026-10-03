import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Home, Search } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO
        title="404 Page Not Found | Bangalore Companions"
        description="The requested Bangalore companion directory page could not be found."
        canonicalUrl="/404"
        noindex={true}
      />

      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto text-3xl font-extrabold shadow-inner">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-600">
            The profile or directory location page you are looking for may have moved or been updated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-bold px-5 py-3 rounded-xl text-sm hover:bg-slate-800 transition-colors"
          >
            <Home size={16} />
            <span>Return Home</span>
          </Link>
          <Link
            to="/bangalore/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-600 text-white font-bold px-5 py-3 rounded-xl text-sm hover:bg-rose-700 transition-colors"
          >
            <Search size={16} />
            <span>Browse Profiles</span>
          </Link>
        </div>
      </div>
    </>
  );
};
