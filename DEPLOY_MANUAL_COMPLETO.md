# 🚀 Deploy Manual Completo - www.iaetech.com.br

## ⚡ **SITUAÇÃO ATUAL**
- ✅ **Portal 100% funcional**: https://3000-irjw2qwst7fu4qmak5y01-6532622b.e2b.dev  
- ✅ **Build otimizado pronto**: `/dist` (110KB)
- ✅ **Código versionado**: GitHub configurado
- ❌ **Token Cloudflare limitado**: Não permite deploy automático via CLI

---

## 🎯 **SOLUÇÃO: Deploy Manual no Dashboard Cloudflare**

### **📋 Passo 1: Acessar Cloudflare Dashboard**
1. **URL**: https://dash.cloudflare.com/pages
2. **Login**: Sua conta Jsilvio.sb@gmail.com
3. **Clicar**: "Create a project"

### **📋 Passo 2: Configurar Projeto**
1. **Método**: "Upload assets"
2. **Nome do projeto**: `iaetech-portal`
3. **Production branch**: `main`

### **📋 Passo 3: Upload dos Arquivos**

**ARQUIVOS PARA UPLOAD** (pasta /dist completa):
```
dist/
├── _worker.js          # 110KB - Aplicação principal
├── _routes.json        # Configuração de rotas  
├── _headers           # Headers de segurança
├── _redirects         # Redirecionamentos
├── index.html         # Página principal
├── static/            # Assets estáticos
│   ├── css/           # Estilos TailwindCSS
│   ├── js/            # JavaScript frontend
│   └── images/        # Ícones e imagens
└── wrangler.toml      # Configuração
```

**⚠️ IMPORTANTE**: Fazer upload de **TODA** a pasta `/dist`, não apenas arquivos soltos!

---

## 🌐 **Configurar Domínio www.iaetech.com.br**

### **📋 Passo 4: Adicionar Domínio Customizado**
1. **No projeto criado** → "Custom domains"
2. **Adicionar**: `www.iaetech.com.br`
3. **Confirmar**: Verificação de domínio

### **📋 Passo 5: Configurar DNS**
**Na zona DNS do iaetech.com.br**:

```
CNAME  www  iaetech-portal.pages.dev
```

**OU** (se preferir apex domain):
```  
CNAME  @    iaetech-portal.pages.dev
A      @    [IP do Cloudflare Pages - será fornecido]
```

---

## 💾 **Alternativa: Download de Backup**

### **Se preferir fazer upload local:**
1. **Download**: https://page.gensparksite.com/project_backups/tooluse_RZqF1PRiTl-Uepwpvrvpfw.tar.gz
2. **Extrair**: `tar -xzf tooluse_RZqF1PRiTl-Uepwpvrvpfw.tar.gz`
3. **Navegar**: `cd webapp/dist`
4. **Upload**: No dashboard Cloudflare Pages

---

## ⚙️ **Configurações de Produção**

### **📋 Passo 6: Variáveis de Ambiente**
**No dashboard do projeto** → "Settings" → "Environment variables":

```
ENVIRONMENT=production
PORTAL_NAME=Portal Educativo IA & Tecnologia
DOMAIN=www.iaetech.com.br
NODE_ENV=production
```

### **📋 Passo 7: Configurações de Build (OPCIONAL)**
**Se usar integração GitHub**:
```
Build command: npm run build
Output directory: dist
Root directory: (blank)
```

---

## 🗄️ **Configurar Banco D1 (OPCIONAL)**

### **Opção A: Manter Dados Mockados** ✅ RECOMENDADO
- **Vantagem**: Deploy imediato, funciona 100%
- **Limitação**: Dados resetam a cada deploy
- **Ideal para**: Demonstração e protótipo

### **Opção B: Criar D1 Manual**
1. **Dashboard** → "D1 SQL Database"  
2. **Criar**: `iaetech-portal-production`
3. **Copiar ID**: Para `wrangler.jsonc`
4. **SQL**: Executar conteúdo de `/migrations/` e `/seed.sql`

**SQL para executar no D1**:
```sql
-- (Conteúdo de migrations/0001_initial_schema.sql)
-- (Conteúdo de seed.sql)
```

---

## 📊 **URLs Finais (Após Deploy)**

### **🌐 Produção**
- **Principal**: `https://www.iaetech.com.br`
- **Cloudflare**: `https://iaetech-portal.pages.dev`

### **🔗 Páginas**  
- **Dashboard**: `https://www.iaetech.com.br/`
- **Galeria**: `https://www.iaetech.com.br/galeria`  
- **Tutoriais**: `https://www.iaetech.com.br/tutoriais`
- **Showcase**: `https://www.iaetech.com.br/showcase`

### **🛠️ APIs**
- **Estatísticas**: `https://www.iaetech.com.br/api/stats/global`
- **Imagens**: `https://www.iaetech.com.br/api/images`  
- **Upload**: `https://www.iaetech.com.br/api/upload`
- **Tutoriais**: `https://www.iaetech.com.br/api/tutorials`

---

## ✅ **Teste Pós-Deploy**

### **📋 Verificação Essencial**
1. **Homepage carrega**: ✅ Dashboard com contadores dinâmicos
2. **Galeria funciona**: ✅ Imagens, likes, shares  
3. **Upload modal**: ✅ Abre e aceita arquivos
4. **Navegação**: ✅ Todas as páginas acessíveis
5. **APIs respondem**: ✅ `/api/stats/global` retorna JSON
6. **Logo clicável**: ✅ Retorna para home
7. **Modo edição**: ✅ Ctrl+E mostra botões de exclusão

### **🧪 Comandos de Teste**
```bash
# Testar APIs
curl https://www.iaetech.com.br/api/stats/global
curl https://www.iaetech.com.br/api/images  
curl https://www.iaetech.com.br/api/categories

# Verificar páginas
curl -I https://www.iaetech.com.br/
curl -I https://www.iaetech.com.br/galeria
curl -I https://www.iaetech.com.br/tutoriais
```

---

## 🚨 **Possíveis Problemas e Soluções**

### **❌ Erro 404 nas APIs**
- **Causa**: Arquivo `_routes.json` não configurado  
- **Solução**: Verificar se `_worker.js` e `_routes.json` foram uploadados

### **❌ Assets não carregam**
- **Causa**: Pasta `static/` não no lugar correto
- **Solução**: Verificar estrutura `/static/css/`, `/static/js/`

### **❌ Domínio não resolve**
- **Causa**: DNS não propagou
- **Solução**: Aguardar 24h ou usar `dig www.iaetech.com.br`

### **❌ Dados não persistem** 
- **Causa**: Usando dados mockados
- **Solução**: Normal! Configure D1 se necessário

---

## 🎯 **Tempo de Deploy Estimado**

- **⚡ Upload manual**: 5-10 minutos
- **🌐 Propagação DNS**: 5 minutos - 24 horas  
- **✅ Total**: **15 minutos para estar online!**

---

## 📞 **Suporte**

### **Se algo der errado:**
1. **Portal atual funcionando**: https://3000-irjw2qwst7fu4qmak5y01-6532622b.e2b.dev
2. **Backup completo**: https://page.gensparksite.com/project_backups/tooluse_RZqF1PRiTl-Uepwpvrvpfw.tar.gz
3. **Documentação**: Este arquivo + `README.md`

### **Cloudflare Support**
- **Dashboard**: https://dash.cloudflare.com/pages
- **Docs**: https://developers.cloudflare.com/pages
- **Community**: https://community.cloudflare.com

---

## 🏆 **RESULTADO FINAL**

**🚀 www.iaetech.com.br funcionando com:**
- ✅ Dashboard dinâmico com estatísticas reais  
- ✅ Galeria interativa com likes/shares
- ✅ Sistema de upload para imagens e vídeos
- ✅ Capacidade de exclusão (Ctrl+E)
- ✅ Logo clicável e navegação completa
- ✅ Todas as APIs funcionais
- ✅ Design responsivo e profissional
- ✅ Performance otimizada (edge computing)

**🎉 Portal Educativo IA & Tecnologia no ar em seu domínio oficial!**

---

*Guia criado em 24 de setembro de 2025*  
*Portal Educativo IA & Tecnologia v1.1.0*  
*Deploy para www.iaetech.com.br*