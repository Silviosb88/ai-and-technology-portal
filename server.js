const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const HOST = '0.0.0.0';

// Importar o worker do Cloudflare
const workerPath = path.join(__dirname, 'dist', '_worker.js');

// Carregar o worker
let app;
try {
  const workerCode = fs.readFileSync(workerPath, 'utf8');
  // O worker exporta um objeto com fetch
  const module = { exports: {} };
  eval(workerCode);
  app = module.exports.default || module.exports;
} catch (error) {
  console.error('Erro ao carregar worker:', error.message);
  console.log('Usando servidor HTTP simples como fallback...');
}

// Criar servidor
const server = http.createServer(async (req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // Se temos o worker do Cloudflare, usar ele
  if (app && app.fetch) {
    try {
      const request = new Request(`http://${req.headers.host}${req.url}`, {
        method: req.method,
        headers: req.headers,
      });
      
      const response = await app.fetch(request, {});
      
      res.writeHead(response.status, Object.fromEntries(response.headers));
      const body = await response.text();
      res.end(body);
      return;
    } catch (error) {
      console.error('Erro no worker:', error.message);
    }
  }

  // Fallback: servir arquivos estáticos
  let filePath = path.join(__dirname, 'dist', 'static', req.url === '/' ? 'index.html' : req.url);
  
  // Se não existe, tentar sem /static
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('404 - Página não encontrada');
      return;
    }

    const ext = path.extname(filePath);
    const contentType = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
    }[ext] || 'text/plain';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  console.log('='.repeat(60));
  console.log('🚀 PORTAL IA & TECH - Servidor Iniciado!');
  console.log('='.repeat(60));
  console.log(`📡 Servidor rodando em: http://${HOST}:${PORT}`);
  console.log(`🌐 Acesse via Genspark proxy`);
  console.log(`⏰ Iniciado em: ${new Date().toLocaleString('pt-BR')}`);
  console.log('='.repeat(60));
});
