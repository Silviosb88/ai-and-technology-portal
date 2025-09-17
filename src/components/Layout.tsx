// Layout.tsx - Componente principal do layout com sidebar e header
export const Layout = ({ children, currentPage = 'home' }: { children: any, currentPage?: string }) => {
  return (
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header class="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div class="flex items-center justify-between h-[70px] px-6">
          {/* Mobile menu button */}
          <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <i class="fas fa-bars text-ai-dark text-xl"></i>
          </button>
          
          {/* Logo */}
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-ai-primary to-ai-secondary rounded-xl flex items-center justify-center">
              <i class="fas fa-brain text-white text-lg"></i>
            </div>
            <div class="hidden sm:block">
              <h1 class="text-xl font-bold bg-gradient-to-r from-ai-primary to-ai-secondary bg-clip-text text-transparent">
                Portal IA & Tech
              </h1>
              <p class="text-xs text-gray-500 -mt-1">Educação em Tecnologia</p>
            </div>
          </div>
          
          {/* Header actions */}
          <div class="flex items-center space-x-4">
            <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
              <i class="fas fa-bell text-gray-600"></i>
              <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <i class="fas fa-search text-gray-600"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div id="mobile-overlay" class="fixed inset-0 bg-black/50 z-30 lg:hidden hidden"></div>
      
      {/* Sidebar */}
      <aside id="sidebar" class="fixed left-0 top-0 z-50 w-[280px] h-screen bg-white/90 backdrop-blur-xl border-r border-gray-200/50 transform -translate-x-full lg:translate-x-0 transition-transform duration-300">
        <div class="flex flex-col h-full">
          {/* Sidebar header */}
          <div class="flex items-center justify-between p-6 border-b border-gray-200/50">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-br from-ai-primary to-ai-secondary rounded-lg flex items-center justify-center">
                <i class="fas fa-brain text-white text-sm"></i>
              </div>
              <span class="font-semibold text-ai-dark">Portal IA</span>
            </div>
            <button id="sidebar-close" class="p-1 rounded lg:hidden hover:bg-gray-100">
              <i class="fas fa-times text-gray-500"></i>
            </button>
          </div>
          
          {/* Navigation */}
          <nav class="flex-1 p-6 overflow-y-auto">
            <div class="space-y-2">
              {/* Home */}
              <a href="/" class={`nav-item ${currentPage === 'home' ? 'active' : ''}`}>
                <i class="fas fa-home"></i>
                <span>Início</span>
              </a>
              
              {/* Galeria de IAs */}
              <a href="/galeria" class={`nav-item ${currentPage === 'galeria' ? 'active' : ''}`}>
                <i class="fas fa-images"></i>
                <span>Galeria de IAs</span>
              </a>
              
              {/* Tutoriais */}
              <a href="/tutoriais" class={`nav-item ${currentPage === 'tutoriais' ? 'active' : ''}`}>
                <i class="fas fa-book-open"></i>
                <span>Tutoriais</span>
              </a>
              
              {/* Showcase */}
              <a href="/showcase" class={`nav-item ${currentPage === 'showcase' ? 'active' : ''}`}>
                <i class="fas fa-rocket"></i>
                <span>Showcase de IAs</span>
              </a>
              
              {/* Upload */}
              <a href="/upload" class={`nav-item ${currentPage === 'upload' ? 'active' : ''}`}>
                <i class="fas fa-cloud-upload-alt"></i>
                <span>Upload & Share</span>
              </a>
            </div>
            
            {/* Seção de Categorias */}
            <div class="mt-8">
              <h3 class="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">Categorias</h3>
              <div class="space-y-2">
                <a href="/categoria/machine-learning" class="category-item">
                  <i class="fas fa-cogs text-blue-500"></i>
                  <span>Machine Learning</span>
                </a>
                <a href="/categoria/computer-vision" class="category-item">
                  <i class="fas fa-eye text-green-500"></i>
                  <span>Computer Vision</span>
                </a>
                <a href="/categoria/nlp" class="category-item">
                  <i class="fas fa-comments text-purple-500"></i>
                  <span>NLP</span>
                </a>
                <a href="/categoria/robotica" class="category-item">
                  <i class="fas fa-robot text-orange-500"></i>
                  <span>Robótica</span>
                </a>
              </div>
            </div>
          </nav>
          
          {/* Sidebar footer */}
          <div class="p-6 border-t border-gray-200/50">
            <div class="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-ai-primary/10 to-ai-secondary/10 border border-ai-primary/20">
              <div class="w-8 h-8 bg-gradient-to-br from-ai-primary to-ai-secondary rounded-full flex items-center justify-center">
                <i class="fas fa-user text-white text-sm"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">Silvio</p>
                <p class="text-xs text-gray-500 truncate">Analista de Informação</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main class="lg:ml-[280px] pt-[70px] min-h-screen">
        <div class="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

// Estilos para navegação (será processado pelo Tailwind)
const navStyles = `
.nav-item {
  @apply flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-ai-primary/10 hover:text-ai-primary transition-all duration-200 group;
}

.nav-item.active {
  @apply bg-gradient-to-r from-ai-primary/15 to-ai-secondary/10 text-ai-primary border-r-2 border-ai-primary;
}

.nav-item i {
  @apply w-5 text-center transition-colors duration-200;
}

.category-item {
  @apply flex items-center space-x-3 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200;
}
`