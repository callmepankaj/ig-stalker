export interface InstagramProfile {
  username: string;
  fullName: string;
  biography: string;
  profilePicUrl: string;
  followers: string;
  following: string;
  posts: string;
  id?: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  isVideo: boolean;
  videoUrl?: string;
  children?: {
    id: string;
    imageUrl: string;
    isVideo: boolean;
    videoUrl?: string;
  }[];
}

export interface InstagramHighlight {
  id: string;
  title: string;
  coverUrl: string;
}

export interface InstagramData {
  user: InstagramProfile;
  posts: InstagramPost[];
  highlights: InstagramHighlight[];
  page_info: {
    has_next_page: boolean;
    end_cursor: string | null;
  };
}
