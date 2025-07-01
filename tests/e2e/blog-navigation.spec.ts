import { test, expect } from '@playwright/test';

test.describe('Blog Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to blog from home page', async ({ page }) => {
    // Click on blog link in navigation
    await page.click('nav a[href="/blog"]');
    
    // Verify we're on the blog page
    await expect(page).toHaveURL('/blog');
    await expect(page.locator('h1')).toContainText('Industry Insights & News');
  });

  test('should display blog posts on blog listing page', async ({ page }) => {
    await page.goto('/blog');
    
    // Wait for blog posts to load
    await page.waitForSelector('article');
    
    // Check that blog posts are displayed
    const blogPosts = page.locator('article');
    await expect(blogPosts).toHaveCount.greaterThan(0);
    
    // Check that each post has required elements
    const firstPost = blogPosts.first();
    await expect(firstPost.locator('h2')).toBeVisible();
    await expect(firstPost.locator('time')).toBeVisible();
    await expect(firstPost.locator('img')).toBeVisible();
  });

  test('should navigate to individual blog post', async ({ page }) => {
    await page.goto('/blog');
    
    // Wait for blog posts to load
    await page.waitForSelector('article a');
    
    // Click on the first blog post
    const firstPostLink = page.locator('article a').first();
    await firstPostLink.click();
    
    // Verify we're on a blog post page
    await expect(page.url()).toMatch(/\/blog\/[\w-]+$/);
    
    // Check for blog post content
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('time')).toBeVisible();
    await expect(page.locator('.prose')).toBeVisible();
  });

  test('should have proper SEO meta tags on blog pages', async ({ page }) => {
    // Test blog listing page
    await page.goto('/blog');
    
    const title = await page.title();
    expect(title).toContain('Blog');
    expect(title).toContain('RR Equipment');
    
    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description).toBeTruthy();
    expect(description).toContain('industry insights');
    
    // Test individual blog post
    await page.goto('/blog/best-excavator-maintenance-tips');
    
    const postTitle = await page.title();
    expect(postTitle).toContain('Excavator Maintenance');
    expect(postTitle).toContain('RR Equipment Blog');
    
    const postDescription = await page.getAttribute('meta[name="description"]', 'content');
    expect(postDescription).toBeTruthy();
  });

  test('should have working social share buttons', async ({ page }) => {
    await page.goto('/blog/best-excavator-maintenance-tips');
    
    // Check that share buttons are present
    await expect(page.locator('text=Share this article')).toBeVisible();
    
    // Check for social media links
    const twitterLink = page.locator('a[href*="twitter.com"]');
    const linkedinLink = page.locator('a[href*="linkedin.com"]');
    const facebookLink = page.locator('a[href*="facebook.com"]');
    
    await expect(twitterLink).toBeVisible();
    await expect(linkedinLink).toBeVisible();
    await expect(facebookLink).toBeVisible();
    
    // Verify links have correct attributes
    await expect(twitterLink).toHaveAttribute('target', '_blank');
    await expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should display tags on blog posts', async ({ page }) => {
    await page.goto('/blog/best-excavator-maintenance-tips');
    
    // Check that tags are displayed
    const tags = page.locator('span').filter({ hasText: /^(Maintenance|Excavators|Heavy Equipment)$/ });
    await expect(tags.first()).toBeVisible();
  });

  test('should have breadcrumb navigation on blog post', async ({ page }) => {
    await page.goto('/blog/best-excavator-maintenance-tips');
    
    // Check for breadcrumb navigation
    const blogLink = page.locator('a[href="/blog"]');
    await expect(blogLink).toBeVisible();
    await expect(blogLink).toContainText('Blog');
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/blog');
    
    // Check that the layout adapts to mobile
    await expect(page.locator('h1')).toBeVisible();
    
    // Check that navigation is accessible
    await expect(page.locator('nav')).toBeVisible();
    
    // Navigate to a blog post
    await page.click('article a');
    
    // Verify the post is readable on mobile
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.prose')).toBeVisible();
  });
}); 