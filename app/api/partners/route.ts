import { NextResponse } from 'next/server';
import { fallbackPartners } from '@/app/lib/partners';
import { getSupabaseAdminClient } from '@/app/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json({ items: fallbackPartners, usingFallback: true });
  }

  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('advertisements')
    .select('*')
    .eq('active', true)
    .lte('starts_at', now)
    .gt('expires_at', now)
    .order('created_at', { ascending: false })
    .limit(18);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data ?? [] });
}
