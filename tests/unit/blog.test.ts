import { describe, it, expect } from 'vitest';
import { getBlogPosts, getBlogPost, getBlogPostsByTag } from '../../src/lib/blog';

describe('Blog Functions', () => {
  describe('getBlogPosts', () => {
    it('should return all blog posts sorted by date', async () => {
      const posts = await getBlogPosts();
      
      expect(posts).toBeDefined();
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
      
      // Check if posts are sorted by date (newest first)
      for (let i = 0; i < posts.length - 1; i++) {
        const currentDate = new Date(posts[i].publishedAt);
        const nextDate = new Date(posts[i + 1].publishedAt);
        expect(currentDate.getTime()).toBeGreaterThanOrEqual(nextDate.getTime());
      }
    });

    it('should return posts with required properties', async () => {
      const posts = await getBlogPosts();
      const post = posts[0];
      
      expect(post).toHaveProperty('slug');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('excerpt');
      expect(post).toHaveProperty('content');
      expect(post).toHaveProperty('featuredImage');
      expect(post).toHaveProperty('publishedAt');
      expect(post).toHaveProperty('readTime');
      expect(post).toHaveProperty('tags');
      expect(post).toHaveProperty('author');
      
      expect(typeof post.slug).toBe('string');
      expect(typeof post.title).toBe('string');
      expect(typeof post.excerpt).toBe('string');
      expect(typeof post.content).toBe('string');
      expect(typeof post.featuredImage).toBe('string');
      expect(typeof post.publishedAt).toBe('string');
      expect(typeof post.readTime).toBe('number');
      expect(Array.isArray(post.tags)).toBe(true);
      expect(typeof post.author).toBe('object');
    });
  });

  describe('getBlogPost', () => {
    it('should return a specific blog post by slug', async () => {
      const post = await getBlogPost('best-excavator-maintenance-tips');
      
      expect(post).toBeDefined();
      expect(post?.slug).toBe('best-excavator-maintenance-tips');
      expect(post?.title).toContain('Excavator Maintenance');
    });

    it('should return null for non-existent slug', async () => {
      const post = await getBlogPost('non-existent-post');
      
      expect(post).toBeNull();
    });
  });

  describe('getBlogPostsByTag', () => {
    it('should return posts filtered by tag', async () => {
      const posts = await getBlogPostsByTag('Maintenance');
      
      expect(posts).toBeDefined();
      expect(Array.isArray(posts)).toBe(true);
      
      posts.forEach(post => {
        expect(post.tags.some(tag => tag.toLowerCase() === 'maintenance')).toBe(true);
      });
    });

    it('should return empty array for non-existent tag', async () => {
      const posts = await getBlogPostsByTag('NonExistentTag');
      
      expect(posts).toBeDefined();
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBe(0);
    });

    it('should be case-insensitive', async () => {
      const postsLower = await getBlogPostsByTag('maintenance');
      const postsUpper = await getBlogPostsByTag('MAINTENANCE');
      
      expect(postsLower.length).toBe(postsUpper.length);
    });
  });
}); 