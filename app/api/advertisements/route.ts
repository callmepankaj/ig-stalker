import { NextRequest, NextResponse } from 'next/server';
import { fallbackAdvertisements, normalizeUrl } from '@/app/lib/advertisements';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ ads: fallbackAdvertisements });
}

export async function POST(request: NextRequest) {
  try {
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

    const mockAd = {
      id: `mock-${Math.random().toString(36).substring(2, 9)}`,
      company_name: companyName,
      description,
      company_link: companyLink,
      logo_url: logoUrl,
      active: true,
      starts_at: startsAt.toISOString(),
      expires_at: expiresAt.toISOString(),
      created_at: startsAt.toISOString(),
    };

    return NextResponse.json({ ad: mockAd }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 400 });
  }
}
