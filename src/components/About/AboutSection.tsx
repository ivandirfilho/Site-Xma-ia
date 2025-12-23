'use client';

import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const AboutSection: React.FC = () => {
    return (
        <section
            style={{
                padding: '120px 24px',
                background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d14 100%)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Glow */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(0, 102, 255, 0.08) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />

            <div
                style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* DNA Badge */}
                <div
                    className="animate-fade-in-up"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 24px',
                        background: 'rgba(0, 255, 136, 0.1)',
                        border: '1px solid rgba(0, 255, 136, 0.25)',
                        borderRadius: '100px',
                        marginBottom: '32px',
                        opacity: 0,
                        animationDelay: '0.1s',
                        animationFillMode: 'forwards',
                    }}
                >
                    <span style={{ fontSize: '20px' }}>🧬</span>
                    <span
                        style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#00ff88',
                            letterSpacing: '1px',
                        }}
                    >
                        MANIFESTO
                    </span>
                </div>

                {/* Title */}
                <Title
                    level={2}
                    className="animate-fade-in-up"
                    style={{
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: 800,
                        marginBottom: '32px',
                        marginTop: 0,
                        opacity: 0,
                        animationDelay: '0.2s',
                        animationFillMode: 'forwards',
                    }}
                >
                    <span
                        style={{
                            background: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        DNA AI-Native.
                    </span>
                </Title>

                {/* Manifesto Text */}
                <Paragraph
                    className="animate-fade-in-up"
                    style={{
                        fontSize: 'clamp(18px, 2.5vw, 22px)',
                        lineHeight: 1.8,
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontWeight: 400,
                        opacity: 0,
                        animationDelay: '0.3s',
                        animationFillMode: 'forwards',
                    }}
                >
                    "Liderada por especialistas{' '}
                    <span style={{ color: '#00d4ff', fontWeight: 600 }}>colaborando com a indústria</span>{' '}
                    para compreender, estruturar e se direcionar para o estado{' '}
                    <span style={{ color: '#00ff88', fontWeight: 600 }}>IA NATIVE</span>.
                    Evoluímos da digitalização incansável para o{' '}
                    <span style={{ color: '#00ff88', fontWeight: 600 }}>Neural Edge Aprimorado</span>.
                    Não vendemos software; entregamos{' '}
                    <span style={{ color: '#0066ff', fontWeight: 600 }}>soberania operacional</span>."
                </Paragraph>

                {/* Stats */}
                <div
                    className="animate-fade-in-up"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '48px',
                        marginTop: '48px',
                        flexWrap: 'wrap',
                        opacity: 0,
                        animationDelay: '0.4s',
                        animationFillMode: 'forwards',
                    }}
                >
                    {[
                        { value: '18+', label: 'Anos de Experiência' },
                        { value: 'AI', label: 'Native Architecture' },
                        { value: '100%', label: 'Edge Computing' },
                    ].map((stat, index) => (
                        <div key={index} style={{ textAlign: 'center' }}>
                            <div
                                style={{
                                    fontSize: '36px',
                                    fontWeight: 800,
                                    color: '#ffffff',
                                    lineHeight: 1,
                                }}
                            >
                                {stat.value}
                            </div>
                            <div
                                style={{
                                    fontSize: '13px',
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    marginTop: '8px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                }}
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
