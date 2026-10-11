# RBU Attendance Planner — Website & Distribution Hub

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Upstash Redis](https://img.shields.io/badge/Upstash-Redis-00e9a3?logo=redis)](https://upstash.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald)](LICENSE)

The official landing page, multi-browser installation hub, and download distribution platform for the **RBU Attendance Planner** browser extension — built specifically for students at **Ramdeobaba University (formerly RCOEM, Nagpur)**.

🌐 **Production Website:** [https://rbu-attendance-planner-site.vercel.app](https://rbu-attendance-planner-site.vercel.app)

---

## 📖 Overview

The college student attendance portal (`rcoem.in/studentCourseFileNew.htm`) only shows raw attendance totals (e.g. `24/31 — 77.4%`). Students are left doing manual calculator math to figure out how many classes they can skip or need to attend to stay safe.

**RBU Attendance Planner** injects an intelligent, real-time dashboard directly into the attendance portal to calculate:
- **Safe bunks per course** (how many lectures you can safely skip while staying above 75% overall and 60% per subject).
- **Shortage remedies** (how many consecutive lectures you must attend to recover attendance).
- **Interactive "What-If" simulator** (simulate future `+ Attend`, `+ Claim Leave`, or `- Miss` scenarios).

This web application serves as the centralized distribution hub, providing browser-specific installation guides, automated store download counters, and direct extension packages.

---

## ✨ Features

- **Cross-Platform Browser Distribution**:
  - **Google Chrome** (`/chrome`): Chrome Web Store listing + installation for Brave, Arc, Opera, and Vivaldi.
  - **Microsoft Edge** (`/edge`): Official Microsoft Edge Add-ons store listing.
  - **Mozilla Firefox** (`/firefox`): Official Firefox Add-ons (AMO) store listing.
  - **Apple Safari** (`/safari`): Native unpacked developer distribution for macOS Sonoma (14.x) & Sequoia (15.x) with step-by-step instructions and a tailored "Stuck Installing?" AI prompt generator.
- **Dynamic Download Analytics**:
  - Aggregates active users and downloads across all 4 platforms in real time.
  - Edge store catalog API & Firefox AMO API fetched automatically via daily serverless cron.
  - Privacy-preserving SHA-256 IP deduplication with salt.
  - Configurable pre-launch placeholder (`"100+ Downloads"`) that flips to live numbers seamlessly.
- **Obsidian Glass Design System**:
  - Bespoke dark mode (*Obsidian Glass*) and light mode (*Clean Slate*) tailored to match the extension UI.
  - Zero-flash theme persistence via `next-themes`.
  - Accessible high-contrast `:focus-visible` keyboard rings across all controls (WCAG 2.1 AA).
- **Privacy & Security First**:
  - Cookieless Cloudflare Web Analytics (no cookies, zero GDPR banners).
  - Strict HTTP security headers (`nosniff`, `DENY`, `strict-origin-when-cross-origin`, `Permissions-Policy`).
  - Client-side execution with zero student data logging.
- **Search Engine & Social Media Optimization**:
  - Dynamic 1200×630 Open Graph & Twitter summary card generation using `@vercel/og` (`next/og`).
  - Google-compliant `SoftwareApplication` JSON-LD structured data.
  - Canonical XML sitemap (`/sitemap.xml`) and search engine crawler instructions (`/robots.txt`).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS custom properties
- **Database & Cache**: [Upstash Redis](https://upstash.com/) (Serverless REST API)
- **Email Alerts**: [Resend](https://resend.com/) (Daily cron failure notifications)
- **Analytics**: [Cloudflare Web Analytics](https://dash.cloudflare.com/) (Cookieless beacon)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/) (Global Edge CDN)

---

## 📂 Project Structure

```text
├── app/
│   ├── [platform]/page.tsx      # Browser-specific install guides (/chrome, /edge, /firefox, /safari)
│   ├── api/
│   │   ├── cron/refresh-stats/  # Daily cron job (Edge & Firefox API scrapers + failure alert)
│   │   ├── dl/safari/           # Safari ZIP download endpoint with download counter
│   │   ├── go/[platform]/       # Outbound store redirector with click tracking
│   │   └── stats/               # Public stats endpoint with Upstash Redis cache
│   ├── layout.tsx               # Root layout, theme provider, metadata, JSON-LD, Cloudflare beacon
│   ├── page.tsx                 # Main landing page
│   ├── opengraph-image.tsx      # Dynamic 1200x630 OpenGraph image generator
│   ├── robots.ts                # Robots.txt configuration
│   ├── sitemap.ts               # XML sitemap generator
│   └── globals.css              # Obsidian Glass & Clean Slate theme tokens
├── components/
│   ├── ui/                      # Reusable UI primitives (Button, Card, Badge, Container, etc.)
│   ├── ColdBrew.tsx             # "Buy me a cold brew" expandable UPI QR modal
│   ├── CopyPromptButton.tsx     # Safari AI assistant troubleshooting prompt copier
│   ├── Faq.tsx                  # Accessible accordion FAQ
│   ├── Features.tsx             # Interactive feature cards & What-If simulator explanation
│   ├── Hero.tsx                 # Pitch headline, platform picker, and interactive screenshot carousel
│   ├── HowItWorks.tsx           # 3-step usage guide with safe bunk explanation
│   ├── Navbar.tsx               # Sticky glassmorphism navigation with theme toggle
│   ├── PlatformButtons.tsx      # Platform selector with automatic browser detection
│   └── StatsStrip.tsx           # Real-time counter strip with count-up animation
├── config/
│   ├── platforms.ts             # Browser store URLs, add-on slugs, and data sources
│   └── site.ts                  # Site metadata, safari requirements, and troubleshooting prompt
├── lib/
│   ├── redis.ts                 # Upstash Redis client singleton
│   ├── stats.ts                 # Stats reader and mutation helpers
│   └── stats-fetchers.ts        # Edge & Firefox store fetchers + Resend alert integration
├── public/
│   ├── files/                   # safari-extension.zip distribution package
│   ├── screenshots/             # Extension UI showcase screenshots
│   ├── icon16.png, icon48.png   # Extension branding icons
│   └── qr.png                   # Donation UPI QR code
├── scripts/
│   ├── set-stat.ts              # CLI script to update Chrome counts manually
│   ├── test-refresh.ts          # CLI script to test Edge/Firefox fetchers & Resend emails
│   ├── load-test.ts             # Synthetic concurrent benchmarking tool
│   └── reset-stats.ts           # Pre-launch counter reset utility
└── vercel.json                  # Daily cron configuration (0 2 * * *)
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18.17.0 or higher
- An [Upstash Redis](https://upstash.com/) database (or Vercel KV)

### 1. Clone the repository

```bash
git clone https://github.com/MohammadAdnan14/rbu-attendance-planner-site.git
cd rbu-attendance-planner-site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
# Upstash Redis (from Upstash Console or Vercel Marketplace)
KV_REST_API_URL="https://your-database.upstash.io"
KV_REST_API_TOKEN="your_upstash_token"

# Deduplication Salt (for private, cookieless download counting)
HASH_SALT="your_random_salt_string"

# Cron Job Secret (for securing /api/cron/refresh-stats)
CRON_SECRET="your_cron_secret"

# Resend Email Alerts (for failure alerts if store fetchers break)
RESEND_API_KEY="re_your_resend_api_key"
ALERT_EMAIL="your_email@example.com"

# Cloudflare Web Analytics (optional, for visitor analytics)
NEXT_PUBLIC_CF_ANALYTICS_TOKEN="your_cloudflare_analytics_token"

# Canonical URL override (defaults to https://rbu-attendance-planner-site.vercel.app)
NEXT_PUBLIC_SITE_URL="https://rbu-attendance-planner-site.vercel.app"
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site in your browser.

---

## 🛠️ CLI Utilities & Maintenance Scripts

The repository includes pre-built TypeScript maintenance tools:

### Update Chrome User Count Weekly
Chrome does not permit automated scraping of store counts. Update the Chrome number manually once a week:
```bash
npm run set-stat -- chrome 120
```
*(The script prompts for confirmation before lowering any stored count).*

### Test Automated Fetchers & Alerts
Test the Microsoft Edge catalog fetcher, Mozilla AMO fetcher, and Resend email delivery:
```bash
npm run test-refresh
```

### Run Synthetic Concurrency Benchmarking
Simulate concurrent traffic to verify Edge CDN caching, API throughput, and latencies:
```bash
npm run load-test
```

### Reset Test Counters Before Launch
Reset Safari downloads and internal testing click trackers back to `0` prior to public launch:
```bash
npm run reset-stats
```

---

## ⏰ Automated Cron Schedule

The production deployment runs a daily background cron job configured in [vercel.json](vercel.json):

- **Schedule**: Daily at 02:00 UTC (`0 2 * * *`)
- **Route**: `/api/cron/refresh-stats`
- **Behavior**:
  1. Calls Microsoft Edge Add-ons catalog API & updates `stats:edge`.
  2. Calls Mozilla Firefox AMO v5 API & updates `stats:firefox`.
  3. Verifies that the manually maintained Chrome count is not stale (>14 days old).
  4. Keeps the last known good value if any store API temporarily fails.
  5. Sends an alert email via Resend to the administrator only when a failure occurs.

---

## 🔒 Security & Privacy

- **No Student Data Stored**: The website collects zero attendance data, college IDs, or passwords.
- **Client-Side Deduplication**: Downloads and clicks are counted once per hour per visitor using a salted SHA-256 hash. Raw IP addresses and user agents are never stored in the database.
- **Security Headers**: Production responses enforce strict HTTP security headers configured in `next.config.ts`.

---

## 📄 License

This project is open-source software licensed under the [MIT License](LICENSE).

---

## 🤝 Acknowledgments

Created with ❤️ by **Mohammad Adnan** for students of Ramdeobaba University.
Not officially affiliated with Ramdeobaba University (RBU / RCOEM).
