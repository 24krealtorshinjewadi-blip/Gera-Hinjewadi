-- ==========================================
-- GERA HINJWADI LEAD DATABASE SCHEMA
-- Target Database: PostgreSQL / Supabase
-- ==========================================

-- 1. Create Enumeration for Lead Workflow Status
CREATE TYPE lead_status AS ENUM ('New', 'Contacted', 'Site Visit', 'Negotiation', 'Booked', 'Lost');

-- 2. Create Leads Registry Table
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

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 4. Create Security Access Policies
-- Allow public visitors to insert records via landing page capture form
CREATE POLICY "Allow public inserts" ON public.leads
    FOR INSERT WITH CHECK (true);

-- Allow CRM Admin Reads (managed securely in API routes via server-side service role client)
CREATE POLICY "Allow admin read" ON public.leads
    FOR SELECT USING (true);

-- Allow CRM Admin Status & Notes Updates
CREATE POLICY "Allow admin update" ON public.leads
    FOR UPDATE USING (true);

-- Allow CRM Admin Lead Deletion
CREATE POLICY "Allow admin delete" ON public.leads
    FOR DELETE USING (true);

-- 5. Create Indexes for Common Query Filters (Performance Optimization)
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_project ON public.leads(project);
