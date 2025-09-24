// dashboard.js - Script para Dashboard dinâmico
class DashboardManager {
    constructor() {
        this.init();
    }

    async init() {
        await this.loadGlobalStats();
        await this.loadFeaturedGallery();
        this.setupRealtimeUpdates();
    }

    // Carrega estatísticas globais da API
    async loadGlobalStats() {
        try {
            const response = await fetch('/api/stats/global');
            const result = await response.json();

            if (result.success) {
                const data = result.data;
                
                // Atualizar contadores com animação
                this.animateCounter('stat-images', data.images);
                this.animateCounter('stat-tutorials', data.tutorials);
                this.animateCounter('stat-showcases', data.showcases);
                this.animateCounter('stat-users', data.users);

                console.log('📊 Estatísticas carregadas:', data);
            } else {
                console.error('❌ Erro ao carregar estatísticas:', result.error);
                this.showFallbackStats();
            }
        } catch (error) {
            console.error('❌ Erro na requisição de estatísticas:', error);
            this.showFallbackStats();
        }
    }

    // Carrega galeria em destaque
    async loadFeaturedGallery() {
        try {
            const response = await fetch('/api/images/featured?limit=4');
            const result = await response.json();

            if (result.success && result.data && result.data.length > 0) {
                this.renderFeaturedImages(result.data);
            } else {
                console.log('📷 Nenhuma imagem em destaque encontrada');
                this.showFallbackGallery();
            }
        } catch (error) {
            console.error('❌ Erro ao carregar galeria em destaque:', error);
            this.showFallbackGallery();
        }
    }

    // Anima contadores numericos
    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const startValue = 0;
        const duration = 1500; // 1.5 segundos
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Função de easing suave
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
            
            element.textContent = currentValue.toLocaleString('pt-BR');

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    // Renderiza imagens em destaque
    renderFeaturedImages(images) {
        const container = document.getElementById('featured-gallery');
        if (!container) return;

        const html = images.slice(0, 4).map((image, index) => `
            <div class="aspect-square rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 group"
                 onclick="window.openImageLightbox && window.openImageLightbox(${image.id})">
                <img src="${image.thumbnail_url || image.image_url}" 
                     alt="${this.escapeHtml(image.title)}"
                     class="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                     loading="lazy">
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="absolute bottom-2 left-2 right-2">
                        <h4 class="text-white text-sm font-medium truncate">${this.escapeHtml(image.title)}</h4>
                        <p class="text-white/80 text-xs truncate">${image.like_count || 0} ❤️ • ${image.view_count || 0} 👀</p>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
        console.log('🖼️ Galeria em destaque carregada:', images.length, 'imagens');
    }

    // Estatísticas de fallback quando API falha
    showFallbackStats() {
        this.animateCounter('stat-images', 5); // Dados do seed
        this.animateCounter('stat-tutorials', 3);
        this.animateCounter('stat-showcases', 2);
        this.animateCounter('stat-users', 50);
        
        console.log('📊 Usando estatísticas de fallback');
    }

    // Galeria de fallback quando API falha
    showFallbackGallery() {
        const container = document.getElementById('featured-gallery');
        if (!container) return;

        const fallbackHtml = `
            <div class="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                <div class="text-center">
                    <i class="fas fa-image text-3xl text-purple-400 mb-2"></i>
                    <p class="text-sm text-purple-600">Em breve</p>
                </div>
            </div>
            <div class="aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                <div class="text-center">
                    <i class="fas fa-palette text-3xl text-blue-400 mb-2"></i>
                    <p class="text-sm text-blue-600">Galeria</p>
                </div>
            </div>
            <div class="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                <div class="text-center">
                    <i class="fas fa-brain text-3xl text-green-400 mb-2"></i>
                    <p class="text-sm text-green-600">Vazia</p>
                </div>
            </div>
            <div class="aspect-square bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                <div class="text-center">
                    <i class="fas fa-robot text-3xl text-orange-400 mb-2"></i>
                    <p class="text-sm text-orange-600">Faça Upload!</p>
                </div>
            </div>
        `;
        
        container.innerHTML = fallbackHtml;
        console.log('🖼️ Usando galeria de fallback');
    }

    // Configurar atualizações em tempo real (opcional)
    setupRealtimeUpdates() {
        // Atualizar estatísticas a cada 30 segundos
        setInterval(() => {
            this.loadGlobalStats();
        }, 30000);

        // Atualizar galeria a cada 2 minutos  
        setInterval(() => {
            this.loadFeaturedGallery();
        }, 120000);
    }

    // Utilitário para escapar HTML
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Inicializar Dashboard quando página carrega
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando Dashboard dinâmico...');
    window.dashboardManager = new DashboardManager();
});

// Tornar disponível globalmente para debug
window.DashboardManager = DashboardManager;