#!/bin/bash

# Script de Backup Automático para GitHub
# Portal IA & Tech - Genspark Edition

echo "================================================"
echo "🔄 BACKUP AUTOMÁTICO PARA GITHUB"
echo "================================================"
echo "⏰ Iniciado em: $(date '+%d/%m/%Y %H:%M:%S')"
echo ""

# Diretório do projeto
PROJECT_DIR="/home/user/portal-ia-tech"
cd "$PROJECT_DIR" || exit 1

# Verificar se há mudanças
if [[ -z $(git status --porcelain) ]]; then
    echo "✅ Nenhuma mudança detectada - repositório está limpo"
    echo ""
    exit 0
fi

# Adicionar todos os arquivos
echo "📦 Adicionando arquivos modificados..."
git add .

# Criar mensagem de commit com timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
COMMIT_MSG="🔄 Backup automático Genspark - ${TIMESTAMP}"

# Fazer commit
echo "💾 Criando commit..."
git commit -m "$COMMIT_MSG"

# Push para GitHub
echo "🚀 Enviando para GitHub..."
if git push origin main; then
    echo ""
    echo "================================================"
    echo "✅ BACKUP CONCLUÍDO COM SUCESSO!"
    echo "================================================"
    echo "📊 Status:"
    git log --oneline -1
    echo ""
    echo "🌐 GitHub: https://github.com/Silviosb88/ai-and-technology-portal"
    echo "================================================"
else
    echo ""
    echo "❌ ERRO: Falha ao enviar para o GitHub"
    echo "Verifique sua conexão e credenciais"
    exit 1
fi
