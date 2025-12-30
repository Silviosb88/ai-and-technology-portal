# 🚨 PERMISSÃO FALTANTE NO TOKEN

## ❌ **PROBLEMA IDENTIFICADO:**
O token está funcionando para acessar projetos, mas **falta a permissão de "Memberships"** que o Wrangler CLI precisa.

## ✅ **SOLUÇÃO RÁPIDA:**

### **1. EDITAR O TOKEN ATUAL:**
```
https://dash.cloudflare.com/profile/api-tokens
```

### **2. ENCONTRAR:** "GenSpark Portal Deploy"
- Clique em **"Editar"** (Edit)

### **3. ADICIONAR PERMISSÃO:**
```
Account - Account:Read - All accounts
```

### **4. PERMISSÕES COMPLETAS NECESSÁRIAS:**
```
✅ Account - Cloudflare Pages:Edit - All accounts
✅ Account - Account Settings:Read - All accounts
✅ Account - Account:Read - All accounts ← ADICIONAR ESTA
✅ Zone - Zone:Read - All zones
✅ Zone - Zone Settings:Read - All zones
✅ Zone - DNS:Read - All zones
✅ User - User Details:Read
```

### **5. SALVAR AS ALTERAÇÕES**
- Clique **"Continue to summary"**
- Depois **"Update Token"**

## 🎯 **RESULTADO:**
- Deploy automático funcionará
- Acesso completo ao Cloudflare
- Portal atualizado em www.iaetech.com.br

**Tempo estimado**: 2 minutos para adicionar a permissão

**Depois disso, eu consigo fazer TODOS os deploys automaticamente!** 🚀