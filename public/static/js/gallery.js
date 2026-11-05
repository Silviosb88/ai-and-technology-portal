// gallery.js - Script para funcionalidades da Galeria
class GalleryManager {
    constructor() {
        this.isEditMode = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupKeyboardShortcuts();
        console.log('🎨 Gallery Manager inicializado');
    }

    bindEvents() {
        // Like buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.like-btn')) {
                e.stopPropagation();
                this.handleLike(e.target.closest('.like-btn'));
            }
        });

        // Share buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.share-btn')) {
                e.stopPropagation();
                this.handleShare(e.target.closest('.share-btn'));
            }
        });

        // Delete buttons (edit mode)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.delete-btn')) {
                e.stopPropagation();
                this.handleDelete(e.target.closest('.delete-btn'));
            }
        });

        // Image cards click (lightbox)
        document.addEventListener('click', (e) => {
            const imageCard = e.target.closest('.ai-image-card');
            if (imageCard && !e.target.closest('button')) {
                const imageId = imageCard.dataset.imageId;
                this.openLightbox(imageId);
            }
        });
    }

    // Sistema de Like
    async handleLike(button) {
        const imageId = button.dataset.imageId;
        const currentCount = parseInt(button.dataset.likeCount) || 0;

        try {
            // Animação imediata (feedback visual)
            button.classList.add('animate-pulse');
            const icon = button.querySelector('i');
            icon.classList.add('text-red-400');

            const response = await fetch(`/api/images/${imageId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (result.success) {
                // Atualizar contador na interface
                const newCount = result.data.like_count;
                button.dataset.likeCount = newCount;

                // Atualizar todos os displays deste like count na página
                this.updateLikeDisplays(imageId, newCount);

                // Feedback visual de sucesso
                this.showToast('❤️ Curtida adicionada!', 'success');
                console.log(`👍 Like adicionado à imagem ${imageId}, total: ${newCount}`);

            } else {
                throw new Error(result.error || 'Erro ao curtir');
            }

        } catch (error) {
            console.error('❌ Erro ao curtir imagem:', error);
            this.showToast('❌ Erro ao curtir imagem', 'error');
            
            // Reverter animação em caso de erro
            const icon = button.querySelector('i');
            icon.classList.remove('text-red-400');
        } finally {
            button.classList.remove('animate-pulse');
        }
    }

    // Sistema de Share
    async handleShare(button) {
        const imageId = button.dataset.imageId;

        try {
            const response = await fetch(`/api/images/${imageId}/share`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (result.success) {
                const shareData = result.data;
                
                // Tentar usar Web Share API se disponível
                if (navigator.share) {
                    await navigator.share({
                        title: shareData.title,
                        text: shareData.description,
                        url: shareData.url
                    });
                    console.log('📤 Compartilhado via Web Share API');
                } else {
                    // Fallback: copiar URL para clipboard
                    await navigator.clipboard.writeText(shareData.url);
                    this.showToast('🔗 Link copiado para a área de transferência!', 'success');
                    console.log('📋 URL copiada:', shareData.url);
                }

                // Feedback visual
                const icon = button.querySelector('i');
                icon.classList.add('text-green-400');
                setTimeout(() => {
                    icon.classList.remove('text-green-400');
                }, 2000);

            } else {
                throw new Error(result.error || 'Erro ao compartilhar');
            }

        } catch (error) {
            console.error('❌ Erro ao compartilhar imagem:', error);
            this.showToast('❌ Erro ao compartilhar imagem', 'error');
        }
    }

    // Sistema de Delete (modo de edição)
    async handleDelete(button) {
        const imageId = button.dataset.imageId;
        const imageCard = button.closest('.ai-image-card');
        const imageTitle = imageCard.querySelector('h3').textContent.trim();

        // Confirmação
        if (!confirm(`Tem certeza que deseja deletar a imagem "${imageTitle}"?\n\nEsta ação não pode ser desfeita.`)) {
            return;
        }

        try {
            button.innerHTML = '<i class="fas fa-spinner fa-spin text-slate-900"></i>';
            button.disabled = true;

            const response = await fetch(`/api/images/${imageId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();

            if (result.success) {
                // Animação de saída
                imageCard.style.transition = 'all 0.3s ease-out';
                imageCard.style.transform = 'scale(0.95)';
                imageCard.style.opacity = '0';

                setTimeout(() => {
                    imageCard.remove();
                }, 300);

                this.showToast(`🗑️ "${imageTitle}" deletada com sucesso`, 'success');
                console.log(`🗑️ Imagem ${imageId} deletada com sucesso`);

            } else {
                throw new Error(result.error || 'Erro ao deletar');
            }

        } catch (error) {
            console.error('❌ Erro ao deletar imagem:', error);
            this.showToast('❌ Erro ao deletar imagem', 'error');
            
            // Restaurar botão
            button.innerHTML = '<i class="fas fa-trash text-slate-900"></i>';
            button.disabled = false;
        }
    }

    // Toggle modo de edição
    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        
        const deleteButtons = document.querySelectorAll('.delete-btn');
        const editModeToggle = document.getElementById('edit-mode-toggle');
        
        deleteButtons.forEach(btn => {
            if (this.isEditMode) {
                btn.classList.remove('hidden');
                btn.classList.add('animate-fadeIn');
            } else {
                btn.classList.add('hidden');
                btn.classList.remove('animate-fadeIn');
            }
        });

        if (editModeToggle) {
            editModeToggle.textContent = this.isEditMode ? '✅ Finalizar Edição' : '✏️ Modo Edição';
            editModeToggle.className = this.isEditMode 
                ? 'px-4 py-2 bg-green-500 text-slate-900 rounded-lg font-semibold hover:bg-green-600 transition-colors'
                : 'px-4 py-2 bg-gray-500 text-slate-900 rounded-lg font-semibold hover:bg-gray-600 transition-colors';
        }

        this.showToast(
            this.isEditMode ? '✏️ Modo de edição ativo - Clique no ícone da lixeira para deletar' : '✅ Modo de edição desativado', 
            this.isEditMode ? 'info' : 'success'
        );

        console.log(`✏️ Modo de edição: ${this.isEditMode ? 'ATIVO' : 'INATIVO'}`);
    }

    // Abrir lightbox
    openLightbox(imageId) {
        // Esta função será implementada quando tivermos o lightbox
        console.log(`🔍 Abrindo lightbox para imagem ${imageId}`);
        
        // Placeholder: scroll para imagem ou abrir modal
        const imageCard = document.querySelector(`[data-image-id="${imageId}"]`);
        if (imageCard) {
            imageCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Atualizar displays de like count
    updateLikeDisplays(imageId, newCount) {
        // Atualizar contador no overlay da imagem
        const imageCard = document.querySelector(`[data-image-id="${imageId}"]`);
        if (imageCard) {
            const likeDisplay = imageCard.querySelector('.fas.fa-heart + span');
            if (likeDisplay) {
                likeDisplay.textContent = newCount;
            }
        }

        // Atualizar qualquer outro display na página
        const allLikeButtons = document.querySelectorAll(`[data-image-id="${imageId}"].like-btn`);
        allLikeButtons.forEach(btn => {
            btn.dataset.likeCount = newCount;
        });
    }

    // Configurar atalhos de teclado
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + E = Toggle Edit Mode
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
                e.preventDefault();
                this.toggleEditMode();
            }
            
            // ESC = Sair do modo de edição
            if (e.key === 'Escape' && this.isEditMode) {
                this.toggleEditMode();
            }
        });
    }

    // Sistema de notificações toast
    showToast(message, type = 'info') {
        // Remover toast anterior se existir
        const existingToast = document.querySelector('.gallery-toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Criar novo toast
        const toast = document.createElement('div');
        toast.className = `gallery-toast fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
        
        // Cores baseadas no tipo
        const colors = {
            success: 'bg-green-500 text-slate-900',
            error: 'bg-red-500 text-slate-900',
            info: 'bg-blue-500 text-slate-900',
            warning: 'bg-yellow-500 text-black'
        };
        
        toast.className += ` ${colors[type] || colors.info}`;
        toast.textContent = message;

        // Adicionar ao DOM
        document.body.appendChild(toast);

        // Animar entrada
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);

        // Auto-remover após 3 segundos
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Método público para ativar modo de edição (pode ser chamado externamente)
    activateEditMode() {
        if (!this.isEditMode) {
            this.toggleEditMode();
        }
    }

    // Método público para desativar modo de edição
    deactivateEditMode() {
        if (this.isEditMode) {
            this.toggleEditMode();
        }
    }
}

// Inicializar quando página carrega
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Inicializando Gallery Manager...');
    window.galleryManager = new GalleryManager();
});

// Tornar disponível globalmente
window.GalleryManager = GalleryManager;