#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const { Worker } = require('worker_threads');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Tipos MIME
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

// Servidor HTTP
const server = http.createServer((req, res) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} ${req.url}`);

  // Normalizar path
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  // Tentar servir do dist/static primeiro
  let filePath = path.join(__dirname, 'dist', 'static', urlPath);
  
  // Se não existir, tentar raiz do dist
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'dist', urlPath);
  }

  // Se ainda não existir, tentar raiz do projeto
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, urlPath);
  }

  // Verificar se arquivo existe
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    // Se for uma rota, servir o index.html (SPA)
    if (!urlPath.includes('.')) {
      filePath = path.join(__dirname, 'index.html');
      if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Arquivo não encontrado');
        return;
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 - Arquivo não encontrado');
      return;
    }
  }

  // Determinar tipo MIME
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  // Ler e enviar arquivo
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(`Erro ao ler arquivo: ${err.message}`);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Erro interno do servidor');
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

// Iniciar servidor
server.listen(PORT, HOST, () => {
  console.log('\n' + '='.repeat(70));
  console.log('🚀 PORTAL IA & TECH - Servidor Genspark Iniciado!');
  console.log('='.repeat(70));
  console.log(`📡 Servidor rodando em: http://${HOST}:${PORT}`);
  console.log(`🌐 Acesso local: http://localhost:${PORT}`);
  console.log(`⏰ Iniciado em: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`);
  console.log(`📂 Servindo de: ${__dirname}`);
  console.log('='.repeat(70));
  console.log('✅ Pressione Ctrl+C para parar o servidor\n');
});

// Tratamento de erros
process.on('uncaughtException', (err) => {
  console.error('Erro não tratado:', err);
});

process.on('SIGINT', () => {
  console.log('\n👋 Servidor encerrado pelo usuário');
  process.exit(0);
});
