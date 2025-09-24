#!/bin/bash

# 🚀 Script de Deploy Automatizado - Portal IA & Tecnologia
# Autor: Silvio - Analista de Informação
# Data: 24/09/2025

set -e  # Parar em caso de erro

echo "🚀 Iniciando deploy do Portal IA & Tecnologia..."
echo "=================================================="

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script no diretório do projeto"
    exit 1
fi

# Verificar se há mudanças não commitadas
if ! git diff --quiet HEAD; then
    echo "⚠️ Há mudanças não commitadas. Fazendo commit automático..."
    git add .
    git commit -m "Deploy: atualizações automáticas $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Fazer push para GitHub
echo "📤 Enviando código para GitHub..."
git push origin main

# Build de produção
echo "🔨 Fazendo build de produção..."
npm run build

# Verificar se o build foi criado
if [ ! -d "dist" ]; then
    echo "❌ Erro: Diretório dist não foi criado"
    exit 1
fi

echo "✅ Build concluído com sucesso!"
echo "📁 Arquivos gerados em ./dist/"

# Verificar autenticação Cloudflare
echo "🔐 Verificando autenticação Cloudflare..."
if ! npx wrangler whoami > /dev/null 2>&1; then
    echo "❌ Erro: Não autenticado no Cloudflare"
    echo "💡 Execute: export CLOUDFLARE_API_TOKEN=\"seu_token\""
    exit 1
fi

echo "✅ Autenticado no Cloudflare"

# Tentar criar projeto (se não existir)
echo "📋 Verificando projeto Cloudflare Pages..."
if ! npx wrangler pages project list | grep -q "ai-and-technology-portal"; then
    echo "🆕 Criando projeto Cloudflare Pages..."
    npx wrangler pages project create ai-and-technology-portal \
        --production-branch main \
        --compatibility-date 2024-01-01 || echo "⚠️ Projeto pode já existir"
fi

# Deploy para Cloudflare Pages
echo "🚀 Fazendo deploy para Cloudflare Pages..."
npx wrangler pages deploy dist --project-name ai-and-technology-portal

echo ""
echo "🎉 Deploy concluído com sucesso!"
echo "=================================================="
echo "🌍 URLs do projeto:"
echo "📱 Desenvolvimento: https://3000-irjw2qwst7fu4qmak5y01-6532622b.e2b.dev"
echo "🌐 Produção: https://ai-and-technology-portal.pages.dev"
echo "🐙 GitHub: https://github.com/Silviosb88/ai-and-technology-portal"
echo ""
echo "🔍 Para testar a API de produção:"
echo "curl https://ai-and-technology-portal.pages.dev/api/stats/global"
echo ""
echo "📚 Documentação completa: DEPLOY_INSTRUCTIONS.md"
echo "=================================================="