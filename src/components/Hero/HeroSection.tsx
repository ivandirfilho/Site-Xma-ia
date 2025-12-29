'use client';

import React from 'react';
import { Typography, Button, Space } from 'antd';
import { RocketOutlined, EyeOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';

const ParticleBackground = dynamic(() => import('./ParticleBackground'), {
    ssr: false,
});

const { Title, Paragraph } = Typography;

const HeroSection: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: 'linear-gradient(180deg, #050508 0%, #0a0a0f 50%, #0d0d14 100%)',
            }}
        >
            {/* Particle Background */}
            <ParticleBackground />

            {/* Gradient Overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(5, 5, 8, 0.4) 70%)',
                    pointerEvents: 'none',
                    zIndex: 1,
                }}
            />

            {/* Content */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                    maxWidth: '900px',
                    padding: '0 24px',
                }}
            >
                {/* Badge */}
                <div
                    className="animate-fade-in-up"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 20px',
                        background: 'rgba(0, 102, 255, 0.15)',
                        border: '1px solid rgba(0, 102, 255, 0.3)',
                        borderRadius: '100px',
                        marginBottom: '32px',
                        opacity: 0,
                        animationDelay: '0.1s',
                        animationFillMode: 'forwards',
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
                    <span style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '14px', fontWeight: 500 }}>
                        {t('hero.badge')}
                    </span>
                </div>

                {/* Main Title */}
                <Title
                    level={1}
                    className="animate-fade-in-up"
                    style={{
                        fontSize: 'clamp(32px, 5vw, 56px)',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        marginBottom: '24px',
                        color: '#ffffff',
                        opacity: 0,
                        animationDelay: '0.2s',
                        animationFillMode: 'forwards',
                    }}
                >
                    {t('hero.title.part1')}{' '}
                    <span
                        style={{
                            background: 'linear-gradient(135deg, #00d4ff 0%, #0066ff 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        {t('hero.title.part2')}
                    </span>
                </Title>

                {/* Subtitle */}
                <Paragraph
                    className="animate-fade-in-up"
                    style={{
                        fontSize: 'clamp(16px, 2vw, 20px)',
                        lineHeight: 1.7,
                        color: 'rgba(255, 255, 255, 0.75)',
                        maxWidth: '700px',
                        margin: '0 auto 48px',
                        opacity: 0,
                        animationDelay: '0.3s',
                        animationFillMode: 'forwards',
                    }}
                >
                    {t('hero.subtitle')}
                </Paragraph>

                {/* CTA Buttons */}
                <Space
                    size="large"
                    wrap
                    className="animate-fade-in-up"
                    style={{
                        opacity: 0,
                        animationDelay: '0.4s',
                        animationFillMode: 'forwards',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        type="primary"
                        size="large"
                        icon={<RocketOutlined />}
                        style={{
                            height: '56px',
                            padding: '0 32px',
                            fontSize: '16px',
                            fontWeight: 600,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
                            border: 'none',
                            boxShadow: '0 8px 32px rgba(0, 102, 255, 0.4)',
                        }}
                    >
                        {t('hero.cta.demo')}
                    </Button>

                    <Button
                        type="default"
                        size="large"
                        icon={<EyeOutlined />}
                        style={{
                            height: '56px',
                            padding: '0 32px',
                            fontSize: '16px',
                            fontWeight: 600,
                            borderRadius: '12px',
                            background: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            color: '#ffffff',
                        }}
                    >
                        {t('hero.cta.video')}
                    </Button>
                </Space>

                {/* Scroll Indicator */}
                <div
                    className="animate-fade-in-up"
                    style={{
                        position: 'absolute',
                        bottom: '-120px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        opacity: 0,
                        animationDelay: '0.6s',
                        animationFillMode: 'forwards',
                    }}
                >
                    <div
                        style={{
                            width: '24px',
                            height: '40px',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '12px',
                            display: 'flex',
                            justifyContent: 'center',
                            paddingTop: '8px',
                        }}
                    >
                        <div
                            style={{
                                width: '4px',
                                height: '8px',
                                background: 'rgba(255, 255, 255, 0.5)',
                                borderRadius: '2px',
                                animation: 'float 1.5s ease-in-out infinite',
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
