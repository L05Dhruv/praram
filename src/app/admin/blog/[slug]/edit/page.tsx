import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost } from '@/lib/blog';
import BlogFormClient from '@/app/admin/blog/BlogFormClient';
import ProtectedRoute from '@/components/ProtectedRoute';

interface EditBlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: EditBlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  return {
    title: post ? `Edit ${post.title} | Admin Dashboard` : 'Blog Post Not Found',
    description: post ? `Edit ${post.title} blog post` : 'Blog post not found',
  };
}

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <BlogFormClient post={post} isEditing={true} />
    </ProtectedRoute>
  );
} 