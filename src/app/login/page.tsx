'use client';

import React from 'react';
import { Form, Input, Button, Typography, Checkbox, Divider } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph, Text } = Typography;

export default function LoginPage() {
    const onFinish = (values: Record<string, unknown>) => {
        console.log('Login attempt:', values);
        // TODO: Integrate with FastAPI backend
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #050508 0%, #0a0a0f 50%, #0d0d14 100%)',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background Glows */}
            <div
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(0, 102, 255, 0.1) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Login Card */}
            <div
                className="glass-card animate-fade-in-scale"
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    padding: '48px 40px',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <div
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginBottom: '24px',
                            }}
                        >
                            <img
                                src="/xmaia-logo.png"
                                alt="XMA.IA Logo"
                                style={{
                                    width: '52px',
                                    height: '52px',
                                    borderRadius: '12px',
                                    objectFit: 'contain',
                                }}
                            />
                            <span style={{ fontSize: '28px', fontWeight: 700, color: '#ffffff' }}>
                                XMA.IA
                            </span>
                        </div>
                    </Link>

                    <Title
                        level={3}
                        style={{
                            color: '#ffffff',
                            margin: '0 0 8px 0',
                            fontWeight: 700,
                        }}
                    >
                        Bem-vindo de volta
                    </Title>
                    <Paragraph style={{ color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
                        Acesse o portal de Cognição Industrial
                    </Paragraph>
                </div>

                {/* Login Form */}
                <Form
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                    requiredMark={false}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Digite seu e-mail' },
                            { type: 'email', message: 'E-mail inválido' },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined style={{ color: 'rgba(255, 255, 255, 0.4)' }} />}
                            placeholder="E-mail corporativo"
                            size="large"
                            style={{
                                height: '52px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '10px',
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Digite sua senha' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined style={{ color: 'rgba(255, 255, 255, 0.4)' }} />}
                            placeholder="Senha"
                            size="large"
                            style={{
                                height: '52px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '10px',
                            }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                    Lembrar-me
                                </Checkbox>
                            </Form.Item>
                            <a
                                href="#"
                                style={{
                                    color: '#0066ff',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                }}
                            >
                                Esqueci a senha
                            </a>
                        </div>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: '16px' }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            style={{
                                height: '52px',
                                borderRadius: '10px',
                                fontWeight: 600,
                                fontSize: '16px',
                                background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
                                border: 'none',
                                boxShadow: '0 8px 24px rgba(0, 102, 255, 0.3)',
                            }}
                        >
                            Entrar
                        </Button>
                    </Form.Item>
                </Form>

                <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.12)' }}>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '13px' }}>
                        ou continue com
                    </Text>
                </Divider>

                {/* Social Login */}
                <Button
                    size="large"
                    block
                    icon={<GoogleOutlined />}
                    style={{
                        height: '52px',
                        borderRadius: '10px',
                        fontWeight: 500,
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#ffffff',
                    }}
                >
                    Google Workspace
                </Button>

                {/* Sign Up Link */}
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <Text style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        Não tem uma conta?{' '}
                        <a
                            href="#"
                            style={{
                                color: '#00d4ff',
                                fontWeight: 600,
                            }}
                        >
                            Solicitar acesso
                        </a>
                    </Text>
                </div>
            </div>
        </div>
    );
}
