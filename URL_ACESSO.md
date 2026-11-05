# 🌐 ACESSO PÚBLICO AO PORTAL IA & TECH

## ✅ URL de Acesso no Genspark

O Genspark já possui um sistema interno de preview/proxy para acessar aplicações rodando no sandbox.

### 📍 Como Acessar

**Dentro do Genspark:**
O sistema já detecta automaticamente portas abertas (porta 3000) e fornece uma URL de acesso.

**Sandbox ID Atual:** `ixu7jvs4694b19is3h49f`

### 🔗 URL Esperada (Padrão Genspark)

A URL geralmente segue o formato:
```
https://<sandbox-id>-<porta>.genspark.ai
ou
https://<porta>-<session-id>.genspark.preview
```

### ⚙️ Verificação Automática

Execute este comando para ver se há alguma URL de proxy ativa:

```bash
curl -s http://localhost:3000 > /dev/null && echo "✅ Servidor respondendo na porta 3000"
```

---

## 💡 IMPORTANTE

O Genspark normalmente exibe a URL de acesso automaticamente na interface quando detecta uma porta aberta (3000).

**Procure na interface do Genspark por:**
- Botão "Open Preview" ou "Preview"
- Ícone de link/navegador próximo à porta 3000
- Mensagem automática com a URL
- Painel de "Running Ports" ou "Exposed Ports"

---

## 🔄 Alternativa Manual

Se a URL não aparecer automaticamente, você pode:

1. Clicar em "Ports" ou "Preview" na interface
2. Selecionar a porta 3000
3. O Genspark gerará automaticamente a URL pública

---

## 📊 Status Atual

- Servidor: ✅ Rodando na porta 3000
- Bind: 0.0.0.0 (aceita conexões externas)
- Sandbox ID: ixu7jvs4694b19is3h49f
- Status: Pronto para acesso público via Genspark

---

**Última atualização:** 01/01/2026
