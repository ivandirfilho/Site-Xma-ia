'use client';

import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';

const { Paragraph } = Typography;

const Footer: React.FC = () => {
    return (
        <footer
            style={{
                background: '#050508',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '64px 24px 32px',
            }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Partners Section */}
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <Paragraph
                        style={{
                            fontSize: '12px',
                            color: 'rgba(255, 255, 255, 0.4)',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            marginBottom: '24px',
                        }}
                    >
                        Tecnologia & Parceiros
                    </Paragraph>

                    <Row gutter={[48, 24]} justify="center" align="middle">
                        {/* MENDIX */}
                        <Col>
                            <div
                                style={{
                                    padding: '16px 32px',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                }}
                            >
                                <span style={{ fontSize: '24px' }}>🔧</span>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>
                                        MENDIX
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)' }}>
                                        Siemens ISV Partner
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* NVIDIA */}
                        <Col>
                            <div
                                style={{
                                    padding: '16px 32px',
                                    background: 'rgba(118, 185, 0, 0.08)',
                                    border: '1px solid rgba(118, 185, 0, 0.2)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                }}
                            >
                                <span style={{ fontSize: '24px' }}>⚡</span>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#76b900' }}>
                                        NVIDIA
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)' }}>
                                        Accelerated Computing
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* Big 4 Compliance */}
                        <Col>
                            <div
                                style={{
                                    padding: '16px 32px',
                                    background: 'rgba(0, 102, 255, 0.08)',
                                    border: '1px solid rgba(0, 102, 255, 0.2)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                }}
                            >
                                <span style={{ fontSize: '24px' }}>🛡️</span>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#0066ff' }}>
                                        Global Big 4
                                    </div>
                                    <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)' }}>
                                        Audit Compatible
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

                <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.08)', margin: '32px 0' }} />

                {/* Bottom Footer */}
                <Row justify="space-between" align="middle" style={{ flexWrap: 'wrap', gap: '16px' }}>
                    <Col>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {/* Logo */}
                            <img
                                src="/xmaia-logo.png"
                                alt="XMA.IA Logo"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    objectFit: 'contain',
                                }}
                            />
                            <div>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff' }}>
                                    XMA.IA
                                </div>
                                <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.4)' }}>
                                    Manutenção Autônoma AI-Native
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col>
                        <Paragraph
                            style={{
                                fontSize: '13px',
                                color: 'rgba(255, 255, 255, 0.4)',
                                margin: 0,
                            }}
                        >
                            © {new Date().getFullYear()} XMA.IA. Todos os direitos reservados.
                        </Paragraph>
                    </Col>
                </Row>
            </div>
        </footer>
    );
};

export default Footer;
