import type { Profile } from '../types';

const PORTRAIT_IMAGES = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80'
];

const NAMES = [
  'Ananya', 'Riya', 'Priya', 'Sonam', 'Nandini', 'Sunita', 'Aaradhya', 'Pooja',
  'Kavya', 'Deepika', 'Meera', 'Tanvi', 'Ishita', 'Aastha', 'Roshni', 'Sneha',
  'Sanjana', 'Divya', 'Shreya', 'Simran', 'Srushti', 'Natasha', 'Aditi', 'Trisha',
  'Zara', 'Nisha', 'Rachana', 'Bhavana', 'Aakanksha', 'Maya', 'Tanya', 'Varsha',
  'Srishti', 'Rhea', 'Kritika', 'Disha', 'Nikita', 'Shruti', 'Suhani', 'Monika',
  'Preeti', 'Swati', 'Alisha', 'Riddhi', 'Jahnavi', 'Revathi', 'Payal', 'Karishma',
  'Nivedita', 'Juhi', 'Prerna', 'Suman', 'Avani', 'Nayana', 'Pratiksha', 'Garima'
];

const CATEGORIES: Profile['category'][] = [
  'VIP Call Girl',
  'Escort Service',
  'Dinner Date Escort',
  'Nightlife Escort',
  'Travel Escort'
];

const AREAS = [
  'Koramangala',
  'BTM Layout',
  'Madiwala',
  'Indiranagar',
  'JP Nagar',
  'HSR Layout',
  'DSR Orchid'
];

const NATIONALITIES = [
  'Indian', 'Anglo-Indian', 'French', 'Spanish', 'Russian', 'British', 'Australian'
];

const TAGLINES = [
  'Refined & articulate VIP call girl for executive dinners in Koramangala and Indiranagar.',
  'Sophisticated escort partner for Bangalore gastro-pubs, lounges, and corporate galas.',
  'Charming independent model available for private dinners in HSR Layout and BTM Layout.',
  'Elegant nightlife escort with a passion for fine dining, music, and Bangalore events.',
  'Dynamic VIP call girl for gala attendance, hosting, and private dinners in JP Nagar.',
  'Cultured, multilingual escort for luxury dining outings in Madiwala and DSR Orchid.',
  'Warm, engaging call girl perfect for high-end dining and corporate dinner dates.',
  'Discreet and graceful escort for executive functions and private events.'
];

const DESCRIPTIONS = [
  'An educated and well-traveled independent escort who thrives in Bangalore’s high-end social settings. Whether attending an executive dinner in Koramangala, a lounge date on Indiranagar 100 Feet Road, or a private gathering in HSR Layout, I bring warmth, intellect, and charm to every booking.',
  'Dedicated to creating memorable social experiences characterized by elegance, intellect, and poise. Experienced independent call girl for corporate event hosting and hotel dining in BTM Layout and JP Nagar.',
  'A charismatic conversationalist and polished independent model. Available for fine dining engagements in Madiwala, lounge gatherings in DSR Orchid, and private luxury outings across Bangalore.',
  'A passionate advocate of gourmet dining, music, and art. I provide engaging, discreet escort services tailored for business executives and discerning travelers visiting Bangalore.',
  'Bringing genuine warmth, enthusiasm, and sophisticated elegance to your Bangalore itinerary. Perfect VIP call girl for galas, fine dining, or relaxed cocktail evenings.'
];

export const MOCK_PROFILES: Profile[] = Array.from({ length: 60 }).map((_, index) => {
  const name = NAMES[index % NAMES.length];
  const age = 21 + (index % 15); // 21 to 35
  const primaryArea = AREAS[index % AREAS.length];
  const category = CATEGORIES[index % CATEGORIES.length];
  const imageIndex = index % PORTRAIT_IMAGES.length;
  const image = PORTRAIT_IMAGES[imageIndex];
  const nationality = NATIONALITIES[index % NATIONALITIES.length];
  const slug = `${name.toLowerCase()}-${index + 1}`;

  // Gallery images shifted slightly
  const gallery = [
    image,
    PORTRAIT_IMAGES[(imageIndex + 1) % PORTRAIT_IMAGES.length],
    PORTRAIT_IMAGES[(imageIndex + 2) % PORTRAIT_IMAGES.length],
    PORTRAIT_IMAGES[(imageIndex + 3) % PORTRAIT_IMAGES.length]
  ];

  const secondaryAreas = AREAS.filter(a => a !== primaryArea).slice(0, 3);
  const phoneSuffix = (9876543210 - index * 1234).toString().slice(0, 10);

  return {
    id: `prof-${index + 1}`,
    slug,
    name,
    age,
    city: 'Bangalore',
    state: 'Karnataka',
    primaryArea,
    areasServed: [primaryArea, ...secondaryAreas],
    category,
    tagline: TAGLINES[index % TAGLINES.length],
    description: `${DESCRIPTIONS[index % DESCRIPTIONS.length]} Located in ${primaryArea}, Bangalore, and available for bookings across ${secondaryAreas.join(', ')}.`,
    image,
    gallery,
    availability: index % 3 === 0 ? 'Available Today' : index % 3 === 1 ? 'By Appointment' : 'Travel Ready',
    verifiedAge: true,
    languages: index % 2 === 0 ? ['English', 'Hindi'] : index % 3 === 0 ? ['English', 'Kannada', 'Hindi'] : ['English', 'Tamil'],
    height: `${5 + (index % 2)}'${3 + (index % 6)}"`,
    hairColor: index % 3 === 0 ? 'Black' : index % 3 === 1 ? 'Dark Brown' : 'Auburn',
    eyeColor: index % 3 === 0 ? 'Dark Brown' : index % 3 === 1 ? 'Hazel' : 'Black',
    nationality,
    ratesOverview: 'Inquire directly for private event & social bookings.',
    contactOptions: {
      phone: `+91 ${phoneSuffix.slice(0, 5)} ${phoneSuffix.slice(5)}`,
      whatsapp: `+91${phoneSuffix}`,
      telegram: `@${name.toLowerCase()}_blr`,
      email: `${name.toLowerCase()}@bangalorecompanions.demo`
    },
    featured: index < 8,
    createdAt: new Date(Date.now() - index * 86400000).toISOString()
  };
});
