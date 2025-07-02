import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { getBlogPosts, createBlogPost, BlogPost } from '@/lib/blog';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// GET /api/blog - Get all blog posts
export async function GET() {
  try {
    const posts = await getBlogPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create new blog post (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const sessionCookie = request.cookies.get('session');
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verify(sessionCookie.value, JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };

    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const postData = await request.json();
    
    // Validate required fields
    const requiredFields = ['slug', 'title', 'excerpt', 'content', 'featuredImage', 'tags', 'author'];
    for (const field of requiredFields) {
      if (!postData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const newPost: BlogPost = {
      ...postData,
      publishedAt: postData.publishedAt || new Date().toISOString(),
    };

    const createdPost = await createBlogPost(newPost);
    
    return NextResponse.json({ 
      success: true, 
      post: createdPost 
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create blog post' },
      { status: 500 }
    );
  }
} 