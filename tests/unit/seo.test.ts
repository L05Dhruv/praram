import { describe, it, expect } from 'vitest';
import { generateOrganizationSchema, generateBlogPostSchema, generateSEOTags } from '../../src/lib/seo';
import { BlogPost } from '../../src/lib/blog';

describe('SEO Functions', () => {
  const mockBlogPost: BlogPost = {
    slug: 'test-post',
    title: 'Test Blog Post',
    excerpt: 'This is a test blog post excerpt',
    content: '<p>Test content</p>',
    featuredImage: '/images/test.jpg',
    publishedAt: '2024-01-01T00:00:00Z',
    readTime: 5,
    tags: ['Test', 'Blog'],
    author: {
      name: 'Test Author',
      avatar: '/images/author.jpg',
      role: 'Writer',
    },
  };

  describe('generateOrganizationSchema', () => {
    it('should generate valid organization schema', () => {
      const schema = generateOrganizationSchema();
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBe('RR Equipment');
      expect(schema.url).toBe('https://rrequipment.com');
      expect(schema.logo).toBe('https://rrequipment.com/images/logo.png');
      expect(schema.description).toContain('equipment');
      expect(schema.contactPoint).toHaveProperty('@type', 'ContactPoint');
      expect(schema.contactPoint).toHaveProperty('telephone');
      expect(schema.contactPoint).toHaveProperty('contactType');
      expect(Array.isArray(schema.sameAs)).toBe(true);
      expect(schema.sameAs.length).toBeGreaterThan(0);
    });
  });

  describe('generateBlogPostSchema', () => {
    it('should generate valid blog post schema', () => {
      const schema = generateBlogPostSchema(mockBlogPost);
      
      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BlogPosting');
      expect(schema.headline).toBe(mockBlogPost.title);
      expect(schema.description).toBe(mockBlogPost.excerpt);
      expect(schema.image).toBe(`https://rrequipment.com${mockBlogPost.featuredImage}`);
      expect(schema.author).toHaveProperty('@type', 'Person');
      expect(schema.author.name).toBe(mockBlogPost.author.name);
      expect(schema.publisher).toHaveProperty('@type', 'Organization');
      expect(schema.publisher.name).toBe('RR Equipment');
      expect(schema.datePublished).toBe(mockBlogPost.publishedAt);
      expect(schema.dateModified).toBe(mockBlogPost.publishedAt);
      expect(schema.mainEntityOfPage).toHaveProperty('@type', 'WebPage');
      expect(schema.mainEntityOfPage['@id']).toBe(`https://rrequipment.com/blog/${mockBlogPost.slug}`);
    });
  });

  describe('generateSEOTags', () => {
    it('should generate basic SEO tags', () => {
      const config = {
        title: 'Test Page',
        description: 'Test description',
        keywords: ['test', 'page', 'seo'],
      };
      
      const tags = generateSEOTags(config);
      
      expect(tags).toContainEqual({ name: 'description', content: config.description });
      expect(tags).toContainEqual({ name: 'keywords', content: config.keywords.join(', ') });
      expect(tags).toContainEqual({ name: 'robots', content: 'index, follow' });
    });

    it('should include canonical URL when provided', () => {
      const config = {
        title: 'Test Page',
        description: 'Test description',
        keywords: ['test'],
        canonicalUrl: 'https://example.com/test',
      };
      
      const tags = generateSEOTags(config);
      
      expect(tags).toContainEqual({ name: 'canonical', content: config.canonicalUrl });
    });

    it('should include Open Graph tags when provided', () => {
      const config = {
        title: 'Test Page',
        description: 'Test description',
        keywords: ['test'],
        openGraph: {
          title: 'OG Title',
          description: 'OG Description',
          image: 'https://example.com/image.jpg',
          type: 'article' as const,
        },
      };
      
      const tags = generateSEOTags(config);
      
      expect(tags).toContainEqual({ property: 'og:title', content: config.openGraph.title });
      expect(tags).toContainEqual({ property: 'og:description', content: config.openGraph.description });
      expect(tags).toContainEqual({ property: 'og:image', content: config.openGraph.image });
      expect(tags).toContainEqual({ property: 'og:type', content: config.openGraph.type });
    });

    it('should include Twitter tags when provided', () => {
      const config = {
        title: 'Test Page',
        description: 'Test description',
        keywords: ['test'],
        twitter: {
          card: 'summary_large_image' as const,
          title: 'Twitter Title',
          description: 'Twitter Description',
          image: 'https://example.com/twitter-image.jpg',
        },
      };
      
      const tags = generateSEOTags(config);
      
      expect(tags).toContainEqual({ name: 'twitter:card', content: config.twitter.card });
      expect(tags).toContainEqual({ name: 'twitter:title', content: config.twitter.title });
      expect(tags).toContainEqual({ name: 'twitter:description', content: config.twitter.description });
      expect(tags).toContainEqual({ name: 'twitter:image', content: config.twitter.image });
    });
  });
}); 