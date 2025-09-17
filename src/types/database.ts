// =========================================
// Portal Educativo IA & Tecnologia
// Tipos TypeScript para Database D1
// =========================================

export interface User {
  id: number;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  role: 'user' | 'moderator' | 'admin';
  profile_data?: any; // JSON object
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  color: string;
  icon: string;
  parent_id?: number;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  color: string;
  usage_count: number;
  created_at: string;
}

export interface AiImage {
  id: number;
  title: string;
  description?: string;
  prompt_used?: string;
  ai_model?: string;
  image_url: string;
  thumbnail_url?: string;
  file_size?: number;
  dimensions?: string;
  file_format: string;
  user_id?: number;
  category_id?: number;
  status: 'pending' | 'approved' | 'rejected' | 'featured';
  moderation_notes?: string;
  moderated_by?: number;
  moderated_at?: string;
  view_count: number;
  like_count: number;
  download_count: number;
  share_count: number;
  is_featured: boolean;
  is_public: boolean;
  featured_at?: string;
  metadata?: any; // JSON object
  created_at: string;
  updated_at: string;
}

export interface Tutorial {
  id: number;
  title: string;
  slug: string;
  description?: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_time?: number;
  prerequisites?: string;
  author_id?: number;
  category_id?: number;
  cover_image_url?: string;
  video_url?: string;
  demo_url?: string;
  github_url?: string;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  view_count: number;
  like_count: number;
  completion_count: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AiShowcase {
  id: number;
  title: string;
  slug: string;
  description: string;
  ai_type: string;
  technology_stack?: any; // JSON array
  model_info?: any; // JSON object
  demo_url?: string;
  github_url?: string;
  documentation_url?: string;
  image_urls?: any; // JSON array
  creator_id?: number;
  category_id?: number;
  status: 'pending' | 'approved' | 'rejected' | 'featured';
  is_open_source: boolean;
  view_count: number;
  star_count: number;
  fork_count: number;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: number;
  content: string;
  user_id: number;
  item_id: number;
  item_type: 'image' | 'tutorial' | 'showcase';
  parent_id?: number;
  is_approved: boolean;
  moderated_by?: number;
  created_at: string;
  updated_at: string;
}

export interface UserFavorite {
  id: number;
  user_id: number;
  item_id: number;
  item_type: 'image' | 'tutorial' | 'showcase';
  created_at: string;
}

export interface GlobalStat {
  id: number;
  stat_name: string;
  stat_value: number;
  updated_at: string;
}

// =========================================
// Tipos para relacionamentos many-to-many
// =========================================

export interface AiImageTag {
  id: number;
  image_id: number;
  tag_id: number;
  created_at: string;
}

export interface TutorialTag {
  id: number;
  tutorial_id: number;
  tag_id: number;
  created_at: string;
}

export interface ShowcaseTag {
  id: number;
  showcase_id: number;
  tag_id: number;
  created_at: string;
}

// =========================================
// Tipos para JOINs e queries complexas
// =========================================

export interface AiImageWithDetails extends AiImage {
  user_name?: string;
  user_avatar?: string;
  category_name?: string;
  category_slug?: string;
  tags?: Tag[];
}

export interface TutorialWithDetails extends Tutorial {
  author_name?: string;
  author_avatar?: string;
  category_name?: string;
  category_slug?: string;
  tags?: Tag[];
}

export interface ShowcaseWithDetails extends AiShowcase {
  creator_name?: string;
  creator_avatar?: string;
  category_name?: string;
  category_slug?: string;
  tags?: Tag[];
}

export interface CategoryWithStats extends Category {
  parent_name?: string;
  children?: Category[];
  images_count?: number;
  tutorials_count?: number;
  showcases_count?: number;
}

export interface TagWithStats extends Tag {
  images_count?: number;
  tutorials_count?: number;
  showcases_count?: number;
}

// =========================================
// Tipos para formulários e APIs
// =========================================

export interface CreateImageRequest {
  title: string;
  description?: string;
  prompt_used?: string;
  ai_model?: string;
  image_url: string;
  thumbnail_url?: string;
  category_id?: number;
  tags?: string[];
  metadata?: any;
}

export interface CreateTutorialRequest {
  title: string;
  description?: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimated_time?: number;
  prerequisites?: string;
  category_id?: number;
  cover_image_url?: string;
  video_url?: string;
  demo_url?: string;
  github_url?: string;
  tags?: string[];
}

export interface CreateShowcaseRequest {
  title: string;
  description: string;
  ai_type: string;
  technology_stack?: string[];
  model_info?: any;
  demo_url?: string;
  github_url?: string;
  documentation_url?: string;
  image_urls?: string[];
  category_id?: number;
  tags?: string[];
  is_open_source?: boolean;
}

// =========================================
// Tipos para filtros e paginação
// =========================================

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface ImageFilters extends PaginationParams {
  category_id?: number;
  tags?: string[];
  status?: string;
  is_featured?: boolean;
  user_id?: number;
  search?: string;
  sort_by?: 'created_at' | 'view_count' | 'like_count' | 'title';
  sort_order?: 'ASC' | 'DESC';
}

export interface TutorialFilters extends PaginationParams {
  category_id?: number;
  difficulty?: string;
  tags?: string[];
  status?: string;
  is_featured?: boolean;
  author_id?: number;
  search?: string;
  sort_by?: 'created_at' | 'view_count' | 'like_count' | 'title';
  sort_order?: 'ASC' | 'DESC';
}

export interface ShowcaseFilters extends PaginationParams {
  category_id?: number;
  ai_type?: string;
  tags?: string[];
  status?: string;
  is_open_source?: boolean;
  creator_id?: number;
  search?: string;
  sort_by?: 'created_at' | 'view_count' | 'star_count' | 'title';
  sort_order?: 'ASC' | 'DESC';
}

// =========================================
// Tipos de resposta da API
// =========================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// =========================================
// Tipos para estatísticas
// =========================================

export interface DashboardStats {
  images: {
    total: number;
    featured: number;
    pending: number;
    approved: number;
  };
  tutorials: {
    total: number;
    published: number;
    draft: number;
    featured: number;
  };
  showcases: {
    total: number;
    approved: number;
    pending: number;
    featured: number;
  };
  users: {
    total: number;
    active: number;
    moderators: number;
    admins: number;
  };
  engagement: {
    total_views: number;
    total_likes: number;
    total_comments: number;
    total_favorites: number;
  };
}

export interface PopularContent {
  images: AiImageWithDetails[];
  tutorials: TutorialWithDetails[];
  showcases: ShowcaseWithDetails[];
}

// =========================================
// Tipos para Cloudflare Workers
// =========================================

export interface Env {
  DB: D1Database;
  KV?: KVNamespace;
  R2?: R2Bucket;
  ENVIRONMENT?: string;
  PORTAL_NAME?: string;
}

// =========================================
// Utilitários de tipo
// =========================================

export type ItemType = 'image' | 'tutorial' | 'showcase';
export type ContentStatus = 'pending' | 'approved' | 'rejected' | 'featured' | 'draft' | 'published' | 'archived';
export type UserRole = 'user' | 'moderator' | 'admin';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type SortOrder = 'ASC' | 'DESC';