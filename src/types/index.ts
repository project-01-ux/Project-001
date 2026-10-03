export interface Profile {
  id: string;
  slug: string;
  name: string;
  age: number;
  city: string;
  state: string;
  primaryArea: string; // e.g. "Koramangala"
  areasServed: string[];
  category: 'VIP Call Girl' | 'Escort Service' | 'Dinner Date Escort' | 'Nightlife Escort' | 'Travel Escort' | string;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  availability: 'Available Today' | 'By Appointment' | 'Travel Ready';
  verifiedAge: boolean;
  languages: string[];
  height: string;
  hairColor: string;
  eyeColor: string;
  nationality: string;
  ratesOverview?: string;
  contactOptions: {
    phone?: string;
    whatsapp?: string;
    telegram?: string;
    email?: string;
  };
  featured?: boolean;
  createdAt: string;
}

export interface LocationArea {
  slug: string;
  name: string;
  city: string;
  state: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  popularHighlights: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface FilterState {
  area: string;
  searchQuery: string;
  ageRange: string;
  category: string;
  availability: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  noindex?: boolean;
  structuredData?: object | object[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
