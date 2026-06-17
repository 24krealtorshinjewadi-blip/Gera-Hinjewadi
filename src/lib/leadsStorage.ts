import fs from 'fs';
import path from 'path';

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
}

const CSV_FILE_PATH = path.join(process.cwd(), 'leads.csv');

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
    const headers = 'ID,Name,Phone,Email,Budget,Configuration,Message,Project,Source,Status,Notes,Site Visit Date,Created At';
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
      escapeCsv(l.created_at)
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
  return true;
}
