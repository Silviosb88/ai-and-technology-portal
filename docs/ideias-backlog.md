# 📋 Backlog de Ideias — Portal IA & Tech

**Regra de trabalho (acordo com Silvio, 05/11/2026):** ideias e observações (incluindo análises externas, como as do Gemini) são **registradas e analisadas** — viabilidade, impactos positivos/negativos, esforço — e só são implementadas **após aprovação explícita**. Observação externa é insumo de análise, não exigência.

**Premissas do portal (fixas):**
1. Nada entra no ar sem verificação em fonte oficial, com data.
2. Transparência: fontes citadas, disclosure de afiliação, independência de marcas.
3. Acessibilidade como princípio (deficiência visual = usuário de primeira classe).
4. Nada de dado não verificado — "a confirmar" é marcado no próprio card.
5. **Paleta oficial (aprovada 05/11/2026): verde, azul e amarelo com graduações — sem roxo e sem texto em branco** (balões em amarelo com texto verde-escuro/preto; fundos brancos para acessibilidade).

---

## 🗂️ Registro de ideias

| # | Data | Ideia (palavras do Silvio) | Status |
|---|------|---------------------------|--------|
| 1 | 05/11/2026 | "O CIEE é um órgão importante para os alunos, um link direto é uma forma de direcionar, não para estágios mas para quem os coordena a isso" → **esclarecido depois**: o CIEE é quem coordena/intermedeia o estudante até as vagas; não há "coordenadores" como público do site | ✅ APROVADO e no ar — página **/direitos-estudantes** como hub de referências (CIEE com card verificado; Brasil Escola "em catalogação" sem link). Sem criação de conteúdo: só o que a fonte afirma sobre si |
| 2 | 05/11/2026 | "ENEM, não se aprofunde... Mas ok, vamos colocar" | ✅ Feito antes — bloco leve já no ar (/beneficios/enem-2026, provas 8 e 15/11 confirmadas no INEP). Guia profundo: adiado |
| 3 | 05/11/2026 | "Utilize as três cores básicas (verde, azul e amarelo)... Balões em amarelo com letras verde escuro ou preta... fundos brancos... Roxo e suas graduações, não utilize" + "nada de texto em branco" | ✅ APROVADO e implementado — tokens centralizados trocados (ai-primary #1D4ED8 azul-700, ai-secondary #15803D verde-700, ai-accent #EAB308 amarelo-500); text-white eliminado (→ text-slate-900); gradientes roxo/rosa/laranja → amarelo/verde/azul; portal.css (--ai-gradient, nav-item, ai-tag, sombras) migrado. Contraste verificado: azul-700 no branco 6,70:1; verde-900 no branco 9,11:1; preto no amarelo-300 15,93:1 — AA/AAA WCAG 2.1 |
| 4 | 05/11/2026 | "Drop-down para a busca... direcionando e retornando o usuário para ambientes mais clean" | ⏳ ANALISADO, não aprovado ainda — mockup criado; viável (índice estático + filtro client-side + ARIA); aguarda decisão |
| 5 | 05/11/2026 | "Ativar os menus com os links para as páginas ou assuntos, assim como colocar um link no logo para a página principal" | ✅ APROVADO e verificado — todos os itens de menu já apontam para rotas reais (/, /beneficios, /beneficios-ocultos, /beneficios/enem-2026, /direitos-professores, /direitos-estudantes, /galeria, /tutoriais, /showcase) e o logo já é link para / (evidência: grep sem href="#" e rotas existentes no bundle) |
| 6 | 05/11/2026 | "Links úteis como Brasil Escola entre outros sites de conteúdo... não tenho intenção de criar conteúdo, o que falta é um local onde se possa encontrar essas referências" | 🟡 Parcial — estrutura criada (/direitos-estudantes); novos links entram só após verificação na fonte oficial |

## 📥 Sugestões externas (Gemini, 05/11/2026) — registrado, sem decisão

| # | Sugestão | Status |
|---|----------|--------|
| 7 | Filtro por elegibilidade (match de benefícios por perfil) | ✅ Implementado em /beneficios-ocultos (05/11) |
| 8 | Selo de nível de burocracia | ✅ Implementado em /beneficios-ocultos (05/11) |
| 9 | Indicador visual de idade da verificação | ✅ Implementado em /beneficios-ocultos (05/11) |
| 10 | Fórum / área de comentários | Registrado — exige moderação + LGPD; análise pendente |
| 11 | Vagas e estágios em TI | Registrado — coberto em parte pelo card CIEE (/direitos-estudantes) |
| 12 | Modelos de requerimento para professores | Registrado — exige revisão jurídica antes de distribuir |
| 13 | Newsletter de atualizações | Registrado — exige infra de cadastro + política de privacidade |
| 14 | Canal WhatsApp/Telegram de alertas | Registrado — mesma dependência da #13 |

## ✅ Fatos verificados (05/11/2026)

- **CIEE**: https://www.ciee.org.br/ — ONG brasileira, "Tudo 100% gratuito!", conecta jovens/estudantes a empresas; programas: Jovem Aprendiz, Estágio, Aprendiz, Processos Públicos, Soluções Especiais, PCD; seção Instituições de Ensino.
- **ENEM 2026**: página oficial do INEP confirma provas em 8 e 15 de novembro de 2026; datas de inscrição não mencionadas na fonte (terceiros divergem → não publicar).
- **Contraste WCAG 2.1 (calculado)**: preto/amarelo-300 15,93:1 · verde-900/amarelo-300 6,91:1 · verde-900/branco 9,11:1 · verde-800/branco 7,13:1 · azul-700/branco 6,70:1 · azul-900/branco 10,36:1. Primária antiga (#6366F1) no branco: 4,47:1 (reprovava AA) — motivo técnico adicional da troca.

---
*Próxima revisão do backlog: a cada rodada, com o Silvio.*
