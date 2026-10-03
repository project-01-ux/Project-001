import React from 'react';
import { Search, MapPin, RotateCcw, Sparkles } from 'lucide-react';
import type { FilterState } from '../../types';
import { BANGALORE_AREAS } from '../../data/locationsData';

interface SearchFilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults?: number;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4">
      
      {/* Top Search Input Row */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        
        {/* Keyword / Name Search */}
        <div className="relative flex-1 w-full">
          <Search size={18} className="absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by profile name, tagline, or keyword..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-hidden transition-all"
          />
        </div>

        {/* Location Dropdown */}
        <div className="relative w-full sm:w-64">
          <MapPin size={18} className="absolute left-3.5 top-3.5 text-rose-500" />
          <select
            value={filters.area}
            onChange={(e) => onFilterChange({ area: e.target.value })}
            className="w-full pl-10 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:bg-white focus:border-rose-500 focus:ring-2 focus:ring-rose-100 outline-hidden appearance-none cursor-pointer"
          >
            <option value="all">All Bangalore Areas</option>
            {BANGALORE_AREAS.map((area) => (
              <option key={area.slug} value={area.slug}>
                {area.name} ({area.city})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Secondary Filter Dropdowns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
        
        {/* Category Select */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:border-rose-500 outline-hidden cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="Dinner Companion">Dinner Companion</option>
            <option value="VIP Social Companion">VIP Social Companion</option>
            <option value="Event Escort">Event Escort</option>
            <option value="Nightlife Companion">Nightlife Companion</option>
            <option value="Travel Escort">Travel Escort</option>
          </select>
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Age Range
          </label>
          <select
            value={filters.ageRange}
            onChange={(e) => onFilterChange({ ageRange: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:border-rose-500 outline-hidden cursor-pointer"
          >
            <option value="all">Any Age (18+)</option>
            <option value="18-25">18 - 25</option>
            <option value="26-30">26 - 30</option>
            <option value="31-35">31 - 35</option>
            <option value="36+">36+</option>
          </select>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            Availability
          </label>
          <select
            value={filters.availability}
            onChange={(e) => onFilterChange({ availability: e.target.value })}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:border-rose-500 outline-hidden cursor-pointer"
          >
            <option value="all">Any Availability</option>
            <option value="Available Today">Available Today</option>
            <option value="By Appointment">By Appointment</option>
            <option value="Travel Ready">Travel Ready</option>
          </select>
        </div>

        {/* Reset Action */}
        <div className="flex items-end">
          <button
            onClick={onResetFilters}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset Filters</span>
          </button>
        </div>

      </div>

      {/* Results Header */}
      {typeof totalResults === 'number' && (
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span className="font-semibold text-slate-800 flex items-center gap-1">
            <Sparkles size={14} className="text-rose-500" />
            Showing {totalResults} active 18+ profiles in Bangalore
          </span>
          <span>Max 30 profiles per page</span>
        </div>
      )}

    </div>
  );
};
