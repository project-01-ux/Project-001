import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Camera, Phone, Sparkles, Upload } from 'lucide-react';
import type { Profile } from '../../types';
import { BANGALORE_AREAS } from '../../data/locationsData';
import { profileService } from '../../services/profileService';

interface AdminProfileFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileToEdit?: Profile | null;
  onSuccess: () => void;
}

export const AdminProfileFormModal: React.FC<AdminProfileFormModalProps> = ({
  isOpen,
  onClose,
  profileToEdit,
  onSuccess
}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(25);
  const [primaryArea, setPrimaryArea] = useState('Koramangala');
  const [category, setCategory] = useState<Profile['category']>('Dinner Companion');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [height, setHeight] = useState(`5'6"`);
  const [languages, setLanguages] = useState('English, Hindi');
  const [nationality, setNationality] = useState('Indian');
  const [mainImage, setMainImage] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (profileToEdit) {
      setName(profileToEdit.name);
      setAge(profileToEdit.age);
      setPrimaryArea(profileToEdit.primaryArea);
      setCategory(profileToEdit.category);
      setTagline(profileToEdit.tagline);
      setDescription(profileToEdit.description);
      setPhone(profileToEdit.contactOptions.phone || '+91 98765 43210');
      setHeight(profileToEdit.height);
      setLanguages(profileToEdit.languages.join(', '));
      setNationality(profileToEdit.nationality);
      setMainImage(profileToEdit.image);
      setGallery(profileToEdit.gallery || [profileToEdit.image]);
    } else {
      setName('');
      setAge(24);
      setPrimaryArea('Koramangala');
      setCategory('Dinner Companion');
      setTagline('Refined & articulate companion for fine dining dates.');
      setDescription('An educated and well-traveled companion who thrives in Bangalore social settings.');
      setPhone('+91 98765 43210');
      setHeight(`5'6"`);
      setLanguages('English, Hindi');
      setNationality('Indian');
      setMainImage('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80');
      setGallery([
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
      ]);
    }
  }, [profileToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddPhoto = () => {
    if (newPhotoUrl.trim()) {
      setGallery([...gallery, newPhotoUrl.trim()]);
      if (!mainImage) setMainImage(newPhotoUrl.trim());
      setNewPhotoUrl('');
    }
  };

  // Support local device image file upload (converts to Base64 data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          const base64Url = reader.result;
          setGallery((prev) => [...prev, base64Url]);
          if (!mainImage) setMainImage(base64Url);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (index: number) => {
    const updated = gallery.filter((_, i) => i !== index);
    setGallery(updated);
    if (mainImage === gallery[index]) {
      setMainImage(updated[0] || '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const slug = name.toLowerCase().replace(/\s+/g, '-') + '-' + Math.floor(Math.random() * 1000);
    const langArray = languages.split(',').map(s => s.trim()).filter(Boolean);
    const secondaryAreas = BANGALORE_AREAS.map(a => a.name).filter(a => a !== primaryArea).slice(0, 3);
    const phoneClean = phone.trim();

    const profileData: Omit<Profile, 'id' | 'createdAt'> = {
      slug: profileToEdit ? profileToEdit.slug : slug,
      name,
      age: Number(age),
      city: 'Bangalore',
      state: 'Karnataka',
      primaryArea,
      areasServed: [primaryArea, ...secondaryAreas],
      category,
      tagline,
      description,
      image: mainImage || gallery[0] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      gallery: gallery.length > 0 ? gallery : [mainImage],
      availability: 'Available Today',
      verifiedAge: true,
      languages: langArray.length > 0 ? langArray : ['English'],
      height,
      hairColor: 'Black',
      eyeColor: 'Dark Brown',
      nationality,
      contactOptions: {
        phone: phoneClean,
        whatsapp: phoneClean.replace(/[^0-9]/g, ''),
        telegram: `@${name.toLowerCase()}_blr`,
        email: `${name.toLowerCase()}@bangalorecompanions.demo`
      },
      featured: true
    };

    if (profileToEdit) {
      await profileService.updateProfile(profileToEdit.id, profileData);
    } else {
      await profileService.createProfile(profileData);
    }

    setSubmitting(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {profileToEdit ? `Edit Profile: ${profileToEdit.name}` : 'Add New Companion Profile'}
              </h3>
              <p className="text-xs text-slate-500">Admin Live Profile Management</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Name & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Companion Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Age (18+)</label>
              <input
                type="number"
                min="18"
                max="99"
                required
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-hidden"
              />
            </div>
          </div>

          {/* Area & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Primary Area</label>
              <select
                value={primaryArea}
                onChange={(e) => setPrimaryArea(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:border-rose-500 outline-hidden"
              >
                {BANGALORE_AREAS.map(a => (
                  <option key={a.slug} value={a.name}>{a.name} ({a.city})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Profile['category'])}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:border-rose-500 outline-hidden"
              >
                <option value="Dinner Companion">Dinner Companion</option>
                <option value="VIP Social Companion">VIP Social Companion</option>
                <option value="Event Escort">Event Escort</option>
                <option value="Nightlife Companion">Nightlife Companion</option>
                <option value="Travel Escort">Travel Escort</option>
              </select>
            </div>
          </div>

          {/* Direct Phone Number */}
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1 flex items-center gap-1">
              <Phone size={13} className="text-rose-600" />
              Direct Phone Contact Number (Opens Dialpad on Mobile)
            </label>
            <input
              type="text"
              required
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold focus:border-rose-500 outline-hidden"
            />
          </div>

          {/* Tagline */}
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Tagline / Short Summary</label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-hidden"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Full Description</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-hidden"
            />
          </div>

          {/* Languages, Height & Nationality */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Height</label>
              <input
                type="text"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Languages (comma separated)</label>
              <input
                type="text"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Nationality</label>
              <input
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-hidden"
              />
            </div>
          </div>

          {/* Photos Management */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <Camera size={16} className="text-rose-600" />
              Photo Gallery & Image Upload
            </h4>

            {/* Current Photos */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {gallery.map((imgUrl, idx) => (
                <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img src={imgUrl} alt="Gallery photo" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute top-1 right-1 bg-rose-600 text-white p-1 rounded-md opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                    title="Delete Photo"
                  >
                    <Trash2 size={12} />
                  </button>
                  {mainImage === imgUrl && (
                    <span className="absolute bottom-1 left-1 bg-slate-900/80 text-white text-[9px] px-1 rounded">Main</span>
                  )}
                </div>
              ))}
            </div>

            {/* Option A: Enter Photo Web URL */}
            <div className="flex items-center gap-2">
              <input
                type="url"
                placeholder="Option 1: Paste image Web URL (Unsplash, Imgur, S3)..."
                value={newPhotoUrl}
                onChange={(e) => setNewPhotoUrl(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-3 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Plus size={14} />
                <span>Add URL</span>
              </button>
            </div>

            {/* Option B: Upload File from Phone/PC */}
            <div className="flex items-center gap-2 pt-1">
              <label className="flex-1 border-2 border-dashed border-slate-300 hover:border-rose-400 bg-slate-50 hover:bg-rose-50/50 p-2.5 rounded-xl text-slate-600 text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors">
                <Upload size={14} className="text-rose-600" />
                <span className="font-medium">Option 2: Upload photo directly from Phone / Device</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all text-sm flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <Save size={16} />
            <span>{profileToEdit ? 'Save Profile Changes' : 'Publish Profile'}</span>
          </button>
        </form>

      </div>
    </div>
  );
};
