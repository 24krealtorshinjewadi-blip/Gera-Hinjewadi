import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { sendWhatsAppNotification } from '@/lib/whatsapp';
import { z } from 'zod';
import { addLead, readLeads } from '@/lib/leadsStorage';

// Zod Validation Schema matching the form requirements
const LeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number (must be 10 digits starting with 6-9)'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  budget: z.string().min(1, 'Budget is required'),
  configuration: z.string().min(1, 'Configuration is required'),
  message: z.string().optional().or(z.literal('')),
  project: z.string().default('Gera Winds of Joy'),
  source: z.string().default('website'),
});

// Server-side in-memory store for testing without database connection
// Declared as global so it survives hot-reloads during local dev sessions
declare global {
  var mockLeads: any[];
}
if (!global.mockLeads) {
  global.mockLeads = [];
}

// POST: Create a lead (Public)
export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    
    // Validate request body
    const validationResult = LeadSchema.safeParse(rawBody);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }

    const leadData = validationResult.data;

    // Check if Supabase is properly configured
    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    let dbResult: any = null;

    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          name: leadData.name,
          phone: leadData.phone,
          email: leadData.email || null,
          budget: leadData.budget,
          configuration: leadData.configuration,
          message: leadData.message || null,
          project: leadData.project,
          source: leadData.source,
          status: 'New'
        }])
        .select();

      if (error) {
        console.error('Supabase insert error:', error);
        throw error;
      }
      dbResult = data?.[0];
    } else {
      // In-memory fallback structure for local dev
      dbResult = {
        id: Math.random().toString(36).substring(2, 9),
        name: leadData.name,
        phone: leadData.phone,
        email: leadData.email || null,
        budget: leadData.budget,
        configuration: leadData.configuration,
        message: leadData.message || null,
        project: leadData.project,
        source: leadData.source,
        status: 'New',
        notes: null,
        site_visit_date: null,
        created_at: new Date().toISOString(),
      };
    }

    // Save lead record copy locally to CSV (Excel format)
    try {
      addLead(dbResult);
    } catch (err) {
      console.error('Failed to save lead record copy to local CSV:', err);
    }

    // Trigger WhatsApp notification asynchronously (non-blocking to user response)
    sendWhatsAppNotification({
      project: leadData.project,
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email || undefined,
      budget: leadData.budget,
      configuration: leadData.configuration,
    }).catch(err => {
      console.error('Failed to trigger WhatsApp notify job:', err);
    });

    return NextResponse.json(
      { success: true, lead: dbResult, message: 'Enquiry submitted successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error occurred saving lead' },
      { status: 500 }
    );
  }
}

// GET: Retrieve leads (Admin Dashboard - Secure)
export async function GET(request: NextRequest) {
  try {
    // Authenticate admin session
    const session = getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const budget = searchParams.get('budget') || '';
    const project = searchParams.get('project') || '';

    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (isSupabaseConfigured) {
      let query = supabase.from('leads').select('*');

      // Filters
      if (status) {
        query = query.eq('status', status);
      }
      if (budget) {
        query = query.eq('budget', budget);
      }
      if (project) {
        query = query.eq('project', project);
      }
      
      // Order by latest
      query = query.order('created_at', { ascending: false });

      const { data, error } = await query;
      if (error) throw error;

      let filteredData = data || [];

      // Manual search filter since Supabase OR query syntax for text search can be complex
      if (search) {
        const searchLower = search.toLowerCase();
        filteredData = filteredData.filter(
          (lead: any) =>
            lead.name.toLowerCase().includes(searchLower) ||
            lead.phone.toLowerCase().includes(searchLower) ||
            (lead.email && lead.email.toLowerCase().includes(searchLower))
        );
      }

      return NextResponse.json({ leads: filteredData });
    } else {
      // Read leads from persistent local CSV file
      let filteredData = readLeads();

      if (status) {
        filteredData = filteredData.filter(lead => lead.status === status);
      }
      if (budget) {
        filteredData = filteredData.filter(lead => lead.budget === budget);
      }
      if (project) {
        filteredData = filteredData.filter(lead => lead.project === project);
      }
      if (search) {
        const searchLower = search.toLowerCase();
        filteredData = filteredData.filter(
          lead =>
            lead.name.toLowerCase().includes(searchLower) ||
            lead.phone.toLowerCase().includes(searchLower) ||
            (lead.email && lead.email.toLowerCase().includes(searchLower))
        );
      }

      // Sort by newest date
      filteredData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      return NextResponse.json({ leads: filteredData });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve leads' },
      { status: 500 }
    );
  }
}
