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
        {/* Hero Section - Melhorado para mobile */}
        <div class="bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10">
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Portal Educativo IA & Tecnologia
            </h1>
            <p class="text-lg sm:text-xl mb-6 text-white/90">
              Descubra, aprenda e explore o fascinante mundo da Inteligência Artificial
            </p>
            <div class="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a href="/galeria" class="bg-white/20 hover:bg-white/30 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm text-center">
                <i class="fas fa-images mr-2"></i>
                Explorar Galeria
              </a>
              <a href="/tutoriais" class="bg-white/20 hover:bg-white/30 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm text-center">
                <i class="fas fa-book-open mr-2"></i>
                Ver Tutoriais
              </a>
            </div>
          </div>
        </div>

        {/* Estatísticas - Melhorado para mobile */}
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" id="stats-cards">
          <div class="ai-card p-4 sm:p-6 text-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <i class="fas fa-images text-blue-600 text-lg sm:text-xl"></i>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2" id="stat-images">...</h3>
            <p class="text-xs sm:text-sm text-gray-600">Imagens de IA</p>
          </div>
          
          <div class="ai-card p-4 sm:p-6 text-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <i class="fas fa-book-open text-green-600 text-lg sm:text-xl"></i>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2" id="stat-tutorials">...</h3>
            <p class="text-xs sm:text-sm text-gray-600">Tutoriais</p>
          </div>
          
          <div class="ai-card p-4 sm:p-6 text-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <i class="fas fa-rocket text-purple-600 text-lg sm:text-xl"></i>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2" id="stat-showcases">...</h3>
            <p class="text-xs sm:text-sm text-gray-600">Projetos</p>
          </div>
          
          <div class="ai-card p-4 sm:p-6 text-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <i class="fas fa-users text-orange-600 text-lg sm:text-xl"></i>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2" id="stat-users">...</h3>
            <p class="text-xs sm:text-sm text-gray-600">Usuários</p>
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
            
            <div class="grid grid-cols-2 gap-4" id="featured-gallery">
              <div class="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-spinner fa-spin text-2xl text-purple-400"></i>
              </div>
              <div class="aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-spinner fa-spin text-2xl text-blue-400"></i>
              </div>
              <div class="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-spinner fa-spin text-2xl text-green-400"></i>
              </div>
              <div class="aspect-square bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-spinner fa-spin text-2xl text-orange-400"></i>
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
      
      {/* Scripts específicos da home */}
      <script src="/static/js/dashboard.js"></script>
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

    // Validar tipo de arquivo (imagens e vídeos)
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')
    
    if (!isImage && !isVideo) {
      return c.json({ success: false, error: 'Arquivo deve ser uma imagem ou vídeo' }, 400)
    }

    // Validar tamanho (10MB para imagens, 50MB para vídeos)
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    const maxSizeText = isVideo ? '50MB' : '10MB'
    
    if (file.size > maxSize) {
      return c.json({ success: false, error: `Arquivo muito grande (máx. ${maxSizeText})` }, 400)
    }

    // Obter metadados do formulário
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const categoryId = parseInt(formData.get('category_id') as string)
    const promptUsed = formData.get('prompt_used') as string
    const aiModel = formData.get('ai_model') as string
    const tags = formData.get('tags') as string
    const isFeatured = formData.get('is_featured') === '1'
    const contentType = isVideo ? 'video' : 'image'

    // Validar campos obrigatórios
    if (!title || !categoryId) {
      return c.json({ success: false, error: 'Título e categoria são obrigatórios' }, 400)
    }

    // Simular processamento de arquivo (em produção, usar Cloudflare R2)
    const fileExtension = file.name.split('.').pop() || (isVideo ? 'mp4' : 'jpg')
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`
    
    // URLs simuladas (em produção, seria o R2 bucket)
    let imageUrl, thumbnailUrl
    
    if (isVideo) {
      // URLs simuladas para vídeo
      imageUrl = `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`
      thumbnailUrl = `https://via.placeholder.com/400x300/dc2626/ffffff?text=${encodeURIComponent('Vídeo: ' + title.substring(0, 10))}`
    } else {
      // URLs simuladas para imagem
      imageUrl = `https://via.placeholder.com/800x600/6366f1/ffffff?text=${encodeURIComponent(title.substring(0, 20))}`
      thumbnailUrl = `https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodeURIComponent(title.substring(0, 15))}`
    }

    // Determinar tabela de destino baseada no tipo de conteúdo
    let insertResult
    
    if (isVideo) {
      // Inserir na tabela tutorials para vídeos
      insertResult = await c.env.DB.prepare(`
        INSERT INTO tutorials (
          title, description, video_url, thumbnail_url, file_size, file_format,
          category_id, is_featured, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        title,
        description || null,
        imageUrl, // video_url
        thumbnailUrl,
        file.size,
        fileExtension,
        categoryId,
        isFeatured ? 1 : 0,
        'published' // Status inicial para vídeos
      ).run()
    } else {
      // Inserir na tabela ai_images para imagens
      insertResult = await c.env.DB.prepare(`
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
        'pending' // Status inicial para imagens
      ).run()
    }

    if (!insertResult.success) {
      throw new Error('Falha ao salvar no banco de dados')
    }

    const recordId = insertResult.meta.last_row_id
    const tableName = isVideo ? 'tutorials' : 'ai_images'

    // Processar tags se fornecidas (apenas para imagens)
    if (!isVideo && tags && tags.trim()) {
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
          `).bind(recordId, tagResult.id).run()
          
          // Incrementar contador de uso da tag
          await c.env.DB.prepare(`
            UPDATE tags SET usage_count = usage_count + 1 WHERE id = ?
          `).bind(tagResult.id).run()
        }
      }
    }

    // Atualizar estatísticas globais
    if (isVideo) {
      await c.env.DB.prepare(`
        INSERT OR REPLACE INTO global_stats (stat_name, stat_value, updated_at) 
        VALUES ('total_tutorials', (SELECT COUNT(*) FROM tutorials), CURRENT_TIMESTAMP)
      `).run()
    } else {
      await c.env.DB.prepare(`
        INSERT OR REPLACE INTO global_stats (stat_name, stat_value, updated_at) 
        VALUES ('total_images', (SELECT COUNT(*) FROM ai_images), CURRENT_TIMESTAMP)
      `).run()
    }

    // Retornar sucesso com dados do registro
    const query = isVideo ? `
      SELECT t.*, c.name as category_name, c.slug as category_slug
      FROM tutorials t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.id = ?
    ` : `
      SELECT ai.*, c.name as category_name, c.slug as category_slug
      FROM ai_images ai
      LEFT JOIN categories c ON ai.category_id = c.id
      WHERE ai.id = ?
    `

    const newRecord = await c.env.DB.prepare(query).bind(recordId).first()

    return c.json({
      success: true,
      message: `${contentType === 'video' ? 'Vídeo' : 'Imagem'} enviado(a) com sucesso!`,
      data: {
        id: recordId,
        type: contentType,
        record: newRecord,
        table: tableName,
        status: isVideo ? 'published' : 'pending_approval'
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
// Estatísticas Globais
// =========================================

app.get('/api/stats/global', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    // Buscar estatísticas em paralelo para melhor performance
    const [imagesCount, tutorialsCount, showcasesCount, categoriesCount] = await Promise.all([
      // Total de imagens aprovadas
      c.env.DB.prepare('SELECT COUNT(*) as count FROM ai_images WHERE status = ?')
        .bind('approved').first<{ count: number }>(),
      
      // Total de tutoriais publicados
      c.env.DB.prepare('SELECT COUNT(*) as count FROM tutorials WHERE status = ?')
        .bind('published').first<{ count: number }>(),
      
      // Total de showcases ativos
      c.env.DB.prepare('SELECT COUNT(*) as count FROM ai_showcases WHERE status = ?')
        .bind('published').first<{ count: number }>(),
      
      // Total de categorias ativas
      c.env.DB.prepare('SELECT COUNT(*) as count FROM categories WHERE is_active = ?')
        .bind(1).first<{ count: number }>()
    ])

    // Buscar estatísticas de engajamento
    const [totalLikes, totalShares, totalViews] = await Promise.all([
      c.env.DB.prepare('SELECT COALESCE(SUM(like_count), 0) as total FROM ai_images')
        .first<{ total: number }>(),
      c.env.DB.prepare('SELECT COALESCE(SUM(share_count), 0) as total FROM ai_images')
        .first<{ total: number }>(),
      c.env.DB.prepare('SELECT COALESCE(SUM(view_count), 0) as total FROM ai_images')
        .first<{ total: number }>()
    ])

    // Calcular estatística fictícia de usuários ativos (baseada no engajamento)
    const baseUsers = 50 // Base mínima de usuários
    const engagementFactor = Math.floor((totalLikes?.total || 0) / 10) // 1 usuário a cada 10 likes
    const estimatedActiveUsers = baseUsers + engagementFactor

    return c.json({
      success: true,
      data: {
        images: imagesCount?.count || 0,
        tutorials: tutorialsCount?.count || 0,
        showcases: showcasesCount?.count || 0,
        users: estimatedActiveUsers,
        engagement: {
          total_likes: totalLikes?.total || 0,
          total_shares: totalShares?.total || 0,
          total_views: totalViews?.total || 0
        },
        categories: categoriesCount?.count || 0,
        updated_at: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Erro ao buscar estatísticas globais:', error)
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

// API para deletar imagem
app.delete('/api/images/:id', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ success: false, error: 'Database não disponível' }, 500)
    }

    const imageId = parseInt(c.req.param('id'))
    if (isNaN(imageId)) {
      return c.json({ success: false, error: 'ID inválido' }, 400)
    }

    // Verificar se a imagem existe
    const image = await c.env.DB.prepare(`
      SELECT id, title FROM ai_images WHERE id = ?
    `).bind(imageId).first<{ id: number, title: string }>()

    if (!image) {
      return c.json({ success: false, error: 'Imagem não encontrada' }, 404)
    }

    // Deletar relacionamentos de tags primeiro (integridade referencial)
    await c.env.DB.prepare(`
      DELETE FROM ai_image_tags WHERE image_id = ?
    `).bind(imageId).run()

    // Deletar a imagem
    const deleteResult = await c.env.DB.prepare(`
      DELETE FROM ai_images WHERE id = ?
    `).bind(imageId).run()

    if (deleteResult.changes === 0) {
      return c.json({ success: false, error: 'Falha ao deletar imagem' }, 500)
    }

    return c.json({ 
      success: true, 
      message: `Imagem "${image.title}" deletada com sucesso`,
      deleted_id: imageId
    })

  } catch (error) {
    console.error('Erro ao deletar imagem:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

// API para deletar tutorial
app.delete('/api/tutorials/:id', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ success: false, error: 'Database não disponível' }, 500)
    }

    const tutorialId = parseInt(c.req.param('id'))
    if (isNaN(tutorialId)) {
      return c.json({ success: false, error: 'ID inválido' }, 400)
    }

    // Verificar se o tutorial existe
    const tutorial = await c.env.DB.prepare(`
      SELECT id, title FROM tutorials WHERE id = ?
    `).bind(tutorialId).first<{ id: number, title: string }>()

    if (!tutorial) {
      return c.json({ success: false, error: 'Tutorial não encontrado' }, 404)
    }

    // Deletar o tutorial
    const deleteResult = await c.env.DB.prepare(`
      DELETE FROM tutorials WHERE id = ?
    `).bind(tutorialId).run()

    if (deleteResult.changes === 0) {
      return c.json({ success: false, error: 'Falha ao deletar tutorial' }, 500)
    }

    return c.json({ 
      success: true, 
      message: `Tutorial "${tutorial.title}" deletado com sucesso`,
      deleted_id: tutorialId
    })

  } catch (error) {
    console.error('Erro ao deletar tutorial:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

// =========================================
// PÁGINAS DO PORTAL
// =========================================

// =========================================
// NAVEGAÇÃO E ROTAS PRINCIPAIS
// =========================================

// Página Showcase - Funcional
app.get('/showcase', async (c) => {
  return c.render(
    <Layout currentPage="showcase">
      <div class="space-y-8">
        {/* Hero Section */}
        <div class="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-2xl p-8 text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10">
            <div class="flex items-center mb-4">
              <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-6">
                <i class="fas fa-rocket text-3xl"></i>
              </div>
              <div>
                <h1 class="text-4xl font-bold mb-2">Showcase de IAs</h1>
                <p class="text-xl text-white/90">Projetos incríveis da comunidade</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-4 mt-6">
              <button class="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm">
                <i class="fas fa-plus mr-2"></i>
                Submeter Projeto
              </button>
              <button class="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm">
                <i class="fas fa-trophy mr-2"></i>
                Projetos Premiados
              </button>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-project-diagram text-purple-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">42</h3>
            <p class="text-sm text-gray-600">Projetos Ativos</p>
          </div>
          
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-users text-pink-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">156</h3>
            <p class="text-sm text-gray-600">Desenvolvedores</p>
          </div>
          
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-star text-red-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">2.8k</h3>
            <p class="text-sm text-gray-600">Estrelas GitHub</p>
          </div>
          
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-download text-orange-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">12.4k</h3>
            <p class="text-sm text-gray-600">Downloads</p>
          </div>
        </div>

        {/* Categorias de Projetos */}
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            <i class="fas fa-layer-group text-ai-primary mr-2"></i>
            Categorias de Projetos
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button class="ai-card p-6 text-center hover:shadow-lg transition-all group">
              <div class="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <i class="fas fa-eye text-blue-600 text-xl"></i>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">Computer Vision</h3>
              <p class="text-sm text-gray-600">12 projetos</p>
            </button>
            
            <button class="ai-card p-6 text-center hover:shadow-lg transition-all group">
              <div class="w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <i class="fas fa-comments text-green-600 text-xl"></i>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">NLP & Chatbots</h3>
              <p class="text-sm text-gray-600">8 projetos</p>
            </button>
            
            <button class="ai-card p-6 text-center hover:shadow-lg transition-all group">
              <div class="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <i class="fas fa-magic text-purple-600 text-xl"></i>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">IA Generativa</h3>
              <p class="text-sm text-gray-600">15 projetos</p>
            </button>
            
            <button class="ai-card p-6 text-center hover:shadow-lg transition-all group">
              <div class="w-12 h-12 bg-orange-100 group-hover:bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <i class="fas fa-robot text-orange-600 text-xl"></i>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">Robótica</h3>
              <p class="text-sm text-gray-600">7 projetos</p>
            </button>
          </div>
        </div>

        {/* Projetos em Destaque */}
        <div>
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">
              <i class="fas fa-fire text-orange-500 mr-2"></i>
              Projetos em Destaque
            </h2>
            <button class="text-ai-primary hover:text-ai-secondary font-medium">
              Ver todos <i class="fas fa-arrow-right ml-1"></i>
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Projeto 1 */}
            <div class="ai-card overflow-hidden hover:shadow-xl transition-all group">
              <div class="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div class="text-center text-white">
                    <i class="fas fa-play-circle text-5xl mb-2 opacity-80 group-hover:opacity-100 transition-opacity"></i>
                    <p class="text-sm font-medium">Demo Interativa</p>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Computer Vision</span>
                  <div class="flex items-center text-gray-500 text-sm">
                    <i class="fas fa-star text-yellow-500 mr-1"></i>
                    <span>4.8</span>
                  </div>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Detector de Objetos em Tempo Real</h3>
                <p class="text-gray-600 text-sm mb-4">Sistema de detecção de objetos usando YOLO v8 com interface web interativa.</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center text-sm text-gray-500">
                    <i class="fas fa-user-circle mr-2"></i>
                    <span>@dev_pedro</span>
                  </div>
                  <div class="flex space-x-2">
                    <button class="bg-ai-primary text-white px-3 py-1 rounded text-sm font-medium hover:bg-ai-secondary transition-colors">
                      Demo
                    </button>
                    <button class="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                      Código
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Projeto 2 */}
            <div class="ai-card overflow-hidden hover:shadow-xl transition-all group">
              <div class="aspect-video bg-gradient-to-br from-green-500 to-teal-600 relative overflow-hidden">
                <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div class="text-center text-white">
                    <i class="fas fa-comments text-5xl mb-2 opacity-80 group-hover:opacity-100 transition-opacity"></i>
                    <p class="text-sm font-medium">Chatbot Ativo</p>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                  <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">NLP</span>
                  <div class="flex items-center text-gray-500 text-sm">
                    <i class="fas fa-star text-yellow-500 mr-1"></i>
                    <span>4.6</span>
                  </div>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Assistente Virtual Inteligente</h3>
                <p class="text-gray-600 text-sm mb-4">Chatbot com processamento de linguagem natural avançado e memória contextual.</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center text-sm text-gray-500">
                    <i class="fas fa-user-circle mr-2"></i>
                    <span>@ana_dev</span>
                  </div>
                  <div class="flex space-x-2">
                    <button class="bg-ai-primary text-white px-3 py-1 rounded text-sm font-medium hover:bg-ai-secondary transition-colors">
                      Testar
                    </button>
                    <button class="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                      Código
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Projeto 3 */}
            <div class="ai-card overflow-hidden hover:shadow-xl transition-all group">
              <div class="aspect-video bg-gradient-to-br from-purple-500 to-pink-600 relative overflow-hidden">
                <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div class="text-center text-white">
                    <i class="fas fa-image text-5xl mb-2 opacity-80 group-hover:opacity-100 transition-opacity"></i>
                    <p class="text-sm font-medium">Gerador Ativo</p>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                  <span class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Generativa</span>
                  <div class="flex items-center text-gray-500 text-sm">
                    <i class="fas fa-star text-yellow-500 mr-1"></i>
                    <span>4.9</span>
                  </div>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Gerador de Arte com IA</h3>
                <p class="text-gray-600 text-sm mb-4">Crie obras de arte únicas usando modelos de difusão estável e prompts criativos.</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center text-sm text-gray-500">
                    <i class="fas fa-user-circle mr-2"></i>
                    <span>@art_ai</span>
                  </div>
                  <div class="flex space-x-2">
                    <button class="bg-ai-primary text-white px-3 py-1 rounded text-sm font-medium hover:bg-ai-secondary transition-colors">
                      Criar
                    </button>
                    <button class="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                      Código
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>,
    { title: 'Showcase de IAs' }
  )
})

// Página Tutoriais - Funcional
app.get('/tutoriais', async (c) => {
  return c.render(
    <Layout currentPage="tutoriais">
      <div class="space-y-8">
        {/* Header Section */}
        <div class="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10">
            <div class="flex items-center mb-4">
              <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-6">
                <i class="fas fa-graduation-cap text-3xl"></i>
              </div>
              <div>
                <h1 class="text-4xl font-bold mb-2">Tutoriais de IA</h1>
                <p class="text-xl text-white/90">Aprenda do básico ao avançado</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-4 mt-6">
              <button class="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm">
                <i class="fas fa-filter mr-2"></i>
                Filtrar por Nível
              </button>
              <button class="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm">
                <i class="fas fa-clock mr-2"></i>
                Ordenar por Tempo
              </button>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-play-circle text-green-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">24</h3>
            <p class="text-sm text-gray-600">Vídeo Tutoriais</p>
          </div>
          
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-code text-blue-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">18</h3>
            <p class="text-sm text-gray-600">Projetos Práticos</p>
          </div>
          
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-certificate text-purple-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">6</h3>
            <p class="text-sm text-gray-600">Certificações</p>
          </div>
          
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-users text-orange-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">1.2k</h3>
            <p class="text-sm text-gray-600">Estudantes</p>
          </div>
        </div>

        {/* Trilhas de Aprendizado */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Iniciante */}
          <div class="ai-card p-6 border-l-4 border-green-500">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <i class="fas fa-seedling text-green-600"></i>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">Iniciante</h3>
                <p class="text-sm text-gray-600">Fundamentos de IA</p>
              </div>
            </div>
            <ul class="space-y-3 mb-6">
              <li class="flex items-center text-gray-700">
                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                Introdução à IA
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                Python para IA
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                Primeiro Projeto
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-clock text-gray-400 mr-3"></i>
                Machine Learning Básico
              </li>
            </ul>
            <button class="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
              Iniciar Trilha
            </button>
          </div>

          {/* Intermediário */}
          <div class="ai-card p-6 border-l-4 border-blue-500">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <i class="fas fa-chart-line text-blue-600"></i>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">Intermediário</h3>
                <p class="text-sm text-gray-600">Aprofundamento</p>
              </div>
            </div>
            <ul class="space-y-3 mb-6">
              <li class="flex items-center text-gray-700">
                <i class="fas fa-check-circle text-blue-500 mr-3"></i>
                Deep Learning
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-check-circle text-blue-500 mr-3"></i>
                Computer Vision
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-clock text-gray-400 mr-3"></i>
                Processamento de Linguagem
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-clock text-gray-400 mr-3"></i>
                Redes Neurais Avançadas
              </li>
            </ul>
            <button class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Continuar Trilha
            </button>
          </div>

          {/* Avançado */}
          <div class="ai-card p-6 border-l-4 border-purple-500">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <i class="fas fa-rocket text-purple-600"></i>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">Avançado</h3>
                <p class="text-sm text-gray-600">Especialização</p>
              </div>
            </div>
            <ul class="space-y-3 mb-6">
              <li class="flex items-center text-gray-700">
                <i class="fas fa-lock text-gray-400 mr-3"></i>
                IA Generativa
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-lock text-gray-400 mr-3"></i>
                Reinforcement Learning
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-lock text-gray-400 mr-3"></i>
                MLOps e Deploy
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-lock text-gray-400 mr-3"></i>
                Projetos Enterprise
              </li>
            </ul>
            <button class="w-full bg-gray-300 text-gray-600 py-3 rounded-lg font-semibold cursor-not-allowed">
              Em Breve
            </button>
          </div>
        </div>

        {/* Tutoriais Recentes */}
        <div>
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">
              <i class="fas fa-star text-yellow-500 mr-2"></i>
              Tutoriais em Destaque
            </h2>
            <button class="text-ai-primary hover:text-ai-secondary font-medium">
              Ver todos <i class="fas fa-arrow-right ml-1"></i>
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tutorial 1 */}
            <div class="ai-card overflow-hidden hover:shadow-lg transition-shadow">
              <div class="aspect-video bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <i class="fas fa-play-circle text-4xl text-green-600"></i>
              </div>
              <div class="p-6">
                <div class="flex items-center mb-3">
                  <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">Iniciante</span>
                  <span class="text-sm text-gray-500">15 min</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Introdução ao Machine Learning</h3>
                <p class="text-gray-600 text-sm mb-4">Aprenda os conceitos fundamentais do aprendizado de máquina de forma prática.</p>
                <button class="w-full bg-ai-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-ai-secondary transition-colors">
                  Assistir Tutorial
                </button>
              </div>
            </div>

            {/* Tutorial 2 */}
            <div class="ai-card overflow-hidden hover:shadow-lg transition-shadow">
              <div class="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <i class="fas fa-play-circle text-4xl text-blue-600"></i>
              </div>
              <div class="p-6">
                <div class="flex items-center mb-3">
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">Intermediário</span>
                  <span class="text-sm text-gray-500">32 min</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Criando uma Rede Neural</h3>
                <p class="text-gray-600 text-sm mb-4">Construa sua primeira rede neural do zero usando Python e TensorFlow.</p>
                <button class="w-full bg-ai-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-ai-secondary transition-colors">
                  Assistir Tutorial
                </button>
              </div>
            </div>

            {/* Tutorial 3 */}
            <div class="ai-card overflow-hidden hover:shadow-lg transition-shadow">
              <div class="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <i class="fas fa-play-circle text-4xl text-purple-600"></i>
              </div>
              <div class="p-6">
                <div class="flex items-center mb-3">
                  <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">Iniciante</span>
                  <span class="text-sm text-gray-500">22 min</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Computer Vision com OpenCV</h3>
                <p class="text-gray-600 text-sm mb-4">Detecte objetos em imagens usando técnicas de visão computacional.</p>
                <button class="w-full bg-ai-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-ai-secondary transition-colors">
                  Assistir Tutorial
                </button>
              </div>
            </div>
          </div>
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
        
        {/* Scripts específicos da galeria */}
        <script src="/static/js/gallery.js"></script>
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
