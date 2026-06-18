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
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read agents"  ON public.agents FOR SELECT USING (true);
CREATE POLICY "Allow admin insert agents" ON public.agents FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin update agents" ON public.agents FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete agents" ON public.agents FOR DELETE USING (true);

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

CREATE POLICY "Allow public inserts" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin read"    ON public.leads FOR SELECT USING (true);
CREATE POLICY "Allow admin update"  ON public.leads FOR UPDATE USING (true);
CREATE POLICY "Allow admin delete"  ON public.leads FOR DELETE USING (true);

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

CREATE POLICY "Allow admin read follow_ups"   ON public.follow_up_logs FOR SELECT USING (true);
CREATE POLICY "Allow admin insert follow_ups" ON public.follow_up_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin delete follow_ups" ON public.follow_up_logs FOR DELETE USING (true);

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
