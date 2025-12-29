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
import { useLanguage } from '@/contexts/LanguageContext';

const { Text } = Typography;

interface CognitiveNotification {
    id: number;
    titleKey: string;
    messageKey: string;
    type: 'insight' | 'alert' | 'prediction';
    actionKey?: string;
}

const notificationKeys: CognitiveNotification[] = [
    // === ESTOQUE E PEÇAS ===
    {
        id: 1,
        type: 'alert',
        titleKey: 'notif.1.title',
        messageKey: 'notif.1.message',
        actionKey: 'notif.1.action',
    },
    {
        id: 2,
        type: 'insight',
        titleKey: 'notif.2.title',
        messageKey: 'notif.2.message',
        actionKey: 'notif.2.action',
    },
    {
        id: 3,
        type: 'prediction',
        titleKey: 'notif.3.title',
        messageKey: 'notif.3.message',
        actionKey: 'notif.3.action',
    },

    // === PLANEJAMENTO DE MANUTENÇÃO ===
    {
        id: 4,
        type: 'alert',
        titleKey: 'notif.4.title',
        messageKey: 'notif.4.message',
        actionKey: 'notif.4.action',
    },
    {
        id: 5,
        type: 'insight',
        titleKey: 'notif.5.title',
        messageKey: 'notif.5.message',
        actionKey: 'notif.5.action',
    },
    {
        id: 6,
        type: 'prediction',
        titleKey: 'notif.6.title',
        messageKey: 'notif.6.message',
        actionKey: 'notif.6.action',
    },

    // === CADEIA DE SUPRIMENTOS ===
    {
        id: 7,
        type: 'alert',
        titleKey: 'notif.7.title',
        messageKey: 'notif.7.message',
        actionKey: 'notif.7.action',
    },
    {
        id: 8,
        type: 'insight',
        titleKey: 'notif.8.title',
        messageKey: 'notif.8.message',
        actionKey: 'notif.8.action',
    },

    // === DORES DE CABEÇA COMUNS ===
    {
        id: 9,
        type: 'alert',
        titleKey: 'notif.9.title',
        messageKey: 'notif.9.message',
        actionKey: 'notif.9.action',
    },
    {
        id: 10,
        type: 'prediction',
        titleKey: 'notif.10.title',
        messageKey: 'notif.10.message',
        actionKey: 'notif.10.action',
    },
    {
        id: 11,
        type: 'insight',
        titleKey: 'notif.11.title',
        messageKey: 'notif.11.message',
        actionKey: 'notif.11.action',
    },
    {
        id: 12,
        type: 'alert',
        titleKey: 'notif.12.title',
        messageKey: 'notif.12.message',
        actionKey: 'notif.12.action',
    },
];


const CognitiveAlert: React.FC = () => {
    const { t } = useLanguage();
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
                setCurrentNotification(notificationKeys[notificationIndex]);
                notificationIndex = (notificationIndex + 1) % notificationKeys.length;
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
                        maxWidth: 'calc(100vw - 40px)',
                    }}
                >
                    <SyncOutlined spin style={{ color: '#ffffff', fontSize: '18px' }} />
                    <Text style={{ color: '#ffffff', fontSize: '14px', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '1px' }}>
                        {t('cognitive.accessing')}
                    </Text>
                </div>
            )}

            {/* Cognitive Notification with Interaction - RESPONSIVE */}
            {currentNotification && (
                <div
                    style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        left: '20px',
                        zIndex: 9999,
                        width: 'auto',
                        maxWidth: '420px',
                        marginLeft: 'auto',
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
                            flexWrap: 'wrap',
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
                                flex: '1 1 auto',
                            }}
                        >
                            {t(currentNotification.titleKey)}
                        </Text>
                        <div
                            style={{
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
                                {t('cognitive.live')}
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
                            {t(currentNotification.messageKey)}
                        </Text>

                        {/* Action Question */}
                        {currentNotification.actionKey && !showFeedback && (
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
                                    💡 {t(currentNotification.actionKey)}
                                </Text>

                                <Space size="middle" wrap>
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
                                        {t('alert.yes')}
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
                                        {t('alert.no')}
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
                                    flexWrap: 'wrap',
                                }}
                            >
                                <CheckOutlined style={{ color: '#00ff88', fontSize: '18px' }} />
                                <Text style={{ color: '#00ff88', fontWeight: 600, flex: '1 1 auto' }}>
                                    {t('alert.accepted')}
                                </Text>
                                <RightOutlined style={{ color: '#00ff88' }} />
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
                                    {t('alert.dismissed')}
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

                /* Mobile Responsive Adjustments */
                @media (max-width: 480px) {
                    .cognitive-notification {
                        left: 10px !important;
                        right: 10px !important;
                        max-width: none !important;
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
