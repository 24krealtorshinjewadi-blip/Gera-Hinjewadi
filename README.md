<div align="center">

# 🏗️ Gera Developments – Hinjewadi, Pune

### Premium Real Estate Sales Platform & CRM

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)](LICENSE)

A production-ready, high-converting real estate sales and lead management platform built for **Gera Developments – Hinjewadi, Pune**. Features a luxury dark-theme design system, interactive layouts, secure CRM admin portal, automated WhatsApp alerts, and robust Supabase backend integration.

</div>

---

## ✨ Platform Highlights

### 🏠 High-Converting Landing Page
- **Luxury Aesthetic** — Sophisticated dark navy backdrop, warm metallic gold gradients, sleek borders, and glassmorphism UI layouts
- **Interactive Floor Plans** — Dynamic layout switching with blur-to-unlock overlay requiring enquiry submission
- **Proximity Map** — Distance metrics for Transit, IT Parks, Schools, and Hospitals with interactive vector overlays
- **Premium Showcase** — 8 amenity tiles with hover transformations, project gallery, testimonials, and accordion FAQs

### 📝 Smart Lead Capture
- **Zod + React Hook Form** — Military-grade validation with Indian mobile number verification (`[6-9]` prefix, 10-digit)
- **Canvas Confetti** — Celebration animation on successful submission
- **Animated Thank You** — Checkmark animation with auto-redirect

### 🛡️ Secure CRM Admin Portal
- **Session-Protected** — JWT `httpOnly` cookies with server-side proxy route guards
- **Lead Dashboard** — Metric counters (total, today, weekly, monthly), filtering, search, and CSV export
- **Status Pipeline** — Track leads through: `New → Contacted → Site Visit → Negotiation → Booked / Lost`
- **Agent Management** — Full CRUD for sales agents with active/inactive toggling and lead assignment
- **Follow-Up Logs** — Timestamped activity timeline for every lead interaction

### 🔌 Enterprise Integrations
- **Supabase** — Real-time PostgreSQL with RLS; local CSV fallback for development
- **WhatsApp Alerts** — Twilio-powered instant notifications to sales team
- **SEO** — Dynamic sitemaps, robots directives, meta tags, and Schema.org structured data
- **RERA Compliance** — Legal registration disclosures and marketing disclaimers

---

## 🛠️ Tech Stack

| Layer          | Technology                                    |
|----------------|-----------------------------------------------|
| **Framework**  | Next.js 16 (App Router + Turbopack)           |
| **Styling**    | Tailwind CSS v4 + Tailwind Animate            |
| **Components** | Shadcn UI (Base-UI primitives), Lucide Icons  |
| **Animations** | Framer Motion, Canvas Confetti                |
| **Database**   | Supabase (PostgreSQL) + CSV fallback          |
| **Validation** | Zod + React Hook Form                         |
| **Auth**       | JWT session cookies (`httpOnly`)               |
| **Messaging**  | Twilio WhatsApp Gateway                       |
| **Deployment** | Vercel (automatic CI/CD)                      |

---

## 📂 Project Structure

```
GERA HINJWADI/
├── public/                      # Static assets (images, brochure PDF, floor plans)
├── src/
│   ├── app/
│   │   ├── admin/               # CRM dashboard & login pages
│   │   │   ├── login/page.tsx   # Admin authentication page
│   │   │   └── page.tsx         # Lead management dashboard
│   │   ├── api/
│   │   │   ├── admin/           # Login/logout session handlers
│   │   │   ├── agents/          # Agent CRUD endpoints
│   │   │   │   ├── route.ts     # GET (list) / POST (create)
│   │   │   │   └── [id]/route.ts # PUT (update) / DELETE (remove)
│   │   │   └── leads/           # Lead CRUD endpoints
│   │   │       ├── route.ts     # GET (list) / POST (create)
│   │   │       └── [id]/        # PUT / DELETE + follow-up sub-routes
│   │   ├── thank-you/           # Post-submission success page
│   │   ├── globals.css          # Design tokens, glassmorphism, gold gradients
│   │   ├── layout.tsx           # Root layout + SEO metadata + Schema.org
│   │   ├── page.tsx             # Landing page (48KB of premium UI)
│   │   ├── robots.ts            # Search engine crawling directives
│   │   └── sitemap.ts           # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── Header.tsx           # Responsive glassmorphism navbar + CTA modal
│   │   ├── Footer.tsx           # Legal, RERA, mapping details
│   │   ├── LeadCaptureForm.tsx  # Main lead capture with Zod validation
│   │   └── ui/                  # Shadcn UI primitives
│   ├── lib/
│   │   ├── auth.ts              # JWT token session manager
│   │   ├── leadsStorage.ts      # CSV offline storage with cascading operations
│   │   ├── supabase.ts          # Supabase standard & service_role clients
│   │   ├── utils.ts             # Utility helpers
│   │   └── whatsapp.ts          # Twilio WhatsApp alert dispatcher
│   └── proxy.ts                 # Route guards for /admin paths (Next.js 16)
├── database.sql                 # Complete PostgreSQL schema (agents, leads, follow_ups)
├── .env.example                 # Environment variable template
├── CHANGELOG.md                 # Version history
├── CONTRIBUTING.md              # Contribution guidelines
├── SECURITY.md                  # Security policy
├── LICENSE                      # MIT License
└── package.json                 # Dependencies & scripts
```

---

## 💾 Database Schema

The platform uses **3 tables** with foreign key relationships:

```
┌──────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   agents     │      │      leads       │      │  follow_up_logs  │
├──────────────┤      ├──────────────────┤      ├──────────────────┤
│ id (PK)      │◄─────│ assigned_agent_id│      │ id (PK)          │
│ name         │      │ id (PK)          │◄─────│ lead_id (FK)     │
│ phone        │      │ name             │      │ agent_id (FK) ───┼──► agents.id
│ email        │      │ phone            │      │ status           │
│ active       │      │ email            │      │ notes            │
│ created_at   │      │ budget           │      │ created_at       │
└──────────────┘      │ configuration    │      └──────────────────┘
                      │ status (enum)    │
                      │ notes            │
                      │ site_visit_date  │
                      │ created_at       │
                      └──────────────────┘
```

> Run `database.sql` in your Supabase SQL Editor to initialize all tables, RLS policies, and performance indexes.

---

## ⚙️ Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/manishrai99-afk/Gera-Developments.git
cd Gera-Developments
npm install
```

### 2. Configure Environment

Copy `.env.example` → `.env.local` and fill in your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin Auth
ADMIN_PASSWORD=change_this_in_production
JWT_SECRET=generate_a_secure_random_key_min_32_chars

# WhatsApp Notifications (optional)
SALES_WHATSAPP_TO=+919673000053
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

### 3. Initialize Database

Run the contents of `database.sql` in your [Supabase SQL Editor](https://app.supabase.com/).

### 4. Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Default admin password: `admin1234`.

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 🚀 Deployment

This project is deployed on **Vercel** with automatic CI/CD from the `master` branch.

| Setting              | Value                    |
|----------------------|--------------------------|
| **Framework Preset** | Next.js                  |
| **Build Command**    | `next build`             |
| **Output Directory** | `.next`                  |
| **Node.js Version**  | 18.x                     |

> **Important**: Add all `.env.local` variables to Vercel's **Environment Variables** settings.

---

## 🔒 Security

- **No hardcoded credentials** — All secrets via environment variables
- **Protected routes** — Server-side proxy guards for `/admin`
- **RLS enabled** — Row Level Security on all Supabase tables
- **Input sanitization** — Zod schema validation on all endpoints
- **httpOnly cookies** — JWT tokens never exposed to client JS

See [SECURITY.md](SECURITY.md) for the full security policy.

---

## 📋 API Endpoints

| Method | Endpoint                        | Auth     | Description                |
|--------|---------------------------------|----------|----------------------------|
| POST   | `/api/leads`                    | Public   | Submit new lead            |
| GET    | `/api/leads`                    | Admin    | List all leads             |
| PUT    | `/api/leads/[id]`               | Admin    | Update lead status/notes   |
| DELETE | `/api/leads/[id]`               | Admin    | Delete lead (cascading)    |
| GET    | `/api/leads/[id]/follow-ups`    | Admin    | Get lead follow-up history |
| POST   | `/api/leads/[id]/follow-ups`    | Admin    | Add follow-up entry        |
| GET    | `/api/agents`                   | Admin    | List all agents            |
| POST   | `/api/agents`                   | Admin    | Create new agent           |
| PUT    | `/api/agents/[id]`              | Admin    | Update agent details       |
| DELETE | `/api/agents/[id]`              | Admin    | Delete agent (cascading)   |
| POST   | `/api/admin/login`              | Public   | Admin login                |
| POST   | `/api/admin/logout`             | Admin    | Admin logout               |

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ for Gera Developments – Hinjewadi, Pune**

[Report Bug](https://github.com/manishrai99-afk/Gera-Developments/issues) · [Request Feature](https://github.com/manishrai99-afk/Gera-Developments/issues)

</div>
