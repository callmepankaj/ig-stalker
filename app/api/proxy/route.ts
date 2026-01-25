import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  // Decode URL if it's encoded
  try {
    url = decodeURIComponent(url);
  } catch {
    // If decoding fails, use original URL
  }

  try {
    const targetUrl = new URL(url);
    const allowedDomains = [
      '.cdninstagram.com',
      '.fbcdn.net',
      'cdninstagram.com',
      'fbcdn.net',
      'instagram.com',
      '.instagram.com',
      'scontent',
    ];
    const isAllowed = allowedDomains.some(domain => 
      targetUrl.hostname.endsWith(domain) || targetUrl.hostname.includes(domain)
    );

    if (!isAllowed) {
      return NextResponse.json({ error: 'Invalid URL domain' }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Referer': 'https://www.instagram.com/',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch image: ${response.status}` }, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = await response.arrayBuffer();

    if (buffer.byteLength === 0) {
      return NextResponse.json({ error: 'Empty image response' }, { status: 500 });
    }

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch image', details: error.message }, { status: 500 });
  }
}
