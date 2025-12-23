'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Button, Space } from 'antd';
import {
    ThunderboltOutlined,
    EyeOutlined,
    SyncOutlined,
    CheckOutlined,
    CloseOutlined,
    RightOutlined,
    BellOutlined
} from '@ant-design/icons';
import CognitiveDashboard from '@/components/CognitiveDashboard/CognitiveDashboard';

const { Text } = Typography;

interface CognitiveNotification {
    id: number;
    title: string;
    message: string;
    type: 'insight' | 'alert' | 'prediction';
    action?: string;
}

const notifications: CognitiveNotification[] = [
    // === ESTOQUE E PEÇAS ===
    {
        id: 1,
        type: 'alert',
        title: 'ALERTA DE ESTOQUE',
        message: '⚠️ Rolamento SKF 6205-2RS com estoque crítico (2 un). Histórico SAP indica consumo de 4 un/mês. Risco de ruptura em 15 dias.',
        action: 'Gerar pedido de compra automático?',
    },
    {
        id: 2,
        type: 'insight',
        title: 'INSIGHT DE FORNECEDOR',
        message: '📊 Análise de 847 ordens: Fornecedor "Rolamentos Brasil" entrega 23% mais rápido que "MecParts". Preço 8% maior, mas lead time 12 dias menor.',
        action: 'Ver comparativo completo de fornecedores?',
    },
    {
        id: 3,
        type: 'prediction',
        title: 'PREDIÇÃO DE CONSUMO',
        message: '📦 Baseado em sazonalidade + paradas programadas: Estoque de correias vai zerar em 21 dias. Pedido sugerido: 45 unidades.',
        action: 'Aprovar sugestão de compra?',
    },

    // === PLANEJAMENTO DE MANUTENÇÃO ===
    {
        id: 4,
        type: 'alert',
        title: 'CONFLITO DE PLANEJAMENTO',
        message: '🔧 3 ordens de manutenção agendadas para mesmo horário no setor Caldeiras. Técnico João já alocado em 2 OS simultâneas.',
        action: 'Rebalancear agenda automaticamente?',
    },
    {
        id: 5,
        type: 'insight',
        title: 'INSIGHT DE BACKLOG',
        message: '📈 Backlog de manutenção cresceu 34% este mês. 47 ordens atrasadas. Principal gargalo: falta de peças (67%) e mão de obra (33%).',
        action: 'Analisar causas raiz do backlog?',
    },
    {
        id: 6,
        type: 'prediction',
        title: 'RISCO DE PARADA',
        message: '🚨 Compressor C-07: vibrações + temperatura elevada. Modelo prevê falha em 72h com 94% de confiança. Custo da parada: R$ 180.000/dia.',
        action: 'Criar ordem de manutenção urgente?',
    },

    // === CADEIA DE SUPRIMENTOS ===
    {
        id: 7,
        type: 'alert',
        title: 'CADEIA CRÍTICA',
        message: '🚛 Peça importada (Selo Mecânico Burgmann) com lead time de 45 dias. 3 equipamentos dependem. Alternativa nacional disponível.',
        action: 'Ver fornecedores alternativos?',
    },
    {
        id: 8,
        type: 'insight',
        title: 'CORRELAÇÃO SAP',
        message: '🔗 Detectado: Quando Bomba P-201 falha, Trocador T-05 falha em 72h (89% dos casos). SAP não correlaciona. Manutenção conjunta recomendada.',
        action: 'Criar plano de manutenção integrado?',
    },

    // === DORES DE CABEÇA COMUNS ===
    {
        id: 9,
        type: 'alert',
        title: 'GARANTIA EXPIRANDO',
        message: '⏰ Motor WEG W22 (R$ 47.000) com garantia até 28/12. SAP registra 3 anomalias não reportadas ao fabricante. Perda potencial de cobertura.',
        action: 'Abrir chamado de garantia agora?',
    },
    {
        id: 10,
        type: 'prediction',
        title: 'OTIMIZAÇÃO DE CUSTO',
        message: '💰 Análise de 18 meses: Manter Redutor R-12 custa R$ 8.400/mês. Substituir por novo: payback em 7 meses. Economia anual: R$ 52.000.',
        action: 'Gerar business case para substituição?',
    },
    {
        id: 11,
        type: 'insight',
        title: 'PADRÃO DETECTADO',
        message: '🔍 Turno da noite tem 43% mais falhas que turno do dia. Correlação: operadores do noturno pulam checklist de partida (confirmado via IoT).',
        action: 'Enviar alerta para supervisão?',
    },
    {
        id: 12,
        type: 'alert',
        title: 'SLA CONTRATUAL',
        message: '📋 Contrato com AMBEV exige 98% de disponibilidade. Atual: 96.2%. Risco de multa: R$ 320.000. Principais vilões: Linha 3 e Caldeira 2.',
        action: 'Ver plano de ação sugerido?',
    },
];


const CognitiveAlert: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const [currentNotification, setCurrentNotification] = useState<CognitiveNotification | null>(null);
    const [showDomIndicator, setShowDomIndicator] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const [showFeedback, setShowFeedback] = useState<'accepted' | 'dismissed' | null>(null);
    const [showDashboard, setShowDashboard] = useState(false);

    const handleAccept = useCallback(() => {
        setUserInteracted(true);
        setShowFeedback('accepted');
        setTimeout(() => {
            setCurrentNotification(null);
            setIsActive(false);
            setShowFeedback(null);
            setUserInteracted(false);
            // Abrir o dashboard
            setShowDashboard(true);
        }, 1000);
    }, []);

    const handleDismiss = useCallback(() => {
        setUserInteracted(true);
        setShowFeedback('dismissed');
        setTimeout(() => {
            setCurrentNotification(null);
            setIsActive(false);
            setShowFeedback(null);
            setUserInteracted(false);
        }, 800);
    }, []);

    useEffect(() => {
        let notificationIndex = 0;
        let autoHideTimeout: NodeJS.Timeout;

        const triggerCognitiveEvent = () => {
            // Fase 1: Mostrar indicador "Acessando DOM"
            setShowDomIndicator(true);
            setIsActive(true);
            setUserInteracted(false);
            setShowFeedback(null);

            // Fase 2: Após 1.2s, mostrar a notificação
            setTimeout(() => {
                setShowDomIndicator(false);
                setCurrentNotification(notifications[notificationIndex]);
                notificationIndex = (notificationIndex + 1) % notifications.length;
            }, 1200);

            // Fase 3: Auto-hide após 12 segundos SE não houver interação
            autoHideTimeout = setTimeout(() => {
                if (!userInteracted) {
                    setCurrentNotification(null);
                    setIsActive(false);
                }
            }, 12000);
        };

        // Primeiro evento após 6 segundos
        const initialTimeout = setTimeout(triggerCognitiveEvent, 6000);

        // Eventos subsequentes a cada 20-30 segundos (aleatório)
        const interval = setInterval(() => {
            const randomDelay = Math.random() * 10000 + 20000; // 20-30 segundos
            setTimeout(triggerCognitiveEvent, randomDelay);
        }, 30000);

        return () => {
            clearTimeout(initialTimeout);
            clearTimeout(autoHideTimeout);
            clearInterval(interval);
        };
    }, [userInteracted]);

    const getTypeColor = (type: CognitiveNotification['type']) => {
        switch (type) {
            case 'insight':
                return '#00d4ff';
            case 'alert':
                return '#0066ff';
            case 'prediction':
                return '#00ff88';
        }
    };

    return (
        <>
            {/* Border Glow Effect - Mais intenso e duradouro */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none',
                    zIndex: 9998,
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                }}
            >
                {/* Top border */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, transparent, #0066ff, #00d4ff, #0066ff, transparent)',
                        boxShadow: '0 0 30px #0066ff, 0 0 60px #0066ff, 0 0 90px rgba(0, 102, 255, 0.5)',
                        animation: isActive ? 'borderPulse 1.5s ease-in-out infinite' : 'none',
                    }}
                />
                {/* Bottom border */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, transparent, #0066ff, #00d4ff, #0066ff, transparent)',
                        boxShadow: '0 0 30px #0066ff, 0 0 60px #0066ff, 0 0 90px rgba(0, 102, 255, 0.5)',
                        animation: isActive ? 'borderPulse 1.5s ease-in-out infinite' : 'none',
                    }}
                />
                {/* Left border */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: '4px',
                        background: 'linear-gradient(180deg, transparent, #0066ff, #00d4ff, #0066ff, transparent)',
                        boxShadow: '0 0 30px #0066ff, 0 0 60px #0066ff, 0 0 90px rgba(0, 102, 255, 0.5)',
                        animation: isActive ? 'borderPulse 1.5s ease-in-out infinite' : 'none',
                    }}
                />
                {/* Right border */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: '4px',
                        background: 'linear-gradient(180deg, transparent, #0066ff, #00d4ff, #0066ff, transparent)',
                        boxShadow: '0 0 30px #0066ff, 0 0 60px #0066ff, 0 0 90px rgba(0, 102, 255, 0.5)',
                        animation: isActive ? 'borderPulse 1.5s ease-in-out infinite' : 'none',
                    }}
                />

                {/* Corner glows - Maiores */}
                {[
                    { top: 0, left: 0 },
                    { top: 0, right: 0 },
                    { bottom: 0, left: 0 },
                    { bottom: 0, right: 0 },
                ].map((pos, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            ...pos,
                            width: '150px',
                            height: '150px',
                            background: 'radial-gradient(circle, rgba(0, 102, 255, 0.5) 0%, transparent 70%)',
                            animation: isActive ? 'cornerPulse 2s ease-in-out infinite' : 'none',
                        }}
                    />
                ))}

                {/* Overlay sutil */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0, 102, 255, 0.05) 100%)',
                        animation: isActive ? 'overlayPulse 2s ease-in-out infinite' : 'none',
                    }}
                />
            </div>

            {/* DOM Access Indicator */}
            {showDomIndicator && (
                <div
                    style={{
                        position: 'fixed',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 24px',
                        background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.95), rgba(0, 212, 255, 0.9))',
                        borderRadius: '10px',
                        boxShadow: '0 8px 32px rgba(0, 102, 255, 0.6), 0 0 60px rgba(0, 102, 255, 0.3)',
                        animation: 'slideDown 0.4s ease-out',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                >
                    <SyncOutlined spin style={{ color: '#ffffff', fontSize: '18px' }} />
                    <Text style={{ color: '#ffffff', fontSize: '14px', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '1px' }}>
                        Acessando Cognição...
                    </Text>
                </div>
            )}

            {/* Cognitive Notification with Interaction */}
            {currentNotification && (
                <div
                    style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        zIndex: 9999,
                        width: '420px',
                        background: 'rgba(10, 10, 15, 0.98)',
                        border: `2px solid ${getTypeColor(currentNotification.type)}`,
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: `0 12px 48px ${getTypeColor(currentNotification.type)}50, 0 0 80px ${getTypeColor(currentNotification.type)}20`,
                        animation: 'slideInRight 0.5s ease-out',
                    }}
                >
                    {/* Header */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '14px 18px',
                            background: `linear-gradient(90deg, ${getTypeColor(currentNotification.type)}25, transparent)`,
                            borderBottom: `1px solid ${getTypeColor(currentNotification.type)}40`,
                        }}
                    >
                        {currentNotification.type === 'insight' && (
                            <EyeOutlined style={{ color: getTypeColor(currentNotification.type), fontSize: '20px' }} />
                        )}
                        {currentNotification.type === 'alert' && (
                            <ThunderboltOutlined style={{ color: getTypeColor(currentNotification.type), fontSize: '20px' }} />
                        )}
                        {currentNotification.type === 'prediction' && (
                            <BellOutlined style={{ color: getTypeColor(currentNotification.type), fontSize: '20px' }} />
                        )}
                        <Text
                            style={{
                                color: getTypeColor(currentNotification.type),
                                fontSize: '13px',
                                fontWeight: 700,
                                letterSpacing: '2px',
                                fontFamily: 'monospace',
                            }}
                        >
                            {currentNotification.title}
                        </Text>
                        <div
                            style={{
                                marginLeft: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            <div
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: getTypeColor(currentNotification.type),
                                    boxShadow: `0 0 15px ${getTypeColor(currentNotification.type)}`,
                                    animation: 'pulse 1s infinite',
                                }}
                            />
                            <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontFamily: 'monospace' }}>
                                LIVE
                            </Text>
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '18px' }}>
                        <Text
                            style={{
                                color: 'rgba(255, 255, 255, 0.95)',
                                fontSize: '15px',
                                lineHeight: 1.7,
                                display: 'block',
                            }}
                        >
                            {currentNotification.message}
                        </Text>

                        {/* Action Question */}
                        {currentNotification.action && !showFeedback && (
                            <div
                                style={{
                                    marginTop: '16px',
                                    padding: '14px',
                                    background: `linear-gradient(135deg, ${getTypeColor(currentNotification.type)}10, ${getTypeColor(currentNotification.type)}05)`,
                                    borderRadius: '10px',
                                    border: `1px solid ${getTypeColor(currentNotification.type)}30`,
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'rgba(255, 255, 255, 0.85)',
                                        fontSize: '14px',
                                        display: 'block',
                                        marginBottom: '14px',
                                    }}
                                >
                                    💡 {currentNotification.action}
                                </Text>

                                <Space size="middle">
                                    <Button
                                        type="primary"
                                        icon={<CheckOutlined />}
                                        onClick={handleAccept}
                                        style={{
                                            background: `linear-gradient(135deg, ${getTypeColor(currentNotification.type)}, ${getTypeColor(currentNotification.type)}cc)`,
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontWeight: 600,
                                            boxShadow: `0 4px 16px ${getTypeColor(currentNotification.type)}40`,
                                        }}
                                    >
                                        Sim, fazer isso
                                    </Button>
                                    <Button
                                        type="text"
                                        icon={<CloseOutlined />}
                                        onClick={handleDismiss}
                                        style={{
                                            color: 'rgba(255, 255, 255, 0.6)',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        Agora não
                                    </Button>
                                </Space>
                            </div>
                        )}

                        {/* Feedback Messages */}
                        {showFeedback === 'accepted' && (
                            <div
                                style={{
                                    marginTop: '16px',
                                    padding: '14px',
                                    background: 'rgba(0, 255, 136, 0.15)',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(0, 255, 136, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    animation: 'fadeIn 0.3s ease-out',
                                }}
                            >
                                <CheckOutlined style={{ color: '#00ff88', fontSize: '18px' }} />
                                <Text style={{ color: '#00ff88', fontWeight: 600 }}>
                                    Ação registrada! Abrindo painel...
                                </Text>
                                <RightOutlined style={{ color: '#00ff88', marginLeft: 'auto' }} />
                            </div>
                        )}

                        {showFeedback === 'dismissed' && (
                            <div
                                style={{
                                    marginTop: '16px',
                                    padding: '14px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    animation: 'fadeIn 0.3s ease-out',
                                }}
                            >
                                <Text style={{ color: 'rgba(255,255,255,0.5)' }}>
                                    Entendido. Continuaremos monitorando.
                                </Text>
                            </div>
                        )}

                        {/* Progress bar - Mais longa */}
                        {!showFeedback && (
                            <div
                                style={{
                                    marginTop: '16px',
                                    height: '3px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '3px',
                                    overflow: 'hidden',
                                }}
                            >
                                <div
                                    style={{
                                        height: '100%',
                                        background: `linear-gradient(90deg, ${getTypeColor(currentNotification.type)}, ${getTypeColor(currentNotification.type)}80)`,
                                        animation: 'progressShrink 10s linear forwards',
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* CSS Animations */}
            <style jsx global>{`
                @keyframes borderPulse {
                    0%, 100% {
                        opacity: 0.5;
                    }
                    50% {
                        opacity: 1;
                    }
                }

                @keyframes cornerPulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.4;
                    }
                    50% {
                        transform: scale(1.3);
                        opacity: 1;
                    }
                }

                @keyframes overlayPulse {
                    0%, 100% {
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 0.6;
                    }
                }

                @keyframes slideDown {
                    from {
                        transform: translateX(-50%) translateY(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(-50%) translateY(0);
                        opacity: 1;
                    }
                }

                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes progressShrink {
                    from {
                        width: 100%;
                    }
                    to {
                        width: 0%;
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

            {/* Cognitive Dashboard */}
            <CognitiveDashboard
                isOpen={showDashboard}
                onClose={() => setShowDashboard(false)}
            />
        </>
    );
};

export default CognitiveAlert;
