/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { updateLead, deleteLead } from '@/lib/leadsStorage';

// Helper to extract id from request URL/params
// Next.js App Router route params can be read from the second argument context
type RouteContext = { params: Promise<{ id: string }> };

// PATCH: Update lead details (Admin Dashboard)
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { status, notes, site_visit_date, assigned_agent_id } = body;

    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (site_visit_date !== undefined) updateData.site_visit_date = site_visit_date || null;
    if (assigned_agent_id !== undefined) updateData.assigned_agent_id = assigned_agent_id || null;

    // Build timeline log notes
    let logNotes = '';
    if (status !== undefined) logNotes += `Status changed to: ${status}. `;
    if (assigned_agent_id !== undefined) {
      logNotes += assigned_agent_id ? 'Reassigned to new agent. ' : 'Unassigned from agent. ';
    }
    if (notes !== undefined && notes.trim() !== '') {
      logNotes += `Note: ${notes}`;
    }

    if (logNotes === '') {
      logNotes = 'Lead file updated.';
    }

    if (isSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('leads')
        .update(updateData)
        .eq('id', id)
        .select();

      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
      }

      // Automatically add follow-up log record in DB
      try {
        await supabaseAdmin.from('follow_up_logs').insert([{
          lead_id: id,
          agent_id: assigned_agent_id || null,
          status: status || data[0].status,
          notes: logNotes,
        }]);
      } catch (logErr) {
        console.error('Failed to save automated follow-up log to Supabase:', logErr);
      }

      // Sync update to local CSV file
      try {
        updateLead(id, updateData);
      } catch (err) {
        console.error('Failed to sync update to local CSV:', err);
      }

      return NextResponse.json({ success: true, lead: data[0] });
    } else {
      // Offline CSV update
      const updated = updateLead(id, updateData);
      if (!updated) {
        return NextResponse.json({ error: 'Lead not found in local files' }, { status: 404 });
      }

      // Automatically add follow-up log record to local CSV
      try {
        const { addFollowUp } = await import('@/lib/leadsStorage');
        addFollowUp({
          id: Math.random().toString(36).substring(2, 9),
          lead_id: id,
          agent_id: assigned_agent_id || null,
          status: status || updated.status,
          notes: logNotes,
          created_at: new Date().toISOString(),
        });
      } catch (logErr) {
        console.error('Failed to save automated follow-up log to CSV:', logErr);
      }

      return NextResponse.json({ success: true, lead: updated });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error updating lead' },
      { status: 500 }
    );
  }
}

// DELETE: Remove a lead (Admin Dashboard)
export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (isSupabaseConfigured && supabaseAdmin) {
      // 1. Cascade: Delete associated follow-up logs first in database
      const { error: followUpsError } = await supabaseAdmin
        .from('follow_up_logs')
        .delete()
        .eq('lead_id', id);

      if (followUpsError) {
        console.error('Supabase delete follow-up logs error:', followUpsError);
      }

      // 2. Delete lead from database
      const { error } = await supabaseAdmin
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase delete error:', error);
        throw error;
      }

      // Sync deletion to local CSV file
      try {
        deleteLead(id);
      } catch (err) {
        console.error('Failed to sync deletion to local CSV:', err);
      }

      return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
    } else {
      // Offline CSV deletion
      const deleted = deleteLead(id);
      if (!deleted) {
        return NextResponse.json({ error: 'Lead not found in local files' }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error deleting lead' },
      { status: 500 }
    );
  }
}
