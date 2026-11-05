# 🗺️ ARQUITETURA DE INFORMAÇÃO - Portal IA & Tech

**Data de Referência**: 02/01/2026  
**Versão Base**: v1.0 - Deploy Inicial  
**Status**: Planejamento de Funcionalidades

---

## 🎯 OBJETIVO DO PORTAL

**Portal de referência educacional** sobre IAs do momento, com:
- Informações organizadas por ferramentas/plataformas
- Tutoriais práticos e recursos
- Links de acesso e afiliação
- Visual limpo e objetivo

---

## 👥 PERSONAS / PÚBLICO-ALVO

### **Estudante Iniciante**
- Busca: O que é cada IA, para que serve
- Precisa: Tutoriais básicos, exemplos visuais
- Ação: Explorar, testar gratuitamente

### **Estudante Intermediário**
- Busca: Como usar ferramentas específicas
- Precisa: Tutoriais avançados, comparações
- Ação: Assinar planos, projetos práticos

### **Profissional/Educador**
- Busca: Recursos completos, APIs, integrações
- Precisa: Documentação técnica, casos de uso
- Ação: Implementar em projetos reais

---

## 🏗️ ESTRUTURA DO SITE (SITEMAP)

```
📱 Portal IA & Tech (Home)
│
├── 🏠 HOME / Dashboard
│   ├── Hero Section (apresentação)
│   ├── Estatísticas rápidas
│   ├── Destaques (novidades)
│   └── Call-to-Action principal
│
├── 🤖 FERRAMENTAS IA
│   │
│   ├── 🔍 IA de Busca & Pesquisa
│   │   ├── Genspark
│   │   │   ├── Sobre / História
│   │   │   ├── Funcionalidades
│   │   │   ├── Como usar (tutorial)
│   │   │   ├── Vídeos tutoriais
│   │   │   ├── Planos e preços
│   │   │   └── Link de acesso [afiliado]
│   │   │
│   │   └── Perplexity, ChatGPT Search, etc.
│   │
│   ├── 🎨 IA de Imagens
│   │   ├── Leonardo.ai
│   │   │   ├── Sobre
│   │   │   ├── Funcionalidades
│   │   │   ├── Galeria de exemplos
│   │   │   ├── Tutoriais (iniciante → avançado)
│   │   │   ├── Planos
│   │   │   └── Link de acesso [afiliado]
│   │   │
│   │   ├── Canva AI
│   │   ├── Midjourney
│   │   ├── DALL-E 3
│   │   └── Stable Diffusion
│   │
│   ├── 🎥 IA de Vídeo
│   │   ├── Runway
│   │   ├── Pika Labs
│   │   └── Synthesia
│   │
│   ├── ✍️ IA de Texto & Escrita
│   │   ├── ChatGPT
│   │   ├── Claude
│   │   ├── Gemini
│   │   └── Jasper AI
│   │
│   ├── 🎵 IA de Áudio & Música
│   │   ├── ElevenLabs
│   │   ├── Suno AI
│   │   └── Murf AI
│   │
│   └── 💼 IA para Negócios
│       ├── Análise de dados
│       ├── Automação
│       └── Atendimento (chatbots)
│
├── 📚 TUTORIAIS & GUIAS
│   ├── Por Nível
│   │   ├── Iniciante
│   │   ├── Intermediário
│   │   └── Avançado
│   │
│   ├── Por Categoria
│   │   ├── Imagens
│   │   ├── Vídeos
│   │   ├── Textos
│   │   └── Áudio
│   │
│   └── Projetos Práticos
│       ├── Criar logo com IA
│       ├── Vídeo marketing
│       └── Automação de tarefas
│
├── 🎨 GALERIA / SHOWCASE
│   ├── Exemplos criados com IA
│   ├── Filtros por ferramenta
│   ├── Antes & Depois
│   └── Projetos da comunidade
│
├── 📖 BLOG / ARTIGOS
│   ├── Novidades sobre IAs
│   ├── Comparações de ferramentas
│   ├── Dicas e truques
│   └── Casos de uso
│
├── 💡 RECURSOS
│   ├── Prompts prontos
│   ├── Templates
│   ├── Cheat sheets
│   └── Links úteis
│
└── 👤 SOBRE & CONTATO
    ├── Sobre o portal
    ├── Sobre o criador (Silvio)
    ├── Contato / Suporte
    └── Políticas e termos

```

---

## 🔄 FLUXO DE USUÁRIO (USER FLOW)

### **Exemplo: Estudante busca "Como criar imagens com IA"**

```
1. 🏠 Entra no Portal (Home)
   ↓
2. 🔍 Vê card "IA de Imagens" em destaque
   ↓
3. 🎨 Clica → Vai para "Ferramentas IA > Imagens"
   ↓
4. 📋 Vê lista: Leonardo, Canva, Midjourney, etc.
   ↓
5. 🖼️ Clica em "Leonardo.ai"
   ↓
6. 📄 Página Leonardo.ai:
   │
   ├── 📖 História/Sobre (breve)
   ├── ⚙️ Funcionalidades principais
   ├── 🎬 Vídeo tutorial embutido
   ├── 🖼️ Galeria de exemplos
   ├── 📚 Link para tutoriais completos
   ├── 💰 Planos e preços
   └── 🔗 Botão "Criar conta" [link afiliado]
   ↓
7. 🎓 Opções do usuário:
   │
   ├── Ver tutorial → Página de tutorial
   ├── Ver exemplos → Galeria filtrada
   ├── Criar conta → Site Leonardo [afiliado]
   └── Voltar → Explorar outras ferramentas

```

---

## 🎨 WIREFRAME CONCEITUAL (Página de Ferramenta)

```
┌─────────────────────────────────────────────────────┐
│  🏠 Portal IA    🔍 Buscar    👤 Menu                │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ← Voltar para Ferramentas                          │
│                                                      │
│  🎨 Leonardo.ai                                      │
│  ════════════════════════════════════════════════    │
│                                                      │
│  📌 Sobre                                            │
│  Leonardo.ai é uma plataforma de geração de          │
│  imagens com IA, focada em arte, design e...        │
│                                                      │
│  ⚙️ Funcionalidades Principais                       │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐               │
│  │ Img2Img │ │ Text2Img│ │ Canvas  │               │
│  └─────────┘ └─────────┘ └─────────┘               │
│                                                      │
│  🎬 Tutorial em Vídeo                                │
│  ┌───────────────────────────────────────┐          │
│  │      ▶️ Como criar sua primeira        │          │
│  │         imagem no Leonardo             │          │
│  └───────────────────────────────────────┘          │
│                                                      │
│  🖼️ Exemplos Criados com Leonardo                    │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                       │
│  │img1│ │img2│ │img3│ │img4│ → Ver mais             │
│  └────┘ └────┘ └────┘ └────┘                       │
│                                                      │
│  💰 Planos e Preços                                  │
│  • Gratuito: 150 créditos/dia                       │
│  • Apprentice: $10/mês                              │
│  • Artisan: $24/mês                                 │
│                                                      │
│  🔗 [Criar conta no Leonardo.ai] ← Link afiliado    │
│  📚 [Ver tutoriais completos]                        │
│  🎨 [Ver galeria completa]                           │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## 🔗 MATRIZ DE FUNCIONALIDADES

| Elemento | Ação | Destino |
|----------|------|---------|
| Logo "Portal IA" | Click | Home |
| Menu "Ferramentas" | Click | Página Ferramentas IA |
| Card "Genspark" | Click | Página Genspark |
| Botão "Tutorial" | Click | Página Tutorial específico |
| Link "Criar conta" | Click | Site oficial [afiliado] |
| Galeria > Imagem | Click | Modal com detalhes |
| Busca (header) | Input | Resultados filtrados |
| Filtro categoria | Select | Atualiza grid |

---

## 💰 ESTRATÉGIA DE MONETIZAÇÃO

### **Links Afiliados**
- Genspark, Leonardo, Canva, etc.
- Botões "Criar conta" / "Assinar"
- Disclosure transparente

### **Programas de Parceria**
- Verificar programas oficiais:
  - Leonardo.ai Affiliate Program
  - Canva Partner Program
  - Etc.

### **Banner/Destaque para Partners**
- Ferramentas com parceria ativa

---

## 🎯 PRÓXIMOS PASSOS (IMPLEMENTAÇÃO GRADUAL)

### **Fase 1: Estrutura Base** ✅ (CONCLUÍDA)
- [x] Design e layout
- [x] Deploy em produção
- [x] Domínio configurado

### **Fase 2: Navegação Funcional** (PRÓXIMA)
- [ ] Criar páginas internas (Ferramentas, Tutoriais)
- [ ] Implementar menu navegável
- [ ] Links funcionais entre páginas

### **Fase 3: Conteúdo Genspark** (Piloto)
- [ ] Página completa Genspark
  - [ ] Texto sobre a plataforma
  - [ ] Funcionalidades
  - [ ] Tutorial passo a passo
  - [ ] Vídeo tutorial
  - [ ] Link de acesso

### **Fase 4: Conteúdo Leonardo.ai**
- [ ] Página completa Leonardo
- [ ] Galeria de exemplos
- [ ] Tutoriais específicos

### **Fase 5: Conteúdo Canva AI**
- [ ] Página completa Canva
- [ ] Recursos e templates

### **Fase 6: Expansão**
- [ ] Adicionar mais ferramentas
- [ ] Sistema de busca
- [ ] Sistema de filtros

### **Fase 7: Comunidade**
- [ ] Área de projetos da comunidade
- [ ] Upload de criações (galeria)

---

## 📝 DOCUMENTAÇÃO TÉCNICA

### **Stack Atual**
- Hono.js (SSR)
- TypeScript
- Cloudflare Pages
- Tailwind CSS

### **Estrutura de Arquivos Sugerida**
```
src/
├── pages/
│   ├── home.tsx
│   ├── ferramentas/
│   │   ├── index.tsx
│   │   ├── genspark.tsx
│   │   ├── leonardo.tsx
│   │   └── canva.tsx
│   ├── tutoriais/
│   └── galeria/
├── components/
│   ├── ToolCard.tsx
│   ├── TutorialCard.tsx
│   └── VideoEmbed.tsx
└── data/
    ├── tools.json
    └── tutorials.json
```

---

## ✅ CHECKLIST DE QUALIDADE

Cada página de ferramenta deve ter:
- [ ] Título e logo da ferramenta
- [ ] Descrição breve (1-2 parágrafos)
- [ ] Lista de funcionalidades principais
- [ ] Pelo menos 1 tutorial em vídeo
- [ ] 3-5 exemplos visuais
- [ ] Informação de preços
- [ ] Link de acesso oficial
- [ ] Disclosure de afiliado (se aplicável)
- [ ] Navegação para tutoriais relacionados

---

**Criado em**: 02/01/2026  
**Por**: Silvio + AI Assistant  
**Versão**: 1.0 - Planejamento Inicial
