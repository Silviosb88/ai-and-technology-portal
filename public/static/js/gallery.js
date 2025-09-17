// Gallery.js - JavaScript da Galeria Visual de Imagens IA

class GalleryManager {
    constructor() {
        this.currentPage = 1;
        this.pageSize = 20;
        this.currentFilter = {};
        this.currentImages = [];
        this.currentImageIndex = 0;
        this.isLoading = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadImages();
        this.initLightbox();
        this.initUpload();
    }

    bindEvents() {
        // Filtros de categoria
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.filterByCategory(category);
            });
        });

        // Busca
        const searchInput = document.getElementById('gallery-search');
        if (searchInput) {
            let searchTimeout;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.filterBySearch(e.target.value);
                }, 300);
            });
        }

        // Toggle destaques
        const featuredToggle = document.getElementById('featured-toggle');
        if (featuredToggle) {
            featuredToggle.addEventListener('change', (e) => {
                this.filterByFeatured(e.target.checked);
            });
        }

        // Filtros de modelo de IA
        document.querySelectorAll('.ai-model-filter').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateModelFilters();
            });
        });

        // Ordenação
        const sortSelect = document.getElementById('sort-select');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.updateSort(e.target.value);
            });
        }

        // Paginação
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousPage());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextPage());

        // Upload
        const uploadBtn = document.getElementById('upload-btn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => this.openUploadModal());
        }
    }

    async loadImages(page = 1) {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading(true);
        
        try {
            // Construir parâmetros da query
            const params = new URLSearchParams({
                page: page.toString(),
                limit: this.pageSize.toString(),
                ...this.currentFilter
            });

            const response = await fetch(`/api/images?${params}`);
            const data = await response.json();

            if (data.success) {
                this.currentImages = data.data;
                this.renderImages(data.data);
                this.updatePagination(data.pagination);
                this.updateStats(data.pagination.total);
            } else {
                this.showError(data.error || 'Erro ao carregar imagens');
            }
        } catch (error) {
            console.error('Erro ao carregar imagens:', error);
            this.showError('Erro de conexão');
        } finally {
            this.isLoading = false;
            this.showLoading(false);
        }
    }

    renderImages(images) {
        const grid = document.getElementById('gallery-grid');
        const emptyState = document.getElementById('gallery-empty');
        
        if (!grid) return;

        if (images.length === 0) {
            grid.classList.add('hidden');
            if (emptyState) emptyState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');
        grid.classList.remove('hidden');

        grid.innerHTML = images.map((image, index) => `
            <div class="ai-image-card group cursor-pointer animate-fade-in" 
                 data-image-id="${image.id}" 
                 data-image-index="${index}"
                 style="animation-delay: ${index * 0.05}s">
                <div class="relative overflow-hidden rounded-xl bg-white shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    ${image.is_featured ? `
                        <div class="absolute top-3 left-3 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                            <i class="fas fa-star mr-1"></i>
                            Destaque
                        </div>
                    ` : ''}

                    <div class="aspect-[4/3] overflow-hidden">
                        <img 
                            src="${image.thumbnail_url || image.image_url}" 
                            alt="${this.escapeHtml(image.title)}"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                        
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div class="absolute bottom-3 left-3 right-3">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center space-x-2 text-white text-sm">
                                        <i class="fas fa-eye"></i>
                                        <span>${this.formatNumber(image.view_count)}</span>
                                        <i class="fas fa-heart ml-2"></i>
                                        <span>${this.formatNumber(image.like_count)}</span>
                                    </div>
                                    <div class="flex space-x-2">
                                        <button class="like-btn p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm" 
                                                data-image-id="${image.id}">
                                            <i class="fas fa-heart text-white"></i>
                                        </button>
                                        <button class="share-btn p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm" 
                                                data-image-id="${image.id}">
                                            <i class="fas fa-share text-white"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="p-4">
                        <div class="flex items-start justify-between mb-2">
                            <h3 class="font-semibold text-gray-900 line-clamp-2 group-hover:text-ai-primary transition-colors">
                                ${this.escapeHtml(image.title)}
                            </h3>
                        </div>
                        
                        <p class="text-sm text-gray-600 line-clamp-2 mb-3">
                            ${this.escapeHtml(image.description || 'Sem descrição')}
                        </p>

                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-2">
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                    <i class="fas fa-tag mr-1"></i>
                                    ${image.category_name || 'Sem categoria'}
                                </span>
                            </div>
                            
                            ${image.ai_model ? `
                                <div class="text-xs text-gray-500">
                                    <span class="inline-flex items-center">
                                        <i class="fas fa-robot mr-1"></i>
                                        ${image.ai_model}
                                    </span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Bind click events para abrir lightbox
        grid.querySelectorAll('.ai-image-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.like-btn, .share-btn')) {
                    const index = parseInt(card.dataset.imageIndex);
                    this.openLightbox(index);
                }
            });
        });

        // Bind eventos de like e share
        grid.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleLike(btn.dataset.imageId);
            });
        });

        grid.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.shareImage(btn.dataset.imageId);
            });
        });
    }

    filterByCategory(categorySlug) {
        // Atualizar UI dos filtros
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.classList.remove('bg-ai-primary/10', 'text-ai-primary', 'border', 'border-ai-primary/20');
            btn.classList.add('hover:bg-gray-100', 'text-gray-700');
        });

        const activeBtn = document.querySelector(`[data-category="${categorySlug}"]`);
        if (activeBtn) {
            activeBtn.classList.add('bg-ai-primary/10', 'text-ai-primary', 'border', 'border-ai-primary/20');
            activeBtn.classList.remove('hover:bg-gray-100', 'text-gray-700');
        }

        // Atualizar filtro
        if (categorySlug) {
            this.currentFilter.category_slug = categorySlug;
        } else {
            delete this.currentFilter.category_slug;
        }

        this.currentPage = 1;
        this.loadImages(1);
    }

    filterBySearch(searchTerm) {
        if (searchTerm.trim()) {
            this.currentFilter.search = searchTerm.trim();
        } else {
            delete this.currentFilter.search;
        }

        this.currentPage = 1;
        this.loadImages(1);
    }

    filterByFeatured(isFeatured) {
        if (isFeatured) {
            this.currentFilter.is_featured = true;
        } else {
            delete this.currentFilter.is_featured;
        }

        this.currentPage = 1;
        this.loadImages(1);
    }

    updateModelFilters() {
        const checkedModels = [];
        document.querySelectorAll('.ai-model-filter:checked').forEach(checkbox => {
            checkedModels.push(checkbox.value);
        });

        if (checkedModels.length > 0) {
            this.currentFilter.ai_models = checkedModels.join(',');
        } else {
            delete this.currentFilter.ai_models;
        }

        this.currentPage = 1;
        this.loadImages(1);
    }

    updateSort(sortValue) {
        if (sortValue) {
            const [sortBy, sortOrder] = sortValue.split('_');
            this.currentFilter.sort_by = sortBy;
            this.currentFilter.sort_order = sortOrder.toUpperCase();
        } else {
            delete this.currentFilter.sort_by;
            delete this.currentFilter.sort_order;
        }

        this.currentPage = 1;
        this.loadImages(1);
    }

    updatePagination(pagination) {
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        const pageNumbers = document.getElementById('page-numbers');

        if (prevBtn) {
            prevBtn.disabled = !pagination.hasPrev;
            prevBtn.classList.toggle('opacity-50', !pagination.hasPrev);
        }

        if (nextBtn) {
            nextBtn.disabled = !pagination.hasNext;
            nextBtn.classList.toggle('opacity-50', !pagination.hasNext);
        }

        if (pageNumbers) {
            // Gerar números de página
            let pages = [];
            const currentPage = pagination.page;
            const totalPages = pagination.pages;
            
            // Lógica para mostrar páginas relevantes
            let startPage = Math.max(1, currentPage - 2);
            let endPage = Math.min(totalPages, currentPage + 2);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(`
                    <button class="page-btn px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        i === currentPage 
                            ? 'bg-ai-primary text-white' 
                            : 'text-gray-500 bg-white border border-gray-200 hover:bg-gray-50'
                    }" data-page="${i}">
                        ${i}
                    </button>
                `);
            }

            pageNumbers.innerHTML = pages.join('');

            // Bind eventos
            pageNumbers.querySelectorAll('.page-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const page = parseInt(e.target.dataset.page);
                    this.goToPage(page);
                });
            });
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.goToPage(this.currentPage - 1);
        }
    }

    nextPage() {
        this.goToPage(this.currentPage + 1);
    }

    goToPage(page) {
        this.currentPage = page;
        this.loadImages(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateStats(totalImages) {
        const statsElement = document.getElementById('gallery-stats');
        if (statsElement) {
            const categoryCount = Object.keys(this.currentFilter).includes('category_slug') ? 
                'categoria filtrada' : `${document.querySelectorAll('.category-filter').length - 1} categorias`;
            
            statsElement.textContent = `${this.formatNumber(totalImages)} imagens • ${categoryCount}`;
        }
    }

    showLoading(show) {
        const loading = document.getElementById('gallery-loading');
        const grid = document.getElementById('gallery-grid');
        
        if (loading) {
            loading.classList.toggle('hidden', !show);
        }
        if (grid && show) {
            grid.classList.add('opacity-50');
        } else if (grid) {
            grid.classList.remove('opacity-50');
        }
    }

    showError(message) {
        showToast(message, 'error');
    }

    // ===========================
    // LIGHTBOX FUNCTIONALITY
    // ===========================

    initLightbox() {
        const modal = document.getElementById('lightbox-modal');
        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeLightbox());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.lightboxPrev());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.lightboxNext());
        }

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
                this.closeLightbox();
            }
        });

        // Navegação com setas
        document.addEventListener('keydown', (e) => {
            if (modal && !modal.classList.contains('hidden')) {
                if (e.key === 'ArrowLeft') this.lightboxPrev();
                if (e.key === 'ArrowRight') this.lightboxNext();
            }
        });

        // Fechar clicando no fundo
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeLightbox();
                }
            });
        }
    }

    openLightbox(imageIndex) {
        this.currentImageIndex = imageIndex;
        this.displayLightboxImage();
        
        const modal = document.getElementById('lightbox-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }
    }

    closeLightbox() {
        const modal = document.getElementById('lightbox-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }
    }

    lightboxPrev() {
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
            this.displayLightboxImage();
        }
    }

    lightboxNext() {
        if (this.currentImageIndex < this.currentImages.length - 1) {
            this.currentImageIndex++;
            this.displayLightboxImage();
        }
    }

    displayLightboxImage() {
        const image = this.currentImages[this.currentImageIndex];
        if (!image) return;

        // Elementos do lightbox
        const img = document.getElementById('lightbox-image');
        const loading = document.getElementById('lightbox-loading');
        
        // Mostrar loading
        if (loading) loading.style.display = 'flex';
        if (img) img.style.opacity = '0';

        // Carregar imagem
        if (img) {
            img.onload = () => {
                if (loading) loading.style.display = 'none';
                img.style.opacity = '1';
            };
            img.src = image.image_url;
        }

        // Atualizar informações
        this.updateLightboxInfo(image);

        // Atualizar navegação
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        
        if (prevBtn) {
            prevBtn.style.display = this.currentImageIndex > 0 ? 'flex' : 'none';
        }
        if (nextBtn) {
            nextBtn.style.display = this.currentImageIndex < this.currentImages.length - 1 ? 'flex' : 'none';
        }
    }

    updateLightboxInfo(image) {
        // Título e estatísticas
        const title = document.getElementById('lightbox-title');
        const views = document.getElementById('lightbox-views');
        const likes = document.getElementById('lightbox-likes');
        const date = document.getElementById('lightbox-date');

        if (title) title.textContent = image.title;
        if (views) views.querySelector('span').textContent = this.formatNumber(image.view_count);
        if (likes) likes.querySelector('span').textContent = this.formatNumber(image.like_count);
        if (date) date.querySelector('span').textContent = this.formatDate(image.created_at);

        // Descrição
        const description = document.getElementById('lightbox-description');
        if (description) description.textContent = image.description || 'Sem descrição disponível';

        // Prompt
        const prompt = document.getElementById('lightbox-prompt');
        const promptSection = document.getElementById('lightbox-prompt-section');
        
        if (image.prompt_used) {
            if (prompt) prompt.textContent = image.prompt_used;
            if (promptSection) promptSection.style.display = 'block';
        } else {
            if (promptSection) promptSection.style.display = 'none';
        }

        // Detalhes técnicos
        const model = document.getElementById('lightbox-model');
        const category = document.getElementById('lightbox-category');
        const dimensions = document.getElementById('lightbox-dimensions');
        const format = document.getElementById('lightbox-format');

        if (model) model.textContent = image.ai_model || 'Não informado';
        if (category) category.textContent = image.category_name || 'Sem categoria';
        if (dimensions) dimensions.textContent = image.dimensions || 'Não informado';
        if (format) format.textContent = image.file_format?.toUpperCase() || 'JPG';

        // Autor
        const userAvatar = document.getElementById('lightbox-user-avatar');
        const userName = document.getElementById('lightbox-user-name');
        const userRole = document.getElementById('lightbox-user-role');

        if (userAvatar) userAvatar.src = image.user_avatar || '/static/images/default-avatar.png';
        if (userName) userName.textContent = image.user_name || 'Usuário Anônimo';
        if (userRole) userRole.textContent = 'Criador da Comunidade';
    }

    // ===========================
    // UPLOAD FUNCTIONALITY
    // ===========================

    initUpload() {
        // Implementação do sistema de upload será feita em upload.js
        console.log('Upload system initialized');
    }

    openUploadModal() {
        const modal = document.getElementById('upload-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }
    }

    // ===========================
    // UTILITY FUNCTIONS
    // ===========================

    formatNumber(num) {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    async toggleLike(imageId) {
        try {
            // Implementar sistema de likes
            showToast('Sistema de likes em desenvolvimento', 'info');
        } catch (error) {
            console.error('Erro ao curtir imagem:', error);
            showToast('Erro ao curtir imagem', 'error');
        }
    }

    shareImage(imageId) {
        const image = this.currentImages.find(img => img.id == imageId);
        if (image && navigator.share) {
            navigator.share({
                title: image.title,
                text: image.description,
                url: window.location.href + '#image-' + imageId
            });
        } else {
            // Fallback - copiar URL
            navigator.clipboard.writeText(window.location.href + '#image-' + imageId);
            showToast('Link copiado para área de transferência!', 'success');
        }
    }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.galleryManager = new GalleryManager();
    
    // Adicionar estilos de animação
    const style = document.createElement('style');
    style.textContent = `
        .animate-fade-in {
            opacity: 0;
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});