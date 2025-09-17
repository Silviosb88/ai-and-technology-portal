// ecosystem.config.cjs (CommonJS version for PM2)
module.exports = {
  apps: [
    {
      name: 'portal-educativo-ia',
      script: 'npx',
      args: 'wrangler pages dev dist --d1=portal-ia-production --local --ip 0.0.0.0 --port 3000',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false, // Disable PM2 file monitoring - wrangler handles hot reload
      instances: 1, // Development mode uses only one instance
      exec_mode: 'fork'
    }
  ]
}