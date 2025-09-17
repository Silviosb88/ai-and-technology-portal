// Lightbox.tsx - Modal para visualização ampliada de imagens
export const Lightbox = () => {
  return (
    <div id="lightbox-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
      <div class="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center">
        {/* Botão fechar */}
        <button 
          id="lightbox-close" 
          class="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
        >
          <i class="fas fa-times text-xl"></i>
        </button>

        {/* Navegação anterior */}
        <button 
          id="lightbox-prev" 
          class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
        >
          <i class="fas fa-chevron-left text-xl"></i>
        </button>

        {/* Navegação próxima */}
        <button 
          id="lightbox-next" 
          class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm"
        >
          <i class="fas fa-chevron-right text-xl"></i>
        </button>

        {/* Conteúdo principal */}
        <div class="w-full h-full flex flex-col lg:flex-row bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden">
          {/* Área da imagem */}
          <div class="flex-1 relative flex items-center justify-center p-6 min-h-[60vh] lg:min-h-full">
            <div id="lightbox-loading" class="absolute inset-0 flex items-center justify-center">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
            
            <img 
              id="lightbox-image" 
              class="max-w-full max-h-full object-contain rounded-lg shadow-2xl opacity-0 transition-opacity duration-300" 
              alt=""
            />
          </div>

          {/* Painel de informações */}
          <div class="lg:w-96 bg-white/10 backdrop-blur-xl p-6 overflow-y-auto">
            <div class="space-y-6">
              {/* Título e ações */}
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <h2 id="lightbox-title" class="text-xl font-bold text-white mb-2">
                  </h2>
                  <div class="flex items-center space-x-4 text-sm text-white/70">
                    <span id="lightbox-views" class="flex items-center">
                      <i class="fas fa-eye mr-1"></i>
                      <span>0</span>
                    </span>
                    <span id="lightbox-likes" class="flex items-center">
                      <i class="fas fa-heart mr-1"></i>
                      <span>0</span>
                    </span>
                    <span id="lightbox-date" class="flex items-center">
                      <i class="fas fa-calendar mr-1"></i>
                      <span></span>
                    </span>
                  </div>
                </div>
                
                <div class="flex space-x-2 ml-4">
                  <button 
                    id="lightbox-like-btn" 
                    class="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                  >
                    <i class="far fa-heart text-white"></i>
                  </button>
                  <button 
                    id="lightbox-share-btn" 
                    class="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                  >
                    <i class="fas fa-share text-white"></i>
                  </button>
                  <button 
                    id="lightbox-download-btn" 
                    class="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                  >
                    <i class="fas fa-download text-white"></i>
                  </button>
                </div>
              </div>

              {/* Descrição */}
              <div>
                <h3 class="text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">Descrição</h3>
                <p id="lightbox-description" class="text-white/80 text-sm leading-relaxed">
                </p>
              </div>

              {/* Prompt usado */}
              <div id="lightbox-prompt-section">
                <h3 class="text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">Prompt Usado</h3>
                <div class="bg-white/5 rounded-lg p-3 border border-white/10">
                  <p id="lightbox-prompt" class="text-white/80 text-sm font-mono leading-relaxed">
                  </p>
                </div>
                <button 
                  id="copy-prompt-btn" 
                  class="mt-2 text-xs text-white/60 hover:text-white transition-colors flex items-center"
                >
                  <i class="fas fa-copy mr-1"></i>
                  Copiar prompt
                </button>
              </div>

              {/* Metadados técnicos */}
              <div>
                <h3 class="text-sm font-semibold text-white/90 mb-3 uppercase tracking-wide">Detalhes Técnicos</h3>
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-white/60 text-sm">Modelo de IA:</span>
                    <span id="lightbox-model" class="text-white/90 text-sm font-medium">
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-white/60 text-sm">Categoria:</span>
                    <span id="lightbox-category" class="text-white/90 text-sm font-medium">
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-white/60 text-sm">Dimensões:</span>
                    <span id="lightbox-dimensions" class="text-white/90 text-sm font-medium">
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-white/60 text-sm">Formato:</span>
                    <span id="lightbox-format" class="text-white/90 text-sm font-medium">
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div id="lightbox-tags-section">
                <h3 class="text-sm font-semibold text-white/90 mb-3 uppercase tracking-wide">Tags</h3>
                <div id="lightbox-tags" class="flex flex-wrap gap-2">
                </div>
              </div>

              {/* Autor */}
              <div>
                <h3 class="text-sm font-semibold text-white/90 mb-3 uppercase tracking-wide">Criado por</h3>
                <div class="flex items-center space-x-3">
                  <img 
                    id="lightbox-user-avatar" 
                    class="w-10 h-10 rounded-full border-2 border-white/20" 
                    src="" 
                    alt=""
                  />
                  <div>
                    <p id="lightbox-user-name" class="text-white/90 font-medium text-sm">
                    </p>
                    <p id="lightbox-user-role" class="text-white/60 text-xs">
                    </p>
                  </div>
                </div>
              </div>

              {/* Ações adicionais */}
              <div class="border-t border-white/10 pt-6">
                <div class="grid grid-cols-2 gap-3">
                  <button class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors backdrop-blur-sm">
                    <i class="fas fa-flag mr-2"></i>
                    Reportar
                  </button>
                  <button class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors backdrop-blur-sm">
                    <i class="fas fa-info-circle mr-2"></i>
                    Mais Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}