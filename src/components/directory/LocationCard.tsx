import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import type { LocationArea } from '../../types';

interface LocationCardProps {
  location: LocationArea;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  return (
    <Link
      to={`/bangalore/${location.slug}/`}
      className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-64 bg-slate-900"
    >
      <img
        src={location.heroImage}
        alt={`Call girls & escort profiles in ${location.name}, Bangalore`}
        loading="lazy"
        width="600"
        height="400"
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-75"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

      <div className="relative z-10 p-6 flex-1 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="bg-rose-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm uppercase tracking-wider flex items-center gap-1">
            <MapPin size={12} />
            {location.state} • {location.city}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white group-hover:text-rose-300 transition-colors flex items-center justify-between">
            <span>{location.name}</span>
            <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform text-rose-400" />
          </h3>
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {location.shortDescription}
          </p>
        </div>
      </div>
    </Link>
  );
};
