import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://bb85-sistema.netlify.app'; // Replace with actual domain

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard/', '/admin/', '/api/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
