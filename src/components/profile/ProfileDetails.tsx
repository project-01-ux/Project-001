import React from 'react';
import { MapPin, MessageSquare, Phone, CheckCircle2, Sparkles } from 'lucide-react';
import type { Profile } from '../../types';
import { Link } from 'react-router-dom';

interface ProfileDetailsProps {
  profile: Profile;
  onContactClick: () => void;
}

export const ProfileDetails: React.FC<ProfileDetailsProps> = ({ profile, onContactClick }) => {
  return (
    <div className="space-y-8">
      
      {/* Header Info Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {profile.category}
              </span>
              <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {profile.availability}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span>{profile.name}</span>
              <span className="text-xl font-normal text-slate-500">({profile.age} yrs)</span>
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
              <MapPin size={16} className="text-rose-600 shrink-0" />
              <span>{profile.primaryArea}, Bangalore • Karnataka</span>
            </div>
          </div>

          <button
            onClick={onContactClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-md transition-all text-sm cursor-pointer active:scale-98"
          >
            <MessageSquare size={18} />
            <span>Contact Companion</span>
          </button>
        </div>

        {/* Quick Attribute Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Height</span>
            <span className="font-semibold text-slate-900 text-sm">{profile.height}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Nationality</span>
            <span className="font-semibold text-slate-900 text-sm">{profile.nationality}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Languages</span>
            <span className="font-semibold text-slate-900 text-sm">{profile.languages.join(', ')}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Verification</span>
            <span className="font-semibold text-emerald-600 text-sm flex items-center gap-1">
              <CheckCircle2 size={14} /> 18+ Confirmed
            </span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles size={18} className="text-rose-600" />
          <span>About {profile.name}</span>
        </h2>
        <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line">
          {profile.description}
        </p>
      </div>

      {/* Areas Served Information */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <MapPin size={18} className="text-rose-600" />
          <span>Areas Served in Bangalore</span>
        </h2>
        <p className="text-sm text-slate-600">
          Available for social accompaniment, dining dates, and event attendance in the following Bangalore locations:
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {profile.areasServed.map((areaName) => {
            const areaSlug = areaName.toLowerCase().replace(/\s+/g, '-');
            return (
              <Link
                key={areaName}
                to={`/bangalore/${areaSlug}/`}
                className="bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <MapPin size={12} className="text-rose-500" />
                <span>{areaName}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Direct Contact Options */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
        <div className="space-y-1">
          <span className="text-rose-400 text-xs font-bold uppercase tracking-wider">Direct Communication</span>
          <h3 className="text-2xl font-bold">Contact & Booking Options</h3>
          <p className="text-xs text-slate-400">
            Please present clear event details, location, and dates when inquiring.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {profile.contactOptions.phone && (
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-600/20 text-rose-400 rounded-xl">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold">Direct Phone</span>
                  <a href={`tel:${profile.contactOptions.phone}`} className="font-semibold text-white text-sm hover:underline">
                    {profile.contactOptions.phone}
                  </a>
                </div>
              </div>
            </div>
          )}

          {profile.contactOptions.whatsapp && (
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-600/20 text-emerald-400 rounded-xl">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold">WhatsApp Messenger</span>
                  <a href={`https://wa.me/${profile.contactOptions.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-white text-sm hover:underline">
                    {profile.contactOptions.whatsapp}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onContactClick}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-2xl transition-colors text-center text-sm cursor-pointer"
        >
          Send Directory Inquiry Message
        </button>
      </div>

    </div>
  );
};
