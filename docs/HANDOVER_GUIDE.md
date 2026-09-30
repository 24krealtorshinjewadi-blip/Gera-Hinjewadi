# 📘 Project Handover & Technical Transition Guide

**Project:** Gera Developments – Hinjewadi, Pune (Sales Platform & CRM)  
**Version:** `v2.0.0` (Production Gold Release)  
**Target Recipient:** 24k Realtors Hinjewadi / Gera Developments Technical Team  
**Handover Organization:** Antigravity Engineering & QA Team  
**Delivery Date:** September 30, 2026  
**Live Production URL:** [https://www.gerahinjewadi.com](https://www.gerahinjewadi.com)  
**Handover Repository:** [24krealtorshinjewadi-blip/Gera-Hinjewadi](https://github.com/24krealtorshinjewadi-blip/Gera-Hinjewadi)

---

## 1. 🤝 Official Handover Statement

This technical transition guide outlines the architectural, deployment, security, and administrative instructions for the **Gera Developments – Hinjewadi** sales platform and CRM system. The solution has been delivered complete with all source code, design assets, database schemas, automated notification gateways, and administrative interfaces.

All components have been tested, audited, and verified ready for production operation by **24k Realtors Hinjewadi**.

---

## 2. 📦 Deliverables Inventory

| Deliverable | Location | Description |
| :--- | :--- | :--- |
| **Complete Source Code** | Root repository | Full Next.js 16 App Router application with Turbopack build |
| **Frontend Platform** | `src/app/` | Luxury landing page, floor plans, gallery, proximity locator |
| **CRM Admin Portal** | `src/app/admin/` | Lead pipeline, agent directory, follow-up timeline, CSV export |
| **REST API Engine** | `src/app/api/` | Secure serverless endpoints for leads, agents, and auth |
| **Database Schema** | `database.sql` | Production-ready Supabase PostgreSQL schema with RLS & indexes |
| **Offline CSV Engine** | `src/lib/leadsStorage.ts` | Resilient offline filesystem fallback for zero data loss |
| **WhatsApp Gateway** | `src/lib/whatsapp.ts` | Automated sales desk notifications via Twilio API |
| **Master QA Test Report** | `docs/MASTER_QA_TEST_REPORT.md`| 45 verified test scenarios with 100% pass certification |
| **Mobile Testing Matrix** | `docs/MOBILE_TESTING_MATRIX.md` | Verification across 14 iOS & Android screen viewports |
| **Issue Reporting Guide** | `docs/ISSUE_REPORTING_GUIDE.md` | Enterprise bug submission & SLA triage protocol |
| **Git Flow Strategy** | `docs/git-flow-workflow.md` | Standardized development branching lifecycle |

---

## 3. 🏗️ High-Level System Architecture

```
                                  ┌───────────────────────────────┐
                                  │      Client Web Browsers      │
                                  │   (Desktop / Mobile / Tablet) │
                                  └──────────────┬────────────────┘
                                                 │ HTTPS
                                                 ▼
                                  ┌───────────────────────────────┐
                                  │        Vercel Edge CDN        │
                                  │  (gerahinjewadi.com + SSL)    │
                                  └──────────────┬────────────────┘
                                                 │
                                                 ▼
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Next.js 16 Production Application Server (Node.js runtime / Turbopack)                         │
│                                                                                                │
│  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌────────────────────────────────┐  │
│  │   Landing Page UI (/)   │  │   Admin Portal (/admin) │  │ Serverless API Layer (/api/*)  │  │
│  │  - Luxury Gold Aesthetic│  │  - Route Guard Proxy    │  │  - /api/leads                  │  │
│  │  - Zod Validation Forms │  │  - JWT httpOnly Session │  │  - /api/agents                 │  │
│  │  - Floor Plans & Video  │  │  - Lead Pipeline & CRUD │  │  - /api/admin/login            │  │
│  └─────────────────────────┘  └─────────────────────────┘  └───────────────┬────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┼───────────────────┘
                                                                             │
                                                     ┌───────────────────────┴──────────────────────┐
                                                     ▼                                              ▼
                                      ┌─────────────────────────────┐                ┌─────────────────────────────┐
                                      │   PRIMARY: Supabase Cloud   │                │   FALLBACK: Local CSV Store │
                                      │   PostgreSQL 15 (with RLS)  │                │   - leads.csv               │
                                      │   - leads table             │   Fallback     │   - agents.csv              │
                                      │   - agents table            │ ─────────────► │   - follow_ups.csv          │
                                      │   - follow_ups table        │  (if offline)  │   (Full cascading integrity)│
                                      └─────────────────────────────┘                └─────────────────────────────┘
                                                     │
                                                     ▼
                                      ┌─────────────────────────────┐
                                      │ Twilio WhatsApp Gateway API │
                                      │  (Lead alerts to sales desk)│
                                      │  Target: +91 96730 00053    │
                                      └─────────────────────────────┘
```

---

## 4. ⚙️ Environment Configuration (`.env`)

To run the application, configure a `.env.local` file in the project root based on `.env.example`:

```bash
# ========================================================
# Gera Hinjewadi – Environment Configuration Guide
# ========================================================

# ---------- Supabase Cloud PostgreSQL ----------
# Found in Supabase Project Settings -> API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ---------- Admin Portal Authentication ----------
# Strong password for CRM access (/admin/login)
ADMIN_PASSWORD=admin1234

# Random 32+ character string for signing JWT session cookies
JWT_SECRET=super_secret_jwt_signing_key_change_me_in_production

# ---------- WhatsApp Lead Dispatch (Twilio) ----------
# Sales representative's WhatsApp number receiving lead alerts
SALES_WHATSAPP_TO=+919673000053

# Twilio API credentials (Optional in local dev; needed for live WhatsApp dispatch)
TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

> [!IMPORTANT]  
> The `.env.local` file is excluded from Git via `.gitignore` to prevent credential exposure. In production on Vercel, populate these values in **Vercel Dashboard → Project Settings → Environment Variables**.

---

## 5. 🚀 Local Development & Build Runbook

### Prerequisites
- **Node.js**: `v20.12.0 LTS` or higher
- **npm**: `v10.x` or higher
- **Git**: Installed and configured

### Step-by-Step Setup
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/24krealtorshinjewadi-blip/Gera-Hinjewadi.git
   cd Gera-Hinjewadi
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   ```bash
   cp .env.example .env.local
   # Update .env.local with your real or staging credentials
   ```

4. **Run Production Build:**
   ```bash
   npm run build
   ```

5. **Start Production Server:**
   ```bash
   npm start
   # Server launches at http://localhost:3000
   ```

---

## 6. 🗄️ Database Architecture & Setup

The database schema is defined in [`database.sql`](file:///F:/Gera-Developments/database.sql).

### Provisioning in Supabase
1. Create a new project in [Supabase Console](https://supabase.com/).
2. Open the **SQL Editor** tab from the left navigation.
3. Paste the contents of `database.sql` and click **Run**.
4. The script will automatically create:
   - `leads` table with indexes on `created_at`, `status`, `agent_id`, and `phone`.
   - `agents` table with active status flags and unique email constraints.
   - `follow_ups` table with relational foreign keys to `leads` and `agents`.
   - Row Level Security (RLS) policies allowing public insertions and service-role administration.

### Dual-Layer Offline CSV Fallback
If Supabase is unreachable or credentials are not yet provisioned, the application automatically invokes `src/lib/leadsStorage.ts`:
- **Zero Interruption:** Users can still submit leads without encountering 500 errors.
- **Relational Parity:** Implements full cascading logic (deleting an agent re-assigns leads to unassigned and clears orphan follow-up notes).
- **Audit Logs:** Data is written to `leads.csv`, `agents.csv`, and `follow_ups.csv` locally.

---

## 7. 🛡️ Admin CRM Portal Operations

### Accessing the Portal
- **URL:** `https://www.gerahinjewadi.com/admin/login`
- **Default Password:** Set via `ADMIN_PASSWORD` (default: `admin1234`)
- **Session Duration:** 7 days (secured via `httpOnly`, `SameSite=Strict` cookie)

### Key Workflows
1. **Lead Status Progression:**
   Move leads through the sales pipeline:
   $$\text{New} \longrightarrow \text{Contacted} \longrightarrow \text{Site Visit} \longrightarrow \text{Negotiation} \longrightarrow \text{Booked / Lost}$$
2. **Assigning Agents:**
   Select a lead and choose an active sales representative from the dropdown.
3. **Adding Follow-up Notes:**
   Click on any lead row to view the interaction timeline and log customer remarks (e.g., "Interested in 3 BHK with East-facing balcony").
4. **Exporting Data:**
   Click the **"Export CSV"** button in the dashboard to download an up-to-the-minute spreadsheet of all captured leads.

---

## 8. 🌐 Production Deployment Guide (Vercel)

The platform is optimized for zero-configuration deployment on **Vercel**:

1. **Connect GitHub Repository:**
   - Log into [Vercel](https://vercel.com/) with company account.
   - Click **"Add New Project"** → Import `24krealtorshinjewadi-blip/Gera-Hinjewadi`.

2. **Configure Build Settings:**
   - **Framework Preset:** Next.js
   - **Build Command:** `next build`
   - **Output Directory:** `.next`
   - **Install Command:** `npm install`

3. **Set Production Environment Variables:**
   - Add all keys from Section 4 (`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `JWT_SECRET`, etc.).

4. **Custom Domain Setup:**
   - Navigate to **Project Settings → Domains**.
   - Add `www.gerahinjewadi.com` and `gerahinjewadi.com`.
   - Configure DNS records with domain registrar:
     - **A Record:** `@` points to `76.76.21.21`
     - **CNAME:** `www` points to `cname.vercel-dns.com`
   - Vercel will provision an SSL certificate automatically via Let's Encrypt.

---

## 9. 📞 Support, Warranty & Escalation

### Handover Warranty Period
- **Duration:** 30 Days post-handover (until October 30, 2026)
- **Coverage:** Bug fixes, deployment assistance, DNS configuration, and administrative guidance.

### Contact Points
- **Technical Lead:** Manish Rai
- **Email:** `manishrajapakar@gmail.com`
- **Phone / WhatsApp:** `+91 96730 00053`
- **Target Company:** 24k Realtors Hinjewadi
