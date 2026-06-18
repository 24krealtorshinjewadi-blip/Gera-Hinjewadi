# Changelog

All notable changes to the **Gera Developments – Hinjewadi Sales Platform** are documented here.

This project follows [Semantic Versioning](https://semver.org/).

---

## [2.0.0] – 2026-06-18

### Added
- **Sales Agent Management** — Full CRUD for sales agents with active/inactive status toggling.
- **Lead Assignment** — Assign leads to specific agents via the CRM dashboard dropdown.
- **Follow-Up Activity Logs** — Timestamped history timeline for every lead interaction.
- **Cascading Deletes** — Deleting an agent safely unassigns leads and cleans up follow-up logs (both Supabase & offline CSV).
- **Cascading Lead Deletion** — Deleting a lead removes all associated follow-up entries.
- **Database Schema v2** — Added `agents` and `follow_up_logs` tables with foreign key constraints.
- **Professional Repo Files** — Added `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE`, `CHANGELOG.md`.

### Changed
- **Middleware → Proxy Migration** — Migrated from deprecated `middleware.ts` to Next.js 16 `proxy.ts` convention.
- **Admin Agent Dropdown** — Now correctly displays previously assigned agents even if currently inactive.
- **README.md** — Comprehensive update reflecting all v2.0 features and architecture.

### Fixed
- **Critical Data Corruption Bug** — `deleteAgent()` was incorrectly overwriting `leads.csv`; fixed to only write `agents.csv`.
- **PostgreSQL Foreign Key Violations** — API routes now handle cascading cleanup before deleting agents/leads from database.

---

## [1.1.0] – 2026-06-17

### Added
- **Persistent CSV Fallback** — Local `leads.csv` file-based storage for development without Supabase.
- **Project Documentation CSV** — `project_documentation.csv` detailing complete file inventory.

### Changed
- **Clean Data Start** — Cleared mock data from leads storage for production readiness.

---

## [1.0.0] – 2026-06-17

### Added
- **Premium Landing Page** — Luxury dark-theme design with gold gradients, glassmorphism, and Framer Motion animations.
- **Lead Capture Form** — React Hook Form + Zod validation with Indian mobile number validation.
- **Canvas Confetti** — Celebration animation on successful lead submission.
- **Thank You Page** — Animated checkmark redirect after form submission.
- **CRM Admin Portal** — Password-secured dashboard with lead management, filtering, search, and CSV export.
- **Supabase Integration** — Real-time PostgreSQL backend with Row Level Security.
- **WhatsApp Alerts** — Twilio-powered WhatsApp notifications to sales team.
- **SEO Optimization** — Dynamic sitemap, robots.txt, meta tags, and Schema.org structured data.
- **Legal Compliance** — RERA registration disclosures and marketing disclaimers.
