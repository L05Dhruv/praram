import { NextRequest, NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import { getBlogPost, updateBlogPost, deleteBlogPost } from '@/lib/blog';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

interface RouteParams {
  params: {
    slug: string;
  };
}

// GET /api/blog/[slug] - Get single blog post
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const post = await getBlogPost(params.slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[slug] - Update blog post (admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
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

    const updateData = await request.json();
    const updatedPost = await updateBlogPost(params.slug, updateData);
    
    return NextResponse.json({ 
      success: true, 
      post: updatedPost 
    });

  } catch (error: any) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[slug] - Delete blog post (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

    const deleted = await deleteBlogPost(params.slug);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Blog post deleted successfully' 
    });

  } catch (error: any) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete blog post' },
      { status: 500 }
    );
  }
} 