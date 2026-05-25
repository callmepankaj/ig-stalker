import { NextRequest, NextResponse } from 'next/server';
import { fallbackAdvertisements, normalizeUrl } from '@/app/lib/advertisements';
import { getSupabaseAdminClient } from '@/app/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json({ ads: fallbackAdvertisements, usingFallback: true });
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

  return NextResponse.json({ ads: data ?? [] });
}

export async function POST(request: NextRequest) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Ad CMS is not connected to Supabase yet' }, { status: 500 });
  }

  const body = await request.json();
  const companyName = String(body.companyName ?? '').trim();
  const description = String(body.description ?? '').trim();
  const companyLink = normalizeUrl(String(body.companyLink ?? ''));
  const logoUrl = normalizeUrl(String(body.logoUrl ?? ''));

  if (!companyName || !description || !companyLink || !logoUrl) {
    return NextResponse.json(
      { error: 'Company name, description, company link, and logo URL are required' },
      { status: 400 },
    );
  }

  const startsAt = new Date();
  const expiresAt = new Date(startsAt);
  expiresAt.setMonth(expiresAt.getMonth() + 1);

  const { data, error } = await supabase
    .from('advertisements')
    .insert({
      company_name: companyName,
      description,
      company_link: companyLink,
      logo_url: logoUrl,
      active: true,
      starts_at: startsAt.toISOString(),
      expires_at: expiresAt.toISOString(),
    })
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ad: data }, { status: 201 });
}
