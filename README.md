<div align="center">

# 🏗️ Gera Developments – Hinjewadi, Pune

### Premium Real Estate Sales Platform, Lead Engine & CRM

[![Live Website](https://img.shields.io/badge/Live%20Website-gerahinjewadi.com-00b4d8?style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.gerahinjewadi.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![QA Status](https://img.shields.io/badge/QA%20Status-100%25%20Verified%20(45%2F45)-success?style=for-the-badge&logo=checkmarx)](docs/MASTER_QA_TEST_REPORT.md)
[![Mobile Certified](https://img.shields.io/badge/Mobile-100%25%20Responsive-gold?style=for-the-badge&logo=apple)](docs/MOBILE_TESTING_MATRIX.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-gray?style=for-the-badge)](LICENSE)

A production-ready, high-converting real estate sales and lead management platform built for **Gera Developments – Hinjewadi, Pune** and transferred to **24k Realtors Hinjewadi**. Features a luxury dark-theme design system, interactive layouts, secure CRM admin portal, automated WhatsApp alerts, and robust Supabase backend integration with local CSV cascading fallback.

**🌐 Live Production URL:** [https://www.gerahinjewadi.com](https://www.gerahinjewadi.com)  
**🏢 Client & Company Profile:** [24krealtorshinjewadi-blip](https://github.com/24krealtorshinjewadi-blip)  
**📦 Handover Repository:** [24krealtorshinjewadi-blip/Gera-Hinjewadi](https://github.com/24krealtorshinjewadi-blip/Gera-Hinjewadi)

</div>

---

## 📑 Handover & Technical Documentation Directory

Everything required for executive sign-off, system operations, QA verification, mobile compliance, and defect reporting is documented in the `/docs` directory:

| Document | Direct Link | Scope & Purpose |
| :--- | :--- | :--- |
| **📋 Master QA Test Report** | [docs/MASTER_QA_TEST_REPORT.md](docs/MASTER_QA_TEST_REPORT.md) | 45 comprehensive test scenarios across UI, Forms, DB, CRM, WhatsApp, and Security. 100% Pass Rate. |
| **📱 Mobile Testing Matrix** | [docs/MOBILE_TESTING_MATRIX.md](docs/MOBILE_TESTING_MATRIX.md) | Multi-device verification across 14 iOS & Android screen sizes, touch targets, virtual keyboards & throttling. |
| **📘 Project Handover Guide** | [docs/HANDOVER_GUIDE.md](docs/HANDOVER_GUIDE.md) | Architecture deep-dive, `.env` guide, Supabase SQL schema provisioning, CRM runbook, and Vercel CI/CD setup. |
| **🐞 Issue Reporting Guide** | [docs/ISSUE_REPORTING_GUIDE.md](docs/ISSUE_REPORTING_GUIDE.md) | Formal defect reporting protocol, severity SLA matrix (P0 to P4), and GitHub issue triage workflow. |
| **🔀 Git Flow Strategy** | [docs/git-flow-workflow.md](docs/git-flow-workflow.md) | Standardized branching strategy (`master`, `develop`, `feature/*`, `fix/*`) and release procedures. |

---

## ✨ Platform Highlights

### 🏠 High-Converting Landing Page
- **Luxury Aesthetic** — Sophisticated dark navy backdrop, warm metallic gold gradients, sleek borders, and glassmorphism UI layouts
- **Interactive Floor Plans** — Dynamic layout switching with blur-to-unlock overlay requiring enquiry submission
- **Proximity Map** — Distance metrics for Transit, IT Parks, Schools, and Hospitals with interactive vector overlays
- **Premium Showcase** — 8 amenity tiles with hover transformations, project gallery with image lightbox, YouTube walkthrough video modal, testimonials, and accordion FAQs
- **Sticky Action Bar** — Mobile bottom bar with direct Call Now (`tel:`) and WhatsApp chat deep-links

### 📝 Smart Lead Capture System
- **Zod + React Hook Form** — Rigorous validation with Indian mobile number verification (`[6-9]` prefix, 10-digit regex)
- **Canvas Confetti** — Celebration animation on successful submission
- **Animated Thank You Page** — Dedicated `/thank-you` confirmation route with auto-redirect and brochure download

### 🛡️ Secure CRM Admin Portal
- **Session-Protected** — JWT `httpOnly` secure cookies with server-side proxy route guards (`/admin`)
- **Lead Dashboard** — Metric counters (total, today, weekly, monthly), filtering, search, and CSV export
- **Status Pipeline** — Track leads through: `New → Contacted → Site Visit → Negotiation → Booked / Lost`
- **Agent Management** — Full CRUD for sales agents with active/inactive toggling and lead assignment
- **Follow-Up Logs** — Timestamped activity timeline for every lead interaction

### 🔌 Enterprise Integrations & Fallbacks
- **Dual Persistence Architecture** — Real-time Supabase PostgreSQL with RLS + automatic local CSV fallback (`leads.csv`, `agents.csv`, `follow_ups.csv`)
- **Cascading Integrity** — Deleting agents gracefully re-assigns leads and purges orphan follow-up logs
- **WhatsApp Alerts** — Twilio-powered instant notifications to sales desk (`+91 96730 00053`)
- **SEO & Compliance** — Dynamic sitemaps, robots.txt, Open Graph meta tags, Schema.org structured data, and MahaRERA legal disclosures

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router + Turbopack engine) |
| **Styling** | Tailwind CSS v4 + Tailwind Animate |
| **Components** | Shadcn UI (Base-UI primitives), Lucide React Icons |
| **Animations** | Framer Motion, Canvas Confetti |
| **Database** | Supabase (PostgreSQL 15) + Resilient CSV Local Fallback |
| **Validation** | Zod Schema Validation + React Hook Form |
| **Authentication** | JWT session cookies (`httpOnly`, `SameSite=Strict`) |
| **Notifications** | Twilio WhatsApp API Gateway |
| **Deployment** | Vercel Edge Serverless Deployment |

---

## 📂 Project Structure

```
Gera-Hinjewadi/
├── .github/
│   ├── ISSUE_TEMPLATE/          # Bug reports, feature requests, handover inquiries
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   ├── handover_inquiry.md
│   │   └── config.yml
│   └── workflows/               # CI/CD automation pipelines
├── docs/                        # Formal Handover & Quality Assurance Manuals
│   ├── HANDOVER_GUIDE.md        # Technical transition & deployment manual
│   ├── MASTER_QA_TEST_REPORT.md # 45-point test verification certification
│   ├── MOBILE_TESTING_MATRIX.md # iOS & Android responsive audit
│   ├── ISSUE_REPORTING_GUIDE.md # Bug reporting & SLA protocol
│   └── git-flow-workflow.md     # Branching & release lifecycle
├── public/                      # Static assets (images, brochure PDF, floor plans)
├── src/
│   ├── app/
│   │   ├── admin/               # CRM dashboard & login pages
│   │   │   ├── login/page.tsx   # Admin authentication interface
│   │   │   └── page.tsx         # Lead management & agent pipeline dashboard
│   │   ├── api/
│   │   │   ├── admin/           # Login/logout JWT session endpoints
│   │   │   ├── agents/          # Sales agent CRUD endpoints
│   │   │   └── leads/           # Public & admin lead CRUD endpoints
│   │   ├── thank-you/           # Post-submission confirmation page
│   │   ├── globals.css          # Design tokens, glassmorphism, luxury gold theme
│   │   ├── layout.tsx           # Root layout + SEO metadata + Schema.org
│   │   ├── page.tsx             # Main luxury landing page
│   │   ├── robots.ts            # Search engine crawling directives
│   │   └── sitemap.ts           # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── Header.tsx           # Responsive glassmorphism navbar + CTA modal
│   │   ├── Footer.tsx           # Legal, MahaRERA disclosures, quick links
│   │   ├── LeadCaptureForm.tsx  # Main lead capture with Zod validation
│   │   └── ui/                  # Shadcn UI primitives
│   ├── lib/
│   │   ├── auth.ts              # JWT session token manager
│   │   ├── leadsStorage.ts      # Offline CSV engine with cascading operations
│   │   ├── supabase.ts          # Supabase standard & service-role clients
│   │   ├── utils.ts             # Utility helpers
│   │   └── whatsapp.ts          # Twilio WhatsApp notification dispatcher
│   └── proxy.ts                 # Next.js 16 route guards for /admin
├── database.sql                 # Production PostgreSQL schema (tables, RLS, indexes)
├── .env.example                 # Environment variable template
├── CHANGELOG.md                 # Version release history
├── CONTRIBUTING.md              # Engineering contribution guide
├── SECURITY.md                  # Security and vulnerability reporting
├── LICENSE                      # MIT Open Source License
└── package.json                 # Dependencies and npm build scripts
```

---

## 💾 Database Schema

The platform implements a relational 3-table data model with complete foreign key enforcement:

```
┌──────────────────┐      ┌──────────────────────────┐      ┌──────────────────────────┐
│      agents      │      │          leads           │      │     follow_up_logs       │
├──────────────────┤      ├──────────────────────────┤      ├──────────────────────────┤
│ id (PK, UUID)    │◄─────│ assigned_agent_id (FK)   │      │ id (PK, UUID)            │
│ name (VARCHAR)   │      │ id (PK, UUID)            │◄─────│ lead_id (FK, UUID)       │
│ phone (VARCHAR)  │      │ name (VARCHAR)           │      │ agent_id (FK, UUID) ─────┼──► agents.id
│ email (VARCHAR)  │      │ phone (VARCHAR)          │      │ status (VARCHAR)         │
│ active (BOOLEAN) │      │ email (VARCHAR)          │      │ notes (TEXT)             │
│ created_at       │      │ budget (VARCHAR)         │      │ created_at (TIMESTAMPTZ) │
└──────────────────┘      │ configuration (VARCHAR)  │      └──────────────────────────┘
                          │ status (VARCHAR)         │
                          │ notes (TEXT)             │
                          │ site_visit_date (DATE)   │
                          │ created_at (TIMESTAMPTZ) │
                          └──────────────────────────┘
```

> **Setup:** Paste [`database.sql`](database.sql) into your Supabase SQL Editor to provision all tables, Row Level Security (RLS) rules, and search indexes.

---

## ⚙️ Quick Start Runbook

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/24krealtorshinjewadi-blip/Gera-Hinjewadi.git
cd Gera-Hinjewadi
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local` and populate values:

```env
# Supabase PostgreSQL Cloud
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin CRM Authentication
ADMIN_PASSWORD=admin1234
JWT_SECRET=super_secret_jwt_signing_key_min_32_chars

# Twilio WhatsApp Notifications (Optional for local dev)
SALES_WHATSAPP_TO=+919673000053
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

### 3. Build & Run

```bash
# Production Build
npm run build

# Start Production Server
npm start
```

Platform opens at **`http://localhost:3000`**.  
CRM Portal: **`http://localhost:3000/admin`** (Password: `admin1234`).

---

## 🚀 Production Deployment (Vercel)

1. Import repository `24krealtorshinjewadi-blip/Gera-Hinjewadi` into **Vercel**.
2. Configure Environment Variables in **Vercel Dashboard → Project Settings → Environment Variables**.
3. Add Custom Domain: `gerahinjewadi.com` and `www.gerahinjewadi.com`.
4. DNS Configuration:
   - **A Record:** `@` points to `76.76.21.21`
   - **CNAME:** `www` points to `cname.vercel-dns.com`

---

## 📞 Support & Handover Inquiries

For technical assistance, bug reports, or handover questions:
- **Lead Developer:** Manish Rai
- **Email:** `manishrajapakar@gmail.com`
- **WhatsApp Support:** `+91 96730 00053`
- **Issue Tracker:** [GitHub Issues](https://github.com/24krealtorshinjewadi-blip/Gera-Hinjewadi/issues)

---

<div align="center">

**Handover Certified for 24k Realtors Hinjewadi & Gera Developments**  
*Built with excellence, precision, and enterprise quality.*

</div>
