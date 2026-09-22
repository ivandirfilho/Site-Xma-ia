# Guia de Engenharia e Operação para Agentes de IA & Desenvolvedores (AGENTS.md)

> **Padrão de Governança:** ISO/IEC 42001:2023 (Gestão de IA), ISO/IEC 5338:2023 (Ciclo de Vida de Software com IA), ISO/IEC 25010:2023 (Qualidade de Software) e ISO/IEC 27001:2022 (Segurança da Informação).  
> **Repositório:** `ivandirfilho/Site-Xma-ia`  
> **Domínio de Produção:** `https://www.xma-ia.com`  
> **Hospedagem:** Vercel Edge Network (`site-xma-ia.vercel.app`)

---

## 1. Visão Geral e Contexto do Projeto

O **Site XMA.IA** é a plataforma institucional da primeira solução AI-Native para Manutenção Autônoma Industrial e Cognição Neural Edge.  
O site é construído em Next.js com App Router, TypeScript, Ant Design e TailwindCSS, fornecendo suporte multilíngue (pt-BR e en-US) e visualizações interativas de telemetria.

---

## 2. Stack Tecnológica e Versões Oficiais

| Componente | Tecnologia / Versão | Função / Observação |
| :--- | :--- | :--- |
| **Framework** | Next.js `^16.1.1` (Turbopack) | App Router híbrido (Server e Client Components) |
| **Biblioteca UI** | React / React-DOM `^18.2.0` | Base de componentes |
| **Tipagem** | TypeScript `^5.3.3` | Tipagem estrita (`strict: true` em `tsconfig.json`) |
| **Design System** | Ant Design (`antd`) `^5.12.5` | Suportado por `@ant-design/icons` e `@ant-design/cssinjs` |
| **CSS Utilitário** | TailwindCSS `^3.4.0` | Estilização responsiva e grid layouts |
| **Linter** | ESLint `^9.39.5` (Flat Config) | Configurado em `eslint.config.mjs` com parser TS |

---

## 3. Comandos Padronizados do Ciclo de Vida

Todo agente ou desenvolvedor deve obrigatoriamente utilizar os comandos oficiais abaixo antes de submeter qualquer Pull Request:

```bash
# Instalação determinística de dependências (nunca altere o lockfile sem necessidade)
npm ci

# Verificação estática de tipos do TypeScript (obrigatório código de saída 0)
npm run typecheck

# Análise de conformidade e boas práticas do código
npm run lint

# Build de produção otimizado (validação de bundling e rotas estáticas)
npm run build

# Execução em ambiente de desenvolvimento local (porta 3000)
npm run dev
```

---

## 4. Diretrizes Arquiteturais e Padrões de Código

### A. Next.js App Router & SSR
* **Server Components por Padrão:** Páginas como `src/app/page.tsx` e `src/app/layout.tsx` são Server Components.
* **Client Components Explícitos:** Qualquer componente que use hooks do React (`useState`, `useEffect`, `useContext`) deve incluir a diretiva `'use client'` no topo do arquivo.
* **Ant Design CSS-in-JS no SSR:** Todo componente Ant Design deve ser renderizado dentro do wrapper `StyledComponentsRegistry` (`src/lib/AntdRegistry.tsx`) configurado no `layout.tsx` para evitar *Flash of Unstyled Content* (FOUC).

### B. Sistema de Design e Cores Oficiais
Nunca utilize cores arbitrárias fora da paleta corporativa XMAIA:

```css
--xmaia-primary:   #0066ff;  /* Azul industrial principal */
--xmaia-secondary: #00d4ff;  /* Ciano de destaque / telemetria */
--xmaia-neural:    #00ff88;  /* Verde neural de status operacional */
--xmaia-dark:      #0a0a0f;  /* Background escuro principal */
--xmaia-darker:    #050508;  /* Background de contraste elevado */
--xmaia-accent:    #6366f1;  /* Indigo accent / bordas */
```

### C. Internacionalização (i18n)
* As traduções de interface residem em `src/contexts/LanguageContext.tsx`.
* Ao adicionar novos textos ou telas, adicione obrigatoriamente as chaves nos dicionários `pt-BR` e `en-US`.
* Consuma as traduções através do hook `useLanguage()`.

---

## 5. Protocolo de Governança para Agentes (ISO 42001 & ISO 5338)

Quando um agente de IA estiver executando tarefas neste repositório, ele deve seguir os seguintes guardrails:

1. **Nunca realizar pushes diretos na branch `main`:** Todas as alterações devem ser originadas de branches `feature/<nome>` ou `fix/<nome>` e submetidas via Pull Request.
2. **Conventional Commits:** Os commits devem seguir o padrão:
   - `feat(escopo): descrição concisa`
   - `fix(escopo): correção concisa`
   - `chore(escopo): manutenção técnica`
3. **Validação Pré-Merge Obrigatória:** O agente só deve considerar sua tarefa concluída após verificar que:
   - `npm run typecheck` retornou 0 erros.
   - `npm run lint` retornou 0 erros.
   - `npm run build` gerou o bundle com sucesso.
   - O comando `graphify update .` foi executado para atualizar a topologia do grafo de dependências.

---

## 6. Segurança e Proteção de Segredos (ISO 27001)

* É estritamente proibido hardcodar senhas, chaves de API ou tokens de acesso em qualquer arquivo de código-fonte.
* Todas as variáveis sensíveis devem ser injetadas exclusivamente através das **Environment Variables** no dashboard da Vercel para os ambientes correspondentes (`Development`, `Preview`, `Production`).
* O repositório conta com varredura contínua de credenciais via Gitleaks no GitHub Actions.
