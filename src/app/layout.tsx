import type { Metadata, Viewport } from 'next';
import { ConfigProvider } from 'antd';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import { antThemeConfig } from '@/theme/antConfig';
import ClientProviders from '@/components/ClientProviders';
import './globals.css';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    title: 'xma.ia | Manutenção Autônoma AI-Native | Neural Edge Industrial',
    description: 'A primeira plataforma AI-Native que funde Engenharia, Telemetria e Inteligência Contratual. Saia dos dashboards passivos e entre na era da decisão autônoma.',
    keywords: 'manutenção autônoma, AI industrial, machine learning, IoT, telemetria, predictive maintenance, Neural Edge, NVIDIA NIM',
    authors: [{ name: 'xma.ia' }],
    openGraph: {
        title: 'xma.ia | Cognição Industrial AI-Native',
        description: 'Plataforma de Manutenção Autônoma com Neural Edge e NVIDIA NIM',
        type: 'website',
        locale: 'pt_BR',
        siteName: 'xma.ia',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'xma.ia | Cognição Industrial AI-Native',
        description: 'Plataforma de Manutenção Autônoma com Neural Edge e NVIDIA NIM',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-BR">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                <StyledComponentsRegistry>
                    <ConfigProvider theme={antThemeConfig}>
                        <ClientProviders>
                            {children}
                        </ClientProviders>
                    </ConfigProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
