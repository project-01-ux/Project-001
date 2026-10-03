import React, { useEffect, useState } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProfileGrid } from '../components/directory/ProfileGrid';
import { Pagination } from '../components/common/Pagination';
import { FAQSection } from '../components/directory/FAQSection';
import { profileService } from '../services/profileService';
import type { PaginatedResult } from '../services/profileService';
import { seoUtils } from '../utils/seoUtils';
import type { Profile } from '../types';
import { MapPin } from 'lucide-react';

export const AreaListingPage: React.FC = () => {
  const { areaSlug, page } = useParams<{ areaSlug: string; page?: string }>();
  const currentPage = parseInt(page || '1', 10);
  const { handleOpenContact, handleOpenEditProfile } = useOutletContext<{
    handleOpenContact: (name?: string) => void;
    handleOpenEditProfile: (profile: Profile) => void;
  }>();

  const [result, setResult] = useState<PaginatedResult<Profile>>({
    data: [],
    total: 0,
    page: 1,
    pageSize: 30,
    totalPages: 1
  });

  const [loading, setLoading] = useState(true);
  const locationObj = profileService.getLocationBySlug(areaSlug || '');

  useEffect(() => {
    if (!areaSlug) return;
    setLoading(true);

    profileService.getProfiles({ area: areaSlug }, currentPage, 30).then((res) => {
      setResult(res);
      setLoading(false);
    });
  }, [areaSlug, currentPage]);

  if (!locationObj) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-slate-900">Location Area Not Found</h1>
        <p className="text-slate-600">We could not locate profile listings for the requested Bangalore area.</p>
        <Link to="/bangalore/" className="inline-block bg-rose-600 text-white font-bold px-6 py-2.5 rounded-xl">
          Browse All Bangalore Listings
        </Link>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Bangalore', url: '/bangalore/' },
    { name: locationObj.name, url: `/bangalore/${locationObj.slug}/` }
  ];

  const canonicalPath = currentPage > 1 ? `/bangalore/${locationObj.slug}/page/${currentPage}/` : `/bangalore/${locationObj.slug}/`;

  const structuredData = [
    seoUtils.generateBreadcrumbSchema(breadcrumbs),
    seoUtils.generateItemListSchema(result.data, `${locationObj.name} Call Girls & Escort Directory`, canonicalPath)
  ];

  return (
    <>
      <SEO
        title={currentPage > 1 ? `${locationObj.name} Call Girls & Escorts - Page ${currentPage}` : locationObj.metaTitle}
        description={locationObj.metaDescription}
        canonicalUrl={canonicalPath}
        ogImage={locationObj.heroImage}
        structuredData={structuredData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Area Heading Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-6 sm:p-12 border border-slate-800 shadow-md">
          <img
            src={locationObj.heroImage}
            alt={`${locationObj.name} Bangalore call girls & escort listings background`}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <MapPin size={12} /> {locationObj.city}, {locationObj.state} Area Directory
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Call Girls & Escorts in <span className="text-rose-400">{locationObj.name}</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {locationObj.fullDescription}
            </p>

            {/* Popular District Highlights */}
            {locationObj.popularHighlights.length > 0 && (
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold">Popular Venues:</span>
                {locationObj.popularHighlights.map((h, i) => (
                  <span key={i} className="bg-slate-800/90 border border-slate-700 text-slate-200 px-2.5 py-1 rounded-md">
                    {h}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Profile Grid for Location Area */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-xl font-extrabold text-slate-900">
              Available Call Girls & Escorts in {locationObj.name} ({result.total})
            </h2>
            <span className="text-xs text-slate-500">30 per page</span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-500">
              <div className="w-8 h-8 border-4 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <span>Loading profiles in {locationObj.name}...</span>
            </div>
          ) : (
            <ProfileGrid
              profiles={result.data}
              onContactClick={(profile) => handleOpenContact(profile.name)}
              onEditClick={handleOpenEditProfile}
            />
          )}

          {/* Area Pagination */}
          <Pagination
            currentPage={result.page}
            totalPages={result.totalPages}
            baseUrl={`/bangalore/${locationObj.slug}`}
          />
        </div>

        {/* Area FAQ Section */}
        <FAQSection
          title={`${locationObj.name} Escort & Call Girl FAQ`}
          subtitle={`Frequently asked questions about finding call girls and escort profiles in ${locationObj.name}, Bangalore.`}
        />

      </div>
    </>
  );
};
