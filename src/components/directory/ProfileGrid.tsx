import React from 'react';
import { ProfileCard } from './ProfileCard';
import type { Profile } from '../../types';

interface ProfileGridProps {
  profiles: Profile[];
  onContactClick?: (profile: Profile) => void;
  onEditClick?: (profile: Profile) => void;
  onDeleteSuccess?: () => void;
}

export const ProfileGrid: React.FC<ProfileGridProps> = ({
  profiles,
  onContactClick,
  onEditClick,
  onDeleteSuccess
}) => {
  if (profiles.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
        <h3 className="text-lg font-bold text-slate-900">No companion profiles match your search criteria.</h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Try adjusting your area filter, category select, or age range to view available adult companion listings in Bangalore.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onContactClick={onContactClick}
          onEditClick={onEditClick}
          onDeleteSuccess={onDeleteSuccess}
        />
      ))}
    </div>
  );
};
