// Layout.tsx - Componente principal do layout com sidebar e header
export const Layout = ({ children, currentPage = 'home' }: { children: any, currentPage?: string }) => {
  return (
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header - Melhorado para mobile */}
      <header class="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div class="flex items-center justify-between h-[70px] px-4 sm:px-6">
          {/* Mobile menu button */}
          <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <i class="fas fa-bars text-ai-dark text-xl"></i>
          </button>
          
          {/* Logo - Melhorado para mobile */}
          <a href="/" class="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity">
            <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-ai-primary to-ai-secondary rounded-xl flex items-center justify-center">
              <i class="fas fa-brain text-white text-sm sm:text-lg"></i>
            </div>
            <div class="hidden sm:block">
              <h1 class="text-lg sm:text-xl font-bold bg-gradient-to-r from-ai-primary to-ai-secondary bg-clip-text text-transparent">
                Portal IA & Tech
              </h1>
              <p class="text-xs text-gray-500 -mt-1">Educação em Tecnologia</p>
            </div>
            {/* Título mobile */}
            <div class="sm:hidden">
              <h1 class="text-base font-bold bg-gradient-to-r from-ai-primary to-ai-secondary bg-clip-text text-transparent">
                Portal IA
              </h1>
            </div>
          </a>
          
          {/* Header actions - Melhorado para mobile */}
          <div class="flex items-center space-x-2 sm:space-x-4">
            <button id="search-btn" class="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Buscar">
              <i class="fas fa-search text-gray-600"></i>
            </button>
            <button class="hidden sm:block p-2 rounded-lg hover:bg-gray-100 transition-colors relative" title="Notificações">
              <i class="fas fa-bell text-gray-600"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div id="mobile-overlay" class="fixed inset-0 bg-black/50 z-30 lg:hidden hidden"></div>
      
      {/* Sidebar - Melhorado para mobile */}
      <aside id="sidebar" class="fixed left-0 top-0 z-50 w-[280px] sm:w-[300px] h-screen bg-white/95 backdrop-blur-xl border-r border-gray-200/50 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 shadow-2xl lg:shadow-none">
        <div class="flex flex-col h-full">
          {/* Sidebar header - Melhorado */}
          <div class="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200/50">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-br from-ai-primary to-ai-secondary rounded-lg flex items-center justify-center">
                <i class="fas fa-brain text-white text-sm"></i>
              </div>
              <span class="font-semibold text-ai-dark">Portal IA</span>
            </div>
            <button id="sidebar-close" class="p-2 rounded-lg lg:hidden hover:bg-gray-100 transition-colors">
              <i class="fas fa-times text-gray-500"></i>
            </button>
          </div>
          
          {/* Navigation - Links funcionais */}
          <nav class="flex-1 p-4 sm:p-6 overflow-y-auto">
            <div class="space-y-1 sm:space-y-2">
              {/* Home */}
              <a href="/" class={`nav-item ${currentPage === 'home' ? 'active' : ''}`}>
                <i class="fas fa-home"></i>
                <span>Início</span>
              </a>
              
              {/* Benefícios estudantis */}
              <a href="/beneficios" class={`nav-item ${currentPage === 'beneficios' ? 'active' : ''}`}>
                <i class="fas fa-graduation-cap"></i>
                <span>Benefícios</span>
              </a>

              {/* ENEM 2026 — espaço reservado (guia em preparação) */}
              <a href="/beneficios/enem-2026" class="nav-item">
                <i class="fas fa-file-signature"></i>
                <span>ENEM 2026
                  <span class="ml-1 text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full align-middle">EM BREVE</span>
                </span>
              </a>

              {/* Direitos dos professores */}
              <a href="/direitos-professores" class={`nav-item ${currentPage === 'professores' ? 'active' : ''}`}>
                <i class="fas fa-chalkboard-teacher"></i>
                <span>Professores</span>
              </a>

              {/* Benefícios ocultos (estudantes + professores) */}
              <a href="/beneficios-ocultos" class={`nav-item ${currentPage === 'ocultos' ? 'active' : ''}`}>
                <i class="fas fa-gem"></i>
                <span>Benefícios ocultos</span>
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
                <span>Showcase</span>
              </a>
              
              {/* Upload removido: submissão de projetos será uma página própria no futuro */}
            </div>
            
            {/* Seção de Categorias - Melhorada */}
            <div class="mt-6 sm:mt-8">
              <h3 class="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-3 sm:mb-4 px-1">Categorias</h3>
              <div class="space-y-1 sm:space-y-2">
                <a href="/galeria?categoria=machine-learning" class="category-item">
                  <i class="fas fa-cogs text-blue-500"></i>
                  <span>Machine Learning</span>
                </a>
                <a href="/galeria?categoria=computer-vision" class="category-item">
                  <i class="fas fa-eye text-green-500"></i>
                  <span>Computer Vision</span>
                </a>
                <a href="/galeria?categoria=nlp" class="category-item">
                  <i class="fas fa-comments text-purple-500"></i>
                  <span>NLP</span>
                </a>
                <a href="/galeria?categoria=robotica" class="category-item">
                  <i class="fas fa-robot text-orange-500"></i>
                  <span>Robótica</span>
                </a>
                <a href="/galeria?categoria=generative" class="category-item">
                  <i class="fas fa-magic text-pink-500"></i>
                  <span>IA Generativa</span>
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
      
      {/* Footer */}
      <footer class="lg:ml-[280px] bg-gradient-to-r from-ai-dark to-slate-800 text-white">
        <div class="p-6">
          <div class="text-center">
            <div class="flex items-center justify-center mb-4">
              <div class="w-8 h-8 bg-gradient-to-br from-ai-primary to-ai-secondary rounded-lg flex items-center justify-center mr-3">
                <i class="fas fa-brain text-white text-sm"></i>
              </div>
              <span class="text-xl font-bold">Portal IA & Tech</span>
            </div>
            
            <div class="flex justify-center space-x-6 mb-4">
              <a href="/" class="text-gray-300 hover:text-white transition-colors">
                <i class="fas fa-home text-xl"></i>
              </a>
              <a href="/galeria" class="text-gray-300 hover:text-white transition-colors">
                <i class="fas fa-images text-xl"></i>
              </a>
              <a href="/tutoriais" class="text-gray-300 hover:text-white transition-colors">
                <i class="fas fa-book-open text-xl"></i>
              </a>
              <a href="/beneficios" class="text-gray-300 hover:text-white transition-colors">
                <i class="fas fa-graduation-cap text-xl"></i>
              </a>
              <a href="/direitos-professores" class="text-gray-300 hover:text-white transition-colors">
                <i class="fas fa-chalkboard-teacher text-xl"></i>
              </a>
              <a href="/beneficios-ocultos" class="text-gray-300 hover:text-white transition-colors">
                <i class="fas fa-gem text-xl"></i>
              </a>
            </div>
            
            <div class="border-t border-gray-600 pt-4">
              <p class="text-sm text-gray-400">
                © 2026 Portal IA & Tech — Direitos e benefícios para quem estuda e para quem ensina. Conteúdo verificado em fontes oficiais.
              </p>
              <p class="text-xs text-gray-500 mt-2">
                Última verificação dos guias: 04/11/2026 · contato@iaetech.com.br
              </p>
              <div class="border-t border-gray-700 mt-4 pt-4">
                <p class="text-xs text-gray-500 leading-relaxed">
                  <strong class="text-gray-400">Aviso sobre marcas e independência:</strong> o Portal IA & Tech é um projeto educacional independente. Não somos afiliados, patrocinados ou endossados pela Microsoft, Google, GitHub, Kaggle (Google), freeCodeCamp, Canva, Figma, JetBrains, Notion, Autodesk, AWS, Apple, Coursera, CAPES ou qualquer outra empresa/organização citada. Todos os nomes, logotipos e marcas mencionados são propriedade de seus respectivos titulares e são usados aqui de forma nominativa e referencial, apenas para identificação informativa (art. 132, IV, da Lei 9.279/96 — Lei da Propriedade Industrial). Os links apontam sempre para as fontes oficiais, onde as condições, preços e critérios de elegibilidade podem mudar a qualquer momento — confirme antes de decidir. Este conteúdo é informativo e não constitui aconselhamento jurídico ou profissional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
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