---
trigger: always_on
description: O MCP graphify da IDE serve o grafo geral. O projeto corrente consulta-se no CLI.
---

## graphify

- O MCP `graphify` da Antigravity serve `C:/Users/Windows/.graphify/global-graph.json`. E o grafo geral, nao o repositorio aberto. Confirma com `graph_stats` e usa a tag do projeto.
- Para o projeto corrente, corre `graphify query "<pergunta>" --graph graphify-out/graph.json`.
- Nao cries outro servidor MCP graphify neste workspace. O mesmo nome no JSON global duplica o processo.
- Se `git status --short` mostrar codigo por commitar, corre `graphify update .` mesmo que `built_at_commit` seja igual ao HEAD.
- Depois de editar codigo na sessao, corre `graphify update .` (AST, sem LLM). No fim da sessao, `graphify global add --as <tag>` se o MCP geral precisar de ver este repo.
- `graphify check-update .` e CLI e so quando existir `graphify-out/needs_update`. Nao e tool MCP.
- Nunca apagues `graphify-out`.
