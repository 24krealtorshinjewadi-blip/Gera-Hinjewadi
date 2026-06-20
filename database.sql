-- ==========================================
-- GERA HINJWADI – COMPLETE DATABASE SCHEMA
-- Target: PostgreSQL 15+ / Supabase
-- Version: 2.0.0
-- ==========================================

-- ==========================================
-- 1. ENUMERATIONS
-- ==========================================

CREATE TYPE lead_status AS ENUM (
  'New',
  'Contacted',
  'Site Visit',
  'Negotiation',
  'Booked',
  'Lost'
);

-- ==========================================
-- 2. SALES AGENTS TABLE
-- ==========================================

CREATE TABLE public.agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Agents RLS
-- SECURITY NOTE: This application does not use Supabase Auth for dashboard administrators.
-- Dashboard queries are performed server-side using the `supabaseAdmin` service role client, which bypasses RLS.
-- Therefore, the "authenticated" policies below prevent any external users (who may sign up using public Supabase Auth)
-- from accessing agent data, while still documenting the schema intent. Do NOT change "authenticated" to "public".
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated read agents"   ON public.agents FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert agents" ON public.agents FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update agents" ON public.agents FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete agents" ON public.agents FOR DELETE TO authenticated USING (true);

-- ==========================================
-- 3. LEADS REGISTRY TABLE
-- ==========================================

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
    assigned_agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Leads RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert leads"         ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read leads"   ON public.leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated update leads" ON public.leads FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete leads" ON public.leads FOR DELETE TO authenticated USING (true);

-- ==========================================
-- 4. FOLLOW-UP ACTIVITY LOG
-- ==========================================

CREATE TABLE public.follow_up_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
    status lead_status NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Follow-Up Logs RLS
ALTER TABLE public.follow_up_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated read follow_ups"   ON public.follow_up_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated insert follow_ups" ON public.follow_up_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated delete follow_ups" ON public.follow_up_logs FOR DELETE TO authenticated USING (true);

-- ==========================================
-- 5. PERFORMANCE INDEXES
-- ==========================================

CREATE INDEX idx_leads_status          ON public.leads(status);
CREATE INDEX idx_leads_created_at      ON public.leads(created_at DESC);
CREATE INDEX idx_leads_project         ON public.leads(project);
CREATE INDEX idx_leads_assigned_agent  ON public.leads(assigned_agent_id);
CREATE INDEX idx_follow_ups_lead_id    ON public.follow_up_logs(lead_id);
CREATE INDEX idx_follow_ups_agent_id   ON public.follow_up_logs(agent_id);
CREATE INDEX idx_follow_ups_created_at ON public.follow_up_logs(created_at DESC);
CREATE INDEX idx_agents_active         ON public.agents(active);
