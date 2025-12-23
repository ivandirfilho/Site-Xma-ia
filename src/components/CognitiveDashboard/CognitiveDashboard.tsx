'use client';

import React from 'react';
import { Typography, Button, Progress, Tag } from 'antd';
import {
    CloseOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    LineChartOutlined,
    ThunderboltOutlined,
    SafetyCertificateOutlined,
    ToolOutlined,
    SyncOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface CognitiveDashboardProps {
    isOpen: boolean;
    onClose: () => void;
    insightType?: string;
}

const CognitiveDashboard: React.FC<CognitiveDashboardProps> = ({ isOpen, onClose, insightType }) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(8px)',
                    zIndex: 10000,
                    animation: 'fadeIn 0.3s ease-out',
                }}
            />

            {/* Dashboard Panel */}
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90vw',
                    maxWidth: '1200px',
                    height: '80vh',
                    maxHeight: '700px',
                    background: 'linear-gradient(135deg, rgba(10, 15, 30, 0.95), rgba(5, 10, 20, 0.98))',
                    border: '1px solid rgba(0, 212, 255, 0.3)',
                    borderRadius: '24px',
                    zIndex: 10001,
                    overflow: 'hidden',
                    boxShadow: '0 0 80px rgba(0, 102, 255, 0.3), 0 0 160px rgba(0, 212, 255, 0.1)',
                    animation: 'scaleIn 0.4s ease-out',
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '20px 28px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        background: 'linear-gradient(90deg, rgba(0, 102, 255, 0.15), transparent)',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #0066ff, #00d4ff)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <ThunderboltOutlined style={{ fontSize: '24px', color: '#ffffff' }} />
                        </div>
                        <div>
                            <Title level={4} style={{ margin: 0, color: '#ffffff', fontSize: '20px' }}>
                                Centro de Controle Cognitivo
                            </Title>
                            <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '13px' }}>
                                xma.ia Neural Dashboard • Sessão Ativa
                            </Text>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: '#00ff88',
                                    boxShadow: '0 0 10px #00ff88',
                                    animation: 'pulse 2s infinite',
                                }}
                            />
                            <Text style={{ color: '#00ff88', fontSize: '12px', fontFamily: 'monospace' }}>
                                CONECTADO AO SAP
                            </Text>
                        </div>
                        <Button
                            type="text"
                            icon={<CloseOutlined />}
                            onClick={onClose}
                            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
                        />
                    </div>
                </div>

                {/* Widgets Grid */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '20px',
                        padding: '24px',
                        height: 'calc(100% - 100px)',
                        overflowY: 'auto',
                    }}
                >
                    {/* Widget 1: ERP Integrity Anomaly */}
                    <div
                        style={{
                            background: 'rgba(255, 77, 79, 0.08)',
                            border: '1px solid rgba(255, 77, 79, 0.3)',
                            borderRadius: '16px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <WarningOutlined style={{ color: '#ff4d4f', fontSize: '20px' }} />
                            <Text strong style={{ color: '#ff4d4f', fontSize: '14px' }}>
                                ERP INTEGRITY ANOMALY
                            </Text>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                            <div
                                style={{
                                    flex: 1,
                                    background: 'rgba(0, 0, 0, 0.3)',
                                    borderRadius: '10px',
                                    padding: '12px',
                                }}
                            >
                                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', display: 'block', marginBottom: '4px' }}>
                                    SAP ECC6 ENTRY
                                </Text>
                                <Text style={{ color: '#ffffff', fontSize: '13px', display: 'block' }}>
                                    Material: Rolamento SKF
                                </Text>
                                <Text style={{ color: '#ff4d4f', fontSize: '16px', fontWeight: 700 }}>
                                    R$ 1.247,00
                                </Text>
                            </div>
                            <div
                                style={{
                                    flex: 1,
                                    background: 'rgba(0, 0, 0, 0.3)',
                                    borderRadius: '10px',
                                    padding: '12px',
                                }}
                            >
                                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', display: 'block', marginBottom: '4px' }}>
                                    CONTRATO CLÁUSULA 4.2
                                </Text>
                                <Text style={{ color: '#ffffff', fontSize: '13px', display: 'block' }}>
                                    Limite Aprovado
                                </Text>
                                <Text style={{ color: '#00ff88', fontSize: '16px', fontWeight: 700 }}>
                                    R$ 1.112,00
                                </Text>
                            </div>
                        </div>

                        <div
                            style={{
                                background: 'rgba(255, 77, 79, 0.2)',
                                borderRadius: '8px',
                                padding: '12px',
                                marginBottom: '16px',
                            }}
                        >
                            <Text style={{ color: '#ff4d4f', fontSize: '12px', fontWeight: 600 }}>
                                ⚠️ Inconsistência Detectada: Valor excede limite contratual em 12%
                            </Text>
                        </div>

                        <Button
                            type="primary"
                            danger
                            style={{ marginTop: 'auto' }}
                        >
                            Notificar Compras
                        </Button>
                    </div>

                    {/* Widget 2: Maintenance Execution Audit */}
                    <div
                        style={{
                            background: 'rgba(255, 170, 0, 0.08)',
                            border: '1px solid rgba(255, 170, 0, 0.3)',
                            borderRadius: '16px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <ToolOutlined style={{ color: '#ffaa00', fontSize: '20px' }} />
                            <Text strong style={{ color: '#ffaa00', fontSize: '14px' }}>
                                AUDITORIA DE EXECUÇÃO
                            </Text>
                        </div>

                        <div
                            style={{
                                background: 'rgba(0, 0, 0, 0.3)',
                                borderRadius: '10px',
                                padding: '12px',
                                marginBottom: '12px',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>
                                    OS: 4001892
                                </Text>
                                <Tag color="green" style={{ margin: 0 }}>CONCLUÍDA</Tag>
                            </div>
                            <Text style={{ color: '#ffffff', fontSize: '13px', display: 'block' }}>
                                Técnico: Carlos Silva
                            </Text>
                            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                                Troca de Rolamento - Bomba P-201
                            </Text>
                        </div>

                        {/* Waveform Simulation */}
                        <div
                            style={{
                                background: 'rgba(0, 0, 0, 0.4)',
                                borderRadius: '10px',
                                padding: '12px',
                                marginBottom: '12px',
                                position: 'relative',
                            }}
                        >
                            <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', display: 'block', marginBottom: '8px' }}>
                                SENSOR DE TORQUE - TEMPO REAL
                            </Text>
                            <div style={{ height: '50px', display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                                {[30, 45, 35, 50, 40, 65, 85, 95, 70, 45, 55, 40, 35, 50, 60].map((h, i) => (
                                    <div
                                        key={i}
                                        style={{
                                            flex: 1,
                                            height: `${h}%`,
                                            background: h > 80 ? '#ff4d4f' : h > 60 ? '#ffaa00' : '#00ff88',
                                            borderRadius: '2px',
                                            transition: 'height 0.3s',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div
                            style={{
                                background: 'rgba(255, 170, 0, 0.2)',
                                borderRadius: '8px',
                                padding: '12px',
                                marginBottom: '16px',
                            }}
                        >
                            <Text style={{ color: '#ffaa00', fontSize: '12px', fontWeight: 600 }}>
                                🔍 Insight: Assinatura de torque não reconhecida. Possível execução imprópria no Rolamento #4
                            </Text>
                        </div>

                        <Button
                            style={{
                                marginTop: 'auto',
                                background: 'linear-gradient(135deg, #ffaa00, #ff8800)',
                                border: 'none',
                                color: '#000',
                                fontWeight: 600,
                            }}
                        >
                            Abrir Auditoria
                        </Button>
                    </div>

                    {/* Widget 3: Planning Evolution */}
                    <div
                        style={{
                            background: 'rgba(0, 255, 136, 0.08)',
                            border: '1px solid rgba(0, 255, 136, 0.3)',
                            borderRadius: '16px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <LineChartOutlined style={{ color: '#00ff88', fontSize: '20px' }} />
                            <Text strong style={{ color: '#00ff88', fontSize: '14px' }}>
                                EVOLUÇÃO DO PLANEJAMENTO
                            </Text>
                        </div>

                        {/* Chart Simulation */}
                        <div
                            style={{
                                background: 'rgba(0, 0, 0, 0.3)',
                                borderRadius: '10px',
                                padding: '16px',
                                marginBottom: '12px',
                                position: 'relative',
                                height: '120px',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px' }}>
                                    Q4 2024 - DISPONIBILIDADE
                                </Text>
                            </div>

                            {/* Line chart simulation */}
                            <svg width="100%" height="80" viewBox="0 0 200 60">
                                {/* Original Plan - faded */}
                                <polyline
                                    points="0,40 30,35 60,42 90,38 120,45 150,40 180,42 200,38"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.3)"
                                    strokeWidth="2"
                                    strokeDasharray="4,4"
                                />
                                {/* AI Optimized Plan - bright green */}
                                <polyline
                                    points="0,40 30,32 60,28 90,22 120,18 150,15 180,12 200,10"
                                    fill="none"
                                    stroke="#00ff88"
                                    strokeWidth="3"
                                />
                                {/* Glow effect */}
                                <polyline
                                    points="0,40 30,32 60,28 90,22 120,18 150,15 180,12 200,10"
                                    fill="none"
                                    stroke="#00ff88"
                                    strokeWidth="6"
                                    opacity="0.3"
                                />
                            </svg>

                            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: '16px', height: '2px', background: 'rgba(255,255,255,0.3)', borderRadius: '1px' }} />
                                    <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px' }}>Plano Original</Text>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: '16px', height: '3px', background: '#00ff88', borderRadius: '1px' }} />
                                    <Text style={{ color: '#00ff88', fontSize: '10px' }}>Plano Otimizado IA</Text>
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '8px',
                                marginBottom: '16px',
                            }}
                        >
                            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', display: 'block' }}>ATUAL</Text>
                                <Text style={{ color: '#ffffff', fontSize: '18px', fontWeight: 700 }}>89.2%</Text>
                            </div>
                            <div style={{ background: 'rgba(0,255,136,0.15)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', display: 'block' }}>PROJETADO</Text>
                                <Text style={{ color: '#00ff88', fontSize: '18px', fontWeight: 700 }}>97.8%</Text>
                            </div>
                        </div>

                        <Button
                            type="primary"
                            icon={<CheckCircleOutlined />}
                            style={{
                                marginTop: 'auto',
                                background: 'linear-gradient(135deg, #00ff88, #00cc6a)',
                                border: 'none',
                                color: '#000',
                                fontWeight: 600,
                                height: '44px',
                            }}
                        >
                            Aplicar Otimização: +15% Disponibilidade
                        </Button>
                    </div>

                    {/* Widget 4: Estoque Analysis */}
                    <div
                        style={{
                            background: 'rgba(0, 102, 255, 0.08)',
                            border: '1px solid rgba(0, 102, 255, 0.3)',
                            borderRadius: '16px',
                            padding: '20px',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <SafetyCertificateOutlined style={{ color: '#0066ff', fontSize: '20px' }} />
                            <Text strong style={{ color: '#0066ff', fontSize: '14px' }}>
                                ANÁLISE DE ESTOQUE
                            </Text>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>Rolamento SKF 6205</Text>
                                <Text style={{ color: '#ff4d4f', fontSize: '12px' }}>2 un (Crítico)</Text>
                            </div>
                            <Progress percent={10} strokeColor="#ff4d4f" trailColor="rgba(255,255,255,0.1)" size="small" showInfo={false} />
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>Correia A-68</Text>
                                <Text style={{ color: '#ffaa00', fontSize: '12px' }}>8 un (Baixo)</Text>
                            </div>
                            <Progress percent={35} strokeColor="#ffaa00" trailColor="rgba(255,255,255,0.1)" size="small" showInfo={false} />
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>Selo Mecânico</Text>
                                <Text style={{ color: '#00ff88', fontSize: '12px' }}>24 un (OK)</Text>
                            </div>
                            <Progress percent={80} strokeColor="#00ff88" trailColor="rgba(255,255,255,0.1)" size="small" showInfo={false} />
                        </div>
                    </div>

                    {/* Widget 5: Supplier Comparison */}
                    <div
                        style={{
                            background: 'rgba(138, 43, 226, 0.08)',
                            border: '1px solid rgba(138, 43, 226, 0.3)',
                            borderRadius: '16px',
                            padding: '20px',
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <SyncOutlined style={{ color: '#8a2be2', fontSize: '20px' }} />
                            <Text strong style={{ color: '#8a2be2', fontSize: '14px' }}>
                                RANKING FORNECEDORES
                            </Text>
                        </div>

                        {[
                            { name: 'Rolamentos Brasil', score: 94, lead: '5 dias', price: 'R$ 1.180' },
                            { name: 'MecParts Nacional', score: 87, lead: '12 dias', price: 'R$ 1.050' },
                            { name: 'SKF Direct', score: 82, lead: '18 dias', price: 'R$ 980' },
                        ].map((supplier, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '10px',
                                    background: i === 0 ? 'rgba(138, 43, 226, 0.15)' : 'rgba(0,0,0,0.2)',
                                    borderRadius: '8px',
                                    marginBottom: '8px',
                                }}
                            >
                                <Text style={{ color: i === 0 ? '#8a2be2' : 'rgba(255,255,255,0.5)', fontSize: '16px', fontWeight: 700, width: '24px' }}>
                                    #{i + 1}
                                </Text>
                                <div style={{ flex: 1 }}>
                                    <Text style={{ color: '#ffffff', fontSize: '13px', display: 'block' }}>{supplier.name}</Text>
                                    <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>
                                        Lead: {supplier.lead} • {supplier.price}
                                    </Text>
                                </div>
                                <div
                                    style={{
                                        background: `rgba(138, 43, 226, ${supplier.score / 100})`,
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                    }}
                                >
                                    <Text style={{ color: '#ffffff', fontSize: '12px', fontWeight: 600 }}>{supplier.score}%</Text>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Widget 6: Quick Actions */}
                    <div
                        style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '16px',
                            padding: '20px',
                        }}
                    >
                        <Text strong style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', display: 'block', marginBottom: '16px' }}>
                            AÇÕES RÁPIDAS
                        </Text>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Button block style={{ textAlign: 'left', height: '44px' }}>
                                📦 Gerar Pedido de Compra
                            </Button>
                            <Button block style={{ textAlign: 'left', height: '44px' }}>
                                🔧 Criar Ordem de Manutenção
                            </Button>
                            <Button block style={{ textAlign: 'left', height: '44px' }}>
                                📊 Exportar Relatório
                            </Button>
                            <Button block style={{ textAlign: 'left', height: '44px' }}>
                                📧 Notificar Equipe
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }
            `}</style>
        </>
    );
};

export default CognitiveDashboard;
