import React, { useState } from 'react';
import { Camera, ShieldCheck, Expand } from 'lucide-react';

interface ProfileGalleryProps {
  images: string[];
  name: string;
}

export const ProfileGallery: React.FC<ProfileGalleryProps> = ({ images, name }) => {
  const [activeImage, setActiveImage] = useState(images[0] || '');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Main Image View */}
      <div className="relative aspect-4/5 sm:aspect-3/4 rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md group">
        <img
          src={activeImage}
          alt={`Verified profile picture for ${name}`}
          className="w-full h-full object-cover object-center cursor-pointer group-hover:scale-102 transition-transform duration-500"
          onClick={() => setLightboxOpen(true)}
        />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
          <Camera size={14} className="text-rose-400" />
          <span>{images.length} Photos</span>
        </div>

        <div className="absolute top-4 right-4 bg-emerald-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/40 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
          <ShieldCheck size={14} />
          <span>18+ Verified Identity</span>
        </div>

        <button
          onClick={() => setLightboxOpen(true)}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-800 p-2.5 rounded-xl backdrop-blur-md shadow-md transition-colors cursor-pointer"
          aria-label="Enlarge Image"
        >
          <Expand size={18} />
        </button>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => {
            const isSelected = img === activeImage;
            return (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-rose-600 ring-2 ring-rose-100 scale-102'
                    : 'border-slate-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`${name} photo thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <img
              src={activeImage}
              alt={`Enlarged view of ${name}`}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
            <p className="absolute bottom-[-2rem] text-slate-400 text-xs font-medium">
              Click anywhere to exit view
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
