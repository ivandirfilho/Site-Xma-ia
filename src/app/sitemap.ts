import { MetadataRoute } from 'next';

/**
 * Gera o sitemap.xml estruturado da plataforma XMA.IA para indexação em motores de busca.
 * Atende às diretrizes de SEO e navegabilidade da ISO/IEC 25010.
 *
 * @returns {MetadataRoute.Sitemap} Lista de URLs canônicas indexáveis
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.xma-ia.com';
    const lastModified = new Date();

    return [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/login`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];
}
