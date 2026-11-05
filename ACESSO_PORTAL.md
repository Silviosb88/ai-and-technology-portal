# 🌐 PORTAL IA & TECH - ACESSO E INFORMAÇÕES

**Data de Setup:** 01/01/2026  
**Status:** ✅ **ONLINE E FUNCIONAL**

---

## 🎉 BEM-VINDO AO SEU PORTAL!

O **Portal IA & Tech** está rodando no ambiente Genspark e pronto para uso!

---

## 🌐 COMO ACESSAR

### Acesso Local (no Genspark)
```
http://localhost:3000
```

### Verificar se está Online
```bash
curl http://localhost:3000 | head -20
```

### Ver Processo do Servidor
```bash
ps aux | grep "http.server"
```

---

## 🚀 GERENCIAMENTO DO SERVIDOR

### ✅ Iniciar o Servidor
```bash
cd /home/user/portal-ia-tech
python3 -m http.server 3000 --bind 0.0.0.0 &
```

### ⏹️ Parar o Servidor
```bash
lsof -ti:3000 | xargs kill -9
```

### 🔄 Reiniciar o Servidor
```bash
# Parar
lsof -ti:3000 | xargs kill -9

# Aguardar 2 segundos
sleep 2

# Iniciar
cd /home/user/portal-ia-tech
python3 -m http.server 3000 --bind 0.0.0.0 &
```

### 📊 Ver Logs em Tempo Real
```bash
# Se estiver usando o servidor com nohup
tail -f /home/user/portal-ia-tech/server.log
```

---

## 📦 BACKUP NO GITHUB

### Backup Automático (Recomendado)
```bash
cd /home/user/portal-ia-tech
./backup-github.sh
```

### Backup Manual
```bash
cd /home/user/portal-ia-tech

# Ver o que mudou
git status

# Adicionar mudanças
git add .

# Fazer commit
git commit -m "Descrição das suas mudanças"

# Enviar para GitHub (requer autenticação)
git push origin main
```

---

## 🔧 DESENVOLVIMENTO

### Fazer Mudanças no Código
1. Edite os arquivos em `/home/user/portal-ia-tech/`
2. Atualize a página no navegador (F5)
3. Veja as mudanças instantaneamente

### Arquivos Principais para Editar
```
/home/user/portal-ia-tech/
├── index.html           # Página principal
├── css/                 # Estilos customizados
├── js/                  # Scripts JavaScript
│   ├── portal.js        # Lógica principal
│   ├── gallery.js       # Galeria
│   └── upload.js        # Sistema de upload
└── src/                 # Código TypeScript (para build)
```

### Rebuild (se modificar TypeScript)
```bash
cd /home/user/portal-ia-tech
npm run build
```

---

## 📚 DOCUMENTAÇÃO COMPLETA

### Arquivos de Documentação
- `GENSPARK_SETUP.md` - Guia completo do ambiente
- `STATUS_FINAL.md` - Status atual e conquistas
- `ACESSO_PORTAL.md` - Este arquivo
- `README.md` - Documentação geral do projeto

### Onde Encontrar
```bash
cd /home/user/portal-ia-tech
ls *.md
```

---

## 🔗 LINKS IMPORTANTES

### GitHub
- **Repositório:** https://github.com/Silviosb88/ai-and-technology-portal
- **Commits:** https://github.com/Silviosb88/ai-and-technology-portal/commits/main

### Documentação Online
- **Hono Framework:** https://hono.dev
- **Cloudflare Pages:** https://pages.cloudflare.com
- **TailwindCSS:** https://tailwindcss.com

---

## 🆘 TROUBLESHOOTING

### Problema: Servidor não inicia
**Solução:**
```bash
# Liberar a porta
lsof -ti:3000 | xargs kill -9

# Reiniciar
cd /home/user/portal-ia-tech
python3 -m http.server 3000 --bind 0.0.0.0 &
```

### Problema: Site não carrega
**Solução:**
```bash
# Verificar se servidor está rodando
curl http://localhost:3000

# Se não responder, reiniciar servidor
```

### Problema: Mudanças não aparecem
**Solução:**
```bash
# Limpar cache do navegador (Ctrl+Shift+R)
# Ou reiniciar servidor
```

### Problema: Erro no Git
**Solução:**
```bash
cd /home/user/portal-ia-tech
git status  # Ver o que está acontecendo
git log     # Ver histórico de commits
```

---

## 📞 INFORMAÇÕES DE CONTATO

**Desenvolvedor:** Silvio  
**Email:** jsilvio.sb@gmail.com  
**GitHub:** [@Silviosb88](https://github.com/Silviosb88)

---

## 🎯 PRÓXIMOS PASSOS SUGERIDOS

1. ✅ Testar o site localmente
2. ✅ Fazer modificações desejadas
3. ✅ Criar backup regular no GitHub
4. ✅ Explorar funcionalidades
5. ✅ Adicionar novo conteúdo

---

## 📊 STATUS TÉCNICO

```
✅ Servidor: ONLINE (porta 3000)
✅ Build: Compilado (130KB)
✅ Git: Conectado ao GitHub
✅ Backup: Sistema configurado
✅ Documentação: Completa
```

---

## 🎉 TUDO PRONTO!

Seu portal está no ar e funcionando perfeitamente! 🚀

Acesse http://localhost:3000 e comece a explorar!

---

**Última Atualização:** 01/01/2026 00:20 UTC
