import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { Layout } from './components/Layout'
import { Gallery } from './components/Gallery'
import { Lightbox } from './components/Lightbox'
import { UploadModal } from './components/UploadModal'
import { ImageQueries, TutorialQueries, ShowcaseQueries, StatsQueries } from './utils/database'
import type { Env } from './types/database'

const app = new Hono<{ Bindings: Env }>()

// Middlewares
app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './public' }))
app.use(renderer)

// Página inicial - Dashboard do Portal
app.get('/', (c) => {
  return c.render(
    <Layout currentPage="home">
      <div class="space-y-8">
        {/* Hero Section */}
        <div class="bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent rounded-2xl p-8 text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10">
            <h1 class="text-4xl font-bold mb-4">
              Portal Educativo IA & Tecnologia
            </h1>
            <p class="text-xl mb-6 text-white/90">
              Descubra, aprenda e explore o fascinante mundo da Inteligência Artificial
            </p>
            <div class="flex flex-wrap gap-4">
              <a href="/galeria" class="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm">
                <i class="fas fa-images mr-2"></i>
                Explorar Galeria
              </a>
              <a href="/tutoriais" class="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm">
                <i class="fas fa-book-open mr-2"></i>
                Ver Tutoriais
              </a>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-images text-blue-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">1,247</h3>
            <p class="text-gray-600">Imagens de IA</p>
          </div>
          
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-book-open text-green-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">89</h3>
            <p class="text-gray-600">Tutoriais</p>
          </div>
          
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-rocket text-purple-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">156</h3>
            <p class="text-gray-600">Projetos Showcase</p>
          </div>
          
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-users text-orange-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">2,341</h3>
            <p class="text-gray-600">Usuários Ativos</p>
          </div>
        </div>

        {/* Seções em Destaque */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galeria em Destaque */}
          <div class="ai-card p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900">
                <i class="fas fa-star text-yellow-500 mr-2"></i>
                Destaques da Galeria
              </h2>
              <a href="/galeria" class="text-ai-primary hover:text-ai-secondary font-medium">
                Ver todas <i class="fas fa-arrow-right ml-1"></i>
              </a>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-image text-4xl text-purple-400"></i>
              </div>
              <div class="aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-palette text-4xl text-blue-400"></i>
              </div>
              <div class="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-brain text-4xl text-green-400"></i>
              </div>
              <div class="aspect-square bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-robot text-4xl text-orange-400"></i>
              </div>
            </div>
          </div>

          {/* Tutoriais Recentes */}
          <div class="ai-card p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900">
                <i class="fas fa-graduation-cap text-blue-500 mr-2"></i>
                Tutoriais Recentes
              </h2>
              <a href="/tutoriais" class="text-ai-primary hover:text-ai-secondary font-medium">
                Ver todos <i class="fas fa-arrow-right ml-1"></i>
              </a>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-play text-white text-sm"></i>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 mb-1">Introdução ao Machine Learning</h3>
                  <p class="text-sm text-gray-600 mb-2">Conceitos fundamentais e primeiros passos</p>
                  <span class="text-xs text-ai-primary font-medium">15 min • Iniciante</span>
                </div>
              </div>
              
              <div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-code text-white text-sm"></i>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 mb-1">Criando seu Primeiro Modelo de IA</h3>
                  <p class="text-sm text-gray-600 mb-2">Passo a passo com Python e TensorFlow</p>
                  <span class="text-xs text-ai-primary font-medium">45 min • Intermediário</span>
                </div>
              </div>
              
              <div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-brain text-white text-sm"></i>
                </div>
                <div class="flex-1">
                  <h3 class="font-semibold text-gray-900 mb-1">Deep Learning com Redes Neurais</h3>
                  <p class="text-sm text-gray-600 mb-2">Entendendo arquiteturas complexas</p>
                  <span class="text-xs text-ai-primary font-medium">60 min • Avançado</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 text-center border border-gray-200">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Pronto para começar sua jornada em IA?
          </h2>
          <p class="text-xl text-gray-600 mb-6">
            Explore nossa coleção curada de recursos educacionais e projetos práticos
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/upload" class="ai-button-primary text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              <i class="fas fa-cloud-upload-alt mr-2"></i>
              Compartilhar Projeto
            </a>
            <a href="/showcase" class="bg-white text-ai-primary px-8 py-3 rounded-lg font-semibold border-2 border-ai-primary hover:bg-ai-primary hover:text-white transition-all">
              <i class="fas fa-rocket mr-2"></i>
              Ver Showcase
            </a>
          </div>
        </div>
      </div>
    </Layout>,
    { title: 'Dashboard' }
  )
})

// =========================================
// API ROUTES - Portal IA & Tecnologia
// =========================================

// Health check
app.get('/api/hello', (c) => {
  return c.json({ 
    message: 'Portal IA & Tecnologia API ativa!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    database: c.env?.DB ? 'D1 Connected' : 'D1 Not Available'
  })
})

// =========================================
// Dashboard e Estatísticas
// =========================================

app.get('/api/stats', async (c) => {
  try {
    if (!c.env?.DB) {
      // Fallback para dados mock se DB não estiver disponível
      return c.json({
        gallery: { total: 1247, featured: 25, pending: 12, approved: 1210 },
        tutorials: { total: 89, published: 78, draft: 11, featured: 15 },
        showcase: { total: 156, approved: 140, pending: 16, featured: 22 },
        users: { active: 2341, total: 5672, moderators: 8, admins: 3 },
        engagement: { total_views: 45678, total_likes: 8934, total_comments: 1456, total_favorites: 2341 }
      })
    }

    const stats = await StatsQueries.getDashboardStats(c.env.DB)
    return c.json(stats)
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return c.json({ error: 'Erro interno do servidor' }, 500)
  }
})

app.get('/api/stats/dashboard', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const stats = await StatsQueries.getDashboardStats(c.env.DB)
    return c.json({ success: true, data: stats })
  } catch (error) {
    console.error('Erro ao buscar dashboard stats:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

// =========================================
// Galeria de Imagens IA
// =========================================

app.get('/api/images', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '20')
    const category_id = c.req.query('category_id') ? parseInt(c.req.query('category_id')!) : undefined
    const status = c.req.query('status') || 'approved'
    const is_featured = c.req.query('featured') === 'true' ? true : undefined
    const sort_by = c.req.query('sort_by') || 'created_at'
    const sort_order = (c.req.query('sort_order') as 'ASC' | 'DESC') || 'DESC'

    const images = await ImageQueries.getAll(c.env.DB, {
      page,
      limit,
      category_id,
      status,
      is_featured,
      sort_by,
      sort_order
    })

    return c.json({ success: true, ...images })
  } catch (error) {
    console.error('Erro ao buscar imagens:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

app.get('/api/images/featured', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const limit = parseInt(c.req.query('limit') || '6')
    const images = await ImageQueries.getFeatured(c.env.DB, limit)

    return c.json({ success: true, data: images })
  } catch (error) {
    console.error('Erro ao buscar imagens em destaque:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

app.get('/api/images/:id', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const id = parseInt(c.req.param('id'))
    if (isNaN(id)) {
      return c.json({ success: false, error: 'ID inválido' }, 400)
    }

    // Incrementar visualizações
    await ImageQueries.incrementViewCount(c.env.DB, id)
    
    // Buscar imagem com detalhes
    const image = await ImageQueries.getById(c.env.DB, id)
    
    if (!image) {
      return c.json({ success: false, error: 'Imagem não encontrada' }, 404)
    }

    return c.json({ success: true, data: image })
  } catch (error) {
    console.error('Erro ao buscar imagem:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

// =========================================
// Tutoriais
// =========================================

app.get('/api/tutorials', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '20')
    const category_id = c.req.query('category_id') ? parseInt(c.req.query('category_id')!) : undefined
    const difficulty = c.req.query('difficulty')
    const status = c.req.query('status') || 'published'
    const is_featured = c.req.query('featured') === 'true' ? true : undefined
    const sort_by = c.req.query('sort_by') || 'created_at'
    const sort_order = (c.req.query('sort_order') as 'ASC' | 'DESC') || 'DESC'

    const tutorials = await TutorialQueries.getAll(c.env.DB, {
      page,
      limit,
      category_id,
      difficulty,
      status,
      is_featured,
      sort_by,
      sort_order
    })

    return c.json({ success: true, ...tutorials })
  } catch (error) {
    console.error('Erro ao buscar tutoriais:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

app.get('/api/tutorials/featured', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const limit = parseInt(c.req.query('limit') || '4')
    const tutorials = await TutorialQueries.getFeatured(c.env.DB, limit)

    return c.json({ success: true, data: tutorials })
  } catch (error) {
    console.error('Erro ao buscar tutoriais em destaque:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

app.get('/api/tutorials/:slug', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const slug = c.req.param('slug')
    const tutorial = await TutorialQueries.getBySlug(c.env.DB, slug)
    
    if (!tutorial) {
      return c.json({ success: false, error: 'Tutorial não encontrado' }, 404)
    }

    return c.json({ success: true, data: tutorial })
  } catch (error) {
    console.error('Erro ao buscar tutorial:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

// =========================================
// Showcase de IAs
// =========================================

app.get('/api/showcases', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '20')
    const category_id = c.req.query('category_id') ? parseInt(c.req.query('category_id')!) : undefined
    const ai_type = c.req.query('ai_type')
    const status = c.req.query('status') || 'approved'
    const is_open_source = c.req.query('open_source') === 'true' ? true : undefined
    const sort_by = c.req.query('sort_by') || 'created_at'
    const sort_order = (c.req.query('sort_order') as 'ASC' | 'DESC') || 'DESC'

    const showcases = await ShowcaseQueries.getAll(c.env.DB, {
      page,
      limit,
      category_id,
      ai_type,
      status,
      is_open_source,
      sort_by,
      sort_order
    })

    return c.json({ success: true, ...showcases })
  } catch (error) {
    console.error('Erro ao buscar showcases:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

app.get('/api/showcases/featured', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const limit = parseInt(c.req.query('limit') || '4')
    const showcases = await ShowcaseQueries.getFeatured(c.env.DB, limit)

    return c.json({ success: true, data: showcases })
  } catch (error) {
    console.error('Erro ao buscar showcases em destaque:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

// =========================================
// Upload de Imagens
// =========================================

app.post('/api/upload', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ success: false, error: 'Database não disponível' }, 500)
    }

    const formData = await c.req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return c.json({ success: false, error: 'Nenhum arquivo enviado' }, 400)
    }

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      return c.json({ success: false, error: 'Arquivo deve ser uma imagem' }, 400)
    }

    // Validar tamanho (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return c.json({ success: false, error: 'Arquivo muito grande (máx. 10MB)' }, 400)
    }

    // Obter metadados do formulário
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const categoryId = parseInt(formData.get('category_id') as string)
    const promptUsed = formData.get('prompt_used') as string
    const aiModel = formData.get('ai_model') as string
    const tags = formData.get('tags') as string
    const isFeatured = formData.get('is_featured') === '1'

    // Validar campos obrigatórios
    if (!title || !categoryId) {
      return c.json({ success: false, error: 'Título e categoria são obrigatórios' }, 400)
    }

    // Simular processamento de imagem (em produção, usar Cloudflare R2)
    const fileExtension = file.name.split('.').pop() || 'jpg'
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`
    
    // URLs simuladas (em produção, seria o R2 bucket)
    const imageUrl = `https://via.placeholder.com/800x600/6366f1/ffffff?text=${encodeURIComponent(title.substring(0, 20))}`
    const thumbnailUrl = `https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodeURIComponent(title.substring(0, 15))}`

    // Inserir no banco D1
    const insertResult = await c.env.DB.prepare(`
      INSERT INTO ai_images (
        title, description, prompt_used, ai_model, image_url, thumbnail_url,
        file_size, file_format, category_id, is_featured, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(
      title,
      description || null,
      promptUsed || null,
      aiModel || null,
      imageUrl,
      thumbnailUrl,
      file.size,
      fileExtension,
      categoryId,
      isFeatured ? 1 : 0,
      'pending' // Status inicial
    ).run()

    if (!insertResult.success) {
      throw new Error('Falha ao salvar no banco de dados')
    }

    const imageId = insertResult.meta.last_row_id

    // Processar tags se fornecidas
    if (tags && tags.trim()) {
      const tagList = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      
      for (const tagName of tagList) {
        // Inserir tag se não existir
        await c.env.DB.prepare(`
          INSERT OR IGNORE INTO tags (name, slug, created_at) 
          VALUES (?, ?, CURRENT_TIMESTAMP)
        `).bind(tagName, tagName.toLowerCase().replace(/\s+/g, '-')).run()
        
        // Obter ID da tag
        const tagResult = await c.env.DB.prepare(`
          SELECT id FROM tags WHERE name = ?
        `).bind(tagName).first<{ id: number }>()
        
        if (tagResult) {
          // Associar tag à imagem
          await c.env.DB.prepare(`
            INSERT OR IGNORE INTO ai_image_tags (image_id, tag_id, created_at) 
            VALUES (?, ?, CURRENT_TIMESTAMP)
          `).bind(imageId, tagResult.id).run()
          
          // Incrementar contador de uso da tag
          await c.env.DB.prepare(`
            UPDATE tags SET usage_count = usage_count + 1 WHERE id = ?
          `).bind(tagResult.id).run()
        }
      }
    }

    // Atualizar estatísticas globais
    await c.env.DB.prepare(`
      INSERT OR REPLACE INTO global_stats (stat_name, stat_value, updated_at) 
      VALUES ('total_images', (SELECT COUNT(*) FROM ai_images), CURRENT_TIMESTAMP)
    `).run()

    // Retornar sucesso com dados da imagem
    const newImage = await c.env.DB.prepare(`
      SELECT ai.*, c.name as category_name, c.slug as category_slug
      FROM ai_images ai
      LEFT JOIN categories c ON ai.category_id = c.id
      WHERE ai.id = ?
    `).bind(imageId).first()

    return c.json({
      success: true,
      message: 'Upload realizado com sucesso!',
      data: {
        id: imageId,
        image: newImage,
        status: 'pending_approval'
      }
    })

  } catch (error) {
    console.error('Erro no upload:', error)
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro interno do servidor' 
    }, 500)
  }
})

// =========================================
// Categorias Dinâmicas
// =========================================

app.get('/api/categories', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const categories = await c.env.DB.prepare(`
      SELECT c.*, 
             COUNT(ai.id) as images_count,
             COUNT(CASE WHEN ai.is_featured = 1 THEN 1 END) as featured_count
      FROM categories c
      LEFT JOIN ai_images ai ON c.id = ai.category_id AND ai.status = 'approved'
      WHERE c.is_active = 1
      GROUP BY c.id
      ORDER BY c.sort_order ASC, c.name ASC
    `).all()

    return c.json({ success: true, data: categories.results || [] })
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

// =========================================
// Ações de Imagens (Like, Share, Download)
// =========================================

app.post('/api/images/:id/like', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ success: false, error: 'Database não disponível' }, 500)
    }

    const imageId = parseInt(c.req.param('id'))
    if (isNaN(imageId)) {
      return c.json({ success: false, error: 'ID inválido' }, 400)
    }

    // Por enquanto, apenas incrementar o contador (sem autenticação)
    const result = await c.env.DB.prepare(`
      UPDATE ai_images 
      SET like_count = like_count + 1, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ? AND status = 'approved'
    `).bind(imageId).run()

    if (result.changes === 0) {
      return c.json({ success: false, error: 'Imagem não encontrada' }, 404)
    }

    // Buscar contador atualizado
    const image = await c.env.DB.prepare(`
      SELECT like_count FROM ai_images WHERE id = ?
    `).bind(imageId).first<{ like_count: number }>()

    return c.json({ 
      success: true, 
      data: { 
        liked: true, 
        like_count: image?.like_count || 0 
      }
    })

  } catch (error) {
    console.error('Erro ao curtir imagem:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

app.post('/api/images/:id/share', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ success: false, error: 'Database não disponível' }, 500)
    }

    const imageId = parseInt(c.req.param('id'))
    if (isNaN(imageId)) {
      return c.json({ success: false, error: 'ID inválido' }, 400)
    }

    // Incrementar contador de compartilhamentos
    await c.env.DB.prepare(`
      UPDATE ai_images 
      SET share_count = share_count + 1, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ? AND status = 'approved'
    `).bind(imageId).run()

    // Buscar dados da imagem para compartilhamento
    const image = await c.env.DB.prepare(`
      SELECT title, description, image_url FROM ai_images WHERE id = ?
    `).bind(imageId).first<{ title: string, description: string, image_url: string }>()

    if (!image) {
      return c.json({ success: false, error: 'Imagem não encontrada' }, 404)
    }

    const shareUrl = `${c.req.url.replace('/api/images/' + imageId + '/share', '/galeria#image-' + imageId)}`

    return c.json({ 
      success: true, 
      data: {
        title: image.title,
        description: image.description,
        url: shareUrl,
        image_url: image.image_url
      }
    })

  } catch (error) {
    console.error('Erro ao compartilhar imagem:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

// =========================================
// PÁGINAS DO PORTAL
// =========================================

// =========================================
// NAVEGAÇÃO E ROTAS PRINCIPAIS
// =========================================

// Página Showcase (placeholder)
app.get('/showcase', (c) => {
  return c.render(
    <Layout currentPage="showcase">
      <div class="text-center py-12">
        <div class="w-24 h-24 bg-gradient-to-br from-ai-primary to-ai-secondary rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-rocket text-white text-3xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Hub de Showcase</h1>
        <p class="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          Explore projetos incríveis da comunidade de IA. Descubra demonstrações, códigos e inovações.
        </p>
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 max-w-md mx-auto">
          <p class="text-sm text-gray-600 mb-4">🚧 Em desenvolvimento</p>
          <a href="/galeria" class="ai-button-primary text-white px-6 py-3 rounded-lg font-semibold">
            <i class="fas fa-images mr-2"></i>
            Ver Galeria Enquanto Isso
          </a>
        </div>
      </div>
    </Layout>,
    { title: 'Showcase de IAs' }
  )
})

// Página Tutoriais (placeholder)
app.get('/tutoriais', (c) => {
  return c.render(
    <Layout currentPage="tutoriais">
      <div class="text-center py-12">
        <div class="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-graduation-cap text-white text-3xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Tutoriais Educativos</h1>
        <p class="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
          Aprenda IA do zero ao avançado com nossos tutoriais práticos e projetos guiados.
        </p>
        <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 max-w-md mx-auto">
          <p class="text-sm text-gray-600 mb-4">📚 Em preparação</p>
          <a href="/galeria" class="ai-button-primary text-white px-6 py-3 rounded-lg font-semibold">
            <i class="fas fa-images mr-2"></i>
            Explorar Galeria
          </a>
        </div>
      </div>
    </Layout>,
    { title: 'Tutoriais' }
  )
})

// Página Upload (redirect para galeria com modal)
app.get('/upload', (c) => {
  return c.redirect('/galeria?upload=true')
})

// Página da Galeria
app.get('/galeria', async (c) => {
  try {
    // Buscar categorias e imagens em destaque
    let categories = [];
    let featuredImages = [];

    if (c.env?.DB) {
      // Buscar categorias
      const categoriesQuery = await c.env.DB.prepare(`
        SELECT * FROM categories 
        WHERE is_active = 1 
        ORDER BY sort_order ASC, name ASC
      `).all();
      categories = categoriesQuery.results || [];

      // Buscar imagens em destaque
      featuredImages = await ImageQueries.getFeatured(c.env.DB, 8);
    }

    return c.render(
      <Layout currentPage="galeria">
        <Gallery images={featuredImages} categories={categories} />
        <Lightbox />
        <UploadModal categories={categories} />
      </Layout>,
      { title: 'Galeria de IAs' }
    )
  } catch (error) {
    console.error('Erro na página da galeria:', error);
    return c.render(
      <Layout currentPage="galeria">
        <div class="text-center py-12">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">Erro ao carregar galeria</h1>
          <p class="text-gray-600">Tente novamente em alguns instantes</p>
        </div>
      </Layout>,
      { title: 'Erro - Galeria' }
    )
  }
})

export default app
