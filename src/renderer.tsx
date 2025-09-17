import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ? `${title} | Portal Educativo IA & Tecnologia` : 'Portal Educativo IA & Tecnologia'}</title>
        <meta name="description" content="Portal educativo completo sobre Inteligência Artificial e Tecnologia com tutoriais, galeria de IAs e showcase interativo" />
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Custom CSS */}
        <link href="/static/css/portal.css" rel="stylesheet" />
        
        {/* Tailwind Config */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      'ai-primary': '#6366f1',
                      'ai-secondary': '#8b5cf6', 
                      'ai-accent': '#06b6d4',
                      'ai-dark': '#1e293b',
                      'ai-light': '#f8fafc'
                    },
                    fontFamily: {
                      'sans': ['Inter', 'system-ui', 'sans-serif']
                    }
                  }
                }
              }
            `
          }}
        />
      </head>
      <body class="bg-ai-light min-h-screen font-sans">
        {children}
        
        {/* JavaScript Libraries */}
        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="/static/js/portal.js"></script>
      </body>
    </html>
  )
})
