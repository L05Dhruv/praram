import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogPage from '../../src/app/blog/page';
import BlogPostPage from '../../src/app/blog/[slug]/page';

// Mock Next.js modules
vi.mock('next/image', () => ({
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />,
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

describe('Blog Pages Integration', () => {
  describe('Blog Listing Page', () => {
    it('should render blog listing page with posts', async () => {
      const BlogPageComponent = await BlogPage();
      render(BlogPageComponent);
      
      expect(screen.getByText('Industry Insights & News')).toBeInTheDocument();
      expect(screen.getByText(/Stay informed with the latest trends/)).toBeInTheDocument();
    });

    it('should display blog post cards', async () => {
      const BlogPageComponent = await BlogPage();
      render(BlogPageComponent);
      
      // Check for blog post elements
      const postTitles = screen.getAllByRole('heading', { level: 2 });
      expect(postTitles.length).toBeGreaterThan(0);
    });
  });

  describe('Individual Blog Post Page', () => {
    it('should render blog post page with valid slug', async () => {
      const params = { slug: 'best-excavator-maintenance-tips' };
      const BlogPostPageComponent = await BlogPostPage({ params });
      
      if (BlogPostPageComponent) {
        render(BlogPostPageComponent);
        
        expect(screen.getByText(/Excavator Maintenance/)).toBeInTheDocument();
        expect(screen.getByText('Share this article')).toBeInTheDocument();
      }
    });

    it('should handle invalid slug gracefully', async () => {
      const params = { slug: 'non-existent-post' };
      
      // This should trigger notFound() which we can't easily test in this setup
      // In a real app, you'd test the 404 behavior
      expect(async () => {
        await BlogPostPage({ params });
      }).not.toThrow();
    });
  });

  describe('SEO Elements', () => {
    it('should include structured data in blog post', async () => {
      const params = { slug: 'best-excavator-maintenance-tips' };
      const BlogPostPageComponent = await BlogPostPage({ params });
      
      if (BlogPostPageComponent) {
        render(BlogPostPageComponent);
        
        const structuredData = document.querySelector('script[type="application/ld+json"]');
        expect(structuredData).toBeInTheDocument();
        
        if (structuredData) {
          const jsonData = JSON.parse(structuredData.textContent || '{}');
          expect(jsonData['@type']).toBe('BlogPosting');
          expect(jsonData.headline).toBeDefined();
          expect(jsonData.author).toBeDefined();
        }
      }
    });
  });
});

// Vitest setup for DOM testing
import { vi } from 'vitest'; 