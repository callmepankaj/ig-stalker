import { NextResponse } from 'next/server';
import { InstagramPost } from '../../types';

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15',
];

const IG_APP_IDS = [
  '936619743392459', // Public Web
  '1217981644879628', // Another common ID
];

const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mapFeedPost = (item: any): InstagramPost => {
  const isVideo = item.media_type === 2;
  
  // Get image URL
  let imageUrl = '';
  if (item.image_versions2?.candidates?.length > 0) {
    imageUrl = item.image_versions2.candidates[0].url;
  }
  
  // Get video URL
  let videoUrl = undefined;
  if (isVideo && item.video_versions?.length > 0) {
    videoUrl = item.video_versions[0].url;
  }

  // Get children (carousel media)
  const children = item.carousel_media?.map((child: any) => {
    const childIsVideo = child.media_type === 2;
    let childImageUrl = '';
    if (child.image_versions2?.candidates?.length > 0) {
      childImageUrl = child.image_versions2.candidates[0].url;
    }
    let childVideoUrl = undefined;
    if (childIsVideo && child.video_versions?.length > 0) {
      childVideoUrl = child.video_versions[0].url;
    }

    return {
      id: child.id || child.pk || String(Math.random()),
      imageUrl: childImageUrl,
      isVideo: childIsVideo,
      videoUrl: childVideoUrl,
    };
  }) || [];

  return {
    id: item.id || item.pk || String(Math.random()),
    imageUrl,
    caption: item.caption?.text || '',
    likes: item.like_count || 0,
    comments: item.comment_count || 0,
    isVideo,
    videoUrl,
    children,
  };
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const cursor = searchParams.get('cursor');
  const userId = searchParams.get('userId');

  if (!username && (!cursor || !userId)) {
    return NextResponse.json({ error: 'Username or cursor+userId is required' }, { status: 400 });
  }

  if (username) {
    const usernameRegex = /^[a-zA-Z0-9._]{1,30}$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json({ error: 'Invalid username format' }, { status: 400 });
    }
  }

  // Random delay to simulate human behavior (200ms - 800ms)
  await delay(Math.floor(Math.random() * 600) + 200);

  try {
    const headers = {
      'User-Agent': getRandomElement(USER_AGENTS),
      'X-IG-App-ID': getRandomElement(IG_APP_IDS),
      'X-ASBD-ID': '129477',
      'X-IG-WWW-Claim': '0',
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://www.instagram.com/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
    };

    // Pagination Request
    if (cursor && userId) {
      const url = `https://www.instagram.com/api/v1/feed/user/${userId}/?max_id=${cursor}`;
      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const posts = data.items?.map(mapFeedPost) || [];

      return NextResponse.json({
        posts,
        page_info: {
          has_next_page: data.more_available || false,
          end_cursor: data.next_max_id || null,
        }
      });
    }

    // Initial Request (feed by username)
    const url = `https://www.instagram.com/api/v1/feed/user/${username}/username/`;

    const response = await fetch(url, {
      headers,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      throw new Error(`Instagram returned ${response.status}`);
    }

    const data = await response.json();
    const user = data.user;

    if (!user) {
      return NextResponse.json({ error: 'User not found or private' }, { status: 404 });
    }

    // Map the response to our interface
    const profileData = {
      user: {
        username: user.username,
        fullName: user.full_name || '',
        biography: user.biography || '',
        profilePicUrl: user.profile_pic_url,
        followers: user.follower_count?.toLocaleString() || '0',
        following: user.following_count?.toLocaleString() || '0',
        posts: user.media_count?.toLocaleString() || '0',
        id: String(user.pk),
      },
      posts: data.items?.map(mapFeedPost) || [],
      highlights: [],
      page_info: {
        has_next_page: data.more_available || false,
        end_cursor: data.next_max_id || null,
      }
    };

    return NextResponse.json(profileData);

  } catch (error: unknown) {
    return NextResponse.json({
      error: 'Failed to fetch data',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
