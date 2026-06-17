import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { updateLead, deleteLead } from '@/lib/leadsStorage';

// Helper to extract id from request URL/params
// Next.js App Router route params can be read from the second argument context
type RouteContext = { params: Promise<{ id: string }> };

// PATCH: Update lead details (Admin Secure)
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const session = getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();
    const { status, notes, site_visit_date } = body;

    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (site_visit_date !== undefined) updateData.site_visit_date = site_visit_date || null;

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
        return NextResponse.json({ success: true, lead: updated });
      }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error updating lead' },
      { status: 500 }
    );
  }
}

// DELETE: Remove a lead (Admin Secure)
export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const session = getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (isSupabaseConfigured && supabaseAdmin) {
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
