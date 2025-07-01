import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { mockEquipment } from '@/lib/equipment';
import { SEO_CONSTANTS } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts();
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SEO_CONSTANTS.SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SEO_CONSTANTS.SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${SEO_CONSTANTS.SITE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SEO_CONSTANTS.SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SEO_CONSTANTS.SITE_URL}/auth/signin`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SEO_CONSTANTS.SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Equipment products
  const productPages: MetadataRoute.Sitemap = mockEquipment.map((equipment) => ({
    url: `${SEO_CONSTANTS.SITE_URL}/shop/${equipment.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages, ...productPages];
} 