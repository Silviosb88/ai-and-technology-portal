// Upload system with Cloudinary integration
class CloudinaryUploadManager {
    constructor() {
        this.cloudName = 'djqzdaf5i';
        this.uploadPreset = 'portal_ia_uploads'; // Will be created
        this.selectedFiles = [];
        this.isUploading = false;
        this.uploadedImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupDragAndDrop();
        this.loadUploadedImages();
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
                e.stopPropagation();
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
    }

    setupDragAndDrop() {
        const dropZone = document.getElementById('drop-zone');
        if (!dropZone) return;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, this.preventDefaults, false);
            document.body.addEventListener(eventName, this.preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => this.highlight(dropZone), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => this.unhighlight(dropZone), false);
        });

        dropZone.addEventListener('drop', (e) => this.handleDrop(e), false);

        // Click to select files (avoiding double trigger)
        dropZone.addEventListener('click', (e) => {
            if (e.target.closest('#file-select-btn')) return;
            const fileInput = document.getElementById('file-input');
            if (fileInput) fileInput.click();
        });
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    highlight(element) {
        element.classList.add('border-blue-500', 'bg-blue-50');
        element.classList.remove('border-gray-300');
    }

    unhighlight(element) {
        element.classList.remove('border-blue-500', 'bg-blue-50');
        element.classList.add('border-gray-300');
    }

    handleDrop(e) {
        const dt = e.dataTransfer;
        const files = Array.from(dt.files);
        this.handleFileSelection(files);
    }

    handleFileSelection(files) {
        // Filter images and videos
        const validFiles = files.filter(file => {
            return file.type.startsWith('image/') || file.type.startsWith('video/');
        });

        if (validFiles.length !== files.length) {
            const invalidCount = files.length - validFiles.length;
            this.showToast(`${invalidCount} arquivo(s) não suportados. Apenas imagens e vídeos.`, 'warning');
        }

        if (validFiles.length === 0) {
            this.showToast('Nenhum arquivo válido selecionado', 'error');
            return;
        }

        // Check file sizes
        const sizeValidFiles = validFiles.filter(file => {
            const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
            const maxSizeText = file.type.startsWith('video/') ? '50MB' : '10MB';
            
            if (file.size > maxSize) {
                this.showToast(`${file.name} é muito grande (máx. ${maxSizeText})`, 'warning');
                return false;
            }
            return true;
        });

        if (sizeValidFiles.length === 0) {
            this.showToast('Nenhum arquivo atende aos critérios de tamanho', 'error');
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
        this.showToast(message, 'success');
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
        grid.innerHTML = '';

        this.selectedFiles.forEach((file, index) => {
            const isVideo = file.type.startsWith('video/');
            const previewElement = document.createElement('div');
            previewElement.className = 'relative group';
            
            if (isVideo) {
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
                
                const removeBtn = previewElement.querySelector('.remove-file');
                removeBtn.addEventListener('click', () => {
                    URL.revokeObjectURL(videoUrl);
                    this.removeFile(index);
                });
            } else {
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

                    const removeBtn = previewElement.querySelector('.remove-file');
                    removeBtn.addEventListener('click', () => this.removeFile(index));
                };
                reader.readAsDataURL(file);
            }

            grid.appendChild(previewElement);
        });
    }

    removeFile(index) {
        this.selectedFiles.splice(index, 1);
        this.showPreviews();
        this.updateUI();
        
        if (this.selectedFiles.length === 0) {
            this.showToast('Todos os arquivos foram removidos', 'info');
        } else {
            this.showToast('Arquivo removido', 'success');
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
            this.showToast('Selecione pelo menos um arquivo', 'error');
            return;
        }

        const title = document.getElementById('upload-title')?.value.trim();
        const category = document.getElementById('upload-category')?.value;

        if (!title) {
            this.showToast('Título é obrigatório', 'error');
            return;
        }

        if (!category) {
            this.showToast('Categoria é obrigatória', 'error');
            return;
        }

        this.isUploading = true;
        this.updateUI();

        try {
            const uploadPromises = this.selectedFiles.map((file, index) => 
                this.uploadSingleFile(file, index)
            );

            await Promise.all(uploadPromises);

            this.showToast('Upload realizado com sucesso!', 'success');
            this.closeModal();
            
            // Reload gallery if exists
            if (window.galleryManager) {
                window.galleryManager.loadImages();
            }

        } catch (error) {
            console.error('Erro no upload:', error);
            this.showToast('Erro durante o upload: ' + error.message, 'error');
        } finally {
            this.isUploading = false;
            this.updateUI();
        }
    }

    async uploadSingleFile(file, index) {
        const progressBar = document.getElementById('progress-bar');
        const uploadStatus = document.getElementById('upload-status');

        if (uploadStatus) {
            uploadStatus.textContent = `Enviando ${index + 1} de ${this.selectedFiles.length}: ${file.name}`;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'unsigned_uploads'); // Fallback preset
        
        try {
            if (progressBar) {
                const baseProgress = (index / this.selectedFiles.length) * 100;
                progressBar.style.width = baseProgress + '%';
            }

            const response = await fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/upload`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error?.message || 'Falha no upload');
            }

            // Save to localStorage
            const uploadedItem = {
                id: Date.now() + index,
                title: document.getElementById('upload-title')?.value.trim(),
                description: document.getElementById('upload-description')?.value.trim(),
                category: document.getElementById('upload-category')?.value,
                url: result.secure_url,
                thumbnail: result.eager?.[0]?.secure_url || result.secure_url,
                publicId: result.public_id,
                format: result.format,
                resourceType: result.resource_type,
                uploadedAt: new Date().toISOString()
            };

            this.uploadedImages.push(uploadedItem);
            localStorage.setItem('uploadedImages', JSON.stringify(this.uploadedImages));

            if (progressBar) {
                const finalProgress = ((index + 1) / this.selectedFiles.length) * 100;
                progressBar.style.width = finalProgress + '%';
            }

            if (uploadStatus) {
                uploadStatus.textContent = `Upload concluído: ${uploadedItem.title}`;
            }

            return result;

        } catch (error) {
            console.error('Erro no upload:', error);
            throw error;
        }
    }

    loadUploadedImages() {
        // This method will be called by the gallery to load images
        return this.uploadedImages;
    }

    closeModal() {
        const modal = document.getElementById('upload-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
        }
        this.resetForm();
    }

    resetForm() {
        this.selectedFiles = [];
        this.isUploading = false;
        
        const form = document.getElementById('upload-form');
        if (form) form.reset();

        const container = document.getElementById('preview-container');
        if (container) container.classList.add('hidden');

        this.updateUI();
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    showToast(message, type = 'info') {
        // Simple toast implementation
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 p-4 rounded-lg z-50 text-white ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
        }`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 4000);
    }
}

// Initialize upload manager
document.addEventListener('DOMContentLoaded', () => {
    window.cloudinaryUploadManager = new CloudinaryUploadManager();
});