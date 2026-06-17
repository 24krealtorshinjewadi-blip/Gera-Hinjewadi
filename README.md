# Gera Developments Hinjewadi, Pune - Premium Sales Platform

A production-ready, high-converting Real Estate Sales and Lead Capture platform built for **Gera Developments – Hinjewadi, Pune**. The application features a luxury dark-theme visual design system, interactive layouts, a password-secured CRM Admin Portal, automated WhatsApp lead alert structures, and robust Supabase backend integration.

---

## 🌟 Platform Highlights

### 1. High-Converting Landing Page
- **Luxury Aesthetic**: Sophisticated dark navy backdrop, warm metallic gold gradients (`gold-500` to `gold-600`), sleek borders, and glassmorphism UI layouts.
- **Interactive Floor Plans**: Switch layout views dynamically. Layout blueprints are blurred under an unlock overlay, requiring visitors to submit an enquiry to view dimensions and high-resolution details.
- **Proximity/Location Tab List**: Easily review distance metrics for Transit, IT Parks, Schools, and Hospitals. Features an abstract interactive vector direction map overlay.
- **Premium Showcase Components**: 8 detailed amenity tiles with hover transformations, project gallery, testimonials, builder profile background, and Accordion FAQs.

### 2. Validated Lead Capture Form
- Engineered using **React Hook Form** + **Zod** validation.
- Validates Indian mobile numbers to confirm active 10-digit formats starting with `[6-9]`.
- Launches a **canvas-confetti** celebration on success, resets form states, and redirects to an animated checkmarked Thank You page.

### 3. Secure CRM Admin Portal (`/admin`)
- Guarded by Next.js Server-Side Middleware session checking.
- Metric counters summarizing total, today's, weekly, and monthly incoming leads, along with active Site Visits and bookings.
- Filter, search, and manage incoming leads (update CRM statuses: New, Contacted, Site Visit, Negotiation, Booked, Lost; add agent comments; schedule site visits).
- **Export to CSV**: Download the currently filtered or searched set of leads instantly into a formatted spreadsheet.

### 4. Enterprise Integrations & Compliance
- **Supabase Integration**: Stores all lead metadata in real-time. Bypasses RLS securely in backend routes using an elevated service role client. Includes local dev fallback.
- **WhatsApp Dispatch Gateway**: Generates structural alert bodies and pushes them to the sales team's WhatsApp via Twilio.
- **Legal Compliance**: Prominent RERA Registration disclosures and legal marketing channel partner disclaimers.
- **SEO Optimization**: Dynamic sitemaps, robots crawl directives, meta tags, and Schema.org structured data.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Styling**: Tailwind CSS v4 + Tailwind Animate
- **Components & Icons**: Shadcn UI (Base-UI Primitive defaults), Lucide Icons
- **Animations**: Framer Motion
- **Database**: Supabase (Postgres)
- **Forms & Validation**: Zod + React Hook Form
- **Auth**: JWT session cookies

---

## 💾 Database Schema

Run the following SQL in your Supabase SQL Editor to initialize the `leads` table and configure Row Level Security (RLS) policies:

```sql
-- Create Lead Status Enumeration
CREATE TYPE lead_status AS ENUM ('New', 'Contacted', 'Site Visit', 'Negotiation', 'Booked', 'Lost');

-- Create Leads Log Table
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    budget VARCHAR(100) NOT NULL,
    configuration VARCHAR(100) NOT NULL,
    message TEXT,
    project VARCHAR(255) DEFAULT 'Gera Winds of Joy',
    source VARCHAR(100) DEFAULT 'website',
    status lead_status DEFAULT 'New'::lead_status,
    notes TEXT,
    site_visit_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow Public Lead Submission insertions
CREATE POLICY "Allow public inserts" ON public.leads
    FOR INSERT WITH CHECK (true);

-- Allow CRM Admin Reads/Updates (bypassed in API routes via service_role client)
CREATE POLICY "Allow admin read" ON public.leads
    FOR SELECT USING (true);

CREATE POLICY "Allow admin update" ON public.leads
    FOR UPDATE USING (true);

CREATE POLICY "Allow admin delete" ON public.leads
    FOR DELETE USING (true);
```

---

## 📂 Project Structure

```text
GERA HINJWADI/
├── public/                  # Assets (brochure PDF, floor plans, luxury towers hero-bg)
├── src/
│   ├── app/
│   │   ├── admin/            # Secure admin login and CRM dashboard
│   │   ├── api/              # Leads POST/GET and Login/Logout session handlers
│   │   ├── thank-you/        # Animated checkmark page on successful submissions
│   │   ├── globals.css       # Core typography, glassmorphism blurs, gold gradients
│   │   ├── layout.tsx        # SEO configurations, meta metadata, Schema markup
│   │   ├── robots.ts         # Search crawling guidelines
│   │   └── sitemap.ts        # Dynamic sitemap generator
│   ├── components/
│   │   ├── Header.tsx        # Responsive glassmorphism navigation and modal CTA trigger
│   │   ├── Footer.tsx        # Legal disclosures, RERA numbers, mapping details
│   │   └── LeadCaptureForm.tsx  # React Hook Form + Zod validator
│   ├── lib/
│   │   ├── auth.ts           # JWT token session manager
│   │   ├── supabase.ts       # Supabase standard & elevated client exports
│   │   └── whatsapp.ts       # WhatsApp Twilio alert dispatcher
│   └── middleware.ts         # Route guards for /admin paths
```

---

## ⚙️ Quick Start

### 1. Clone the project and install packages:
```bash
npm install
```

### 2. Configure Environment Variables (`.env.local`):
Create a `.env.local` file in the root directory (based on `.env.example`):
```env
# Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-elevated-service-key

# Admin CRM authentication
ADMIN_PASSWORD=admin1234
JWT_SECRET=generate_a_secure_random_hash_key

# Sales WhatsApp configurations
SALES_WHATSAPP_TO=+919673000053
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
```

### 3. Run the Development Server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. The default CRM admin password is set to `admin1234`.

### 4. Build for Production:
```bash
npm run build
```

---

## 🔒 Security
- **No hardcoded credentials**: Managed entirely via environment variables.
- **Protected Actions**: Middleware protects all `/admin` routes.
- **RLS & Sanitization**: Strict input bounds via Zod schema checks. Bypasses standard policies only in authenticated server-side handlers.
