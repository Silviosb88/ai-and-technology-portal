# 📋 Backlog de Ideias — Portal IA & Tech

**Regra de trabalho (acordo com Silvio, 05/11/2026):** ideias e observações (incluindo análises externas, como as do Gemini) são **registradas e analisadas** — viabilidade, impactos positivos/negativos, esforço — e só são implementadas **após aprovação explícita**. Observação externa é insumo de análise, não exigência.

**Premissas do portal (fixas):**
1. Nada entra no ar sem verificação em fonte oficial, com data.
2. Transparência: fontes citadas, disclosure de afiliação, independência de marcas.
3. Acessibilidade como princípio (deficiência visual = usuário de primeira classe).
4. Nada de dado não verificado — "a confirmar" é marcado no próprio card.

---

## 🗂️ Registro de ideias

| # | Data | Ideia (palavras do Silvio) | Status |
|---|------|---------------------------|--------|
| 1 | 05/11/2026 | "O CIEE é um órgão importante para os alunos, um link direto é uma forma de direcionar, **não para estágios mas para quem os coordena** a isso" | Analisado — aguarda aprovação |
| 2 | 05/11/2026 | "ENEM, **não se aprofunde**, já está em cima da hora, não sei se será útil tão em cima. Mas ok, vamos colocar" | Analisado — bloco leve já existe no ar; guia profundo adiado |
| 3 | 05/11/2026 | "Utilize as **três cores básicas** (verde, azul e amarelo), use graduações quando necessário. Balões em **amarelo com letras verde escuro ou preta** para destaques, **fundos brancos** é mais acessível para deficientes visuais. **Roxo e suas graduações, não utilize**" | Analisado (contraste WCAG calculado) — aguarda aprovação |
| 4 | 05/11/2026 | "A observação sobre os **drop-down para a busca** pode limpar um pouco o visual, **direcionando e retornando o usuário para ambientes mais clean**" | Analisado (mockup criado) — aguarda aprovação |

## 📥 Sugestões externas (Gemini, 05/11/2026) — registrado, sem decisão

| # | Sugestão | Status |
|---|----------|--------|
| 5 | Filtro por elegibilidade (match de benefícios por perfil) | ✅ Implementado em `/beneficios-ocultos` (05/11) |
| 6 | Selo de nível de burocracia | ✅ Implementado em `/beneficios-ocultos` (05/11) |
| 7 | Indicador visual de idade da verificação | ✅ Implementado em `/beneficios-ocultos` (05/11) |
| 8 | Fórum / área de comentários (troca de soluções de ativação) | Registrado — exige moderação + LGPD; análise pendente |
| 9 | Vagas e estágios em TI | Registrado — parcialmente coberto pela ideia #1 (CIEE); análise pendente |
| 10 | Modelos de requerimento para professores (hora-atividade, progressão) | Registrado — exige revisão jurídica antes de distribuir |
| 11 | Newsletter de atualizações (novos guias, prazos de renovação) | Registrado — exige infra de cadastro + política de privacidade |
| 12 | Canal WhatsApp/Telegram de alertas | Registrado — mesma dependência da #11 |

## ✅ Fatos verificados nesta análise (05/11/2026)

- **CIEE**: site oficial https://www.ciee.org.br/ — é **ONG** (não órgão público), autodeclarada "A ONG brasileira que conecta jovens e estudantes às melhores empresas. Tudo 100% gratuito!", com seção **"Instituições de Ensino"** (perfil coordenador) e programas: Jovem Aprendiz, Estágio, Aprendiz, Processos Públicos, Soluções Especiais, PCD.
- **ENEM 2026**: página oficial do INEP (gov.br) confirma provas em **8 e 15 de novembro de 2026**; o texto **não menciona datas de inscrição** (terceiros divergem → não publicar).
- **Cores no código**: `purple-*` 36 ocorrências, `indigo-*` 3, `fuchsia-*` 3, token `ai-primary` (#6366f1) 112, `ai-secondary` (#8b5cf6) 31, `ai-accent` (#06b6d4) 6. Tokens centralizados em `src/renderer.tsx`.
- **Contraste WCAG 2.1 (calculado)**: preto sobre amarelo-300 (#FDE047) = **15,93:1**; verde-900 (#14532D) sobre amarelo-300 = **6,91:1**; verde-800 no branco = **7,13:1**; verde-900 no branco = **9,11:1**; azul-700 (#1D4ED8) no branco = **6,70:1**; azul-900 no branco = **10,36:1**. Primária ATUAL (#6366F1) no branco = **4,47:1 — abaixo do AA (4,5) para texto normal**; secundária atual (#8B5CF6) = 4,23:1 — também abaixo.

---
*Próxima revisão do backlog: a cada rodada, com o Silvio.*
