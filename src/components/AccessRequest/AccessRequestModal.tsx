'use client';

import React, { useState } from 'react';
import { Modal, Form, Input, Radio, Button, Typography, Space, Result } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

interface AccessRequestModalProps {
    open: boolean;
    onClose: () => void;
}

const AccessRequestModal: React.FC<AccessRequestModalProps> = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form Values:', values);
        setLoading(false);
        setIsSubmitted(true);
    };

    const handleClose = () => {
        setIsSubmitted(false);
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            open={open}
            onCancel={handleClose}
            footer={null}
            width={600}
            centered
            maskClosable={false}
            destroyOnClose
        >
            {!isSubmitted ? (
                <div style={{ padding: '20px 0' }}>
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <Title level={3} style={{ marginBottom: '16px' }}>
                            XMAIA Platform - Access Request
                        </Title>
                        <Paragraph type="secondary" style={{ fontSize: '15px', maxWidth: '480px', margin: '0 auto' }}>
                            Access to the XMAIA Intelligent Maintenance System is currently restricted to authorized industrial partners and validation clients (Stellantis, M. Dias Branco, etc.).
                        </Paragraph>
                        <Paragraph type="secondary" style={{ fontSize: '15px', maxWidth: '480px', margin: '12px auto 0' }}>
                            If you are a Google Cloud reviewer or a potential partner, please fill out this form to request a demo credential or schedule a technical walkthrough.
                        </Paragraph>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        requiredMark="optional"
                        size="large"
                    >
                        <Form.Item
                            name="fullName"
                            label="Full Name"
                            rules={[{ required: true, message: 'Please enter your full name' }]}
                        >
                            <Input placeholder="Your full name" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Corporate Email"
                            rules={[
                                { required: true, message: 'Please enter your corporate email' },
                                { type: 'email', message: 'Please enter a valid email address' }
                            ]}
                        >
                            <Input placeholder="name@company.com" />
                        </Form.Item>

                        <Form.Item
                            name="company"
                            label="Company / Organization"
                            rules={[{ required: true, message: 'Please enter your company name' }]}
                        >
                            <Input placeholder="Company name" />
                        </Form.Item>

                        <Form.Item
                            name="role"
                            label="Role / Job Title"
                        >
                            <Input placeholder="e.g. CTO, Product Manager" />
                        </Form.Item>

                        <Form.Item
                            name="requestType"
                            label="Request Type"
                            rules={[{ required: true, message: 'Please select a request type' }]}
                        >
                            <Radio.Group style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <Radio value="demo">Request Demo Access</Radio>
                                <Radio value="review">Google Cloud Program Review</Radio>
                                <Radio value="partnership">Partnership Inquiry</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item style={{ marginTop: '32px', marginBottom: 0 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                block
                                size="large"
                                style={{
                                    height: '48px',
                                    fontWeight: 600,
                                    background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
                                    border: 'none',
                                    fontSize: '16px'
                                }}
                            >
                                Submit Request
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            ) : (
                <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                    <Result
                        icon={<CheckCircleFilled style={{ color: '#52c41a', fontSize: '72px' }} />}
                        title="Request Submitted"
                        subTitle={
                            <div style={{ fontSize: '16px', color: 'rgba(0,0,0,0.65)', marginTop: '16px' }}>
                                <Paragraph>
                                    Thank you. Your request has been logged.
                                </Paragraph>
                                <Paragraph>
                                    Our technical team will review your credentials and contact you shortly with access details.
                                </Paragraph>
                            </div>
                        }
                        extra={[
                            <Button
                                key="close"
                                type="primary"
                                size="large"
                                onClick={handleClose}
                                style={{
                                    background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
                                    marginTop: '24px',
                                    padding: '0 40px'
                                }}
                            >
                                Close
                            </Button>
                        ]}
                    />
                </div>
            )}
        </Modal>
    );
};

export default AccessRequestModal;
