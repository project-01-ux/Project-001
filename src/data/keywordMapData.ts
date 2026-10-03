export interface KeywordMapping {
  keyword: string;
  searchIntent: 'Navigational' | 'Informational' | 'Transactional' | 'Commercial';
  targetUrl: string;
  pageTitle: string;
  h1Heading: string;
  supportingContent: string;
}

export const KEYWORD_MAP: KeywordMapping[] = [
  {
    keyword: 'Bangalore call girls & escort service directory',
    searchIntent: 'Commercial',
    targetUrl: '/',
    pageTitle: 'Bangalore Call Girls & Escort Service Directory | Bangalore Escorts',
    h1Heading: 'Bangalore Call Girls & Verified Escort Service',
    supportingContent: 'Top-rated verified 18+ directory for call girls in Bangalore, independent escorts, and local service profiles across Koramangala, Indiranagar, and HSR Layout.'
  },
  {
    keyword: 'Call girl Bangalore',
    searchIntent: 'Transactional',
    targetUrl: '/bangalore/',
    pageTitle: 'Call Girl Bangalore Directory | Independent Escorts & Models',
    h1Heading: 'Call Girl Bangalore Listings & Independent Escorts',
    supportingContent: 'Find verified call girl profiles in Bangalore with direct phone numbers, photos, rates, and 24/7 availability across Karnataka.'
  },
  {
    keyword: 'Koramangala call girls',
    searchIntent: 'Transactional',
    targetUrl: '/bangalore/koramangala/',
    pageTitle: 'Koramangala Call Girls & Escort Profiles | Bangalore Directory',
    h1Heading: 'Koramangala Call Girls & Independent Escorts',
    supportingContent: 'Direct phone contact call girls in Koramangala 4th Block, 80 Feet Road, and Forum Mall corridor.'
  },
  {
    keyword: 'BTM Layout call girls',
    searchIntent: 'Transactional',
    targetUrl: '/bangalore/btm-layout/',
    pageTitle: 'BTM Layout Call Girls & Escort Service Profiles',
    h1Heading: 'BTM Layout Call Girls & Independent Escorts',
    supportingContent: 'Verified independent call girls in BTM Layout 2nd Stage, Madiwala Lake, and Bannerghatta Road.'
  },
  {
    keyword: 'Indiranagar escort service',
    searchIntent: 'Transactional',
    targetUrl: '/bangalore/indiranagar/',
    pageTitle: 'Indiranagar Call Girls & Escort Service | Bangalore Directory',
    h1Heading: 'Indiranagar Escort Service & Call Girls',
    supportingContent: 'Browse independent profiles for 100 Feet Road lounges, gastro-pubs, and private bookings.'
  },
  {
    keyword: 'Madiwala call girl',
    searchIntent: 'Transactional',
    targetUrl: '/bangalore/madiwala/',
    pageTitle: 'Madiwala Call Girl & Escort Service Directory | Bangalore',
    h1Heading: 'Madiwala Call Girl & Escort Service',
    supportingContent: 'Direct call girls in Madiwala commercial hub, Silk Board, and St. John’s precinct.'
  },
  {
    keyword: 'HSR Layout call girls',
    searchIntent: 'Transactional',
    targetUrl: '/bangalore/hsr-layout/',
    pageTitle: 'HSR Layout Call Girls | Independent Escort Profiles',
    h1Heading: 'HSR Layout Call Girls & Escorts',
    supportingContent: 'Verified independent call girls and VIP models in HSR Layout 27th Main and Agara.'
  },
  {
    keyword: 'JP Nagar call girl service',
    searchIntent: 'Transactional',
    targetUrl: '/bangalore/jp-nagar/',
    pageTitle: 'JP Nagar Call Girl & Escort Directory | Bangalore',
    h1Heading: 'JP Nagar Call Girl Service & Escorts',
    supportingContent: 'Refined independent call girls and escorts in JP Nagar 6th Phase and Bannerghatta corridor.'
  },
  {
    keyword: 'DSR Orchid call girls',
    searchIntent: 'Transactional',
    targetUrl: '/bangalore/dsr-orchid/',
    pageTitle: 'DSR Orchid Call Girls & Escort Service | Bangalore',
    h1Heading: 'DSR Orchid Call Girls & Independent Escorts',
    supportingContent: 'Exclusive call girl listings in DSR Orchid enclave, Haralur Road, and Sarjapur link.'
  }
];
