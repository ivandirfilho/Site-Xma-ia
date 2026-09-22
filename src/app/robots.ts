import { MetadataRoute } from 'next';

/**
 * Define as políticas de robôs e indexadores para motores de busca (robots.txt).
 * Atende às exigências de conformidade e segurança da ISO/IEC 27001.
 *
 * @returns {MetadataRoute.Robots} Regras de rastreamento e apontamento do sitemap
 */
export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.xma-ia.com';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
