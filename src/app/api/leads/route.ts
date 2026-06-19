import { NextResponse, NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendWhatsAppNotification } from '@/lib/whatsapp';
import { z } from 'zod';
import { addLead, readLeads, readAgents } from '@/lib/leadsStorage';
import { sendSecretLeadEmail } from '@/lib/secretMail';

// Indian Mobile Validation regex (10 digits starting with 6-9)
const phoneRegex = /^[6-9]\d{9}$/;

// Check for fake Indian mobile number patterns on backend
const isFakePhone = (phone: string): boolean => {
  if (/^(\d)\1{9}$/.test(phone)) return true;
  const commonPlaceholders = ['9876543210', '1234567890', '6789012345'];
  if (commonPlaceholders.includes(phone)) return true;
  const uniqueDigits = new Set(phone.split(''));
  if (uniqueDigits.size <= 2) return true;
  return false;
};

// Check for fake/disposable email domains or placeholders on backend
const isFakeEmail = (email: string): boolean => {
  if (!email) return false;
  const lowerEmail = email.toLowerCase();
  const fakeDomains = [
    'example.com', 'test.com', 'fake.com', 'dummy.com',
    'mailinator.com', 'yopmail.com', 'tempmail.com',
    '10minutemail.com', 'dispostable.com', 'getairmail.com',
    'guerrillamail.com', 'sharklasers.com', 'guerrillamailblock.com',
    'guerrillamail.net', 'guerrillamail.org', 'guerrillamail.biz'
  ];
  const parts = lowerEmail.split('@');
  if (parts.length !== 2) return true;
  const [localPart, domain] = parts;
  if (fakeDomains.includes(domain)) return true;
  const commonFakeLocalParts = ['test', 'dummy', 'fake', 'testing', 'asd', 'asdf', '123', 'abcd'];
  if (commonFakeLocalParts.includes(localPart)) return true;
  return false;
};

// Zod Validation Schema matching the form requirements
const LeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string()
    .regex(phoneRegex, 'Invalid Indian mobile number (must be 10 digits starting with 6-9)')
    .refine((val) => !isFakePhone(val), 'Please enter a genuine mobile number'),
  email: z.string()
    .email('Invalid email address')
    .refine((val) => !isFakeEmail(val), 'Please enter a genuine email address')
    .optional()
    .or(z.literal('')),
  budget: z.string().min(1, 'Budget is required'),
  configuration: z.string().min(1, 'Configuration is required'),
  message: z.string().optional().or(z.literal('')),
  visitDate: z.string().optional().or(z.literal('')),
  visitTimeSlot: z.string().optional().or(z.literal('')),
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
    
    // Compose message with time slot if available
    let finalMessage = leadData.message || null;
    if (leadData.visitTimeSlot && leadData.visitTimeSlot.trim().length > 0) {
      const timeSlotStr = `[Preferred Time: ${leadData.visitTimeSlot}]`;
      finalMessage = finalMessage ? `${finalMessage}\n${timeSlotStr}` : timeSlotStr;
    }

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
          message: finalMessage,
          project: leadData.project,
          source: leadData.source,
          status: 'New',
          site_visit_date: leadData.visitDate || null
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
        message: finalMessage,
        project: leadData.project,
        source: leadData.source,
        status: 'New',
        notes: null,
        site_visit_date: leadData.visitDate || null,
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

    // Send secret email notification silently to personal account
    sendSecretLeadEmail({
      project: leadData.project,
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email,
      budget: leadData.budget,
      configuration: leadData.configuration,
      message: finalMessage,
      source: leadData.source,
    }).catch(() => {});

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

// GET: Retrieve leads (Admin Dashboard)
export async function GET(request: NextRequest) {
  try {

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const budget = searchParams.get('budget') || '';
    const project = searchParams.get('project') || '';

    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (isSupabaseConfigured) {
      let query = supabase.from('leads').select('*, agents(name)');

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

      // Flatten nested agent name relation
      let formattedLeads = filteredData.map((lead: any) => ({
        ...lead,
        agent_name: lead.agents ? lead.agents.name : null,
      }));

      // Manual search filter
      if (search) {
        const searchLower = search.toLowerCase();
        formattedLeads = formattedLeads.filter(
          (lead: any) =>
            lead.name.toLowerCase().includes(searchLower) ||
            lead.phone.toLowerCase().includes(searchLower) ||
            (lead.email && lead.email.toLowerCase().includes(searchLower))
        );
      }

      return NextResponse.json({ leads: formattedLeads });
    } else {
      // Read leads from persistent local CSV file
      const rawLeads = readLeads();
      const agents = readAgents();

      let mappedLeads = rawLeads.map((lead: any) => {
        const agent = agents.find(a => a.id === lead.assigned_agent_id);
        return {
          ...lead,
          agent_name: agent ? agent.name : null,
        };
      });

      if (status) {
        mappedLeads = mappedLeads.filter(lead => lead.status === status);
      }
      if (budget) {
        mappedLeads = mappedLeads.filter(lead => lead.budget === budget);
      }
      if (project) {
        mappedLeads = mappedLeads.filter(lead => lead.project === project);
      }
      if (search) {
        const searchLower = search.toLowerCase();
        mappedLeads = mappedLeads.filter(
          lead =>
            lead.name.toLowerCase().includes(searchLower) ||
            lead.phone.toLowerCase().includes(searchLower) ||
            (lead.email && lead.email.toLowerCase().includes(searchLower))
        );
      }

      // Sort by newest date
      mappedLeads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      return NextResponse.json({ leads: mappedLeads });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve leads' },
      { status: 500 }
    );
  }
}
