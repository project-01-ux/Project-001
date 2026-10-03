import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useOutletContext } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SearchFilterBar } from '../components/directory/SearchFilterBar';
import { ProfileGrid } from '../components/directory/ProfileGrid';
import { Pagination } from '../components/common/Pagination';
import { FAQSection } from '../components/directory/FAQSection';
import { profileService } from '../services/profileService';
import type { PaginatedResult } from '../services/profileService';
import { seoUtils } from '../utils/seoUtils';
import type { Profile, FilterState } from '../types';

export const CityListingPage: React.FC = () => {
  const { page } = useParams<{ page?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(page || '1', 10);
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

  // Sync state when URL params change
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

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);

    const params = new URLSearchParams();
    if (updated.area && updated.area !== 'all') params.set('area', updated.area);
    if (updated.searchQuery) params.set('q', updated.searchQuery);
    if (updated.ageRange && updated.ageRange !== 'all') params.set('age', updated.ageRange);
    if (updated.category && updated.category !== 'all') params.set('category', updated.category);
    if (updated.availability && updated.availability !== 'all') params.set('availability', updated.availability);

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

  const isFiltered = searchParams.toString().length > 0;
  const canonicalPath = currentPage > 1 ? `/bangalore/page/${currentPage}/` : '/bangalore/';
  const pageTitle = currentPage > 1
    ? `Bangalore Call Girls & Escorts - Page ${currentPage} | Bangalore Directory`
    : 'Bangalore Call Girls & Escort Service Directory | Bangalore';

  const breadcrumbs = [
    { name: 'Karnataka', url: '/bangalore/' },
    { name: 'Bangalore', url: '/bangalore/' },
    { name: 'Call Girls & Escorts', url: '/bangalore/' }
  ];

  const structuredData = [
    seoUtils.generateItemListSchema(result.data, 'Bangalore Call Girls & Escort Listings', canonicalPath)
  ];

  return (
    <>
      <SEO
        title={pageTitle}
        description="Browse verified 18+ call girls in Bangalore, Karnataka. Search by area, age, availability, and escort category. Direct phone numbers, 30 profiles per page."
        canonicalUrl={canonicalPath}
        noindex={isFiltered}
        structuredData={structuredData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* City Heading & Natural SEO Introduction */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Bangalore Call Girls & Escort Service Directory
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-4xl">
            Welcome to Bangalore Call Girls & Escorts, a verified 18+ directory connecting individuals with independent call girls and VIP escorts in Bangalore (Bengaluru), Karnataka. Explore discrete local profiles across Koramangala, BTM Layout, Madiwala, Indiranagar, JP Nagar, HSR Layout, and DSR Orchid.
          </p>
        </div>

        {/* Search & Multi-Filter Component */}
        <SearchFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalResults={result.total}
        />

        {/* Profile Listings Grid */}
        <div className="space-y-6">
          {loading ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <div className="w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-medium">Loading Bangalore Profiles...</p>
            </div>
          ) : (
            <ProfileGrid
              profiles={result.data}
              onContactClick={(p) => handleOpenContact(p.name)}
              onEditClick={(p) => handleOpenEditProfile(p)}
              onDeleteSuccess={() => {
                profileService.getProfiles(filters, currentPage, 30).then(setResult);
              }}
            />
          )}

          {/* Crawlable Pagination */}
          <Pagination
            currentPage={result.page}
            totalPages={result.totalPages}
            baseUrl="/bangalore"
          />
        </div>

        {/* Local Information & FAQ */}
        <FAQSection
          title="Bangalore Call Girls FAQ"
          subtitle="Learn more about booking independent call girls and escort profiles across Bangalore commercial & residential districts."
        />

      </div>
    </>
  );
};
