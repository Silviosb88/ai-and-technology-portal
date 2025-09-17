// =========================================
// Portal Educativo IA & Tecnologia
// Utilitários para Database D1
// =========================================

import type { 
  Env, 
  ImageFilters, 
  TutorialFilters, 
  ShowcaseFilters,
  PaginatedResponse,
  AiImageWithDetails,
  TutorialWithDetails,
  ShowcaseWithDetails,
  DashboardStats,
  GlobalStat
} from '../types/database'

// =========================================
// Utilitários de Query Building
// =========================================

export function buildWhereClause(filters: Record<string, any>): { where: string, params: any[] } {
  const conditions: string[] = []
  const params: any[] = []

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value) && value.length > 0) {
        // Para arrays (ex: tags)
        const placeholders = value.map(() => '?').join(',')
        conditions.push(`${key} IN (${placeholders})`)
        params.push(...value)
      } else {
        conditions.push(`${key} = ?`)
        params.push(value)
      }
    }
  })

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
  return { where, params }
}

export function buildPaginationClause(page: number = 1, limit: number = 20): { sql: string, offset: number } {
  const offset = (page - 1) * limit
  return {
    sql: `LIMIT ${limit} OFFSET ${offset}`,
    offset
  }
}

export function buildOrderClause(sortBy: string = 'created_at', sortOrder: 'ASC' | 'DESC' = 'DESC'): string {
  // Sanitizar para prevenir SQL injection
  const allowedSortFields = ['id', 'title', 'created_at', 'updated_at', 'view_count', 'like_count', 'star_count']
  const sanitizedSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'created_at'
  const sanitizedSortOrder = sortOrder === 'ASC' ? 'ASC' : 'DESC'
  
  return `ORDER BY ${sanitizedSortBy} ${sanitizedSortOrder}`
}

// =========================================
// Queries para Imagens IA
// =========================================

export class ImageQueries {
  static async getAll(db: D1Database, filters: ImageFilters = {}): Promise<PaginatedResponse<AiImageWithDetails>> {
    const { page = 1, limit = 20, sort_by = 'created_at', sort_order = 'DESC', ...whereFilters } = filters
    
    // Query para contar total
    const { where: countWhere, params: countParams } = buildWhereClause(whereFilters)
    const countQuery = `SELECT COUNT(*) as total FROM ai_images ${countWhere}`
    const countResult = await db.prepare(countQuery).bind(...countParams).first<{ total: number }>()
    const total = countResult?.total || 0
    
    // Query principal com JOINs
    const { where, params } = buildWhereClause(whereFilters)
    const { sql: pagination, offset } = buildPaginationClause(page, limit)
    const orderBy = buildOrderClause(sort_by, sort_order)
    
    const query = `
      SELECT 
        ai.*,
        u.name as user_name,
        u.avatar_url as user_avatar,
        c.name as category_name,
        c.slug as category_slug
      FROM ai_images ai
      LEFT JOIN users u ON ai.user_id = u.id
      LEFT JOIN categories c ON ai.category_id = c.id
      ${where}
      ${orderBy}
      ${pagination}
    `
    
    const results = await db.prepare(query).bind(...params).all<AiImageWithDetails>()
    
    return {
      data: results.results || [],
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: (page * limit) < total,
        hasPrev: page > 1
      }
    }
  }

  static async getById(db: D1Database, id: number): Promise<AiImageWithDetails | null> {
    const query = `
      SELECT 
        ai.*,
        u.name as user_name,
        u.avatar_url as user_avatar,
        c.name as category_name,
        c.slug as category_slug
      FROM ai_images ai
      LEFT JOIN users u ON ai.user_id = u.id
      LEFT JOIN categories c ON ai.category_id = c.id
      WHERE ai.id = ?
    `
    return await db.prepare(query).bind(id).first<AiImageWithDetails>()
  }

  static async getFeatured(db: D1Database, limit: number = 6): Promise<AiImageWithDetails[]> {
    const query = `
      SELECT 
        ai.*,
        u.name as user_name,
        u.avatar_url as user_avatar,
        c.name as category_name,
        c.slug as category_slug
      FROM ai_images ai
      LEFT JOIN users u ON ai.user_id = u.id
      LEFT JOIN categories c ON ai.category_id = c.id
      WHERE ai.is_featured = 1 AND ai.status = 'approved'
      ORDER BY ai.featured_at DESC, ai.view_count DESC
      LIMIT ?
    `
    const result = await db.prepare(query).bind(limit).all<AiImageWithDetails>()
    return result.results || []
  }

  static async incrementViewCount(db: D1Database, id: number): Promise<void> {
    await db.prepare('UPDATE ai_images SET view_count = view_count + 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .bind(id).run()
  }
}

// =========================================
// Queries para Tutoriais
// =========================================

export class TutorialQueries {
  static async getAll(db: D1Database, filters: TutorialFilters = {}): Promise<PaginatedResponse<TutorialWithDetails>> {
    const { page = 1, limit = 20, sort_by = 'created_at', sort_order = 'DESC', ...whereFilters } = filters
    
    // Incluir apenas tutoriais publicados se não especificado
    if (!whereFilters.status) {
      whereFilters.status = 'published'
    }
    
    // Query para contar total
    const { where: countWhere, params: countParams } = buildWhereClause(whereFilters)
    const countQuery = `SELECT COUNT(*) as total FROM tutorials ${countWhere}`
    const countResult = await db.prepare(countQuery).bind(...countParams).first<{ total: number }>()
    const total = countResult?.total || 0
    
    // Query principal
    const { where, params } = buildWhereClause(whereFilters)
    const { sql: pagination } = buildPaginationClause(page, limit)
    const orderBy = buildOrderClause(sort_by, sort_order)
    
    const query = `
      SELECT 
        t.*,
        u.name as author_name,
        u.avatar_url as author_avatar,
        c.name as category_name,
        c.slug as category_slug
      FROM tutorials t
      LEFT JOIN users u ON t.author_id = u.id
      LEFT JOIN categories c ON t.category_id = c.id
      ${where}
      ${orderBy}
      ${pagination}
    `
    
    const results = await db.prepare(query).bind(...params).all<TutorialWithDetails>()
    
    return {
      data: results.results || [],
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: (page * limit) < total,
        hasPrev: page > 1
      }
    }
  }

  static async getBySlug(db: D1Database, slug: string): Promise<TutorialWithDetails | null> {
    const query = `
      SELECT 
        t.*,
        u.name as author_name,
        u.avatar_url as author_avatar,
        c.name as category_name,
        c.slug as category_slug
      FROM tutorials t
      LEFT JOIN users u ON t.author_id = u.id
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.slug = ? AND t.status = 'published'
    `
    return await db.prepare(query).bind(slug).first<TutorialWithDetails>()
  }

  static async getFeatured(db: D1Database, limit: number = 4): Promise<TutorialWithDetails[]> {
    const query = `
      SELECT 
        t.*,
        u.name as author_name,
        u.avatar_url as author_avatar,
        c.name as category_name,
        c.slug as category_slug
      FROM tutorials t
      LEFT JOIN users u ON t.author_id = u.id
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.is_featured = 1 AND t.status = 'published'
      ORDER BY t.view_count DESC, t.like_count DESC
      LIMIT ?
    `
    const result = await db.prepare(query).bind(limit).all<TutorialWithDetails>()
    return result.results || []
  }
}

// =========================================
// Queries para Showcases
// =========================================

export class ShowcaseQueries {
  static async getAll(db: D1Database, filters: ShowcaseFilters = {}): Promise<PaginatedResponse<ShowcaseWithDetails>> {
    const { page = 1, limit = 20, sort_by = 'created_at', sort_order = 'DESC', ...whereFilters } = filters
    
    // Incluir apenas showcases aprovados se não especificado
    if (!whereFilters.status) {
      whereFilters.status = 'approved'
    }
    
    // Query para contar total
    const { where: countWhere, params: countParams } = buildWhereClause(whereFilters)
    const countQuery = `SELECT COUNT(*) as total FROM ai_showcases ${countWhere}`
    const countResult = await db.prepare(countQuery).bind(...countParams).first<{ total: number }>()
    const total = countResult?.total || 0
    
    // Query principal
    const { where, params } = buildWhereClause(whereFilters)
    const { sql: pagination } = buildPaginationClause(page, limit)
    const orderBy = buildOrderClause(sort_by, sort_order)
    
    const query = `
      SELECT 
        s.*,
        u.name as creator_name,
        u.avatar_url as creator_avatar,
        c.name as category_name,
        c.slug as category_slug
      FROM ai_showcases s
      LEFT JOIN users u ON s.creator_id = u.id
      LEFT JOIN categories c ON s.category_id = c.id
      ${where}
      ${orderBy}
      ${pagination}
    `
    
    const results = await db.prepare(query).bind(...params).all<ShowcaseWithDetails>()
    
    return {
      data: results.results || [],
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: (page * limit) < total,
        hasPrev: page > 1
      }
    }
  }

  static async getFeatured(db: D1Database, limit: number = 4): Promise<ShowcaseWithDetails[]> {
    const query = `
      SELECT 
        s.*,
        u.name as creator_name,
        u.avatar_url as creator_avatar,
        c.name as category_name,
        c.slug as category_slug
      FROM ai_showcases s
      LEFT JOIN users u ON s.creator_id = u.id
      LEFT JOIN categories c ON s.category_id = c.id
      WHERE s.status = 'featured'
      ORDER BY s.star_count DESC, s.view_count DESC
      LIMIT ?
    `
    const result = await db.prepare(query).bind(limit).all<ShowcaseWithDetails>()
    return result.results || []
  }
}

// =========================================
// Queries para Estatísticas
// =========================================

export class StatsQueries {
  static async getDashboardStats(db: D1Database): Promise<DashboardStats> {
    // Query otimizada para múltiplas estatísticas
    const statsQuery = `
      SELECT 
        'images_total' as stat_type,
        COUNT(*) as count,
        SUM(CASE WHEN status = 'featured' THEN 1 ELSE 0 END) as featured_count,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_count,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved_count,
        SUM(view_count) as total_views,
        SUM(like_count) as total_likes
      FROM ai_images
      
      UNION ALL
      
      SELECT 
        'tutorials_total' as stat_type,
        COUNT(*) as count,
        SUM(CASE WHEN is_featured = 1 THEN 1 ELSE 0 END) as featured_count,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as pending_count,
        SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as approved_count,
        SUM(view_count) as total_views,
        SUM(like_count) as total_likes
      FROM tutorials
      
      UNION ALL
      
      SELECT 
        'showcases_total' as stat_type,
        COUNT(*) as count,
        SUM(CASE WHEN status = 'featured' THEN 1 ELSE 0 END) as featured_count,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_count,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved_count,
        SUM(view_count) as total_views,
        SUM(star_count) as total_likes
      FROM ai_showcases
      
      UNION ALL
      
      SELECT 
        'users_total' as stat_type,
        COUNT(*) as count,
        SUM(CASE WHEN role = 'admin' THEN 1 ELSE 0 END) as featured_count,
        SUM(CASE WHEN role = 'moderator' THEN 1 ELSE 0 END) as pending_count,
        SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as approved_count,
        0 as total_views,
        0 as total_likes
      FROM users
    `
    
    const results = await db.prepare(statsQuery).all()
    const stats = results.results || []
    
    // Processar resultados em formato estruturado
    const dashboardStats: DashboardStats = {
      images: { total: 0, featured: 0, pending: 0, approved: 0 },
      tutorials: { total: 0, published: 0, draft: 0, featured: 0 },
      showcases: { total: 0, approved: 0, pending: 0, featured: 0 },
      users: { total: 0, active: 0, moderators: 0, admins: 0 },
      engagement: { total_views: 0, total_likes: 0, total_comments: 0, total_favorites: 0 }
    }
    
    stats.forEach((stat: any) => {
      switch(stat.stat_type) {
        case 'images_total':
          dashboardStats.images = {
            total: stat.count,
            featured: stat.featured_count,
            pending: stat.pending_count,
            approved: stat.approved_count
          }
          dashboardStats.engagement.total_views += stat.total_views
          dashboardStats.engagement.total_likes += stat.total_likes
          break
        case 'tutorials_total':
          dashboardStats.tutorials = {
            total: stat.count,
            featured: stat.featured_count,
            draft: stat.pending_count,
            published: stat.approved_count
          }
          dashboardStats.engagement.total_views += stat.total_views
          dashboardStats.engagement.total_likes += stat.total_likes
          break
        case 'showcases_total':
          dashboardStats.showcases = {
            total: stat.count,
            featured: stat.featured_count,
            pending: stat.pending_count,
            approved: stat.approved_count
          }
          dashboardStats.engagement.total_views += stat.total_views
          dashboardStats.engagement.total_likes += stat.total_likes
          break
        case 'users_total':
          dashboardStats.users = {
            total: stat.count,
            admins: stat.featured_count,
            moderators: stat.pending_count,
            active: stat.approved_count
          }
          break
      }
    })
    
    return dashboardStats
  }

  static async updateGlobalStat(db: D1Database, statName: string, value: number): Promise<void> {
    await db.prepare(`
      INSERT INTO global_stats (stat_name, stat_value, updated_at) 
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(stat_name) 
      DO UPDATE SET stat_value = ?, updated_at = CURRENT_TIMESTAMP
    `).bind(statName, value, value).run()
  }
}

// =========================================
// Utilitários gerais
// =========================================

export class DatabaseUtils {
  static async executeTransaction(db: D1Database, queries: string[], params: any[][] = []): Promise<void> {
    // D1 não suporta transações explícitas ainda, mas vamos executar sequencialmente
    for (let i = 0; i < queries.length; i++) {
      const query = queries[i]
      const queryParams = params[i] || []
      await db.prepare(query).bind(...queryParams).run()
    }
  }

  static sanitizeSearchTerm(term: string): string {
    return term.replace(/[%_]/g, '\\$&').trim()
  }

  static buildSearchCondition(fields: string[], searchTerm: string): { condition: string, params: any[] } {
    if (!searchTerm || searchTerm.trim() === '') {
      return { condition: '', params: [] }
    }
    
    const sanitized = `%${this.sanitizeSearchTerm(searchTerm)}%`
    const conditions = fields.map(field => `${field} LIKE ?`).join(' OR ')
    const params = fields.map(() => sanitized)
    
    return {
      condition: `(${conditions})`,
      params
    }
  }
}