// UploadModal.tsx - Modal de Upload com Drag & Drop
export const UploadModal = ({ categories = [] }: { categories?: any[] }) => {
  return (
    <div id="upload-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header do Modal */}
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-ai-primary to-ai-secondary rounded-xl flex items-center justify-center">
              <i class="fas fa-cloud-upload-alt text-white"></i>
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-900">Upload de Imagens IA</h2>
              <p class="text-sm text-gray-600">Compartilhe suas criações com a comunidade</p>
            </div>
          </div>
          <button 
            id="upload-modal-close" 
            class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i class="fas fa-times text-gray-400 text-xl"></i>
          </button>
        </div>

        <div class="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)]">
          {/* Área de Upload */}
          <div class="flex-1 p-6">
            {/* Zona de Drag & Drop */}
            <div 
              id="drop-zone" 
              class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-ai-primary hover:bg-ai-primary/5 transition-all duration-300 mb-6"
            >
              <div id="drop-zone-content">
                <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-cloud-upload-alt text-2xl text-gray-400"></i>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                  Arraste suas imagens aqui
                </h3>
                <p class="text-gray-600 mb-4">
                  ou clique para selecionar arquivos
                </p>
                <button 
                  id="file-select-btn" 
                  class="ai-button-primary text-white px-6 py-3 rounded-lg font-semibold mb-2"
                >
                  <i class="fas fa-folder-open mr-2"></i>
                  Selecionar Arquivos
                </button>
                <p class="text-xs text-gray-500">
                  Suporte: JPG, PNG, WebP até 10MB cada
                </p>
              </div>

              {/* Upload Progress */}
              <div id="upload-progress" class="hidden">
                <div class="w-16 h-16 bg-ai-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-ai-primary"></div>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                  Fazendo upload...
                </h3>
                <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div id="progress-bar" class="bg-gradient-to-r from-ai-primary to-ai-secondary h-2 rounded-full transition-all duration-300" style="width: 0%"></div>
                </div>
                <p id="upload-status" class="text-sm text-gray-600">
                  Preparando arquivos...
                </p>
              </div>
            </div>

            <input 
              type="file" 
              id="file-input" 
              multiple 
              accept="image/*" 
              class="hidden" 
            />

            {/* Preview das Imagens */}
            <div id="preview-container" class="hidden">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Imagens Selecionadas
              </h3>
              <div id="preview-grid" class="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-60 overflow-y-auto">
              </div>
            </div>
          </div>

          {/* Formulário de Metadados */}
          <div class="lg:w-96 bg-gray-50 p-6 border-l border-gray-200 overflow-y-auto">
            <form id="upload-form">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Informações da Imagem
              </h3>

              {/* Título */}
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input 
                  type="text" 
                  id="upload-title"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ai-primary focus:border-ai-primary" 
                  placeholder="Ex: Paisagem Futurística com Elementos IA"
                  required
                />
              </div>

              {/* Descrição */}
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea 
                  id="upload-description"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ai-primary focus:border-ai-primary resize-none" 
                  placeholder="Descreva sua criação, técnicas usadas ou inspiração..."
                ></textarea>
              </div>

              {/* Categoria (Obrigatória) */}
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Categoria *
                </label>
                <select 
                  id="upload-category"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ai-primary focus:border-ai-primary"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category: any) => (
                    <option value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              {/* Prompt Usado */}
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Prompt Usado
                </label>
                <textarea 
                  id="upload-prompt"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ai-primary focus:border-ai-primary resize-none font-mono text-sm" 
                  placeholder="Cole aqui o prompt que você usou para gerar a imagem..."
                ></textarea>
              </div>

              {/* Modelo de IA */}
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Modelo de IA
                </label>
                <select 
                  id="upload-ai-model"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ai-primary focus:border-ai-primary"
                >
                  <option value="">Selecione o modelo usado</option>
                  <option value="DALL-E 3">DALL-E 3</option>
                  <option value="DALL-E 2">DALL-E 2</option>
                  <option value="Midjourney v6">Midjourney v6</option>
                  <option value="Midjourney v5">Midjourney v5</option>
                  <option value="Stable Diffusion XL">Stable Diffusion XL</option>
                  <option value="Stable Diffusion 1.5">Stable Diffusion 1.5</option>
                  <option value="Leonardo AI">Leonardo AI</option>
                  <option value="Adobe Firefly">Adobe Firefly</option>
                  <option value="Runway ML">Runway ML</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              {/* Tags */}
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input 
                  type="text" 
                  id="upload-tags"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ai-primary focus:border-ai-primary" 
                  placeholder="arte, futurista, cyberpunk..."
                />
                <p class="text-xs text-gray-500 mt-1">
                  Separe as tags por vírgula
                </p>
              </div>

              {/* Toggle Destaque da Semana */}
              <div class="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                <label class="flex items-center space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="upload-featured"
                    class="w-4 h-4 text-yellow-600 bg-yellow-100 border-yellow-300 rounded focus:ring-yellow-500 focus:ring-2"
                  />
                  <div class="flex-1">
                    <span class="font-medium text-gray-900 flex items-center">
                      <i class="fas fa-star text-yellow-500 mr-2"></i>
                      Candidatar para Destaque da Semana
                    </span>
                    <p class="text-sm text-gray-600 mt-1">
                      Suas melhores criações podem ser destacadas na página inicial
                    </p>
                  </div>
                </label>
              </div>

              {/* Botões de Ação */}
              <div class="flex space-x-3">
                <button 
                  type="button"
                  id="upload-cancel-btn"
                  class="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  id="upload-submit-btn"
                  class="flex-1 ai-button-primary text-white px-4 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i class="fas fa-cloud-upload-alt mr-2"></i>
                  Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}