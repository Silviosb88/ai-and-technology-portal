// Portal Educativo IA & Tecnologia - JavaScript Principal

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarClose = document.getElementById('sidebar-close');
    const mobileOverlay = document.getElementById('mobile-overlay');

    // Sistema de navegação mobile
    function initMobileNavigation() {
        // Abrir sidebar mobile
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                sidebar.classList.remove('-translate-x-full');
                mobileOverlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            });
        }

        // Fechar sidebar mobile
        function closeSidebar() {
            sidebar.classList.add('-translate-x-full');
            mobileOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }

        if (sidebarClose) {
            sidebarClose.addEventListener('click', closeSidebar);
        }

        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', closeSidebar);
        }

        // Fechar ao pressionar ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSidebar();
            }
        });

        // Auto-fechar em telas grandes
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                closeSidebar();
            }
        });
    }

    // Sistema de notificações toast
    window.showToast = function(message, type = 'info', duration = 3000) {
        const toastContainer = getOrCreateToastContainer();
        
        const toast = document.createElement('div');
        toast.className = `toast-notification ${getToastStyles(type)}`;
        toast.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${getToastIcon(type)} mr-3"></i>
                <span class="flex-1">${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-3 text-white/70 hover:text-white">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Animação de entrada
        setTimeout(() => {
            toast.classList.add('toast-show');
        }, 100);
        
        // Auto-remover
        setTimeout(() => {
            toast.classList.remove('toast-show');
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 300);
        }, duration);
    };

    function getOrCreateToastContainer() {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'fixed top-20 right-4 z-50 space-y-2';
            document.body.appendChild(container);
        }
        return container;
    }

    function getToastStyles(type) {
        const styles = {
            'success': 'bg-green-500 border-green-600',
            'error': 'bg-red-500 border-red-600',
            'warning': 'bg-yellow-500 border-yellow-600',
            'info': 'bg-blue-500 border-blue-600'
        };
        return `toast-base ${styles[type] || styles.info}`;
    }

    function getToastIcon(type) {
        const icons = {
            'success': 'fa-check-circle',
            'error': 'fa-exclamation-circle',
            'warning': 'fa-exclamation-triangle',
            'info': 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    // Sistema de loading
    window.showLoading = function(message = 'Carregando...') {
        const existingLoader = document.getElementById('global-loader');
        if (existingLoader) return;

        const loader = document.createElement('div');
        loader.id = 'global-loader';
        loader.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center';
        loader.innerHTML = `
            <div class="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4">
                <div class="flex items-center space-x-4">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-ai-primary"></div>
                    <span class="text-gray-700 font-medium">${message}</span>
                </div>
            </div>
        `;
        document.body.appendChild(loader);
        document.body.style.overflow = 'hidden';
    };

    window.hideLoading = function() {
        const loader = document.getElementById('global-loader');
        if (loader) {
            loader.remove();
            document.body.style.overflow = '';
        }
    };

    // Utilitários de API
    window.apiCall = async function(url, options = {}) {
        try {
            const defaultOptions = {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            };

            const response = await fetch(url, { ...defaultOptions, ...options });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            showToast(`Erro na API: ${error.message}`, 'error');
            throw error;
        }
    };

    // Sistema de upload de arquivos
    window.uploadFile = async function(file, endpoint = '/api/upload') {
        try {
            showLoading('Fazendo upload...');
            
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Falha no upload');
            }
            
            const result = await response.json();
            hideLoading();
            showToast('Upload realizado com sucesso!', 'success');
            return result;
            
        } catch (error) {
            hideLoading();
            showToast(`Erro no upload: ${error.message}`, 'error');
            throw error;
        }
    };

    // Validação de formulários
    window.validateForm = function(formId, rules) {
        const form = document.getElementById(formId);
        if (!form) return false;

        let isValid = true;
        const errors = [];

        Object.keys(rules).forEach(fieldName => {
            const field = form.querySelector(`[name="${fieldName}"]`);
            const rule = rules[fieldName];
            
            if (!field) return;

            // Remover classes de erro anteriores
            field.classList.remove('border-red-500', 'bg-red-50');
            
            // Validar campo obrigatório
            if (rule.required && !field.value.trim()) {
                isValid = false;
                errors.push(`${rule.label || fieldName} é obrigatório`);
                field.classList.add('border-red-500', 'bg-red-50');
            }
            
            // Validar tamanho mínimo
            if (rule.minLength && field.value.length < rule.minLength) {
                isValid = false;
                errors.push(`${rule.label || fieldName} deve ter pelo menos ${rule.minLength} caracteres`);
                field.classList.add('border-red-500', 'bg-red-50');
            }
            
            // Validar email
            if (rule.email && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                isValid = false;
                errors.push(`${rule.label || fieldName} deve ser um email válido`);
                field.classList.add('border-red-500', 'bg-red-50');
            }
        });

        if (!isValid) {
            showToast(`Erros no formulário: ${errors.join(', ')}`, 'error');
        }

        return isValid;
    };

    // Formatação de dados
    window.formatDate = function(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            ...options
        };
        
        return new Date(date).toLocaleDateString('pt-BR', defaultOptions);
    };

    window.formatFileSize = function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Sistema de favoritos (localStorage)
    window.toggleFavorite = function(itemId, itemType = 'general') {
        const key = `favorites_${itemType}`;
        const favorites = JSON.parse(localStorage.getItem(key) || '[]');
        
        const index = favorites.indexOf(itemId);
        if (index > -1) {
            favorites.splice(index, 1);
            showToast('Removido dos favoritos', 'info');
        } else {
            favorites.push(itemId);
            showToast('Adicionado aos favoritos', 'success');
        }
        
        localStorage.setItem(key, JSON.stringify(favorites));
        
        // Atualizar UI
        updateFavoriteUI(itemId, itemType);
        
        return favorites.includes(itemId);
    };

    function updateFavoriteUI(itemId, itemType) {
        const key = `favorites_${itemType}`;
        const favorites = JSON.parse(localStorage.getItem(key) || '[]');
        const isFavorite = favorites.includes(itemId);
        
        const heartIcons = document.querySelectorAll(`[data-favorite-id="${itemId}"]`);
        heartIcons.forEach(icon => {
            if (isFavorite) {
                icon.classList.remove('far', 'text-gray-400');
                icon.classList.add('fas', 'text-red-500');
            } else {
                icon.classList.remove('fas', 'text-red-500');
                icon.classList.add('far', 'text-gray-400');
            }
        });
    }

    // Inicializar sistemas
    initMobileNavigation();

    // Adicionar estilos CSS dinâmicos
    const style = document.createElement('style');
    style.textContent = `
        .toast-base {
            @apply px-6 py-4 rounded-lg shadow-lg text-white transform translate-x-full transition-transform duration-300 border-l-4;
            max-width: 400px;
        }
        
        .toast-show {
            transform: translateX(0);
        }
        
        .nav-item {
            @apply flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200;
        }
        
        .nav-item.active {
            @apply bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border-r-2 border-blue-500;
        }
        
        .category-item {
            @apply flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200;
        }
        
        .ai-card {
            @apply bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1;
        }
    `;
    document.head.appendChild(style);

    console.log('🚀 Portal IA & Tecnologia - Sistema inicializado com sucesso!');
});