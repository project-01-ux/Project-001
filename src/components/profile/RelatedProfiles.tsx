import React from 'react';
import type { Profile } from '../../types';
import { ProfileCard } from '../directory/ProfileCard';

interface RelatedProfilesProps {
  profiles: Profile[];
  areaName: string;
  onContactClick?: (profile: Profile) => void;
}

export const RelatedProfiles: React.FC<RelatedProfilesProps> = ({ profiles, areaName, onContactClick }) => {
  if (profiles.length === 0) return null;

  return (
    <div className="space-y-6 pt-8 border-t border-slate-200">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Similar Profiles in {areaName}
        </h2>
        <p className="text-sm text-slate-600">
          Discover other verified profiles available in {areaName}, Bangalore.
        </p>
      </div>

      <div className="space-y-4">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} onContactClick={onContactClick} />
        ))}
      </div>
    </div>
  );
};
