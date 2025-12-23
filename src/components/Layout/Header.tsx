'use client';

import React, { useState, useEffect } from 'react';
import { Button, Space } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { key: 'nav.technology', href: '#tecnologia' },
        { key: 'nav.solutions', href: '#soluções' },
        { key: 'nav.about', href: '#sobre' },
    ];

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                padding: '16px 24px',
                background: scrolled ? 'rgba(5, 5, 8, 0.9)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                transition: 'all 0.3s ease',
            }}
        >
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                {/* Logo */}
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                            src="/xmaia-logo.png"
                            alt="XMA.IA Logo"
                            style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '10px',
                                objectFit: 'contain',
                            }}
                        />
                        <span style={{
                            fontSize: '26px',
                            fontWeight: 700,
                            color: '#ffffff',
                            letterSpacing: '0.5px',
                        }}>
                            XMA.IA
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '24px',
                    }}
                    className="desktop-nav"
                >
                    <Space size="large">
                        {navItems.map((item) => (
                            <a
                                key={item.key}
                                href={item.href}
                                style={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    textDecoration: 'none',
                                    transition: 'color 0.2s ease',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)')}
                            >
                                {t(item.key)}
                            </a>
                        ))}
                    </Space>

                    {/* Language Switcher */}
                    <LanguageSwitcher />

                    <Link href="/login">
                        <Button
                            type="primary"
                            style={{
                                height: '40px',
                                padding: '0 24px',
                                borderRadius: '10px',
                                fontWeight: 600,
                                background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
                                border: 'none',
                            }}
                        >
                            {t('nav.login')}
                        </Button>
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <Button
                    type="text"
                    icon={mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    style={{
                        display: 'none',
                        color: '#ffffff',
                        fontSize: '20px',
                    }}
                    className="mobile-menu-btn"
                />
            </div>

            {/* Add responsive styles */}
            <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
        </header>
    );
};

export default Header;

