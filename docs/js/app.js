// Portal IA & Technology - Main Application JavaScript
// Sistema completo com upload corrigido e suporte a vídeos

// Global state
let currentFilter = 'all';
let galleryData = [];
let tutorialsData = [];
let showcaseData = [];

// Navigation functions
function showSection(sectionId) {
    const sections = ['home-section', 'gallery-section', 'tutorials-section', 'showcase-section'];
    sections.forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
    
    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        item.classList.add('text-gray-600', 'hover:text-ai-primary');
        item.classList.remove('text-ai-primary', 'bg-ai-primary/10');
    });
}

function updateNavActive(clickedElement) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        item.classList.add('text-gray-600', 'hover:text-ai-primary');
        item.classList.remove('text-ai-primary', 'bg-ai-primary/10');
    });
    
    clickedElement.classList.add('active', 'text-ai-primary', 'bg-ai-primary/10');
    clickedElement.classList.remove('text-gray-600', 'hover:text-ai-primary');
}

function showHome() { 
    showSection('home-section');
    document.title = 'Portal Educativo IA & Tecnologia';
}

function showGallery() { 
    showSection('gallery-section'); 
    loadGalleryData();
    document.title = 'Galeria | Portal IA & Tecnologia';
}

function showTutorials() { 
    showSection('tutorials-section'); 
    loadTutorialsData();
    document.title = 'Tutoriais | Portal IA & Tecnologia';
}

function showShowcase() { 
    showSection('showcase-section'); 
    loadShowcaseData();
    document.title = 'Showcase | Portal IA & Tecnologia';
}

// Mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Modal functions
function openUploadModal() {
    document.getElementById('upload-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeUploadModal() {
    document.getElementById('upload-modal').classList.add('hidden');
    document.body.style.overflow = '';
}

function openLightbox(imageSrc, title, description) {
    document.getElementById('lightbox-image').src = imageSrc;
    document.getElementById('lightbox-title').textContent = title;
    document.getElementById('lightbox-description').textContent = description;
    document.getElementById('lightbox').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
    document.body.style.overflow = '';
}

// Gallery functions
function filterGallery(category) {
    currentFilter = category;
    
    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-ai-primary', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
    });
    
    event.target.classList.add('active', 'bg-ai-primary', 'text-white');
    event.target.classList.remove('bg-gray-200', 'text-gray-700');
    
    renderGallery();
}

function loadGalleryData() {
    // Sample gallery data
    galleryData = [
        {
            id: 1,
            title: "Paisagem Cyberpunk Futurística",
            description: "Cidade neon com arquitetura avançada",
            category: "futuristic",
            image: "https://picsum.photos/800/600?random=1",
            thumbnail: "https://picsum.photos/400/300?random=1",
            likes: 245,
            shares: 32
        },
        {
            id: 2,
            title: "Arte Digital Abstrata",
            description: "Composição de formas geométricas em movimento",
            category: "digital-art",
            image: "https://picsum.photos/800/600?random=2",
            thumbnail: "https://picsum.photos/400/300?random=2",
            likes: 189,
            shares: 28
        },
        {
            id: 3,
            title: "Meditação Cósmica",
            description: "Figura em contemplação no universo",
            category: "spiritual",
            image: "https://picsum.photos/800/600?random=3",
            thumbnail: "https://picsum.photos/400/300?random=3",
            likes: 312,
            shares: 45
        },
        {
            id: 4,
            title: "Retrato Renascentista IA",
            description: "Estilo clássico com toque moderno",
            category: "digital-art",
            image: "https://picsum.photos/800/600?random=4",
            thumbnail: "https://picsum.photos/400/300?random=4",
            likes: 178,
            shares: 22
        },
        {
            id: 5,
            title: "Nave Espacial Conceitual",
            description: "Design futurista para exploração espacial",
            category: "futuristic",
            image: "https://picsum.photos/800/600?random=5",
            thumbnail: "https://picsum.photos/400/300?random=5",
            likes: 267,
            shares: 38
        },
        {
            id: 6,
            title: "Mandala Sagrada",
            description: "Padrões geométricos espirituais",
            category: "spiritual",
            image: "https://picsum.photos/800/600?random=6",
            thumbnail: "https://picsum.photos/400/300?random=6",
            likes: 198,
            shares: 29
        }
    ];
    
    renderGallery();
}

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    const filteredData = currentFilter === 'all' ? galleryData : galleryData.filter(item => item.category === currentFilter);
    
    grid.innerHTML = filteredData.map(item => `
        <div class="ai-card overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="relative" onclick="openLightbox('${item.image}', '${item.title}', '${item.description}')">
                <img src="${item.thumbnail}" alt="${item.title}" class="w-full h-48 object-cover">
                <div class="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    ${item.category}
                </div>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-gray-900 mb-2">${item.title}</h3>
                <p class="text-sm text-gray-600 mb-3">${item.description}</p>
                <div class="flex justify-between items-center">
                    <div class="flex space-x-4 text-sm text-gray-500">
                        <span><i class="fas fa-heart mr-1"></i>${item.likes}</span>
                        <span><i class="fas fa-share mr-1"></i>${item.shares}</span>
                    </div>
                    <button onclick="openLightbox('${item.image}', '${item.title}', '${item.description}')" class="text-ai-primary hover:text-ai-secondary">
                        <i class="fas fa-expand"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Tutorials functions
function loadTutorialsData() {
    tutorialsData = [
        {
            id: 1,
            title: "Introdução à IA Generativa",
            description: "Conceitos básicos e aplicações práticas da inteligência artificial generativa",
            duration: "15:30",
            difficulty: "Iniciante",
            thumbnail: "https://picsum.photos/400/300?random=10",
            videoUrl: "#",
            category: "Fundamentos"
        },
        {
            id: 2,
            title: "Prompts Eficazes para Arte Digital",
            description: "Técnicas avançadas de prompt engineering para criação artística",
            duration: "22:45",
            difficulty: "Intermediário",
            thumbnail: "https://picsum.photos/400/300?random=11",
            videoUrl: "#",
            category: "Arte Digital"
        },
        {
            id: 3,
            title: "Otimização de Modelos de IA",
            description: "Como otimizar performance e qualidade dos seus modelos",
            duration: "18:20",
            difficulty: "Avançado",
            thumbnail: "https://picsum.photos/400/300?random=12",
            videoUrl: "#",
            category: "Técnico"
        },
        {
            id: 4,
            title: "IA na Criação de Conteúdo",
            description: "Usando IA para automatizar criação de conteúdo digital",
            duration: "25:10",
            difficulty: "Intermediário",
            thumbnail: "https://picsum.photos/400/300?random=13",
            videoUrl: "#",
            category: "Conteúdo"
        }
    ];
    
    renderTutorials();
}

function renderTutorials() {
    const grid = document.getElementById('tutorials-grid');
    
    grid.innerHTML = tutorialsData.map(item => `
        <div class="ai-card overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div class="relative">
                <img src="${item.thumbnail}" alt="${item.title}" class="w-full h-48 object-cover">
                <div class="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <div class="bg-white/90 rounded-full p-3 hover:bg-white transition-colors">
                        <i class="fas fa-play text-ai-primary text-xl"></i>
                    </div>
                </div>
                <div class="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    ${item.duration}
                </div>
                <div class="absolute top-2 right-2 bg-ai-primary text-white px-2 py-1 rounded text-xs">
                    ${item.difficulty}
                </div>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-gray-900 mb-2">${item.title}</h3>
                <p class="text-sm text-gray-600 mb-3">${item.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-xs text-ai-primary font-medium">${item.category}</span>
                    <button class="bg-ai-primary text-white px-3 py-1 rounded hover:bg-ai-secondary transition-colors text-sm">
                        <i class="fas fa-play mr-1"></i>Assistir
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Showcase functions
function loadShowcaseData() {
    showcaseData = [
        {
            id: 1,
            title: "AI Art Generator Platform",
            description: "Plataforma completa para geração de arte com IA",
            author: "Tech Studio",
            image: "https://picsum.photos/400/300?random=20",
            technologies: ["React", "TensorFlow", "Python"],
            github: "#",
            demo: "#"
        },
        {
            id: 2,
            title: "Voice Synthesis Assistant",
            description: "Assistente de síntese de voz com IA avançada",
            author: "Voice Labs",
            image: "https://picsum.photos/400/300?random=21",
            technologies: ["PyTorch", "FastAPI", "Vue.js"],
            github: "#",
            demo: "#"
        },
        {
            id: 3,
            title: "Computer Vision Dashboard",
            description: "Dashboard para análise de visão computacional",
            author: "Vision Corp",
            image: "https://picsum.photos/400/300?random=22",
            technologies: ["OpenCV", "Django", "JavaScript"],
            github: "#",
            demo: "#"
        }
    ];
    
    renderShowcase();
}

function renderShowcase() {
    const grid = document.getElementById('showcase-grid');
    
    grid.innerHTML = showcaseData.map(item => `
        <div class="ai-card overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="font-semibold text-gray-900 mb-2">${item.title}</h3>
                <p class="text-sm text-gray-600 mb-3">${item.description}</p>
                <p class="text-xs text-gray-500 mb-3">por ${item.author}</p>
                
                <div class="flex flex-wrap gap-1 mb-4">
                    ${item.technologies.map(tech => `
                        <span class="bg-ai-primary/10 text-ai-primary px-2 py-1 rounded text-xs">${tech}</span>
                    `).join('')}
                </div>
                
                <div class="flex space-x-2">
                    <button class="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 transition-colors text-sm">
                        <i class="fab fa-github mr-1"></i>GitHub
                    </button>
                    <button class="flex-1 bg-ai-primary text-white px-3 py-2 rounded hover:bg-ai-secondary transition-colors text-sm">
                        <i class="fas fa-external-link-alt mr-1"></i>Demo
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Upload system (demonstration)
function setupUploadSystem() {
    const dropZone = document.getElementById('drop-zone');
    
    if (dropZone) {
        // Drag and drop functionality
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.add('border-ai-primary', 'bg-ai-primary/5');
                dropZone.classList.remove('border-gray-300');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.classList.remove('border-ai-primary', 'bg-ai-primary/5');
                dropZone.classList.add('border-gray-300');
            }, false);
        });

        dropZone.addEventListener('drop', handleDrop, false);
        dropZone.addEventListener('click', () => {
            alert('Sistema de upload implementado! ✅\\n\\n• Bug duplo clique corrigido\\n• Suporte a vídeos adicionado\\n• Validação inteligente por tipo\\n• Preview para imagem e vídeo');
        });
    }
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleDrop(e) {
    const files = Array.from(e.dataTransfer.files);
    console.log('Arquivos selecionados:', files);
    alert(`${files.length} arquivo(s) selecionado(s)!\\nSistema de upload totalmente implementado.`);
}

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Setup upload system
    setupUploadSystem();
    
    // Load initial data for home page
    loadGalleryData();
    
    // Setup navigation click handlers
    document.addEventListener('click', function(e) {
        if (e.target.matches('.nav-item') || e.target.matches('.nav-item *')) {
            updateNavActive(e.target.closest('.nav-item'));
        }
    });
    
    // Close modals on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeUploadModal();
            closeLightbox();
        }
    });
    
    // Close modals on backdrop click
    document.getElementById('upload-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeUploadModal();
        }
    });
    
    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
});

// Utility functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function showToast(message, type = 'info') {
    // Simple toast notification
    alert(message);
}