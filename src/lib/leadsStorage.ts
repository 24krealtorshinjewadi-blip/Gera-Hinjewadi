import fs from 'fs';
import path from 'path';
import os from 'os';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  budget: string;
  configuration: string;
  message: string | null;
  project: string;
  source: string;
  status: 'New' | 'Contacted' | 'Site Visit' | 'Negotiation' | 'Booked' | 'Lost';
  notes: string | null;
  site_visit_date: string | null;
  created_at: string;
  assigned_agent_id?: string | null;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  active: boolean;
  created_at: string;
}

export interface FollowUpLog {
  id: string;
  lead_id: string;
  agent_id: string | null;
  status: 'New' | 'Contacted' | 'Site Visit' | 'Negotiation' | 'Booked' | 'Lost';
  notes: string;
  created_at: string;
}

// Determine writable path: use /tmp on Vercel, otherwise current directory
const basePath = process.env.VERCEL ? os.tmpdir() : process.cwd();

const CSV_FILE_PATH = path.join(basePath, 'leads.csv');
const AGENTS_FILE_PATH = path.join(basePath, 'agents.csv');
const FOLLOW_UPS_FILE_PATH = path.join(basePath, 'follow_ups.csv');

// Default initial mock data
const defaultLeads: Lead[] = [];

// Helper to escape values for CSV correctly
function escapeCsv(val: any): string {
  if (val === null || val === undefined) return '';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Helper to parse CSV rows correctly handling quoted fields
function parseCsvRow(row: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    if (char === '"') {
      if (inQuotes && row[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

export function readLeads(): Lead[] {
  try {
    if (!fs.existsSync(CSV_FILE_PATH)) {
      writeLeads(defaultLeads);
      return defaultLeads;
    }
    const fileData = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
    const lines = fileData.split('\n').filter(line => line.trim().length > 0);
    if (lines.length <= 1) return [];
    
    const leads: Lead[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = parseCsvRow(lines[i]);
      if (values.length < 13) continue;
      leads.push({
        id: values[0],
        name: values[1],
        phone: values[2],
        email: values[3] || null,
        budget: values[4],
        configuration: values[5],
        message: values[6] || null,
        project: values[7],
        source: values[8],
        status: values[9] as any,
        notes: values[10] || null,
        site_visit_date: values[11] || null,
        created_at: values[12],
        assigned_agent_id: values[13] || null,
      });
    }
    return leads;
  } catch (error) {
    console.error('Error reading from local leads CSV:', error);
    return defaultLeads;
  }
}

export function writeLeads(leads: Lead[]) {
  try {
    const headers = 'ID,Name,Phone,Email,Budget,Configuration,Message,Project,Source,Status,Notes,Site Visit Date,Created At,Assigned Agent ID';
    const rows = leads.map(l => [
      l.id,
      escapeCsv(l.name),
      escapeCsv(l.phone),
      escapeCsv(l.email),
      escapeCsv(l.budget),
      escapeCsv(l.configuration),
      escapeCsv(l.message),
      escapeCsv(l.project),
      escapeCsv(l.source),
      escapeCsv(l.status),
      escapeCsv(l.notes),
      escapeCsv(l.site_visit_date),
      escapeCsv(l.created_at),
      escapeCsv(l.assigned_agent_id),
    ].join(','));
    
    fs.writeFileSync(CSV_FILE_PATH, [headers, ...rows].join('\n'), 'utf-8');
  } catch (error) {
    console.error('Error writing to local leads CSV:', error);
  }
}

export function addLead(lead: Lead) {
  const leads = readLeads();
  leads.unshift(lead); // add to top of CSV
  writeLeads(leads);
}

export function updateLead(id: string, updates: Partial<Lead>): Lead | null {
  const leads = readLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index === -1) return null;
  
  leads[index] = { ...leads[index], ...updates };
  writeLeads(leads);
  return leads[index];
}

export function deleteLead(id: string): boolean {
  const leads = readLeads();
  const filtered = leads.filter(l => l.id !== id);
  if (leads.length === filtered.length) return false;
  
  writeLeads(filtered);

  // Cascade: Delete associated follow-up logs offline
  try {
    const followUps = readFollowUps();
    const filteredFollowUps = followUps.filter(f => f.lead_id !== id);
    if (followUps.length !== filteredFollowUps.length) {
      writeFollowUps(filteredFollowUps);
    }
  } catch (err) {
    console.error('Failed to delete associated follow-up logs offline:', err);
  }

  return true;
}

// ==========================================
// AGENTS OFFLINE MANAGEMENT (CSV)
// ==========================================

export function readAgents(): Agent[] {
  try {
    if (!fs.existsSync(AGENTS_FILE_PATH)) {
      return [];
    }
    const fileData = fs.readFileSync(AGENTS_FILE_PATH, 'utf-8');
    const lines = fileData.split('\n').filter(line => line.trim().length > 0);
    if (lines.length <= 1) return [];
    
    const agents: Agent[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = parseCsvRow(lines[i]);
      if (values.length < 6) continue;
      agents.push({
        id: values[0],
        name: values[1],
        phone: values[2],
        email: values[3] || null,
        active: values[4] === 'true',
        created_at: values[5],
      });
    }
    return agents;
  } catch (error) {
    console.error('Error reading from local agents CSV:', error);
    return [];
  }
}

export function writeAgents(agents: Agent[]) {
  try {
    const headers = 'ID,Name,Phone,Email,Active,Created At';
    const rows = agents.map(a => [
      a.id,
      escapeCsv(a.name),
      escapeCsv(a.phone),
      escapeCsv(a.email),
      a.active ? 'true' : 'false',
      escapeCsv(a.created_at),
    ].join(','));
    
    fs.writeFileSync(AGENTS_FILE_PATH, [headers, ...rows].join('\n'), 'utf-8');
  } catch (error) {
    console.error('Error writing to local agents CSV:', error);
  }
}

export function addAgent(agent: Agent) {
  const agents = readAgents();
  agents.push(agent);
  writeAgents(agents);
}

export function updateAgent(id: string, updates: Partial<Agent>): Agent | null {
  const agents = readAgents();
  const index = agents.findIndex(a => a.id === id);
  if (index === -1) return null;
  
  agents[index] = { ...agents[index], ...updates };
  writeAgents(agents);
  return agents[index];
}

export function deleteAgent(id: string): boolean {
  const agents = readAgents();
  const filtered = agents.filter(a => a.id !== id);
  if (agents.length === filtered.length) return false;
  
  writeAgents(filtered);

  // Cascade: Unassign this agent from all leads offline
  try {
    const leads = readLeads();
    let leadsUpdated = false;
    const updatedLeads = leads.map(l => {
      if (l.assigned_agent_id === id) {
        leadsUpdated = true;
        return { ...l, assigned_agent_id: null };
      }
      return l;
    });
    if (leadsUpdated) {
      writeLeads(updatedLeads);
    }
  } catch (err) {
    console.error('Failed to unassign agent from leads offline:', err);
  }

  // Cascade: Unassign this agent from all follow-up logs offline
  try {
    const followUps = readFollowUps();
    let followUpsUpdated = false;
    const updatedFollowUps = followUps.map(f => {
      if (f.agent_id === id) {
        followUpsUpdated = true;
        return { ...f, agent_id: null };
      }
      return f;
    });
    if (followUpsUpdated) {
      writeFollowUps(updatedFollowUps);
    }
  } catch (err) {
    console.error('Failed to unassign agent from follow-up logs offline:', err);
  }

  return true;
}

// ==========================================
// FOLLOW-UP LOGS OFFLINE MANAGEMENT (CSV)
// ==========================================

export function readFollowUps(): FollowUpLog[] {
  try {
    if (!fs.existsSync(FOLLOW_UPS_FILE_PATH)) {
      return [];
    }
    const fileData = fs.readFileSync(FOLLOW_UPS_FILE_PATH, 'utf-8');
    const lines = fileData.split('\n').filter(line => line.trim().length > 0);
    if (lines.length <= 1) return [];
    
    const logs: FollowUpLog[] = [];
    for (let i = 1; i < lines.length; i++) {
      const values = parseCsvRow(lines[i]);
      if (values.length < 6) continue;
      logs.push({
        id: values[0],
        lead_id: values[1],
        agent_id: values[2] || null,
        status: values[3] as any,
        notes: values[4],
        created_at: values[5],
      });
    }
    return logs;
  } catch (error) {
    console.error('Error reading from local follow_ups CSV:', error);
    return [];
  }
}

export function writeFollowUps(logs: FollowUpLog[]) {
  try {
    const headers = 'ID,Lead ID,Agent ID,Status,Notes,Created At';
    const rows = logs.map(l => [
      l.id,
      l.lead_id,
      escapeCsv(l.agent_id),
      escapeCsv(l.status),
      escapeCsv(l.notes),
      escapeCsv(l.created_at),
    ].join(','));
    
    fs.writeFileSync(FOLLOW_UPS_FILE_PATH, [headers, ...rows].join('\n'), 'utf-8');
  } catch (error) {
    console.error('Error writing to local follow_ups CSV:', error);
  }
}

export function addFollowUp(log: FollowUpLog) {
  const logs = readFollowUps();
  logs.push(log);
  writeFollowUps(logs);
}

