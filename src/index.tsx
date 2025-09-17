import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { Layout } from './components/Layout'
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

export default app
