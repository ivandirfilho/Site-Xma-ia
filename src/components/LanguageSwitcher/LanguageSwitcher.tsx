'use client';

import React from 'react';
import { Dropdown, Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useLanguage, Language } from '@/contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const flags: Record<Language, string> = {
        'pt-BR': '🇧🇷',
        'en-US': '🇺🇸',
    };

    const labels: Record<Language, string> = {
        'pt-BR': 'Português',
        'en-US': 'English',
    };

    const items: MenuProps['items'] = [
        {
            key: 'pt-BR',
            label: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 8px' }}>
                    <span style={{ fontSize: '20px' }}>🇧🇷</span>
                    <span style={{ color: language === 'pt-BR' ? '#00d4ff' : '#ffffff' }}>
                        Português (BR)
                    </span>
                </div>
            ),
            onClick: () => setLanguage('pt-BR'),
        },
        {
            key: 'en-US',
            label: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 8px' }}>
                    <span style={{ fontSize: '20px' }}>🇺🇸</span>
                    <span style={{ color: language === 'en-US' ? '#00d4ff' : '#ffffff' }}>
                        English (US)
                    </span>
                </div>
            ),
            onClick: () => setLanguage('en-US'),
        },
    ];

    return (
        <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={['click']}
            dropdownRender={(menu) => (
                <div
                    style={{
                        background: 'rgba(10, 10, 15, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        overflow: 'hidden',
                    }}
                >
                    {menu}
                </div>
            )}
        >
            <Button
                type="text"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    height: 'auto',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                }}
            >
                <span style={{ fontSize: '18px' }}>{flags[language]}</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '13px', fontWeight: 500 }}>
                    {labels[language]}
                </span>
            </Button>
        </Dropdown>
    );
};

export default LanguageSwitcher;
