# 🚀 Guia Completo de Deploy - Portal IA & Tecnologia

## 📋 Status Atual do Projeto

**✅ PRONTO PARA DEPLOY EM PRODUÇÃO**

- ✅ **Código**: Versionado no GitHub com todas as melhorias
- ✅ **Build**: Gerado em `/dist` e testado  
- ✅ **APIs**: Todas funcionando (stats, likes, share, delete)
- ✅ **Frontend**: Dashboard dinâmico, galeria interativa
- ✅ **Banco**: Estrutura D1 SQLite completa com seed data

---

## 🌍 **URLs do Projeto**

### **Desenvolvimento (Sandbox)**
- **Portal**: https://3000-irjw2qwst7fu4qmak5y01-6532622b.e2b.dev
- **Backup**: https://page.gensparksite.com/project_backups/tooluse_v6FmPwLzQNCQ7Q7UmmBbnw.tar.gz

### **Repositório GitHub** 
- **URL**: https://github.com/Silviosb88/ai-and-technology-portal
- **Branch**: `main` (produção)
- **Último commit**: Todas as melhorias implementadas

---

## 🔧 **Deploy Manual Cloudflare Pages**

### **Passo 1: Configurar API Token**

1. **Acesse**: https://dash.cloudflare.com/profile/api-tokens
2. **Crie novo token** com as permissões:
   ```
   ✅ Zone:Zone:Read
   ✅ Zone:Page Rule:Edit  
   ✅ Account:Cloudflare Pages:Edit
   ✅ Account:Account Settings:Read
   ✅ Zone:Zone Settings:Edit
   ✅ Account:D1:Edit
   ```
3. **Configure no terminal**:
   ```bash
   export CLOUDFLARE_API_TOKEN="seu_token_aqui"
   ```

### **Passo 2: Criar Banco D1 de Produção**

```bash
# Navegar para o projeto
cd /home/user/webapp

# Criar banco D1 de produção
npx wrangler d1 create ai-and-technology-portal-production

# Copiar o database_id retornado e atualizar wrangler.jsonc:
# "database_id": "cole-o-id-aqui"
```

### **Passo 3: Aplicar Migrações**

```bash
# Aplicar migrações no banco de produção
npx wrangler d1 migrations apply ai-and-technology-portal-production

# Aplicar seed data (opcional)
npx wrangler d1 execute ai-and-technology-portal-production --file=./seed.sql
```

### **Passo 4: Deploy Cloudflare Pages**

```bash
# Build de produção
npm run build

# Criar projeto Pages
npx wrangler pages project create ai-and-technology-portal \
  --production-branch main \
  --compatibility-date 2024-01-01

# Deploy inicial
npx wrangler pages deploy dist --project-name ai-and-technology-portal

# Resultado esperado:
# ✅ https://ai-and-technology-portal.pages.dev
# ✅ https://random-id.ai-and-technology-portal.pages.dev
```

---

## 🛠️ **Configurações de Produção**

### **Variáveis de Ambiente**

```bash
# Configurar variáveis no Cloudflare Pages
npx wrangler pages secret put ENVIRONMENT --project-name ai-and-technology-portal
# Valor: "production"

npx wrangler pages secret put PORTAL_NAME --project-name ai-and-technology-portal  
# Valor: "Portal Educativo IA & Tecnologia"
```

### **Domínio Personalizado (Opcional)**

```bash
# Se você tem um domínio próprio
npx wrangler pages domain add seudominio.com.br --project-name ai-and-technology-portal

# Configure DNS:
# CNAME: ai-and-technology-portal.pages.dev
```

---

## 📁 **Estrutura dos Arquivos de Deploy**

```
webapp/
├── dist/                    # Build de produção (gerado)
│   ├── _worker.js          # Aplicação Hono compilada  
│   ├── _routes.json        # Configuração de rotas
│   └── static/             # Assets estáticos
├── migrations/             # Migrações D1 SQLite
│   └── 0001_initial_schema.sql
├── seed.sql               # Dados iniciais
├── wrangler.jsonc         # Configuração Cloudflare
├── package.json           # Dependências e scripts
└── vite.config.ts         # Build configuration
```

---

## ⚡ **Scripts de Deploy Automatizado**

### **Deploy Completo**
```bash
# Script all-in-one para deploy
npm run deploy:full
```

### **Deploy Apenas Código**
```bash  
# Apenas rebuild e redeploy
npm run deploy
```

### **Atualizar Banco**
```bash
# Aplicar novas migrações
npm run db:migrate:prod
```

---

## 🔍 **Verificação Pós-Deploy**

### **URLs para Testar**
```bash
# Homepage
curl https://ai-and-technology-portal.pages.dev

# API Estatísticas  
curl https://ai-and-technology-portal.pages.dev/api/stats/global

# API Imagens
curl https://ai-and-technology-portal.pages.dev/api/images

# Galeria
curl https://ai-and-technology-portal.pages.dev/galeria
```

### **Funcionalidades Críticas**
- ✅ **Dashboard**: Contadores dinâmicos carregam
- ✅ **Galeria**: Imagens exibem com likes/shares funcionais
- ✅ **Upload**: Modal abre e aceita arquivos  
- ✅ **Modo Edição**: Botão de exclusão funciona
- ✅ **Logo**: Clicável para home
- ✅ **Navegação**: Todas as páginas acessíveis

---

## 🚨 **Troubleshooting**

### **Problema**: API 404 Not Found
**Solução**: Verificar se `_routes.json` foi gerado corretamente

### **Problema**: Database Error  
**Solução**: Aplicar migrações com `npx wrangler d1 migrations apply`

### **Problema**: Assets 404
**Solução**: Verificar se arquivos estão em `/dist/static/`

### **Problema**: CORS Error
**Solução**: Verificar configuração CORS nas APIs

---

## 📊 **Monitoramento de Produção**

### **Analytics Cloudflare**
- **URL**: https://dash.cloudflare.com/pages
- **Métricas**: Requests, bandwidth, errors
- **Logs**: Real-time error monitoring

### **Performance**
- **Core Web Vitals**: Automático via Cloudflare
- **Database**: Monitor via Cloudflare D1 dashboard
- **CDN**: Global edge performance

---

## 🔄 **Fluxo de Desenvolvimento Contínuo**

### **Desenvolvimento Local**
```bash
# 1. Modificar código
# 2. Testar local
npm run build && pm2 restart portal-educativo-ia

# 3. Commit no GitHub
git add . && git commit -m "feature: nova funcionalidade"
git push origin main

# 4. Deploy para produção  
npm run deploy
```

### **Versionamento Semântico**
- **v1.0.0**: Release inicial
- **v1.1.0**: Novas funcionalidades (likes, share, edição)
- **v1.1.x**: Bug fixes e melhorias menores

---

## 📞 **Suporte e Recursos**

### **Documentação Oficial**
- **Cloudflare Pages**: https://developers.cloudflare.com/pages
- **Cloudflare D1**: https://developers.cloudflare.com/d1
- **Hono Framework**: https://hono.dev

### **Comunidade**
- **Discord Cloudflare**: https://discord.cloudflare.com
- **GitHub Issues**: https://github.com/Silviosb88/ai-and-technology-portal/issues

---

*Documentação criada em 24 de setembro de 2025*  
*Portal Educativo IA & Tecnologia - v1.1.0*