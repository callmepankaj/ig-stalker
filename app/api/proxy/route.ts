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
      'cdninstagram.com',
      'fbcdn.net',
      'instagram.com',
    ];
    const hostname = targetUrl.hostname.toLowerCase();
    const isAllowed = allowedDomains.some(domain =>
      hostname === domain || hostname.endsWith(`.${domain}`)
    ) || hostname.startsWith('scontent');

    const isHttp = targetUrl.protocol === 'https:' || targetUrl.protocol === 'http:';

    if (!isAllowed || !isHttp) {
      return NextResponse.json({ error: 'Invalid URL domain' }, { status: 403 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
  }

  try {
    const targetUrl = new URL(url);
    const isVideo = /\.(mp4|mov|m4v)(?:$|\?)/i.test(targetUrl.pathname) || searchParams.get('type') === 'video';
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Referer': 'https://www.instagram.com/',
        'Accept': isVideo
          ? 'video/mp4,video/*,*/*;q=0.8'
          : 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Origin': 'https://www.instagram.com',
        'Sec-Fetch-Dest': isVideo ? 'video' : 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch media: ${response.status}` },
        { status: response.status }
      );
    }

    const contentType = response.headers.get('content-type') || (isVideo ? 'video/mp4' : 'image/jpeg');
    const buffer = await response.arrayBuffer();

    if (buffer.byteLength === 0) {
      return NextResponse.json({ error: 'Empty media response' }, { status: 500 });
    }

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Cross-Origin-Resource-Policy': 'cross-origin',
      },
    });
  } catch (error: unknown) {
    return NextResponse.json({
      error: 'Failed to fetch media',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
