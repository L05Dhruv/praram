import { MetadataRoute } from 'next';
import { SEO_CONSTANTS } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/routes/admin/',
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/routes/admin/',
          '/api/',
        ],
      },
    ],
    sitemap: `${SEO_CONSTANTS.SITE_URL}/sitemap.xml`,
    host: SEO_CONSTANTS.SITE_URL,
  };
} 