-- =========================================
-- Portal Educativo IA & Tecnologia
-- Migração Inicial - Schema Completo
-- Data: 2025-09-17
-- =========================================

-- Tabela de usuários/perfis
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'moderator', 'admin')),
    profile_data JSON, -- dados adicionais do perfil (skills, links sociais, etc.)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT 1
);

-- Tabela de categorias (para organização de conteúdo)
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#6366f1', -- cor hexadecimal para UI
    icon TEXT DEFAULT 'fas fa-folder', -- classe do ícone FontAwesome
    parent_id INTEGER, -- para subcategorias
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Tabela de tags (sistema de etiquetagem flexível)
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    color TEXT DEFAULT '#64748b',
    usage_count INTEGER DEFAULT 0, -- contador para tags mais populares
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela principal de imagens IA (galeria)
CREATE TABLE IF NOT EXISTS ai_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    prompt_used TEXT, -- prompt que gerou a imagem
    ai_model TEXT, -- modelo de IA usado (DALL-E, Midjourney, etc.)
    
    -- URLs e metadados do arquivo
    image_url TEXT NOT NULL, -- URL da imagem original
    thumbnail_url TEXT, -- URL da thumbnail
    file_size INTEGER, -- tamanho em bytes
    dimensions TEXT, -- dimensões como "1024x768"
    file_format TEXT DEFAULT 'jpg', -- formato do arquivo
    
    -- Relacionamentos
    user_id INTEGER,
    category_id INTEGER,
    
    -- Controle de qualidade e moderação
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'featured')),
    moderation_notes TEXT,
    moderated_by INTEGER,
    moderated_at DATETIME,
    
    -- Engajamento e estatísticas
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    download_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    
    -- Configurações de exibição
    is_featured BOOLEAN DEFAULT 0, -- destaque na galeria
    is_public BOOLEAN DEFAULT 1, -- visibilidade pública
    featured_at DATETIME, -- quando foi destacada
    
    -- Metadados adicionais
    metadata JSON, -- dados extras (configurações do modelo, seeds, etc.)
    
    -- Controle temporal
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Chaves estrangeiras
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (moderated_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabela de tutoriais educativos
CREATE TABLE IF NOT EXISTS tutorials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    content TEXT NOT NULL, -- conteúdo em markdown ou HTML
    
    -- Metadados educacionais
    difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    estimated_time INTEGER, -- tempo estimado em minutos
    prerequisites TEXT, -- pré-requisitos
    
    -- Relacionamentos
    author_id INTEGER,
    category_id INTEGER,
    
    -- URLs e recursos
    cover_image_url TEXT,
    video_url TEXT, -- URL de vídeo tutorial (YouTube, Vimeo, etc.)
    demo_url TEXT, -- URL de demonstração
    github_url TEXT, -- repositório relacionado
    
    -- Status e moderação
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    is_featured BOOLEAN DEFAULT 0,
    
    -- Estatísticas
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    completion_count INTEGER DEFAULT 0, -- quantas pessoas completaram
    
    -- Controle temporal
    published_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Chaves estrangeiras
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Tabela de projetos showcase (hub de IAs)
CREATE TABLE IF NOT EXISTS ai_showcases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    
    -- Detalhes técnicos
    ai_type TEXT NOT NULL, -- tipo de IA (chatbot, vision, nlp, etc.)
    technology_stack JSON, -- tecnologias usadas
    model_info JSON, -- informações do modelo de IA
    
    -- URLs e recursos
    demo_url TEXT, -- URL da demonstração
    github_url TEXT,
    documentation_url TEXT,
    image_urls JSON, -- array de URLs de imagens
    
    -- Relacionamentos
    creator_id INTEGER,
    category_id INTEGER,
    
    -- Status e aprovação
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'featured')),
    is_open_source BOOLEAN DEFAULT 0,
    
    -- Estatísticas
    view_count INTEGER DEFAULT 0,
    star_count INTEGER DEFAULT 0,
    fork_count INTEGER DEFAULT 0, -- para projetos open source
    
    -- Controle temporal
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    -- Chaves estrangeiras
    FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Tabela de relacionamento: imagens x tags (many-to-many)
CREATE TABLE IF NOT EXISTS ai_image_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (image_id) REFERENCES ai_images(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE(image_id, tag_id)
);

-- Tabela de relacionamento: tutoriais x tags
CREATE TABLE IF NOT EXISTS tutorial_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tutorial_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (tutorial_id) REFERENCES tutorials(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE(tutorial_id, tag_id)
);

-- Tabela de relacionamento: showcases x tags
CREATE TABLE IF NOT EXISTS showcase_tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    showcase_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (showcase_id) REFERENCES ai_showcases(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE(showcase_id, tag_id)
);

-- Tabela de favoritos dos usuários
CREATE TABLE IF NOT EXISTS user_favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    item_type TEXT NOT NULL CHECK (item_type IN ('image', 'tutorial', 'showcase')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, item_id, item_type)
);

-- Tabela de comentários (sistema unificado)
CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    
    -- Referência polimórfica
    item_id INTEGER NOT NULL,
    item_type TEXT NOT NULL CHECK (item_type IN ('image', 'tutorial', 'showcase')),
    
    -- Comentários aninhados
    parent_id INTEGER, -- para respostas
    
    -- Moderação
    is_approved BOOLEAN DEFAULT 1,
    moderated_by INTEGER,
    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE,
    FOREIGN KEY (moderated_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Tabela de estatísticas globais (cache de contadores)
CREATE TABLE IF NOT EXISTS global_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    stat_name TEXT UNIQUE NOT NULL,
    stat_value INTEGER NOT NULL DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- ÍNDICES para Performance
-- =========================================

-- Índices para ai_images
CREATE INDEX IF NOT EXISTS idx_ai_images_status ON ai_images(status);
CREATE INDEX IF NOT EXISTS idx_ai_images_category ON ai_images(category_id);
CREATE INDEX IF NOT EXISTS idx_ai_images_user ON ai_images(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_images_featured ON ai_images(is_featured, featured_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_images_created ON ai_images(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_images_popular ON ai_images(view_count DESC, like_count DESC);

-- Índices para tutorials
CREATE INDEX IF NOT EXISTS idx_tutorials_status ON tutorials(status);
CREATE INDEX IF NOT EXISTS idx_tutorials_category ON tutorials(category_id);
CREATE INDEX IF NOT EXISTS idx_tutorials_difficulty ON tutorials(difficulty);
CREATE INDEX IF NOT EXISTS idx_tutorials_published ON tutorials(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_tutorials_popular ON tutorials(view_count DESC, like_count DESC);

-- Índices para ai_showcases
CREATE INDEX IF NOT EXISTS idx_showcases_status ON ai_showcases(status);
CREATE INDEX IF NOT EXISTS idx_showcases_category ON ai_showcases(category_id);
CREATE INDEX IF NOT EXISTS idx_showcases_type ON ai_showcases(ai_type);
CREATE INDEX IF NOT EXISTS idx_showcases_created ON ai_showcases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_showcases_popular ON ai_showcases(view_count DESC, star_count DESC);

-- Índices para relacionamentos many-to-many
CREATE INDEX IF NOT EXISTS idx_image_tags_image ON ai_image_tags(image_id);
CREATE INDEX IF NOT EXISTS idx_image_tags_tag ON ai_image_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_tutorial_tags_tutorial ON tutorial_tags(tutorial_id);
CREATE INDEX IF NOT EXISTS idx_tutorial_tags_tag ON tutorial_tags(tag_id);
CREATE INDEX IF NOT EXISTS idx_showcase_tags_showcase ON showcase_tags(showcase_id);
CREATE INDEX IF NOT EXISTS idx_showcase_tags_tag ON showcase_tags(tag_id);

-- Índices para favoritos e comentários
CREATE INDEX IF NOT EXISTS idx_favorites_user ON user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_item ON user_favorites(item_id, item_type);
CREATE INDEX IF NOT EXISTS idx_comments_item ON comments(item_id, item_type);
CREATE INDEX IF NOT EXISTS idx_comments_user ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent ON comments(parent_id);

-- Índices para categorias e tags
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_tags_usage ON tags(usage_count DESC);