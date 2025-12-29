'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Tag, Progress } from 'antd';
import {
    AlertOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    SyncOutlined,
    SafetyCertificateOutlined,
} from '@ant-design/icons';
import { useLanguage } from '@/contexts/LanguageContext';

const { Title, Text } = Typography;

interface Insight {
    id: number;
    type: 'critical' | 'warning' | 'success' | 'info';
    icon: React.ReactNode;
    sapRef: string;
    title: string;
    description: string;
    value?: string;
    timestamp: string;
}

const LiveInsights: React.FC = () => {
    const { t } = useLanguage();
    const [visibleCount, setVisibleCount] = useState(0);

    const insightsData: Insight[] = [
        // === ESTOQUE E PEÇAS ===
        {
            id: 1,
            type: 'critical',
            icon: <AlertOutlined />,
            sapRef: 'SAP MM | Material 10045892',
            title: t('insight.stock.title'),
            description: t('insight.stock.desc'),
            value: t('insight.stock.value'),
            timestamp: 'Agora',
        },
        {
            id: 2,
            type: 'info',
            icon: <DollarOutlined />,
            sapRef: 'SAP MM | Fornecedor 50001',
            title: t('insight.vendor.title'),
            description: t('insight.vendor.desc'),
            value: t('insight.vendor.value'),
            timestamp: '2 min atrás',
        },
        {
            id: 3,
            type: 'warning',
            icon: <ClockCircleOutlined />,
            sapRef: 'SAP MM | Requisição 4500123',
            title: t('insight.demand.title'),
            description: t('insight.demand.desc'),
            value: t('insight.demand.value'),
            timestamp: '5 min atrás',
        },

        // === PLANEJAMENTO DE MANUTENÇÃO ===
        {
            id: 4,
            type: 'critical',
            icon: <AlertOutlined />,
            sapRef: 'SAP PM | Ordens Conflitantes',
            title: t('insight.conflict.title'),
            description: t('insight.conflict.desc'),
            value: t('insight.conflict.value'),
            timestamp: '8 min atrás',
        },
        {
            id: 5,
            type: 'warning',
            icon: <SafetyCertificateOutlined />,
            sapRef: 'SAP PM | Backlog Analysis',
            title: t('insight.backlog.title'),
            description: t('insight.backlog.desc'),
            value: t('insight.backlog.value'),
            timestamp: '15 min atrás',
        },
        {
            id: 6,
            type: 'success',
            icon: <CheckCircleOutlined />,
            sapRef: 'SAP PM | Predição Confirmada',
            title: t('insight.prevented.title'),
            description: t('insight.prevented.desc'),
            value: t('insight.prevented.value'),
            timestamp: '1h atrás',
        },
    ];

    useEffect(() => {
        // Mostrar primeiro insight imediatamente
        if (visibleCount === 0) {
            setVisibleCount(1);
        }

        // Adicionar novos insights progressivamente
        const interval = setInterval(() => {
            setVisibleCount((prev) => {
                if (prev < insightsData.length) {
                    return prev + 1;
                }
                return prev;
            });
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    const getTypeColor = (type: Insight['type']) => {
        switch (type) {
            case 'critical':
                return { bg: 'rgba(255, 77, 79, 0.15)', border: 'rgba(255, 77, 79, 0.4)', text: '#ff4d4f', tag: 'red' };
            case 'warning':
                return { bg: 'rgba(255, 170, 0, 0.15)', border: 'rgba(255, 170, 0, 0.4)', text: '#ffaa00', tag: 'orange' };
            case 'success':
                return { bg: 'rgba(0, 255, 136, 0.1)', border: 'rgba(0, 255, 136, 0.3)', text: '#00ff88', tag: 'green' };
            case 'info':
                return { bg: 'rgba(0, 102, 255, 0.15)', border: 'rgba(0, 102, 255, 0.4)', text: '#0066ff', tag: 'blue' };
        }
    };

    const visibleInsights = insightsData.slice(0, visibleCount);

    return (
        <section
            style={{
                padding: '100px 24px',
                background: 'linear-gradient(180deg, #0d0d14 0%, #0a0a0f 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Grid Effect */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `
            linear-gradient(rgba(0, 102, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 102, 255, 0.03) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                    pointerEvents: 'none',
                }}
            />

            <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <div
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px 20px',
                            background: 'rgba(0, 255, 136, 0.1)',
                            border: '1px solid rgba(0, 255, 136, 0.25)',
                            borderRadius: '100px',
                            marginBottom: '20px',
                        }}
                    >
                        <span
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#00ff88',
                                boxShadow: '0 0 10px #00ff88',
                                animation: 'pulse 2s infinite',
                            }}
                        />
                        <span style={{ color: '#00ff88', fontSize: '13px', fontWeight: 600, letterSpacing: '1px' }}>
                            {t('insights.badge')}
                        </span>
                    </div>

                    <Title
                        level={2}
                        style={{
                            fontSize: 'clamp(28px, 4vw, 40px)',
                            fontWeight: 700,
                            color: '#ffffff',
                            marginBottom: '16px',
                            marginTop: 0,
                        }}
                    >
                        {t('insights.title')}{' '}
                        <span style={{ color: '#00d4ff' }}>{t('insights.title.highlight')}</span>
                    </Title>

                    <Text style={{ fontSize: '17px', color: 'rgba(255, 255, 255, 0.6)', display: 'block', maxWidth: '600px', margin: '0 auto' }}>
                        {t('insights.subtitle')}
                    </Text>
                </div>

                {/* Live Feed */}
                <div
                    style={{
                        background: 'rgba(5, 5, 8, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        padding: '24px',
                        maxHeight: '500px',
                        overflowY: 'auto',
                    }}
                >
                    {/* Terminal Header */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '20px',
                            paddingBottom: '16px',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                    >
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27ca41' }} />
                        <Text style={{ marginLeft: '12px', color: 'rgba(255, 255, 255, 0.5)', fontSize: '13px', fontFamily: 'monospace' }}>
                            {t('insights.terminal.header')}
                        </Text>
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <SyncOutlined spin style={{ color: '#00ff88', fontSize: '14px' }} />
                            <Text style={{ color: '#00ff88', fontSize: '12px', fontFamily: 'monospace' }}>
                                {t('insights.connected')}
                            </Text>
                        </div>
                    </div>

                    {/* Insights Feed */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {visibleInsights.map((insight, index) => {
                            const colors = getTypeColor(insight.type);
                            return (
                                <div
                                    key={insight.id}
                                    className="animate-fade-in-up"
                                    style={{
                                        background: colors.bg,
                                        border: `1px solid ${colors.border}`,
                                        borderRadius: '12px',
                                        padding: '16px 20px',
                                        opacity: 0,
                                        animationDelay: `${index * 0.1}s`,
                                        animationFillMode: 'forwards',
                                    }}
                                >
                                    {/* Header */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                                        <span style={{ fontSize: '18px', color: colors.text }}>{insight.icon}</span>
                                        <Tag
                                            color={colors.tag}
                                            style={{ margin: 0, fontSize: '11px', fontFamily: 'monospace', border: 'none' }}
                                        >
                                            {insight.sapRef}
                                        </Tag>
                                        <Text style={{ marginLeft: 'auto', color: 'rgba(255, 255, 255, 0.4)', fontSize: '12px' }}>
                                            {insight.timestamp}
                                        </Text>
                                    </div>

                                    {/* Title */}
                                    <Text
                                        strong
                                        style={{ color: '#ffffff', fontSize: '15px', display: 'block', marginBottom: '6px' }}
                                    >
                                        {insight.title}
                                    </Text>

                                    {/* Description */}
                                    <Text style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', lineHeight: 1.6, display: 'block' }}>
                                        {insight.description}
                                    </Text>

                                    {/* Value */}
                                    {insight.value && (
                                        <div
                                            style={{
                                                marginTop: '12px',
                                                padding: '8px 12px',
                                                background: 'rgba(0, 0, 0, 0.3)',
                                                borderRadius: '6px',
                                                display: 'inline-block',
                                            }}
                                        >
                                            <Text style={{ color: colors.text, fontSize: '13px', fontWeight: 600, fontFamily: 'monospace' }}>
                                                → {insight.value}
                                            </Text>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Loading indicator */}
                        {visibleCount < insightsData.length && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px' }}>
                                <Progress
                                    type="circle"
                                    percent={75}
                                    size={20}
                                    strokeColor="#0066ff"
                                    trailColor="rgba(255,255,255,0.1)"
                                    showInfo={false}
                                    style={{ animation: 'spin 1s linear infinite' }}
                                />
                                <Text style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '13px', fontFamily: 'monospace' }}>
                                    {t('insights.processing')}
                                </Text>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Bar */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                        marginTop: '32px',
                    }}
                >
                    {[
                        { label: t('insights.stats.orders'), value: '12.847', trend: t('insights.stats.trend.orders') },
                        { label: t('insights.stats.predictions'), value: '94.7%', trend: t('insights.stats.trend.accuracy') },
                        { label: t('insights.stats.savings'), value: 'R$ 4.2M', trend: t('insights.stats.trend.savings') },
                    ].map((stat, index) => (
                        <div
                            key={index}
                            style={{
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '12px',
                                padding: '20px',
                                textAlign: 'center',
                            }}
                        >
                            <Text style={{ color: '#ffffff', fontSize: '28px', fontWeight: 700, display: 'block' }}>
                                {stat.value}
                            </Text>
                            <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '13px', display: 'block' }}>
                                {stat.label}
                            </Text>
                            <Text style={{ color: '#00ff88', fontSize: '11px', marginTop: '4px', display: 'block' }}>
                                {stat.trend}
                            </Text>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LiveInsights;
