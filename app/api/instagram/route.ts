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

type InstagramMediaNode = {
  id: string;
  display_url: string;
  edge_media_to_caption?: {
    edges?: { node?: { text?: string } }[];
  };
  edge_liked_by?: { count?: number };
  edge_media_to_comment?: { count?: number };
  is_video: boolean;
  video_url?: string;
  edge_sidecar_to_children?: {
    edges?: { node: InstagramMediaNode }[];
  };
};

type InstagramMediaEdge = {
  node: InstagramMediaNode;
};

type InstagramTimeline = {
  count?: number;
  edges?: InstagramMediaEdge[];
  page_info?: {
    has_next_page?: boolean;
    end_cursor?: string | null;
  };
};

type InstagramUser = {
  username: string;
  full_name: string;
  biography: string;
  profile_pic_url?: string;
  profile_pic_url_hd?: string;
  edge_followed_by?: { count?: number };
  edge_follow?: { count?: number };
  edge_owner_to_timeline_media?: InstagramTimeline;
  id: string;
  highlight_reel_tray?: { edges?: InstagramHighlightEdge[] };
  edge_highlight_reels?: { edges?: InstagramHighlightEdge[] };
};

type InstagramHighlightEdge = {
  node: {
    id: string;
    title: string;
    cover_media?: {
      thumbnail_src?: string;
    };
    cover_media_cropped_thumbnail?: {
      url?: string;
    };
  };
};

type WebProfileResponse = {
  data?: {
    user?: InstagramUser;
  };
};

type GraphqlTimelineResponse = {
  data?: {
    user?: {
      edge_owner_to_timeline_media?: InstagramTimeline;
    };
  };
};

const mapPost = (edge: InstagramMediaEdge): InstagramPost => ({
  id: edge.node.id,
  imageUrl: edge.node.display_url,
  caption: edge.node.edge_media_to_caption?.edges?.[0]?.node?.text || '',
  likes: edge.node.edge_liked_by?.count || 0,
  comments: edge.node.edge_media_to_comment?.count || 0,
  isVideo: edge.node.is_video,
  videoUrl: edge.node.video_url,
  children: edge.node.edge_sidecar_to_children?.edges?.map(child => ({
    id: child.node.id,
    imageUrl: child.node.display_url,
    isVideo: child.node.is_video,
    videoUrl: child.node.video_url,
  })) || [],
});

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
      'Referer': `https://www.instagram.com/${username || 'instagram'}/`,
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
    };

    // Pagination Request
    if (cursor && userId) {
      const queryHashes = [
        '58b6785bea111c67129decbe6a448951', // Common
        '69cba40317214236af40e7efa697781d', // Common
        'e769aa130647d2354c40ea6a439bfc08', // Common
        '42323d64886122307be10013ad2dcc44', // Common
        '2c5d4d8b70cad329c4a6ebe3abb6eedd', // New candidate
        '003056d32c2554def87d2635815d9952', // New candidate
      ];

      let lastError: unknown;
      for (const hash of queryHashes) {
        try {
          // Add small delay between retries
          if (lastError) await delay(500);

          const variables = JSON.stringify({
            id: userId,
            first: 50, // Increase batch size
            after: cursor,
          });
          const url = `https://www.instagram.com/graphql/query/?query_hash=${hash}&variables=${encodeURIComponent(variables)}`;
          
          const response = await fetch(url, { headers });
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const data = await response.json() as GraphqlTimelineResponse;
          const edge = data?.data?.user?.edge_owner_to_timeline_media;

          if (edge) {
            const posts = edge.edges?.map(mapPost) || [];

            return NextResponse.json({
              posts,
              page_info: {
                has_next_page: edge.page_info?.has_next_page || false,
                end_cursor: edge.page_info?.end_cursor || null,
              }
            });
          }
        } catch (err) {
          lastError = err;
          // Continue to next hash
        }
      }
      
      return NextResponse.json({ error: 'Failed to load more posts', details: String(lastError) }, { status: 500 });
    }

    // Initial Request (web_profile_info)
    const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`;

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

    const data = await response.json() as WebProfileResponse;
    const user = data?.data?.user;

    if (!user) {
      return NextResponse.json({ error: 'User not found or private' }, { status: 404 });
    }

    // Map the response to our interface
    const profileData = {
      user: {
        username: user.username,
        fullName: user.full_name,
        biography: user.biography,
        profilePicUrl: user.profile_pic_url_hd || user.profile_pic_url,
        followers: user.edge_followed_by?.count?.toLocaleString() || '0',
        following: user.edge_follow?.count?.toLocaleString() || '0',
        posts: user.edge_owner_to_timeline_media?.count?.toLocaleString() || '0',
        id: user.id,
      },
      posts: user.edge_owner_to_timeline_media?.edges?.map(mapPost) || [],
      highlights: (user.highlight_reel_tray?.edges || user.edge_highlight_reels?.edges)?.map((edge) => ({
        id: edge.node.id,
        title: edge.node.title,
        coverUrl: edge.node.cover_media?.thumbnail_src || edge.node.cover_media_cropped_thumbnail?.url,
      })) || [],
      page_info: {
        has_next_page: user.edge_owner_to_timeline_media?.page_info?.has_next_page || false,
        end_cursor: user.edge_owner_to_timeline_media?.page_info?.end_cursor || null,
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
