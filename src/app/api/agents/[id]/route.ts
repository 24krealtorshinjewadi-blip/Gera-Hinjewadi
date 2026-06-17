import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getSession } from '@/lib/auth';
import { updateAgent, deleteAgent } from '@/lib/leadsStorage';

type RouteContext = { params: Promise<{ id: string }> };

// PATCH: Update agent details / active toggle (Admin Secure)
export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const session = getSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();
    const { name, phone, email, active } = body;

    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (email !== undefined) updateData.email = email || null;
    if (active !== undefined) updateData.active = active;

    if (isSupabaseConfigured && supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('agents')
        .update(updateData)
        .eq('id', id)
        .select();

      if (error) {
        console.error('Supabase update agent error:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
      }

      // Sync update to CSV
      try {
        updateAgent(id, updateData);
      } catch (err) {
        console.error('Failed to sync agent update to local CSV:', err);
      }

      return NextResponse.json({ success: true, agent: data[0] });
    } else {
      // Offline fallback
      const updated = updateAgent(id, updateData);
      if (!updated) {
        return NextResponse.json({ error: 'Agent not found in local files' }, { status: 404 });
      }
      return NextResponse.json({ success: true, agent: updated });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error updating agent' },
      { status: 500 }
    );
  }
}

// DELETE: Remove agent (Admin Secure)
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
        .from('agents')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase delete agent error:', error);
        throw error;
      }

      // Sync deletion to CSV
      try {
        deleteAgent(id);
      } catch (err) {
        console.error('Failed to sync agent deletion to local CSV:', err);
      }

      return NextResponse.json({ success: true, message: 'Agent deleted successfully' });
    } else {
      // Offline fallback
      const deleted = deleteAgent(id);
      if (!deleted) {
        return NextResponse.json({ error: 'Agent not found in local files' }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: 'Agent deleted successfully' });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Server error deleting agent' },
      { status: 500 }
    );
  }
}
