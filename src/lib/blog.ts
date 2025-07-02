// Blog Post Interface: defines the structure of a blog post

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
}

// Mock blog posts data - in a real app, this would come from a CMS or database
let mockPosts: BlogPost[] = [
  {
    slug: 'best-excavator-maintenance-tips',
    title: 'Essential Excavator Maintenance Tips for Maximum Performance',
    excerpt: 'Learn the key maintenance practices that will keep your excavator running smoothly and extend its lifespan.',
    content: `
      <p>Proper maintenance is crucial for keeping your excavator in peak condition and avoiding costly repairs. Here are the essential maintenance tips every operator should know.</p>
      
      <h2>Daily Inspection Checklist</h2>
      <p>Before starting work each day, perform these critical checks:</p>
      <ul>
        <li>Check hydraulic fluid levels and look for leaks</li>
        <li>Inspect tracks or tires for wear and damage</li>
        <li>Examine the bucket and teeth for wear</li>
        <li>Test all controls for proper operation</li>
      </ul>
      
      <h2>Regular Maintenance Schedule</h2>
      <p>Follow manufacturer guidelines for regular maintenance intervals:</p>
      <ul>
        <li>Engine oil changes every 250-500 hours</li>
        <li>Hydraulic filter replacement every 1000 hours</li>
        <li>Grease all fittings every 50 hours</li>
        <li>Replace air filter when dirty or every 500 hours</li>
      </ul>
      
      <h2>Warning Signs to Watch For</h2>
      <p>Be alert for these signs that indicate maintenance is needed:</p>
      <ul>
        <li>Unusual noises from the engine or hydraulics</li>
        <li>Slower operation or reduced power</li>
        <li>Excessive smoke from the exhaust</li>
        <li>Fluid leaks under the machine</li>
      </ul>
    `,
    featuredImage: '/images/blog/excavator-maintenance.jpg',
    publishedAt: '2024-01-15T00:00:00Z',
    readTime: 5,
    tags: ['Maintenance', 'Excavators', 'Heavy Equipment'],
    author: {
      name: 'Mike Johnson',
      avatar: '/images/authors/mike-johnson.jpg',
      role: 'Equipment Specialist',
    },
  },
  {
    slug: 'choosing-right-construction-equipment',
    title: 'How to Choose the Right Construction Equipment for Your Project',
    excerpt: 'A comprehensive guide to selecting the most suitable construction equipment based on project requirements and budget.',
    content: `
      <p>Selecting the right construction equipment can make or break your project's success. This guide will help you make informed decisions.</p>
      
      <h2>Assess Your Project Requirements</h2>
      <p>Start by thoroughly analyzing your project needs:</p>
      <ul>
        <li>Project size and scope</li>
        <li>Timeline and deadlines</li>
        <li>Site conditions and accessibility</li>
        <li>Material types and quantities</li>
      </ul>
      
      <h2>Consider Equipment Specifications</h2>
      <p>Match equipment capabilities to your requirements:</p>
      <ul>
        <li>Power and performance ratings</li>
        <li>Operating capacity and reach</li>
        <li>Fuel efficiency and operating costs</li>
        <li>Maintenance requirements</li>
      </ul>
      
      <h2>Budget Considerations</h2>
      <p>Factor in all costs when making your decision:</p>
      <ul>
        <li>Purchase or rental costs</li>
        <li>Operating expenses (fuel, operator wages)</li>
        <li>Maintenance and repair costs</li>
        <li>Insurance and financing</li>
      </ul>
    `,
    featuredImage: '/images/blog/choosing-equipment.jpg',
    publishedAt: '2024-01-10T00:00:00Z',
    readTime: 7,
    tags: ['Equipment Selection', 'Construction', 'Project Management'],
    author: {
      name: 'Sarah Chen',
      avatar: '/images/authors/sarah-chen.jpg',
      role: 'Project Manager',
    },
  },
  {
    slug: 'construction-industry-trends-2024',
    title: 'Top Construction Industry Trends to Watch in 2024',
    excerpt: 'Discover the latest trends shaping the construction industry, from automation to sustainability initiatives.',
    content: `
      <p>The construction industry continues to evolve rapidly. Here are the key trends that will shape the industry in 2024.</p>
      
      <h2>Automation and Robotics</h2>
      <p>Automation is revolutionizing construction processes:</p>
      <ul>
        <li>Autonomous construction vehicles</li>
        <li>Robotic bricklaying and welding</li>
        <li>Drone surveying and monitoring</li>
        <li>AI-powered project management</li>
      </ul>
      
      <h2>Sustainable Construction Practices</h2>
      <p>Environmental consciousness is driving change:</p>
      <ul>
        <li>Electric and hybrid construction equipment</li>
        <li>Sustainable building materials</li>
        <li>Energy-efficient construction methods</li>
        <li>Waste reduction initiatives</li>
      </ul>
      
      <h2>Digital Transformation</h2>
      <p>Technology is streamlining operations:</p>
      <ul>
        <li>Building Information Modeling (BIM)</li>
        <li>IoT sensors for equipment monitoring</li>
        <li>Cloud-based project management</li>
        <li>Virtual and augmented reality training</li>
      </ul>
    `,
    featuredImage: '/images/blog/industry-trends.jpg',
    publishedAt: '2024-01-05T00:00:00Z',
    readTime: 6,
    tags: ['Industry Trends', 'Technology', 'Sustainability'],
    author: {
      name: 'David Rodriguez',
      avatar: '/images/authors/david-rodriguez.jpg',
      role: 'Industry Analyst',
    },
  },
];

export async function getBlogPosts(): Promise<BlogPost[]> {
  // In a real application, this would fetch from a CMS or database
  return mockPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // In a real application, this would fetch from a CMS or database
  const post = mockPosts.find(post => post.slug === slug);
  return post || null;
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  return mockPosts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}

// Admin functions for managing blog posts
export async function createBlogPost(post: BlogPost): Promise<BlogPost> {
  // Check if slug already exists
  const existingPost = mockPosts.find(p => p.slug === post.slug);
  if (existingPost) {
    throw new Error('A post with this slug already exists');
  }

  mockPosts.unshift(post); // Add to beginning of array
  return post;
}

export async function updateBlogPost(slug: string, updatedPost: Partial<BlogPost>): Promise<BlogPost> {
  const index = mockPosts.findIndex(post => post.slug === slug);
  if (index === -1) {
    throw new Error('Blog post not found');
  }

  // If slug is being changed, check it doesn't conflict
  if (updatedPost.slug && updatedPost.slug !== slug) {
    const existingPost = mockPosts.find(p => p.slug === updatedPost.slug);
    if (existingPost) {
      throw new Error('A post with this slug already exists');
    }
  }

  mockPosts[index] = { ...mockPosts[index], ...updatedPost };
  return mockPosts[index];
}

export async function deleteBlogPost(slug: string): Promise<boolean> {
  const index = mockPosts.findIndex(post => post.slug === slug);
  if (index === -1) {
    return false;
  }

  mockPosts.splice(index, 1);
  return true;
}

// Helper function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Helper function to calculate read time from HTML content
export function calculateReadTime(htmlContent: string): number {
  // Strip HTML tags and count words
  const text = htmlContent.replace(/<[^>]*>/g, '');
  const wordCount = text.trim().split(/\s+/).length;
  // Average reading speed is about 200 words per minute
  return Math.max(1, Math.ceil(wordCount / 200));
} 