import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'xmaia': {
                    'primary': '#0066ff',
                    'secondary': '#00d4ff',
                    'dark': '#0a0a0f',
                    'darker': '#050508',
                    'accent': '#6366f1',
                    'neural': '#00ff88',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(0, 102, 255, 0.3)' },
                    '100%': { boxShadow: '0 0 40px rgba(0, 102, 255, 0.6)' },
                },
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false, // Disable to avoid conflicts with Ant Design
    },
}
export default config
