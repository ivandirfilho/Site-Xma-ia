# 📸 Dados Extraídos das Screenshots — 2026-05-02

> **Fonte**: Capturas de tela do painel DNS e painel Vercel do projeto XMA.IA

---

## Screenshot 1 — Painel DNS do Domínio `xma-ia.com`

**Provedor DNS**: Google Domains (migrado para Squarespace Domains)
**Domínio**: `xma-ia.com`

### Registros DNS Personalizados

| Tipo | Nome | Prioridade | TTL | Dados |
|:-----|:-----|:-----------|:----|:------|
| A | `roleta` | N/D | 30 minutos | `187.45.181.75` |
| CNAME | `www` | N/D | 30 minutos | `cname.vercel-dns.com` |
| CNAME | `www.roleta` | N/D | 30 minutos | `roleta.xma-ia.com` |
| CNAME | `genesis` | N/D | 30 minutos | `zealous-grass-034a6ff0f1.azurestaticapps.net` |
| A | `www.host` | N/D | 4 horas | `187.45.181.118` |
| TXT | `google._domainkey` | N/D | 1 hora | `v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFA...` |
| A | `@` (raiz) | N/D | 30 minutos | `76.76.21.21` |
| A | `host` | N/D | 30 minutos | `187.45.181.118` |
| TXT | `@` (raiz) | N/D | 1 hora | `v=spf1 include:_spf.google.com ~all` |

### Análise dos Registros

- **Raiz (`@`)**: Aponta para Vercel (`76.76.21.21`) — site principal
- **`www`**: CNAME para Vercel (`cname.vercel-dns.com`) — alias do site principal
- **`roleta`**: Subdomínio apontando para IP `187.45.181.75` (servidor externo)
- **`www.roleta`**: Alias do subdomínio roleta
- **`genesis`**: Subdomínio apontando para Azure Static Web Apps
- **`host` / `www.host`**: Subdomínio apontando para IP `187.45.181.118`
- **DKIM + SPF**: E-mail corporativo configurado via Google Workspace

---

## Screenshot 2 — Painel Vercel do Projeto

### Informações do Deployment

| Campo | Valor |
|:------|:------|
| **Projeto** | `site-xma-ia` |
| **Deployment URL** | `site-xma-fisjfqxmh-ivandirs-projects.vercel.app` |
| **Domínios Vinculados** | `www.xma-ia.com` ↗ , `site-xma-ia.vercel.app` ↗ |
| **Status** | 🟢 Ready |
| **Data de Criação** | 29/12/2025 |
| **Criado por** | `ivandirfilho` |
| **Conta Vercel** | `ivandirs-projects` |
| **Branch Source** | `main` |
| **Último Commit** | `f7c560a` — "fix: add language switcher to mobile menu drawer" |

### Métricas de Saúde

| Métrica | Valor |
|:--------|:------|
| **Firewall** | ✅ Active — All systems normal (24h) |
| **Edge Requests (6h)** | 233 |
| **Function Invocations** | 0 |
| **Error Rate** | 0% |
| **Analytics Vercel** | ❌ Não habilitado (opção "Enable" disponível) |
| **Deployment Settings** | 3 recomendações pendentes |

### Observações

- O deploy é automático via push na branch `main`
- Preview deployments são gerados para cada commit
- Firewall ativa sem eventos recentes
- Analytics da Vercel pode ser habilitado com um clique
