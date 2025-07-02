import { Metadata } from 'next';
import BlogFormClient from '../BlogFormClient';
import ProtectedRoute from '@/components/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Create New Blog Post | Admin Dashboard',
  description: 'Create a new blog post',
};

export default function NewBlogPostPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <BlogFormClient />
    </ProtectedRoute>
  );
} 