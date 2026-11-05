import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { Layout } from './components/Layout'
import { Gallery } from './components/Gallery'
import { Lightbox } from './components/Lightbox'
import { UploadModal } from './components/UploadModal'
import { ImageQueries, TutorialQueries, ShowcaseQueries, StatsQueries } from './utils/database'
import type { Env } from './types/database'

const app = new Hono<{ Bindings: Env }>()

// Middlewares
app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './public' }))
app.use(renderer)

// Página inicial - Dashboard do Portal
app.get('/', (c) => {
  return c.render(
    <Layout currentPage="home">
      <div class="space-y-8">
        {/* Hero Section - Melhorado para mobile */}
        <div class="bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10">
            <span class="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3">
              🎓 Portal de referência para estudantes
            </span>
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Conheça seus direitos como estudante
            </h1>
            <p class="text-lg sm:text-xl mb-6 text-white/90">
              Microsoft 365, Azure, GitHub, Google e outras ferramentas pagas são <strong>gratuitas</strong> para estudantes e professores elegíveis — e professores têm direitos próprios (piso salarial, hora-atividade, aposentadoria especial). Guias claros, verificados e atualizados, para que nenhum direito se perca por desconhecimento.
            </p>
            <div class="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <a href="/beneficios" class="bg-white text-ai-primary hover:bg-blue-50 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors text-center">
                <i class="fas fa-graduation-cap mr-2"></i>
                Benefícios para estudantes
              </a>
              <a href="/direitos-professores" class="bg-white/20 hover:bg-white/30 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm text-center">
                <i class="fas fa-chalkboard-teacher mr-2"></i>
                Direitos dos professores
              </a>
            </div>
          </div>
        </div>

        {/* Estatísticas - Melhorado para mobile */}
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div class="ai-card p-4 sm:p-6 text-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <i class="fas fa-graduation-cap text-blue-600 text-lg sm:text-xl"></i>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">4</h3>
            <p class="text-xs sm:text-sm text-gray-600">Benefícios com guia completo</p>
          </div>
          
          <div class="ai-card p-4 sm:p-6 text-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <i class="fas fa-check-circle text-green-600 text-lg sm:text-xl"></i>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">100%</h3>
            <p class="text-xs sm:text-sm text-gray-600">Fontes oficiais citadas</p>
          </div>
          
          <div class="ai-card p-4 sm:p-6 text-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <i class="fas fa-list text-purple-600 text-lg sm:text-xl"></i>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">10+</h3>
            <p class="text-xs sm:text-sm text-gray-600">Programas em catalogação</p>
          </div>
          
          <div class="ai-card p-4 sm:p-6 text-center">
            <div class="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <i class="fas fa-calendar-check text-orange-600 text-lg sm:text-xl"></i>
            </div>
            <h3 class="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">04/11/2026</h3>
            <p class="text-xs sm:text-sm text-gray-600">Última verificação</p>
          </div>
        </div>

        {/* Seções em Destaque */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Benefícios em Destaque */}
          <div class="ai-card p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900">
                <i class="fas fa-graduation-cap text-blue-500 mr-2"></i>
                Benefícios em destaque
              </h2>
              <a href="/beneficios" class="text-ai-primary hover:text-ai-secondary font-medium">
                Ver todos <i class="fas fa-arrow-right ml-1"></i>
              </a>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href="/beneficios/office-365-education" class="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100">
                <div class="flex items-center justify-between mb-2">
                  <i class="fab fa-microsoft text-2xl text-blue-600"></i>
                  <span class="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Gratuito</span>
                </div>
                <h3 class="font-semibold text-gray-900 mb-1">Microsoft 365 Education (A1)</h3>
                <p class="text-sm text-gray-600">Word, Excel, PowerPoint e Teams grátis com e-mail institucional</p>
              </a>
              <a href="/beneficios/azure-for-students" class="block p-4 bg-cyan-50 hover:bg-cyan-100 rounded-lg transition-colors border border-cyan-100">
                <div class="flex items-center justify-between mb-2">
                  <i class="fas fa-cloud text-2xl text-cyan-600"></i>
                  <span class="text-xs font-bold text-cyan-700 bg-cyan-100 px-2 py-0.5 rounded-full">US$ 100</span>
                </div>
                <h3 class="font-semibold text-gray-900 mb-1">Azure for Students</h3>
                <p class="text-sm text-gray-600">Crédito de nuvem sem cartão de crédito, renovável anualmente</p>
              </a>
              <a href="/beneficios/github-student-pack" class="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
                <div class="flex items-center justify-between mb-2">
                  <i class="fab fa-github text-2xl text-gray-800"></i>
                  <span class="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Gratuito</span>
                </div>
                <h3 class="font-semibold text-gray-900 mb-1">GitHub Student Pack</h3>
                <p class="text-sm text-gray-600">Copilot, GitHub Pro e dezenas de ofertas de parceiros</p>
              </a>
              <a href="/beneficios/google-ai-pro-estudantes" class="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-100">
                <div class="flex items-center justify-between mb-2">
                  <i class="fab fa-google text-2xl text-green-600"></i>
                  <span class="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">Desconto</span>
                </div>
                <h3 class="font-semibold text-gray-900 mb-1">Google AI Pro estudantes</h3>
                <p class="text-sm text-gray-600">Plano com desconto enquanto estudante, até 4 anos</p>
              </a>
            </div>
          </div>

          {/* Tutoriais Recentes */}
          <div class="ai-card p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900">
                <i class="fas fa-graduation-cap text-blue-500 mr-2"></i>
                Tutoriais Recentes
              </h2>
              <a href="/tutoriais" class="text-ai-primary hover:text-ai-secondary font-medium">
                Ver todos <i class="fas fa-arrow-right ml-1"></i>
              </a>
            </div>
            
            <div class="space-y-4">
              <a href="https://learn.microsoft.com/pt-br/training" target="_blank" rel="noopener noreferrer" class="block">
                <div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i class="fab fa-microsoft text-white text-sm"></i>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 mb-1">Microsoft Learn</h3>
                    <p class="text-sm text-gray-600 mb-2">Roteiros oficiais de IA, Azure e Copilot em português</p>
                    <span class="text-xs text-ai-primary font-medium">Gratuito • Oficial</span>
                  </div>
                </div>
              </a>
              
              <a href="https://www.kaggle.com/learn" target="_blank" rel="noopener noreferrer" class="block">
                <div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-flask text-white text-sm"></i>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 mb-1">Kaggle Learn</h3>
                    <p class="text-sm text-gray-600 mb-2">Python e Machine Learning com certificado gratuito</p>
                    <span class="text-xs text-ai-primary font-medium">Gratuito • Certificado</span>
                  </div>
                </div>
              </a>
              
              <a href="https://grow.google/ai-essentials/" target="_blank" rel="noopener noreferrer" class="block">
                <div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div class="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i class="fab fa-google text-white text-sm"></i>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-semibold text-gray-900 mb-1">Google AI Essentials</h3>
                    <p class="text-sm text-gray-600 mb-2">Fundamentos de IA generativa e prompting pelo Google</p>
                    <span class="text-xs text-ai-primary font-medium">Oficial • Zero experiência</span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 text-center border border-gray-200">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Nenhum direito deve ser perdido por desconhecimento
          </h2>
          <p class="text-xl text-gray-600 mb-6">
            Veja quais benefícios você tem e como ativá-los em poucos minutos — sempre com fonte oficial e data de verificação
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a href="/beneficios" class="ai-button-primary text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              <i class="fas fa-graduation-cap mr-2"></i>
              Explorar Benefícios
            </a>
            <a href="/tutoriais" class="bg-white text-ai-primary px-8 py-3 rounded-lg font-semibold border-2 border-ai-primary hover:bg-ai-primary hover:text-white transition-all">
              <i class="fas fa-book-open mr-2"></i>
              Guias de IA
            </a>
          </div>
        </div>
      </div>
    </Layout>,
    { title: 'Portal IA & Tech — Benefícios para Estudantes' }
  )
})

// =========================================
// BENEFÍCIOS ESTUDANTIS — guias verificados em fontes oficiais
// Última verificação: 04/11/2026
// =========================================

const VERIFICADO = '04/11/2026'

type Fonte = { label: string; url: string }
type Beneficio = {
  slug: string
  nome: string
  icone: string
  corIcone: string
  bgIcone: string
  badge: string
  badgeClasse: string
  resumo: string
  oQueE: string[]
  direitos: string[]
  passos: string[]
  documentos: string[]
  prazos: string[]
  aviso?: string
  linkOficial: string
  fontes: Fonte[]
}

const BENEFICIOS: Beneficio[] = [
  {
    slug: 'office-365-education',
    nome: 'Microsoft 365 Education (A1)',
    icone: 'fab fa-microsoft',
    corIcone: 'text-blue-600',
    bgIcone: 'bg-blue-100',
    badge: 'Gratuito',
    badgeClasse: 'bg-green-100 text-green-800',
    resumo: 'Word, Excel, PowerPoint, OneNote e Teams na web, gratuitos para estudantes de instituições elegíveis.',
    oQueE: [
      'O Microsoft 365 Education é a suíte Office da Microsoft com o plano A1 gratuito para instituições de ensino qualificadas.',
      'Inclui versões web de Word, Excel, PowerPoint, OneNote e Teams, além de serviços online (como OneDrive) vinculados ao e-mail da instituição.'
    ],
    direitos: [
      'Estudantes e educadores com e-mail de instituição educacional elegível.',
      'A qualificação pode ser reverificada pela Microsoft a qualquer momento.'
    ],
    passos: [
      'Acesse a página oficial do Microsoft 365 Education (botão "Site oficial").',
      'Clique em "Começar gratuitamente" (Get started for free).',
      'Informe seu e-mail institucional (ex.: nome@sua-instituicao.edu.br).',
      'Aguarde a verificação: na maioria dos casos é instantânea e automatizada; se a instituição precisar ser verificada manualmente, pode levar até um mês.',
      'Faça login com sua conta Microsoft e comece a usar os aplicativos na web.'
    ],
    documentos: [
      'E-mail institucional ativo (fornecido pela escola/faculdade).',
      'Conta Microsoft vinculada a esse e-mail.'
    ],
    prazos: [
      'Disponível enquanto você estiver matriculado ou vinculado à instituição elegível.',
      'Se o plano expirar, os aplicativos entram em modo de funcionalidade reduzida (visualizar, mas não editar) — dá para revalidar seu status para estender o acesso.'
    ],
    linkOficial: 'https://www.microsoft.com/pt-br/education/products/office',
    fontes: [
      { label: 'Microsoft Education — Office 365 gratuito para escolas (PT-BR)', url: 'https://www.microsoft.com/pt-br/education/products/office' }
    ]
  },
  {
    slug: 'azure-for-students',
    nome: 'Azure for Students',
    icone: 'fas fa-cloud',
    corIcone: 'text-cyan-600',
    bgIcone: 'bg-cyan-100',
    badge: 'US$ 100 sem cartão',
    badgeClasse: 'bg-cyan-100 text-cyan-800',
    resumo: 'Crédito de US$ 100 para usar na nuvem Azure, sem cartão de crédito, renovável anualmente enquanto você estudar.',
    oQueE: [
      'Assinatura Azure para estudantes, gratuita e sem exigência de cartão de crédito.',
      'Inclui crédito de USD 100, utilizável em até 12 meses na maioria dos produtos Azure.',
      'Dá acesso a ferramentas de desenvolvimento via Azure Dev Tools for Teaching (Visual Studio, SQL Server, Windows Server e outros).'
    ],
    direitos: [
      'Estudantes com e-mail institucional/escolar válido.',
      'Renovação anual enquanto você continuar estudante.',
      'Limite de uma conta por pessoa.'
    ],
    passos: [
      'Acesse azure.microsoft.com/pt-br/free/students (botão abaixo).',
      'Clique em "Comece gratuitamente" e entre com sua conta Microsoft.',
      'Verifique seu status de estudante usando o e-mail escolar.',
      'Ative a assinatura — sem cartão de crédito.',
      'Se quiser, baixe as ferramentas no Hub de Educação do Azure.'
    ],
    documentos: [
      'E-mail institucional/escolar ativo.',
      'Conta Microsoft para login.'
    ],
    prazos: [
      'O crédito de US$ 100 vale por 12 meses.',
      'A assinatura é renovada anualmente enquanto você permanecer estudante.',
      'Ao fim do ciclo, você pode migrar para pagamento conforme o uso; sem migrar, a assinatura e os produtos são desabilitados.'
    ],
    aviso: 'O crédito não pode ser usado em ofertas do Azure Marketplace.',
    linkOficial: 'https://azure.microsoft.com/pt-br/free/students',
    fontes: [
      { label: 'Microsoft Azure for Students — página oficial (PT-BR)', url: 'https://azure.microsoft.com/pt-br/free/students' }
    ]
  },
  {
    slug: 'github-student-pack',
    nome: 'GitHub Student Developer Pack',
    icone: 'fab fa-github',
    corIcone: 'text-gray-800',
    bgIcone: 'bg-gray-100',
    badge: 'Gratuito',
    badgeClasse: 'bg-green-100 text-green-800',
    resumo: 'GitHub Pro grátis, Copilot Student e dezenas de ofertas de parceiros (Azure, JetBrains, 1Password, Heroku e mais).',
    oQueE: [
      'Pacote de ofertas do GitHub e de parceiros para estudantes verificados.',
      'Inclui GitHub Pro gratuito enquanto durar o status de estudante e o GitHub Copilot Student: sugestões de código ilimitadas, créditos de IA e uso limitado de chat/agentes.',
      'Reúne ofertas como Azure (US$ 100 de crédito), JetBrains (IDEs grátis com renovação anual), Namecheap, 1Password (2 anos), Heroku, MongoDB, Notion, DataCamp e muitas outras.'
    ],
    direitos: [
      'Estudantes verificados pelo GitHub Education — a partir de 13 anos, matriculados em instituição que conceda grau ou diploma (critérios na documentação oficial).'
    ],
    passos: [
      'Acesse education.github.com/pack (botão abaixo).',
      'Faça login na sua conta GitHub e inicie a candidatura ao Student Developer Pack.',
      'Preencha os dados da instituição e informe o e-mail escolar, se tiver.',
      'Envie a prova de matrícula e a foto de documento quando solicitado (foto nítida, com nome e datas legíveis).',
      'Aguarde a análise e ative as ofertas pelo painel do Pack.'
    ],
    documentos: [
      'Comprovante de matrícula ou documento escolar com data de emissão recente.',
      'Foto de identificação com nome e datas legíveis.',
      'E-mail institucional ajuda na aprovação (nem sempre obrigatório).'
    ],
    prazos: [
      'GitHub Pro e Copilot Student valem enquanto o status de estudante estiver verificado (com reverificação periódica).',
      'Cada oferta de parceiro tem prazo próprio — confira no painel do Pack.'
    ],
    linkOficial: 'https://education.github.com/pack',
    fontes: [
      { label: 'GitHub Education — Student Developer Pack', url: 'https://education.github.com/pack' },
      { label: 'GitHub Docs — candidatura de estudantes ao GitHub Education', url: 'https://docs.github.com/en/education/about-github-education/github-education-for-students/apply-to-github-education-as-a-student' }
    ]
  },
  {
    slug: 'google-ai-pro-estudantes',
    nome: 'Google AI Pro para estudantes',
    icone: 'fab fa-google',
    corIcone: 'text-green-600',
    bgIcone: 'bg-green-100',
    badge: 'Desconto estudantil',
    badgeClasse: 'bg-amber-100 text-amber-800',
    resumo: 'Plano Google AI Pro com desconto para estudantes elegíveis, mantido por até 4 anos consecutivos enquanto estudar.',
    oQueE: [
      'Oferta do Google One para estudantes elegíveis: o plano Google AI Pro com desconto enquanto durar a condição de estudante.',
      'Segundo a página oficial de suporte do Google One, o benefício se mantém por até 4 anos consecutivos enquanto você for estudante elegível.'
    ],
    direitos: [
      'Estudantes elegíveis com verificação pelo fluxo do Google One (requer login para conferir disponibilidade no seu país e conta).'
    ],
    passos: [
      'Acesse one.google.com/ai-student (botão abaixo) e faça login com sua conta Google.',
      'Siga o fluxo de verificação do status de estudante.',
      'Se elegível, ative o desconto no plano Google AI Pro.'
    ],
    documentos: [
      'Conta Google.',
      'Verificação de status de estudante solicitada no próprio fluxo do Google.'
    ],
    prazos: [
      'Desconto mantido enquanto você for estudante elegível, por até 4 anos consecutivos (fonte: suporte oficial do Google One).'
    ],
    aviso: 'Detalhes finais (preço no Brasil e disponibilidade) a confirmar: a página oficial exige login. Verifique no suporte oficial antes de assinar.',
    linkOficial: 'https://one.google.com/ai-student',
    fontes: [
      { label: 'Suporte Google One — oferta para estudantes (PT)', url: 'https://support.google.com/googleone/answer/17422238?hl=pt' },
      { label: 'Google One AI Student — página oficial (requer login)', url: 'https://one.google.com/ai-student' }
    ]
  }
]

const BENEFICIOS_EM_BREVE = [
  'Google Workspace for Education',
  'JetBrains Student Pack',
  'Notion for Education',
  'Figma for Education',
  'Canva for Education',
  'AWS Educate',
  'Autodesk Education',
  'Coursera for Campus',
  'CAPES Periódicos (acesso CAFe)',
  'Pé-de-Meia (MEC)'
]

// Hub de Benefícios
app.get('/beneficios', (c) => {
  return c.render(
    <Layout currentPage="beneficios">
      <div class="space-y-8">
        <div class="bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10">
            <span class="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3">
              🎓 Direitos & Benefícios
            </span>
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
              Benefícios gratuitos para estudantes
            </h1>
            <p class="text-lg text-white/90">
              Ferramentas pagas que são gratuitas ou com desconto para estudantes elegíveis — com guia de ativação passo a passo e fontes oficiais.
            </p>
            <p class="text-sm text-white/80 mt-3">
              <i class="fas fa-check-circle mr-1"></i>
              Informações verificadas nas fontes oficiais em {VERIFICADO}
            </p>
          </div>
        </div>

        {/* Direitos dos Professores — destaque na home */}
        <a href="/direitos-professores" class="block bg-gradient-to-r from-rose-500 to-orange-500 rounded-2xl p-6 text-white relative overflow-hidden hover:shadow-xl transition-all">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10 flex items-center gap-4">
            <div class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <i class="fas fa-chalkboard-teacher text-white text-2xl"></i>
            </div>
            <div class="flex-1">
              <span class="inline-block bg-white/25 px-3 py-0.5 rounded-full text-xs font-bold mb-1">NOVA ÁREA</span>
              <h2 class="text-2xl font-bold mb-1">Direitos dos Professores</h2>
              <p class="text-white/90 text-sm">Piso salarial (R$ 5.130,63 em 2026), hora-atividade de 1/3, aposentadoria especial, férias e recesso — com fonte oficial e data de verificação.</p>
            </div>
            <i class="fas fa-arrow-right text-2xl hidden sm:block"></i>
          </div>
        </a>

        {/* ESPAÇO RESERVADO: ENEM 2026 — guia em preparação */}
        {/* Fonte verificada (gov.br/INEP, 04/11/2026): provas em 8 e 15 de novembro de 2026 */}
        <a href="/beneficios/enem-2026" class="block bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white relative overflow-hidden hover:shadow-xl transition-all">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10 flex items-center gap-4">
            <div class="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
              <i class="fas fa-file-signature text-white text-2xl"></i>
            </div>
            <div class="flex-1">
              <span class="inline-block bg-white/25 px-3 py-0.5 rounded-full text-xs font-bold mb-1">ESPAÇO RESERVADO · GUIA EM PREPARAÇÃO</span>
              <h2 class="text-2xl font-bold mb-1">ENEM 2026 — Guia completo para estudantes</h2>
              <p class="text-white/90 text-sm">Inscrição, taxa e isenção, acessibilidade no dia da prova e como usar sua nota. Provas confirmadas: 8 e 15 de novembro (INEP). O guia completo chega em breve.</p>
            </div>
            <i class="fas fa-arrow-right text-2xl hidden sm:block"></i>
          </div>
        </a>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {BENEFICIOS.map((b) => (
            <a href={`/beneficios/${b.slug}`} class="ai-card block bg-white rounded-2xl p-6">
              <div class="flex items-center justify-between mb-4">
                <div class={`w-12 h-12 ${b.bgIcone} rounded-xl flex items-center justify-center`}>
                  <i class={`${b.icone} ${b.corIcone} text-2xl`}></i>
                </div>
                <span class={`text-xs font-bold px-3 py-1 rounded-full ${b.badgeClasse}`}>{b.badge}</span>
              </div>
              <h2 class="text-xl font-bold text-gray-900 mb-2">{b.nome}</h2>
              <p class="text-gray-600 mb-4">{b.resumo}</p>
              <span class="text-ai-primary font-semibold text-sm">
                Ver guia completo <i class="fas fa-arrow-right ml-1"></i>
              </span>
            </a>
          ))}
        </div>

        <div class="ai-card bg-white rounded-2xl p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-2">
            <i class="fas fa-flask text-purple-500 mr-2"></i>
            Em catalogação
          </h2>
          <p class="text-gray-600 text-sm mb-4">Próximos guias que estamos preparando (cada um só entra no ar após verificação na fonte oficial):</p>
          <div class="flex flex-wrap gap-2">
            {BENEFICIOS_EM_BREVE.map((nome) => (
              <span class="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">{nome}</span>
            ))}
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-2">
            <i class="fas fa-shield-alt text-blue-500 mr-2"></i>
            Nossa metodologia de verificação
          </h2>
          <ul class="text-gray-700 text-sm space-y-2">
            <li><i class="fas fa-check text-green-500 mr-2"></i>Todo guia cita a fonte oficial e a data da última verificação.</li>
            <li><i class="fas fa-check text-green-500 mr-2"></i>Nada entra no ar sem confirmação na página oficial do programa.</li>
            <li><i class="fas fa-check text-green-500 mr-2"></i>Encontrou algo desatualizado? Avise em <a href="mailto:contato@iaetech.com.br" class="text-ai-primary font-semibold hover:underline">contato@iaetech.com.br</a>.</li>
          </ul>
        </div>
      </div>
    </Layout>,
    { title: 'Benefícios para Estudantes | Portal IA & Tech' }
  )
})

// ENEM 2026 — ESPAÇO RESERVADO (página de lançamento do guia)
// Fonte verificada em 04/11/2026 (gov.br/INEP): provas aplicadas em 8 e 15 de novembro de 2026
// https://www.gov.br/inep/pt-br/centrais-de-conteudo/noticias/enem/enem-2026-falta-um-mes-para-o-primeiro-dia-de-provas
// TODO: taxa, datas de inscrição, regras de isenção e cronograma completo SÓ entram aqui
// após verificação direta no edital oficial (Edital INEP nº 64/2026: https://mecnormas.mec.gov.br/pesquisa/detalhar/11900)
app.get('/beneficios/enem-2026', (c) => {
  return c.render(
    <Layout currentPage="beneficios">
      <div class="space-y-8">
        <div class="text-sm text-gray-500 flex items-center gap-2">
          <a href="/" class="hover:text-ai-primary">Início</a>
          <i class="fas fa-chevron-right text-xs"></i>
          <a href="/beneficios" class="hover:text-ai-primary">Benefícios</a>
          <i class="fas fa-chevron-right text-xs"></i>
          <span class="text-ai-primary font-semibold">ENEM 2026</span>
        </div>

        <div class="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10">
            <span class="inline-block bg-white/25 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold mb-3">
              📢 ESPAÇO RESERVADO · GUIA EM PREPARAÇÃO
            </span>
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">ENEM 2026</h1>
            <p class="text-lg text-white/90">
              Estamos preparando o guia completo do exame — com o mesmo padrão de verificação de todas as páginas do portal. Este espaço é reservado para esse conteúdo.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-6">
            <section class="ai-card bg-white rounded-2xl p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-3"><i class="fas fa-check-circle text-green-600 mr-2"></i>Já confirmado (fonte oficial)</h2>
              <ul class="space-y-3">
                <li class="flex items-start">
                  <i class="fas fa-calendar-check text-ai-primary mt-1 mr-3"></i>
                  <div>
                    <p class="text-gray-700"><strong>Provas aplicadas em 8 e 15 de novembro de 2026</strong> — datas confirmadas pelo INEP.</p>
                    <a href="https://www.gov.br/inep/pt-br/centrais-de-conteudo/noticias/enem/enem-2026-falta-um-mes-para-o-primeiro-dia-de-provas" target="_blank" rel="noopener noreferrer" class="text-ai-primary text-sm font-medium hover:underline">
                      <i class="fas fa-link mr-1"></i>Fonte: Gov.br/INEP (verificado em 04/11/2026)
                    </a>
                  </div>
                </li>
              </ul>
            </section>

            <section class="ai-card bg-white rounded-2xl p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-3"><i class="fas fa-hammer text-orange-500 mr-2"></i>O que este guia vai trazer</h2>
              <p class="text-gray-600 text-sm mb-4">Preparando com o padrão do portal: cada item só entra no ar com verificação no edital oficial.</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="flex items-start bg-gray-50 rounded-lg p-3"><i class="fas fa-pen-to-square text-ai-primary mt-0.5 mr-2"></i><span class="text-sm text-gray-700">Inscrição passo a passo</span></div>
                <div class="flex items-start bg-gray-50 rounded-lg p-3"><i class="fas fa-hand-holding-dollar text-ai-primary mt-0.5 mr-2"></i><span class="text-sm text-gray-700">Taxa de inscrição e isenção</span></div>
                <div class="flex items-start bg-gray-50 rounded-lg p-3"><i class="fas fa-universal-access text-ai-primary mt-0.5 mr-2"></i><span class="text-sm text-gray-700">Acessibilidade e atendimentos especiais</span></div>
                <div class="flex items-start bg-gray-50 rounded-lg p-3"><i class="fas fa-calendar-days text-ai-primary mt-0.5 mr-2"></i><span class="text-sm text-gray-700">Cronograma oficial completo</span></div>
                <div class="flex items-start bg-gray-50 rounded-lg p-3"><i class="fas fa-clipboard-check text-ai-primary mt-0.5 mr-2"></i><span class="text-sm text-gray-700">O que levar no dia da prova</span></div>
                <div class="flex items-start bg-gray-50 rounded-lg p-3"><i class="fas fa-graduation-cap text-ai-primary mt-0.5 mr-2"></i><span class="text-sm text-gray-700">Como usar a nota (SiSU, ProUni, FIES)</span></div>
              </div>
            </section>
          </div>

          <div class="space-y-6">
            <div class="ai-card bg-white rounded-2xl p-6">
              <h3 class="font-bold text-gray-900 mb-3">Canal oficial do participante</h3>
              <p class="text-sm text-gray-600 mb-4">Resultado, cartão de confirmação e informações oficiais ficam na Página do Participante do INEP.</p>
              <a href="https://enem.inep.gov.br/participante/" target="_blank" rel="noopener noreferrer" class="block bg-ai-primary text-white text-center px-4 py-2.5 rounded-lg font-semibold hover:bg-ai-secondary transition-colors">
                <i class="fas fa-external-link-alt mr-2"></i>Abrir Página do Participante
              </a>
            </div>

            <div class="bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl p-5">
              <h3 class="font-bold text-amber-900 mb-1"><i class="fas fa-shield-alt mr-2"></i>Compromisso do portal</h3>
              <p class="text-sm text-amber-900">Nenhuma data, taxa ou regra será publicada aqui sem verificação direta no edital oficial do INEP. Aguarde o guia completo.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>,
    { title: 'ENEM 2026 — Guia (em preparação) | Portal IA & Tech' }
  )
})

// Ficha individual de Benefício
app.get('/beneficios/:slug', (c) => {
  const beneficio = BENEFICIOS.find((b) => b.slug === c.req.param('slug'))
  if (!beneficio) {
    return c.redirect('/beneficios')
  }
  return c.render(
    <Layout currentPage="beneficios">
      <div class="space-y-8">
        <div class="text-sm text-gray-500 flex items-center gap-2">
          <a href="/" class="hover:text-ai-primary">Início</a>
          <i class="fas fa-chevron-right text-xs"></i>
          <a href="/beneficios" class="hover:text-ai-primary">Benefícios</a>
          <i class="fas fa-chevron-right text-xs"></i>
          <span class="text-ai-primary font-semibold">{beneficio.nome}</span>
        </div>

        <div class="bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
              <i class={`${beneficio.icone} text-white text-3xl`}></i>
            </div>
            <div class="flex-1">
              <span class="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold mb-2">{beneficio.badge}</span>
              <h1 class="text-2xl sm:text-3xl font-bold mb-2">{beneficio.nome}</h1>
              <p class="text-white/90">{beneficio.resumo}</p>
            </div>
            <a href={beneficio.linkOficial} target="_blank" rel="noopener noreferrer" class="bg-white text-ai-primary px-5 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap">
              <i class="fas fa-external-link-alt mr-2"></i>
              Site oficial
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 space-y-6">
            <section class="ai-card bg-white rounded-2xl p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-3"><i class="fas fa-info-circle text-ai-primary mr-2"></i>O que é</h2>
              {beneficio.oQueE.map((p) => <p class="text-gray-700 mb-3 leading-relaxed">{p}</p>)}
            </section>

            <section class="ai-card bg-white rounded-2xl p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-3"><i class="fas fa-user-check text-green-600 mr-2"></i>Quem tem direito</h2>
              <ul class="space-y-2">
                {beneficio.direitos.map((d) => <li class="text-gray-700 flex items-start"><i class="fas fa-check text-green-500 mt-1 mr-2"></i><span>{d}</span></li>)}
              </ul>
            </section>

            <section class="ai-card bg-white rounded-2xl p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-3"><i class="fas fa-route text-ai-secondary mr-2"></i>Como ativar — passo a passo</h2>
              <ol class="space-y-3">
                {beneficio.passos.map((p, i) => (
                  <li class="flex items-start">
                    <span class="flex-shrink-0 w-7 h-7 bg-ai-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">{i + 1}</span>
                    <span class="text-gray-700">{p}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section class="ai-card bg-white rounded-2xl p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-3"><i class="fas fa-file-alt text-orange-500 mr-2"></i>O que você vai precisar</h2>
              <ul class="space-y-2">
                {beneficio.documentos.map((d) => <li class="text-gray-700 flex items-start"><i class="fas fa-angle-right text-gray-400 mt-1 mr-2"></i><span>{d}</span></li>)}
              </ul>
            </section>

            <section class="ai-card bg-white rounded-2xl p-6">
              <h2 class="text-xl font-bold text-gray-900 mb-3"><i class="fas fa-clock text-ai-accent mr-2"></i>Prazos e renovação</h2>
              <ul class="space-y-2">
                {beneficio.prazos.map((p) => <li class="text-gray-700 flex items-start"><i class="fas fa-calendar-alt text-ai-accent mt-1 mr-2"></i><span>{p}</span></li>)}
              </ul>
            </section>
          </div>

          <div class="space-y-6">
            <div class="ai-card bg-white rounded-2xl p-6">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-bold text-gray-900">Status da informação</h3>
                <i class="fas fa-check-circle text-green-500 text-xl"></i>
              </div>
              <p class="text-sm text-gray-600">Verificado nas fontes oficiais em <strong>{VERIFICADO}</strong>.</p>
            </div>

            {beneficio.aviso && (
              <div class="bg-amber-50 border-l-4 border-amber-500 rounded-r-2xl p-5">
                <h3 class="font-bold text-amber-900 mb-1"><i class="fas fa-exclamation-triangle mr-2"></i>Atenção</h3>
                <p class="text-sm text-amber-900">{beneficio.aviso}</p>
              </div>
            )}

            <div class="ai-card bg-white rounded-2xl p-6">
              <h3 class="font-bold text-gray-900 mb-3">Fontes oficiais</h3>
              <ul class="space-y-3">
                {beneficio.fontes.map((f) => (
                  <li>
                    <a href={f.url} target="_blank" rel="noopener noreferrer" class="text-ai-primary text-sm font-medium hover:underline break-all">
                      <i class="fas fa-link mr-2"></i>{f.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div class="bg-gradient-to-br from-ai-primary to-ai-secondary text-white rounded-2xl p-6">
              <h3 class="font-bold mb-2">Pronto para ativar?</h3>
              <p class="text-sm text-white/90 mb-4">Siga o passo a passo direto na fonte oficial.</p>
              <a href={beneficio.linkOficial} target="_blank" rel="noopener noreferrer" class="block bg-white text-ai-primary text-center px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Acessar site oficial
              </a>
            </div>
          </div>
        </div>

        <p class="text-xs text-gray-500 text-center">
          Conteúdo informativo e educacional. Condições, preços e elegibilidade podem mudar — sempre confirme na fonte oficial antes de decidir.
        </p>
      </div>
    </Layout>,
    { title: `${beneficio.nome} | Portal IA & Tech` }
  )
})

// =========================================
// DIREITOS DOS PROFESSORES — área distinta dos direitos estudantis
// Fontes verificadas nesta rodada: MEC (Lei 15.437/2026), MEC FAQ (Lei 11.738/2008),
// INSS (EC 103/2019 + Decreto 10.410/2020), CLT art. 322, CF art. 206, GitHub Education
// Última verificação: 04/11/2026
// =========================================

const VERIFICADO_DOC = '04/11/2026'

type DireitoDocente = {
  id: string
  icone: string
  titulo: string
  resumo: string
  pontos: string[]
  ondeVale: string
  fonteLabel: string
  fonteUrl: string
  observacao?: string
}

const DIREITOS_DOCENTES: DireitoDocente[] = [
  {
    id: 'piso-salarial',
    icone: 'fas fa-hand-holding-dollar',
    titulo: 'Piso salarial nacional do magistério',
    resumo: 'Valor mínimo que União, Estados, DF e Municípios não podem pagar abaixo do vencimento inicial — em 2026, R$ 5.130,63 para 40h semanais.',
    pontos: [
      'A Lei nº 15.437/2026 fixou o piso salarial profissional nacional do magistério público da educação básica em R$ 5.130,63 para 2026 (formação nível médio, modalidade Normal, jornada de 40 horas semanais).',
      'Reajuste de 5,4% sobre o piso de 2025 (R$ 4.867,77), com efeitos financeiros retroativos a janeiro de 2026; demais jornadas são proporcionais.',
      'A atualização anual passa a ser calculada pela soma da variação do INPC do ano anterior e 50% da média do crescimento real das receitas do Fundeb nos 5 anos anteriores — e nunca pode ficar abaixo do INPC.',
      'A lei de 2026 também incluiu entre os beneficiários os profissionais do magistério contratados temporariamente.'
    ],
    ondeVale: 'Apenas magistério público da educação básica (União, Estados, DF e Municípios). Não vale para a rede privada.',
    fonteLabel: 'MEC — Sancionado piso salarial para professores da educação básica (19/06/2026)',
    fonteUrl: 'https://www.gov.br/mec/pt-br/assuntos/noticias/2026/junho/sancionado-piso-salarial-para-professores-da-educacao-basica'
  },
  {
    id: 'hora-atividade',
    icone: 'fas fa-clock',
    titulo: 'Hora-atividade: 1/3 da jornada fora da sala de aula',
    resumo: 'No máximo 2/3 da jornada do magistério público da educação básica pode ser em interação com estudantes — o restante é hora-atividade (planejamento, avaliação, formação).',
    pontos: [
      'O art. 2º, §4º, da Lei nº 11.738/2008 estabelece o limite máximo de 2/3 da carga horária para atividades de interação com os educandos.',
      'O 1/3 restante (planejamento, correção, formação continuada, reuniões pedagógicas) é garantido por lei — e não pode ser absorvido como "trabalho de casa".',
      'A forma de cumprimento da hora-atividade é definida por cada ente federativo, conforme o projeto político-pedagógico da rede.'
    ],
    ondeVale: 'Magistério público da educação básica (jornada regulamentada pela Lei do Piso).',
    fonteLabel: 'MEC — Perguntas frequentes sobre o Piso Salarial (Lei 11.738/2008)',
    fonteUrl: 'https://www.gov.br/mec/pt-br/despublicados/plano-de-carreira/perguntas-frequentes-1/perguntas-frequentes'
  },
  {
    id: 'aposentadoria',
    icone: 'fas fa-umbrella-beach',
    titulo: 'Aposentadoria do professor (regras próprias)',
    resumo: 'Professores têm regras diferenciadas na Previdência: 25 anos de contribuição (mulher) ou 30 anos (homem), exclusivamente em funções de magistério na educação básica.',
    pontos: [
      'Direito adquirido (condições implementadas até 13/11/2019): 25 anos de contribuição para professora e 30 para professor, exclusivamente em funções de magistério na educação básica (educação infantil, ensino fundamental e médio).',
      'Regras de transição da EC 103/2019 (para quem estava filiada ao RGPS até 13/11/2019): (1) pontuação mínima — mulher 25 anos + 81 pontos em 2019 (subiu 1 ponto/ano até 92); homem 30 anos + 91 pontos em 2019 (até 100); (2) idade mínima — mulher 25 anos + 51 anos em 2019 (+6 meses/ano até 57); homem 30 anos + 56 anos em 2019 (até 60); (3) pedágio de 100% — mulher 25 anos + 52 anos de idade; homem 30 anos + 55 anos.',
      'Carência nas regras de transição: mínimo de 180 meses de efetiva atividade (homens e mulheres).',
      'Funções de magistério para fins previdenciários incluem, além da docência, direção de unidade escolar e coordenação/assessoramento pedagógicos (Decreto nº 10.410/2020).',
      'Quem ingressou no RGPS a partir de 14/11/2019 fica sujeito à aposentadoria programada comum do INSS (sem a regra especial).'
    ],
    ondeVale: 'Regime Geral de Previdência Social (INSS) — professores da iniciativa privada e do regime geral; servidores efetivos seguem os regimes próprios (regras do ente).',
    fonteLabel: 'INSS — Aposentadoria por tempo de contribuição do professor (página oficial)',
    fonteUrl: 'https://www.gov.br/inss/pt-br/direitos-e-deveres/aposentadorias/aposentadoria-por-tempo-de-contribuicao-do-professor'
  },
  {
    id: 'ferias-recesso',
    icone: 'fas fa-calendar-alt',
    titulo: 'Férias e recesso escolar',
    resumo: 'Durante as férias escolares, a CLT impede exigir do professor outro serviço além de exames — e na rede privada o recesso é conquistado via convenção coletiva.',
    pontos: [
      'CLT, art. 322, §2º: "No período de férias, não se poderá exigir dos professores outro serviço senão o relacionado com a realização de exames".',
      'No período de exames e de férias escolares, o pagamento dos professores é assegurado (CLT, art. 322).',
      'Na rede privada, o recesso escolar é um direito definido nas convenções coletivas de cada categoria (ex.: cláusula de disponibilidade apenas para planejamento, reciclagem e cursos) — confira a CCT do seu sindicato.',
      'Férias e recesso são coisas diferentes: férias são direito do trabalhador (com adicional de 1/3 na regra geral da CLT); recesso é pausa do calendário letivo regulada por convenção coletiva na rede privada.'
    ],
    ondeVale: 'Docentes celetistas (rede privada e contratos CLT). Servidores públicos seguem o regime jurídico do ente.',
    fonteLabel: 'SINPRONORTE — Recesso escolar ou férias escolares é direito garantido em lei (cita CLT art. 322)',
    fonteUrl: 'https://sinpronorte.org.br/2022/07/12/recesso-escolar-ou-ferias-escolares-e-direito-garantido-em-lei/'
  },
  {
    id: 'liberdade-catedra',
    icone: 'fas fa-feather',
    titulo: 'Liberdade de ensinar (cátedra) e valorização docente',
    resumo: 'A Constituição garante a liberdade de aprender, ensinar, pesquisar e divulgar — e lista a valorização dos profissionais da educação e o piso nacional como princípios do ensino.',
    pontos: [
      'CF/88, art. 206, II: "liberdade de aprender, ensinar, pesquisar e divulgar o pensamento, a arte e o saber".',
      'CF/88, art. 206, V: valorização dos profissionais da educação escolar, com planos de carreira e ingresso nas redes públicas exclusivamente por concurso público de provas e títulos (redação da EC 53/2006).',
      'CF/88, art. 206, VIII: piso salarial profissional nacional para os profissionais da educação escolar pública, nos termos de lei federal (EC 53/2006).'
    ],
    ondeVale: 'Todo o sistema de ensino brasileiro (princípios constitucionais).',
    fonteLabel: 'CF/88, art. 206 — texto dos incisos (referência jurídica)',
    fonteUrl: 'https://www.jusbrasil.com.br/topicos/10650554/artigo-206-da-constituicao-federal-de-1988'
  },
  {
    id: 'protecao-violencia',
    icone: 'fas fa-shield-halved',
    titulo: 'Proteção contra violência nas escolas',
    resumo: 'Medidas de proteção a educadores existem em leis estaduais e municipais — o alcance varia por território. Confira a regra do seu estado/município.',
    pontos: [
      'Existe legislação estadual de proteção a educadores (ex.: Espírito Santo instituiu medidas de segurança para profissionais das redes pública e privada — "Lei SOS Educação").',
      'No Legislativo federal tramitam projetos de proteção e combate à violência física e moral contra profissionais do ensino.',
      'O MEC mantém o programa Escola que Protege, voltado à prevenção e enfrentamento da violência nas escolas.'
    ],
    ondeVale: 'Varia por estado/município — não há uma lei nacional única de proteção ao docente (status: a confirmar por território).',
    fonteLabel: 'Ales/ES — Lei estabelece medidas para garantir segurança de educadores',
    fonteUrl: 'https://www.al.es.gov.br/Noticia/2025/08/49134/lei-estabelece-medidas-para-garantir-seguranca-de-educadores.html'
  }
]

const BENEFICIOS_DOCENTES_PLATAFORMAS = [
  { nome: 'Canva for Education', desc: '100% gratuito para professores verificados da educação básica (K-12) e seus alunos', url: 'https://www.canva.com/education/teachers/' },
  { nome: 'Notion for Education', desc: 'Plano Plus gratuito para educadores de instituições acreditadas', url: 'https://www.notion.com/product/notion-for-education' },
  { nome: 'GitHub Education (professores)', desc: 'GitHub tem portal dedicado a educadores — benefícios específicos a confirmar na página oficial', url: 'https://education.github.com/teachers' },
  { nome: 'Microsoft 365 Education A1', desc: 'Educadores de instituições elegíveis também têm acesso gratuito', url: 'https://www.microsoft.com/pt-br/education/products/office' }
]

// Hub — Direitos dos Professores
app.get('/direitos-professores', (c) => {
  return c.render(
    <Layout currentPage="professores">
      <div class="space-y-8">
        <div class="bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10">
            <span class="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3">
              🍎 Direitos de quem ensina
            </span>
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">Direitos dos Professores</h1>
            <p class="text-lg text-white/90">
              Área distinta dos benefícios estudantis: direitos trabalhistas, previdenciários e constitucionais de professores — na rede pública e na privada.
            </p>
            <p class="text-sm text-white/80 mt-3">
              <i class="fas fa-check-circle mr-1"></i>
              Verificado nas fontes oficiais em {VERIFICADO_DOC}
            </p>
          </div>
        </div>

        {/* CTA Relatório completo */}
        <div class="bg-gradient-to-r from-ai-primary to-ai-secondary text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
          <div class="flex-1">
            <h2 class="text-xl font-bold mb-1"><i class="fas fa-file-lines mr-2"></i>Relatório completo 2026 — Direitos dos Professores</h2>
            <p class="text-sm text-white/90">Pesquisa em profundidade com base legal completa: Constituição, LDB, Lei do Piso (Lei 15.437/2026), Fundeb, CLT, aposentadoria especial e jurisprudência do STF — com fonte oficial em cada item.</p>
          </div>
          <a href="/relatorio-direitos-professores" class="bg-white text-ai-primary px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap">
            Abrir relatório <i class="fas fa-arrow-right ml-1"></i>
          </a>
        </div>

        <div class="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p class="text-sm text-amber-900">
            <i class="fas fa-info-circle mr-2"></i>
            <strong>Importante:</strong> vários desses direitos dependem do ente federativo (estado/município) ou da convenção coletiva do seu sindicato. Onde aplicável, indicamos o alcance exato de cada regra — e o que ainda não pudemos confirmar está marcado como "a confirmar".
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {DIREITOS_DOCENTES.map((d) => (
            <div class="ai-card bg-white rounded-2xl p-6 flex flex-col">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-11 h-11 bg-gradient-to-br from-orange-100 to-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i class={`${d.icone} text-orange-600 text-xl`}></i>
                </div>
                <h2 class="text-lg font-bold text-gray-900">{d.titulo}</h2>
              </div>
              <p class="text-gray-700 text-sm mb-4">{d.resumo}</p>
              <ul class="space-y-2 mb-4 flex-1">
                {d.pontos.map((p) => (
                  <li class="text-sm text-gray-700 flex items-start">
                    <i class="fas fa-check text-green-500 mt-1 mr-2 flex-shrink-0"></i>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div class="bg-gray-50 rounded-lg p-3 mb-3">
                <p class="text-xs text-gray-600">
                  <i class="fas fa-map-marker-alt text-orange-500 mr-1"></i>
                  <strong>Onde vale:</strong> {d.ondeVale}
                </p>
              </div>
              {d.observacao && (
                <div class="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-3 mb-3">
                  <p class="text-xs text-amber-900">{d.observacao}</p>
                </div>
              )}
              <a href={d.fonteUrl} target="_blank" rel="noopener noreferrer" class="text-ai-primary text-sm font-medium hover:underline">
                <i class="fas fa-link mr-1"></i>{d.fonteLabel}
              </a>
            </div>
          ))}
        </div>

        <div class="ai-card bg-white rounded-2xl p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-2">
            <i class="fas fa-gift text-green-500 mr-2"></i>
            Plataformas que também dão benefícios a professores
          </h2>
          <p class="text-gray-600 text-sm mb-4">Além dos direitos trabalhistas, educadores verificados têm acesso gratuito ou com desconto em ferramentas (condições podem mudar — confirme no site oficial):</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BENEFICIOS_DOCENTES_PLATAFORMAS.map((b) => (
              <a href={b.url} target="_blank" rel="noopener noreferrer" class="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-100">
                <h3 class="font-semibold text-gray-900 mb-1">{b.nome}</h3>
                <p class="text-sm text-gray-600">{b.desc}</p>
              </a>
            ))}
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-2">
            <i class="fas fa-shield-alt text-blue-500 mr-2"></i>
            Metodologia de verificação (a mesma dos guias de estudantes)
          </h2>
          <ul class="text-gray-700 text-sm space-y-2">
            <li><i class="fas fa-check text-green-500 mr-2"></i>Toda regra cita a fonte oficial (MEC, INSS, CLT/CF) e a data da verificação ({VERIFICADO_DOC}).</li>
            <li><i class="fas fa-check text-green-500 mr-2"></i>Nada entra no ar sem confirmação na fonte oficial — o que não confirmamos aparece como "a confirmar".</li>
            <li><i class="fas fa-check text-green-500 mr-2"></i>Encontrou algo desatualizado? Avise em <a href="mailto:contato@iaetech.com.br" class="text-ai-primary font-semibold hover:underline">contato@iaetech.com.br</a>.</li>
          </ul>
        </div>

        <p class="text-xs text-gray-500 text-center">
          Conteúdo informativo e educacional — não constitui aconselhamento jurídico ou previdenciário. Para o seu caso concreto, consulte o sindicato da categoria, o INSS ou um profissional do Direito.
        </p>
      </div>
    </Layout>,
    { title: 'Direitos dos Professores | Portal IA & Tech' }
  )
})

// RELATÓRIO COMPLETO — Direitos dos Professores (pesquisa em profundidade, 05/11/2026)
app.get('/relatorio-direitos-professores', (c) => {
  const secoes = [
    {
      id: 'constituicao', icone: 'fas fa-landmark', titulo: '1. Base constitucional (CF/88, art. 206)',
      conteudo: [
        'A Constituição Federal define o ensino como direito de todos e estabelece os princípios nos quais a educação brasileira se baseia — vários deles são direitos diretos dos professores:',
        'Inciso II — liberdade de aprender, ensinar, pesquisar e divulgar o pensamento, a arte e o saber (a chamada liberdade de cátedra).',
        'Inciso IV — gratuidade do ensino público em estabelecimentos oficiais (direito do estudante que o professor garante).',
        'Inciso V — valorização dos profissionais da educação escolar, garantidos, na forma da lei, planos de carreira, com ingresso exclusivamente por concurso público de provas e títulos, aos das redes públicas (redação da Emenda Constitucional nº 53/2006).',
        'Inciso VIII — piso salarial profissional nacional para os profissionais da educação escolar pública, nos termos de lei federal (EC 53/2006).',
        'Inciso IX — garantia do direito à educação e à aprendizagem ao longo da vida (EC 108/2020).'
      ],
      fonte: 'CF/88, art. 206 — texto integral dos incisos', url: 'https://www.jusbrasil.com.br/topicos/10650554/artigo-206-da-constituicao-federal-de-1988'
    },
    {
      id: 'piso', icone: 'fas fa-hand-holding-dollar', titulo: '2. Piso salarial do magistério público — R$ 5.130,63 em 2026',
      conteudo: [
        'A Lei nº 15.437, de 18 de junho de 2026, fixou o piso salarial profissional nacional dos profissionais do magistério público da educação básica em R$ 5.130,63 para jornada de 40 horas semanais (formação em nível médio, modalidade normal).',
        'O valor representa reajuste de 5,4% sobre o piso de 2025 (R$ 4.867,77), com ganho real acima da inflação e efeitos financeiros retroativos a janeiro de 2026. As demais jornadas (20h, 30h) devem ser proporcionais.',
        'Nova metodologia de reajuste anual: soma da variação acumulada do INPC do ano anterior com 50% da média do crescimento real das receitas do Fundeb nos 5 anos anteriores. O reajuste nunca pode ser inferior ao INPC, e a memória de cálculo deve ser publicada em plataforma de dados abertos.',
        'A lei de 2026 ampliou o alcance: incluiu entre os beneficiários do piso os profissionais do magistério contratados temporariamente na educação básica pública.',
        'Base legal: art. 206, VIII, da Constituição (EC 53/2006), art. 60 do ADCT e Lei nº 11.738/2008 (que instituiu o piso, então com valor atualizado anualmente por lei específica).'
      ],
      fonte: 'MEC — Sancionado piso salarial (Lei 15.437/2026); texto original na Câmará dos Deputados', url: 'https://www.gov.br/mec/pt-br/assuntos/noticias/2026/junho/sancionado-piso-salarial-para-professores-da-educacao-basica'
    },
    {
      id: 'hora-atividade', icone: 'fas fa-clock', titulo: '3. Hora-atividade: no máximo 2/3 da jornada em sala',
      conteudo: [
        'Lei nº 11.738/2008, art. 2º, § 4º: na composição da jornada de trabalho do magistério público da educação básica, observa-se o limite máximo de 2/3 (dois terços) da carga horária para o desempenho das atividades de interação direta com os educandos.',
        'Consequência prática: no mínimo 1/3 da jornada é hora-atividade — planejamento de aulas, correção, avaliação, formação continuada e reuniões pedagógicas — que não pode ser empurrada para o trabalho em casa.',
        'A forma de cumprimento é definida por cada ente federativo (União, Estados, DF e Municípios), conforme o projeto político-pedagógico da rede de ensino.'
      ],
      fonte: 'MEC — Perguntas frequentes da Lei do Piso (11.738/2008); texto compilado em normas.leg.br', url: 'https://www.gov.br/mec/pt-br/despublicados/plano-de-carreira/perguntas-frequentes-1/perguntas-frequentes'
    },
    {
      id: 'aposentadoria', icone: 'fas fa-umbrella-beach', titulo: '4. Aposentadoria especial do professor (EC 103/2019)',
      conteudo: [
        'Direito adquirido (condições implementadas até 13/11/2019): 25 anos de contribuição para professora e 30 para professor, exclusivamente em funções de magistério na educação básica (educação infantil, ensino fundamental e médio).',
        'Regras de transição da EC 103/2019 para quem se filiou ao RGPS até 13/11/2019 — por tempo de contribuição: mulher, 25 anos de contribuição e pontuação de 81 pontos em 2019 (soma de idade + contribuição, subindo 1 ponto por ano até 92); homem, 30 anos e 91 pontos em 2019 (até 100).',
        'Transição por idade mínima: mulher, 25 anos de contribuição e 51 anos de idade em 2019 (+6 meses por ano até 57); homem, 30 anos e 56 anos em 2019 (até 60). Carência mínima de 180 meses de efetiva atividade.',
        'Transição por pedágio de 100% do tempo que faltava em 13/11/2019: mulher, 25 anos de contribuição e 52 anos de idade; homem, 30 anos e 55 anos.',
        'Funções de magistério para fins previdenciários incluem, além da docência, a direção de unidade escolar e a coordenação e o assessoramento pedagógicos (Decreto nº 10.410/2020).',
        'Quem ingressou no RGPS a partir de 14/11/2019 fica sujeito à aposentadoria programada comum do INSS, sem a regra especial do professor.',
        'Jurisprudência relevante do STF: Súmula 726 — para efeito de aposentadoria especial de professores, não se computa o tempo de serviço prestado fora da sala de aula; e o STF reafirmou a validade do redutor de 5 anos no cálculo dos proventos da aposentadoria proporcional de professor (Tema 1462 da repercussão geral, RE 1557194). O STF também reconheceu a possibilidade de combinação das regras de transição (informado pelo Sinasefe — fonte secundária).'
      ],
      fonte: 'INSS — Aposentadoria por tempo de contribuição do professor; Súmula 726 do STF; STF Notícias (Tema 1462)', url: 'https://www.gov.br/inss/pt-br/direitos-e-deveres/aposentadorias/aposentadoria-por-tempo-de-contribuicao-do-professor'
    },
    {
      id: 'fundeb', icone: 'fas fa-sack-dollar', titulo: '5. Fundeb: 70% dos recursos para remuneração dos profissionais da educação',
      conteudo: [
        'A Lei nº 14.113/2020 (novo Fundeb, que sucedeu o Fundo de Manutenção e Desenvolvimento da Educação Básica anterior) estabeleceu que no mínimo 70% dos recursos do fundo devem ser aplicados na remuneração dos profissionais da educação em efetivo exercício na educação básica pública.',
        'Antes do novo Fundeb, o mínimo era de 60% exclusivamente para o magistério; com a lei de 2020, o percentual subiu para 70% e passou a alcançar todo o quadro de profissionais da educação: professores, coordenadores, diretores, técnicos, profissionais de apoio (transporte, merenda) e outros previstos no art. 61 da LDB, em efetivo exercício.',
        'O piso salarial do magistério (seção 2) integra esse rol de obrigações financiadas pelo Fundeb, com complementação da União aos entes que não alcançam os mínimos.'
      ],
      fonte: 'CNM — Informativo sobre os 70% do novo Fundeb (Lei 14.113/2020)', url: 'https://cnm.org.br/storage/biblioteca/2024/Informativos/202204_INF_EDUC_Quais_sao_profissionais_podem_ser_pagos_setenta_porcento_novo_FUNDEB.pdf'
    },
    {
      id: 'clt', icone: 'fas fa-scale-balanced', titulo: '6. Rede privada: os direitos do professor na CLT (arts. 317-324)',
      conteudo: [
        'Art. 317 — o exercício remunerado do magistério em estabelecimentos particulares de ensino exige apenas habilitação legal e registro no Ministério da Educação.',
        'Art. 318 — o professor pode lecionar em um mesmo estabelecimento por mais de um turno, desde que não ultrapassada a jornada de trabalho semanal estabelecida.',
        'Art. 319 — aos professores é vedado, aos domingos, a regência de aulas e o trabalho em exames.',
        'Art. 320 — a remuneração dos professores é fixada pelos sistemas de ensino; as aulas noturnas têm tratamento especial, e a jurisprudência trabalhista assegura ao professor o adicional noturno (referência: arts. 57 e 73 da CLT aplicados ao magistério).',
        'Art. 322 — no período de férias, não se poderá exigir dos professores outro serviço senão o relacionado com a realização de exames; e no período de exames e de férias escolares é assegurado aos professores o pagamento na mesma forma da regência.',
        'Recesso escolar na rede privada: direito definido nas convenções coletivas de cada categoria (CCT do sindicato), com cláusulas que limitam a atividade no recesso a planejamento, reciclagem e cursos.'
      ],
      fonte: 'CLT, arts. 317 a 324 — texto oficial (normas.leg.br); SINPRONORTE (art. 322); Aurum (comentado)', url: 'https://normas.leg.br/?urn=urn:lex:br:federal:decreto.lei:1943-05-01;5452'
    },
    {
      id: 'ldb', icone: 'fas fa-book-open', titulo: '7. LDB (Lei nº 9.394/1996): formação, carreira e profissionais da educação',
      conteudo: [
        'Art. 62 — a formação de docentes para atuar na educação básica far-se-á em nível superior, em curso de licenciatura plena, admitida, como formação mínima, a formação em nível médio na modalidade normal para a educação infantil e as séries iniciais do ensino fundamental.',
        'Art. 34 — a jornada escolar no ensino fundamental inclui pelo menos 4 horas de trabalho efetivo em sala de aula, progressivamente ampliado.',
        'Os arts. 61 a 67 da LDB organizam quem são os profissionais da educação básica e como os sistemas de ensino devem estruturar carreira, ingresso por concurso e formação continuada — texto integral no PDF oficial do Senado Federal (link na fonte).'
      ],
      fonte: 'LDB 9.394/1996 — PDF oficial do Senado Federal; art. 62 (referência jurídica)', url: 'https://www2.senado.leg.br/bdsf/bitstream/handle/id/70320/65.pdf'
    },
    {
      id: 'violencia', icone: 'fas fa-shield-halved', titulo: '8. Proteção contra violência nas escolas',
      conteudo: [
        'Não existe ainda uma lei nacional única de proteção ao docente: a proteção avança estado a estado e município a município.',
        'Exemplo estadual: o Espírito Santo instituiu medidas de segurança para educadores das redes pública e privada (pacote de leis do estado).',
        'No Congresso Nacional tramitam projetos de lei que estabelecem medidas de proteção e combate à violência física e moral contra profissionais do ensino (um deles foi aprovado por comissão do Senado em 2025).',
        'No âmbito federal, o MEC mantém o programa Escola que Protege, voltado a fortalecer a capacidade das redes de ensino para prevenir e enfrentar a violência nas escolas.'
      ],
      fonte: 'MEC — Escola que Protege; Ales/ES (legislação estadual); Senado Notícias (PL de proteção)', url: 'https://www.gov.br/mec/pt-br/escola-que-protege'
    },
    {
      id: 'pne', icone: 'fas fa-bullseye', titulo: '9. Plano Nacional de Educação (2024-2034): valorização docente como meta',
      conteudo: [
        'O novo Plano Nacional de Educação (PNE), plano estratégico instituído por lei que define diretrizes, objetivos e metas para a educação brasileira até 2034, traz a valorização dos profissionais do magistério entre suas metas.',
        'Entre os pontos destacados pelas casas legislativas: elevação da qualificação dos professores, incentivo à formação continuada e expansão do ensino em tempo integral na rede pública (meta de 50% das escolas públicas em até cinco anos, atendendo no mínimo 35% dos estudantes).',
        'Por que importa ao professor: as metas do PNE orientam planos estaduais e municipais de educação e vinculam os critérios de repasse e acompanhamento do Fundeb.'
      ],
      fonte: 'Gov.br/MEC — Plano Nacional de Educação; Câmará dos Deputados (metas até 2034); Senado Notícias', url: 'https://www.gov.br/mec/pt-br/pne'
    },
    {
      id: 'tecnologia', icone: 'fas fa-laptop-code', titulo: '10. Bônus tecnológico: ferramentas gratuitas para professores verificados',
      conteudo: [
        'Canva for Education — 100% gratuito para professores verificados da educação básica (K-12) e seus alunos, sem trials ou paywalls.',
        'Notion for Education — plano Plus gratuito para educadores de instituições acreditadas.',
        'GitHub Education — portal dedicado a educadores com benefícios próprios (confirmar detalhes na página oficial).',
        'Microsoft 365 Education (A1) — Word, Excel, PowerPoint, OneNote e Teams na web, gratuitos para educadores e estudantes de instituições elegíveis.',
        'Google AI Pro para estudantes — desconto para estudantes elegíveis por até 4 anos (benefício estudantil; o educador encontra o detalhamento na seção de benefícios do portal).'
      ],
      fonte: 'Canva Education; Notion for Education; GitHub Education Teachers; Microsoft Education PT-BR', url: 'https://www.canva.com/education/teachers/'
    }
  ]

  return c.render(
    <Layout currentPage="professores">
      <div class="space-y-8">
        <div class="bg-gradient-to-r from-slate-800 via-rose-800 to-orange-600 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10">
            <span class="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3">
              🍎 RELATÓRIO ESPECIAL · ATUALIZADO EM 05/11/2026
            </span>
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">Direitos dos Professores no Brasil — Relatório 2026</h1>
            <p class="text-lg text-white/90 mb-4">
              Pesquisa em profundidade sobre os direitos de quem ensina: professores da rede pública (União, Estados, DF e Municípios) e da rede privada (CLT), do ensino infantil ao médio, com foco também em quem atua no magistério superior.
            </p>
            <div class="flex flex-wrap gap-2 text-xs">
              <span class="bg-white/20 px-3 py-1 rounded-full"><i class="fas fa-check-circle mr-1"></i>Fontes oficiais (MEC, INSS, STF, Senado, Câmara, normas.leg.br)</span>
              <span class="bg-white/20 px-3 py-1 rounded-full"><i class="fas fa-calendar-check mr-1"></i>Verificação: 04-05/11/2026</span>
              <span class="bg-white/20 px-3 py-1 rounded-full"><i class="fas fa-universal-access mr-1"></i>Linguagem acessível</span>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <p class="text-sm text-blue-900">
            <i class="fas fa-search mr-2"></i>
            <strong>Como este relatório foi feito:</strong> cada afirmação abaixo foi verificada nesta semana em fonte oficial (páginas do MEC, INSS, STF, Senado, Câmará dos Deputados e compilados oficiais de leis). Quando a fonte oficial bloqueia o acesso automatizado (Planalto), citamos o espelho oficial da própria Casa legislativa. O que não pudemos confirmar está marcado como "a confirmar" — e nada é afirmado sem fonte.
          </p>
        </div>

        {secoes.map((s) => (
          <section class="ai-card bg-white rounded-2xl p-6" id={s.id}>
            <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span class="w-10 h-10 bg-gradient-to-br from-rose-100 to-orange-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <i class={`${s.icone} text-orange-600`}></i>
              </span>
              {s.titulo}
            </h2>
            <ul class="space-y-2">
              {s.conteudo.map((p) => (
                <li class="text-gray-700 text-sm leading-relaxed flex items-start">
                  <i class="fas fa-angle-right text-orange-400 mt-1 mr-2 flex-shrink-0"></i>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div class="mt-4 pt-4 border-t border-gray-100">
              <a href={s.url} target="_blank" rel="noopener noreferrer" class="text-ai-primary text-sm font-medium hover:underline break-all">
                <i class="fas fa-link mr-1"></i>Fonte oficial: {s.fonte}
              </a>
            </div>
          </section>
        ))}

        <div class="ai-card bg-white rounded-2xl p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4"><i class="fas fa-table text-ai-primary mr-2"></i>Quadro-resumo (o que a lei garante, em uma tabela)</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-gray-50 border-b-2 border-ai-primary">
                  <th class="text-left p-3 font-bold text-ai-dark">Direito</th>
                  <th class="text-left p-3 font-bold text-ai-dark">Base legal</th>
                  <th class="text-left p-3 font-bold text-ai-dark">Regra/valor verificado</th>
                  <th class="text-left p-3 font-bold text-ai-dark">Alcance</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b hover:bg-gray-50"><td class="p-3 font-semibold">Piso salarial</td><td class="p-3">CF art. 206, VIII; Lei 11.738/2008; Lei 15.437/2026</td><td class="p-3">R$ 5.130,63 (40h) em 2026; +5,4% vs 2025 (R$ 4.867,77); retroativo a jan/2026; reajuste anual = INPC + 50% Fundeb, nunca < INPC</td><td class="p-3">Magistério público da educação básica (inclui temporários)</td></tr>
                <tr class="border-b hover:bg-gray-50"><td class="p-3 font-semibold">Hora-atividade</td><td class="p-3">Lei 11.738/2008, art. 2º, §4º</td><td class="p-3">Máx. 2/3 da jornada com estudantes; mín. 1/3 para planejamento/formação</td><td class="p-3">Magistério público da educação básica</td></tr>
                <tr class="border-b hover:bg-gray-50"><td class="p-3 font-semibold">Aposentadoria especial</td><td class="p-3">EC 103/2019; Decreto 10.410/2020; STF Súmula 726</td><td class="p-3">25 anos (mulher) / 30 (homem) em magistério; transições: 81/91 pontos (até 92/100), idade 51/56 (até 57/60), pedágio 100% com 52/55 anos; carência 180 meses</td><td class="p-3">INSS (RGPS); servidores seguem regime próprio</td></tr>
                <tr class="border-b hover:bg-gray-50"><td class="p-3 font-semibold">Remuneração com Fundeb</td><td class="p-3">Lei 14.113/2020</td><td class="p-3">Mín. 70% dos recursos para remuneração dos profissionais da educação em efetivo exercício</td><td class="p-3">Educação básica pública</td></tr>
                <tr class="border-b hover:bg-gray-50"><td class="p-3 font-semibold">Férias e exames</td><td class="p-3">CLT art. 322</td><td class="p-3">No período de férias, só serviço de exames pode ser exigido; pagamento assegurado em exames e férias escolares; recesso via CCT</td><td class="p-3">Docentes celetistas (rede privada)</td></tr>
                <tr class="border-b hover:bg-gray-50"><td class="p-3 font-semibold">Domingos e turnos</td><td class="p-3">CLT arts. 318-319</td><td class="p-3">Vedado regência e exames aos domingos; mais de um turno permitido sem ultrapassar a jornada semanal</td><td class="p-3">Docentes celetistas (rede privada)</td></tr>
                <tr class="border-b hover:bg-gray-50"><td class="p-3 font-semibold">Liberdade de cátedra</td><td class="p-3">CF art. 206, II</td><td class="p-3">Liberdade de aprender, ensinar, pesquisar e divulgar o pensamento, a arte e o saber</td><td class="p-3">Todo o sistema de ensino</td></tr>
                <tr class="hover:bg-gray-50"><td class="p-3 font-semibold">Plano de carreira / concurso</td><td class="p-3">CF art. 206, V; LDB arts. 61-67</td><td class="p-3">Planos de carreira e ingresso nas redes públicas exclusivamente por concurso de provas e títulos</td><td class="p-3">Redes públicas</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-rose-50 border border-rose-200 rounded-2xl p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-2"><i class="fas fa-gavel text-rose-500 mr-2"></i>Aviso legal</h2>
          <p class="text-sm text-rose-900">
            Este relatório é conteúdo informativo e educacional, atualizado em <strong>05/11/2026</strong>. Não constitui aconselhamento jurídico ou previdenciário e não substitui a leitura das leis e a consulta a um profissional do Direito. Leis, valores e jurisprudência mudam: o piso salarial, em especial, é reajustado por lei todo ano. Confira sempre as fontes oficiais citadas em cada seção antes de decidir. Encontrou algo desatualizado? Avise em <a href="mailto:contato@iaetech.com.br" class="font-semibold underline">contato@iaetech.com.br</a>. Todas as marcas e nomes de terceiros citados pertencem a seus respectivos titulares (uso nominativo — art. 132, IV, da Lei 9.279/96).
          </p>
        </div>
      </div>
    </Layout>,
    { title: 'Relatório 2026 — Direitos dos Professores | Portal IA & Tech' }
  )
})

// =========================================
// API ROUTES - Portal IA & Tecnologia
// =========================================

// Health check
app.get('/api/hello', (c) => {
  return c.json({ 
    message: 'Portal IA & Tecnologia API ativa!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    database: c.env?.DB ? 'D1 Connected' : 'D1 Not Available'
  })
})

// =========================================
// Dashboard e Estatísticas
// =========================================

app.get('/api/stats', async (c) => {
  try {
    if (!c.env?.DB) {
      // Fallback para dados mock se DB não estiver disponível
      return c.json({
        gallery: { total: 1247, featured: 25, pending: 12, approved: 1210 },
        tutorials: { total: 89, published: 78, draft: 11, featured: 15 },
        showcase: { total: 156, approved: 140, pending: 16, featured: 22 },
        users: { active: 2341, total: 5672, moderators: 8, admins: 3 },
        engagement: { total_views: 45678, total_likes: 8934, total_comments: 1456, total_favorites: 2341 }
      })
    }

    const stats = await StatsQueries.getDashboardStats(c.env.DB)
    return c.json(stats)
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return c.json({ error: 'Erro interno do servidor' }, 500)
  }
})

app.get('/api/stats/dashboard', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const stats = await StatsQueries.getDashboardStats(c.env.DB)
    return c.json({ success: true, data: stats })
  } catch (error) {
    console.error('Erro ao buscar dashboard stats:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

// =========================================
// Galeria de Imagens IA
// =========================================

app.get('/api/images', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '20')
    const category_id = c.req.query('category_id') ? parseInt(c.req.query('category_id')!) : undefined
    const status = c.req.query('status') || 'approved'
    const is_featured = c.req.query('featured') === 'true' ? true : undefined
    const sort_by = c.req.query('sort_by') || 'created_at'
    const sort_order = (c.req.query('sort_order') as 'ASC' | 'DESC') || 'DESC'

    const images = await ImageQueries.getAll(c.env.DB, {
      page,
      limit,
      category_id,
      status,
      is_featured,
      sort_by,
      sort_order
    })

    return c.json({ success: true, ...images })
  } catch (error) {
    console.error('Erro ao buscar imagens:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

app.get('/api/images/featured', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const limit = parseInt(c.req.query('limit') || '6')
    const images = await ImageQueries.getFeatured(c.env.DB, limit)

    return c.json({ success: true, data: images })
  } catch (error) {
    console.error('Erro ao buscar imagens em destaque:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

app.get('/api/images/:id', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const id = parseInt(c.req.param('id'))
    if (isNaN(id)) {
      return c.json({ success: false, error: 'ID inválido' }, 400)
    }

    // Incrementar visualizações
    await ImageQueries.incrementViewCount(c.env.DB, id)
    
    // Buscar imagem com detalhes
    const image = await ImageQueries.getById(c.env.DB, id)
    
    if (!image) {
      return c.json({ success: false, error: 'Imagem não encontrada' }, 404)
    }

    return c.json({ success: true, data: image })
  } catch (error) {
    console.error('Erro ao buscar imagem:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

// =========================================
// Tutoriais
// =========================================

app.get('/api/tutorials', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '20')
    const category_id = c.req.query('category_id') ? parseInt(c.req.query('category_id')!) : undefined
    const difficulty = c.req.query('difficulty')
    const status = c.req.query('status') || 'published'
    const is_featured = c.req.query('featured') === 'true' ? true : undefined
    const sort_by = c.req.query('sort_by') || 'created_at'
    const sort_order = (c.req.query('sort_order') as 'ASC' | 'DESC') || 'DESC'

    const tutorials = await TutorialQueries.getAll(c.env.DB, {
      page,
      limit,
      category_id,
      difficulty,
      status,
      is_featured,
      sort_by,
      sort_order
    })

    return c.json({ success: true, ...tutorials })
  } catch (error) {
    console.error('Erro ao buscar tutoriais:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

app.get('/api/tutorials/featured', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const limit = parseInt(c.req.query('limit') || '4')
    const tutorials = await TutorialQueries.getFeatured(c.env.DB, limit)

    return c.json({ success: true, data: tutorials })
  } catch (error) {
    console.error('Erro ao buscar tutoriais em destaque:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

app.get('/api/tutorials/:slug', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const slug = c.req.param('slug')
    const tutorial = await TutorialQueries.getBySlug(c.env.DB, slug)
    
    if (!tutorial) {
      return c.json({ success: false, error: 'Tutorial não encontrado' }, 404)
    }

    return c.json({ success: true, data: tutorial })
  } catch (error) {
    console.error('Erro ao buscar tutorial:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

// =========================================
// Showcase de IAs
// =========================================

app.get('/api/showcases', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '20')
    const category_id = c.req.query('category_id') ? parseInt(c.req.query('category_id')!) : undefined
    const ai_type = c.req.query('ai_type')
    const status = c.req.query('status') || 'approved'
    const is_open_source = c.req.query('open_source') === 'true' ? true : undefined
    const sort_by = c.req.query('sort_by') || 'created_at'
    const sort_order = (c.req.query('sort_order') as 'ASC' | 'DESC') || 'DESC'

    const showcases = await ShowcaseQueries.getAll(c.env.DB, {
      page,
      limit,
      category_id,
      ai_type,
      status,
      is_open_source,
      sort_by,
      sort_order
    })

    return c.json({ success: true, ...showcases })
  } catch (error) {
    console.error('Erro ao buscar showcases:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

app.get('/api/showcases/featured', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const limit = parseInt(c.req.query('limit') || '4')
    const showcases = await ShowcaseQueries.getFeatured(c.env.DB, limit)

    return c.json({ success: true, data: showcases })
  } catch (error) {
    console.error('Erro ao buscar showcases em destaque:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

// =========================================
// Upload de Imagens
// =========================================

app.post('/api/upload', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ success: false, error: 'Database não disponível' }, 500)
    }

    const formData = await c.req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return c.json({ success: false, error: 'Nenhum arquivo enviado' }, 400)
    }

    // Validar tipo de arquivo (imagens e vídeos)
    const isImage = file.type.startsWith('image/')
    const isVideo = file.type.startsWith('video/')
    
    if (!isImage && !isVideo) {
      return c.json({ success: false, error: 'Arquivo deve ser uma imagem ou vídeo' }, 400)
    }

    // Validar tamanho (10MB para imagens, 50MB para vídeos)
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    const maxSizeText = isVideo ? '50MB' : '10MB'
    
    if (file.size > maxSize) {
      return c.json({ success: false, error: `Arquivo muito grande (máx. ${maxSizeText})` }, 400)
    }

    // Obter metadados do formulário
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const categoryId = parseInt(formData.get('category_id') as string)
    const promptUsed = formData.get('prompt_used') as string
    const aiModel = formData.get('ai_model') as string
    const tags = formData.get('tags') as string
    const isFeatured = formData.get('is_featured') === '1'
    const contentType = isVideo ? 'video' : 'image'

    // Validar campos obrigatórios
    if (!title || !categoryId) {
      return c.json({ success: false, error: 'Título e categoria são obrigatórios' }, 400)
    }

    // Simular processamento de arquivo (em produção, usar Cloudflare R2)
    const fileExtension = file.name.split('.').pop() || (isVideo ? 'mp4' : 'jpg')
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`
    
    // URLs simuladas (em produção, seria o R2 bucket)
    let imageUrl, thumbnailUrl
    
    if (isVideo) {
      // URLs simuladas para vídeo
      imageUrl = `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`
      thumbnailUrl = `https://via.placeholder.com/400x300/dc2626/ffffff?text=${encodeURIComponent('Vídeo: ' + title.substring(0, 10))}`
    } else {
      // URLs simuladas para imagem
      imageUrl = `https://via.placeholder.com/800x600/6366f1/ffffff?text=${encodeURIComponent(title.substring(0, 20))}`
      thumbnailUrl = `https://via.placeholder.com/400x300/6366f1/ffffff?text=${encodeURIComponent(title.substring(0, 15))}`
    }

    // Determinar tabela de destino baseada no tipo de conteúdo
    let insertResult
    
    if (isVideo) {
      // Inserir na tabela tutorials para vídeos
      insertResult = await c.env.DB.prepare(`
        INSERT INTO tutorials (
          title, description, video_url, thumbnail_url, file_size, file_format,
          category_id, is_featured, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        title,
        description || null,
        imageUrl, // video_url
        thumbnailUrl,
        file.size,
        fileExtension,
        categoryId,
        isFeatured ? 1 : 0,
        'published' // Status inicial para vídeos
      ).run()
    } else {
      // Inserir na tabela ai_images para imagens
      insertResult = await c.env.DB.prepare(`
        INSERT INTO ai_images (
          title, description, prompt_used, ai_model, image_url, thumbnail_url,
          file_size, file_format, category_id, is_featured, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        title,
        description || null,
        promptUsed || null,
        aiModel || null,
        imageUrl,
        thumbnailUrl,
        file.size,
        fileExtension,
        categoryId,
        isFeatured ? 1 : 0,
        'pending' // Status inicial para imagens
      ).run()
    }

    if (!insertResult.success) {
      throw new Error('Falha ao salvar no banco de dados')
    }

    const recordId = insertResult.meta.last_row_id
    const tableName = isVideo ? 'tutorials' : 'ai_images'

    // Processar tags se fornecidas (apenas para imagens)
    if (!isVideo && tags && tags.trim()) {
      const tagList = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      
      for (const tagName of tagList) {
        // Inserir tag se não existir
        await c.env.DB.prepare(`
          INSERT OR IGNORE INTO tags (name, slug, created_at) 
          VALUES (?, ?, CURRENT_TIMESTAMP)
        `).bind(tagName, tagName.toLowerCase().replace(/\s+/g, '-')).run()
        
        // Obter ID da tag
        const tagResult = await c.env.DB.prepare(`
          SELECT id FROM tags WHERE name = ?
        `).bind(tagName).first<{ id: number }>()
        
        if (tagResult) {
          // Associar tag à imagem
          await c.env.DB.prepare(`
            INSERT OR IGNORE INTO ai_image_tags (image_id, tag_id, created_at) 
            VALUES (?, ?, CURRENT_TIMESTAMP)
          `).bind(recordId, tagResult.id).run()
          
          // Incrementar contador de uso da tag
          await c.env.DB.prepare(`
            UPDATE tags SET usage_count = usage_count + 1 WHERE id = ?
          `).bind(tagResult.id).run()
        }
      }
    }

    // Atualizar estatísticas globais
    if (isVideo) {
      await c.env.DB.prepare(`
        INSERT OR REPLACE INTO global_stats (stat_name, stat_value, updated_at) 
        VALUES ('total_tutorials', (SELECT COUNT(*) FROM tutorials), CURRENT_TIMESTAMP)
      `).run()
    } else {
      await c.env.DB.prepare(`
        INSERT OR REPLACE INTO global_stats (stat_name, stat_value, updated_at) 
        VALUES ('total_images', (SELECT COUNT(*) FROM ai_images), CURRENT_TIMESTAMP)
      `).run()
    }

    // Retornar sucesso com dados do registro
    const query = isVideo ? `
      SELECT t.*, c.name as category_name, c.slug as category_slug
      FROM tutorials t
      LEFT JOIN categories c ON t.category_id = c.id
      WHERE t.id = ?
    ` : `
      SELECT ai.*, c.name as category_name, c.slug as category_slug
      FROM ai_images ai
      LEFT JOIN categories c ON ai.category_id = c.id
      WHERE ai.id = ?
    `

    const newRecord = await c.env.DB.prepare(query).bind(recordId).first()

    return c.json({
      success: true,
      message: `${contentType === 'video' ? 'Vídeo' : 'Imagem'} enviado(a) com sucesso!`,
      data: {
        id: recordId,
        type: contentType,
        record: newRecord,
        table: tableName,
        status: isVideo ? 'published' : 'pending_approval'
      }
    })

  } catch (error) {
    console.error('Erro no upload:', error)
    return c.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro interno do servidor' 
    }, 500)
  }
})

// =========================================
// Categorias Dinâmicas
// =========================================

app.get('/api/categories', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    const categories = await c.env.DB.prepare(`
      SELECT c.*, 
             COUNT(ai.id) as images_count,
             COUNT(CASE WHEN ai.is_featured = 1 THEN 1 END) as featured_count
      FROM categories c
      LEFT JOIN ai_images ai ON c.id = ai.category_id AND ai.status = 'approved'
      WHERE c.is_active = 1
      GROUP BY c.id
      ORDER BY c.sort_order ASC, c.name ASC
    `).all()

    return c.json({ success: true, data: categories.results || [] })
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

// =========================================
// Estatísticas Globais
// =========================================

app.get('/api/stats/global', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ error: 'Database não disponível' }, 500)
    }

    // Buscar estatísticas em paralelo para melhor performance
    const [imagesCount, tutorialsCount, showcasesCount, categoriesCount] = await Promise.all([
      // Total de imagens aprovadas
      c.env.DB.prepare('SELECT COUNT(*) as count FROM ai_images WHERE status = ?')
        .bind('approved').first<{ count: number }>(),
      
      // Total de tutoriais publicados
      c.env.DB.prepare('SELECT COUNT(*) as count FROM tutorials WHERE status = ?')
        .bind('published').first<{ count: number }>(),
      
      // Total de showcases ativos
      c.env.DB.prepare('SELECT COUNT(*) as count FROM ai_showcases WHERE status = ?')
        .bind('published').first<{ count: number }>(),
      
      // Total de categorias ativas
      c.env.DB.prepare('SELECT COUNT(*) as count FROM categories WHERE is_active = ?')
        .bind(1).first<{ count: number }>()
    ])

    // Buscar estatísticas de engajamento
    const [totalLikes, totalShares, totalViews] = await Promise.all([
      c.env.DB.prepare('SELECT COALESCE(SUM(like_count), 0) as total FROM ai_images')
        .first<{ total: number }>(),
      c.env.DB.prepare('SELECT COALESCE(SUM(share_count), 0) as total FROM ai_images')
        .first<{ total: number }>(),
      c.env.DB.prepare('SELECT COALESCE(SUM(view_count), 0) as total FROM ai_images')
        .first<{ total: number }>()
    ])

    // Calcular estatística fictícia de usuários ativos (baseada no engajamento)
    const baseUsers = 50 // Base mínima de usuários
    const engagementFactor = Math.floor((totalLikes?.total || 0) / 10) // 1 usuário a cada 10 likes
    const estimatedActiveUsers = baseUsers + engagementFactor

    return c.json({
      success: true,
      data: {
        images: imagesCount?.count || 0,
        tutorials: tutorialsCount?.count || 0,
        showcases: showcasesCount?.count || 0,
        users: estimatedActiveUsers,
        engagement: {
          total_likes: totalLikes?.total || 0,
          total_shares: totalShares?.total || 0,
          total_views: totalViews?.total || 0
        },
        categories: categoriesCount?.count || 0,
        updated_at: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Erro ao buscar estatísticas globais:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

// =========================================
// Ações de Imagens (Like, Share, Download)
// =========================================

app.post('/api/images/:id/like', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ success: false, error: 'Database não disponível' }, 500)
    }

    const imageId = parseInt(c.req.param('id'))
    if (isNaN(imageId)) {
      return c.json({ success: false, error: 'ID inválido' }, 400)
    }

    // Por enquanto, apenas incrementar o contador (sem autenticação)
    const result = await c.env.DB.prepare(`
      UPDATE ai_images 
      SET like_count = like_count + 1, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ? AND status = 'approved'
    `).bind(imageId).run()

    if (result.changes === 0) {
      return c.json({ success: false, error: 'Imagem não encontrada' }, 404)
    }

    // Buscar contador atualizado
    const image = await c.env.DB.prepare(`
      SELECT like_count FROM ai_images WHERE id = ?
    `).bind(imageId).first<{ like_count: number }>()

    return c.json({ 
      success: true, 
      data: { 
        liked: true, 
        like_count: image?.like_count || 0 
      }
    })

  } catch (error) {
    console.error('Erro ao curtir imagem:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

app.post('/api/images/:id/share', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ success: false, error: 'Database não disponível' }, 500)
    }

    const imageId = parseInt(c.req.param('id'))
    if (isNaN(imageId)) {
      return c.json({ success: false, error: 'ID inválido' }, 400)
    }

    // Incrementar contador de compartilhamentos
    await c.env.DB.prepare(`
      UPDATE ai_images 
      SET share_count = share_count + 1, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ? AND status = 'approved'
    `).bind(imageId).run()

    // Buscar dados da imagem para compartilhamento
    const image = await c.env.DB.prepare(`
      SELECT title, description, image_url FROM ai_images WHERE id = ?
    `).bind(imageId).first<{ title: string, description: string, image_url: string }>()

    if (!image) {
      return c.json({ success: false, error: 'Imagem não encontrada' }, 404)
    }

    const shareUrl = `${c.req.url.replace('/api/images/' + imageId + '/share', '/galeria#image-' + imageId)}`

    return c.json({ 
      success: true, 
      data: {
        title: image.title,
        description: image.description,
        url: shareUrl,
        image_url: image.image_url
      }
    })

  } catch (error) {
    console.error('Erro ao compartilhar imagem:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

// API para deletar imagem
app.delete('/api/images/:id', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ success: false, error: 'Database não disponível' }, 500)
    }

    const imageId = parseInt(c.req.param('id'))
    if (isNaN(imageId)) {
      return c.json({ success: false, error: 'ID inválido' }, 400)
    }

    // Verificar se a imagem existe
    const image = await c.env.DB.prepare(`
      SELECT id, title FROM ai_images WHERE id = ?
    `).bind(imageId).first<{ id: number, title: string }>()

    if (!image) {
      return c.json({ success: false, error: 'Imagem não encontrada' }, 404)
    }

    // Deletar relacionamentos de tags primeiro (integridade referencial)
    await c.env.DB.prepare(`
      DELETE FROM ai_image_tags WHERE image_id = ?
    `).bind(imageId).run()

    // Deletar a imagem
    const deleteResult = await c.env.DB.prepare(`
      DELETE FROM ai_images WHERE id = ?
    `).bind(imageId).run()

    if (deleteResult.changes === 0) {
      return c.json({ success: false, error: 'Falha ao deletar imagem' }, 500)
    }

    return c.json({ 
      success: true, 
      message: `Imagem "${image.title}" deletada com sucesso`,
      deleted_id: imageId
    })

  } catch (error) {
    console.error('Erro ao deletar imagem:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

// API para deletar tutorial
app.delete('/api/tutorials/:id', async (c) => {
  try {
    if (!c.env?.DB) {
      return c.json({ success: false, error: 'Database não disponível' }, 500)
    }

    const tutorialId = parseInt(c.req.param('id'))
    if (isNaN(tutorialId)) {
      return c.json({ success: false, error: 'ID inválido' }, 400)
    }

    // Verificar se o tutorial existe
    const tutorial = await c.env.DB.prepare(`
      SELECT id, title FROM tutorials WHERE id = ?
    `).bind(tutorialId).first<{ id: number, title: string }>()

    if (!tutorial) {
      return c.json({ success: false, error: 'Tutorial não encontrado' }, 404)
    }

    // Deletar o tutorial
    const deleteResult = await c.env.DB.prepare(`
      DELETE FROM tutorials WHERE id = ?
    `).bind(tutorialId).run()

    if (deleteResult.changes === 0) {
      return c.json({ success: false, error: 'Falha ao deletar tutorial' }, 500)
    }

    return c.json({ 
      success: true, 
      message: `Tutorial "${tutorial.title}" deletado com sucesso`,
      deleted_id: tutorialId
    })

  } catch (error) {
    console.error('Erro ao deletar tutorial:', error)
    return c.json({ success: false, error: 'Erro interno do servidor' }, 500)
  }
})

// =========================================
// PÁGINAS DO PORTAL
// =========================================

// =========================================
// NAVEGAÇÃO E ROTAS PRINCIPAIS
// =========================================

// Página Showcase - Funcional
app.get('/showcase', async (c) => {
  return c.render(
    <Layout currentPage="showcase">
      <div class="space-y-8">
        {/* Hero Section */}
        <div class="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 rounded-2xl p-8 text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10">
            <div class="flex items-center mb-4">
              <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-6">
                <i class="fas fa-rocket text-3xl"></i>
              </div>
              <div>
                <h1 class="text-4xl font-bold mb-2">Showcase de IAs</h1>
                <p class="text-xl text-white/90">Projetos incríveis da comunidade</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-4 mt-6">
              <button class="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm">
                <i class="fas fa-plus mr-2"></i>
                Submeter Projeto
              </button>
              <button class="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm">
                <i class="fas fa-trophy mr-2"></i>
                Projetos Premiados
              </button>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-project-diagram text-purple-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">42</h3>
            <p class="text-sm text-gray-600">Projetos Ativos</p>
          </div>
          
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-users text-pink-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">156</h3>
            <p class="text-sm text-gray-600">Desenvolvedores</p>
          </div>
          
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-star text-red-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">2.8k</h3>
            <p class="text-sm text-gray-600">Estrelas GitHub</p>
          </div>
          
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-download text-orange-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">12.4k</h3>
            <p class="text-sm text-gray-600">Downloads</p>
          </div>
        </div>

        {/* Categorias de Projetos */}
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-6">
            <i class="fas fa-layer-group text-ai-primary mr-2"></i>
            Categorias de Projetos
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button class="ai-card p-6 text-center hover:shadow-lg transition-all group">
              <div class="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <i class="fas fa-eye text-blue-600 text-xl"></i>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">Computer Vision</h3>
              <p class="text-sm text-gray-600">12 projetos</p>
            </button>
            
            <button class="ai-card p-6 text-center hover:shadow-lg transition-all group">
              <div class="w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <i class="fas fa-comments text-green-600 text-xl"></i>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">NLP & Chatbots</h3>
              <p class="text-sm text-gray-600">8 projetos</p>
            </button>
            
            <button class="ai-card p-6 text-center hover:shadow-lg transition-all group">
              <div class="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <i class="fas fa-magic text-purple-600 text-xl"></i>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">IA Generativa</h3>
              <p class="text-sm text-gray-600">15 projetos</p>
            </button>
            
            <button class="ai-card p-6 text-center hover:shadow-lg transition-all group">
              <div class="w-12 h-12 bg-orange-100 group-hover:bg-orange-200 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                <i class="fas fa-robot text-orange-600 text-xl"></i>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">Robótica</h3>
              <p class="text-sm text-gray-600">7 projetos</p>
            </button>
          </div>
        </div>

        {/* Projetos em Destaque */}
        <div>
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">
              <i class="fas fa-fire text-orange-500 mr-2"></i>
              Projetos em Destaque
            </h2>
            <button class="text-ai-primary hover:text-ai-secondary font-medium">
              Ver todos <i class="fas fa-arrow-right ml-1"></i>
            </button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Projeto 1 */}
            <div class="ai-card overflow-hidden hover:shadow-xl transition-all group">
              <div class="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div class="text-center text-white">
                    <i class="fas fa-play-circle text-5xl mb-2 opacity-80 group-hover:opacity-100 transition-opacity"></i>
                    <p class="text-sm font-medium">Demo Interativa</p>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Computer Vision</span>
                  <div class="flex items-center text-gray-500 text-sm">
                    <i class="fas fa-star text-yellow-500 mr-1"></i>
                    <span>4.8</span>
                  </div>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Detector de Objetos em Tempo Real</h3>
                <p class="text-gray-600 text-sm mb-4">Sistema de detecção de objetos usando YOLO v8 com interface web interativa.</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center text-sm text-gray-500">
                    <i class="fas fa-user-circle mr-2"></i>
                    <span>@dev_pedro</span>
                  </div>
                  <div class="flex space-x-2">
                    <button class="bg-ai-primary text-white px-3 py-1 rounded text-sm font-medium hover:bg-ai-secondary transition-colors">
                      Demo
                    </button>
                    <button class="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                      Código
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Projeto 2 */}
            <div class="ai-card overflow-hidden hover:shadow-xl transition-all group">
              <div class="aspect-video bg-gradient-to-br from-green-500 to-teal-600 relative overflow-hidden">
                <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div class="text-center text-white">
                    <i class="fas fa-comments text-5xl mb-2 opacity-80 group-hover:opacity-100 transition-opacity"></i>
                    <p class="text-sm font-medium">Chatbot Ativo</p>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                  <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">NLP</span>
                  <div class="flex items-center text-gray-500 text-sm">
                    <i class="fas fa-star text-yellow-500 mr-1"></i>
                    <span>4.6</span>
                  </div>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Assistente Virtual Inteligente</h3>
                <p class="text-gray-600 text-sm mb-4">Chatbot com processamento de linguagem natural avançado e memória contextual.</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center text-sm text-gray-500">
                    <i class="fas fa-user-circle mr-2"></i>
                    <span>@ana_dev</span>
                  </div>
                  <div class="flex space-x-2">
                    <button class="bg-ai-primary text-white px-3 py-1 rounded text-sm font-medium hover:bg-ai-secondary transition-colors">
                      Testar
                    </button>
                    <button class="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                      Código
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Projeto 3 */}
            <div class="ai-card overflow-hidden hover:shadow-xl transition-all group">
              <div class="aspect-video bg-gradient-to-br from-purple-500 to-pink-600 relative overflow-hidden">
                <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div class="text-center text-white">
                    <i class="fas fa-image text-5xl mb-2 opacity-80 group-hover:opacity-100 transition-opacity"></i>
                    <p class="text-sm font-medium">Gerador Ativo</p>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                  <span class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Generativa</span>
                  <div class="flex items-center text-gray-500 text-sm">
                    <i class="fas fa-star text-yellow-500 mr-1"></i>
                    <span>4.9</span>
                  </div>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Gerador de Arte com IA</h3>
                <p class="text-gray-600 text-sm mb-4">Crie obras de arte únicas usando modelos de difusão estável e prompts criativos.</p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center text-sm text-gray-500">
                    <i class="fas fa-user-circle mr-2"></i>
                    <span>@art_ai</span>
                  </div>
                  <div class="flex space-x-2">
                    <button class="bg-ai-primary text-white px-3 py-1 rounded text-sm font-medium hover:bg-ai-secondary transition-colors">
                      Criar
                    </button>
                    <button class="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                      Código
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>,
    { title: 'Showcase de IAs' }
  )
})

// Página Tutoriais - Funcional
app.get('/tutoriais', async (c) => {
  return c.render(
    <Layout currentPage="tutoriais">
      <div class="space-y-8">
        {/* Header Section */}
        <div class="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10">
            <div class="flex items-center mb-4">
              <div class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-6">
                <i class="fas fa-graduation-cap text-3xl"></i>
              </div>
              <div>
                <h1 class="text-4xl font-bold mb-2">Tutoriais de IA</h1>
                <p class="text-xl text-white/90">Aprenda do básico ao avançado</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-4 mt-6">
              <a href="https://learn.microsoft.com/pt-br/training" target="_blank" rel="noopener noreferrer" class="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm">
                <i class="fas fa-external-link-alt mr-2"></i>
                Microsoft Learn (gratuito)
              </a>
              <a href="https://www.kaggle.com/learn" target="_blank" rel="noopener noreferrer" class="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm">
                <i class="fas fa-external-link-alt mr-2"></i>
                Kaggle Learn (gratuito)
              </a>
            </div>
            <p class="text-sm text-white/80 mt-4">
              <i class="fas fa-check-circle mr-1"></i>
              Links diretos para plataformas oficiais de treinamento — verificados em 04/11/2026
            </p>
          </div>
        </div>

        {/* Estatísticas — números reais do catálogo */}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-play-circle text-green-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">5</h3>
            <p class="text-sm text-gray-600">Plataformas oficiais de aprendizado</p>
          </div>
          
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-gift text-blue-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">100%</h3>
            <p class="text-sm text-gray-600">Conteúdo gratuito para começar</p>
          </div>
          
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-certificate text-purple-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">3</h3>
            <p class="text-sm text-gray-600">Emissão de certificado gratuita</p>
          </div>
          
          <div class="ai-card p-6 text-center">
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-calendar-check text-orange-600 text-xl"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">04/11/2026</h3>
            <p class="text-sm text-gray-600">Última verificação</p>
          </div>
        </div>

        {/* Trilhas de Aprendizado */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Iniciante */}
          <div class="ai-card p-6 border-l-4 border-green-500">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <i class="fas fa-seedling text-green-600"></i>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">Iniciante</h3>
                <p class="text-sm text-gray-600">Fundamentos de IA</p>
              </div>
            </div>
            <ul class="space-y-3 mb-6">
              <li class="flex items-center text-gray-700">
                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                Introdução à IA
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                Python para IA
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-check-circle text-green-500 mr-3"></i>
                Primeiro Projeto
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-clock text-gray-400 mr-3"></i>
                Machine Learning Básico
              </li>
            </ul>
            <a href="https://www.kaggle.com/learn" target="_blank" rel="noopener noreferrer" class="block w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors text-center">
              Começar na Kaggle Learn <i class="fas fa-external-link-alt ml-1"></i>
            </a>
          </div>

          {/* Intermediário */}
          <div class="ai-card p-6 border-l-4 border-blue-500">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <i class="fas fa-chart-line text-blue-600"></i>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">Intermediário</h3>
                <p class="text-sm text-gray-600">Aprofundamento</p>
              </div>
            </div>
            <ul class="space-y-3 mb-6">
              <li class="flex items-center text-gray-700">
                <i class="fas fa-check-circle text-blue-500 mr-3"></i>
                Deep Learning
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-check-circle text-blue-500 mr-3"></i>
                Computer Vision
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-clock text-gray-400 mr-3"></i>
                Processamento de Linguagem
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-clock text-gray-400 mr-3"></i>
                Redes Neurais Avançadas
              </li>
            </ul>
            <a href="https://www.freecodecamp.org/learn/machine-learning-with-python" target="_blank" rel="noopener noreferrer" class="block w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-center">
              Começar na freeCodeCamp <i class="fas fa-external-link-alt ml-1"></i>
            </a>
          </div>

          {/* Avançado */}
          <div class="ai-card p-6 border-l-4 border-purple-500">
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <i class="fas fa-rocket text-purple-600"></i>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">Avançado</h3>
                <p class="text-sm text-gray-600">Especialização</p>
              </div>
            </div>
            <ul class="space-y-3 mb-6">
              <li class="flex items-center text-gray-700">
                <i class="fas fa-lock text-gray-400 mr-3"></i>
                IA Generativa
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-lock text-gray-400 mr-3"></i>
                Reinforcement Learning
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-lock text-gray-400 mr-3"></i>
                MLOps e Deploy
              </li>
              <li class="flex items-center text-gray-700">
                <i class="fas fa-lock text-gray-400 mr-3"></i>
                Projetos Enterprise
              </li>
            </ul>
            <button class="w-full bg-gray-300 text-gray-600 py-3 rounded-lg font-semibold cursor-not-allowed">
              Em Breve
            </button>
          </div>
        </div>

        {/* Tutoriais Recentes */}
        <div>
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-900">
              <i class="fas fa-star text-yellow-500 mr-2"></i>
              Cursos e trilhas oficiais (gratuitos)
            </h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Microsoft Learn */}
            <div class="ai-card overflow-hidden hover:shadow-lg transition-shadow">
              <div class="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                <i class="fab fa-microsoft text-5xl text-blue-600"></i>
              </div>
              <div class="p-6">
                <div class="flex items-center mb-3">
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">Oficial</span>
                  <span class="text-sm text-gray-500">Todos os níveis</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Microsoft Learn</h3>
                <p class="text-gray-600 text-sm mb-4">Roteiros de aprendizagem oficiais em português: IA, Azure e Copilot, com módulos interativos e sem custo.</p>
                <a href="https://learn.microsoft.com/pt-br/training" target="_blank" rel="noopener noreferrer" class="block w-full bg-ai-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-ai-secondary transition-colors text-center">
                  Acessar Microsoft Learn <i class="fas fa-external-link-alt ml-1"></i>
                </a>
              </div>
            </div>

            {/* Kaggle Learn */}
            <div class="ai-card overflow-hidden hover:shadow-lg transition-shadow">
              <div class="aspect-video bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                <i class="fas fa-flask text-5xl text-cyan-600"></i>
              </div>
              <div class="p-6">
                <div class="flex items-center mb-3">
                  <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">Certificado grátis</span>
                  <span class="text-sm text-gray-500">~3h por curso</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Kaggle Learn</h3>
                <p class="text-gray-600 text-sm mb-4">Micro-cursos sem custo (Python, Pandas, Intro ao Machine Learning) com certificado — ideal para começar hoje.</p>
                <a href="https://www.kaggle.com/learn" target="_blank" rel="noopener noreferrer" class="block w-full bg-ai-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-ai-secondary transition-colors text-center">
                  Acessar Kaggle Learn <i class="fas fa-external-link-alt ml-1"></i>
                </a>
              </div>
            </div>

            {/* Google AI Essentials */}
            <div class="ai-card overflow-hidden hover:shadow-lg transition-shadow">
              <div class="aspect-video bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <i class="fab fa-google text-5xl text-green-600"></i>
              </div>
              <div class="p-6">
                <div class="flex items-center mb-3">
                  <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">Oficial</span>
                  <span class="text-sm text-gray-500">Zero experiência</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Google AI Essentials</h3>
                <p class="text-gray-600 text-sm mb-4">Programa do Google para usar IA no dia a dia: fundamentos de IA generativa e prompting prático.</p>
                <a href="https://grow.google/ai-essentials/" target="_blank" rel="noopener noreferrer" class="block w-full bg-ai-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-ai-secondary transition-colors text-center">
                  Acessar Grow Google <i class="fas fa-external-link-alt ml-1"></i>
                </a>
              </div>
            </div>

            {/* freeCodeCamp */}
            <div class="ai-card overflow-hidden hover:shadow-lg transition-shadow">
              <div class="aspect-video bg-gradient-to-br from-gray-100 to-green-100 flex items-center justify-center">
                <i class="fab fa-free-code-camp text-5xl text-green-700"></i>
              </div>
              <div class="p-6">
                <div class="flex items-center mb-3">
                  <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">Certificação grátis</span>
                  <span class="text-sm text-gray-500">Intermediário</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">freeCodeCamp — ML com Python</h3>
                <p class="text-gray-600 text-sm mb-4">Certificação gratuita usando TensorFlow para construir redes neurais e técnicas avançadas de ML.</p>
                <a href="https://www.freecodecamp.org/learn/machine-learning-with-python" target="_blank" rel="noopener noreferrer" class="block w-full bg-ai-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-ai-secondary transition-colors text-center">
                  Acessar freeCodeCamp <i class="fas fa-external-link-alt ml-1"></i>
                </a>
              </div>
            </div>

            {/* GitHub Skills */}
            <div class="ai-card overflow-hidden hover:shadow-lg transition-shadow">
              <div class="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <i class="fab fa-github text-5xl text-gray-800"></i>
              </div>
              <div class="p-6">
                <div class="flex items-center mb-3">
                  <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">Oficial</span>
                  <span class="text-sm text-gray-500">Iniciante → Avançado</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">GitHub Skills</h3>
                <p class="text-gray-600 text-sm mb-4">Exercícios interativos gratuitos para dominar GitHub — do primeiro commit ao trabalho com IA no fluxo de dev.</p>
                <a href="https://skills.github.com/" target="_blank" rel="noopener noreferrer" class="block w-full bg-ai-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-ai-secondary transition-colors text-center">
                  Acessar GitHub Skills <i class="fas fa-external-link-alt ml-1"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 border border-blue-200 rounded-2xl p-5 mt-6">
            <p class="text-sm text-blue-900">
              <i class="fas fa-info-circle mr-2"></i>
              <strong>Como escolhemos:</strong> só listamos plataformas oficiais das próprias empresas, com acesso gratuito comprovado na fonte oficial. Preços e condições dos cursos pagos (quando houver) podem mudar — confirme sempre no site da plataforma.
            </p>
          </div>
        </div>
      </div>
    </Layout>,
    { title: 'Tutoriais' }
  )
})

// Página Upload (redirect para galeria com modal)
app.get('/upload', (c) => {
  return c.redirect('/galeria?upload=true')
})

// Página da Galeria
app.get('/galeria', async (c) => {
  try {
    // Buscar categorias e imagens em destaque
    let categories = [];
    let featuredImages = [];

    if (c.env?.DB) {
      // Buscar categorias
      const categoriesQuery = await c.env.DB.prepare(`
        SELECT * FROM categories 
        WHERE is_active = 1 
        ORDER BY sort_order ASC, name ASC
      `).all();
      categories = categoriesQuery.results || [];

      // Buscar imagens em destaque
      featuredImages = await ImageQueries.getFeatured(c.env.DB, 8);
    }

    return c.render(
      <Layout currentPage="galeria">
        <Gallery images={featuredImages} categories={categories} />
        <Lightbox />
        <UploadModal categories={categories} />
        
        {/* Scripts específicos da galeria */}
        <script src="/static/js/gallery.js"></script>
      </Layout>,
      { title: 'Galeria de IAs' }
    )
  } catch (error) {
    console.error('Erro na página da galeria:', error);
    return c.render(
      <Layout currentPage="galeria">
        <div class="text-center py-12">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">Erro ao carregar galeria</h1>
          <p class="text-gray-600">Tente novamente em alguns instantes</p>
        </div>
      </Layout>,
      { title: 'Erro - Galeria' }
    )
  }
})

export default app
