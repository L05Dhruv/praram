import { Metadata } from 'next';
import BlogManagerClient from '@/app/admin/blog/BlogManagerClient';
import ProtectedRoute from '@/components/ProtectedRoute';

export const metadata: Metadata = {
  title: 'Blog Management | Admin Dashboard',
  description: 'Manage blog posts and content',
};

export default function BlogManagerPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <BlogManagerClient />
    </ProtectedRoute>
  );
} 