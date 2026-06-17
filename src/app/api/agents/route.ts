import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { addAgent, readAgents } from '@/lib/leadsStorage';

// GET: Retrieve list of active agents (Admin Secure)
export async function GET(request: NextRequest) {
  try {
    const session = getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (isSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('agents')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Supabase fetch agents error:', error);
        throw error;
      }
      return NextResponse.json({ agents: data || [] });
    } else {
      // Offline fallback
      const agents = readAgents();
      // Sort alphabetically
      agents.sort((a, b) => a.name.localeCompare(b.name));
      return NextResponse.json({ agents });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve agents' },
      { status: 500 }
    );
  }
}

// POST: Register a new agent (Admin Secure)
export async function POST(request: NextRequest) {
  try {
    const session = getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, phone, email } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and Phone are required' }, { status: 400 });
    }

    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    let agentResult: any = null;

    if (isSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('agents')
        .insert([{
          name,
          phone,
          email: email || null,
          active: true
        }])
        .select();

      if (error) {
        console.error('Supabase insert agent error:', error);
        throw error;
      }
      agentResult = data?.[0];
    } else {
      // Offline fallback
      agentResult = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        phone,
        email: email || null,
        active: true,
        created_at: new Date().toISOString()
      };
    }

    // Sync to local CSV
    try {
      addAgent(agentResult);
    } catch (err) {
      console.error('Failed to save agent to local CSV:', err);
    }

    return NextResponse.json({ success: true, agent: agentResult }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error creating agent' },
      { status: 500 }
    );
  }
}
