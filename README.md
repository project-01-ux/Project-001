# Vegas Companions – Adult Companionship & Local Profiles Directory

A production-quality, fast, responsive, and SEO-optimized React & TypeScript directory platform for adult companionship (18+) initial targeted at **Las Vegas, Nevada**, with multi-city scalability.

---

## 🌟 Key Features & Architecture

- **Strict 18+ Compliance**: Mandatory 18+ age verification gate modal, privacy disclaimers, non-explicit descriptions, and safety guidelines.
- **Visual Identity & UX**: Premium minimal UI with dark charcoal typography, pristine white backgrounds, elegant crimson accenting (`#E11D48`), rounded card UI, lazy-loaded WebP images, and responsive layout.
- **Technical & On-Page SEO**:
  - `react-helmet-async` header metadata manager.
  - JSON-LD Structured Data (`WebSite`, `Organization`, `BreadcrumbList`, `ItemList`, `Person`).
  - Dynamic canonical links and `noindex` rules on filtered parameters.
  - Clean URL routing (`/las-vegas/`, `/las-vegas/the-strip/`, `/las-vegas/profile/:slug/`, paginated `/las-vegas/page/1/`).
  - Production `robots.txt` & `sitemap.xml`.
- **Performance & Scalability**:
  - Client-side mock API service layer (`profileService.ts`) easily swappable with Node.js/Express backend.
  - 60+ realistic fictional adult profiles (18+).
  - Maximum 30 profiles per page pagination limit.
  - Sub-location area routing for The Strip, Downtown, Summerlin, Henderson, Enterprise, Spring Valley, and Paradise.

---

## 🚀 Quick Start Guide

### 1. Requirements
- Node.js (v18+ recommended)
- npm or yarn

### 2. Installation
```bash
# Navigate to project directory
cd project-001

# Install dependencies (React, React Router, React Helmet Async, Tailwind CSS v4, Lucide Icons)
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📁 Directory Structure

```
src/
├── assets/                  # Static assets
├── components/
│   ├── common/              # Header, Footer, SEO, Breadcrumbs, Pagination, AgeGateModal, CookieBanner, ContactModal
│   ├── directory/           # ProfileCard, ProfileGrid, SearchFilterBar, LocationCard, FAQSection
│   └── profile/             # ProfileGallery, ProfileDetails, SafetyNoticeCard, RelatedProfiles
├── data/
│   ├── mockProfiles.ts      # 60 demo adult companion profiles (18+)
│   ├── locationsData.ts     # Las Vegas areas metadata & hero images
│   └── keywordMapData.ts    # SEO keyword map reference
├── layouts/
│   └── MainLayout.tsx       # Root layout with header, footer, modals, outlet
├── pages/
│   ├── HomePage.tsx         # Hero search, popular areas, featured profiles, how it works, safety, FAQ
│   ├── CityListingPage.tsx  # /las-vegas/ & paginated /las-vegas/page/:page/ (max 30 profiles/page)
│   ├── AreaListingPage.tsx  # /las-vegas/:areaSlug/ & paginated
│   ├── ProfileDetailPage.tsx# /las-vegas/profile/:slug/
│   ├── AboutPage.tsx        # /about/
│   ├── SafetyPage.tsx       # /safety/
│   ├── ContactPage.tsx      # /contact/
│   ├── PostProfilePage.tsx  # /post-profile/
│   ├── PrivacyPolicyPage.tsx# /privacy/
│   ├── TermsPage.tsx        # /terms/
│   ├── ReportProfilePage.tsx# /report-profile/
│   └── NotFoundPage.tsx     # 404 page
├── services/
│   └── profileService.ts    # API abstraction layer for profile querying and filtering
├── types/
│   └── index.ts             # TypeScript interfaces for Profile, Location, Filters, SEO
├── utils/
│   └── seoUtils.ts          # JSON-LD schema generators & canonical helpers
├── App.tsx                  # Router configuration & HelmetProvider
└── main.tsx                 # Entry point
```

---

## 🗺️ Adding Additional Cities (Scalability)

To expand beyond Las Vegas (e.g. `/miami/`, `/new-york/`, `/los-angeles/`):
1. Add new city data objects in `locationsData.ts`.
2. Add location routes in `App.tsx`: `<Route path=":citySlug" element={<CityListingPage />} />`.
3. Update `profileService.ts` to filter by target `citySlug`.
