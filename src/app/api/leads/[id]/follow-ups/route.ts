/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { addFollowUp, readFollowUps } from '@/lib/leadsStorage';

type RouteContext = { params: Promise<{ id: string }> };

// GET: Retrieve follow-up timeline for a specific lead (Admin Dashboard)
export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { id: leadId } = await context.params;
    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (isSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('follow_up_logs')
        .select(`
          id,
          lead_id,
          agent_id,
          status,
          notes,
          created_at,
          agents (name)
        `)
        .eq('lead_id', leadId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase fetch follow-ups error:', error);
        throw error;
      }
      
      // Flatten the agent name relation to match structure
      const formattedLogs = (data || []).map((log: any) => ({
        id: log.id,
        lead_id: log.lead_id,
        agent_id: log.agent_id,
        agent_name: log.agents ? log.agents.name : null,
        status: log.status,
        notes: log.notes,
        created_at: log.created_at,
      }));

      return NextResponse.json({ logs: formattedLogs });
    } else {
      // Offline fallback
      const allLogs = readFollowUps();
      const leadLogs = allLogs.filter(log => log.lead_id === leadId);
      
      // Sort newest first
      leadLogs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      
      return NextResponse.json({ logs: leadLogs });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve follow-up timeline' },
      { status: 500 }
    );
  }
}

// POST: Add a new follow-up log (Admin Dashboard)
export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { id: leadId } = await context.params;
    const body = await request.json();
    const { status, notes, agent_id } = body;

    if (!status || !notes) {
      return NextResponse.json({ error: 'Status and Notes are required' }, { status: 400 });
    }

    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    let logResult: any = null;

    if (isSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('follow_up_logs')
        .insert([{
          lead_id: leadId,
          agent_id: agent_id || null,
          status,
          notes
        }])
        .select();

      if (error) {
        console.error('Supabase insert follow-up error:', error);
        throw error;
      }
      logResult = data?.[0];
    } else {
      // Offline fallback
      logResult = {
        id: Math.random().toString(36).substring(2, 9),
        lead_id: leadId,
        agent_id: agent_id || null,
        status,
        notes,
        created_at: new Date().toISOString()
      };
    }

    // Sync to local CSV
    try {
      addFollowUp(logResult);
    } catch (err) {
      console.error('Failed to save follow-up to local CSV:', err);
    }

    return NextResponse.json({ success: true, log: logResult }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error creating follow-up log' },
      { status: 500 }
    );
  }
}
