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

        // Hero
        'hero.badge': 'Plataforma AI-Native para Manutenção Industrial',
        'hero.title1': 'Evolução Cognitiva',
        'hero.title2': 'para Manutenção',
        'hero.title3': 'Industrial',
        'hero.subtitle': 'Transformamos dados brutos de sensores industriais em decisões autônomas. Nossa IA não apenas prevê falhas — ela entende o contexto operacional e age em tempo real.',
        'hero.cta.demo': 'Agendar Demo',
        'hero.cta.video': 'Ver Tecnologia AI Native Cognitive',

        // Stats
        'stats.predictions': 'Predições Processadas',
        'stats.accuracy': 'Acurácia Preditiva',
        'stats.savings': 'Economia Gerada',
        'stats.uptime': 'Uptime Médio',

        // Features
        'features.badge': 'ARQUITETURA NEURAL ÚNICA',
        'features.title': 'Cognição Industrial,',
        'features.title2': 'Não Apenas Predição',
        'features.subtitle': 'Enquanto outros preveem falhas, nós as evitamos autonomamente.',

        'feature.neural.title': 'Neural Edge Computing',
        'feature.neural.desc': 'Processamento de IA diretamente no chão de fábrica. Latência < 10ms para decisões críticas. Funciona offline.',

        'feature.jerk.title': 'Jerk Analysis Proprietário',
        'feature.jerk.desc': 'Análise da derivada da aceleração para detectar anomalias 72h antes de concorrentes baseados em vibração.',

        'feature.kalman.title': 'Kalman Adaptativo',
        'feature.kalman.desc': 'Filtros que aprendem em tempo real com baseline individual de cada máquina. Sem falsos positivos.',

        // Live Insights
        'insights.badge': 'SISTEMA VIVO',
        'insights.title': 'Cognição em Tempo Real sobre',
        'insights.title2': 'Dados SAP',
        'insights.subtitle': 'Veja como evoluímos a inteligência do que já está digitalizado. Cada insight é gerado automaticamente pela fusão de telemetria + ERP.',
        'insights.connected': 'Conectado ao SAP',
        'insights.processing': 'Processando próximo insight...',
        'insights.stats.orders': 'Ordens SAP Analisadas',
        'insights.stats.predictions': 'Falhas Previstas',
        'insights.stats.accuracy': 'acurácia',
        'insights.stats.savings': 'Economia Gerada',
        'insights.stats.period': 'últimos 30 dias',
        'insights.stats.today': 'hoje',

        // Footer
        'footer.partners': 'Tecnologia & Parceiros',
        'footer.rights': 'Todos os direitos reservados.',
        'footer.tagline': 'Manutenção Autônoma AI-Native',

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
    },
    'en-US': {
        // Header
        'nav.technology': 'Technology',
        'nav.solutions': 'Solutions',
        'nav.about': 'About',
        'nav.login': 'Sign In',

        // Hero
        'hero.badge': 'AI-Native Platform for Industrial Maintenance',
        'hero.title1': 'Cognitive Evolution',
        'hero.title2': 'for Industrial',
        'hero.title3': 'Maintenance',
        'hero.subtitle': 'We transform raw industrial sensor data into autonomous decisions. Our AI doesn\'t just predict failures — it understands operational context and acts in real-time.',
        'hero.cta.demo': 'Schedule Demo',
        'hero.cta.video': 'See AI Native Cognitive Tech',

        // Stats
        'stats.predictions': 'Predictions Processed',
        'stats.accuracy': 'Predictive Accuracy',
        'stats.savings': 'Generated Savings',
        'stats.uptime': 'Average Uptime',

        // Features
        'features.badge': 'UNIQUE NEURAL ARCHITECTURE',
        'features.title': 'Industrial Cognition,',
        'features.title2': 'Not Just Prediction',
        'features.subtitle': 'While others predict failures, we autonomously prevent them.',

        'feature.neural.title': 'Neural Edge Computing',
        'feature.neural.desc': 'AI processing directly on the factory floor. Latency < 10ms for critical decisions. Works offline.',

        'feature.jerk.title': 'Proprietary Jerk Analysis',
        'feature.jerk.desc': 'Acceleration derivative analysis to detect anomalies 72h before vibration-based competitors.',

        'feature.kalman.title': 'Adaptive Kalman',
        'feature.kalman.desc': 'Filters that learn in real-time with individual baseline for each machine. No false positives.',

        // Live Insights
        'insights.badge': 'LIVE SYSTEM',
        'insights.title': 'Real-Time Cognition on',
        'insights.title2': 'SAP Data',
        'insights.subtitle': 'See how we evolve the intelligence of what\'s already digitized. Each insight is automatically generated by telemetry + ERP fusion.',
        'insights.connected': 'Connected to SAP',
        'insights.processing': 'Processing next insight...',
        'insights.stats.orders': 'SAP Orders Analyzed',
        'insights.stats.predictions': 'Failures Predicted',
        'insights.stats.accuracy': 'accuracy',
        'insights.stats.savings': 'Generated Savings',
        'insights.stats.period': 'last 30 days',
        'insights.stats.today': 'today',

        // Footer
        'footer.partners': 'Technology & Partners',
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
