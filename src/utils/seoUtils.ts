import type { BreadcrumbItem, Profile } from '../types';

export const SITE_URL = 'https://bangalorecompanions.demo';
export const SITE_NAME = 'Bangalore Call Girls & Escorts';

export const seoUtils = {
  getCanonicalUrl(path: string): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${SITE_URL}${cleanPath}`;
  },

  generateWebSiteSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': SITE_NAME,
      'url': SITE_URL,
      'potentialAction': {
        '@type': 'SearchAction',
        'target': `${SITE_URL}/bangalore/?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };
  },

  generateOrganizationSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': SITE_NAME,
      'url': SITE_URL,
      'logo': `${SITE_URL}/logo.png`,
      'description': 'Verified 18+ adult call girls & local escort profile directory in Bangalore (Bengaluru), Karnataka.',
      'knowsAbout': ['Bangalore Call Girls', 'Bangalore Local Directory', 'Escort Services']
    };
  },

  generateBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': `${SITE_URL}${item.url}`
      }))
    };
  },

  generateItemListSchema(profiles: Profile[], title: string, pageUrl: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      'name': title,
      'url': `${SITE_URL}${pageUrl}`,
      'numberOfItems': profiles.length,
      'itemListElement': profiles.map((p, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'name': `${p.name} - ${p.category} in ${p.primaryArea}, Bangalore`,
        'url': `${SITE_URL}/bangalore/profile/${p.slug}/`
      }))
    };
  },

  generatePersonProfileSchema(p: Profile) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': p.name,
      'jobTitle': `${p.category}`,
      'description': p.tagline,
      'image': p.image,
      'gender': 'Female',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': p.primaryArea,
        'addressRegion': 'KA',
        'addressCountry': 'IN'
      },
      'knowsLanguage': p.languages,
      'nationality': p.nationality,
      'url': `${SITE_URL}/bangalore/profile/${p.slug}/`
    };
  }
};
