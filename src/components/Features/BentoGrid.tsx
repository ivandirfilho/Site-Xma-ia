'use client';

import React from 'react';
import { Row, Col, Typography } from 'antd';
import {
    ThunderboltOutlined,
    FilterOutlined,
    SafetyCertificateOutlined
} from '@ant-design/icons';
import { useLanguage } from '@/contexts/LanguageContext';

const { Title, Paragraph } = Typography;

interface FeatureCardProps {
    icon: React.ReactNode;
    category: string;
    title: string;
    description: string;
    delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    category,
    title,
    description,
    delay
}) => (
    <div
        className="glass-card animate-fade-in-up"
        style={{
            padding: '32px',
            height: '100%',
            opacity: 0,
            animationDelay: `${delay}s`,
            animationFillMode: 'forwards',
        }}
    >
        {/* Icon */}
        <div
            style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(0, 102, 255, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                fontSize: '24px',
                color: '#00d4ff',
            }}
        >
            {icon}
        </div>

        {/* Category Badge */}
        <span
            style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: 'rgba(0, 255, 136, 0.1)',
                border: '1px solid rgba(0, 255, 136, 0.3)',
                borderRadius: '100px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#00ff88',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
            }}
        >
            {category}
        </span>

        {/* Title */}
        <Title
            level={4}
            style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '12px',
                marginTop: 0,
            }}
        >
            {title}
        </Title>

        {/* Description */}
        <Paragraph
            style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.7)',
                margin: 0,
            }}
        >
            {description}
        </Paragraph>
    </div>
);

const BentoGrid: React.FC = () => {
    const { t } = useLanguage();

    const features = [
        {
            icon: <ThunderboltOutlined />,
            category: t('feature.validation.category'),
            title: t('feature.validation.title'),
            description: t('feature.validation.desc'),
        },
        {
            icon: <FilterOutlined />,
            category: t('feature.audit.category'),
            title: t('feature.audit.title'),
            description: t('feature.audit.desc'),
        },
        {
            icon: <SafetyCertificateOutlined />,
            category: t('feature.legal.category'),
            title: t('feature.legal.title'),
            description: t('feature.legal.desc'),
        },
    ];

    return (
        <section
            style={{
                padding: '120px 24px',
                background: '#0a0a0f',
                position: 'relative',
            }}
        >
            {/* Section Header */}
            <div
                style={{
                    textAlign: 'center',
                    maxWidth: '700px',
                    margin: '0 auto 64px',
                }}
            >
                <span
                    className="animate-fade-in-up"
                    style={{
                        display: 'inline-block',
                        padding: '6px 16px',
                        background: 'rgba(0, 102, 255, 0.1)',
                        border: '1px solid rgba(0, 102, 255, 0.2)',
                        borderRadius: '100px',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#0066ff',
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        opacity: 0,
                        animationDelay: '0.1s',
                        animationFillMode: 'forwards',
                    }}
                >
                    {t('features.badge')}
                </span>

                <Title
                    level={2}
                    className="animate-fade-in-up"
                    style={{
                        fontSize: 'clamp(28px, 4vw, 40px)',
                        fontWeight: 700,
                        color: '#ffffff',
                        marginBottom: '16px',
                        marginTop: 0,
                        opacity: 0,
                        animationDelay: '0.2s',
                        animationFillMode: 'forwards',
                    }}
                >
                    {t('features.title')}{' '}
                    <span style={{ color: '#00d4ff' }}>{t('features.title.highlight')}</span>
                </Title>

                <Paragraph
                    className="animate-fade-in-up"
                    style={{
                        fontSize: '17px',
                        lineHeight: 1.7,
                        color: 'rgba(255, 255, 255, 0.65)',
                        opacity: 0,
                        animationDelay: '0.3s',
                        animationFillMode: 'forwards',
                    }}
                >
                    {t('features.subtitle')}
                </Paragraph>
            </div>

            {/* Bento Grid */}
            <Row
                gutter={[24, 24]}
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {features.map((feature, index) => (
                    <Col key={index} xs={24} md={8}>
                        <FeatureCard {...feature} delay={0.3 + index * 0.1} />
                    </Col>
                ))}
            </Row>
        </section>
    );
};

export default BentoGrid;
