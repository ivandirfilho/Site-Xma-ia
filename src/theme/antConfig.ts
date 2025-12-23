import { ThemeConfig, theme } from 'antd';

export const antThemeConfig: ThemeConfig = {
    algorithm: theme.darkAlgorithm,
    token: {
        // Primary Colors - Neural Blue
        colorPrimary: '#0066ff',
        colorPrimaryHover: '#3385ff',
        colorPrimaryActive: '#0052cc',

        // Background Colors - Industrial Dark
        colorBgBase: '#0a0a0f',
        colorBgContainer: '#12121a',
        colorBgElevated: '#1a1a24',
        colorBgLayout: '#050508',

        // Text Colors
        colorText: '#ffffff',
        colorTextSecondary: 'rgba(255, 255, 255, 0.75)',
        colorTextTertiary: 'rgba(255, 255, 255, 0.55)',

        // Border Colors
        colorBorder: 'rgba(255, 255, 255, 0.12)',
        colorBorderSecondary: 'rgba(255, 255, 255, 0.08)',

        // Success/Info/Warning/Error - Tech Palette
        colorSuccess: '#00ff88',
        colorInfo: '#00d4ff',
        colorWarning: '#ffaa00',
        colorError: '#ff4d4f',

        // Typography
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        fontSize: 16,
        fontSizeHeading1: 56,
        fontSizeHeading2: 40,
        fontSizeHeading3: 28,

        // Border Radius - Modern
        borderRadius: 8,
        borderRadiusLG: 12,
        borderRadiusSM: 6,

        // Motion
        motionDurationFast: '0.1s',
        motionDurationMid: '0.2s',
        motionDurationSlow: '0.3s',
    },
    components: {
        Button: {
            primaryShadow: '0 4px 20px rgba(0, 102, 255, 0.4)',
            defaultBg: 'transparent',
            defaultBorderColor: 'rgba(255, 255, 255, 0.25)',
            paddingContentHorizontal: 28,
            controlHeight: 48,
            controlHeightLG: 56,
        },
        Typography: {
            titleMarginTop: 0,
            titleMarginBottom: 0,
        },
        Card: {
            colorBgContainer: 'rgba(18, 18, 26, 0.8)',
            borderRadiusLG: 16,
        },
        Input: {
            colorBgContainer: 'rgba(255, 255, 255, 0.05)',
            activeBorderColor: '#0066ff',
        },
    },
};
