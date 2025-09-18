// Upload.js - Sistema de Upload com Drag & Drop

class UploadManager {
    constructor() {
        this.selectedFiles = [];
        this.uploadQueue = [];
        this.isUploading = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupDragAndDrop();
    }

    bindEvents() {
        // Modal controls
        const modal = document.getElementById('upload-modal');
        const closeBtn = document.getElementById('upload-modal-close');
        const cancelBtn = document.getElementById('upload-cancel-btn');
        
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
        if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeModal());
        
        // Fechar modal com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
                this.closeModal();
            }
        });

        // File input
        const fileInput = document.getElementById('file-input');
        const fileSelectBtn = document.getElementById('file-select-btn');
        
        if (fileSelectBtn) {
            fileSelectBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita propagação para o dropZone
                if (fileInput) fileInput.click();
            });
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                this.handleFileSelection(Array.from(e.target.files));
            });
        }

        // Form submission
        const form = document.getElementById('upload-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitUpload();
            });
        }

        // Copy prompt button
        const copyPromptBtn = document.getElementById('copy-prompt-btn');
        if (copyPromptBtn) {
            copyPromptBtn.addEventListener('click', () => this.copyPrompt());
        }
    }

    setupDragAndDrop() {
        const dropZone = document.getElementById('drop-zone');
        if (!dropZone) return;

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, this.preventDefaults, false);
            document.body.addEventListener(eventName, this.preventDefaults, false);
        });

        // Highlight drop zone when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => this.highlight(dropZone), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => this.unhighlight(dropZone), false);
        });

        // Handle dropped files
        dropZone.addEventListener('drop', (e) => this.handleDrop(e), false);

        // Click to select files (only if not clicking the button)
        dropZone.addEventListener('click', (e) => {
            // Não ativar se clicou no botão file-select-btn ou seus filhos
            if (e.target.closest('#file-select-btn')) {
                return;
            }
            const fileInput = document.getElementById('file-input');
            if (fileInput) fileInput.click();
        });
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    highlight(element) {
        element.classList.add('border-ai-primary', 'bg-ai-primary/5');
        element.classList.remove('border-gray-300');
    }

    unhighlight(element) {
        element.classList.remove('border-ai-primary', 'bg-ai-primary/5');
        element.classList.add('border-gray-300');
    }

    handleDrop(e) {
        const dt = e.dataTransfer;
        const files = Array.from(dt.files);
        this.handleFileSelection(files);
    }

    handleFileSelection(files) {
        // Filtrar imagens e vídeos
        const validFiles = files.filter(file => {
            return file.type.startsWith('image/') || file.type.startsWith('video/');
        });

        if (validFiles.length !== files.length) {
            const invalidCount = files.length - validFiles.length;
            showToast(`${invalidCount} arquivo(s) não são suportados (apenas imagens e vídeos)`, 'warning');
        }

        if (validFiles.length === 0) {
            showToast('Nenhum arquivo válido selecionado (apenas imagens e vídeos)', 'error');
            return;
        }

        // Verificar tamanho dos arquivos (10MB para imagens, 50MB para vídeos)
        const sizeValidFiles = validFiles.filter(file => {
            const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 10 * 1024 * 1024; // 50MB vídeos, 10MB imagens
            const maxSizeText = file.type.startsWith('video/') ? '50MB' : '10MB';
            
            if (file.size > maxSize) {
                showToast(`${file.name} é muito grande (máx. ${maxSizeText})`, 'warning');
                return false;
            }
            return true;
        });

        if (sizeValidFiles.length === 0) {
            showToast('Nenhum arquivo atende aos critérios de tamanho', 'error');
            return;
        }

        this.selectedFiles = sizeValidFiles;
        this.showPreviews();
        this.updateUI();
        
        const imageCount = sizeValidFiles.filter(f => f.type.startsWith('image/')).length;
        const videoCount = sizeValidFiles.filter(f => f.type.startsWith('video/')).length;
        let message = '';
        if (imageCount > 0 && videoCount > 0) {
            message = `${imageCount} imagem(ns) e ${videoCount} vídeo(s) selecionado(s)`;
        } else if (imageCount > 0) {
            message = `${imageCount} imagem(ns) selecionada(s)`;
        } else {
            message = `${videoCount} vídeo(s) selecionado(s)`;
        }
        showToast(message, 'success');
    }

    showPreviews() {
        const container = document.getElementById('preview-container');
        const grid = document.getElementById('preview-grid');
        
        if (!container || !grid) return;

        if (this.selectedFiles.length === 0) {
            container.classList.add('hidden');
            return;
        }

        container.classList.remove('hidden');
        
        // Limpar previews existentes
        grid.innerHTML = '';

        this.selectedFiles.forEach((file, index) => {
            const isVideo = file.type.startsWith('video/');
            const previewElement = document.createElement('div');
            previewElement.className = 'relative group';
            
            if (isVideo) {
                // Preview para vídeos
                const videoUrl = URL.createObjectURL(file);
                previewElement.innerHTML = `
                    <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                        <video class="w-full h-full object-cover" muted>
                            <source src="${videoUrl}" type="${file.type}">
                        </video>
                        <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <i class="fas fa-play-circle text-white text-3xl opacity-80"></i>
                        </div>
                    </div>
                    <button class="remove-file absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100" 
                            data-file-index="${index}">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="mt-1 text-xs text-gray-600 truncate flex items-center">
                        <i class="fas fa-video text-blue-500 mr-1"></i>
                        ${file.name}
                    </div>
                    <div class="text-xs text-gray-400">
                        ${this.formatFileSize(file.size)}
                    </div>
                `;
                grid.appendChild(previewElement);
                
                // Bind remove button
                const removeBtn = previewElement.querySelector('.remove-file');
                removeBtn.addEventListener('click', () => {
                    URL.revokeObjectURL(videoUrl);
                    this.removeFile(index);
                });
            } else {
                // Preview para imagens
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    previewElement.innerHTML = `
                        <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                            <img src="${e.target.result}" 
                                 alt="Preview ${index + 1}" 
                                 class="w-full h-full object-cover">
                        </div>
                        <button class="remove-file absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100" 
                                data-file-index="${index}">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="mt-1 text-xs text-gray-600 truncate flex items-center">
                            <i class="fas fa-image text-green-500 mr-1"></i>
                            ${file.name}
                        </div>
                        <div class="text-xs text-gray-400">
                            ${this.formatFileSize(file.size)}
                        </div>
                    `;
    
                    grid.appendChild(previewElement);
    
                    // Bind remove button
                    const removeBtn = previewElement.querySelector('.remove-file');
                    removeBtn.addEventListener('click', () => this.removeFile(index));
                };
    
                reader.readAsDataURL(file);
            }
        });
    }

    removeFile(index) {
        this.selectedFiles.splice(index, 1);
        this.showPreviews();
        this.updateUI();
        
        if (this.selectedFiles.length === 0) {
            showToast('Todos os arquivos foram removidos', 'info');
        } else {
            showToast('Arquivo removido', 'success');
        }
    }

    updateUI() {
        const dropZone = document.getElementById('drop-zone');
        const dropZoneContent = document.getElementById('drop-zone-content');
        const uploadProgress = document.getElementById('upload-progress');
        
        if (this.isUploading) {
            if (dropZoneContent) dropZoneContent.classList.add('hidden');
            if (uploadProgress) uploadProgress.classList.remove('hidden');
        } else {
            if (dropZoneContent) dropZoneContent.classList.remove('hidden');
            if (uploadProgress) uploadProgress.classList.add('hidden');
        }

        // Atualizar texto do botão submit
        const submitBtn = document.getElementById('upload-submit-btn');
        if (submitBtn) {
            submitBtn.disabled = this.selectedFiles.length === 0 || this.isUploading;
            
            if (this.isUploading) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
            } else {
                submitBtn.innerHTML = '<i class="fas fa-cloud-upload-alt mr-2"></i>Publicar';
            }
        }
    }

    async submitUpload() {
        if (this.selectedFiles.length === 0) {
            showToast('Selecione pelo menos um arquivo', 'error');
            return;
        }

        // Validar formulário
        const title = document.getElementById('upload-title')?.value.trim();
        const category = document.getElementById('upload-category')?.value;

        if (!title) {
            showToast('Título é obrigatório', 'error');
            return;
        }

        if (!category) {
            showToast('Categoria é obrigatória', 'error');
            return;
        }

        this.isUploading = true;
        this.updateUI();

        try {
            // Se múltiplos arquivos, usar o primeiro título para todos ou numerar
            for (let i = 0; i < this.selectedFiles.length; i++) {
                await this.uploadSingleFile(this.selectedFiles[i], i);
            }

            showToast('Upload realizado com sucesso!', 'success');
            this.closeModal();
            
            // Recarregar galeria se existir
            if (window.galleryManager) {
                window.galleryManager.loadImages();
            }

        } catch (error) {
            console.error('Erro no upload:', error);
            showToast('Erro durante o upload: ' + error.message, 'error');
        } finally {
            this.isUploading = false;
            this.updateUI();
        }
    }

    async uploadSingleFile(file, index) {
        const progressBar = document.getElementById('progress-bar');
        const uploadStatus = document.getElementById('upload-status');

        // Atualizar status
        if (uploadStatus) {
            uploadStatus.textContent = `Enviando ${index + 1} de ${this.selectedFiles.length}: ${file.name}`;
        }

        // Preparar dados do formulário
        const formData = new FormData();
        formData.append('file', file);
        
        // Metadados da imagem
        const title = document.getElementById('upload-title')?.value.trim();
        const description = document.getElementById('upload-description')?.value.trim();
        const category = document.getElementById('upload-category')?.value;
        const prompt = document.getElementById('upload-prompt')?.value.trim();
        const aiModel = document.getElementById('upload-ai-model')?.value;
        const tags = document.getElementById('upload-tags')?.value.trim();
        const isFeatured = document.getElementById('upload-featured')?.checked;

        // Adicionar título numerado se múltiplos arquivos
        const finalTitle = this.selectedFiles.length > 1 ? `${title} - ${index + 1}` : title;
        
        formData.append('title', finalTitle);
        formData.append('description', description || '');
        formData.append('category_id', category);
        formData.append('prompt_used', prompt || '');
        formData.append('ai_model', aiModel || '');
        formData.append('tags', tags || '');
        formData.append('is_featured', isFeatured ? '1' : '0');

        try {
            // Simular progresso inicial
            if (progressBar) {
                const baseProgress = (index / this.selectedFiles.length) * 100;
                progressBar.style.width = baseProgress + '%';
            }

            // Fazer upload real
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.error || 'Falha no upload');
            }

            // Atualizar progresso para completo
            if (progressBar) {
                const finalProgress = ((index + 1) / this.selectedFiles.length) * 100;
                progressBar.style.width = finalProgress + '%';
            }

            if (uploadStatus) {
                uploadStatus.textContent = `Upload concluído: ${finalTitle}`;
            }

            console.log('Upload realizado com sucesso:', result.data);
            return result.data;

        } catch (error) {
            console.error('Erro no upload:', error);
            throw error;
        }
    }



    closeModal() {
        const modal = document.getElementById('upload-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }

        // Reset form
        this.resetForm();
    }

    resetForm() {
        this.selectedFiles = [];
        this.isUploading = false;
        
        // Limpar formulário
        const form = document.getElementById('upload-form');
        if (form) form.reset();

        // Esconder previews
        const container = document.getElementById('preview-container');
        if (container) container.classList.add('hidden');

        this.updateUI();
    }

    copyPrompt() {
        const lightboxPrompt = document.getElementById('lightbox-prompt');
        const uploadPrompt = document.getElementById('upload-prompt');
        
        if (lightboxPrompt && uploadPrompt) {
            const promptText = lightboxPrompt.textContent;
            
            // Copiar para área de transferência
            navigator.clipboard.writeText(promptText).then(() => {
                showToast('Prompt copiado!', 'success');
            }).catch(() => {
                // Fallback - copiar para campo de upload
                uploadPrompt.value = promptText;
                showToast('Prompt copiado para o formulário!', 'success');
            });
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Inicializar sistema de upload
document.addEventListener('DOMContentLoaded', () => {
    window.uploadManager = new UploadManager();
});