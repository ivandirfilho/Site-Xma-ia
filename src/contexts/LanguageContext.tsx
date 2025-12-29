'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'pt-BR' | 'en-US';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    'pt-BR': {
        // Header
        'nav.technology': 'Tecnologia',
        'nav.solutions': 'Soluções',
        'nav.about': 'Sobre',
        'nav.login': 'Entrar',
        'nav.language': 'Idioma',

        // Hero
        'hero.badge': 'Neural Edge Industrial',
        'hero.title.part1': 'A Digitalização Foi Apenas o Começo.',
        'hero.title.part2': 'Bem-vindo à Cognição Industrial.',
        'hero.subtitle': 'A primeira plataforma AI-Native que funde Engenharia, Telemetria e Inteligência Contratual. Saia dos dashboards passivos e entre na era da decisão autônoma.',
        'hero.cta.demo': 'Solicitar Acesso (Demo)',
        'hero.cta.video': 'Ver Tecnologia AI Native Cognitive',

        // Stats
        'stats.predictions': 'Predições Processadas',
        'stats.accuracy': 'Acurácia Preditiva',
        'stats.savings': 'Economia Gerada',
        'stats.uptime': 'Uptime Médio',

        // Features
        'features.badge': 'Diferenciais Técnicos',
        'features.title': 'Tecnologia de Ponta para',
        'features.title.highlight': 'Decisões Autônomas',
        'features.subtitle': 'Nossa stack combina física avançada, processamento de sinais e compliance automatizado.',

        // Bento Grid Items
        'feature.validation.category': 'Validação',
        'feature.validation.title': 'Validação Física da Manutenção',
        'feature.validation.desc': 'O técnico disse que fez, mas a máquina concorda? Cruzamos o input humano com a telemetria para garantir que a manutenção foi eficaz, não apenas burocrática.',

        'feature.audit.category': 'Auditoria',
        'feature.audit.title': 'Auditoria Cruzada (Cognitive Data)',
        'feature.audit.desc': 'Os nossos agentes leem os seus contratos e comparam com os lançamentos no SAP em tempo real. Encontramos inconsistências financeiras que humanos deixariam passar.',

        'feature.legal.category': 'Legal',
        'feature.legal.title': 'Compliance Nativo',
        'feature.legal.desc': 'Cruzamento automático de falhas técnicas com SLAs contratuais e garantias de fornecedores.',

        'feature.neural.title': 'Neural Edge Computing',
        'feature.neural.desc': 'Processamento de IA diretamente no chão de fábrica. Latência < 10ms para decisões críticas. Funciona offline.',

        'feature.jerk.title': 'Jerk Analysis Proprietário',
        'feature.jerk.desc': 'Análise da derivada da aceleração para detectar anomalias 72h antes de concorrentes baseados em vibração.',

        'feature.kalman.title': 'Kalman Adaptativo',
        'feature.kalman.desc': 'Filtros que aprendem em tempo real com baseline individual de cada máquina. Sem falsos positivos.',

        // Live Insights
        'insights.badge': 'SISTEMA VIVO',
        'insights.title': 'Cognição em Tempo Real sobre',
        'insights.title.highlight': 'Dados SAP',
        'insights.subtitle': 'Veja como evoluímos a inteligência do que já está digitalizado. Cada insight é gerado automaticamente pela fusão de telemetria + ERP.',
        'insights.terminal.header': 'xma.ia neural-edge-v2.4.1 — Live Feed',
        'insights.connected': 'Conectado ao SAP',
        'insights.processing': 'Processando próximo insight...',

        // Insights Data Items (Simplified for demo)
        'insight.stock.title': '⚠️ Estoque Crítico - Rolamento SKF 6205',
        'insight.stock.desc': 'Apenas 2 unidades em estoque. Consumo médio SAP: 4 un/mês. Lead time do fornecedor: 18 dias. Risco de ruptura em 15 dias se não comprar agora.',
        'insight.stock.value': 'Pedido sugerido: 12 unidades',

        'insight.vendor.title': '📊 Comparativo de Fornecedores',
        'insight.vendor.desc': 'Análise automática: "Rolamentos Brasil" entrega 23% mais rápido que "MecParts". Custo 8% maior, mas economia de 12 dias em lead time. Histórico de 98% de entregas no prazo.',
        'insight.vendor.value': 'Economia potencial em paradas: R$ 45.000/mês',

        'insight.demand.title': '📦 Previsão de Consumo Sazonal',
        'insight.demand.desc': 'Baseado em histórico + paradas programadas de dezembro: Correias transportadoras vão zerar em 21 dias. Aumento de 67% na demanda esperado.',
        'insight.demand.value': 'Pedido sugerido: 45 correias A-68',

        'insight.conflict.title': '🔧 Conflito de Alocação Detectado',
        'insight.conflict.desc': '3 ordens de manutenção agendadas para 14h no setor Caldeiras. Técnico Carlos já alocado em 2 OS simultâneas. Recurso disponível: Técnico Ricardo (livre às 15h).',
        'insight.conflict.value': 'Clique para rebalancear automaticamente',

        'insight.backlog.title': '📈 Backlog Crescente - Atenção!',
        'insight.backlog.desc': 'Backlog de manutenção cresceu 34% este mês. 47 ordens atrasadas. Causas identificadas: Falta de peças (67%), Mão de obra insuficiente (23%), Priorização incorreta (10%).',
        'insight.backlog.value': 'Impacto: R$ 180.000 em risco de parada',

        'insight.prevented.title': '✅ Modelo Acertou - Falha Evitada',
        'insight.prevented.desc': 'Compressor C-03: falha prevista há 12 dias foi confirmada na inspeção preventiva. Substituição do selo realizada. Parada não-programada de 16h evitada.',
        'insight.prevented.value': 'Economia confirmada: R$ 288.000',

        // Stats
        'insights.stats.orders': 'Ordens SAP Analisadas',
        'insights.stats.predictions': 'Acerto Preditivo',
        'insights.stats.savings': 'Economia Gerada',
        'insights.stats.trend.orders': '+342 hoje',
        'insights.stats.trend.accuracy': 'acurácia',
        'insights.stats.trend.savings': 'últimos 30 dias',

        // Footer
        'footer.partners': 'Tecnologia & Parceiros',
        'footer.mendix.role': 'Siemens ISV Partner',
        'footer.nvidia.role': 'Accelerated Computing',
        'footer.big4.title': 'Global Big 4',
        'footer.big4.role': 'Audit Compatible',
        'footer.tagline': 'Manutenção Autônoma AI-Native',
        'footer.rights': 'Todos os direitos reservados.',

        // Login
        'login.welcome': 'Bem-vindo de volta',
        'login.subtitle': 'Acesse o portal de Cognição Industrial',
        'login.email': 'E-mail corporativo',
        'login.password': 'Senha',
        'login.remember': 'Lembrar-me',
        'login.forgot': 'Esqueci a senha',
        'login.submit': 'Entrar',
        'login.or': 'ou continue com',
        'login.google': 'Google Workspace',
        'login.noaccount': 'Não tem uma conta?',
        'login.request': 'Solicitar acesso',

        // Cognitive Alerts
        'alert.stock': 'ALERTA DE ESTOQUE',
        'alert.supplier': 'INSIGHT DE FORNECEDOR',
        'alert.consumption': 'PREDIÇÃO DE CONSUMO',
        'alert.conflict': 'CONFLITO DE PLANEJAMENTO',
        'alert.backlog': 'INSIGHT DE BACKLOG',
        'alert.risk': 'RISCO DE PARADA',
        'alert.chain': 'CADEIA CRÍTICA',
        'alert.correlation': 'CORRELAÇÃO SAP',
        'alert.warranty': 'GARANTIA EXPIRANDO',
        'alert.cost': 'OTIMIZAÇÃO DE CUSTO',
        'alert.pattern': 'PADRÃO DETECTADO',
        'alert.sla': 'SLA CONTRATUAL',
        'alert.yes': 'Sim, fazer isso',
        'alert.no': 'Agora não',
        'alert.accepted': 'Ação registrada! Abrindo painel...',
        'alert.dismissed': 'Entendido. Continuaremos monitorando.',

        // Dashboard
        'dashboard.title': 'Centro de Controle Cognitivo',
        'dashboard.subtitle': 'XMA.IA Neural Dashboard • Sessão Ativa',
        'dashboard.connected': 'CONECTADO AO SAP',
        'dashboard.erp': 'ERP INTEGRITY ANOMALY',
        'dashboard.audit': 'AUDITORIA DE EXECUÇÃO',
        'dashboard.planning': 'EVOLUÇÃO DO PLANEJAMENTO',
        'dashboard.stock': 'ANÁLISE DE ESTOQUE',
        'dashboard.suppliers': 'RANKING FORNECEDORES',
        'dashboard.actions': 'AÇÕES RÁPIDAS',
        'dashboard.action.order': '📦 Gerar Pedido de Compra',
        'dashboard.action.maintenance': '🔧 Criar Ordem de Manutenção',
        'dashboard.action.report': '📊 Exportar Relatório',
        'dashboard.action.notify': '📧 Notificar Equipe',

        // Cognitive Alert Component
        'cognitive.accessing': 'Acessando Cognição...',
        'cognitive.live': 'LIVE',

        // Notification 1 - Stock Alert
        'notif.1.title': 'ALERTA DE ESTOQUE',
        'notif.1.message': '⚠️ Rolamento SKF 6205-2RS com estoque crítico (2 un). Histórico SAP indica consumo de 4 un/mês. Risco de ruptura em 15 dias.',
        'notif.1.action': 'Gerar pedido de compra automático?',

        // Notification 2 - Supplier Insight
        'notif.2.title': 'INSIGHT DE FORNECEDOR',
        'notif.2.message': '📊 Análise de 847 ordens: Fornecedor "Rolamentos Brasil" entrega 23% mais rápido que "MecParts". Preço 8% maior, mas lead time 12 dias menor.',
        'notif.2.action': 'Ver comparativo completo de fornecedores?',

        // Notification 3 - Consumption Prediction
        'notif.3.title': 'PREDIÇÃO DE CONSUMO',
        'notif.3.message': '📦 Baseado em sazonalidade + paradas programadas: Estoque de correias vai zerar em 21 dias. Pedido sugerido: 45 unidades.',
        'notif.3.action': 'Aprovar sugestão de compra?',

        // Notification 4 - Planning Conflict
        'notif.4.title': 'CONFLITO DE PLANEJAMENTO',
        'notif.4.message': '🔧 3 ordens de manutenção agendadas para mesmo horário no setor Caldeiras. Técnico João já alocado em 2 OS simultâneas.',
        'notif.4.action': 'Rebalancear agenda automaticamente?',

        // Notification 5 - Backlog Insight
        'notif.5.title': 'INSIGHT DE BACKLOG',
        'notif.5.message': '📈 Backlog de manutenção cresceu 34% este mês. 47 ordens atrasadas. Principal gargalo: falta de peças (67%) e mão de obra (33%).',
        'notif.5.action': 'Analisar causas raiz do backlog?',

        // Notification 6 - Stop Risk
        'notif.6.title': 'RISCO DE PARADA',
        'notif.6.message': '🚨 Compressor C-07: vibrações + temperatura elevada. Modelo prevê falha em 72h com 94% de confiança. Custo da parada: R$ 180.000/dia.',
        'notif.6.action': 'Criar ordem de manutenção urgente?',

        // Notification 7 - Critical Chain
        'notif.7.title': 'CADEIA CRÍTICA',
        'notif.7.message': '🚛 Peça importada (Selo Mecânico Burgmann) com lead time de 45 dias. 3 equipamentos dependem. Alternativa nacional disponível.',
        'notif.7.action': 'Ver fornecedores alternativos?',

        // Notification 8 - SAP Correlation
        'notif.8.title': 'CORRELAÇÃO SAP',
        'notif.8.message': '🔗 Detectado: Quando Bomba P-201 falha, Trocador T-05 falha em 72h (89% dos casos). SAP não correlaciona. Manutenção conjunta recomendada.',
        'notif.8.action': 'Criar plano de manutenção integrado?',

        // Notification 9 - Warranty Expiring
        'notif.9.title': 'GARANTIA EXPIRANDO',
        'notif.9.message': '⏰ Motor WEG W22 (R$ 47.000) com garantia até 28/12. SAP registra 3 anomalias não reportadas ao fabricante. Perda potencial de cobertura.',
        'notif.9.action': 'Abrir chamado de garantia agora?',

        // Notification 10 - Cost Optimization
        'notif.10.title': 'OTIMIZAÇÃO DE CUSTO',
        'notif.10.message': '💰 Análise de 18 meses: Manter Redutor R-12 custa R$ 8.400/mês. Substituir por novo: payback em 7 meses. Economia anual: R$ 52.000.',
        'notif.10.action': 'Gerar business case para substituição?',

        // Notification 11 - Pattern Detected
        'notif.11.title': 'PADRÃO DETECTADO',
        'notif.11.message': '🔍 Turno da noite tem 43% mais falhas que turno do dia. Correlação: operadores do noturno pulam checklist de partida (confirmado via IoT).',
        'notif.11.action': 'Enviar alerta para supervisão?',

        // Notification 12 - SLA Contract
        'notif.12.title': 'SLA CONTRATUAL',
        'notif.12.message': '📋 Contrato com AMBEV exige 98% de disponibilidade. Atual: 96.2%. Risco de multa: R$ 320.000. Principais vilões: Linha 3 e Caldeira 2.',
        'notif.12.action': 'Ver plano de ação sugerido?',

        // Dashboard Content
        'dash.erp.title': 'ERP INTEGRITY ANOMALY',
        'dash.erp.sapEntry': 'SAP ECC6 ENTRY',
        'dash.erp.material': 'Material: Rolamento SKF',
        'dash.erp.contract': 'CONTRATO CLÁUSULA 4.2',
        'dash.erp.limit': 'Limite Aprovado',
        'dash.erp.inconsistency': '⚠️ Inconsistência Detectada: Valor excede limite contratual em 12%',
        'dash.erp.notify': 'Notificar Compras',

        'dash.audit.title': 'AUDITORIA DE EXECUÇÃO',
        'dash.audit.completed': 'CONCLUÍDA',
        'dash.audit.technician': 'Técnico: Carlos Silva',
        'dash.audit.task': 'Troca de Rolamento - Bomba P-201',
        'dash.audit.sensor': 'SENSOR DE TORQUE - TEMPO REAL',
        'dash.audit.insight': '🔍 Insight: Assinatura de torque não reconhecida. Possível execução imprópria no Rolamento #4',
        'dash.audit.open': 'Abrir Auditoria',

        'dash.planning.title': 'EVOLUÇÃO DO PLANEJAMENTO',
        'dash.planning.availability': 'Q4 2024 - DISPONIBILIDADE',
        'dash.planning.original': 'Plano Original',
        'dash.planning.optimized': 'Plano Otimizado IA',
        'dash.planning.current': 'ATUAL',
        'dash.planning.projected': 'PROJETADO',
        'dash.planning.apply': 'Aplicar Otimização: +15% Disponibilidade',

        'dash.stock.title': 'ANÁLISE DE ESTOQUE',
        'dash.stock.bearing': 'Rolamento SKF 6205',
        'dash.stock.criticalUnits': '2 un (Crítico)',
        'dash.stock.belt': 'Correia A-68',
        'dash.stock.lowUnits': '8 un (Baixo)',
        'dash.stock.seal': 'Selo Mecânico',
        'dash.stock.okUnits': '24 un (OK)',

        'dash.suppliers.title': 'RANKING FORNECEDORES',

        'dash.actions.title': 'AÇÕES RÁPIDAS',
    },
    'en-US': {
        // Header
        'nav.technology': 'Technology',
        'nav.solutions': 'Solutions',
        'nav.about': 'About',
        'nav.login': 'Sign In',
        'nav.language': 'Language',

        // Hero
        'hero.badge': 'Neural Edge Industrial',
        'hero.title.part1': 'Digitalization was Just the Beginning.',
        'hero.title.part2': 'Welcome to Industrial Cognition.',
        'hero.subtitle': 'The first AI-Native platform that merges Engineering, Telemetry, and Contract Intelligence. Leave passive dashboards behind and enter the era of autonomous decision-making.',
        'hero.cta.demo': 'Request Access (Demo)',
        'hero.cta.video': 'See AI Native Cognitive Tech',

        // Stats
        'stats.predictions': 'Predictions Processed',
        'stats.accuracy': 'Predictive Accuracy',
        'stats.savings': 'Generated Savings',
        'stats.uptime': 'Average Uptime',

        // Features
        'features.badge': 'Technical Differentiators',
        'features.title': 'Cutting-Edge Technology for',
        'features.title.highlight': 'Autonomous Decisions',
        'features.subtitle': 'Our stack combines advanced physics, signal processing, and automated compliance.',

        // Bento Grid Items
        'feature.validation.category': 'Validation',
        'feature.validation.title': 'Physical Maintenance Validation',
        'feature.validation.desc': 'The technician said it was done, but does the machine agree? We cross-reference human input with telemetry to ensure maintenance was effective, not just bureaucratic.',

        'feature.audit.category': 'Audit',
        'feature.audit.title': 'Cross-Audit (Cognitive Data)',
        'feature.audit.desc': 'Our agents read your contracts and compare them with SAP entries in real-time. We find financial inconsistencies that humans would miss.',

        'feature.legal.category': 'Legal',
        'feature.legal.title': 'Native Compliance',
        'feature.legal.desc': 'Automatic cross-referencing of technical failures with contractual SLAs and supplier warranties.',

        'feature.neural.title': 'Neural Edge Computing',
        'feature.neural.desc': 'AI processing directly on the factory floor. Latency < 10ms for critical decisions. Works offline.',

        'feature.jerk.title': 'Proprietary Jerk Analysis',
        'feature.jerk.desc': 'Acceleration derivative analysis to detect anomalies 72h before vibration-based competitors.',

        'feature.kalman.title': 'Adaptive Kalman',
        'feature.kalman.desc': 'Filters that learn in real-time with individual baseline for each machine. No false positives.',

        // Live Insights
        'insights.badge': 'LIVE SYSTEM',
        'insights.title': 'Real-Time Cognition on',
        'insights.title.highlight': 'SAP Data',
        'insights.subtitle': 'See how we evolve the intelligence of what\'s already digitized. Each insight is generated automatically by telemetry + ERP fusion.',
        'insights.terminal.header': 'xma.ia neural-edge-v2.4.1 — Live Feed',
        'insights.connected': 'Connected to SAP',
        'insights.processing': 'Processing next insight...',

        // Insights Data Items
        'insight.stock.title': '⚠️ Critical Stock - bearing SKF 6205',
        'insight.stock.desc': 'Only 2 units in stock. Avg consumption SAP: 4 units/mo. Supplier lead time: 18 days. Rupture risk in 15 days if not purchased now.',
        'insight.stock.value': 'Suggested order: 12 units',

        'insight.vendor.title': '📊 Supplier Comparison',
        'insight.vendor.desc': 'Auto analysis: "Rolamentos Brasil" delivers 23% faster than "MecParts". Cost 8% higher, but saves 12 days lead time. 98% on-time delivery history.',
        'insight.vendor.value': 'Potential savings in downtime: $45,000/mo',

        'insight.demand.title': '📦 Seasonal Consumption Forecast',
        'insight.demand.desc': 'Based on history + scheduled December shutdowns: Conveyor belts will zero out in 21 days. 67% demand increase expected.',
        'insight.demand.value': 'Suggested order: 45 belts A-68',

        'insight.conflict.title': '🔧 Allocation Conflict Detected',
        'insight.conflict.desc': '3 maintenance orders scheduled for 2pm in Boilers sector. Technician Carlos already allocated to 2 simultaneous WOs. Available resource: Technician Ricardo (free at 3pm).',
        'insight.conflict.value': 'Click to auto-rebalance',

        'insight.backlog.title': '📈 Growing Backlog - Attention!',
        'insight.backlog.desc': 'Maintenance backlog grew 34% this month. 47 delayed orders. Identified causes: Lack of parts (67%), Insufficient labor (23%), Incorrect prioritization (10%).',
        'insight.backlog.value': 'Impact: $180,000 downtime risk',

        'insight.prevented.title': '✅ Model Correct - Failure Prevented',
        'insight.prevented.desc': 'Compressor C-03: failure predicted 12 days ago confirmed in preventive inspection. Seal replacement performed. 16h unscheduled downtime avoided.',
        'insight.prevented.value': 'Confirmed savings: $288,000',

        // Stats
        'insights.stats.orders': 'SAP Orders Analyzed',
        'insights.stats.predictions': 'Predictive Accuracy',
        'insights.stats.savings': 'Generated Savings',
        'insights.stats.trend.orders': '+342 today',
        'insights.stats.trend.accuracy': 'accuracy',
        'insights.stats.trend.savings': 'last 30 days',

        // Footer
        'footer.partners': 'Technology & Partners',
        'footer.mendix.role': 'Siemens ISV Partner',
        'footer.nvidia.role': 'Accelerated Computing',
        'footer.big4.title': 'Global Big 4',
        'footer.big4.role': 'Audit Compatible',
        'footer.rights': 'All rights reserved.',
        'footer.tagline': 'AI-Native Autonomous Maintenance',

        // Login
        'login.welcome': 'Welcome back',
        'login.subtitle': 'Access the Industrial Cognition portal',
        'login.email': 'Corporate email',
        'login.password': 'Password',
        'login.remember': 'Remember me',
        'login.forgot': 'Forgot password',
        'login.submit': 'Sign In',
        'login.or': 'or continue with',
        'login.google': 'Google Workspace',
        'login.noaccount': 'Don\'t have an account?',
        'login.request': 'Request access',

        // Cognitive Alerts
        'alert.stock': 'STOCK ALERT',
        'alert.supplier': 'SUPPLIER INSIGHT',
        'alert.consumption': 'CONSUMPTION PREDICTION',
        'alert.conflict': 'PLANNING CONFLICT',
        'alert.backlog': 'BACKLOG INSIGHT',
        'alert.risk': 'DOWNTIME RISK',
        'alert.chain': 'CRITICAL CHAIN',
        'alert.correlation': 'SAP CORRELATION',
        'alert.warranty': 'WARRANTY EXPIRING',
        'alert.cost': 'COST OPTIMIZATION',
        'alert.pattern': 'PATTERN DETECTED',
        'alert.sla': 'SLA CONTRACT',
        'alert.yes': 'Yes, do it',
        'alert.no': 'Not now',
        'alert.accepted': 'Action registered! Opening panel...',
        'alert.dismissed': 'Got it. We\'ll keep monitoring.',

        // Dashboard
        'dashboard.title': 'Cognitive Control Center',
        'dashboard.subtitle': 'XMA.IA Neural Dashboard • Active Session',
        'dashboard.connected': 'CONNECTED TO SAP',
        'dashboard.erp': 'ERP INTEGRITY ANOMALY',
        'dashboard.audit': 'EXECUTION AUDIT',
        'dashboard.planning': 'PLANNING EVOLUTION',
        'dashboard.stock': 'STOCK ANALYSIS',
        'dashboard.suppliers': 'SUPPLIER RANKING',
        'dashboard.actions': 'QUICK ACTIONS',
        'dashboard.action.order': '📦 Generate Purchase Order',
        'dashboard.action.maintenance': '🔧 Create Maintenance Order',
        'dashboard.action.report': '📊 Export Report',
        'dashboard.action.notify': '📧 Notify Team',

        // Cognitive Alert Component
        'cognitive.accessing': 'Accessing Cognition...',
        'cognitive.live': 'LIVE',

        // Notification 1 - Stock Alert
        'notif.1.title': 'STOCK ALERT',
        'notif.1.message': '⚠️ SKF 6205-2RS bearing with critical stock (2 units). SAP history indicates consumption of 4 units/month. Stockout risk in 15 days.',
        'notif.1.action': 'Generate automatic purchase order?',

        // Notification 2 - Supplier Insight
        'notif.2.title': 'SUPPLIER INSIGHT',
        'notif.2.message': '📊 Analysis of 847 orders: "Rolamentos Brasil" delivers 23% faster than "MecParts". Price 8% higher, but lead time 12 days shorter.',
        'notif.2.action': 'View full supplier comparison?',

        // Notification 3 - Consumption Prediction
        'notif.3.title': 'CONSUMPTION PREDICTION',
        'notif.3.message': '📦 Based on seasonality + scheduled stops: Belt stock will zero in 21 days. Suggested order: 45 units.',
        'notif.3.action': 'Approve purchase suggestion?',

        // Notification 4 - Planning Conflict
        'notif.4.title': 'PLANNING CONFLICT',
        'notif.4.message': '🔧 3 maintenance orders scheduled for same time in Boilers sector. Technician João already allocated to 2 simultaneous WOs.',
        'notif.4.action': 'Automatically rebalance schedule?',

        // Notification 5 - Backlog Insight
        'notif.5.title': 'BACKLOG INSIGHT',
        'notif.5.message': '📈 Maintenance backlog grew 34% this month. 47 delayed orders. Main bottleneck: lack of parts (67%) and labor (33%).',
        'notif.5.action': 'Analyze root causes?',

        // Notification 6 - Stop Risk
        'notif.6.title': 'DOWNTIME RISK',
        'notif.6.message': '🚨 Compressor C-07: vibrations + elevated temperature. Model predicts failure in 72h with 94% confidence. Downtime cost: $180,000/day.',
        'notif.6.action': 'Create urgent maintenance order?',

        // Notification 7 - Critical Chain
        'notif.7.title': 'CRITICAL CHAIN',
        'notif.7.message': '🚛 Imported part (Burgmann Mechanical Seal) with 45-day lead time. 3 machines depend on it. National alternative available.',
        'notif.7.action': 'View alternative suppliers?',

        // Notification 8 - SAP Correlation
        'notif.8.title': 'SAP CORRELATION',
        'notif.8.message': '🔗 Detected: When Pump P-201 fails, Exchanger T-05 fails within 72h (89% of cases). SAP doesn\'t correlate. Joint maintenance recommended.',
        'notif.8.action': 'Create integrated maintenance plan?',

        // Notification 9 - Warranty Expiring
        'notif.9.title': 'WARRANTY EXPIRING',
        'notif.9.message': '⏰ WEG W22 Motor ($47,000) with warranty until 12/28. SAP records 3 unreported anomalies to manufacturer. Potential coverage loss.',
        'notif.9.action': 'Open warranty claim now?',

        // Notification 10 - Cost Optimization
        'notif.10.title': 'COST OPTIMIZATION',
        'notif.10.message': '💰 18-month analysis: Maintaining R-12 Reducer costs $8,400/month. Replacing with new: payback in 7 months. Annual savings: $52,000.',
        'notif.10.action': 'Generate replacement business case?',

        // Notification 11 - Pattern Detected
        'notif.11.title': 'PATTERN DETECTED',
        'notif.11.message': '🔍 Night shift has 43% more failures than day shift. Correlation: night operators skip startup checklist (confirmed via IoT).',
        'notif.11.action': 'Send alert to supervision?',

        // Notification 12 - SLA Contract
        'notif.12.title': 'SLA CONTRACT',
        'notif.12.message': '📋 Contract with AMBEV requires 98% availability. Current: 96.2%. Penalty risk: $320,000. Main culprits: Line 3 and Boiler 2.',
        'notif.12.action': 'View suggested action plan?',

        // Dashboard Content
        'dash.erp.title': 'ERP INTEGRITY ANOMALY',
        'dash.erp.sapEntry': 'SAP ECC6 ENTRY',
        'dash.erp.material': 'Material: SKF Bearing',
        'dash.erp.contract': 'CONTRACT CLAUSE 4.2',
        'dash.erp.limit': 'Approved Limit',
        'dash.erp.inconsistency': '⚠️ Inconsistency Detected: Value exceeds contractual limit by 12%',
        'dash.erp.notify': 'Notify Purchasing',

        'dash.audit.title': 'EXECUTION AUDIT',
        'dash.audit.completed': 'COMPLETED',
        'dash.audit.technician': 'Technician: Carlos Silva',
        'dash.audit.task': 'Bearing Replacement - Pump P-201',
        'dash.audit.sensor': 'TORQUE SENSOR - REAL TIME',
        'dash.audit.insight': '🔍 Insight: Torque signature not recognized. Possible improper execution on Bearing #4',
        'dash.audit.open': 'Open Audit',

        'dash.planning.title': 'PLANNING EVOLUTION',
        'dash.planning.availability': 'Q4 2024 - AVAILABILITY',
        'dash.planning.original': 'Original Plan',
        'dash.planning.optimized': 'AI Optimized Plan',
        'dash.planning.current': 'CURRENT',
        'dash.planning.projected': 'PROJECTED',
        'dash.planning.apply': 'Apply Optimization: +15% Availability',

        'dash.stock.title': 'STOCK ANALYSIS',
        'dash.stock.bearing': 'SKF 6205 Bearing',
        'dash.stock.criticalUnits': '2 units (Critical)',
        'dash.stock.belt': 'Belt A-68',
        'dash.stock.lowUnits': '8 units (Low)',
        'dash.stock.seal': 'Mechanical Seal',
        'dash.stock.okUnits': '24 units (OK)',

        'dash.suppliers.title': 'SUPPLIER RANKING',

        'dash.actions.title': 'QUICK ACTIONS',
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('pt-BR');

    useEffect(() => {
        const savedLang = localStorage.getItem('xmaia-language') as Language;
        if (savedLang && (savedLang === 'pt-BR' || savedLang === 'en-US')) {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('xmaia-language', lang);
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export default LanguageContext;
