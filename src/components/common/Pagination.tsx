import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string; // e.g. "/las-vegas" or "/las-vegas/the-strip"
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, baseUrl }) => {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) => {
    // Strip trailing slash if present
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    if (page === 1) return `${cleanBase}/`;
    return `${cleanBase}/page/${page}/`;
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex items-center justify-center gap-2 py-8" aria-label="Pagination Navigation">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          to={getPageUrl(currentPage - 1)}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-xs"
          aria-label="Previous Page"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-100 text-sm font-medium text-slate-300 bg-slate-50 cursor-not-allowed">
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((p) => {
          const isCurrent = p === currentPage;
          return (
            <Link
              key={p}
              to={getPageUrl(p)}
              className={`w-10 h-10 inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all ${
                isCurrent
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
              aria-current={isCurrent ? 'page' : undefined}
            >
              {p}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          to={getPageUrl(currentPage + 1)}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-xs"
          aria-label="Next Page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-100 text-sm font-medium text-slate-300 bg-slate-50 cursor-not-allowed">
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={16} />
        </span>
      )}
    </nav>
  );
};
