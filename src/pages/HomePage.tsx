import React, { useEffect, useState } from 'react';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import { Search, MapPin, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { ProfileGrid } from '../components/directory/ProfileGrid';
import { LocationCard } from '../components/directory/LocationCard';
import { SearchFilterBar } from '../components/directory/SearchFilterBar';
import { Pagination } from '../components/common/Pagination';
import { FAQSection } from '../components/directory/FAQSection';
import { BANGALORE_AREAS } from '../data/locationsData';
import { profileService } from '../services/profileService';
import type { PaginatedResult } from '../services/profileService';
import { seoUtils } from '../utils/seoUtils';
import type { Profile, FilterState } from '../types';

export const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const { handleOpenContact, handleOpenEditProfile } = useOutletContext<{
    handleOpenContact: (name?: string) => void;
    handleOpenEditProfile: (profile: Profile) => void;
  }>();

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    area: searchParams.get('area') || 'all',
    searchQuery: searchParams.get('q') || '',
    ageRange: searchParams.get('age') || 'all',
    category: searchParams.get('category') || 'all',
    availability: searchParams.get('availability') || 'all'
  });

  const [result, setResult] = useState<PaginatedResult<Profile>>({
    data: [],
    total: 0,
    page: 1,
    pageSize: 30,
    totalPages: 1
  });

  const [loading, setLoading] = useState(true);

  // Sync filters from URL
  useEffect(() => {
    setFilters({
      area: searchParams.get('area') || 'all',
      searchQuery: searchParams.get('q') || '',
      ageRange: searchParams.get('age') || 'all',
      category: searchParams.get('category') || 'all',
      availability: searchParams.get('availability') || 'all'
    });
  }, [searchParams]);

  // Fetch paginated profiles (30 per page max)
  useEffect(() => {
    setLoading(true);
    profileService.getProfiles(filters, currentPage, 30).then((res) => {
      setResult(res);
      setLoading(false);
    });
  }, [filters, currentPage]);

  // Filter change handlers
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);

    const params = new URLSearchParams();
    if (updated.area && updated.area !== 'all') params.set('area', updated.area);
    if (updated.searchQuery) params.set('q', updated.searchQuery);
    if (updated.ageRange && updated.ageRange !== 'all') params.set('age', updated.ageRange);
    if (updated.category && updated.category !== 'all') params.set('category', updated.category);
    if (updated.availability && updated.availability !== 'all') params.set('availability', updated.availability);
    if (currentPage > 1) params.set('page', '1');

    setSearchParams(params);
  };

  const handleResetFilters = () => {
    const defaultFilters: FilterState = {
      area: 'all',
      searchQuery: '',
      ageRange: 'all',
      category: 'all',
      availability: 'all'
    };
    setFilters(defaultFilters);
    setSearchParams({});
  };

  const handleSearchHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange({ searchQuery: filters.searchQuery });

    const profilesSection = document.getElementById('profiles');
    if (profilesSection) {
      profilesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const structuredData = [
    seoUtils.generateWebSiteSchema(),
    seoUtils.generateOrganizationSchema(),
    seoUtils.generateItemListSchema(result.data, 'Bangalore Call Girls & Escort Service Directory', '/')
  ];

  return (
    <>
      <SEO
        title="Bangalore Call Girls & Escort Service | Verified Directory"
        description="Browse verified 18+ call girls in Bangalore, independent escort profiles, and local directory listings across Koramangala, Indiranagar, BTM Layout, and HSR Layout. Direct phone call button."
        canonicalUrl="/"
        structuredData={structuredData}
      />

      {/* Compact Hero Section */}
      <section className="relative bg-slate-900 text-white py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=80"
            alt="Bangalore Call Girls & Escort Directory"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          
          <div className="inline-flex items-center gap-2 bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <span className="bg-rose-600 text-white font-bold text-[10px] px-1.5 py-0.5 rounded">18+</span>
            <span>Bangalore Call Girls & Escort Service Directory</span>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Bangalore Call Girls & Verified <span className="text-rose-500">Escort Services</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Find verified independent call girls and escort profiles in Bangalore. Direct phone call contact across Koramangala, BTM Layout, Madiwala, Indiranagar, JP Nagar, HSR Layout, and DSR Orchid.
            </p>
          </div>

          {/* Compact Hero Search Bar */}
          <form
            onSubmit={handleSearchHeroSubmit}
            className="max-w-3xl mx-auto bg-white/95 backdrop-blur-md p-2 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col sm:flex-row items-center gap-2 text-slate-900"
          >
            <div className="relative flex-1 w-full">
              <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search profile name, area, or keyword..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-transparent text-sm font-medium border-0 focus:ring-0 outline-hidden"
              />
            </div>

            <div className="relative w-full sm:w-56 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 pl-0 sm:pl-2">
              <MapPin size={18} className="absolute left-3.5 top-3.5 text-rose-600" />
              <select
                value={filters.area}
                onChange={(e) => handleFilterChange({ area: e.target.value })}
                className="w-full pl-10 pr-6 py-3 bg-transparent text-xs font-semibold text-slate-800 border-0 focus:ring-0 outline-hidden cursor-pointer appearance-none"
              >
                <option value="all">All Bangalore Areas</option>
                {BANGALORE_AREAS.map((a) => (
                  <option key={a.slug} value={a.slug}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-xl sm:rounded-2xl transition-all shadow-md text-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <Search size={16} />
              <span>Search Listings</span>
            </button>
          </form>

        </div>
      </section>

      {/* Main Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Popular Areas Section */}
        <section id="areas" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div className="space-y-1">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Explore Districts</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Popular Bangalore Locations
              </h2>
            </div>
            <Link
              to="/bangalore/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors uppercase tracking-wider group"
            >
              <span>View All Areas</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BANGALORE_AREAS.slice(0, 8).map((area) => (
              <LocationCard key={area.slug} location={area} />
            ))}
          </div>
        </section>

        {/* Profiles Section */}
        <section id="profiles" className="space-y-6 scroll-mt-24">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verified Profiles Directory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Featured Bangalore Call Girls & Escorts ({result.total})
              </h2>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <SearchFilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalResults={result.total}
          />

          {/* Profiles Grid */}
          {loading ? (
            <div className="py-16 text-center text-slate-500 space-y-3">
              <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-semibold">Loading Bangalore Profiles...</p>
            </div>
          ) : (
            <ProfileGrid
              profiles={result.data}
              onContactClick={(profile) => handleOpenContact(profile.name)}
              onEditClick={handleOpenEditProfile}
              onDeleteSuccess={() => {
                profileService.getProfiles(filters, currentPage, 30).then(setResult);
              }}
            />
          )}

          {/* Pagination Controls */}
          <Pagination
            currentPage={result.page}
            totalPages={result.totalPages}
            baseUrl="/bangalore"
          />
        </section>

        {/* How It Works Section */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Simple & Transparent</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How The Bangalore Directory Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3 p-4">
              <div className="w-14 h-14 bg-rose-50 border border-rose-200 text-rose-600 rounded-2xl flex items-center justify-center mx-auto text-xl font-bold">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Browse Profiles</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Search local call girl and escort listings in Bangalore by area, age range, category, and real-time availability.
              </p>
            </div>

            <div className="space-y-3 p-4">
              <div className="w-14 h-14 bg-rose-50 border border-rose-200 text-rose-600 rounded-2xl flex items-center justify-center mx-auto text-xl font-bold">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Review Information</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Inspect verified profile bios, photo galleries, served areas, and rates.
              </p>
            </div>

            <div className="space-y-3 p-4">
              <div className="w-14 h-14 bg-rose-50 border border-rose-200 text-rose-600 rounded-2xl flex items-center justify-center mx-auto text-xl font-bold">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Contact Directly</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Inquire directly with independent providers via Phone, WhatsApp, or Telegram.
              </p>
            </div>
          </div>
        </section>

        {/* Safety & Compliance Highlight */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-6 relative overflow-hidden">
          <div className="max-w-2xl space-y-3">
            <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <ShieldCheck size={14} /> Trust & Safety Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Safe & Discreet Directory Platform
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We prioritize privacy, transparent advertising standards, and strict adult compliance (18+). All profiles represent independent consenting adults.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>Strict 18+ Adult Verification Policy</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>Transparent Advertising Guidelines</span>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection />

      </div>
    </>
  );
};
