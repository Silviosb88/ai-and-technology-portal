// Gallery.tsx - Galeria Visual Completa de Imagens IA
export const Gallery = ({ images = [], categories = [], currentCategory = null }: { 
  images?: any[], 
  categories?: any[], 
  currentCategory?: string | null 
}) => {
  return (
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header da Galeria */}
      <div class="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-[70px] z-30">
        <div class="p-6">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Título e estatísticas */}
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-ai-primary to-ai-secondary rounded-xl flex items-center justify-center">
                <i class="fas fa-images text-white text-xl"></i>
              </div>
              <div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-ai-primary to-ai-secondary bg-clip-text text-transparent">
                  Galeria de IAs
                </h1>
                <p class="text-sm text-gray-600" id="gallery-stats">
                  {images.length} imagens • {categories.length} categorias
                </p>
              </div>
            </div>

            {/* Controles superiores */}
            <div class="flex flex-col sm:flex-row gap-3">
              {/* Barra de busca */}
              <div class="relative">
                <input 
                  type="text" 
                  id="gallery-search"
                  placeholder="Buscar imagens, prompts, modelos..." 
                  class="w-full sm:w-80 pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-200 focus:border-ai-primary focus:ring-2 focus:ring-ai-primary/20 transition-all"
                />
                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>

              {/* Toggle Destaques */}
              <label class="inline-flex items-center space-x-3 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                <input 
                  type="checkbox" 
                  id="featured-toggle"
                  class="w-4 h-4 text-ai-primary bg-gray-100 border-gray-300 rounded focus:ring-ai-primary focus:ring-2"
                />
                <span class="text-sm font-medium text-gray-700">
                  <i class="fas fa-star text-yellow-500 mr-1"></i>
                  Somente Destaques
                </span>
              </label>

              {/* Botão Modo Edição */}
              <button 
                id="edit-mode-toggle"
                class="px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center space-x-2"
                onclick="window.galleryManager && window.galleryManager.toggleEditMode()"
              >
                <i class="fas fa-edit"></i>
                <span>Modo Edição</span>
              </button>

              {/* Botão Upload */}
              <button 
                id="upload-btn"
                class="ai-button-primary text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <i class="fas fa-cloud-upload-alt"></i>
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex">
        {/* Sidebar de Filtros */}
        <aside class="hidden lg:block w-80 bg-white/90 backdrop-blur-xl border-r border-gray-200/50 min-h-screen sticky top-[140px]">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <i class="fas fa-filter text-ai-primary mr-2"></i>
              Filtros
            </h3>

            {/* Filtro por Categoria */}
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">Categorias</h4>
              <div class="category-filters-container space-y-2">
                <button 
                  class={`category-filter w-full text-left px-3 py-2 mb-2 rounded-lg transition-colors flex items-center ${!currentCategory ? 'bg-ai-primary/10 text-ai-primary border border-ai-primary/20' : 'hover:bg-gray-100 text-gray-700'}`}
                  data-category=""
                >
                  <i class="fas fa-th mr-2 flex-shrink-0"></i>
                  <span class="font-medium flex-1">Todas as Categorias</span>
                </button>
                
                {/* Categorias dinâmicas serão inseridas via JavaScript */}
                {categories.map((category: any) => (
                  <button 
                    class={`category-filter w-full text-left px-3 py-2 mb-2 rounded-lg transition-colors flex items-center ${currentCategory === category.slug ? 'bg-ai-primary/10 text-ai-primary border border-ai-primary/20' : 'hover:bg-gray-100 text-gray-700'}`}
                    data-category={category.slug}
                  >
                    <i class={`${category.icon} mr-2 flex-shrink-0`} style={`color: ${category.color}`}></i>
                    <span class="font-medium flex-1 min-w-0 truncate">{category.name}</span>
                    <span class="text-xs text-gray-500 ml-2 flex-shrink-0">{category.images_count || 0}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filtro por Modelo de IA */}
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">Modelo de IA</h4>
              <div class="space-y-3">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" class="ai-model-filter rounded text-ai-primary flex-shrink-0" value="DALL-E" />
                  <span class="text-sm flex-1">DALL-E 3</span>
                  <span class="text-xs text-gray-400 flex-shrink-0">8</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" class="ai-model-filter rounded text-ai-primary flex-shrink-0" value="Midjourney" />
                  <span class="text-sm flex-1">Midjourney v6</span>
                  <span class="text-xs text-gray-400 flex-shrink-0">15</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" class="ai-model-filter rounded text-ai-primary flex-shrink-0" value="Stable Diffusion" />
                  <span class="text-sm flex-1">Stable Diffusion</span>
                  <span class="text-xs text-gray-400 flex-shrink-0">22</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" class="ai-model-filter rounded text-ai-primary flex-shrink-0" value="Leonardo" />
                  <span class="text-sm flex-1">Leonardo AI</span>
                  <span class="text-xs text-gray-400 flex-shrink-0">6</span>
                </label>
              </div>
            </div>

            {/* Ordenação */}
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">Ordenar Por</h4>
              <select id="sort-select" class="w-full p-2 rounded-lg border border-gray-200 focus:border-ai-primary focus:ring-2 focus:ring-ai-primary/20">
                <option value="created_at_desc">Mais Recentes</option>
                <option value="view_count_desc">Mais Visualizadas</option>
                <option value="like_count_desc">Mais Curtidas</option>
                <option value="title_asc">Nome A-Z</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Área Principal da Galeria */}
        <main class="flex-1 p-6">
          {/* Loading State */}
          <div id="gallery-loading" class="hidden text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-ai-primary mx-auto mb-4"></div>
            <p class="text-gray-600">Carregando imagens...</p>
          </div>

          {/* Grid de Imagens */}
          <div id="gallery-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
            {images.map((image: any) => (
              <div class="ai-image-card group cursor-pointer" data-image-id={image.id}>
                <div class="relative overflow-hidden rounded-xl bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  {/* Badge de Destaque */}
                  {image.is_featured && (
                    <div class="absolute top-3 left-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <i class="fas fa-star mr-1"></i>
                      Destaque
                    </div>
                  )}

                  {/* Imagem */}
                  <div class="aspect-[4/3] overflow-hidden">
                    <img 
                      src={image.thumbnail_url || image.image_url} 
                      alt={image.title}
                      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Overlay com ações */}
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div class="absolute bottom-3 left-3 right-3">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center space-x-2 text-white text-sm">
                            <i class="fas fa-eye"></i>
                            <span>{image.view_count}</span>
                            <i class="fas fa-heart ml-2"></i>
                            <span>{image.like_count}</span>
                          </div>
                          <div class="flex space-x-2">
                            <button class="like-btn p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm" 
                                    data-image-id={image.id} 
                                    data-like-count={image.like_count || 0}>
                              <i class="fas fa-heart text-white"></i>
                            </button>
                            <button class="share-btn p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm" 
                                    data-image-id={image.id}>
                              <i class="fas fa-share text-white"></i>
                            </button>
                            <button class="delete-btn hidden p-2 bg-red-500/80 rounded-full hover:bg-red-600/80 transition-colors backdrop-blur-sm" 
                                    data-image-id={image.id}>
                              <i class="fas fa-trash text-white"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo do Card */}
                  <div class="p-4">
                    <div class="flex items-start justify-between mb-2">
                      <h3 class="font-semibold text-gray-900 line-clamp-2 group-hover:text-ai-primary transition-colors">
                        {image.title}
                      </h3>
                    </div>
                    
                    <p class="text-sm text-gray-600 line-clamp-2 mb-3">
                      {image.description}
                    </p>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-2">
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" style={`background-color: ${image.category_name ? '#f0f9ff' : '#f3f4f6'}; color: ${image.category_name ? '#0369a1' : '#374151'}`}>
                          <i class="fas fa-tag mr-1"></i>
                          {image.category_name || 'Sem categoria'}
                        </span>
                      </div>
                      
                      <div class="text-xs text-gray-500">
                        {image.ai_model && (
                          <span class="inline-flex items-center">
                            <i class="fas fa-robot mr-1"></i>
                            {image.ai_model}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Estado Vazio */}
          <div id="gallery-empty" class="hidden text-center py-12">
            <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-images text-4xl text-gray-400"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Nenhuma imagem encontrada</h3>
            <p class="text-gray-600 mb-6">Tente ajustar os filtros ou fazer uma nova busca</p>
            <button class="ai-button-primary text-white px-6 py-3 rounded-lg font-semibold">
              <i class="fas fa-plus mr-2"></i>
              Adicionar Primeira Imagem
            </button>
          </div>

          {/* Paginação */}
          <div id="gallery-pagination" class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
              <button id="prev-page" class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <i class="fas fa-chevron-left mr-1"></i>
                Anterior
              </button>
              
              <div id="page-numbers" class="flex space-x-1">
              </div>
              
              <button id="next-page" class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Próxima
                <i class="fas fa-chevron-right ml-1"></i>
              </button>
            </nav>
          </div>
        </main>
      </div>
    </div>
  )
}