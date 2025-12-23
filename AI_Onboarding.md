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
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend

## Environment Variables
Add these to your `.env.local` for local dev and to Vercel for production:

```bash
# Supabase (uses v7-form-builder project - VFC tables are isolated with vfc_ prefix)
NEXT_PUBLIC_SUPABASE_URL=https://xsncgdnctnbzvokmxlex.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_anon_key>

# Email (Resend)
RESEND_API_KEY=<your_resend_api_key>
LEADS_EMAIL=<your_business_email>
```

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

### Tuesday, December 23, 2025 - Time TBD
**Deploy #10 - Slack Notifications for Free Estimate Submissions**
- **Feature**: Slack alerts for new estimate form submissions
- **Notification Includes**: Name, phone, email, city, fence type, timeline, length, lead score, scheduled appointment
- **Priority Indicators**: 🔥 High, ⚡ Medium, 📋 Standard
- **Files Updated**:
  - `app/api/estimate/route.ts` - Added Slack webhook integration
- Commit: 090fe52

### Tuesday, December 23, 2025 - Time TBD
**Deploy #9 - Phone CTA Click Notifications (Slack + Email)**
- **Feature**: Real-time notifications when someone clicks a phone CTA
- **Slack Integration**: Optional Slack webhook sends instant notifications with click location, time, source page
- **Email Notifications**: Uses existing Resend setup to send email alerts
- **Tracking Data**: Location (header, footer, hero, etc.), timestamp, source page URL, user agent
- **Implementation**: Fire-and-forget API call - won't delay or interfere with phone calls
- **New Environment Variable**: `SLACK_WEBHOOK_URL` (optional) for Slack notifications
- **Files Added**:
  - `app/api/track-call/route.ts` - API endpoint for notifications
- **Files Updated**:
  - `app/components/PhoneLink.tsx` - Now calls track-call API on click
- Commit: 75afef7

### Tuesday, December 23, 2025 - 12:30 AM EST
**Deploy #8 - Supabase Integration: Lead Database**
- **Feature**: Connected to Supabase for persistent lead storage and tracking
- **Database**: Using `v7-form-builder` project with isolated `vfc_` prefixed tables
- **Tables Created**:
  - `vfc_leads` - All form submissions with lead scoring, status pipeline
  - `vfc_appointments` - Scheduled site visits linked to leads
  - `vfc_lead_history` - Automatic status change tracking (trigger-based)
- **Lead Fields**: name, phone, email, address, city, property_type, fence_type, fence_length, timeline, notes, lead_score, lead_priority, estimated_value, status, scheduled_date, scheduled_time
- **Pipeline Statuses**: new → contacted → quoted → won/lost/cancelled
- **RLS Policies**: Public insert allowed (anonymous forms), authenticated read/update (admin dashboard)
- **Auto-triggers**: updated_at on row changes, status history logging
- **API Update**: Estimate form now saves to Supabase before sending emails
- **Files Added**:
  - `app/utils/supabase.ts` - Supabase client + VFC type definitions
- **Files Updated**:
  - `app/api/estimate/route.ts` - Saves lead to DB, returns leadId in response
  - `package.json` - Added @supabase/supabase-js

### Tuesday, December 23, 2025 - 12:15 AM EST
**Deploy #7 - Dual Email Track: Business Alerts + Customer Confirmations**
- **Feature**: Added customer-facing confirmation emails alongside internal business notifications
- **Two Email Tracks**:
  1. **Internal (Business)**: Lead details, priority badge, score, contact info → LEADS_EMAIL
  2. **Customer**: Branded confirmation email → customer's email address
- **Customer Email Templates**:
  - **Scheduled appointments**: "✓ Appointment Confirmed!" with date, time, location, what to expect
  - **Non-scheduled requests**: "✓ Request Received!" with next steps (we'll call within 24 hours)
- **Email Requirement**: Email is now required when scheduling an appointment (to receive confirmation)
- **Branded Design**: Professional HTML emails with Valdosta Fence Co. branding (red #8B2D32 header, charcoal footer)
- **Files Added**:
  - `app/utils/emailTemplates.ts` - Customer email HTML templates
- **Files Updated**:
  - `app/api/estimate/route.ts` - Dual email sending logic
  - `app/free-estimate/page.tsx` - Email required for scheduled appointments

### Monday, December 22, 2025 - 11:59 PM EST
**Deploy #6 - Smart Scheduling Widget with Lead Scoring**
- **Feature**: Added intelligent scheduling widget to estimate form that shows availability based on lead value
- **Lead Scoring Algorithm** (0-100 points):
  - Property Type: Residential (10), Farm/Ranch (18), Commercial (20)
  - Fence Type: Repair (5), Gate (8), Chain-Link (12), Wood (18), Privacy (20), Vinyl/Aluminum (25), Farm (30)
  - Fence Length: Under 100ft (5), 100-250ft (15), 250-500ft (25), 500+ ft (35)
  - Timeline: Planning (2), 3 months (5), Month (10), ASAP (15)
- **Priority Tiers**:
  - 🔥 HIGH (70+): "Priority Scheduling" - dates available this week
  - ⚡ MEDIUM (45-69): "Standard Scheduling" - dates available next week
  - 📋 LOW (<45): "Flexible Scheduling" - dates available 2+ weeks out
- **New Form Step**: Added "How much fencing do you need?" step with structured length options
- **UI Features**: 
  - Priority badge (green/amber/gray) based on lead score
  - Date picker with 2-hour time windows
  - "Skip - Call me instead" option
  - Confirmation box shows selected appointment
- **Email Updates**: Lead emails now include priority badge, score, and scheduled appointment if selected
- **Files Added**:
  - `app/utils/leadScoring.ts` - Lead scoring algorithm
  - `app/components/SchedulingWidget.tsx` - Scheduling UI component
- **Files Updated**:
  - `app/free-estimate/page.tsx` - 6-step form with scheduling integration
  - `app/api/estimate/route.ts` - Enhanced email with scoring data

### Monday, December 22, 2025 - 11:55 PM EST
**Deploy #5 - Site Cleanup**
- Removed "Service Areas" from main navigation (cleaner nav, page still accessible)
- Removed "8+ Happy Customers" stat from Reviews page summary section
- Added 9th customer review (Angela R. from Moultrie, GA - Privacy Fence Installation)
- Reviews page now shows 9 testimonials
- Commit: cfed774

### Monday, December 22, 2025 - 11:45 PM EST
**Deploy #4 - Critical SEO Fix: Canonical URLs**
- **Issue**: Google Search Console was selecting wrong canonical URL (kvc.co.th - unrelated Thai website)
- **Root cause**: Missing explicit canonical URLs allowed Google to incorrectly infer canonicals
- **Fix implemented**:
  - Added `metadataBase: new URL("https://valdostafenceco.com")` to root layout
  - Added `alternates.canonical` to ALL 37 pages
  - Created layout.tsx files for client components (free-estimate, gallery) to add metadata
  - Added `trailingSlash: false` to next.config.ts for URL consistency
- **Files updated**: 14 files (layout.tsx, all page metadata files, next.config.ts)
- **Result**: Every page now outputs `<link rel="canonical" href="https://valdostafenceco.com/...">` 
- **Next steps**: Re-request indexing in Google Search Console
- Commit: 78aac3b

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
