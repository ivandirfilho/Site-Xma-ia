'use client';

import dynamic from 'next/dynamic';
import { LanguageProvider } from '@/contexts/LanguageContext';

const CognitiveAlert = dynamic(() => import('@/components/CognitiveAlert/CognitiveAlert'), {
    ssr: false,
});

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            {children}
            <CognitiveAlert />
        </LanguageProvider>
    );
}
