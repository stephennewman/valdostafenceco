# Valdosta Fence Co - AI Onboarding Document

## Project Overview
A public-facing website for Valdosta Fence Co - a local, family-owned fence company serving Valdosta, GA and surrounding areas within a 25-mile radius. Built for mobile-first, fast performance, and SEO optimization to rank #1 organically.

## Tech Stack
- **Framework**: Next.js 16.1.0 (App Router)
- **React**: 19.2.3
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Utilities**: clsx (conditional classnames)
- **Language**: TypeScript 5
- **Fonts**: DM Serif Display (headings), Plus Jakarta Sans (body)

## Key Directories
- `/app` - Next.js App Router pages and layouts
- `/app/components` - Shared UI components
- `/app/data` - Content data (services, areas, testimonials, blog posts)
- `/public` - Static assets (images, icons, etc.)

## Site Structure (37 pages total)
- **Homepage** - Hero, services overview, testimonials, CTAs
- **Services** (11 pages) - Index + 10 service detail pages
- **Service Areas** (10 pages) - Hub + 9 town pages for local SEO
- **Blog** (6 pages) - Index + 5 articles for content marketing
- **Essential Pages** (6) - About, Contact, Free Estimate, Gallery, Reviews, FAQ

## Scripts
- `npm run dev` - Start development server (localhost:3000)
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Current Status
🟢 Full website built and ready for deployment

## Features Implemented
- Mobile-first responsive design
- Sticky mobile CTA bar (Call Now + Get Quote)
- Multi-step estimate form
- LocalBusiness schema markup
- FAQ page with FAQ schema
- Article schema for blog posts
- SEO metadata on all pages
- Optimized fonts via next/font
- Static site generation for performance

## Brand Colors (Updated)
- Red: rgb(139, 45, 50) (primary/accent)
- Charcoal Dark: rgb(74, 74, 74) (headings/text)
- Charcoal Deep: rgb(45, 45, 45) (dark sections)
- White: #FFFFFF (backgrounds)
- Gray: rgb(150, 150, 150) (muted text)

---

## Activity Log

### Saturday, December 20, 2025 - 9:45 PM EST
**Deploy #3 - Sitemap & Robots.txt**
- Created dynamic `sitemap.ts` with all 37 pages
- Created `robots.ts` pointing to sitemap
- Priority weighting: homepage (1.0), services/areas (0.8), blog (0.6)
- Sitemap auto-updates when new pages are added
- URLs:
  - https://valdostafenceco.com/sitemap.xml
  - https://valdostafenceco.com/robots.txt
- Commit: d78c5c3

### Saturday, December 20, 2025 - 9:35 PM EST
**Deploy #2 - Google Analytics Phone Click Tracking**
- Added Google Analytics 4 (G-MT4V9RR5WX) to site
- Created `PhoneLink` component with click event tracking
- Updated all 15+ phone links across site to use new component
- Each click tracks location: header-topbar, mobile-sticky-cta, footer, mobile-nav, homepage-cta, contact-sidebar, estimate-thank-you, service-page-sidebar, area-page-sidebar, blog-post-cta
- Events fire to GA4 as `phone_click` with `event_category: engagement`
- Commit: b53181d

### Saturday, December 20, 2025 - 9:11 PM EST
**Deploy #1 - Full Site + Color Fixes**
- Deployed 33 files to GitHub/Vercel
- Fixed About page "Why Local Matters" section - updated old green/gold colors to new red/charcoal palette
- Fixed Reviews page stats bar - labels now visible (changed from 80% opacity to solid white)
- Updated color palette from green/gold to red/charcoal/white (Redfern-inspired)
- Commit: bcf82db

### Saturday, December 20, 2025 - 9:15 PM EST
**Complete Website Build**
- Built 37-page website from scratch
- Created 9 reusable components (Header, Footer, MobileNav, CTAButton, HeroSection, ServiceCard, TestimonialCard, ContactForm, FAQAccordion)
- Implemented 10 service pages with detailed content and FAQs
- Built 9 location pages for local SEO (Valdosta, Hahira, Lake Park, etc.)
- Created 5 blog articles targeting local keywords
- Added LocalBusiness schema for Google rich results
- Implemented FAQ schema markup
- Multi-step estimate form with validation
- Mobile sticky CTA bar
- Production build successful (37 pages generated)

### Saturday, December 20, 2025 - 8:29 PM EST
**Initial Setup**
- Indexed existing Next.js 16 project
- Installed all base dependencies (357 packages)
- Added `lucide-react` for icons
- Added `clsx` for conditional styling
- Created AI_Onboarding.md document
- Project ready for public site development
