// Constants
export interface APIAuthEndpoints {
  BASE: string;
  LOGIN: string;
  REGISTER: string;
  CREATE_API_KEY: string;
}

export interface APISocialEndpoints {
  BASE: string;
  POSTS: string;
  PROFILES: string;
}

// API Types
type Name = string;
type Email = string;
type Password = string;
type Bio = string;
type Avatar = {
  url: string;
  alt: string;
};
type Banner = {
  url: string;
  alt: string;
};
type VenueManager = boolean;
type Meta = {
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  nextPage: number | null;
  pageCount: number;
  previousPage: number | null;
  totalCount: number;
};
type AccessToken = string;
export type FormNames = "register" | "login" | "createPost" | "editPost";

// API Error
export interface APIError {
  message: string;
}

// API Register
export interface APIRegisterRequest {
  name: Name;
  email: Email;
  password: Password;
  bio?: Bio;
  avatar: Avatar;
  banner: Banner;
  venueManager: VenueManager;
}

export interface APIRegisterResponse {
  name: Name;
  email: Email;
  bio: Bio;
  avatar: Avatar;
  banner: Banner;
  venueManager: VenueManager;
}

// API Login
export interface APILoginRequest {
  email: Email;
  password: Password;
}

export interface APILoginResponse {
  name: Name;
  email: Email;
  avatar: Avatar;
  banner: Banner;
  accessToken: AccessToken;
}

// API Key
export interface APIKeyRequest {
  name: name;
}

export interface APIKeyResponse {
  data: {
    name: Name;
    status: string;
    key: string;
  };
  meta: Meta;
}

//Pagination
export interface Pagination {
  limit: number;
  page: number;
  tag?: string;
}

// Posts
export interface AllPostsResponse {
  data: PostResponse[];
  meta: Meta;
}
export type PostID = number;

export type Media = {
  url: string;
  alt: string;
};

type Comment = {
  body: string;
  replyToId: number | null;
  id: number;
  postId: number;
  owner: string;
  created: Date;
  author: Author;
};

type Reaction = {
  symbol: string;
  count: number;
  reactors: string[];
};

type Author = {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
};

type Count = {
  comments: number;
  reactions: number;
};

export interface PostResponse {
  id: number;
  title: string;
  body: string;
  tags: string[];
  media: Media;
  comments: Comment[];
  created: Date;
  updated: Date;
  reactions: Reaction[];
  author: Author;
  _count: Count;
}

export interface CommentRequest {
  body: string;
  id: PostID;
  replyToId?: number;
}

export interface CommentResponse {
  body: string;
  replyToId: number | null;
  id: number;
  postId: number;
  owner: string;
  created: Date;
}

type Reaction = {
  symbol: string;
  count: number;
  reactors?: string[];
};

export interface ReactionResponse {
  postId: number;
  symbol: string;
  reactions: Reaction[];
}

export interface SearchPostsResponse {
  body: string;
  created: Date;
  id: number;
  tags: string[];
  title: string;
  updated: Date;
  _count: {
    comments: number;
    reactions: number;
  };
}

export interface CreatePostRequest {
  title: string;
  body?: string;
  tags?: string[];
  media?: Media;
}

export interface UpdatePostRequest {
  title: string;
  body?: string;
  tags?: string[];
  media?: Media;
}

// Profiles

export interface ProfileResponse {
  name: string;
  email: string;
  bio: string;
  banner: Media;
  followers: Follower[];
  following: Follower[];
  avatar: Media;
  posts: PostResponse[];
  _count: {
    posts: number;
    followers: number;
    following: number;
  };
}

export type ToggleFollow = "follow" | "unfollow";

type Follower = {
  name: string;
  email: string;
  bio: string;
  banner: Media;
  avatar: Media;
};

export interface FollowResponse {
  followers: Follower[];
  following: Follower[];
}
// PARAMS

export interface Params {
  limit?: number;
  page?: number;
  following?: boolean;
  followers?: boolean;
  posts?: boolean;
  autor?: boolean;
  comments?: boolean;
  reactions?: boolean;
  tag?: string;
}
