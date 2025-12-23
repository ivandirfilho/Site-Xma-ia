'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Tag, Progress } from 'antd';
import {
    ThunderboltOutlined,
    AlertOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    DollarOutlined,
    SyncOutlined,
    SafetyCertificateOutlined,
} from '@ant-design/icons';

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

const insightsData: Insight[] = [
    // === ESTOQUE E PEÇAS ===
    {
        id: 1,
        type: 'critical',
        icon: <AlertOutlined />,
        sapRef: 'SAP MM | Material 10045892',
        title: '⚠️ Estoque Crítico - Rolamento SKF 6205',
        description: 'Apenas 2 unidades em estoque. Consumo médio SAP: 4 un/mês. Lead time do fornecedor: 18 dias. Risco de ruptura em 15 dias se não comprar agora.',
        value: 'Pedido sugerido: 12 unidades',
        timestamp: 'Agora',
    },
    {
        id: 2,
        type: 'info',
        icon: <DollarOutlined />,
        sapRef: 'SAP MM | Fornecedor 50001',
        title: '📊 Comparativo de Fornecedores',
        description: 'Análise automática: "Rolamentos Brasil" entrega 23% mais rápido que "MecParts". Custo 8% maior, mas economia de 12 dias em lead time. Histórico de 98% de entregas no prazo.',
        value: 'Economia potencial em paradas: R$ 45.000/mês',
        timestamp: '2 min atrás',
    },
    {
        id: 3,
        type: 'warning',
        icon: <ClockCircleOutlined />,
        sapRef: 'SAP MM | Requisição 4500123',
        title: '📦 Previsão de Consumo Sazonal',
        description: 'Baseado em histórico + paradas programadas de dezembro: Correias transportadoras vão zerar em 21 dias. Aumento de 67% na demanda esperado.',
        value: 'Pedido sugerido: 45 correias A-68',
        timestamp: '5 min atrás',
    },

    // === PLANEJAMENTO DE MANUTENÇÃO ===
    {
        id: 4,
        type: 'critical',
        icon: <AlertOutlined />,
        sapRef: 'SAP PM | Ordens Conflitantes',
        title: '🔧 Conflito de Alocação Detectado',
        description: '3 ordens de manutenção agendadas para 14h no setor Caldeiras. Técnico Carlos já alocado em 2 OS simultâneas. Recurso disponível: Técnico Ricardo (livre às 15h).',
        value: 'Clique para rebalancear automaticamente',
        timestamp: '8 min atrás',
    },
    {
        id: 5,
        type: 'warning',
        icon: <SafetyCertificateOutlined />,
        sapRef: 'SAP PM | Backlog Analysis',
        title: '📈 Backlog Crescente - Atenção!',
        description: 'Backlog de manutenção cresceu 34% este mês. 47 ordens atrasadas. Causas identificadas: Falta de peças (67%), Mão de obra insuficiente (23%), Priorização incorreta (10%).',
        value: 'Impacto: R$ 180.000 em risco de parada',
        timestamp: '15 min atrás',
    },
    {
        id: 6,
        type: 'success',
        icon: <CheckCircleOutlined />,
        sapRef: 'SAP PM | Predição Confirmada',
        title: '✅ Modelo Acertou - Falha Evitada',
        description: 'Compressor C-03: falha prevista há 12 dias foi confirmada na inspeção preventiva. Substituição do selo realizada. Parada não-programada de 16h evitada.',
        value: 'Economia confirmada: R$ 288.000',
        timestamp: '1h atrás',
    },

    // === CADEIA DE SUPRIMENTOS ===
    {
        id: 7,
        type: 'warning',
        icon: <ClockCircleOutlined />,
        sapRef: 'SAP MM | Import 2024-1892',
        title: '🚛 Gargalo na Cadeia - Peça Importada',
        description: 'Selo Mecânico Burgmann com lead time de 45 dias (Alemanha). 3 bombas dependem dessa peça. Alternativa nacional identificada: "Vedamais" (7 dias, custo +15%).',
        value: 'Decisão necessária: importar ou nacionalizar?',
        timestamp: '2h atrás',
    },
    {
        id: 8,
        type: 'info',
        icon: <SyncOutlined />,
        sapRef: 'SAP PM | Correlação Descoberta',
        title: '🔗 Correlação que SAP Não Vê',
        description: 'Padrão descoberto: Quando Bomba P-201 apresenta vibração alta, o Trocador T-05 falha em até 72h (89% dos casos). SAP trata como eventos independentes.',
        value: 'Sugestão: criar plano de manutenção integrado',
        timestamp: '3h atrás',
    },

    // === GARANTIAS E CONTRATOS ===
    {
        id: 9,
        type: 'critical',
        icon: <AlertOutlined />,
        sapRef: 'SAP QM | Garantia WEG-2024',
        title: '⏰ Garantia Expirando em 6 Dias!',
        description: 'Motor WEG W22 (R$ 47.000) com garantia até 28/12. SAP registra 3 anomalias de vibração não reportadas ao fabricante. Se não abrir chamado, perde cobertura.',
        value: 'Perda potencial: R$ 47.000 + mão de obra',
        timestamp: '4h atrás',
    },
    {
        id: 10,
        type: 'warning',
        icon: <SafetyCertificateOutlined />,
        sapRef: 'SAP CO | Contrato CLI-2024-AMBEV',
        title: '📋 SLA em Risco - Cliente AMBEV',
        description: 'Contrato exige 98% de disponibilidade. Atual: 96.2%. Principais vilões: Linha 3 (4 paradas) e Caldeira 2 (3 paradas). Multa contratual se não reverter: R$ 320.000.',
        value: 'Ver plano de ação sugerido pela IA',
        timestamp: '5h atrás',
    },
];

const LiveInsights: React.FC = () => {
    const [visibleInsights, setVisibleInsights] = useState<Insight[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Mostrar primeiro insight imediatamente
        if (insightsData.length > 0 && visibleInsights.length === 0) {
            setVisibleInsights([insightsData[0]]);
            setCurrentIndex(1);
        }

        // Adicionar novos insights progressivamente
        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                if (prev < insightsData.length) {
                    setVisibleInsights((current) => [...current, insightsData[prev]]);
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
                            SISTEMA VIVO
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
                        Cognição em Tempo Real sobre{' '}
                        <span style={{ color: '#00d4ff' }}>Dados SAP</span>
                    </Title>

                    <Text style={{ fontSize: '17px', color: 'rgba(255, 255, 255, 0.6)', display: 'block', maxWidth: '600px', margin: '0 auto' }}>
                        Veja como evoluímos a inteligência do que já está digitalizado.
                        Cada insight é gerado automaticamente pela fusão de telemetria + ERP.
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
                            xma.ia neural-edge-v2.4.1 — Live Feed
                        </Text>
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <SyncOutlined spin style={{ color: '#00ff88', fontSize: '14px' }} />
                            <Text style={{ color: '#00ff88', fontSize: '12px', fontFamily: 'monospace' }}>
                                Conectado ao SAP
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
                        {currentIndex < insightsData.length && (
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
                                    Processando próximo insight...
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
                        { label: 'Ordens SAP Analisadas', value: '12.847', trend: '+342 hoje' },
                        { label: 'Falhas Previstas', value: '94.7%', trend: 'acurácia' },
                        { label: 'Economia Gerada', value: 'R$ 4.2M', trend: 'últimos 30 dias' },
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
