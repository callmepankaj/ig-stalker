import { NextResponse } from 'next/server';
import { fallbackPartners } from '@/app/lib/partners';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({ items: fallbackPartners });
}
