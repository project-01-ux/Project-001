import { MOCK_PROFILES } from '../data/mockProfiles';
import { BANGALORE_AREAS } from '../data/locationsData';
import { db, isFirebaseConfigured } from '../config/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  writeBatch 
} from 'firebase/firestore';
import type { Profile, FilterState, LocationArea } from '../types';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Fisher-Yates array shuffle helper
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const PROFILES_STORAGE_KEY = 'bangalore_callgirls_profiles_db_v3';
const FIRESTORE_COLLECTION = 'profiles';

// Cache in memory for fast performance
let memoryProfilesCache: Profile[] | null = null;

// LocalStorage helpers
function getStoredProfilesLocal(): Profile[] {
  try {
    const data = localStorage.getItem(PROFILES_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load profiles from localStorage', err);
  }
  try {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(MOCK_PROFILES));
  } catch (e) {
    // ignore
  }
  return MOCK_PROFILES;
}

function saveStoredProfilesLocal(profiles: Profile[]) {
  try {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
  } catch (err) {
    console.error('Failed to save profiles to localStorage', err);
  }
}

// Firestore fetch with instant timeout fallback (2 seconds max)
async function fetchProfilesFromFirestore(): Promise<Profile[]> {
  const firestoreDb = db;
  if (!firestoreDb) return getStoredProfilesLocal();

  // Create a 2-second timeout promise to guarantee UI never gets stuck
  const timeoutPromise = new Promise<Profile[]>((resolve) => {
    setTimeout(() => {
      console.warn('Firestore response timed out (2s), loading local profiles instantly...');
      resolve(getStoredProfilesLocal());
    }, 2000);
  });

  const firestoreFetchPromise = (async () => {
    try {
      const colRef = collection(firestoreDb, FIRESTORE_COLLECTION);
      const snapshot = await getDocs(colRef);

      if (snapshot.empty) {
        console.log('Firestore profiles collection empty. Seeding initial data...');
        const batch = writeBatch(firestoreDb);
        MOCK_PROFILES.forEach((profile) => {
          const docRef = doc(firestoreDb, FIRESTORE_COLLECTION, profile.id);
          batch.set(docRef, profile);
        });
        await batch.commit();
        memoryProfilesCache = MOCK_PROFILES;
        return MOCK_PROFILES;
      }

      const profiles: Profile[] = [];
      snapshot.forEach((docSnap: any) => {
        profiles.push(docSnap.data() as Profile);
      });

      memoryProfilesCache = profiles;
      saveStoredProfilesLocal(profiles); // Keep local backup
      return profiles;
    } catch (err) {
      console.warn('Firestore fetch failed, falling back to localStorage:', err);
      return getStoredProfilesLocal();
    }
  })();

  // Return whichever resolves first (Firestore or 2s timeout)
  return Promise.race([firestoreFetchPromise, timeoutPromise]);
}

// Fetch helper (Firestore or local)
async function getAllProfiles(): Promise<Profile[]> {
  if (isFirebaseConfigured && db) {
    return await fetchProfilesFromFirestore();
  }
  if (memoryProfilesCache) return memoryProfilesCache;
  return getStoredProfilesLocal();
}

export const profileService = {
  /**
   * Retrieve profiles with random shuffling, optional filtering, and pagination (30 per page)
   */
  async getProfiles(
    filters?: Partial<FilterState>,
    page: number = 1,
    pageSize: number = 30
  ): Promise<PaginatedResult<Profile>> {
    const stored = await getAllProfiles();
    let result = shuffleArray(stored);

    if (filters) {
      if (filters.area && filters.area !== 'all') {
        const targetArea = filters.area;
        const targetAreaObj = BANGALORE_AREAS.find(
          a => a.slug === targetArea || a.name.toLowerCase() === targetArea.toLowerCase()
        );
        const areaName = targetAreaObj ? targetAreaObj.name : targetArea;
        result = result.filter(p => p.primaryArea === areaName || p.areasServed.includes(areaName));
      }

      if (filters.searchQuery && filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase().trim();
        result = result.filter(
          p =>
            p.name.toLowerCase().includes(query) ||
            p.tagline.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.primaryArea.toLowerCase().includes(query)
        );
      }

      if (filters.category && filters.category !== 'all') {
        result = result.filter(p => p.category.toLowerCase() === filters.category!.toLowerCase());
      }

      if (filters.availability && filters.availability !== 'all') {
        result = result.filter(p => p.availability.toLowerCase().includes(filters.availability!.toLowerCase()));
      }

      if (filters.ageRange && filters.ageRange !== 'all') {
        if (filters.ageRange === '18-25') result = result.filter(p => p.age >= 18 && p.age <= 25);
        else if (filters.ageRange === '26-30') result = result.filter(p => p.age >= 26 && p.age <= 30);
        else if (filters.ageRange === '31-35') result = result.filter(p => p.age >= 31 && p.age <= 35);
        else if (filters.ageRange === '36+') result = result.filter(p => p.age >= 36);
      }
    }

    const total = result.length;
    const totalPages = Math.ceil(total / pageSize) || 1;
    const validPage = Math.max(1, Math.min(page, totalPages));
    const startIndex = (validPage - 1) * pageSize;
    const paginatedData = result.slice(startIndex, startIndex + pageSize);

    return {
      data: paginatedData,
      total,
      page: validPage,
      pageSize,
      totalPages
    };
  },

  /**
   * Find single profile by unique URL slug
   */
  async getProfileBySlug(slug: string): Promise<Profile | null> {
    const stored = await getAllProfiles();
    const profile = stored.find(p => p.slug === slug);
    return profile || null;
  },

  /**
   * Get featured profiles with randomization
   */
  async getFeaturedProfiles(limit: number = 6): Promise<Profile[]> {
    const stored = await getAllProfiles();
    const shuffled = shuffleArray(stored);
    return shuffled.slice(0, limit);
  },

  /**
   * Get related profiles in the same location
   */
  async getRelatedProfiles(currentId: string, areaName: string, limit: number = 4): Promise<Profile[]> {
    const stored = await getAllProfiles();
    const matches = stored.filter(p => p.id !== currentId && (p.primaryArea === areaName || p.areasServed.includes(areaName)));
    return shuffleArray(matches).slice(0, limit);
  },

  /**
   * Location helper
   */
  getLocationBySlug(slug: string): LocationArea | undefined {
    return BANGALORE_AREAS.find(a => a.slug === slug);
  },

  /* ========================================================
     ADMIN CRUD OPERATIONS (Firestore + Local Fallback)
     ======================================================== */

  /**
   * Create a new companion profile
   */
  async createProfile(profileData: Omit<Profile, 'id' | 'createdAt'>): Promise<Profile> {
    const stored = await getAllProfiles();
    const id = `prof-${Date.now()}`;
    const newProfile: Profile = {
      ...profileData,
      id,
      createdAt: new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, FIRESTORE_COLLECTION, id);
        await setDoc(docRef, newProfile);
      } catch (e) {
        console.error('Error saving profile to Firestore:', e);
      }
    }

    const updated = [newProfile, ...stored];
    memoryProfilesCache = updated;
    saveStoredProfilesLocal(updated);
    return newProfile;
  },

  /**
   * Update an existing profile by ID
   */
  async updateProfile(id: string, updates: Partial<Profile>): Promise<Profile | null> {
    const stored = await getAllProfiles();
    const index = stored.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedProfile = { ...stored[index], ...updates };
    stored[index] = updatedProfile;

    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, FIRESTORE_COLLECTION, id);
        await updateDoc(docRef, updates as any);
      } catch (e) {
        console.error('Error updating profile in Firestore:', e);
      }
    }

    memoryProfilesCache = stored;
    saveStoredProfilesLocal(stored);
    return updatedProfile;
  },

  /**
   * Delete a profile by ID
   */
  async deleteProfile(id: string): Promise<boolean> {
    const stored = await getAllProfiles();
    const filtered = stored.filter(p => p.id !== id);
    if (filtered.length === stored.length) return false;

    if (isFirebaseConfigured && db) {
      try {
        const docRef = doc(db, FIRESTORE_COLLECTION, id);
        await deleteDoc(docRef);
      } catch (e) {
        console.error('Error deleting profile from Firestore:', e);
      }
    }

    memoryProfilesCache = filtered;
    saveStoredProfilesLocal(filtered);
    return true;
  },

  /**
   * Add photo to profile gallery
   */
  async addPhoto(id: string, photoUrl: string): Promise<Profile | null> {
    const stored = await getAllProfiles();
    const profile = stored.find(p => p.id === id);
    if (!profile) return null;

    const updatedGallery = [...profile.gallery, photoUrl];
    return this.updateProfile(id, { gallery: updatedGallery });
  },

  /**
   * Delete photo from profile gallery by index
   */
  async deletePhoto(id: string, photoIndex: number): Promise<Profile | null> {
    const stored = await getAllProfiles();
    const profile = stored.find(p => p.id === id);
    if (!profile) return null;

    const updatedGallery = profile.gallery.filter((_, idx) => idx !== photoIndex);
    const updatedImage = profile.image === profile.gallery[photoIndex]
      ? updatedGallery[0] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
      : profile.image;

    return this.updateProfile(id, { gallery: updatedGallery, image: updatedImage });
  },

  /**
   * Reset all profiles to default mock data
   */
  async resetToDefaults(): Promise<Profile[]> {
    memoryProfilesCache = MOCK_PROFILES;
    saveStoredProfilesLocal(MOCK_PROFILES);
    return MOCK_PROFILES;
  }
};
