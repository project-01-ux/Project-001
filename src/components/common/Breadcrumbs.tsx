import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import type { BreadcrumbItem } from '../../types';
import { seoUtils } from '../../utils/seoUtils';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const fullItems: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    ...items
  ];

  const jsonLdSchema = seoUtils.generateBreadcrumbSchema(fullItems);

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-1 text-sm font-medium">
      <script type="application/ld+json">
        {JSON.stringify(jsonLdSchema)}
      </script>

      <ol className="flex flex-wrap items-center gap-1.5 text-slate-500">
        {fullItems.map((item, index) => {
          const isLast = index === fullItems.length - 1;

          return (
            <li key={item.url} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight size={14} className="text-slate-400 shrink-0" />}
              {isLast ? (
                <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-xs" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.url}
                  className="hover:text-rose-600 transition-colors flex items-center gap-1"
                >
                  {index === 0 && <Home size={14} className="text-slate-400" />}
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
