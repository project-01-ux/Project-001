import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Camera, CheckCircle2, MessageSquare, ArrowRight, Phone, Edit3, Trash2 } from 'lucide-react';
import type { Profile } from '../../types';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { profileService } from '../../services/profileService';

interface ProfileCardProps {
  profile: Profile;
  onContactClick?: (profile: Profile) => void;
  onEditClick?: (profile: Profile) => void;
  onDeleteSuccess?: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onContactClick,
  onEditClick,
  onDeleteSuccess
}) => {
  const { isAdminLoggedIn } = useAdminAuth();

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete profile "${profile.name}"? This action cannot be undone.`)) {
      await profileService.deleteProfile(profile.id);
      if (onDeleteSuccess) onDeleteSuccess();
      window.location.reload();
    }
  };

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row relative">
      
      {/* Left Image Section */}
      <div className="relative md:w-64 lg:w-72 aspect-4/3 md:aspect-auto shrink-0 bg-slate-100 overflow-hidden">
        <img
          src={profile.image}
          alt={`Adult companionship profile for ${profile.name} in ${profile.primaryArea}, Bangalore`}
          loading="lazy"
          width="400"
          height="500"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gallery Image Count Indicator */}
        <div className="absolute top-3 left-3 bg-slate-900/75 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          <Camera size={13} className="text-rose-400" />
          <span>{profile.gallery.length} Photos</span>
        </div>

        {/* Availability Badge */}
        <div className="absolute top-3 right-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{profile.availability}</span>
        </div>

        {/* 18+ Verified Tag */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
          <CheckCircle2 size={12} className="text-rose-600" />
          <span>18+ Verified</span>
        </div>
      </div>

      {/* Right Content Details */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Header Title & Age */}
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors flex items-center gap-2">
              <Link to={`/bangalore/profile/${profile.slug}/`} className="hover:underline">
                {profile.name}
              </Link>
              <span className="text-sm font-normal text-slate-500">
                • {profile.age} yrs
              </span>
            </h3>
            
            <span className="bg-rose-50 text-rose-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-rose-200/60">
              {profile.category}
            </span>
          </div>

          {/* Location */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-rose-500 shrink-0" />
              <span>{profile.primaryArea}, Bangalore • Karnataka</span>
              {profile.nationality && (
                <span className="text-slate-400">({profile.nationality})</span>
              )}
            </div>
          </div>

          {/* Short Description Tagline */}
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
            {profile.tagline} {profile.description}
          </p>
        </div>

        {/* Attribute Pills & CTAs */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <span className="bg-slate-100 px-2 py-1 rounded text-slate-700 font-medium">
              Height: {profile.height}
            </span>
            <span className="bg-slate-100 px-2 py-1 rounded text-slate-700 font-medium">
              Languages: {profile.languages.join(', ')}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0">
            
            {/* Inline Admin Controls when Logged In */}
            {isAdminLoggedIn && (
              <div className="flex items-center gap-1 bg-amber-50 p-1 rounded-xl border border-amber-200">
                <button
                  type="button"
                  onClick={() => onEditClick && onEditClick(profile)}
                  className="bg-amber-600 hover:bg-amber-700 text-white p-2 rounded-lg text-xs flex items-center gap-1 cursor-pointer font-bold"
                  title="Edit Profile & Photos"
                >
                  <Edit3 size={14} />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-rose-600 hover:bg-rose-700 text-white p-2 rounded-lg text-xs flex items-center gap-1 cursor-pointer font-bold"
                  title="Delete Profile"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>
            )}

            {profile.contactOptions.phone && (
              <a
                href={`tel:${profile.contactOptions.phone}`}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                title={`Call ${profile.name} directly`}
              >
                <Phone size={14} />
                <span>{profile.contactOptions.phone}</span>
              </a>
            )}

            <button
              onClick={() => onContactClick && onContactClick(profile)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <MessageSquare size={14} />
              <span>Inquire</span>
            </button>

            <Link
              to={`/bangalore/profile/${profile.slug}/`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer"
            >
              <span>View Profile</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>

      </div>

    </article>
  );
};
