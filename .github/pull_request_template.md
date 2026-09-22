## 📋 Descrição da Alteração
<!-- Descreva de forma concisa o que este PR altera, adiciona ou corrige. -->

## 🤖 Rastreabilidade e Governança do Autor (ISO/IEC 42001 & ISO/IEC 5338)
- **Tipo de Autor:** [ ] Humano | [ ] Agente IA
- **Agente / Modelo Executor (se aplicável):** <!-- Ex: Antigravity IDE (Gemini 1.5 Pro / Claude 3.5 Sonnet / etc) -->
- **ID da Conversa / Sessão (se aplicável):** <!-- Ex: conversation_id -->
- **Justificativa da Mudança:** <!-- Por que esta alteração foi realizada? -->

---

## 🛠️ Checklist de Qualidade e Conformidade (ISO/IEC 25010)
- [ ] `npm ci` executado e sem conflitos de dependências
- [ ] `npm run typecheck` passou sem erros de tipagem
- [ ] `npm run lint` passou sem erros
- [ ] `npm run build` gerou os pacotes de produção sem falhas de SSR
- [ ] Novas strings traduzidas em `pt-BR` e `en-US` em `src/contexts/LanguageContext.tsx`
- [ ] Cores e estilos respeitam o design system oficial em `AGENTS.md`

---

## 🔒 Checklist de Segurança da Informação (ISO/IEC 27001)
- [ ] Nenhuma credencial, token ou chave privada incluída no código
- [ ] Variáveis sensíveis configuradas apenas via Vercel Environment Variables
- [ ] Nenhum arquivo fora do workspace afetado
