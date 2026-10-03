import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProfileGallery } from '../components/profile/ProfileGallery';
import { ProfileDetails } from '../components/profile/ProfileDetails';
import { SafetyNoticeCard } from '../components/profile/SafetyNoticeCard';
import { RelatedProfiles } from '../components/profile/RelatedProfiles';
import { FAQSection } from '../components/directory/FAQSection';
import { profileService } from '../services/profileService';
import { seoUtils } from '../utils/seoUtils';
import type { Profile } from '../types';
import { NotFoundPage } from './NotFoundPage';

export const ProfileDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { handleOpenContact } = useOutletContext<{ handleOpenContact: (name?: string) => void }>();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [relatedProfiles, setRelatedProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    profileService.getProfileBySlug(slug).then((res) => {
      setProfile(res);
      if (res) {
        profileService.getRelatedProfiles(res.id, res.primaryArea, 4).then(setRelatedProfiles);
      }
      setLoading(false);
    });
  }, [slug]);

  if (!loading && !profile) {
    return <NotFoundPage />;
  }

  if (!profile) return null;

  const areaSlug = profile.primaryArea.toLowerCase().replace(/\s+/g, '-');
  const canonicalUrl = `/bangalore/profile/${profile.slug}/`;

  const breadcrumbs = [
    { name: 'Karnataka', url: '/bangalore/' },
    { name: 'Bangalore', url: '/bangalore/' },
    { name: profile.primaryArea, url: `/bangalore/${areaSlug}/` },
    { name: profile.name, url: canonicalUrl }
  ];

  const profileFaqs = [
    {
      question: `What services does ${profile.name} offer in Bangalore?`,
      answer: `${profile.name} is available for independent adult companionship, including ${profile.category.toLowerCase()}, resort dining dates, galas, and VIP event accompaniment in ${profile.primaryArea} and surrounding Bangalore areas.`
    },
    {
      question: `Is ${profile.name} verified 18+ on Bangalore Companions?`,
      answer: `Yes. All listings on Bangalore Companions, including ${profile.name}, are verified to represent consenting adults aged 18 years or older.`
    },
    {
      question: `How can I arrange a meeting with ${profile.name}?`,
      answer: `Use the direct contact options listed on ${profile.name}'s profile (Phone, WhatsApp, or Email) to inquire regarding availability, rates, and event scheduling.`
    }
  ];

  const structuredData = [
    seoUtils.generatePersonProfileSchema(profile)
  ];

  const pageTitle = `${profile.name} – Adult Companion in ${profile.primaryArea}, Bangalore | Bangalore Companions`;
  const metaDesc = `${profile.name} (${profile.age}) is an independent adult companion in ${profile.primaryArea}, Bangalore, KA. Category: ${profile.category}. View photos, bio, served areas, and contact options.`;

  return (
    <>
      <SEO
        title={pageTitle}
        description={metaDesc}
        canonicalUrl={canonicalUrl}
        ogType="profile"
        ogImage={profile.image}
        structuredData={structuredData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbs} />

        {/* Top Profile Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Photo Gallery */}
          <div className="lg:col-span-5">
            <ProfileGallery images={profile.gallery} name={profile.name} />
          </div>

          {/* Right Column: Detailed Info & Bio */}
          <div className="lg:col-span-7">
            <ProfileDetails
              profile={profile}
              onContactClick={() => handleOpenContact(profile.name)}
            />
          </div>

        </div>

        {/* Safety Notice Banner */}
        <SafetyNoticeCard />

        {/* Related Profiles */}
        <RelatedProfiles
          profiles={relatedProfiles}
          areaName={profile.primaryArea}
          onContactClick={(p) => handleOpenContact(p.name)}
        />

        {/* Profile FAQ */}
        <FAQSection
          items={profileFaqs}
          title={`Questions About ${profile.name}`}
          subtitle={`Verified profile details and booking guidelines for ${profile.name} in Bangalore.`}
        />

      </div>
    </>
  );
};
